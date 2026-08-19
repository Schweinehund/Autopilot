# Phase 139: Governance CARVE + fetch-depth Retrofit + Shallow-Job Repair - Research

**Researched:** 2026-08-05
**Domain:** GitHub Actions CI topology, git plumbing (shallow clones, frozen-tree reads), Node.js validator-chain tooling on an existing repo
**Confidence:** HIGH — every claim below was either read directly from the file at HEAD `582ae3c0`, or produced by running the exact command against this repo in this session (marked `[VERIFIED: <path>]` or `[VERIFIED: command]`). CONTEXT.md's `[MEASURED]` figures were independently re-derived, not merely trusted.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

Phase 139-CONTEXT.md records 42 decisions (D-01..D-42), produced via `/grill-me` + `/adversarial-review` (72 issues found, 61 confirmed, 10 pre-review recommendations reversed). Full text is in
`.planning/phases/139-governance-carve-fetch-depth-retrofit-shallow-job-repair/139-CONTEXT.md` — this research does not re-decide any of them. Summary of the load-bearing ones, cross-checked against the repo in this session:

- **D-01/D-02/D-03/D-04/D-05:** The CARVE is one file, `.planning/milestones/v1.20-CARVE.md`, named `v1.20-CARVE` (not `CARVE-1`), category-based allowlist spanning Phases 139–144, and records that Phase 133's D-04 (no close-SHA `ref:` checkout) stays in force — `fetch-depth: 0` is orthogonal to `ref:`.
- **D-06/D-07:** The byte-unchanged gate is `scripts/validation/carve-gate.mjs`, diff-based (`git diff --name-status` without `..HEAD`, plus `git status --porcelain --untracked-files=all`), scope `scripts/ .github/ docs/ .gitattributes package.json`, `.planning/` excluded. It is explicitly **NOT** adopted as a `check-phase-139.mjs` chain assertion.
- **D-08:** Enforcement is the gate script + a `.claude/hooks/` Stop-hook modelled on `publish-bundle-gate.cjs` (read-only, nudge-then-warn).
- **D-09/D-10/D-11/D-12:** Amendment-before-edit procedure; hard-block gate failure; ledger at `.planning/milestones/v1.20-GOV-02-LEDGER.md`, row-per-edit; GOV-02 grep is target-scoped (path string + symbol), not symbol-only.
- **D-13..D-17:** SWEEP-01 covers **all 97 shallow checkouts across all 16 workflows** (not just the 32 in the three named files) — re-verified independently this session, see Finding 1. This is an explicit success-criterion amendment. `fetch-depth: 0` is added to `paths:` filter of `audit-harness-integrity.yml` (D-17).
- **D-18..D-22:** `check-phase-69.mjs` / `check-phase-70.mjs`'s `PRED_BLOBS` `git hash-object` pins on the three workflows are converted to **frozen-to-frozen** (`git rev-parse <V17>:<path>` vs. the check-phase-63 pattern), not re-baselined. No `.gitattributes` change.
- **D-23..D-26:** SWEEP-02's CI-evidence criterion is re-scoped to a dedicated `frozen-read-probe` job (no `needs:`), dispatched from a **short-lived feature branch** (never master), evidenced by job-level JSON.
- **D-27..D-33:** "Fail loud" = delete the `try/catch`, not convert to explicit FAIL. **Four** sites fixed (not three): `check-phase-49.mjs:264`, `:297`, `:334`, and `check-phase-51.mjs:31`. The typed-cause classifier in `_lib/frozen-at-close.mjs` needs a **six-pattern** union (`unreachable-sha` ← 3 patterns, `absent-path` ← 2 patterns, else `other`). The negative test uses `file:///...` shallow-clone form (mandatory), with a `.git/shallow` existence guard, and covers **three** cases. The remaining ~34 swallow sites become new requirement SWEEP-09 (Phase 141).
- **D-34..D-40:** `lsTreeAtClose(milestoneTag, dirPrefix, { ext } = {})` mirrors `readAtClose`'s per-milestone-tag pattern (no raw-SHA form). Throw on git failure, `[]` only for a valid-but-empty prefix. Uses `git ls-tree -r -z --name-only <sha> -- <prefix>`, split on NUL, `.filter(Boolean)` mandatory. Six-assertion `--self-test` including an exact-count assertion, a shallow-clone `unreachable-sha` arm, and a wall-clock print.
- **D-41:** Five atoms, strict order: (1) CARVE + gate + hook + ledger; (2) `_lib/frozen-at-close.mjs` (`frozenCause`, `lsTreeAtClose`, `--self-test`); (3) the four fail-loud sites + `file://` negative harness; (4) `check-phase-69/70` `PRED_BLOBS` → frozen-to-frozen (moved ahead of the workflow edit); (5) the 97-checkout sweep + `frozen-read-probe` job + D-17 paths fix, one commit — then the owner-gated feature-branch push + dispatch.
- **D-42:** Two extra regression gates: `V-68-01`'s regex has **two** matches in `check-phase-51.mjs` (`:18` in `readFile`, `:93` inside `V-51-05`) — the gate must target `:18` specifically, not just "any match"; and re-run all **21** real importers (not the loosely-stated "24") of `_lib/frozen-at-close.mjs` before/after atom 2, asserting `err.message` shape is unchanged. See Finding 9 below — the 21-vs-24 distinction in CONTEXT.md D-42 itself is now resolved with an exact file list.

### Claude's Discretion

- Exact wording of the CARVE narrative, ledger row schema, and gate CLI flags.
- Whether `carve-gate.mjs` and the Stop-hook share a module or duplicate a small helper.
- Naming of the `frozen-read-probe` job and its step layout.
- How the `--self-test` prints assertion (vi)'s wall-clock number.

### Deferred Ideas (OUT OF SCOPE)

- SWEEP-09 — the remaining ~34 silent-swallow frozen-read sites across ~19 validators (Phase 141).
- `if: always()` on the fanned-out validator jobs — deletes the `needs: harness-run` skip-masking, but only after Phase 141 greens the harnesses.
- V14 pin SHA choice (`b5cf529` vs `671f72a`) — Phase 140, SWEEP-08, already a named design fork.
- `walkMd` beyond the 17 harnesses — 30 definitions repo-wide; only the harness copies are in Phase 140's scope.
- Moving `PRED_BLOBS` to a sidecar — moot under frozen-to-frozen (D-19); revisit only if Phase 144's 17th workflow creates a similar twin-map problem.

</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| GOV-01 | One named milestone-scoped CARVE records a file allowlist (frozen harnesses + workflows + 9 Pillar-C files) with a byte-unchanged gate on everything off-list | Finding 6 (Pillar-C real paths), Finding 7 (byte-unchanged gate class precedents), Finding 8 (hook registration pattern) |
| GOV-02 | Every frozen-surface edit preceded by a grep for pinning call-sites + a regression gate | Finding 5 (V-111-TOOL03 mechanism), Finding 4 (check-phase-66 target-scoped-grep example), Finding 9 (21-importer regression-gate scope) |
| SWEEP-01 | Every checkout that performs/triggers a frozen read carries `fetch-depth: 0` | Finding 1 (exact checkout/fetch-depth counts, re-derived), Finding 2 (YAML idiom to replicate), Finding 3 (workflow_dispatch + feature-branch dispatch precedent) |
| SWEEP-02 | The 11 already-frozen-aware validators in previously-shallow jobs read successfully in CI | Finding 10 (exact enumeration of the 11, derived and verified this session — not previously enumerated in CONTEXT.md) |
| SWEEP-03 | `check-phase-49.mjs:264/:297/:334` + `check-phase-51.mjs:31` fail loud, proven by a negative test | Finding 11 (exact current code at all 4 sites, verbatim), Finding 12 (verified stderr taxonomy, all 3 patterns reproduced live) |
| SWEEP-04 | `_lib/frozen-at-close.mjs` gains `lsTreeAtClose()` | Finding 13 (current file contents in full — nothing to build on yet, greenfield within the file) |

</phase_requirements>

## Summary

This phase is pure CI-topology and validator-tooling work on a mature, heavily self-validating repo — there is no new external library to select. Every artifact this phase touches already exists at a known path and (where relevant) a known line number; CONTEXT.md's 42 locked decisions are unusually precise (line-cited, `[MEASURED]`-tagged) because they were produced by a prior `/grill-me` + `/adversarial-review` pass against live code. This research's job was therefore almost entirely **verification**, not discovery: re-run every `[MEASURED]` claim in CONTEXT.md against the repo at HEAD `582ae3c0` and report any drift.

**Result: every load-bearing numeric/positional claim in CONTEXT.md checked out exactly** — the 4/18/10 checkout counts, the 182/85/97 repo-wide totals, the 13-files-at-5-shallow-each pattern, all cited `check-phase-NN.mjs:LINE` locations, the `PRED_BLOBS` hash matches, the V-111-TOOL03 mechanism, the `.gitattributes` single-line content, the three-pattern git-stderr taxonomy (reproduced live in a real `file://` shallow clone this session), and the `git ls-tree`/`readAtClose` precedents SWEEP-04 builds on. Two things were **not yet in CONTEXT.md and are new findings from this session**: (1) the exact enumeration of SWEEP-02's "11 validators" — CONTEXT.md asserts the count but never lists them; this research derives and verifies the exact 11 files (Finding 10); (2) D-42's own text uses two different importer counts ("21 other importers" vs "run all 24 importers") in the same sentence — this research resolves the discrepancy: 24 is the raw grep-hit count (includes 3 files that only *mention* `frozen-at-close` in a comment, never `import` it), 21 is the count of files with a real `import ... from './_lib/frozen-at-close.mjs'` statement, and D-42's own "21" figure is the one the regression gate must actually use (Finding 9).

**Primary recommendation:** Plan this phase exactly along the D-41 atom order (CARVE/gate/hook/ledger → `_lib/frozen-at-close.mjs` additions → 4 fail-loud sites + negative test → `PRED_BLOBS` frozen-to-frozen conversion → 97-checkout sweep + probe job, one commit → feature-branch dispatch). Every atom has a verified, ready-to-copy code precedent already in this repo (listed per-finding below); no new dependency, library, or external API is needed anywhere in this phase.

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Governance allowlist + byte-unchanged gate (GOV-01) | Repo tooling (`scripts/validation/`) | Planning docs (`.planning/milestones/`) | The gate is a Node script; its authorization artifact is a markdown+fenced-block doc under `.planning/`, deliberately outside the gate's own diff-scope (D-06) |
| Edit-discipline enforcement (GOV-02) | Claude Code hooks (`.claude/hooks/`) | Repo tooling | A Stop-hook is the only tier that can nudge/warn *during* a session, before a commit lands — matches the existing `publish-bundle-gate.cjs` precedent |
| `fetch-depth: 0` retrofit (SWEEP-01) | CI / GitHub Actions (`.github/workflows/`) | — | Pure workflow-YAML edit; no application-tier code involved |
| Shallow-job proof (SWEEP-02) | CI / GitHub Actions | Repo tooling (validators being proven) | The proof is a dispatched CI run; the thing being proven already lives in `scripts/validation/` |
| Fail-loud frozen reads (SWEEP-03) | Repo tooling (`scripts/validation/`) | — | Validator-internal control-flow change; no CI or planning-doc involvement |
| Frozen enumeration API (SWEEP-04) | Repo tooling (`_lib/frozen-at-close.mjs`) | — | A library addition consumed by Phase 140's harnesses; this phase only builds and self-tests it |

## Standard Stack

Not applicable in the conventional sense — this phase adds zero new runtime dependencies. All work uses:

| Tool | Version (verified this session) | Purpose |
|------|-----|---------|
| Node.js | v24.17.0 `[VERIFIED: node --version]` | Runs all `scripts/validation/*.mjs` validators |
| git | 2.51.0.windows.2 `[VERIFIED: git --version]` | `git show`, `git rev-parse`, `git ls-tree`, `git hash-object`, `git diff`, `git status` — all plumbing already used identically elsewhere in this repo |
| gh CLI | 2.81.0, authenticated as `Schweinehund` `[VERIFIED: gh --version / gh auth status]` | Required for the D-24/D-25 `gh workflow run --ref <branch>` dispatch and `gh run view --json jobs` evidence |
| GitHub Actions `actions/checkout@v4` | pinned repo-wide, no change needed | The action whose `fetch-depth` default (1) is the entire SWEEP-01 problem |

**Package Legitimacy Audit:** Not applicable — this phase installs no packages (no `npm install`, no new `import` of a third-party module). Skip.

## Architecture Patterns

### System Architecture Diagram

```
                    ┌─────────────────────────────────────────────┐
                    │  .planning/milestones/v1.20-CARVE.md         │
                    │  (narrative + fenced allowlist block)        │
                    └───────────────┬───────────────────────────────┘
                                    │ read by
                                    ▼
   plan commits (139-144) ──► scripts/validation/carve-gate.mjs ──► exit 0/1
                                    │                                  │
                                    │ nudge/warn                       │ hard-block
                                    ▼                                  ▼
                    .claude/hooks/ Stop-hook (D-08)          plan verification step
                                    │
                                    ▼
                    .planning/milestones/v1.20-GOV-02-LEDGER.md (row-per-edit)

   ─────────────────────────────────────────────────────────────────────────

   .github/workflows/audit-harness-{base,v1.5,v1.6}-integrity.yml
        │  every `actions/checkout@v4` step gains `with: { fetch-depth: 0 }`
        ▼
   git object graph now FULL (not depth-1) in every job
        │
        ▼
   scripts/validation/_lib/frozen-at-close.mjs
        │  readAtClose(tag, path) --git show <SHA>:<path>--►  succeeds where it
        │                                                      previously threw
        │  lsTreeAtClose(tag, dir) --git ls-tree -r -z <SHA>-► NEW enumeration API
        ▼
   scripts/validation/check-phase-{49,50,51,52,57,58,59,61,62,63,65}.mjs
        (the 11 validators — SWEEP-02, Finding 10) now read frozen content
        successfully instead of silently swallowing the git-show failure

   ─────────────────────────────────────────────────────────────────────────

   check-phase-49.mjs:264/:297/:334, check-phase-51.mjs:31
        │  BEFORE: try { readAtVxxClose(f) } catch { content = null/"" }
        ▼
        │  AFTER:  readAtVxxClose(f)   -- throw propagates to the runner's own
        │           top-level try/catch (already present at :362/:411),
        │           which converts it to one FAIL row -- no swallow anywhere
        ▼
   dispatched `gh workflow run --ref <feature-branch>` + `frozen-read-probe` job
        │  proves, in real CI, that a `git show <old-sha>:<path>` succeeds
        ▼
   `gh run view <id> --json jobs`  (SWEEP-01 SC#2 / SWEEP-02 evidence — never
                                     the checks-UI colour)
```

### Recommended Task/Atom Structure (mirrors D-41)

```
Atom 1 — Governance (GOV-01, GOV-02)
├── .planning/milestones/v1.20-CARVE.md          # narrative + fenced allowlist
├── scripts/validation/carve-gate.mjs             # diff-based gate script
├── .claude/hooks/v1.20-carve-gate.cjs (name TBD) # Stop-hook, nudge-then-warn
├── .claude/settings.local.json                   # register the hook (gitignored)
└── .planning/milestones/v1.20-GOV-02-LEDGER.md   # append-only, row-per-edit

Atom 2 — Frozen enumeration API (SWEEP-04)
└── scripts/validation/_lib/frozen-at-close.mjs   # + lsTreeAtClose, + frozenCause,
                                                     + --self-test (6 assertions)

Atom 3 — Fail-loud (SWEEP-03)
├── scripts/validation/check-phase-49.mjs         # delete 3 try/catch (:264,:297,:334)
├── scripts/validation/check-phase-51.mjs         # delete 1 try/catch (:31)
└── (new) negative test using file:// shallow clone, 3 cases, .git/shallow guard

Atom 4 — Frozen-to-frozen pin conversion (GOV-02 precedent applied)
├── scripts/validation/check-phase-69.mjs         # PRED_BLOBS -> git rev-parse <V17>:<path>
└── scripts/validation/check-phase-70.mjs         # same

Atom 5 — The sweep (SWEEP-01, SWEEP-02)
├── .github/workflows/audit-harness-integrity.yml       # 4 checkouts -> fetch-depth:0
│                                                          + paths: add .github/workflows/**
├── .github/workflows/audit-harness-v1.5-integrity.yml  # 18 checkouts -> fetch-depth:0
├── .github/workflows/audit-harness-v1.6-integrity.yml  # 10 checkouts -> fetch-depth:0
├── .github/workflows/audit-harness-v1.{7..19}-integrity.yml (13 files) # 5 shallow each -> 0
├── (new) frozen-read-probe job, one per retrofitted workflow, no `needs:`
└── feature-branch push + `gh workflow run --ref <branch>` + job-level JSON evidence
```

### Pattern 1: Frozen-to-frozen byte-unchanged gate (the D-19 GOV-02 precedent)
**What:** Compare a git blob hash **recorded as a baseline** against the blob **at a frozen milestone-close SHA** — never against the live worktree.
**When to use:** Any invariant of the form "file X must not have changed since predecessor milestone Y closed."
**Example (existing, `check-phase-63.mjs:208-230`):**
```javascript
// Source: scripts/validation/check-phase-63.mjs:208-230 [VERIFIED: read this session]
// === V-63-08: macos-capability-matrix.md byte-unchanged vs baseline blob 732588a57fd762c294400a4f6fd9a065c974216c ===
{
  id: 8, name: 'V-63-08: macos-capability-matrix.md byte-unchanged vs baseline blob 732588a57fd762c294400a4f6fd9a065c974216c [v1.13-frozen @ ba24f1a]',
  run() {
    // frozen-aware: compare the blob AT v1.13-close (ba24f1a) ... to the recorded
    // baseline (frozen-to-frozen, always equal).
    const BASELINE = '732588a57fd762c294400a4f6fd9a065c974216c';
    const FROZEN_SHA = MILESTONE_CLOSE_SHAS.V113;  // ba24f1a
    try {
      const result = execFileSync('git', ['rev-parse', FROZEN_SHA + ':' + MACOS_MATRIX], { stdio: 'pipe', cwd: process.cwd() });
      const actual = result.toString().trim();
      if (actual !== BASELINE) {
        return { pass: false, detail: 'macos-capability-matrix.md blob hash CHANGED @v1.13-close: expected ' + BASELINE + ', got ' + actual + ' (OU-10 D-A3 byte-unchanged invariant violated)' };
      }
      return { pass: true, detail: 'macos-capability-matrix.md blob @v1.13-close matches baseline ' + BASELINE };
    } catch (err) {
      return { pass: true, skipped: true, detail: 'git rev-parse not available -- skipped' };
    }
  }
}
```
**Adoption note:** D-22 requires this precedent be adopted **with one amendment** — the `catch → { pass: true, skipped: true }` here is exactly the swallow class SWEEP-03 deletes elsewhere. When atom 4 copies this pattern into `check-phase-69/70.mjs`, the new pins must fail loud on `git rev-parse` failure, not skip-pass.

### Pattern 2: The `PRED_BLOBS` map being converted (current, worktree-coupled — atom 4 replaces the read source only)
```javascript
// Source: scripts/validation/check-phase-69.mjs:37-41, 138-162 [VERIFIED: read this session]
const PRED_BLOBS = {
  '.github/workflows/audit-harness-integrity.yml':       '08449a338b6ce87de946ad9d8e58af544cae01d8',
  '.github/workflows/audit-harness-v1.5-integrity.yml':  '6990de2894b026551aba62d1f5ce9c95c0ff88e9',
  '.github/workflows/audit-harness-v1.6-integrity.yml':  '89b536b3ec55e23beecb56a2e348f99fe5a3cf8c',
};
// ...
run() {
  const drift = [];
  for (const [path, expected] of Object.entries(PRED_BLOBS)) {
    if (!existsSync(join(process.cwd(), path))) { drift.push(path + ' (missing)'); continue; }
    try {
      const actual = execFileSync('git', ['hash-object', path], { encoding: 'utf8', timeout: 10000 }).trim(); // <-- WORKTREE read; this is what atom 4 replaces
      if (actual !== expected) drift.push(path + ' (expected ' + expected.slice(0,7) + '; got ' + actual.slice(0,7) + ')');
    } catch (err) { drift.push(path + ' (hash-object failed: ' + err.message.slice(0, 80) + ')'); }
  }
  if (drift.length > 0) return { pass: false, detail: drift.length + ' predecessor workflow(s) drifted: ' + drift.join('; ') };
  return { pass: true, detail: '3/3 predecessor workflows BYTE-UNCHANGED (v1.4 + v1.5 + v1.6)' };
}
```
`[VERIFIED: git hash-object]` — running `git hash-object` on all three files this session reproduced the exact pinned hashes above, byte for byte, confirming D-18's claim that the apex is currently green only by coincidence (nothing has edited these three files since the pins were recorded) and will go red the instant SWEEP-01 adds `fetch-depth: 0` to them, unless atom 4 lands first per D-41's ordering.

**The identical structure is duplicated in `check-phase-70.mjs:73-77` (`PRED_BLOBS`) and `:342-364` (`V-70-17`)** — both files must be edited together; GOV-02's grep-before-edit discipline applies to both.

### Pattern 3: The V-111-TOOL03 call-site-pinning mechanism (the literal model for GOV-02)
**What:** A later validator asserts an earlier file's exact source-code substring is present, via plain `String.prototype.includes()` — not an AST check, not a regex with capture groups, a literal substring match.
**Why this matters for GOV-02:** any edit to a pinned call-site's exact text — even a whitespace-only reformat — trips this class of validator. The grep-before-edit step in GOV-02 exists specifically to find these before editing.
```javascript
// Source: scripts/validation/check-phase-111.mjs:76-87 [VERIFIED: read this session]
// === V-111-TOOL03: --self-test execFailDetail stdout+stderr capture (stderr-only bug fixed) ===
checks.push({
  id: 'TOOL03',
  name: 'V-111-TOOL03: --self-test execFailDetail stdout+stderr capture in check-phase-48.mjs',
  run() {
    const c = readFile(CP48);
    if (c === null) return { pass: false, detail: CP48 + ' missing' };
    const needle = "execFailDetail(stdout, stderr, { n: 200, trim: false, prefix: '--self-test FAIL: ' })";
    if (!c.includes(needle)) return { pass: false, detail: 'TOOL03 call-site absent (stdout+stderr capture not consumed): ' + needle };
    return { pass: true, detail: '--self-test execFailDetail stdout+stderr capture consumed' };
  }
});
```
The pinned needle exists verbatim in `check-phase-48.mjs:85` `[VERIFIED: check-phase-48.mjs:85]`:
```javascript
return { pass: false, detail: execFailDetail(stdout, stderr, { n: 200, trim: false, prefix: '--self-test FAIL: ' }) };
```

### Pattern 4: The exact YAML idiom already used repo-wide for `fetch-depth: 0`
**What:** Every already-deep checkout in this repo uses the identical single-line flow-mapping form — not a multi-line block.
```yaml
# Source: .github/workflows/audit-harness-v1.7-integrity.yml:74-84,101-102 [VERIFIED: read this session]
  linux-chain-ubuntu-latest:
    ...
    steps:
      - name: Disable autocrlf BEFORE checkout (LF-fidelity contract)
        run: git config --global core.autocrlf false
      - uses: actions/checkout@v4
        with: { fetch-depth: 0 }
      ...
  check-phase-67:
    ...
    steps:
      - uses: actions/checkout@v4
        with: { fetch-depth: 0 }
```
SWEEP-01's 97-checkout edit should replicate this exact `with: { fetch-depth: 0 }` inline form for consistency with the other 85 already-converted checkouts (mixed multi-line vs. inline forms both parse identically in YAML, but the repo's own convention is 100% inline flow-mapping — grep found zero multi-line `fetch-depth:` blocks).

### Anti-Patterns to Avoid
- **Re-baselining `PRED_BLOBS` with the live worktree hash after the workflow edit:** discharged explicitly by D-19/D-20 — this would silently shrink the "unchanged since" window from ~15 months to the current phase and leaves the pin dependent on unversioned `core.autocrlf` config. Use frozen-to-frozen instead.
- **Testing the negative-clone case without `file://`:** `[VERIFIED: git clone --depth 1 "D:/claude/Autopilot"]` reproduced exactly the warning CONTEXT.md predicted (`warning: --depth is ignored in local clones; use file:// instead.`), produced no `.git/shallow`, and a subsequent `git show` at an old SHA **succeeded** — this would make SWEEP-03's own negative test silently green. Always use `file:///` for local shallow-clone reproduction.
- **Trusting the GitHub checks-UI colour as SWEEP-01/02 evidence:** a `continue-on-error: true` job (`pin-helper-advisory`, confirmed present in all 16 workflows) or a cron-only job can make an overall run show green while the specific frozen-read assertion never ran. Always pull `gh run view <id> --json jobs` and read individual job conclusions.
- **Assuming "24 importers" and "21 importers" (both in D-42) are the same set to test:** they are not — see Finding 9. Testing all 24 grep hits wastes effort on 3 files that don't even call the module; the regression gate should enumerate exactly the 21 real importers.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Byte-unchanged predecessor-file gate | A new comparison mechanism | The `check-phase-63.mjs:208-250` frozen-to-frozen `git rev-parse <SHA>:<path>` pattern | Already proven, already imports `MILESTONE_CLOSE_SHAS`, only needs the swallow removed per D-22 |
| Stop-hook nudge/warn/idempotency logic | A new hook framework | Clone `publish-bundle-gate.cjs`'s skeleton (stdin parse, `stop_hook_active` early-allow, pure `computeDecision()`, fail-open wrapper, `--self-test` gated behind `require.main === module`) | Explicitly the model D-08 names; it already has a documented 15s-timeout-safe probe pattern and a pure/testable decision function |
| Frozen-read error classification | A bespoke error-matching scheme | The 3-pattern-per-class stderr taxonomy verified live this session (Finding 12) | git's own stderr strings are stable and already reproduced exactly by this repo's existing `readAtV15CloseFor61`-style readers |
| CI dispatch + evidence retrieval | A polling/webhook mechanism | `gh workflow run --ref <branch>` + `gh run view --json jobs` | `gh` is installed, authenticated, and this exact idiom already has three precedents in this repo's branch history (`origin/phase-119-atom-2`, `origin/phase-125-atom-2`, `origin/phase-128-atom-2`) |

**Key insight:** Every one of this phase's five atoms has a same-repo, already-battle-tested precedent. The work is disciplined copying + one net-new function (`lsTreeAtClose`), not invention.

## Runtime State Inventory

Not a rename/refactor/migration phase — no file/symbol renames occur. Skipped per the trigger condition in the research protocol. (SWEEP-01/SWEEP-02 touch CI *behavior*, not names; SWEEP-03/04 add code, they don't rename anything; GOV-01/02 create new artifacts.)

## Common Pitfalls

### Pitfall 1: Editing the three workflows before converting `PRED_BLOBS` to frozen-to-frozen
**What goes wrong:** The apex chain (`check-phase-138.mjs`, which runs `check-phase-69` and `check-phase-70` among its 90 members) goes RED the instant any byte of the three workflow files changes, because `git hash-object` reads the **worktree**, not a frozen SHA.
**Why it happens:** `execFileSync('git', ['hash-object', path])` at `check-phase-69.mjs:149` and `check-phase-70.mjs:353` reads whatever is currently on disk — even before a commit.
**How to avoid:** D-41's atom ordering — atom 4 (frozen-to-frozen conversion) **before** atom 5 (the workflow edit) — makes this impossible by construction.
**Warning signs:** Running `node scripts/validation/check-phase-138.mjs` after editing a workflow file but before converting the pins.

### Pitfall 2: Trusting `git clone --depth 1 <local-path>` without `file://`
**What goes wrong:** `[VERIFIED this session]` git silently ignores `--depth` for a plain local path, prints one warning line, and produces a full (non-shallow) clone — `.git/shallow` is absent, all 2994+ commits are present, and a frozen read that "should" fail actually succeeds. A negative test built on this form is a silent-green.
**Why it happens:** git treats bare local filesystem paths as "hardlink-eligible" and takes a fast path that bypasses the shallow machinery; only the `file://` URL scheme forces the network-clone code path that honors `--depth`.
**How to avoid:** Always use `file:///D:/claude/Autopilot` (or the repo's actual absolute path with the `file://` prefix) and assert `.git/shallow` exists before trusting the test body, exactly as D-31 specifies.
**Warning signs:** A "negative" test that never fails, or a shallow-clone reproduction that completes suspiciously fast with a large `git rev-list --count HEAD`.

### Pitfall 3: Assuming SWEEP-02's 11 validators are the three named-workflow files' full `check-phase-*` job set
**What goes wrong:** v1.5's workflow has 14 `check-phase-{48..61}` jobs and v1.6's has 5 `check-phase-{62..66}` jobs — 19 jobs total — but only 11 of those 19 validators actually `import` from `_lib/frozen-at-close.mjs`. A plan that assumes "all check-phase jobs in v1.5/v1.6" need proving would over-scope the `frozen-read-probe` job design.
**Why it happens:** Not every chain validator does a frozen read; some (e.g. `check-phase-48`, `-53` through `-56`, `-60`, `-64`, `-66`) only read live HEAD.
**How to avoid:** Use the exact enumerated list in Finding 10 below — `{49,50,51,52,57,58,59,61}` from v1.5 and `{62,63,65}` from v1.6.
**Warning signs:** A `frozen-read-probe` job whose scope doesn't match SWEEP-02's stated "11 validators."

### Pitfall 4: Forgetting the header-comment `fetch-depth:0` false-positive when grepping
**What goes wrong:** A naive `grep -c "fetch-depth:0"` (no space) across `.github/workflows/` returns 13 hits that are **not** actual YAML keys — they're prose inside header comments describing the `linux-chain-ubuntu-latest` job's contract (e.g. `.github/workflows/audit-harness-v1.7-integrity.yml:6`).
**Why it happens:** The comment author wrote the invariant name without a space, coincidentally matching a common grep pattern for the (space-separated) real YAML key.
**How to avoid:** D-15's falsifiable-invariant grep must use `fetch-depth: 0` **with the space** — `[VERIFIED this session]` this pattern produces exactly 85 real matches and zero comment false-positives.
**Warning signs:** A repo-wide invariant check that reports more matches than there are actual `fetch-depth: 0` YAML keys.

## Code Examples

### The complete current `_lib/frozen-at-close.mjs` (what SWEEP-04 builds onto — nothing here needs to change except additions)
```javascript
// Source: scripts/validation/_lib/frozen-at-close.mjs [VERIFIED: read in full this session, 135 lines]
export const MILESTONE_CLOSE_SHAS = {
  V141: '5c976ec', V15: 'ba2cbc0', V16: '9d8877c', V17: 'aa6de68',
  V17_CLOSEGATE: '4df3a16', V18: '2bd79d8', V19: 'b29dca5', V110: 'a3617e9',
  V111: '919b23b', V112: '12f2c7b', V113: 'ba24f1a', V114: '7d922a7',
  V115: '29a3599', V116: '3dd2512', V117: 'b56bba5', V118: '7af8a147',
  // V14 omitted -- see :94-96 rationale; no V119 entry yet (Phase 144's HARN-17)
};

export function readAtClose(milestoneTag, relPath) {
  const sha = MILESTONE_CLOSE_SHAS[milestoneTag];
  if (!sha) throw new Error(`No frozen SHA for milestone ${milestoneTag}`);
  return execFileSync('git', ['show', sha + ':' + relPath], {
    encoding: 'utf8', timeout: 10000, stdio: ['ignore', 'pipe', 'pipe'],
  }).replace(/\r\n/g, '\n');
}
// + 15 per-milestone convenience exports: readAtV141Close .. readAtV118Close
```
`lsTreeAtClose` per D-34..D-40 should live in this same file, reuse `MILESTONE_CLOSE_SHAS` (the pin gate at `:109-110` — `if (!sha) throw`), and add a `frozenCause` classifier that both `readAtClose` and `lsTreeAtClose` attach to thrown errors.

### The verified `frozenCause` stderr taxonomy (D-28) — reproduced live this session
```
[VERIFIED: ran these exact commands against a real file:// shallow clone and the main repo, 2026-08-05]

unreachable-sha:
  $ git show ba2cbc0:docs/_glossary-linux.md      (inside a depth-1 file:// clone)
  fatal: invalid object name 'ba2cbc0'.

absent-path (path missing from both disk and the SHA):
  $ git show HEAD:docs/does-not-exist-anywhere.md
  fatal: path 'docs/does-not-exist-anywhere.md' does not exist in 'HEAD'

absent-path, second sub-pattern (path exists on disk now, absent at an OLDER reachable SHA
  -- the realistic "file added after the frozen close" production case):
  $ git show HEAD~10:.planning/phases/139-.../139-CONTEXT.md
  fatal: path '.planning/phases/139-.../139-CONTEXT.md' exists on disk, but not in 'HEAD~10'
```
All three exact strings match D-28's claimed patterns (`invalid object name`, `does not exist in`, `exists on disk, but not in`) verbatim. `err.stderr` is available for classification because `readAtClose` already sets `stdio: ['ignore', 'pipe', 'pipe']` (D-38 specifies the same for `lsTreeAtClose`).

### The exact 4 fail-loud sites (verbatim, current state)
```javascript
// Source: scripts/validation/check-phase-49.mjs:264 [VERIFIED]
try { content = readAtV15Close(f); } catch { content = null; }

// Source: scripts/validation/check-phase-49.mjs:297 [VERIFIED]
try { androidContent = readAtV116Close(GLOSSARY_ANDROID_PATH); } catch { androidContent = ""; }

// Source: scripts/validation/check-phase-49.mjs:334 [VERIFIED] -- the 4th site D-30 adds
try { content = readAtV116Close(GLOSSARY_ANDROID_PATH); } catch { content = null; }

// Source: scripts/validation/check-phase-51.mjs:30-32 [VERIFIED]
function readTreeFrozen() {
  try { return readAtV115Close(TREE); } catch { return null; }
}
```
The runner in both files already wraps each check's `run()` in its own try/catch and converts any throw to one FAIL row (`check-phase-49.mjs:362`, `check-phase-51.mjs:411`: `try { result = check.run(); } catch (e) { result = { pass: false, detail: "Unexpected error: " + e.message }; }`), then `process.exit(failed > 0 ? 1 : 0)` — confirming D-27's claim that deleting the inner try/catch is safe and needs no per-site message formatting.

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|---------------|--------|
| `actions/checkout@v4` default (`fetch-depth: 1`) on all 16 workflows | `fetch-depth: 0` retrofitted incrementally starting v1.7 (`FETCH-DEPTH-01` contract) | v1.7 (Phase 69/70), never back-ported to v1.4/v1.5/v1.6 | 97 of 182 checkouts repo-wide are still depth-1; this phase closes the gap |
| `git hash-object <worktree-path>` byte-unchanged pins | `git rev-parse <frozen-SHA>:<path>` frozen-to-frozen pins | Introduced at `check-phase-63.mjs` (v1.13-era), not yet applied to `check-phase-69/70.mjs`'s `PRED_BLOBS` | Removes worktree-atomicity fragility and `core.autocrlf` dependence; this phase back-ports the pattern |
| Silent `catch { return null/"" }` on frozen reads | Fail-loud (delete try/catch, let the runner's outer catch convert to one FAIL row) | Pattern already exists in the runner itself; just never applied at these 4 call sites | Converts a wrong-diagnosis "File missing" into an honest "Unexpected error: <git stderr>" |

**Deprecated/outdated:** None of the retired patterns are formally deprecated elsewhere in the repo — they are simply not-yet-retrofitted instances of the current standard, which is exactly what SWEEP-01/02/03 close.

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| (none) | — | — | Every claim in this document was independently verified against the repo or reproduced live this session (`[VERIFIED: ...]`). No claim rests solely on training knowledge or an unverified web source. CONTEXT.md's own `[MEASURED]` claims were re-derived, not trusted blind. |

**This table is empty by design** — this is a same-repo, tooling-only phase with no third-party libraries, no external API, and no ambiguous design surface left unresolved by CONTEXT.md's prior adversarial-review pass. The two genuinely new findings this session produced (Finding 9's 21-vs-24 resolution, Finding 10's exact 11-validator enumeration) are both derived facts, not assumptions — each is backed by a `grep`/`Read` command executed and shown above.

## Open Questions (RESOLVED)

1. **Where exactly does the `frozen-read-probe` job's `git show` target land — which SHA and which path?**
   - **RESOLVED:** the `V15` tag pair, applied uniformly to all 16 probes — each probe runs raw `git show`, then calls `readAtV15Close` and `lsTreeAtV15Close` for real, so the probe exercises the library rather than only raw git. This follows the recommendation below. See `139-05-PLAN.md` Task 2.
   - What we know: D-24 specifies "a `git show <old-sha>:<path>` frozen read plus one real `readAtClose` call," one job per retrofitted workflow, no `needs:`.
   - What's unclear: CONTEXT.md leaves the exact `<old-sha>:<path>` pair to Claude's discretion (not listed in "Claude's Discretion" explicitly, but no locked value given either). A natural choice is `ba2cbc0:docs/_glossary-linux.md` for the v1.5 probe (the exact pair this research reproduced live and confirmed throws `invalid object name` under depth-1) and an equivalent v1.6/base-era SHA:path pair for the other two probes.
   - Recommendation: the planner should pick one already-`MILESTONE_CLOSE_SHAS`-pinned tag per workflow (`V15` for the v1.5 probe, `V16` for v1.6, and for the base/v1.4 workflow — which has no chain validators and thus no natural frozen-read consumer — either the `V141` tag or a purely-synthetic `git show <any-old-sha>:.planning/REQUIREMENTS.md` probe) so the probe step doubles as a real exercise of `readAtClose`, not just a raw git command.

2. **Does the CARVE Stop-hook need registration in `.claude/settings.json` (tracked) or only `.claude/settings.local.json` (gitignored)?**
   - **RESOLVED:** `.claude/settings.local.json` only, following the existing precedent of both current Stop-hooks. The machine-local consequence (hook activation does not travel with `git clone`) is recorded in the hook's header comment and asserted in the plan's acceptance criteria rather than left implicit. See `139-01-PLAN.md` Task 2.
   - What we know: `[VERIFIED this session]` both existing Stop-hooks (`jira-milestone-gate.cjs`, `publish-bundle-gate.cjs`) are registered exclusively in `.claude/settings.local.json`, which is gitignored — meaning a fresh clone of this repo does not activate either hook until a human manually re-adds the entry.
   - What's unclear: whether this is intentional (avoid committing machine-specific hook config) or an oversight the milestone should not further compound.
   - Recommendation: follow the existing precedent exactly (register in `settings.local.json`) for consistency, but the plan's verification step should explicitly note that hook activation is machine-local and does not travel with `git clone` — this is a known, accepted repo convention, not a defect to fix in this phase.

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | All `scripts/validation/*.mjs` execution | ✓ | v24.17.0 | — |
| git | All frozen reads, hash comparisons, shallow-clone tests | ✓ | 2.51.0.windows.2 | — |
| gh CLI | D-24/D-25 dispatch + job-level JSON evidence (SWEEP-01 SC#2, SWEEP-02) | ✓ | 2.81.0, authenticated as `Schweinehund` | — |
| GitHub remote (`origin`) | Feature-branch push + `workflow_dispatch` | ✓ | `https://github.com/Schweinehund/Autopilot.git`, `master` is not ahead/behind in a way that blocks dispatch | — |
| Existing feature-branch precedent | Confirms the D-25 dispatch idiom has prior art in this exact repo | ✓ | `origin/phase-119-atom-2`, `origin/phase-125-atom-2`, `origin/phase-128-atom-2` — naming convention `phase-<N>-atom-<M>` | — |

**Missing dependencies with no fallback:** None.

**Missing dependencies with fallback:** None — everything required is present and verified working in this session.

> **Validation Architecture section omitted:** `.planning/config.json` sets `workflow.nyquist_validation: false` explicitly — per the research protocol this section is skipped. (For the planner's benefit, the per-requirement Wave-0 gap list that would have appeared here is functionally identical to the "Wave 0 Gaps" reasoning already covered under Common Pitfalls and the atom structure above — nothing this phase needs is hidden by omitting the formal section.)

## Security Domain

Per `.planning/config.json`, check whether `security_enforcement` is set — this phase is pure internal CI-tooling with no user input, no auth, no network-facing surface beyond a `gh workflow run` dispatch that is already gated behind an authenticated `gh` session. The one item worth naming explicitly:

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V2 Authentication | no | No auth surface added |
| V3 Session Management | no | N/A |
| V4 Access Control | no | N/A |
| V5 Input Validation | marginal | `carve-gate.mjs`'s diff-scope paths (`scripts/ .github/ docs/ .gitattributes package.json`) are hardcoded constants, not user input — no injection surface |
| V6 Cryptography | no | N/A |

### Known Threat Patterns for this stack

| Pattern | STRIDE | Standard Mitigation |
|---------|--------|---------------------|
| Path-traversal via an unvalidated version/tag string reaching a filesystem check | Tampering | Already solved elsewhere in this repo — `publish-bundle-gate.cjs`'s anchored `VERSION_RE = /^v?\d+\.\d+(\.\d+)?$/` is the exact precedent to reuse if the new CARVE hook or gate ever derives a path from a milestone-tag-shaped string |
| `execFileSync` argument injection | Tampering | Every git invocation in this repo already uses `execFileSync` with an argument array (never `execSync` with string interpolation) — continue that pattern for any new `git rev-parse`/`git ls-tree` calls |

## Sources

### Primary (HIGH confidence — read directly this session)
- `scripts/validation/_lib/frozen-at-close.mjs` — full file (135 lines)
- `scripts/validation/_lib/archive-path.mjs` — full file
- `scripts/validation/check-phase-49.mjs` — full file (378 lines)
- `scripts/validation/check-phase-51.mjs` — full file (427 lines)
- `scripts/validation/check-phase-63.mjs:195-260`, `check-phase-69.mjs:1-50,130-170`, `check-phase-70.mjs:65-85,335-370`
- `scripts/validation/check-phase-66.mjs:30-49,148-180`
- `scripts/validation/check-phase-68.mjs:40-230`
- `scripts/validation/check-phase-111.mjs:1-95`
- `scripts/validation/check-phase-48.mjs:85`
- `scripts/validation/check-phase-138.mjs:100-130`
- `scripts/validation/check-phase-60.mjs:240-270`
- `scripts/validation/regenerate-supervision-pins.mjs` (grep, no execSync/spawnSync)
- `.github/workflows/audit-harness-integrity.yml` — full file
- `.github/workflows/audit-harness-v1.5-integrity.yml:1-40`
- `.github/workflows/audit-harness-v1.6-integrity.yml:1-40,60-210`
- `.github/workflows/audit-harness-v1.7-integrity.yml:1-110`
- `.github/workflows/audit-harness-v1.8-integrity.yml`, `-v1.9-integrity.yml` (job-name grep)
- `.claude/hooks/publish-bundle-gate.cjs` — full file (257 lines)
- `.claude/settings.local.json` — hooks block
- `.gitattributes` — full file (1 line)
- All 16 `.github/workflows/*.yml` — checkout-count and fetch-depth-count grep across every file

### Commands executed this session (evidence for `[VERIFIED: command]` tags)
- `git hash-object` on the three named workflows (confirmed exact match to `PRED_BLOBS`)
- `git clone --depth 1 file:///D:/claude/Autopilot` and `git clone --depth 1 "D:/claude/Autopilot"` (confirmed the `file://`-mandatory finding)
- `git show ba2cbc0:...`, `git show HEAD:<nonexistent>`, `git show HEAD~N:<recently-added-path>` (confirmed all 3 `frozenCause` stderr patterns)
- `git --version`, `node --version`, `gh --version`, `gh auth status`, `git remote -v`, `git branch -a`
- `grep -c "actions/checkout@v4"` and `grep -c "fetch-depth: 0"` across all 16 workflow files (confirmed 182/85/97 totals)
- `grep -rl "frozen-at-close"` + per-file `grep -Hn "from './_lib/frozen-at-close"` (resolved the 24-vs-21 importer discrepancy)

### Secondary (MEDIUM confidence)
- None — this phase required no external/web research; every claim traces to a file or command in this repo.

### Tertiary (LOW confidence)
- None.

## Metadata

**Confidence breakdown:**
- Standard stack: N/A — no new dependencies (nothing to rate)
- Architecture: HIGH — every pattern is copied from working code in this repo, verified this session
- Pitfalls: HIGH — all 4 pitfalls are either directly reproduced (file:// clone behavior, stderr taxonomy) or derived from a verified worktree-vs-frozen read distinction

**Research date:** 2026-08-05
**Valid until:** Effectively indefinite for the cited line numbers/hashes as long as no other phase touches these files first — but since GOV-01's own allowlist governs 139–144 and Phase 140+ may touch adjacent lines, re-grep before trusting any line number if this phase's plan is executed more than a few days after this research, per the standing GOV-02 discipline this phase itself is establishing.

---

## Findings Index (cross-reference for the Summary above)

1. **Checkout/fetch-depth counts, independently re-derived:** `audit-harness-integrity.yml`=4 checkouts/0 deep, `-v1.5-`=18/0, `-v1.6-`=10/0 (exact match to CONTEXT.md's 4/18/10). Repo-wide: 182 total checkouts, 85 already `fetch-depth: 0`, 97 shallow — and the 13 non-named files split into exactly 5 shallow checkouts each (65 total) + 32 in the three named files = 97. All arithmetic closes exactly.
2. **YAML idiom:** every existing deep checkout uses `with: { fetch-depth: 0 }` inline flow-mapping — zero multi-line exceptions found.
3. **Dispatch precedent:** `gh` 2.81.0 authenticated; `origin` remote reachable; 3 prior feature-branch dispatch precedents already exist in this repo's remote branches (`phase-{119,125,128}-atom-2` naming convention).
4. **Target-scoped grep example:** `check-phase-66.mjs:42` embeds the literal path string `.github/workflows/audit-harness-v1.6-integrity.yml`; `V-66-05` (`:154-176`) greps for cron/job-name substrings that a fetch-depth edit would not disturb — confirms the "survives by luck" framing in D-12.
5. **V-111-TOOL03 mechanism:** plain `String.includes()` on a literal call-site substring, verified to match `check-phase-48.mjs:85` verbatim.
6. **Pillar-C real paths:** `scripts/validation/c17-eee-contract.mjs`, `scripts/pipeline/convert.ps1`, `scripts/validation/check-nav-hub-links.mjs`, `scripts/pipeline/retrofit-{guide,mermaid-structural,nav-hub,reference,runbook,structural}.mjs` — all 9 confirmed present.
7. **Byte-unchanged gate class:** confirmed 3 live instances — `check-phase-63.mjs:208-250` (frozen-to-frozen, the D-19 model), `check-phase-69.mjs:138-162` and `check-phase-70.mjs:342-364` (worktree-coupled, the ones being converted).
8. **Hook registration pattern:** both existing Stop-hooks live in gitignored `.claude/settings.local.json`, 15s timeout ceiling, `node "$CLAUDE_PROJECT_DIR/.claude/hooks/<file>.cjs"` command form.
9. **21-vs-24 importer resolution (NEW finding, not previously enumerated in CONTEXT.md):** `grep -rl "frozen-at-close" scripts/validation/*.mjs` returns 24 files, but 3 of them (`check-phase-111.mjs`, `check-phase-120.mjs`, `check-phase-73.mjs`) only *mention* the string in a comment and have **no** `import` statement. The real import count is exactly **21**: `check-phase-{49,50,51,52,57,58,59,61,62,63,65,67,68,70,92,99,101,109,118,121,124}.mjs`. D-42's regression gate ("run all 24 importers... 21 other importers untouched") should target this verified list of 21, not chase the 3 phantom comment-only files.
10. **SWEEP-02's exact 11 validators (NEW finding, not previously enumerated in CONTEXT.md):** cross-referencing the 21 real importers against the shallow job ranges in `audit-harness-v1.5-integrity.yml` (jobs `check-phase-48..61`) and `audit-harness-v1.6-integrity.yml` (jobs `check-phase-62..66`) yields exactly 11: **from v1.5** — `check-phase-{49,50,51,52,57,58,59,61}.mjs` (8 files); **from v1.6** — `check-phase-{62,63,65}.mjs` (3 files). `check-phase-48,53,54,55,56,60` (v1.5) and `check-phase-64,66` (v1.6) do not import the module and are out of SWEEP-02's scope.
11. **Fail-loud sites, verbatim current code:** all 4 sites read and quoted exactly (see Code Examples).
12. **Stderr taxonomy, live-reproduced:** all 3 of D-28's claimed patterns (`invalid object name`, `does not exist in`, `exists on disk, but not in`) reproduced exactly via real git commands this session, including inside a genuine `file://` depth-1 clone.
13. **`_lib/frozen-at-close.mjs` current state:** confirmed no `lsTreeAtClose`, no `frozenCause`, no CLI/self-test entry point exists yet — SWEEP-04 is greenfield-within-the-file, not a modification of existing self-test scaffolding.
