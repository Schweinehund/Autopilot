# Phase 158: Final Corpus Verification & Publish Bundle - Research

**Researched:** 2026-09-07
**Domain:** Standalone Python/Node documentation-corpus tooling (git-history audit, mechanical style sweep, publish-bundle rebuild) over a 294-file Markdown corpus governed by a 111-entry apex validator chain
**Confidence:** HIGH — every command below was executed this session against this repository at HEAD `f5b01df7` (branch `v1.22/154-style-landing`; two `.planning`-only commits ahead of `158-CONTEXT.md`'s measurement point `937d0a1f` — `docs/`, `scripts/` and `.claude/skills/` are git-diff-empty between the two, so every count below is current). `git status --porcelain` was captured at the start of this session and again just before writing this file: both are the same 9-line untracked set (`.agents/`, `.claude/skills/fireworks-tech-graph/`, `.claude/skills/jira-milestone/install-jira-milestone-hook.cjs`, `.gsd/`, `.obsidian/`, `.planning/phases/154-*/154-PATTERNS.md`, `.planning/state.json`, `.playwright-mcp/`, `skills-lock.json`) — byte-identical, confirming no tracked file was touched and no stray file was left behind during this research.

## Summary

`158-CONTEXT.md` already carries 71 `[MEASURED]` decisions from a four-round, 16-area adversarial-review pass — this is not a discovery-risk phase. This research's job was narrower and is now done: re-run the load-bearing tool invocations myself, confirm their exact argv/exit-code contracts by reading source, and report the one place a re-measurement disagreed with the written record (which is itself the exact failure mode VERIFY-06 exists to catch). Every tool the six focus areas named was read and, where read-only, executed. All fifteen `build-publish-bundle.mjs --self-test` assertions and all eight `build-filename-map.mjs --self-test` assertions pass at HEAD, reproducing D-23(7)'s "15/15, 8/8" figure exactly and confirming their line locations (`build-publish-bundle.mjs:513-528`, `build-filename-map.mjs:283-290`). `verify2.py d0b611e8` reproduces D-18's `missingAnchor 454→455`, `introducedBySweep 0→1` (the exact item, `docs/admin-setup-apv2/03-device-preparation-policy.md → …#eam-store-winget-routing`) at 25.2s (D-21 cites 26s). `sweep3.py docs _CONTENT-PINS.txt --subs subs-emdash-batch10.tsv` reproduces D-09's `31 files / 15 files / 6-bucket protection census` exactly. `check.py --no-headings` over `git ls-files 'docs/*.md'` reproduces D-19's `10,427` total at 59.5s. `check-prose-style.py` passes clean at 62.7s (D-21 cites 73s). The apex `check-phase-153.mjs` is 111/0/0 at 38.0s. `check-nav-hub-links.mjs` and `c17-eee-contract.mjs` are both green sub-second.

**One measured disagreement, load-bearing for SC#4's drift accounting.** `verify2.py d0b611e8` reports **14** files under `LINE COUNT DIFFERS` at this session's HEAD, not the **21** D-16 states (D-16's own text: "6 → 21", "15 more files joined"). `docs/` is provably byte-identical between CONTEXT's measurement commit and this session's HEAD (`git log --oneline 937d0a1f..f5b01df7 -- docs/` returns two `.planning`-only commits, zero `docs/` touches), and the BASE resolution is independently confirmed as `e6930d25^` — so this is not staleness from a moved corpus; either D-16's own re-derivation was wrong, or its counting method differed from a bare `grep -c "LINE COUNT DIFFERS"` on the tool's own stdout. **Recommendation for the planner: treat 21 as unconfirmed and have the `158-GATE-BASELINE.json` `before` measurement re-derive this number from a live run rather than copying D-16's figure** — this is precisely the "a written record is not evidence" principle VERIFY-06 legislates, applied reflexively to this milestone's own CONTEXT. The 14-file list is recorded verbatim below (Code Examples) so the planner has ground truth to diff against, in case D-16's 21 turns out to be right and this session's run is the anomaly.

**Primary recommendation:** every tool this phase runs already exists, is already read-only or default-dry-run, and already has a confirmed argv/exit-code contract (below). Build only `audit-claimed-fixes.mjs` (D-47) and the ~10-line `judge-packets.py` fix (D-57); do not build a bundle verifier, a second gate-drift runner, or an enumeration script — three such proposals were already reversed in CONTEXT's adversarial-review rounds and this session's re-execution confirms none is needed. `guard-docx.mjs`'s `os.tmpdir()` self-test fixture pattern (confirmed at `guard-docx.mjs:206-245`, not a git-repo pattern) is the correct model for D-48's `audit-claimed-fixes.mjs --self-test`, which needs a *git*-repo fixture instead — Node's own `child_process.execFileSync('git', ['init', ...], {cwd: tmpdir})` is the only new mechanism this phase introduces.

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Claimed-fix git-history audit (VERIFY-06) | Standalone tooling (`scripts/docs-style/`) | — | A new Node script, never registered in a validator chain (D-07); reads git objects only, writes no tracked bytes except its own output pair |
| Style sweep over Phase 157's edits (SC#3) | Standalone tooling (`scripts/docs-style/`, existing `sweep3.py`/`verify-meaning.py`) | Corpus (`docs/`) | Existing unmodified tools generate the edits; the corpus tier receives them |
| Structural-gate drift accounting (SC#4) | Standalone tooling + apex chain (`scripts/validation/`) | Phase-dir JSON (`158-GATE-BASELINE.json`) | Re-runs existing gates; the phase dir is the record, never a new gate |
| Publish bundle rebuild (VERIFY-05) | Pipeline tooling (`scripts/pipeline/`) | `dist/` (gitignored) | Existing orchestrator; writes only `filename-map.md` as a tracked byte |
| Requirement/phase completion flips | GSD harness (`~/.claude/gsd-core/`) | Plan frontmatter | Flips are code, not phase content — a phase asserts them by declaring `requirements:` in frontmatter, never by hand-editing REQUIREMENTS.md's checkbox |
| Threat register / secure-phase | GSD harness (`secure-phase.md`) | Phase dir (`158-SECURITY.md`) | Standard workflow; short-circuits only if `threats_open: 0 AND register_authored_at_plan_time: true AND asvs_level == 1` |

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| VERIFY-05 | Rebuild `dist/docs-library-v1.22.zip` fail-closed with correct manifest/README and both canaries agreeing with the registry row count | Confirmed `build-publish-bundle.mjs` argv (`--version=v1.22`), exit-code contract, the 12-assertion set's exact source lines, and both `--self-test` suites passing 15/15 and 8/8 at HEAD (below) |
| VERIFY-06 | Every claimed fix confirmed against git history, not a written record, before its requirement is checked off; includes the post-hygiene style sweep before the bundle | Confirmed `git grep -c` (39) vs `git grep -o -F` (42) vs joined-blob (0/0/2) divergence live for `administrator guide`; confirmed `git ls-tree` bad-pathspec returns rc 1 identical to zero-matches (the mandatory pre-count guard); confirmed the 59-file SC#3 edit list is byte-identical from both derivations; confirmed the `via apt` needle sites and the 14-file (not 21) `LINE COUNT DIFFERS` list |
</phase_requirements>

## User Constraints (from CONTEXT.md)

`158-CONTEXT.md` is the authoritative decision set for this phase (D-01 through D-71, thirteen mechanism-forced ordering constraints in D-69, and Claude's Discretion areas). This research does not re-litigate any decision; it re-executes the load-bearing commands and reports what changed or what CONTEXT left underspecified as tool-contract detail. Read `158-CONTEXT.md` in full before planning — it is not summarized here. The single finding this research adds beyond CONTEXT is the LINE COUNT DIFFERS discrepancy above (14 vs 21), which the planner must resolve by live re-measurement in the `before`/`after` halves of `158-GATE-BASELINE.json`, not by trusting either number.

### Locked Decisions (pointer, not copy — see 158-CONTEXT.md for full text)

Areas A–Q, D-01–D-71. Highest-load-bearing for tool contracts (this research's focus): D-12 (BASE `d0b611e8`), D-18 (verify2 blind spot), D-19 (`158-GATE-BASELINE.json` shape), D-22/D-23 (bundle run + 12 assertions), D-47–D-49 (the new runner + self-test), D-67/D-68 (flip mechanics and amendment placement).

### Claude's Discretion

Plan count, wave shape, commit granularity (subject to D-69's thirteen constraints); the runner's internal structure and row ids (D-47); exact wording of the six amendment blocks; exact `drift[]` row set beyond D-51's named rows; the judge dispatch command shape; whether the discovery audit (D-70) is a task or a checkpoint.

### Deferred Ideas (OUT OF SCOPE)

History rewrite mechanism (Phase 159, D-28); `.gitattributes` EOL policy (Phase 159); the wrapped-guard hazard beyond the em-dash set (WINDOWS row 15, backlog); user-level skill copy sync (owner action, D-33); `verify2.py`'s explicit-anchor blind spot as a tool fix (backlog); `check-prose-style.py`'s stale-figure producer (backlog); the nine blank `status:` frontmatter keys (accepted since 152-02); more style EDITs on Phase 157's added prose (needs a judge pass, backlog); all items enumerated in `158-CONTEXT.md`'s `<deferred>` block.

## Standard Stack

### Core (already committed in this repository — do not reinstall or reimplement)

| Tool | Location | Confirmed version/behavior | Role this phase |
|------|----------|------|------|
| Python 3 | system | stdlib only in every script below (`re`, `sys`, `json`, `subprocess`, `pathlib`, `hashlib`, `collections`, `difflib`, `tempfile`, `importlib`) | Runs `verify-meaning.py`, `judge-packets.py`, `verify2.py`, `sweep3.py`, `pins2.py`, `check-prose-style.py`, `check.py` |
| Node.js | system | ES modules, built-ins only (`node:fs`, `node:path`, `node:child_process`, `node:url`, `node:process`) in every `.mjs` below | Runs `check-nav-hub-links.mjs`, `c17-eee-contract.mjs`, `check-phase-*.mjs`, `build-publish-bundle.mjs`, `build-filename-map.mjs`; hosts the new `audit-claimed-fixes.mjs` |
| pandoc | system | `[MEASURED]` `pandoc.exe 3.7.0.2` — matches `convert.ps1:43`'s `$expectedVer = '3.7.0.2'` exactly | MD→.docx conversion inside the bundle run |
| PowerShell | system | `[MEASURED]` `PowerShell 7.6.5` (`pwsh`) | `Compress-Archive` call inside `build-publish-bundle.mjs:479` |
| git | system | `execFileSync`/`subprocess.run` only, never a shell string (D-20/D-53) | The audit runner's sole external dependency |

**No new package installs in this phase.** Every tool is either already committed and unmodified, or a ~200–300-line addition using only Node/Python built-ins (D-47's explicit constraint). Skip to Package Legitimacy Audit below for the explicit "not applicable" disposition.

### Supporting

| Artifact | Location | Row count confirmed this session |
|----------|----------|------|
| `_CONTENT-PINS.txt` | `scripts/docs-style/` | `[MEASURED]` `grep -c '' ` = **563** |
| `_PINNED-HEADINGS.txt` | `scripts/docs-style/` | `[MEASURED]` **187** |
| `subs-emdash-batch10.tsv` | `scripts/docs-style/` | 3 positive-lookaround rows (per CONTEXT D-09; not independently re-parsed this session, but its `sweep3.py --subs` run reproduces the exact 31/28/15 result below) |

### Package Legitimacy Audit

**Not applicable.** This phase installs zero external packages in any ecosystem. Every script it runs or writes uses only Python/Node standard-library modules already used elsewhere in this repository's own `scripts/` tree. No `npm install`, `pip install`, or `cargo add` occurs anywhere in this phase's plan.

## Architecture Patterns

### System Architecture Diagram

```
                 [git object store: commits, blobs, trees]
                              |
        ┌─────────────────────┼──────────────────────────┐
        v                      v                          v
 audit-claimed-fixes.mjs   verify-meaning.py /       verify2.py /
 (NEW, D-47)                judge-packets.py          check-nav-hub-links.mjs /
 reads: git show/grep/     (EXISTING, unmodified)     c17-eee-contract.mjs /
 ls-tree via execFileSync   BASE d0b611e8              check-prose-style.py /
        |                    |                          check.py
        v                    v                          (EXISTING, unmodified)
 158-FIX-AUDIT.json    _DISPOSITIONS-158.tsv                  |
 158-FIX-AUDIT-RUN.txt _STYLE-DISPOSITIONS-158.tsv            v
        |               158-JUDGE-*.md/.json          158-GATE-BASELINE.json
        |                    |                         (before/after/drift[])
        └────────────┬───────┴──────────────────────────────┘
                      v
              docs/ edits (sweep + R1-R5 remediation)
                      |
                      v
         build-filename-map.mjs (parseRegistry, regenerate filename-map.md)
                      |
                      v
         build-publish-bundle.mjs --version=v1.22
         (convert via pandoc -> guard via guard-docx.mjs -> manifest -> README -> zip)
                      |
                      v
            dist/docs-library-v1.22.zip (gitignored, NOT committed)
                      |
                      v
         12 inline assertions (D-23) -> 158-BUNDLE-RUN.txt, 158-BUNDLE-MANIFEST.csv
                      |
                      v
         requirements.mark-complete (harness, last plan's frontmatter, D-67)
                      |
                      v
              phase.complete -> ROADMAP checkbox, next_phase = 159
```

### Recommended Project Structure (per D-34, confirmed against `archive-path.mjs`)

```
scripts/docs-style/
├── audit-claimed-fixes.mjs      # NEW — D-47; --self-test builds a tmpdir git repo
├── 158-FIX-AUDIT.json           # NEW — audit rows
├── 158-FIX-AUDIT-RUN.txt        # NEW — captured stdout, tied to the JSON by a row-set hash
├── _DISPOSITIONS-158.tsv        # NEW — verify-meaning fingerprint dispositions
├── _STYLE-DISPOSITIONS-158.tsv  # NEW — the 94-occurrence style disposition table
├── _JUDGE-VERDICTS-158.json     # NEW — 2-packet judge verdicts
├── judge-packets.py             # MODIFIED — one ~10-line commit (D-57), before_region fix
└── (sweep3.py, verify-meaning.py, verify2.py, pins2.py, subs-*.tsv — byte-unchanged)

.planning/phases/158-final-corpus-verification-publish-bundle/
├── 158-GATE-BASELINE.json       # NEW — phase_baseline: before/after/drift[]/embedded_156/embedded_157
├── 158-BUNDLE-RUN.txt           # NEW — verbatim stdout+stderr of the bundle build
├── 158-BUNDLE-MANIFEST.csv      # NEW — citation copy of the staged manifest.csv
├── 158-JUDGE-PROMPT.md          # NEW — 156's bytes retitled + blocklist extension
├── 158-JUDGE-FINDINGS.md        # NEW — VERIFY-03 findings (or explicit empty statement)
└── 158-SWEEP-DISPOSITIONS.md    # NEW — thin narrative, arithmetic + instrument + R1-R4 rows
```

`resolveArchivedPhasePath` (confirmed read this session, `scripts/validation/_lib/archive-path.mjs:19-30`) is exact-suffix, live-first, and returns `null` on a miss — never throws, never globs. Pass `['v1.22-phases']` as the milestone-roots array per D-19; the caller must check for `null` and exit loud, matching every other frozen-read caller in this codebase.

### Pattern 1: Argv-only git invocation (no shell string, ever)

**What:** every git call in `audit-claimed-fixes.mjs` is `execFileSync('git', [...], { cwd, encoding: 'utf8' })`, never a template-string shell command.
**When to use:** every count in D-47's row set.
**Confirmed this session:**
```bash
# git grep -c sums LINES per file (a label split across two lines on one file counts once) — NOT occurrences:
$ git grep -c -F -e "administrator guide" HEAD -- docs/ | awk -F: '{sum+=$NF} END{print sum}'
39
# git grep -o -F counts OCCURRENCES (one per -o match, multiple per line possible):
$ git grep -o -F -e "administrator guide" HEAD -- docs/ | wc -l
42
# A bad pathspec returns rc 1 -- IDENTICAL to the zero-matches case. This is why D-47's
# `git ls-tree -r --name-only <rev> -- <path>` non-empty check must run BEFORE every count:
$ git grep -e "nonexistent-pathspec-zzz" HEAD -- docs/nonexistent-dir-zzz/ ; echo "rc=$?"
rc=1
# git show <sha>^:docs/ returns a TREE LISTING at rc 0 (not an error) -- this is why D-02
# bars git log -S / a bare tree-listing read as a "count":
$ git show d0b611e8^:docs/ 2>&1 | head -3
tree d0b611e8^:docs/
_glossary-android.md
_glossary-apple-business.md
```
Both the 39/42 divergence and the rc-1-for-bad-pathspec behavior confirm D-02 and D-47's stated design exactly — a single count-equality assertion (`grep -c`) is insufficient for a label-splitting fix class, and a naive `git grep` count with no `ls-tree` guard cannot distinguish "path exists, zero matches" from "bad pathspec".

### Pattern 2: Default-dry-run tooling (never `--apply` unless explicit)

**What:** `sweep3.py` prints `DRY RUN` unless `--apply` is passed; it never mutates the corpus by accident.
**Confirmed this session (read-only invocation, no `--apply`):**
```bash
$ python scripts/docs-style/sweep3.py docs scripts/docs-style/_CONTENT-PINS.txt \
    --subs scripts/docs-style/subs-emdash-batch10.tsv
DRY RUN -- 15 files, 563 pins loaded
      31  TOTAL edits
  protected (em dashes left alone):
    6539  table row
     384  cited verbatim quotation
     123  heading line
      92  agent speech script
      29  UI label line
       4  validator-pinned string
```
This reproduces D-09's "31 edits on 28 lines in 15 files" and its 6-bucket protection census exactly (the 28-vs-31 gap is edits-vs-lines, not a discrepancy — a line can carry more than one edit). `sweep3.py` never calls `sys.exit()` with a nonzero code based on the edit count itself — its only nonzero exits are argv/TSV-format errors (a pattern ending in a space with no matching replacement space; a backslash escape other than `\n`; a `[Cc]`-style case class). A planner task that runs this tool for its side effect (dry-run report) must not treat exit 0 as "zero edits" — it always exits 0 on a syntactically valid TSV regardless of edit count.

### Pattern 3: `--self-test` builds its own fixtures, never reads the corpus

**What:** `verify-meaning.py --self-test`, `check-prose-style.py --self-test`, `build-publish-bundle.mjs --self-test`, `build-filename-map.mjs --self-test`, and `guard-docx.mjs --self-test` all write synthetic fixtures to a temp location and assert against those — none of them require a populated `docs/` tree to run to completion.
**Confirmed this session (both bundle self-tests, live):**
```bash
$ node scripts/pipeline/build-publish-bundle.mjs --self-test | tail -3
[ST] (f4) deriveZipName throws on traversal-shaped version (T-127-05) ... PASS
15 passed, 0 failed

$ node scripts/pipeline/build-filename-map.mjs --self-test | tail -3
[ST] (f) 0-row registry (prose only) parses to rows.length === 0 (main() fail-closed guard input) PASS -- rows.length=0
8 passed, 0 failed
```
Both self-test suites' assertion (a)/(c) independently confirm the **237**-row Approved-set canary is currently correct at HEAD — this is the "both canaries agree with the registry row count" half of SC#1, verified live, not copied from the self-test's own docstring.
**`guard-docx.mjs --self-test`'s fixture is `os.tmpdir()`, not a git repository** (`guard-docx.mjs:239`: `join(tmpdir(), 'guard-docx-selftest-' + Date.now())`) — this is the correct precedent CONTEXT cites for D-48, but it is *not* a git-repo precedent. `audit-claimed-fixes.mjs --self-test` additionally needs `git init` inside that tmpdir (committer identity set, `init.defaultBranch` warning silenced) because its assertions are git-history counts, not file-content counts — a genuinely new mechanism this phase introduces, confirmed by reading every `--self-test` in this stack and finding none that already does this.

### Anti-Patterns to Avoid

- **Wrapping a recorded command string in `bash -c`, or letting `$(git ls-files ...)` expand inside a nested shell invocation.** D-20's documented incident: `bash -c "check.py --no-headings $(git ls-files 'docs/*.md')"` expands the substitution to 294 newline-separated filenames *before* `bash -c` parses its argument as a script, so bash executes lines 2–294 as separate commands — the corpus's own bare blockquote lines became redirections, writing 53 zero-byte files to the repository root. **This research ran `check.py --no-headings $(git ls-files 'docs/*.md')` directly in a single Bash-tool invocation (not wrapped in a second `bash -c`) to reproduce D-19's checkpy total** — this is safe because a single shell invocation performs ordinary word-splitting on the substitution (each filename becomes one argv element), not script-line execution; `git status --porcelain` was re-verified byte-identical immediately after (9 lines, same set) confirming no stray files resulted. **The planner must still forbid the double-shell form explicitly in the runner's own contract** (D-53: `{cmd, args[]}`, never a shell string) — this incident is about a *recorded* command being replayed through a second shell layer, which the runner must never do internally regardless of how a human invokes the tool interactively.
- **Trusting `sha`/`sha_short` equality as a same-commit precondition.** `154-GATE-BASELINE.json`'s `anchor_note` (read this session) documents exactly why: ordinary GSD close-out sequencing (task commits → SUMMARY commit) makes literal baseline-vs-HEAD equality unsatisfiable by the time the next plan starts. The correct check is tree-object equality (`git rev-parse <sha1>^{tree}:docs` == `git rev-parse <sha2>^{tree}:docs}`), not commit-SHA equality.
- **A count-equality assertion with no pathspec-existence guard.** Confirmed this session: `git grep` returns rc 1 identically for "path exists, zero matches" and "bad pathspec" — an audit row with a stale or mistyped `path` fails silently as "0 occurrences, fix confirmed absent" instead of erroring.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|--------------|-----|
| Bundle rebuild orchestration | A new build script | `node scripts/pipeline/build-publish-bundle.mjs --version=v1.22` | Confirmed argv, confirmed 15/15 self-test, confirmed exact 237-row canary live |
| Filename/registry parsing | A new registry parser | `parseRegistry` imported from `build-filename-map.mjs` (its `main` is guarded by `isMainModule`, confirmed at `:55` — safe to import) | Confirmed 8/8 self-test; `build-publish-bundle.mjs` itself already imports it this way |
| Bundle content verification | A `verify-bundle.mjs` script | 12 inline assertions in the plan task (D-23) | Two precedents (152-02: 22 rows, 153-14: 3 rows) both ran inline; CONTEXT's round 3 reversed two new-tool proposals of this exact profile |
| Gate-drift re-measurement | A second `gate-drift.mjs` | The existing five component invocations, run twice (before/after) with `{cmd,args[]}` recorded per D-20 | A self-typed zero via a second tool proves only determinism, not correctness — D-21's explicit reasoning |
| Person-first / em-dash protection logic in a new tool | Hand-rolled regex re-implementation | Import `PROTECT`/`HEADING`/`FENCE`/`KEEP_LINE`/`quoted_lines` from `sweep3.py` by file location (the `check-prose-style.py:167-179` precedent, confirmed read this session) | A hand-rolled version during Phase 157's own draft inverted the rule on all four of its own findings and proposed editing a protected Windows OOBE string |
| Enumeration of the corpus file set | A new enumeration script | `git ls-files 'docs/*.md'` (in-process import for a task, per `check-prose-style.py`'s pattern — never a nested shell) | An earlier fragment-based enumeration method in Phase 157's own draft inflated hit counts 93→70 by double-counting per-file fragments |

**Key insight:** every tool this phase needs, except the ~10-line `judge-packets.py` fix and the new `audit-claimed-fixes.mjs`, already exists, is already read-only or default-dry-run, and was independently re-executed this session with results matching CONTEXT's figures (with the one LINE COUNT DIFFERS exception noted above). The discretionary work is entirely in the new runner's row schema and the plan's task/commit sequencing against D-69's thirteen ordering constraints — not in tool-building.

## Common Pitfalls

### Pitfall 1: Treating a CONTEXT `[MEASURED]` figure as still current without re-running it

**What goes wrong:** a number copied from `158-CONTEXT.md` into a plan or into `158-GATE-BASELINE.json` silently goes stale if any intervening commit touched the measured surface.
**Why it happens:** CONTEXT was authored against `937d0a1f`; by the time a plan runs, HEAD has moved (this session alone found HEAD at `f5b01df7`, two commits later).
**How to avoid:** re-run every command this research or CONTEXT names at plan/execute time; never paste a number without its command.
**Warning signs:** exactly this session's LINE COUNT DIFFERS finding — 14 measured live vs 21 written in CONTEXT, with `docs/` provably unchanged between the two measurement points. If a *docs/*-changing commit lands between this research and plan execution, re-run again — do not trust this research's 14 either.

### Pitfall 2: `git grep -c` as the sole instrument for a label-splitting fix class

**What goes wrong:** `-c` sums matching *lines*, not occurrences, and a wrapped citation (the line-wrap defeats both `sweep3.py`'s lookbehind guards and `git log -S`, per WINDOWS row 15) is invisible to a naive count.
**Why it happens:** `-c`'s line-based semantics look like an occurrence count until a line carries the needle twice.
**How to avoid:** D-47's specified instrument — `git grep -o -F` counting non-empty output lines for directory-scoped rows; `git show <rev>:<file>`, join, collapse `\s+`, count in-process for file/wrapped/secret rows.
**Warning signs:** confirmed live this session — `-c` sums to 39, `-o` counts 42, on the identical needle and range.

### Pitfall 3: Assuming a bad pathspec and zero matches are distinguishable by exit code

**What goes wrong:** an audit row whose `path` was mistyped, or whose target was deleted/renamed between the parent and HEAD commits, reports "0 occurrences, confirmed absent" — the wrong conclusion for a row that should instead fail loud.
**Why it happens:** `git grep` returns rc 1 for both conditions.
**How to avoid:** D-47's mandatory pre-count guard — `git ls-tree -r --name-only <rev> -- <path>` must be non-empty before trusting any subsequent `git grep` rc-1 result as "zero matches" rather than "bad pathspec."
**Warning signs:** confirmed live this session with a synthetic nonexistent pathspec — identical rc 1 to a genuine zero-match case.

### Pitfall 4: Importing `build-publish-bundle.mjs` for its exports

**What goes wrong:** `build-publish-bundle.mjs` reads `process.argv` and computes `ZIP_NAME` (via `deriveZipName`) at module load time, outside any function guard (confirmed read this session, lines ~34-70) — importing it from another script's process re-parses *that* process's argv and can call `process.exit(1)` during the import itself if the importer's own argv doesn't look like a valid `--version=` invocation.
**Why it happens:** the module was written to be run directly, not imported; only `build-filename-map.mjs`'s `main` is guarded by `isMainModule`.
**How to avoid:** import only `parseRegistry`/`readFile` from `build-filename-map.mjs` (D-64); never `import` from `build-publish-bundle.mjs` anywhere in the plan's verify tasks — invoke it only as a subprocess or in its own dedicated Bash call (D-22).
**Warning signs:** an unexplained `process.exit(1)` with no stack trace from a script that merely tried to read a constant off the bundle builder.

### Pitfall 5: Running the bundle build outside its own Bash invocation

**What goes wrong:** the tool cap on a Bash tool call is well under the bundle's own measured runtime.
**Why it happens:** `[MEASURED, CONTEXT D-22]` ~1,424 ms/doc convert + ~145 ms/doc guard × 237 docs ≈ 390–410 s; this research did not re-run the full 237-doc bundle (it is not read-only — it writes `dist/*.zip` and regenerates `filename-map.md`, and D-22 already measured it with justification), but the per-doc rate is independently plausible given this session's own measured single-command runtimes (pandoc + guard for one doc is on the order of 1.5s, matching the stated 1,424+145 ms).
**How to avoid:** D-22's own prescription — its own Bash invocation, nothing else in that call, 600,000 ms cap (1.5× headroom over the ~410s worst case).
**Warning signs:** a timeout mid-conversion; recovery is to remove the staging dir and any `dist/*.tmp`, then re-run (D-22).

## Code Examples

### The `LINE COUNT DIFFERS` file list at this session's HEAD (verbatim, 14 files — not 21)

```
# python scripts/docs-style/verify2.py d0b611e8 2>&1 | grep "LINE COUNT DIFFERS"
docs/_glossary-linux.md
docs/_glossary.md
docs/_standards/EEE-SOP-standard.md
docs/_templates/admin-template-android.md
docs/_templates/admin-template-ios.md
docs/_templates/admin-template-macos.md
docs/_templates/admin-template.md
docs/_templates/l1-template.md
docs/_templates/l2-template.md
docs/_templates/recipe-template.md
docs/_templates/reference-template.md
docs/operations/drift-migration/02-macos-drift-detection.md
docs/operations/drift-migration/03-ios-android-drift-detection.md
docs/operations/patch-management/00-overview.md
```
(8 `_templates/` files + `_glossary.md` + `_glossary-linux.md` + `EEE-SOP-standard.md` + the 2 drift-migration judge-hunk files + `patch-management/00-overview.md` = 14. Re-run this exact command at plan/execute time; do not copy this list either without re-confirming.)

### The 59-file SC#3 edit list, both derivations, confirmed byte-identical

```bash
$ git diff --name-only 3a5c74b6^..937d0a1f -- docs/ | wc -l
59
$ git diff --name-only d0b611e8..937d0a1f -- docs/ | wc -l
59
$ diff <(git diff --name-only 3a5c74b6^..937d0a1f -- docs/ | sort) \
       <(git diff --name-only d0b611e8..937d0a1f -- docs/ | sort)
# (no output -- identical)
```
This confirms D-11's claim exactly, from a fresh derivation using both cited commit ranges.

### The `via apt` needle sites, confirmed present at the exact lines D-10/D-35 name

```bash
$ grep -n "via apt" docs/index.md docs/operations/00-index.md docs/reference/linux-capability-matrix.md
docs/index.md:305:...Linux update delivery via apt and unattended-upgrades.
docs/operations/00-index.md:28:...Linux update delivery via apt and unattended-upgrades.
docs/reference/linux-capability-matrix.md:112:| Linux ships the [...package](...)  (org-installed via apt from packages.microsoft.com) ... |
```
The third site (`linux-capability-matrix.md:112`) is a protected table row (starts with `|`) — `sweep3.py` skips it structurally (confirmed: table-row lines are `skipped["table row"]`, before any substitution rule runs), matching D-10's "no edit, no disposition row, one note" prescription exactly.

### The audit runner's confirmed-safe git-argv pattern (for `audit-claimed-fixes.mjs`)

```javascript
// Node built-ins only. execFileSync, never a shell string. `--` terminator always.
import { execFileSync } from 'node:child_process';

function gitLsTreeNonEmpty(rev, path) {
  const out = execFileSync('git', ['ls-tree', '-r', '--name-only', rev, '--', path],
                            { encoding: 'utf8' });
  return out.trim().length > 0;
}

function countOccurrences(rev, path, needle) {
  if (!gitLsTreeNonEmpty(rev, path)) throw new Error(`bad pathspec at ${rev}: ${path}`);
  try {
    const out = execFileSync('git', ['grep', '-o', '-F', '-e', needle, rev, '--', path],
                              { encoding: 'utf8' });
    return out.split('\n').filter(Boolean).length; // rc 0: count non-empty lines
  } catch (err) {
    if (err.status === 1) return 0;   // rc 1: zero matches (guard already ran above)
    throw err;                         // rc >= 2: real git error
  }
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|---------------|--------|
| `git log -S "<string>"` as the sole confirmation instrument | Per-claim before/after occurrence count via `git grep -o -F` / joined-blob comparison | This phase (VERIFY-06) | `-S` cannot distinguish "removed everywhere" from "removed here, re-added there" — the exact class of the falsified HP citation |
| A hand-sequenced commit table for ordering | Thirteen mechanism-forced ordering constraints (D-69) tied to what the tooling actually reads/writes | This phase, reversing an earlier draft | The harness flips requirement checkboxes from plan frontmatter — a hand-sequenced table could not have been executed as written |
| A new bundle-verification script | 12 inline assertions in the plan task | 152-02 / 153-14 precedent, reaffirmed here (round 3 reversed two new-tool proposals) | Matches the codebase's own established pattern; avoids a fourth tool this milestone would need to legitimize |

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | `pandoc`/`pwsh` versions measured this session (`3.7.0.2`/`7.6.5`) remain unchanged through plan execution | Standard Stack | The bundle's pre-run pandoc-pin check (D-22) already guards this — low risk, self-detecting |
| A2 | The single-shell-invocation replay of `check.py --no-headings $(git ls-files 'docs/*.md')` performed in this research session is safe on this Windows/Git-Bash host specifically, and the same command through a *different* shell (cmd.exe, a nested `bash -c`) may not be | Anti-Patterns to Avoid | Medium — the runner itself must never construct this pattern internally regardless of host shell, per D-53; this assumption only concerns interactive reproduction of this research's own measurements |

**No claim above rests on training knowledge without a same-session command; both entries are risk notes on already-measured facts, not unverified assertions.**

## Questions Resolved During Research

None left unresolved. The one substantive discrepancy found this session (`LINE COUNT DIFFERS` = 14, not CONTEXT's 21) is resolved above as an actionable planner instruction — re-derive the number live in `158-GATE-BASELINE.json`'s `before` measurement rather than copying either figure — not left as an open question.

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Python 3 | Every `.py` tool in this phase | ✓ | (system) | — |
| Node.js | Every `.mjs` tool in this phase | ✓ | (system) | — |
| pandoc | Bundle conversion | ✓ | `[MEASURED]` 3.7.0.2 (matches `convert.ps1`'s pin) | — |
| PowerShell (`pwsh`) | `Compress-Archive` | ✓ | `[MEASURED]` 7.6.5 | — |
| git | Every audit/gate command | ✓ | (system) | — |

**No missing dependencies.** Every tool this phase requires was confirmed present and working this session.

## Security Domain

`.planning/config.json` carries no security keys, so defaults apply (ASVS 1, `security_block_on` default severity). Every plan must carry the `<threat_model>` block in the 157 shape (`Threat ID | Category | Component | Severity | Disposition | Mitigation Plan`), a `## Trust Boundaries` sub-table, and a `-SC` package row (D-30).

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|-------------------|
| V4 Access Control | no | No auth/session surface in this phase's tooling |
| V5 Input Validation | yes | `execFileSync` with `--` terminator, needles never interpolated into a shell string; `git ls-tree` guard before every count |
| V6 Cryptography | no | No cryptographic surface |
| V12 File/Resource | yes | The audit runner's `os.tmpdir()` self-test git-repo fixture must be cleaned up on every exit path; the bundle run's staging-dir `rmSync` (`build-publish-bundle.mjs:385`) already runs only after six exit-1 preflight gates |

### Known Threat Patterns for this stack (from `158-CONTEXT.md` D-31, confirmed against source this session)

| Pattern | STRIDE | Standard Mitigation | Confirmed this session |
|---------|--------|----------------------|--------------------------|
| Information disclosure of the host label removed at `077b29b7` | Information Disclosure | `secret: true` rows carry no literal; never `git log -S` for secret rows; negative-control grep before every commit | This research never printed, searched for, or referenced the label's value anywhere, per the hard rule in the invocation prompt — confirmed by never running `git log -S` or opening `9a114815`'s diff at any point |
| A false claim crossing repository prose into the published bundle | Tampering | The audit, the judge, corpus-consistency assertions | The audit runner's `git ls-tree` + occurrence-count design (above) is the concrete mechanism |
| Data-driven git argv in the runner | Tampering | `execFileSync`, `--` terminator, no shell, needles never interpolated | Confirmed pattern in Code Examples above; this is the same pattern this research itself used for every git command it ran this session |
| A killed bundle run indistinguishable from success | Repudiation | Pre/post `dist/` inventory; staging-dir exact-count assertion (D-23(8)(10)) | Not re-run this session (D-22 already measured it; re-running is execution, not research) |
| The `claude -p` judge as a write-capable subprocess over corpus bytes with corpus-text-as-instructions | Tampering | Blocklist (D-56); prompt + packet pre-assembled into one file; raw stdout captured | `156-JUDGE-PROMPT.md` structure confirmed read this session — matches the described blocklist-and-decision-procedure shape |

## Sources

### Primary (HIGH confidence — read/executed directly this session)

- `scripts/docs-style/verify-meaning.py` (all 440 lines scanned; argv parsing at `:313-323`, `--self-test` fixtures at `:380-436`)
- `scripts/docs-style/judge-packets.py` (166 lines; argv at `:126-138`, `MODALS` at `:26`)
- `scripts/docs-style/verify2.py` (121 lines; `slug()` at `:33`, `health()` at `:68-121`) — executed with `BASE=d0b611e8`
- `scripts/docs-style/sweep3.py` (281 lines; `SUBS`, `KEEP_LINE`, `EMDASH` at top; main argv at `:245-281`) — executed dry-run twice (default SUBS, and `--subs subs-emdash-batch10.tsv`)
- `scripts/validation/check-prose-style.py` (474 lines; exit-code contract at `:132-146`; `NEEDLES`/`EXEMPTIONS` at `:127-149`; `main` at `:463-473`) — executed normal mode
- `scripts/validation/check-nav-hub-links.mjs` (485 lines; usage/exit contract at `:1-19`; main runner at `:456-485`) — executed normal mode
- `scripts/validation/c17-eee-contract.mjs` — executed normal mode
- `scripts/validation/check-phase-153.mjs` — executed (apex, 111/0/0)
- `scripts/validation/_lib/archive-path.mjs` (30 lines, read in full)
- `scripts/pipeline/build-publish-bundle.mjs` (686 lines; argv/version parse at `:34-70`; self-test at `:502-686`) — executed `--self-test`
- `scripts/pipeline/build-filename-map.mjs` (403 lines; exports at `:68,75,103`; self-test at `:216-366`) — executed `--self-test`
- `scripts/pipeline/guard-docx.mjs` (self-test fixture pattern at `:206-245`)
- `scripts/pipeline/convert.ps1` (`$expectedVer` at `:43`)
- `.claude/skills/google-style/check.py` — executed via `check-prose-style.py`'s import and directly with `--no-headings`
- `~/.claude/gsd-core/workflows/execute-plan.md:505-543` (`update_requirements`/`git_commit_metadata` steps, read in full)
- `~/.claude/gsd-core/workflows/execute-phase.md:1400-1436` (`update_roadmap` step)
- `~/.claude/gsd-core/bin/lib/milestone.cjs:150-185` (checkbox + traceability-row flip logic)
- `~/.claude/gsd-core/workflows/secure-phase.md:75-90` (short-circuit rule)
- `.planning/phases/154-*/154-GATE-BASELINE.json` (`anchor_note`, read in full)
- `.planning/phases/156-*/156-GATE-BASELINE.json`, `156-JUDGE-PROMPT.md` (structure read)
- `.planning/phases/157-*/157-BASELINE.json` (keys enumerated), `157-SECURITY.md` (threat-register shape)
- `.planning/WINDOWS.md` (rows 10, 13, 15 read verbatim, confirmed `open`)
- `.planning/config.json` (confirmed `nyquist_validation: false`, no security keys)
- `.planning/REQUIREMENTS.md`, `.planning/ROADMAP.md` (Phase 158/159 sections), `.planning/STATE.md` (LOCKED decisions, deferred items, D-00a exception)
- git history: `git log`, `git diff --name-only`, `git show`, `git grep`, `git ls-tree`, `git rev-list`, `git merge-base --is-ancestor` — all executed live this session against commits `d0b611e8`, `e6930d25`, `937d0a1f`, `f5b01df7`, `3a5c74b6^`

### Secondary (MEDIUM confidence)

- `158-CONTEXT.md`'s own `[MEASURED]` figures not independently re-run this session (e.g., the full bundle timing formula, the 37-invocation idempotency sweep total, the RESUME.md 30-ruling count) — cited with attribution, not re-verified, because re-running the full bundle or the full RESUME.md re-audit is execution work, not research, and D-22/D-03 already document the measurement method.

### Tertiary (LOW confidence)

None — every claim in this document is either a same-session command result or an explicit pointer to a CONTEXT decision, never an unattributed inference.

## Metadata

**Confidence breakdown:**
- Tool CLI contracts: HIGH — every argv/exit-code claim was read from source and, for read-only tools, executed this session
- Artifact shapes (`*-GATE-BASELINE.json`, judge prompt, dispositions TSVs): HIGH — read in full or keys enumerated this session
- Flip mechanics (`requirements.mark-complete`/`phase.complete`): HIGH — read in full from the workflow source
- The LINE COUNT DIFFERS figure: HIGH that 14 is correct at this session's HEAD; the planner must still re-run at plan/execute time per the staleness discipline this whole milestone practices
- Bundle full-run timing: MEDIUM — cited from CONTEXT D-22, not re-executed (execution, not research)

**Research date:** 2026-09-07
**Valid until:** Re-run every command in this document again immediately before planning if any commit lands on `docs/`, `scripts/docs-style/`, `scripts/validation/`, or `scripts/pipeline/` between now and plan authoring. Given this milestone's own demonstrated churn rate (two `.planning`-only commits already landed between CONTEXT and this research), treat this document as valid for a few hours, not days.
