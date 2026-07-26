# Architecture Research

**Domain:** Documentation-corpus DOCUMENT architecture — where RE-224 (Windows multi-app kiosk) and RE-225 (Android Dedicated MMHS) live, what they cross-link to, and what registry/pipeline/validator surfaces they ripple through. This is document architecture, not software architecture.
**Researched:** 2026-07-25
**Confidence:** HIGH for everything grounded in a direct file read (registry format, existing anchors, pin mechanism, validator literal-strings). MEDIUM for RE-224's exact spine shape (Windows multi-app kiosk mechanism is explicitly an unresolved Plan-1 verification gate per PROJECT.md, not yet authored) and for the "shared conceptual anchor" placement (an explicitly unresolved discuss-phase gray area — this file documents the option space, it does not resolve it).

## Standard Architecture

### System Overview (unchanged from v1.18, confirmed still accurate)

```
docs/_registry/RE-index.md  (223 rows today, RE-001..RE-223)  --hand-edited, add RE-224/RE-225
        |
        v
[authoring + C17 gate + owner review]  Status: Draft -> Approved
        |
        v
scripts/pipeline/build-filename-map.mjs -> filename-map.md  (GENERATED, D-09, never hand-edit)
        |  --self-test row-count canary: currently hard-coded 223, MUST bump to 225
        v
scripts/pipeline/convert.ps1 (pandoc) -> guard-docx.mjs -> docs-library-vX.Y.zip
        |
        v
docs/index.md  (nav hub, wired LAST -- both the recipes table AND the index.md:38 quick-nav bullet)
```

Confirmed unchanged: the pipeline is still registry-data-driven, C17 still enrolls by `doc_id` presence not directory allowlist, `doc_type: Guide` is still the correct classification for `docs/recipes/*` (v1.18's D-02 ruling already covers this — no new standard ruling needed for RE-224/225).

### What's NEW for v1.19 that v1.18's architecture did not have to deal with

1. **Two recipes cross-linking INTO existing content instead of only linking OUT to prerequisite guides.** RE-222/223 linked out to admin-setup guides that pre-existed them. RE-224 must link into a SIBLING recipe (`docs/recipes/01-shared-windows-avd-client.md`) that is itself frozen by a downstream validator's literal-string pin (`check-phase-130.mjs`'s `V-130-KIOSKFORK` needle). This is a new cross-link topology: recipe-to-recipe, not just recipe-to-admin-setup-guide.
2. **A genuine missing-target problem.** `docs/admin-setup-android/` has no app-deployment guide and no configuration-profiles guide — unlike `admin-setup-ios/` (which has both, and which RE-223 already used). RE-225 cannot "cross-link the anchor" for its app-deployment step because no correct anchor exists.
3. **A frozen-surface guardrail on two specific reference files** (`_glossary-android.md`, `android-capability-matrix.md`) that RE-225 will naturally want to touch (new glossary terms for MMHS multi-app-specific concepts, new capability-matrix rows) but structurally cannot without triggering a budgeted re-pin contingency (CARVE-1).

## Cross-Link Topology

### RE-224 — Windows multi-app kiosk

| Target | Anchor | Verified exists | Role |
|--------|--------|:---:|------|
| `docs/recipes/01-shared-windows-avd-client.md` | `#step-5a-kiosk-configuration` | YES (`### Step 5a: Kiosk configuration`, line 114) | The single-app-kiosk case — **one-line cross-link only**, per PROJECT.md's explicit "never re-authored." `check-phase-130.mjs` (`V-130-KIOSKFORK`) asserts the literal strings `"Step 5a: Kiosk configuration"` and `"Step 5b: Shared PC configuration"` exist in recipe 01's live HEAD — RE-224 must not edit recipe 01 to add this link target; it must be a plain Markdown link from RE-224 out to the existing heading. |
| `docs/admin-setup-apv1/08-self-deploying.md` | whole doc (or `#tpm-2-0` if the multi-app kiosk device is also self-deploying) | YES (used identically by recipe 01's own Prerequisites) | If RE-224's device-provisioning spine needs Autopilot self-deploying mode — cross-link directly, do not route through recipe 01's copy of this same link. |
| `docs/admin-setup-apv1/04-dynamic-groups.md` | whole doc | YES | Dynamic device group creation — same target recipe 01 already links to; RE-224 should link here directly (not via recipe 01) since recipe 01 itself never re-derives this content either. |
| `docs/admin-setup-apv1/03-esp-policy.md` | whole doc | YES | ESP policy, same reasoning. |
| `docs/admin-setup-apv1/10-config-failures.md` | whole doc (reverse-lookup table) | YES (RE-086) | Optional `See Also` target for the consolidated APv1 misconfiguration-to-runbook table. **Note:** recipe 01 does NOT link here in its own `## Configuration-Caused Failures` table (it links to its own step anchors instead) — for consistency, RE-224 should follow recipe 01's established pattern (self-contained failures table, `10-config-failures.md` only in `See Also`), not diverge.
| `docs/apv1-vs-apv2.md` | whole doc | YES (used by recipe 01) | Framework-selection anti-feature row, same pattern as recipe 01's Unsupported-and-Anti-Feature table. |
| `docs/admin-setup-8021x/03-windows.md` | whole doc | YES (used by recipe 01 Step 7) | Only if RE-224 has its own wired-vs-Wi-Fi decision point — otherwise omit; do not duplicate recipe 01's Step 7 content, cross-link recipe 01's `#step-7-wired-vs-wi-fi-network-access-post-enrollment` instead if the kiosk recipe needs the same fork. |
| `docs/_standards/EEE-SOP-standard.md` | (STD-05 anchor, whole doc) | YES | Decision-point block format citation, same boilerplate `See Also` line every recipe carries. |

**No error-code / failure-runbook target exists for Windows kiosk/Assigned Access specifically** — grepped `l1-runbooks/` and `l2-runbooks/` for "Assigned Access," "kiosk," "KioskModeApp": zero hits (Linux's one hit is unrelated). This mirrors recipe 01's own situation and recipe 01 solved it by making its own `## Configuration-Caused Failures` table the authoritative failure reference (link-out only to its own step anchors + `04-dynamic-groups.md`). RE-224 should do the same — this is not a gap that needs a new runbook, it's the established recipe-class shape (recipes are provisioning Guides with self-contained failure tables, not troubleshooting Runbooks; Phase 132 explicitly ruled recipes out of `common-issues.md`/`quick-ref-l1.md`/`quick-ref-l2.md`).

### RE-225 — Android Dedicated MMHS multi-app

| Target | Anchor | Verified exists | Role |
|--------|--------|:---:|------|
| `docs/admin-setup-android/05-dedicated-devices.md` | `#scenarios` | YES (`<a id="scenarios">`, line 64) | The multi-app-kiosk-vs-Entra-shared-device-mode scenario table RE-225's Case-1 token-type decision routes through. |
| `docs/admin-setup-android/05-dedicated-devices.md` | `#enrollment-profile` | YES (`<a id="enrollment-profile">`, line 109) | Delta 1 (token type — the irreversible choice PROJECT.md names as the dominant decision block) and Delta 3 (MHS Required-assignment requirement). |
| `docs/admin-setup-android/05-dedicated-devices.md` | `#provisioning-method-choice` | YES (`<a id="provisioning-method-choice">`, line 193) | The four-way provisioning-method fork with the Knox/Zero-Touch mutual-exclusion warning already inline (`⚠️ Samsung admins: Choose KME or Zero-Touch — never both`) — cross-link, do not re-author this warning. |
| `docs/admin-setup-android/05-dedicated-devices.md` | `#exit-kiosk-pin-synchronization` | YES (dual `<a id>`, line 242) | The MHS exit-PIN dual-policy sync requirement — RE-225 MUST cross-link here rather than re-deriving, since this is the guide's own named "top repeated-escalation pattern." |
| `docs/admin-setup-android/05-dedicated-devices.md` | `#android-15-frp-reprovisioning` | YES (line 261) | If RE-225's device-lifecycle end state touches re-provisioning. |
| `docs/admin-setup-android/01-managed-google-play.md` | `#bind-mgp` | YES (`<a id="bind-mgp">`, line 96) | Hard prerequisite gate — same pattern `05-dedicated-devices.md` itself already uses to reference MGP binding. |
| `docs/android-lifecycle/02-provisioning-methods.md` | `#dedicated-cosu` | YES (referenced live from `05-dedicated-devices.md` line 196) | Full method-availability matrix, filtered to the Dedicated row. |
| `docs/android-lifecycle/03-android-version-matrix.md` | `#dedicated`, `#android-15-breakpoint` | YES (both referenced live) | Version floor + Android 15 FRP breakpoint. |
| `docs/_glossary-android.md` | `#dedicated`, `#managed-home-screen`, `#entra-shared-device-mode` | YES (all three in the live Alphabetical Index, line 37) | Terminology first-use cross-links — **link to the existing anchors, do not add new glossary entries** (see Frozen-Surface Hazards below). |
| `docs/reference/android-capability-matrix.md` | `#cross-platform-equivalences` | YES (referenced live from the doc's own Summary) | Only if RE-225 needs the Apple-to-Android capability analog framing — read-only link, no edit. |

**The missing-target problem — app-deployment step.** `docs/admin-setup-android/` has no app-deployment guide and no configuration-profiles guide. `01-managed-google-play.md` covers MGP tenant **binding** and the four **auto-approved** system apps (Intune, Authenticator, Company Portal, MHS) — it does not cover the general "assign an app as Required to a device group" mechanic RE-225 needs for its MMHS multi-app step. `05-dedicated-devices.md` Delta 3 states the MHS app "MUST be assigned as Required to the device group" but stops at that sentence — it never shows the click-path, by design (it's an enrollment-profile guide, not an app-deployment guide).

**Recommendation: inline a recipe-scoped step in RE-225 — do not cross-link `01-managed-google-play.md` for this, and do not defer to a future guide.**

Three options assessed:

1. **Inline (recommended).** RE-225 authors its own "Deploy the MHS app (device-context)" step with the concrete click-path (Intune admin center → Apps → All apps → Add → Managed Home Screen → Assignments → Required → device group), then cross-links `05-dedicated-devices.md#exit-kiosk-pin-synchronization` for the PIN-sync half of the requirement (which already exists and must not be re-derived) and `01-managed-google-play.md` (Step 4's auto-approval list) as a "why this app is already visible in MGP" pointer.
   - **Direct precedent already in this corpus:** RE-222 (recipe 01) hit the exact same missing-target problem for Windows — `admin-setup-apv1/` has no app-deployment guide either (11 files, confirmed by directory listing: hardware-hash, deployment-profile, ESP, dynamic-groups, deployment-modes, user-driven, pre-provisioning, self-deploying, connector, config-failures — no app-deployment file) — and RE-222 solved it by fully inlining "Step 4: Deploy Windows App (device-context)" (`01-shared-windows-avd-client.md:78-103`) rather than cross-linking a partial-fit doc or flagging future work. RE-225 doing the same for MHS is not a new pattern, it's applying the one that already exists twice in this corpus (Windows had no guide → inline; Android has no guide → inline). iOS is the outlier with a real guide (`admin-setup-ios/05-app-deployment.md`) precisely because iOS admin-setup happens to have one — that's incidental, not the rule to generalize from.
2. **Cross-link `01-managed-google-play.md`.** Rejected — the guide covers binding and pre-approval, not assignment. Linking there would send the reader to a page that does not answer the question the recipe just asked ("how do I deploy this app"), which is a worse reader experience than either inlining or honestly flagging a gap.
3. **Flag a new `admin-setup-android` app-deployment guide as future work, leave RE-225's step under-specified.** Rejected for THIS milestone — it would ship a recipe that fails its own "yields a concrete, reproducible device configuration" definition at the one step that is arguably its structural centerpiece (RE-225 is explicitly the *multi-app* recipe; the app-deployment step is not incidental). Worth noting as a `v1.19-DEFERRED-CLEANUP.md` candidate anyway: a real `admin-setup-android/xx-app-deployment.md` guide (covering LOB app upload, Managed Home Screen config, general Required/Available assignment across all 5 GMS modes) would let a THIRD Android recipe cross-link instead of re-inlining a third time — but that's a v1.20+ scope call, not something RE-225 should wait on.

## What Belongs in Each New Doc vs What Must Cross-Link

### RE-224 (Windows multi-app kiosk) — concrete section list

**Belongs in RE-224 (genuinely new content):**
- The multi-app Assigned Access mechanism itself — GUI path, CSP nodes, the "separate non-Intune-Templates mechanism" claim once Plan-1 first-party-verifies it (this is the recipe's entire reason to exist).
- The admin decision-point block(s) for the multi-app case specifically (which apps, exit/return-to-launcher behavior if applicable).
- Its own `## Unsupported and Anti-Feature Callouts`, `## Verification`, `## Configuration-Caused Failures` — self-contained per the recipe-class shape, mirroring recipe 01's structure exactly.

**Must cross-link, never re-author (governing rule, verbatim from recipe 01's own practice):**
- The single-app kiosk mechanism → `01-shared-windows-avd-client.md#step-5a-kiosk-configuration` (one line, per PROJECT.md).
- Autopilot registration, dynamic group syntax, ESP field reference, self-deploying field reference, if RE-224's spine needs them → `admin-setup-apv1/*` directly (same targets recipe 01 uses, linked independently — RE-224 should not chain through recipe 01 for these, since recipe 01 itself treats them as external references, not owned content).
- Framework selection (APv1 vs APv2) → `apv1-vs-apv2.md`.

### RE-225 (Android Dedicated MMHS) — concrete section list

**Belongs in RE-225 (genuinely new content — this IS "the gap that is the recipe," per PROJECT.md):**
- `## Steps` (the guide it deltas over has none), the MHS app-deployment inline step (see above), a `## Verification` checklist, an `## Anti-Feature` table, and a `## Configuration-Caused Failures` table in the recipe's own shape (`05-dedicated-devices.md` has a divergent "What-breaks summary" shape instead — that divergence is explicitly named in PROJECT.md as part of the gap).
- The Case-1 decision block: irreversible Standard-vs-Entra-shared-device-mode token type, framed with its severe consequence-if-wrong (`05-dedicated-devices.md:129`'s "revoke token, recreate profile, redistribute QR to every field site" cost) — the recipe's decision-point block should restate this cost inline (Pattern 3 blockquote), not just link past it, since PROJECT.md names this as the recipe's dominant decision.
- The second fork: four-way provisioning method, with the Knox/Zero-Touch mutual exclusion surfaced as a decision consequence, not just a linked warning.

**Must cross-link, never re-author:**
- Scenario table, token-type field reference, provisioning-method matrix, exit-kiosk PIN sync mechanics, Android 15 FRP pathways, MGP binding → all five in the table above, all already fully written and Approved in `05-dedicated-devices.md` / `01-managed-google-play.md` / `android-lifecycle/*`.
- Glossary terminology → link to existing `_glossary-android.md` anchors, add zero new terms (see Frozen-Surface Hazards).

## Registry / Pipeline Ripple (complete enumeration)

A missed item here becomes a close-gate failure — this list is exhaustive against everything touched in the v1.18 precedent (Phase 132) plus the two items PROJECT.md explicitly flags as new-this-time.

1. **`docs/_registry/RE-index.md`** — two new rows, `RE-224` and `RE-225`, appended after the current last row (`RE-223`). `Status: Draft` at creation (per template instruction, matching 129-02/131-01 precedent), flipped to `Approved` at integration close. Row format confirmed from the live tail: `| RE-NNN | docs/path | Title | Doc Type | Status |`.
2. **`scripts/pipeline/filename-map.md`** — regenerated via `node scripts/pipeline/build-filename-map.mjs` (never hand-edited, D-09). Picks up RE-224/225 automatically once the registry rows exist and `Status: Approved`.
3. **`scripts/pipeline/build-filename-map.mjs` `--self-test` row-count canary** — hard-coded at `rows.length === 223` (`build-filename-map.mjs:282`, with the comment at line 275 documenting the last bump 221→223 at v1.18 close). **Must bump to `225`** and the comment updated to record 223→225 at v1.19 close, mirroring the exact edit Phase 133 made for the prior bump. This is a single-line, well-precedented edit — not a frozen-surface hazard (this file is a live tool, not one of the two named-frozen reference docs).
4. **`docs/index.md` recipes table** — two new rows in the existing `## Device Configuration Recipes` table (`docs/index.md:280-281` today), following the exact two-column `[Title](path) | Description` shape already there.
5. **`docs/index.md` prose quick-nav bullet, line 38** — the `## Choose Your Platform` top-of-page bullet list entry for `[Device Configuration Recipes](#device-configuration-recipes)`. **This is the WR-01 defect class from Phase 132**, where the H2 section landed but the quick-nav bullet did not, caught only by code-review after the fact. PROJECT.md explicitly names avoiding a repeat of this as a mandatory item — the description text on this bullet (currently "...(shared Windows AVD-client device, Shared iPad full provisioning)") should also be generalized or extended to reflect four recipes, not just the two originals, or the bullet becomes stale advertising copy.
6. **`common-issues.md` / `quick-ref-l1.md` / `quick-ref-l2.md` — explicit hubs-not-wired re-confirmation.** Phase 132 established and verified these three stay byte-unchanged (recipes are provisioning Guides, not troubleshooting Runbooks). This ruling should be re-stated and re-verified for RE-224/225, not silently assumed — PROJECT.md's `V-132-HUBSNOTWIRED` gray area name suggests this disposition itself may get re-litigated at discuss-phase; the roadmap should carry an explicit success criterion for it either way.
7. **`scripts/validation/c17-eee-contract.mjs` full-corpus run** — both new files auto-enroll via `doc_id` presence; zero code changes to C17 itself expected (confirmed by v1.18's identical finding — the enrollment mechanism hasn't changed).
8. **Link-checker** — 0/0 required across the full corpus including the new cross-links into `05-dedicated-devices.md`, `01-managed-google-play.md`, and recipe 01 (the recipe-to-recipe link is new territory for the link-checker but structurally identical to any other Markdown relative link — no tooling change expected, just a run).
9. **`scripts/pipeline/build-publish-bundle.mjs` regeneration** — `--version=v1.19`, picks up RE-224/225 automatically once `Status: Approved` and filename-mapped (registry-data-driven, zero code change, per v1.18's confirmed finding). Gated by the Phase-127 Stop-hook (`publish-bundle-gate.cjs`).
10. **`check-phase-NNN.mjs` validators for the integration phase** — a new leaf validator (numbered per whichever phase does integration & nav-last close) needs, at minimum: (a) an `RE-224`/`RE-225` registry-row-Approved needle, (b) a filename-map-regenerated needle, (c) a `## Device Configuration Recipes` table-rows needle for both new titles, and — **critically, to close the WR-01 gap proactively** — (d) a needle asserting the `index.md:38`-region quick-nav bullet text is present, not just the H2 section. This is the one place v1.19's validator should structurally differ from `check-phase-132.mjs` (which only checked `## Device Configuration Recipes` presence, not the quick-nav bullet — that gap is precisely what Phase-132 code-review caught after the fact).
11. **Apex chain validator (`check-phase-N.mjs` for the terminal-close phase)** — continues the `[48..N-1]` invariant, extending it to include the new integration-phase validator number, per the unbroken pattern since Phase 100.
12. **`v1.19-milestone-audit.mjs` + `v1.19-audit-allowlist.json` + BASELINE_23** — mandatory per PROJECT.md's V118-pin/17th-lineage-bump item; not directly about the two recipes but is the terminal phase that must run after them, never batched with them (see Build Order).

## Build Order and Dependency Edges

Dependency-ordered; mirrors v1.18's Phase 129→134 shape (foundation → content → content → integration → [unrelated pillar] → terminal close), adjusted for what's actually new in v1.19.

1. **Plan-1 hard gate: first-party verification of the Windows 11 multi-app kiosk mechanism.** Must happen before ANY RE-224 authoring — PROJECT.md is explicit this is a gate with a negative-result branch (re-scope or defer the whole recipe). This is the one edge where v1.19 differs structurally from v1.18: v1.18 had no comparable "verify the mechanism exists before writing a word" precondition on either of its two recipes.
2. **RE-224 content authoring** (`docs/recipes/03-*.md` or next sequential slug) — depends on (1) passing. Zero dependency on RE-225 (different platform, different file) — parallelizable in principle, sequential in practice per `use_worktrees:false`.
3. **RE-225 content authoring** (`docs/recipes/04-*.md` or next sequential slug) — no dependency on (1) or (2). The Android multi-app mechanism (MHS) is already fully documented and Approved in `05-dedicated-devices.md` — there is no Plan-1-equivalent research gate for RE-225's core mechanism, only for the app-deployment-step content decision (already resolved above: inline).
4. **Registry ID reservation** — add `RE-224`/`RE-225` rows at `Status: Draft` BEFORE or alongside content authoring (matches every template's own instruction and the 129-131 precedent of registering IDs before/during authoring, not after).
5. **C17 gate + link-checker run** against both new files once content-complete — must pass before status promotion.
6. **Registry status flip** Draft → Approved for both rows, owner-gated — the actual "join the publish set" trigger.
7. **`build-filename-map.mjs` regeneration** AND its `--self-test` canary bump 223→225 — these two should land in the SAME commit/plan (the canary bump is meaningless without the regeneration, and vice versa risks the drift Phase-133 had to defer-and-fix once already).
8. **Navigation-last hub wiring** — `docs/index.md` recipes-table rows AND the quick-nav bullet at line 38, together, in one commit that structurally post-dates every content commit (recipe 01's own navigation-last commit ordering — status-flip commit → registry+filename-map commit → nav commit — is the proven pattern to repeat; Phase 132's `132-REVIEW.md` documents the exact three-commit sequence `996dcead → fb179bfa → 71ad89a3`).
9. **`common-issues.md`/`quick-ref-l1.md`/`quick-ref-l2.md` not-wired re-confirmation** — same phase as (8), a verification step not a content step.
10. **Publish-bundle regeneration** `--version=v1.19` — after (8), picks up both new Approved rows automatically.
11. **Harness-close cluster (V118 pin, 17th Path-A lineage bump, terminal re-audit, close-gate)** — structurally its own final phase, **never batched with content or integration work**, mirroring the unbroken Phase 100/112/119/125/128/134 precedent PROJECT.md itself cites. This is the LAST phase regardless of how RE-224/225 phase-numbering shakes out.

**Ordering rationale beyond dependency:** (1) must lead because a negative Plan-1 result changes what RE-224 even is (re-scope/defer), which would otherwise force rework of every downstream step. (4) precedes full authoring (not strictly required by tooling, but is the established template-instruction convention — "fill in `doc_id` from the registry at doc creation time"). (7) and (8) are two separate commits per navigation-last discipline even though they could theoretically land together — keeping them separate is what let Phase 132's `132-REVIEW.md` prove commit-order compliance cleanly, and what makes a stray nav-only revert possible without touching the registry/filename-map state.

## Frozen-Surface Hazards

`docs/_glossary-android.md` (365 pin coordinates) and `docs/reference/android-capability-matrix.md` (139 pin coordinates), aggregated across 16 frozen validator sidecars (confirmed live: `v1.4-audit-allowlist.json` through `v1.17-audit-allowlist.json`, `v1.18-audit-allowlist.json`, plus `check-phase-55.mjs` and `regenerate-supervision-pins.mjs`'s own `supervision_exemptions[]` mechanism — a `{file, line}` coordinate pin scheme, confirmed directly in `README-supervision-pins.md`). Any edit that shifts line numbers above a pinned line invalidates every pin below it in that file — this is the exact mechanism `TOOL-04` closed for 14 sidecars in Phase 133, and PROJECT.md budgets a scoped CARVE-1 re-pin as a named contingency, never an ad hoc mid-execution discovery.

**What RE-225 would normally want to add to these two files, and why it shouldn't:**

| Normal impulse | Why it's a hazard | What to do instead |
|---|---|---|
| New glossary term for an MMHS-multi-app-specific concept (e.g., a term for the "second fork" provisioning-method decision) | Any insertion into `_glossary-android.md`'s body or its alphabetical index shifts every pinned line below it — 365 coordinates at risk | The three concepts RE-225 needs (`Dedicated`, `Managed Home Screen`, `Entra Shared Device Mode`) **already have glossary entries** (confirmed live in the Alphabetical Index) — link to the existing anchors, add nothing new. |
| A new capability-matrix row/column for the MMHS scenario specifically | Same line-shift risk, 139 coordinates, plus this file is independently pinned across nearly every `vX.Y-milestone-audit.mjs` (18 files matched a grep for its sibling `4-platform-capability-comparison.md`, same mechanism) | The existing `## Enrollment` table already has a full "Dedicated (COSU)" column covering MHS as a locking style — link to it, don't add a row. |
| A "See Also" line added mid-file to either doc, pointing back at the new recipe | Still a line-shift into a frozen body | **Append-only is safe for `See Also`/Changelog-style additions only if they land at the true end of an existing, already-terminal section** — but neither of these two files' `See Also`/Changelog sections is confirmed safe from a downstream pin sitting exactly there. The zero-risk alternative: skip editing these files entirely. A brand-new file (the recipe itself) linking OUT to an existing anchor requires no edit to the target file at all — this is already the correct shape and is what the cross-link tables above specify. |

**General principle:** the two frozen files should receive **zero edits** from v1.19. Every piece of reader value RE-225 wants from them (terminology, capability framing) is achievable by linking to anchors that already exist — none of the concepts RE-225 needs are actually missing from these files, only the New-glossary-term/new-row impulse is the hazard, and that impulse is avoidable because the underlying content is already there.

## Shared Conceptual Anchor (gray area — option space only, not resolved)

Both RE-224 (Windows multi-app kiosk) and RE-225 (Android Dedicated MMHS) are "locked-down single-purpose device" scenarios, and the corpus already has a THIRD member of this taxonomy family live in `05-dedicated-devices.md`'s own "Platform note" (`docs/admin-setup-android/05-dedicated-devices.md:32-36`): "Dedicated device... is structurally distinct from iOS Shared iPad (multi-user shared identity) and Windows Shared PC (multi-user fast-switch)" — i.e., the corpus already has an informal kiosk-vs-shared-device cross-platform taxonomy statement, just not a formal home for it. PROJECT.md names "shared conceptual anchor" as one of eight gray areas explicitly routed to `/gsd-discuss-phase` + `/adversarial-review` — this section documents the grounded option space per the same convention v1.18's ARCHITECTURE.md used for the decision-point-block-shape gray area.

**Option A — Duplicate the taxonomy statement locally in each recipe's own Summary/Platform-gate blockquote.** Zero risk (new files only), zero DRY. Matches the existing `05-dedicated-devices.md:32-36` pattern exactly — that pattern is ALREADY duplicative in spirit (it's a one-off Platform note, not a cross-referenced single source).

**Option B — A small brand-new Reference doc scoped to the taxonomy itself** (e.g., `docs/reference/device-lockdown-taxonomy.md`, new `RE-NNN`), linked FROM both recipes and from `05-dedicated-devices.md`'s existing Platform note (a link addition to that note's own file — itself frozen-pinned, so even this "linking in" edit needs the same line-shift caution, though appending a single link at the very end of an already-short blockquote run is lower-risk than a body insertion). New files carry zero forward pins by construction (nothing pins into a file that doesn't exist yet), so the new doc itself is unconditionally safe to create and edit freely.

**Option C — Fold it into the existing `docs/reference/4-platform-capability-comparison.md`** (already the cross-platform comparison surface, already links out to `android-capability-matrix.md`, `linux-capability-matrix.md`, etc.). Confirmed this file is ALSO pinned across essentially every `vX.Y-milestone-audit.mjs` since v1.5 (18-file grep match) — carries the same line-shift hazard as the two named-frozen files, just not called out by name in PROJECT.md. Treat as equally hazardous, not a safe harbor.

**Assessment (not a resolution):** Option B is the only one that adds zero risk to any existing frozen surface while still giving the taxonomy a single, citable, DRY home — at the cost of one new small file and one very-low-risk single-link append to `05-dedicated-devices.md`'s Platform note. Option A is the zero-risk, zero-new-file "lazy" choice if the discuss-phase gray-area review decides a dedicated doc is overkill for a two-recipe corpus. Option C should be ruled out regardless of which way the gray area resolves — it trades the illusion of a natural home for the same pin-invalidation risk the guardrail exists to avoid.

## Anti-Patterns (v1.19-specific, additive to v1.18's four)

### Anti-Pattern 5: Cross-linking `01-managed-google-play.md` for RE-225's app-deployment step
**What people might do:** Treat "MGP already lists MHS as auto-approved" as sufficient and link there instead of writing the assignment step.
**Why it's wrong:** Binding and pre-approval are not assignment. A reader following that link will not learn how to make the app install on the device — this fails the recipe's own "yields a concrete, reproducible device configuration" definition.
**Do this instead:** Inline the step, per RE-222's own precedent for the identical Windows-side gap.

### Anti-Pattern 6: Adding a new glossary term or capability-matrix row for MMHS-specific vocabulary
**What people might do:** Add a fourth Android glossary entry or a new capability-matrix column while authoring RE-225, since that's the normal instinct when a recipe introduces new vocabulary.
**Why it's wrong:** Triggers the 365/139-coordinate re-pin cascade across 16 frozen sidecars — an out-of-budget cost for a documentation-only addition when the underlying concepts already have anchors.
**Do this instead:** Link to the three existing anchors (`#dedicated`, `#managed-home-screen`, `#entra-shared-device-mode`); if new vocabulary is genuinely needed, park it in the new recipe file itself (unpinned, zero risk) rather than the glossary.

### Anti-Pattern 7: Landing the `docs/index.md` H2 recipes-table rows without the line-38 quick-nav bullet in the same commit
**What people might do:** Repeat exactly what Phase 132 did — add the `## Device Configuration Recipes` table rows, treat that as "navigation done," and let code-review catch the missing quick-nav bullet after the fact (WR-01).
**Why it's wrong:** It shipped once already and was caught late; PROJECT.md explicitly names this as a known defect pattern to avoid pre-emptively this time.
**Do this instead:** Author the integration-phase validator (ripple item 10 above) to assert BOTH needles from the start, and land both edits in the same nav-last commit.

### Anti-Pattern 8: Chaining RE-224's prerequisite links through recipe 01 instead of linking `admin-setup-apv1/*` directly
**What people might do:** Since RE-224 is "like recipe 01 but multi-app," link RE-224's dynamic-group/ESP/self-deploying prerequisites to recipe 01's Prerequisites section instead of to the underlying `admin-setup-apv1/*` guides.
**Why it's wrong:** Recipe 01 itself treats those guides as external references, not owned content — chaining through recipe 01 adds an indirection hop for no reason and creates an implicit dependency on recipe 01's own prose staying stable, which recipe 01 (frozen by `check-phase-130.mjs`) does not promise beyond its two literal Step-5a/5b headings.
**Do this instead:** Link `admin-setup-apv1/*` directly, exactly as recipe 01 does. The ONLY sanctioned recipe-to-recipe link is the single-app-kiosk one-liner to `#step-5a-kiosk-configuration`.

## Integration Points

| Boundary | Communication | Notes |
|----------|---------------|-------|
| `docs/recipes/03-*.md` (RE-224) ↔ `docs/recipes/01-shared-windows-avd-client.md` | One outbound link, `#step-5a-kiosk-configuration` | The corpus's first recipe-to-recipe cross-link; protected on the target side by `check-phase-130.mjs`'s literal-string pin — RE-224 authoring never edits recipe 01. |
| `docs/recipes/04-*.md` (RE-225) ↔ `docs/admin-setup-android/05-dedicated-devices.md` | Multiple outbound links (`#scenarios`, `#enrollment-profile`, `#provisioning-method-choice`, `#exit-kiosk-pin-synchronization`) | All anchors pre-exist and are verified live; zero edits to the target file. |
| `docs/recipes/04-*.md` (RE-225) ↔ `docs/admin-setup-android/01-managed-google-play.md` | One outbound link (`#bind-mgp`) + inline app-deployment content that does NOT link there for assignment mechanics | Missing-target problem resolved by inlining, not cross-linking, for the assignment step specifically. |
| `docs/recipes/*` (both) ↔ `docs/_glossary-android.md` / `docs/reference/android-capability-matrix.md` | Outbound links to existing anchors ONLY | Zero edits — the frozen-surface guardrail (365/139 pin coordinates, 16 sidecars). |
| `RE-index.md` ↔ `filename-map.md` ↔ `build-publish-bundle.mjs` | Unchanged one-way generator chain | Zero pipeline code changes expected, confirmed identical to v1.18's finding — this remains purely a registry-data-plane integration. |
| `build-filename-map.mjs --self-test` ↔ `RE-index.md` | Hard-coded row-count assertion, must track the registry | The one code line that DOES need to change this milestone (223 → 225). |
| `docs/index.md` ↔ recipes | Two separate edit sites (H2 table + line-38 quick-nav bullet), both navigation-last, both required | The WR-01 gap this milestone must close proactively. |
| `docs/recipes/03-*.md` (RE-224) ↔ `docs/admin-setup-apv1/*` | Outbound links only, direct (not via recipe 01) | Mirrors recipe 01's own external-reference pattern. |

## Sources

All findings grounded in direct reads of the local repository at `D:\claude\Autopilot` on 2026-07-25:

- `.planning/PROJECT.md` (lines 1-60, v1.19 section) — scope, guardrails, the eight named gray areas, the CARVE-1/pin-coordinate guardrail language, the missing-target problem statement
- `.planning/research/ARCHITECTURE.md` (v1.18's version, read before being overwritten) — confirmed pipeline/C17/registry mechanics unchanged, mirrored document shape
- `.planning/milestones/v1.18-ROADMAP.md` (full) — Phase 129-134 sequencing precedent, especially Phase 132's exact commit-order proof and Phase 133/134's structurally-separate tooling/close-cluster precedent
- `docs/recipes/01-shared-windows-avd-client.md` (full, 243 lines) — cross-link patterns actually used, Step 4/5a/5b structure, confirmed `admin-setup-apv1/*` has no app-deployment guide (RE-222's own Step 4 inline precedent)
- `docs/recipes/02-shared-ipad-full-provisioning.md` (full, 290 lines) — confirmed RE-223's `admin-setup-ios/05-app-deployment.md#vpp-device-licensed` cross-link pattern (the only-platform-with-a-guide case)
- `docs/_registry/RE-index.md` (tail, 30 lines) — current max ID (RE-223), row format
- `docs/index.md` (grep for "recipe") — confirmed both the H2 table (lines 274-281) and the quick-nav bullet (line 38) live locations
- `docs/admin-setup-android/05-dedicated-devices.md` (full, 360 lines) — all verified anchors, the four-scenario table, token-type Delta 1, exit-PIN sync H2, provisioning-method fork with Knox/ZT mutual exclusion
- `docs/admin-setup-android/01-managed-google-play.md` (full, 158 lines) — confirmed scope is binding + auto-approval, not general assignment; confirmed `#bind-mgp` anchor
- `docs/admin-setup-apv1/10-config-failures.md` (partial) — confirmed as the APv1 reverse-lookup table, confirmed recipe 01 does NOT link there in its own failures table (precedent for RE-224 to follow)
- `docs/admin-setup-android/*.md`, `docs/admin-setup-ios/*.md`, `docs/android-lifecycle/*.md`, `docs/admin-setup-apv1/*.md` (directory listings) — confirmed the missing-guide asymmetry between iOS (has app-deployment + config-profiles guides) and Android/Windows (neither has one)
- `scripts/pipeline/build-filename-map.mjs` (grep for self-test/row-count) — confirmed the `rows.length === 223` canary at line 282 and its v1.18-bump comment at line 275
- `scripts/validation/check-phase-130.mjs` (grep) — confirmed the `V-130-KIOSKFORK` literal-string pin on recipe 01's Step 5a/5b headings
- `scripts/validation/check-phase-132.mjs` (grep) — confirmed the existing `V-132-INDEXNAV` needle checks ONLY the H2 section, not the quick-nav bullet (the exact gap this milestone's validator must close)
- `.planning/milestones/v1.18-phases/132-integration-navigation-last-close/132-REVIEW.md` (partial) — confirmed the WR-01 defect narrative and the three-commit navigation-last sequence (`996dcead → fb179bfa → 71ad89a3`)
- `scripts/validation/README-supervision-pins.md` (full) — confirmed the `{file, line}` pin-coordinate mechanism, the 16-sidecar family (`v1.4`..`v1.18-audit-allowlist.json` + `regenerate-supervision-pins.mjs` + `check-phase-55.mjs`), and the never-auto-pin / human-in-the-loop re-pin discipline
- `docs/_glossary-android.md` (head, 40 lines) — confirmed the Alphabetical Index already contains `Dedicated`, `Managed Home Screen`, `Entra Shared Device Mode` anchors
- `docs/reference/android-capability-matrix.md` (head, 40 lines) — confirmed the existing Dedicated (COSU) column already covers MHS locking style; confirmed pinned across `check-phase-55/58/60/63/109` and every `vX.Y-milestone-audit.mjs`
- `docs/reference/4-platform-capability-comparison.md` (head, 30 lines) + grep for its own pin footprint — confirmed it carries the same line-shift hazard as the two PROJECT.md-named files, ruling it out as a "safe" home for the shared taxonomy
- `scripts/validation/_lib/frozen-at-close.mjs` (grep) — confirmed the `readAtVNNClose` export family pattern, context for the V118-pin mandatory item
- Grep across `docs/l1-runbooks/`, `docs/l2-runbooks/` for "Assigned Access"/"kiosk"/"KioskModeApp" — confirmed no Windows-kiosk-specific failure runbook exists (same missing-target shape as recipe 01 already navigated)

---
*Architecture research for: RE-224 (Windows multi-app kiosk) / RE-225 (Android Dedicated MMHS) document-corpus integration, v1.19 milestone*
*Researched: 2026-07-25*
