---
phase: 31-ios-l2-investigation
reviewed: 2026-04-17T00:00:00Z
depth: standard
files_reviewed: 16
files_reviewed_list:
  - docs/_templates/l2-template.md
  - docs/admin-setup-ios/06-compliance-policy.md
  - docs/decision-trees/07-ios-triage.md
  - docs/ios-lifecycle/01-ade-lifecycle.md
  - docs/l1-runbooks/16-ios-apns-expired.md
  - docs/l1-runbooks/17-ios-ade-not-starting.md
  - docs/l1-runbooks/18-ios-enrollment-restriction-blocking.md
  - docs/l1-runbooks/19-ios-license-invalid.md
  - docs/l1-runbooks/20-ios-device-cap-reached.md
  - docs/l1-runbooks/21-ios-compliance-blocked.md
  - docs/l2-runbooks/00-index.md
  - docs/l2-runbooks/14-ios-log-collection.md
  - docs/l2-runbooks/15-ios-ade-token-profile.md
  - docs/l2-runbooks/16-ios-app-install.md
  - docs/l2-runbooks/17-ios-compliance-ca-timing.md
  - scripts/validation/check-phase-31.mjs
findings:
  critical: 0
  warning: 4
  info: 6
  total: 10
status: clean
---

# Phase 31: Code Review Report

**Reviewed:** 2026-04-17
**Depth:** standard
**Files Reviewed:** 16
**Status:** issues_found

## Summary

Phase 31 delivered 4 new iOS L2 runbooks (14-17), a re-injected L2 index section, a prose rewrite to the iOS compliance admin guide, retrofits across 9 L1/lifecycle/triage files, and a focused JS validation harness. Structural quality is strong: the validation harness encodes 30 phase-specific gates, frontmatter is consistent across new runbooks, and the three-class disambiguation pattern in runbook 16 is well-applied.

Issues are limited to four categories: (1) a handful of broken markdown anchor references to section headings that do not exist or whose generated slug does not match the link fragment; (2) one factual inconsistency between the iOS ADE lifecycle narrative and the L2 runbook 15 on ADE token sync cadence ("~hourly" vs "every 12 hours"); (3) a stale `applies_to` enum in the L2 template that does not cover the Apple-platform values already in use; (4) minor harness-code robustness concerns (dead helper, unbalanced split heuristic, missing JSON-parse guard). No security issues. No runtime-crash risks.

## Warnings

### WR-01: Broken anchor — `#section-3-mac-cable-sysdiagnose` does not match GitHub slug

**File:** `docs/ios-lifecycle/01-ade-lifecycle.md:364`
**Issue:** The link target `../l2-runbooks/14-ios-log-collection.md#section-3-mac-cable-sysdiagnose` does not resolve. The heading in 14-ios-log-collection.md line 104 is `## Section 3: Mac+Cable Sysdiagnose`. GitHub's slugger strips the `+` without inserting a hyphen, so the generated anchor is `#section-3-maccable-sysdiagnose` (no hyphen between "mac" and "cable"). The link fragment has a hyphen where one is not generated, so clicking the link will land on the top of `14-ios-log-collection.md` rather than at Section 3.

**Fix:** Either change the link fragment to match the generated slug, or rename the heading so the slug contains the intended hyphen.

Option A (change the link fragment):
```markdown
[Mac+cable sysdiagnose](../l2-runbooks/14-ios-log-collection.md#section-3-maccable-sysdiagnose)
```

Option B (rename the heading to produce a hyphen-friendly slug):
```markdown
## Section 3: Mac Plus Cable Sysdiagnose
```
which slugs to `section-3-mac-plus-cable-sysdiagnose`, then update the link to match.

Option A is the smallest change.

### WR-02: Fabricated section reference "§Post-enrollment diagnostics"

**File:** `docs/l2-runbooks/14-ios-log-collection.md:54` and `docs/l2-runbooks/14-ios-log-collection.md:174`
**Issue:** Both lines refer to `[iOS ADE Lifecycle §Post-enrollment diagnostics](../ios-lifecycle/01-ade-lifecycle.md)` (and line 54 adds `#behind-the-scenes`). `01-ade-lifecycle.md` has no heading called "Post-enrollment diagnostics" — the text appears nowhere in the file. The closest semantic match is the per-stage `### Behind the Scenes` subsection, of which there are seven (one per stage). The `#behind-the-scenes` anchor resolves to Stage 1's `Behind the Scenes`, not the Stage 7 "Ongoing MDM" section that is actually relevant to on-device MDM diagnostic retrieval.

**Fix:** Either add a real anchor to 01-ade-lifecycle.md (preferred, since the concept deserves an identifiable section), or correct both link labels to point at an existing heading:

```markdown
<!-- In 01-ade-lifecycle.md Stage 7 or after the Stage 7 Behind the Scenes, add: -->
### Post-enrollment Diagnostics

<content about on-device MDM diagnostic retrieval>
```

Then the links in 14-ios-log-collection.md resolve via `#post-enrollment-diagnostics`.

Alternative minimal fix — change the link label and anchor to the existing Stage 7 section. Use an HTML anchor so the label can remain descriptive:

```markdown
<!-- In 01-ade-lifecycle.md at the top of Stage 7 Behind the Scenes block: -->
<a id="stage-7-behind-the-scenes"></a>
### Behind the Scenes
```

Then update 14-ios-log-collection.md lines 54 and 174 to point at `#stage-7-behind-the-scenes`.

### WR-03: Broken anchor — `02-abm-token.md#renewal` (actual heading is "Renewal / Maintenance")

**File:** `docs/l1-runbooks/17-ios-ade-not-starting.md:66`
**Issue:** The link `[ABM/ADE Token Guide § Renewal](../admin-setup-ios/02-abm-token.md#renewal)` points to anchor `#renewal`, but `02-abm-token.md` has no `## Renewal` heading — the actual heading at line 102 is `## Renewal / Maintenance`, which GitHub slugs to `#renewal--maintenance` (double hyphen from the slash-with-spaces, or `#renewal-maintenance` on some renderers depending on punctuation-handling). Either way, `#renewal` is not generated.

Sister runbook `16-ios-apns-expired.md:57` uses `01-apns-certificate.md#renewal` and that file has a real `## Renewal` heading at line 60 — so the APNs link is fine. Only the ABM link is broken.

**Fix:** Update the link fragment in line 66 of `17-ios-ade-not-starting.md` to match the actual heading slug:

```markdown
- Renew the ABM/ADE token per [ABM/ADE Token Guide § Renewal / Maintenance](../admin-setup-ios/02-abm-token.md#renewal--maintenance).
```

Or rename the heading in `02-abm-token.md` line 102 to `## Renewal` to align with `01-apns-certificate.md`. The rename is arguably better since it also standardizes heading style across the admin-setup-ios suite.

### WR-04: Factual inconsistency — ADE token sync cadence ("hourly" vs "every 12 hours")

**File:** `docs/l2-runbooks/15-ios-ade-token-profile.md:46,107` and `docs/ios-lifecycle/01-ade-lifecycle.md:150`
**Issue:** The two files disagree on Intune's automatic ADE token sync cadence:
- `01-ade-lifecycle.md` line 150: "Automatic delta sync every 12 hours. Intune syncs device information from ABM automatically once every 12 hours."
- `15-ios-ade-token-profile.md` line 46: "Last sync date — expected ~hourly cadence. Drift > 24 hours is Pattern A territory."
- `15-ios-ade-token-profile.md` line 107: "New ABM-added devices do NOT appear in Intune after 24 hours (normal sync is ~hourly)."

Microsoft's current documented behavior for Intune DEP/ADE onboarding settings is closer to the 12-hour figure (with manual sync available at a 15-minute cooldown and full-sync capped at once per 7 days). The L2 runbook 15 "~hourly" claim is inconsistent with both the sibling lifecycle guide in this same repository and with Microsoft Learn. This is a correctness issue for L2 engineers using the "drift > 24 hours" heuristic — if the real cadence is 12h, "drift > 24 hours" should trigger suspicion only at 2x+ the normal interval, but the runbook implies it's 24x normal, which would under-trigger the Pattern A investigation.

**Fix:** Align both files to the same cadence and cite the authoritative source. Recommended: update `15-ios-ade-token-profile.md` to match the `01-ade-lifecycle.md` figure:

```markdown
<!-- In 15-ios-ade-token-profile.md Step 1: -->
- **Last sync date** — expected ~12-hour cadence (delta sync); manual sync rate-limited to once per 15 min. Drift > 24 hours (i.e., 2+ missed automatic cycles) is Pattern A territory.
```

```markdown
<!-- In 15-ios-ade-token-profile.md Pattern A indicators: -->
- **Indicators:** Intune admin center shows the token as `Expired` OR last sync > 24 hours ago (2+ missed 12-hour cycles) OR Graph `lastSyncErrorCode` != 0.
```

## Info

### IN-01: `applies_to` enum in L2 template is stale

**File:** `docs/_templates/l2-template.md:17`
**Issue:** The template declares `applies_to: APv1 | APv2 | both`, but the repository's actual L2 runbooks use five values: `APv1 | APv2 | both | ADE | all`. The iOS and macOS guides added in Phases 28-31 use `ADE` and `all`, neither of which is in the template's documented enum. A new author copying the template will not know that `ADE` and `all` are valid.

**Fix:** Widen the enum in the template to reflect actual usage:
```markdown
applies_to: APv1 | APv2 | both | ADE | all
```

And update the accompanying instruction comment at line 5 from `Set applies_to to APv1, APv2, or both` to include the new values.

### IN-02: Bare directory link to `../l1-runbooks/` instead of index file

**File:** `docs/l2-runbooks/15-ios-ade-token-profile.md:184`
**Issue:** The link `[iOS L1 Runbooks (16-20)](../l1-runbooks/)` points to a bare directory. GitHub renders this by showing the directory listing. All other inter-index references in the iOS suite use the explicit `00-index.md` form (see `14-ios-log-collection.md:175` and `decision-trees/07-ios-triage.md:93`).

**Fix:**
```markdown
- [iOS L1 Runbooks (16-20)](../l1-runbooks/00-index.md) — L1 escalation sources that route into this runbook: 16 APNs expired, 17 ADE not starting, 18 Enrollment restriction blocking, 19 License invalid (ADE path), 20 Device cap reached.
```

### IN-03: Dead code — `walkMd()` defined but never called

**File:** `scripts/validation/check-phase-31.mjs:21-38`
**Issue:** The `walkMd(dir)` helper is defined but never invoked by any check. `resolveL2Runbooks()` handles the only directory-traversal task. This is leftover scaffolding from an earlier iteration.

**Fix:** Remove the unused helper to reduce maintenance surface. Delete the entire `walkMd` function body (lines 21-38). Alternatively, if future checks need it, add a comment indicating deferred use.

### IN-04: `JSON.parse` lacks a try/catch — invalid JSON crashes the harness

**File:** `scripts/validation/check-phase-31.mjs:113` and `scripts/validation/check-phase-31.mjs:122`
**Issue:** Both V-31-21 and V-31-24 call `JSON.parse(readFile(...) || '{"placeholders":[]}')`. The `||` fallback handles the missing-file case, but if the file EXISTS and contains malformed JSON, `JSON.parse` throws synchronously. The outer `try/catch` around `check.run()` (line 150) does catch the throw, but the resulting "threw: ..." detail is less actionable than a "placeholder-inventory.json is malformed" message, and the throw terminates the check at that point without running the loop that identifies the specific file under scrutiny.

**Fix:** Wrap the parse in a local try/catch with a clear error message:

```javascript
function parseInventory() {
  const raw = readFile('.planning/phases/31-ios-l2-investigation/placeholder-inventory.json');
  if (!raw) return { placeholders: [] };
  try {
    return JSON.parse(raw);
  } catch (err) {
    return { _parseError: err.message, placeholders: [] };
  }
}
```

Then V-31-21 and V-31-24 can short-circuit with `if (inv._parseError) return { pass: false, detail: 'inventory JSON invalid: ' + inv._parseError };`.

### IN-05: V-31-07 pattern-body split heuristic is fragile

**File:** `scripts/validation/check-phase-31.mjs:71`
**Issue:** V-31-07 splits 15-ios-ade-token-profile.md on `^### Pattern [ABCD]:` and asserts each of the 4 bodies contains both "Indicator" and "Resolution". The fourth body (Pattern D) extends from the Pattern D heading to the end of the file, consuming `## Resolution`, `## Escalation Ceiling`, `## Related Resources`, and `## Version History`. The current check passes because those downstream sections happen to contain the word "Resolution". A future edit that moves "Resolution" into a different section name would cause V-31-07 to emit a false negative or, worse, a false positive when the Pattern D body has no actual resolution subheading but still contains the word "Resolution" elsewhere.

**Fix:** Terminate each Pattern body at the next heading of the same or higher level. Use a regex that captures content between one `### Pattern` and the next `### Pattern` OR any `^## `:

```javascript
const pattern = /^### Pattern ([ABCD]):([\s\S]*?)(?=^### Pattern [ABCD]:|^## |$(?![\s\S]))/gm;
const bodies = {};
let match;
while ((match = pattern.exec(c)) !== null) {
  bodies[match[1]] = match[2];
}
const missing = [];
for (const p of ['A','B','C','D']) {
  const body = bodies[p] || '';
  const hasIndicator = /Indicator/i.test(body);
  const hasResolution = /Resolution/i.test(body);
  if (!hasIndicator || !hasResolution) missing.push(`${p}:ind=${hasIndicator}/res=${hasResolution}`);
}
```

### IN-06: Runbook 17 is exactly at the lower line-count bound (V-31-29)

**File:** `scripts/validation/check-phase-31.mjs:137` and `docs/l2-runbooks/17-ios-compliance-ca-timing.md`
**Issue:** V-31-29 bounds for runbook 17 are `[187, 287]`. Actual line count is 187 — at the exact lower bound. Any future deletion of a single line in runbook 17 will cause V-31-29 to fail. This is a "passes today, fails tomorrow" landmine, especially because V-31-29 is marked `required: false` so no CI gate blocks a silent regression.

**Fix:** Either add a line or two of intended content to give a safety margin, or widen the lower bound. Widening the bound is the lower-risk change:

```javascript
const bounds = { '14': [136, 207], '15': [187, 322], '16': [161, 241], '17': [170, 287] };
```

The "±15% of targets" rationale documented in the check name no longer precisely holds after any widening, so consider restating the tolerance in a neighboring comment.

---

_Reviewed: 2026-04-17_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
