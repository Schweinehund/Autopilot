# Project Research Summary

**Project:** Windows Autopilot & macOS Provisioning Documentation Suite — v1.19 "Device Configuration Recipes #3 & #4" (Windows Multi-App Kiosk + Android Dedicated MHS Multi-App)
**Domain:** Intune/Entra device-configuration documentation (EEE-conformant Markdown to .docx corpus) — two new Device Recipe docs, each scoped as a **delta over corpus that already ships**, plus integration/nav and mandatory harness-close phases
**Researched:** 2026-07-25
**Confidence:** HIGH overall — the two hard gates that could have re-scoped or cancelled either recipe both came back CONFIRMED against directly-fetched, dated Microsoft Learn pages. A small number of items remain honestly MEDIUM (flagged throughout, not smoothed over) and one open format tension is surfaced for discuss-phase, not resolved here.

---

## Gate Verdicts (Read First)

Both hard gates PROJECT.md put to this research round came back **CONFIRMED**, not refuted. Neither recipe is cancelled or re-scoped in scope; RE-224's *shape* changes materially, described below.

### GATE 1 — Windows 11 multi-app kiosk mechanism: CONFIRMED

**Verdict:** The Intune **Templates -> Kiosk** GUI's "Multi app kiosk" option is documented by Microsoft as **Windows-10-only**. Windows 11 multi-app kiosk has **no first-party GUI path** — it requires the **AssignedAccess CSP `Configuration` node** (`./Vendor/MSFT/AssignedAccess/Configuration`), delivered via an Intune **Custom profile (OMA-URI)**, carrying a **hand-authored `AssignedAccessConfiguration` XML** payload.

**Citation:** `learn.microsoft.com/en-us/intune/device-configuration/templates/configure-kiosk` (ms.date 2026-02-10, updated 2026-07-01) — verbatim: *"Currently, you can use Intune to configure a multi-app kiosk on Windows 10 devices... For more information about Windows 11 multi-app kiosk support, go to [Set up a multi-app kiosk on Windows 11 devices]."* Corroborated by `windows/configuration/assigned-access/configure-multi-app-kiosk` (*"This option isn't available using Settings"*) and `assigned-access/configuration-file` (XML schema, namespace versions). All HIGH confidence, fetched directly 2026-07-25.

**Consequence for scope:** RE-224 is authorable — the internal note it verifies (`130-RESEARCH.md:340`) is confirmed, not refuted. But this re-shapes the recipe materially: RE-224's central deliverable is a hand-authored XML file pushed via OMA-URI, a longer and structurally different Steps section than RE-222's Step 5a (pure GUI/Templates single-app kiosk). ~50% conceptual overlap with RE-222 (AUMID discovery, autologon model) is cross-link-only; the delivery mechanism itself is wholly new content.

**FORMAT TENSION — stated explicitly, not resolved here:** This corpus's STD-05/C17 gate bars decision content inside code fences and bars fenced pseudo-config in branch bodies. RE-224's entire reason to exist is a schema-exact, namespace-versioned (v4=21H2, v5=22H2) XML configuration file — content that in nearly any other technical-writing context would be presented as a fenced code block. **None of the four research files propose a resolution.** PITFALLS.md's Pitfall 18 comes closest (C17 assertion #12's 200-char blockquote cap colliding with a richly-worded decision-cell) but addresses table-cell severity prose, not fenced-XML placement. How RE-224 presents the actual XML artifact — worked example inline as plain prose/pre-formatted non-fenced text, a linked-out artifact, a table-decomposed field list, or something else — is a genuine open question that must be resolved at discuss-phase, not discovered mid-authoring in Phase 135. Flag this as the single highest-leverage open question for requirements.

### GATE 2 — Android Managed Home Screen configuration depth: CONFIRMED

**Verdict:** First-party documented depth **exists and is extensive** — far beyond the exit-PIN setting already covered in `05-dedicated-devices.md`. Microsoft Learn publishes exact JSON keys for grid/layout (`grid_size`, `app_orders`, `lock_home_screen`), allow-list (`applications`), folders (`managed_folders`), widgets, screensaver/digital-signage (`show_screen_saver` + timing keys), and sign-in/sign-out (`enable_mhs_signin`, `signin_type`, session-PIN keys).

**Citation:** `learn.microsoft.com/en-us/intune/app-management/configuration/configure-managed-home-screen` (ms.date 2026-04-21, **updated_at 2026-06-22** — fresher than `05-dedicated-devices.md`'s `last_verified: 2026-04-23`). HIGH, fetched directly 2026-07-25.

**Consequence for scope:** RE-225 is authorable as a genuine delta over `05-dedicated-devices.md`, which stops at "MHS must be Required-assigned" and never documents what's configurable inside the app. RE-225 is not redundant with a generic Android app-deployment guide, and there is no Plan-1-equivalent research gate blocking its core mechanism — the only design decision RE-225 faces is a missing-target problem for its app-deployment *step*, resolved below (Integration section), not a mechanism-existence gate like RE-224's.

---

## Executive Summary

Both hard-gate questions this milestone was built around came back confirmed: Windows 11 multi-app kiosk has a real, first-party, non-GUI mechanism (AssignedAccess CSP `Configuration` node via Custom OMA-URI + hand-authored XML), and Android Managed Home Screen has genuine, undocumented-in-corpus configuration depth at the JSON-key level. Neither recipe is cancelled; RE-224 is re-shaped rather than re-scoped, and its shape now collides with a corpus formatting rule (STD-05/C17 bars fenced code in decision content) that no research file resolves — this is the single most consequential open item for requirements and roadmap to carry forward explicitly rather than let Phase 135 discover unplanned.

Both recipes are designed, per PROJECT.md's own adversarial-review-confirmed scoping, as **deltas over corpus that already ships**: RE-224 cross-links RE-222's Step 5a single-app kiosk (one line, zero edits — frozen by `check-phase-130.mjs`'s literal-string pin) and owns only the multi-app delivery mechanism itself; RE-225 cross-links nearly all of `05-dedicated-devices.md`'s enrollment/provisioning/exit-PIN-sync content and owns only the missing `## Steps`/Verification/Anti-Feature structural scaffold plus MHS app-config-level detail. This delta discipline is both recipes' dominant design constraint and their dominant pitfall-exposure surface: PITFALLS.md documents 26 pitfalls, and a majority trace back to either re-deriving content a sibling doc already owns (Pitfalls 2, 10, 13, 14) or silently upgrading a MEDIUM-confidence anchor-doc fact to a flat imperative once it's reformatted as a numbered recipe Step (Pitfalls 9, 20 — most notably, the Android MHS exit-PIN dual-policy synchronization requirement has **no first-party Microsoft source on this research pass either**, and must ship as `[MEDIUM: MS Q&A community]`, never silently promoted).

The recommended approach: resolve the RE-224 XML-presentation format tension and the remaining PROJECT.md gray areas (Windows enrollment-path fork, multi-app+SharedPC layering, shared conceptual anchor, hubs-not-wired disposition) at discuss-phase via `/adversarial-review` before Phase 135/136 content authoring begins; author RE-224 and RE-225 in parallel (zero cross-dependency, per architecture research); integrate and wire navigation last, closing the WR-01 defect class (table-without-quick-nav-bullet) proactively via a new validator needle rather than relying on code-review to catch it again; and treat the mandatory harness-close phase as strictly final and gated on the owner's push landing (the V118 back-anchor pin has no valid target until then — this is a hard go/no-go precondition, not a soft assumption).

---

## Key Findings

### Stack Additions — What Must Be Documented, Per Recipe

**RE-224 — Windows 11 Multi-App Kiosk (new content, genuinely not covered anywhere in the corpus):**

| Feature / Profile Type | Version Floor | Role |
|---|---|---|
| AssignedAccess CSP — `Configuration` node, via Intune Custom profile (OMA-URI) | Pro/Enterprise/Education/IoT Enterprise (not Home); Windows 10 1709+ base, Windows 11 confirmed compatible | The sole first-party mechanism — this **is** GATE 1 |
| `AssignedAccessConfiguration` XML — `AllAppList` profile type | Namespace-versioned: base 2017 (**`StartLayout` lives HERE — corrected 2026-07-25; it was never a v4 addition**); **v4 (21H2+)** adds `ClassicAppPath`/`ClassicAppArguments` (+ Win11-flavored `StartLayout` *handling*); **v5 (22H2+)** adds `StartPins`/`TaskbarLayout` | Defines allow-list, Start/taskbar layout, File Explorer namespace restrictions. **State the version floor and the namespace-aliasing rule; do NOT assert a mismatch failure mode** — what happens when a v5 field is used on 21H2 is genuinely undocumented (NOT-FOUND). Also note the published table binds alias `v5` to two different namespaces (`202010` and `2022`) — a first-party doc defect worth one caution line. |
| `Configs` -> `Account`/`UserGroup` binding | Same | Associates the XML profile to a local/AD/Entra user or group — **group Configs require `AllAppList`; `KioskModeApp` (single-app) is user-only, never group** |
| `AssignedAccess/Status` node (read-only) — **NOT a verification mechanism** | Since Windows 10 1809+ | **CORRECTED 2026-07-25 (adversarial review).** `Get`-only, so not deliverable as an Intune custom OMA-URI row; WMI bridge has no Status property; MDMDiagReport doesn't carry it. Ships as **one anti-feature row**. Verification = observable device behaviour + the AssignedAccess Operational event log. `AppNotFound` retained as a named symptom only. **CORRECTED 2026-07-30:** the channel is disabled by default and must be enabled before the first kiosk sign-in; for some failures events are captured only once. |
| AUMID discovery via `Get-StartApps` | N/A | Cross-link RE-222's existing pattern verbatim, never re-author |

**RE-225 — Android Dedicated, MHS Multi-App (new content — MHS app-config-level detail, not enrollment):**

| Feature / Profile Type | Version Floor | Role |
|---|---|---|
| MHS App Configuration policy — Apps -> Configuration -> Managed devices (Android) -> Managed Home Screen (`com.microsoft.launcher.enterprise`) | Android 8.0+ | The configuration surface itself — this **is** GATE 2 |
| `applications` allow-list + `managed_folders`/`widgets` keys | Same policy | Curated multi-app grid — the delta content `05-dedicated-devices.md` stops short of |
| Screensaver/digital-signage keys (`show_screen_saver`, timing) | Requires Overlay + exact-alarm (Android 14+) permission | Digital-signage variant, named as a scenario in `05` but never configured at key-level anywhere in the corpus |
| Sign-in/sign-out keys (`enable_mhs_signin`, `signin_type`, session-PIN, auto-signout) | Same policy | Backs the existing "Entra shared device mode" scenario row with first-party JSON-key detail |
| OEMConfig permission auto-grant (`configure-managed-home-screen-permissions-android`) | Samsung-specific tabs shown; general OEMConfig elsewhere | Avoids a Settings-app breakout path — new prerequisite content |

**Already covered — do NOT re-document (either recipe):** RE-224 must not re-author single-app kiosk/AUMID discovery/Shell-Launcher exclusion (all RE-222 Step 5a, zero-edit-frozen) or Autopilot self-deploying/dynamic groups/ESP (`admin-setup-apv1/*`). RE-225 must not re-author enrollment-profile Deltas 1-4, all four provisioning methods + Knox/ZT mutual exclusion, the exit-PIN sync *requirement itself*, Android 15 FRP pathways (all `05-dedicated-devices.md`), or MGP binding (`01-managed-google-play.md`). One RE-224-owned nuance is genuinely new and not covered by RE-222: the `Configuration` node **supersedes** the legacy `KioskModeApp` node as a silent No-Op (still returns SUCCESS to the MDM server) — this must be stated by RE-224 itself.

### Feature Table Stakes, Differentiators, Anti-Features — Per Recipe

**RE-224 table stakes:** Custom-OMA-URI delivery on Windows 11 (not the GUI); standard non-admin kiosk account; apps pre-installed before the XML applies (`AppNotFound` is a documented runtime status); kiosk account excluded from interactive Conditional Access (hard sign-in failure, Event ID 1098 / `AADSTS50076`/`50158`, "by design," no workaround); complete app-dependency lists in `AllowedApps`; group Configs require `AllAppList`; no nested `UserGroup`; AUMID via `Get-StartApps` only; `Configuration` supersedes `KioskModeApp` silently.

**RE-224 differentiators:** Autologon shared account (breaks under EAS password policy — anti-feature interaction); runtime health monitoring via `Status`/`StatusConfiguration`; SharedPC layered under multi-app kiosk (Microsoft-documented pattern, MEDIUM confidence on combined field-level steps — this is PROJECT.md's own "multi-app+SharedPC layering" gray area, present as a genuine decision); custom `BreakoutSequence`; managed folders + Start/taskbar layout.

**RE-224 anti-features:** GUI Kiosk-template wizard on Windows 11 (silently wrong platform); group Config + single-app profile mismatch; interactive CA/MFA on the kiosk account; EAS password policy on an autologon kiosk; nested `UserGroup`; hardcoded AUMID.

**RE-225 table stakes:** Standard token + MHS Required-assigned (05-owned); static device group (05-owned); exit-PIN identical in both policies (05-owned, cross-link only); apps allow-listed on the MHS grid must already be Required-assigned first (RE-225-owned delta); Overlay + exact-alarm permissions auto-granted via OEMConfig, never manual (RE-225-owned); Device Restrictions "Notification windows" must not be Disabled if any Overlay-dependent MHS feature is used; `Enable sign in = FALSE` is the structural default matching the Standard token — this is the direct, honest answer to "how does sign-in work outside Entra SDM": there is none by default.

**RE-225 differentiators:** `Enable sign in = TRUE` + `Sign in type = Other` (lightweight accountability without SDM — MEDIUM confidence on realistic non-Entra IdP wiring); debug-menu lockout hardening (`Enable easy access debug menu = FALSE` + max-attempts + retry-delay — genuine new hardening layer over `05`'s base PIN-sync coverage); managed folders/grid/branding; offline/no-sign-in allow-lists; auto-relaunch on inactivity.

**RE-225 anti-features (intentionally large, per milestone framing):** `Enable sign in = True` leaving `signin_type` at its **documented default of "Microsoft Entra ID"** (**re-anchored 2026-07-25 — the previous "login prompt, zero SSO payoff" framing mis-transposed the account-type axis onto the enrollment-mode axis and is withdrawn**; the real first-party negative is scoped to non-Entra *accounts* and ends *"but they still sign in to Managed Home Screen"*, and no source states what an Entra account does on a non-SDM device); exposed system navigation bypassing the sign-in/session-PIN gate; Notification-windows=Disable silently breaking screensaver/virtual-home-button/auto-signout; expecting per-identity personalization on a sign-in-disabled Standard-token device (structurally impossible); Wi-Fi radio toggle and first-time Enterprise-network connection both unavailable to end users from inside MHS; folder reorder/rename never available to end users; Zero-Touch + Knox simultaneously on Samsung (05-owned CRITICAL); digital-signage/single-app-kiosk guidance treated as in-scope (it isn't).

**Decision points ranked by consequence-if-wrong (both recipes, from FEATURES.md):**

| Recipe | # | Severity | Decision |
|---|---|---|---|
| RE-224 | 1 | CRITICAL | Delivery mechanism: Custom OMA-URI/XML (Win11-capable) vs. Templates GUI (Win10-only) — this **is** GATE 1, stated as prerequisite fact, not a genuine choice |
| RE-224 | 2 | CRITICAL | Kiosk account model: shared local autologon vs. named/grouped Entra account — PROJECT.md's Windows enrollment-path gray area |
| RE-224 | 3 | HIGH | Config target type (individual vs. group; `AllAppList`-only for groups) |
| RE-224 | 4 | HIGH | SharedPC layered under multi-app kiosk vs. alone — PROJECT.md's SharedPC-layering gray area |
| RE-225 | 1 | CRITICAL (already locked, Case-1) | Token type: Standard (worked) vs. Entra SDM (routing cross-link only) — irreversible, field-site QR redistribution cost |
| RE-225 | 2 | HIGH (Case-2, 05-owned) | Provisioning method, Knox/ZT mutual exclusion |
| RE-225 | 3 | HIGH | `Enable sign in`: FALSE (default) / TRUE+Other / TRUE+Entra-ID-trap |
| RE-225 | 4 | HIGH | Debug-menu exposure + attempt/retry-delay hardening |

### Architecture — Integration, Cross-Links, Ripple, Guardrails

**Cross-link topology:** RE-224 is the corpus's **first recipe-to-recipe cross-link** — one outbound line to `01-shared-windows-avd-client.md#step-5a-kiosk-configuration`, protected on the target side by `check-phase-130.mjs`'s literal-string pin on the Step 5a/5b headings; every other RE-224 prerequisite link (self-deploying, dynamic groups, ESP, APv1-vs-APv2) goes **directly** to `admin-setup-apv1/*`, never chained through recipe 01. RE-225 cross-links multiple pre-verified anchors in `05-dedicated-devices.md` (`#scenarios`, `#enrollment-profile`, `#provisioning-method-choice`, `#exit-kiosk-pin-synchronization`, `#android-15-frp-reprovisioning`) plus `01-managed-google-play.md#bind-mgp` and existing glossary/capability-matrix anchors — link to existing anchors only, add nothing new to either target.

**The Android app-deployment missing-target problem — resolved recommendation: INLINE.** `admin-setup-android/` has no app-deployment or configuration-profiles guide (unlike iOS, which has one — an incidental asymmetry, not a rule to generalize from). Architecture research assessed three options and recommends **inlining a recipe-scoped "Deploy the MHS app (device-context)" step** in RE-225 with the concrete click-path, directly mirroring RE-222's own precedent for the identical Windows-side gap (`admin-setup-apv1/` also has no app-deployment guide, and RE-222 solved it by inlining Step 4). Cross-linking `01-managed-google-play.md` was explicitly rejected (it covers binding/pre-approval, not assignment — sends the reader to a page that doesn't answer the question). Deferring the step as future work was also rejected (would ship RE-225 broken at its own structural centerpiece). A future `admin-setup-android` app-deployment guide is noted as a `v1.20+`-scope `DEFERRED-CLEANUP` candidate, not something RE-225 should wait on.

**Registry/pipeline ripple (complete enumeration):** `RE-index.md` two new rows (RE-224/225, Draft->Approved); `filename-map.md` regeneration (never hand-edited); `build-filename-map.mjs --self-test` row-count canary **must bump 223->225** in the same commit as the regeneration (mirrors the exact Phase-133 precedent for the prior bump); `docs/index.md` recipes table **and** the line-38 quick-nav bullet (both surfaces, same commit — this is the WR-01 defect class from Phase 132, proactively closed this time via a new validator needle); `common-issues.md`/`quick-ref-l1.md`/`quick-ref-l2.md` explicit hubs-not-wired re-confirmation (not silent carry-forward — PROJECT.md names this a live gray area); C17 auto-enrollment (zero code change expected); link-checker 0/0; `build-publish-bundle.mjs --version=v1.19` (zero code change, registry-data-driven); a new integration-phase validator with needles for both new registry rows, filename-map regeneration, both `index.md` table rows, **and** the line-38 bullet text specifically; the apex chain validator extending `[48..N-1]`; and the terminal `v1.19-milestone-audit.mjs` + allowlist + BASELINE_23, run as its own final phase, never batched with content.

**Frozen-surface guardrails:** `docs/_glossary-android.md` (365 pin coordinates) and `docs/reference/android-capability-matrix.md` (139 pin coordinates), aggregated across 16 frozen sidecars, must receive **zero edits** from v1.19. All three concepts RE-225 needs (`Dedicated`, `Managed Home Screen`, `Entra Shared Device Mode`) already have glossary anchors; the capability-matrix's existing "Dedicated (COSU)" column already covers MHS. If a line-shift edit somehow proves unavoidable, the only licensed remedy is a scoped **CARVE-1 option (a)** coordinate-only re-pin, budgeted explicitly, never discovered mid-execution, never CARVE-1 option (b) (reserved for its own dedicated tooling milestone). A third, unresolved gray area — a "shared conceptual anchor" for the kiosk/dedicated-device taxonomy both recipes and `05-dedicated-devices.md`'s own Platform note gesture at — has a documented option space (duplicate locally / new small Reference doc / fold into an already-pinned comparison file) but is explicitly **not resolved** by this research; Option C (folding into the already-pinned `4-platform-capability-comparison.md`) should be ruled out regardless of how the gray area resolves, since it carries the identical pin-invalidation hazard under a different name.

---

## Watch Out For

The pitfalls below are the highest-severity items from PITFALLS.md's 26, selected for consequence and for the honest confidence gaps that must not be silently smoothed over.

| # | Pitfall | Severity driver | Phase | Confidence |
|---|---|---|---|---|
| 1 | Plan-1 gate authored around without fresh citation | Would force a rewrite if the Windows-11 mechanism assumption were wrong | 135 (blocking precondition) | HIGH — but re-verify at authoring time regardless, per the pitfall's own instruction |
| 3 | Frozen Step 5a/5b headings touched indirectly (corpus-wide text ops) | Fails the apex chain at a *different* phase's close | 135 + 137 | HIGH |
| 4 | Edition-floor stated more restrictively than current reality (Pro is now unified with Enterprise/Education for both single- and multi-app) | Wrongly blocks Pro-edition fleets — a stale-training-data trap | 135 | HIGH (live-fetched 6 days before this research) |
| 7 | Kiosk-lockout recovery path omitted (Settings-app self-service removal is NOT available once multi-app is configured) | Admin with no documented recovery path may resort to unnecessary full wipe | 135 | HIGH |
| **9** | **MHS exit-PIN dual-policy synchronization requirement — no first-party source found on THIS research pass either** | **Must ship as `[MEDIUM: MS Q&A community]`; upgrading to HIGH/VERIFIED without a genuinely new citation is the exact trap this pitfall names** | 136 | **MEDIUM — explicit, honest, not resolved, must not be silently promoted to a step-level imperative** |
| 20 | MEDIUM-confidence anchor-doc facts flattened into flat numbered recipe Steps generally (exit-PIN sync, token-expiry-no-never-expires, the entire enrollment-profile Delta block) | Recipe format reads more authoritative than the source Guide; strips the confidence signal the source deliberately preserved | 136 | HIGH (the flattening risk itself is well-documented; the underlying facts vary MEDIUM/HIGH per-fact) |
| 21 | `05-dedicated-devices.md` is past its own `review_by` date — RE-225 authored on a stale anchor without spot-verification | Recurrence of v1.18's exact Pitfall #2 pattern (RE-084's stale Wi-Fi claim) | 136 + 138 | HIGH |
| 22 | WR-01 recurrence — `index.md` table lands without the line-38 quick-nav bullet | Already happened once (Phase 132), caught only by code-review after the fact | 137 | HIGH |
| 26 | V118 pin attempted before the owner's push lands, or Phase-134's apex value copied forward unaudited | Structural failure or a pin against an unreachable SHA — a hard go/no-go gate, named BLOCKING PRECONDITION in PROJECT.md | 138 | HIGH |

Full pitfall set (26 items, Groups A-D) is in `PITFALLS.md`; every item there carries an explicit phase assignment and a "warning signs" grep-able tell.

---

## Implications for Roadmap

### Suggested Phase Structure (dependency-ordered, mirrors v1.18's Phase 129->134 shape)

**Phase 135 — RE-224 Windows multi-app kiosk content.**
*Depends on:* the Plan-1 gate having passed (it has — GATE 1 above — but the recipe's own authoring must still re-cite fresh, not lean on this SUMMARY as its source).
*Delivers:* `docs/recipes/03-*.md` — Custom OMA-URI/XML mechanism as the recipe's central content, one-line cross-link to RE-222 Step 5a, Prerequisites with a same-milestone-dated edition-floor citation, decision blocks for account model + SharedPC layering, "This recipe is NOT" disambiguation for kiosk/digital-signage/Lock-Task-Mode/COSU terminology collisions, Recovery subsection, Verification exercising secondary app flows.
*Must resolve first (discuss-phase):* the RE-224 XML-presentation format tension (GATE 1's open item, above) — this could shape the Steps section structurally and should not be decided ad hoc mid-authoring.
*Avoids:* Pitfalls 1-8, 15, 18, 25.

**Phase 136 — RE-225 Android Dedicated MHS multi-app content.**
*Depends on:* nothing from Phase 135 (different platform, zero cross-dependency — parallelizable in principle, sequential in practice per `use_worktrees:false`).
*Delivers:* `docs/recipes/04-*.md` — the missing `## Steps`/Verification/Anti-Feature scaffold `05-dedicated-devices.md` lacks, inlined MHS app-deployment step, `Enable sign in` decision block as the dominant fork, debug-menu hardening, Case-1 token-type block preserving the full revoke/recreate/redistribute-to-every-field-site severity language, exit-PIN sync content cross-linked (never re-derived) and carrying its `[MEDIUM]` tag forward unchanged, spot-verification of stale-anchor-doc facts.
*Avoids:* Pitfalls 9-14, 15, 16, 19, 20, 21, 25.

**Phase 137 — Integration & navigation-last close.**
*Depends on:* both content phases complete and C17-clean.
*Delivers:* registry rows + Draft->Approved flip, filename-map regeneration + `--self-test` 223->225 bump in the same commit, `index.md` table rows **and** line-38 quick-nav bullet in the same commit, explicit hubs-not-wired ruling (named decision, not silent carry-forward), link-checker 0/0, publish-bundle regeneration `--version=v1.19`.
*Avoids:* Pitfalls 22, 23, 24.

**Phase 138 — Harness-close cluster (MANDATORY, structurally separate, never batched with content).**
*Depends on:* the owner's push landing on `origin/master` — a hard go/no-go precondition, not a soft assumption.
*Delivers:* V118 pin (`readAtV118Close`, dual-token subject-line-confirmed SHA), 17th Path-A lineage bump (`v1.19-milestone-audit.mjs`, allowlist, BASELINE_23), `check-phase-135..138.mjs` extending the `[48..N-1]` apex invariant (independently derived, not copied from Phase 134), 3-axis terminal re-audit, 16th parallel CI coexistence workflow.
*Avoids:* Pitfall 26.

### Build Order and Dependency Edges

```
[GATE 1 + GATE 2 verdicts]  -- already resolved, this research round
        |
        v
[discuss-phase: resolve remaining gray areas incl. RE-224 XML-format tension]  -- /adversarial-review
        |
        +--------------+--------------+
        v              v              |
   Phase 135        Phase 136         |  (zero mutual dependency, parallelizable in
   RE-224 content   RE-225 content    |   principle, sequential in practice)
        |              |              |
        +------+-------+              |
               v                      |
          Phase 137                   |
     Integration & nav-last close     |
     (registry, filename-map,         |
      index.md table + bullet,        |
      hubs-not-wired ruling)          |
               |                      |
               v                      |
          Phase 138  <----------------+  gated on: owner's push landed on origin/master
     Harness-close cluster
     (V118 pin, 17th lineage bump,
      terminal re-audit) -- NEVER
     batched with content or nav
```

**Ordering rationale beyond raw dependency:** discuss-phase must lead because the RE-224 format tension and the remaining PROJECT.md gray areas (account model, SharedPC layering, shared conceptual anchor, hubs-not-wired disposition) shape Steps-section structure in ways that are expensive to retrofit after drafting. 135/136 are content-parallel by architecture but content-first by convention (`use_worktrees:false`). 137 is strictly content-gated (needs stable, C17-clean files to flip registry status). 138 is strictly last and gated on an external precondition (owner push) that is outside this milestone's own control — do not schedule it optimistically.

### Research Flags

**Needs continued verification during planning/authoring, not blocking roadmap:**
- Phase 135: re-confirm the Plan-1 mechanism claim with a citation dated inside the phase itself (not this SUMMARY) before Step content is drafted — the underlying Learn pages are proven to update asymmetrically (one sub-page touched 16+ months apart from a sibling page in the same feature area).
- Phase 135: the SharedPC + multi-app layering interaction has zero first-party source either way — treat as mutually exclusive unless discuss-phase's `/adversarial-review` finds and cites an affirmative source.
- Phase 136: the MHS exit-PIN synchronization requirement (Pitfall 9) — actively re-search during authoring in case a first-party source surfaces that this research pass missed; if not found, ship `[MEDIUM]` as-is.
- Phase 136: spot-verify specific `05-dedicated-devices.md` facts RE-225's decision points depend on against current Learn, given the anchor doc is past its own `review_by` date.

**Standard patterns, low research need:**
- Phase 137: the registry->filename-map->publish-bundle pipeline is unchanged, generic, and proven across five prior milestones — mechanical execution, not research.
- Phase 138: the V118-pin mechanism itself (dual-token grep, subject-line confirmation) is fully precedented from V117 — the only open item is the external push-landed precondition, not the mechanism.

---

## Confidence Assessment

| Area | Confidence | Notes |
|---|---|---|
| Stack | HIGH | Both gate-defining facts fetched directly from current, dated Microsoft Learn pages 2026-07-25; edition-floor unification and namespace-version table are HIGH; Pro Education's inclusion is explicitly flagged LOW/inferred, not asserted |
| Features | HIGH | Both load-bearing facts (Plan-1 gate; MHS-outside-SDM sign-in behavior) independently verified HIGH; individual differentiators carry their own MEDIUM tags where community-only (SharedPC+kiosk field-level steps; Win32-under-autologon reliability) |
| Architecture | HIGH for registry/pipeline/frozen-surface mechanics (direct repo reads); MEDIUM for RE-224's exact spine shape (not yet authored) and explicitly unresolved for the "shared conceptual anchor" gray area (option space only) |
| Pitfalls | HIGH for all repo-governance and Windows system-requirement claims; explicit, honest MEDIUM on the MHS exit-PIN synchronization pitfall and the screensaver-PIN userless-device inference — neither smoothed to HIGH |

**Overall confidence:** HIGH, with two named, deliberate MEDIUM exceptions (MHS exit-PIN sync; SharedPC+kiosk layering) that must ship as MEDIUM in the recipes themselves, not get promoted during authoring.

### Gaps to Address

- **RE-224 XML-presentation format tension (GATE 1's open item).** No research file resolves how a schema-exact, hand-authored XML artifact is presented inside a standard that bars fenced code in decision/branch content. Must be a named discuss-phase decision before Phase 135 Steps-section drafting begins.
- **MHS exit-PIN dual-policy synchronization — still no first-party source.** Two independent research passes (this one and the corpus's own prior finding) have both failed to locate a Microsoft Learn page stating the two PIN values must match. Ship `[MEDIUM: MS Q&A community]`, refresh only the date, never the confidence level, unless a genuinely new citation is found during Phase 136 authoring.
- **SharedPC + multi-app Assigned Access coexistence — genuinely unresolved, not merely unresearched further.** No first-party page confirms or denies running both simultaneously. Treat as a permanent mutually-exclusive admin-decision-point fork (mirroring recipe 01's own single-app-vs-SharedPC fork) unless discuss-phase's `/adversarial-review` finds an affirmative source.
- **Shared conceptual anchor for the kiosk/dedicated-device taxonomy.** Option space documented (duplicate locally / new small Reference doc / fold into an already-pinned file — the last ruled out regardless), not resolved. Route to discuss-phase.
- **`05-dedicated-devices.md` is past its own `review_by` date.** Spot-verify any fact RE-225 cross-links against current Learn before relying on it; if drift is found, do not silently patch the frozen/Approved anchor doc as a side effect — give it an explicit landing spot (a named requirement or a `DEFERRED-CLEANUP.md` entry), mirroring how v1.18 handled the RE-084 Wi-Fi correction (HYG-04) rather than an unlogged drive-by edit.
- **The V118 push precondition.** Not a research gap but a hard external blocker: Phase 138 cannot begin its close-gate work until the owner's push of v1.18's 198 unpushed commits lands on `origin/master`. Roadmap should carry this as an explicit phase-138 gate, not an assumption.

---

## Sources

### Primary (HIGH confidence, fetched directly 2026-07-25)
- `learn.microsoft.com/en-us/intune/device-configuration/templates/configure-kiosk` — GATE 1 primary source (Windows-10-only multi-app GUI statement)
- `learn.microsoft.com/en-us/windows/configuration/assigned-access/configure-multi-app-kiosk` — CSP/OMA-URI mechanism, "not available using Settings," recovery/removal behavior
- `learn.microsoft.com/en-us/windows/configuration/assigned-access/configuration-file` — XML schema, `AllAppList` vs `KioskModeApp`, namespace/version table (v4=21H2, v5=22H2), account/group binding rules
- `learn.microsoft.com/en-us/windows/client-management/mdm/assignedaccess-csp` — edition/OS tables, `Status`/`StatusConfiguration`, `KioskModeApp` No-Op behavior
- `learn.microsoft.com/en-us/windows/client-management/mdm/sharedpc-csp` — `KioskModeAUMID` hook; no coexistence statement found (documented as a gap)
- `learn.microsoft.com/en-us/windows/configuration/assigned-access/overview` — unified Pro/Enterprise/Education/IoT edition floor (ms.date 2026-07-15, updated 2026-07-21)
- `learn.microsoft.com/en-us/troubleshoot/mem/intune/device-configuration/users-cannot-logon-windows-multi-app-kiosk` — CA/MFA anti-feature, verbatim Event Viewer signatures
- `learn.microsoft.com/en-us/intune/solutions/frontline-worker/windows` — self-deploying-as-recommended-enrollment, SharedPC+kiosk layering pattern (individual-CSP level only)
- `learn.microsoft.com/en-us/intune/app-management/configuration/configure-managed-home-screen` — GATE 2 primary source, full JSON-key tables (ms.date 2026-04-21, updated 2026-06-22)
- `learn.microsoft.com/en-us/intune/app-management/configuration/configure-launcher-android` — fetched to positively rule out as the wrong package (`com.microsoft.launcher` vs `com.microsoft.launcher.enterprise`)

### Repo (direct reads)
- `.planning/PROJECT.md` (v1.19 section) — scope, 8 gray areas, BLOCKING PRECONDITION language
- `docs/recipes/01-shared-windows-avd-client.md` (RE-222, Approved) — cross-link patterns, Step 4/5a/5b structure, `[ASSUMED]` tag idiom
- `docs/recipes/02-shared-ipad-full-provisioning.md` (RE-223) — app-deployment cross-link pattern where a target guide exists
- `docs/admin-setup-android/05-dedicated-devices.md` (RE-097, `last_verified: 2026-04-23`, `review_by: 2026-06-22` — past due) — anchor doc for RE-225's delta
- `docs/admin-setup-android/01-managed-google-play.md` — confirmed scope is binding + auto-approval, not general assignment
- `docs/_registry/RE-index.md`, `docs/index.md`, `scripts/pipeline/build-filename-map.mjs`, `scripts/validation/check-phase-130.mjs`, `scripts/validation/check-phase-132.mjs`, `scripts/validation/README-supervision-pins.md`, `docs/_glossary-android.md`, `docs/reference/android-capability-matrix.md` — pipeline/registry/frozen-surface mechanics
- `.planning/milestones/v1.18-ROADMAP.md`, `.planning/RETROSPECTIVE.md`, `.planning/milestones/v1.18-DEFERRED-CLEANUP.md` — phase-sequencing precedent, Key Lessons (deferral-evaporation, don't-copy-a-frozen-bug-forward)

### Secondary (MEDIUM confidence)
- Community walkthroughs (petervanderwoude.nl, hiraniconfigmgr.com, cloudinfra.net, quantem.io, cloudwisdom.co.uk) — Windows 11 multi-app kiosk OMA-URI deployment workflow specifics; the CSP node itself is independently HIGH via Microsoft Learn
- Microsoft Q&A community threads — MHS exit-PIN dual-policy synchronization requirement; **no first-party page found on this or the prior research pass**

---
*Research completed: 2026-07-25*
*Ready for roadmap: yes, contingent on discuss-phase resolving the RE-224 XML-presentation format tension and PROJECT.md's remaining gray areas before Phase 135 content authoring begins*
