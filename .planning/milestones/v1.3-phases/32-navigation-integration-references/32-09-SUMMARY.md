---
phase: 32
plan: "09"
subsystem: ios-l2-quick-ref + ios-l2-log-collection (gap-closure)
tags: [gap-closure, ios, sysdiagnose, assistivetouch, apple-support, uat-test-15, nav-02, wave-5]
requirements: [NAV-02]
gap_closure: true
dependency_graph:
  requires:
    - "32-07 (quick-ref-l2.md iOS Quick Reference section, including Sysdiagnose Trigger Reference table)"
    - "31-xx (l2-runbooks/14-ios-log-collection.md original Section 3 Mac+Cable Sysdiagnose)"
    - "32-08 (UAT Test 15 issue identification)"
  provides:
    - "Apple-canonical AssistiveTouch sysdiagnose procedure in both quick-ref-l2.md and 14-ios-log-collection.md"
    - "Apple Support URL citation (authoritative source) inline in both files"
    - "Renamed l2-runbook Section 3: 'Mac+Cable Sysdiagnose' → 'Sysdiagnose Trigger and File Export' with new anchor slug"
  affects:
    - "docs/quick-ref-l2.md (Sysdiagnose Trigger Reference block replaced; cross-link anchor updated)"
    - "docs/l2-runbooks/14-ios-log-collection.md (Section 3 fully rewritten + renamed)"
tech-stack:
  added: []
  patterns:
    - "Apple Support URL inline citation as authoritative-source replacement for prior research-flag footnote (D-32 superseded for sysdiagnose-only — other 2 tables retain D-32 markers)"
    - "Section rename with explicit anchor migration (slug `section-3-maccable-sysdiagnose` → `section-3-sysdiagnose-trigger-and-file-export`)"
    - "On-device share-button extraction promoted to PRIMARY; Mac+cable Console.app demoted to alternative for live-streaming and large-bundle retrieval"
key-files:
  created: []
  modified:
    - "docs/quick-ref-l2.md (235 → 241 lines, +6 net; sysdiagnose block content replaced + frontmatter bump + Version History row)"
    - "docs/l2-runbooks/14-ios-log-collection.md (181 → 184 lines, +3 net; Section 3 fully rewritten + renamed + frontmatter bump + Version History row)"
decisions:
  - "Adopted commit Option A (single atomic commit) per planner preference — all 3 tasks completed cleanly with zero correction cycles, so cleaner history wins."
  - "Task 3 produced a zero-byte change to quick-ref-l2.md: Task 1 wrote the new anchor (`#section-3-sysdiagnose-trigger-and-file-export`) directly into the replacement footnote, and Task 2 created the matching H2 heading with the predicted GitHub slug. Verification confirmed alignment; no corrective edit needed."
  - "Apple Support URL cited inline in BOTH files (quick-ref-l2.md footnote + 14-ios-log-collection.md authoritative-source bullet). Provides single canonical source per UAT.md root_cause."
  - "AssistiveTouch 5-step procedure transcribed verbatim from UAT.md root_cause field — no editorial paraphrase."
  - "Mac+cable Console.app subsection retained as 'Alternative' in 14-ios-log-collection.md Section 3 (not removed), preserving live-streaming workflow + Apple Configurator 2 fallback for large-bundle (>100 MB) retrieval. Demotion is framed as 'use in addition to (NOT instead of)' the AssistiveTouch primary path."
  - "Pre-existing broken cross-link in docs/ios-lifecycle/01-ade-lifecycle.md:364 (`#section-3-mac-cable-sysdiagnose`) is OUT OF SCOPE per D-38 additive-only posture — confirmed by full-docs link-check showing post-gap-closure broken count = 85 (matches Phase 32 baseline exactly; no NEW broken links introduced)."
  - "T-32-02 (stale sysdiagnose security guidance) RESOLVED — Apple Support canonical URL eliminates research-flag staleness risk for the sysdiagnose trigger procedure specifically. Other 2 tables in quick-ref-l2.md iOS section (Diagnostic Data Collection + Intune Portal Paths) retain Phase 30 D-32 / Phase 31 D-31 research-flag markers (their UI-path verification is not resolved by the Apple Support URL)."
metrics:
  duration_minutes: 12
  completed_date: "2026-04-18"
  tasks_executed: 3
  tasks_autonomous: 3
  tasks_deferred: 0
  files_created: 0
  files_modified: 2
  commits: 1
  autonomous_checks_pass: 16
  manual_checks_pending: 0
---

# Phase 32 Plan 09: UAT Test 15 Gap-Closure (AssistiveTouch Sysdiagnose) Summary

Resolved Phase 32 UAT Test 15 (severity: major) by replacing the per-device-type physical-button sysdiagnose procedure (volume + Side/Top combos) in both the L2 quick-reference card and the iOS L2 log-collection runbook with Apple's canonical AssistiveTouch > Analytics method, citing the authoritative Apple Support URL (`https://support.apple.com/guide/platform-support/use-diagnostics-to-research-device-issues-supd3f43814e/web`) inline in both files. Section 3 of `14-ios-log-collection.md` was renamed and the cross-link anchor in `quick-ref-l2.md` updated to match.

## UAT Test 15 → RESOLVED

**Apple Support URL cited verbatim:** `https://support.apple.com/guide/platform-support/use-diagnostics-to-research-device-issues-supd3f43814e/web`

The UAT Test 15 reported issue ("Replace physical button combos with AssistiveTouch-based sysdiagnose procedure per Apple Support canonical documentation") is fully addressed:

- ✅ Physical-button language fully removed from `docs/quick-ref-l2.md` iOS section (`grep -c 'volume button' docs/quick-ref-l2.md` = 0)
- ✅ AssistiveTouch 5-step procedure present verbatim in `docs/quick-ref-l2.md` iOS Sysdiagnose Trigger Reference block
- ✅ AssistiveTouch 5-step procedure present verbatim in `docs/l2-runbooks/14-ios-log-collection.md` Section 3
- ✅ Apple Support URL cited inline in BOTH files (1 occurrence each per `grep -c 'apple.com/guide/platform-support/use-diagnostics' [file]`)
- ✅ Supervised-device compatibility note present in BOTH files (1 occurrence each)
- ✅ Output-file location ("Settings > Privacy & Security > Analytics & Improvements > Analytics Data") preserved in both files

## What Was Built

### Task 1 — Replace sysdiagnose trigger table in quick-ref-l2.md

- **File modified:** `docs/quick-ref-l2.md` (235 → 241 lines, +6 net)
- **Block replaced:** Lines 210-219 (H3 + 4-row physical-button table + 1-line research-flag footnote, ~10 lines)
- **Replacement content:** ~16 lines = H3 (preserved) + 1-paragraph framing + 5-step AssistiveTouch numbered list + 1-line Supervised-device blockquote + new footnote citing Apple Support URL
- **Frontmatter bumped:** `last_verified: 2026-04-17` → `2026-04-18`; `review_by: 2026-07-16` → `2026-07-17`
- **Version History entry added** (top row): `2026-04-18 | Phase 32 gap closure (UAT Test 15): replaced iOS Sysdiagnose Trigger Reference physical-button table with AssistiveTouch-based procedure per Apple Support canonical URL; updated cross-link anchor to match renamed Section 3 in 14-ios-log-collection.md | -- |`
- **Untouched** (byte-identical pre/post): Windows / APv2 / macOS / Choose-Your-Platform sections; opening platform-coverage blockquote; iOS Diagnostic Data Collection table (line 192 — MAM-scoped vs on-device distinction from Plan 32-07 W2 fix); Key Intune Portal Paths table; iOS Investigation Runbooks list. The other 2 tables' Phase 30 D-32 / Phase 31 D-31 research-flag markers preserved (`grep -c 'Phase 30 D-32\|Phase 31 D-31'` = 2).

### Task 2 — Rewrite Section 3 in 14-ios-log-collection.md

- **File modified:** `docs/l2-runbooks/14-ios-log-collection.md` (181 → 184 lines, +3 net)
- **Block replaced:** Lines 104-156 (full Section 3, 53 lines)
- **Replacement content:** 56 lines including:
  - Section H2 RENAMED: `## Section 3: Mac+Cable Sysdiagnose` → `## Section 3: Sysdiagnose Trigger and File Export`
  - Authoritative-source bullet citing Apple Support URL
  - "Prerequisites (On-Device Trigger)" subsection — no Mac required for trigger; on-device only
  - "5-Step AssistiveTouch Sysdiagnose Procedure" subsection — verbatim 5-step list with iPad-silence callout in Step 3
  - Supervised-device compatibility blockquote
  - "Alternative: Mac+Cable Console.app Live Streaming" subsection — preserves live-streaming flow + cable-type reference inline + Apple Configurator 2 filesystem-level retrieval as fallback
  - PII warning blockquote (preserved at end of Section 3)
- **Frontmatter bumped:** `last_verified: 2026-04-17` → `2026-04-18`; `review_by: 2026-07-16` → `2026-07-17`
- **Version History entry added** (top row): `2026-04-18 | Phase 32 gap closure (UAT Test 15): rewrote Section 3 from "Mac+Cable Sysdiagnose" to AssistiveTouch-based on-device trigger + file export per Apple Support canonical URL; Mac+cable Console.app demoted to alternative for live-streaming and large-bundle retrieval; section renamed (new anchor: #section-3-sysdiagnose-trigger-and-file-export) | -- |`
- **Untouched** (byte-identical pre/post): Section 1 (1a + 1b sub-sections), Section 2, Tool Landscape, Decision Matrix, Common Artifacts Cross-Reference table, Related Resources, opening Platform-gate blockquote, Context section. Tier numbering preserved — Common Artifacts table's "Tier 3" / "Sysdiagnose `.tar.gz`" references still apply (AssistiveTouch is still the Tier 3 method).

### Task 3 — Anchor consistency verification gate (zero-byte corrective change)

Task 1 wrote the predicted GitHub slug (`#section-3-sysdiagnose-trigger-and-file-export`) directly into the new footnote during Step 2. Task 2 created the matching H2 heading. Verification confirmed alignment:

- Computed slug from Task 2 heading: `section-3-sysdiagnose-trigger-and-file-export` (matches Task 1's pre-written anchor)
- `grep -c "l2-runbooks/14-ios-log-collection.md#section-3-sysdiagnose-trigger-and-file-export" docs/quick-ref-l2.md` = 1 (anchor target found)

No corrective edit needed. Task 3 modified zero bytes — pure verification gate as planned.

## Before/After Diff Snapshots

### docs/quick-ref-l2.md — Sysdiagnose Trigger Reference block

**BEFORE (lines 210-219, removed):**
```markdown
### Sysdiagnose Trigger Reference (iOS/iPadOS)

| Device / OS | Trigger Combination |
|-------------|---------------------|
| **Modern iOS 15+** / iPadOS 15+ (unified trigger, all current devices) | Press and release both volume buttons + Side/Top button simultaneously (hold for ~250ms) |
| iPhone 8 / SE (1st+2nd gen) / iPad with Touch ID (Legacy / pre-iOS 15) | Both volume buttons + Sleep/Wake (Side) button |
| iPhone X and later iPhones (Legacy / pre-iOS 15) | Both volume buttons + Side button |
| iPad with Face ID (Legacy / pre-iOS 15) | Top button + either volume button |

*(Full procedure with Console.app extraction: [iOS Log Collection §Section 3](l2-runbooks/14-ios-log-collection.md#section-3-maccable-sysdiagnose). Modern unified trigger verified against Apple Developer forums 2026-04-17; legacy per-device-type triggers apply to pre-iOS-15 devices (increasingly rare in managed fleets). Verify triggers per Phase 31 D-30 research flag at execution time.)*
```

**AFTER (lines 210-228, added):**
```markdown
### Sysdiagnose Trigger Reference (iOS/iPadOS)

Per Apple's canonical platform support guide, sysdiagnose is triggered via **AssistiveTouch > Analytics** — a uniform procedure that works across all iPhone/iPad models and iOS/iPadOS versions. The legacy physical-button combos (volume + Side/Top) are no longer the Apple-recommended method.

**5-step AssistiveTouch sysdiagnose procedure (all current iPhones and iPads):**

1. **Enable AssistiveTouch:** Settings > Accessibility > Touch > AssistiveTouch > toggle ON.
2. **Add Analytics to the AssistiveTouch top-level menu:** Settings > Accessibility > Touch > AssistiveTouch > Customize Top Level Menu > tap an icon (or tap **+** to add a new slot) > select **Analytics**.
3. **Trigger sysdiagnose:** tap the on-screen AssistiveTouch button > **Analytics**. Device begins background sysdiagnose generation (~10 minutes; no haptic feedback on iPad).
4. **Locate output file:** Settings > Privacy & Security > Analytics & Improvements > Analytics Data. Scroll to the `sysdiagnose_` prefixed entry matching today's date/time.
5. **Export from device:** tap the sysdiagnose file > tap the share button (top-right) > send via AirDrop, Email, iCloud, Files.app, or any installed share extension.

> **Supervised-device compatibility:** AssistiveTouch-based trigger works on supervised devices. Unlike the legacy volume + Side-button combo, it does NOT conflict with the Side Button restriction profile (Allow Side Button = false). This is the recommended trigger for managed-fleet troubleshooting.

*(Full procedure with Mac+cable alternative: [iOS Log Collection §Section 3](l2-runbooks/14-ios-log-collection.md#section-3-sysdiagnose-trigger-and-file-export). Authoritative source: Apple Support — [Use Diagnostics to research device issues](https://support.apple.com/guide/platform-support/use-diagnostics-to-research-device-issues-supd3f43814e/web). Verified 2026-04-18 per UAT Test 15 resolution; replaces prior Phase 31 D-30 physical-button research-flag marker.)*
```

### docs/l2-runbooks/14-ios-log-collection.md — Section 3

**BEFORE (lines 104-156, removed):** `## Section 3: Mac+Cable Sysdiagnose` H2 + Prerequisites + "Trigger on Device (Unified Modern iOS)" subsection (physical button hold 1–1.5 sec) + 2 Warning blockquotes (Emergency SOS + iPad silence) + "Per-Device Trigger Reference (iOS 15+)" 4-row table (iPhone 8/SE, iPhone X+, iPad Touch ID, iPad Face ID) + "Artifact Location and Retrieval" + "Console.app Live Streaming" subsection + "Cable Type by Device" + PII warning.

**AFTER (lines 104-159, added):** `## Section 3: Sysdiagnose Trigger and File Export` H2 (RENAMED) + intro paragraph framing AssistiveTouch as Apple-canonical + "Authoritative source" bullet citing Apple Support URL + "Prerequisites (On-Device Trigger)" + "5-Step AssistiveTouch Sysdiagnose Procedure" (5 numbered steps) + iPad-silence callout (preserved within Step 3) + "Supervised-device compatibility" blockquote + "Alternative: Mac+Cable Console.app Live Streaming" subsection (with cable-type reference and Apple Configurator 2 filesystem-level fallback inline) + PII warning (preserved).

## Anchor Rename Tracking

| Aspect | Before | After |
|--------|--------|-------|
| H2 heading | `## Section 3: Mac+Cable Sysdiagnose` | `## Section 3: Sysdiagnose Trigger and File Export` |
| GitHub slug | `section-3-maccable-sysdiagnose` (`+` drops; `m` and `c` merge) | `section-3-sysdiagnose-trigger-and-file-export` |
| Inbound link in `docs/quick-ref-l2.md` | `#section-3-maccable-sysdiagnose` (valid pre-rename) | `#section-3-sysdiagnose-trigger-and-file-export` (valid post-rename) |
| Inbound link in `docs/ios-lifecycle/01-ade-lifecycle.md:364` | `#section-3-mac-cable-sysdiagnose` (BROKEN before this plan — hyphenated slug never existed) | `#section-3-mac-cable-sysdiagnose` (still broken — OUT OF SCOPE per D-38) |

## Regression Safety (SC #4)

- **Baseline broken-link count (before this plan):** 85 (Phase 32 baseline per `32-AUDIT.md`)
- **Post-gap-closure broken-link count:** 85 (`grep -c '^BROKEN:' /tmp/link-check-after.txt` = 85)
- **Diff against baseline:** zero (identical broken-link sets pre/post — no NEW breaks introduced, no pre-existing breaks resolved)

The pre-existing broken link in `docs/ios-lifecycle/01-ade-lifecycle.md:364` (cross-link to `#section-3-mac-cable-sysdiagnose` with hyphens between "mac", "cable", "sysdiagnose") was already broken before this plan because the old Section 3 heading "Mac+Cable Sysdiagnose" slugified to `section-3-maccable-sysdiagnose` (no hyphen between "mac" and "cable" — the `+` drops and the letters merge). Renaming Section 3 to `section-3-sysdiagnose-trigger-and-file-export` did not resolve this pre-existing break (different slug entirely), but did not regress it either. Per D-38 additive-only posture and the user-supplied planner constraint ("No edits to the 9 files that passed Tests 1-14"), `ios-lifecycle/01-ade-lifecycle.md` was not edited in this plan.

## D-38 Additive-Only Posture Confirmation

`git diff --stat HEAD~1 HEAD -- docs/` reports exactly 2 files modified:

```
 docs/l2-runbooks/14-ios-log-collection.md | 65 ++++++++++++++++---------------
 docs/quick-ref-l2.md                      | 24 +++++++-----
 2 files changed, 49 insertions(+), 40 deletions(-)
```

The 9 files that passed UAT Tests 1-14 are byte-identical pre/post. No collateral modifications, no file renames, no deletions, no structural rewrites of unrelated content.

## Line-Count Change per File

| File | Before | After | Net |
|------|--------|-------|-----|
| docs/quick-ref-l2.md | 235 lines | 241 lines | +6 |
| docs/l2-runbooks/14-ios-log-collection.md | 181 lines | 184 lines | +3 |

Total +9 lines net across both files. Replacement content slightly more verbose than removed content (5-step numbered list + supervised-device blockquote + Apple Support URL footnote in quick-ref; 5-step procedure + authoritative-source citation + alternative subsection in l2-runbook), but offset by removal of 4-row physical-button table + 4-row per-device trigger table + 2 separate warning blockquotes (Emergency SOS / iPad silence reduced to 1 inline iPad-silence callout in Step 3).

## Threat Register Update

| Threat ID | Status Before | Status After | Notes |
|-----------|---------------|--------------|-------|
| T-32-02 (stale sysdiagnose physical-button guidance) | mitigate (research-flag marker) | **RESOLVED** | Apple Support URL cited inline as authoritative source; eliminates stale-guidance risk for the sysdiagnose trigger procedure. Other 2 tables (Diagnostic Data Collection + Intune Portal Paths) retain Phase 30 D-32 / Phase 31 D-31 research-flag markers (separate scope). |
| T-32-09 (PII via ad-hoc share extension) | new | mitigate | PII warning blockquote preserved in 14-ios-log-collection.md Section 3 + share-extension destinations in Step 5 list explicitly tagged "subject to data-handling policy". L2 engineer responsibility to select tenant-approved destination. |
| T-32-10 (AssistiveTouch procedure drift from Apple canonical) | new | accept | Apple Support URL cited directly. Next `review_by: 2026-07-17` will re-check URL liveness and procedure currency. Low-risk: Apple Support URLs are stable (not versioned). |

## Verification Results

### Per-task automated verification

**Task 1** (`docs/quick-ref-l2.md`):

| Check | Expected | Actual | Result |
|-------|----------|--------|--------|
| `grep -c 'AssistiveTouch'` | ≥ 1 | 7 | PASS |
| `grep -c 'volume button'` | == 0 | 0 | PASS |
| `grep -c 'apple.com/guide/platform-support/use-diagnostics'` | ≥ 1 | 1 | PASS |
| `grep -c 'Analytics Data'` | ≥ 1 | 1 | PASS |
| `grep -c 'Settings > Accessibility > Touch > AssistiveTouch'` | ≥ 1 | 2 | PASS |
| `grep -c 'Supervised-device compatibility'` | ≥ 1 | 1 | PASS |
| `grep -c '^| iPhone 8 / SE'` | == 0 | 0 | PASS |
| `grep -c '^| iPad with Face ID (Legacy'` | == 0 | 0 | PASS |
| `grep -c 'Phase 30 D-32\|Phase 31 D-31'` | ≥ 1 | 2 | PASS |
| `link-check.sh docs/quick-ref-l2.md` | exit 0 | exit 0 | PASS |

**Task 2** (`docs/l2-runbooks/14-ios-log-collection.md`):

| Check | Expected | Actual | Result |
|-------|----------|--------|--------|
| `grep -c 'AssistiveTouch'` | ≥ 1 | 9 | PASS |
| `grep -c '^## Section 3: Sysdiagnose Trigger and File Export'` | == 1 | 1 | PASS |
| `grep -c '^## Section 3: Mac+Cable Sysdiagnose'` | == 0 | 0 | PASS |
| `grep -c 'apple.com/guide/platform-support/use-diagnostics'` | ≥ 1 | 1 | PASS |
| `grep -c 'Customize Top Level Menu'` | ≥ 1 | 1 | PASS |
| `grep -c 'Analytics Data'` | ≥ 1 | 2 | PASS |
| `grep -c 'share button'` | ≥ 1 | 2 | PASS |
| `grep -c 'Supervised-device compatibility'` | ≥ 1 | 1 | PASS |
| `grep -c 'Alternative: Mac+Cable Console.app Live Streaming'` | == 1 | 1 | PASS |
| `grep -c '^### Trigger on Device (Unified Modern iOS)'` | == 0 | 0 | PASS |
| `grep -c '^### Per-Device Trigger Reference (iOS 15'` | == 0 | 0 | PASS |
| `grep -c '^## Section 1:'` | == 1 | 1 | PASS |
| `grep -c '^## Section 2:'` | == 1 | 1 | PASS |
| `grep -c '^## Common Artifacts Cross-Reference'` | == 1 | 1 | PASS |
| `link-check.sh docs/l2-runbooks/14-ios-log-collection.md` | exit 0 | exit 0 | PASS |

**Task 3** (anchor consistency gate):

| Check | Expected | Actual | Result |
|-------|----------|--------|--------|
| Computed slug matches Task 1's pre-written anchor | yes | yes (`section-3-sysdiagnose-trigger-and-file-export`) | PASS |
| `grep -c "l2-runbooks/14-ios-log-collection.md#section-3-sysdiagnose-trigger-and-file-export" docs/quick-ref-l2.md` | ≥ 1 | 1 | PASS |
| Full-docs `link-check.sh docs/` broken count | ≤ 85 | 85 | PASS |
| `git diff --stat HEAD -- docs/` shows only 2 expected files | yes | yes | PASS |

### Phase-level gates

| Gate | Result |
|------|--------|
| All 3 tasks pass per-task `<verify>` automated commands | PASS |
| UAT Test 15 verbal regression (no physical-button table; AssistiveTouch present; URL cited; supervised note present) | PASS |
| SC #4 regression-safety gate (broken count ≤ 85 baseline) | PASS (85 = 85) |
| D-38 additive-only posture check (only 2 expected files modified) | PASS |

## Commits

- `4bf5107` — `docs(32-09): gap-closure for UAT Test 15 — replace sysdiagnose physical-button procedure with Apple-canonical AssistiveTouch method` (single atomic commit, Option A; 2 files changed, 49 insertions, 40 deletions)

## Self-Check: PASSED

- [x] Created files (none — gap-closure plan modifies only)
- [x] Modified file `docs/quick-ref-l2.md` exists in git tree (commit `4bf5107`)
- [x] Modified file `docs/l2-runbooks/14-ios-log-collection.md` exists in git tree (commit `4bf5107`)
- [x] Commit `4bf5107` exists in `git log --oneline --all`
