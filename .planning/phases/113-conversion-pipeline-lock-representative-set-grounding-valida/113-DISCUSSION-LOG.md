# Phase 113: Conversion Pipeline Lock + Representative-Set Grounding Validation - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-07-03
**Phase:** 113-conversion-pipeline-lock-representative-set-grounding-valida
**Areas discussed:** PIPE-02 run model, Deployment target lock, reference.docx origin, Guard depth + wiring

**Method:** User selected all four gray areas and requested a `/adversarial-review`
recommendation per area. A three-agent scored review ran — Finder (62 flaws, 291 pts) →
Adversary (+29; confirmed the 6 decisive CRITICALs, disproved/downgraded 20 overstated
flaws) → Referee (independently re-verified every deciding fact against the repo and ruled
each decision). User accepted all four verdicts; the B3 deployment-mode owner gate was
answered live (SharePoint + .docx confirmed).

---

## PIPE-02 run model

| Option | Description | Selected |
|--------|-------------|----------|
| A1 owner-run | Agent authors documented validation procedure + results template; owner runs live Copilot Studio queries at a checkpoint; agent automates convert+guard | ✓ |
| A2 agent-run end-to-end | Agent has/obtains live Copilot Studio + SharePoint access and runs convert→upload→query itself | |
| A3 hybrid | Agent automates convert+guard+upload; owner runs only the live query | |

**User's choice:** A1 (via adversarial-review verdict).
**Notes:** A2 foreclosed — no live access, provisioning explicitly out of scope
(REQUIREMENTS L77; SUMMARY L116). A3 collapses into A1 because the upload leg needs
out-of-scope SharePoint credentials. Corpus protection is the mechanical YAML/heading
guards (agent-run either way).

---

## Deployment target lock

| Option | Description | Selected |
|--------|-------------|----------|
| B1 SharePoint + .docx (hard-lock) | Lock the milestone's working assumption; pipeline mandatory | |
| B2 Dataverse direct .md | Copilot Studio upload-files supports .md; obviates the pipeline | |
| B3 confirm-then-lock | SharePoint at Phase-113 entry via owner gate + Dataverse fallback | ✓ |

**User's choice:** B3, resolved to **SharePoint + .docx** by the owner gate (confirmed 2026-07-03).
**Notes:** B1 would hard-lock an assumption the research flagged unconfirmed (SUMMARY L219
"confirm before Phase 113"). B2 is a trap — it re-introduces the P-08 YAML leak unguarded
across all ~150 docs (no Pandoc step to move frontmatter into doc properties). B3's gate
sits at phase entry, before the build, and the owner confirmed the SharePoint path — so
the pipeline proceeds and Dataverse is recorded as rejected.

---

## reference.docx origin

| Option | Description | Selected |
|--------|-------------|----------|
| C1 owner hand-styled | Owner provides a hand-styled reference.docx with Heading 1/2/3 styles | |
| C2 pandoc default then verify/edit | Generate pandoc default, then verify/adjust styles | |
| C3 script-generate + guard asserts styleIds | Generate pinned pandoc default; guard asserts Heading styleIds on converted output | ✓ |

**User's choice:** C3 (via adversarial-review verdict).
**Notes:** Pandoc's default reference.docx already carries correct Heading 1/2/3 styleIds;
with Pandoc pinned they're deterministic (locale affects display names only). C1 needs a
Word GUI in a headless env and risks silent style-name mismatch → P-09 across 150 docs.
C2's verify/edit pass is redundant and still needs the missing GUI.

---

## Guard depth + wiring

| Option | Description | Selected |
|--------|-------------|----------|
| D1 YAML-leak only, standalone | Assert no `---` in first ~500 chars of .docx body | |
| D2 YAML-leak + heading-style, standalone | Both checks on unzipped OOXML; not chain-wired | ✓ |
| D3 same, wired into scripts/validation now | Both checks, folded into the harness during Phase 113 | |

**User's choice:** D2 (via adversarial-review verdict).
**Notes:** D1 is a false-green trap — `.docx` is a compressed zip, so a raw-byte `---`
scan never matches even when YAML leaks — and it drops the SC3 heading check. D3 injects
Pandoc/`.docx` byte-variance into the cross-OS EXACT-MATCH text chain (threatens HARN-04)
and violates validator-atom deferral (`check-phase-113.mjs` is authored at Phase 119).
D2's guard must unzip `word/document.xml` and check body text + paragraph styleIds.

---

## Claude's Discretion

- Pandoc install + version pin (Pandoc not currently on PATH; PIPE-01 requires a pin).
- Representative-set file picks (must span platform variants + ≥1 capability-matrix table + ≥1 `Status: Draft` doc).
- Empirical-findings artifact filename in the phase directory.
- C3 + D2 share one OOXML introspection helper (build once); the D2 guard is the Phase-119 seed for `check-phase-113.mjs`.

## Deferred Ideas

- v1.16 file-rename pass (if citation title derives from SharePoint filename, not H1).
- SharePoint content-approval to actually gate `Status: Draft` (deployment/ops, owner decision).
- Azure AI Search structured-index upgrade (filterable platform/doc_type metadata).
