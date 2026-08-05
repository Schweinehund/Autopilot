// scripts/validation/_lib/frozen-at-close.mjs
//
// Centralized frozen-aware readers for chain validators (Phase 73 onward).
//
// STATUS (corrected v1.16 Phase 120 HYG-01 — see .planning/REQUIREMENTS.md HYG-01):
//   - check-phase-{67, 68, 70}.mjs consume this module's readers: their local read helpers
//     (readCorpusFileAtV17Close, readMilestonesAtV17Close, etc.) are thin wrappers that
//     delegate to readAtV17Close here. The raw git-show read duplication in those three files
//     was centralized here by v1.14 Phase 111 ("Pillar D — Chain Validator Tooling Refactors").
//   - check-phase-61.mjs is a deliberate exception: it keeps a genuinely inline reader
//     (readAtV15CloseFor61, hardcoded v1.5-close SHA ba2cbc0) for its REQUIREMENTS/ROADMAP
//     reads — that inline reader's presence is asserted by check-phase-68 (V-68), so it is
//     pinned in place — and consumes this module's readAtV15Close only for its MILESTONES.md reads.
//   - The prior header's blanket "all four keep their helpers inline" claim was stale: 67/68/70
//     were centralized in Phase 111; only 61 stays intentionally inline. The lines above record
//     the actual per-file state.
//   - FROZEN-AWARE-ADOPTION-SWEEP-01 (the broader sweep beyond these four files) remains a
//     separate, still-deferred item — see `.planning/milestones/v1.8-DEFERRED-CLEANUP.md`
//     and the v1.16 Future Requirements section (durable tooling debt).
//
// Lineage: parallel to inline readRequirementsAtV15Close() introduced
// Plan 68-03 Task 1 commit d7d7d5f + readCorpusFileAtV17Close() introduced
// Plan 70-02 Atom 1 commit 26a1ae9; readers centralized into this module per D-02 LOCKED
// Option C, adopted by check-phase-{67,68,70} in v1.14 Phase 111 (check-phase-61 excepted).

import { execFileSync } from 'node:child_process';

// SWEEP-04 (v1.20 Phase 139 Plan 02, D-28/D-29): typed frozen-read cause classifier, shared by
// both readAtClose and lsTreeAtClose. Two properties of this taxonomy must be recorded, not
// assumed away by a later reader:
//   - Classification is WORKTREE-DEPENDENT: the identical call classifies differently in a
//     clean checkout (unreachable-sha inside a shallow clone) versus one where the target path
//     was deleted from disk but is still reachable at the frozen SHA (absent-path never fires).
//   - The taxonomy works today only because every entry in MILESTONE_CLOSE_SHAS below is a
//     7-8 character ABBREVIATED SHA. A future full-length (40-char) pin changes git's stderr
//     wording for the unreachable-sha case; do not assume abbreviation is permanent.
const SUBPROCESS_MAX_BUFFER = 20 * 1024 * 1024; // mirrors check-phase-138.mjs's SUBPROCESS_MAX_BUFFER; a full-tree `-r` already emits ~203 KB, so Node's 1 MB default maxBuffer must not be relied on.

/**
 * Classify a git-command failure into a typed cause, using a SIX-pattern union across two
 * classes (D-28). Coerces both `stderr` and `message` to strings before matching so a Buffer
 * stderr cannot silently fall through to `other`.
 *
 * @param {Error & { stderr?: unknown }} err
 * @returns {'unreachable-sha' | 'absent-path' | 'other'}
 */
export function frozenCause(err) {
  const text = String(err?.stderr ?? '') + String(err?.message ?? '');
  if (
    text.includes('invalid object name') ||
    text.includes('Not a valid object name') ||
    text.includes('not a tree object')
  ) {
    return 'unreachable-sha';
  }
  if (
    text.includes('does not exist in') ||
    text.includes('exists on disk, but not in')
  ) {
    return 'absent-path';
  }
  return 'other';
}

export const MILESTONE_CLOSE_SHAS = {
  V141: '5c976ec',  // Phase 47 close 2026-04-25 (D-04 advisor empirical discovery)
  V15:  'ba2cbc0',  // Phase 61 close — canonical (matches inline helper in check-phase-61.mjs:40)
  V16:  '9d8877c',  // Phase 66 close 2026-05-25 (D-04 advisor empirical discovery; v1.6 has NO git tag)
  V17:  'aa6de68',  // Phase 70 Plan 70-02 Atom 1 — canonical (matches inline helpers in check-phase-67/68/70.mjs)
  V17_CLOSEGATE: '4df3a16',  // Phase 70 Plan 70-05 Commit B — true v1.7 milestone close-gate (HARNESS-06 +
                              // 4-doc traceability closure); added by Plan 73-02 RETRO-02 to fix V-70-24
                              // (PROJECT.md 12/12 v1.7 reqs only present at Commit B, not at aa6de68 Atom 2).
  V18:  '2bd79d8',  // Phase 74 Plan 74-05 — v1.8 milestone close-gate (docs(74-05); 4-doc traceability
                    // + v1.8 MILESTONE-AUDIT NEW + DEFERRED-CLEANUP finalize). Single entry per D-04
                    // (v1.8 closed in ONE commit so atom == close-gate; no separate V18_CLOSEGATE).
  V19:  'b29dca5',  // Phase 82 Plan 82-04 — v1.9 milestone close-gate (docs(82-04); 4-doc traceability
                    // + v1.9 MILESTONE-AUDIT NEW + DEFERRED-CLEANUP). Single entry (v1.9 closed in ONE
                    // commit; atom == close-gate; no separate V19_CLOSEGATE).
  V110: 'a3617e9',  // Phase 88 Plan 88-04 — v1.10 milestone close-gate (docs(88-04); 4-doc traceability
                    // + v1.10 MILESTONE-AUDIT NEW + DEFERRED-CLEANUP). Single entry (v1.10 closed in ONE
                    // commit; atom == close-gate; no separate V110_CLOSEGATE).
  V111: '919b23b',  // Phase 93 Plan 93-04 — v1.11 milestone close-gate (docs(93-04); 4-doc traceability
                    // + v1.11 MILESTONE-AUDIT NEW + DEFERRED-CLEANUP). Single entry (v1.11 closed in ONE
                    // commit; atom == close-gate; no separate V111_CLOSEGATE).
  V112: '12f2c7b',  // Phase 95 Plan 95-04 close-gate — v1.12 milestone close-gate (docs(95-04);
                    // 4-doc traceability + v1.12 MILESTONE-AUDIT NEW + DEFERRED-CLEANUP finalize).
                    // Single entry (v1.12 closed in ONE commit; atom == close-gate;
                    // no separate closegate entry — V18/V19/V110/V111 single-entry pattern applies).
  V113: 'ba24f1a',  // Phase 100 Plan 100-04 close-gate — v1.13 milestone close-gate (docs(100-04);
                    // 4-doc traceability + v1.13 MILESTONE-AUDIT NEW + DEFERRED-CLEANUP finalize).
                    // Single entry (v1.13 closed in ONE commit; atom == close-gate;
                    // no separate closegate entry — V18/V19/V110/V111/V112 single-entry pattern applies).
  V114: '7d922a7',  // Phase 112 Plan 112-05 close-gate — v1.14 milestone close-gate; atom == close-gate.
                    // Message contains both "MILESTONE-AUDIT" and "MILESTONE CLOSE" (confirmed via
                    // `git log -1 --format=%s 7d922a7`). Do NOT pin f3959c8 (the ambiguous SUMMARY-plan
                    // follow-up). Single entry — same single-entry pattern as V18..V113 (back-anchor
                    // invariant: V114 references a PAST close SHA; the next milestone pin is deferred to
                    // v1.16 per the back-anchor rule — this phase adds only the v1.14 close pin).
  V115: '29a3599',  // Phase 119 Plan 119-07 close-gate — v1.15 milestone close-gate; atom == close-gate.
                    // Message contains both "MILESTONE-AUDIT" and "MILESTONE CLOSE" (confirmed via
                    // `git log -1 --format=%s 29a3599`). Do NOT pin a SUMMARY follow-up (the V114
                    // f3959c8 trap). Single entry — same single-entry pattern as V18..V114 (back-anchor
                    // invariant: V115 references a PAST close SHA; the V116 pin is deferred to v1.17 per
                    // the back-anchor rule — this phase adds only the v1.15 close pin).
  V116: '3dd2512',  // Phase 125 Plan 125-07 close-gate — v1.16 milestone close-gate; atom == close-gate.
                    // Message contains both "MILESTONE-AUDIT" and "MILESTONE CLOSE" (confirmed via
                    // `git log --all --grep="MILESTONE-AUDIT" --grep="MILESTONE CLOSE" --all-match -1
                    // --format=%H` -> 3dd251249a812e31147cd653a7ad01e6878c091b, subject: "docs(125-07):
                    // Phase 125 close-gate — v1.16 MILESTONE-AUDIT + DEFERRED-CLEANUP + 4-doc traceability +
                    // apex-range correction + v1.16 MILESTONE CLOSE"). Single entry — same single-entry
                    // pattern as V18..V115 (back-anchor invariant: V116 references a PAST close SHA; the
                    // V117 pin is deferred to v1.18 per the back-anchor rule).
  V117: 'b56bba5',  // Phase 128 Plan 128-07 close-gate — v1.17 milestone close-gate; atom == close-gate.
                    // Message contains both "MILESTONE-AUDIT" and "MILESTONE CLOSE" (confirmed via
                    // `git log --all --grep="MILESTONE-AUDIT" --grep="MILESTONE CLOSE" --all-match -1
                    // --format=%H` -> b56bba5ea19f9b3fea6376a48dcc24f4ea1d3428, subject: "docs(128-07):
                    // v1.17 MILESTONE-AUDIT + DEFERRED-CLEANUP + 10-req traceability + v1.17 MILESTONE
                    // CLOSE"). Single entry — same single-entry pattern as V18..V116 (back-anchor
                    // invariant: V117 references a PAST close SHA; the V118 pin is deferred to v1.19 per
                    // the back-anchor rule).
  V118: '7af8a147',  // Phase 134 Plan 134-05 close-gate — v1.18 milestone close-gate; atom == close-gate.
                    // Message contains both "v1.18" and "MILESTONE CLOSE" — the naive dual-token
                    // `--grep --all-match -1` form is BARRED here: it returns 2 candidates (also matches
                    // the v1.17 close-gate b56bba5e), so recovery used the SUBJECT-LINE pair discriminator
                    // instead (confirmed via `git log --all --format="%H|%s" | awk -F'|' '$2 ~ /v1\.18/ &&
                    // $2 ~ /MILESTONE CLOSE/'` -> count=1 -> 7af8a14766d346a348f7adf05d260676dbe4c1b2,
                    // subject: "docs(134-05): v1.18 MILESTONE CLOSE — single close-gate commit, 20/20
                    // requirements Validated"). Single entry — same single-entry pattern as V18..V117
                    // (back-anchor invariant: V118 references a PAST close SHA; the V119 pin is deferred
                    // to the v1.20 close per the back-anchor rule).
  // V14 omitted — RETRO-01 must surface a v1.4-close-state assertion in check-phase-{48..66}.mjs
  // before adding (v1.4 close was Phase 42, predating chain validators).
  // Candidates if needed: b5cf529 or 671f72a (D-02 advisor pre-scan).
};

/**
 * Read a file at a frozen milestone-close SHA via `git show <SHA>:<path>`.
 * Hardened signature (v1.7-family pattern): explicit stdio, CRLF normalization.
 *
 * @param {keyof MILESTONE_CLOSE_SHAS} milestoneTag — e.g., 'V15', 'V16', 'V17', 'V141'
 * @param {string} relPath — repo-relative path (e.g., '.planning/REQUIREMENTS.md')
 * @returns {string} file contents at frozen SHA, LF line endings
 * @throws if milestoneTag missing or git show fails
 */
export function readAtClose(milestoneTag, relPath) {
  const sha = MILESTONE_CLOSE_SHAS[milestoneTag];
  if (!sha) throw new Error(`No frozen SHA for milestone ${milestoneTag}`);
  try {
    return execFileSync('git', ['show', sha + ':' + relPath], {
      encoding: 'utf8',
      timeout: 10000,
      stdio: ['ignore', 'pipe', 'pipe'],
    }).replace(/\r\n/g, '\n');
  } catch (err) {
    // D-27/D-28: enrichment, not a swallow -- the cause is prepended to the FRONT of the
    // message (check-phase-60.mjs:247 truncates detail strings at 500 chars, so an appended
    // cause would be silently cut off) and the error always rethrows.
    const cause = frozenCause(err);
    err.frozenCause = cause;
    err.message = `[${cause}] ${err.message}`;
    throw err;
  }
}

// Convenience exports for readability at call-sites
export const readAtV141Close      = (p) => readAtClose('V141',         p);
export const readAtV15Close       = (p) => readAtClose('V15',          p);
export const readAtV16Close       = (p) => readAtClose('V16',          p);
export const readAtV17Close       = (p) => readAtClose('V17',          p);
export const readAtV17CloseGate   = (p) => readAtClose('V17_CLOSEGATE', p);
export const readAtV18Close       = (p) => readAtClose('V18',          p);
export const readAtV19Close       = (p) => readAtClose('V19',          p);
export const readAtV110Close      = (p) => readAtClose('V110',         p);
export const readAtV111Close      = (p) => readAtClose('V111',         p);
export const readAtV112Close      = (p) => readAtClose('V112',         p);
export const readAtV113Close      = (p) => readAtClose('V113',         p);
export const readAtV114Close      = (p) => readAtClose('V114',         p);
export const readAtV115Close      = (p) => readAtClose('V115',         p);
export const readAtV116Close      = (p) => readAtClose('V116',         p);
export const readAtV117Close      = (p) => readAtClose('V117',         p);
export const readAtV118Close      = (p) => readAtClose('V118',         p);

/**
 * Enumerate repo-relative file paths under `dirPrefix` at a frozen milestone-close SHA, via
 * `git ls-tree -r -z --name-only <sha> -- <dirPrefix>` (D-34..D-38). Reuses the same
 * MILESTONE_CLOSE_SHAS pin gate as readAtClose verbatim -- there is deliberately NO raw-SHA
 * form, which would bypass the gate that is this module's entire governance value.
 *
 * NOT a drop-in replacement for `walkMd` (scripts/validation/v1.5-milestone-audit.mjs:50-66):
 * walkMd returns ABSOLUTE paths and applies its own `.md` filter internally; lsTreeAtClose
 * returns REPO-RELATIVE paths and applies `ext` only when the caller explicitly supplies it
 * (D-35) -- every Phase-140 call-site conversion must also strip its `relNormalize` wrapper.
 *
 * Error semantics (D-36): throws on ANY git failure, with a typed `err.frozenCause` attached
 * exactly as in readAtClose. Returns `[]` ONLY when git exits 0 with empty stdout (a
 * valid-but-empty prefix) -- returning `[]` on failure is forbidden, because a shallow CI job
 * would then enumerate zero files, pass every per-file assertion vacuously, and report green
 * while auditing nothing (SWEEP-04 prohibition).
 *
 * @param {keyof MILESTONE_CLOSE_SHAS} milestoneTag
 * @param {string} dirPrefix - repo-relative directory prefix (e.g. 'docs/l1-runbooks')
 * @param {{ ext?: string }} [opts] - optional extension filter (e.g. { ext: '.md' })
 * @returns {string[]} repo-relative paths
 * @throws if milestoneTag is unpinned, or on any git ls-tree failure
 */
export function lsTreeAtClose(milestoneTag, dirPrefix, { ext } = {}) {
  const sha = MILESTONE_CLOSE_SHAS[milestoneTag];
  if (!sha) throw new Error(`No frozen SHA for milestone ${milestoneTag}`);
  let stdout;
  try {
    stdout = execFileSync('git', ['ls-tree', '-r', '-z', '--name-only', sha, '--', dirPrefix], {
      encoding: 'utf8',
      timeout: 10000,
      stdio: ['ignore', 'pipe', 'pipe'],
      cwd: process.cwd(),
      maxBuffer: SUBPROCESS_MAX_BUFFER,
    });
  } catch (err) {
    const cause = frozenCause(err);
    err.frozenCause = cause;
    err.message = `[${cause}] ${err.message}`;
    throw err;
  }
  // -z NUL-TERMINATES the final entry too (not just delimits between entries) -- a naive
  // split('\0') therefore yields a phantom trailing empty element. .filter(Boolean) is
  // mandatory, not an implementer choice (D-37): without it, a 34-entry tree reports 35.
  let paths = stdout.split('\0').filter(Boolean);
  if (ext) paths = paths.filter((p) => p.endsWith(ext));
  return paths;
}

// Per-milestone convenience exports mirroring the readAtVxxClose pattern above (D-34).
export const lsTreeAtV141Close      = (dir, opts) => lsTreeAtClose('V141',          dir, opts);
export const lsTreeAtV15Close       = (dir, opts) => lsTreeAtClose('V15',           dir, opts);
export const lsTreeAtV16Close       = (dir, opts) => lsTreeAtClose('V16',           dir, opts);
export const lsTreeAtV17Close       = (dir, opts) => lsTreeAtClose('V17',           dir, opts);
export const lsTreeAtV17CloseGate   = (dir, opts) => lsTreeAtClose('V17_CLOSEGATE', dir, opts);
export const lsTreeAtV18Close       = (dir, opts) => lsTreeAtClose('V18',           dir, opts);
export const lsTreeAtV19Close       = (dir, opts) => lsTreeAtClose('V19',           dir, opts);
export const lsTreeAtV110Close      = (dir, opts) => lsTreeAtClose('V110',          dir, opts);
export const lsTreeAtV111Close      = (dir, opts) => lsTreeAtClose('V111',          dir, opts);
export const lsTreeAtV112Close      = (dir, opts) => lsTreeAtClose('V112',          dir, opts);
export const lsTreeAtV113Close      = (dir, opts) => lsTreeAtClose('V113',          dir, opts);
export const lsTreeAtV114Close      = (dir, opts) => lsTreeAtClose('V114',          dir, opts);
export const lsTreeAtV115Close      = (dir, opts) => lsTreeAtClose('V115',          dir, opts);
export const lsTreeAtV116Close      = (dir, opts) => lsTreeAtClose('V116',          dir, opts);
export const lsTreeAtV117Close      = (dir, opts) => lsTreeAtClose('V117',          dir, opts);
export const lsTreeAtV118Close      = (dir, opts) => lsTreeAtClose('V118',          dir, opts);
