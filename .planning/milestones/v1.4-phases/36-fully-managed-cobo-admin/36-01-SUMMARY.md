---
phase: 36
plan: 01
subsystem: docs/admin-setup-android
tags: [android, cobo, fully-managed, frp, efrp, cope, wpco, enrollment, intune, docs, admin-guide]
requires:
  - docs/_glossary-android.md (Phase 34 — cross-reference target for #fully-managed, #cope, #wpco, #managed-google-play, #zero-touch-enrollment, #dpc, #afw-setup, #play-integrity)
  - docs/android-lifecycle/02-provisioning-methods.md (Phase 34 — D-02 filtered-row targets: #qr, #nfc, #afw-setup, #zero-touch, #cobo)
  - docs/android-lifecycle/03-android-version-matrix.md (Phase 34 — D-05 cross-link to #android-15-breakpoint; #cobo for Android 10+ baseline)
  - docs/admin-setup-android/01-managed-google-play.md (Phase 35 — MGP binding prerequisite via #bind-mgp; #account-types; #disconnect-consequences)
  - docs/admin-setup-android/02-zero-touch-portal.md (Phase 35 — ZT prerequisite for ZT provisioning method via #link-zt-to-intune, #dpc-extras-json, #kme-zt-mutual-exclusion, #step-0-reseller)
provides:
  - "12 stable anchors (D-10) for Phase 38/38/40/41 consumption: #key-concepts, #prerequisites, #cope-migration, #enrollment-profile, #enrollment-token, #provisioning-method-choice, #entra-join-prerequisite, #ca-exclusion-intune-app, #android-15-frp, #configure-efrp, #what-breaks, #renewal-maintenance"
  - "COBO (Fully Managed) admin guide — single mode-specific corporate-ownership admin guide in v1.4 Android Enterprise milestone"
affects:
  - "Phase 38 (Dedicated) — extends COBO #enrollment-profile and #provisioning-method-choice (per ROADMAP Phase 38 line 155)"
  - "Phase 40 (L1 runbook 24 'Device not enrolled') — consumes #enrollment-token and #provisioning-method-choice"
  - "Phase 41 (L2 runbook 19 enrollment investigation) — consumes #enrollment-profile and #android-15-frp"
  - "Phase 42 (AEAUDIT-04 milestone audit) — verifies zero SafetyNet, zero Android 'supervision', last_verified frontmatter, zero shared-file modifications"
tech-stack:
  added: []
  patterns:
    - "tri-portal admin template (Phase 34 D-16..D-22) — H4 sub-section convention; COBO uses Intune admin center for profile creation, references MGP and ZT portal docs by anchor"
    - "explicit <a id='...'></a> anchor markers (Phase 35 convention) for D-10 stability contract — never relying on GitHub auto-slug for downstream-consumed anchors"
    - "D-02 filtered-row cross-reference pattern (Phase 34 D-26 Anti-Pattern 1 guard) — per-method callouts route to 02-provisioning-methods.md without restating the matrix"
    - "D-07 hybrid dual-placement (Prerequisites block + inline reminder) — Phase 35 D-13 precedent reused for Chrome-tab CA exclusion"
    - "D-05 top-of-section ⚠️ warning blockquote (Phase 35 D-19/D-21 precedent) for Android 15 EFRP 'before any reset' admin action"
    - "MEDIUM-confidence inline markers with last_verified date (D-16, D-17) on portal-UI-specific claims (Intune admin center EFRP navigation, Google's 'WPCO recommendation' paraphrase)"
    - "version-tag discipline (PITFALL 1, D-12) — every behavioral assertion either inline-tagged or cross-links the Phase 34 version matrix"
key-files:
  created:
    - "docs/admin-setup-android/03-fully-managed-cobo.md (COBO admin guide; 3684 words; 12 stable anchors; tri-portal template; CRLF)"
  modified:
    - ".planning/phases/36-fully-managed-cobo-admin/36-VALIDATION.md (Wave 0 + Wave 2 status updates: wave_0_complete: true, nyquist_compliant: true, all status rows green, Validation Sign-Off all checked)"
decisions:
  - "All 17 D-## decisions from CONTEXT.md honored verbatim (D-01 through D-17)"
  - "Author chose H3 per-method subsections in the Provisioning method choice section (per Open Question 1 recommendation; H4 reserved for tri-portal template convention)"
  - "Author chose top-of-section ⚠️ EFRP blockquote placement (per D-05 recommendation; CONTEXT Claude's Discretion allowed top-of-doc)"
  - "Author skipped the optional mermaid flowchart and the optional 'Portal shorthand reminder' (per Open Questions 3 + 4 recommendations) to preserve word-count budget"
  - "What Breaks Summary placed at #what-breaks anchor as a navigation table-of-pointers, with inline what-breaks callouts at decision points per PITFALL 2"
metrics:
  duration: ~120 minutes
  completed: 2026-04-22
  tasks: 3
  files: 2
  commits: 3
---

# Phase 36 Plan 01: Fully Managed COBO Admin Guide Summary

**One-liner:** Authored `docs/admin-setup-android/03-fully-managed-cobo.md` — the first mode-specific corporate-ownership admin guide in the v1.4 Android Enterprise milestone, covering COBO enrollment profile, token lifecycle, all four provisioning methods (QR/NFC/`afw#setup`/Zero-Touch) via D-01 hybrid routing, COPE Migration Note locking "Google recommends WPCO" wording, Android 15 FRP + EFRP configuration with top-of-section warning blockquote, and Entra join with tenant-conditional Chrome-tab CA exclusion — all with publishable D-10 stable anchors for Phase 38/40/41 downstream consumption.

## Artifacts Created

**`docs/admin-setup-android/03-fully-managed-cobo.md`** (commit `d0d296d`)

- Final word count: **3684** (target range 2800-3800; mid-range 3300; landed at 3684 after one trim pass to compress overview/prereq/COPE/method paragraphs while preserving all content points)
- 12 stable anchors (D-10) all published as explicit `<a id="..."></a>` tags:
  - `#key-concepts`, `#prerequisites`, `#cope-migration`, `#enrollment-profile`, `#enrollment-token`, `#provisioning-method-choice`, `#entra-join-prerequisite`, `#ca-exclusion-intune-app`, `#android-15-frp`, `#configure-efrp`, `#what-breaks`, `#renewal-maintenance`
- Frontmatter (D-13): `platform: Android`, `audience: admin`, `applies_to: COBO`, `last_verified: 2026-04-21`, `review_by: 2026-06-20` (60-day cycle)
- All 22 outbound cross-references resolve to existing anchors in Phase 34/35 source files
- Zero modifications to any forbidden file (`docs/admin-setup-ios/`, `docs/admin-setup-macos/`, `docs/l1-runbooks/`, `docs/l2-runbooks/`, `docs/common-issues.md`, `docs/quick-ref-l*.md`, `docs/index.md`, `docs/_glossary.md`, `docs/_glossary-macos.md`, or any Phase 34/35 file)
- Two intentional cross-platform routing links to `../admin-setup-ios/00-overview.md` and `../admin-setup-macos/00-overview.md` from the Platform-gate blockquote (the only allowed cross-directory routes)

**`.planning/phases/36-fully-managed-cobo-admin/36-VALIDATION.md`** (commits `2331767` and `da90644`)

- `wave_0_complete: true` (Task 1)
- `nyquist_compliant: true` (Task 3)
- 3 audit-map status rows updated to ✅ green
- 6/6 Validation Sign-Off boxes checked
- Approval dated 2026-04-21

## Requirements Satisfied

**AECOBO-01** — Intune admin can provision a Fully Managed (COBO) corporate device via any of four provisioning methods (QR, NFC, DPC identifier, Zero-Touch) with enrollment profile, token management, and Entra join behavior documented.

- Grep evidence: QR code=5 hits, NFC=11 hits, `afw#setup`=7 hits, Zero-Touch=15 hits; `enrollment profile` section present at `<a id="enrollment-profile"></a>`; `enrollment token` section present at `<a id="enrollment-token"></a>` with token-type table (Default no expiry vs Staging up to 65 years); Entra join referenced 9 times including the `#entra-join-prerequisite` hard prereq and `#key-concepts` Entra-join-behavior subsection.

**AECOBO-02** — Intune admin can read a COPE migration note using Google's current language ("Google recommends WPCO") rather than "COPE deprecated".

- Grep evidence: "recommends WPCO" appears exactly 1 time (in the `#cope-migration` section per D-04 lock); "COPE deprecated" / "deprecated COPE" appear 0 times; MEDIUM-confidence inline marker present per Research Flag 1 finding citing `_glossary-android.md#cope` and Bayton's Android 11 COPE changes article.

**AECOBO-03** — Intune admin can read an Android 15 FRP callout explaining how FRP hardening affects re-enrollment and how to configure Enterprise FRP via Intune policy.

- Grep evidence: "Android 15"=11 hits; "EFRP" / "Enterprise Factory Reset Protection"=18 hits; "Factory reset protection emails" (Intune UI setting name)=2 hits; top-of-section ⚠️ blockquote "Configure EFRP before any factory reset on Android 15 devices"; explicit Intune admin center navigation under `<a id="configure-efrp"></a>`; cross-link to Phase 34 `03-android-version-matrix.md#android-15-breakpoint` (no restatement).

## Decisions Honored (D-01 through D-17)

| ID | Decision | Implementation |
|----|----------|----------------|
| D-01 | Hybrid routing + inline COBO-specific callouts for 4 provisioning methods | `## Provisioning method choice` section (~470 words) routes to `02-provisioning-methods.md` via D-02 filtered-row pattern; carries QR/NFC/`afw#setup`/ZT inline callouts |
| D-02 | Filtered-row link pattern | Each method H3 subsection ends with "For version-availability and cross-mode support, see [02-provisioning-methods.md#...]"; never restates Android min-version |
| D-03 | Dedicated `## COPE Migration Note` section, 150-250 words | Section authored at ~170 words; placed after intro and before enrollment-profile section; opens with one-line framing per Claude's Discretion |
| D-04 | "Google recommends WPCO" exactly once; "COPE deprecated" zero | grep-verified: 1 / 0 |
| D-05 | `## Android 15 FRP and EFRP` section after enrollment-profile content | Section authored with top-of-section ⚠️ blockquote + step-level Intune EFRP configuration + cross-link to version matrix |
| D-06 | KME/ZT Samsung mutual-exclusion one-liner in ZT subsection | Present in Zero-Touch H3 with cross-link to `02-zero-touch-portal.md#kme-zt-mutual-exclusion` |
| D-07 | Hybrid Prerequisites block (tenant-conditional CA framing) + inline reminder | Hard-prereq Entra join + tenant-conditional CA exclusion; inline CA reminder at the Provisioning method choice section opening |
| D-08 | Entra-join conceptual content in early `### Key Concepts` subsection with cross-link to `_glossary-android.md#fully-managed` | Implemented as `## Key Concepts` H2 with `### Work profile is the entire device` and `### Entra join behavior` H3 sub-subsections |
| D-09 | No cross-references to v1.0-v1.3 shared or iOS compliance files | Zero hits to `06-compliance-policy.md`, `enrollment-ca-timing.md`, etc. Two intentional Platform-gate iOS/macOS routing links per scope policy |
| D-10 | 12 stable anchors published as explicit `<a id>` | All 12 verified present |
| D-11 | 2800-3800 word target | 3684 (within range) |
| D-12 | Version-tag discipline / SafetyNet zero / supervision-as-Android-term zero | All grep-verified |
| D-13 | Frontmatter (5 keys; 60-day window) | Verified |
| D-14 | Shared-file modification guard | Zero forbidden-path modifications confirmed via `git diff --name-only HEAD~2 HEAD` |
| D-15 | Plan-time research-flag re-verification | Recorded in Wave 0 of 36-VALIDATION.md (Task 1) |
| D-16 | Executor re-verification at execute time for portal-UI claims | Inline MEDIUM-confidence markers present on EFRP Intune navigation and CA exclusion path |
| D-17 | MEDIUM-confidence labeling for assertions without verbatim source | Inline markers on COPE/WPCO paraphrase + EFRP Intune UI path |

## Research-Flag Verification Outcomes

| Flag | Confidence | Outcome | Evidence in doc |
|------|------------|---------|-----------------|
| 1. COPE wording | MEDIUM | "Google recommends WPCO" is project paraphrase of supported direction; no Google source contradicts | Inline MEDIUM-confidence HTML comment in `#cope-migration` citing `_glossary-android.md#cope` and Bayton's Android 11 article |
| 2. Token expiry 65 years (not 90 days) | HIGH | MS Learn `setup-fully-managed` verbatim | `#enrollment-token` table; explicit "Legacy '90-day' language does NOT apply to COBO" disavowal paragraph |
| 3a. Android 15 FRP behavior | HIGH | MS Learn + Bayton + Phase 34 matrix agreement | `#android-15-frp` "What changed on Android 15" paragraph (version-tagged) |
| 3b. Intune admin center EFRP UI path | MEDIUM | MS Learn confirms feature; portal UI may shift | Inline MEDIUM-confidence HTML comment in `#configure-efrp` |
| 4. Chrome-tab CA exclusion | HIGH | MS Learn verbatim (both `setup-fully-managed` and `ref-corporate-methods`) | `#ca-exclusion-intune-app` tenant-conditional prereq with verbatim MS Learn quote |

## 8-Dimension Audit Results

| Dim | Pass | Detail |
|-----|------|--------|
| D1 Stable anchors | ✅ | 12/12 published as explicit `<a id>` tags |
| D2 Forbidden terminology | ✅ | SafetyNet=0; supervision-as-Android-management-term=0 |
| D3 COPE wording | ✅ | "recommends WPCO"=1; deprecated=0 |
| D4 Version-tag discipline | ✅ | Behavioral assertions either version-tagged or cross-link the Phase 34 matrix; remaining heuristic hits manually reviewed (recovery descriptions, fixed-spec NFC payload, mechanism overviews) |
| D5 Cross-reference integrity | ✅ | All 22 outbound targets resolve via the resilient anchor-check pattern (explicit `<a id>` + H2/H3 auto-slug fallback) |
| D6 Frontmatter schema | ✅ | All 5 keys correct; 60-day window 2026-04-21 → 2026-06-20 |
| D7 Length target | ✅ | 3684 words (2800-3800 range) |
| D8 Shared-file guard | ✅ | Zero forbidden-file modifications confirmed via `git diff --name-only` |

## Anchor Stability Contract (D-10)

The 12 anchors published by this plan are the contract for downstream consumers:

- **Phase 38 (Dedicated)** — `#enrollment-profile`, `#provisioning-method-choice` (shared COBO mechanics that Dedicated extends per ROADMAP Phase 38 line 155); also `#android-15-frp` and `#configure-efrp` (Dedicated-mode FRP re-provisioning callout cross-references for "what is EFRP")
- **Phase 40 (L1 runbook 24 "Device not enrolled")** — `#enrollment-token`, `#provisioning-method-choice`, `#what-breaks`
- **Phase 41 (L2 runbook 19 enrollment investigation)** — `#enrollment-profile`, `#android-15-frp`, `#entra-join-prerequisite`, `#ca-exclusion-intune-app`
- **Phase 42 (AEAUDIT-04 milestone audit)** — `#cope-migration` (zero "COPE deprecated" hits), `#renewal-maintenance` (every admin doc carries this section)

Renaming any of these anchors breaks downstream cross-references.

## Deferred Items Honored

- **Full COPE admin path** — deferred to v1.4.1 per PROJECT.md; "See also" stub in `#cope-migration` references the deferred-items list
- **Knox Mobile Enrollment (KME) full path** — deferred to v1.4.1; one-line KME/ZT Samsung mutual-exclusion reminder in the ZT subsection cross-links Phase 35 `#kme-zt-mutual-exclusion`
- **Dual-SIM IMEI 1 registration** — Phase 39 scope (per Phase 35 D-22 split); explicitly NOT included in COBO doc
- **COBO L1 runbook 24** — Phase 40 (AEL1-04); zero L1 cross-references in this guide
- **COBO L2 runbook 19** — Phase 41 (AEL2-02/AEL2-03); zero L2 cross-references in this guide
- **Dedicated FRP re-provisioning** — Phase 38 (AEDED-03); Phase 36 owns EFRP config steps; Phase 38 owns Dedicated re-provisioning narrative
- **Cross-platform navigation integration** — post-v1.4 unification task; zero modifications to v1.0-v1.3 shared files

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Initial author pass exceeded 3800-word ceiling (4277 words)**

- **Found during:** Task 2 audit (Dimension 7 length check)
- **Issue:** First-draft document landed at 4277 words, over the D-11 ceiling of 3800. Per the PLAN's Note on monolithic task size, "Task 3 audit is the recovery gate — it will detect word-count, anchor, or cross-link gaps and force edit passes." Took the trim pass during Task 2 (before commit) rather than deferring to Task 3.
- **Fix:** Two-pass compression: trim_cobo.py applied 11 trims to overview/prereq/COPE/Key Concepts paragraphs; trim_cobo2.py applied 14 trims to enrollment-profile preamble, NFC/QR/`afw#setup`/ZT method paragraphs, EFRP step intro, References list, and Renewal/Maintenance rotation cadence bullets. All content points preserved; tightened verbose phrasing.
- **Outcome:** 4277 → 3965 → 3684 words (within 2800-3800)
- **Files modified:** `docs/admin-setup-android/03-fully-managed-cobo.md` only (Task 2 commit `d0d296d`)

**2. [Rule 1 - Bug] First-draft "recommends WPCO" appeared 3 times (target: exactly 1)**

- **Found during:** Task 2 audit (Dimension 3 D-04 check)
- **Issue:** Initial draft included "recommends WPCO" in (a) the overview "Covered" bullet referencing the COPE Migration Note, (b) the locked phrase in the migration note section itself, and (c) the MEDIUM-confidence HTML comment paraphrasing the project's source attribution. D-04 audit requires exactly 1 hit.
- **Fix:** Rewrote the overview bullet to "Google's current WPCO direction" (different phrasing, same meaning) and rewrote the HTML comment to "the locked phrasing above is the project's paraphrase" (avoids the verbatim phrase while preserving the confidence-attribution intent).
- **Outcome:** 3 → 1 hit, now passing D-04
- **Files modified:** `docs/admin-setup-android/03-fully-managed-cobo.md` only (folded into Task 2 commit `d0d296d`)

**3. [Rule 3 - Blocking] Write tool wrote to wrong filesystem path**

- **Found during:** Task 2 (post-Write verification)
- **Issue:** The Write tool created the file at `D:/claude/Autopilot/docs/...` (main repo working tree) instead of `D:/claude/Autopilot/.claude/worktrees/agent-a65b87aa/docs/...` (worktree), so the worktree didn't see the file.
- **Fix:** Copied the file from main-repo working tree into the worktree via `cp`, then removed the misplaced copy from main repo. No tracked-file changes were made in the main repo (the file was untracked there).
- **Outcome:** File correctly placed in worktree; main repo working tree returned to its prior untracked-noise state
- **Files modified:** none (in main repo); `docs/admin-setup-android/03-fully-managed-cobo.md` placed in worktree

**4. [Rule 3 - Blocking] Read/Edit tool stale-cache vs CRLF-encoded VALIDATION.md**

- **Found during:** Task 1 (VALIDATION.md update)
- **Issue:** The file uses CRLF line terminators. The Edit tool's old_string match expected LF; initial Edit calls reported success but the changes did not persist on disk. A subsequent Read showed the new content, but `grep` showed the old content.
- **Fix:** Switched to a Python byte-level replace that preserves CRLF line endings exactly. Three replacements applied (frontmatter `wave_0_complete`, two Wave 0 Requirements checkboxes, "No framework install" checkbox). Same approach used for Task 3's VALIDATION.md updates (frontmatter `nyquist_compliant`, three audit-map status rows, six Sign-Off checkboxes, approval line).
- **Outcome:** All updates persisted on disk; verified via Bash grep
- **Files modified:** `.planning/phases/36-fully-managed-cobo-admin/36-VALIDATION.md` (Task 1 commit `2331767` and Task 3 commit `da90644`)

### Architectural / Scope Changes

None. All 17 D-## decisions from CONTEXT.md were honored verbatim. No new content scope was added; no scope was dropped.

## Authentication Gates

None encountered. This is a pure documentation phase — no external services, no API authentication, no tokens.

## Self-Check: PASSED

- [x] `docs/admin-setup-android/03-fully-managed-cobo.md` exists in worktree (verified `ls -la` 33+ KB)
- [x] All 3 task commits exist on the worktree branch (`2331767`, `d0d296d`, `da90644`) — verified `git log --oneline -5`
- [x] All 12 D-10 anchors present in the COBO doc — verified via Dimension 1 audit
- [x] Word count 3684 (in 2800-3800 range) — verified via `wc -w`
- [x] "Google recommends WPCO" = 1 hit; zero "COPE deprecated"/"deprecated COPE"/"SafetyNet" — verified via grep
- [x] All 22 outbound cross-link targets resolve in Phase 34/35 source files — verified via D5 resilient check
- [x] Frontmatter has all 5 keys with correct values; 60-day window 2026-04-21 → 2026-06-20 — verified via head -7
- [x] Zero modifications to forbidden paths — verified via `git diff --name-only HEAD~2 HEAD`
- [x] AECOBO-01/02/03 all have concrete grep evidence — recorded above
- [x] 36-VALIDATION.md updated with `wave_0_complete: true`, `nyquist_compliant: true`, all status rows green, all Sign-Off boxes checked, approval dated 2026-04-21

---

*Plan execution complete. Phase 36 ready for `/gsd-verify-work` and orchestrator merge. Anchor stability contract published for Phase 38 (AEDED), Phase 39 (AEZTE/AEAOSP), Phase 40 (AEL1), and Phase 41 (AEL2) downstream consumption.*
