# PIPE-02 Empirical Findings

**Phase 113 close artifact — Phase 114 handoff**
**Template authored by:** Agent (2026-07-03) — completed at the owner grounding checkpoint (2026-07-03)
**Procedure:** `PIPE-02-RUNBOOK.md` executed end-to-end; owner ran Q1–Q6 live in Copilot Studio; OQ4 resolved by programmatic `docProps/custom.xml` inspection.

---

## Run Metadata

| Field | Value |
|-------|-------|
| Date of test | 2026-07-03 |
| Tester | Owner (Schweinehund) |
| Test SharePoint library URL | Owner test tenant (not recorded in-repo) |
| Copilot Studio agent name / URL | Owner test agent (not recorded in-repo) |
| Pandoc version tested | 3.7.0.2 (pinned) |
| Raw transcript | `C:\Users\joanderson\Downloads\Tell me about Windows Autopilot dev.txt` (owner-local) |

All 5 representative `.docx` fixtures were uploaded to the owner's test SharePoint library and
queried live. Q1–Q6 all returned grounded, correctly-cited results with no hallucination.

---

## SC4 Confirmations

- [x] **Document-level citations resolve** — Copilot Studio returned **clickable** citations
  linking back to the correct `.docx` file in SharePoint (owner-confirmed). Citations are
  **document-level** (whole-file `.docx` references, no section anchors), matching the research
  (SUMMARY.md L233).
- [x] **Single-line stub EEE header block appears as body text** — Q2 (`What does document
  RE-T01 cover?`) had Copilot recite `Doc ID: RE-T01 · Platform: Windows · Doc Type: Runbook ·
  Status: Approved` directly from body text. The header block is indexed as retrievable body
  text, NOT only as an invisible Word property. **This is the load-bearing EEE thesis, proven.**

---

## Open Questions Resolved

### OQ1: Citation Title Source — RESOLVED: filename-driven

**Query used:** Q1 — `Tell me about Windows Autopilot device registration troubleshooting`

**Citation titles displayed (exact, across all queries):**

> `01-device-not-registered.docx`, `27-macos-sso-investigation.docx`,
> `android-capability-matrix.docx`, `38-8021x-certificate-failure.docx`, `draft-test-doc.docx`

Every citation rendered as the **`.docx` filename** — never the H1 heading (e.g., "Device Not
Registered in Autopilot"), never the Doc ID (RE-T01), never a SharePoint Title-column value
(a Title value would not carry the `.docx` extension).

**Citation title source:**
- [x] Filename (`01-device-not-registered.docx`, with `.docx` extension)
- [ ] SharePoint Title column value
- [ ] Word title property
- [ ] H1 content
- [ ] Other

**Was the document retrieved at all?**
- [x] Yes — citation and content returned on every query

**v1.16 file-rename candidate flag (owner decision):**
- [x] Yes — citation labels are the raw filenames, so a **v1.16 descriptive-filename
  normalization pass** should be scoped (deferred per CONTEXT.md §Deferred — v1.16 file-rename
  pass). Current corpus names are serviceable but include leading numbers / `.docx` and are not
  title-cased; the rename pass should evaluate citation-label quality corpus-wide.
- [ ] No

**Notes:** Filename-driven citation is confirmed with HIGH confidence (the `.docx` extension in
every citation rules out the SharePoint Title column). This is the exact trigger condition the
research named for the v1.16 file-rename candidate (SUMMARY.md L216-217).

---

### OQ2: Status:Draft Retrieval Gate vs Label — RESOLVED: label only (NOT a gate)

**Query used:** Q5 — `Tell me about the draft SSO guide`

**Q5 result:**
- [ ] Draft doc NOT retrieved
- [x] **Draft doc retrieved — draft label visible** in the Copilot response and citation
- [ ] Draft doc retrieved — no draft label visible

**Citation / response snippet from Q5:**

> Copilot retrieved and cited `draft-test-doc.docx` (RE-T05, **Status: Draft**), correctly
> reading its body text — it identified the doc as "a synthetic test fixture for Phase 113 Plan
> 04 grounding validation" that "must NOT be uploaded to the indexed production SharePoint
> library." It surfaced the `Status: Draft` value **because that value is body text**, but the
> Draft status did **not** prevent the document from being indexed and retrieved.

**Owner decision for Phase 114:**
- [x] **`Status: Draft` = LABEL only** — Copilot retrieves Draft docs without restriction. The
  EEE body-text `status:` label does NOT gate crawling/indexing (confirmed). Phase 114 EEE
  standard does **not** require SharePoint content-approval instructions as a hard dependency;
  Draft exclusion from the production library path remains the operator's manual responsibility
  (already documented in `scripts/pipeline/README.md` §SC3).
- [ ] `Status: Draft` MUST gate retrieval — enable SharePoint content-approval

**Phase 114 / deployment note:** SharePoint **content-approval** on the indexed library is the
*hardening lever* if a Draft doc must be provably un-retrievable (per CONTEXT.md §Deferred —
"SharePoint content-approval"). It is a tenant/ops configuration, not a doc change, and stays
deferred to deployment. Phase 114 should state plainly in the EEE standard: **Draft status is a
label, not an index gate — exclude Draft/superseded docs by library scoping (or content-approval),
never by relying on the body-text label.**

---

### OQ3: Chunk Boundary Behavior — RESOLVED: no P-02 fragmentation observed

**Queries used:** Q4 — `What are the Android Enterprise enrollment modes and their
capabilities?`; Q6 — `What are the BYOD Work Profile provisioning methods for Android?`

**Q4 result:** Copilot returned extensive `android-capability-matrix.docx` content with
**mode → capability associations intact** — each enrollment mode (COBO, COPE, BYOD, Dedicated,
COSU, ZTE, AOSP) correctly paired with its provisioning method, minimum Android version, DPC,
user-affinity, and per-domain capabilities (App Deployment, Configuration, Compliance, Software
Updates, Conditional Access). Column/row context survived retrieval.

**Q6 result:** The narrow BYOD-only probe returned correct BYOD-specific values with column
context preserved (Company Portal / Intune app provisioning, AMAPI April-2025 DPC change,
certificate-based Wi-Fi, min Android 5.0/practical 8+, Factory-Reset-Protection unaffected) —
no evidence of data rows retrieved without their column labels.

**Chunk boundary observation:**
- [x] Table content retrieved **with column/mode context intact** — P-02 chunk-split **not
  observed** for this deployment's chunk configuration on the tested matrix.
- [ ] Data rows retrieved WITHOUT column labels — P-02 confirmed

**Caveat / Phase 118 note:** The android-capability-matrix fixture is authored **mode-first**
(modes as the organizing axis), which is inherently chunk-resilient, and Copilot responses are
LLM-synthesized (so raw single-chunk header+data co-location is inferred, not directly observed).
No fragmentation harm occurred, but this does not *disprove* P-02 for a hypothetical wide,
flat, >25-row matrix. **Phase 118's planned mitigation stands as prudent belt-and-suspenders:**
cap tables at ~25 rows and add a prose summary within 5 lines of every large table (C17-lintable).
Confidence: MEDIUM-HIGH that P-02 is not a live problem for the current corpus's matrices.

---

### OQ4: Custom YAML Key Promotion — RESOLVED: pandoc promotes non-standard keys to invisible custom properties

**Method:** Programmatic inspection (not Word GUI). A fixture was converted with the pinned
pandoc 3.7.0.2 (`pandoc 01-device-not-registered.md -o _oq4.docx --reference-doc=reference.docx`)
and its `docProps/custom.xml` was read directly from the `.docx` zip.

**File inspected:** `01-device-not-registered.docx` (converted from the fixture)

**Finding:** Pandoc 3.7.0.2 **DOES promote non-standard YAML frontmatter keys to Word custom
document properties.** `docProps/custom.xml` contained every non-standard string key present in
the fixture's frontmatter:

| Frontmatter key | Promoted to `docProps/custom.xml`? | Value |
|-----------------|-----------------------------------|-------|
| `applies_to` | Yes | `APv1` |
| `audience` | Yes | `L1` |
| `last_verified` | Yes | `2026-03-20` |
| `review_by` | Yes | `2026-06-18` |

**The four OQ4 target keys (`doc_id`, `status`, `owner`, `doc_type`):**
- [ ] Yes — value: …
- [x] **Not present as custom properties — because they are NOT yet in the corpus frontmatter.**
  These four are **new keys the Phase 114 EEE standard will add**; in the Phase-113 fixtures they
  exist only as the visible **body-text stub** (`**Doc ID:** RE-T01 . **Platform:** Windows …`),
  not as YAML. The promotion **mechanism is confirmed** by the four keys above, so when Phase 114
  adds `doc_id/status/owner/doc_type` to frontmatter, pandoc **will** promote them to custom
  properties — i.e., they will be **invisible to Copilot's semantic index** (index reads body
  text only; custom properties are NOT indexed — SUMMARY.md L37-38).

**Pandoc version confirmed:** 3.7.0.2

**Implication for Phase 114 (decisive):** This **validates the entire EEE architecture.** Because
frontmatter keys land in invisible custom properties, the metadata the Copilot agent must see
(Doc ID, Platform, Doc Type, Status, Owner) is **only** available if it is **also rendered as a
visible body-text header block** — which Q2 confirmed works. Phase 114's EEE standard must keep
the single-line body-text header block as the retrieval-necessary, load-bearing element and treat
frontmatter purely as the harness source-of-truth (C10/C17 validate it; it never reaches the index).

**Also observed:** `docProps/core.xml` had an **empty `<dc:title/>`** (the fixture has no YAML
`title:` key), which is consistent with OQ1 — with no Word title property set, Copilot fell back
to the **filename** for the citation label. This cross-confirms OQ1.

---

## Additional Observations

- Retrieval quality was HIGH across all six queries and all five doc classes (Windows runbook,
  macOS runbook, Android reference matrix, compound-platform runbook, synthetic Draft) — every
  answer was grounded in the uploaded `.docx` with clickable document-level citations; no
  hallucinated or off-topic results.
- The **platform body-text field is queryable and discriminating**: Copilot correctly
  distinguished Windows vs. the compound `windows+macos+ios+android+linux` label vs. Android vs.
  macOS, and retrieved the right doc per platform scope. This validates the D1 approach of
  putting a normalized platform label in the visible header block for LLM-assisted filtering.
- Citations are **document-level only** (whole `.docx`, no section/page anchors) — matches the
  research HIGH-confidence claim (SUMMARY.md L233). Operators should not expect section-deep
  citation links from the SharePoint `.docx` connector.

---

## Phase 114 Handoff Summary

| Open Question | Resolved | Phase 114 Impact |
|--------------|----------|-----------------|
| OQ1: Citation title source | [x] Yes | **Filename-driven** → v1.16 descriptive-filename rename pass flagged (deferred). No Phase-114 blocker. |
| OQ2: Status:Draft gate vs label | [x] Yes | **Label only** (not a gate). EEE standard must state Draft exclusion = library scoping / content-approval, never the body label. Content-approval stays a deferred deployment hardening lever. |
| OQ3: Chunk boundary behavior | [x] Yes | **No P-02 split observed** on the mode-first matrix. Phase 118 table remediation (≤25-row cap + prose summary, C17-lintable) remains prudent belt-and-suspenders, not proven-mandatory. |
| OQ4: Custom property promotion | [x] Yes | **Non-standard keys promote to invisible custom properties (confirmed).** EEE standard MUST keep the visible body-text header block as retrieval-necessary; frontmatter is harness-only and never reaches the index. |

**Phase 113 close condition met:** all four OQs answered, both SC4 confirmations checked. The
MD→.docx pipeline is defined, locked, and empirically grounding-validated on the representative
set. Safe to proceed to Phase 114 (EEE standard authoring), carrying these four findings forward.
