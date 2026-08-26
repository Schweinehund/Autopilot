---
schema_version: 1
open_count: 6
waived_count: 0
fixed_count: 2
total_count: 8
last_updated: 2026-08-26T14:34:24.843Z
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
  }
]
````
