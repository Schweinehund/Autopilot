---
phase: 61
phase_name: "Gap Closure + Terminal Re-Audit + Milestone Close"
project: "Windows Autopilot & macOS Provisioning Documentation Suite"
generated: "2026-05-07"
counts:
  decisions: 14
  lessons: 8
  patterns: 12
  surprises: 10
missing_artifacts: []
---

# Phase 61 Learnings: Gap Closure + Terminal Re-Audit + Milestone Close

## Decisions

### Refresh stale validators rather than revert authored content

When `check-phase-53.mjs` V-53-06 + V-53-22 reported FAIL against `docs/operations/00-index.md` (Phase 59 evolved the file from a co-management-only stub to a 4-domain cross-platform index), the validator was identified as the stale artifact rather than the docs.

**Rationale:** Phase 59 D-10 (`59-CONTEXT.md:76`) explicitly authorized the H2 expansion as a same-commit DPO-Phase56-01 hand-off discharge — a deliberate superseding decision. Reverting the content would have destroyed CLEAN-08 + Phase 59 deliverables + the discharged hand-off chain. Refreshing the validator records the alignment that Phase 59's V-59-NN should have propagated but missed.
**Source:** 61-CONTEXT.md D-01..D-07, 61-01-SUMMARY.md, 59-CONTEXT.md:76

---

### Per-file scope-exemption preferred over permissive regex for frontmatter checks

V-53-06 was refactored as `if (f === IDX) { permissive check } else { strict platform: Windows check }` rather than relaxing the assertion globally for all CONTENT_FILES.

**Rationale:** Preserves the strict `platform: Windows` pin for 4 co-management content files (the original Phase 53 D-02 contract surface) while exempting only the IDX file that legitimately needed `platform: cross-platform` per Phase 59 D-10. Avoids contract-weakening on files that should still hold the pin.
**Source:** 61-01-SUMMARY.md key-decisions, 61-CONTEXT.md D-02

---

### V-53-22 SCOPE_RESTRICTED to CO_MGMT_FILES mirrors V-53-10 precedent

V-53-22's NEGATIVE regression-guard (forbidden ops-domain H2s) was scope-restricted to iterate only over CO_MGMT_FILES, exempting the IDX file.

**Rationale:** V-53-10 already established the SCOPE_RESTRICTED pattern at `check-phase-53.mjs:149-165`; reusing it preserves architectural consistency and minimizes invention. The 4 co-management content files (`00-overview.md`, `01-windows-tenant-attach.md`, `02-windows-workload-sliders.md`, `03-cocmgmt-migration-paths.md`) legitimately should NOT contain `## App Lifecycle Automation` etc. — only the cross-platform index does.
**Source:** 61-01-SUMMARY.md key-decisions, 61-CONTEXT.md D-03

---

### Verify-and-flip with traceability comments (not bulk-flip)

Plan 61-02 read each phase's VERIFICATION.md to confirm requirement-mapping then flipped checkboxes with inline traceability comments per CLEAN-05 line-17 reference template.

**Rationale:** Audit-trail mandate from PROJECT.md:175 v1.4.1 close pattern (PROJECT.md traceability closure). Bulk-flip would have papered over the 4 stale ROADMAP §Progress rows (Phase 48/49/50/56) without reconciliation, codifying inconsistency. Verify-and-flip surfaced and resolved them in the same plan.
**Source:** 61-CONTEXT.md D-08..D-13, 61-02-SUMMARY.md, 61-DISCUSSION-LOG.md GA2

---

### Hybrid v1.5-MILESTONE-AUDIT.md schema (v1.4 frontmatter + v1.5 body)

`.planning/milestones/v1.5-MILESTONE-AUDIT.md` was authored with v1.4-MILESTONE-AUDIT.md frontmatter verbatim plus 4 v1.5-specific body sections (Three-Pillar Closure / AUDIT-08 Close-Out / Harness Lineage 48→60 / Auditor-Independence Verification).

**Rationale:** Path-A-copy-with-additions preserves cross-milestone schema continuity per Phase 48 D-16 lineage discipline. Verbatim mirror (3A) would have under-recorded 7 of 12 checks (v1.4 had C1-C5; v1.5 has C1-C13); minimal schema (3D) would have failed SC#2 literal "C10-C13 check outcomes" mandate; new schema (3C) would have broken Path-A lineage.
**Source:** 61-CONTEXT.md D-14..D-19, 61-DISCUSSION-LOG.md GA3

---

### Five-plan progressive-landing close mirrors Phase 47 v1.4.1 pattern

Phase 61 was structured as 5 strict-serial plans (61-01 validator+todo / 61-02 reqs flip / 61-03 PROJECT migration / 61-04 audit doc + re-audit / 61-05 MILESTONES + check-phase-61 + close).

**Rationale:** Phase 47 v1.4.1 close shipped 4 plans across 2 days (33 plans / 5 phases ≈ 6.6 plans/phase). Phase 61 added Plan 61-01 for the validator catch-up + jump-link work that has no Phase 47 analog. Single-plan-atomic (4A) had a surviving D-07 atomicity-conflation concern (downgraded to MED but real). Multi-plan structure provides commit checkpoints between sub-task classes, fits Phase 60 D-25 progressive-landing precedent.
**Source:** 61-CONTEXT.md D-21, 61-DISCUSSION-LOG.md GA4

---

### Fold the score-0.9 todo into Plan 61-01 (honor OR-routing)

The pending todo `2026-05-06-choose-your-platform-linux-operations-bullets.md` (target_phase: `61 (gap closure) or v1.6 cleanup`) was folded into Plan 61-01 alongside the validator alignment.

**Rationale:** Todo's metadata routes to "61 OR v1.6"; folding honors one of two pre-authorized branches. 5-min effort estimate is trivially small — deferring it would be misallocation. Folding lands the visible UX gap fix (jump-link list missing 2 bullets after Phase 59 hub expansion) inside v1.5 close rather than rolling to undefined v1.6.
**Source:** 61-CONTEXT.md D-20, todo file:9 OR-routing

---

### Auditor-independence via gsd-executor isolation:worktree

Plan 61-04 was dispatched with `isolation: "worktree"` (different agent ID + isolated worktree) rather than running inline in the main session.

**Rationale:** CONTEXT D-22 mandates "fresh worktree spawn distinct from Plans 61-01..03 author-agents per D-02 auditor-independence rule" mirroring v1.4-MILESTONE-AUDIT.md:25 verbatim Plan 42-06 precedent. Worktree path `agent-a5336372f28300cea` + branch `worktree-agent-a5336372f28300cea` recorded in `## Auditor-Independence Verification` body section.
**Source:** 61-CONTEXT.md D-22, 61-04-SUMMARY.md frontmatter agent_id

---

### CI yml slot insertion overrides CONTEXT D-25

Plan 61-05 inserted a `check-phase-61:` job slot into `.github/workflows/audit-harness-v1.5-integrity.yml` before `pin-helper-advisory:`, overriding CONTEXT D-25's claim "no yml edit required".

**Rationale:** RESEARCH.md OQ1 verified that the yml lazy-skip pattern (per Phase 48 D-18 graceful-degradation) requires an explicit NAMED slot — file presence alone does NOT activate the validator in CI. CONTEXT D-25 was authored before the yml structure was verified at research time; RESEARCH override was applied.
**Source:** 61-RESEARCH.md OQ1, 61-CONTEXT.md D-25 (overridden), 61-05-SUMMARY.md key-decisions

---

### Phase 50 excluded from CHAIN_PHASES per stub-validator precedent

`check-phase-61.mjs` `CHAIN_PHASES = [48, 49, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60]` excludes Phase 50.

**Rationale:** check-phase-50.mjs is a stub validator (Phase 50 was a multi-output content phase that didn't ship the validator-as-deliverable artifact). check-phase-60.mjs already excluded Phase 50 with the same reasoning; mirroring that precedent maintains chain-validator coherence.
**Source:** 61-RESEARCH.md OQ3, check-phase-60.mjs CHAIN_PHASES comment block

---

### AUDIT-08 timing isolation (deferred to Plan 61-04)

Plan 61-02 deliberately preserved AUDIT-08 as `[ ]` while flipping the other 43 active reqs. AUDIT-08 was flipped atomically in Plan 61-04's close commit alongside the v1.5-MILESTONE-AUDIT.md authoring.

**Rationale:** AUDIT-08's literal text requires "Phase 60-61 second-pass produces the milestone close audit report" — that artifact is `v1.5-MILESTONE-AUDIT.md`, which Plan 61-04 creates. Flipping AUDIT-08 at Plan 61-02 would have been premature claim-without-deliverable.
**Source:** 61-CONTEXT.md D-10, 61-02-SUMMARY.md AUDIT-08 gate confirmation

---

### SHA-injection follow-up commit pattern (cleaner than --amend)

After Plan 61-04 close commit `690624d` landed, a follow-up commit `1195b49` injected the close commit SHA into AUDIT-08 traceability + audit doc.

**Rationale:** Plan offered two strategies (amend or follow-up). Follow-up was chosen because `--amend` was not required and produces a cleaner audit trail (the close SHA is visible in git log AND referenced by content; the injection commit is itself traceable).
**Source:** 61-04-SUMMARY.md key-decisions, 61-04-SUMMARY.md "Deviations from Plan"

---

### Validator regex separator-aware slice (not greedy lookahead)

V-61-18..20 in `check-phase-61.mjs` uses `indexOf('\n---\n')` boundary + `indexOf('\n## ')` slice extraction rather than greedy `(?=\n## |\Z)` regex lookahead.

**Rationale:** The greedy lookahead fired early on inline `## Linux Provisioning` etc. inside MILESTONES.md bullet content, causing premature section termination. Separator-aware slice respects the milestone-entry boundary (the `---` separator) as the authoritative section delimiter.
**Source:** 61-05-SUMMARY.md key-decisions, 61-05-SUMMARY.md deviation #3

---

### No `re_audit_resolution` block at initial v1.5 close

`v1.5-MILESTONE-AUDIT.md` ships with `status: passed` from initial close; no `re_audit_resolution` sibling block.

**Rationale:** v1.4-MILESTONE-AUDIT.md's `re_audit_resolution` block was added retroactively by v1.4.1 Plan 47-04 to flip `tech_debt → passed`. v1.5 has no v1.5.1 follow-up planned at close time; the slot is reserved for future appending if v1.5.1 emerges (per v1.4.1 precedent pattern).
**Source:** 61-CONTEXT.md D-16, 61-04-SUMMARY.md key-decisions

---

## Lessons

### Validator greedy regex lookahead can fire early on inline H2 markers in bullet content

`(?=\n## |\Z)` lookahead in V-61-18..20 caught inline `## Linux Provisioning` (a bullet's link target) instead of the next-section delimiter, terminating the v1.5 section match prematurely. Separator-aware slice (using `\n---\n` boundary) is more robust for markdown section extraction when the content body may contain `##` markers in non-heading contexts.

**Context:** check-phase-61.mjs initial regex implementation (Plan 61-05 Task 1). Caught by V-61-19 FAIL during pre-close gate verification; auto-fixed in Task 3 commit `965f509`.
**Source:** 61-05-SUMMARY.md deviation #3

---

### Cross-file flip consistency requires explicit cross-file verification

Plan 61-04 correctly flipped AUDIT-08 from `[ ]` to `[x]` in REQUIREMENTS.md but did NOT migrate the corresponding `[ ] **AUDIT-08**` entry in PROJECT.md §Active to §Validated. Discovery was deferred to Plan 61-05's `check-phase-61.mjs` V-61-09 assertion (counts validated reqs in PROJECT.md), which initially FAILed with 56/57.

**Context:** Plan 61-04 scope was "audit doc + AUDIT-08 flip"; the cross-file PROJECT.md sync was implicit in the requirement but not in the task list. Auto-fixed in Plan 61-05 Task 1 commit `d80090c`.
**Source:** 61-05-SUMMARY.md deviation #2

---

### Plan 61-02 left 12 reqs without traceability comments

Plan 61-02 flipped 43 reqs but missed adding traceability comments to CLEAN-08, LIN-12, COMG-01..05, and AUDIT-03..07 (12 reqs). These were already pre-flipped at earlier-phase close commits but never received the CLEAN-05 line-17 traceability template. Caught by V-61-03 (Plan 61-05) which counts traceability-comment-bearing reqs.

**Context:** Plan 61-02 scope was "flip 44 unchecked reqs"; the 13 already-`[x]` reqs were preserved byte-identical (correct for checkbox state) but their lack of traceability comments was undetected until V-61-03 enforced the standard universally. Auto-fixed in Plan 61-05 Task 1 commit `d80090c`.
**Source:** 61-05-SUMMARY.md deviation #1

---

### GFM heading-text != hyphenated slug — grep on slug doesn't match heading

Plan 61-01 acceptance criterion `grep -c "linux-provisioning" docs/index.md ≥ 2` returned only 1 match because the H2 heading text `## Linux Provisioning` (which generates GFM anchor `#linux-provisioning`) does NOT contain the literal hyphenated string. Only the jump-link bullet `[Linux Provisioning](#linux-provisioning)` matched.

**Context:** Plan acceptance criteria assumed grep would find both the heading AND the link reference; in practice it finds only the link. Functional state was correct (link points to existing anchor). No fix needed; lesson is for future plan acceptance criteria authoring.
**Source:** 61-01-SUMMARY.md deviation #3

---

### CONTEXT.md decisions can be stale relative to live tooling state

CONTEXT D-25 stated "no yml edit required" based on Phase 48 D-18 lazy-skip pattern interpretation. RESEARCH.md verified the live yml structure and found NO `check-phase-61` slot — file presence alone does NOT activate the lazy-skip; an explicit named job slot is required. RESEARCH OQ1 override was applied at Plan 61-05.

**Context:** CONTEXT.md is authored at discuss-phase time using prior-phase patterns; live tooling state can differ. RESEARCH-stage live verification (read the yml, count slots) caught the staleness before plan-phase locked the wrong assumption.
**Source:** 61-RESEARCH.md OQ1, 61-CONTEXT.md D-25 override note, 61-05-SUMMARY.md key-decisions

---

### Adversarial-review Referee can silently redefine an option

The Referee's GA1 verdict picked Option 1C ("Mixed — fix V-53-06 only; V-53-22 documented as carry-over") but its rationale described "fix the content" which would revert Phase 59 D-10 content evolution — that's actually Option 1D (revert), not the original 1C definition. User-corrected pick to 1A (refresh validator) after Phase 59 D-10 cross-check confirmed the supersession was deliberate.

**Context:** Adversarial review provides high-fidelity disprove scoring but the Referee's option-renaming can drift the picked option's actual semantics. Cross-checking the pick against the original option definition + relevant prior-phase D-NNs is necessary before locking.
**Source:** 61-DISCUSSION-LOG.md GA1, 61-CONTEXT.md D-05 ("NOT reverting Phase 59 content evolution")

---

### ROADMAP §Progress rows are stale tracking artifacts

ROADMAP §Progress showed Phase 50 + Phase 56 as "0/? Not started" despite both phases having shipped (verified via VERIFICATION.md presence + STATE.md decision-log entries). Phase 48 + Phase 49 showed "In Progress" despite chain validators passing. Plan 61-02 reconciled all 4 rows with completion dates from each phase's VERIFICATION.md frontmatter.

**Context:** ROADMAP §Progress is updated manually at phase close; phases that closed without explicit ROADMAP-row update leave stale tracking. Milestone close is the canonical reconciliation moment.
**Source:** 61-CONTEXT.md D-11, 61-02-SUMMARY.md ROADMAP reconciliation table

---

### Adversarial review with severity-downgrade overrides handles ambiguous CRIT severity

Phase 60 precedent allowed up to 2 referee severity-downgrades. Phase 61 GA1 + GA4 each had a CRIT concern (1A.CRIT-3 modify-validator-scope; 4A.CRIT-2 D-07 atomicity conflation) where the underlying issue was real but the severity was overstated. Both downgraded CRIT→MED preserved winner ordering while compressing the gap to runner-up.

**Context:** Severity calibration in adversarial review is itself adversarial — Finder over-flags, Referee balances. Allowing bounded downgrades prevents Referee from being trapped between accepting overstated CRITs or wrongly disproving real concerns. Phase 60 D-NNs documented the pattern explicitly.
**Source:** 61-CONTEXT.md D-07 + D-29, Phase 60 referee-overrides precedent in 60-CONTEXT.md

---

## Patterns

### Per-file conditional in frontmatter validation loops

When a CONTENT_FILES list includes both strict-contract files and cross-platform files, branch on file identity for assertion choice:
```javascript
for (const f of CONTENT_FILES) {
  const fm = readFrontmatter(f);
  if (f === IDX) {
    // permissive check for cross-platform index
    if (!fm.platform) FAIL(...);
  } else {
    // strict check for co-management files
    if (!/^platform: Windows\s*$/m.test(fm)) FAIL(...);
  }
}
```

**When to use:** Validator covers files with heterogeneous frontmatter contracts; one file is a special-case index/cross-platform variant; broad permissive regex would weaken pin on strict-contract files.
**Source:** 61-01-SUMMARY.md patterns-established, scripts/validation/check-phase-53.mjs V-53-06 refresh

---

### Scaffold H2 fulfillment when forward-promised phase ships

Forward-promise placeholder H2s (e.g., `## Related Patch Management Content (Phase 54 Forward-Promise)`) should be replaced with actual cross-links once the referenced phase ships. The placeholder body usually contains "When Phase NN ships, this section will be retrofitted with a direct cross-link" — that's an authoring contract, not a permanent state.

**When to use:** A pre-existing phase scaffolded a forward-promise section for content that has now shipped; current-phase cleanup encounters the scaffold and can fulfill it with a same-commit edit.
**Source:** 61-01-SUMMARY.md patterns-established, deviation #2

---

### Multi-phase traceability comment template (≤200 chars)

For requirements closed across multiple phases, use short-form comment template: `— completed YYYY-MM-DD in Phase NN (first pass; commits sha1) + Phase NN Plan NN-NN (second pass; commit sha2)`. Keeps comment readable in REQUIREMENTS.md inline context; cites both phases for full traceability.

**When to use:** Multi-phase requirements (e.g., AUDIT-08 spanning Phase 48 first-pass + Phase 60 second-pass + Phase 61 milestone close); CLEAN-06/CLEAN-07 (Phase 48 first-pass + Phase 60 second-pass).
**Source:** 61-02-SUMMARY.md tech-stack patterns, REQUIREMENTS.md AUDIT-08 traceability

---

### Pillar-cluster progressive-landing for milestone-close req flips

For milestone-close phases that flip many requirements grouped by pillar, use cluster-commit pattern: 1 commit per pillar (Pillar 1 / Pillar 2 / Pillar 3 / Pillar 4) + 1 reconciliation commit (ROADMAP/PROJECT/MILESTONES) = N+1 commits. Provides commit-level checkpoints + reviewable per-pillar diffs.

**When to use:** Milestone close with 20+ requirement flips spanning multiple coherent pillars; SC#3-style "all reqs flipped at phase close" mandate.
**Source:** 61-02-SUMMARY.md tech-stack patterns

---

### v1.4 frontmatter mirror + v1.5 body extensions (Path-A-copy-with-additions)

Milestone audit doc schema: keep prior-milestone frontmatter shape verbatim (cross-milestone schema continuity); layer milestone-specific narrative as body sections after frontmatter. New `mechanical_checks.results` keys (C6..C13 added in v1.5) extend the frontmatter map without breaking v1.4 schema readers.

**When to use:** Authoring a milestone-N+1 audit doc when a milestone-N predecessor exists; want lineage preservation but milestone-N+1 has unique structural changes (3-pillar / 14-phase / extended C-codes).
**Source:** 61-CONTEXT.md D-14..D-19, .planning/milestones/v1.5-MILESTONE-AUDIT.md

---

### Auditor-independence via worktree isolation

Spawn the auditor agent with `isolation: "worktree"` (gsd-executor) to satisfy auditor-independence rules. Records: worktree path, branch name, agent ID, spawn timestamp in audit doc body section. The worktree is structurally distinct from the main session worktree — different directory + different branch + different agent ID.

**When to use:** Milestone-close terminal re-audit; any phase requiring auditor distinct from content-author agents per CONTEXT D-22-style rule.
**Source:** 61-04-SUMMARY.md tech-stack patterns, 61-04-SUMMARY.md Task 0

---

### Atomic close commit + SHA-injection follow-up

When a close commit's content (e.g., audit doc body, traceability comment) needs to reference the close commit's own SHA, use 2-commit pattern: (1) atomic close commit lands the file with placeholder/empty SHA; (2) follow-up commit injects the close SHA into the placeholder. Cleaner audit trail than `--amend`.

**When to use:** Audit docs / traceability comments that cite the close commit by SHA; commit message convention forbids `--amend` on shared branches; want both SHAs visible in git log.
**Source:** 61-04-SUMMARY.md "Deviations from Plan", commits 690624d + 1195b49

---

### Separator-aware slice for markdown section extraction

For markdown section parsing where bullet content may contain `##` markers (links to anchors, code blocks, etc.), use `indexOf` boundary search rather than greedy regex lookahead:
```javascript
const start = content.indexOf('## SECTION_TITLE');
const sectionEnd = content.indexOf('\n---\n', start);  // section separator boundary
const section = content.slice(start, sectionEnd);
const subSectionEnd = section.indexOf('\n## ');  // next sibling H2 boundary inside the slice
```

**When to use:** Any milestone/phase entry parsing where the section delimiter is a stable token (`---`, `# H1`) and content may contain false-positive `## H2` markers.
**Source:** 61-05-SUMMARY.md tech-stack patterns, scripts/validation/check-phase-61.mjs V-61-18..20

---

### Stub-validator exclusion in CHAIN_PHASES

When some phases ship validator-as-deliverable artifacts and others (typically content phases without per-phase deliverables) ship only stub validators, explicitly exclude stubs from chain-validator CHAIN_PHASES arrays with an inline comment explaining the exclusion.

**When to use:** Per-phase chain regression-guards (V-NN-CHAIN); maintains valid exit-0 expectations on chain validators despite some phases having stubs.
**Source:** 61-RESEARCH.md OQ3, scripts/validation/check-phase-61.mjs CHAIN_PHASES comment

---

### CI yml lazy-skip slot insertion (override "no yml edit" claim)

Adding a new chain validator (`check-phase-NN.mjs`) requires inserting a NAMED job slot into the CI yml workflow. The lazy-skip pattern (Phase 48 D-18) means the slot does not block when the file is missing, but the slot itself must exist for the validator to run when present. File presence alone does NOT activate.

**When to use:** Any new per-phase validator authoring; verify the yml has a named slot before claiming "no yml edit needed" (CONTEXT D-25-style claims should be verified at RESEARCH stage).
**Source:** 61-RESEARCH.md OQ1, 61-05-SUMMARY.md key-decisions, .github/workflows/audit-harness-v1.5-integrity.yml

---

### Adversarial review with severity-downgrade overrides (max 2 per phase)

Standard adversarial review flow: Finder over-flags concerns by severity (LOW=+1 / MED=+5 / CRIT=+10). Adversary disproves with 2x penalty for wrong calls. Referee adjudicates. Allow Referee up to 2 severity-downgrade overrides per phase to handle ambiguous CRIT-vs-MED classification (e.g., real concern but overstated severity).

**When to use:** Gray-area decision-making where 4-option × 4-question adversarial scoring produces ambiguous Referee verdicts; surface decisions need user confirmation but Referee's analytical errors should be correctable without throwing out the whole review.
**Source:** Phase 60 precedent (60-CONTEXT.md), 61-CONTEXT.md D-07 + D-29 overrides

---

### Validator-as-deliverable per-phase chain (AUDIT-06 lineage)

Each new phase ships a `check-phase-NN.mjs` file-reads-only validator alongside content. The validator is committed to the phase directory's deliverable set; CI registers it via lazy-skip slot pattern. Chain validators enable cross-phase regression detection.

**When to use:** Any phase shipping content with structural invariants worth pinning; aligns with v1.3+ validator-as-deliverable discipline; supports milestone-close terminal re-audit chain.
**Source:** 61-CONTEXT.md D-24, scripts/validation/check-phase-{48..61}.mjs lineage

---

## Surprises

### Phase 60 explicitly punted V-53-06+22 as "Out of Scope per Orchestrator Boundary"

`60-VERIFICATION.md:325-345` documented V-60-14/16/21 chain regression-guards as "Pre-Existing Chain Regressions (Out of Scope)" because Phase 60's must_haves (AUDIT-03..07 + Phase 48 D-06 C9 promotion) didn't include cross-phase chain regression repair. Phase 61 picked up the alignment per SC#3 broad cleanup authority — the deferral was correct for Phase 60 scope discipline but introduced a coordination dependency.

**Impact:** Phase 61 Plan 61-01 absorbed cross-phase work that's structurally Phase 53/59-owned. Demonstrates value of explicit orchestrator-scope boundary documentation — the punt didn't disappear, it was queued for the right close-window phase.
**Source:** 60-VERIFICATION.md:325-345, 61-CONTEXT.md D-01 narrative

---

### Plan 61-04 audit doc references HEAD `a017737` (pre-Plan-61-04) as audit point

The auditor worktree (branch `worktree-agent-a5336372f28300cea`) was created from master HEAD `a017737` (Plan 61-03 close state). The audit doc records `head_sha_at_audit: a017737` — which is BEFORE Plan 61-04's own commits. This is correct per worktree-isolation semantics (auditor verifies the state Plans 61-01..03 produced, not its own subsequent commits) but visually surprising at first read.

**Impact:** The audit doc records a pre-self-commit state — that's the auditor-independence point. The auditor's own commits (`690624d` + `1195b49`) post-date the audit; the audit attests "this codebase state at SHA `a017737` passes all checks" which is the v1.5 close-state minus the audit-doc itself.
**Source:** 61-04-SUMMARY.md head_sha_at_audit metric, 61-VERIFICATION.md terminal_reaudit block

---

### check-phase-51 + check-phase-58 have pre-existing informational failures that exit 0

`check-phase-51.mjs` reports 22/25 PASS (V-51-06/07/09 informational); `check-phase-58.mjs` reports 24/26 PASS (V-58-09/10 informational). Despite the FAILs, both exit 0 (informational classification). Documented in audit doc Auditor-Independence Verification table.

**Impact:** Chain validator chain semantics: exit 0 ≠ all-PASS; informational FAILs are tracked but don't block. Future chain validator authoring should respect this distinction — the close gate is exit code, not assertion count.
**Source:** 61-04-SUMMARY.md Task 1 result table, 61-VERIFICATION.md chain_validators block

---

### check-phase-60 V-60-14 + V-60-21 resolved between Phase 60 close and Phase 61 start

Phase 60's deferred-items.md documented V-60-14 (check-phase-51 chain) + V-60-21 (check-phase-58 chain) as pre-existing failures. By Phase 61 start, both PASS. This is a positive regression (improvement, not degradation) — likely a side effect of Phase 60's other fixes propagating through the chain.

**Impact:** Phase 60 closed with 22/25 V-60-NN PASS; Phase 61's terminal re-audit found 25/25. Demonstrates that chain validators can self-heal as upstream phases ship — the deferred-items list is not necessarily a fixed backlog.
**Source:** 61-VERIFICATION.md "One minor note" + chain_validators block

---

### CONTEXT D-10 trumps acceptance criteria when they conflict

Plan 61-03's acceptance criterion stated `≥ 57` reqs in §Validated, but CONTEXT D-10 mandated AUDIT-08 stays in §Active until Plan 61-04 flip. The conflict was resolved in favor of CONTEXT D-10 (authoritative); §Validated count is 56, AUDIT-08 promotes at Plan 61-04.

**Impact:** Plan acceptance criteria authoring should cross-check CONTEXT D-NNs for timing constraints. When they conflict, CONTEXT (the locked-decision source) wins. Plan 61-03 SUMMARY explicitly documented the conflict resolution.
**Source:** 61-03-SUMMARY.md "Note on Validated Count (56 vs 57)" + "Deviations from Plan"

---

### v1.5 milestone shipped in 12 days — fastest milestone velocity to date

v1.5 spans 14 phases / 96+ plans / ~150 tasks across 2026-04-26 → 2026-05-07 (~12 days). Compared to prior milestone velocities (per STATE.md): v1.0=10 phases / v1.4=9 phases / 4 days; v1.4.1=5 phases / 1 day; v1.5 is the largest-scope milestone but at 12-day velocity is the fastest plans-per-day rate.

**Impact:** Wave-based parallel execution (Wave A Phases 51+53 concurrent; Wave B Phases 54+55+56 concurrent) + atomic-commit harness changes + progressive-landing patterns enabled the velocity. Future milestone planning can budget similar pace.
**Source:** STATE.md milestone velocity history, MILESTONES.md v1.5 entry timeline

---

### Adversarial review on 4 gray areas produced ~80 concerns; Adversary disproved 22

Finder produced 862 raw points (44 CRIT + 75 MED + 47 LOW = 442 concerns scored ×2-3) across 16 options. Adversary disproved 22 (13 CRIT × 10 + 8 MED × 5 + 1 LOW × 1 = 171 estimated points). Referee adjudicated all 22 disproves and applied 2 severity-downgrade overrides. User caught 1 Referee analytical error (silent option-redefinition on GA1).

**Impact:** Adversarial-review density on milestone-close gray areas is high (4-option × 5-7 questions × 5-6 concerns each); user oversight remained necessary even with finder/adversary/referee triangulation. Suggests adversarial-review works best as decision-support, not autonomous decision-making.
**Source:** 61-DISCUSSION-LOG.md scoring table, 61-CONTEXT.md methodology note

---

### check-phase-61.mjs shipped with 34 V-61-NN assertions (exceeds estimate)

CONTEXT D-24 estimated ~15-20 V-61-NN assertions; shipped count is 34. The expansion came from: 12 chain regression-guards (V-61-CHAIN-NN, one per Phase 48-60 excluding 50) + V-61-AUDIT subprocess + V-61-SELF-TEST subprocess + per-doc structural assertions (REQUIREMENTS / ROADMAP / PROJECT / audit doc / MILESTONES) for 4 surfaces × ~4 assertions each.

**Impact:** Estimate-vs-actual gap was on the upside (more rigor than planned); D-24's range was a minimum, not a target. Future check-phase-NN.mjs authoring can budget for ~25-35 assertions when chain coverage + structural verification overlap.
**Source:** 61-05-SUMMARY.md provides, scripts/validation/check-phase-61.mjs

---

### Plan 61-01 auto-fixed 2 blocking issues during execution

Plan 61-01's V-53-22 refresh discovered: (1) Phase 5[4-6] ban-pattern hits legitimate prose in CO_MGMT_FILES (e.g., "PITFALL-9 is covered in Phase 54..."); (2) pre-existing scaffold H2 in `03-cocmgmt-migration-paths.md` triggered the narrowed pattern. Both auto-fixed in same commit `18bd6df` (Rule 3 blocking).

**Impact:** Validator refresh + content alignment can surface latent issues in adjacent files. The narrowed pattern (`^## .*Phase 5[4-6]/m`) + scaffold-H2 fulfillment together eliminated false positives without weakening the contract. Demonstrates value of executor-agent autonomy for blocking-issue auto-fix when scope-bounded.
**Source:** 61-01-SUMMARY.md deviations #1 and #2

---

### Plan 61-05 auto-fixed 3 issues caught by check-phase-61.mjs validator

Plan 61-05's own validator caught 3 issues during pre-close gate: (1) 12 reqs missing traceability comments (V-61-03 FAIL); (2) PROJECT.md AUDIT-08 still in §Active (V-61-09 FAIL); (3) V-61-18..20 regex bug (V-61-19 FAIL). All 3 auto-fixed in same plan; final 34/34 PASS.

**Impact:** Validator-as-deliverable functioning as designed — the validator caught its own authoring environment's defects + cross-plan inconsistencies before close. Reinforces "ship validator alongside content" discipline pays off at close gate.
**Source:** 61-05-SUMMARY.md deviations #1-3

---

*Generated: 2026-05-07*
*Sources: 5 PLAN.md + 5 SUMMARY.md + 61-VERIFICATION.md + 61-CONTEXT.md + 61-RESEARCH.md + 61-DISCUSSION-LOG.md*
