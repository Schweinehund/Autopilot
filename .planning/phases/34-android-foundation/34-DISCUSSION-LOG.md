# Phase 34: Android Foundation - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in 34-CONTEXT.md — this log preserves the adversarial-review evidence.

**Date:** 2026-04-21
**Phase:** 34-android-foundation
**Method:** /adversarial-review skill (finder → adversary → referee scored multi-agent pattern)
**Areas discussed:** Two-axes presentation, Glossary organization, Tri-portal template optional-ZT handling, Provisioning matrix orientation, Version matrix granularity

---

## Area 1: Two-Axes Presentation (Enrollment Overview)

### Options Evaluated

| Option | Description | Selected |
|--------|-------------|----------|
| 1A | 2×4 grid table (ownership rows × management-scope cols), cells hold mode names | |
| 1B | Single 5-row mode-comparison table (cols: Ownership / Mgmt Scope / Provisioning / Supervision Analog / Use Case) — mirrors v1.3 iOS Phase 26 | ✓ |
| 1C | Two separate 1-axis tables + narrative orthogonality bridge | |

### Adversarial Review Evidence
- **Finder score (total flaws):** 1A=46, 1B=22, 1C=27
- **Adversary disproves for 1A:** Critical 1A-1 and 1A-2 (AEBASE-02 asks for "explanation" not "column"); Medium 1A-4 (AEBASE-02 explicitly names 2 axes, provisioning is AEBASE-03); Medium 1A-5 (FEATURES.md treats ZTE as Mode 1); Medium 1A-6 (Knox ME is a method, not scope per FEATURES.md line 336).
- **Adversary disproves for 1B:** Medium 1B-2 ("Supervision Analog" column cross-references iOS supervision, does not use the term FOR Android — does not violate AEAUDIT-04); Medium 1B-4 (FEATURES.md treats AOSP as Mode 5); Low 1B-6 (iOS v1.3 5-col table shipped fine in SharePoint/Confluence).
- **Referee verdict:** 1B shape selected. AOSP placement under 1A (flaw 1A-3, CRITICAL, REAL) cannot be disambiguated cleanly in a 2x4 grid; 1B absorbs AOSP as Mode 5 row. But the column header is changed from "Supervision Analog" to "Management Scope" to avoid AEAUDIT-04 grep false-positive risk, with a dedicated narrative subsection carrying the iOS bridge.

**User's choice:** Accept all 5 adversarial-review recommendations. Discuss-phase confirmation: "Accept all 5 (Recommended)."
**Notes:** Referee design notes initially wrote "1A winner" but the prose described 1B structure — resolved by interpreting the Referee's intent from design notes (5-col comparison) rather than the option label.

---

## Area 2: Glossary Organization

### Options Evaluated

| Option | Description | Selected |
|--------|-------------|----------|
| 2A | Alphabetical index + category sections + per-term "Windows/iOS equivalent" callouts (exact _glossary-macos.md pattern) | ✓ |
| 2B | Categorized by theme without alphabetical top index | |
| 2C | Collision-table-first: upfront 4-platform side-by-side matrix then per-term detail (novel pattern) | |

### Adversarial Review Evidence
- **Finder score (total flaws):** 2A=17, 2B=17, 2C=37
- **Adversary disproves for 2A:** Medium 2A-2 (macOS glossary line 16 has alphabetical index — not longest-to-scan); Medium 2A-3 (ARCHITECTURE.md Anti-Pattern 4 "Do this instead" explicitly recommends after-definition cross-platform callouts — 2A matches, does not violate).
- **Adversary disproves for 2B:** Medium 2B-1 (SC1 requires "explicit cross-references", does not require O(1) alphabetical scan).
- **Adversary disproves for 2C:** Low 2C-7 (AEBASE-01 scopes glossary to admin audience, not L1).
- **Referee verdict:** 2A wins on pattern-precedent (exact _glossary-macos.md structure) + Anti-Pattern 4 compliance. 2C's collision-table-first pattern structurally encodes the very Anti-Pattern 4 that ARCHITECTURE.md warns against (Finder 2C-2 CRITICAL, CONFIRMED).

**User's choice:** Accept.
**Notes:** Mirrors v1.3 iOS pattern of extending existing glossary structure rather than inventing a new organizational scheme.

---

## Area 3: Tri-Portal Admin Template — Optional ZT Section Handling

### Options Evaluated

| Option | Description | Selected |
|--------|-------------|----------|
| 3A | Single template with all 3 H4 sections + HTML comment at top of ZT section `<!-- OMIT FOR: BYOD, AOSP -->` | ✓ |
| 3B | Three template variants: android-template-full / -dual / -single | |
| 3C | Single template with BEGIN/END conditional markers + decision matrix at top | |

### Adversarial Review Evidence
- **Finder score (total flaws):** 3A=36, 3B=45, 3C=27
- **Adversary disproves for 3A:** Critical 3A-1 (Pitfall 10 is about template sequencing, not deletion friction); Critical 3A-2 (SC3 literally says "optional — omit for BYOD, AOSP" — 3A implements the SC); Medium 3A-3 (authors copy from raw markdown, comments visible); Medium 3A-4 (macOS template lines 76-77 and iOS template lines 98-99 already use subtractive HTML-comment deletion — pattern is established and working); Low 3A-6 ("include when applicable" and "delete when not applicable" are logically equivalent).
- **Adversary disproves for 3B:** Medium 3B-6 (Pitfall 10 concern is sequencing, all three 3B templates still ship Phase 1). But 3B retains 3 CRITICAL flaws (triple maintenance burden, single-template precedent, SC3 names one file path).
- **Referee verdict:** 3A wins. 3A has 1 LOW real flaw after adversarial review (3A-5 — deletion rules stale if ZT applicability changes); 3B has 3 CRITICAL + 2 MEDIUM + 1 LOW. 3A matches v1.2/v1.3 precedent and SC3 literal text.

**User's choice:** Accept.

---

## Area 4A: Provisioning-Method Matrix Orientation

### Options Evaluated

| Option | Description | Selected |
|--------|-------------|----------|
| 4A-a | Mode-rows × method-cols (reader locates mode first) | ✓ |
| 4A-b | Method-rows × mode-cols | |
| 4A-c | Dual matrices (both orientations) | |

### Adversarial Review Evidence
- **Finder score:** 4A-a=17, 4A-b=17, 4A-c=36
- **Adversary disproves for 4A-a:** Medium 4A-a-2 (version-per-method fits cleanly as header sub-row); Low 4A-a-4 (flaw's "wider-than-tall" claim inverted — 5 rows × 4 cols is taller).
- **Adversary disproves for 4A-c:** Critical 4A-c-1 (Anti-Pattern 1 is about matrix embedded in mode guides, NOT two orientations in one canonical doc).
- **Referee verdict:** 4A-a wins on Phase 38 SC4 phrase alignment ("filtered row for dedicated mode" locks mode-as-rows orientation) and AEBASE-03 mode-first reader framing. 4A-b has methods-as-rows that matches FEATURES.md research artifact but creates cross-phase terminology inconsistency with Phase 38 SC4.

**User's choice:** Accept.
**Notes:** Downstream Phases 36-39 reference this matrix via filtered-row patterns; mode-rows orientation keeps that reference language consistent.

---

## Area 4B: Version Fragmentation Matrix Granularity

### Options Evaluated

| Option | Description | Selected |
|--------|-------------|----------|
| 4B-a | Breakpoints-only (cols: Min OS / Key Breakpoints / Latest Verified) + narrative callouts per breakpoint | ✓ |
| 4B-b | Full mode × version grid (5 rows × 11 version cols, per-cell notes) | |
| 4B-c | Hybrid (min-OS summary + chronological changelog + per-mode inline callouts) | |

### Adversarial Review Evidence
- **Finder score:** 4B-a=17, 4B-b=36, 4B-c=32
- **Adversary disproves for 4B-b:** Medium 4B-b-5 (Q7's inflation warning targets frontmatter fields only, not matrix cells).
- **Referee verdict:** 4B-a wins on lowest real-flaw count + cleanest mode-primary view + no triple-drift surface. 4B-a mirrors FEATURES.md lines 350-358 research artifact structure. Per-breakpoint narrative subsections handle detail without cell-overload; inline admin-guide callouts in Phases 36/38 handle mode-specific context without duplicating the matrix itself.

**User's choice:** Accept.
**Notes:** `last_verified` frontmatter on this matrix is load-bearing for Phase 42 milestone audit. 60-day review cycle (not 90).

---

## Claude's Discretion

Areas where user said "you decide" or Claude has flexibility:
- Exact word counts within 800-1200 range for enrollment overview
- Narrative tone/voice and audience framing language
- Exact category names in the glossary (5-category count is locked; names flexible)
- Whether to include a Mermaid decision diagram in the enrollment overview
- Exact cell content phrasing for version annotations in provisioning matrix
- Whether to include a "Portal shorthand glossary" at the top of the admin template
- Ordering of category sections in the glossary

## Deferred Ideas

Surfaced during adversarial review, filed for other phases or future milestones:
- Knox Mobile Enrollment row in provisioning matrix → v1.4.1
- Full AOSP OEM matrix → Phase 39 stub then v1.4.1 full
- 4-platform comparison document → v1.5 (AECOMPARE-01)
- Cross-platform navigation integration (nav hub backport) → post-v1.4 unification task
- `_glossary-macos.md` reciprocal cross-reference link → Phase 42 (AEAUDIT-03)

---

## Adversarial Review Score Summary

| Metric | Value |
|--------|-------|
| Total options evaluated | 15 (5 areas × 3 options) |
| Flaws identified by Finder | 46 |
| Flaws disproved by Adversary | 24 |
| Real flaws per Referee | 23 |
| Winners (lowest real-flaw count per area) | 1B (adapted), 2A, 3A, 4A-a, 4B-a |

Adversary correctly challenged several Finder over-applications:
- AEAUDIT-04 ("no supervision term for Android") does not prohibit cross-platform-mapping labels
- Anti-Pattern 1 (matrix duplication) targets mode-guide embedding, not orientations within one reference doc
- Pitfall 10 targets template sequencing, not manual-deletion friction
- macOS/iOS templates already use HTML-comment subtractive patterns successfully

---

*Discussion method: /adversarial-review skill on 2026-04-21*
*Source agents: general-purpose (Opus) × 3 — Finder, Adversary, Referee*
