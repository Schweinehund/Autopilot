---
phase: 62
plan: 62-07
title: "PITFALL-6 anchor inventory + 4 reciprocal banner lines + 1 inline see-also + 2 intro callouts (AB-05/AB-06)"
status: complete
completed: 2026-05-21
duration_minutes: 35
tasks_completed: 4
tasks_total: 4
files_created: 1
files_modified: 6
requirements_satisfied: [AB-05, AB-06]
key_decisions:
  - "Inserted banner lines into existing reciprocity blockquotes (not before H1) to follow existing blockquote continuation pattern in each glossary"
  - "Used #apple-business anchor (not #abm) per plan critical invariant and D-04 clean slug decision"
  - "Callout inserted between Platform-gate blockquote and H1 for both admin files, keeping all 3 C14 tokens within first 50 lines"
  - "Anchor inventory committed BEFORE any existing-file edits per PITFALL-6 ordering invariant"
depends_on: [62-02, 62-03]
---

# Phase 62 Plan 62-07: PITFALL-6 anchor inventory + 4 reciprocal banner lines + 1 inline see-also + 2 intro callouts — Summary

**One-liner:** Pre-edit anchor snapshot for 3 corpus files (PITFALL-6) + 4 reciprocal banner lines to `_glossary-apple-business.md` + 1 inline see-also at `_glossary-macos.md` ABM entry + 2 C14 rebrand callouts in macOS and iOS admin guides (AB-05 sites #2+#3 complete; AB-06 complete).

## Tasks Executed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 62-07-01 | PITFALL-6 pre-edit anchor inventory | `ba7d28b` | `.planning/.../62-ANCHOR-INVENTORY.md` (created) |
| 62-07-02 | 4 reciprocal banner lines + 1 inline see-also | `fc38b8a` | `_glossary.md`, `_glossary-macos.md`, `_glossary-android.md`, `_glossary-linux.md` |
| 62-07-03 | Rebrand callouts sites #2 + #3 (AB-05) | `0d08b0d` | `01-abm-configuration.md`, `02-abm-token.md` |
| 62-07-04 | Finalize anchor-stability verification | `df5ccfb` | `62-ANCHOR-INVENTORY.md` (checkboxes updated) |

## Pre-Edit Git SHAs Captured (PITFALL-6 Baseline)

| File | Pre-edit SHA |
|------|-------------|
| `docs/_glossary-macos.md` | `27bafaf701ab3e06c183e36ccd12e3ca94463a73` |
| `docs/admin-setup-macos/01-abm-configuration.md` | `350562f49d9b101407736042bad679e68aa6d6f7` |
| `docs/admin-setup-ios/02-abm-token.md` | `72aabc2e4d5d8b57d3b278db8e92d07a813a88e4` |

## Post-Edit Verification Checklist (All 5 Green)

- [x] `_glossary-macos.md` alphabetical index line unchanged byte-for-byte (moved line 16 -> 17 due to banner insertion; content identical)
- [x] All `_glossary-macos.md` H3 anchors present with zero slug changes (11 H3 entries, all headings text-identical)
- [x] `01-abm-configuration.md` all pre-edit H2/H3 anchors present post-edit (7 H2 + 5 H3 verified)
- [x] `02-abm-token.md` all pre-edit H2/H3 anchors present post-edit (9 H2 + 4 H3 verified)
- [x] `git diff` against pre-edit SHAs shows ONLY additions in heading regions (no renames detected)

## AB-05 Satisfaction (3 Canonical C14 Sites)

| Site | File | Status | C14 Token Check |
|------|------|--------|-----------------|
| Site #1 | `docs/cross-platform/apple-business/00-overview.md` | Complete (Plan 62-03) | Pre-existing |
| Site #2 | `docs/admin-setup-macos/01-abm-configuration.md` | **Complete (this plan)** | All 3 tokens in lines 1-50 |
| Site #3 | `docs/admin-setup-ios/02-abm-token.md` | **Complete (this plan)** | All 3 tokens in lines 1-50 |

C14 token verification (`Apple Business Manager`, `Apple Business`, `2026-04-14`) in first 50 lines: PASS for both sites.

## AB-06 Satisfaction (4 Banner Lines + 1 See-Also)

| File | Banner Line | See-Also | Insertion Line |
|------|-------------|----------|----------------|
| `docs/_glossary.md` | Inserted after Framework-coverage blockquote (line 11) | N/A | After line 11 |
| `docs/_glossary-macos.md` | Inserted after Platform-coverage blockquote (line 10) | Inserted after ABM entry existing see-also (line 67 area) | After line 10 |
| `docs/_glossary-android.md` | Appended to Platform-coverage blockquote | N/A | Appended to blockquote |
| `docs/_glossary-linux.md` | Inserted after Platform-coverage blockquote (line 10) | N/A | After line 10 |

Banner line text (identical in all 4 glossaries):
```
> **Apple Business governance:** For Apple Business delegated permission terminology (Organizational Units, custom roles, Managed Apple Account, content tokens), see the [Apple Business Governance Glossary](_glossary-apple-business.md).
```

Inline see-also at `_glossary-macos.md` ABM entry:
```
> See also: [Apple Business](_glossary-apple-business.md#apple-business) (renamed 2026-04-14; ABM Token → content token rebrand mapping).
```

Note: Anchor used is `#apple-business` (per critical invariant in plan — D-04 clean slug), NOT `#abm` which appeared in CONTEXT.md line 159 as a drafting typo.

## Frontmatter Updates

| File | `last_verified` | `review_by` |
|------|-----------------|-------------|
| `01-abm-configuration.md` | 2026-05-21 (was 2026-04-14) | 2026-07-20 (was 2026-07-13) |
| `02-abm-token.md` | 2026-05-21 (was 2026-04-18) | 2026-07-20 (was 2026-07-17) |

## Threat Model — T-62-C Assessment

All cross-links in the rebrand callouts use repo-relative paths (`../_glossary-apple-business.md`), NOT external Apple URLs. T-62-C residual risk is LOW. No external URL citations added in this plan; external Apple URLs reside in `_glossary-apple-business.md` which is managed by Plan 62-02 + tracked in `c13_rotting_external` sidecar (Plan 62-08).

## c16_missing_endpoint_exemptions Note

No `c16_missing_endpoint_exemptions` are needed for the 6 edited files:
- `_glossary.md`, `_glossary-macos.md`, `_glossary-android.md`, `_glossary-linux.md`: All exist; all cross-links resolve internally within repo.
- `01-abm-configuration.md`, `02-abm-token.md`: All exist; cross-link to `../_glossary-apple-business.md` resolves to `docs/_glossary-apple-business.md` which was created by Plan 62-02.

## Deviations from Plan

None — plan executed exactly as written.

Exception: CONTEXT.md line 159 contained `#abm` anchor (drafting typo) for the inline see-also link. The plan's critical invariants section explicitly overrode this with `#apple-business` (per D-04 clean slug decision). Used `#apple-business` as mandated by the plan's `<critical_invariants>` section.

## Known Stubs

None — all cross-links resolve to real files. The `_glossary-apple-business.md` target was created by Plan 62-02. All banner lines and callouts link to existing repo files.

## Self-Check

Verified files exist and commits recorded:
- `.planning/phases/62-apple-business-foundation-rebrand/62-ANCHOR-INVENTORY.md` — FOUND (commit ba7d28b)
- `docs/_glossary.md` banner — FOUND (commit fc38b8a, grep confirms 1 reference)
- `docs/_glossary-macos.md` banner + see-also — FOUND (commit fc38b8a, grep confirms 2 references)
- `docs/_glossary-android.md` banner — FOUND (commit fc38b8a, grep confirms 1 reference)
- `docs/_glossary-linux.md` banner — FOUND (commit fc38b8a, grep confirms 1 reference)
- `docs/admin-setup-macos/01-abm-configuration.md` callout — FOUND (commit 0d08b0d, C14 PASS)
- `docs/admin-setup-ios/02-abm-token.md` callout — FOUND (commit 0d08b0d, C14 PASS)
- 5/5 anchor-inventory checkboxes green — FOUND (commit df5ccfb)

## Self-Check: PASSED
