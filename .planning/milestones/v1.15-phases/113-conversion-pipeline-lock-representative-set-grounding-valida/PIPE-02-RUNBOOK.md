# PIPE-02 Owner-Run Grounding Validation Runbook

**Procedure for:** Phase 113 live Copilot Studio grounding validation of the representative set  
**Authored by:** Agent (2026-07-03) — owner-executed at the Phase 113 close checkpoint  
**Decision basis:** D-01 (owner-run live legs); D-06 (single owner touchpoint); REQUIREMENTS L77  
**Records into:** `PIPE-02-FINDINGS.md` (this same directory)

---

## Why This Leg Is Owner-Run

The agent has no live Copilot Studio or SharePoint access. Provisioning that access is
explicitly out of scope (REQUIREMENTS L77; D-01). The agent has completed the in-scope legs:

- Pandoc 3.7.0.2 pinned; `reference.docx` committed; canonical invocation documented (Plan 01-02)
- Post-conversion guard authored and self-tested (Plan 02)
- All 6 representative set fixtures converted; guard exit 0 on every file (Plan 03)

The live upload + queries + Word Properties inspection are the one remaining leg — all
owner-run at this checkpoint. The agent authors this step-by-step procedure; the owner
executes it and records findings in `PIPE-02-FINDINGS.md`.

---

## Section 1: Prerequisites

Before starting, confirm all of the following.

**Owner-supplied (fill in before proceeding):**

| Item | Value |
|------|-------|
| Test SharePoint document library URL | _(owner fills in — e.g., `https://contoso.sharepoint.com/sites/TestSite/Documents/Shared%20Documents`)_ |
| Copilot Studio agent name | _(owner fills in — e.g., `IT-KnowledgeBase-Test`)_ |
| Copilot Studio agent URL / chat entry point | _(owner fills in)_ |

**Agent-confirmed preconditions (all met as of Plan 03):**

The Plan 03 guard run confirmed all 5 representative `.docx` files converted cleanly. Refer
to `scripts/pipeline/test-fixtures/README.md` §"Conversion and Guard Results" for the full
manifest. Summary:

| # | Source Fixture | Doc ID | Convert OK | Guard Exit | YAML-Leak | Notes |
|---|---------------|--------|-----------|------------|-----------|-------|
| 1 | `01-device-not-registered.md` | RE-T01 | YES | 0 (PASS) | PASS | Windows runbook |
| 2 | `27-macos-sso-investigation.md` | RE-T02 | YES | 0 (PASS) | PASS | macOS L2 runbook |
| 3 | `android-capability-matrix.md` | RE-T03 | YES | 0 (PASS) | PASS | Android capability matrix |
| 4 | `38-8021x-certificate-failure.md` | RE-T04 | YES | 0 (PASS) | PASS | Compound-platform runbook |
| 5 | `draft-test-doc.md` | RE-T05 | YES | 0 (PASS) | PASS | Status:Draft synthetic |

The converted `.docx` files live in `.pipeline-output/test-fixtures/` (gitignored; on disk
from the Plan 03 run). If that directory is no longer present (e.g., clean checkout), re-run
the conversion for each fixture:

```
.\scripts\pipeline\convert.ps1 -InputMd scripts\pipeline\test-fixtures\01-device-not-registered.md `
                                -OutputDocx .pipeline-output\test-fixtures\01-device-not-registered.docx
```

Then re-run the guard to confirm exit 0 before uploading:

```
node scripts/pipeline/guard-docx.mjs .pipeline-output/test-fixtures/01-device-not-registered.docx
```

Repeat for each of the 5 fixture files. Do not upload any file with guard exit 1.

**Critical:** Do NOT upload `draft-test-doc.docx` to the indexed production library — upload
it only to the test library. Draft exclusion from the production path is documented in
`scripts/pipeline/README.md` §SC3.

---

## Section 2: Upload Procedure

**Step 2.1 — Open the test SharePoint document library.**  
Navigate to the test SharePoint library URL (filled in under Prerequisites).

**Step 2.2 — Upload the 5 `.docx` files.**  
Use the SharePoint UI (Upload button or drag-and-drop). Upload these five files from
`.pipeline-output/test-fixtures/`:

- `01-device-not-registered.docx`
- `27-macos-sso-investigation.docx`
- `android-capability-matrix.docx`
- `38-8021x-certificate-failure.docx`
- `draft-test-doc.docx`

**Step 2.3 — Verify the library.**  
After upload, confirm all five files appear in the document library without indexing errors
or red banners. Check that the Status column shows "Indexed" or "Completed" (exact column
name varies by SharePoint configuration) before proceeding.

**Step 2.4 — Wait for the Copilot Studio connector to sync.**  
The Copilot Studio knowledge source connector reindexes on a schedule. Wait 15–30 minutes
after upload before running queries. If the connector has a manual "Sync" button in the
Copilot Studio admin panel, trigger it and wait for the sync to complete.

---

## Section 3: Query Sequence

Run the following queries in the Copilot Studio chat interface, in order. Enter the exact
query text shown. After each query, note the result per the "Records" column — these feed
the four open questions in `PIPE-02-FINDINGS.md`.

| Query | Exact Query Text | What to Record |
|-------|-----------------|----------------|
| Q1 | `Tell me about Windows Autopilot device registration troubleshooting` | Citation title format — what text appears in the citation panel? Is it the SharePoint filename, the document's H1 heading, the SharePoint Title column value, or the Word title property? Record the exact citation text. Was the document retrieved at all? |
| Q2 | `What does document RE-T01 cover?` | Doc-ID body-text retrieval — did Copilot find and cite RE-T01? Record whether the response references the RE-T01 header stub. This confirms body-text doc-ID search works end-to-end. |
| Q3 | `Show me information about 802.1X certificate failures on Windows and macOS` | Multi-platform body-text retrieval — was `38-8021x-certificate-failure.docx` cited? Note whether the compound platform label `windows+macos+ios+android+linux` was indexed correctly and did not block retrieval. |
| Q4 | `What are the Android Enterprise enrollment modes and their capabilities?` | Table chunk retrieval (P-02) — describe what content was returned from the android-capability-matrix. Was the capability table header row (`Enrollment Mode`, `Work Profile`, etc.) included in the same response chunk as the data rows? Or were the column labels absent from the retrieved chunk? |
| Q5 | `Tell me about the draft SSO guide` | Status:Draft retrieval — was `draft-test-doc.docx` retrieved? If yes: is "Status: Draft" visible anywhere in the Copilot response or citation? Record the full citation text and response snippet. |
| Q6 (optional) | `What are the BYOD Work Profile provisioning methods for Android?` | Chunk boundary probe — ask a narrow question targeting content near a chunk boundary in the capability matrix. Record what content is retrieved to confirm or refute the chunk-boundary behavior observed in Q4. |

**For each query, also note:**
- Were the results grounded in the uploaded documents (clickable citations)?
- Were any hallucinated or off-topic results returned?
- Did the citation panel show a clickable link back to the SharePoint file?

---

## Section 4: Word Custom Properties Inspection (OQ4)

This inspection is done in Word, not in Copilot Studio. It verifies pandoc 3.7.0.2's
custom-property promotion behavior for non-standard YAML frontmatter keys.

**Steps:**

1. Open one of the converted `.docx` files in Microsoft Word (e.g., `01-device-not-registered.docx`).
2. Click **File** > **Info** > **Properties** > **Advanced Properties**, or on older Word versions:
   **File** > **Properties** > **Custom** tab.
3. Look for the following custom property keys:
   - `doc_id`
   - `status`
   - `owner`
   - `doc_type`
4. Record whether each key appears as a custom property and, if so, its value.

**What to expect (MEDIUM confidence — empirical verification required per RESEARCH §OQ4):**
Pandoc's standalone mode promotes non-standard YAML keys to Word custom document properties
(not body text). If this works correctly, `doc_id`, `status`, `owner`, and `doc_type` should
appear in the Custom properties panel. If any of these keys are missing, record that clearly
in OQ4 — it affects how Phase 114 specifies the EEE standard.

---

## Section 5: Phase Completion Condition

Phase 113 closes when **all four open questions are answered** in `PIPE-02-FINDINGS.md` and
that file is committed to the repository.

**OQ1 — Citation Title Source:** What label does Copilot Studio use for citations? (Q1 result)  
**OQ2 — Status:Draft Retrieval Gate vs Label:** Is the Draft doc retrieved? Is draft status visible? (Q5 result) — your decision gates Phase 114's content-approval instructions  
**OQ3 — Chunk Boundary Behavior:** Are table header rows and data rows retrieved together or split? (Q4 + Q6 results)  
**OQ4 — Custom YAML Key Promotion:** Do `doc_id`/`status`/`owner`/`doc_type` appear as Word custom properties in pandoc 3.7.0.2? (Word Properties inspection)

**Also confirm the two SC4 checkboxes** in `PIPE-02-FINDINGS.md`:
- Document-level citations resolve (clickable links return the correct .docx in SharePoint)
- The single-line stub EEE header block appears as body text in Copilot responses (not only as a Word custom property — confirm from Q2 RE-T01 retrieval)

After recording all findings in `PIPE-02-FINDINGS.md`, commit the file:

```
git add .planning/phases/113-conversion-pipeline-lock-representative-set-grounding-valida/PIPE-02-FINDINGS.md
git commit -m "docs(113-04): record PIPE-02 empirical findings — OQ1-OQ4 resolved"
```

Then return to the project thread and confirm: **"findings recorded"** (or describe any
grounding issues observed). The continuation agent will author `113-04-SUMMARY.md` and
close Phase 113.
