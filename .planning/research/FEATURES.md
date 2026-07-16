# Feature Research

**Domain:** Intune/Autopilot device-configuration "recipe" documentation — two new recipes: (1) self-deploying Entra-joined shared Windows AVD-client device, (2) fully-provisioned Shared iPad
**Researched:** 2026-07-16
**Confidence:** HIGH (both recipes verified against current Microsoft Learn + Apple Support pages, cross-checked against existing corpus docs; a small number of items flagged MEDIUM where only community/GitHub reference sources were found)

## Feature Landscape

Two independent recipes. Each is broken into Table Stakes / Differentiators / Anti-Features below, then a combined **Admin Decision Points** section (the downstream consumer's primary ask) follows both.

---

## Recipe 1 — Shared Windows AVD-Client Device (Autopilot Self-Deploying + Windows App)

### Table Stakes (Recipe Fails Without These)

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Autopilot **APv1** (classic) self-deploying deployment profile, **Entra-joined only** | Self-deploying mode does not exist in APv2 (Device Preparation) — APv2 ships user-driven only today. Hybrid join is also unsupported in self-deploying. | LOW | Corpus already has `docs/admin-setup-apv1/08-self-deploying.md` (RE-084) stating this; confirmed against `docs/apv1-vs-apv2.md` feature table row "Self-deploying mode: APv1 Yes / APv2 No" and current MS Learn/community sources. HIGH confidence. |
| **TPM 2.0 + wired Ethernet at OOBE**, zero Wi-Fi option pre-authentication | Self-deploying uses TPM attestation as the *only* auth mechanism; Wi-Fi requires a language/keyboard selection step that self-deploying skips, so Wi-Fi literally cannot be used to reach the Autopilot service pre-auth. | LOW | HIGH confidence — Microsoft Learn Q&A and existing corpus doc both state this as a hard constraint, not a preference. This directly feeds Admin Decision Point #2 below (what happens post-enrollment if the kiosk site is Wi-Fi-only). |
| ESP configured for **device phase only** (no user phase) | Self-deploying has no user affinity, so ESP never runs a user phase. | LOW | Reuses existing `admin-setup-apv1/03-esp-policy.md`; recipe should link, not re-document ESP mechanics. |
| **Windows App** as the AVD client (not legacy Remote Desktop / MSRDC) | The classic Remote Desktop client (MSRDC, Store + MSI) was retired for AVD/W365/Dev Box on **March 27, 2026** — already past as of this research date (2026-07-16). Any recipe authored today that references the old client is broken on day one. | LOW | HIGH confidence, multiple independent sources confirm the March 27, 2026 retirement and Windows App as the mandated successor. This is the single most load-bearing freshness fact in the recipe — call it out explicitly rather than let a reader infer it. |
| Windows App deployed via Intune as **Microsoft Store app (new)**, assigned **Required to a device group** | Device-group + Required install lands the app before any user signs in — required on a no-user-affinity device. User-group assignment only installs after a user signs in to a Cloud PC/session, which doesn't fit a walk-up shared kiosk. | LOW | Official MS Learn steps (`install-windows-365-app-intune`) confirm the exact admin-center flow; corpus's dynamic-groups doc (`04-dynamic-groups.md`) is the natural target-group mechanism. |
| **Device-context targeting for everything** (apps, feed/workspace URL, Wi-Fi, update ring) | Self-deploying has no primary user; any user-targeted policy silently never applies during/after deployment unless a specific user later signs into the box. | LOW | Directly reinforced by existing self-deploying doc's "No User Affinity" callout — this recipe inherits and extends that constraint to the AVD-specific pieces (feed URL, kiosk shell). |
| AVD host pool **feed/workspace subscription URL** configured for the device (Settings Catalog "RemoteApp and Desktop Connections" / `RemoteDesktop/AutoSubscription` policy area, `https://rdweb.wvd.microsoft.com/api/arm/feeddiscovery` or organization's custom feed URL) | Without this, Windows App launches with no subscribed resources — the user sees an empty app with nothing to click. | MEDIUM | MEDIUM confidence on device-vs-user CSP scope: most documented examples (community blogs, MS Q&A) show the `AutoSubscription` policy at `./User/Vendor/MSFT/Policy/Config/RemoteDesktop/AutoSubscription` (user-scoped, `HKEY_CURRENT_USER`). This directly collides with the "device-context only" table-stakes row above and is flagged as a genuine phase-time verification item — see Anti-Features and Gaps below. |
| **Assumes AVD infrastructure already exists** (host pools, session hosts, FSLogix) | Per PROJECT.md v1.18 scope guardrail — mirrors the v1.14 802.1X "assumes RADIUS exists" pattern. | N/A (scope boundary, not a build item) | This bounds the recipe to Intune/device-side config only; no host-pool or FSLogix authoring in scope. |

### Differentiators (Hardening / UX Polish)

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Full kiosk lockdown via **Assigned Access** (single-app or multi-app "restricted user experience") locking the shell to Windows App only | Prevents users from reaching the desktop, Settings, or other apps — turns the PC into a true single-purpose AVD terminal. | MEDIUM | HIGH confidence this capability exists (official MS Learn kiosk docs); MEDIUM confidence on exact Windows-App-specific packaging steps, sourced from a Microsoft-org GitHub reference implementation (`Azure/WindowsAppKiosk`) rather than a first-party how-to doc — flag for phase-time deep-dive if this path is chosen. |
| **Shared PC mode** (`SharedPC` CSP / Settings Catalog "Shared PC" category) as the alternative "real desktop, multiple named users" flavor | Lets each user sign in with their own Entra account, get a normal (if optimized/cleaned-up) Windows desktop, and use Windows App alongside other assigned apps — instead of a hard single-app kiosk. | MEDIUM | HIGH confidence — official, fully-documented CSP with concrete settings (`EnableSharedPCMode`, `AccountModel`, `DeletionPolicy`, `DiskLevelDeletion/Caching`, `InactiveThreshold`, `MaintenanceStartTime`, `RestrictLocalStorage`). This is the direct implementation of Admin Decision Point #1 (kiosk vs. shared desktop). |
| Windows App **auto-logoff / session-reset behaviors** (`ResetAppOnCloseOnly`, `ResetAppAfterConnection`, `ResetAppOnIdle`) | Ensures the next walk-up user doesn't inherit the prior user's AVD session state — session hygiene without a full sign-out flow. | LOW-MEDIUM | MEDIUM confidence — sourced from the `Azure/WindowsAppKiosk` reference repo, not yet cross-verified in first-party Windows App admin docs at time of research. Worth a documentation-freshness callout in the recipe (similar to the corpus's existing `[CITED: training; needs live verification]` convention used in the Shared iPad lifecycle doc). |
| Local **autologon** into a dedicated kiosk account so the box boots straight to the Windows App sign-in screen with no Windows credential prompt | Removes a manual step for a walk-up-and-use terminal. | LOW | MEDIUM confidence, same GitHub-reference-sourced caveat as above. |
| Post-enrollment **certificate-based Wi-Fi (802.1X EAP-TLS)** profile, for sites that can't run permanent wired Ethernet to the kiosk | Wired Ethernet is mandatory only at OOBE/enrollment time; ongoing operation can move to Wi-Fi once the device has an Intune-delivered Wi-Fi profile + cert. | MEDIUM | Directly reuses the existing `docs/admin-setup-8021x/*` corpus (v1.14) — a genuine cross-milestone dependency, not net-new research. This is Admin Decision Point #2. |
| **Update ring** / Windows Update for Business policy tuned for a kiosk (deferral, active hours, maintenance window aligned with `SharedPC` `MaintenanceStartTime`) | Shared/always-on kiosks need a deliberate patch cadence — default consumer-style update behavior can interrupt active sessions. | LOW | MEDIUM confidence — general Windows Update for Business guidance is well-established; the specific "recommended ring for kiosks" number is a judgment call, not a documented Microsoft default. Frame as an admin decision, not a fixed table-stakes value. |

### Anti-Features (Common Mistakes That Break This Scenario)

| Feature/Mistake | Why Attempted | Why It Breaks | Alternative |
|------------------|----------------|-----------------|-------------|
| Selecting **hybrid Entra join** with a self-deploying profile | Admin assumes hybrid join is always safer/more compatible with on-prem policy | Self-deploying has no user affinity and cannot complete a hybrid join flow — deployment fails at attestation/join. Already documented as a hard failure in the corpus's RE-084 guide. | Entra-joined only; if hybrid/on-prem AD integration is required, this device does not fit the self-deploying recipe. |
| Deploying via **APv2 (Device Preparation)** expecting self-deploying support | APv2 is Microsoft's newer, "simpler" Autopilot experience — admins reach for it by default | APv2 supports user-driven only today; there is no self-deploying or pre-provisioning path in APv2. | Use APv1 (classic Windows Autopilot) for this recipe — reuse the corpus's `apv1-vs-apv2.md` decision reference. |
| Relying on **Wi-Fi during OOBE/enrollment** | Site has no wired drop near the kiosk location | Self-deploying cannot use Wi-Fi pre-authentication (no language/keyboard step) — enrollment simply won't proceed. | Stage the device over wired Ethernet once (even temporarily) for enrollment; move to Wi-Fi post-enrollment via an Intune Wi-Fi profile if needed for ongoing operation. |
| Still packaging/deploying the **legacy Remote Desktop client (MSRDC)** | Older internal runbooks, blog posts, and muscle memory still reference `RemoteDesktop_x64.msi` | Retired March 27, 2026 for AVD/W365 — no further updates/support; recipe would ship already-broken guidance. | Windows App only. |
| Assigning the **AVD feed/workspace URL as a user-targeted policy** on a no-user-affinity device | Most public walkthroughs (and the underlying CSP's documented default location) configure `AutoSubscription` as a per-user setting | On a self-deploying device there's no primary user during ESP, so a user-targeted feed policy may never apply until/unless someone happens to sign in — the terminal can sit "empty." | Prefer device-context configuration where available, or explicitly design the recipe around a bootstrap first-sign-in step; flag as a phase-time verification item (see Gaps). |
| Configuring **both Shell Launcher and Assigned Access (multi-app kiosk) simultaneously** | Admin tries to "layer" lockdown mechanisms for extra safety | Microsoft explicitly states you cannot configure both on the same system — one will conflict with/override the other. | Pick one shell-replacement mechanism per the kiosk-vs-shared-desktop decision (Decision Point #1) and commit to it. |
| Assigning apps to this device using **user-licensed VPP / user groups** | Habit from standard user-driven Windows deployments | No primary user exists for app-license attribution to resolve against during/after self-deploying provisioning. | Device-based licensing / device-group assignment throughout, exactly as the existing self-deploying guide (RE-084) already documents for non-AVD apps. |

---

## Recipe 2 — Shared iPad (Full Provisioning)

### Table Stakes (Recipe Fails Without These)

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| **Supervised + ADE enrollment**, `User affinity = Enroll without user affinity`, `Shared iPad = Yes`, `Supervised = Yes` in the ADE enrollment profile | Shared iPad is only supported on supervised devices enrolled via Automated Device Enrollment; a device wipe is required if Shared iPad is enabled on an already-enrolled non-supervised device. | LOW | HIGH confidence, verbatim from Microsoft Learn (`intune/device-enrollment/apple/shared-ipad`). Corpus already has the base ADE enrollment profile doc (`admin-setup-ios/03-ade-enrollment-profile.md`) with supervised-only callouts — this recipe layers Shared iPad-specific toggles on top, doesn't duplicate ADE-profile mechanics. |
| Minimum **32 GB storage**, **iPadOS 13.3+** (13.4+ needed for the tap-to-guest temporary-session flow) | Apple's hard device-eligibility floor. | N/A (prerequisite, not built) | HIGH confidence, Apple Support official. |
| **Managed Apple Account via federated Entra sign-in** (auto-provisioned matching UPN at first sign-in) | This is what makes "sign in with your work identity" work on the lock screen without a separate manual account-creation step. | MEDIUM | HIGH confidence (MS Learn). Depends on Apple Business federation already being configured — the existing corpus's `docs/cross-platform/apple-business/08-managed-apple-account-provisioning.md` (OU-06) is the natural dependency/cross-link, not something to re-author. |
| Apps assigned as **Required to device groups** (never "Available", never user-licensed VPP) | Shared iPad disables self-service App Store installs by design, and Company Portal / the Company Portal website are explicitly **not supported** on Shared iPad. | LOW | HIGH confidence, direct MS Learn quotes: "App Store installations disabled... recommended disabling the App Store", "Company Portal and available apps not supported", "You must assign apps as required to device groups. Available apps are not supported", and the app-type table showing user-licensed VPP = Not applicable. This corrects a default assumption inherited from the existing non-Shared-iPad app-deployment guide (`admin-setup-ios/05-app-deployment.md`) — the recipe must call out that Shared iPad narrows the model, not link that guide as-is. |
| Correct **device-vs-user profile applicability** split | Wi-Fi/VPN/certificates/email settings are device-only; Home screen layout, notifications, and SSO extension are device-scoped on device-group assignment but user-scoped on user-group assignment; most device-restriction settings follow the same device/user duality. Getting this backwards produces a configuration that silently doesn't apply to the right sessions. | MEDIUM | HIGH confidence — this is the single most mechanically important table in MS Learn's Shared iPad doc and should be reproduced/summarized directly in the recipe rather than paraphrased loosely. |
| **Compliance policies, Conditional Access (device- and app-based), and app protection policies are NOT supported** on Shared iPad | Admins commonly assume "compliance policy" is table stakes for any managed device — on Shared iPad it's actively unsupported. | N/A (must-document constraint) | HIGH confidence, explicit MS Learn "Known limitations" statement. This directly contradicts the milestone's existing-corpus assumption that "compliance policy guides" apply as-is (`admin-setup-ios/06-compliance-policy.md`) — the recipe must flag this divergence rather than link that guide as a normal dependency. |

### Differentiators (Optimal-Configuration Polish)

| Feature | Value Proposition | Complexity | Notes |
|---------|--------------------|------------|-------|
| **Per-role layered configuration** — common apps/profiles on the device group, role-specific overlays (home screen layout, allow/block app lists) on user groups | Lets one physical iPad pool serve multiple job roles/classes with a differentiated experience per signed-in identity, without provisioning separate device pools per role. | MEDIUM | HIGH confidence — this is Microsoft's own documented "recommended policy and app assignment" pattern, including the explicit worked examples (Wi-Fi + VPP common to device group, home screen layout varies by user group). |
| **Per-user storage quota** (`QuotaSize` key, iPadOS 17+) | Bounds how much of the shared device's storage a single signed-in session can consume, protecting session-eviction fairness on a heavily-shared device. | LOW | MEDIUM/HIGH confidence — confirmed via Apple Support; exact Intune Settings Catalog exposure path not yet verified against a live MS Learn page (flag for phase-time verification). |
| **Home screen layout** profile scoped per role via user groups | Gives each role a curated, distraction-free app layout rather than the full device app list. | LOW | HIGH confidence, directly documented. |
| Deliberate **temporary/guest session policy tuning** (leave enabled for walk-up/visitor use vs. block entirely) | Temporary sessions are enabled by default with Shared iPad — many orgs will want to explicitly decide rather than inherit the default. | LOW | HIGH confidence — MS Learn: "Temporary sessions are allowed by default with Shared iPad," configurable via the `Block Shared iPad temporary sessions` device restriction. This is Admin Decision Point #1 below. |

### Anti-Features (Common Mistakes That Break This Scenario)

| Feature/Mistake | Why Attempted | Why It Breaks | Alternative |
|------------------|----------------|-----------------|-------------|
| Assigning apps as **"Available"** instead of Required | Habit from standard iOS/iPadOS app deployment (Available = self-service via Company Portal) | Not supported on Shared iPad at all — Company Portal itself isn't supported on Shared iPad. | Required, device-group assignment only. |
| Assigning **user-licensed VPP apps** | Looks equivalent to device-licensed VPP in the admin center | Explicitly "Not applicable" for Shared iPad per MS Learn's app-type applicability table — silently doesn't deploy. | Device-licensed VPP apps, device-group assigned. |
| Assigning a **compliance policy / Conditional Access policy / app protection policy** to the Shared iPad device or app | Standard org security baseline reflex — "every managed device needs a compliance policy" | Not supported on Shared iPad; gives a false sense of enforced security posture. | Document this explicitly as a known gap/limitation in the recipe rather than silently omitting compliance coverage — the recipe should say *why* compliance isn't part of this configuration, not just leave it out. |
| Assigning an **email profile** | Reasonable assumption that shared-use devices still need mail access | MS Learn: "Email profiles aren't supported with Shared iPad. An error occurs when you assign an email profile." | Direct users to a browser-based or app-based (e.g., Outlook app inside the user's own session) mail experience instead, if required. |
| Trying to manage **passcode complexity** through the standard iOS device-restriction passcode policy | Standard hardening reflex | Shared iPad enforces a fixed 8-character alphanumeric passcode that ignores the standard passcode-complexity/length settings; only the sign-in **grace period** is admin-configurable. | Set the grace period only; don't author a passcode-complexity section for this recipe. |
| Setting the **same setting to different values** across a device-group assignment and a user-group assignment | Admin wants slightly different behavior for different roles and layers profiles without checking for overlap | MS Learn explicitly warns the applied value "can't be pre-determined" when conflicting, and Intune's conflict resolution (apply first-assigned) may not match the admin's intent. | Configure each setting exactly once, in either the device-group baseline or a role-specific user-group overlay — never both. |

---

## Admin Decision Points ("Ask the Admin" Moments)

These are the concrete, org-specific choices each recipe's decision-point blocks should surface — verified as genuinely admin-choice-shaped (not resolvable by the recipe author) rather than settings with an obvious universal default.

### Recipe 1 — Shared Windows AVD-Client Device

1. **Kiosk full lockdown vs. shared desktop.** Assigned Access (single-app or multi-app, shell restricted to Windows App only) vs. Shared PC mode (real Windows desktop, multiple named Entra users sign in, other apps available, `AccountModel`/`DeletionPolicy` govern account cleanup). This is the dominant fork — it determines which entire config path (kiosk CSPs vs. SharedPC CSP) the rest of the recipe follows. Cannot configure both simultaneously (confirmed conflict).
2. **Permanent wired Ethernet vs. Wi-Fi after enrollment.** Determines whether the recipe needs to layer in an 802.1X Wi-Fi + certificate profile (dependency: existing `admin-setup-8021x` corpus) for ongoing operation, since wired Ethernet is mandatory only at OOBE.
3. **Which AVD host pool(s)/workspace feed URL** the device should point to — inherently environment-specific, no universal default; also determines single-workspace vs. multi-workspace subscription.
4. **Update ring / patch cadence and maintenance window** for an always-on shared kiosk — org patch-policy dependent, ties into `SharedPC` `MaintenanceStartTime` if Shared PC mode is chosen.
5. **Session reset/auto-logoff behavior and idle timeout** (`ResetAppOnCloseOnly` / `ResetAppAfterConnection` / `ResetAppOnIdle`, and any Shared PC `InactiveThreshold`) — a session-hygiene policy call, not a technical constraint.
6. **Account exemption from Shared PC cleanup** (if Shared PC mode is chosen) — whether any local/diagnostic account should be exempted from the automatic deletion policy via the `SharedPC\Exemptions` registry mechanism.
7. **Guest/anonymous sign-in allowed?** (`AccountModel` Guest/Kiosk options, if Shared PC mode is chosen) — whether the device should permit fully anonymous local sign-in or require every session to be tied to an Entra account.

### Recipe 2 — Shared iPad

1. **Temporary/guest sessions on or off.** Enabled by default; the recipe must make the admin explicitly decide (walk-up/visitor access convenience vs. strict managed-account-only policy) rather than silently inherit the default.
2. **Per-role layered configuration vs. one-size-fits-all.** Does every user of a given iPad pool get an identical experience (single device-group baseline, no user-group overlays), or do different roles get different home screen layouts / allow-lists via user-group overlays layered on the device-group baseline?
3. **Per-user storage quota value** (`QuotaSize`, iPadOS 17+) — a sizing decision based on device storage, expected concurrent user count, and per-user app/data footprint; no universal default exists.
4. **Session idle timeout** value (minimum 30 seconds; 0 = no timeout) and **offline re-authentication grace period** — org security-policy call.
5. **App portfolio and licensing model** — which apps ship to the device group as Required device-licensed VPP apps (the only supported model) — a content/procurement decision, not a technical one.
6. **Home screen layout** — single shared layout vs. per-role layout via user-group overlay.
7. **Max resident/cached user sessions per device** — an implicit storage-vs-headcount sizing tradeoff Apple deliberately leaves uncapped by policy; the recipe should frame this as a planning decision (how many named users will realistically use one physical iPad) rather than a config field, since Apple does not publish a hard maximum and Intune does not expose a direct "max sessions" setting. **Flag for phase-time verification** — confirm whether the currently-exposed Settings Catalog surface has changed since the corpus's existing (2026-05-21, `[CITED: training; needs live verification]`) OU-07 lifecycle doc was authored.

---

## Feature Dependencies

```
[Recipe 1: Shared Windows AVD device]
    └──requires──> [Existing: Autopilot APv1 self-deploying profile doc (RE-084)]
    └──requires──> [Existing: ESP device-phase policy doc]
    └──requires──> [Existing: Dynamic device groups doc]
    └──requires──> [Existing: apv1-vs-apv2.md decision reference (RE-177) — rules out APv2]
    └──conditionally requires──> [Existing v1.14: 802.1X Wi-Fi/cert admin-setup docs]
                                      (only if Decision Point #2 = "move to Wi-Fi post-enrollment")
    └──conflicts with──> [Legacy Remote Desktop client / MSRDC guidance] (retired 2026-03-27)

[Recipe 2: Shared iPad]
    └──requires──> [Existing: iOS/iPadOS ADE enrollment profile doc, supervised-only callout]
    └──requires──> [Existing: Apple Business federated Managed Apple Account provisioning (OU-06)]
    └──narrows/overrides──> [Existing: iOS app-deployment doc's VPP device/user-licensing model]
                                 (user-licensed VPP + "Available" assignment do NOT apply to Shared iPad)
    └──excludes──> [Existing: iOS compliance-policy guide]
                       (compliance policies, CA, app protection are unsupported on Shared iPad —
                        recipe must explain the gap, not link the guide as applicable)
    └──cross-references, does not duplicate──> [Existing: docs/cross-platform/apple-business/
                       09-shared-ipad-lifecycle.md (OU-07 sub-org-admin operational lifecycle)]
                       (different audience/scope: ongoing OU-scoped operations vs. this recipe's
                        one-time full-provisioning walkthrough with embedded decision points)

[Both recipes]
    └──share doc-class dependency on──> [v1.18 Device Recipe doc-class + template
                       (RE-NNN registry, decision-point block format — resolved at discuss-phase,
                        not by this research)]
```

### Dependency Notes

- **Recipe 1 requires the APv1 vs. APv2 reference doc as a decided-not-a-choice input**: self-deploying is APv1-only. The recipe should state this as a fact up front (not re-litigate it as a decision point), citing RE-177.
- **Recipe 1 conditionally requires the 802.1X corpus**: only pulled in if the admin's answer to "wired or Wi-Fi post-enrollment" is Wi-Fi. Keep this as an *if-then* cross-link in the recipe rather than always inlining 802.1X content.
- **Recipe 2 narrows the existing app-deployment and compliance-policy guides**: this is the most important "watch out" for planning — the recipe cannot simply link those guides as generic dependencies the way Recipe 1 links ESP/dynamic-groups. It must actively call out where Shared iPad diverges from the general iOS guidance those docs describe.
- **Recipe 2 cross-references but does not duplicate the existing OU-07 Shared iPad lifecycle doc**: that doc is Apple Business Manager sub-org-admin governance (OU-scoped enrollment/session/sign-in/wipe operations); the new recipe is an Intune-admin-facing, one-time "get to a working configuration" walkthrough with embedded decision points. Overlapping content (e.g., Managed Apple Account provisioning, Find My pre-deployment disable) should link outward, not be re-authored.
- **Both recipes depend on the not-yet-resolved Device Recipe doc-class/template** (decision-point block format) — a discuss-phase gray area per PROJECT.md, out of scope for this research file.

## MVP Definition

### Launch With (v1 — both recipes)

- [ ] Recipe 1: linear happy-path steps (APv1 self-deploying profile → ESP device phase → Entra join → Windows App device-context install → feed URL configuration → verification) — table-stakes only
- [ ] Recipe 1: Decision Point #1 (kiosk lockdown vs. shared desktop) as an embedded "Ask the admin" block, since it forks the entire remaining config path
- [ ] Recipe 1: explicit anti-feature callouts for hybrid join, APv2, Wi-Fi-at-OOBE, and legacy MSRDC — these are the highest-cost mistakes and are cheap to document
- [ ] Recipe 2: linear happy-path steps (ADE profile Shared iPad toggle → Managed Apple Account federation → device-group Required VPP apps → device/user profile split → home screen layout → verification) — table-stakes only
- [ ] Recipe 2: Decision Point #1 (temporary sessions on/off) and the compliance-policy/Company-Portal/email anti-feature callouts — these are the mistakes MS Learn explicitly flags as silent failures

### Add After Validation (v1.x)

- [ ] Recipe 1: kiosk-lockdown implementation depth (Assigned Access packaging specifics, auto-logoff behaviors) — currently only MEDIUM-confidence, GitHub-reference-sourced; worth a dedicated phase-time verification pass before treating as authoritative
- [ ] Recipe 1: Shared PC mode as the fully-worked alternative path (if the org's decision leans shared-desktop over kiosk)
- [ ] Recipe 2: per-role layered configuration worked example (device-group baseline + user-group overlays)
- [ ] Recipe 2: storage quota (`QuotaSize`) sizing guidance

### Future Consideration (v2+)

- [ ] Recipe 1: Windows 365 Boot as a distinct sibling recipe (Cloud PC-specific boot-to-sign-in experience) — explicitly out of scope for this milestone, which targets AVD host pools, not Windows 365 Cloud PCs; do not conflate the two in this recipe
- [ ] Recipe 1: multi-host-pool / multi-workspace subscription scenarios
- [ ] Recipe 2: SCIM/OIDC+JIT automated Managed Apple Account provisioning depth (tenant-level, largely out of an Intune-admin-scoped recipe's hands — already covered at OU-06)
- [ ] Both: automation/scripting layer (e.g., bulk `QuotaSize` or Shared PC CSP configuration via Graph/PowerShell) beyond the manual admin-center walkthrough

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| Recipe 1 happy-path (self-deploying → Windows App → feed URL) | HIGH | MEDIUM | P1 |
| Recipe 1 kiosk-vs-shared-desktop decision block | HIGH | LOW | P1 |
| Recipe 1 anti-feature callouts (hybrid/APv2/Wi-Fi/MSRDC) | HIGH | LOW | P1 |
| Recipe 1 kiosk lockdown implementation depth | MEDIUM | HIGH | P2 |
| Recipe 1 Shared PC mode worked example | MEDIUM | MEDIUM | P2 |
| Recipe 2 happy-path (ADE toggle → Managed Apple Account → apps → profiles) | HIGH | MEDIUM | P1 |
| Recipe 2 unsupported-feature callouts (compliance/CA/email/Available apps) | HIGH | LOW | P1 |
| Recipe 2 temporary-session decision block | HIGH | LOW | P1 |
| Recipe 2 per-role layered configuration example | MEDIUM | MEDIUM | P2 |
| Recipe 2 storage quota guidance | LOW-MEDIUM | LOW | P3 |
| Windows 365 Boot sibling recipe | LOW (out of stated scope) | HIGH | P3 (defer) |

**Priority key:**
- P1: Must have for a working recipe (both recipes ship broken without these)
- P2: Should have — meaningfully improves the recipe but the device still works without it
- P3: Nice to have / explicitly out of this milestone's stated scope

## Precedent / Reference Implementations Reviewed

Not a commercial-competitor landscape (this is internal Intune documentation), but the following precedents informed table-stakes vs. differentiator framing:

| Source | What it covers | How it informed this research |
|--------|-----------------|-------------------------------|
| Microsoft Learn — Windows Autopilot self-deploying, SharedPC CSP, Windows App/W365 Intune install, Shared iPad devices | First-party authoritative baseline for both recipes | Primary source for all HIGH-confidence table-stakes rows |
| `Azure/WindowsAppKiosk` (Microsoft-org GitHub reference solution) | Reference scripts for locking a Windows thin client to Windows App via Assigned Access/Shell Launcher | Only found source for kiosk-specific Windows App packaging detail — marked MEDIUM confidence, flagged for phase-time deep verification |
| Ivanti / IBM MaaS360 / Cortado / Meraki third-party Shared iPad admin guides | Third-party MDM vendor documentation of the same Apple Shared iPad feature | Cross-checked (not primary-sourced) against Apple/MS first-party docs; used only to confirm no first-party detail was missed, not cited as authoritative |

## Sources

- [Windows Autopilot self-deploying mode | Microsoft Learn](https://learn.microsoft.com/en-us/autopilot/self-deploying) — HIGH
- [Windows Autopilot scenarios and capabilities | Microsoft Learn](https://learn.microsoft.com/en-us/autopilot/windows-autopilot-scenarios) — HIGH
- [Configure a shared or guest Windows device | Microsoft Learn](https://learn.microsoft.com/en-us/windows/configuration/shared-pc/set-up-shared-or-guest-pc) — HIGH (fetched in full; SharedPC CSP settings, PowerShell sample, exemption mechanism)
- [SharedPC CSP | Microsoft Learn](https://learn.microsoft.com/en-us/windows/client-management/mdm/sharedpc-csp) — HIGH
- [Using Intune, install the Windows app on devices | Microsoft Learn](https://learn.microsoft.com/en-us/windows-365/enterprise/install-windows-365-app-intune) — HIGH (fetched in full)
- [RemoteDesktop Policy CSP | Microsoft Learn](https://learn.microsoft.com/en-us/windows/client-management/mdm/policy-csp-remotedesktop) — MEDIUM (device-vs-user AutoSubscription scope not fully confirmed)
- [Windows Single-App and Multi-App Kiosk Configuration Options Overview | Microsoft Learn](https://learn.microsoft.com/en-us/windows/configuration/kiosk/) — HIGH (Shell Launcher vs. Assigned Access mutual exclusivity)
- [Azure/WindowsAppKiosk (GitHub, Microsoft org)](https://github.com/Azure/WindowsAppKiosk) — MEDIUM (fetched in full; kiosk packaging, autologon, session-reset behaviors)
- [Shared iPad devices - Microsoft Intune | Microsoft Learn](https://learn.microsoft.com/en-us/intune/intune-service/enrollment/device-enrollment-shared-ipad) — HIGH (fetched in full; this is the primary source for essentially all of Recipe 2's table stakes/anti-features)
- [Shared iPad overview - Apple Support](https://support.apple.com/guide/deployment/shared-ipad-overview-dep9a34c2ba2/web) — HIGH (fetched in full; device eligibility, storage floor, QuotaSize)
- Remote Desktop client (MSRDC) retirement (March 27, 2026) — MEDIUM, corroborated across multiple independent secondary sources (Zoho, Starwind, 4sysops, Fabs Solutions, 9to5azure) but not directly re-confirmed against a single first-party MS Learn retirement-notice page in this research pass; recommend a phase-time direct citation of the official Microsoft retirement announcement before publishing.
- Existing corpus (verified directly, not web research): `docs/admin-setup-apv1/08-self-deploying.md` (RE-084), `docs/apv1-vs-apv2.md` (RE-177), `docs/cross-platform/apple-business/09-shared-ipad-lifecycle.md`, `docs/admin-setup-ios/03-ade-enrollment-profile.md`, `docs/admin-setup-ios/05-app-deployment.md`, `docs/admin-setup-ios/06-compliance-policy.md`, `docs/admin-setup-apv1/03-esp-policy.md`, `docs/admin-setup-apv1/04-dynamic-groups.md`, `docs/admin-setup-8021x/*`

---
*Feature research for: Device Configuration Recipes (Shared Windows AVD-client device + Shared iPad) — v1.18*
*Researched: 2026-07-16*
