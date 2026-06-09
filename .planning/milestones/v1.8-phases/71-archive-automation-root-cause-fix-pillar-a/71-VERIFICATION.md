---
phase: 71-archive-automation-root-cause-fix-pillar-a
verified: 2026-06-04
status: passed
score: 4/4 SC satisfied (ARCHIVE-01 + ARCHIVE-02 closure)
v71_final_state: "Plan 71-01 atomic SC#4 + Plan 71-02 chicken-and-egg resolution landed; Phase-71-OWNED validators (V-71-FIX-01/02 + V-71-MILESTONES-01 + V-71-ARCHIVE02-01 + V-71-AUDIT + V-71-SELF) all PASS post-Plan-71-02 SHA ff4514b; 8 pre-existing chain FAILs (V-71-CHAIN-{61..67, 70}) documented as CHAIN-DEGRADED-AT-HEAD-01 in v1.8-DEFERRED-CLEANUP.md routed to Phase 73 Pillar C SCOPE-GAP-RETRO-01 scope (NOT Phase 71 regression)."
overrides_applied: 0
re_verification:
  previous_status: in-progress
  previous_score: 2/3 plans complete
  gaps_closed: []
  gaps_remaining: []
  regressions: []
verifier_cross_check:
  verified: 2026-06-04
  verifier: Claude (gsd-executor at Plan 71-03 close-gate)
  status: passed
  goal_backward_evidence_count: 12
  observations:
    - "Plan 71-01 atomic SHA e4887b2: git show --name-only returns exactly 3 files (scripts/archive/extract-summary-oneliners.mjs + scripts/archive/test-extract-oneliner.mjs + scripts/validation/check-phase-71.mjs) — SC#4 byte-exact witness verified"
    - "Plan 71-02 SHA ff4514b: git show --name-only returns exactly 1 file (.planning/MILESTONES.md) — chicken-and-egg resolution per Phase 68 Plan 68-04 d142c7a MILESTONES.md-separation precedent"
    - "Predecessor-byte-unchanged invariant verified: git diff e4887b2^ HEAD -- v1.4/v1.4.1/v1.5/v1.6/v1.7 workflow YAMLs + harness MJS + sidecar JSONs returns EMPTY across Phase 71 window"
    - "V-71-MILESTONES-01 transition: FAIL @ e4887b2 (4 placeholder bullets: 3 in v1.2 H2 + 1 in v1.1 H2) -> PASS @ ff4514b (0 bullets) — chicken-and-egg resolved via REPLACEMENT FROM CANONICAL SOURCE per D-03 LOCKED Option D"
    - "V-71-ARCHIVE02-01 transition: FAIL @ e4887b2 -> PASS @ ff4514b — v1.1 + v1.2 H2 ranges scoped scan clean post-sweep"
    - "11-token PLACEHOLDER_TOKENS regex confirmed at check-phase-71.mjs (includes Edit \\d+ -- NEW DISCOVERY from D-03 advisor pre-sweep grep)"
    - "v1.7-milestone-audit.mjs exits 0 with 15/15 PASS unchanged at Plan 71-02 SHA ff4514b — predecessor-byte-unchanged invariant preserved"
    - "8 pre-existing chain FAILs V-71-CHAIN-{61..67, 70} persist at Plan 71-02 SHA per Plan 71-02 SUMMARY:88 disclosure — routed to v1.8-DEFERRED-CLEANUP.md CHAIN-DEGRADED-AT-HEAD-01 + Phase 73 Pillar C RETRO-01/02 (NOT a Phase 71 regression)"
    - "scripts/archive/extract-summary-oneliners.mjs --self-test exits 0 with '3 fixtures PASS'"
    - "scripts/archive/test-extract-oneliner.mjs exits 0 with 'Result: 3 PASS / 0 FAIL'"
    - "ARCHIVE-UPSTREAM-01 stub drafted in v1.8-DEFERRED-CLEANUP.md (Phase 74 HARNESS-12 inherits + finalizes the artifact per REQUIREMENTS.md:41 contract)"
    - "Rule 4 deviation documented at Plan 71-01 SUMMARY (user-authorized atomic-commit-with-transient-FAILs per Plan 70-05 Commit A 14683de precedent) — NOT a process regression"
overrides: []
gaps: []
deferred:
  - "ARCHIVE-UPSTREAM-01 — upstream PR to get-shit-done-cc phase-lifecycle-policy.ts:54-58 (DEFERRED to v1.9+; vendored fallback canonical until upstream lands; tracked in v1.8-DEFERRED-CLEANUP.md)"
  - "CHAIN-DEGRADED-AT-HEAD-01 — 8 pre-existing chain FAILs (V-71-CHAIN-{61..67, 70}) at HEAD due to HEAD-coupled assertions in check-phase-{61, 67}.mjs becoming stale post-v1.7-close (DEFERRED to Phase 73 Pillar C RETRO-01 + RETRO-02; tracked in v1.8-DEFERRED-CLEANUP.md)"
human_verification: []
---

# Phase 71 — Verification & Close-Gate Report

**Closed:** 2026-06-04 (Plan 71-03)
**Status:** passed
**Plan count:** 3/3 complete
**HEAD SHA at close:** populated post-commit (this close-gate commit lands traceability + verification artifact atomically; SHA self-reference impossible — recoverable via `git log --all --grep="71-03" --grep="close-gate" --all-match -1 --format=%H`)

---

## Section A — Phase 71 Goal Achievement

Phase 71 (Pillar A — Archive-Automation Root-Cause Fix) closes the **ARCHIVE-01** (root-cause fix for `gsd-sdk query milestone.complete` SDK extractor emitting placeholder-label garbage into MILESTONES.md milestone-close entries) and **ARCHIVE-02** (historical residue sweep across MILESTONES.md v1.0..v1.4.1 entries — v1.1 line 164 NEW DISCOVERY `Edit 1 --` + v1.2 lines 145-148 4-debris-line cluster) defects identified during v1.7 close 2026-05-29 (per `v1.7-DEFERRED-CLEANUP.md:14-50` ARCHIVE-01 + ARCHIVE-02 stub).

**3-plan cascade resolved 2 requirements (ARCHIVE-01 + ARCHIVE-02):**

| Plan | Requirement | Commit | Files | Atomic? |
|------|-------------|--------|-------|---------|
| 71-01 | ARCHIVE-01 (vendored extractor + fixture + chain-apex validator) | `e4887b2` | scripts/archive/extract-summary-oneliners.mjs (NEW) + scripts/archive/test-extract-oneliner.mjs (NEW) + scripts/validation/check-phase-71.mjs (NEW) | **ATOMIC** (3 files in ONE SHA per Phase 67 Plan 67-02 `55260b3` 5-file atomic-within-plan precedent + ROADMAP SC#4 byte-exact witness) |
| 71-02 | ARCHIVE-02 (re-author v1.1 + v1.2 H2 from MILESTONE-AUDIT canonical source) | `ff4514b` | .planning/MILESTONES.md (1 file) | per-plan (Phase 68 Plan 68-04 `d142c7a` MILESTONES.md-separation precedent; closes chicken-and-egg V-71-MILESTONES-01 + V-71-ARCHIVE02-01 FAIL → PASS) |
| 71-03 | close-gate (this commit) | `{phase_71_close_SHA}` | 71-VERIFICATION.md (NEW) + PROJECT.md + REQUIREMENTS.md + STATE.md + ROADMAP.md + v1.8-DEFERRED-CLEANUP.md (NEW) | per-plan (verification artifact + traceability flips + ARCHIVE-UPSTREAM-01 + CHAIN-DEGRADED-AT-HEAD-01 stubs) |

**Cascade narrative:**

1. **Plan 71-01** atomically landed the vendored corrected extractor + 3-case unit-test fixture + chain-apex validator in ONE SHA `e4887b2` per ROADMAP SC#4 byte-exact contract + Phase 67 Plan 67-02 `55260b3` atomic-within-plan precedent. The corrected regex `/^#[^\n]*\r?\n+\*\*One-liner:\*\*\s+([^\r\n]+)/m` at `scripts/archive/extract-summary-oneliners.mjs` anchors on the literal `**One-liner:**` label, capturing the VALUE (not the LABEL the upstream buggy regex `/^#[^\n]*\n+\*\*([^*]+)\*\*/m` returns). The 3-case test fixture at `scripts/archive/test-extract-oneliner.mjs` validates: (a) label-not-captured (value extracted from `**One-liner:** X`); (b) frontmatter pre-write idempotency; (c) CRLF tolerance. The chain-apex validator at `scripts/validation/check-phase-71.mjs` ships V-71-FIX-01 + V-71-FIX-02 + V-71-MILESTONES-01 + V-71-ARCHIVE02-01 + V-71-CHAIN-{48..70} + V-71-AUDIT + V-71-SELF assertions (29 total).

   At Plan 71-01 SHA `e4887b2`, V-71-MILESTONES-01 + V-71-ARCHIVE02-01 FAIL because Plan 71-02's sweep has not yet landed (chicken-and-egg per Plan 70-05 Commit A `14683de` documented-transient-RED precedent). This was Rule-4-escalation user-authorized as Option A (atomic-commit-with-transient-FAILs documented in SUMMARY).

2. **Plan 71-02** re-authored v1.1 H2 (lines 159-173 post-sweep) and v1.2 H2 (lines 138-153 post-sweep) in `.planning/MILESTONES.md` from canonical `.planning/milestones/v1.1-MILESTONE-AUDIT.md` (165 lines) + `.planning/milestones/v1.2-MILESTONE-AUDIT.md` (345 lines) source-of-truth per D-03 LOCKED Option D (REPLACEMENT FROM CANONICAL SOURCE, not deletion). 5 debris bullets surgically replaced with 5 canonical bullets per H2 (covering Phases 11-17 deliverables for v1.1; Phases 20-25 deliverables for v1.2). V-71-MILESTONES-01 + V-71-ARCHIVE02-01 flipped FAIL → PASS at SHA `ff4514b`. Symmetric with v1.6+v1.7 retroactive-authoring at v1.7 close 2026-05-29 ("DO NOT mask via deletion — investigate the script" doctrine honored via REPLACEMENT FROM CANONICAL SOURCE).

3. **Plan 71-03 (this commit)** lands the verification artifact (this file) + v1.8-DEFERRED-CLEANUP.md stub (ARCHIVE-UPSTREAM-01 + CHAIN-DEGRADED-AT-HEAD-01) + 4-doc traceability closure across PROJECT.md / REQUIREMENTS.md / STATE.md / ROADMAP.md.

---

## Section B — Commands Run + Exit Codes (Plan 71-03 Wave 1 full chain re-run, 2026-06-04)

Captured live during Plan 71-03 close-gate execution; output verbatim from `.claude/tmp/71-03-chain-rerun.txt`.

| Command | Exit Code | Summary Line |
|---------|-----------|--------------|
| `node scripts/archive/extract-summary-oneliners.mjs --self-test` | **0** | `3 fixtures PASS` |
| `node scripts/archive/test-extract-oneliner.mjs` | **0** | `Result: 3 PASS / 0 FAIL` (Fixture 1 label-not-captured + Fixture 2 pre-write idempotency + Fixture 3 CRLF tolerance) |
| `node scripts/validation/check-phase-48.mjs` | **0** | `Result: 7 PASS, 0 FAIL, 0 SKIPPED` |
| `node scripts/validation/check-phase-49.mjs` | **0** | `Summary: 22 passed, 0 failed, 0 skipped` |
| `node scripts/validation/check-phase-50.mjs` | **0** | `Summary: 26 passed, 0 failed, 0 skipped` |
| `node scripts/validation/check-phase-51.mjs` | **0** | `Summary: 25 passed, 0 failed, 0 skipped` |
| `node scripts/validation/check-phase-52.mjs` | **0** | `Summary: 22 passed, 0 failed, 0 skipped` |
| `node scripts/validation/check-phase-53.mjs` | **0** | `Summary: 26 passed, 0 failed, 0 skipped` |
| `node scripts/validation/check-phase-54.mjs` | **0** | `Summary: 32 passed, 0 failed, 0 skipped` |
| `node scripts/validation/check-phase-55.mjs` | **0** | `Summary: 32 passed, 0 failed, 0 skipped` |
| `node scripts/validation/check-phase-56.mjs` | **0** | `Summary: 32 passed, 0 failed, 0 skipped` |
| `node scripts/validation/check-phase-57.mjs` | **0** | `Summary: 26 passed, 0 failed, 0 skipped` |
| `node scripts/validation/check-phase-58.mjs` | **0** | `Summary: 26 passed, 0 failed, 0 skipped` |
| `node scripts/validation/check-phase-59.mjs` | **0** | `Summary: 36 passed, 0 failed, 0 skipped` |
| `node scripts/validation/check-phase-60.mjs` | **0** | `Result: 25 PASS, 0 FAIL, 0 SKIPPED` |
| `node scripts/validation/check-phase-61.mjs` | **1** | `Result: 33 PASS, 1 FAIL, 0 SKIPPED` — V-61-17 HEAD-coupled assertion stale post-v1.7-close (MILESTONES.md top-H2 = v1.7 not v1.5); routed to CHAIN-DEGRADED-AT-HEAD-01 (Phase 73 Pillar C scope) |
| `node scripts/validation/check-phase-62.mjs` | **1** | `Result: 33 PASS, 1 FAIL, 0 SKIPPED` — cascade via V-NN-CHAIN-61 wrapper (recursive subprocess chain traversal propagates V-61-17 FAIL) |
| `node scripts/validation/check-phase-63.mjs` | **1** | `Result: 30 PASS, 2 FAIL, 0 SKIPPED` — cascade via V-NN-CHAIN-{61, 62} |
| `node scripts/validation/check-phase-64.mjs` | **1** | `Result: 26 PASS, 3 FAIL, 0 SKIPPED` — cascade via V-NN-CHAIN-{61, 62, 63} |
| `node scripts/validation/check-phase-65.mjs` | **1** | `Result: 29 PASS, 4 FAIL, 0 SKIPPED` — cascade via V-NN-CHAIN-{61..64} |
| `node scripts/validation/check-phase-66.mjs` | **1** | `Result: 23 PASS, 5 FAIL, 0 SKIPPED` — cascade via V-NN-CHAIN-{61..65} |
| `node scripts/validation/check-phase-67.mjs` | **1** | `Result: 20 PASS, 8 FAIL, 0 SKIPPED` — V-67-05 + V-67-06 HEAD-coupled corpus assertions stale at v1.7-frozen SHA `aa6de68` (content drift since v1.7 close 2026-05-28; Plan 70-05 Commit A discovery per STATE.md:242 "deeper chicken-and-egg surface") + cascade |
| `node scripts/validation/check-phase-68.mjs` | **1** | `Result: 26 PASS, 7 FAIL, 0 SKIPPED` — cascade via V-NN-CHAIN-{61..67} |
| `node scripts/validation/check-phase-69.mjs` | **1** | `Result: 24 PASS, 7 FAIL, 0 SKIPPED` — cascade via V-NN-CHAIN-{61..67} |
| `node scripts/validation/check-phase-70.mjs` | **1** | `Result: 38 PASS, 8 FAIL, 5 SKIPPED` — cascade via V-70-CHAIN-{61..67} |
| `node scripts/validation/check-phase-71.mjs` | **1** | `Result: 21 PASS, 8 FAIL, 0 SKIPPED` — Phase-71-OWNED PASS (V-71-FIX-01/02 + V-71-MILESTONES-01 + V-71-ARCHIVE02-01 + V-71-AUDIT + V-71-SELF + V-71-CHAIN-{48..60}); 8 FAILs are V-71-CHAIN-{61..67, 70} pre-existing chain-degradation (NOT Phase-71-introduced; routed to CHAIN-DEGRADED-AT-HEAD-01 per `v1.8-DEFERRED-CLEANUP.md`) |
| `node scripts/validation/v1.7-milestone-audit.mjs` | **0** | `Summary: 15 passed, 0 failed, 0 skipped` (predecessor-byte-unchanged invariant preserved) |

**Chain re-run interpretation:**

- **All Phase-71-OWNED assertions PASS** at `check-phase-71.mjs`: V-71-FIX-01 + V-71-FIX-02 + V-71-MILESTONES-01 + V-71-ARCHIVE02-01 + V-71-AUDIT + V-71-SELF + V-71-CHAIN-{48..60} — 21 PASS out of 29.
- **Chain-cascade FAIL pattern** (V-71-CHAIN-{61..67, 70} at check-phase-71.mjs; mirrored at check-phase-{62..70}.mjs via recursive V-NN-CHAIN-NN wrapper subprocesses): The root failures at HEAD are V-61-17 (MILESTONES.md top-H2 drift) + V-67-05 + V-67-06 (v1.7-frozen-SHA content drift per Plan 70-05 Commit A STATE.md:242 disclosure). All downstream chain validators (check-phase-{62..70}) propagate those root failures through `execFileSync('node', [path], { stdio: 'pipe', timeout: 300000 })` subprocesses → exit-1 cascades up to chain apex. The PASS/FAIL counts grow proportionally with each step's CHAIN_PHASES range size (e.g., check-phase-62: 1 chain FAIL = V-62-CHAIN-61; check-phase-67: 8 FAILs = V-67-CHAIN-{61..67} effective propagation visible at 67 because its chain is {48..66}).
- **8 pre-existing chain FAILs persist** at v1.8-Phase-71 HEAD across both Plan 71-01 SHA `e4887b2` and Plan 71-02 SHA `ff4514b`: V-71-CHAIN-{61, 62, 63, 64, 65, 66, 67, 70}. These are NOT caused by Phase 71 deliverables — Plan 71-01 SUMMARY:76-85 disclosed them at Plan 71-01 SHA already, and Plan 71-02 SUMMARY:88 confirmed they persist post-sweep (sweep did NOT introduce them; sweep did NOT resolve them). Root cause: HEAD-coupled assertions in `check-phase-{61, 67}.mjs` becoming stale post-v1.7-close. Routed to `v1.8-DEFERRED-CLEANUP.md` CHAIN-DEGRADED-AT-HEAD-01 + Phase 73 Pillar C SCOPE-GAP-RETRO-01 scope per REQUIREMENTS.md:25-27.
- **Phase 70 standalone shows 5 SKIPPED entries** (V-70-CHAIN entries via execFileSync with `--missing-only` / `skip-if-missing` semantics or Phase 70 v1.7-frozen-aware reads at `aa6de68` placeholder per D-01 LOCKED routing) — independent of Phase 71's `{phase_71_close_SHA}` placeholder convention.
- **v1.7-milestone-audit.mjs 15/15 PASS unchanged** — predecessor-byte-unchanged invariant preserved (v1.4/v1.4.1/v1.5/v1.6/v1.7 workflows + harness MJS + sidecar JSONs all byte-unchanged across Phase 71 window per `git diff e4887b2^ HEAD -- <frozen surfaces>` returning EMPTY).
- **Phase 72 entry-gate UNBLOCKED**: The 8-FAIL chain-cascade pattern at HEAD is the EXPECTED state per Plan 71-01 SUMMARY:76-85 disclosure + Plan 71-02 SUMMARY:88 disclosure. Phase 72's surgical WRAPPER-01 fix at `check-phase-66.mjs:313` does NOT depend on V-71-CHAIN-{61..67, 70} passing — wrapper fix is an INDEPENDENT diagnostic-surface improvement that makes the V-61-17 + V-67-05/06 root-FAILs more visible (per `v1.7-DEFERRED-CLEANUP.md:177-178` — stderr-only wrapper masks stdout diagnostic detail). Post-WRAPPER-01 fix, Phase 73 RETRO-01 inventory will have empirical signature.

---

## Section C — SC#1-4 Satisfaction (ROADMAP.md Phase 71 SC#1-4)

### SC#1: Root-cause fix lands — corrected regex in vendored extractor — ✓ CLOSED

**Evidence:**
- `scripts/archive/extract-summary-oneliners.mjs` (NEW; 11,689 bytes) carries corrected regex `/^#[^\n]*\r?\n+\*\*One-liner:\*\*\s+([^\r\n]+)/m` at the `extractOneLinerFromBody` export, anchoring on the literal `**One-liner:**` label and capturing the VALUE (capture group 1) up to end of line
- Verified empirically against Phase 67 Plan 67-01 SUMMARY body shape (`**One-liner:** Verified 4 ABM URLs alive...`) — extractor returns the value, not the label
- Companion CLI surface accepts `--milestone <v>` + `--pre-write-frontmatter` + `--dry-run` + `--self-test` flags
- `--self-test` exits 0 with `3 fixtures PASS` (label-not-captured / pre-write idempotency / placeholder-allowlist scan)
- Caller's frontmatter-first preference at upstream `phase-lifecycle.ts:1693` (`(fm['one-liner'] as string | undefined) || extractOneLinerFromBody(content)`) routes around the still-broken upstream fallback per D-01 LOCKED Option B vendor-strategy

**Closing commit:** Plan 71-01 atomic SHA `e4887b2`

### SC#2: Regression-test fixture exists; exits non-zero on recurrence — ✓ CLOSED

**Evidence:**
- `scripts/archive/test-extract-oneliner.mjs` (NEW; 2,642 bytes) — 3-case unit-test fixture exercising: (a) label-not-captured (value extracted from `**One-liner:** X` body pattern); (b) pre-write frontmatter idempotency (no duplicate `one-liner:` field when top-level key already present); (c) CRLF tolerance
- `scripts/validation/check-phase-71.mjs` (NEW; 14,516 bytes) — chain-apex validator with V-71-MILESTONES-01 anchored-bullet regex scan over `.planning/MILESTONES.md` HEAD for 11 placeholder-label tokens (10 original + `Edit \\d+ --` NEW DISCOVERY from D-03 advisor)
- V-71-FIX-01 asserts `scripts/archive/extract-summary-oneliners.mjs` exists + contains corrected regex anchor
- V-71-FIX-02 asserts `scripts/archive/test-extract-oneliner.mjs` exists + 3-case fixture discoverable
- V-71-MILESTONES-01 anchored-bullet regex `^- (?:One-liner:|SUBSUMED BY PLAN|Hash:|Pre-edit:|Total file size:|File:|Insertion position:|Single deliverable:|Plan goal:|Found during:|Edit \d+ --)` — NOT raw substring (avoids false-positives on legitimate prose like "the one-liner field in frontmatter")
- V-71-ARCHIVE02-01 specifically asserts v1.1 + v1.2 H2 ranges in MILESTONES.md have zero placeholder-label residue
- Fixture exits non-zero (exit code 1) if any debris recurs in MILESTONES.md HEAD or if vendored extractor regex changes from the corrected form

**Closing commit:** Plan 71-01 atomic SHA `e4887b2` (V-71-FIX-01/02 + V-71-MILESTONES-01 + V-71-ARCHIVE02-01 all ship in this SHA)

### SC#3: Historical residue sweep — zero placeholder tokens remain — ✓ CLOSED

**Evidence:**
- `.planning/MILESTONES.md` v1.0..v1.4.1 entries scanned post-Plan-71-02 sweep — 0 placeholder-label bullets remain
- v1.2 H2 (lines 138-153 post-sweep): 4 debris bullets (3× `- One-liner:` at lines 145/146/148 + 1× `- Commit:` at line 147 pre-sweep) REPLACED with 5 canonical bullets covering Phases 20-25 deliverables per `v1.2-MILESTONE-AUDIT.md` Executive Summary + Requirements Coverage tables
- v1.1 H2 (lines 159-173 post-sweep): 1 debris bullet (`- Edit 1 -- docs/error-codes/00-index.md:` at line 164 pre-sweep — NEW DISCOVERY by D-03 advisor pre-sweep grep enumeration; NOT in `v1.7-DEFERRED-CLEANUP.md:38-48` known-sites list) REPLACED with 5 canonical bullets covering Phases 11-17 deliverables per `v1.1-MILESTONE-AUDIT.md` Phase Verification Summary
- v1.0 / v1.3 / v1.4 / v1.4.1 H2 entries: empirically clean per D-03 advisor pre-sweep grep enumeration (zero placeholder-label residue; byte-unchanged across Phase 71 window)
- v1.5 / v1.6 / v1.7 H2 entries: byte-unchanged (v1.5 was Plan 68-04 surgical-deletion `d142c7a`; v1.6 + v1.7 were retroactively-authored at v1.7 close 2026-05-29; all 3 outside ARCHIVE-02 sweep scope)
- V-71-MILESTONES-01 PASS post-sweep (was FAIL @ Plan 71-01 SHA `e4887b2`)
- V-71-ARCHIVE02-01 PASS post-sweep (was FAIL @ Plan 71-01 SHA `e4887b2`)
- REPLACEMENT FROM CANONICAL SOURCE doctrine honored per D-03 LOCKED Option D (symmetric with v1.6+v1.7 retroactive-authoring at v1.7 close)

**Closing commit:** Plan 71-02 SHA `ff4514b`

### SC#4: Closing commit SHA records atomic fix+fixture (byte-exact) — ✓ CLOSED

**Evidence:**
- Plan 71-01 atomic SHA `e4887b2` — `git show --name-only e4887b2 | grep -v '^$'` returns exactly 3 files:
  1. `scripts/archive/extract-summary-oneliners.mjs` (NEW — vendored extractor with corrected regex)
  2. `scripts/archive/test-extract-oneliner.mjs` (NEW — 3-case test fixture)
  3. `scripts/validation/check-phase-71.mjs` (NEW — chain-apex validator)
- Indivisible per ROADMAP SC#4 byte-exact contract + Phase 67 Plan 67-02 `55260b3` 5-file atomic-within-plan precedent
- Rollback semantics: `git revert e4887b2` cleanly restores pre-Plan-71-01 state by removing all 3 NEW files in one operation — full atomicity preserved per chain-validator + extractor + fixture indivisibility doctrine
- Predecessor-byte-unchanged: `git diff e4887b2^ HEAD -- .github/workflows/audit-harness-v1.{4,5,6,7}-integrity.yml scripts/validation/v1.{4,5,6,7}*.mjs scripts/validation/v1.7-audit-allowlist.json` returns EMPTY (verified Plan 71-03 Wave 1)

**Closing commit:** Plan 71-01 atomic SHA `e4887b2` (byte-exact witness; SC#4 satisfied verbatim per ROADMAP:327 contract)

---

## Section D — Atomic-Commit SHA Record

For v1.8-MILESTONE-AUDIT.md Phase 74 HARNESS-12 traceability sweep, the canonical Phase 71 closing SHAs are:

| Plan | Commit SHA | Files | Atomic? | Note |
|------|-----------|-------|---------|------|
| 71-01 | `e4887b2` (full: `e4887b2b7c06b6c3498ff7385a7903049f2b99c8`) | scripts/archive/extract-summary-oneliners.mjs (NEW) + scripts/archive/test-extract-oneliner.mjs (NEW) + scripts/validation/check-phase-71.mjs (NEW) (3 files) | **ATOMIC** | ARCHIVE-01 root-cause fix + regression fixture in ONE SHA per Phase 67 Plan 67-02 `55260b3` precedent. Transient: V-71-MILESTONES-01 + V-71-ARCHIVE02-01 expected FAIL at this SHA until Plan 71-02 lands (per **Plan 70-05 Commit A `14683de`** documented-transient-RED precedent; Rule-4 user-authorized Option A atomic-commit-with-transient-FAILs). |
| 71-02 | `ff4514b` (full: `ff4514bd2e716c601e2664dd95281b59034499b8`) | .planning/MILESTONES.md (1 file) | per-plan | ARCHIVE-02 v1.1 + v1.2 H2 re-authoring from MILESTONE-AUDIT canonical source per **Phase 68 Plan 68-04 `d142c7a`** MILESTONES.md-separation precedent. Closes chicken-and-egg: V-71-MILESTONES-01 + V-71-ARCHIVE02-01 flip FAIL → PASS at this SHA. |
| 71-03 | `{phase_71_close_SHA}` (literal placeholder; recoverable via `git log --all --grep="71-03" --grep="close-gate" --all-match -1 --format=%H` post-landing) | 71-VERIFICATION.md (NEW) + PROJECT.md + REQUIREMENTS.md + STATE.md + ROADMAP.md + v1.8-DEFERRED-CLEANUP.md (NEW) (6 files) | per-plan | Close-gate (verification artifact + ARCHIVE-UPSTREAM-01 + CHAIN-DEGRADED-AT-HEAD-01 stubs + 4-doc traceability flips). Plan 71-03's own SHA cannot be substituted before this commit lands per **Phase 68 Plan 68-05 / Phase 70 Plan 70-05 Commit B** chicken-and-egg precedent. |

**Atomic-commit precedent:** Phase 67 Plan 67-02 commit `55260b3` (atomic-within-plan 5-file commit: 2 corpus + 1 glossary + 1 sidecar + 1 NEW anchor inventory). Phase 71 Plan 71-01 inherits scope-down to 3 files (extractor + fixture + validator).

**Rollback semantics:**
- `git revert e4887b2` cleanly restores pre-Plan-71-01 state — removes all 3 NEW files in one operation (extractor + fixture + validator co-revert by design)
- `git revert ff4514b` cleanly restores v1.1+v1.2 entries to pre-sweep state WITHOUT touching the script fix (Plan 71-02 separately revertable per Phase 68 Plan 68-04 in-repo precedent for same defect class)
- Plan 71-03 close-gate commit is independently revertable (would re-introduce the 8-FAIL chain re-run state — but Phase 73 RETRO-01/02 closure mechanism is pre-specified in REQUIREMENTS.md:25-27 independent of close-gate landing)

**SHA-placeholder convention (Phase 68 Plan 68-05 / Phase 70 Plan 70-05 Commit B inheritance):** The `{phase_71_close_SHA}` placeholder in this Section D table + Section A multi-plan cascade table + PROJECT.md ARCHIVE-01 + ARCHIVE-02 Validated rows + ROADMAP.md Phase 71 row is the chicken-and-egg accepted residual. Recovery: `git log --all --grep="71-03" --grep="close-gate" --all-match -1 --format=%H` post-landing.

---

## Section E — Discoveries Surfaced During Execution

Phase 71 execution surfaced these items NOT anticipated by ROADMAP Phase 71 SC#1-4 nor by 71-CONTEXT.md D-01..D-04. Documented for v1.8-DEFERRED-CLEANUP.md routing + Phase 72/73/74 forward coordination.

### Discovery #1: v1.1 line 164 `Edit N --` token-class NEW (D-03 advisor pre-sweep grep)

**Surfaced:** D-03 advisor pre-sweep grep enumeration (2026-06-03 during /gsd-discuss-phase 71 dispatch).

**Root finding:** v1.1 H2 (line 164 of `.planning/MILESTONES.md` pre-sweep) contained `- Edit 1 -- docs/error-codes/00-index.md:` — a structurally distinct placeholder-label token NOT in the `v1.7-DEFERRED-CLEANUP.md:38-48` known-sites list of 10 tokens (`One-liner:` / `SUBSUMED BY PLAN` / `Hash:` / `Pre-edit:` / `Total file size:` / `File:` / `Insertion position:` / `Single deliverable:` / `Plan goal:` / `Found during:`). The `Edit N --` pattern is from an EARLIER archive-defect class predating cdcce23 (the v1.5 close defect surfaced at v1.7-DEFERRED-CLEANUP.md:14-50 ARCHIVE-01).

**Adversarial wedge:** D-03 advisor used this NEW DISCOVERY to fatally wedge Options A (v1.2-only deletion misses v1.1 line 164) and C (validate-then-sweep depends on D-02 fixture token-coverage design — `Edit N --` wasn't in the original 10-token list). D-03 Option D (REPLACEMENT FROM CANONICAL SOURCE) was the only option robust to the NEW DISCOVERY because it re-authors from `v1.1-MILESTONE-AUDIT.md` source-of-truth which has no debris.

**Resolution mechanism (Plan 71-01 Wave 3 + Plan 71-02 Wave 2):**

1. Plan 71-01 added `'Edit \\d+ --'` as the 11th entry in `PLACEHOLDER_TOKENS` array at `scripts/validation/check-phase-71.mjs` (regex-fragment, not literal)
2. The `buildGarbageRegex()` escape-branch logic at the regex-compilation step uses `t === 'Edit \\d+ --' ? t : t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')` — passing the regex fragment through unchanged while escaping literal tokens
3. V-71-MILESTONES-01 + V-71-ARCHIVE02-01 then match the v1.1:164 residue alongside the v1.2:145-148 4-debris-line cluster
4. Plan 71-02 re-authoring of v1.1 H2 from `v1.1-MILESTONE-AUDIT.md` canonical source replaced the truncated `Edit 1 --` bullet with a 5-bullet canonical block covering Phases 11-17 deliverables (the 5th bullet semantically restores what the truncated debris was attempting to cite: Intune Connector + 30-entry consolidated error-code reverse-lookup table + navigation hub updates at `docs/error-codes/00-index.md`)

**Future-class flag in v1.8-DEFERRED-CLEANUP.md:** Future archive-defect classes may surface ADDITIONAL token-classes beyond the current 11. The `check-phase-71.mjs` PLACEHOLDER_TOKENS array is the canonical extension surface. The escape-branch mechanism lets future authors add regex-fragment tokens alongside literal tokens. Tracked in `v1.8-DEFERRED-CLEANUP.md` "v1.1 line 164 `Edit N --` token-class" entry.

### Discovery #2: ARCHIVE-UPSTREAM-01 — upstream PR follow-up deferred per D-01 LOCKED Option B

**Surfaced:** D-01 advisor adversarial-review (2026-06-03 during /gsd-discuss-phase 71 dispatch).

**Root finding:** The buggy regex `/^#[^\n]*\n+\*\*([^*]+)\*\*/m` at `C:\Users\<user>\AppData\Roaming\npm\node_modules\get-shit-done-cc\sdk\src\query\phase-lifecycle-policy.ts:54-58` is the canonical root cause of the placeholder-label garbage emission. The regex captures the bolded LABEL ("One-liner:") instead of the VALUE that follows it.

**D-01 LOCKED Option B (vendor + frontmatter pre-write) chosen over Option A (block on upstream PR):** Option A's nominal score-9 misleads — Axis 2 (v1.8-close-not-blocked) is a HARD GATE per REQUIREMENTS.md priority. Fixing the bug in another repo entirely cannot satisfy Phase 71 SC#4 ("closing commit SHA confirming the fix lands atomically with the regression fixture") because there IS no fix-landing in THIS repo under Option A. Vendoring localizes the fix in-repo (`scripts/archive/extract-summary-oneliners.mjs`) while leaving the upstream-PR cadence as a v1.9+ deferral.

**Resolution mechanism (Plan 71-01 + Plan 71-03 stub):**

1. Plan 71-01 vendored the corrected extractor at `scripts/archive/extract-summary-oneliners.mjs` with CLI surface (`--milestone <v>` + `--pre-write-frontmatter` + `--dry-run` + `--self-test`)
2. Phase 74 HARNESS-12 plan-phase MAY add a Wave-1 pre-step `node scripts/archive/extract-summary-oneliners.mjs --milestone v1.8 --pre-write-frontmatter` immediately before `/gsd:complete-milestone v1.8` for defense-in-depth (per D-01 LOCKED + 71-CONTEXT.md line 71)
3. Plan 71-03 (this commit) drafts the `ARCHIVE-UPSTREAM-01` stub in `v1.8-DEFERRED-CLEANUP.md` documenting: upstream defect site + corrected regex proposal + in-repo precedent (Plan 71-01 SHA `e4887b2`) + trigger gate for deprecation (upstream release + project pin) + routing decision (v1.9+; NOT gated on for v1.8 close)
4. When upstream `get-shit-done-cc` releases corrected version + Autopilot project pins to it, Phase 75+ deprecates the vendored `scripts/archive/extract-summary-oneliners.mjs` (removes 3 files + V-71-FIX-01/02 assertions)

**Status:** Vendored fallback canonical in-repo until upstream lands. Upstream PR work deferred to v1.9+. Phase 74 HARNESS-12 inherits this stub and finalizes the v1.8-DEFERRED-CLEANUP.md artifact at v1.8 milestone close per REQUIREMENTS.md:41 contract.

### Discovery #3: CHAIN-DEGRADED-AT-HEAD-01 — 8 pre-existing chain FAILs at HEAD (SCOPE-GAP-RETRO-01 class)

**Surfaced:** Plan 71-01 pre-commit dry-run (per 71-01-SUMMARY.md:76-85) + Plan 71-02 pre-commit dry-run (per 71-02-SUMMARY.md:88) + Plan 71-03 chain re-run (Section B above).

**Root finding:** 8 chain-validator FAILs persist at v1.8-Phase-71 HEAD across Plan 71-01 SHA `e4887b2` + Plan 71-02 SHA `ff4514b`: **V-71-CHAIN-{61, 62, 63, 64, 65, 66, 67, 70}**. Root causes:

- V-71-CHAIN-61: V-61-17 in `check-phase-61.mjs` asserts `.planning/MILESTONES.md` top-H2 = `## v1.5` but HEAD shows `## v1.7` (top-H2 drift post-v1.7-close manual re-authoring 2026-05-29) — HEAD-coupled assertion stale
- V-71-CHAIN-67: V-67-05 + V-67-06 in `check-phase-67.mjs` assert OP-10 callouts + Version History rows at v1.7-frozen SHA `aa6de68` — but `aa6de68` is the Atom 2 SHA, not the Commit-B SHA that authors the corpus content the validator expects (per Plan 70-05 Commit A discovery at STATE.md:242 "deeper chicken-and-egg surface beyond Wave-5-Commit-B deliverable references")
- V-71-CHAIN-{62..66}: cascade via V-NN-CHAIN-61 chain wrapper (recursive chain traversal propagates V-61-17 FAIL)
- V-71-CHAIN-70: cascade via V-70-CHAIN-{61..67}

**Why this is NOT a Phase 71 regression:** The 8 FAILs pre-existed Plan 71-01 SHA `e4887b2` (Plan 71-01 SUMMARY:76-85 disclosed them). Plan 71-02 sweep did NOT introduce them (Plan 71-02 SUMMARY:88 confirms persistence). They are HEAD-coupled assertion staleness from v1.7-close planning-doc + corpus drift — the SAME defect class that `v1.7-DEFERRED-CLEANUP.md:52-66` HARNESS-FORWARD-01 + `v1.7-DEFERRED-CLEANUP.md:110-131` SCOPE-GAP-61 entries routed forward.

**Resolution mechanism (Phase 73 Pillar C — RETRO-01 + RETRO-02 per REQUIREMENTS.md:25-27):**

- **RETRO-01** (class-wide scan): Phase 73 plans inventory all HEAD-coupled assertions in `check-phase-{48..66}.mjs` (19 validators) whose docstrings cite milestone-close state. V-61-17 + V-67-05 + V-67-06 will be in this inventory.
- **RETRO-02** (per-validator conversion): Phase 73 plans convert each identified assertion to v1.5/v1.6/v1.7-frozen-aware via SHA-pinned helpers parallel to existing `readRequirementsAtV15Close()` / `readRoadmapAtV15Close()` / `readCorpusFileAtV17Close()` (introduced Plan 68-03 Task 1 `d7d7d5f` + Plan 69-02 Fix-2 `2d61981` + Plan 70-01 Wave 1 scaffold). Mechanism: `execFileSync('git', ['show', '<frozen-SHA>:<path>'])`.

**Why not Phase 72 Pillar B (WRAPPER-01) scope:** Pillar B is the single-line `check-phase-66.mjs:313` stderr→stdout+stderr wrapper fix. WRAPPER-01 fixes the *diagnostic-masking* surface that hid SCOPE-GAP-61 on Windows local for 2 weeks; it does NOT convert HEAD-coupled assertions. Phase 72 entry-state is unblocked by Phase 71 close (vendored extractor in place + MILESTONES.md clean) regardless of the 8 V-71-CHAIN-{61..67, 70} pre-existing FAILs.

**Scope-discipline guardrail (REQUIREMENTS.md:27):** If Phase 73 RETRO-01 scan surfaces SCOPE-GAP-class discoveries beyond the initial 8-FAIL inventory documented here, route to v1.9+ rather than ballooning v1.8.

**Status:** STUB drafted in `v1.8-DEFERRED-CLEANUP.md` CHAIN-DEGRADED-AT-HEAD-01 entry. Resolution mechanism pre-specified in REQUIREMENTS.md Phase 73 contract. Phase 74 HARNESS-12 will transition this entry from STUB → CLOSED at v1.8 milestone close (or alternately at Phase 73 close-gate, depending on Phase 73 plan structure).

### Discovery #4: Rule 4 deviation log — Plan 71-01 expanded transient state authorized via user Option A

**Surfaced:** Plan 71-01 pre-commit dry-run revealed 2 expected transient FAILs (V-71-MILESTONES-01 + V-71-ARCHIVE02-01) PLUS 8 pre-existing chain FAILs (Discovery #3 above) — total 10 FAIL signature `19 PASS, 10 FAIL, 0 SKIPPED` (exit 1).

**Why Rule 4 escalation triggered:** Plan 71-01 plan body anticipated only 2 chicken-and-egg transient FAILs (V-71-MILESTONES-01 + V-71-ARCHIVE02-01). The additional 8 pre-existing chain FAILs surfaced during pre-commit dry-run were NOT in plan scope — they qualify as Rule 4 architectural decision (whether to commit Plan 71-01 with EXPANDED transient state).

**User selection at checkpoint:** Option A — atomic 3-file commit with TRANSIENT FAILs DOCUMENTED in SUMMARY (preserve atomic SC#4 contract; defer 8-FAIL retrospective scope to Phase 73 Pillar C). Per Plan 70-05 Commit A `14683de` documented-transient-RED precedent.

**Resolution mechanism (preserved at Plan 71-01 commit):**

1. Plan 71-01 atomic SHA `e4887b2` lands all 3 files in ONE SHA per SC#4 byte-exact contract
2. 71-01-SUMMARY.md §"Transient States Landed at This SHA" lines 61-95 documents both transient categories: (a) Phase-71-OWNED (resolved by Plan 71-02 sweep) and (b) Pre-existing chain degradation (NOT caused by Phase 71)
3. Plan 71-02 SHA `ff4514b` flips transient category (a) FAIL → PASS
4. Plan 71-03 (this commit) drafts CHAIN-DEGRADED-AT-HEAD-01 stub in `v1.8-DEFERRED-CLEANUP.md` for transient category (b), routing to Phase 73 Pillar C RETRO-01/02

**This is NOT a process regression:** The Rule 4 escalation was correctly identified at pre-commit dry-run, user-authorized at checkpoint, documented in Plan 71-01 SUMMARY, and resolved through pre-specified mechanisms in REQUIREMENTS.md (Phase 73 contract). The chicken-and-egg accepted-residual pattern is the same as Phase 68 Plan 68-05 (`{68_05_SHA}` placeholder) + Phase 69 Plan 69-02 (`{69_02_SHA}` placeholder) + Phase 70 Plan 70-05 Commit B (`{phase_70_close_SHA}` placeholder) — accepted-residual is the project's standard close-gate mechanism for chicken-and-egg SHA self-reference.

---

## Section F — Phase 72 / Pillar B Readiness Signal

Phase 71 close-gate satisfies all prerequisites for Phase 72 Pillar B (CHAIN-WRAPPER-01 chain-apex stderr-only wrapper fix at `check-phase-66.mjs:313`) entry:

- **MILESTONES.md is clean** — v1.1 + v1.2 H2 entries re-authored from canonical audit-doc source per D-03 LOCKED Option D; V-71-MILESTONES-01 PASSES on HEAD (anchored 11-token regex `^- (?:One-liner:|...|Edit \d+ --)` returns 0 matches)
- **CHAIN_SKIP = []** confirmed across check-phase-{62..66}.mjs (per Phase 68 `7b635ca` invariant); empty-Set inheritance preserved in `scripts/validation/check-phase-71.mjs` V-71-SELF
- **Vendored extractor in place** — `scripts/archive/extract-summary-oneliners.mjs` (Plan 71-01 SHA `e4887b2`) ready for Phase 74 HARNESS-12 plan-phase Wave-1 invocation `node scripts/archive/extract-summary-oneliners.mjs --milestone v1.8 --pre-write-frontmatter` before `/gsd:complete-milestone v1.8` (defense-in-depth per D-01 LOCKED Option B)
- **ARCHIVE-UPSTREAM-01 stub drafted** in `v1.8-DEFERRED-CLEANUP.md` (Phase 74 HARNESS-12 finalizes the artifact per REQUIREMENTS.md:41 contract)
- **CHAIN-DEGRADED-AT-HEAD-01 stub drafted** in `v1.8-DEFERRED-CLEANUP.md` (Phase 73 Pillar C RETRO-01 + RETRO-02 resolves; SCOPE-GAP-RETRO-01 class pre-specified in REQUIREMENTS.md:25-27)
- **Phase-71-OWNED validators all PASS** at this close-gate: V-71-FIX-01 + V-71-FIX-02 + V-71-MILESTONES-01 + V-71-ARCHIVE02-01 + V-71-AUDIT + V-71-SELF + V-71-CHAIN-{48..60, 68, 69} (21 PASS)
- **Predecessor-byte-unchanged invariant preserved** — v1.4/v1.4.1/v1.5/v1.6/v1.7 workflow YAMLs + harness MJS + sidecar JSONs all byte-unchanged across Phase 71 window per `git diff e4887b2^ HEAD -- <frozen surfaces>` returning EMPTY (verified Plan 71-03 Wave 1)

**Phase 72 entry-phase contract:** CHAIN-WRAPPER-01 surgical fix at `check-phase-66.mjs:313` does NOT depend on V-71-CHAIN-{61..67, 70} passing — the 8 pre-existing FAILs are diagnostic-masked by the SAME stderr-only wrapper that Phase 72 is fixing. Post-WRAPPER-01 fix, the diagnostic detail for V-61-17 + V-67-05/06 will surface in stdout per the recommended `(err.stderr || '').toString() + (err.stdout || '').toString()` capture pattern (`v1.7-DEFERRED-CLEANUP.md:181-186`), giving Phase 73 RETRO-01 inventory the empirical signature it needs.

---

## Section G — Sign-Off

- ✓ **ARCHIVE-01 closed** (vendored extractor at `scripts/archive/extract-summary-oneliners.mjs` with corrected regex `/^#[^\n]*\r?\n+\*\*One-liner:\*\*\s+([^\r\n]+)/m`; companion `--self-test` 3 fixtures PASS + `test-extract-oneliner.mjs` 3 cases PASS; `check-phase-71.mjs` V-71-FIX-01/02 PASS — Plan 71-01 atomic SHA `e4887b2`)
- ✓ **ARCHIVE-02 closed** (v1.1 + v1.2 H2 entries re-authored from `.planning/milestones/v1.1-MILESTONE-AUDIT.md` + `.planning/milestones/v1.2-MILESTONE-AUDIT.md` canonical source-of-truth per D-03 LOCKED Option D REPLACEMENT-not-deletion; V-71-MILESTONES-01 + V-71-ARCHIVE02-01 PASS post-Plan-71-02 SHA `ff4514b`)
- ✓ **SC#1-4 all satisfied** (corrected regex lands; regression-test fixture in place; historical residue swept; atomic SHA `e4887b2` records SC#4 byte-exact compliance)
- ✓ **2/2 Phase 71 requirements closed** (ARCHIVE-01 + ARCHIVE-02 Active → Validated)
- ✓ **3/3 Plans complete** (71-01 atomic + 71-02 re-author + 71-03 close-gate)
- ✓ **Phase 71 closed 2026-06-04**

---

*Phase 71 verification artifact authored across 3 plans: Plan 71-01..02 contributed implementation evidence captured in per-plan SUMMARY files; Plan 71-03 close-gate appended Section A goal achievement narrative + Section B Commands evidence + Section C SC#1-4 satisfaction + Section D Atomic-Commit SHA Record + Section E Discoveries (4 entries: v1.1 line 164 token-class NEW DISCOVERY + ARCHIVE-UPSTREAM-01 deferral + CHAIN-DEGRADED-AT-HEAD-01 routing + Rule 4 deviation log) + Section F Phase 72 entry-state readiness signal + Section G Sign-Off into this final form.*
