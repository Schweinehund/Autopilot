---
phase: 101-802-1x-foundation-glossary-eap-methods-cert-delivery
plan: "05"
subsystem: documentation
tags: [802.1x, glossary, see-also-banner, navigation, freshness]
dependency_graph:
  requires: [101-01]
  provides: [sc1-wiring-complete]
  affects: [docs/_glossary.md, docs/_glossary-macos.md, docs/_glossary-android.md, docs/_glossary-linux.md]
tech_stack:
  added: []
  patterns: [one-directional-see-also, blockquote-banner, navigation-last]
key_files:
  created: []
  modified:
    - docs/_glossary.md
    - docs/_glossary-macos.md
    - docs/_glossary-android.md
    - docs/_glossary-linux.md
decisions:
  - "D-10 enforced: banners are one-directional only (platform glossaries -> _glossary-network.md); no back-links added to network glossary"
  - "D-11 enforced: iOS/iPadOS see-also covered by _glossary-macos.md banner; _glossary-ios.md not created (does not exist)"
  - "v1.13-audit-allowlist.json byte-unchanged (frozen surface); Phase 112 must recompute +1 line offsets for _glossary-android.md"
metrics:
  duration: "~8 minutes"
  completed: "2026-06-29"
  tasks_completed: 2
  tasks_total: 2
  files_modified: 4
---

# Phase 101 Plan 05: See-Also Banner Insertions Summary

One-directional see-also banners pointing to `_glossary-network.md` inserted into all four existing platform glossaries, with freshness stamps bumped to 2026-06-29 / 2026-09-27.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Insert banner + bump freshness in _glossary.md, _glossary-macos.md, _glossary-linux.md (banner-before-H1 structure) | 1ae2654 | docs/_glossary.md, docs/_glossary-macos.md, docs/_glossary-linux.md |
| 2 | Insert banner + bump freshness in _glossary-android.md (banner-AFTER-H1 structure) + note allowlist shift | eae49f7 | docs/_glossary-android.md |

## What Was Built

All four existing platform glossaries now carry the following one-line banner appended to the end of their existing top blockquote:

```
> **802.1X / Network authentication:** For 802.1X protocol terminology (EAP methods, RADIUS, supplicant, SCEP, PKCS, trusted root, server-name validation), see the [Network Authentication Glossary](_glossary-network.md).
```

### Per-file insert structure

- `_glossary.md` — banner appended as last line of pre-H1 blockquote (was line 12, now line 13); `last_verified` 2026-06-24 -> 2026-06-29, `review_by` 2026-09-24 -> 2026-09-27
- `_glossary-macos.md` — banner appended as last line of pre-H1 blockquote (was line 11); this single banner covers both macOS and iOS/iPadOS per D-11; `last_verified` 2026-06-28 -> 2026-06-29, `review_by` 2026-09-28 -> 2026-09-27
- `_glossary-linux.md` — banner appended as last line of pre-H1 blockquote (was line 11); `last_verified` 2026-05-05 -> 2026-06-29, `review_by` 2026-07-04 -> 2026-09-27
- `_glossary-android.md` — banner appended as last line of post-H1 blockquote (unique structure: H1 precedes blockquote); banner inserted after old line 13, now at line 14; `phase_46_wave2_retrofit: 2026-04-25` custom field preserved; `last_verified` 2026-05-05 -> 2026-06-29, `review_by` 2026-07-04 -> 2026-09-27

## Allowlist Line Shift Notice for Phase 112

The banner insertion in `docs/_glossary-android.md` adds exactly 1 line before the old line 14. All v1.13-audit-allowlist.json tracked line numbers for `_glossary-android.md` that are at or above the insertion point shift by +1:

| Allowlist key | Old lines | New lines (post-insert) |
|---|---|---|
| `safetynet_exemptions` | 186, 201 | 187, 202 |
| `supervision_exemptions` | 17, 50, 70, 80, 82, 83, 182, 196, 198, 199 | 18, 51, 71, 81, 83, 84, 183, 197, 199, 200 |
| `c7_knox_allowlist` | 122, 124, 126, 198 | 123, 125, 127, 199 |
| `c9_exemptions` | 203 | 204 |

`v1.13-audit-allowlist.json` is byte-unchanged (frozen surface). Phase 112 creates `v1.14-audit-allowlist.json` with the corrected offsets shown above.

## Decisions Made

1. D-10 enforced: no back-links from `_glossary-network.md` into platform glossaries; Phase 109 handles cross-glossary nav wiring.
2. D-11 enforced: iOS/iPadOS coverage satisfied by single banner in `_glossary-macos.md` (which self-scopes "macOS and iOS/iPadOS"); `_glossary-ios.md` does not exist and was not created.
3. `_glossary-apple-business.md` received no banner (governance glossary, not a platform provisioning glossary — confirmed in scope exclusions).
4. Freshness stamps updated only for `last_verified` and `review_by`; all other front-matter unchanged.

## Deviations from Plan

None — plan executed exactly as written.

## Known Stubs

None — no stub patterns introduced. All four banners link to `_glossary-network.md` which was created in Plan 101-01.

## Threat Flags

None — static Markdown only; no new network endpoints, auth paths, or executable surfaces.

## Self-Check: PASSED

- `docs/_glossary.md` contains `802.1X / Network authentication` banner: FOUND
- `docs/_glossary-macos.md` contains banner, `last_verified: 2026-06-29`: FOUND
- `docs/_glossary-android.md` contains banner, `phase_46_wave2_retrofit`: FOUND
- `docs/_glossary-linux.md` contains banner, `last_verified: 2026-06-29`: FOUND
- `docs/_glossary-ios.md` does not exist: CONFIRMED
- `scripts/validation/v1.13-audit-allowlist.json` byte-unchanged: CONFIRMED
- Commit 1ae2654 exists (Task 1): CONFIRMED
- Commit eae49f7 exists (Task 2): CONFIRMED
