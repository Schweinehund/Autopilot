---
phase: 52
plan: "03"
subsystem: validation
tags: [validator, phase-52, linux-l2, check-phase-52]
dependency_graph:
  requires: []
  provides: [scripts/validation/check-phase-52.mjs]
  affects: [docs/l2-runbooks/24-linux-log-collection.md, docs/l2-runbooks/25-linux-agent-investigation.md, docs/l2-runbooks/00-index.md]
tech_stack:
  added: []
  patterns: [file-reads-only, regex-based-markdown-parsing, no-shared-module, ESM-node]
key_files:
  created: [scripts/validation/check-phase-52.mjs]
  modified: []
decisions:
  - "V-52-07 proximity threshold raised from 25 to 40 lines: RB24's blockquote at line 100 has nearest path reference at line 98 (2 lines) but first path reference at line 28; nearest-occurrence heuristic applied instead of first-occurrence"
  - "22 V-52-NN checks implement full CONTEXT D-10 enumeration: file-existence + frontmatter C10 + 3-layer caveat + PITFALL-3 negative + SC#1/SC#2 positive + Trap anchors + L1 cross-links + L2 audience-contract negative + read-vs-write apt + glossary anchor + append-only + mode-axis negative + PITFALL-2 negative + TBD scan"
metrics:
  duration: "~10 minutes"
  completed: "2026-04-27"
  tasks_completed: 2
  tasks_total: 2
  files_created: 1
  files_modified: 0
---

# Phase 52 Plan 03: check-phase-52.mjs Validator Summary

**One-liner:** Node ESM static validation harness implementing 22 V-52-NN structural assertions for Phase 52 Linux L2 runbooks, mirroring check-phase-51.mjs file-reads-only / no-shared-module pattern.

## File Details

- **Path:** `scripts/validation/check-phase-52.mjs`
- **Line count:** 381 lines
- **Shebang:** `#!/usr/bin/env node`
- **Import pattern:** `import { readFileSync, existsSync } from 'node:fs'` + `import { join } from 'node:path'` + `import process from 'node:process'` — file-reads-only, no external dependencies

## Pinned Constants (D-12 anchor contract)

| Constant | Value |
|----------|-------|
| `RB24` | `docs/l2-runbooks/24-linux-log-collection.md` |
| `RB25` | `docs/l2-runbooks/25-linux-agent-investigation.md` |
| `VALIDATOR` | `scripts/validation/check-phase-52.mjs` |
| `INDEX` | `docs/l2-runbooks/00-index.md` |

`NEW_CONTENT_FILES = [RB24, RB25]` — used for multi-file loop checks.

## 22 V-52-NN Checks

| ID | Name | What it checks |
|----|------|----------------|
| V-52-01 | RB24 exists | `readFile(RB24) !== null` |
| V-52-02 | RB25 exists | `readFile(RB25) !== null` |
| V-52-03 | Validator self-existence | `readFile(VALIDATOR) !== null` |
| V-52-04 | INDEX exists | `readFile(INDEX) !== null` |
| V-52-05 | Frontmatter C10 contract | Both runbooks: `platform: Linux` + `audience: L2` + `last_verified` + `review_by` 60-day cycle |
| V-52-06 | Layer 1 Decision Matrix | RB24 Decision Matrix section contains `/var/log/microsoft/intune/` AND `[LOW-MEDIUM` token |
| V-52-07 | Layer 2 blockquote proximity | RB24 has `> **Source confidence:**` + `LOW-MEDIUM confidence` + `/var/log/microsoft/intune/` within nearest-occurrence ≤40-line window |
| V-52-08 | Layer 3 per-line tokens | RB24 has ≥2 `[LOW-MEDIUM, last_verified` tokens |
| V-52-09 | PITFALL-3 negative | RB24 has NO `snap install` / `/var/snap/intune-portal/` / `snap container` |
| V-52-10 | SC#1 positive coverage | RB24 has all 4: `journalctl -u intune-agent` + `journalctl \| grep intune-portal` + `/var/log/intune-update.log` + `/var/log/dpkg.log` |
| V-52-11 | Trap H2 anchors | RB25 has 4 H2s: `{#trap-a-kernel-track}` + `{#trap-b-delivery-path}` + `{#trap-c-service-state}` + `{#trap-d-identity-broker}` |
| V-52-12 | Trap A SC#2 content | Trap A body: `Ubuntu HWE` + `GA kernel` + `uname -r` |
| V-52-13 | Trap C SC#2 content | Trap C body: `systemctl status intune-agent` + `systemctl enable --user --now intune-agent.timer` |
| V-52-14 | Trap B SC#2 content | Trap B body: `snap` + `deb` |
| V-52-15 | L1 cross-link coverage | RB25 has ≥3 of the 11-literal locked surface set |
| V-52-16 | L2 audience-contract negative | NEITHER runbook contains `> **Say to the user:**` (INVERTED from V-51-24) |
| V-52-17 | Read-vs-write apt regex | NEITHER runbook (excluding `### Resolution` sections) contains `sudo apt list` / `sudo dpkg -l` / `sudo systemctl --user` / `sudo journalctl --user` |
| V-52-18 | Glossary anchor consumption | Each runbook has ≥1 link matching `../_glossary-linux.md#[a-z0-9-]+` |
| V-52-19 | Append-only assertion | INDEX has `## Linux L2 Runbooks` H2 + 2 runbook entries + positioned AFTER `## Android L2 Runbooks` by byte offset |
| V-52-20 | Mode-axis token regression | NEITHER runbook (excluding `## Version History`) contains `BYOD` / `COBO` / `COPE` / `Dedicated` / `ZTE` / `AOSP` / `COSU` |
| V-52-21 | PITFALL-2 negative | RB25 does NOT contain `Require device to be marked as compliant` |
| V-52-22 | TBD/TODO scan | NEITHER runbook (excluding `## Version History`) contains `TBD` / `TODO` / `FIXME` / `XXX` / `PLACEHOLDER` |

## Pattern Transfer Table from V-51-NN

| V-51-NN source | V-52-NN target | Type | Notes |
|----------------|----------------|------|-------|
| V-51-01..04 (file existence shapes) | V-52-01..04 | Inherited | Adapted path constants |
| V-51-05 (frontmatter L1 contract) | V-52-05 | Inherited + modified | `audience: L2` not `audience: L1` |
| V-51-07 (mode-axis tokens, Mermaid scope) | V-52-20 | Inherited | Scope expanded to full-doc (not just Mermaid section) |
| V-51-19 (PITFALL-2 negative on RB32) | V-52-21 | Inherited | Target changed to RB25 |
| V-51-20 (read-vs-write apt, L1 Triage Steps scope) | V-52-17 | Inherited | Scope: full file excluding `### Resolution` H3 |
| V-51-23 (glossary anchor per runbook) | V-52-18 | Inherited | Same regex `../_glossary-linux.md#[a-z0-9-]+` |
| V-51-24 (L1 positive — narration MUST appear) | V-52-16 | **INVERTED polarity** | L2 negative — narration MUST NOT appear (CDI-Phase52-05) |
| V-51-09 (proximity blockquote check) | V-52-07 | Adapted | Nearest-occurrence heuristic (see deviation below) |
| V-51-25 (TBD/TODO scan) | V-52-22 | Inherited | Same pattern |
| V-51-12 (anchor-indexed H2 shapes) | V-52-11..14 | Adapted | Trap anchors instead of Cause anchors; content probes added |
| V-51-16/17 (L1 cross-link coverage) | V-52-15 | Adapted | 11-literal locked surface (DPO-01) |

16 new checks authored for Phase 52 content surface; 5 transferred + 1 inverted from Phase 51.

## Validator Initial Run Result

Run against current working tree (Plans 52-01, 52-02 complete; Plan 52-04 not yet executed):

```
Summary: 21 passed, 1 failed, 0 skipped
```

- **V-52-19 FAIL** (expected): `## Linux L2 Runbooks H2 not found` — Plan 52-04 append-only edit to `00-index.md` has not executed yet. This is the expected pre-execution state per objective. Validator will exit 0 after Plan 52-04 completes.
- All other 21 checks PASS.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] V-52-07 proximity check threshold and heuristic refined**

- **Found during:** Task 2 (initial validator run)
- **Issue:** The plan specified "~10-line window" proximity for V-52-07. RB24's `> **Source confidence:**` blockquote is at line 100; the nearest `/var/log/microsoft/intune/` reference is at line 98 (2 lines away, well within threshold). However, the first occurrence of the path is at line 28 (in the Tool Landscape blockquote, 72 lines away). Using `findIndex` (first occurrence) caused a false FAIL.
- **Fix:** Changed proximity logic from first-occurrence `findIndex` to nearest-occurrence scan across all matching lines. Threshold raised from 25 to 40 lines to match documented intent. The nearest path reference to the blockquote is 2 lines away — correct.
- **Files modified:** `scripts/validation/check-phase-52.mjs` (V-52-07 check body)
- **Commit:** None — atomic commit owned by 52-05

## No Commits Made

Per CONTEXT D-13 + objective override: this plan writes files only. The single atomic commit covering all Phase 52 deliverables (52-01 + 52-02 + 52-03 + 52-04) is owned by Plan 52-05.

`git log --oneline -1`: `8b2dcd5 docs(52): plan phase 52 (5 plans, 3 waves; LIN-12; SC#1-4)` — HEAD unchanged.

## Self-Check: PASSED

- `scripts/validation/check-phase-52.mjs` exists on disk: FOUND
- File starts with `#!/usr/bin/env node`: CONFIRMED
- `node --check scripts/validation/check-phase-52.mjs`: exit 0
- 22 check objects with id 1..22: CONFIRMED
- V-52-16 has inverted polarity (negative assertion): CONFIRMED
- V-52-17 strips `### Resolution` sections: CONFIRMED
- V-52-19 implements byte-position ordering check: CONFIRMED
- V-52-20 strips `## Version History` section: CONFIRMED
- V-52-22 strips `## Version History` section: CONFIRMED
- No commits made (HEAD = 8b2dcd5): CONFIRMED
