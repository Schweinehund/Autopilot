# Phase 67 Pre-Edit Anchor Inventory

**Captured:** 2026-05-26 (Plan 67-02 Wave 1 — BEFORE SWEEP-02 edits)
**Purpose:** PITFALL-6 / D-01 anti-regression baseline for the single file in STATE.md:125 scope ("capability matrices, glossaries, hub files"). Wave 7 post-edit diff verifies zero anchor shift at or above line 121 (`## Version History` H2). Any anchor present pre-edit that is missing or line-shifted post-edit constitutes a PITFALL-6 violation and a rollback condition before commit.

**Files covered:** 1 (`docs/_glossary-macos.md` — sole PITFALL-6 scope file per STATE.md:125 + CONTEXT.md D-01; admin-setup-ios/05- and admin-setup-macos/04-app-deployment.md are NOT in PITFALL-6 scope per CONTEXT.md D-01 line 34, since admin-setup-* docs are not in the STATE.md:125 "capability matrices, glossaries, hub files" scope set)

## File 1: `docs/_glossary-macos.md`

**Total line count:** 128 (pre-edit; per 67-RESEARCH.md A6 verified read on 2026-05-26)
**Role:** macOS glossary (also covers iOS/iPadOS terms per line-9 header); SWEEP-02 coordinating row appended to `## Version History` H2 table at line 121; frontmatter `last_verified:` bumped 2026-05-05 → 2026-05-26
**Insertion point:** INSIDE existing H2 table (between separator at line 124 and existing newest row at line 125), newest-first convention per 67-PATTERNS.md:146; new row becomes new line 125 (existing 2026-05-05 row shifts from line 125 to line 126)

### H2/H3 Anchor Table (pre-edit baseline)

| Line | Level | Heading Text          | Slug                          | Notes                                                                                                                                       |
|------|-------|-----------------------|-------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------|
|   13 | H1    | Apple Provisioning Glossary | `apple-provisioning-glossary` | H1 title — not C16 load-bearing                                                                                                          |
|   15 | H2    | Alphabetical Index    | `alphabetical-index`          | Table of contents H2                                                                                                                        |
|   21 | H2    | Enrollment            | `enrollment`                  | Category H2                                                                                                                                 |
|   23 | H3    | Account-Driven User Enrollment | `account-driven-user-enrollment` | Term entry                                                                                                                          |
|   30 | H3    | ADE                   | `ade`                         | Term entry                                                                                                                                  |
|   37 | H3    | Await Configuration   | `await-configuration`         | Term entry                                                                                                                                  |
|   44 | H3    | Setup Assistant       | `setup-assistant`             | Term entry                                                                                                                                  |
|   51 | H3    | Supervision           | `supervision`                 | Term entry; cross-platform linked from android/linux glossaries                                                                             |
|   60 | H2    | Device Management     | `device-management`           | Category H2                                                                                                                                 |
|   62 | H3    | ABM                   | `abm`                         | Term entry; Apple Business rebrand reciprocity                                                                                              |
|   70 | H3    | ABM Token             | `abm-token`                   | Term entry                                                                                                                                  |
|   76 | H3    | APNs                  | `apns`                        | Term entry                                                                                                                                  |
|   82 | H3    | Jailbreak Detection   | `jailbreak-detection`         | Term entry                                                                                                                                  |
|   90 | H2    | App Distribution      | `app-distribution`            | Category H2                                                                                                                                 |
|   92 | H3    | VPP                   | `vpp`                         | Term entry; cross-link target from `docs/_glossary-macos.md#vpp` references in admin-setup-macos/04-app-deployment.md:15                    |
|  108 | H2    | App Protection (MAM)  | `app-protection-mam`          | Category H2                                                                                                                                 |
|  110 | H3    | MAM-WE                | `mam-we`                      | Term entry                                                                                                                                  |
|  121 | H2    | Version History       | `version-history`             | **PITFALL-6 LOAD-BEARING ANCHOR** — MUST remain at line 121 post-edit (intra-table row append at line 125 does not shift H2 line position) |

### Load-Bearing Anchor Flags

- `#version-history` (line 121): SWEEP-02 coordinating row append target. The H2 slug MUST remain `version-history` post-edit (append does not rename the heading); line position MUST remain 121 (insert is INSIDE the table at line 125 between separator and existing row — no new H2 promoted). Per CONTEXT.md D-01 + STATE.md:125 PITFALL-6 contract.
- Any anchor at or above line 121 (i.e., all 17 anchors at lines 13-121) MUST remain at its current line number; any anchor at or below line 121 is allowed to shift by +1 (the new row pushes existing rows down by one line each).

### ABAUDIT Line-Pair Status

None. This file is not in any ABAUDIT exemption set (verified via grep of `scripts/validation/v1.6-audit-allowlist.json` for `_glossary-macos.md` — only appearance is in `c13_rotting_external.ci_1_abm_urls[3]` at line 64 for ABM URL ref, and `c13_rotting_external.ci_3_managed_apple_id` count: 3 — neither is an ABAUDIT exemption line-pair).

### Post-Edit Verification Protocol

After Wave 5 edits land but BEFORE `git add`:

```powershell
Select-String -Path docs/_glossary-macos.md -Pattern '^#' | ForEach-Object {
  "{0,4} | {1}" -f $_.LineNumber, $_.Line
} | Out-File .planning/phases/67-corpus-surgical-sweeps-pillar-a-low-risk-warm-up/_tmp-glossary-anchors-post.txt -Encoding utf8

git diff --no-index .planning/phases/67-corpus-surgical-sweeps-pillar-a-low-risk-warm-up/_tmp-glossary-anchors-pre.txt .planning/phases/67-corpus-surgical-sweeps-pillar-a-low-risk-warm-up/_tmp-glossary-anchors-post.txt
```

Expected: ZERO output lines (no anchor shift). Any output → rollback condition; fix the table edit before continuing. The post-edit diff result is embedded inline below at the Post-Edit Verification H2.

## Post-Edit Verification (Wave 7 — captured 2026-05-26)

`git diff --no-index` between pre-edit and post-edit anchor snapshots:

```
<empty>
```

(Captured at execution time: `git diff --no-index .../_tmp-glossary-anchors-pre.txt .../_tmp-glossary-anchors-post.txt` returned exit code 0 and zero stdout/stderr output — both files byte-identical.)

**Result:** ZERO anchor shift ≥ line 121 (PITFALL-6 invariant satisfied; commit may proceed). The `## Version History` H2 remains at line 121 post-edit. The intra-table row insertion at line 125 shifted the existing 2026-05-05 row from line 125 to line 126 (allowed; below the PITFALL-6 boundary), but did NOT shift the H2 line position itself or any anchor at or above line 121.
