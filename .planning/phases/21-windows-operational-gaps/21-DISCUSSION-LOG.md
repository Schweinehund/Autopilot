# Phase 21: Windows Operational Gaps - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-04-13
**Phase:** 21-windows-operational-gaps
**Areas discussed:** Folder organization, Content overlap, Migration guide format, Audience targeting
**Method:** Adversarial review (Finder/Adversary/Referee pattern) per area — 12 total agents

---

## Folder Organization

**Adversarial Review:** 44 issues found by Finder, 4 disproved by Adversary, 40 confirmed by Referee.

| Option | Description | Selected |
|--------|-------------|----------|
| Sub-domain folders (5 new) | docs/device-lifecycle/, docs/infrastructure/, docs/security-compliance/, docs/migration/, docs/monitoring/ | |
| Extend existing + 2 new | Add WDLC to lifecycle/, WINF/WSEC to reference/ or admin-setup, create migration/ and monitoring/ | |
| Three operational folders | docs/device-lifecycle/, docs/deployment-config/, docs/operations/ | |
| **Modified Option 2** | **1 new folder (device-operations/) + extend reference/** | **✓** |

**User's choice:** Modified Option 2 — create `docs/device-operations/` for WDLC content, extend `docs/reference/` for WINF/WSEC/WMON/WMIG content.
**Notes:** Referee synthesized a new option from the adversarial analysis. Key insight: all 3 original options had critical structural flaws. The lifecycle/ folder's "Stage 5 of 5 / final stage / outside lifecycle scope" fence ruled out extending it. 5 sub-domain folders created shallow sprawl breaking role-based navigation. Three operational folders merged thematically incoherent content.

---

## Content Overlap

**Adversarial Review:** 39 issues found by Finder, 7 disproved by Adversary, 2 downgraded by Referee.

| Option | Description | Selected |
|--------|-------------|----------|
| Extend existing files | Expand endpoints.md with WINF-01, add WDLC to lifecycle/ | |
| New standalone, cross-link | All new docs in new locations, "See also" pointers in existing docs | |
| **Hybrid with modifications** | **WDLC in device-operations/ (not lifecycle/), WINF-01 standalone linking to endpoints.md** | **✓** |

**User's choice:** Hybrid approach — WDLC in device-operations/, WINF-01 standalone with canonical link to endpoints.md, WSEC/WMIG/WMON standalone.
**Notes:** Critical finding: endpoints.md's 16 inbound links and compact reference table design must be preserved. The "Feeds into: outside lifecycle scope" fence in lifecycle/05-post-enrollment.md is a deliberate design boundary, not accidental — adding "See also" links reinforces it rather than contradicting it.

---

## Migration Guide Format

**Adversarial Review:** 32 issues found by Finder, 13 disproved by Adversary, 19 confirmed by Referee.

| Option | Description | Selected |
|--------|-------------|----------|
| **Adapt admin template** | **Use existing admin-template.md with rollback section + sequencing callouts** | **✓** |
| New migration template | Create docs/_templates/migration-template.md with dedicated structure | |
| Per-guide format | Each WMIG uses its own structure | |

**User's choice:** Adapt admin template with minor extensions.
**Notes:** The Adversary successfully demonstrated that 13 of the Finder's concerns were either hypothetical (criticizing unwritten template), trivially accommodated by existing generic structures (Markdown tables for gap matrices, Steps section for any procedure), or based on misunderstanding existing flexibility (version gate is freetext, applies_to:both already fits). Only 1 critical survived: admin template genuinely lacks rollback structure — addressed by adding optional section.

---

## Audience Targeting

**Adversarial Review:** 34 issues found by Finder, 4 disproved by Adversary, 30 confirmed by Referee.

| Option | Description | Selected |
|--------|-------------|----------|
| Strict separation | Separate L1/L2/Admin file variants per doc | |
| **Primary + callouts** | **Primary audience tag with cross-tier callout blocks** | **✓** |
| Unified with sections | ## For L1 / ## For L2 / ## For Admin sections in each doc | |

**User's choice:** Primary audience with cross-tier callouts.
**Notes:** This IS the existing pattern — lifecycle docs already use `audience: both` with `> **L2 Note:**` callouts, error-code tables have `L1 Action` columns. The L1 template prohibition ("Do NOT link to L2-audience content from within steps") governs L1 docs linking OUT, not admin docs containing L1 callouts — direction matters. Option 3 (unified) had 3 criticals including L1 safety violation (destructive PowerShell commands visible on same page).

---

## Claude's Discretion

Areas where user deferred to Claude's judgment:
- File numbering within new folders
- Reference folder sub-organization
- Version gate wording for migration guides
- common-issues.md routing updates
- decision-trees/ integration for WDLC-02

## Deferred Ideas

None — discussion stayed within phase scope.
