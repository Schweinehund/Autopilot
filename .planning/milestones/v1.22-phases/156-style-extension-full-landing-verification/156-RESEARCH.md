# Phase 156: STYLE Extension & Full-Landing Verification - Research

**Researched:** 2026-09-04
**Domain:** Deterministic prose-style tooling (Python), fresh-process LLM judging, structural doc-validator gates (Node.js) — all internal to this repository, no external stack.
**Confidence:** HIGH

## Summary

This phase has almost no "unknown domain" to research — 156-CONTEXT.md is itself the output
of a 5-Finder/Adversary/Referee adversarial-review pass that already ran the load-bearing
commands and corrected six of its own draft's falsified measurements. This RESEARCH.md's job
is narrower than usual: (1) independently re-verify a sample of the ~35 `canonical_refs`
citations and every command whose output feeds a planning number, (2) organize the verified
tooling into the Standard-Stack / Architecture-Pattern / Pitfall shape the planner consumes,
and (3) surface anything CONTEXT.md's own citations got wrong so the planner does not build a
task around a stale line number.

**Independent re-verification (this session, HEAD `c994da79`, branch `v1.22/154-style-landing`)
confirmed every content claim spot-checked**: the `Sure Admin` counts (35 corpus-wide / 25 in
the HP file, exact), the `check.py`/`sweep3.py`/`verify2.py`/`judge-packets.py` mechanics
D-01–D-37 describe, the `_JUDGE-VERDICTS.json` shape (406 entries, `baseline: "c97d322"`,
counts `360/26/19/1`, all 406 `(file, baseline_line)` keys unique, zero `docs/`-prefixed),
the D-32 verbatim citation quote, the `claude -p` fresh-process judge dispatch (`PONG`, exit 0,
v2.1.260), and the current gate baseline (apex `check-phase-153` 111/0/0, C17 237/0, nav-hub
0/0/0). **Five citation line numbers drifted by 1-3 lines** from what `canonical_refs` states
(detailed in Citation Spot-Check below) — all are near-misses onto the correct function/block,
none point at wrong code, and this matches the project's own documented pattern that
"coordinates in this repository have gone stale inside a single phase" (`REQUIREMENTS.md:99`).

**Primary recommendation:** Plan Phase 156 as CONTEXT.md's D-01 through D-37 already specify —
this research does not surface a reason to deviate from any of them. Treat `git status
--porcelain` byte-identity, `git log -S`/`-G` before trusting any "reverted" claim, and
re-running the committed tool (never a hand-rolled reimplementation) as the three cross-cutting
verification disciplines every task in this phase must carry.

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Mechanical style sweep (admin/vs/em-dash substitutions) | Local tooling (`scripts/docs-style/sweep3.py`, Python) | — | Deterministic regex substitution over `docs/` prose; no server/client tiers involved |
| Fresh-agent modal-loss judging | Local tooling dispatch (`claude -p` subprocess from `gsd-executor`'s Bash grant) | — | D-14: a fresh OS process, not a fresh "agent type" — this repo's independence mechanism has always been process isolation |
| Structural gate (C17, apex, nav-hub, link/pin differs) | CI/local validators (`scripts/validation/*.mjs`, Node.js) | — | Read-only assertions over `docs/` and `.planning/`, run before and after the corpus edit |
| Verdict/pin/baseline record-keeping | Filesystem artifacts (`.json`/`.tsv` under `scripts/docs-style/` and `.planning/phases/156-*/`) | — | No database; the "storage tier" for this phase is committed JSON/TSV files read by Python and Node scripts |

There is no browser/API/database tier in this phase — everything is CLI tooling operating on a
git-tracked Markdown corpus. The map exists mainly to confirm there is nothing to misassign.

## Standard Stack

### Core (already committed in this repository — do not reinstall or reimplement)

| Tool | Location | Purpose | Why Standard |
|------|----------|---------|---------------|
| `sweep3.py` | `scripts/docs-style/sweep3.py` (281 lines) | Deterministic regex substitution sweep (admin/vs/em-dash) with 5 built-in guards | `[VERIFIED: scripts/docs-style/sweep3.py]` — the only mechanism that gets `quoted_lines()`, the `PROTECT` mask, the exact pin check, the C17 #12 200-char cap and the frontmatter skip for free (D-23) |
| `judge-packets.py` | `scripts/docs-style/judge-packets.py` (133 lines) | Aligns baseline↔new lines via `difflib`, drops lines where every modal survived, bins hunks into judge packets | `[VERIFIED]` `MODALS = re.compile(r"\b(should\|will\|would\|could\|must\|shall\|may\|might)\b", re.I)` at line 29 — 8 modals, matching D-18's "8-modal regex" claim |
| `verify-meaning.py` | `scripts/docs-style/verify-meaning.py` (440 lines) | Canonicalizes mechanical transforms, reports undispositioned findings, prints raw judge worklist | `[VERIFIED]` `mech_canon()` at line 68-76 (canon line 73 exact); argv parse (`main()`) at line 313 |
| `verify2.py` | `scripts/docs-style/verify2.py` (121 lines) | Proves only intended substitutions occurred; before/after link+anchor health (Part A/B) | `[VERIFIED]` `BASE = sys.argv[1]` at line 27 exact; `Path('docs')` hardcode at line 43 (canonical_refs says `:42`, off by 1 — see Citation Spot-Check); reads the **working tree**, not a git ref, at line 49 |
| `pins2.py` | `scripts/docs-style/pins2.py` (59 lines) | Regenerates a validator-literal pin list from live `check-phase-*.mjs` files | `[VERIFIED]` `V = pathlib.Path("D:/claude/Autopilot/scripts/validation")` (live) at line 41, `D = pathlib.Path("D:/claude/docs-google-style-test")` (scratch) at line 42 — exact match to D-08's citation |
| `claude -p` (Claude Code CLI) | on `PATH`, v2.1.260 | Fresh-process judge dispatch from an ordinary `<task type="auto">` | `[VERIFIED, this session]` `timeout 60 claude -p "Reply with exactly: PONG" --output-format text </dev/null` → `PONG`, exit 0 |
| 34 `subs-*.tsv` files | `scripts/docs-style/subs-*.tsv` | Per-batch regex/replacement rows consumed by `sweep3.py --subs` | `[VERIFIED]` `ls scripts/docs-style/subs-*.tsv \| wc -l` = 34, matching D-01 |
| `_CONTENT-PINS.txt` | `scripts/docs-style/_CONTENT-PINS.txt` | Validator-literal protection list passed to every `sweep3.py` invocation | `[VERIFIED]` exists; D-08's live-corpus regeneration question (562 vs 685 pins) is Claude's Discretion per CONTEXT.md — do not silently pick one, record the choice |
| `_JUDGE-VERDICTS.json` | `scripts/docs-style/_JUDGE-VERDICTS.json` | Prior-phase verdict record for the 406 already-judged hunks | `[VERIFIED, this session]` top-level keys `{baseline, judged, judges, note, counts, verdicts}`; `baseline`="c97d322"; `judged`=406; `counts`={STRENGTHENED:26, PRESERVED:360, INVERTED:19, WEAKENED:1}; `verdicts` is a 406-element list; all 406 `(file, baseline_line)` pairs unique; 0 of 406 `file` values start with `docs/` (all scratch-root-relative) — every load-bearing D-20 claim about this file's shape reproduces exactly |
| `check-phase-153.mjs` | `scripts/validation/check-phase-153.mjs` | Apex validator chaining 145-152 plus others | `[VERIFIED, this session]` `node scripts/validation/check-phase-153.mjs` → **111 PASS, 0 FAIL, 0 SKIPPED** at current HEAD — this is the live "before" gate state Phase 156 must reproduce as its VERIFY-04 before-half (already captured by Phase 154 but confirmed still green now) |
| `c17-eee-contract.mjs` | `scripts/validation/c17-eee-contract.mjs` | Structural EEE contract check (13 assertions) | `[VERIFIED, this session]` → **237 files checked, 0 with violations** at current HEAD |
| `check-nav-hub-links.mjs` | `scripts/validation/check-nav-hub-links.mjs` | Nav-hub link/anchor checker | `[VERIFIED, this session]` → **0 hub-presence failures, 0 corpus-link failures, 0 total** at current HEAD |

### Supporting

| Tool | Purpose | When to Use |
|------|---------|-------------|
| `prose.py` / `prose_all.py` | Generate a starting worklist of style-rule candidates | Only as a starting point per D-03 — it omits 4 of sweep3's guards (`KEEP_LINE`, exact pin check, C17 #12 cap, frontmatter skip), so its output is never authoritative on its own |
| `subs-admin-batch9.tsv` | The corpus-wide capitalised Admin/Admins negative-lookbehind pattern | Reference shape for any new admin-class row this batch needs; row 26 (data row 2) is the `(?<!Sure )` guard verified live this session |
| `_DISPOSITIONS.tsv` / `_DISPOSITIONS-docs.tsv` | Disposition records for `verify-meaning.py --dispositions` | `_DISPOSITIONS-docs.tsv` is frozen at exactly 6 rows by a Phase 154 contract (D-21) — do not append batch-10 findings to it |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Reusing committed `sweep3.py`/TSV rows for the em-dash pass | A bespoke em-dash classifier script | **Rejected — D-23 measured that this is exactly how 9 of 13 per-file rows in an earlier draft went wrong.** The committed tool carries 5 protective guards a reimplementation will not reproduce correctly. |
| `claude -p` fresh-process judge dispatch | A `checkpoint:human-action` handing the judge pass to a human | **Rejected — D-15.** `gsd-executor` has no `Agent` tool but does have `Bash`, and `planner-antipatterns.md`'s first listed anti-pattern is using a checkpoint for automatable work. |
| Sibling `_JUDGE-VERDICTS-batch10.json` for the new 406+N verdicts | Appending batch-10 rows into the existing `_JUDGE-VERDICTS.json` | **Genuinely open — D-20 is the phase's one real close call, left as an owner/planner decision.** Both options are internally consistent; see D-20 for the full tradeoff table. |

**Installation:** None. Everything above is already committed in this repository; no `pip install` / `npm install` is required for this phase.

**Version verification:** Not applicable — no versioned external packages are introduced by this phase (see Package Legitimacy Audit).

## Package Legitimacy Audit

**Not applicable.** This phase installs no external packages. All tooling used (`sweep3.py`,
`judge-packets.py`, `verify-meaning.py`, `verify2.py`, `pins2.py`, `claude` CLI) is already
committed in this repository or already present on `PATH` (`[VERIFIED, this session]` `claude
--version` → `2.1.260 (Claude Code)`; `python --version` → `3.13.5`; `git --version` → `2.51.0`).
No `npm view` / `pip index versions` / `cargo search` gate applies.

## Architecture Patterns

### System Architecture Diagram

```
                 ┌─────────────────────────────────────────────────────────┐
                 │   13 target documents (9 post-fork + RE-237 + 3 RCP-     │
                 │   touched) inside docs/, tracked by git                  │
                 └───────────────────────────┬─────────────────────────────┘
                                              │
        ┌─────────────────────────────────────┼──────────────────────────────────────┐
        │  STEP 1 — MECHANICAL SWEEP (D-01, D-04, D-05)                               │
        │  sequential subs-*.tsv runs → sweep3.py --subs <tsv> --apply, then          │
        │  batch-10-authored rows for the residue (admin-class, em-dash 3-row TSV)    │
        └─────────────────────────────────────┬──────────────────────────────────────┘
                                              │  git diff BASE..HEAD (docs/ only)
                                              ▼
        ┌─────────────────────────────────────────────────────────────────────────────┐
        │  STEP 2 — JUDGE-PACKET GENERATION (D-16, D-17, D-18)                        │
        │  judge-packets.py BASE . --chunks N   (walk-root filter, NOT "docs" cwd)    │
        │  BASE = SHA immediately before the first batch-10 doc commit                │
        │  → per-file JSON packets, one judge reads one whole document               │
        └─────────────────────────────────────┬─────────────────────────────────────┘
                                              │  fresh `claude -p` process per packet
                                              ▼
        ┌─────────────────────────────────────────────────────────────────────────────┐
        │  STEP 3 — FRESH-AGENT JUDGE PASS (D-14, D-19, VERIFY-02/03)                 │
        │  committed 156-JUDGE-PROMPT.md, dispatched as its own bytes (not retyped)   │
        │  extended blocklist: RESUME.md, subs-*.tsv, sweep3.py, both skills,         │
        │  _JUDGE-VERDICTS.json, _DISPOSITIONS*.tsv, this phase's own CONTEXT/PLAN    │
        │  Explicit ask for out-of-task defects → 156-JUDGE-FINDINGS.md              │
        └─────────────────────────────────────┬─────────────────────────────────────┘
                                              │  verdicts + fixes
                                              ▼
        ┌─────────────────────────────────────────────────────────────────────────────┐
        │  STEP 4 — JUDGE FIXES + TSV ROW DELETION, SAME COMMIT (D-05)                │
        │  apply fixes to the 13 docs; delete the subs-*.tsv row that caused any      │
        │  overturned mechanical edit, in the SAME commit as the fix                  │
        └─────────────────────────────────────┬─────────────────────────────────────┘
                                              │
                                              ▼
        ┌─────────────────────────────────────────────────────────────────────────────┐
        │  STEP 5 — IDEMPOTENCY RE-SWEEP (D-05, D-37)                                 │
        │  re-run base + every rule set over the 13 → must report 0 edits            │
        │  (closes the "judge fixes/em-dash write NEW unstyled prose" gap)           │
        └─────────────────────────────────────┬─────────────────────────────────────┘
                                              │
                                              ▼
        ┌─────────────────────────────────────────────────────────────────────────────┐
        │  STEP 6 — SC#4 STRUCTURAL GATE, BEFORE/AFTER (D-28..D-36, VERIFY-04)        │
        │  C17 · apex check-phase-153 · nav-hub link checker · link differ (verify2)  │
        │  · pin differ — measured once BEFORE (this session: 111/0/0, 237/0, 0/0/0)  │
        │  and once AFTER, at commits on either side of the fully-landed batch-10     │
        └─────────────────────────────────────────────────────────────────────────────┘
```

### Recommended Task/Commit Structure (per D-04)

```
Commit 1 — mechanical sweep (sequential subs-*.tsv + batch-10-authored admin rows)
Commit 2 — em-dash pass (3-row TSV through unmodified sweep3.py, per D-23)
Commit 3 — judge fixes + their subs-*.tsv row deletions (same commit, per D-05)
Commit 4 — pin regeneration / live-corpus pin coverage (per D-08's discretionary choice)
Commit 5 (or folded into gate work) — 156-GATE-BASELINE.json + before/after re-measurement
```

Each commit needs its own named gate per D-04 — `LEFTOVERS: 0` is only true after the *last*
file, so it cannot be the per-commit gate; D-21's conflict-marker gate is trivially green here
(no merge) and does not answer the question either.

### Pattern 1: Perturb-and-Restore Non-Vacuity Proof
**What:** Before trusting a guard/detector, deliberately break it, observe it fail, then restore
it and observe it pass again.
**When to use:** Any claim of the form "guard X protects Y" — a guard is only as good as its
detector (D-06's own finding: the `Sure Admin` fix is correct, but its recorded detector
`grep -c "Sure Administrator" docs/` can never fail because it lacks `-r`).
**Example (verified working this session):**
```bash
# Source: this session, reproducing D-06's perturbation
grep -c "Sure Administrator" docs/        # WRONG: "Is a directory", prints 0, exits 2 -- can never fail
grep -rc "Sure Administrator" docs/ | awk -F: '{s+=$2} END{print s}'   # RIGHT: correctly reports 0 today
```

### Pattern 2: Rule-Deletion-With-Verdict (STYLE-03 precedent)
**What:** Every hand-adjudicated revert gets a `KEEP_LINE` entry; every mechanical row a judge
verdict overturns gets deleted from its `subs-*.tsv` in the same commit as the verdict.
**When to use:** Step 4 of the pipeline above — never leave a revert unprotected, or the next
sweep run silently re-breaks it (this happened 20 times in the original pass per STYLE-03).

### Anti-Patterns to Avoid
- **Hand-rolling a classifier instead of running the committed tool:** D-23/D-24 measured that
  this single choice produced every wrong number in the original draft's Area C (em-dash
  section). The committed `sweep3.py` + a 3-row TSV gets 5 protective guards for free; a
  reimplementation drops all of them silently.
- **Reading a tool's output/docs instead of running it:** the whole `156-CONTEXT.md` opens with
  "Five of the draft's own measurements were falsified during review... every one of them
  because someone READ a tool instead of RUNNING it." This governs every count that ends up in
  a plan.
- **Windows-path invocation of Python tools from PowerShell:** `[VERIFIED via D-13's measurement,
  cited in CONTEXT.md]` `python sweep3.py /tmp/b10 …` reproduces correctly in Git Bash but in
  PowerShell (this project's primary shell) silently reports `DRY RUN -- 0 files … 0 TOTAL
  edits` and exits 0 — a vacuous green. Always record and use the exact invocation shell.
- **Treating `_CONTENT-PINS.txt`/pin-differ silence as protection over the 13:** it was built by
  intersecting live validators against a **scratch** corpus that predates all 13 target
  documents (D-08); only 39 of 117 relevant validator literals are actually pinned.
- **Treating a NEGATIVE assertion (e.g. `V-149-BARREDPHRASINGS`) as pin-differ-visible:** a pin
  differ can only detect a *lost* literal, never an *introduced* one (D-10). Re-run the
  affected validators (145-152) directly after every batch-10 commit.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Em-dash tightening over the 13 | A bespoke regex/script scanning for spaced em dashes | The committed `sweep3.py` fed a 3-row TSV (`\s+—\s+`, `\s+—`, `—\s+`) unmodified | Gets `quoted_lines()`, the `PROTECT` mask, the exact pin check, the C17 #12 cap, and the frontmatter skip for free — a hand-rolled version silently drops all five (D-23) |
| Judge dispatch isolation | A new subagent type, worktree, or `checkpoint:human-action` | `claude -p` as a fresh OS process from `gsd-executor`'s existing `Bash` grant | This repo's independence mechanism has always been process isolation, not agent-type choice (D-14); a checkpoint here is `planner-antipatterns.md`'s first-listed anti-pattern (D-15) |
| Judge-worklist chunking by document | Custom line-range splitting logic | `judge-packets.py --chunks N` (bins by file, never splits a document) | Already satisfies SC#2's "one judge reads a whole document" at any `N` (D-18) |
| Verdict-record key uniqueness check | A new dedup script | `(file, baseline_line)` tuple, already proven unique across all 406 existing entries this session | Re-derive the same invariant for batch-10 rows rather than inventing a new key shape |

**Key insight:** Every hand-rolled reimplementation attempted in this milestone's drafting
process produced a wrong number. The five guards baked into the committed 281-line `sweep3.py`
(fenced/indented-code skip, heading skip, table-row skip, `KEEP_LINE`, exact-pin check, C17 #12
cap) took multiple batches to get right the first time; there is no reason a fresh
reimplementation would get them right on the first attempt in this phase.

## Common Pitfalls

### Pitfall 1: Trusting a tool's committed documentation instead of running it
**What goes wrong:** A count, a detector's behavior, or a "this was fixed" claim is asserted
directly from `RESUME.md`, a skill's `SKILL.md`, or a validator's comment, without running the
underlying command.
**Why it happens:** The documentation reads authoritatively and is usually *close* to correct,
which makes the gap easy to miss.
**How to avoid:** Every number that reaches a plan or a commit message must have a command next
to it in this session's or the executor's own transcript. `RESUME.md` is explicitly named
untrusted in `canonical_refs`.
**Warning signs:** A number that "sounds right" but has no `[VERIFIED]`/`[MEASURED]` tag with a
literal command attached.

### Pitfall 2: Vacuous-green detectors
**What goes wrong:** A grep, a script invocation, or a dry-run reports "0 problems" not because
there are none, but because the invocation itself is broken (missing `-r`, wrong cwd, wrong
shell, unchecked `returncode`).
**Why it happens:** A script that fails softly (prints 0, exits 0 or a non-distinguishing
non-zero) looks identical to a script that ran correctly and found nothing.
**How to avoid:** Perturb-and-restore (Pattern 1) every guard before trusting it; check
`returncode`/exit code explicitly, not just stdout content.
**Warning signs:** `judge-packets.py` invoked with `docs` as `CORPUS_ROOT` from the repo root
reports `0 hunks / 0 files, exit 0` (D-16) — a config error, not an empty result.

### Pitfall 3: A pin file or structural gate that predates the content it should protect
**What goes wrong:** `_CONTENT-PINS.txt` was regenerated against a scratch corpus that forked
before the 9 post-fork documents existed; running it over those 9 documents protects almost
nothing (39 of 117 relevant literals) while reporting apparent full coverage.
**Why it happens:** The pin file's *presence* implies protection; its *provenance* (which
corpus it was built against) is what actually determines coverage.
**How to avoid:** For any pin/differ artifact, confirm both the corpus it was generated against
and the corpus it is being checked against are the same, or explicitly account for the gap
(D-08).
**Warning signs:** A "0 edits" or "0 lost pins" result on a document set that was never present
when the pin file was built.

### Pitfall 4: Shell/OS invocation mismatch producing silent success
**What goes wrong:** The exact same Python command produces correct output in Git Bash and a
silent, wrong "0 edits, exit 0" in PowerShell.
**Why it happens:** Path-separator and argv-quoting differences between POSIX shells and
PowerShell change how `sys.argv` is parsed by scripts written and tested against Git Bash.
**How to avoid:** Record and reuse the exact shell + path style verified to work (D-13); do not
assume a command that worked once will behave identically in every shell available.
**Warning signs:** `prose.py`'s own docstring already carries this warning as a sibling note.

## Code Examples

### Reproducing the current gate baseline (before-half re-confirmation)
```bash
# Source: this session, HEAD c994da79, branch v1.22/154-style-landing
node scripts/validation/check-phase-153.mjs         # apex: 111 PASS, 0 FAIL, 0 SKIPPED
node scripts/validation/c17-eee-contract.mjs        # C17: 237 files checked, 0 violations
node scripts/validation/check-nav-hub-links.mjs     # nav-hub: 0 hub-presence, 0 corpus-link failures
```

### Judge-packets, correctly walk-rooted (per D-16 — do NOT pass `docs` as CORPUS_ROOT from repo root)
```bash
# Source: scripts/docs-style/judge-packets.py docstring + D-16's measured fix requirement
python scripts/docs-style/judge-packets.py <BASE> . --chunk-file out/chunk --chunks <N>
```

### Sweep3 invocation shape (dry run is the unconditional default; --apply opts OUT of it)
```bash
# Source: scripts/docs-style/sweep3.py argv parse, verified this session (lines 244-249)
python scripts/docs-style/sweep3.py docs scripts/docs-style/_CONTENT-PINS.txt --subs <tsv>
# add --apply only once the dry-run counts are reviewed
```

### Sure Admin perturbation (verified this session — currently 0, as expected pre-sweep)
```bash
grep -rc "Sure Admin" docs/ | awk -F: '{s+=$2} END{print s}'   # 34 lines / 35 occurrences today
grep -rc "Sure Admin" docs/operations/firmware-bios/03-hp-bios-configuration.md   # 24 lines / 25 occurrences
```

### `_JUDGE-VERDICTS.json` shape (verified this session)
```python
# Source: this session, python -c inspection of scripts/docs-style/_JUDGE-VERDICTS.json
{
  "baseline": "c97d322",
  "judged": 406,
  "judges": 10,
  "counts": {"STRENGTHENED": 26, "PRESERVED": 360, "INVERTED": 19, "WEAKENED": 1},
  "verdicts": [ /* 406 entries, each {"file": <scratch-root-relative path>, "baseline_line": int,
                   "verdict": str, "fix": str, ...} — (file, baseline_line) unique across all 406,
                   0 of 406 "file" values are docs/-prefixed */ ]
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|---------------|--------|
| `EXPECTED_LINE_COUNT` equality pins on recipe files | Existence + non-emptiness + verbatim-H1 + content-needle assertions | Phase 155, D-10 (D-00a exception) | RE-224's `check-phase-135.mjs` is now edit-tolerant; `[VERIFIED]` `V-135-RECIPE` at line 73 confirms this shape, and `EXPECTED_ANTIFEATURE_ROWS = 12` plus the 3-row namespace-table assertion are still live and must not be disturbed by batch-10 (D-11) |
| Hand-authored em-dash classification per file | 3-row TSV through unmodified `sweep3.py` | This phase (D-23), correcting an earlier draft | Recovers 5 guards a hand-rolled version dropped |

**Deprecated/outdated:**
- Treating `RESUME.md` as a trustworthy source: it is explicitly flagged untrusted in
  `canonical_refs` and is the origin of at least one falsified "revert" claim (VERIFY-06's own
  motivating example).

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | The exact `--chunks` value and whether `_CONTENT-PINS.txt` is regenerated vs. supplemented are left to the planner's/executor's discretion per CONTEXT.md's "Claude's Discretion" section — this research does not resolve either. | Architecture Patterns, Standard Stack | If the planner picks a `--chunks` value without justifying it against the skill's committed `--chunks 10` and the real 114/102 modal population (D-18), a plan-checker or reviewer may flag it as unjustified. Low risk — it is explicitly discretionary, not a fact claim. |
| A2 | The 114/102 modal-population counts and the 447 em-dash count cited from CONTEXT.md (D-18, D-23) were not independently re-derived in this session (would require replicating sweep3's/judge-packets' guard logic exactly); they are treated as authoritative because CONTEXT.md tags them `[MEASURED]` under this repository's own adversarial-review discipline and this session's spot-checks of *other* CONTEXT.md counts (Sure Admin 35/25, apex 111/0/0, verdict-record shape) all reproduced exactly. | Standard Stack, Architecture Patterns | If CONTEXT.md's D-18/D-23 counts are wrong despite the pattern above, a `--chunks` or em-dash-TSV choice built on them could be miscalibrated — low risk since the actual work (running the real tool) does not depend on knowing the exact count in advance. |

## Citation Spot-Check Report

Per this phase's research-discipline requirement to spot-check `canonical_refs` citations,
~25 of the ~35 were opened and read this session. **Every content/behavior claim attached to a
citation reproduced exactly.** Five line-number pointers drifted by 1-3 lines from the cited
line to the actual code they describe — all are near-misses onto the correct function or block,
none point at unrelated code, and none change any measured count or claim:

| Citation as given | Actual location `[VERIFIED, this session]` | Assessment |
|---|---|---|
| `sweep3.py:22` (admin-center exemption regex) | Regex is at line **23**; line 22 is the last line of the comment block directly above it | Off-by-one, same statement group — not a wrong-code pointer |
| `judge-packets.py:26` (8-modal regex) | `MODALS = re.compile(...)` is at line **29**; line 26 is `import subprocess` | Off by 3 — the regex itself is correctly described (8 modals, confirmed) |
| `judge-packets.py:70-79` (the alignment) | The `SequenceMatcher`-best-match alignment loop is at lines **68-74**; 75-82 is the modal-survival check that follows it | Overlapping but shifted ~2 lines early |
| `judge-packets.py:83-85` (modal-bag drop) | The actual modal-bag comparison (`if ... modal_bag(ln) == modal_bag(after): continue`) is at line **81**; lines 83-85 are the context-window `lo`/`hi`/`out.append` lines that follow it | Off by ~2-4 lines, same functional block |
| `verify2.py:42` (hardcoded `Path('docs')`) | `Path('docs')` is at line **43** | Off-by-one |
| `verify2.py:47` (worktree read) | `p.read_text(...)` (the working-tree read) is at line **49** | Off by 2 |

**None of these drifts invalidate a CONTEXT.md claim** — every described behavior (the 8-modal
set, `changed_files()`'s unchecked returncode at `:40-43` exact, the binning at `:118-127`
exact, `pins2.py:41-42`'s live/scratch split exact, `check-phase-135.mjs:73`'s `V-135-RECIPE`
exact, `check-phase-151.mjs:173`'s armed-landmine string exact, `SKILL.md:99`'s `--chunks 10`
exact, `SKILL.md:119`'s `[PILOT]` exact, `verify-meaning.py:73`'s `mech_canon()` exact) was
confirmed either exactly or within this small drift. This is consistent with `REQUIREMENTS.md`'s
own standing warning: "Every line number in this section is a convenience pointer, not an
identity... Locate by quoted text, then re-measure." **Recommendation for the planner:** locate
these five sites by the quoted code shown above rather than by the bare line number if a task
needs to reference them precisely.

**All 13 batch-10 target documents confirmed present** `[VERIFIED, this session]`:
```bash
for f in docs/operations/firmware-bios/{00-overview,01-windows-dfci,02-dell-bios-configuration,03-hp-bios-configuration,04-lenovo-bios-configuration}.md \
         docs/operations/patch-management/{07-windows-autopatch,08-windows-app-updates}.md \
         docs/recipes/{05-enterprise-update-plan,06-walk-up-avd-kiosk-autologon,01-shared-windows-avd-client,03-windows-11-multi-app-kiosk}.md \
         docs/reference/{firmware-oem-matrix,licensing-matrix}.md; do [ -f "$f" ] && echo OK || echo MISSING; done
# 13 of 13 OK
```

## Open Items and Their Recommended Resolution

*(Named here rather than under a bare "Open Questions" heading, per this phase's research
discipline — each carries the resolution this research recommends.)*

- **D-08's regenerate-vs-supplement pin question:** recommend the planner make this an explicit,
  single planned task with its own commit (per D-04's kind-based commit split) rather than
  folding it into the mechanical-sweep commit, since it changes a milestone-wide invariant
  (STYLE-06's 562-pin count) that other artifacts quote verbatim.
- **D-20's sibling-vs-single-file verdict record:** recommend the sibling
  `_JUDGE-VERDICTS-batch10.json` (leaving the 406 byte-unchanged), because it is provably
  simpler to verify (`git diff --exit-code` on the untouched file) than an interpretive
  "406 + N keys in one file" argument, and nothing currently reads `_JUDGE-VERDICTS.json`
  programmatically either way — but this is recorded as a recommendation, not a resolved fact;
  CONTEXT.md leaves it as an explicit owner/planner call.

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Python | `sweep3.py`, `judge-packets.py`, `verify-meaning.py`, `verify2.py`, `pins2.py` | ✓ `[VERIFIED]` | 3.13.5 | — |
| Node.js | `scripts/validation/check-phase-*.mjs`, `c17-eee-contract.mjs`, `check-nav-hub-links.mjs` | ✓ `[VERIFIED]` (all ran successfully this session) | not queried directly; validators executed without error | — |
| Git | `git diff`/`git show` calls inside every tool above | ✓ `[VERIFIED]` | 2.51.0.windows.2 | — |
| `claude` CLI (judge dispatch) | D-14's fresh-process judge mechanism | ✓ `[VERIFIED]` | 2.1.260 (Claude Code) | — |

**Missing dependencies with no fallback:** none identified.
**Missing dependencies with fallback:** none identified.

## Security Domain

**`security_enforcement` config key is absent from `.planning/config.json`** (treated as
enabled), but this phase's scope is prose-editing tooling over an internal documentation corpus
with no authentication, session, network, or user-input surface — the standard ASVS categories
largely do not apply.

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|-------------------|
| V2 Authentication | No | No auth surface in this phase's scope |
| V3 Session Management | No | N/A |
| V4 Access Control | No | N/A |
| V5 Input Validation | Marginal | Judge-consumed file content is trusted (own-repo docs); no external/untrusted input crosses a trust boundary |
| V6 Cryptography | No | N/A |

### Known Threat Patterns for this stack

| Pattern | STRIDE | Standard Mitigation |
|---------|--------|----------------------|
| Shell/command injection via subprocess calls | Tampering | `[VERIFIED, this session]` `grep -n "shell=True\|os.system\|eval(\|exec(" scripts/docs-style/*.py` returns no matches — all `subprocess.run` calls use list-argument form, not shell strings |
| Prompt content in judge dispatch treated as instructions | Tampering (indirect) | The judge blocklist (D-19) already exists to prevent the formatter's own rationale documents from contaminating a judge's verdict; extend it as D-19 specifies rather than trusting an ad hoc exclusion list |

## Sources

### Primary (HIGH confidence — read/executed directly this session)
- `scripts/docs-style/sweep3.py`, `judge-packets.py`, `verify-meaning.py`, `verify2.py`,
  `pins2.py`, `subs-admin-batch9.tsv` — read in full or by cited section, line numbers verified
- `scripts/docs-style/_JUDGE-VERDICTS.json` — structurally inspected via Python
- `scripts/validation/check-phase-153.mjs`, `c17-eee-contract.mjs`, `check-nav-hub-links.mjs`,
  `check-phase-135.mjs`, `check-phase-151.mjs` — executed or read by cited section
- `.claude/skills/google-style-verify/SKILL.md` — read by cited section
- `docs/operations/patch-management/08-windows-app-updates.md`,
  `docs/operations/firmware-bios/01-windows-dfci.md`, `docs/recipes/05-enterprise-update-plan.md`,
  `docs/_glossary.md` — read for D-06/D-09/D-32 quote verification
- `claude -p` CLI invocation — executed directly (PONG test)
- `.planning/config.json`, `python --version`, `git --version` — executed directly

### Secondary (MEDIUM confidence)
- `.planning/phases/156-style-extension-full-landing-verification/156-CONTEXT.md` — the
  adversarially-reviewed decision record this research validates against; treated as
  authoritative for counts not independently re-derived (D-18's 114/102, D-23's 447)

### Tertiary (LOW confidence)
- None used as fact in this document.

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — every tool exists, was read, and behaves as CONTEXT.md describes
- Architecture: HIGH — the 6-step pipeline is derived directly from D-01/D-04/D-05/D-16-D-20/D-28-D-36, all independently spot-checked
- Pitfalls: HIGH — each pitfall traces to a `[VERIFIED]` reproduction in this session or an exact citation match to CONTEXT.md's own measured findings

**Research date:** 2026-09-04
**Valid until:** This corpus and its SHAs move between sessions (per STATE.md's own "re-measure drift at plan time" pattern) — re-verify the apex/C17/nav-hub baseline numbers and `_JUDGE-VERDICTS.json` shape at plan time if more than a few days have elapsed, rather than trusting this file's snapshot.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

See `156-CONTEXT.md` `<decisions>` section in full — D-01 through D-37, organized under four
areas (A: batch-10 shape and rule sets; B: judge geometry and the verdict record; C: the
em-dash canon on the 13; D: the before/after gate artifact). These are reproduced verbatim in
that file and are not restated in full here to avoid drift between two copies; the planner MUST
read `156-CONTEXT.md` directly as the primary decision source. This RESEARCH.md's role is to
independently verify the technical claims underlying those decisions (see Citation Spot-Check
above) and to supply the tooling/pattern/pitfall material CONTEXT.md does not itself organize
for a planner.

### Claude's Discretion

- Whether D-08's live-corpus pin coverage lands as a regenerated `_CONTENT-PINS.txt`, an
  argv-ified `pins2.py`, or a separate literal-coverage check beside the existing file —
  provided the phase does not proceed on the false claim that the current pin file protects the
  13, and provided STYLE-06's 562-pin invariant is either preserved or amended deliberately
  rather than silently.
- The exact `--chunks` value, provided it is justified against the skill's committed
  `--chunks 10`, derived from the real 114/102 modal subset rather than 52, and paired with an
  empty-bin guard.
- Exact JSON key names and nesting inside `156-GATE-BASELINE.json`, provided the before and
  after blocks stay separable and the embedded 154 values carry `source_sha` and a content hash.
- Commit message wording throughout, and whether the `judge-packets.py` fix rides with the
  tooling commit or its own, provided it is separable from every corpus edit.

### Deferred Ideas (OUT OF SCOPE)

- The 43 editable spaced em dashes outside the 13, across 16 files, and the 14 en dashes plus
  1 spaced ASCII `--` inside the 13. → Phase 157 or backlog, with these measurements attached.
- A merge-marker / conflict gate as a standing validator — carried from Phase 155; still no
  validator covers it.
- `pins2.py` cross-repo geometry rework beyond whatever D-08 does minimally, and the same for
  `verify2.py` beyond D-31's two-line edit. → Phase 157 or later.
- `judge-packets.py` alignment quality — `difflib` greedy per-line `max(ratio)` with no
  consumption produces many-to-one pairings. Not blocking at batch-10 density. → backlog.
- A corpus-wide evidence-label taxonomy (`[SOURCED]`/`[ASSUMED]`/`[UNVERIFIED]`/`[PILOT]`)
  defined in one place — carried from Phase 155. → Phase 157.
- `V-132-HUBSNOTWIRED` / `V-137-HUBSNOTWIRED` regex repair — carried from Phase 155.
- `.gitattributes` `* text=auto eol=lf` — already deferred to Phase 159 by Phase 154.
- `docs/index.md` and `docs/_registry/RE-index.md` — touched by Phase 155, sit outside the 13;
  measured impact nil, recorded not acted on.
- The Phase 157 handoff contract — which classes are permanent gate exclusions and why.
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|--------------------|
| STYLE-02 | Batch-10 pass applies the same Google-style pass to the 13 documents (9 post-fork + RE-237 + 3 RCP-touched) never yet correctly seen | Standard Stack (sweep3.py/subs-*.tsv), Architecture Patterns Steps 1-2 and 4-5, Don't Hand-Roll, Pitfall 3/4 all directly support authoring and sequencing this pass |
| VERIFY-02 | Fresh-agent modal-loss judge pass over batch-10's hunks only, same section-3 procedure, chunked by file, verdict + quoted evidence per hunk, 406 previously-judged hunks not re-judged | Architecture Patterns Steps 2-3, Standard Stack's `judge-packets.py`/`claude -p`/`_JUDGE-VERDICTS.json` entries, Pattern 1 (perturb-and-restore), Don't Hand-Roll row 2/3 |
| VERIFY-03 | Judges asked explicitly for defects outside the modal task, findings recorded with file/line | Architecture Patterns Step 3 (156-JUDGE-PROMPT.md / 156-JUDGE-FINDINGS.md), Code Examples |
| VERIFY-04 | Full structural gate (C17, apex, nav-hub, link differ, pin differ) measured before and after landing at a stable commit on each side | Architecture Patterns Step 6, Code Examples (reproduced apex 111/0/0, C17 237/0, nav-hub 0/0/0 this session as the current "before" state), Standard Stack's validator rows |
</phase_requirements>
