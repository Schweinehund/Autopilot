---
phase: 32-navigation-integration-references
verified: 2026-04-18T16:45:00Z
status: human_needed
score: 4/4 must-haves verified (autonomous); UAT Test 15 gap CLOSED; 4 pre-existing manual-verification items still deferred
overrides_applied: 0
re_verification:
  previous_status: human_needed
  previous_score: 4/4 must-haves verified (autonomous); 5 human-verification items deferred
  gaps_closed:
    - "UAT Test 15 — sysdiagnose trigger documentation now reflects Apple-canonical AssistiveTouch procedure with Apple Support URL citation (resolved by plan 32-09)"
  gaps_remaining: []
  regressions: []
human_verification:
  - test: "Rendered markdown visual inspection of iOS capability matrix"
    expected: "Apple-parity preamble reads naturally (2-4 sentences); all 5 domain tables render without column wrap/overflow at ~100-char width; Key Gaps Summary is scannable (8 numbered gaps)"
    why_human: "Visual rendering quality, narrative tone, and table-width behavior cannot be verified programmatically"
  - test: "Portal-path currency verification for quick-ref-l2.md iOS tables (Diagnostic Data Collection + Intune Portal Paths ONLY — sysdiagnose table superseded by 32-09)"
    expected: "Each portal-path string (2 remaining tables — Diagnostic Data Collection, Key Intune Portal Paths) matches current Intune admin center UI OR current Microsoft Learn documentation"
    why_human: "Intune admin center UI can shift without deprecation notice; requires live access to the portal OR cross-check against Microsoft Learn pages listed in 32-AUDIT.md Check 2 fallback"
  - test: "Apple-parity framing preamble readability as Apple-platform admin"
    expected: "Preamble immediately signals iOS↔macOS comparison is most meaningful for Apple admins (DDM/supervision/VPP); Windows readers don't feel excluded; 2-4 sentences (not narrative drift)"
    why_human: "Tone and reader-perception judgment — requires a human with Apple-admin context to evaluate"
  - test: "Full-suite click-through spot-check from docs/index.md"
    expected: "Clicking iOS/iPadOS Provisioning in Choose Your Platform lands at iOS H2; iOS Enrollment Path Overview from L1 table resolves; iOS Capability Matrix from Admin Setup table resolves; 3 pre-existing non-iOS links (macOS Capability Matrix, Windows Autopilot Glossary, APv1 vs APv2) still resolve (regression spot-check); sysdiagnose cross-link from quick-ref-l2 now resolves to renamed Section 3 anchor"
    why_human: "End-to-end user-flow validation on a rendered markdown viewer — best completed by a human driver"
  - test: "Step 2 AssistiveTouch wording accuracy check (WR-01 from 32-REVIEW)"
    expected: "Implementation reads 'Customize Top Level Menu > tap an icon (or tap + to add a new slot) > select Analytics' — reviewer flagged that the UAT-spec verbatim 'tap Custom' phrasing was NOT preserved. The deviation appears intentional (modern iOS UI no longer labels a 'Custom' button — the Customize Top Level Menu shows icon slots and a + button). Human should cross-check against the live Apple Support URL (https://support.apple.com/guide/platform-support/use-diagnostics-to-research-device-issues-supd3f43814e/web) and either (a) accept the implementation's UI-accurate paraphrase, or (b) restore the UAT-verbatim 'tap Custom' wording."
    why_human: "Requires live access to Apple Support URL to determine whether 'Custom' is currently a UI label; reviewer identified as a judgment call"
---

# Phase 32: Navigation Integration & References — Verification Report (Re-verification after 32-09 Gap Closure)

**Phase Goal:** iOS/iPadOS content is reachable from every shared navigation entry point — the hub index, common issues routing, quick-reference cards, and capability matrix — so users do not need to know the file paths to find iOS documentation.

**Re-verified:** 2026-04-18T16:45:00Z
**Status:** human_needed — autonomous checks all PASS; UAT Test 15 gap (sysdiagnose procedure) now CLOSED by plan 32-09; 4 pre-existing manual-verification items from the initial verification remain deferred + 1 new human item added for the WR-01 warning from 32-REVIEW.
**Re-verification:** Yes — second verification after 32-09 gap closure completed.

---

## Re-verification Outcome (Delta vs Prior Verification)

The prior verification on 2026-04-17 returned `human_needed` with autonomous PASS on all 4 success criteria. During subsequent UAT (32-UAT.md), 14 of 15 tests passed and Test 15 (sysdiagnose trigger currency) failed — the user reported that the physical-button trigger documentation in `docs/quick-ref-l2.md` and `docs/l2-runbooks/14-ios-log-collection.md` should be replaced with Apple's canonical AssistiveTouch-based procedure. Gap-closure plan 32-09 was authored, executed, and code-reviewed:

| Artifact | Prior State (2026-04-17) | Current State (2026-04-18) |
|----------|--------------------------|----------------------------|
| `docs/quick-ref-l2.md` Sysdiagnose Trigger Reference | 4-row physical-button table (volume + Side/Top combos per device type) | REPLACED with 5-step AssistiveTouch numbered list + Apple Support URL citation + Supervised-device compatibility blockquote |
| `docs/l2-runbooks/14-ios-log-collection.md` Section 3 | `## Section 3: Mac+Cable Sysdiagnose` — physical-button trigger + per-device-type table + Console.app as primary retrieval | RENAMED to `## Section 3: Sysdiagnose Trigger and File Export` — AssistiveTouch 5-step procedure + on-device share-button export as PRIMARY + Mac+cable Console.app demoted to `### Alternative: Mac+Cable Console.app Live Streaming` subsection |
| Anchor integrity (quick-ref-l2 → 14-ios-log-collection Section 3) | `#section-3-maccable-sysdiagnose` (resolved) | `#section-3-sysdiagnose-trigger-and-file-export` (resolves) — anchor migrated atomically with section rename |
| Pre-existing broken-link baseline | 85 | 85 (unchanged — no regressions; pre-existing `ios-lifecycle/01-ade-lifecycle.md:364` broken link documented as out-of-scope per D-38) |
| D-38 additive-only posture | 10 Phase-32 files touched | 10 Phase-32 files + 2 gap-closure files (quick-ref-l2.md already in set; 14-ios-log-collection.md is a Phase 31 file touched additively per D-38) — the 9 UAT-passed files that were Phase-32 touched byte-identical |

**UAT Test 15 status:** RESOLVED. Regression evidence: `grep -c "volume button" docs/quick-ref-l2.md` = 0 (physical-button language fully removed); `grep -c "AssistiveTouch" docs/quick-ref-l2.md` = 7 and in 14-ios-log-collection.md = 9; Apple Support URL cited exactly once in each file.

No regressions introduced. SC #1, SC #2, SC #3 unchanged by 32-09. SC #4 regression-safety explicitly validated: post-closure full-docs link-check broken count = 85, matching the Phase 32 baseline exactly.

---

## Goal Achievement

### Observable Truths (Success Criteria from ROADMAP.md Phase 32)

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | The shared glossary (`_glossary-macos.md`) contains definitions for iOS-specific terms (supervision, MAM-WE, APNs, account-driven user enrollment, VPP, jailbreak detection) that did not exist in prior milestones | VERIFIED | 5 new H3 headings confirmed (`grep -cE "^### (Supervision\|Account-Driven User Enrollment\|APNs\|Jailbreak Detection\|MAM-WE)" docs/_glossary-macos.md` = 5); new `## App Protection (MAM)` H2 present; VPP entry carries device-licensed vs user-licensed distinction + supervised-only silent install callout + cross-platform links. Unchanged by 32-09. |
| 2 | A user arriving at `index.md`, `common-issues.md`, `quick-ref-l1.md`, or `quick-ref-l2.md` finds an iOS/iPadOS section with direct links to relevant iOS documents — no iOS content is reachable only via directory browsing | VERIFIED | `grep -c "^## iOS/iPadOS Provisioning" docs/index.md` = 1; `grep -c "^## iOS/iPadOS Failure Scenarios" docs/common-issues.md` = 1; `grep -c "^## iOS/iPadOS Quick Reference" docs/quick-ref-l1.md` = 1; `grep -c "^## iOS/iPadOS Quick Reference" docs/quick-ref-l2.md` = 1. Plan 32-09 modified content within the quick-ref-l2 iOS section (Sysdiagnose Trigger Reference subsection) but preserved the H2 structure and the other two tables (Diagnostic Data Collection, Intune Portal Paths). |
| 3 | The iOS capability matrix (`reference/ios-capability-matrix.md`) documents feature parity gaps across iOS, macOS, and Windows in a scannable table format | VERIFIED | File exists at canonical path (107 lines, within D-10 100-130 target); trilateral 3-column structure (`\| Feature \| Windows \| macOS \| iOS \|`) across 5 domains; Apple-parity framing preamble; Key Gaps Summary with 8 numbered gaps; wired into `docs/index.md` Cross-Platform References + `docs/reference/00-index.md` iOS References H2. Unchanged by 32-09. |
| 4 | All navigation updates are injected into existing shared files (not full rewrites) and all pre-existing links in those files remain valid after iOS sections are added | VERIFIED | Post-32-09 full-docs `link-check.sh` broken count = 85 (EXACT match to Phase 32 pre-32-09 baseline — zero regressions). 32-09 changed only 2 files per `git show --stat 4bf5107`. The 9 UAT-passed files are byte-identical in this commit. Reachability audit still matches fixture (`run-all.sh` EXIT 0). The Phase 32 renamed Section 3 anchor migration was atomic: all inbound references from quick-ref-l2 were updated in the same commit, and the only known orphaned reference (`ios-lifecycle/01-ade-lifecycle.md:364`) was pre-existing broken before 32-09 and remains out-of-scope per D-38. |

**Score:** 4/4 truths verified (autonomous).

---

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `docs/_glossary-macos.md` | Extended with 5 new iOS terms + updated VPP entry + new `## App Protection (MAM)` H2 | VERIFIED | 5 new H3 term headings + `## App Protection (MAM)` H2 confirmed |
| `docs/common-issues.md` | `## iOS/iPadOS Failure Scenarios` H2 with 6 symptom categories + MAM-WE advisory + platform selector entry + 3 bidirectional banners | VERIFIED | H2 present; 7 `### iOS: ` H3 entries (6 symptoms + 1 MAM-WE advisory); bidirectional banners present |
| `docs/index.md` | `## iOS/iPadOS Provisioning` H2 with L1/L2/Admin Setup subsections + Choose Your Platform 3rd entry + 2 Cross-Platform References entries | VERIFIED | H2 + 3 role-based subsections + Cross-Platform References iOS Enrollment Path Overview + iOS Capability Matrix links |
| `docs/quick-ref-l1.md` | Appended `## iOS/iPadOS Quick Reference` H2 (4 Top Checks + escalation + decision tree + 6 runbook links) | VERIFIED | H2 + Top Checks + Escalation Triggers + Decision Tree link + 6 L1 runbook links |
| `docs/quick-ref-l2.md` | Appended iOS H2 with 3 tables (Diagnostic Data / Portal Paths / Sysdiagnose Triggers) + research-flag footnotes | VERIFIED | H2 + Diagnostic Data Collection table + Intune Portal Paths table + **Sysdiagnose Trigger Reference rewritten by 32-09** (was 4-row table → now 5-step AssistiveTouch numbered list + Apple Support URL citation + Supervised-device compatibility note). Research-flag markers on the OTHER 2 tables preserved (`grep -c "Phase 3[01] D-3" docs/quick-ref-l2.md` = 3, including the sysdiagnose footnote's updated reference). |
| `docs/reference/ios-capability-matrix.md` | NEW trilateral matrix (3 columns × 5 domains + Key Gaps Summary) | VERIFIED | 107 lines; 3 columns × 5 domain H2s; Key Gaps Summary with 8 numbered gaps; Apple-parity preamble. Unchanged by 32-09. |
| `docs/reference/00-index.md` | Add iOS References H2 with iOS Capability Matrix entry | VERIFIED | `grep -c "^## iOS References" docs/reference/00-index.md` = 1 |
| `docs/decision-trees/07-ios-triage.md` | Placeholder at :99 resolved to cross-linked iOS+macOS glossary reference | VERIFIED | Line 99 now contains Apple Provisioning Glossary link with 5 iOS term anchors + 5 macOS term anchors — `grep -c "Phase 32 NAV-0" docs/decision-trees/07-ios-triage.md` = 0 (no placeholder markers remain) |
| `docs/decision-trees/00-initial-triage.md` | Phase 30 Wave 3 retrofit: iOS triage banner | VERIFIED | 4 iOS triage references present; banner at line 10 intact |
| `docs/l1-runbooks/00-index.md` | Phase 30 Wave 3 retrofit: iOS L1 Runbooks section | VERIFIED | `## iOS L1 Runbooks` H2 present (1 match) |
| `docs/l2-runbooks/14-ios-log-collection.md` | Section 3 — sysdiagnose trigger procedure | VERIFIED (updated by 32-09) | Section 3 RENAMED (`## Section 3: Sysdiagnose Trigger and File Export`; old `## Section 3: Mac+Cable Sysdiagnose` heading removed). AssistiveTouch 5-step procedure in body; Apple Support URL cited; Mac+cable Console.app demoted to `### Alternative: Mac+Cable Console.app Live Streaming` subsection; PII warning preserved; Sections 1, 2, Common Artifacts Cross-Reference, Related Resources UNCHANGED. |

---

### Key Link Verification

| From | To | Via | Status | Details |
|------|----|----|--------|---------|
| `docs/index.md` iOS L1 table | `docs/ios-lifecycle/00-enrollment-overview.md` | Table link | WIRED | Resolves per link-check.sh exit 0 |
| `docs/index.md` iOS L1 table | `docs/decision-trees/07-ios-triage.md` | Table link | WIRED | Resolves |
| `docs/index.md` iOS Admin Setup table | `docs/reference/ios-capability-matrix.md` | Table link | WIRED | Resolves (new file at depth 1) |
| `docs/index.md` Cross-Platform References | `docs/reference/ios-capability-matrix.md` | Table link | WIRED | NAV-03 wiring per D-08 |
| `docs/reference/00-index.md` iOS References | `docs/reference/ios-capability-matrix.md` | Bullet link | WIRED | Resolves |
| `docs/common-issues.md` iOS H2 | `docs/decision-trees/07-ios-triage.md` | Prose link | WIRED | Start-here link resolves |
| `docs/common-issues.md` iOS symptoms | `docs/l1-runbooks/16-21-ios-*.md` | Table links | WIRED | 6 symptom H3s × 1-2 links each — all resolve |
| `docs/common-issues.md` MAM-WE advisory | `docs/admin-setup-ios/09-mam-app-protection.md` | Prose link | WIRED | Resolves |
| `docs/common-issues.md` MAM-WE advisory | `docs/_glossary-macos.md#mam-we` | Anchor link | WIRED | Glossary anchor resolves |
| `docs/decision-trees/07-ios-triage.md:99` | 10 `_glossary-macos.md` anchors (5 iOS + 5 macOS) | Anchor links | WIRED | All 10 anchors present as H3 headings in glossary |
| `docs/quick-ref-l1.md` iOS runbook list | `docs/l1-runbooks/16-21-ios-*.md` (6 files) | Bullet links | WIRED | All 6 runbook filenames present on disk |
| `docs/quick-ref-l2.md` iOS runbook list | `docs/l2-runbooks/14-17-ios-*.md` (4 files) | Bullet links | WIRED | All 4 runbook filenames present on disk |
| **`docs/quick-ref-l2.md` Sysdiagnose footnote (updated by 32-09)** | **`docs/l2-runbooks/14-ios-log-collection.md#section-3-sysdiagnose-trigger-and-file-export`** | Inline markdown link | WIRED (gap closure) | Atomic anchor migration: quick-ref-l2 footnote updated to new slug simultaneously with Section 3 rename in 14-ios-log-collection.md. `grep -c "l2-runbooks/14-ios-log-collection.md#section-3-sysdiagnose-trigger-and-file-export" docs/quick-ref-l2.md` = 1. |
| **`docs/quick-ref-l2.md` Sysdiagnose footnote (updated by 32-09)** | **https://support.apple.com/guide/platform-support/use-diagnostics-to-research-device-issues-supd3f43814e/web** | External URL citation | WIRED (gap closure) | Apple Support URL cited verbatim in footnote |
| **`docs/l2-runbooks/14-ios-log-collection.md` Section 3 (updated by 32-09)** | **https://support.apple.com/guide/platform-support/use-diagnostics-to-research-device-issues-supd3f43814e/web** | External URL citation | WIRED (gap closure) | Apple Support URL cited verbatim under "Authoritative source" bullet |
| `docs/decision-trees/00-initial-triage.md` banner | `docs/decision-trees/07-ios-triage.md` | Prose link | WIRED | Phase 30 Wave 3 retrofit |
| `docs/l1-runbooks/00-index.md` iOS L1 Runbooks H2 | 6 iOS L1 runbook files | Table links | WIRED | Phase 30 Wave 3 retrofit |
| All shared files | Bidirectional platform banners (Windows↔macOS↔iOS) | `> **platform:**` blockquotes | WIRED | Bidirectional banners across common-issues, index, quick-ref files |

---

### Requirements Coverage

| Requirement | Source Plans | Description | Status | Evidence |
|-------------|--------------|-------------|--------|----------|
| **NAV-01** | 32-00, 32-01, 32-03, 32-08 | iOS glossary additions extend existing glossary with supervision, MAM, user enrollment, APNs, and iOS-specific terms | SATISFIED | `_glossary-macos.md` has 5 new H3s + VPP update + new App Protection (MAM) H2; placeholder retrofit at 07-ios-triage.md:99 completed with 5 iOS anchor cross-links. Unchanged by 32-09. |
| **NAV-02** | 32-00, 32-04, 32-05, 32-06, 32-07, 32-08, **32-09 (gap closure)** | Platform selector, index.md, common-issues.md, and quick-ref cards updated with iOS/iPadOS sections | SATISFIED | All 4 shared files have iOS H2 sections; platform selectors updated; bidirectional banners wired. 32-09 refined the quick-ref-l2 Sysdiagnose Trigger Reference content within the existing iOS H2 (NAV-02 scope unchanged; content improved to Apple-canonical source). |
| **NAV-03** | 32-00, 32-02, 32-08 | iOS capability matrix documents feature parity gaps across iOS vs macOS vs Windows | SATISFIED | `docs/reference/ios-capability-matrix.md` (107 lines, trilateral 3-column × 5-domain + 8-gap Key Gaps Summary) + wired into index.md Cross-Platform References + reference/00-index.md iOS References H2. Unchanged by 32-09. |

All 3 requirements covered by multiple plans. No orphaned requirements. REQUIREMENTS.md line 47 shows NAV-01/02/03 as `[x]` (checked).

---

### Behavioral Spot-Checks

| Behavior | Command | Result | Status |
|----------|---------|--------|--------|
| Full validation harness (link-check + anchor-collision + reachability-audit) | `bash .planning/phases/32-navigation-integration-references/validation/run-all.sh` | `=== all checks passed ===` EXIT 0 | PASS |
| iOS glossary contains exactly 5 new iOS H3 headings | `grep -cE "^### (Supervision\|Account-Driven User Enrollment\|APNs\|Jailbreak Detection\|MAM-WE)" docs/_glossary-macos.md` | 5 | PASS |
| New `## App Protection (MAM)` H2 present in glossary | `grep -c "^## App Protection (MAM)" docs/_glossary-macos.md` | 1 | PASS |
| iOS capability matrix exists at canonical SC #3 path | `wc -l docs/reference/ios-capability-matrix.md` | 107 lines | PASS |
| iOS sections in all 4 shared files | 4 `grep` commands (see above) | 1/1/1/1 | PASS |
| **(32-09)** AssistiveTouch procedure present in both files | `grep -c "AssistiveTouch" docs/quick-ref-l2.md docs/l2-runbooks/14-ios-log-collection.md` | 7 / 9 | PASS |
| **(32-09)** Apple Support URL cited in both files | `grep -c "apple.com/guide/platform-support/use-diagnostics" docs/quick-ref-l2.md docs/l2-runbooks/14-ios-log-collection.md` | 1 / 1 | PASS |
| **(32-09)** Section 3 renamed correctly | `grep -c "^## Section 3: Sysdiagnose Trigger and File Export" docs/l2-runbooks/14-ios-log-collection.md` = 1 and `grep -c "^## Section 3: Mac+Cable Sysdiagnose" ...` = 0 | 1 / 0 | PASS |
| **(32-09)** Physical-button language fully removed from quick-ref-l2 iOS section | `grep -c "volume button" docs/quick-ref-l2.md` | 0 | PASS |
| **(32-09)** Supervised-device compatibility note present in both files | `grep -nE "Supervised-device compatibility" docs/quick-ref-l2.md docs/l2-runbooks/14-ios-log-collection.md` | 1 match in each file (case-sensitive "S") | PASS |
| **(32-09)** Mac+cable demoted to Alternative subsection | `grep -c "^### Alternative: Mac\+Cable Console.app Live Streaming" docs/l2-runbooks/14-ios-log-collection.md` | 1 | PASS |
| **(32-09)** Sections 1, 2, Common Artifacts untouched | `grep -c` each — Sections 1/2/Common Artifacts all return 1 | 1/1/1 | PASS |
| **(32-09)** Old physical-button subsections removed | `grep -cE "^### (Trigger on Device\|Per-Device Trigger Reference)" docs/l2-runbooks/14-ios-log-collection.md` | 0 | PASS |
| **(32-09)** D-38 additive-only: git show 4bf5107 shows exactly 2 files | `git show --stat 4bf5107 \| grep "\.md "` | 2 files (`docs/l2-runbooks/14-ios-log-collection.md`, `docs/quick-ref-l2.md`) | PASS |
| **(32-09)** No regression in full-docs broken-link baseline | `link-check.sh docs/ \| grep -c "^BROKEN:"` | 85 (Phase 32 baseline = 85) | PASS |
| Anchor cross-link from quick-ref-l2 to new Section 3 slug resolves | `grep -c "l2-runbooks/14-ios-log-collection.md#section-3-sysdiagnose-trigger-and-file-export" docs/quick-ref-l2.md` | 1 | PASS |
| Reachability audit matches fixture | Part of `run-all.sh` | No diff vs expected-reachability.txt | PASS |

All 17 autonomous behavioral spot-checks PASS.

---

### Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
|------|------|---------|----------|--------|
| — | — | — | — | No blocking anti-patterns found in Phase 32 touched files (including 32-09 updates). |

Automated scans performed:
- `grep -rn "Phase 32 NAV-0[123]" docs/` — zero placeholder markers in shipped docs (all `Phase 32` occurrences are legitimate Version History rows or NAV-03 requirement-ID annotations).
- `grep -n "TODO\|FIXME\|PLACEHOLDER"` across 11 Phase 32 / 32-09 touched files — zero hits.
- `link-check.sh` on all 11 touched files — zero broken links introduced by Phase 32 or 32-09.
- `anchor-collision.sh` default mode — EXIT 0 (H3 warnings are informational; H3 duplicates in index/quick-ref files are intentional parallel-platform structure per D-26/D-20).

**One Warning (WR-01) from 32-REVIEW — promoted to human_verification item #5:** Step 2 of the AssistiveTouch procedure in both files reads `Customize Top Level Menu > tap an icon (or tap **+** to add a new slot) > select **Analytics**` rather than the UAT-spec verbatim `Customize Top Level Menu > tap Custom > select Analytics`. The deviation appears to be an intentional UI-accuracy choice by the executor (modern iOS UIs no longer label a button "Custom"). This is a content-accuracy judgment call requiring a live cross-check against the Apple Support URL. See human_verification frontmatter item 5. Not blocking — all other UAT Test 15 requirements are satisfied (5-step procedure, Apple URL cited, supervised-device note, physical buttons removed).

**Pre-existing broken-link surface (informational, out-of-scope per D-38):** `link-check.sh docs` reports 85 pre-existing broken links across Phase 20-31 content. The 32-09 commit did NOT increase this count. One pre-existing broken link (`docs/ios-lifecycle/01-ade-lifecycle.md:364 → 14-ios-log-collection.md#section-3-mac-cable-sysdiagnose`) is informational: it was already broken before 32-09 (the hyphenated slug never existed — the old "Mac+Cable Sysdiagnose" heading slugified to `section-3-maccable-sysdiagnose` without the middle hyphen). Renaming Section 3 did not resolve this pre-existing break, but per D-38 additive-only posture and the 32-09 planner constraint ("No edits to the 9 files that passed Tests 1-14"), `ios-lifecycle/01-ade-lifecycle.md` was correctly not edited in the gap closure. Tracked for a future docs-hygiene phase.

---

### Human Verification Required

The 4 manual-verify items from the initial 2026-04-17 verification remain deferred by design (per 32-AUDIT.md Manual Verification Pending section). Manual check #4 from the original set ("Sysdiagnose trigger currency vs Apple Developer documentation") is now RESOLVED by plan 32-09 (Apple Support URL cited inline as authoritative source). One new human item has been added for WR-01 (Step 2 UI-accuracy).

| # | Test | Expected Outcome | Why Human |
|---|------|------------------|-----------|
| 1 | Rendered markdown visual inspection of `docs/reference/ios-capability-matrix.md` | 5 domain tables render without column wrap at ~100 char width; preamble reads as 2-4 sentences (not narrative drift); Key Gaps Summary scans cleanly | Visual rendering and tone are not programmatically verifiable |
| 2 | Portal-path currency for quick-ref-l2.md iOS tables (2 remaining tables — Diagnostic Data Collection + Intune Portal Paths; sysdiagnose table NO LONGER in scope for this check after 32-09) | Each portal path matches current Intune admin center UI OR Microsoft Learn documentation | Intune UI shifts without notice; requires live access or Learn cross-check |
| 3 | Apple-parity framing preamble readability at ios-capability-matrix.md | Preamble immediately surfaces iOS↔macOS comparison value for Apple admins; Windows readers don't feel excluded; tone is comparative, not narrative | Tone and audience-perception judgment |
| 4 | Full-suite click-through spot-check from `docs/index.md` | Zero broken links; all iOS navigation entries from index.md work as described; pre-existing non-iOS links remain valid; the new sysdiagnose cross-link from quick-ref-l2 resolves to the renamed Section 3 anchor | End-to-end user-flow validation; best with a rendered markdown viewer |
| 5 | **(NEW — from WR-01 in 32-REVIEW)** Step 2 AssistiveTouch wording accuracy check | Cross-check the implementation's `Customize Top Level Menu > tap an icon (or tap + to add a new slot) > select Analytics` against the live Apple Support URL. Either (a) accept the UI-accurate paraphrase (if "Custom" is no longer a button label in current iOS), or (b) restore UAT-spec verbatim `tap Custom` wording. | Requires live access to the Apple Support page to determine whether "Custom" is currently a UI label |

Sign-off table for these 5 checks is at 32-AUDIT.md (awaits human population).

---

### Gaps Summary

**No blocking gaps.** All 4 success criteria autonomously verified. UAT Test 15 gap (sysdiagnose procedure staleness) is now CLOSED by plan 32-09 — the AssistiveTouch-based procedure replaces the per-device-type physical-button documentation in both `docs/quick-ref-l2.md` and `docs/l2-runbooks/14-ios-log-collection.md`, Apple Support URL is cited inline in both files, supervised-device compatibility note is present in both files, and the Section 3 anchor migration was atomic (no broken links introduced). Full-docs link-check confirms 85 broken links (exactly matching the Phase 32 baseline — zero regressions). D-38 additive-only posture was honored: the 9 UAT-passed files are byte-identical between the 32-08 UAT commit and HEAD.

The phase cannot close as `passed` because 5 manual human-verify items remain: 4 pre-existing items from the initial verification (rendered markdown visual, portal-path currency for the 2 remaining iOS tables, Apple-parity framing tone, click-through spot-check) plus 1 new item from the 32-REVIEW WR-01 warning (Step 2 UI-accuracy cross-check against Apple Support URL). Phase closure requires the human reviewer to sign off on all 5 checks.

---

### D-38 Additive-Only Posture Verification (Gap Closure)

`git show --stat 4bf5107` confirms exactly 2 files modified in the 32-09 gap-closure commit:

```
 docs/l2-runbooks/14-ios-log-collection.md | 65 ++++++++++++++++---------------
 docs/quick-ref-l2.md                      | 24 +++++++-----
 2 files changed, 49 insertions(+), 40 deletions(-)
```

The 9 files that passed UAT Tests 1-14 (docs/_glossary-macos.md, docs/common-issues.md, docs/index.md, docs/quick-ref-l1.md, docs/reference/ios-capability-matrix.md, docs/reference/00-index.md, docs/decision-trees/07-ios-triage.md, docs/decision-trees/00-initial-triage.md, docs/l1-runbooks/00-index.md) are byte-identical between the 32-08 UAT completion commit (`1ae37e6`) and HEAD. The gap closure touched only `docs/quick-ref-l2.md` (which was in the original Phase 32 scope but required the sysdiagnose trigger block to be re-authored) and `docs/l2-runbooks/14-ios-log-collection.md` (a Phase 31 file that the 32-09 plan scoped additively per D-38 — Section 3 rewritten without touching Sections 1/2/Common Artifacts/Related Resources). No collateral edits.

---

### Autonomous Sign-Off (Updated after 32-09)

- [x] SC #1 VERIFIED — glossary extension (5 new iOS H3s + VPP update + new App Protection (MAM) H2) — unchanged by 32-09
- [x] SC #2 VERIFIED — iOS H2 injections across 4 shared files + bidirectional banners + platform selector 3rd entry — unchanged structurally; sysdiagnose subsection content improved by 32-09
- [x] SC #3 VERIFIED — trilateral ios-capability-matrix.md at canonical path (107 lines, 5 domains, 8-gap summary) + wired into index.md + reference/00-index.md — unchanged by 32-09
- [x] SC #4 VERIFIED — additive-only posture honored; Phase 32 + 32-09 introduce zero new broken links; full-docs broken count 85 (baseline match); 9 UAT-passed files byte-identical
- [x] NAV-01 requirement SATISFIED
- [x] NAV-02 requirement SATISFIED (content refinement via 32-09 within existing iOS section structure)
- [x] NAV-03 requirement SATISFIED
- [x] All 10 Phase 32 plans + 1 gap-closure plan (32-09) have `requirements: [...]` frontmatter
- [x] Zero orphaned requirements (REQUIREMENTS.md line 45-47 shows all 3 NAV items as `[x]`)
- [x] Zero blocking anti-patterns in Phase 32 + 32-09 touched files
- [x] W2 compliance: forbidden `Intune > Devices > All devices > [device] > Collect diagnostics` breadcrumb absent
- [x] Anchor-collision mitigation: 6 iOS symptom H3s use `iOS: ` prefix; no collision with macOS
- [x] Pitfall 4 compliance: DDM and silent install NOT conflated in capability matrix
- [x] UAT Test 15 gap CLOSED — AssistiveTouch 5-step procedure + Apple Support URL + supervised-device note in BOTH files
- [x] Atomic Section 3 anchor migration verified (quick-ref-l2 footnote slug matches renamed heading's generated slug)
- [x] D-38 additive-only posture confirmed for 32-09 (exactly 2 files modified; 9 UAT-passed files byte-identical)
- [ ] Manual Check 1 — Rendered markdown visual inspection (PENDING HUMAN REVIEW)
- [ ] Manual Check 2 — Portal-path currency for remaining 2 iOS tables (PENDING HUMAN REVIEW)
- [ ] Manual Check 3 — Apple-parity framing readability (PENDING HUMAN REVIEW)
- [ ] Manual Check 4 — Click-through spot-check (PENDING HUMAN REVIEW)
- [ ] Manual Check 5 — Step 2 "tap Custom" vs "tap an icon" wording cross-check against Apple Support URL (NEW — from 32-REVIEW WR-01; PENDING HUMAN REVIEW)

---

_Re-verified: 2026-04-18T16:45:00Z_
_Verifier: Claude Opus 4.7 (1M context) — gsd-verifier_
_Autonomous verdict: PASS on all 4 success criteria; UAT Test 15 gap RESOLVED by 32-09_
_Phase closure blocker: 5 human-verify items (4 pre-existing by design + 1 new from WR-01); automated scope complete_
