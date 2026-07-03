# PIPE-02 Empirical Findings

**Phase 113 close artifact — Phase 114 handoff**  
**Template authored by:** Agent (2026-07-03) — owner fills in at the grounding checkpoint  
**Procedure:** Follow `PIPE-02-RUNBOOK.md` end-to-end before completing this file

---

## Run Metadata

| Field | Value |
|-------|-------|
| Date of test | _(YYYY-MM-DD)_ |
| Tester | _(name)_ |
| Test SharePoint library URL | _(URL)_ |
| Copilot Studio agent name / URL | _(name and URL)_ |
| Pandoc version tested | 3.7.0.2 (pinned) |

---

## SC4 Confirmations

These two confirmations are the primary Phase 113 success criteria for the live grounding leg.
Check each after running the query sequence.

- [ ] **Document-level citations resolve** — Copilot Studio returns clickable citations that link
  back to the correct `.docx` file in SharePoint (confirmed from Q1 and Q2 results)
- [ ] **Single-line stub EEE header block appears as body text** — the `**Doc ID:** RE-T01 ...`
  header line is present in Copilot's retrieved content (confirmed from Q2 RE-T01 retrieval),
  NOT only as a Word custom property

If either confirmation cannot be checked, describe the issue in the relevant OQ slot below
and in the Additional Observations section.

---

## Open Questions Resolved

### OQ1: Citation Title Source

**Research reference:** SUMMARY.md L216-217 — MEDIUM confidence that citation titles are
driven by the SharePoint filename/page name, not the H1 heading. Exact precedence unknown.

**Query used:** Q1 — `Tell me about Windows Autopilot device registration troubleshooting`

**Q1 citation title displayed (exact text from citation panel):**

> _(paste exact citation panel text — e.g., "01-device-not-registered" or "Windows Autopilot Device Registration Troubleshooting" or other)_

**Citation title source (check one):**

- [ ] Filename (e.g., `01-device-not-registered` or `01-device-not-registered.docx`)
- [ ] SharePoint Title column value (set separately in the library)
- [ ] Word title property (from YAML `title:` frontmatter promoted by pandoc)
- [ ] H1 content (the `# Title` heading text from the source `.md`)
- [ ] Other: _____________

**Was the document retrieved at all?**

- [ ] Yes — citation and content returned
- [ ] No — document not found

**v1.16 file-rename candidate flag (owner decision):**

- [ ] Yes — current filenames are poor citation labels; a file-rename pass should be
  scoped for v1.16 (deferred per CONTEXT.md §Deferred — v1.16 file-rename pass)
- [ ] No — current filenames are acceptable as citation labels; no rename pass needed

**Notes / observations:**

> _(free text)_

---

### OQ2: Status:Draft Retrieval Gate vs Label

**Research reference:** SUMMARY.md L221 — unknown whether `Status: Draft` body-text label
prevents indexing (retrieval gate) or is simply a visible label with no indexing effect.
SharePoint content-approval can gate crawling; the EEE `status: draft` body-text label alone
does not.

**Query used:** Q5 — `Tell me about the draft SSO guide`

**Q5 result (check one):**

- [ ] Draft doc NOT retrieved — Copilot returned no results from `draft-test-doc.docx`
  (this would mean Status:Draft is acting as a retrieval gate — perhaps content-approval
  is already configured on the test library)
- [ ] Draft doc retrieved — draft label visible in the Copilot response or citation
- [ ] Draft doc retrieved — no draft label visible (Copilot cites it as authoritative)

**Citation text / response snippet from Q5:**

> _(paste)_

**Owner decision for Phase 114 (check one):**

- [ ] `Status: Draft` = LABEL only — Copilot retrieves Draft docs without restriction;
  Phase 114 EEE standard does NOT need SharePoint content-approval instructions; Draft
  exclusion from the production library path remains the operator's manual responsibility
  (already documented in `scripts/pipeline/README.md` §SC3)
- [ ] `Status: Draft` MUST gate retrieval — enable SharePoint content-approval on the
  indexed library so Draft docs are excluded from the index until promoted; Phase 114 EEE
  standard must include content-approval setup instructions for operators

**Notes / observations:**

> _(free text)_

---

### OQ3: Chunk Boundary Behavior

**Research reference:** SUMMARY.md L222 — default chunk size ~2,000 chars with ~500-char
overlap; exact behavior for `.docx` in this deployment is unknown. P-02 risk: capability
matrix header rows and data rows may land in separate chunks, making column labels unavailable
when data rows are retrieved.

**Query used (primary):** Q4 — `What are the Android Enterprise enrollment modes and their capabilities?`  
**Query used (optional):** Q6 — `What are the BYOD Work Profile provisioning methods for Android?`

**Q4 result — describe what content was returned from the android-capability-matrix:**

> _(e.g., "Response included the table header row ('Enrollment Mode | Work Profile | Device Owner...') together with the first several data rows" OR "Response returned data rows but the column labels (header row) were absent" — include the actual response snippet if helpful)_

**Q6 result (if run):**

> _(describe chunk boundary evidence from the narrow Work Profile query)_

**Chunk boundary observation (check one):**

- [ ] Table header row + data rows retrieved together in the same chunk — P-02 not a
  problem for this deployment's chunk size configuration
- [ ] Data rows retrieved WITHOUT column labels (header row in a different chunk) — P-02
  chunk-split confirmed; Phase 118 table remediation must add a prose summary within 5
  lines of all tables >25 rows

**Notes / observations:**

> _(free text)_

---

### OQ4: Custom YAML Key Promotion

**Research reference:** SUMMARY.md L220; Pandoc issue #3034 — standard YAML keys (`title`,
`author`, `date`) promote to Word built-in document properties. Non-standard key behavior is
version-specific; MEDIUM confidence that `doc_id`, `status`, `owner`, `doc_type` become Word
custom properties in pandoc 3.7.0.2.

**Inspection procedure:** Open a converted `.docx` in Word → **File > Info > Properties >
Advanced Properties** (or File > Properties > Custom tab on older Word versions). Check for
each key under the "Custom" tab.

**File inspected:** _(e.g., `01-device-not-registered.docx`)_

**Custom properties present (check each):**

- `doc_id` → Custom property:
  - [ ] Yes — value: _____________
  - [ ] No (key not promoted to custom properties)

- `status` → Custom property:
  - [ ] Yes — value: _____________
  - [ ] No

- `owner` → Custom property:
  - [ ] Yes — value: _____________
  - [ ] No

- `doc_type` → Custom property:
  - [ ] Yes — value: _____________
  - [ ] No

**Pandoc version confirmed:** 3.7.0.2

**Implication for Phase 114 (owner note):**

If all four keys appear as custom properties, the EEE standard can document that non-standard
YAML keys promote correctly with the pinned pandoc version — no workaround needed.

If any keys are absent from custom properties, record which ones and their expected values.
Phase 114 must decide whether to handle missing promotion (e.g., include the value in a
second body-text location).

**Notes / observations:**

> _(free text — include Word version used, any errors, screenshot filenames if applicable)_

---

## Additional Observations

> _(Free text — any unexpected behavior, errors, hallucinations, connector sync issues,
> performance observations, or other grounding findings not captured above)_

---

## Phase 114 Handoff Summary

Complete this section after filling in OQ1-OQ4 above.

| Open Question | Resolved | Phase 114 Impact |
|--------------|----------|-----------------|
| OQ1: Citation title source | [ ] Yes / [ ] No | If filename-driven: v1.16 file-rename pass flagged; if H1-driven: no action |
| OQ2: Status:Draft gate vs label | [ ] Yes / [ ] No | If gate: Phase 114 must include content-approval setup; if label: operator manual exclusion only (already documented) |
| OQ3: Chunk boundary behavior | [ ] Yes / [ ] No | If P-02 split confirmed: Phase 118 must add prose summaries within 5 lines of all tables >25 rows |
| OQ4: Custom property promotion | [ ] Yes / [ ] No | If any keys absent: Phase 114 EEE standard must note the gap and propose workaround |

**Phase 113 close condition:** This file committed with all four OQs answered and both SC4
confirmations checked (or issues described). Return to the project thread and type
**"findings recorded"** (or describe any grounding issues observed) to trigger the
continuation agent.
