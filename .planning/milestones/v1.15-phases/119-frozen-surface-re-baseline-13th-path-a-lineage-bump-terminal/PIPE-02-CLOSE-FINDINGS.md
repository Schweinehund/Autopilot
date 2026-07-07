# PIPE-02 CLOSE — Empirical Findings (OWNER-RECORDED)

**Phase 119 close-gate second grounding-confirmation pass — the close-gate consumes this file.**
**Template authored by:** Agent (2026-07-06). **Executed by:** Owner (2026-07-06).
**Procedure:** `PIPE-02-CLOSE-RUNBOOK.md` (this directory), executed end-to-end live in Copilot
Studio on the real-corpus representative `.docx` set.

> **STATUS: OWNER-EXECUTED — `PIPE-02 CLOSE: PASS` ATTESTED (2026-07-06).** The owner ran the
> full runbook live in Copilot Studio (~23:10–23:16, 2026-07-06); every one of the 6 uploaded
> `.docx` was retrieved + cited with clickable, document-level citations, and no hallucination
> was observed on any probe (incl. the negative control). The raw Copilot Studio transcript is
> captured in-repo at `PIPE-02-CLOSE-TRANSCRIPT.txt` (529 lines, this directory) — satisfying the
> D-119-1 transcript-in-repo rider (T-119-06-ASSERTED mitigation). **This artifact is the evidence
> the close-gate (Plan 119-07) consumes to flip HARN-04 / PIPE-02 to Validated.**

---

## Run Metadata

| Field | Value |
|-------|-------|
| Date of test | 2026-07-06 (~23:10–23:16 live run) |
| Tester | Owner |
| Test SharePoint library URL | _(owner-local; test library — evidence is the in-repo transcript)_ |
| Copilot Studio agent name / URL | _(owner-local; EEE knowledge-source agent)_ |
| Pandoc version (conversion) | 3.7.0.2 (pinned) |
| Files uploaded | 6 real `.docx` (all 6 retrieved + cited); see representative-set table below |
| Raw transcript | `PIPE-02-CLOSE-TRANSCRIPT.txt` (this directory, 529 lines — in-repo, D-119-1 rider) |

---

## Draft-Probe Decision (owner-confirmable — see RUNBOOK §Draft-Probe)

- [x] **Option A (recommended, agent-prepared):** test-artifact-only `status: Approved → Draft`
  mutation of RE-130 (`docs/admin-setup-linux/02-enrollment-profile.md`); source `.md` untouched;
  artifact never committed to the corpus.
- [ ] Option B: used a `docs/_templates/*.md` file (genuine born-Draft scaffolding).
- [ ] Option C: reused the Phase-113 synthetic draft-test-doc (NOT recommended).

**Owner note on the Draft-probe choice:** Option A selected. **Honest caveat (recorded per this
milestone's honest-accounting discipline):** the test-artifact mutation changed ONLY the
frontmatter `status:` line, NOT the visible EEE header-block `**Status:**` text. Consequently
RE-130 was retrieved + cited (retrieval is NOT gated by status — the substantive property under
test), and the status *field* read correctly, BUT the visible block still displayed
`Status: Approved`, so the literal "Draft" **label** was not exercised end-to-end. The owner
accepted this as an **artifact-prep gap, NOT a corpus/grounding failure** — the two substantive
properties (retrieval-not-gated + status-field-visible) are confirmed. **v1.16 follow-up:** if a
true Draft-label probe is wanted, mutate BOTH the frontmatter `status:` AND the visible
`**Status:**` block text of the uploaded artifact.

---

## Representative Set (as uploaded)

**6 real `.docx` uploaded; all 6 retrieved + cited.** Android platform coverage was folded into
the wide/flat 5-platform matrix (RE-143, which includes the Android column incl. "Mode-dependent"
handling) rather than a separate Android reference doc, so RE-144 was not uploaded in the live run.

| # | Doc ID | Platform | Class | Grounded | Clickable doc-level citation | Hallucination-free |
|---|--------|----------|-------|----------|------------------------------|--------------------|
| 1 | RE-002 | Windows | L1 runbook | Y | Y | Y |
| 2 | RE-069 | macOS | L2 runbook | Y | Y (6 cites) | Y |
| 3 | RE-057 | iOS/iPadOS | L2 runbook | Y | Y (5 cites) | Y |
| 4 | RE-129 | Linux | admin-setup | Y | Y | Y |
| 5 | RE-143 | all 5 (wide/flat) | reference | Y | Y | Y |
| 6 | RE-130 (Draft artifact) | Linux | admin-setup | Y | Y | Y |

---

## Per-Probe Results (owner-recorded, as actually run)

> Note on numbering: the live run used the owner's probe sequence below. Android platform
> coverage was exercised **inside** the wide-matrix probe (RE-143 includes the Android column),
> so there was no separate Android-doc query. Full verbatim text for every probe is in
> `PIPE-02-CLOSE-TRANSCRIPT.txt`.

| Probe | Doc | Verdict |
|-------|-----|---------|
| **Q1** — Windows troubleshooting | RE-002 | **PASS** — grounded, clickable doc-level cite, accurate |
| **Q2** — macOS PSSO investigation | RE-069 | **PASS** — grounded (6 cites), Track A/B + error codes accurate |
| **Q3** — iOS ADE token/profile | RE-057 | **PASS** — grounded (5 cites), Patterns A–D accurate |
| **Q4** — Linux agent install | RE-129 | **PASS** — grounded; surfaced the exact "Known Admin Pitfall" blockquote (the check-phase-50 V-50-18 content) — confirms that content survived into the `.docx` |
| **Q5** — 5-platform wide-matrix (chunk-survival) | RE-143 | **PASS (KEY v1.15 probe)** — full Conditional-Access + Software-Updates wide tables reproduced accurately across all 5 platforms incl. Android "Mode-dependent" handling; chunk boundaries survived — the wide/flat matrix Phase 113 could NOT disprove is now confirmed |
| **Q8** — EEE-block metadata query | RE-129 | **PASS (KEY thesis)** — answered "Platform: Linux · Doc Type: Guide · Doc ID: RE-129 · Status: Approved" from the VISIBLE header block → confirms the EEE header block is body-text-indexed and queryable (OQ4 resolved for the real corpus) |
| **Q9** — negative hallucination control (ChromeOS Autopilot) | — | **PASS** — correctly refused to invent a procedure; cited Windows-scoped RE-002 + 5-platform RE-143 to justify the negative; no hallucination |
| **Q7** — Draft-label retrieval | RE-130 | **PASS-with-caveat** — RE-130 retrieved + cited (retrieval NOT gated by status ✓) and the status field read correctly; BUT the visible EEE block showed "Status: Approved" because the test-artifact mutation changed ONLY the frontmatter `status:`, not the visible block text — so the literal "Draft" label was not exercised. Accepted as an artifact-prep gap, NOT a corpus/grounding failure (retrieval-not-gated + status-field-visible both confirmed). See §Draft-Probe Decision + v1.16 follow-up |

---

## Four-Leg Roll-Up

| Probe leg | Queries | Verdict |
|-----------|---------|---------|
| 1. 5-platform grounding (grounded + clickable doc-level citation + no hallucination) | Q1–Q5 (Android via Q5 matrix) | **PASS** |
| 2. Wide-matrix chunk-survival (post-RETRO-03) — the leg Phase 113 did NOT disprove | Q5 | **PASS** (KEY v1.15 probe) |
| 3. Draft-label retrieval | Q7 | **PASS-with-caveat** (retrieval-not-gated confirmed; literal Draft label deferred to v1.16) |
| 4. Dedicated Linux | Q4 (+ Q7, Q8) | **PASS** |
| (thesis) EEE header block indexed as body text | Q8 | **PASS** |
| (control) no hallucination on out-of-corpus query | Q9 | **PASS** |

---

## Raw Transcript (CAPTURED IN-REPO — D-119-1 rider)

> Phase 113 left the transcript owner-local. For the v1.15 close, the **full raw Copilot Studio
> transcript** (every query + full response + citation panel text) is captured **in-repo** as a
> sibling file — the auditable evidence for the one close-gate leg no re-audit axis can reproduce
> (T-119-06-ASSERTED mitigation).

**Transcript file:** [`PIPE-02-CLOSE-TRANSCRIPT.txt`](./PIPE-02-CLOSE-TRANSCRIPT.txt) — 529
lines, verbatim owner capture of the live 2026-07-06 Copilot Studio session (all probes Q1–Q9,
each with full bot response + inline citation markers). This satisfies the D-119-1
"capture the raw transcript in-repo" rider.

---

## Overall Attestation

**Owner attestation (final line — the close-gate reads this):**

> `PIPE-02 CLOSE: PASS`   — every probe returned a grounded answer with a clickable
> document-level citation and no hallucination; all 6 uploaded `.docx` were retrieved + cited.
> The single Draft-label caveat (Q7) is an artifact-prep gap (frontmatter-only mutation), not a
> corpus/grounding failure, and both substantive Draft properties (retrieval-not-gated +
> status-field-visible) were confirmed — deferred to a v1.16 true-Draft-label probe.

Failing-probe description (if FAIL): None — no probe failed.

**Attested by:** Owner  **Date:** 2026-07-06

---

*PIPE-02 CLOSE: PASS attested + committed. Plan 119-07 (the single close-gate) consumes this
artifact to flip HARN-04 / PIPE-02 — and all 16 v1.15 requirements — to Validated.*
