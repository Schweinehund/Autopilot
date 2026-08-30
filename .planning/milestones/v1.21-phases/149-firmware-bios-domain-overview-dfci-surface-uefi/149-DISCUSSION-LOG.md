# Phase 149: Firmware/BIOS Domain — Overview, DFCI & Surface UEFI - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-08-24
**Phase:** 149-firmware-bios-domain-overview-dfci-surface-uefi
**Areas discussed:** File count & numbering · Forward-link hazard · Surface UEFI coverage · DFCI settings
surface · The oldest-source gate · Registration-path cross-link · TPM / Secure Boot boundary · Glossary
terminology — **all 8 selected**, plus a 9th (framework applicability) surfaced by the review.

---

## Method

The user selected all 8 offered gray areas and directed: *"Use /grill-me to thoroughly raise additional
questions in each of the areas and use /adversarial review to evaluate each of the questions in each of
those areas to recommend the best one and provide your reasoning."*

| Stage | Output |
|---|---|
| `/grill-me` | 72 sub-questions across 8 areas + a cross-cutting area, each with a recommended answer and reasoning (`149-GRILL-DRAFT.md`, 879 lines) |
| `/adversarial-review` — 6 parallel Finders | 159 raw findings / 805 points (5 MECE chunk agents + 1 cross-cutting requirement-coverage agent) |
| Dedup / merge | 118 issues, F-001..F-118 |
| Adversary (double-penalty scoring) | 7 full disproofs, 20 partials, 91 confirmed (≈ +111) |
| Referee (+ 3 mandatory extra passes) | 110 REAL / 8 FALSE POSITIVE; **103 net distinct** after 7 merge edges; 4 new findings; 3 owner rulings identified |

Finder chunking was MECE by gray area so no file was read twice: F1 = Areas 1-2, F2 = Areas 3-4,
F3 = Area 5, F4 = Areas 6-7, F5 = Area 8 + cross-cutting + the preamble measurement tables,
F6 = cross-cutting requirement/SC clause coverage.

**Referee corrections to the Adversary:** upheld all 7 disproofs; **overturned 1 confirmation** (F-037 —
the draft's `148-CONTEXT.md` citation was correct; both the Finder and the Adversary reasoned from D-52's
body without reading the section heading four lines above it); rejected 2 of 7 netting pairs
(F-024↔F-092, F-045⊂F-001) because each hid a second real issue inside a merge; and found 2 double-counts
the Adversary missed (F-022⊂F-021, F-054⊂F-014).

---

## Area 1 — File count and numbering

| Option | Description | Selected |
|--------|-------------|----------|
| One file | `00-overview.md` only; DFCI content folded into the hub | |
| **Two files** | `00-overview.md` + `01-windows-dfci.md`; Surface folds into `01` | ✓ |
| Three files | Adds a standalone `02-surface-uefi.md` per `ARCHITECTURE.md:113` | |

**Outcome:** Two files (CONTEXT D-20), Phase 150's guides renumbered to `02/03/04` (D-21).
**Notes:** The Adversary disproved the Finder claim that this "overturns the only file map with zero
citation" — `ARCHITECTURE.md` is advisory research, `:697` (OQ-5) records the numbering as an *open
question*, and `REQUIREMENTS.md` names exactly one firmware-bios file. The Referee also disproved the
canary-arithmetic objection: `ARCHITECTURE.md:293` bars its own N from becoming a literal, and INT-03
requires every canary be computed from the registry after rows land. The review did require a reversibility
label, now attached. Separately, `STATE.md:327`'s LOCKED `DISCUSS-PHASE-FLAGS` naming item is now
explicitly discharged (D-22) rather than declared "not a gray area".

---

## Area 2 — The forward-link hazard

| Option | Description | Selected |
|--------|-------------|----------|
| **No links to Phase-150 targets** | Route by naming vendors in prose + a custody table; 150 adds links | ✓ |
| Author stubs in 149 | Create placeholder files so links resolve | |
| Link anyway, accept red | | |

**Outcome:** Zero outbound links to `firmware-bios/02|03|04-*` (D-26); the link-adding is handed to Phase
150 **by name** (D-65) because INT-04 reaches only two index files.
**Notes:** The review killed the draft's *commit ordering*. The draft ruled two commits, guide first,
reasoning that overview-first dangles — but with bidirectional cross-links (which every sibling's platform
blockquote forces) guide-first dangles equally. Three independent Finders reached this and one
probe-confirmed it. Resolved to **one commit, both files** (D-28). Also corrected: `#driver-firmware-policy`
lives in `01-windows-wufb-rings.md:170`, not in `06` (D-17), and the draft never wrote a correct relative
path (D-27).

---

## Area 3 — Surface UEFI coverage

| Option | Description | Selected |
|--------|-------------|----------|
| Own file | | |
| **Bounded section inside `01`** | Prerequisite floor, self-registered rule, disapplied-settings Note, removal path; no model tables | ✓ |
| Full Surface treatment | Including the eligible-model and model-gated-settings tables | |

**Outcome:** Bounded section (D-32), with the removal path carrying an explicit ordering warning (D-33).
SEMM: total silence (D-34).
**Notes:** The draft's stated ground — *"no BIOS-NN clause mentions Surface"* — is **false**;
`REQUIREMENTS.md:73` names *Microsoft Surface* among the nine. The surviving ground is
`REQUIREMENTS.md:164`'s bar on per-model matrices. The single most consequential finding in the whole
review landed here: the Surface removal path's step 2 (delete the Autopilot registration) is the exact
operation `PITFALLS.md` C1-2 calls *"the single highest-consequence item in the milestone — it destroys
hardware value"*, and the draft shipped both sequences into one file flagging only the Ethernet-adapter
prerequisite. The Adversary also disproved the SEMM objection: `REQUIREMENTS.md`'s `## Future Requirements`
already carries SEMM as a milestone-level deferral, so silence is compliance.

---

## Area 4 — The DFCI settings surface and the three traps

| Option | Description | Selected |
|--------|-------------|----------|
| Full eight-category table | | |
| **Categories only + all three traps** | With the net position stated honestly | ✓ |
| Traps only, no categories | | |

**Outcome:** Categories only, all three traps, and a **named** durable-consequence-ships /
high-churn-data-routes-out rule (D-35, D-36).
**Notes:** Three separate corrections. (1) The draft recommended shipping *"Disabling CPU and IO
virtualization via DFCI removes the virtualization support that VBS depends on"* — `STACK.md:176` records
that setting as **Not configured / Enabled only, no Disabled value**, so the operation is impossible;
reversed (D-07). (2) The draft truncated the VBS→Hotpatch chain claiming the last hop was unsourced;
`PITFALLS.md:288` carries a `[SOURCED]` Autopatch-FAQ quote for exactly that hop (D-14). (3) "No settings
table" was illusory — roughly ten setting names ship anyway across D-32/D-36/D-41 (D-35). The Adversary
disproved the claim that the Out-of-Scope bullet cannot reach a Microsoft reference page: `148-CONTEXT.md:368`
applied §5 to exactly that class — but the correct precedent shape is D-45's **bounded table + pointer**,
not a refusal.

---

## Area 5 — The oldest-source research gate

| Option | Description | Selected |
|--------|-------------|----------|
| Five-page fetch list | As drafted | |
| **Seven-page list, every item graded** | Adds the Project Mu page + the two vendor sources from the owner ruling | ✓ |

**Outcome:** Seven pages, each with a stated consequence-on-failure (D-46).
**Notes:** The worst-performing area in the draft. It cited `148-CONTEXT.md` D-11 as a cautionary tale and
then committed D-11's exact error against D-11's exact counter-source — `STACK.md:770`'s
`waas-manage-updates-wufb` at `ms.date 2024-05-16` is older than `configure-bios-windows`'s 2024-06-06, so
the roadmap's *"oldest source in the whole set"* is false (D-13). It cited 148 D-58's "grade every fetch
item" and graded **one page of five** (D-46). And it excluded the Project Mu page while simultaneously
requiring the one-OEM variant its own requirement mandates. Also corrected: the six-OEM list is **blocking
for SC#3**, not non-blocking (D-47); the nine OEM names were never written down anywhere in the draft
(D-48); and `**Source:**` lines must carry **both** dates, or the two-year staleness this area exists to
surface becomes invisible in the shipped document (D-51).

---

## Area 6 — The registration-path cross-link

| Option | Description | Selected |
|--------|-------------|----------|
| Edit `admin-setup-apv1/01` to add a forward link | | |
| **Link out only; hand the inbound link to 152 by name** | | ✓ |

**Outcome:** No edits to `admin-setup-apv1/**`; the inbound link is handed to Phase 152 explicitly (D-44).
**Notes:** The Adversary and Referee both upheld the draft's *reading* of PITFALLS C1-1 against a Finder
challenge — C1-1 prescribes the link in the DFCI guide pointing back, not an edit to the apv1 file. But the
draft's stated **C17 ground for declining the edit was invented**: the file is *already* enrolled
(`doc_id: RE-077`) and already in the 234-file baseline, and zero validators reference it. The real ground
is staleness. The Finder also refuted the slug hazard by running the repo's own slugifier — all three
`## Path N` slugs are clean. This area produced owner ruling #2 (see below).

---

## Area 7 — The TPM / Secure Boot boundary

| Option | Description | Selected |
|--------|-------------|----------|
| Say nothing | | |
| Cross-link TPM only | As drafted | |
| **Cross-link four owners** | TPM, Secure Boot, BitLocker, and firmware *updates* | ✓ |

**Outcome:** `## What This Domain Does Not Own` cross-links four owners (D-41), and the DFCI absence is
written as an **enumeration fact**, never as a sourced absence (D-43).
**Notes:** The draft's `[MEASURED]` justification — *"all 52 BIOS hits are TPM/serial/hardware-hash
troubleshooting"* — is fabricated; four counter-examples on the first grep, one of them a NetBIOS substring
(D-24). Measured properly: Secure Boot appears in **two** files and **zero** times in the file the draft
routed it to, so that cross-link routed Secure Boot nowhere; BitLocker — the only one of the three named
inside BIOS-11's own quote — was never measured at all, and is ~2.6× TPM by occurrence.

---

## Area 8 — Glossary terminology

| Option | Description | Selected |
|--------|-------------|----------|
| **Add DFCI terms to `docs/_glossary.md` now** | Discharge the roadmap-locked flag in 149 | ✓ |
| Defer to Phase 152 by name | | |
| Defer to a hygiene milestone | And correct `PROJECT.md:31` to match | |

**Outcome:** Owner ruling #3 (see below). Terms, placement, slug shape and the three mechanical obligations
are D-61..D-63.
**Notes:** All three of the draft's grounds for deferring were defective, and the review documented each
(D-71): the wrong test (it looked for a *requirement* and never read `STATE.md:327` or `PROJECT.md:31`), a
**false superlative** (`_glossary.md` is pinned 10 times, against `quick-ref-l1.md`'s 130 — the "14+
validators" figure was a substring grep catching the five platform glossaries), and a framing Phase 147
had already measured as **falsified** by a live probe.

---

## Area 9 — Framework applicability *(surfaced by the review; not in the original 8)*

Nobody named it, including the draft. `applies_to` was assigned in a single unreasoned clause. But DFCI's
central gate is hardware-hash Autopilot registration — an APv1 construct — and `applies_to: all` would
assert DFCI reaches APv2 fleets, which the same review established it cannot. Resolved to `applies_to:
APv1` (D-30), matching both DFCI-adjacent neighbours.

---

## Owner rulings

### Ruling 1 — SC#1's HP and Lenovo sources

| Option | Description | Selected |
|--------|-------------|----------|
| **Grow the fetch list by two** | HP Connect User Guide (browser-UA `curl`) + Lenovo CDRT blog, so each custody position carries a real Source line | ✓ |
| Soften the Lenovo superlative | Fetch HP only; drop the "only vendor" comparative | |
| Ship both as-is from research | | |

**Rationale as put to the owner:** SC#1's HP clause is sourced only to a **2022** PDF and the Lenovo
superlative rests on research graded **`PREMISE` — "Lenovo does not say it."** Neither had a fetch item and
neither had a decision. A fabricated citation here would be the milestone's third.

### Ruling 2 — SC#4's "three registration paths"

| Option | Description | Selected |
|--------|-------------|----------|
| **Document four channels + APv2, amend the premise** | Write the gate as Learn states it; file a REQUIREMENTS.md amendment | ✓ |
| Keep three, add APv2 as a note | | |
| Keep three, defer both to backlog | | |

**Rationale as put to the owner:** the `[MEASURED]` three-count was measured against one file. Two others
falsify it — `docs/admin-setup-apv2/**` (no Autopilot registration at all, so DFCI can never apply) and
`docs/lifecycle/01-hardware-hash.md:62`, which documents a fourth channel, **Partner Center / CSP partner**,
that Learn's own gate says **qualifies**. Amending an SC's factual premise mid-milestone is an owner call.

### Ruling 3 — The glossary flag

| Option | Description | Selected |
|--------|-------------|----------|
| **Add DFCI terms to `_glossary.md` now** | | ✓ |
| Defer to Phase 152 by name | | |
| Defer to a hygiene milestone | | |

**Rationale as put to the owner:** `STATE.md:327` LOCKS *"which glossary receives the new terminology
(149/152)"* as a **Phase-149** decision and `PROJECT.md:31` names DFCI **first** among the terms this
milestone adds. Phases 147 and 148 both deferred it. The measured cost is one Alphabetical Index row, one
Version History row, and C17 conformance.

**Through-line across all three:** where Phase 148's rulings chose scope discipline over local correctness,
149's chose evidential completeness over minimal scope. All three grow the phase.

---

## Claude's Discretion

Prose wording throughout. Exact H2 names except the pinned `## Unsupported and Anti-Feature Callouts`
literal. The hand-authored anchor-id strings, within the short-form convention. Article titles chosen for
`**Source:**` lines. Whether the overview lands at 8 or 9 H2s. Which `_glossary.md` H2 section receives the
DFCI entries (`## Security` vs `## Hardware`). Edit order within the single commit. Exact phrasing of the
seam and bound statements, provided each names what it defers to.

---

## Deferred Ideas

Recorded in full in `149-CONTEXT.md` `<deferred>`. Summary: a standalone `02-surface-uefi.md`; the full
DFCI settings and Surface model tables; SEMM's current status (already parked at `REQUIREMENTS.md`'s
`## Future Requirements`); Phase 150's three `[UNVERIFIED]` recovery gaps; `docs/operations/00-index.md:32`'s
stale "4-platform" description; the inaccurate greenfield/blast-radius statements in `ROADMAP.md:185` and
`STATE.md:157`; the "oldest source in the whole set" overclaim in `ROADMAP.md:187` and `STATE.md:564`;
`ARCHITECTURE.md:329`'s stale `V-59-14` description; `REQUIREMENTS.md:152`'s self-referential grep claim;
the 217-of-271 past-due population; and CSP-partner Autopilot registration as a fully documented path.

---

## Findings ruled FALSE POSITIVE *(recorded so no later phase re-imports them)*

1. The canary arithmetic / registry-row count is **not** invalidated by dropping a Surface file —
   `ARCHITECTURE.md:293` bars its own estimate from becoming a literal, and INT-03 mandates computing from
   the registry.
2. Q3.1 does **not** overturn the file map "with zero citation" — Q1.1 cites it, rebuts it, and
   forward-references.
3. The draft's `148-CONTEXT.md` "touch 4 of 4" citation is **correct** (Referee overturned both the Finder
   and the Adversary).
4. The overview-as-hub precedent is **not** self-defeating — the zero-links ruling is scoped to
   non-existent Phase-150 targets only; four other outbound links are mandated.
5. SEMM silence is **compliance**, not omission — it is a milestone-level deferral in
   `## Future Requirements`.
6. `WINGET-GAP` §5's link-not-copy guardrail **does** reach a Microsoft reference page — `148-CONTEXT.md:368`
   applied it to exactly that class.
7. "Not in the registry" and the Phase-152 registry hand-off are a **sequence**, not a contradiction.
8. Missing `<code_context>` / `<specifics>` / `<deferred>` is a **category error** — the grill draft
   declares at its head that it is not the CONTEXT.md.
