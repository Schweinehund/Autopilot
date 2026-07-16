# Technology Stack

**Domain:** Intune/Entra/Apple device-configuration recipes (documentation project — "stack" = Microsoft/Apple features, profile types, CSPs, and version floors to document, not code libraries)
**Researched:** 2026-07-16
**Confidence:** HIGH (Microsoft Learn + Apple Support fetched directly; a few MEDIUM/LOW items flagged inline)

## Recommended Stack

### Recipe #1 — Self-Deploying Entra-Joined Shared Windows AVD-Client Device

| Feature / Profile Type | Version Floor | Purpose | Why Recommended |
|---|---|---|---|
| **Windows Autopilot self-deploying mode** | Entra-join only; TPM 2.0 + attestation mandatory (no vTPM/Hyper-V/VM support — hard-fails `0x800705B4`) | Zero/low-touch provisioning of the physical Windows box | Microsoft's own doc explicitly scopes this mode for "a kiosk, digital signage device, or a shared device" — it's the intended vehicle, not a workaround. Ethernet = fully zero-touch; Wi-Fi requires only language/network prompts. |
| **SharedPC CSP** (`./Vendor/MSFT/SharedPC/*`), surfaced in Intune as the **Settings Catalog "Shared PC" category** | Windows 10 1607+ for core nodes; **`EnableSharedPCModeWithOneDriveSync` requires Windows 11 22H2 (10.0.22621)+**; editions Pro/Enterprise/Education/IoT Enterprise (NOT Home) | Turns the device into a real multi-user shared PC: single-active-session enforcement, automatic account cache/deletion, restricted local storage, power/sleep policy | Confirmed by Microsoft to manage **both Microsoft Entra ID and on-prem AD accounts** the same way — no hybrid-join needed. Deployed as a Settings Catalog policy assigned to the Entra **device** group created by Autopilot (device-context, not user-context — matches the "no primary user" reality of self-deploying mode). |
| **Windows App** (formerly *Remote Desktop* / the AVD+W365+Dev Box+RDS unified client) — Microsoft Store app, **Store ID `9N1F85V9T8BN`** | App: min supported **2.0.1071.0**; host OS: **Windows 10 1809+** (ESU required if out of mainstream support) / **Windows 11** / **Windows Server 2019+** | The client app the shared device exists to run, connecting to the pre-existing AVD workspace/host pool | Deploy as an Intune **"Microsoft Store app (new)"** (winget-backed) rather than Win32 — gets Store auto-update for free and matches how Microsoft now recommends distributing it. Requires **Microsoft App Installer (Store ID `9NBLGGH4NNS1`)** pre-staged as a required Store app so winget resolution works. |
| **RemoteDesktop policy CSP — `AutoSubscription`** (`./User/Vendor/MSFT/Policy/Config/RemoteDesktop/AutoSubscription`), Settings Catalog category **"Remote Desktop"** | Windows 10 1809+ (matches Windows App floor) | Auto-feeds the AVD workspace URL into Windows App for **whichever Entra user signs in** — no manual "Subscribe" step | It's a **user-context** CSP, which is exactly right for a shared device where the signed-in identity changes: set the value to `https://rdweb.wvd.microsoft.com/api/arm/feeddiscovery` (Azure public cloud) and every Entra sign-in auto-subscribes. Sourced independently from three channels (official CSP doc + two independent community walk-throughs) — HIGH confidence. |

### Recipe #2 — Shared iPad Full Provisioning

| Feature / Profile Type | Version Floor | Purpose | Why Recommended |
|---|---|---|---|
| **ADE enrollment profile — Shared iPad toggle** (Intune: Devices → iOS/iPadOS → Enrollment → profile → Management settings) | **Supervised iPad required; iPadOS 13.3+ per Intune's own doc** (Apple/community sources say 13.4 — use 13.3 as the Microsoft-authoritative floor, note the discrepancy) | The single profile setting that provisions user-partitioned multi-user mode | Must be paired with **Supervised = Yes** and **User Affinity = Enroll without user affinity** in the same profile — all three are enforced together; changing this on an already-enrolled device forces a **factory wipe**. |
| **Managed Apple Account, org-federated** | N/A (identity feature, not OS-gated) | Lets a Shared iPad user sign in with their normal Entra UPN/password instead of a separate Apple credential | **Hard prerequisite, not optional**: federate the Entra tenant with Apple Business Manager (Apple's OIDC-based federated auth) *before* building the enrollment profile. On first Shared iPad sign-in, a Managed Apple Account matching the Entra UPN is auto-created. Note: current Microsoft/Apple docs still mix "Managed Apple ID" (older term) and "Managed Apple Account" (current Apple branding, post-2024 rename) — use "Managed Apple Account" as the primary term with a one-line footnote. |
| **Storage — 32 GB minimum, 64 GB+ recommended** | iPadOS 17+ adds `QuotaSize` (temporary/guest session storage reservation) | Determines how many cached users the device can realistically hold | Apple's math: on a 32 GB device, 10 GB system + 8 GB apps leaves the remainder split across users (1 GB/user minimum) — that's a very small cached-user count. 64 GB+ (10 GB system + 16 GB apps) gives a materially better multi-user experience. Document 32 GB as the Apple-hard-floor and 64 GB+ as the recipe's practical recommendation. |
| **Temporary sessions (Guest tap-to-use)** | iPadOS 13.4+ for the base feature; **iPadOS 14.5+** for "Temporary session only" and "User/Temporary session timeout" auto-logout commands | No-credential guest access, fully wiped at logout | **On by default** with Shared iPad — this is an admin **decision point**: leave enabled (walk-up guest use) vs. set the device restriction "Block Shared iPad temporary sessions" to force Managed Apple Account sign-in only. |
| **Maximum number of users** (Apple MDM command, iPadOS 13.4+) | Defaults to **10** if not explicitly set | Caps how many user partitions are cached before oldest-inactive gets evicted | Should always be explicitly set by the recipe rather than left at the silent default of 10 — tie the recommended value to the 32 GB vs. 64 GB+ storage decision above. **MEDIUM confidence**: this is an Apple declarative-management command; verify at write-time whether it's exposed as a discrete Intune Settings Catalog toggle or requires a custom profile/OMA-URI-equivalent. |
| **App deployment — device-licensed VPP, required only** | N/A | Populates the Shared iPad home screen for every user | Apps **must be assigned as Required to the Entra device group** (not user group, not "Available") — Shared iPad doesn't support optional/self-service install. The App Store is present but installation is disabled by policy; recommend explicitly disabling App Store in a device restrictions profile to avoid user confusion. |
| **Home screen layout** (Device Features profile) | N/A | Lays out required apps/folders/dock | Device-group assignment = applies device-wide to any active user; user-group assignment = follows a specific Entra user across any Shared iPad they sign into. Recipe should pick one deliberately (this is an admin decision point if roles differ per user). |

## What NOT to Use / Out-of-Scope Features

| Avoid / Out of scope | Why | Use Instead |
|---|---|---|
| **Entra ID "Shared device mode" (SDM / Global Sign-Out)** | Confirmed via Microsoft Learn: SDM is **iOS and Android only** — it is a name-collision trap with Windows "Shared PC," not an applicable Windows feature. Do not reference SDM in the Windows recipe. | Windows **SharedPC CSP** (above) is the correct and only mechanism for Windows shared-device behavior. |
| **Intune Company Portal / self-service app assignment as the primary delivery path** | Self-deploying mode sets **no primary user** by default; Company Portal-driven "assigned to user" app delivery and self-service BitLocker recovery depend on a primary user being present. | Assign Windows App (and any other required software) to the **Entra device group**, device-context, not user-context. A primary user can optionally be set manually post-provisioning if truly needed, but the recipe shouldn't depend on it. |
| **Standard Intune compliance policy assignment on Shared iPad** | Microsoft explicitly lists this as unsupported: *"the following Intune policies are not supported with Shared iPad: app-based and device-based Conditional Access policies, app protection policies, and compliance policies."* This directly contradicts treating "compliance policy" as a normal ingredient of the Shared iPad recipe — **flag this for the roadmap/requirements author**, since the milestone brief lists compliance policy as one of Recipe #2's components. | Rely on **supervision + device restriction profiles** (App Store disabled, temporary-session policy, passcode grace period, Wi-Fi-only-via-profile, etc.) to establish device security posture instead of a compliance-policy/Conditional-Access chain. |
| **Custom passcode complexity/length policy on Shared iPad** | Shared iPad enforces a fixed 8-character alphanumeric passcode; Intune's normal passcode complexity/length settings **do not apply**. | Only the sign-in **grace period** is admin-configurable for Shared iPad. |
| **Email profiles on Shared iPad** | Explicitly unsupported — assigning one produces an error. | Web-based mail (Outlook Web via browser/web clip) or a per-user MDM-independent sign-in inside a required mail app, if email access is truly needed. |
| **AVD session-host / host-pool / FSLogix configuration in Recipe #1** | Out of milestone scope per the "assumes AVD infrastructure already exists" guardrail (mirrors the v1.14 802.1X "assumes RADIUS exists" pattern). The `intune/solutions/azure-virtual-desktop` doc covers managing AVD **session-host VMs** with Intune — that is a different surface (the server side) from the shared **client** device this recipe documents. Don't conflate the two. | Document only the client-side device: Autopilot self-deploying → Shared PC → Windows App → auto-subscription. Link out to existing AVD infra docs rather than duplicating host-pool setup. |
| **Assigned Access single-app kiosk as a hard requirement** | Self-deploying mode + Shared PC alone already satisfies "self-deploying shared device running Windows App" — a locked-down kiosk shell is an optional hardening layer, not a prerequisite. | Treat kiosk lockdown (Assigned Access vs. Shell Launcher — mutually exclusive with each other) as an explicit **admin decision point** in the recipe, not a mandatory step. Microsoft's own reference implementation for this exact scenario is the `Azure/WindowsAppKiosk` GitHub toolkit (`Set-WindowsAppKioskSettings.ps1`) if the admin opts into full lockdown. |

## Stack Patterns by Variant

**If the shared Windows device should allow walk-up sign-in by any org member (no lockdown):**
- Use Autopilot self-deploying + SharedPC (`AccountModel=2`, domain+guest) + Windows App Store deployment + `AutoSubscription` policy only.
- Because this is the minimal, fully-supported path and matches "any member of the organization can sign in" behavior Microsoft documents as the default self-deploying end state.

**If the shared Windows device must be locked to Windows App only (thin-client-style):**
- Add Assigned Access (single-app, since Windows App is a packaged/MSIX Store app) or Shell Launcher on top of the above.
- Because Assigned Access and Shell Launcher are mutually exclusive — the recipe's decision-point block should force a binary choice here, not present both as simultaneously configurable.

**If Shared iPad users are all the same role and mostly use temporary/guest sessions:**
- Assign all apps/profiles to the Entra **device** group only; leave temporary sessions enabled.
- Because per Microsoft's own recommended-scenarios table, this collapses correctly onto guest/temporary sessions (only device-assigned config applies to temporary sessions — user-assigned config is silently skipped for guests).

**If Shared iPad users span multiple roles needing different home screens/restrictions:**
- Assign shared baseline (Wi-Fi, VPP apps, device restrictions) to the device group; assign role-varying settings (home screen layout, allowed-app lists) to Entra **user** groups.
- Because Microsoft's applicability table splits settings device-vs-user per profile type — mixing at the wrong scope is the most common Shared iPad misconfiguration.

## Version Compatibility

| Component | Compatible With | Notes |
|---|---|---|
| `EnableSharedPCModeWithOneDriveSync` | Windows 11 22H2 (10.0.22621)+ only | Base `EnableSharedPCMode` works back to Windows 10 1607; don't imply OneDrive-sync variant works on older builds. |
| Windows App auto-update via Store | Requires Store app deployment (not sideloaded Win32) | Store-based install is also what the `9N1F85V9T8BN` app ID and Intune "Microsoft Store app (new)" type assume. |
| `RemoteDesktop/AutoSubscription` CSP | Windows 10 1809+ (same floor as Windows App) | User-context policy — verify it lands correctly on a Shared-PC device where the "user" changes every sign-in (should re-apply per Entra sign-in; call out as a validation step in the recipe, not just a static config). |
| Shared iPad `QuotaSize` (temporary-session storage reservation) | iPadOS 17+ only | Devices below 17 fall back to the older fixed 1–2 GB/user minimum math; don't document `QuotaSize` as universally available. |
| Shared iPad temporary-session timeout commands | iPadOS 14.5+ | Base temporary/Guest session itself works from iPadOS 13.4; the *timeout* controls are a later addition — keep these as two separate version-gated facts in the recipe, not one. |

## Sources

- [Windows Autopilot self-deploying mode](https://learn.microsoft.com/en-us/autopilot/self-deploying) — HIGH, fetched directly; confirms Entra-join-only, TPM 2.0/no-VM, "kiosk/digital signage/shared device" framing, no-primary-user behavior, device-only license SKU.
- [SharedPC CSP](https://learn.microsoft.com/en-us/windows/client-management/mdm/sharedpc-csp) — HIGH, fetched directly; full node list, version floors, editions.
- [Configure a shared or guest Windows device](https://learn.microsoft.com/en-us/windows/configuration/shared-pc/set-up-shared-or-guest-pc) — HIGH, fetched directly; confirms Entra ID + AD accounts both managed identically, Settings Catalog + PPKG + PowerShell config paths.
- [Windows shared device settings reference (Intune)](https://learn.microsoft.com/en-us/intune/device-configuration/templates/ref-shared-device-settings-windows) — HIGH, fetched directly; Intune UI-level setting descriptions.
- [Using Azure Virtual Desktop single-session with Intune](https://learn.microsoft.com/en-us/intune/intune-service/fundamentals/azure-virtual-desktop) — HIGH, fetched directly; confirmed this page covers AVD **session-host VM** management, establishing it as an out-of-scope surface for this milestone's client-device recipe.
- ["What's new in Windows App"](https://learn.microsoft.com/en-us/windows-app/whats-new) — HIGH, fetched directly; Store app ID `9N1F85V9T8BN`, version table, Windows 365 Frontline shared-mode mentions.
- [Windows App — Get started / prerequisites](https://learn.microsoft.com/en-us/windows-app/get-started-connect-devices-desktops-apps) — HIGH, fetched directly; Windows 10 1809+/Windows 11/Server 2019+ floor, ESU note, no personal MSA sign-in.
- `Azure/WindowsAppKiosk` GitHub repo — MEDIUM (Microsoft-authored reference tooling, not a Learn doc page); Assigned Access/Shell Launcher config specifically for Windows App kiosk scenarios.
- RemoteDesktop policy CSP `AutoSubscription` — MEDIUM-HIGH; policy path and semantics corroborated across the CSP naming convention plus two independent community walkthroughs (Rozemuller, LetsConfigMgr) describing identical Intune Settings Catalog steps; recommend a final spot-check of `policy-csp-remotedesktop` at write-time.
- [Shared iPad overview (Apple Support)](https://support.apple.com/guide/deployment/shared-ipad-overview-dep9a34c2ba2/web) — HIGH, fetched directly; Managed Apple Account requirement, temporary session behavior, `QuotaSize` (iPadOS 17+).
- [Prepare Shared iPad (Apple Support)](https://support.apple.com/guide/deployment/prepare-shared-ipad-dep6fa9dd532/web) — HIGH, fetched directly; storage/quota math, Maximum-number-of-users default (10), temporary-session-timeout version floors.
- [Shared iPad devices (Intune)](https://learn.microsoft.com/en-us/intune/device-enrollment/apple/shared-ipad) — HIGH, fetched directly; ADE profile steps, iPadOS 13.3+ floor as stated by Microsoft, device/user applicability tables, **known limitations including unsupported compliance policies/Conditional Access/app protection/email profiles**, fixed 8-char passcode.
- [Federated authentication with Microsoft Entra ID in Apple Business](https://support.apple.com/guide/business/federated-authentication-microsoft-entra-axm8c1cac980/web) — MEDIUM (WebSearch-summarized, not directly fetched in full); confirms OIDC federation model, Managed Apple Account naming.
- [Manage shared devices for frontline workers (Entra Shared Device Mode)](https://learn.microsoft.com/en-us/microsoft-365/frontline/flw-shared-devices) — MEDIUM (WebSearch-summarized); basis for the "SDM is iOS/Android only, not Windows" scope-narrowing finding — recommend a direct-fetch spot-check at write-time given how consequential this exclusion is.

---
*Stack research for: Intune Device Configuration Recipes (v1.18) — Self-Deploying Shared Windows AVD Client + Shared iPad*
*Researched: 2026-07-16*
