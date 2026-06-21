# Jira Milestone Skill

Keeps Jira in lockstep with GSD milestone progress for the Autopilot Documentation Suite,
using an **Epic-per-milestone + Story-per-phase** model. Driven automatically by the Stop
hook `.claude/hooks/jira-milestone-gate.cjs`, or run manually.

## Issue model (non-negotiable — the Stop hook depends on it)

- **One Epic per GSD milestone** (e.g. `v1.9`), issue type Epic (`10000`).
- **One child Story per GSD phase**, issue type Story (`10007`), linked to the Epic via the
  `parent` field (verified working in this company-managed project — no Epic-Link custom field
  needed), assigned to the milestone assignee.
- **Story lifecycle:** `todo` → `in_progress` → `done`. **Epic lifecycle:** `created` → `in_progress` → `completed`.
- Stories are created **all up front** (To Do) at milestone `create`.

## Commands

| Command | Description |
|---------|-------------|
| `create <version>` | Create the milestone Epic + one To Do Story per phase; record the mapping entry |
| `start <version>` | Transition the Epic → In Progress |
| `sync <version>` | Reconcile phase Stories with ROADMAP/STATE (create missing, start active, complete done) |
| `complete <version>` | Close any open phase Stories, comment + transition the Epic → Done |
| `status [version]` | Show the milestone Epic + phase Story mapping |

`<version>` is the GSD milestone string from `.planning/STATE.md` `milestone:` (e.g. `v1.9`).

## Mapping file — `.planning/jira/mapping.json`

Per-milestone entry shape under `milestones["<version>"]` (every command MUST preserve fields it
does not change, and MUST never drop the `phases` map):

```json
{
  "epicKey": "RTS-NNN",
  "status": "created | in_progress | completed",
  "created": "YYYY-MM-DD",
  "completedDate": "YYYY-MM-DD",
  "phases": {
    "75": { "issueKey": "RTS-NNN", "status": "todo | in_progress | done", "name": "<phase name>" }
  }
}
```

The top-level `phases` map (historical per-phase epics RTS-425…RTS-614 from the older model) is
**legacy history** — leave it untouched; the milestone model uses `milestones` only.

## Discovered Jira config (RTS / Retail Technology Systems)

| Key | Value |
|-----|-------|
| cloudId | `a04fcb6a-ae5a-4f81-95e7-83941226b47b` |
| projectKey | `RTS` |
| Epic issue type | `10000` (Epic) |
| Phase issue type | `10007` (Story) — child via `parent` field |
| Account field | `customfield_10224` — **plain integer**: `4`=New Development, `5`=Maintenance, `6`=Small Demands |
| Epic start date | `customfield_10553` (YYYY-MM-DD) — Epic only |
| Due date | `duedate` (YYYY-MM-DD) — required on Epic |
| Transitions | To Do `2` · In Progress `31` · Done `41` (Backlog→Done is a direct transition) |
| Assignee (milestone) | Joshua Anderson `712020:70012a54-aa0a-46d8-bf7a-4b5eab5925bb` |
| Labels | `["autopilot-docs", "v1", "<version>"]` (e.g. add `v1.9`) |

**Epic required fields:** `summary`, `duedate`, `customfield_10553`, `customfield_10224`.
**Story required fields:** only `summary` (+ `parent`, `assignee`, `labels` as policy). No Account/date fields needed on Stories.
**Account by milestone type:** new-feature/content milestone → `4` (New Development); hygiene/maintenance/cleanup → `5`. Mirror the previous milestone if unsure.

## Workflows

### `create <version>`
1. Read `mapping.json`; **idempotency-guard** — if `milestones["<version>"]` already has an `epicKey` (or an Epic for the milestone already exists in Jira), record/keep it instead of creating a duplicate.
2. Read `.planning/ROADMAP.md` for the milestone goal and its phase list (the `- [ ]/[x] **Phase N: <name>**` rows for this milestone).
3. Create the **Epic** via `createJiraIssue` (cloudId, projectKey `RTS`, `issueTypeName:"Epic"`, summary `Autopilot Docs - <version>: <milestone name>`, description from ROADMAP, `assignee_account_id` = milestone assignee, `additional_fields`: `duedate`, `customfield_10553`, `customfield_10224` (plain int by type), `labels`).
4. For **each phase**, create a **Story** via `createJiraIssue` (`issueTypeName:"Story"`, `parent:"<epicKey>"`, `assignee_account_id`, summary `Phase N: <name>`, `additional_fields.labels`). New Stories land in Backlog → transition each to **To Do** (`2`).
5. Write `milestones["<version>"]` with `status:"created"`, `created:<today>`, and a full `phases` map (every phase `status:"todo"` with its `issueKey` + `name`).

### `start <version>`
1. Transition the Epic → In Progress (`31`).
2. Set `milestones["<version>"].status = "in_progress"`. Preserve `phases`.

### `sync <version>`  (the workhorse)
1. Read `.planning/ROADMAP.md` (authoritative `[x]`/`[ ]` per phase) and `.planning/STATE.md` (`## Current Position` → `Phase: N`).
2. **Create any missing** phase Stories (To Do, parent=epic, assignee) and add them to the mapping.
3. Transition the **active** phase (STATE `Phase: N`) Story → In Progress (`31`); set its mapping status `in_progress`.
4. Transition **every completed** phase (`[x]` in ROADMAP) Story → Done (`41`); set its mapping status `done`.
5. Save `mapping.json` (preserve epic + untouched phases).

### `complete <version>`
1. Transition any phase Stories not already Done → Done (`41`); set their mapping status `done`.
2. Post a comment on the Epic with the milestone-audit summary (from `*-MILESTONE-AUDIT.md` if present).
3. Transition the Epic → Done (`41`).
4. Set `milestones["<version>"].status = "completed"` and `completedDate`. Preserve `phases`.

### `status [version]`
Read `mapping.json`; print the Epic + phase Story table for the version (or all milestones).

## MCP tools

- `mcp__plugin_atlassian_atlassian__createJiraIssue` — Epic + Stories (Story uses `parent`)
- `mcp__plugin_atlassian_atlassian__editJiraIssue` — Epic summary/description/assignee edits
- `mcp__plugin_atlassian_atlassian__transitionJiraIssue` — To Do / In Progress / Done
- `mcp__plugin_atlassian_atlassian__addCommentToJiraIssue` — progress / completion comments
- `mcp__plugin_atlassian_atlassian__getJiraIssue` — verify parent link / status

## Gotchas

- **Account `customfield_10224` must be a plain integer** (`4`), never `{"id":4}` (deserialization error).
- **Stories don't need** `duedate`/`customfield_10553`/`customfield_10224` — keep them minimal.
- New issues start in **Backlog**; transition `2` moves Backlog→To Do, and `41` (Done) is reachable directly from Backlog.
- `parent` links a Story to its Epic here — do **not** look for a separate Epic-Link field.

## Stop-hook integration

`.claude/hooks/jira-milestone-gate.cjs` fires on Stop, reads STATE.md + ROADMAP.md + this mapping, and
nudges `create` / `start` / `sync` / `complete` to keep Jira in lockstep. It is **fail-open** and only
acts on the **current** milestone. **Adaptation note:** the gate derives the milestone's phase count
from ROADMAP (not STATE `total_phases`, which is stale in this repo). Activation lives in gitignored
`.claude/settings.local.json` and loads only at Claude Code session start.
