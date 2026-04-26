---
phase: 34
slug: android-foundation
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-04-21
---

# Phase 34 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.
> This is a **documentation phase** — no traditional test framework. Validation is grep-based mechanical checks + structural audits. See `34-RESEARCH.md` §Validation Architecture for the authoritative source.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Bash + grep + wc + tail + git (no test runner) |
| **Config file** | None — checks are ad-hoc per-deliverable |
| **Quick run command** | `bash scripts/verify-phase-34.sh quick` (authored in Wave 0 as part of Phase 34 plans if present) OR targeted grep per modified file |
| **Full suite command** | `bash scripts/verify-phase-34.sh full` OR sequential execution of the 26 Req-ID grep checks from RESEARCH.md §Validation Architecture |
| **Estimated runtime** | ~15 seconds (grep across 5 small markdown files) |

---

## Sampling Rate

- **After every task commit:** Run targeted grep against the file(s) modified by that task. Word-count check for `docs/android-lifecycle/00-enrollment-overview.md` whenever that file is touched.
- **After every plan wave:** File-existence check on all 5 deliverables; frontmatter presence + 60-day review_by check; anchor integrity check (every `[...](...#anchor)` has a matching anchor).
- **Before `/gsd-verify-work`:** All 26 Req-ID grep checks from §Per-Task Verification Map pass. No SafetyNet references. No raw "supervision" as Android term. No deferred-file links. No v1.0-v1.3 shared file diffs.
- **Max feedback latency:** 15 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 34-01-01 | 01 | 1 | AEBASE-01 | — | No sensitive tokens in glossary | grep | `grep -c "^### " docs/_glossary-android.md` ≥ 19 | ❌ W0 | ⬜ pending |
| 34-01-02 | 01 | 1 | AEBASE-01 | — | Alphabetical index present | grep | First non-frontmatter block contains pipe-delimited links | ❌ W0 | ⬜ pending |
| 34-01-03 | 01 | 1 | AEBASE-01 | — | Five category sections | grep | `grep -c "^## " docs/_glossary-android.md` ≥ 7 (5 categories + Alphabetical Index + Version History) | ❌ W0 | ⬜ pending |
| 34-01-04 | 01 | 1 | AEBASE-01 | — | Version history at bottom | grep | `tail -40 docs/_glossary-android.md` contains `## Version History` | ❌ W0 | ⬜ pending |
| 34-01-05 | 01 | 1 | AEBASE-01 | — | 13 cross-platform callouts | grep | `grep -c "> \*\*Cross-platform note:" docs/_glossary-android.md` ≥ 13 | ❌ W0 | ⬜ pending |
| 34-02-01 | 02 | 1 | AEBASE-02 | — | 5-col comparison table | grep | Table header `\| Mode \| Ownership Model \| Management Scope \| Provisioning Surface \| Appropriate Use Case \|` present | ❌ W0 | ⬜ pending |
| 34-02-02 | 02 | 1 | AEBASE-02 | — | Two Axes narrative | grep | `grep -c "## Two Axes" docs/android-lifecycle/00-enrollment-overview.md` = 1 | ❌ W0 | ⬜ pending |
| 34-02-03 | 02 | 1 | AEBASE-02 | — | iOS-analog subsection | grep | `grep -c "For Admins Familiar with iOS" docs/android-lifecycle/00-enrollment-overview.md` = 1 | ❌ W0 | ⬜ pending |
| 34-02-04 | 02 | 1 | AEBASE-02 | — | Word count 800-1200 | structure | `wc -w docs/android-lifecycle/00-enrollment-overview.md` in range 800-1200 | ❌ W0 | ⬜ pending |
| 34-02-05 | 02 | 1 | AEAUDIT-04 | — | No "supervision" as Android term | grep | Only matches in the iOS-analog subsection (manual review) | ❌ W0 | ⬜ pending |
| 34-03-01 | 03 | 2 | AEBASE-03 | — | Mode × method matrix with mode rows | structure | 5 mode rows × 4 method cols + Notes col | ❌ W0 | ⬜ pending |
| 34-03-02 | 03 | 2 | AEBASE-03 | — | KME mutual-exclusion callout | grep | `grep -c -i "knox mobile enrollment" docs/android-lifecycle/02-provisioning-methods.md` ≥ 1 | ❌ W0 | ⬜ pending |
| 34-03-03 | 03 | 2 | AEBASE-03 | — | Version annotations in cells | grep | `grep -cE "Android [0-9]+" docs/android-lifecycle/02-provisioning-methods.md` ≥ 4 | ❌ W0 | ⬜ pending |
| 34-03-04 | 03 | 2 | AEBASE-03 | — | v1.4.1 KME deferral note | grep | `grep -c "v1.4.1" docs/android-lifecycle/02-provisioning-methods.md` ≥ 1 | ❌ W0 | ⬜ pending |
| 34-04-01 | 04 | 2 | AEBASE-04 | — | 3-col version matrix | structure | Table has 3 columns: Mode, Intune Minimum OS, Notable Version Breakpoints | ❌ W0 | ⬜ pending |
| 34-04-02 | 04 | 2 | AEBASE-04 | — | Android 11 breakpoint detail | grep | `grep -c "^### Android 11" docs/android-lifecycle/03-android-version-matrix.md` = 1 | ❌ W0 | ⬜ pending |
| 34-04-03 | 04 | 2 | AEBASE-04 | — | Android 12 breakpoint detail | grep | `grep -c "^### Android 12" docs/android-lifecycle/03-android-version-matrix.md` = 1 | ❌ W0 | ⬜ pending |
| 34-04-04 | 04 | 2 | AEBASE-04 | — | Android 15 breakpoint detail | grep | `grep -c "^### Android 15" docs/android-lifecycle/03-android-version-matrix.md` = 1 | ❌ W0 | ⬜ pending |
| 34-04-05 | 04 | 2 | AEBASE-04 | — | Non-version breakpoints section | grep | `grep -c "## Non-Version Breakpoints" docs/android-lifecycle/03-android-version-matrix.md` = 1 | ❌ W0 | ⬜ pending |
| 34-04-06 | 04 | 2 | AEBASE-04 | — | No min_android_version frontmatter | grep | `grep -l "min_android_version" docs/android-lifecycle/` returns empty | ❌ W0 | ⬜ pending |
| 34-04-07 | 04 | 2 | AEAUDIT-04 | — | No SafetyNet references | grep | At most 1 match (Non-Version Breakpoints section) | ❌ W0 | ⬜ pending |
| 34-05-01 | 05 | 1 | AEBASE-05 | — | Three H4 portal sub-sections | grep | `#### In Intune admin center`, `#### In Managed Google Play`, `#### In Zero-Touch portal` each present | ❌ W0 | ⬜ pending |
| 34-05-02 | 05 | 1 | AEBASE-05 | — | ZT subtractive-deletion HTML comment | grep | HTML comment mentioning "Delete this entire subsection for BYOD Work Profile and AOSP" | ❌ W0 | ⬜ pending |
| 34-05-03 | 05 | 1 | AEBASE-05 | — | "What breaks if misconfigured" callouts | grep | `grep -c "What breaks if misconfigured" docs/_templates/admin-template-android.md` ≥ 2 | ❌ W0 | ⬜ pending |
| 34-05-04 | 05 | 1 | AEBASE-05 | — | Renewal/Maintenance section | grep | `grep -c "^## Renewal" docs/_templates/admin-template-android.md` = 1 | ❌ W0 | ⬜ pending |
| 34-all-01 | all | gate | AEAUDIT-04 | — | 60-day review_by cycle | structure | For each Android doc: `review_by - last_verified` ≤ 60 days | ❌ W0 | ⬜ pending |
| 34-all-02 | all | gate | AEAUDIT-04 | — | `platform: Android` frontmatter | grep | `grep "^platform: [Aa]ndroid$"` matches all 5 files | ❌ W0 | ⬜ pending |
| 34-all-03 | all | gate | — | — | No deferred-file links | grep | No links to common-issues.md / quick-ref-l1.md / quick-ref-l2.md in any Android doc | ❌ W0 | ⬜ pending |
| 34-all-04 | all | gate | — | — | No v1.0-v1.3 shared file diffs | git | `git diff --name-only` over phase commits touches zero shared files from v1.0-v1.3 | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky · W0 = depends on Wave 0 file creation*

---

## Wave 0 Requirements

All five deliverable files do NOT exist yet — all are created in this phase:

- [ ] `docs/_glossary-android.md` — covers AEBASE-01
- [ ] `docs/_templates/admin-template-android.md` — covers AEBASE-05
- [ ] `docs/android-lifecycle/00-enrollment-overview.md` — covers AEBASE-02
- [ ] `docs/android-lifecycle/02-provisioning-methods.md` — covers AEBASE-03
- [ ] `docs/android-lifecycle/03-android-version-matrix.md` — covers AEBASE-04
- [ ] `docs/android-lifecycle/` directory creation (git auto-creates on first file)

**Framework install:** None — validation uses bash + coreutils + git only.

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| "Management Scope" column rows use Android terminology only (not iOS "Supervised") | AEBASE-02 + AEAUDIT-04 | grep catches the word but cannot distinguish column-header usage (banned for Android) from iOS-analog-subsection usage (allowed) | After enrollment overview is drafted, manually grep `supervis` and confirm matches are ONLY in the "For Admins Familiar with iOS" narrative subsection, not in the comparison table rows. |
| AOSP row carries "out-of-GMS" annotation | AEBASE-02 (D-05) | Semantic check — multiple valid phrasings | Read AOSP row's Provisioning Surface cell; confirm explicit reference to "QR only" AND "no MGP" or equivalent. |
| 13 disambiguation entries match the REQUIREMENTS.md list | AEBASE-01 (D-11) | Naming matches need semantic check, not pattern match | Diff glossary H3 headings against: work profile, supervision (absent), user enrollment, dedicated, corporate identifiers, COBO, COPE, BYOD, DPC, Managed Google Play, afw#setup, WPCO, fully managed. |
| Anchor stability list confirmed before Phase 35-42 reference | All | Requires forward-planning judgment | Confirm the enrollment overview, glossary, and matrix anchors match those Phase 35-42 plans/CONTEXT will cite. Recorded as RESEARCH Assumptions A1-A4. |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 15s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending — planner to confirm before execution begins
