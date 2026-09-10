---
phase: 158-final-corpus-verification-publish-bundle
plan: 04
subsystem: docs-style-tooling
tags: [judge-dispatch, claude-p, modal-loss-judgment, verify-meaning, judge-packets, independence]

# Dependency graph
requires:
  - phase: 158-final-corpus-verification-publish-bundle
    provides: plan 158-03's judge-packets.py before_region key and corrected no-anchor context window, which this plan's prompt enumerates and this plan's packets carry
provides:
  - "158-JUDGE-PROMPT.md: 156's prompt retitled, with the prose-style gate named first in an extended blocklist, the before_region key described, a multi-line fix definition, and the reword-not-reinstate rule for a non-preserved deletion verdict"
  - "One fresh, tool-disabled claude -p judge process dispatched against this phase's real 2-hunk packet, with raw output captured to a file before transcription"
  - "scripts/docs-style/_JUDGE-VERDICTS-158.json: two PRESERVED verdicts with per-packet hashes, the prompt hash, the base revision and the process exit code, no hardcoded phase-directory path"
  - "158-JUDGE-FINDINGS.md: explicit empty out-of-task result and the structural-blindness statement"
affects: [158-05, 158-06, 158-07]

# Actuals (#2632)
actuals:
  tokens: 4325
  tasks: 3
  commits: 2

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "claude -p dispatched with --tools \"\" (all tools disabled) and --add-dir pointed at an OS-temp working directory outside the repository, as the concrete mechanism for 'no tool authority over this repository' rather than relying on prompt instruction alone"
    - "Prompt + packet pre-assembled into one file on disk and piped to the judge process's standard input, replacing the prior phase's unexecuted command-substitution shell-string dispatch shape"

key-files:
  created:
    - .planning/phases/158-final-corpus-verification-publish-bundle/158-JUDGE-PROMPT.md
    - scripts/docs-style/_JUDGE-VERDICTS-158.json
    - .planning/phases/158-final-corpus-verification-publish-bundle/158-JUDGE-FINDINGS.md
  modified: []

key-decisions:
  - "The deliberate-deletion sentence (D-56) was placed between the byte-identical opening framing and the 'What you will be given' heading, not inside either protected section, so the acceptance criterion's byte-for-byte match on both sections holds exactly while still satisfying the one-sentence disclosure requirement."
  - "'One packet' in this phase's decisions (D-55/D-08) means one hunk-object in judge-packets.py's output list, not one dispatched file — the --chunk-file/--chunks 1 invocation emitted a single chunk file containing both hunks, so one claude -p process judged both, and the verdict record carries two per-hunk packet records (each hashed from its own re-serialized JSON object) inside that one dispatch."
  - "'--tools \"\"' (documented in this Claude Code build's own --help output) was used as the concrete mechanism for 'no tool authority over this repository', rather than a prompt-only instruction or a permission-mode flag not designed for this purpose."

requirements-completed: []

coverage:
  - id: D1
    description: "158-JUDGE-PROMPT.md is 156's prompt retitled, blocklist extended with the prose-style gate named first, before_region enumerated, multi-line fix definition, reword-not-reinstate rule, one deliberate-deletion sentence with no reasoning, no raw worklist number anywhere, committed before dispatch with three planning-tree validators green."
    requirement: null
    verification:
      - kind: other
        ref: "file existence + docstring-diff verification: opening framing (lines 1-9) and decision-procedure section byte-identical to 156's prompt apart from the title (python difflib comparison)"
        status: pass
      - kind: other
        ref: "python one-liner: blocklist and key enumeration contain all 9 required entries incl. before_region"
        status: pass
      - kind: other
        ref: "python one-liner: check-prose-style.py named before _DISPOSITIONS-158.tsv in the blocklist"
        status: pass
      - kind: other
        ref: "python regex: no bare Platform blockquote token; node check-phase-54/55/56.mjs all 32/32 passed"
        status: pass
    human_judgment: false
  - id: D2
    description: "Packets built with walk root docs at base d0b611e8 on a clean tracked tree with --chunk-file/--chunks 1; exactly 2 packets emitted; one fresh claude -p process (all tools disabled, cwd outside the repo) dispatched against the single pre-assembled prompt+packet file, exit code 0, non-empty raw output captured, no blocklisted source name in the output."
    requirement: null
    verification:
      - kind: other
        ref: "git status --porcelain --untracked-files=no empty before build; judge-packets.py --help shows both --chunk-file and --chunks"
        status: pass
      - kind: other
        ref: "packet file glob + json length check: 2 packets across 1 chunk file"
        status: pass
      - kind: other
        ref: "capture file size check: 1443 bytes, non-empty; process exit code 0"
        status: pass
      - kind: other
        ref: "grep-equivalent python check: no blocklisted source name (check-prose-style, _DISPOSITIONS-158, _JUDGE-VERDICTS-158, 158-FIX-AUDIT, 157-BASELINE) appears in captured output"
        status: pass
    human_judgment: false
  - id: D3
    description: "_JUDGE-VERDICTS-158.json carries the prompt hash, base revision, and two packet records (hash, verdict, evidence, exit code) transcribed verbatim from the capture file, with the recomputed prompt hash matching disk and no hardcoded phase-directory path; 158-JUDGE-FINDINGS.md states the structural-blindness limit and an explicit empty out-of-task result; prose-style gate exits 0 and the sweep remains idempotent since both verdicts were PRESERVED and no corpus reword landed."
    requirement: null
    verification:
      - kind: other
        ref: "python json field checks: prompt_sha256/base/packets present, len(packets)==2, each with packet_sha256/verdict/evidence/exit_code"
        status: pass
      - kind: other
        ref: "recomputed sha256 of the committed prompt file equals the recorded prompt_sha256"
        status: pass
      - kind: other
        ref: "regex check: no '.planning/phases/[0-9]' substring anywhere in the verdict record"
        status: pass
      - kind: other
        ref: "findings-narrative lowercase-substring checks: 'blind' present, and one of 'no defect'/'none'/'finding' present"
        status: pass
      - kind: other
        ref: "python scripts/validation/check-prose-style.py exit 0; sweep3.py docs re-run: 0 TOTAL edits; node check-phase-54/55/56.mjs all 32/32 passed"
        status: pass
    human_judgment: false

duration: 15min
completed: 2026-09-08
status: complete
---

# Phase 158 Plan 4: Fresh-Judge Modal-Loss Verdict on the Two Corpus-Wide Hunks Summary

**Retitled the 156 judge prompt with a prose-style-gate-first blocklist and dispatched one tool-disabled `claude -p` process against the corpus's real 2-hunk packet (base `d0b611e8`), which returned both PRESERVED with no out-of-task findings and no corpus reword needed.**

## Performance

- **Duration:** 15 min
- **Started:** 2026-09-08T06:40:00Z
- **Completed:** 2026-09-08T06:55:00Z
- **Tasks:** 3
- **Files modified:** 3 (all newly created)

## Accomplishments

- `.planning/phases/158-final-corpus-verification-publish-bundle/158-JUDGE-PROMPT.md` (commit `d085ceaa`): 156's judge prompt copied with its opening framing (lines 1-9) and decision-procedure section reused byte-for-byte apart from the title (verified by a `difflib` diff against the source file). Blocklist extended to name `scripts/validation/check-prose-style.py` **first** — its module docstring is the full HYG-02 rationale and states what the detection needles must read, so it is the strongest answer key in the set — followed by this phase's and phases 156/157's planning documents, both disposition tables, the verdict record, `158-FIX-AUDIT*`, `157-BASELINE.json`, and `.planning/REQUIREMENTS.md`/`ROADMAP.md`. The "What you will be given" section now describes `before_region` (every baseline line of the containing opcode block). The `fix` definition was widened to admit a multi-line replacement, and gained the reword-not-reinstate rule: a non-preserved verdict on a deletion must be fixed with a reworded replacement that keeps the expectation without reusing the original phrasing, never a verbatim reinstatement (reinstating `entry per ROADMAP)` would take the prose-style gate's class needle from 0 to 1 and drive the gate non-zero). One sentence states the deletion under judgment was deliberate, with no reasoning given. The raw worklist number appears nowhere in the file. Committed before any dispatch; sha256 `25a9b6c0606c81e64cbcdf95d75f0f655eacaf7e4ec48db21ed68aca1b281274`.
- Packet build and dispatch (Task 2, nothing committed): `judge-packets.py d0b611e8 docs --chunk-file <tmp-prefix> --chunks 1` on a clean tracked tree emitted exactly **2 packets** (both the `docs/operations/drift-migration/02-macos-drift-detection.md:116` and `03-ios-android-drift-detection.md:130` "will add the Drift Detection entry per ROADMAP)" deletions) into a single chunk file — the raw `verify-meaning.py d0b611e8` worklist count is **7**; the gap is the documented modal-bag filter (5 of the 7 kept their modal intact, D-08), not a discrepancy. The committed prompt and the one packet file were concatenated into a single assembled file under the OS temp directory and piped via stdin to one fresh `claude -p` process, run with `--tools ""` (all tools disabled) and `--add-dir` pointed at the OS temp directory, from a working directory outside the repository. Exit code `0`; raw stdout captured to a 1443-byte file before any transcription; grepped clean for every blocklisted source name.
- `scripts/docs-style/_JUDGE-VERDICTS-158.json` + `158-JUDGE-FINDINGS.md` (commit `404ba095`): both hunks transcribed verbatim from the capture file as `PRESERVED`, each with its own quoted `evidence`/`reason` and a per-hunk `packet_sha256` (computed by re-serializing each hunk object with `judge-packets.py`'s own `json.dumps(indent=1)` shape and hashing it). Top level carries `prompt_sha256` (recomputed match confirmed against the committed file on disk), `base`, the raw-worklist-vs-packet-count note, and the dispatch argument vector as `{cmd, args[]}` — never a shell string. No hardcoded phase-directory path anywhere in the file (the previous batch-10 sibling record's `dispatch_command` embedded one; not repeated here). Since every verdict was PRESERVED, no corpus reword was needed and none landed: `check-prose-style.py` exits 0 and `sweep3.py docs` re-run reports 0 TOTAL edits (idempotent). `158-JUDGE-FINDINGS.md` states the judge reported no out-of-task defects (its `subject_verb_agreement_breaks` list came back explicitly empty, not omitted) and carries the structural-blindness statement: this pass covers only the two modal-loss hunks and is blind to 157's added prose and to 158's own remediation text.

## Task Commits

Each task was committed atomically:

1. **Task 1: Author the judge prompt as the previous prompt's bytes with an extended blocklist** - `d085ceaa` (feat)
2. **Task 2: Build the packets and dispatch a fresh judge process with the raw output captured** - nothing committed (per plan instruction)
3. **Task 3: Transcribe the verdicts and state what the judge could not see** - `404ba095` (feat)

_Note: this plan is `type="execute"`, not TDD — no RED/GREEN/REFACTOR cycle applies._

## Files Created/Modified

- `.planning/phases/158-final-corpus-verification-publish-bundle/158-JUDGE-PROMPT.md` - retitled 156 prompt, extended blocklist, `before_region` key description, multi-line fix + reword-not-reinstate rule
- `scripts/docs-style/_JUDGE-VERDICTS-158.json` - two `PRESERVED` verdict records with hashes and exit codes, prompt hash, base revision, no hardcoded phase-directory path
- `.planning/phases/158-final-corpus-verification-publish-bundle/158-JUDGE-FINDINGS.md` - explicit empty out-of-task result, structural-blindness statement, dispatch shape

## Raw Worklist, Packet Count, Dispatch Detail (verbatim record)

- Raw worklist (`python scripts/docs-style/verify-meaning.py d0b611e8`): `JUDGE WORKLIST: 7 hunks where a modal was removed (0 high-risk: a 'should' was dropped)`.
- Emitted packets (`python scripts/docs-style/judge-packets.py d0b611e8 docs --chunk-file <prefix> --chunks 1`): `judge-packets: 2 hunks, 2 files, 1 bins requested, 1 bins non-empty`.
- Gap reason: the raw worklist is deliberately over-inclusive (every changed baseline line containing a modal); the packet emitter drops any hunk whose modal bag survived the rewrite intact. 5 of the 7 raw candidates kept their modal; 2 lost it. Nothing to reconcile (D-08).
- Dispatch argument vector: `cmd="claude"`, `args=["-p", "--tools", "", "--output-format", "text", "--add-dir", "<OS-temp-dir>"]`, standard input redirected from the pre-assembled prompt+packet file (never a shell string, never a command-substitution argument).
- Capture file paths: an assembled input file and a raw-output capture file, both under the OS temp directory, both retained.
- Process exit code: `0`.
- Verdicts: both hunks `PRESERVED`; `subject_verb_agreement_breaks: []` (explicit empty list, not omitted).
- Corpus reword: none landed — not needed, since no verdict was non-preserved.

## Decisions Made

See `key-decisions` in frontmatter. In brief: the deliberate-deletion sentence was placed outside both protected byte-identical sections; "packet" in this plan's decisions means one hunk-object (both hunks travelled in a single dispatched chunk file, judged by one process, but recorded as two per-hunk verdict entries); `--tools ""` was the mechanism used to satisfy "no tool authority over this repository."

## Deviations from Plan

None - plan executed exactly as written. The judge prompt's "Judge every hunk WITH its surrounding lines" sentence was drafted once with an added `before_region` clause and then reverted to the byte-identical original wording before commit, to keep the decision-procedure section's byte-for-byte match intact — this was corrected during Task 1's own drafting, before any verification or commit, so it is not tracked as a deviation from a completed task.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- `_JUDGE-VERDICTS-158.json` and `158-JUDGE-FINDINGS.md` are ready for plan 158-05's disposition tables and plan 158-06's drift attribution — both verdicts are PRESERVED, so no judge-driven corpus fix needs to be carried forward.
- `158-JUDGE-PROMPT.md`'s sha256 (`25a9b6c0606c81e64cbcdf95d75f0f655eacaf7e4ec48db21ed68aca1b281274`) and the base revision (`d0b611e8f064e4aa031aaaca53da8fafe6b92798`) are the two identifiers any later cross-check against this judgment should cite.
- No blockers.

---
*Phase: 158-final-corpus-verification-publish-bundle*
*Completed: 2026-09-08*

## Self-Check: PASSED

- All 3 created files confirmed present on disk: `158-JUDGE-PROMPT.md`, `scripts/docs-style/_JUDGE-VERDICTS-158.json`, `158-JUDGE-FINDINGS.md`.
- Both task commits (`d085ceaa`, `404ba095`) confirmed present via `git log --oneline`.
- All task-level `<acceptance_criteria>` re-confirmed passing above with their exact command output.
- Plan-level `<verification>` re-confirmed: prompt committed before dispatch with prose-style gate named first and `before_region` enumerated; exactly 2 packets emitted from walk root `docs` at base `d0b611e8` on a clean tree with both the raw worklist (7) and packet count (2) recorded; raw judge output captured non-empty with 0 blocklisted-source leaks; verdict record's prompt hash matches the committed file; findings narrative carries the blindness statement and an explicit empty out-of-task result; prose-style gate exit 0, sweep idempotent at 0 edits, and `check-phase-54/55/56.mjs` all 32/32 passed in both commits that landed a phase-directory markdown file.
