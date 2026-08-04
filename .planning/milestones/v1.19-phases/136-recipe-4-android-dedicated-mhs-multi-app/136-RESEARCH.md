# Phase 136: Recipe #4 — Android Dedicated, MHS Multi-App - Research

**Researched:** 2026-08-03
**Domain:** Microsoft Intune / Android Enterprise Managed Home Screen (MHS) app-configuration surface — first-party spot-verification for HYG-06 + the worked JSON payload envelope + the MHS app-deployment click-path (SC1)
**Confidence:** HIGH for everything quoted from a live 2026-08-03 fetch below; MEDIUM/NOT-FOUND explicitly flagged where the live source itself is silent or internally ambiguous.

<user_constraints>
## User Constraints (from CONTEXT.md)

136-CONTEXT.md locks ~45 implementation decisions across Area 0 (cross-cutting) and Areas 1–4 (MHS payload, fork taxonomy, tables/C17, anchor/Rollback/identity/HYG-06), validated through three `/adversarial-review` rounds (27 → 23 → 13 confirmed defects). **This research does not re-litigate any of them.** The full decision set is in `136-CONTEXT.md` `<decisions>` and is NOT reproduced here — the planner must read that file directly. This RESEARCH.md supplies only the external first-party material CONTEXT identified as still needed: the HYG-06 spot-verification, the D1.1/D1.5 source-conflict resolution attempt, the D2.7 sibling key, the SC1 click-paths, the JSON payload envelope, and the D1.8 designer-label gaps.

**Two surviving Plan-1-gated conditionals (D4.7):**
1. D1.1/D1.5 — whether `exit_lock_task_mode_code` ships in the fence (with placeholder) or is absent with a Device-Restrictions prose pointer.
2. D2.7 — whether the sign-in-side `max_number_of_attempts_*` sibling key can be named.

**This research's verdict on both, in brief (full detail in the numbered findings below):**
1. **Genuinely ambiguous on current Learn — do not force a clean resolution.** The live MHS-config page is internally self-contradictory today (see Finding 2). Recommend: ship the key in the fence with a placeholder (the `05:253` branch) **plus** an adjacent one-line callout carrying the Note's own caveat, rather than picking one side and hiding the other.
2. **Resolved — found, HIGH confidence.** `max_number_of_attempts_for_session_PIN` ("Maximum number of attempts for session PIN"). D2.7's conditional closes; MHS-04's "opposite gates" claim is verbatim-confirmed. It stays OUT of the fence (sign-in-gated, inert under `enable_mhs_signin: false`, same category as D3.3's other excluded sign-in sub-keys) but is now fully sourced for the contrastive prose.

**Claude's Discretion (from CONTEXT.md, unchanged, listed for completeness):** exact prose wording; whether M-A lands as an anti-feature row or lead-in sentence; which of D2.9a's two resolutions to take; the concrete worked values in the payload beyond the bounded key set; which failures rows route to a real runbook vs. an in-recipe anchor.

**Deferred Ideas (from CONTEXT.md, out of scope, listed for completeness):** Option B shared taxonomy Reference doc; the anchor's past-due `review_by`; the `c17-eee-contract.mjs:150→:158` coordinate correction; the second Rollback/Recovery template-divergence trigger; `ANDROID-APPDEPLOY-01`; RCPFUT-04/05; a mechanical `[SRC]` re-resolution script.
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| MHS-01 | Linear happy-path + inlined MHS app-deployment step with concrete click-path | Finding 4 supplies the exact, dated click-path for both the app-Required-assignment step and the App Configuration policy creation+assignment step |
| MHS-02 | Case-1 token-type block (irreversible) + exit-PIN sync `[MEDIUM]` unchanged | Finding 1 Cluster A (token semantics, no drift) and Finding 1 Cluster C (sync requirement — confirms the `[MEDIUM]` tag must stay, no first-party source found today either) |
| MHS-03 | Case-2 sign-in block (`enable_mhs_signin`/`signin_type` defaults + account-type negative) | Finding 1 (defaults confirmed verbatim, no drift) |
| MHS-04 | Exit-lock-task hardening, silent no-op dependency, no-unit retry-delay, sibling key | Finding 1 (no-unit confirmed) + Finding 3 (sibling key found, D2.7 closes) |
| MHS-05 | Anti-feature set with reasons (Notification windows, folders, Wi-Fi, nav bypass) | Finding 1 Cluster C fetch of the device-restrictions page confirms the Notification-windows/Overlay dependency verbatim |
| HYG-06 | Spot-verify `05:116-131`, `05:143-153`, `05:249-255` + MHS defaults/retry-keys/sibling against current Learn | Finding 1 (all three clusters + the PLUS list), with per-cluster drift/no-drift disposition and fetch dates |
</phase_requirements>

## Summary

Six live Microsoft Learn pages were fetched on 2026-08-03 (all reachable, all dated `updated_at` between 2026-06-22 and 2026-07-22 — none has changed since the milestone's original 2026-07-25 research pass). Every HYG-06 SC6 cluster comes back **NO DRIFT**: token-type semantics, MHS Required-assignment mechanics, and the exit-PIN two-policy-location facts all match `05-dedicated-devices.md` in substance. The exit-PIN dual-policy **synchronization requirement itself** still has **no first-party Learn source** on this pass either — MHS-02's `[MEDIUM: MS Q&A community]` tag is correctly unrevisable, confirmed by a third independent search.

The two Plan-1-gated conditionals resolve unevenly. D2.7's sibling key is now fully sourced: `max_number_of_attempts_for_session_PIN` ("Maximum number of attempts for session PIN"), with the exact "opposite gates" MHS-04 asserts confirmed verbatim. D1.1/D1.5's `exit_lock_task_mode_code` location question does **not** resolve cleanly — the live MHS-config page is internally self-contradictory: a setting-specific prose Note says the password "must be configured through a device configuration profile," while the same page's own worked JSON example includes the identical key as a directly settable value inside the MHS app-config JSON. Both statements are on the same page, fetched the same day. This is reported as a genuine open finding, not forced to a side.

The single highest-value discovery for the planner is the **JSON envelope shape** itself: Intune's "Enter JSON Data" editor for an Android app configuration policy is **not** a flat `{key: value}` object. It is `{"kind": "androidenterprise#managedConfiguration", "productId": "app:<package>", "managedProperty": [{"key": ..., "valueBool"|"valueString"|"valueInteger"|"valueBundleArray": ...}, ...]}` — confirmed via Microsoft's own full worked example on the MHS configuration page. No repo source previously established this (CONTEXT.md D1.2/D1.5 both note the envelope is unestablished); this closes that gap with a HIGH-confidence, dated, verbatim-quoted source.

The MHS app-deployment click-path (SC1's genuinely-new-content clause) is fully sourced with two distinct, confirmed wizard sequences: assigning the already-MGP-auto-added MHS app as Required to a device group, and creating + assigning the separate MHS App Configuration policy via `Apps > Configuration > Create > Managed devices`.

**Primary recommendation:** Ship the worked payload in the confirmed `kind`/`productId`/`managedProperty` envelope (Finding 5); resolve D1.1/D1.5 by shipping `exit_lock_task_mode_code` in the fence with a placeholder **and** an adjacent callout carrying the Note's caveat (Finding 2); close D2.7 outright using `max_number_of_attempts_for_session_PIN` (Finding 3); use the two confirmed click-path sequences verbatim for the MHS-01 app-deployment step (Finding 4).

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| MHS app assignment (Required) | External System (Intune admin center / Managed Google Play) | Documentation Corpus (recipe records the click-path) | The action itself happens in Intune; the recipe is a durable record of the click-path, not the executor |
| MHS App Configuration policy (JSON payload) | External System (Intune admin center) | Documentation Corpus | Same — the JSON is authored and pasted into Intune's own editor; the recipe supplies the worked, reproducible artifact |
| Exit-PIN dual-policy sync | External System (Device Restrictions profile + MHS App Config policy, two separate Intune blades) | Documentation Corpus (cross-link only, per delta discipline) | Two independent Intune policy surfaces must carry matching values; RE-225 does not own either surface's mechanics, only the cross-link and the hardening delta |
| Enrollment profile / token type | External System (Intune Android enrollment) | Documentation Corpus (routing cross-link only) | Owned entirely by `05-dedicated-devices.md`; RE-225 is a confirm-and-route step, never a worked branch |
| Recipe content itself | Documentation Corpus (`docs/recipes/04-*.md`) | — | This phase's actual deliverable — Markdown authored against the EEE-SOP-standard.md / C17 gate |

This phase produces zero application code and zero runtime services — the "architecture" is entirely document-corpus placement (already resolved by CONTEXT D1.1–D4.9) plus the external Intune configuration surface the recipe documents. No browser/API/database tiers apply.

## Standard Stack

Not a software stack — this phase documents Microsoft-owned configuration surfaces. No packages are installed; the "Package Legitimacy Audit" section is Not Applicable and is omitted below per the protocol's own trigger condition ("whenever this phase installs external packages" — it does not).

### External Configuration Surfaces (verified this session, 2026-08-03)

| Surface | Path in Intune Admin Center | Purpose | Source |
|---|---|---|---|
| MHS App Configuration policy | Apps > Configuration > Create > Managed devices > Platform: Android Enterprise > Targeted app: Managed Home Screen | The worked JSON payload's destination | [VERIFIED: learn.microsoft.com/en-us/intune/intune-service/apps/app-configuration-policies-use-android, fetched 2026-08-03] |
| MHS app Required assignment | Apps > All apps > Managed Home Screen > Properties > Edit (Assignments) > Required > Add group | SC1's inlined app-deployment step | [VERIFIED: learn.microsoft.com/en-us/intune/app-management/deployment/add-managed-google-play, fetched 2026-08-03] |
| Device Restrictions profile (exit-PIN half) | Devices > Configuration > Create profile > Android Enterprise > Fully managed, dedicated, and corporate-owned work profile — Device restrictions > Corporate-owned > Device experience | Leave kiosk mode / Leave kiosk mode code | [VERIFIED: learn.microsoft.com/en-us/intune/device-configuration/templates/ref-device-restrictions-android-enterprise, fetched 2026-08-03] — matches `05:251` exactly, already cross-linked by the anchor, RE-225 does not re-author this |

## Numbered Findings

### Finding 1 — HYG-06 spot-verification (three SC6 clusters + the PLUS list)

All fetches performed 2026-08-03. Page freshness dates given for each; none of the six pages fetched this session has an `updated_at` later than 2026-07-22 — i.e., **nothing has changed on any of these pages since the milestone's original 2026-07-25 research pass.** This is itself a data point: it means Finding 1's "no drift" verdicts are not merely "no drift since the anchor's `last_verified`" but also "no drift since the milestone's own most recent check."

#### Cluster A — Token-type semantics (`05:116-131`)

**Source:** `learn.microsoft.com/en-us/intune/device-enrollment/android/setup-dedicated` — `ms.date: 2025-05-08`, `updated_at: 2026-07-01`. [VERIFIED: fetched 2026-08-03]

Verbatim:
> "**Corporate-owned dedicated device (default)**: This token enrolls devices as a standard Android Enterprise dedicated device. These devices require no user credentials at any point. This is the default token type that dedicated devices will enroll with unless updated by Admin at time of token creation."

> "**Corporate-owned dedicated device with Microsoft Entra ID shared mode**: This token enrolls devices as a standard Android Enterprise dedicated device and, during enrollment, deploys Microsoft's Authenticator app configured into Microsoft Entra shared device mode. With this option, users can achieve single sign-in and single sign-out across apps on the device that are integrated with the Microsoft Entra Microsoft Authentication Library and global sign-in/sign-out calls."

**Disposition: NO DRIFT.** Both token names and their core semantics (Standard = no per-user credentials; SDM = auto-configured Entra shared device mode, cross-app SSO) match `05:120-121` in substance.

**New-but-not-contradicting detail:** the fetched page states Authenticator + Company Portal auto-install specifically for the SDM token — *"Microsoft Authenticator and Company Portal will be automatically installed during enrollment of a dedicated device when using the token type Corporate-owned dedicated device with Microsoft Entra ID shared mode."* The anchor doesn't currently state this. Not a contradiction, not required by any locked decision (D2.4 routes SDM to the anchor without re-deriving content) — flag only, no action required in RE-225.

**Token expiry:** *"Token expiration date: Enter the date you want the token to expire, up to 65 years in the future."* No "never expires" option is shown in the field description. **Confirms** the anchor's `[MEDIUM: no MS Learn statement on default]`-tagged claim that both Dedicated token types require an expiry with no never-expires option — this doesn't upgrade the anchor's own tag (that's an authoring call, not this research's to make), but it is corroborating, not contradicting.

**Irreversibility / revoke-recreate-redistribute cost (`05:123`, `05:129`):** **NOT independently re-confirmed on this pass.** The fetched page documents Replace/Revoke/Export token actions but does not use the word "irreversible" and does not describe a field-QR-redistribution cost. This claim should remain under the anchor's existing `[MEDIUM: MS Learn setup dedicated, last_verified 2026-04-22]` tag at `05:114` — no drift, no basis to upgrade.

#### Cluster B — MHS Required-assignment (`05:143-153`)

**Sources:** `setup-dedicated` (above) + `learn.microsoft.com/en-us/intune/app-management/deployment/add-managed-google-play` — `ms.date: 2026-04-23`, `updated_at: 2026-06-22`. [VERIFIED: fetched 2026-08-03]

Verbatim (general rule, `setup-dedicated`):
> "Only apps that have assignment type [set to Required](../../app-management/deployment/assign-groups#assign-an-app) can be installed on Android Enterprise dedicated devices."

Verbatim (MHS-specific, `add-managed-google-play`):
> "**Managed Home Screen** - Used for both Android Enterprise dedicated multi-app kiosk and fully managed user affiliated device scenarios. IT admins should create an assignment to install this app on dedicated devices that are going to be used in multi-app kiosk scenarios."

**Disposition: NO DRIFT.** The general "Required-only installs on Dedicated devices" rule is broader than, and consistent with, `05:145`'s "MUST be assigned as Required" claim. **Not independently re-sourced on this pass:** the specific consequence "device boots to the standard Android launcher instead of MHS" (`05:145`'s second sentence) — neither page states this fallback behavior explicitly. This remains the anchor's own unchallenged claim; no drift, no contradiction found either.

#### Cluster C — Exit-PIN two-policy locations (`05:249-255`)

**Sources:** `learn.microsoft.com/en-us/intune/device-configuration/templates/ref-device-restrictions-android-enterprise` — `ms.date: 2026-04-21`, `updated_at: 2026-07-22` (freshest page fetched this session) + `configure-managed-home-screen` (below, Finding 2). [VERIFIED: fetched 2026-08-03]

Verbatim (Device Restrictions profile side):
> "**Leave kiosk mode**: **Enable** allows Administrators to temporarily pause kiosk mode to update the device. To use this feature, the administrator: 1. Continues to select the back button until the **Exit kiosk** button shows. 2. Selects the **Exit kiosk** button, and enters the **Leave kiosk mode code** PIN. 3. When finished, select the **Managed Home Screen** app. This step relocks the device into multi-app kiosk mode."

> "**Leave kiosk mode code**: Enter a 4-6 digit numeric PIN. The administrator uses this PIN to temporarily pause kiosk mode."

**Disposition: NO DRIFT.** GUI labels and behavior match `05:251` exactly.

**Cross-reference statement found** (same page): *"Some of the Managed Home Screen settings are available in a device restrictions policy. To view and use all the available settings for the Managed Home Screen, create a [Managed Home Screen app configuration policy](../../app-management/configuration/configure-managed-home-screen)."* This is a pointer between the two surfaces, but **it is not a "the two PIN values must match" statement.**

**The synchronization requirement itself — still no first-party source, confirmed on a THIRD independent search.** Neither fetched page (this one, nor `configure-managed-home-screen` below) states that the Device Restrictions PIN and the MHS App Configuration PIN must carry identical values. **MHS-02's `[MEDIUM: MS Q&A community]` tag is correctly un-upgradeable — ship it unchanged, refresh only the date.** This is the third independent research pass (original v1.19 research 2026-07-25, this session's PITFALLS.md review, and this live fetch 2026-08-03) to fail to find first-party corroboration — the gap is stable, not merely unresearched.

#### PLUS list — `enable_mhs_signin`/`signin_type` defaults, the two exit-PIN retry keys, D2.7's sibling

**Source:** `learn.microsoft.com/en-us/intune/app-management/configuration/configure-managed-home-screen` — `ms.date: 2026-04-21`, `updated_at: 2026-06-22`. [VERIFIED: fetched 2026-08-03]

`enable_mhs_signin` default — verbatim:
> "**Enable sign in** | bool | **FALSE** | Turn this setting to True to enable end users to sign in to Managed Home Screen. ... By default this setting is off."

`signin_type` default — verbatim:
> "**Sign in type** | string | **Microsoft Entra ID** | Set this configuration to 'Microsoft Entra ID' to sign in with a Microsoft Entra account. Otherwise, set it to 'Other.' Users who sign in with a non-Microsoft Entra ID account don't get single sign-on to all apps integrated with Microsoft Entra shared device mode, but they still sign in to Managed Home Screen. By default, this setting uses 'Microsoft Entra ID' user accounts. This setting can only be used if **Enable sign in** is set to True."

**Disposition: NO DRIFT.** This is a word-for-word match for D2.5's own quoted text and MHS-03's account-type negative. **Load-bearing spelling note:** the JSON `valueString` for this setting in Microsoft's own worked example is `"AAD"`, not `"Microsoft Entra ID"` (see Finding 5) — the Configuration Designer default label and the raw JSON value differ. `signin_type` is OUT of the bounded payload per D3.3 regardless, so this only matters if a future anti-feature-row JSON snippet ever shows the key.

Exit-PIN retry keys — verbatim:
> "**Maximum number of attempts to exit lock task mode** | integer | 0 | Set the maximum number of attempts a user is allowed to make before getting blocked from attempting to exit lock task mode. If set to 0, user is never blocked from attempting to exit lock task mode. This setting can only be used if **Exit lock task mode password** is configured. **Time before exit lock task mode password can be retried** must be set to utilize this setting."

> "**Time before exit lock task password can be retried** | integer | 0 | Set the time before a user can retry exiting lock task mode after reaching the maximum number of attempts. If set to 0, user is never blocked from retrying. This setting can only be used if **Exit lock task mode password** is configured."

**Disposition: NO DRIFT — and confirms MHS-04's no-unit claim exactly.** No unit ("seconds", "minutes") is stated for the retry-delay integer, in contrast to sibling timers on the same page which explicitly say "in seconds" (e.g., `Screen saver show time`, `Auto sign out time`). **Note the label-spelling inconsistency, worth carrying into the recipe verbatim rather than silently normalizing:** the *max-attempts* row's label says "exit lock task **mode**" while the *retry-delay* row's label drops "mode" — "Time before exit lock task **password** can be retried" (verbatim, exactly as published; not a transcription error on this research's part).

### Finding 2 — D1.1/D1.5's source conflict: genuinely ambiguous, not cleanly resolvable

**Source:** `configure-managed-home-screen` (as above). [VERIFIED: fetched 2026-08-03]

Two statements on the **same live page, fetched the same day**, are in direct tension:

**Statement A** (Configuration Designer table, "Configurations to help with troubleshooting issues on the device"):
> "**Exit lock task mode password** | string | *(blank default)* | Enter a 4-6-digit code to use to temporarily drop out of lock-task mode for troubleshooting. **Note**: This password must be configured through a device configuration profile. Once the password is set, its value is obfuscated and can't be viewed again. To rotate or change the password, configure a new value in the device configuration profile."

**Statement B** ("JSON Data Examples" — Microsoft's own worked sample, described as *"an example JSON script with all the available configuration keys included"*):
```json
{
    "key": "exit_lock_task_mode_code",
    "valueString": "123456"
}
```
— present as a directly-settable `managedProperty` entry inside the **MHS App Configuration policy's own JSON payload.**

**These cannot both be taken as a clean "yes" or "no" to D1.5's binary branch question.** Statement A is setting-specific, uses directive language ("must be configured through"), and appears nowhere else in the ~50-row settings tables with this phrasing. Statement B is Microsoft's own live, current, worked example showing the identical key as valid, settable JSON in this exact policy type.

**Resolution attempt (not fully successful — reported honestly per instructions):**
- `05:249-255`'s own framing ("requires configuration in two separate Intune policies") is **not falsified by either reading** — both statements are consistent with the PIN needing to exist on both surfaces.
- Statement A most plausibly means: even though the JSON schema accepts the key, **setting it meaningfully / having it take effect requires the value to also exist in the Device Restrictions profile** — i.e., Statement A is not saying "the MHS JSON key is nonfunctional," it's saying "the authoritative configuration point is the device profile." This reading is *consistent* with, not contradictory to, Statement B.
- Given this, the closer-to-defensible position is that **`05:253`'s framing (the setting exists as a field inside the MHS App Configuration policy) is not wrong** — Microsoft's own worked JSON confirms the key is real and settable there — **but `STACK.md:55`'s "(device-restrictions-profile only)" parenthetical, read as an exclusivity claim, is contradicted** by Statement B.

**Recommendation for Plan 1 (not a unilateral override — Plan 1 still makes the final call per D4.7):** Take the `05:253`-confirmed branch of D1.5 — ship `exit_lock_task_mode_code` in the fence with a placeholder value — **and** add a one-line callout immediately adjacent carrying Statement A's own caveat verbatim in spirit (e.g., *"Microsoft Learn's own field description states this password 'must be configured through a device configuration profile' — set the matching value in the Device Restrictions profile per the cross-linked sync requirement; do not rely on this JSON entry alone."*). This satisfies D1.5's placeholder-plus-cross-link shape while not silently dropping Statement A's caveat, and it does not contradict `05:249-255`'s "two separate policies" framing either way.

If Plan 1 judges this too uncertain to ship as a positive claim, the STACK.md:55 branch (key absent, prose pointer only) remains fully available and equally defensible — this research cannot make that call with certainty and does not attempt to.

### Finding 3 — D2.7's sibling key: found, HIGH confidence, conditional closes

**Source:** `configure-managed-home-screen`, Configuration Designer table + JSON worked example. [VERIFIED: fetched 2026-08-03]

**Sibling key: `max_number_of_attempts_for_session_PIN`.** Designer label: **"Maximum number of attempts for session PIN."**

Verbatim:
> "**Maximum number of attempts for session PIN** | string | | Define the maximum number of times a user can attempt to enter their session PIN before getting automatically logged out from Managed Home Screen. The default value is zero (0), where zero (0) means the user gets infinite tries. This setting can be used with any of the complexity values for session PIN. This setting can only be used if **Enable session PIN** and **Enable sign in** is set to True."

JSON key spelling (from the live worked example): `"key": "max_number_of_attempts_for_session_PIN"`.

**MHS-04's "opposite gates, different consequences" claim is confirmed verbatim:**

| | `max_number_of_attempts_for_exit_PIN` | `max_number_of_attempts_for_session_PIN` |
|---|---|---|
| Gate | *"This setting can only be used if **Exit lock task mode password** is configured"* | *"This setting can only be used if **Enable session PIN** and **Enable sign in** is set to True"* |
| Consequence | *"getting blocked from attempting to exit lock task mode"* | *"getting automatically logged out from Managed Home Screen"* |

**Disposition: D2.7 conditional CLOSES.** No softening of the framing is required — the sibling is fully sourced. Per D3.3's own OUT-list logic, `max_number_of_attempts_for_session_PIN` stays **out of the payload fence** (it's a sign-in-sub-key, inert under RE-225's worked `enable_mhs_signin: false`, same category as the other sign-in-only keys D3.3 already excludes) — but it is now available, fully cited, for the MHS-04 contrastive prose naming both settings by their exact GUI labels and JSON keys.

### Finding 4 — The MHS app-deployment click-path (SC1)

Two distinct Intune surfaces, two distinct wizards. Both confirmed via live, dated fetches 2026-08-03.

#### (a) Assign the MHS app as Required to a device group

**Source:** `learn.microsoft.com/en-us/intune/app-management/deployment/add-managed-google-play` — `ms.date: 2026-04-23`, `updated_at: 2026-06-22`. [VERIFIED: fetched 2026-08-03]

**Key precedent-changing fact: MHS does not need a "Create/Add" step.** It is one of five apps Intune auto-adds to `Apps > All apps` the moment the tenant binds to Managed Google Play — confirmed already in the repo at `docs/admin-setup-android/01-managed-google-play.md:94` [VERIFIED: docs/admin-setup-android/01-managed-google-play.md:90-94] — *"Confirm these four apps are auto-approved in your Managed Google Play store: ... Managed Home Screen (`com.microsoft.launcher.enterprise`) — multi-app kiosk on dedicated devices."* — and independently confirmed on the fetched Learn page:

> "upon connecting your Intune tenant to Managed Google Play, Intune automatically adds five common Android Enterprise related apps to the Intune admin center. ... **Managed Home Screen** - Used for both Android Enterprise dedicated multi-app kiosk and fully managed user affiliated device scenarios. **IT admins should create an assignment** to install this app on dedicated devices that are going to be used in multi-app kiosk scenarios."

This differs structurally from RE-224's Windows precedent (`docs/recipes/01-shared-windows-avd-client.md:78-83`) [VERIFIED: docs/recipes/01-shared-windows-avd-client.md:78-83, quoted: *"1. Navigate to **Intune admin center** > **Apps** > **All apps** > **Add**. 2. **App type**: **Microsoft Store app (new)** > **Select**. 3. Search for **Windows App** and select it. 4. On **Assignments**, add the dynamic device group ... under **Required**."*] — that Windows precedent's Step 1 (`Add`) does not apply to MHS; the app already exists in the tenant's app list.

Assignment click-path (device-group support confirmed — from the same page's "Assign a Managed Google Play app" and "Update a Managed Google Play app" sections):

> "On both work profile devices and corporate-owned devices, you can use Intune to make apps available for device groups through the Managed Google Play store. Previously, apps could only be made available to user groups."

> (assignment-edit mechanic, "Update a Managed Google Play app" section) "1. Sign in to the Microsoft Intune admin center. 2. Select **Apps** > **All Apps**. 3. Select the app from the apps list. 4. Select **Properties**. 5. Select **Edit** by the **Assignments** section."

**Concrete numbered click-path for RE-225's inlined step (assembled from the two quoted fragments above, HIGH confidence):**
1. **Apps** > **All apps**.
2. Select **Managed Home Screen** from the list (already present post-MGP-binding — no Create/Add step).
3. Select **Properties**.
4. Select **Edit** next to **Assignments**.
5. On the **Assignments** tab, under **Required**, select **Add group**.
6. Select the static Entra device group, then **Select**.

#### (b) Create + assign the MHS App Configuration policy

**Source:** `learn.microsoft.com/en-us/intune/intune-service/apps/app-configuration-policies-use-android` — `ms.date: 2026-04-23`, `updated_at: 2026-06-22`. [VERIFIED: fetched 2026-08-03]

Verbatim, "Create an app configuration policy":
> "1. Sign in to the Microsoft Intune admin center. 2. Choose the **Apps** > **Configuration** > **Create** > **Managed devices**. ... 3. On the **Basics** page, set the following details: **Name** ... **Description** ... **Device enrollment type** - This setting is set to **Managed devices**. 4. Select **Android Enterprise** as the **Platform**. 5. Select **Select app** next to **Targeted app**. The **Associated app** pane is displayed. 6. On the **Associated app** pane, choose the managed app to associate with the configuration policy and select **OK**. 7. Select **Next** to display the **Settings** page. ... 11. If the managed app supports configuration settings, the **Configuration settings format** dropdown box is visible. Select one of the following methods for adding configuration information: **Use configuration designer** [or] **Enter JSON data**. ... 14. Select **Next** to display the **Scope tags** page. ... 16. Select **Next** to display the **Assignments** page. 17. In the dropdown box next to **Assign to**, select either **Add groups**, **Add all users**, or **Add all devices** to assign the app configuration policy. ... 22. Select **Next** to display the **Review + create** page. 23. Select **Create** to add the app configuration policy to Intune."

**Nuance worth flagging:** this same article's introductory prose says *"The app configuration policy is assigned to your user groups"* — but the step-by-step wizard's own **Assignments** page (step 17) explicitly offers **Add groups** / **Add all users** / **Add all devices**, meaning device-group and all-devices assignment ARE supported. The introductory sentence is stale/imprecise relative to the wizard it introduces. **D2.11's static-device-group target is achievable via "Add groups," selecting the Entra device group** — do not let the introductory sentence's "user groups" phrasing narrow the recipe's own instruction.

**Concrete numbered click-path for RE-225's Step 5 (D2.9), condensed from the quoted sequence above, HIGH confidence:**
1. **Apps** > **Configuration** > **Create** > **Managed devices**.
2. **Basics:** Name, Description (Device enrollment type is fixed to **Managed devices**).
3. **Platform:** **Android Enterprise**.
4. **Targeted app:** select **Select app** > choose **Managed Home Screen** > **OK**.
5. **Next** → **Settings** page.
6. **Configuration settings format:** choose **Enter JSON data** (per D1.2's ruling) and paste the payload — or **Use configuration designer** for the equivalent UI path named in the same D1.2 one-liner.
7. **Next** → **Scope tags** (optional).
8. **Next** → **Assignments**: **Assign to** > **Add groups** > select the static Entra device group.
9. **Next** → **Review + create** > **Create**.

### Finding 5 — The JSON payload envelope (D1.2/D1.5's unestablished shape, now closed)

**Source:** `configure-managed-home-screen`, "JSON Data Examples" section. [VERIFIED: fetched 2026-08-03]

The Intune "Enter JSON data" editor for an Android app configuration policy does **not** take a flat `{"key": "value", ...}` object. It requires this exact envelope (quoted verbatim, structure preserved):

```json
{
    "kind": "androidenterprise#managedConfiguration",
    "productId": "app:com.microsoft.launcher.enterprise",
    "managedProperty": [
        {
            "key": "lock_home_screen",
            "valueBool": true
        },
        {
            "key": "grid_size",
            "valueString": "4;5"
        },
        {
            "key": "applications",
            "valueBundleArray": [
                {
                    "managedProperty": [
                        {
                            "key": "package",
                            "valueString": "app package name here"
                        }
                    ]
                }
            ]
        },
        {
            "key": "exit_lock_task_mode_code",
            "valueString": "123456"
        },
        {
            "key": "max_number_of_attempts_for_exit_PIN",
            "valueInteger": 0
        },
        {
            "key": "amount_of_time_before_try_exit_PIN_again",
            "valueInteger": 0
        },
        {
            "key": "enable_mhs_signin",
            "valueBool": false
        }
    ]
}
```
*(The above is this research's own assembly of D3.3's bounded 8-key set into the confirmed envelope — every key/value-type pairing is individually verbatim-sourced from Microsoft's full worked example, quoted below; the assembly/selection itself is not a Microsoft quote.)*

**Full source example excerpt confirming the exact key spellings and value types used above** (Microsoft's own live sample, abridged to the load-bearing entries — full example is ~530 lines and includes every MHS setting; excerpted here to the D3.3-bounded set):

```json
{
    "kind": "androidenterprise#managedConfiguration",
    "productId": "app:com.microsoft.launcher.enterprise",
    "managedProperty": [
        { "key": "lock_home_screen", "valueBool": true },
        { "key": "applications", "valueBundleArray": [
            { "managedProperty": [
                { "key": "package", "valueString": "app package name here" },
                { "key": "enable_app_offline", "valueBool": true },
                { "key": "app_available_prior_to_sign_in", "valueBool": false }
            ]}
        ]},
        { "key": "exit_lock_task_mode_code", "valueString": "123456" },
        { "key": "grid_size", "valueString": "4;5" },
        { "key": "managed_folders", "valueBundleArray": [
            { "managedProperty": [
                { "key": "folder_name", "valueString": "Folder name here" },
                { "key": "applications", "valueBundleArray": [
                    { "managedProperty": [{ "key": "package", "valueString": "com.microsoft.emmx" }]}
                ]}
            ]}
        ]},
        { "key": "max_number_of_attempts_for_exit_PIN", "valueInteger": 0 },
        { "key": "amount_of_time_before_try_exit_PIN_again", "valueInteger": 0 },
        { "key": "enable_mhs_signin", "valueBool": true },
        { "key": "signin_type", "valueString": "AAD" }
    ]
}
```
(Full unabridged source captured this session; every fragment above is a verbatim excerpt, not a paraphrase.)

**Confirmed exact sub-key spellings for the D3.3-bounded keys (all [VERIFIED], live JSON example):**
- `applications` bundleArray sub-keys: `package`, `enable_app_offline`, `app_available_prior_to_sign_in` — matches `STACK.md:50` exactly. D3.6's ruling (package only, omit the other two per the sign-in-gated carve-out) is executable: simply omit the `enable_app_offline`/`app_available_prior_to_sign_in` `managedProperty` entries from each app object.
- `managed_folders` bundleArray sub-keys: `folder_name`, `applications` (nested bundleArray of `{package}` objects), `is_customer_facing` (boolean, optional) — matches `STACK.md:51` exactly.
- `signin_type`'s JSON value is the literal string `"AAD"`, not `"Microsoft Entra ID"` — a load-bearing spelling fact if this key is ever shown in an example snippet (it is OUT of the bounded payload per D3.3, so only relevant for prose/anti-feature-row illustrations).
- `enable_easy_access_debugmenu` — note the JSON key is one compressed word ("debugmenu"), not `enable_easy_access_debug_menu` as the English designer label ("Enable easy access debug menu") might suggest. Not payload-relevant under D1.6 (demoted to a Verification line, never the fence) but a precise-spelling trap if the key is ever quoted.

**No "replace vs. merge" mechanism found — reaffirms T-1.** The "Choosing a configuration settings format" section states only a one-directional conversion: *"If you add properties with Configuration Designer, you can automatically convert these properties to JSON by selecting **Enter JSON data**."* Nothing on this page (or any page fetched this session) describes the JSON editor replacing an entire existing payload, or merging with a prior one. T-1's grep finding stands; do not reintroduce that mechanism.

### Finding 6 — Designer labels for D1.8's gap cells

**Source:** `configure-managed-home-screen`, Configuration Designer table. [VERIFIED: fetched 2026-08-03]

| JSON key | Configuration designer label (verbatim) | Value type | Default |
|---|---|---|---|
| `applications` | **"Set allow-listed applications"** | bundleArray | *(no scalar default — bundleArray)* |
| `grid_size` | **"Set Grid Size"** | string | **"Auto"** |

Both were the two D1.8-named gap cells (*"Only `applications` and `grid_size` lack labels"*). Both are now filled, closing D1.8's own gap. Full label context, quoted:

> "**Set allow-listed applications** | bundleArray | See **Enter JSON Data** section of this document. | Allows you to define the set of apps visible on the home screen from among the apps installed on the device. ... The apps that you allowlist in this section should already be installed on the device to be visible on the home screen."

> "**Set Grid Size** | string | **Auto** | Allows you to set the grid size for apps to be positioned on the managed home screen. You can set the number of app rows and columns to define grid size in the following format: `columns;rows`."

**Note:** `grid_size`'s default value is **"Auto"**, not blank/unset — worth stating in the decomposition table's Worked-value or What-it-does cell per D3.5's "defaults stated where decision-relevant" rule, since the worked value (e.g. `"4;5"`) is an explicit override of a real, named default.

## Don't Hand-Roll

Not applicable in the conventional sense — there is no custom-code temptation in a documentation phase. The one "don't hand-roll" analog: **don't hand-derive the JSON envelope shape from a flat-object assumption.** CONTEXT.md itself flags that no repo source establishes the envelope; Finding 5 above is the authoritative shape. Any worked example drafted without the `kind`/`productId`/`managedProperty` wrapper will not be a faithful reproduction of what Intune's editor actually accepts.

## Common Pitfalls

The milestone's own `PITFALLS.md` (26 items, Groups A–D) already covers this recipe's general risk surface — not reproduced here. This research surfaces exactly one **new** pitfall, specific to this phase's own gate:

### Pitfall 27 (new): Treating the live MHS-config page as internally consistent on the exit-PIN key's location

**What goes wrong:** An author who fetches `configure-managed-home-screen` once, finds the "must be configured through a device configuration profile" Note, and stops reading will conclude `STACK.md:55` is confirmed and `05:253` is wrong. An author who instead jumps straight to the JSON worked example will conclude the opposite. Both are half-right — the live page itself carries both signals.

**Why it happens:** the two signals are ~200 lines apart on a long page (a descriptive settings table early, a "kitchen sink" JSON sample later) and nothing on the page cross-references or reconciles them.

**How to avoid:** Quote both signals in whatever landing spot D1.1/D1.5 resolves to (Finding 2's recommended callout does this). Do not cite only one half of the page as if it were the whole story.

**Warning signs:** A Phase-136 draft or SUMMARY.md asserting "current Learn confirms `05:253`" or "current Learn confirms `STACK.md:55`" without quoting both statements.

**Phase to address:** 136 (Plan 1's D1.1/D1.5 resolution).

**Confidence:** HIGH — both quoted statements are directly from the live page, fetched this session.

## Code Examples

The full bounded worked JSON payload (Finding 5's first block) is the load-bearing code example for this phase — reproduced there rather than duplicated here. The two click-path sequences (Finding 4) are the load-bearing procedural examples.

## State of the Art

| Item | Prior state (v1.19 research, 2026-07-25) | Current state (this research, 2026-08-03) | Change |
|---|---|---|---|
| JSON envelope shape | Unestablished — CONTEXT.md D1.2/D1.5 both flag this as a gap | Confirmed: `kind`/`productId`/`managedProperty` wrapper (Finding 5) | **Closed this session** |
| D2.7 sibling key | Unnamed, "genuinely unanswerable from the repo" per D2.7 | Named: `max_number_of_attempts_for_session_PIN` (Finding 3) | **Closed this session** |
| D1.1/D1.5 source conflict | Unresolved, Plan-1-gated | Still unresolved — but now precisely characterized as a same-page internal ambiguity, not a stale-vs-fresh conflict (Finding 2) | **Refined, not closed** |
| MHS-02 exit-PIN sync `[MEDIUM]` tag | No first-party source found (2 prior passes) | No first-party source found (3rd independent pass, this session) | **Unchanged — stable gap** |
| All three HYG-06 SC6 clusters | Sourced from anchor's own `last_verified: 2026-04-23` citation | Independently re-verified 2026-08-03 against pages unchanged since 2026-07-25 | **No drift confirmed twice** |

No deprecated/outdated Learn content was found in any of the six pages fetched this session.

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | Finding 2's recommended resolution (ship the key with a placeholder + adjacent caveat callout) is the right disposition for D1.5 | Finding 2 | If Plan 1 instead takes the STACK.md:55 branch, the fence loses one key and the decomposition table loses one row — a bounded, low-cost reversal per D1.5's own reversibility note |
| A2 | The click-path numbered sequences in Finding 4 are a faithful condensation of the quoted Learn steps, not independently re-tested against a live tenant | Finding 4 | If Intune's admin center UI has since renamed a blade (e.g. "Configuration settings format" dropdown wording), the recipe's own author-time verification (per D3.4's general practice) would catch it before publish |
| A3 | The `grid_size` example value `"4;5"` and other placeholder worked values in Finding 5's assembled envelope are illustrative, not CONTEXT-mandated | Finding 5 | None — D3.3 explicitly reserves "concrete worked values ... beyond the bounded key set" as Claude's Discretion |

## Open Questions

1. **Does D1.1/D1.5 resolve to "ship with caveat" (Finding 2's recommendation) or to the clean STACK.md:55 branch (key absent)?**
   - What we know: both Learn statements are real, current, and on the same page.
   - What's unclear: which one governs actual runtime behavior — this cannot be determined from documentation alone; it would require a live-tenant test, which is out of this research's scope.
   - Recommendation: Plan 1 makes the call per D4.7's own gate; Finding 2 supplies both quotes so the call is informed rather than a coin flip.

2. **Is the Assignments-page "Add groups" option (Finding 4b) definitely usable with a device group for an App Configuration policy, or could Intune silently restrict it to user groups despite the wizard offering the option?**
   - What we know: the wizard's dropdown explicitly lists "Add groups" / "Add all users" / "Add all devices"; the introductory prose says "user groups."
   - What's unclear: no page explicitly confirms device-group Entra objects are accepted in the "Add groups" picker for THIS specific policy type (App Configuration, as opposed to app assignment, which is separately confirmed device-group-capable).
   - Recommendation: flag as a MEDIUM-confidence click-path detail; author-time verification against a live tenant (per this corpus's own D3.4 practice) should confirm before the recipe ships.

## Sources

### Primary (HIGH confidence, fetched directly 2026-08-03)
- `learn.microsoft.com/en-us/intune/app-management/configuration/configure-managed-home-screen` (ms.date 2026-04-21, updated_at 2026-06-22) — Findings 1 (PLUS list), 2, 3, 5, 6
- `learn.microsoft.com/en-us/intune/device-configuration/templates/ref-device-restrictions-android-enterprise` (ms.date 2026-04-21, updated_at 2026-07-22) — Finding 1 Cluster C
- `learn.microsoft.com/en-us/intune/device-enrollment/android/setup-dedicated` (ms.date 2025-05-08, updated_at 2026-07-01) — Finding 1 Clusters A and B
- `learn.microsoft.com/en-us/intune/app-management/deployment/add-managed-google-play` (ms.date 2026-04-23, updated_at 2026-06-22) — Finding 4a
- `learn.microsoft.com/en-us/intune/intune-service/apps/app-configuration-policies-use-android` (ms.date 2026-04-23, updated_at 2026-06-22) — Finding 4b

### Repo (direct reads this session)
- `docs/admin-setup-android/01-managed-google-play.md:90-94` — confirms MHS is one of the four/five auto-approved apps
- `docs/recipes/01-shared-windows-avd-client.md:78-91` — RE-224's Windows app-assignment precedent shape (cited by CONTEXT D2.11's "01:83" reference)
- `docs/admin-setup-android/05-dedicated-devices.md` (full) — the anchor, re-read for direct comparison against fresh fetches
- `.planning/phases/136-recipe-4-android-dedicated-mhs-multi-app/136-CONTEXT.md` (full) — the locked decision set this research supports
- `.planning/REQUIREMENTS.md`, `.planning/STATE.md`, `.planning/ROADMAP.md` (Phase 136 block), `.planning/research/{STACK,FEATURES,ARCHITECTURE,PITFALLS,SUMMARY}.md`, `docs/recipes/03-windows-11-multi-app-kiosk.md`, `docs/_templates/recipe-template.md` — all read in full for phase context (see `<phase_requirements>` and inline citations above)

### Secondary (MEDIUM confidence)
- WebSearch corroboration for the `setup-dedicated` URL and the assign-groups click-path shape (used only to locate the correct first-party URL, superseded by the direct fetches above)

## Metadata

**Confidence breakdown:**
- HYG-06 spot-verification (Finding 1): HIGH — every claim directly quoted from a dated, live fetch this session
- JSON envelope (Finding 5): HIGH — Microsoft's own full worked example, directly quoted
- D1.1/D1.5 conflict (Finding 2): MEDIUM — both source statements are HIGH confidence individually; the *resolution* is this research's own reasoned recommendation, not a first-party ruling
- D2.7 sibling (Finding 3): HIGH — directly quoted, exact key/label match to MHS-04's own framing
- Click-paths (Finding 4): HIGH for the quoted wizard steps; MEDIUM for the device-group-in-App-Configuration-Assignments specific claim (Open Question 2)

**Research date:** 2026-08-03
**Valid until:** Learn pages in this domain have shown ~1-2 month update cadences (`updated_at` deltas of 4-9 weeks observed across the six pages fetched); treat this research as valid for approximately 30 days — re-verify Finding 1 and Finding 2 specifically if Phase 136 authoring is delayed materially past 2026-09-03.
