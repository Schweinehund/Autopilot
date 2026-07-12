# Phase 128 — 3-Axis Terminal Re-Audit Results (HARN-10)

**Date:** 2026-07-11
**Branch:** phase-128-atom-2 (PR #4, base master) — https://github.com/Schweinehund/Autopilot/pull/4
**Verdict:** PASS — v1.17 chain green across all 3 axes (EXACT MATCH); predecessor cascade RED is Class-B `ACCEPTED-STANDALONE-CI-RED` (owner-accepted, non-blocking, deferred to v1.18). Close-gate precondition CLEARED.

---

## Axis-2 — Linux GHA (AUTHORITATIVE for both chain validators, D-03 OS split)

**Authoritative run ID: `29165955062`** — workflow "Audit Harness v1.17 Integrity", event pull_request, **conclusion = success**.

| Job | Conclusion |
|-----|-----------|
| check-phase-128 validator (apex; recursively spawns 48..127) | success |
| check-phase-126 validator | success |
| check-phase-127 validator | success |
| linux-chain-ubuntu-latest (Validator chain on Linux LF) | success |
| Run v1.17 milestone audit harness | success |
| Parse / Harness-references v1.17 sidecar | success |

Non-fatal annotations only: Node-20 deprecation warnings; **"Supervision-pin drift advisory (CI)"** — an ADVISORY (non-blocking), consistent with the deferred HYG-02 drift (DEFER-128-A).

## Axis-1 — Fresh `git clone --no-hardlinks` (Windows)

Clone HEAD `4e89d68c`. Reproducible surface + full apex:

| Check | Exit |
|-------|------|
| v1.17-milestone-audit.mjs | 0 |
| check-phase-124.mjs (nested) — the emergent-fix | 0 |
| check-phase-126.mjs / check-phase-127.mjs | 0 / 0 |
| **check-phase-128.mjs (apex, full chain 48..127)** | **0 — 82 PASS, 0 FAIL, 1 SKIPPED** |

Did NOT assert `docs-library-v1.17.zip` presence — `dist/` is gitignored so a fresh clone has none (D-128-D Sub-Q1). No PIPE-02 / grounding leg (D-128-A).

## Axis-3 — Independent context (local working tree + Wave-4 zero-context executor)

apex-128 `--verbose` EXIT 0 — **82 PASS, 0 FAIL, 1 SKIPPED** (the 1 SKIP = V-128-AUDIT, expected: 128-VERIFICATION.md does not exist pre-close-gate). Independently reproduced by the Wave-4 gsd-executor (fresh context) — same tally.

## Cross-OS / Cross-context EXACT MATCH

**apex-128 reproducible surface: 82 PASS / 0 FAIL / 1 SKIPPED — IDENTICAL across Axis-1 (fresh clone, Windows), Axis-2 (Linux GHA), Axis-3 (independent context).** EXACT MATCH asserted. The full-chain apex is Linux-GHA-authoritative per D-03; here Windows also completed green on the clean fresh clone (no deep-nest stall).

---

## Predecessor-workflow cascade scan

The PR fired the whole cascade (matches CONTEXT grounding-correction #4: 11 firing = base + v1.7..v1.16; v1.5/v1.6 do NOT fire).

| Workflow | Conclusion | Class |
|----------|-----------|-------|
| **Audit Harness v1.17 Integrity** | **success** | current milestone — GREEN |
| Audit Harness Integrity (base) | failure ("Harness replay" job) | Class-B |
| Audit Harness v1.7 .. v1.16 Integrity (10) | failure ("Run vX.Y milestone audit harness" job) | Class-B |

**Classification — Class-B `ACCEPTED-STANDALONE-CI-RED` (non-blocking, owner-accepted 2026-07-11):**
- **Every** cascade failure is a predecessor **milestone-audit HARNESS** job. **Zero** chain-job / check-phase-validator failures anywhere (verified per-run via `gh run view --json jobs`). The chain-health that gates the close is fully green.
- Root cause (e.g. v1.7 harness: 10 passed / 5 failed): a MIX against FROZEN predecessor sidecars — C2 supervision + C9 COPE = HYG-02 −1 line-shift drift (`_glossary-android.md:37/337`, etc.); C5/C10 = ≥60-day `last_verified` freshness expiry (time-based, orthogonal to v1.17); C7 = bare-Knox content.
- These are FROZEN predecessor surfaces (v1.7..v1.16 `-audit-allowlist.json` / `-milestone-audit.mjs`); repointing/read-converting them is a forbidden frozen-surface edit. This is the `FROZEN-AWARE-ADOPTION-SWEEP-01` mandate → **deferred to v1.18** (see 128-DEFERRED-CLEANUP.md / deferred-items.md DEFER-128-A).
- Precedent: identical to the v1.15 Phase 119 / v1.16 Phase 125 disposition (`docs(125-04): correct Class-B classification — ACCEPTED-STANDALONE-CI-RED-01 … not a blocker`).

## Predecessor byte-unchanged HARD gate

`git diff f0e1f163 (Wave-0 anchor) → HEAD` over frozen surfaces:
- **No v1.4–v1.16 milestone-audit / audit-allowlist / prior audit-harness-vN workflow file changed** — EMPTY ✓.
- **No check-phase-48..125 changed except the 9 sanctioned** (49/58/59/62/101/109/118/121 D-128-C conversions + 124 emergent fix) — EMPTY ✓.
- Sanctioned close-surface changes only: `_lib/frozen-at-close.mjs` (V116 pin), the 9 validators, `check-phase-126/127/128` (new), `regenerate-supervision-pins.mjs` (BASELINE_21 comment; BASELINE_9 array byte-unchanged), `v1.17-milestone-audit.mjs` + `v1.17-audit-allowlist.json` (new v1.17 surfaces).

---

## Disposition

3-axis EXACT MATCH ✓ · byte-unchanged gate ✓ · v1.17 chain+apex+harness GREEN (authoritative Linux GHA) ✓ · cascade RED = Class-B ACCEPTED-STANDALONE-CI-RED (owner-accepted, deferred v1.18) ✓. **Emergent slot (128-06): NO-OP** — the sole Class-A apex blocker (check-phase-124 archival drift) was pre-scoped and fixed pre-push (commit 76d147b); no GHA-RED-triggered remediation was needed. **Close-gate precondition CLEARED.**
