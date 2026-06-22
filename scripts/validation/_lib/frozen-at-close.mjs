// scripts/validation/_lib/frozen-at-close.mjs
//
// Centralized frozen-aware readers for chain validators (Phase 73 onward).
//
// HYBRID STATUS:
//   - NEW helpers (Phase 73 onward) consume readers from this module.
//   - EXISTING inline helpers in check-phase-{61, 67, 68, 70}.mjs REMAIN INLINE.
//     Refactor deferred to v1.9+ as FROZEN-AWARE-ADOPTION-SWEEP-01 per
//     `.planning/milestones/v1.8-DEFERRED-CLEANUP.md` (Phase 74 HARNESS-12 finalizes).
//
// Lineage: parallel to inline readRequirementsAtV15Close() introduced
// Plan 68-03 Task 1 commit d7d7d5f + readCorpusFileAtV17Close() introduced
// Plan 70-02 Atom 1 commit 26a1ae9; centralized per D-02 LOCKED Option C.

import { execFileSync } from 'node:child_process';

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
  return execFileSync('git', ['show', sha + ':' + relPath], {
    encoding: 'utf8',
    timeout: 10000,
    stdio: ['ignore', 'pipe', 'pipe'],
  }).replace(/\r\n/g, '\n');
}

// Convenience exports for readability at call-sites
export const readAtV141Close      = (p) => readAtClose('V141',         p);
export const readAtV15Close       = (p) => readAtClose('V15',          p);
export const readAtV16Close       = (p) => readAtClose('V16',          p);
export const readAtV17Close       = (p) => readAtClose('V17',          p);
export const readAtV17CloseGate   = (p) => readAtClose('V17_CLOSEGATE', p);
export const readAtV18Close       = (p) => readAtClose('V18',          p);
