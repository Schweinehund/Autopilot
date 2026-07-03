---
artifact: 112-04-AUDIT-RESULTS
phase: 112-pillar-e-12th-path-a-audit-harness-lineage-bump-milestone-cl
requirement: HARN-03
audit_type: 3-axis terminal re-audit (v1.14, 12th Path-A milestone harness) — RE-RUN post-112-06 chain-health remediation
audited: 2026-07-02
audited_ref: 2de780c3dc87cd6e97a57e273852b7257eaaec49
atom2_sha: 998eeae
clone_path_pattern: "$env:TEMP\\v1.14-audit-<rand8>"
clone_rand: wsceg3i0
clone_head: 2de780c3dc87cd6e97a57e273852b7257eaaec49
gha_workflow: audit-harness-v1.14-integrity.yml
gha_workflow_run: https://github.com/Schweinehund/Autopilot/actions/runs/28625158404
gha_run_id: 28625158404
gha_dispatched_ref: master
gha_atom2_on_origin_master: 998eeae
gha_head_sha: 2de780c3dc87cd6e97a57e273852b7257eaaec49
gha_conclusion: success
chain_timing_linux_sec: 2
cross_os_exact_match: true
apex_authority: linux-gha-sole-authoritative
continuity_authority: linux-gha-sole-authoritative
apex_count_linux: "66 PASS / 0 FAIL / 1 SKIP"
stale_prior_run: 28621185019
stale_prior_head: 8cda106b6c3ffe8070a941517e3ab68c5ab030f0
stale_prior_result: "44 PASS / 22 FAIL / 1 SKIP (pre-112-06 remediation — DISCARDED)"
deep_nest_note: "WINDOWS-CLONE-DEEPNEST-TIMEOUT-01 (depth [48..111]) — BOTH chain validators cascade on Windows"
---

# Phase 112 — HARN-03 3-Axis Terminal Re-Audit Results (v1.14) — RE-RUN

**The v1.14 audit harness is the 12th Path-A milestone harness** (lineage v1.4 → v1.4.1 → v1.5 → v1.6 → v1.7 → v1.8 → v1.9 → v1.10 → v1.11 → v1.12 → v1.13 → **v1.14**). This artifact records the 3-axis terminal re-audit proving the harness produces **identical PASS/FAIL/SKIP counts across a clean Windows clone (Axis 1/3) and the GitHub Actions Linux runner (Axis 2)** — cross-OS **EXACT MATCH** — on the 12 leaf rows, with BOTH chain validators (apex `check-phase-112` [48..111] AND continuity `check-phase-95` [48..94]) taken as **Linux-GHA sole-authoritative** per decision D-04 (corrected OS split).

## Why this is a RE-RUN

The prior Axis-2 Linux GHA result (run **28621185019**, headSha `8cda106`, **44 PASS / 22 FAIL / 1 SKIP**) is **STALE and DISCARDED**. It was dispatched **before** Plan 112-06 (the chain-health remediation) greened the 22 originally-RED predecessor validators. Plan 112-06 extended the D-00 NESTED-guard to every predecessor AUDIT/self-test step that re-ran a frozen milestone-audit against evolved live corpus (Class A 67-74/82/88/93 + the manifest-missed 48/60/61-66 older cohort) and frozen-aware-converted the six 802.1X-drifted content assertions (49/57/59/63) at each validator's own milestone close-SHA. This re-audit dispatches a **FRESH** run against current `origin/master` HEAD `2de780c` (which includes 112-06 commits `e9a06bb`, `53db9fa`, `2de780c`) and reads the fresh apex result. **Expected and confirmed: apex is now GREEN on Linux (0 FAIL).**

Audited ref: `2de780c` (master HEAD at re-audit time; includes Atom 1 `feat(112-01)` + Atom 2 `998eeae` + the 112-06 remediation). The 12 leaf validators (v1.14-milestone-audit.mjs + check-phase-101..111) are byte-identical at `2de780c` and `998eeae` (Atom-2 authoring SHA); leaf counts are independent of the planning artifacts and remediation commits landed after Atom 2 (the remediation touched only predecessor check-phase-48..93 validators, none of which are v1.14 leaf rows).

---

## Pre-Flight Ordering Gate (D-03 hard gate — all 3 passed before any axis ran)

1. `git log origin/master --oneline -1` showed HEAD `2de780c docs(112-06): complete chain-health remediation plan (22 RED -> 0 nested)`; Atom-2 commit `998eeae feat(112-03): v1.14 validators + V113 pin + CI surface — HARN-02 (atomic SC#2 Atom 2)` confirmed as an ancestor of `origin/master` (`git merge-base --is-ancestor 998eeae origin/master` → YES). **PASS.**
2. `gh auth status` authenticated as **Schweinehund** with `workflow` token scope. **PASS.**
3. `gh workflow list` showed `Audit Harness v1.14 Integrity` — `state: active` (id 306267816). **PASS.**

Had the Atom-2 commit NOT been on `origin/master`, the dispatch would have been aborted — the v1.14 workflow's check-phase-101..112 jobs FAIL (not skip) if the validators are absent from the dispatched ref.

---

## Axis Recipe (executed)

| Axis | Dimension | Method |
|------|-----------|--------|
| **Axis 1** | Local physical independence | Fresh `git clone --no-hardlinks D:\claude\Autopilot $env:TEMP\v1.14-audit-wsceg3i0` (own `.git/`, NOT a worktree; permitted under `use_worktrees:false`). Cloned HEAD asserted == source HEAD (`2de780c3dc87cd6e97a57e273852b7257eaaec49`). `cd` INTO the clone before any validator (harness resolves via `process.cwd()`, NOT `__dirname`). |
| **Axis 2** | Cross-OS | `gh workflow run audit-harness-v1.14-integrity.yml --ref master` → run [28625158404](https://github.com/Schweinehund/Autopilot/actions/runs/28625158404), conclusion **success**. |
| **Axis 3** | Logical / context independence | The SAME fresh, zero-context-carryover isolated PowerShell session served Axis 1 — ONE dispatch covering two independence dimensions (per D-04; do NOT spawn two). |

**Axis 1 clone integrity:**
- `$rand` = `wsceg3i0` (charset `[0-9a-z]`, 8 chars).
- Source HEAD: `2de780c3dc87cd6e97a57e273852b7257eaaec49`
- Clone HEAD:  `2de780c3dc87cd6e97a57e273852b7257eaaec49` → **HEAD MATCH: YES**
- cwd during validators: `...\Temp\v1.14-audit-wsceg3i0` (INSIDE the clone — cwd trap avoided).
- Cleanup: `Remove-Item -Recurse -Force $env:TEMP\v1.14-audit-wsceg3i0` → **0 orphans** (`Get-ChildItem $env:TEMP -Filter "v1.14-audit-*" -Directory` count == 0). **ZERO_ORPHANS: OK.**

---

## Cross-OS EXACT MATCH Table (14-row set — D-04 corrected OS split)

The cross-OS-applicable set per D-04 (v1.14): 12 leaf validators (Windows YES + Linux YES) + 2 chain validators (Windows N/A — cascade; Linux sole-authoritative). Format: PASS / FAIL / SKIP.

| # | Validator | Type | Windows (Axis 1/3 fresh clone) | Linux (Axis 2 GHA) | Verdict |
|---|-----------|------|--------------------------------|--------------------|---------|
| 1 | `v1.14-milestone-audit.mjs --verbose` + `--self-test` | leaf | **15 PASS / 0 FAIL / 0 SKIP** (exit 0); self-test: **9 passed, 0 failed** (exit 0) | **15 passed / 0 failed / 0 skipped** (harness-run job success) | **EXACT MATCH** |
| 2 | `check-phase-101.mjs` (802.1X foundation glossary/EAP/cert) | leaf | **8 PASS / 0 FAIL / 0 SKIP** (exit 0) | **8 PASS / 0 FAIL / 0 SKIP** (check-phase-101 job success) | **EXACT MATCH** |
| 3 | `check-phase-102.mjs` (Windows 802.1X) | leaf | **4 PASS / 0 FAIL / 0 SKIP** (exit 0) | **4 PASS / 0 FAIL / 0 SKIP** (job success) | **EXACT MATCH** |
| 4 | `check-phase-103.mjs` (macOS 802.1X) | leaf | **4 PASS / 0 FAIL / 0 SKIP** (exit 0) | **4 PASS / 0 FAIL / 0 SKIP** (job success) | **EXACT MATCH** |
| 5 | `check-phase-104.mjs` (iOS/iPadOS 802.1X) | leaf | **4 PASS / 0 FAIL / 0 SKIP** (exit 0) | **4 PASS / 0 FAIL / 0 SKIP** (job success) | **EXACT MATCH** |
| 6 | `check-phase-105.mjs` (Android Enterprise 802.1X) | leaf | **4 PASS / 0 FAIL / 0 SKIP** (exit 0) | **4 PASS / 0 FAIL / 0 SKIP** (job success) | **EXACT MATCH** |
| 7 | `check-phase-106.mjs` (Linux 802.1X via nmcli) | leaf | **4 PASS / 0 FAIL / 0 SKIP** (exit 0) | **4 PASS / 0 FAIL / 0 SKIP** (job success) | **EXACT MATCH** |
| 8 | `check-phase-107.mjs` (L1 runbooks #38-41) | leaf | **7 PASS / 0 FAIL / 0 SKIP** (exit 0) | **7 PASS / 0 FAIL / 0 SKIP** (job success) | **EXACT MATCH** |
| 9 | `check-phase-108.mjs` (L2 runbooks #31-33 + decision tree #10) | leaf | **8 PASS / 0 FAIL / 0 SKIP** (exit 0) | **8 PASS / 0 FAIL / 0 SKIP** (job success) | **EXACT MATCH** |
| 10 | `check-phase-109.mjs` (802.1X integration matrices + nav hubs) | leaf | **4 PASS / 0 FAIL / 0 SKIP** (exit 0) | **4 PASS / 0 FAIL / 0 SKIP** (job success) | **EXACT MATCH** |
| 11 | `check-phase-110.mjs` (corpus fixes + MDM migration walkthroughs) | leaf | **7 PASS / 0 FAIL / 0 SKIP** (exit 0) | **7 PASS / 0 FAIL / 0 SKIP** (job success) | **EXACT MATCH** |
| 12 | `check-phase-111.mjs` (tooling refactors, consumption assertions) | leaf | **4 PASS / 0 FAIL / 0 SKIP** (exit 0) | **4 PASS / 0 FAIL / 0 SKIP** (job success) | **EXACT MATCH** |
| 13 | `check-phase-95.mjs` (continuity CHAIN [48..94]) | chain | **Windows N/A — cascades** (WINDOWS-CLONE-DEEPNEST-TIMEOUT-01) | **exits 0 nested** — V-112-CHAIN-95 PASS (Linux-sole-authoritative) | **Linux sole-authoritative** |
| 14 | `check-phase-112.mjs` (apex CHAIN [48..111], 67 total checks) | chain | **Windows N/A — cascades** (WINDOWS-CLONE-DEEPNEST-TIMEOUT-01 at depth [48..111]) | **66 PASS / 0 FAIL / 1 SKIP** (Linux-sole-authoritative; linux-chain-ubuntu-latest job + check-phase-112 validator job both success; SKIP = V-112-AUDIT pending 112-VERIFICATION.md at close-gate) | **Linux sole-authoritative** |

**Result: cross-OS EXACT MATCH across the 12-leaf set.** All 12 leaf validators produce byte-identical PASS/FAIL/SKIP counts on Windows (fresh clone, Axis 1/3) and Linux GHA (Axis 2). Both chain validators are Linux-GHA sole-authoritative per the deep-nest doctrine (see below). **The apex `check-phase-112` [48..111] is GREEN on Linux (66 PASS / 0 FAIL / 1 SKIP)** — the 22 predecessor FAILs from the stale run 28621185019 are fully resolved by the 112-06 NESTED-guard remediation. This is a GREEN cross-OS match (not the RED/RED that would obtain without the D-00-RESOLUTION + 112-06 predecessor-cohort completion).

---

## Axis 2 — Linux GHA per-job conclusions (run 28625158404)

GHA run URL: https://github.com/Schweinehund/Autopilot/actions/runs/28625158404
Dispatched ref: `master` · headSha: `2de780c` · overall conclusion: **success** · dispatched 2026-07-02T22:18:51Z.

| Job | Job ID | Conclusion | Count / Notes |
|-----|--------|-----------|---------------|
| Parse v1.14 sidecar JSON | 84889847195 | **success** | JSON schema valid (12s) |
| Harness references v1.14 sidecar | 84889881757 | **success** | path-match confirmed (7s) |
| Run v1.14 milestone audit harness | 84889902246 | **success** | 15 passed / 0 failed / 0 skipped (10s) |
| check-phase-101 validator | 84889930639 | **success** | 8 PASS / 0 FAIL / 0 SKIP (12s) |
| check-phase-102 validator | 84889930631 | **success** | 4 PASS / 0 FAIL / 0 SKIP (14s) |
| check-phase-103 validator | 84889930633 | **success** | 4 PASS / 0 FAIL / 0 SKIP (15s) |
| check-phase-104 validator | 84889930635 | **success** | 4 PASS / 0 FAIL / 0 SKIP (14s) |
| check-phase-105 validator | 84889930640 | **success** | 4 PASS / 0 FAIL / 0 SKIP (13s) |
| check-phase-106 validator | 84889930731 | **success** | 4 PASS / 0 FAIL / 0 SKIP (11s) |
| check-phase-107 validator | 84889930673 | **success** | 7 PASS / 0 FAIL / 0 SKIP (14s) |
| check-phase-108 validator | 84889930734 | **success** | 8 PASS / 0 FAIL / 0 SKIP (11s) |
| check-phase-109 validator | 84889930693 | **success** | 4 PASS / 0 FAIL / 0 SKIP (14s) |
| check-phase-110 validator | 84889930755 | **success** | 7 PASS / 0 FAIL / 0 SKIP (12s) |
| check-phase-111 validator | 84889930719 | **success** | 4 PASS / 0 FAIL / 0 SKIP (12s) |
| check-phase-112 validator (apex) | 84889930773 | **success** | **66 PASS / 0 FAIL / 1 SKIP** (16s); V-112-CHAIN-95 PASS, V-112-CHAIN-111 PASS, V-112-AUDIT-HARNESS PASS, V-112-AUDIT SKIP |
| Validator chain on Linux LF (Phase 69 CILINUX-01) | 84889930626 | **success** | **66 PASS / 0 FAIL / 1 SKIP** (CHAIN_TIMING_LINUX `::notice`: `Full chain wall-clock: 2s`) |
| Supervision-pin drift advisory (CI) | 84889930695 | **success** | pin-helper advisory only (13s) |
| Quarterly c13_rotting_external link-check | 84889931280 | **skipped** | negative control — `workflow_dispatch` not `schedule`; cron-only `if:` guard confirmed |

**Linux chain wall-clock = 2s** (vs v1.13's 160s). The dramatic drop is the direct effect of the 112-06 remediation: the predecessor AUDIT/self-test re-runs that previously executed a frozen milestone-audit against live corpus on every nested visit are now short-circuited under `CHECK_PHASE_NESTED=1`, collapsing the O(n²) subprocess cost. The 11th coexistence workflow (`audit-harness-v1.14-integrity`) ran without touching predecessors v1.4–v1.13 (`continue-on-error: false`, `fetch-depth: 0`, `core.autocrlf false`, `timeout-minutes: 30`).

**check-phase-95 continuity (row 13):** The v1.14 GHA workflow has no standalone check-phase-95 job (only check-phase-101..112 are net-new per D-04). check-phase-95 is invoked as a nested child by check-phase-112 (`V-112-CHAIN-95: PASS -- check-phase-95 exits 0 (nested)`), confirmed on Linux in BOTH the `check-phase-112 validator` job and the `linux-chain-ubuntu-latest` job. **In-chain it exits 0** (its AUDIT-HARNESS step is NESTED-guarded — the 112-01/112-06 mechanism). Its STANDALONE (non-nested) AUDIT-HARNESS step would re-run the frozen `v1.12-milestone-audit.mjs` against the evolved 90-day v1.14 corpus → the accepted predecessor-standalone-RED condition (see below) — NOT a re-audit failure, and NOT the count that gates the chain.

---

## Axis 1/3 — Windows Fresh Clone Leaf Counts (raw capture)

Session type: zero-context isolated PowerShell, physical + logical independence (ONE session, two axes).

```
RAND=wsceg3i0
DEST=$env:TEMP\v1.14-audit-wsceg3i0
SOURCE_HEAD=2de780c3dc87cd6e97a57e273852b7257eaaec49
CLONE_HEAD=2de780c3dc87cd6e97a57e273852b7257eaaec49
HEAD_MATCH=OK
CWD=...\Temp\v1.14-audit-wsceg3i0   (cd INTO clone — cwd trap avoided)

--- v1.14-milestone-audit.mjs --verbose ---
Summary: 15 passed, 0 failed, 0 skipped        EXIT_HARNESS=0

--- v1.14-milestone-audit.mjs --self-test ---
Self-test: 9 passed, 0 failed                  EXIT_HARNESS_SELFTEST=0

--- check-phase-101.mjs ---  Result: 8 PASS, 0 FAIL, 0 SKIPPED   EXIT_101=0
--- check-phase-102.mjs ---  Result: 4 PASS, 0 FAIL, 0 SKIPPED   EXIT_102=0
--- check-phase-103.mjs ---  Result: 4 PASS, 0 FAIL, 0 SKIPPED   EXIT_103=0
--- check-phase-104.mjs ---  Result: 4 PASS, 0 FAIL, 0 SKIPPED   EXIT_104=0
--- check-phase-105.mjs ---  Result: 4 PASS, 0 FAIL, 0 SKIPPED   EXIT_105=0
--- check-phase-106.mjs ---  Result: 4 PASS, 0 FAIL, 0 SKIPPED   EXIT_106=0
--- check-phase-107.mjs ---  Result: 7 PASS, 0 FAIL, 0 SKIPPED   EXIT_107=0
--- check-phase-108.mjs ---  Result: 8 PASS, 0 FAIL, 0 SKIPPED   EXIT_108=0
--- check-phase-109.mjs ---  Result: 4 PASS, 0 FAIL, 0 SKIPPED   EXIT_109=0
--- check-phase-110.mjs ---  Result: 7 PASS, 0 FAIL, 0 SKIPPED   EXIT_110=0
--- check-phase-111.mjs ---  Result: 4 PASS, 0 FAIL, 0 SKIPPED   EXIT_111=0

CHAIN_VALIDATORS_SKIPPED=expected (check-phase-95 + check-phase-112 Linux-sole-authoritative per D-04)
ORPHAN_COUNT=0
ZERO_ORPHANS=OK
```

---

## WINDOWS-CLONE-DEEPNEST-TIMEOUT-01 — BOTH Chain Validators Linux-Sole-Authoritative

The chain-apex (check-phase-112) spawns children with `CHECK_PHASE_NESTED=1`, producing an O(n²) subprocess cascade on a cold Windows clone. **Both chain validators are Linux-GHA sole-authoritative:**

- **check-phase-112.mjs** (v1.14 apex, CHAIN_PHASES `[48..111]`, 64 phases): Windows N/A — cascade guaranteed at this depth. Linux GHA: **66/0/1**.
- **check-phase-95.mjs** (v1.12 apex / v1.14 continuity, CHAIN_PHASES `[48..94]`, 47 phases): Windows N/A — cascade guaranteed. Linux: exits 0 nested (V-112-CHAIN-95 PASS).

**D-04 OS split (v1.14):** BOTH chain validators are Linux-GHA sole-authoritative. The `WINDOWS-CLONE-DEEPNEST-TIMEOUT-01` depth has worsened from `[48..99]` (v1.13) to **`[48..111]`** — 12 subprocess trees deeper. This is depth-monotone-worse and is the documented known non-blocker carried in `v1.14-DEFERRED-CLEANUP.md` (authored at Plan 112-05). **Caveat:** the OOM-vs-timeout flip risk at the new `[48..111]` depth is unmeasured (growth is linear under `CHECK_PHASE_NESTED=1`, so risk is LOW); carried forward to DEFERRED-CLEANUP alongside the deferred O(n²) subprocess-caching remediation (2–4h, out of close scope).

The 12 leaf validators (v1.14-milestone-audit.mjs + check-phase-101..111) are NOT chain validators and ran cleanly and identically on both platforms → genuine cross-OS **EXACT MATCH** on the leaf set.

---

## Accepted predecessor-standalone-CI-RED (NOT a re-audit failure)

The `audit-harness-v1.12-integrity.yml` and `audit-harness-v1.13-integrity.yml` workflows trigger on any PR touching `check-phase-*.mjs` (their path-filter glob matches the new check-phase-101..112 files). Their `harness-run` job FAILs standalone because those frozen harnesses pin a **60-day** freshness invariant (`if (diffDays > 60)`) against a v1.14 corpus that now carries **90-day** `review_by` stamps (the deliberate discuss-flag #7 / 101-CONTEXT:88 decision), plus the Phase-101/109 line-pin drift. Editing those frozen workflows/harnesses is barred by the byte-unchanged-predecessor invariant (D-00a). This RED is **architecturally expected**: a frozen milestone-audit validates its own close-SHA corpus, not future evolved corpus. The v1.14 chain correctness is guaranteed by the NESTED-guard (112-01/112-06), and CI is authoritative via the NEW `audit-harness-v1.14-integrity.yml` workflow (all-green above). This condition is documented at Plan 112-05 (`v1.14-MILESTONE-AUDIT.md` + `v1.14-DEFERRED-CLEANUP.md`) and is **NOT** treated as a re-audit failure. The same reasoning applies to the standalone (non-nested) AUDIT-HARNESS step of continuity `check-phase-95` (row 13).

---

## Conclusion

ROADMAP SC#3 (part 1) satisfied: the 3-axis terminal re-audit RE-RUN (Axis 1 fresh `git clone --no-hardlinks` + Axis 2 cross-OS Linux GHA run [28625158404](https://github.com/Schweinehund/Autopilot/actions/runs/28625158404) + Axis 3 zero-context isolated session) completes with **cross-OS PASS/FAIL/SKIP EXACT MATCH** across the 12-leaf-validator set, the apex `check-phase-112` [48..111] count Linux-GHA sole-authoritative and **GREEN** (**66/0/1**; SKIP = V-112-AUDIT pending close-gate), the continuity `check-phase-95` [48..94] Linux-GHA sole-authoritative (exits 0 nested), and zero temp-clone orphans.

**Stale run 28621185019 (44/22/1) DISCARDED.** The fresh run against `2de780c` confirms the 112-06 remediation resolved all 22 predecessor FAILs OS-independently on Linux.

**D-04 OS split documented:** BOTH chain validators (check-phase-95 [48..94] AND check-phase-112 [48..111]) are Linux-GHA sole-authoritative. `WINDOWS-CLONE-DEEPNEST-TIMEOUT-01` depth updated `[48..99]` → **`[48..111]`** (+12 deeper than v1.13). The predecessor v1.12/v1.13 standalone-CI RED (60d vs 90d corpus) is recorded as an accepted, path-filter-scoped condition (documented at 112-05), NOT a re-audit failure.

This artifact is consumed by the 112-05 close-gate as the HARN-03 cross-OS independence evidence. The `audit_results_sha` for the 112-05 frontmatter is the commit SHA of the `docs(112-04): HARN-03 3-axis terminal re-audit results (artifact-only)` commit.
