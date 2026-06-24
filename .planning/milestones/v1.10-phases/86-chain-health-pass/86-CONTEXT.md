# Phase 86: Chain Health Pass - Context

**Gathered:** 2026-06-23
**Status:** Ready for planning

<domain>
## Phase Boundary

Make the legacy validator chain `check-phase-{48..82}.mjs` exit **0 FAIL / 0 SKIPPED** on **both** Windows local **and** Linux GHA, via frozen-aware conversion with **no `CHAIN_SKIP` masking** — *before* any v1.10 harness files are authored (Phase 88). Requirements: CHAIN-01, CHAIN-02.

**Grounding finding that reframes the roadmap's "10 legacy FAILs":** Running all 10 suspect validators showed the real work is **NOT** 10 independent HEAD-coupled assertions. It is:
- **2 genuine root-cause assertions:** check-phase-58 `V-58-10` + check-phase-59 `V-59-24`
- **1 archived-inventory path issue:** check-phase-73 `V-73-INVENTORY`
- **7 pure-cascade validators:** check-phase-{60,61,62,63,64,65,66} fail *only* because their chain regression-guards spawn 58/59 — they clear with **zero edits** once 58/59 are fixed
- **+ a 0-SKIPPED scope expansion** (see D-05): the `V-N-AUDIT` skip-PASS reads of archived `*-VERIFICATION.md` (check-phase-72, 73, and apex 82) emit real SKIPPED and must also be made archive-aware

**In scope:** convert 58/59 assertions to frozen-aware; make 73 + the V-N-AUDIT reads archive-aware; verify apex 0 FAIL / 0 SKIPPED on Windows + Linux GHA.
**Out of scope:** authoring any v1.10 harness/validator files (Phase 88); editing predecessor frozen surfaces (workflow YAMLs, milestone-audit `.mjs`, sidecar JSONs); any `CHAIN_SKIP` entry; touching cascade validators 60-66.

</domain>

<decisions>
## Implementation Decisions

All four gray areas were adjudicated via `/adversarial-review` (Finder → Adversary → Referee, opus). Final rulings below; full reasoning in `86-DISCUSSION-LOG.md`.

### D1 — Root-cause fix strategy (V-58-10 & V-59-24) → FROZEN-AWARE, both
- **D-01:** Convert **both** `V-58-10` (check-phase-58.mjs) and `V-59-24` (check-phase-59.mjs) to **frozen-aware reads at the v1.5-close SHA `ba2cbc0`** (`V15`) via `_lib/frozen-at-close.mjs` (`readAtV15Close`), tagging each check name `[v1.5-frozen @ ba2cbc0]`. Matches the roadmap-LOCKED pattern (ROADMAP SC#1 names these by mechanism) and the existing check-phase-61/67 precedent.
- **Verified deterministic:** at `ba2cbc0` the comparison doc frontmatter is `2026-05-01 → 2026-06-15` = exactly **45 days** (passes `days === 45`); and all glossary `> See also:` lines are 2-line blockquotes (passes V-59-24). Both are fixed historical constants — no run-date math, cross-OS stable forever.
- **Adversary overturn on V-58-10 was REVERSED by the Referee.** The Adversary argued the 45-day "D-19" cadence was superseded project-wide by the "DS-2 90-day cadence" (commit `624da88`, Phase 79; live doc now 92 days) and proposed a tolerant `days > 60` rule-fix. Rejected because: (1) ROADMAP SC#1 prescribes frozen-aware **by name** for all 10; (2) the proposed `days > 60` rule **still fails** the live 92-day doc (92 > 60); (3) V-58-10 is an *as-shipped Phase-58 deliverable* assertion, not the live-freshness sentinel (live freshness is owned by current-milestone validators). Frozen-aware is the only deterministic, in-contract, semantically-honest fix.
- **V-59-24 frozen-aware UPHELD:** the live single-line `> See also:` blockquotes (`_glossary.md:115,162`; `_glossary-macos.md:134,140,146`) are a *deliberate* v1.9/v1.10 authoring style, not a defect — do **not** content-fix them.

### D2 — 73-RETRO-INVENTORY.md restoration → ARCHIVE-AWARE
- **D-02:** Make `V-73-INVENTORY` (check-phase-73.mjs:76) **archive-aware** via the existing `resolveArchivedPhasePath(phaseSuffix, ['v1.8-phases'])` from `_lib/archive-path.mjs` — do **not** restore/copy a duplicate file into the active tree, and do **not** regenerate. The file exists only at `.planning/milestones/v1.8-phases/73-retrospective-forward-port-pillar-c/73-RETRO-INVENTORY.md` and has exactly **19** `| check-phase-` rows (passes the `>= 19` gate). Default `milestoneRoots` is `['v1.5-phases']`, so the explicit `['v1.8-phases']` second arg is **required** (precedent: check-phase-62/63 pass `['v1.6-phases']`).

### D3 — "0 SKIPPED" interpretation + cascade handling → LITERAL ZERO
- **D-03 (literal 0 SKIPPED):** SC#3/#4 mean **literally 0 SKIPPED** (ROADMAP.md:121-122), not "non-masking skips OK." **Scope expansion:** the `V-N-AUDIT` checks that read live `*-VERIFICATION.md` paths now resolve to archived files and emit real skip-PASS — at minimum `V-72-AUDIT-VERIFY` (check-phase-72.mjs:112, archived v1.8-phases), `V-73-AUDIT` (check-phase-73.mjs:169, archived v1.8-phases), and apex `V-82-AUDIT` (check-phase-82.mjs, archived v1.9-phases). Convert these reads to **archive-aware** (same mechanism as D-02) so the apex tally hits literal 0 SKIPPED.
- **D-04 (cascade):** Cascade validators check-phase-{60,61,62,63,64,65,66} get **ZERO edits** — they auto-clear once 58/59 exit 0. Keep the `CHECK_PHASE_NESTED=1` recursion guard (structural, not masking). `CHAIN_SKIP` stays an empty `Set([])` (Phase 68 `7b635ca` invariant) — no entries added or expanded.

### D4 — Linux GHA cross-OS proof → DISPATCH EXISTING WORKFLOW
- **D-05:** Obtain the Linux GHA cross-OS EXACT-MATCH proof by **`workflow_dispatch` on the existing `.github/workflows/audit-harness-v1.9-integrity.yml`** — its `linux-chain-ubuntu-latest` job already runs apex `check-phase-82.mjs --verbose` with `core.autocrlf false` + `fetch-depth: 0` + `continue-on-error: false`. Do **not** author a throwaway workflow, and do **not** defer cross-OS proof to Phase 88 (roadmap-illegal: the Goal requires Linux-green *before* v1.10 harness files, which Phase 88 authors). The v1.9 sidecar gating (`needs: parse → path-match → harness-run`) is satisfiable at HEAD.

### Cross-cutting (confirmed, not a gray area)
- **Editing `check-phase-{58,59,72,73,82}.mjs` is PERMITTED.** Chain validators are explicitly **NOT** in the predecessor-byte-unchanged HARD gate (`v1.9-MILESTONE-AUDIT.md:267` — *"(Chain validators `check-phase-{48..81}.mjs` are NOT in this invariant.)"*). The gate covers only workflow YAMLs + milestone-audit `.mjs` + sidecar JSONs.

### Claude's Discretion
- Per-plan commit granularity (atomic vs progressive) within the no-`CHAIN_SKIP` / no-predecessor-edit constraints — planner's call.
- Exact `readAtV15Close` call-site refactor shape inside 58/59 (inline import vs helper), matching the closest existing precedent.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase contract & requirements
- `.planning/ROADMAP.md` §"Phase 86: Chain Health Pass" — Goal + SC#1-4 (frozen-aware mandate, no CHAIN_SKIP, 0 FAIL / 0 SKIPPED Windows + Linux). SC#3/#4 literal "0 SKIPPED" is load-bearing for D-03.
- `.planning/REQUIREMENTS.md` — CHAIN-01, CHAIN-02 (lines 51-52).
- `.planning/milestones/v1.9-MILESTONE-AUDIT.md` §267 — predecessor-byte-unchanged HARD gate explicitly EXEMPTS chain validators (authorizes editing 58/59/72/73/82).

### Target validators (to edit)
- `scripts/validation/check-phase-58.mjs` §V-58-10 (~line 197-214) — `days === 45` assertion → frozen-aware (D-01).
- `scripts/validation/check-phase-59.mjs` §V-59-24 — `> See also:` 2-line-blockquote assertion → frozen-aware (D-01).
- `scripts/validation/check-phase-73.mjs` §V-73-INVENTORY (~line 71-83, hardcoded path line 76) + §V-73-AUDIT (line 169) → archive-aware (D-02, D-03).
- `scripts/validation/check-phase-72.mjs` §V-72-AUDIT-VERIFY (line 112) → archive-aware (D-03).
- `scripts/validation/check-phase-82.mjs` §V-82-AUDIT (apex VERIFICATION read) → archive-aware (D-03).

### Frozen-aware + archive-path machinery (to consume)
- `scripts/validation/_lib/frozen-at-close.mjs` — `readAtV15Close` / `MILESTONE_CLOSE_SHAS.V15 = 'ba2cbc0'` (D-01 reader).
- `scripts/validation/_lib/archive-path.mjs` — `resolveArchivedPhasePath(phaseSuffix, milestoneRoots = ['v1.5-phases'])`; pass `['v1.8-phases']` for 72/73, `['v1.9-phases']` for 82 (D-02, D-03).
- Precedent call-sites: check-phase-62/63 (explicit `['v1.6-phases']`), check-phase-61/67 (frozen-aware `[v1.X-frozen @ SHA]` suffix pattern).

### Data files (read-only inputs)
- `.planning/milestones/v1.8-phases/73-retrospective-forward-port-pillar-c/73-RETRO-INVENTORY.md` — archived, 19 rows (D-02 target).
- `docs/reference/4-platform-capability-comparison.md` — live frontmatter is 92-day (do NOT content-fix; D-01 freezes the assertion instead).

### Cross-OS verification
- `.github/workflows/audit-harness-v1.9-integrity.yml` — `workflow_dispatch` + `linux-chain-ubuntu-latest` runs apex `check-phase-82 --verbose` (D-05 cross-OS proof vehicle).

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `readAtV15Close()` / `MILESTONE_CLOSE_SHAS.V15='ba2cbc0'` (`_lib/frozen-at-close.mjs`): drop-in frozen reader for D-01 — no new SHA entry needed (V15 already published).
- `resolveArchivedPhasePath()` (`_lib/archive-path.mjs`): live-first-then-archived resolver, non-throwing (caller owns FAIL semantics) — covers D-02 and D-03 with the right `milestoneRoots` arg.

### Established Patterns
- Frozen-aware conversion idiom: import reader, replace `readFile(path)` with `readAtV15Close(path)`, append `[v1.5-frozen @ ba2cbc0]` to the check `name`. Mirrors check-phase-61 (V-61-17..20) and check-phase-67 (V-67-05/06) from Plan 73-02.
- `CHAIN_SKIP = new Set([])` invariant (Phase 68 `7b635ca`): never add entries — frozen-aware/archive-aware conversions replace masking.
- NESTED recursion guard (`CHECK_PHASE_NESTED=1`): child subprocess chain-guards skip recursive re-expansion; these skips are internal to captured-stdout subprocesses and do NOT count toward the apex SKIPPED tally — leave intact.

### Integration Points
- Cascade chain: check-phase-{60..66} each spawn 58/59 via `execFileSync('node',[path])` regression-guards — fixing 58/59 propagates automatically; do not touch.
- Apex: `check-phase-82.mjs` is the chain head (CHAIN_PHASES ends at 81); its tally is the SC#3/#4 verification surface. No new validators added in Phase 86, so 82 remains apex.

</code_context>

<specifics>
## Specific Ideas

- **Open verification item (carry into plan/verify):** run the full apex once — `node scripts/validation/check-phase-82.mjs --verbose` — to enumerate the *exact* final SKIPPED set after the D-03 conversions and confirm zero remain. The Referee flagged its V-N-AUDIT analysis as HIGH-confidence on the AUDIT-class skips but MEDIUM on completeness (apex not fully run during adjudication). The plan must include this enumeration step, not assume the three known reads are the complete set.
- Frozen SHA is `ba2cbc0` (V15) for both D-01 assertions — verified to pass deterministically.

</specifics>

<deferred>
## Deferred Ideas

- **v1.10 harness lineage bump (Atom 1 + Atom 2), V19 close-gate SHA pin, check-phase-83..88 validators, audit-harness-v1.10-integrity.yml** — all Phase 88 (MUST be last; Phase 86 explicitly must NOT fold into Atom 2 — Anti-Pattern 5).
- **`FROZEN-AWARE-ADOPTION-SWEEP-01`** (refactor remaining inline frozen readers in check-phase-{61,67,68,70} to consume `_lib/frozen-at-close.mjs`) — pre-existing v1.9+ deferral, not in Phase 86 scope unless a target file already requires it.
- None — discussion stayed within phase scope.

</deferred>

---

*Phase: 86-chain-health-pass*
*Context gathered: 2026-06-23*
