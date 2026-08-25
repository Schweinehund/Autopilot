---
schema_version: 1
open_count: 4
waived_count: 0
fixed_count: 0
total_count: 4
last_updated: 2026-08-25T03:30:27.055Z
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
  }
]
````
