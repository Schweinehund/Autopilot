---
phase: 35-android-prerequisites-mgp-zero-touch-portal
verified: 2026-04-21T00:00:00Z
status: human_needed
score: 5/5 must-haves verified
overrides_applied: 0
re_verification:
  previous_status: none
  previous_score: n/a
  gaps_closed: []
  gaps_remaining: []
  regressions: []
deferred:
  - truth: "AOSP admin setup guide (06-aosp-stub.md) exists as the destination of multiple forward-references"
    addressed_in: "Phase 39"
    evidence: "Phase 39 name/goal: 'Zero-Touch Enrollment + AOSP Stub' — explicitly produces docs/admin-setup-android/06-aosp-stub.md as per Plan 01 and Plan 02 forward-references"
  - truth: "Full KME admin coverage and device-claim workflow (#device-claim-workflow, #profile-assignment, #dual-sim-imei-1, #reseller-upload-handoff anchors in 02-zero-touch-portal.md)"
    addressed_in: "Phase 39 (initial extension) and v1.4.1 (full KME coverage)"
    evidence: "Plan 04 D-22/D-23 explicitly splits Phase 35/39 scope and reserves Phase 39 anchor namespace; Phase 39 roadmap name 'Zero-Touch Enrollment + AOSP Stub' extends this same file"
human_verification:
  - test: 'Open docs/admin-setup-android/00-overview.md on GitHub and verify the mermaid 5-branch flowchart renders with all expected nodes and edges'
    expected: 'Flowchart shows Admin lands here -> Choose your mode -> three branches (COBO/BYOD/Dedicated -> MGP -> three mode leaves; ZTE -> MGP -> ZT -> ZTE content; AOSP -> AOSP stub); all node labels legible'
    why_human: 'Mermaid source verified by grep; rendered output requires visual inspection'
  - test: 'Read each of four deliverables top-to-bottom and confirm SC5 callout placement is at decision point, not deferred'
    expected: 'Inline blockquotes appear at the moment of each URL/account/disconnect/KME/Method decision; no Gotchas section exists'
    why_human: 'Subjective placement judgment beyond grep scope'
  - test: 'Copy the DPC extras JSON from 02-zero-touch-portal.md lines 93-105 into a JSON validator'
    expected: 'Parses without error; zero in-JSON // or /* */ comments'
    why_human: 'Copy-paste behavior from markdown fence to portal is the actual admin workflow'
  - test: 'With authenticated Intune admin session, walk the documented portal navigation paths (endpoint.microsoft.com > Devices > Enrollment > Android; Devices > By platform > Android > Device onboarding > Enrollment > Bulk enrollment methods > Zero-touch enrollment; enterprise.google.com/android/zero-touch/customers sidebar; accounts.google.com/signupwithoutgmail; verify CloudDPC signature checksum I5YvS0O5hXY46mb01BlRjq4oJJGs2kuUcHvVkAPEXlg against current MS Learn ref-corporate-methods)'
    expected: 'All paths resolve; all URLs load; signature checksum matches'
    why_human: 'Portal authentication required; worktree agent cannot log in. last_verified frontmatter is the documented trust boundary'
  - test: 'Review REVIEW.md warnings WR-01 (meta-comment leak line 100), WR-02 (Google requires vs recommends two owners line 26), WR-03 (65,535 days vs 65 years inconsistency line 120) and decide fix or accept'
    expected: 'Either apply three edits or accept with rationale'
    why_human: 'Editorial/correctness judgment calls, not grep-checkable; already detailed in REVIEW.md'
---

# Phase 35: Android Prerequisites — MGP & Zero-Touch Portal Verification Report

**Phase Goal:** An Intune admin can complete both tenant-scoped gates — Managed Google Play binding and Zero-Touch portal configuration — independently, with each documented as a standalone guide, so subsequent mode-specific admin guides can reference them rather than duplicate portal mechanics.

**Verified:** 2026-04-21T00:00:00Z
**Status:** human_needed
**Re-verification:** No — initial verification

---

## Goal Achievement

### Observable Truths (merged from ROADMAP Success Criteria + PLAN frontmatter must_haves)

| # | Truth (Success Criterion) | Status | Evidence |
|---|---------------------------|--------|----------|
| 1 | Admin reading `docs/android-lifecycle/01-android-prerequisites.md` understands the full tri-portal surface (Intune admin center + MGP + ZT portal), the GMS-vs-AOSP split, and the Android 12+ corporate-identifier behavior (IMEI/serial removed) | VERIFIED | File exists (851 words). `## Tri-Portal Surface` H2 with per-portal paragraphs (line 19); `## GMS vs. AOSP Split` H2 (line 27); `## Android 12+ Corporate Identifiers` H2 (line 43) states the concrete admin consequence verbatim. Cross-links to `03-android-version-matrix.md#android-12-corporate-identifiers` (3 occurrences) — anchor confirmed present at line 54 of version matrix. |
| 2 | Admin reading `docs/admin-setup-android/00-overview.md` can sequence the tri-portal setup correctly and identify which portals each mode depends on (COBO/BYOD/Dedicated → MGP; ZTE → ZT portal; AOSP → neither) | VERIFIED | File exists (801 words). Mermaid flowchart with 5 mode branches (line 25-36) — CHOOSE edge labels: "COBO / BYOD WP / Dedicated" → MGP; "Zero-Touch Enrollment" → MGP + ZT; "AOSP" → AOSP stub. Four prerequisite checklists (GMS-Path, ZTE-Path, AOSP-Path, Shared). 17 mode-name occurrences across the file. |
| 3 | Admin following `docs/admin-setup-android/01-managed-google-play.md` can bind an Entra account (preferred since August 2024) from `endpoint.microsoft.com` (not `intune.microsoft.com`), and a what-breaks table explains the consequences of disconnecting the binding (all GMS modes broken, app assignments lost) | VERIFIED | File exists (1196 body words). Step 1 links to `https://endpoint.microsoft.com` (line 45); inline `> **Account type check:**` blockquote at Step 3 names Entra + August 2024 (line 61); `## Account Types` 3-row table (line 29); `## What Breaks` hybrid table (line 93) with 5 rows severity-descending — "Binding disconnected" row is row 1, marked **CRITICAL**, explicitly names COBO/BYOD WP/Dedicated/ZTE-GMS-path broken and AOSP unaffected; `## Disconnect Consequences` dedicated section (line 103) with 5-step retire-first sequence; wrong-URL row names `intune.microsoft.com` (line 101). |
| 4 | Admin following `docs/admin-setup-android/02-zero-touch-portal.md` starts at Step 0 (authorized reseller relationship is a hard prerequisite — devices cannot be added to ZT portal without it), configures DPC extras JSON, links ZT to Intune, and reads the KME/ZT mutual-exclusion callout for Samsung devices | VERIFIED | File exists (1217 body words). Top-of-doc reseller blockquote (line 14) + numbered `## Step 0 — Verify Reseller Relationship` section (line 33) with "if not in place: STOP" options — dual placement per D-19. Top-of-doc ⚠️ KME/ZT warning (line 16, framed "choose either KME or ZT — never both") + inline `> **Samsung admins:**` callout within 15 lines of `#link-zt-to-intune` anchor (line 66) — dual placement per D-21. Verbatim DPC extras JSON block with 4-field schema + 5-row Fields reference table (lines 93-115); signature checksum `I5YvS0O5hXY46mb01BlRjq4oJJGs2kuUcHvVkAPEXlg` present; zero in-JSON `//` comments. ZT↔Intune Methods A (iframe, COBO-only) and B (direct portal, any mode) both documented (lines 61-86). |
| 5 | Every what-breaks and mutual-exclusion callout on this phase's four docs is placed inline at the point of admin decision, not relegated to a footnote or separate "gotchas" section | VERIFIED | Plan 01 (concept-only) has zero what-breaks callouts (vacuously satisfied per D-02). Plan 02 has the `## Portal Navigation Note` as an inline decision aid at the overview level (not a "gotchas" section). Plan 03 has inline `> **What breaks if misconfigured:**` blockquotes at Step 1 wrong-URL decision (line 48) and Step 3 Workspace account decision (line 67) — supplemented by an aggregate `## What Breaks` table that acts as a cross-cutting reference, not a gotchas dumping ground. Plan 04 has inline `> **What breaks if misconfigured:**` callouts at account-creation (line 52) and Method A linking (line 77) decision points; KME/ZT warning is dual-placed (top-of-doc decision-framing + inline at linking step). No `## Gotchas` section exists in any of the four docs (grep returns 0). |

**Score:** 5/5 truths verified

### PLAN frontmatter truths (Plan-specific must_haves) — all VERIFIED

All plan-level must_have truths are subsumed by or equivalent to the ROADMAP Success Criteria above. Plan-specific details verified:

| Plan | PLAN truth | Status | Evidence |
|------|-----------|--------|----------|
| 01 | Concept-only, zero portal H4 headings | VERIFIED | `grep ^#### In Intune\|^#### In Managed\|^#### In Zero-Touch` = 0 |
| 01 | Body 600–900 words | VERIFIED | 851 words |
| 01 | Phase 34 cross-references present (02-provisioning-methods, 03-android-version-matrix, 00-enrollment-overview, _glossary-android) | VERIFIED | All 4 targets exist on disk; all anchors referenced resolve |
| 02 | Mermaid flowchart with 5 mode branches | VERIFIED | mermaid fence present (line 25); 5 mode names (COBO/BYOD/Dedicated/ZTE/AOSP) present (17 occurrences) |
| 02 | Per-path checklists (GMS/ZTE/AOSP/Shared) | VERIFIED | All 4 H3 headings present |
| 02 | Portal Navigation Note at bottom clarifying endpoint vs intune URL | VERIFIED | `## Portal Navigation Note` H2 at line 75; names `endpoint.microsoft.com` and `intune.microsoft.com` explicitly |
| 03 | Account Types 3-row table (Entra / Gmail / Workspace) | VERIFIED | `## Account Types` H2 at line 29 with 3-row comparison table |
| 03 | Inline Entra-preferred reminder at account-selection step (dual placement D-13) | VERIFIED | `> **Account type check:**` blockquote at Step 3 (line 61) contains both "Entra" and "August 2024" |
| 03 | What-breaks table with hybrid granularity (Downstream impact column) | VERIFIED | `Downstream impact` column header grep = 1; 5 rows present |
| 03 | Disconnect consequences inline + dedicated section | VERIFIED | What Breaks row 1 has **CRITICAL** inline + `## Disconnect Consequences` dedicated section at line 103 |
| 03 | v1.4.1 pre-Aug-2024 consumer Gmail See Also stub (text-only, not hyperlink) | VERIFIED | "See also: Binding migration for pre-August-2024..." present under Account Types (line 37), not a link |
| 03 | ZT portal H4 deleted via HTML-comment subtractive-deletion pattern | VERIFIED | `<!-- ZT portal H4 intentionally deleted per Phase 34 subtractive-deletion pattern (D-17)... -->` at line 82; grep `^#### In Zero-Touch portal` = 0 |
| 04 | Top-of-page reseller blockquote AND numbered Step 0 section (dual placement D-19) | VERIFIED | Top blockquote at line 14 + `## Step 0 — Verify Reseller Relationship` at line 33; content differs (decision-framing vs execution) |
| 04 | KME/ZT Samsung mutual-exclusion dual-placed (top-of-doc + inline at linking) | VERIFIED | ⚠️ blockquote at line 16 + inline `> **Samsung admins:**` at line 66 (within 15 lines of `#link-zt-to-intune` anchor) |
| 04 | DPC extras JSON commented skeleton + adjacent Fields reference table | VERIFIED | JSON block at line 93-105 (verbatim); 5-row Fields table at line 109-115; zero in-JSON `//` comments |
| 04 | ZT↔Intune linking via Method A (iframe, COBO-only) or Method B (direct, any mode) | VERIFIED | Methods comparison table at line 61-64; Method A section at line 68; Method B section at line 79 |
| 04 | Phase 35 scope only; Phase 39 anchors reserved but not used | VERIFIED | grep `#device-claim-workflow\|#profile-assignment\|#dual-sim-imei-1\|#reseller-upload-handoff` = 0; 4 Phase 39 forward-references present |

---

## Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `docs/android-lifecycle/01-android-prerequisites.md` | Concept-only orientation to tri-portal surface with stable anchors #tri-portal-surface, #gms-vs-aosp-split, #android-12-corporate-identifiers, #portal-dependencies-by-mode | VERIFIED | Exists (851 words); all 4 anchors resolve via H2 auto-slug; passes all 35-01-XX grep checks (7/7); passes 35-all-01 through 35-all-08 applicable checks |
| `docs/android-lifecycle/03-android-version-matrix.md` | Modified — additive `<a id="android-12-corporate-identifiers"></a>` anchor | VERIFIED | Anchor present at line 54 (additive only — existing content unchanged per Plan 01 SUMMARY auto-fix 1) |
| `docs/admin-setup-android/00-overview.md` | Admin setup overview with 5-branch mermaid + per-path prerequisites + Portal Navigation Note; stable anchors #choose-your-mode, #gms-path-prerequisites, #zte-path-prerequisites, #aosp-path-prerequisites, #portal-navigation-note | VERIFIED | Exists (801 words); mermaid fence + 5 mode names present; 4 prereq checklists (GMS/ZTE/AOSP/Shared); Portal Navigation Note names endpoint.microsoft.com; all 5 anchors resolve (4 via H2/H3 auto-slug + #choose-your-mode via explicit `<a id>` tag) |
| `docs/admin-setup-android/01-managed-google-play.md` | MGP binding admin guide with prerequisites, account-types, portal steps, what-breaks table, disconnect consequences, renewal/maintenance; stable anchors #prerequisites, #account-types, #bind-mgp, #what-breaks, #disconnect-consequences, #renewal-maintenance | VERIFIED | Exists (1196 body words); frontmatter `applies_to: GMS-modes`; 5 of 6 anchors via H2 auto-slug + #bind-mgp via explicit `<a id>`; ZT portal H4 deleted via HTML-comment subtractive pattern; no 90-day GMS token claim; passes all 35-03-XX (9/9) and applicable 35-all-XX checks |
| `docs/admin-setup-android/02-zero-touch-portal.md` | ZT portal admin guide with Step 0 reseller gate, ZT account, DPC extras JSON, ZT↔Intune linking, KME/ZT mutual-exclusion; stable anchors #prerequisites, #step-0-reseller, #create-zt-account, #dpc-extras-json, #link-zt-to-intune, #kme-zt-mutual-exclusion, #renewal-maintenance | VERIFIED | Exists (1217 body words); frontmatter `applies_to: ZTE`; all 7 anchors via explicit `<a id>` tags (auto-slugs diverge from contract per Plan 04 auto-fix 1); Phase 39 anchor namespace reserved but not used; zero in-JSON `//` comments; passes all 35-04-XX (10/10) and applicable 35-all-XX checks |

---

## Key Link Verification

| From | To | Via | Status | Details |
|------|-----|-----|--------|---------|
| `01-android-prerequisites.md` | `03-android-version-matrix.md#android-12-corporate-identifiers` | markdown link | WIRED | 3 occurrences; target anchor confirmed at line 54 of version matrix |
| `01-android-prerequisites.md` | `../admin-setup-android/01-managed-google-play.md` | See Also forward-reference | WIRED | 1 occurrence in See Also; target file exists |
| `01-android-prerequisites.md` | `../admin-setup-android/02-zero-touch-portal.md` | See Also forward-reference | WIRED | 1 occurrence in See Also; target file exists |
| `01-android-prerequisites.md` | `../_glossary-android.md` (plus 3 specific anchors: #managed-google-play, #zero-touch-enrollment, #dpc) | glossary cross-references | WIRED | All 4 anchors resolve (corrected from plan's `#mgp` to actual Phase 34 slug `#managed-google-play` per Plan 01 auto-fix 2) |
| `00-overview.md` | `01-managed-google-play.md` | mermaid + numbered list + prerequisites checklist | WIRED | Sibling exists; 3 occurrences; `#what-breaks` and `#bind-mgp` anchors both resolve on target |
| `00-overview.md` | `02-zero-touch-portal.md` | mermaid + prerequisites checklist | WIRED | Sibling exists; 3 occurrences; `#step-0-reseller` and `#link-zt-to-intune` anchors both resolve on target |
| `01-managed-google-play.md` | `https://endpoint.microsoft.com` | portal-step hyperlink | WIRED | 2 occurrences (Step 1 + Verification checklist); D-15 specificity guard honored (`intune.microsoft.com` only named as wrong-URL failure mode) |
| `01-managed-google-play.md` | `https://play.google.com/work` | MGP portal hyperlink | WIRED | 1 occurrence at Step 4 |
| `01-managed-google-play.md` | `02-zero-touch-portal.md` | See Also (Wave 2 sibling) | WIRED | Target exists |
| `02-zero-touch-portal.md` | `https://enterprise.google.com/android/zero-touch/customers` | ZT portal hyperlink | WIRED | 2 occurrences (Create Account step + Method B) |
| `02-zero-touch-portal.md` | `https://androidenterprisepartners.withgoogle.com/resellers/` | Step 0 reseller directory | WIRED | 1 occurrence inside Step 0 |
| `02-zero-touch-portal.md` | `https://endpoint.microsoft.com` | ZT↔Intune linking Method A | WIRED | 1 occurrence at Method A Step 1 |
| `02-zero-touch-portal.md` | `01-managed-google-play.md` | MGP binding prerequisite | WIRED | 3 occurrences (Prerequisites + See Also) |
| `01-managed-google-play.md` / `02-zero-touch-portal.md` | `../_templates/admin-template-android.md` | structural template (internal dependency, not a link) | WIRED | Template exists in `docs/_templates/`; HTML-comment subtractive-deletion pattern applied in both files |

---

## Data-Flow Trace (Level 4)

Not applicable — all deliverables are static markdown documentation. No dynamic data flow, no state management, no API calls. Level 4 tracing is used for runtime artifacts (components, pages, APIs) that render dynamic data — documentation files have no equivalent.

---

## Behavioral Spot-Checks

**Status: SKIPPED (no runnable entry points produced by this phase)**

Phase 35 is documentation-only. The phase produces 4 markdown files plus one additive anchor. There are no APIs, CLI tools, build scripts, or runnable code to spot-check. Markdown rendering of the mermaid diagram in `00-overview.md` is the closest analog to a behavioral check; this is routed to human verification below.

---

## Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
|-------------|------------|-------------|--------|----------|
| AEPREQ-01 | 35-01-PLAN.md | Intune admin can read an Android prerequisites doc summarizing tri-portal surface, GMS vs AOSP split, and corporate-identifier behavior with Android 12+ IMEI/serial removal | SATISFIED | Truth 1 VERIFIED; file at `docs/android-lifecycle/01-android-prerequisites.md` contains all three concept areas |
| AEPREQ-02 | 35-02-PLAN.md | Intune admin can read an admin setup overview describing correct tri-portal setup sequence and per-mode portal dependencies | SATISFIED | Truth 2 VERIFIED; file at `docs/admin-setup-android/00-overview.md` with 5-branch mermaid + per-path prereqs + Portal Navigation Note |
| AEPREQ-03 | 35-03-PLAN.md | Intune admin can bind tenant to MGP using Entra (preferred since Aug 2024), starting from endpoint.microsoft.com, with what-breaks table covering disconnect consequences | SATISFIED | Truth 3 VERIFIED; file at `docs/admin-setup-android/01-managed-google-play.md` with Account Types dual-placement + hybrid What Breaks table + Disconnect Consequences dual-placement |
| AEPREQ-04 | 35-04-PLAN.md | Intune admin can configure ZT portal with reseller as Step 0, portal navigation, DPC extras JSON, ZT-Intune linking, KME/ZT mutual-exclusion callout for Samsung | SATISFIED | Truth 4 VERIFIED; file at `docs/admin-setup-android/02-zero-touch-portal.md` with Step 0 dual-placement + DPC JSON + Methods A/B + KME/ZT dual-placement |

**Orphaned requirement check:** REQUIREMENTS.md lines 163-166 map AEPREQ-01 through AEPREQ-04 to Phase 35. Plans 01-04 claim exactly these four IDs. Zero orphans.

---

## Anti-Patterns Found

**Scan scope:** 5 files modified/created in this phase per SUMMARY files: `docs/android-lifecycle/01-android-prerequisites.md`, `docs/android-lifecycle/03-android-version-matrix.md`, `docs/admin-setup-android/00-overview.md`, `docs/admin-setup-android/01-managed-google-play.md`, `docs/admin-setup-android/02-zero-touch-portal.md`.

| File | Line | Pattern | Severity | Impact |
|------|------|---------|----------|--------|
| `01-managed-google-play.md` | 100 | Author meta-comment leaked into admin-facing What Breaks table: Recovery cell contains "(text-only stub, not hyperlink)" — authoring-time guidance from the plan copied verbatim into published doc | Warning (polish) | Admin readers will see meta-commentary and be confused; cell should describe recovery action, not documentation-authoring instructions. Caught by REVIEW.md WR-01. |
| `01-managed-google-play.md` | 26 | Prerequisite bullet asserts "Google requires a minimum of two" Entra account owners; RESEARCH line 226 sources this as "recommends minimum two for redundancy" — recommendation, not requirement. Also internally inconsistent (bullet starts "recommended" then switches to "requires") | Warning (correctness) | Could mislead admins to believe binding will fail without two owners — it will not. Caught by REVIEW.md WR-02. |
| `01-managed-google-play.md` | 120 | Numeric inconsistency: "Configurable 1–65,535 days (GMS tokens can be set up to ~65 years)" — 65,535 days ≈ 179 years, not 65. Two incompatible upper-bound figures in the same cell | Warning (factual) | Pedantic admin will notice the contradiction; MS Learn source for "65 years" is authoritative per D-28 research resolution. Caught by REVIEW.md WR-03. |
| `01-android-prerequisites.md` | 57-60 | Missing `## Changelog` heading above changelog table; inconsistent with the three admin-setup-android files which all use it | Info (polish) | Structural drift between Phase 35 deliverables. Caught by REVIEW.md IN-01. |
| `03-android-version-matrix.md` | end of file | No changelog section at all (Phase 34 inherited) — other four Phase 35 deliverables all have one | Info (polish) | Phase 42 audit needs version history for drift-tracking. Caught by REVIEW.md IN-02. |
| Multiple files | multiple lines | Admin-facing prose references internal project phase numbers ("Phase 36", "Phase 39", "Phase 42") that external readers do not understand | Info (UX polish) | Leaks implementation scheduling into end-user docs. Caught by REVIEW.md IN-03. |
| `01-managed-google-play.md` | 80 | `<a id="bind-mgp"></a>` anchor has no in-repo referents (only planning artifacts reference it) — may be intentionally reserved for Phase 36-39 deep-linking | Info (potential orphan) | If reserved, document via HTML comment; otherwise remove. Caught by REVIEW.md IN-04. |
| `00-overview.md` | 25-36 | Mermaid defines `MGP[01-managed-google-play.md]` and `MGPZTE[01-managed-google-play.md]` as two separate nodes rendering the same label — visually redundant | Info (diagram polish) | Reader may wonder whether they are different files. Caught by REVIEW.md IN-05. |
| `00-overview.md` | 46-74 | Shared prereqs (Intune Plan 1, Administrator role) duplicated across per-path checklists AND the "Shared Prerequisites" block | Info (checklist polish) | Admin may tick same item twice; structurally unclean. Caught by REVIEW.md IN-06. |

**Classification summary:** 0 blockers, 3 warnings (content correctness/polish, not goal-blocking), 6 info items (polish). All 9 findings already documented in 35-REVIEW.md. None prevent an admin from achieving the goal. Warnings WR-01/02/03 are localized cell-level issues within one file; none invalidates the broader goal of a working MGP binding guide. The phase can proceed as passed; warnings should be addressed in a minor follow-up but do not warrant a gap-closure plan.

---

## Human Verification Required

### 1. Mermaid rendering of the 5-branch flowchart in `00-overview.md`

**Test:** Open `docs/admin-setup-android/00-overview.md` on GitHub (or render it via a mermaid-capable markdown preview).
**Expected:** The flowchart renders as a single top-down diagram with "Admin lands here" → "Choose your mode" branching to (a) COBO/BYOD WP/Dedicated → `01-managed-google-play.md` → three leaf nodes (COBO guide, BYOD guide, Dedicated guide); (b) Zero-Touch Enrollment → `01-managed-google-play.md` → `02-zero-touch-portal.md` → ZTE admin content; (c) AOSP → AOSP stub. All node labels are legible; edge labels identify the mode.
**Why human:** Mermaid source was verified by grep, but rendered output cannot be programmatically verified — only a human visually confirming the diagram reads correctly can complete this check. Per `35-VALIDATION.md §Manual-Only Verifications row 1`. (Note: REVIEW IN-05 proposes collapsing the duplicate MGP nodes into a single shared node with multiple inbound edges — an aesthetic improvement, not a correctness blocker.)

### 2. SC5 placement review — "inline at decision point, not in gotchas section"

**Test:** Read each of the four deliverables top-to-bottom from an admin-first reader perspective. At every decision point (URL choice, account type, disconnect, KME-vs-ZT, Method A vs B), confirm the relevant consequence information appears at or adjacent to the decision, not deferred to a trailing section.
**Expected:** A reader following the Step numbered flow encounters the "what breaks" callout at the moment of the decision (inline blockquote), without needing to scroll to a cross-cutting reference section.
**Why human:** Programmatic checks confirm inline blockquotes exist (5 found in 02-zero-touch-portal.md) and no `## Gotchas` section exists; however, subjective judgment is required to confirm the callout is at the _right_ decision point and the prose flow does not push the reader past the decision before they see the warning. Per `35-VALIDATION.md §Manual-Only Verifications row 3 and row 6`.

### 3. DPC extras JSON copy-paste sanity check

**Test:** Copy the JSON block from `docs/admin-setup-android/02-zero-touch-portal.md` lines 93-105 into a JSON validator (online or via `node -e "JSON.parse(require('fs').readFileSync('/dev/stdin'))"`). Verify it parses cleanly with no in-JSON comments.
**Expected:** JSON parses without error. No `//` or `/*...*/` comments inside the fenced block. Every field from the Fields reference table is present.
**Why human:** The JSON is embedded inside a markdown fence; programmatic extraction-and-parse is a reasonable automated check, but copy-paste behavior is the actual admin workflow. A human confirming the exact copy-paste-then-paste-into-portal flow works without leaving markdown artifacts is the authoritative test. Per `35-VALIDATION.md §Manual-Only Verifications` — DPC JSON is listed under the "verify current value at execute time (A3)" concern, which also applies to verifying no markdown contamination.

### 4. Live-portal re-verification of research-flagged URLs and UI paths

**Test:** With an authenticated Intune admin session, walk the documented portal navigation paths:
- Intune admin center at `https://endpoint.microsoft.com` → Devices > Enrollment > Android tab > Prerequisites > Managed Google Play
- Intune admin center → Devices > By platform > Android > Device onboarding > Enrollment > Bulk enrollment methods > Zero-touch enrollment
- `https://enterprise.google.com/android/zero-touch/customers` sidebar: Configurations / Devices / Users / Resellers / Customer details
- `accounts.google.com/signupwithoutgmail` loads a corporate-email Google account creation form
- Current CloudDPC signature checksum matches `I5YvS0O5hXY46mb01BlRjq4oJJGs2kuUcHvVkAPEXlg` on MS Learn `ref-corporate-methods`
**Expected:** All paths resolve to the expected UI; all URLs load; signature checksum matches.
**Why human:** The worktree agent cannot log in to Intune or Google portals. Plans 03 and 04 SUMMARYs both explicitly flag this (Research-Flag Verification section). The `last_verified: 2026-04-21` frontmatter is the documented trust boundary; a human reviewer must re-validate these five assertions before publishing to admins. Portal-UI-specific assertions carry inline `<!-- verify UI at execute time -->` comments as documentation-level flags.

### 5. WR-01, WR-02, WR-03 warning fixes

**Test:** Review the three REVIEW.md WARNING items and decide whether to apply the proposed fixes before the v1.4 lock.
**Expected:** Either (a) apply the three proposed edits to `01-managed-google-play.md` lines 26, 100, 120; or (b) accept the current wording with explicit rationale.
**Why human:** These are editorial/correctness judgment calls, not grep-checkable blockers. The review already provides exact-text replacement recommendations; a human editor must decide whether to accept. Goal achievement is not blocked — the guide still enables binding — but the warnings represent polish debt.

---

## Gaps Summary

No goal-blocking gaps. All four Success Criteria pass all automated and structural checks. All four AEPREQ-XX requirements are satisfied by the artifacts their plans produced. All 32 acceptance criteria across the four plans (7 + 6 + 9 + 10) pass their automated grep validations. All reserved anchor contracts (4 on 01-android-prerequisites, 5 on 00-overview, 6 on 01-managed-google-play, 7 on 02-zero-touch-portal = 22 total) resolve. All cross-reference integrity checks pass for existing files; the three known dangling forward-references (`06-aosp-stub.md` from 01-android-prerequisites, 00-overview, and 02-zero-touch-portal) are explicitly deferred to Phase 39 per the roadmap.

The code review identified 3 warning-level content issues and 6 info-level polish items in 35-REVIEW.md. None prevent an admin from achieving the goal; all are localized editorial concerns. They are recorded in the Anti-Patterns table above and surfaced to human verification as item 5. The phase should be considered passed with a recommendation to address WR-01/02/03 in a follow-up commit before v1.4 lock, but this is a polish concern rather than a goal-blocker.

The five items flagged for human verification are structural/subjective checks that cannot be resolved programmatically (mermaid rendering, callout-placement subjective judgment, JSON copy-paste behavior, live portal re-verification, editorial review of warnings). These are expected for documentation-only phases and do not indicate verification failure — they simply route items that require human eyes.

---

_Verified: 2026-04-21T00:00:00Z_
_Verifier: Claude (gsd-verifier)_
