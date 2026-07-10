# Roadmap: Windows Autopilot & macOS Provisioning Documentation Suite

## Milestones

- 🔄 **v1.17 Docs-Library .docx Publish-Bundle Pipeline (SharePoint / Copilot Upload Automation)** — Phases 126-128 (in progress)
- ✅ **v1.16 EEE SOP Documentation-Standard Retrofit (Phase-2) + Pipeline/Structural Shelf-Clearing** — Phases 120-125 (shipped 2026-07-10)
- ✅ **v1.15 EEE SOP Documentation-Standard Retrofit (Phase-1)** — Phases 113-119 (shipped 2026-07-06)
- ✅ **v1.14 802.1X Network Authentication Documentation + Backlog & Tooling Closure** — Phases 101-112 (shipped 2026-07-02)
- ✅ **v1.13 macOS Platform SSO Admin-Setup Documentation Accuracy & Depth** — Phases 96-100 (shipped 2026-06-29)
- ✅ **v1.12 macOS MDM-Migration Verification Closure** — Phases 94-95 (shipped 2026-06-26)
- ✅ **v1.11 macOS PSSO End-to-End Provisioning & MDM Migration** — Phases 89-93 (shipped 2026-06-26)
- ✅ **v1.10 macOS Platform SSO Follow-ons — Kerberos, Graph API & NUAL** — Phases 83-88 (shipped 2026-06-24)
- ✅ **v1.9 macOS Platform SSO & Secure Enclave Authentication Documentation** — Phases 75-82 (shipped 2026-06-22)
- ✅ **v1.8 Tooling Debt Closure + Chain-Resilience Hardening** — Phases 71-74 (shipped 2026-06-08)
- ✅ **v1.7 Deferred Backlog Closure + Validator Chain Hardening** — Phases 67-70 (shipped 2026-05-29)
- ✅ **v1.6 Apple Business Delegated Governance & Multi-Org Operations** — Phases 62-66 (shipped 2026-05-25)
- ✅ **v1.5 Linux Platform, Operational Depth & Cross-Platform Cleanup** — Phases 48-61 (shipped 2026-05-07)
- ✅ **v1.4.1 Android Enterprise Completion & v1.4 Cleanup** — Phases 43-47 (shipped 2026-04-25)
- ✅ **v1.4 Android Enterprise Enrollment Documentation** — Phases 34-42 (shipped 2026-04-24)
- ✅ **v1.3 iOS/iPadOS Provisioning Documentation** — Phases 26-33 (shipped 2026-04-19)
- ✅ **v1.2 Cross-Platform Provisioning & Operational Gaps** — Phases 20-25 (shipped 2026-04-15)
- ✅ **v1.1 APv2 Documentation & Admin Setup Guides** — Phases 11-19 (shipped 2026-04-13)
- ✅ **v1.0 Autopilot Documentation & Troubleshooting Guides** — Phases 1-10 (shipped 2026-04-10)

## Phases

<details>
<summary>✅ v1.0–v1.16 (Phases 1-125) — SHIPPED</summary>

Full per-phase details are archived in `.planning/milestones/` (one `vX.Y-ROADMAP.md` per milestone) and summarized in `.planning/MILESTONES.md`.

- ✅ **v1.16 EEE SOP Documentation-Standard Retrofit (Phase-2) + Pipeline/Structural Shelf-Clearing** (Phases 120-125) — SHIPPED 2026-07-10 — `.planning/milestones/v1.16-ROADMAP.md`
- ✅ **v1.15 EEE SOP Documentation-Standard Retrofit (Phase-1)** (Phases 113-119) — SHIPPED 2026-07-06 — `.planning/milestones/v1.15-ROADMAP.md`
- ✅ **v1.14 802.1X Network Authentication Documentation + Backlog & Tooling Closure** (Phases 101-112) — SHIPPED 2026-07-02 — `.planning/milestones/v1.14-ROADMAP.md`
- ✅ **v1.13 macOS Platform SSO Admin-Setup Documentation Accuracy & Depth** (Phases 96-100) — SHIPPED 2026-06-29 — `.planning/milestones/v1.13-ROADMAP.md`
- ✅ **v1.12 macOS MDM-Migration Verification Closure** (Phases 94-95) — SHIPPED 2026-06-26 — `.planning/milestones/v1.12-ROADMAP.md`
- ✅ **v1.11 macOS PSSO End-to-End Provisioning & MDM Migration** (Phases 89-93) — SHIPPED 2026-06-26 — `.planning/milestones/v1.11-ROADMAP.md`
- ✅ v1.0–v1.10 (Phases 1-88) — see milestone entries and `.planning/milestones/`

</details>

### v1.17 Docs-Library .docx Publish-Bundle Pipeline (SharePoint / Copilot Upload Automation) — Phases 126-128

- [ ] **Phase 126: Publish-Bundle Pipeline + Guard-Blocker Corpus Fixes** — Batch-convert the entire Approved corpus to guard-clean `.docx`, fold in the two known guard blockers, and emit one versioned, manifest-bearing, upload-ready `docs-library-v1.17.zip`
- [ ] **Phase 127: Automated Milestone-Completion Trigger** — Regenerate the publish bundle automatically at milestone close by invoking the Phase-126 pipeline, degrading gracefully when prerequisites are absent (carries the dominant automated-trigger gray area)
- [ ] **Phase 128: V116 Pin + 15th Path-A Lineage Bump + Terminal Close** — Freeze the v1.16 corpus with the mandatory V116 back-anchor pin, bump the audit-harness lineage, and close via 3-axis terminal re-audit (sole deliverable of the closing cluster)

## Phase Details

### Phase 126: Publish-Bundle Pipeline + Guard-Blocker Corpus Fixes

**Goal**: A deterministic batch orchestrator converts every registry `Status: Approved` doc to `.docx`, guards each one fail-closed, and — on a clean pass — emits a single versioned `docs-library-v1.17.zip` (flat, descriptively-named, with a coverage manifest and asserted registry parity). The two known `guard-docx.mjs` blockers are folded in so the full Approved corpus guards clean end-to-end rather than tripping the fail-closed gate on pre-existing debt.
**Depends on**: Nothing (first phase of v1.17; builds directly on the existing v1.15/v1.16 pipeline surface — `scripts/pipeline/convert.ps1`, `guard-docx.mjs`, `build-filename-map.mjs`, `filename-map.md`, `docs/_registry/RE-index.md`)
**Requirements**: PUB-01, PUB-02, PUB-03, PUB-04, HYG-02, HYG-03
**Success Criteria** (what must be TRUE):

  1. Running the orchestrator converts **every** `docs/_registry/RE-index.md` `Status: Approved` doc (221 today) to `.docx` via `convert.ps1` (pandoc 3.7.0.2 + Word reference doc + the v1.16 PIPE-03 YAML-alias temp-copy fix), each named from `scripts/pipeline/filename-map.md`, emitted flat into a build directory; Draft/Pending and unregistered `docs/` files are excluded by construction and the excluded/included counts are logged
  2. `guard-docx.mjs` runs on **every** converted `.docx` and the pipeline **fails closed** (non-zero exit, no zip produced) if any doc leaks YAML frontmatter, carries a stale custom-property key, or has a wrong heading style — and with the HYG-02 + HYG-03 fixes applied, `guard-docx.mjs` exits 0 on all 221 converted `.docx`
  3. `docs/_glossary-android.md` (RE-179) no longer carries the stale `phase_46_wave2_retrofit` frontmatter key (closes `DEFER-125-06-A`) and the 9 `DEFER-121-07-A` Version-History `YYYY-MM-DD` placeholders (2 glossaries + 7 lifecycle files) are filled with real dates so no literal `YYYY-MM-DD` remains in the Approved corpus (closes `DEFER-121-07-A`) — both reformat-only, `last_verified` untouched, no freshness clock reset
  4. On a clean guard pass the pipeline emits a single versioned `docs-library-v1.17.zip` with a flat internal layout of descriptively-named `.docx` (citation title = filename) plus an in-zip manifest (RE-ID → output filename → status); the pipeline asserts **registry parity** (every Approved row appears exactly once, no missing docs, no orphan files) and logs the count so a partial bundle can never masquerade as complete**Plans**: 2 plans

**Wave 1**

- [ ] 126-01-PLAN.md — HYG-02 5-file stale-key removal + HYG-03 verify + convert.ps1 .tmp-leak fix (guard-blocker corpus fixes)

**Wave 2** *(blocked on Wave 1 completion)*

- [ ] 126-02-PLAN.md — batch publish-bundle orchestrator: convert 221 Approved docs, fail-closed guard, versioned zip + CSV manifest + registry parity (PUB-01..04)

**UI hint**: no
**Discuss-phase flags** (resolve via `/gsd-discuss-phase` + `/adversarial-review`, NOT at roadmap): zip artifact location + retention (committed vs. gitignored `build/`/`dist/` vs. release asset; per-milestone vs. overwrite-latest); manifest format + contents (Markdown vs. JSON vs. CSV; which columns; whether a top-level upload-instructions README is bundled); batch conversion performance/resilience (221 sequential `convert.ps1` calls vs. batched/parallel; per-doc failure isolation vs. fail-fast; incremental vs. always-full — ties to the PUB-02 fail-closed contract); HYG-03 date-fill policy (original reformat commit date per file vs. single v1.17 fill date vs. `last_verified`; confirm no freshness-clock reset per v1.15 D2/META-04); publish-set boundary confirmation (reconfirm registry `Status: Approved` = exact publish set; silent Draft/Pending exclusion with a recorded exclusion count)

### Phase 127: Automated Milestone-Completion Trigger

**Goal**: The publish bundle regenerates automatically at milestone completion with no manual step — closing a milestone produces/refreshes `docs-library-vX.Y.zip` by invoking the Phase-126 PUB pipeline. The mechanism mirrors the existing Jira milestone hook pattern (under `.claude/hooks/` + gitignored `settings.local.json` activation), degrades gracefully when its prerequisites (pandoc, Node) are absent, and must not block or corrupt the milestone-close flow.
**Depends on**: Phase 126 (the PUB pipeline must exist and be green before it can be auto-invoked at close)
**Requirements**: HOOK-01
**Success Criteria** (what must be TRUE):

  1. A milestone-close event automatically invokes the Phase-126 PUB pipeline and produces/refreshes `docs-library-vX.Y.zip` with no manual operator step
  2. The trigger/detection mechanism (a STATE-inspecting Stop-hook like the Jira milestone hook vs. a git post-tag/post-commit hook keyed on the `vX.Y` tag vs. folding the invocation into the close-gate phase — resolved at discuss-phase via `/adversarial-review`) is implemented under `.claude/hooks/` with gitignored `settings.local.json` activation, following the existing Jira-hook pattern
  3. The mechanism degrades gracefully when prerequisites (pandoc, Node) are absent — it does not block, fail, or corrupt the milestone-close flow — proven by an absent-prerequisite / dry-run test

**Plans**: TBD
**UI hint**: no
**Discuss-phase flags** (resolve via `/gsd-discuss-phase` + `/adversarial-review`, NOT at roadmap): **automated-trigger detection mechanism (DOMINANT design gray area, HOOK-01)** — STATE-inspecting Stop-hook (mirrors the Jira milestone hook) vs. git `post-tag`/`post-commit` hook keyed on the `vX.Y` tag or `MILESTONE CLOSE` commit vs. folding the invocation directly into the close-gate phase; trade-offs across visibility, gate-on-failure, Windows-local pandoc portability, and not corrupting the close flow

### Phase 128: V116 Pin + 15th Path-A Lineage Bump + Terminal Close

**Goal**: The V116 back-anchor pin freezes the v1.16 corpus, the 15th Path-A audit-harness lineage bump ships, and the milestone closes via a 3-axis terminal re-audit — the sole deliverable of this phase, mirroring v1.13 Phase 100 / v1.14 Phase 112 / v1.15 Phase 119 / v1.16 Phase 125 exactly (never batches with pipeline, hook, or content work).
**Depends on**: Phase 127 (all pipeline + auto-trigger work must be complete and green before the closing lineage bump + re-audit)
**Requirements**: HARN-08, HARN-09, HARN-10
**Success Criteria** (what must be TRUE):

  1. `scripts/validation/_lib/frozen-at-close.mjs` gains a `V116: '<v1.16 close-gate SHA>'` entry (recovered via `git log --all --grep="MILESTONE-AUDIT" --grep="MILESTONE CLOSE" --all-match -1 --format=%H`, positive-confirmation method per the V114/V115 precedent) + a `readAtV116Close` export, following the V18..V115 single-entry pattern — freezing the v1.16 corpus as the MANDATORY back-anchor invariant the v1.16 close deliberately deferred (`V116-PIN-DEFERRAL`)
  2. `v1.17-milestone-audit.mjs` (Path-A from v1.16, C1–C17 inherited) + `v1.17-audit-allowlist.json` + BASELINE_21 + `check-phase-126..NN.mjs` per-phase validators (chain-apex `CHAIN_PHASES=[48..(closephase-1)]`, continuing the `[48..N-1]` invariant) + the 14th parallel CI coexistence workflow (`audit-harness-v1.17-integrity.yml`) all ship; predecessor v1.4–v1.16 frozen surfaces remain byte-unchanged, except any predecessor content-assertion validator that reads a HYG-02/03-touched doc at live HEAD, which is converted frozen-aware (`readAtV116Close`) as in-scope close-gate remediation — NO value-masking, `CHAIN_SKIP` empty
  3. The milestone closes via a 3-axis terminal re-audit (fresh `git clone --no-hardlinks` + cross-OS Linux GHA authoritative for both chain validators per the D-03 OS split + fresh zero-context sub-agent) with cross-OS PASS/FAIL/SKIP **EXACT MATCH**
  4. A single close-gate commit flips all 10 v1.17 requirements to Validated across PROJECT / ROADMAP / STATE / REQUIREMENTS, with `v1.17-MILESTONE-AUDIT.md` + `v1.17-DEFERRED-CLEANUP.md` authored

**Plans**: TBD
**UI hint**: no
**Discuss-phase flags**: none (closing cluster; consumes prior decisions, does not open new gray areas)

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
| v1.16 EEE SOP Documentation-Standard Retrofit (Phase-2) + Pipeline/Structural Shelf-Clearing | 120-125 | ✅ Shipped | 2026-07-10 |
| v1.17 Docs-Library .docx Publish-Bundle Pipeline (SharePoint / Copilot Upload Automation) | 126-128 | 🔄 In progress | - |

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 126. Publish-Bundle Pipeline + Guard-Blocker Corpus Fixes | 0/TBD | Not started | - |
| 127. Automated Milestone-Completion Trigger | 0/TBD | Not started | - |
| 128. V116 Pin + 15th Path-A Lineage Bump + Terminal Close | 0/TBD | Not started | - |
