---
plan: 49-02
phase: 49-linux-foundation-taxonomy-glossary-version-matrix
status: complete
completed: 2026-04-26
---

# Plan 49-02 Summary: Linux Prerequisites + Version Matrix

## What Was Done

Created `docs/linux-lifecycle/01-linux-prerequisites.md` — the canonical Ubuntu version-breakpoint matrix for Microsoft Intune Linux device management. All 6 tasks executed atomically, each committed individually with --no-verify.

## Tasks Completed

| Task | Commit | Description |
|------|--------|-------------|
| 49-02-01 | 0da2403 | Frontmatter (`platform: Linux`, `last_verified: 2026-04-26`, `review_by: 2026-06-25`, `audience: admin`, `applies_to: both`), H1, Platform gate blockquote |
| 49-02-02 | 5a38bce | `## Supported Ubuntu Versions` H2 with exact 3-row x 5-col matrix; header matches V-49-09 literal; footnote [^1] on 20.04 row per D-08 |
| 49-02-03 | 5853ec9 | `### Ubuntu 20.04 — End-of-Support` H3 with Intune 2508 drop narrative + admin action required (audit, upgrade path 20.04→22.04 only, reference, re-enrollment) |
| 49-02-04 | a0a73e3 | `### Non-version Breakpoints` H3 + `#### Identity Broker v2.0.2+` H4 per D-09/D-15/DPO-01; back-link to Phase 50 LIN-05 callout anchor |
| 49-02-05 | 033584d | `## Hardware and Software Prerequisites` H2 with Architecture/Hardware, Required Software, and Networking H3 subsections per STACK.md |
| 49-02-06 | 259ef93 | `## See Also` H2 with cross-references to enrollment overview, glossary (with term anchors), and 2 Microsoft Learn source URLs |

## Artifact Produced

**`docs/linux-lifecycle/01-linux-prerequisites.md`** — 969 words, 3 H2 sections, fully satisfies all must_haves:

- `platform: Linux` frontmatter + 60-day cycle (`last_verified: 2026-04-26`, `review_by: 2026-06-25`)
- `> **Platform gate:**` blockquote immediately under H1
- `## Supported Ubuntu Versions` H2 with matrix header exactly `| Version | GA Kernel | HWE Kernel | Support Status | EOS Date |`
- 3 distro rows: Ubuntu 24.04 LTS, 22.04 LTS, 20.04 LTS (Dropped — Intune 2508 [^1])
- `### Ubuntu 20.04 — End-of-Support` H3 per D-08
- `### Non-version Breakpoints` H3 per D-09 — exposes `#non-version-breakpoints` anchor for Phase 50 LIN-05 DPO-01 back-link
- `#### Identity Broker v2.0.2+` H4 with re-registration behavior description
- EOS Date column uses pinned-event labels (`Intune 2508`) not bare dates per D-10
- GA/HWE kernel cells carry `[verify-on-current-Ubuntu]` markers per STACK.md research-flags pattern
- `## Hardware and Software Prerequisites` H2: x86_64, GNOME, physical/Azure/Hyper-V, Microsoft Edge for Linux 102.x+, packages.microsoft.com, microsoft-identity-broker, intune-agent.timer, networking requirements
- `## See Also` with enrollment overview, Linux Provisioning Glossary (5 term anchors), 2 Microsoft Learn URLs

## Key Design Decisions Honored

- **D-07:** 3 rows x 5 columns pivot orientation (not 6-row Version x Kernel grid)
- **D-08:** 20.04 footnote-marked row in matrix + dedicated H3 below (not strikethrough)
- **D-09:** Non-version Breakpoints H3 in matrix doc; Phase 50 owns detailed pitfall callout (split-author per D-15)
- **D-10:** Pinned-event EOS labels; MEDIUM-confidence kernel cells carry inline freshness markers
- **DPO-01:** `#non-version-breakpoints` anchor exposed for Phase 50 LIN-05 back-link
- **CD-05:** GFM `[^1]` footnote syntax used for 20.04 EOS marker

## Downstream Dependencies Enabled

- Phase 50 LIN-05 can back-link to `docs/linux-lifecycle/01-linux-prerequisites.md#non-version-breakpoints` (DPO-01)
- Phase 50 LIN-06 (`02-enrollment-profile.md`) can cite this matrix for version gating
- Phase 52 L2 runbook 25 (kernel-version verification) can cite this matrix for GA/HWE disambiguation
- Validator V-49-09 (matrix header literal match) and V-49-10 (3-row count) will assert against this file in Plan 49-04

## Verification Status

All 6 task acceptance criteria: PASS
End-of-plan integration check: PASS
- File exists with correct frontmatter: PASS
- Matrix header exact literal: PASS
- Exactly 3 distro rows: PASS
- Ubuntu 20.04 End-of-Support H3 present: PASS
- Non-version Breakpoints H3 + Identity Broker H4 present: PASS
- Intune 2508 pinned-event label present: PASS
- Hardware prerequisites complete (x86_64, GNOME, Edge 102.x, packages.microsoft.com): PASS
- Word count 969 (within 500-1500 target): PASS
- Exactly 3 H2 sections: PASS
