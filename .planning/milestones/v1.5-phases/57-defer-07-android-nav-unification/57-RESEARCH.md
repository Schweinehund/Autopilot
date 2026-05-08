# Phase 57: DEFER-07 Android Nav Unification — Research

**Date:** 2026-04-30
**Scope:** Verification of plan-time research flags from CONTEXT.md (NOT a from-scratch domain pass — CONTEXT.md adversarial review already locked all 34 D-NN architectural decisions)
**Confidence:** HIGH (all 12 verification items resolved against in-repo files; no external/web research required)

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions (D-01 .. D-34)

All 34 D-NN decisions in CONTEXT.md are LOCKED via 4-gray-area adversarial review (Finder/Adversary/Referee scored pattern, parallel-4-agent mode). Net surviving defect score: GA-1 winner 1A=9pts (STRONG), GA-2 winner 2C=5pts (STRONG, tiebreaker), GA-3 winner 3C=5pts (STRONG), GA-4 winner 4C=1pt (STRONG). Three 2x penalty triggers fired (2 against 1C, 1 against 4B/4D).

Summary (full text in CONTEXT.md `<decisions>` block):

- **D-01..05** — `docs/index.md` Android H2 expansion: 3 sub-tables (L1=4 rows / L2=4 rows / Admin=3 rows) matching iOS Phase 32 structural depth verbatim; Cross-Platform References update (lines 173+) adds Android Provisioning Lifecycle + Android Capability Matrix entries; platform coverage blockquote at line 9 receives Android-bearing one-line edit. NO operations cross-references (Phase 59 owns that), NO admin-setup-android per-mode enumeration at hub level.
- **D-06..12** — `docs/common-issues.md` Android Enterprise Failure Scenarios H2 with 8 H3s (1:1 to runbooks 22-29) using `### Android: <Name>` Title-Case prefix pattern; section-top decision-tree banner mirroring macOS:162/iOS:219; 2 reciprocal-disambiguation callouts (on H3-24 and H3-27 only); 1 cross-platform iOS reciprocal banner (on H3-25 Compliance Blocked only); Choose Your Platform TOC at lines 14-18 receives one additive bullet; platform coverage blockquote at line 9 receives Android-bearing one-line edit.
- **D-13..20** — `docs/quick-ref-l1.md` Android Quick Reference H2 with 4-part substructure (`### Top Checks` / `### Android Escalation Triggers` / `### Android Decision Tree` / `### Android Runbooks`) and inline `[Mode]` PREFIX tags on every Top Check / Escalation Trigger / Runbook row. Mode tag vocabulary LOCKED: `[BYOD]`, `[ZTE]`, `[AOSP]`, `[Knox]`, `[All GMS]`. Top Checks count: 5 recommended (AOSP separate from ZTE/Knox); 8-row Runbooks list (22-29 inclusive).
- **D-21** — `docs/l1-runbooks/00-index.md:64-80` Android L1 Runbooks table receives ONE additive row for runbook 28 (Knox); Mode column literal verified at plan-time (see Verification Item 2 below).
- **D-22..28** — `docs/quick-ref-l2.md` Android Quick Reference H2 with 4-part substructure (3-method log collection table / Key Intune Portal Paths Android L2 / Play Integrity Verdict Reference compact 3-row pointer table / Android Investigation Runbooks 6-link list with iOS-style ` -- ` disambiguation per row). Play Integrity = 3 verdicts ONLY (no `MEETS_VIRTUAL_INTEGRITY`); cross-link to Phase 54 SSoT `04-android-patch-delivery.md#play-integrity-attestation`; single inline `> ⚠️` deadline pointer (NOT three-layer Phase 54 D-13 pattern). PITFALL-7 firewall + V-57-21 NEGATIVE regression-guard.
- **D-29..31** — `check-phase-57.mjs` ships 20-26 V-57-NN structural assertions; file-reads-only / no-shared-module / regex-based; mirrors Phase 56 validator structure exactly. SINGLE atomic commit covers all 6 deliverables (4 hub edits + L1 index Knox row + validator). VERIFICATION.md ships separate commit.
- **D-32..34** — Pre-commit gate (3 validators + 4 file-level checks); hardcoded H2/H3 anchor pinning (brittleness trade-off accepted); plan order = pre-edit anchor inventory → 6 plans (57-01..06) → pre-commit gate → atomic commit → VERIFICATION.md.

### Claude's Discretion (verified at plan-time per this RESEARCH.md)

- Top Checks count (4 vs 5; D-18) — recommend 5
- ZTE/Knox portal-check consolidation vs split (D-18) — plan-author judgment
- Mode-tag value for L1 index Knox row (D-21) — VERIFIED below as `KME` literal in runbook 28 frontmatter; Mode column display literal recommended `Knox only` matching D-14 vocabulary
- 3-method log collection table compression (D-27) — plan-author judgment
- Key Intune Portal Paths Android L2 row count (3-5; D-28) — plan-author judgment
- V-57-15 Mode-tag literal-coverage scope strictness (Top-Checks-only vs anywhere) — plan-author judgment
- VERIFIED: 4th `MEETS_VIRTUAL_INTEGRITY` verdict NOT in Phase 54 SSoT (Verification Item 1 below)
- VERIFIED: Knox L1 runbook 28 frontmatter `applies_to: KME` (Verification Item 2 below)

### Deferred Ideas (OUT OF SCOPE)

- Operations cross-references in docs/index.md Android H2 → Phase 59
- Per-mode admin-setup-android enumeration in docs/index.md → admin-setup-android/00-overview.md owns this
- Mode-grouped quick-ref-l1.md sub-H3 sections → CLEAN-03 4-part is locked
- `MEETS_VIRTUAL_INTEGRITY` 4th verdict → fictional; verified absent from SSoT
- Full Play Integrity verdict + escalation routing in quick-ref-l2.md → PITFALL-7 firewall (locked at Phase 54 SSoT)
- HARD-DEADLINE three-layer pattern in quick-ref-l2.md → Phase 54 D-13 source-file-bound
- Mandatory cross-platform reciprocal banners on every Android H3 → D-10 limits to Compliance Blocked only
- Knox runbook 28 admin Setup Sequence content → admin-setup-android/07-knox-mobile-enrollment.md owns
- AOSP per-OEM L1 runbook split → out-of-Phase-57; v1.4.1 single-file design
- Per-OEM admin-setup files 09-13 hub linking → admin-setup-android/00-overview.md owns
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| CLEAN-01 | Admin can land on `docs/index.md` and navigate Android L1 / L2 / Admin Setup resources at iOS-Phase-32 structural depth | iOS sub-table architecture verified at `docs/index.md:131-164` (Verification Item 3 + Pattern Validation §1); Android lifecycle entry point `docs/android-lifecycle/00-enrollment-overview.md` confirmed (Verification Item 4); Android admin-setup hub `docs/admin-setup-android/00-overview.md` confirmed with tri-portal Mermaid + 6 mode branches (Verification Item 5); Android capability matrix confirmed (Verification Item 6) |
| CLEAN-02 | L1 responder finds Android symptom routing in `docs/common-issues.md` for all 8 v1.4.1 scenario categories | iOS 6-H3 + reciprocal disambiguation pattern verified at `common-issues.md:212-265` (Verification Item 3 + Pattern Validation §4); 8 L1 runbook filenames 22-29 verified on disk (Verification Item 8); Choose Your Platform TOC verified at `common-issues.md:14-18` (Verification Item 12) |
| CLEAN-03 | L1 responder can use Android quick-reference card in `docs/quick-ref-l1.md` (top checks, escalation triggers, decision tree link, runbook list — mode-first per v1.4 triage tree) | iOS 4-part quick-ref substructure verified at `quick-ref-l1.md:117-148` (Verification Item 3 + Pattern Validation §2); Mode tag vocabulary L1-index Mode column verified at `l1-runbooks/00-index.md:70-76` (Verification Item 11); 8 L1 runbook filenames verified (Verification Item 8) |
| CLEAN-04 | L2 engineer can use Android quick-reference card in `docs/quick-ref-l2.md` (3-method log collection, Intune portal paths, Play Integrity verdict reference, investigation runbook list) | iOS 4-part quick-ref-l2 substructure verified at `quick-ref-l2.md:182-232` (Verification Item 3 + Pattern Validation §3); Phase 54 Play Integrity SSoT anchors verified (Verification Item 1); 3-method log collection method names verified verbatim (Verification Item 10); 6 L2 runbook filenames 18-23 verified on disk (Verification Item 8) |
</phase_requirements>

## Project Constraints (from CLAUDE.md)

This phase is documentation-only. CLAUDE.md scope (PowerShell modules / Python FastAPI / TypeScript React / Microsoft Graph API integration) does NOT apply to Phase 57 deliverables — Phase 57 is a 4-file documentation hub-nav retrofit + L1-index patch + validator. Project security notes (no commit `.env`, no commit credentials) are preserved by default since Phase 57 touches only `docs/**/*.md` + `scripts/validation/check-phase-57.mjs`.

## Verified Plan-Time Research Flags

### 1. Phase 54 Play Integrity SSoT anchors — PASS

**Source:** `docs/operations/patch-management/04-android-patch-delivery.md`

- **`{#play-integrity-attestation}` anchor** — VERIFIED present at line 50: `## Play Integrity Attestation {#play-integrity-attestation}`
- **3 verdicts present (NOT 4)** — VERIFIED at lines 55-59:
  - `MEETS_BASIC_INTEGRITY` (line 57)
  - `MEETS_DEVICE_INTEGRITY` (line 58)
  - `MEETS_STRONG_INTEGRITY` (line 59)
- **`MEETS_VIRTUAL_INTEGRITY` ABSENT** — VERIFIED no occurrence anywhere in this file. The fictional 4th verdict that triggered the GA-4 2x penalty is correctly absent from SSoT.
- **`{#deadlines-cutover-dates}` anchor** — VERIFIED present at line 76: `## Deadlines & Cutover Dates {#deadlines-cutover-dates}`

**Implication for Phase 57:** D-23 cross-link target `04-android-patch-delivery.md#play-integrity-attestation` resolves; D-23 trailing pointer line target `#deadlines-cutover-dates` resolves; D-25 single inline pointer to deadlines H2 is a single-anchor link. V-57-21 NEGATIVE regression-guard for `MEETS_VIRTUAL_INTEGRITY` correctly enforces Phase 54 SSoT shape.

### 2. Knox L1 runbook 28 frontmatter `applies_to:` — PASS (literal = `KME`)

**Source:** `docs/l1-runbooks/28-android-knox-enrollment-failed.md:1-7`

```yaml
---
last_verified: 2026-04-25
review_by: 2026-06-24
applies_to: KME
audience: L1
platform: Android
---
```

**Exact `applies_to:` value:** `KME` (line 4)

**Body context line 15:** `**Applies to KME only (Samsung).**` — confirms Samsung-specific scope.

**Implication for Phase 57 D-21:** L1 index Knox row Mode column should display `Knox only` (CONTEXT.md D-14 vocabulary recommendation). Per CONTEXT.md D-21 phrasing ("recommend Mode-column value `Knox only` matching D-14 tag vocabulary"), the recommendation stands; the runbook frontmatter literal `KME` is the source-of-truth scoping value, but the L1-index Mode-column display literal is `Knox only` to match the user-facing Mode-tag vocabulary used in `docs/l1-runbooks/00-index.md:70-76` (Mode column reads `BYOD only`, `ZTE only`, `AOSP only`, `All GMS modes` — so `Knox only` is the structurally-consistent display literal).

### 3. iOS H2 anchor stability for V-57-25 NEGATIVE regression-guard — PASS

All 4 iOS H2 anchor literals VERIFIED unchanged since 2026-04-17 Phase 32 close:

| File | Line | Literal H2 | Anchor (GFM-derived) |
|------|------|-----------|---------------------|
| `docs/index.md` | 131 | `## iOS/iPadOS Provisioning` | `#iosipados-provisioning` |
| `docs/common-issues.md` | 212 | `## iOS/iPadOS Failure Scenarios` | `#iosipados-failure-scenarios` |
| `docs/quick-ref-l1.md` | 117 | `## iOS/iPadOS Quick Reference` | `#iosipados-quick-reference` |
| `docs/quick-ref-l2.md` | 182 | `## iOS/iPadOS Quick Reference` | `#iosipados-quick-reference` |

**Note on quick-ref-l2.md line 182:** CONTEXT.md cites line 232 as the boundary; verified at line 182 (within the canonical-refs `:182-232` Phase 32 deliverable region). No drift detected.

**Implication for Phase 57 D-33 + V-57-25:** Validator can hard-code these 4 literals as exact-string assertions. Append-only contract is preserved if Phase 57 H2s land AFTER these iOS H2s.

### 4. Android lifecycle file paths — PASS

`docs/android-lifecycle/00-enrollment-overview.md` exists with frontmatter `audience: all`, `platform: Android`, last_verified 2026-04-21. H1 `# Android Enterprise Enrollment Overview`. Platform-gate banner cross-links to iOS / macOS / Windows analogs at line 11.

**Implication for Phase 57 D-02 / D-03 / D-04 / D-05:** Direct cross-link target resolves. This is the structurally-correct entry point analogous to iOS `ios-lifecycle/00-enrollment-overview.md`.

**Sibling inventory (informational, not modified):**
- `docs/android-lifecycle/00-enrollment-overview.md` (entry point)
- `docs/android-lifecycle/01-android-prerequisites.md` (concept-only orientation)
- `docs/android-lifecycle/02-provisioning-methods.md` (mode-specific provisioning detail)
- `docs/android-lifecycle/03-android-version-matrix.md` (version-axis reference)

### 5. Android admin-setup hub structure — PASS

`docs/admin-setup-android/00-overview.md` exists with frontmatter `audience: admin`, `platform: Android`, last_verified 2026-04-25.

**Tri-portal Mermaid diagram:** VERIFIED at lines 25-37, includes 6 mode branches:
1. COBO / BYOD WP / Dedicated → MGP → Phase 36 / 37 / 38 admin guides
2. Zero-Touch Enrollment → MGP + ZT portal → Phase 39 ZTE
3. AOSP → Phase 39 AOSP stub
4. Knox - KME Samsung-only → 07-knox-mobile-enrollment.md (added in Phase 44 changelog 2026-04-25)

**Per-mode setup-sequence enumeration:** VERIFIED at lines 39-43 (3 numbered items: Managed Google Play Binding / Zero-Touch Portal Configuration / Knox Mobile Enrollment).

**Per-path prerequisites:** VERIFIED at lines 49-79: GMS-Path / ZTE-Path / KME-Path / AOSP-Path / Shared.

**Coverage assessment:** All Phase 57-relevant enrollment modes covered (BYOD WP, COBO, Dedicated/COSU, ZTE, Knox, AOSP). COPE/WPCO mode is explicitly enumerated in `android-capability-matrix.md` columns but admin-setup-android/00-overview.md focuses on the 5 v1.4-canonical modes + Knox Phase 44 addition. **No gaps for Phase 57 hub-nav purposes** — D-04 single-overview-link pattern routes admins to this page where the per-mode tri-portal navigation is exhaustive.

### 6. Android capability matrix — PASS

`docs/reference/android-capability-matrix.md` exists with frontmatter `audience: admin`, `platform: Android`, `applies_to: both`, last_verified 2026-04-25.

**Deferred-4-platform footer stub:** VERIFIED present at lines 132-139 with anchor `<a id="deferred-4-platform-unified-capability-comparison"></a>` and H3 `### Deferred: 4-platform unified capability comparison`. Cross-references AECOMPARE-01 deferral rationale.

**Implication for Phase 57 D-04:** Phase 57 only LINKS to this matrix (Admin sub-table row 3). It does NOT modify. ROADMAP:343 is correct that Phase 58 will retire the deferred-4-platform footer stub and replace with forward-link to the new `4-platform-capability-comparison.md` (CLEAN-05) — but that work is Phase 58, not Phase 57.

### 7. check-phase-56.mjs structure for check-phase-57.mjs template inheritance — PASS

**Source:** `scripts/validation/check-phase-56.mjs` (571 lines total)

**Module shape (lines 1-21):**
- Shebang: `#!/usr/bin/env node`
- Module type: ES Module (`import { readFileSync, existsSync, readdirSync } from 'node:fs';` lines 10-12)
- CLI flag: `--verbose` (line 15)
- Helper: `readFile(relPath)` returns content or `null`-on-missing (lines 17-21)

**Pinned-anchor-string convention (lines 23-32):** Each pinned file path is a `const` declaration at top of file. CONTEXT.md D-21 ("Pinned anchor strings — same-commit validator update required on any rename") drives this.

**Check object shape (line 36+):**
```javascript
const checks = [
  {
    id: 1, name: "V-56-01: 00-overview.md exists",
    run() {
      const c = readFile(OV);
      if (c === null) return { pass: false, detail: "File missing: " + OV };
      return { pass: true, detail: c.length + " bytes" };
    }
  },
  ...
];
```

Each check returns `{ pass: bool, detail: string }` (or `{ skipped: true, detail: ... }` for skipped checks).

**Output convention (lines 545-567):**
- `padLabel(s)` formats labels to 64-char width with dot-fill
- Each check prints `[id/total] name ... PASS|FAIL|SKIPPED -- detail`
- Final `Summary: N passed, M failed, K skipped`
- Exit code: `process.exit(failed > 0 ? 1 : 0)` (line 570)

**Pattern characteristics confirmed:**
- File-reads-only (no shell, no glob, no AST)
- No shared module (single file; no `require`/`import` of project utilities)
- Regex-based markdown parsing (e.g., line 526 `const banned = /\b(TBD|TODO|FIXME|XXX|PLACEHOLDER)\b/`)
- Frontmatter parsing via `match(/^---\n([\s\S]*?)\n---/m)` pattern (line 102)
- TBD-scan with code-block + Version History stripping (lines 521-542)

**Implication for Phase 57 D-30:** `check-phase-57.mjs` mirrors this exact structure. Recommended top-of-file constants:
```javascript
const INDEX_MD = "docs/index.md";
const COMMON_MD = "docs/common-issues.md";
const QR_L1 = "docs/quick-ref-l1.md";
const QR_L2 = "docs/quick-ref-l2.md";
const L1_INDEX = "docs/l1-runbooks/00-index.md";
const VAL = "scripts/validation/check-phase-57.mjs";
const PHASE54_SSOT = "docs/operations/patch-management/04-android-patch-delivery.md";
const HUB_FILES = [INDEX_MD, COMMON_MD, QR_L1, QR_L2];
```

V-57-26 TBD scan should follow Phase 56 V-56-32 pattern (strip code blocks + Version History + Changelog before regex match).

### 8. Android L1 + L2 runbook filenames — PASS (all 14 files exist)

**L1 runbooks (8 files at `docs/l1-runbooks/`):**
- `22-android-enrollment-blocked.md` ✓
- `23-android-work-profile-not-created.md` ✓
- `24-android-device-not-enrolled.md` ✓
- `25-android-compliance-blocked.md` ✓
- `26-android-mgp-app-not-installed.md` ✓
- `27-android-zte-enrollment-failed.md` ✓
- `28-android-knox-enrollment-failed.md` ✓
- `29-android-aosp-enrollment-failed.md` ✓

**L2 runbooks (6 files at `docs/l2-runbooks/`):**
- `18-android-log-collection.md` ✓
- `19-android-enrollment-investigation.md` ✓
- `20-android-app-install-investigation.md` ✓
- `21-android-compliance-investigation.md` ✓
- `22-android-knox-investigation.md` ✓
- `23-android-aosp-investigation.md` ✓

All 14 link targets in D-07 / D-09 / D-17 / D-26 resolve to existing files.

### 9. operations/patch-management/04-android-patch-delivery.md cross-platform inline blockquote — PASS

**Source:** `docs/operations/patch-management/04-android-patch-delivery.md:9-14`

```markdown
> **Platform applicability:** This guide is Android-specific (Google Play patch delivery + Play
> Integrity MEETS_STRONG_INTEGRITY enforcement + Zebra LifeGuard OEM + Samsung KSP). For the
> cross-platform overview, see [Patch Management Overview](00-overview.md).
> **Windows:** See [Windows WUfB Rings](01-windows-wufb-rings.md).
> **macOS:** See [macOS DDM Update Enforcement](02-macos-update-enforcement.md).
> **iOS/iPadOS:** See [iOS Update Lifecycle](03-ios-update-lifecycle.md).
```

**Implication:** Phase 54 D-04 `> **Platform applicability:**` token discipline is preserved at line 9. Phase 57 quick-ref-l2.md cross-link target (D-23) resolves into this file with the cross-platform context already in place.

### 10. 3-method log collection method names — PASS (verbatim verified)

**Source:** `docs/l2-runbooks/18-android-log-collection.md:31-33`

| Verbatim Method Name | Line |
|----------------------|------|
| `Company Portal Logs` | 31 |
| `Microsoft Intune App Logs` | 32 |
| `adb logcat` | 33 |

Decision Matrix at lines 31-33 establishes these as bold-prefixed table-row identifiers (e.g., `| **Company Portal Logs** | BYOD pre-AMAPI: primary; ...`). Section H2s at lines 48 / 83 / 120 reinforce: `## Section 1: Company Portal Logs` / `## Section 2: Microsoft Intune App Logs` / `## Section 3: adb logcat`.

**Implication for Phase 57 D-27 + V-57-19:** Validator literal-token regex can hard-code these 3 strings:
```javascript
/Company Portal Logs/.test(qr_l2_body) &&
/Microsoft Intune App Logs/.test(qr_l2_body) &&
/adb logcat/.test(qr_l2_body)
```

### 11. L1 index Knox row gap — PASS (gap is real)

**Source:** `docs/l1-runbooks/00-index.md:64-77`

Android L1 Runbooks H2 + table at lines 64-77. Table rows present:
- 22 Enrollment Blocked (line 70) ✓
- 23 Work Profile Not Created (line 71) ✓
- 24 Device Not Enrolled (line 72) ✓
- 25 Compliance Blocked (line 73) ✓
- 26 MGP App Not Installed (line 74) ✓
- 27 ZTE Enrollment Failed (line 75) ✓
- **28 Knox Enrollment Failed — MISSING** ✗
- 29 AOSP Enrollment Failed (line 76) ✓

**Confirmed:** Runbook 28 file exists on disk (Verification Item 8) but is missing from the L1 index table. The 7-row table jumps from runbook 27 to runbook 29 without the Knox entry.

**Existing intro text at line 66:** `L1 runbooks for the **six most common** Android Enterprise enrollment and compliance failure scenarios.` — this "six" must be updated to "**eight**" (Phase 44 added Knox runbook 28; Phase 45 added AOSP runbook 29; intro text was not updated). Phase 57 D-21 mentions only the table-row addition; the intro-text "six" → "eight" update should be folded into D-21 scope as a same-commit edit since it's the same reading-comprehension contract.

**Recommended Knox row format** (matching existing rows):
```markdown
| [28: Android Knox Enrollment Failed](28-android-knox-enrollment-failed.md) | Samsung KME provisioning failed (device booted to consumer setup, looped, or never arrived in Intune) | Knox only |
```

Insertion position: between row 27 (line 75) and row 29 (line 76), in numerical order.

**Implication for Phase 57 D-21 + V-57-24:** Validator V-57-24 literal-token check (`28-android-knox-enrollment-failed.md` link presence in `00-index.md` Android L1 Runbooks H2 region) is straightforward.

### 12. Choose Your Platform TOC at `common-issues.md:14-18` — PASS

**Source:** `docs/common-issues.md:14-18`

```markdown
## Choose Your Platform

- [Windows Autopilot Issues](#windows-autopilot-issues) -- Windows device provisioning failures (APv1 and APv2)
- [macOS ADE Failure Scenarios](#macos-ade-failure-scenarios) -- macOS enrollment and management failures
- [iOS/iPadOS Failure Scenarios](#iosipados-failure-scenarios) -- iOS/iPadOS enrollment and management failures via Intune
```

**Format pattern (verified):**
- Bullet list (`- `)
- `[Anchor Text](#kebab-case-anchor)` link to in-document H2 anchor
- ` -- ` (em-dash spaced) separator
- One-line description

**Recommended Phase 57 D-11 additive bullet (4th entry):**
```markdown
- [Android Enterprise Failure Scenarios](#android-enterprise-failure-scenarios) -- Android enrollment and management failures via Intune
```

**Note on platform coverage blockquote at line 9:** D-12 cites this as a one-line edit. Verified line 9: `> **Platform coverage:** This guide covers Windows Autopilot (classic/APv1 and Device Preparation/APv2), macOS ADE, and iOS/iPadOS provisioning issues.` — Phase 57 inserts ", and Android Enterprise" before " provisioning issues."

## Pattern Validation

### 1. iOS Phase 32 sub-table architecture in `docs/index.md` (file:line for planner)

**Source:** `docs/index.md:131-164`

| Sub-section | H3 Line | Row Count | Row Pattern |
|-------------|---------|-----------|-------------|
| H2: `## iOS/iPadOS Provisioning` | 131 | — | Intro paragraph at line 133 with glossary + lifecycle cross-links |
| `### Service Desk (L1)` | 135 | 4 rows (lines 139-142) | Lifecycle Overview / Triage Decision Tree / L1 Runbooks Index / L1 Quick-Reference Card |
| `### Desktop Engineering (L2)` | 144 | 5 rows (lines 148-152) | Enrollment Path Overview / ADE Lifecycle / Log Collection Guide / L2 Runbooks Index / L2 Quick-Reference Card |
| `### Admin Setup` | 154 | 7 rows (lines 158-163; one row groups 3 links per cell) | Admin Setup Overview / ADE Lifecycle / 3-prereq grouped row / 3-config grouped row / 3-enrollment grouped row / Capability Matrix |

**Phase 57 mirror per D-02 / D-03 / D-04:**
- L1 = 4 rows (matches iOS exactly)
- L2 = 4 rows (deviates from iOS-5 because Android has only `00-enrollment-overview.md`, no separate ADE-Lifecycle analog)
- Admin = 3 rows (matches macOS:121-127 single-overview-link discipline; not iOS-7-grouped)

**Existing Android H2 stub** (line 167-169):
```markdown
## Android Enterprise Provisioning

Troubleshooting, investigation, and setup guides for Android Enterprise provisioning through Microsoft Intune. For terminology, see the [Android Enterprise Provisioning Glossary](_glossary-android.md). For enrollment paths, see the [Android Provisioning Lifecycle](android-lifecycle/00-enrollment-overview.md).
```

Phase 57 PRESERVES this intro paragraph (line 169) and INSERTS 3 sub-H3s + sub-tables between line 169 and line 171 (current `---` separator).

### 2. iOS quick-ref-l1.md 4-part substructure

**Source:** `docs/quick-ref-l1.md:117-148`

| Sub-H3 | Line | Item Count | Format |
|--------|------|-----------|--------|
| `## iOS/iPadOS Quick Reference` (H2) | 117 | — | H2 |
| `### Top Checks` | 121 | 4 numbered items (lines 123-126) | `**Bold question** -- portal-path detail` |
| `### iOS Escalation Triggers` | 128 | 5 dash bullets (lines 130-134) | `- Symptom --> **Escalate L2** (collect: ...)` |
| `### iOS Decision Tree` | 136 | 1 bullet (line 138) | `- [iOS Triage Decision Tree](decision-trees/07-ios-triage.md) -- start here for iOS/iPadOS failures` |
| `### iOS Runbooks` | 140 | 6 bullets (lines 142-147) | `- [iOS Name](l1-runbooks/NN-ios-*.md) -- one-line annotation` |

**Phase 57 D-13..20 mirror:**
- H2 anchor: `## Android Enterprise Quick Reference` (Title-Case mirroring iOS H2 phrasing)
- Sub-H3 #1: `### Top Checks` (NOT `### Android Top Checks`) — matches iOS verbatim per D-16
- Sub-H3s #2-4: `### Android Escalation Triggers` / `### Android Decision Tree` / `### Android Runbooks`
- Top Checks: 5 numbered items (recommended; D-18 plan-author choice 4 vs 5)
- Escalation Triggers: 4-5 dash bullets with `[Mode]` prefix (D-19)
- Decision Tree: 1 bullet linking to `decision-trees/08-android-triage.md` (D-20)
- Runbooks: 8 bullets linking to runbooks 22-29 with `[Mode]` prefix (D-17)

### 3. iOS quick-ref-l2.md 4-part substructure

**Source:** `docs/quick-ref-l2.md:182-232`

| Sub-H3 | Line | Item Count | Format |
|--------|------|-----------|--------|
| `## iOS/iPadOS Quick Reference` (H2) | 182 | — | H2 |
| **Importance callout** at line 186 | 186 | 1 blockquote | Sets up "no CLI diagnostic tool" framing |
| `### iOS Diagnostic Data Collection (3 methods)` | 188 | 3-row table (lines 190-194) | columns: Method / Who Triggers / L2 Access Path / When to Use |
| `### Key Intune Portal Paths (iOS L2)` | 198 | 5-row table (lines 200-206) | columns: Path / Purpose |
| `### Sysdiagnose Trigger Reference (iOS/iPadOS)` | 210 | Procedure narrative + 5 numbered steps + supervised-compatibility callout | Apple-specific procedure detail |
| `### iOS Investigation Runbooks` | 226 | 4 dash bullets (lines 228-231) | `- [Runbook Name](l2-runbooks/NN-ios-*.md) -- one-line ` -- ` disambiguation prose` |

**Phase 57 D-22..28 mirror (NOTE: 4-part NOT 5-part — Sysdiagnose Trigger Reference is iOS-specific Apple platform detail with no Android analog; Phase 57 substitutes Play Integrity Verdict Reference as the third sub-H3 instead):**
- H2: `## Android Enterprise Quick Reference`
- Sub-H3 #1: `### Android Diagnostic Data Collection (3 methods)` — mirrors iOS structure with Android-specific 3-method table
- Sub-H3 #2: `### Key Intune Portal Paths (Android L2)` — mirrors iOS table format; 4-5 rows recommended (D-28)
- Sub-H3 #3: `### Play Integrity Verdict Reference` — Android-specific REPLACEMENT for iOS Sysdiagnose Trigger Reference (3-row pointer table per D-23 with cross-link to Phase 54 SSoT)
- Sub-H3 #4: `### Android Investigation Runbooks` — mirrors iOS 226-231 pattern with 6 dash bullets (D-26)

### 4. iOS common-issues.md 6 H3s + reciprocal-disambiguation pattern

**Source:** `docs/common-issues.md:212-265`

| Element | Line | Content |
|---------|------|---------|
| H2: `## iOS/iPadOS Failure Scenarios` | 212 | — |
| Cross-platform reciprocal banner block | 214-215 | `> **Windows:** ...` / `> **macOS:** ...` |
| Platform line | 217 | `**Platform:** iOS/iPadOS through Microsoft Intune` |
| Section-top decision-tree banner | 219 | `Symptom-based index routing ... Start with the [iOS Triage Decision Tree](decision-trees/07-ios-triage.md) to identify the failure scenario.` |
| `### iOS: Device Not Appearing in Intune` | 221 | 3-line scenario description + L1 + L2 cross-links |
| `### iOS: ADE Setup Assistant Not Completing` | 228 | scenario + L1 + L2 |
| `### iOS: Enrollment Blocked by Configuration` | 235 | scenario + L1 with **reciprocal disambiguation** at line 239: `[Enrollment Restriction Blocking](...) \| [Device Cap Reached](...) (reciprocal disambiguation — see both if cause unclear)` |
| `### iOS: User License Not Present` | 242 | scenario + L1 + L2 |
| `### iOS: Device Enrollment Cap Reached` | 249 | scenario + L1 + L2 |
| `### iOS: Compliance / Access Blocked` | 256 | scenario + L1 + L2 |
| MAM-WE advisory (NOT a runbook) | 263-265 | `### iOS: App Protection Policies Not Applying (MAM-WE)` + `> **Advisory:** ...` |

**H3 anchor literals (LOCKED — Phase 32 deliverables; preserved by Phase 57 V-57-25):**
- `#ios-device-not-appearing-in-intune`
- `#ios-ade-setup-assistant-not-completing`
- `#ios-enrollment-blocked-by-configuration`
- `#ios-user-license-not-present`
- `#ios-device-enrollment-cap-reached`
- `#ios-compliance--access-blocked` (note: `--` from `/` in title; D-10 cites this anchor verbatim)
- `#ios-app-protection-policies-not-applying-mam-we`

**Reciprocal disambiguation syntax (verbatim from line 239):**
```
[Link A] | [Link B] (reciprocal disambiguation — see both if cause unclear)
```

**Phase 57 D-09 mirror (Android-specific reciprocal callouts):**

In `### Android: Device Not Enrolled` (runbook 24):
```
**L1:** [Device Not Enrolled](l1-runbooks/24-android-device-not-enrolled.md) | [Enrollment Blocked](l1-runbooks/22-android-enrollment-blocked.md) | [ZTE Enrollment Failed](l1-runbooks/27-android-zte-enrollment-failed.md) (reciprocal disambiguation — see all if no enrollment-restriction error visible)
```

In `### Android: ZTE Enrollment Failed` (runbook 27):
```
**L1:** [ZTE Enrollment Failed](l1-runbooks/27-android-zte-enrollment-failed.md) | [Knox Enrollment Failed](l1-runbooks/28-android-knox-enrollment-failed.md) (reciprocal disambiguation — Samsung KME provisioning often co-exists with ZTE; check both portals)
```

**Cross-platform iOS reciprocal banner syntax (D-10):**

Verified at lines 34, 52, 68, 148, 164, 180, 196, 214-215. Pattern:
```
> **iOS:** For iOS [topic], see [iOS: Name](#anchor).
```

Phase 57 D-10 places ONE banner on `### Android: Compliance Blocked` H3:
```
> **iOS:** For iOS compliance and CA timing issues, see [iOS: Compliance / Access Blocked](#ios-compliance--access-blocked).
> **macOS:** For macOS compliance issues, see [macOS: Compliance / Access Blocked](#compliance-access-blocked) (where applicable).
```

The `--` in the iOS anchor (`#ios-compliance--access-blocked`) is GFM-derived from the `/` in the H3 title — a single character collapses to `-`, but the surrounding spaces also collapse, leaving a double-`-`. This is correct as-is.

## Risks + Pitfalls Confirmed

**No new risks identified beyond CONTEXT.md adversarial review surface.** All 4 GA winners locked with file:line evidence; all 12 verification items resolved without surfacing new architectural concerns.

**One minor scope clarification surfaced during verification:**

- **L1 index intro line 66 ("six most common")** is now stale post-Knox+AOSP runbook additions. CONTEXT.md D-21 mentions only the additive table row for Knox; this RESEARCH adds the recommendation that the same atomic commit also update line 66 from "six" to "eight" (or omit the count: "L1 runbooks for the most common Android Enterprise enrollment and compliance failure scenarios"). This is a 1-character or 1-word edit, same hot-spot file (`l1-runbooks/00-index.md`), inside D-31's atomic-commit envelope. **Plan-author judgment** whether to fold into 57-05 plan or treat as a separate micro-edit. Recommend folding into 57-05.

## Validation Architecture

Per `.planning/config.json` workflow.nyquist_validation key absence (config does not contain this key): treat as enabled. However, Phase 57 is a doc-only phase with NO code/runtime behavior to test — validation surface is structural assertion only, not behavioral testing.

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Custom Node.js validator pattern (`scripts/validation/check-phase-NN.mjs` series); no third-party test framework |
| Config file | None (each `check-phase-NN.mjs` is self-contained per Phase 49-56 D-NN no-shared-module discipline) |
| Quick run command | `node scripts/validation/check-phase-57.mjs` |
| Quick run with detail | `node scripts/validation/check-phase-57.mjs --verbose` |
| Full suite command | `node scripts/validation/check-phase-57.mjs && node scripts/validation/v1.5-milestone-audit.mjs --verbose` |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|--------------|
| CLEAN-01 | docs/index.md Android H2 has 3 sub-tables matching iOS structural depth | structural | `node scripts/validation/check-phase-57.mjs` (V-57-05..07) | ❌ Wave 0 (Plan 57-06) |
| CLEAN-02 | docs/common-issues.md has 8 H3 sub-sections + 1:1 anchor traceability + reciprocal callouts | structural | `node scripts/validation/check-phase-57.mjs` (V-57-08..13) | ❌ Wave 0 (Plan 57-06) |
| CLEAN-03 | docs/quick-ref-l1.md has 4-part substructure + Mode tag literal coverage + 8 runbook links | structural | `node scripts/validation/check-phase-57.mjs` (V-57-14..17) | ❌ Wave 0 (Plan 57-06) |
| CLEAN-04 | docs/quick-ref-l2.md has 4-part substructure + 3 verdict tokens + Phase 54 SSoT cross-link + 6-runbook list | structural | `node scripts/validation/check-phase-57.mjs` (V-57-18..23) | ❌ Wave 0 (Plan 57-06) |
| Knox L1 index patch (D-21) | docs/l1-runbooks/00-index.md table contains runbook 28 row | structural | `node scripts/validation/check-phase-57.mjs` (V-57-24) | ❌ Wave 0 (Plan 57-06) |
| iOS H2 anchor stability (D-33) | 4 iOS H2 anchors unchanged in 4 hub files | NEGATIVE regression | `node scripts/validation/check-phase-57.mjs` (V-57-25) | ❌ Wave 0 (Plan 57-06) |
| TBD/TODO/FIXME/XXX/PLACEHOLDER scan | 4 hub files free of placeholder tokens | NEGATIVE | `node scripts/validation/check-phase-57.mjs` (V-57-26) | ❌ Wave 0 (Plan 57-06) |
| Frontmatter `last_verified` 60-day cycle (D-32 step 6) | 4 hub files + L1 index file have updated frontmatter | structural | `node scripts/validation/v1.5-milestone-audit.mjs` C5+C10 | ✓ Existing |
| C13 broken-link automation (Phase 48 → Phase 60 informational) | All in-doc + relative-path links resolve | informational | `markdown-link-check` against 5 files | ✓ Existing |

### Sampling Rate
- **Per task commit:** `node scripts/validation/check-phase-57.mjs --verbose` (subset of V-57-NN per file edited)
- **Per phase merge:** Full `check-phase-57.mjs` + `v1.5-milestone-audit.mjs --verbose` + `regenerate-supervision-pins.mjs --self-test`
- **Phase gate:** All 3 validators exit 0 + manual `markdown-link-check` review of 5 files before `/gsd-verify-work`

### Wave 0 Gaps
- [ ] `scripts/validation/check-phase-57.mjs` — covers V-57-01..26 structural assertions for CLEAN-01..04 + D-21 + D-33 + V-57-26 TBD scan (Plan 57-06 deliverable)
- [ ] No framework install needed — Node.js + ES Module support already established by Phase 49-56 validator lineage

## Sources

### Primary (HIGH confidence — all in-repo verification)

- `D:\claude\Autopilot\.planning\phases\57-defer-07-android-nav-unification\57-CONTEXT.md` (570-line CONTEXT with 34 D-NN locked decisions; primary research input)
- `D:\claude\Autopilot\.planning\REQUIREMENTS.md` (CLEAN-01..04 lines 13-16; REQ→Phase mapping lines 135-138)
- `D:\claude\Autopilot\.planning\ROADMAP.md` (Phase 57 entry lines 320-335; Phase 59 inheritance line 364)
- `D:\claude\Autopilot\.planning\STATE.md` (current Phase 57 ready-for-planning state)
- `D:\claude\Autopilot\CLAUDE.md` (project-instructions; doc-only phase outside code scope)
- `D:\claude\Autopilot\.planning\phases\56-drift-detection-tenant-migration\56-CONTEXT.md` (D-08 link-not-copy contract; D-21 hardcoded-anchor pin lineage)
- `D:\claude\Autopilot\scripts\validation\check-phase-56.mjs` (validator template — 571 lines; Phase 57 mirrors structure exactly per D-30)
- `D:\claude\Autopilot\docs\index.md` (lines 131-164 iOS Phase 32 sub-table architecture; lines 167-170 current Android stub; lines 173-191 Cross-Platform References)
- `D:\claude\Autopilot\docs\common-issues.md` (lines 14-18 Choose Your Platform TOC; lines 212-265 iOS/iPadOS Failure Scenarios H2)
- `D:\claude\Autopilot\docs\quick-ref-l1.md` (lines 117-148 iOS Quick Reference H2)
- `D:\claude\Autopilot\docs\quick-ref-l2.md` (lines 182-232 iOS Quick Reference H2)
- `D:\claude\Autopilot\docs\l1-runbooks\00-index.md` (lines 64-77 Android L1 Runbooks table — Knox row gap confirmed)
- `D:\claude\Autopilot\docs\l1-runbooks\28-android-knox-enrollment-failed.md` (frontmatter `applies_to: KME`)
- `D:\claude\Autopilot\docs\operations\patch-management\04-android-patch-delivery.md` (lines 50-90 Play Integrity SSoT; verified 3 verdicts; verified anchors `#play-integrity-attestation` + `#deadlines-cutover-dates`)
- `D:\claude\Autopilot\docs\android-lifecycle\00-enrollment-overview.md` (lifecycle entry-point existence + frontmatter)
- `D:\claude\Autopilot\docs\admin-setup-android\00-overview.md` (admin-setup hub existence + tri-portal Mermaid lines 25-37)
- `D:\claude\Autopilot\docs\reference\android-capability-matrix.md` (deferred-4-platform footer at lines 132-139)
- `D:\claude\Autopilot\docs\l2-runbooks\18-android-log-collection.md` (3-method Decision Matrix lines 31-33)

### Secondary (MEDIUM confidence)

None — all findings verified against in-repo files at HIGH confidence.

### Tertiary (LOW confidence)

None.

## Metadata

**Confidence breakdown:**
- Plan-time research flags (12 items): HIGH — all verified against in-repo files with file:line evidence
- Pattern validation (iOS Phase 32 inheritance shape): HIGH — direct file:line reads
- Validator template structure (check-phase-56.mjs lineage): HIGH — full module shape inspected
- Risk surface: HIGH — CONTEXT.md adversarial review (113 raw defects → 20 confirmed) leaves no orphan risk axes; one minor scope clarification (L1 index "six" intro line) folded into D-21

**Research date:** 2026-04-30
**Valid until:** 2026-05-30 (30 days; doc-only phase scope; no fast-moving external dependencies)

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| — | — | — | — |

**Empty table:** All claims in this research were verified against in-repo files at HIGH confidence — no `[ASSUMED]` knowledge present. No user confirmation needed beyond CONTEXT.md decisions already locked.

## RESEARCH COMPLETE
