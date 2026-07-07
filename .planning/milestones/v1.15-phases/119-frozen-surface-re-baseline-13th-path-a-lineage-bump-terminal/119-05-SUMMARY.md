---
phase: 119-frozen-surface-re-baseline-13th-path-a-lineage-bump-terminal
plan: 05
subsystem: milestone-close-harness
tags: [remediation-slot, axis-2-arm, c15-false-positive, abaudit-exemption, chain-apex-red, predecessor-drift, honest-accounting, blocked]
status: COMPLETE — Axis-2 apex GREEN cross-OS (round-1 C15 FP exemptions + round-2 predecessor frozen-aware reads)
requires:
  - "119-03 Atom 2 commit 5ec0f87 (armed Axis-2 run 28823233887)"
  - "119-04 authoritative Axis-2 verdict = APEX RED (this slot fires)"
provides:
  - "C15 harness-run greened: two owner-reviewed Phase-1-doc false-positive ABAUDIT exemptions (ABAUDIT-26 iOS, ABAUDIT-27 macOS)"
  - "Predecessor chain-health restored: check-phase-50/52/65 frozen-aware reads at V114 (7d922a7) — V-50-18, V-52-07, V-65-06 (no value-mask, CHAIN_SKIP ∅)"
  - "Authoritative Axis-2 GREEN run 28825186128 (sha 652f48e): harness-run PASS + all 6 continuity leaves (113..118) PASS + check-phase-119 apex PASS + linux-chain PASS (cross-OS)"
affects:
  - "119-06/07 close-gate: Axis-2 precondition CLEARED; close-gate now gated only on owner PIPE-02 PASS"
tech-stack:
  added: []
  patterns: [abaudit-fp-exemption, single-line-html-comment-allowlist, dual-apex-ci, honest-accounting-red-then-green, frozen-aware-read-predecessor-remediation]
key-files:
  created:
    - .planning/phases/119-frozen-surface-re-baseline-13th-path-a-lineage-bump-terminal/119-05-SUMMARY.md
  modified:
    - docs/admin-setup-ios/02-abm-token.md
    - docs/admin-setup-macos/01-abm-configuration.md
    - scripts/validation/check-phase-50.mjs
    - scripts/validation/check-phase-52.mjs
    - scripts/validation/check-phase-65.mjs
decisions:
  - "C15 fix = owner-decided ABAUDIT exemption (single physical line, immediately before the tripping line, no blank between); ZERO technical prose changed; fallback reword NOT needed (C17 stayed green)"
  - "Second C15 false positive (01-abm-configuration.md:73) was masked in the original diagnosis (harness reports violations[0] only); resolved with the SAME owner-blessed ABAUDIT mechanism — this file already carried ABAUDIT-01 for the identical regex-7 class"
  - "Round-2 apex RED on check-phase-50/52/65 = the v1.14-predicted predecessor-drift failure mode; fixed per pre-authorized D-119-3 via frozen-aware reads at V114 (7d922a7, the pre-EEE v1.14 close) — read SOURCE only (live→frozen), expected patterns/thresholds UNCHANGED, no frozen surface edited, CHAIN_SKIP left new Set([])"
metrics:
  duration: ~55min
  completed: 2026-07-06
  tasks: 2
  files: 5
---

# Phase 119 Plan 05: EMERGENT Chain-Health Remediation Slot — C15 FP Exemptions + Predecessor Frozen-Aware Reads (Axis-2 GREEN) Summary

**The pre-authorized remediation slot FIRED** (Plan 119-04 authoritative Axis-2 GHA apex came back RED) and took
**two remediation rounds**, exactly as the v1.14 precedent predicted:

- **Round 1** — owner-decided C15 false-positive ABAUDIT exemptions greened the v1.15 **harness-run** job, which
  un-skipped the chain. Recorded below (unchanged).
- **Round 2** — the now-un-skipped Axis-2 apex ran RED on **three genuinely-predecessor** content-drift failures
  (check-phase-50 / 52 / 65 — the v1.14-predicted drift). Fixed per the pre-authorized D-119-3 discipline via
  **frozen-aware reads at V114 (`7d922a7`, the pre-EEE v1.14 close)** — read SOURCE only, **zero value-masking**,
  **no frozen surface edited**, **CHAIN_SKIP left empty**. The re-pushed authoritative Axis-2 run is now **GREEN
  cross-OS** (apex + linux-chain + all 6 continuity leaves).

This SUMMARY records the full RED → partial-green → GREEN intermediate history honestly.

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

### Predecessor-drift worklist (the round-1 diagnosis — carried for the audit trail)

All three reproduce **locally** (not Linux-specific) — genuine corpus-evolution failures from the Phase-116/117/118
EEE #12 blockquote-split + Mermaid reformat touching docs these validators assert against:

| Validator | Assertion | Failure | Cause |
|-----------|-----------|---------|--------------|
| `check-phase-50` | **V-50-18** | `01-intune-linux-agent.md` LIN-05 "Known admin pitfall" blockquote (DPO-01) regex not found | EEE #12 (Phase 117) split/de-blockquoted the callout the regex matched |
| `check-phase-52` | **V-52-07** | RB24 Layer 2 `> **Source confidence:**` blockquote (LOW-MEDIUM + `/var/log/microsoft/intune/` proximity) missing | EEE (Phase 116) reformat changed the blockquote shape |
| `check-phase-65` | **V-65-06** | L2 #26 `26-apple-business-permission-denied.md` Mermaid tree has 1 `([` leaf node; expected ≥7 (DA-9 LOCKED) | EEE (Phase 118) Mermaid reformat dropped the leaf-node count |

## Round 2 (predecessor remediation) — Axis-2 apex greened via frozen-aware reads

The user pre-authorized the D-119-3 fix for exactly this failure mode: **change each failing assertion's content
READ from the LIVE (EEE-evolved) file to a FROZEN read at V114 (`7d922a7`, the v1.14 milestone close — the
pre-EEE snapshot that still contains the expected patterns).** The validator thereby asserts its Phase-N
deliverable AS IT WAS AT ITS OWN CLOSE, not the reformatted live corpus.

**Pre-fix frozen-read confirmation** (the pattern MUST exist at V114 before switching — else STOP, per D-119-3):

| Validator | Assertion | Pattern at V114 (`7d922a7`) | Live state |
|-----------|-----------|-----------------------------|------------|
| `check-phase-50` | V-50-18 | `> ⚠️ **Known admin pitfall` present (blockquote form, line 17) | callout de-blockquoted by EEE #12 |
| `check-phase-52` | V-52-07 | `> **Source confidence:**` present (line 100) + `LOW-MEDIUM confidence` (5×) + `/var/log/microsoft/intune/` (9×), proximity satisfied | blockquote form absent |
| `check-phase-65` | V-65-06 | 8 `([` Mermaid leaf nodes (≥7) | 1 `([` leaf node |

**Exact change per validator (READ SOURCE only — expected pattern/threshold UNCHANGED):**

| Validator | Assertion | Old (live) read | New (frozen) read | Expected pattern/threshold |
|-----------|-----------|-----------------|-------------------|----------------------------|
| `check-phase-50` | V-50-18 | `readFile(ADMIN_AGENT)` | `readAtV114Close(ADMIN_AGENT)` | `/^> ⚠️ \*\*Known admin pitfall/m` — **UNCHANGED** |
| `check-phase-52` | V-52-07 | `readFile(RB24)` | `readAtV114Close(RB24)` | `> **Source confidence:**` + `LOW-MEDIUM confidence` + `/var/log/microsoft/intune/` + ≤40-line proximity — **UNCHANGED** |
| `check-phase-65` | V-65-06 | `readFile(L2_26)` | `readAtV114Close(L2_26)` | `count(([) >= 7` (DA-9 LOCKED) — **UNCHANGED (NOT lowered to the evolved 1-leaf state)** |

Each validator gained a single `import { readAtV114Close } from './_lib/frozen-at-close.mjs';` line (mirroring the
established `readAtV15Close` idiom in sibling validators check-phase-49/57/58/59/61) plus a `try { … } catch { c =
null; }` frozen read at the one drifted assertion. Every other assertion in all three validators is untouched and
still reads the live corpus.

**Integrity attestations for round 2 (D-119-3, non-negotiable):**
- **NO value-masking** — no expected regex, count, or threshold changed (V-65-06 stays `>= 7`, NOT lowered to 1).
  git-diff review confirmed the only keyword matches (`>= 7`, `LOW-MEDIUM`, `Known admin pitfall`, `Source
  confidence`) are inside the newly-added explanatory comments, never on an assertion line.
- **NO frozen surface edited** — no doc, no sidecar, no `v1.N-milestone-audit.mjs`, no workflow touched. Only the
  three predecessor `check-phase-NN.mjs` validators.
- **CHAIN_SKIP left EMPTY everywhere** — `new Set([])` untouched in every apex (V-SELF still asserts size 0).
- **No additional predecessor drift** — the re-run apex surfaced exactly these 3 and no more.

**Local standalone verification (each exits 0):**
- `node scripts/validation/check-phase-50.mjs --verbose` → **26 passed, 0 failed** (V-50-18 PASS).
- `node scripts/validation/check-phase-52.mjs --verbose` → **22 passed, 0 failed** (V-52-07 PASS).
- `CHECK_PHASE_NESTED=1 node scripts/validation/check-phase-65.mjs --verbose` → **15 PASS, 0 FAIL, 18 SKIPPED**
  (V-65-06 PASS — 8 leaf nodes ≥ 7; the 18 SKIPPED are the CHAIN + AUDIT re-runs, skipped under nested apex as
  designed — the full standalone chain deep-nests on the Windows host per WINDOWS-CLONE-DEEPNEST-TIMEOUT-01, so
  nested mode is the apex-equivalent leaf verification).

**Commit:** `652f48e` `fix(119-05): predecessor chain-health — frozen-aware reads for check-phase-50/52/65 (no
value-mask, CHAIN_SKIP ∅)` — explicit `git add` of exactly the three validators (3 files, 28 insertions, 7
deletions).

### Re-push + authoritative Axis-2 GREEN

Fast-forwarded PR branch `phase-119-atom-2` (`git push origin master:phase-119-atom-2`, `ad583fd..652f48e`, PR #2
base master). The `synchronize` event fired the authoritative **Axis-2 run `28825186128`** (headSha `652f48e`,
workflow "Audit Harness v1.15 Integrity") — conclusion **success** ✅.

**Final run job map (`28825186128`, conclusion = success):**

| Job | Conclusion |
|-----|------------|
| Parse v1.15 sidecar JSON | success ✅ |
| Harness references v1.15 sidecar | success ✅ |
| Run v1.15 milestone audit harness | success ✅ |
| check-phase-113 / 114 / 115 / 116 / 117 / 118 validator (continuity leaves) | success ✅ |
| Supervision-pin drift advisory (CI) | success ✅ |
| **check-phase-119 validator (apex; recursively spawns 48..118)** | **success** ✅ |
| **Validator chain on Linux LF (Phase 69 CILINUX-01)** | **success** ✅ |
| Quarterly c13_rotting_external link-check | skipped (cron-gated) |

**The authoritative Axis-2 chain is GREEN cross-OS** — the full recursion 48..118 passes on `ubuntu-latest` (both
the apex `check-phase-119` job AND the `linux-chain-ubuntu-latest` job), with all six continuity leaves and the
harness-run green. The Axis-2 close-gate precondition is CLEARED.

## Deviations from Plan

### [Rule 2 — auto-add / in-class scope expansion] Second C15 FP exemption (01-abm-configuration.md:73)

- **Found during:** Task 2 local verification (`v1.15-milestone-audit.mjs` surfaced `violations[0]` for the macOS
  file once the iOS file was exempted).
- **Issue:** A second genuine C15 false positive was masked by the harness's `violations[0]`-only reporting.
- **Fix:** Same owner-blessed ABAUDIT mechanism (ABAUDIT-27); this file already carried ABAUDIT-01 for the same
  regex-7 class. Verified C17 green + milestone-audit 16/16.
- **Files modified:** `docs/admin-setup-macos/01-abm-configuration.md`.
- **Commit:** `ad583fd`.

### [Round 2 — pre-authorized D-119-3 remediation] Apex-RED predecessor drift (check-phase-50/52/65) — FIXED

- **Found during:** Round-1 re-push apex run `28824259217` (apex RED on 3 predecessors).
- **Issue:** The v1.15 EEE retrofit (Phases 116/117/118) reformatted docs that check-phase-50/52/65 assert against,
  breaking V-50-18 / V-52-07 / V-65-06 against the live corpus (the v1.14-predicted drift).
- **Fix:** Frozen-aware reads at V114 (`7d922a7`) — read source only (live→frozen `readAtV114Close`), expected
  patterns/thresholds unchanged; no frozen surface edited; CHAIN_SKIP left empty. See "Round 2" section above.
- **Files modified:** `scripts/validation/check-phase-50.mjs`, `check-phase-52.mjs`, `check-phase-65.mjs`.
- **Commit:** `652f48e`. Verified GREEN by authoritative Axis-2 run `28825186128`.

## Requirements Note

Per D-119-4 / SC5, **no requirement is flipped to Validated here** (that is the 119-07 close-gate's sole job). This
slot contributes the C15 harness-run remediation (round 1) AND the predecessor chain-health remediation (round 2);
the Axis-2 apex is now GREEN, clearing the Axis-2 close-gate precondition — but the flip to Validated remains
119-07's exclusive responsibility.

## Self-Check: PASSED

- `docs/admin-setup-ios/02-abm-token.md` — MODIFIED; contains `<!-- ABAUDIT-26:` immediately above the Summary
  paragraph; C15 PASS (round 1).
- `docs/admin-setup-macos/01-abm-configuration.md` — MODIFIED; contains `<!-- ABAUDIT-27:` immediately above the
  line-73 blockquote; C15 PASS (round 1).
- `scripts/validation/check-phase-50.mjs` — MODIFIED; imports `readAtV114Close`; V-50-18 reads V114 frozen; exits 0
  (26/0).
- `scripts/validation/check-phase-52.mjs` — MODIFIED; imports `readAtV114Close`; V-52-07 reads V114 frozen; exits 0
  (22/0).
- `scripts/validation/check-phase-65.mjs` — MODIFIED; imports `readAtV114Close`; V-65-06 reads V114 frozen; exits 0
  under nested apex (15/0/18-skip); threshold still `>= 7`.
- Commit `ad583fd` (round 1) — FOUND; 2 doc files. Commit `652f48e` (round 2) — FOUND on `master` + pushed to
  `phase-119-atom-2` (`ad583fd..652f48e`); 3 validators, 28 insertions, 7 deletions.
- Axis-2 GREEN run `28825186128` (sha `652f48e`) — FOUND; conclusion success; harness-run PASS; all 6 continuity
  leaves PASS; check-phase-119 apex PASS; linux-chain PASS. RED → partial-green → GREEN history recorded honestly.
- git-diff review confirmed no value-mask (keyword matches only inside added comments), no frozen-surface edit,
  CHAIN_SKIP `new Set([])` untouched.

## STATUS: COMPLETE — authoritative Axis-2 apex GREEN cross-OS

Both remediation rounds landed: round-1 C15 FP exemptions greened the harness-run; round-2 frozen-aware reads on
check-phase-50/52/65 greened the apex. The authoritative Axis-2 run `28825186128` concluded **success** (apex +
linux-chain + all 6 continuity leaves + harness-run GREEN). The Axis-2 close-gate precondition is CLEARED; the
close-gate (119-07) now remains gated only on the owner PIPE-02 PASS. No requirement flipped here (119-07's job).
