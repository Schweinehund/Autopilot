# Feature Research

**Domain:** Intune/Autopilot device-configuration "recipe" documentation — two new recipes, each authored as a **delta over corpus that already ships**: (3) Windows multi-app kiosk (RE-224, cross-links single-app to RE-222 Step 5a — zero edits to RE-222), (4) Android Dedicated MHS multi-app (RE-225, delta over `docs/admin-setup-android/05-dedicated-devices.md`)
**Researched:** 2026-07-25
**Confidence:** HIGH for the two load-bearing facts the milestone gates on (Windows 11 multi-app kiosk mechanism; MHS sign-in-without-SDM behavior) — both verified against current, dated Microsoft Learn pages fetched in this session. MEDIUM/LOW flagged inline where only community sources exist.

## Plan-1 Hard Gate — RESOLVED

PROJECT.md flags a hard gate: `130-RESEARCH.md:340`'s claim that Windows 11 multi-app kiosk uses "a separate, non-Intune-Templates mechanism" carried **no `[VERIFIED:]` tag**. This research **verifies the claim as TRUE, HIGH confidence** — the recipe is authorizable. Do not re-run this gate at plan time; cite the sources below instead.

- Intune's own Kiosk template (**Devices > Configuration > Create > Templates > Kiosk > Multi app kiosk**) states explicitly: *"Currently, you can use Intune to configure a multi-app kiosk on Windows 10 devices. For more information about Windows 11 multi-app kiosk support, go to [Set up a multi-app kiosk on Windows 11 devices]."* [HIGH: Microsoft Learn `intune/device-configuration/templates/configure-kiosk`, ms.date 2026-02-10, updated_at 2026-07-01]
- The Windows 11 mechanism is the **Assigned Access configuration XML** (`AssignedAccessConfiguration` schema), pushed to the device through the **`./Vendor/MSFT/AssignedAccess/Configuration`** CSP node — deployed via an **Intune Custom profile (Windows 10 and later > Templates > Custom > OMA-URI)**, not the Kiosk-template GUI wizard. [HIGH: Microsoft Learn `windows/client-management/mdm/assignedaccess-csp`, ms.date 2025-03-12; `windows/configuration/assigned-access/configuration-file`, ms.date 2025-03-07, updated_at 2025-09-26; corroborated by 6+ independent community walkthroughs describing the identical OMA-URI path — MEDIUM corroboration on the deployment-workflow specifics, HIGH on the CSP node itself]
- Microsoft's own Windows-frontline-worker guidance shows a **Windows 10-era Kiosk-template screenshot** for "multi app" without a platform caveat in that specific article — an internal Microsoft-docs seam the recipe should not silently inherit. [HIGH: `intune/solutions/frontline-worker/windows`, ms.date 2025-05-29, updated_at 2026-07-01 — flag this divergence in the recipe rather than copy the screenshot's implied GUI path for Windows 11]

This is the single most load-bearing freshness fact in RE-224 — state it explicitly, the way RE-222 called out the MSRDC retirement.

---

## Recipe 3 — Windows Multi-App Kiosk (RE-224)

**Scope lock (per PROJECT.md, not re-litigated here):** multi-app only; single-app is a one-line cross-link to `docs/recipes/01-shared-windows-avd-client.md#step-5a-kiosk-configuration`. Zero edits to RE-222.

### Table Stakes (Recipe Fails Without These)

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Multi-app config deployed via **Custom OMA-URI** (`./Vendor/MSFT/AssignedAccess/Configuration`, raw `AssignedAccessConfiguration` XML) on Windows 11 | The Intune Kiosk-template GUI's "Multi app kiosk" option is Windows 10-only; using it on Windows 11 targets the wrong mechanism entirely (see Plan-1 gate above) | MEDIUM | HIGH confidence, first-party. This is the doc's central mechanical fact — state it before any step content, mirroring how RE-222 leads with the MSRDC retirement. |
| Kiosk account/group is a **standard (non-admin) user or group** | Assigned Access explicitly does not support associating an admin account with a profile | LOW | HIGH confidence, MS Learn `configuration-file`. |
| Apps in the `AllowedApps` list are **already installed/provisioned on the device before the XML applies** | Assigned Access only *restricts access* to apps that exist — it does not install them. `AppNotFound` is a documented runtime status code for this exact failure. | LOW | HIGH confidence, MS Learn `assignedaccess-csp` (Status node) + `assigned-access/configuration-file`. Reuses RE-222's Step 4 "Required + device-context" app-deployment pattern — cross-link, don't re-author app-deployment mechanics. |
| **Config account/group excluded from any interactive Conditional Access policy** (MFA, Terms of Use) | CA policies that require user interaction hard-fail Assigned Access sign-in — the user never reaches the desktop | LOW | HIGH confidence, first-party MS troubleshooting article with verbatim Event Viewer signatures (Event ID 1098, `AADSTS50076`/`AADSTS50158`, error `0xCAA2000C`). "This behavior is by design." No workaround except exclusion. |
| **App dependency completeness** in `AllowedApps` — if App A depends on App B, both must be listed | AppLocker rules are generated only from the listed apps; a missing dependency breaks the app that needs it, silently | LOW | HIGH confidence, MS Learn. |
| **Group Configs require an `AllAppList` (restricted user experience) profile** — `KioskModeApp` (single-app) profiles cannot be assigned to a group, only to an individual account | Structural CSP limitation | LOW | HIGH confidence, MS Learn `configuration-file`: *"Configs that specify group accounts can't use a kiosk profile, only a restricted user experience profile."* Directly shapes Decision Point 3 below. |
| **No nested groups** in `UserGroup` Configs | If User A ∈ Group A ∈ Group B, and Group B is the Config target, User A does NOT get the kiosk experience | LOW | HIGH confidence, MS Learn, explicit worked counter-example in the docs. |
| **AUMID discovered via `Get-StartApps`**, never hardcoded | Store package identifiers can shift across releases | LOW | Reuses RE-222's exact existing pattern verbatim — cross-link, do not re-author. |
| **`Configuration` node supersedes the legacy standalone `KioskModeApp` node** — once `Configuration` is set, `KioskModeApp` becomes a silent No-Op even though it still returns SUCCESS to the MDM server | A stale/legacy `KioskModeApp` CSP write left in place from an old policy will appear to succeed but do nothing once the multi-app `Configuration` XML is deployed | LOW | HIGH confidence, MS Learn `assignedaccess-csp` — this is Configuration-node-specific and is **not** covered by RE-222 (which only documents the GUI Kiosk-template `KioskModeApp`/`ShellLauncher` exclusion); RE-224 must state this itself, not assume it's already covered. |

### Differentiators (Hardening / UX Polish)

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| **Autologon (`AutoLogonAccount`)** into a shared local standard account running the `AllAppList`/`DefaultProfile` | Zero-touch walk-up experience — no credential entry ever, works for multi-app exactly as it does for RE-222's single-app kiosk branch | LOW | HIGH confidence the mechanism exists and applies to multi-app (not single-app-only, contrary to a plausible-but-wrong assumption); MS Learn `configuration-file`. **Anti-feature interaction:** breaks if EAS password policy is active on the device — see Anti-Features. |
| ~~**Runtime health monitoring** via `./Vendor/MSFT/AssignedAccess/Status`~~ **→ ANTI-FEATURE, not a differentiator** | **CORRECTED 2026-07-25 (adversarial review).** `Status` has Access Type **`Get` only**, and Intune requires a setting to support *"the Add, Replace, and Get operations"* — so it is **not deliverable as a custom OMA-URI row**. The WMI bridge `MDM_AssignedAccess` exposes exactly `InstanceID`/`ParentID`/`KioskModeApp`/`Configuration` — **no `Status`, no `StatusConfiguration`** — and MDMDiagReport's enumerated contents do not include AssignedAccess. `StatusConfiguration` *is* Intune-settable (Access Type Add/Delete/Get/Replace), but setting it produces a payload only a non-Intune MDM server can read. | — | Re-scope to **one anti-feature row**: *don't plan to monitor kiosk health from the Intune console.* Do **not** write "impossible" — the narrow verified claim is "not deliverable as a custom OMA-URI row, and no admin-reachable read path in this recipe's toolchain." `AppNotFound` survives as a **named symptom** under the apps-must-be-pre-installed prerequisite. |
| **`SharedPC` layered under the multi-app kiosk** — **NOT-FOUND** | **CORRECTED 2026-07-25 (adversarial review). The quotation previously cited here was FABRICATED** — *"You can create a Shared PC profile and configure it be a kiosk using the kiosk settings in Intune"* does not appear on `configure-shared-device`, `ref-shared-device-settings-windows`, `shared-pc-technical`, `set-up-shared-or-guest-pc`, `sharedpc-csp`, or the Intune kiosk settings page. Three independent agents searched; two of those pages contain **zero occurrences of "kiosk"**. | — | **NOT-FOUND: no first-party statement exists either way** on combining SharedPC with a multi-app Assigned Access profile. SharedPC's own kiosk hook (`KioskModeAUMID`) is single-app by construction (one AUMID = one app). The gray area is **resolved by absence**, not "a genuine decision": ship **one anti-feature row** (treat as mutually exclusive), never a decision block — a Case-1 branch whose second arm cannot be authored fails STD-05 D-01 and D-06. |
| ~~**Custom `BreakoutSequence`**~~ **→ REMOVED: not schema-legal here** | **CORRECTED 2026-07-25 (adversarial review).** The XSD `profile_t` is an `xs:choice`; `<xs:element ref="v4:BreakoutSequence"/>` appears **only in the `KioskModeApp` branch**, never in the `AllAppsList` (restricted user experience) branch that RE-224 is about. Both first-party worked examples place it inside a `KioskModeApp` Profile. The trap: `configure-multi-app-kiosk` reprints breakout boilerplate byte-shared with the single-app page. This was a **scoping error, not a confidence error** — the feature is genuinely Learn-documented, just for the other profile type. | — | Do not author. State instead (in Rollback/Recovery) that the un-blockable shortcuts are Alt+F4 / Alt+Tab / Alt+Shift+Tab / Ctrl+Alt+Del, and that the targeted account has Remove Logoff applied so Ctrl+Alt+Del reaches the security screen with the sign-out affordance stripped. |
| **Custom Start layout** via `v5:StartPins` — **folders REMOVED** | **CORRECTED 2026-07-25 (adversarial review).** Managed folders **do not exist for Windows 11**: the Win11 `pinnedList` key set is closed and has four keys (`packagedAppID`, `desktopAppID`, `desktopAppLink`, `secondaryTile`) — no folder key. Folders are Windows-10-only (`start:Folder`). `v5:StartPins` itself is correct and IS the Windows 11 Start layout — the mechanism sentence sits inside the OS-zone pivots in parallel wording (*"use the `StartLayout` element"* Win10 / *"use the `v5:StartPins` element"* Win11), the closing Note calls the StartPins payload *"the Start layout XML"*, and every Win11 worked example uses it. | LOW-MEDIUM | Retain `v5:StartPins` (minimal, 2-3 pins) and **state the 22H2 floor explicitly** (`v5` = `.../2022/config`). Drop folders. Drop `v5:TaskbarLayout` (polish). `Taskbar`/`ShowTaskbar` is the genuinely mandatory element (`minOccurs="1"`, `use="required"`), not `StartLayout`. |

### Anti-Features (Common Mistakes That Break This Scenario)

| Feature/Mistake | Why Attempted | Why It Breaks | Alternative |
|------------------|----------------|-----------------|-------------|
| Using the **Intune Templates > Kiosk > "Multi app kiosk"** GUI wizard on Windows 11 devices | It's the visible, documented, click-through path — and Microsoft's own frontline-worker overview article shows a "kiosk-multi-app.png" screenshot without a platform caveat | Silently unsupported for Windows 11 per the canonical Kiosk-template doc itself; the recipe author must not follow the screenshot's implied path uncritically | Custom OMA-URI / `AssignedAccessConfiguration` XML — see Plan-1 gate above |
| Targeting a **group** Config with a **single-app (`KioskModeApp`)** profile | Admin assumes group targeting works the same for single- and multi-app | Structural CSP limitation — group Configs require an `AllAppList` profile | Use individual account Configs for single-app (already RE-222's pattern), groups only with multi-app `AllAppList` |
| Applying an **interactive Conditional Access policy** (MFA, TOU) to the kiosk account/group | Standard org security-baseline reflex — "every account needs MFA" | Hard sign-in failure, by design; verbatim Event ID 1098 / `AADSTS50076` or `AADSTS50158` | Exclude the kiosk account/group from any CA policy requiring interaction |
| Applying an **EAS (Exchange ActiveSync) password policy** to an autologon kiosk device | Org mail-security baseline applied blanket-wide | Documented to break the autologon feature outright | Exclude autologon kiosk devices/accounts from EAS password-restriction scope |
| **Nesting** the Config `UserGroup` (group-of-groups) | Natural org-chart modeling instinct | Explicitly unsupported — nested membership resolution does not occur; affected users silently get no kiosk experience | Flatten to a single, directly-membered group |
| Assuming **Win32 app installs succeed normally** under a self-deploying + multi-app + autologon local account | The pattern looks identical to RE-222's single-app autologon branch | A local autologon account has no Intune user token; community reports indicate this can affect Win32 app deployment reliability in this specific combination | MEDIUM confidence, single community source (Microsoft Q&A) — flag as a plan-time/authoring-time verification item, not an asserted fact |
| **Hardcoding** a specific Windows App/Store AUMID string | Looks stable, seen once and reused | Store package identifiers can shift across app updates/regions | `Get-StartApps` discovery — reuses RE-222's existing pattern verbatim |

---

## Recipe 4 — Android Dedicated, MHS Multi-App (RE-225)

**Scope lock (per PROJECT.md, not re-litigated here):** delta over `docs/admin-setup-android/05-dedicated-devices.md`, which has no `## Steps`, no Verification checklist, no Anti-Feature table — that gap is the recipe. Case-1 = Standard-vs-SDM token (irreversible); Entra SDM is a routing cross-link only, never a worked branch here. Second fork = the four-way provisioning method (already fully documented in `05-dedicated-devices.md` — cross-link, don't re-author).

### Table Stakes (Recipe Fails Without These)

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| **Standard token type**, `AllowedApps`... i.e. MHS Required-assigned to the device group | 05-dedicated-devices.md Delta 3: without a Required assignment, device boots to the standard Android launcher, no lockdown | LOW | Already fully documented in `05-dedicated-devices.md` (Delta 3 + What-breaks table) — cross-link, do NOT re-author. |
| **Static Entra device group** for enrollment profile assignment | 05-dedicated-devices.md Delta 2: dynamic groups lag during burst provisioning, causing token-check failures | LOW | Cross-link, don't re-author. |
| **Exit-kiosk PIN identical in both Device Restrictions and MHS app config** | Top repeated-escalation pattern per 05-dedicated-devices.md's own H2 | LOW | Cross-link, don't re-author the sync requirement itself — RE-225 only owns the *delta* detail below. |
| **Apps allow-listed on the MHS grid must already be Required-assigned and installed on the device first** | MHS controls visibility/access, not installation — `Create Managed Folder for grouping apps` explicitly requires the grouped apps to already be Required-assigned | LOW | HIGH confidence, MS Learn `configure-managed-home-screen`, ms.date 2026-04-21, updated_at 2026-06-22. This delta is not stated in `05-dedicated-devices.md` and belongs in RE-225. |
| **Overlay + exact-alarm permissions auto-granted to MHS via OEMConfig** (not manual Settings-app grant) | Screensaver, virtual home button, notification badges, auto-relaunch, and auto-sign-out all require these permissions; manual grant means routing the end user through the Settings app — itself a lockdown-escape vector | MEDIUM | HIGH confidence, MS Learn (multiple settings sections repeat this warning verbatim). |
| **Device Restrictions "Notification windows" must NOT be set to Disable** if any Overlay-dependent MHS feature is used | Disabling notification windows silently breaks screensaver, virtual home button, and auto sign-out | LOW | HIGH confidence, MS Learn, explicitly repeated per-feature. |
| **`Enable sign in` = FALSE is the structural default matching the Standard (no-identity) token** | With no per-user Entra identity at the enrollment layer, MHS's own sign-in gate defaults off — device presents one shared curated grid to anyone | LOW | HIGH confidence, MS Learn — default value table confirms `Enable sign in: FALSE` by default. Directly answers the research question "how do sessions/sign-in work when NOT in Entra SDM": the honest default answer is *there is no sign-in at all*. |

### Differentiators (Hardening / UX Polish)

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| **`Enable sign in = TRUE` + `Sign in type = Other`** (non-Entra) | Gives individual-session accountability (who used the device, session PIN, auto-sign-out) without requiring the Entra SDM token at all — a genuinely useful middle ground between "no identity" and "full SDM" | MEDIUM | HIGH confidence the setting exists and behaves this way; MEDIUM on which non-Entra identity providers are realistically wired to "Other" in a typical tenant — flag for phase-time verification if this branch is chosen. |
| **Debug-menu lockout hardening**: `Enable easy access debug menu = FALSE` (keep the back-button-~15-times gesture as the only path to the exit-PIN prompt) + `Maximum number of attempts to exit lock task mode` + `Time before exit lock task mode password can be retried` | Brute-force mitigation on the exit-PIN itself — a genuine hardening layer `05-dedicated-devices.md`'s PIN-sync H2 does not cover | LOW-MEDIUM | HIGH confidence, MS Learn, full setting descriptions fetched. This is new content for RE-225, not a re-statement of the 05 doc's sync requirement. |
| **Managed folders, grid size, app ordering, org branding (wallpaper + logo)** | Curated, organized multi-app presentation for larger app portfolios (the differentiator that makes "multi-app" worth choosing over single-app Lock Task Mode at all) | LOW-MEDIUM | HIGH confidence, MS Learn, full JSON examples fetched. |
| **Offline app access + "app access without sign-in" allow-lists** (only meaningful if `Enable sign in = TRUE`) | Resilience for network-poor retail/warehouse sites — specific apps remain reachable during an outage or before the user authenticates | LOW-MEDIUM | HIGH confidence, MS Learn. |
| **Auto-relaunch on inactivity** (`Enable MAX inactive time outside of MHS` / `Enable MAX time outside MHS`) | Self-healing session hygiene if a user wanders into an allowed non-MHS surface (e.g. a permitted system app) and leaves the device idle | LOW | HIGH confidence, MS Learn; requires `Exit lock task mode password` to be configured to be usable. |

### Anti-Features (Common Mistakes That Break This Scenario)

Per the milestone's own framing, this set is intentionally large for Android Dedicated — enumerate exhaustively, each with its reason.

| Feature/Mistake | Why Attempted | Why It Breaks | Alternative |
|------------------|----------------|-----------------|-------------|
| Setting **`Enable sign in = True`** and leaving `Sign in type` at its default | **CORRECTED 2026-07-25 (adversarial review) — re-anchored on the documented DEFAULT, which needs no inference.** `signin_type` **defaults to "Microsoft Entra ID"** — verbatim: *"By default, this setting uses 'Microsoft Entra ID' user accounts. This setting can only be used if **Enable sign in** is set to True."* An admin who flips sign-in on and touches nothing else lands on the Entra-ID path by default. | The first-party negative that DOES exist is scoped to **account type**, not enrollment mode: *"Users who sign in with a non-Microsoft Entra ID account **don't get single sign-on** to all apps integrated with Microsoft Entra shared device mode, **but they still sign in to Managed Home Screen**."* **The previous "login prompt, zero SSO payoff" framing mis-transposed the account-type axis onto the enrollment-mode axis and is withdrawn** — no first-party source states what an Entra account does on a non-SDM device, and the trailing clause above actively undercuts the "zero payoff" reading. | Ship `Enable sign in = FALSE` as the worked value (documented default; matches `05:72`'s "No user identity" on a Standard token). **Never claim TRUE is unavailable on a Standard token** — that is NOT-FOUND in both directions. Route true per-worker SSO to the SDM cross-link. |
| Assuming **system navigation (Home/Overview buttons or status bar)** can be exposed for usability without weakening the sign-in gate | Admin wants a friendlier, less-locked-down feel | If Device Restrictions' "Enabled System Navigation Features" = Home and Overview buttons, or "System notifications and information" is shown, end users can **ignore and skip** the MHS sign-in screen *and* the Session PIN screen entirely | Keep system navigation fully restricted (default Dedicated posture) if `Enable sign in` or Session PIN protection is meant to be enforced |
| Setting **Device Restrictions "Notification windows" = Disable** as a blanket hardening move | Looks like a reasonable additional lockdown | Silently breaks screensaver, virtual home button, and auto sign-out (all Overlay-permission dependent) with no error surfaced to the admin | Leave Notification windows enabled if any of these MHS features are configured; document the dependency explicitly |
| Expecting **per-signed-in-identity personalization** (different app sets per user) on a Standard-token, sign-in-disabled device | Natural expectation carried over from the Shared iPad recipe's per-role layering pattern | Structurally impossible — there is no distinguishing identity at the device layer at all when `Enable sign in = FALSE`; every user of the device sees the identical shared configuration | If per-role differentiation is required, this is a routing signal toward Entra SDM (cross-link, not this recipe's worked path) |
| Assuming end users can **toggle Wi-Fi on/off** from the MHS settings menu | Looks like a standard network-settings surface | Users can switch between already-visible networks but cannot enable/disable Wi-Fi itself | Manage Wi-Fi radio state via device policy, not end-user MHS interaction |
| Assuming end users can **initiate a first-time connection to an Intune-preconfigured Enterprise Wi-Fi network** from inside MHS | The network appears to be "available" in the MHS network list | The device can use a preconfigured Enterprise network automatically, but end users cannot manually initiate that connection from within MHS itself | Preconfigure and let the device connect automatically — don't rely on end-user-initiated connection from MHS for Enterprise networks |
| Expecting end users to be able to **reorder, rename, or move folders/apps** on the Managed Home Screen | Consumer Android launcher habit | `Lock Home Screen` defaults to TRUE; folders specifically can never be renamed/reordered/moved by end users regardless of this setting | If reordering is a real requirement, use `Application order enabled` + `Application order` at the admin/policy layer, not end-user drag-and-drop |
| Configuring **Zero-Touch and Knox Mobile Enrollment simultaneously** on Samsung hardware | Admin tries to "cover both bases" for a mixed-OEM fleet | Already documented in `05-dedicated-devices.md` as a CRITICAL severity mutual exclusion | Cross-link, don't re-author — pick one per Samsung device |
| Treating **digital signage or single-app kiosk** guidance as applicable to this recipe | Superficially similar Dedicated scenarios | Out of RE-225's scope by design (multi-app only, per PROJECT.md); digital signage and single-app kiosk have different locking mechanisms (screensaver mode; Lock Task Mode without MHS respectively) | `05-dedicated-devices.md` Scenarios table — cross-link, don't re-author |

---

## Admin Decision Points ("Ask the Admin" Moments)

Ranked by **consequence-if-wrong severity**, categorized per STD-05: **branching** (two worked paths), **enumerable** (fixed set), **free-value** (admin-supplied name/number).

### Recipe 3 — Windows Multi-App Kiosk (RE-224)

| # | Severity | Type | Decision | Consequence if wrong |
|---|----------|------|----------|----------------------|
| 1 | **CRITICAL** | Branching | Multi-app config delivery mechanism: **Custom OMA-URI/`AssignedAccessConfiguration` XML** (Windows 11-capable) vs. the **Intune Templates > Kiosk GUI wizard** (Windows 10 only for multi-app) | Following the GUI path on Windows 11 silently targets an unsupported OS combination — device never enters multi-app kiosk mode; this is the Plan-1 hard-gate fact itself, not optional |
| 2 | **CRITICAL** | Branching | Kiosk account model: **shared local account via `AutoLogonAccount`** (zero-touch, no per-user identity) vs. **named/grouped Entra account(s)** via `Configs`/`UserGroup` (accountability, no autologon) | Local-account choice loses any per-user audit trail and is vulnerable to the EAS-autologon breakage; Entra-account choice requires CA-policy exclusion or sign-in hard-fails (Event ID 1098) — this is PROJECT.md's "Windows enrollment-path fork" gray area |
| 3 | **HIGH** | Enumerable | Config target type: **individual local account** / **individual Entra user** / **Entra AD group** / **local group** / **AD domain group** / **`GlobalProfile`** (all non-admin accounts) | Only `AllAppList` (multi-app) profiles support group Configs; attempting a group Config with a single-app profile fails outright |
| 4 | **HIGH** | Branching | Layer **`SharedPC` (`EnableSharedPCMode`) underneath the multi-app kiosk** vs. multi-app kiosk alone | Without SharedPC layering, no automatic account cleanup/exemption policy exists — accumulating local accounts/cached data over time on a shared device; PROJECT.md's "multi-app+SharedPC layering" gray area |
| 5 | **MEDIUM** | Enumerable | Breakout sequence: **default CTRL+ALT+DEL** vs. **custom `BreakoutSequence`** | Default sequence is publicly documented, weakening lockdown for a public-facing kiosk; custom sequence must be communicated to authorized maintenance staff |
| 6 | **MEDIUM** | Free-value | Exact `AllowedApps` set (AUMID/DesktopAppPath list) + Start/taskbar pin layout | No universal default; a missing dependency app silently breaks the app that needs it (AppLocker rule generation) |
| 7 | **LOW-MEDIUM** | Enumerable | `FileExplorerNamespaceRestrictions` level: block everything / Downloads only / Removable drives only / both / no restriction | Governs data-exfiltration vs. usability tradeoff for the kiosk session |
| 8 | **LOW** | Free-value | Taskbar visibility (`ShowTaskbar`) and custom taskbar pin layout | Cosmetic/workflow choice, low blast radius if wrong |

### Recipe 4 — Android Dedicated, MHS Multi-App (RE-225)

| # | Severity | Type | Decision | Consequence if wrong |
|---|----------|------|----------|----------------------|
| 1 | **CRITICAL** (already locked as Case-1 per PROJECT.md) | Branching | Token type: **Standard** (this recipe's worked path) vs. **Entra shared device mode** (routing cross-link only) | Irreversible within the enrollment profile — revoke token, recreate profile, redistribute QR/enrollment artifact to every field site (`05:129`) |
| 2 | **HIGH** (Case-2 per PROJECT.md) | Enumerable | Provisioning method: QR / NFC / `afw#setup` / Zero-Touch, with Knox/ZT Samsung mutual exclusion | Fully documented in `05-dedicated-devices.md` — cross-link; wrong choice on Samsung hardware causes out-of-sync enrollment state (CRITICAL per that doc's own severity table) |
| 3 | **HIGH** | Enumerable | MHS `Enable sign in`: **FALSE** (default, no identity, matches Standard token) / **TRUE + `Sign in type = Other`** (lightweight accountability, no SSO) / **TRUE + `Sign in type = Microsoft Entra ID`** (a trap without the SDM token — login prompt, zero SSO benefit) | Choosing Entra-ID sign-in type without the SDM token adds user friction with no payoff; this directly answers the research question on sign-in behavior outside Entra SDM |
| 4 | **HIGH** | Enumerable | Debug-menu exposure: `Enable easy access debug menu` (True/False) + `Maximum number of attempts` + `Time before retry` | Leaving the debug menu easily accessible or attempts unlimited weakens the exit-PIN's brute-force resistance — a genuine delta over `05-dedicated-devices.md`'s base PIN-sync coverage |
| 5 | **MEDIUM** | Branching | Offline/no-network app access + "app access without sign-in" allow-lists | Only meaningful if `Enable sign in = TRUE`; wrong scoping leaves the wrong apps reachable during outages or pre-authentication |
| 6 | **MEDIUM** | Free-value | Grid size (`columns;rows`), managed-folder grouping/icon style, wallpaper URL, screensaver timing | Content/branding decision, no universal default |
| 7 | **MEDIUM** | Enumerable | Virtual home button: disabled / `swipe_up` / `float` | Governs whether users have any way back to the MHS root without the exit-PIN flow; interacts with the system-navigation anti-feature above |
| 8 | **LOW** | Enumerable | Session PIN complexity: simple / complex / complex numeric only / alphanumeric complex | Only relevant if `Enable sign in = TRUE`; low blast radius, easily changed later |

---

## Already Covered — Do NOT Re-Document

### RE-224 (Windows Multi-App Kiosk) — already shipped in RE-222, cross-link only

- Single-app kiosk configuration in full (RE-222 Step 5a) — **one-line cross-link**, zero edits to RE-222 per `check-phase-130.mjs:64/67` literal-string assertion.
- AUMID discovery via `Get-StartApps` — identical pattern, reuse verbatim.
- Self-deploying prerequisites (TPM 2.0, wired Ethernet at OOBE, device-phase-only ESP) — cross-link to `admin-setup-apv1/08-self-deploying.md` and `admin-setup-apv1/03-esp-policy.md`.
- Dynamic device group creation — cross-link to `admin-setup-apv1/04-dynamic-groups.md`.
- Windows App / AVD feed-subscription mechanics — RE-224 is **not** AVD-scoped; do not assume Windows App is one of the allow-listed apps unless the org's specific deployment calls for it.
- 802.1X post-enrollment Wi-Fi — cross-link to `admin-setup-8021x/*` if relevant.
- The general `KioskModeApp`/`ShellLauncher` mutual-exclusion statement (already in RE-222) — but the `Configuration`-node-supersedes-`KioskModeApp` No-Op nuance is **new** and belongs in RE-224.

### RE-225 (Android Dedicated MHS Multi-App) — already shipped in `05-dedicated-devices.md`, cross-link only

- Persona/scenario overview (Intune Admin + LOB Operations Owner split, 4-scenario table).
- Enrollment profile Deltas 1-4 (token type choice mechanics, static device group requirement, MHS Required-assignment requirement, token expiry/QR rotation discipline).
- All four provisioning methods (QR, NFC, `afw#setup`, Zero-Touch) and the Knox/ZT Samsung mutual exclusion.
- The exit-kiosk PIN **dual-location synchronization requirement itself** (device restrictions + MHS app config must match) — RE-225 only *adds* the debug-menu-gesture and max-attempts/retry-delay lockout delta, never re-explains the base sync requirement.
- Android 15 FRP re-provisioning 3-pathway table — a lifecycle/re-provisioning concern, out of RE-225's "reach a working configuration" scope.
- MGP (Managed Google Play) binding prerequisite — cross-link to `01-managed-google-play.md`.
- Glossary terms (Dedicated, MHS, Entra SDM, Play Integrity, DPC, `afw#setup`) — cross-link only; **never redefine inline** (glossary coordinate-freeze guardrail, CARVE-1 contingency in PROJECT.md).

---

## Verification — What an Admin Can Actually Observe

### RE-224 Windows Multi-App Kiosk

- [ ] Device signs in (autologon, no prompt — or named Entra user/group, prompted) and lands directly in the restricted Start menu showing **only** the allow-listed apps/tiles.
- [ ] Taskbar matches configuration: hidden if `ShowTaskbar=false`, or showing only the configured pinned apps if a custom `TaskbarLayout` is set.
- [ ] File Explorer access (if reachable) matches the configured `FileExplorerNamespaceRestrictions` — Downloads and/or Removable drives browsable only if explicitly allowed.
- [ ] Attempting to launch any app **not** in `AllowedApps` fails or is unreachable — confirms the generated AppLocker rules are active.
- [ ] **CORRECTED 2026-07-25 (adversarial review) — the `AssignedAccess/Status` check is NOT executable and has been replaced.** `Status` is `Get`-only, the WMI bridge exposes no Status property, and MDMDiagReport does not carry AssignedAccess. Substitute these observable checks: the device signs in and lands in the restricted Start menu showing only allow-listed apps; a non-allow-listed app fails to launch (confirms the generated AppLocker rules); a representative allow-listed app's **secondary** flow (file picker, print, OAuth redirect) completes without an app-blocked error; and — admin-at-console, secondary — the `Applications and Services Logs > Microsoft > Windows > AssignedAccess > Operational` log is clean. This mirrors RE-223's own precedent at `02:271` (*"Verification is on-device… does not surface in Intune reports"*). **CORRECTED 2026-07-30:** the `Operational` channel is disabled by default and must be enabled before the first kiosk sign-in; for some failures events are captured only once.
- [ ] The configured breakout sequence (default CTRL+ALT+DEL, or custom) successfully exits Assigned Access for authorized maintenance staff.
- [ ] Signing in with the kiosk Entra account/group produces **no** `interaction_required` entry in `Microsoft-Windows-AAD/Operational` (Event ID 1098) — confirms the CA exclusion is correctly scoped.

### RE-225 Android Dedicated MHS Multi-App

- [ ] Device boots directly into the MHS grid showing exactly the allow-listed apps — either with no sign-in prompt (`Enable sign in=FALSE`, the Standard-token default) or the configured sign-in screen if `TRUE` was chosen.
- [ ] Pressing Home/Overview/back-navigation does **not** surface the standard Android launcher or any app outside the allow-list — confirms Lock Task Mode is actually engaged, not just MHS installed.
- [ ] Entering the exit-kiosk PIN via the back-button-~15-times debug-menu gesture, with the **same** PIN configured on both the Device Restrictions and MHS app config policies, successfully exits lock-task mode.
- [ ] Entering a **mismatched** PIN reproduces the documented error string ("A PIN to exit kiosk mode has not been set by your IT admin") — a genuine negative-case check confirming the sync requirement.
- [ ] If a max-attempts/retry-delay lockout is configured, deliberately failing the PIN the configured number of times triggers the retry-delay window.
- [ ] Folder/app icons cannot be dragged, renamed, or reordered by a test user (`Lock Home Screen=TRUE` default).
- [ ] End users can switch between already-visible Wi-Fi networks from the MHS settings menu but cannot toggle the Wi-Fi radio itself, and cannot manually initiate a connection to an Intune-preconfigured Enterprise network (device connects to it automatically instead).
- [ ] Intune admin center confirms the device enrolled under the **Standard** Dedicated token type, not Entra shared device mode — confirms Case-1 was applied correctly.

---

## Feature Dependencies

```
[Recipe 3: Windows Multi-App Kiosk (RE-224)]
    └──cross-links, never re-authors──> [RE-222 Step 5a: single-app kiosk configuration]
    └──requires──> [Existing: Autopilot self-deploying profile doc (RE-084) — IF autologon/local-account branch chosen]
    └──requires──> [Existing: Dynamic device groups doc]
    └──requires──> [Existing: apv1-vs-apv2.md — self-deploying is APv1-only, same as RE-222]
    └──shares mechanism with, does NOT duplicate──> [RE-222 Step 5b: SharedPC configuration]
                        (IF the SharedPC-layering differentiator is chosen)
    └──new, RE-224-owned──> [Custom OMA-URI / AssignedAccessConfiguration XML mechanism —
                        genuinely new content, no existing corpus doc covers this]
    └──conflicts with──> [Intune Templates > Kiosk > Multi app kiosk GUI on Windows 11]
                        (Windows-10-only per first-party doc — anti-feature, not a valid alternate path)

[Recipe 4: Android Dedicated MHS Multi-App (RE-225)]
    └──requires, cross-links, never re-authors──> [05-dedicated-devices.md: scenarios, enrollment-profile
                        deltas, provisioning methods, exit-PIN sync base requirement, FRP re-provisioning]
    └──requires──> [Existing: 01-managed-google-play.md MGP binding]
    └──routes to but does NOT worked-branch──> [Entra shared device mode — Case-1 alternate, out of scope]
    └──new, RE-225-owned──> [## Steps + ## Verification + Anti-Feature table structure —
                        the exact structural gap 05-dedicated-devices.md has today]
    └──new, RE-225-owned──> [MHS app-config-level detail: Enable sign in / Sign in type / debug-menu
                        lockout hardening / grid & folder curation — none of this lives in 05-dedicated-devices.md,
                        which stops at the enrollment-profile and exit-PIN-sync layer]

[Both recipes]
    └──share doc-class dependency on──> [v1.18 Device Recipe doc-class + template (STD-05 decision-point
                        block format) — already resolved, not re-litigated by this research]
```

### Dependency Notes

- **RE-224's central new fact is the delivery mechanism, not a new Windows feature.** Assigned Access itself, the multi-app AllAppList profile type, and the CA/EAS anti-features are all first-party, well-established Windows capabilities — what's genuinely load-bearing and previously unverified in this corpus is *which Intune surface reaches Windows 11*.
- **RE-224 must resolve two PROJECT.md-flagged gray areas as worked decision blocks, not silent defaults:** the enrollment-path/account-model fork (Decision 2) and the multi-app+SharedPC layering choice (Decision 4). Both have genuine, MS-documented alternate paths — neither should be collapsed to a single "obvious" answer.
- **RE-225's job is almost entirely structural, not factual.** `05-dedicated-devices.md` already contains nearly all the mechanical facts (enrollment, provisioning, exit-PIN sync); RE-225's real content contribution is (a) the missing Steps/Verification/Anti-Feature structure the parent doc lacks, and (b) the MHS-*app-config*-level detail (sign-in behavior, debug-menu hardening, curation settings) that sits one layer below what the parent doc covers.
- **Both recipes must state their anti-features with the reason, not omit unsupported behavior silently** — this is the explicit quality bar from the milestone's downstream consumer, and is especially large for RE-225 per the milestone's own framing.

## MVP Definition

### Launch With (v1 — both recipes)

- [ ] RE-224: linear happy-path steps (self-deploying or user-driven enrollment → Custom OMA-URI Assigned Access XML deployment → app pre-provisioning → verification) — table-stakes only
- [ ] RE-224: Decision 1 (delivery mechanism) stated as fact/prerequisite, not a genuine choice — the GUI path is simply wrong for Windows 11, this is the Plan-1 gate finding
- [ ] RE-224: Decision 2 (account model) and Decision 4 (SharedPC layering) as embedded STD-05 decision blocks — these are the genuine forks
- [ ] RE-224: anti-feature callouts for CA/MFA exclusion, EAS-autologon interaction, GUI-on-Windows-11, group+single-app mismatch — cheap to document, high consequence if missed
- [ ] RE-225: `## Steps` + `## Verification` + Anti-Feature table sections — the structural gap that IS the recipe
- [ ] RE-225: Decision 3 (`Enable sign in` mode) as the dominant embedded decision block — this is the direct answer to "how does sign-in work outside Entra SDM"
- [ ] RE-225: anti-feature callouts for Entra-ID-sign-in-without-SDM trap, system-navigation sign-in bypass, Notification-windows/Overlay-permission interaction, Wi-Fi toggle/connect limitations, folder-reorder limitation

### Add After Validation (v1.x)

- [ ] RE-224: SharedPC+multi-app-kiosk combined field-level configuration steps, once phase-time-verified against a live tenant
- [ ] RE-224: full `Status`/`StatusConfiguration` runtime-monitoring worked example
- [ ] RE-225: debug-menu max-attempts/retry-delay hardening as a fully worked example, not just a decision block
- [ ] RE-225: offline/no-sign-in app-access allow-list worked example (only relevant if `Enable sign in=TRUE` is chosen)

### Future Consideration (v2+)

- [ ] RE-224: digital-signage-style Windows kiosk variant (out of this milestone's scope)
- [ ] RE-225: Entra shared device mode as a fully-worked sibling recipe (explicitly deferred, cross-link only in this milestone)
- [ ] Both: automation/scripting layer (Graph/PowerShell bulk deployment of the OMA-URI XML or MHS app-config JSON) beyond the manual admin-center walkthrough

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| RE-224 Plan-1 gate fact (OMA-URI mechanism, stated as prerequisite) | HIGH | LOW (already verified) | P1 |
| RE-224 Decision 2 (account model) + Decision 4 (SharedPC layering) blocks | HIGH | MEDIUM | P1 |
| RE-224 anti-feature callouts (CA/EAS/GUI-trap/group-mismatch) | HIGH | LOW | P1 |
| RE-224 happy-path steps | HIGH | MEDIUM | P1 |
| RE-224 Status/StatusConfiguration monitoring worked example | MEDIUM | MEDIUM | P2 |
| RE-224 SharedPC+kiosk combined field-level steps | MEDIUM | HIGH | P2 |
| RE-225 Steps + Verification + Anti-Feature structural sections | HIGH | MEDIUM | P1 |
| RE-225 Decision 3 (`Enable sign in` mode) block | HIGH | LOW | P1 |
| RE-225 anti-feature callouts (large set) | HIGH | LOW-MEDIUM | P1 |
| RE-225 debug-menu hardening worked example | MEDIUM | LOW | P2 |
| RE-225 offline/no-sign-in allow-list worked example | LOW-MEDIUM | LOW | P3 |
| Entra SDM as a full sibling recipe | LOW (out of stated scope) | HIGH | P3 (defer) |

**Priority key:**
- P1: Must have — both recipes ship broken/incomplete without these
- P2: Should have — meaningfully improves the recipe but the core device still works without it
- P3: Nice to have / explicitly out of this milestone's stated scope

## Precedent / Reference Implementations Reviewed

| Source | What it covers | How it informed this research |
|--------|-----------------|-------------------------------|
| Microsoft Learn — Kiosk template, AssignedAccess CSP, Assigned Access configuration-file guide, multi-app-kiosk troubleshooting article, frontline-worker Windows guide, Managed Home Screen app-config reference | First-party authoritative baseline for both recipes | Primary source for essentially all HIGH-confidence table-stakes, decision-point, and anti-feature rows |
| Community walkthroughs (petervanderwoude.nl, hiraniconfigmgr.com, cloudinfra.net, and others) for Windows 11 multi-app kiosk OMA-URI deployment | Practical step-by-step confirmation of the exact OMA-URI/Custom-profile deployment workflow | Corroborates the deployment mechanism at MEDIUM confidence; the CSP node itself is confirmed HIGH via MS Learn directly |
| Corpus (verified directly, not web research): `docs/recipes/01-shared-windows-avd-client.md`, `docs/admin-setup-android/05-dedicated-devices.md`, `docs/_templates/recipe-template.md`, `.planning/milestones/v1.18-phases/130-recipe-1-shared-windows-avd-client-device/130-RESEARCH.md`, `.planning/milestones/v1.4-phases/38-dedicated-devices-admin/38-RESEARCH.md` | Existing corpus shape, prior research assumptions log, and the specific unverified claim this session resolves | Established the exact delta-scope boundary and confirmed which facts are already covered vs. genuinely new |

## Sources

- [Kiosk settings for Windows and Holographic devices in Microsoft Intune | Microsoft Learn](https://learn.microsoft.com/en-us/intune/device-configuration/templates/configure-kiosk) — HIGH (fetched in full; ms.date 2026-02-10, updated_at 2026-07-01; the Plan-1 gate's primary source)
- [AssignedAccess CSP | Microsoft Learn](https://learn.microsoft.com/en-us/windows/client-management/mdm/assignedaccess-csp) — HIGH (fetched in full; ms.date 2025-03-12; OMA-URI node, Status/StatusConfiguration, KioskModeApp No-Op behavior)
- [Create an Assigned Access configuration file | Microsoft Learn](https://learn.microsoft.com/en-us/windows/configuration/assigned-access/configuration-file) — HIGH (fetched in full; ms.date 2025-03-07, updated_at 2025-09-26; Profiles/Configs, AutoLogonAccount, group/nested-group limitations, EAS-autologon interaction)
- [Users can't log on to Windows 10 or Windows 11 computers with multi-app kiosk profile assigned | Microsoft Learn](https://learn.microsoft.com/en-us/troubleshoot/mem/intune/device-configuration/users-cannot-logon-windows-multi-app-kiosk) — HIGH (fetched in full; ms.date 2026-03-30, updated_at 2026-04-17; CA/MFA anti-feature, verbatim Event Viewer signatures)
- [Get started with Windows frontline worker devices - Microsoft Intune | Microsoft Learn](https://learn.microsoft.com/en-us/intune/solutions/frontline-worker/windows) — HIGH (fetched in full; ms.date 2025-05-29, updated_at 2026-07-01; self-deploying-as-recommended-enrollment, SharedPC+kiosk layering pattern)
- [Configure the Microsoft Managed Home Screen App - Microsoft Intune | Microsoft Learn](https://learn.microsoft.com/en-us/intune/app-management/configuration/configure-managed-home-screen) — HIGH (fetched in full; ms.date 2026-04-21, updated_at 2026-06-22; every MHS setting, sign-in/SDM interaction, debug-menu/exit-PIN detail, Wi-Fi/system-navigation anti-features)
- Windows 11 multi-app kiosk OMA-URI deployment workflow (community corroboration: petervanderwoude.nl, hiraniconfigmgr.com, cloudinfra.net, quantem.io, cloudwisdom.co.uk) — MEDIUM (deployment-workflow specifics; CSP node itself independently HIGH via MS Learn)
- Existing corpus (verified directly): `docs/recipes/01-shared-windows-avd-client.md` (RE-222), `docs/recipes/02-shared-ipad-full-provisioning.md` (RE-223), `docs/admin-setup-android/05-dedicated-devices.md` (RE-097), `docs/_templates/recipe-template.md`, `.planning/milestones/v1.18-phases/130-recipe-1-shared-windows-avd-client-device/130-RESEARCH.md`, `.planning/milestones/v1.4-phases/38-dedicated-devices-admin/38-RESEARCH.md`, `.planning/PROJECT.md`

---
*Feature research for: Device Configuration Recipes #3 & #4 (Windows Multi-App Kiosk + Android Dedicated MMHS Multi-App) — v1.19*
*Researched: 2026-07-25*
