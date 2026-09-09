---
schema_version: 1
open_count: 15
waived_count: 0
fixed_count: 2
total_count: 17
last_updated: 2026-09-09T00:00:00.000Z
---

# Broken Windows Ledger

> Cross-phase defect register. With `workflow.windows_enforce` enabled, `/gsd-ship` blocks while `open_count > 0`.
> Waive with `gsd-tools windows waive <id> "<reason>"` (reason required).
> Mark fixed with `gsd-tools windows fixed <id>`.

| id | phase | kind | file | line | description | status | reason | recorded_at | resolved_at |
|----|-------|------|------|------|-------------|--------|--------|-------------|-------------|
| 1 | 147 | deviation | .planning/phases/147-linux-update-delivery/147-01-PLAN.md |  | Task 2 acceptance criterion for the uncommented -updates entry is mis-specified: [^/] matches the second space in Canonical's '//  ' comment prefix, so it returns 1 on the correctly-commented line | open |  | 2026-08-21T20:58:29.990Z |  |
| 2 | 147 | deviation | .planning/phases/147-linux-update-delivery/147-01-PLAN.md |  | Task 3 platform-script five-minute negative criterion is mis-specified: the '5 minutes' alternation has no left word boundary and matches inside the mandated 'Every 15 minutes' literal | open |  | 2026-08-21T20:58:30.789Z |  |
| 3 | 147 | deviation | .planning/phases/147-linux-update-delivery/147-02-PLAN.md |  | Task 1 header-row acceptance criterion is mis-specified: the alternating pipe-gap regex double-consumes the shared table delimiters, returning 0 against both the post-edit five-platform header and the pre-edit four-platform header | open |  | 2026-08-21T21:07:36.570Z |  |
| 4 | 149 | deviation | docs/operations/firmware-bios/01-windows-dfci.md |  | D-13's 'Pillar-A set' superlative scope replaced with 'the oldest Microsoft Learn page cited anywhere in this guide' — Pillar has zero corpus occurrences | open |  | 2026-08-25T03:30:27.055Z |  |
| 5 | 151 | stub | docs/recipes/05-enterprise-update-plan.md |  | Steps 7-10 and their four anchors are unauthored; Verification, Rollback/Recovery, Configuration-Caused Failures and See Also remain partial (resolved by Plans 04 and 05) | fixed |  | 2026-08-26T13:52:17.689Z | 2026-08-26T14:33:55.401Z |
| 6 | 151 | stub | docs/recipes/05-enterprise-update-plan.md |  | Steps spine complete at ten Steps, but Verification (1 of 10 checks), Rollback/Recovery (1 of 9 mechanisms), Configuration-Caused Failures (1 data row) and See Also (3 entries) remain partial; resolved by Plan 05 | fixed |  | 2026-08-26T14:10:23.387Z | 2026-08-26T14:33:56.208Z |
| 7 | 151 | deviation | docs/recipes/05-enterprise-update-plan.md |  | D-33's 600-700 line budget is exceeded: the finished recipe measures 850 lines, 150 over the ceiling. The overrun is inherited (the file was already at 765 with four tail sections unwritten) and driven by D-32's owner-ruled click-path inclusion. No validator pins a line count on this file. Successor decision owed: adjudicate whether D-33's budget or the artifact's scope is wrong before the next recipe is planned. | open |  | 2026-08-26T14:33:36.647Z |  |
| 8 | 151 | deviation | .planning/phases/151-recipe-5-the-enterprise-update-plan/151-05-PLAN.md |  | Acceptance-criteria arithmetic recurs for the fifth consecutive plan: the Configuration-Caused Failures row criterion counts the separator row under a '^\| ' grep that cannot match it, and the Rollback/Recovery pseudo-heading criterion counts D-58 Source lines as mechanism headings. Both discharged with corrected commands. A planner-side fix is owed. | open |  | 2026-08-26T14:34:24.843Z |  |
| 9 | 154 | deviation | .planning/phases/154-style-landing-merge-the-verified-google-style-pass/154-02-PLAN.md |  | Task 1's SHA-anchor equality check (gate_baseline.sha == HEAD) is structurally unsatisfiable by the time the next plan starts, because ordinary GSD close-out always adds a SUMMARY/STATE/ROADMAP commit after the measurement commit; resolved this run via annotate-and-supersede (owner-ruled), flagged for 154-04's amendment sweep. | open |  | 2026-09-01T12:45:12.728Z |  |
| 10 | 154 | deviation | .planning/phases/154-style-landing-merge-the-verified-google-style-pass/154-03-PLAN.md |  | VERIFY-01/D-28's assumption that no planning file is in range is falsified: verify-meaning.py's changed_files() has no path scope, so ordinary GSD close-out commits (154-02's own SUMMARY+STATE+ROADMAP+WINDOWS commit, 9086c705) between gate_baseline.sha and the measurement put .planning/STATE.md and .planning/WINDOWS.md in scope, producing 3 undispositioned findings outside docs/. Independently confirmed zero docs/ findings remain undispositioned (all 6 correctly dispositioned); this is the same root-cause class as WINDOWS.md #9, not a corpus-meaning defect. Flagged for 154-04's amendment sweep. | open |  | 2026-09-01T13:01:37.927Z |  |
| 11 | 154 | deviation | .planning/phases/154-style-landing-merge-the-verified-google-style-pass/154-03-PLAN.md |  | STYLE-04's pinned-headings acceptance criterion (entries_lost==0, meaning every _PINNED-HEADINGS.txt entry occurs verbatim under docs/) is falsified by measurement: 45 of the 186 entries are validator-pinned test-fixture/detail-message string literals living only in scripts/validation/*.mjs (e.g. negative fixtures like '## ... H2 missing', or the explicitly-forbidden '### Kandji / Iru' variant), never docs/ headings at any point. Independently confirmed all 45 were ALSO absent from docs/ at the pre-merge baseline (gate_baseline.sha) -- zero heading loss attributable to this phase's landing. The plan's D-25 premise that all 186 entries are docs/ headings is the defect, not the merge. Flagged for 154-04's amendment sweep alongside WINDOWS.md #9/#10. | open |  | 2026-09-01T13:05:34.209Z |  |
| 12 | 156 | deviation | scripts/docs-style/subs-emdash-batch10.tsv |  | Guard interaction (asterisk-adjacency + PROTECT segment-boundary split) leaves 2 mid-sentence em dashes spaced in docs/recipes/05-enterprise-update-plan.md rather than tightened; correct guard behavior per plan spec, but conservative -- watch for the same pattern on the other 12 batch-10 documents in plan 156-04. | open |  | 2026-09-05T05:04:19.241Z |  |
| 13 | 156 | deviation | scripts/docs-style/subs-batch10.tsv |  | 34 shipped subs-*.tsv rule sets are not idempotent-by-scope when run against the full docs/ root: 8 non-target files (5 of the 13 batch-10 targets, 3 outside the batch) show wanted edits that were restored away by plan 156-03's apply-then-restore gate. Deferred per D-27; plan 156-04 processes the 5 in-batch files, the 3 out-of-batch files are a Phase 157/backlog handoff. | open |  | 2026-09-05T05:04:19.986Z |  |
| 14 | 156 | deviation | scripts/docs-style/subs-emdash-batch10.tsv |  | WINDOWS row 12's guard-interaction pattern (asterisk-adjacency + PROTECT segment-boundary split) is CONFIRMED to recur across the other 12 batch-10 documents, not merely watched-for: 14 line-boundary spaced em dashes measured pre-Task-2, 8 resolved via whitespace-only paragraph reflow (zero wording change) then tightened normally, 6 remain permanently spaced -- all 6 are a distinct sub-case (a spaced em dash on its own continuation line immediately following a markdown link '](url)' on the prior source line, e.g. '- [Label](url)\\n  -- description'), empirically proven unfixable by reflow: even moving the dash onto the same line as the link still fails to tighten (verified via direct sweep3.transform() call), because sweep3 processes one line at a time and the tracer's segment-boundary blind spot applies regardless of line position when a PROTECT-masked span sits immediately before the dash's leading whitespace. Correct guard behavior per plan spec, not a bug; sites: docs/operations/firmware-bios/00-overview.md:251,256; docs/operations/firmware-bios/02-dell-bios-configuration.md:268,277; docs/operations/firmware-bios/03-hp-bios-configuration.md:386; docs/operations/firmware-bios/04-lenovo-bios-configuration.md:300. | open |  | 2026-09-05T05:35:16.291Z |  |
| 15 | 156 | deviation | scripts/docs-style/subs-admin-batch9.tsv |  | A lookbehind guard is DEFEATED by a line wrap: sweep3.py processes one line at a time, so when the guarded prefix ends a source line and the guarded token starts the next, the lookbehind cannot see it and the rule fires. CONFIRMED SHIPPED DEFECT, now fixed: subs-admin-batch9.tsv's capitalised-Admin row carries (?<!Sure ), but at docs/reference/firmware-oem-matrix.md:183-185 the citation text was wrapped as 'HP Sure\\n  Admin', so the guard did not fire and two [DIRECT] HP page-title citations were rewritten to the nonexistent product 'HP Sure Administrator' -- a falsified citation, the exact defect class VERIFY-02 exists to catch. Proven by direct re.sub() of the shipped row against both forms: INLINE 'through HP Sure Admin' -> blocked; WRAPPED '  Admin and CMSL, ... and HP Sure' -> FIRES. Plan 156-01's D-06 proof that the guard fires was genuine but tested only docs/operations/firmware-bios/03-hp-bios-configuration.md, where the phrase never wraps -- a one-time measurement on one document treated as a general guarantee. Fixed in phase 156 by restoring both sites to 'HP Sure Admin' and reflowing so the phrase is not line-split (whitespace-only apart from the two restored words; verified by git diff --word-diff showing exactly two Administrator->Admin changes). Same line-at-a-time root cause as row 14. HANDOFF TO PHASE 157: sweep the corpus for other wrapped-guard escapes -- every lookbehind guard in every shipped subs-*.tsv is unenforced wherever its prefix and token straddle a line break, and no validator can see it (apex 111/0, C17 237/0 and check-phase-54 32/0 were all green with the falsified citation in the tree). | open |  | 2026-09-05T12:46:32.467Z |  |
| 16 | 158 | deviation | docs/recipes/02-shared-ipad-full-provisioning.md | 286 | Sweep3's PROTECT-segment split defeats the em-dash lookbehind guard when the whitespace run immediately follows a markdown link's closing paren, exactly matching WINDOWS row 12/14's link-adjacency class from Phase 156 (correct guard behavior per plan spec, not a bug). Line 286 held two spaced em dashes before this phase's sweep; the sweep tightened the first ('made -- see') but the second sits immediately after '](.../08-managed-apple-account-provisioning.md)', so the lookbehind's required preceding character falls outside the PROTECT-masked link segment and cannot match -- it remains spaced ('.md) -- and'). This is a NEW site for the same already-documented architectural class (not a new defect): the unmodified sweep3.py and subs-emdash-batch10.tsv are frozen per this phase's own constraints, so no hand edit was applied inside the sweep commit. 158-03's task-level verify command asserting 'no changed line carries a spaced em dash' fails on this one line out of 28; all three of the plan's actual correctness guards (boundary check on the tightened dash, pin differ, CR-insensitive byte identity outside the dash) pass clean. | open |  | 2026-09-08T06:36:40.995Z |  |
| 17 | 159 | deviation | .planning/phases/158-final-corpus-verification-publish-bundle/158-VERIFICATION.md | 97 | Verifier-secret-echo class: a command or a table row that quotes the value it asserts is absent both leaks the value and inverts its own verdict. First site: this file's line 97 'Secret-scrub negative control' row, committed 179cf247, whose recorded 'exit 1 (no match)' PASS is false because the command matches the file it lives in. The class has now RECURRED ONCE, in a downstream research document written by a different agent (.planning/phases/159-harn-harness-close/159-RESEARCH.md, 4 sites, introduced at commit b0a2f84a, after the original site was already known) -- proof that a site-scoped row would not have caught the second occurrence. Replacing rule: derive needles in-process, count only, scrub on the branch before any squash, and never quote a scrubbed value when documenting the scrub. | open |  | 2026-09-09T00:00:00.000Z |  |

````json
[
  {
    "id": 1,
    "kind": "deviation",
    "phase": "147",
    "file": ".planning/phases/147-linux-update-delivery/147-01-PLAN.md",
    "line": null,
    "description": "Task 2 acceptance criterion for the uncommented -updates entry is mis-specified: [^/] matches the second space in Canonical's '//  ' comment prefix, so it returns 1 on the correctly-commented line",
    "status": "open",
    "reason": "",
    "recorded_at": "2026-08-21T20:58:29.990Z",
    "resolved_at": null
  },
  {
    "id": 2,
    "kind": "deviation",
    "phase": "147",
    "file": ".planning/phases/147-linux-update-delivery/147-01-PLAN.md",
    "line": null,
    "description": "Task 3 platform-script five-minute negative criterion is mis-specified: the '5 minutes' alternation has no left word boundary and matches inside the mandated 'Every 15 minutes' literal",
    "status": "open",
    "reason": "",
    "recorded_at": "2026-08-21T20:58:30.789Z",
    "resolved_at": null
  },
  {
    "id": 3,
    "kind": "deviation",
    "phase": "147",
    "file": ".planning/phases/147-linux-update-delivery/147-02-PLAN.md",
    "line": null,
    "description": "Task 1 header-row acceptance criterion is mis-specified: the alternating pipe-gap regex double-consumes the shared table delimiters, returning 0 against both the post-edit five-platform header and the pre-edit four-platform header",
    "status": "open",
    "reason": "",
    "recorded_at": "2026-08-21T21:07:36.570Z",
    "resolved_at": null
  },
  {
    "id": 4,
    "kind": "deviation",
    "phase": "149",
    "file": "docs/operations/firmware-bios/01-windows-dfci.md",
    "line": null,
    "description": "D-13's 'Pillar-A set' superlative scope replaced with 'the oldest Microsoft Learn page cited anywhere in this guide' — Pillar has zero corpus occurrences",
    "status": "open",
    "reason": "",
    "recorded_at": "2026-08-25T03:30:27.055Z",
    "resolved_at": null
  },
  {
    "id": 5,
    "kind": "stub",
    "phase": "151",
    "file": "docs/recipes/05-enterprise-update-plan.md",
    "line": null,
    "description": "Steps 7-10 and their four anchors are unauthored; Verification, Rollback/Recovery, Configuration-Caused Failures and See Also remain partial (resolved by Plans 04 and 05)",
    "status": "fixed",
    "reason": "",
    "recorded_at": "2026-08-26T13:52:17.689Z",
    "resolved_at": "2026-08-26T14:33:55.401Z"
  },
  {
    "id": 6,
    "kind": "stub",
    "phase": "151",
    "file": "docs/recipes/05-enterprise-update-plan.md",
    "line": null,
    "description": "Steps spine complete at ten Steps, but Verification (1 of 10 checks), Rollback/Recovery (1 of 9 mechanisms), Configuration-Caused Failures (1 data row) and See Also (3 entries) remain partial; resolved by Plan 05",
    "status": "fixed",
    "reason": "",
    "recorded_at": "2026-08-26T14:10:23.387Z",
    "resolved_at": "2026-08-26T14:33:56.208Z"
  },
  {
    "id": 7,
    "kind": "deviation",
    "phase": "151",
    "file": "docs/recipes/05-enterprise-update-plan.md",
    "line": null,
    "description": "D-33's 600-700 line budget is exceeded: the finished recipe measures 850 lines, 150 over the ceiling. The overrun is inherited (the file was already at 765 with four tail sections unwritten) and driven by D-32's owner-ruled click-path inclusion. No validator pins a line count on this file. Successor decision owed: adjudicate whether D-33's budget or the artifact's scope is wrong before the next recipe is planned.",
    "status": "open",
    "reason": "",
    "recorded_at": "2026-08-26T14:33:36.647Z",
    "resolved_at": null
  },
  {
    "id": 8,
    "kind": "deviation",
    "phase": "151",
    "file": ".planning/phases/151-recipe-5-the-enterprise-update-plan/151-05-PLAN.md",
    "line": null,
    "description": "Acceptance-criteria arithmetic recurs for the fifth consecutive plan: the Configuration-Caused Failures row criterion counts the separator row under a '^| ' grep that cannot match it, and the Rollback/Recovery pseudo-heading criterion counts D-58 Source lines as mechanism headings. Both discharged with corrected commands. A planner-side fix is owed.",
    "status": "open",
    "reason": "",
    "recorded_at": "2026-08-26T14:34:24.843Z",
    "resolved_at": null
  },
  {
    "id": 9,
    "kind": "deviation",
    "phase": "154",
    "file": ".planning/phases/154-style-landing-merge-the-verified-google-style-pass/154-02-PLAN.md",
    "line": null,
    "description": "Task 1's SHA-anchor equality check (gate_baseline.sha == HEAD) is structurally unsatisfiable by the time the next plan starts, because ordinary GSD close-out always adds a SUMMARY/STATE/ROADMAP commit after the measurement commit; resolved this run via annotate-and-supersede (owner-ruled), flagged for 154-04's amendment sweep.",
    "status": "open",
    "reason": "",
    "recorded_at": "2026-09-01T12:45:12.728Z",
    "resolved_at": null
  },
  {
    "id": 10,
    "kind": "deviation",
    "phase": "154",
    "file": ".planning/phases/154-style-landing-merge-the-verified-google-style-pass/154-03-PLAN.md",
    "line": null,
    "description": "VERIFY-01/D-28's assumption that no planning file is in range is falsified: verify-meaning.py's changed_files() has no path scope, so ordinary GSD close-out commits (154-02's own SUMMARY+STATE+ROADMAP+WINDOWS commit, 9086c705) between gate_baseline.sha and the measurement put .planning/STATE.md and .planning/WINDOWS.md in scope, producing 3 undispositioned findings outside docs/. Independently confirmed zero docs/ findings remain undispositioned (all 6 correctly dispositioned); this is the same root-cause class as WINDOWS.md #9, not a corpus-meaning defect. Flagged for 154-04's amendment sweep.",
    "status": "open",
    "reason": "",
    "recorded_at": "2026-09-01T13:01:37.927Z",
    "resolved_at": null
  },
  {
    "id": 11,
    "kind": "deviation",
    "phase": "154",
    "file": ".planning/phases/154-style-landing-merge-the-verified-google-style-pass/154-03-PLAN.md",
    "line": null,
    "description": "STYLE-04's pinned-headings acceptance criterion (entries_lost==0, meaning every _PINNED-HEADINGS.txt entry occurs verbatim under docs/) is falsified by measurement: 45 of the 186 entries are validator-pinned test-fixture/detail-message string literals living only in scripts/validation/*.mjs (e.g. negative fixtures like '## ... H2 missing', or the explicitly-forbidden '### Kandji / Iru' variant), never docs/ headings at any point. Independently confirmed all 45 were ALSO absent from docs/ at the pre-merge baseline (gate_baseline.sha) -- zero heading loss attributable to this phase's landing. The plan's D-25 premise that all 186 entries are docs/ headings is the defect, not the merge. Flagged for 154-04's amendment sweep alongside WINDOWS.md #9/#10.",
    "status": "open",
    "reason": "",
    "recorded_at": "2026-09-01T13:05:34.209Z",
    "resolved_at": null
  },
  {
    "id": 12,
    "kind": "deviation",
    "phase": "156",
    "file": "scripts/docs-style/subs-emdash-batch10.tsv",
    "line": null,
    "description": "Guard interaction (asterisk-adjacency + PROTECT segment-boundary split) leaves 2 mid-sentence em dashes spaced in docs/recipes/05-enterprise-update-plan.md rather than tightened; correct guard behavior per plan spec, but conservative -- watch for the same pattern on the other 12 batch-10 documents in plan 156-04.",
    "status": "open",
    "reason": "",
    "recorded_at": "2026-09-05T05:04:19.241Z",
    "resolved_at": null
  },
  {
    "id": 13,
    "kind": "deviation",
    "phase": "156",
    "file": "scripts/docs-style/subs-batch10.tsv",
    "line": null,
    "description": "34 shipped subs-*.tsv rule sets are not idempotent-by-scope when run against the full docs/ root: 8 non-target files (5 of the 13 batch-10 targets, 3 outside the batch) show wanted edits that were restored away by plan 156-03's apply-then-restore gate. Deferred per D-27; plan 156-04 processes the 5 in-batch files, the 3 out-of-batch files are a Phase 157/backlog handoff.",
    "status": "open",
    "reason": "",
    "recorded_at": "2026-09-05T05:04:19.986Z",
    "resolved_at": null
  },
  {
    "id": 14,
    "kind": "deviation",
    "phase": "156",
    "file": "scripts/docs-style/subs-emdash-batch10.tsv",
    "line": null,
    "description": "WINDOWS row 12's guard-interaction pattern (asterisk-adjacency + PROTECT segment-boundary split) is CONFIRMED to recur across the other 12 batch-10 documents, not merely watched-for: 14 line-boundary spaced em dashes measured pre-Task-2, 8 resolved via whitespace-only paragraph reflow (zero wording change) then tightened normally, 6 remain permanently spaced -- all 6 are a distinct sub-case (a spaced em dash on its own continuation line immediately following a markdown link '](url)' on the prior source line, e.g. '- [Label](url)\\n  -- description'), empirically proven unfixable by reflow: even moving the dash onto the same line as the link still fails to tighten (verified via direct sweep3.transform() call), because sweep3 processes one line at a time and the tracer's segment-boundary blind spot applies regardless of line position when a PROTECT-masked span sits immediately before the dash's leading whitespace. Correct guard behavior per plan spec, not a bug; sites: docs/operations/firmware-bios/00-overview.md:251,256; docs/operations/firmware-bios/02-dell-bios-configuration.md:268,277; docs/operations/firmware-bios/03-hp-bios-configuration.md:386; docs/operations/firmware-bios/04-lenovo-bios-configuration.md:300.",
    "status": "open",
    "reason": "",
    "recorded_at": "2026-09-05T05:35:16.291Z",
    "resolved_at": null
  },
  {
    "id": 15,
    "kind": "deviation",
    "phase": "156",
    "file": "scripts/docs-style/subs-admin-batch9.tsv",
    "line": null,
    "description": "A lookbehind guard is DEFEATED by a line wrap: sweep3.py processes one line at a time, so when the guarded prefix ends a source line and the guarded token starts the next, the lookbehind cannot see it and the rule fires. CONFIRMED SHIPPED DEFECT, now fixed: subs-admin-batch9.tsv's capitalised-Admin row carries (?<!Sure ), but at docs/reference/firmware-oem-matrix.md:183-185 the citation text was wrapped as 'HP Sure\\n  Admin', so the guard did not fire and two [DIRECT] HP page-title citations were rewritten to the nonexistent product 'HP Sure Administrator' -- a falsified citation, the exact defect class VERIFY-02 exists to catch. Proven by direct re.sub() of the shipped row against both forms: INLINE 'through HP Sure Admin' -> blocked; WRAPPED '  Admin and CMSL, ... and HP Sure' -> FIRES. Plan 156-01's D-06 proof that the guard fires was genuine but tested only docs/operations/firmware-bios/03-hp-bios-configuration.md, where the phrase never wraps -- a one-time measurement on one document treated as a general guarantee. Fixed in phase 156 by restoring both sites to 'HP Sure Admin' and reflowing so the phrase is not line-split (whitespace-only apart from the two restored words; verified by git diff --word-diff showing exactly two Administrator->Admin changes). Same line-at-a-time root cause as row 14. HANDOFF TO PHASE 157: sweep the corpus for other wrapped-guard escapes -- every lookbehind guard in every shipped subs-*.tsv is unenforced wherever its prefix and token straddle a line break, and no validator can see it (apex 111/0, C17 237/0 and check-phase-54 32/0 were all green with the falsified citation in the tree).",
    "status": "open",
    "reason": "",
    "recorded_at": "2026-09-05T12:46:32.467Z",
    "resolved_at": null
  },
  {
    "id": 16,
    "kind": "deviation",
    "phase": "158",
    "file": "docs/recipes/02-shared-ipad-full-provisioning.md",
    "line": 286,
    "description": "Sweep3's PROTECT-segment split defeats the em-dash lookbehind guard when the whitespace run immediately follows a markdown link's closing paren, exactly matching WINDOWS row 12/14's link-adjacency class from Phase 156 (correct guard behavior per plan spec, not a bug). Line 286 held two spaced em dashes before this phase's sweep; the sweep tightened the first ('made -- see') but the second sits immediately after '](.../08-managed-apple-account-provisioning.md)', so the lookbehind's required preceding character falls outside the PROTECT-masked link segment and cannot match -- it remains spaced ('.md) -- and'). This is a NEW site for the same already-documented architectural class (not a new defect): the unmodified sweep3.py and subs-emdash-batch10.tsv are frozen per this phase's own constraints, so no hand edit was applied inside the sweep commit. 158-03's task-level verify command asserting 'no changed line carries a spaced em dash' fails on this one line out of 28; all three of the plan's actual correctness guards (boundary check on the tightened dash, pin differ, CR-insensitive byte identity outside the dash) pass clean.",
    "status": "open",
    "reason": "",
    "recorded_at": "2026-09-08T06:36:40.995Z",
    "resolved_at": null
  },
  {
    "id": 17,
    "kind": "deviation",
    "phase": "159",
    "file": ".planning/phases/158-final-corpus-verification-publish-bundle/158-VERIFICATION.md",
    "line": 97,
    "description": "Verifier-secret-echo class: a command or a table row that quotes the value it asserts is absent both leaks the value and inverts its own verdict. First site: this file's line 97 'Secret-scrub negative control' row, committed 179cf247, whose recorded 'exit 1 (no match)' PASS is false because the command matches the file it lives in. The class has now RECURRED ONCE, in a downstream research document written by a different agent (.planning/phases/159-harn-harness-close/159-RESEARCH.md, 4 sites, introduced at commit b0a2f84a, after the original site was already known) -- proof that a site-scoped row would not have caught the second occurrence. Replacing rule: derive needles in-process, count only, scrub on the branch before any squash, and never quote a scrubbed value when documenting the scrub.",
    "status": "open",
    "reason": "",
    "recorded_at": "2026-09-09T00:00:00.000Z",
    "resolved_at": null
  }
]
````
