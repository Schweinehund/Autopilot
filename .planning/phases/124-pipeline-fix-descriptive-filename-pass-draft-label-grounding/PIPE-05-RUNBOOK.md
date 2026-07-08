# PIPE-05 Owner-Run Draft-Label Grounding Runbook

**Procedure for:** Phase 124 (Plan 03) live Copilot Studio Draft-label grounding probe
**Authored by:** Agent (2026-07-08) — owner-executed at the Phase 124 terminal checkpoint
**Decision basis:** D-13 (owner-run, agent-prepared, blocking checkpoint sequenced LAST);
D-14 (single reformatted fixture); D-15 (evidence shape — two fixed queries, binary rubric);
D-16 (checkpoint discipline, honest tenant-unavailable fallback)
**Records into:** `PIPE-05-FINDINGS.md` (this same directory)

---

## Why This Leg Is Owner-Run

The agent has no live Copilot Studio or SharePoint access in this environment — no connector
or credential exists (verified at Phase 124 discuss-phase, D-13). The agent has completed
every in-scope local leg:

- `scripts/pipeline/test-fixtures/draft-test-doc.md` reformatted to the shipped EEE
  single-line block (`·`-separated, Platform-first, before the H1) + full 9-key frontmatter
  with `status: draft` (Task 1, commit `a479550`)
- The reformatted fixture converts through `convert.ps1` exit 0 (0 nav-footer rewrites) and
  passes `guard-docx.mjs` (3 PASS: YAML-LEAK, HEADING-STYLE, CUSTOM-PROPS)
- `.pipeline-output/draft-test-doc.docx` produced and ready to upload

**Important framing (D-17):** this probe is a **cosmetic format re-confirmation**, not a
new-leg discovery. The v1.15 Phase-113 PIPE-02 probe already confirmed the visible
`**Status:**` body-text leg surfaces (`PIPE-02-FINDINGS.md` OQ2, Q5) — that finding is
codified in `docs/_standards/EEE-SOP-standard.md` §"Draft status is a label, not an index
gate". PIPE-05 re-confirms this holds true against the **shipped** `·`-separated
Platform-first block shape (vs. the v1.15 `.`-separated Doc-ID-first stub shape the
original probe used) — the same underlying behavior, a different cosmetic format.

The live upload + queries is the one remaining leg — owner-run at this checkpoint. The agent
authors this step-by-step procedure; the owner executes it and records findings in
`PIPE-05-FINDINGS.md`.

---

## Section 1: Prerequisites

Before starting, confirm all of the following.

**Owner-supplied (fill in before proceeding):**

| Item | Value |
|------|-------|
| Test SharePoint document library URL | _(owner fills in — e.g., `https://contoso.sharepoint.com/sites/TestSite/Documents/Shared%20Documents`)_ |
| Copilot Studio agent name | _(owner fills in — e.g., `IT-KnowledgeBase-Test`)_ |
| Copilot Studio agent URL / chat entry point | _(owner fills in)_ |

**Agent-confirmed preconditions (met as of Task 1, this plan):**

| Item | Value |
|------|-------|
| Source fixture | `scripts/pipeline/test-fixtures/draft-test-doc.md` (Doc ID `RE-T05`) |
| Converted artifact | `.pipeline-output/draft-test-doc.docx` |
| Convert result | `convert.ps1` exit 0, 0 PIPE-03 nav-footer rewrites |
| Guard result | `guard-docx.mjs` exit 0 — 3 PASS (YAML-LEAK, HEADING-STYLE, CUSTOM-PROPS), 0 FAIL |
| Visible header block | `**Platform:** macOS · **Doc Type:** Runbook · **Doc ID:** RE-T05 · **Status:** Draft` (before the H1) |
| Frontmatter | `status: draft` (full 9-key set) |

If `.pipeline-output/` is not present (e.g., clean checkout — it is gitignored), re-run the
conversion before uploading:

```
.\scripts\pipeline\convert.ps1 -InputMd scripts\pipeline\test-fixtures\draft-test-doc.md `
                                -OutputDocx .pipeline-output\draft-test-doc.docx
node scripts/pipeline/guard-docx.mjs .pipeline-output/draft-test-doc.docx
```

Do not upload if guard exit is not 0.

**Critical (SC3 — repeated from `scripts/pipeline/README.md`):** Do NOT upload
`draft-test-doc.docx` to the indexed production SharePoint library. Upload it to the **TEST
library ONLY.** Draft exclusion from the production path is an operator/library-scoping
responsibility (`EEE-SOP-standard.md` §"Draft status is a label, not an index gate"), never
the body-text label itself.

---

## Section 2: Upload Procedure

**Step 2.1 — Open the test SharePoint document library.**
Navigate to the test SharePoint library URL (filled in under Prerequisites).

**Step 2.2 — Upload the ONE `.docx` file.**
Use the SharePoint UI (Upload button or drag-and-drop). Upload this single file from
`.pipeline-output/`:

- `draft-test-doc.docx`

**Critical:** upload to the TEST library ONLY — never the production/indexed library. This
is a repeat of the Section 1 warning; it is repeated here deliberately at the point of action.

**Step 2.3 — Verify the library.**
After upload, confirm the file appears in the document library without indexing errors or
red banners. Check that the Status column shows "Indexed" or "Completed" (exact column name
varies by SharePoint configuration) before proceeding.

**Step 2.4 — Wait for the Copilot Studio connector to sync.**
The Copilot Studio knowledge source connector reindexes on a schedule. Wait 15-30 minutes
after upload before running queries. If the connector has a manual "Sync" button in the
Copilot Studio admin panel, trigger it and wait for the sync to complete.

---

## Section 3: Query Sequence

Run the following TWO fixed queries in the Copilot Studio chat interface, in order. Enter
the exact query text shown.

| Query | Exact Query Text | What to Record |
|-------|-------------------|-----------------|
| RENDER | `Tell me about the draft macOS test document` | Was `draft-test-doc.docx` retrieved at all? Record the full citation title and response snippet. |
| QUERYABLE | `What is the status of the RE-T05 document?` | Did the response surface the Doc ID `RE-T05` and its `Status` value? Record the exact response text. |

**Binary rubric (record PASS/FAIL per query, per D-15):**

- **PASS** = the literal word "Draft" appears in the Copilot response or citation,
  attributable to the visible `**Status:** Draft` body-text block (not merely inferred).
- **FAIL** = the document is retrieved but "Draft" does NOT appear anywhere in the
  response/citation, OR the document is not retrieved at all.

For each query, also note:
- Was the result grounded in the uploaded document (a clickable citation)?
- Was any hallucinated or off-topic content returned?

---

## Section 4: Completion Condition

PIPE-05 / SC4 closes when the owner records one of these three outcomes in
`PIPE-05-FINDINGS.md` and commits the file:

1. **PASS** — the literal "Draft" label rendered and was queryable per the binary rubric
   above. This is the expected outcome (re-confirms the v1.15 Phase-113 finding against the
   shipped block format). SC4 closes cleanly.
2. **DEFERRED (D-16 tenant-unavailable stub)** — if the live tenant is unavailable at
   execution time, record "prepared; live confirmation deferred to deployment" — **never a
   fabricated PASS.** SC4 closes cleanly on this honest deferred record too.
3. **FAIL (surfacing defect, D-18)** — if the Draft label genuinely does NOT surface in the
   shipped block format, this is a real regression against
   `EEE-SOP-standard.md` §"Draft status is a label, not an index gate" and does **NOT**
   auto-close SC4 — it escalates as a defect requiring triage before Phase 124 close.

**Checkpoint discipline (D-16):** hold the active Jira Story **In Progress** across this
checkpoint (do not let the Stop-hook flip it Done mid-probe). The agent that authored this
runbook does **not** auto-flip the SC4 checkbox in ROADMAP.md — it flips only after the
owner's in-thread confirmation and the committed `PIPE-05-FINDINGS.md`.

After recording the outcome in `PIPE-05-FINDINGS.md`, commit the file:

```
git add .planning/phases/124-pipeline-fix-descriptive-filename-pass-draft-label-grounding/PIPE-05-FINDINGS.md
git commit -m "docs(124-03): record PIPE-05 Draft-label grounding probe findings"
```

Then return to the project thread and confirm one of: **"approved"** (PASS recorded),
**"deferred"** (tenant-unavailable stub committed), or **"fail"** (surfacing FAIL — escalate
to triage). A continuation agent commits the SC4 closure per the recorded outcome and authors
`124-03-SUMMARY.md`.

**D-19 reminder:** `PIPE-05-FINDINGS.md` is a **necessary but NOT sufficient** input to Phase
125's HARN-07 (the whole-retrofitted-corpus grounding-validation confirmation) — it is the
narrow Draft-label format slice only. Phase 125 must reference it, not treat it as
discharging HARN-07.
