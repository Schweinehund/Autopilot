# Phase 159: HARN — Harness Close - Research

**Researched:** 2026-09-08
**Domain:** Git history mechanics (plumbing squash), Node.js validation-harness conversion (frozen-corpus pattern), GitHub Actions CI workflow authoring, git hooks
**Confidence:** HIGH

## Summary

Phase 159 is not a library-integration phase — it has no new npm/pip packages, no new framework, no UI. It is a **mechanical extension of six existing patterns this repository has applied nineteen times before**: (1) insert a milestone-close SHA into `MILESTONE_CLOSE_SHAS` before the fixed `V14` sentinel, (2) convert a milestone-audit harness from live-`fs.readFileSync` reads to the `createFrozenCorpusReader`/`withDocsAtClose` frozen-read pattern, (3) fork that harness + its JSON sidecar byte-identically as the next milestone's harness, (4) write five content-leaf validators (`check-phase-154..158.mjs`) each with hard-coded needles proven to fail in a scratch copy, (5) write the apex `check-phase-159.mjs` from the `check-phase-153.mjs` template with updated `CHAIN_END`/`HARNESS`/`ARCHIVE_ROOT_TOKEN` constants, (6) clone `audit-harness-v1.21-integrity.yml` into a 20th coexistence workflow. Everything the planner needs — insertion points, apex arithmetic, sidecar shape, hook precedent — already exists on disk as sixteen prior Path-A generations to copy from.

This research independently re-ran (read-only) the load-bearing measurements CONTEXT.md marks `[MEASURED]`: the exact `frozen-at-close.mjs` insertion point (verbatim, by line), the `V-140-V14PIN` regex, the apex-template arithmetic, the 16-job v1.21 workflow structure, the current `.gitattributes`/CRLF state, `core.hooksPath`, the push/ahead counts, the 9-character scrubbed-token leak at `158-VERIFICATION.md:97`, and one full needle-attribution worked example. All of them confirm CONTEXT.md's claims; three numbers have drifted further since CONTEXT.md was authored (all in the "ahead of master" / index-file-count direction expected from ordinary commits made since), and are called out below per the project's own measurement-discipline rule (D-65): **the live value wins, record the delta, don't silently inherit the old number.**

**Primary recommendation:** Follow CONTEXT.md's thirteen-plan sequence (D-27) exactly; for every mechanical edit, use the verified file:line anchors and worked patterns in this document rather than re-deriving them, and re-run every command in the "Verified Measurements" table at plan-authoring time (not copy the number) per D-65.

## Architectural Responsibility Map

This phase has no browser/frontend/API/database tiers — it operates entirely inside the repository's own validation tooling and git plumbing.

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Milestone-close SHA pin (`MILESTONE_CLOSE_SHAS`) | Validation library (`scripts/validation/_lib/`) | — | Shared frozen-read infrastructure consumed by every `vX.Y-milestone-audit.mjs` |
| Harness conversion (live → frozen read) | Validation harness (`scripts/validation/v1.21-milestone-audit.mjs`) | Validation library | The harness owns its own read strategy; the library only supplies the reader factory |
| Content leaves (`check-phase-154..158.mjs`) | Validation harness (per-phase leaf) | — | Each leaf is a standalone Node script, no shared state beyond `_lib/` helpers |
| Apex (`check-phase-159.mjs`) | Validation orchestrator | CI (GitHub Actions) | Recursively spawns the chain; CI just re-invokes it on a different OS |
| CI coexistence workflow | CI / GitHub Actions | Validation orchestrator | A thin dispatcher over the same Node scripts, not independent logic |
| Git history squash / archive ref | Git plumbing (local) | — | `commit-tree`/`update-ref`, no application code involved |
| Pre-push guard | Git hooks (per-clone, local) | — | Shell script installed manually into `.git/hooks/`; never packaged |
| Jira sync | `.claude/hooks/jira-milestone-gate.cjs` (Stop hook) | STATE.md (data source) | Hook reads STATE/ROADMAP/mapping.json; writes nothing itself (delegates to the `jira-milestone` skill) |

## User Constraints (from CONTEXT.md)

### Locked Decisions

The full 67-decision, 12-area decision record lives in `.planning/phases/159-harn-harness-close/159-CONTEXT.md` (`<decisions>` block, D-01 through D-67) and is **binding** — this research does not re-litigate any of it. Load-bearing IDs referenced throughout this document: **D-01–D-13** (Area 1, squash/push/archival/secure-phase choreography), **D-14–D-17** (Area A0, the V121 pin), **D-18–D-26** (Area 2, HARN-03 conversion + Path-A fork), **D-27–D-30** (Area 5, plan count/apex arithmetic/19th workflow), **D-31–D-39** (Areas 3/6, needle rules + attribution boundaries + STD-02 gate), **D-40–D-46** (Area 4, close-time hygiene: `.gitattributes`, worktrees, WINDOWS.md, publish bundle, STATE reconciliation), **D-47–D-50** (Area 7, three-axis evidence), **D-51–D-52** (Area 10, amendment wording + gates), **D-53–D-57, D-67** (Areas 8/11, Jira/hooks/checkpoints), **D-58–D-61** (Area 12, close documents), **D-62–D-66** (cross-cutting guardrails: no `docs/` edits, predecessor-surface census, planning-document gates, measurement discipline, D-NN citation grammar).

**Do not restate these decisions as open questions in a plan — cite the `D-NN` id and move on.** Full text is reproduced in `159-CONTEXT.md` lines 17–128; this research does not duplicate all 67 bullets verbatim a second time to avoid drift between two copies of the same locked text — the planner reads `159-CONTEXT.md` directly as the source of record, exactly as the canonical_refs block instructs.

### Claude's Discretion

- Exact leaf check ids (`V-15N-*` names), detail-string wording, and the split of Plan 159-09's evidence sections.
- Which of the twelve 158 Deferred Ideas merge into one Part A entry where they share a root cause, provided none is dropped and none is filed under a misleading name.
- Timeouts per Axis-1/3 leg within D-50's rules.
- The pattern set for the bundle scan beyond the five named classes.

### Deferred Ideas (OUT OF SCOPE)

- Running the seven frozen harnesses from every apex (removing the NESTED skip for all of them, not only v1.21's) — the `NESTED-GUARD-SECOND-ORDER-ASYMMETRY` deferral's full form; V-159-HARN03 discharges it for one harness. → v1.23.
- Repointing the four dead SafetyNet sidecar pins and re-basing the sidecar's 30 unread `c13_rotting_external` entries. → v1.23, `v1.22-DEFERRED-CLEANUP.md` Part A.
- A general secret scanner in the repository (gitleaks-class) instead of the per-close pattern walk. → backlog.
- A separate OS user or container for Axis-3 to make the blind agent structurally isolated. → backlog; recorded as a disclosure this milestone.
- Fixing `verify2.py`'s argv handling and the exclusion-record producers, and the other Phase 158 Deferred Ideas. → Part A entries per D-59.
- The nine `DEFER-121-07-A` date placeholders — a future hygiene requirement; disclosed at every close until then.
- `workflow.windows_enforce` — leave unset until the open-row population is dispositioned by a milestone that owns it.

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| HARN-01 | Insert `MILESTONE_CLOSE_SHAS.V121 = 'e129081e'` strictly before `V14` | Exact insertion point verified below (frozen-at-close.mjs:184/188); subject-line discriminator command verified to return `e129081e` at count 1 |
| HARN-02 | Append `readAtV121Close`/`lsTreeAtV121Close`, convert v1.21's C17 guard + spawn to frozen reads | Export-append points verified (line 261, line 330); v1.20's already-converted C17 leg (lines 838–880) read in full as the copy template; `docs/recipes/05-enterprise-update-plan.md` presence/absence at V121/V120 independently confirmed |
| HARN-03 | Whole-harness conversion of `v1.21-milestone-audit.mjs`; sidecar + `BASELINE_26` fork | Confirmed current harness is live-`readFileSync` (0 occurrences of `MILESTONE_TAG`/`FROZEN` in v1.21's file today); v1.20's converted twin read as worked template; `BASELINE_9`/`BASELINE_25` insertion shape verified |
| HARN-04 | 20th Path-A lineage: `v1.22-milestone-audit.mjs` + apex + 20th CI workflow | v1.21 workflow's exact 16-job structure enumerated; `V-139-PROBEJOB`/`V-139-FETCHDEPTH` requirements read verbatim; none of the five deliverables exist yet (confirmed absent) |
| HARN-05 | Three-axis terminal re-audit, apex green before/after archival | Environment availability confirmed (node/python/git/gh/claude all present); Axis-3 dispatch precedent documented |
| HARN-06 | Single close-gate commit, tag `v1.22`, push to `origin/master` | `git rev-list --left-right --count origin/master...master` re-measured (`0  11`, confirmed); `git branch -r --contains 9a114815` re-confirmed empty; branch-ahead-of-master re-measured at 182 (CONTEXT's 179 has drifted +3) |

</phase_requirements>

## Verified Measurements (re-run this session, read-only)

All commands below were executed against HEAD `ffcb3eb6` on branch `v1.22/154-style-landing`. Where a figure differs from CONTEXT.md's `[MEASURED]` value, both are shown — **per D-65, the live value below is authoritative; the planner must re-run these again at plan-authoring/execution time**, since git state moves between sessions in this repo.

| Claim | Command | Result this session | CONTEXT.md figure | Delta |
|---|---|---|---|---|
| V121 SHA discriminator | `git log --all --format="%H\|%s" \| awk -F'\|' '$2 ~ /v1\.21/ && $2 ~ /MILESTONE CLOSE/'` | count=1, `e129081e512decb469c6d66f61456c669a33173b docs(153-14): v1.21 MILESTONE CLOSE — single close-gate commit, 58/58 requirements Validated` | `e129081e` at count 1 | none — confirmed |
| V117–V120 regression check | same discriminator per version string | count=1 each: `b56bba5e…`, `7af8a147…`, `a7bda73e…`, `246fa3dd…` | b56bba5e/7af8a147/a7bda73e/246fa3dd, all count 1 | none — confirmed |
| `docs/recipes/05-enterprise-update-plan.md` at V121/V120 | `git cat-file -e e129081e:docs/recipes/05-enterprise-update-plan.md` / same at `246fa3dd` | present at `e129081e`; `fatal: … but not in '246fa3dd'` | present at V121, absent at V120 | none — confirmed |
| `docs/` tree size at V121/V120 | `git ls-tree -r --name-only <sha> -- docs \| wc -l` | 307 / 296 | 307 / 296 | none — confirmed |
| `c17-eee-contract.mjs` commits since V121 | `git log --oneline e129081e..HEAD -- scripts/validation/c17-eee-contract.mjs \| wc -l` | 0 | "0 commits since e129081e" | none — confirmed |
| `158-VERIFICATION.md:97` leak | `awk 'NR==97'` | `\| Secret-scrub negative control \| \`git grep -i "<SCRUBBED-9CHAR-TOKEN>" HEAD\` \| exit 1 (no match) \| ✓ PASS \|` | line 97, one tracked occurrence, one untracked occurrence (same file) | none — confirmed verbatim |
| Scrubbed-token derivation | `git diff 077b29b7^ 077b29b7 -- assets/recipes/06-walk-up-avd-kiosk/NOTICE` | removed `<SCRUBBED-9CHAR-TOKEN>.[EMPLOYER-DOMAIN].COM`, added `real internal CMG FQDN segment`; the derived removed-only 9-character token is held only in a shell variable per D-06 and is never named in this document | derived-token-scan input | none — confirmed |
| `9a114815` remote reachability | `git branch -r --contains 9a114815` | empty | empty | none — confirmed |
| `origin/master` vs local `master` | `git rev-parse origin/master` = `c4088fc0…`; `git rev-parse master` = `8de413aa…`; `git rev-list --left-right --count origin/master...master` | `0	11` | `0 / 11` | none — confirmed |
| Current branch ahead of `master` | `git rev-list --count master..HEAD` | **182** | 179 (superseding 171) | **+3** — three more commits landed since CONTEXT authored (159-context/state/grammar-fix commits); re-measure again at Plan 159-01 authoring time |
| `.planning/artifacts/154-scratch-corpus.bundle` | `wc -c`; `git rev-parse HEAD:<path>` (blob); `git log --oneline -- <path>` (adding commit) | 1,701,557 bytes; blob `1f59b380…`; adding commit `f8750c6d` | 1,701,557 bytes, "`f8750c6d`" | none — CONTEXT's `f8750c6d` is the **commit** that added the bundle, not a blob hash; both readings agree |
| `.gitattributes` current content | `cat .gitattributes` | exactly one line: `scripts/pipeline/reference.docx binary` | same | none — confirmed; D-40's new line is appended below this |
| Index LF/CRLF split | `git ls-files --eol \| grep -c 'i/lf'` / `'i/-text'` | 3,179 LF-in-index, 0 CRLF-in-index, 11 `-text` (binary), 3,190 total tracked | "3,177 LF blobs and 0 CRLF blobs" | **+2** — two more tracked files added since CONTEXT authored; 0 CRLF-in-index confirmed unchanged (the important invariant D-40 rests on) |
| `core.hooksPath` | `git config --get-all core.hooksPath`; `grep hooksPath .git/config` | `D:\claude\Autopilot\.git\hooks` (absolute, explicit) | "already sets it explicitly to `.git/hooks`" | Confirmed in substance — it is the **absolute** path to the same directory `.git/hooks` resolves to on this machine. `.git/config` is never cloned/pushed, so a fresh clone starts with no `core.hooksPath` override and git's implicit default (`.git/hooks`) applies — D-08's "no `core.hooksPath` change" holds for both this checkout and a fresh clone. |
| `scripts/hooks/pre-push.sh` exists? | `ls scripts/hooks/` | only `pre-commit.sh` and `README.md` present | new tracked file, per D-08 | Confirmed NEW — Plan 159-01 must create it |
| `.git/hooks/pre-push` installed locally? | `ls .git/hooks/pre-push` | does not exist | not addressed | Confirmed absent — throwaway-clone tests in Plan 159-01 install it fresh, nothing to conflict with |
| `check-phase-54/55/56` baseline | `node scripts/validation/check-phase-{54,55,56}.mjs` | 32/32/32, 0 failed, all three | 32/32/32 | none — confirmed |
| `docs/*.md` file count (the `check-phase-145` floor input) | `git ls-files 'docs/*.md' \| wc -l` | 294 | 294 (D-31 floor input) | none — confirmed |
| Worktree census | `git worktree list`; `ls .claude/worktrees/` | 7 registered (incl. main), 13 directories on disk total | 13 directories, 7 registered agent worktrees | none — confirmed (6 orphans = 13 − 7) |
| `worktree-agent-*` branches | `git branch --list "worktree-agent-*" \| wc -l` | 13 | 13 branches to delete | none — confirmed |
| Predecessor-surface census | `git diff --name-only e129081e -- scripts/validation/`; same for `.github/workflows/` | exactly `check-phase-135.mjs`, `check-prose-style.py`; workflows: empty diff | "exactly `check-phase-135.mjs` … and the new `check-prose-style.py`" | none — confirmed |
| `V-140-V14PIN` regex | read `check-phase-140.mjs:118-145` | `/\n\s*V\w+:\s*'/` tested against text *after* the `V14: '0b3be9ab'` literal inside the `MILESTONE_CLOSE_SHAS` object body | same | none — confirmed, quoted verbatim below |
| Needle worked example (D-32/D-33) | `git grep -c "i\.e\." <sha> -- docs` at each of `8de413aa`, `af678f0c`, `ce9b0b73`, `2a46d32a`, `bb22f89a`, `937d0a1f`, `HEAD` | 1 → 0 → 0 → 0 → 0 → 0 → 0 | "1 → 0 at plan 154-02, `af678f0c`" | none — confirmed, and demonstrated stable at every later phase boundary |
| Per-file `e.g.` needle spot check (D-33) | `grep -c "e\.g\." <6 files>` | 2,1,1,1,1,1 | 2,1,1,1,1,1 | none — confirmed |
| `check-phase-135.mjs` RECIPE content needles (D-34) | `grep -n "## Unsupported and Anti-Feature Callouts\|Vendor/MSFT/AssignedAccess/Configuration"` | both literals present at lines 82/85 | same two literals | none — confirmed |
| `branching_strategy` in config.json | `cat .planning/config.json` | key **absent entirely** (only `research`, `_auto_chain_active`, `ui_safety_gate`, `ui_phase`, `use_worktrees`, `nyquist_validation`) | "pinned to `none`… as a forward-looking guard" | D-07's wording describes a state to be **written**, not a pre-existing one. **Plan 159-01 must add `"branching_strategy": "none"` to `.planning/config.json`** — it is not there today. |
| `nyquist_validation` | same file | `false` | — | Confirms this RESEARCH.md correctly omits the `## Validation Architecture` section per the task instructions |
| Environment tools | `node --version`, `python3 --version`, `git --version`, `gh --version`, `claude --version` | node v24.17.0, Python 3.13.5, git 2.51.0.windows.2, gh 2.81.0, claude 2.1.265 (`C:\Users\joanderson\.local\bin\claude.exe`) | node 20 pinned in CI (`actions/setup-node@v4`); local dev node is newer, immaterial | No missing dependency; CI pins node 20 independently of local machine version |
| `dist/docs-library-v1.22.zip` / build-tree SHA | `ls -la dist/…zip`; `git rev-parse 86c5f074`; `git rev-parse 86c5f074^{tree}` | zip exists, 4,105,804 bytes; commit `86c5f07456ab…` resolves; tree `2c917435…` | D-44's assertion input | none — confirmed both the commit and its tree resolve, so `git diff --stat 2c917435.. -- docs/ scripts/pipeline/` is a valid post-squash assertion form |

**[SCRUB NOTE, 2026-09-09, Phase 159 Task 1]** This research document, at commit `b0a2f84a`, itself carried four occurrences of the same literal 9-character label that `158-VERIFICATION.md:97` leaked — in the verified-measurements table's `158-VERIFICATION.md:97` leak row, that same table's scrubbed-token-derivation row, the "Secrets/env vars" runtime-state row further below, and a `git grep -c` verify command in the Plan Skeleton Inputs section for 159-01. All four are replaced above and below with `<SCRUBBED-9CHAR-TOKEN>`. **This is the SAME defect class as `158-VERIFICATION.md:97`, one artifact removed**: a document written to research and describe a leak went on to quote the leak itself, recurring in a downstream document authored by a different agent after the original site was already known. This recurrence is why `.planning/WINDOWS.md` row 17 scopes the defect to the class (verifier-secret-echo) rather than to the single `158-VERIFICATION.md:97` site — a site-scoped row would not have caught this second occurrence. D-05's `[MEASURED]` figure of exactly one tracked file carrying the label is superseded: at plan-authoring/execution time the live population was two tracked files across five occurrences (one here in `158-VERIFICATION.md`, four in this document), not one; see `159-EVIDENCE.md` for the full re-measurement.

## Standard Stack

**No new packages.** This phase adds zero dependencies. All tooling is either:
- Node.js built-ins (`node:fs`, `node:child_process`, `node:path`) — already used by every `check-phase-*.mjs` and `vX.Y-milestone-audit.mjs` file in the repo.
- The repo's own `scripts/validation/_lib/frozen-at-close.mjs` module (exports read in full this session — see Code Examples).
- `git` plumbing commands (`commit-tree`, `update-ref`, `rev-list`, `ls-tree`, `cat-file`, `diff`, `grep`, `hash-object`) invoked via shell, not a library.
- GitHub Actions built-in actions already pinned elsewhere in this repo: `actions/checkout@v4`, `actions/setup-node@v4` (node 20), and **newly** `actions/setup-python@v5` (not yet used anywhere in `.github/workflows/` — confirmed via `grep -rl setup-python .github/workflows/` returning nothing).

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Node.js `child_process.execFileSync` | built-in | Spawn `v1.21-milestone-audit.mjs` from the new apex leg (V-159-HARN03) and spawn `check-prose-style.py` from `check-phase-157.mjs` | Argument-array form only — never a concatenated shell string; this is the repo's one process-level security control (documented at `v1.21-milestone-audit.mjs:29`) |
| `actions/setup-python@v5` | v5 (pin a 3.x minor, e.g. `3.13`) | Give the three jobs that transitively run `check-phase-157.mjs` (`linux-chain-ubuntu-latest`, `check-phase-157`, `check-phase-159`) a deterministic Python | `ubuntu-latest` ships a Python already, but no existing workflow in this repo pins one explicitly — D-30 requires the explicit pin for reproducibility; this is genuinely new to the 20th workflow, not a copy of existing usage |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `actions/checkout@v4` | v4 (pinned, matches all 18 existing workflows) | Fetch full history (`fetch-depth: 0`) for every job that reads git history or frozen SHAs | Every job in the new workflow, per D-30's "`fetch-depth: 0` on every checkout" |
| `actions/setup-node@v4` | node 20 | Run the Node validators | Matches every existing job in `audit-harness-v1.21-integrity.yml` |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Plumbing squash (`commit-tree`/`update-ref`) | `git merge --squash` on a working tree | Rejected by D-01: opens a window where planning-file Stop hooks see stale state, and is not order-independent the way plumbing is |
| Pre-push hook via `scripts/hooks/pre-push.sh` + manual install | Husky / lefthook | Rejected by the existing `scripts/hooks/README.md` "Why Not Husky" section (polyglot repo, no existing JS dev-tooling dependency, ~10-line shell script) — this is not a new decision, it is the established precedent D-08 extends |
| A general secret scanner (gitleaks-class) for the leak scrub | Ad hoc derived-token pattern walk (D-06) | Deferred to backlog explicitly; the in-session derived-token method is cheaper and sufficient for one known 9-character token |

**Installation:** none required — everything above is already vendored (repo scripts) or already pinned in existing workflow files, except the one new `actions/setup-python@v5` step.

## Package Legitimacy Audit

**Not applicable.** This phase installs zero new npm/pip/cargo packages. `actions/setup-python@v5` and `actions/checkout@v4`/`actions/setup-node@v4` are GitHub-maintained first-party Actions already used elsewhere in this repository's own `.github/workflows/` tree (checkout/setup-node) or are the canonical companion Action for the language runtime GitHub itself publishes (setup-python) — no registry legitimacy check applies to GitHub Actions in the way it applies to npm/PyPI packages, and no `package.json`/`requirements.txt` changes are in scope for this phase.

## Architecture Patterns

### System Architecture Diagram

```
                         ┌─────────────────────────────┐
                         │  v1.22/154-style-landing     │  (current branch, 182 commits ahead of master)
                         │  (leak-scrub commit added)   │
                         └───────────────┬─────────────┘
                                         │ git commit-tree (plumbing squash, D-01/D-02)
                                         ▼
                         ┌─────────────────────────────┐
                         │  master (one new commit)     │──▶ refs/archive/v1.22-landing (old branch tip, D-07)
                         └───────────────┬─────────────┘
                                         │
              ┌──────────────────────────┼───────────────────────────┐
              ▼                          ▼                           ▼
  frozen-at-close.mjs          v1.21-milestone-audit.mjs      v1.22-milestone-audit.mjs (NEW, forked)
  + V121 pin (HARN-01/02)  ──▶ converted live→frozen (HARN-03) ──▶ + sidecar + BASELINE_26 (HARN-04)
                                         │                           │
                                         │ spawned by                │ spawned by
                                         ▼                           ▼
                              check-phase-159.mjs (NEW apex, HARN-04)
                              CHAIN_PHASES=[48..158] (111) + CHAIN_EXTRA=[30,31]
                              + V-159-HARN03 (spawns v1.21 harness) + AUDIT-HARNESS + SELF
                                         │
                                         │ globbed by check-phase-139 (V-139-PROBEJOB/FETCHDEPTH)
                                         ▼
                      .github/workflows/audit-harness-v1.22-integrity.yml (NEW, 20th workflow, 13 jobs)
                                         │
              ┌──────────────────────────┼───────────────────────────┐
              ▼                          ▼                           ▼
        Axis-1: fresh clone      Axis-2: CI dispatch by name   Axis-3: claude -p fresh sub-agent
        (Windows, local)         (linux-chain + leaf jobs)     (separate clone, --add-dir only)
              └──────────────────────────┴───────────────────────────┘
                                         │  (all three at ONE shared post-push SHA, D-10/D-11)
                                         ▼
                      push checkpoint (D-55) → git push origin master (D-10)
                                         │
                                         ▼
                      close-gate commit (D-57) → tag v1.22 → git push origin master v1.22 (D-12)
                                         │
                                         ▼
                      /gsd-complete-milestone: archive .planning/phases/159-*, re-run apex, record in
                      MILESTONES.md/STATE.md/PROJECT.md/tag message (D-12)
```

### Recommended Project Structure

No new directories. Files land in existing locations:
```
scripts/validation/
├── _lib/frozen-at-close.mjs          # EDIT: insert V121 pin (HARN-01/02)
├── v1.21-milestone-audit.mjs         # EDIT: whole-harness live→frozen conversion (HARN-03)
├── v1.21-audit-allowlist.json        # READ-ONLY (fork source)
├── v1.22-milestone-audit.mjs         # NEW: forked + converted (HARN-04)
├── v1.22-audit-allowlist.json        # NEW: header-fields-only copy (HARN-04)
├── regenerate-supervision-pins.mjs   # EDIT: insert BASELINE_26 comment block above `const BASELINE_9` (HARN-04)
├── check-phase-154.mjs .. check-phase-158.mjs  # NEW: 5 content leaves
├── check-phase-159.mjs               # NEW: apex (from check-phase-153.mjs template)
└── check-phase-135.mjs               # UNCHANGED (already the only pre-existing diff vs e129081e)
.github/workflows/
└── audit-harness-v1.22-integrity.yml # NEW: 20th coexistence workflow, 13 jobs
scripts/hooks/
├── pre-commit.sh                     # UNCHANGED
├── README.md                         # EDIT: add pre-push install block
└── pre-push.sh                       # NEW (D-08)
.gitattributes                        # EDIT: append `* text=auto eol=lf`
.planning/config.json                 # EDIT: add "branching_strategy": "none" (see Verified Measurements)
```

### Pattern 1: Milestone-close SHA back-anchor pin

**What:** A hard-coded 7–8 character commit SHA per milestone, stored in an ordered object literal, with `V14` pinned as the deliberately-last entry (a regex-enforced invariant, not convention).

**When to use:** Once per milestone close, always inserted strictly before `V14`, never appended.

**Example (verified, `scripts/validation/_lib/frozen-at-close.mjs:171-211`):**
```javascript
// Source: scripts/validation/_lib/frozen-at-close.mjs (this session, lines 171-211)
  V120: '246fa3dd',  // Phase 144 Plan 144-12 close-gate — v1.20 milestone close-gate; atom == close-gate.
                    // ... [regression-check commentary] ...
                    // V18..V119 (back-anchor invariant: V120 references a PAST close SHA; the V121 pin
                    // is deferred to the v1.22 close per the back-anchor rule). PLACEMENT: inserted here,
                    // strictly before the V14 entry immediately below — never appended — because
                    // `V-140-V14PIN` (check-phase-140.mjs) regex-asserts no V-tag key follows the V14
                    // literal inside this object body; V14 must remain the last entry.
  V14: '0b3be9ab',  // Phase 43 terminal commit of the viable window 2574c794..ba9ecd87 — subject
                    // ...
};
```
The new `V121: 'e129081e',` entry (with its own regression-checked-discriminator comment, following the exact prose shape of the `V120` block above it) is inserted **between** the end of the `V120` comment block (line 187, `... last entry.`) and the `V14: '0b3be9ab',` line (line 188). This is a mid-file insertion, never an append — confirmed by reading the file directly this session.

**The enforcing guard, quoted verbatim (`scripts/validation/check-phase-140.mjs:118-145`):**
```javascript
// Source: scripts/validation/check-phase-140.mjs, lines 118-145 (read this session)
checks.push({
  id: 'V14PIN',
  name: 'V-140-V14PIN: ' + FROZEN_LIB + ' carries the V14 pin with rationale, still the last entry in MILESTONE_CLOSE_SHAS',
  run() {
    const c = readFile(FROZEN_LIB);
    if (c === null) return { pass: false, detail: FROZEN_LIB + ' missing' };
    const PIN = "V14: '0b3be9ab'";
    if (!c.includes(PIN)) {
      return { pass: false, detail: 'V14PIN needle absent: literal pin "' + PIN + '" not found' };
    }
    if (!c.includes('AUDIT-CLOSE PIN')) {
      return { pass: false, detail: 'V14PIN rationale absent: "AUDIT-CLOSE PIN" comment text not found' };
    }
    const objMatch = c.match(/export const MILESTONE_CLOSE_SHAS = \{([\s\S]*?)\n\};/);
    if (!objMatch) {
      return { pass: false, detail: 'V14PIN needle absent: MILESTONE_CLOSE_SHAS object literal not found' };
    }
    const body = objMatch[1];
    const pinIdx = body.indexOf(PIN);
    if (pinIdx === -1) {
      return { pass: false, detail: 'V14PIN regression: pin not found inside the MILESTONE_CLOSE_SHAS object body' };
    }
    const after = body.slice(pinIdx + PIN.length);
    if (/\n\s*V\w+:\s*'/.test(after)) {
      return { pass: false, detail: 'V14PIN regression: another V-tag key appears after V14 -- V14 is no longer the last entry (AUDIT-CLOSE pin invariant violated)' };
    }
    return { pass: true, detail: 'V14 pinned with AUDIT-CLOSE rationale, confirmed last entry in MILESTONE_CLOSE_SHAS' };
```
This is a **substring-then-regex** check, not an object-key-order check: it locates the literal string `V14: '0b3be9ab'`, then scans everything *textually after* that literal (inside the object body) for `/\n\s*V\w+:\s*'/`. Inserting `V121` **before** `V14` therefore trivially satisfies this — the new key never appears in the "after" slice. Appending `V121` after `V14` would fail it immediately.

### Pattern 2: Live-to-frozen harness conversion (the HARN-03 shape)

**What:** Replace direct `fs.readFileSync` calls with a `createFrozenCorpusReader(MILESTONE_TAG, { extraPaths })` object, and replace an inline `execFileSync` subprocess spawn with `withDocsAtClose(MILESTONE_TAG, fn)`, which materializes the frozen `docs/**` tree into a temp directory and swaps `cwd` for the spawn.

**When to use:** Exactly once per harness, at the milestone immediately after its own close SHA becomes available (v1.21's harness converts at the *v1.22* close, not its own, because no `V121` SHA existed when it was born — D-19 reaffirms this timing).

**Confirmed NOT yet converted** (read this session, `scripts/validation/v1.21-milestone-audit.mjs`):
```javascript
// Source: scripts/validation/v1.21-milestone-audit.mjs, lines 79-82 (read this session — CURRENT, unconverted state)
function readFile(relPath) {
  const abs = join(process.cwd(), relPath);
  if (!existsSync(abs)) return null;
  return readFileSync(abs, 'utf8').replace(/\r\n/g, '\n');  // CRLF normalization per Phase 31 ca40eb9
}
```
No `MILESTONE_TAG`, `FROZEN`, or `createFrozenCorpusReader` identifier exists anywhere in this file today (confirmed via grep this session).

**The exact target shape, copied from the already-converted v1.20 twin** (`scripts/validation/v1.20-milestone-audit.mjs:44,58-91`):
```javascript
// Source: scripts/validation/v1.20-milestone-audit.mjs, lines 44/58-91 (read this session)
import { createFrozenCorpusReader, withDocsAtClose } from './_lib/frozen-at-close.mjs';  // Phase 153: withDocsAtClose converts the C17 spawn below to frozen-corpus mode (D-11)
// ...
const MILESTONE_TAG = 'V120';
const SIDECAR_PATH = 'scripts/validation/v1.20-audit-allowlist.json'; // UNCHANGED literal -- GOV-02
                                                                       // pins search for this exact string
const FROZEN = createFrozenCorpusReader(MILESTONE_TAG, { extraPaths: [SIDECAR_PATH] });

function readFile(relPath) {
  const c = FROZEN.get(relPath);
  return c === undefined ? null : c;   // undefined (never enumerated) and null (absent-at-SHA)
}                                       // both read as "missing" to every existing caller

function walkMd(dir) {
  const prefix = dir.endsWith('/') ? dir : dir + '/';
  return FROZEN.paths
    .filter((p) => p.startsWith(prefix))
    .map((p) => join(process.cwd(), p));
}

function parseAllowlist() {
  const raw = FROZEN.get(SIDECAR_PATH);
  if (raw === undefined || raw === null) {
    throw new Error(`Sidecar absent at frozen SHA (${MILESTONE_TAG}): ${SIDECAR_PATH} -- D-07 fail-loud`);
  }
  try {
    return JSON.parse(raw);
  } catch (err) {
    return { _parseError: err.message, safetynet_exemptions: [], supervision_exemptions: [] };
  }
}
```
For the v1.21 conversion: `MILESTONE_TAG = 'V121'`, `SIDECAR_PATH = 'scripts/validation/v1.21-audit-allowlist.json'` (unchanged literal — the same file, now read frozen), everything else copies verbatim.

**The C17 leg conversion** (`scripts/validation/v1.20-milestone-audit.mjs:820-880`, read in full this session):
```javascript
// Source: scripts/validation/v1.20-milestone-audit.mjs, lines 828-878 (read this session)
run() {
  const CONTRACT_REL = 'scripts/validation/c17-eee-contract.mjs';
  const CONTRACT_ABS = resolve(process.cwd(), CONTRACT_REL);
  // D-11: the existence guard stays against the LIVE repository root -- whether the validator
  // exists is correctly a live question, independent of which corpus it is about to audit.
  if (!existsSync(CONTRACT_ABS)) {
    return { pass: false, detail: 'C17 FAIL: ' + CONTRACT_REL + ' not present (EEE contract validator missing)' };
  }
  try {
    return withDocsAtClose('V120', (tmpDir, writtenPaths) => {
      const KNOWN_MEMBER = join(tmpDir, 'docs', 'recipes', '03-windows-11-multi-app-kiosk.md');
      if (!existsSync(KNOWN_MEMBER)) {
        throw new Error('C17 FAIL: known-member guard failed -- ' + KNOWN_MEMBER + ' absent from materialized V120 corpus');
      }
      if (!writtenPaths || writtenPaths.length === 0) {
        throw new Error('C17 FAIL: materialize guard failed -- zero files written to the temp directory');
      }
      try {
        execFileSync('node', [CONTRACT_ABS], { stdio: 'pipe', timeout: 300000, cwd: tmpDir });
        return { pass: true, detail: 'c17-eee-contract.mjs exits 0 against frozen V120 corpus (' + writtenPaths.length + ' files materialized; all enrolled files pass 13 assertions)' };
      } catch (err) {
        const stderr = err.stderr ? err.stderr.toString() : '';
        const stdout = err.stdout ? err.stdout.toString() : '';
        return { pass: false, detail: execFailDetail(stdout, stderr, { n: 500, trim: true, prefix: 'C17 FAIL: ' }) };
      }
    });
  } catch (err) {
    return { pass: false, detail: err.message };
  }
}
```
For V121: `KNOWN_MEMBER = join(tmpDir, 'docs', 'recipes', '05-enterprise-update-plan.md')` — confirmed present at `e129081e` and absent at `246fa3dd` (V120), a **strictly stronger** one-step-back discriminator than V120's own member (whose V119/V120 trees were byte-identical, 296/296 paths, per the comment in the same block — this session independently confirmed V121's tree is 307 paths vs V120's 296, so this V121 member does distinguish V121 from V120 directly, unlike the V120 leg which had to reach back to V118).

### Pattern 3: Apex-validator arithmetic (check-phase-153.mjs template → check-phase-159.mjs)

**What:** `CHAIN_START = 48` is fixed across all apex generations; `CHAIN_END = N - 1` where `N` is the apex's own phase number (the apex always excludes itself — confirmed by the comment `// [48..N-1] invariant for N=153: apex EXCLUDES its own phase (153).` at `check-phase-153.mjs:150`).

**Verified arithmetic for check-phase-159**:
```javascript
// Pattern from check-phase-153.mjs:149-151 (read this session), applied to N=159
const CHAIN_START = 48;
const CHAIN_END = 158;   // [48..158], apex excludes phase 159 itself
const CHAIN_PHASES = Array.from({ length: CHAIN_END - CHAIN_START + 1 }, (_, i) => CHAIN_START + i);
// => 111 entries
const CHAIN_SKIP = new Set([]);        // NEVER add entries — V-159-SELF hard-asserts size===0
const CHAIN_EXTRA = [30, 31];          // carried forward verbatim, disjoint from CHAIN_PHASES
const HARNESS = 'scripts/validation/v1.22-milestone-audit.mjs';
const ARCHIVE_ROOT_TOKEN = 'v1.22-phases';
```
Total checks = 1 AUDIT + 111 chain + 2 CHAIN_EXTRA + 1 AUDIT-HARNESS + 1 V-159-HARN03 (new leg, replaces `check-phase-153`'s `C17CARVEOUT-SUCCESSOR` leg — this apex generation's *own* additive leg) + 1 SELF = **117**, matching D-29 exactly. Confirmed by reading `check-phase-153.mjs` and `check-phase-144.mjs` side by side this session: the arithmetic pattern (`1 AUDIT + chain + CHAIN_EXTRA + 1 AUDIT-HARNESS + 1 [phase-specific additive leg] + 1 SELF`) is identical across both prior generations.

**V-159-HARN03 leg** (new, per D-25): `execFileSync`s `v1.21-milestone-audit.mjs` (now frozen/deterministic), requires exit 0, requires the file to reference `withDocsAtClose` (substring check, not a negative-assertion — D-25 explicitly rules out a negative substring test to avoid the `V-140-C17CARVEOUT` defect class). Skip this leg's own execution reasoning from `check-phase-153.mjs`'s `AUDIT-HARNESS` leg shape (same NESTED-skip pattern, `timeout: 300000` — `check-phase-153.mjs:264-291`, read this session), but do **not** apply the NESTED skip to V-159-HARN03 itself (D-25: "a frozen harness has no evolved corpus to skip for").

**The AUDIT-HARNESS leg shape to copy for V-159-HARN03** (`check-phase-153.mjs:264-291`, read this session):
```javascript
// Source: check-phase-153.mjs lines 264-286 (read this session) — copy shape for V-159-HARN03,
// but WITHOUT the `if (NESTED) return skip` branch (D-25)
checks.push({
  id: 'AUDIT-HARNESS',
  name: 'V-153-AUDIT-HARNESS: v1.21-milestone-audit.mjs exits 0 (current-milestone harness)',
  run() {
    if (!existsSync(join(process.cwd(), HARNESS))) {
      return { pass: false, detail: HARNESS + ' is absent -- current-milestone harness regression' };
    }
    if (NESTED) {
      return { pass: true, skipped: true, detail: 'nested invocation (CHECK_PHASE_NESTED=1): skip AUDIT-HARNESS re-run against evolved corpus' };
    }
    try {
      execFileSync('node', [HARNESS], { stdio: 'pipe', timeout: 300000, maxBuffer: SUBPROCESS_MAX_BUFFER, cwd: process.cwd() });
      return { pass: true, detail: 'v1.21-milestone-audit.mjs exits 0 (current-milestone harness)' };
    } catch (err) {
      const stderr = err.stderr ? err.stderr.toString() : '';
      const stdout = err.stdout ? err.stdout.toString() : '';
      const isMissing = err.code === 'ENOENT' || err.status === 127;
      if (isMissing) return { pass: true, skipped: true, detail: 'node executable unavailable (ENOENT/127) -- skipped' };
      return { pass: false, detail: execFailDetail(stdout, stderr, { n: 300, trim: false, prefix: 'harness FAIL: ' }) };
    }
  }
});
```

### Pattern 4: Content-leaf template (floor + presence + per-file needle)

**Verified floor guard** (`scripts/validation/check-phase-145.mjs:145-146,197-198`, read this session):
```javascript
if (files.length < 250) {
  return { pass: false, detail: 'docs/ walk found only ' + files.length + ' files (expected >= 250) -- treating as a missing-corpus null sentinel, not a vacuous pass' };
}
```
Live count this session: `git ls-files 'docs/*.md' | wc -l` → **294**, comfortably above the 250 floor D-31 requires every corpus-wide negative to carry.

**Verified presence-check helper** (`scripts/validation/check-phase-145.mjs:113-124`):
```javascript
function presence(id, path, req) {
  checks.push({
    id,
    name: 'V-145-' + id + ': ' + path + ' exists and is non-empty' + (req ? ' (' + req + ')' : ''),
    run() {
      const c = readFile(path);
      if (c === null) return { pass: false, detail: path + ' missing' };
      if (c.trim().length === 0) return { pass: false, detail: path + ' is empty' };
      return { pass: true, detail: path + ' present (' + c.length + ' bytes)' };
    }
  });
}
```
Reuse this exact helper shape for the presence checks each of `check-phase-154..158.mjs` needs (`verify-meaning.py`, `_DISPOSITIONS-docs.tsv`, `check-prose-style.py`, `audit-claimed-fixes.mjs`, etc. per D-33/D-36/D-37).

**Verified spawn+classifier trio** (`scripts/validation/check-phase-143.mjs:36-38,88-97`, for the STD-02 gate placement in `check-phase-157.mjs` per D-38):
```javascript
// Source: check-phase-143.mjs lines 91-97 (read this session) — the ENOENT/127/"not found" skip classifier
const isMissing = err.code === 'ENOENT' || err.status === 127
  || stderr.includes('not found') || stderr.includes('Could not resolve');
if (isMissing) return { pass: true, skipped: true, detail: 'node not found -- skipped' };
```
D-38 requires `check-phase-157.mjs` to use exactly this classifier around a `python3 scripts/validation/check-prose-style.py` spawn, paired with a hard presence check (`V-143-TOOLPRESENCE` shape) that does NOT skip on absence.

### Pattern 5: Worked needle-attribution measurement (D-32)

**What:** A corpus-wide `== 0` needle is only "the owning phase's" if it (a) moved to 0 inside that phase's commit window and (b) stays 0 at every later phase boundary. Verified boundaries this session (`git log --oneline -1 <sha>`):

| Phase | Window start | Window end |
|---|---|---|
| 154 | `8de413aa` | `ce9b0b73` |
| 155 | `ce9b0b73` | `2a46d32a` |
| 156 | `2a46d32a` | `bb22f89a` |
| 157 | `bb22f89a` | `937d0a1f` |
| 158 | `937d0a1f` | HEAD |

**Worked example, run this session** (`i.e.` corpus-wide count, one of `check-phase-154`'s needles per D-33):
```bash
for c in 8de413aa af678f0c ce9b0b73 2a46d32a bb22f89a 937d0a1f HEAD; do
  cnt=$(git grep -c "i\.e\." $c -- 'docs' 2>/dev/null | awk -F: '{s+=$NF} END{print s+0}')
  echo "$c: i.e. count = $cnt"
done
# Result: 8de413aa=1, af678f0c=0, ce9b0b73=0, 2a46d32a=0, bb22f89a=0, 937d0a1f=0, HEAD=0
```
This confirms the 1→0 transition happened at `af678f0c` (inside phase 154's window, before `ce9b0b73`) and stayed 0 through every subsequent phase boundary — exactly the two-part proof D-32 requires before a needle can be attributed to its phase. Copy this loop shape for any other corpus-wide needle in `check-phase-154..158.mjs`, substituting the token and the file-set glob.

### Anti-Patterns to Avoid

- **Appending `V121` after `V14`:** trivially fails `V-140-V14PIN`'s post-`V14` regex scan (D-16). Always insert before.
- **Using `git log -S` for a claimed-fix confirmation:** D-02/VERIFY-06's amendment (read from `.planning/REQUIREMENTS.md:44-45` this session) demonstrated `-S` returns 0 on a line-wrapped, removed-then-re-added string even though the fix provably landed — use a before/after occurrence-count comparison instead, never `-S` alone, for anything Phase 159 needs to confirm from prior phases' claims.
- **A negative substring assertion on the new harness in the apex** (e.g. "v1.22-milestone-audit.mjs does NOT contain X"): D-25 explicitly names this the `V-140-C17CARVEOUT` defect class — a negative claim about a file's *current* content becomes false the moment that file is edited again, with no test ever catching the regression. Positive presence/substring checks only.
- **Corpus-wide ceilings or equalities on common tokens, commit SHAs in needle strings, `.planning/`-scoped needles, or bare `\n` in regexes:** all explicitly banned by D-31.
- **`.git/config` core.hooksPath edits:** D-08 is explicit that none are needed; verified this session that the default (`.git/hooks`) is already the effective path both locally and for a fresh clone (`.git/config` is never cloned).

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Frozen-at-a-SHA file reads | A new one-off `git show sha:path` wrapper per harness | `createFrozenCorpusReader`/`readAtClose`/`lsTreeAtClose` from `_lib/frozen-at-close.mjs` (already exports `frozenCause` error taxonomy) | Sixteen prior harnesses already share this; a bespoke wrapper loses the shared `frozenCause` error taxonomy every caller in the chain depends on |
| EEE structural contract re-check | Inlining the 13 assertions from `c17-eee-contract.mjs` into the harness | `execFileSync` spawn of the existing byte-frozen contract validator | Explicitly rejected in the harness's own header comment: "NOT an inline copy of the 13 assertions / D1_MAP (a second copy would be divergence-prone)" |
| Secret detection for the leak scrub | A gitleaks-class scanner | The in-session derived-token walk (D-06) | Deferred as a Deferred Idea; for one known 9-character token a general scanner is disproportionate, and D-06 explicitly bars committing any hash of the value (brute-forceable at that width) |
| Git hook distribution | Husky / lefthook | Tracked shell script + documented manual `cp`/`chmod` install | Already the repo's own established precedent (`scripts/hooks/README.md`'s own "Why Not Husky" section, read this session) — Phase 159 extends the same pattern to `pre-push.sh`, does not introduce a new one |
| CI job enumeration for evidence (Axis-2) | Hard-coding a job list in a plan | `ls .github/workflows/*.yml` at dispatch time (D-48) | The workflow count/job set moves every milestone (16→13 jobs is itself expected per D-30); a live listing is the only accurate source |

**Key insight:** every piece of infrastructure this phase needs already has 16–19 prior instances in this exact repository. The research risk in this phase is not "what pattern to use" (settled) but "did I read the current instance correctly before copying it" — hence the heavy verbatim-quote-with-line-number discipline above.

## Runtime State Inventory

This phase is not a rename/refactor of application code, but it does touch several categories of state outside source files (git refs, worktrees, hooks, Jira). Answered explicitly per the mandatory-runtime-state protocol:

| Category | Items Found | Action Required |
|----------|-------------|------------------|
| Stored data | None — no database, no external datastore in scope. `.planning/artifacts/154-scratch-corpus.bundle` (1,701,557 bytes) is a tracked git object, not a live datastore; it stays tracked per D-09 (removing it would rewrite `8de413aa`). | None |
| Live service config | Jira: RTS-829 (Phase 159's story) is currently "In Progress" (confirmed via project state; `.claude/hooks/jira-milestone-gate.cjs` reads `.planning/STATE.md` + `.planning/jira/mapping.json`, both git-tracked, not a live-UI-only config). No n8n/Datadog/Tailscale-class external service is in this repo's stack. | RTS-829 held In Progress until `159-VERIFICATION.md` records `passed` (D-53); RTS-823 (milestone epic) flips Done at archival, not before. |
| OS-registered state | 7 registered `git worktree`s + 13 total directories under `.claude/worktrees/` (81 MB) verified this session; 13 `worktree-agent-*` local branches + 4 remote `atom` branches (`phase-119-atom-2`, `phase-125-atom-2`, `phase-128-atom-2`, `phase-139-atom-5`) confirmed via `git branch -a`. No Windows Task Scheduler / pm2 / launchd / systemd state in this repo's toolchain. | `git worktree remove` each of the 7 registered worktrees (record tip SHA first), `git worktree prune` the 6 orphans, delete the 13 local `worktree-agent-*` branches; the 4 remote atom branches and `phase-139-atom-5` local branch are KEEP-ruled (D-41). |
| Secrets/env vars | None found referencing a to-be-renamed identifier — this phase does not rename anything. The scrubbed token (`<SCRUBBED-9CHAR-TOKEN>…`) is a content-leak fix, not a secret-key rename; `.git/config`'s `hooksPath` is a local absolute path, never committed. | None beyond the scrub itself (D-05/D-06) |
| Build artifacts | `dist/docs-library-v1.22.zip` exists (4,105,804 bytes, confirmed this session) — a build artifact from Phase 158, not stale relative to the current tree per `158-VERIFICATION.md`'s own corpus-identity check. `.claude/skills/jira-milestone/install-jira-milestone-hook.cjs` is currently **untracked** (confirmed via `git status --porcelain`) and its embedded `HOOK_B64` is stale relative to the tracked, adapted hook (per D-67). | D-44: assert zip exists + `git diff --stat` against the build-tree SHA is empty (both confirmed resolvable this session); rebuild only if either check fails. D-67: re-encode the live adapted hook into `HOOK_B64` before committing the untracked installer. |

**Nothing found in category:** No database, no CI-external live-UI-only config, no OS task-scheduler state, no secret renames — verified explicitly above rather than left blank.

## Common Pitfalls

### Pitfall 1: Treating `.git/config`'s absolute `hooksPath` as something to fix
**What goes wrong:** A planner sees `core.hooksPath = D:\claude\Autopilot\.git\hooks` (an absolute Windows path) and assumes it diverges from "the default" and needs correcting or documenting as a portability risk.
**Why it happens:** The value looks unusual compared to the conventional relative `.git/hooks`.
**How to avoid:** `.git/config` is per-clone and is never committed or cloned — a fresh clone starts with no `core.hooksPath` override at all, and git's built-in default (`.git/hooks`, relative to the new clone's own `.git` directory) applies automatically. This machine's absolute-path setting is local-only and irrelevant to portability. D-08 is correct as written: "no `core.hooksPath` change" needed.
**Warning signs:** A plan task that tries to `git config core.hooksPath .git/hooks` "to fix" the current value — this is a no-op that adds churn to `.git/config` (itself untracked) for no behavioral effect.

### Pitfall 2: Confusing `f8750c6d` (a commit SHA) for a blob hash
**What goes wrong:** Verifying "the bundle's hash is `f8750c6d`" against `git hash-object` or `git rev-parse HEAD:path` (both blob-hash operations) and finding a mismatch (`1f59b380…`), then flagging D-09 as wrong.
**Why it happens:** CONTEXT.md's phrasing `(1,701,557 bytes, f8750c6d, inside master's 11 unpushed commits)` reads ambiguously out of context.
**How to avoid:** `f8750c6d` is the **commit** that added the bundle (`feat(154-01): preserve scratch corpus via bundle and permanent refs`), confirmed via `git log --oneline -- <path>`. There is no discrepancy — do not "correct" this figure.
**Warning signs:** A plan task computing `git hash-object` and comparing it to `f8750c6d` expecting a match.

### Pitfall 3: Copying a stale ahead-count or LF/CRLF count from CONTEXT.md verbatim
**What goes wrong:** Using CONTEXT's "179 commits ahead" or "3,177 LF blobs" figures directly in a committed plan or evidence file.
**Why it happens:** These are exactly the numbers D-65 (measurement discipline) anticipates drifting — ordinary commits continue to land on the branch between context-gathering and plan authoring.
**How to avoid:** This session's re-measurement already shows drift (+3 commits ahead, +2 tracked LF files) purely from the two most recent commits (`daaa1076`, `18268912`, `ffcb3eb6`) landing after CONTEXT.md was authored. Re-run `git rev-list --count master..HEAD` and `git ls-files --eol | grep -c 'i/lf'` at the start of Plan 159-01, not before.
**Warning signs:** A plan or evidence file citing "179" or "3,177" without its own fresh command output beside it.

### Pitfall 4: Assuming `MILESTONE_CLOSE_SHAS` uses one const array per baseline generation
**What goes wrong:** Looking for a `const BASELINE_25 = [...]` array to diff against when building `BASELINE_26`.
**Why it happens:** The naming convention (`BASELINE_9`, `BASELINE_24`, `BASELINE_25`, `BASELINE_26`...) reads like a sequence of distinct arrays.
**How to avoid:** Confirmed this session — there is exactly **one** array, always named `const BASELINE_9` (9 hardcoded `[file, line]` coordinate pairs), positioned after a long comment history. Each "`BASELINE_NN` refreshed <date>" is a **journal-entry comment block** describing a refresh event, not a new array. `BASELINE_26`'s insertion is a new comment block placed immediately above `const BASELINE_9 = [` — a mid-file insertion, matching D-24 exactly.
**Warning signs:** A plan task that tries to `grep "const BASELINE_25"` and finds nothing, then concludes the file is broken.

### Pitfall 5: Running the full apex locally and interpreting a NESTED skip as a failure
**What goes wrong:** Running `check-phase-159.mjs` with `CHECK_PHASE_NESTED=1` set (as its own children would be invoked) and treating the AUDIT-HARNESS skip as an incomplete run.
**Why it happens:** `V-153-AUDIT-HARNESS`'s own code (confirmed this session) explicitly returns `{ pass: true, skipped: true, ... }` under `NESTED`, so a skip is a legitimate PASS-with-skip, not a gap — **except** for the new `V-159-HARN03` leg, which D-25 deliberately does NOT skip under NESTED ("a frozen harness has no evolved corpus to skip for").
**Warning signs:** A plan asserting "117/0/0" as the required outcome when the correct pre-`159-VERIFICATION.md`-existence reading is 116/0/1 (one leg legitimately SKIPPED — the archive-root-token resolver, per D-29), while V-159-HARN03 itself must show a real PASS, never a skip.

## Code Examples

### Subject-line pair discriminator (HARN-01 recovery method)
```bash
# Source: this session, pattern copied from frozen-at-close.mjs's own comment history
git log --all --format="%H|%s" | awk -F'|' '$2 ~ /v1\.21/ && $2 ~ /MILESTONE CLOSE/'
# => e129081e512decb469c6d66f61456c669a33173b|docs(153-14): v1.21 MILESTONE CLOSE — single close-gate commit, 58/58 requirements Validated
```
Regression-check the same pattern against v1.17–v1.20 before trusting the v1.21 result (all confirmed count=1 this session).

### Predecessor-surface census (D-63)
```bash
# Source: this session
git diff --name-only e129081e -- scripts/validation/
# => scripts/validation/check-phase-135.mjs
#    scripts/validation/check-prose-style.py
git diff --name-only e129081e -- .github/workflows/
# => (empty)
```
After Phase 159 lands, this same diff must additionally show exactly the files D-63 enumerates (`_lib/frozen-at-close.mjs`, `v1.21-milestone-audit.mjs`, `regenerate-supervision-pins.mjs`, `v1.22-milestone-audit.mjs`, `v1.22-audit-allowlist.json`, `check-phase-154..159.mjs`) and nothing else.

### Tree-equality assertion for the squash (D-03)
```bash
# Pattern for Plan 159-01, Task 2 (values must be re-measured live at execution time)
S=$(git commit-tree HEAD^{tree} -p master -F <msgfile>)
git update-ref refs/heads/master "$S"
git rev-parse refs/archive/v1.22-landing^{tree}   # recorded BEFORE the update-ref, from the pre-squash branch tip
git rev-parse master^{tree}                       # recorded AFTER — must be byte-equal to the line above
git status --porcelain                            # must be empty after `git checkout master`
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Live-HEAD reads inside a milestone-close-adjacent harness | Frozen-corpus reads via `createFrozenCorpusReader`/`withDocsAtClose` | Phase 153 (v1.20→v1.21 conversion) | v1.21's own harness is the last live-HEAD one; Phase 159 converts it, closing the debt class for good this milestone |
| `git log -S"<string>"` as sole proof a fix landed | Before/after occurrence-count comparison (`administrator guide` 0→42 while `admin guide` stays 19 — a `-S` blind spot for remove-here/add-there substitutions) | `.planning/REQUIREMENTS.md` D-02 amendment, Phase 158 | Directly informs how Phase 159 must confirm any of its own claimed fixes (leak scrub, needle transitions) |
| `pushRemote=no_push` git config as a push guard | Tracked `scripts/hooks/pre-push.sh`, manually installed per clone | D-08, this phase | The config-based guard was measured to NOT block an explicit `git push origin <branch>` — disproved, replaced |

**Deprecated/outdated:**
- The `pushRemote=no_push` config approach: measured to fail (an explicit `git push origin <branch>` still succeeded under it) — do not resurrect it even as a defense-in-depth layer; the pre-push hook is the sole guard.

## Planner Assumptions (flagged)

No unresolved open questions remain from this research pass — every question this session raised was settled by reading the relevant file directly (see the Verified Measurements table). Two items are flagged here because they require a decision *at execution time*, not because the underlying fact is unknown:

1. **`branching_strategy` config key.** Confirmed absent from `.planning/config.json` today (verified this session — the file has exactly 6 keys, none named `branching_strategy`). D-07 states it "is pinned to `none`… as a forward-looking guard for v1.23," which reads as a decision about a value to be *written*, not a pre-existing state. **Settling evidence:** re-read `.planning/config.json` immediately before Plan 159-01's hygiene commit; if still absent, add `"branching_strategy": "none"` inside the `workflow` object as part of that commit (it costs one line and D-01's justification for it — "a forward-looking guard for v1.23" — only holds if the key is actually written this phase).
2. **`actions/setup-python@v5`'s exact pinned minor version.** D-30 says "a pinned 3.x" without naming the minor. This session's local machine reports Python 3.13.5, and `ubuntu-latest`'s current default Python 3 is independently what GitHub's runner image ships (not verified against GitHub's own runner-image changelog in this session — that would require a live web fetch outside this repo). **Settling evidence:** either pin `3.13` to match this session's local reproduction exactly, or omit a `python-version` pin entirely and let `setup-python@v5` resolve `ubuntu-latest`'s default — the plan author should state which and why, since `check-phase-157.mjs`'s own spawn (`python3 …`) does not care about the minor version as long as `python3` resolves on PATH.

**RESOLVED (planner, 2026-09-08, at plan authoring):**

1. **`branching_strategy`** — resolved as **write it**. Re-confirmed absent this session (`.planning/config.json` holds exactly the six keys `research`, `_auto_chain_active`, `ui_safety_gate`, `ui_phase`, `use_worktrees`, `nyquist_validation` inside `workflow`, and no `branching_strategy`). Plan **159-01 Task 5** adds `"branching_strategy": "none"` inside the `workflow` object as part of the hygiene commit, with a `node -e` acceptance command asserting `config.workflow.branching_strategy === 'none'`. Rationale recorded in the plan: D-07's justification — a forward-looking guard for v1.23 — only holds if the key is actually written this phase.

2. **`actions/setup-python@v5` minor** — resolved as **pin `3.13`**. Plan **159-08 Task 2** adds the action with `python-version: '3.13'` to exactly the three jobs that transitively run `check-phase-157.mjs` (`linux-chain-ubuntu-latest`, `check-phase-157`, `check-phase-159`), asserted by two acceptance commands each requiring a count of exactly 3. Rationale recorded in the plan: 3.13 matches the interpreter the Axis-1 fresh-clone reproduction runs on the authoring machine (3.13.5), so the cross-OS axis and the fresh-clone axis exercise the same minor rather than whichever the runner image happens to ship that week. The rejected alternative — omitting the pin and taking the runner default — is recorded in `159-EVIDENCE.md`, with the reason: D-30 requires an explicit pin for reproducibility, and an unpinned action makes that clause vacuous.

## Plan Skeleton Inputs

Thirteen sequential plans per D-27. For each: the files it edits or creates, the verify commands available today (or the pattern to build them from), and the `D-NN` decisions it must cite.

### 159-01 — Land on master (scrub, squash, archive ref and guard, `.gitattributes`, hygiene, amendments)
- **Files:** `assets/recipes/06-walk-up-avd-kiosk/NOTICE` (scrub edit), `158-VERIFICATION.md`/`158-SECURITY.md`/`WINDOWS.md` (annotate-and-supersede), `.gitattributes` (append line), `.planning/config.json` (add `branching_strategy`), `scripts/hooks/pre-push.sh` (NEW), `scripts/hooks/README.md` (edit, add install block), `.claude/skills/jira-milestone/install-jira-milestone-hook.cjs` (commit untracked, re-encode `HOOK_B64`), `154-PATTERNS.md` (commit untracked), `.gitignore` (add `.planning/state.json`, `.obsidian/`, `.playwright-mcp/`, `.gsd/`, `.agents/`, `skills-lock.json`), `.planning/REQUIREMENTS.md`/`ROADMAP.md` (5 amendment blocks, D-51), refs: `refs/archive/v1.22-landing` (create), `refs/heads/v1.22/154-style-landing` (delete after archival).
- **Verify commands today:** `git grep -c "<SCRUBBED-9CHAR-TOKEN>"` (must be 1 pre-scrub, 0 post-scrub across all 5 D-06 surfaces); `git rev-parse master^{tree}` vs `refs/archive/v1.22-landing^{tree}` (must match, D-03); `git status --porcelain` (empty post-checkout); `node scripts/validation/check-phase-54.mjs && check-phase-55.mjs && check-phase-56.mjs` (32/32/32 baseline, re-run after every planning-doc edit); three throwaway-clone pre-push tests (D-08).
- **Cites:** D-01–D-13, D-40–D-46, D-51–D-52, D-67, D-62.

### 159-02 — A0 pin (HARN-01, HARN-02)
- **Files:** `scripts/validation/_lib/frozen-at-close.mjs` (insert `V121` entry at line ~188, before `V14`; append `readAtV121Close` after line 261; append `lsTreeAtV121Close` after line 330).
- **Verify commands:** `node scripts/validation/check-phase-140.mjs` (V-140-V14PIN must PASS); `node scripts/validation/check-phase-120.mjs` (V-120-HYG01); `node scripts/validation/check-phase-73.mjs` (V-73-LIB-EXISTS); manual `readAtV121Close('docs/recipes/05-enterprise-update-plan.md')` / `lsTreeAtV121Close('docs')` smoke test (D-17).
- **Cites:** D-14, D-15, D-16, D-17.

### 159-03 — Fork + sidecar + BASELINE_26
- **Files:** `scripts/validation/v1.22-milestone-audit.mjs` (NEW, forked from `git show e129081e:scripts/validation/v1.21-milestone-audit.mjs`), `scripts/validation/v1.22-audit-allowlist.json` (NEW, header-fields-only copy of `v1.21-audit-allowlist.json`, byte-identical pins), `scripts/validation/regenerate-supervision-pins.mjs` (insert `BASELINE_26` comment block above `const BASELINE_9 = [` at line 587).
- **Verify commands:** `git hash-object` the fork against `git show e129081e:...` (byte-equality assertion before any edit); `node scripts/validation/regenerate-supervision-pins.mjs --self-test` (must exit 0).
- **Cites:** D-22, D-23, D-24.

### 159-04 — Convert v1.21 (HARN-03)
- **Files:** `scripts/validation/v1.21-milestone-audit.mjs` (whole-harness conversion: add `MILESTONE_TAG='V121'`, `SIDECAR_PATH`, `FROZEN` reader, convert `readFile`/`walkMd`/`parseAllowlist`, convert the C17 leg to `withDocsAtClose('V121', ...)` with `KNOWN_MEMBER = 'docs/recipes/05-enterprise-update-plan.md'`).
- **Verify commands:** `node scripts/validation/v1.21-milestone-audit.mjs --verbose` (16/16, now frozen); `node scripts/validation/v1.21-milestone-audit.mjs --self-test`; scratch-copy perturbation test (edit a pinned line in a scratch clone, converted harness must be unchanged — D-26).
- **Cites:** D-18, D-19, D-20, D-21, D-26.

### 159-05 — Leaves 154/155/156
- **Files:** `scripts/validation/check-phase-154.mjs`, `check-phase-155.mjs`, `check-phase-156.mjs` (NEW, per D-33/D-34/D-35 needle lists).
- **Verify commands:** `node scripts/validation/check-phase-135.mjs` (7/7, RECIPE content needles for the 155 leaf's dependency); `python3 scripts/docs-style/verify-meaning.py --self-test` (10/10, presence check for 154); scratch-copy fail-proof for every needle before committing (D-31's "proved failable" rule).
- **Cites:** D-31, D-32, D-33, D-34, D-35, D-39.

### 159-06 — Leaves 157/158
- **Files:** `scripts/validation/check-phase-157.mjs` (NEW, incl. the STD-02 python gate spawn), `check-phase-158.mjs` (NEW).
- **Verify commands:** `python3 scripts/validation/check-prose-style.py` (full run, exit 0, ~63–76s) and `--self-test` (`7 passed`); `node scripts/docs-style/audit-claimed-fixes.mjs --self-test` (4/4, ~1.5s).
- **Cites:** D-36, D-37, D-38, D-39.

### 159-07 — Apex
- **Files:** `scripts/validation/check-phase-159.mjs` (NEW, from `check-phase-153.mjs` template: `CHAIN_START=48`, `CHAIN_END=158`, `CHAIN_EXTRA=[30,31]`, `HARNESS='scripts/validation/v1.22-milestone-audit.mjs'`, `ARCHIVE_ROOT_TOKEN='v1.22-phases'`, resolver literal `'159-harn-harness-close'`, new `V-159-HARN03` leg not-NESTED-skipped).
- **Verify commands:** `node scripts/validation/check-phase-159.mjs --verbose` (116/0/1 before `159-VERIFICATION.md` exists, per D-29); leaves 154–158 must exist BEFORE this plan runs (HAZARD FIX 3, D-27 — a missing chain member is a hard FAIL, not a skip).
- **Cites:** D-25, D-27, D-29.

### 159-08 — Workflow
- **Files:** `.github/workflows/audit-harness-v1.22-integrity.yml` (NEW, 13 jobs: `parse`, `path-match`, `harness-run`, `linux-chain-ubuntu-latest`, `check-phase-154..159` (6 leaf/apex jobs — the 159 job IS the standalone apex, DUAL-APEX with `linux-chain`), `rotting-external-quarterly`, `pin-helper-advisory`, `frozen-read-probe`).
- **Verify commands:** `node scripts/validation/check-phase-139.mjs` (V-139-PROBEJOB and V-139-FETCHDEPTH must PASS against the new file — job literally named `frozen-read-probe:` at 2-space indent with no `needs:` key; every `actions/checkout@v4` step paired 1:1 with a `fetch-depth: 0`).
- **Cites:** D-30.

### 159-09 — Local evidence
- **Files:** `159-EVIDENCE.md` (NEW).
- **Verify commands:** the standalone harness/leaf/self-test run set from D-26 (before/after live/frozen v1.21 runs, v1.22 harness run, both self-tests, scratch perturbation, guard-firing negative tests).
- **Cites:** D-26.

### 159-10 — Push checkpoint
- **Files:** none (checkpoint-only plan; `git push origin master`).
- **Verify commands:** `git fetch`; `git rev-list --left-right --count origin/master...master` (re-run — this session shows `0  11`, expect this to change once the squash lands); the D-06 derived-token scan across all 5 surfaces.
- **Cites:** D-10, D-55.

### 159-11 — Corrective push + three axes + ruling
- **Files:** none directly (dispatches Axis-1/2/3, records results in `159-EVIDENCE.md`).
- **Verify commands:** Axis-1 fresh clone (`git clone <origin-url>`, NOT `file://` of the local repo — confirmed this session that a local `file://` clone would instead fetch the archived landing ref); Axis-2 `ls .github/workflows/*.yml` at dispatch time (this session: `ls .github/workflows/ | grep audit-harness` returns 18 files pre-159 — confirming D-51's corrected "18 workflow files exist" reading — expect 19 after 159-08 lands, the 19th CI coexistence workflow per D-51's ordinal correction) then `gh workflow run` / `gh run list` per workflow; Axis-3 `claude -p "<9 legs' commands>" --output-format text </dev/null` from a cwd outside the repo (confirmed on PATH: `C:\Users\joanderson\.local\bin\claude.exe`, version 2.1.265).
- **Cites:** D-47, D-48, D-49, D-50, D-56.

### 159-12 — Close artifacts
- **Files:** `v1.22-MILESTONE-AUDIT.md` (NEW), `v1.22-DEFERRED-CLEANUP.md` (NEW).
- **Verify commands:** `node scripts/validation/check-phase-54.mjs`/`55`/`56` after committing (32/32/32 baseline, confirmed still holding this session).
- **Cites:** D-58, D-59, D-60, D-61.

### 159-13 — Close-gate checkpoint, single close-gate commit, post-gate apex
- **Files:** `.planning/REQUIREMENTS.md`, `ROADMAP.md`, `STATE.md`, `PROJECT.md` (hand-flip HARN-05/HARN-06 inside this single commit, per D-28's "harness-owned flip is a proven no-op" requirement).
- **Verify commands:** `node scripts/validation/check-phase-159.mjs --verbose` (post-gate re-run, now with `159-VERIFICATION.md` present); `git diff --stat 2c917435.. -- docs/ scripts/pipeline/` (empty, D-44 — build-tree resolved this session); `dist/docs-library-v1.22.zip` presence (confirmed exists, 4,105,804 bytes).
- **Cites:** D-12, D-13, D-28, D-44, D-57, D-62.

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | All `check-phase-*.mjs`/`vX.Y-milestone-audit.mjs` scripts, `execFileSync` spawns | ✓ | v24.17.0 (local); CI pins node 20 via `actions/setup-node@v4` | — |
| Python 3 | `check-prose-style.py`, the STD-02 gate | ✓ | 3.13.5 (local `python3` and `python`) | — |
| git | plumbing squash, all frozen-read operations, hooks | ✓ | 2.51.0.windows.2 | — |
| gh CLI | Axis-2 dispatch (`gh workflow run`) | ✓ | 2.81.0 | — |
| claude CLI | Axis-3 fresh sub-agent dispatch (`claude -p`) | ✓ | 2.1.265, at `C:\Users\joanderson\.local\bin\claude.exe` | — |
| `actions/setup-python@v5` | New 20th CI workflow's python-dependent jobs | Not yet used anywhere in `.github/workflows/` (confirmed via grep this session) — this is new infrastructure for this phase, not a pre-existing dependency | v5 pin, needs a `python-version` decision (see Planner Assumptions #2) | — |

**Missing dependencies with no fallback:** none.

**Missing dependencies with fallback:** none — every tool this phase needs is already present in this environment; `actions/setup-python@v5` is new *workflow content* to author, not a missing local tool (GitHub's runners provide Python regardless of the pin).

## Sources

### Primary (HIGH confidence — read directly this session)
- `scripts/validation/_lib/frozen-at-close.mjs` (full read, lines 1–570) — `MILESTONE_CLOSE_SHAS`, `readAtClose`/`lsTreeAtClose`, `createFrozenCorpusReader`, `materializeDocsAtClose`, `withDocsAtClose`
- `scripts/validation/v1.21-milestone-audit.mjs` (header, readFile/existsSync grep, C17 leg lines 820–870) — confirmed unconverted, live-HEAD
- `scripts/validation/v1.20-milestone-audit.mjs` (lines 1–91, 820–895) — the converted twin used as the copy template
- `scripts/validation/check-phase-140.mjs` (lines 1–145) — `V-140-V14PIN` verbatim
- `scripts/validation/check-phase-120.mjs`, `check-phase-73.mjs` — `V-120-HYG01`, `V-73-LIB-EXISTS` verbatim
- `scripts/validation/check-phase-153.mjs` (lines 1–374) — apex template, `CHAIN_START`/`CHAIN_END`/`ARCHIVE_ROOT_TOKEN`/AUDIT-HARNESS/SELF legs
- `scripts/validation/check-phase-144.mjs` — arithmetic cross-check
- `scripts/validation/check-phase-139.mjs` — `V-139-PROBEJOB`/`V-139-FETCHDEPTH` verbatim
- `scripts/validation/check-phase-145.mjs` — floor guard, `presence()` helper
- `scripts/validation/check-phase-143.mjs` — ENOENT/127 spawn classifier
- `scripts/validation/check-phase-135.mjs` — RECIPE content needles
- `scripts/validation/regenerate-supervision-pins.mjs` (lines 525–595) — `BASELINE_9`/journal comments
- `.github/workflows/audit-harness-v1.21-integrity.yml` (full job enumeration, header comments) — 16-job structure, DUAL-APEX/CARVE-1/ADVISORY-NON-EVIDENCE annotations
- `scripts/hooks/README.md` — pre-commit precedent, "Why Not Husky"
- `.claude/hooks/jira-milestone-gate.cjs` (lines 1–79) — Jira sync mechanics
- `.planning/STATE.md`, `.planning/config.json`, `.planning/REQUIREMENTS.md`, `.planning/ROADMAP.md` (Phase 159 block)
- `.planning/phases/158-final-corpus-verification-publish-bundle/158-VERIFICATION.md` (line 97) — the leak, verbatim
- `.planning/phases/159-harn-harness-close/159-CONTEXT.md` (full, all 242 lines), `159-DISCUSSION-LOG.md` (excerpt)
- Live git commands: `git log`, `git diff`, `git show`, `git ls-tree`, `git cat-file`, `git rev-list`, `git rev-parse`, `git ls-files --eol`, `git worktree list`, `git branch -a`, `git config --get-all`, `git grep` — all read-only, all this session

### Secondary (MEDIUM confidence)
- None — no external documentation lookups were needed for this phase; it is entirely internal repository mechanics.

### Tertiary (LOW confidence)
- GitHub Actions `ubuntu-latest`'s exact default Python 3 minor version was not independently verified via GitHub's runner-image documentation this session (flagged in Planner Assumptions #2 rather than stated as fact).

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — no new dependencies; every pattern copied verbatim from files read this session
- Architecture: HIGH — insertion points, apex arithmetic, and workflow job structure all independently re-derived from source, not copied from CONTEXT.md prose
- Pitfalls: HIGH — each pitfall traces to a specific verified-vs-claimed discrepancy or a file read that resolved a potential misreading

**Research date:** 2026-09-08
**Valid until:** This phase is the terminal phase of v1.22 and is expected to execute within days of this research — treat any figure in the "Verified Measurements" table as stale after the next commit lands on this branch, per D-65's measurement-discipline rule, not after a fixed calendar window.
