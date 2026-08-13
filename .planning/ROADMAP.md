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
- [x] **Phase 140: Frozen-Aware Harness Conversion** - v1.4–v1.18 milestone-audit harnesses converted to read their own close-SHA corpus instead of live HEAD (v1.19 converts in Phase 144 with the V119 pin; the C17 live-HEAD leg in v1.15–v1.18 stays unconverted, owned by Phase 143), within the check-phase-60 60-second subprocess budget (completed 2026-08-07)
- [x] **Phase 141: Standalone-RED Validator Set — Chain Members Green** - check-phase-48/60/61/62-66 exit 0 standalone; freshness, self-test classifier, and cascade root causes closed; first-ever CI fan-out dispatched at one shared SHA, all 41 jobs green (completed 2026-08-09)
- [x] **Phase 142: Archival-Path Fix, Chain Adoption & Cold-Clone Threshold** - check-phase-30/31 fixed and adopted into the apex chain; cold-clone apex cost gets a falsifiable threshold (completed 2026-08-10)
- [x] **Phase 143: Link Coverage & Fence-Mask Unification** - corpus-wide relative-link + anchor checker green with zero accepted-violation baseline; fence-masking unified across all 15 call sites (completed 2026-08-11)
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

  1. The v1.5–v1.13 C5/C10 freshness assertions pass with zero edits to either glossary's metadata, verified by running each affected harness directly (RED-01 — the true prerequisite for 60, 61, and all five of 62–66, per the MEASURED finding that the self-test alone greens only `check-phase-48`). **[DISCHARGED, D-29]** Confirmed satisfied, not falsified: this phase's own Depends-on line above already predicted RED-01's discharge by Phase 140, and the self-test now greens all eight validators precisely because RED-01 cleared first, in the ratified order — the ordering this criterion encodes was correct.
  2. `regenerate-supervision-pins.mjs --self-test` exits 0 via a corrected classifier context window (the backward-only scan at `regenerate-supervision-pins.mjs:204-238` misses the iOS token at line 147, two lines after the heading), with the v1.7 fixture byte-unchanged and no classifier relaxation (RED-02). **[SUCCESS-CRITERION AMENDMENT, D-28]** The classifier-context-window mechanism above is WITHDRAWN (D-03) for two independent reasons: Phase 48 D-14 already accepted the Tier-2 classifier output for that line, and the classifier scans only `androidDocPaths()` = 32 files / 26 occurrence lines, so all tested window variants are behaviourally identical at 26/0. The amended criterion: `regenerate-supervision-pins.mjs --self-test` exits 0 via a rebase of the stale `BASELINE_9` coordinate array (`regenerate-supervision-pins.mjs:533-543`) to its live descendants, with `classify()` byte-unchanged, `v1.7-audit-allowlist.json` byte-unchanged, and no classifier relaxation (RED-02). The withdrawal rests on a reproduction executed four times independently (Finder, Adversary, Referee, orchestrator).
  3. `check-phase-48.mjs`, `check-phase-60.mjs`, `check-phase-61.mjs`, and `check-phase-62.mjs` through `check-phase-66.mjs` each exit 0 when invoked standalone (not nested), proven by 8 independent direct invocations, with the cascade classes (48→60→61→62..66's own `CHAIN-*` sub-checks) confirmed cleared as a consequence rather than patched individually (RED-03).
  4. **[NEW REQUIREMENT, D-33]** The remaining silent-swallow frozen-read sites — beyond the 4 SWEEP-03 already fixed in Phase 139 — fail loud, scoped to the ~19 validators already open for RED-03 in this phase (SWEEP-09). **[SUCCESS-CRITERION AMENDMENT, D-28]** Corrected census on the requirement's own unit — reader SITES, not validators: 19 `chicken-and-egg` return sites measured (`check-phase-67.mjs` 7, `check-phase-68.mjs` 2, `check-phase-70.mjs` 10) plus `check-phase-61.mjs:39-45`'s inline reader. Phase 141 lands 13 of them (61's 1, 68's 2, 70's 10); `check-phase-67.mjs`'s 7 defer to Phase 144, with its CARVE amendment landing in Phase 141 (D-11/D-12).

**Plans**: 6/6 plans executed

Plans:

- [x] 141-01-PLAN.md — Governance gate: six D-28 document amendments (alone, first) + the D-12 CARVE amendment adding `check-phase-67.mjs`
- [x] 141-02-PLAN.md — TRACER: rebase the stale `BASELINE_9` array, `--self-test` exits 0, `check-phase-48` exits 0 standalone (RED-02)
- [x] 141-03-PLAN.md — SWEEP-09: thirteen frozen-read sites fail loud (61 delegation + 68/70 call-sites) proven by a `file://` shallow-clone harness
- [x] 141-04-PLAN.md — Timeout root causes: raise the two chain-spawn caps, `if: always()` on 29 fan-out jobs, raise the four exposed CI job caps
- [x] 141-05-PLAN.md — Evidence: nine harnesses (RED-01) + eight ascending quiesced standalone runs and one verbose composition run (RED-03)
- [x] 141-06-PLAN.md — First-ever CI fan-out: push, dispatch at one shared SHA, triage every job, flip four requirements to Complete — all 41 jobs green (2 legitimate schedule-guard skips), zero content/timeout/environment reds

**Discuss-phase flags**: **[SUCCESS-CRITERION AMENDMENT, D-28]** Corrected — RED-02's root cause and SWEEP-09's scope were both live forks requiring owner ratification, resolved 2026-08-07 by `/grill-me` plus a scored `/adversarial-review` that reversed three headline recommendations. Superseded original text: "None dominant — RED-02's method is already ruled (classifier context-window investigation, per path D-12; editing `v1.7-audit-allowlist.json` or relaxing the classifier's thresholds is barred)."

**Hard constraints**: `check-phase-61.mjs` alone carries three of the four root-cause classes (self-test, freshness, cascade) — fixing RED-01+RED-02 does not by itself clear 62–66's `CHAIN-*` legs; those clear only once 48/60/61 are each independently green. Class (d) — the pre-chain content drift in `check-phase-30`/`check-phase-31` — is structurally independent of this phase's fixes and is NOT addressed here (see Phase 142); a plan that "fixes" only this phase's scope will still find 30 and 31 red.

### Phase 142: Archival-Path Fix, Chain Adoption & Cold-Clone Threshold

**Goal**: `check-phase-30`/`check-phase-31` exit 0 standalone and become real, enforced members of the apex chain with `check-phase-68`'s regression guard intact, and the chain-apex's cold-clone cost carries a measured, falsifiable threshold.
**Depends on**: Phase 141 (this phase's `check-phase-31.mjs` edit is regression-guarded by `check-phase-68.mjs`, which is already inside the chain that Phase 141 greened; sequencing after the chain-member cascade is resolved avoids compounding two independent red classes in one diagnosis)
**Requirements**: RED-04, RED-05, RED-06, RED-07, NEST-01
**Success Criteria** (what must be TRUE):

  1. **[SUCCESS-CRITERION AMENDMENT, D-35]** Extended to name a THIRD defect: `V-30-02`'s regular expression is built from a double-quoted JS string, so its intended any-character class `[\s\S]` collapses to the two-letter character class `[sS]` and the captured Mermaid-block text has always been empty — the check has never inspected a Mermaid block since Phase 30 and sits in the passing column today, invisible to any run-and-count method. The amendment authorizes the regex fix; it does not replace the two defects already named below. Per D-33's honesty obligation: the `l1-template.md` `"Windows | macOS | iOS | all"` literal named below is UNRESTORABLE as written — the corpus moved deliberately under Phase 40-01 (`600eabd6`, Android added to the platform enum) and restoring the pre-Android literal is barred by D-01 (zero corpus edits); the successor assertion targets the current author-guidance enum line instead. `check-phase-30.mjs` exits 0 standalone — both the Mermaid-conversion-driven "0 decision-diamond nodes" assertion and the `l1-template.md` `"Windows | macOS | iOS | all"` literal mismatch resolved (RED-04).
  2. **[SUCCESS-CRITERION AMENDMENT, D-20]** ADDITIVE, not a replacement: `resolveArchivedPhasePath(..., ['v1.3-phases'])` alone is insufficient for `V-31-23` — the resolver works, but the D-23 target prose line moved from 182 to 259 under `### iOS-Specific Timing Considerations`, so a path-only fix merely changes the failure message. The amended mechanism is the resolver for the FIXTURE plus a presence-only content anchor for the TARGET (D-21 — presence, never uniqueness, because `06-compliance-policy.md` is EEE-enrolled and a future Summary retrofit would re-break an exactly-once clause). D-22 ruling recorded here: the prose is byte-identical and unmoved in substance, only relocated by the Phase-122 reorganization, so the current location DOES satisfy the D-23 intent — the same later-ratified-decision supersession class as V-30-01/V-30-10. **[SUCCESS-CRITERION AMENDMENT, D-24]** `V-31-29`'s instrument is corrected to `wc -l` (which `31-VALIDATION.md:69` mandates and the code implemented one line high) plus a re-derived documented target band for runbook 14; bound-widening alone and a per-runbook exemption are both rejected. `check-phase-31.mjs` exits 0 standalone, including `V-31-23` resolved via `resolveArchivedPhasePath(..., ['v1.3-phases'])` (the pattern already used at `check-phase-31.mjs:33`, not a corpus read), plus `V-31-25` and `V-31-29` (RED-05).
  3. **[DISCHARGED, D-15]** The roughly +0.35s on a ~17s apex run figure below is CORRECT — four independent measurement sessions reproduced 15.9-18.7s wall-clock at 93/0/0, and the marginal chain-adoption cost measured by splicing was +220ms and +283ms; `141-EVIDENCE.md:276-281` (Phase 141 mandatory statement 2) explicitly grandfathers this figure. Not amended, only discharged as satisfied — D-15 forbids changing the numbers. **[SUCCESS-CRITERION AMENDMENT, D-11]** The mechanism changes: SC#3 as originally written below says check-phase-30/31 become "members of the apex's `CHAIN_PHASES` array"; per D-11 the actual mechanism is a hand-authored `CHAIN_EXTRA = [30, 31]` sidecar concatenated into the apex's check loop and deliberately EXCLUDED from `CHAIN_PHASES` and its three module-load span invariants (dedup/length/termini), because HARN-18 and PROJECT.md's D-25 correction require the span array stay generated by arithmetic and never transcribed. Chain membership is therefore satisfied by the apex's executed-chain set (the arithmetic span plus the `CHAIN_EXTRA` sidecar), not by mutating the span. Extending the span to include 30 is not impossible but wrong in a specific way: with `CHAIN_START=30, CHAIN_END=137` the dedup guard passes and only the length guard throws (`!== 90`), and a co-rebased constant set yields 16 deterministic FAILs for the absent phases 32-47. `check-phase-30` and `check-phase-31` are members of the apex's `CHAIN_PHASES` array and execute under it, proven by an apex run showing both firing (not absent), at a measured cost of roughly +0.35s on a ~17s apex run under the `CHECK_PHASE_NESTED` guard (RED-06).
  4. `check-phase-68.mjs`'s `V-68-04` (check-phase-31 remains one of the `archive-path` helper's 5 import call-sites) and `V-68-08` (the `_missing` discriminator marker) both still pass after the check-phase-31 edit (RED-07).
  5. **[DISCHARGED, D-15]** The `~17s` within-apex reference figure below is CORRECT and grandfathered by `141-EVIDENCE.md:276-281` — not amended, only discharged as satisfied. **[SUCCESS-CRITERION AMENDMENT, D-27]** Restoring all four named method elements: clone depth (full / `fetch-depth: 0` is the ONLY admissible value — a depth-1 clone fatals `readAtClose()` per SWEEP-01), cache state, Defender state, and runner — plus tree identity and an explicit `--verbose`-or-not declaration as additional declared variables. **[SUCCESS-CRITERION AMENDMENT, D-28]** The threshold is fixed as a RATIO at 8x or greater against a declared same-tree same-session warm median at n of 3 or more; the absolute "50% of the 30-minute CI cap" leg is DROPPED — it binds a Windows measurement to a Linux job cap on a runner class that does not exist (all CI jobs are `ubuntu-latest`). **[SUCCESS-CRITERION AMENDMENT, D-29]** Mechanism X is two-tier: in-phase advisory per-child marginal-cost publication, plus a structural tier attributed to CARVE-1/SWEEP-01 and explicitly NOT double-booked into Phase 142; the timeout-raise leg is withdrawn because a timeout raise moves zero wall-clock cost and can never satisfy a cost threshold. Per D-30 the disposition is Advisory and does not breach the milestone bar, since the two dispositions the bar requires deleting (`ACCEPTED-STANDALONE-CI-RED`, `ACCEPTED-SCOPED-RED`) are named elsewhere and this item is neither. Cold-clone apex cost is measured on Windows with a stated method (clone depth, cache state, Defender state, runner) and a recorded pass/fail threshold plus an explicit "if over threshold then mechanism X" rule — distinct from, and not re-collapsed with, the healthy within-apex curve (~17s, 93 PASS/0 FAIL/0 SKIPPED at HEAD) (NEST-01).

**Plans**: 6/6 plans executed

Plans:
**Wave 1**

- [x] 142-01-PLAN.md — Commit 1: success-criterion amendments across ROADMAP/REQUIREMENTS/PROJECT/STATE + the archived band spec, and all twelve deferrals routed to `v1.20-DEFERRED-CLEANUP.md`

**Wave 2** *(blocked on Wave 1 completion)*

- [x] 142-02-PLAN.md — Commit 2: CARVE amendment, alone — `check-phase-138.mjs` onto Category 5 + the Phase-141 D-27/D-28 back-fill

**Wave 3** *(blocked on Wave 2 completion)*

- [x] 142-03-PLAN.md — `check-phase-30.mjs` exits 0 standalone: V-30-01, V-30-02 and V-30-10 successors plus the external-tool classifier arm (RED-04)

**Wave 4** *(blocked on Wave 3 completion)*

- [x] 142-04-PLAN.md — `check-phase-31.mjs` exits 0 standalone: V-31-23, V-31-25 and V-31-29 successors, with `check-phase-68`'s guards unchanged (RED-05, RED-07)

**Wave 5** *(blocked on Wave 4 completion)*

- [x] 142-05-PLAN.md — Chain adoption, last: `CHAIN_EXTRA` sidecar spliced into the apex loop, 95/0/0 (RED-06)

**Wave 6** *(blocked on Wave 5 completion)*

- [x] 142-06-PLAN.md — Cold-clone measurement, ratio threshold and two-tier mechanism X in `142-EVIDENCE.md` (NEST-01)

**Cross-cutting constraints:**

- `git status --porcelain docs/` prints nothing — zero corpus edits

**Discuss-phase flags**: **[SUCCESS-CRITERION AMENDMENT, D-02]** Corrected — both forks below are now resolved, 2026-08-10, by `/grill-me` plus a scored `/adversarial-review`. The separate v1.3 pin is REJECTED: it is mechanically feasible (all three assertions pass at tag v1.3 and the close-SHA map is an unordered literal, so the key insertion carries no collision) but a pin against an immutable corpus is permanently true by construction — the exact class this milestone exists to delete. Per D-03 the "barred three times over" argument is WITHDRAWN because two of its three legs are false; only the honest vacuity argument stands. The NEST-01 threshold is resolved at the D-28 ratio (≥8x a declared same-tree same-session warm median, n≥3). Superseded original text: "Whether RED-04/RED-05 need a separate v1.3 pin (since `check-phase-30`/`check-phase-31` are v1.3-era and the `V14` pin from Phase 140 does not serve them) is a genuine design fork, not resolved at roadmap. The NEST-01 pass/fail threshold value is also not resolved at roadmap."

**Hard constraints**: `check-phase-68.mjs:97-115` (`V-68-04`) and `:166-176` (`V-68-08`) are in every apex chain — breaking either converts a scoped-red orphan into an apex chain failure; grep both call-sites before editing `check-phase-31.mjs`.

### Phase 143: Link Coverage & Fence-Mask Unification

**Goal**: The corpus has durable, enforced relative-link and anchor coverage with zero accepted-violation baseline, and fence-masking behaves identically across all 15 call sites in 9 files. **[SUCCESS-CRITERION AMENDMENT, D-29]** "Zero accepted-violation baseline" now includes the 65 links that were checker-green and GitHub-broken under the Pandoc anchor model (D-01), which the original goal wording could not have named.
**Depends on**: Phase 139 (the governance CARVE covers the nine Pillar-C files this phase touches); no technical dependency on Phases 140–142's chain-validator work — sequenced after per the project's `use_worktrees:false` sequential-on-main-tree convention, not a hard blocking requirement
**Requirements**: LINK-01, LINK-02, LINK-03, LINK-04, LINK-05, LINK-06
**Success Criteria** (what must be TRUE):

  1. `computeAnchorSetFromContent` recognises HTML `<a id="…">` anchors, proven by anchor failures dropping from the measured 271 to the measured 70 (LINK-01 — must land before LINK-02/04, since 201 of 271 (74%) are model gaps, not real breaks). **[SUCCESS-CRITERION AMENDMENT, D-29]** The `271 → 70` pair above is the discarded **prototype scope** (`docs/_templates/` included, inline masking off) — under D-14's ordering no state of the shipped checker ever emits 271 or 70. The deliverable pair is `268 → 67 → 132` (`docs/_templates/` excluded, inline masking on; Pandoc `{#id}` model, then GitHub model) — the pair a verifier must re-derive SC#1 against. LINK-01 is also amended from an addition-only change to a net DELETION of the Pandoc `{#id}` override-suppression behavior plus an ADDITION of `<a id>` recognition.
  2. A corpus-wide checker validates every relative link and anchor across `docs/` (excluding `docs/_templates/`, masking inline code spans) and exits 0 with no accepted-violation baseline of any kind (LINK-02, LINK-04). **[SUCCESS-CRITERION AMENDMENT, D-29]** The corpus-wide scope is 274 files / 6252 relative links after excluding the 8 files under `docs/_templates/` (282 total `.md` files in `docs/` at HEAD). "No accepted-violation baseline of any kind" is discharged by the absence of any baseline/allowlist/ratchet artifact of any kind, not by a zero count alone.
  3. All 13 genuine broken links (11 `../` over-escapes in `docs/_glossary-macos.md`, 2 in `docs/admin-setup-ios/`) are fixed, verified by the checker re-run finding zero remaining genuine breaks (LINK-03). **[SUCCESS-CRITERION AMENDMENT, D-29]** Amended to the two populations LINK-03 actually covers: the 13 broken **file targets** above plus **132** broken **anchors** across 77 distinct (target-file, fragment) pairs. D-38 (OWNER RULING) converts all 87 `{#id}` overrides across 29 files to `<a id>` anchors, closing **65** of the 132 anchor links / **26** of the 77 pairs target-side in one mechanical edit, leaving **67** links / **51** pairs for D-04's per-class routing. D-38 SUPERSEDES D-04's source-side routing for those 26 pairs — it does not weaken D-04, it delivers the same links via the target-side branch D-04 already sanctions — and the conversion is measured to introduce **zero** regressions (no link anywhere in the corpus currently resolves *because* a heading's slug is inflated by its own `{#…}` text).
  4. Fence-mask behavior is unified across all 15 call sites in the 9 named files, including both c17 sites (`:158` opening, `:166` closing), covering the measured 74 fences indented 1–3 spaces across 11 files via a `^ {0,3}` CommonMark-equivalent rule (LINK-05).
  5. c17 reports identical file and violation counts before and after the fence-mask change, and a sampled check of the newly-masked lines confirms none hides a suppressed violation (LINK-06).

**Plans**: 9/9 plans complete

Plans:

**Wave 1**

- [x] 143-01-PLAN.md — Governance gate: D-29's seven-surface SC amendment (alone, first) + the CARVE Category-10 amendment enumerating 63 corpus paths (D-31 steps 1 and 2, D-38)

**Wave 2** *(blocked on Wave 1)*

- [x] 143-02-PLAN.md — Record D-38 (owner ruling discharging D-01's one-way gate), then TRACER: the GitHub anchor model end-to-end on one real path, plus `docs/_templates/` exclusion and inline-code masking (D-14 steps 1-3)

**Wave 3** *(blocked on Wave 2)*

- [x] 143-09-PLAN.md — D-38: convert all 87 `{#id}` overrides across 29 files to own-line `<a id>` anchors; closes 65 links target-side, 143 -> 78

**Wave 4** *(blocked on Wave 3)*

- [x] 143-03-PLAN.md — LINK-03's 13 `../` over-escaped file targets + the Class-D de-anchor set (D-04/D-06)

**Wave 5** *(blocked on Wave 4)*

- [x] 143-04-PLAN.md — The D-05 disjoint precedence rule + Class-C target-side `<a id>` anchors, error-code family plus the two registry-path rows

**Wave 6** *(blocked on Wave 5)*

- [x] 143-05-PLAN.md — Class-B source-side rewrites to true GitHub slugs; dry-run reaches zero

**Wave 7** *(blocked on Wave 6)*

- [x] 143-06-PLAN.md — The corpus flip: delete `:259` + `:269` (D-12), preserve the hub-existence hard-fail (D-13), LINK-04 no-baseline discharge

**Wave 8** *(blocked on Wave 7)*

- [x] 143-07-PLAN.md — LINK-05 fence unification across all 15 sites + LINK-06's four evidence legs

**Wave 9** *(blocked on Wave 8)*

- [x] 143-08-PLAN.md — Hand-off: the `check-phase-143.mjs` needle-spec (D-23), the D-26 deferred-cleanup row, `FENCE-AXIS-02`, and the enforcement-gap record

**Discuss-phase flags**: **[SUCCESS-CRITERION AMENDMENT, D-28]** The original claim below is FALSE and is amended. LINK-01's precedence and LINK-04's no-baseline rule *are* settled by the requirement text — but no requirement, success criterion or CARVE category addressed the **145 genuine breaks** (13 file targets + 132 anchors) that LINK-04 requires be cleared with no baseline, of which **65** were invisible to the checker entirely because `computeAnchorSetFromContent` models Pandoc `{#id}` semantics against a GitHub-rendered corpus (D-01, OWNER-RATIFIED). Superseded original text: "None dominant — LINK-01's precedence over LINK-02/LINK-04 and LINK-04's no-baseline rule are already settled by the requirement text itself." **[SUCCESS-CRITERION AMENDMENT, D-29]** This line is amendment surface (7) of D-29's seven-surface enumeration (`143-CONTEXT.md` D-29) — recorded here to align with the other six surfaces landed together in Plan 143-01 Task 1; the D-28 diagnosis above is unchanged.

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

**Plans**: 5/12 plans executed

Plans:
**Wave 1**

- [x] 144-01-PLAN.md — CARVE allowlist amendment (alone, first; ten literal paths)

**Wave 2** *(blocked on Wave 1 completion)*

- [x] 144-02-PLAN.md — TRACER: V119 pin + `readAtV119Close` + v1.19 harness frozen-aware conversion + SWEEP-06 measurement

**Wave 3** *(blocked on Wave 2 completion)*

- [x] 144-03-PLAN.md — `check-phase-67.mjs` ten fail-loud sites (7 returns + 3 accumulators) behind a GOV-02 census row
- [x] 144-04-PLAN.md — lightweight leaves `check-phase-139/140/141.mjs`
- [x] 144-05-PLAN.md — lightweight leaves `check-phase-142/143.mjs` (needle-spec implemented, corpus invariant declined)

**Wave 4** *(blocked on Wave 3 completion)*

- [ ] 144-06-PLAN.md — 18th Path-A harness + `v1.20-audit-allowlist.json` + BASELINE_24 + pin-drift adjudication

**Wave 5** *(blocked on Wave 4 completion)*

- [ ] 144-07-PLAN.md — apex `check-phase-144.mjs` `[48..143]`, four module-load guards, literal archive-root token

**Wave 6** *(blocked on Wave 5 completion)*

- [ ] 144-08-PLAN.md — 17th CI coexistence workflow (born `fetch-depth: 0`) + both stale-figure corrections

**Wave 7** *(blocked on Wave 6 completion)*

- [ ] 144-09-PLAN.md — pre-push readiness census + OWNER checkpoint (push, dispatch, atom-branch disposition)

**Wave 8** *(blocked on Wave 7 completion)*

- [ ] 144-10-PLAN.md — job-level evidence for all 17 runs at one shared SHA + Axis-1 + Axis-3 + human verify

**Wave 9** *(blocked on Wave 8 completion)*

- [ ] 144-11-PLAN.md — `v1.20-MILESTONE-AUDIT.md` + deferred-cleanup absorb-and-append (Part A/B/C)

**Wave 10** *(blocked on Wave 9 completion)*

- [ ] 144-12-PLAN.md — publish bundle `--version=v1.20` → SINGLE close-gate commit (28 Validated) → post-gate apex run

**Cross-cutting constraints:**

- Each leaf exits 0 standalone and prints an `N PASS, 0 FAIL, K SKIPPED` summary with N equal to its registered check count.

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
| 141. Standalone-RED Validator Set — Chain Members Green | v1.20 | 6/6 | Complete | 2026-08-09 |
| 142. Archival-Path Fix, Chain Adoption & Cold-Clone Threshold | v1.20 | 0/TBD | Not started | - |
| 143. Link Coverage & Fence-Mask Unification | v1.20 | 0/TBD | Not started | - |
| 144. V119 Pin + 18th Path-A Lineage Bump + Terminal Close | v1.20 | 0/TBD | Not started | - |
