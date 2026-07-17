---
phase: 129-device-recipe-doc-class-foundation
reviewed: 2026-07-17T00:00:00Z
depth: standard
files_reviewed: 2
files_reviewed_list:
  - docs/_standards/EEE-SOP-standard.md
  - docs/_templates/recipe-template.md
findings:
  critical: 1
  warning: 4
  info: 1
  total: 6
status: fixed
fixed_at: 2026-07-17T00:00:00Z
fixed: 6
skipped: 0
---

# Phase 129: Code Review Report

**Reviewed:** 2026-07-17
**Depth:** standard
**Files Reviewed:** 2
**Status:** fixed (all 6 findings resolved — see Fixes Applied)

## Summary

Reviewed the STD-05 addition to `docs/_standards/EEE-SOP-standard.md` (new section, D-02 ruling
row, Version-History row) and the new `docs/_templates/recipe-template.md` against the 15 locked
decisions in 129-CONTEXT.md and against the live C17 implementation.

**Verified clean (evidence-backed, not assumed):**
- C17 mechanical compliance: `--self-test` 4/4 PASS; full corpus run: **230 files checked, 0
  violations** with both changed files enrolled. Template frontmatter parses despite the leading
  HTML comment (C17 uses a multiline `---` match precisely for this — script lines 121-122).
- All C17 #12 top-level blockquote runs in the template measure 137–168 chars as the validator
  counts them (prefix-stripped, space-joined) — instantiated copies will survive #12.
- Template ↔ standard table headers match exactly (`| Option | When to choose | Consequence if
  wrong | Branch |` and `| Option | When to choose | Recorded as |`); the mandatory blank line
  precedes every table in both files.
- All cited cross-references resolve: `docs/macos-lifecycle/01-psso-provisioning-walkthrough.md`
  (the "no reconvergence" claim verified at its line 65), `docs/l2-runbooks/26-apple-business-permission-denied.md`,
  `docs/admin-setup-apv1/04-dynamic-groups.md`, `docs/decision-trees/10-8021x-triage.md`, and the
  template's `../_standards/EEE-SOP-standard.md` relative link.
- D-12 honored: `last_verified: 2026-07-04` unbumped; Version-History row added.
- D-08 letter honored: `RetentionDays` is not a field named in ROADMAP Phase 130/131 (literal
  names there: `InactiveThreshold`, `AutoSubscription`) — but see WR-04 for a semantic collision.

**Not clean:** one Critical (template's platform instruction contradicts the D1 map and forecloses
Phase 131's required value) and four Warnings, all of the internal-consistency / factual-claim
class this review was scoped to catch.

## Critical Issues

### CR-01: Template's "Valid values" platform list contradicts the D1 map and excludes Phase 131's required value

**File:** `docs/_templates/recipe-template.md:16`
**Issue:** The authoring instruction reads "Valid values: Windows | macOS | iOS | Android |
Linux | all". Per the standard's D1 Platform Normalization Map, there are **20** valid raw
values — and the phase's own code-context establishes that the very next consumers need two of
them: `Windows` (Phase 130) and **`ios+shared-ipad`** (Phase 131, → "iOS + Shared iPad"). An
author following this instruction literally cannot express the Shared iPad recipe's platform and
will pick `iOS` instead — which passes C17 #9/#10 cleanly and ships the wrong platform label
("iOS", not "iOS + Shared iPad") into the retrieval layer the whole EEE program exists to keep
correct. The line was inherited verbatim from `admin-template.md:13`, where the 6-value subset
was adequate for that class; for the recipe class it is a false exhaustive claim with a concrete
silent-wrong-metadata path in the immediately following phase.
**Fix:**
```markdown
     - Set platform to the appropriate D1-mapped value -- replace 'all' if this recipe covers a
       specific platform. Any raw value in the D1 Platform Normalization Map
       (docs/_standards/EEE-SOP-standard.md) is valid -- e.g. Windows, macOS, ios+shared-ipad
```

## Warnings

### WR-01: STD-05's "one-sentence" lead-in rule is contradicted by every worked example, including its own

**File:** `docs/_standards/EEE-SOP-standard.md:470` (rule); `docs/_standards/EEE-SOP-standard.md:542-543`, `docs/_templates/recipe-template.md:60-61,70-71,81-82` (examples)
**Issue:** D-01 states every decision point opens with a "**one-sentence** `> **Ask the admin:**`
blockquote lead-in carrying the prompt ONLY." But the D-11 fenced sample's lead-in is two
sentences ("…or Shared PC (full shared desktop)? **This choice selects the branch for every step
below.**"), and all three template examples follow the same two-sentence shape (prompt + a
routing/recording sentence). The spec's normative text and its canonical examples disagree:
Phase 130/131 authors copying the examples violate D-01's letter, while a strict reader of D-01
would strip the routing sentence the examples deliberately model. This tension originates in the
locked context (D-01's "one-sentence" phrasing and the `<specifics>` two-sentence example are
both LOCKED), so the fix is a precision amendment, not a re-litigation — but ROADMAP SC3 requires
the spec be "documented precisely enough that Phases 130/131 apply it without further design
decisions," and this is exactly a further design decision left open.
**Fix:** In D-01, reword to match the examples and the real constraint: "opens with a short
`> **Ask the admin:**` blockquote lead-in — the prompt sentence, optionally followed by one short
routing/recording sentence, the whole run ≤ 200 characters as C17 #12 measures it. Options and
their consequences never go inside the blockquote." (Surface to the orchestrator/owner since
D-01's wording is LOCKED.)

### WR-02: False mechanical claim — a missing blank line does NOT inflate the C17 #12 run

**File:** `docs/_standards/EEE-SOP-standard.md:486-490`
**Issue:** D-02 justifies the mandatory blank line with two claims: GFM lazy continuation absorbs
the pipe row into the blockquote (true — rendering/docx destruction) "**and inflates the run past
the C17 #12 200-character cap**" (false). C17 #12 operates on literal source lines: its run
collector is `while (/^>/.test(line))` (script lines 393-399), and a `| Option |…` table row does
not start with `>`, so the run terminates at the table row **whether or not the blank line is
present** — the validator's measurement is unchanged. The blank-line rule itself is correct and
stays (the rendering-destruction rationale alone fully justifies it, and D-02 is LOCKED), but the
canonical standard now asserts a harness behavior the harness does not have; a future author
testing the claim will find the standard wrong about its own gate.
**Fix:** Delete the inflation clause; keep the render-destruction rationale:
"…GFM lazy continuation absorbs the pipe row into the blockquote — this silently destroys the
table in the rendered `.docx` body (it becomes blockquote text, not a table), removing the
decision table from the indexed retrieval surface."

### WR-03: STD-05 subsection numbering is non-sequential (D-01…D-05, then D-13, then D-11)

**File:** `docs/_standards/EEE-SOP-standard.md:469,486,492,503,513,523,532`
**Issue:** STD-05's subsections run D-01, D-02, D-03, D-04, D-05, **D-13**, **D-11** — the last
two carry the 129-CONTEXT decision IDs verbatim instead of continuing the section-local sequence.
The house pattern (STD-04) is sequential per-section numbering (D-01..D-04). A reader of the
standard alone — the artifact that outlives the phase context — sees an unexplained gap
(D-06..D-12 absent, except D-11 which appears *after* D-13) and has no way to know these are
phase-artifact IDs. This also creates ambiguity against the document's other D-numbers (top-level
D-05 is the visible-header-block format; STD-05 D-05 is the branch idiom). Numbering was executor
discretion (context "Claude's Discretion"), but discretion does not license an incoherent result.
**Fix:** Renumber in document order: D-13 → **D-06 (Recipe Summary end-state statement)**, D-11 →
**D-07 (Worked example)**; update the one internal forward reference at line 499 ("(D-11)" →
"(D-07)") and the self-reference at line 539. If traceability to the phase context is wanted,
append "(129-CONTEXT D-13/D-11)" parenthetically once.

### WR-04: Synthetic Case-2 example semantically collides with SharedPC retention fields Phase 130 must document

**File:** `docs/_templates/recipe-template.md:68-77`
**Issue:** The D-08 constraint required the enumerable example be synthetic and non-colliding with
AVD-01..05/IPAD-01..04 fields. `RetentionDays` passes the literal check (ROADMAP Phase 130 names
`InactiveThreshold`, session-reset behaviors, `AutoSubscription`), but the example's *subject* —
"what retention period should apply to cached session data" on a shared device, valued in days —
is functionally a description of the SharedPC CSP's cached-account retention controls
(`InactiveThreshold` is literally "delete cached accounts after N days"), which the Phase 130
recipe documents under AVD-04's session-hygiene decision points. The "illustrative synthetic
field" flag is present, but an AVD-recipe author or reader can plausibly conflate the synthetic
`RetentionDays` with the real `InactiveThreshold` — the exact confusion the non-collision
constraint exists to prevent.
**Fix:** Swap the example subject to something with no shared-device/session/cache CSP analog,
e.g. a help-desk display string set or a wallpaper rotation interval:
`> **Ask the admin:** Which support-contact card should the lock screen display? This value is recorded in the device configuration profile.`
with options like `Recorded as: SupportCard: HQ` / `SupportCard: Regional` / `SupportCard: MSP`.

## Info

### IN-01: Version-History row understates STD-05's normative content

**File:** `docs/_standards/EEE-SOP-standard.md:617`
**Issue:** The 2026-07-17 row enumerates "D-01..D-05" but the section also ships D-13 — a
**REQUIRED** (registry-review-enforced) rule that every recipe Summary opens with an end-state
statement — and the D-11 worked-example/carve-out. The row names the section and the ruling row
(satisfying D-12's letter), but omits the section's only REQUIRED-labeled rule from the change
description.
**Fix:** Extend the parenthetical: "…3-rule branch floor + RECOMMENDED PSSO-idiom, REQUIRED
Summary end-state rule, fenced worked example + carve-out…" — and renumber per WR-03 if that fix
lands first.

---

## Fixes Applied

All 6 findings fixed 2026-07-17, one atomic commit per finding. Post-fix verification:
`--self-test` 4/4 PASS; full corpus run **230 files checked, 0 violations**; every
`> **Ask the admin:**` lead-in run measures 68–98 chars as C17 #12 counts (Scope blockquote
168) — all ≤200. `last_verified: 2026-07-04` remains unbumped (D-12); no validator/allowlist
file touched (D-10).

### CR-01 — fixed (`f24e617b`)

`recipe-template.md` platform instruction no longer enumerates a closed 6-value list; it now
points at the authoritative ~20-entry D1 Platform Normalization Map in
`docs/_standards/EEE-SOP-standard.md`, explicitly naming compound values such as
`ios+shared-ipad` (→ "iOS + Shared iPad", Phase 131's required value) and warning against
treating any shorter list as exhaustive.

### WR-01 — fixed (`4d998e93`)

Resolved in favor of the LOCKED one-sentence D-01 rule (spec text untouched): trimmed all four
worked-example lead-ins — the STD-05 fenced sample and the template's three examples — to a
single prompt sentence. The routing/recording clauses were redundant with the `Branch` /
`Recorded as` table columns and were dropped; the Case-3 (no-table) example now models the
recording sentence as plain prose outside the blockquote, teaching the correct placement.

### WR-02 — fixed (`8e2678ba`)

Deleted the false "inflates the run past the C17 #12 200-character cap" clause from the D-02
rationale (the #12 run collector stops at the non-`>` table row). The blank-line rule remains
MANDATORY on the true rationale: GFM lazy continuation destroys the rendered table (blockquote
text, not a table) and removes the decision table from the indexed retrieval surface.

### WR-03 — fixed (`0742f649`)

Renumbered STD-05 subsections sequentially per the STD-04 house pattern: D-13 → **D-06**
(Recipe Summary end-state statement), D-11 → **D-07** (Worked example). Updated the intra-file
cross-reference in D-03 ("(D-11)" → "(D-07)"). Grep of both the standard and the template
confirmed no other references to the old subsection IDs.

### WR-04 — fixed (`cd79f8eb`)

Swapped the synthetic enumerable example from `RetentionDays` (semantically a description of
SharedPC cached-account retention / `InactiveThreshold`, which Phase 130 documents under
AVD-04) to a support-contact lock-screen card (`SupportCard: HQ | Regional | MSP`) — no
shared-device/session/cache CSP analog, no AVD-01..05/IPAD-01..04 field. Table shape
(`| Option | When to choose | Recorded as |`), synthetic-field flag, and one-sentence lead-in
(77 chars) preserved.

### IN-01 — fixed (`4ebc0dc0`)

Version-History row now enumerates D-01..D-07 (post-WR-03 numbering) including the REQUIRED
recipe-Summary end-state rule and the fenced worked example + index-excluded-standard
carve-out.

---

_Reviewed: 2026-07-17_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
_Fixed: 2026-07-17 — Claude (gsd-code-fixer), 6/6 findings, commits f24e617b..4ebc0dc0_
