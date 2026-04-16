# Phase 27 Discussion Log

**Date:** 2026-04-16
**Mode:** Interactive (all 4 areas selected)
**Areas discussed:** 4/4

## Decisions Made

### 1. Supervised-only callout pattern
- **Format:** Blockquote + lock emoji (`> 🔒 **Supervised only:** ...`)
- **Link target:** `../ios-lifecycle/00-enrollment-overview.md#supervision` (conceptual anchor)
- **Rationale:** Matches roadmap SC#4 verbatim, structurally scannable, links to Phase 26 supervision concept

### 2. ABM cross-reference strategy
- **Approach:** Structured cross-reference with inline summary
- **Pattern:** 1-2 sentence context → link to macOS section → iOS-specific differences inline
- **Rationale:** Satisfies SC#2 cross-reference mandate while keeping iOS guide self-sufficient

### 3. APNs certificate guide scope
- **Scope:** Setup + renewal + "What breaks if misconfigured" callouts
- **Boundary:** No diagnostic procedures (Phase 31 scope)
- **Critical callout:** Renew-not-replace rule — creating new certificate breaks ALL Apple MDM

### 4. Document numbering and template
- **Structure:** 00-overview, 01-apns, 02-abm-token, 03-enrollment-profile
- **Template:** Create iOS admin template FIRST, then all guides follow it
- **Rationale:** Mirrors macOS convention, dependency-ordered, consistent from the start
