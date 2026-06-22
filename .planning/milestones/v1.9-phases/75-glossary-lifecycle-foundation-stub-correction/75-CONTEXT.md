# Phase 75: Glossary, Lifecycle Foundation & Stub Correction - Context

**Gathered:** 2026-06-20
**Status:** Ready for planning

<domain>
## Phase Boundary

Foundation prerequisites for the v1.9 macOS Platform SSO milestone. Three locked deliverables:

1. **Glossary vocabulary** — `docs/_glossary-macos.md` gains a new `## Authentication` section with three entries (Platform SSO, Secure Enclave, Enterprise SSO Plug-in), each with reciprocal see-also links to `docs/_glossary.md`; `_glossary.md` carries the reciprocal back-pointers. (SSOREF-01)
2. **Stub correction** — `docs/admin-setup-macos/03-configuration-profiles.md` `## Extensible SSO` section: correct the three DS-5 factual errors and replace the external "See official Microsoft documentation" fallback with an in-suite pointer to guide 07. (PSSO-04)
3. **Lifecycle timing notes** — `docs/macos-lifecycle/00-ade-lifecycle.md` gains surgical, append-only SSO-timing notes at Stages 4, 6, and 7. (SSOREF-03)

**Not in this phase:** authoring guide `07-platform-sso-setup.md` (Phase 76), the auth-methods deep-dive `08` (Phase 77), capability-matrix updates (Phase 79), runbooks (Phase 80), nav-hub integration (Phase 81), harness lineage bump (Phase 82). This phase only establishes what those phases link *to*.

</domain>

<decisions>
## Implementation Decisions

All four gray areas were resolved via a three-agent adversarial review (Finder → Adversary → Referee) per user's standing preference. Each ruling is grounded in the option carrying the fewest/least-severe REAL objections while satisfying the locked success criteria. Two critical, repo-verified findings (XC-1, XC-2 below) reshape the phase.

### Critical findings (must be honored by planner)
- **XC-1 — "Entra ID SSO" term does not exist.** SC1 (SSOREF-01) names "Entra ID SSO" as a reciprocal see-also target, but the term has **zero occurrences anywhere in `docs/`** — only `### TPM` exists in `_glossary.md`. The criterion is unbuildable as literally written. **Resolution (user-confirmed): create the term** (D-03).
- **XC-2 — active forward-link to guide 07 breaks the audit harness.** `scripts/validation/v1.8-milestone-audit.mjs:670-676` hard-codes `allowlist.length !== 15` (exactly 6 `transient_external` + 9 `template_placeholder`; only those two categories exist). Guide `07-platform-sso-setup.md` does not exist until Phase 76, so an active markdown link would be a broken internal link with no valid allowlist category — failing the BLOCKING C13 gate. **Resolution: defer the live link** (D-06).

### Glossary entry depth & cross-refs (SSOREF-01)
- **D-01:** **Medium-depth entries (Option 1C, modified).** Each of the three terms gets a 3-5 sentence definition. Include a `> **Windows equivalent:**` blockquote **for Platform SSO only** — Secure Enclave↔TPM is too lossy to assert as a clean equivalence (forcing it would re-introduce a DS-5-class factual error), and Enterprise SSO Plug-in doesn't need one. Rejected: 1A (too terse — re-seeds the DS-5 #3 three-method conflation); 1B (rich MAM-WE pattern forces both a pointer to the non-existent guide 07 and the lossy Secure Enclave↔TPM equivalence).
- **D-02:** **See-also wiring (anchor-safe).** Secure Enclave → `_glossary.md#tpm` with a one-clause caveat ("analogous hardware root of trust; not bit-for-bit equivalent — Secure Enclave performs no TPM-2.0/DICE attestation"). Platform SSO and Enterprise SSO Plug-in cross-link each other and link to the new `_glossary.md#entra-id-sso` (see D-03). The reciprocal back-pointer required by SC1 goes **inside the body** of the existing `### TPM` entry in `_glossary.md`, pointing to `_glossary-macos.md#secure-enclave` — confirmed anchor-safe (markdown anchors are heading-text slugs; editing an existing entry's body shifts no anchors).
- **D-03:** **Create one short `### Entra ID SSO` term in `_glossary.md`** (user-confirmed resolution of XC-1). 1-2 sentences (Windows primary-refresh-token / WAM brokered SSO concept) with a reciprocal see-also back to `_glossary-macos.md#enterprise-sso-plug-in`. Adding a new heading is anchor-safe (no existing slug collision — verified). This slightly expands SSOREF-01's literal scope; the planner should note it as a SPEC-wording correction.
- **D-04:** **Update the `## Alphabetical Index` — YES.** Add the three new terms with deterministically-computed GitHub slugs: `platform-sso`, `secure-enclave`, `enterprise-sso-plug-in` (lowercase, spaces→hyphens, parentheses stripped). Insert in correct alphabetical position (normal index operation, not an append-only violation). Skipping it would leave the new terms undiscoverable via the file's own documented navigation entry point.

### Stub correction scope (PSSO-04 / DS-5)
- **D-05:** **Targeted edit (Option 2C, modified) — anchor-safe, no subheading touched.** Rejected: 2B (full-body rewrite — eliminated; would change the count of the file's repeated `#### In Intune admin center` subheadings, shifting their position-numbered duplicate anchors → PITFALL-6 violation); 2A (minimal — fails SC2's second half and leaves errors unfixed). Exact mandate:
  1. **DS-5 #2 (macOS-version inaccuracy) — fix BOTH instances.** Verified two: line ~163 (section intro `... or Platform SSO (macOS 14+) ...`) AND line ~166 (Platform SSO bullet). Correct both to the accurate version statement (framework available macOS 13+; macOS 14 recommended; macOS 14 required only for Smart card). Do not leave line 163 stale while editing only 166.
  2. **DS-5 #1 + #3 — keep TWO distinct bullets, don't merge.** Rewrite the Platform SSO bullet so it no longer claims "binds the macOS login password" as a blanket statement (true only for Password-sync) and no longer conflates the three auth methods. Leave the already-correct Microsoft Enterprise SSO plug-in (Redirect type) bullet's substance intact (touch only if its version clause is wrong).
  3. **SC2 closing link** — delete the external "See official Microsoft documentation for full Platform SSO configuration..." sentence (~line 168) and replace it with the in-suite pointer to guide 07 (form governed by D-06).
  4. Do **not** add/remove/rename any `#### In Intune admin center` subheading (count stays at 9 → no anchor shift).

### Forward-link to the not-yet-written guide 07 (XC-2)
- **D-06:** **Deferred link (Option 3B).** Rejected: 3A (active link + 16th allowlist entry — eliminated, breaks the hard-coded 15-entry C13 assertion and fits no allowlist category); 3C (interim/softened target — points readers at a wrong/misleading doc, only partially satisfies SC2). Mechanism:
  - **Phase 75** writes the closing pointer with the filename as **inline code, NOT a markdown link**, e.g.: `` Continue with Platform SSO setup in `07-platform-sso-setup.md` (added in the next documentation phase). `` Because it is a code span / plain text, C13 does not validate it and the 15-entry allowlist stays untouched — harness stays green. (Referee ruled "bare filename trips a path checker" a FALSE POSITIVE: C13's scope is markdown link targets, not inline-code text.)
  - **Phase 76** converts it to a live markdown link `[Platform SSO setup](07-platform-sso-setup.md)` *in the same commit that creates the file*, so link and target land atomically and C13 never sees a broken link.
  - **SC2 satisfied in substance:** the external Microsoft fallback is removed and replaced with an internal in-suite pointer to the canonical successor doc. Where the locked broken-link gate and a literal "must be a link" reading collide, the gate wins. **Planner MUST add a Phase-76 task:** "convert the `07-platform-sso-setup.md` code-span to a markdown link in `03-configuration-profiles.md` §Extensible SSO."

### Lifecycle stage-note format/placement (SSOREF-03)
- **D-07:** **Append to the existing `### Watch Out For` subsection (Option 4A, modified).** Rejected: 4C (new labeled mini-callout at stage end — eliminated; adds a 5th structural element that contradicts the file's own documented "Each of the seven stages below contains four subsections" invariant at line 23, and risks displacing the stage-ending `---` separators); 4B (inline sentence after the numbered "What Happens" steps — orphan/ambiguous, awkward in the table-dense Stage 4). Exact mandate:
  - Add each SSO-timing note as a new item at the **end of the existing `### Watch Out For` subsection** of Stages 4, 6, and 7 — matching that subsection's local formatting (if it uses bullets, add a bullet; do not introduce a blockquote into a bullet list).
  - Purely additive within an existing subsection → preserves the "four subsections" invariant, moves no `### ` heading, displaces no `---`, creates no new anchors. Fully append-only per SC3.
  - **Stage 6 wording must respect the conditional branch:** Stage 6 (Company Portal Sign-In) is skipped in userless/device-affinity enrollment. Phrase to avoid implying SSO applies to userless devices, e.g. "When Company Portal sign-in occurs (skipped in userless enrollment), Platform SSO device registration completes here..."
  - Content per stage: Stage 4 — SSO extension profile must arrive before first sign-in attempt; Stage 6 — Entra device registration via Platform SSO; Stage 7 — SSO key expiry / re-attestation note.

### Claude's Discretion
- Exact prose wording of glossary definitions, stub bullets, and stage notes — left to the planner/executor within the factual constraints above (DS-5 corrections, macOS-version facts, 90-day-review-cycle front matter per SUMMARY.md).
- Whether any new fact-bearing line gets `last_verified` / `review_by` front matter per the v1.9 90-day PSSO review cadence (SUMMARY.md lines 182-188) — apply where the researcher flags rapidly-changing facts.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase scope & requirements
- `.planning/ROADMAP.md` §"Phase 75" — goal, depends-on, requirements (PSSO-04, SSOREF-01, SSOREF-03), and the three success criteria
- `.planning/REQUIREMENTS.md` — PSSO-04 (line 25), SSOREF-01 (line 50), SSOREF-03 (line 52), and the traceability table (lines 102-126)
- `.planning/research/SUMMARY.md` §"Phase 75" (lines ~180-207) — phase rationale, deliverables list, pitfalls addressed (DF-3, DF-4, DF-5, DF-9, DF-10, DF-13, DS-5), and the 90-day-review-cycle fact list (lines 182-188)
- `.planning/research/PITFALLS.md` §"DS-5" (lines 676-700) — the three documented factual errors in the existing stub, with prevention guidance

### Files to edit (verified current state)
- `docs/_glossary-macos.md` — add `## Authentication` section + 3 entries; update `## Alphabetical Index`; existing H2s: Alphabetical Index, Enrollment, Device Management, App Distribution, App Protection (MAM), Version History (append a Version History row)
- `docs/_glossary.md` — add `### Entra ID SSO` term (Security section neighbors: `### TPM` @line ~111, `### TPM attestation`, `### Secure Boot`); add reciprocal back-pointer inside the existing `### TPM` entry body
- `docs/admin-setup-macos/03-configuration-profiles.md` §"## Extensible SSO" (~lines 157-168) — DS-5 correction + deferred forward-link; do NOT touch the repeated `#### In Intune admin center` subheadings
- `docs/macos-lifecycle/00-ade-lifecycle.md` — Stage 4 (@line ~203), Stage 6 (@line ~300), Stage 7 (@line ~331); each has 4 subsections ending in `### Watch Out For`, stages separated by `---`; "four subsections" invariant documented at line 23

### Audit harness (do not break)
- `scripts/validation/v1.8-milestone-audit.mjs` lines 670-676 — C13 link-check: `allowlist.length !== 15` + 6 `transient_external` / 9 `template_placeholder` hard assertions. The deferred-link decision (D-06) exists specifically to keep this green.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- **MAM-WE glossary entry** (`docs/_glossary-macos.md`) — reference pattern for entry structure (`> **Windows equivalent:**` + `> See also:` blockquotes), but deliberately NOT replicated in full (D-01 uses a lighter shape to avoid forced inaccurate equivalences).
- **Phase 59 (CLEAN-08) see-also normalization** — established the convention of appending `> See also:` lines inside existing `> **Windows equivalent:**` blockquotes; reciprocal back-pointer wiring (D-02) follows this precedent.

### Established Patterns
- **Anchor stability (PITFALL-6 / DA-4):** zero existing anchors may shift. Markdown anchors are heading-text slugs — adding/editing entry *bodies* is anchor-safe; adding/removing/renaming *headings* (or changing the count of duplicate `#### In Intune admin center` headings) shifts anchors. Drives D-02, D-05.
- **Append-only for shared/nav files:** glossary and lifecycle edits are additive; the Alphabetical Index alphabetical insertion (D-04) is the one sanctioned in-place edit.
- **BLOCKING C13 broken-link gate** with a fixed-count allowlist — no new internal broken links may be introduced (drives D-06).
- **90-day review cadence on PSSO docs** (SUMMARY.md) — fact-bearing lines may need `last_verified` / `review_by` front matter.

### Integration Points
- Everything authored here is a link *target* for Phases 76-81. Slug/anchor names chosen now (`#platform-sso`, `#secure-enclave`, `#enterprise-sso-plug-in`, `#entra-id-sso`) become contracts those phases depend on — name them deliberately.

</code_context>

<specifics>
## Specific Ideas

- Closing stub pointer literal form (D-06): `` Continue with Platform SSO setup in `07-platform-sso-setup.md` (added in the next documentation phase). `` — filename in a code span, not a link.
- Secure Enclave↔TPM caveat (D-02): assert analogy, not equivalence — "analogous hardware root of trust; not bit-for-bit equivalent — Secure Enclave performs no TPM-2.0/DICE attestation."
- Stage 6 conditional phrasing (D-07): "When Company Portal sign-in occurs (skipped in userless enrollment), Platform SSO device registration completes here..."

</specifics>

<deferred>
## Deferred Ideas

- **Convert the guide-07 code-span to a live markdown link** — belongs to Phase 76, in the same commit that creates `07-platform-sso-setup.md`. Recorded as a mandatory Phase-76 planner task (D-06).
- **Capability-matrix Authentication section + 5-platform comparison cells** (SSOREF-02) — Phase 79.
- **Nav-hub integration** (SSOREF-04) — Phase 81.
- **SPEC-wording correction for SSOREF-01** — the "Entra ID SSO" see-also target named a non-existent term; resolved here by creating the term (D-03). A REQUIREMENTS.md wording cleanup could note that the term is now established by Phase 75.

</deferred>

---

*Phase: 75-glossary-lifecycle-foundation-stub-correction*
*Context gathered: 2026-06-20*
