---
phase: 30-ios-l1-triage-runbooks
plan: 08
type: execute
wave: 3
depends_on: [30-02, 30-03, 30-04, 30-05, 30-06, 30-07]
files_modified:
  - docs/decision-trees/00-initial-triage.md
  - docs/l1-runbooks/00-index.md
autonomous: true
requirements: [L1TS-01, L1TS-02]
must_haves:
  truths:
    - "An L1 agent landing on 00-initial-triage.md sees an iOS/iPadOS banner pointing to 07-ios-triage.md, matching the existing macOS banner pattern at line 9 (D-04)"
    - "00-initial-triage.md's Mermaid graph is UNCHANGED — no iOS decision nodes, no TRD renumbering (D-05 non-negotiable)"
    - "00-index.md has a new '## iOS L1 Runbooks' H2 section after the existing '## macOS ADE Runbooks' section, listing runbooks 16-21 with 3-column `# | Runbook | When to Use` format (D-23)"
    - "Version History entries are added to BOTH files reflecting the 2026-04-17 Phase 30 ship date"
    - "All pre-existing links (Windows APv1, APv2, macOS) in both files continue to work — Nav-integration is additive only"
  artifacts:
    - path: "docs/decision-trees/00-initial-triage.md"
      provides: "Cross-platform triage router with Windows APv1 (primary), APv2, macOS, AND NOW iOS banner"
      contains_all:
        - "> **iOS/iPadOS:** For iOS/iPadOS troubleshooting, see [iOS Triage](07-ios-triage.md)."
        - "[iOS Triage](07-ios-triage.md) — iOS/iPadOS failure routing"
    - path: "docs/l1-runbooks/00-index.md"
      provides: "L1 runbooks index with APv1 / APv2 / macOS ADE / NEW iOS sections"
      contains_all:
        - "## iOS L1 Runbooks"
        - "16-ios-apns-expired.md"
        - "17-ios-ade-not-starting.md"
        - "18-ios-enrollment-restriction-blocking.md"
        - "19-ios-license-invalid.md"
        - "20-ios-device-cap-reached.md"
        - "21-ios-compliance-blocked.md"
        - "[iOS Triage Decision Tree](../decision-trees/07-ios-triage.md)"
  key_links:
    - from: "docs/decision-trees/00-initial-triage.md banner"
      to: "docs/decision-trees/07-ios-triage.md"
      via: "Line 10 banner + Scenario Trees list entry + See Also footer"
      pattern: "07-ios-triage"
    - from: "docs/l1-runbooks/00-index.md iOS section"
      to: "6 new runbook files created in Wave 2"
      via: "Markdown table with runbook filenames as relative links"
      pattern: "1[6-9]-ios-.*\\.md|2[0-1]-ios-.*\\.md"
---

<objective>
Add iOS navigation entry points into the two shared navigation files per D-04, D-05, D-06 (initial-triage banner only — NO mermaid changes) and D-23 (index iOS section). Minimal surgical edits — NOT full rewrites.

Wave 3 — depends on Plans 30-02 through 30-07 landing first (all 6 runbook files + the triage tree must exist before the index can table-link them and before the banner can point to the triage tree).

Output: Two modified navigation files (00-initial-triage.md + 00-index.md).
</objective>

<execution_context>
@$HOME/.claude/get-shit-done/workflows/execute-plan.md
@$HOME/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/PROJECT.md
@.planning/phases/30-ios-l1-triage-runbooks/30-CONTEXT.md
@.planning/phases/30-ios-l1-triage-runbooks/30-PATTERNS.md
@.planning/phases/30-ios-l1-triage-runbooks/30-RESEARCH.md

<interfaces>
<!-- TARGET FILE 1: docs/decision-trees/00-initial-triage.md -->

Current line 8-9 (source — do NOT modify line 8; insert a new line 10 after line 9):
```
> **Version gate:** This guide covers Windows Autopilot (classic). For Device Preparation (APv2), see [APv1 vs APv2 disambiguation](../apv1-vs-apv2.md).
> **macOS:** For macOS ADE troubleshooting, see [macOS ADE Triage](06-macos-triage.md).
```

Insert AFTER line 9 as new line 10 (D-04 verbatim wording from CONTEXT.md Specifics line 255):
```
> **iOS/iPadOS:** For iOS/iPadOS troubleshooting, see [iOS Triage](07-ios-triage.md).
```

Current Scenario Trees list (lines 31-36):
```
- [ESP Failure Tree](01-esp-failure.md) — [ESP](../_glossary.md#esp) (Enrollment Status Page) stuck or showing errors
- [Profile Assignment Tree](02-profile-assignment.md) — No profile assigned or wrong profile applied to device
- [TPM Attestation Tree](03-tpm-attestation.md) — [TPM](../_glossary.md#tpm) errors during pre-provisioning or self-deploying mode
- [APv2 Device Preparation Triage](04-apv2-triage.md) — APv2 (Device Preparation) deployment failure routing
```

Append after line 36 (new entry matches pattern "[Name] — description" style):
```
- [iOS Triage](07-ios-triage.md) — iOS/iPadOS failure routing
```

Current See Also footer (lines 114-116):
```
## See Also

- [APv2 Device Preparation Triage](04-apv2-triage.md) -- For APv2 (Device Preparation) deployment failures
```

Append after the APv2 See Also entry (note `-- For` wording matches existing pattern):
```
- [iOS Triage](07-ios-triage.md) -- For iOS/iPadOS (Intune-managed) deployment failures
- [macOS ADE Triage](06-macos-triage.md) -- For macOS ADE (Intune-managed) deployment failures
```

**Note:** The macOS See Also entry is being added NOW as a parity restoration — the macOS banner (line 9) exists but the corresponding See Also entry never landed. Adding it here is a small-scope improvement that keeps the See Also consistent with the top-of-file banners. This is a fair scope addition per CONTEXT.md Specifics line 255 rule "consistency with shipped macOS banner is the point."

Current bottom Scenario Trees list (lines 120-124):
```
**Scenario Trees:**
- [ESP Failure Tree](01-esp-failure.md)
- [Profile Assignment Tree](02-profile-assignment.md)
- [TPM Attestation Tree](03-tpm-attestation.md)
- [APv2 Device Preparation Triage](04-apv2-triage.md)
```

Append at the end:
```
- [iOS Triage](07-ios-triage.md)
```

Frontmatter bump (lines 1-4):
- Line 2 `last_verified: 2026-04-13` → `last_verified: 2026-04-17`
- Line 3 `review_by: 2026-07-12` → `review_by: 2026-07-16`

Version History row — insert new row ABOVE the existing 2026-04-14 row (chronological descending order matches the file's existing pattern):
```
| 2026-04-17 | Added iOS/iPadOS triage cross-reference banner | -- |
```

**HARD CONSTRAINT (D-05):** Do NOT modify the Mermaid block (currently lines 40-82 — `graph TD` block). Do NOT add `IOS1` or any iOS nodes. Do NOT renumber TRD1-TRD6 IDs. Do NOT change `applies_to: APv1` in frontmatter.

---

<!-- TARGET FILE 2: docs/l1-runbooks/00-index.md -->

Current section sequence in 00-index.md:
- H2 `## APv1 Runbooks` (line 15) — table of 5 runbooks (1-5)
- H2 `## APv2 Runbooks` (line 25) — table of 4 runbooks (6-9)
- H2 `## macOS ADE Runbooks` (line 36) — table of 6 runbooks (10-15)
- H2 `## Scope` (line 49)
- H2 `## TPM Attestation Note` (line 53)
- H2 `## Related Resources` (line 57)
- Version History (bottom)

D-23 insertion point: NEW H2 `## iOS L1 Runbooks` after `## macOS ADE Runbooks` section (after line 47 — the last macOS runbook row — before line 49 `## Scope`).

iOS section content (verbatim from 30-PATTERNS.md § "docs/l1-runbooks/00-index.md"):
```markdown
## iOS L1 Runbooks

Scripted procedures for iOS/iPadOS Intune enrollment and compliance failure scenarios. Each runbook provides portal-only instructions using Intune admin center, Apple Business Manager, and (for licensing) Microsoft 365 admin center. Start with the [iOS Triage Decision Tree](../decision-trees/07-ios-triage.md) to identify which runbook applies.

| # | Runbook | When to Use |
|---|---------|-------------|
| 16 | [APNs Certificate Expired](16-ios-apns-expired.md) | ALL iOS/iPadOS/macOS device MDM check-ins stopped; enrollment attempts fail with APNSCertificateNotValid / NoEnrollmentPolicy / AccountNotOnboarded |
| 17 | [ADE Not Starting](17-ios-ade-not-starting.md) | Supervised ADE enrollment never reaches Intune, or Setup Assistant stalls on the enrollment step |
| 18 | [Enrollment Restriction Blocking](18-ios-enrollment-restriction-blocking.md) | Tenant-level enrollment restriction blocks user enrollment by platform, ownership, or enrollment type |
| 19 | [License Invalid](19-ios-license-invalid.md) | User sees "User Name Not Recognized" at enrollment, or enrollment silently fails with no MDM profile download |
| 20 | [Device Cap Reached](20-ios-device-cap-reached.md) | Enrollment fails with `DeviceCapReached` or misleading "Company Portal Temporarily Unavailable" message |
| 21 | [Compliance Blocked / Access Denied](21-ios-compliance-blocked.md) | Device enrolled but user cannot access Microsoft 365 resources; CA gap, policy mismatch, or default "Not compliant" posture |
```

Related Resources footer (current lines 57-65) — append iOS triage reference after the existing macOS triage entry (line 61):
```
- [iOS Triage Decision Tree](../decision-trees/07-ios-triage.md) -- iOS/iPadOS failure routing
```

**Optional — MAM-WE advisory note (Claude's discretion per CONTEXT.md § Claude's Discretion final bullet):** Consider adding a parallel "No L1 runbook for MAM-WE Failures (iOS)" note mirroring the existing `## TPM Attestation Note` advisory at lines 53-55. Pattern:
```markdown
## MAM-WE Note (iOS)

> **Note:** There is no L1 runbook for MAM Without Enrollment (MAM-WE) failures on iOS — PIN loop, app protection not applying, selective wipe failures. These are deferred to the ADDTS-01 future milestone. See [iOS L2 Runbooks (Phase 31)](../l2-runbooks/00-index.md) for L2 investigation guidance when Phase 31 ships.
```

Add this only if it fits naturally in the file structure (between iOS section and Scope, OR between TPM Attestation Note and Related Resources). If inclusion feels forced or introduces visual noise, OMIT per Claude's discretion — the deferred-idea is already documented in CONTEXT.md/research and this note is a "nice-to-have" per CONTEXT.md Claude's discretion bullet.

Version History (current lines 69-75) — prepend new row above the 2026-04-14 row:
```
| 2026-04-17 | Added iOS L1 runbook section (runbooks 16-21) | -- |
```

Frontmatter bump — line 2 `last_verified: 2026-04-13` → `last_verified: 2026-04-17`; line 3 `review_by: 2026-07-12` → `review_by: 2026-07-16`.
</interfaces>
</context>

<tasks>

<task type="auto" tdd="false">
  <name>Task 1: Add iOS banner and navigation references to 00-initial-triage.md (D-04, D-05, D-06 — banner-only, no Mermaid changes)</name>
  <read_first>
    - docs/decision-trees/00-initial-triage.md (full file — confirm current state: line 9 macOS banner, line 36 APv2 scenario entry, line 116 See Also APv2 entry, line 124 scenario-tree footer, line 130/131/132 Version History rows)
    - docs/decision-trees/07-ios-triage.md (verify Wave 1 output exists — this edit creates a link to a live file)
    - .planning/phases/30-ios-l1-triage-runbooks/30-CONTEXT.md § D-04, D-05, D-06, Specifics line 255 (locked wording)
    - .planning/phases/30-ios-l1-triage-runbooks/30-PATTERNS.md § "docs/decision-trees/00-initial-triage.md (MODIFY...)" — exact insertion-point mapping
  </read_first>
  <behavior>
    - Line 10 contains exactly: `> **iOS/iPadOS:** For iOS/iPadOS troubleshooting, see [iOS Triage](07-ios-triage.md).`
    - Scenario Trees list gains ONE new entry at the end: `- [iOS Triage](07-ios-triage.md) — iOS/iPadOS failure routing`
    - See Also footer gains TWO new entries (iOS AND the macOS-parity restoration) following the APv2 entry
    - Bottom Scenario Trees footer list gains ONE new entry: `- [iOS Triage](07-ios-triage.md)`
    - Frontmatter last_verified = 2026-04-17, review_by = 2026-07-16
    - New Version History row 2026-04-17 inserted above the 2026-04-14 row
    - **MERMAID BLOCK UNCHANGED** — zero modifications inside ```mermaid ... ``` fence. `applies_to: APv1` stays. TRD1-TRD6 IDs unchanged.
  </behavior>
  <action>
    Perform five surgical edits to `docs/decision-trees/00-initial-triage.md`. Do NOT rewrite the file wholesale.

    **Edit 1 — Frontmatter bump (lines 2-3):**
    - `last_verified: 2026-04-13` → `last_verified: 2026-04-17`
    - `review_by: 2026-07-12` → `review_by: 2026-07-16`

    **Edit 2 — Insert line 10 banner (AFTER the existing line 9 macOS banner):**
    Add exactly: `> **iOS/iPadOS:** For iOS/iPadOS troubleshooting, see [iOS Triage](07-ios-triage.md).`

    Wording is LOCKED per CONTEXT.md Specifics line 255 — do NOT substitute alternate wording like "For iOS issues" or "iOS devices".

    **Edit 3 — Append to Scenario Trees list (after line 36):**
    Add exactly: `- [iOS Triage](07-ios-triage.md) — iOS/iPadOS failure routing`

    Match the existing em-dash separator style.

    **Edit 4 — Append to See Also footer (after the existing APv2 See Also entry):**
    Add TWO lines exactly:
    ```
    - [iOS Triage](07-ios-triage.md) -- For iOS/iPadOS (Intune-managed) deployment failures
    - [macOS ADE Triage](06-macos-triage.md) -- For macOS ADE (Intune-managed) deployment failures
    ```

    Note the double-hyphen `--` separator matches the existing APv2 See Also entry. The macOS entry is a parity restoration — macOS banner has existed since 2026-04-14 but never got a See Also entry, so this closes that gap alongside the iOS addition.

    **Edit 5 — Append to bottom Scenario Trees list (after line 124):**
    Add exactly: `- [iOS Triage](07-ios-triage.md)`

    **Edit 6 — Insert new Version History row above the existing 2026-04-14 row:**
    Add exactly: `| 2026-04-17 | Added iOS/iPadOS triage cross-reference banner | -- |`

    The file's existing Version History is chronologically descending — new row goes at the top of the data rows.

    **CRITICAL — Do NOT change:**
    - `applies_to: APv1` in the frontmatter (line 4)
    - Anything inside the ```mermaid ... ``` block (currently lines 40-82)
    - Any TRD* node IDs or graph relationships
    - Any existing See Also / Scenario Trees entries (additive only)
  </action>
  <verify>
    <automated>node scripts/validation/check-phase-30.mjs --quick</automated>
  </verify>
  <done>
    - Validator Check 2 (single-branch integration — no iOS tokens inside mermaid block of 00-initial-triage.md) passes — the banner is OUTSIDE the mermaid fence
    - `grep -c "> \*\*iOS/iPadOS:\*\* For iOS/iPadOS troubleshooting, see \[iOS Triage\]" docs/decision-trees/00-initial-triage.md` = 1
    - `grep -c "07-ios-triage.md" docs/decision-trees/00-initial-triage.md` ≥ 4 (banner + Scenario Trees + See Also + bottom Scenario Trees)
    - `grep "last_verified:" docs/decision-trees/00-initial-triage.md | head -1` shows 2026-04-17
    - `grep -c "IOS1\|IOS2\|IOS3" docs/decision-trees/00-initial-triage.md` = 0 (no iOS nodes in Mermaid — D-05 enforced)
    - `git diff docs/decision-trees/00-initial-triage.md` shows modifications ONLY outside the ```mermaid ... ``` fence
  </done>
</task>

<task type="auto" tdd="false">
  <name>Task 2: Add iOS L1 Runbooks section to 00-index.md (D-23 — after macOS section, before Scope)</name>
  <read_first>
    - docs/l1-runbooks/00-index.md (full file — confirm macOS ADE Runbooks section ends at line 47; Scope H2 starts at line 49; see PATTERNS.md for section-level map)
    - docs/l1-runbooks/16-ios-apns-expired.md (exists from Plan 30-03)
    - docs/l1-runbooks/17-ios-ade-not-starting.md (exists from Plan 30-04)
    - docs/l1-runbooks/18-ios-enrollment-restriction-blocking.md (exists from Plan 30-05)
    - docs/l1-runbooks/19-ios-license-invalid.md (exists from Plan 30-06)
    - docs/l1-runbooks/20-ios-device-cap-reached.md (exists from Plan 30-05)
    - docs/l1-runbooks/21-ios-compliance-blocked.md (exists from Plan 30-07)
    - docs/decision-trees/07-ios-triage.md (exists from Plan 30-02 — target of the "Start with..." sentence in the iOS section intro)
    - .planning/phases/30-ios-l1-triage-runbooks/30-CONTEXT.md § D-23
    - .planning/phases/30-ios-l1-triage-runbooks/30-PATTERNS.md § "docs/l1-runbooks/00-index.md (MODIFY...)" — verbatim iOS section content
  </read_first>
  <behavior>
    - New H2 `## iOS L1 Runbooks` section inserted AFTER `## macOS ADE Runbooks` section (after line 47) and BEFORE `## Scope` (line 49)
    - New section contains an intro paragraph (mirrors macOS section wording shape) + 3-column table listing runbooks 16-21
    - All 6 runbook links resolve to existing files created in Wave 2
    - Related Resources footer gains 1 new bullet pointing to `../decision-trees/07-ios-triage.md`
    - Frontmatter last_verified bumped to 2026-04-17; review_by to 2026-07-16
    - Version History row 2026-04-17 inserted at the top of existing rows
    - (Optional) MAM-WE advisory note added only if it fits cleanly; otherwise omitted per Claude's discretion
  </behavior>
  <action>
    Perform surgical edits to `docs/l1-runbooks/00-index.md`.

    **Edit 1 — Frontmatter:**
    - `last_verified: 2026-04-13` → `last_verified: 2026-04-17`
    - `review_by: 2026-07-12` → `review_by: 2026-07-16`

    **Edit 2 — Insert new H2 section after line 47 / before line 49 `## Scope`:**
    Insert the iOS L1 Runbooks section verbatim from `<interfaces>` block above (intro paragraph + 3-column table with 6 rows). When-to-Use descriptions are load-bearing and should match PATTERNS.md wording exactly (they are short-form summaries of each runbook's Symptom section).

    **Edit 3 — Append to Related Resources footer (lines 57-65):**
    Add after the existing macOS triage entry (which is currently at line 61):
    ```
    - [iOS Triage Decision Tree](../decision-trees/07-ios-triage.md) -- iOS/iPadOS failure routing
    ```

    Use `--` separator to match the existing APv2/macOS pattern.

    **Edit 4 — Version History row:**
    Insert above the 2026-04-14 row:
    ```
    | 2026-04-17 | Added iOS L1 runbook section (runbooks 16-21) | -- |
    ```

    **Edit 5 — Optional MAM-WE advisory note:**
    Evaluate whether inclusion fits naturally. Placement option: between the new iOS L1 Runbooks section and `## Scope`, OR between `## TPM Attestation Note` and `## Related Resources`. If inclusion feels forced or visually noisy, OMIT — the MAM-WE deferral is already documented in CONTEXT.md and Phase 30 does not strictly require this note. If included, use the exact wording from the `<interfaces>` block above.

    **DO NOT:**
    - Modify the APv1 / APv2 / macOS ADE tables (additive only)
    - Change the TPM Attestation Note (unchanged)
    - Rearrange existing section order
    - Use absolute URLs in runbook links (use relative paths to sibling files `16-ios-*.md` etc.)
  </action>
  <verify>
    <automated>node scripts/validation/check-phase-30.mjs --quick</automated>
  </verify>
  <done>
    - Validator Check 9 (`grep "^## iOS L1 Runbooks" docs/l1-runbooks/00-index.md` = 1) flips to PASS
    - `grep -c "16-ios-apns-expired.md\|17-ios-ade-not-starting.md\|18-ios-enrollment-restriction-blocking.md\|19-ios-license-invalid.md\|20-ios-device-cap-reached.md\|21-ios-compliance-blocked.md" docs/l1-runbooks/00-index.md` = 6 (exactly one link per runbook in the table)
    - `grep -c "07-ios-triage.md" docs/l1-runbooks/00-index.md` ≥ 2 (one in iOS section intro, one in Related Resources)
    - Existing APv1 / APv2 / macOS tables untouched (confirm via `git diff` review: diff touches only new iOS section, Related Resources append, Version History row, and frontmatter dates)
    - `grep "last_verified:" docs/l1-runbooks/00-index.md | head -1` shows 2026-04-17
  </done>
</task>

</tasks>

<threat_model>
## Trust Boundaries

| Boundary | Description |
|----------|-------------|
| Public documentation | Navigation edits are additive; no runtime execution; no user input |

## STRIDE Threat Register

| Threat ID | Category | Component | Disposition | Mitigation Plan |
|-----------|----------|-----------|-------------|-----------------|
| T-30-08-01 | Integrity | Mermaid block in 00-initial-triage.md | mitigate | D-05 is NON-NEGOTIABLE — the task's Do-Not-Change list reinforces this; validator Check 2 enforces (must be 0 iOS tokens inside mermaid block) |
| T-30-08-02 | Integrity | Link targets in 00-index.md iOS section | mitigate | Wave-3 dependency on 30-02 through 30-07 ensures all 6 runbook files exist when this plan lands; markdown-link-check (Check 13) catches any filename typos |
</threat_model>

<verification>
1. `node scripts/validation/check-phase-30.mjs --quick` — Checks 2, 9 flip to PASS after this plan
2. `git diff docs/decision-trees/00-initial-triage.md` — visually inspect; no lines modified between the ```mermaid opening and closing fences
3. `git diff docs/l1-runbooks/00-index.md` — only additions (new H2 section, new Related Resources bullet, Version History row, frontmatter dates); existing APv1/APv2/macOS tables untouched
4. Open both files in an editor; confirm iOS references are consistent: banner on line 10 of initial-triage, iOS L1 Runbooks H2 section in index after macOS section
</verification>

<success_criteria>
- [x] 00-initial-triage.md gains iOS banner line 10 (verbatim wording per D-04 / Specifics line 255)
- [x] 00-initial-triage.md Scenario Trees, See Also, bottom Scenario Trees lists all gain iOS entry
- [x] 00-initial-triage.md Mermaid block UNCHANGED (D-05 non-negotiable)
- [x] 00-initial-triage.md Version History has new 2026-04-17 row
- [x] 00-index.md gains new `## iOS L1 Runbooks` H2 section with 3-column table of runbooks 16-21
- [x] 00-index.md Related Resources gains iOS triage entry
- [x] 00-index.md Version History has new 2026-04-17 row
- [x] Both files have frontmatter bumped to 2026-04-17 / 2026-07-16
- [x] Validator Check 2 PASS; Check 9 PASS
</success_criteria>

<output>
After completion, create `.planning/phases/30-ios-l1-triage-runbooks/30-08-SUMMARY.md` with:
- List of all 5 insertion points in 00-initial-triage.md
- List of all 4-5 insertion points in 00-index.md (including whether optional MAM-WE note was added)
- Confirmation the Mermaid block in 00-initial-triage.md was NOT modified (D-05 compliance)
- Any deviations from interfaces content
</output>
