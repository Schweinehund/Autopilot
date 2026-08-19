# Phase 143: Link Coverage & Fence-Mask Unification - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-08-11
**Phase:** 143-link-coverage-fence-mask-unification
**Areas discussed:** Residual-anchor scope, Checker vessel + CARVE, Fence-mask mechanism, Enforcement surface

**Method:** the owner selected all four gray areas and directed `/grill-me` to raise the questions
and `/adversarial-review` to score the picks — the same instrument Phases 141 and 142 used.
Interrogation produced a 16-decision draft; the review ran **4 parallel Finders → Adversary →
Referee** and returned **63 findings (286 Finder points)**. The Adversary disproved 5; the Referee
confirmed 60, overturned 3, and reversed the Adversary on 2 of its 3 critical disproves. The review
**reversed five of the draft's recommendations**.

---

## Area selection

| Option | Description | Selected |
|--------|-------------|----------|
| Residual-anchor scope | 67 genuine broken anchors survive LINK-01 across 19 files, none allowlisted | ✓ |
| Checker vessel + CARVE | Extend `check-nav-hub-links.mjs` in place vs a net-new file needing an amendment | ✓ |
| Fence-mask mechanism | Shared `_lib/` vs verbatim `^ {0,3}` copy; and whether detection unifies too | ✓ |
| Enforcement surface | The checker has zero callers; who runs it after Phase 143 | ✓ |

**User's choice:** all four, plus an explicit directive to use `/grill-me` and `/adversarial-review`.
**Notes:** matches the recorded preference for adversarial review on gray-area picks.

---

## Anchor model

*(This area did not exist in the initial framing. It was surfaced by Finder A, which tested an
assumption nobody had written down: that the checker's anchor model matches the corpus's renderer.)*

| Option | Description | Selected |
|--------|-------------|----------|
| Model GitHub, fix all 65 | Drop the Pandoc `{#id}` suppression branch; ~145 total corpus repairs; the only option under which LINK-04's "no baseline of any kind" is literally true | ✓ |
| Model GitHub, defer the 65 | Fix the model, route the 65 to v1.21 — ships an explicit 65-link baseline | |
| Keep Pandoc semantics | Cheapest, near roadmap size — knowingly ships a hidden baseline under an SC that forbids it | |
| Strip the 87 `{#id}` | Remove every override so both renderers agree; touches 29 files and changes rendered headings | |

**User's choice:** Model GitHub, fix all 65.
**Notes:** the "pandoc is the authoritative renderer" escape was tested against the Adversary and
died on three legs — `EEE-SOP-standard.md:278` (no section anchors in the `.docx`),
`PROJECT.md:759` (plain-GitHub slugs preserved), and a measured pandoc 3.7.0.2 run emitting no
`w:bookmarkStart` for a table-cell `<a id>`.

---

## Anchor remedy direction

| Option | Description | Selected |
|--------|-------------|----------|
| Target-side `<a id>` + de-anchor | `<a id>` on existing table rows; links with no correct target lose the fragment; no prose authored | ✓ |
| Source-side only | Rewrite all links, never touch a target; loses the deep-link affordance on ~36 error-code references | |
| Target-side + bar exemption | Ask the owner to ratify a narrow exemption for genuinely-missing glossary entries | |

**User's choice:** Target-side `<a id>` + de-anchor.
**Notes:** forced by `v1.20-CARVE.md:183-185` ("never new documentation content"), which the draft
had not named. The `#intune` case is the canonical example — four links, a plausible prefix match,
no correct target, so the honest fix is to de-anchor rather than invent a glossary entry.

---

## Enforcement surface

| Option | Description | Selected |
|--------|-------------|----------|
| `check-phase-143.mjs` spawn | Booked verbatim by HARN-18; `check-phase-119.mjs:148` is the idiom; no amendment, runs in the apex, no new live-HEAD harness leg | ✓ |
| C18 harness fold + SC amendment | The draft's pick, made legal by amending Phase 144 SC#2 — adds a second permanent live-HEAD leg to every descendant harness | |
| 17th workflow bare job | No amendment, no harness coupling — but only fires on that workflow's path filters | |

**User's choice:** `check-phase-143.mjs` spawn.
**Notes:** the draft's C18 was withdrawn as unauthorized — ROADMAP Phase 144 SC#2 pins "C1-C17
inherited" and v1.11 wrote that reading down explicitly (`93-CONTEXT.md:51`). Trigger-blindness
survives this choice and is recorded separately: 10 of 16 workflows have no `docs/` path filter, so
a docs-only PR fires nothing.

---

## Scope handling

| Option | Description | Selected |
|--------|-------------|----------|
| Amend and absorb in 143 | One SC-amendment commit + one CARVE amendment commit, then execute in Phase 143; keeps Phase 144 clean as the terminal close | ✓ |
| Split into a new 143b | Tooling in 143, corpus repairs in a new phase — inserts a phase before the terminal close | |
| Trim to roadmap size | Route anchors to v1.21 wholesale — LINK-04 ships red or baselined | |

**User's choice:** Amend and absorb in 143.
**Notes:** mirrors every prior harness-close milestone, where the close phase never batches other work.

---

## Fence-mask mechanism (resolved by interrogation + review, not by a user prompt)

The draft's pick — verbatim `^ {0,3}` into all 15 sites rather than a shared `_lib/fence-mask.mjs`
— **survived**, but both of its stated reasons were struck. `_lib/` already holds three modules
imported 92 times, so shared-lib is the incumbent idiom, not a novel structure; and
`build-publish-bundle.mjs:248` already crosses the JS↔PowerShell boundary via `execFileSync('pwsh')`.
The decision now rests on measured cost (≈60 s added per bundle build from 221+ node spawns) and on
the fact that a shared lib still leaves `convert.ps1` as the outlier LINK-05 exists to end.

The draft's own biggest self-flagged worry — that widening the mask creates an evasion — was
**overturned by the Adversary and upheld by the Referee**: a column-0 `~~~` wrapper already achieves
the same suppression on unmodified HEAD, so `^ {0,3}` adds only an indented spelling of an existing
capability, and it is a CommonMark conformance fix rather than a weakening.

---

## Recommendations the review reversed

| Draft pick | Outcome |
|---|---|
| D-08 "retire the inbound pass" | **Wrong pass** — `checkInboundLinks()` is the only corpus scan; and coverage needs two conditions deleted (`:269` *and* `:259`), not one |
| D-04 class B/D "add the missing section" | **Barred** by the CARVE Standing bar + REQUIREMENTS Out of Scope |
| D-09's copy-verbatim premises | **False** — `_lib/` is the incumbent idiom and the PowerShell boundary is already crossed |
| D-14's C18 harness fold | **Unauthorized** by Phase 144 SC#2 |
| D-15's "inert for 20 phases" | **False** — run as a scored gate in Phases 123/130/135/137 |

Also struck as false premises rather than false numbers: "`{#id}` is barred" (87 exist across 29
files), "all 200 `<a id>` are Android-family" (55 are not), "all 16 CI workflows run it" (5 of 16),
"no CARVE category covers any of them" (Category 8 does), and a miscitation of Phase 142 D-36.

## Claude's Discretion

- Plan/atom decomposition, subject to the three-step commit sequence and the ledger-row-before-edit rule.
- The disjoint class definition or explicit precedence rule for the overlapping B/C remedy classes.
- Which table row carries the anchor for the two double-row error codes.
- Exact `<a id>` slug spelling per row (must equal the incoming fragment verbatim, including case).
- Self-test case selection for the GitHub `{#id}` model, `<a id>` recognition, and the inline-mask leg.
- Evidence-artifact format for the mask-delta table and the per-class remedy ledger.
- Whether the single `.planning/` link target is in the checker's scope or excluded with a recorded reason.

## Deferred Ideas

- **`FENCE-AXIS-02`** — the fence-length and mask-scope divergences; LINK-05's subject is indentation only.
- **Detection-regex widening** — `c17:209` and `retrofit-*:423` stay column-0; 0 live instances today.
- **Divergent fence sites outside the census** — `check-phase-66.mjs:274`, the 12 unanchored strip
  sites in `check-phase-54..59`, and `carve-gate.mjs:65`.
- **`.gitattributes` `*.md` normalization** — the CRLF trap is real but not LINK-scoped.
