# Jira Milestone Skill

Manages Jira epics for Autopilot Documentation Suite GSD phases.

## Commands

| Command | Description |
|---------|-------------|
| `/jira-milestone start <phase>` | Transition phase epic to In Progress |
| `/jira-milestone update <phase>` | Update phase epic with current progress |
| `/jira-milestone complete <phase>` | Transition phase epic to Done |
| `/jira-milestone status` | Show all phase mappings |
| `/jira-milestone create <phase>` | Create epic for a single phase |
| `/jira-milestone create-all` | Create epics for all phases missing an epic key |

## Usage

```bash
/jira-milestone create-all      # Create Jira epics for all 7 phases
/jira-milestone start 6         # Move Phase 6 epic to In Progress
/jira-milestone update 6        # Update Phase 6 epic progress
/jira-milestone complete 6      # Close Phase 6 epic
/jira-milestone status          # List all phase mappings
```

## Workflow

### Create Epic (`create <phase>`)

Create a Jira epic for a phase that doesn't have one yet.

1. Read `.planning/jira/mapping.json` to confirm epicKey is null for the phase
2. Read `.planning/ROADMAP.md` for phase details (goal, requirements, success criteria)
3. Create epic using `mcp__plugin_atlassian_atlassian__createJiraIssue`
4. Store returned epic key in `.planning/jira/mapping.json`
5. If phase is already completed, transition to Done and add completion comment
6. Display created epic link

**Required Parameters:**

```json
{
  "cloudId": "a04fcb6a-ae5a-4f81-95e7-83941226b47b",
  "projectKey": "RTS",
  "issueType": "10000",
  "summary": "Autopilot Docs - Phase N: {name}",
  "description": "{goal and success criteria from ROADMAP.md}",
  "additional_fields": {
    "duedate": "2026-MM-DD",
    "customfield_10553": "2026-MM-DD",
    "customfield_10224": 4,
    "labels": ["autopilot-docs", "v1"]
  }
}
```

**IMPORTANT:** The `customfield_10224` (Account) must be a plain integer (e.g., `4`), NOT an object like `{"id": 4}`. Using an object format will cause a deserialization error.

### Create All Epics (`create-all`)

Bulk create epics for all phases where `epicKey` is null.

1. Read `.planning/jira/mapping.json` to find all phases with null epicKey
2. Read `.planning/ROADMAP.md` for all phase details
3. For each phase missing an epic:
   a. Create the epic using `mcp__plugin_atlassian_atlassian__createJiraIssue`
   b. Update mapping.json with the new epic key
   c. If phase status is "completed", transition to Done
   d. If phase status is "in_progress", transition to In Progress
4. Write updated mapping.json
5. Display summary table of all created epics

### Start Phase (`start <phase>`)

1. Read `.planning/jira/mapping.json` to get epic key for phase number
2. Verify epic exists using `mcp__plugin_atlassian_atlassian__getJiraIssue`
3. Transition to In Progress using `mcp__plugin_atlassian_atlassian__transitionJiraIssue`
4. Update mapping.json with status "in_progress"
5. Add comment noting phase work has started
6. Display confirmation with epic link

**Required Parameters:**

```json
{
  "cloudId": "a04fcb6a-ae5a-4f81-95e7-83941226b47b",
  "issueIdOrKey": "{epicKey}",
  "transition": { "id": "31" }
}
```

### Update Progress (`update <phase>`)

1. Read `.planning/ROADMAP.md` for current phase status
2. Read `.planning/jira/mapping.json` for epic key
3. Calculate progress from GSD plan status if available
4. Add comment to epic using `mcp__plugin_atlassian_atlassian__addCommentToJiraIssue`
5. Display update confirmation

**Comment Format:**

```markdown
## Progress Update - {date}

**Phase {N}: {name}**
**Status**: {status}

### Completed Plans
- Plan {N}-01: {name} - Completed {date}

### In Progress
- Plan {N}-02: {name}

### Remaining
- Plan {N}-03: {name}
```

### Complete Phase (`complete <phase>`)

1. Read `.planning/jira/mapping.json` for epic key
2. Add final comment with completion summary
3. Transition epic to Done using `mcp__plugin_atlassian_atlassian__transitionJiraIssue`
4. Update mapping.json with status "completed" and completion date
5. Display completion confirmation

**Required Parameters for Transition:**

```json
{
  "cloudId": "a04fcb6a-ae5a-4f81-95e7-83941226b47b",
  "issueIdOrKey": "{epicKey}",
  "transition": { "id": "41" }
}
```

### Status (`status`)

1. Read `.planning/jira/mapping.json`
2. Display table of all phases with their epic keys and status

**Output Format:**

```
## Autopilot Docs - Phase Status

| Phase | Name | Epic | Status |
|-------|------|------|--------|
| 1 | Foundation | RTS-??? | completed |
| 2 | Lifecycle | RTS-??? | completed |
| 3 | Error Codes | RTS-??? | completed |
| 4 | L1 Decision Trees | RTS-??? | completed |
| 5 | L1 Runbooks | RTS-??? | completed |
| 6 | L2 Runbooks | — | pending |
| 7 | Navigation | — | pending |
```

---

## Configuration

**Mapping File:** `.planning/jira/mapping.json`

```json
{
  "cloudId": "a04fcb6a-ae5a-4f81-95e7-83941226b47b",
  "projectKey": "RTS",
  "epicIssueTypeId": "10000",
  "labels": ["autopilot-docs", "v1"],
  "requiredFields": {
    "duedate": "YYYY-MM-DD (system field)",
    "customfield_10553": "Epic start date (YYYY-MM-DD)",
    "customfield_10224": "Account ID - integer only (4=New Dev, 5=Maintenance, 6=Small)"
  },
  "transitions": {
    "done": { "id": "41", "name": "Done" },
    "inProgress": { "id": "31", "name": "In Progress" },
    "toDo": { "id": "2", "name": "To Do" },
    "canceled": { "id": "7", "name": "Canceled" },
    "backlog": { "id": "11", "name": "Backlog" }
  },
  "phases": { ... }
}
```

**RTS Project Transition IDs:**

| ID | Name | Target Status | Use For |
|----|------|---------------|---------|
| **41** | **Done** | Done (green) | **Completing phases** |
| 7 | Canceled | Canceled (green) | Abandoned phases |
| 31 | In Progress | In Progress (yellow) | Active work |
| 2 | To Do | To Do (blue) | Not started |
| 11 | Backlog | Backlog (blue) | Deferred work |
| 5 | In Testing | In Testing (yellow) | QA phase |
| 6 | UAT | UAT (yellow) | User acceptance |
| 8 | Ready to Deploy | Ready to Deploy (blue) | Awaiting deployment |

**RTS Project Custom Fields Reference:**

| Custom Field ID | Name | Type | Required |
|-----------------|------|------|----------|
| `customfield_10553` | Epic start date | date | Yes |
| `customfield_10224` | Account | integer | Yes |
| `customfield_10001` | Team | team | No |
| `customfield_10031` | Goals | array | No |

**Account Field Values:**

| ID | Value | Use For |
|----|-------|---------|
| 4 | New Development | New features and phases |
| 5 | Maintenance | Bug fixes and maintenance |
| 6 | Small Demands | Small tasks |

## MCP Tools Used

- `mcp__plugin_atlassian_atlassian__createJiraIssue` - Create epic
- `mcp__plugin_atlassian_atlassian__addCommentToJiraIssue` - Update progress
- `mcp__plugin_atlassian_atlassian__transitionJiraIssue` - Start/complete epic
- `mcp__plugin_atlassian_atlassian__getTransitionsForJiraIssue` - Get available transitions
- `mcp__plugin_atlassian_atlassian__getJiraIssue` - Verify epic exists

## Integration with GSD

| GSD Event | Jira Action |
|-----------|-------------|
| `/gsd:plan-phase` | Run `/jira-milestone start <phase>` |
| `/gsd:execute-phase` completed | Run `/jira-milestone update <phase>` |
| `/gsd:complete-milestone` | Run `/jira-milestone complete` for all phase epics |

**Lifecycle:** Epics stay In Progress until phase completion. Individual plan completion is tracked via comments, not transitions.

## Error Handling

- **Epic already exists**: Prompt to update instead (for `create` command)
- **Epic not found**: Offer to create new one
- **Transition failed**: Show available transitions using `getTransitionsForJiraIssue`
- **Network error**: Retry with backoff

### Common Creation Errors

| Error Message | Cause | Solution |
|---------------|-------|----------|
| `"duedate": "Due date is required."` | Missing duedate field | Add `"duedate": "YYYY-MM-DD"` to additional_fields |
| `"customfield_10553": "Epic start date is required."` | Missing epic start date | Add `"customfield_10553": "YYYY-MM-DD"` to additional_fields |
| `"customfield_10224": "Account is required."` | Missing account field | Add `"customfield_10224": 4` to additional_fields |
| `"Can not deserialize instance of java.lang.Long out of START_OBJECT token"` | Account field passed as object | Use integer `4` not `{"id": 4}` |

### Common Transition Errors

| Error Message | Cause | Solution |
|---------------|-------|----------|
| `"Transition id 'X' is not valid"` | Wrong transition ID | Use ID from transitions table (Done = "41") |
| `"Issue does not exist"` | Wrong issue key | Verify epic key in mapping.json |
| `"It is not on the appropriate status"` | Transition not available from current status | Check current status, may need intermediate transition |

### Troubleshooting Checklist

**For Creation:**
1. **Check required fields**: RTS project requires duedate, customfield_10553, and customfield_10224
2. **Verify field formats**: Dates as "YYYY-MM-DD", Account as plain integer
3. **Use `getJiraIssueTypeMetaWithFields`** to discover project-specific requirements if errors persist

**For Transitions:**
1. **Check transition ID**: Use `"41"` for Done, `"31"` for In Progress
2. **Verify epic exists**: Call `getJiraIssue` first to confirm
3. **Use `getTransitionsForJiraIssue`** to see available transitions from current status
