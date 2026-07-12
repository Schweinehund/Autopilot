# Phase 126: Publish-Bundle Pipeline + Guard-Blocker Corpus Fixes - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-07-10
**Phase:** 126-publish-bundle-pipeline-guard-blocker-corpus-fixes
**Areas discussed:** Zip location & retention, Manifest format & contents, Batch conversion resilience, Corpus-fix & publish-set policy
**Method:** All four gray areas resolved via `/adversarial-review` (Finder → Adversary → Referee, Opus) at the owner's explicit request. Finder surfaced ~352 pts of risk across every option; Adversary disproved/downgraded ~90–95 pts with live-repo verification (incl. an empirical docx-determinism test); Referee ruled the winners. Owner locked all four and chose to chain into plan + execute.

---

## Zip location & retention

| Option | Description | Selected |
|--------|-------------|----------|
| Commit zip to git | `docs-library-v1.17.zip` tracked in the repo | |
| Gitignored build dir | Emit to `dist/`/`.pipeline-output/` (already gitignored), per-milestone versioned | ✓ |
| GitHub release asset | Attach to the `vX.Y` tag | |

**User's choice:** Gitignored build dir, per-milestone versioned filename.
**Notes:** Decisive fact — docx is provably non-deterministic (pandoc stamps wall-clock into `docProps/core.xml`), so a committed zip churns bytes every close and breaks the HARN byte-unchanged invariant (Phase 128). Repo is local-first (v1.6 tag missing, v1.16 close unpushed) → release-asset path is unreliable and misaligns with Phase 127's close-hook trigger.

---

## Manifest format & contents

| Option | Description | Selected |
|--------|-------------|----------|
| Markdown | Human-readable table in zip | |
| JSON | Machine-clean for parity assertion | |
| CSV | Tabular, diffable, never indexed | ✓ |

**User's choice:** CSV manifest — columns {RE-ID, output `.docx` filename, frontmatter status, last_verified}; exclude source-path + sha256; bundle a static MD upload-instructions README.
**Notes:** Connector indexes `.docx` only, so no manifest format risks citation-poisoning. Keying on output filename (PUB-04) not source path defuses the SC3-mapping risk. sha256 excluded — unstable due to docx non-determinism.

---

## Batch conversion resilience

| Option | Description | Selected |
|--------|-------------|----------|
| Sequential + always-full + collect-all-fail-closed | Regenerate + re-guard every doc; stage; atomic promote | ✓ |
| Incremental (only-changed) | Skip unchanged docs | |
| Parallel / fail-fast | Concurrency; abort on first failure | |

**User's choice:** Always-full rebuild, sequential, collect-all-failures then fail-closed with staging + atomic promote.
**Notes:** All incremental-detection signals broken here — mtime dies after HARN-10 `git clone --no-hardlinks`, content-hash unstable, skipped docx is stale/un-re-guarded (PUB-02/04 breach). Fix the `convert.ps1` `.tmp` leak (221 orphans/run).

---

## Corpus-fix & publish-set policy

| Option | Description | Selected |
|--------|-------------|----------|
| HYG-03 date source (a) per-file reformat commit date | git-log archaeology per file | |
| HYG-03 date source (b) single v1.17 date | one date for all | |
| HYG-03 date source (c) last_verified | file's own last_verified | ✓ (fallback only) |
| Verify-only / no-op | files already filled | ✓ (primary) |

**User's choice:** HYG-03 = idempotent verify-only over the 9 named files (already filled in commit `9031056`); backfill from `last_verified` only if a gap is found. NO corpus-wide `YYYY-MM-DD` gate. Publish set = registry Status:Approved (221) with recorded exclusion count; add a guard that fails on any registry-Approved-but-frontmatter-Draft row.
**Notes:** A naive "no YYYY-MM-DD in corpus" gate would corrupt 4 legit-content Approved docs (l2-runbooks/01,06 log-filename specs; admin-setup-android/03,08 MS date-format quotes) — Phase 122 already hand-carved these out of a grep gate. `last_verified` untouched (v1.15 D2/META-04). No live registry-vs-frontmatter divergence today (latent axis only).

## Claude's Discretion

- Orchestrator language/shape (`.mjs` driver vs `.ps1`), provided D-05/06/07 semantics hold and the pinned-pandoc guard runs.
- Whether to set `SOURCE_DATE_EPOCH` for docx reproducibility — nice-to-have, not load-bearing.
- Exact gitignored build-dir path (must be matched by an existing `.gitignore` glob).

## Deferred Ideas

- Bounded-concurrency conversion (later perf optimization over sequential default).
- `SOURCE_DATE_EPOCH` reproducible-docx pinning.
- Repair tag discipline / flush unpushed commits (only if release-asset delivery revisited).
- Automated milestone-close trigger → Phase 127 (HOOK-01).
- V116 pin + 15th Path-A lineage bump + terminal close → Phase 128 (HARN-08/09/10).
