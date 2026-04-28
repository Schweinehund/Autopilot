---
phase: 53
slug: co-management-operational-docs
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-04-27
---

# Phase 53 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution. This phase produces 4 markdown documentation files (`docs/operations/co-management/00-overview.md` + `01-windows-tenant-attach.md` + `02-windows-workload-sliders.md` + `03-cocmgmt-migration-paths.md`) + 1 ops-tree index file (`docs/operations/00-index.md`) + 1 Node.js validator (`scripts/validation/check-phase-53.mjs`). The validation framework is the validator itself plus the v1.5 milestone audit harness — there are no unit-test runners involved (this is documentation, not code). Inheritance from Phase 51 + Phase 52 validation precedent — same Node.mjs file-reads-only / regex-based pattern.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Node.js (no test runner — validators are vanilla `.mjs` scripts that exit 0 / 1) |
| **Config file** | none — validators are self-contained per Phase 48 D-25 file-reads-only / no-shared-module |
| **Quick run command** | `node scripts/validation/check-phase-53.mjs` |
| **Full suite command** | `node scripts/validation/v1.5-milestone-audit.mjs --verbose` |
| **Estimated runtime** | ~5-10 seconds (file-read + regex pass; no network, no compilation) |

---

## Sampling Rate

- **After every task commit:** Run `node scripts/validation/check-phase-53.mjs` — should exit 0
- **After every plan wave:** Run `node scripts/validation/v1.5-milestone-audit.mjs --verbose` — expect C1-C12 PASS, C13 informational
- **Before `/gsd-verify-work`:** Both validators green; `node scripts/validation/regenerate-supervision-pins.mjs --self-test` exits 0 (regression-prevention; no Phase 53 pin-coord modification expected — Phase 53 files not in supervision sidecar)
- **Max feedback latency:** ~10 seconds

---

## Per-Task Verification Map

> Plan decomposition follows CONTEXT.md D-15 (6 plans estimated). Final plan numbering is determined by the planner; this map is the validation contract per CONTEXT.md D-10 V-53-NN assertions and may be re-keyed at plan ship.

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 53-01-01 | 01 | 1 | COMG-01 | — / — | 7-workload literal coverage + 3-state H2 + Pilot Intune POSITIVE H2-anchor + cross-platform inline blockquote at TOP + soft cross-link to 03 + Resource Access deprecation note (CB 2203/2403) | structural | `node scripts/validation/check-phase-53.mjs` (V-53-07, V-53-08, V-53-09, V-53-18, V-53-19, V-53-24, V-53-26) | ❌ W0 | ⬜ pending |
| 53-02-01 | 02 | 1 | COMG-03 | — / — | Side-by-side comparison table with `Capability` / `Tenant Attach` / `Full Co-Management` columns + SC#3 "no workload switching" literal coverage + cross-platform inline blockquote at TOP | structural | `node scripts/validation/check-phase-53.mjs` (V-53-11, V-53-12, V-53-18, V-53-19) | ❌ W0 | ⬜ pending |
| 53-03-01 | 03 | 1 | COMG-02 | — / — | Single 7-row workload table with Validate-Before-Moving column + small slider-state semantics block + low-risk-first ordering + EP HIGH-RISK three-layer callout (cell + blockquote + ≥2 per-occurrence inline) + forward-link to v1.2 Windows migration content + cross-platform inline blockquote at TOP | structural | `node scripts/validation/check-phase-53.mjs` (V-53-13, V-53-14, V-53-15, V-53-16, V-53-17, V-53-18, V-53-19, V-53-23) | ❌ W0 | ⬜ pending |
| 53-04-01 | 04 | 1 | COMG-05 | — / — | Autopatch prereqs primary content (Device Configuration + Office Click-to-Run literal coverage + Autopatch + prerequisites tokens) + NO cross-platform inline blockquote (regression-guard) + research-flagged Windows Update policies third-workload note + frontmatter `platform: Windows` | structural | `node scripts/validation/check-phase-53.mjs` (V-53-06, V-53-20, V-53-21) | ❌ W0 | ⬜ pending |
| 53-05-01 | 05 | 1 | (SC#4 + D-02) | — / — | `docs/operations/00-index.md` carries exactly ONE H2 = `## Co-Management`; no `Patch Management` / `App Lifecycle` / `Drift` / `TBD` / `Coming in Phase` H2-position tokens (regression-guard against 1B-2/1B-3 patterns) | structural | `node scripts/validation/check-phase-53.mjs` (V-53-22) | ❌ W0 | ⬜ pending |
| 53-06-01 | 06 | 0 | AUDIT-06 | — / — | `check-phase-53.mjs` implements 22-26 V-53-NN structural assertions per Phase 48 D-25 file-reads-only / Phase 49 D-26 regex-based / Phase 51 D-20 + Phase 52 D-11 lineage; no markdown-AST dependency | structural | `node scripts/validation/check-phase-53.mjs` exits 0 against author worktree | ❌ W0 | ⬜ pending |
| 53-07-01 | 07 | 2 | (gate) | — / — | All 5 SCs satisfied; `v1.5-milestone-audit.mjs` exits 0 (C1-C12 PASS; C13 informational); `regenerate-supervision-pins.mjs --self-test` exits 0; `markdown-link-check` informational on 5 new content files | structural | `node scripts/validation/v1.5-milestone-audit.mjs --verbose` exits 0 | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

**Note:** The "File Exists" column shows `❌ W0` because the validator + content files don't exist until Wave 0/1 commits ship them. After Wave 0/1 commits, the field flips to ✅ for executor-side verification.

---

## Wave 0 Requirements

- [ ] `scripts/validation/check-phase-53.mjs` — full-scope validator with 22-26 V-53-NN structural assertions per CONTEXT.md D-10 (file-reads-only / regex-based per Phase 48 D-25; mirrors `check-phase-52.mjs` shape)
- [ ] `docs/operations/co-management/00-overview.md` — 7 workloads + 3 slider states + Pilot Intune disambiguation H2 + Resource Access deprecation note + Device Config implicit-switching note + cross-platform inline blockquote at TOP + soft cross-link to 03
- [ ] `docs/operations/co-management/01-windows-tenant-attach.md` — side-by-side capability comparison table + SC#3 "no workload switching" + cross-platform inline blockquote at TOP
- [ ] `docs/operations/co-management/02-windows-workload-sliders.md` — single 7-row workload sequence table + small slider-state semantics block + EP HIGH-RISK three-layer callout + forward-link to v1.2 Windows migration content + cross-platform inline blockquote at TOP
- [ ] `docs/operations/co-management/03-cocmgmt-migration-paths.md` — Autopatch prereqs primary content (3 workloads per research) + NO cross-platform inline blockquote (Windows-only)
- [ ] `docs/operations/00-index.md` — co-management H2 only (no scaffold for 54/55/56)

*If none: "Existing infrastructure covers all phase requirements."* — N/A; Phase 53 ships net-new files (5 docs + 1 validator) + zero existing-file modifications.

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Workload table renders correctly with 5 columns + 7 rows on GitHub Web UI + SharePoint + Confluence export | SC#2 | Table rendering varies across viewer surfaces; PITFALL-15 GFM-vs-non-GFM concern | After commit, open `02-windows-workload-sliders.md` on GitHub Web UI; verify table renders with 5 columns; eye-test EP HIGH-RISK row visibility |
| Endpoint Protection HIGH-RISK three-layer callout reads as serious-risk on first read (not buried) | SC#2 | Visual hierarchy is procedural; regex validator confirms presence not visual gravity | Author re-reads `02-windows-workload-sliders.md` after commit; confirms EP row + adjacent ⚠️ blockquote stand out; if any layer is visually weak, sharpen formatting in same commit |
| Pilot Intune disambiguation does NOT inadvertently bait reader toward "partially migrated" mental model even when V-53-10 negative-assertion passes | SC#1 | V-53-10 is a literal-string negative-assertion; doesn't catch semantic drift (paraphrased "halfway-migrated" prose) | Author re-reads `00-overview.md` Three Workload Slider States H2 after authoring; confirms "collection-scoped" framing is dominant; sharpen wording if any binary-toggle implication remains |
| Cross-platform inline blockquotes' analog migration cross-links resolve to correct H2 anchors in target admin-setup files | COMG-04 | GFM auto-anchor case sensitivity + special-character stripping (PITFALL-15); research-flagged iOS path correction (`09-mam-app-protection.md` not `04-byod-mam-overview.md`) | Author verifies actual paths via `ls docs/admin-setup-{macos,ios,android}/`; cross-links use exact paths per RESEARCH.md verified file list |
| `markdown-link-check` informational sweep flags any broken anchors in cross-links between 4 new docs + ops/00-index + v1.2 forward-links | (Phase 48 D-08) | Informational gate, not blocking | Pre-commit: `npx markdown-link-check docs/operations/co-management/*.md docs/operations/00-index.md`; review output; fix if any internal-anchor breakage; defer external-URL transients |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify (validator covers all task verifications)
- [ ] Wave 0 covers all MISSING references (validator + 5 content files all listed above)
- [ ] No watch-mode flags (Node validators are one-shot)
- [ ] Feedback latency < 10s
- [ ] `nyquist_compliant: true` set in frontmatter (toggle when validator + content files all green)

**Approval:** pending
