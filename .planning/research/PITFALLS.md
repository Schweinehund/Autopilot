# Pitfalls Research — 802.1X via Intune (v1.14)

**Domain:** 802.1X network authentication (wired + Wi-Fi) across Windows, macOS, iOS/iPadOS, Android Enterprise, Linux — Intune client-side configuration only
**Researched:** 2026-06-29
**Confidence:** HIGH for certificate/Windows/macOS/iOS/Android pitfalls (verified against Microsoft Learn); MEDIUM for Linux (limited Intune surface documentation); LOW for specific RADIUS diagnostic reason codes on client side (server-side out of scope)

---

## Section A — Certificate Pitfalls (EAP-TLS and All EAP Types)

### A-01: Trust-Before-Profile Ordering Violation

**What goes wrong:**
The 802.1X Wi-Fi or wired profile references a SCEP or PKCS certificate profile, but the trusted root certificate profile has not yet been delivered. The client certificate enrolls successfully, but 802.1X authentication fails immediately because the device cannot build a trust chain to validate the certificate against the CA. Intune shows the Wi-Fi or wired profile as applied ("Succeeded") but the network connection fails silently.

**Why it happens:**
Admins assign all three profiles (trusted root + SCEP/PKCS + 802.1X) to the same group simultaneously. MDM profile delivery order is not guaranteed. The 802.1X profile may fire before the trusted root and cert profiles are processed. Additionally, some admins skip the trusted root profile entirely if using a public CA, not realizing that SCEP requires an internal CA root for NDES and the client must also trust the RADIUS server's issuing CA.

**How to avoid:**
Assign the trusted root profile and let it reach "Succeeded" on all target devices before assigning the SCEP/PKCS profile. Assign the SCEP/PKCS profile and let it reach "Succeeded" (certificate enrolled) before assigning the 802.1X Wi-Fi/wired profile. In practice, stagger deployment via phased rings. For SCEP: the profile directly references the trusted certificate profile; for PKCS: the profile references the CA server — in both cases a Trusted Certificate profile to the same group is a prerequisite.

**Warning signs:**
- Intune shows the Wi-Fi profile as "Succeeded" but device cannot authenticate.
- Intune shows certificate profile as "Error" rather than "Succeeded".
- The trusted root profile shows "Pending" or "Error" on devices that also have a failing Wi-Fi profile.

**Target phase/tier:** Foundation phase (cert delivery prerequisites); admin-setup guide prerequisite section for all 5 platforms; "What breaks" callout on each per-platform admin-setup guide.

Source: https://learn.microsoft.com/en-us/intune/device-configuration/certificates/trusted-root-profiles (last verified 2026-06-29)

---

### A-02: Missing or Wrong Client Authentication EKU on the Client Certificate

**What goes wrong:**
The SCEP or PKCS certificate template used to issue client certificates does not include the Client Authentication extended key usage (EKU OID 1.3.6.1.5.5.7.3.2). The RADIUS server receives the certificate from the supplicant but rejects it because the cert is not authorized for client authentication. The EAP exchange fails at the server-side certificate validation step. RADIUS logs show an Access-Reject; the client just sees "Authentication Failed."

**Why it happens:**
Admins use a general-purpose certificate template (e.g., the default "User" or "Workstation Authentication" template) that is configured for a different EKU, or they forget to include Client Authentication when creating a custom template. On Intune SCEP profiles, the Extended Key Usage fields in the profile must explicitly include Client Authentication; leaving this blank or selecting only Server Authentication results in a useless cert for 802.1X.

**How to avoid:**
Verify the SCEP profile's Extended Key Usage section includes "Client Authentication" (OID 1.3.6.1.5.5.7.3.2) before deployment. For PKCS imported certificates, confirm the PFX was issued with Client Authentication EKU. The Windows EAP-TLS XML filter shown in Intune documentation shows `<EKUName>Client Authentication</EKUName><EKUOID>1.3.6.1.5.5.7.3.2</EKUOID>` — this is what the supplicant uses to select the correct cert from the store.

**Warning signs:**
- RADIUS/NPS event logs (if accessible) show reason code 16 (Authentication failed) or "Certificate has wrong EKU."
- `certutil -verify` on the client certificate shows no Client Authentication EKU.
- The device selects no certificate during EAP-TLS negotiation ("certificate not found" in WLAN-AutoConfig event log on Windows).

**Target phase/tier:** Foundation phase (EAP-TLS prerequisites); per-platform admin-setup SCEP profile section; L2 runbook (cert inspection step).

Source: https://learn.microsoft.com/en-us/intune/device-configuration/certificates/scep-profiles (last verified 2026-06-29)

---

### A-03: SCEP vs PKCS Misconfig — Wrong Profile Type for the Platform or Use Case

**What goes wrong:**
Using PKCS (device-bound certificate with PFX import) when the infrastructure uses NDES/SCEP, or vice versa; or using a "user" SCEP profile when a "device" cert is needed for machine authentication (e.g., wired 802.1X at pre-login). For Android Enterprise Device Owner (Fully Managed/COBO), SCEP certificate reporting is unavailable and Intune cannot revoke Device Owner certificates — an admin expecting to revoke compromised certs through Intune will discover this only at incident time.

**Why it happens:**
SCEP and PKCS look identical from the Intune console perspective (both produce a certificate). Admins prototype with one method during pilot and switch to the other in production without verifying the 802.1X profile references are updated. The subtle "Subject" and "SAN" mapping differences between SCEP and PKCS are not obvious until authentication fails.

**How to avoid:**
- Use SCEP when you have NDES infrastructure and want automatic per-device cert issuance.
- Use PKCS when you have a CA connector and want centrally managed, CA-issued certs.
- Use PKCS Imported (PFX) only for S/MIME or specific identity use cases — not typically for 802.1X client auth.
- Document which method is in use and the SCEP/PKCS profile name in the 802.1X deployment runbook so that future admins do not create a parallel duplicate.

**Warning signs:**
- 802.1X Wi-Fi profile shows "Error" and the certificate profile name referenced in the profile no longer exists.
- Android Device Owner devices show SCEP certificate profile as deployed but no certificate visible in device keystore.

**Target phase/tier:** Foundation phase (cert delivery prerequisites); per-platform admin-setup guides.

Source: https://learn.microsoft.com/en-us/intune/device-configuration/certificates/scep-profiles; https://learn.microsoft.com/en-us/intune/device-configuration/certificates/imported-pfx-profiles (last verified 2026-06-29)

---

### A-04: RADIUS Server Certificate Not Trusted on the Client — Server Trust Not Configured

**What goes wrong:**
The client does not trust the certificate presented by the RADIUS server during EAP authentication. The supplicant either prompts the user ("Trust this certificate?") or silently rejects the connection depending on the OS and profile configuration. On Windows, without "Disable user prompt for server validation" set and without a trusted root cert profile for the RADIUS issuing CA, the user sees a dialog on every connection attempt. On iOS/macOS, the connection fails silently if the RADIUS cert's root is not installed on the device.

**Why it happens:**
Admins configure the 802.1X profile to reference only the client certificate, overlooking that the supplicant also validates the server. The RADIUS server's certificate is issued by a private CA. The admin does not deploy a separate Trusted Certificate profile for that private CA root. This is distinct from the client cert's CA root — the RADIUS server may be using a different CA than the one that issued client certs.

**How to avoid:**
For every 802.1X profile that uses EAP-TLS, PEAP, or EAP-TTLS: deploy a Trusted Certificate profile that contains the root CA that signed the RADIUS server's certificate. In Intune's Wi-Fi and Wired profile, reference this root under "Root certificate for server validation." Set "Certificate server names" to the FQDN(s) of the RADIUS server cert (matching the CN or SAN). If the RADIUS cert is signed by a public CA (DigiCert, etc.), a separate Trusted Certificate profile may not be needed — but the server name must still be specified.

**Warning signs:**
- On Windows: WLAN-AutoConfig event 8003 "The network adapter disconnected" or event 8001 with "The server's certificate could not be validated."
- On macOS: System log shows "EAP: identity rejected by server."
- On iOS: Wi-Fi shows "Authentication Failed" immediately after profile is applied.
- macOS wired: The PEAP/TTLS configuration in Intune requires Certificate server names to "bypass the dynamic trust window on user devices" — missing this = user prompt every time.

**Target phase/tier:** Foundation phase (RADIUS trust concepts); per-platform admin-setup guides; L1 runbook (certificate trust failures); L2 runbook (RADIUS cert inspection).

Source: https://learn.microsoft.com/en-us/intune/device-configuration/templates/ref-wired-network-settings-macos; https://learn.microsoft.com/en-us/intune/device-configuration/templates/ref-wifi-settings-windows (last verified 2026-06-29)

---

### A-05: Server Name Validation Disabled or Empty — Security and Connection Failures

**What goes wrong:**
Two distinct failure modes:
1. The "Certificate server names" field is left blank with server validation configured — the supplicant cannot confirm the RADIUS server identity and either connects insecurely (Windows: user prompted) or fails.
2. Server validation is explicitly disabled (PerformServerValidation = false in Windows XML) — the device will accept any certificate from any RADIUS server, creating a man-in-the-middle attack surface. On iOS/macOS, disabling server validation in a managed profile is flagged as a security violation.

**Why it happens:**
Admins see documentation examples with `<AcceptServerName>false</AcceptServerName>` and `<PerformServerValidation>false</PerformServerValidation>` (from the default Windows EAP-TLS XML skeleton) and leave these defaults rather than filling in the actual server names and root cert. The "it works but shows a prompt" behavior passes pilot testing, and the security risk is not visible.

**How to avoid:**
Always populate "Certificate server names" with the RADIUS server FQDN or common name suffix. Always set "Perform server validation" to true/enabled. Always reference a "Root certificate for server validation." For Android 11+, the RADIUS server name field is required for Wi-Fi profile configuration. For Android 14+, the total content of all server names cannot exceed 256 characters and must contain no special characters — use only the DNS suffix if multiple RADIUS servers share a common suffix.

**Warning signs:**
- Policy review shows "Certificate server names" field empty and "Root certificate for server validation" blank.
- Users report intermittent certificate trust prompts on Windows.
- RADIUS audit logs show connections from devices that are not expected (rogue RADIUS accepted).

**Target phase/tier:** Foundation phase (security concepts); per-platform admin-setup "What breaks" callout; specifically documented in Android 11/14 version-gated callouts with freshness stamps.

Source: https://learn.microsoft.com/en-us/intune/device-configuration/templates/ref-wifi-settings-android-enterprise; https://learn.microsoft.com/en-us/intune/device-configuration/templates/ref-wifi-settings-windows (last verified 2026-06-29)

---

### A-06: Certificate Not Present at Connect Time — Delivery Race Condition

**What goes wrong:**
The 802.1X profile arrives and the device attempts to connect to the enterprise SSID or wired port before the SCEP or PKCS certificate has been enrolled. The connection attempt fails. The device may auto-retry (WLANSVC retries on Windows; iOS auto-retries on profile delivery). If the cert arrives within seconds, the retry succeeds silently. If there is significant SCEP enrollment delay (NDES latency, CA availability, rate limiting), the device may fail for minutes and generate L1 tickets.

**Why it happens:**
Freshly enrolled devices receive all profiles near-simultaneously. SCEP enrollment requires an HTTPS round-trip to NDES, which can be slow in large environments. The 802.1X profile has no built-in dependency mechanism to wait for the cert profile.

**How to avoid:**
Deploy using rings: deliver trusted root first, then SCEP/PKCS, then 802.1X — with a delay between rings measured in minutes, not milliseconds. For new device enrollment flows (Autopilot, ADE), test SCEP enrollment latency during pilot and set expectations. On Windows, the WLANSVC will retry after cert arrival. On iOS/macOS, a re-push of the Wi-Fi profile after cert enrollment succeeds will trigger reconnect.

**Warning signs:**
- L1 tickets immediately after large enrollment waves: "Can't connect to Wi-Fi."
- Intune shows the Wi-Fi profile "Succeeded" but device shows authentication failure; resolves itself within 5-10 minutes.
- SCEP profile shows "Pending" while Wi-Fi profile already shows "Succeeded."

**Target phase/tier:** Per-platform admin-setup guides (deployment sequencing section); L1 runbook (triage: check cert enrollment status before escalating).

Source: https://learn.microsoft.com/en-us/intune/device-configuration/certificates/scep-profiles (last verified 2026-06-29)

---

### A-07: Certificate Expiry — No Monitoring = Mass Outage

**What goes wrong:**
Client certificates expire and are not automatically renewed, causing all managed devices with expired certs to lose 802.1X access simultaneously. This is particularly severe for wired 802.1X on Windows workstations (users get locked out of corporate network) and for Wi-Fi on iOS/iPadOS (all devices drop). SCEP profiles have a "Renewal threshold (%)" setting that triggers early renewal — if misconfigured or if the NDES connector is unavailable at renewal time, renewals fail silently.

**Why it happens:**
Certificate validity periods set to 1 year (common NDES template default) without alert monitoring. No process to verify NDES renewal is succeeding at 80% of validity period. Admins set renewal threshold at 20% but the SCEP connector fails for a week without detection.

**How to avoid:**
Set the SCEP profile "Renewal threshold (%)" to 20% (renewal starts at 80% of cert lifetime). Monitor SCEP connector health in Intune (Tenant administration > Connectors and tokens > Certificate connectors). Configure Intune device reports to alert on large numbers of "Error" cert profile states. For critical environments, use shorter cert lifetimes (90 days) to increase renewal frequency and detect infrastructure issues earlier. Document the renewal threshold setting explicitly in the admin-setup guide.

**Warning signs:**
- Sudden spike in 802.1X failures across a large number of devices.
- Intune certificate profile shows "Error" on devices that previously showed "Succeeded."
- SCEP connector event log shows renewal failures.

**Target phase/tier:** Per-platform admin-setup guides (certificate profile settings section); "What breaks" callout.

Source: https://learn.microsoft.com/en-us/intune/fundamentals/certificates/overview (last verified 2026-06-29)

---

### A-08: Missing Intermediate CA in the Trust Chain

**What goes wrong:**
The device has the root CA certificate (via Trusted Certificate profile) but is missing an intermediate CA certificate that was used to sign either the client certificate or the RADIUS server certificate. The TLS handshake fails because the certificate chain cannot be validated completely. This manifests identically to "server cert not trusted" and is particularly hard to diagnose because the root is present.

**Why it happens:**
Organizations use two-tier or three-tier PKI (root CA offline, issuing CA online). The Trusted Certificate profile deploys only the root CA cert. Intune does not automatically fetch intermediate CA certs, and many RADIUS servers do not send the full chain in the TLS handshake.

**How to avoid:**
If using a tiered PKI, deploy a Trusted Certificate profile for EACH intermediate CA in the chain. Deploy both root and intermediate profiles to the same target groups before the SCEP/PKCS and 802.1X profiles. Verify by checking the certificate chain on a test device.

**Warning signs:**
- macOS: Keychain Access shows the RADIUS cert as "Not Trusted" even though the root is installed.
- Windows: Event 8001 in WLAN-AutoConfig/Operational: "The server certificate chain couldn't be validated."
- iOS: Wi-Fi authentication fails immediately after joining.

**Target phase/tier:** Foundation phase (cert delivery prerequisites); L2 runbook (trust chain inspection).

---

## Section B — Per-Platform Connection Failure Modes

### B-01: Windows Wired — Wired AutoConfig Service (dot3svc) Not Running

**What goes wrong:**
The Intune wired network profile (802.1X enforcement = Enforce) applies to the device, but the "Wired AutoConfig" service (dot3svc) is disabled or stopped. The 802.1X supplicant does not engage, the network port is not authenticated, and the device cannot access the corporate network. Intune shows the profile as "Succeeded" because the profile applied; it does not check that the service is running.

**Why it happens:**
Windows 10/11 ships with dot3svc set to "Manual" startup. A previous GPO or a standard-image script may have disabled it. Intune does not manage service startup state via the wired network profile. Admins deploy the 802.1X profile without a companion remediation script to ensure dot3svc is running.

**How to avoid:**
Deploy an Intune Remediation or PowerShell script that sets dot3svc to Automatic and starts it before or alongside the wired 802.1X profile. Document this dependency explicitly in the Windows admin-setup guide. The Intune wired profile docs note: "When enforced, the Wired AutoConfig service requires 802.1X for port authentication. Incorrect enforcement settings can block internet access, requiring manual policy removal."

**Warning signs:**
- `sc query dot3svc` returns STATE: STOPPED on the device.
- Wired network shows "Unauthenticated" in Network and Sharing Center despite profile applied.
- WLAN-AutoConfig event log is empty for wired 802.1X events (events require dot3svc).

**Target phase/tier:** Windows wired admin-setup guide; "What breaks" callout; L1 runbook (check dot3svc status as first step for wired failures).

Source: https://learn.microsoft.com/en-us/intune/device-configuration/templates/ref-wired-network-settings-windows (last verified 2026-06-29)

---

### B-02: Windows Wired — 802.1X Enforcement Misconfiguration Blocks All Wired Access

**What goes wrong:**
The Intune wired network profile "802.1x" setting is set to "Enforce" but the RADIUS server is not reachable or rejects the device. All wired access is blocked — the switch port enforces 802.1X and the device cannot authenticate. If the RADIUS server is down or misconfigured, ALL wired-connected Windows devices lose network access simultaneously. Profile removal requires network access (chicken-and-egg problem).

**Why it happens:**
The "Enforce" setting is the intended production configuration, but it must be deployed only after confirming the RADIUS/NPS infrastructure is working and all devices have valid certs. Admins deploy "Enforce" during initial rollout before the cert pipeline is fully validated.

**How to avoid:**
Stage rollout: deploy wired profile with 802.1X = "Do not enforce" first (to test profile delivery), then switch to "Enforce" only after confirming RADIUS is reachable and devices have certs. Test in a lab environment with a subset of devices before fleet-wide enforcement. Have an emergency break-glass procedure for removing 802.1X enforcement (requires network access or a local admin with cable to non-802.1X port).

**Warning signs:**
- All wired devices on a switch lose connectivity simultaneously.
- Switch shows port in "Unauthorized" state.

**Target phase/tier:** Windows wired admin-setup guide (critical callout); L2 runbook.

---

### B-03: Windows Wi-Fi — User vs Machine Authentication Mode Mismatch

**What goes wrong:**
The Intune Windows Wi-Fi profile is configured for "User" authentication mode (authMode = user in the profile XML). The device needs to authenticate before user logon (e.g., for Group Policy, domain logon, etc.), but user credentials are not available at boot time. The device is on an open or unauthenticated network until a user logs in. Alternatively, if "Machine" (Computer) authentication is configured but only user certificates are deployed via SCEP (no machine certificate profile), machine auth fails.

**Why it happens:**
The authMode setting is not surfaced prominently in the Intune UI. The default behavior for Windows Wi-Fi profiles is "User" mode. Admins who need pre-logon network access (hybrid join, domain logon) discover this gap during testing.

**How to avoid:**
For pre-logon network access, configure authMode = machineOrUser (or machine) and ensure a machine/device certificate profile (SCEP with "Device" as certificate type) is deployed alongside the user certificate profile. For purely cloud-native (Entra-joined) devices where user authentication is sufficient, "User" mode is appropriate.

**Warning signs:**
- Domain-joined devices fail to receive Group Policy at boot.
- Device shows as "Not connected" on the network until user logs in.
- Intune reports show devices that are off-network during business hours until user sign-in.

**Target phase/tier:** Windows Wi-Fi and wired admin-setup guide (authentication mode section).

---

### B-04: macOS Wired vs Wi-Fi Profile Type Confusion

**What goes wrong:**
A macOS wired 802.1X Intune profile is created as a Wi-Fi profile type or vice versa. The profile applies but does not configure the correct network interface. macOS handles wired (Ethernet) and wireless 802.1X through separate payload types and separate Intune profile types. Assigning a Wi-Fi 802.1X profile to control wired Ethernet auth does nothing for Ethernet ports.

**Why it happens:**
In Intune admin center, wired network profiles for macOS are a distinct profile type (Templates > Wired network) from Wi-Fi profiles. Admins familiar with Windows (where a single "Wired Network" profile covers 802.1X) may create a Wi-Fi profile for macOS and wonder why Ethernet is not authenticating.

**How to avoid:**
Create separate Intune profiles for macOS Wi-Fi (Wi-Fi profile type) and macOS wired (Wired network profile type). Both support EAP-TLS, PEAP, and EAP-TTLS but are configured independently.

**Warning signs:**
- macOS device connects to Wi-Fi with 802.1X but fails on Ethernet with the same credentials.
- Profile list shows only a Wi-Fi profile; no Wired network profile assigned.

**Target phase/tier:** macOS admin-setup guide (wired and Wi-Fi sections must be distinct); foundation phase (wired-vs-wireless supplicant model).

---

### B-05: iOS/iPadOS — PEAP Inner Auth Must Be MS-CHAPv2

**What goes wrong:**
An iOS/iPadOS Wi-Fi profile is configured for PEAP with "PAP" as the inner authentication method. iOS does not support PAP as a PEAP inner method. The EAP negotiation fails and the device shows "Authentication Failed." The RADIUS server logs show an EAP-NAK from the client rejecting the proposed inner method.

**Why it happens:**
Admins copy inner auth settings from macOS or Windows PEAP configurations where PAP is a valid inner method. iOS does not support PAP inside PEAP — only MS-CHAPv2 is supported. The Intune iOS Wi-Fi profile UI lists only supported methods, but if the admin uses a custom profile or imports settings, PAP can be set.

**How to avoid:**
For iOS/iPadOS PEAP: always use MS-CHAPv2 as the inner authentication method. Document this constraint explicitly in the iOS/iPadOS admin-setup guide as a platform-specific "What breaks" callout.

**Warning signs:**
- Wi-Fi shows "Authentication Failed" on iOS immediately.
- RADIUS logs show EAP-NAK from the device.
- macOS and Windows devices on the same SSID with PEAP+PAP succeed; iOS devices fail.

**Target phase/tier:** iOS/iPadOS admin-setup guide (PEAP section); L1 runbook.

---

### B-06: Android Enterprise — Missing UPN in Certificate SAN Breaks Wi-Fi Profile Deployment

**What goes wrong:**
For Android Enterprise (all enrollment types) using EAP-TLS or PEAP with a certificate, the Subject Alternative Name (SAN) of the client certificate MUST include the user principal name (UPN). If the UPN is absent from the SAN, the Wi-Fi profile deployment FAILS — not just authentication, the profile itself does not apply. Intune reports a profile error on the device. This affects both user certificates (SCEP/PKCS for personally-owned work profile) and device certificates (Fully Managed, COPE).

**Why it happens:**
Certificate templates are configured with only a CN or email SAN. The UPN format (user@domain.com) in the SAN is an Android Enterprise-specific requirement not clearly documented alongside the generic SCEP profile instructions. Admins test on iOS or Windows first (where the UPN-in-SAN requirement doesn't apply) and port the same cert template to Android without modification.

**How to avoid:**
In the Intune SCEP profile for Android Enterprise, configure Subject Alternative Name to include "User principal name (UPN)" as a SAN attribute. Verify the SCEP profile is generating certs with the UPN SAN before assigning the Wi-Fi profile. For device certificates, use the device's UPN or a device-identity SAN.

**Warning signs:**
- Android devices show the Wi-Fi profile as "Error" in Intune while the same Wi-Fi profile succeeds on other platforms.
- Certificate profile shows "Succeeded" but Wi-Fi profile shows "Error" on the same device.
- Other platforms (iOS, Windows) with identical Wi-Fi SSID/EAP config succeed.

**Target phase/tier:** Android admin-setup guide (SCEP cert profile section + Wi-Fi profile section); "What breaks" callout.

Source: https://learn.microsoft.com/en-us/intune/device-configuration/templates/ref-wifi-settings-android-enterprise (last verified 2026-06-29)

---

### B-07: Android 14+ RADIUS Server Name Length Limit and Special Characters

**What goes wrong:**
On Android 14 and newer, the total combined content length of all RADIUS server name entries in the Wi-Fi profile cannot exceed 256 characters, and special characters are not allowed. An admin who lists multiple FQDN entries (e.g., radius1.corp.example.com, radius2.corp.example.com, radius3.corp.example.com) hits the limit. The profile fails silently or applies but ignores the excess entries.

**Why it happens:**
Android 14 tightened the Wi-Fi profile validation constraints. Admins who configured Android 11/12/13 profiles with long server name lists discover the profiles fail on Android 14 devices without a clear error.

**How to avoid:**
Use only the common DNS suffix (e.g., .corp.example.com) instead of full FQDNs when multiple RADIUS servers share the same suffix. Count total characters before deploying. Version-gate this callout to Android 14+ with a freshness stamp.

**Warning signs:**
- Android 14 devices fail Wi-Fi profile; Android 13 and earlier succeed with the same profile.
- Intune shows "Error" on Android 14 devices for the Wi-Fi profile.

**Target phase/tier:** Android admin-setup guide; version-gated callout with `last_verified`/`review_by` freshness stamp.

Source: https://learn.microsoft.com/en-us/intune/device-configuration/templates/ref-wifi-settings-android-enterprise (last verified 2026-06-29)

---

### B-08: Android Enterprise — Certificate Access Approval Required for Fully Managed / COPE

**What goes wrong:**
For Android Enterprise Fully Managed (COBO), Dedicated (COSU), and Corporate-Owned Work Profile (COPE) devices, certificate access from the keystore to specific apps (including the Wi-Fi supplicant) requires either user approval or a grant of silent access. If neither is configured, the device has the certificate but the Wi-Fi supplicant cannot access it, causing 802.1X authentication to fail even when the certificate profile shows "Succeeded."

**Why it happens:**
Admins deploy the SCEP certificate profile and the Wi-Fi profile but do not configure the "Certificate access" setting in the SCEP profile. The default is "Require user approval for all apps," which is silently rejected on fully-managed devices with no user interaction.

**How to avoid:**
In the SCEP certificate profile for Android Enterprise Device Owner profiles, configure "Certificate access" to either "Grant silently for specific apps" (recommended — allows Wi-Fi supplicant silent access) or verify user approval is available on the enrollment type. Note the official limitation: for Device Owner profiles, certificate reporting in Intune is unavailable and Intune cannot revoke these certificates.

**Warning signs:**
- SCEP profile shows "Succeeded" on Fully Managed devices but Wi-Fi authentication fails.
- Works on Work Profile (BYOD) devices but not on COBO.

**Target phase/tier:** Android admin-setup guide (SCEP cert profile section for Device Owner types).

Source: https://learn.microsoft.com/en-us/intune/device-configuration/certificates/scep-profiles (last verified 2026-06-29)

---

### B-09: Linux — Limited Intune Wi-Fi Profile Surface for 802.1X

**What goes wrong:**
Admins expect to configure enterprise Wi-Fi (802.1X) for Ubuntu 22.04/24.04 devices through Intune the same way they do for Windows or macOS. Intune's Linux management surface (Ubuntu 22.04/24.04 LTS) does not support pushing Wi-Fi configuration profiles or certificate profiles to configure 802.1X in the same way as other platforms. The Linux Intune agent handles compliance, apps, and scripts — but enterprise Wi-Fi profile delivery via MDM payloads is not available as of the v1.14 research date.

**Why it happens:**
The cross-platform documentation pattern leads admins to expect symmetric 802.1X config coverage. Linux 802.1X is typically handled through wpa_supplicant.conf, NetworkManager profiles, or custom Bash scripts deployed via Intune's shell script feature — not through native Wi-Fi profile payloads.

**How to avoid:**
Document clearly in the Linux admin-setup guide that 802.1X configuration is delivered via shell scripts (Intune > Devices > Linux > Shell scripts) that configure wpa_supplicant or NetworkManager, NOT via a native Wi-Fi profile payload. Certificates for Linux 802.1X are not delivered via Intune certificate profiles; they must be bundled in the script or managed separately. Wired 802.1X for Linux follows a similar pattern. This is a platform-scoped constraint, not a gap in Intune.

**Warning signs:**
- Admin searches Intune admin center for "Linux" + "Wi-Fi" profile type and finds no Wi-Fi profile option.
- Certificate profile for Linux shows only basic cert types, not 802.1X-specific flows.

**Target phase/tier:** Linux admin-setup guide (prominent constraint callout); foundation phase (supplicant model comparison table noting Linux is script-delivered).

**Confidence:** MEDIUM — Linux Intune surface is actively developing; verify against current Microsoft Learn Linux device management docs at authoring time.

---

## Section C — EAP-Method-Specific Failure Modes

### C-01: EAP-TLS — Outer Identity / Identity Privacy Leaks Username

**What goes wrong:**
In EAP-TLS, the supplicant sends the "outer identity" (before the TLS tunnel is established) as the username from the certificate's Subject or SAN. If identity privacy / anonymous outer identity is not configured, the real UPN (e.g., jsmith@corp.com) is sent in cleartext before the tunnel is established, leaking PII and internal directory structure to anyone observing the wireless or wired segment.

**Why it happens:**
EAP-TLS identity privacy ("Outer identity" or "Identity privacy") defaults vary by platform. On Android Enterprise, the "Identity privacy" field is explicitly surfaced in the Wi-Fi profile UI and defaults to empty (real identity used). Admins leave it blank because "the cert has the identity anyway."

**How to avoid:**
Populate the "Identity privacy" or "Outer identity" field with an anonymous value (e.g., "anonymous" or "anonymous@corp.com") in ALL EAP-TLS Wi-Fi and wired profiles across all platforms. This does not affect authentication — the real identity is established inside the TLS tunnel. Document this in the admin-setup guide for each platform.

**Warning signs:**
- Wireless capture shows plaintext UPNs in EAP-Identity-Response frames.
- Privacy audit flags 802.1X as leaking user identities.

**Target phase/tier:** Foundation phase (EAP-TLS overview); per-platform admin-setup guides.

---

### C-02: PEAP-MSCHAPv2 — Server Validation Disabled = Rogue RADIUS Attack Surface

**What goes wrong:**
PEAP-MSCHAPv2 with server validation disabled (the supplicant accepts any RADIUS certificate) allows a rogue RADIUS server to intercept the MSCHAPv2 exchange and offline-crack the NT hash to recover the user's password. This is a well-known attack and is explicitly the reason server validation must be enforced in enterprise profiles.

**Why it happens:**
In Windows, the EAP-TTLS XML default has `<PerformServerValidation>false</PerformServerValidation>`. Admins use the default XML skeleton, or disable validation to "get it working faster" during testing and forget to re-enable it. Some old StackOverflow and community guides advise disabling server validation to bypass cert trust issues — a shortcut that should never appear in production docs.

**How to avoid:**
Always set PerformServerValidation = true (Windows) / equivalent per platform. Always reference a trusted root certificate for RADIUS server validation. Never document or show examples with server validation disabled. Enable cryptographic binding (Windows PEAP setting) to further harden against relay attacks.

**Warning signs:**
- Profile review shows PerformServerValidation = false.
- Wi-Fi profile has no "Root certificate for server validation" referenced.

**Target phase/tier:** Foundation phase (PEAP-MSCHAPv2 overview — prominent security callout); per-platform admin-setup guides.

---

### C-03: EAP-TTLS — Inner Auth Method Mismatch

**What goes wrong:**
The Intune EAP-TTLS profile specifies "MS-CHAPv2" as the inner authentication method, but the RADIUS server is configured for PAP only. The inner auth method negotiation fails, causing authentication to fail after the outer TLS tunnel is established. The failure is at the RADIUS level (Access-Reject with reason "authentication method not configured") but appears to the client simply as "Authentication Failed."

**Why it happens:**
EAP-TTLS inner auth methods must match between the Intune client profile and the RADIUS/NPS server policy. The default in Intune for EAP-TTLS is "Username and Password" with the admin selecting the inner method. Admins select MS-CHAPv2 (as it appears more secure) without confirming the NPS policy is configured for it.

**How to avoid:**
Coordinate with the RADIUS/NPS admin (or consult existing NPS policy documentation) before selecting the EAP-TTLS inner auth method. Document the exact inner method in the admin-setup guide for the organization. For macOS, the supported inner auth options are PAP, CHAP, MS-CHAP, MS-CHAP v2 — verify against the Intune macOS wired/Wi-Fi profile documentation.

**Warning signs:**
- EAP-TTLS authentication fails after the outer tunnel is established (longer delay than an outer identity rejection).
- RADIUS logs show "Authentication method not configured."

**Target phase/tier:** Per-platform admin-setup guides (EAP-TTLS section); L2 runbook.

Source: https://learn.microsoft.com/en-us/intune/device-configuration/templates/ref-wired-network-settings-macos (last verified 2026-06-29)

---

### C-04: PEAP/EAP-TTLS — Anonymous Outer Identity Not Set

**What goes wrong:**
For PEAP and EAP-TTLS, the outer identity (sent before the encrypted tunnel) reveals the real username unless the "Identity privacy" / "Outer identity" field is set. Unlike EAP-TLS (where the outer identity comes from the cert), PEAP/EAP-TTLS allows specifying an arbitrary outer identity string. Leaving it blank means the device uses the actual username as the outer identity.

**How to avoid:**
Set "Identity privacy" to "anonymous" or "anonymous@domain" in all PEAP and EAP-TTLS profiles. On Android Enterprise, this is the "Identity privacy" field. On iOS, it is the equivalent field in the EAP configuration. On Windows, the PEAP configuration in Intune has an "outer identity" field.

**Target phase/tier:** Per-platform admin-setup guides; foundation phase (identity privacy concept).

---

## Section D — Diagnostic Signals Per Platform

### D-01: Where Failures Surface — Platform Diagnostic Map

| Platform | Where L1 sees it | Where L2 investigates | RADIUS-visible signal (informational — out of config scope) |
|----------|-------------------|----------------------|-------------------------------------------------------------|
| Windows (Wi-Fi) | Network icon shows "No Internet" or "Authentication Failed"; Settings > Network | Event Viewer: Applications and Services Logs > Microsoft > Windows > WLAN-AutoConfig/Operational (events 8001, 8003); `netsh wlan show profiles name="SSID"` | Access-Reject with NPS reason code (16 = auth failed, 48 = no matching client, 65 = access denied) |
| Windows (Wired) | Network icon "Unauthenticated Network"; no internet on wired NIC | Event Viewer: Dot3Svc/Operational channel; `netsh lan show profiles`; `sc query dot3svc` | Same NPS reason codes as above |
| macOS (Wi-Fi) | Wi-Fi icon shows no network; System Settings > Wi-Fi shows "Authentication Failed" | `/var/log/wifi.log`; Console.app filter on "Wi-Fi"; `system_profiler SPNetworkDataType`; `security find-certificate` | NPS Event 6273 (Access-Reject) with reason code |
| macOS (Wired) | System Settings > Network shows Ethernet "Not Connected" or "Unauthenticated" | Console.app filtered for "EAP"; Keychain Access to verify cert presence | Same NPS events |
| iOS/iPadOS | Settings > Wi-Fi shows "Authentication Failed" next to SSID | Intune admin center > Device > Device configuration profile status; Settings > General > VPN & Device Management (verify profile installed and cert present) | NPS Event 6273 |
| Android Enterprise | Device shows no Wi-Fi icon or authentication error; work apps cannot reach corporate resources | Intune admin center > Device > Device configuration > profile error; for COBO/COPE: ADB logcat (L2 only) | NPS Event 6273 |
| Linux | NetworkManager shows network unavailable; `wpa_supplicant` log shows EAP failure | `journalctl -u wpa_supplicant` or `journalctl -u NetworkManager`; `/var/log/syslog` | Same NPS events |

**Note on RADIUS/NPS diagnostic signals:** The docs MUST document these failure signals from the client-side perspective only. The NPS server events are visible to the infrastructure team (out of scope for this suite's configuration), but L2 engineers need to know what to ASK for when escalating — include a "request from NPS team" prompt in the L2 runbook without documenting NPS server configuration.

**Target phase/tier:** L1 triage runbook (where to look); L2 investigation runbook (detailed diagnostic steps); one page per platform or a consolidated diagnostic cross-reference.

---

## Section E — Documentation / Authoring Pitfalls for This Suite

### E-01: Server-Side Scope Creep — Documenting RADIUS/NPS Configuration

**What goes wrong:**
Authors begin documenting 802.1X and naturally want to explain "why the RADIUS server rejects certificates" — which leads to documenting NPS network policies, RADIUS client entries, certificate templates on the CA, and NPS policy conditions. This is explicitly out of scope: "Intune client-side config only — assumes RADIUS/NPS already exists."

**Prevention:**
Every admin-setup guide, L1 runbook, and L2 runbook must include a prominent scope callout: "This guide covers Intune client-side configuration only. For RADIUS/NPS server configuration, consult your network infrastructure team." In L2 runbooks, include a "What to request from the RADIUS/NPS team" section (NPS reason codes, NPS server event log access) rather than documenting NPS config steps.

**Phase to address:** Foundation phase (scope callout in 802.1X overview doc) AND at the start of each per-platform admin-setup guide.

---

### E-02: Copy-Paste Instead of Link-Not-Copy Across 5 Platform Pages

**What goes wrong:**
The 5 per-platform admin-setup guides share substantial conceptual content: "always deploy trust before SCEP," "EKU must be Client Authentication," "server validation required," "identity privacy best practice." Authors under time pressure duplicate this text across all 5 pages. When the content needs updating (e.g., a Microsoft Learn URL changes, or a new version-gated callout is needed), 5 copies diverge.

**Prevention:**
The foundation phase MUST establish the shared 802.1X concepts page (EAP-method overview, cert delivery prerequisite model, server trust model) that all 5 per-platform guides link to for conceptual content. Each platform guide then covers only platform-specific settings, constraints, and "What breaks" callouts. Use the suite's link-not-copy convention from the start. Reviewers should flag any paragraph appearing in more than one platform guide for refactoring.

**Phase to address:** Foundation phase (create the shared 802.1X concepts page); per-platform phases (author platform-specific only, link to foundation for shared concepts).

---

### E-03: Missing Freshness Stamps on Version-Gated Content

**What goes wrong:**
The suite enforces per-section `last_verified`/`review_by` frontmatter stamps on version-gated content. 802.1X for this milestone has multiple version-gated constraints:
- Android 11+: RADIUS server name required (vs. optional on Android 10 and earlier)
- Android 14+: 256-character RADIUS server name limit + no special characters
- Windows 11 24H2+: any behavioral changes to Wired AutoConfig or PEAP handling
- iOS 16+: any EAP method constraints changes
- Linux Ubuntu 22.04 vs 24.04: Intune agent capabilities differ

Each version-gated callout that is authored without `last_verified` + `review_by` stamps will fail the audit harness staleness checks.

**Prevention:**
Every version-gated callout (Android 11+, Android 14+, any OS-version-specific behavior) MUST carry `last_verified: YYYY-MM-DD` and `review_by: YYYY-MM-DD` (set to +90 days or +180 days depending on drift risk). Add these stamps at authoring time. Do not backfill.

**Phase to address:** Every per-platform admin-setup phase; harness-lineage phase validator must check for stamps on version-gated sections.

---

### E-04: Breaking the Audit Harness — Predecessor Frozen Surfaces Must Not Be Touched

**What goes wrong:**
The v1.14 chain-validator apex checks predecessor frozen surfaces (all phases 48..100) via the byte-unchanged-invariant. If any 802.1X authoring phase inadvertently edits a v1.0–v1.13 file (e.g., adds 802.1X context to an existing Windows admin-setup guide that was frozen at v1.2), the chain validator fails. Authors who are not aware of this constraint will edit existing files during content authoring.

**Prevention:**
- New 802.1X content goes into NEW files (new guides under `docs/admin-setup-windows/`, `docs/admin-setup-macos/`, `docs/admin-setup-ios/`, `docs/admin-setup-android/`, `docs/admin-setup-linux/`), numbered to continue the existing guide sequence.
- Existing files that need a cross-reference to 802.1X content receive only append-only nav edits (adding a link row at the bottom of an existing table or "See Also" section), which are expected modifications and should be in the audit allowlist.
- The byte-unchanged-invariant applies to the content of frozen milestone validators, not necessarily to nav hubs — but any edit to a nav hub file must be allowlisted explicitly.
- The Pillar B corpus nits (docs/index.md:108, quick-ref-l1.md:101, common-issues.md:242-247) are the ONLY planned edits to pre-existing files; these must be carefully tracked in the requirements.

**Phase to address:** Harness-lineage phase (allowlist new 802.1X files); every content phase (authors must be instructed not to edit pre-v1.14 files).

---

### E-05: Glossary and Capability-Matrix Integrity Violations

**What goes wrong:**
The suite maintains a cross-platform glossary and capability matrices. New 802.1X content introduces terms (supplicant, authenticator, RADIUS, EAP-TLS, EAP-TTLS, PEAP, MSCHAPv2, 802.1X authenticator port, dot3svc, wpa_supplicant, NDES, SCEP, PKCS) and new capability matrix rows (802.1X wired + Wi-Fi per platform). Authoring 802.1X content without simultaneously updating the glossary and capability matrix creates broken links and stale capability claims.

**Prevention:**
The foundation phase must define all new 802.1X glossary terms in the correct glossary file(s) BEFORE per-platform guides reference them. Capability matrix rows for 802.1X (wired: yes/no per platform, Wi-Fi: yes/no per platform, EAP-TLS/PEAP/EAP-TTLS: yes/no per platform) must be added in the integration phase. The harness C-series checks (cross-link integrity, keyword tokens) will flag missing glossary entries.

**Phase to address:** Foundation phase (glossary); integration/navigation-last phase (capability matrix + nav hub wiring).

---

### E-06: Treating EAP Methods as Unequal — Scope Violation

**What goes wrong:**
The v1.14 scope explicitly requires EAP-TLS, PEAP-MSCHAPv2, and EAP-TTLS to be treated as "co-equal paths." An author who personally prefers EAP-TLS (or one who reads Microsoft's "recommended" EAP-TLS guidance for highest security) may write the docs with EAP-TLS as the primary path and PEAP/EAP-TTLS as appendices or secondary callouts. This violates the scope constraint and creates coverage asymmetry that will be caught in the review gate.

**Prevention:**
Each per-platform admin-setup guide must document all three EAP methods with equal depth — same number of steps, same "What breaks" callouts, same diagnostic references. If the Intune UI for a given platform surfaces EAP-TLS more prominently, note this in the guide but still document all three methods equally. Foundation phase must establish the three-method-equal template that per-platform guides follow.

**Phase to address:** Foundation phase (establish co-equal EAP method template); every per-platform phase (apply the template).

---

### E-07: iOS/iPadOS .mobileconfig Payload Confusion — Separate Profile Types for Wi-Fi vs Cert

**What goes wrong:**
Authors document iOS/iPadOS 802.1X as if a single Intune profile delivers both the certificate and the Wi-Fi configuration simultaneously (as a combined .mobileconfig). In reality, Intune delivers them as separate profiles: a SCEP/PKCS certificate profile (which creates the identity cert in the iOS keychain) and a separate Wi-Fi profile (which references the cert by type, not by profile name). An author who documents "create a combined Wi-Fi + cert profile" will describe a non-existent UI flow in Intune.

**Prevention:**
Document iOS/iPadOS 802.1X as two distinct Intune profiles: (1) Trusted Certificate profile for RADIUS CA, (2) SCEP or PKCS certificate profile for client identity, (3) Wi-Fi profile referencing the certificate type. Emphasize that delivery ordering matters. Do not describe the Apple Configurator or manual .mobileconfig approach — this suite is Intune-managed-fleet only.

**Phase to address:** iOS/iPadOS admin-setup guide.

---

## Section F — Phase-Specific Warnings and Pitfall-to-Phase Mapping

| Pitfall | Phase/Tier | Prevention |
|---------|-----------|------------|
| A-01 Trust-before-profile ordering | Foundation phase + all per-platform setup guides | Prerequisite section; "What breaks" callout |
| A-02 Missing Client Auth EKU | Foundation + SCEP guide + L2 runbook | EKU requirement in cert profile section |
| A-03 SCEP vs PKCS misconfig | Foundation + per-platform setup | Cert delivery comparison in foundation |
| A-04 RADIUS server cert not trusted | Foundation + per-platform setup + L1/L2 | Server trust section; "What breaks" callout |
| A-05 Server name validation disabled | Foundation (security callout) + per-platform + Android 14 version-gate | Mandatory validation requirement; freshness stamp on Android 14 note |
| A-06 Cert not present at connect time | All per-platform setup (sequencing section) + L1 triage | Deployment sequencing; L1 check-cert-first step |
| A-07 Cert expiry no monitoring | Per-platform setup (cert profile section) | Renewal threshold setting doc; monitoring callout |
| A-08 Missing intermediate CA | Foundation + L2 runbook | Trust chain section |
| B-01 dot3svc not running | Windows wired setup guide + L1 runbook | Service dependency callout; remediation script note |
| B-02 802.1X enforce blocks all wired | Windows wired setup guide | Critical callout + staged rollout guidance |
| B-03 User vs machine auth mode | Windows Wi-Fi + wired setup guide | Auth mode table |
| B-04 macOS wired vs Wi-Fi profile type | macOS wired + Wi-Fi setup guide | Separate profile type guidance |
| B-05 iOS PEAP inner auth must be MSCHAPv2 | iOS setup guide | Platform-specific "What breaks" callout |
| B-06 Android UPN in SAN required | Android setup guide | SCEP cert SAN requirement callout |
| B-07 Android 14+ RADIUS name length | Android setup guide | Version-gated callout with freshness stamp |
| B-08 Android COPE/COBO cert access | Android setup guide | Certificate access setting documentation |
| B-09 Linux limited MDM Wi-Fi surface | Linux setup guide | Platform constraint callout; script delivery approach |
| C-01 EAP-TLS outer identity leaks | Foundation + all per-platform setup | Identity privacy section |
| C-02 PEAP server validation disabled | Foundation (security) + all per-platform | Security callout; never show disabled examples |
| C-03 EAP-TTLS inner auth mismatch | Per-platform setup (EAP-TTLS section) + L2 runbook | Inner auth coordination note |
| C-04 PEAP/TTLS outer identity | All per-platform (PEAP/TTLS sections) | Identity privacy setting documentation |
| D-01 Diagnostic signal mapping | L1 triage runbook + L2 investigation runbook | Platform-specific diagnostic table |
| E-01 Server-side scope creep | Every phase (author guidance) | Scope callout in every guide |
| E-02 Copy-paste across platforms | Foundation phase (create shared page) + all per-platform | Link-not-copy enforcement via review |
| E-03 Missing freshness stamps | Every phase (authoring checklist) | Version-gated content must have stamps |
| E-04 Breaking frozen surfaces | Harness-lineage phase | Allowlist new files; no edits to v1.0-v1.13 content |
| E-05 Glossary/matrix integrity | Foundation (glossary) + integration (capability matrix) | Pre-populate glossary before per-platform guides |
| E-06 EAP methods treated unequal | Foundation (template) + all per-platform | Co-equal three-method template |
| E-07 iOS .mobileconfig confusion | iOS setup guide | Three-separate-profiles documentation model |

---

## Sources

- Microsoft Learn: Add Wi-Fi settings for Windows 10/11 devices — https://learn.microsoft.com/en-us/intune/device-configuration/templates/ref-wifi-settings-windows (verified 2026-06-29)
- Microsoft Learn: Wired network settings for Windows — https://learn.microsoft.com/en-us/intune/device-configuration/templates/ref-wired-network-settings-windows (verified 2026-06-29)
- Microsoft Learn: Wired network settings for macOS — https://learn.microsoft.com/en-us/intune/device-configuration/templates/ref-wired-network-settings-macos (verified 2026-06-29)
- Microsoft Learn: Wi-Fi settings for Android Enterprise — https://learn.microsoft.com/en-us/intune/device-configuration/templates/ref-wifi-settings-android-enterprise (verified 2026-06-29)
- Microsoft Learn: Wi-Fi settings for Android device administrator — https://learn.microsoft.com/en-us/intune/device-configuration/templates/ref-wifi-settings-android (verified 2026-06-29)
- Microsoft Learn: Wi-Fi settings for Apple devices (iOS/macOS) — https://learn.microsoft.com/en-us/intune/device-configuration/templates/ref-wifi-settings-apple (verified 2026-06-29)
- Microsoft Learn: Create trusted certificate profiles in Intune — https://learn.microsoft.com/en-us/intune/device-configuration/certificates/trusted-root-profiles (verified 2026-06-29)
- Microsoft Learn: Create and assign SCEP certificate profiles — https://learn.microsoft.com/en-us/intune/device-configuration/certificates/scep-profiles (verified 2026-06-29)
- Microsoft Learn: Configure and use imported PKCS certificates — https://learn.microsoft.com/en-us/intune/device-configuration/certificates/imported-pfx-profiles (verified 2026-06-29)
- Microsoft Learn: Use certificates for authentication in Intune — https://learn.microsoft.com/en-us/intune/fundamentals/certificates/overview (verified 2026-06-29)
- Microsoft Learn: Create EAP-based Wi-Fi profile via XML — https://learn.microsoft.com/en-us/intune/device-configuration/templates/create-wifi-preshared-key (verified 2026-06-29)
- Microsoft Learn: Intune device configuration profiles — https://learn.microsoft.com/en-us/intune/intune-service/configuration/device-profiles (verified 2026-06-29)

---

*Pitfalls research for: 802.1X network authentication via Intune (wired + Wi-Fi, all EAP methods, 5 platforms)*
*Researched: 2026-06-29*
*Confidence: HIGH (certificate/Windows/macOS/iOS/Android pitfalls — all verified against Microsoft Learn); MEDIUM (Linux); LOW (RADIUS server-side diagnostics — informational only, out of config scope)*
