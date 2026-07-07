# Requirements: Windows Autopilot & macOS Provisioning Documentation Suite — Milestone v1.16

**Defined:** 2026-07-07
**Milestone:** v1.16 — EEE SOP Documentation-Standard Retrofit (Phase-2) + Pipeline/Structural Shelf-Clearing
**Core Value:** IT teams can independently provision, troubleshoot, and manage Windows, macOS, iOS/iPadOS, Android, and Linux devices through Microsoft Intune / Entra ID without escalating to engineering — and find those answers as clean, correctly-cited results in the Copilot Studio / SharePoint knowledge base.
**Research basis:** None (envelope/structural milestone — no new domain). Scope is fully derived from the v1.15 EEE standard (`docs/_standards/EEE-SOP-standard.md`), the C17 contract (`scripts/validation/c17-eee-contract.mjs`), and the v1.15 deferred backlog (`.planning/milestones/v1.15-DEFERRED-CLEANUP.md`). PIPE-02 empirical findings (citation-title = filename; Draft = label not gate; custom-property promotion) carry forward from Phase 113/119.
**Gray-area picks:** deferred to `/gsd-discuss-phase` + `/adversarial-review` per project convention — see **Discuss-Phase Flags** below. The **Mermaid-vs-C17-#1 collision** (no key info in code-fenced diagrams → text-equivalent conversion) is the dominant design gray area and is NOT resolved at roadmap.
**Shelf scope (owner-confirmed 2026-07-07):** Part A v1.16-routed items + cheap hygiene. Trigger-gated / net-new-architecture items and durable tooling debt are deferred forward again (see Future / Out of Scope).

---

## Milestone v1.16 Requirements

Requirements for this milestone. Each maps to exactly one roadmap phase (phases 120+). REQ-IDs continue project-wide conventions; numbering continues within each category prefix (RETRO / STD / PIPE / HARN carry on from v1.15; HYG is new). **Phase-2 retrofit scope = the remaining structural doc classes: glossaries + decision-trees + orphan nav-hubs + lifecycle + carved-mermaid + end-user guides.** Phase-1 classes (runbooks / admin-setup / references) were completed in v1.15 and are now V115-frozen.

### Category: Structural Doc-Class Retrofit — Phase-2 (RETRO, continues v1.15 RETRO-01/02/03)

*The hero cluster: extend the EEE header block + `## Summary`-first (D3-A) + RE-NNN registry IDs to the remaining structural classes, each gated green by C17. Retrofit-only (reformat, not re-review); already-live docs → `Status: Approved`; `Last Reviewed` carries existing `last_verified` verbatim + a one-time "v1.16 EEE reformat — content not re-reviewed" Version-History row (the v1.15 D2/META-04 rule).*

- [ ] **RETRO-04**: All **glossary docs** (`docs/_glossary-*.md`) are retrofitted to EEE — header block + `## Summary`-first + normalized Platform label — and C17 exits 0 on every glossary file before phase close. The term-surface shape (definition lists / anchor slugs) is preserved; existing plain-GitHub anchor slugs are not broken.
- [ ] **RETRO-05**: All **decision-tree docs** (`docs/decision-trees/*`) are retrofitted to EEE, with their Mermaid diagrams resolved per the **Mermaid-vs-C17-#1 decision** (STD-04) — either converted to a C17-compliant text-equivalent (table / structured list) preserving every decision leaf, or handled per the permitted form the decision defines; C17 exits 0 on every decision-tree file.
- [ ] **RETRO-06**: All **orphan nav-hubs** (`docs/index.md`, `docs/common-issues.md`, `docs/quick-ref-l1.md`, `docs/quick-ref-l2.md`) are retrofitted to EEE with **navigation-last discipline** (nav-hub edits committed after the content they reference); C17 exits 0 on every nav-hub file. Routing/link tables remain accurate.
- [ ] **RETRO-07**: All **lifecycle docs** are retrofitted to EEE (header block + Summary-first + normalized Platform label + `Status: Approved`); C17 exits 0 on every lifecycle file.
- [ ] **RETRO-08**: The **carved-mermaid files** deferred from v1.15 — RE-128 (`linux` overview), RE-147 (`ca-enrollment-timing.md`, kept keyless/Pending in Phase 118), and the 9 Phase-117 admin-setup mermaid carve-outs — are retrofitted to EEE with their Mermaid resolved per STD-04; each moves from Pending/keyless to `Status: Approved` in the registry; C17 exits 0 on all of them.
- [ ] **RETRO-09**: The **end-user Guides** (RE-175, RE-176) are retrofitted to EEE (header block + Summary-first + correct `doc_type`); C17 exits 0 on both.

### Category: EEE Standard Extension — Mermaid/C17 Policy (STD, continues v1.15 STD-01/02/03)

- [x] **STD-04**: The canonical **EEE SOP standard** and the **C17 contract** are extended with the resolved **Mermaid-in-enrolled-classes policy** — the decision (text-equivalent conversion vs. a defined permitted form) is set at discuss-phase via `/adversarial-review`; C17 assertion #1 (currently a hard-fail on top-level ```mermaid) is updated to match (either retained hard-fail with all enrolled diagrams converted, or a documented carve-out), with the standard doc stating the rule and rationale. Any newly-enrolled structural Doc Types (glossary / decision-tree / nav-hub / lifecycle / end-user guide) are added to the standard's Doc Type taxonomy.

### Category: Conversion Pipeline & Filename (PIPE, continues v1.15 PIPE-01/02)

- [ ] **PIPE-03**: The **pandoc YAML-metadata alias conversion defect** (`DEFER-119-C`) is fixed — retrofitted docs whose nav-footer is the italic `*Previous:` / `*Next step:` `---`…`---` shape convert clean through the locked pipeline (`scripts/pipeline/convert.ps1`, exit 0, no `Unknown alias` error) — **without regressing** the top-of-file frontmatter → Word custom-property promotion that OQ4 depends on (both paths regression-tested). Approach (canonical invocation fix vs. corpus-wide nav-footer normalization) resolved at discuss-phase.
- [ ] **PIPE-04**: A **descriptive-filename normalization pass** (`V1.16-DESCRIPTIVE-FILENAME-PASS`, PIPE-02 OQ1) is defined and applied — a rename map + pipeline output-name wiring + RE-registry sync — so Copilot Studio citation titles (which derive from the SharePoint `.docx` filename, not the H1) read descriptively (e.g. `01-device-not-registered` rather than `RE-001`); the RE-NNN ↔ file mapping stays intact in the registry.
- [ ] **PIPE-05**: A **true Draft-label grounding probe** (`PIPE-02-DRAFT-LABEL-PROBE`, owner-run) is executed — mutate BOTH the frontmatter `status:` AND the visible `**Status:**` header-block text of an uploaded test artifact, then confirm the literal **Draft** label renders and is queryable in Copilot Studio (v1.15's Option-A probe exercised only the frontmatter leg). *(Discuss-flag: agent-run vs owner-run if the harness lacks live Copilot Studio access.)*

### Category: Harness Hygiene (HYG, new)

- [x] **HYG-01**: The **stale header comment** at `scripts/validation/_lib/frozen-at-close.mjs:5-9` (`STALE-FROZEN-AT-CLOSE-HEADER-01`) is corrected — it still asserts helpers "REMAIN INLINE" across `check-phase-{61,67,68,70}`, factually false since v1.14 Phase 111 centralized them. Single-comment fix, no functional change.

### Category: Frozen-Surface Pin & Milestone Close (HARN, continues v1.15 HARN-01..04)

- [ ] **HARN-05**: The **V115 back-anchor pin** is added — `scripts/validation/_lib/frozen-at-close.mjs` gains a `V115: '<v1.15 close-gate SHA>'` entry + `readAtV115Close` export (recover the SHA via `git log --all --grep="MILESTONE-AUDIT" --grep="MILESTONE CLOSE" --all-match -1 --format=%H`), following the V18..V114 single-entry pattern. This **freezes the v1.15 corpus** — the mandatory back-anchor invariant that the v1.15 close deliberately left to its successor (`V115-PIN-DEFERRAL`).
- [ ] **HARN-06**: The **14th Path-A audit-harness lineage bump** — `v1.16-milestone-audit.mjs` (Path-A from v1.15, C1–C17 inherited) + `v1.16-audit-allowlist.json` + BASELINE_20 + `check-phase-120..NN.mjs` per-phase validators (chain-apex `CHAIN_PHASES=[48..119]`, continuing the `[48..N-1]` invariant) + the 13th parallel CI coexistence workflow (`audit-harness-v1.16-integrity.yml`). Predecessor v1.4–v1.15 frozen surfaces remain **byte-unchanged**; any predecessor content-assertion validator that reads a now-retrofitted structural doc at live HEAD is converted frozen-aware (`readAtV115Close`) as in-scope close-gate remediation — NO value-masking, NO frozen-surface edit, `CHAIN_SKIP` empty.
- [ ] **HARN-07**: The milestone closes via a **3-axis terminal re-audit** (fresh `git clone --no-hardlinks` + cross-OS Linux GHA authoritative for both chain validators per the D-03 OS split + fresh zero-context sub-agent; cross-OS PASS/FAIL/SKIP **EXACT MATCH**) **plus a PIPE-02 grounding-validation confirmation** on the retrofitted structural corpus, in a single close-gate commit flipping all v1.16 requirements to Validated across PROJECT / ROADMAP / STATE / REQUIREMENTS.

---

## Discuss-Phase Flags (resolve per-phase via `/adversarial-review`, NOT at roadmap)

Gray-area scoping decisions deferred to `/gsd-discuss-phase` per project convention:

1. **Mermaid-vs-C17-#1 resolution (dominant)** — text-equivalent conversion of every enrolled Mermaid diagram (table/structured list, leaf-count preserved — the v1.15 RE-068 precedent) vs. a documented C17 carve-out permitting a constrained Mermaid form. Drives STD-04, RETRO-05, RETRO-08. Via `/adversarial-review`.
2. **Structural retrofit phase granularity** — whether glossaries / decision-trees / nav-hubs / lifecycle / carved-mermaid / end-user guides split into separate phases or batch by risk (mirrors v1.15's RETRO granularity flag).
3. **Nav-hub EEE application** — nav-hubs (`index`, `common-issues`, `quick-ref-l1/l2`) are indexes, not operator runbooks: how the header block + `## Summary` applies to an index/quick-ref page, and the correct Doc Type (Reference vs. a new nav Doc Type). Navigation-last ordering preserved.
4. **Pandoc alias fix approach (PIPE-03)** — canonical invocation fix (`--from=markdown-yaml_metadata_block`, regression-tested against OQ4 custom-property promotion — one pipeline edit) vs. corpus-wide nav-footer normalization (touches many now-frozen content docs). Trade-off: pipeline-surface edit vs. content-surface churn.
5. **Descriptive-filename scheme (PIPE-04)** — naming convention (descriptive slug as filename; RE-NNN retained in the registry only), rename-map source of truth, registry-sync mechanism, and whether to rename in-milestone vs. at bulk-upload time.
6. **Predecessor chain-health before close (process lesson, reaffirmed)** — the structural retrofit edits glossary / nav-hub content that predecessor content-assertion validators read at live HEAD (`LATENT-NON-FROZEN-AWARE-CONTENT-ASSERTION-01`). Run the FULL predecessor chain BEFORE authoring the close-gate (not just the two immediate apexes) so every drift is caught and converted frozen-aware — scope which validators need conversion at plan time, not at the close.
7. **Doc Type for structural classes** — glossary / decision-tree / nav-hub / lifecycle / end-user guide: which map to the existing taxonomy (Reference / Guide) vs. warrant a new Doc Type in the EEE standard (STD-04); affects C17 + registry `doc_type` assignment.

---

## Future Requirements (deferred beyond v1.16)

*Carried from `.planning/milestones/v1.15-DEFERRED-CLEANUP.md`; not folded into this envelope milestone per owner scope confirmation.*

- **Durable tooling debt** — the O(n²) chain-runner subprocess-caching rewrite (`O(n²)-CHAIN-RUNNER-REMEDIATION-01`, the durable fix for `WINDOWS-CLONE-DEEPNEST-TIMEOUT-01`, increasingly attractive as the chain deepens past [48..119]) + the broad frozen-aware adoption sweep (`FROZEN-AWARE-ADOPTION-SWEEP-01` residual / `LATENT-NON-FROZEN-AWARE-CONTENT-ASSERTION-01` cohort beyond in-scope close-gate remediation). Deferred to a v1.17+ chain-validator retrospective.
- **`regenerate-supervision-pins.mjs --self-test` frozen-aware classifier** (`DEFER-119-A`) — accepted advisory-RED; convert to `readAtClose` only if it becomes operationally noisy.
- **Deployment — SharePoint content-approval** — if `Status: Draft` must actually gate retrieval (not just label), enabling + maintaining SharePoint content approval on the indexed library (tenant/ops config, pairs with PIPE-05).
- **Infra — Azure AI Search structured index** — upgrade from the native SharePoint knowledge source to an Azure AI Search + SharePoint indexer to make `platform`/`doc_type` filterable metadata.

## Out of Scope (explicit exclusions)

- **Content re-review / accuracy edits** — v1.16 is a reformat-only envelope change; `last_verified` is carried verbatim and no technical content is re-verified.
- **New documentation content** — no new runbooks, guides, platforms, or features; this milestone only reshapes existing structural docs and the pipeline/registry around them.
- **The grounded library / Copilot Studio agent configuration itself** — building/tuning the Copilot agent, SharePoint library provisioning, and content-approval setup are downstream deployment concerns.
- **Trigger-gated / net-new-architecture backlog** — CI-3 (Managed Apple ID → Managed Apple Account rename, gated on Microsoft portal-side adoption — doc↔portal term-mismatch hazard), MTPSSO-01/02/03 + PSSO-FUT-03, KRBFUT-01/02, Apple School Manager (ASM), Apple Business Device API, per-OU Conference Room Display, Account Holder lockout runbook, AOSP-wired 802.1X + Cloud PKI deep-dive — remain in `.planning/milestones/v1.15-DEFERRED-CLEANUP.md`; folding them would balloon scope / break the single-milestone convention.
- **Broad tooling-debt refactor** — the durable O(n²) chain-runner rewrite and broad frozen-aware sweep are explicitly NOT in v1.16 (owner chose Part A + cheap hygiene); only per-file frozen-aware conversions triggered by the structural retrofit are in-scope close-gate remediation.

---

## Traceability

REQ-ID → Phase mapping, assigned by the roadmapper 2026-07-07 (6 phases, 120-125).

| REQ-ID | Phase | Status |
|--------|-------|--------|
| RETRO-04 | Phase 121 | Pending |
| RETRO-05 | Phase 122 | Pending |
| RETRO-06 | Phase 123 | Pending |
| RETRO-07 | Phase 121 | Pending |
| RETRO-08 | Phase 122 | Pending |
| RETRO-09 | Phase 121 | Pending |
| STD-04 | Phase 120 | Complete |
| PIPE-03 | Phase 124 | Pending |
| PIPE-04 | Phase 124 | Pending |
| PIPE-05 | Phase 124 | Pending |
| HYG-01 | Phase 120 | Complete |
| HARN-05 | Phase 125 | Pending |
| HARN-06 | Phase 125 | Pending |
| HARN-07 | Phase 125 | Pending |

**Coverage:**
- v1.16 requirements: 14 total
- Mapped to phases: 14
- Unmapped: 0 ✓

---
*Requirements defined: 2026-07-07*
*Last updated: 2026-07-07 after roadmap creation (milestone v1.16 — 6 phases, 120-125; 14/14 requirements mapped, 100% coverage)*
