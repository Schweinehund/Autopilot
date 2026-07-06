---
phase: 119-frozen-surface-re-baseline-13th-path-a-lineage-bump-terminal
plan: 05
subsystem: milestone-close-harness
tags: [remediation-slot, axis-2-arm, c15-false-positive, abaudit-exemption, chain-apex-red, predecessor-drift, honest-accounting, blocked]
status: FIRED — partial (harness-run greened; chain apex RED on 3 predecessors — SECOND remediation required, reported for decision)
requires:
  - "119-03 Atom 2 commit 5ec0f87 (armed Axis-2 run 28823233887)"
  - "119-04 authoritative Axis-2 verdict = APEX RED (this slot fires)"
provides:
  - "C15 harness-run greened: two owner-reviewed Phase-1-doc false-positive ABAUDIT exemptions (ABAUDIT-26 iOS, ABAUDIT-27 macOS)"
  - "Axis-2 re-push run 28824259217 (harness-run PASS 16/0; continuity leaves 113..118 PASS; apex RED on check-phase-50/52/65)"
  - "Actionable predecessor-drift worklist for the SECOND remediation (V-50-18, V-52-07, V-65-06)"
affects:
  - "119-06/07 close-gate: BLOCKED until the SECOND predecessor-validator remediation greens the Axis-2 apex"
tech-stack:
  added: []
  patterns: [abaudit-fp-exemption, single-line-html-comment-allowlist, dual-apex-ci, honest-accounting-red-then-green]
key-files:
  created:
    - .planning/phases/119-frozen-surface-re-baseline-13th-path-a-lineage-bump-terminal/119-05-SUMMARY.md
  modified:
    - docs/admin-setup-ios/02-abm-token.md
    - docs/admin-setup-macos/01-abm-configuration.md
decisions:
  - "C15 fix = owner-decided ABAUDIT exemption (single physical line, immediately before the tripping line, no blank between); ZERO technical prose changed; fallback reword NOT needed (C17 stayed green)"
  - "Second C15 false positive (01-abm-configuration.md:73) was masked in the original diagnosis (harness reports violations[0] only); resolved with the SAME owner-blessed ABAUDIT mechanism — this file already carried ABAUDIT-01 for the identical regex-7 class"
  - "Apex RED on check-phase-50/52/65 is the v1.14-predicted predecessor-drift failure mode — REPORTED for a decision, NOT fixed blind (per plan critical-reminder)"
metrics:
  duration: ~35min
  completed: 2026-07-06
  tasks: 2
  files: 2
---

# Phase 119 Plan 05: EMERGENT Chain-Health Remediation Slot — C15 FP Exemptions (Axis-2 Partial-Green) Summary

**The pre-authorized remediation slot FIRED** (Plan 119-04 authoritative Axis-2 GHA apex came back RED). The
owner-decided fix greened the v1.15 **harness-run** job (C15 false positive), which un-skipped the chain — but the
authoritative Axis-2 chain **apex is still RED** on three genuinely-predecessor content-drift failures
(check-phase-50 / 52 / 65). Per the plan's critical-reminder, that second, genuinely-predecessor failure is
**reported for a decision, not fixed blind**. This SUMMARY records the RED→partial-green intermediate state honestly.

## Fire/Skip Gate (Task 1)

**Verdict: APEX RED → slot FIRES.**

- **Pre-remediation (discarded) RED run:** Axis-2 GHA `28823233887` (headSha `5ec0f87`, event `pull_request`,
  workflow "Audit Harness v1.15 Integrity") — conclusion **failure**.
- **Job map (pre-remediation):** `Run v1.15 milestone audit harness` = **failure** (15 PASS / 1 FAIL); every
  downstream chain job (`check-phase-113..119`, `linux-chain-ubuntu-latest`, advisory) = **skipped** (they
  `needs: harness-run`). So the original RED was NOT a predecessor-chain failure — it was the v1.15 harness's own
  **C15** on a Phase-1 live doc.
- **Root cause (C15):** `C15: Intune-delegation anti-pattern guard` (`v1.15-milestone-audit.mjs:713-758`) tripped
  on Phase-117 EEE-reformatted admin-setup docs where dual-portal role prerequisites sit in incidental proximity.
  Confirmed **false positive** — the docs correctly name the Intune Administrator role (Intune admin center) AND
  the ABM Device Manager/Administrator role (Apple Business Manager); no Intune-delegation anti-pattern is committed.

## Remediation (Task 2) — C15 harness-run greened

Applied the harness's **designed FP-suppression mechanism**: a single physical-line
`<!-- ABAUDIT-NN: ... -->` comment placed **immediately before** each tripping line (no blank line between), so
C15's per-line allowlist (`allowlist.add(i); allowlist.add(i+1)`) exempts the comment line AND the paragraph line
(AEAUDIT-04 precedent). **Zero technical prose changed.**

| File | Line | Regex | ABAUDIT | Why it is a genuine FP |
|------|------|-------|---------|------------------------|
| `docs/admin-setup-ios/02-abm-token.md` | 19 (Summary) | regex 8 (`Intune admin ... Apple Business`) | **ABAUDIT-26** | Summary names dual-portal role prerequisites; incidental proximity, not delegation (owner-decided fix) |
| `docs/admin-setup-macos/01-abm-configuration.md` | 73 | regex 7 (`Managed Apple ID` neg-lookahead) | **ABAUDIT-27** | "What breaks" warning contrasting personal vs Managed Apple ID for ADE-token renewal; EEE #12 blockquote split isolated the sentence outside the 160-char exempting window |

**Honest scope deviation (vs prediction):** D-119-3 predicted the remediation would touch only predecessor
`check-phase-NN` validators. The ACTUAL C15 failure is a **Phase-1-doc false positive**, so the fix is a
Phase-1-doc ABAUDIT exemption — NOT a predecessor-validator edit. This is the least-invasive correct means to
green the authoritative harness-run and is an honest scope deviation, not a violation.

**Second FP was masked:** the original diagnosis named only `02-abm-token.md:19` because the harness reports
`violations[0]` only. Local verification revealed a second genuine C15 FP on `01-abm-configuration.md:73` (the same
regex-7 class this file already carries an `ABAUDIT-01` exemption for at line 66). Resolved with the same
owner-blessed mechanism and documented as an in-class scope expansion.

**Integrity attestations for this remediation:**
- **NO value-masking** — no expected value bumped; only two inert HTML-comment lines added.
- **NO frozen surface edited in the predecessor sense** — both files are Phase-1 surfaces intentionally
  re-baselined this milestone; NO non-Phase-1 predecessor frozen surface touched.
- **NO predecessor `check-phase-NN` validator edited.**
- **CHAIN_SKIP left EMPTY everywhere** (untouched).

**Local verification (both green):**
- `node scripts/validation/c17-eee-contract.mjs` → **exit 0** (174 files checked, 0 violations — the ABAUDIT
  comments did NOT break C17 Summary detection; fallback reword NOT needed).
- `node scripts/validation/v1.15-milestone-audit.mjs --verbose` → **16 PASS / 0 FAIL / 0 SKIPPED** (C15 now PASS).

**Commit:** `ad583fd` `fix(119-05): chain-health remediation — C15 Phase-1-doc false-positive ABAUDIT exemptions
(no value-mask, CHAIN_SKIP ∅)` — explicit `git add` of exactly the two doc files (2 insertions, no deletions).

## Re-push + re-audit — the authoritative Axis-2 chain now RUNS but the APEX is RED

Fast-forwarded PR branch `phase-119-atom-2` (`git push origin master:phase-119-atom-2`, `5ec0f87..ad583fd`,
PR #2 base master). The `synchronize` event fired a **fresh Axis-2 run: `28824259217`** (headSha `ad583fd`).

**New run job map (`28824259217`, conclusion = failure):**

| Job | Conclusion |
|-----|------------|
| Parse v1.15 sidecar JSON | success |
| Harness references v1.15 sidecar | success |
| **Run v1.15 milestone audit harness** | **success** ✅ (C15 remediation confirmed on Linux) |
| check-phase-113 / 114 / 115 / 116 / 117 / 118 validator (continuity leaves) | success ✅ |
| Supervision-pin drift advisory (CI) | success |
| Quarterly c13_rotting_external link-check | skipped (cron-gated) |
| **check-phase-119 validator (apex; recursively spawns 48..118)** | **failure** ❌ |
| **Validator chain on Linux LF (Phase 69 CILINUX-01)** | **failure** ❌ |

So the C15 fix **fully achieved its purpose** (harness-run PASS → chain un-skipped → all six continuity leaves
GREEN), but the **dual-apex recursion is RED**: 68 PASS / 3 FAIL per apex run (136/6 across both apex jobs). This
is the **v1.14-predicted predecessor-drift failure mode** (v1.14's first Axis-2 was also leaf-green / apex-RED and
needed predecessor remediation).

### Predecessor-drift worklist (the SECOND remediation — REPORTED, NOT ATTEMPTED)

All three reproduce **locally** (not Linux-specific) — genuine corpus-evolution failures from the Phase-116/117/118
EEE #12 blockquote-split + Mermaid reformat touching docs these validators assert against:

| Validator | Assertion | Failure | Likely cause |
|-----------|-----------|---------|--------------|
| `check-phase-50` | **V-50-18** | `01-intune-linux-agent.md` LIN-05 "Known admin pitfall" blockquote (DPO-01) regex not found | EEE #12 split/de-blockquoted the callout the regex matched |
| `check-phase-52` | **V-52-07** | RB24 Layer 2 `> **Source confidence:**` blockquote (LOW-MEDIUM + `/var/log/microsoft/intune/` proximity) missing | EEE reformat changed the blockquote shape |
| `check-phase-65` | **V-65-06** | L2 #26 `26-apple-business-permission-denied.md` Mermaid tree has 1 `([` leaf node; expected ≥7 (DA-9 LOCKED) | Mermaid carve-out/reformat dropped the leaf-node count |

**Per the plan's critical-reminder, this is a SECOND, genuinely-predecessor remediation and is REPORTED for a
decision — NOT fixed blind.** The correct fix per D-119-3 / Task 2 is in-class chain maintenance on ONLY these three
predecessor `check-phase-NN.mjs` validators (add the `CHECK_PHASE_NESTED` guard to the AUDIT-HARNESS/self-test
step, or convert the content assertion to a frozen-aware `readAtVNNClose()` read), with **no value-masking, no
frozen-surface edit, CHAIN_SKIP empty**. It was NOT attempted here because the owner pre-decided only the C15 fix;
the predecessor-validator fix shape needs its own decision.

## Deviations from Plan

### [Rule 2 — auto-add / in-class scope expansion] Second C15 FP exemption (01-abm-configuration.md:73)

- **Found during:** Task 2 local verification (`v1.15-milestone-audit.mjs` surfaced `violations[0]` for the macOS
  file once the iOS file was exempted).
- **Issue:** A second genuine C15 false positive was masked by the harness's `violations[0]`-only reporting.
- **Fix:** Same owner-blessed ABAUDIT mechanism (ABAUDIT-27); this file already carried ABAUDIT-01 for the same
  regex-7 class. Verified C17 green + milestone-audit 16/16.
- **Files modified:** `docs/admin-setup-macos/01-abm-configuration.md`.
- **Commit:** `ad583fd`.

### [Reported blocker — NOT auto-fixed] Apex-RED predecessor drift (check-phase-50/52/65)

- Per plan critical-reminder, the second genuinely-predecessor failure mode is STOP-and-report. See worklist above.

## Requirements Note

Per D-119-4 / SC5, **no requirement is flipped to Validated here** (that is the 119-07 close-gate's sole job). This
slot only contributes the C15 harness-run remediation; the Axis-2 apex is not yet green.

## Self-Check: PASSED

- `docs/admin-setup-ios/02-abm-token.md` — MODIFIED; contains `<!-- ABAUDIT-26:` immediately above the Summary
  paragraph; C15 PASS.
- `docs/admin-setup-macos/01-abm-configuration.md` — MODIFIED; contains `<!-- ABAUDIT-27:` immediately above the
  line-73 blockquote; C15 PASS.
- `c17-eee-contract.mjs` exit 0 (174 files, 0 violations); `v1.15-milestone-audit.mjs` 16 PASS / 0 FAIL.
- Commit `ad583fd` — FOUND on `master` + pushed to `phase-119-atom-2` (`5ec0f87..ad583fd`); 2 files, 2 insertions,
  no deletions.
- Axis-2 re-push run `28824259217` — FOUND; harness-run PASS; continuity leaves PASS; apex RED on 3 predecessors
  (recorded honestly, RED→partial-green intermediate state).

## STATUS: BLOCKED — SECOND (genuinely-predecessor) remediation required before the Axis-2 apex is green

The close-gate (119-07) remains blocked on (authoritative Axis-2 apex GREEN) AND (owner PIPE-02 PASS). This slot
greened the harness-run; a follow-up predecessor-validator remediation (check-phase-50/52/65, in-class only) is
needed to green the apex. Reported for a decision.
