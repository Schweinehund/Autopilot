# Phase 109: 802.1X Integration — Capability Matrices + Navigation Hubs - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-07-01
**Phase:** 109-802-1x-integration-capability-matrices-navigation-hubs
**Areas discussed:** Glossary see-also wiring, Capability-matrix target file set, Network-Auth row shape + verdict vocabulary, Nav-hub entry style + depth
**Resolution method:** Three-agent adversarial review (Finder → Adversary → Referee, Opus) per the user's standing convention. Finder scored ~60 (four HIGH ref-anchored picks); Adversary banked 0 (zero overturns, declining −2× wrongful-overturn risk); Referee independently re-verified every load-bearing anchor and upheld all four, correcting two non-material Finder rationale drifts. Unanimous convergence on **Option A** for every decision.

---

## Decision 1 — Glossary see-also wiring (SC3)

| Option | Description | Selected |
|--------|-------------|----------|
| A | Verify-only: SC3 already satisfied by existing banners; `_glossary-ios.md` satisfied-by-`_glossary-macos.md`; leave apple-business untouched | ✓ |
| B | Verify + add network banner to `_glossary-apple-business.md` for completeness | |
| C | Verify + add apple-business banner + document the stale `_glossary-ios.md` naming reconciliation | |

**Outcome:** A. All four *existing* SC3-named glossaries already carry the `_glossary-network.md` banner (`_glossary.md:13`, `_glossary-macos.md:12`, `_glossary-android.md:14`, `_glossary-linux.md:12`); the fifth named file `_glossary-ios.md` does not exist (iOS folded into `_glossary-macos.md:9`). SC3 is already TRUE.
**Notes:** `_glossary-apple-business.md` is an ABM-governance glossary (`applies_to: apple-business`), not one of the five device-platform glossaries SC3 enumerates → B/C over-deliver beyond the spec + author content in a nav-last phase. Adversary confirmed; Referee upheld (strongest anchor `_glossary-macos.md:9`).

---

## Decision 2 — Capability-matrix target file set + Windows gap

| Option | Description | Selected |
|--------|-------------|----------|
| A | Add Network-Auth row to the 4 per-platform matrices + the comparison (5 files); Windows-as-baseline suffices; no new files | ✓ |
| B | Author a NEW `windows-capability-matrix.md` to literally satisfy "five platform matrices" | |
| C | Add row only to files that already carry a Windows column | |

**Outcome:** A. `4-platform-capability-comparison.md:13` — "a dedicated `windows-capability-matrix.md` is deferred to v1.6+." B contradicts this committed deferral (scope creep). C would exclude the Android matrix and break SC1.
**Notes — drift (i) resolved:** Finder claimed "all matrices carry a Windows column" — **FALSE**. `android-capability-matrix.md:16` is mode-columned (COBO/COPE/BYOD/Dedicated/ZTE/AOSP), no Windows column. This *strengthens* A: C would wrongly drop Android and fail SC1's "all five." Planner guardrail: author the Android 802.1X cell in mode-columned form.

---

## Decision 3 — Network-Auth row shape + verdict vocabulary

| Option | Description | Selected |
|--------|-------------|----------|
| A | Single "Network Authentication (802.1X)" row; reuse corpus 5-state verdict vocabulary; map SC1's YES/NO/STUB onto it | ✓ |
| B | Multiple sub-rows (Wi-Fi/wired 802.1X, EAP-TLS/PEAP) using corpus vocabulary | |
| C | Literal new YES/NO/STUB vocabulary per SC1, diverging from corpus verdict words | |

**Outcome:** A. `4-platform-capability-comparison.md:15` is a hard "5-state lock" (Supported / Partial / Not supported / Mode-dependent / n/a) → C violates it. `:44` "Certificate deployment (SCEP / PKCS / ACME)" is a single consolidated row → precedent against B's sub-rows. `:11` link-not-copy / PITFALL-7 verified.
**Notes:** SC1's "YES/NO/STUB" (`ROADMAP.md:269`) is conceptual status shorthand mapped onto the lock (STUB → gap/`Not supported`; e.g. Linux script-based, AOSP stub). Adversary + Referee upheld.

---

## Decision 4 — Nav-hub entry style + coverage depth

| Option | Description | Selected |
|--------|-------------|----------|
| A | Fold 802.1X entries into each hub's existing groupings (match each hub's shape) | ✓ |
| B | Dedicated "802.1X / Network Authentication" section in every hub | |
| C | Hybrid: dedicated section where topic-organized, fold-in where platform-organized | |

**Outcome:** A. 802.1X artifacts fold into pre-existing groupings by type/platform across all six hubs — no new top-level section needed. SC2 (`:270`) only requires hubs to "carry entries."
**Notes — drift (ii) resolved:** Finder claimed "no hub is topic-organized at H2" — **FALSE**. `index.md:243/:299`, `quick-ref-l1.md:35/:42`, `quick-ref-l2.md:65` carry topic H2s. Referee adjudicated: those topic H2s are *artifact-type buckets* (`## Decision Trees`, `## Runbooks`, `## Cross-Platform References`), so 802.1X content folds in **by artifact type** — still Option A. C would mint redundant/orphan sections since a suitable bucket already exists. Pick upheld on corrected rationale.

---

## Claude's Discretion

- Exact row-insertion anchor within each of the 5 matrix files (e.g. macOS row → existing `## Authentication` section `macos-capability-matrix.md:101` or a domain table), per-platform verdict values (derived from live guide content at plan time), row-label + nav-link-text wording — all within D-01..D-04 and holding corpus conventions (callout vocabulary, freshness stamps, plain-GitHub anchor slugs / double-hyphen trap).

## Deferred Ideas

- Standalone `windows-capability-matrix.md` → deferred to v1.6+ (committed corpus decision), out of milestone.
- Network banner in `_glossary-apple-business.md` → rejected; capture only if a future milestone universalizes glossary cross-links.
- ROADMAP SC3 stale-filename cleanup (`_glossary-ios.md` nonexistent) → future ROADMAP hygiene pass; Phase 109 verification maps it to `_glossary-macos.md`.
- v1.13 corpus accuracy nits + MDM migration walkthroughs → Phase 110 (FIX-01/02/03, MIGF-01/02).
