---
phase: 33-v13-gap-closure
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - docs/ios-lifecycle/01-ade-lifecycle.md
autonomous: true
requirements: [LIFE-02]
must_haves:
  truths:
    - "A reader of docs/ios-lifecycle/01-ade-lifecycle.md line 364 following the 'Mac+cable sysdiagnose' link lands on the correct ## Section 3 heading in 14-ios-log-collection.md (not the top of the file)"
    - "Zero occurrences of the stale anchor slug `#section-3-mac-cable-sysdiagnose` remain anywhere in docs/"
    - "The current anchor slug `#section-3-sysdiagnose-trigger-and-file-export` is present exactly where the stale slug used to be at line 364"
    - "No other content on line 364 is changed — only the anchor fragment substring is replaced (link text 'Mac+cable sysdiagnose' and surrounding prose remain byte-identical)"
  artifacts:
    - path: "docs/ios-lifecycle/01-ade-lifecycle.md"
      provides: "LIFE-02 L2 handoff link now resolves to the renamed Section 3 heading in 14-ios-log-collection.md"
  key_links:
    - from: "docs/ios-lifecycle/01-ade-lifecycle.md (line 364)"
      to: "docs/l2-runbooks/14-ios-log-collection.md#section-3-sysdiagnose-trigger-and-file-export"
      via: "Inline markdown link with text 'Mac+cable sysdiagnose'"
      pattern: "14-ios-log-collection\\.md#section-3-sysdiagnose-trigger-and-file-export"
---

<objective>
Fix the single-line I-1 anchor drift in `docs/ios-lifecycle/01-ade-lifecycle.md:364`. The heading `## Section 3: Mac+Cable Sysdiagnose` in `docs/l2-runbooks/14-ios-log-collection.md` was renamed during Phase 32 plan 32-09 (UAT Test 15 gap closure) to `## Section 3: Sysdiagnose Trigger and File Export`. The sibling reference in `docs/quick-ref-l2.md` was updated atomically with the rename; this one occurrence in `01-ade-lifecycle.md` was missed.

Output: One character-level edit on line 364 of `docs/ios-lifecycle/01-ade-lifecycle.md` — substring `#section-3-mac-cable-sysdiagnose` replaced with `#section-3-sysdiagnose-trigger-and-file-export`. Nothing else on the line changes.

This plan is Wave 1 and has no dependencies. It runs in parallel with Plan 33-02 (admin-setup-ios retrofit) because the two plans modify disjoint file sets.
</objective>

<execution_context>
@$HOME/.claude/get-shit-done/workflows/execute-plan.md
@$HOME/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/PROJECT.md
@.planning/STATE.md
@.planning/v1.3-MILESTONE-AUDIT.md
@.planning/phases/32-navigation-integration-references/32-VERIFICATION.md

<interfaces>
<!-- Exact current state of line 364 (captured at plan time) -->

Line 364 of `docs/ios-lifecycle/01-ade-lifecycle.md` currently reads:

```
  - For advanced investigation: [Mac+cable sysdiagnose](../l2-runbooks/14-ios-log-collection.md#section-3-mac-cable-sysdiagnose) -- see also [ADE Token & Profile Delivery Investigation](../l2-runbooks/15-ios-ade-token-profile.md) for Pattern A-D token-sync context
```

After this plan, line 364 MUST read:

```
  - For advanced investigation: [Mac+cable sysdiagnose](../l2-runbooks/14-ios-log-collection.md#section-3-sysdiagnose-trigger-and-file-export) -- see also [ADE Token & Profile Delivery Investigation](../l2-runbooks/15-ios-ade-token-profile.md) for Pattern A-D token-sync context
```

Change: exact substring `#section-3-mac-cable-sysdiagnose` → `#section-3-sysdiagnose-trigger-and-file-export`. Link text `Mac+cable sysdiagnose` is preserved verbatim (it still describes the procedure accurately; Phase 32 plan 32-09 kept the same link text in `quick-ref-l2.md` after renaming the anchor). The second link in the line (to `15-ios-ade-token-profile.md`) is untouched.

The renamed heading in the target file `docs/l2-runbooks/14-ios-log-collection.md` was verified present at Phase 32 32-VERIFICATION.md (Key Link Verification row, 2026-04-18): `grep -c "^## Section 3: Sysdiagnose Trigger and File Export" docs/l2-runbooks/14-ios-log-collection.md` returns 1; the old `## Section 3: Mac+Cable Sysdiagnose` heading count is 0.
</interfaces>
</context>

<tasks>

<task type="auto" tdd="false">
  <name>Task 1: Fix I-1 anchor fragment on line 364 of 01-ade-lifecycle.md</name>
  <read_first>
    - docs/ios-lifecycle/01-ade-lifecycle.md (the file being modified — read lines 355-370 to see line 364 in context and confirm the current anchor is still `#section-3-mac-cable-sysdiagnose` before editing; if the file has drifted and the anchor is already correct, this task is a no-op — in that case, STILL verify and exit zero)
    - docs/l2-runbooks/14-ios-log-collection.md (the target file — grep for `^## Section 3: Sysdiagnose Trigger and File Export` to confirm the heading exists at the new slug; this was verified by Phase 32 32-VERIFICATION.md but must be re-confirmed at execute time in case of unrelated drift)
    - .planning/v1.3-MILESTONE-AUDIT.md § "I-1 — Broken anchor" (audit source-of-truth: describes the single-line fix and the Phase 32 plan 32-09 rename event that caused the drift)
    - .planning/phases/32-navigation-integration-references/32-VERIFICATION.md § "D-38 Additive-Only Posture" (explains why this one occurrence was left out-of-scope by plan 32-09 and is now owed to Phase 33)
  </read_first>
  <behavior>
    - After task completes: line 364 of `docs/ios-lifecycle/01-ade-lifecycle.md` contains the exact substring `#section-3-sysdiagnose-trigger-and-file-export` and does NOT contain the stale substring `#section-3-mac-cable-sysdiagnose`
    - The link text on line 364 is still `Mac+cable sysdiagnose` (byte-identical — only the anchor fragment changed)
    - No other lines in `docs/ios-lifecycle/01-ade-lifecycle.md` are touched (the `git diff` for this file shows exactly one line changed, namely line 364)
    - `grep -rn "#section-3-mac-cable-sysdiagnose" docs/` returns zero matches globally (full repo check — this was the only remaining occurrence per the audit)
    - The link resolves when followed: the target file `docs/l2-runbooks/14-ios-log-collection.md` contains a heading whose slug matches `#section-3-sysdiagnose-trigger-and-file-export` (confirmed by Phase 32 audit)
  </behavior>
  <action>
    1. Read `docs/ios-lifecycle/01-ade-lifecycle.md` around line 364 (offset 355, limit 15) to confirm the current state matches the interfaces block above: the substring `#section-3-mac-cable-sysdiagnose` appears within the markdown link `[Mac+cable sysdiagnose](...)` on that line.

    2. Apply a single-line character-level replacement on line 364:
       - Find: `#section-3-mac-cable-sysdiagnose`
       - Replace with: `#section-3-sysdiagnose-trigger-and-file-export`
       - Everything else on the line (including the link text `Mac+cable sysdiagnose`, the surrounding prose `For advanced investigation: `, the second link `[ADE Token & Profile Delivery Investigation](../l2-runbooks/15-ios-ade-token-profile.md)`, and the trailing ` for Pattern A-D token-sync context`) is preserved byte-identical.

    3. Verify the edit landed: re-read line 364 and confirm (a) presence of `#section-3-sysdiagnose-trigger-and-file-export`, (b) absence of `#section-3-mac-cable-sysdiagnose`, (c) link text still reads `Mac+cable sysdiagnose`.

    4. Run repo-wide grep to confirm no other occurrences of the stale slug remain anywhere in `docs/`.

    **Do NOT:**
    - Change the link text `Mac+cable sysdiagnose` — only the anchor fragment changes; the link text is factually still accurate (the procedure is still documented as a Mac+cable option within the renamed section)
    - Touch any other line of the file (no "while I'm here" edits to prose, headings, frontmatter, Version History, etc.)
    - Bump `last_verified` in the frontmatter — this is a pure anchor-currency fix; no review of the content occurred
    - Consider this task blocked if the target heading is missing (it was confirmed present by Phase 32 verification and re-verified in `<read_first>` above); if the target heading genuinely does not exist at execute time, escalate to the user — do NOT point the anchor at a non-existent target

    **If the file has drifted** (e.g., the stale anchor has already been fixed by a prior run or an unrelated commit), perform the grep in step 4 to confirm zero occurrences of the stale slug remain, skip the edit, and note in the SUMMARY that the fix was already present. This is a valid idempotent no-op outcome.
  </action>
  <verify>
    <automated>grep -c "#section-3-mac-cable-sysdiagnose" docs/ios-lifecycle/01-ade-lifecycle.md</automated>
  </verify>
  <acceptance_criteria>
    - `grep -c "#section-3-mac-cable-sysdiagnose" docs/ios-lifecycle/01-ade-lifecycle.md` outputs `0`
    - `grep -c "#section-3-sysdiagnose-trigger-and-file-export" docs/ios-lifecycle/01-ade-lifecycle.md` outputs at least `1` (the fixed anchor)
    - `grep -rn "#section-3-mac-cable-sysdiagnose" docs/` outputs NOTHING (zero matches across the whole docs/ tree — confirms this was the only remaining occurrence)
    - `sed -n '364p' docs/ios-lifecycle/01-ade-lifecycle.md` contains the substrings `Mac+cable sysdiagnose` AND `#section-3-sysdiagnose-trigger-and-file-export` AND `15-ios-ade-token-profile.md` (confirms link text preserved AND second link untouched)
    - `git diff --stat docs/ios-lifecycle/01-ade-lifecycle.md` shows exactly 1 insertion and 1 deletion (a single-line edit — no collateral changes)
    - `grep -c "^## Section 3: Sysdiagnose Trigger and File Export" docs/l2-runbooks/14-ios-log-collection.md` outputs `1` (confirms the anchor target still exists in the target file — not a regression)
  </acceptance_criteria>
  <done>
    Line 364 of `docs/ios-lifecycle/01-ade-lifecycle.md` now links to the current Section 3 slug. No stale slug remains anywhere in `docs/`. File diff is exactly one line changed. Commit with message `docs(33): fix I-1 anchor drift in 01-ade-lifecycle.md:364`.
  </done>
</task>

</tasks>

<threat_model>
## Trust Boundaries

| Boundary | Description |
|----------|-------------|
| Public documentation | Anchor-fragment substitution; no runtime exposure; no auth/data/PII concerns |

## STRIDE Threat Register

| Threat ID | Category | Component | Disposition | Mitigation Plan |
|-----------|----------|-----------|-------------|-----------------|
| T-33-01-01 | Integrity | Anchor-to-heading slug mismatch | mitigate | Verify target heading `## Section 3: Sysdiagnose Trigger and File Export` exists in `docs/l2-runbooks/14-ios-log-collection.md` before AND after the fix (confirmed present at Phase 32 verification 2026-04-18) |
| T-33-01-02 | Integrity | Collateral edit to surrounding prose | mitigate | Task discipline: single-substring replacement; acceptance criterion `git diff --stat` = 1 insertion + 1 deletion; executor pauses if diff exceeds single-line scope |
</threat_model>

<verification>
1. `grep -c "#section-3-mac-cable-sysdiagnose" docs/ios-lifecycle/01-ade-lifecycle.md` = 0
2. `grep -rn "#section-3-mac-cable-sysdiagnose" docs/` returns nothing
3. `sed -n '364p' docs/ios-lifecycle/01-ade-lifecycle.md` contains both `Mac+cable sysdiagnose` (link text) and `#section-3-sysdiagnose-trigger-and-file-export` (fixed anchor)
4. `git diff --stat HEAD~1 docs/ios-lifecycle/01-ade-lifecycle.md` shows a 1-insertion / 1-deletion change (no collateral)
5. `grep -c "^## Section 3: Sysdiagnose Trigger and File Export" docs/l2-runbooks/14-ios-log-collection.md` = 1 (target heading confirmed present)
</verification>

<success_criteria>
- [x] Stale anchor slug `#section-3-mac-cable-sysdiagnose` eliminated from `docs/ios-lifecycle/01-ade-lifecycle.md`
- [x] Current anchor slug `#section-3-sysdiagnose-trigger-and-file-export` present on line 364
- [x] Link text `Mac+cable sysdiagnose` preserved byte-identical
- [x] No collateral edits (single-line diff)
- [x] Zero stale-slug occurrences anywhere in `docs/` (confirms this was the only remaining instance per the audit)
- [x] Atomic commit `docs(33): fix I-1 anchor drift in 01-ade-lifecycle.md:364`
</success_criteria>

<output>
After completion, create `.planning/phases/33-v13-gap-closure/33-01-SUMMARY.md` with:
- Line 364 state BEFORE and AFTER (verbatim, to confirm single-substring change)
- Global grep count for stale slug (must be 0 after; was 1 before per audit)
- Commit hash
- Confirmation that `docs/l2-runbooks/14-ios-log-collection.md` Section 3 heading still exists and resolves
</output>
</content>
</invoke>