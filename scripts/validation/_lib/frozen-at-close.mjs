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
export const readAtV19Close       = (p) => readAtClose('V19',          p);
export const readAtV110Close      = (p) => readAtClose('V110',         p);
export const readAtV111Close      = (p) => readAtClose('V111',         p);
export const readAtV112Close      = (p) => readAtClose('V112',         p);
export const readAtV113Close      = (p) => readAtClose('V113',         p);
export const readAtV114Close      = (p) => readAtClose('V114',         p);
export const readAtV115Close      = (p) => readAtClose('V115',         p);
