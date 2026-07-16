# Pitfalls Research

**Domain:** Device Configuration Recipes — self-deploying Entra-joined shared Windows AVD-client device (Windows App) + Shared iPad full provisioning — added to an existing 5-platform Intune EEE documentation corpus
**Researched:** 2026-07-16
**Confidence:** HIGH (Microsoft Learn verified for all product-behavior claims; repo-verified for all doc-integration claims)

## Critical Pitfalls

### Pitfall 1: Recipe #1 conflates the AVD *client endpoint* with the AVD *session host*

**What goes wrong:**
Recipe #1's Autopilot self-deploying + Shared PC + Windows App configuration all target the **physical/virtual thin-client device the end user sits at**. Microsoft's "Using Azure Virtual Desktop multi-session with Microsoft Intune" surface (device-context app/config rules, ADMX limits, no Autopilot/ESP support) targets the **session host VM inside the host pool** — a completely different Intune-managed object the recipe's own scope guardrail excludes ("assumes AVD infrastructure... already exists"). Authors researching "AVD + Intune + shared" will surface the multi-session doc first and may pull its rules (no Autopilot, no ESP, device-context-only apps, no BitLocker/remote-wipe actions) into the client-endpoint recipe by mistake — those rules do NOT apply to the endpoint.

**Why it happens:**
Both surfaces use the words "Azure Virtual Desktop," "shared," "multi-session," and "Intune" in the same breath; Microsoft's own docs organize them under sibling pages with no disambiguating banner.

**How to avoid:**
Open Recipe #1 with an explicit scope banner (mirroring the existing `08-self-deploying.md` "Version gate" callout pattern): *"This recipe configures the AVD **client** device — the endpoint a user sits at to reach a remote session. It does not configure the AVD **session host** (Azure VM in a host pool); see [Using AVD multi-session with Intune] for that surface."* Confirmed distinct via Microsoft Learn: `intune/solutions/azure-virtual-desktop-multi-session` explicitly states Autopilot, Commercial OOBE, and ESP are **not supported** on session hosts — a fact that must never leak into Recipe #1, where Autopilot self-deploying + ESP are the deployment mechanism.

**Warning signs:** Any sentence in Recipe #1 citing "Windows Enterprise multi-session," ADMX-ingested policy limits, or ESP-not-supported — those all belong to the session-host surface, not the client.

**Phase to address:** Discuss-phase scoping (before Recipe #1's plan) + Recipe #1 authoring phase (opening scope banner is the concrete artifact).

---

### Pitfall 2: Self-deploying mode's wired-ethernet-only claim is stale relative to current Microsoft Learn

**What goes wrong:**
The corpus's existing `docs/admin-setup-apv1/08-self-deploying.md` (RE-084, `last_verified: 2026-04-13`) states flatly: *"Wired ethernet mandatory... Wi-Fi is NOT supported."* Current Microsoft Learn (`autopilot/self-deploying`, updated 2026-06-22) instead says: for Ethernet, no user interaction is required; **for Wi-Fi, the user only needs to pick language/locale/keyboard and join the network** — i.e., Wi-Fi self-deploying IS supported, just with 2 extra prompts. If Recipe #1 is authored by copying RE-084's prerequisite language verbatim (an obvious shortcut since it's the closest existing content), it inherits a now-inaccurate hard requirement and may steer admins away from a supported wireless self-deploying kiosk deployment.

**Why it happens:** RE-084 was `last_verified` 2026-04-13, pre-dating a Learn content revision; the recipe author's fastest path is copy-adjacent-doc, not re-verify-against-Learn.

**How to avoid:** Recipe #1 must independently re-verify self-deploying networking requirements against current Microsoft Learn (not copy RE-084's prerequisite list uncritically), and flag the discrepancy for RE-084 itself as a candidate correction (out-of-band from this milestone unless the discuss-phase pulls it in-scope — do NOT silently fix a frozen/approved doc as a side effect of Recipe authoring without a REQ line).

**Warning signs:** Recipe #1 draft asserting "Wi-Fi is not supported" without a citation dated in this milestone.

**Phase to address:** Recipe #1 content-authoring phase (verification step); flag RE-084 correction as a separate backlog item if not folded into this milestone's roadmap.

---

### Pitfall 3: TPM attestation failure is systematically confused with VM/virtual-TPM incompatibility

**What goes wrong:**
Self-deploying's most common real-world failure is the `0x800705B4` timeout — but it has two unrelated root causes that get conflated in troubleshooting content: (a) genuine TPM 2.0 hardware/firmware/attestation-endpoint problems on **physical** hardware, and (b) attempting self-deploying **at all** on a VM or Hyper-V virtual TPM, which is categorically unsupported (confirmed on Microsoft Learn: "This limitation includes Hyper-V virtual TPMs"). Recipe #1 targets a **physical** shared kiosk-style endpoint, but because the domain is "AVD," authors may reflexively test/document the recipe against a VM (the same VM class Windows Autopilot self-deploying and pre-provisioning explicitly do **not** support per the AVD multi-session doc) and produce guidance that silently assumes a scenario Autopilot cannot perform.

**How to avoid:** State explicitly in Recipe #1 prerequisites that the target device is **physical hardware with a real TPM 2.0** (not an AVD/Hyper-V VM) — self-deploying + pre-provisioning are unsupported on virtual TPMs categorically, independent of any AVD-specific limitation. Link the existing `docs/l2-runbooks/03-tpm-attestation.md` deep-dive rather than re-authoring TPM triage.

**Warning signs:** Recipe #1 draft that tests/screenshots against an Azure VM, or omits an explicit "physical device only" prerequisite line.

**Phase to address:** Recipe #1 authoring phase (Prerequisites section).

---

### Pitfall 4: Windows App does not reliably run under single-app kiosk / Assigned Access

**What goes wrong:**
The intuitive kiosk shape for "one shared PC, one purpose (reach AVD)" is Windows single-app kiosk (Assigned Access). Community reports (corroborated across multiple independent sources) show Windows App failing to launch correctly under single-app Assigned Access profiles, and the built-in single-app kiosk **provisioning-profile** mechanism does not work on Windows 11 at all — only the Intune multi-app kiosk (`AssignedAccess` CSP via Settings Catalog / custom OMA-URI) is the currently-recommended, scalable path. A recipe that documents single-app kiosk + Windows App as the "simple" answer will likely not work for readers who follow it.

**How to avoid:** Recipe #1 should default to **Intune multi-app kiosk configuration** (Settings Catalog `AssignedAccess` policy) rather than single-app Assigned Access, and call out the single-app limitation explicitly as a "why not this" note rather than silently omitting it (a reader will find the single-app path via search regardless).

**Warning signs:** Recipe steps referencing "Kiosk mode (single app)" in the Intune template picker for a Windows App–reaching-AVD scenario.

**Phase to address:** Recipe #1 authoring phase (Steps section — kiosk configuration sub-step).

---

### Pitfall 5: Self-deploying's "no primary user" breaks Windows App's per-user AVD entitlement/feed model if undocumented

**What goes wrong:**
Self-deploying mode deliberately assigns **no primary user** (Microsoft Learn: "Intune doesn't automatically configure a primary user... Some Intune capabilities rely on a primary user"). AVD access via Windows App, and the AVD entitlement itself, are **per-user** (bundled in M365 E3/E5/Business Premium/Windows Enterprise, not a device-based grant). A recipe that stops at "device is Entra-joined and Windows App is installed" without documenting that (a) each individual user must sign into Windows App with their own Entra credentials to discover their AVD feed, and (b) Company-Portal-style **user-targeted** app assignment silently fails on this device class (same failure mode already documented in `08-self-deploying.md`: "User-targeted apps... are not installed... because there is no user context") will produce a device that looks configured but where the actual AVD connection experience was never validated end-to-end.

**How to avoid:** Recipe #1 must include an explicit "Verification" step where a **non-admin end user** signs into Windows App interactively and confirms their AVD feed populates — do not treat "Windows App installed" as done. Cross-link the existing self-deploying no-user-affinity callout rather than re-deriving it.

**Warning signs:** Recipe #1's Verification checklist stops at device-level checks (Entra-joined, app installed) without an interactive per-user feed-discovery check.

**Phase to address:** Recipe #1 authoring phase (Verification section).

---

### Pitfall 6: FSLogix / session-host content scope-creep into a device-only recipe

**What goes wrong:**
"Shared Windows AVD-client device" strongly primes an author to explain profile persistence (FSLogix) since "shared" + "AVD" immediately evokes profile-container concerns — but FSLogix runs on the **session host**, is explicitly out of scope per the milestone's own guardrail ("assumes AVD infrastructure... FSLogix... already exists," mirroring the v1.14 802.1X "assumes RADIUS exists" guardrail), and documenting it in a device-config recipe both duplicates a surface this corpus doesn't own and gives false confidence that the recipe is "complete" for the shared-desktop experience when it only covers the client endpoint.

**How to avoid:** One explicit out-of-scope line in Recipe #1's Summary/Prerequisites (matching the 802.1X precedent's phrasing) — e.g., *"This recipe assumes AVD host pools, session hosts, and FSLogix profile configuration already exist and are working; it configures the client endpoint only."* Do not add a "profile persistence" or "FSLogix" section anywhere in the recipe, even as a cross-reference stub, unless a REQ explicitly calls for a link-out.

**Warning signs:** Any heading containing "FSLogix," "profile container," or "profile persistence" appearing in Recipe #1.

**Phase to address:** Recipe #1 authoring phase; enforce via peer/adversarial review at discuss-phase.

---

### Pitfall 7: "Recipe" is not a valid `doc_type` — the closed 4-value taxonomy must not silently grow to 5

**What goes wrong:**
`docs/_standards/EEE-SOP-standard.md` §Doc Type Taxonomy defines `doc_type` as a **closed, exactly-four-value** controlled vocabulary (`Runbook | Guide | RCA | Reference`) and explicitly records the v1.16 precedent of folding five new structural classes (glossary, decision-tree, nav-hub, lifecycle, carved-mermaid) onto these four existing values rather than adding new ones — closing with the sentence *"this table is illustrative only and does not add a `doc_type` value to the four-value taxonomy above."* A "Device Recipe" doc class is a strong candidate for someone reflexively adding `doc_type: Recipe` as the 5th value, since it feels like a genuinely new document shape. C17 assertion #8 only checks `doc_type` is *present and non-empty* — it does **not** validate against the 4-value enum — so a `Recipe` value would pass the automated gate silently while violating the written standard and breaking the "audience-agnostic, closed taxonomy" invariant every downstream doc (and every future retrofit) relies on.

**Why it happens:** The gate's silence (no hard-fail on an unmapped `doc_type`, unlike the D1 platform map's hard-fail in assertion #10) makes this an easy, undetected mistake — nothing in CI will catch it.

**How to avoid:** Recipes use `doc_type: Guide` (they match the existing definition verbatim: *"Procedure doc for an audience with broader scope than a runbook; covers setup or configuration end-to-end"*), following the v1.16 D-07 precedent exactly. Distinguish the Recipe *shape* structurally instead — e.g., a dedicated `docs/device-recipes/` directory, a title convention, and/or the embedded admin-decision-point block markup — never via a new `doc_type` value. If the discuss-phase genuinely concludes Recipe warrants a 5th taxonomy value, that is a formal EEE-SOP-standard.md amendment (a new D-0x decision line + explicit taxonomy-table edit), not an incidental choice inside a content phase — and it should be flagged as an adversarial-review gray area given the strong existing precedent against it.

**Warning signs:** Any template or plan draft containing `doc_type: Recipe`.

**Phase to address:** Template/doc-class design phase (the phase that authors `docs/_templates/device-recipe-template.md`) — decide and lock before either recipe's content phase starts, since both recipes inherit whatever the template sets.

---

### Pitfall 8: Admin decision-point blocks rendered as blockquotes silently trip C17 assertion #12 (≤200 chars)

**What goes wrong:**
C17 assertion #12 caps every consecutive top-level blockquote group at 200 characters (with a documented history of being the most labor-intensive assertion to satisfy at scale — the project's own memory notes it required word-preserving splits across 56–75 files in a single prior phase). The recipe format's headline feature is embedded **"Ask the admin: …"** decision-point blocks — application choices, naming conventions, group targeting — which are naturally prose-heavy (often needing to explain *why* a choice matters). If the decision-point format lands on the existing `> **What breaks if misconfigured:**` blockquote idiom (the template pattern already in `docs/_templates/admin-template.md`), any decision point with real explanatory content will blow the 200-char cap on first draft, exactly like the historical `#12` retrofit tax.

**How to avoid:** Design the decision-point block format (a discuss-phase gray area per the milestone context) with the 200-char blockquote cap as a known hard constraint from the start — either keep each decision-point blockquote genuinely terse (one clause) and push explanatory prose to plain paragraph text below it (not inside the `>` fence), or choose a non-blockquote rendering (e.g., a bolded inline label + plain paragraph, or a small table row) that assertion #12 doesn't scan at all. Do not discover this constraint reactively after drafting full recipes.

**Warning signs:** `c17-eee-contract.mjs` reporting `#12` violations on the first content-phase harness run for either recipe.

**Phase to address:** Template/doc-class design phase (format decision) — must be resolved before Recipe #1/#2 content authoring, not discovered during it.

---

### Pitfall 9: Recipe #2 duplicates the existing Apple-Business-OU-governance Shared iPad lifecycle doc instead of linking to it

**What goes wrong:**
The corpus already has a full Shared iPad lifecycle document (`docs/cross-platform/apple-business/09-shared-ipad-lifecycle.md`, RE-0xx, `doc_type: Guide`) covering supervised ADE enrollment, session configuration, Managed Apple Account provisioning (manual/SCIM/OIDC+JIT), sign-in/out, and wipe/re-provision — but it is scoped to the **Apple-Business-delegated multi-org/OU governance model** (sub-org admin, OU-scoped device pools, cross-OU MDM-server transfer), a different governance layer than a single-tenant **Intune admin** persona provisioning Shared iPad directly. Recipe #2's stated scope ("ABM/ADE enrollment profile with Shared iPad enabled, Managed Apple Account sign-in, cache/storage settings, temporary session options, app deployment strategy, home screen layout, compliance policy") overlaps almost completely with the existing doc's stages 1–4. Authoring Recipe #2 from scratch risks re-deriving (and potentially contradicting) content that already exists, violating the "link-not-copy to existing guides" convention this project has followed since v1.11's consolidated-walkthrough pattern.

**How to avoid:** Recipe #2 should be authored as an **Intune-admin-console-specific walkthrough** (Intune enrollment profile UI steps, Intune device-configuration-profile UI steps, Intune app-assignment UI steps) that cross-links the existing OU-governance lifecycle doc for the underlying Apple Business Manager concepts (Managed Apple Account provisioning paths, Find My pre-deployment disable — OP-12 — session residency behavior) rather than re-explaining them. Treat the existing doc as source-of-truth for Apple-side concepts; Recipe #2 owns the Intune-side configuration sequence and the "Ask the admin" decision points.

**Warning signs:** Recipe #2 draft re-describing Managed Apple Account provisioning paths, OU scoping, or the OP-12 Find My warning in its own words instead of linking to `09-shared-ipad-lifecycle.md`.

**Phase to address:** Recipe #2 discuss-phase scoping + authoring phase (explicit cross-reference requirement).

---

### Pitfall 10: VPP "user-licensed" apps and "Available" assignment intent silently do nothing on Shared iPad

**What goes wrong:**
Microsoft Learn's Shared iPad app-assignment table is explicit and easy to get backwards: **device-licensed** VPP/custom apps assigned to a **device group** work; **user-licensed** VPP/custom apps are **Not applicable** on Shared iPad (full stop — there is no user-group path that makes a user-licensed VPP app install); LOB apps must be device-group + required; web apps (web clips) are the one type that IS user-group assignable; the **App Store app itself is unsupported** as an "Available" assignment (`Available` intent is not supported on Shared iPad at all — only `Required`). An admin following instinct from 1:1 iPad management (where user-licensed VPP + Available assignment are completely normal) will configure Shared iPad exactly backwards and see apps silently fail to appear, with no useful error surfaced in the MDM console.

**How to avoid:** Recipe #2 must include an explicit "app licensing model" callout: *device-license your VPP tokens, assign Required to device groups, never assign Available on Shared iPad.* Mirror this as a "What breaks if misconfigured" callout keyed to the existing runbook cross-link pattern, and add/confirm a Configuration-Caused-Failures table row for "user-licensed VPP app assigned to Shared iPad → app never installs, no error shown."

**Warning signs:** Recipe #2 draft that doesn't explicitly say "device-licensed" and "Required" together in the app-deployment section.

**Phase to address:** Recipe #2 authoring phase (app deployment strategy section) — this is one of the highest-value, most silent-failure-prone facts in the whole domain.

---

### Pitfall 11: Treating Shared iPad like a 1:1 supervised iPad breaks Company Portal, compliance/CA, email profiles, and passcode policy simultaneously

**What goes wrong:**
Four unsupported-scenario facts compound if an admin (or a recipe author) assumes Shared iPad is "a normal supervised iPad, just with multiple users": (1) Intune Company Portal app/website is **not supported** on Shared iPad at all (App Store is visible but installs are disabled — Microsoft explicitly recommends hiding the App Store icon via configuration profile to avoid user confusion); (2) **app-based and device-based Conditional Access, app protection policies, and compliance policies are not supported** on Shared iPad; (3) **email profiles are not supported** — assigning one produces an assignment error; (4) **passcode complexity/length cannot be managed** — Shared iPad enforces a fixed 8-alphanumeric-character passcode regardless of any Intune device-restriction passcode policy, and the only configurable knob is the unlock grace period. A recipe that includes a "Compliance policy" step (as the milestone's target-feature list explicitly names) must not silently promise device-compliance-driven Conditional Access gating, since CA + compliance policy are both unsupported for this device class.

**How to avoid:** Recipe #2's "compliance policy" section must state up front what it actually can and cannot do — e.g., device restriction profiles still apply (minus passcode complexity), but CA/App Protection/compliance-policy-driven access gating do not exist for Shared iPad — and cross-reference which specific device-restriction settings are Device-scoped vs User-scoped per the Shared iPad applicability table (home screen layout and app notifications are User-scoped on user-group assignment; most device restrictions are Device-scoped only). Explicitly disable the App Store icon via configuration profile as a named step, not an afterthought.

**Warning signs:** Recipe #2 draft with a heading literally titled "Compliance Policy" that doesn't immediately caveat CA/app-protection/compliance-policy non-support for Shared iPad; any step assigning an email profile to a Shared iPad device group.

**Phase to address:** Recipe #2 authoring phase (compliance/policy section) — flag as a research-verified fact, not a discuss-phase gray area (Microsoft Learn is unambiguous here).

---

### Pitfall 12: Storage-floor math (32GB vs 64GB+) and Managed Apple Account federation are prerequisites, not mid-recipe steps

**What goes wrong:**
Shared iPad has a hard minimum device requirement (iPadOS 13.4+, **≥32GB storage**) and Microsoft Entra federation with Apple Business/School Manager is a **required precondition** for the primary sign-in path (Entra-username sign-in auto-creates a matching Managed Apple ID/Account) — without it, admins fall back to manually creating Managed Apple IDs in Apple Business Manager and distributing credentials out-of-band, a materially different (and more admin-heavy) operational model. Storage capacity also directly bounds how many resident user sessions the device can cache (roughly 24 users at 32GB with a 1GB/user floor after 10GB system + 8GB apps/media reservation; more headroom at 64GB+ with a 2GB/user floor) — a fact that changes device-model purchasing decisions, not just configuration steps. If these land as steps *inside* the enrollment walkthrough rather than as gating Prerequisites, an admin can start provisioning against undersized/unfederated hardware and only discover the failure mid-deployment (Microsoft Learn also notes: **enabling Shared iPad via policy on an already-enrolled device that doesn't meet requirements forces a full device wipe**).

**How to avoid:** Recipe #2's Prerequisites section (not Steps) must gate on: (a) device model/storage ≥32GB confirmed before enrollment, (b) Microsoft Entra ↔ Apple Business/School Manager federation already configured (link out — federation setup is an Apple-Business-tenant-level operation, likely out of this recipe's own scope, mirroring the "assumes X already exists" guardrail pattern), (c) explicit warning that toggling Shared iPad on a device already enrolled without it forces a wipe.

**Warning signs:** Recipe #2 draft introducing storage or federation facts inside "Steps" rather than "Prerequisites"; no explicit wipe warning for the retrofit-onto-existing-device case.

**Phase to address:** Recipe #2 authoring phase (Prerequisites section).

---

### Pitfall 13: Temporary-session (Guest) behavior is invisible to device-group-only policy design

**What goes wrong:**
Microsoft Learn states plainly: **all** device configuration profile settings are device-applicable for Shared iPad temporary (Guest) sessions — user-group-assigned profiles and apps simply do not apply to a Guest session, because there is no signed-in Managed Apple Account to match a user group against. A recipe that designs its "recommended policy and app assignment" section purely around the device-vs-user split (as Microsoft's own recommendation table encourages, for role-differentiated deployments) will produce a Guest-session experience that silently has fewer apps/policies than a signed-in user's — which may be desired (e.g., limiting Guest capability) or may be an unnoticed gap, depending on whether the org allows Guest at all. Guest/temporary sessions are **allowed by default**.

**How to avoid:** Recipe #2 must make an explicit admin decision point ("Ask the admin: should temporary/Guest sessions be allowed on this deployment?") and, if allowed, call out that only device-group-assigned apps/policies reach Guest sessions — if disallowed, name the specific device-restriction setting (`Block Shared iPad temporary sessions`) as a Device-scoped-only control.

**Warning signs:** Recipe #2 omitting any mention of temporary/Guest sessions entirely (defaults to "allowed" silently) or treating it as a footnote rather than a named decision point.

**Phase to address:** Recipe #2 authoring phase (admin decision-point block design).

---

### Pitfall 14: New RE-NNN registry rows land without regenerating the generated filename-map (breaks the publish pipeline silently)

**What goes wrong:**
`scripts/pipeline/filename-map.md` is explicitly a **generated file** ("GENERATED FILE — DO NOT HAND-EDIT... Re-run `node scripts/pipeline/build-filename-map.mjs`") derived from `docs/_registry/RE-index.md`. Both recipes need new `RE-NNN` rows in the registry (per the standing EEE Doc ID Registry convention). If a content phase adds the registry rows but forgets to regenerate `filename-map.md` (an easy miss since it's a separate script, separate file, and not part of C17's scope), the two recipe docs will have **no output filename mapping** — `scripts/pipeline/convert.ps1`'s batch orchestrator (built in v1.17, still the live publish path) will either skip them silently or fail the fail-closed guard when it can't resolve a citation filename, and this won't be caught by C17 (a different validator entirely) or by the milestone's own harness unless the chain-validator apex specifically re-checks registry/filename-map sync (verify at roadmap time whether any `check-phase-NN.mjs` already asserts this pairing; if not, this milestone should add one, mirroring the existing registry-consistency assertions elsewhere in the chain).

**How to avoid:** Any content phase that adds RE-NNN rows for the two recipes must include, as an explicit task, `node scripts/pipeline/build-filename-map.mjs` re-run + commit of the regenerated `filename-map.md`, verified via `git diff` showing exactly the 2 new rows (byte-diff discipline — no unrelated churn, consistent with the corpus's general "no incidental diff" convention).

**Warning signs:** A content-phase commit touching `docs/_registry/RE-index.md` without a matching diff in `scripts/pipeline/filename-map.md`.

**Phase to address:** Whichever phase adds the RE-NNN registry rows (likely each recipe's own content phase, or a shared registry-sync task at the end of both).

---

### Pitfall 15: Frozen predecessor validator surfaces get accidentally touched while wiring the new doc class

**What goes wrong:**
This corpus enforces a hard byte-unchanged invariant on all pre-current-milestone frozen surfaces (`_lib/frozen-at-close.mjs` `MILESTONE_CLOSE_SHAS`, every `vX.Y-audit-allowlist.json`, every `vX.Y-milestone-audit.mjs`), and the v1.18 milestone's own scope explicitly includes touching validator-adjacent tooling (`FROZEN-AWARE-ADOPTION-SWEEP-01`, the O(n²) chain-runner rewrite) in the *same milestone* as the two new content recipes. The two work-streams sit dangerously close together in the same files/directory (`scripts/validation/`). A content-phase author adding the new `check-phase-129..NN.mjs` validators for the recipes could, by copy-paste habit (the codebase's own established pattern is "copy an adjacent check-phase file as a starting point"), accidentally introduce a change that lands in — or structurally resembles an edit to — an already-frozen predecessor file, especially since several frozen files (e.g., `v1.4-audit-allowlist.json` through `v1.17-audit-allowlist.json`) sit in the exact same directory as the new phase's live validator.

**How to avoid:** Any new `check-phase-129+.mjs` must be a genuinely new file (never `git mv`/copy-then-rename-in-place of a frozen sidecar); the D-00a frozen-surface-edit doctrine applies as it has every milestone. Keep the C17-gate wiring for the new doc class (Recipe template + registry) entirely inside NEW files/rows; do not touch any `vX.Y-*.json`/`vX.Y-*-milestone-audit.mjs` for X.Y < 18 for any reason related to the recipe content itself (only the separately-scoped `FROZEN-AWARE-ADOPTION-SWEEP-01` pillar, if the discuss-phase greenlights option (a), is licensed to touch those files, and only for its own narrow re-pin purpose).

**Warning signs:** A `git diff` on a recipe-content-phase branch touching any file matching `v1.[4-9]*-*.{json,mjs}` or `v1.1[0-7]-*.{json,mjs}`.

**Phase to address:** Roadmap-level phase sequencing (keep the recipe/template phases and the chain-validator-debt phases in clearly separated plans, even if interleaved in phase order) + code-review discipline at each content phase's close.

---

### Pitfall 16: Navigation-last discipline gets skipped because "it's just two new docs, not a retrofit"

**What goes wrong:**
Every prior content milestone in this corpus (802.1X, PSSO walkthroughs, migration guides) wired new docs into `docs/index.md`, `common-issues.md`, `quick-ref-l1.md`/`quick-ref-l2.md`, and relevant `decision-trees/*` only as the **last** step, after content stabilized — the project's own convention name is "navigation-last discipline." Because this milestone frames itself as "just 2 recipes," authors may skip the nav-hub wiring step entirely (reasoning it's a small addition), leaving the recipes orphaned — undiscoverable from the corpus's existing entry points, and (per the v1.16 orphan-nav-hub retrofit precedent) a recurring defect class this corpus has specifically fixed once already (Phase 123, 4 orphan nav-hubs).

**How to avoid:** Treat nav-hub wiring as a mandatory closing task for the Recipe pillar, not optional polish — add explicit index.md / common-issues.md / quick-ref rows and a decision-tree cross-link (Windows triage tree for Recipe #1, iOS/iPadOS or Apple-Business tree for Recipe #2) as a named requirement, verified via the existing `check-nav-hub-links.mjs` validator.

**Warning signs:** Recipe docs C17-green and registry-listed but absent from `docs/index.md` at the point a phase is marked complete.

**Phase to address:** Final content phase for each recipe (or a dedicated integration phase after both) — verify via `check-nav-hub-links.mjs` before phase close.

---

## Technical Debt Patterns

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|--------------------|-----------------|------------------|
| Copying `08-self-deploying.md`'s prerequisite prose verbatim into Recipe #1 | Fast first draft | Inherits the stale Wi-Fi-unsupported claim (Pitfall 2); propagates any other undetected staleness | Never for prerequisite/requirement facts — always re-verify against current Learn; OK to copy structural/heading shape only |
| Rendering "Ask the admin" decision points as `>` blockquotes without a length budget | Matches existing "What breaks if misconfigured" visual idiom | Trips C17 #12 late in the phase, forcing rework (the exact historical retrofit tax) | Never — decide the format's length discipline before first draft, per Pitfall 8 |
| Re-explaining Managed Apple Account / OU concepts inside Recipe #2 instead of linking out | Recipe reads as fully self-contained | Duplicate, potentially drifting source of truth vs. `09-shared-ipad-lifecycle.md`; violates "link-not-copy" convention | Never for concepts already owned by an existing Approved doc; OK for genuinely Intune-console-specific steps that doc doesn't cover |
| Skipping the filename-map regeneration because "the harness doesn't check it" | Saves one command per phase | Publish-bundle pipeline silently drops or fails on the two new recipe docs at next milestone-close bundle build | Never — one-line task, add to phase checklist |

## Integration Gotchas

| Integration | Common Mistake | Correct Approach |
|-------------|-----------------|--------------------|
| Windows App + Intune kiosk | Default to single-app Assigned Access kiosk | Use Intune multi-app kiosk (Settings Catalog `AssignedAccess` CSP) — single-app has documented Windows App launch failures and no Win11 provisioning-profile support |
| AVD entitlement/licensing | Assume the shared device itself needs an AVD license | AVD entitlement is per signed-in **user** (bundled in M365 E3/E5/Business Premium/Windows Enterprise); the device needs Windows Enterprise + Intune device-based management, not a separate AVD SKU |
| Shared iPad + VPP | Assign user-licensed VPP apps or "Available" intent | Device-license all VPP/custom apps, assign `Required` to device groups only |
| Shared iPad + Conditional Access | Assume compliance policy gates access like a 1:1 device | CA, App Protection Policy, and compliance policy are all unsupported on Shared iPad — do not promise access-gating in the recipe |
| Managed Apple Account terminology | Write "Managed Apple ID" fresh in new content | Corpus convention (and existing `09-shared-ipad-lifecycle.md`) already uses "Managed Apple Account" — even though Microsoft Learn's Intune docs (checked 2026-07-16) still say "Managed Apple ID" in places, follow the repo's CI-3-aware convention, not the not-yet-fully-rebranded Learn text, for new prose |

## Performance Traps

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|-----------------|
| Adding `check-phase-129+.mjs` validators without subprocess-result caching | Chain-apex runtime grows further past the already-flagged `[48..127]` O(n²) cold-clone cost | Coordinate the new validators' authoring with (or explicitly sequence after) the `O(n²)-CHAIN-RUNNER-REMEDIATION-01` pillar rather than adding pure additional linear cost on top of an already-strained apex | Windows cold-clone runs; deepens each phase added |

## Security Mistakes

| Mistake | Risk | Prevention |
|---------|------|------------|
| Documenting Windows App credential caching as "safe" on a shared kiosk without a sign-out step | Next user of the shared device inherits a signed-in AVD session/cached token | Recipe #1 must include an explicit sign-out/lock-workstation step in its end-user guidance or verification, not just "any user can sign in" |
| Omitting the Find My (activation-lock) pre-deployment disable in Recipe #2 | Device becomes irrecoverably locked to a personal Apple ID, requiring Apple Support + proof of purchase | Cross-link the existing OP-12 mandatory pre-deployment Find My disable callout from `09-shared-ipad-lifecycle.md` rather than omitting it as "already covered elsewhere" |

## UX Pitfalls

| Pitfall | User Impact | Better Approach |
|---------|-------------|-------------------|
| Leaving the Shared iPad App Store icon visible with installs silently disabled | Users tap App Store, try to install something, nothing happens, confusion/support tickets | Recipe #2 names "hide App Store via configuration profile" as an explicit step (Microsoft's own stated recommendation) |
| Not surfacing the fixed 8-alphanumeric Shared iPad passcode as a UX expectation-setting note | Admins configure a passcode-complexity policy expecting it to apply, then get confused when it silently has no effect | Recipe #2 states up front that passcode length/complexity is fixed by the platform, not admin-configurable |

## "Looks Done But Isn't" Checklist

- [ ] **Recipe #1 device deployment:** Often missing an interactive end-user Windows App sign-in verification step — verify the Verification section includes a non-admin user confirming their AVD feed populates, not just device-level checks
- [ ] **Recipe #1 kiosk config:** Often missing a "why not single-app kiosk" note — verify multi-app kiosk (AssignedAccess CSP) is the documented path
- [ ] **Recipe #2 app deployment:** Often missing the device-license/Required-only callout — verify it explicitly rules out user-licensed VPP + Available intent
- [ ] **Recipe #2 compliance section:** Often implies CA/compliance-driven access gating works — verify it explicitly states CA/App Protection/compliance-policy are unsupported on Shared iPad
- [ ] **Both recipes' registry wiring:** Often stops at `RE-index.md` — verify `filename-map.md` was regenerated (not hand-edited) and diffed
- [ ] **Both recipes' nav wiring:** Often deferred/forgotten as "just 2 docs" — verify `docs/index.md`, `common-issues.md`, relevant quick-ref, and a decision-tree cross-link all land before phase close, verified via `check-nav-hub-links.mjs`
- [ ] **Recipe template `doc_type`:** Verify it is `Guide`, never a new 5th taxonomy value

## Recovery Strategies

| Pitfall | Recovery Cost | Recovery Steps |
|---------|-----------------|-------------------|
| C17 #12 blockquote overflow discovered late (Pitfall 8) | LOW–MEDIUM | Word-preserving split of the offending blockquote content into plain paragraph text below a terse `>` lead-in, per the established v1.16 retrofit pattern; re-run `c17-eee-contract.mjs` |
| `doc_type: Recipe` accidentally shipped (Pitfall 7) | LOW if caught same-phase, MEDIUM if already published/bundled | Frontmatter + block-line edit to `Guide` across both recipe docs + registry Doc Type column; re-run C17 and the publish-bundle guard before any SharePoint upload |
| filename-map.md drift discovered after a milestone-close bundle build (Pitfall 14) | LOW | Re-run `build-filename-map.mjs`, diff-verify only the expected new rows, rebuild the bundle |
| Recipe #2 duplicates existing Shared iPad lifecycle content (Pitfall 9) | MEDIUM | Post-hoc edit to replace duplicated prose with cross-links; re-verify no factual drift was introduced between the two docs during the duplication window |

## Pitfall-to-Phase Mapping

| Pitfall | Prevention Phase | Verification |
|---------|--------------------|-----------------|
| #1 Client-vs-session-host conflation | Recipe #1 authoring phase | Scope banner present at top of Recipe #1; no "Enterprise multi-session" language appears |
| #2 Stale Wi-Fi-unsupported claim | Recipe #1 authoring phase | Prerequisite section cites current Microsoft Learn, dated this milestone |
| #3 VM/virtual-TPM confusion | Recipe #1 authoring phase | Explicit "physical device only" prerequisite line present |
| #4 Single-app kiosk failure | Recipe #1 authoring phase | Kiosk step uses multi-app AssignedAccess CSP, not single-app Assigned Access |
| #5 No-primary-user AVD entitlement gap | Recipe #1 authoring phase | Verification section includes interactive end-user Windows App sign-in check |
| #6 FSLogix scope-creep | Recipe #1 authoring phase + review | No FSLogix/profile-container heading anywhere in Recipe #1 |
| #7 `doc_type: Recipe` taxonomy violation | Template/doc-class design phase | Template frontmatter shows `doc_type: Guide`; adversarial-review sign-off if a 5th value is ever proposed |
| #8 Blockquote #12 overflow on decision points | Template/doc-class design phase | Decision-point format decided with the 200-char cap as a stated constraint before either recipe's first draft |
| #9 Shared iPad content duplication | Recipe #2 discuss-phase + authoring phase | Recipe #2 links to (does not restate) `09-shared-ipad-lifecycle.md` for Apple-side concepts |
| #10 VPP user-licensed / Available-intent trap | Recipe #2 authoring phase | App deployment section explicitly states device-licensed + Required only |
| #11 1:1-iPad-assumption cluster (CP/CA/email/passcode) | Recipe #2 authoring phase | Compliance section explicitly caveats CA/App-Protection/compliance-policy non-support; no email-profile step present |
| #12 Storage floor / federation prerequisite placement | Recipe #2 authoring phase | Storage (≥32GB) and Entra federation appear in Prerequisites, not Steps; wipe warning present for retrofit case |
| #13 Temporary-session policy gap | Recipe #2 authoring phase | Explicit "Ask the admin: allow Guest sessions?" decision point present |
| #14 filename-map.md sync | Each recipe's registry-wiring task | `git diff` on `filename-map.md` shows exactly the new rows, generated (not hand-edited) |
| #15 Frozen-surface accidental touch | Roadmap phase sequencing + code review | `git diff` on any content-phase branch touches no `v1.[4-9]|1[0-7]*-*.{json,mjs}` file |
| #16 Navigation-last skipped | Final integration phase per recipe | `check-nav-hub-links.mjs` green; recipes reachable from `docs/index.md` |

## Sources

- Microsoft Learn — `autopilot/self-deploying` (Windows Autopilot self-deploying mode), fetched 2026-07-16, `ms.date` 2024-09-13 / `updated_at` 2026-06-22 — HIGH confidence, official, current
- Microsoft Learn — `intune/solutions/azure-virtual-desktop-multi-session` (Using AVD multi-session with Microsoft Intune), fetched 2026-07-16, `ms.date` 2025-02-13 / `updated_at` 2026-07-01 — HIGH confidence, official, current
- Microsoft Learn — `intune/intune-service/enrollment/device-enrollment-shared-ios` (Shared iOS/iPadOS devices comparison table), fetched 2026-07-16 — HIGH confidence, official, current
- Microsoft Learn — `intune/device-enrollment/apple/shared-ipad` (Shared iPad devices — full settings/limitations/app-assignment tables), fetched 2026-07-16, `ms.date` 2024-01-23 / `updated_at` 2026-07-01 — HIGH confidence, official, current
- WebSearch — Windows App replacing Remote Desktop client, deprecation timeline (Remote Desktop MSI client end of support 2026-03-27 public cloud; Remote Desktop Store app end of support 2025-09) — MEDIUM confidence (community sources: Windows Forum, StarWind, Workspace 365, 9to5Azure; cross-corroborated across independent sources, aligns with Microsoft Tech Community blog post referenced in results)
- WebSearch — Windows App kiosk-mode / Assigned Access known issues (single-app launch failures, Win11 provisioning-profile limitation) — MEDIUM confidence (Microsoft Q&A, community blogs; not independently Learn-verified in this session but internally consistent across sources)
- WebSearch — AVD/Windows 365/M365 per-user licensing model — MEDIUM confidence (Redress Compliance, TechTarget, Bridgeall; general licensing-market commentary, not a primary Microsoft billing source — verify against `azure/virtual-desktop/licensing` before Recipe #1 finalizes any specific SKU claim)
- Repo — `D:\claude\Autopilot\docs\admin-setup-apv1\08-self-deploying.md` (RE-084, existing self-deploying admin guide) — HIGH confidence, direct read, `last_verified: 2026-04-13`
- Repo — `D:\claude\Autopilot\docs\cross-platform\apple-business\09-shared-ipad-lifecycle.md` (existing OU-governance Shared iPad lifecycle doc) — HIGH confidence, direct read, `last_verified: 2026-05-21`
- Repo — `D:\claude\Autopilot\docs\_standards\EEE-SOP-standard.md` §Doc Type Taxonomy, §D-02 Edge-case rulings — HIGH confidence, direct read, the closed-4-value-taxonomy precedent
- Repo — `D:\claude\Autopilot\scripts\validation\c17-eee-contract.mjs` (all 13 C17 assertions, including #12 blockquote cap and #8/#10 doc_type/platform enforcement gaps) — HIGH confidence, direct read
- Repo — `D:\claude\Autopilot\scripts\pipeline\filename-map.md` + `D:\claude\Autopilot\docs\_registry\RE-index.md` (generated-file convention) — HIGH confidence, direct read
- Repo — `D:\claude\Autopilot\.planning\milestones\v1.17-DEFERRED-CLEANUP.md` (frozen-surface / chain-validator debt context) — HIGH confidence, direct read
- Repo — `C:\Users\joanderson\.claude\projects\D--claude-Autopilot\memory\MEMORY.md` (project memory: C17 #12 retrofit-tax precedent, archival-drift close-blocker pattern) — HIGH confidence, prior-session institutional knowledge

---
*Pitfalls research for: Device Configuration Recipes (AVD Shared Windows client + Shared iPad) — v1.18 milestone*
*Researched: 2026-07-16*
