# Requirements: Windows Autopilot & macOS Provisioning Documentation Suite — Milestone v1.17

**Defined:** 2026-07-10
**Milestone:** v1.17 — Docs-Library .docx Publish-Bundle Pipeline (SharePoint / Copilot Upload Automation)
**Core Value:** IT teams can independently provision, troubleshoot, and manage Windows, macOS, iOS/iPadOS, Android, and Linux devices through Microsoft Intune / Entra ID without escalating to engineering — and find those answers as clean, correctly-cited results in the Copilot Studio / SharePoint knowledge base.
**Research basis:** None (tooling/pipeline milestone — no new domain). Scope is fully derived from the existing v1.15/v1.16 conversion pipeline (`scripts/pipeline/convert.ps1`, `guard-docx.mjs`, `build-filename-map.mjs`, `filename-map.md`, the deployment-policy README), the `docs/_registry/RE-index.md` registry (221 `Status: Approved` docs), and the v1.16 deferred backlog (`.planning/milestones/v1.16-DEFERRED-CLEANUP.md`). PIPE-02 empirical findings (citation-title = `.docx` filename; Draft = label not gate; only `.docx` indexed) carry forward from v1.15 Phase 113/119 and v1.16 Phase 124/125.
**Owner-confirmed scope (2026-07-10):** build the upload-ready zip only — the owner performs the SharePoint upload manually (no Graph/SharePoint auth surface this milestone). Publish set = registry `Status: Approved`; Draft/Pending auto-excluded. Fail-closed on `guard-docx.mjs`; the two known guard blockers are folded in so the Approved corpus guards clean. The bundle regenerates automatically at milestone completion.
**Gray-area picks:** deferred to `/gsd-discuss-phase` + `/adversarial-review` per project convention — see **Discuss-Phase Flags** below. The **automated milestone-completion trigger mechanism** is the dominant design gray area and is NOT resolved at roadmap.

---

## Milestone v1.17 Requirements

Requirements for this milestone. Each maps to exactly one roadmap phase (phases 126+). REQ-IDs continue project-wide conventions; numbering continues within each category prefix (HYG / HARN carry on from v1.16; PUB and HOOK are new). **The deliverable is `docs-library-vX.Y.zip` — a single upload-ready bundle of the entire publishable corpus as `.docx`.**

### Category: Publish-Bundle Pipeline (PUB, new)

*The hero cluster: a deterministic batch orchestrator that converts the Approved corpus to `.docx`, guards it fail-closed, and bundles it into one versioned, upload-ready zip with a coverage manifest.*

- [x] **PUB-01**: A batch orchestrator converts **every `docs/_registry/RE-index.md` `Status: Approved` doc** to `.docx` via `scripts/pipeline/convert.ps1` (pandoc 3.7.0.2 + Word reference doc + the v1.16 PIPE-03 YAML-alias temp-copy fix), naming each output from `scripts/pipeline/filename-map.md`, into a flat build directory. Draft/Pending docs and unregistered `docs/` files are excluded by construction.
- [x] **PUB-02**: The orchestrator runs `scripts/pipeline/guard-docx.mjs` on **every** converted `.docx` and **fails closed** — a non-zero exit with no zip produced — if any doc leaks YAML frontmatter, carries a stale custom-property key, or has a wrong heading style. No un-guarded `.docx` can reach the bundle.
- [x] **PUB-03**: On a clean guard pass, the pipeline emits a **single versioned `docs-library-vX.Y.zip`** with a flat internal layout of descriptively-named `.docx` files (citation title = filename), ready for one-shot SharePoint bulk upload.
- [x] **PUB-04**: The zip includes a **manifest** (RE-ID → output `.docx` filename → status) and the pipeline asserts **registry parity** — every Approved registry row appears exactly once in the bundle, with no missing docs and no orphan files — logging the count so a partial bundle can never masquerade as complete.

### Category: Guard-Blocker Corpus Fixes (HYG, continues v1.16 HYG-01)

*Two known `guard-docx.mjs` blockers in the Approved corpus, folded in so PUB-02 passes end-to-end rather than tripping on pre-existing debt.*

- [x] **HYG-02**: The stale `phase_46_wave2_retrofit` frontmatter key is removed from `docs/_glossary-android.md` (RE-179) so its converted `.docx` passes the `guard-docx.mjs` CUSTOM-PROPS check like its sibling glossaries. Closes `DEFER-125-06-A`. Reformat-only (harmless historical artifact; the retrofit it marked is long complete) — no content change, `last_verified` untouched.
- [x] **HYG-03**: The **unfilled Version-History `YYYY-MM-DD` date placeholders** (the 9 files logged as `DEFER-121-07-A`: 2 glossaries from Phase 121-04 + 7 lifecycle files from Phase 121-05) are filled with real dates, so no literal `YYYY-MM-DD` placeholder remains in the Approved corpus. Closes `DEFER-121-07-A`.

### Category: Automated Milestone-Completion Trigger (HOOK, new)

- [x] **HOOK-01**: The publish bundle **regenerates automatically at milestone completion** with no manual step — closing a milestone produces/refreshes `docs-library-vX.Y.zip` (invoking the PUB pipeline). The **detection/invocation mechanism** (a Stop-hook that inspects STATE like the existing Jira milestone hook, vs. a git post-tag hook on the `vX.Y` tag, vs. folding the invocation into the close-gate phase) is resolved at discuss-phase via `/adversarial-review`. The mechanism must degrade gracefully when its prerequisites (pandoc, Node) are absent and must not block or corrupt the milestone-close flow. Mirrors the existing Jira hook pattern under `.claude/hooks/` + gitignored `settings.local.json` activation.

### Category: V116 Pin + 15th Path-A Lineage Bump + Milestone Close (HARN, continues v1.16 HARN-05/06/07)

- [ ] **HARN-08**: The **V116 back-anchor pin** is added — `scripts/validation/_lib/frozen-at-close.mjs` gains a `V116: '<v1.16 close-gate SHA>'` entry + `readAtV116Close` export (recover the SHA via `git log --all --grep="MILESTONE-AUDIT" --grep="MILESTONE CLOSE" --all-match -1 --format=%H`), following the V18..V115 single-entry pattern. This **freezes the v1.16 corpus** — the mandatory back-anchor invariant that the v1.16 close deliberately left to its successor (`V116-PIN-DEFERRAL`).
- [ ] **HARN-09**: The **15th Path-A audit-harness lineage bump** — `v1.17-milestone-audit.mjs` (Path-A from v1.16, C1–C17 inherited) + `v1.17-audit-allowlist.json` + BASELINE_21 + `check-phase-126..NN.mjs` per-phase validators (chain-apex `CHAIN_PHASES=[48..(closephase-1)]`, continuing the `[48..N-1]` invariant) + the 14th parallel CI coexistence workflow (`audit-harness-v1.17-integrity.yml`). Predecessor v1.4–v1.16 frozen surfaces remain **byte-unchanged** (except the 2 guard-motivated content edits in HYG-02/03, which are content docs, not frozen validator/harness surfaces); any predecessor content-assertion validator that reads a HYG-touched doc at live HEAD is converted frozen-aware (`readAtV116Close`) as in-scope close-gate remediation — NO value-masking, `CHAIN_SKIP` empty.
- [ ] **HARN-10**: The milestone closes via a **3-axis terminal re-audit** (fresh `git clone --no-hardlinks` + cross-OS Linux GHA authoritative for both chain validators per the D-03 OS split + fresh zero-context sub-agent; cross-OS PASS/FAIL/SKIP **EXACT MATCH**), in a single close-gate commit flipping all v1.17 requirements to Validated across PROJECT / ROADMAP / STATE / REQUIREMENTS, with `v1.17-MILESTONE-AUDIT.md` + `v1.17-DEFERRED-CLEANUP.md` authored.

---

## Discuss-Phase Flags (resolve per-phase via `/adversarial-review`, NOT at roadmap)

Gray-area scoping decisions deferred to `/gsd-discuss-phase` per project convention:

1. **Automated-trigger detection mechanism (dominant, HOOK-01 — Phase 127)** — a Stop-hook that inspects STATE for the milestone-close transition (mirrors the existing Jira milestone hook) vs. a git `post-tag` / `post-commit` hook keyed on the `vX.Y` tag or the `MILESTONE CLOSE` commit vs. folding the invocation directly into the close-gate phase. Trade-offs: visibility, gate-on-failure, portability (Windows-local pandoc), and not corrupting the close flow. Via `/adversarial-review`.
2. **Zip artifact location + retention (Phase 126)** — where `docs-library-vX.Y.zip` lands and whether it is committed to the repo, written to a gitignored `build/`/`dist/` dir, or emitted as a release asset; per-milestone retention vs. overwrite-latest. (Large binary-in-git hazard vs. easy retrieval.)
3. **Manifest format + contents (Phase 126)** — Markdown vs. JSON vs. CSV inside the zip; which columns (RE-ID, filename, status, `last_verified`, source path, checksum); whether a top-level `README`/upload-instructions file is bundled alongside.
4. **Batch conversion performance/resilience (Phase 126)** — 221 sequential `convert.ps1`/pandoc invocations vs. a batched/parallelized single pass; per-doc failure isolation vs. fail-fast; incremental (only-changed) rebuild vs. always-full. Ties to PUB-02's fail-closed contract.
5. **HYG-03 date-fill policy (Phase 126)** — which date to write into the unfilled Version-History placeholders (the original reformat commit date recovered per file vs. a single v1.17 fill date vs. the file's `last_verified`), and confirmation that the fill does not reset any freshness clock (v1.15 D2/META-04 rule).
6. **Publish-set boundary confirmation (Phase 126)** — reconfirm at plan time that registry `Status: Approved` is the exact publish set (today 221 = all registered), and how the pipeline behaves when a future milestone leaves docs at `Draft`/`Pending` (must silently exclude, per deployment policy, and the manifest must record the exclusion count).

---

## Future Requirements

Deferred to a future milestone. Tracked but not in the v1.17 roadmap.

### Deployment / Infra

- **Auto-upload to SharePoint** — push the bundle to the SharePoint document library via Graph API (needs app registration + `Sites.ReadWrite.All` + secret handling). Deferred — owner uploads manually this milestone; revisit if manual upload becomes a bottleneck.
- **SharePoint content-approval Draft gating** — if `Status: Draft` must actually GATE retrieval (not just label), enable + maintain SharePoint content approval on the indexed library (tenant/ops config). Carried from v1.15/v1.16.
- **Azure AI Search structured index** — upgrade from the native SharePoint knowledge source to Azure AI Search + SharePoint indexer to make `platform`/`doc_type` filterable metadata. Carried from v1.14/v1.15/v1.16.

### Durable tooling debt

- **O(n²) chain-runner subprocess-caching rewrite** (`O(n²)-CHAIN-RUNNER-REMEDIATION-01`) — the durable fix for `WINDOWS-CLONE-DEEPNEST-TIMEOUT-01`; increasingly attractive as the chain deepens past `[48..124]`. Mitigated by Linux-GHA-sole-authoritative chain apex; non-blocking.
- **Broad frozen-aware adoption sweep** (`LATENT-NON-FROZEN-AWARE-CONTENT-ASSERTION-01` / `FROZEN-AWARE-ADOPTION-SWEEP-01`) — proactively convert the remaining predecessor content-assertion validators to frozen-aware reads rather than only the ones that break each milestone.

---

## Out of Scope

Explicitly excluded. Documented to prevent scope creep.

| Feature | Reason |
|---------|--------|
| Automatic SharePoint upload (Graph API) | Owner-confirmed build-only this milestone; auth surface (app reg + secret) is a separate deployment concern → Future |
| Converting/adding new content docs | Tooling/pipeline milestone — no content authoring; the corpus is frozen except the 2 guard-motivated HYG fixes |
| Including Draft/Pending or unregistered docs in the bundle | Publish set = registry `Status: Approved`; matches the "only Approved is indexed" deployment policy |
| Mirroring the `docs/` tree inside the zip | Flat + descriptive filenames chosen (citation title = filename); SharePoint flattens on upload anyway |
| CI-3 Managed Apple ID → Managed Apple Account rename | Trigger-gated on the Intune portal rebrand; byte-unchanged hazard — carried forward, not this milestone |
| Net-new content domains (MTPSSO, KRBFUT, AOSP-wired 802.1X, Cloud PKI, ASM, Apple Business Device API) | Carried content backlog; unrelated to the publish-pipeline goal |
| SharePoint content-approval / Azure AI Search infra | Ops/infra escalation levers → Future |

---

## Traceability

Which phases cover which requirements. Populated during roadmap creation (2026-07-10).

| Requirement | Phase | Status |
|-------------|-------|--------|
| PUB-01 | Phase 126 | Complete |
| PUB-02 | Phase 126 | Complete |
| PUB-03 | Phase 126 | Complete |
| PUB-04 | Phase 126 | Complete |
| HYG-02 | Phase 126 | Complete |
| HYG-03 | Phase 126 | Complete |
| HOOK-01 | Phase 127 | Complete |
| HARN-08 | Phase 128 | Pending |
| HARN-09 | Phase 128 | Pending |
| HARN-10 | Phase 128 | Pending |

**Coverage:**
- v1.17 requirements: 10 total
- Mapped to phases: 10 ✓ (Phase 126: 6 · Phase 127: 1 · Phase 128: 3)
- Unmapped: 0 ✓

---
*Requirements defined: 2026-07-10*
*Last updated: 2026-07-10 after v1.17 roadmap creation (traceability mapped to Phases 126-128)*
