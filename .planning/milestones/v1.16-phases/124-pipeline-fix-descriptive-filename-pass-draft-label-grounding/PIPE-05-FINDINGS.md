# PIPE-05 Empirical Findings

**Phase 124 (Plan 03) close artifact — Phase 125 HARN-07 partial input**
**Template authored by:** Agent (2026-07-08) — BLANK, completed by the owner at the
Phase 124 terminal checkpoint. **OUTCOME: PASS (owner-confirmed 2026-07-08, "approved").**
**Procedure:** `PIPE-05-RUNBOOK.md` executed end-to-end; owner ran the two fixed queries
live in Copilot Studio and recorded the outcome below.

---

## Run Metadata

| Field | Value |
|-------|-------|
| Date of test | 2026-07-08 |
| Tester | Josh Anderson (owner) |
| Test SharePoint library URL | owner tenant (recorded out-of-band) |
| Copilot Studio agent name / URL | owner tenant (recorded out-of-band) |
| Pandoc version tested | 3.7.0.2 (pinned, per Task 1 local conversion proof) |
| Fixture uploaded | `draft-test-doc.docx` (Doc ID RE-T05) |
| Raw transcript (optional) | not captured verbatim — outcome + response snippets recorded below in-thread |

**Two-stage run note:** the FIRST run indexed a STALE v1.15 copy of `draft-test-doc.docx`
(the bot cited "Phase 113 Plan 04" and a Doc-ID-first `.`-separated header — the old stub
shape, not the shipped format under test). Substance still PASSed on that run, but it was
not proving the shipped format. The owner RE-RAN the same two queries against the
freshly-regenerated shipped-format build (`.pipeline-output/draft-test-doc.docx` — verified
Platform-first `·`-separated block, Phase-124 body) after re-uploading, and CONFIRMED on the
shipped format. See `PIPE-05-RUNBOOK.md` "⚠ Re-index gotcha" for the mechanism and the
prevention steps for future re-runs.

---

## SC4 Confirmations

Record the binary outcome for each of the two fixed queries from `PIPE-05-RUNBOOK.md`
§Section 3. PASS = the literal "Draft" label appears in the response/citation, attributable
to the visible `**Status:** Draft` body-text block.

- [x] **RENDER query PASS** — `Tell me about the draft macOS test document` retrieved
  `draft-test-doc.docx` and the response/citation surfaced the literal "Draft" label.
  - Citation / response snippet: Copilot retrieved and CITED `draft-test-doc.docx` (footnote),
    surfaced the literal "Status: Draft" from the visible body-text block, and correctly
    identified it as a Draft/under-review test fixture — contrasting it in the same response
    with RE-130's "Approved" status. Confirmed against the re-uploaded shipped-format build.
- [x] **QUERYABLE query PASS** — `What is the status of the RE-T05 document?` returned a
  response naming RE-T05 with `Status: Draft`.
  - Response snippet: Copilot answered "The status of RE-T05 is Draft." — sourced from the
    visible `**Status:**` body-text block. Confirmed against the re-uploaded shipped-format
    build.

**Mechanism confirmation:** frontmatter `status:` promotes to an invisible Word custom
property (OQ4) and is never surfaced by Copilot Studio's semantic index. The fact that both
queries above surfaced "Draft" therefore proves the answer came from the visible `**Status:**
Draft` body-text block, not the frontmatter — this is the D-17 re-confirmation of the v1.15
finding, now empirically re-proven against the shipped `·`-separated Platform-first block
format (not just the v1.15 `.`-separated Doc-ID-first stub format).

---

## Outcome (select exactly one)

- [x] **PASS** — both queries above are checked PASS. The Draft label renders and is
  queryable against the shipped EEE header-block format, re-confirming the v1.15 Phase-113
  finding (`PIPE-02-FINDINGS.md` OQ2) on the new format shape. **SC4 closes cleanly.**

- [ ] **DEFERRED (D-16 tenant-unavailable stub)** — the live Copilot Studio / SharePoint
  tenant was unavailable at execution time. This is an honest deferred record, NOT a
  fabricated pass:
  > Prepared; live confirmation deferred to deployment.
  **SC4 closes cleanly on this deferred record too** — the fixture, runbook, and local
  convert/guard proof remain committed and re-runnable whenever the tenant becomes available.

- [ ] **FAIL (surfacing defect — D-18 escalation)** — the document was retrieved but the
  literal "Draft" label did NOT appear anywhere in the response/citation (or the document was
  not retrieved at all). Per D-18 this does **NOT** auto-close SC4:
  > This is a genuine regression against `docs/_standards/EEE-SOP-standard.md`
  > §"Draft status is a label, not an index gate" (the shipped block format should behave
  > identically to the v1.15 stub format that already proved this leg works). Escalates as a
  > defect requiring triage before Phase 124 close — do not mark SC4 complete.
  - Failure detail: _(owner fills in — exact query, response, and what was expected vs. observed)_

---

## D-19 Note — PIPE-05 ≠ HARN-07

This FINDINGS document is a **necessary but NOT sufficient** input to Phase 125's HARN-07
("PIPE-02 grounding-validation confirmation on the retrofitted structural corpus"). HARN-07
spans the whole retrofitted corpus; this probe is the narrow Draft-label **format**
re-confirmation slice only (one synthetic fixture, two fixed queries). Phase 125 must
reference this file as supporting evidence — it does not, by itself, discharge HARN-07.

---

## Checkpoint Discipline Reminder (D-16)

Hold the active Jira Story **In Progress** across this checkpoint until this file is
committed and the outcome above is confirmed in-thread. The agent that authored this template
does not auto-flip the ROADMAP.md SC4 checkbox — that happens only after the owner's
in-thread confirmation ("approved" / "deferred" / "fail") and this file's commit.
