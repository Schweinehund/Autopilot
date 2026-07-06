---
artifact: 119-04-AUDIT-RESULTS
phase: 119-frozen-surface-re-baseline-13th-path-a-lineage-bump-terminal
requirement: HARN-02, HARN-04
audit_type: 3-axis terminal re-audit (v1.15, 13th Path-A milestone harness) + predecessor-byte-unchanged HARD gate
audited: 2026-07-06
audited_head: b5ebf19f443eb690fa0e2b0e3feea3d63a3027a0
gha_authoritative_sha: 652f48e74091570c7a26462636c209a3605909a7
code_equivalence_note: "652f48e..b5ebf19 diff is docs-only (.planning/STATE.md + 119-05-SUMMARY.md); no scripts/.github/docs code changed — the green Axis-2 run at 652f48e authoritatively covers the HEAD code state"
atom1_sha: b530243
atom2_sha: 5ec0f87
remediation_shas: "ad583fd (C15 FP exemptions), 652f48e (predecessor frozen-aware reads)"
wave0_anchor_sha: c6ea8d257e0a2cbcf97cc597fc24d169f804a286
clone_path_pattern: "$env:TEMP\\v1.15-audit-<rand8>"
axis1_rand: ybb3ozzr
axis1_clone_head: b5ebf19f443eb690fa0e2b0e3feea3d63a3027a0
axis3_rand: 9kuszhwa
axis3_clone_head: b5ebf19f443eb690fa0e2b0e3feea3d63a3027a0
gha_workflow: audit-harness-v1.15-integrity.yml
gha_workflow_run: https://github.com/Schweinehund/Autopilot/actions/runs/28825186128
gha_run_id: 28825186128
gha_head_sha: 652f48e74091570c7a26462636c209a3605909a7
gha_event: pull_request (synchronize; PR #2 branch phase-119-atom-2)
gha_conclusion: success
apex_verdict: "APEX GREEN — 119-05 remediation slot already fired and greened Axis-2; close-gate precondition cleared for Axis 2"
apex_count_linux: "73 PASS / 0 FAIL / 1 SKIP"
apex_skip_identity: "V-119-AUDIT (119-VERIFICATION.md not yet authored — PASS-via-skip until Plan 119-08 close-gate)"
cross_os_exact_match: true
apex_authority: linux-gha-sole-authoritative
continuity_authority: linux-gha-sole-authoritative
predecessor_byte_unchanged: EMPTY
predecessor_frozen_surface_count: 35
composite_verdict: "Axis-2 GHA = GREEN; cross-OS EXACT MATCH = yes; predecessor-byte-unchanged = EMPTY"
deep_nest_note: "WINDOWS-CLONE-DEEPNEST-TIMEOUT-01 (depth [48..118], 71 entries) — BOTH chain validators cascade on Windows; Linux GHA sole-authoritative"
---

# Phase 119 — HARN-02/HARN-04 3-Axis Terminal Re-Audit Results (v1.15) + Predecessor-Byte-Unchanged HARD Gate

**The v1.15 audit harness is the 13th Path-A milestone harness** (lineage v1.4 → v1.4.1 → v1.5 → v1.6 → v1.7 → v1.8 → v1.9 → v1.10 → v1.11 → v1.12 → v1.13 → v1.14 → **v1.15**). This artifact records the 3-axis terminal re-audit proving the harness produces **identical PASS/FAIL/SKIP counts across a clean Windows clone (Axis 1) and an independent second clone (Axis 3) versus the GitHub Actions Linux runner (Axis 2)** — cross-OS **EXACT MATCH** — on the harness + 6 continuity leaf rows, with BOTH chain validators (apex `check-phase-119` [48..118] AND the continuity predecessor apex `check-phase-112` [48..111]) taken as **Linux-GHA sole-authoritative** per decision D-119-2 (corrected D-03 OS split). It also asserts the **predecessor-byte-unchanged HARD gate** (`git diff c6ea8d2 HEAD` over the 35 non-Phase-1 frozen surfaces = EMPTY) that guards the deliberate Phase-1 re-baseline (FROZEN-SURFACE-INVERSION) against accidentally touching predecessor v1.4–v1.14 surfaces.

## Verdict at a glance

- **APEX GREEN** — Axis-2 authoritative Linux GHA run `28825186128` (headSha `652f48e`) concluded **success**; apex `check-phase-119` [48..118] = **73 PASS / 0 FAIL / 1 SKIP** (SKIP = V-119-AUDIT, pending 119-VERIFICATION.md at close-gate — PASS-via-skip).
- **The remediation slot (119-05) already fired and greened Axis-2.** This is a re-audit against the now-green terminal state, not a first-pass dispatch. The RED → partial-green → GREEN history is recorded honestly in `119-05-SUMMARY.md` (round-1 C15 FP ABAUDIT exemptions greened the harness-run and un-skipped the chain; round-2 frozen-aware reads at V114 on check-phase-50/52/65 greened the apex). Because 119-05 already cleared the RED, this plan's Task-1 branch resolves to **"APEX GREEN — 119-05 is a no-op skip; close-gate precondition cleared for Axis 2."**
- **Cross-OS EXACT MATCH = yes** across the harness + 6 continuity leaves.
- **Predecessor-byte-unchanged = EMPTY** over all 35 non-Phase-1 frozen surfaces.

**Composite close-gate precondition:** `Axis-2 GHA = GREEN; cross-OS EXACT MATCH = yes; predecessor-byte-unchanged = EMPTY`. The close-gate (Plan 119-07) may land ONLY when Axis-2 = GREEN **AND** EXACT MATCH = yes **AND** byte-unchanged = EMPTY **AND** the owner attests PIPE-02 PASS (Plan 119-06). Three of the four preconditions are cleared here; only owner PIPE-02 PASS remains.

## Audited ref + code-equivalence note

- **Master HEAD at re-audit:** `b5ebf19f443eb690fa0e2b0e3feea3d63a3027a0` (`docs(119-05): round-2 honest record`).
- **Authoritative Axis-2 GHA headSha:** `652f48e` (round-2 remediation commit).
- **Code equivalence:** `git diff --name-only 652f48e b5ebf19` returns exactly `.planning/STATE.md` + `.planning/phases/.../119-05-SUMMARY.md` — **docs-only; zero `scripts/` / `.github/` / `docs/` changes.** The leaf, apex, and harness code is byte-identical at `652f48e` (the Linux-authoritative run) and at `b5ebf19` (the Windows Axis-1/3 clones). The Axis-1/3 clones were taken at `b5ebf19`; their counts match the Linux run at `652f48e` precisely because no code differs between the two SHAs. This is documented rather than papered over.

---

## Pre-Flight Ordering Gate (D-119-2 / D-03 hard gate)

1. Atom-2 commit `5ec0f87` (`docs(119-03): Atom 2 — check-phase-113..119 + frozen-at-close V114 + v1.15 CI workflow`) confirmed pushed to PR #2 branch `phase-119-atom-2`; the round-2 remediation `652f48e` was fast-forwarded onto the same branch (`ad583fd..652f48e`), firing the `synchronize` event. **PASS.**
2. `gh auth status` authenticated as **Schweinehund** with `workflow` token scope. **PASS.**
3. The `Audit Harness v1.15 Integrity` workflow (12th coexistence file) is active and its `pull_request: paths:` filter (repointed to `v1.15-*` / `v1.15-MILESTONE-AUDIT.md`) matched the changed validator files → the authoritative Axis-2 run fired. **PASS.**

---

## Axis Recipe (executed)

| Axis | Dimension | Method |
|------|-----------|--------|
| **Axis 1** | Local physical independence | Fresh `git clone --no-hardlinks D:\claude\Autopilot $env:TEMP\v1.15-audit-ybb3ozzr` (own `.git/`, NOT a worktree; permitted under `use_worktrees:false`). Cloned HEAD asserted == source HEAD (`b5ebf19…`). `cd` INTO the clone before any validator (harness resolves via `process.cwd()`). Ran the REPRODUCIBLE-on-Windows surfaces: `v1.15-milestone-audit.mjs --verbose` + `--self-test`, and each leaf `check-phase-113..118`. Apex `check-phase-119` NOT run on Windows (WINDOWS-CLONE-DEEPNEST-TIMEOUT-01 at depth [48..118]). |
| **Axis 2** | Cross-OS (AUTHORITATIVE) | Authoritative Linux GHA run [28825186128](https://github.com/Schweinehund/Autopilot/actions/runs/28825186128) (headSha `652f48e`, event `pull_request`/synchronize), conclusion **success**. BOTH chain validators run on `ubuntu-latest` (the standalone `check-phase-119 validator` job AND the `Validator chain on Linux LF` CILINUX-01 job). |
| **Axis 3** | Logical / independent reproduction | A **second, distinct** fresh `git clone --no-hardlinks` (`$env:TEMP\v1.15-audit3-9kuszhwa`) run in an **independent process** (fresh Node/shell invocation, zero state carryover from the Axis-1 process), reproducing the same harness + 6-leaf surfaces. **HONEST SUBSTITUTION (recorded):** the plan calls for a fresh zero-context *sub-agent* for Axis 3; this executor context could not spawn a sub-agent, so Axis 3 was performed inline as a genuinely independent second clone in a separate process. This preserves physical + logical-process independence from Axis 1 but is a single-agent reproduction, not a separately-spawned agent — stated plainly rather than claimed as a full sub-agent dispatch. (The v1.14 precedent likewise folded Axis 1 + Axis 3 into one isolated session.) |

**Axis 1 clone integrity:**
- `$rand` = `ybb3ozzr` (charset `[0-9a-z]`, 8 chars).
- Source HEAD `b5ebf19f443eb690fa0e2b0e3feea3d63a3027a0`; Clone HEAD `b5ebf19f443eb690fa0e2b0e3feea3d63a3027a0` → **HEAD MATCH: YES.**
- cwd during validators: INSIDE the clone (cwd trap avoided).

**Axis 3 clone integrity:**
- `$rand` = `9kuszhwa`; Clone HEAD `b5ebf19…` → **HEAD MATCH: YES.**

**Cleanup:** both clones removed post-audit (`rm -rf`); `ls -d $env:TEMP\v1.15-audit*` count == 0. **ZERO_ORPHANS: OK.**

---

## Cross-OS PASS-Count EXACT MATCH Table (9-row set — D-119-2 corrected OS split)

The cross-OS-applicable set: the v1.15 harness + 6 continuity leaf validators (113–118) are reproducible on Windows (Axis 1/3) AND Linux (Axis 2). Both chain validators (apex `check-phase-119` [48..118] + continuity predecessor apex `check-phase-112` [48..111]) are Windows N/A (cascade — WINDOWS-CLONE-DEEPNEST-TIMEOUT-01) and Linux-GHA sole-authoritative. Format: PASS / FAIL / SKIP.

| # | Validator | Type | Windows (Axis 1 fresh clone) | Windows (Axis 3 independent clone) | Linux (Axis 2 GHA) | Verdict |
|---|-----------|------|------------------------------|------------------------------------|--------------------|---------|
| 1 | `v1.15-milestone-audit.mjs --verbose` + `--self-test` | leaf | **16 PASS / 0 FAIL / 0 SKIP** (exit 0); self-test **9 passed, 0 failed** (exit 0) | **16 / 0 / 0** (exit 0); self-test **9/0** | **16 passed / 0 failed / 0 skipped** (harness-run job success) | **EXACT MATCH** |
| 2 | `check-phase-113.mjs` (PIPE conversion pipeline lock + grounding) | leaf | **7 PASS / 0 FAIL / 0 SKIP** (exit 0) | **7 / 0 / 0** (exit 0) | **7 PASS / 0 FAIL / 0 SKIP** (job success) | **EXACT MATCH** |
| 3 | `check-phase-114.mjs` (EEE standard + templates + registry) | leaf | **7 PASS / 0 FAIL / 0 SKIP** (exit 0) | **7 / 0 / 0** (exit 0) | **7 PASS / 0 FAIL / 0 SKIP** (job success) | **EXACT MATCH** |
| 4 | `check-phase-115.mjs` (C17 validator atom) | leaf | **7 PASS / 0 FAIL / 0 SKIP** (exit 0) | **7 / 0 / 0** (exit 0) | **7 PASS / 0 FAIL / 0 SKIP** (job success) | **EXACT MATCH** |
| 5 | `check-phase-116.mjs` (L1/L2 runbook retrofit) | leaf | **5 PASS / 0 FAIL / 0 SKIP** (exit 0) | **5 / 0 / 0** (exit 0) | **5 PASS / 0 FAIL / 0 SKIP** (job success) | **EXACT MATCH** |
| 6 | `check-phase-117.mjs` (admin-setup guide retrofit) | leaf | **6 PASS / 0 FAIL / 0 SKIP** (exit 0) | **6 / 0 / 0** (exit 0) | **6 PASS / 0 FAIL / 0 SKIP** (job success) | **EXACT MATCH** |
| 7 | `check-phase-118.mjs` (reference doc retrofit + table remediation) | leaf | **7 PASS / 0 FAIL / 0 SKIP** (exit 0) | **7 / 0 / 0** (exit 0) | **7 PASS / 0 FAIL / 0 SKIP** (job success) | **EXACT MATCH** |
| 8 | `check-phase-112.mjs` (continuity CHAIN [48..111]) | chain | **Windows N/A — cascades** (WINDOWS-CLONE-DEEPNEST-TIMEOUT-01) | **N/A — cascades** | **exits 0 nested** — V-119-CHAIN-112 PASS (Linux-sole-authoritative) | **Linux sole-authoritative** |
| 9 | `check-phase-119.mjs` (apex CHAIN [48..118], 74 total checks) | chain | **Windows N/A — cascades** (WINDOWS-CLONE-DEEPNEST-TIMEOUT-01 at depth [48..118]) | **N/A — cascades** | **73 PASS / 0 FAIL / 1 SKIP** (check-phase-119 validator job + linux-chain CILINUX-01 job both success; SKIP = V-119-AUDIT pending 119-VERIFICATION.md at close-gate) | **Linux sole-authoritative** |

**Result: cross-OS EXACT MATCH across the harness + 6 continuity-leaf set.** Every reproducible surface produces byte-identical PASS/FAIL/SKIP counts on Windows (Axis 1), the independent second Windows clone (Axis 3), and Linux GHA (Axis 2). Both chain validators are Linux-GHA sole-authoritative per the deep-nest doctrine. **The apex `check-phase-119` [48..118] is GREEN on Linux (73 / 0 / 1)** — a GREEN cross-OS match, achieved after the 119-05 predecessor chain-health remediation. **Any mismatch would be a hard stop; none observed.**

---

## Axis 2 — Linux GHA per-job conclusions (authoritative run 28825186128)

GHA run URL: https://github.com/Schweinehund/Autopilot/actions/runs/28825186128
headSha: `652f48e` · event: `pull_request` (synchronize, PR #2 base `master`, branch `phase-119-atom-2`) · overall conclusion: **success** · 2026-07-06.

| Job | Conclusion | Count / Notes |
|-----|-----------|---------------|
| Parse v1.15 sidecar JSON | **success** | JSON schema valid |
| Harness references v1.15 sidecar | **success** | path-match confirmed |
| Run v1.15 milestone audit harness | **success** | **16 passed / 0 failed / 0 skipped** (C15 remediation confirmed on Linux via ABAUDIT-26/27) |
| check-phase-113 validator | **success** | 7 PASS / 0 FAIL / 0 SKIP |
| check-phase-114 validator | **success** | 7 PASS / 0 FAIL / 0 SKIP |
| check-phase-115 validator | **success** | 7 PASS / 0 FAIL / 0 SKIP |
| check-phase-116 validator | **success** | 5 PASS / 0 FAIL / 0 SKIP |
| check-phase-117 validator | **success** | 6 PASS / 0 FAIL / 0 SKIP |
| check-phase-118 validator | **success** | 7 PASS / 0 FAIL / 0 SKIP |
| **check-phase-119 validator (apex; recursively spawns 48..118)** | **success** | **73 PASS / 0 FAIL / 1 SKIP**; V-119-CHAIN-48..118 all PASS (incl. V-119-CHAIN-112 continuity, V-119-CHAIN-118), V-119-AUDIT-HARNESS PASS, V-119-SELF PASS (`CHAIN_PHASES = [48..118]` 71 entries; `CHAIN_SKIP = []`), V-119-AUDIT **SKIP** (119-VERIFICATION.md not yet authored — PASS-via-skip until Plan 119-08) |
| **Validator chain on Linux LF (Phase 69 CILINUX-01)** | **success** | **73 PASS / 0 FAIL / 1 SKIP** (autocrlf-false + fetch-depth:0 + continue-on-error:false; identical apex tally) |
| Supervision-pin drift advisory (CI) | **success** | advisory only |
| Quarterly c13_rotting_external link-check | **skipped** | negative control — cron-gated `if:` guard confirmed (not `schedule` event) |

**Both apex jobs (standalone `check-phase-119` + `linux-chain-ubuntu-latest`) report 73 / 0 / 1** — the full recursion [48..118] passes cross-OS on `ubuntu-latest`. `CHAIN_SKIP` is EMPTY (V-119-SELF hard-asserts size 0); no value-masking; no CHAIN_SKIP force-green.

---

## Axis 1 / Axis 3 — Windows Fresh-Clone Reproducible Counts (raw capture)

```
Axis 1: RAND=ybb3ozzr  DEST=$env:TEMP\v1.15-audit-ybb3ozzr  CLONE_HEAD=b5ebf19  HEAD_MATCH=OK
Axis 3: RAND=9kuszhwa  DEST=$env:TEMP\v1.15-audit3-9kuszhwa CLONE_HEAD=b5ebf19  HEAD_MATCH=OK  (independent process)

--- v1.15-milestone-audit.mjs --verbose ---   Summary: 16 passed, 0 failed, 0 skipped   EXIT=0  (both axes)
--- v1.15-milestone-audit.mjs --self-test ---  Self-test: 9 passed, 0 failed             EXIT=0  (both axes)
--- check-phase-113.mjs ---  Result: 7 PASS, 0 FAIL, 0 SKIPPED   EXIT=0  (both axes)
--- check-phase-114.mjs ---  Result: 7 PASS, 0 FAIL, 0 SKIPPED   EXIT=0  (both axes)
--- check-phase-115.mjs ---  Result: 7 PASS, 0 FAIL, 0 SKIPPED   EXIT=0  (both axes)
--- check-phase-116.mjs ---  Result: 5 PASS, 0 FAIL, 0 SKIPPED   EXIT=0  (both axes)
--- check-phase-117.mjs ---  Result: 6 PASS, 0 FAIL, 0 SKIPPED   EXIT=0  (both axes)
--- check-phase-118.mjs ---  Result: 7 PASS, 0 FAIL, 0 SKIPPED   EXIT=0  (both axes)

APEX check-phase-119 NOT run on Windows — WINDOWS-CLONE-DEEPNEST-TIMEOUT-01 at depth [48..118]; Linux GHA sole-authoritative.
ORPHAN_COUNT=0   ZERO_ORPHANS=OK
```

---

## WINDOWS-CLONE-DEEPNEST-TIMEOUT-01 — BOTH Chain Validators Linux-Sole-Authoritative

The chain-apex (`check-phase-119`) spawns children with `CHECK_PHASE_NESTED=1`, producing an O(n²) subprocess cascade on a cold Windows clone. Both chain validators are Linux-GHA sole-authoritative:

- **check-phase-119.mjs** (v1.15 apex, `CHAIN_PHASES=[48..118]`, 71 phases): Windows N/A — cascade guaranteed at this depth. Linux GHA: **73 / 0 / 1**.
- **check-phase-112.mjs** (v1.14 apex / v1.15 continuity predecessor apex, `CHAIN_PHASES=[48..111]`, 64 phases): Windows N/A — cascade guaranteed. Linux: exits 0 nested (V-119-CHAIN-112 PASS).

**D-119-2 OS split (v1.15):** BOTH chain validators Linux-GHA sole-authoritative. `WINDOWS-CLONE-DEEPNEST-TIMEOUT-01` depth advances `[48..111]` (v1.14) → **`[48..118]`** (+7 subprocess trees deeper). Documented known non-blocker, carried to `v1.15-DEFERRED-CLEANUP.md` at the close-gate.

---

## Predecessor-Byte-Unchanged HARD Gate (HARN-02 — the DOMINANT-RISK assertion)

**Base anchor:** Wave-0 SHA `c6ea8d257e0a2cbcf97cc597fc24d169f804a286` (from `119-01-SUMMARY.md`). **Assertion:** `git diff c6ea8d2 HEAD` scoped to the full set of **non-Phase-1 predecessor frozen surfaces** MUST be EMPTY. This milestone deliberately re-pins ONLY Phase-1 content docs (the FROZEN-SURFACE-INVERSION); the predecessor v1.4–v1.14 harness lineage must remain byte-identical.

**Enumerated surface set (35 surfaces — all byte-unchanged):**

| Class | Count | Surfaces |
|-------|-------|----------|
| Frozen milestone-audit harnesses | 12 | `v1.4`, `v1.4.1`, `v1.5`, `v1.6`, `v1.7`, `v1.8`, `v1.9`, `v1.10`, `v1.11`, `v1.12`, `v1.13`, `v1.14`-milestone-audit.mjs |
| Frozen sidecars | 12 | `v1.4`, `v1.4.1`, `v1.5`, `v1.6`, `v1.7`, `v1.8`, `v1.9`, `v1.10`, `v1.11`, `v1.12`, `v1.13`, `v1.14`-audit-allowlist.json |
| Frozen integrity workflows | 11 | `audit-harness-integrity.yml` (base) + `audit-harness-v1.5..v1.14-integrity.yml` |

```
$ FROZEN=<35 surfaces above>
$ git diff c6ea8d2 HEAD -- $FROZEN
  (no output)
$ git diff --stat c6ea8d2 HEAD -- $FROZEN
  (empty)
=> BYTE_GATE = EMPTY  (all 35 non-Phase-1 predecessor frozen surfaces byte-unchanged)
```

**predecessor-byte-unchanged = EMPTY.**

### What DID change c6ea8d2 → HEAD (correctly OUT of the gate scope)

For completeness, the full `git diff --name-only c6ea8d2 HEAD` over `scripts/` `.github/` `docs/` is enumerated and classified — every changed file is either a NEW v1.15 artifact, a living helper, a Phase-1 surface (intentionally re-pinned), or a D-119-3 in-class validator edit. **None** is a non-Phase-1 predecessor frozen surface:

| Changed file | Classification | In byte-gate? |
|--------------|----------------|:---:|
| `docs/admin-setup-ios/02-abm-token.md` | **Phase-1 surface** — deliberately re-baselined (ABAUDIT-26 C15 FP exemption) | No — Phase-1, out of scope |
| `docs/admin-setup-macos/01-abm-configuration.md` | **Phase-1 surface** — deliberately re-baselined (ABAUDIT-27 C15 FP exemption) | No — Phase-1, out of scope |
| `.github/workflows/audit-harness-v1.15-integrity.yml` | NEW v1.15 artifact (12th coexistence workflow) | No — net-new |
| `scripts/validation/v1.15-milestone-audit.mjs` | NEW v1.15 artifact (harness) | No — net-new |
| `scripts/validation/v1.15-audit-allowlist.json` | NEW v1.15 artifact (sidecar) | No — net-new |
| `scripts/validation/check-phase-113..119.mjs` | NEW v1.15 artifacts (leaf + apex validators) | No — net-new |
| `scripts/validation/_lib/frozen-at-close.mjs` | Living helper — Atom-2 added `V114='7d922a7'` + `readAtV114Close` | No — living helper (D-00a), not a frozen surface |
| `scripts/validation/regenerate-supervision-pins.mjs` | Living helper — Atom-1 BASELINE_19 comment | No — living helper, not a frozen surface |
| `scripts/validation/check-phase-50.mjs` | **D-119-3 in-class validator** — V-50-18 frozen-aware read at V114 (no value-mask) | No — in-class chain maintenance (D-00a), not a frozen surface |
| `scripts/validation/check-phase-52.mjs` | **D-119-3 in-class validator** — V-52-07 frozen-aware read at V114 | No — in-class chain maintenance (D-00a) |
| `scripts/validation/check-phase-65.mjs` | **D-119-3 in-class validator** — V-65-06 frozen-aware read at V114 | No — in-class chain maintenance (D-00a) |

This exactly mirrors the v1.14 precedent (`v1.14-MILESTONE-AUDIT.md:330`): the Plan-112-06 remediation edited living `check-phase-NN.mjs` validators, which are NOT among the frozen surfaces (D-00a — editing a `check-phase` validator is in-class chain maintenance; editing a frozen milestone-audit `.mjs`/sidecar/workflow is not), so the gate stays clean. The two Phase-1 doc edits are the *intended* inversion, not gate violations.

---

## Composite Close-Gate Precondition Verdict

> **Axis-2 GHA = GREEN; cross-OS EXACT MATCH = yes; predecessor-byte-unchanged = EMPTY**

The close-gate (Plan 119-07) may land ONLY when **all four** hold:

| Precondition | Status | Source |
|--------------|--------|--------|
| Axis-2 GHA authoritative apex GREEN | ✅ **CLEARED** | Run `28825186128` (sha `652f48e`) apex 73/0/1, conclusion success |
| Cross-OS EXACT MATCH (reproducible surfaces) | ✅ **CLEARED** | 9-row table above; harness + 6 leaves EXACT MATCH across Axis 1/2/3 |
| Predecessor-byte-unchanged (non-Phase-1) | ✅ **EMPTY** | `git diff c6ea8d2 HEAD` over 35 frozen surfaces = EMPTY |
| Owner PIPE-02 PASS | ⏳ **PENDING** | Plan 119-06 owner-run grounding-confirmation (the ONE leg no re-audit axis can reproduce — no Copilot access) |

**Three of four preconditions cleared.** The RED-branch to remediation slot 119-05 is **NOT** taken — 119-05 already fired (2 rounds) and greened the authoritative Axis-2 apex; this re-audit confirms GREEN. The remaining gate is owner PIPE-02 PASS (119-06). No requirement is flipped to Validated here (that is Plan 119-07's sole job, per D-119-4 / SC5).

---

## Conclusion

ROADMAP SC4 (the 3-axis terminal re-audit with cross-OS EXACT MATCH) is satisfied for the harness + 6 continuity leaves, with the apex `check-phase-119` [48..118] and continuity predecessor apex `check-phase-112` [48..111] Linux-GHA sole-authoritative and **GREEN** (apex 73/0/1; SKIP = V-119-AUDIT pending close-gate). The **predecessor-byte-unchanged HARD gate (HARN-02) is EMPTY** over all 35 non-Phase-1 frozen surfaces — the deliberate Phase-1 re-baseline did not touch a single predecessor v1.4–v1.14 harness/sidecar/workflow. The Axis-2 close-gate precondition is cleared; the close-gate now remains gated only on owner PIPE-02 PASS (119-06).

**Honest-accounting reference:** the authoritative Axis-2 apex did NOT pass on the first Atom-2 push — the pre-authorized remediation slot (119-05) fired across two rounds (C15 Phase-1-doc false-positive ABAUDIT exemptions + predecessor frozen-aware reads at V114 for check-phase-50/52/65). The RED → partial-green → GREEN history is recorded in full in `119-05-SUMMARY.md`; NO value-masking, NO frozen surface edited, `CHAIN_SKIP` left EMPTY. The stale RED runs (`28823233887`, `28824259217`) are DISCARDED; the authoritative GREEN run is `28825186128`.

This artifact is consumed by the 119-07 close-gate as the HARN-02/HARN-04 cross-OS independence + byte-unchanged evidence.
