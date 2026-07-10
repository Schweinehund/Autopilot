# PIPE-02 CLOSE — Empirical Findings (OWNER-RECORDED)

**Phase 125 close-gate grounding-confirmation pass — the close-gate (Plan 125-07) consumes
this file.**
**Template authored by:** Agent (2026-07-09). **Executed by:** _(owner fills in)_.
**Procedure:** `PIPE-02-CLOSE-RUNBOOK.md` (this directory), executed end-to-end live in
Copilot Studio on the real-corpus representative `.docx` set, retargeted to the four v1.16
structural deltas per D-125-2.

> **STATUS: AWAITING OWNER EXECUTION.** This is an empty template. The owner must run the
> full runbook live in Copilot Studio, fill in every section below, paste the raw transcript
> in-repo, and attest the final verdict. **The close-gate (Plan 125-07) BLOCKS until
> `PIPE-02 CLOSE: PASS` is attested and this file is committed.**

---

## Run Metadata

| Field | Value |
|-------|-------|
| Date of test | _(owner fills in)_ |
| Tester | Owner |
| Test SharePoint library URL | _(owner-local; test library — evidence is the in-repo transcript)_ |
| Copilot Studio agent name / URL | _(owner-local; EEE knowledge-source agent)_ |
| Pandoc version (conversion) | 3.7.0.2 (pinned) |
| Files uploaded | _(owner fills in — expect 8; see RUNBOOK §1 representative-set table)_ |
| Raw transcript | _(owner fills in — file name + line count, this directory)_ |

---

## Representative Set (as uploaded)

**Fill in Grounded / Clickable doc-level citation / Hallucination-free for each row actually
uploaded and queried.** The agent-prepared candidate set (RUNBOOK §1) is listed below as a
starting point — adjust if the owner substitutes a different real Approved doc.

| # | Doc ID | Platform | Retrofit class | Grounded | Clickable doc-level citation | Hallucination-free |
|---|--------|----------|-----------------|----------|-------------------------------|----------------------|
| 1 | RE-184 | Windows | glossary | _ | _ | _ |
| 2 | RE-182 | macOS | glossary | _ | _ | _ |
| 3 | RE-189 | iOS/iPadOS | lifecycle | _ | _ | _ |
| 4 | RE-185 | Android | lifecycle | _ | _ | _ |
| 5 | RE-181 | Linux | glossary | _ | _ | _ |
| 6 | RE-217 | cross-platform (802.1X) | decision-tree | _ | _ | _ |
| 7 | RE-219 | all 5 (index) | nav-hub | _ | _ | _ |
| 8 | RE-192 | Windows | lifecycle | _ | _ | _ |

---

## Per-Probe Results (owner-recorded, as actually run)

> Full verbatim text for every query is expected in the pasted raw transcript below.

| Probe | Doc | Verdict |
|-------|-----|---------|
| **Q1** — Windows glossary (ESP definition) | RE-184 | _(owner fills in: PASS / FAIL + detail)_ |
| **Q2** — macOS glossary (ABM definition) | RE-182 | _(owner fills in)_ |
| **Q3** — iOS/iPadOS enrollment path overview | RE-189 | _(owner fills in)_ |
| **Q4** — Android enrollment overview | RE-185 | _(owner fills in)_ |
| **Q5** — Linux glossary + glossary anchor-slug probe (COBO/COPE/WPCO) | RE-181 | _(owner fills in — confirm the double-hyphen-slug term grounds correctly)_ |
| **Q6** — 802.1X decision-tree leaf-citability probe | RE-217 | _(owner fills in — confirm EVERY decision leaf is citable, none dropped)_ |
| **Q7** — Nav-hub link-table routing probe | RE-219 | _(owner fills in — confirm correct link-table row retrieved)_ |
| **Q8** — Descriptive-filename citation-label probe | RE-192 | _(owner fills in — record the EXACT citation label text displayed)_ |
| **Q9** — EEE header-block metadata query | RE-184 | _(owner fills in)_ |
| **Q10** — Negative hallucination control (ChromeOS, out-of-corpus) | — | _(owner fills in)_ |

---

## Four-Leg Roll-Up (the RETARGETED v1.16-delta probes)

| Probe leg | Query | Verdict |
|-----------|-------|---------|
| (a) Decision-tree leaf-citability (STD-04/RETRO-05) | Q6 | _(owner fills in)_ |
| (b) Glossary anchor-slug citation, double-hyphen trap (RETRO-04) | Q5 | _(owner fills in)_ |
| (c) Nav-hub link-table retrieval (RETRO-06) | Q7 | _(owner fills in)_ |
| (d) Descriptive-filename citation-label quality (PIPE-04/OQ1) | Q8 | _(owner fills in)_ |
| 5-platform grounding | Q1-Q5 | _(owner fills in)_ |
| (thesis) EEE header block indexed as body text | Q9 | _(owner fills in)_ |
| (control) no hallucination on out-of-corpus query | Q10 | _(owner fills in)_ |

---

## Raw Transcript (CAPTURE IN-REPO — D-119-1 precedent carried forward)

> Paste the **full raw Copilot Studio transcript** (every query + full response + citation
> panel text) below, or link to a sibling `.txt` file in this directory (mirrors the v1.15
> `PIPE-02-CLOSE-TRANSCRIPT.txt` precedent). Do NOT leave it owner-local — this is the one
> close-gate leg no re-audit axis can reproduce.

_(owner pastes transcript here, or inserts a link to `PIPE-02-CLOSE-TRANSCRIPT.txt` in this
directory)_

---

## Overall Attestation

**Owner attestation (final line — the close-gate reads this):**

> `PIPE-02 CLOSE: ____`

Failing-probe description (if FAIL): _(owner fills in, or "None — no probe failed.")_

**Attested by:** _(owner fills in)_  **Date:** _(owner fills in)_

---

*This file is a template awaiting owner execution. Plan 125-07 (the single close-gate)
consumes the completed, committed version of this artifact — with `PIPE-02 CLOSE: PASS`
attested — to flip HARN-07 / PIPE-02 (and all 14 v1.16 requirements) to Validated.*
