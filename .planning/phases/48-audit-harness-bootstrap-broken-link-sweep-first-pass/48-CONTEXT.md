# Phase 48: Audit Harness Bootstrap + Broken-Link Sweep First Pass - Context

**Gathered:** 2026-04-26
**Status:** Ready for planning
**Methodology:** Adversarial review (finder/adversary/referee) ran on all 4 gray areas. Finder 488 pts → Adversary disproved 116 → Referee adopted 14 disproves (1 inversion, recorded below).

<domain>
## Phase Boundary

Bootstrap the v1.5 validation tooling — `v1.5-milestone-audit.mjs` (Path A copy of v1.4.1 with C10–C13 scaffolding), `v1.5-audit-allowlist.json` sidecar, BASELINE_9 refresh, `check-phase-48.mjs` validator, CI integration — AND ship a categorized broken-link findings inventory against the existing 179-file baseline. **No new docs content** in this phase. All Linux/ops-depth content phases (49–61) run against the live validator this phase delivers.

10 requirements: AUDIT-01 (Path A copy), AUDIT-02 (C10 blocking from start), AUDIT-03 (C11 informational scaffold), AUDIT-04 (C12 informational scaffold), AUDIT-05 (C13 broken-link automation), AUDIT-06 (`check-phase-48.mjs` + CI registration), AUDIT-07 (BASELINE_9 refresh + `--self-test` exits 0), AUDIT-08 (sweep first-pass categorized inventory), CLEAN-06 (anchor sweep), CLEAN-07 (relative-path sweep).

</domain>

<decisions>
## Implementation Decisions

### Phase scope structure (Gray Area 1 — single phase, intra-phase waves)

- **D-01:** Ship as a SINGLE Phase 48 with internal Wave-1 (tooling) → Wave-2 (sweep) plan dependency structure. Reject split (48a/48b) — preserves 14-phase v1.5 count, avoids decimal-phase complexity colliding with REQUIREMENTS.md traceability table, and keeps a single CONTEXT/PLAN/VERIFICATION cycle. Reject roadmap-renumbering Option B.
- **D-02:** Wave-1 plans (parallel-safe, ship harness/tooling): harness Path A copy, allowlist skeleton, BASELINE_9 refresh, C10 blocking, C6/C7/C9 disposition, C11/C12/C13 informational scaffolds, `check-phase-48.mjs` validator, new CI workflow yml, pre-commit advisory hook. Wave-2 plans (depend on Wave-1): markdown-link-check config + GFM `#[A-Z]` precheck + 179-file sweep + categorize findings A/B/C + write 48-VERIFICATION-broken-links.md. Wave-2 cannot start until Wave-1 commits land (sweep needs C13 informational scaffold present in harness for first run).
- **D-03:** Phase 43 D-27 ordered-plan-step precedent applies — internal wave structure is documented working pattern, not novel. Atomicity-contract commits (Phase 43 D-07) layer on top: rescue-style first commit creates harness + sidecar + BASELINE_9 in strict order, then Wave-2 sweep commits land independently.

### C6/C7/C9 disposition + C10–C13 emit format (Gray Area 2 — selective graduation, compact emit)

- **D-04:** GRADUATE C6 (PITFALL-7 AOSP preservation) to BLOCKING in v1.5. Adversarial-review disproved Phase 58 retrofit risk: per Shared Write Hotspot Ownership table (ROADMAP.md line 427), Phase 58 touches `android-capability-matrix.md` for deferred-stub removal + cross-link only — does NOT touch admin-setup-android/ AOSP files (the C6 target set: `06-aosp-stub.md`, `09..13-aosp-*.md`). C6 targets are structurally frozen through v1.5; safe to block.
- **D-05:** GRADUATE C7 (bare-Knox disambiguation) to BLOCKING in v1.5. Knox corpus stable since v1.4.1 Phase 44. C7 promotion satisfies PITFALL-11 mandate ("checks marked informational-first in v1.4.1 should graduate to blocking in v1.5 unless there is a documented reason to extend grace"). Suffix list locked at v1.4.1's 11 forms; no allowlist mechanism — if C7 produces false positive in Phase 49+ Linux glossary cross-platform see-also, add allowlist mechanism in same commit (Path A additive precedent per Phase 43 D-06).
- **D-06:** KEEP C9 (cope_banned_phrases) INFORMATIONAL through Phase 60. C9 intersects Phase 53 co-management content where "deprecated" / "removed" / "EOL" tokens legitimately appear (PITFALL-13 ops-domain false-positive risk). Documented promotion target: Phase 60 SC#1 — graduate to blocking after v1.5 ops-depth content stabilizes and `cope_banned_phrases[]` allowlist is validated against Phase 53/54 corpus.
- **D-07:** This is a REFINEMENT of the original Option C (which proposed graduate C7+C9, keep C6). Adversarial deliberation flipped the C6/C9 pair: C6 risk turned out to be lower (frozen content) and C9 risk turned out to be higher (ops-domain content axis intersection). Documented for traceability — referee verdict is binding.
- **D-08:** C10–C13 detail-string emit format = COMPACT. Format: `(informational)` for unconditional informational pass; structural details (e.g., findings count) go to verbose-mode runner output, not main detail string. Reject verbose `(informational — N findings; promotes to blocking in Phase 60)` because hard-coded "Phase 60" text is a coordinate-drift hazard if roadmap renumbers, and long detail strings degrade signal-to-noise during fast-feedback iteration. Promotion-schedule context goes in HARNESS HEADER COMMENTS instead, citing AUDIT-03/04/05 promotion contracts.
- **D-09:** Phase 48 SC#1 textual contradiction (says "C1-C9 blocking PASS and C10-C13 informational" but C10 ships blocking per AUDIT-02 + methodology line 149) — interpret SC#1 as guidance, AUDIT-02 + methodology as authoritative. Phase 48 plan must surface this contradiction in VERIFICATION.md and propose ROADMAP.md SC#1 wording correction at commit time (or document as "SC#1 superseded by AUDIT-02" if no edit).

### Broken-link inventory artifact + allowlist seeding (Gray Area 3)

- **D-10:** BROKEN-LINK INVENTORY LOCATION = `.planning/phases/48-audit-harness-bootstrap-broken-link-sweep-first-pass/48-VERIFICATION-broken-links.md` during active execution. Migrates to `.planning/milestones/v1.5-phases/48-*/` at milestone archival per gsd-cleanup pattern. Markdown-only; human-readable; tables grouped Category A (broken anchors) / B (broken file paths) / C (deferred stubs / intentional). Reject JSON sidecar at scripts/validation/ (conflates broken-link findings with allowlist exemptions — different scope axes; C13 vs C2). Reject A3 dual-artifact (over-engineering on first phase per Phase 43 D-05 YAGNI principle).
- **D-11:** Adversarial-review disproved the Phase 43 D-20 prep-shell-deletion concern: D-20 scopes to INPUT artifacts (`PHASE-45-AOSP-SOURCE.md` consumed-then-deleted lifecycle). VERIFICATION artifacts are RETAINED — verified: 10+ such files persist in `.planning/milestones/v1.4.1-phases/43-v1-4-cleanup-audit-harness-fix/` post-shipping. Phase 60 second-pass triage will read this inventory by relative-path reference.
- **D-12:** Inventory schema (markdown structure):
  - Header: phase, generated date, sweep tool versions (markdown-link-check version + custom GFM-check), total findings count
  - § Category A — Broken Anchors: table with columns `file | line | link target | suggested category (A pre-existing v1.0–v1.4.1 / A new) | triage decision`
  - § Category B — Broken File Paths: same table shape
  - § Category C — Deferred Stubs / Intentional: same table + sidecar allowlist entry reference
  - § Summary: count per category × per pre-existing-vs-new
- **D-13:** ALLOWLIST SEEDING = INHERIT v1.4.1 verbatim, then refresh pin coordinates in same commit. Copy `scripts/validation/v1.4.1-audit-allowlist.json` → `scripts/validation/v1.5-audit-allowlist.json`. Update `phase: "43-v1-4-cleanup-audit-harness-fix"` → `phase: "48-audit-harness-bootstrap-broken-link-sweep-first-pass"`; update `generated:` timestamp; clear stale provenance comments in pin reasons (e.g., "Plan 46-02 Wave 2", "Phase 43 baseline") to "v1.5 inherit baseline 2026-04-26".
- **D-14:** Run `regenerate-supervision-pins.mjs --report` BEFORE the inheritance commit lands. If line shifts have occurred since v1.4.1 close (PITFALL-12), update shifted coordinates in the same commit per atomicity-contract Phase 43 D-07. Sidecar inheritance + pin-coord refresh + BASELINE_9 refresh land in ONE atomic commit so `--self-test` exits 0 on first v1.5 run (closes AUDIT-07).
- **D-15:** Reject 3B1 empty-allowlist (re-introduces 18-pin authoring + immediate C2 FAIL on first v1.5 commit; harness C9 falls through to 3-pattern hardcoded fallback vs 8-pattern sidecar). Reject 3B3 inherit+scaffold-empty-arrays (YAGNI per Phase 43 D-05; pre-Phase-60 array-name guesses risk schema migration; `broken_link_external_allowlist` directly conflicts with REQUIREMENTS Out of Scope external-MS-Learn-URL exclusion). Empty arrays for Linux/ops-domain exemptions added LAZILY in Phase 49+ when first legitimate occurrence appears.

### CI integration + pin-drift enforcement (Gray Area 4)

- **D-16:** CI WORKFLOW = NEW FILE `.github/workflows/audit-harness-v1.5-integrity.yml` parallel to the frozen `audit-harness-integrity.yml`. Reject extending existing yml (A1) — existing yml hardcodes v1.4 + v1.4.1 sidecar/harness paths in `parse`/`path-match`/`harness-run` jobs (lines 27–50); extending requires editing those locked steps. v1.4 + v1.4.1 yml replay infrastructure stays untouched — file-versioning lineage discipline ("v1.4 stays FROZEN — do not delete") logically extends to its CI replay.
- **D-17:** New v1.5 yml structurally clones v1.4.1 yml (parse → path-match → harness-run → pin-helper-advisory job sequence) but scopes path-globs and harness/sidecar paths to v1.5 artifacts. Path glob: `'scripts/validation/v1.5-*'` + Linux/ops-depth doc globs (additive to existing Android globs). Pin-helper-advisory inherits `continue-on-error: true` (Phase 43 D-14 / D-15 advisory contract).
- **D-18:** New yml registers `check-phase-48.mjs` immediately and reserves placeholder steps for `check-phase-49..60.mjs` (lazy-skip if file absent — graceful-degradation pattern from Phase 42 D-31). Each per-phase validator job is independent for clear failure attribution.
- **D-19:** Workflow file has explicit comment header documenting "v1.5 integration surface; v1.4 + v1.4.1 in audit-harness-integrity.yml" so future maintainers don't conflate.
- **D-20:** PIN-DRIFT ENFORCEMENT = PRE-COMMIT ADVISORY HOOK + retain CI advisory (existing pin-helper-advisory job in v1.5 yml). Reject pre-commit hard-block (B1) — Phase 43 D-14 explicitly rejected this for being too aggressive. Reject CI-advisory-only (B2) — v1.4.1 close shipped with `--self-test` failing; CI advisory missed it for 5+ phases. Reject plan-doc-only (B3) — procedural gates fail under velocity per PITFALL methodology section. Reject all-three belt-and-suspenders (B4) — Phase 43 D-24 belt-and-suspenders was for PASSIVE defenses (scope-filter + sentinel); stacking three ACTIVE enforcement layers doesn't generalize and adds onboarding friction.
- **D-21:** Pre-commit hook is ADVISORY ONLY — runs `regenerate-supervision-pins.mjs --report` on staged files matching the pinned-file glob (`docs/_glossary-android.md|docs/reference/android-capability-matrix.md|docs/admin-setup-android/**|docs/_glossary-linux.md|docs/admin-setup-linux/**`). Always exits 0 (warnings to stderr); never blocks commit. Tooling: Husky if existing repo conventions support it, else native `.git/hooks/pre-commit` contributed via repo tooling. Claude's discretion at plan time.
- **D-22:** This advances Phase 43 D-15 promotion ladder — D-15 said "promote CI advisory → blocking in v1.5 if false-positive rate is near-zero over 3 months." Adversarial-review concluded pre-commit advisory is the natural intermediate step: catches drift at the moment author edits pinned files (when context is fresh) without the velocity penalty of CI hard-block. Hard-block remains a future option for v1.6+.

### Plan-level ordering constraints

- **D-23:** Phase 48 plan order driven by Wave-1 → Wave-2 dependency + atomicity-contract commits per Phase 43 D-07 precedent:
  1. **Rescue-style commit (Wave-1 atomic):** `v1.5-milestone-audit.mjs` Path A copy + `v1.5-audit-allowlist.json` skeleton (inherit v1.4.1 + refresh pin coords) + `BASELINE_9` refresh + `regenerate-supervision-pins.mjs --self-test` exits 0.
  2. **C10 commit:** Linux frontmatter check (`platform: Linux`, `last_verified` 60-day cycle) — blocking from start; covers Phase 49+ docs lazily (no Linux files yet).
  3. **C11/C12/C13 informational scaffolds:** ops-domain anti-pattern regex (C11) + 4-platform comparison structural validation (C12) + broken-link automation (C13). All emit compact `(informational)`. Sidecar arrays added lazily.
  4. **C6 + C7 graduation commit:** flip `informational: true` → remove flag (or `informational: false`) for C6 + C7. Verify v1.4.1 corpus passes C6 + C7 blocking before commit (regression-check against current `docs/admin-setup-android/06-aosp-stub.md` + `09..13-aosp-*.md` for C6; against full Android scope for C7).
  5. **`check-phase-48.mjs` validator:** asserts `v1.5-milestone-audit.mjs` exists + sidecar parses + BASELINE_9 self-test exits 0 + 48-VERIFICATION-broken-links.md exists with three category sections.
  6. **CI commit:** `audit-harness-v1.5-integrity.yml` new file + pre-commit hook contribution.
  7. **Wave-2 — `.mlc-config.json`:** markdown-link-check config (redirect-following enabled; internal-vs-external split; allowlist for transient external URLs; GFM-anchor-case handling).
  8. **Wave-2 — `#[A-Z]` precheck:** `grep -rn "#[A-Z]" docs/` results captured to inventory's Category A (PITFALL-15 mitigation).
  9. **Wave-2 — 179-file sweep:** run markdown-link-check on `docs/**/*.md`; categorize findings A/B/C; distinguish pre-existing v1.0–v1.4.1 breakage from any new-content breakage (no new content in Phase 48 — all findings are pre-existing).
  10. **Wave-2 — VERIFICATION artifact:** write `48-VERIFICATION-broken-links.md` per D-12 schema. Triage decisions left empty for Phase 60 (this phase produces the inventory; Phase 60–61 consume it).
  11. **Terminal sanity:** run `node scripts/validation/v1.5-milestone-audit.mjs --verbose` — expect 8/9+ PASS (C1–C5 + graduated C6/C7 blocking; C9 informational pass; C10–C13 informational pass on empty/baseline scope).

### Claude's Discretion

- Pre-commit hook tooling mechanism (Husky vs native vs lefthook) — pick what aligns with existing repo tooling; check `package.json`, `.husky/`, or `.git/hooks/` for current state at plan time.
- Exact text of `audit-harness-v1.5-integrity.yml` comment header (D-19) as long as it cites v1.4 + v1.4.1 in the frozen yml.
- Internal structure of `48-VERIFICATION-broken-links.md` triage table (markdown table format; column order can flex) as long as the three-category split + file/line/link-target shape is preserved per D-12.
- Exact `markdown-link-check` config (`.mlc-config.json`) flags as long as redirect-following + internal/external split + GFM-anchor-case-sensitivity handling are present.
- Phase numbering treatment for ROADMAP.md SC#1 contradiction (D-09) — wording correction commit at end of phase or VERIFICATION.md note only.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents (researcher, planner, executor) MUST read these before authoring or implementing.**

### Phase 48 success criteria + traceability (authoritative scope)

- `.planning/ROADMAP.md` §"Phase 48: Audit Harness Bootstrap + Broken-Link Sweep First Pass" (lines 117, 136-153) — Goal, 5 success criteria, methodology notes, requirement mapping
- `.planning/ROADMAP.md` §"v1.5 Shared Write Hotspot Ownership" (lines 411-432) — Phase 48 owns `scripts/validation/v1.5-audit-allowlist.json` creation; Phase 60 finalizes
- `.planning/ROADMAP.md` §"v1.5 Carry-Forward Methodology Gates" (lines 491-499) — VERIFICATION.md before downstream consumption + traceability in commit workflow + TBD scanning + append-only contract + pin coordinate stability + worktree cwd discipline
- `.planning/REQUIREMENTS.md` §AUDIT-01..08 (lines 81-89) — literal success-criteria text for each
- `.planning/REQUIREMENTS.md` §CLEAN-06, §CLEAN-07 (lines 18-20) — broken-link sweep scope statements
- `.planning/REQUIREMENTS.md` §"Out of Scope" (lines 105-117) — external MS Learn URL validation EXPLICITLY excluded from C13
- `.planning/REQUIREMENTS.md` §"Traceability" (lines 122-141) — AUDIT-01..08 + CLEAN-06/07 phase mapping

### v1.5 research (authoritative for tooling choices and pitfall avoidance)

- `.planning/research/SUMMARY.md` — executive summary; broken-link tooling choice (markdown-link-check); Phase 48 split-if-warranted note (line 134/156)
- `.planning/research/PITFALLS.md` §Pitfall 11 (lines 233-256) — Path A copy hazard; FROZEN-marker discipline; informational-first graduation contract
- `.planning/research/PITFALLS.md` §Pitfall 12 (lines 258-276) — sidecar pin coordinate stability; PITFALL-12 IS the failure mode that pin-coord refresh prevents
- `.planning/research/PITFALLS.md` §Pitfall 13 (lines 278-297) — ops-domain anti-pattern false-positive risk; informs C9-keep-informational decision
- `.planning/research/PITFALLS.md` §Pitfall 14 (lines 299-318) — Microsoft Learn redirect chain noise; informs `.mlc-config.json` redirect-following + external-allowlist
- `.planning/research/PITFALLS.md` §Pitfall 15 (lines 320-339) — GFM anchor case sensitivity; mandates `grep -rn "#[A-Z]" docs/` precheck

### v1.4.1 Phase 43 precedent (Path A harness pattern; atomicity contract)

- `.planning/milestones/v1.4.1-phases/43-v1-4-cleanup-audit-harness-fix/43-CONTEXT.md` — Phase 43 D-01..D-31 establish the entire Path A harness pattern; sidecar location/lifecycle; `regenerate-supervision-pins.mjs` 3-mode contract (`--report` / `--emit-stubs` / `--self-test`); two-tier discrimination (Tier 1 stub-eligible / Tier 2 suspected regression)
- `.planning/milestones/v1.4.1-phases/43-v1-4-cleanup-audit-harness-fix/43-PLAN.md` (any plan files) — order-of-commits implementation reference
- `.planning/milestones/v1.4.1-phases/43-v1-4-cleanup-audit-harness-fix/43-VERIFICATION.md` — proof-of-shipping pattern Phase 48 must mirror

### v1.4 / v1.4.1 frozen harness (code Phase 48 copies and modifies)

- `scripts/validation/v1.4.1-milestone-audit.mjs` — source of Path A copy. Lines 76-122 = `androidDocPaths()` (v1.5 adds `linuxDocPaths()` analog). Lines 128-353 = check definitions. Line 339-341 = C9 hardcoded fallback (sidecar-driven preferred).
- `scripts/validation/v1.4.1-audit-allowlist.json` — schema: `{schema_version, generated, phase, safetynet_exemptions[], supervision_exemptions[], cope_banned_phrases[]}`. v1.5 inherits verbatim then adds Linux/ops-domain arrays lazily.
- `scripts/validation/v1.4-milestone-audit.mjs` — FROZEN at commit 3c3a140 per Phase 43 D-02; do NOT modify
- `scripts/validation/v1.4-audit-allowlist.json` — paired sidecar; do NOT modify
- `scripts/validation/regenerate-supervision-pins.mjs` — line 390 = `BASELINE_9` array (currently stale per STATE.md line 90); refresh in same atomicity commit as harness Path A copy
- `scripts/validation/check-phase-30.mjs` + `check-phase-31.mjs` — pattern exemplars for `check-phase-48.mjs`

### CI workflow precedent

- `.github/workflows/audit-harness-integrity.yml` — full v1.4 + v1.4.1 yml structure (parse → path-match → harness-run → pin-helper-advisory). v1.5 yml structurally clones this. Lines 5-15 = trigger globs (extend with v1.5 paths in NEW yml); lines 25-35 = parse job (clone for v1.5 sidecar); lines 40-52 = path-match (clone for v1.5 harness); lines 60-65 = harness-run (clone); lines 67-92 = pin-helper-advisory (inherit `continue-on-error: true`)

### Project-level context

- `.planning/PROJECT.md` §"Current Milestone: v1.5 Linux Platform, Operational Depth & Cross-Platform Cleanup" — full v1.5 scope statement
- `.planning/STATE.md` — v1.5 milestone decisions recap; out-of-band carry-overs from v1.4.1 close (lines 88-92): BASELINE_9 stale + iOS/macOS/Windows admin templates `last_verified` not normalized + `v1.4.1-milestone-audit.mjs` C2 PASS-vs-self-test-FAIL semantic divergence
- `.planning/MILESTONES.md` (if exists) — milestone closure record pattern

### Downstream-phase dependencies (what Phase 48 unblocks)

- **Phase 49 (Linux Foundation)** depends on: live `v1.5-milestone-audit.mjs` running C10 blocking; sidecar present so Linux frontmatter additions land cleanly
- **Phase 50–58 content phases** depend on: harness running on each commit (CI integration); sidecar pin-coord-refresh procedure documented (D-21 advisory hook)
- **Phase 60 (Audit Harness Finalization)** depends on: `48-VERIFICATION-broken-links.md` Category A/B/C inventory exists for C13 second-pass triage diff (Phase 60 SC#3); C12 promotion triggered by Phase 58 file existence (Phase 60 SC#2)
- **Phase 61 (Terminal Re-Audit)** depends on: full v1.5 harness exit-0 from fresh auditor worktree

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets

- `scripts/validation/v1.4.1-milestone-audit.mjs` (391 lines) — entire harness including `walkMd()`, `parseAllowlist()`, `relNormalize()`, `androidDocPaths()`, and 8 check functions (C1–C7 + C9). v1.5 harness is direct Path A copy + additive (per Phase 43 D-01). DO NOT refactor shared utility functions out — Phase 42 D-25 locks file-reads-only / no-shared-module contract.
- `scripts/validation/v1.4.1-audit-allowlist.json` (41 lines, 18 supervision_exemptions + 4 safetynet_exemptions + 8 cope_banned_phrases) — direct verbatim copy source per D-13.
- `scripts/validation/regenerate-supervision-pins.mjs` (482 lines, 3 modes) — BASELINE_9 array at line 390; refresh pattern documented at lines 383-427. Self-test currently FAILING per STATE.md.
- `scripts/validation/check-phase-30.mjs` + `check-phase-31.mjs` — pattern exemplars for file-reads-only JSON+markdown validators. Use as style reference for `check-phase-48.mjs`.
- `.github/workflows/audit-harness-integrity.yml` (93 lines, 4 jobs) — full structure clone source for `audit-harness-v1.5-integrity.yml`.

### Established Patterns

- **Harness contract (Phase 42 D-25..D-31):** single-file, file-reads-only, graceful-degradation parse, additive-checks design, JSON sidecar with `{file, line, reason}` shape. v1.5 additions follow.
- **Path A versioning lineage (Phase 43 D-01..D-08):** copy + additive; predecessors stay FROZEN; sidecar co-located in `scripts/validation/`; sidecar filename matches harness milestone.
- **Atomicity-same-commit (Phase 42 D-20/D-22, Phase 43 D-07):** harness + sidecar moves + BASELINE_9 refresh land together. Phase 48 D-23 plan order applies.
- **Append-only H2-block contract (Phase 42 D-03):** any v1.5 phase touching shared files (CI yml, sidecar JSON, hub files) appends; never inserts above existing entries.
- **Validator-as-deliverable (v1.3+ pattern):** every phase ships `check-phase-NN.mjs`; CI workflow registers it.
- **TEMPLATE-SENTINEL pattern (Phase 43 D-24):** harness skips `last_verified: 1970-01-01 # TEMPLATE-SENTINEL` placeholders; `_*`-prefix dir scope-filter excludes templates. v1.5 C10 inherits this for Linux templates if any land in scope.
- **Informational-first graduation ladder (Phase 42 D-29 + Phase 43 D-06):** new check ships informational-first; one-milestone grace; then graduate unless documented reason. Phase 48 D-04..D-06 apply this.

### Integration Points

- **Harness invocation:** run from repo root via `node scripts/validation/v1.5-milestone-audit.mjs [--verbose]`. Exits 0 on all-PASS; 1 on any-FAIL. v1.4.1 harness retains same contract at its frozen path.
- **CI integration:** new `.github/workflows/audit-harness-v1.5-integrity.yml` runs on PR + scheduled weekly bitrot + workflow_dispatch. Pre-commit hook contributed via repo tooling (Husky/native — Claude's discretion at plan time).
- **Sidecar JSON is the integration surface** between Phase 48 authoring and downstream phases (49–60 add Linux/ops-domain pins as content lands). Schema: `{schema_version, generated, phase, safetynet_exemptions[], supervision_exemptions[], cope_banned_phrases[]}` initially; arrays added lazily per D-15.
- **Broken-link sweep tool:** `markdown-link-check` (npm, tcort/markdown-link-check) per research SUMMARY HIGH-MEDIUM confidence rating. Config at `.mlc-config.json` repo-root or `scripts/validation/`.
- **Capital-anchor pre-check:** `grep -rn "#[A-Z]" docs/` produces Category A inventory inputs (PITFALL-15 mitigation).
- **`check-phase-48.mjs` discovery:** registered in v1.5 yml; lazy-skip if absent (graceful degradation per Phase 42 D-31).

</code_context>

<specifics>
## Specific Ideas

- **Adversarial-review traceability:** All 4 gray areas resolved via finder/adversary/referee; finder scored 488 raw points; adversary disproved 116; referee adopted 14 disproves with 1 inversion (Gray Area 2 disposition: original Option C C7+C9-graduate flipped to refined C6+C7-graduate). Downstream planner should read DISCUSSION-LOG.md alongside this CONTEXT to understand rejected alternatives + the specific evidence that flipped the C6/C9 pair.
- **"YAGNI now, lazy array population":** Sidecar inherits v1.4.1 schema verbatim. Phase 49+ adds linux_exemptions / ops_domain_allowlist / etc. arrays ONLY when first legitimate exemption appears. Pre-creating empty arrays at Phase 48 (Option B3) was rejected as YAGNI per Phase 43 D-05 plugin-architecture-rejection rationale.
- **"BASELINE_9 refresh + sidecar inherit + `--self-test` PASS = ONE ATOMIC COMMIT":** Closes AUDIT-07 + lifts the v1.4.1 close out-of-band carry-over in single Wave-1 commit. STATE.md lines 88-92 explicitly require this.
- **"Frozen-predecessor anchor refers to v1.4.1, not v1.5":** PITFALL-11 warning sign — v1.5 harness header comments must NOT label v1.5 itself frozen. The frozen-marker semantic refers to PREDECESSOR (v1.4.1) anchoring v1.5's reproducibility lineage.
- **"Path A is file-versioning, not no-edit":** Adversary disprove of 2C.MED-1 confirmed Path A copy permits adding new check logic (Phase 43 D-06 added wholly new C6/C7/C9 to v1.4.1 Path A copy). v1.5 Phase 48 may add C7 allowlist mechanism if Phase 49+ Linux glossary cross-platform see-also produces false positive.
- **"VERIFICATION artifacts persist; INPUT artifacts get deleted":** D-11 disambiguation prevents future phase planners from confusing the two lifecycles. The 48-VERIFICATION-broken-links.md inventory is reference data for Phase 60–61, not a consumed input.
- **"Pre-commit advisory ≠ pre-commit hard-block":** D-20/D-21 specifically chose ADVISORY exit-0 mode. Phase 43 D-14's rejection of pre-commit applies to hard-block enforcement; advisory mode is a distinct intermediate option that didn't exist at v1.4.1 close.
- **Ops-domain false-positive triage owner:** When Phase 53/54/55/56 land "deprecated"/"removed"/"end of life" tokens in legitimate context (DDM deprecated commands, Ubuntu 20.04 EOL, Android AMAPI migration), the C9 informational output is the audit signal. The triage owner is the phase plan author (per phase) — they update `cope_banned_phrases[]` allowlist or the C9 negation pattern, not Phase 48 author.

</specifics>

<deferred>
## Deferred Ideas

- **CI advisory → blocking promotion ladder for pin drift:** Phase 43 D-15 said "promote CI advisory → blocking in v1.5 if false-positive rate is near-zero over 3 months." v1.5 Phase 48 advances ladder one rung (CI advisory → pre-commit advisory + CI advisory) but stops short of CI hard-block. Revisit at v1.6+ once pre-commit advisory has milestone of usage data.
- **Plugin-architecture harness refactor:** Earned at v1.6+ once v1.4 / v1.4.1 / v1.5 harnesses show three milestones of concrete duplication. Backlog note: "See Phase 43 CONTEXT D-05 for rationale; Phase 48 CONTEXT D-15 reaffirms."
- **C7 sidecar allowlist mechanism:** Currently hardcoded suffix list in harness. Earned if Phase 49+ Linux glossary or ops-depth content produces false positives. Add to `v1.5-audit-allowlist.json` as `c7_knox_allowlist[]` array using same `{file, line, reason}` shape per Phase 42 D-26.
- **`broken_link_external_allowlist` array:** Pre-creation was rejected as conflicting with REQUIREMENTS Out of Scope external-MS-Learn-URL exclusion. If C13 graduates to blocking in Phase 60 AND external URL scope expands later, add then.
- **iOS/macOS/Windows admin template `last_verified` normalization:** v1.4.1 STATE.md carry-over (Android-scope lock per Phase 43 D-25). v1.5 Phase 48 broken-link sweep may surface freshness drift in these templates as Category A/B findings; Phase 60 second pass triages and fixes if warranted.
- **Pre-commit hook tooling standardization:** Husky vs native vs lefthook decision punted to plan-time per Phase 43 D-claudes-discretion + D-21. If repo settles on a tool, document in `.planning/PROJECT.md` Key Decisions table for v1.6+.
- **Hard-CI blocking on pin drift:** Option upgrade from D-21 advisory → blocking. Revisit once v1.5 ships and pre-commit advisory false-positive rate is known. If near-zero over 3 months, promote pre-commit advisory → CI hard-block in v1.6+.
- **C12 promotion-condition complexity:** AUDIT-04 has TWO promotion conditions (informational scaffold in Phase 48; blocking once `4-platform-capability-comparison.md` exists in Phase 58). If C12 logic gets complex, split into C12a (file-existence pre-gate) + C12b (structural validation post-gate) in Phase 60. v1.5 Phase 48 keeps it as single C12 informational scaffold.
- **`audit-harness-v1.5-integrity.yml` archive lifecycle:** When v1.6 ships, this yml may freeze (becoming reproducibility infrastructure for v1.5 replay). v1.6 yml will be a new file. Backlog: document yml-archival pattern parallel to harness-archival pattern at v1.6 milestone-start.

### Reviewed Todos (not folded)

*(No pending todos matched Phase 48 scope — todo match-phase returned 0 matches.)*

</deferred>

---

*Phase: 48-audit-harness-bootstrap-broken-link-sweep-first-pass*
*Context gathered: 2026-04-26*
*Adversarial review applied: finder/adversary/referee on all 4 gray areas*
