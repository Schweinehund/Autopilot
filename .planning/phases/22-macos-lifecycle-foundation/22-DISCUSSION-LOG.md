# Phase 22: macOS Lifecycle Foundation - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-04-14
**Phase:** 22-macos-lifecycle-foundation
**Areas discussed:** Folder placement, Lifecycle narrative style, Reference file scope, Network endpoints format
**Method:** Adversarial review (Finder/Adversary/Referee, 12 agents total, 3 per area)

---

## Folder Placement

| Option | Description | Selected |
|--------|-------------|----------|
| New docs/macos/ folder | Platform silo for all macOS content | |
| Extend docs/lifecycle/ | Add macOS files alongside Windows files | |
| **New docs/macos-lifecycle/** | Dedicated folder parallel to lifecycle/ | **✓** |
| Extend docs/reference/ | Place macOS content in reference folder | |

**User's choice:** New docs/macos-lifecycle/
**Notes:** Adversarial review found 0 CRITICAL issues for this option. Alternatives had 2-3 CRITICALs each. Key issues dismissed: D-05 (Phase 21-specific, not universal prohibition), glob pattern depth (non-issue with `**`), template placeholder (deliberate convention).

---

## Lifecycle Narrative Style

| Option | Description | Selected |
|--------|-------------|----------|
| Multi-file stage-by-stage | Mirror Windows lifecycle pattern (7 files) | |
| **Single comprehensive narrative** | One file covering all 7 stages with flow diagram | **✓** |
| Hybrid overview + deep-dives | Overview + separate files for complex stages | |
| Tabular breakdown | Table-centric format with expandable details | |

**User's choice:** Single comprehensive narrative
**Notes:** 0 CRITICALs after D-10 correctly scoped to hub navigation (not document internals). macOS ADE is a linear pipeline with no branching — single file is structurally appropriate. Estimated 400-600 lines. Referee initially recommended multi-file for precedent, but data favored single narrative. Tabular option eliminated (fails "narrative" requirement).

---

## Reference File Scope

| Option | Description | Selected |
|--------|-------------|----------|
| **Two separate files** | macos-commands.md + macos-log-paths.md in reference/ | **✓** |
| Single combined file | One macOS-reference.md combining all content | |
| Quick-lookup table | Table-only format | |
| Three files by audience | Split by admin/L2/shared | |

**User's choice:** Two separate files (mirror Windows pattern)
**Notes:** 0 CRITICALs. Mirrors established Windows pattern (powershell-ref.md + registry-paths.md). Only 2 MEDIUM issues (false structural symmetry, architecture anchoring). Key disprovings: config profile locations ARE filesystem paths (belong in paths file), `profiles show` output interpretation has clear home in commands file, L2 template already handles 3-5 Tool References links per runbook.

---

## Network Endpoints

| Option | Description | Selected |
|--------|-------------|----------|
| Separate endpoints-macos.md | Standalone macOS endpoints file | |
| **Extend endpoints.md** | Add macOS section to existing file | **✓** |
| Combined with platform column | Add Platform column to every row | |
| Inline in lifecycle doc only | No separate reference | |

**User's choice:** Extend endpoints.md with macOS ADE section
**Notes:** 0 CRITICALs. D-08 ("stays unchanged") is Phase 21-scoped, not permanent. ARCHITECTURE.md Pattern 2 explicitly prescribes this approach. Anti-Pattern 3 warns against creating separate macOS endpoints file. Shared endpoints use "(shared)" labels per ARCHITECTURE.md worked example. All 15+ inbound links use file paths (not heading anchors) — title change is safe.

---

## Claude's Discretion

- Stage section headings within lifecycle narrative
- Whether to merge thin stages (e.g., ADE token sync + enrollment profile assignment)
- Internal format of macos-log-paths.md (pure table vs mixed)
- Entry ordering in reference files
- 00-index.md subsection grouping for macOS references

## Deferred Ideas

None — discussion stayed within phase scope.
