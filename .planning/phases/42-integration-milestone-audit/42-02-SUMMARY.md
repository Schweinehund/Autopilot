---
phase: 42
plan: 02
subsystem: docs-reference
tags: [android, capability-matrix, reference-doc, cross-platform-equivalences, AEAUDIT-01]
requires: [34-*, 35-*, 36-*, 37-*, 38-*, 39-*, 40-*, 41-*]
provides:
  - "docs/reference/android-capability-matrix.md: Android mode × feature capability matrix with 5 domains, 5 modes, Cross-Platform Equivalences H2 (3 paired rows), Key Gaps Summary (8 items), deferral footers (KME v1.4.1 / Full AOSP v1.4.1 / 4-platform v1.5)"
affects:
  - "C5 freshness check scope: docs/reference/android-capability-matrix.md now activates in D-31 scope for the v1.4 milestone audit"
  - "AEAUDIT-01 requirement: primary content artifact delivered; AEAUDIT-01 [x] flip pending REQUIREMENTS.md atomic sync plan (42-07)"
  - "SC#1 binding governance: 3 paired Apple↔Android rows delivered in D-11 order"
tech-stack:
  added: []
  patterns:
    - "iOS capability-matrix 5-domain spine reused verbatim (D-09: Enrollment/Configuration/App Deployment/Compliance/Software Updates)"
    - "🔒 glyph convention reused from ios-capability-matrix.md as 🔒 FM/DO-only / 🔒 Dedicated-only / 🔒 BYOD-only (D-18)"
    - "Filtered-row cross-reference pattern (D-13 Anti-Pattern 1 guard) — cells link to 02-provisioning-methods.md and 03-android-version-matrix.md rather than duplicating grids"
    - "Phase 34 D-03 supervision-narrative template applied to Row 1 Android-side body (from 00-enrollment-overview.md:51-53)"
key-files:
  created:
    - "docs/reference/android-capability-matrix.md (144 lines, 23.5 KB)"
  modified: []
decisions:
  - "Lead paragraph reference to Cross-Platform Equivalences uses text 'Cross-Platform Equivalences section' (not the heading verbatim) so the literal string '## Cross-Platform Equivalences' appears only once in the document (at the actual H2), satisfying the D-15 section-ordering contract and keeping the verification split deterministic."
  - "Row 2 left-side header uses 'iOS Automated Device Enrollment (ADE) via Apple Business Manager' rather than 'Apple Automated Device Enrollment (ADE) via ABM'. The plan verification regex binds on `\\*\\*iOS (Supervision|Automated Device Enrollment|Account-Driven User Enrollment)` (plan lines 318 and 187). Verification is the binding contract; the iOS prefix is correct because ADE is an iOS/iPadOS/macOS-umbrella term, and the body text still names Apple Business Manager, ABM, and Apple-authorized resellers for accuracy."
  - "Key Gaps Summary items #2 and #8 rephrased to remove 'supervised' / 'supervision' tokens while preserving semantic parity with the iOS matrix gap tail. Item 2 now uses 'iOS ADE-gated restriction set'; item 8 uses 'ADE-gated on iOS'. Supervision tokens are now strictly confined to the Cross-Platform Equivalences section (D-12 rule) — verified by the node split-scope scanner."
metrics:
  duration_seconds: 578
  duration_human: "~10 minutes"
  completed: "2026-04-24T14:40:42Z"
  tasks_completed: 2
  files_created: 1
  commits: 2
---

# Phase 42 Plan 02: Android Capability Matrix Summary

One-liner: Delivered `docs/reference/android-capability-matrix.md` — the fourth Intune platform capability matrix (siblings: windows-vs-macos, macos-capability-matrix, ios-capability-matrix) — with a 5-domain × 5-mode Android-first primary matrix, a Cross-Platform Equivalences H2 carrying exactly 3 D-11-ordered paired rows with platform-attributed headers on both sides, an 8-item Key Gaps Summary (iOS-matrix parity), three deferral footers (KME v1.4.1, Full AOSP v1.4.1, 4-platform v1.5 AECOMPARE-01), and a Version History H2 + table. Structural contract: 60-day Android review cycle per D-16 (not 90-day iOS/macOS cycle), zero `SafetyNet` tokens (AEAUDIT-04 C1 precondition, no allow-list entry needed), and supervision tokens strictly confined to the Cross-Platform Equivalences section (D-12).

## Tasks Executed

### Task 1 — Primary matrix (frontmatter + H1 + lead paragraph + 5 domain H2s)
**Commit:** `133010c`

Authored frontmatter (last_verified: 2026-04-24, review_by: 2026-06-23 — exactly 60-day Android cycle per D-16), H1 (`# Intune: Android Capability Matrix — Modes by Feature`), lead paragraph (5 modes named; pointer to Cross-Platform Equivalences section; sibling-matrix links; enrollment-overview link), and the five locked domain H2s (Enrollment / Configuration / App Deployment / Compliance / Software Updates) per D-09.

Each domain carries a 5-mode × N-feature table with the exact D-10 column header: `| Feature | COBO (Fully Managed) | BYOD (Work Profile) | Dedicated (COSU) | ZTE (Zero-Touch) | AOSP |`. Feature coverage per domain:

- **Enrollment** (9 rows): tri-portal admin surface, ownership model, provisioning methods, hardware identity / token model, minimum Android version, user affinity / userless support, DPC identity, Entra join / Shared Device Mode, Android 15 FRP enforcement
- **Configuration** (8 rows): Settings Catalog applicability, restriction profile breadth (`🔒 FM/DO-only`), Configuration Profiles vs OMA-URI (`🔒 AMAPI-backed templates ONLY` for BYOD post-April 2025), Policy Sets, app-config targeting, per-mode restriction count, Wi-Fi auth (cert-only for BYOD), explicit `DDM: N/A (Android uses Play-integrated policy channel instead)` row
- **App Deployment** (7 rows): Managed Google Play channel (mandatory), silent install (`🔒 FM/DO-only` / `🔒 Dedicated-only`), LOB APK delivery, Managed Home Screen (`🔒 Dedicated-only`), app-config, work-profile app isolation (`🔒 BYOD-only`), AMAPI migration footnote
- **Compliance** (6 rows): Play Integrity verdict levels with successor-phrasing of the prior Google attestation API "turned off January 2025" (C1 allow-list-safe keywords); CA attestation; device-based restrictions (`🔒 FM/DO-only`); passcode policy; default posture; L2 runbook link to `21-android-compliance-investigation.md`
- **Software Updates** (4 rows): System update policy, deferral windows (`🔒 FM/DO-only` forced deferral up to 30 days), Play Store app-update control, OEM update enforcement

AOSP column: every cell is a stub-reference per D-10 linking to `06-aosp-stub.md` with zero feature expansion. Canonical-source cells link to `02-provisioning-methods.md` and `03-android-version-matrix.md` per D-13 Anti-Pattern 1 guard — no grid duplication.

### Task 2 — Cross-Platform Equivalences + Key Gaps Summary + See Also + Deferral footers + Version History
**Commit:** `8a8d097`

Appended the remaining sections in the locked D-15 order:

- **## Cross-Platform Equivalences** with the exact D-12 HTML comment guard at section head; 1-paragraph lead prose that explicitly calls out "This section maps three Apple↔Android capability pairs called out in ROADMAP SC#1. It is NOT a 4-platform comparison"; 3 paired rows in D-11 order, each with platform-attributed headers on both sides:
  - Row 1: `**iOS Supervision (ADE-enrolled)**` ↔ `**Android Fully Managed (COBO / DPC owner)**`
  - Row 2: `**iOS Automated Device Enrollment (ADE) via Apple Business Manager**` ↔ `**Google Zero-Touch Enrollment via ZT portal**`
  - Row 3: `**iOS Account-Driven User Enrollment (BYOD iOS 15+)**` ↔ `**Android Work Profile (BYOD, Company Portal enrollment)**`
- **## Key Gaps Summary** — 8 numbered bullets (iOS-matrix parity, documented inline); each uses `**Bold title** — explanation sentence.` format. Items cover: no CLI diagnostic hook, mode-locked restriction scope, tri-portal admin surface, Play Integrity successor, AMAPI-migrated BYOD DPC, no DDM equivalent, AOSP stub-only in v1.4, Dedicated = COSU + MHS.
- **## See Also** — 5 relative-path bullets: sibling iOS + macOS matrices, Android Provisioning Lifecycle, Provisioning Methods, Version Matrix.
- **Deferral footer block** separated from See Also by `---`. Three `### Deferred: …` sub-headings with exact D-14 wording: (a) Knox Mobile Enrollment row (v1.4.1); (b) Full AOSP capability mapping (v1.4.1); (c) 4-platform unified capability comparison (v1.5 AECOMPARE-01) — explicitly states "The paired rows in this matrix are NOT a 4-platform comparison" to preempt encroachment.
- **## Version History** H2 + table (iOS-matrix-style explicit H2, NOT the bare-table macOS form, per D-15 step 13).

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 — Blocking: verification-regex alignment] Row 2 left-side header adjusted from "Apple Automated Device Enrollment" to "iOS Automated Device Enrollment"**
- **Found during:** Task 2 automated verification
- **Issue:** The plan `<verify>` regex binds on `\*\*iOS (Supervision|Automated Device Enrollment|Account-Driven User Enrollment)` (plan line 318). The D-11 / D-14 specifics block used "Apple Automated Device Enrollment (ADE) via ABM". The two conflicted — following the specifics text broke the binding verification contract.
- **Fix:** Changed Row 2 left-side bold header to `**iOS Automated Device Enrollment (ADE) via Apple Business Manager**`. Semantics preserved: ADE is an Apple-umbrella term that applies specifically to iOS, iPadOS, and macOS devices; Apple Business Manager (ABM) is named in full both in the header and throughout the row body. Matches the verification regex; SC#1 intent satisfied.
- **Files modified:** `docs/reference/android-capability-matrix.md`
- **Commit:** `8a8d097` (Task 2)

**2. [Rule 3 — Blocking: D-12 section-scope supervision rule] Lead paragraph, Key Gaps item #2, and Key Gaps item #8 rephrased to remove supervision tokens outside the Cross-Platform Equivalences section**
- **Found during:** Task 1 / Task 2 automated verification
- **Issue:** Initial lead paragraph draft mentioned "iOS Supervision vs Android Fully Managed" inline; initial Key Gaps Summary item #2 said "structurally different from the iOS supervised-only set"; item #8 said "Apple single-app mode (which requires supervision...)". The D-12 rule (and its verification node-script — see plan lines 312-320) requires supervision tokens to appear ONLY within the Cross-Platform Equivalences section. Outside-section occurrences constituted D-12 violations.
- **Fix:**
  - Lead paragraph: rewrote to say "For Apple↔Android capability analogs across these modes, see the [Cross-Platform Equivalences section](#cross-platform-equivalences) below" — no supervision token.
  - Key Gaps item #2: rewrote to "structurally different from the iOS ADE-gated restriction set (see the Cross-Platform Equivalences section for the full cross-platform mapping)."
  - Key Gaps item #8: rewrote to "Apple single-app mode (which is ADE-gated on iOS and configures the app directly)".
- **Files modified:** `docs/reference/android-capability-matrix.md`
- **Commit:** `8a8d097` (Task 2 — committed alongside the main Task 2 content)

**3. [Rule 3 — Blocking: lead-paragraph anchor-link collision with verification split] Lead paragraph anchor link text changed**
- **Found during:** Task 2 automated verification
- **Issue:** Initial lead paragraph draft used `[## Cross-Platform Equivalences](#cross-platform-equivalences)` as the anchor link label. The plan verification `node -e` script splits on the literal string `## Cross-Platform Equivalences` to isolate the section for regex scanning. With the label in the lead paragraph, the split matched the first occurrence inside the markdown link label (not the H2), yielding empty results from the pair-header regex.
- **Fix:** Changed the link label to `[Cross-Platform Equivalences section](#cross-platform-equivalences)`. The literal string `## Cross-Platform Equivalences` now appears exactly once in the file — at the actual H2 on line 72. The split is deterministic; verification passes.
- **Files modified:** `docs/reference/android-capability-matrix.md`
- **Commit:** `8a8d097`

No user permission required for Rules 1-3 fixes. No architectural Rule-4 deviations.

## Self-Check

### File existence
- FOUND: `docs/reference/android-capability-matrix.md` (144 lines, 23,535 bytes)

### Commits
- FOUND: `133010c` — `docs(42-02): add android-capability-matrix.md primary matrix — 5 domains, 5 modes (part 1/2)`
- FOUND: `8a8d097` — `docs(42-02): add android-capability-matrix.md Cross-Platform Equivalences + Key Gaps + deferral footers (part 2/2)`

### Structural verification (plan `<output>` requirements)

**H2 count + ordering check (9 headings in D-15 order):**

| # | H2 | Line |
|---|----|------|
| 1 | `## Enrollment` | 13 |
| 2 | `## Configuration` | 27 |
| 3 | `## App Deployment` | 40 |
| 4 | `## Compliance` | 52 |
| 5 | `## Software Updates` | 63 |
| 6 | `## Cross-Platform Equivalences` | 72 |
| 7 | `## Key Gaps Summary` | 90 |
| 8 | `## See Also` | 103 |
| 9 | `## Version History` | 140 |

All 9 H2s present, in the D-15 locked order. The 3 deferral footers (`### Deferred: Knox Mobile Enrollment row`, `### Deferred: Full AOSP capability mapping`, `### Deferred: 4-platform unified capability comparison`) sit between See Also and Version History, separated by `---`.

**Cross-Platform Equivalences supervision audit** (from `grep -nEi '\bsupervis(ion|ed|ory)\b' docs/reference/android-capability-matrix.md`):

```
74:<!-- AEAUDIT-04: "supervision" in this section MUST appear only as an iOS-attributed
76:     "Dedicated" / "ZTE" — never "supervised". Each paired row MUST attribute the
77:     platform in the column header (e.g., "iOS Supervision" not "Supervision"). -->
79:This section maps three Apple↔Android capability pairs called out in ROADMAP SC#1. …
83:| **iOS Supervision (ADE-enrolled)** | **Android Fully Managed (COBO / DPC owner)** |
84:| iOS Supervision is a permanent per-device state … [row body]
```

All 6 supervision-token occurrences are within lines 74-84. The Cross-Platform Equivalences section spans lines 72-88 (H2 at 72, ends before Key Gaps Summary H2 at line 90). Every occurrence is either in the HTML comment guard, in the lead prose that explicitly names the section-scoped rule, in an iOS-attributed pair header (`**iOS Supervision (ADE-enrolled)**`), or in the Row 1 body where supervision is either iOS-attributed ("iOS Supervision", "iOS supervised capability set", "supervised-only surface" — all on the iOS side) or explicitly negated as inapplicable to Android ("'Supervision' is not an Android management term", "Android does not use 'supervised' or 'unsupervised' as device states"). D-12 satisfied.

**SafetyNet semantic zero** (AEAUDIT-04 C1 precondition): `grep -c 'SafetyNet' docs/reference/android-capability-matrix.md` = **0**. No allow-list entry needed for this file; the Compliance domain Play Integrity row uses "successor to the prior Google attestation API, turned off January 2025" phrasing per D-27 allow-list-safe keywords (`successor`, `turned off`).

**File length and final token-count signals:**
- Lines: 144 (plan target ≥ 140) ✓
- Bytes: 23,535
- Frontmatter: 60-day Android review cycle (review_by 2026-06-23 − last_verified 2026-04-24 = 60 days) ✓
- AOSP stub-reference links: 33 occurrences of `06-aosp-stub.md` ✓ (plan target ≥ 5)
- `02-provisioning-methods.md` links from cells: 1 occurrence per domain ≥ 1 ✓
- `03-android-version-matrix.md` links from cells: 3 occurrences ✓
- 🔒 glyph usage: present in Configuration / App Deployment / Compliance / Software Updates cells as `🔒 FM/DO-only`, `🔒 Dedicated-only`, `🔒 BYOD-only`, `🔒 AMAPI-backed templates ONLY`, `🔒 Certificate-based ONLY` ✓

**Plan verification blocks (Task 1 and Task 2 `<verify>` node scripts):**
- Task 1 node -e: `PASS: frontmatter valid, 60-day cycle, 5 domains, mode header, zero SafetyNet`
- Task 2 node -e: `PASS: section ordering valid, guard present, 3 pairs, zero outside-section supervision, all 3 deferral footers, zero SafetyNet`

## Self-Check: PASSED

## Threat Flags

None. This plan creates a pure documentation artifact (markdown reference doc). No new network endpoints, auth paths, file-access patterns, or schema changes at trust boundaries.

## Known Stubs

None. The file is complete per AEAUDIT-01 / SC#1 intent. AOSP column cells ARE stub references by design (D-10 explicit choice) — they link to `docs/admin-setup-android/06-aosp-stub.md` which is itself a Phase 39 self-certified stub (1089 body words vs Phase 39 envelope 600-900, tracked as tech debt for v1.4.1 / C3 informational check). This is documented in D-14's `### Deferred: Full AOSP capability mapping` footer within the new matrix file.
