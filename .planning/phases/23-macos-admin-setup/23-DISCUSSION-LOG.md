# Phase 23: macOS Admin Setup - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-04-14
**Phase:** 23-macos-admin-setup
**Areas discussed:** Folder placement, Guide scope & grouping, Capability matrix, App deployment structure
**Method:** Adversarial review (Finder/Adversary/Referee, 12 agents total — 3 per area)

---

## Folder Placement

| Option | Description | Selected |
|--------|-------------|----------|
| `docs/macos-admin-setup/` | Platform-first naming, follows Phase 22 macos-lifecycle/ precedent | |
| `docs/admin-setup-macos/` | Content-type-first, matches admin-setup-apv1/ and admin-setup-apv2/ prefix convention | ✓ |
| In `docs/macos-lifecycle/` | Reuse existing macOS folder | |

**User's choice:** `docs/admin-setup-macos/` (Option B) — recommended by Referee
**Notes:** Option C eliminated by 2 CRITICALs (violates Phase 22 D-01, content-type mismatch). Option B wins over A due to alphabetical grouping of admin-setup-* folders and dominant naming convention (2 existing instances). Naming inconsistency with `macos-lifecycle/` is aesthetic, not functional.

**Adversarial scores:** Option A: 37→12→2 LOW | Option B: 17→11→1 MEDIUM+1 LOW | Option C: 62→47→2 CRITICAL+3 MEDIUM

---

## Guide Scope & Grouping

| Option | Description | Selected |
|--------|-------------|----------|
| One file per requirement (6 files) | Direct 1:1 requirement-to-file mapping with overview | ✓ |
| Split broad requirements (8-9 files) | Split MADM-03 into 2-3 files, keep MADM-04 as one | |
| Consolidate related guides (4 files) | Merge MADM-01+02, keep MADM-03, MADM-04, MADM-05 | |

**User's choice:** Option A (modified) — recommended by Referee with addition of `07-config-failures.md`
**Notes:** Option B eliminated by undefined split boundaries and inconsistent splitting principle. Option C eliminated by obscured requirement traceability. Referee identified missing config-failures reference as a gap across ALL options — added `06-config-failures.md` following APv1 `10-config-failures.md` pattern. MADM-03 size concern (~300 lines) is manageable; reactive split at 350 lines if needed.

**Adversarial scores:** Option A: 52→reduced→1 real issue | Option B: 48→reduced→eliminated | Option C: 57→reduced→eliminated

---

## Capability Matrix Placement

| Option | Description | Selected |
|--------|-------------|----------|
| Standalone in admin setup folder | `admin-setup-macos/06-capability-matrix.md` | |
| Extend `docs/windows-vs-macos.md` | Add capability gaps section to existing comparison page | |
| Standalone in `docs/reference/` | `docs/reference/macos-capability-matrix.md` | ✓ |

**User's choice:** `docs/reference/macos-capability-matrix.md` (Option C) — recommended by Referee
**Notes:** Option B disqualified by Phase 20 D-03 which explicitly prohibits capability matrix content in windows-vs-macos.md. Option C wins over A because the matrix is a cross-platform reference document; docs/reference/ already has admin-audience content, macos- prefix convention, and heterogeneous taxonomy. Update forward references in windows-vs-macos.md lines 10 and 67.

**Adversarial scores:** Option A: 15→13→viable but suboptimal | Option B: 33→32→disqualified (2 CRITICAL) | Option C: 14→6→recommended

---

## App Deployment Structure

| Option | Description | Selected |
|--------|-------------|----------|
| Single file, H2 per type | `04-app-deployment.md` with ## DMG, ## PKG, ## VPP sections | ✓ |
| Three separate files | `04a-dmg.md`, `04b-pkg.md`, `04c-vpp.md` | |
| Two files (LOB + VPP) | `04-app-deployment-lob.md` + `05-app-deployment-vpp.md` | |

**User's choice:** Single comprehensive file (Option A) — recommended by Referee
**Notes:** Requirement says "guide" (singular). Precedent: win32-app-packaging.md (134 lines, 4 concepts), 00-ade-lifecycle.md (414 lines). Key challenge: DMG/PKG vs VPP prerequisites have zero overlap — solved with per-type H3 sub-sections. VPP section uses dual-portal template; DMG/PKG sections are Intune-only. Include comparison table near top.

**Adversarial scores:** Option A: 42→15→1 solvable issue | Option B: 25→12→eliminated | Option C: 28→12→eliminated

---

## Claude's Discretion

- Exact section headings within each guide
- Whether config profiles uses H3 per profile type or groups
- Exact table ordering in comparison tables and config-failures
- Overview format (Mermaid diagram vs numbered list)
- Config-failures organization (by guide or by symptom)

## Deferred Ideas

None — discussion stayed within phase scope.
