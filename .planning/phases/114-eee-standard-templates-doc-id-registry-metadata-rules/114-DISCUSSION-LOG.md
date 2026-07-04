# Phase 114: EEE Standard, Templates, Doc ID Registry + Metadata Rules - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-07-04
**Phase:** 114-eee-standard-templates-doc-id-registry-metadata-rules
**Areas discussed:** Owner field placement, Doc Type edge cases, Header block fields & order, Template & registry coverage
**Method:** Three-agent adversarial review (Finder → Adversary → Referee), grounded in
REQUIREMENTS.md, ROADMAP Phase 114/115, Phase-113 PIPE-02-FINDINGS.md, and research SUMMARY.md;
every deciding corpus fact independently re-verified against the repo. Per user request, each
gray area was adjudicated adversarially with a recommended option + reasoning (per repo convention,
mirroring Phase 113). Finder raised 25 flaws (4 critical); the Adversary disproved the overstated /
out-of-scope ones and corrected the corpus facts (orphan count 45 not 47; fixtures live outside
`docs/`; pipe `platform:` variants exist only in templates); the Referee issued final verdicts.

---

## Owner field placement (discuss-flag #4)

| Option | Description | Selected |
|--------|-------------|----------|
| 1A — Owner in visible block | Render `Owner` in the single-line body-text block (indexed) | |
| 1B — Owner frontmatter-only | `owner` in frontmatter only; not a block field | ✓ |
| 1C — Role-only string in block | Owner in block, constrained to role (not person) via C17 | |

**Verdict:** 1B (HIGH confidence).
**Notes:** OQ1 proved citations are filename-driven → owner-in-block gives zero citation value while
injecting a person-name into the load-bearing lead chunk (dilution + answer noise; the escape-valve
concern at REQUIREMENTS L59). C17 only needs `owner` present in frontmatter. Adversary disproved the
two anti-1B flaws (discoverability loss = governance meta-query, not core-value; no C17 asymmetry).
1C disproved: "role not person" is not machine-lintable.

---

## Doc Type edge cases + Phase-1 registry scope (discuss-flag #7)

| Option | Description | Selected |
|--------|-------------|----------|
| comparison → Reference | apv1-vs-apv2, windows-vs-macos as lookup material | ✓ |
| error-codes → Reference | Lookup material, no procedural walkthrough | ✓ |
| end-user guides → Guide | Audience-facing procedure | ✓ |
| Corpus-wide scoping rule (positive named-class) | Phase-1 = runbooks + admin-setup + reference classes only | ✓ |

**Verdict:** classifications as above (HIGH); adopt a positive named-class Phase-1 scoping rule
(MEDIUM until orphan-scope confirmed — see below).
**Notes:** doc_type is audience-agnostic by design, so "Guide over-collapses admin+end-user" was
disproved. The Finder's real kernel: 45 docs (`operations/`, `device-operations/`,
`cross-platform/apple-business/`) are in neither the Phase-1 list nor the v1.16 deferred list → the
registry's "one collision-free pass" cannot complete until membership is ruled. Referee's
positive-named-class rule (vs the Adversary's over-sweeping complement-of-deferred rule) makes the
registry runnable this phase. RCA-as-dead-taxonomy-member disproved (RCA is a required member for
forward-compat).

### 45-orphan-doc scope — escalated to user

| Option | Description | Selected |
|--------|-------------|----------|
| OUT — defer to v1.16 | Exclude all 45; named classes already ~167-174 (at/above "~150"); v1.15 reshape-only | ✓ |
| IN — include in Phase-1 | Assign IDs + retrofit in 116-118; grows scope to ~215+ | |
| Split — some in, some out | Operations runbooks in, apple-business governance out | |

**User's choice:** OUT — defer all 45 to v1.16 (confirmed 2026-07-04).
**Notes:** The only item the adjudication flagged as a genuine visionary/scope decision rather than a
format one. User accepted the Referee's recommendation.

---

## Header block field set, order & separator (META-02)

| Option | Description | Selected |
|--------|-------------|----------|
| Field-set A (4) | `Platform · Doc Type · Doc ID · Status` | ✓ |
| Field-set B (6) | + Owner + Last Reviewed | |
| Field-set C (5) | + Last Reviewed (no Owner) | |

**Verdict:** field-set A, `·` separator, Platform + Doc Type first (HIGH confidence).
**Notes:** Field-set A is exactly the block PIPE-02 proved indexes as body text (the load-bearing
thesis), reordered to the locked Platform+DocType-first rule (strictly more chunk-resilient). The
Finder's "validated stub led with Doc ID → CRITICAL" was disproved by the Adversary (the proof is
order-independent; reordering moves toward the safer configuration). Also disproved: `Last Reviewed`
stale-date concern is intended honest behavior BUT adds lead-chunk dilution for no gain (so excluded
from the block, satisfied via frontmatter + Version-History row); `|`-separator-collision (needle #6
targets the `|---|` delimiter row, not a bare separator); bold-unvalidated (Copilot strips markdown).
Field-set B eliminated by the 1B owner decision. Original leaning C → flipped to A by the Adversary
(A is the empirically-validated field set).

---

## Template & registry coverage (STD-02, STD-03)

| Option | Description | Selected |
|--------|-------------|----------|
| 4A — new Reference + RCA templates | Full taxonomy template coverage | |
| 4B — existing admin/l1/l2 only | Update the 6 existing templates | |
| 4B-hybrid | Keep 6 + add Reference template; defer RCA template | ✓ |

**Verdict:** 4B-hybrid; Phase-1-only flat-sequential registry from RE-001; fix the 3 pipe-list
templates to `platform: all` (HIGH confidence).
**Notes:** The one genuine CRITICAL both agents confirmed: Phase-115 SC3 needs C17 green on all
templates, but the pipe-list `platform:` placeholders can't resolve in the D1 map (no fallback). The
Referee's decisive verified fact — the pipe-format variants exist **only** in the three templates, no
real corpus doc uses them — means changing them to `platform: all` fixes C17 with no carve-out and
keeps the D1 map scoped to ~19 real variants. Add Reference template (the ~35 reference-class docs
have no template home); defer RCA template (zero RCA docs). Registry-274 sweep rejected (already
mandated Phase-1-only); count-undersized disproved (flat sequential has no ceiling); RE-T0x
contamination moot (fixtures live outside `docs/`).

---

## Claude's Discretion

- Exact ordering of the sequential `RE-NNN` assignment (by class / directory / operator-impact) —
  keep IDs semantically flat.
- Exact `## Summary` minimum-word-count the standard states (adopt the ROADMAP Phase-115 ">=30 words"
  unless a stronger threshold is warranted).
- Filename/section layout of `EEE-SOP-standard.md`, the new Reference template, and `RE-index.md`.

## Deferred Ideas

- v1.16 — the 45 orphan docs (`operations/`, `device-operations/`, `cross-platform/apple-business/`).
- v1.16 — descriptive-filename normalization pass (OQ1: citations are raw `.docx` filenames).
- Deployment — SharePoint content-approval as the Draft-un-retrievable hardening lever (OQ2).
- Deferred RCA template (authored when the first RCA doc exists).
