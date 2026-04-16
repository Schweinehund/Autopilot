---
phase: 28-ios-admin-setup-configuration-apps-compliance
reviewed: 2026-04-16T00:00:00Z
depth: standard
files_reviewed: 4
files_reviewed_list:
  - docs/admin-setup-ios/00-overview.md
  - docs/admin-setup-ios/04-configuration-profiles.md
  - docs/admin-setup-ios/05-app-deployment.md
  - docs/admin-setup-ios/06-compliance-policy.md
findings:
  critical: 0
  warning: 1
  info: 7
  total: 8
status: issues_found
---

# Phase 28: Code Review Report

**Reviewed:** 2026-04-16
**Depth:** standard
**Files Reviewed:** 4
**Status:** issues_found

## Summary

Reviewed the four iOS/iPadOS admin-setup documentation files delivered by Phase 28 (`00-overview.md`, `04-configuration-profiles.md`, `05-app-deployment.md`, `06-compliance-policy.md`). The review focused on factual accuracy of iOS/Intune claims, cross-reference link validity, consistency across the four guides, completeness against the stated success criteria in the plan frontmatter, Mermaid diagram syntax, and relative path validity.

**Overall assessment: Strong.** All four files meet the structural requirements mandated by the three 28-0X-PLAN.md files. YAML frontmatter is uniform and correct. All cross-references resolve to files that exist (`../ios-lifecycle/00-enrollment-overview.md#supervision` verified present at line 38; `../reference/compliance-timing.md` and `../reference/ca-enrollment-timing.md` both exist; `../admin-setup-macos/03-configuration-profiles.md`, `04-app-deployment.md`, `05-compliance-policy.md` all exist; `../_glossary-macos.md` exists). The Mermaid diagram in `00-overview.md` is syntactically valid. The `#portal-navigation-note` anchor referenced by all three new guides exists at line 50 of `00-overview.md`. The `#supervision` anchor exists at line 38 of `ios-lifecycle/00-enrollment-overview.md`. The `#compliance-evaluation-timing-and-conditional-access` intra-document anchor in `06-compliance-policy.md` is auto-generated correctly from the H2 heading and is referenced from two earlier "What breaks if misconfigured" callouts.

Success-criteria coverage is complete:
- **SC #1** (Config Profiles — supervised-only identification): 13 `🔒 **Supervised only:**` callouts present in `04-configuration-profiles.md`, all pointing to the supervision anchor. Device Restrictions section has 12 category tables + Home Screen Layout callout + 9 detailed subsections.
- **SC #2** (App Deployment — VPP distinction, silent install, managed app status): Key Concepts Before You Begin section documents the VPP device vs user distinction; 6-scenario silent-install prompt table is present; Verification section names the three admin-center locations (App-centric, Device-centric, Troubleshoot+support).
- **SC #3** (Compliance — OS/jailbreak/passcode): All three topics have their own Step 2 subsections with dedicated What-breaks callouts.
- **SC #4** (Compliance — CA timing answered from the guide alone): Dedicated `## Compliance Evaluation Timing and Conditional Access` section includes the timeline table, toggle explanation, 0-30 minute gap behaviors for both toggle values, and iOS-specific APNs considerations — all inline.

One warning-level factual concern and seven info-level consistency/copy issues are noted below. No critical issues, no security issues, no broken links.

## Warnings

### WR-01: "Allowed Safari web domains" and "Managed Safari web domains" marked as NOT supervised-only may be factually incorrect

**File:** `docs/admin-setup-ios/04-configuration-profiles.md:279-280`

**Issue:** The Safari Domains table lists "Allowed Safari web domains" and "Managed Safari web domains" with an em-dash (`—`) in the "Supervised-only?" column, indicating they are NOT supervised-only. The accompanying 🔒 callout at line 282 only flags "Safari password domains" as supervised-only.

However, per Apple's Device Management Restrictions payload reference, the `allowedSafariDomains` / `whitelistedAppBundleIDs` / `managedOpenInDomains` restrictions historically require supervised mode. Microsoft Intune's own "iOS/iPadOS device restriction settings" documentation classifies "Allowed Safari web domains" under settings that require supervised mode. If an admin deploys an "Allowed Safari web domains" restriction to unsupervised devices expecting enforcement based on this guide, the setting will be silently ignored and Safari browsing will not be restricted — the exact failure mode the 🔒 callout pattern is designed to prevent.

**Fix:** Verify the supervised-only status of these two settings against the current Microsoft Learn iOS/iPadOS device restriction settings reference (https://learn.microsoft.com/mem/intune/configuration/device-restrictions-ios). If they are supervised-only (most likely), update the table rows and expand the 🔒 callout text:

```markdown
| Safari password domains (iOS 9.3+) | 🔒 | Defines domains where Safari will offer to save passwords |
| Allowed Safari web domains | 🔒 | Restricts Safari browsing to specified domains only |
| Managed Safari web domains | 🔒 | Marks specified domains as corporate — documents opened from these domains become managed |

> 🔒 **Supervised only:** Safari domain restrictions (Safari password domains, Allowed Safari web domains, Managed Safari web domains) require supervised mode. On unsupervised devices these settings are ignored silently. See [Supervision](../ios-lifecycle/00-enrollment-overview.md#supervision).
```

If current Microsoft Learn documentation indicates one or both are available on unsupervised devices for specific iOS versions, cite the version boundary inline (e.g., "iOS 14.0+ unsupervised"). Fact-verification is scheduled for the 2026-07-15 review cycle anyway — flag this as a specific item to re-check.

## Info

### IN-01: Device Restrictions intro misses "Show or Hide Apps" in list of entirely-supervised categories

**File:** `docs/admin-setup-ios/04-configuration-profiles.md:124`

**Issue:** The Device Restrictions section intro states "categories marked entirely supervised-only (Autonomous Single App Mode, Kiosk, Keyboard, Password) apply to no unsupervised devices." However, the `### Show or Hide Apps` subsection at line 284 is also entirely supervised-only — its table has exactly one row that is marked 🔒 and its callout at line 290 says "The entire Show or hide apps allowlist/blocklist capability requires supervised mode."

**Fix:** Update the intro sentence to include Show or Hide Apps:
```markdown
...categories marked entirely supervised-only (Autonomous Single App Mode, Kiosk, Keyboard, Password, Show or Hide Apps) apply to no unsupervised devices.
```

### IN-02: Two Device Restrictions settings listed under both "General" and "Screen Time and Additional Restrictions" create reader confusion

**File:** `docs/admin-setup-ios/04-configuration-profiles.md:136-149` and `296-301`

**Issue:** "Block users from erasing all content and settings on device" / "Block removing apps" / "Block app clips" appear in both the General category table (lines 136-141) and the "Screen Time and Additional Restrictions" category table (lines 296-299). The guide itself acknowledges this with parentheticals like "(same as General block above — confirmed supervised-only)" and "(same as General block above — both locations apply)". While the intent is to mirror Intune's UI categorization, the duplication may confuse an admin scanning the guide for unique settings.

**Fix:** Either (a) keep the duplication and add a leading sentence to the "Screen Time and Additional Restrictions" subsection stating "This category duplicates several settings from General for UI-mirroring reasons; values set in either location apply to the same underlying restriction", or (b) remove the duplicated rows from "Screen Time and Additional Restrictions" and keep only "Block Screen Time modification" (the one that is unique to this category). Option (a) is lower risk.

### IN-03: Password category settings naming inconsistency between table row and callout summary

**File:** `docs/admin-setup-ios/04-configuration-profiles.md:270-272`

**Issue:** The Password category table at line 270 lists the setting as "Require Touch ID or Face ID authentication for AutoFill (iOS 11.0+)". The summary 🔒 callout at line 272 refers to this setting as "Require biometric for AutoFill". A reader scanning the table for the setting named in the callout may not immediately recognize them as the same control.

**Fix:** Use consistent wording. Recommend updating the callout to match the table name verbatim:
```markdown
> 🔒 **Supervised only:** All Password settings (Block passcode modification, Block modification of Touch ID/Face ID, Block password AutoFill, Block password proximity requests, Block password sharing, Require Touch ID or Face ID authentication for AutoFill) require supervised mode. ...
```

### IN-04: VPP App Type Comparison table "Available deployment intent for device groups" row label is easy to misread

**File:** `docs/admin-setup-ios/05-app-deployment.md:60`

**Issue:** The row "Available deployment intent for device groups | No (user groups only) | No (user groups only) | Yes for Required; No for Available | No (user groups only)" is subtle: the row name refers specifically to the "Available" assignment intent (as distinct from "Required"), and "No (user groups only)" means "You cannot use the Available intent on device groups; use user groups instead." A reader skimming may interpret "No" as "cannot be assigned to device groups at all," which contradicts the VPP Device-Licensed section (line 99) that says "Use **Required** to device groups or user groups."

**Fix:** Rename the row to make the intent explicit:
```markdown
| Device groups support "Available" intent | No (user groups only for Available; device groups work for Required) | No (user groups only for Available; device groups work for Required) | Yes for Required; No for Available | No (user groups only for Available) |
```
Or add a footnote below the table: "*'Available' intent requires user groups; 'Required' intent supports both user and device groups for VPP."

### IN-05: Silent install matrix scenario 4 (BYOD — device licensed) may describe an uncommon or misconfigured scenario

**File:** `docs/admin-setup-ios/05-app-deployment.md:41`

**Issue:** The 6-row silent install prompt table includes "BYOD — device licensed" as scenario 4 with "Apple Account prompt: No / Install prompt: Yes". In practice, VPP device licensing requires ABM enrollment of the device by serial number; BYOD (Bring Your Own Device) devices are typically not enrolled in ABM and therefore cannot receive device-licensed VPP. The scenario is technically possible only for a BYOD device that was later added to ABM (uncommon operational flow).

**Fix:** Either add a footnote clarifying that BYOD + device licensing is operationally uncommon and requires ABM device registration, or omit scenario 4 if the source Microsoft Learn table does not list it. Cross-check against the Microsoft Learn "Manage Apple VPP apps" table that this 6-scenario matrix was sourced from (per plan 02 interface block, lines 90-99). No change if the source table documents this scenario as authoritative.

### IN-06: Compliance guide Prerequisites list in 06-compliance-policy.md expanded beyond plan spec — a deviation worth documenting

**File:** `docs/admin-setup-ios/06-compliance-policy.md:33-38`

**Issue:** The Prerequisites section contains 6 bullets including "APNs certificate active and valid" and "Default compliance posture toggle reviewed before deployment" — both beyond the 4-bullet spec in 28-03-PLAN.md line 165-168. The 28-03-SUMMARY.md (line 133-140) self-documents this as "auto-fixed issue" to meet a 250-line minimum. The additions are substantive and correct, but this deviation from the plan spec should be noted in plan acceptance-criteria review for traceability. Not a content issue.

**Fix:** No code fix needed. Flagging for process visibility — the summary file already documents the deviation appropriately.

### IN-07: `00-overview.md` revision history "Initial version" row still carries the original text with "3-guide setup sequence" description, which is now factually inaccurate post-Phase-28

**File:** `docs/admin-setup-ios/00-overview.md:79`

**Issue:** The revision history table has two rows. The latest row (line 78, dated 2026-04-16) correctly documents the Phase 28 extension. The earlier row (line 79) reads: "Initial version -- iOS admin setup overview with Mermaid diagram and 3-guide setup sequence". After the Phase 28 updates, this claim is no longer a description of the current file state — it describes only the initial Phase 27 content. Both rows accurately describe the incremental changes made on those dates, which is correct revision-history hygiene, so this is not a defect. Flagging because a reader of the table might be momentarily confused that the current overview has a "3-guide setup sequence."

**Fix:** No fix needed — revision history rows describe per-commit changes, not cumulative file state. Consider adding an implicit convention note or leave as-is (standard practice).

---

## Verification Performed

- [x] Frontmatter YAML is well-formed in all 4 files (keys: `last_verified`, `review_by`, `applies_to`, `audience`, `platform`)
- [x] All 🔒 callouts in 04 and 05 link to `../ios-lifecycle/00-enrollment-overview.md#supervision`; link target anchor exists at line 38 of the destination file
- [x] Intra-document anchor `#compliance-evaluation-timing-and-conditional-access` (auto-generated from H2 in 06) is referenced from 2 earlier callouts in Step 1 and Step 3
- [x] Relative path `../_glossary-macos.md` resolves (file exists)
- [x] Relative path `../admin-setup-macos/03-configuration-profiles.md` resolves (file exists)
- [x] Relative path `../admin-setup-macos/04-app-deployment.md` resolves (file exists)
- [x] Relative path `../admin-setup-macos/05-compliance-policy.md` resolves (file exists)
- [x] Relative path `../reference/compliance-timing.md` resolves (file exists)
- [x] Relative path `../reference/ca-enrollment-timing.md` resolves (file exists)
- [x] Relative path `../ios-lifecycle/00-enrollment-overview.md` resolves (file exists); its `#supervision` anchor resolves
- [x] Relative path `../ios-lifecycle/01-ade-lifecycle.md` resolves (file exists)
- [x] Relative path `../admin-setup-apv1/00-overview.md` resolves (file exists)
- [x] `00-overview.md` Mermaid diagram is syntactically valid (`graph LR` directive, proper `-->` edge syntax, `<br/>` line breaks inside node labels)
- [x] Every Configuration-Caused Failures table uses `iOS L1 runbooks (Phase 30)` placeholder consistently
- [x] `00-overview.md` setup sequence list links to all three new guides (04, 05, 06)
- [x] No accidental use of absolute paths, `file://` URLs, or broken image references
- [x] No commented-out source blocks or debug artifacts
- [x] No hardcoded secrets, API keys, or credentials in any documentation file

---

_Reviewed: 2026-04-16_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
