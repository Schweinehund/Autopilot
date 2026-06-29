# Feature Research — 802.1X Network Authentication Documentation (v1.14 Pillar A)

**Domain:** IT documentation — 802.1X wired + Wi-Fi authentication for Microsoft Intune-managed devices
**Researched:** 2026-06-29
**Confidence:** HIGH (all EAP behavior, platform settings, and PKCS gaps verified against Microsoft Learn; dates noted inline)

---

## 1. The 802.1X Conceptual Model (Foundation layer — required for L1/L2 audience)

The foundation documentation must explain the three-actor model at a depth that lets L1 triage without guessing and lets L2 read log output intelligently. No more, no less.

### 1.1 Three-actor model

**Supplicant** — the Intune-managed device (Windows/macOS/iOS/Android/Linux). Holds the client certificate or credentials. Drives the EAP conversation.

**Authenticator** — the network switch (wired) or wireless access point (Wi-Fi). Does not evaluate credentials. Passes EAP frames between supplicant and auth server. Enforces port state (authorized / unauthorized). This actor is out of scope for configuration in these docs but must be named so L1/L2 understand why "the network" is a variable they cannot control.

**Authentication server** — the RADIUS server (NPS, Cisco ISE, etc.). Validates credentials, issues Access-Accept or Access-Reject. Assumed to exist; its configuration is out of scope for this doc set.

### 1.2 EAPOL exchange (conceptual, not packet-level)

The documentation needs to explain EAPOL (EAP over LAN) at the level: "the switch/AP starts the exchange when the port comes up; the device responds with its identity; the switch relays this to the RADIUS server; certificates or credentials are exchanged inside a TLS session; the RADIUS server sends Accept or Reject; the switch opens or blocks the port." No raw hex, no packet captures. L1 needs to understand that authentication happens before the device has an IP address on the protected VLAN, which explains why "the network is blocked" symptoms appear at initial connection.

### 1.3 EAP method selection rationale

Three methods are co-equal in this doc set. Each must get equivalent treatment. Do not present one as "default." The choice is determined by what the RADIUS server is configured to accept (out of scope) and what client material is available.

---

## 2. EAP Method Deep-Dives (Foundation layer — one section per method)

Each method section must cover: what authenticates, what the client needs, what trust is required, and when it is chosen. This is per the research question and quality gate.

### EAP-TLS

**How it authenticates:** Mutual certificate authentication. The server presents a certificate to the client; the client presents a certificate to the server. Both are validated by trusted CAs on their respective sides. No password involved.

**What the client needs:** (a) A trusted root certificate profile installed so the client can validate the RADIUS server cert; (b) a client certificate (SCEP or PKCS) issued to the device or user. The client cert contains the identity (typically the device UPN or computer account name in the Subject Alternative Name).

**Trust requirements:** Client must trust the RADIUS server's CA (deployed via Intune trusted-root profile). RADIUS server must trust the CA that issued the client cert (CA chain configured on RADIUS server — out of scope here).

**When it is chosen:** Highest security; no password to phish or replay. Chosen when the organization already has PKI infrastructure (SCEP/PKCS via Intune) and wants zero user interaction at authentication time. Preferred for device-cert-based authentication (machine auth) so devices can connect before user login.

**Intune client-side notes:**
- All 5 platforms support EAP-TLS for Wi-Fi via Intune profiles.
- For wired (802.1X): Windows and macOS support it natively via Intune wired-network profiles; iOS/iPadOS also via wired-network profile. Android has no native wired network profile in Intune. Linux has no native Wi-Fi or wired profile (script-based workaround only).
- **PKCS gap for wired on macOS and iOS:** macOS wired network profile and iOS wired network profile accept SCEP client certificates ONLY — PKCS is explicitly NOT supported. Wi-Fi profiles on macOS and iOS DO support both SCEP and PKCS. This is a verified doc constraint that must be called out explicitly. Source: Microsoft Learn (`ref-wired-network-settings-macos`, updated 2026-06-04).

### PEAP-MSCHAPv2

**How it authenticates:** Server-only certificate authentication followed by username/password exchange inside the TLS tunnel. The client validates the RADIUS server cert; the server validates the client's AD username/password credentials via MSCHAPv2.

**What the client needs:** (a) A trusted root certificate profile (to validate the RADIUS server cert); (b) user credentials (username + password). No client certificate required.

**Trust requirements:** Client must trust the RADIUS server's CA. Server validates credentials against AD/LDAP (server-side, out of scope).

**When it is chosen:** No client cert infrastructure required. Simplest user experience in environments where users already have AD credentials. Common in BYOD scenarios where deploying client certs is impractical. The MSCHAPv2 inner method is universally supported by NPS.

**Intune client-side notes:**
- Windows Wi-Fi and Wired: PEAP with Username and Password inner method (no inner-method sub-selection required; OS implies MSCHAPv2).
- macOS Wi-Fi and Wired: PEAP with Username and Password. macOS requires the RADIUS server name entered in the profile for the dynamic trust dialog to be suppressed.
- iOS/iPadOS Wi-Fi and Wired: PEAP with Username and Password. Same server-name requirement.
- Android Enterprise: PEAP with "Non-EAP method: Microsoft CHAP Version 2" explicitly selected. Android 11+ requires Radius server name; new profiles without it may fail to connect.
- Linux: PEAP is theoretically possible via nmcli scripting but the third-party guide for Linux Intune scripted 802.1X only demonstrates EAP-TLS. PEAP via script is not natively covered in Microsoft docs. Flag as LOW confidence for Linux PEAP.

### EAP-TTLS

**How it authenticates:** Like PEAP — server certificate + TLS tunnel for the inner method. Unlike PEAP (which is a Microsoft-Cisco joint spec), EAP-TTLS is an IETF standard (RFC 5281) that supports a wider range of inner methods: PAP, CHAP, MS-CHAP, MS-CHAP v2. When the inner method is MS-CHAP v2, it is functionally equivalent to PEAP-MSCHAPv2 but uses a different tunnel negotiation.

**What the client needs:** (a) Trusted root certificate profile; (b) inner auth material — either username/password (for MS-CHAP v2) or a client certificate (for EAP-TTLS with cert inner method).

**Trust requirements:** Same as PEAP — client must trust RADIUS server's CA.

**When it is chosen:** Environments using non-Microsoft RADIUS servers (FreeRADIUS, Cisco ISE) that prefer EAP-TTLS over PEAP. Also chosen when the inner method must be PAP (e.g., for integration with some LDAP directories). The outer identity (anonymous identity) is especially important for EAP-TTLS because the real username is sent only inside the tunnel, providing identity privacy for the username itself.

**Intune client-side notes:**
- Windows Wi-Fi and Wired: EAP-TTLS fully supported. Inner methods: PAP, CHAP, MS-CHAP, MS-CHAP v2. Outer identity configurable.
- macOS Wi-Fi: EAP-TTLS supported, Username and Password inner method or Certificates inner method.
- macOS Wired: EAP-TTLS supported; Username and Password or SCEP certificate inner method. PKCS NOT supported.
- iOS/iPadOS: EAP-TTLS supported for both Wi-Fi and Wired.
- Android Enterprise: EAP-TTLS supported. Inner methods: PAP, MS-CHAP, MS-CHAP v2. Note: CHAP not listed in Android Enterprise Intune UI (only PAP, MS-CHAP, MS-CHAP v2).
- Linux: Not covered in Microsoft's Linux docs or the third-party keytos.io guide. Out of scope for this doc set on Linux (Linux docs can cover EAP-TLS only, per what's verifiable).

---

## 3. Feature Landscape

### 3.1 Table Stakes (Docs Audience Expects These — Missing = Doc Set Feels Incomplete)

| Content Topic | Why Expected | Complexity | Notes |
|---|---|---|---|
| 802.1X conceptual overview (supplicant/authenticator/auth-server/EAPOL/RADIUS) | L1/L2 cannot diagnose without understanding the 3-actor model | LOW | ~500–700 words; no packet-level detail needed |
| Per-EAP-method comparison: what authenticates, what client needs, trust requirements | Required to understand profile config choices | MEDIUM | 3 methods × 4 dimensions; present as a table plus short prose |
| Certificate delivery prerequisites (trusted root + SCEP/PKCS chain) before any network profile | All 802.1X cert-based methods require certs to arrive first | MEDIUM | Must make deployment order explicit: root cert → client cert → Wi-Fi/Wired profile |
| Per-platform Wi-Fi 802.1X admin-setup guide (5 platforms) | The core deliverable; admins cannot configure without this | HIGH | Windows / macOS / iOS / Android / Linux × 3 EAP methods each |
| Per-platform Wired 802.1X admin-setup guide (Windows + macOS + iOS) | Wired 802.1X is a stated requirement for the milestone | HIGH | Linux and Android have no native wired profile in Intune — must be documented as out-of-scope with rationale |
| SCEP certificate profile setup for 802.1X (how to configure a cert that lands in the Wi-Fi profile) | Without SCEP profile guidance, EAP-TLS cannot be deployed | MEDIUM | Applies to all 5 platforms; reference to NDES/Connector infra as assumed-exists prerequisite |
| PKCS certificate profile setup for 802.1X | PKCS is widely used; omitting makes docs incomplete for PKCS shops | MEDIUM | Note macOS/iOS wired restriction (SCEP only) |
| L1 runbook: "Device cannot connect to 802.1X Wi-Fi — where to start" | L1 teams need a scripted first-check flow | MEDIUM | Decision tree entry point; same pattern as existing runbooks #1–#37 |
| L1 runbook: "Certificate failure on 802.1X network" | Certificate errors are the most common 802.1X failure type | MEDIUM | Cover expired cert, wrong cert, cert not present |
| L2 runbook: "RADIUS reject investigation" | L2 needs log-based investigation for Access-Reject | HIGH | Per-platform log locations; event IDs; what to send to network team |
| L2 runbook: "EAP negotiation failure" | EAP method mismatch is common; requires log analysis | HIGH | Per-platform diagnostic commands |
| Server trust / RADIUS server name validation guidance | Misconfigured server trust = silent connection failure or user dialogs | MEDIUM | Platform-specific: macOS requires server name to suppress dynamic trust dialog; Android 11+ requires it |
| Glossary entries for 802.1X domain terms | Consistent terminology across all 5 platforms | LOW | EAPOL, supplicant, authenticator, RADIUS, EAP-TLS, PEAP, EAP-TTLS, inner identity, outer identity, trusted root |
| 802.1X rows in per-platform capability matrices | Existing doc structure requires capability matrix integration | LOW | Append-only; low risk |
| Nav-hub wiring (docs/index.md integration) | All new docs must be reachable from the hub | LOW | Pattern established; navigation-last per PROJECT.md |

### 3.2 Differentiators (Valuable, Not Strictly Expected)

| Content Topic | Value Proposition | Complexity | Notes |
|---|---|---|---|
| "Which EAP method should I choose?" decision matrix (admin-facing) | Collapses a common consultation question into a scannable table | LOW | Based on: cert infra availability, user type (corporate/BYOD), RADIUS vendor |
| Authentication mode decision (user vs machine vs user-or-machine) — Windows | Machine auth enables pre-logon network access; this is a meaningful operational choice | LOW | Windows only; the other platforms do not expose the same concept via Intune |
| macOS deployment channel (user vs device) gotcha | Immutable after deploy; cert ends up in wrong keychain if wrong channel chosen | LOW | Critical: misconfiguration requires profile recreate + reassign |
| iOS MAC address randomization and 802.1X NAC interaction | Randomized MAC breaks NAC-based 802.1X; must set "Yes" (real MAC) in Wi-Fi profile | LOW | iOS 14+ only; verified from Microsoft Learn (`ref-wifi-settings-apple`, updated 2026-06-24) |
| Android Radius server name requirements by OS version | Android 11+ requires it; Android 14+ has character limit (≤256 chars, no special chars) | LOW | Verified from Microsoft Learn (`ref-wifi-settings-android-enterprise`, updated 2026-06-22) |
| Linux 802.1X via nmcli scripts (scope-limited to EAP-TLS only) | Completes the 5-platform coverage; no native profile exists | HIGH | Must be framed as workaround with clear caveats; only EAP-TLS is documented in verifiable sources |
| Outer identity / identity privacy configuration per EAP method | Protects username from being sent in cleartext before TLS tunnel | LOW | Applies to PEAP, EAP-TTLS; EAP-TLS also supports it for some platforms |
| Android Enterprise SAN / UPN requirement for certificates | Android Enterprise personal work profile Wi-Fi profiles fail if cert SAN does not include UPN | LOW | Verified; applies to EAP-TLS, EAP-TTLS, PEAP with certs on personally-owned work profile |
| Cross-platform "done / verified" state table | L1/L2 need to know what "connected and authenticated" looks like per platform | MEDIUM | Platform-specific: Windows Event Viewer, macOS Wi-Fi diagnostics, iOS Settings, Android debug, Linux ip/nmcli |

### 3.3 Anti-Features (Explicitly Out of Scope — Document This to Prevent Scope Creep)

| Anti-Feature | Why Requested | Why Out of Scope | What to Include Instead |
|---|---|---|---|
| RADIUS / NPS server configuration | Admins want end-to-end documentation | Server-side config is a network engineering function; project constraint is Intune client-side only | One-sentence "assumes RADIUS/NPS already exists" callout in every admin-setup guide |
| Network switch port config (802.1X port auth, VLAN assignment) | 802.1X requires switch config to work | Switch config is the network team's responsibility; outside Intune MDM scope | Note in conceptual overview that switch/AP must be pre-configured |
| MAB / MAC Auth Bypass | Common companion to 802.1X for devices that cannot do EAP | Server-side + switch-side; printers, IoT devices; no Intune profile involvement | Mention in foundation doc as "MAB is out of scope — for devices that cannot do EAP, work with your network team" |
| PKI / CA infrastructure build-out (ADCS, NDES setup) | Needed for SCEP to work | Out of scope; link to existing Microsoft docs; project constraint is Intune client-side | Cross-link to Microsoft Learn NDES/SCEP infrastructure doc with "assumed to exist" framing |
| Certificate Connector installation and configuration | Needed for PKCS/SCEP to work | Infrastructure scope; link to official Microsoft docs | Cross-link in prerequisites section of each cert-type admin guide |
| WPA2/WPA3 Personal (PSK) Wi-Fi profiles | Admins configure these too | Not 802.1X; different profile type, no EAP involved | Exclude; if referenced, note "this doc covers 802.1X EAP authentication only" |
| EAP-SIM / EAP-FAST / LEAP / TEAP | These appear in the Intune UI for Windows and macOS | Not in the locked-constraint EAP method list; primarily for cellular/Cisco-proprietary environments | Exclude from content; note "EAP-SIM, EAP-FAST, LEAP, TEAP are visible in Intune but not covered — consult your RADIUS vendor documentation" |
| Wi-Fi profiles for personal (non-802.1X) authentication | WPA/WPA2 Personal profiles are common | Not 802.1X; PSK-based | Exclude |
| Conditional Access network-based policies | Some admins layer CA on top of 802.1X | Entra/Intune CA policy is a separate domain | Out of scope; note as a common post-802.1X layer |
| Android Wired 802.1X via Intune | Wired is a stated milestone requirement | Android has no native Wired Network profile type in Intune (verified; not present in the portal or Microsoft Learn) | Document explicitly as "Android does not have a wired network profile type in Intune; wired 802.1X on Android requires manual or OEMConfig configuration outside Intune scope" |
| Linux PEAP / EAP-TTLS via Intune scripts | Logically possible with nmcli | Not documented in Microsoft Learn or verified third-party sources; would require untested script authoring | Linux coverage limited to EAP-TLS via SCEP + nmcli script; note PEAP/TTLS as theoretically possible but not covered |

---

## 4. Feature Dependencies

```
Trusted Root Certificate Profile (all platforms)
    └──required-by──> SCEP Client Certificate Profile
                          └──required-by──> EAP-TLS Wi-Fi Profile
                          └──required-by──> EAP-TLS Wired Profile
                          └──required-by──> Linux nmcli Script (EAP-TLS)

Trusted Root Certificate Profile (all platforms)
    └──required-by──> PKCS Client Certificate Profile
                          └──required-by──> EAP-TLS Wi-Fi Profile (Windows, macOS, iOS, Android)
                          NOTE: PKCS NOT supported for wired on macOS or iOS (SCEP only)

Trusted Root Certificate Profile (all platforms)
    └──required-by──> Server Validation in all EAP methods
                          (root cert must arrive before Wi-Fi/Wired profile is applied)

EAP-TLS Wi-Fi Profile ──requires──> client cert (SCEP or PKCS)
PEAP-MSCHAPv2 Wi-Fi Profile ──requires──> trusted root only (no client cert)
EAP-TTLS Wi-Fi Profile ──requires──> trusted root; client cert optional (method-dependent)

macOS Wired Profile deployment-channel ──immutable-after-deploy──> cert keychain placement
    Admin must choose user vs device channel BEFORE creating profile (cannot edit post-deploy)

iOS 802.1X Wi-Fi (NAC environments) ──requires──> MAC randomization disabled (iOS 14+)
    "Disable MAC address randomization: Yes" must be set in the Wi-Fi profile

Android Enterprise Wi-Fi (personally-owned work profile) ──requires──> UPN in cert SAN
    Certificate SAN must include user principal name or Wi-Fi profile deployment fails

Android 11+ Wi-Fi ──requires──> Radius server name configured in profile
    Without it, new profiles may not connect

802.1X Wi-Fi/Wired profile ──navigation-last──> docs/index.md hub wiring
    Hub edits go in last phase after all content docs are complete
```

### Dependency Notes

- **Trusted root profile must deploy before the cert or network profile.** If trusted root is missing, the device cannot validate the RADIUS server certificate and 802.1X fails at the server-trust step. This ordering must be made explicit in every admin-setup guide.
- **SCEP and PKCS profiles require NDES / Certificate Connector** infrastructure to already exist. The doc set must document this as an assumed prerequisite and link to Microsoft Learn infrastructure docs rather than explaining NDES setup.
- **macOS deployment channel is immutable** — if the admin picks the wrong channel (user cert in device channel = wrong keychain), the profile must be deleted and recreated. This is a high-impact one-way decision that must be called out with a warning callout in the macOS admin-setup guide.
- **iOS MAC randomization and NAC** — if the network uses NAC (Network Access Control) with MAC-based policies, randomized MAC breaks authentication. The Wi-Fi profile must set "Disable MAC address randomization: Yes." This applies iOS 14 and newer.

---

## 5. Per-Platform Topic Matrix

| Topic | Windows | macOS | iOS/iPadOS | Android Enterprise | Linux |
|---|---|---|---|---|---|
| Wi-Fi 802.1X profile (EAP-TLS) | Native Intune Wi-Fi profile | Native Intune Wi-Fi profile | Native Intune Wi-Fi profile | Native Intune Wi-Fi profile | Bash script + nmcli (no native profile) |
| Wi-Fi 802.1X profile (PEAP-MSCHAPv2) | Native Intune Wi-Fi profile | Native Intune Wi-Fi profile | Native Intune Wi-Fi profile | Native Intune Wi-Fi profile | LOW confidence (theoretically possible; not in MS docs) |
| Wi-Fi 802.1X profile (EAP-TTLS) | Native Intune Wi-Fi profile | Native Intune Wi-Fi profile | Native Intune Wi-Fi profile | Native Intune Wi-Fi profile | OUT OF SCOPE |
| Wired 802.1X profile | Native Intune Wired Network profile | Native Intune Wired Network profile | Native Intune Wired Network profile (iOS 14+) | NO NATIVE PROFILE in Intune | NO NATIVE PROFILE in Intune |
| SCEP cert delivery | Full support | Full support | Full support | Full support | Full support (SCEP only; no PKCS) |
| PKCS cert delivery | Full support | Full support for Wi-Fi; NOT for wired | Full support for Wi-Fi; NOT for wired | Full support | NOT SUPPORTED |
| Imported PKCS cert delivery | Full support | Full support | Full support | Full support (not AOSP) | NOT SUPPORTED |
| Trusted root profile | Full support | Full support | Full support | Full support | Full support |
| Authentication mode (user/machine/both) | Configurable in Intune | Not exposed in Intune profile | Not exposed in Intune profile | Not exposed | N/A |
| Deployment channel (user vs device keychain) | N/A | REQUIRED — immutable | N/A | N/A | N/A |
| RADIUS server name for server validation | Optional (suppresses user dialog) | Required for dynamic trust suppression | Required for dynamic trust suppression | Required (Android 11+); 256 char limit (Android 14+) | Configured in script |
| Outer identity / identity privacy | Supported (PEAP, EAP-TTLS) | Supported (EAP-TLS, EAP-TTLS, PEAP) | Supported (EAP-TLS, EAP-TTLS, PEAP) | Supported (EAP-TLS, EAP-TTLS, PEAP) | Via nmcli script parameters |
| MAC address randomization (NAC) | N/A (not present in Intune Wi-Fi profile) | N/A | Disable-able in Wi-Fi profile (iOS 14+) | Configurable (Android 13+) | N/A (nmcli default) |
| UPN in cert SAN requirement | Not documented as a blocker | Not documented as a blocker | Not documented as a blocker | Required for personally-owned work profile | N/A |
| "Done / verified" diagnostic command | Event Viewer 802.1X events; `netsh wlan show profiles` | Wireless Diagnostics; System Profiler; `log show` | Settings > Wi-Fi > connected state | Android Settings > Wi-Fi | `nmcli connection show`; `ip addr show` |
| L1 runbook applicability | Yes | Yes | Yes | Yes | Yes (limited) |
| L2 runbook applicability | Yes (full log access) | Yes (unified log) | Limited (sysdiagnose only) | Limited (adb logcat or Company Portal) | Yes (journalctl) |

---

## 6. Content Category Structure (Maps to Roadmap Phases)

Based on dependencies and complexity, the documentation must be structured in this order. The phase boundaries below are recommendations for the roadmap author.

### Category A — Foundation (earliest phase; everything else depends on this)

A single "802.1X Concepts" document covering:
- The three-actor model (supplicant / authenticator / authentication server) at L1/L2 depth
- EAPOL exchange in prose (no packet captures)
- EAP-TLS vs PEAP-MSCHAPv2 vs EAP-TTLS: what each authenticates, what clients need, when to use each
- Certificate prerequisite chain: trusted root → client cert → network profile (ordering rule)
- "Which EAP method?" decision matrix (admin-facing)
- Glossary of all new 802.1X domain terms (EAPOL, supplicant, authenticator, RADIUS, EAP types, inner/outer identity, identity privacy)

Complexity: MEDIUM. Research complete. No platform-specific content.

### Category B — Certificate Delivery Guides (prerequisite to all network profiles)

Admin-setup guides for deploying the trust chain before any Wi-Fi/Wired profile:
- Trusted root certificate profile (all 5 platforms, one combined guide since the steps are similar)
- SCEP client certificate profile for 802.1X (applicable to all platforms; note Linux special case)
- PKCS client certificate profile for 802.1X (Windows, macOS, iOS, Android — NOT Linux; note wired restriction on macOS/iOS)

Complexity: MEDIUM. Mostly referencing existing patterns (SCEP/PKCS delivery was already built for other purposes in this doc set).

### Category C — Per-Platform Wi-Fi Admin-Setup Guides (core content, 5 guides)

One guide per platform. Each guide covers:
- Wi-Fi profile type in Intune (Enterprise, not Basic)
- EAP-TLS configuration steps (with SCEP and PKCS cert profile linkage)
- PEAP-MSCHAPv2 configuration steps (server cert only; no client cert)
- EAP-TTLS configuration steps (server cert + inner method selection)
- Server validation (RADIUS server names, trusted root linkage)
- Outer identity / identity privacy recommendation
- Platform-specific warnings:
  - macOS: deployment channel (user vs device) — immutable, must choose before creating profile
  - iOS: MAC address randomization disable (NAC environments)
  - Android: Radius server name requirement (Android 11+), character limit (Android 14+), UPN in cert SAN (personally-owned work profile)
  - Linux: SCEP cert prerequisite + Bash script approach + nmcli commands (EAP-TLS only)
- "Done / verified" state per platform

Complexity: HIGH. Five platforms × three EAP methods = dense content. Potential to break into sub-phases by platform or by EAP method.

### Category D — Per-Platform Wired Admin-Setup Guides (Windows + macOS + iOS; not Android or Linux)

Same structure as Wi-Fi guides but for wired 802.1X:
- Windows Wired: full EAP-TLS / PEAP / EAP-TTLS coverage
- macOS Wired: EAP-TLS / PEAP / EAP-TTLS; deployment channel; PKCS-not-supported callout for wired
- iOS Wired: EAP-TLS / PEAP / EAP-TTLS; PKCS-not-supported callout for wired
- Android Wired: one paragraph stub explaining no native Intune wired profile; link to network-team consultation
- Linux Wired: not covered in Intune (no native profile; no documented script equivalent)

Complexity: MEDIUM. Similar to Category C but shorter; fewer platform variations for wired.

### Category E — L1 Triage Runbooks

New L1 runbooks in the existing runbook series (extending L1 #37):
- L1 #38: "Device cannot connect to 802.1X Wi-Fi" — initial triage tree (is it a cert issue? a server trust issue? a credential issue? a RADIUS reject?)
- L1 #39: "Certificate failure on 802.1X connection" — scripted steps to check if cert is present, not expired, correct profile applied

Complexity: MEDIUM. Follows established runbook pattern.

### Category F — L2 Investigation Runbooks

- L2 #31: "RADIUS reject investigation" — per-platform log collection; what to look for; information package to send to network team; Event IDs on Windows; macOS unified log; Android adb logcat; iOS sysdiagnose
- L2 #32: "EAP negotiation failure" — EAP method mismatch symptoms; server trust failures; certificate chain errors; per-platform diagnostic commands

Complexity: HIGH. Requires per-platform log-path knowledge and cross-referencing existing log collection runbooks.

### Category G — Integration (navigation-last, final phase)

- 802.1X rows appended to all 5 per-platform capability matrices
- Glossary cross-references (add 802.1X section to `_glossary.md`, `_glossary-macos.md`, `_glossary-android.md`, `_glossary-linux.md`)
- docs/index.md wiring: 802.1X nav hub entries per platform section
- common-issues.md and quick-ref-l1/l2 additions
- decision-trees integration (or new 802.1X decision tree file)

Complexity: LOW per action, but many touch points. Must be last to avoid breaking in-progress docs.

---

## 7. Complexity and Dependency Summary for Roadmap

| Category | Complexity | Phase Dependencies | Risk |
|---|---|---|---|
| A — Foundation / Concepts | MEDIUM | None | LOW — well-understood, verified material |
| B — Certificate Delivery Guides | MEDIUM | A must precede (concepts inform cert guide scope) | LOW — existing patterns from other platforms |
| C — Per-Platform Wi-Fi Guides (5) | HIGH | A and B must precede | MEDIUM — macOS deployment channel + Linux script are novel; Android version quirks |
| D — Per-Platform Wired Guides (3+stubs) | MEDIUM | A, B, C patterns established | LOW-MEDIUM — PKCS gap on macOS/iOS wired is a verified pitfall that needs explicit callout |
| E — L1 Runbooks | MEDIUM | C and D must precede (symptoms reference profile types) | LOW |
| F — L2 Runbooks | HIGH | E must precede; needs per-platform log-path verification | MEDIUM — Linux and Android log paths need phase-specific research |
| G — Integration | LOW-MEDIUM | F must precede | LOW — append-only pattern established across 13 milestones |

**Recommended phase structure:**
1. Phase 101: Foundation doc (Category A) + glossary entries — sets vocabulary for all subsequent phases
2. Phase 102: Certificate delivery guides (Category B) — prerequisite chain documentation before any network profile
3. Phase 103: Windows Wi-Fi + Wired admin-setup (Category C + D subset) — most mature platform, sets the guide template
4. Phase 104: macOS Wi-Fi + Wired admin-setup (Category C + D subset) — deployment channel complexity; PKCS wired restriction
5. Phase 105: iOS/iPadOS Wi-Fi + Wired admin-setup (Category C + D subset) — MAC randomization + PKCS wired restriction
6. Phase 106: Android Enterprise Wi-Fi admin-setup + wired stub (Category C + D) — version-matrix requirements
7. Phase 107: Linux Wi-Fi admin-setup via script (Category C) — nmcli + SCEP; EAP-TLS only
8. Phase 108: L1 Runbooks (Category E)
9. Phase 109: L2 Runbooks (Category F)
10. Phase 110+: Integration + navigation + capability matrices (Category G) + harness lineage bump

Total phases for Pillar A estimated at 8–10, consistent with PROJECT.md estimate of 8–12 total for v1.14 (Pillars B/C/D/E consume the remaining phases).

---

## 8. "Done / Working" Verification Criteria Per Platform

These criteria define the "device is successfully 802.1X authenticated" state that each admin-setup guide must document at its conclusion.

| Platform | Wi-Fi Verified By | Wired Verified By |
|---|---|---|
| Windows | Event Viewer: `Microsoft-Windows-WLAN-AutoConfig/Operational` event IDs 8001/8002 (connected/disconnected); `netsh wlan show profiles name="SSID" key=clear` | Event Viewer: `Microsoft-Windows-Wired-AutoConfig/Operational`; `netsh lan show profiles` |
| macOS | System Preferences / System Settings → Wi-Fi shows "connected" + IP assigned; Wireless Diagnostics (Option+click Wi-Fi menu bar) → Connection Log | `networksetup -getinfo "Ethernet"` shows IP; System Log for 802.1X events |
| iOS/iPadOS | Settings → Wi-Fi → checkmark next to SSID; IP address visible in Wi-Fi detail view; no certificate warning dialogs | Settings → General → VPN & Device Management → Wired Network profile installed |
| Android Enterprise | Settings → Wi-Fi → network shows "Connected"; IP assigned in Wi-Fi details | N/A (no native Intune wired profile) |
| Linux | `nmcli connection show` shows the connection active; `ip addr show` on the interface shows IP address assigned; `journalctl -u NetworkManager` shows supplicant authentication success | N/A (no native Intune wired profile) |

---

## 9. Sources

All platform settings verified from Microsoft Learn (dates per document metadata):

- Windows Wi-Fi settings: https://learn.microsoft.com/en-us/mem/intune/configuration/wi-fi-settings-windows (updated 2026-04-14)
- Windows Wired Network settings: https://learn.microsoft.com/en-us/mem/intune/configuration/wired-network-settings-windows (updated 2026-06-04)
- macOS and iOS Wi-Fi settings (shared page): https://learn.microsoft.com/en-us/mem/intune/configuration/wi-fi-settings-macos (updated 2026-06-24)
- macOS and iOS Wired Network settings (shared page): https://learn.microsoft.com/en-us/mem/intune/configuration/wired-network-settings-macos (updated 2026-06-04)
- Android Enterprise Wi-Fi settings: https://learn.microsoft.com/en-us/mem/intune/configuration/wi-fi-settings-android-enterprise (updated 2026-06-22)
- Certificate types and platform support matrix: https://learn.microsoft.com/en-us/mem/intune/protect/certificates-configure (updated 2026-06-22)
- SCEP infrastructure: https://learn.microsoft.com/en-us/mem/intune/protect/certificates-scep-configure (updated 2026-04-29)
- Linux 802.1X via nmcli script (third-party, LOW confidence for PEAP/TTLS): https://www.keytos.io/docs/cloud-radius/setup-radius-in-mdm/intune/how-to-enable-certificate-wifi-authentication-in-linux-in-intune/

---

*Feature research for: 802.1X network authentication documentation — v1.14 Pillar A*
*Researched: 2026-06-29*
*Confidence: HIGH (platform settings verified; Linux EAP-TLS only is MEDIUM; Linux PEAP/TTLS is LOW — not in MS docs)*
