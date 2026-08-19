# Pitfalls Research

**Domain:** Device Configuration Recipes #3 & #4 — Windows multi-app kiosk (RE-224) + Android MMHS multi-app Dedicated (RE-225) — added to an existing, heavily-governed 5-platform Intune/Autopilot EEE documentation corpus
**Researched:** 2026-07-25
**Confidence:** HIGH for all repo-governance claims (direct read of PROJECT.md, EEE-SOP-standard.md, check-phase-130/132.mjs, both anchor docs) and for the Windows Assigned Access system-requirements/mutual-exclusion facts (Microsoft Learn, fetched live 2026-07-25, `updated_at` 2026-07-21). MEDIUM for the Android MHS exit-PIN synchronization claim — **no first-party Microsoft Learn statement was found combining both settings into one documented synchronization requirement; this is stated explicitly below, not inflated.**

This document supersedes `v1.18`'s `PITFALLS.md` in place. Pitfalls #17 (frozen-surface discipline), #21 (nav-hub forbidden-wiring), #25 (filename-map regeneration), and the `doc_type` taxonomy caution are carried forward because the same mechanisms govern this milestone; they are restated here in v1.19-specific terms rather than cross-referenced, per the requirement to overwrite in place.

## Critical Pitfalls

### Group A — Windows Multi-App Kiosk Content (Phase 135)

### Pitfall 1: The Plan-1 hard gate is skipped and the recipe is authored around an unverified mechanism claim

**What goes wrong:** PROJECT.md names this the single most consequential Phase-135 risk: `130-RESEARCH.md:340` is the *sole* source for the claim that Windows 11 multi-app kiosk uses "a separate non-Intune-Templates mechanism," it carries **no `[VERIFIED:]` tag** (unlike every single-app fact in that research), and its own Impact cell disclaims relevance to this milestone. If Phase 135 begins authoring steps before this claim is independently re-verified against current Microsoft Learn, the recipe risks being built on a Templates-vs-Settings-Catalog assumption that turns out wrong, forcing a rewrite after Step content already exists.

**Why it happens:** the research artifact is a full year (in corpus terms — 5 milestones) old relative to a live-documentation surface Microsoft revises continuously (confirmed by this research's own live fetch: `configure-multi-app-kiosk` has `updated_at: 2025-03-10`, `overview` has `updated_at: 2026-07-21` — the two pages in the SAME feature area were touched 16+ months apart, meaning staleness risk is real and asymmetric across sub-pages).

**How to avoid:** Before any Step content is drafted, independently re-fetch and re-verify `learn.microsoft.com/windows/configuration/assigned-access/configure-multi-app-kiosk` (or its current canonical URL) and confirm whether Intune's Kiosk *template* path or a Settings-Catalog/custom-OMA-URI `AssignedAccess` CSP path is authoritative for multi-app in the current admin center. This research's own live fetch (2026-07-25) confirms the CSP/custom-policy path (`./Vendor/MSFT/AssignedAccess/Configuration`) is the documented Intune/CSP mechanism for multi-app — but a negative or ambiguous result on re-verification must re-scope or defer RE-224 per the milestone's own gate language, not be silently authored around.

**Warning signs:** Any Phase-135 plan or SUMMARY draft citing `130-RESEARCH.md:340` as its sole justification for the multi-app mechanism without a fresh citation dated in this milestone.

**Phase to address:** 135 (blocking precondition — before Step content authoring begins).

**Confidence:** HIGH (direct read of PROJECT.md's own gate language + live Learn fetch corroboration).

---

### Pitfall 2: The "one-line cross-link" for single-app kiosk drifts into re-authored content

**What goes wrong:** RE-224's stated design is that the single-app case is **a one-line cross-link** to `docs/recipes/01-shared-windows-avd-client.md#step-5a-kiosk-configuration` — that procedure already ships complete and Approved at `01:114-143`, and roughly half of it transfers verbatim conceptually (AUMID discovery, autologon account model, MSIX machine-wide provisioning). The gravitational pull during drafting is to paraphrase "for context" — restating the Assigned-Access-vs-Shell-Launcher mutual exclusion, the autologon account model, or the AUMID-discovery step in RE-224's own words "so the reader doesn't have to click away." Any such restatement is a duplicate-content violation and a second, potentially drifting, source of truth for the same fact.

**Why it happens:** this is explicitly named in the question as "the failure mode both recipes are most exposed to," and single-app kiosk is genuinely close enough to multi-app kiosk conceptually (both are Assigned Access, both use AUMID discovery, both hit the Shell-Launcher mutual exclusion) that an author reaching for parallel structure will reflexively re-explain rather than link.

**How to avoid:** Treat the one-line cross-link as a literal deliverable shape: a single sentence + markdown link, no restated mechanism, no restated table. If RE-224 needs a comparison point (e.g., "unlike single-app, multi-app does not require a dedicated autologon account"), phrase the delta only — never restate the base fact recipe 01 already owns.

**Warning signs:** RE-224 draft containing the strings "Shell Launcher," "AUMID," "autologon," or "Get-StartApps" anywhere outside the one link sentence. **Note (added 2026-07-25, adversarial review):** this is a **human-review warning sign, not an automated gate**, and the AssignedAccess XML payload uses the attribute spelling `AppUserModelId=` — not the token "AUMID" — so a bounded worked XML does not trip it. Do not read this as a constraint on the payload, and do not carry an "AUMID carve-out" into the discuss-phase must-land list.

**Phase to address:** 135.

**Confidence:** HIGH (direct read of PROJECT.md's explicit design constraint).

---

### Pitfall 3: Zero-edits-to-recipe-01 is violated indirectly via the frozen Step 5a/5b headings

**What goes wrong:** `check-phase-130.mjs:64` and `:67` assert the exact literal strings `"Step 5a: Kiosk configuration"` and `"Step 5b: Shared PC configuration"` against **live HEAD** inside `docs/recipes/01-shared-windows-avd-client.md`, and this assertion runs inside every apex chain invocation from Phase 130 forward. A well-intentioned Phase-135 edit that seems unrelated to recipe 01 — a corpus-wide find/replace normalizing heading casing, a nav-hub link-text sync, or a "consistency" pass that renames "Shared PC configuration" to "SharedPC configuration" anywhere it appears — can silently touch this frozen anchor and fail the chain at a completely different phase's close.

**Why it happens:** the two headings are plain prose strings, not visually distinguished as frozen, and nothing in recipe 01 itself signals "a validator downstream pins this exact string" to an author working in a different file.

**How to avoid:** Before any corpus-wide text operation (`sed`-equivalent edits, mass link-text normalization, glossary term propagation) during Phase 135/137, `grep -n "Step 5a: Kiosk configuration\|Step 5b: Shared PC configuration"` first and confirm the operation's scope excludes `docs/recipes/01-shared-windows-avd-client.md`. Run `check-phase-130.mjs` explicitly (not just the deep apex) after any edit that could plausibly have touched the file.

**Warning signs:** `git diff` on any Phase-135/137 commit touching `docs/recipes/01-shared-windows-avd-client.md` at all, for any reason.

**Phase to address:** 135 (authoring discipline) + 137 (integration-phase text-normalization passes are the highest-risk moment for this).

**Confidence:** HIGH (direct read of `check-phase-130.mjs` lines 64/67 and PROJECT.md's explicit `A-LOCK-1`/SC2 callout).

---

### Pitfall 4: Edition-floor claim is stated more restrictively than the current documented reality

**What goes wrong:** A common and historically accurate belief (present in older Microsoft guidance and widely repeated in community blogs) is that Windows multi-app kiosk / "restricted user experience" requires Enterprise or Education, while single-app kiosk works on Pro. **This research's live fetch of `learn.microsoft.com/windows/configuration/assigned-access/overview` (2026-07-25, page `updated_at: 2026-07-21`) shows both kiosk and restricted-user-experience Assigned Access now list the identical edition floor: Pro, Enterprise/Enterprise LTSC, Education, IoT Enterprise/IoT Enterprise LTSC — no per-mode distinction.** If RE-224 is authored from training-data recall or an older cached community post rather than a fresh fetch, it will very plausibly gate the multi-app branch behind "Enterprise/Education only" — a claim that is currently wrong and would unnecessarily block Pro-edition fleets from following the recipe.

**Why it happens:** this is a textbook stale-training-data trap — the edition-floor unification is a genuinely recent-looking Learn revision (the page was touched 6 days before this research), and an author relying on memory rather than a fresh fetch has no signal that the floor changed.

**How to avoid:** RE-224's Prerequisites section must cite the edition floor from a fetch dated in this milestone, not from memory or from recipe 01 (recipe 01 is a self-deploying/AVD-client recipe, not a kiosk-floor authority). State the floor as "Pro, Enterprise/Enterprise LTSC, Education, or IoT Enterprise/IoT Enterprise LTSC — identical for both single-app and multi-app Assigned Access" with a citation.

**Warning signs:** RE-224 draft stating "multi-app kiosk requires Windows 11 Enterprise or Education" without a same-milestone citation.

**Phase to address:** 135 (Prerequisites section).

**Confidence:** HIGH (live Learn fetch, 2026-07-25).

---

### Pitfall 5: Multi-app kiosk + SharedPC CSP layering silently corrupts per-account Start layouts

**What goes wrong:** this is one of the milestone's own named gray areas ("multi-app+SharedPC layering") and for good reason. The multi-app Assigned Access XML configuration is keyed to specific account identities (local, Azure AD, or a domain/Azure AD group) — each account or group gets its own Start-layout/taskbar configuration in the XML. The Shared PC CSP's account-management surface (`EnableAccountManager` + `DeletionPolicy`, already documented in recipe 01's Step 5b) is designed to **create and delete Azure AD accounts dynamically** as different users sign in and out. If a device layers multi-app Assigned Access on top of Shared PC's automatic account deletion, an account that Assigned Access has an XML entry for can be deleted by Shared PC's cleanup policy — and the next matching sign-in either falls back to a default/no configuration or, depending on how the XML resolves group membership vs. individual account entries, silently loses its curated Start layout.

**Why it happens:** the two CSPs are documented and administered as separate features (recipe 01 already treats "kiosk" and "Shared PC" as a fork, not a layered combination) with no first-party page describing their joint behavior, so an author extending recipe 01's Shared-PC branch toward "and now also lock it to a curated app set" has no single authoritative page to check against.

**How to avoid:** RE-224 should treat multi-app kiosk and Shared PC as **mutually exclusive branches**, exactly as recipe 01 already treats single-app-kiosk vs. Shared-PC as mutually exclusive at its own Step 5 fork — do not present a "layer multi-app on top of Shared PC" configuration as a supported combined path unless a first-party source is found and cited affirmatively. If the discuss-phase's gray-area resolution (already flagged for `/adversarial-review` per PROJECT.md) concludes layering is viable for a specific narrow case, that conclusion — and its citation — must be explicit in RE-224, not assumed.

**Warning signs:** RE-224 draft presenting Assigned-Access-XML account entries and `EnableAccountManager: true` as compatible without an explicit interaction callout or an anti-feature row ruling the combination out.

**Phase to address:** 135, resolved at discuss-phase via `/adversarial-review` per the project's own gray-area routing convention (already named in PROJECT.md's 8 gray areas).

**Confidence:** MEDIUM (the individual CSP behaviors are HIGH-confidence Learn-documented facts; the *interaction* claim is this research's own inference — no first-party page was found describing the combination directly, so RE-224 must not assert the interaction as HIGH-confidence fact without its own further verification).

---

### Pitfall 6: Wrong or incomplete allow-list silently falls back to a broken or overly-permissive Start layout

**What goes wrong:** the multi-app Assigned Access XML's allow-list must cover not only the Start-pinned apps themselves but every helper/child process those apps spawn (a common real-world failure: an allow-listed app that shells out to a file picker, a PDF viewer, or a browser-based OAuth flow fails silently or throws an "app cannot be opened" error because the child process was never allow-listed). Recipe 01's own admin-template pattern (`> **What breaks if misconfigured:**`) already establishes the house idiom for this class of fact; RE-224 needs its own equivalent for the multi-app allow-list specifically, since it's a materially different failure surface from the single-app case (which pins exactly one app and has no allow-list to get wrong).

**How to avoid:** RE-224's kiosk-configuration steps must include an explicit "What breaks if misconfigured" callout naming the child-process trap, and the Verification section must include a check that goes beyond "the pinned apps launch" to "a representative allow-listed app's helper/child flows (file open, print, sign-in redirect) complete without an app-blocked error."

**Warning signs:** RE-224's Verification checklist stops at "Start menu shows only allow-listed apps" without exercising any app's secondary flows.

**Phase to address:** 135 (Steps + Verification sections).

**Confidence:** MEDIUM (community-corroborated failure pattern, consistent across multiple independent sources reviewed for this research; not an explicit first-party Learn statement of this specific consequence).

---

### Pitfall 7: The kiosk-lockout recovery path is omitted or assumed to be self-service

**What goes wrong:** Microsoft Learn (fetched live 2026-07-25, `configure-multi-app-kiosk`) states plainly: **"Deleting the Assigned Access configuration removes the policy settings associated with the users, but it can't revert all the changes"** and, critically, **the Settings-app "Remove kiosk" self-service path is explicitly unavailable once a restricted user experience (multi-app) is configured** — the only removal paths are unassigning/deleting the Intune policy, uninstalling the provisioning package, or the PowerShell/WMI-Bridge `$obj.Configuration = $null` reset. If RE-224 omits an explicit "how an admin gets a locked-out device back" section, an admin who deploys the recipe and then needs to recover a misconfigured device (e.g., a device whose allow-list is wrong per Pitfall 6, or whose account-model mismatch per Pitfall 9 below locks out the intended admin account) has no documented recovery path and may resort to a full wipe/re-provision unnecessarily.

**How to avoid:** RE-224 must include an explicit recovery subsection stating: (a) the Ctrl+Alt+Del breakout sequence (default; configurable) exits the *running* kiosk session temporarily, but (b) permanently removing the lockdown requires unassigning the Intune Assigned-Access policy from the device/device-group (which needs the device to check in against Intune — a network-connectivity precondition worth calling out for a device that might be kiosk-locked with restricted network access too), and (c) the Settings-app self-service removal path does **not** work once multi-app is configured.

**Warning signs:** RE-224 draft with no "Recovery" or "Undo this configuration" subsection at all.

**Phase to address:** 135 (dedicated Recovery subsection, cross-linked from Verification and from the Configuration-Caused-Failures table).

**Confidence:** HIGH (Microsoft Learn, fetched live 2026-07-25).

---

### Pitfall 8: Kiosk XML account-model targets accounts, not the device group, and this scope mismatch is copied from recipe 01's device-centric pattern by habit

**What goes wrong:** recipe 01's dominant pattern (dynamic device group → deployment profile → ESP → Windows App, all device-group-scoped) trains an author to think of every Intune assignment in this recipe family as device-group-scoped. But the multi-app Assigned Access **XML configuration file itself** keys its Start-layout/allow-list entries to **account identities** (a specific local account, a specific Azure AD user, or an Azure AD group) inside the XML body — the *policy delivery* (the CSP/custom-OMA-URI setting) is device-group-scoped via Intune assignment, but the *effective configuration* only activates for accounts that match an entry inside the XML. An author who structures RE-224 purely as "assign this profile to the device group, done" (mirroring recipe 01's device-group mental model exactly) risks omitting the equally-necessary step of enumerating which accounts/groups the XML itself must name — a device can receive the policy successfully (Intune-assignment scope satisfied) and still show no restricted experience for a real user whose account isn't named inside the XML.

**How to avoid:** RE-224 must explicitly distinguish two scopes in its Steps: (1) Intune *policy delivery* scope = device group (consistent with recipe 01's pattern), and (2) *XML account-targeting* scope = the specific account(s)/group(s) named inside the Assigned Access configuration file, which is a separate authoring decision the admin must make explicitly (an "Ask the admin" decision point is a natural fit here — which accounts/groups get the curated experience).

**Warning signs:** RE-224 Steps section that only ever assigns the Intune policy to a device group and never surfaces the XML-internal account-targeting decision as a distinct, named step.

**Phase to address:** 135.

**Confidence:** HIGH (Microsoft Learn's `configure-multi-app-kiosk` page structure — the XML configuration file is documented as the account-scoped artifact, separately from the CSP delivery mechanism).

---

### Group B — Android MMHS Multi-App Dedicated Content (Phase 136)

### Pitfall 9: MHS exit-PIN synchronization is promoted from MEDIUM to a flat imperative — and no first-party source was found on this research pass either

**What goes wrong:** `docs/admin-setup-android/05-dedicated-devices.md` already flags this fact — "the exit-kiosk PIN MUST be configured identically in both the device restrictions profile AND the Managed Home Screen app configuration" — as **`[MEDIUM: MS Q&A community, last_verified 2026-04-22]`**, twice. This research independently searched for a first-party Microsoft Learn page stating the synchronization requirement directly and **did not find one.** The two individually real, individually first-party pages — `intune/device-configuration/templates/ref-device-restrictions-android-enterprise` (documents the "Leave kiosk mode" / "Leave kiosk mode code" setting) and `intune/app-management/configuration/configure-managed-home-screen` (documents the MHS "Exit lock task mode password" setting) — each describe their own PIN field in isolation; neither page, in the material surfaced by this research, states that the two values must match or explains the runtime consequence of a mismatch. The synchronization *requirement* and its *failure symptom* ("A PIN to exit kiosk mode has not been set by your IT admin") are corroborated only by Microsoft Q&A community threads and independent blog posts, consistent with what the existing corpus already found. **This must be stated as an explicit gap, not resolved by assertion:** RE-225 (and any future edit to `05-dedicated-devices.md`) must preserve the `[MEDIUM: MS Q&A community]` tag rather than upgrading it to `[HIGH]` or dropping the tag, because the recipe format reads as more procedurally authoritative than the source Guide and creates exactly the temptation this pitfall names.

**Why it happens:** the milestone context itself calls this out as "the top repeated-escalation pattern," which is a strong, specific, operationally-earned claim — the kind of statement that feels like it must be first-party-documented because it's so widely and consistently repeated in the community. Repetition across many secondary sources is not the same as a primary source, and the temptation to treat high community consensus as equivalent to a Learn citation is the actual trap.

**How to avoid:** RE-225's Case-1-adjacent MHS exit-PIN content must carry forward the identical `[MEDIUM: MS Q&A community, last_verified <date>]` tag (refreshing only the date, not the confidence level) unless a genuinely new first-party source is found during Phase 136's own authoring pass — in which case, cite it explicitly and only then upgrade.

**Warning signs:** RE-225 draft stating the exit-PIN synchronization requirement without any confidence tag, or with a tag upgraded to `[HIGH]`/`[VERIFIED]` without a new first-party citation attached.

**Phase to address:** 136.

**Confidence:** MEDIUM, explicitly — same as the source document. **No first-party statement found on this research pass either; this is an honest gap, not a resolved fact.**

---

### Pitfall 10: RE-225 re-derives the MHS Delta-3 / exit-PIN / token-type content instead of delta-linking it

**What goes wrong:** `05-dedicated-devices.md` already has no `## Steps`, no Verification checklist, no Anti-Feature table, and a divergent failure-table shape — per PROJECT.md, **that gap is the recipe.** But the same document already fully owns: the 4-scenario table, the token-type decision (Delta 1), the MHS-Required-assignment requirement (Delta 3), the exit-PIN synchronization H2, the 4-way provisioning-method fork with KME/ZT mutual exclusion, and the Android 15 FRP 3-pathway table. A recipe author reflexively producing a "complete, self-contained" RE-225 — the same instinct that produced v1.18's Pitfall #9 (Shared iPad duplicating the OU-governance lifecycle doc) — will re-explain some or all of this content in the recipe's own words, creating a second, potentially drifting, source of truth for facts `05-dedicated-devices.md` already owns and that carry MEDIUM-confidence caveats (Pitfall 9) that are easy to lose in a paraphrase.

**How to avoid:** RE-225 should be authored as the missing procedural scaffold (`## Steps`, Verification checklist, Anti-Feature table, a recipe-shaped failure table) that **links into** `05-dedicated-devices.md`'s existing H2 anchors (`#enrollment-profile`, `#exit-kiosk-pin-synchronization`, `#provisioning-method-choice`, `#android-15-frp-reprovisioning`) for every fact that document already owns, rather than restating any of it. The two named Case decision points (token-type irreversibility; four-way provisioning-method fork with KME/ZT mutex) should route into the anchor doc's tables rather than reproduce them.

**Warning signs:** RE-225 draft containing a token-type comparison table, an MHS-Required-assignment explanation, or an Android-15-FRP pathway table authored in its own prose rather than as a link into `05-dedicated-devices.md`.

**Phase to address:** 136 (discuss-phase scoping) + authoring phase (explicit cross-reference requirement, mirroring v1.18 Pitfall #9's remedy).

**Confidence:** HIGH (direct read of both documents; direct restatement of PROJECT.md's own "that gap is the recipe" framing).

---

### Pitfall 11: Token-type irreversibility severity gets softened in translation to recipe-decision-block format

**What goes wrong:** `05-dedicated-devices.md:129` documents the token-type choice's consequence-if-wrong in specific, operationally severe terms: "revoke the token, recreate the enrollment profile with the correct token type, redistribute the new QR/enrollment artifact" — i.e., **every already-printed/laminated QR at every field site becomes invalid** and must be physically redistributed. PROJECT.md names this the sole decision in the area with a severe consequence-if-wrong, and RE-225's Case-1 decision block (per STD-05's `| Option | When to choose | Consequence if wrong | Branch |` shape) must carry that exact severity into its "Consequence if wrong" cell. A generic, softened cell like "requires reconfiguration" would understate the real cost (field-site QR redistribution logistics) that makes this decision point worth flagging as irreversible in the first place.

**How to avoid:** Copy the specific operational consequence (revoke → recreate profile → redistribute QR to every field site) into the STD-05 table's "Consequence if wrong" cell verbatim in spirit, not a generic placeholder. Cross-link `05-dedicated-devices.md#enrollment-profile` (Delta 1) rather than re-deriving the token-type mechanics themselves.

**Warning signs:** RE-225's Case-1 table cell reading only "requires reconfiguration" or similar generic language.

**Phase to address:** 136.

**Confidence:** HIGH (direct read of `05-dedicated-devices.md:129` and PROJECT.md's explicit framing).

---

### Pitfall 12: Digital-signage / screensaver mode's "require session PIN" setting is documented without its userless-device precondition trap

**What goes wrong:** Microsoft Learn-adjacent documentation (Managed Home Screen app configuration) confirms a **"Require user to enter session PIN if screensaver has appeared"** setting exists, which resumes MHS after screensaver only once the user re-enters their session PIN. This setting presumes a per-user session/sign-in concept. But per `05-dedicated-devices.md`'s own scenario table, digital signage and multi-app kiosk on a **Standard token** have **no per-user identity** — there is no "session PIN" concept for those scenarios (session PIN is meaningful only in the Entra shared device mode scenario, which uses a *different* token type entirely). If RE-225 documents "enable screensaver mode" for a signage deployment and also enables "require session PIN after screensaver" out of a general instinct toward stronger security, the deployment can strand itself: the screensaver triggers, no session/PIN exists to re-enter (or the field admin never set one because the scenario has no per-user identity), and the signage display never resumes without a factory-reset-class recovery.

**How to avoid:** RE-225's digital-signage branch (if the discuss-phase scopes it in) must explicitly state that "require session PIN after screensaver" is **only meaningful for Entra shared device mode** deployments and must be left disabled for Standard-token, no-identity signage/multi-app-kiosk deployments — with a "What breaks if misconfigured" callout naming the stranding failure mode.

**Warning signs:** RE-225 draft enabling "require session PIN after screensaver" for any Standard-token scenario without an explicit no-identity caveat.

**Phase to address:** 136.

**Confidence:** MEDIUM (the individual setting's existence and behavior is corroborated across the MHS app-configuration documentation surface reviewed for this research; the specific "strands a userless device" consequence is this research's own inference from combining that setting with the existing corpus's Standard-token no-identity fact, not an explicit first-party statement of the combined failure).

**STATUS: CLOSED 2026-07-25 (adversarial review) — do NOT carry this pitfall into Phase 136.** The first-party row settles it verbatim: *"Require PIN code after returning from screensaver | bool | FALSE | … **This setting can only be used if Enable sign in is set to True.**"* RE-225 ships `enable_mhs_signin = FALSE` (the documented default, matching `05:72`'s "No user identity" on a Standard token), so the setting is **inert** and the stranding scenario is **structurally unreachable** on this recipe's path. Close it with the citation rather than inheriting a MEDIUM self-labelled inference. (E7 screensaver is also OUT of RE-225 independently — see the E7 verdict — which removes the precondition a second way.)

---

### Pitfall 13: Android 15 FRP table gets re-derived for the signage/multi-app branch instead of cross-linked

**What goes wrong:** `05-dedicated-devices.md` already carries a HIGH-confidence, MS-Learn-sourced, 3-pathway Android 15 FRP table (`#android-15-frp-reprovisioning`) that applies to Dedicated devices generally, including the multi-app and signage scenarios RE-225 targets. This is exactly the kind of already-shipped, high-quality, correctly-sourced content that a recipe author might reflexively re-explain "so the recipe is self-contained" — the same failure mode as Pitfall 10, called out separately here because the FRP table specifically carries HIGH-confidence first-party sourcing that would be a shame to duplicate-and-drift away from its source of truth.

**How to avoid:** RE-225's Verification or Recovery section should cross-link `05-dedicated-devices.md#android-15-frp-reprovisioning` for re-provisioning guidance rather than reproducing the pathway table.

**Warning signs:** A 3-row FRP pathway table appearing inside RE-225 itself.

**Phase to address:** 136.

**Confidence:** HIGH (direct read).

---

### Pitfall 14: Knox Mobile Enrollment vs Zero-Touch mutual exclusion gets re-explained instead of linked at the four-way provisioning fork

**What goes wrong:** PROJECT.md names the four-way provisioning method fork (with the Knox/Zero-Touch mutual exclusion at `05:198-240`) as RE-225's second decision point. `05-dedicated-devices.md` already documents this with a `⚠️ **Samsung admins:** Choose Knox Mobile Enrollment (KME) or Zero-Touch — never both` callout plus cross-links to the dedicated KME guide and the ZT-portal mutual-exclusion record. A recipe author building the Case-1 provisioning-method table for RE-225 risks re-typing the KME/ZT warning as flat prose inside a table cell instead of linking to the existing, more complete callout — losing the "out-of-sync enrollment state on Samsung hardware" specificity in the process.

**How to avoid:** The provisioning-method Case-1 table's "Consequence if wrong" cell for the Zero-Touch row should link to `05-dedicated-devices.md#provisioning-method-choice` rather than restate the KME/ZT rule inline.

**Warning signs:** RE-225 draft containing the string "Knox Mobile Enrollment" or "KME" anywhere outside a link.

**Phase to address:** 136.

**Confidence:** HIGH (direct read).

---

### Group C — Cross-Platform Terminology Traps (Phase 135 + 136)

### Pitfall 15: The Entra shared-device-mode collision has known siblings that also need explicit disambiguation

**What goes wrong:** the milestone context is explicit that the corpus has already been bitten by the Entra "shared device mode" (identity-layer, app-scoped MSAL concept on Android) vs. iOS Shared iPad (OS-level user partitions) vs. Windows SharedPC CSP (device-level fast-switch account management) collision — `05-dedicated-devices.md` already carries a defensive callout distinguishing Android Dedicated from both. This research identifies additional term collisions in the same danger class that RE-224/RE-225 are newly exposed to, none of which currently carry an equivalent defensive callout:

- **"Kiosk"** — Windows Assigned Access kiosk (a UWP/Edge app running full-screen above the lock screen, or the restricted-desktop multi-app variant) and Android's colloquial "kiosk mode" (which in Intune/Android Enterprise material almost always means Lock Task Mode or MHS, a completely different OS-level API) are both simply called "kiosk" throughout Microsoft's own docs and this corpus's own file names (`RE-097`'s H1 is literally "Android Enterprise Dedicated (kiosk/COSU)"). RE-224 and RE-225 sitting side-by-side in the same recipe pillar for the first time raises the odds a reader — or a future cross-linking author — treats "kiosk" as one cross-platform concept.
- **"Digital signage"** — Microsoft Learn's own Assigned Access overview lists "Interactive digital signage" as a *single-app kiosk* example on Windows; `05-dedicated-devices.md` lists digital signage as one of Android Dedicated's four MHS-based scenarios. The underlying mechanisms (a pinned UWP/Edge app vs. an MHS-launcher screensaver mode) share nothing but the marketing term.
- **"Lock Task Mode"** — an Android OS-level API term (`05-dedicated-devices.md`'s own glossary entry) that a Windows-side author, reaching for a familiar phrase to describe Assigned Access's app-pinning behavior, could import informally into RE-224's prose even though Windows has no API of that name.
- **"COSU" / "COBO"** — Android-only acronyms (Corporate-Owned Single-Use / Corporate-Owned Business-Only) with no Windows or iOS equivalent; a future capability-matrix or cross-platform-comparison author could be tempted to invent a false "Windows COSU-equivalent" cell once RE-224 exists alongside RE-225, since the recipe pair now makes a Windows/Android side-by-side comparison newly tempting to produce.

**How to avoid:** Neither recipe needs to resolve all of these preemptively, but each recipe's Prerequisites or "This recipe is NOT" section (the pattern recipe 01 already uses: `**This recipe is NOT:** Entra "Shared device mode" (SDM/Global Sign-Out is iOS/Android-only)...`) should extend the same defensive-disambiguation habit to whichever of these terms appears in its own prose. Do not introduce a new cross-platform comparison table or glossary cross-reference for "kiosk"/"digital signage"/"COSU" as part of this milestone unless a REQ explicitly calls for it — that is exactly the kind of scope-creep a two-recipe milestone should not absorb.

**Warning signs:** Either recipe using "kiosk," "digital signage," "Lock Task Mode," or "COSU/COBO" in a sentence that implies cross-platform equivalence without an explicit "this recipe is NOT X" disambiguation, mirroring recipe 01's existing pattern.

**Phase to address:** 135 (Windows recipe's own "This recipe is NOT" section) + 136 (Android recipe's equivalent) — resolved per-recipe, not as a new cross-platform artifact.

**Confidence:** HIGH for the individual term facts (direct reads + live Learn fetch); MEDIUM for the risk-magnitude judgment (this research's own synthesis of where the corpus's proven collision pattern is likely to recur, not a pre-existing documented incident).

---

### Group D — Corpus Process/Governance Pitfalls (Phases 135–138)

### Pitfall 16: Frozen `_glossary-android.md` / `android-capability-matrix.md` sidecar pins break on any line-shifting edit RE-225 triggers

**What goes wrong:** `docs/_glossary-android.md` and `docs/reference/android-capability-matrix.md` carry 365 and 139 aggregated sidecar pin coordinates respectively, across 16 frozen predecessor sidecars. RE-225's own glossary cross-links (it already reuses `#dedicated`, `#managed-home-screen`, `#entra-shared-device-mode`, `#play-integrity` anchors from `05-dedicated-devices.md`, and will likely need its own new terms or an MMHS-multi-app capability-matrix row) create direct authoring pressure on exactly these two files. Any edit that shifts a line number in either file — even an anchor-preserving one, like inserting a new glossary term alphabetically before an existing pinned line — silently breaks every frozen sidecar's `{file, line}` coordinate for that file, the same class of defect the corpus already paid down once via TOOL-04's 14-sidecar re-pin in v1.18.

**Why it happens:** glossary insertion is naturally alphabetical, and inserting a new term before an existing pinned entry is the single most common way to shift line numbers without touching the pinned line's own content.

**How to avoid:** Before any edit to either file, `grep` all 16 frozen sidecars for coordinates referencing that file and record the pre-edit line set. If the edit is unavoidable and does shift lines, the licensed remedy is **CARVE-1 option (a): a scoped, coordinate-only re-pin** — budgeted explicitly inside Phase 136 as a named contingency, never discovered mid-execution, and never option (b) (the broader `readAtClose`-conversion, which PROJECT.md explicitly reserves for "its OWN dedicated tooling milestone, NOT a pre-close scramble folded into an unrelated content/close milestone").

**Warning signs:** `git diff` on `docs/_glossary-android.md` or `docs/reference/android-capability-matrix.md` showing a net line-count change (insertion or deletion) rather than a pure content-in-place edit.

**Phase to address:** 136 (authoring discipline; budgeted CARVE-1(a) contingency if unavoidable) + 138 (verification that no un-budgeted re-pin occurred, or that a budgeted one landed cleanly).

**Confidence:** HIGH (direct read of PROJECT.md's explicit guardrail language).

---

### Pitfall 17: A phase-to-phase deferral evaporates without an explicit landing spot — the corpus's own #1 recurring lesson

**What goes wrong:** the v1.18 retrospective records this as *the* top lesson, and it had already recurred once by the time it was written down: Phase 132 deferred the `build-filename-map.mjs --self-test` row-count fix to Phase 133, but Phase 133's scope (TOOL-04..06) never covered that file, and the item evaporated — silently untracked — until the pre-archive `/gsd-audit-milestone` caught it. Both v1.19 content phases will generate small "flag for correction, out of this milestone's scope" items by design: Pitfall 1's Plan-1 verification could surface a stale claim in `130-RESEARCH.md`; RE-084's Wi-Fi claim was already corrected once in v1.18 and could need a follow-up; `05-dedicated-devices.md`'s staleness (Pitfall 22 below) may surface facts worth correcting at the source but out of RE-225's own scope. Any of these, deferred casually ("flag for later"), reproduces the exact evaporation pattern.

**How to avoid:** Any deferral discovered during Phase 135 or 136 must be given one of two explicit landing spots at the moment it's identified, never a vague "later": either (a) an explicit REQUIREMENTS.md line in a *specific* named phase (135/136/137/138) that will do the work, or (b) an explicit new entry in `.planning/milestones/v1.18-DEFERRED-CLEANUP.md`'s successor (this milestone's own deferred-cleanup artifact, authored at close) with a named resolution trigger — never a bare mention in a SUMMARY.md prose paragraph with no tracking artifact.

**Warning signs:** Any phase's SUMMARY.md or CONTEXT.md containing the words "defer," "flag for," or "out of scope, revisit" without an adjacent REQUIREMENTS.md line number or DEFERRED-CLEANUP.md heading.

**Phase to address:** 135/136 (at the moment of discovery) + 138 (pre-close audit sweep — grep every phase's SUMMARY for deferral language and confirm each has a landing spot, mirroring the Phase-134 `/gsd-audit-milestone` catch).

**Confidence:** HIGH (direct read of the v1.18 retrospective's own "Key Lessons" #1 and the DEFERRED-CLEANUP artifact's own `FILENAME-MAP-SELFTEST-DRIFT` post-mortem).

---

### Pitfall 18: C17's 200-char blockquote cap strains against a richly-worded Case-1 "Consequence if wrong" cell

**What goes wrong:** STD-05 already resolved the general decision-point-vs-C17-#12 collision by pulling options and consequences out of the blockquote into a table (the `> **Ask the admin:**` lead-in stays terse; the table carries the substance). But this pushes the risk downstream to the **table cells themselves** — RE-225's token-type "Consequence if wrong" cell, per Pitfall 11, needs to preserve real operational severity ("revoke the token, recreate the enrollment profile, redistribute the new QR/enrollment artifact to every field site"), and a table cell has no character cap, but a long cell can tempt an author to instead add explanatory *prose* immediately after the table as a new blockquote (mirroring the "> **What breaks if misconfigured:**" idiom used elsewhere in both anchor docs) — which reintroduces the exact C17 #12 exposure STD-05's table-based design was meant to avoid.

**How to avoid:** Keep the full severity language inside the table cell (no length limit there) or as plain paragraph prose below the table — never inside a new blockquote wrapping the consequence explanation. If a `> **What breaks if misconfigured:**` callout is still wanted for visual consistency with the rest of the anchor doc's house style, keep it to one clause and push detail to plain prose beneath it, exactly as v1.18's Pitfall #8 already established as the house remedy.

**Warning signs:** `c17-eee-contract.mjs` assertion #12 failing on either recipe's decision-point section during the first Phase-135/136 harness run.

**Phase to address:** 135 + 136 (authoring discipline, informed by the already-locked STD-05 shape — this is not a new design decision, just a place the existing discipline can still be violated).

**Confidence:** HIGH (direct read of C17 assertion #12 and STD-05's own D-01 rationale for why the table shape exists).

---

### Pitfall 19: A merged decision/comparison table crosses the 25-row prose-summary threshold without any single source table having needed one

**What goes wrong:** C17 assertion #11 requires a prose summary paragraph within 5 lines of any markdown table exceeding 25 rows. None of `05-dedicated-devices.md`'s individual tables (the 4-row Scenarios table, the 2-row token-type table, the ~12-row What-breaks-summary table) individually approach 25 rows. But RE-225's own delta-shaped tables — particularly if the provisioning-method Case-1 table (4 methods × multiple attribute columns) is merged with elements of the What-breaks-summary table for a "recipe-native" Configuration-Caused-Failures table (recipe 01's own house pattern) — could plausibly cross 25 rows once RE-225 adds its own MMHS-multi-app-specific rows on top of what it cross-links from the anchor doc. Because no *individual* source table needed a prose summary, an author copy-adapting rows from multiple existing tables has no local precedent reminding them the combined table now does.

**How to avoid:** Count rows in any merged/derived table during drafting, not just check C17 at the end — if a Configuration-Caused-Failures-style table in RE-225 approaches 20+ rows, add the prose summary preemptively rather than waiting for a red harness run to catch it.

**Warning signs:** `c17-eee-contract.mjs` assertion #11 failing on RE-225's Configuration-Caused-Failures or provisioning-method table.

**Phase to address:** 136.

**Confidence:** HIGH (direct read of C17 assertion #11's threshold; MEDIUM on whether RE-225's specific table design will actually cross it — that depends on discuss-phase decisions not yet made).

---

### Pitfall 20: MEDIUM-confidence source facts get promoted to flat step-level imperatives because the recipe format reads as more authoritative than a Guide

**What goes wrong:** this is a general risk named explicitly in the question, and `05-dedicated-devices.md` is a concentrated source of exactly the facts it warns about: the exit-PIN synchronization requirement (Pitfall 9), the token-expiry-has-no-never-expires-option claim (`[MEDIUM: no MS Learn statement on default, last_verified 2026-04-22]`), and the enrollment-profile section's own `[MEDIUM: MS Learn setup dedicated, last_verified 2026-04-22]` tag on the entire Delta-1/2/3/4 block. A recipe's Steps section reads as a numbered, authoritative, "do exactly this" procedure in a way a Guide's prose does not — an author translating a MEDIUM-tagged Guide fact into a recipe Step (e.g., "3. Set token expiry to 65 years" as a flat numbered instruction) strips the confidence signal the source document deliberately preserved.

**How to avoid:** Any recipe Step or decision-table cell whose underlying fact carries a `[MEDIUM: ...]` or `[ASSUMED]` tag in its source document (or, per recipe 01's own precedent, a fresh `[ASSUMED]` tag authored directly in the recipe) must carry an equivalent confidence marker forward — either the recipe-01-established `> **[ASSUMED]:** ...` blockquote idiom, or an inline citation preserving the MEDIUM tag — rather than being flattened into unqualified numbered-step language.

**Warning signs:** Any RE-225 Step or table cell stating a fact from `05-dedicated-devices.md`'s MEDIUM-tagged sections without a confidence marker.

**Phase to address:** 136.

**Confidence:** HIGH (direct read of the source document's own confidence tags; direct restatement of the question's own framing).

---

### Pitfall 21: RE-225 is authored on top of a stale anchor doc without re-verifying the load-bearing facts it depends on

**What goes wrong:** `docs/admin-setup-android/05-dedicated-devices.md`'s frontmatter states `last_verified: 2026-04-23` and `review_by: 2026-06-22`. **Today is 2026-07-25 — the anchor doc is 33 days past its own `review_by` date.** Per this corpus's own D2 verbatim-carry convention, a stale `review_by` is not itself a content error, but it is a signal that no one has re-checked the document's facts against current Microsoft Learn in over three months — exactly the situation that produced v1.18's Pitfall #2 (RE-084's now-inaccurate Wi-Fi-unsupported claim, discovered only because Recipe #1 independently re-verified rather than trusting the anchor doc). Authoring RE-225 as a delta on top of `05-dedicated-devices.md` without independently re-verifying the specific facts RE-225's own decision points depend on (token-type semantics, MHS Required-assignment behavior, the Android-15 FRP pathways) risks silently inheriting any drift that has accumulated since 2026-04-23.

**How to avoid:** Before RE-225 cross-links a specific fact from `05-dedicated-devices.md`, spot-check that fact against current Microsoft Learn (mirroring v1.18 Pitfall #2's remedy exactly). If a discrepancy is found, do not silently fix the frozen/Approved anchor doc as a side effect of recipe authoring — flag it as a candidate correction with an explicit landing spot per Pitfall 17, exactly as HYG-04 (the RE-084 Wi-Fi correction) was handled as its own named requirement in v1.18 rather than an unlogged drive-by edit.

**Warning signs:** RE-225 citing a `05-dedicated-devices.md` fact with no independent re-verification citation dated in this milestone; `05-dedicated-devices.md`'s `review_by` date remaining unaddressed (neither refreshed nor explicitly deferred with a landing spot) through Phase 138's close.

**Phase to address:** 136 (spot-verification during authoring) + 138 (close-gate check that the stale `review_by` was either refreshed or explicitly, trackably deferred — not silently ignored).

**Confidence:** HIGH (direct read of the frontmatter date against today's date).

---

### Pitfall 22: Navigation-last discipline is applied correctly for `index.md` but the WR-01 prose-bullet defect pattern recurs

**What goes wrong:** PROJECT.md names this explicitly as a known recurrence risk: v1.18's Phase 132 shipped the recipes TABLE in `docs/index.md` but initially missed the prose quick-nav bullet at `index.md:38`, a defect caught and fixed as WR-01 during code review — meaning the corpus has already proven this exact two-surface (table + prose bullet) update is easy to do half of and call done. Phase 137 must update **both** surfaces for RE-224/225, and the fact that WR-01 already happened once is not a guarantee it won't happen again with a different pair of surfaces (e.g., a table update without its corresponding decision-tree cross-link, or a registry update without its corresponding filename-map regeneration — see Pitfall 24).

**How to avoid:** Treat "wire the recipe pillar into navigation" as a checklist with each surface named individually (index.md table row, index.md prose quick-nav bullet, registry Approved-status flip, filename-map regeneration) rather than a single undifferentiated task — and verify each surface's diff independently before considering Phase 137 done, exactly as recipe 01/02's WR-01 fix demonstrated is necessary.

**Warning signs:** A Phase-137 `git diff` touching `docs/index.md`'s recipes table without a corresponding diff near line 38's prose quick-nav bullet.

**Phase to address:** 137.

**Confidence:** HIGH (direct read of PROJECT.md's explicit naming of "the WR-01 Phase-132 defect pattern").

---

### Pitfall 23: The hubs-not-wired ruling is assumed to carry forward silently instead of being explicitly re-decided

**What goes wrong:** `check-phase-132.mjs`'s `V-132-HUBSNOTWIRED` assertion hard-fails if `common-issues.md` / `quick-ref-l1.md` / `quick-ref-l2.md` reference `docs/recipes/*` at all — the explicit v1.18 ruling was that recipes are provisioning Guides, not troubleshooting docs, and therefore do not belong in the L1/L2 troubleshooting hub surfaces. PROJECT.md names "V-132-HUBSNOTWIRED disposition" as one of this milestone's own 8 unresolved gray areas — meaning whether the *same* ruling extends unchanged to RE-224/RE-225, or whether a new assertion (`V-137-HUBSNOTWIRED` or similar) needs to be authored fresh, is **not yet decided** and must not be assumed either way. The risk runs in both directions: (a) an author who assumes "navigation-last" means "eventually wire everywhere" could add a recipe reference to a troubleshooting hub in violation of the standing ruling's spirit, or (b) an author who assumes the v1.18 ruling automatically covers v1.19's new recipes without a fresh phase-137 assertion could ship without the explicit disposition PROJECT.md calls for.

**How to avoid:** Phase 137 must explicitly re-author (or explicitly extend) a hubs-not-wired assertion covering RE-224/225, resolved as a **named decision** at discuss-phase (per the project's `/adversarial-review` convention for gray areas) rather than defaulting either way by omission. The close-gate summary should state the ruling explicitly, the same way v1.18's did.

**Warning signs:** Phase 137 shipping with no explicit hubs-wiring assertion for RE-224/225 at all (silent default in either direction).

**Phase to address:** 137.

**Confidence:** HIGH (direct read of PROJECT.md's explicit gray-area list and `check-phase-132.mjs`'s existing ruling).

---

### Pitfall 24: filename-map.md regeneration or the registry-row addition lands without the other

**What goes wrong:** `scripts/pipeline/filename-map.md` is a generated file derived from `docs/_registry/RE-index.md`; the two RE-NNN rows for RE-224/225 must land in the registry AND the map must be regenerated via `node scripts/pipeline/build-filename-map.mjs` (never hand-edited) — carried forward unchanged from v1.18's Pitfall #14, since the mechanism is identical this milestone. PROJECT.md additionally names the `build-filename-map.mjs --self-test` drift-canary as needing an explicit 223→225 bump this close, distinct from the map regeneration itself — a fixture separate from the generated file that was *already* the subject of v1.18's own dropped-deferral (Pitfall 17 / `FILENAME-MAP-SELFTEST-DRIFT`), making this the second consecutive milestone where this exact fixture needs a manual count bump.

**How to avoid:** Whichever phase adds the RE-224/225 registry rows must, in the same commit, (a) regenerate `filename-map.md` and verify via `git diff` that exactly the 2 new rows appear, and (b) bump the `--self-test` fixture's hardcoded row-count expectation from 223 to 225 and re-run `--self-test` to confirm 8/8 PASS — do not let (b) repeat the exact v1.18 evaporation.

**Warning signs:** A commit touching `docs/_registry/RE-index.md` without a matching `filename-map.md` diff, or `build-filename-map.mjs --self-test` left at a stale hardcoded count through Phase 138's close.

**Phase to address:** 137.

**Confidence:** HIGH (direct read of the generated-file convention and the DEFERRED-CLEANUP artifact's own drift-canary framing).

---

### Pitfall 25: `doc_type: Recipe` is proposed a second time now that two recipes exist

**What goes wrong:** carried forward from v1.18's Pitfall #7 — the closed 4-value `doc_type` taxonomy (`Runbook | Guide | RCA | Reference`) already absorbed the Device Recipe class via a D-02 edge ruling (`docs/recipes/* → Guide`) rather than a 5th enum value, and C17 assertion #8 still only checks presence, not enum membership, so a `doc_type: Recipe` value would pass the harness silently. With a second recipe generation now shipping, the "surely recipes deserve their own type by now" argument is marginally more tempting than it was with only one recipe — precisely because two data points can look like a pattern justifying a taxonomy change, when the existing ruling already anticipated and explicitly precludes exactly this reasoning.

**How to avoid:** RE-224/RE-225 frontmatter must carry `doc_type: Guide`, following the existing D-02 ruling exactly. If a genuine case emerges for a 5th taxonomy value, that is a formal `EEE-SOP-standard.md` amendment routed through `/adversarial-review`, never an incidental frontmatter choice inside Phase 135/136.

**Warning signs:** `doc_type: Recipe` appearing in either recipe's frontmatter.

**Phase to address:** 135/136 (authoring) — low residual risk given the standing precedent, carried forward as a one-line reminder rather than a fresh investigation.

**Confidence:** HIGH (direct read of `EEE-SOP-standard.md`'s existing D-02 ruling).

---

### Pitfall 26: The V118 back-anchor pin is attempted before the owner's push lands, or a frozen predecessor's bug is copied forward unaudited

**What goes wrong:** PROJECT.md names this the milestone's own named **BLOCKING PRECONDITION**: the v1.18 close-gate SHA `7af8a147` and 198 commits are currently on no remote (`master`'s upstream was mis-set and has only just been repointed to `origin/master`), so the `V118` pin has no valid, reachable target until the owner pushes — attempting the pin before that push lands would either fail structurally or (worse) succeed against a SHA that later becomes unreachable if the push never happens exactly as recorded, mirroring the `V117`-had-zero-call-sites near-miss already documented for a prior milestone. Separately, the v1.18 retrospective's own Key Lesson explicitly warns against copying a frozen predecessor's *bug* forward across the Path-A lineage (the `['v1.16-phases']` → `['v1.18-phases']` correction was itself a "don't copy blind" fix) — meaning Phase 138's own apex-range value (`[48..137]`) and archive-root token must be independently derived, not copy-pasted from Phase 134's pattern.

**How to avoid:** Phase 138 must verify the owner's push has landed (confirm the v1.18 close-gate SHA and its dual-token subject-line-confirmed commit are present on `origin/master`) before authoring `readAtV118Close` / the `V118` entry — treat this as a hard go/no-go gate, not a soft assumption. Independently derive and audit `[48..137]` and the archive-root token rather than copying Phase 134's values forward.

**Warning signs:** A `V118` entry appearing in `_lib/frozen-at-close.mjs` before `git branch -r --contains <v1.18-close-SHA>` returns a non-empty result; an apex or archive-root token in Phase 138's validator matching Phase 134's literal string without independent verification.

**Phase to address:** 138 (hard gate at the start of the harness-close phase, not discovered mid-phase).

**Confidence:** HIGH (direct read of PROJECT.md's explicit BLOCKING PRECONDITION language and the v1.18 retrospective's own Key Lessons).

---

## Technical Debt Patterns

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|--------------------|-----------------|------------------|
| Re-explaining single-app kiosk mechanics in RE-224 "for context" instead of a one-line cross-link | Reads self-contained on first pass | Second drifting source of truth for content recipe 01 already owns Approved; violates the milestone's own explicit design constraint | Never — link only, per Pitfall 2 |
| Re-deriving `05-dedicated-devices.md`'s token-type/MHS/FRP content inside RE-225 | Recipe feels complete without clicking away | Duplicate source of truth for MEDIUM-confidence facts whose caveats are easy to lose in paraphrase (Pitfalls 10, 13, 14, 20) | Never for facts the anchor doc already owns; OK for genuinely recipe-native procedural scaffold (Steps, Verification, Anti-Feature table) the anchor doc lacks |
| Copying the multi-app kiosk edition floor from memory/older community posts instead of a fresh fetch | Fast first draft | Ships a wrong, over-restrictive edition gate (Pitfall 4) — the floor unified across single/multi-app in a Learn revision as recent as 6 days before this research | Never for prerequisite/requirement facts — always re-verify against current Learn |
| Treating "navigation-last" as "wire everywhere eventually" | Feels thorough | Violates the standing `V-132-HUBSNOTWIRED` ruling if applied to troubleshooting hubs without an explicit re-decision (Pitfall 23) | Never by default — the hubs-wiring disposition is a named decision, not an assumption |
| Skipping the `--self-test` fixture count bump because "the map itself is right" | Saves one command | Repeats the exact v1.18 `FILENAME-MAP-SELFTEST-DRIFT` evaporation a second consecutive milestone (Pitfall 24) | Never — bump the count and re-run `--self-test` in the same commit as the registry rows |

## Integration Gotchas

| Integration | Common Mistake | Correct Approach |
|-------------|-----------------|--------------------|
| Multi-app kiosk + Shared PC CSP | Present as a supported layered combination without a first-party source | Treat as mutually exclusive branches (mirroring recipe 01's own single-app-vs-Shared-PC fork) unless the discuss-phase's `/adversarial-review` finds and cites an affirmative first-party source (Pitfall 5) |
| Multi-app kiosk XML account-targeting | Assume device-group Intune assignment alone activates the restricted experience for any signed-in user | XML account/group entries are a separate, required authoring decision distinct from the Intune device-group policy-delivery scope (Pitfall 8) |
| MHS exit-PIN + device restrictions | State the synchronization requirement as flat fact | Preserve the `[MEDIUM: MS Q&A community]` tag — no first-party source was found on this research pass either (Pitfall 9) |
| MHS screensaver + Standard-token no-identity devices | Enable "require session PIN after screensaver" as a general security hardening step | Restrict to Entra shared device mode deployments only; leave disabled for identity-less Standard-token signage/multi-app kiosks (Pitfall 12) |
| Frozen glossary/capability-matrix sidecars | Insert new terms/rows without checking pinned-coordinate impact first | Grep all 16 frozen sidecars for the target file's coordinates before editing; budget CARVE-1(a) coordinate-only re-pin explicitly if unavoidable (Pitfall 16) |

## Performance Traps

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|-----------------|
| Adding `check-phase-135..138.mjs` validators deepening the apex further past `[48..133]` | Chain-apex runtime and the already-flagged Windows cold-clone O(n²) cascade continue compounding (`WINDOWS-CLONE-DEEPNEST-TIMEOUT-01`, carried open from v1.18) | Continue treating Linux GHA as sole-authoritative per the established D-03/D-04 pattern; do not attempt to "fix" the cold-clone cost inside this content milestone — it remains explicitly out of scope | Windows cold-clone full-chain runs; deepens by 4 more phases this milestone |

## Security Mistakes

| Mistake | Risk | Prevention |
|---------|------|------------|
| Documenting the kiosk lockout-recovery path incompletely or omitting it | An admin locked out by a misconfigured allow-list or account-model mismatch has no documented path back except a full wipe/re-provision | RE-224 must include the explicit Recovery subsection per Pitfall 7 — Ctrl+Alt+Del breakout is temporary only; the Settings-app self-service removal path is unavailable once multi-app is configured; permanent removal requires the Intune policy unassignment path |
| Exported/printed Dedicated enrollment QR/NFC artifacts treated as non-sensitive | QR codes embed the enrollment token plus Wi-Fi credentials in plaintext (already documented in `05-dedicated-devices.md`); RE-225 must not silently drop this framing when cross-linking | Preserve the "treat the QR image as a secret artifact" framing verbatim when RE-225 cross-links the provisioning-method section |

## UX Pitfalls

| Pitfall | User Impact | Better Approach |
|---------|-------------|-------------------|
| Leaving a signage device's "require session PIN after screensaver" enabled with no session concept | Device strands behind a PIN prompt nobody can answer, requiring a factory-reset-class recovery for what should be an unattended display | RE-225 names this setting's Standard-token-vs-Entra-shared-device-mode applicability explicitly (Pitfall 12) |
| Assuming the multi-app kiosk allow-list only needs the pinned apps themselves | Users hit "app cannot be opened" on helper/child-process flows (file picker, OAuth redirect, print dialog) with no obvious cause | RE-224's Verification section exercises a representative app's secondary flows, not just Start-menu presence (Pitfall 6) |

## "Looks Done But Isn't" Checklist

- [ ] **RE-224 single-app cross-link:** Often expands into a paraphrase — verify it is genuinely one sentence + one link, with no restated Shell-Launcher/AUMID/autologon mechanics
- [ ] **RE-224 edition floor:** Often copied from memory/older posts — verify the Prerequisites section cites a fetch dated in this milestone, not recipe 01 or training-data recall
- [ ] **RE-224 recovery path:** Often missing entirely — verify a named Recovery subsection exists distinguishing the Ctrl+Alt+Del breakout (temporary) from the Intune-policy-unassignment path (permanent) and states the Settings-app self-service path is unavailable
- [ ] **RE-224 kiosk XML account-targeting:** Often collapsed into "assign to device group, done" — verify the account/group-targeting decision inside the XML is a separate, named step
- [ ] **RE-225 anchor-doc re-verification:** Often trusted uncritically — verify the specific facts RE-225's decision points depend on were spot-checked against current Learn given `05-dedicated-devices.md`'s past-due `review_by`
- [ ] **RE-225 confidence tags:** Often flattened into imperative Steps — verify every fact carrying a `[MEDIUM: ...]`/`[ASSUMED]` tag in its source retains an equivalent marker in the recipe
- [ ] **RE-225 MHS exit-PIN citation:** Often silently upgraded — verify the confidence tag stays `[MEDIUM: MS Q&A community]` unless a genuinely new first-party source was found
- [ ] **Both recipes' frozen-surface discipline:** Often assumed safe by omission — verify no commit touches recipe 01's Step 5a/5b headings or shifts a line in the two frozen Android sidecars without a budgeted CARVE-1(a) contingency
- [ ] **Both recipes' registry wiring:** Often stops at `RE-index.md` — verify `filename-map.md` was regenerated (not hand-edited) AND `build-filename-map.mjs --self-test`'s row-count fixture was bumped 223→225 in the same commit
- [ ] **Both recipes' nav wiring:** Often half-done (table without prose bullet, per WR-01) — verify `docs/index.md`'s recipes table AND its prose quick-nav bullet near line 38 both land
- [ ] **Hubs-not-wired disposition:** Often assumed by default in either direction — verify Phase 137 ships an explicit, named ruling (extended or freshly authored) rather than silence
- [ ] **`doc_type`:** Verify both recipes carry `Guide`, never a new `Recipe` taxonomy value
- [ ] **V118 pin:** Verify Phase 138 confirms the owner's push landed (SHA reachable on `origin/master`) before authoring `readAtV118Close`, and independently derives `[48..137]` rather than copying Phase 134's apex value

## Recovery Strategies

| Pitfall | Recovery Cost | Recovery Steps |
|---------|-----------------|-------------------|
| C17 #12/#11 overflow discovered late (Pitfalls 18, 19) | LOW–MEDIUM | Move overflow content from blockquote/table into plain paragraph prose per STD-05's already-established shape; re-run `c17-eee-contract.mjs` |
| Frozen Step 5a/5b heading accidentally touched (Pitfall 3) | LOW if caught same-commit, MEDIUM if it reaches the deep apex before detection | Revert the heading text to the exact pinned string; re-run `check-phase-130.mjs` directly, then the full apex |
| Frozen glossary/capability-matrix sidecar coordinates shifted (Pitfall 16) | MEDIUM | Execute the budgeted CARVE-1(a) coordinate-only re-pin across the affected sidecars, mirroring the v1.18 TOOL-04 precedent exactly; do not attempt option (b) |
| `doc_type: Recipe` accidentally shipped (Pitfall 25) | LOW if caught same-phase | Frontmatter + block-line edit to `Guide` in both recipes; re-run C17 |
| filename-map.md / self-test drift discovered late (Pitfall 24) | LOW | Re-run `build-filename-map.mjs`, diff-verify only the expected 2 new rows, bump the `--self-test` fixture count, re-run `--self-test` |
| A phase-to-phase deferral found evaporated at close (Pitfall 17) | LOW–MEDIUM depending on the item | Same remedy the corpus already used once: `/gsd-audit-milestone` sweep catches it, a focused gap-closure task resolves it before archive — do not let a second recurrence ship silently |

## Pitfall-to-Phase Mapping

| Pitfall | Prevention Phase | Verification |
|---------|--------------------|-----------------|
| #1 Plan-1 hard gate skipped | 135 (blocking precondition) | Fresh Learn citation dated this milestone justifies the multi-app mechanism before Step content is drafted |
| #2 One-line cross-link drifts into paraphrase | 135 | RE-224's single-app section is one sentence + one link; no restated Shell-Launcher/AUMID/autologon content |
| #3 Frozen Step 5a/5b headings touched indirectly | 135 authoring + 137 text-normalization passes | `git diff` never touches `01-shared-windows-avd-client.md`; `check-phase-130.mjs` re-run after any corpus-wide text operation |
| #4 Edition-floor claim over-restrictive | 135 | Prerequisites cites a same-milestone Learn fetch; states the unified Pro/Enterprise/Education/IoT floor |
| #5 Multi-app + SharedPC layering asserted without a source | 135, resolved via `/adversarial-review` | Branches presented as mutually exclusive unless an affirmative citation is added |
| #6 Wrong/incomplete allow-list | 135 | "What breaks if misconfigured" callout + Verification exercises secondary app flows, not just Start-menu presence |
| #7 Kiosk-lockout recovery path omitted | 135 | Explicit Recovery subsection present, distinguishing temporary breakout from permanent Intune-policy removal |
| #8 XML account-targeting collapsed into device-group-only | 135 | A named, separate step covers XML-internal account/group targeting |
| #9 MHS exit-PIN sync confidence silently upgraded | 136 | `[MEDIUM: MS Q&A community]` tag preserved unless a new first-party citation is found |
| #10 RE-225 re-derives anchor-doc content | 136 discuss-phase + authoring | Token-type/MHS/FRP facts appear as links into `05-dedicated-devices.md` anchors, not restated prose |
| #11 Token-type consequence severity softened | 136 | Case-1 table cell preserves the revoke/recreate/redistribute-to-every-field-site framing |
| #12 Signage screensaver-PIN userless trap | 136 | Setting explicitly scoped to Entra shared device mode only; disabled for Standard-token no-identity scenarios |
| #13 FRP table re-derived | 136 | RE-225 links `05-dedicated-devices.md#android-15-frp-reprovisioning` rather than reproducing the pathway table |
| #14 KME/ZT mutex re-explained | 136 | Provisioning-method table links to `05-dedicated-devices.md#provisioning-method-choice` rather than restating the warning |
| #15 Cross-platform terminology collisions (kiosk/signage/lock-task/COSU) | 135 + 136, per-recipe | Each recipe's own "This recipe is NOT" section covers whichever collision-prone term it uses |
| #16 Frozen sidecar pins broken by glossary/matrix edits | 136 authoring + 138 verification | Pre-edit coordinate grep performed; CARVE-1(a) budgeted if unavoidable, never option (b) |
| #17 Deferral evaporates without a landing spot | 135/136 at discovery + 138 close sweep | Every deferral has an explicit REQUIREMENTS.md line or DEFERRED-CLEANUP.md entry, never bare SUMMARY prose |
| #18 Blockquote #12 overflow on decision-cell prose | 135 + 136 | Severity language lives in table cells/plain prose, never wrapped in a new blockquote |
| #19 Merged table crosses 25-row threshold unnoticed | 136 | Row count checked during drafting for any merged/derived table; prose summary added preemptively if approaching 20+ rows |
| #20 MEDIUM-confidence facts flattened to imperatives | 136 | Every Step/cell sourced from a MEDIUM/[ASSUMED]-tagged fact carries an equivalent marker forward |
| #21 Stale anchor doc trusted uncritically | 136 authoring + 138 close check | RE-225's cross-linked facts spot-verified against current Learn; `05-dedicated-devices.md`'s past-due `review_by` explicitly addressed or trackably deferred |
| #22 WR-01 prose-bullet pattern recurs | 137 | `docs/index.md` table AND prose quick-nav bullet (near line 38) both diffed in the same commit |
| #23 Hubs-not-wired disposition assumed silently | 137 | An explicit, named ruling (extended or freshly authored assertion) ships covering RE-224/225 |
| #24 filename-map/self-test drift | 137 | `filename-map.md` regenerated + diffed to exactly 2 new rows; `--self-test` fixture bumped 223→225 and re-run 8/8 PASS, same commit as registry rows |
| #25 `doc_type: Recipe` proposed again | 135/136 | Both recipes carry `doc_type: Guide` |
| #26 V118 pin attempted early / lineage bug copied forward | 138 (hard gate) | Owner's push confirmed landed on `origin/master` before `readAtV118Close` is authored; `[48..137]` and archive-root token independently derived, not copied |

## Sources

- Microsoft Learn — `windows/configuration/assigned-access/overview` (Assigned Access Overview, system requirements, edition table), fetched live 2026-07-25, `ms.date` 2026-07-15 / `updated_at` 2026-07-21 — HIGH confidence, official, current
- Microsoft Learn — `windows/configuration/assigned-access/configure-multi-app-kiosk` (Configure a Multi-App Kiosk With Assigned Access — CSP/Intune delivery mechanism, account-targeting model, removal/recovery behavior), fetched live 2026-07-25, `ms.date` 2025-03-07 / `updated_at` 2025-03-10 — HIGH confidence, official, but this specific sub-page is materially older than the overview page fetched the same day, corroborating Pitfall 1's staleness-asymmetry concern
- WebSearch — Windows Shell Launcher / Assigned Access mutual exclusion, corroborated by Microsoft Learn `windows/iot/iot-enterprise` family pages and multiple independent community deep-dives — HIGH confidence (mutual exclusion is independently stated across first-party IoT Enterprise docs and already shipped in recipe 01's own text)
- WebSearch — Shared PC CSP + multi-app kiosk combination on the same device — MEDIUM confidence (community sources describe combining custom OMA-URI `AssignedAccess` + Shared PC settings; no single first-party page found describing the *interaction/conflict* directly — Pitfall 5 flags this explicitly)
- WebSearch — Managed Home Screen exit-kiosk-mode PIN + device-restrictions PIN synchronization — MEDIUM confidence; **no first-party Microsoft Learn statement combining the two settings into one synchronization requirement was found on this research pass**, consistent with the existing corpus's own `[MEDIUM: MS Q&A community]` tag (Pitfall 9 states this explicitly as an honest gap)
- WebSearch — Managed Home Screen screensaver mode / "require session PIN if screensaver has appeared" setting — MEDIUM confidence (setting's existence and behavior corroborated across the MHS app-configuration documentation surface; the userless-device stranding consequence is this research's own inference, not a first-party statement)
- Repo — `D:\claude\Autopilot\.planning\PROJECT.md` (v1.19 scope, 8 named gray areas, BLOCKING PRECONDITION language, `A-LOCK-1`/CARVE-1 guardrails) — HIGH confidence, direct read
- Repo — `D:\claude\Autopilot\.planning\research\PITFALLS.md` (v1.18's prior output, superseded here) — HIGH confidence, direct read, carried-forward mechanisms restated in v1.19 terms
- Repo — `D:\claude\Autopilot\.planning\RETROSPECTIVE.md` (v1.18's "Key Lessons" — deferral-evaporation lesson, don't-copy-a-frozen-bug-forward lesson) — HIGH confidence, direct read
- Repo — `D:\claude\Autopilot\.planning\milestones\v1.18-DEFERRED-CLEANUP.md` (CARVE-1 option (a)/(b) framing, V118-PIN-DEFERRAL, WINDOWS-CLONE-DEEPNEST-TIMEOUT-01, `FILENAME-MAP-SELFTEST-DRIFT` post-mortem) — HIGH confidence, direct read
- Repo — `D:\claude\Autopilot\docs\_standards\EEE-SOP-standard.md` (STD-05 admin decision-point block format D-01..D-07, Doc Type Taxonomy D-02, C17 assertion list including #11/#12) — HIGH confidence, direct read
- Repo — `D:\claude\Autopilot\docs\recipes\01-shared-windows-avd-client.md` (RE-222, anchor doc for the Windows kiosk-vs-Shared-PC fork, `[ASSUMED]` tag idiom precedent) — HIGH confidence, direct read, `last_verified: 2026-07-17`
- Repo — `D:\claude\Autopilot\docs\admin-setup-android\05-dedicated-devices.md` (RE-097, anchor doc for RE-225's delta, MEDIUM-confidence tags on token-expiry and exit-PIN facts) — HIGH confidence, direct read, `last_verified: 2026-04-23` / `review_by: 2026-06-22` (**33 days past due as of this research date, 2026-07-25**)
- Repo — `D:\claude\Autopilot\scripts\validation\check-phase-130.mjs` (V-130-KIOSKFORK literal-string pin at lines 64/67) — HIGH confidence, direct read
- Repo — `D:\claude\Autopilot\scripts\validation\check-phase-132.mjs` (V-132-HUBSNOTWIRED assertion, V-132-INDEXNAV) — HIGH confidence, direct read

---
*Pitfalls research for: Device Configuration Recipes #3 & #4 (Windows multi-app kiosk + Android MMHS multi-app Dedicated) — v1.19 milestone*
*Researched: 2026-07-25*
