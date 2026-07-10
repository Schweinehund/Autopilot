# PIPE-02 CLOSE — Owner-Run Grounding-Confirmation Runbook (v1.16)

**Procedure for:** Phase 125 close-gate PIPE-02 grounding-confirmation pass, on the
**retrofitted structural corpus** (glossaries / lifecycle / decision-trees / nav-hubs —
the classes Phases 121-123 changed) — the v1.16 close-gate PIPE-02 confirmation.
**Authored by:** Agent (2026-07-09) — owner-executed at the Phase 125 close checkpoint.
**Decision basis:** D-125-2 (A1) — owner-run live legs; the agent has **no** live Copilot
Studio / SharePoint access (REQUIREMENTS L76). HARN-07: PIPE-02 confirmation is *included
in the close-gate*; **the close-gate BLOCKS until the owner attests PASS.**
**Records into:** `PIPE-02-CLOSE-FINDINGS.md` (this same directory) — including the **raw
transcript, captured in-repo** (D-119-1 precedent, carried forward).

---

## How This Pass Differs From Phase 119 (locked changes — D-125-2 riders)

Phase 119's close-gate PIPE-02 pass validated the **v1.15** retrofit (L1/L2 runbooks,
admin-setup guides, reference tables). v1.16 retrofitted an **entirely different**
structural surface (Phases 121-123: glossaries, lifecycle docs, decision-trees, nav-hubs).
Per D-125-2's MANDATORY RETARGET rider, this pass probes **what v1.16 changed**, not what
v1.15 changed:

1. **RETARGETED probes — the four v1.16 deltas**, replacing the v1.15 riders entirely:
   - (a) **Decision-tree Mermaid-to-text-equivalent table, every leaf citable** (STD-04 /
     RETRO-05/RETRO-08) — Phase 122 converted every decision-tree Mermaid diagram to a
     Markdown "Routing Verification" table; this pass confirms Copilot can cite every
     decision leaf from that table.
   - (b) **Glossary definition-list anchor-slug citation** (RETRO-04) — Phase 121
     retrofitted every glossary with an EEE header block while preserving existing
     plain-GitHub anchor slugs; this pass confirms a term with a **double-hyphen slug**
     (the `Kandji-Iru`-class trap — see memory `reference_glossary_anchor_slugs`) still
     resolves correctly post-retrofit.
   - (c) **Nav-hub link-table retrieval** (RETRO-06) — Phase 123 retrofitted the four
     nav-hubs (`index.md`, `common-issues.md`, `quick-ref-l1.md`, `quick-ref-l2.md`); this
     pass confirms a routing query still resolves to the correct link-table row.
   - (d) **Descriptive-filename citation-label quality** (PIPE-04 / OQ1) — Phase 124
     renamed every `.docx` output to a descriptive slug (no more bare `RE-NNN.docx`); this
     pass confirms the citation panel displays the descriptive label, not the doc ID.
2. **EXCLUDES the v1.15 riders.** Per D-125-2, this pass does **NOT** re-run the v1.15
   RETRO-03 wide/flat 5-platform capability-matrix chunk-survival probe
   (`docs/reference/4-platform-capability-comparison.md`) or the RETRO-02 dedicated-Linux-
   admin-setup probe (`docs/admin-setup-linux/01-intune-linux-agent.md`). Both surfaces are
   **v1.16-untouched** — v1.16 did not retrofit `docs/reference/*` or
   `docs/admin-setup-linux/*`; re-running them would be re-testing v1.15's homework, not
   confirming v1.16's grounding.
3. **Real corpus, not synthetic fixtures** (carried from v1.15/v1.14) — every uploaded
   `.docx` is a real shipped `RE-NNN` `Status: Approved` doc from `docs/_registry/RE-index.md`,
   never a synthetic `RE-T*` fixture.

---

## Why This Leg Is Owner-Run

The agent has no live Copilot Studio or SharePoint access; provisioning it is out of scope
(REQUIREMENTS L76; D-125-2). The agent has completed all **in-scope** legs:

- Pandoc 3.7.0.2 pinned pipeline (`scripts/pipeline/convert.ps1`) used for every conversion
  (version-guard PASS on every invocation — confirmed via `pandoc.exe --version` = `3.7.0.2`).
- All 8 representative `.docx` files converted; post-conversion guard (`guard-docx.mjs`)
  exit 0 on every file (see §1 precondition table). **One genuine guard FAIL was discovered
  and honestly recorded, not masked** — see the Selection Note below.
- Representative-set selection retargeted to the four v1.16-delta probe classes + 5-platform
  spread, with the v1.15 wide-matrix and Linux-admin-setup riders explicitly excluded.

The live upload + queries + citation inspection are the one remaining leg — all owner-run at
this checkpoint. **This is the single close-gate leg no re-audit axis can reproduce** (no
Copilot access), so its evidence — the raw transcript — must be captured **in-repo** in
`PIPE-02-CLOSE-FINDINGS.md`.

---

## Definition of PASS (what the owner attests against)

**PIPE-02 CLOSE: PASS** requires **ALL** of the following across **every** probe below:

- **Grounded answer** — the response content is drawn from the uploaded `.docx`, not model
  prior.
- **Clickable DOCUMENT-LEVEL citation** — the citation panel shows a clickable link
  resolving to the correct `.docx` in SharePoint (whole-file; document-level, no section
  anchors — matches the Phase-113/119 finding).
- **No hallucination** — no fabricated, off-topic, or wrong-document content.

And the four **RETARGETED probe legs** must each be satisfied:

1. **Decision-tree leaf-citability** (Q6): every decision leaf in the 802.1X triage
   Routing Verification table (RE-217, LOCKED — 11: 6 nodes + 5 labeled edges) is citable
   from the retrieved answer — no leaf silently dropped by chunking.
2. **Glossary anchor-slug citation** (Q5): the COBO / COPE / WPCO term in the Linux
   Provisioning Glossary (RE-181) grounds to its definition-list entry; the double-hyphen
   plain-GitHub slug (`#cobo--cope--wpco`) is the correct anchor target if section-level
   citation detail is surfaced (document-level citation is the PASS bar per SC4a; the
   anchor-slug survival is the retrofit-fidelity check).
3. **Nav-hub link-table retrieval** (Q7): a routing query against the Documentation Index
   (RE-219) retrieves the correct link-table row (802.1X Triage Decision Tree), confirming
   RETRO-06's link-table accuracy survived the retrofit.
4. **Descriptive-filename citation label** (Q8): the citation for the Autopilot Lifecycle
   Overview (RE-192) displays `autopilot-lifecycle-overview.docx`, not `RE-192.docx` or a
   bare doc-ID filename.

Plus **5-platform grounding** (Q1-Q5: Windows, macOS, iOS/iPadOS, Android, Linux each return
a grounded, correctly-cited, hallucination-free answer from their respective doc), the load-
bearing EEE header-block thesis check (Q9), and a negative hallucination control (Q10).

**If ANY probe FAILs, the overall verdict is FAIL and the close-gate (125-07) must NOT
proceed.**

---

## Section 1: Prerequisites

**Owner-supplied (fill in before proceeding):**

| Item | Value |
|------|-------|
| Test SharePoint document library URL | _(owner fills in)_ |
| Copilot Studio agent name | _(owner fills in)_ |
| Copilot Studio agent URL / chat entry point | _(owner fills in)_ |

**Agent-confirmed preconditions (all met 2026-07-09):**

Every representative `.docx` was converted via the pinned pipeline
(`scripts/pipeline/convert.ps1`, pandoc 3.7.0.2 — version-guard PASS on every invocation)
and passed the post-conversion guard (`node scripts/pipeline/guard-docx.mjs <file>` exit 0),
**with one honestly-recorded exception** (RE-179, see Selection Note below). The `.docx`
files live in `.pipeline-output/pipe-02-close-125/` (gitignored; on disk from this plan's
run — re-convert per §1.1 if a clean checkout removed them).

| # | Doc ID | Source `.md` | Platform | Retrofit class (v1.16 phase) | Convert | Guard exit | Role in the pass |
|---|--------|--------------|----------|-------------------------------|---------|------------|-------------------|
| 1 | **RE-184** | `docs/_glossary.md` | **Windows** | glossary (RETRO-04, Phase 121) | OK | 0 (PASS) | Windows grounding (Q1) |
| 2 | **RE-182** | `docs/_glossary-macos.md` | **macOS** | glossary (RETRO-04, Phase 121) | OK | 0 (PASS) | macOS grounding (Q2) |
| 3 | **RE-189** | `docs/ios-lifecycle/00-enrollment-overview.md` | **iOS/iPadOS** | lifecycle (RETRO-07, Phase 121) | OK | 0 (PASS) | iOS/iPadOS grounding (Q3) |
| 4 | **RE-185** | `docs/android-lifecycle/00-enrollment-overview.md` | **Android** | lifecycle (RETRO-07, Phase 121) | OK | 0 (PASS) | Android grounding (Q4) — **substituted for RE-179** (see Selection Note) |
| 5 | **RE-181** | `docs/_glossary-linux.md` | **Linux** | glossary (RETRO-04, Phase 121) | OK | 0 (PASS) | Linux grounding + **glossary anchor-slug probe** (Q5, COBO/COPE/WPCO double-hyphen slug) |
| 6 | **RE-217** | `docs/decision-trees/10-8021x-triage.md` | cross-platform (802.1X) | decision-tree (RETRO-05, Phase 122; STD-04 exemplar) | OK | 0 (PASS) | **Decision-tree leaf-citability probe (Q6)** |
| 7 | **RE-219** | `docs/index.md` | all 5 (index) | nav-hub (RETRO-06, Phase 123) | OK | 0 (PASS) | **Nav-hub link-table probe (Q7)** |
| 8 | **RE-192** | `docs/lifecycle/00-overview.md` | Windows | lifecycle (RETRO-07, Phase 121) | OK | 0 (PASS) | **Descriptive-filename citation-label probe (Q8)** |

**Output filenames** (per Phase 124 `scripts/pipeline/filename-map.md`, the D-05 descriptive-
filename slug, PIPE-04 deliverable): `autopilot-glossary.docx`,
`apple-provisioning-glossary.docx`, `ios-ipados-enrollment-path-overview.docx`,
`android-enterprise-enrollment-overview.docx`, `linux-provisioning-glossary.docx`,
`8021x-triage-decision-tree.docx`, `device-provisioning-documentation.docx`,
`autopilot-lifecycle-overview.docx`.

**Coverage confirmation:** 5 platforms (Windows / macOS / iOS·iPadOS / Android / Linux); all
four RETARGETED v1.16-delta probe classes (glossary anchor-slug, decision-tree text-equiv,
nav-hub link-table, descriptive-filename label); 3 retrofit classes represented (glossary,
lifecycle, decision-tree, nav-hub — four classes); the v1.15 wide-matrix and Linux
admin-setup riders are explicitly **excluded** per D-125-2.

> **Selection note (owner-confirmable) — genuine guard FAIL, honestly recorded, not masked:**
> `docs/_glossary-android.md` (RE-179) was the first-choice Android glossary candidate (to
> mirror the other four platform glossaries). It **converts** cleanly but **fails**
> `guard-docx.mjs`'s CUSTOM-PROPS check: a stale `phase_46_wave2_retrofit: 2026-04-25`
> frontmatter key (pre-dating the 9-key EEE custom-property set locked at Phase 113/D-04
> OQ4) gets promoted to a Word custom property outside the known key set. This is a genuine,
> pre-existing content defect in an unrelated file — **out of scope for Plan 125-06 to fix**
> (Task 1's file scope is the runbook itself, not arbitrary structural-doc edits; see
> `deferred-items.md` → `DEFER-125-06-A` for the full write-up and a recommended v1.17+
> follow-up). The representative set **substitutes RE-185**
> (`docs/android-lifecycle/00-enrollment-overview.md`, the Android Enterprise Enrollment
> Overview — a real Approved lifecycle doc, RETRO-07 class) for Android platform coverage
> instead; RE-185 converts and guards clean (3/3 PASS). **Do not upload
> `RE-179-*.docx`** — it was never produced (conversion was not re-attempted after the guard
> FAIL was discovered) and is not part of this representative set.

### Section 1.1 — Re-conversion (only if `.pipeline-output/pipe-02-close-125/` is absent)

Requires **PowerShell 7+** (`pwsh`, not Windows PowerShell 5.1 — `convert.ps1` hard-requires
7.0 via `#Requires -Version 7.0`). Run from the repo root. Repeat for each of the eight
source files:

```powershell
pwsh -NoProfile -Command "
.\scripts\pipeline\convert.ps1 -InputMd docs\_glossary.md ``
                               -OutputDocx .pipeline-output\pipe-02-close-125\RE-184-autopilot-glossary.docx
node scripts/pipeline/guard-docx.mjs .pipeline-output/pipe-02-close-125/RE-184-autopilot-glossary.docx
"
```

Full source→output map (8 files):

| Doc ID | Source `.md` | Output `.docx` |
|--------|--------------|----------------|
| RE-184 | `docs/_glossary.md` | `RE-184-autopilot-glossary.docx` |
| RE-182 | `docs/_glossary-macos.md` | `RE-182-apple-provisioning-glossary.docx` |
| RE-189 | `docs/ios-lifecycle/00-enrollment-overview.md` | `RE-189-ios-ipados-enrollment-path-overview.docx` |
| RE-185 | `docs/android-lifecycle/00-enrollment-overview.md` | `RE-185-android-enterprise-enrollment-overview.docx` |
| RE-181 | `docs/_glossary-linux.md` | `RE-181-linux-provisioning-glossary.docx` |
| RE-217 | `docs/decision-trees/10-8021x-triage.md` | `RE-217-8021x-triage-decision-tree.docx` |
| RE-219 | `docs/index.md` | `RE-219-device-provisioning-documentation.docx` |
| RE-192 | `docs/lifecycle/00-overview.md` | `RE-192-autopilot-lifecycle-overview.docx` |

**Do not upload any file whose guard exits 1.**

---

## Section 2: Upload Procedure

**Step 2.1 — Open the test SharePoint document library** (URL from §1 Prerequisites).

**Step 2.2 — Upload the 8 `.docx` files** from `.pipeline-output/pipe-02-close-125/`:

- `RE-184-autopilot-glossary.docx`
- `RE-182-apple-provisioning-glossary.docx`
- `RE-189-ios-ipados-enrollment-path-overview.docx`
- `RE-185-android-enterprise-enrollment-overview.docx`
- `RE-181-linux-provisioning-glossary.docx`
- `RE-217-8021x-triage-decision-tree.docx`
- `RE-219-device-provisioning-documentation.docx`
- `RE-192-autopilot-lifecycle-overview.docx`

**Step 2.3 — Verify the library.** Confirm all eight appear with no indexing errors / red
banners; the Status/indexing column shows Indexed/Completed before proceeding.

> **Do NOT upload `docs/_registry/RE-index.md`** or any other registry/standard file to the
> indexed library (it would answer doc-ID queries with the registry row instead of doc
> content — the registry's own warning banner).

> **Watch the 124-03-recorded same-filename stale-index gotcha:** if a prior-indexed copy of
> a same-named file is served instead of this run's freshly-converted build, re-upload the
> verified build and re-wait for reindex before querying.

**Step 2.4 — Wait for the Copilot Studio connector to reindex** (15-30 min). If the
knowledge source has a manual **Sync** button in the Copilot Studio admin panel, trigger it
and wait for completion before querying.

---

## Section 3: Query Sequence

Run these in the Copilot Studio chat, in order, entering the exact query text. Record each
result in `PIPE-02-CLOSE-FINDINGS.md` (per-query table + paste the raw transcript in-repo).

| Query | Exact Query Text | Probe leg | What to Record |
|-------|-------------------|-----------|-----------------|
| **Q1** | `What does the Autopilot Glossary say ESP stands for, and how is it defined?` | 5-platform (Windows) | Grounded from `RE-184-autopilot-glossary.docx`? Clickable document-level citation? Hallucination-free? |
| **Q2** | `What does the Apple Provisioning Glossary say about ABM?` | 5-platform (macOS) | Grounded from `RE-182-…`? Clickable citation? Hallucination-free? |
| **Q3** | `Walk me through the iOS/iPadOS enrollment path overview — what enrollment methods are available?` | 5-platform (iOS/iPadOS) | Grounded from `RE-189-…`? Clickable citation? Hallucination-free? |
| **Q4** | `Give me an overview of the Android Enterprise enrollment process.` | 5-platform (Android) | Grounded from `RE-185-…`? Clickable citation? Hallucination-free? |
| **Q5** | `What does the Linux Provisioning Glossary say about COBO, COPE, and WPCO ownership modes?` | 5-platform (Linux) + **glossary anchor-slug probe (RETRO-04)** | Grounded from `RE-181-…`? Clickable citation? Does the response correctly ground the COBO/COPE/WPCO term (a term whose plain-GitHub anchor slug is the double-hyphen `#cobo--cope--wpco`)? Hallucination-free? |
| **Q6** | `Walk me through the 802.1X triage decision tree — if a device fails 802.1X authentication, what are all the possible diagnostic paths and outcomes?` | **DECISION-TREE leaf-citability probe (STD-04/RETRO-05)** | From `RE-217-…`: is EVERY decision leaf (all 6 nodes + 5 labeled edges of the Routing Verification table) represented in the answer — none silently dropped by chunking? Clickable citation? |
| **Q7** | `I'm troubleshooting an 802.1X authentication failure — where should I start according to the documentation index?` | **NAV-HUB link-table probe (RETRO-06)** | From `RE-219-…`: does the answer correctly route to the "802.1X Triage Decision Tree" entry (matching the index.md link-table row)? Clickable citation to the index doc? |
| **Q8** | `Give me an overview of the Autopilot lifecycle stages.` | **DESCRIPTIVE-FILENAME citation-label probe (PIPE-04/OQ1)** | From `RE-192-…`: does the citation panel display the descriptive filename `autopilot-lifecycle-overview.docx` (not `RE-192.docx` or a bare doc-ID)? Grounded? Hallucination-free? |
| **Q9** | `What is the Doc ID, Platform, and Status of the Autopilot Glossary document?` | EEE body-text thesis | Did Copilot recite the single-line EEE header block (`Doc ID: RE-184 · Platform: All Platforms · Doc Type: Reference · Status: Approved` or equivalent) from **body text**? Confirms the header block remains indexed after the v1.16 retrofit. |
| **Q10** | `What is the recommended Autopilot hardware-hash upload procedure for ChromeOS devices?` | Negative hallucination control | ChromeOS is NOT in the corpus. Confirm Copilot declines / says it has no grounded source, rather than fabricating an answer. Record whether any hallucinated content appeared. |

**For every query, also note:** grounded (Y/N), clickable document-level citation (Y/N),
hallucination-free (Y/N), and the exact citation label text displayed.

---

## Section 4: Recording + Attestation

1. Record every query's verdict in `PIPE-02-CLOSE-FINDINGS.md` (per-query table).
2. **Paste the raw transcript in-repo** into the transcript section of
   `PIPE-02-CLOSE-FINDINGS.md` (do NOT leave it owner-local — this is the one close-gate leg
   no re-audit axis can reproduce).
3. Attest the overall verdict on the final line: **`PIPE-02 CLOSE: PASS`** only if every
   probe is grounded + clickable-document-level-cited + hallucination-free; otherwise
   **`PIPE-02 CLOSE: FAIL`** with the failing probe(s) described.
4. Commit `PIPE-02-CLOSE-FINDINGS.md`:

```
git add .planning/phases/125-v115-pin-14th-path-a-lineage-bump-terminal-close/PIPE-02-CLOSE-FINDINGS.md
git commit -m "docs(125-06): record PIPE-02 CLOSE grounding findings + transcript (owner)"
```

Then return to the project thread and confirm **"PIPE-02 PASS"** (or describe the failing
probes). **The close-gate (Plan 125-07) BLOCKS until PASS is attested** (D-125-2). On PASS,
this artifact is the evidence 125-07 consumes to flip HARN-07 / PIPE-02 to Validated in the
single close-gate commit, alongside the other 13 v1.16 requirements.
