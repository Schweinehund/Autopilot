# Phase 16: APv1 Admin Setup Guides - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md -- this log preserves the alternatives considered.

**Date:** 2026-04-13
**Phase:** 16-apv1-admin-setup-guides
**Areas discussed:** File structure, Hardware hash paths, Deployment modes, APv1 positioning
**Method:** Adversarial review per user request -- parallel research agents evaluated each area

---

## File Structure

| Option | Description | Selected |
|--------|-------------|----------|
| A: Mirror APv2 (5 files) | Consolidate to match APv2's 5-file count | |
| B: One per SC (7+ files) | Strict 1:1 success criterion to file mapping | |
| C: Hybrid (6-7 files) | Group coupled topics, separate config-failures table | |
| C modified: 7 files + modes expansion | Hybrid for files 01-04, separate mode files 05-09, standalone config-failures | ✓ |

**User's choice:** Accept recommended Option C with modification -- results in 11 files total when combined with deployment modes decision (separate file per mode). Config-failures reverse-lookup table as standalone file.

**Adversarial analysis highlights:**
- Option A's fatal flaw: forces unrelated topics together, ESP + profile file would hit ~400 lines (2x APv2 density ceiling)
- Option B's fatal flaw: Intune Connector file would be a ~60-line stub
- Option C won on density balance; modification to extract config-failures table makes it independently linkable

---

## Hardware Hash Upload Paths

| Option | Description | Selected |
|--------|-------------|----------|
| A: Equal depth | 15-20 steps per path regardless of admin involvement | |
| B: Decision tree + weighted depth | Depth proportional to complexity/error surface | ✓ |
| C: Scenario-based | Organized by "new devices" / "existing devices" scenarios | |

**User's choice:** Accept recommended Option B -- decision tree first, PowerShell full depth, CSV moderate, OEM minimal (verify-only).

**Adversarial analysis highlights:**
- Option A's fatal flaw: OEM path has ~3-5 real admin steps; padding to 15 is manufactured noise
- Option C's fatal flaw: "existing devices" maps to both CSV and PowerShell, moving the decision inside a scenario instead of solving it
- Option B won because depth correlates with error surface area

---

## Deployment Modes

| Option | Description | Selected |
|--------|-------------|----------|
| A: Single combined file | All 3 modes + connector in one 800-1200 line file | |
| B: Separate per mode (refined) | Overview + 3 mode files + standalone connector (5 files) | ✓ |
| C: Common + mode-specific | Combined file + standalone connector | |

**User's choice:** Accept recommended Option B refined -- 5 files: modes-overview, user-driven, pre-provisioning, self-deploying, intune-connector-ad.

**Adversarial analysis highlights:**
- Option A's fatal flaw: 800-1200 lines violates Phase 15 D-01 (multi-file) and D-09 (focused per-file tables)
- Option C's fatal flaw: functionally Option A with cosmetic repackaging, same length problems
- Option B won because it matches Microsoft Learn's per-mode structure and gives each mode full admin-template treatment
- Intune Connector standalone because it serves two modes and has its own prerequisites

---

## APv1 Positioning

| Option | Description | Selected |
|--------|-------------|----------|
| A: Purely APv1 | Zero migration nudges; rely on version gate + comparison page | |
| B: Gentle awareness | Single "Consider APv2" callout in overview only | ✓ |
| C: Active migration | APv2 equivalent sidebar on every file | |

**User's choice:** Accept recommended Option B -- single callout in overview, individual guides stay purely APv1.

**Adversarial analysis highlights:**
- Option A's fatal flaw: admin who inherited APv1 never discovers APv2 -- version gate doesn't explain *why* to click
- Option C's fatal flaw: massive maintenance burden, breaks symmetry (APv2 guides don't have APv1 sidebars), pollutes signal-to-noise
- Option B closes the narrow discovery gap with near-zero maintenance cost

---

## Claude's Discretion

- Exact wording of "what breaks" callouts
- PowerShell code style in hardware hash procedures
- Configuration-Caused Failures table entry count per file
- Mermaid decision tree syntax for hash path and mode selection
- Whether modes overview includes visual Mermaid diagram
- Exact "Consider APv2" callout structure
- Common OOBE settings duplication vs linking strategy

## Deferred Ideas

None -- discussion stayed within phase scope.
