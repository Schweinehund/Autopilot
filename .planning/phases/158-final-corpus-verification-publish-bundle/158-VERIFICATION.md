---
phase: 158-final-corpus-verification-publish-bundle
verified: 2026-09-08T07:00:00Z
status: passed
score: 4/4 must-haves verified
behavior_unverified: 0
overrides_applied: 0
re_verification: No — initial verification
coincidental_reliance_items: []
---

# Phase 158: Final Corpus Verification & Publish Bundle Verification Report

**Phase Goal:** The fully landed, extended, reconciled and hygiene-corrected corpus is proven trustworthy by
confirming every claimed fix against the git history rather than a written record, and the `.docx` publish
bundle is rebuilt from that final state.
**Verified:** 2026-09-08
**Status:** passed
**Re-verification:** No — initial verification

This verification independently re-executed the phase's own instruments rather than trusting the SUMMARYs'
claims. Every load-bearing number below was reproduced live in this session against HEAD `9640ee93`, not
copied from a SUMMARY.

## Goal Achievement

### Observable Truths (ROADMAP Success Criteria, ordered)

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | SC#1 — `dist/docs-library-v1.22.zip` rebuilt from the landed corpus, `guard-docx.mjs` fail-closed on every doc, correct manifest/README, both canaries agree with registry row count | ✓ VERIFIED | Re-ran both `--self-test` suites live: 15/15 and 8/8 PASS. `unzip -Z1` on the live zip = 239 entries (237 `*.docx` + `manifest.csv` + `README.md`), matching the plan's D-23(1). Manifest independently parsed: 237 rows, blank-status set = exactly `{RE-228..RE-236}` (9), matching D-23(6). README extracted from both v1.22 and v1.21 zips and `cmp`'d byte-identical (1513 bytes), matching D-23(2) without importing the module. Both canaries confirmed at 237 in `build-publish-bundle.mjs:523` and `build-filename-map.mjs`. `158-BUNDLE-RUN.txt` shows "Registry parity: 237 Approved rows, 237 staged, 0 excluded, 0 missing, 0 orphan" and "237 docx converted+guarded+staged, 0 errors." |
| 2 | SC#2 (amended, D-02/D-06) — every claimed fix confirmed with a per-claim occurrence-count instrument, not a written record, over the full 46-row population, retroactive for the 31 already-`[x]` requirements | ✓ VERIFIED | Independently re-ran `audit-claimed-fixes.mjs --rows scripts/docs-style/158-FIX-AUDIT.json` in this session (not copying the committed run log): **46/46 PASS**, `hash=e12dd27e...` — matches the row-set hash cited in `158-06-SUMMARY.md` and the committed `158-FIX-AUDIT-RUN.txt` exactly. Spot-verified the flagship D-04 row by direct `git grep -c` on HEAD: `Create a local admin account` = 2 occurrences in `02-enrollment-profile.md`, matching the row's `count_at_head_eq: 2` assertion. Re-ran `--self-test`: 4/4 PASS, covering all four D-48 cases (CRLF-wrapped needle, all-zero vacuity, bad pathspec, secret row with in-memory-only positive control). Confirmed `grep -c '^\- \[x\]'` was 31 at the plan's own measurement point (33 now, after this same plan flipped VERIFY-05/06 to `[x]` — consistent, not a discrepancy). |
| 3 | SC#3 — every file Phase 157 edited gets a style pass and disposition before the bundle is built | ✓ VERIFIED | `_STYLE-DISPOSITIONS-158.tsv` independently counted: 93 occurrence rows (5 EDIT / 22 KEEP-BY-RULE / 33 KEEP-FLAGGED / 25 KEEP-PROTECTED / 5 MASK-ARTIFACT / 3 SWEPT) + 27 NO-CANDIDATES rows = 120 rows covering all 59 edited files, matching `158-05-SUMMARY.md`'s corrected figures exactly. `_DISPOSITIONS-158.tsv` independently re-verified live: re-ran `verify-meaning.py d0b611e8 --dispositions _DISPOSITIONS-158.tsv` and confirmed **0 `docs/` findings undispositioned** (5 residual findings are all `.planning/` bookkeeping, attributed in the file's header per D-13 — not corpus content). One residual open item: `docs/recipes/02-shared-ipad-full-provisioning.md:286` retains a spaced em dash after a markdown-link close-paren (verified live via `sed -n '286p'`); this is the same link-adjacency guard-defeat class already accepted as non-actionable in Phase 156 (WINDOWS rows #12/#14), logged honestly as WINDOWS row #16, and explicitly forbidden from a hand-fix inside the frozen sweep commit by this phase's own constraints (D-09, D-69 constraint 2). Not a gap against SC#3 — it is the documented, precedented residue of a known tool limitation, not an undispositioned or unflagged file. |
| 4 | SC#4 (amended, D-17) — re-running the deterministic slice and full structural gate reproduces Phase 156's clean result with every delta attributed, zero unexplained drift | ✓ VERIFIED | Independently re-ran every gate live in this session: `check-phase-153.mjs` 111 PASS/0 FAIL/0 SKIPPED; `c17-eee-contract.mjs` 237 files/0 violations; `check-phase-54.mjs` 32/0; `check-nav-hub-links.mjs` 0/0; `check-phase-135.mjs` 7/7; `check-prose-style.py` 0 findings. `158-GATE-BASELINE.json`'s `drift[]` array independently counted at 9 rows (matches ROADMAP's own amendment text "9 rows, unattributed_rows: 0" and `158-06-SUMMARY.md`'s "9 drift rows" — see Anti-Patterns for a real but non-blocking internal miscount in one descriptive string). Re-ran `unattributed_rows` computation logic manually: 7 of 9 rows carry a SHA-list `attributed_to` and are evidence-checked; the other 2 carry the `"158-remediation"`/`"158-sweep"` class labels D-51 defines for exactly this case. Corpus identity independently confirmed: `git diff --exit-code b889501f HEAD -- docs/ scripts/pipeline/` exits 0 (zero diff) on the post-bundle tree, matching D-24's assertion. |

**Score:** 4/4 truths verified (0 present-behavior-unverified)

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `scripts/docs-style/audit-claimed-fixes.mjs` | Node-built-ins-only runner, argv-only git calls, `--self-test` | ✓ VERIFIED | Exists, executable. `grep execFileSync` = 20 uses, zero `execSync`/shell-string composition. `git ls-tree` existence guard present at `:72`/`:119`. Re-ran `--self-test`: 4/4 PASS live. |
| `scripts/docs-style/158-FIX-AUDIT.json` | 46-row claimed-fix population, resolved SHA-pair range | ✓ VERIFIED | 46 rows confirmed via `node -e`. `range: {from: 0a458c84 (=4e781fc5^), to: aa9ae5ae}` — both resolved SHAs, not `HEAD`. `aa9ae5ae` independently confirmed to be the last commit touching `docs/` before the binding audit ran (no `docs/` edits occur between `aa9ae5ae` and `HEAD`). |
| `scripts/docs-style/158-FIX-AUDIT-RUN.txt` | Run log tied to the JSON by row-set hash | ✓ VERIFIED | Present; independently reproduced run shows identical `hash=e12dd27e...`. |
| `.planning/phases/158-.../158-GATE-BASELINE.json` | Three-column baseline (156/before/after), 9 `drift[]` rows, `unattributed_rows: 0` | ✓ VERIFIED (minor documentation defect noted) | `drift.length === 9` confirmed programmatically; `discharge.sc4.points_at[1]` text literally reads "drift[] -- 8 rows" while enumerating 9 items (2+6+1) — a real off-by-one in this one descriptive string, contradicted by the correct array length and by the correct "9 rows" figure independently used in both `158-06-SUMMARY.md` and the ROADMAP.md D-17 amendment. Does not affect the actual computed data or any consuming assertion. |
| `.planning/phases/158-.../158-BUNDLE-RUN.txt`, `158-BUNDLE-MANIFEST.csv` | Verbatim bundle-run capture, manifest citation copy | ✓ VERIFIED | 488-line run log ends "Batch complete: 237 docx converted+guarded+staged, 0 errors." 238-line manifest (header + 237 rows) matches the live-extracted manifest byte-for-byte in row count and blank-status set. |
| `.planning/phases/158-.../158-JUDGE-PROMPT.md`, `_JUDGE-VERDICTS-158.json` | Retitled prompt with extended blocklist, transcribed verdicts | ✓ VERIFIED | 2 packets, both PRESERVED, `prompt_sha256` recorded, dispatch used `claude -p --tools "" --add-dir <tmp>` with a captured raw-output file per D-56. |
| `scripts/docs-style/_DISPOSITIONS-158.tsv`, `_STYLE-DISPOSITIONS-158.tsv` | Sibling disposition tables, no anchor column | ✓ VERIFIED | 9 corpus rows + 4-planning-tree-findings-in-header (independently re-run: currently 5 due to one further ordinary commit landing after the plan's own measurement — expected drift for a checker with no time-bound, not a defect); 93 occurrence + 27 NO-CANDIDATES rows, exactly 5 EDIT rows, verified by column tally. |
| `dist/docs-library-v1.22.zip` | 237-document publish archive | ✓ VERIFIED | Exists, 4,105,804 bytes. Live `unzip -Z1` = 239 entries. Both `--self-test` suites and both canaries re-run live and green. |
| Six `[SUCCESS-CRITERION AMENDMENT, D-NN]` blocks in REQUIREMENTS.md + ROADMAP.md | Annotate-and-supersede, `[MEASURED, plan NNN-NN]` labels | ✓ VERIFIED | All six confirmed present (STYLE-06, VERIFY-06 ×2, HYG-06, HARN-06 in REQUIREMENTS.md; SC#2/SC#4 in ROADMAP.md), each with a named plan and command. `.planning/STATE.md` gained new `- [Phase 158]:` bullets (lines 201+) without rewriting the pre-existing Phase-154/155 bullets (spot-checked lines 159 and 166 — byte-unchanged). |
| `scripts/pipeline/filename-map.md` | Byte-unchanged despite a `git checkout --` + double `--amend` maneuver in 158-07 | ✓ VERIFIED | `git diff --exit-code aa9ae5ae HEAD -- scripts/pipeline/filename-map.md` exits 0; `git hash-object` of the working file equals `git rev-parse HEAD:scripts/pipeline/filename-map.md`. No content was lost by the amend sequence. |

### Key Link Verification

| From | To | Via | Status | Details |
|------|-----|-----|--------|---------|
| `audit-claimed-fixes.mjs` | git history | `execFileSync('git', [...])` array-argv | ✓ WIRED | Confirmed zero shell-string composition; re-run reproduces the committed hash exactly. |
| `158-07` plan | REQUIREMENTS.md checkbox flip | `requirements.mark-complete` harness at plan-frontmatter boundary | ✓ WIRED | `git log -S"[x] **VERIFY-05**"` shows the flip landed in `9640ee93`, the plan-completion metadata commit — after the bundle build (`86c5f074`), the twelve assertions (`b0d512e5`), and the amendments (`eec65c6f`), per D-67/D-68's required ordering. |
| Bundle build | Registry (`RE-index.md`) | `parseRegistry` import (guarded main) | ✓ WIRED | Manifest RE-ID set (237, live-parsed) matches the registry's Approved set; blank-status subset matches the 9 accepted-not-fixed IDs exactly. |
| Sweep commit | Both publish-bundle drift canaries | Re-asserted at 237 in the same commit (D-09/D-71) | ✓ WIRED | Confirmed both canaries at 237 in the current tree; `RE-index.md` is itself in the sweep set. |

### Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
|-------------|-------------|--------------|--------|----------|
| VERIFY-05 | 158-07 | Bundle rebuilt, guard-docx fail-closed, correct manifest/README, canaries agree | ✓ SATISFIED | REQUIREMENTS.md `- [x]`; Traceability table row "Complete"; independently reproduced bundle assertions above. |
| VERIFY-06 | 158-07 | No claimed fix trusted on a written record; post-hygiene style sweep dispositioned | ✓ SATISFIED | REQUIREMENTS.md `- [x]`; Traceability table row "Complete"; independently re-ran the 46-row audit to the same PASS/hash. |

No orphaned requirements — only VERIFY-05/VERIFY-06 map to Phase 158 in REQUIREMENTS.md's Traceability table, and both are declared in exactly one plan's frontmatter (158-07), per D-67.

### Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
|------|------|---------|----------|--------|
| `158-GATE-BASELINE.json` | `phase_baseline.discharge.sc4.points_at[1]` | Descriptive text says "drift[] -- 8 rows" while enumerating 9 items and the array itself has 9 entries | ℹ️ Info | Purely a miscount inside one narrative string in a JSON pointer field; the actual `drift[]` array, `unattributed_rows`, ROADMAP's own amendment text, and both SUMMARYs all correctly say 9. No downstream consumer reads the prose count. Worth a one-line fix in Phase 159 or backlog; not phase-blocking given VERIFY-06's own audit trail is otherwise self-consistent and independently reproducible. |
| `docs/recipes/02-shared-ipad-full-provisioning.md` | 286 | One spaced em dash survives the corpus-wide sweep (link-adjacency guard defeat) | ℹ️ Info | Logged as WINDOWS.md row #16, explicitly the same architectural class already accepted in Phase 156 (rows #12/#14); the plan's other three correctness guards (boundary check, pin differ, CR-insensitive byte identity) all pass clean on this file. Not a fabricated or silently-dropped defect — disclosed candidly in both WINDOWS.md and the SUMMARY. |
| — | — | `TBD`/`FIXME`/`XXX` scan across all 43 files phase 158 touched | — | Two hits, both pre-existing/narrative: `.planning/ROADMAP.md:289` ("Plans: TBD" — Phase 159's own not-yet-planned placeholder) and `docs/index.md:406` (a Version History row *describing* a past resolution of Phase-24 TBD placeholders, not a live marker). Neither is a debt marker introduced or left open by this phase. |

No stub artifacts, no empty implementations, no hardcoded-empty data flows found in any of the 43 files this phase touched.

### Behavioral Spot-Checks / Live Re-Execution

| Check | Command | Result | Status |
|-------|---------|--------|--------|
| Binding claimed-fix audit reproduces | `node audit-claimed-fixes.mjs --rows 158-FIX-AUDIT.json --log <tmp>` | 46/46 rows PASS, hash `e12dd27e...` matches committed value | ✓ PASS |
| Audit self-test | `node audit-claimed-fixes.mjs --self-test` | 4/4 cases PASS (incl. secret row in-memory-only positive control) | ✓ PASS |
| Apex chain | `node check-phase-153.mjs` | 111 PASS, 0 FAIL, 0 SKIPPED | ✓ PASS |
| C17 structural contract | `node c17-eee-contract.mjs` | 237 files, 0 violations | ✓ PASS |
| Nav-hub links | `node check-nav-hub-links.mjs` | 0/0 | ✓ PASS |
| Recipe #3 pins | `node check-phase-135.mjs` | 7/7 | ✓ PASS |
| Prose style gate | `python check-prose-style.py` | 0 findings | ✓ PASS |
| Bundle canaries + self-tests | `node build-publish-bundle.mjs --self-test`, `node build-filename-map.mjs --self-test` | 15/15, 8/8, both canaries 237 | ✓ PASS |
| Zip entry count | `unzip -Z1 dist/docs-library-v1.22.zip \| wc -l` | 239 | ✓ PASS |
| README byte-equality | `cmp` on extracted README from v1.22 and v1.21 zips | identical, 1513 bytes | ✓ PASS |
| Filename-map identity | `git diff --exit-code` + `git hash-object` vs `HEAD:` blob | identical | ✓ PASS |
| Corpus identity post-bundle | `git diff --exit-code b889501f HEAD -- docs/ scripts/pipeline/` | exit 0 | ✓ PASS |
| Secret-scrub negative control | `git grep -i "<SCRUBBED-9CHAR-TOKEN>" HEAD` | exit 1 (no match) | ✓ PASS |
| Meaning-checker docs/ residual | `python verify-meaning.py d0b611e8 --dispositions _DISPOSITIONS-158.tsv` | 0 `docs/` findings undispositioned (5 `.planning/`-only residual) | ✓ PASS |
| `check-phase-158.mjs` absence (out of scope per CONTEXT) | `ls scripts/validation/check-phase-{154..158}.mjs` | none exist | ✓ PASS (expected) |

**[SCRUB NOTE, 2026-09-09, Phase 159 Task 1]** The "Secret-scrub negative control" row above originally quoted the literal 9-character label it asserted absent, inside its own command, as committed at `179cf247`. The literal is replaced above with `<SCRUBBED-9CHAR-TOKEN>` per `159-CONTEXT.md` D-05/D-06. **The row's recorded verdict of `exit 1 (no match)` is now FALSE**: the un-redacted command, run against this very file, matches the file it lives in — a verifier negative control that quotes the value it asserts absent both leaks the value and inverts its own verdict. This row is annotated rather than deleted so the falsification is disclosed in place. See `.planning/WINDOWS.md` row 17 for the class-level defect (this is its second recorded occurrence) and `158-SECURITY.md` T-158-01 for the threat this re-opened and closed.

### Human Verification Required

None. Every material claim in this phase reduces to a re-runnable command, and this verification re-ran the load-bearing ones live and reproduced the committed results independently rather than trusting the SUMMARYs.

### Gaps Summary

No gaps found. Two informational findings are recorded above (the `discharge.sc4` prose off-by-one and the
one accepted em-dash-sweep residual) — neither blocks the phase goal, both are self-disclosed in the phase's
own artifacts rather than hidden, and both are consistent with precedents already accepted in Phase 156. The
phase's central claim — "every fix confirmed against git history, not a written record" — held up under
independent re-execution: the binding audit reproduced the exact same 46/46 PASS result and row-set hash
without relying on any cached output, the bundle's twelve assertions were independently re-derived from the
live zip and manifest rather than copied from the SUMMARY, and every regression gate cited by the orchestrator
was re-run fresh in this session and confirmed green.

---

_Verified: 2026-09-08_
_Verifier: Claude (gsd-verifier)_
