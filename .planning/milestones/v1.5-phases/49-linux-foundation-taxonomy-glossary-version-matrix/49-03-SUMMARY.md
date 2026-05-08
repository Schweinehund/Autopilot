---
plan: 49-03
phase: 49-linux-foundation-taxonomy-glossary-version-matrix
status: complete
completed: 2026-04-26
---

# Plan 49-03 Summary: Linux Provisioning Glossary

## What Was Done

Created `docs/_glossary-linux.md` — the canonical Linux terminology layer for downstream Phase 50-52 and Phase 59 content — across 8 atomic commits.

## Tasks Completed

| Task | Description | Commit |
|------|-------------|--------|
| 49-03-01 | Scaffold: frontmatter + H1 + 7 H2 empty structure | 5e4d610 |
| 49-03-02 | Alphabetical Index: 30-term pipe-delimited list | 2776555 |
| 49-03-03 | Distro & Lifecycle: 10 H3 entries | 4e9eb92 |
| 49-03-04 | Agent & Service: 6 H3 entries | f0d2cc6 |
| 49-03-05 | Compliance & Encryption: 2 H3 entries | b736a3f |
| 49-03-06 | Operations & Diagnostics: 3 H3 entries | cc1c0b8 |
| 49-03-07 | Cross-Platform Collisions: 9 absent-concept H3s | 6e30604 |
| 49-03-08 | Version History table | b5f1139 |

## File Created

**`docs/_glossary-linux.md`** — 174 lines

### Structure
- Frontmatter: `platform: Linux`, `last_verified: 2026-04-26`, `review_by: 2026-06-25`
- Platform coverage blockquote referencing all 3 sibling glossaries
- 7 H2 sections in locked order (per D-11 + CDI-02):
  1. Alphabetical Index (30-term pipe-delimited list)
  2. Distro & Lifecycle (10 H3s)
  3. Agent & Service (6 H3s)
  4. Compliance & Encryption (2 H3s)
  5. Operations & Diagnostics (3 H3s)
  6. Cross-Platform Collisions (9 absent-concept H3s)
  7. Version History

### Counts
- Total H3 entries: 30 (21 Linux-native + 9 absent-concept)
- Cross-platform note blockquotes: 9 (on collision-risk Linux-native terms per D-12)
- Linux note blockquotes: 9 (one per absent-concept entry per D-13)

### Key Design Decisions Implemented
- **D-11**: 5 topical content H2 categories + Cross-Platform Collisions H2
- **D-12**: Per-term `> **Cross-platform note:**` blockquotes on collision-risk terms (dm-crypt, LUKS, GA kernel, Identity Broker, intune-agent.timer, intune-portal (package), Linux compliance settings, Web-app CA, journalctl)
- **D-13**: 9 absent-concept callout-only H3s (Supervision, DPC, Work Profile, COBO/COPE/WPCO, MGP, ZTE, VPP, Hardware Hash, ABM) using `> **Linux note:**` shape
- **D-14**: ~20 Linux-native terms covering downstream Phase 50-52 cross-reference needs
- **D-15**: Identity Broker back-links to `01-linux-prerequisites.md#non-version-breakpoints`
- **D-16**: GA kernel + HWE kernel as explicit disambiguation pair (PITFALL-4 guard)
- **PITFALL-2**: Web-app CA entry notes Linux-only CA constraint with PITFALL-2 anchor
- **PITFALL-3**: `packages.microsoft.com` entry documents deb-only distribution

## Verification Results

All plan-level integration checks pass:
1. Frontmatter `platform: Linux` + `last_verified` + `review_by` — PASS
2. 7 H2 sections in exact order — PASS
3. 30 H3 entries (>= 30 required) — PASS
4. 9 `> **Linux note:**` blockquotes (exactly 9 required) — PASS
5. Collision-risk terms carry Cross-platform note blockquotes — PASS
6. Identity Broker back-links to `#non-version-breakpoints` — PASS
7. Web-app CA references PITFALL-2 — PASS
8. Absent-concept callouts link to sibling glossary anchors — PASS (4 macOS, 4 Android, 1 Windows)

## Downstream Dependencies Satisfied

- **V-49-19** (Plan 49-04 PITFALL-5 collision audit): glossary structure ready for validator
- **Plan 49-04**: `check-phase-49.mjs` can assert all structural checks against this file
- **Phase 50-52**: All ~20 Linux-native term anchors available for runbook cross-references
- **Phase 59 CLEAN-08**: Linux side of 5-platform glossary reciprocity established

## Files Not Modified

- `STATE.md` — orchestrator owns
- `ROADMAP.md` — orchestrator owns
