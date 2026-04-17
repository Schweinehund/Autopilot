# Phase 31: iOS L2 Investigation - Research

**Researched:** 2026-04-17
**Domain:** iOS/iPadOS L2 documentation — Apple MDM diagnostic methods, Intune admin UI, Microsoft Graph depOnboardingSetting, Apple supervision boundary, compliance/CA timing state machine
**Confidence:** HIGH (all 6 research flags resolved against authoritative Microsoft Learn + Apple Support + Apple Developer sources; single flagged drift risk noted in Open Questions)

## Summary

CONTEXT.md has locked 35 decisions through adversarial review. This research verifies the 6 outstanding technical flags (D-30..D-35) and supplies the authoritative Microsoft Learn + Apple Support citations the planner and executor need to write accurate runbook content. No locked decisions require reopening. One partial deviation from CONTEXT assumptions was uncovered: the **Intune admin center "Collect diagnostics" remote action for iOS/iPadOS is scoped to App Protection (MAM) diagnostics, NOT general MDM diagnostic bundles** — this modifies what CONTEXT D-01 calls "Tier 1 MDM diagnostic report." The actual iOS MDM diagnostic artifact is pulled from the device by the user from Settings > General > VPN & Device Management > Management Profile > More Details (already correctly cited in `ios-lifecycle/01-ade-lifecycle.md` line 363). This nuance is flagged below under D-31 and carried into the Validation Architecture section as a grep check.

All 13 D-22 placeholder line anchors were re-verified in the current working tree — **no line drift** since CONTEXT was gathered. The planner can use the exact line numbers in D-22 as-is.

**Primary recommendation:** Proceed to planning. All 35 decisions remain valid. Treat the D-31 MDM-diagnostic-report nuance as a wording refinement (L2 instructs the end user to surface the report on the device and screenshot-captures the output; L2 does not pull a bundle from the Intune admin center for iOS MDM data). Sysdiagnose triggers are consolidated (modern iPhone and iPad both use two-volume + side/top simultaneous press for 1–1.5 seconds).

## Research Scope & Sources

| Source | Authority | Last Updated | Used For |
|--------|-----------|--------------|----------|
| Microsoft Learn: "Remote Device Action: Collect Diagnostics" | HIGH | 2026-04-16 | D-31 UI path verification; reveals iOS scope is App Protection, not MDM |
| Microsoft Learn: "Report problems in Company Portal app for iOS" | HIGH | 2026-04-08 | D-32 Company Portal send-logs procedure + incident ID retrieval model |
| Microsoft Learn: "Device compliance policies in Microsoft Intune" (overview) | HIGH | 2026-04-16 | D-35 compliance state machine, "Not compliant" default-posture toggle, 30-day validity period |
| Microsoft Learn: "depOnboardingSetting resource type" (Graph beta) | HIGH | 2026-01-08 | D-33 Graph API endpoint, permissions, property list, JSON shape |
| Microsoft Learn: "Get depOnboardingSetting" (Graph beta) | HIGH | 2026-03-17 | D-33 single-item GET permission scopes and example response |
| Microsoft Learn: "List depOnboardingSettings" (Graph beta) | HIGH | 2026-03-17 | D-33 list endpoint + permissions |
| Microsoft Learn: "Turn on iOS/iPadOS supervised mode" | HIGH | 2026-04-16 | D-34 supervision boundary confirmation |
| Apple Support: "Distribute managed apps to Apple devices" (deployment guide) | HIGH | 2026-02-11 | D-34 Apple's authoritative statement on supervision + DDM + silent install |
| Apple Developer Forums + it-training.apple.com | MEDIUM | 2024–2025 | D-30 sysdiagnose per-device-type triggers + hold duration |
| Addigy / Cisco / community vendor docs | MEDIUM | 2024–2025 | D-30 Console.app Mac+cable workflow verification (Microsoft coverage insufficient — Apple does not document the sysdiagnose retrieval flow publicly in a single canonical page) |
| Microsoft Learn: "Troubleshooting iOS/iPadOS device enrollment errors" | HIGH | (not captured — confirmed live page 2026) | Pattern A/D token sync failure indicators |
| Microsoft Learn: "Manage Apple Volume-Purchased Apps" | HIGH | (live) | VPP device-licensed vs user-licensed failure mode research |
| Existing project: `docs/admin-setup-ios/06-compliance-policy.md` lines 149–199 | HIGH (LOCKED project canonical) | 2026-04-16 | D-35 cross-reference target; text already authoritative |
| Existing project: `docs/ios-lifecycle/01-ade-lifecycle.md` lines 355–373 | HIGH (LOCKED project canonical) | 2026-04-16 | MDM diagnostic report on-device retrieval path (authoritative project text) |
| Existing macOS L2 runbooks 10–13 | HIGH (LOCKED project canonical) | 2026-04-14 | Structural templates (D-01..D-20 all reference macOS patterns) |

---

## D-30: Sysdiagnose Procedure Verification

**Flag status:** VERIFIED. CONTEXT-assumed per-device-type variance (iPhone 8/SE ≠ iPhone X+ ≠ iPad with Touch ID ≠ iPad with Face ID) does NOT match current Apple guidance — triggers have converged.

### Current unified trigger (iPhone + iPad, all modern models)

**[CITED: Apple Developer Forums — https://developer.apple.com/forums/thread/80811 | 2024-2025 | MEDIUM]**
Press and release **both volume buttons + side button** (iPhone) or **both volume buttons + top button** (iPad) simultaneously for **1 to 1.5 seconds**. Device vibrates briefly (iPhone only — iPad does not vibrate) and takes a screenshot to confirm capture start. Collection completes in approximately **10 minutes** and runs in the background.

**[CITED: it-training.apple.com/support/tutorials/course/sup270/ | "Using Sysdiagnose on iPhone or iPad" | MEDIUM — Apple IT training, live page]**

### Per-device-type triggers (historical → current)

| Device | Current trigger (iOS 15+) | Legacy trigger (pre-iOS 14) |
|--------|--------------------------|------------------------------|
| iPhone 8 / iPhone SE (Touch ID, Home button) | Both volume + side/sleep-wake button, 1-1.5 sec | Volume Up + Volume Down + Power (no longer works on modern iOS) |
| iPhone X and later (Face ID) | Both volume + side button, 1-1.5 sec | (same as above — legacy combo deprecated) |
| iPad with Home button (Touch ID) | Both volume + top/sleep-wake button, 1-1.5 sec | Volume Up + Volume Down + Power |
| iPad with Face ID (no Home button) | Both volume + top button, 1-1.5 sec | (n/a — always used current combo) |

**[CITED: Apple Developer Forums thread 80811 + vendor confirmations (Addigy, Cisco) | MEDIUM cross-verified]**
**[ASSUMED]** The 250-millisecond hold claim surfaced by one vendor PDF (hcsonline.com) conflicts with Apple's 1–1.5 second guidance and is likely outdated; the runbook should use **1 to 1.5 seconds** as the authoritative hold duration.

### Critical warnings
- Holding too long triggers the **Power Off / Emergency SOS** screen instead. If this happens, dismiss and retry with a shorter hold.
- On iPad, users receive **no vibration feedback** — collection is silent. Runbook must tell L2 to warn the user not to re-trigger repeatedly thinking it failed.

### Artifact location and retrieval

**On-device location:** `Settings > Privacy & Security > Analytics & Improvements > Analytics Data`. Files are named `sysdiagnose_YYYY.MM.DD_HH-MM-SS±ZZZZ_iPhoneOS_iPhone_XX.X.X_XXXXXX.tar.gz`.

**AirDrop / Share:** From the Analytics Data list, tap the sysdiagnose_* file → Share icon → AirDrop to Mac. This is the **path most commonly documented and the easiest for remote L2 troubleshooting**.

**Mac+cable + Console.app retrieval (what CONTEXT D-05 refers to):**
1. Connect iOS device to Mac via Lightning or USB-C cable.
2. Trust the Mac prompt on the device (first-time only).
3. On Mac, open **Console.app** (Applications > Utilities > Console, or Spotlight "Console").
4. In Console.app's left sidebar, the connected iOS device appears under **Devices** section — click the device name to select it.
5. Console.app will stream live device logs. Sysdiagnose itself is triggered on-device via the button combo above — Console.app is primarily used for *streaming unified log data* during reproduction of a failure, not for triggering sysdiagnose remotely (no remote trigger exists in the public Console.app UI as of Apple's current documentation).
6. After the sysdiagnose file appears in Analytics Data on the device, users can either AirDrop it to the Mac OR (on the Mac) use **Finder > [iPhone name] > Files** to browse some exported app containers (not sysdiagnose directly).

**Practical L2 retrieval flow:** Trigger via button combo on the device → wait 10 minutes → user navigates to Analytics Data → user AirDrops sysdiagnose file to L2's Mac. The "Mac+cable" in CONTEXT D-05 should be interpreted as "Mac required for AirDrop reception AND for live log streaming during failure reproduction." A Lightning-to-USB-C or USB-C-to-USB-C cable is required IF AirDrop is unavailable (air-gapped or WiFi-less environments) — in that case, sysdiagnose extraction requires installing the Apple Configurator 2 tool on the Mac to browse the device's file system.

**Cable type by device:**
- **Lightning:** iPhone 5 through iPhone 14 (all variants), iPad 7–9, iPad Air 1–4, iPad mini 1–5.
- **USB-C:** iPhone 15 and later, iPad Pro 3rd gen (2018) and later, iPad Air 4th gen and later, iPad 10th gen and later, iPad mini 6 and later.

**Confidence:** HIGH for unified trigger (cross-verified Apple Developer + 3 vendors). MEDIUM for Mac+cable retrieval specifics (Apple does not publish a single canonical flow; community vendor docs are the best current reference).

---

## D-31: MDM Diagnostic Report UI Path

**Flag status:** VERIFIED — with correction. CONTEXT D-01 calls Tier 1 "MDM diagnostic report — L2 self-service portal pull from Intune admin center > Devices > [device] > Download diagnostics." This DOES NOT WORK AS DESCRIBED for iOS MDM diagnostics — the Intune "Collect diagnostics" action is MAM-scoped for iOS. The actual MDM diagnostic report on iOS is pulled **on-device by the user**.

### What the Intune admin center "Collect diagnostics" remote action actually does for iOS

**[VERIFIED: https://learn.microsoft.com/en-us/intune/device-management/actions/collect-diagnostics | last updated 2026-04-16 | HIGH]**

For iOS/iPadOS, the "Collect diagnostics" remote action is scoped to **Intune App Protection (MAM) logs and Microsoft 365 application diagnostics** — NOT general MDM enrollment/config/profile diagnostics. The iOS-supported apps are: Outlook, Teams, OneDrive, Microsoft Edge, Word, Excel, PowerPoint, OneNote, Microsoft 365 (Office).

**Exact breadcrumb for MAM diagnostics on iOS:**
1. `https://intune.microsoft.com` (Microsoft Intune admin center)
2. **Troubleshooting + support** > **Troubleshoot** > *select a user*
3. On the **Summary** page: **App Protection** > **Checked-in** tab
4. Find the app → **"..."** menu → **Collect diagnostics** → confirm **Yes**
5. To download results: **Troubleshooting + support** > **Troubleshoot** > *select user* > **Summary** > **Diagnostics** tab

**Delivery latency:** Approximately **30 minutes** from trigger to availability.

**Size cap:** Diagnostic uploads **exceeding 50 diagnostics or 4 MB cannot be downloaded from the Intune portal** — larger uploads require Microsoft Intune Support. *This is a critical L2 workflow constraint that belongs in `14-ios-log-collection.md` Tier 1.*

**Required roles:** Help Desk Operator, School Administrator, or custom role with `Remote tasks/Collect diagnostics` permission + `Organization/Read` + `Managed devices/Read`.

**Network prerequisite (per region):** `lgmsape{region}.blob.core.windows.net` must not be blocked on the device side for uploads to succeed.

### What is the actual iOS MDM diagnostic report, then?

**[VERIFIED: existing project canonical text `docs/ios-lifecycle/01-ade-lifecycle.md` line 363 | HIGH]**
`Settings > General > VPN & Device Management > Management Profile > More Details`. This surface on the device shows the installed configuration profiles, their payloads, and error states reported by the MDM framework. L2 instructs the user to navigate here and screenshot/narrate the content. There is NO admin-center pull for the on-device profile state — the admin-center equivalent is the "Device configuration" blade under the device record, which shows Intune's side of the conversation (what was *sent*), not the device's ack/error state per profile.

### Planner recommendation

Update `14-ios-log-collection.md` Tier 1 wording to reflect the **two distinct Intune-admin-center data sources**:
1. **Per-device configuration/compliance state** (always available): Intune admin center > **Devices** > **iOS/iPadOS** > *select device* — review **Device compliance**, **Device configuration**, **Managed apps**, **Overview**, **Hardware** blades. No MAM role required. This IS self-service L2 data.
2. **MAM app protection diagnostics** (MAM scope only): Via **Troubleshooting + support > Troubleshoot > Diagnostics**, supports collect + download up to 50 diagnostics / 4 MB. Requires the app to be under an App Protection policy.

Neither of these produces an artifact equivalent to Windows `mdmdiagnosticstool.exe`. CONTEXT D-02's SC #2 preamble ("no iOS equivalent to mdmdiagnosticstool.exe") remains **literally correct and authoritative** — this finding reinforces it rather than contradicts it.

**Confidence:** HIGH on Intune UI path; HIGH on the "no single MDM bundle pull for iOS" finding.

---

## D-32: Company Portal Log Upload

**Flag status:** VERIFIED.

### Current iOS Company Portal app log upload UI

**[VERIFIED: https://learn.microsoft.com/en-us/intune/intune-service/user-help/send-logs-to-microsoft-ios | last updated 2026-04-08 | HIGH]**

Three paths to initiate a log upload from the iOS Company Portal app:

1. **Error-driven:** When the app shows an error message or alert, tap **Report**.
2. **Menu-driven:** Tap the **More** tab > **Send Logs**.
3. **Shake gesture:** Shake the device > tap **Send Diagnostic Report**. (If shake does not prompt, enable via device Settings > Apps > Company Portal > turn on **Shake Gesture**.)

### The full upload flow

1. Open Company Portal for iOS/iPadOS.
2. **Reproduce the event** causing the issue (optional but strongly recommended — places the failure at the top of the log).
3. Initiate upload via any of the three paths above.
4. Wait for Company Portal to upload its logs, then tap **Open Authenticator** to collect Microsoft Authenticator logs (combined upload).
5. **Save the incident ID** that appears — this is unique to the upload and the sole handle L2 / support will use to retrieve the logs.
6. Tap **Email Logs** to compose a support email that includes the incident ID in the body.

### Backend retrieval model (CRITICAL for L2 workflow)

**[VERIFIED: Microsoft Learn + community cross-check | HIGH]**

The iOS Company Portal log upload is **ticket-based, not self-service**. Logs are uploaded to Microsoft's support backend and are NOT directly downloadable from the Intune admin center by an L2 engineer. An L2 engineer with an incident ID must **open a Microsoft Intune Support ticket and provide the incident ID** — Microsoft support then retrieves the logs on the L2's behalf and returns the analysis (or the raw logs, depending on case handling).

**[CITED: community confirmation per anoopcnair.com / Symphony Help Center | MEDIUM] — "At this moment, the diagnostics logs will not be available for download for iOS devices. For those logs, contact the Intune support team."**

This is the **key latency driver** for CONTEXT D-03's decision matrix "Typical Latency" column: MAM App Protection collection is ~30 min; Company Portal Send Logs is **1–3 business days (ticket roundtrip)**. This is the signal that pushes time-critical L2 investigations to Tier 3 (Mac+cable sysdiagnose) despite its physical-access friction.

### Preflight (verbose logging)

Runbook 14 should include a sub-section on enabling **verbose logging** before reproducing the issue. Verbose logging records additional detail that is not captured in default logging. Enabled at: Company Portal > More > Settings (or via the Configure logging settings article referenced in the Microsoft Learn page).

**Confidence:** HIGH.

---

## D-33: Graph API Endpoint for Token Rotation

**Flag status:** VERIFIED — with nuance. There is no dedicated "token rotation history" endpoint. The single indicator surfaced by this runbook per D-08 is the current token's state + last-modified + sync metadata, which is surfaced by `GET /deviceManagement/depOnboardingSettings` (list) and `GET /deviceManagement/depOnboardingSettings/{id}` (single).

### Exact endpoints

**List all onboarded DEP tokens (ABM/ASM): [VERIFIED: Microsoft Graph beta | last updated 2026-03-17 | HIGH]**
```http
GET https://graph.microsoft.com/beta/deviceManagement/depOnboardingSettings
```

**Get single DEP onboarding setting: [VERIFIED | HIGH]**
```http
GET https://graph.microsoft.com/beta/deviceManagement/depOnboardingSettings/{depOnboardingSettingId}
```

### Required permission scopes

| Permission type | Minimum scope |
|-----------------|---------------|
| Delegated (work or school) | `DeviceManagementServiceConfig.Read.All` (matches CONTEXT D-33 candidate) |
| Application | `DeviceManagementServiceConfig.Read.All` |
| Delegated (personal MSA) | Not supported |

Read-only scope is sufficient; no ReadWrite scope is needed for the L2 GET-only flow per D-09.

### Response shape (what Pattern A/D diagnosis uses)

```json
{
  "@odata.type": "#microsoft.graph.depOnboardingSetting",
  "id": "40342229-2229-4034-2922-344029223440",
  "appleIdentifier": "admin@example.com",
  "tokenExpirationDateTime": "2026-12-31T23:59:54Z",
  "lastModifiedDateTime": "2026-01-01T00:00:35Z",        // **key field: token rotation timestamp**
  "lastSuccessfulSyncDateTime": "2026-04-15T00:03:28Z",  // **key field: Pattern A stuck-sync detection**
  "lastSyncTriggeredDateTime": "2026-04-15T00:00:02Z",   // **key field: Pattern A stuck-sync detection**
  "lastSyncErrorCode": 0,                                  // **key field: Pattern A error surface**
  "tokenType": "dep",
  "tokenName": "Corporate ABM Token",
  "syncedDeviceCount": 1234,                              // **key field: Pattern D sanity check**
  "dataSharingConsentGranted": true,
  "shareTokenWithSchoolDataSyncService": false,
  "roleScopeTagIds": ["0"]
}
```

### Pattern A indicator extraction (from response)

- **Pattern A (token expired):** `tokenExpirationDateTime` < now
- **Pattern A (sync stuck):** `lastSyncTriggeredDateTime` > 24h AND `lastSuccessfulSyncDateTime` > 24h before last trigger
- **Pattern A (sync error):** `lastSyncErrorCode` != 0
- **Pattern D (token rotation):** Compare current `lastModifiedDateTime` against a previous recorded value (no history endpoint — L2 must know the prior value from ticket notes or change-log) to detect recent token replacement. `appleIdentifier` change detection is also a Pattern D indicator.

### Important caveats

- **Beta API only:** No v1.0 (GA) equivalent exists as of 2026-04-17. The runbook preamble (D-09) must note the beta caveat: Microsoft supports beta APIs but they are subject to more frequent change.
- **NOT a rotation history endpoint:** The CONTEXT text "token rotation history" should be interpreted as "current token state snapshot used to infer rotation events" — not a changelog endpoint. Planner should phrase runbook 15 Pattern D indicators as "`lastModifiedDateTime` reflects the most recent token upload/replacement — compare against ticket history for rotation-in-progress detection" rather than promising an audit log.
- **Portal equivalent:** Most of this data IS surfaced in the Intune admin center: **Devices > iOS/iPadOS > iOS/iPadOS enrollment > Enrollment Program Tokens > [token]** shows expiration + last-sync fields. The Graph GET is the surgical supplement for `lastSyncErrorCode` numeric value + machine-readable response shape for scripted audit.

### ADDTS-02 scope boundary

Any **write operation** (POST `/syncWithAppleDeviceEnrollmentProgram`, POST `/uploadDepToken`) is deferred to ADDTS-02 per D-09. The L2 runbook 15 warning block (D-09 preamble) enforces this.

**Confidence:** HIGH.

---

## D-34: iOS Supervision Boundary for Silent Install

**Flag status:** VERIFIED. Supervision remains REQUIRED for silent install in iOS 17+ under Declarative Device Management. DDM did NOT change this boundary.

### Apple's authoritative statement

**[CITED: Apple Support — https://support.apple.com/guide/deployment/distribute-managed-apps-dep575bfed86/web | 2026-02-11 | HIGH]**

> "On supervised devices, apps are installed silently. Otherwise the user is prompted to approve the installation."

This applies to both legacy `InstallApplication` MDM commands AND the newer declarative app management (introduced iOS 17.2+ / iPadOS 17.2+ / macOS 26+). DDM changed HOW devices process app installs (autonomous execution, activation predicates, status reporting granularity) but did NOT change the supervision-vs-prompt boundary for silent install.

### Microsoft Learn confirmation

**[CITED: https://learn.microsoft.com/en-us/intune/intune-service/enrollment/device-supervised-mode | 2026-04-16 | HIGH]**

Silent app installation is listed as a supervised-only capability. Unsupervised devices receive the Intune app install assignment but must prompt the user for approval before each install.

### VPP licensing interaction

| VPP licensing mode | Supervision required for silent? | User prompted on unsupervised? |
|--------------------|----------------------------------|-------------------------------|
| **Device-licensed** | Yes, for silent | Yes — user must approve (or manually install from Company Portal) |
| **User-licensed** | Yes, for silent | Yes — plus requires Managed Apple Account sign-in (User Enrollment scenario only) |
| **LOB (IPA, non-VPP)** | Yes, for silent | Yes — user prompt |
| **Store app (no VPP)** | N/A (users install themselves from App Store; admin has no silent path) | Not applicable |

**[CITED: https://learn.microsoft.com/en-us/intune/intune-service/apps/vpp-apps-ios | HIGH] + community confirmations | MEDIUM**

### Mapping to CONTEXT D-12 three-class disambiguation

| Failure class | Supervision boundary implication |
|---------------|----------------------------------|
| **⚙️ Config error** | Admin assigned app as "Required" to an unsupervised device expecting silent install — user never saw the prompt (missed notification) OR declined the prompt. Resolution: verify supervision state; if unsupervised, change to "Available" assignment or supervise the device via ADE re-enrollment. |
| **⚙️ Config error (VPP user-licensed)** | VPP user-licensed assigned to a non-User-Enrollment device OR to a user without a Managed Apple Account. Resolution: switch to device licensing OR reassign only to User-Enrollment-capable devices. |
| **⏱️ Timing issue** | App assignment processing delay — iOS check-in cadence is ~8 hours; push via APNs triggers faster. Resolution: Company Portal Sync, or wait up to 8 hours, then verify. |
| **🐛 Genuine defect** | Silent install supervised + VPP device-licensed + token active + license pool has capacity + app exists in ABM → still shows Failed with no actionable Intune error. Escalate to Microsoft Support with data collection per CONTEXT D-12 escalation block. |

### Key DDM nuance for runbook 16

- **Declarative app management (iOS 17.2+) introduces the "Required" vs "Optional" distinction with activation predicates.** Required apps are auto-installed + marked nonremovable; Optional apps install on user request. Supervision remains the silent-install gate for Required apps.
- **App takeover:** DDM can take over management of a user-installed unmanaged app. On supervised devices this happens without user interaction; on unsupervised devices the user must formally accept management. This is a **new ⚙️ config error failure mode** — admin expected takeover to be silent, but the target is unsupervised.

**Confidence:** HIGH.

---

## D-35: Default Compliance Posture + "Not evaluated" Terminal State

**Flag status:** VERIFIED. Project's existing `docs/admin-setup-ios/06-compliance-policy.md` §`#compliance-evaluation-timing-and-conditional-access` remains accurate against current Microsoft Learn.

### Microsoft Learn authoritative description

**[VERIFIED: https://learn.microsoft.com/en-us/intune/intune-service/protect/device-compliance-get-started | last updated 2026-04-16 | HIGH]**

**"Mark devices with no compliance policy assigned as" setting** (tenant-wide, at **Endpoint security > Device compliance > Compliance policy settings**):
- **Compliant (default):** Devices without a device compliance policy assigned are considered compliant. If Conditional Access "Require compliant device" is in effect, these devices are granted access.
- **Not compliant:** Devices without a policy are considered non-compliant. For Conditional Access integration, Microsoft recommends setting this to **Not compliant**.

**Compliance status validity period (days):** Default 30 days, configurable 1–120. If a device fails to report its compliance status within this window, it is treated as non-compliant. ("Is active" setting visible at **Devices > Monitor > Setting compliance**.)

### "Not evaluated" state mechanics

**[VERIFIED: Microsoft Learn + Microsoft Q&A consensus | HIGH]**
- "Not evaluated" is the initial state for a newly-enrolled device OR a device that has not checked in since a compliance policy was assigned.
- Persists until the first successful check-in where the device processes the policy and reports status.
- Also appears when a device has not received a compliance policy at all — and in that case, the tenant-level "Mark devices with no compliance policy assigned as" toggle governs CA treatment.

### 30-minute first-evaluation window

**[VERIFIED: project canonical `docs/admin-setup-ios/06-compliance-policy.md` §`#compliance-evaluation-timing-and-conditional-access` | HIGH]**

The project's existing compliance-policy doc documents the 0–30 minute first-evaluation window (T+0–15 min Not evaluated → T+15–30 min first evaluation completes) and the iOS APNs-dependency footnote (APNs blocked at edge → stuck Not evaluated indefinitely). Microsoft Learn does not publish a specific "30-minute" number — it documents the pattern as "depends on when device checks in" with a 24-hour upper bound. The project's 30-minute framing is consistent with field-observed Apple MDM behavior and is the authoritative reference for the runbook.

### APNs-blocked terminal state (the "genuine defect" cross-cutting case — D-16)

**[VERIFIED: project canonical + Microsoft Learn iOS compliance settings | HIGH]**

An iOS device check-in is initiated by APNs push — not a device-local polling timer. If APNs is blocked at the network edge (firewall, proxy, captive portal without Apple exceptions), the compliance check-in never fires and the device remains in "Not evaluated" indefinitely. This is the **APNs-blocked terminal state** referenced in CONTEXT D-16.

Microsoft Support escalation data (per D-16):
- APNs tenant ID (Intune admin center > Tenant administration > Connectors and tokens > Apple push notification certificate > "Apple ID" field — this IS the Apple ID used to create the APNs cert, and is the handle Microsoft Support uses to cross-reference tenant APNs state)
- APNs certificate expiry timestamp
- Network-path evidence: sysdiagnose `kernel.log` or unified log excerpt showing `apsd` / `identityservicesd` connection failures to `*.push.apple.com` / `courier.push.apple.com`
- Date range of "Not evaluated" persistence (observed first on [date], still stuck as of [date])

### Cross-platform APNs blast radius (Phase 27 D-11 reference)

A single expired Apple Push Notification certificate breaks MDM communication for **all Apple platforms simultaneously** (iOS, iPadOS, macOS). The compliance investigation in runbook 17 must recognize that APNs-blocked-at-edge on one device is often a symptom of a broader tenant-level cert issue — verify the APNs cert state first before drilling into per-device network troubleshooting.

**Confidence:** HIGH.

---

## Pattern A-D Substance for Runbook 15

The following are indicators + resolution paths per Pattern, drawn from Microsoft Learn iOS ADE troubleshooting + the Graph API properties in D-33.

### Pattern A: Token expired OR sync stuck

**Indicators:**
- Intune admin center > Devices > iOS/iPadOS > iOS/iPadOS enrollment > **Enrollment program tokens** > [token] shows **Expired** status, OR shows **last sync > 24 hours ago**, OR shows a numeric `lastSyncErrorCode` on Graph GET.
- New devices added in ABM are NOT appearing in Intune after 24 hours (normal sync is ~hourly).
- Existing devices fail to enroll with error "This device belongs to another organization" or "no enrollment profile found."

**Resolution:**
1. If expired: re-download token from ABM (Settings > [your name] > Preferences > Your MDM Server > Download Token) and re-upload to Intune (same Enrollment program tokens blade > [token] > Edit > upload `.p7m`).
2. If sync stuck: click **Sync** on the token. If still stuck after 30 minutes, file a Microsoft Support ticket with: token name, `lastSyncTriggeredDateTime`, `lastSyncSuccessDateTime`, `lastSyncErrorCode` from Graph GET.
3. If `syncedDeviceCount` is 0 or drastically below ABM device count: the token may be orphaned (ABM re-assigned to a different MDM server). Resolution requires ABM portal access — verify **Devices** view in ABM shows the correct MDM server assignment.

**Escalation:** Microsoft Support if `lastSyncErrorCode` != 0 after token renewal + resync; collect the Graph GET response body + ABM token download timestamp.

### Pattern B: Profile never assigned to device in ABM

**Indicators:**
- Device appears in Intune (from ABM sync) but has **no assigned enrollment profile** — visible in Intune admin center > Devices > iOS/iPadOS > iOS/iPadOS enrollment > Enrollment Program Tokens > [token] > Devices (list) — column shows **"not assigned"** for the device serial.
- User attempts enrollment and the device skips the MDM profile step in Setup Assistant.
- Graph `enrollmentProfiles` relationship on depOnboardingSetting shows profile objects, but no device has that profile assigned.

**Resolution:**
1. ABM portal (requires L2 ABM read+edit OR escalate to ABM admin): Devices > [serial] > **Assign to MDM server** → confirm Intune MDM server.
2. Intune admin center: Enrollment Program Tokens > [token] > Profiles > **[profile name]** > **Assign devices** → select device serial.
3. On device: user boots, reaches network → device triggers ADE enrollment check via `iprofiles` → downloads profile → continues Setup Assistant.

**Escalation:** If step 1 completes but step 2 still shows "no profile assigned" after 30 minutes of sync, Microsoft Support.

### Pattern C: Profile assigned but device never received it (APNs / network path)

**Indicators:**
- Profile IS assigned (per Intune admin center view) but device Setup Assistant never shows the "Remote Management" pane.
- Device can reach `apple.com`, `icloud.com`, etc. (basic Apple connectivity) but NOT `deviceenrollment.apple.com`, `mdmenrollment.apple.com`, `*.push.apple.com`.
- Sysdiagnose `kernel.log` shows connection failures to the MDM enrollment endpoints.

**Resolution:**
1. Verify network path from the device's enrollment location to Apple's device enrollment and MDM endpoints. Provide the network/firewall team the Apple-published list: `https://support.apple.com/HT210060` (Apple's "about MDM and ADE network requirements" ref).
2. Verify APNs cert state in Intune > Tenant administration > Connectors and tokens > Apple push notification certificate — not expired, not revoked, APNs Apple ID matches expected.
3. Try enrollment from a known-good network (hotspot, home WiFi) to isolate corporate network from the variable.

**Escalation:** If a network path is confirmed open end-to-end AND APNs cert is active AND device still never sees the profile, Microsoft Support — with sysdiagnose kernel.log excerpt + network-path evidence + APNs tenant ID.

### Pattern D: Wrong MDM server on device (token rotation / tenant migration)

**Indicators:**
- Device IS enrolled but receives NO management commands.
- `Settings > General > VPN & Device Management` shows a Management Profile from a **different Intune tenant URL** (e.g., `*.manage.microsoft.com` with a different tenant ID than expected) OR from a **previous MDM provider**.
- Graph GET on depOnboardingSetting shows a recent `lastModifiedDateTime` (< 30 days) AND a different `appleIdentifier` than the ticket-recorded prior state (indicates token rotation).
- ABM portal shows the device's "Previously assigned to" field lists a different MDM server.

**Resolution (requires device wipe — cannot be fixed in Intune alone):**
1. Confirm tenant migration history with the admin team: was the ABM token recently re-generated, re-assigned to a new MDM server, or moved between Intune tenants?
2. Wipe device (in the old tenant if still accessible; otherwise physical factory reset on-device).
3. In ABM: confirm device is assigned to the CURRENT Intune MDM server (Devices > [serial] > Assign to MDM server).
4. Re-enroll via Setup Assistant; device receives the correct profile.

**Escalation:** If device CANNOT be factory reset (user data constraint), escalate to Microsoft Support for a "release device from MDM" procedure in ABM — this is a destructive admin action that removes the device from ADE management and requires ABM admin-level permissions.

**Confidence per pattern:** HIGH (A — Microsoft Learn + Graph API verified); HIGH (B — ABM docs); MEDIUM (C — Microsoft Learn general ADE enrollment error troubleshooting, community-confirmed); HIGH (D — tenant-migration support articles + Microsoft Q&A).

---

## Runbook 16 Failure Class Mapping

Every failure pattern in `16-ios-app-install.md` MUST be tagged with ⚙️ / ⏱️ / 🐛 per CONTEXT D-12. Below is the exhaustive mapping sourced from Microsoft Learn VPP docs + Apple's deployment guide.

### VPP Device-Licensed failures

| Failure | Class | Indicator | Resolution |
|---------|-------|-----------|------------|
| VPP token expired | ⚙️ | Intune > Tenant admin > Connectors and tokens > Apple VPP tokens shows **Expired** | Renew token in ABM → upload renewed `.vpptoken` to Intune |
| License count exhausted | ⚙️ | Apps > iOS/iPadOS > [app] > Properties shows `total licenses == consumed` | Purchase additional licenses in ABM → sync VPP token |
| App assigned device-licensed to unsupervised device expecting silent install | ⚙️ | Device Settings > General > VPN & Device Management shows no "Supervised" banner; app shows "Pending" or user prompted | (a) Change assignment to "Available" OR (b) re-enroll device via ADE with supervision enabled |
| Device not synced recently (check-in latency) | ⏱️ | Intune device "Last check-in" > 8 hours; `Pending install` state | Company Portal Sync OR Intune remote Sync; wait 15 min; recheck |
| Silent install supervised + token active + license available + still Failed with no error | 🐛 | All ⚙️ conditions verified; `lastSyncErrorCode` = 0; `Installed` count in ABM shows assignment but device shows Failed | Escalate Microsoft Support: app ID + Bundle ID + device serial + Intune install status screenshot + VPP token last-sync timestamp |

### VPP User-Licensed failures

| Failure | Class | Indicator | Resolution |
|---------|-------|-----------|------------|
| User has no Managed Apple Account | ⚙️ | Assignment in Intune shows user group; user is not in ABM as a "Managed Apple Account" | Switch to device licensing OR onboard user's Managed Apple Account in ABM |
| App assigned user-licensed to a Device Enrollment (not User Enrollment) device | ⚙️ | Device is supervised ADE or Device Enrollment; user-licensed apps require User Enrollment + Managed Apple Account | Switch assignment to device licensing |
| Apple ID mismatch on device | ⚙️ | Device has a personal Apple ID signed in, not Managed Apple Account | Sign out personal Apple ID; sign in Managed Apple Account via Settings |

### LOB (IPA) app failures

| Failure | Class | Indicator | Resolution |
|---------|-------|-----------|------------|
| IPA file unsigned or signed with expired enterprise cert | ⚙️ | Device shows "Cannot Install [App]" or silent failure; sysdiagnose `appleagent.log` shows code-signing rejection | Re-sign IPA with current Apple Developer Enterprise Program cert; re-upload to Intune |
| IPA > 2 GB | ⚙️ | Intune upload fails or device download fails consistently | Reduce IPA size OR split into LOB + dependent resources |
| Device not supervised (silent install expectation) | ⚙️ | Unsupervised device; IPA installs require user prompt | Change assignment model OR supervise the device |
| IPA signed with dev provisioning profile (not distribution) | ⚙️ | Install succeeds but app crashes at launch; sysdiagnose shows provisioning-profile expiration or mismatch | Re-sign with distribution provisioning profile |

### Managed app state verification (SC #4 three-class disambiguation entry)

**Procedure:**
1. Intune admin center > Apps > iOS/iPadOS > [app] > **Device install status** — review per-device state (Installed / Pending / Failed / Not applicable).
2. On device (user-coordinated): **Settings > General > VPN & Device Management > Management Profile > More Details** — scan for the app in the "Managed Apps" section; note installed version.
3. Company Portal app > My apps — does the app appear? Does tapping "Install" succeed?

If step 1 says Installed + step 2 confirms install + step 3 works → app is healthy; the user's symptom is unrelated to install. Investigate app-level config / MAM.
If step 1 says Failed + step 2 missing → proceed to failure-class mapping above.
If step 1 says Installed + step 2 missing → **device-side stale cache**; Company Portal Sync or profile re-delivery may resolve.

**Confidence:** HIGH.

---

## Runbook 17 Sub-Section Substance

Per CONTEXT D-14 hybrid axis structure + D-15 Pareto emphasis, the runbook has **expanded** sub-sections (CA timing + Default posture) and **compact** sub-sections (jailbreak, OS version, passcode, restricted apps). Specific indicators + resolutions below.

### Expanded: CA "Require compliant device" timing gap

**Sub-section scope:** The 0-30 minute first-evaluation window where Conditional Access evaluation depends on the tenant-level Default compliance posture toggle.

**Indicator:**
- User completes ADE enrollment; home screen appears.
- User opens Outlook / Teams within 0-30 minutes; sign-in fails with "Your device does not meet your organization's policy."
- Intune admin center > Devices > [device] > Compliance shows **Not evaluated**.

**Investigation steps:**
1. Check tenant Default posture: Endpoint security > Device compliance > Compliance policy settings > "Mark devices with no compliance policy assigned as" — is it **Not compliant**?
2. Check per-device compliance: Devices > [device] > Compliance — is the state **Not evaluated**? Timestamp of enrollment completion (from Overview) vs now: < 30 min?
3. Trigger Company Portal > Sync on the device (or Intune remote Sync).
4. Wait up to 30 minutes; recheck compliance state.

**Resolution:**
- If state transitions to Compliant: timing gap was the sole cause; no action needed except user communication.
- If state remains Not evaluated > 30 min with Default posture = Not compliant: proceed to "Default posture stuck" sub-section (next).
- If state transitions to Non-compliant: proceed to per-Cause sub-sections (Cause B / config).

**Cross-link:** [Compliance Evaluation Timing and Conditional Access](../admin-setup-ios/06-compliance-policy.md#compliance-evaluation-timing-and-conditional-access) (D-28 Phase 28 anchor — verified live line 149).

### Expanded: Default compliance posture stuck

**Sub-section scope:** Device remains in "Not evaluated" state > 30 minutes, crossing into the APNs-blocked terminal state territory (D-16).

**Indicator:**
- Enrollment completed > 30 minutes ago, possibly hours or days.
- Device compliance state still **Not evaluated** in Intune.
- User sign-in to CA-protected resource blocked.

**Investigation steps:**
1. Verify device has checked in: Devices > [device] > Overview > "Last check-in" — if > 8 hours, proceed to Sync attempt.
2. Trigger Intune Sync on the device; wait 30 min; recheck.
3. If still Not evaluated: **verify APNs reachability from device network**. On device: Settings > General > VPN & Device Management > Management Profile > More Details — does "Last management action" timestamp update after trigger?
4. Verify tenant-wide APNs cert: Tenant administration > Connectors and tokens > Apple push notification certificate — not expired, not revoked.
5. If all above pass: collect sysdiagnose via D-30 procedure → examine kernel.log for `apsd`/`identityservicesd` failures to `*.push.apple.com` / `courier.push.apple.com`.

**Resolution:**
- Network path fix: whitelist Apple APNs endpoints at firewall/proxy. Apple reference: `https://support.apple.com/HT203609`.
- If network confirmed open → proceed to Microsoft Support escalation (D-16 data collection block).

### Expanded: "Not evaluated" terminal state (cross-cutting 🐛 — D-16)

Terminal-state specific sub-section covering the case where APNs-blocked leads to indefinite Not-evaluated. Content overlap with "Default posture stuck" above is intentional — planner should differentiate: "stuck" is a timing investigation; "terminal" is a network/cert investigation with Microsoft Support escalation.

**Microsoft Support escalation data (per D-16):**
- APNs tenant ID / Apple ID from APNs cert pane
- APNs cert expiry timestamp
- Network-path evidence (sysdiagnose kernel.log excerpt showing `apsd` connection failures)
- Date range "Not evaluated" persistence (first observed → latest verified)
- Device serial number + iOS version

### Compact: Jailbreak false-positives

**Indicators:** Device reports compliant on all other settings; jailbreak setting fails. Device is NOT actually jailbroken (user is a regular corporate employee, no sideloaded apps, factory iOS).

**Typical cause:** Compromised APNs push delays OR outdated iOS version missing a jailbreak-detection signal update.

**Resolution:**
- Verify actual jailbreak state via Settings > General > About (no unauthorized kernel info).
- Update iOS to current version.
- Contact Microsoft Support if updated OS still reports jailbreak — false-positives are real and tracked.

**Cross-link:** `docs/admin-setup-ios/06-compliance-policy.md#jailbreak-detection`.

### Compact: OS version gate behavior

**Indicators:** Device runs iOS version < policy minimum.

**Resolution:** User updates via Settings > General > Software Update. If hardware can't reach minimum, adjust policy minimum OR move device to a lower-tier compliance policy group.

**Cross-link:** `docs/admin-setup-ios/06-compliance-policy.md#os-version-gates`.

### Compact: Passcode

**Indicators:** Device has no passcode or passcode complexity < policy.

**Resolution:** User sets passcode via Settings > Face ID & Passcode (or Touch ID & Passcode) to meet complexity. Compliance state updates on next check-in.

**Cross-link:** `docs/admin-setup-ios/06-compliance-policy.md#passcode`.

### Compact: Restricted apps Bundle ID issues

**Indicators:** Policy lists a restricted app by Bundle ID; device has the app installed OR Intune reports the device as non-compliant despite the app not being present.

**Typical cause:** Bundle ID mismatch in the compliance policy (App Store Bundle ID vs LOB Bundle ID vs variant).

**Resolution:** Admin verifies exact Bundle ID via ABM or App Store listing → update compliance policy with correct Bundle ID → save → wait for next check-in.

**Cross-link:** `docs/admin-setup-ios/06-compliance-policy.md#restricted-apps`.

**Confidence:** HIGH for all sub-sections.

---

## Placeholder Line-Anchor Drift Check

**Result:** All 13 D-22 placeholder line anchors verified at exactly the line numbers CONTEXT cited. **No drift.** The planner can lock in per-line enumeration at plan time (per D-26) using the CONTEXT D-22 table as-is.

| Source | Expected Line | Verified Line | Placeholder Text Preserved? | Action |
|--------|---------------|----------------|-------------------------------|--------|
| `l1-runbooks/16-ios-apns-expired.md` | 90 | 90 | ✓ `See [iOS L2 Runbooks (Phase 31)](...)` | Simple substitution per D-22 |
| `l1-runbooks/17-ios-ade-not-starting.md` | 114 | 114 | ✓ same pattern | Simple substitution |
| `l1-runbooks/18-ios-enrollment-restriction-blocking.md` | 88 | 88 | ✓ same pattern | Simple substitution |
| `l1-runbooks/19-ios-license-invalid.md` | 96 | 96 | ✓ same pattern | Simple substitution |
| `l1-runbooks/20-ios-device-cap-reached.md` | 83 | 83 | ✓ same pattern | Simple substitution |
| `l1-runbooks/21-ios-compliance-blocked.md` | 179 | 179 | ✓ same pattern | Simple substitution |
| `decision-trees/07-ios-triage.md` | 44 | 44 | ✓ Mermaid node text "(Phase 31)" | Text-only line change (no Mermaid graph structure modification per D-22) |
| `decision-trees/07-ios-triage.md` | 72 | 72 | ✓ Routing Verification row | Text-only |
| `decision-trees/07-ios-triage.md` | 82 | 82 | ✓ How to Check row | Text-only |
| `decision-trees/07-ios-triage.md` | 89 | 89 | ✓ Escalation Data row | Text-only |
| `decision-trees/07-ios-triage.md` | 94 | 94 | ✓ Related Resources footer | Text-only |
| `ios-lifecycle/01-ade-lifecycle.md` | 364 | 364 | ✓ sysdiagnose reference | Text-only |
| `admin-setup-ios/06-compliance-policy.md` | 182 | 182 | ✓ full prose sentence | **Prose rewrite per D-23** (not substitution) |

**Note on D-23 prose rewrite target:** Line 182 currently reads `L2 diagnosis of a stuck compliance state requires Company Portal log upload, MDM diagnostic report from Intune admin center, or Mac+cable sysdiagnose (documented in Phase 31 L2 runbooks).` The D-23 rewrite text in CONTEXT is correct — executor uses CONTEXT D-23 verbatim.

**Risk:** If any Phase 30 30-08, 30-09, or 30-10 plan ships BEFORE Phase 31 (which is the declared order — Phase 30 is at 7/10 plans), line numbers in runbooks 16–21 or `07-ios-triage.md` COULD shift. Planner should enforce a pre-execution drift re-verification step in the Phase 31 validation harness (grep-based, see Validation Architecture below).

---

## Validation Architecture

**Status:** REQUIRED (nyquist_validation enabled in `.planning/config.json` — `workflow` object does not set `nyquist_validation: false`, so default enabled applies).

Runbooks are documentation artifacts; the "test framework" is **grep-based structural validation** that enforces the literal satisfaction requirements of SC #1–#4 and the D-22/D-23 retrofit contract.

### Test Framework

| Property | Value |
|----------|-------|
| Framework | Bash/Node grep-based checks + optional markdown-lint; runs under GitHub Actions or locally via `bash scripts/validation/check-phase-31.mjs` (scaffold in Wave 0 mirroring Phase 30 D-01 precedent) |
| Config file | None required — script is self-contained |
| Quick run command | `node scripts/validation/check-phase-31.mjs --quick` |
| Full suite command | `node scripts/validation/check-phase-31.mjs --full` |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| L2TS-01-a | 3-method decision matrix exists in `14-ios-log-collection.md` | structural | `grep -c "\| Method \|" docs/l2-runbooks/14-ios-log-collection.md` expects 1 table header + 3 data rows | ❌ Wave 0 |
| L2TS-01-b (SC #2) | Preamble "no iOS equivalent to `mdmdiagnosticstool.exe`" present | grep | `grep -q "no iOS equivalent to \`mdmdiagnosticstool\.exe\`" docs/l2-runbooks/14-ios-log-collection.md` | ❌ Wave 0 |
| L2TS-01-c (SC #1) | All 3 methods named in preamble: Company Portal upload + MDM diagnostic report + Mac+cable sysdiagnose | grep | `grep` for each of the 3 method names | ❌ Wave 0 |
| L2TS-02-ade-a (SC #3) | Runbook 15 has Pattern A, B, C, D sub-section headings | structural | `grep -E "^### Pattern [ABCD]:" docs/l2-runbooks/15-ios-ade-token-profile.md` expects 4 matches | ❌ Wave 0 |
| L2TS-02-ade-b (SC #3) | Each Pattern has indicators + resolution | structural | Per-Pattern sub-grep verifying both sections present | ❌ Wave 0 |
| L2TS-02-app (SC #4) | Runbook 16 uses all three class markers (⚙️ / ⏱️ / 🐛 OR `[CONFIG]` / `[TIMING]` / `[DEFECT]`) | grep | `grep -cE "(⚙️\|⏱️\|🐛\|CONFIG ERROR\|TIMING\|DEFECT)" docs/l2-runbooks/16-ios-app-install.md` expects > 6 matches | ❌ Wave 0 |
| L2TS-02-comp (SC #4) | Runbook 17 hybrid axis structure: "## Investigation by Axis" + "## Per-Cause Deep-Dive" + Cause A/B/C | structural | 3 grep checks | ❌ Wave 0 |
| D-20 | `00-index.md` injection: `## iOS L2 Runbooks` section exists after line 97 | structural | `grep -n "^## iOS L2 Runbooks" docs/l2-runbooks/00-index.md` expects 1 match at line > 97 | ❌ Wave 0 |
| D-20 | MAM advisory block present referencing `ADDTS-01` | grep | `grep -q "ADDTS-01" docs/l2-runbooks/00-index.md` | ❌ Wave 0 |
| D-22-retrofit-complete | Zero "(Phase 31)" placeholder strings remain in 9 retrofit targets | **link-graph audit** | `grep -rn "Phase 31" docs/l1-runbooks/ docs/decision-trees/07-ios-triage.md docs/ios-lifecycle/01-ade-lifecycle.md docs/admin-setup-ios/06-compliance-policy.md` expects 0 matches post-execution | existing files |
| D-22-target-specificity | Every retrofitted link resolves to a specific `14-17` runbook OR `00-index.md#ios-l2-runbooks` anchor, never a bare `00-index.md` | regex | Custom regex check: links must match `l2-runbooks/1[4-7]-` OR `00-index\.md#ios-l2` | existing files |
| D-23 | Line 182 of `06-compliance-policy.md` matches the D-23 rewritten text verbatim | structural | `sed -n '182p' docs/admin-setup-ios/06-compliance-policy.md \| diff - expected-d23.txt` | existing file |
| D-27 | L2 template `platform:` enum includes `iOS` | grep | `grep -q "platform: Windows \| macOS \| iOS \| all" docs/_templates/l2-template.md` | existing file |
| D-28 | Each of 4 new iOS L2 runbooks has `platform: iOS` frontmatter | grep | Per-file `grep -q "^platform: iOS" docs/l2-runbooks/1[4-7]-*.md` | ❌ Wave 0 |
| D-29 | Each of 4 new runbooks has the platform gate banner | structural | Per-file grep for exact banner text | ❌ Wave 0 |
| SC #3 GUID extraction | Runbook 15 has a Graph API preamble mentioning `DeviceManagementServiceConfig.Read.All` AND the GET endpoint AND the READ-ONLY boundary | grep | 3 sub-checks | ❌ Wave 0 |
| SC #4 three-class count | Runbook 16 "genuine defect" (🐛) paragraph has an escalation block with data-collection checklist | structural | Look for "Microsoft Support" heading + enumerated list within 20 lines | ❌ Wave 0 |

### Sampling Rate

- **Per task commit:** `node check-phase-31.mjs --quick` (runs preamble + frontmatter + banner checks; < 5 seconds; runs during every commit in Wave 1 and beyond)
- **Per wave merge:** `node check-phase-31.mjs --full` (all checks above; < 30 seconds)
- **Phase gate:** Full suite green + D-22 retrofit `grep "Phase 31"` returns 0 matches across the 9 retrofit targets + ad-hoc manual review of the 4 runbook markdown files for structural sensibility; all before `/gsd-verify-work`.

### Wave 0 Gaps

- [ ] `scripts/validation/check-phase-31.mjs` — validation harness (mirror Phase 30 30-01 scaffold structure)
- [ ] `.planning/phases/31-ios-l2-investigation/expected-d23.txt` — verbatim D-23 prose rewrite text
- [ ] Link-graph audit script — scan all L2 runbook cross-references, verify no broken anchors, verify every L1 retrofitted link points to a specific 14-17 target (not bare index)
- [ ] `.planning/phases/31-ios-l2-investigation/VALIDATION.md` — will be derived from this section by the planner downstream

*(All 4 new iOS L2 runbook files do not yet exist — they are Phase 31 deliverables. Wave 0 must create the validation harness BEFORE Wave 1 begins writing the runbooks, matching Phase 30 D-01 precedent.)*

---

## Security Domain

**Status:** `security_enforcement` not explicitly set in `.planning/config.json` (no `security_enforcement: false`). Default enabled applies. Runbooks are documentation; security surface is limited but non-zero.

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V2 Authentication | no | Runbooks do not implement auth flows; they reference existing Intune/ABM portal access controls |
| V3 Session Management | no | same reason |
| V4 Access Control | yes | Runbook 15 Prerequisites (D-10) enforces triple-portal access (ABM + Intune + Entra) — access control IS the L2 prerequisite, not a runbook-implemented control. Runbook MUST state which role/permission is required. |
| V5 Input Validation | no | No user input paths |
| V6 Cryptography | no | No hand-rolled crypto. APNs cert handling references the Microsoft-managed certificate lifecycle only. |
| V7 Error Handling / Logging | yes — partial | Sysdiagnose files contain **PII + device identifiers**. Runbook 14 MUST include a callout warning L2 that sysdiagnose contains private data and should be redacted or handled under the organization's data-handling policy before attaching to support tickets. |
| V8 Data Protection | yes | Company Portal log uploads are routed through Microsoft support infrastructure — runbook 14 MUST note the data-residency implication (logs leave tenant control and are stored by Microsoft for ticket-handling). |
| V14 Config | yes | Graph API permission scope `DeviceManagementServiceConfig.Read.All` is **tenant-wide read on service config**. Runbook 15 MUST note that an L2 with this scope can view ALL DEP tokens across the tenant — principle-of-least-privilege consideration. |

### Known Threat Patterns

| Pattern | STRIDE | Standard Mitigation |
|---------|--------|---------------------|
| Sysdiagnose PII leakage via ticket attachment | Information disclosure | Runbook 14 callout: redact PII from sysdiagnose before ticket attachment; follow org data-handling policy |
| Company Portal log routing through Microsoft backend | Information disclosure | Documented data-flow statement in Runbook 14 Tier 2 section |
| Over-privileged Graph read scope for L2 | Elevation of privilege | Runbook 15 noting scope is tenant-wide; prefer delegated (user-context) over application (service-principal) credentials for L2 ad-hoc investigation |

---

## Project Constraints (from CLAUDE.md)

CLAUDE.md primarily describes the *Windows Autopilot Troubleshooter* codebase (PowerShell modules + FastAPI backend + React frontend) which is **not relevant to this documentation-only phase**. The following CLAUDE.md directives DO apply:

- **Security Notes:** Never commit `.env` files or credentials. All remediation actions require explicit user confirmation. — **Applicable:** Runbooks must not hardcode tenant IDs, Apple IDs, or other tenant-identifying data in example text; use `{placeholder}` syntax.
- **Testing Strategy — 80%+ coverage:** Not applicable to documentation phases. Supplanted by structural grep coverage in Validation Architecture above.
- **Documentation policy:** Project prefers documented concepts and outcomes over click-path walkthroughs (from REQUIREMENTS.md Out-of-Scope row). — **Applicable:** Runbook 14 UI paths for Intune admin center are necessarily click-paths but should emphasize the *artifact* produced (bundle vs incident ID vs on-device screenshot) rather than exhaustive screenshot chains.

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | Sysdiagnose hold duration is 1–1.5 seconds (not 250ms as one community PDF claims) | D-30 | Low — user gets Emergency SOS prompt if wrong; easy to retry |
| A2 | Company Portal log retrieval is ticket-based for iOS (not self-service) | D-32 | Medium — if Microsoft shipped self-service download for iOS in Q1 2026, runbook 14 "Typical Latency" column would overstate friction; D-01 Tier 2→3 escalation signal would need updating |
| A3 | The project's 30-minute first-evaluation window claim matches field observation (Microsoft Learn does not publish the specific number) | D-35 | Low — claim is inherited from locked Phase 28 D-11 doc and user-verified in field |
| A4 | `admin-setup-ios/06-compliance-policy.md` anchor `#compliance-evaluation-timing-and-conditional-access` is the locked Phase 28 anchor (not `#ca-timing` or similar) | Runbook 17 sub-section cross-links | Low — grep check confirms anchor string present at line 149; verified |
| A5 | iOS 17 DDM did NOT change the supervision-vs-silent-install boundary (Apple's "distribute managed apps" doc is authoritative) | D-34 | Low — HIGH confidence from Apple Support doc; would require contradicting Apple Support to disprove |
| A6 | `lastModifiedDateTime` on depOnboardingSetting reflects token-rotation events (inferred from Graph property semantics) | D-33 / Pattern D | Low — property is well-defined; field interpretation is consistent with "When the service was onboarded" description |

---

## Open Questions for Planner (RESOLVED)

All five questions below were addressed during planning. Each carries an inline **RESOLVED** disposition citing the enacting plan/task.

1. **Sysdiagnose retrieval without Mac: is AirDrop-to-colleague-PC practical?**
   - What we know: AirDrop from iOS to macOS is standard; AirDrop from iOS to Windows requires third-party software.
   - What's unclear: Does the organization have a BYOD-friendly fallback for teams without Mac hardware?
   - Recommendation: Runbook 14 Tier 3 scope statement should explicitly state "requires a Mac" and defer to "escalate if no Mac available — treat as Tier 3 blocked" rather than documenting Windows workarounds (out of scope per REQUIREMENTS Out-of-Scope — "iOS vs iPadOS separate guides").
   - **RESOLVED:** plan 02 Task 2 Tier 3 Prerequisites documents "Mac required" (no Windows workaround per REQUIREMENTS Out-of-Scope — "iOS vs iPadOS separate guides").

2. **Emoji policy for ⚙️/⏱️/🐛 markers in runbook 16:**
   - What we know: CONTEXT D-12 specifies emoji markers with text fallback.
   - What's unclear: Project has shipped 13 L1 runbooks in Phase 30 — need to audit whether they use emoji (especially 🔒 Supervised only from Phase 27).
   - Recommendation: Planner confirms emoji conformance at plan time by grepping existing L1/L2 runbooks for emoji presence; if project standard is emoji-allowed, use `⚙️/⏱️/🐛`; if ambiguous, use `[CONFIG] / [TIMING] / [DEFECT]` text markers for grep-clarity.
   - **RESOLVED:** plan 01 Task 1 locks TEXT markers `[CONFIG]` / `[TIMING]` / `[DEFECT]` in `placeholder-inventory.json._note`; grep of existing L1/L2 runbooks returned 0 emoji matches; plan 04 runbook + V-31-11 harness regex both enforce text markers.

3. **ADE token rotation history — is a Change Log alternative available?**
   - What we know: No dedicated Graph endpoint for token rotation history; only `lastModifiedDateTime` snapshot.
   - What's unclear: Does Intune ship a tenant-level audit log that records DEP token uploads? (Intune Audit logs via `/deviceManagement/auditEvents` may surface this.)
   - Recommendation: Runbook 15 Pattern D can cite the Intune audit log as a secondary source if needed, but this expands scope beyond D-08 "one indicator" limit. Planner should confirm the single-GET-supplement boundary stays firm.
   - **RESOLVED:** plan 03 stays within D-08 one-indicator boundary (Graph GET only); Intune audit log supplement deferred to post-Phase-31 to preserve scope discipline.

4. **Verification of 4 MB / 50-file cap on iOS App Protection diagnostics download:**
   - What we know: Microsoft Learn explicitly documents this cap.
   - What's unclear: Is this cap TENANT-wide across all iOS diagnostics uploads OR per-user per-diagnostic-request?
   - Recommendation: Runbook 14 Tier 1 notes the cap as a limit without over-specifying. If field-observed behavior differs, flag for content correction in v1.4.
   - **RESOLVED:** plan 02 Task 1 documents the 4 MB / 50-file cap as-stated by Microsoft Learn; field-verification of tenant-vs-per-user scope deferred to post-Phase-31 if observed variance emerges.

5. **Line-drift risk if Phase 30 ships 30-08 through 30-10 before Phase 31 plan finalization:**
   - What we know: Phase 30 is at 7/10 plans; 30-08/09/10 involve substantial changes to navigation + admin-setup-ios retrofits.
   - What's unclear: Will Phase 30 30-09 (9-file admin-setup-ios retrofit) touch line 182 of `06-compliance-policy.md`? If it modifies the prose around that line, the D-23 anchor line number shifts.
   - Recommendation: Add Phase 31 Wave 0 pre-flight check: re-run `grep -n "Phase 31" docs/...` and compare against D-22 table; if drift detected, planner re-enumerates per D-26 before Wave 1 executes.
   - **RESOLVED:** plan 07 Tasks 1/2/3 each include a Step 0 pre-flight `grep -n "Phase 31"` re-verification against `placeholder-inventory.json`; drift triggers per-D-26 re-enumeration before retrofit.

---

## Sources

### Primary (HIGH confidence)

- [Microsoft Learn — Remote Device Action: Collect Diagnostics](https://learn.microsoft.com/en-us/intune/device-management/actions/collect-diagnostics) (updated 2026-04-16) — D-31 UI path + App Protection scoping
- [Microsoft Learn — Report problems in Company Portal app for iOS](https://learn.microsoft.com/en-us/intune/intune-service/user-help/send-logs-to-microsoft-ios) (updated 2026-04-08) — D-32 send-logs UI
- [Microsoft Learn — depOnboardingSetting resource type](https://learn.microsoft.com/en-us/graph/api/resources/intune-enrollment-deponboardingsetting?view=graph-rest-beta) (updated 2026-01-08) — D-33 resource
- [Microsoft Learn — Get depOnboardingSetting](https://learn.microsoft.com/en-us/graph/api/intune-enrollment-deponboardingsetting-get?view=graph-rest-beta) (updated 2026-03-17) — D-33 endpoint + permissions
- [Microsoft Learn — List depOnboardingSettings](https://learn.microsoft.com/en-us/graph/api/intune-enrollment-deponboardingsetting-list?view=graph-rest-beta) (updated 2026-03-17) — D-33 list endpoint
- [Microsoft Learn — Turn on iOS/iPadOS supervised mode](https://learn.microsoft.com/en-us/intune/intune-service/enrollment/device-supervised-mode) (updated 2026-04-16) — D-34
- [Microsoft Learn — Device compliance policies in Microsoft Intune](https://learn.microsoft.com/en-us/intune/intune-service/protect/device-compliance-get-started) (updated 2026-04-16) — D-35 "Mark devices with no compliance policy assigned as" authoritative description
- [Microsoft Learn — Manage Apple Volume-Purchased Apps](https://learn.microsoft.com/en-us/intune/intune-service/apps/vpp-apps-ios) — VPP licensing + silent install supervision tie-in
- [Apple Support — Distribute managed apps to Apple devices](https://support.apple.com/guide/deployment/distribute-managed-apps-dep575bfed86/web) (2026-02-11) — D-34 authoritative statement "On supervised devices, apps are installed silently"
- [Microsoft Learn — Troubleshooting iOS/iPadOS device enrollment errors](https://learn.microsoft.com/en-us/troubleshoot/mem/intune/device-enrollment/troubleshoot-ios-enrollment-errors) — Pattern A/D indicators
- [Microsoft Learn — Apple ADE devices don't start auto-enrollment in Intune](https://learn.microsoft.com/en-us/troubleshoot/mem/intune/device-enrollment/apple-dep-device-fails-auto-enrollment) — Pattern C/D cross-reference

### Secondary (MEDIUM confidence — community vendor docs for sysdiagnose where Apple does not publish canonical single-page reference)

- [Apple Developer Forums — thread 80811 "how to trigger sysdiagnose on iOS"](https://developer.apple.com/forums/thread/80811)
- [Apple Developer Forums — thread 99634 "how to trigger sysdiagnose on iPhone"](https://developer.apple.com/forums/thread/99634)
- [Apple IT Training — Using Sysdiagnose on iPhone or iPad](https://it-training.apple.com/support/tutorials/course/sup270/) — Apple-published IT training material (HIGH confidence on content, MEDIUM on currency — lack of visible update date)
- [Addigy — Gathering a Sysdiagnose from an iPadOS or iOS device](https://support.addigy.com/hc/en-us/articles/15849050849427-Gathering-a-Sysdiagnose-from-an-iPadOS-or-iOS-device)
- [Cisco Umbrella — Capture a Sysdiagnose from an iOS Device](https://www.cisco.com/c/en/us/support/docs/security/umbrella/224720-capture-a-sysdiagnose-from-an-ios.html)
- [GitHub Gist — How to trigger a sysdiagnose on iOS (danieleggert)](https://gist.github.com/danieleggert/587a4b5179cbd38492729e8808693cbe)

### Tertiary (LOW confidence — community ecosystem references used for verification only, never as sole source)

- [HTMD Blog — How to Collect Intune Logs from iOS Device Company Portal](https://www.anoopcnair.com/how-to-collect-intune-logs-from-ios-device/) — confirms ticket-based backend retrieval for iOS Company Portal logs
- [Symphony Help Center — Capture iOS Intune Company Portal and Intune logs](https://support.symphony.com/hc/en-us/articles/44238431865236) — MAM diagnostics confirmation

### Project canonical sources (LOCKED — treat as HIGH)

- `docs/admin-setup-ios/06-compliance-policy.md` §Compliance Evaluation Timing and Conditional Access (lines 149–199) — authoritative for project's 30-minute first-evaluation window claim; D-35 cross-reference target
- `docs/ios-lifecycle/01-ade-lifecycle.md` lines 355–373 — authoritative for "no CLI on iOS" framing + MDM diagnostic report on-device retrieval path + APNs single-channel reasoning
- `docs/l2-runbooks/10-13-*.md` — structural templates for 14-17

## Metadata

**Confidence breakdown:**
- Sysdiagnose procedure (D-30): HIGH (modern unified trigger) + MEDIUM (Mac+cable Console.app retrieval — Apple does not publish a canonical single-page retrieval guide)
- MDM diagnostic UI path (D-31): HIGH (authoritative Microsoft Learn article dated 2026-04-16; revealed MAM scoping for iOS)
- Company Portal log flow (D-32): HIGH (Microsoft Learn article 2026-04-08)
- Graph API for token (D-33): HIGH (3 Microsoft Learn pages cross-verified)
- Supervision boundary (D-34): HIGH (Apple Support + Microsoft Learn both authoritative)
- Default compliance + "Not evaluated" (D-35): HIGH (Microsoft Learn + project canonical)
- Pattern A-D substance: HIGH for A/B/D, MEDIUM for C (ADE network-path issues are field-common but Microsoft Learn aggregates symptoms rather than enumerating Pattern C specifically)
- Runbook 16 failure class mapping: HIGH
- Runbook 17 sub-section substance: HIGH (anchor target line 149 verified; text already in project canonical)
- Placeholder line-anchor drift: HIGH — verified via grep in working tree on research date

**Research date:** 2026-04-17
**Valid until:** 2026-07-17 (90 days; stable documentation domain with quarterly Intune UI churn cadence — re-verify D-31 at 3-month mark)

## RESEARCH COMPLETE
