# Roadmap: Windows Autopilot & macOS Provisioning Documentation Suite

## Milestones

- 🚧 **v1.20 Frozen-Aware CI Remediation & Chain-Validator Debt Closure** — Phases 139-144 (in progress)
- ✅ **v1.19 Device Configuration Recipes #3 & #4 (Windows Multi-App Kiosk + Android Dedicated)** — Phases 135-138 (shipped 2026-08-04)
- ✅ **v1.18 Device Configuration Recipes (AVD Shared Windows + Shared iPad) & Chain-Validator Debt Closure** — Phases 129-134 (shipped 2026-07-20)
- ✅ **v1.17 Docs-Library .docx Publish-Bundle Pipeline (SharePoint / Copilot Upload Automation)** — Phases 126-128 (shipped 2026-07-11)
- ✅ **v1.16 EEE SOP Documentation-Standard Retrofit (Phase-2) + Pipeline/Structural Shelf-Clearing** — Phases 120-125 (shipped 2026-07-10)
- ✅ **v1.15 EEE SOP Documentation-Standard Retrofit (Phase-1)** — Phases 113-119 (shipped 2026-07-06)
- ✅ **v1.14 802.1X Network Authentication Documentation + Backlog & Tooling Closure** — Phases 101-112 (shipped 2026-07-02)
- ✅ **v1.13 macOS Platform SSO Admin-Setup Documentation Accuracy & Depth** — Phases 96-100 (shipped 2026-06-29)
- ✅ **v1.12 macOS MDM-Migration Verification Closure** — Phases 94-95 (shipped 2026-06-26)
- ✅ **v1.11 macOS PSSO End-to-End Provisioning & MDM Migration** — Phases 89-93 (shipped 2026-06-26)
- ✅ **v1.10 macOS Platform SSO Follow-ons — Kerberos, Graph API & NUAL** — Phases 83-88 (shipped 2026-06-24)
- ✅ **v1.9 macOS Platform SSO & Secure Enclave Authentication Documentation** — Phases 75-82 (shipped 2026-06-22)
- ✅ **v1.8 Tooling Debt Closure + Chain-Resilience Hardening** — Phases 71-74 (shipped 2026-06-08)
- ✅ **v1.7 Deferred Backlog Closure + Validator Chain Hardening** — Phases 67-70 (shipped 2026-05-29)
- ✅ **v1.6 Apple Business Delegated Governance & Multi-Org Operations** — Phases 62-66 (shipped 2026-05-25)
- ✅ **v1.5 Linux Platform, Operational Depth & Cross-Platform Cleanup** — Phases 48-61 (shipped 2026-05-07)
- ✅ **v1.4.1 Android Enterprise Completion & v1.4 Cleanup** — Phases 43-47 (shipped 2026-04-25)
- ✅ **v1.4 Android Enterprise Enrollment Documentation** — Phases 34-42 (shipped 2026-04-24)
- ✅ **v1.3 iOS/iPadOS Provisioning Documentation** — Phases 26-33 (shipped 2026-04-19)
- ✅ **v1.2 Cross-Platform Provisioning & Operational Gaps** — Phases 20-25 (shipped 2026-04-15)
- ✅ **v1.1 APv2 Documentation & Admin Setup Guides** — Phases 11-19 (shipped 2026-04-13)
- ✅ **v1.0 Autopilot Documentation & Troubleshooting Guides** — Phases 1-10 (shipped 2026-04-10)

## Phases

- [x] **Phase 139: Governance CARVE + fetch-depth Retrofit + Shallow-Job Repair** - GOV-01/02 CARVE + `fetch-depth: 0` on the 3 depth-1 workflows + shallow-job repair + `lsTreeAtClose()` enumeration API — the hard prerequisite for all frozen-aware conversion work that follows (completed 2026-08-05)
- [ ] **Phase 140: Frozen-Aware Harness Conversion** - v1.4–v1.18 milestone-audit harnesses converted to read their own close-SHA corpus instead of live HEAD (v1.19 converts in Phase 144 with the V119 pin; the C17 live-HEAD leg in v1.15–v1.18 stays unconverted, owned by Phase 143), within the check-phase-60 60-second subprocess budget
- [ ] **Phase 141: Standalone-RED Validator Set — Chain Members Green** - check-phase-48/60/61/62-66 exit 0 standalone; freshness, self-test classifier, and cascade root causes closed
- [ ] **Phase 142: Archival-Path Fix, Chain Adoption & Cold-Clone Threshold** - check-phase-30/31 fixed and adopted into the apex chain; cold-clone apex cost gets a falsifiable threshold
- [ ] **Phase 143: Link Coverage & Fence-Mask Unification** - corpus-wide relative-link + anchor checker green with zero accepted-violation baseline; fence-masking unified across all 15 call sites
- [ ] **Phase 144: V119 Pin + 18th Path-A Lineage Bump + Terminal Close** - mandatory harness lineage bump + 3-axis re-audit + all 17 integrity workflows dispatched green — sole deliverable of this phase

<details>
<summary>✅ v1.0–v1.19 (Phases 1-138) — SHIPPED</summary>

Full per-phase details are archived in `.planning/milestones/` (one `vX.Y-ROADMAP.md` per milestone) and summarized in `.planning/MILESTONES.md`.

- ✅ **v1.19 Device Configuration Recipes #3 & #4 (Windows Multi-App Kiosk + Android Dedicated)** (Phases 135-138) — SHIPPED 2026-08-04 — `.planning/milestones/v1.19-ROADMAP.md`
- ✅ **v1.18 Device Configuration Recipes (AVD Shared Windows + Shared iPad) & Chain-Validator Debt Closure** (Phases 129-134) — SHIPPED 2026-07-20 — `.planning/milestones/v1.18-ROADMAP.md`
- ✅ **v1.17 Docs-Library .docx Publish-Bundle Pipeline (SharePoint / Copilot Upload Automation)** (Phases 126-128) — SHIPPED 2026-07-11 — `.planning/milestones/v1.17-ROADMAP.md`
- ✅ **v1.16 EEE SOP Documentation-Standard Retrofit (Phase-2) + Pipeline/Structural Shelf-Clearing** (Phases 120-125) — SHIPPED 2026-07-10 — `.planning/milestones/v1.16-ROADMAP.md`
- ✅ **v1.15 EEE SOP Documentation-Standard Retrofit (Phase-1)** (Phases 113-119) — SHIPPED 2026-07-06 — `.planning/milestones/v1.15-ROADMAP.md`
- ✅ **v1.14 802.1X Network Authentication Documentation + Backlog & Tooling Closure** (Phases 101-112) — SHIPPED 2026-07-02 — `.planning/milestones/v1.14-ROADMAP.md`
- ✅ **v1.13 macOS Platform SSO Admin-Setup Documentation Accuracy & Depth** (Phases 96-100) — SHIPPED 2026-06-29 — `.planning/milestones/v1.13-ROADMAP.md`
- ✅ **v1.12 macOS MDM-Migration Verification Closure** (Phases 94-95) — SHIPPED 2026-06-26 — `.planning/milestones/v1.12-ROADMAP.md`
- ✅ **v1.11 macOS PSSO End-to-End Provisioning & MDM Migration** (Phases 89-93) — SHIPPED 2026-06-26 — `.planning/milestones/v1.11-ROADMAP.md`
- ✅ v1.0–v1.10 (Phases 1-88) — see milestone entries and `.planning/milestones/`

</details>

## Phase Details

### Phase 139: Governance CARVE + fetch-depth Retrofit + Shallow-Job Repair

**Goal**: One named milestone-scoped CARVE authorizes and bounds every frozen-surface edit in the milestone, and every checkout that performs or transitively triggers a frozen read carries `fetch-depth: 0` — the hard prerequisite for all frozen-aware conversion work that follows.
**Depends on**: Nothing (first phase of v1.20)
**Requirements**: GOV-01, GOV-02, SWEEP-01, SWEEP-02, SWEEP-03, SWEEP-04
**Success Criteria** (what must be TRUE):

  1. A single named milestone-scoped CARVE document records an explicit file allowlist covering the frozen harnesses, the workflows, and the nine Pillar-C files (`c17-eee-contract.mjs`, `convert.ps1`, `check-nav-hub-links.mjs`, 6× `retrofit-*.mjs`), with a byte-unchanged gate proven on everything off-list (GOV-01), and every edit landed this phase is preceded by a recorded grep-before-edit + regression-gate check per the `check-phase-111.mjs` `V-111-TOOL03` precedent (GOV-02).
  2. **[SUCCESS-CRITERION AMENDMENT, D-13/D-14]** Every `actions/checkout@v4` step across all 16 `audit-harness-*.yml` workflows carries `fetch-depth: 0` — 97 previously-shallow checkouts of 182 total (85 already deep), not only the 32 checkouts in the three originally-named files (`audit-harness-integrity.yml` 4 checkouts, `audit-harness-v1.5-integrity.yml` 18, `audit-harness-v1.6-integrity.yml` 10) — proven by a dispatched CI run in which a `git show <old-sha>:<path>` frozen read succeeds where it previously threw `fatal: invalid object name` (SWEEP-01). This is an owner-ratified extension of the phase's originally-roadmapped scope, recorded in `.planning/milestones/v1.20-CARVE.md`; Phase 144's close-gate reads it as authorized, not as drift.
  3. **[SUCCESS-CRITERION AMENDMENT, D-24]** A dedicated `frozen-read-probe` job (no `needs:`), one per retrofitted workflow, performs a frozen `git show` read plus one real `readAtClose` call, evidenced by job-level JSON from a single dispatch (SWEEP-02). This replaces the original "the 11 validators that already import `frozen-at-close` complete their frozen reads in their existing `needs: harness-run` jobs" wording, which is structurally unobtainable in Phase 139 (D-23): all 14 `check-phase-48..61` jobs in the v1.5 workflow and all 7 in the v1.6 workflow are `needs: harness-run`, and both harnesses exit 1 at HEAD, so those jobs report `skipped` on any ref until Phase 141's RED-01 greens the harnesses.
  4. **[SUCCESS-CRITERION AMENDMENT, D-30]** FOUR fail-loud sites, not three: `check-phase-49.mjs:264`, `check-phase-49.mjs:297`, `check-phase-49.mjs:334`, and `check-phase-51.mjs:31` fail loud on a missing/invalid frozen read instead of silently returning `null`/`""`, proven by a negative test (SWEEP-03).
  5. `_lib/frozen-at-close.mjs` exports a working `lsTreeAtClose()` enumeration API, proven by a self-test that enumerates a known frozen tree's file list at a real close SHA (SWEEP-04).

**Plans**: 6/6 plans executed

Plans:
**Wave 1**

- [x] 139-01-PLAN.md — Governance CARVE + `carve-gate.mjs` + Stop-hook + GOV-02 ledger + the four scope-of-record amendments (D-41 atom 1)

**Wave 2** *(blocked on Wave 1 completion)*

- [x] 139-02-PLAN.md — `_lib/frozen-at-close.mjs`: `lsTreeAtClose`, typed `frozenCause`, six-assertion `--self-test`, 21-importer blast-radius gate (D-41 atom 2)

**Wave 3** *(blocked on Wave 2 completion)*

- [x] 139-03-PLAN.md — Four fail-loud frozen-read sites + `file://` shallow-clone negative harness (D-41 atom 3)

**Wave 4** *(blocked on Wave 3 completion)*

- [x] 139-04-PLAN.md — `check-phase-69/70` `PRED_BLOBS` converted to frozen-to-frozen + worktree-independence proof (D-41 atom 4)

**Wave 5** *(blocked on Wave 4 completion)*

- [x] 139-05-PLAN.md — 97-checkout `fetch-depth: 0` sweep across 16 workflows + 16 `frozen-read-probe` jobs + `paths:` fix, one commit (D-41 atom 5)

**Wave 6** *(blocked on Wave 5 completion)*

- [x] 139-06-PLAN.md — Feature-branch push, 16-workflow dispatch, job-level JSON evidence, owner checkpoint

**Discuss-phase flags**: The exact `lsTreeAtClose()` API shape (return type, error semantics on a missing path, whether it mirrors `readAtClose`'s per-milestone reader-function pattern or takes a SHA parameter directly) is a genuine design fork — not resolved at roadmap.

**Hard constraints**: **[SUCCESS-CRITERION AMENDMENT, D-04]** GOV-01's file allowlist and byte-unchanged gate govern every edit landed across Phases 139–144 (extended from the original 139–143 — Phase 144 makes the milestone's largest frozen-surface edits, the V119 pin, the new v1.20 harness, apex regeneration, and the 17th workflow, and would otherwise be ungoverned), not just this phase's edits — the CARVE recorded here is the milestone-wide contract. Zero-margin hazard, carried from the milestone's own context: both glossaries sit at exactly 90 days against a `>90` freshness test; do not touch either glossary's `last_verified`/`review_by` to satisfy any assertion anywhere in the milestone (explicitly barred — see REQUIREMENTS.md Out of Scope). Without this phase, SWEEP-05 (Phase 140) converts 9 clean two-assertion failures into hard crashes.

### Phase 140: Frozen-Aware Harness Conversion

**Goal**: Each frozen milestone-audit harness v1.4–v1.19 reads its own corpus at its own close SHA instead of live HEAD, resolving the frozen-vs-evolved mismatch class at its root, within budget.
**Depends on**: Phase 139 (needs the `fetch-depth: 0` retrofit so frozen reads execute in CI, the `lsTreeAtClose()` enumeration API so a harness can derive its scope without walking live HEAD, and the governance CARVE authorizing these edits)
**Requirements**: SWEEP-05, SWEEP-06, SWEEP-07, SWEEP-08
**Success Criteria** (what must be TRUE):

  1. **[SUCCESS-CRITERION AMENDMENT, D-13/D-14]** Every `vX.Y-milestone-audit.mjs` harness for v1.4 through v1.18 derives its file scope and reads its content at its own close SHA rather than live HEAD; the v1.19 harness converts in Phase 144, in the same plan as HARN-17's `V119` pin, because `MILESTONE_CLOSE_SHAS` carries no `V119` entry today. In v1.15 through v1.18 the C17 contract-presence `existsSync` guard and the `c17-eee-contract.mjs` subprocess spawn it gates stay on live HEAD — those four harnesses are frozen-aware for every check except C17, which is CARVE Category 3, owned by Phase 143 (LINK-01..06). Proven by re-running each harness and confirming it no longer reports the frozen-vs-evolved C5/C10 60d-vs-90d mismatch (SWEEP-05).
  2. `check-phase-60.mjs`'s subprocess re-run of the converted v1.5 harness completes inside its 60-second timeout, verified by a real measured run across the v1.5 harness's own frozen-enumerated `.md` file scope at its `V15` close SHA (the exact count is measured, not transcribed, and is recorded in Plan 05) (SWEEP-06). Evidence path (D-09): both `check-phase-60.mjs` subprocess spawn sites and all seven `V-NN-AUDIT-HARNESS` blocks are `NESTED`-guarded, so no converted harness ever executes under the apex chain — the apex can neither validate nor detect a broken conversion. Evidence is therefore a direct wall-clock measurement of the harness run plus the specific `V-60-23` result line from a standalone `check-phase-60.mjs --verbose` run, never that validator's overall exit code, which stays non-zero until Phase 141 RED-03 resolves unrelated pre-existing failures.
  3. The v1.4 `TEMPLATE-SENTINEL` assertion (`docs/_templates/admin-template-android.md`'s `last_verified: 1970-01-01 # TEMPLATE-SENTINEL`, present before v1.4 closed) has a named, recorded remedy distinct from frozen-awareness — since `readAtV14Close()` returns byte-identical content and the assertion was never green at v1.4's own close — proven by the C5 check's own `pass: true` after the remedy (SWEEP-07). Reconciliation (D-26): the remedy is a per-file `continue` inside C5's frontmatter parse that suppresses only the sentinel file's violation record — it does not mark the check `skipped`, and C5 still evaluates every other Android doc normally; the same `continue` additionally suppresses a genuinely malformed `review_by` placeholder that template carries at the pin. This is stated explicitly because skip-counts-as-pass is the masking class D-08 refuses elsewhere.
  4. A `V14` entry exists in `_lib/frozen-at-close.mjs` with an explicitly chosen SHA and a recorded rationale for the choice, satisfying the `frozen-at-close.mjs:94-96` pin-gate (SWEEP-08).

**Plans**: 5/5 plans executed

Plans:
**Wave 1**

- [x] 140-01-PLAN.md — Scope amendments (D-14 range, SC#2 evidence path, SC#3 reconciliation) + GOV-02 pre-edit census and baseline

**Wave 2** *(blocked on Wave 1 completion)*

- [x] 140-02-PLAN.md — Batched frozen corpus reader + V14 pin + self-test retarget + v1.4 tracer conversion + SWEEP-07 sentinel backport

**Wave 3** *(blocked on Wave 2 completion)*

- [x] 140-03-PLAN.md — Frozen-aware conversion: v1.4.1, v1.5, v1.6-v1.10

**Wave 4** *(blocked on Wave 3 completion)*

- [x] 140-04-PLAN.md — Frozen-aware conversion: v1.11-v1.14, v1.15-v1.18 (C17 leg excepted)

**Wave 5** *(blocked on Wave 4 completion)*

- [x] 140-05-PLAN.md — SWEEP-06 budget evidence on the non-apex path, coverage deltas, Stop-hook hardening, owner review

**Discuss-phase flags**: The SWEEP-07 remedy for the v1.4 `TEMPLATE-SENTINEL` assertion (a third failure class distinct from both frozen-vs-evolved and archival-path drift) is a genuine design fork, not resolved at roadmap. The `V14` SHA choice between `b5cf529` (commit v1.4 milestone archive files, 22:02:56) and `671f72a` (archive v1.4 phase directories, 22:02:22) — 34 seconds apart and NOT equivalent, the latter predates the ROADMAP/REQUIREMENTS archive commit — is also a genuine fork, not resolved at roadmap.

**Hard constraints**: Corpus edits are authorized but expected near-zero — a corpus edit requires proof the document is wrong, not merely that a frozen assertion disagrees with it (standing project rule). `check-phase-30`/`check-phase-31` are v1.3-era, so the `V14` pin decided here does not serve them (see Phase 142).

### Phase 141: Standalone-RED Validator Set — Chain Members Green

**Goal**: The eight chain-member validators (`check-phase-48`, `-60`, `-61`, `-62` through `-66`) exit 0 standalone, closing the freshness and self-test root causes and the cascade they drive.
**Depends on**: Phase 140 (the freshness leg — RED-01 — is resolved by the frozen-aware harness conversion applied to v1.5–v1.13: at their own close SHAs both glossaries read exactly 60 days and pass, live they read 90 days)
**Requirements**: RED-01, RED-02, RED-03, SWEEP-09
**Success Criteria** (what must be TRUE):

  1. The v1.5–v1.13 C5/C10 freshness assertions pass with zero edits to either glossary's metadata, verified by running each affected harness directly (RED-01 — the true prerequisite for 60, 61, and all five of 62–66, per the MEASURED finding that the self-test alone greens only `check-phase-48`).
  2. `regenerate-supervision-pins.mjs --self-test` exits 0 via a corrected classifier context window (the backward-only scan at `regenerate-supervision-pins.mjs:204-238` misses the iOS token at line 147, two lines after the heading), with the v1.7 fixture byte-unchanged and no classifier relaxation (RED-02).
  3. `check-phase-48.mjs`, `check-phase-60.mjs`, `check-phase-61.mjs`, and `check-phase-62.mjs` through `check-phase-66.mjs` each exit 0 when invoked standalone (not nested), proven by 8 independent direct invocations, with the cascade classes (48→60→61→62..66's own `CHAIN-*` sub-checks) confirmed cleared as a consequence rather than patched individually (RED-03).
  4. **[NEW REQUIREMENT, D-33]** The remaining silent-swallow frozen-read sites — beyond the 4 SWEEP-03 already fixed in Phase 139 — fail loud, scoped to the ~19 validators already open for RED-03 in this phase (SWEEP-09).

**Plans**: TBD

**Discuss-phase flags**: None dominant — RED-02's method is already ruled (classifier context-window investigation, per path D-12; editing `v1.7-audit-allowlist.json` or relaxing the classifier's thresholds is barred).

**Hard constraints**: `check-phase-61.mjs` alone carries three of the four root-cause classes (self-test, freshness, cascade) — fixing RED-01+RED-02 does not by itself clear 62–66's `CHAIN-*` legs; those clear only once 48/60/61 are each independently green. Class (d) — the pre-chain content drift in `check-phase-30`/`check-phase-31` — is structurally independent of this phase's fixes and is NOT addressed here (see Phase 142); a plan that "fixes" only this phase's scope will still find 30 and 31 red.

### Phase 142: Archival-Path Fix, Chain Adoption & Cold-Clone Threshold

**Goal**: `check-phase-30`/`check-phase-31` exit 0 standalone and become real, enforced members of the apex chain with `check-phase-68`'s regression guard intact, and the chain-apex's cold-clone cost carries a measured, falsifiable threshold.
**Depends on**: Phase 141 (this phase's `check-phase-31.mjs` edit is regression-guarded by `check-phase-68.mjs`, which is already inside the chain that Phase 141 greened; sequencing after the chain-member cascade is resolved avoids compounding two independent red classes in one diagnosis)
**Requirements**: RED-04, RED-05, RED-06, RED-07, NEST-01
**Success Criteria** (what must be TRUE):

  1. `check-phase-30.mjs` exits 0 standalone — both the Mermaid-conversion-driven "0 decision-diamond nodes" assertion and the `l1-template.md` `"Windows | macOS | iOS | all"` literal mismatch resolved (RED-04).
  2. `check-phase-31.mjs` exits 0 standalone, including `V-31-23` resolved via `resolveArchivedPhasePath(..., ['v1.3-phases'])` (the pattern already used at `check-phase-31.mjs:33`, not a corpus read), plus `V-31-25` and `V-31-29` (RED-05).
  3. `check-phase-30` and `check-phase-31` are members of the apex's `CHAIN_PHASES` array and execute under it, proven by an apex run showing both firing (not absent), at a measured cost of roughly +0.35s on a ~17s apex run under the `CHECK_PHASE_NESTED` guard (RED-06).
  4. `check-phase-68.mjs`'s `V-68-04` (check-phase-31 remains one of the `archive-path` helper's 5 import call-sites) and `V-68-08` (the `_missing` discriminator marker) both still pass after the check-phase-31 edit (RED-07).
  5. Cold-clone apex cost is measured on Windows with a stated method (clone depth, cache state, Defender state, runner) and a recorded pass/fail threshold plus an explicit "if over threshold then mechanism X" rule — distinct from, and not re-collapsed with, the healthy within-apex curve (~17s, 93 PASS/0 FAIL/0 SKIPPED at HEAD) (NEST-01).

**Plans**: TBD

**Discuss-phase flags**: Whether RED-04/RED-05 need a separate v1.3 pin (since `check-phase-30`/`check-phase-31` are v1.3-era and the `V14` pin from Phase 140 does not serve them) is a genuine design fork, not resolved at roadmap. The NEST-01 pass/fail threshold value is also not resolved at roadmap.

**Hard constraints**: `check-phase-68.mjs:97-115` (`V-68-04`) and `:166-176` (`V-68-08`) are in every apex chain — breaking either converts a scoped-red orphan into an apex chain failure; grep both call-sites before editing `check-phase-31.mjs`.

### Phase 143: Link Coverage & Fence-Mask Unification

**Goal**: The corpus has durable, enforced relative-link and anchor coverage with zero accepted-violation baseline, and fence-masking behaves identically across all 15 call sites in 9 files.
**Depends on**: Phase 139 (the governance CARVE covers the nine Pillar-C files this phase touches); no technical dependency on Phases 140–142's chain-validator work — sequenced after per the project's `use_worktrees:false` sequential-on-main-tree convention, not a hard blocking requirement
**Requirements**: LINK-01, LINK-02, LINK-03, LINK-04, LINK-05, LINK-06
**Success Criteria** (what must be TRUE):

  1. `computeAnchorSetFromContent` recognises HTML `<a id="…">` anchors, proven by anchor failures dropping from the measured 271 to the measured 70 (LINK-01 — must land before LINK-02/04, since 201 of 271 (74%) are model gaps, not real breaks).
  2. A corpus-wide checker validates every relative link and anchor across `docs/` (excluding `docs/_templates/`, masking inline code spans) and exits 0 with no accepted-violation baseline of any kind (LINK-02, LINK-04).
  3. All 13 genuine broken links (11 `../` over-escapes in `docs/_glossary-macos.md`, 2 in `docs/admin-setup-ios/`) are fixed, verified by the checker re-run finding zero remaining genuine breaks (LINK-03).
  4. Fence-mask behavior is unified across all 15 call sites in the 9 named files, including both c17 sites (`:158` opening, `:166` closing), covering the measured 74 fences indented 1–3 spaces across 11 files via a `^ {0,3}` CommonMark-equivalent rule (LINK-05).
  5. c17 reports identical file and violation counts before and after the fence-mask change, and a sampled check of the newly-masked lines confirms none hides a suppressed violation (LINK-06).

**Plans**: TBD

**Discuss-phase flags**: None dominant — LINK-01's precedence over LINK-02/LINK-04 and LINK-04's no-baseline rule are already settled by the requirement text itself.

**Hard constraints**: LINK-01 must precede LINK-02 and LINK-04 — running the corpus-wide checker before the anchor model is complete would freeze 201 of 271 anchor failures as a false, permanently-accepted baseline, the exact disposition class this milestone exists to delete. LINK-06 must land in the same phase as LINK-05 (it is the before/after regression gate on that exact change) — both are satisfied together here. `scripts/pipeline/convert.ps1`'s fence mask governs only the D-03(a) nav-footer rewrite on an ephemeral temp copy, not `.docx` code-block rendering (pandoc decides that) — its unification is hygiene, not correctness.

### Phase 144: V119 Pin + 18th Path-A Lineage Bump + Terminal Close

**Goal**: The milestone closes with the mandatory V119 back-anchor pin, the 18th harness lineage bump, and a 3-axis re-audit with all 17 integrity workflows dispatched green — the sole deliverable cluster of this phase, per project convention.
**Depends on**: Phase 139, Phase 140, Phase 141, Phase 142, Phase 143 (ALL other v1.20 phases must be complete and green — harness close never batches with other work, mirrors Phase 100/112/119/125/128/134/138 exactly)
**Requirements**: HARN-17, HARN-18, HARN-19
**Success Criteria** (what must be TRUE):

  1. `_lib/frozen-at-close.mjs` gains the **V119** entry (`a7bda73e23efc5e3f9607c3fef37abf8ec4030aa`, positively re-confirmed via the subject-line pair discriminator, count=1 — never the naive dual-token `--grep --all-match` form) + `readAtV119Close` export (HARN-17).
  2. `v1.20-milestone-audit.mjs` (Path-A from v1.19, C1-C17 inherited) + `v1.20-audit-allowlist.json` + BASELINE_24 + `check-phase-139..NN.mjs` validators exist and pass, with the apex's `CHAIN_PHASES` array generated by arithmetic (never transcribed) and accounting for RED-06's addition of `check-phase-30`/`check-phase-31` to the chain, plus the 17th CI coexistence workflow born with `fetch-depth: 0` (HARN-18).
  3. A 3-axis terminal re-audit (fresh `git clone --no-hardlinks` + cross-OS Linux GHA authoritative for both chain validators + fresh zero-context reproduction) achieves cross-OS PASS/FAIL/SKIP EXACT MATCH, and all 17 `audit-harness-*` integrity workflows are dispatched (`gh workflow run --ref master`, since a push fires nothing) and confirmed green from job-level JSON, not the checks-UI colour (HARN-19).
  4. The publish bundle regenerates `--version=v1.20`, and a single close-gate commit flips all **28** v1.20 requirements (27 original + `SWEEP-09`, added per D-33) to Validated across PROJECT/ROADMAP/STATE/REQUIREMENTS — with `ACCEPTED-STANDALONE-CI-RED` and `ACCEPTED-SCOPED-RED` **deleted** from the backlog rather than carried a seventh milestone, discharging the milestone bar stated in REQUIREMENTS.md (HARN-19).

**Plans**: TBD

**Discuss-phase flags**: None (closing cluster; consumes prior decisions).

**Hard constraints**: BLOCKED on Phases 139–143 all being complete and green — mirrors every prior harness-close phase exactly (100/112/119/125/128/134/138). Workflows fire on `pull_request` + `schedule` + `workflow_dispatch` only — a push to `master` fires nothing; Axis-2 needs an explicit `gh workflow run --ref master` per workflow, and CI must never be read while the remote is behind. A "green" run is compatible with a cron-skipped quarterly job and a `continue-on-error: true` advisory job, so evidence must be job-level JSON.

## Progress

| Milestone | Phases | Status | Shipped |
|-----------|--------|--------|---------|
| v1.0 Autopilot Documentation & Troubleshooting Guides | 1-10 | ✅ Shipped | 2026-04-10 |
| v1.1 APv2 Documentation & Admin Setup Guides | 11-19 | ✅ Shipped | 2026-04-13 |
| v1.2 Cross-Platform Provisioning & Operational Gaps | 20-25 | ✅ Shipped | 2026-04-15 |
| v1.3 iOS/iPadOS Provisioning Documentation | 26-33 | ✅ Shipped | 2026-04-19 |
| v1.4 Android Enterprise Enrollment Documentation | 34-42 | ✅ Shipped | 2026-04-24 |
| v1.4.1 Android Enterprise Completion & v1.4 Cleanup | 43-47 | ✅ Shipped | 2026-04-25 |
| v1.5 Linux Platform, Operational Depth & Cross-Platform Cleanup | 48-61 | ✅ Shipped | 2026-05-07 |
| v1.6 Apple Business Delegated Governance & Multi-Org Operations | 62-66 | ✅ Shipped | 2026-05-25 |
| v1.7 Deferred Backlog Closure + Validator Chain Hardening | 67-70 | ✅ Shipped | 2026-05-29 |
| v1.8 Tooling Debt Closure + Chain-Resilience Hardening | 71-74 | ✅ Shipped | 2026-06-08 |
| v1.9 macOS Platform SSO & Secure Enclave Authentication Documentation | 75-82 | ✅ Shipped | 2026-06-22 |
| v1.10 macOS Platform SSO Follow-ons — Kerberos, Graph API & NUAL | 83-88 | ✅ Shipped | 2026-06-24 |
| v1.11 macOS PSSO End-to-End Provisioning & MDM Migration | 89-93 | ✅ Shipped | 2026-06-26 |
| v1.12 macOS MDM-Migration Verification Closure | 94-95 | ✅ Shipped | 2026-06-26 |
| v1.13 macOS Platform SSO Admin-Setup Documentation Accuracy & Depth | 96-100 | ✅ Shipped | 2026-06-29 |
| v1.14 802.1X Network Authentication Documentation + Backlog & Tooling Closure | 101-112 | ✅ Shipped | 2026-07-02 |
| v1.15 EEE SOP Documentation-Standard Retrofit (Phase-1) | 113-119 | ✅ Shipped | 2026-07-06 |
| v1.16 EEE SOP Documentation-Standard Retrofit (Phase-2) + Pipeline/Structural Shelf-Clearing | 120-125 | ✅ Shipped | 2026-07-10 |
| v1.17 Docs-Library .docx Publish-Bundle Pipeline (SharePoint / Copilot Upload Automation) | 126-128 | ✅ Shipped | 2026-07-11 |
| v1.18 Device Configuration Recipes (AVD Shared Windows + Shared iPad) & Chain-Validator Debt Closure | 129-134 | ✅ Shipped | 2026-07-20 |
| v1.19 Device Configuration Recipes #3 & #4 (Windows Multi-App Kiosk + Android Dedicated) | 135-138 | ✅ Shipped | 2026-08-04 |
| v1.20 Frozen-Aware CI Remediation & Chain-Validator Debt Closure | 139-144 | 🚧 In Progress | - |

| Phase | Milestone | Plans Complete | Status | Completed |
|-------|-----------|----------------|--------|-----------|
| 135. Recipe #3 — Windows 11 Multi-App Kiosk | v1.19 | 2/2 | Complete | 2026-08-02 |
| 136. Recipe #4 — Android Dedicated MHS Multi-App | v1.19 | 2/2 | Complete | 2026-08-03 |
| 137. Integration & Navigation-Last Close | v1.19 | 2/2 | Complete | 2026-08-03 |
| 138. V118 Pin + 17th Path-A Lineage Bump + Terminal Close | v1.19 | 6/6 | Complete | 2026-08-04 |
| 139. Governance CARVE + fetch-depth Retrofit + Shallow-Job Repair | v1.20 | 6/6 | Complete | 2026-08-05 |
| 140. Frozen-Aware Harness Conversion | v1.20 | 0/TBD | Not started | - |
| 141. Standalone-RED Validator Set — Chain Members Green | v1.20 | 0/TBD | Not started | - |
| 142. Archival-Path Fix, Chain Adoption & Cold-Clone Threshold | v1.20 | 0/TBD | Not started | - |
| 143. Link Coverage & Fence-Mask Unification | v1.20 | 0/TBD | Not started | - |
| 144. V119 Pin + 18th Path-A Lineage Bump + Terminal Close | v1.20 | 0/TBD | Not started | - |
