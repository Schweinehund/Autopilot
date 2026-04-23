# Phase 39: Zero-Touch Enrollment + AOSP Stub - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered and the adversarial-review scoring.

**Date:** 2026-04-23
**Phase:** 39 — zero-touch-enrollment-aosp-stub
**Method:** Adversarial review (finder → adversary → referee) scored pattern — same pattern used in Phase 35 and Phase 38
**Areas discussed:** 4 gray areas (ZTE extension structural placement + device-claim depth; AOSP OEM matrix shape and depth; AOSP scope-guard enforcement mechanism; Phase 39 PLAN structure)
**User directive:** "For each choice in each of the areas, use /adversarial-review to recommend the best one and provide your reasoning."

---

## Adversarial Review Method

Three agents spawned sequentially, each with opposing incentives:

| Agent | Incentive | Output |
|-------|-----------|--------|
| **Finder** | +1 LOW / +5 MED / +10 CRIT per flaw found | 80 flaws raised across 16 candidates |
| **Adversary** | +score per flaw disproved; -2× score per wrong disprove | 7 flaws disproved, 73 confirmed |
| **Referee** | +1 per correct ruling, -1 per incorrect | All 7 disputed flaws ruled FALSE POSITIVE |

Winners selected on lowest-real-flaw basis: lowest CRIT count first, then lowest weighted total (5×CRIT + 2×MED + 1×LOW).

Per-gray-area winners: **1A / 2B / 3B / 4B**.

---

## Gray Area 1 (GA1) — ZTE Extension Structural Placement + Device-Claim Workflow Depth

**Decision scope:** How do Phase 39's 6 content pieces (reseller-upload handoff, device-claim workflow, profile assignment, dual-SIM IMEI 1, full KME/ZT callout at device-claim, configuration-must-be-assigned) slot into Phase 35's existing `02-zero-touch-portal.md` H2 structure? AND how much portal-UI detail for the device-claim workflow given ZT portal redesigns frequently (STATE.md research flag)?

### Candidates Presented

| Candidate | Description | Device-Claim Depth |
|-----------|-------------|--------------------|
| **1A** | Single appended H2 block `## Zero-Touch Enrollment at Scale` at position 7 (after KME/ZT Mutual Exclusion, before Verification). 6 H3 sub-sections under the H2. Update Verification append-only. | Decision-points-as-prose + Google canonical link + HTML-comment verify-UI pattern |
| **1B** | Interleaved H2s inserted at natural touch-points: `## Reseller-Upload Handoff` before Step 0; `## Device Claim Workflow` after Link ZT to Intune; dual-SIM as inline inside Method B; config-must-be-assigned as inline inside DPC Extras JSON; KME/ZT H3 appended inside existing KME/ZT Mutual Exclusion H2 | Decision-points-only + Google canonical link |
| **1C** | Same H2 structure as 1A (single appended block) BUT device-claim workflow has full screen-by-screen walkthrough including breadcrumb paths, button labels, dialog sequences; `<!-- verify UI -->` + MEDIUM-confidence markers on every portal-step | Screen-by-screen |
| **1D** | Hybrid: `## Zero-Touch Enrollment at Scale` H2 appended + inline inserts for naturally-adjacent items (dual-SIM inside Method B; full KME callout as blockquote inside Device Claim Workflow H3 without own anchor) | Decision-points-as-prose + Google canonical link |

### Finder → Adversary → Referee Scoring

| Candidate | Finder CRIT | Finder MED | Finder LOW | After Referee CRIT | After Referee MED | After Referee LOW | Weighted |
|-----------|-------------|------------|------------|--------------------|--------------------|---------------------|----------|
| **1A** ✓ | 1 | 3 | 2 | 0 | 2 | 2 | **6** |
| 1B | 3 | 3 | 1 | 3 | 3 | 1 | 22 |
| 1C | 3 | 3 | 1 | 3 | 2 | 1 | 20 |
| 1D | 3 | 2 | 1 | 3 | 1 | 1 | 18 |

### Key Flaws Per Candidate

**1A** (WINNER):
- F-1A-01 [CRIT → FALSE POSITIVE] — "Sub-anchor `#kme-zt-device-claim` not in Phase 35 D-23 reserved anchor list." Disproved: D-23 lists the four primary anchors Phase 39 will APPEND; D-22 content inventory authorizes additional sub-anchors. H3 sub-anchors under Phase 39 H2s don't collide with Phase 35's namespace.
- F-1A-02 [MED confirmed] — "Zero-Touch Enrollment at Scale" is redundant with file title. **Closed by D-02** (rename to "Corporate-Scale Operations").
- F-1A-03 [MED confirmed] — "Configuration Must Be Assigned" belongs adjacent to DPC Extras JSON H2 per PITFALL 2. **Closed by D-03** (cross-link from H3 back to Phase 35 `#dpc-extras-json` at natural decision point).
- F-1A-04 [MED → FALSE POSITIVE] — "HTML-comment conflation with Phase 34 D-17." Disproved: `<!-- verify UI at execute time -->` already in shipped file lines 48/50/72/73 — established pattern, syntactically distinct from D-17 subtractive-deletion.
- F-1A-05 [LOW confirmed] — Verification "append" is actually placeholder update.
- F-1A-06 [LOW confirmed] — Dual-SIM source-confidence marker placement unspecified. **Closed by D-05**.

**1B** (rejected — 3 CRIT):
- F-1B-01 [CRIT confirmed] — Inserting `## Reseller-Upload Handoff` before Step 0 pushes Step 0 to third position; violates AEPREQ-04 SC4 "starts at Step 0".
- F-1B-02 [CRIT confirmed] — Inline inserts INSIDE Phase 35 H2s violate Phase 35 D-22 append-only contract.
- F-1B-03 [CRIT confirmed] — Adjacent reseller H2s create Anti-Pattern 1 dual-source-of-truth.

**1C** (rejected — 3 CRIT):
- F-1C-01 [CRIT confirmed] — Screen-by-screen violates STATE.md research flag "Zero-Touch portal has history of redesigns". Execute-time re-verify is one-time; doc remains stale mid-cycle.
- F-1C-02 [CRIT confirmed] — Duplicates Google's canonical ZT customer-portal help. STACK.md line 275-277 SPARSE DOC FLAG says "link to Google's reseller guide" — opposite direction.
- F-1C-03 [CRIT confirmed] — MEDIUM markers on every portal-step dilutes Phase 37 D-10/D-11 marker semantics.

**1D** (rejected — 3 CRIT):
- F-1D-01 [CRIT confirmed] — Inline insert inside Phase 35's Link-to-Intune Method B violates D-22 append contract.
- F-1D-02 [CRIT confirmed] — Bifurcated dual-SIM content (inline callout + in-block one-liner) creates Anti-Pattern 1 dual-source.
- F-1D-03 [CRIT confirmed] — Full KME/ZT at device-claim without own stable anchor breaks Phase 40 consumer-anchor contract.

### User's Choice (from adversarial review)

**1A — Single appended H2 block + decision-points-only depth** (weighted 6, 0 CRIT).

### Rationale

Preserves Phase 35's locked H2 order 1-6 and 8+ intact (D-22 append-only discipline). Aligns with STATE.md research-flag discipline for portal-UI staleness. Leverages the verify-UI-at-execute-time HTML-comment pattern that ships verbatim in the target file (Phase 34 D-17 subtractive pattern is a different semantic class — Referee confirmed). Publishes clean Phase 39 anchor namespace under one container.

---

## Gray Area 2 (GA2) — AOSP OEM Matrix Shape and Depth

**Decision scope:** How does the OEM matrix render in `docs/admin-setup-android/06-aosp-stub.md` given that only RealWear is verifiably GA (per research 2025-05-12) and other OEMs have sparse public docs with high staleness risk?

### Candidates Presented

| Candidate | Description |
|-----------|-------------|
| **2A** | Full 5-column table (OEM / Device models / Device type / GA status / Notes) — all OEMs enumerated with explicit GA/not-verified markers; canonical source for AOSP device coverage |
| **2B** | RealWear-spotlight H3 with detailed prose (HMT-1/1Z1/Navigator 500, Wi-Fi credential embedding) + other-OEMs as short bulleted list with `(see MS Learn for current status)` disclaimer |
| **2C** | MS Learn reference + 1-paragraph summary inside `## When to use AOSP` H2 — no table at all |
| **2D** | 2-column table (OEM / GA status) + separate callout blockquotes for RealWear Wi-Fi requirement, QR-only, one-device-at-a-time |

### Finder → Adversary → Referee Scoring

| Candidate | Finder CRIT | Finder MED | Finder LOW | After Referee CRIT | After Referee MED | After Referee LOW | Weighted |
|-----------|-------------|------------|------------|--------------------|--------------------|---------------------|----------|
| 2A | 3 | 2 | 1 | 2 | 2 | 1 | 15 |
| **2B** ✓ | 1 | 3 | 1 | 1 | 3 | 1 | **12** |
| 2C | 2 | 3 | 1 | 2 | 3 | 1 | 17 |
| 2D | 2 | 3 | 1 | 2 | 2 | 1 | 15 |

### Key Flaws Per Candidate

**2A** (rejected — 2 CRIT after ruling):
- F-2A-01 [CRIT confirmed] — OEM list omits DigiLens, Lenovo, Vuzix (MS Learn actually lists 8 OEMs). Factual error; fails AEAOSP-01 SC3.
- F-2A-02 [CRIT confirmed] — PITFALL 7 mandates "not supported under AOSP" framing; 2A's populated GA-status column contradicts it.
- F-2A-03 [CRIT → FALSE POSITIVE] — "Canonical matrix contradicts Anti-Pattern 1." Disproved: AOSP has no upstream canonical matrix; Phase 34 `02-provisioning-methods.md` defers AOSP detail to Phase 39; stub IS the canonical host per AEAOSP-01 SC3.

**2B** (WINNER):
- F-2B-01 [CRIT confirmed] — Bulleted list also omits DigiLens, Lenovo, Vuzix. **Closed by D-09** (complete enumeration required).
- F-2B-02 [MED confirmed] — Disclaimer "consult MS Learn" is a punt; doesn't encode PITFALL 7 mandate. **Closed by D-10** (explicit "not supported under AOSP" framing required).
- F-2B-03 [MED confirmed] — Deferred-content placement unclear. **Closed by D-12** (separate `## Deferred Content` H2).
- F-2B-04 [MED confirmed] — Self-defeating "MS Learn authoritative and updated more frequently" framing.
- F-2B-05 [LOW confirmed] — Per-OEM H3 pattern invites scope creep.

**2C** (rejected — 2 CRIT):
- F-2C-01 [CRIT confirmed] — Paragraph omits 3 OEMs.
- F-2C-02 [CRIT confirmed] — "No table at all" directly contradicts AEAOSP-01 SC3 "OEM matrix from MS Learn with RealWear confirmed GA" literal wording.

**2D** (rejected — 2 CRIT after ruling):
- F-2D-01 [CRIT confirmed] — 5-row list omits 3 OEMs.
- F-2D-02 [CRIT confirmed] — "See MS Learn for current status" is mass-punt; refuses PITFALL 7 mandate.
- F-2D-05 [MED → FALSE POSITIVE] — "QR-only over-specifies no-DPC-identifier." Disproved: STACK.md line 124 verbatim says "No NFC, no Zero-Touch, no token/DPC identifier" — callout is direct restatement.

### User's Choice (from adversarial review)

**2B — RealWear-spotlight H3 + enumerate-all-MS-Learn-OEMs bulleted list + PITFALL-7-mandated framing + separate Deferred Content H2** (weighted 12, 1 CRIT shared with all GA2 candidates).

### Rationale

Aligns RealWear-GA content density with research confidence: RealWear is HIGH confidence (GA confirmed); other OEMs are lower confidence and PITFALL 7 framing routes admins to Android Enterprise fully managed. 2A over-commits beyond verified data (forces GA-status claims per OEM); 2C under-satisfies SC3's "matrix" literal; 2D fragments related information across table + three stacked warnings.

---

## Gray Area 3 (GA3) — AOSP Stub Scope-Guard Enforcement Mechanism

**Decision scope:** AEAOSP-01 SC4 requires the AOSP stub to pass a "word-count / section-count scope-guard audit — stub size is bounded." AEAUDIT-04 runs this audit in Phase 42. What is the concrete, measurable, mechanical bound?

### Candidates Presented

| Candidate | Mechanism |
|-----------|-----------|
| **3A** | Hard word count ceiling ≤ 800 words (body only, excluding frontmatter + See Also + Changelog) |
| **3B** | Fixed section whitelist: exactly 9 H2 sections in a locked order; audit greps H2 headings |
| **3C** | Both word count ≤ 1000 words AND H2 whitelist (belt + suspenders) |
| **3D** | Relative-size bound: stub ≤ 50% of smallest sibling admin guide |

### Finder → Adversary → Referee Scoring

| Candidate | CRIT | MED | LOW | Weighted |
|-----------|------|-----|-----|----------|
| 3A | 2 | 2 | 1 | 15 |
| **3B** ✓ | 2 | 2 | 1 | **15** |
| 3C | 2 | 2 | 1 | 15 |
| 3D | 3 | 2 | 1 | 20 |

Three-way weighted tie at 15 (3A / 3B / 3C). Referee chose 3B on mechanical-enforceability and precedent-alignment with Phase 37 D-12 / Phase 38 D-06 doc-shape-lock pattern.

### Key Flaws Per Candidate

**3A** (rejected — mechanical brokenness):
- F-3A-01 [CRIT confirmed] — `sed -n '/^---$/,/^---$/!p'` is broken (prints everything outside `---`…`---` ranges; fails on mid-doc horizontal rules); awk pipe chain is fragile.
- F-3A-02 [CRIT confirmed] — "≤800 words" arbitrary; no research basis.

**3B** (WINNER):
- F-3B-01 [CRIT confirmed] — H2-name audit cannot enforce Wi-Fi credential content. **Closed by D-13** (explicit content requirement in CONTEXT.md, enforced at plan-task-specs level, not audit-regex).
- F-3B-02 [CRIT confirmed] — "Deferred Content (v1.4.1)" version-specific H2 self-stales. **Closed by D-12** (H2 name without version suffix; v1.4.1 target goes in the table rows, not the H2 name).
- F-3B-03 [MED confirmed] — No length check; 5000-word stub with 9 H2s passes.
- F-3B-04 [MED confirmed] — H2 ordering inconsistent with other admin guides (reader muscle memory).
- F-3B-05 [MED confirmed] — Audit script is pseudocode.
- F-3B-06 [LOW confirmed] — Premature structural lock on unverified research (Intune Plan 2/Suite). **Closed by D-14**.

**3C** (rejected — inherits 3A + 3B flaws):
- F-3C-01 [CRIT confirmed] — Both belt and suspenders broken.
- F-3C-02 [CRIT confirmed] — 1000 words loosens vs PITFALL 12 "≤2 pages".

**3D** (rejected — 3 CRIT):
- F-3D-01 [CRIT confirmed] — Couples audit to unrelated-sibling-file drift.
- F-3D-02 [CRIT confirmed] — Shell mechanics broken on Windows (sort -n non-portable; bc not default-installed).
- F-3D-03 [CRIT confirmed] — No section whitelist; does not enforce PITFALL 12 structural guard.

### User's Choice (from adversarial review)

**3B — Fixed H2 section whitelist (9 sections, no version suffix)** (weighted 15, 2 CRIT closed by D-12 and D-13).

### Rationale

Mirrors Phase 37 D-12 / Phase 38 D-06 doc-shape-lock precedent — structural enforcement is the established v1.4 pattern. D-12 resolves F-3B-02 CRIT (H2 name "Deferred Content" without version suffix). D-13 resolves F-3B-01 CRIT (Wi-Fi content requirement enforced at plan-task-specs level, moving enforcement responsibility to the plan-phase agent). 3A's word-count-only bound is bypassable by dense prose; 3C's belt+suspenders compounds mechanical brokenness; 3D's relative-size bound couples to sibling drift.

---

## Gray Area 4 (GA4) — Phase 39 PLAN Structure

**Decision scope:** ROADMAP Phase 39 says "Runs in parallel with Phases 36-38 (independent after Phase 35)." Phase 39 has two independent deliverables. How are PLAN files structured?

Precedent: Phase 36 (1 doc) = 1 plan with 3 waves; Phase 37 (2 docs) = 2 plans; Phase 38 (1 doc) = 1 plan with 3 waves.

### Candidates Presented

| Candidate | Plan Count | Parallelism |
|-----------|-----------|-------------|
| **4A** | ONE plan covering both artifacts | Sequential (executor picks order) |
| **4B** | TWO plans (39-01 ZTE + 39-02 AOSP) | Parallelizable within phase |
| **4C** | TWO plans, sequential (39-02 blocks on 39-01) | None |
| **4D** | ONE plan with W1a/W1b sub-waves | Parallel via sub-waves |

### Finder → Adversary → Referee Scoring

| Candidate | CRIT | MED | LOW | Weighted |
|-----------|------|-----|-----|----------|
| 4A | 1 | 3 | 1 | 12 |
| **4B** ✓ | 0 | 2 | 2 | **6** |
| 4C | 1 | 2 | 2 | 11 |
| 4D | 1 | 3 | 1 | 12 |

### Key Flaws Per Candidate

**4A** (rejected — 1 CRIT):
- F-4A-01 [CRIT confirmed] — Contradicts Phase 37 precedent "2 plans, one per doc" for multi-doc phases. Phase 39 has docs across DIFFERENT modes (ZTE GMS vs AOSP non-GMS); mode-mismatch stronger than Phase 37's same-mode split.
- F-4A-04 [MED confirmed] — "Atomic delivery" sequentializes work ROADMAP explicitly allows parallel.

**4B** (WINNER):
- F-4B-01 [MED confirmed] — Concurrency-safety of simultaneous W0 checks on shared Phase 34/35 anchors unspecified.
- F-4B-02 [MED → FALSE POSITIVE] — "Atomic rollback misleading; Phase 39 incomplete." Disproved: Phase 39's atomic delivery is at phase boundary, not plan boundary; Phase 37 precedent established plan-level as natural atomic boundary.
- F-4B-03 [MED confirmed] — Phase 40 ZTE L1 runbook 27 dependency handling unspecified.
- F-4B-04 [LOW confirmed] — 39-01/39-02 numbering implies order.
- F-4B-05 [LOW confirmed] — Shared research-flag verification effort may duplicate.

**4C** (rejected — 1 CRIT):
- F-4C-01 [CRIT confirmed] — ROADMAP Phase 39 line 173 explicitly "independent after Phase 35" + STATE.md v1.4 decision "Parallelizable during execution." 4C manufactures sequential dependency.

**4D** (rejected — 1 CRIT):
- F-4D-01 [CRIT confirmed] — Departs from Phase 37 precedent without commensurate benefit; introduces convention churn.
- F-4D-02 [MED confirmed] — W1a/W1b wave-lettering is novel syntax.

### User's Choice (from adversarial review)

**4B — TWO plans parallelizable within phase (39-01 ZTE + 39-02 AOSP)** (weighted 6, 0 CRIT).

### Rationale

Matches Phase 37 precedent exactly (37-01 + 37-02 = two plans for two docs in same milestone). ROADMAP line 173 "Runs in parallel with Phases 36-38 (independent after Phase 35)" combined with STATE.md v1.4 decision "Parallelizable during execution" locks parallelism intent. Plan-level rollback granularity is the correct atomic unit per v1.4 established practice (Referee-confirmed in F-4B-02 ruling). F-4B-02's disproved framing ("better rollback is a genuine benefit that Finder mischaracterized") confirms 4B's structural correctness.

---

## Adversarial Review — Final Score Summary

| Agent | Gain | Risk | Net Delta |
|-------|------|------|-----------|
| Finder | 461 points raised | N/A | N/A |
| Adversary | +45 (disproved: 2 CRIT + 5 MED) | -90 (if all wrong) | +45 (all 7 ruled correct) |
| Referee | +7 (7 disputed flaws ruled correctly) | 0 | +7 |

**Disputed flaws ruled FALSE POSITIVE:** F-1A-01 (CRIT), F-1A-04 (MED), F-1C-04 (MED), F-1D-04 (MED), F-2A-03 (CRIT), F-2D-05 (MED), F-4B-02 (MED).

**Confirmed flaws:** 73 of 80 = 91.3% confirmation rate.

---

## Cross-cutting Decisions (captured in CONTEXT.md)

Beyond per-area winners, adversarial review surfaced 19 cross-cutting decisions (D-01..D-23 in CONTEXT.md §Implementation Decisions) covering:

- H2 title rename ("Corporate-Scale Operations" not "Zero-Touch Enrollment at Scale") to close F-1A-02 MED
- Cross-link resolution for PITFALL 2 point-of-admin-decision on `### Configuration Must Be Assigned` H3 to close F-1A-03 MED
- Device-claim workflow source-strategy (STACK.md SPARSE DOC FLAG discipline) to close F-1C-01/02/03 CRITs
- Dual-SIM IMEI 1 source-confidence marker placement to close F-1A-06 LOW
- Full KME/ZT callout at device-claim scope discipline to close F-1D-05 concern
- Complete MS Learn 8-OEM enumeration to close F-2A-01/F-2B-01/F-2C-01/F-2D-01 shared CRIT
- PITFALL-7-mandated "not supported under AOSP" framing to close F-2B-02/F-2C-05/F-2D-02 concerns
- H2 name without version suffix (`## Deferred Content`) to close F-3B-02 CRIT
- Wi-Fi credential embedding explicit content requirement to close F-3B-01 CRIT
- Intune Plan 2 / Suite research-flag re-verification protocol to close F-3B-06 LOW
- Frontmatter schema (single-string applies_to)
- Anchor stability contract for Phase 40/41/42 consumers (9 anchors locked)
- Shared-file modification guard (PITFALL 9 / PITFALL 11 / AEAUDIT-04)
- 3-wave plan structure matching Phase 36/37/38 precedent
- Source-confidence marker regex matching Phase 37 D-11 verbatim
- ARCH Q6 Platform note banner for AOSP stub (Phase 38 D-10 inheritance)
- Research-flag verification protocol (6 flags enumerated)
- Executor parallelization discipline

---

## Claude's Discretion (captured in CONTEXT.md)

- Exact word counts within approximate envelope (~600-900 words for AOSP stub; ~600-800 words for appended `## Corporate-Scale Operations` block)
- Exact prose for PITFALL-7-mandated "not supported under AOSP" framing (core assertion locked; prose phrasing is author's)
- Whether to include a small mermaid diagram in ZTE extension (Reseller → Upload → Customer Claim → Configuration Assign → Device First-Boot)
- Deferred-content table column design (4-column "Topic / Current state in v1.4 / Target / Rationale" suggested; 3-column "Topic / Target / Rationale" also works)
- Cross-platform callout presence for non-RealWear OEMs in D-07 other-OEMs H3 (PITFALL 7 framing mandatory; additional per-OEM notes author's discretion)
- See Also section composition (Phase 34/35 cross-links natural; additional links author's)
- Exact cross-link wording from `### Configuration Must Be Assigned` back to `#dpc-extras-json` (cross-link mandatory; phrasing author's)
- Whether `## Verification` Phase 35 section gets new checkbox or just prose update (executor selects minimal-disruption update)

---

## Deferred Ideas (captured in CONTEXT.md §Deferred Ideas)

All deferrals from CONTEXT.md captured there — this log preserves the adversarial-review origin of the deferrals where relevant:

- **Per-OEM AOSP enrollment steps (non-RealWear)** — deferred by D-10 PITFALL-7 framing + explicit Deferred Content table row
- **Knox Mobile Enrollment full admin path** — deferred by D-06 scope-discipline (Phase 35 D-21 + Phase 39 D-06 carries only mutual-exclusion callouts; full KME = v1.4.1)
- **ZTE L1 runbook 27** — deferred to Phase 40 by STATE.md v1.4 decision (Phase 39 publishes consumer-anchor contract for Phase 40)
- **AOSP L1/L2** — deferred to v1.4.1 by explicit scope (PITFALL 12 + ROADMAP Phase 39 SC5)
- **Cross-platform nav integration, reciprocal macOS glossary cross-ref** — Phase 42 / post-v1.4 scope (not Phase 39)

---

*This log is the audit trail of the adversarial review process used to generate CONTEXT.md. It preserves the alternatives considered, the flaws raised and ruled, and the reasoning paths followed. Decisions are canonical only in CONTEXT.md.*
