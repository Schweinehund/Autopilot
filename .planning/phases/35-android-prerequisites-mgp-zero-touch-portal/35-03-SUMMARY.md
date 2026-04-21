---
phase: 35
plan: 03
subsystem: android-enterprise-documentation
tags: [android, mgp, managed-google-play, admin-setup, entra, phase-35, AEPREQ-03]
dependency-graph:
  requires:
    - phase-34-complete
    - docs/_templates/admin-template-android.md
    - docs/admin-setup-ios/01-apns-certificate.md
    - docs/admin-setup-macos/01-abm-configuration.md
    - docs/_glossary-android.md
    - docs/android-lifecycle/00-enrollment-overview.md
    - docs/android-lifecycle/02-provisioning-methods.md
    - docs/android-lifecycle/03-android-version-matrix.md
    - docs/android-lifecycle/01-android-prerequisites.md
  provides:
    - docs/admin-setup-android/01-managed-google-play.md
    - "anchor: #prerequisites"
    - "anchor: #account-types"
    - "anchor: #bind-mgp"
    - "anchor: #what-breaks"
    - "anchor: #disconnect-consequences"
    - "anchor: #renewal-maintenance"
  affects:
    - docs/admin-setup-android/ (new directory created)
tech-stack:
  added: []
  patterns:
    - admin-template-android.md skeleton applied
    - HTML-comment subtractive-deletion pattern (Phase 34 D-17) — ZT portal H4 removed
    - hybrid what-breaks table (4 columns x 5 severity-descending rows, Downstream impact column)
    - dual-placement account-types (subsection + inline blockquote per D-13)
    - dual-placement disconnect-consequences (dedicated section + inline What Breaks row per D-16)
    - text-only deferred-content stub (D-14 v1.4.1 pre-Aug-2024 migration reference)
    - explicit anchor tag `<a id="bind-mgp"></a>` for anchor contract stability (D-17)
    - 60-day review cycle frontmatter
key-files:
  created:
    - docs/admin-setup-android/01-managed-google-play.md
  modified: []
decisions:
  - D-12 applied: hybrid what-breaks table — 4 columns (Failure mode / What happens / Downstream impact / Recovery); 5 rows severity-descending
  - D-13 applied: Account Types 3-row subsection + inline Entra reminder blockquote at Step 3 (dual placement)
  - D-14 applied: pre-Aug-2024 consumer Gmail migration — text-only "See also" stub (not hyperlink)
  - D-15 applied: every portal-step reference uses https://endpoint.microsoft.com; intune.microsoft.com named only as wrong-URL failure mode
  - D-16 applied: disconnect-consequences dedicated section + inline reference in What Breaks "Binding disconnected" row
  - D-17 applied: six reserved anchors (5 via H2 auto-slug + #bind-mgp via explicit `<a id>` tag)
  - D-18 applied: frontmatter applies_to GMS-modes, 60-day review cycle
  - Phase 34 D-17 subtractive-deletion pattern applied: `#### In Zero-Touch portal` H4 deleted with HTML comment explaining deletion
  - D-28 / RESEARCH resolution applied: no 90-day enrollment-token claim; documented "up to ~65 years" for GMS tokens
metrics:
  duration: 6m
  completed: 2026-04-21
  tasks_completed: 1
  tasks_total: 1
  files_created: 1
  files_modified: 0
  body_word_count: 1196
  total_word_count: 1237
---

# Phase 35 Plan 03: Managed Google Play Binding Admin Guide Summary

Authored `docs/admin-setup-android/01-managed-google-play.md` — 1196-word (body) admin guide for Managed Google Play tenant binding using the Entra-preferred path (since August 2024), starting from `endpoint.microsoft.com`, with a hybrid what-breaks table covering disconnect consequences, satisfying AEPREQ-03 and Phase 35 Success Criterion 3.

## What Was Delivered

### New file: `docs/admin-setup-android/01-managed-google-play.md`

Admin guide with the exact structure specified by the plan:

- **Frontmatter**: `last_verified: 2026-04-21`, `review_by: 2026-06-20` (60-day delta), `platform: Android`, `audience: admin`, `applies_to: GMS-modes`
- **Platform gate blockquote** naming GMS modes covered (COBO / BYOD WP / Dedicated / ZTE) and scoping out AOSP; cross-links to iOS and macOS admin setup and the Android provisioning glossary
- **Two-paragraph intro** — MGP binding is the hard prerequisite for all GMS modes; binding is effectively one-way; points forward to Disconnect Consequences
- **`## Prerequisites`** — 4-item checklist (Intune Plan 1 + admin role, Entra account with corporate email, 2+ owners recommended, browser security-zone alignment)
- **`## Account Types`** (D-13) — 3-row comparison table (Entra preferred / consumer Gmail legacy / Google Workspace NO) + text-only v1.4.1 migration stub
- **`## Steps`** — 4 numbered steps with `#### In Intune admin center` and `#### In Managed Google Play` H4 sub-sections; `#### In Zero-Touch portal` H4 deleted via HTML-comment subtractive-deletion pattern
  - Step 1: Navigate to Android enrollment prerequisites (in Intune admin center) with wrong-URL what-breaks callout
  - Step 2: Accept data-sharing and launch Google
  - Step 3: Confirm Entra account and grant Intune permission — includes D-13 inline Entra-reminder blockquote
  - Step 4: Verify four auto-provisioned apps (Intune, Authenticator, Company Portal, Managed Home Screen)
- **`<a id="bind-mgp"></a>`** explicit anchor tag for the `#bind-mgp` contract anchor
- **`## Verification`** — 3-item post-binding checklist
- **`## What Breaks`** (D-12) — hybrid 4-column × 5-row table, severity-descending:
  1. Binding disconnected (CRITICAL — all GMS modes broken)
  2. App assignment lost post-binding change
  3. Google Workspace / G-Suite account used
  4. Consumer Gmail (new binding post-Aug-2024)
  5. Wrong portal URL (`intune.microsoft.com`)
- **`## Disconnect Consequences`** (D-16) — 5-step retire-first sequence + blast-radius paragraph
- **`## Renewal / Maintenance`** — 2-row table (MGP binding / enrollment profile tokens); no 90-day claim; "up to ~65 years" for GMS tokens per D-28 / RESEARCH resolution
- **`## See Also`** — 7 links (02-zero-touch-portal.md, 00-overview.md, android-lifecycle × 4, glossary with `#managed-google-play` anchor)
- **Changelog** table with initial-version entry dated 2026-04-21

## Decisions Applied (D-12 through D-18 + Phase 34 D-17)

| Decision | How Applied | Evidence |
|----------|-------------|----------|
| D-12 hybrid what-breaks | 4-column table (Failure mode / What happens / Downstream impact / Recovery) with 5 severity-descending rows | `grep -c "Downstream impact"` = 1; all 5 required rows present |
| D-13 Account Types dual placement | `## Account Types` H2 subsection with 3-row comparison table + inline `> **Account type check:**` blockquote at Step 3 | `grep -cE '^## Account Types'` = 1; blockquote containing both "Entra" and "August 2024" present |
| D-14 pre-Aug-2024 text-only stub | Line under Account Types table: "See also: Binding migration for pre-August-2024 consumer Google/Gmail bindings — tracked for v1.4.1..." — not a hyperlink | `grep -c "v1\.4\.1"` = 2; no hyperlink target |
| D-15 portal URL specificity | Every portal-step reference uses `https://endpoint.microsoft.com`; `intune.microsoft.com` named only in the wrong-URL failure-mode row | `grep -c "endpoint\.microsoft\.com"` = 2; wrong-URL row in What Breaks |
| D-16 disconnect dual placement | `## Disconnect Consequences` dedicated section + "Binding disconnected" row in What Breaks with CRITICAL label and inline reference to the dedicated section | `grep -c "^## Disconnect Consequences"` = 1; What Breaks row present |
| D-17 reserved anchors | 5 via H2 auto-slug (#prerequisites, #account-types, #what-breaks, #disconnect-consequences, #renewal-maintenance) + `<a id="bind-mgp"></a>` explicit tag | All 6 headings/tags present |
| D-18 frontmatter | `applies_to: GMS-modes`; 60-day review-by delta (2026-04-21 → 2026-06-20) | `grep -c "^applies_to: GMS-modes$"` = 1 |
| Phase 34 D-17 subtractive deletion | `#### In Zero-Touch portal` H4 absent; HTML comment explains the deletion | `grep -c "^#### In Zero-Touch portal"` = 0; `grep -c "ZT portal H4 intentionally deleted"` = 1 |
| D-28 / RESEARCH no-90-day | Renewal/Maintenance documents "Configurable 1–65,535 days (GMS tokens can be set up to ~65 years)"; no 90-day claim anywhere | `grep -c "90-day"` = 0 |

## Acceptance Criteria Results

All 35-03-XX and applicable 35-all-XX checks pass:

| Criterion | Target | Actual | Status |
|-----------|--------|--------|--------|
| 35-03-01 Downstream impact | ≥ 1 | 1 | PASS |
| 35-03-02 Wrong portal URL / intune.microsoft.com | ≥ 1 | 2 | PASS |
| 35-03-03 Google Workspace / G-Suite | ≥ 1 | 4 | PASS |
| 35-03-04 Binding disconnected / disconnect | ≥ 1 | 7 | PASS |
| 35-03-05 Account Types subsection (## or ###) | ≥ 1 | 1 | PASS |
| 35-03-06 Blockquote with both "Entra" and "August 2024" | ≥ 1 | 1 | PASS |
| 35-03-07 v1.4.1 / binding migration stub | ≥ 1 | 2 | PASS |
| 35-03-08 endpoint.microsoft.com | ≥ 1 | 2 | PASS |
| 35-03-09 disconnect-consequences / ## Disconnect | ≥ 1 | 3 | PASS |
| 35-all-01 supervision / supervised | = 0 | 0 | PASS |
| 35-all-02 `platform: Android` frontmatter | = 1 | 1 | PASS |
| 35-all-03 last_verified + review_by, 60-day delta | 60 days | 60 days exactly (2026-04-21 → 2026-06-20) | PASS |
| 35-all-05 SafetyNet | = 0 | 0 | PASS |
| 35-all-06 Deferred-file links (common-issues / quick-ref-l1 / quick-ref-l2) | = 0 | 0 | PASS |
| 35-all-07 Anchor integrity (6 reserved anchors resolve) | 6 of 6 | 6 of 6 | PASS |
| 35-all-08 Cross-reference integrity | All existing files resolve | 7 targets exist (iOS/macOS overviews, glossary, 4 Android lifecycle files); 2 Wave 2 siblings pending (00-overview.md, 02-zero-touch-portal.md) — permitted dangling per Wave 1 precedent | PASS |
| ZT portal H4 absent | = 0 | 0 | PASS |
| HTML-comment deletion explanation | ≥ 1 | 1 | PASS |
| `applies_to: GMS-modes` | = 1 | 1 | PASS |
| No 90-day GMS-token claim | = 0 | 0 | PASS |
| Body word count 800–1200 | range | 1196 | PASS |
| Plan automated `<verify>` | VERIFY_OK | VERIFY_OK | PASS |

## Research-Flag Verification at Execute Time (per D-25 / D-27)

Plan required four re-verifications at execute time:

| Flag | Finding | Action |
|------|---------|--------|
| `endpoint.microsoft.com` is still current admin-center URL | Not live-verified (no authenticated browser access from executor); accepted the plan-phase HIGH-confidence finding (MS Learn `connect-managed-google-play`, 2026-04-16) | Used `endpoint.microsoft.com` throughout; wrong-URL row names `intune.microsoft.com` explicitly |
| Devices > Enrollment > Android > Prerequisites > Managed Google Play navigation path | Not live-verified; accepted plan-phase HIGH-confidence finding | Used the breadcrumb path verbatim in Step 1 |
| "August 2024" is still the correct Entra-preference date | Not live-verified; accepted plan-phase HIGH-confidence finding | Used "August 2024" in Account Types table, inline Step 3 blockquote, and What Breaks row for consumer Gmail |
| Four auto-provisioned app package IDs are current | Not live-verified; package IDs cross-checked internally against plan-phase research (MS Learn `connect-managed-google-play`) | Documented all four: `com.microsoft.intune`, `com.azure.authenticator`, `com.microsoft.windowsintune.companyportal`, `com.microsoft.launcher.enterprise` |

None of the four assertions could be live-verified from the executor environment (portal is authenticated-only; MS Learn date verification would require live web access which is out of scope for this executor). All four were accepted from the plan-phase HIGH-confidence research, with the `last_verified: 2026-04-21` frontmatter date serving as the executor's commitment point — if any of these assertions drift, the 60-day `review_by` date (2026-06-20) is the contract-level re-verification trigger.

## Downstream Anchor Contract (Confirmed)

Six reserved anchors are now live and available for Phase 36–42 cross-reference:

| Anchor | H2 Heading / Tag | File |
|--------|------------------|------|
| `#prerequisites` | `## Prerequisites` | `docs/admin-setup-android/01-managed-google-play.md` |
| `#account-types` | `## Account Types` | `docs/admin-setup-android/01-managed-google-play.md` |
| `#bind-mgp` | `<a id="bind-mgp"></a>` explicit tag | `docs/admin-setup-android/01-managed-google-play.md` |
| `#what-breaks` | `## What Breaks` | `docs/admin-setup-android/01-managed-google-play.md` |
| `#disconnect-consequences` | `## Disconnect Consequences` | `docs/admin-setup-android/01-managed-google-play.md` |
| `#renewal-maintenance` | `## Renewal / Maintenance` | `docs/admin-setup-android/01-managed-google-play.md` |

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Corrected glossary anchor from `#mgp` to `#managed-google-play`**

- **Found during:** Task 1 See Also authoring
- **Issue:** The plan's `<interfaces>` block and Phase 34 CONTEXT referenced glossary anchor `#mgp`, but the Phase 34 `_glossary-android.md` uses the full-name auto-slug `#managed-google-play` (confirmed via `grep -nE "^###" docs/_glossary-android.md`). Linking to `#mgp` would leave a dangling anchor.
- **Fix:** Used the verified Phase 34 anchor `../_glossary-android.md#managed-google-play` in the See Also section. This matches the precedent established by Wave 1's Plan 01 SUMMARY, which documented the same correction.
- **Files modified:** `docs/admin-setup-android/01-managed-google-play.md` (new file — corrected anchor used from the start)
- **Commit:** `e7c3eea`

**2. [Rule 1 - Bug] Trimmed body to 1196 words to satisfy the 800–1200 word-count acceptance criterion**

- **Found during:** Post-draft word-count check
- **Issue:** Initial draft came in at 1359 body words, exceeding the 1200-word upper bound in the acceptance criteria and the plan's "Length target 800–1200 words" directive. Per Rule 1 (correctness), exceeding the bound would have failed acceptance.
- **Fix:** Tightened prose in the intro (two paragraphs compressed), the Prerequisites bullets, the Step 2 data-sharing description, the Step 3 Account-type blockquote, the Step 4 app descriptions, the What-Breaks Wrong-portal-URL row, and the Disconnect-Consequences closing paragraph. All required grep terms, table rows, and decision-traceability checks preserved.
- **Files modified:** `docs/admin-setup-android/01-managed-google-play.md`
- **Commit:** `e7c3eea` (single-task commit captures all trims)

### Authentication Gates

None.

### Blockers

None.

## Known Stubs

None. Forward-references to Wave 2 sibling files (`02-zero-touch-portal.md`, `00-overview.md`) are expected to be dangling at Wave 2 execute time because those files are authored in parallel by other Wave 2 executors (plans 35-04 and 35-02). The Wave 2 orchestrator merges these outputs; all intra-phase links resolve once the wave completes.

## Threat Flags

No new security-relevant surface. This is a documentation-only deliverable.

## Tensions with Plan Spec

**Minor tension 1 — PATTERNS.md missing at execute time.** The plan's `<read_first>` referenced `.planning/phases/35-android-prerequisites-mgp-zero-touch-portal/35-PATTERNS.md`, but that file does not exist in the worktree (only 35-CONTEXT.md, 35-RESEARCH.md, 35-VALIDATION.md, and 35-DISCUSSION-LOG.md exist). The plan's `<action>` block contains the full body content verbatim plus the PATTERNS-equivalent decision excerpts inline, so PATTERNS.md was effectively duplicated into the plan. Resolution: used the plan's `<action>` block as the authoritative source; no information lost.

**Minor tension 2 — plan's acceptance-criteria phrasing vs the plan's automated verify.** The plan lists "Word count in body (excluding frontmatter and changelog) is between 800 and 1200 words" as an acceptance criterion. The plan's `<verify>` automated command does not include a word-count check — it was a separately-stated criterion. The executor measured body word count via `awk`-delimited extraction (excluding frontmatter between `---` markers and excluding everything from `## Changelog` onward). Body word count = 1196, within range.

## Executor Assumptions

- **`last_verified: 2026-04-21`** — used today's UTC date; the plan's YYYY-MM-DD placeholder was filled with execute time.
- **`review_by: 2026-06-20`** — exactly 60 days after `last_verified` per D-18 Phase 35 / Phase 34 D-20 60-day-cycle convention.
- **Glossary anchor**: corrected to `#managed-google-play` (see Deviations above); this is the pattern Wave 1 established.
- **Dangling Wave 2 sibling links**: `02-zero-touch-portal.md` and `00-overview.md` are referenced in See Also and intro body but do not exist at Wave 2 execute time. These are permitted dangling per the Wave 2 parallel-execution model — they will resolve once all Wave 2 executors complete.
- **App descriptions**: used the plan's four auto-provisioned apps with their MS-Learn-sourced package IDs; the COPE / dedicated / MAM / kiosk usage notes are summary-level and derived from the plan's `<interfaces>` block.

## Commits

- `e7c3eea` feat(35-03): author 01-managed-google-play.md MGP binding admin guide

## Self-Check: PASSED

Verification confirmed:

- FOUND: `docs/admin-setup-android/01-managed-google-play.md` (1196 body words; 6 reserved anchors present)
- FOUND: commit `e7c3eea` in `git log`
- PASSED: plan `<verify>` automated command output `VERIFY_OK`
- PASSED: all 9 per-task 35-03-XX grep checks
- PASSED: all applicable 35-all-XX gate checks (35-all-01, 35-all-02, 35-all-03, 35-all-05, 35-all-06, 35-all-07, 35-all-08)
- PASSED: PITFALL 11 guard — no v1.0–v1.3 shared files modified; only new file added in `docs/admin-setup-android/`
- PASSED: AEAUDIT-04 guard — zero "supervision"/"supervised" occurrences
- PASSED: SafetyNet guard — zero occurrences
- PASSED: Phase 34 D-17 subtractive-deletion pattern — ZT portal H4 absent with HTML comment explaining deletion
- PASSED: D-28 / RESEARCH no-90-day guard — zero "90-day" occurrences; GMS tokens documented as "up to ~65 years"
