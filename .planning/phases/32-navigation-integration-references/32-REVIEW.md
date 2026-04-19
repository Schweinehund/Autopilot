---
phase: 32-navigation-integration-references
reviewed: 2026-04-18T00:00:00Z
depth: standard
files_reviewed: 2
files_reviewed_list:
  - docs/quick-ref-l2.md
  - docs/l2-runbooks/14-ios-log-collection.md
findings:
  critical: 0
  warning: 1
  info: 4
  total: 5
status: clean
---

# Phase 32 (Gap Closure 32-09): Code Review Report

**Reviewed:** 2026-04-18
**Depth:** standard
**Files Reviewed:** 2
**Status:** issues_found
**Scope:** `--gaps-only` review of Phase 32 gap closure plan 32-09 (UAT Test 15: AssistiveTouch sysdiagnose). Diff base `b666e0f`.

## Summary

Both files implement the AssistiveTouch-based sysdiagnose procedure correctly per Apple's canonical platform-support guide. The cross-link anchor between `docs/quick-ref-l2.md:224` and `docs/l2-runbooks/14-ios-log-collection.md:104` resolves cleanly (`#section-3-sysdiagnose-trigger-and-file-export` matches the GitHub-slugified heading). Markdown structure is valid: frontmatter YAML parses, table syntax is balanced, blockquote/list/heading hierarchy is intact, and Section 3 correctly reorders subsections without orphaning content. The PII warning blockquote is preserved as required, and the supervised-device compatibility note is present in BOTH files.

One Warning concerns a substantive divergence between the implementation Step 2 wording and the UAT spec's verbatim "tap Custom" language — likely an intentional accuracy improvement by the executor (modern iOS Customize Top Level Menu UI does not present a "Custom" button label) but worth flagging because it crosses a `must_haves.truths` requirement. Four Info items cover stylistic/consistency observations (anchor convention parity, iPad haptic note placement asymmetry, Step 1 wording redundancy, and minor line-break formatting in Step 5).

No security vulnerabilities, broken links within scope, or factual errors detected. Pre-existing broken link in `docs/ios-lifecycle/01-ade-lifecycle.md:364` (`#section-3-mac-cable-sysdiagnose`) is documented as out-of-scope per D-38 additive-only posture and not flagged here.

## Warnings

### WR-01: Step 2 "Customize Top Level Menu" wording diverges from UAT verbatim spec ("tap Custom")

**Files:**
- `docs/quick-ref-l2.md:221`
- `docs/l2-runbooks/14-ios-log-collection.md:122`

**Issue:** The UAT root_cause spec (32-UAT.md:174 and :189) and the plan's must_have requirement (32-09-PLAN.md must_haves.truths #5) prescribe Step 2 verbatim as: `Customize Top Level Menu > tap Custom > select Analytics`. The implementation in BOTH files instead reads `Customize Top Level Menu > tap an icon (or tap + to add a new slot) > select Analytics`. The phrase "tap Custom" — which is the verbatim Apple Support guide instruction per the URL cited — is absent.

This is a substantive content change from the canonical procedure, not just a paraphrase. Two scenarios:
- **(a) If the executor intentionally rewrote** because modern iOS UIs no longer label a "Custom" button (the Customize Top Level Menu shows icon slots and a + button) — the rewrite is arguably more accurate than the UAT spec. But this judgment call is undocumented; nothing in the file or in 32-09-SUMMARY.md flags the deviation.
- **(b) If the executor inadvertently paraphrased** the spec — the Step 2 wording no longer reproduces Apple's documented click path verbatim, which weakens the "Authoritative source" claim immediately above it.

Either way, the Apple Support URL is cited as the authoritative reference but the procedure now differs from the spec drawn from that URL. This may surface again at the next `review_by: 2026-07-17` verification cycle when an L2 cross-checks against Apple's page.

**Fix:** Reconcile against the live Apple Support URL (`https://support.apple.com/guide/platform-support/use-diagnostics-to-research-device-issues-supd3f43814e/web`). Two acceptable resolutions:

Option A — restore UAT-verbatim wording:
```markdown
2. **Add Analytics to the AssistiveTouch top-level menu:** Settings > Accessibility > Touch > AssistiveTouch > Customize Top Level Menu > tap **Custom** > select **Analytics**.
```

Option B — keep current wording but document the deviation in 32-09-SUMMARY.md and add an inline annotation:
```markdown
2. **Add Analytics to the AssistiveTouch top-level menu:** Settings > Accessibility > Touch > AssistiveTouch > Customize Top Level Menu > tap an icon slot (the "Custom" button referenced in older Apple Support phrasings) or tap **+** to add a new slot > select **Analytics**.
```

Option B is preferred if the executor verified against the live Apple Support page that "Custom" is no longer a UI label.

## Info

### IN-01: iPad-silence note placement is inconsistent between the two files

**Files:**
- `docs/quick-ref-l2.md:218` (inline parenthetical: "Device begins background sysdiagnose generation (~10 minutes; no haptic feedback on iPad)")
- `docs/l2-runbooks/14-ios-log-collection.md:124-126` (separate blockquote: "iPad silence: iPad does NOT provide haptic feedback...")

**Issue:** Both files convey the same information (iPad has no haptic feedback on sysdiagnose trigger) but at different prominence levels. The runbook uses an indented warning blockquote within Step 3; the quick-ref uses a parenthetical aside. This is intentional given the audience differences (quick-ref vs full runbook) but a reader who reads both may wonder if the runbook's emphasis indicates the quick-ref is missing detail.

**Fix:** No change required — the asymmetry is appropriate for the format. If a future revision aligns them, consider adding `(see runbook for caveats)` to the quick-ref's parenthetical.

### IN-02: Step 1 wording redundantly repeats "AssistiveTouch" in both quick-ref and runbook

**Files:**
- `docs/quick-ref-l2.md:216` ("toggle ON")
- `docs/l2-runbooks/14-ios-log-collection.md:120` ("toggle **AssistiveTouch** to ON")

**Issue:** The runbook says "toggle **AssistiveTouch** to ON" — the word "AssistiveTouch" is redundant here because the navigation path immediately preceding ends in `> AssistiveTouch >`. The quick-ref uses the cleaner "toggle ON" phrasing.

**Fix:** Cosmetic only. Optional alignment in the runbook:
```markdown
1. **Enable AssistiveTouch:** Settings > Accessibility > Touch > AssistiveTouch > toggle ON. A small floating on-screen button appears.
```

### IN-03: Step 5 sub-bullets in quick-ref vs runbook diverge in granularity

**Files:**
- `docs/quick-ref-l2.md:220` (single-line: "send via AirDrop, Email, iCloud, Files.app, or any installed share extension")
- `docs/l2-runbooks/14-ios-log-collection.md:130-134` (4 itemized sub-bullets with size/scenario notes)

**Issue:** This is by design (quick-ref summarizes; runbook details), but the quick-ref omits the size threshold guidance ("Mail / Messages — works for smaller bundles (<25 MB typical)") that may be operationally useful even at quick-ref level. An L2 reading only the quick-ref might attempt Mail for a 200 MB sysdiagnose and fail.

**Fix:** Optional one-line addendum in `docs/quick-ref-l2.md:220`:
```markdown
5. **Export from device:** tap the sysdiagnose file > tap the share button (top-right) > send via AirDrop, Email, iCloud, Files.app, or any installed share extension. (For bundles >25 MB, prefer AirDrop or iCloud over Mail.)
```

### IN-04: Pre-existing broken cross-link in `docs/ios-lifecycle/01-ade-lifecycle.md:364` is now stale-by-naming as well as broken-by-anchor

**File:** `docs/ios-lifecycle/01-ade-lifecycle.md:364` (out of scope for this review — flagged for awareness only)

**Issue:** Per `<context>` and 32-09-PLAN.md the pre-existing 85 broken links in `docs/` are out-of-scope per D-38. However, this specific link is now BOTH broken (anchor `#section-3-mac-cable-sysdiagnose` does not exist — was always broken) AND named with stale framing ("Mac+cable sysdiagnose" is no longer the primary procedure; AssistiveTouch is). When this link is eventually fixed in a future phase, both the anchor AND the link text should be updated:

Current:
```markdown
- For advanced investigation: [Mac+cable sysdiagnose](../l2-runbooks/14-ios-log-collection.md#section-3-mac-cable-sysdiagnose)
```

Future fix (out-of-scope here, just for record):
```markdown
- For advanced investigation: [On-device sysdiagnose](../l2-runbooks/14-ios-log-collection.md#section-3-sysdiagnose-trigger-and-file-export)
```

**Fix:** Out of scope for plan 32-09 per D-38. Recommend tracking in Phase 33 link-cleanup backlog or in the existing 85-broken-link Phase 32 baseline notes.

---

## Verification of Required Properties

| Property | Status | Notes |
|----------|--------|-------|
| Apple Support URL cited verbatim | PASS | Both files cite `https://support.apple.com/guide/platform-support/use-diagnostics-to-research-device-issues-supd3f43814e/web` |
| 5-step AssistiveTouch procedure present | PASS | Both files; quick-ref compact, runbook detailed |
| Cross-link anchor matches between files | PASS | `#section-3-sysdiagnose-trigger-and-file-export` resolves to H2 at runbook line 104 |
| PII warning preserved (Section 3) | PASS | `docs/l2-runbooks/14-ios-log-collection.md:158` blockquote intact |
| Supervised-device compatibility note | PASS | Present in both files (`quick-ref-l2.md:222`, `14-ios-log-collection.md:136`) |
| Frontmatter YAML valid | PASS | Both files parse cleanly; `last_verified: 2026-04-18`, `review_by: 2026-07-17` |
| Markdown table/list/heading syntax | PASS | No malformed tables, orphaned subsections, or broken hierarchy |
| Section 3 H2 → H3 → list hierarchy | PASS | Prerequisites / 5-Step / Supervised note / Alternative subsections nest correctly |
| Mac+cable demoted to alternative | PASS | `docs/l2-runbooks/14-ios-log-collection.md:138` heading reads "Alternative: Mac+Cable Console.app Live Streaming" |
| Tier-3 references in Common Artifacts table still valid | PASS | `docs/l2-runbooks/14-ios-log-collection.md:169` references Tier 3 sysdiagnose `.tar.gz` — terminology still accurate |
| Step 2 "tap Custom" verbatim per UAT spec | FAIL (Warning WR-01) | Both files paraphrase as "tap an icon (or +)" instead of "tap Custom" |
| Phase 30 D-32 / Phase 31 D-31 markers preserved | PASS | Other 2 iOS tables retain research-flag footnotes |
| No collateral edits to other sections | PASS | Windows/APv2/macOS sections in quick-ref-l2 and Sections 1/2/Common Artifacts in 14-ios-log-collection unchanged |

---

_Reviewed: 2026-04-18_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
_Scope: gaps-only (Phase 32 gap closure 32-09 — UAT Test 15)_
