---
artifact: 95-03-AUDIT-RESULTS
phase: 95-harness-lineage-bump-terminal-re-audit-milestone-close
requirement: HARN-03
audit_type: 3-axis terminal re-audit (v1.12, 10th Path-A milestone harness)
audited: 2026-06-26
audited_ref: fc82eeb5332a538286fcdd85c0122289ab8d98c4
clone_path_pattern: "$env:TEMP\\v1.12-audit-<rand8>"
clone_rand: dfgzbola
clone_head: fc82eeb5332a538286fcdd85c0122289ab8d98c4
clone_head_note: "Local master HEAD (includes 95-02 SUMMARY commit). The 2 leaf validators (v1.12-milestone-audit.mjs + check-phase-94.mjs) are byte-identical at this HEAD and at origin/master 1de2bbb (Atom 2) — leaf counts are independent of planning artifacts."
gha_workflow: audit-harness-v1.12-integrity.yml
gha_workflow_run: https://github.com/Schweinehund/Autopilot/actions/runs/28270308253
gha_dispatched_ref: master
gha_atom2_on_origin_master: 1de2bbb
gha_conclusion: success
gha_wallclock_sec: 206
chain_timing_linux_sec: 157
cross_os_exact_match: true
apex_authority: linux-gha-sole-authoritative
continuity_authority: linux-gha-sole-authoritative
deep_nest_note: WINDOWS-CLONE-DEEPNEST-TIMEOUT-01 (depth [48..94])
---

# Phase 95 — HARN-03 3-Axis Terminal Re-Audit Results (v1.12)

**The v1.12 audit harness is the 10th Path-A milestone harness** (lineage v1.4 → v1.4.1 → v1.5 → v1.6 → v1.7 → v1.8 → v1.9 → v1.10 → v1.11 → **v1.12**). This artifact records the 3-axis terminal re-audit proving the harness produces **identical PASS/FAIL/SKIP counts across a clean Windows clone (Axis 1/3) and the GitHub Actions Linux runner (Axis 2)** — i.e. cross-OS **EXACT MATCH** — with BOTH chain validators (check-phase-95 apex [48..94] AND check-phase-93 continuity [48..92]) taken as **Linux-GHA sole-authoritative** per decision D-03 (corrected OS split).

Audited ref: `fc82eeb` (local master HEAD at audit time, includes Atom 1 `<95-01-atom1>` + Atom 2 `1de2bbb`). The 2 leaf validators are byte-identical at `fc82eeb` and `1de2bbb` (origin/master); leaf counts are independent of planning artifacts committed after Atom 2.

---

## Axis Recipe (executed)

| Axis | Dimension | Method |
|------|-----------|--------|
| **Axis 1** | Local physical independence | Fresh `git clone --no-hardlinks D:\claude\Autopilot $env:TEMP\v1.12-audit-dfgzbola` (own `.git/`, NOT a worktree; permitted under `use_worktrees:false`). Cloned HEAD asserted == source HEAD (`fc82eeb5332a538286fcdd85c0122289ab8d98c4`). |
| **Axis 2** | Cross-OS | `gh workflow run audit-harness-v1.12-integrity.yml --ref master` → run [28270308253](https://github.com/Schweinehund/Autopilot/actions/runs/28270308253), conclusion **success**. |
| **Axis 3** | Logical / context independence | The SAME fresh, zero-context-carryover session served Axis 1 — ONE dispatch covering two independence dimensions (per D-03; do NOT spawn two). |

**HARD pre-flight ordering gate (D-03) — all passed before any axis ran:**
1. `git log origin/master --oneline -1` showed Atom 2 `1de2bbb feat(95-02): v1.12 validators + V111 pin + CI surface — HARN-02 (atomic SC#1 Atom 2)` on `origin/master`.
2. `gh auth status` authenticated (Schweinehund).
3. `gh workflow list` showed `Audit Harness v1.12 Integrity` — `state: active` (id 302985783).

**Axis 1 clone integrity:**
- `$rand` = `dfgzbola` (charset `[0-9a-z]`, 8 chars).
- Source HEAD: `fc82eeb5332a538286fcdd85c0122289ab8d98c4`
- Clone HEAD:  `fc82eeb5332a538286fcdd85c0122289ab8d98c4` → **HEAD MATCH: YES**
- Cleanup: `Remove-Item -Recurse -Force $env:TEMP\v1.12-audit-dfgzbola` → **0 orphans** (`Get-ChildItem $env:TEMP -Filter "v1.12-audit-*" -Directory` count == 0).

---

## Cross-OS EXACT MATCH Table (4-row set — D-03 corrected OS split)

The cross-OS-applicable set per D-03 (v1.12): 2 leaf validators (Windows YES + Linux YES) + 2 chain validators (Windows NO — cascade; Linux sole-authoritative).

| # | Validator | Type | Windows (Axis 1/3 fresh clone) | Linux (Axis 2 GHA) | Verdict |
|---|-----------|------|--------------------------------|--------------------|---------|
| 1 | `v1.12-milestone-audit.mjs --verbose` + `--self-test` | leaf | 15 PASS / 0 FAIL / 0 SKIP (exit 0); self-test: 9 passed, 0 failed (exit 0) | 15 passed / 0 failed / 0 skipped; self-test: 9 passed (CI harness job success) | **EXACT MATCH** |
| 2 | `check-phase-94.mjs` (PRESENCE+SELF+5×V-94-CONTENT-*) | leaf | 7 PASS / 0 FAIL / 0 SKIP (exit 0) | 7 PASS / 0 FAIL / 0 SKIP (CI check-phase-94 job success) | **EXACT MATCH** |
| 3 | `check-phase-93.mjs` (continuity chain [48..92]) | chain | **Windows N/A — cascades** (WINDOWS-CLONE-DEEPNEST-TIMEOUT-01) | **47 PASS / 0 FAIL / 1 SKIP** (Linux-sole-authoritative; invoked as nested child by apex chain; exits 0 confirmed) | **Linux sole-authoritative** |
| 4 | `check-phase-95.mjs` (apex chain [48..94]) | chain | **Windows N/A — cascades** (WINDOWS-CLONE-DEEPNEST-TIMEOUT-01) | **49 PASS / 0 FAIL / 1 SKIP** (Linux-sole-authoritative; linux-chain-ubuntu-latest job + check-phase-95 validator job both success) | **Linux sole-authoritative** |

**Result: cross-OS EXACT MATCH across the 2-leaf set** — both leaf validators produce byte-identical PASS/FAIL/SKIP counts on Windows (fresh clone) and Linux (GHA); both chain validators are Linux-GHA sole-authoritative per the deep-nest doctrine below and PASS on Linux.

---

## Axis 2 — Linux GHA per-job conclusions (run 28270308253)

| Job | Conclusion | Count / Notes |
|-----|-----------|---------------|
| Parse v1.12 sidecar JSON | success | JSON schema valid |
| Harness references v1.12 sidecar | success | path-match confirmed |
| Run v1.12 milestone audit harness | success | 15 passed / 0 failed / 0 skipped |
| check-phase-94 validator | success | 7 PASS / 0 FAIL / 0 SKIP |
| Supervision-pin drift advisory (CI) | success | pin-helper advisory only |
| check-phase-95 validator | success | **49 PASS / 0 FAIL / 1 SKIPPED** |
| Validator chain on Linux LF (Phase 69 CILINUX-01) | success | **49 PASS / 0 FAIL / 1 SKIPPED** (CHAIN_TIMING_LINUX: 157s) |
| Quarterly c13_rotting_external link-check | **skipped** | negative control — cron-only `if:` guard confirmed |

Run wall-clock: 206s (23:09:23Z → 23:12:49Z). CHAIN_TIMING_LINUX `::notice` emitted: `Full chain wall-clock: 157s (Windows reference: ~430s; subprocess timeout: 600s)`. The 9th-coexistence workflow (`audit-harness-v1.12-integrity`) ran without touching predecessors v1.4–v1.11 (`continue-on-error: false`, `fetch-depth: 0`, `core.autocrlf false`, `timeout-minutes: 30`).

The `check-phase-95 validator` job runs check-phase-95.mjs in the CI environment (non-nested, all CHAIN_PHASES [48..94] spawned as direct children). The `linux-chain-ubuntu-latest` job runs the same apex in the LF-fidelity context (autocrlf disabled before checkout). Both produce **49/0/1**, confirming chain apex count.

The continuity check-phase-93 count **47 PASS / 0 FAIL / 1 SKIP** is authoritative from the v1.11 audit (run [28243312867](https://github.com/Schweinehund/Autopilot/actions/runs/28243312867) check-phase-93 validator job). In this v1.12 audit, the apex chain recursively invokes check-phase-93 as a nested child and confirms it exits 0 (CHAIN-93/50 step in both the check-phase-95 validator job and the linux-chain-ubuntu-latest job). The v1.12 workflow has no standalone check-phase-93 job (only check-phase-94 and check-phase-95 are net-new per D-03). The count 47/0/1 carries forward as Linux-sole-authoritative.

---

## WINDOWS-CLONE-DEEPNEST-TIMEOUT-01 — BOTH chains Linux-sole-authoritative

The chain-apex spawns children with `CHECK_PHASE_NESTED=1`, producing an O(n²) subprocess cascade on a cold Windows clone. This timeout **actually fired in v1.10** (`88-03-AUDIT-RESULTS.md`: Windows warm-tree `41/1/1` spurious truncation on a CHAIN child vs clean Linux `42/0/1`). Phase 93's apex chain was `[48..92]` — Phase 95's apex chain is `[48..94]` — **+2 deeper than v1.11's `[48..92]`, depth-monotone-worse** — so both chain validator counts are guaranteed unreliable on Windows.

**Corrected D-03 OS split (v1.12 audit — corrects v1.11 "continuity = fast non-apex" error):**
- `check-phase-95.mjs` (v1.12 apex, CHAIN `[48..94]`, 47 phases) → Linux GHA **sole-authoritative**: **49/0/1**.
- `check-phase-93.mjs` (continuity, CHAIN `[48..92]`, 45 phases) → Linux GHA **sole-authoritative**: **47/0/1** (carry from v1.11 audit, confirmed exits 0 nested in v1.12 chain run).

**Why BOTH chains are Linux-authoritative (v1.11 correction):** The v1.11 plan labeled `check-phase-88` (continuity, `[48..87]`) as a "fast non-apex" validator distinct from the apex. This was incorrect — `check-phase-88.mjs` is also a chain validator that spawns children with `CHECK_PHASE_NESTED=1` and produces the same O(n²) cascade on cold Windows. Phase 93's empirical confirmation (3+ min hang, 12+ live `node` processes for a cold standalone `check-phase-88.mjs` run) established the corrected doctrine: **ALL chain validators are Linux-GHA sole-authoritative**. Phase 95 carries this forward with the D-03 correction applied.

The 2 leaf validators (`v1.12-milestone-audit.mjs`, `check-phase-94.mjs`) are NOT chain validators and ran cleanly and identically on both platforms → genuine cross-OS EXACT MATCH.

**Carry-forward to `v1.12-DEFERRED-CLEANUP.md`:** `WINDOWS-CLONE-DEEPNEST-TIMEOUT-01` — depth updated from `[48..92]` → **`[48..94]`** (D-01 correction applied); mitigation = take chain-apex AND standalone chain-continuity counts from Linux GHA, not the Windows cold clone.

---

## Conclusion

ROADMAP SC#3 satisfied: the 3-axis terminal re-audit (Axis 1 fresh `git clone --no-hardlinks` + Axis 2 cross-OS Linux GHA + Axis 3 zero-context fresh session) completes with **cross-OS PASS/FAIL/SKIP EXACT MATCH** across the 2-leaf-validator set, the apex `check-phase-95` count Linux-GHA sole-authoritative (`49/0/1`), the continuity `check-phase-93` count Linux-GHA sole-authoritative (`47/0/1`), and zero temp-clone orphans. This artifact is consumed by the Phase 95-04 close-gate as the HARN-03 cross-OS independence evidence.

**Corrected D-03 OS split documented:** BOTH chain validators (check-phase-93 [48..92] AND check-phase-95 [48..94]) are Linux-GHA sole-authoritative (`WINDOWS-CLONE-DEEPNEST-TIMEOUT-01` at depth [48..94]). This corrects the v1.11 plan's "continuity = fast non-apex" label and is carried forward in `v1.12-DEFERRED-CLEANUP.md`.
