// scripts/validation/_lib/archive-path.mjs
// Resolves a phase artifact path that may live at either:
//   - .planning/phases/PHASEDIR/FILENAME           (live, pre-archival)
//   - .planning/milestones/<MILESTONE>/PHASEDIR/FILENAME  (archived at milestone close)
//
// Returns the resolved relative path (string) or null if neither exists.
// CALLER OWNS FAIL SEMANTICS — this helper does not throw and does not swallow.
//
// Lineage: introduced Phase 68 CHAIN-02 per REQUIREMENTS.md:20
//   handles BOTH pre-archival path AND post-archival path
//
// Backward-compatible single-arg form: defaults to ['v1.5-phases'] (CONTEXT D-02 locked).
// Callers needing v1.6-archived resolution pass milestoneRoots = ['v1.6-phases'] explicitly
// (e.g., check-phase-62.mjs + check-phase-63.mjs ANCHOR_INVENTORY consts).

import { existsSync } from 'node:fs';
import { join } from 'node:path';

export function resolveArchivedPhasePath(phaseSuffix, milestoneRoots = ['v1.5-phases']) {
  const live = '.planning/phases/' + phaseSuffix;
  if (existsSync(join(process.cwd(), live))) return live;
  for (const root of milestoneRoots) {
    const archived = '.planning/milestones/' + root + '/' + phaseSuffix;
    if (existsSync(join(process.cwd(), archived))) return archived;
  }
  return null;
}
