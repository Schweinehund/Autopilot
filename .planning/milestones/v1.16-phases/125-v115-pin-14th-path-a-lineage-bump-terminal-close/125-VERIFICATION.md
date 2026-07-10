---
phase: 125-v115-pin-14th-path-a-lineage-bump-terminal-close
verified: 2026-07-10T00:00:00Z
status: passed
score: 5/5 close-gate preconditions verified
overrides_applied: 0
requirement: HARN-05, HARN-06, HARN-07
---

# Phase 125: V115 Pin + 14th Path-A Lineage Bump + Terminal Close Verification Report

**Phase Goal:** The V115 back-anchor pin freezes the v1.15 corpus, the 14th Path-A
audit-harness lineage bump ships (`v1.16-milestone-audit.mjs` + sidecar + BASELINE_20 +
`check-phase-120..125.mjs` + the 13th CI coexistence workflow), and the milestone closes via
a 3-axis terminal re-audit plus a PIPE-02 grounding-validation confirmation — completing the
mandatory back-anchor invariant v1.15 deliberately deferred, while all non-Phase-125
predecessor frozen surfaces remain byte-unchanged (drift absorbed by triggered frozen-aware
validator conversion, not re-pinning — the OPPOSITE discipline from Phase 119's deliberate
re-baseline).
**Verified:** 2026-07-10
**Status:** passed
**Re-verification:** No — initial verification (authored at the Plan 125-07 close-gate so
`check-phase-125`'s `V-125-AUDIT` check resolves from PASS-via-skip to PASS).

This file is what `check-phase-125.mjs`'s `V-125-AUDIT` check reads (`resolveArchivedPhasePath`);
until this close-gate it was PASS-via-skip (Axis-2 apex reported 76 PASS / 3 FAIL / 1 SKIP on
the pre-remediation run, the SKIP being V-125-AUDIT pending this document; post-remediation the
3 Class-A FAILs cleared, leaving 79 PASS / 0 FAIL / 1 SKIP — the SKIP resolves to PASS now).

## Goal Achievement

### Observable Truths

| # | Truth (ROADMAP SC) | Status | Evidence |
|---|------|--------|----------|
| 1 | `_lib/frozen-at-close.mjs` gains a `V115` entry (v1.15 close-gate SHA, recovered via the dual-token positive-confirmation grep) + `readAtV115Close` export, freezing the v1.15 corpus (SC1) | VERIFIED | `V115: '29a3599'` positively confirmed (message carries both "MILESTONE-AUDIT" and "MILESTONE CLOSE"; `git log -1 --format=%s 29a3599` = `docs(119-07): Phase 119 close-gate — v1.15 MILESTONE-AUDIT + DEFERRED-CLEANUP + 4-doc traceability + v1.15 MILESTONE CLOSE`). Added in Atom 2 (`47b5493`) alongside `readAtV115Close`; grepped present, no `V116` entry exists (back-anchor invariant intact). |
| 2 | `v1.16-milestone-audit.mjs` (Path-A, C1-C17 inherited) + `v1.16-audit-allowlist.json` + BASELINE_20 + `check-phase-120..125.mjs` validators (chain-apex `CHAIN_PHASES=[48..124]`, 77 entries) + `audit-harness-v1.16-integrity.yml` (13th CI coexistence workflow) all ship; predecessor v1.4–v1.15 frozen surfaces byte-unchanged except the in-scope frozen-aware conversion (SC2) | VERIFIED | Atom 1 = ONE commit `c0e3626` (harness + sidecar with a TARGETED C2/C7/C9 repoint on 3 android files retrofitted by Phases 121/122 — NOT a pure verbatim copy, correcting the RESEARCH's clean-copy expectation — + BASELINE_20 JIT-anchored to `0d01eae`). Atom 2 = ONE commit `47b5493` (check-phase-120..124 leaves `CHAIN_PHASES=[]` + apex check-phase-125 `CHAIN_PHASES=[48..124]` 77 entries with fail-loud length/terminus throws + `frozen-at-close` V115 pin + `audit-harness-v1.16-integrity.yml`). The [48..119] transcription error is corrected to [48..124] in the authored validator itself (`check-phase-125.mjs` header explicitly documents the correction). |
| 3 | The predecessor-byte-unchanged HARD gate holds (frozen HARNESS lineage v1.4–v1.15: milestone-audit `.mjs` + sidecar allowlists + integrity workflows) — EMPTY at close-gate time; a sanctioned Shape-1 `readAtV115Close` conversion of a predecessor `check-phase-NN.mjs` validator is NOT a violation | VERIFIED | `125-04-AUDIT-RESULTS.md` byte-unchanged gate (vs Wave-0 anchor `42b31c5`): `git diff 42b31c5 HEAD` over frozen HARNESS surfaces shows ONLY new v1.16 files — no predecessor v1.4–v1.15 frozen surface modified. The Plan 125-05 remediation (`ce62fe5`) edited three predecessor `check-phase-{51,92,99}.mjs` validators — in-class D-00a chain maintenance, NOT a frozen-surface edit (mirrors the 119-05 precedent). |
| 4 | 3-axis terminal re-audit passes with cross-OS EXACT MATCH: Axis 2 Linux GHA authoritative (both chain validators) across the predecessor-workflow cascade, corroborated by Axis 1/3 (SC3, D-125-4) | VERIFIED | Axis-2 authoritative: initial push `4ab30e8` (PR #3) CASCADE RED (13/13 firing workflows — the cascade was WIDER than the 9-workflow RESEARCH prediction because `origin/master` was frozen at the v1.15 ship state, so the diff contained the whole v1.16 milestone). Class A (chain-apex drift, check-phase-51/92/99) resolved by `ce62fe5`; re-push GREEN at run **29068069953** (headSha `ce62fe5`): `check-phase-125` apex (recurses 48..124) + `Validator chain on Linux LF` + `Run v1.16 milestone audit harness` (16/0/0) all SUCCESS. Class B (predecessor standalone milestone-audit-harness jobs RED against the retrofitted corpus) is the sanctioned `ACCEPTED-STANDALONE-CI-RED-01` (D-00a; v1.14/v1.15 precedent) — their chain jobs `skipped` via the `needs:` gate; the chain is proven green through the v1.16 apex's superset recursion. **Axis-2 close-gate precondition CLEARED.** |
| 5 | PIPE-02 grounding-validation confirmation (retargeted v1.16-delta probes) included in the close-gate; the single close-gate commit flips all 14 v1.16 requirements to Validated across PROJECT / ROADMAP / STATE / REQUIREMENTS (SC4) | VERIFIED | Owner ran the retargeted real-corpus PIPE-02 CLOSE runbook live in Copilot Studio (2026-07-10, ~09:43–09:57); attested **PIPE-02 CLOSE: PASS** (`54f5e62`) — all 10 probes PASS across 8 representative `RE-NNN` `.docx` (5-platform grounding + decision-tree leaf-citability KEY probe + nav-hub link-table + descriptive-filename citation-label + EEE body-text thesis + negative ChromeOS control), all four retargeted D-125-2 probe legs satisfied, zero hallucination. Transcript captured in-repo (`PIPE-02-CLOSE-TRANSCRIPT.txt`, 459 lines). This close-gate commit flips STD-04 + HYG-01 + RETRO-04..09 + PIPE-03..05 + HARN-05..07 = 14/14 to Validated. |

**Score:** 5/5 truths verified

### Required Artifacts

| Artifact | Expected | Status | Details |
| -------- | ----------- | ------ | ------- |
| `scripts/validation/v1.16-milestone-audit.mjs` | 14th Path-A harness (C1-C17 inherited from v1.15) | VERIFIED | Atom 1 `c0e3626`; C17 inherited verbatim (already folded at Phase 119); `--self-test` / `--verbose` 16/0/0 (GHA run 29068069953). |
| `scripts/validation/v1.16-audit-allowlist.json` | Sidecar (TARGETED C2/C7/C9 repoint on 3 retrofitted android files; other 5 pinned files verbatim) | VERIFIED | Atom 1 `c0e3626`; `docs/_glossary-android.md` + 2 android-lifecycle files repointed; `supervision_exemptions` grew 22→26 (all growth confined to the android glossary's #12 blockquote-splitting). |
| `scripts/validation/regenerate-supervision-pins.mjs` | BASELINE_20 comment (additive) | VERIFIED | Atom 1 `c0e3626`; BASELINE_20 back-anchored to JIT pre-Atom-1 HEAD `0d01eae` (distinct from Wave-0 anchor `42b31c5`). |
| `scripts/validation/check-phase-120.mjs` … `check-phase-124.mjs` | 5 leaf validators (CHAIN_PHASES=[], CHAIN_SKIP empty) | VERIFIED | Atom 2 `47b5493`; all 5 exit 0 (GHA cross-OS). |
| `scripts/validation/check-phase-125.mjs` | Chain apex (CHAIN_PHASES=[48..124], 77 entries, CHAIN_SKIP empty) | VERIFIED | Atom 2 `47b5493`; fail-loud length!==77/terminus!==124 throws; V-125-SELF hard-asserts CHAIN_SKIP.size===0; Linux GHA apex GREEN post-remediation (run 29068069953). |
| `scripts/validation/_lib/frozen-at-close.mjs` | V115='29a3599' pin + readAtV115Close (NO V116) | VERIFIED | Atom 2 `47b5493`; V115 confirmed = v1.15 close-gate (msg has MILESTONE-AUDIT + MILESTONE CLOSE); no V116 pin (back-anchor invariant — deferred to v1.17). |
| `.github/workflows/audit-harness-v1.16-integrity.yml` | 13th parallel CI coexistence workflow | VERIFIED | Atom 2 `47b5493`; dual-apex + LF-fidelity (autocrlf false, fetch-depth 0, continue-on-error false) preserved; `paths:` repointed to `v1.16-*`. |
| `scripts/validation/check-phase-{51,92,99}.mjs` | Class-A emergent-slot remediation (Shape-1 readAtV115Close) | VERIFIED | Plan 125-05 `ce62fe5`; converts ONLY the 3 drifted assertions (Phase-122 Mermaid→text-equiv drift); no value-mask, no frozen-surface edit, CHAIN_SKIP empty; all 3 exit 0 NESTED. |
| `125-04-AUDIT-RESULTS.md` | 3-axis re-audit + byte-gate evidence | VERIFIED | Composite verdict: Axis-2 GHA GREEN post-remediation (run 29068069953); predecessor-byte-unchanged EMPTY (frozen HARNESS scope); Class B = ACCEPTED-STANDALONE-CI-RED-01 (D-00a). |
| `PIPE-02-CLOSE-FINDINGS.md` + `PIPE-02-CLOSE-TRANSCRIPT.txt` | Owner PIPE-02 CLOSE: PASS + in-repo transcript | VERIFIED | Owner attestation present ("PIPE-02 CLOSE: PASS"); 459-line transcript in-repo (D-119-1 rider carried forward). |

### Observable Truths (close-gate composite)

- **V115 back-anchor pin lands:** `frozen-at-close.mjs` gains `V115: '29a3599'` + `readAtV115Close`; no V116 pin (back-anchor invariant intact).
- **14th Path-A lineage bump ships:** harness + sidecar + BASELINE_20 (Atom 1 `c0e3626`) + validators + pin + CI workflow (Atom 2 `47b5493`).
- **Predecessor byte-unchanged (HARNESS-scoped):** `git diff 42b31c5 HEAD` over the frozen v1.4–v1.15 harness/sidecar/workflow lineage = EMPTY; the Plan 125-05 `check-phase-{51,92,99}.mjs` edits are in-class chain maintenance (D-00a), not frozen-surface edits.
- **3-axis cross-OS EXACT MATCH:** Axis-2 GHA authoritative, GREEN at run `29068069953` (headSha `ce62fe5`) after the Class-A remediation; Class B recorded (not fixed) as `ACCEPTED-STANDALONE-CI-RED-01`.
- **PIPE-02 CLOSE: PASS:** owner-attested live grounding confirmation on the retrofitted structural corpus, retargeted to the four v1.16 delta probes.

### Honest-Accounting Note

The authoritative Axis-2 apex did NOT pass on the first Atom-2 push. The pre-authorized
emergent remediation slot (Plan 125-05) fired once — Shape-1 `readAtV115Close` frozen-aware
conversion of three predecessor validators (`check-phase-51/92/99`) that drifted against the
Phase-122 Mermaid→text-equivalent decision-tree conversion. NO value-masking (every expected
needle/regex/count left unchanged — only the read source moved live→frozen); NO frozen
surface edited; `CHAIN_SKIP` stayed empty. The stale RED run (initial push `4ab30e8`, 13/13
workflows RED) is DISCARDED; the authoritative GREEN run is `29068069953`. A second class
(Class B — predecessor standalone milestone-audit-harness jobs failing against the
retrofitted android/nav corpus) was investigated and determined to be the repo's
already-sanctioned `ACCEPTED-STANDALONE-CI-RED-01` condition (D-00a; v1.14/v1.15 precedent) —
recorded, not fixed. Recorded in full in `125-05-SUMMARY.md`, `125-04-AUDIT-RESULTS.md`, and
`v1.16-MILESTONE-AUDIT.md`.

### Human Verification Required

The PIPE-02 CLOSE grounding leg (live Copilot Studio) is owner-run by design — the ONE
close-gate leg no re-audit axis can reproduce (no programmatic Copilot Studio access;
REQUIREMENTS L76). Owner attested **PIPE-02 CLOSE: PASS** 2026-07-10 with an in-repo
transcript. All other legs are programmatically verified (GHA + byte-gate).

### Gaps Summary

No blocking gaps. One honest carry-forward (NOT a close blocker): `DEFER-125-06-A` —
`docs/_glossary-android.md` (RE-179) fails `guard-docx.mjs`'s CUSTOM-PROPS check on a stale
`phase_46_wave2_retrofit` frontmatter key; out of scope for Plan 125-06 (not authorized to
edit that file); Android PIPE-02 coverage was satisfied via the RE-185 substitute instead.
Deferred to v1.17 (`v1.16-DEFERRED-CLEANUP.md`).

---

_Verified: 2026-07-10 — Phase 125 Plan 125-07 close-gate (gsd-executor sequential main-tree execution)_
