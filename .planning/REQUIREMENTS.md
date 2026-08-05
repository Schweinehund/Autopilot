# Requirements: v1.20 Frozen-Aware CI Remediation & Chain-Validator Debt Closure

**Defined:** 2026-08-04
**Core Value:** IT teams can independently provision, troubleshoot, and manage Windows, macOS, iOS/iPadOS, Android, and Linux devices through Microsoft Intune / Entra ID without escalating to engineering — and find those answers as clean, correctly-cited results in the Copilot Studio / SharePoint knowledge base. v1.20 protects that corpus by repairing the validator chain and CI harness lineage that guards it.

**Milestone bar:** all **17** `audit-harness-*` integrity workflows green, with `ACCEPTED-STANDALONE-CI-RED` and `ACCEPTED-SCOPED-RED` **deleted** from the backlog rather than carried a seventh milestone.

**Scope resolved via `/grill-me` + `/adversarial-review` (2026-08-04):** 4 parallel Finders → Adversary → Referee; **74 findings, 7 disproved, 67 confirmed (19 CRITICAL)**. Every `[MEASURED]` figure below was executed against live code at HEAD `347c20a8`. The review **overturned the initial recommendations** on mechanism (frozen-aware-first → fetch-depth-first), ordering (self-test-first → freshness-first), the deep-nest premise, and the Path-A fork. See `PROJECT.md`'s v1.20 Key Context for the three corrections of record.

## v1.20 Requirements

Requirements for this milestone. Each maps to roadmap phases (Phase 139+).

### Sweep — CARVE-1 frozen-aware conversion (SWEEP)

- [ ] **SWEEP-01**: **[SUCCESS-CRITERION AMENDMENT, D-13/D-14]** Every `actions/checkout@v4` step across all 16 `audit-harness-*.yml` workflows carries `fetch-depth: 0` — 97 previously-shallow checkouts of 182 total (85 already deep): 32 in the three originally-named files (`audit-harness-integrity.yml` 4 checkouts, `audit-harness-v1.5-integrity.yml` 18, `audit-harness-v1.6-integrity.yml` 10) plus exactly 5 per file in the other 13 workflows, all depth-1 today. This is an owner-ratified extension of the original 4/18/10-count wording, recorded in `.planning/milestones/v1.20-CARVE.md`.
- [ ] **SWEEP-02**: **[SUCCESS-CRITERION AMENDMENT, D-24]** A dedicated `frozen-read-probe` job (no `needs:`), one per retrofitted workflow, executes a frozen `git show` read plus one real `readAtClose` call successfully in a dispatched CI run — replacing the original "the 11 validators that already import `frozen-at-close` execute their frozen reads in their existing `needs: harness-run` jobs" wording, which is structurally unobtainable in Phase 139 (D-23): both v1.5/v1.6 harnesses exit 1 at HEAD, so those jobs report `skipped` on any ref until Phase 141
- [ ] **SWEEP-03**: **[SUCCESS-CRITERION AMENDMENT, D-30]** FOUR silent-swallow fallbacks, not three — `check-phase-49.mjs:264`, `check-phase-49.mjs:297`, `check-phase-49.mjs:334`, and `check-phase-51.mjs:31` — fail loud instead of returning `null` / `""`, proven by a negative test
- [ ] **SWEEP-04**: `_lib/frozen-at-close.mjs` exposes a frozen enumeration API (`lsTreeAtClose()`) so a harness can derive its file scope at a close SHA instead of walking live HEAD
- [ ] **SWEEP-05**: Each frozen milestone-audit harness v1.4–v1.19 reads its corpus at its own close SHA rather than live HEAD
- [ ] **SWEEP-06**: The converted harnesses complete inside `check-phase-60.mjs`'s 60-second subprocess timeout, verified by measurement
- [ ] **SWEEP-07**: The v1.4 `TEMPLATE-SENTINEL` assertion has a named, recorded remedy distinct from frozen-awareness
- [ ] **SWEEP-08**: A `V14` pin exists with an explicitly chosen SHA and recorded rationale, satisfying the `frozen-at-close.mjs:94-96` gate
- [ ] **SWEEP-09**: **[NEW REQUIREMENT, D-33, scoped to Phase 141]** The remaining silent-swallow frozen-read sites (measured at roughly 38 `catch`-to-null/empty frozen-read sites across 20 validators, of which Phase 139's SWEEP-03 fixes 4) fail loud. Explicit note: `check-phase-61.mjs:39-45`'s `readAtV15CloseFor61` **cannot** be fixed at the library root — it carries its own inline reader, does not import `_lib/frozen-at-close.mjs` for these reads, is one of the 11 SWEEP-02 validators, and is pinned in place by `check-phase-68.mjs:202` `V-68-10`.

**Why SWEEP-01 is first and mandatory.** `readAtClose()` (`_lib/frozen-at-close.mjs:111`) is `execFileSync('git', ['show', sha + ':' + path])`, and `actions/checkout@v4` defaults to `fetch-depth: 1`. `[MEASURED]` `git clone --depth 1` followed by `git show ba2cbc0:docs/_glossary-linux.md` → `fatal: invalid object name`. The `FETCH-DEPTH-01` contract arrived at v1.7 and was never retrofitted to the three oldest workflows. Without SWEEP-01, SWEEP-05 converts 9 clean two-assertion failures into hard crashes.

**Why SWEEP-07 exists (a third failure class).** `[MEASURED]` `docs/_templates/admin-template-android.md` has carried `last_verified: 1970-01-01 # TEMPLATE-SENTINEL` since **before v1.4 closed** (byte-identical at both V14 candidates and live); v1.4's regex `/^last_verified:\s*(\d{4}-\d{2}-\d{2})\s*$/m` cannot match it, and the sentinel skip only arrived in v1.4.1. This assertion **was never green at v1.4's own close SHA**, so `readAtV14Close()` returns identical bytes and identical failure. Frozen-awareness cannot fix it.

### Red — ten-member standalone-RED validator set (RED)

- [ ] **RED-01**: The v1.5–v1.13 C5/C10 freshness assertions pass **without editing either glossary's metadata**
- [ ] **RED-02**: `regenerate-supervision-pins.mjs --self-test` exits 0 via a classifier fix, with the v1.7 fixture unedited and the classifier not relaxed
- [ ] **RED-03**: `check-phase-{48,60,61,62,63,64,65,66}` all exit 0 standalone
- [ ] **RED-04**: `check-phase-30` exits 0 standalone
- [ ] **RED-05**: `check-phase-31` exits 0 standalone, including V-31-23 resolved via `resolveArchivedPhasePath(..., ['v1.3-phases'])`
- [ ] **RED-06**: `check-phase-30` and `check-phase-31` are members of the apex `CHAIN_PHASES` array and execute under it
- [ ] **RED-07**: `check-phase-68`'s `V-68-04` and `V-68-08` still pass after the check-phase-31 changes

**Ordering, corrected.** `[MEASURED]` `check-phase-48` = 6 PASS / 1 FAIL (self-test only); `check-phase-60` = 22/3 including **V-60-23** (v1.5 harness C5); `check-phase-61` = 30/4 including **V-61-33** (v1.5 harness C5). The self-test therefore greens **one** validator, not six — **RED-01 is the true prerequisite** for 60, 61 and all five of 62–66. This matches the MANDATORY STATEMENT at `v1.19-DEFERRED-CLEANUP.md:83`.

**RED-02 method.** Frozen-awareness is the wrong instrument here: `[MEASURED]` all four `_glossary-android.md` entries in `v1.7-audit-allowlist.json:12-15` (145/147/303/333) match the **live** file byte-for-byte, so reading at V17 would emit `:80` against a pin of `:145` — a *new* mismatch. The real defect is the classifier's backward-only scan window (`regenerate-supervision-pins.mjs:204-238` scans the occurrence line plus 2 preceding; the iOS token sits at line **147**, two lines *after* the heading). Classifier context-window investigation is the path D-12 explicitly sanctions.

**RED-06 rationale and cost.** `[MEASURED]` `grep -rn "check-phase-30\|check-phase-31" .github/workflows/` returns **zero hits**, and neither appears in any `CHAIN_PHASES` array — so they contribute nothing to the milestone bar and, left orphaned, any fix is unenforced by construction and will silently re-rot. Adoption cost is ~**+0.35s on a ~17s apex run**: under the `CHECK_PHASE_NESTED` guard the apex is O(n). (The earlier "adoption worsens the deep-nest item" objection rested on an inverted reading of that guard and is withdrawn.)

**RED-07 is a hard guardrail.** `check-phase-68.mjs:97-115` (`V-68-04`: `check-phase-31.mjs` must remain one of the `archive-path` helper's 5 import call-sites) and `:166-176` (`V-68-08`: it must retain its `_missing` discriminator marker) are in **every apex chain**. Breaking either converts a scoped-red orphan into an apex chain failure.

### Link — corpus link coverage + fence-mask unification (LINK)

- [ ] **LINK-01**: `computeAnchorSetFromContent` (`check-nav-hub-links.mjs:132-166`) recognises HTML `<a id="…">` anchors
- [ ] **LINK-02**: A corpus-wide checker validates every relative link and anchor across `docs/`, excluding `docs/_templates/` and masking inline code spans
- [ ] **LINK-03**: The 13 genuine broken links are fixed
- [ ] **LINK-04**: The checker exits 0 on the corpus with **no accepted-violation baseline**
- [ ] **LINK-05**: Fence-mask behaviour is unified across all 15 call sites in 9 files, including **both** c17 sites
- [ ] **LINK-06**: c17 reports identical file and violation counts before and after the fence-mask change, and the newly-masked lines are proven to hide no suppressed violation

**Sequencing is load-bearing.** `[MEASURED]` a prototype corpus-wide checker scanned 6311 relative links → 40 broken file targets, of which **26** are `docs/_templates/*` placeholders, **1** is a false positive (`docs/recipes/03-windows-11-multi-app-kiosk.md:173`, a PowerShell `[xml](Get-Content …)` cast read as a markdown link), leaving **13 genuine** — 11 `../` over-escapes in `docs/_glossary-macos.md` and 2 in `docs/admin-setup-ios/`. Anchor direction: **271 failures → 70** once HTML `<a id>` anchors are recognised, i.e. **201 of 271 (74%) are pure model gaps**. LINK-01 must therefore precede LINK-02, and LINK-04 forbids a baseline: a day-one ratchet would freeze 201 false positives as permanently accepted *and invisible* — the very disposition class this milestone exists to delete.

**LINK-05 census.** `retrofit-guide.mjs` (1), `retrofit-mermaid-structural.mjs` (3), `retrofit-nav-hub.mjs` (3), `retrofit-reference.mjs` (1), `retrofit-runbook.mjs` (1), `retrofit-structural.mjs` (1), `c17-eee-contract.mjs` (2 — `:158` opening, `:166` closing), `check-nav-hub-links.mjs` (2 — `:91`, `:94`), `scripts/pipeline/convert.ps1` (1). Patching only the opening fence yields a mask that opens on indented fences but never closes. `[MEASURED]` the corpus has **74** fences indented 1–3 spaces across 11 files and **0** at 4+ or tab-indented, so a `^ {0,3}` CommonMark rule covers 100% of live instances. `convert.ps1`'s mask governs only the D-03(a) nav-footer rewrite on an ephemeral temp copy and does not decide `.docx` code-block rendering — pandoc does — so its unification is hygiene, not correctness.

**Real recipe surface.** `[MEASURED]` recipes 01 (18), 02 (13), 03 (14), 04 (28) = **73** `../` links across 4 files, not the 42 recorded in `RECIPE-OUTBOUND-LINK-COVERAGE`.

### Nest — cold-clone cost (NEST)

- [ ] **NEST-01**: Cold-clone apex cost at `[48..138]` is measured on Windows with a stated method (clone depth, cache state, Defender state, runner), a recorded pass/fail threshold, and an explicit "if over threshold then mechanism X" rule

**Scoped cold-clone-only.** Per `v1.19-DEFERRED-CLEANUP.md:252` the cold-clone and within-apex curves are distinct and must not be re-collapsed. The within-apex curve is healthy: `[MEASURED]` `check-phase-138.mjs` runs all 90 children in ~**17s, 93 PASS / 0 FAIL / 0 SKIPPED** on Windows at HEAD. The threshold and decision rule are mandatory so the phase can carry falsifiable success criteria at plan time — "measure then decide" without one is how this item survived six milestones.

### Gov — frozen-surface governance (GOV)

- [x] **GOV-01**: One named milestone-scoped CARVE records an explicit file allowlist covering the frozen harnesses, the workflows **and the nine Pillar-C files**, with a byte-unchanged gate on everything off-list
- [x] **GOV-02**: Every frozen-surface edit is preceded by a grep for pinning call-sites and guarded by a regression gate

**Why GOV-02 is separate.** The documented expensive failure is the reverse of unlisted drift: a later frozen validator pinning an earlier file's exact call-site string verbatim. `check-phase-111.mjs`'s `V-111-TOOL03` pins `check-phase-48`'s `{ n: 200, trim: false, prefix: '--self-test FAIL: ' }` literally, and it was caught only mid-execution by the v1.18 Phase 133 regression gate.

**V14 SHA must be chosen explicitly.** `b5cf529` ("commit v1.4 milestone archive files (ROADMAP, REQUIREMENTS)", 22:02:56) and `671f72a` ("archive v1.4 phase directories", 22:02:22) are **34 seconds apart and not equivalent** — the latter predates the ROADMAP/REQUIREMENTS archive commit. `check-phase-30/31` are **v1.3**-era, so `V14` does not serve them; a separate v1.3 pin is required if RED-04/05 use frozen reads.

### Harn — mandatory harness close (HARN)

- [ ] **HARN-17**: `_lib/frozen-at-close.mjs` **V119** entry (`a7bda73e`) + `readAtV119Close` export
- [ ] **HARN-18**: 18th Path-A lineage bump — `v1.20-milestone-audit.mjs` + `v1.20-audit-allowlist.json` + BASELINE_24 + `check-phase-139..NN.mjs` with the apex extending to `[48..138]` **generated by arithmetic** + 17th parallel CI coexistence workflow **born with `fetch-depth: 0`**
- [ ] **HARN-19**: 3-axis terminal re-audit + **all 17 workflows dispatched green** + publish bundle regenerated `--version=v1.20` + SINGLE close-gate commit flipping all v1.20 requirements to Validated

**V119 recovery, pre-verified.** `git log --all --format="%H|%s" | awk -F'|' '$2 ~ /v1\.19/ && $2 ~ /MILESTONE CLOSE/'` → `a7bda73e23efc5e3f9607c3fef37abf8ec4030aa`, **count = 1**. Never the naive dual-token `--grep --all-match` form, which matches on the body and returns multiple candidates.

**Workflows fire on `pull_request` + `schedule` + `workflow_dispatch` only** — a push to `master` fires nothing. Axis-2 needs an explicit `gh workflow run --ref master`, and CI must never be read while the remote is behind. A "green" run is also compatible with a cron-skipped quarterly job and a `continue-on-error: true` advisory job, so HARN-19's evidence must be job-level JSON, not the checks UI.

## Future Requirements

Deferred, tracked, not in this roadmap.

| Item | Reason |
|---|---|
| `CI-3` Managed Apple ID → Managed Apple Account rename (57 occurrences / 17 files) | Trigger unmet — no in-repo evidence Intune has adopted the rebrand portal-side |
| `ANCHOR-REVIEW-BY-PAST-DUE` (`05-dedicated-devices.md` freshness) | Corpus-metadata refresh; belongs to the next phase that legitimately touches the anchor doc |
| `MTPSSO-01/02/03` + `PSSO-FUT-03` | Net-new multi-tenant architectural scope |
| `KRBFUT-01/02` | On-prem-AD-only Kerberos depth; Azure Files Cloud-Kerberos pending GA |
| AOSP-wired 802.1X + Cloud PKI / Intune Certificate Connector deep-dive | Carried from v1.14 out-of-scope |
| Apple School Manager, Apple Business Device API, multi-tenant Apple Business surfaces | Outside enterprise scope / pending Apple publication |
| `HUB-WIRING-NON-BARRED-SURFACE` | Fires only when a kiosk-lockout or MHS-exit-PIN L1/L2 runbook is authored |
| `SHARED-TAXONOMY-DOC` (Option B) | Trigger unmet — needs a third lockdown recipe and a free canary budget |
| `ROLLBACK-RECOVERY-DIVERGENCE-COUNT` | Trigger unmet at 2-of-4; fires when a third recipe needs the slot |

## Out of Scope

Explicitly excluded, with reasoning.

| Feature | Reason |
|---------|--------|
| Frozen-aware `v1.20-milestone-audit.mjs` against its **own** corpus | Requires a `V120` pin — the exact back-anchor circularity `V119-PIN-DEFERRAL` names. A close-gate cannot reference its own not-yet-existing SHA |
| Protecting Path-A verbatim C1–C17 inheritance | **No validator asserts it.** "Path A" exists only in header comments; `V-NN-AUDIT-HARNESS` asserts only exit 0. There is no invariant to protect |
| Editing either glossary's `last_verified` / `review_by` to satisfy frozen assertions | The corpus is **correct** under Phase 112's 90-day rule. Both files sit at exactly 90d against a `>90` test, so a one-day edit flips six currently-green workflows red |
| Editing `v1.7-audit-allowlist.json`, or relaxing the self-test classifier | Both are the recorded forbidden anti-patterns; D-12 sanctions classifier *investigation* instead |
| Re-authoring corpus content to satisfy stale assertions | Would require deleting Linux from a platform enum, re-adding Mermaid that STD-04 bars, and un-shipping Android cross-links. Standing rule: *a corpus edit requires proof the document is wrong, not merely that a frozen assertion disagrees with it* |
| Graph/SharePoint auto-upload | Would introduce the first `secrets.` reference in any workflow at tenant-wide `Sites.ReadWrite.All`, and put a live-tenant dependency on the close path |
| SharePoint content-approval; Azure AI Search structured index | Deployment/infra levers, owner/ops-deferred |
| New content documentation of any kind | v1.20 carries **no content pillar** — CARVE-1's routing bars it from folding into a content milestone, and the converse discipline applies here |

## Traceability

Which phases cover which requirements. Populated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| SWEEP-01 | Phase 139 | Pending |
| SWEEP-02 | Phase 139 | Pending |
| SWEEP-03 | Phase 139 | Pending |
| SWEEP-04 | Phase 139 | Pending |
| SWEEP-05 | Phase 140 | Pending |
| SWEEP-06 | Phase 140 | Pending |
| SWEEP-07 | Phase 140 | Pending |
| SWEEP-08 | Phase 140 | Pending |
| RED-01 | Phase 141 | Pending |
| RED-02 | Phase 141 | Pending |
| RED-03 | Phase 141 | Pending |
| RED-04 | Phase 142 | Pending |
| RED-05 | Phase 142 | Pending |
| RED-06 | Phase 142 | Pending |
| RED-07 | Phase 142 | Pending |
| LINK-01 | Phase 143 | Pending |
| LINK-02 | Phase 143 | Pending |
| LINK-03 | Phase 143 | Pending |
| LINK-04 | Phase 143 | Pending |
| LINK-05 | Phase 143 | Pending |
| LINK-06 | Phase 143 | Pending |
| NEST-01 | Phase 142 | Pending |
| GOV-01 | Phase 139 | Complete |
| GOV-02 | Phase 139 | Complete |
| HARN-17 | Phase 144 | Pending |
| HARN-18 | Phase 144 | Pending |
| HARN-19 | Phase 144 | Pending |
| SWEEP-09 | Phase 141 | Pending |

**Coverage:**

- v1.20 requirements: 28 total
- Mapped to phases: 28 (100%)
- Unmapped: 0

---
*Requirements defined: 2026-08-04*
*Last updated: 2026-08-05 — Phase 139 Plan 01 amendment: SWEEP-01/02/03 re-worded to the ratified scope (D-13/D-14, D-24, D-30), new SWEEP-09 added and scoped to Phase 141 (D-33), requirement count 27 → 28 (28/28 mapped)*
