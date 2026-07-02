# Plan 112-04 Summary — 3-Axis Terminal Re-Audit (HARN-03 part 1)

**Status:** Complete (human-verify checkpoint APPROVED 2026-07-02)
**Requirements:** HARN-03 (part 1 — re-audit; close-gate is 112-05)

## What happened

The 3-axis terminal re-audit was run TWICE:

1. **First run (halted, not false-greened):** Axis-2 Linux GHA run `28621185019` (headSha `8cda106`, pre-remediation) returned apex `check-phase-112 [48..111]` = **44 PASS / 22 FAIL / 1 SKIP**. The executor correctly refused to author `cross_os_exact_match: true` and returned a BLOCKING divergence instead of papering over it. Root cause: the D-00 NESTED-guard (112-01) covered only check-phase-95/100, leaving 11 predecessor AUDIT steps + 6 drifted content assertions + cascades RED against the v1.14 802.1X corpus. → triaged into the 22-validator manifest and remediated in **plan 112-06**.

2. **Re-run (green):** after 112-06 greened all 22 (verified 22→0 nested) and pushed `2de780c`, a FRESH Linux GHA run `28625158404` (headSha `2de780c`) concluded **success**; apex `check-phase-112 validator` job passed.

## Cross-OS re-audit result (run 28625158404, independently confirmed)

- **Apex `check-phase-112 [48..111]` = 66 PASS / 0 FAIL / 1 SKIP** (Linux, sole-authoritative for chain validators).
  - The 1 SKIP = `V-112-AUDIT` (pending `112-VERIFICATION.md`, which lands in the 112-05 close-gate — PASS-via-skip by design).
- **12 leaf rows** (harness self-test 9/9 + verbose 15/0/0; check-phase-101..111) — cross-OS **EXACT MATCH** Windows (Axis 1 fresh clone + Axis 3 fresh sub-agent) ↔ Linux (Axis 2).
- Chain wall-clock collapsed 160s (v1.13) → **2s** (112-06 NESTED-guards short-circuit redundant nested milestone-audit re-runs).

## Accepted / explained divergences (no real problem)

- **Windows deep-nest cascade at `[48..111]`** — the only acceptable Windows-only divergence; both chain validators are Linux-GHA sole-authoritative (O(n²) subprocess-tree cost; carried in `v1.14-DEFERRED-CLEANUP.md`; OOM-vs-timeout flip at the deeper nest unmeasured, LOW-risk).
- **Predecessor v1.12/v1.13 standalone-CI RED** (60d vs deliberate 90d corpus) — the accepted D-00-companion condition (frozen harness validating its own close-SHA corpus, barred from editing by D-00a, cured in-chain by the NESTED-guard); documented at 112-05.

## Axes

| Axis | Mechanism | Result |
|------|-----------|--------|
| 1 | fresh `git clone --no-hardlinks` → temp, `cd` INTO clone (cwd-trap honored), 12 leaf validators | clone HEAD == source `2de780c`; zero orphans |
| 2 | `gh workflow run audit-harness-v1.14-integrity.yml --ref master` → run 28625158404 | **success**; apex 66/0/1 |
| 3 | fresh zero-context PowerShell session (same isolation as Axis 1) | EXACT MATCH on 12 leaves |

## Key files

- created: `112-04-AUDIT-RESULTS.md` (190 lines) — committed `f1f3104` (the `audit_results_sha` for 112-05 frontmatter)

## Self-Check: PASSED

Apex genuinely green on the authoritative Linux axis; no false-greening; frozen predecessor surfaces byte-unchanged. Human-verify checkpoint APPROVED → proceed to 112-05 close-gate.
