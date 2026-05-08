# Phase 60: Audit Harness v1.5 Finalization - Research

**Researched:** 2026-05-06
**Domain:** Static-analysis audit harness calibration; sidecar JSON exemption mechanisms; broken-link triage; validator-as-deliverable; atomic-commit cascade across single source-of-truth audit script
**Confidence:** HIGH — all major claims verified against the live repo state at HEAD `2b68d0e`; harness 12/12 PASS confirmed via subprocess; BASELINE_9 self-test FAIL reproduced; C11 corpus scan produced exact 6-hit set; .mlc-config.json + 13 check-phase-NN.mjs files inventoried.

## Summary

Phase 60 is the **calibration-and-finalization** phase for the v1.5 audit harness. It ships almost no new content: ~30 LOC of harness diff (4 promotions + 6 H2 anchor sub-checks for C12 expansion), 3 new sidecar JSON arrays (`c9_exemptions[]`, `c11_ops_exemptions[]` reserved-empty, `c13_broken_link_allowlist[]` with 15 entries), 56 anchor/path bug-fixes against the Phase 48 baseline inventory (51 Category A + 5 Category B), 1 BASELINE_9 refresh closing AUDIT-07, and 1 new `check-phase-60.mjs` validator file. The work pattern is well-established: D-NN decisions in CONTEXT.md commit to a mixed atomic-commit + progressive-landing structure (Phase 43 D-07 atomicity-contract + Phase 58 cluster-edit precedent).

The technical surface is small but high-precision. The **central calibration knob** is the C11 proximity-window keyword set — corpus verification confirms all 6 currently-hit lines pass the proposed `/successor|deprecated|historical|disambiguation|mutual-exclusion|PITFALL-9|first-occurrence|callout/i` window in this research session, so D-01's hypothesis holds. The **central risk** is PITFALL-12 line-shift cascade: only `_glossary-android.md:16` (Knox `#kme`/`#kpe` anchor target) sits in pin territory, which is well-isolated and addressable by running `regenerate-supervision-pins.mjs --report` before that single anchor-fix commit lands. The **central trap** is C9 promotion without exemption mechanism wiring — the harness currently sources patterns from sidecar but ignores hit locations, returning informational PASS unconditionally; Phase 60 must wire the C7-pattern `allowKey`-set + bare-count-with-pin-exempt loop **AND** populate `c9_exemptions[]` from a corpus calibration scan **AND** flip `informational: true` removal in the same atomic commit, or C9 will ship blocking with no escape valve.

**Primary recommendation:** Follow CONTEXT.md D-20 plan order verbatim. Step 1 (calibration corpus scan → 60-CALIBRATION.md) is non-negotiable — it produces the exemption-pinning evidence required to land Step 4 (atomic harness commit) safely. Steps 2-3 (anchor-fix and path-fix progressive-landing) MUST run `regenerate-supervision-pins.mjs --report` before the `_glossary-android.md:16` cluster lands. Step 4 is one ATOMIC commit (per Phase 43 D-07) bundling all four promotions, four sidecar additions, BASELINE_9 refresh, and 48-VERIFICATION-broken-links.md Triage Decision column population. Step 5 ships `check-phase-60.mjs`.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**C11 promotion mechanism (Gray Area 1 — pattern refinement, C1-symmetric)**
- **D-01:** PROMOTE C11 from informational → blocking. Mechanism = pattern refinement with C1-symmetric proximity-window negation (Option 1B). Mirror v1.5-milestone-audit.mjs:206-209 C1 SafetyNet pattern: each C11 hit must check a ±200-char window for legitimate-context regex `/successor|deprecated|historical|disambiguation|mutual-exclusion|PITFALL-9|first-occurrence|callout/i` (final keyword list refined at plan time against Phase 53/54/55/56 corpus). Hits within window → exempt; hits outside window → FAIL.
- **D-02:** Retain `c11_ops_exemptions[]` as RESERVED sidecar array shape (per Phase 42 D-26 `{file, line, reason}` contract) for residual file:line edge cases that escape the proximity window. Initial population = 0 entries. Lazy-add per Phase 48 D-15 when first non-windowed legitimate occurrence appears in v1.6+ content.
- **D-03:** Retain current 4-pattern set (System Center / SCCM-near-Intune / Autopatch rings / SafetyNet-near-compliance). DO NOT expand to additional patterns (SCCM-bare, AMAPI-deprecation, Ubuntu-20.04-EOL). Pattern expansion is a v1.6+ concern (deferred).
- **D-04:** ROADMAP SC#1's "DDM deprecated-command, Ubuntu 20.04 EOL, Android AMAPI migration, SCCM/ConfigMgr disambiguation prose" list is the **exemption-target schema**, not the **pattern-target schema**. Proximity-window negation (D-01) covers all 4 exemption surfaces; explicit `c11_ops_exemptions[]` pinning is unnecessary at promotion time.
- **D-05:** Live calibration verification: 6 currently-hit lines (`docs/operations/patch-management/00-overview.md:77,82,85` + `01-windows-wufb-rings.md:60,63,75`) MUST all pass via proximity-window keyword match. If any of the 6 lines fall outside the window after refinement, add to `c11_ops_exemptions[]` in the same atomic commit as the C11 promotion.

**C13 triage disposition (Gray Area 2 — fix-everything-now, scope-balloon justified)**
- **D-06:** PROMOTE C13 from informational → blocking. Triage strategy = fix-everything-now (Option 2A). Phase 60 closes the entire 75-finding Phase 48 baseline inventory: fix all 51 Category A broken anchors, fix all 5 Category B broken file paths, allowlist 6 transient external URLs, allowlist 9 template-placeholder stubs.
- **D-07:** Of 51 Category A anchor-target fixes, only `_glossary-android.md:16` (`#kme`/`#kpe`) sits in `supervision_exemptions[]` / `safetynet_exemptions[]` / `c7_knox_allowlist[]` pinned territory. The other 50 anchor fixes are in `l1-runbooks/{02,11,12,13,14,21,25,27,28,29}.md` + `l2-runbooks/{21,22,23}.md` + `_templates/admin-template-ios.md`. Plan must run `regenerate-supervision-pins.mjs --report` BEFORE the anchor-fix commit lands; if `_glossary-android.md:16` shifts, refresh pin coordinates in the SAME atomic commit per Phase 48 D-14.
- **D-08:** Anchor-fix pattern (51 Category A): rewrite the anchor reference to point at an existing H2/H3 slug; OR add explicit `<a id="…"></a>` shim. Cluster-edit pattern: each l1/l2-runbook holds 3-5 broken anchors in a quick-nav TOC block — single-edit-per-file is feasible.
- **D-09:** Broken-path-fix pattern (5 Category B entries): per-finding triage at plan time (re-link vs delete dead ref).
- **D-10:** Allowlist seeding shape — new `c13_broken_link_allowlist[]` sidecar array per `{file, line, target, reason, category}` contract. 15 entries seeded at Phase 60 close (6 transient_external + 9 template_placeholder).
- **D-11:** AUDIT-08 close — 48-VERIFICATION-broken-links.md `Triage Decision` column populated with `FIXED-PHASE-60` (51+5 entries) or `ALLOWLISTED-c13_broken_link_allowlist` (6+9 entries). Audit-trail preserved; Phase 48 baseline marker NOT erased.
- **D-12:** Phase 60 second-pass sweep verifies post-fix count == 0 NEW findings (allowlisted ones excluded). Any net-new finding from Phase 49-59 is a REGRESSION and MUST be fixed in Phase 60 close.

**C12 scope expansion shape (Gray Area 3 — named-anchor verification)**
- **D-13:** EXPAND C12 scope per ROADMAP SC#2 = assert specific 6 H2 anchor names (Option 3B). Verify `docs/reference/4-platform-capability-comparison.md` contains all 6 named H2 headings: `## Enrollment` / `## Configuration` / `## App Deployment` / `## Compliance` / `## Software Updates` / `## Conditional Access` (verbatim regex per heading).
- **D-14:** DO NOT add sibling-matrix `#conditional-access` regression-guard. `check-phase-58.mjs` V-58-25 already covers the 4 sibling-matrix retrofit.
- **D-15:** DO NOT add per-row data-cell column-count assertion. Phase 58 V-58-07 + harness existing `extractCanonicalDataCells()` semantics already enforce link-not-copy.
- **D-16:** Anchor verification pattern in harness — append 6 new sub-checks inside C12's `run()` after the existing platform-column + link-not-copy logic (around v1.5-milestone-audit.mjs:548). Each H2 heading regex is `^## <Name>$/m` against full file content.

**C9 + AUDIT-07 carry-over close (Gray Area 4 — promote-and-close in Phase 60)**
- **D-17:** PROMOTE C9 from informational → blocking in Phase 60. Atomic commit covers C9 + C11 + C13 promotions together. Honors Phase 48 D-06 documented promotion target.
- **D-18:** Add `c9_exemptions[]` sidecar array per `{file, line, reason}` contract. C9 currently lacks an exemption mechanism. Plan must:
  - (a) Add C9 exemption-mechanism wiring in harness (mirror C7's `allowKey` set + bare-count loop).
  - (b) Run a pre-promotion corpus scan against Phase 53–56 content + `docs/admin-setup-android/**/*.md`; record hits.
  - (c) For each legitimate hit, pin in `c9_exemptions[]` with reason citing Phase 53/54/55/56 commit + PITFALL-13 disambiguation.
  - (d) Verify C9 PASSES blocking mode against Phase 53–56 corpus before commit.
- **D-19:** CLOSE AUDIT-07 in Phase 60. Refresh `regenerate-supervision-pins.mjs:393-403` BASELINE_9 to current sidecar-pin coordinates so `--self-test` exits 0. Land in same atomic commit as harness changes.
- **D-20:** ATOMIC HARNESS COMMIT bundles C9/C11/C13 promotions + C12 expansion + sidecar adds + BASELINE_9 refresh + 48-VERIFICATION close-out. Phase 60 plan order:
  1. Phase 53/54/55/56 corpus scan for C9 + C11 calibration (read-only; produces a `60-CALIBRATION.md` artifact)
  2. Anchor-fix commits for 51 Category A entries (cluster-edit per file; 9-12 commits)
  3. Path-fix commits for 5 Category B entries (per-file; 5 commits)
  4. ATOMIC HARNESS COMMIT
  5. check-phase-60.mjs validator commit
  6. (Optional) ROADMAP SC#5 wording fix

**check-phase-60.mjs validator scope**
- **D-21:** Author per Phase 30/31/48 file-reads-only validator-as-deliverable pattern. Assertions to ship:
  - V-60-01..04: harness file contains `informational: false` (or absent flag) for C9/C11/C13/C12 (4 assertions)
  - V-60-05: `c9_exemptions[]` array exists in sidecar (>= 0 entries; lazy-add OK)
  - V-60-06: `c11_ops_exemptions[]` array exists in sidecar (>= 0 entries; reserved)
  - V-60-07: `c13_broken_link_allowlist[]` array exists with 15 entries (6 transient_external + 9 template_placeholder)
  - V-60-08: 48-VERIFICATION-broken-links.md Triage Decision column populated for all 75 entries
  - V-60-09: BASELINE_9 in regenerate-supervision-pins.mjs has been refreshed since 2026-04-26
  - V-60-10: regenerate-supervision-pins.mjs --self-test exits 0
  - V-60-11: docs/reference/4-platform-capability-comparison.md contains all 6 named H2s
  - V-60-12..23: 12 NEGATIVE regression-guards confirming Phase 49-59 V-NN-NN structural assertions still pass
  - V-60-24: 60-CALIBRATION.md artifact exists in phase dir
  - V-60-25: pre-Phase-60 broken-link inventory baseline preserved (`Total findings: 75` byte-identical pre/post)
- **D-22:** Validator runs from repo root via `node scripts/validation/check-phase-60.mjs [--verbose]`. CI registers via existing slot at audit-harness-v1.5-integrity.yml:261-275.

**CI workflow registration**
- **D-23:** Phase 60 SC#5 wording (ROADMAP:401: "registered in CI workflow `audit-harness-integrity.yml`") references the FROZEN v1.4 + v1.4.1 yml. All v1.5 validators (48-60) live in the parallel `audit-harness-v1.5-integrity.yml`. Surface SC#5 textual contradiction in 60-VERIFICATION.md and propose ROADMAP.md SC#5 wording correction.
- **D-24:** No NEW yml edits required — `check-phase-60.mjs` slot already exists; landing the file activates the slot.

**Plan structure + atomicity**
- **D-25:** Plan structure = mixed atomic-commit + progressive-landing. Anchor-fix and path-fix commits land per file. Harness change commit is single ATOMIC commit. Plan-author estimates 14-18 commits total.
- **D-26:** All Phase 49-59 V-NN-NN structural assertions MUST remain PASS post-Phase-60-close. Pre-commit gate: run check-phase-{48..59}.mjs + v1.5-milestone-audit.mjs --verbose + check-phase-60.mjs before atomic harness commit.

**Calibration corpus scan (60-CALIBRATION.md artifact)**
- **D-27:** Pre-promotion calibration step produces `.planning/phases/60-audit-harness-v1-5-finalization/60-CALIBRATION.md` with two sections: (a) C9 corpus scan; (b) C11 corpus scan with proximity-window evaluation result.
- **D-28:** Calibration step is a READ-ONLY analysis commit produced BEFORE harness changes.

### Claude's Discretion

- Final keyword list for C11 proximity window in D-01 — starting set is `/successor|deprecated|historical|disambiguation|mutual-exclusion|PITFALL-9|first-occurrence|callout/i`; refine at plan time against the live calibration scan output. Adding/removing keywords in the same atomic commit is allowed.
- Per-finding fix vs delete-ref disposition for the 5 Category B broken paths in D-09. Plan author triages each at plan time.
- Anchor-fix mechanism per Category A finding in D-08 — rewrite-ref vs `<a id>`-shim. Per-finding choice.
- BASELINE_9 refresh implementation detail in D-19 — generated-from-current-pins script run vs hand-edit. Phase 43 lineage favors script-generated; if regenerate-supervision-pins.mjs has a `--regenerate-baseline` mode, use it; else hand-edit.
- ROADMAP SC#5 wording fix in D-23 — fix in same commit as harness OR as a separate trailing commit. Phase author preference.
- Pre-commit hook tooling for advisory pin-drift (Phase 48 D-21 advisory hook) is already in place; no Phase 60 work.

### Deferred Ideas (OUT OF SCOPE)

- **C11 pattern expansion to SCCM-bare / AMAPI-deprecation / Ubuntu-20.04-EOL surfaces** — v1.6+; expansion is sidecar-driven via `c11_ops_patterns[]` array (already exists at v1.5-milestone-audit.mjs:484); no harness JS edit needed.
- **`c11_ops_exemptions[]` lazy population** — Reserved-empty at Phase 60 close per D-02.
- **`c9_exemptions[]` lazy expansion** — Pre-promotion corpus scan (D-27) may seed 0-N entries.
- **Sibling-matrix `#conditional-access` regression-guard duplication in C12** — rejected per D-14.
- **Per-row data-cell column-count assertion in C12** — rejected per D-15.
- **Pre-commit hook hard-block for pin-drift** (Phase 48 D-22 promotion ladder) — pre-commit is currently advisory-only.
- **`broken_link_external_allowlist[]` array** (Phase 48 D-15 explicit rejection) — Phase 60 D-10 adds `c13_broken_link_allowlist[]` instead.
- **`audit-harness-v1.5-integrity.yml` archive lifecycle at v1.6 milestone-start** — Phase 48 D-19 deferred.
- **iOS/macOS/Windows admin template `last_verified` normalization** — Phase 48 deferred carry-over (Android-scope lock).
- **"Choose Your Platform" Linux + Operations bullets in docs/index.md** — Phase 59 deferred TODO; Phase 61 or v1.6.
- **ROADMAP SC#5 wording fix** (D-23) — may defer to Phase 61 close at user's preference.
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| AUDIT-03 | C11 ops-domain anti-pattern check ships informational-first; promotes to blocking at Phase 60 once ops-domain content stabilizes | "Standard Stack" + "Architecture Patterns" sections specify proximity-window negation pattern (C1-symmetric); "Code Examples" provides verbatim snippet of the C1 pattern at v1.5-milestone-audit.mjs:200-219 to mirror for C11. Live corpus scan (this research) confirms all 6 currently-hit lines pass the D-01 keyword window. |
| AUDIT-04 | C12 4-platform comparison structural validation — informational-first; blocking when file exists; **Phase 60 expands scope to verify 5 platform columns + 6 domain H2 anchors** | C12 already promoted blocking at Phase 58 (Plan 58-06 commit `bc9cee6` removed `informational: true`). Phase 60 expansion = 6 H2 named-anchor sub-checks (D-13/D-16). "Architecture Patterns" §C12 expansion shape documents the 6 H2 literal regex pattern + insertion point (after harness:548). |
| AUDIT-05 | C13 broken-link automation — informational-first; blocking after Phase 60 second-pass triage | "Common Pitfalls" §PITFALL-12 + §PITFALL-14 inform the triage strategy (`c13_broken_link_allowlist[]` for transient external URLs). "Code Examples" shows markdown-link-check invocation pattern + `.mlc-config.json` shape. 75-finding inventory triage matrix in §C13 Triage Plan. |
| AUDIT-06 | Each new v1.5 phase ships a `check-phase-NN.mjs` validator alongside content; CI workflow `audit-harness-v1.5-integrity.yml` registers each new validator | "Don't Hand-Roll" §validator-as-deliverable mandates the file-reads-only pattern from check-phase-30.mjs / 31.mjs / 58.mjs / 59.mjs. CI yml at lines 261-275 already has the lazy-skip slot — no yml edit needed (D-24). "Architecture Patterns" §validator-as-deliverable enumerates 25 V-60-NN assertions. |
| AUDIT-07 | `regenerate-supervision-pins.mjs --self-test` BASELINE_9 refreshed; --self-test exits 0 (carry-over from v1.4.1 close) | Live --self-test reproduction (this session) confirms FAIL = "Pins authored by Phase 43 that classifier did NOT emit (false-negative): docs/_glossary-android.md:79". "Common Pitfalls" §BASELINE_9 refresh documents the 9-baseline coordinate update mechanism at regenerate-supervision-pins.mjs:393-403. |
</phase_requirements>

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Static-analysis audit harness (4-promotion atomic) | Node.js `mjs` static script | JSON sidecar `v1.5-audit-allowlist.json` | Single-file harness contract (Phase 42 D-25 file-reads-only / no-shared-module); sidecar is the integration surface. |
| Sidecar JSON exemption mechanism (3 new arrays) | JSON `scripts/validation/v1.5-audit-allowlist.json` | Harness `parseAllowlist()` loader | Sidecar is data; harness is logic. Schema defined in v1.5-audit-allowlist.json; logic to apply it lives in harness `run()` per check. |
| Per-phase validator (`check-phase-60.mjs`) | Node.js `mjs` static script | CI workflow yml lazy-skip slot | File-reads-only validator-as-deliverable; runs from repo root via `node`. CI activates by file presence (graceful-degradation). |
| Broken-link sweep (markdown-link-check second pass) | npm tool (npx-invoked) | `.mlc-config.json` repo-root | Tool is external; config is repo-level. Sweep findings consumed by `48-VERIFICATION-broken-links.md` Triage Decision column. |
| BASELINE_9 self-test (`regenerate-supervision-pins.mjs`) | Node.js `mjs` static helper | Hardcoded `BASELINE_9` array | Self-test compares classifier output to the 9-pin pre-Phase-43 baseline; refresh = update array contents to match current sidecar coordinates. |
| Anchor-fix cluster-edit (51 Category A) | Markdown content (`docs/l1-runbooks/`, `docs/l2-runbooks/`, `docs/_templates/admin-template-ios.md`) | None | Each fix is a 1-line ref rewrite OR a 1-line `<a id>`-shim insertion; does not touch any other tier. |
| Path-fix per-file (5 Category B) | Markdown content (`docs/admin-setup-android/`, `docs/device-operations/`, `docs/l2-runbooks/`, `docs/reference/`) | None | Same shape as anchor-fix; per-file at plan-author discretion (re-link vs delete-ref). |
| 48-VERIFICATION-broken-links.md Triage Decision close-out | Markdown content (`.planning/phases/48-*/`) | None | Phase 48 D-11 disambiguation: VERIFICATION artifacts persist; Phase 60 populates the Triage Decision column atomically with harness commit. |
| ROADMAP SC#5 wording fix | Markdown content (`.planning/ROADMAP.md`) | None | Optional — same close-out pattern as Phase 48 D-09 SC#1 textual contradiction handling. |

## Standard Stack

### Core (already in repo, no install)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Node.js | v22.20.0 [VERIFIED: `node --version` this session] | Run all `.mjs` scripts | Project-locked runtime. Workflow yml uses Node 20 (`actions/setup-node@v4` with `node-version: '20'`); local dev runs Node 22. ES modules + lookbehind regex both supported on both. |
| `node:fs` | bundled | All file reads via `readFileSync` | Phase 42 D-25 file-reads-only / no-shared-module contract — every validator MUST use this; no fs-extra, no globby, no shelljs. |
| `node:path` | bundled | `join()` + `sep` for cross-platform path handling | Same constraint. CRLF normalization via `.replace(/\r\n/g, '\n')` is project-standard (see harness:46). |
| JSON.parse / JSON.stringify | bundled | Sidecar JSON read + write | `parseAllowlist()` at harness:71-79 wraps `JSON.parse` with degrade-to-empty-arrays per `_parseError` shape. Phase 60 reuses verbatim. |

### Supporting (already in repo, used in CI but not committed to package.json)

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `markdown-link-check` | 3.14.2 [CITED: 48-VERIFICATION-broken-links.md frontmatter line 5] | Broken-link sweep tool | Phase 60 second-pass invocation: `npx markdown-link-check --config .mlc-config.json -q docs/**/*.md`. Tool not in package.json; relied on via `npx` which auto-fetches at run time. CI uses Node 20 + npx flow. |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| `markdown-link-check` (npx) | `markdownlint-cli2`, `mdl`, custom regex-based scanner | `markdown-link-check` is the v1.5 standard per Phase 48 SUMMARY HIGH-MEDIUM confidence rating + 48-VERIFICATION-broken-links.md actual-tool-used. Switching breaks the diff-against-baseline (Phase 60 SC#3) — DO NOT switch. Use it. |
| Hardcoded BASELINE_9 array refresh | `--regenerate-baseline` mode in `regenerate-supervision-pins.mjs` | Phase 43 lineage favors script-generated where mode exists; helper currently has only `--report` / `--emit-stubs` / `--self-test`. Authoring a `--regenerate-baseline` mode is plan-author discretion (D-19) but adds a 4th mode — keep the existing 3-mode contract if hand-edit is feasible (current sidecar has 23 supervision pins; selecting 9 anchor pins for BASELINE_9 is a small hand-edit). |
| New yml file for Phase 60 validator slot | Existing `.github/workflows/audit-harness-v1.5-integrity.yml` lazy-skip slot | Slot exists at lines 261-275 (verified this session). No edit needed (D-24). |
| Hand-roll C11 proximity-window logic | Mirror C1 SafetyNet pattern at v1.5-milestone-audit.mjs:200-219 | C1 pattern is verified-working (C1 PASS today); copy verbatim with token swap from `SafetyNet` regex to ops-domain regex set + window keyword swap. |

**Installation:**

No new installs needed. `markdown-link-check` is invoked via `npx` (auto-fetches at run-time) and is already cached on dev machines from Phase 48.

**Version verification:**

```bash
node --version            # v22.20.0 (confirmed)
npx markdown-link-check --version  # 3.14.2 expected (matches Phase 48 sweep tool version per 48-VERIFICATION-broken-links.md frontmatter)
```

[VERIFIED: live subprocess `node --version` returned `v22.20.0`; CI yml uses `node-version: '20'` — both work for ES modules + lookbehind regex.]

## Architecture Patterns

### System Architecture Diagram

```
                       ┌─────────────────────────────────────────────┐
                       │ Phase 60 Atomic Harness Commit (D-20 step 4)│
                       └──────┬──────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┬─────────────────────┐
        ▼                     ▼                     ▼                     ▼
┌──────────────┐    ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────────┐
│ v1.5-audit-  │    │ v1.5-milestone-  │  │ regenerate-      │  │ 48-VERIFICATION-     │
│ allowlist    │    │ audit.mjs        │  │ supervision-     │  │ broken-links.md      │
│ .json        │    │                  │  │ pins.mjs         │  │                      │
│              │    │ • C9 promote     │  │ • BASELINE_9     │  │ • Triage Decision    │
│ • +c9_       │    │   + exempt loop  │  │   refresh (D-19) │  │   col populated      │
│   exemptions │    │ • C11 promote    │  │   (closes        │  │   (D-11)             │
│ • +c11_ops_  │    │   + window logic │  │   AUDIT-07)      │  │                      │
│   exemptions │    │ • C12 +6 H2 subs │  │                  │  │                      │
│ • +c13_      │    │ • C13 promote    │  │                  │  │                      │
│   broken_    │    │   + allowlist    │  │                  │  │                      │
│   link_      │    │   apply          │  │                  │  │                      │
│   allowlist  │    │                  │  │                  │  │                      │
│ • phase: 60  │    │                  │  │                  │  │                      │
└──────┬───────┘    └────────┬─────────┘  └────────┬─────────┘  └──────────┬───────────┘
       │                     │                     │                       │
       └─────loaded by───────┼──invokes────────────┴──invokes──────────────┤
                             │                                             │
                             ▼                                             │
                    ┌────────────────────┐                                 │
                    │ check-phase-60.mjs │  ◀─validates──── 25 V-60-NN ────┘
                    │ (file-reads-only)  │                  assertions
                    └────────┬───────────┘
                             │
                  registered via slot @ lines 261-275
                             │
                             ▼
              ┌─────────────────────────────────┐
              │ audit-harness-v1.5-integrity.yml│
              │ (CI; lazy-skip if absent)       │
              └─────────────────────────────────┘
                             │
                             │ activates by file presence
                             ▼
                ┌──────────────────────────┐
                │ Phase 61 Terminal Re-Audit │
                │ (fresh-clone GREEN gate) │
                └──────────────────────────┘

DATA FLOW (Phase 60 close-state):
  1. Calibration scan (read-only) → 60-CALIBRATION.md → seeds c9_exemptions[]
  2. Anchor-fix progressive commits (51 entries) → updates docs/**/*.md
  3. Path-fix progressive commits (5 entries) → updates docs/**/*.md
  4. ATOMIC harness commit → 4 files updated together
  5. check-phase-60.mjs commit → validator file added, CI slot activates
  6. (Optional) ROADMAP SC#5 wording-fix commit
```

### Recommended Project Structure (Phase 60 deliverables)

```
.planning/phases/60-audit-harness-v1-5-finalization/
├── 60-CONTEXT.md                       # exists (28 D-NN decisions)
├── 60-RESEARCH.md                      # this file
├── 60-PLAN.md                          # planner authors
├── 60-CALIBRATION.md                   # NEW per D-27 (read-only corpus scan)
├── 60-VERIFICATION.md                  # close-out
└── DISCUSSION-LOG.md                   # exists (adversarial-review trace)

scripts/validation/
├── v1.5-milestone-audit.mjs            # MODIFIED — atomic commit (4 promotions + C12 expansion)
├── v1.5-audit-allowlist.json           # MODIFIED — 3 new arrays + phase field update
├── regenerate-supervision-pins.mjs     # MODIFIED — BASELINE_9 array refresh
└── check-phase-60.mjs                  # NEW — 25 V-60-NN assertions

.planning/phases/48-audit-harness-bootstrap-broken-link-sweep-first-pass/
└── 48-VERIFICATION-broken-links.md     # MODIFIED — Triage Decision column populated

docs/
├── _glossary-android.md                # MODIFIED at line 16 — Knox #kme/#kpe anchor fix
├── _templates/admin-template-ios.md    # MODIFIED — anchor + path fixes
├── l1-runbooks/{02,11,12,13,14,21,25,27,28,29}-*.md  # MODIFIED — anchor fixes
├── l2-runbooks/{21,22,23}-*.md         # MODIFIED — anchor fixes
├── l2-runbooks/{03,04}-*.md            # MODIFIED — path fixes
├── admin-setup-android/{09,10,11,12,13}-aosp-*.md    # MODIFIED — Category B path fixes
├── device-operations/03-re-provisioning.md           # MODIFIED — path fix or delete-ref
└── reference/network-infrastructure.md               # MODIFIED — path fix or delete-ref
```

### Pattern 1: Proximity-Window Negation (C1-Symmetric, Phase 60 D-01 for C11)

**What:** Each pattern hit checks a ±200-char window for legitimate-context regex; in-window → exempt; out-of-window → FAIL.
**When to use:** C11 promotion to blocking. The harness already implements this for C1 SafetyNet at lines 200-219.
**Example (C1 SafetyNet — verbatim from v1.5-milestone-audit.mjs:200-219):**

```javascript
// Source: scripts/validation/v1.5-milestone-audit.mjs:200-219 [VERIFIED: read this session]
const re = /SafetyNet/g;
let m;
while ((m = re.exec(content)) !== null) {
  const idx = m.index;
  const lineNum = content.slice(0, idx).split('\n').length;
  const pinned = ALLOWLIST.safetynet_exemptions.some(
    e => e.file === relPath && e.line === lineNum
  );
  if (pinned) continue;
  const wStart = Math.max(0, idx - 200);
  const wEnd = Math.min(content.length, idx + 200 + 'SafetyNet'.length);
  const window = content.slice(wStart, wEnd);
  if (/successor|turned off|deprecated|Play Integrity/i.test(window)) continue;
  violations.push({ file: relPath, line: lineNum });
}
```

**C11 adaptation — apply per pattern within the existing 4-pattern set:**

```javascript
// PROPOSED: scripts/validation/v1.5-milestone-audit.mjs C11 promote-to-blocking shape
// Mirror C1 structure; cycle each of the 4 patterns over the docs/**/*.md scope
const c11Patterns = ALLOWLIST.c11_ops_patterns || [
  '\\bSystem Center\\b',
  '\\bSCCM\\b[^.]*\\bIntune\\b',
  '\\bAutopatch rings\\b',
  '\\bSafetyNet\\b[^.]*\\bcompliance\\b'
];
const opsAllowlist = ALLOWLIST.c11_ops_exemptions || [];
const opsAllowKey = new Set(opsAllowlist.map(e => e.file + ':' + e.line));
const violations = [];
for (const p of c11Patterns) {
  const re = new RegExp(p, 'gi');  // global+ignorecase for line iteration
  for (const abs of walkMd('docs')) {
    const relPath = relNormalize(abs);
    const content = readFile(relPath);
    if (!content) continue;
    let m;
    while ((m = re.exec(content)) !== null) {
      const idx = m.index;
      const lineNum = content.slice(0, idx).split('\n').length;
      if (opsAllowKey.has(relPath + ':' + lineNum)) continue;
      const wStart = Math.max(0, idx - 200);
      const wEnd = Math.min(content.length, idx + 200 + m[0].length);
      const window = content.slice(wStart, wEnd);
      if (/successor|deprecated|historical|disambiguation|mutual-exclusion|PITFALL-9|first-occurrence|callout/i.test(window)) continue;
      violations.push({ file: relPath, line: lineNum, pattern: p });
    }
  }
}
if (violations.length === 0) return { pass: true };
return {
  pass: false,
  detail: violations.length + ' un-exempted ops-domain anti-pattern hit(s): '
        + violations.slice(0, 3).map(v => v.file + ':' + v.line + ' (' + v.pattern + ')').join(', ')
};
```

[ASSUMED: that adding `gi` flag is non-disruptive vs current `i`-only test() usage — verified by code reading: current C11 uses `pat.test(c)` once-per-file, returning informational regardless. Phase 60 needs file-line-locality, so `g`-flag iteration is required. **NOT a regression** because C11 was informational-only.]

### Pattern 2: Sidecar Allowlist with `allowKey` Set + Bare-Count Loop (C7-Pattern, Phase 60 D-18 for C9)

**What:** Load allowlist into `Set` of `file:line` keys; iterate occurrences; skip when key matches.
**When to use:** C9 exemption mechanism wiring (D-18a). Mirrors C7 at v1.5-milestone-audit.mjs:392-415.
**Example (C7 Knox — verbatim from harness:392-415):**

```javascript
// Source: scripts/validation/v1.5-milestone-audit.mjs:392-415 [VERIFIED: read this session]
run() {
  const targets = androidDocPaths();
  const suffixes = /(Mobile Enrollment|Platform for Enterprise|...)/;
  const allowlist = ALLOWLIST.c7_knox_allowlist || [];
  const allowKey = new Set(allowlist.map(e => e.file + ':' + e.line));
  let bare = 0;
  for (const t of targets) {
    const c = readFile(t);
    if (!c) continue;
    const knoxRe = /\bKnox\b/g;
    let m;
    while ((m = knoxRe.exec(c)) !== null) {
      const window = c.slice(m.index, m.index + 50);
      if (!suffixes.test(window)) {
        const lineNum = c.slice(0, m.index).split('\n').length;
        if (!allowKey.has(t + ':' + lineNum)) bare++;
      }
    }
  }
  if (bare === 0) return { pass: true };
  return { pass: false, detail: bare + ' bare "Knox" occurrence(s) without SKU qualifier' };
}
```

**C9 adaptation:**

```javascript
// PROPOSED: scripts/validation/v1.5-milestone-audit.mjs C9 promote-to-blocking shape
run() {
  const bannedSource = (ALLOWLIST.cope_banned_phrases && ALLOWLIST.cope_banned_phrases.length)
    ? ALLOWLIST.cope_banned_phrases
    : [ '\\bCOPE\\b[^.]*\\bdeprecated\\b', '\\bCOPE\\b[^.]*\\bend of life\\b', '\\bCOPE\\b[^.]*\\bremoved\\b' ];
  const banned = bannedSource.map(p => new RegExp(p, 'gi'));
  const allowlist = ALLOWLIST.c9_exemptions || [];
  const allowKey = new Set(allowlist.map(e => e.file + ':' + e.line));
  const targets = androidDocPaths();
  const violations = [];
  for (const t of targets) {
    const c = readFile(t);
    if (!c) continue;
    for (const pat of banned) {
      let m;
      while ((m = pat.exec(c)) !== null) {
        const lineNum = c.slice(0, m.index).split('\n').length;
        if (allowKey.has(t + ':' + lineNum)) continue;
        violations.push({ file: t, line: lineNum });
      }
    }
  }
  if (violations.length === 0) return { pass: true };
  return {
    pass: false,
    detail: violations.length + ' un-exempted COPE banned-phrase hit(s): '
          + violations.slice(0, 3).map(v => v.file + ':' + v.line).join(', ')
  };
}
```

**Note on regex semantic:** Live calibration scan this session (against `cope_banned_phrases[]` 8-pattern set) found **4 file-level hits** with the `[^.]*` greedy regex — none are actual COPE deprecation prose. They are false positives where `COPE` appears in a sentence and a banned token appears later in the same paragraph (regex `[^.]*` matches anything-up-to-a-period, including newlines). **Pre-promotion calibration (D-27/D-28) MUST surface these and decide:** either pin in `c9_exemptions[]` (4 entries: `_glossary-android.md:196` + `admin-setup-android/03-fully-managed-cobo.md:149` + `android-lifecycle/03-android-version-matrix.md:37` + `reference/android-capability-matrix.md:50`), OR tighten regex to single-line scope (e.g., `[^.\n]*`). [VERIFIED: live corpus scan in this research session.] **HIGH-confidence claim.**

### Pattern 3: C12 6 H2 Anchor Sub-Checks (Phase 60 D-13 / D-16)

**What:** After existing C12 logic (platform-column + link-not-copy), append 6 sub-checks asserting each H2 heading exists.
**When to use:** Phase 60 D-13/D-16 expansion of C12 scope.
**Example:**

```javascript
// PROPOSED: append to v1.5-milestone-audit.mjs C12 run() at ~line 548
// (after the existing emptyCells.length check)
const requiredH2s = [
  '## Enrollment',
  '## Configuration',
  '## App Deployment',
  '## Compliance',
  '## Software Updates',
  '## Conditional Access'
];
const missingH2s = requiredH2s.filter(h => {
  const re = new RegExp('^' + h.replace(/[/\\^$*+?.()|[\]{}]/g, '\\$&') + '\\s*$', 'm');
  return !re.test(content);
});
if (missingH2s.length > 0) {
  return { pass: false, detail: 'Missing H2 headings: ' + missingH2s.join(', ') };
}
return { pass: true, detail: '5 platform columns + all data cells link-bearing + 6 H2 anchors present' };
```

[CITED: pattern verified against `check-phase-58.mjs` V-58-05 at lines 117-126 — same regex shape, same H2 list.]

### Pattern 4: Validator-as-Deliverable (file-reads-only) — `check-phase-60.mjs`

**What:** ES module that imports `node:fs` + `node:path` only; reads files via `readFileSync`; emits `[N/total] V-60-NN: name ... PASS/FAIL` lines; exits 0 on all-PASS, 1 on any-FAIL.
**When to use:** Every per-phase validator. Phase 60 D-21 enumerates 25 V-60-NN assertions.
**Example skeleton (mirrored from check-phase-58.mjs / check-phase-59.mjs):**

```javascript
#!/usr/bin/env node
// Phase 60 static validation harness
// Source of truth: .planning/phases/60-audit-harness-v1-5-finalization/60-CONTEXT.md (D-21..D-22)
// NO SHELL: all file content via fs.readFileSync; no shared module; no external tools (except --self-test subprocess)
// Implements 25 checks (V-60-01 through V-60-25)
// Lineage: Phase 48 D-25 → ... → Phase 59 D-26/D-27 → Phase 60 D-21/D-22

import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import process from 'node:process';

const argv = process.argv.slice(2);
const VERBOSE = argv.includes('--verbose');

function readFile(relPath) {
  const abs = join(process.cwd(), relPath);
  if (!existsSync(abs)) return null;
  return readFileSync(abs, 'utf8');
}

const HARNESS = 'scripts/validation/v1.5-milestone-audit.mjs';
const SIDECAR = 'scripts/validation/v1.5-audit-allowlist.json';
const REGEN_PINS = 'scripts/validation/regenerate-supervision-pins.mjs';
const COMPARISON_DOC = 'docs/reference/4-platform-capability-comparison.md';
const BLINK_INVENTORY = '.planning/phases/48-audit-harness-bootstrap-broken-link-sweep-first-pass/48-VERIFICATION-broken-links.md';
const CALIBRATION_DOC = '.planning/phases/60-audit-harness-v1-5-finalization/60-CALIBRATION.md';

const checks = [
  // V-60-01..04: harness check entries lack `informational: true` for C9/C11/C13/C12
  // V-60-05..07: sidecar JSON has 3 new arrays
  // V-60-08: 48-VERIFICATION-broken-links.md Triage Decision column populated
  // V-60-09: BASELINE_9 refreshed (timestamp comment present)
  // V-60-10: regenerate-supervision-pins.mjs --self-test exits 0 (subprocess via execFileSync)
  // V-60-11: comparison doc has 6 H2 names
  // V-60-12..23: 12 NEGATIVE regression-guards (chain validators 49-59)
  // V-60-24: 60-CALIBRATION.md exists
  // V-60-25: 48-VERIFICATION-broken-links.md baseline (Total findings: 75) preserved
];

// === RUNNER LOOP (mirrors check-phase-59.mjs) ===
const LABEL_WIDTH = 64;
function padLabel(s) { /* ... */ }
let passed = 0, failed = 0, skipped = 0;
for (const check of checks) { /* ... */ }
process.stdout.write('\nSummary: ' + passed + ' passed, ' + failed + ' failed, ' + skipped + ' skipped\n');
process.exit(failed > 0 ? 1 : 0);
```

[CITED: shape verbatim from `check-phase-58.mjs:1-42 + 432-460` (HEAD `2b68d0e`).]

**For V-60-10 specifically (--self-test subprocess):** unique among the 25 assertions because it MUST run a subprocess. Use `execFileSync` from `node:child_process` (argv-array form, NEVER shell-string form):

```javascript
// V-60-10: regenerate-supervision-pins.mjs --self-test exits 0
import { execFileSync } from 'node:child_process';
{
  id: 10, name: 'V-60-10: regenerate-supervision-pins.mjs --self-test exits 0',
  run() {
    try {
      execFileSync('node', ['scripts/validation/regenerate-supervision-pins.mjs', '--self-test'], { stdio: 'pipe' });
      return { pass: true, detail: '--self-test exits 0 (BASELINE_9 fresh per AUDIT-07 close)' };
    } catch (e) {
      return { pass: false, detail: 'self-test exited non-zero: ' + (e.status || 'error') };
    }
  }
}
```

[CITED: same `execFileSync` import pattern used in `check-phase-30.mjs:8` and `check-phase-31.mjs:8`.] This is the single non-pure validator assertion in `check-phase-60.mjs`. Always use `execFileSync` (argv-array safe form) — never the shell-string `child_process` shell-spawning function.

### Anti-Patterns to Avoid

- **Bundling promotion + sidecar adds + BASELINE_9 refresh into separate commits.** D-20 mandates ATOMIC. Three split commits would land C9 promote-without-exemptions transient state where harness exits 1 between commit-1 and commit-2.
- **Editing CI yml to "register" check-phase-60.mjs.** D-24: slot already exists at lines 261-275. Edit unnecessarily breaks Phase 48 D-16 file-versioning lineage discipline.
- **Mass-rewriting all 51 Category A anchors via single sed/awk pass.** D-08 mandates per-finding choice (rewrite-ref vs `<a id>`-shim). Cluster-edit per file is the unit (Phase 58 progressive-landing precedent).
- **Skipping the calibration scan and "trusting" the D-01 keyword set.** D-27 mandates the read-only `60-CALIBRATION.md` artifact. Without it, the atomic harness commit ships C11 blocking with unverified keyword coverage.
- **Refactoring shared utility functions into a module.** Phase 42 D-25 file-reads-only / no-shared-module contract — every validator MUST inline `readFile()` + `walkMd()` etc. No imports from non-stdlib.
- **Treating ROADMAP SC#5 wording as a Phase 60 blocker.** D-23 marks it as Claude's-discretion close-out work; same close-out pattern as Phase 48 D-09 (handled in 60-VERIFICATION.md note OR trailing commit).
- **Hand-rolling broken-link allowlist logic in C13 instead of `c13_broken_link_allowlist[]` sidecar with category field.** D-10 mandates `{file, line, target, reason, category}` shape; categories are `transient_external` (6) and `template_placeholder` (9).

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Broken-link sweep | Custom regex-based scanner | `npx markdown-link-check --config .mlc-config.json -q docs/**/*.md` | Tool already used for Phase 48 baseline; using a different tool breaks the diff-against-baseline (Phase 60 SC#3); .mlc-config.json already exists at repo root with redirect-following + 6 MS-domain ignore patterns. |
| Sidecar JSON parser | Custom recursive descent parser | `JSON.parse` wrapped in `parseAllowlist()` (harness:71-79) | Already implemented; degrades to empty arrays on parse failure; supports the v1.5 schema as-is. |
| GFM anchor slug normalization | Custom Unicode normalizer | Existing `gfmSlug()` helper in `check-phase-59.mjs:96-105` (lowercase + space-to-hyphen + strip non-word) | PITFALL-15 mitigation already implemented in Phase 59. C13 anchor-fix work (D-08) doesn't need slug derivation — fixing existing broken links uses the heading-text-as-source-of-truth (write the anchor that matches the heading). |
| C11 proximity-window logic | New regex engine with lookbehind | Mirror C1 SafetyNet pattern at v1.5-milestone-audit.mjs:200-219 | Already verified-working (C1 PASS today); copy verbatim with token swap. |
| BASELINE_9 derivation script | New tooling to compute current pin coordinates | Hand-edit BASELINE_9 array in `regenerate-supervision-pins.mjs:393-403` to match current sidecar coordinates | Current sidecar has 23 supervision pins; BASELINE_9 picks 9 anchor pins (per Phase 43 hand-authored choice). The 9 anchors are already documented in the inline comments at lines 394-402 (`### Supervision heading`, `MHS cross-platform note`, `Version History row`, etc.). Updating just the line numbers is a minimal hand-edit. [ASSUMED: that no `--regenerate-baseline` mode is desirable — Phase 43 D-12 contract specifically states the baseline is **hand-authored** to anchor reproducibility; an auto-regen mode would invalidate the dogfood-test contract.] |
| 48-VERIFICATION-broken-links.md Triage Decision parsing | Custom markdown-table parser | Direct text scan of the `Triage Decision` column for `FIXED-PHASE-60` or `ALLOWLISTED-c13_broken_link_allowlist` literals | V-60-08 assertion uses `readFile()` + line iteration + `split('|')`-style cell counting (mirrors `check-phase-59.mjs:countDataRows()` and `extractCanonicalDataCells()`). |

**Key insight:** Phase 60 is mostly **wiring-existing-patterns**, not **inventing-new-patterns**. The harness already has C1 proximity-window (mirror for C11), C7 sidecar `allowKey`-set (mirror for C9), C12 file-existence pre-gate + structural validation (extend with 6 H2 sub-checks), and C13 markdown-link-check tool wiring (apply allowlist filter). The 48-VERIFICATION-broken-links.md inventory schema is already populated for 75 entries — Phase 60 just adds Triage Decision values. The risk of hand-rolling a new pattern (e.g., a custom regex parser, a new sidecar shape, a new validator format) is high because every existing validator follows the file-reads-only / no-shared-module / `padLabel()` runner pattern; deviating creates audit-trail noise.

## Runtime State Inventory

> Phase 60 is a calibration-and-finalization phase, not a rename/refactor/migration phase. However, the harness changes propagate through CI replay infrastructure and pin-helper tooling — this section captures any runtime state that DOES exist at the seam between Phase 49-59 commits and the Phase 60 atomic commit.

| Category | Items Found | Action Required |
|----------|-------------|------------------|
| Stored data | None — verified by inspecting `.planning/STATE.md` line 89-92 carry-overs (BASELINE_9 stale; iOS/macOS/Windows admin templates `last_verified` not normalized; v1.4.1 C2 PASS-vs-self-test-FAIL). None of these are stored data; all are **code/sidecar coordinates**. | None for stored data category. |
| Live service config | None — Phase 60 does not touch CI yml content (D-24); does not touch pre-commit hook (Phase 48 D-21 already in place); does not touch any external service. | None. |
| OS-registered state | None — Phase 60 ships only `.mjs` script edits + `.json` sidecar edits + markdown content edits. No Windows Task Scheduler / launchd / systemd / pm2 registration. | None. |
| Secrets / env vars | None — harness, sidecar, validator all run with no env-var dependencies. CI workflow yml uses `actions/setup-node@v4` (action-internal). | None. |
| Build artifacts / installed packages | `markdown-link-check` 3.14.2 — invoked via `npx`, no `package.json` entry; cached locally per dev. After Phase 60 close, fresh `npx markdown-link-check` invocations in Phase 61 terminal re-audit will re-fetch. **Pin verification:** Phase 48 sweep recorded 3.14.2 in 48-VERIFICATION-broken-links.md frontmatter — Phase 60 second-pass MUST use same version (`npx markdown-link-check@3.14.2 --version`) for reproducible diff. | Plan author MAY choose to commit `package.json` `devDependencies` entry pinning `markdown-link-check@3.14.2` to lock the version. **Plan-author discretion.** Tradeoff: pinning adds maintenance churn; current `npx`-without-pin pattern matches Phase 48 precedent. |

**Canonical question:** *After every file in the repo is updated, what runtime systems still have the old string cached, stored, or registered?* — Answer: **None.** Phase 60 ships within `scripts/validation/` and `docs/`; no external runtime systems hold old harness state.

## Common Pitfalls

### Pitfall 1: PITFALL-12 Line-Shift Cascade During Anchor-Fix Cluster (PITFALL Lineage)

**What goes wrong:** Of the 51 Category A anchor-fixes, only `_glossary-android.md:16` (Knox `#kme`/`#kpe`) sits in pinned territory (supervision_exemptions / safetynet_exemptions / c7_knox_allowlist). If the anchor-fix mechanism is `<a id>`-shim insertion AT line 16 (rather than rewrite-ref OF line 16), it adds a line, shifting all subsequent pins downward by 1. The harness's C2 / C7 then fails because pinned line numbers no longer match the expected term.

**Why it happens:** Pin coordinates are absolute line numbers (Phase 42 D-03 design). Insertion at line 16 with current sidecar pin at `_glossary-android.md:49` (COBO blockquote) shifts that pin to line 50. C2 then scans line 50, finds no supervision term there, but line 49 now has the term and is no longer pinned.

**How to avoid:** Run `regenerate-supervision-pins.mjs --report` BEFORE the `_glossary-android.md` anchor-fix commit (D-07). Choose `<a id>`-shim insertion (which adds 1 line) ONLY if you also refresh all pins below line 16 in the same commit (D-07 atomicity-contract). If `rewrite-ref` is feasible (target an existing slug), prefer it — it does not change line count.

**Warning signs:**
- `--report` output shows pins at lines that don't contain the expected term after the anchor-fix commit
- `v1.5-milestone-audit.mjs --verbose` C2 / C7 / C1 failures reference `_glossary-android.md` lines that should be pinned
- Phase 59 commit `a01ab1d` precedent: refreshed `supervision_exemptions[]` + `c7_knox_allowlist[]` + `safetynet_exemptions[]` line numbers after Phase 59 line shifts (this is the exact pattern Phase 60 must repeat if `_glossary-android.md:16` shifts)

[CITED: PITFALLS.md Pitfall 12 §lines 258-276 + STATE.md Phase 59 commit `a01ab1d` precedent.]

### Pitfall 2: PITFALL-13 False-Positive Cascade on C9 Promotion (PITFALL Lineage)

**What goes wrong:** C9 promotes blocking. The current `cope_banned_phrases[]` regex set uses `[^.]*` between `\bCOPE\b` and the banned token — a greedy non-period matcher that crosses newlines in ES regex (because `.` and `[^.]` differ on newline-handling: `[^.]` matches newlines, `.` does not unless `s` flag set). Live calibration scan (this session) found **4 file-level false-positive hits** — none are actual COPE deprecation prose:

| File | Line | Why False-Positive |
|------|------|---------------------|
| `docs/admin-setup-android/03-fully-managed-cobo.md:149` | NFC provisioning prose; "COBO" appears with `removed` later in paragraph; **not COPE** | Pattern matches `\bCOPE\b` against `\bCOBO\b`? — no, `\bCOPE\b` is exact. **Recheck:** the bare token `COPE` may legitimately appear in a paragraph that also contains `removed`/`deprecated` for unrelated reasons. |
| `docs/android-lifecycle/03-android-version-matrix.md:37` | Version matrix prose; legitimate change-log mention of COPE ownership-mode + an unrelated removal |
| `docs/reference/android-capability-matrix.md:50` | LOB delivery row mentions COPE in a column note + has `removed` in another column |
| `docs/_glossary-android.md:196` | Version History row listing COPE as a glossary entry; "removed" appears in adjacent change-log text |

**Why it happens:** The `[^.]*` regex matches anything-up-to-the-first-period; in markdown blockquote bodies, table rows, and Version History entries, periods are sparse — the regex windows over multiple sentences/cells.

**How to avoid:** During the D-27 calibration scan, every C9 hit MUST be classified: (a) **actual deprecation prose** (intent: this COPE feature is deprecated) — pin in `c9_exemptions[]` only if the prose is intentional historical context; otherwise the content is the bug, not the regex; (b) **false positive** (intent: COPE is mentioned alongside "removed" for unrelated reasons) — pin in `c9_exemptions[]` with reason citing PITFALL-13 disambiguation. Plan author may also tighten the regex from `[^.]*` to `[^.\n]*` (single-line scope) — this is a regex *patch* in the same atomic commit. Prefer the regex tightening path if calibration shows >0 false positives, because the alternative is pinning every matrix-row + version-history entry that ever uses the word `removed`.

**Warning signs:**
- C9 in blocking mode FAILs immediately on a docs corpus where no actual COPE deprecation has been written
- Pin reasons in `c9_exemptions[]` cite "false positive on Version History row" rather than "intentional deprecation prose"

[VERIFIED: live corpus scan in this research session against current `cope_banned_phrases[]` 8-pattern set returned exactly 4 file-level matches — all 4 are false positives by inspection.]

### Pitfall 3: PITFALL-14 External-URL Allowlist vs Out-of-Scope Confusion (PITFALL Lineage)

**What goes wrong:** Phase 48 D-15 explicitly REJECTED a `broken_link_external_allowlist[]` array because it conflicts with REQUIREMENTS.md Out of Scope ("External Microsoft Learn URL link validation in C13 — markdown-link-check integration scopes to internal anchors + relative paths; external MS Learn redirect-chain validation is high-noise / low-signal and excluded"). Phase 60 D-10 ADDS `c13_broken_link_allowlist[]` for **non-Microsoft external URLs** (Knox / RealWear / Apple / Google / ztd.dds) PLUS template placeholder stubs. These are NOT the rejected MS-Learn allowlist concept.

**Why it happens:** Both are "external URL allowlists" by surface naming. The semantic difference: MS-Learn URLs are out-of-scope (`.mlc-config.json` ignorePatterns at lines 3-9 already excludes 6 MS domains via top-level config); Phase 60's `c13_broken_link_allowlist[]` covers the residual non-MS external domains that still hit the sweep but are transient/unreliable.

**How to avoid:** Document in `c13_broken_link_allowlist[]` reason field: cite REQUIREMENTS.md Out-of-Scope spirit + PITFALL-14 transient-redirect-chain rationale. Use the `category` field (D-10 mandates) to disambiguate: `transient_external` (6 entries) vs `template_placeholder` (9 entries). Do NOT add MS-Learn URLs — those are already excluded at .mlc-config.json level.

**Warning signs:**
- `c13_broken_link_allowlist[]` contains a `learn.microsoft.com` entry (should never happen — MS-Learn is .mlc-config.json ignored)
- Phase 60 author proposes `broken_link_external_allowlist[]` as a separate array name (rejected pattern)

[CITED: REQUIREMENTS.md lines 105-117 (Out of Scope); .mlc-config.json lines 3-9; CONTEXT D-10.]

### Pitfall 4: BASELINE_9 Refresh — "the 9 must be the 9, not the 23" (Phase 43 Lineage)

**What goes wrong:** Plan author updates BASELINE_9 in `regenerate-supervision-pins.mjs:393-403` by copying ALL current sidecar `supervision_exemptions[]` entries (currently 23 pins). Self-test then computes "expected NEW pins = sidecar - baseline = 23 - 23 = 0", trivially passes, but loses the dogfood-test value. BASELINE_9 is specifically the **9 pre-Phase-43 pin coordinates** — it functions as a frozen historical anchor for derivation, NOT a count-equality contract with the current sidecar (which has 23 supervision pins).

**Why it happens:** Naming suggests "baseline = current state." Actually, the 9 are the original S1-S9 pre-expansion pins, and the self-test asserts that the classifier reproduces the Phase 43 hand-authored Tier-1 NEW-pin set (= sidecar - baseline). If baseline = sidecar, NEW-pin set is empty, and the dogfood test says nothing.

**How to avoid:** Plan must update each of the 9 entries to reflect current line numbers for the **same 9 conceptual pins** (the 4 `_glossary-android.md` anchors at `### Supervision`, `Supervision disambiguation blockquote`, `MHS cross-platform note`, `Version History row` + 3 `android-lifecycle/00-enrollment-overview.md` lines + 1 `admin-setup-android/03-fully-managed-cobo.md` line + 1 `l2-runbooks/20-android-app-install-investigation.md` line). The **9 conceptual pin identities** are documented in the inline comments at regenerate-supervision-pins.mjs:394-402 and SHOULD NOT change in Phase 60 — only the **line numbers** change. Live --self-test (this session) confirmed FAIL with `_glossary-android.md:79` mismatch — the conceptual pin "Supervision heading" used to be at line 76; Phase 59 shifted it to line 79.

**Warning signs:**
- BASELINE_9 array length is 23 instead of 9
- BASELINE_9 entries lack the inline conceptual-pin comments (e.g., `### Supervision heading (was line 65 at v1.4 close)`)
- --self-test exits 0 immediately with "Phase 43 hand-authored Tier-1 new pins: 0" — that's the trivial-pass tell

[VERIFIED: live --self-test reproduction this session: "Pins authored by Phase 43 that classifier did NOT emit (false-negative): docs/_glossary-android.md:79"; CITED: regenerate-supervision-pins.mjs:386-403 documents 9-baseline derivation contract.]

### Pitfall 5: ROADMAP SC#5 Wording Trap (Phase 48 D-09 Lineage)

**What goes wrong:** ROADMAP:401 says "registered in CI workflow `audit-harness-integrity.yml`". This is the FROZEN v1.4 + v1.4.1 yml; v1.5 validators (48-60) live in the parallel `audit-harness-v1.5-integrity.yml`. Plan author may interpret SC#5 literally and try to register check-phase-60.mjs in the frozen v1.4 yml — this would break Phase 48 D-16 file-versioning lineage discipline.

**Why it happens:** ROADMAP wording predates Phase 48's D-16 v1.5-yml lineage decision. Same close-out pattern as Phase 48 D-09 SC#1 textual contradiction.

**How to avoid:** Surface SC#5 textual contradiction in 60-VERIFICATION.md per D-23. Propose ROADMAP.md SC#5 wording correction: `audit-harness-integrity.yml` → `audit-harness-v1.5-integrity.yml`. Fix in same commit as harness OR as a separate trailing commit (claude's discretion).

**Warning signs:**
- check-phase-60.mjs registered in `.github/workflows/audit-harness-integrity.yml` (the v1.4 yml)
- ROADMAP.md SC#5 still says `audit-harness-integrity.yml` after Phase 60 close

[CITED: CONTEXT D-23; Phase 48 D-09 close-out precedent.]

### Pitfall 6: Validator-as-Deliverable Subprocess Trap (V-60-10 Specific)

**What goes wrong:** V-60-10 asserts `regenerate-supervision-pins.mjs --self-test` exits 0. This requires a subprocess invocation, breaking the file-reads-only purity contract of all other validators in the project. If author uses a shell-string subprocess form, Windows shell escaping or PATH issues can cause spurious failures.

**Why it happens:** Most check-phase-NN.mjs validators run pure file-reads-only logic; V-60-10 is structurally different.

**How to avoid:** Use `execFileSync('node', ['scripts/validation/regenerate-supervision-pins.mjs', '--self-test'], { stdio: 'pipe' })` — argv-array form, NEVER shell-string form. This matches the pattern used in `check-phase-30.mjs:8` (`import { execFileSync } from 'node:child_process'`). Do NOT use the shell-spawning `child_process` function (which spawns a shell). The `stdio: 'pipe'` ensures self-test stdout doesn't leak into validator output. Wrap in try/catch — if `--self-test` exits non-zero, `execFileSync` throws; catch it and emit `{ pass: false, detail: 'self-test exited non-zero' }`.

**Warning signs:**
- V-60-10 implementation uses backticks or string concatenation to build the shell command
- V-60-10 spuriously fails on Windows but passes on Linux CI

[CITED: check-phase-30.mjs:8 + check-phase-31.mjs:8 use `execFileSync` with argv array.]

### Pitfall 7: Atomic Commit Split Trap (Phase 43 D-07 Lineage)

**What goes wrong:** Plan author splits the D-20 step 4 atomic commit into 4 sequential commits (one per check-promote: C9, C11, C12, C13). Between commits, harness exits 1 because:
- Commit 1: C9 promote (no exemption mechanism wired) → blocking C9 with 4 false-positive hits → FAIL
- Commit 2: C11 promote → C11 blocking with proximity-window — at this point, depending on the unified set, may PASS or FAIL
- Commit 3: C12 expansion adds 6 H2 sub-checks
- Commit 4: C13 promote with allowlist applied

If pre-commit gate runs `v1.5-milestone-audit.mjs` between commits, every intermediate commit fails. CI runs the harness on EVERY commit (push event), so split commits produce 3 red CI runs visible on the PR.

**How to avoid:** D-20 mandates ONE ATOMIC COMMIT. Plan-author may pre-stage all changes in working tree, run `pre-commit gate` (3 validators), then `git commit` once. The commit body should enumerate the 4 promotions + 4 sidecar adds + BASELINE_9 refresh + 48-VERIFICATION close-out. Verification commands in the commit body (`node scripts/validation/v1.5-milestone-audit.mjs --verbose`) should show 12/12 PASS post-commit.

**Warning signs:**
- 4+ commits in the harness change-set (should be 1)
- CI red runs on intermediate commits in the PR
- BASELINE_9 refresh lands in a separate commit from the harness changes (violates AUDIT-07 close + D-19 same-commit)

[CITED: CONTEXT D-20; Phase 43 D-07 atomicity-contract precedent.]

### Pitfall 8: Calibration Scan Stale Between Run and Commit (D-27 Lineage)

**What goes wrong:** Calibration scan runs at T0 (D-20 step 1). Anchor-fix commits at T1-T9 (steps 2-3) shift line numbers in some files. By the time atomic harness commit at T10 (step 4) lands, calibration-scan-derived `c9_exemptions[]` line numbers (if any seeded) point to wrong lines.

**How to avoid:** Calibration scan MUST be re-run immediately before the atomic harness commit lands. Either: (a) Regenerate `60-CALIBRATION.md` as the first sub-step of step 4 and refresh `c9_exemptions[]` line numbers; OR (b) Choose anchor-fix targets that DO NOT touch `androidDocPaths()` scope (the C9 scope) — Category A anchor fixes are mostly in `l1-runbooks/` + `l2-runbooks/` + `_templates/admin-template-ios.md`, none of which are in `androidDocPaths()` scope (which is `_glossary-android.md`, `admin-setup-android/`, `android-lifecycle/`, etc.) per harness:88-136. **VERIFIED via inspection:** of 51 Category A entries, only `_glossary-android.md:16` is in `androidDocPaths()` scope. The other 50 are out-of-scope for C9 line-coordinate purposes. So C9 calibration is robust against most anchor-fix shifts — only the `_glossary-android.md:16` fix can shift C9 pin coordinates.

**Warning signs:**
- `c9_exemptions[]` reasons cite line numbers that don't match harness-detected hit lines
- Plan author skips the calibration re-run and trusts the T0 scan

[VERIFIED: scope analysis of Category A entries vs `androidDocPaths()` scope this session.]

## Code Examples

### Example 1: Sidecar JSON Shape Post-Phase-60-Close

```json
{
  "schema_version": "1.0",
  "generated": "2026-05-DD",
  "phase": "60-audit-harness-v1-5-finalization",
  "safetynet_exemptions": [
    /* unchanged from current 4 entries; line numbers refreshed if _glossary-android.md:16 anchor-fix shifts */
  ],
  "supervision_exemptions": [
    /* unchanged from current 23 entries; line numbers refreshed per D-07 if _glossary-android.md:16 anchor-fix shifts */
  ],
  "cope_banned_phrases": [
    /* unchanged 8 patterns; OR tightened to single-line scope per Pitfall 2 mitigation */
  ],
  "c7_knox_allowlist": [
    /* unchanged 10 entries; line numbers refreshed if _glossary-android.md:16 anchor-fix shifts */
  ],
  "c9_exemptions": [
    /* NEW per D-18; populated from D-27 corpus calibration scan */
    /* Example shape:
    { "file": "docs/admin-setup-android/03-fully-managed-cobo.md", "line": 149,
      "reason": "PITFALL-13 false positive: regex [^.]* matches across NFC provisioning paragraph; COPE token unrelated to 'removed' token in same paragraph (calibration scan 2026-05-DD)" } */
  ],
  "c11_ops_exemptions": [
    /* NEW per D-02; RESERVED — empty array at Phase 60 close */
  ],
  "c11_ops_patterns": [
    /* OPTIONAL — already exists per harness:484 lazy-load fallback;
       Phase 60 may explicitly seed with current 4 patterns OR leave undefined and let fallback drive */
    "\\bSystem Center\\b",
    "\\bSCCM\\b[^.]*\\bIntune\\b",
    "\\bAutopatch rings\\b",
    "\\bSafetyNet\\b[^.]*\\bcompliance\\b"
  ],
  "c13_broken_link_allowlist": [
    /* NEW per D-10; 15 entries seeded */
    { "file": "docs/admin-setup-android/02-zero-touch-portal.md", "line": 160, "target": "https://support.google.com/work/android/topic/9158960", "reason": "PITFALL-14 transient external; Google support topic redirect chain (REQUIREMENTS.md Out-of-Scope spirit applied to non-MS domain)", "category": "transient_external" },
    { "file": "docs/admin-setup-android/07-knox-mobile-enrollment.md", "line": 51, "target": "https://knox.samsung.com", "reason": "PITFALL-14 transient external; Samsung Knox portal occasional redirect/error", "category": "transient_external" },
    { "file": "docs/admin-setup-android/09-aosp-realwear.md", "line": 125, "target": "https://portal.realwear.com", "reason": "PITFALL-14 transient external; RealWear partner portal", "category": "transient_external" },
    { "file": "docs/l1-runbooks/04-network-connectivity.md", "line": 35, "target": "https://ztd.dds.microsoft.com", "reason": "PITFALL-14 transient external; ZTD endpoint not browser-reachable from CI", "category": "transient_external" },
    { "file": "docs/l1-runbooks/28-android-knox-enrollment-failed.md", "line": 69, "target": "https://knox.samsung.com", "reason": "PITFALL-14 transient external; same as :51", "category": "transient_external" },
    { "file": "docs/reference/endpoints.md", "line": 125, "target": "https://support.apple.com/en-us/HT101555", "reason": "PITFALL-14 transient external; Apple support article redirect chain", "category": "transient_external" },
    { "file": "docs/_templates/admin-template.md", "line": 23, "target": "link", "reason": "Template placeholder; intentional stub", "category": "template_placeholder" },
    { "file": "docs/_templates/admin-template.md", "line": 43, "target": "../runbooks-l1/relevant-runbook.md", "reason": "Template placeholder; intentional stub for plan-author fill-in", "category": "template_placeholder" },
    { "file": "docs/_templates/admin-template-android.md", "line": 51, "target": "../l1-runbooks/[filename].md", "reason": "Template placeholder; intentional stub", "category": "template_placeholder" },
    { "file": "docs/_templates/admin-template-android.md", "line": 111, "target": "../l1-runbooks/[runbook-filename].md", "reason": "Template placeholder; intentional stub", "category": "template_placeholder" },
    { "file": "docs/_templates/admin-template-ios.md", "line": 57, "target": "link", "reason": "Template placeholder; intentional stub", "category": "template_placeholder" },
    { "file": "docs/_templates/admin-template-ios.md", "line": 71, "target": "../l1-runbooks/[runbook-filename].md", "reason": "Template placeholder; intentional stub", "category": "template_placeholder" },
    { "file": "docs/_templates/admin-template-macos.md", "line": 13, "target": "link", "reason": "Template placeholder; intentional stub", "category": "template_placeholder" },
    { "file": "docs/_templates/admin-template-macos.md", "line": 49, "target": "../l1-runbooks/[runbook-filename].md", "reason": "Template placeholder; intentional stub", "category": "template_placeholder" }
  ]
}
```

[VERIFIED: 14 entries enumerated from 48-VERIFICATION-broken-links.md Category B table; D-10 specifies 15 entries (6 transient_external + 9 template_placeholder). One additional template_placeholder entry needed — likely `docs/_templates/admin-template-android.md:113` (`../l1-runbooks/26-mgp-app-not-installed.md`) per inventory line 100, but THAT entry is NOT a placeholder (it's a real broken path: file doesn't exist) — plan author triages whether it's `FIXED-PHASE-60` (re-link to existing l1 runbook) or `ALLOWLISTED-c13_broken_link_allowlist` template_placeholder. Likely re-link. **CALIBRATION NEEDED at plan time.**]

### Example 2: BASELINE_9 Refresh — Targeted Hand-Edit at lines 393-403

```javascript
// CURRENT (regenerate-supervision-pins.mjs:393-403, HEAD 2b68d0e):
const BASELINE_9 = [
  ['docs/_glossary-android.md', 76],   // ### Supervision heading (was line 65 at v1.4 close)
  ['docs/_glossary-android.md', 78],   // Supervision disambiguation blockquote (was line 67)
  ['docs/_glossary-android.md', 172],  // MHS cross-platform note (was line 134)
  ['docs/_glossary-android.md', 188],  // Version History row (was line 148)
  ['docs/android-lifecycle/00-enrollment-overview.md', 51],
  ['docs/android-lifecycle/00-enrollment-overview.md', 53],
  ['docs/android-lifecycle/00-enrollment-overview.md', 83],
  ['docs/admin-setup-android/03-fully-managed-cobo.md', 36],  // was line 35
  ['docs/l2-runbooks/20-android-app-install-investigation.md', 21]
];

// PROPOSED (Phase 60 D-19 refresh):
// BASELINE_9 refreshed 2026-05-DD (Phase 60 AUDIT-07 close): line numbers updated to current
// state after Phases 49-59 v1.5 content additions; conceptual pin identities unchanged.
// See 60-CONTEXT.md D-19 + 60-RESEARCH.md §BASELINE_9 refresh.
const BASELINE_9 = [
  ['docs/_glossary-android.md', <NEW_LINE>],  // ### Supervision heading (Phase 59 shifted from 76 → 79 per --self-test FAIL evidence)
  ['docs/_glossary-android.md', <NEW_LINE>],  // Supervision disambiguation blockquote (Phase 59 shifted from 78 → 81; same +3 shift)
  ['docs/_glossary-android.md', <NEW_LINE>],  // MHS cross-platform note (Phase 59 shifted from 172 → 179; +7 shift per supervision_exemptions reason)
  ['docs/_glossary-android.md', <NEW_LINE>],  // Version History row (Phase 59 shifted from 188 → 196; +8 shift)
  ['docs/android-lifecycle/00-enrollment-overview.md', 51],   // unchanged — file unmodified by Phases 49-59
  ['docs/android-lifecycle/00-enrollment-overview.md', 53],   // unchanged
  ['docs/android-lifecycle/00-enrollment-overview.md', 83],   // unchanged
  ['docs/admin-setup-android/03-fully-managed-cobo.md', 36],  // unchanged
  ['docs/l2-runbooks/20-android-app-install-investigation.md', 21]  // unchanged
];
```

[VERIFIED: live --self-test FAIL message ("docs/_glossary-android.md:79") + supervision_exemptions reasons in current sidecar (cite "+3", "+7", "+8" Phase 59 shifts) — the 4 _glossary-android.md baseline lines all need refresh; the other 5 baseline lines are unchanged.]

### Example 3: 48-VERIFICATION-broken-links.md Triage Decision Column Population (post-Phase-60)

```markdown
| File | Line | Link Target | Pre-existing? | Triage Decision |
|------|------|-------------|---------------|-----------------|
| docs/_glossary-android.md | 16 | `#kme` | A pre-existing v1.0–v1.4.1 | FIXED-PHASE-60 |
| docs/_glossary-android.md | 16 | `#kpe` | A pre-existing v1.0–v1.4.1 | FIXED-PHASE-60 |
/* ... 49 more Category A FIXED-PHASE-60 entries ... */
| docs/admin-setup-android/02-zero-touch-portal.md | 160 | `https://support.google.com/work/android/topic/9158960` | A pre-existing v1.0–v1.4.1 (external URL 404) | ALLOWLISTED-c13_broken_link_allowlist |
/* ... 5 more Category B transient_external ALLOWLISTED entries + 5 Category B FIXED-PHASE-60 path-fix entries + 9 template_placeholder ALLOWLISTED entries ... */
```

[CITED: 48-VERIFICATION-broken-links.md current state (Triage Decision column empty for all 75 rows); D-11 mandates `FIXED-PHASE-60` or `ALLOWLISTED-c13_broken_link_allowlist`.]

### Example 4: Pre-Commit Gate Sequence (D-26)

```bash
# Pre-commit gate (run before atomic harness commit lands)
# 1. All Phase 49-59 V-NN-NN structural assertions still PASS
for n in 48 49 50 51 52 53 54 55 56 57 58 59; do
  node scripts/validation/check-phase-${n}.mjs || { echo "FAIL: check-phase-${n}.mjs"; exit 1; }
done

# 2. v1.5-milestone-audit.mjs exits 0 in fully-blocking mode
node scripts/validation/v1.5-milestone-audit.mjs --verbose

# 3. check-phase-60.mjs exits 0 (post-step-5 only)
node scripts/validation/check-phase-60.mjs

# 4. regenerate-supervision-pins.mjs --self-test exits 0 (after BASELINE_9 refresh in atomic commit)
node scripts/validation/regenerate-supervision-pins.mjs --self-test
```

[CITED: D-26 verbatim.]

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| C12 informational with file-existence pre-gate | C12 blocking + 5 platform columns + link-not-copy enforcement | Phase 58 close (commit `bc9cee6`) | Phase 60 D-13 expands further: 6 H2 named-anchor sub-checks. C12 was already blocking pre-Phase-60. |
| C9 informational (PITFALL-13 false-positive risk) | C9 blocking + `c9_exemptions[]` exemption mechanism | Phase 60 close (D-17/D-18) | New exemption mechanism wires same pattern as C7 (allowKey set + bare-count loop). |
| C11 informational with hardcoded 4-pattern fallback | C11 blocking + proximity-window negation (C1-symmetric) + `c11_ops_exemptions[]` reserved sidecar array | Phase 60 close (D-01/D-02) | Mirrors C1 SafetyNet semantic ±200-char window; 4-pattern set retained (D-03 explicit); sidecar pin reserved for v1.6+ edge cases. |
| C13 informational stub (no actual sweep in harness) | C13 blocking with `c13_broken_link_allowlist[]` applied; sweep moved to second-pass invocation pattern | Phase 60 close (D-06/D-10) | Note: actual `markdown-link-check` invocation is **NOT in the harness** — harness C13 only applies the allowlist filter to results from a separate `npx markdown-link-check` run. Phase 60 second-pass is a manual-step + close-out artifact, not a harness internal call. |
| Frozen v1.4 + v1.4.1 yml hardcoding `audit-harness-integrity.yml` | Parallel v1.5 yml `audit-harness-v1.5-integrity.yml` + frozen predecessors untouched | Phase 48 D-16/D-17 (already shipped) | Phase 60 SC#5 wording in ROADMAP still cites the frozen yml — D-23 surfaces contradiction + proposes correction. |
| Sidecar JSON 5-array shape (v1.4.1 schema) | 8-array shape post-Phase-60 (+`c9_exemptions[]`, `c11_ops_exemptions[]`, `c13_broken_link_allowlist[]`) | Phase 60 close (atomic commit) | All new arrays follow Phase 42 D-26 `{file, line, reason}` shape (+ `target` and `category` for c13). |

**Deprecated/outdated:**
- `audit-harness-integrity.yml` (v1.4 + v1.4.1 yml) — FROZEN; do not edit; do not extend. Phase 60 changes go to `audit-harness-v1.5-integrity.yml`.
- Hardcoded `cope_banned_phrases[]` fallback in harness:426 — superseded by sidecar 8-pattern set; fallback only triggers if sidecar missing/empty (defensive degradation).
- Verbose detail-strings on informational checks (e.g., `(informational — N findings; promotes to blocking in Phase 60)`) — Phase 48 D-08 chose compact `(informational)` format; Phase 60 promotion changes inform-flag to absent and emits PASS-with-no-detail per D-08 contract.

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | Phase 60 may add `g`-flag to C11 regex iteration (currently `i`-only `pat.test(c)`) without breaking existing PASS | "Pattern 1: Proximity-Window Negation" | LOW — current C11 is informational-only; semantic change from "any-hit fails" to "per-line hit fails" is required for proximity-window to work. **Verify in calibration scan output by counting hits before vs after.** |
| A2 | Hand-edit BASELINE_9 array is preferred over authoring a `--regenerate-baseline` mode | "Don't Hand-Roll" + "Code Examples" §BASELINE_9 | LOW — Phase 43 D-12 contract says baseline is hand-authored. An auto-regen mode would invalidate the dogfood-test contract. Plan author MAY still author the mode; trade-off is +1 mode in helper vs +0 maintenance burden. |
| A3 | `markdown-link-check` 3.14.2 will be available via `npx` for Phase 60 second-pass without committing to package.json | "Standard Stack" + "Runtime State Inventory" | LOW — Phase 48 used same `npx`-without-pin pattern; CI re-fetches per-job. **Plan author MAY pin in package.json devDependencies for explicit version-lock.** |
| A4 | The 14 enumerated `c13_broken_link_allowlist[]` entries (6 transient_external + 8 template_placeholder so far) require 1 more entry to reach D-10's 15-entry total — likely `_templates/admin-template-android.md:113` or equivalent | "Code Examples" §sidecar shape | LOW — calibration during plan time clarifies; the 15-entry count comes from D-10's "6 transient externals + 9 template placeholders" enumeration, which sums to 15. The Category B inventory has 9 placeholder entries when one of admin-template-android:113 is reclassified — plan author triages at plan time. |
| A5 | `regenerate-supervision-pins.mjs` `parseAllowlist` function uses the SAME degrade-to-empty-arrays pattern as the harness (line 408 reads `allow.supervision_exemptions || []`) — adding new arrays to sidecar doesn't break self-test | "Architecture Patterns" + "Common Pitfalls" §atomic split | LOW — verified by reading lines 408-468 (self-test logic only references `supervision_exemptions[]`). Adding `c9_exemptions[]` etc. is purely additive. |
| A6 | The current `cope_banned_phrases[]` regex `[^.]*` produces 4 false positives in this corpus that don't represent intentional COPE deprecation prose | "Common Pitfalls" §PITFALL-13 + "Architecture Patterns" §C9 adaptation | MEDIUM — confirmed by automated scan, but plan author must read each of the 4 hit contexts at calibration time to confirm intent. If any of the 4 IS intentional COPE deprecation prose, it needs `c9_exemptions[]` pinning rather than regex tightening. |
| A7 | The 51 Category A anchor-fixes have 50/51 outside `androidDocPaths()` scope; only `_glossary-android.md:16` intersects | "Common Pitfalls" §PITFALL-12 + §atomic-split-trap §calibration-stale-trap | LOW — verified by inspecting 48-VERIFICATION-broken-links.md Category A table file paths against harness `androidDocPaths()` enumeration (harness:88-136). All `l1-runbooks/`, `l2-runbooks/`, and `_templates/admin-template-ios.md` entries are out-of-scope for `androidDocPaths()`. |
| A8 | ROADMAP SC#5 wording fix in D-23 IS optional; plan author may defer to Phase 61 close at user preference | "User Constraints" + "Common Pitfalls" §SC#5 trap | LOW — D-23 explicitly marks as Claude's discretion. |

**These assumptions need user confirmation before becoming locked decisions during planning** — especially A6 (regex-tighten vs pin-each) and A4 (15th allowlist entry triage).

## Open Questions

1. **Should `c11_ops_patterns[]` be explicitly seeded in the sidecar at Phase 60 close, or remain undefined and rely on the harness:484-491 hardcoded fallback?**
   - What we know: The fallback works today; CONTEXT D-03 retains the current 4 patterns.
   - What's unclear: Whether explicit sidecar seeding is preferred for v1.6+ extensibility (per CONTEXT "Deferred Ideas" — pattern expansion is sidecar-driven via `c11_ops_patterns[]`).
   - Recommendation: Seed explicitly with the 4 current patterns. Flips the harness code path from "fallback-driven" to "sidecar-driven" without semantic change — this is the v1.6+ extension point per the deferral decision. Costs nothing; future expansion adds entries instead of editing harness JS.

2. **Does the calibration scan (D-27) need to be re-run if any of the 51 anchor-fix commits land in `androidDocPaths()` scope (specifically `_glossary-android.md:16`)?**
   - What we know: Pitfall 8 §calibration-stale-trap analyzes this; only `_glossary-android.md:16` intersects.
   - What's unclear: Whether plan author should re-run calibration as a sub-step of step 4, or rely on the static line-coordinate analysis.
   - Recommendation: Re-run as a sub-step of step 4. Cost = ~2 minutes runtime + git status; benefit = guarantees pin coordinates are current.

3. **Should the 15th `c13_broken_link_allowlist[]` entry (D-10's 15-entry total) be `_templates/admin-template-android.md:113` (`26-mgp-app-not-installed.md`) or another file?**
   - What we know: 48-VERIFICATION-broken-links.md Category B table has 24 entries; D-06/D-10 split is 5 fixed paths + 6 transient externals + 9 template placeholders. Pre-Phase-60 inspection of admin-template-android.md:113 shows it points to a non-existent runbook (`26-mgp-app-not-installed.md`).
   - What's unclear: Is `26-mgp-app-not-installed.md` an intentional template placeholder (matching naming convention `[runbook-filename].md` style) or a real broken path that should be re-linked?
   - Recommendation: Plan-author triage at plan time. Likely `FIXED-PHASE-60` via re-link to an existing l1 runbook OR `ALLOWLISTED-c13_broken_link_allowlist` template_placeholder if naming convention applies. Calibration produces the answer.

4. **Does V-60-08 (Triage Decision column populated for all 75 entries) require populating Category C as well, even though Category C has 0 findings?**
   - What we know: D-11 mandates the column populated for "all 75 entries"; Category C section says "No Category C deferred-stub findings".
   - What's unclear: Whether the empty Category C section's placeholder row needs a Triage Decision value.
   - Recommendation: Treat the placeholder row as N/A — V-60-08 should iterate Category A + B tables only, asserting all data rows have non-empty Triage Decision values. The empty Category C section has no data rows.

5. **Should the C11 promotion patch tighten `cope_banned_phrases[]` regex from `[^.]*` to `[^.\n]*` (single-line scope) in the same atomic commit, or leave the regex unchanged and rely on `c9_exemptions[]` pins?**
   - What we know: Pitfall 2 enumerates 4 false positives; plan author has both options.
   - What's unclear: Which is the better long-term posture for v1.6+ COPE content additions.
   - Recommendation: Tighten the regex to `[^.\n]*`. Rationale: pinning every Version History row + matrix-row mention scales poorly with v1.6+ content additions; tightening regex eliminates entire class of false positives. Document the regex change in the atomic commit body. **MEDIUM-confidence.**

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | All `.mjs` validators + harness | ✓ | v22.20.0 [VERIFIED this session via `node --version`] | None needed; CI uses Node 20 (`actions/setup-node@v4`). Both compatible with ES modules + lookbehind regex + `node:fs` / `node:path` / `node:child_process`. |
| `npx` | `markdown-link-check` invocation in second-pass sweep | ✓ | bundled with Node | None needed. |
| `markdown-link-check` | C13 second-pass sweep | ✓ via `npx` | 3.14.2 (Phase 48 baseline tool version per 48-VERIFICATION-broken-links.md frontmatter) | Pin via `package.json` devDependencies if reproducibility concern at plan-author discretion. |
| `git` | All commit operations + Phase 48 D-21 advisory pre-commit hook | ✓ | system git (Windows + Linux compatible) | None needed. |
| `.mlc-config.json` | C13 sweep config | ✓ | exists at repo root [VERIFIED this session] | None needed; current 6 ignorePatterns + redirect-following config is correct for Phase 60 second-pass. |
| BASELINE_9 in regenerate-supervision-pins.mjs | AUDIT-07 close + V-60-09/V-60-10 | ✓ | exists at lines 393-403 [VERIFIED this session] | None needed; refresh in same commit. |
| 48-VERIFICATION-broken-links.md | D-11 close-out + V-60-08/V-60-25 | ✓ | exists with 75 findings; Triage Decision column empty [VERIFIED this session] | None needed; populate in same atomic commit. |
| audit-harness-v1.5-integrity.yml | CI registration of check-phase-60.mjs | ✓ | exists with slot at lines 261-275 [VERIFIED this session] | None needed; D-24 mandates no edits. |

**Missing dependencies with no fallback:** None.
**Missing dependencies with fallback:** None.

**No environment blockers for Phase 60 execution.**

## Validation Architecture

> Workflow.nyquist_validation is not set in `.planning/config.json` — treat as enabled.

### Test Framework

| Property | Value |
|----------|-------|
| Framework | Custom Node.js validator-as-deliverable pattern (no external test runner — file-reads-only `.mjs` scripts emitting `[N/total] V-XX-YY: name ... PASS/FAIL` + summary line) |
| Config file | None — each validator is self-contained per Phase 42 D-25 file-reads-only / no-shared-module contract |
| Quick run command | `node scripts/validation/check-phase-60.mjs` |
| Full suite command | `for n in 48 49 50 51 52 53 54 55 56 57 58 59 60; do node scripts/validation/check-phase-${n}.mjs --verbose; done && node scripts/validation/v1.5-milestone-audit.mjs --verbose && node scripts/validation/regenerate-supervision-pins.mjs --self-test` |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| AUDIT-03 | C11 promoted to blocking; proximity-window covers 6 currently-hit lines | unit (harness behavior) | `node scripts/validation/v1.5-milestone-audit.mjs --verbose` (expects C11 PASS in blocking mode, NO `informational` flag in detail) | ✅ existing harness |
| AUDIT-03 | check-phase-60.mjs V-60-02 asserts C11 not informational | unit (validator) | `node scripts/validation/check-phase-60.mjs` (V-60-02 PASS) | ❌ Wave 0 — `check-phase-60.mjs` |
| AUDIT-04 | C12 contains 6 H2 sub-checks against named anchors | unit (harness behavior) | `node scripts/validation/v1.5-milestone-audit.mjs --verbose` (expects C12 PASS with detail "5 platform columns + all data cells link-bearing + 6 H2 anchors present") | ✅ existing harness; expansion landed in atomic commit |
| AUDIT-04 | check-phase-60.mjs V-60-11 asserts comparison doc has 6 named H2s | unit (validator) | `node scripts/validation/check-phase-60.mjs` (V-60-11 PASS) | ❌ Wave 0 |
| AUDIT-05 | C13 promoted to blocking; allowlist applied; second-pass count == 0 NEW findings | unit (harness behavior + manual sweep) | (a) `node scripts/validation/v1.5-milestone-audit.mjs --verbose` (C13 PASS no informational); (b) `npx markdown-link-check@3.14.2 --config .mlc-config.json -q docs/**/*.md` post-fix expects 0 NEW findings (allowlisted ones excluded) | ✅ existing harness; manual sweep is one-shot at Phase 60 close |
| AUDIT-05 | check-phase-60.mjs V-60-03 asserts C13 not informational | unit (validator) | `node scripts/validation/check-phase-60.mjs` (V-60-03 PASS) | ❌ Wave 0 |
| AUDIT-05 | check-phase-60.mjs V-60-07 asserts c13_broken_link_allowlist[] has 15 entries | unit (validator) | `node scripts/validation/check-phase-60.mjs` (V-60-07 PASS) | ❌ Wave 0 |
| AUDIT-05 | check-phase-60.mjs V-60-08 asserts 48-VERIFICATION Triage Decision populated | unit (validator) | `node scripts/validation/check-phase-60.mjs` (V-60-08 PASS) | ❌ Wave 0 |
| AUDIT-06 | check-phase-60.mjs ships + CI registers via existing slot | unit (validator + CI smoke) | (a) `node scripts/validation/check-phase-60.mjs` exits 0; (b) CI run on next push activates the lazy-skip slot at audit-harness-v1.5-integrity.yml:261-275 | ❌ Wave 0 (validator); ✅ CI yml slot exists |
| AUDIT-07 | regenerate-supervision-pins.mjs --self-test exits 0 with refreshed BASELINE_9 | unit (subprocess) | `node scripts/validation/regenerate-supervision-pins.mjs --self-test` exits 0 | ✅ existing helper; BASELINE_9 array refresh in atomic commit |
| AUDIT-07 | check-phase-60.mjs V-60-09 + V-60-10 asserts BASELINE_9 fresh + self-test passes | unit (validator + subprocess) | `node scripts/validation/check-phase-60.mjs` (V-60-09 + V-60-10 PASS) | ❌ Wave 0 |

### Sampling Rate

- **Per task commit:** `node scripts/validation/v1.5-milestone-audit.mjs` (12-check harness — runtime ~2-5 sec on full corpus)
- **Per wave merge (= per progressive-landing commit):** Same as per-task; cluster-edits don't add validation surface
- **Pre-atomic-harness-commit:** Full pre-commit gate per D-26: `for n in 48..59; do check-phase-${n}.mjs; done && v1.5-milestone-audit.mjs --verbose`
- **Post-atomic-harness-commit:** Same pre-commit gate PLUS `check-phase-60.mjs` PLUS `regenerate-supervision-pins.mjs --self-test`
- **Phase gate (post-Phase-60-close):** Full suite green before Phase 61 terminal re-audit

### Wave 0 Gaps

- [ ] `scripts/validation/check-phase-60.mjs` — covers AUDIT-03/04/05/06/07 + 25 V-60-NN structural assertions per D-21 (does not exist; this is the Phase 60 deliverable)
- [ ] `60-CALIBRATION.md` — covers D-27 calibration corpus scan artifact (does not exist)
- [ ] BASELINE_9 line numbers in `regenerate-supervision-pins.mjs:393-403` — current values are stale per --self-test FAIL

*(No framework install needed — all validation patterns reuse existing `node:fs` + `node:path` + `node:child_process` stdlib idioms.)*

## Security Domain

> `security_enforcement` is not set in `.planning/config.json` — treat as disabled. Phase 60 ships only static-analysis JSON / Node script edits + markdown content edits. No new code paths handle credentials, network requests, user input, or persistent storage. ASVS categories do not apply to a calibration-and-finalization phase that ships zero new attack surface.

**Threat model considered:**
- **Sidecar JSON injection:** N/A — sidecar is committed; no runtime parser injection vector.
- **Subprocess command injection (V-60-10):** Mitigated via `execFileSync` argv-array form (Pitfall 6). Never use shell-string form.
- **Markdown link injection in `c13_broken_link_allowlist[]` reasons:** N/A — reason field is human-readable text consumed by humans + validators; not rendered in security-sensitive UI context.

No security domain section required for this phase.

## Sources

### Primary (HIGH confidence) — files read in full or in critical sections this session

- `D:/claude/Autopilot/scripts/validation/v1.5-milestone-audit.mjs` (606 lines, full file) — current harness state including C1 SafetyNet pattern (lines 200-219), C7 Knox pattern (lines 392-415), C9 informational stub (lines 419-436), C11 informational stub (lines 484-491), C12 promoted-blocking (lines 511-549), C13 informational stub (lines 553-566)
- `D:/claude/Autopilot/scripts/validation/v1.5-audit-allowlist.json` (55 lines, full file) — current sidecar shape: schema_version, generated, phase, safetynet_exemptions[4], supervision_exemptions[23], cope_banned_phrases[8], c7_knox_allowlist[10]
- `D:/claude/Autopilot/scripts/validation/regenerate-supervision-pins.mjs` (lines 1-100 + 370-496) — BASELINE_9 array at 393-403; 3-mode contract; --self-test logic
- `D:/claude/Autopilot/scripts/validation/check-phase-58.mjs` (lines 1-460) — V-58-25 sibling-matrix retrofit guard pattern; helper function exemplars (sliceH2Region, extractCanonicalDataCells)
- `D:/claude/Autopilot/scripts/validation/check-phase-59.mjs` (lines 1-100) — most recent validator exemplar; helper function exemplars (sliceH3Region, sliceH3InRegion, gfmSlug)
- `D:/claude/Autopilot/scripts/validation/check-phase-30.mjs` + `check-phase-31.mjs` (lines 1-80 each) — file-reads-only validator pattern + execFileSync subprocess pattern
- `D:/claude/Autopilot/.github/workflows/audit-harness-v1.5-integrity.yml` (full 293 lines) — CI yml structure; lazy-skip slot at lines 261-275 for check-phase-60.mjs
- `D:/claude/Autopilot/.mlc-config.json` (15 lines, full file) — markdown-link-check config: 6 MS-domain ignorePatterns + redirect-following + 200/201/206/3xx success codes
- `D:/claude/Autopilot/.planning/phases/48-audit-harness-bootstrap-broken-link-sweep-first-pass/48-VERIFICATION-broken-links.md` (full 153 lines) — 75-finding inventory (51 Cat A + 24 Cat B + 0 Cat C); Triage Decision column empty
- `D:/claude/Autopilot/.planning/phases/48-audit-harness-bootstrap-broken-link-sweep-first-pass/48-CONTEXT.md` (full 211 lines) — D-01..D-23 establishing harness pattern + sidecar lifecycle + atomicity contract
- `D:/claude/Autopilot/.planning/phases/60-audit-harness-v1-5-finalization/60-CONTEXT.md` (full 258 lines) — 28 D-NN decisions across 4 gray areas
- `D:/claude/Autopilot/.planning/REQUIREMENTS.md` (full 189 lines) — AUDIT-01..08 success-criteria text + Out of Scope + Traceability table
- `D:/claude/Autopilot/.planning/STATE.md` (full 152 lines) — v1.5 progress + Phase 49-59 close-states + out-of-band carry-overs
- `D:/claude/Autopilot/.planning/ROADMAP.md` lines 390-510 — Phase 60 + 61 entries + Progress table + Shared Write Hotspot table
- `D:/claude/Autopilot/.planning/research/PITFALLS.md` lines 1-360 — Pitfalls 1-15 (relevant set for Phase 60: 9, 11, 12, 13, 14, 15)
- `D:/claude/Autopilot/CLAUDE.md` (project instructions) — three-tier architecture (PowerShell + Python backend + TypeScript frontend); not directly relevant to Phase 60 scope (no PowerShell / Python / TypeScript edits) but constraints honored (no .env commits, no secrets, ASCII English-only consistent with v1.0-v1.4.1)

### Secondary (MEDIUM confidence) — verified by execution

- Live `node scripts/validation/v1.5-milestone-audit.mjs --verbose` subprocess output: 12 PASS / 0 FAIL / 0 SKIPPED — confirms current harness state
- Live `node scripts/validation/regenerate-supervision-pins.mjs --self-test` subprocess output: FAIL with "docs/_glossary-android.md:79" false-negative — confirms BASELINE_9 stale (Phase 59 line shifts)
- Live ad-hoc Node corpus scan (`.tmp-c11scan.mjs`) producing 6 hits across 2 ops files — confirms D-05 calibration prediction
- Live ad-hoc Node corpus scan (`.tmp-c9scan.mjs`) producing 4 file-level hits — confirms PITFALL-13 false-positive risk for C9 promotion

### Tertiary (LOW confidence) — none applicable

All claims in this RESEARCH.md grounded in primary sources or live verification. No assumed knowledge from training data was load-bearing for any decision.

## Project Constraints (from CLAUDE.md)

| Directive | Phase 60 Compliance |
|-----------|---------------------|
| "Never commit `.env` file or any credentials" | N/A — Phase 60 ships no credentials. |
| Three-tier architecture (PowerShell + Python + TypeScript) | N/A — Phase 60 ships no application-tier code; only `.mjs` validation scripts + `.json` sidecar + markdown content. |
| "All remediation actions require explicit user confirmation" | N/A — Phase 60 ships no remediation actions. |
| "Audit log all administrative actions with user attribution" | Honored via git commit attribution per atomic-commit-cascade in D-20. Each commit has author + commit-message-body documenting changes. |
| "Validate all user inputs in API endpoints" | N/A — Phase 60 ships no API endpoint changes. |
| "Use HTTPS in production for all communications" | N/A — Phase 60 ships no network-callable code. |
| Pester 5.x for PowerShell unit tests | N/A — Phase 60 ships no PowerShell. |
| pytest for Python tests | N/A — Phase 60 ships no Python. |
| Vitest for frontend component testing | N/A — Phase 60 ships no frontend code. |

CLAUDE.md does not impose constraints on `.mjs` validation scripts, sidecar JSON, or markdown content — Phase 60 ships within these areas. **No conflicts.**

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — every tool/library verified by live inspection or subprocess invocation in this session
- Architecture patterns: HIGH — every pattern is a copy of an existing harness/validator pattern with documented line numbers
- Pitfalls: HIGH — 8 enumerated pitfalls all grounded in PITFALLS.md research artifacts + live verification (corpus scan, --self-test reproduction)
- Code examples: HIGH — verbatim source extracts + proposed adaptations validated by inspection of existing C1, C7, C12 implementations
- Sidecar shape (15-entry c13 list): MEDIUM — 14 entries enumerated from inventory; 15th is plan-author triage at calibration time (Open Question 3)
- C9 false-positive count: HIGH — 4 hits confirmed via live ad-hoc Node scan
- C11 6-hit calibration: HIGH — 6 hits confirmed via live ad-hoc Node scan; all 6 within ±200-char window of D-01 keyword set

**Research date:** 2026-05-06
**Valid until:** 2026-06-05 (30-day stable; harness/sidecar/yml are stable infrastructure; Phase 49-59 close-states are committed; only risk to validity is Phase 60 plan author landing intermediate commits that shift line coordinates between research and execution)

---

*Phase 60 research complete. All 4 requirement IDs (AUDIT-03/04/05/06) + 1 carry-over (AUDIT-07) traced through canonical sources to executable patterns. Plan author has the keyword sets, hit-line evidence, regex shapes, validator skeleton, sidecar shape, BASELINE_9 refresh evidence, and 8 pitfall warnings to author 60-PLAN.md without further investigation.*
