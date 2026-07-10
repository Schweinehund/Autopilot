# PIPE-02 CLOSE — Empirical Findings (OWNER-RECORDED)

**Phase 125 close-gate grounding-confirmation pass — the close-gate (Plan 125-07) consumes
this file.**
**Template authored by:** Agent (2026-07-09). **Live legs executed by:** Owner (2026-07-10,
~09:43–09:57 live Copilot Studio). **Verdicts recorded by:** Agent, evaluating the
owner-supplied raw transcript against the RUNBOOK §"Definition of PASS".
**Procedure:** `PIPE-02-CLOSE-RUNBOOK.md` (this directory), executed end-to-end live in
Copilot Studio on the real-corpus representative `.docx` set, retargeted to the four v1.16
structural deltas per D-125-2.

> **STATUS: EVALUATED — ALL 10 PROBES PASS.** The owner ran the full runbook live and
> supplied the raw transcript (`PIPE-02-CLOSE-TRANSCRIPT.txt`, 459 lines, this directory).
> All 8 representative docs grounded with clickable document-level citations; every retargeted
> probe leg satisfied; negative control declined cleanly. Final attestation confirmed by the
> owner in-thread.

---

## Run Metadata

| Field | Value |
|-------|-------|
| Date of test | 2026-07-10 (~09:43–09:57) |
| Tester | Owner (live Copilot Studio) |
| Test SharePoint library URL | Owner-local test library — evidence is the in-repo transcript |
| Copilot Studio agent name / URL | Owner-local EEE knowledge-source agent |
| Pandoc version (conversion) | 3.7.0.2 (pinned) |
| Files uploaded | 8 (per RUNBOOK §1 representative-set table) |
| Raw transcript | `PIPE-02-CLOSE-TRANSCRIPT.txt` (459 lines, this directory) |

---

## Representative Set (as uploaded)

All 8 docs grounded, clickable document-level citation present, hallucination-free.

| # | Doc ID | Platform | Retrofit class | Grounded | Clickable doc-level citation | Hallucination-free |
|---|--------|----------|-----------------|----------|-------------------------------|----------------------|
| 1 | RE-184 | Windows | glossary | ✓ | ✓ `RE-184-autopilot-glossary.docx` | ✓ |
| 2 | RE-182 | macOS | glossary | ✓ | ✓ `RE-182-apple-provisioning-glossary.docx` | ✓ |
| 3 | RE-189 | iOS/iPadOS | lifecycle | ✓ | ✓ `RE-189-ios-ipados-enrollment-path-overview.docx` | ✓ (see Q3 note) |
| 4 | RE-185 | Android | lifecycle | ✓ | ✓ `RE-185-android-enterprise-enrollment-overview.docx` | ✓ |
| 5 | RE-181 | Linux | glossary | ✓ | ✓ `RE-181-linux-provisioning-glossary.docx` | ✓ |
| 6 | RE-217 | cross-platform (802.1X) | decision-tree | ✓ | ✓ `RE-217-8021x-triage-decision-tree.docx` | ✓ |
| 7 | RE-219 | all 5 (index) | nav-hub | ✓ | ✓ `RE-219-device-provisioning-documentation.docx` | ✓ |
| 8 | RE-192 | Windows | lifecycle | ✓ | ✓ `RE-192-autopilot-lifecycle-overview.docx` | ✓ |

---

## Per-Probe Results (evaluated from the owner transcript)

| Probe | Doc | Verdict |
|-------|-----|---------|
| **Q1** — Windows glossary (ESP definition) | RE-184 | **PASS** — ESP = Enrollment Status Page defined correctly (APv1-only, device/user phase, FirstSync, macOS Await-Configuration analog); grounded, 1 clickable citation to RE-184. |
| **Q2** — macOS glossary (ABM definition) | RE-182 | **PASS** — ABM = Apple Business Manager defined correctly incl. ABM-Token distinction + rebrand cross-refs; grounded, 3 clickable citations to RE-182. |
| **Q3** — iOS/iPadOS enrollment path overview | RE-189 | **PASS** — all 4 enrollment paths (ADE/Device/User/MAM-WE) + supervision axis correct; grounded with clickable citations to RE-189 (refs 1–3). Note: ref 4 was an external/web source corroborating the supervision section (content accurate, consistent with RE-189, not fabricated) — see Honesty Notes. |
| **Q4** — Android enrollment overview | RE-185 | **PASS** — all 5 modes (ZTE/COBO/BYOD-WP/COSU/AOSP) + two-axis framing + iOS-analog note correct; grounded, 3 clickable citations to RE-185 (the substituted Android doc). |
| **Q5** — Linux glossary + anchor-slug probe (COBO/COPE/WPCO) | RE-181 | **PASS** — the combined "COBO / COPE / WPCO" cross-platform-collision entry grounded correctly (redirect-only, no Linux-native definition, expansions correct); double-hyphen slug term resolves. Grounded, clickable citations to RE-181. |
| **Q6** — 802.1X decision-tree leaf-citability probe | RE-217 | **PASS (KEY PROBE)** — EVERY decision leaf present: root EAP1 + all 5 symptom branches → Runbook 38/40/41/39 + Escalate (EAPE) = 6 nodes + 5 labeled edges (LOCKED-11). No leaf dropped by chunking. Grounded, clickable citation to RE-217. |
| **Q7** — Nav-hub link-table routing probe | RE-219 | **PASS** — correctly routes to the "802.1X Triage Decision Tree" index entry and distinguishes the general Initial Triage front door; grounded, clickable citation to RE-219. |
| **Q8** — Descriptive-filename citation-label probe | RE-192 | **PASS** — citation label displayed = `RE-192-autopilot-lifecycle-overview.docx` (carries the descriptive slug, not a bare `RE-192.docx`); PIPE-04/OQ1 goal met. Grounded, clickable. |
| **Q9** — EEE header-block metadata query | RE-184 | **PASS (THESIS)** — recited the single-line EEE header from body text: "Platform: All Platforms · Doc Type: Reference · Doc ID: RE-184 · Status: Approved". Confirms the header block remains indexed after the v1.16 retrofit. |
| **Q10** — Negative hallucination control (ChromeOS) | — | **PASS (CONTROL)** — declined cleanly: no Autopilot/ChromeOS procedure exists; cited RE-219 (platform list) + RE-184 (hardware-hash is Windows-specific) to justify. Zero fabrication. |

---

## Four-Leg Roll-Up (the RETARGETED v1.16-delta probes)

| Probe leg | Query | Verdict |
|-----------|-------|---------|
| (a) Decision-tree leaf-citability (STD-04/RETRO-05) | Q6 | **PASS** — 6 nodes + 5 edges all citable; no leaf dropped |
| (b) Glossary anchor-slug citation, double-hyphen trap (RETRO-04) | Q5 | **PASS** — COBO/COPE/WPCO combined entry grounded correctly |
| (c) Nav-hub link-table retrieval (RETRO-06) | Q7 | **PASS** — correct 802.1X link-table row retrieved |
| (d) Descriptive-filename citation-label quality (PIPE-04/OQ1) | Q8 | **PASS** — descriptive slug displayed in the citation label |
| 5-platform grounding | Q1–Q5 | **PASS** — Windows / macOS / iOS·iPadOS / Android / Linux all grounded + cited |
| (thesis) EEE header block indexed as body text | Q9 | **PASS** — header recited from body text |
| (control) no hallucination on out-of-corpus query | Q10 | **PASS** — ChromeOS declined, no fabrication |

---

## Honesty Notes (recorded, none are probe failures)

1. **Q3 external corroborating citation.** Reference 4 on Q3 was an external/web source
   ("Apple Business Manager and MDM: what changes in 2026") attached to the supervision-axis
   section, indicating the agent has web grounding enabled alongside the SharePoint knowledge
   source. The enrollment-path answer itself is grounded in RE-189 (refs 1–3, clickable
   document-level citation) and the supervision content is accurate and consistent with the
   doc — no fabricated or wrong-document content. The negative control (Q10) confirms the
   agent does NOT invent an answer when there is genuinely no grounded source (ChromeOS
   declined), so the grounding discipline is sound. Recorded for transparency; does not fail
   the grounded-answer PASS bar.
2. **Descriptive-filename convention retains the RE-NNN prefix.** Q8's citation label is
   `RE-192-autopilot-lifecycle-overview.docx` — the Phase-124 filename map prepends the doc
   ID to the descriptive slug. This satisfies PIPE-04/OQ1 (the label is human-readable /
   descriptive, no longer a bare `RE-192.docx`) while staying queryable by ID. Intended
   behavior, not a defect.
3. **Cross-reference citations across docs.** Several answers surfaced a supplementary
   citation to a related doc (Q5 → RE-182 for the Android "See also"; Q8 → RE-182). These are
   accurate cross-references, not misgroundings.
4. **RE-179 substitution (from Task 1).** Android coverage used RE-185 (lifecycle) after
   RE-179 (`_glossary-android.md`) genuinely failed `guard-docx.mjs` on a stale `phase_46`
   custom property — logged `DEFER-125-06-A`. Android grounding (Q4) passed cleanly on RE-185.

---

## Raw Transcript (CAPTURE IN-REPO — D-119-1 precedent carried forward)

Full raw Copilot Studio transcript (every query + full response + citation panel text) is
captured in-repo at:

**→ [`PIPE-02-CLOSE-TRANSCRIPT.txt`](./PIPE-02-CLOSE-TRANSCRIPT.txt)** (459 lines, this directory)

This mirrors the v1.15 `PIPE-02-CLOSE-TRANSCRIPT.txt` precedent — the evidence for the one
close-gate leg no re-audit axis can reproduce.

---

## Overall Attestation

**Final line — the close-gate reads this:**

> `PIPE-02 CLOSE: PASS`

Failing-probe description (if FAIL): None — no probe failed. All 10 queries grounded +
clickable document-level citation + hallucination-free; all four retargeted v1.16-delta probe
legs satisfied; 5-platform spread green; EEE body-text thesis confirmed; negative control
declined cleanly.

**Live run by:** Owner (2026-07-10). **Verdict evaluated/recorded by:** Agent from the
owner-supplied transcript. **Owner in-thread confirmation:** PIPE-02 PASS.

---

*Plan 125-07 (the single close-gate) consumes this completed, committed artifact — with
`PIPE-02 CLOSE: PASS` attested — to flip HARN-07 / PIPE-02 (and all 14 v1.16 requirements) to
Validated.*
