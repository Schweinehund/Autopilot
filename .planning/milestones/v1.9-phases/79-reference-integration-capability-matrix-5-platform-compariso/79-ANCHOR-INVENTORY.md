# Phase 79 Pre-Edit Anchor Inventory

**Generated:** 2026-06-21
**Purpose:** Committed before content edits per SC2 hard prerequisite (D1). Proves anchor-stability: post-edit anchor sets are strict supersets of these pre-edit sets.

## macos-capability-matrix.md — Pre-Edit H2 Anchors

| H2 heading (exact) | Slug | Post-edit status |
|--------------------|------|-----------------|
| `## Enrollment` | `#enrollment` | preserved |
| `## Configuration` | `#configuration` | preserved (X1 edits cell text only — heading NOT touched) |
| `## App Deployment` | `#app-deployment` | preserved |
| `## Compliance` | `#compliance` | preserved |
| `## Software Updates` | `#software-updates` | preserved |
| `## Conditional Access` | `#conditional-access` | preserved |
| `## Key Gaps Summary` | `#key-gaps-summary` | preserved |
| `## See Also` | `#see-also` | preserved |
| *(new)* `## Authentication` | `#authentication` | ADDED (before `## See Also`) |

## 4-platform-capability-comparison.md — Pre-Edit H2 Anchors

| H2 heading (exact) | Slug | Post-edit status |
|--------------------|------|-----------------|
| `## Enrollment` | `#enrollment` | preserved |
| `## Configuration` | `#configuration` | preserved |
| `## App Deployment` | `#app-deployment` | preserved |
| `## Compliance` | `#compliance` | preserved |
| `## Software Updates` | `#software-updates` | preserved |
| `## Conditional Access` | `#conditional-access` | preserved |
| `## See Also` | `#see-also` | preserved |
| `## Version History` | `#version-history` | preserved |
| *(new)* `## Single Sign-On` | `#single-sign-on` | ADDED (before `## See Also`) |

## Superset Assertion

- **matrix post-edit:** {enrollment, configuration, app-deployment, compliance, software-updates, conditional-access, key-gaps-summary, see-also} ∪ {authentication} — superset holds
- **comparison post-edit:** {enrollment, configuration, app-deployment, compliance, software-updates, conditional-access, see-also, version-history} ∪ {single-sign-on} — superset holds

No pre-edit anchor is removed or renamed. The six C12-named H2s required by the v1.8 audit harness (`## Enrollment`, `## Configuration`, `## App Deployment`, `## Compliance`, `## Software Updates`, `## Conditional Access`) all remain present in `4-platform-capability-comparison.md` after Phase 79 edits. A 7th H2 (`## Single Sign-On`) is added and explicitly allowed by the harness (audit.mjs:652-654 checks only for presence of the six named H2s, not count). The `#configuration` anchor in `macos-capability-matrix.md` is preserved: X1 edits the cell text of the Platform SSO row only — the `## Configuration` heading at line 28 is not touched.
