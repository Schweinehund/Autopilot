# Phase 90: MDM Migration Walkthrough + L2 Runbook #30 - Research

**Researched:** 2026-06-24
**Domain:** macOS MDM migration documentation (Kandji/Iru → Intune, B1 OS-26 in-place + B2 pre-26 fallback + PSSO re-registration + L2 failure runbook)
**Confidence:** MEDIUM-HIGH overall (HIGH on settled facts; MEDIUM on ABM recovery + supervision; LOW on Iru console exact labels)

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

- **D-01 (1B):** Shared pre-flight (OS-gate selector + readiness/secret-retrieval), then hard-fork: B1 9-stage in-place track; B2 short retire/wipe/re-enroll track ending with link-not-copy handoff to guide `01`. Stage Summary Table with "Path" column (B1/B2/Both).
- **D-02 (2A):** Thin "post-migration PSSO re-registration" stage in `02` covers only migration-delta (unenroll → IdP unregistration; ACME reissue; new-tenant SE key; why "Registration Required" appears) + `app-sso platform -s` final gate. Registration UX delegated link-not-copy to guide `01`. Bidirectional junction anchor.
- **D-03 (3A):** L2 #30 mirrors #27: Context preamble + in-preamble routing + three parallel tracks (A: deadline lockout + ABM recovery; B: profile-not-delivered/enrollment-failed; C: PSSO re-registration stuck). Track C link-not-copies to L2 #27. Log-collection prereq cross-links L2 #10.
- **D-04 (4A):** Vendor-neutral conceptual steps in walkthrough; both "Kandji" and "Iru" names surfaced; explicit "verify current Iru console labels (Oct-2025 rebrand)" note. Secret retrieval BEFORE deletion is mandatory and explicit.

### Claude's Discretion

- Exact stage wording/phrasing, callout admonition style, table column choices (within structural decisions).
- Recommended deadline-window guidance (pilot one device first; set deadline only after enrollment profile confirmed ready) — present 1–90 day range with a recommendation.
- Sibling consistency: match guide `00`/`01`'s frontmatter shape, "See Also" structure, Glossary Quick Reference, Version History footers.

### Deferred Ideas (OUT OF SCOPE)

None — all within phase scope. Glossary/capability-matrix = Phase 91; navigation-hub wiring = Phase 92; harness lineage bump = Phase 93.
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| MIG-01 | Consolidated walkthrough `02-mdm-migration-psso.md` — ABM "Assign Device Management" + Deadline; macOS 26+ in-place (wipe-free); OS≥26-vs-OS<26 path selector; deadline mechanics (1–90 day range, notification cadence, non-dismissible enforcement) | ABM button label confirmed; deadline mechanics verified; enrollment type confirmed (profile-based); notification cadence from multiple sources |
| MIG-02 | Pre-macOS-26 fallback (retire/wipe/re-enroll); `profiles renew` explicitly NOT a shortcut for ADE devices | HIGH — confirmed by PITFALLS P-11 + Microsoft Q&A source |
| MIG-03 | Kandji/Iru source-side steps — secret retrieval (FileVault keys / Activation Lock bypass) BEFORE deletion; Delete Device Record; ~15-min agent auto-removal; both "Kandji" and "Iru" names surfaced | Kandji support.kandji.io UI labels confirmed; D-04 mandates conceptual/vendor-neutral; "before deletion" time constraint confirmed |
| MIG-04 | Mandatory post-migration PSSO re-registration (genuine unenroll → IdP unregistration; SE key re-created; ACME reissued; "Registration Required"); `app-sso platform -s` verification; bidirectional cross-link to guide `01` | HIGH (Apple authoritative); ACME confirmed in MS Learn; bidirectional anchor design confirmed by D-02 |
| RUN-01 | L2 runbook `30-macos-mdm-migration-failure.md` — three tracks (deadline lockout + ABM recovery, profile-not-delivered/enrollment-failed, PSSO re-registration stuck); L2 #10 prereq; indexed in `00-index.md`; See Also in #27 | Track structure confirmed by D-03; L2 #10 filename confirmed; ABM recovery steps MEDIUM confidence; Track C link-not-copy to #27 confirmed |
</phase_requirements>

---

## Summary

This research closes the six open gaps flagged in CONTEXT.md and SUMMARY.md. The settled HIGH-confidence facts from SUMMARY.md are carried forward without re-derivation; this document focuses exclusively on the Plan-time research flags.

**Primary finding:** The HIGH-priority gap about Intune profile-based enrollment configuration is now substantially resolved: Apple confirms the OS-26 in-place migration result is "profile-based enrollment," and Microsoft Learn's ADE overview confirms that Intune's existing ADE enrollment infrastructure (ADE token + enrollment policy/profile assigned to device) handles migrated devices — no distinct "profile-based enrollment" configuration mode exists as a separate Intune menu item. The migrated device re-enrolls through the existing ADE enrollment policy assigned to the device's serial number in ABM.

**ABM button label:** "Assign Device Management" is confirmed as the primary ABM action label. A secondary label "Reassign" or "Re-assign Device Management" appears in some vendor documentation for the device-edit path, but the primary action label in ABM is "Assign Device Management." The authoring recommendation is to use "Assign Device Management" (confirmed by Apple ABM User Guide and ManageEngine) with a note that the menu path varies by whether individual or bulk assignment is used.

**Supervision status:** MEDIUM confidence that supervision is preserved through OS-26 in-place migration. Apple's own documentation on profile-based enrollment states "For a Mac with macOS 11 or later, Device Enrollment also enforces supervision." Since the migration re-enrolls via profile-based enrollment, supervision is expected to be enforced/regranted. The Ivanti source explicitly states "both supervised and unsupervised Apple devices are supported." However, no authoritative single-source pilot confirmation exists — state at MEDIUM confidence with a verify-on-pilot-device note.

**ABM admin recovery for deadline lockout:** MEDIUM confidence. ABM provides two mechanisms: (1) before enrollment starts, admins can cancel the migration in ABM ("Pending Migrations" view; select "Change Deadline" → remove deadline to cancel); (2) after enrollment completes from the locked screen, the lock clears automatically. Apple Support confirms ABM holds the lock and an authorized admin can unlock it. The Kandji PITFALLS research noted the conceptual path: ABM admin Devices → locate by serial → release/cancel. Exact UI labels for the lockout-state release are not confirmed in a single authoritative source — state at MEDIUM confidence.

**macOS 26 GA status:** Confirmed GA released September 15, 2025. [CITED: isc.upenn.edu/news/macos-26-tahoe-released-9152025]

**Kandji/Iru console steps:** Confirmed from support.kandji.io: the action is "Delete Device Record" (via Device Action Menu). Page still reads "Kandji" exclusively — no Iru rebranding visible in support.kandji.io content. D-04 mandates vendor-neutral conceptual phrasing regardless; the support URL confirms the conceptual process is valid.

---

## Priority Research Gap Resolutions

### Gap 1 (HIGH): Intune profile-based enrollment configuration for OS-26-migrated macOS devices

**Question:** Does Intune require explicit profile-based-enrollment configuration to receive OS-26-migrated macOS devices, beyond ADE token assignment?

**Resolution:** MEDIUM-HIGH confidence. No separate "profile-based enrollment" configuration path exists as a distinct Intune menu item for migrated devices. The Intune mechanism is:

1. The device serial number is already in ABM assigned to the Intune MDM server (done via "Assign Device Management" in ABM by the admin as part of the migration).
2. Intune has an existing ADE enrollment policy (the standard macOS ADE policy with user affinity, modern authentication, Await Configuration: Yes) assigned to the device or set as default for the token.
3. When the macOS 26 migration triggers the re-enrollment, the device re-enrolls through that existing ADE enrollment policy — exactly as a fresh ADE enrollment would.
4. From Intune's perspective, the device re-enrolls and the existing enrollment policy delivers profiles and PSSO configuration.

Apple's own documentation states the result: "a Mac with macOS 26 or later supports migration that unenrolls from an Automated Device Enrollment and reenrolls with profile-based enrollment." This describes the Apple-side mechanism; on the Intune side, the device re-enrolls using the ADE enrollment policy already assigned to it.

**What the B1 "post-migration policy delivery" stage should state:**
- After the OS-26 migration completes on device, Intune delivers the enrollment policy (profiles, PSSO Settings Catalog, FileVault escrow, etc.) exactly as it would to a fresh ADE enroll — because from Intune's perspective, it IS a fresh enrollment of that serial number.
- No additional Intune admin action is required after the ABM "Assign Device Management" step and the deadline workflow — the device re-enrolls automatically when the user triggers migration (or at deadline enforcement).
- The PSSO Settings Catalog policy must already be assigned and ready (part of Intune readiness pre-flight).

**Key implication for docs:** The B1 readiness stage must verify that the ADE enrollment policy is assigned to the device serial number (or the token's default policy is set) BEFORE triggering the ABM migration. This is the critical Intune-side readiness step — not a separate "profile-based enrollment" configuration.

**Confidence:** MEDIUM-HIGH [CITED: Microsoft Learn ADE overview (learn.microsoft.com/en-us/intune/device-enrollment/apple/overview-automated-enrollment-macos, updated 2026-04-15); Apple Support migration guide (support.apple.com/guide/deployment/migrate-managed-devices-dep4acb2aa44/web)]

**Authoring posture:** State as fact that the existing ADE enrollment policy handles the re-enrollment; add a pre-migration readiness checklist step: "Verify the ADE enrollment policy is assigned to the migrating device serial numbers (or set as token default) before triggering ABM Assign Device Management."

---

### Gap 2 (MEDIUM): Current Iru console device-deletion steps post-rebrand

**Resolution:** The support portal remains at support.kandji.io and content still reads "Kandji" (no visible Iru-branded content in the KB article). The exact UI steps confirmed from support.kandji.io/kb/deleting-a-device-record-and-uninstalling-kandji:

- Navigate to Devices
- Select the device
- Click **Device Action Menu** (top right of device record)
- Select **Delete Device Record**
- In confirmation popup, type "DELETE" in the text field
- Click **Delete Device Record** again

After deletion: the Kandji agent receives notification at next 15-min check-in and uninstalls itself automatically, removing installed profiles. FileVault recovery keys and device secrets are permanently destroyed when the device record is deleted — **must retrieve BEFORE deletion** (MIG-03 mandatory constraint).

**Authoring posture (per D-04):** Use vendor-neutral conceptual phrasing in the doc, surface both names ("Kandji (rebranded Iru, Oct 2025; support portal: support.kandji.io)"), add "verify current Iru console labels on authoring day" note. The conceptual steps (retrieve secrets → delete device record → ~15-min agent auto-removal) are accurate regardless of console label drift.

**Confidence:** MEDIUM for Iru console labels (support.kandji.io still shows "Kandji" branding; Iru UI labels unverified) | HIGH for the conceptual procedure [CITED: support.kandji.io/kb/deleting-a-device-record-and-uninstalling-kandji]

---

### Gap 3 (MEDIUM): Supervision status preserved through OS-26 in-place migration

**Resolution:** MEDIUM confidence that supervision is preserved/regranted. Key evidence:

1. Apple's Platform Deployment guide for macOS 11+: "For a Mac with macOS 11 or later, Device Enrollment also enforces supervision." Since the OS-26 migration re-enrolls via profile-based enrollment, supervision should be enforced as a property of enrollment.
2. Ivanti blog (MEDIUM-confidence source): "Both supervised and unsupervised Apple devices are supported [for OS-26 migration]" — suggests supervised devices can migrate without supervision being stripped.
3. The `profiles` command migration path (older macOS) explicitly mentions "regranting supervision" as one of the outcomes — analogous behavior expected on OS-26 path.
4. Apple Support migration guide is silent on supervision status post-migration — this is the key gap.
5. No authoritative Apple document explicitly states "supervision is preserved" for the OS-26 path.

**Authoring posture:** Do NOT state supervision is definitively preserved as fact. State at MEDIUM confidence: "Supervision is expected to be maintained through the OS-26 in-place migration — macOS 11+ profile-based enrollment enforces supervision, and the migration re-enrolls via profile-based enrollment. Verify on a pilot device before fleet-wide migration (`profiles status -type enrollment | grep Supervised`)." This is exactly what PITFALLS P-10 recommends.

**Confidence:** MEDIUM [multiple community + one Apple indirect citation; no authoritative direct confirmation]

---

### Gap 4 (MEDIUM): ABM admin-recovery steps for deadline-lockout device (Track A of L2 #30)

**Resolution:** MEDIUM confidence. Two recovery phases established:

**Phase A — Before enrollment starts (device not yet locked):**
- In ABM: Devices → select the device → **Change Deadline** → remove the deadline date → Save. This cancels the migration prompts on device and reverts to the original MDM assignment.
- Source: Apple ABM documentation summary from web search [CITED: support.apple.com — ABM migration guide]

**Phase B — Device is locked at full-screen non-dismissible prompt:**
- Apple Support deployment guide states: "Apple School Manager or Apple Business holds a lock on the device; a user with the proper permissions in Apple School Manager or Apple Business can unlock it." [CITED: support.apple.com/guide/deployment/migrate-managed-devices-dep4acb2aa44/web]
- The conceptual recovery options from multiple sources:
  - **Option 1 — Fix enrollment and complete:** Ensure the Intune enrollment policy is properly assigned and the device has network access. The device can complete enrollment from the locked screen once the Intune-side issue is resolved.
  - **Option 2 — ABM admin release:** An ABM admin with Administrator or Device Enrollment Manager privileges can navigate to the device in ABM and cancel/undo the migration (exact UI flow in ABM lockout-state: "Pending Migrations" or device record → cancel; specific label unconfirmed at this confidence level).

**What the L2 Track A runbook should state:**
- If device is locked but enrollment CAN complete (network issue resolved, Intune policy fixed): guide the user through the enrollment screens — the lock clears on successful enrollment.
- If enrollment cannot complete: ABM admin must cancel the migration via ABM (conceptual steps; note MEDIUM confidence; instruct to verify exact ABM UI on authoring day).
- Cross-link to Apple Business Manager help for "Modify or cancel a migration" rather than asserting exact click-paths.

**Confidence:** MEDIUM — Apple authoritative that ABM holds the lock and can release it; exact ABM UI navigation for post-lockout release not confirmed in a single authoritative source. [CITED: Apple Support — Migrate managed devices dep4acb2aa44; Apple ABM User Guide axm3a49a769d]

---

### Gap 5 (LOW): ABM exact button label — "Assign Device Management" vs "Re-assign Device Management"

**Resolution:** "Assign Device Management" is confirmed as the primary label.

Evidence:
- Apple Business Manager User Guide (support.apple.com): "Select the device, then select Assign Device Management." [HIGH confidence]
- ManageEngine migration guide: "Assign Device Management" [MEDIUM-HIGH]
- SimpleMDM blog: references "Re-assign Device Management" in the device-edit path — this may be the label shown when a device is ALREADY assigned to an MDM server and is being RE-assigned.
- Drew Smith Medium article: navigate to "More" button (top-right) → select "Assign Device Management"

**Authoring decision:** Use "Assign Device Management" as the primary label (confirmed by ABM User Guide). Add a note: "In ABM, the action may be labeled 'Assign Device Management' or 'Re-assign Device Management' depending on the device's current assignment state — verify label in current ABM portal on authoring day." This satisfies D-04's freshness-note requirement.

**Confidence:** HIGH for "Assign Device Management" as label [CITED: support.apple.com/guide/business/migrate-devices-to-a-new-management-service-axm3a49a769d/web]

---

### Gap 6: macOS 26 GA status + non-dismissible deadline lock behavior

**macOS 26 GA:** Confirmed released September 15, 2025. [CITED: isc.upenn.edu/news/macos-26-tahoe-released-9152025]

**Non-dismissible deadline lock:** CONFIRMED from multiple sources (Apple deployment guide, Addigy, Ivanti, ManageEngine): when the deadline passes, macOS shows a full-screen, non-dismissible prompt that prevents device use until enrollment completes. The "Not Now" option is not available after deadline.

**Deadline notification cadence (confirmed):** Daily notifications until 24h before deadline; hourly notifications in the last 24h; then at 60-, 30-, 10-, and 1-minute intervals in the last hour.

**Freshness stamp:** All OS-26-gated sections must carry `last_verified: 2026-06-24` / `review_by: 2026-09-24` per project convention.

**Confidence:** HIGH for GA date; HIGH for non-dismissible lock behavior; HIGH for notification cadence [CITED: Apple Support migration guide dep4acb2aa44; Addigy OS-26 migration blog; web search confirmations]

---

## Facts the Docs MUST State

### 02-mdm-migration-psso.md — Walkthrough (B1 + B2)

#### Shared Pre-flight (Path: Both)

| Fact | Value | Confidence |
|------|-------|------------|
| OS gate for B1 in-place migration | macOS 26 or later (hard gate; non-dismissible lock behavior unavailable below macOS 26) | HIGH |
| OS gate for B2 fallback | macOS 25 or earlier → wipe required | HIGH |
| `profiles renew` for ADE devices | NOT a supported shortcut; macOS only queries ABM for MDM assignment during Setup Assistant after a wipe | HIGH |
| Secret retrieval MUST precede deletion | FileVault keys + Activation Lock bypass codes permanently destroyed when device record is deleted; bypass codes only retrievable within 30 days after device supervised | HIGH |
| Source-MDM vendor names | "Kandji (rebranded **Iru**, October 2025; support portal URL unchanged: support.kandji.io)" on first mention | HIGH |
| Kandji/Iru source-side release | Delete Device Record → agent self-removes at next 15-min check-in; allow ~15 min for profile removal before proceeding | HIGH (from Kandji docs) |
| Iru console label note | Add: "Verify current Iru console labels — rebrand in Oct 2025; steps may differ from support.kandji.io documentation" | Authoring requirement (D-04) |

#### B1 — macOS 26 In-Place Path (9 stages)

| Stage | Required Content | Confidence |
|-------|-----------------|------------|
| Stage 1: Fleet Assessment (OS gate) | Check all target devices are running macOS 26+ before setting deadline; devices on macOS <26 will hit the non-dismissible lock but cannot complete in-place enrollment; separate B2 fallback path required for those | HIGH |
| Stage 1 (MEDIUM callout) | Devices added to ABM while running macOS <26 and later OS-upgraded may require a one-time wipe-and-re-enroll through Setup Assistant while running macOS 26 before subsequent wipe-free migrations work | MEDIUM (P-12) |
| Stage 2: Intune Readiness | Verify: (a) ADE token active; (b) PSSO Settings Catalog policy created and assigned to target user groups; (c) CA exclusions + TLS exemptions in place; (d) ADE enrollment policy assigned to device serial numbers (or set as token default). PSSO policy must reach device immediately after re-enrollment | HIGH |
| Stage 2: Sync timing | After ABM "Assign Device Management", wait up to 24h for device to sync to Intune, or trigger manual sync (15-min rate limit; 7-day full-sync cooldown) | HIGH |
| Stage 2: VPP token sequencing | If migrating VPP/Apps and Books token: revoke app licenses in Kandji/Iru FIRST, remove token from Kandji/Iru, THEN upload to Intune. "Take control of token" shortcut causes stale license conflicts | HIGH |
| Stage 3: Secret retrieval | Retrieve FileVault recovery keys and Activation Lock bypass codes from Kandji/Iru console BEFORE Delete Device Record. Both types of secrets permanently deleted on device record deletion. Bypass codes only available within 30 days of device supervision | HIGH |
| Stage 4: Source-side release | Conceptual: Delete Device Record in Kandji/Iru (verify current Iru console labels); agent auto-removes at next check-in (~15 min); allow time before proceeding | MEDIUM for UI labels; HIGH for conceptual flow |
| Stage 5: ABM "Assign Device Management" | In ABM: Devices → select device → "More" / ellipsis menu → "Assign Device Management" (label may vary; verify in current ABM portal) → select Intune MDM server → Continue | HIGH for action name; MEDIUM for exact UI path |
| Stage 6: Set Deadline | Deadline range: 1–90 days. Recommendation: set a generous deadline (e.g., 14+ days for initial pilots) and only after Intune enrollment policy is confirmed assigned. Do NOT set deadline before Intune readiness is confirmed | HIGH for range; authoring discretion for recommendation |
| Stage 7: User notification window | Cadence: daily until 24h before deadline; hourly in last 24h; 60/30/10/1 min in last hour. User sees "Start Enrollment" prompt. If user does nothing: | HIGH |
| Stage 8: Deadline enforcement | Non-dismissible full-screen prompt on macOS when deadline missed. Cannot be dismissed until enrollment completes. Admin recovery: fix Intune enrollment issue AND/OR cancel migration in ABM ("Change Deadline" → remove deadline); pre-lockout cancellation clears prompts immediately | HIGH for behavior; MEDIUM for recovery steps |
| Stage 9: Post-migration enrollment + PSSO re-registration | Migration mechanism: genuine unenroll from old MDM + reenroll via profile-based enrollment (Intune delivers enrollment policy, PSSO policy, etc.). ACME cert reissued (genuine re-enrollment). Supervision: expected preserved/regranted via profile-based enrollment (macOS 11+ enforces supervision on enrollment); verify on pilot device (`profiles status -type enrollment`) | HIGH for enrollment mechanism; MEDIUM for supervision status |
| Stage 9: PSSO re-registration (ALWAYS required) | Apple authoritative: "If you unenroll a Mac from the device management service, it also unregisters from the IdP." Post-migration "Registration Required" notification WILL appear. User must complete MFA re-registration. Do NOT document same-tenant key survival as a possibility | HIGH |
| Stage 9: Verify | `app-sso platform -s` → both `Device Registration: REGISTERED` + `User Registration: REGISTERED` required | HIGH |
| Freshness stamp location | `last_verified: 2026-06-24` / `review_by: 2026-09-24` on all OS-26-gated content (entire B1 path + ABM Deadline mechanics) | Project requirement |

#### B2 — Pre-macOS-26 Fallback (5 stages)

| Stage | Required Content | Confidence |
|-------|-----------------|------------|
| Stage 1: OS gate | Confirm device is running macOS 25 or earlier. State: "The OS-26 in-place migration path (B1) is not available. This path requires a wipe." | HIGH |
| Stage 2: Secret retrieval | Same as B1 Stage 3 — retrieve FileVault keys + Activation Lock bypass BEFORE deletion | HIGH |
| Stage 3: Retire/wipe in Kandji/Iru | Retire device in Kandji/Iru (or delete device record). Wipe device (Erase Mac). DO NOT use `sudo profiles renew` — for ADE-enrolled devices, `profiles renew` does not re-run Setup Assistant and enrollment fails | HIGH |
| Stage 4: ADE re-enroll via Intune | Device contacts ABM during Setup Assistant and receives Intune enrollment profile (device must already be assigned to Intune MDM server in ABM). Standard ADE enrollment flow. ACME cert issued | HIGH |
| Stage 5: PSSO from scratch | B2 devices go through the full PSSO provisioning flow — link-not-copy to guide `01` for the standard provisioning walkthrough (A1 path from guide `01`) | Link-not-copy requirement (D-01) |
| `profiles renew` prohibition | State explicitly: "`sudo profiles renew -type enrollment` is NOT a supported migration path for ADE-enrolled macOS devices. macOS only queries ABM for MDM assignment during Setup Assistant after a device wipe. Using `profiles renew` on an ADE-enrolled device results in enrollment failure — the SSO extension profile cannot be installed because MDM enrollment is a prerequisite for that profile, creating a circular dependency." | HIGH (P-11) |

---

### 30-macos-mdm-migration-failure.md — L2 Runbook

#### Track A: Deadline Lockout

| Content | Details | Confidence |
|---------|---------|------------|
| Symptom | Non-dismissible full-screen migration prompt on macOS; device cannot be used for any work | HIGH |
| Diagnostic check 1 | Verify the device's Intune enrollment policy is assigned and the enrollment endpoint is reachable from the device (network/firewall check) | HIGH |
| Diagnostic check 2 | Verify the Intune ADE enrollment policy is actually assigned to the device's serial number (Intune admin center → Enrollment → Apple → Enrollment program tokens → Devices → locate serial) | HIGH |
| Recovery option A (preferred) | Fix the enrollment configuration (policy assignment, network, CA exclusion) and allow the device to complete enrollment from the locked screen — lock clears on successful enrollment | HIGH |
| Recovery option B (admin) | ABM admin (Administrator or Device Enrollment Manager role): navigate to the device in ABM → change or cancel the migration deadline. Apple documentation confirms "Apple School Manager or Apple Business holds a lock on the device; a user with the proper permissions can unlock it." Exact ABM UI path for post-lockout release: verify in current ABM portal — state at MEDIUM confidence | MEDIUM |
| Recovery option B note | If canceling via ABM before enrollment: Devices → select device → Change Deadline → remove deadline → Save. This reverts prompts and re-assigns device to original MDM. For a device already in the lockout screen: contact Apple Business Support if ABM cancel does not release the lock | MEDIUM |
| Must NOT state | Exact click-path for releasing a mid-lockout device as verified fact — state conceptually and instruct to verify in ABM portal | Authoring requirement |

#### Track B: Profile-Not-Delivered / Enrollment-Failed

| Content | Details | Confidence |
|---------|---------|------------|
| Root cause 1 | Leftover Kandji/Iru agent still running: `/Library/Kandji/Kandji Agent.app` or associated LaunchDaemons present after migration. Old MDM certificates can persist and block Intune enrollment | MEDIUM (community + MS Q&A) |
| Diagnostic | Run: `ls /Library/Kandji/` — if Kandji Agent directory present, agent was not self-removed. Also check: `profiles status -type enrollment` for stale Kandji MDM certificates | MEDIUM |
| Fix — B1 path (agent residue) | Delete Device Record in Kandji/Iru BEFORE migration (which triggers agent self-removal at next check-in). Allow 15+ min after Delete Device Record before triggering ABM assignment. If agent still present on device post-migration, push an uninstall script via Intune or manually remove | MEDIUM |
| Fix — B2 path (agent residue) | Full wipe-and-re-enroll removes all agent artifacts; no separate cleanup needed for B2 | HIGH |
| Root cause 2 | ADE enrollment policy not assigned to device serial number before migration triggered | HIGH |
| Diagnostic | Intune admin center → Enrollment → Apple → Enrollment program tokens → [token] → Devices → confirm policy shown for the device serial number | HIGH |
| Root cause 3 | ABM/Intune sync lag — device not yet visible in Intune's enrollment list | HIGH |
| Diagnostic | Trigger manual sync; check last sync time; wait up to 24h | HIGH |
| Root cause 4 | Mixed-fleet issue: device running macOS <26 received the deadline but cannot complete in-place enrollment | HIGH |
| Log collection prereq | Cross-link to [macOS Log Collection Guide (L2 #10)](10-macos-log-collection.md) — collect IntuneMacODC zip before investigation | HIGH |

#### Track C: PSSO Re-Registration Stuck

| Content | Details | Confidence |
|---------|---------|------------|
| Core statement | PSSO re-registration is ALWAYS required after MDM migration (Apple authoritative: unenrollment = IdP unregistration). "Registration Required" notification appearing post-migration is expected, not an error | HIGH |
| Routing | If PSSO re-registration is stuck (no "Registration Required" appears, or registration initiated but not completing): link-not-copy to [L2 #27 macOS Platform SSO Investigation](27-macos-sso-investigation.md) — Track A handles registration failure investigation | Link-not-copy requirement (D-03) |
| First check | Confirm device is user-affinity enrolled (userless devices never register). Confirm migration enrollment completed (Intune shows device as Enrolled, compliant/not yet evaluated) before investigating PSSO | HIGH |
| Quick verification | `app-sso platform -s` — if `Device Registration: REGISTERED` but `User Registration: NOT REGISTERED`, device enrolled but user has not completed MFA re-registration yet. If both NOT REGISTERED, escalate to L2 #27 Track A | HIGH |
| Must NOT document | PSSO key survival (same-tenant) as a possible outcome. Must NOT inline #27 investigation steps (link-not-copy violation) | Authoring requirement |

#### Context Preamble Routing (mirroring #27 style)

The preamble should route:
- Device stuck on non-dismissible migration screen → Track A
- Migration appeared to complete but Intune shows not enrolled, or profiles not delivered → Track B
- Migration complete and enrolled, but PSSO "Registration Required" not appearing or stuck → Track C
- Migration complete and PSSO "Registration Required" tapped but registration stuck → Track C → link to L2 #27

---

### 00-index.md Row Addition

Add row to macOS ADE Runbooks "When to Use" table:

| Runbook | When to Use | Prerequisite |
|---------|-------------|--------------|
| [macOS MDM Migration Failure](30-macos-mdm-migration-failure.md) | Migration deadline lockout (non-dismissible screen), profile-not-delivered after migration, or PSSO re-registration stuck post-migration | [macOS Log Collection](10-macos-log-collection.md) |

Add L2 #30 mapping to macOS L1 Escalation Mapping table (or note no L1 source exists yet; migration failures may arrive as direct L2 tickets).

---

### 27-macos-sso-investigation.md — Reciprocal See Also

Append to Related Resources section:
- [macOS MDM Migration Failure (runbook 30)](30-macos-mdm-migration-failure.md) — for PSSO re-registration stuck post-migration from Kandji/Iru; Track C of #30 routes to this runbook

---

## Structural Conventions to Mirror

### Primary sibling: `docs/macos-lifecycle/01-psso-provisioning-walkthrough.md`

**Confirmed from direct file read — Phase 90 MUST mirror:**

1. **Frontmatter shape:**
   ```
   ---
   last_verified: YYYY-MM-DD
   review_by: YYYY-MM-DD
   applies_to: ADE
   audience: all
   platform: macOS
   ---
   ```

2. **Platform gate callout block** (immediately after frontmatter, before H1): `> **Platform gate:** This guide covers...`

3. **H1 title format:** `# macOS [Topic] Walkthrough: B1 [path name] and B2 [path name]` (parallel to `01`'s pattern)

4. **Path selector table** (first content after role-description paragraph):
   ```
   ## Which Path Is Right for You?
   | Path | macOS Requirement | [columns] | Use When |
   ```

5. **Userless-device scope callout** (immediately after path selector, in a `> **Userless devices:**` blockquote)

6. **Prerequisites section** — checklist format (`- [ ]`), split into Common and path-specific subsections

7. **Mermaid pipeline diagram** (`## The [X] Pipeline`) with `graph TD` showing stage flow and branch point

8. **Stage Summary Table** with columns: `| Stage | Actor | Location | What Happens | Key Pitfall | Path |`
   - Path column values: `Both`, `B1`, `B2`

9. **Per-stage anatomy (4-block + extras):**
   - `### What the Admin Sees`
   - `### What Happens` (numbered steps)
   - `### Behind the Scenes`
   - `### Watch Out For`
   - `### What the User Sees` (at user-facing stages)
   - `### How to Verify` (with `app-sso platform -s` block at applicable stages)

10. **`app-sso platform -s` output block:** Always shows ONLY full end-state (`Device Registration: REGISTERED` + `User Registration: REGISTERED`). Never fabricated partial/intermediate output.

11. **A2-style divergence block** (for path-specific content): indented `>` blockquote with horizontal rules inside

12. **OS-26 freshness stamp at section end:**
    ```
    _Section provenance — `last_verified: YYYY-MM-DD` / `review_by: YYYY-MM-DD+90d`. [Section description]. Re-confirm [what to verify] at each 90-day review._
    ```

13. **See Also section** — three subsections: Terminology and Concepts / Technical References / Related Guides

14. **Glossary Quick Reference table:** `| Term | Definition | First Appears |`

15. **Version History table:** `| Date | Change |` (no Author column in `01`; `27` has Author column — `02` should follow `01`'s sibling convention, i.e., no Author column)

### L2 sibling: `docs/l2-runbooks/27-macos-sso-investigation.md`

**Confirmed from direct file read — Phase 90 L2 #30 MUST mirror:**

1. **Frontmatter:** Same shape as `01`
2. **Platform gate callout** (before H1)
3. **H1:** `# macOS [Topic]` (no "L2" or number in H1 — consistent with #27)
4. **`## Context` preamble** — describes failure classes covered + log-collection prerequisite + in-preamble routing paragraph ("From L1 escalation?")
5. **Routing in preamble:** Bullet list mapping symptom/source → Track letter (no separate router table — mirrors #27 exactly per D-03)
6. **Parallel tracks as H2:** `## Track A:`, `## Track B:`, `## Track C:` (no H2 router; routing handled in Context preamble)
7. **Step numbering within tracks:** `### Step N:` headers
8. **Code blocks** for diagnostic commands
9. **`> **Important:**` or `> **Note:**` blockquotes** for cautions within steps
10. **`> **Version gate — macOS X.Y–X.Z:**`** callout format for OS-specific bugs
11. **`## Microsoft Support Escalation Packet`** section — bulleted list of artifacts required before opening a support case
12. **`## Related Resources`** section — bulleted list with `[runbook N](path)` format, prerequisite listed first
13. **`## Version History`** table — `| Date | Change | Author |` columns

### Confirmed L2 #10 Filename

**Exact filename:** `10-macos-log-collection.md` [VERIFIED from directory listing of `docs/l2-runbooks/`]

**Full path for cross-linking:** `docs/l2-runbooks/10-macos-log-collection.md`

**Link pattern used in #27:** `[macOS Log Collection Guide](10-macos-log-collection.md)` (relative, same-directory)

---

## Authoring Postures for Unverifiable Facts

### Facts requiring conceptual phrasing + freshness stamps

| Fact | Authoring Posture | Freshness Stamp Required? |
|------|------------------|--------------------------|
| Iru console exact UI labels (post-rebrand) | "Delete Device Record (verify current Iru console labels — support.kandji.io; Oct-2025 rebrand)" | Yes — in every step referencing Iru console |
| ABM exact button label in lockout-state release | "In ABM, cancel or modify the migration (verify exact navigation in current ABM portal)" | Yes — note "verify in current ABM on authoring day" |
| Supervision status preserved through OS-26 migration | "Supervision is expected to be maintained (profile-based enrollment enforces supervision on macOS 11+); verify on pilot device via `profiles status -type enrollment | grep Supervised` before fleet migration" | Yes — MEDIUM confidence callout required |
| ABM recovery steps for deadline-locked device (exact click-path) | Conceptual: "ABM admin can cancel the migration or change the deadline to release the lock — contact Apple Business Support or consult current ABM documentation for exact steps" | Yes |
| One-time wipe requirement for devices added to ABM pre-macOS-26 | "If your fleet devices were enrolled into ABM while running macOS 25 or earlier, the first migration may require a wipe-and-re-enroll regardless of current OS version — verify with a pilot device before fleet migration" | Yes — MEDIUM confidence callout |

### Facts that may be stated without a freshness stamp (HIGH confidence, stable)

| Fact | Basis |
|------|-------|
| PSSO re-registration ALWAYS required post-migration | Apple authoritative — Apple Platform Deployment guide (not version-gated) |
| `profiles renew` NOT a shortcut for ADE-enrolled devices | Apple ADE behavior; macOS ABM contract (stable, not version-gated) |
| ACME cert reissued on genuine re-enrollment | Microsoft Learn — ACME overview (stable) |
| Deadline range: 1–90 days | Apple ABM documented (stable for macOS 26+) |
| Non-dismissible full-screen lock on deadline miss | Apple deployment guide (stable for macOS 26+) |
| Kandji → Iru rebrand October 2025; support.kandji.io unchanged | HIGH (confirmed from search results) |
| Secret retrieval BEFORE deletion (FileVault + Activation Lock bypass codes permanently destroyed on deletion) | Kandji docs + general MDM behavior |

---

## Common Pitfalls Specific to Authoring These Docs

1. **Fabricating Iru console labels.** The support portal (support.kandji.io) still shows "Kandji" branding. Do not invent Iru-branded label names. Use conceptual descriptions + freshness note (D-04 mandate).

2. **Stating supervision is definitively preserved.** No single authoritative Apple source explicitly confirms supervision is preserved through OS-26 migration. State at MEDIUM confidence with pilot-device verification recommendation.

3. **Asserting same-tenant PSSO key survival.** MUST NOT appear in docs. Even if the migration stays within the same Entra tenant, Apple's authoritative statement is that MDM unenrollment = IdP unregistration. Secure Enclave key is re-created on new enrollment.

4. **Duplicating L2 #27 content in Track C.** Track C of L2 #30 must link-not-copy to L2 #27 for registration investigation steps. Never inline `app-sso platform -s` interpretation or log-collection steps that already live in #27.

5. **Asserting exact ABM click-path for lockout recovery.** The ABM UI for canceling a migration after the device is locked is not authoritatively confirmed in a single source. Use conceptual language + "verify in current ABM portal" note.

6. **`app-sso platform -s` intermediate output.** The 02 walkthrough must only cite the full end-state (`Device Registration: REGISTERED` / `User Registration: REGISTERED`). Never fabricate intermediate states.

7. **Treating B2 terminal stage as a PSSO documentation stage.** B2 ends with a link-not-copy handoff to guide `01` (A1 standard provisioning path). B2 does NOT document PSSO provisioning — that belongs entirely in guide `01`.

8. **Navigation-last invariant.** No nav-hub edits in Phase 90. `docs/index.md`, `common-issues.md`, `quick-ref-l2.md`, `decision-trees/06-macos-triage.md` are navigation-last (Phase 92 only). `docs/l2-runbooks/00-index.md` is an internal content-phase hub — editing it in Phase 90 is correct and expected.

9. **Setting Deadline BEFORE Intune readiness.** The B1 walkthrough MUST emphasize: verify ADE enrollment policy is assigned to device serial numbers AND PSSO policy is assigned to target user groups BEFORE triggering ABM "Assign Device Management." A deadline on a device whose enrollment policy is not set causes immediate lockout with no recovery path except ABM admin intervention.

10. **Confusion between canceling migration vs releasing a locked device.** The ABM "Change Deadline → remove deadline" path works cleanly BEFORE the user is locked. After lockout, the recovery is more complex and less authoritatively documented. The Track A runbook must distinguish these two states explicitly.

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | Supervision is expected to be preserved/regranted through OS-26 migration (inferred from profile-based enrollment enforcing supervision on macOS 11+ and Ivanti source stating "both supervised and unsupervised devices supported") | B1 Stage 9; L2 Track B diagnostic | If wrong: supervised-only MDM features (software update enforcement, restrictions) silently stop working post-migration; admins relying on supervision will have undocumented regression |
| A2 | Existing Intune ADE enrollment policy (when assigned to the device serial in ABM) automatically handles OS-26 migrated devices without separate "profile-based enrollment" configuration | B1 Stage 2 (Intune Readiness) | If wrong: migrated devices may not receive Intune enrollment policy; would require additional Intune configuration discovered only on authoring/pilot day |
| A3 | ABM admin can release a deadline-locked device via "Change Deadline → remove deadline" in ABM (cancels migration; clears prompts) | L2 Track A recovery | If wrong: admins cannot recover devices without Apple Support involvement |
| A4 | One-time wipe required for devices added to ABM while on macOS <26, now upgraded to macOS 26 (MEDIUM confidence from community sources) | B1 Stage 1 pre-migration checklist | If wrong: admins set deadline on macOS 26 devices and expect wipe-free migration but it fails |
| A5 | Iru console (post-Oct-2025 rebrand) preserves the "Delete Device Record" conceptual workflow, even if UI labels differ from support.kandji.io documentation | B1 Stage 4 source-side release | If wrong: operators use stale instructions for an action that no longer exists or is renamed significantly in the Iru console |

---

## Environment Availability

Step 2.6: SKIPPED — Phase 90 is a documentation-authoring phase with no external tool, runtime, or service dependencies. All deliverables are markdown files.

---

## Validation Architecture

> From `.planning/config.json` — `workflow.nyquist_validation` not explicitly set to false; treated as enabled.

| Property | Value |
|----------|-------|
| Framework | No automated test framework for markdown docs |
| Config file | Validation via `check-phase-90.mjs` (authored in Phase 93) |
| Quick run command | `node scripts/validation/check-phase-90.mjs` (Phase 93 deliverable) |
| Full suite command | `node scripts/validation/v1.11-milestone-audit.mjs` (Phase 93) |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Notes |
|--------|----------|-----------|-------|
| MIG-01 | `02-mdm-migration-psso.md` exists with B1 path, "Assign Device Management" + Deadline content, OS≥26 selector | structural / link check | Phase 93 check-phase-90.mjs |
| MIG-02 | `profiles renew` not-a-shortcut statement present in B2 section | content presence check | Phase 93 |
| MIG-03 | Both "Kandji" and "Iru" surfaced on first mention; "Delete Device Record" present; "BEFORE deletion" constraint present | content presence check | Phase 93 |
| MIG-04 | PSSO re-registration section present; `app-sso platform -s` gate present; bidirectional cross-link to guide `01` confirmed | link integrity + content check | Phase 93 |
| RUN-01 | `30-macos-mdm-migration-failure.md` exists with three tracks; cross-link to L2 #10; row in `00-index.md` | structural / link check | Phase 93 |

### Wave 0 Gaps

- [ ] `docs/macos-lifecycle/02-mdm-migration-psso.md` — does not yet exist (Phase 90 creates it)
- [ ] `docs/l2-runbooks/30-macos-mdm-migration-failure.md` — does not yet exist (Phase 90 creates it)

---

## Security Domain

> Security enforcement not explicitly disabled in config; treated as enabled.

### Applicable ASVS Categories

| ASVS Category | Applies | Note |
|---------------|---------|------|
| V2 Authentication | Yes (documentation scope) | Doc must address PSSO MFA re-registration post-migration; not skip-able |
| V5 Input Validation | N/A | Documentation phase |
| V6 Cryptography | Yes (documentation scope) | Secure Enclave key behavior, ACME cert reissue — must be stated accurately; no hand-rolling of crypto descriptions |

### Documentation-Phase Security Requirements

| Requirement | Authoring Rule |
|-------------|----------------|
| PSSO key security | Never state that the WPJ Secure Enclave key can be "migrated" or "ported" between MDMs. Always state it is re-created on new enrollment |
| ACME cert security | State that ACME is reissued on genuine re-enrollment (B1 path); note the SCEP fallback risk on B2 non-wipe path (though B2 requires wipe per MIG-02) |
| Activation Lock bypass codes | Emphasize 30-day retrieval window; permanent destruction on delete |
| FileVault recovery keys | Emphasize permanent destruction on Delete Device Record; new key generated post-migration by Intune's FileVault escrow policy |
| Secrets must be retrieved FIRST | Make the ordering mandatory and explicit (MIG-03) |

---

## Sources

### Primary (HIGH confidence)
- Apple Support — Migrate managed devices to another device management service: https://support.apple.com/guide/deployment/migrate-managed-devices-dep4acb2aa44/web — migration mechanism ("unenrolls from ADE + reenrolls with profile-based enrollment"); ABM admin can unlock deadline-locked devices; activation lock bypass handling
- Apple Business Manager User Guide — Migrate devices: https://support.apple.com/guide/business/migrate-devices-to-a-new-management-service-axm3a49a769d/web — "Assign Device Management" as primary action label; "Change Deadline" for cancellation
- Microsoft Learn — Overview of Apple Automated Device Enrollment for macOS: https://learn.microsoft.com/en-us/intune/device-enrollment/apple/overview-automated-enrollment-macos (updated 2026-04-15) — existing ADE enrollment infrastructure handles migrated devices; ACME only on re-enrollment
- Microsoft Learn — Set up ADE for macOS: https://learn.microsoft.com/en-us/intune/device-enrollment/apple/setup-automated-macos (updated 2026-05-18) — enrollment policy requirements, Await Configuration
- Microsoft Learn — macOS device enrollment guide: https://learn.microsoft.com/en-us/intune/device-enrollment/apple/guide-macos (updated 2026-06-22)
- Apple Support — Platform SSO for macOS: https://support.apple.com/guide/deployment/platform-sso-for-macos-dep7bbb05313/web — "If you unenroll a Mac from the device management service, it also unregisters from the IdP"
- Kandji support portal — Deleting a Device Record: https://support.kandji.io/kb/deleting-a-device-record-and-uninstalling-kandji — Delete Device Record steps; agent self-removes at next 15-min check-in; secrets permanently destroyed
- isc.upenn.edu — macOS 26 Tahoe Released: https://isc.upenn.edu/news/macos-26-tahoe-released-9152025 — GA date September 15, 2025
- Apple Support — Profile-based Device Enrollment enforces supervision on macOS 11+: https://support.apple.com/guide/deployment/enrollment-methods-for-apple-devices-dep08f54fcf6/web

### Secondary (MEDIUM confidence)
- Ivanti blog — Apple Business Manager Device Migration: https://www.ivanti.com/blog/apple-business-manager-device-migration-what-you-need-to-know — "Assign Device Management" label; "both supervised and unsupervised devices supported"
- ManageEngine — Apple MDM device migration: https://www.manageengine.com/mobile-device-management/how-to/apple-mdm-device-migration.html — "Assign Device Management" label; notification cadence; deadline behavior
- Foundation blog — End of MDM Lock-In: https://www.fndtn.com/news/the-end-of-mdm-lock-in-apples-new-tool-changes-the-game — ABM "pending migrations" view; admin can cancel before user starts
- SimpleMDM blog — Apple streamlines MDM migrations: https://simplemdm.com/blog/apple-streamlines-mdm-migrations-in-ios-26-and-macos-26/ — "Re-assign Device Management" label variant noted
- Addigy blog — OS-26 Device Management Migration: https://addigy.com/blog/os-26-device-management-migration/ — notification cadence; full-screen non-dismissible lock at deadline

### Tertiary (LOW confidence — flag for validation)
- Community sources (Hexnode forum, various) — one-time reset requirement for devices enrolled in ABM on pre-macOS-26 OS
- Supervision preservation: inferred from Apple profile-based enrollment documentation + Ivanti source; no direct authoritative confirmation

---

## Metadata

**Confidence breakdown:**
- B1 stage facts (enrollment type, PSSO re-registration, ACME, deadline behavior): HIGH
- ABM "Assign Device Management" label: HIGH
- ABM deadline-cancel / lockout-recovery steps: MEDIUM
- Supervision status preservation: MEDIUM
- Iru console UI labels: LOW (vendor-neutral authoring required by D-04)
- Intune-side config requirements (existing ADE enrollment policy sufficient): MEDIUM-HIGH

**Research date:** 2026-06-24
**Valid until:** 2026-09-24 (90-day cycle for macOS-26-gated content)

---

## RESEARCH COMPLETE

**Phase:** 90 — MDM Migration Walkthrough + L2 Runbook #30
**Confidence:** MEDIUM-HIGH

### Key Findings

1. **Gap 1 (HIGH) RESOLVED — MEDIUM-HIGH confidence:** Intune does NOT require a separate "profile-based enrollment" configuration. The existing ADE enrollment policy (when assigned to device serial numbers in ABM) automatically handles OS-26-migrated devices on re-enrollment. The critical readiness step is confirming the ADE enrollment policy AND PSSO Settings Catalog policy are both assigned BEFORE triggering ABM "Assign Device Management."

2. **Gap 2 (MEDIUM) — D-04 confirms conceptual posture:** Iru console steps confirmed at support.kandji.io ("Delete Device Record" via Device Action Menu; ~15-min agent self-removal). Portal still reads "Kandji" branding. Vendor-neutral conceptual authoring + freshness note is the correct and mandatory approach (D-04).

3. **Gap 3 (MEDIUM) — MEDIUM confidence:** Supervision expected preserved/regranted through OS-26 migration (profile-based enrollment enforces supervision on macOS 11+; Ivanti confirms "both supervised and unsupervised supported"). No authoritative single-source direct confirmation. Must state at MEDIUM confidence with pilot-device verification requirement.

4. **Gap 4 (MEDIUM) — MEDIUM confidence:** ABM admin recovery for deadline lockout: (a) before lockout: "Change Deadline → remove deadline" in ABM cancels migration; (b) after lockout: fix Intune enrollment issue for self-completion, OR ABM admin cancels via ABM portal (exact UI unconfirmed). Apple confirms ABM holds the lock and authorized admin can unlock it.

5. **Gap 5 (LOW) RESOLVED — HIGH confidence:** Confirmed "Assign Device Management" as primary ABM label (Apple ABM User Guide). A "Re-assign Device Management" variant exists in some vendor docs — include a note to verify in current ABM portal.

6. **Gap 6 CONFIRMED:** macOS 26 GA = September 15, 2025. Non-dismissible full-screen deadline lock confirmed. Notification cadence confirmed (daily → hourly → 60/30/10/1 min).

### File Created
`.planning/phases/90-mdm-migration-walkthrough-l2-runbook-30/90-RESEARCH.md`

### Confidence Assessment

| Area | Level | Reason |
|------|-------|--------|
| B1 stage content (settled facts) | HIGH | Apple + MS Learn authoritative sources; SUMMARY.md facts carried forward |
| Intune-side config for migrated devices | MEDIUM-HIGH | Inferred from MS Learn ADE overview + Apple migration mechanism description; no explicit MS doc saying "existing policy handles migration" |
| ABM button label | HIGH | Apple ABM User Guide direct citation |
| Supervision status post-migration | MEDIUM | Inferred; no direct Apple authoritative confirmation |
| ABM lockout recovery | MEDIUM | Apple confirms ABM holds lock; exact release UI unconfirmed |
| Iru console labels | LOW | Portal still shows Kandji branding; D-04 mandates vendor-neutral anyway |
| Deadline behavior + cadence | HIGH | Multiple authoritative sources confirm |
| PSSO re-registration mandatory | HIGH | Apple Platform SSO guide authoritative |
| L2 #10 filename | HIGH | Verified from directory listing |
| Structural conventions | HIGH | Direct read of sibling files 01 and 27 |

### Open Questions (RESOLVED — authoring-day verification items)

Each item below is resolved with a definite authoring posture; the "open" portion is a deliberate authoring-day verification step, not an unresolved planning blocker.

1. **Supervision status on first pilot device.** RESOLVED: state supervision-preserved at **MEDIUM confidence** with a freshness stamp; the doc instructs the operator to run `profiles status -type enrollment | grep Supervised` on a pilot device post-OS-26-migration before fleet rollout. (Posture baked into B1 pre-flight per D-01/D-04.)

2. **Exact ABM UI for releasing a deadline-locked device.** RESOLVED: the conceptual flow (ABM admin → change/cancel migration) is confirmed and stated; the exact post-lock click-path is authored conceptually with an L2 #30 Track A cross-link to Apple Business Support for the edge case (per D-03).

3. **Iru console label drift.** RESOLVED: D-04's vendor-neutral language ("Delete Device Record" + both Kandji/Iru names + verify-current-labels note) is the correct and complete solution regardless of portal drift.

4. **One-time reset for pre-26-enrolled devices.** RESOLVED: state in the B1 pre-flight checklist at **MEDIUM confidence** (community-sourced pitfall P-12, not authoritatively verifiable).

### Ready for Planning
Research complete. Planner can now create PLAN.md files.
