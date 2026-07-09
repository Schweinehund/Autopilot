# Roadmap: Windows Autopilot & macOS Provisioning Documentation Suite

## Milestones

- 🔄 **v1.16 EEE SOP Documentation-Standard Retrofit (Phase-2) + Pipeline/Structural Shelf-Clearing** — Phases 120-125 (planning)
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
- ✅ **v1.15 EEE SOP Documentation-Standard Retrofit (Phase-1)** — Phases 113-119 (shipped 2026-07-06)

## Phases

<details>
<summary>✅ v1.0–v1.15 (Phases 1-119) — SHIPPED</summary>

Full per-phase details are archived in `.planning/milestones/` (one `vX.Y-ROADMAP.md` per milestone) and summarized in `.planning/MILESTONES.md`.

- ✅ **v1.15 EEE SOP Documentation-Standard Retrofit (Phase-1)** (Phases 113-119) — SHIPPED 2026-07-06 — `.planning/milestones/v1.15-ROADMAP.md`
- ✅ **v1.14 802.1X Network Authentication Documentation + Backlog & Tooling Closure** (Phases 101-112) — SHIPPED 2026-07-02 — `.planning/milestones/v1.14-ROADMAP.md`
- ✅ **v1.13 macOS Platform SSO Admin-Setup Documentation Accuracy & Depth** (Phases 96-100) — SHIPPED 2026-06-29 — `.planning/milestones/v1.13-ROADMAP.md`
- ✅ **v1.12 macOS MDM-Migration Verification Closure** (Phases 94-95) — SHIPPED 2026-06-26 — `.planning/milestones/v1.12-ROADMAP.md`
- ✅ **v1.11 macOS PSSO End-to-End Provisioning & MDM Migration** (Phases 89-93) — SHIPPED 2026-06-26 — `.planning/milestones/v1.11-ROADMAP.md`
- ✅ v1.0–v1.10 (Phases 1-88) — see milestone entries and `.planning/milestones/`

</details>

### v1.16 EEE SOP Documentation-Standard Retrofit (Phase-2) + Pipeline/Structural Shelf-Clearing — Phases 120-125

- [x] **Phase 120: EEE Standard Extension — Mermaid/C17 Policy + Hygiene Fix** — Extend the standard + C17 contract with the resolved Mermaid-in-enrolled-classes policy and the extended Doc Type taxonomy; fix the stale frozen-at-close.mjs header comment (completed 2026-07-07)
- [x] **Phase 121: Structural Retrofit — Glossaries, Lifecycle & End-User Guides** — Retrofit glossaries, end-user guides, and the 13 Mermaid-free lifecycle docs to EEE, C17 green (the 9 Mermaid-bearing lifecycle docs are deferred to Phase 122 — RETRO-07 spans 121+122) (completed 2026-07-07)
- [x] **Phase 122: Structural Retrofit — Decision-Trees, Carved-Mermaid Files & the 9 Mermaid-bearing lifecycle docs (RETRO-07 remainder)** — Retrofit the Mermaid-bearing classes to EEE using the Phase 120 policy, C17 green
 (completed 2026-07-08)
- [x] **Phase 123: Orphan Nav-Hub Retrofit (Navigation-Last)** — Retrofit index/common-issues/quick-ref hubs last, after all referenced content is committed
 (completed 2026-07-08)
- [x] **Phase 124: Pipeline Fix, Descriptive-Filename Pass & Draft-Label Grounding Probe** — Fix the pandoc nav-footer YAML-alias defect, normalize filenames for citation quality, and confirm the true Draft-label grounding behavior (completed 2026-07-08)
- [ ] **Phase 125: V115 Pin + 14th Path-A Lineage Bump + Terminal Close** — Freeze the v1.15 corpus, bump the audit-harness lineage, and close via 3-axis terminal re-audit

## Phase Details

### Phase 120: EEE Standard Extension — Mermaid/C17 Policy + Hygiene Fix

**Goal**: The EEE standard and C17 contract state a clear, codified policy for Mermaid diagrams in enrolled classes, and the Doc Type taxonomy covers the remaining structural classes — unblocking the two Mermaid-dependent retrofits; the stale `frozen-at-close.mjs` header comment is corrected.
**Depends on**: Nothing (first phase of v1.16; extends the v1.15 `docs/_standards/EEE-SOP-standard.md` and `c17-eee-contract.mjs` artifacts)
**Requirements**: STD-04, HYG-01
**Success Criteria** (what must be TRUE):

  1. `docs/_standards/EEE-SOP-standard.md` states the resolved Mermaid-in-enrolled-classes policy (text-equivalent conversion, or a defined permitted form) with rationale, decided via `/adversarial-review` at discuss-phase
  2. `scripts/validation/c17-eee-contract.mjs` assertion #1 (currently a hard-fail on top-level ```mermaid) is updated to match the resolved policy (retained hard-fail requiring conversion, or a documented carve-out), and `--self-test` still exits 0
  3. The EEE standard's Doc Type taxonomy is extended to explicitly cover glossary / decision-tree / nav-hub / lifecycle / end-user guide doc classes (mapped to existing types or newly added)
  4. `scripts/validation/_lib/frozen-at-close.mjs:5-9` no longer claims helpers "REMAIN INLINE" across `check-phase-{61,67,68,70}` — the comment is corrected to reflect the v1.14 Phase 111 centralization

**Plans**: 2 plans
Plans:
**Wave 1**

- [x] 120-01-PLAN.md — STD-04: EEE standard Mermaid policy (text-equivalent conversion) + 4 D-02 rulings + D-08 precedence rule + C17 comment-only cross-ref

**Wave 2** *(blocked on Wave 1 completion)*

- [x] 120-02-PLAN.md — HYG-01: correct frozen-at-close.mjs stale header comment + author 120-VERIFICATION.md needle-spec

### Phase 121: Structural Retrofit — Glossaries, Lifecycle & End-User Guides

**Goal**: Glossaries (6), end-user guides (RE-175/176), and the 13 **Mermaid-free** lifecycle docs are retrofitted to EEE and green under C17. The 9 Mermaid-bearing lifecycle docs are deferred to Phase 122 (where the leaf-parity conversion discipline lives) — **RETRO-07 spans Phase 121 + Phase 122**.
**Depends on**: Phase 120 (Doc Type taxonomy extension informs `doc_type` assignment for these classes)
**Requirements**: RETRO-04, RETRO-07 *(13 of 22 lifecycle files here; the 9 Mermaid-bearing files complete in Phase 122)*, RETRO-09
**Success Criteria** (what must be TRUE):

  1. All `docs/_glossary-*.md` files carry the EEE header block + `## Summary`-first + normalized Platform label; the term-surface shape (definition lists / anchor slugs) is preserved and existing plain-GitHub anchor slugs are not broken; C17 exits 0
  2. All **13 Mermaid-free** lifecycle docs (of the 22-file lifecycle class — the 6 canonical `docs/{lifecycle,lifecycle-apv2,android-lifecycle,ios-lifecycle,macos-lifecycle,linux-lifecycle}/` directories) carry the EEE header block + `## Summary`-first + normalized Platform label + `Status: Approved`; C17 exits 0. The 9 Mermaid-bearing lifecycle docs are enrolled at `Status: Pending` in the registry (path-order-preserving IDs) and retrofitted in Phase 122 — RETRO-07 does not close until all 22 are green
  3. RE-175 and RE-176 (end-user Guides) carry the EEE header block + `## Summary`-first + correct `doc_type`; C17 exits 0 on both
  4. Every retrofitted file in this phase carries the "v1.16 EEE reformat — content not re-reviewed" Version-History row and `Last Reviewed` = `last_verified` verbatim

**Plans**: 7 plans

Plans:
**Wave 1**

- [x] 121-01-PLAN.md — Build retrofit-structural.mjs fork (2 doc_types, 9-file Mermaid exclusion, v1.16 VH) + author RE-179..206 registry rows

**Wave 2** *(blocked on Wave 1 completion)*

- [x] 121-02-PLAN.md — Glossaries: android + network (EEE retrofit, R1 Change-History reconcile, #12 splits)
- [x] 121-03-PLAN.md — Glossaries: macos + apple-business (EEE retrofit, #12 splits, Kandji-Iru slug)
- [x] 121-04-PLAN.md — Glossaries: linux + base (EEE retrofit, #12 splits) — RETRO-04 complete
- [x] 121-05-PLAN.md — Mermaid-free lifecycle batch 1: android-lifecycle (4) + ios/00 + linux (2)
- [x] 121-06-PLAN.md — Mermaid-free lifecycle batch 2 (6) + 2 end-user guides — RETRO-09 complete

**Wave 3** *(blocked on Wave 2 completion)*

- [x] 121-07-PLAN.md — Phase verification: C17 195/0, registry 19-Approved/9-Pending, RETRO attestation

**Cross-cutting constraints:**

- The coverage blockquote is relocated byte-preserved below ## Summary and every blockquote (relocated coverage + all in-body See-also cross-refs) is ≤200 chars — C17 #12 green

### Phase 122: Structural Retrofit — Decision-Trees & Carved-Mermaid Files

**Goal**: Decision-tree docs, the carved-mermaid files deferred from v1.15, **and the 9 Mermaid-bearing lifecycle docs (RETRO-07 remainder, deferred here from Phase 121)** are retrofitted to EEE, with their Mermaid diagrams resolved per the Phase 120 policy, moving from Pending/keyless to Approved.
**Depends on**: Phase 120 (the Mermaid policy must be locked before any diagram is converted or retained under a carve-out); Phase 121 (which pre-enrolls the 9 lifecycle docs at `Status: Pending` with their registry IDs — Phase 122 flips them to Approved without minting new IDs)
**Requirements**: RETRO-05, RETRO-08, RETRO-07 *(remainder — the 9 Mermaid-bearing lifecycle files; shared with Phase 121)*
**Success Criteria** (what must be TRUE):

  1. All `docs/decision-trees/*` files carry the EEE header block + `## Summary`-first; their Mermaid diagrams are resolved per the STD-04 policy with every decision leaf preserved (text-equivalent table/structured list, or the permitted form the policy defines); C17 exits 0
  2. RE-128 (linux overview) and RE-147 (`ca-enrollment-timing.md`) move from Pending/keyless to `Status: Approved` with a registry `doc_id`, Mermaid resolved per STD-04
  3. The 9 Phase-117 admin-setup mermaid carve-outs are retrofitted to EEE with Mermaid resolved per STD-04; each moves to `Status: Approved`
  4. C17 exits 0 on every file in this phase's class (decision-trees + all carved-mermaid files, including RE-128/RE-147 and the 9 carve-outs)
  5. The 9 Mermaid-bearing lifecycle docs (RETRO-07 remainder — `docs/lifecycle/{00-overview,03-oobe,04-esp}.md`, `docs/lifecycle-apv2/02-deployment-flow.md`, `docs/ios-lifecycle/{01-ade-lifecycle,02-mdm-migration}.md`, `docs/macos-lifecycle/{00-ade-lifecycle,01-psso-provisioning-walkthrough,02-mdm-migration-psso}.md`) have their Mermaid resolved per STD-04 with every decision leaf preserved, flip from `Status: Pending` to `Approved`, and C17 exits 0; RETRO-07 closes only when all 22 lifecycle files are green

**Plans**: 15 plans
Plans:
**Wave 1** — foundation

- [x] 122-01-PLAN.md — Build retrofit-mermaid-structural.mjs fork (delete MERMAID_DEFERRED, add mermaid-absence + doc_id-idempotency + keyless-Windows guards, explicit-Set router, auto-date VH) + mint RE-207..217 + plan-time rulings R1/R2/R3

**Wave 2** *(blocked on Wave 1)* — hand-convert + fork-enroll all 30 files

- [x] 122-02-PLAN.md — Decision-trees 08/00/01 (heaviest reconvergence; front-loaded)
- [x] 122-03-PLAN.md — Decision-trees 02/03/04 (keyless-Windows)
- [x] 122-04-PLAN.md — Decision-trees 05/06/07 (05 = Reference directory-precedence; nested MACSSO)
- [x] 122-05-PLAN.md — Decision-trees 09/10 (10 = delete fence + stale Legend, upgrade to LOCKED-11)
- [x] 122-06-PLAN.md — Carved FULL: admin-setup android/00, ios/00, macos/00
- [x] 122-07-PLAN.md — Carved: apv1/01 (8 blockquotes) + 8021x/00, 8021x/01 (seq->step list)
- [x] 122-08-PLAN.md — Carved LIGHT: apv1/00, apv2/00, linux/00 (RE-128), ca-enrollment-timing (RE-147) — SC2
- [x] 122-09-PLAN.md — Lifecycle: lifecycle/00 (2 blocks), /03 (ESP4 merge), /04 (subgraph partition)
- [x] 122-10-PLAN.md — Lifecycle: lifecycle-apv2/02 (2 blocks, 5-edge failure map) + ios-lifecycle/01, /02 (10 blockquotes)
- [x] 122-11-PLAN.md — Lifecycle: macos-lifecycle 00/01/02 (dual pipelines; corpus-max 5877c + 16 blockquotes)

**Wave 3** *(blocked on Wave 2)* — independent D-01 leaf-parity verification (read-only)

- [x] 122-12-PLAN.md — D-01 verify 11 decision-trees (git-show re-derivation vs converted tables)
- [x] 122-13-PLAN.md — D-01 verify 10 carved-mermaid files
- [x] 122-14-PLAN.md — D-01 verify 9 Mermaid-bearing lifecycle files

**Wave 4** *(blocked on Wave 3)* — close

- [x] 122-15-PLAN.md — Flip all 30 rows Pending->Approved + full-corpus C17 + 122-VERIFICATION.md + mark RETRO-05/07/08 complete

### Phase 123: Orphan Nav-Hub Retrofit (Navigation-Last)

**Goal**: The orphan nav-hubs (`index.md`, `common-issues.md`, `quick-ref-l1.md`, `quick-ref-l2.md`) are retrofitted to EEE last among the content phases, honoring navigation-last discipline — their edits reference content already committed in Phases 121-122.
**Depends on**: Phase 121, Phase 122 (navigation-last: nav-hub edits must commit after the content they reference)
**Requirements**: RETRO-06
**Success Criteria** (what must be TRUE):

  1. `docs/index.md`, `docs/common-issues.md`, `docs/quick-ref-l1.md`, `docs/quick-ref-l2.md` all carry the EEE header block + `## Summary`-first appropriate to an index/quick-ref Doc Type; C17 exits 0 on all four
  2. Every routing/link-table entry in the four nav-hubs remains accurate — no broken links, and entries pointing at Phase 121/122-retrofitted files still resolve
  3. Git history confirms all nav-hub commits post-date the content commits they reference (navigation-last discipline preserved, mirrors the v1.15 Phase 109/117 precedent)

**Plans**: 4 plans

Plans:
**Wave 1**

- [x] 123-01-PLAN.md — Mint RE-218..221 registry rows + fork retrofit-nav-hub.mjs (NAV_HUB_PATHS + resolveDocType Reference branch)
- [x] 123-02-PLAN.md — Build check-nav-hub-links.mjs (GitHub-exact slugify + {#id}-first + double-hyphen + dedup; outbound+inbound; --self-test)

**Wave 2** *(blocked on Wave 1)*

- [x] 123-03-PLAN.md — Run fork + author 4 net-new Summaries + 13 #12 reflows (11 A-split incl index.md:9 3-way + 2 de-blockquote) -> C17 green on 4 hubs (SC1)

**Wave 3** *(blocked on Wave 2)*

- [x] 123-04-PLAN.md — Fix 12 pre-existing broken links (separate git-blame commit) + link-checker green (SC2) + full-corpus C17 + navigation-last attestation (SC3) + mark RETRO-06 complete

### Phase 124: Pipeline Fix, Descriptive-Filename Pass & Draft-Label Grounding Probe

**Goal**: The pandoc conversion pipeline is fixed for the nav-footer YAML-alias failure class, filenames are normalized for citation-friendly display, and the true Draft-label grounding behavior is confirmed empirically.
**Depends on**: Phase 123 (exercises the pipeline against the full retrofitted corpus, including the nav-hub class)
**Requirements**: PIPE-03, PIPE-04, PIPE-05
**Success Criteria** (what must be TRUE):

  1. Docs with the italic `*Previous:` / `*Next step:` `---`…`---` nav-footer shape convert cleanly through `scripts/pipeline/convert.ps1` (exit 0, no `Unknown alias` error), proven on a representative sample from the previously-failing class (e.g. an admin-setup guide)
  2. The OQ4 frontmatter → Word custom-property promotion path still functions correctly after the pipeline/footer fix (regression-tested, not broken by PIPE-03)
  3. A descriptive-filename rename map is applied (corpus-wide or the defined scope) with pipeline output-name wiring updated and the RE-NNN ↔ file mapping kept intact in the registry
  4. PIPE-05 probe executed against the shipped EEE header-block format; the Draft label's render + queryability recorded in `PIPE-05-FINDINGS.md`. A PASS (expected) or a tenant-unavailable deferred result closes this criterion cleanly; a recorded surfacing FAIL does NOT auto-close it — it escalates as a genuine defect requiring triage before Phase 124 close

**Plans**: 3 plans (sequential — `use_worktrees:false`; order PIPE-03 -> PIPE-04 -> PIPE-05 invariant per D-20)

Plans:
**Wave 1** *(gating)*

- [x] 124-01-PLAN.md — PIPE-03: convert.ps1 pre-pandoc nav-footer preprocessing (D-01/D-03) + extractCustomProperties/CUSTOM-PROPS guard (D-04 OQ4) + README SC1 + D-04 3-part regression (SC1/SC2)

**Wave 2** *(blocked on Wave 1)*

- [x] 124-02-PLAN.md — PIPE-04: build-filename-map.mjs (D-05 slug + D-08 fail-closed collision) + committed filename-map.md (221 rows, output-only; RE-index.md untouched) (SC3)

**Wave 3** *(blocked on Wave 2 — terminal owner-gate)*

- [x] 124-03-PLAN.md — PIPE-05: reformat draft-test-doc.md to shipped EEE block (D-14) + PIPE-05-RUNBOOK/FINDINGS (D-15) + REQUIREMENTS.md:35 (D-17) + ROADMAP SC4 reword (D-18) + owner-run blocking checkpoint (D-16) (SC4)

### Phase 125: V115 Pin + 14th Path-A Lineage Bump + Terminal Close

**Goal**: The V115 back-anchor pin freezes the v1.15 corpus, the 14th Path-A audit-harness lineage bump ships, and the milestone closes with a 3-axis terminal re-audit — the sole deliverable of this phase, mirroring v1.15 Phase 119 / v1.14 Phase 112 exactly (never batches with content or retrofit).
**Depends on**: Phase 124 (all structural retrofit + pipeline work must be complete and green before the closing lineage bump + re-audit)
**Requirements**: HARN-05, HARN-06, HARN-07
**Success Criteria** (what must be TRUE):

  1. `scripts/validation/_lib/frozen-at-close.mjs` gains a `V115` entry (v1.15 close-gate SHA, recovered via `git log --all --grep="MILESTONE-AUDIT" --grep="MILESTONE CLOSE" --all-match -1 --format=%H`) + `readAtV115Close` export, freezing the v1.15 corpus as the mandatory back-anchor invariant
  2. `v1.16-milestone-audit.mjs` (Path-A, C1-C17 inherited) + `v1.16-audit-allowlist.json` + BASELINE_20 + `check-phase-120..NN.mjs` validators (chain-apex `CHAIN_PHASES=[48..119]`) + the 13th parallel CI coexistence workflow (`audit-harness-v1.16-integrity.yml`) all ship; predecessor v1.4–v1.15 frozen surfaces remain byte-unchanged, except any predecessor content-assertion validator reading a now-retrofitted structural doc, converted frozen-aware (`readAtV115Close`) as in-scope close-gate remediation
  3. The milestone closes via a 3-axis terminal re-audit (fresh `git clone --no-hardlinks` + cross-OS Linux GHA authoritative for both chain validators per the D-03 OS split + fresh zero-context sub-agent) with cross-OS PASS/FAIL/SKIP EXACT MATCH, plus a PIPE-02 grounding-validation confirmation on the retrofitted structural corpus
  4. A single close-gate commit flips all 14 v1.16 requirements to Validated across PROJECT / ROADMAP / STATE / REQUIREMENTS

**Plans**: 7 plans
- [ ] 125-01-PLAN.md — Wave-0 pre-anchor + flag-#6 full-chain scoping run + V115 positive-confirm (29a3599) + sidecar byte-unchanged recon
- [ ] 125-02-PLAN.md — Atom 1: v1.16-milestone-audit.mjs + v1.16-audit-allowlist.json (verbatim) + BASELINE_20 (JIT-anchored)
- [ ] 125-03-PLAN.md — Atom 2: check-phase-120..125 (apex [48..124]/77) + frozen-at-close V115 pin + audit-harness-v1.16-integrity.yml → PUSH
- [ ] 125-04-PLAN.md — 3-axis re-audit + 9-workflow cascade RED scan + predecessor-byte-unchanged HARD gate
- [ ] 125-05-PLAN.md — Emergent remediation slot (fires only if cascade RED; ABAUDIT/readAtV115Close/NESTED-guard)
- [ ] 125-06-PLAN.md — PIPE-02 owner-run grounding confirmation (retargeted v1.16-delta probes; autonomous:false)
- [ ] 125-07-PLAN.md — Close-gate: correct [48..119]→[48..124] + flip all 14 reqs Validated + v1.16 MILESTONE CLOSE

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
| v1.15 EEE SOP Documentation-Standard Retrofit (Phase-1) | 113-119 | ✅ Shipped | 2026-07-06 |
| v1.16 EEE SOP Documentation-Standard Retrofit (Phase-2) + Pipeline/Structural Shelf-Clearing | 120-125 | 🔄 Planning | - |

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 120. EEE Standard Extension — Mermaid/C17 Policy + Hygiene Fix | 2/2 | Complete    | 2026-07-07 |
| 121. Structural Retrofit — Glossaries, Lifecycle & End-User Guides | 7/7 | Complete    | 2026-07-07 |
| 122. Structural Retrofit — Decision-Trees & Carved-Mermaid Files | 15/15 | Complete   | 2026-07-08 |
| 123. Orphan Nav-Hub Retrofit (Navigation-Last) | 4/4 | Complete    | 2026-07-08 |
| 124. Pipeline Fix, Descriptive-Filename Pass & Draft-Label Grounding Probe | 3/3 | Complete   | 2026-07-08 |
| 125. V115 Pin + 14th Path-A Lineage Bump + Terminal Close | 7 plans | Ready to execute | - |
