---
phase: 34-android-foundation
plan: 01
subsystem: documentation
tags: [android, glossary, terminology, disambiguation, cross-platform, phase-34-foundation, markdown]

# Dependency graph
requires:
  - phase: none (Phase 34 is the foundation)
    provides: n/a — this plan creates the canonical terminology surface consumed by Phases 35-42
provides:
  - docs/_glossary-android.md (19 term definitions: 13 disambiguation + 6 Android-native)
  - 19 canonical anchors for Phase 35-42 cross-references (#cobo, #cope, #wpco, #byod, #fully-managed, #work-profile, #dedicated, #supervision, #user-enrollment, #corporate-identifiers, #managed-google-play, #zero-touch-enrollment, #play-integrity, #afw-setup via explicit anchor tag, #dpc, #amapi, #managed-home-screen, #entra-shared-device-mode, #emm)
  - Locked "Google recommends WPCO" phrasing (Pitfall 4 content gate honored)
  - Version history anchors for COPE→WPCO, AMAPI April 2025, SafetyNet→Play Integrity, MGP Entra binding, Phase 34 initial
affects:
  - 34-02 (enrollment overview cross-refs #fully-managed, #work-profile, #byod, #dedicated, #zero-touch-enrollment anchors)
  - 34-03 (provisioning methods matrix cross-refs #afw-setup anchor)
  - 34-04 (version matrix cross-refs #corporate-identifiers, #byod, #managed-home-screen anchors for breakpoint details)
  - 34-05 (admin template glossary link target)
  - Phase 35-42 (all downstream Android docs link into this file for terminology)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Glossary structural mirror of docs/_glossary-macos.md (D-08)"
    - "Definition-first + cross-platform callout-after (D-10, Anti-Pattern 4 guard)"
    - "Callout-only stub pattern for absent-concept terms (Supervision entry per D-11)"
    - "Explicit <a id=\"...\"></a> anchor tag for terms with non-kebab-case heading chars (afw#setup per Pitfall 7)"
    - "60-day review_by cycle for fast-moving Android platform (D-14, vs 90-day for macOS)"
    - "Version History table as last-content-on-page to record terminology drift (D-13)"

key-files:
  created:
    - docs/_glossary-android.md
  modified: []

key-decisions:
  - "Honored all 7 locked CONTEXT.md decisions: D-08 (mirror macOS glossary structure), D-09 (5 categories), D-10 (definition first + callout after), D-11 (13 disambiguation entries with Supervision as callout-only), D-12 (6 Android-native terms), D-13 (version history), D-14 (60-day review cycle)"
  - "Supervision entry is callout-only stub with no prose definition, preserving AEAUDIT-04 cleanliness"
  - "afw#setup uses explicit <a id=\"afw-setup\"></a> tag before the H3 heading to guarantee Phase 35-42 anchor stability (Pitfall 7 mitigation, per Assumption A2)"
  - "Zero uses of 'COPE deprecated'; 'Google recommends WPCO' phrasing used in COPE entry and Version History (Pitfall 4 content gate)"
  - "SafetyNet appears only as historical context inside Play Integrity entry and Version History row (not referenced as a current API)"

patterns-established:
  - "Android glossary entry pattern: H3 term heading -> 2-4 sentence Android-first definition -> > **Cross-platform note:** blockquote with per-platform disambiguation links"
  - "Callout-only disambiguation stub pattern: H3 heading followed immediately by > **Android note:** pointing to the correct Android analog (used for Supervision)"
  - "Anchor-stability-via-explicit-anchor-tag pattern: HTML <a id> tag immediately before a heading with non-safe characters"
  - "Reverse-chronological Version History table with 3 columns (Date | Change | Author) and em-dash in Author column (git-blame is the authoritative attribution surface)"

requirements-completed: [AEBASE-01]

# Metrics
duration: ~5min
completed: 2026-04-21
---

# Phase 34 Plan 01: Android Enterprise Glossary Summary

**Created `docs/_glossary-android.md` with 19 disambiguated term entries (13 terminology-collision disambiguation + 6 Android-native), definition-first + cross-platform callout pattern, Supervision-as-callout-only stub, explicit anchor tag for afw#setup, and 5-row reverse-chronological Version History table — providing the canonical terminology surface that Phase 35-42 Android docs link into.**

## Performance

- **Duration:** ~5 minutes (three atomic task commits)
- **Started:** 2026-04-21T16:09:45-05:00 (Task 1 scaffold commit timestamp)
- **Completed:** 2026-04-21T16:14:08-05:00 (Task 3 Version History commit timestamp)
- **Tasks:** 3/3 (Scaffold, Populate Terms, Version History)
- **Files modified:** 1 (created new: `docs/_glossary-android.md`)

## Accomplishments

- Created `docs/_glossary-android.md` — the canonical disambiguation glossary for all 13 Android terms that collide with existing Windows/macOS/iOS glossaries (AEBASE-01), plus 6 Android-native terms that downstream phases cross-reference.
- Published 19 stable anchors (Pitfall 7 mitigation) that Phase 35-42 admin guides, L1/L2 runbooks, and milestone-audit scripts will link to; `#afw-setup` uses an explicit `<a id>` tag to survive GitHub's kebab-case auto-anchor generation.
- Supervision entry is a callout-only stub redirecting to Fully Managed — protects against iOS mental-model leak into Android docs (AEAUDIT-04 guard).
- Locked "Google recommends WPCO" phrasing in COPE entry and Version History row; zero uses of "COPE deprecated" in the file (Pitfall 4 content gate honored).
- Version History table records 5 drift anchors: Phase 34 initial (2026-04-21), AMAPI migration (2025-04), SafetyNet→Play Integrity (2025-01), MGP Entra-preferred binding (2024-08), COPE→WPCO terminology drift (2023+).
- Frontmatter uses `platform: all` (not `Android`) — glossary is cross-linked from Windows/iOS/macOS docs, so the 3-platform scope matches PATTERNS.md guidance.

## Task Commits

Each task was committed atomically:

1. **Task 1: Scaffold glossary file with frontmatter, platform coverage blockquote, alphabetical index, and 5 category H2 sections** — `9a138ef` (feat)
2. **Task 2: Populate 19 term entries (13 disambiguation + 6 Android-native) with definition-first + cross-platform callout pattern** — `c912540` (feat)
3. **Task 3: Populate Version History section with 5 reverse-chronological drift anchors** — `7f64fc1` (feat)

_Note: No TDD cycle — documentation phase; verification is grep-based mechanical checks (per 34-VALIDATION.md)._

## Files Created/Modified

### Created

- `docs/_glossary-android.md` (152 lines, ~22 KB) — Android Enterprise Provisioning Glossary. Frontmatter (`platform: all`, `applies_to: both`, `audience: all`, `last_verified: 2026-04-21`, `review_by: 2026-06-20` = 60-day cycle). H1 title. Platform coverage blockquote linking to `_glossary.md` (Windows) and `_glossary-macos.md` (Apple). Alphabetical index with 19 pipe-delimited links. Five category H2s in the D-09 order: Enrollment, Ownership & Management Scope, Provisioning Methods, Portals & Binding, Compliance & Attestation. 19 H3 term entries distributed across categories per plan-locked assignments. Each disambiguation entry has a `> **Cross-platform note:**` blockquote after the Android-first definition. Supervision entry is callout-only (no prose definition) with `> **Android note:**` redirecting to `#fully-managed`. `afw#setup` entry has explicit `<a id="afw-setup"></a>` anchor tag immediately preceding the heading. Version History table with 5 reverse-chronological drift anchors is the last content on the page.

## Decisions Made

All 7 locked CONTEXT.md decisions were honored exactly as specified (D-08 through D-14; D-15 is Phase 42 scope and was NOT touched). No implementation-level decisions required beyond author-discretion choices already permitted by the plan:

- Category ordering preserved: Enrollment → Ownership & Management Scope → Provisioning Methods → Portals & Binding → Compliance & Attestation (matches plan's D-09 order).
- Within-category ordering: alphabetical by term name (mirrors `_glossary-macos.md` convention).
- Cross-platform note coverage extended to include 5 of the 6 Android-native entries (only Managed Home Screen + Entra Shared Device Mode + EMM + AMAPI + Play Integrity have explicit cross-platform notes; Zero-Touch Enrollment has one because it is a collision with ADE/Autopilot). This is plan-permitted ("may optionally include a callout if useful"); the total cross-platform-note count is 18, exceeding the 13-minimum acceptance criterion.

## Deviations from Plan

None — plan executed exactly as written. All content gates, anchor requirements, and structural decisions were met on first authoring pass. No Rule 1/2/3 auto-fixes needed.

## Authentication Gates

None required for this plan.

## Anchors Published

**19 canonical anchors** (per Pitfall 7 / PATTERNS.md Shared Patterns → Anchor stability registry) — Phase 35-42 cross-references depend on these exact names:

Disambiguation (13):
`#cobo`, `#cope`, `#wpco`, `#byod`, `#fully-managed`, `#work-profile`, `#dedicated`, `#supervision`, `#user-enrollment`, `#corporate-identifiers`, `#managed-google-play`, `#afw-setup` (via explicit `<a id>` tag), `#dpc`

Android-native (6):
`#zero-touch-enrollment`, `#play-integrity`, `#amapi`, `#managed-home-screen`, `#entra-shared-device-mode`, `#emm`

## Threat Flags

None — Phase 34 documentation-only plan. No new runtime trust boundaries, no code, no sensitive-token surface introduced. Threat register T-34-01 (information disclosure) and T-34-02 (factual tampering) are mitigated per the plan:
- No real enrollment tokens, MGP binding tokens, ZT portal credentials, or QR-code images present anywhere in the file (T-34-01).
- "Google recommends WPCO" phrasing used exclusively; zero "COPE deprecated" occurrences; SafetyNet only appears as a January-2025-turned-off historical predecessor inside the Play Integrity entry and Version History (T-34-02).
- Explicit `<a id="afw-setup"></a>` tag prevents Phase 35-42 broken-link cascade (T-34-04).

## Verification Results

All automated acceptance criteria pass:

| Check | Expected | Actual | Status |
|-------|----------|--------|--------|
| `grep -c "^### " docs/_glossary-android.md` | ≥ 19 | 19 | PASS |
| `grep -c "> \*\*Cross-platform note:" docs/_glossary-android.md` | ≥ 13 | 18 | PASS |
| `grep -c "^## " docs/_glossary-android.md` | ≥ 7 | 7 | PASS |
| `grep -c "^## Alphabetical Index$"` | 1 | 1 | PASS |
| `grep -c "^## Version History$"` | 1 | 1 | PASS |
| `grep -ci "COPE deprecated"` | 0 | 0 | PASS |
| `grep -c "recommends WPCO"` | ≥ 1 | 1 | PASS |
| `grep -c '<a id="afw-setup"></a>'` | 1 | 1 | PASS |
| `grep -c "^### Supervision$"` | 1 | 1 | PASS |
| `grep "^platform: all$"` | match | match | PASS |
| `grep "^review_by: 2026-06-20$"` | match | match | PASS |
| `tail -40` contains `## Version History` | yes | yes | PASS |
| `grep -lE "common-issues\.md\|quick-ref-l1\.md\|quick-ref-l2\.md"` on target file | empty | empty | PASS |
| `git diff --name-only master HEAD -- <v1.0-v1.3 shared files>` | empty | empty | PASS |
| `review_by - last_verified` | ≤ 60 days | 60 days exactly | PASS |

Manual-only AEAUDIT-04 check: every `grep -i "supervis"` match falls within one of the three allowed contexts (Supervision H3 entry body, Fully Managed cross-platform note's iOS supervision analog, or cross-reference links to `_glossary-macos.md#supervision`). Confirmed by inspection.

## Known Stubs

None — the file is a complete deliverable. The Supervision entry is intentionally a callout-only stub per D-11 (disambiguation of an absent Android concept), not an unfinished entry.

## Deferred Issues

None.

## Self-Check: PASSED

**Files created verified:**
- `docs/_glossary-android.md` — FOUND (152 lines, 22329 bytes)

**Commits verified:**
- `9a138ef` scaffold — FOUND in `git log`
- `c912540` term entries — FOUND in `git log`
- `7f64fc1` version history — FOUND in `git log`

All claimed outputs exist. All claimed commits are in the repository history.
