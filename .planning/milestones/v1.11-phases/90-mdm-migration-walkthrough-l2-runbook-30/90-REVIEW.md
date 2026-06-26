---
phase: 90-mdm-migration-walkthrough-l2-runbook-30
reviewed: 2026-06-24T00:00:00Z
depth: standard
files_reviewed: 5
files_reviewed_list:
  - docs/macos-lifecycle/02-mdm-migration-psso.md
  - docs/l2-runbooks/30-macos-mdm-migration-failure.md
  - docs/l2-runbooks/00-index.md
  - docs/l2-runbooks/27-macos-sso-investigation.md
  - docs/macos-lifecycle/01-psso-provisioning-walkthrough.md
findings:
  critical: 0
  warning: 4
  info: 3
  total: 7
status: issues_found
---

# Phase 90: Code Review Report

**Reviewed:** 2026-06-24
**Depth:** standard (documentation-adapted)
**Files Reviewed:** 5
**Status:** issues_found

## Summary

Five documentation files were reviewed at standard depth against seven documentation-specific failure modes: cross-link integrity, confidence posture, `app-sso` output fabrication, link-not-copy discipline, directory-convention compliance, requirement completeness, and internal consistency.

No critical defects were found. The files are substantively correct on the high-stakes dimensions: no same-tenant key-survival language appears anywhere, PSSO re-registration is consistently stated as always required, the ABM post-lockout recovery steps in Track A correctly carry a MEDIUM-confidence note rather than asserting a verified click-path, and the link-not-copy pattern is followed for both the MIG-04 PSSO re-registration handoff and the Track C → #27 delegation. The `app-sso platform -s` output sections cite only the two authorized end-state lines with no fabricated partial states.

Four Warnings and three Info items were identified, detailed below.

---

## Warnings

### WR-01: Track C Step 2 Interprets a Partial `app-sso` State as a Definitive Root-Cause Conclusion

**File:** `docs/l2-runbooks/30-macos-mdm-migration-failure.md:202`

**Issue:** Track C Step 2 states:

> "If the output shows `Device Registration: REGISTERED` but `User Registration: NOT REGISTERED`: the device enrolled successfully into Intune and the device-level PSSO registration completed…"

This presents a specific intermediate `app-sso platform -s` state (`Device Registration: REGISTERED` / `User Registration: NOT REGISTERED`) as a confirmed interpretable partial output, and draws a confident root-cause conclusion from it ("the device-level PSSO registration completed"). The review requirements lock down that only the **full end-state** (`Device Registration: REGISTERED` / `User Registration: REGISTERED`) is sourced — intermediate or partial states must not be asserted as verified. The same file's "Important" note at line 206 itself says "Do not interpret the absence or unexpected value of any particular JSON field beyond the two key registration state lines as a specific root cause without additional investigation" — but line 202 does exactly that: it names a mixed partial state and draws a specific conclusion from it.

This is the "app-sso fabrication" concern applied to a partial state used operationally. Telling an L2 engineer that `User Registration: NOT REGISTERED` (when device is REGISTERED) definitively means "the user has not yet completed their individual MFA re-registration" overstates confidence — the same mixed state can appear during key destruction, policy conflicts, or mid-registration races.

**Fix:** Replace the per-state interpretation prose with a more conservative routing statement:

```markdown
### Step 2: Quick verification — check current PSSO registration state

Run the following command on the affected macOS device:

```bash
app-sso platform -s
```

A fully healthy post-migration PSSO state shows:

- `Device Registration: REGISTERED`
- `User Registration: REGISTERED`

If either line does not show `REGISTERED`, the device has not completed PSSO re-registration. Do not draw conclusions from specific combinations of partial states — the JSON schema for intermediate states is not published in any authoritative source. Proceed to Step 3 to route to runbook 27 for the full registration-failure investigation.
```

---

### WR-02: `02` Stage Summary Table Omits B2 Stages — Path Column Shows Only "B1" for All Post-Gate Stages

**File:** `docs/macos-lifecycle/02-mdm-migration-psso.md:75-85`

**Issue:** The Stage Summary Table (lines 75–85) covers only the 9 B1 stages plus the two shared stages. The B2 stages (B2 Stage 1 through B2 Stage 5) are not represented in the table at all — the table ends at "9: PSSO Re-Registration" with Path=B1 and jumps directly to the B2 prose section without a table row for any B2 stage. The table header and the guide's opening state that the guide covers "both B1 and B2 paths," so an operator scanning the Stage Summary Table for B2 flow is given no overview.

This is a completeness defect: the table correctly lists "Path" values of "Both", "B1", but has zero "B2" rows. The B2 path has five named stages (B2 Stage 1–5) with distinct actors, locations, and pitfalls that are only accessible by scrolling to a prose section. The table's utility as a navigation aid is significantly reduced for the B2 path, and an L1 user following the Stage Summary Table as an overview will have no B2 entry point.

**Fix:** Add B2 stage rows to the Stage Summary Table after the "Both" rows and before the B1-only rows, or add a second summary table for B2. Minimum viable fix (5 rows):

```markdown
| B2-1: OS Gate — Wipe Required | Admin | Kandji/Iru + fleet audit | Confirm device running macOS 25 or earlier; communicate wipe to user | Proceeding with B1 deadline on a pre-26 device | B2 |
| B2-2: Secret Retrieval | Admin | Kandji/Iru console | FileVault key + Activation Lock bypass retrieved before Delete Device Record | Deleting device record before retrieving secrets | B2 |
| B2-3: Retire & Wipe | Admin/Device | Kandji/Iru + on-device | Erase Mac command; device enters Setup Assistant | Using `profiles renew` instead of wipe | B2 |
| B2-4: ADE Re-Enroll via Intune | Device | On-device (Setup Assistant) | Device contacts ABM; retrieves Intune enrollment profile; ACME issued | ADE enrollment policy not assigned to device serial | B2 |
| B2-5: Fresh PSSO Provisioning | User | On-device | Standard A1 PSSO provisioning via guide 01 | Skipping guide 01 handoff | B2 |
```

---

### WR-03: `02` Stage 6 "After Lockout" Recovery Block Inconsistently Hedges — Then Omits the Hedge in the Same Section

**File:** `docs/macos-lifecycle/02-mdm-migration-psso.md:285-289`

**Issue:** Stage 6 "What Happens" Step 3 provides two recovery paths. The "Before lockout" path is described concisely with specific ABM navigation steps (`Change Deadline → remove deadline date`). The "After lockout" path at line 287 says "Fix the Intune-side enrollment issue… the ABM admin can cancel the migration via ABM (conceptual: Devices → select device → cancel or undo the migration assignment)" and then adds a Note at line 289 saying this is MEDIUM confidence.

The problem: the "Before lockout" path at lines 285–286 also specifies ABM navigation steps (`In ABM, navigate to the device and select Change Deadline → remove deadline date → Save`) with **no MEDIUM confidence hedge**, yet the same ABM portal label confidence (the "Change Deadline" label and flow) is subject to the same authoring-day verify requirement that is applied to the post-lockout path. The 90-02 executor summary flagged the entire ABM post-deadline-lockout recovery UI as an area of overstated confidence. The pre-lockout steps at lines 285–286 assert specific ABM button labels and actions (`"Change Deadline" → remove the deadline date → "Save"`) as verified fact.

Additionally, `30-macos-mdm-migration-failure.md` Track A Recovery Option B at lines 81–84 uses the same specific pre-lockout ABM steps (`Devices → locate device → Change Deadline → remove the deadline date → Save`) without a MEDIUM confidence hedge, while the post-lockout step at lines 87–89 carries the hedge. This inconsistency within the same file means an operator may reasonably conclude the pre-lockout ABM steps are verified while only the post-lockout steps are uncertain — which is not the documented confidence position.

**Fix for `02-mdm-migration-psso.md` Stage 6, lines 285–286:** Add a verify-on-authoring-day note to the pre-lockout path matching the Note already present for the post-lockout path:

```markdown
- **Before lockout (preferred):** In ABM, navigate to the device and select **Change Deadline → remove deadline** to cancel the migration. The conceptual action is: locate device by serial, change or remove the assigned deadline, and save. Verify the exact ABM label ("Change Deadline" or equivalent) in the current ABM portal on authoring day. This cancels the migration prompts and reverts the device to its prior MDM assignment. Correct the Intune enrollment policy assignment, then re-set the deadline.
```

**Fix for `30-macos-mdm-migration-failure.md` Track A Recovery Option B, lines 81–84:** Extend the MEDIUM confidence scope to include the pre-lockout steps or add a consistent verify note:

```markdown
For pre-lockout cancellation (device has prompts but is not yet at the full-screen lock):
1. In ABM: **Devices** → locate the device by serial number
2. Select the device → change or remove the migration deadline → **Save**
   (Verify current ABM label — may read "Change Deadline" or similar; verify in your ABM portal)
3. This cancels the migration prompts on the device and re-assigns the device to its previous MDM assignment
```

---

### WR-04: `00-index.md` macOS L1 Escalation Mapping Table Has No Row for L2 #30

**File:** `docs/l2-runbooks/00-index.md:91-103`

**Issue:** The macOS L1 Escalation Mapping table (lines 91–103) maps L1 runbooks to their corresponding L2 runbooks. The table was updated in the Phase 90 edit to add L2 #30 to the "When to Use" table (line 89), but the macOS L1 Escalation Mapping table has **no row mapping any L1 runbook to L2 #30**. 

The omission is functionally significant: an L1 escalation from a migration-related L1 runbook (e.g., a device stuck on full-screen enrollment prompt, or PSSO re-registration not appearing post-migration) has no routing row in the index. An L2 engineer receiving an escalated ticket must already know to look at L2 #30 — there is no index-level routing path. This is a RUN-01 completeness gap.

There are no existing L1 runbooks specifically for macOS MDM migration scenarios yet (the L1 runbooks top out at #36), but the mapping table's absence means if such runbooks are created, there is no placeholder or note. More immediately: migration failure tickets that arrive via L1 triage (e.g., from L1 #11 macOS Setup Assistant Failed, L1 #12 macOS Profile Not Applied, L1 #35 macOS SSO Sign-In Failure post-migration) have no documented escalation row to L2 #30.

**Fix:** Add at minimum a row noting that migration-related L1 escalations (from L1 #11, #12, or #35 post-migration) route to L2 #30:

```markdown
| [L1 11: macOS Setup Assistant Failed](../l1-runbooks/11-macos-setup-assistant-failed.md) (migration context) | [macOS MDM Migration Failure](30-macos-mdm-migration-failure.md) — Track B |
| [L1 35: Platform SSO Sign-In Failure](../l1-runbooks/35-macos-sso-sign-in-failure.md) (post-migration) | [macOS MDM Migration Failure](30-macos-mdm-migration-failure.md) — Track C → [Platform SSO Investigation](27-macos-sso-investigation.md) |
```

---

## Info

### IN-01: `02` See-Also Uses `--` (Double Hyphen) Separators — Convention Requires `--` (macos-lifecycle Is Double-Hyphen, Not Em-Dash)

**File:** `docs/macos-lifecycle/02-mdm-migration-psso.md:510-526`

**Issue:** The review requirements state that `macos-lifecycle` documents must use `--` (double hyphen) See-Also separators and `l2-runbooks` must use `—` (em-dash). The See-Also section in `02` (lines 510–526) uses `--` separators throughout, and `01-psso-provisioning-walkthrough.md` also uses `--` consistently. Both are correct per the directory convention.

The `30-macos-mdm-migration-failure.md` Related Resources section (lines 234–238) uses `—` (em-dash) separators throughout. This is also correct per the l2-runbooks convention.

Both separators are correctly applied to their respective directories. **No defect — logged as a confirmation.**

Actually, on re-reading the requirement: "macos-lifecycle must use `--` See-Also separators; l2-runbooks must use `—` (em-dash) Related Resources separators." Both files comply. This is a clean pass, but the reviewer notes that the `02` glossary table (line 534) uses `--` inside table cells (`Automated Certificate Management Environment -- certificate`), which is consistent with the macos-lifecycle convention and matches the pattern established in `01`.

**No fix required.** Noting for completeness.

---

### IN-02: Version History in `02` and `01` Uses 2-Column Format — Correct for macos-lifecycle; `30` and `27` Use 3-Column Format — Correct for l2-runbooks

**File:** `docs/macos-lifecycle/02-mdm-migration-psso.md:549-553` / `docs/macos-lifecycle/01-psso-provisioning-walkthrough.md:489-492` / `docs/l2-runbooks/30-macos-mdm-migration-failure.md:244-246` / `docs/l2-runbooks/27-macos-sso-investigation.md:203-206`

**Issue:** The directory-convention requirements specify:
- `macos-lifecycle`: 2-column Version History (Date | Change, NO Author)
- `l2-runbooks`: 3-column Version History (Date | Change | Author)

All four files comply with their respective directory conventions. `02` and `01` use 2-column, `30` and `27` use 3-column. **No defect.**

The `30` and `27` Author column uses `--` as a placeholder (not a named author), which is consistent with the other l2-runbooks Version History entries in `00-index.md`. **No fix required.**

---

### IN-03: `02` Internal Anchor `#b2-path-pre-macos-26-wipe-and-re-enroll` Is Referenced but May Not Resolve Correctly in All Markdown Renderers

**File:** `docs/macos-lifecycle/02-mdm-migration-psso.md:101,175,300`

**Issue:** Three places in `02` use the anchor `#b2-path-pre-macos-26-wipe-and-re-enroll`:
- Line 101: `[B2 Path: Pre-macOS-26 Wipe-and-Re-Enroll](#b2-path-pre-macos-26-wipe-and-re-enroll)`
- Line 175: same
- Line 300: same

The actual section header at line 426 is `## B2 Path: Pre-macOS-26 Wipe-and-Re-Enroll`. Standard GitHub Flavored Markdown (GFM) anchor generation for this header produces `#b2-path-pre-macos-26-wipe-and-re-enroll` (all lowercase, spaces to hyphens, special characters stripped). The anchor appears correct for GFM.

However, the header text contains a `-26` fragment after "Pre-macOS" which could produce `#b2-path-pre-macos-26-wipe-and-re-enroll`. This is valid in GFM. The anchor as written matches GFM output. **No defect in a GFM environment.**

Note: If the docs are rendered in a non-GFM renderer (e.g., MkDocs without the markdown-toc extension, or some internal wikis), anchor generation rules may differ. This is an awareness item only — the links are correct for GFM, which is the most common rendering target for markdown docs in this repo.

**No fix required.** Logging as informational awareness only.

---

_Reviewed: 2026-06-24_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard (documentation-adapted)_
