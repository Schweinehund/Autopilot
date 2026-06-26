---
phase: 90
plan: 01
subsystem: macos-lifecycle-docs
tags: [documentation, mdm-migration, psso, walkthrough, b1-inplace, b2-wipe, kandji-iru-intune]
dependency_graph:
  requires: [docs/macos-lifecycle/01-psso-provisioning-walkthrough.md, docs/admin-setup-macos/07-platform-sso-setup.md]
  provides: [docs/macos-lifecycle/02-mdm-migration-psso.md]
  affects: [docs/l2-runbooks/30-macos-mdm-migration-failure.md (link target), docs/l2-runbooks/27-macos-sso-investigation.md (link target)]
tech_stack:
  added: []
  patterns: [selector-first-two-path, shared-preflight-hard-fork, link-not-copy, app-sso-two-fence-gate, freshness-stamp, 4-block-stage-anatomy]
key_files:
  created: [docs/macos-lifecycle/02-mdm-migration-psso.md]
  modified: []
decisions:
  - "D-01 (1B): Shared pre-flight authored once (Stages 1-2), then hard-fork into B1 9-stage in-place track and B2 5-stage wipe track"
  - "D-02 (2A): Stage 9 PSSO re-registration documents only migration-delta facts + app-sso two-fence gate; user-facing UX delegated link-not-copy to guide 01"
  - "D-04 (4A): Kandji/Iru steps are vendor-neutral + conceptual with both names surfaced on first mention and verify-current-labels note"
metrics:
  duration: ~23 minutes
  completed_date: 2026-06-24
  tasks_completed: 2
  files_created: 1
---

# Phase 90 Plan 01: macOS MDM Migration Walkthrough (B1 In-Place + B2 Wipe) Summary

**One-liner:** Consolidated Kandji/Iru-to-Intune MDM migration walkthrough covering B1 wipe-free in-place (macOS 26+, 9-stage ABM Deadline flow) and B2 wipe-and-re-enroll (macOS 25 or earlier, 5-stage fallback) with mandatory PSSO re-registration gate.

## What Was Built

Created `docs/macos-lifecycle/02-mdm-migration-psso.md` — a 553-line consolidated scenario walkthrough that is a true sibling of `01-psso-provisioning-walkthrough.md`, covering both MDM migration paths from Kandji/Iru to Intune with Platform SSO.

### Key structural elements delivered:

- **Frontmatter** matching guide 01's shape: `last_verified: 2026-06-24`, `review_by: 2026-09-24`, `applies_to: ADE`, `audience: all`, `platform: macOS`
- **Platform gate callout** before H1, cross-linking `00-ade-lifecycle.md` and `01-psso-provisioning-walkthrough.md`
- **H1**: `# macOS MDM Migration Walkthrough: B1 In-Place (macOS 26+) and B2 Wipe-and-Re-Enroll`
- **Selector table** (`## Which Path Is Right for You?`) with B1/B2 paths and relevant columns
- **Userless devices callout** immediately after selector
- **Prerequisites** with Common (B1+B2) and B1-only split, linking to `00-ade-lifecycle.md` and `07-platform-sso-setup.md`
- **Mermaid pipeline** (`## The MDM Migration Pipeline`) with shared pre-flight → OS-26 fork → B1 9-arm / B2 5-arm
- **Stage Summary Table** with exact 6-column header (`Stage | Actor | Location | What Happens | Key Pitfall | Path`) and Path column constrained to `Both`/`B1`/`B2`
- **Shared pre-flight Stages 1-2** (Path: Both): fleet assessment + OS gate, and the combined Intune readiness + Kandji/Iru secret retrieval + source release stage
- **B1 Stages 3-9** (Path: B1): ABM "Assign Device Management", Set Deadline, User Notification Window, Deadline Enforcement, Post-Migration Profile-Based Enrollment, FileVault Key Rotation, PSSO Re-Registration
- **Stage 9 PSSO Re-Registration**: migration-delta-only facts (genuine unenroll → IdP unregistration; ACME reissued; new Secure Enclave key; why "Registration Required" appears); app-sso two-fence verification gate; link-not-copy handoff to guide 01 for UX; L1 #35, #36, L2 #27 escalation bullets
- **B2 Path** (`## B2 Path: Pre-macOS-26 Wipe-and-Re-Enroll`): top-level divergence section with B2 Requirements Summary table; `profiles renew` prohibition as bold callout; 5-stage B2 track; link-not-copy terminus to guide 01 A1 path
- **Freshness stamp** on OS-26-gated content: `last_verified: 2026-06-24` / `review_by: 2026-09-24`
- **See Also** with three subsections and `--` separators (macos-lifecycle convention), including link to `30-macos-mdm-migration-failure.md`
- **Glossary Quick Reference** with migration-specific terms
- **Version History** with two columns only (no Author column, matching guide 01 sibling convention)

## Requirements Addressed

| Req ID | Status | Evidence |
|--------|--------|----------|
| MIG-01 | Satisfied | ABM "Assign Device Management" + Deadline mechanics (Stages 3-6); macOS 26+ in-place path (B1 9 stages); OS≥26-vs-OS<26 selector table; notification cadence (1-90 day range, daily→hourly→60/30/10/1 min); non-dismissible lock documented |
| MIG-02 | Satisfied | `profiles renew` prohibition appears as bold `> **Important:**` callout in B2 Path section + Watch Out For bullet in Stage 6; states circular-dependency reason |
| MIG-03 | Satisfied | Both "Kandji (rebranded **Iru**, October 2025; support portal URL unchanged at support.kandji.io)" surfaced on first mention; FileVault keys AND Activation Lock bypass codes retrieved BEFORE Delete Device Record (mandatory ordering in Stage 2 callout); D-04 vendor-neutral authoring with verify-current-labels note |
| MIG-04 | Satisfied | Stage 9 PSSO re-registration mandatory ("ALWAYS required"); app-sso two-fence gate showing `Device Registration: REGISTERED` / `User Registration: REGISTERED`; bidirectional link-not-copy to guide 01 at Stage 9 (B1 registration UX junction) and B2 terminus; escalation to L1 #35, #36, L2 #27 |

## Commits

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1+2 | Scaffold, shared pre-flight, B1 in-place track, B2 fork, footers | 209cafb | docs/macos-lifecycle/02-mdm-migration-psso.md |

*Note: Tasks 1 and 2 were authored atomically in a single Write operation (both tasks operate on the same file). The single commit covers the full deliverable.*

## Deviations from Plan

### Auto-combined Tasks

**[Discretion] Tasks 1 and 2 merged into single Write + single commit**
- **Found during:** Plan execution
- **Reason:** Both tasks modify the same file (`02-mdm-migration-psso.md`). Writing Task 1's content and then appending Task 2's content in a second Write would have risked partial-file state between commits. Authoring the complete file in one Write is structurally cleaner and avoids a read-back cycle.
- **Impact:** Single commit covers both tasks instead of two sequential commits. All acceptance criteria for both tasks verified against the single output.
- **Files modified:** `docs/macos-lifecycle/02-mdm-migration-psso.md`
- **Commit:** 209cafb

No other deviations. Plan executed as written with respect to structure, content rules, and acceptance criteria.

## Known Stubs

None — all content is substantive. The file's B2 terminus is intentionally a link-not-copy handoff to guide 01 (per D-01 design decision), not a stub.

## Threat Flags

None — static markdown documentation file; no executable code, no user input, no runtime data flow, no authentication surface introduced. T-90-01 (documentation accuracy) mitigated per threat model: HIGH-confidence facts stated as fact; MEDIUM-confidence facts (supervision status, ABM lockout-recovery UI, Iru console labels) gated behind explicit confidence callouts and verify-on-authoring-day notes; `last_verified`/`review_by` freshness stamps applied on OS-26-gated content; same-tenant key-survival claim absent throughout.

## Self-Check: PASSED

- [x] `docs/macos-lifecycle/02-mdm-migration-psso.md` exists (confirmed: 553 lines, 53158 bytes)
- [x] Commit 209cafb exists (`git log --oneline -3` verified)
- [x] All Task 1 automated verification: PASS
- [x] All Task 2 automated verification: PASS
- [x] MIG-01..04 acceptance criteria verified
- [x] No `NOT REGISTERED` in any app-sso output fence
- [x] No same-tenant key-survival claim anywhere in file
- [x] Version History is two-column (no Author)
- [x] `--` separators in See Also (macos-lifecycle convention)
