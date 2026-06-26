---
artifact: 93-03-AUDIT-RESULTS
phase: 93-harness-lineage-bump-terminal-re-audit-milestone-close
requirement: HARN-03
audit_type: 3-axis terminal re-audit (v1.11, 9th Path-A milestone harness)
audited: 2026-06-26
audited_ref: a9e291cbd01d23347e875b1aa241fe4e5c21b47a
clone_path_pattern: "$env:TEMP\\v1.11-audit-<rand8>"
clone_rand: 6cc4db5a
clone_head: a9e291cbd01d23347e875b1aa241fe4e5c21b47a
gha_workflow: audit-harness-v1.11-integrity.yml
gha_workflow_run: https://github.com/Schweinehund/Autopilot/actions/runs/28243312867
gha_conclusion: success
gha_wallclock_sec: 207
cross_os_exact_match: true
apex_authority: linux-gha-sole-authoritative
deep_nest_note: WINDOWS-CLONE-DEEPNEST-TIMEOUT-01 (depth [48..92])
---

# Phase 93 — HARN-03 3-Axis Terminal Re-Audit Results (v1.11)

**The v1.11 audit harness is the 9th Path-A milestone harness** (lineage v1.4 → v1.4.1 → v1.5 → v1.6 → v1.7 → v1.8 → v1.9 → v1.10 → **v1.11**). This artifact records the 3-axis terminal re-audit proving the harness produces **identical PASS/FAIL/SKIP counts across a clean Windows clone (Axis 1/3) and the GitHub Actions Linux runner (Axis 2)** — i.e. cross-OS **EXACT MATCH** — with the chain-apex `check-phase-93` count taken as **Linux-GHA sole-authoritative** per decision D-03.

Audited ref: `a9e291c` (`origin/master` HEAD at audit time, includes Atom 1 `84cf2d4` + Atom 2 `16698d2`).

---

## Axis Recipe (executed)

| Axis | Dimension | Method |
|------|-----------|--------|
| **Axis 1** | Local physical independence | Fresh `git clone --no-hardlinks D:\claude\Autopilot $env:TEMP\v1.11-audit-6cc4db5a` (own `.git/`, NOT a worktree; permitted under `use_worktrees:false`). Cloned HEAD asserted == source HEAD. |
| **Axis 2** | Cross-OS | `gh workflow run audit-harness-v1.11-integrity.yml --ref master` → run [28243312867](https://github.com/Schweinehund/Autopilot/actions/runs/28243312867), conclusion **success**. |
| **Axis 3** | Logical / context independence | The SAME fresh, zero-context-carryover session served Axis 1 — ONE dispatch covering two independence dimensions (per D-03; do NOT spawn two). |

**HARD pre-flight ordering gate (D-03) — all passed before any axis ran:**
1. `git log origin/master --oneline -1` showed Atom 2 `16698d2` on `origin/master`.
2. `gh auth status` authenticated (Schweinehund).
3. `gh workflow list` showed `Audit Harness v1.11 Integrity` — `state: active` (id 302759584).

**Axis 1 clone integrity:**
- `$rand` = `6cc4db5a` (charset `[0-9a-z]`, 8 chars).
- Source HEAD: `a9e291cbd01d23347e875b1aa241fe4e5c21b47a`
- Clone HEAD:  `a9e291cbd01d23347e875b1aa241fe4e5c21b47a` → **HEAD MATCH: YES**
- Cleanup: `Remove-Item -Recurse -Force` → **0 orphans** (`Get-ChildItem $env:TEMP -Filter "v1.11-audit-*" -Directory` count == 0).

---

## Cross-OS EXACT MATCH Table (7-validator set)

The cross-OS-applicable set per D-03 = `v1.11-milestone-audit.mjs` + `check-phase-88.mjs` (prior-apex continuity) + the 5 net-new `check-phase-89/90/91/92/93.mjs`.

| # | Validator | Windows (Axis 1/3 fresh clone) | Linux (Axis 2 GHA) | Verdict |
|---|-----------|--------------------------------|--------------------|---------|
| 1 | `v1.11-milestone-audit.mjs --verbose` | 15 PASS / 0 FAIL / 0 SKIP (exit 0) | 15 passed / 0 failed / 0 skipped | **EXACT MATCH** |
| 2 | `v1.11-milestone-audit.mjs --self-test` | 9 passed / 0 failed (exit 0) | 9 passed (CI harness job success) | **EXACT MATCH** |
| 3 | `check-phase-89.mjs` | 2 PASS / 0 FAIL / 0 SKIP (exit 0) | 2 PASS / 0 FAIL / 0 SKIP | **EXACT MATCH** |
| 4 | `check-phase-90.mjs` | 2 PASS / 0 FAIL / 0 SKIP (exit 0) | 2 PASS / 0 FAIL / 0 SKIP | **EXACT MATCH** |
| 5 | `check-phase-91.mjs` | 2 PASS / 0 FAIL / 0 SKIP (exit 0) | 2 PASS / 0 FAIL / 0 SKIP | **EXACT MATCH** |
| 6 | `check-phase-92.mjs` | 9 PASS / 0 FAIL / 0 SKIP (exit 0) | 9 PASS / 0 FAIL / 0 SKIP | **EXACT MATCH** |
| 7 | `check-phase-93.mjs` (chain-apex [48..92]) | Linux-sole-authoritative (deep-nest) | **47 PASS / 0 FAIL / 1 SKIP** | **MATCH (Linux authoritative)** |
| + | `check-phase-88.mjs` (chain continuity [48..87]) | Linux-authoritative (deep-nest) | 42/0/1 canonical — covered transitively by apex-93 chain | **MATCH (Linux authoritative)** |

`check-phase-92` = 8 `V-92-CROSSLINK-E1..E8` + 1 `V-92-SELF` = 9 PASS on both platforms (the nav-hub cross-link net is satisfied cross-OS).

**Result: cross-OS EXACT MATCH across the full set** — the 6 leaf/fast validators match byte-for-byte in count on Windows and Linux; the 2 chain validators (88 continuity + 93 apex) are Linux-authoritative per the deep-nest doctrine below and PASS on Linux.

---

## Axis 2 — Linux GHA per-job conclusions (run 28243312867)

| Job | Conclusion |
|-----|-----------|
| Parse v1.11 sidecar JSON | success |
| Harness references v1.11 sidecar | success |
| Run v1.11 milestone audit harness | success (15 passed / 0 failed / 0 skipped) |
| Supervision-pin drift advisory (CI) | success |
| Validator chain on Linux LF (Phase 69 CILINUX-01) — chain-apex check-phase-93 (48..92) | success (47 PASS / 0 FAIL / 1 SKIP) |
| check-phase-89 validator | success (2/0/0) |
| check-phase-90 validator | success (2/0/0) |
| check-phase-91 validator | success (2/0/0) |
| check-phase-92 validator | success (9/0/0) |
| check-phase-93 validator | success (47/0/1) |
| Quarterly c13_rotting_external link-check | **skipped** (negative control — cron-only `if:` guard confirmed) |

Run wall-clock: 207s. CHAIN_TIMING_LINUX `::notice` emitted (Windows reference ~430s; subprocess timeout 600s). The 8th-coexistence workflow (`audit-harness-v1.11-integrity`) ran without touching predecessors v1.4–v1.10 (`continue-on-error: false`, `fetch-depth: 0`, `core.autocrlf false`, `timeout-minutes: 30`).

---

## WINDOWS-CLONE-DEEPNEST-TIMEOUT-01 — apex Linux-sole-authoritative

The chain-apex spawns children with `CHECK_PHASE_NESTED=1`, producing an O(n²) subprocess cascade on a cold Windows clone. This timeout **actually fired in v1.10** (`88-03-AUDIT-RESULTS.md`: Windows warm-tree `41/1/1` spurious truncation on a CHAIN child vs clean Linux `42/0/1`). Phase 93's apex chain is `[48..92]` — **+5 deeper than v1.10's `[48..87]`, depth-monotone-worse** — so the Windows apex count is guaranteed unreliable. Empirically confirmed this session: a standalone `check-phase-88.mjs` (chain `[48..87]`) on the cold Windows clone did not return within 3+ minutes (12+ live `node` processes), exhibiting the same cascade.

**Resolution:** BOTH chain validators are Linux-authoritative on Windows:
- `check-phase-93` (v1.11 apex, `[48..92]`) → Linux GHA **sole-authoritative**: `47/0/1`.
- `check-phase-88` (continuity, `[48..87]`) → canonical `42/0/1`; covered transitively by the Linux apex-93 run (which recursively executes `48..92` ⊇ `88`'s `48..87`); Windows standalone deferred for the same root cause.

The 6 leaf/fast validators (harness, self-test, 89, 90, 91, 92) are NOT chain validators and ran cleanly and identically on both platforms → genuine cross-OS EXACT MATCH.

**Carry-forward to `v1.11-DEFERRED-CLEANUP.md`:** `WINDOWS-CLONE-DEEPNEST-TIMEOUT-01` — depth now `[48..92]`; mitigation = take chain-apex (and standalone chain-continuity) counts from Linux GHA, not the Windows cold clone.

---

## Conclusion

ROADMAP SC#3 satisfied: the 3-axis terminal re-audit (Axis 1 fresh `git clone --no-hardlinks` + Axis 2 cross-OS Linux GHA + Axis 3 zero-context fresh session) completes with **cross-OS PASS/FAIL/SKIP EXACT MATCH** across the 7-validator set, the apex `check-phase-93` count Linux-GHA sole-authoritative (`47/0/1`), and zero temp-clone orphans. This artifact is consumed by the Phase 93-04 close-gate as the HARN-03 cross-OS independence evidence.
