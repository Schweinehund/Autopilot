# PIPE-02 CLOSE — Owner-Run Second Grounding-Confirmation Runbook

**Procedure for:** Phase 119 close-gate **second** live Copilot Studio grounding pass, on the
**real retrofitted corpus** (a statistically representative set of shipped `RE-NNN`
`Status: Approved` docs) — the v1.15 close-gate PIPE-02 confirmation.
**Authored by:** Agent (2026-07-06) — owner-executed at the Phase 119 close checkpoint.
**Decision basis:** D-119-1 (A1) — owner-run live legs; the agent has **no** live Copilot Studio /
SharePoint access (REQUIREMENTS L77). SC5 / HARN-04: PIPE-02 confirmation is *included in the
close-gate*; **the close-gate BLOCKS until the owner attests PASS.**
**Records into:** `PIPE-02-CLOSE-FINDINGS.md` (this same directory) — including the **raw
transcript, captured in-repo** this time (Phase 113 left it owner-local; D-119-1 rider).

---

## How This Pass Differs From Phase 113 (three locked changes — D-119-1 riders)

1. **Real corpus, not synthetic fixtures.** Phase 113 used synthetic `RE-T01…RE-T05` test
   fixtures. This pass uses **actual shipped `RE-NNN` `Status: Approved`** docs.
2. **Post-RETRO-03 WIDE capability-matrix probe.** Phase 113's OQ3 chunk-survival finding was
   only tested on a *mode-first* (inherently chunk-resilient) matrix and explicitly did **not**
   disprove P-02 for a wide/flat >25-row matrix. This pass probes exactly that — the 5-platform
   comparison table (RE-143) that received RETRO-03 remediation (≤25-row-capped sub-tables +
   per-table prose summaries). **Test what v1.15 changed.**
3. **Dedicated Linux doc.** A real Approved Linux admin-setup guide (RE-129), not the Phase-113
   compound-802.1X proxy.

Plus a **Draft-label retrieval probe** carried from Phase-113 OQ2, now using **real content**
(see §Draft-Probe below).

---

## Why This Leg Is Owner-Run

The agent has no live Copilot Studio or SharePoint access; provisioning it is out of scope
(REQUIREMENTS L77; D-119-1). The agent has completed all **in-scope** legs:

- Pandoc 3.7.0.2 pinned pipeline (`scripts/pipeline/convert.ps1`) used for every conversion.
- All 7 representative `.docx` files converted; post-conversion guard (`guard-docx.mjs`) exit 0
  on every file (see §1 precondition table).
- Draft-probe test artifact produced (test-artifact-only frontmatter mutation; source `.md`
  untouched — see §Draft-Probe).

The live upload + queries + citation inspection are the one remaining leg — all owner-run at
this checkpoint. **This is the single close-gate leg no re-audit axis can reproduce** (no
Copilot access), so its evidence — the raw transcript — must be captured **in-repo** in
`PIPE-02-CLOSE-FINDINGS.md`.

---

## Definition of PASS (what the owner attests against)

**PIPE-02 CLOSE: PASS** requires **ALL** of the following across **every** probe below:

- **Grounded answer** — the response content is drawn from the uploaded `.docx`, not model prior.
- **Clickable DOCUMENT-LEVEL citation** — the citation panel shows a clickable link resolving to
  the correct `.docx` in SharePoint (whole-file; document-level, no section anchors — matches the
  Phase-113 finding).
- **No hallucination** — no fabricated, off-topic, or wrong-document content.

And the four **probe legs** must each be satisfied:

1. **5-platform grounding** (Q1–Q5): Windows, macOS, iOS/iPadOS, Android, Linux each return a
   grounded, correctly-cited, hallucination-free answer from their respective doc.
2. **Wide-matrix chunk-survival** (Q6): the >25-row **wide/flat** 5-platform comparison (RE-143)
   returns column/platform context intact — the per-platform values are correctly associated with
   their platform column, AND the RETRO-03 `> **Table summary:**` prose is retrievable. (This is
   the leg Phase 113 did **not** disprove.)
3. **Draft-label retrieval** (Q7): the Draft-labelled doc's retrieval behavior is recorded
   (carrying the Phase-113 OQ2 finding that `Status: Draft` is a body-text label, not an index
   gate).
4. **Dedicated Linux** (Q5, reinforced by Q7): a real Approved Linux doc grounds cleanly.

Plus the load-bearing EEE thesis check (Q8) and a negative hallucination control (Q9).

**If ANY probe FAILs, the overall verdict is FAIL and the close-gate (119-07) must NOT proceed.**

---

## Section 1: Prerequisites

**Owner-supplied (fill in before proceeding):**

| Item | Value |
|------|-------|
| Test SharePoint document library URL | _(owner fills in)_ |
| Copilot Studio agent name | _(owner fills in)_ |
| Copilot Studio agent URL / chat entry point | _(owner fills in)_ |

**Agent-confirmed preconditions (all met 2026-07-06):**

Every representative `.docx` was converted via the pinned pipeline
(`scripts/pipeline/convert.ps1`, pandoc 3.7.0.2) and passed the post-conversion guard
(`node scripts/pipeline/guard-docx.mjs <file>` exit 0). The `.docx` files live in
`.pipeline-output/pipe-02-close/` (gitignored; on disk from this plan's run — re-convert per
§1.1 if a clean checkout removed them).

| # | Doc ID | Source `.md` | Platform | Retrofit class | Convert | Guard exit | Role in the pass |
|---|--------|--------------|----------|----------------|---------|------------|------------------|
| 1 | **RE-002** | `docs/l1-runbooks/01-device-not-registered.md` | **Windows** | L1 runbook (RETRO-01) | OK | 0 (PASS) | Windows grounding (Q1) |
| 2 | **RE-069** | `docs/l2-runbooks/27-macos-sso-investigation.md` | **macOS** | L2 runbook (RETRO-01) | OK | 0 (PASS) | macOS grounding (Q2) |
| 3 | **RE-057** | `docs/l2-runbooks/15-ios-ade-token-profile.md` | **iOS/iPadOS** | L2 runbook (RETRO-01) | OK | 0 (PASS) | iOS/iPadOS grounding (Q3) |
| 4 | **RE-144** | `docs/reference/android-capability-matrix.md` | **Android** | reference (RETRO-03) | OK | 0 (PASS) | Android grounding + mode-first matrix (Q4) |
| 5 | **RE-129** | `docs/admin-setup-linux/01-intune-linux-agent.md` | **Linux** | admin-setup (RETRO-02) | OK | 0 (PASS) | Linux grounding + admin-setup class (Q5) |
| 6 | **RE-143** | `docs/reference/4-platform-capability-comparison.md` | **all 5 (wide/flat)** | reference (RETRO-03) | OK | 0 (PASS) | **Wide-matrix chunk-survival probe (Q6)** |
| 7 | **RE-130 (Draft artifact)** | `docs/admin-setup-linux/02-enrollment-profile.md` → `status: Draft` (test-only) | Linux | admin-setup (RETRO-02) | OK | 0 (PASS) | **Draft-label retrieval probe (Q7)** |

**Coverage confirmation:** 5 platforms (Windows / macOS / iOS·iPadOS / Android / Linux) + a
wide/flat all-5 matrix; all 3 retrofit classes (L1/L2 runbook, admin-setup, reference); a
dedicated Approved Linux doc (RE-129, **not** RE-128 which is mermaid-deferred / Pending /
keyless); a post-RETRO-03 wide matrix (RE-143); and the Draft-probe artifact.

> **Selection note (owner-confirmable):** the iOS admin-setup guides could not be used because
> every `docs/admin-setup-ios/*` guide fails pandoc conversion via the YAML-metadata alias trap
> on their `*Previous:` / `*Next step:` nav footers (see `deferred-items.md` §DEFER-119-C). The
> iOS platform leg was therefore taken from an iOS **L2 runbook** (RE-057), which converts +
> guards clean. The admin-setup class remains represented by RE-129 (Linux). If you prefer a
> different iOS doc, any clean-converting iOS doc may be substituted.

### Section 1.1 — Re-conversion (only if `.pipeline-output/pipe-02-close/` is absent)

Run from the repo root in PowerShell. Repeat for each of the seven source files:

```powershell
.\scripts\pipeline\convert.ps1 -InputMd docs\l1-runbooks\01-device-not-registered.md `
                               -OutputDocx .pipeline-output\pipe-02-close\RE-002-01-device-not-registered.docx
node scripts/pipeline/guard-docx.mjs .pipeline-output/pipe-02-close/RE-002-01-device-not-registered.docx
```

Full source→output map: RE-002 `docs/l1-runbooks/01-device-not-registered.md`; RE-069
`docs/l2-runbooks/27-macos-sso-investigation.md`; RE-057 `docs/l2-runbooks/15-ios-ade-token-profile.md`;
RE-144 `docs/reference/android-capability-matrix.md`; RE-129 `docs/admin-setup-linux/01-intune-linux-agent.md`;
RE-143 `docs/reference/4-platform-capability-comparison.md`. For the Draft artifact, see §Draft-Probe.
**Do not upload any file whose guard exits 1.**

---

## Section: Draft-Probe Artifact (OWNER-CONFIRMABLE decision)

**The tension:** D-119-1 mandates BOTH "use the REAL retrofitted corpus" AND "a Draft-label
retrieval probe" — but **no real shipped `RE-NNN` doc has `status: Draft`** (every retrofitted
content doc is `Status: Approved`; only `docs/_templates/*` are born-Draft scaffolding).

**Agent-prepared resolution (RESEARCH Assumption A4 / Open Question 1 — RECOMMENDED, owner to
confirm):** a **test-artifact-only frontmatter mutation** — one real Approved doc
(`docs/admin-setup-linux/02-enrollment-profile.md`, RE-130) was copied and its frontmatter
`status:` flipped `Approved → Draft` for the **uploaded `.docx` only**. **The source `.md` in
the repo stays `Approved` and untouched; the Draft artifact is never committed to the corpus**
(written to the gitignored `.pipeline-output/pipe-02-close/`). This exercises genuine Draft-label
retrieval on **real content** without a synthetic fixture.

Artifact: `.pipeline-output/pipe-02-close/RE-130-DRAFT-TESTARTIFACT-02-enrollment-profile.docx`
(convert OK, guard exit 0). Regenerate if needed:

```powershell
# copy source, flip ONLY the frontmatter status line, then convert (source .md is NOT edited):
$src = Get-Content docs\admin-setup-linux\02-enrollment-profile.md -Raw
($src -replace '(?m)^status:\s*Approved\s*$','status: Draft') | Set-Content `
    .pipeline-output\pipe-02-close\RE-130-DRAFT-TESTARTIFACT-02-enrollment-profile.md -NoNewline
.\scripts\pipeline\convert.ps1 -InputMd .pipeline-output\pipe-02-close\RE-130-DRAFT-TESTARTIFACT-02-enrollment-profile.md `
                               -OutputDocx .pipeline-output\pipe-02-close\RE-130-DRAFT-TESTARTIFACT-02-enrollment-profile.docx
node scripts/pipeline/guard-docx.mjs .pipeline-output/pipe-02-close/RE-130-DRAFT-TESTARTIFACT-02-enrollment-profile.docx
```

**Owner options** (record your choice in `PIPE-02-CLOSE-FINDINGS.md` §Draft-Probe Decision):
- **Option A (recommended, prepared):** the test-artifact-only mutation above.
- **Option B:** use a real `docs/_templates/*.md` file (genuine `status: Draft`, but scaffolding,
  not shipped operator content — weaker "real corpus" fidelity).
- **Option C (NOT recommended):** reuse the Phase-113 synthetic `draft-test-doc` — violates the
  "real retrofitted corpus" rider.

If you reject Option A, stop and tell the agent which option to prepare instead before uploading.

---

## Section 2: Upload Procedure

**Step 2.1 — Open the test SharePoint document library** (URL from §1 Prerequisites).

**Step 2.2 — Upload the 7 `.docx` files** from `.pipeline-output/pipe-02-close/`:

- `RE-002-01-device-not-registered.docx`
- `RE-069-27-macos-sso-investigation.docx`
- `RE-057-15-ios-ade-token-profile.docx`
- `RE-144-android-capability-matrix.docx`
- `RE-129-01-intune-linux-agent.docx`
- `RE-143-4-platform-capability-comparison.docx`
- `RE-130-DRAFT-TESTARTIFACT-02-enrollment-profile.docx`  ← the Draft artifact

**Step 2.3 — Verify the library.** Confirm all seven appear with no indexing errors / red
banners; the Status/indexing column shows Indexed/Completed before proceeding.

> **Do NOT upload `docs/_registry/RE-index.md`** or any other registry/standard file to the
> indexed library (it would answer doc-ID queries with the registry row instead of doc content —
> the registry's own warning banner).

**Step 2.4 — Wait for the Copilot Studio connector to reindex** (15–30 min). If the knowledge
source has a manual **Sync** button in the Copilot Studio admin panel, trigger it and wait for
completion before querying.

---

## Section 3: Query Sequence

Run these in the Copilot Studio chat, in order, entering the exact query text. Record each
result in `PIPE-02-CLOSE-FINDINGS.md` (per-query table + paste the raw transcript in-repo).

| Query | Exact Query Text | Probe leg | What to Record |
|-------|------------------|-----------|----------------|
| **Q1** | `How do I troubleshoot a Windows Autopilot device that is not registered?` | 5-platform (Windows) | Grounded? Citation = clickable link to `RE-002-01-device-not-registered.docx`? Any hallucination? |
| **Q2** | `Walk me through investigating a macOS Platform SSO sign-in failure.` | 5-platform (macOS) | Grounded from `RE-069-…`? Clickable doc-level citation? Hallucination-free? |
| **Q3** | `How do I investigate iOS/iPadOS ADE token and enrollment profile delivery problems?` | 5-platform (iOS/iPadOS) | Grounded from `RE-057-…`? Clickable citation? Hallucination-free? |
| **Q4** | `What are the Android Enterprise enrollment modes and their capabilities?` | 5-platform (Android) + mode-first matrix | Grounded from `RE-144-…`? Are enrollment modes correctly paired with capabilities? Clickable citation? |
| **Q5** | `How do I install and configure the Intune Linux agent?` | 5-platform (Linux) + admin-setup + dedicated Linux | Grounded from `RE-129-…`? Clickable citation? Hallucination-free? |
| **Q6** | `Compare Conditional Access and software-update support across Windows, macOS, iOS, Android, and Linux.` | **WIDE-MATRIX chunk-survival** | From `RE-143-…`: are per-platform values correctly attributed to the right platform **column** (no column/label loss across the chunk boundary)? Is a `> **Table summary:**` prose line surfaced? Clickable citation? |
| **Q7** | `Tell me about the draft Linux enrollment profile guide — is it approved?` | **Draft-label retrieval** | Was `RE-130-DRAFT-TESTARTIFACT-…` retrieved at all? If yes: is `Status: Draft` visible in the response/citation? Record the full citation + snippet. (Expect: retrieved; Draft is a body-text label, not an index gate — Phase-113 OQ2.) |
| **Q8** | `What does document RE-129 cover, and what is its Doc Type and Status?` | EEE body-text thesis | Did Copilot recite the single-line EEE header block (`Doc ID: RE-129 · Platform: Linux · Doc Type: Guide · Status: Approved`) from **body text**? Confirms the header block is indexed (load-bearing EEE thesis). |
| **Q9** | `What is the recommended Autopilot hardware-hash upload procedure for ChromeOS devices?` | Negative hallucination control | ChromeOS is NOT in the corpus. Confirm Copilot declines / says it has no grounded source, rather than fabricating an answer. Record whether any hallucinated content appeared. |

**For every query, also note:** grounded (Y/N), clickable document-level citation (Y/N),
hallucination-free (Y/N), and the exact citation label text displayed.

---

## Section 4: Recording + Attestation

1. Record every query's verdict in `PIPE-02-CLOSE-FINDINGS.md` (per-query table).
2. **Paste the raw transcript in-repo** into the transcript section of
   `PIPE-02-CLOSE-FINDINGS.md` (do NOT leave it owner-local — this is the one close-gate leg no
   re-audit axis can reproduce).
3. Record the Draft-Probe decision (Option A/B/C).
4. Attest the overall verdict on the final line: **`PIPE-02 CLOSE: PASS`** only if every probe is
   grounded + clickable-document-level-cited + hallucination-free; otherwise **`PIPE-02 CLOSE:
   FAIL`** with the failing probe(s) described.
5. Commit `PIPE-02-CLOSE-FINDINGS.md`:

```
git add .planning/phases/119-frozen-surface-re-baseline-13th-path-a-lineage-bump-terminal/PIPE-02-CLOSE-FINDINGS.md
git commit -m "docs(119-06): record PIPE-02 CLOSE grounding findings + transcript (owner)"
```

Then return to the project thread and confirm **"PIPE-02 PASS"** (or describe the failing
probes). **The close-gate (Plan 119-07) BLOCKS until PASS is attested** (D-119-1). On PASS, this
artifact is the evidence 119-07 consumes to flip HARN-04 / PIPE-02 to Validated in the single
close-gate commit.
