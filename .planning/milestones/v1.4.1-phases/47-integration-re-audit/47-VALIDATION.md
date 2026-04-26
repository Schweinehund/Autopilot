---
phase: 47
slug: integration-re-audit
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-04-25
---

# Phase 47 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution. Phase 47 ships harness extensions + content re-canonicalization + audit closure + traceability flips. The "tests" are the audit harness itself plus grep terminal-sanity checks.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Custom Node.js audit harness — `scripts/validation/v1.4.1-milestone-audit.mjs` (5 blocking checks C1-C5 + 3 informational C6/C7/C9) + pin-helper `scripts/validation/regenerate-supervision-pins.mjs` |
| **Config file** | `scripts/validation/v1.4.1-audit-allowlist.json` (sidecar; supervision_exemptions[], safetynet_exemptions[], cope_banned_phrases[]) |
| **Quick run command** | `node scripts/validation/v1.4.1-milestone-audit.mjs` |
| **Full suite command** | `node scripts/validation/v1.4.1-milestone-audit.mjs --verbose` |
| **Pin helper self-test** | `node scripts/validation/regenerate-supervision-pins.mjs --self-test` |
| **Estimated runtime** | ~2-3 seconds harness; ~1-2 seconds pin helper |

---

## Sampling Rate

- **After every task commit:** `node scripts/validation/v1.4.1-milestone-audit.mjs` (quick, no --verbose)
- **After every plan wave:** `node scripts/validation/v1.4.1-milestone-audit.mjs --verbose` + `node scripts/validation/regenerate-supervision-pins.mjs --self-test`
- **Before `/gsd-verify-work`:** Full verbose harness run from fresh worktree must exit 0 (Plan 47-04 auditor-independence per Phase 42 D-02)
- **Max feedback latency:** 5 seconds (harness + pin helper combined)

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 47-01-01 | 01 | 1 | AEINTEG-01 | — | Glossary alphabetical index integrity (line 15) | structural-grep | `grep -nE "^- \[" docs/_glossary-android.md \| head -30` (ordered output) | ✅ | ⬜ pending |
| 47-01-02 | 01 | 1 | AEINTEG-01 | — | Capability matrix column-ordering coherence (COPE at index 1; Knox column placement; AOSP matrix link) | structural-grep | `grep -nE "^\| (Mode\|Setting)" docs/reference/android-capability-matrix.md` (column headers consistent across 5 sub-tables) | ✅ | ⬜ pending |
| 47-01-03 | 01 | 1 | AEINTEG-01 | — | Mermaid 6-branch + AOSP single-leaf ordering | structural-grep | `grep -A 20 "graph TD" docs/admin-setup-android/00-overview.md` (KME branch present; AOSP stub single leaf per D-04) | ✅ | ⬜ pending |
| 47-01-04 | 01 | 1 | AEINTEG-01 | — | Pin coordinates re-baselined post-glossary edit | harness-run | `node scripts/validation/regenerate-supervision-pins.mjs --self-test` (exit 0; identical-diff to hand-authored set) | ✅ | ⬜ pending |
| 47-01-05 | 01 | 1 | AEINTEG-01 | — | All 5 blocking checks PASS post-Plan-47-01 | harness-run | `node scripts/validation/v1.4.1-milestone-audit.mjs` (exit 0; C1-C5 PASS) | ✅ | ⬜ pending |
| 47-02-01 | 02 | 1 | AEINTEG-02 | — | C4 regex expansion catches Knox/KME/per-OEM/COPE in deferred files | harness-run | `node scripts/validation/v1.4.1-milestone-audit.mjs --verbose` (C4 PASS — zero matches in deferred files docs/common-issues.md, docs/quick-ref-l1.md, docs/quick-ref-l2.md) | ✅ | ⬜ pending |
| 47-02-02 | 02 | 1 | AEINTEG-02 | — | C6 targets array expanded to 6 AOSP-scoped files (06-aosp-stub + 09-13 per-OEM) | source-grep | `grep -A 8 "C6: PITFALL-7 preservation" scripts/validation/v1.4.1-milestone-audit.mjs` (targets array contains 6 file paths; placeholder comment removed) | ✅ | ⬜ pending |
| 47-02-03 | 02 | 1 | AEINTEG-02 | — | C7 suffix list extends to 5-SKU + standalone forms per Phase 44 D-01 | source-grep | `grep "suffixes = " scripts/validation/v1.4.1-milestone-audit.mjs` (regex contains KPE\|KME\|KPE Standard\|KPE Premium etc.) | ✅ | ⬜ pending |
| 47-02-04 | 02 | 1 | AEINTEG-02 | — | C9 sidecar `cope_banned_phrases[]` extended from 3 → 7+ patterns (Phase 46 D-31 full set) | json-grep | `node -e "const j=require('./scripts/validation/v1.4.1-audit-allowlist.json'); console.log(j.cope_banned_phrases.length >= 7)"` (true) | ✅ | ⬜ pending |
| 47-02-05 | 02 | 1 | AEINTEG-02 | — | All 5 blocking checks PASS + 3 informational checks PASS-by-design with new metric counts | harness-run | `node scripts/validation/v1.4.1-milestone-audit.mjs --verbose` (exit 0; 8/8 PASS — 5 blocking + 3 informational) | ✅ | ⬜ pending |
| 47-03-01 | 03 | 1 | AEINTEG-04 | — | 24 Active→Validated flips: AEAUDIT-02..05 + AEKNOX-01..07 + AEAOSPFULL-01..09 + AECOPE-01..04 | grep | `grep -c "^- ✓ .* — Phase 4[3-6] / v1.4.1 (AE" .planning/PROJECT.md` (count >= 24) | ✅ | ⬜ pending |
| 47-03-02 | 03 | 1 | AEINTEG-04 | — | "Closed Deferred Items" subsection present in PROJECT.md Context with DEFER-01..06 enumerated | grep | `grep "## Closed Deferred Items" .planning/PROJECT.md && grep -c "^- \*\*DEFER-0[1-6]\*\*" .planning/PROJECT.md` (header found; count == 6) | ✅ | ⬜ pending |
| 47-03-03 | 03 | 1 | AEINTEG-04 | — | "Last updated" footer refreshed for v1.4.1 closure | grep | `grep "v1.4.1 shipped" .planning/PROJECT.md \| tail -1` (footer line contains v1.4.1 closure summary) | ✅ | ⬜ pending |
| 47-03-04 | 03 | 1 | AEINTEG-04 | — | Zero remaining "deferred to v1.4.1" language anywhere in `docs/` | grep | `grep -rn "deferred to v1.4.1" docs/ \| wc -l` (output: 0) | ✅ | ⬜ pending |
| 47-03-05 | 03 | 1 | AEINTEG-04 | — | Link-resolution check across phase-touched paths | grep | `grep -rn "](.*\.md)" docs/admin-setup-android/ docs/l1-runbooks/2[2-9]*.md docs/l2-runbooks/1[8-9]*.md docs/l2-runbooks/2[0-3]*.md docs/_glossary-android.md docs/reference/android-capability-matrix.md docs/reference/aosp-oem-matrix.md \| wc -l > 0` (no broken anchors via spot-check sample) | ✅ | ⬜ pending |
| 47-04-01 | 04 | 2 | AEINTEG-03 | — | Terminal re-audit exits 0 from fresh worktree (auditor-independence per Phase 42 D-02) | harness-run | `node scripts/validation/v1.4.1-milestone-audit.mjs --verbose` (run from fresh executor worktree pinned to post-Plan-47-03 commit; exit 0 mandatory) | ✅ | ⬜ pending |
| 47-04-02 | 04 | 2 | AEINTEG-03 | — | `re_audit_resolution:` block extended with sibling child keys for DEFER-01/02/03/05/06 (PROJECT.md numbering) → audit-doc DEFER-01/02/04/08/09/10 (canonical) | yaml-grep | `grep -E "^  DEFER-(01\|02\|04\|08\|09\|10):" .planning/milestones/v1.4-MILESTONE-AUDIT.md` (5 new keys present alongside existing DEFER-04 from Phase 43 Plan 09) | ✅ | ⬜ pending |
| 47-04-03 | 04 | 2 | AEINTEG-03 | — | v1.4 audit doc frontmatter status flipped tech_debt → passed | grep | `grep "^status:" .planning/milestones/v1.4-MILESTONE-AUDIT.md` (output: `status: passed`) | ✅ | ⬜ pending |
| 47-04-04 | 04 | 2 | AEINTEG-03 | — | YAML frontmatter parses post-edit (no malformed mapping) | yaml-parse | `node -e "const y=require('js-yaml'); const fm=require('fs').readFileSync('.planning/milestones/v1.4-MILESTONE-AUDIT.md','utf8').match(/^---\n([\s\S]*?)\n---/m)[1]; y.load(fm)"` OR Phase 43 Plan 08 CI job (`.github/workflows/audit-harness-integrity.yml` parse step) | ✅ | ⬜ pending |
| 47-04-05 | 04 | 2 | AEINTEG-03 | — | Pin helper self-test PASS at terminal | harness-run | `node scripts/validation/regenerate-supervision-pins.mjs --self-test` (exit 0; identical-diff confirms supervision_exemptions[] coordinates are accurate) | ✅ | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- **None.** Existing test infrastructure covers all phase requirements:
  - Harness `scripts/validation/v1.4.1-milestone-audit.mjs` exists from Phase 43 Plan 02
  - Sidecar `scripts/validation/v1.4.1-audit-allowlist.json` exists from Phase 43 Plan 03
  - Pin helper `scripts/validation/regenerate-supervision-pins.mjs` exists from Phase 43 Plan 04
  - CI workflow `.github/workflows/audit-harness-integrity.yml` exists from Phase 43 Plan 08
  - Pre-commit hook `scripts/hooks/pre-commit.sh` exists from Phase 43 Plan 08

*Existing infrastructure covers all phase requirements.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Glossary alphabetical index sort-order is human-readable / sensible | AEINTEG-01 | Mechanical sort may produce technically-correct but cognitively-jarring ordering (e.g., capitalization edge cases); requires human spot-check | Open `docs/_glossary-android.md` line 15 region; verify entries match the section order below; sample 3 random entries for accurate alphabetical placement |
| Capability matrix readability post column-coherence verification | AEINTEG-01 | Surgical re-canonicalization may verify ordering correct but readability of cell content is subjective | Open `docs/reference/android-capability-matrix.md` in markdown preview; spot-check 5 random rows for cell-content readability; verify Cross-Platform Equivalences section structure preserved (zero new paired rows per Phase 46 D-22) |
| Mermaid renders correctly post-edit | AEINTEG-01 | Mermaid syntax can pass `grep` but fail rendering | Open `docs/admin-setup-android/00-overview.md` in markdown preview with Mermaid plugin; verify 6 branches render; verify KME branch ordering |
| `re_audit_resolution:` YAML reads as structured frontmatter | AEINTEG-03 | YAML can parse but key ordering may be cognitively jarring | Read `.planning/milestones/v1.4-MILESTONE-AUDIT.md` frontmatter region; verify all 6 DEFER closure entries present (1 existing + 5 new); verify `status: passed` flipped |

---

## Validation Sign-Off

- [ ] All tasks have automated verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references (N/A — no Wave 0 needed)
- [ ] No watch-mode flags (harness is one-shot)
- [ ] Feedback latency < 5s
- [ ] `nyquist_compliant: true` set in frontmatter (after planner verifies all per-task automated commands map to existing harness checks or grep patterns)

**Approval:** pending (Plan 47-04 terminal re-audit acts as final approval gate)
