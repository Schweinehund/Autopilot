# Technology Stack

**Domain:** Intune device-configuration recipes (documentation project — "stack" = Microsoft/Google features, Intune profile types, CSP nodes, app packages, and version floors to document, not code libraries)
**Researched:** 2026-07-25
**Confidence:** HIGH (Microsoft Learn fetched directly for every load-bearing claim; a few MEDIUM items flagged inline)

---

## GATE 1 (Windows) — Verdict

**Plain verdict: The internal note is CONFIRMED, not refuted.** The Intune **Templates → Kiosk** GUI's "Multi app kiosk" option is documented by Microsoft as Windows-10-only. For Windows 11, Microsoft's own kiosk-template page explicitly redirects admins to a separate article family (the `lock-down-windows-11-to-specific-apps` redirect, which now resolves into the `assigned-access/configure-multi-app-kiosk` + `assigned-access/configuration-file` pages) that is **not** the Templates GUI — it is the **AssignedAccess CSP `Configuration` node**, applied via an Intune **Custom profile / OMA-URI** (or Settings Catalog's raw-CSP surface, PPKG, or PowerShell/WMI Bridge), carrying an **XML** payload the admin must author by hand. There is no first-party GUI "pick your apps from a list" path for Windows 11 multi-app kiosk today.

- **[VERIFIED HIGH]** — fetched directly, 2026-07-25: `learn.microsoft.com/en-us/intune/device-configuration/templates/configure-kiosk` (ms.date 2026-02-10, updated 2026-07-01 — current as of this research): *"Currently, you can use Intune to configure a multi-app kiosk on Windows 10 devices. For more information about Windows 11 multi-app kiosk support, go to [Set up a multi-app kiosk on Windows 11 devices](/en-us/windows/configuration/lock-down-windows-11-to-specific-apps)."* This is the exact sentence the internal note (`130-RESEARCH.md:340`) paraphrased without a citation — it is now sourced and confirmed.
- **[VERIFIED HIGH]** — fetched directly: `learn.microsoft.com/en-us/windows/configuration/assigned-access/configure-multi-app-kiosk` — the "Intune/CSP" tab states the mechanism explicitly: *"You can configure devices using a custom policy with the AssignedAccess CSP... Setting: `./Vendor/MSFT/AssignedAccess/Configuration` ... Value: content of the XML configuration file."* The **Settings** tab on the same page states plainly: *"This option isn't available using Settings."* — i.e., no native Settings-Catalog-friendly UI exists for multi-app; it is CSP-XML-only regardless of transport (Intune custom profile, PPKG, or PowerShell/WMI Bridge).

**Does this re-scope or cancel Recipe #3?** No — it re-shapes it. The recipe is achievable and first-party-documented, but its authored mechanism must be the **custom OMA-URI + hand-authored AssignedAccess XML** path, not a Templates walkthrough. This is a materially different (and materially longer) Steps section than RE-222's Step 5a single-app kiosk (which *is* pure GUI/Templates). Author RE-224 around: (1) building the XML file per the schema in `assigned-access/configuration-file`, (2) pushing it via Intune custom profile OMA-URI `./Vendor/MSFT/AssignedAccess/Configuration`, (3) **CORRECTED 2026-07-25 (adversarial review):** validating via **observable device behaviour + the AssignedAccess Operational event log**, NOT via the `AssignedAccess/Status` node (Get-only; no admin-reachable read path from Intune — see the Status row below).

### Edition floors — RESOLVED

**[VERIFIED HIGH]** — fetched directly, `learn.microsoft.com/en-us/windows/client-management/mdm/assignedaccess-csp`:

| Node | Editions | Applicable OS |
|---|---|---|
| `Configuration` (multi-app `AllAppList`, and the current single-app path) | ✅ Pro ✅ Enterprise ✅ Education ✅ IoT Enterprise / IoT Enterprise LTSC | Windows 10, version 1709 [10.0.16299]+ (this general CSP-applicability line also covers Windows 11, which is architecturally 10.0.22000+; Windows-11-specific config *features* — not the base mechanism — are gated separately, see Version Compatibility below) |
| `ShellLauncher` | ❌ Pro ✅ Enterprise ✅ Education ✅ IoT Enterprise / IoT Enterprise LTSC | Windows 10, version 1803 [10.0.17134]+ |
| `KioskModeApp` (legacy, deprecated) | ✅ Pro ✅ Enterprise ✅ Education ✅ IoT Enterprise / IoT Enterprise LTSC | Windows 10, version 1507+ |

**The claim is CONFIRMED for the "Pro" tier**: multi-app Assigned Access (via the `Configuration` node) runs on **Pro**; Shell Launcher explicitly does **not** — the CSP page states verbatim: *"Shell Launcher as a feature and the ShellLauncher node both require Windows Enterprise or Windows Education to function. The ShellLauncher node is not supported in Windows 10 Pro."*

**"Pro Education" specifically — [LOW confidence / unconfirmed]:** Microsoft's edition table in this CSP page enumerates only *Pro / Enterprise / Education / IoT Enterprise / IoT Enterprise LTSC* — it does not list "Pro Education" as a distinct row. Pro Education is licensing-adjacent to Pro (same feature set, different channel/licensing), so it is reasonable to assume it inherits Pro's support level, but this is an inference, not a first-party statement naming "Pro Education" verbatim. **Flag for the recipe: state "Pro" as the confirmed floor and footnote Pro Education as "assumed same as Pro, unconfirmed by name."**

### SharedPC + multi-app Assigned Access coexistence — CANNOT CONFIRM

**[UNRESOLVED — no first-party statement found either way.]** Neither the `SharedPC CSP` page nor the `AssignedAccess CSP` page nor `Configure a shared or guest Windows device` contains an explicit compatibility/coexistence statement about running SharedPC mode and multi-app Assigned Access (`AllAppList`) simultaneously on one device. What IS confirmed, directly from the SharedPC CSP page: SharedPC has its own **native single-app kiosk hook**, `KioskModeAUMID` (*"Specifies the AUMID of the app to use with assigned access"*) — meaning SharedPC's single-app kiosk behavior is itself implemented through Assigned Access internally. This establishes an architectural link for the **single-app** case only; it does not establish or rule out running SharedPC alongside a separately configured **multi-app** `AllAppList` profile. **Recommendation: do not assert coexistence as supported or unsupported in the recipe. Treat "Kiosk (multi-app Assigned Access) vs. Shared PC" as a mutually-exclusive admin decision-point branch, mirroring RE-222's existing Step 5 fork** — this sidesteps the unconfirmed-coexistence question entirely and is consistent with how RE-222 already handles the single-app-kiosk-vs-SharedPC choice.

---

## GATE 2 (Android / Managed Home Screen) — Verdict

**Plain verdict: First-party documented depth EXISTS and is extensive** — far beyond the exit-PIN setting already covered in `05-dedicated-devices.md`. Microsoft Learn publishes a dedicated, current, deeply detailed configuration reference for the Managed Home Screen app.

- **[VERIFIED HIGH]** — fetched directly, 2026-07-25: `learn.microsoft.com/en-us/intune/app-management/configuration/configure-managed-home-screen` (ms.date 2026-04-21, **updated_at 2026-06-22** — i.e., updated *after* `05-dedicated-devices.md`'s `last_verified: 2026-04-23`; treat this page as the fresher source of record for MHS specifics).
- **Surfaced in Intune at:** **Apps → Configuration → [add policy for Managed devices, Android] → app = "Managed Home Screen"** (package `com.microsoft.launcher.enterprise`), using either the **Configuration designer** UI or raw **JSON data**. A subset of MHS settings is *also* exposed in the **Android Enterprise device restrictions profile → Corporate-owned → Device experience** surface (each setting table above notes per-row whether it's "Available in device configuration profile"); the exit-kiosk PIN specifically **must** be set via the device restrictions profile per Microsoft's own note (matches what `05-dedicated-devices.md` already documents).

**Depth confirmed for every area the gate asked about, with exact JSON key names:**

| Area | Exact JSON key(s) | Notes |
|---|---|---|
| **Grid/layout** | `grid_size` (format `columns;rows`), `lock_home_screen`, `app_order_enabled`, `app_orders` (bundleArray: `package`/`folder_name`, `type` = `application`\|`managed_folder`\|`weblink`\|`widget`, `container`, `position`), `apps_in_folder_ordered_by_name`, `icon_size`, `app_folder_icon`, `screen_orientation` | `screen_orientation` note: Android 16+ ignores this on ≥600dp form factors (tablets) |
| **Allow-list schema** | `applications` (bundleArray of `{package, enable_app_offline, app_available_prior_to_sign_in}`) | Apps must already be installed/assigned to the device to appear |
| **Folders** | `managed_folders` (bundleArray: `folder_name`, `applications`, `is_customer_facing`) | Customer-facing folders require Session PIN + sign-in enabled |
| **Widgets** | `widgets` (bundleArray: `package`, `widget_class`, `span_x`, `span_y`) — e.g. built-in Time/Weather widgets exposed via `com.microsoft.launcher.enterprise` | |
| **Screensaver / digital-signage mode** | `show_screen_saver`, `screen_saver_image`, `screen_saver_show_time`, `inactive_time_to_show_screen_saver`, `media_detect_before_screen_saver` | Requires Overlay permission + exact-alarm permission (Android 14+); recommend OEMConfig auto-grant |
| **Sign-in / sign-out toggle (Entra shared device mode)** | `enable_mhs_signin`, `signin_type` (`AAD`/`Other`), `domain_name`, `login_hint_text`, `signin_screen_wallpaper`, `enable_corporate_logo`, `signin_screen_branding_logo`, `enable_session_PIN`, `session_PIN_complexity`, `enable_auto_signout`, `inactive_time_to_signout`, `auto_signout_time_to_give_user_notice` | This is the exact surface that backs "Entra shared device mode," already a scenario row in `05-dedicated-devices.md` — the JSON key names here are new, first-party-confirmed detail not currently in that doc |
| **Exit-kiosk PIN (already covered)** | `exit_lock_task_mode_code` (device-restrictions-profile only) + `max_number_of_attempts_for_exit_PIN`, `amount_of_time_before_try_exit_PIN_again` | GUI label "Exit lock task mode password" already documented in `05-dedicated-devices.md`; the JSON key name and the two retry-throttling keys are new detail |

**Prerequisite/permission note carried into the recipe:** several of the above (virtual home button, screensaver, auto sign-out) require the **Overlay permission** and, on Android 14+, the **exact-alarm permission** — Microsoft recommends granting both via **OEMConfig** (`configure-managed-home-screen-permissions-android`) rather than relying on runtime user grant, to avoid a breakout path through the Settings app. This OEMConfig cross-link is new-to-document material for Recipe #4.

**Does this cancel Recipe #4 in favor of a generic Android app-deployment guide?** No — the depth exists and is first-party, current, and directly on-topic. Recipe #4 is authorable as a genuine delta over `05-dedicated-devices.md` (which stops at the exit-PIN synchronization pattern and has no grid/screensaver/sign-in JSON-key-level content).

---

## Recommended Stack

### Recipe #3 — Windows 11 Multi-App Kiosk (RE-224)

| Feature / Profile Type | Version Floor | Purpose | Why Recommended |
|---|---|---|---|
| **AssignedAccess CSP — `Configuration` node** (`./Vendor/MSFT/AssignedAccess/Configuration`), applied via Intune **Custom profile (OMA-URI)** | Editions: Pro/Enterprise/Education/IoT Enterprise (not Home); Windows 10 1709+ base mechanism, Windows 11 confirmed compatible | The sole first-party mechanism for Windows 11 multi-app kiosk — GATE 1 above | Confirmed directly against Microsoft Learn 2026-07-25; the Intune Templates → Kiosk GUI does **not** cover this on Windows 11 |
| **AssignedAccessConfiguration XML — `AllAppList` profile type** | Namespace-versioned: default (2017) baseline; `v4` = Windows 11 21H2 `StartLayout`-adjacent features; `v5` = Windows 11 22H2 `StartPins`/`TaskbarLayout` | Defines the allowed-app list, Start layout, taskbar layout, and File Explorer namespace restrictions for the kiosk experience | `AllAppList` (not `KioskModeApp`, which is single-app/deprecated) is the multi-app profile type; a configuration file may contain multiple `AllAppList` profiles but only one `KioskModeApp` |
| **`Configs` → `Account`/`UserGroup` binding** | Same as above | Associates the XML profile to a local, AD, or Entra user/group | Entra groups are supported for restricted-user-experience (`AllAppList`) profiles, unlike `KioskModeApp` which is user-only, never group |
| **`AssignedAccess/Status` node** (read-only) — **DO NOT USE AS THE VERIFICATION MECHANISM** | Runtime status codes since Windows 10 1809+ | **CORRECTED 2026-07-25 (adversarial review).** `Status` Access Type is **`Get` only**; Intune requires *"the Add, Replace, and Get operations"*, so it is not deliverable as a custom OMA-URI row. WMI bridge `MDM_AssignedAccess` exposes only `InstanceID`/`ParentID`/`KioskModeApp`/`Configuration` — no Status. MDMDiagReport does not carry AssignedAccess. `StatusConfiguration` is Intune-settable but yields a payload only a non-Intune MDM server can read. | Ship as **one anti-feature row**, not a verification step. Verification = observable device behaviour (primary) + the AssignedAccess **Operational event log** (secondary, admin-at-console), per RE-223's precedent at `02:271`. `AppNotFound` survives as a named symptom under the pre-installed-apps prerequisite. |
| **AUMID discovery** (`Get-StartApps`, reused from RE-222) | N/A | Populate `AppUserModelId` values in the `AllowedApps` list | Cross-link to RE-222's existing AUMID-discovery step rather than re-authoring |

### Recipe #4 — Android Dedicated, MHS Multi-App (RE-225)

| Feature / Profile Type | Version Floor | Purpose | Why Recommended |
|---|---|---|---|
| **MHS App Configuration policy** — Intune **Apps → Configuration → Managed devices (Android) → Managed Home Screen** (`com.microsoft.launcher.enterprise`) | Android 8.0+ (matches MHS/Dedicated floor already in `05-dedicated-devices.md`) | The configuration surface for grid/layout, screensaver, sign-in/sign-out, and allow-list — GATE 2 above | Direct-fetched 2026-07-25, current as of updated_at 2026-06-22 |
| **`applications` allow-list key + `managed_folders`/`widgets`** | Same policy | Curated multi-app home-screen surface | This is the delta content `05-dedicated-devices.md` does not cover — it stops at "MHS must be assigned Required," not what's configurable inside MHS |
| **Screensaver / digital-signage keys** (`show_screen_saver`, `screen_saver_image`, timing keys) | Same policy; requires Overlay + exact-alarm (Android 14+) permission | Digital-signage variant of the multi-app scenario | Already named as a *scenario* in `05-dedicated-devices.md`'s table but not configured at the key level anywhere in the corpus — genuine delta |
| **Sign-in/sign-out keys** (`enable_mhs_signin`, `signin_type`, session-PIN keys, auto-signout keys) | Same policy | Backs the existing "Entra shared device mode" scenario row | Adds first-party JSON-key-level detail to a scenario `05-dedicated-devices.md` currently only names, not configures |
| **OEMConfig permission auto-grant** (`configure-managed-home-screen-permissions-android`) | Samsung-specific tabs shown in the fetched page; general OEMConfig applies wherever the OEM supports it | Avoids runtime Settings-app permission prompts that create a kiosk breakout path | Cross-link, don't re-author — flagged as new prerequisite content for RE-225 |
| **Everything else in `05-dedicated-devices.md`** (enrollment profile, token types, provisioning methods, FRP, exit-PIN sync) | Unchanged | Do NOT re-document — see "Already Covered" below | RE-225 is a delta doc; zero-edit guardrail applies to the sidecars, not to this content, but re-authoring it would violate the "delta, never re-author" scope rule |

---

## Already Covered — Do NOT Re-Document

| Topic | Where it already ships | Note |
|---|---|---|
| Windows Autopilot self-deploying mode, Entra join, TPM 2.0 | `docs/recipes/01-shared-windows-avd-client.md` + `docs/admin-setup-apv1/08-self-deploying.md` | RE-224 assumes an already-provisioned self-deploying device; Recipe #3 starts at the kiosk-configuration decision point, mirroring how RE-222 Step 5a is the kiosk branch off the same provisioning spine |
| SharedPC CSP (all nodes), Windows App deployment, `RemoteDesktop/AutoSubscription` | RE-222 (`01-shared-windows-avd-client.md`) Steps 4–5b | Zero edits permitted per PROJECT.md guardrail; RE-224 cross-links Step 5's fork rather than re-presenting the Kiosk-vs-SharedPC choice |
| Single-app Assigned Access / `KioskModeApp` kiosk, AUMID discovery via `Get-StartApps` | RE-222 Step 5a | ~50% of RE-224 content is this material verbatim per PROJECT.md's own estimate — cross-link, never re-author |
| Android Enterprise Dedicated enrollment profile, token types (Standard vs. Entra shared-device mode), all four provisioning methods (QR/NFC/afw#setup/Zero-Touch), Knox/Zero-Touch mutual exclusion, exit-kiosk PIN **synchronization pattern** (the two-policies-must-match rule), Android 15 FRP re-provisioning pathways | `docs/admin-setup-android/05-dedicated-devices.md` | RE-225 assumes enrollment is already complete; starts at "what is inside the MHS app configuration policy" |
| Managed Google Play binding, Zero-Touch portal linking, EFRP configuration | `docs/admin-setup-android/01-managed-google-play.md`, `02-zero-touch-portal.md`, `03-fully-managed-cobo.md` | Cross-links only |
| MHS app itself as a concept, its role as the launcher for Dedicated multi-app | `05-dedicated-devices.md` Terminology + Delta 3 | RE-225 documents *what's configurable inside it*, not what it is |

---

## Version Compatibility

| Component | Compatible With | Notes |
|---|---|---|
| AssignedAccess `Configuration` node (base multi-app mechanism) | Windows 10 1709+ [10.0.16299]; Windows 11 confirmed compatible (same CSP tree, no separate exclusion documented) | [HIGH] |
| AssignedAccess XML default/base namespace (`2017/config`) | Works on both Windows 10 and 11 baseline | [HIGH] |
| `v4` namespace (`2021/config`) — `ClassicAppPath`/`ClassicAppArguments`, Windows-11-flavored `StartLayout` handling | **Windows 11, version 21H2+** | [HIGH] — directly from `configuration-file` page's version table |
| `v5` namespace (`2022/config`) — `StartPins`, `TaskbarLayout` (custom taskbar pins) | **Windows 11, version 22H2 [10.0.22621]+** | [HIGH] — same source; do not imply StartPins/TaskbarLayout work on 21H2 |
| `ShellLauncher` node/feature | Enterprise/Education/IoT Enterprise only, Windows 10 1803+; **not** Pro | [HIGH] — irrelevant to RE-224 since the recipe uses `Configuration`/`AllAppList`, not Shell Launcher, but worth a one-line anti-feature note to prevent confusion |
| Intune Templates → Kiosk "Multi app kiosk" GUI option | **Windows 10 only** per Microsoft's own current doc; Windows 10 is EoS 2025-10-14 but remains an "allowed" Intune-managed version | [HIGH] — this is the option RE-224 must explicitly NOT use for a Windows 11 target |
| MHS (`com.microsoft.launcher.enterprise`) app configuration policy | Android 8.0+ (matches Dedicated floor) | [HIGH] |
| MHS screensaver / auto-relaunch / auto-signout features | Require Overlay permission; **exact-alarm permission required on Android 14+** | [HIGH] — directly from the fetched page's repeated Note blocks |
| MHS `screen_orientation` key | Android 16+ ignores this setting on ≥600dp (tablet) form factors | [HIGH] — new, dated fact worth flagging since it post-dates `05-dedicated-devices.md`'s last_verified |

---

## Currency Flags (cannot fully establish beyond fetch date)

- `configure-managed-home-screen.md` was updated **2026-06-22** — two months after `05-dedicated-devices.md`'s `last_verified: 2026-04-23`. No specific contradiction was found between the two docs, but the Android 16 `screen_orientation` note and the exact JSON key names above did not exist in the older doc's scope and should be treated as the current state of record.
- The `lock-down-windows-11-to-specific-apps` URL now redirects into the `assigned-access/configure-multi-app-kiosk` + `assigned-access/configuration-file` page family rather than serving standalone content — Microsoft appears to have consolidated the Windows-11-specific kiosk article into the general Assigned Access docs sometime before this research date. Treat `assigned-access/configure-multi-app-kiosk` and `assigned-access/configuration-file` as the canonical citation targets, not the old dedicated URL.
- No first-party page was found (and none is claimed above) confirming or denying SharedPC + multi-app Assigned Access coexistence — this remains genuinely unresolved, not merely unresearched further; treat as a permanent admin-decision-point fork rather than a resolvable fact.

---

## Sources

- [Kiosk settings for Windows and Holographic devices in Microsoft Intune](https://learn.microsoft.com/en-us/intune/device-configuration/templates/configure-kiosk) — HIGH, fetched directly 2026-07-25 (ms.date 2026-02-10, updated 2026-07-01); source of the GATE 1 primary verdict sentence.
- [Configure a Multi-App Kiosk With Assigned Access](https://learn.microsoft.com/en-us/windows/configuration/assigned-access/configure-multi-app-kiosk) — HIGH, fetched directly; confirms Intune/CSP = custom-policy-with-OMA-URI mechanism, confirms "not available using Settings."
- [Create an Assigned Access configuration file](https://learn.microsoft.com/en-us/windows/configuration/assigned-access/configuration-file) — HIGH, fetched directly; XML schema, `AllAppList` vs `KioskModeApp`, namespace/version table (v4=21H2, v5=22H2), `FileExplorerNamespaceRestrictions`, `Configs`/`Account`/`UserGroup` binding rules.
- [AssignedAccess CSP](https://learn.microsoft.com/en-us/windows/client-management/mdm/assignedaccess-csp) — HIGH, fetched directly; edition/OS tables for `Configuration`, `KioskModeApp` (deprecated), `ShellLauncher` (Pro excluded, verbatim quote), `Status`, `StatusConfiguration`. **Caveat (added 2026-07-25):** `Status` is Access Type `Get` only and cannot be read via an Intune custom OMA-URI row; `StatusConfiguration` is settable (Add/Delete/Get/Replace) but its payload is readable only by a non-Intune MDM server.
- [SharedPC CSP](https://learn.microsoft.com/en-us/windows/client-management/mdm/sharedpc-csp) — HIGH, fetched directly; full node list including `KioskModeAUMID` (SharedPC's own single-app Assigned Access hook); no coexistence statement found (documented as a gap, not asserted either way).
- [Configure the Microsoft Managed Home Screen App](https://learn.microsoft.com/en-us/intune/app-management/configuration/configure-managed-home-screen) — HIGH, fetched directly 2026-07-25 (ms.date 2026-04-21, updated 2026-06-22); source of the GATE 2 full key-name tables (grid, allow-list, folders, widgets, screensaver, sign-in/sign-out, exit-PIN JSON key, OEMConfig permission notes).
- [Configure Microsoft Launcher for Android Enterprise With Intune](https://learn.microsoft.com/en-us/intune/app-management/configuration/configure-launcher-android) — HIGH, fetched directly; **note — this is a different app/package** (`com.microsoft.launcher`, fully-managed COBO Launcher) from Managed Home Screen (`com.microsoft.launcher.enterprise`, Dedicated); fetched to positively rule it out as the wrong doc for this milestone, cross-referenced to confirm the correct package name pattern.
- WebSearch corroboration (community, MEDIUM) — `mobile-jon.com` "Deep Dive into Windows 11 Kiosks" series, `petervanderwoude.nl`, `cloudinfra.net` — all independently describe the same Custom-OMA-URI/AssignedAccess-CSP mechanism for Windows 11 multi-app kiosk, corroborating (not contradicting) the first-party finding above.
- `.planning/milestones/v1.18-phases/130-recipe-1-shared-windows-avd-client-device/130-RESEARCH.md:340` — the internal, previously-uncited claim this research was tasked with verifying; now superseded by the first-party citations above.
- `docs/recipes/01-shared-windows-avd-client.md` (RE-222, Approved) — read, not re-researched; source of the "already covered" list for Windows.
- `docs/admin-setup-android/05-dedicated-devices.md` (RE-097, Approved, last_verified 2026-04-23) — read, not re-researched; source of the "already covered" list for Android; flagged as stale relative to the MHS config page's 2026-06-22 update.

---
*Stack research for: Intune Device Configuration Recipes (v1.19) — Windows Multi-App Kiosk + Android Dedicated MMHS Multi-App*
*Researched: 2026-07-25*
