# Phase 17: Navigation & Hub Updates - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md -- this log preserves the alternatives considered.

**Date:** 2026-04-13
**Phase:** 17-navigation-hub-updates
**Areas discussed:** Index page layout, Common issues routing, Glossary APv2 terms, Cross-reference scope

---

## Index Page Layout

| Option | Description | Selected |
|--------|-------------|----------|
| Separate APv2 sections | Add distinct APv2 subsections under each audience role (L1, L2) plus a new Admin section. Visually distinct headings satisfy SC1. | ✓ |
| Framework subsections within tables | Add APv2 rows to existing tables with a Framework column. Compact but less visually distinct. | |
| APv1/APv2 toggle at top | Details/summary HTML toggle at top. Clean but harder to scan both frameworks at once. | |

**User's choice:** Separate APv2 sections (Recommended)
**Notes:** Clear framework separation matches existing Phase 12 pattern. Admin audience is new to v1.1.

### Follow-up: Admin Links Placement

| Option | Description | Selected |
|--------|-------------|----------|
| New 'Admin Setup' section | Top-level section between L2 and Shared References. Distinct audience = distinct section. | ✓ |
| Under Shared References | Add to existing Shared References table. Lumps admin guides with glossary/lifecycle. | |
| You decide | Claude picks best placement. | |

**User's choice:** New 'Admin Setup' section (Recommended)
**Notes:** Admin is a distinct audience role introduced by v1.1 setup guides.

---

## Common Issues Routing

| Option | Description | Selected |
|--------|-------------|----------|
| Separate APv2 section | Add '## APv2 Failure Scenarios' below existing APv1 content with framework labels. Matches error-codes index pattern. | ✓ |
| Symptom-first, then branch | Group by shared symptoms, branch to APv1 or APv2 runbook. More intuitive but harder to maintain framework separation. | |
| Framework gate at top | Details/summary toggle. User picks framework first. Clean but adds a click. | |

**User's choice:** Separate APv2 section (Recommended)
**Notes:** SC3 requires "without cross-contamination." Matches Phase 12 error-codes index pattern.

---

## Glossary APv2 Terms

### Term Scope

| Option | Description | Selected |
|--------|-------------|----------|
| Full APv2 term audit | Scan all Phase 11-16 files. Covers ETG, BootstrapperAgent, Device Preparation policy plus others discovered. | ✓ |
| Minimum 3 terms only | Add only the 3 terms named in SC2. Faster but may leave gaps. | |

**User's choice:** Full APv2 term audit (Recommended)
**Notes:** Glossary is a living reference -- should cover all terms in the v1.1 documentation set.

### Cross-Reference Format

| Option | Description | Selected |
|--------|-------------|----------|
| Inline 'See also' links | Each term with APv1/APv2 equivalent gets inline cross-reference. Follows existing glossary link pattern. | ✓ |
| Cross-reference subsection | 'Related terms:' line below each definition. Cleaner but more verbose. | |
| You decide | Claude picks format. | |

**User's choice:** Inline 'See also' links (Recommended)
**Notes:** Consistent with existing glossary formatting pattern.

---

## Cross-Reference Scope

| Option | Description | Selected |
|--------|-------------|----------|
| Hub + direct equivalents | Update hub files AND add APv2 back-links to APv1 files with direct counterparts. Satisfies SC4. | ✓ |
| Hub files only | Only update index, glossary, common-issues, error-codes index. Faster but doesn't satisfy SC4 fully. | |
| Full docs/ audit | Check every file in docs/. Most thorough but risks scope creep. | |

**User's choice:** Hub + direct equivalents (Recommended)
**Notes:** Targeted approach satisfies SC4 without touching every file. APv1 files with APv2 counterparts identified in D-13.

---

## Claude's Discretion

- Exact wording of APv2 section headers in index.md
- Number of additional APv2 glossary terms beyond the 3 required minimums
- Whether quick-ref cards get inline APv2 additions or just "See also" links
- Ordering of APv2 entries within common-issues.md APv2 section

## Deferred Ideas

None -- discussion stayed within phase scope.
