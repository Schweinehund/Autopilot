# Phase 60: Audit Harness v1.5 Finalization - Context

**Gathered:** 2026-05-06
**Status:** Ready for planning
**Methodology:** Adversarial review (finder/adversary/referee). Finder 418 pts → Adversary disproved 131 → Referee adopted 19 disproves with 2 severity-downgrade overrides. All 4 gray areas resolved.

<domain>
## Phase Boundary

Calibrate-and-finalize the v1.5 audit harness so Phase 61 (terminal re-audit + milestone close) can run from a fresh clone with all blocking checks PASS. Promote C11 (ops-domain anti-patterns) and C13 (broken-link automation) from informational to blocking; promote C9 (cope_banned_phrases) from informational to blocking with new sidecar exemption mechanism; expand C12 (4-platform comparison structural validation) scope to verify the 6 named domain H2 anchors; close out v1.4.1 carry-over AUDIT-07 (`regenerate-supervision-pins.mjs --self-test` BASELINE_9 refresh); ship `check-phase-60.mjs` validator; clear all 75 Phase 48 baseline broken-link findings via fixes + scoped allowlist seeding.

**4 requirements**: AUDIT-03 (C11 promotion + ops-domain allowlist seeding), AUDIT-04 (C12 scope expansion to 6 H2 anchors), AUDIT-05 (C13 promotion after triage clears), AUDIT-06 (`check-phase-60.mjs` ships + CI registration). **Plus 2 carry-overs by D-NN**: AUDIT-07 (BASELINE_9 self-test) and Phase 48 D-06's documented C9 promotion target.

**No new content authoring** — Phase 60 ships harness changes, sidecar additions, validator file, plus 51 anchor-ref *fixes* + 5 broken-path repairs + 1 atomic broken-link-allowlist seed entry per legitimate finding. Linux/ops-depth content is locked from Phases 49–59.

</domain>

<decisions>
## Implementation Decisions

### C11 promotion mechanism (Gray Area 1 — pattern refinement, C1-symmetric)

- **D-01:** PROMOTE C11 (ops-domain anti-patterns) from informational → blocking. Mechanism = **pattern refinement with C1-symmetric proximity-window negation** (Option 1B). Mirror v1.5-milestone-audit.mjs:206-209 C1 SafetyNet pattern: each C11 hit must check a ±200-char window for legitimate-context regex `/successor|deprecated|historical|disambiguation|mutual-exclusion|PITFALL-9|first-occurrence|callout/i` (final keyword list refined at plan time against Phase 53/54/55/56 corpus). Hits within window → exempt; hits outside window → FAIL.
- **D-02:** Retain `c11_ops_exemptions[]` as RESERVED sidecar array shape (per Phase 42 D-26 `{file, line, reason}` contract) for residual file:line edge cases that escape the proximity window. Initial population = 0 entries. Lazy-add per Phase 48 D-15 when first non-windowed legitimate occurrence appears in v1.6+ content.
- **D-03:** Retain current 4-pattern set (System Center / SCCM-near-Intune / Autopatch rings / SafetyNet-near-compliance). DO NOT expand to additional patterns (SCCM-bare, AMAPI-deprecation, Ubuntu-20.04-EOL). Adversary correctly disproved Finder's "AUDIT-03 incomplete pattern set" claim — current 4 patterns map to AUDIT-03's 3 named domains. Pattern expansion is a v1.6+ concern (deferred).
- **D-04:** ROADMAP SC#1's "DDM deprecated-command, Ubuntu 20.04 EOL, Android AMAPI migration, SCCM/ConfigMgr disambiguation prose" list is the **exemption-target schema**, not the **pattern-target schema** — Adversary disprove of 1A.CRIT-2 + 1C.MED-2 corrected Finder's conflation. Proximity-window negation (D-01) covers all 4 exemption surfaces; explicit `c11_ops_exemptions[]` pinning is unnecessary at promotion time.
- **D-05:** Live calibration verification: 6 currently-hit lines (`docs/operations/patch-management/00-overview.md:77,82,85` + `01-windows-wufb-rings.md:60,63,75`) MUST all pass via proximity-window keyword match. If any of the 6 lines fall outside the window after refinement, add to `c11_ops_exemptions[]` in the same atomic commit as the C11 promotion.

### C13 triage disposition (Gray Area 2 — fix-everything-now, scope-balloon justified)

- **D-06:** PROMOTE C13 (broken-link automation) from informational → blocking. Triage strategy = **fix-everything-now** (Option 2A). Phase 60 closes the entire 75-finding Phase 48 baseline inventory: fix all 51 Category A broken anchors, fix all 5 Category B broken file paths, allowlist 6 transient external URLs (Knox Samsung x2, RealWear, Apple HT101555, Google support 9158960, ztd.dds.microsoft.com), allowlist 9 template-placeholder stubs (`link`, `[filename]`, `[runbook-filename]` in 4 admin-templates).
- **D-07:** PITFALL-12 line-shift cascade fear is OVERSTATED. Adversary disproved 2A.CRIT-2 + 2C.CRIT-2: of 51 Category A anchor-target fixes, only `_glossary-android.md:16` (`#kme`/`#kpe`) sits in `supervision_exemptions[]` / `safetynet_exemptions[]` / `c7_knox_allowlist[]` pinned territory. The other 50 anchor fixes are in `l1-runbooks/{02,11,12,13,14,21,25,27,28,29}.md` + `l2-runbooks/{21,22,23}.md` + `_templates/admin-template-ios.md`. Plan must run `regenerate-supervision-pins.mjs --report` BEFORE the anchor-fix commit lands; if `_glossary-android.md:16` shifts, refresh pin coordinates in the SAME atomic commit per Phase 48 D-14 atomicity-contract precedent.
- **D-08:** Anchor-fix pattern (51 Category A entries): broken intra-file `#anchor` links target headings that don't exist in their host docs. Two fix mechanisms: (a) rewrite the anchor reference to point at an existing H2/H3 slug; (b) add explicit `<a id="…"></a>` shim at the section the original anchor intended to address. Plan author chooses per-finding based on whichever is less invasive. Cluster-edit pattern: each l1/l2-runbook file holds 3-5 broken anchors in a quick-nav TOC block — single-edit-per-file is feasible.
- **D-09:** Broken-path-fix pattern (5 Category B entries): 4× `admin-setup-android/{09,10,11,12,13}.md → ../admin-setup/00-overview.md` (no `admin-setup/` dir exists; correct target = `../admin-setup-android/00-overview.md` or remove ref). 1× `device-operations/03-re-provisioning.md → ../reference/conditional-access-enrollment.md` (file does not exist; deferred-stub-style intentional or rewrite to existing reference). 1× `l2-runbooks/03-tpm-attestation.md → 02-device-registration.md`. 1× `l2-runbooks/04-hybrid-join.md → 05-policy-conflict.md`. 1× `reference/network-infrastructure.md → ../l2-runbooks/01-network-connectivity.md`. Plan author triages per-finding (re-link vs delete dead ref) at plan time.
- **D-10:** Allowlist seeding shape — new `c13_broken_link_allowlist[]` sidecar array per `{file, line, target, reason, category}` contract. 15 entries seeded at Phase 60 close (6 transient externals + 9 template placeholders). Categories: `transient_external` (6 entries; reason cites PITFALL-14 + REQUIREMENTS Out-of-Scope spirit for non-MS domains), `template_placeholder` (9 entries; reason: intentional template stub by design).
- **D-11:** AUDIT-08 close — 48-VERIFICATION-broken-links.md `Triage Decision` column populated with `FIXED-PHASE-60` (51+5 entries) or `ALLOWLISTED-c13_broken_link_allowlist` (6+9 entries). Audit-trail preserved; Phase 48 baseline marker NOT erased — Triage Decision column is the close-out signal.
- **D-12:** Phase 60 second-pass sweep verifies post-fix count == 0 NEW findings (allowlisted ones excluded). Any net-new finding introduced by Phase 49-59 v1.5 content represents a REGRESSION and MUST be fixed in Phase 60 close (not deferred to Phase 61). Verification command: `node scripts/validation/v1.5-milestone-audit.mjs --verbose` exits 0 with C13 PASS in blocking mode.

### C12 scope expansion shape (Gray Area 3 — named-anchor verification)

- **D-13:** EXPAND C12 (4-platform comparison structural validation) scope per ROADMAP SC#2 = **assert specific 6 H2 anchor names** (Option 3B). Verify `docs/reference/4-platform-capability-comparison.md` contains all 6 named H2 headings: `## Enrollment` / `## Configuration` / `## App Deployment` / `## Compliance` / `## Software Updates` / `## Conditional Access` (verbatim regex per heading). Anchor slug-stability provides PITFALL-15 protection (lowercase-hyphenate normalization).
- **D-14:** DO NOT add sibling-matrix `#conditional-access` regression-guard (rejected Option 3C). Adversary disproved 3B.MED-2 + 3C.MED-1: `check-phase-58.mjs` V-58-25 already covers the 4 sibling-matrix Phase 58 retrofit (per STATE.md:97). Phase 60 expansion stays scoped to the 4-platform-comparison.md named target per AUDIT-04 literal scope; sibling-matrix coverage is check-phase-58.mjs's owned domain.
- **D-15:** DO NOT add per-row data-cell column-count assertion (rejected Option 3D). Adversary's PITFALL-12 disprove on 3D.MED-1 was correct (runtime check, no pin coords), but referee confirmed 3D.CRIT-1 + 3D.CRIT-2: locks invariants Phase 58 already shipped (Plan 58-06 col-0 fix); creates 240-cell maintenance surface. Phase 58 V-58-07 + harness existing `extractCanonicalDataCells()` semantics already enforce link-not-copy.
- **D-16:** Anchor verification pattern in harness — append 6 new sub-checks inside C12's `run()` after the existing platform-column + link-not-copy logic (around v1.5-milestone-audit.mjs:548). Each H2 heading regex is `^## <Name>$/m` against full file content; FAIL with detail listing missing H2 names.

### C9 + AUDIT-07 carry-over close (Gray Area 4 — promote-and-close in Phase 60)

- **D-17:** PROMOTE C9 (cope_banned_phrases) from informational → blocking in Phase 60. Atomic commit covers C9 + C11 + C13 promotions together. Honors Phase 48 D-06 documented promotion target ("Phase 60 SC#1 — graduate to blocking after v1.5 ops-depth content stabilizes and `cope_banned_phrases[]` allowlist is validated against Phase 53/54 corpus").
- **D-18:** Add `c9_exemptions[]` sidecar array per `{file, line, reason}` contract — symmetric to `c7_knox_allowlist[]` (Phase 48 D-05 precedent). C9 currently lacks an exemption mechanism (harness:424-436 sources patterns from `cope_banned_phrases[]` but ignores hit locations). Plan must:
  - (a) Add C9 exemption-mechanism wiring in harness (mirror C7's `allowKey` set + bare-count loop).
  - (b) Run a pre-promotion corpus scan against Phase 53–56 content (`docs/operations/**/*.md` + `docs/admin-setup-android/**/*.md` + COPE-tagged files); record hits.
  - (c) For each legitimate hit (e.g., AMAPI deprecation prose stating "COPE legacy mode deprecated"), pin in `c9_exemptions[]` with reason citing Phase 53/54/55/56 commit + PITFALL-13 disambiguation.
  - (d) Verify C9 PASSES blocking mode against Phase 53–56 corpus before commit.
- **D-19:** CLOSE AUDIT-07 in Phase 60. Refresh `regenerate-supervision-pins.mjs:393-403` BASELINE_9 to current sidecar-pin coordinates so `--self-test` exits 0. Land in same atomic commit as harness changes per Phase 48 D-14 atomicity-contract. STATE.md "v1.4.1 out-of-band carry-over" lifts at Phase 60 close. Adversary disproved Finder's "BASELINE_9 vs sidecar count drift" concern (4A.MED-1) — BASELINE_9 is the by-design pre-Phase-43 9-pin baseline used as historical anchor for derivation, NOT a count-equality contract with current sidecar (which has 23 supervision pins).
- **D-20:** AUDIT-07 close + C9 promotion + C11 promotion + C13 promotion = ONE ATOMIC COMMIT for the v1.5-milestone-audit.mjs harness change + sidecar JSON additions + BASELINE_9 refresh. Phase 60 plan order:
  1. Phase 53/54/55/56 corpus scan for C9 + C11 calibration (read-only; produces a `60-CALIBRATION.md` artifact)
  2. Anchor-fix commits for 51 Category A entries (cluster-edit per file; 9-12 commits)
  3. Path-fix commits for 5 Category B entries (per-file; 5 commits)
  4. ATOMIC HARNESS COMMIT: v1.5-milestone-audit.mjs C9/C11/C13 promotions + C12 expansion + sidecar adds (`c9_exemptions[]`, `c11_ops_exemptions[]` reserved-empty, `c13_broken_link_allowlist[]` 15 entries) + BASELINE_9 refresh + 48-VERIFICATION-broken-links.md Triage Decision population
  5. check-phase-60.mjs validator commit (asserts harness state + sidecar shape + BASELINE_9 self-test exits 0 + 48-VERIFICATION close-out + 60-CALIBRATION.md exists)
  6. (Optional) ROADMAP SC#5 wording fix: `audit-harness-integrity.yml` → `audit-harness-v1.5-integrity.yml` per Phase 48 D-16 file-versioning lineage architecture (ROADMAP SC#5 cites the frozen yml; v1.5 validators have lived in the v1.5 yml since Phase 48 close — all 13 validators 48-60 already registered).

### check-phase-60.mjs validator scope

- **D-21:** Author `scripts/validation/check-phase-60.mjs` per Phase 30/31/48 file-reads-only validator-as-deliverable pattern. Assertions to ship:
  - V-60-01..04: harness file contains `informational: false` (or absent flag) for C9/C11/C13/C12 (4 assertions)
  - V-60-05: `c9_exemptions[]` array exists in sidecar (>= 0 entries; lazy-add OK)
  - V-60-06: `c11_ops_exemptions[]` array exists in sidecar (>= 0 entries; reserved)
  - V-60-07: `c13_broken_link_allowlist[]` array exists with 15 entries (6 transient_external + 9 template_placeholder)
  - V-60-08: 48-VERIFICATION-broken-links.md Triage Decision column populated for all 75 entries (no empty cells)
  - V-60-09: BASELINE_9 in regenerate-supervision-pins.mjs has been refreshed since 2026-04-26 (file mtime check OR explicit BASELINE_9 generation timestamp comment present)
  - V-60-10: regenerate-supervision-pins.mjs --self-test exits 0 (subprocess invocation OR explicit assertion)
  - V-60-11: docs/reference/4-platform-capability-comparison.md contains all 6 named H2s (Enrollment / Configuration / App Deployment / Compliance / Software Updates / Conditional Access)
  - V-60-12..23: 12 NEGATIVE regression-guards confirming Phase 49-59 V-NN-NN structural assertions still pass (chain validators 49 through 59)
  - V-60-24: 60-CALIBRATION.md artifact exists in phase dir documenting Phase 53-56 corpus scan results for C9 + C11
  - V-60-25: pre-Phase-60 broken-link inventory baseline preserved (48-VERIFICATION-broken-links.md `Total findings: 75` + Summary table values byte-identical pre/post Phase 60 close)
- **D-22:** Validator runs from repo root via `node scripts/validation/check-phase-60.mjs [--verbose]`. Exits 0 on all-PASS; 1 on any-FAIL. CI registers in `.github/workflows/audit-harness-v1.5-integrity.yml` (already-allocated job slot per Phase 48 D-18 graceful-degradation pattern; just drops in the `check-phase-60.mjs` file; no yml edit needed).

### CI workflow registration

- **D-23:** Phase 60 SC#5 wording (ROADMAP:401: "registered in CI workflow `audit-harness-integrity.yml`") references the FROZEN v1.4 + v1.4.1 yml. Per Phase 48 D-16/D-17/D-19, all v1.5 validators (48-60) live in the parallel `audit-harness-v1.5-integrity.yml` (293 lines; all 13 placeholder slots already filled with graceful-degradation lazy-skip per Phase 42 D-31). Phase 60 plan must surface SC#5 textual contradiction in 60-VERIFICATION.md and propose ROADMAP.md SC#5 wording correction: `audit-harness-integrity.yml` → `audit-harness-v1.5-integrity.yml`. Same close-out pattern as Phase 48 D-09 SC#1 textual contradiction handling.
- **D-24:** No NEW yml edits required — `check-phase-60.mjs` slot at audit-harness-v1.5-integrity.yml:261-275 exists and works via graceful-degradation; landing the validator file activates the slot.

### Plan structure + atomicity

- **D-25:** Phase 60 plan structure = **mixed atomic-commit + progressive-landing**. Anchor-fix and path-fix commits (D-20 steps 2-3) progressive-land per file (cluster-edit pattern; small surface per commit; PITFALL-12 line-shift watching per commit). Harness change commit (D-20 step 4) is single ATOMIC commit per Phase 43 D-07 atomicity-contract precedent — bundles 4 promotion changes + 4 sidecar adds + BASELINE_9 refresh + 48-VERIFICATION close-out. Plan-author estimates 14-18 commits total: 9-12 anchor-fix cluster commits + 3-5 path-fix per-file commits + 1 atomic harness commit + 1 validator commit + 1 SC#5 wording fix commit.
- **D-26:** All Phase 49-59 V-NN-NN structural assertions MUST remain PASS post-Phase-60-close. Pre-commit gate: run check-phase-{48..59}.mjs + v1.5-milestone-audit.mjs --verbose + check-phase-60.mjs before atomic harness commit. Post-commit verification: same suite plus regenerate-supervision-pins.mjs --self-test (now blocking-PASS per AUDIT-07 close).

### Calibration corpus scan (60-CALIBRATION.md artifact)

- **D-27:** Pre-promotion calibration step produces `.planning/phases/60-audit-harness-v1-5-finalization/60-CALIBRATION.md` with two sections: (a) C9 corpus scan — every match of `cope_banned_phrases[]` regex against `docs/admin-setup-android/**/*.md` + `docs/operations/**/*.md` + Android scope, with disposition (legitimate-disambiguation vs anti-pattern); (b) C11 corpus scan — every match of the 4 patterns against `docs/**/*.md`, with proximity-window evaluation result (windowed-exempt vs requires-pinning vs anti-pattern).
- **D-28:** Calibration step is a READ-ONLY analysis commit produced BEFORE harness changes. If any anti-pattern hits surface (legitimate FAIL conditions), they get fixed via per-phase content edits (which would be regression entries against Phase 49-59 — should be zero per V-NN-NN structural assertions).

### Claude's Discretion

- Final keyword list for C11 proximity window in D-01 — `/successor|deprecated|historical|disambiguation|mutual-exclusion|PITFALL-9|first-occurrence|callout/i` is the starting set; refine at plan time against the live calibration scan output. Adding/removing keywords in the same atomic commit is allowed.
- Per-finding fix vs delete-ref disposition for the 5 Category B broken paths in D-09. Plan author triages each at plan time.
- Anchor-fix mechanism per Category A finding in D-08 — rewrite-ref vs `<a id>`-shim. Per-finding choice.
- BASELINE_9 refresh implementation detail in D-19 — generated-from-current-pins script run vs hand-edit. Phase 43 lineage favors script-generated; if regenerate-supervision-pins.mjs has a `--regenerate-baseline` mode, use it; else hand-edit.
- ROADMAP SC#5 wording fix in D-23 — fix in same commit as harness OR as a separate trailing commit. Phase author preference.
- Pre-commit hook tooling for advisory pin-drift (Phase 48 D-21 advisory hook) is already in place; no Phase 60 work.

### Folded Todos

*No pending todos matched Phase 60 scope.* The single open todo (`2026-05-06-choose-your-platform-linux-operations-bullets.md`) is explicitly targeted to Phase 61 or v1.6 per its metadata.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents (researcher, planner, executor) MUST read these before authoring or implementing.**

### Phase 60 success criteria + traceability (authoritative scope)

- `.planning/ROADMAP.md` §"Phase 60: Audit Harness v1.5 Finalization" (lines 392-402) — Goal, 5 success criteria, requirement mapping (AUDIT-03/04/05/06)
- `.planning/ROADMAP.md` §"Progress" (line 481) — Phase 60 status row + dependency note
- `.planning/ROADMAP.md` §"v1.5 Shared Write Hotspot Ownership" (lines 488-503) — Phase 60 owns harness/sidecar finalization
- `.planning/REQUIREMENTS.md` §AUDIT-03..07 (lines 84-88) — literal success-criteria text for each requirement
- `.planning/REQUIREMENTS.md` §"Out of Scope" (~lines 104-117) — external MS Learn URL validation EXPLICITLY excluded from C13
- `.planning/REQUIREMENTS.md` §"Traceability" (lines 121-141) — AUDIT-03..07 phase mapping; AUDIT-07 maps to Phase 48 (carry-over)

### Phase 48 prior decisions (LOCKED architectural decisions Phase 60 must not contradict)

- `.planning/phases/48-audit-harness-bootstrap-broken-link-sweep-first-pass/48-CONTEXT.md` — Phase 48 D-01..D-23 establish the entire Path A harness pattern; sidecar location/lifecycle; `regenerate-supervision-pins.mjs` 3-mode contract; atomicity-contract; informational-first promotion ladder
- `.planning/phases/48-audit-harness-bootstrap-broken-link-sweep-first-pass/48-VERIFICATION-broken-links.md` — 75 baseline findings (51 Category A anchors + 24 Category B paths/URLs/templates + 0 Category C deferred-stubs); D-12 schema; sweep tooling versions
- `.planning/phases/48-audit-harness-bootstrap-broken-link-sweep-first-pass/48-VERIFICATION.md` — Phase 48 close-state of harness, sidecar, BASELINE_9, CI

### Phase 58 + Phase 57 dependency artifacts (already-shipped invariants)

- `.planning/phases/58-defer-08-4-platform-capability-comparison/58-CONTEXT.md` — Phase 58 D-04 6 H2 enumeration; D-08 link-not-copy; D-17/D-18 C12 promotion-at-Phase-58 (already-shipped, NOT re-promoted in Phase 60)
- `.planning/phases/58-defer-08-4-platform-capability-comparison/58-VERIFICATION.md` — Phase 58 close-state
- `.planning/phases/57-defer-07-android-nav-unification/57-VERIFICATION.md` — Phase 57 close-state; C4 retirement context
- `.planning/phases/59-hub-navigation-integration-linux-operations-sections/59-VERIFICATION.md` — Phase 59 close-state; CLEAN-08 close

### v1.5 research (authoritative for tooling choices and pitfall avoidance)

- `.planning/research/SUMMARY.md` — executive summary; broken-link tooling choice (markdown-link-check)
- `.planning/research/PITFALLS.md` §Pitfall 9 (SCCM/ConfigMgr disambiguation) — informs C11 proximity-window keyword list
- `.planning/research/PITFALLS.md` §Pitfall 11 — Path A copy hazard; FROZEN-marker discipline; informational-first graduation contract (Phase 60 honors this for C9/C11/C13)
- `.planning/research/PITFALLS.md` §Pitfall 12 — sidecar pin coordinate stability; cluster-fix line-shift watching mandate
- `.planning/research/PITFALLS.md` §Pitfall 13 — ops-domain anti-pattern false-positive risk; informs proximity-window negation design
- `.planning/research/PITFALLS.md` §Pitfall 14 — Microsoft Learn redirect chain noise; informs `c13_broken_link_allowlist[]` `transient_external` category
- `.planning/research/PITFALLS.md` §Pitfall 15 — GFM anchor case sensitivity; relevant for D-13 named-anchor check (slug stability)

### v1.5 harness + sidecar (code Phase 60 modifies)

- `scripts/validation/v1.5-milestone-audit.mjs` (606 lines) — current state. Lines 484-491 (C11 patterns), 419-436 (C9), 511-549 (C12), 553-566 (C13). Phase 60 modifies these check definitions atomically.
- `scripts/validation/v1.5-audit-allowlist.json` (55 lines) — current shape. Phase 60 adds `c9_exemptions[]`, `c11_ops_exemptions[]` (reserved), `c13_broken_link_allowlist[]` (15 entries seeded).
- `scripts/validation/regenerate-supervision-pins.mjs` (496 lines) — BASELINE_9 array around line 390-403; refresh in Phase 60 atomic harness commit per AUDIT-07 close.
- `scripts/validation/check-phase-30.mjs` + `check-phase-31.mjs` — pattern exemplars for `check-phase-60.mjs` author (file-reads-only JSON+markdown validators).
- `scripts/validation/check-phase-58.mjs` + `check-phase-59.mjs` — recent exemplars; V-58-25 sibling-matrix retrofit guard pattern (Phase 60 does NOT duplicate per D-14).
- `scripts/validation/v1.4.1-audit-allowlist.json` + `v1.4.1-milestone-audit.mjs` — FROZEN predecessors (do NOT modify); referenced for sidecar shape lineage.

### CI workflow + pre-commit hook

- `.github/workflows/audit-harness-v1.5-integrity.yml` (293 lines) — current state. Phase 60 validator slot at lines 261-275 (already exists; lazy-skip when file absent). No yml edit needed.
- `.github/workflows/audit-harness-integrity.yml` (92 lines) — FROZEN v1.4 + v1.4.1 yml; Phase 60 SC#5 wording incorrectly references this file (should reference v1.5 yml per Phase 48 D-16 lineage).

### Project-level context

- `.planning/PROJECT.md` §"Current Milestone: v1.5" — full v1.5 scope statement
- `.planning/STATE.md` — v1.5 milestone decisions recap; out-of-band carry-overs from v1.4.1 close (AUDIT-07 inheritance pointer); current focus = Phase 60
- `.planning/MILESTONES.md` (if exists) — milestone closure record pattern

### Downstream-phase dependencies (what Phase 60 unblocks)

- **Phase 61 (Gap Closure + Terminal Re-Audit + Milestone Close)** depends on: harness 12/12 PASS in fully-blocking mode from a fresh auditor worktree (Phase 61 SC#1); 75-finding baseline closed (51 fixed + 24 allowlisted); v1.5-MILESTONE-AUDIT.md documenting any v1.6+ routes; AUDIT-07 closed; all REQUIREMENTS.md `[ ]` checkboxes flippable to `[x]`.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets

- `scripts/validation/v1.5-milestone-audit.mjs` lines 71-79 (`parseAllowlist()`) — sidecar loader with parse-failure-degrade-to-empty pattern. Phase 60 sidecar additions (3 new arrays) reuse this loader directly.
- `scripts/validation/v1.5-milestone-audit.mjs` lines 200-219 (C1 SafetyNet) — proximity-window pattern Phase 60 mirrors verbatim for C11 (D-01). Pre-window allowlist pin check, then ±200-char semantic-keyword regex, then default fail.
- `scripts/validation/v1.5-milestone-audit.mjs` lines 392-415 (C7 Knox) — `allowKey` set + bare-count-with-pin-exempt loop pattern Phase 60 mirrors for C9 exemption-mechanism wiring (D-18a).
- `scripts/validation/v1.5-milestone-audit.mjs` lines 88-179 (`androidDocPaths()` + `linuxDocPaths()`) — file-walker scope helpers; Phase 60 calibration scan reuses for corpus enumeration.
- `scripts/validation/check-phase-30.mjs` + `check-phase-58.mjs` + `check-phase-59.mjs` — file-reads-only JSON+markdown validator pattern exemplars for `check-phase-60.mjs` author.
- `scripts/validation/regenerate-supervision-pins.mjs` lines 383-427 — BASELINE_9 refresh pattern documentation; 3-mode contract (`--report` / `--emit-stubs` / `--self-test`).

### Established Patterns

- **Proximity-window negation (Phase 31 + Phase 42 D-25):** C1 implements semantic ±200-char window for SafetyNet; Phase 60 D-01 adopts identically for C11 with disambiguation-prose keyword set.
- **Sidecar exemption shape (Phase 42 D-26):** `{file, line, reason}` — Phase 60 D-18 + D-10 follow.
- **Atomicity-contract single-commit harness changes (Phase 43 D-07, Phase 48 D-14):** Phase 60 D-20 step 4 atomic commit consolidates promotions + sidecar adds + BASELINE_9 refresh.
- **Cluster-edit per-file commit pattern (Phase 58 progressive-landing):** Phase 60 D-25 anchor-fix and path-fix commits land per-file.
- **Validator-as-deliverable + lazy-skip in CI (Phase 42 D-31, Phase 48 D-18):** Phase 60 D-21 + D-24 follow.
- **Pin coordinate watching against line-shift (Phase 48 D-14, Phase 59 commit `a01ab1d` precedent):** Phase 60 D-07 mandates pre-cluster-fix `regenerate-supervision-pins.mjs --report` then refresh in same commit if shifts detected.
- **Append-only contract on shared yml/json (Phase 42 D-03, Phase 48 D-23):** Phase 60 sidecar additions are NEW arrays (no edits to existing arrays' content beyond pin-coord refresh).
- **Frozen-predecessor lineage (Phase 48 D-16):** v1.4 + v1.4.1 yml + harness + sidecar untouched.

### Integration Points

- **Harness invocation:** `node scripts/validation/v1.5-milestone-audit.mjs [--verbose]` — Phase 60 atomic commit must keep this exit-0 in fully-blocking mode (12/12 PASS, no informational hits except C3 self-cert).
- **Sidecar JSON integration surface** (Phase 60 close shape): `{schema_version, generated, phase: "60-audit-harness-v1-5-finalization", safetynet_exemptions[], supervision_exemptions[], cope_banned_phrases[], c7_knox_allowlist[], c9_exemptions[], c11_ops_patterns[]?, c11_ops_exemptions[], c13_broken_link_allowlist[]}`. Update `phase` field in same atomic commit.
- **CI lazy-skip slot (audit-harness-v1.5-integrity.yml:261-275):** Phase 60 validator activates the slot by file presence; no yml edit.
- **Pre-commit advisory hook (Phase 48 D-21):** existing; no Phase 60 work.
- **48-VERIFICATION-broken-links.md Triage Decision column:** Phase 60 close-out signal per D-11; populated atomically with harness changes.

### PITFALL-12 surface watched (file:line pin coords vulnerable to anchor-fix shifts)

- `_glossary-android.md:16` — only Category A anchor target intersecting pinned territory (`#kme`/`#kpe` references in Knox glossary entry; pinned at safetynet_exemptions / c7_knox_allowlist / supervision_exemptions). Plan author MUST run `regenerate-supervision-pins.mjs --report` before fixing this single anchor; refresh pins in same commit if shifts detected.
- 50/51 other Category A anchors are in `l1-runbooks/` + `l2-runbooks/` + `_templates/admin-template-ios.md` — NO pin-coord overlap.
- 5 Category B path-fixes are in admin-setup-android + device-operations + l2-runbooks + reference + network-infrastructure — NO pin-coord overlap.

</code_context>

<specifics>
## Specific Ideas

- **Adversarial-review traceability:** Finder/Adversary/Referee scored 4 gray areas. Finder 418 raw points. Adversary +131 disproved (top wins: 1A.CRIT-1+CRIT-2 SC#1 vs AUDIT-03 conflation; 1B.MED-1 Node 20 lookbehind concern; 2A.CRIT-2 + 2C.CRIT-2 PITFALL-12 cascade fear; 2B.MED-2 D-15 mis-cite; 4A.MED-1 BASELINE_9 count-equality phantom; 3A.CRIT-2 + 3B.MED-2 + 3D.MED-1 various phantoms). Referee 2 severity-downgrade overrides (1A.CRIT-1 → MED on partial coverage; 3A.CRIT-1 → MED on SC#2 literal-text-vs-implicit-naming). DISCUSSION-LOG.md preserves option-by-option scoring + verdict for audit.

- **C11 proximity-window keyword set is the central calibration knob.** Plan author must validate the keyword list against the 6 currently-hit lines + Phase 53/54/55/56 corpus before atomic commit. If a legitimate hit falls outside the window, two options: (a) extend the keyword list, (b) pin in `c11_ops_exemptions[]`. Window-extension is preferred for generic terms; pinning is preferred for site-specific terms.

- **"AUDIT-07 has no Phase 61 home" as the operative force in GA4 4A pick.** Adversary's 4B.CRIT-2 confirmation was the lever. Phase 61 SCs (ROADMAP:408-413) list 5 close-out items; none accommodate AUDIT-07 carry-over fix work. Punt in Phase 60 = AUDIT-07 unclosed at v1.5 milestone close = REQUIREMENTS.md:88 checkbox stays unflipped at Phase 61. Therefore Phase 60 OWNS AUDIT-07.

- **2A scope-balloon framing is real but justified by SC#3.** Adversary confirmed 2A.CRIT-1 scope-balloon. Referee accepted it as REAL but justified by ROADMAP:399 SC#3 literal text mandating Phase 60 *clears* the inventory. Alternative options each carry multiple unavoidable CRITs (2B AUDIT-05 literal-scope; 2C terminal-close-defer; 2D 24-broken-paths-block-promotion). 2A is the least-bad path.

- **C12 expansion stays narrow per AUDIT-04 named target.** Adversary's 3B.MED-2 + 3C.MED-1 disproves were load-bearing — V-58-25 already covers sibling-matrix retrofits, freeing Phase 60 C12 expansion to focus on the 4-platform-comparison file only. Avoids cross-validator coverage duplication.

- **C9 promotion REQUIRES new exemption mechanism.** Adversary's 4A.CRIT-2 confirmation: harness:424-436 currently ignores hit locations entirely (returns informational regardless). Plan author must wire `allowKey`-set + bare-count-with-pin-exempt loop pattern from C7. Pre-promotion corpus scan (D-27) flags any hit that needs pinning vs windowing.

- **"Calibration-and-finalization" phase posture is the meta-discipline.** Phase 60 ships almost-zero new content (3 new sidecar arrays + ~30 LOC harness diff + 56 anchor/path fixes that are bug-fixes-not-content + 1 BASELINE_9 refresh + 1 validator file). Scope discipline is enforced by all 4 D-NN sets — every "expand it more" option (1C, 1D, 3D, 2A's strict subset of fixes) was either rejected (1C/1D/3D) or accepted as least-bad (2A justified by SC#3 literal text, not as authoring scope).

- **Phase 60 close = v1.5 harness GREEN-from-fresh-clone in fully-blocking mode.** Phase 61 inherits this state. No Phase 61 SC depends on harness changes. AUDIT-03/04/05/06 + AUDIT-07 + Phase 48 D-06 C9 promotion = all close at Phase 60.

</specifics>

<deferred>
## Deferred Ideas

- **C11 pattern expansion to SCCM-bare / AMAPI-deprecation / Ubuntu-20.04-EOL surfaces.** Phase 60 D-03 keeps the current 4-pattern set. v1.6+ may expand if false-negative rate is observed in v1.5 production. Expansion would be sidecar-driven via `c11_ops_patterns[]` array (already exists at v1.5-milestone-audit.mjs:484); no harness JS edit needed.
- **`c11_ops_exemptions[]` lazy population.** Reserved-empty at Phase 60 close per D-02; first occurrence to populate is whenever a non-windowed legitimate ops-domain anti-pattern hit emerges in v1.6+ content.
- **`c9_exemptions[]` lazy expansion.** Pre-promotion corpus scan (D-27) may seed 0-N entries at Phase 60 close. Future v1.6+ COPE content additions may add entries.
- **Sibling-matrix `#conditional-access` regression-guard duplication in C12** — rejected per D-14. If `check-phase-58.mjs` is ever retired, port V-58-25 NEGATIVE regression-guard to v1.5-milestone-audit.mjs C12. v1.6+ planning concern.
- **Per-row data-cell column-count assertion in C12** — rejected per D-15. Plan 58-06 already-shipped fix is sufficient. Reconsider only if 4-platform-comparison.md row count diverges from spec.
- **Pre-commit hook hard-block for pin-drift** (Phase 48 D-22 promotion ladder) — pre-commit is currently advisory-only. Phase 60 close = Phase 48 D-22 ladder remains advisory; promotion to hard-block is v1.6+ if false-positive rate proves near-zero.
- **`broken_link_external_allowlist[]` array (Phase 48 D-15 explicit rejection)** — not added at Phase 60 close. Phase 48 D-15 conflicts with REQUIREMENTS Out of Scope external-MS-Learn-URL exclusion. Phase 60 D-10 adds `c13_broken_link_allowlist[]` for transient EXTERNAL non-MS domains specifically (Knox / RealWear / Apple / Google / ztd.dds), explicitly disambiguated from the rejected MS-Learn-allowlist concept.
- **`audit-harness-v1.5-integrity.yml` archive lifecycle at v1.6 milestone-start** — Phase 48 D-19 deferred concern. v1.6 ships own yml; v1.5 yml freezes. Backlog item.
- **iOS/macOS/Windows admin template `last_verified` normalization** — Phase 48 deferred carry-over (Android-scope lock per Phase 43 D-25). Phase 60 broken-link sweep does NOT surface freshness drift (C13 doesn't check `last_verified`). v1.6+ concern if iOS/macOS template freshness becomes a quality issue.
- **"Choose Your Platform" Linux + Operations bullets in docs/index.md** — Phase 59 deferred TODO at `.planning/todos/pending/2026-05-06-choose-your-platform-linux-operations-bullets.md`. Targeted to Phase 61 gap-closure or v1.6 cleanup. NOT in Phase 60 scope.
- **ROADMAP SC#5 wording fix** (D-23) — fix in Phase 60 atomic commit OR as separate trailing commit. If user prefers ROADMAP edit happens at Phase 61 (cleaner traceability batch), defer to Phase 61 close.

### Reviewed Todos (not folded)

- `2026-05-06-choose-your-platform-linux-operations-bullets.md` — explicitly targets Phase 61 or v1.6 per its own `target_phase` metadata. Not Phase 60 scope.

</deferred>

---

*Phase: 60-audit-harness-v1-5-finalization*
*Context gathered: 2026-05-06*
*Adversarial review applied: finder/adversary/referee on all 4 gray areas; Finder 418 → Adversary +131 → Referee 2 severity-downgrade overrides*
