# PIPE-02 CLOSE — Empirical Findings (OWNER-RECORDED)

**Phase 119 close-gate second grounding-confirmation pass — the close-gate consumes this file.**
**Template authored by:** Agent (2026-07-06). **Executed by:** _(owner — fill in)_.
**Procedure:** `PIPE-02-CLOSE-RUNBOOK.md` (this directory), executed end-to-end live in Copilot
Studio on the real-corpus representative `.docx` set.

> **STATUS: AWAITING OWNER EXECUTION.** The agent cannot run the live Copilot Studio /
> SharePoint legs (REQUIREMENTS L77). The owner fills every `_(…)_` field, pastes the raw
> transcript, and attests the final PASS/FAIL line. **The close-gate (Plan 119-07) BLOCKS until
> `PIPE-02 CLOSE: PASS` is attested here and this file is committed** (D-119-1).

---

## Run Metadata

| Field | Value |
|-------|-------|
| Date of test | _(owner)_ |
| Tester | _(owner)_ |
| Test SharePoint library URL | _(owner)_ |
| Copilot Studio agent name / URL | _(owner)_ |
| Pandoc version (conversion) | 3.7.0.2 (pinned) |
| Files uploaded | 7 (see representative-set table below) |

---

## Draft-Probe Decision (owner-confirmable — see RUNBOOK §Draft-Probe)

- [ ] **Option A (recommended, agent-prepared):** test-artifact-only `status: Approved → Draft`
  mutation of RE-130 (`docs/admin-setup-linux/02-enrollment-profile.md`); source `.md` untouched;
  artifact never committed to the corpus.
- [ ] Option B: used a `docs/_templates/*.md` file (genuine born-Draft scaffolding).
- [ ] Option C: reused the Phase-113 synthetic draft-test-doc (NOT recommended).

**Owner note on the Draft-probe choice:** _(owner — record the chosen option + any reasoning)_

---

## Representative Set (as uploaded)

| # | Doc ID | Platform | Class | Citation label observed | Grounded | Clickable doc-level citation | Hallucination-free |
|---|--------|----------|-------|-------------------------|----------|------------------------------|--------------------|
| 1 | RE-002 | Windows | L1 runbook | _(owner)_ | _( )_ | _( )_ | _( )_ |
| 2 | RE-069 | macOS | L2 runbook | _(owner)_ | _( )_ | _( )_ | _( )_ |
| 3 | RE-057 | iOS/iPadOS | L2 runbook | _(owner)_ | _( )_ | _( )_ | _( )_ |
| 4 | RE-144 | Android | reference | _(owner)_ | _( )_ | _( )_ | _( )_ |
| 5 | RE-129 | Linux | admin-setup | _(owner)_ | _( )_ | _( )_ | _( )_ |
| 6 | RE-143 | all 5 (wide/flat) | reference | _(owner)_ | _( )_ | _( )_ | _( )_ |
| 7 | RE-130 (Draft artifact) | Linux | admin-setup | _(owner)_ | _( )_ | _( )_ | _( )_ |

---

## Per-Query Results

For each query record: **Grounded (Y/N)** · **Clickable document-level citation (Y/N)** ·
**Hallucination-free (Y/N)** · **PASS/FAIL** · a response/citation snippet.

### Q1 — Windows grounding (RE-002)
- Grounded: _( )_ · Clickable doc-level citation: _( )_ · Hallucination-free: _( )_ · **Verdict: _( )_**
- Citation label + snippet: _(owner)_

### Q2 — macOS grounding (RE-069)
- Grounded: _( )_ · Clickable doc-level citation: _( )_ · Hallucination-free: _( )_ · **Verdict: _( )_**
- Citation label + snippet: _(owner)_

### Q3 — iOS/iPadOS grounding (RE-057)
- Grounded: _( )_ · Clickable doc-level citation: _( )_ · Hallucination-free: _( )_ · **Verdict: _( )_**
- Citation label + snippet: _(owner)_

### Q4 — Android grounding + mode-first matrix (RE-144)
- Grounded: _( )_ · Clickable doc-level citation: _( )_ · Hallucination-free: _( )_ · **Verdict: _( )_**
- Were enrollment modes correctly paired with their capabilities? _(owner)_
- Citation label + snippet: _(owner)_

### Q5 — Linux grounding + admin-setup + dedicated-Linux (RE-129)
- Grounded: _( )_ · Clickable doc-level citation: _( )_ · Hallucination-free: _( )_ · **Verdict: _( )_**
- Citation label + snippet: _(owner)_

### Q6 — WIDE-MATRIX chunk-survival (RE-143) — the leg Phase 113 did NOT disprove
- Grounded: _( )_ · Clickable doc-level citation: _( )_ · Hallucination-free: _( )_ · **Verdict: _( )_**
- Did per-platform values stay correctly attributed to the right platform **column** (no
  column/label loss across the chunk boundary)? _(owner)_
- Was a `> **Table summary:**` prose line surfaced/retrievable? _(owner)_
- Citation label + snippet: _(owner)_

### Q7 — Draft-label retrieval (RE-130 Draft artifact)
- Retrieved at all? _( )_ · If retrieved, was `Status: Draft` visible? _( )_ · **Verdict (record
  behavior; carry Phase-113 OQ2): _( )_**
- Full citation + snippet: _(owner)_

### Q8 — EEE body-text header-block thesis (RE-129)
- Did Copilot recite `Doc ID: RE-129 · Platform: Linux · Doc Type: Guide · Status: Approved` from
  **body text**? _( )_ · **Verdict: _( )_**
- Snippet: _(owner)_

### Q9 — Negative hallucination control (ChromeOS — not in corpus)
- Did Copilot decline / state no grounded source (rather than fabricate)? _( )_ · **Verdict: _( )_**
- Snippet: _(owner)_

---

## Four-Leg Roll-Up

| Probe leg | Queries | Verdict |
|-----------|---------|---------|
| 1. 5-platform grounding (grounded + clickable doc-level citation + no hallucination) | Q1–Q5 | _( )_ |
| 2. Wide-matrix chunk-survival (post-RETRO-03) | Q6 | _( )_ |
| 3. Draft-label retrieval | Q7 | _( )_ |
| 4. Dedicated Linux | Q5 (+ Q7) | _( )_ |
| (thesis) EEE header block indexed as body text | Q8 | _( )_ |
| (control) no hallucination on out-of-corpus query | Q9 | _( )_ |

---

## Raw Transcript (PASTE IN-REPO — D-119-1 rider)

> Phase 113 left the transcript owner-local. For the v1.15 close, paste the **full raw Copilot
> Studio transcript** (every query + full response + citation panel text) here verbatim. This is
> the auditable evidence for the one close-gate leg no re-audit axis can reproduce
> (T-119-06-ASSERTED mitigation).

```
_(owner — paste raw transcript here)_
```

---

## Overall Attestation

**Owner attestation (final line — the close-gate reads this):**

> `PIPE-02 CLOSE: ____`   ← write **PASS** only if every probe is grounded + clickable
> document-level cited + hallucination-free; otherwise **FAIL** and describe the failing probe(s)
> below.

Failing-probe description (if FAIL): _(owner)_

**Attested by:** _(owner)_  **Date:** _(owner)_

---

*On PASS + commit, return to the project thread with "PIPE-02 PASS". The continuation agent
finalizes `119-06-SUMMARY.md` and Plan 119-07 lands the single close-gate commit flipping all 16
v1.15 requirements to Validated.*
