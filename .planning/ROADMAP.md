# Roadmap: Windows Autopilot & macOS Provisioning Documentation Suite

## Milestones

- ✅ **v1.0 Autopilot Documentation & Troubleshooting Guides** — Phases 1-10 (shipped 2026-04-10)
- ✅ **v1.1 APv2 Documentation & Admin Setup Guides** — Phases 11-19 (shipped 2026-04-13)
- ✅ **v1.2 Cross-Platform Provisioning & Operational Gaps** — Phases 20-25 (shipped 2026-04-15)
- ✅ **v1.3 iOS/iPadOS Provisioning Documentation** — Phases 26-33 (shipped 2026-04-19)
- ✅ **v1.4 Android Enterprise Enrollment Documentation** — Phases 34-42 (shipped 2026-04-24)
- ✅ **v1.4.1 Android Enterprise Completion & v1.4 Cleanup** — Phases 43-47 (shipped 2026-04-25)
- ✅ **v1.5 Linux Platform, Operational Depth & Cross-Platform Cleanup** — Phases 48-61 (shipped 2026-05-07)
- ✅ **v1.6 Apple Business Delegated Governance & Multi-Org Operations** — Phases 62-66 (shipped 2026-05-25)
- ✅ **v1.7 Deferred Backlog Closure + Validator Chain Hardening** — Phases 67-70 (shipped 2026-05-29)
- ✅ **v1.8 Tooling Debt Closure + Chain-Resilience Hardening** — Phases 71-74 (shipped 2026-06-08)
- ✅ **v1.9 macOS Platform SSO & Secure Enclave Authentication Documentation** — Phases 75-82 (shipped 2026-06-22)
- ✅ **v1.10 macOS Platform SSO Follow-ons — Kerberos, Graph API & NUAL** — Phases 83-88 (shipped 2026-06-24)
- ✅ **v1.11 macOS PSSO End-to-End Provisioning & MDM Migration** — Phases 89-93 (shipped 2026-06-26)
- ✅ **v1.12 macOS MDM-Migration Verification Closure** — Phases 94-95 (shipped 2026-06-26)
- ✅ **v1.13 macOS Platform SSO Admin-Setup Documentation Accuracy & Depth** — Phases 96-100 (shipped 2026-06-29)
- ✅ **v1.14 802.1X Network Authentication Documentation + Backlog & Tooling Closure** — Phases 101-112 (shipped 2026-07-02)
- 🔄 **v1.15 EEE SOP Documentation-Standard Retrofit (Phase-1)** — Phases 113-119 (in progress)

## Phases

<details>
<summary>✅ v1.0–v1.14 (Phases 1-112) — SHIPPED</summary>

Full per-phase details are archived in `.planning/milestones/` (one `vX.Y-ROADMAP.md` per milestone) and summarized in `.planning/MILESTONES.md`.

- ✅ **v1.14 802.1X Network Authentication Documentation + Backlog & Tooling Closure** (Phases 101-112) — SHIPPED 2026-07-02 — `.planning/milestones/v1.14-ROADMAP.md`
- ✅ **v1.13 macOS Platform SSO Admin-Setup Documentation Accuracy & Depth** (Phases 96-100) — SHIPPED 2026-06-29 — `.planning/milestones/v1.13-ROADMAP.md`
- ✅ **v1.12 macOS MDM-Migration Verification Closure** (Phases 94-95) — SHIPPED 2026-06-26 — `.planning/milestones/v1.12-ROADMAP.md`
- ✅ **v1.11 macOS PSSO End-to-End Provisioning & MDM Migration** (Phases 89-93) — SHIPPED 2026-06-26 — `.planning/milestones/v1.11-ROADMAP.md`
- ✅ v1.0–v1.10 (Phases 1-88) — see milestone entries and `.planning/milestones/`

</details>

### v1.15 EEE SOP Documentation-Standard Retrofit (Phase-1) — Phases 113-119

- [x] **Phase 113: Conversion Pipeline Lock + Representative-Set Grounding Validation** — Define, lock, and empirically validate the MD→.docx conversion pipeline before the full corpus retrofit begins (completed 2026-07-04)
- [x] **Phase 114: EEE Standard, Templates, Doc ID Registry + Metadata Rules** — Author the EEE SOP standard, update templates, assign all Phase-1 Doc IDs, and verify the C10 precondition (completed 2026-07-04)
- [x] **Phase 115: C17 Harness Check (Validator Atom)** — Author C17 as one indivisible blocking validator atom asserting the full EEE contract from Markdown source (completed 2026-07-04)
- [x] **Phase 116: L1/L2 Runbook Retrofit (~75 docs)** — Retrofit all L1/L2 runbooks to EEE with C17 green on every file (completed 2026-07-05)
- [ ] **Phase 117: Admin-Setup Guide Retrofit (all platforms)** — Retrofit all admin-setup guides (Windows / macOS / iOS / Android / Linux / 802.1X) to EEE with C17 green
- [ ] **Phase 118: Reference Doc Retrofit + Table Remediation (~26 docs)** — Retrofit all reference docs to EEE including table remediation so capability-matrix content survives chunk boundaries
- [ ] **Phase 119: Frozen-Surface Re-baseline + 13th Path-A Lineage Bump + Terminal Re-audit Close** — Atomically re-pin all Phase-1 frozen surfaces, author the 13th Path-A harness lineage bump, and close with a 3-axis terminal re-audit

## Phase Details

### Phase 113: Conversion Pipeline Lock + Representative-Set Grounding Validation

**Goal**: The MD→.docx conversion pipeline is defined, locked, and empirically validated on a representative 3-5 doc set before any file in the corpus receives the EEE retrofit — a misconfigured pipeline corrupts all ~150 docs simultaneously, so it must be grounding-confirmed first.
**Depends on**: Nothing (first phase of v1.15)
**Requirements**: PIPE-01, PIPE-02
**Success Criteria** (what must be TRUE):

  1. Pandoc version is pinned, a `--reference-doc` Word template with Heading 1/2/3 styles is created and committed, and the exact conversion invocation is documented as the canonical pipeline definition
  2. A post-conversion guard script fails on a test file that contains raw `---` YAML frontmatter in the first 500 characters of the generated .docx body; the guard passes on a clean conversion
  3. A 3-5 doc representative set converts without YAML leak, uploads to the test SharePoint library with Word Heading styles preserved (verified by the guard), and the deployment policy is documented (only .docx files in the indexed library; `Status: Draft` docs excluded from production library path)
  4. Live Copilot Studio queries against the uploaded test set return correct document-level citations and the single-line header block appears as body text, not a Word custom property; empirical open questions (citation title source; Status: Draft retrieval behavior; exact chunk boundary behavior) are resolved and recorded for use in Phase 114 standard authoring

**Plans**: 4 plans

Plans:
**Wave 1**

- [x] 113-01-PLAN.md — Shared OOXML helper + pandoc 3.7.0.2 pin + reference.docx (PIPE-01)

**Wave 2** *(blocked on Wave 1 completion)*

- [x] 113-02-PLAN.md — Post-conversion guard (self-test) + convert.ps1 + pipeline/deployment README (PIPE-01, PIPE-02)

**Wave 3** *(blocked on Wave 2 completion)*

- [x] 113-03-PLAN.md — Representative 5-doc set: convert + guard-pass proof, agent mechanical legs (PIPE-02)

**Wave 4** *(blocked on Wave 3 completion)*

- [x] 113-04-PLAN.md — Owner-run PIPE-02 grounding runbook + findings + checkpoint (PIPE-02)

### Phase 114: EEE Standard, Templates, Doc ID Registry + Metadata Rules

**Goal**: The EEE SOP standard is locked, templates are updated, all Phase-1 Doc IDs are assigned, and C10 is confirmed lenient on the new frontmatter keys — the complete specification and scaffolding is in place before any retrofitting begins.
**Depends on**: Phase 113 (grounding empirics inform the single-line format confirmation and deployment policy section of the standard)
**Requirements**: META-01, META-02, META-03, META-04, STD-01, STD-02, STD-03
**Success Criteria** (what must be TRUE):

  1. C10 passes against a test file carrying the four new frontmatter keys (`doc_id`, `status`, `owner`, `doc_type`) — confirming C10 is lenient on unknown keys and will not fail the corpus on retrofit
  2. `docs/_standards/EEE-SOP-standard.md` is committed specifying the single-line header block format (Platform + Doc Type first), the D1 platform normalization map (all ~19-20 real `platform:` variants → clean visible labels; unmapped value is a hard failure, no fallback), the D2 `Last Reviewed` = `last_verified` verbatim semantics, the Doc Type taxonomy, and the "v1.15 EEE reformat — content not re-reviewed" Version-History row rule
  3. All `docs/_templates/*` produce EEE-conformant new docs out of the box — required frontmatter keys, single-line header block, `## Summary`-first, `Status: Draft` default; owner-promotes-to-Approved rule is documented
  4. `docs/_registry/RE-index.md` is committed outside the indexed SharePoint library with all Phase-1 Doc IDs assigned in one sequential collision-free pass starting at RE-001, mapping RE-NNN → file path + title + doc_type + status

**Plans**: 4 plans

Plans:
**Wave 1**

- [x] 114-01-PLAN.md — SC1 C10-leniency precondition gate: probe proves C10 lenient on the 4 new keys, then deleted (META-01)

**Wave 2** *(blocked on Wave 1 completion)*

- [x] 114-02-PLAN.md — EEE-SOP-standard.md: block format + D1 20-variant map + taxonomy + D2 semantics + grounding notes + C17 needle-spec (STD-01, META-02, META-03, META-04)

**Wave 3** *(blocked on Wave 2 completion; the two run in parallel — no file overlap)*

- [x] 114-03-PLAN.md — Templates: 6 edited + reference-template.md new, all born-EEE-conformant, D-07 platform fix (STD-02)
- [x] 114-04-PLAN.md — Doc ID Registry RE-index.md: 178 Phase-1 docs → RE-001..RE-178, collision-free, outside indexed library (STD-03)

### Phase 115: C17 Harness Check (Validator Atom)

**Goal**: The C17 harness check is authored as one indivisible validator atom, blocking on all EEE contract assertions derived from the research needle-spec — so content retrofit phases work against a live gate from the first retrofitted file.
**Depends on**: Phase 114 (D1 normalization map and needle-spec must be locked before C17 can encode them)
**Requirements**: HARN-01
**Success Criteria** (what must be TRUE):

  1. C17 is authored as one indivisible atom (all lint-surface assertions in a single atomic commit) and registered in the harness chain alongside C1-C16
  2. C17 blocks on: required frontmatter keys present (`doc_id`, `status`, `owner`, `doc_type`, `last_verified`); header block is a single inline paragraph (not a Markdown table); Platform + Doc Type are the first two fields in the block; H1 is present, descriptive (not a bare `RE-NNN` code), and unique in the file; `## Summary` is the first H2 with no intervening H2/H3 after the header block; `platform` value resolves in the D1 normalization map (unmapped = FAIL, no silent fallback); `status` value is from {Draft, Approved, Superseded}; no Mermaid fences in Phase-1 files; any Markdown table >25 rows has a prose summary within 5 lines of the closing delimiter; gate blockquote (if present) is <=200 characters; `## Summary` section contains >=30 words of content prose
  3. C17 exits 0 on the representative set validated in Phase 113 and on all `docs/_templates/*` (templates use `Status: Draft`; C17 does not gate on Approved-only for templates)
  4. Content retrofit phases (116-118) receive the C17 needle-spec only — C17 itself is not re-opened or modified during content phases; it is the enforcing gate

**Plans**: 1 plan

- [x] 115-01-PLAN.md — C17 EEE-contract validator: 13-assertion blocking atom (single file) + node-builtins-only + --self-test fixture set (HARN-01)

### Phase 116: L1/L2 Runbook Retrofit (~75 docs)

**Goal**: All L1/L2 runbooks (~75 docs) are retrofitted to the EEE standard — the highest-operator-impact document class, delivered first — with C17 green on every file before phase close.
**Depends on**: Phase 115 (C17 gate must be live before any retrofitted file is merged)
**Requirements**: RETRO-01
**Success Criteria** (what must be TRUE):

  1. All L1/L2 runbook files carry the correct EEE header block: single inline paragraph; `doc_id` from the registry; Platform normalized via the D1 map; `Status: Approved`; Platform + Doc Type as the first two fields
  2. Every runbook `## Summary` opens with a one-line scope/safety banner (read-only-scope statement or escalation guardrail as the lead sentence), followed by the scope content
  3. Each retrofitted runbook has the D3-A structure: `# Title → single-line block → ## Summary → gate-blockquote → sections`; no intervening content between the header block and `## Summary`
  4. Each retrofitted runbook carries the "v1.15 EEE reformat — content not re-reviewed" Version-History row and `Last Reviewed` carries the file's existing `last_verified` value verbatim (D2-A; no staleness-clock reset)
  5. C17 exits 0 on every L1/L2 runbook file before phase close (NOTE: discuss-phase flag — whether the ~75 docs warrant splitting L1 and L2 into separate sub-phases; final granularity resolved at `/gsd-discuss-phase 116`)

**Plans**: 8 plans
**Wave 1**

- [x] 116-01-PLAN.md — Mechanical EEE retrofit helper (retrofit-runbook.mjs, node-builtins): doc_id join, block line, gate relocation, platform injection, Version-History row (D-03)

**Wave 2** *(blocked on Wave 1 completion)*

- [x] 116-02-PLAN.md — L1 index + Windows (RE-001..RE-010): platform: Windows injection + navigation-purpose index Summary

**Wave 3** *(blocked on Wave 2 completion)*

- [x] 116-03-PLAN.md — L1 macOS cluster (RE-011..RE-016, RE-036..RE-038): tailored banners for state-changing RE-037/RE-038

**Wave 4** *(blocked on Wave 3 completion)*

- [x] 116-04-PLAN.md — L1 iOS + Android (RE-017..RE-030): default L1 read-only banners

**Wave 5** *(blocked on Wave 4 completion)*

- [x] 116-05-PLAN.md — L1 Linux + apple-business + 802.1X (RE-031..RE-035, RE-039..RE-042): heavy D-05; tailored RE-035; completes L1

**Wave 6** *(blocked on Wave 5 completion)*

- [x] 116-06-PLAN.md — L2 index + Windows (RE-043..RE-051): Windows injection + RE-044 Version-History create + tailored RE-045/046/047

**Wave 7** *(blocked on Wave 6 completion)*

- [x] 116-07-PLAN.md — L2 macOS + iOS + Android (RE-052..RE-065): default L2 escalation banners

**Wave 8** *(blocked on Wave 7 completion)*

- [x] 116-08-PLAN.md — L2 Linux + apple-business + macOS SSO + 802.1X (RE-066..RE-075): tailored RE-068/069/071; full-corpus C17 gate on all 75

**Cross-cutting constraints:**

- Each file has D3-A structure: block line → H1 → ## Summary → gate blockquote → sections (SC3)
- Each file carries the v1.15 EEE reformat Version-History row and Last Reviewed = last_verified verbatim (SC4)
- C17 exits 0 on all 9 files and the enrollment precheck returns zero lines for this batch (SC5)
- C17 exits 0 on all 14 files and the enrollment precheck returns zero lines for this batch (SC5)

### Phase 117: Admin-Setup Guide Retrofit (all platforms)

**Goal**: All admin-setup guides (Windows / macOS / iOS/iPadOS / Android / Linux / 802.1X, all platforms) are retrofitted to the EEE standard with C17 green on every file — the second Phase-1 document class.
**Depends on**: Phase 116 (sequential retrofit order; platform normalization patterns confirmed)
**Requirements**: RETRO-02
**Success Criteria** (what must be TRUE):

  1. All admin-setup guide files carry the correct EEE header block with `doc_id` from the registry and Platform normalized via the D1 map — no unmapped `platform:` values remain in any admin-setup guide
  2. Each guide has the D3-A structure: `# Title → single-line block → ## Summary → gate-blockquote → sections`; `## Summary` is the first H2 with content immediately following the header block
  3. Each retrofitted guide carries the "v1.15 EEE reformat — content not re-reviewed" Version-History row and `Last Reviewed` = `last_verified` verbatim (D2-A)
  4. C17 exits 0 on all admin-setup guide files before phase close (NOTE: discuss-phase flag — whether the ~8 guide sets across 6 platform families warrant splitting into multiple sub-phases; final granularity resolved at `/gsd-discuss-phase 117`)

**Plans**: 10 plans

Plans:
**Wave 1**

- [x] 117-01-PLAN.md — Fork retrofit-guide.mjs from retrofit-runbook.mjs; FIX the whole-pre-H1-span data-loss defect; uniform owner + doc_type Guide; admin-setup allowlist + 9-mermaid exclusion; self-test + 57-file dry-run (RETRO-02)

**Wave 2** *(blocked on Wave 1)*

- [x] 117-02-PLAN.md — Windows batch: apv1 02-10 + apv2 01-04 (13 files, platform: Windows injection), C17 green + registry Approved (RETRO-02)

**Wave 3** *(blocked on Wave 2 — shared RE-index.md)*

- [x] 117-03-PLAN.md — Android core 01-08 (8 files, heavy #12: 76 groups), C17 green + registry Approved (RETRO-02)

**Wave 4** *(blocked on Wave 3)*

- [x] 117-04-PLAN.md — Android AOSP-OEM 09-13 (5 files, all exercise the pre-H1 HTML-comment preservation fix), C17 green + registry Approved (RETRO-02)

**Wave 5** *(blocked on Wave 4)*

- [x] 117-05-PLAN.md — iOS 01-09 (9 files, heaviest #12: 86 groups; 02-abm-token 2-blockquote case), C17 green + registry Approved (RETRO-02)

**Wave 6** *(blocked on Wave 5)*

- [x] 117-06-PLAN.md — macOS core 01-06 (6 files; 01-abm-configuration 2-blockquote case), C17 green + registry Approved (RETRO-02)

**Wave 7** *(blocked on Wave 6)*

- [x] 117-07-PLAN.md — macOS SSO 07-11 (5 files, corpus-worst 1892c #12 group, Transform B heavy), C17 green + registry Approved (RETRO-02)

**Wave 8** *(blocked on Wave 7)*

- [x] 117-08-PLAN.md — Linux 01-05 (5 files, generic scope-lead minus framework clause), C17 green + registry Approved (RETRO-02)

**Wave 9** *(blocked on Wave 8)*

- [ ] 117-09-PLAN.md — 802.1X 02-07 (6 files, cohesive/heterogeneous, per-file D1 label + Summary template; 1868c dot3svc Transform B), C17 green + registry Approved (RETRO-02)

**Wave 10** *(blocked on Wave 9)*

- [ ] 117-10-PLAN.md — Phase gate: enrollment-completeness precheck scoped to 57 (9 mermaid stay keyless/Pending) + full-class C17 exit 0 (RETRO-02, SC4)

### Phase 118: Reference Doc Retrofit + Table Remediation (~26 docs)

**Goal**: All reference docs (~26 docs: capability matrices, 4-platform comparison, error-codes, cross-platform references) are retrofitted to EEE — last because they carry the large capability tables most at risk from chunk-boundary fragmentation — including table remediation so content survives the ~2,000-char chunk window.
**Depends on**: Phase 117 (sequential retrofit order; last due to P-02 table-chunking severity)
**Requirements**: RETRO-03
**Success Criteria** (what must be TRUE):

  1. All reference doc files carry the correct EEE header block with `doc_id` from the registry and Platform normalized via the D1 map; `Status: Approved`
  2. Each capability-matrix table with >25 rows has a prose summary paragraph within 5 lines of the closing table delimiter — ensuring header context is retrievable even when the table body lands in a separate chunk (NOTE: discuss-phase flag — row-cap threshold and whether to split oversized matrices vs. add prose summaries only; resolved at `/gsd-discuss-phase 118`)
  3. Each reference doc has the D3-A structure (`# Title → block → ## Summary → sections`) and carries the Version-History row + `Last Reviewed` = `last_verified` verbatim (D2-A)
  4. C17 exits 0 on all reference doc files before phase close

**Plans**: TBD

### Phase 119: Frozen-Surface Re-baseline + 13th Path-A Lineage Bump + Terminal Re-audit Close

**Goal**: The frozen-surface re-baseline is performed atomically (apex + continuity chain validators green together at the new close SHAs), the 13th Path-A lineage bump is authored, and the milestone closes with a 3-axis terminal re-audit — completing the first deliberate re-pin of all Phase-1 frozen surfaces, which INTENTIONALLY inverts the byte-unchanged invariant prior milestones protected.
**Depends on**: Phase 118 (all three retrofit doc classes complete; C17 green across full Phase-1 corpus)
**Requirements**: HARN-02, HARN-03, HARN-04
**Success Criteria** (what must be TRUE):

  1. Atom 1 ships indivisibly (one commit): `v1.15-milestone-audit.mjs` (C1-C17, Path-A from v1.14) + `v1.15-audit-allowlist.json` sidecar repointed + BASELINE_19 freshness comment in `regenerate-supervision-pins.mjs`
  2. Atom 2 ships indivisibly (one commit): `check-phase-113.mjs` through `check-phase-119.mjs` per-phase validators (chain-apex `CHAIN_PHASES=[48..118]`, `CHAIN_SKIP=new Set([])`) + `_lib/frozen-at-close.mjs` V114 pin (v1.14 close-gate SHA `7d922a7`) + `audit-harness-v1.15-integrity.yml` as the 12th parallel CI coexistence workflow (predecessors v1.4–v1.14 byte-unchanged)
  3. The frozen-surface re-baseline completes atomically: apex and continuity chain validators exit 0 together at the new close SHAs (CRITICAL NOTE: this milestone DELIBERATELY re-pins all Phase-1 frozen surfaces at once — this is an intentional inversion of the byte-unchanged invariant that every prior milestone protected; non-Phase-1 predecessor frozen surfaces remain byte-unchanged)
  4. 3-axis terminal re-audit passes with cross-OS EXACT MATCH: Axis 1 fresh `git clone --no-hardlinks`, Axis 2 cross-OS Linux GHA authoritative (BOTH chain validators per corrected D-03 OS split), Axis 3 fresh zero-context sub-agent
  5. PIPE-02 grounding-validation confirmation is included in the close-gate — the retrofitted corpus (or a statistically representative set) produces correct citations in live Copilot Studio queries; the single close-gate commit flips all 16 v1.15 requirements to Validated across PROJECT / ROADMAP / STATE / REQUIREMENTS

**Plans**: TBD

## Progress

| Milestone | Phases | Status | Shipped |
|-----------|--------|--------|---------|
| v1.0 Autopilot Documentation & Troubleshooting Guides | 1-10 | ✅ Shipped | 2026-04-10 |
| v1.1 APv2 Documentation & Admin Setup Guides | 11-19 | ✅ Shipped | 2026-04-13 |
| v1.2 Cross-Platform Provisioning & Operational Gaps | 20-25 | ✅ Shipped | 2026-04-15 |
| v1.3 iOS/iPadOS Provisioning Documentation | 26-33 | ✅ Shipped | 2026-04-19 |
| v1.4 Android Enterprise Enrollment Documentation | 34-42 | ✅ Shipped | 2026-04-24 |
| v1.4.1 Android Enterprise Completion & v1.4 Cleanup | 43-47 | ✅ Shipped | 2026-04-25 |
| v1.5 Linux Platform, Operational Depth & Cross-Platform Cleanup | 48-61 | ✅ Shipped | 2026-05-07 |
| v1.6 Apple Business Delegated Governance & Multi-Org Operations | 62-66 | ✅ Shipped | 2026-05-25 |
| v1.7 Deferred Backlog Closure + Validator Chain Hardening | 67-70 | ✅ Shipped | 2026-05-29 |
| v1.8 Tooling Debt Closure + Chain-Resilience Hardening | 71-74 | ✅ Shipped | 2026-06-08 |
| v1.9 macOS Platform SSO & Secure Enclave Authentication Documentation | 75-82 | ✅ Shipped | 2026-06-22 |
| v1.10 macOS Platform SSO Follow-ons — Kerberos, Graph API & NUAL | 83-88 | ✅ Shipped | 2026-06-24 |
| v1.11 macOS PSSO End-to-End Provisioning & MDM Migration | 89-93 | ✅ Shipped | 2026-06-26 |
| v1.12 macOS MDM-Migration Verification Closure | 94-95 | ✅ Shipped | 2026-06-26 |
| v1.13 macOS Platform SSO Admin-Setup Documentation Accuracy & Depth | 96-100 | ✅ Shipped | 2026-06-29 |
| v1.14 802.1X Network Authentication Documentation + Backlog & Tooling Closure | 101-112 | ✅ Shipped | 2026-07-02 |
| v1.15 EEE SOP Documentation-Standard Retrofit (Phase-1) | 113-119 | 🔄 In progress | — |

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 113. Conversion Pipeline Lock + Grounding Validation | 4/4 | Complete   | 2026-07-04 |
| 114. EEE Standard, Templates, Registry + Metadata Rules | 4/4 | Complete    | 2026-07-04 |
| 115. C17 Harness Check (Validator Atom) | 1/1 | Complete    | 2026-07-04 |
| 116. L1/L2 Runbook Retrofit | 8/8 | Complete    | 2026-07-05 |
| 117. Admin-Setup Guide Retrofit | 8/10 | In Progress|  |
| 118. Reference Doc Retrofit + Table Remediation | 0/TBD | Not started | — |
| 119. Frozen-Surface Re-baseline + 13th Path-A Lineage Bump + Close | 0/TBD | Not started | — |
