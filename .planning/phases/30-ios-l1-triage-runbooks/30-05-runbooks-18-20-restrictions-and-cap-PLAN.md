---
phase: 30-ios-l1-triage-runbooks
plan: 05
type: execute
wave: 2
depends_on: [30-01, 30-02]
files_modified:
  - docs/l1-runbooks/18-ios-enrollment-restriction-blocking.md
  - docs/l1-runbooks/20-ios-device-cap-reached.md
autonomous: true
requirements: [L1TS-02]
must_haves:
  truths:
    - "Runbook 18 covers CONFIG BLOCKS (platform / ownership / enrollment-type gating — D-29) and is distinct from runbook 20 (quota exhaustion)"
    - "Runbook 20 covers QUOTA EXHAUSTION (per-user device limit hit — D-30) and is distinct from runbook 18"
    - "Both runbooks include a mutual disambiguation cross-reference in their Related Resources footer per Specifics line 252"
    - "Runbook 18 Symptom cites Microsoft Learn 'Invalid Profile' error string verbatim; Runbook 20 cites `DeviceCapReached` + the misleading `Company Portal Temporarily Unavailable` dual-meaning"
    - "Runbook 20 may optionally include the D-08 manual-sync step (after stale-device retire) — documented as 'optional' per D-08 extension in Specifics"
  artifacts:
    - path: "docs/l1-runbooks/18-ios-enrollment-restriction-blocking.md"
      provides: "L1 runbook for enrollment restriction blocking — platform/ownership/enrollment-type config blocks"
      min_lines: 100
      max_lines: 160
      contains_all:
        - "## Symptom"
        - "## L1 Triage Steps"
        - "## Admin Action Required"
        - "## Escalation Criteria"
        - "> **Platform gate:**"
        - "Invalid Profile"
        - "Device platform restriction"
        - "../admin-setup-ios/00-overview.md#intune-enrollment-restrictions"
        - "20-ios-device-cap-reached.md"
    - path: "docs/l1-runbooks/20-ios-device-cap-reached.md"
      provides: "L1 runbook for device cap reached — per-user device limit quota exhaustion"
      min_lines: 100
      max_lines: 170
      contains_all:
        - "## Symptom"
        - "## L1 Triage Steps"
        - "## Admin Action Required"
        - "## Escalation Criteria"
        - "> **Platform gate:**"
        - "DeviceCapReached"
        - "Company Portal Temporarily Unavailable"
        - "Device limit restriction"
        - "../admin-setup-ios/00-overview.md#intune-enrollment-restrictions"
        - "18-ios-enrollment-restriction-blocking.md"
  key_links:
    - from: "Runbook 18 + Runbook 20 Admin Action packets"
      to: "docs/admin-setup-ios/00-overview.md#intune-enrollment-restrictions"
      via: "Phase 29 D-08 shared enrollment-restrictions anchor (already exists)"
      pattern: "admin-setup-ios/00-overview\\.md#intune-enrollment-restrictions"
    - from: "Runbook 18 Related Resources"
      to: "Runbook 20"
      via: "reciprocal disambiguation per Specifics line 252"
      pattern: "20-ios-device-cap-reached\\.md"
    - from: "Runbook 20 Related Resources"
      to: "Runbook 18"
      via: "reciprocal disambiguation per Specifics line 252"
      pattern: "18-ios-enrollment-restriction-blocking\\.md"
---

<objective>
Create two L1 runbooks that are easily confused and require reciprocal disambiguation:

- **Runbook 18** (`18-ios-enrollment-restriction-blocking.md`) — tenant-level **configuration blocks**: platform allow/block, ownership allow/block, enrollment-type allow/block. User-visible error typically `"The configuration for your iPhone/iPad couldn't be downloaded from [Company Name]: Invalid Profile"`.
- **Runbook 20** (`20-ios-device-cap-reached.md`) — per-user device-limit **quota exhaustion**. User-visible errors: literal `DeviceCapReached` AND the misleading `"Company Portal Temporarily Unavailable"` (Microsoft Learn documents dual-meaning).

These are grouped into ONE plan because:
1. They are semantically sibling scenarios with the same symptom surface ("device won't enroll") but different root causes
2. They share the same Phase 29 D-08 deep-link target (`../admin-setup-ios/00-overview.md#intune-enrollment-restrictions`)
3. Both require reciprocal disambiguation cross-links in Related Resources (Specifics line 252)
4. Creating them together ensures the disambiguation language stays consistent between files

Grouping rationale matches 30-RESEARCH.md Section 12 recommendation and the planning_rules_specific_to_phase_30 § plan #5 breakdown.

Wave 2 — depends on Plan 30-01 and Plan 30-02. Parallel with Plans 30-03, 30-04, 30-06, 30-07.
Output: Two new L1 runbook markdown files.
</objective>

<execution_context>
@$HOME/.claude/get-shit-done/workflows/execute-plan.md
@$HOME/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/PROJECT.md
@.planning/phases/30-ios-l1-triage-runbooks/30-CONTEXT.md
@.planning/phases/30-ios-l1-triage-runbooks/30-RESEARCH.md
@.planning/phases/30-ios-l1-triage-runbooks/30-PATTERNS.md

<interfaces>
<!-- RUNBOOK 18: ENROLLMENT RESTRICTION BLOCKING -->

Frontmatter (D-25 Claude's discretion per A3 — using `all` because restrictions span all iOS enrollment paths):
```yaml
---
last_verified: 2026-04-17
review_by: 2026-07-16
applies_to: all
audience: L1
platform: iOS
---
```

Rationale for `applies_to: all` (recorded here per planning_rules_specific_to_phase_30 rule 6): Device platform restrictions and ownership restrictions apply across ADE, Company Portal device enrollment, and account-driven User Enrollment — they are tenant-level gates, not path-specific. Research A3 flags this as Claude's discretion; research Section 4 Runbook 18 recommends `all` based on cross-path applicability.

Platform gate banner (line 9) — D-26 verbatim (same for both runbooks).

H1: `# iOS Enrollment Restriction Blocking`
Intro: "Use this runbook when an iOS/iPadOS user reports that their device cannot be managed, enrollment fails with an 'Invalid Profile' or 'Can't be managed' error, or the device appears briefly in Intune then is removed. This runbook covers **tenant-level configuration blocks** — for **per-user device limit exhaustion** (`DeviceCapReached` / 'Too many devices'), use [runbook 20](20-ios-device-cap-reached.md) instead."

<!-- Content source: 30-RESEARCH.md § 4 Runbook 18 (lines ~349-381) + CONTEXT.md D-29 -->

Symptom section:
- **User-visible error (Flow 1, Company Portal):** `"The configuration for your iPhone/iPad couldn't be downloaded from [Company Name]: Invalid Profile"` — verbatim from Microsoft Learn troubleshoot-ios-enrollment-errors. This string specifically corresponds to device-type-restriction or platform-restriction blocking.
- **User-visible error (general):** `"This device cannot be managed"` or similar enrollment-blocked language.
- **Intune portal surface:** Device appears briefly in Intune then is retired/removed, OR never appears at all.
- **Disambiguation from runbook 20:** If the user specifically saw `"Device limit reached"` or `"Too many devices"` → use [runbook 20](20-ios-device-cap-reached.md) instead.

Back-link (D-11): `Routed here from the [iOS Triage Decision Tree](../decision-trees/07-ios-triage.md) IOSR3 "'Invalid Profile' or 'Can't be managed'" branch.`

L1 Triage Steps (D-07 detect-only; numbered):
1. Say-to-user status opener.
2. Navigate to **P-05 primary path:** `Devices > Device onboarding > Enrollment > Device platform restriction`. If that section is not visible in your tenant, use the fallback `Devices > Enrollment restrictions > Device type restrictions > All Users > Properties > Edit > Platform settings` (both paths reach the same blade — see [portal-navigation-note](../admin-setup-ios/00-overview.md#portal-navigation-note)).
3. Review the policy applied to the user's assigned group. Record:
   - Platform allow/block for iOS/iPadOS (expected: Allow)
   - Personally-owned allow/block (if the device is personal and Personal is Blocked, that is the cause)
   - OS version minimum / maximum (if device is below min or above max)
   - Device-type allow/block
4. Cross-check user's group membership in Entra: `Groups > [user's assigned group] > Members` — confirm user is a member.
5. Cross-reference context: the shared enrollment-restrictions concept is documented at [iOS Admin Setup Overview § Intune Enrollment Restrictions](../admin-setup-ios/00-overview.md#intune-enrollment-restrictions) — L1 may cite this in the escalation packet.
6. Note which specific restriction setting would block this user's enrollment attempt based on user context (personal-owned device blocked, platform blocked, OS version gate too high, etc.).

Portal-navigation-may-vary callout after step 2.

Admin Action Required (D-12):
```markdown
L1 documents and hands this packet to the Intune admin. L1 does not execute.

**Ask the admin to:**
- Review the device platform restriction policy assigned to the user's group: [P-05 path].
- Adjust the specific blocking setting based on L1's finding:
  - If Personal-owned is blocked and the device is personal → flip to Allow (or assign user to a corporate-allow group)
  - If platform iOS is blocked → flip to Allow
  - If OS version gate too high → relax the gate or ensure device meets gate
- Reference: [iOS Admin Setup Overview § Intune Enrollment Restrictions](../admin-setup-ios/00-overview.md#intune-enrollment-restrictions).

**Verify:**
- User retries enrollment; the device enrolls successfully and appears in `Devices > All devices > iOS/iPadOS` (P-04).

**If the admin confirms the restriction is intentional:**
- Proceed to [Escalation Criteria](#escalation-criteria) — a policy exception or user group change is needed (out of L1 + typical admin scope).
```

NO User Action Required (D-13).

Escalation Criteria:
- Restriction is intentional and cannot be changed (requires policy exception — security/IT-leadership approval)
- User's group membership is incorrect (requires Entra admin action to re-assign group)
- Admin changes restriction but enrollment still fails (restriction was not the cause)

**Before escalating, collect:**
- Device serial number
- User UPN
- User's Entra group membership list
- Screenshot of the device platform restriction policy showing the blocking setting
- User-visible error string screenshot

Closing block:
- L2 placeholder link
- Admin setup cross-ref: `[iOS Admin Setup Overview](../admin-setup-ios/00-overview.md)`
- **Reciprocal disambiguation (Specifics line 252 REQUIRED):** `[Runbook 20: Device Cap Reached](20-ios-device-cap-reached.md) — For enrollment failures where the user specifically saw 'device limit reached' or 'too many devices'.`
- Back to iOS Triage
- Version History 2026-04-17

---

<!-- RUNBOOK 20: DEVICE CAP REACHED -->

Frontmatter (D-25 Claude's discretion per A3 — using `all`):
```yaml
---
last_verified: 2026-04-17
review_by: 2026-07-16
applies_to: all
audience: L1
platform: iOS
---
```

Rationale for `applies_to: all`: Device-cap exhaustion applies to any non-DEM-account enrollment (ADE, Company Portal, User Enrollment all count toward the per-user cap). Research Section 4 Runbook 20 recommends `all`.

Platform gate banner line 9 verbatim.

H1: `# iOS Device Cap Reached`
Intro: "Use this runbook when an iOS/iPadOS user reports `DeviceCapReached` or the misleading `'Company Portal Temporarily Unavailable'` error during enrollment, AND the user already has other enrolled devices. This runbook covers **per-user device limit exhaustion**. For **tenant-level configuration blocks** (platform / ownership / enrollment-type blocking — 'Invalid Profile' error), use [runbook 18](18-ios-enrollment-restriction-blocking.md) instead."

<!-- Content source: 30-RESEARCH.md § 4 Runbook 20 (lines ~426-463) + CONTEXT.md D-30 -->

Symptom section:
- **Primary user-visible error:** `DeviceCapReached` with message: `"Too many mobile devices are enrolled already."` — verbatim from Microsoft Learn troubleshoot-ios-enrollment-errors.
- **Alternate misleading error (Microsoft Learn documented):** `"Company Portal Temporarily Unavailable"` — Microsoft Learn explicitly documents this message can also mean device cap exhaustion. Treat this alternate error as a candidate for device-cap first before assuming Company Portal is actually down.
- **Intune portal surface:** User's enrolled device count at P-07 equals or exceeds the limit from P-06 (default 5; configurable 1-15; max 25 policies per tenant).

Back-link (D-11): `Routed here from the [iOS Triage Decision Tree](../decision-trees/07-ios-triage.md) IOSR5 "'Device limit reached' or 'Too many devices'" branch. The triage tree also routes 'Company Portal Temporarily Unavailable' here first per Microsoft Learn documented dual-meaning.`

L1 Triage Steps:
1. Say-to-user status opener.
2. Navigate to **P-06 primary path:** `Devices > Device onboarding > Enrollment > Device limit restriction` (fallback: `Devices > Enrollment restrictions > Device limit restrictions` — both reach the same blade). Record the device limit applicable to this user (default 5; may be per-group).
3. Navigate to **P-07:** `Users > All users > [user] > Devices`. Count enrolled devices for this user. For each device, record: device name, enrollment date, last-contact date, ownership, platform.
4. Identify stale/abandoned device records (devices with Last contacted > 90 days).
5. Compare count from step 3 to limit from step 2. Confirm count ≥ limit (expected — this is the failure mode).

Portal-navigation-may-vary callout.

Admin Action Required (D-12):
```markdown
L1 documents and hands this packet to the Intune admin. L1 does not execute.

**Ask the admin to (choose one):**
1. **Remove stale device records** for the user — retire devices in `Devices > All devices > [device] > Retire` that have Last contacted > 90 days and are confirmed no longer in use. Microsoft Learn recommends this as the primary fix to avoid cap issues **[CITED: learn.microsoft.com/troubleshoot/mem/intune/device-enrollment/troubleshoot-device-enrollment-in-intune § "To avoid hitting device caps"]**.
2. **Increase the device limit** for the user's group via [P-06]. Acceptable when the user legitimately needs more devices (e.g., tester with multiple test devices). Max limit is 15 per user.

**Verify:**
- User retries enrollment. Device enrolls and appears in P-04 under user's Devices view. Count at P-07 is now below limit.

**Optional L1 write-action (per D-08 extension):** After stale-device retire is complete, L1 may perform a manual ADE token sync via `Devices > Device onboarding > Enrollment > Apple (tab) > Enrollment program tokens > [token] > Sync` (P-03) to accelerate cap-clear propagation. This is identical in scope to [runbook 17's manual sync](17-ios-ade-not-starting.md) — a READ-retry of an existing configuration, not a write to enrollment state.

**If the admin confirms the user legitimately needs more than 15 devices:**
- Escalate — device-limit max is 15 per user. Users who need more than 15 devices require a Device Enrollment Manager (DEM) account (per Microsoft Learn note — DEM users bypass the cap but cannot use Conditional Access).
```

NO User Action Required (D-13).

Escalation Criteria:
- User needs more than 15 devices enrolled (hard platform cap; DEM account required)
- Admin removes stale devices, limit adjusted, but enrollment still fails (cap was not actual cause — consider runbook 18)
- User cannot identify which of their enrolled devices are stale

**Before escalating, collect:**
- User UPN
- Current enrolled device count (P-07 screenshot)
- Current device limit (P-06 screenshot)
- List of stale devices considered for retirement
- User-visible error string (DeviceCapReached vs Company Portal Temporarily Unavailable)

Closing block:
- L2 placeholder link
- Admin setup cross-refs:
  - [iOS Admin Setup Overview § Intune Enrollment Restrictions](../admin-setup-ios/00-overview.md#intune-enrollment-restrictions)
  - [ABM/ADE Token Guide](../admin-setup-ios/02-abm-token.md) — where device cap intersects with ADE device assignment per Phase 27 D-11 context
- **Reciprocal disambiguation (Specifics line 252 REQUIRED):** `[Runbook 18: Enrollment Restriction Blocking](18-ios-enrollment-restriction-blocking.md) — For enrollment failures that are NOT device-limit-related (platform, ownership, or enrollment-type blocking with 'Invalid Profile' errors).`
- Microsoft Learn external reference: `https://learn.microsoft.com/intune/remote-actions/devices-wipe` (Retire action documentation)
- Back to iOS Triage
- Version History 2026-04-17
</interfaces>
</context>

<tasks>

<task type="auto" tdd="false">
  <name>Task 1: Create 18-ios-enrollment-restriction-blocking.md</name>
  <read_first>
    - docs/l1-runbooks/10-macos-device-not-appearing.md (structural template for single-flow runbook)
    - docs/admin-setup-ios/00-overview.md — confirm `#intune-enrollment-restrictions` anchor exists (Phase 29 D-08 established)
    - docs/decision-trees/07-ios-triage.md (Wave 1 output — confirm IOSR3 click target is `18-ios-enrollment-restriction-blocking.md`)
    - .planning/phases/30-ios-l1-triage-runbooks/30-RESEARCH.md § 3 navigation table P-05 (dual-path Path A + Path B) and § 4 "Runbook 18"
    - .planning/phases/30-ios-l1-triage-runbooks/30-CONTEXT.md § D-25 (applies_to discretion), D-29 (scope)
    - .planning/phases/30-ios-l1-triage-runbooks/30-PATTERNS.md § "docs/l1-runbooks/18-ios-enrollment-restriction-blocking.md"
  </read_first>
  <behavior>
    - File created; frontmatter `applies_to: all`
    - Platform gate banner line 9 (D-26)
    - 4 D-10 H2 sections; no User Action Required (D-13)
    - Symptom cites `Invalid Profile` error string verbatim from Microsoft Learn
    - L1 Triage Steps include the P-05 dual-path note (primary + fallback) with explicit portal-navigation-may-vary callout
    - Admin Action Required packet deep-links `../admin-setup-ios/00-overview.md#intune-enrollment-restrictions`
    - Related Resources contains reciprocal disambiguation link to `20-ios-device-cap-reached.md` (Specifics line 252)
    - File length 100-160 lines
  </behavior>
  <action>
    Follow the Runbook 18 block in `<interfaces>` section above verbatim. Key elements:

    - Frontmatter `applies_to: all` with the 1-line rationale recorded in the file OPTIONALLY as a hidden HTML comment `<!-- applies_to: all — enrollment restrictions span all iOS paths per D-25 Claude's discretion / research A3 recommendation -->` directly above the closing `---`, OR omit the comment and rely on PLAN.md + SUMMARY for the rationale trail. Choose whichever is cleaner; HTML comment is safe in markdown and invisible in rendered output.
    - Include the Microsoft Learn verbatim `"The configuration for your iPhone/iPad couldn't be downloaded from [Company Name]: Invalid Profile"` string in Symptom
    - L1 Triage Steps step 2 uses P-05 dual-path wording verbatim
    - Admin Action Required per D-12 structure with the 3 bulleted adjustment options
    - Related Resources includes the exact reciprocal-disambiguation sentence pointing to runbook 20

    DO NOT:
    - Include User Action Required (D-13)
    - Include a Prerequisites H2 (D-10)
    - Include real tenant group names / UPNs
  </action>
  <verify>
    <automated>node scripts/validation/check-phase-30.mjs --quick</automated>
  </verify>
  <done>
    - File exists; Checks 7/11/12 flip PASS for this file; Check 3 contributes +1 of 6
    - `grep -c "Invalid Profile" docs/l1-runbooks/18-ios-enrollment-restriction-blocking.md` ≥ 1
    - `grep -c "20-ios-device-cap-reached.md" docs/l1-runbooks/18-ios-enrollment-restriction-blocking.md` ≥ 1 (reciprocal disambiguation)
    - `grep -c "User Action Required" docs/l1-runbooks/18-ios-enrollment-restriction-blocking.md` = 0
    - `grep -c "intune-enrollment-restrictions" docs/l1-runbooks/18-ios-enrollment-restriction-blocking.md` ≥ 1 (deep-link to Phase 29 D-08 anchor)
  </done>
</task>

<task type="auto" tdd="false">
  <name>Task 2: Create 20-ios-device-cap-reached.md</name>
  <read_first>
    - docs/l1-runbooks/10-macos-device-not-appearing.md (structural template)
    - docs/admin-setup-ios/00-overview.md — confirm `#intune-enrollment-restrictions` anchor
    - docs/admin-setup-ios/02-abm-token.md — confirm existence for cross-ref
    - docs/l1-runbooks/17-ios-ade-not-starting.md (if Plan 30-04 completed before this, use live file; otherwise reference only the planned manual-sync step via cross-link syntax — the broken-link will resolve when 30-04 lands)
    - docs/decision-trees/07-ios-triage.md (Wave 1 — confirm IOSR5 click target)
    - .planning/phases/30-ios-l1-triage-runbooks/30-RESEARCH.md § 3 navigation table P-06, P-07 (dual-path) and § 4 "Runbook 20"
    - .planning/phases/30-ios-l1-triage-runbooks/30-CONTEXT.md § D-25, D-30 (quota-exhaustion scope; distinction from runbook 18)
    - .planning/phases/30-ios-l1-triage-runbooks/30-PATTERNS.md § "docs/l1-runbooks/20-ios-device-cap-reached.md"
  </read_first>
  <behavior>
    - File created; frontmatter `applies_to: all`
    - Platform gate banner line 9
    - 4 D-10 H2 sections; no User Action Required
    - Symptom cites BOTH `DeviceCapReached` literal error AND the misleading `Company Portal Temporarily Unavailable`
    - L1 Triage Steps use P-06 + P-07 verbatim
    - Admin Action Required packet includes BOTH remediation options: retire stale devices OR increase limit
    - Optional D-08 manual-sync extension noted per Specifics / D-08 extension
    - Related Resources contains reciprocal disambiguation link to `18-ios-enrollment-restriction-blocking.md`
    - File length 100-170 lines
  </behavior>
  <action>
    Follow the Runbook 20 block in `<interfaces>` section verbatim. Key elements:

    - Frontmatter `applies_to: all` (A3 discretion — documented rationale same pattern as Task 1)
    - Include BOTH error strings in Symptom: `DeviceCapReached` + the misleading `"Company Portal Temporarily Unavailable"` with the Microsoft Learn dual-meaning note
    - L1 Triage Steps walks P-06 (limit) + P-07 (enrolled count) per 30-RESEARCH.md
    - Admin Action Required packet presents the two options (retire stale OR increase limit) as a choice, with the Microsoft Learn citation favoring retire-stale as primary
    - Include the optional D-08 extension manual-sync note with cross-link to runbook 17's documentation of the scope (keeps D-08 write-exception scoping consistent)
    - Related Resources REQUIRED reciprocal disambiguation to runbook 18 + cross-ref to `02-abm-token.md` per D-30 ABM-device-assignment intersection

    DO NOT:
    - Use D-08 manual sync as a PRIMARY L1 step (it is OPTIONAL per D-08 extension in runbook 20; the primary action is to document the cap and escalate)
    - Add User Action Required
    - Include real user UPNs or device names in examples
  </action>
  <verify>
    <automated>node scripts/validation/check-phase-30.mjs --quick</automated>
  </verify>
  <done>
    - File exists; Checks 7/11/12 flip PASS for this file; Check 3 contributes +1 of 6
    - `grep -c "DeviceCapReached" docs/l1-runbooks/20-ios-device-cap-reached.md` ≥ 1
    - `grep -c "Company Portal Temporarily Unavailable" docs/l1-runbooks/20-ios-device-cap-reached.md` ≥ 1
    - `grep -c "18-ios-enrollment-restriction-blocking.md" docs/l1-runbooks/20-ios-device-cap-reached.md` ≥ 1
    - `grep -c "User Action Required" docs/l1-runbooks/20-ios-device-cap-reached.md` = 0
    - `grep -c "intune-enrollment-restrictions" docs/l1-runbooks/20-ios-device-cap-reached.md` ≥ 1
  </done>
</task>

</tasks>

<threat_model>
## Trust Boundaries

| Boundary | Description |
|----------|-------------|
| L1 agent → runbook | Portal observations + escalation documentation; no writes (runbook 18), optional read-retry (runbook 20 D-08 extension) |

## STRIDE Threat Register

| Threat ID | Category | Component | Disposition | Mitigation Plan |
|-----------|----------|-----------|-------------|-----------------|
| T-30-05-01 | Content leakage | Example group names / UPNs | mitigate | Use placeholders throughout; reviewer spot-check |
| T-30-05-02 | Routing confusion | Runbook 18 vs runbook 20 ambiguity (SC #4 failure surface) | mitigate | Explicit reciprocal disambiguation in Related Resources of both files (Specifics line 252 REQUIRED); triage tree IOS2 question phrasing disambiguates at routing entry per 30-02 Plan |
</threat_model>

<verification>
1. `node scripts/validation/check-phase-30.mjs --quick` — Checks 7 (two of six files now exist), 11, 12 PASS for both; Check 3 gains +2 of 6
2. Manual: `grep -A 0 -B 0 "20-ios-device-cap-reached.md" docs/l1-runbooks/18-ios-enrollment-restriction-blocking.md` AND `grep -A 0 -B 0 "18-ios-enrollment-restriction-blocking.md" docs/l1-runbooks/20-ios-device-cap-reached.md` — both must return matches (reciprocal cross-references — Specifics line 252 REQUIRED)
3. Manual: compare the "Use this runbook when..." intros — they should explicitly mention each other as the sibling routing (runbook 18 mentions "for device limit, see runbook 20"; runbook 20 mentions "for Invalid Profile, see runbook 18")
</verification>

<success_criteria>
- [x] Both files created with D-21 filenames
- [x] Both have D-10 sectioned format (4 H2 actor sections; no User Action Required)
- [x] Both have D-26 platform gate banner line 9
- [x] Runbook 18 cites `Invalid Profile` verbatim; Runbook 20 cites both `DeviceCapReached` AND `Company Portal Temporarily Unavailable`
- [x] Both deep-link to `00-overview.md#intune-enrollment-restrictions` (Phase 29 D-08 anchor)
- [x] Both contain reciprocal disambiguation cross-reference in Related Resources (Specifics line 252 REQUIRED)
- [x] Runbook 20 includes the optional D-08 manual-sync extension note
- [x] Validator Checks 3, 7, 11, 12 gain two file-level PASS contributions each
</success_criteria>

<output>
After completion, create `.planning/phases/30-ios-l1-triage-runbooks/30-05-SUMMARY.md` with:
- Both file lengths
- Confirmation of reciprocal disambiguation language in both Related Resources sections
- Confirmation of `applies_to: all` with 1-line rationale for each
- Any deviations from `<interfaces>` content
</output>
