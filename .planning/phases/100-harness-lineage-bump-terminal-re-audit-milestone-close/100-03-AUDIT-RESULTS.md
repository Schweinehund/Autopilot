---
artifact: 100-03-AUDIT-RESULTS
phase: 100-harness-lineage-bump-terminal-re-audit-milestone-close
requirement: HARN-03
audit_type: 3-axis terminal re-audit (v1.13, 11th Path-A milestone harness)
audited: 2026-06-29
audited_ref: 2ec8142ffa79237fcadf7afc67231d66a0376e65
atom2_sha: dc9ead9
clone_path_pattern: "$env:TEMP\\v1.13-audit-<rand8>"
clone_rand: kgc00000
clone_head: 2ec8142ffa79237fcadf7afc67231d66a0376e65
gha_workflow: audit-harness-v1.13-integrity.yml
gha_workflow_run: https://github.com/Schweinehund/Autopilot/actions/runs/28401420634
gha_dispatched_ref: master
gha_atom2_on_origin_master: dc9ead9
gha_conclusion: success
chain_timing_linux_sec: 160
cross_os_exact_match: true
apex_authority: linux-gha-sole-authoritative
continuity_authority: linux-gha-sole-authoritative
deep_nest_note: "WINDOWS-CLONE-DEEPNEST-TIMEOUT-01 (depth [48..99]) — BOTH chain validators cascade on Windows"
---

# Phase 100 — HARN-03 3-Axis Terminal Re-Audit Results (v1.13)

**The v1.13 audit harness is the 11th Path-A milestone harness** (lineage v1.4 → v1.4.1 → v1.5 → v1.6 → v1.7 → v1.8 → v1.9 → v1.10 → v1.11 → v1.12 → **v1.13**). This artifact records the 3-axis terminal re-audit proving the harness produces **identical PASS/FAIL/SKIP counts across a clean Windows clone (Axis 1/3) and the GitHub Actions Linux runner (Axis 2)** — i.e. cross-OS **EXACT MATCH** — on the 5 leaf rows, with BOTH chain validators (check-phase-100 apex [48..99] AND check-phase-95 continuity [48..94]) taken as **Linux-GHA sole-authoritative** per decision D-03 (corrected OS split).

Audited ref: `2ec8142` (master HEAD at audit time; includes Atom 1 `feat(100-01)` + Atom 2 `dc9ead9`). The 5 leaf validators (v1.13-milestone-audit.mjs + check-phase-96..99) are byte-identical at `2ec8142` and `dc9ead9` (origin/master); leaf counts are independent of planning artifacts committed after Atom 2.

---

## Pre-Flight Ordering Gate (D-03 hard gate — all 3 passed before any axis ran)

1. `git log origin/master --oneline -1` showed Atom 2 `dc9ead9 feat(100-02): v1.13 validators + V112 pin + CI surface — HARN-02 (atomic SC#1 Atom 2)` on `origin/master`. **PASS.**
2. `gh auth status` authenticated as Schweinehund with `workflow` token scope. **PASS.**
3. `gh workflow list` showed `Audit Harness v1.13 Integrity` — `state: active` (id 304306592). **PASS.**

---

## Axis Recipe (executed)

| Axis | Dimension | Method |
|------|-----------|--------|
| **Axis 1** | Local physical independence | Fresh `git clone --no-hardlinks D:\claude\Autopilot $env:TEMP\v1.13-audit-kgc00000` (own `.git/`, NOT a worktree; permitted under `use_worktrees:false`). Cloned HEAD asserted == source HEAD (`2ec8142ffa79237fcadf7afc67231d66a0376e65`). |
| **Axis 2** | Cross-OS | `gh workflow run audit-harness-v1.13-integrity.yml --ref master` → run [28401420634](https://github.com/Schweinehund/Autopilot/actions/runs/28401420634), conclusion **success**. |
| **Axis 3** | Logical / context independence | The SAME fresh, zero-context-carryover session served Axis 1 — ONE dispatch covering two independence dimensions (per D-03; do NOT spawn two). |

**Axis 1 clone integrity:**
- `$rand` = `kgc00000` (charset `[0-9a-z]`, 8 chars).
- Source HEAD: `2ec8142ffa79237fcadf7afc67231d66a0376e65`
- Clone HEAD:  `2ec8142ffa79237fcadf7afc67231d66a0376e65` → **HEAD MATCH: YES**
- Cleanup: `Remove-Item -Recurse -Force $env:TEMP\v1.13-audit-kgc00000` → **0 orphans** (`Get-ChildItem $env:TEMP -Filter "v1.13-audit-*" -Directory` count == 0). **ZERO_ORPHANS: OK.**

---

## Cross-OS EXACT MATCH Table (7-row set — D-03 corrected OS split)

The cross-OS-applicable set per D-03 (v1.13): 5 leaf validators (Windows YES + Linux YES) + 2 chain validators (Windows NO — cascade; Linux sole-authoritative). Format: PASS / FAIL / SKIP.

| # | Validator | Type | Windows (Axis 1/3 fresh clone) | Linux (Axis 2 GHA) | Verdict |
|---|-----------|------|--------------------------------|--------------------|---------|
| 1 | `v1.13-milestone-audit.mjs --verbose` + `--self-test` | leaf | **15 PASS / 0 FAIL / 0 SKIP** (exit 0); self-test: **9 passed, 0 failed** (exit 0) | **15 passed / 0 failed / 0 skipped**; self-test: 9 passed (CI harness-run job success) | **EXACT MATCH** |
| 2 | `check-phase-96.mjs` (13 checks: PRESENCE×3 + CONTENT×8 + NEGATIVE×1 + SELF×1) | leaf | **13 PASS / 0 FAIL / 0 SKIP** (exit 0) | **13 PASS / 0 FAIL / 0 SKIP** (CI check-phase-96 job success) | **EXACT MATCH** |
| 3 | `check-phase-97.mjs` (16 checks: PRESENCE×2 + CONTENT×13 + SELF×1) | leaf | **16 PASS / 0 FAIL / 0 SKIP** (exit 0) | **16 PASS / 0 FAIL / 0 SKIP** (CI check-phase-97 job success) | **EXACT MATCH** |
| 4 | `check-phase-98.mjs` (14 checks: PRESENCE×1 + CONTENT×12 + SELF×1) | leaf | **14 PASS / 0 FAIL / 0 SKIP** (exit 0) | **14 PASS / 0 FAIL / 0 SKIP** (CI check-phase-98 job success) | **EXACT MATCH** |
| 5 | `check-phase-99.mjs` (23 checks: PRESENCE×7 + CONTENT×15 + SELF×1) | leaf | **23 PASS / 0 FAIL / 0 SKIP** (exit 0) | **23 PASS / 0 FAIL / 0 SKIP** (CI check-phase-99 job success) | **EXACT MATCH** |
| 6 | `check-phase-95.mjs` (continuity CHAIN [48..94], 50 total checks) | chain | **Windows N/A — cascades** (WINDOWS-CLONE-DEEPNEST-TIMEOUT-01) | **50 PASS / 0 FAIL / 0 SKIP** (Linux-sole-authoritative; derived: v1.12 audit 49/0/1 → V-95-AUDIT now PASS post-close since 95-VERIFICATION.md exists; CHECK_PHASE_NESTED=1 confirms AUDIT+HARNESS+SELF all PASS; V-100-CHAIN-95 exits 0 in v1.13 chain run) | **Linux sole-authoritative** |
| 7 | `check-phase-100.mjs` (apex CHAIN [48..99], 55 total checks) | chain | **Windows N/A — cascades** (WINDOWS-CLONE-DEEPNEST-TIMEOUT-01) | **54 PASS / 0 FAIL / 1 SKIP** (Linux-sole-authoritative; linux-chain-ubuntu-latest job + check-phase-100 validator job both success; SKIP = V-100-AUDIT pending 100-VERIFICATION.md at close-gate) | **Linux sole-authoritative** |

**Result: cross-OS EXACT MATCH across the 5-leaf set.** All 5 leaf validators produce byte-identical PASS/FAIL/SKIP counts on Windows (fresh clone, Axis 1/3) and Linux GHA (Axis 2). Both chain validators are Linux-GHA sole-authoritative per the deep-nest doctrine (see below).

---

## Axis 2 — Linux GHA per-job conclusions (run 28401420634)

GHA run URL: https://github.com/Schweinehund/Autopilot/actions/runs/28401420634

| Job | Job ID | Conclusion | Count / Notes |
|-----|--------|-----------|---------------|
| Parse v1.13 sidecar JSON | 84153377673 | **success** | JSON schema valid (11s) |
| Harness references v1.13 sidecar | 84153421768 | **success** | path-match confirmed (7s) |
| Run v1.13 milestone audit harness | 84153452621 | **success** | 15 passed / 0 failed / 0 skipped (9s) |
| check-phase-96 validator | 84153490712 | **success** | 13 PASS / 0 FAIL / 0 SKIP (13s) |
| check-phase-97 validator | 84153490805 | **success** | 16 PASS / 0 FAIL / 0 SKIP (12s) |
| check-phase-98 validator | 84153490753 | **success** | 14 PASS / 0 FAIL / 0 SKIP (13s) |
| check-phase-99 validator | 84153490736 | **success** | 23 PASS / 0 FAIL / 0 SKIP (12s) |
| check-phase-100 validator | 84153490812 | **success** | **54 PASS / 0 FAIL / 1 SKIP** (2m40s) |
| Validator chain on Linux LF (Phase 69 CILINUX-01) | 84153490752 | **success** | **54 PASS / 0 FAIL / 1 SKIP** (CHAIN_TIMING_LINUX: `Full chain wall-clock: 160s (Windows reference: ~430s; subprocess timeout: 600s)`) |
| Supervision-pin drift advisory (CI) | 84153490809 | **success** | pin-helper advisory only (13s) |
| Quarterly c13_rotting_external link-check | 84153492064 | **skipped** | negative control — `workflow_dispatch` not `schedule`; cron-only `if:` guard confirmed |

Run dispatched: 2026-06-29T20:43:39Z. CHAIN_TIMING_LINUX `::notice` confirmed: `Full chain wall-clock: 160s (Windows reference: ~430s; subprocess timeout: 600s)`. The 10th coexistence workflow (`audit-harness-v1.13-integrity`) ran without touching predecessors v1.4–v1.12 (`continue-on-error: false`, `fetch-depth: 0`, `core.autocrlf false`, `timeout-minutes: 30`).

**check-phase-95 count derivation (continuity, row 6):** The v1.13 GHA workflow has no standalone check-phase-95 job (only check-phase-96..100 are net-new per D-03). check-phase-95 is invoked as a nested child by check-phase-100 (V-100-CHAIN-95: `PASS -- check-phase-95 exits 0 (nested)`). The standalone count is derived as follows: the v1.12 audit produced **49/0/1** (49 PASS + 1 SKIP for V-95-AUDIT, since 95-VERIFICATION.md did not yet exist at audit time). After the v1.12 close-gate, `95-VERIFICATION.md` was authored → V-95-AUDIT now **PASS** (confirmed by `CHECK_PHASE_NESTED=1` run on the current tree: AUDIT=PASS, AUDIT-HARNESS=PASS, SELF=PASS). Therefore: standalone check-phase-95 = **50 PASS / 0 FAIL / 0 SKIP**. The chain health is confirmed by V-100-CHAIN-95 exits 0 in both the `check-phase-100 validator` and `linux-chain-ubuntu-latest` GHA jobs.

---

## Axis 1/3 — Windows Fresh Clone Leaf Counts (raw capture)

Session type: zero-context PowerShell, physical + logical independence (ONE session, two axes).

```
Clone HEAD: 2ec8142ffa79237fcadf7afc67231d66a0376e65
Source HEAD: 2ec8142ffa79237fcadf7afc67231d66a0376e65
HEAD_MATCH=OK

--- v1.13-milestone-audit.mjs --verbose ---
[1/15] C1: Zero SafetyNet as compliance mechanism ........... PASS
[2/15] C2: Zero supervision as Android mgmt term ............ PASS
[3/15] C3: AOSP stub word count within Phase 39 envelope .... PASS
[4/15] C4: Zero Android links in deferred shared files ...... PASS
[5/15] C5: last_verified frontmatter on all Android docs .... PASS
[6/15] C6: PITFALL-7 preservation in AOSP + per-OEM docs .... PASS
[7/15] C7: bare-"Knox" disambiguation check ................. PASS
[9/15] C9: COPE banned-phrase check ......................... PASS
[10/15] C10: Linux frontmatter ............................. PASS
[11/15] C11: Ops-domain anti-pattern regex .................. PASS
[12/15] C12: 4-platform comparison structural validation .... PASS
[13/15] C13: Broken-link automation ......................... PASS
[14/15] C14: Rebrand-statement token-set .................... PASS
[15/15] C15: Intune-delegation anti-pattern guard ........... PASS
[16/15] C16: 4-edge cross-link integrity triangle ........... PASS
Summary: 15 passed, 0 failed, 0 skipped
EXIT_HARNESS=0

--- v1.13-milestone-audit.mjs --self-test ---
[SELF] PASS Test 1 .. Test 9 (9/9)
Self-test: 9 passed, 0 failed
EXIT_HARNESS_SELFTEST=0

--- check-phase-96.mjs ---
Result: 13 PASS, 0 FAIL, 0 SKIPPED  EXIT_96=0

--- check-phase-97.mjs ---
Result: 16 PASS, 0 FAIL, 0 SKIPPED  EXIT_97=0

--- check-phase-98.mjs ---
Result: 14 PASS, 0 FAIL, 0 SKIPPED  EXIT_98=0

--- check-phase-99.mjs ---
Result: 23 PASS, 0 FAIL, 0 SKIPPED  EXIT_99=0

CHAIN_VALIDATORS_SKIPPED=expected (Linux-sole-authoritative per D-03)
ORPHAN_COUNT=0
ZERO_ORPHANS=OK
```

---

## WINDOWS-CLONE-DEEPNEST-TIMEOUT-01 — BOTH Chain Validators Linux-Sole-Authoritative

The chain-apex (check-phase-100) spawns children with `CHECK_PHASE_NESTED=1`, producing an O(n²) subprocess cascade on a cold Windows clone. **Both chain validators are Linux-GHA sole-authoritative:**

- **check-phase-100.mjs** (v1.13 apex, CHAIN_PHASES `[48..99]`, 52 phases): Windows N/A — cascade guaranteed at this depth. Linux GHA: **54/0/1**.
- **check-phase-95.mjs** (v1.12 apex / v1.13 continuity, CHAIN_PHASES `[48..94]`, 47 phases): Windows N/A — cascade guaranteed (ALL chain validators cascade on cold Windows per empirical v1.10-v1.12 evidence). Linux sole-authoritative: **50/0/0**.

**Corrected D-03 OS split (v1.13 — carries forward v1.12 correction):** BOTH chain validators (continuity check-phase-95 AND apex check-phase-100) are Linux-GHA sole-authoritative. The `WINDOWS-CLONE-DEEPNEST-TIMEOUT-01` depth has worsened from `[48..94]` (v1.12) to **`[48..99]`** (+5 deeper). This is depth-monotone-worse and is the documented known non-blocker carried in `v1.13-DEFERRED-CLEANUP.md`.

The 5 leaf validators (v1.13-milestone-audit.mjs + check-phase-96..99) are NOT chain validators and ran cleanly and identically on both platforms → genuine cross-OS **EXACT MATCH** on the leaf set.

---

## check-phase-66 Deep-Nest Non-Blocker

**Document — do NOT fix.**

- `check-phase-66.mjs` **standalone: 28/0/0** (exits 0; internal subprocess budget 300 000 ms; independent of the 60s external shell `timeout` utility).
- In a cold Windows chain run, the 60s external `timeout` utility kills the chain runner process before it reaches check-phase-66's internal budget → **exit 124** (a `timeout` signal artifact, NOT a real validator failure).
- On **Linux GHA: PASS** — check-phase-66 exits 0 within the chain (V-100-CHAIN-66: `PASS -- check-phase-66 exits 0 (nested)`).
- This is the `WINDOWS-CLONE-DEEPNEST-TIMEOUT-01` O(n²) cascade artifact. The standalone check-phase-66 is fully healthy.

**Prior-misclassification caveat:** Phase-97 `deferred-items.md` mis-read the Windows deep-nest cascade as a genuine check-phase-66 failure. The correct interpretation (confirmed by standalone 28/0/0 run and Linux GHA PASS) is that exit-124 is a 60s external-`timeout` shell artifact, not a check-phase-66 internal failure. This caveat is documented per D-04.

---

## Conclusion

ROADMAP SC#3 satisfied: the 3-axis terminal re-audit (Axis 1 fresh `git clone --no-hardlinks` + Axis 2 cross-OS Linux GHA + Axis 3 zero-context fresh session) completes with **cross-OS PASS/FAIL/SKIP EXACT MATCH** across the 5-leaf-validator set, the apex `check-phase-100` count Linux-GHA sole-authoritative (**54/0/1**; SKIP = V-100-AUDIT pending close-gate), the continuity `check-phase-95` count Linux-GHA sole-authoritative (**50/0/0**), and zero temp-clone orphans.

**Corrected D-03 OS split documented:** BOTH chain validators (check-phase-95 [48..94] AND check-phase-100 [48..99]) are Linux-GHA sole-authoritative. `WINDOWS-CLONE-DEEPNEST-TIMEOUT-01` depth updated from `[48..94]` → **`[48..99]`** (+ 5 deeper than v1.12). The check-phase-66 exit-124 is the 60s external-`timeout` artifact (standalone 28/0/0; Linux PASS) — documented with the prior-misclassification caveat.

This artifact is consumed by the 100-04 close-gate as the HARN-03 cross-OS independence evidence. The `audit_results_sha` for the 100-04 frontmatter is the commit SHA of the `docs(100-03): HARN-03 3-axis terminal re-audit results (artifact-only)` commit.
