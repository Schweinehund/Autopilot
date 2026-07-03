# Phase 110: Pillar B + C — Corpus Fixes + MDM Migration Walkthroughs — Research

**Researched:** 2026-07-01
**Domain:** Documentation authoring — Markdown corpus accuracy fixes + iOS/iPadOS MDM migration walkthrough + Jamf Pro / Mosyle source-MDM release addendum
**Confidence:** HIGH for corpus fixes (live files read); MEDIUM for iOS migration mechanics (web-verified against Apple Support + community sources; iOS 26 not yet GA); MEDIUM for Jamf Pro / Mosyle console paths (conceptual-action level only; login-gated consoles not live-verifiable)

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

- **D-01 — Walkthrough home = new standalone file `docs/ios-lifecycle/02-mdm-migration.md` (HIGH).** Mirror the macOS `02-mdm-migration-psso.md` template exactly: front-matter freshness stamp, platform gate blockquote, "Which Path Is Right for You?" table, mermaid pipeline, Stage Summary Table, 4-part per-stage blocks, See Also, Glossary Quick Reference, Version History.
- **D-02 — Path coverage = in-place path ONLY (HIGH; Finder B overturned to A, Referee-upheld).** iOS/iPadOS 26+ in-place track is the primary staged walkthrough. Pre-26 wipe case = short subsection with (a) wipe-required statement, (b) source-MDM release + Activation Lock note, (c) link-not-copy pointer to `01-ade-lifecycle.md`. Stages CARRIED: Stage 1 (fleet/OS gate), Stage 2 (source release — Activation Lock bypass retrieval + Delete Device Record; FileVault-key sub-steps DROPPED), ABM Assign Device Management, Set Deadline, User Notification Window, Deadline Enforcement (MUST contrast iOS forced-restart vs macOS full-screen lock — SC4 differentiator), Post-Migration Enrollment Verification. Stages DROPPED (no iOS analog): FileVault Key Rotation, PSSO Re-Registration.
- **D-03 — One combined Appendix in `docs/macos-lifecycle/02-mdm-migration-psso.md` with two H3 subsections `### Jamf Pro` and `### Mosyle` (HIGH).** Each covers FileVault key retrieval / Activation Lock bypass / device-record deletion at conceptual-action depth + hedged "verify labels on your authoring day." Heading uses `## Appendix: Source-MDM Release Steps for Jamf Pro and Mosyle` (not `/` to avoid double-hyphen slug trap).
- **D-04 — FIX bundle (HIGH). All three cited anchors are STALE; real live anchors:**
  - FIX-01: `index.md:110` (NOT `:108`)
  - FIX-02: `quick-ref-l1.md:106` (NOT `:101`)
  - FIX-03: `common-issues.md` "macOS Local Password: User Locked Out" block (~`:249-254`; NOT `:242-247`)

### Claude's Discretion

- D-01: Exact filename suffix; frontmatter freshness values.
- D-02: Exact stage count for in-place track; whether Activation Lock retrieval is its own stage or a release sub-step; depth of the forced-restart-vs-full-screen-lock contrast.
- D-03: Whether each vendor H3 mirrors Stage 2's full three-part sub-structure or a lighter list; confidence-callout wording; exact See Also wiring.
- D-04: Exact enumeration/link-text/callout phrasing at each fix site; whether FIX-01 adds optional see-also to 802.1X L1 section.

### Deferred Ideas (OUT OF SCOPE)

- Full iOS wipe-and-re-enroll parallel track (pre-26 case is pointer only, not a staged peer track).
- Windows / Android / Linux MDM-migration walkthroughs.
- Reconciling macOS file's `> **Important:**` callout usages to the locked NOTE/WARNING/DANGER/CRITICAL set.
- Pillar D validator refactors (Phase 111); Pillar E harness bump (Phase 112); any 802.1X content.
- Editing the Post-Migration common-issues block (FIX-03 touches ONLY the User-Locked-Out block).

</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| FIX-01 | `docs/index.md` stale macOS L1-runbook count corrected to ≥8 after #35/#36/#37 | Live file read confirms `:110` contains "(6 runbooks: device, Setup Assistant, profiles, apps, compliance, Company Portal)" — count is 9 (6 ADE + 3 PSSO); exact reword documented below |
| FIX-02 | `docs/quick-ref-l1.md` surfaces L1 #36 as "try this first" rather than L2 escalation target | Live file read confirms `:106` mislabels #36 as "**Escalate L2** via …"; sibling wiring at `:107`/`:108` already correct; exact reword documented below |
| FIX-03 | `docs/common-issues.md` inserts L1 #36 PSSO re-registration step between L1 #37 and L2 #27 | Live file read confirms User-Locked-Out block at ~`:249-254`; `:253` = L1 #37, `:254` = L2 #27; insertion point and text documented below |
| MIGF-01 | iOS/iPadOS ABM "Assign Device Management" + Deadline migration walkthrough (Kandji/Iru → Intune) covering iOS-specific forced-restart deadline enforcement vs macOS full-screen lock and post-migration enrollment verification | Apple Support guide + multiple community sources confirm iOS forced-restart vs macOS full-screen-lock distinction; iOS 26+ OS gate confirmed; content accuracy findings documented in detail below |
| MIGF-02 | Jamf Pro + Mosyle source-MDM release steps (FileVault key retrieval, Activation Lock bypass, device-record deletion) as addendum to `docs/macos-lifecycle/02-mdm-migration-psso.md` | Conceptual-action approach confirmed appropriate; console paths not live-verifiable; hedging strategy documented below |

</phase_requirements>

---

## Summary

Phase 110 is a pure documentation authoring phase targeting a mature, convention-heavy Markdown corpus. There is no code to write. Deliverables are three literal corpus fixes and two new documentation sections (one new file, one appendix). All four structural decisions (D-01 through D-04) are already locked by adversarial review; this research confirms the content accuracy needed to author them correctly.

**Pillar B (FIX-01/02/03)** comprises three surgical single-line or single-block text edits. All three live anchors were verified by direct file read, confirming D-04's stale-anchor drift table. The exact current text at each target is documented below. The insertions and rewords are straightforward once the live anchor is located — no cross-file wiring changes are needed beyond the text already in place.

**Pillar C (MIGF-01)** is the substantive new authoring challenge. The iOS/iPadOS 26+ in-place ABM "Assign Device Management" + Deadline migration is confirmed to be structurally parallel to the macOS B1 path, but with two critical platform differences: (1) deadline enforcement triggers a **forced device restart** on iOS/iPadOS rather than a non-dismissible full-screen lock as on macOS, and (2) iOS has no FileVault (Data Protection is hardware-tied, always-on, no MDM-escrowed key) and no Platform SSO / Secure Enclave registration, so Stages 8 (FileVault Key Rotation) and 9 (PSSO Re-Registration) are dropped entirely for iOS. Activation Lock bypass code retrieval from the source MDM is still required for supervised iOS devices and belongs in the iOS Stage 2 analog. Pre-iOS 26 devices require a wipe — covered as a short subsection, not a staged peer track.

**Pillar C (MIGF-02)** is a conceptual-action appendix at hedged depth. Jamf Pro and Mosyle both expose FileVault recovery key retrieval, Activation Lock bypass code retrieval, and device-record deletion in their admin consoles, but the exact console navigation paths are not live-verifiable without admin login. The established pattern from Stage 2's Kandji/Iru treatment ("verify labels on your authoring day" + conceptual-action framing) applies verbatim. Each vendor H3 should cover all three sub-steps explicitly (MIGF-02 names them verbatim as requirements).

**Primary recommendation:** Author follows the macOS migration file as the exact template, drops iOS-inapplicable stages, and writes the iOS Deadline Enforcement stage with an explicit platform-contrast callout documenting that iOS/iPadOS enforcement = forced restart (vs macOS = full-screen lock). The Jamf Pro + Mosyle appendix uses Stage 2's hedge language as the prose model.

---

## Architectural Responsibility Map

This is a documentation corpus phase — no code tiers apply. The "tiers" below represent the author's documentation responsibilities within the corpus.

| Capability | Primary Doc Layer | Secondary Doc Layer | Rationale |
|------------|------------------|--------------------|-----------| 
| Corpus text fixes (FIX-01/02/03) | Existing file editing | None | Single-file, line-anchored edits; self-contained |
| iOS migration walkthrough (MIGF-01) | New file `docs/ios-lifecycle/02-mdm-migration.md` | Link-not-copy pointer to `01-ade-lifecycle.md` for pre-26 wipe re-enroll | Parallel platform file mirroring macOS `02-` pattern |
| Jamf Pro + Mosyle appendix (MIGF-02) | Append to `docs/macos-lifecycle/02-mdm-migration-psso.md` | Reference (not re-author) Stage 2's Kandji/Iru sub-structure | addendum framing per MIGF-02 requirement |
| Nav-hub wiring for new iOS file | `docs/ios-lifecycle/00-enrollment-overview.md` + `docs/index.md` iOS section | See Also blocks within the new file | Navigation-last: wire AFTER content file committed |

---

## Pillar B — Corpus Fix Content Accuracy

### FIX-01 — `docs/index.md:110` (macOS L1 Runbooks count)

**Live text confirmed at `:110`:**
```
| [macOS L1 Runbooks](l1-runbooks/00-index.md#macos-ade-runbooks) | Scripted procedures for top macOS ADE enrollment failures (6 runbooks: device, Setup Assistant, profiles, apps, compliance, Company Portal) |
```

**Count source of truth verified at `docs/l1-runbooks/00-index.md:36-50` (`## macOS ADE Runbooks` H2):**
- ADE runbooks: #10 (Device Not Appearing), #11 (Setup Assistant Stuck), #12 (Profile Not Applied), #13 (App Not Installed), #14 (Compliance Failure), #15 (Company Portal Sign-In) = **6 ADE runbooks**
- PSSO runbooks: #35 (Platform SSO Sign-In Failure), #36 (Secure Enclave Key Loss), #37 (Local Password Recovery) = **3 PSSO runbooks**
- Total under `## macOS ADE Runbooks` H2: **9**
- 802.1X runbooks #38-41 live under a SEPARATE `## 802.1X L1 Runbooks` H2 at `:123` — cross-platform, NOT included in the macOS-specific count [VERIFIED: direct file read]

**`:112` row confirmed already wires #35/#36/#37** (the "macOS Platform SSO Runbooks" row) — so FIX-01 must not add a second reference row for the PSSO runbooks (DRY / link-not-copy violation). [VERIFIED: direct file read]

**Required reword at `:110`:** Change `"(6 runbooks: device, Setup Assistant, profiles, apps, compliance, Company Portal)"` to a form that surfaces the count of 9. The cleanest option per CONTEXT.md D-04: `"9 macOS L1 runbooks — 6 ADE plus 3 Platform SSO (see row below)"` — this avoids duplicating the PSSO-runbook enumeration that `:112` already contains.

**Preservation note:** The `#macos-ade-runbooks` anchor on the link `l1-runbooks/00-index.md#macos-ade-runbooks` is correct and must not change — it points to the `## macOS ADE Runbooks` H2 which now covers all 9 runbooks. [VERIFIED: direct file read at `l1-runbooks/00-index.md:36`]

---

### FIX-02 — `docs/quick-ref-l1.md:106` (#36 trigger mislabeled as L2 escalation)

**Live text confirmed at `:106`:**
```
- Secure Enclave key error after password reset or FileVault recovery --> **Escalate L2** via [Platform SSO — Secure Enclave Key Loss](l1-runbooks/36-macos-secure-enclave-key.md) first; escalate to L2 if re-registration fails (collect: serial number, macOS version, `app-sso platform -s` output)
```

**Confirmed sibling wiring at `:107` (#35) and `:108` (#37):**
- `:107` (#35): `"**Use [Platform SSO Sign-In Failure](l1-runbooks/35-macos-sso-sign-in-failure.md) runbook** (collect: ...)"` — already uses the L1 "Use … runbook" pattern [VERIFIED]
- `:108` (#37): `"**Use [macOS Local Password Recovery](l1-runbooks/37-macos-local-password-reset.md) runbook** (FileVault recovery key / LAPS admin / Apple ID; PSSO re-registration via #36 required afterward)"` — already correct, already mentions #36 afterward [VERIFIED]

**Required reword at `:106`:** Change `**Escalate L2** via [Platform SSO — Secure Enclave Key Loss]...` to match the L1 "Use … runbook" pattern of the siblings. Target form: `**Use [Platform SSO — Secure Enclave Key Loss](l1-runbooks/36-macos-secure-enclave-key.md) runbook** first; escalate to L2 if re-registration fails (collect: serial number, macOS version, \`app-sso platform -s\` output)`. The collect-list at the end is correct and must be preserved.

**Cross-link integrity:** `:108` already says "PSSO re-registration via #36 required afterward" — no change needed to that row; FIX-02 touching only `:106` is correct. [VERIFIED]

---

### FIX-03 — `docs/common-issues.md` User-Locked-Out block (~`:249-254`)

**Live block confirmed at ~`:249-254`:**
```markdown
### macOS Local Password: User Locked Out

User cannot log in to their Mac — local password is unknown or forgotten. Recover access using the escrowed FileVault recovery key, the macOS LAPS managed admin account, or Apple ID (where org policy allows). Note: SSPR resets the Entra password only and does not reset the independent local password on Secure Enclave Platform SSO devices. ...

- **L1:** [macOS Local Password Recovery](l1-runbooks/37-macos-local-password-reset.md)
- **L2:** [macOS Platform SSO Investigation](l2-runbooks/27-macos-sso-investigation.md) — if PSSO re-registration fails after recovering access
```

**Exact target lines (semantic):**
- Line containing `**L1:** [macOS Local Password Recovery]` = L1 #37 bullet [VERIFIED at `:253`]
- Line containing `**L2:** [macOS Platform SSO Investigation]` = L2 #27 bullet [VERIFIED at `:254`]

**Required insertion:** Between the L1 #37 bullet (`:253`) and the L2 #27 bullet (`:254`), insert:
```markdown
- **L1:** [Platform SSO — Secure Enclave Key Loss](l1-runbooks/36-macos-secure-enclave-key.md) — mandatory PSSO re-registration after password recovery (the reset invalidates the Secure Enclave key)
```

**Rationale corroborated by two existing cross-links:**
1. `quick-ref-l1.md:108` already states "PSSO re-registration via #36 required afterward" in the #37 trigger — the corpus already implies this step; FIX-03 makes it explicit in the issue-resolution flow [VERIFIED]
2. `common-issues.md:251` notes "SSPR resets the Entra password only and does not reset the independent local password on Secure Enclave Platform SSO devices" — the technical context for why #36 is mandatory after #37 is already in the block description [VERIFIED]

**What NOT to touch:** The "Platform SSO Re-Registration Failure (Post-Migration)" block at ~`:241-247` — confirmed this is the WRONG block (it discusses migration-context PSSO failure, not local-password recovery; #36 after password reset does not fit that block's trigger). Do not edit that block. [VERIFIED: direct file read]

---

## Pillar C — MIGF-01: iOS/iPadOS Migration Walkthrough Content Accuracy

### OS Version Gate

**iOS/iPadOS 26+ = in-place migration available (ABM "Assign Device Management" + Deadline flow, wipe-free)** [VERIFIED: Apple Support "Migrate managed devices" page — dep4acb2aa44; confirmed by Microsoft TechCommunity blog 2025-08-04]

**Pre-iOS/iPadOS 26 (iOS/iPadOS 18 or earlier) = wipe required.** The ABM server-side reassignment takes effect only at next activation (Setup Assistant after wipe). There is no wipe-free in-place path for pre-26 iOS devices. [ASSUMED — based on training knowledge + consistent with macOS behavior pattern documented in CONTEXT.md D-02; Apple Support page does not explicitly state pre-26 iOS behavior beyond the 26+ gate requirement]

### iOS/iPadOS Deadline Enforcement — THE SC4 DIFFERENTIATOR

**iOS/iPadOS forced restart vs macOS full-screen lock:**

> "Enforced migration ... involves a restart on an iPhone or iPad, and a nondismissible full-screen prompt on a Mac." — Apple Support, "Migrate managed devices to another device management service" (dep4acb2aa44) [CITED: support.apple.com/guide/deployment/migrate-managed-devices-dep4acb2aa44/web]

- **iOS/iPadOS at deadline:** Device performs a forced restart; enrollment in the new MDM completes automatically as part of the restart/boot sequence.
- **macOS at deadline:** Non-dismissible full-screen prompt appears; user must actively complete enrollment from the locked screen before the device is usable.
- **Implication for the walkthrough:** The iOS Deadline Enforcement stage must explicitly state this distinction. The admin cannot expect a visible "lockout screen" on iOS — the device simply restarts. This means there is no equivalent to the macOS "enrollment from the locked screen" user step on iOS.

**Confidence: HIGH** — sourced from Apple's authoritative deployment guide, corroborated by multiple independent sources (Addigy blog: "iPhone/iPad devices restart and migrate automatically"; ManageEngine MDM migration docs). [CITED: support.apple.com/guide/deployment/migrate-managed-devices-dep4acb2aa44/web]

### What Is Preserved on iOS During Migration

From Apple Support page (dep4acb2aa44): "The operating system preserves only managed app data during migration." [CITED: support.apple.com/guide/deployment/migrate-managed-devices-dep4acb2aa44/web]

From Addigy blog and community sources: Apps remain on the device if the new MDM delivers them before sending the `DeviceConfigured` command (via `await_device_configured` key). Personal data (photos, messages, notes, etc.) is preserved since the device is not wiped.

**Author guidance for the walkthrough:**
- Personal data: preserved (device not wiped) [HIGH confidence]
- Personal (unmanaged) apps: preserved [HIGH confidence]
- Managed app data: preserved [CITED: Apple Support dep4acb2aa44]
- Managed apps themselves: preserved if Intune delivers them before `DeviceConfigured`; VPP licenses are NOT automatically transferred — admin must re-assign apps in Intune before migration for seamless app continuity [ASSUMED from community sources; flag in Watch Out For]

**Contrast with macOS:** macOS has FileVault encryption state (disk remains encrypted throughout) and PSSO Secure Enclave key (destroyed on unenrollment, requiring re-registration). iOS has neither of these management artifacts — Data Protection is hardware-tied and always-on, with no MDM-escrowed recovery key. This is why Stages 8 and 9 of the macOS walkthrough are dropped entirely for iOS.

### Notification Cadence (iOS)

Identical to macOS: daily → hourly (24h before deadline) → 60/30/10/1-minute intervals (last hour). [CITED: Apple Support dep4acb2aa44 — "Notifications display daily, and hourly 24 hours before the deadline. For the last hour before the deadline, the user receives notifications at sixty-, thirty-, ten-, and one-minute intervals."]

### Activation Lock on iOS (Stage 2 iOS Analog)

**Why Activation Lock bypass codes still apply on iOS:**
Supervised iOS/iPadOS devices enrolled via ADE can have Activation Lock enabled/managed by the source MDM (Kandji/Iru). The source MDM holds an Activation Lock bypass code for supervised devices. This code is permanently destroyed when the device record is deleted — the same pre-deletion retrieval sequencing requirement as macOS. [ASSUMED — consistent with Apple MDM protocol behavior; Apple Support confirms MDM holds bypass codes for supervised devices]

**Key iOS difference from macOS:**
- iOS has NO FileVault → **Drop FileVault recovery key retrieval entirely from the iOS Stage 2 analog**
- iOS Activation Lock bypass code retrieval = conceptually identical to macOS, so it stays
- The 30-day window caveat (bypass codes only available within 30 days of supervision) applies to iOS as well as macOS [ASSUMED — platform-agnostic Apple behavior]

**Vendor console note for Kandji/Iru on iOS:** The same Kandji/Iru console navigation used for macOS (Device Action Menu → Delete Device Record) applies to iOS device records. Same "verify labels on your authoring day" hedge applies. [ASSUMED — consistent with multi-platform MDM console pattern]

### iOS Post-Migration Enrollment Verification

After migration, the device re-enrolls with Intune. Verification steps (analogous to macOS Stage 7 verification steps, adapted for iOS platform):

1. In the Intune admin center, navigate to **Devices > iOS/iPadOS > All Devices** — confirm the device appears with enrollment status "Enrolled." [ASSUMED — standard Intune iOS path; consistent with macOS pattern]
2. Check compliance status — device should reach "Compliant" once compliance policies evaluate. [ASSUMED]
3. On the device: **Settings > General > VPN & Device Management** — confirm the new Intune management profile is installed and the Kandji/Iru profile is absent. [ASSUMED — standard iOS MDM verification]
4. Open Company Portal (if deployed) and verify device appears enrolled. [ASSUMED]

**No iOS equivalent of `app-sso platform -s`** — Platform SSO is macOS-only. No Terminal commands available on iOS. Verification is portal-first only. [HIGH confidence]

### ABM UI Label

**ABM "Assign Device Management" applies to both macOS and iOS/iPadOS.** The ABM action is identical in the portal regardless of platform. The label may read "Assign Device Management" or "Re-assign Device Management" depending on the device's current assignment state — same hedge as macOS Stage 3. [CITED: docs from macOS file `:189`; confirmed consistent with iOS per community sources]

### Stage Mapping for the iOS Walkthrough

| iOS Stage | Analog in macOS File | Delta for iOS |
|-----------|---------------------|---------------|
| Stage 1: Fleet Assessment & OS Gate | macOS Stage 1 | OS gate = iOS/iPadOS 26+ (not macOS 26+); check Intune or ABM for iOS version audit path |
| Stage 2: Intune Readiness, Activation Lock Retrieval, and Source Release | macOS Stage 2 | **DROP** FileVault-key-retrieval sub-steps; **KEEP** Activation Lock bypass retrieval + Delete Device Record; Intune readiness check is iOS ADE enrollment policy (not PSSO Settings Catalog — no PSSO on iOS) |
| Stage 3: ABM "Assign Device Management" | macOS Stage 3 | Identical conceptual action; portal navigation is same |
| Stage 4: Set Deadline | macOS Stage 4 | Identical 1–90 day range; same pre-deadline readiness check |
| Stage 5: User Notification Window | macOS Stage 5 | Identical notification cadence; no PSSO policy delivery to verify |
| Stage 6: Deadline Enforcement | macOS Stage 6 | **CRITICAL DELTA:** iOS = forced restart, NOT full-screen lock; admin recovery also differs (no lockout screen to monitor); no equivalent to "enroll from locked screen" user step |
| Stage 7: Post-Migration Enrollment + Verification | macOS Stage 7 (post-migration enrollment) | iOS re-enrolls as fresh ADE enrollment (same ADE policy handles it); **DROP** PSSO Settings Catalog delivery check; **DROP** supervision MEDIUM-confidence note (iOS supervision is always set at ADE enrollment; not migration-specific); add Company Portal verification + Settings profile verification |
| ~~Stage 8: FileVault Key Rotation~~ | macOS Stage 8 | **DROPPED** — iOS has no FileVault; Data Protection is hardware-tied, always-on |
| ~~Stage 9: PSSO Re-Registration~~ | macOS Stage 9 | **DROPPED** — iOS has no Platform SSO / Secure Enclave registration |
| Pre-26 wipe subsection | macOS B2 Path | Short subsection only: wipe-required statement + source-MDM release + Activation Lock note + link-not-copy → `01-ade-lifecycle.md` for ADE re-enroll |

### Front Matter & Freshness Stamp for MIGF-01

iOS 26 is not yet GA as of 2026-07-01 research date. The review_by stamp should be 90 days from authoring (per corpus convention for version-gated features). The `last_verified` date = the authoring date. `platform: iOS` (matching the `01-ade-lifecycle.md` pattern). `applies_to: ADE`.

---

## Pillar C — MIGF-02: Jamf Pro + Mosyle Appendix Content Accuracy

### Confirmed Approach: Conceptual-Action + Hedged Depth

Jamf Pro and Mosyle admin consoles are login-gated — exact console navigation paths cannot be live-verified without active admin credentials. This is identical to the situation that drove Stage 2's Kandji/Iru hedge language in the macOS file. The established hedge pattern ("`support.iru.io` resolves but is a login-gated SPA" / "The conceptual action is the same regardless of which portal you access" / "Verify current console labels on your own authoring day") is the exact model to follow. [CITED: macOS file `:148-164` — Stage 2 hedge language]

### Jamf Pro — Three Required Sub-Steps

**1. FileVault Recovery Key Retrieval**
Jamf Pro stores personal recovery keys that are escrowed to the console at FileVault enablement. The conceptual admin action: navigate to the device record in the Jamf Pro console and locate the recovery key in the device's management summary or security section. [ASSUMED — consistent with Jamf Pro's documented MDM FileVault escrow capability; exact console labels not live-verifiable]

> Author guidance: Frame as "In the Jamf Pro console, navigate to the device record and retrieve the escrowed FileVault recovery key before any device-record deletion action. Verify the exact navigation path in the current Jamf Pro admin console on your authoring day."

**2. Activation Lock Bypass Code Retrieval**
Jamf Pro holds Activation Lock bypass codes for ABM-supervised Mac devices. The bypass code is available in the device's security section in the Jamf Pro console. Community-verified: Jamf Pro exposes bypass codes in the device record under the management/security view. [MEDIUM confidence — Jamf community sources confirm the concept; exact current UI path not verified from official Jamf docs without login]

> Author guidance: Same hedge: "navigate to the device record and locate the Activation Lock bypass code in the security or management section. Verify the exact label in the current Jamf Pro console on your authoring day."

**3. Device-Record Deletion / Unmanage**
Jamf Pro provides a "Delete Computer" (or equivalent) action to remove the device from management. On deletion, the MDM profile is removed from the device at the next MDM check-in. [ASSUMED — standard Jamf Pro MDM behavior; exact label "Delete Computer" vs "Unmanage" not confirmed against current Jamf Pro UI]

> Author guidance: "Perform the device-record deletion action in the Jamf Pro console for the target Mac. This removes the device from Jamf Pro management and triggers MDM profile removal at the device's next check-in (~15 minutes). Allow 15 minutes before proceeding to Stage 3. Verify the current console action label (may read 'Delete Computer,' 'Delete,' or 'Unmanage') on your authoring day."

**Important**: The same pre-deletion sequencing requirement as Kandji/Iru applies to Jamf Pro: retrieve FileVault recovery key AND Activation Lock bypass code BEFORE performing device-record deletion. State this warning explicitly and mirror the CRITICAL callout level from macOS Stage 2.

### Mosyle — Three Required Sub-Steps

**1. FileVault Recovery Key Retrieval**
Mosyle enforces FileVault via its Security profile and escrows recovery keys to the console. From Mosyle: "remotely rebooting and restoring access to a FileVault protected Mac" is a documented Mosyle capability. The recovery key is accessible in the Mosyle console under device management views. [MEDIUM confidence — Mosyle documentation patterns confirm FileVault escrow capability; exact current navigation path not live-verifiable]

> Author guidance: "In the Mosyle console, navigate to the device record and retrieve the escrowed FileVault recovery key before any deletion action. Verify the exact navigation path in the current Mosyle console on your authoring day."

**2. Activation Lock Bypass Code Retrieval**
Mosyle stores Activation Lock bypass codes for ABM-supervised devices. From community sources: "To view the Bypass Codes, go to Management > Devices Overview > Click on a device's name to bring up Device Info > Click Security Info tab." Two bypass codes exist per device: one for user-initiated Activation Lock, one for MDM-initiated Activation Lock. [MEDIUM confidence — sourced from community documentation; verify in current Mosyle console on authoring day]

> Author guidance: "In the Mosyle console, navigate to the device record and locate the Activation Lock bypass codes in the device security information section (two codes may be present: user-initiated and MDM-initiated). Retrieve both before any deletion action. Verify current navigation and label on your authoring day."

**3. Device-Record Deletion**
Mosyle provides device-record deletion/unmanage functionality. [ASSUMED — standard MDM capability; exact Mosyle console label and navigation not confirmed from official Mosyle docs without login]

> Author guidance: "Perform the device-record deletion action in the Mosyle console for the target Mac. This removes the device from Mosyle management and triggers MDM profile removal at the next MDM check-in. Allow 15 minutes before proceeding. Verify the current console label and navigation on your authoring day."

### H3 Heading Slug Trap — Confirmed Safe Headings

- `### Jamf Pro` → slug: `jamf-pro` (clean, no double-hyphen)
- `### Mosyle` → slug: `mosyle` (clean)
- Appendix H2: `## Appendix: Source-MDM Release Steps for Jamf Pro and Mosyle` → slug: `appendix-source-mdm-release-steps-for-jamf-pro-and-mosyle` (clean; no `/` separator)
- **AVOID**: `### Jamf Pro / Mosyle` → slug: `jamf-pro--mosyle` (double-hyphen trap from ` / `) [CITED: CONTEXT.md D-03 anchor-slug double-hyphen trap warning]

### Callout Style for Appendix

Per CONTEXT.md conventions note: "The macOS migration file predates the callout-vocab lock and uses `> **Important:**` in places — reuse the file's own existing callout style when appending D-03, don't mint new types." The existing file uses both `> **Important:**` and `> **Note:**` inline callouts. Use these same forms in the appendix — do not use NOTE/WARNING/DANGER/CRITICAL box syntax (those belong to the Phase 109 callout-vocab-locked files). [CITED: CONTEXT.md Conventions section]

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead |
|---------|-------------|-------------|
| iOS pre-26 wipe re-enroll stages | A full parallel staged track documenting Setup Assistant enrollment | Link-not-copy pointer to `docs/ios-lifecycle/01-ade-lifecycle.md` (the wipe case IS the ADE lifecycle; already fully documented) |
| Jamf Pro/Mosyle click-path documentation | Invented literal navigation paths from training knowledge | Conceptual-action framing + "verify labels on your authoring day" hedging (follows Stage 2's established pattern) |
| PSSO re-registration on iOS | Any Platform SSO registration stage or verification command | Drop entirely — iOS has no Platform SSO; no equivalent to `app-sso platform -s` |
| FileVault key rotation on iOS | Any FileVault management stage | Drop entirely — iOS has no FileVault; Data Protection is hardware-tied, no MDM key |
| PSSO Settings Catalog policy wiring | References to PSSO Settings Catalog as an iOS Intune readiness prerequisite | Drop — PSSO Settings Catalog is macOS-only; iOS Intune readiness = ADE enrollment policy only |

---

## Common Pitfalls

### Pitfall 1: Conflating iOS forced-restart enforcement with macOS full-screen lock

**What goes wrong:** Author copies macOS Stage 6 "non-dismissible full-screen prompt" language into the iOS file without adapting it for the iOS forced-restart behavior.
**Why it happens:** The stages look structurally parallel; the distinction is easy to miss.
**How to avoid:** iOS Deadline Enforcement stage MUST state: "At the deadline, iOS/iPadOS performs a forced device restart — the device reboots and completes enrollment automatically. There is no user-facing locked screen on iOS/iPadOS (unlike macOS, which presents a non-dismissible full-screen prompt)."
**Warning signs:** Any mention of "non-dismissible lock screen," "enrollment from the locked screen," or "cannot access apps until enrollment completes" without explicit iOS/macOS distinction — these phrases describe macOS behavior, not iOS.

### Pitfall 2: Including FileVault key retrieval sub-steps in the iOS Stage 2 analog

**What goes wrong:** Author copies macOS Stage 2's three sub-steps (FileVault retrieval, Activation Lock retrieval, Delete Device Record) wholesale into iOS Stage 2.
**Why it happens:** Stage 2 is a shared pre-flight in the macOS file; it's easy to copy verbatim.
**How to avoid:** iOS Stage 2 analog = **two sub-steps only**: (1) Activation Lock bypass code retrieval, (2) Delete Device Record. The FileVault sub-step is dropped. State explicitly that iOS Data Protection is hardware-tied and always-on — there is no MDM-escrowed recovery key on iOS.
**Warning signs:** Any sentence mentioning "FileVault recovery key" in the iOS walkthrough context (not in a contrast callout).

### Pitfall 3: Stale anchor targeting for FIX-01/02/03

**What goes wrong:** Planner or author targets the REQUIREMENTS.md-cited line numbers (`:108`, `:101`, `:242-247`) which are now stale after Phase-109 edits.
**Why it happens:** REQUIREMENTS.md line anchors were accurate at time of writing; Phase 109 added content that shifted line numbers.
**How to avoid:** Target semantic content, not line numbers. For FIX-01: the "macOS L1 Runbooks" table row containing `(6 runbooks:`. For FIX-02: the `#36` trigger containing `Escalate L2 via [Platform SSO — Secure Enclave Key Loss]`. For FIX-03: the L1 bullet under `### macOS Local Password: User Locked Out` pointing to runbook #37.
**D-04 drift table is authoritative:**

| Requirement | Stale anchor (REQUIREMENTS.md) | Real live anchor | Content signal |
|---|---|---|---|
| FIX-01 | `index.md:108` | `index.md:110` | "(6 runbooks: device, Setup Assistant..." |
| FIX-02 | `quick-ref-l1.md:101` | `quick-ref-l1.md:106` | "Escalate L2 via [Platform SSO — Secure Enclave Key Loss]" |
| FIX-03 | `common-issues.md:242-247` | User-Locked-Out block ~`:249-254` | "### macOS Local Password: User Locked Out" heading |

### Pitfall 4: Editing the wrong common-issues.md block for FIX-03

**What goes wrong:** Author edits the "Platform SSO Re-Registration Failure (Post-Migration)" block (~`:241-247`) instead of the "macOS Local Password: User Locked Out" block (~`:249-254`).
**Why it happens:** The REQUIREMENTS.md anchor `:242-247` points directly to the Post-Migration block, not the User-Locked-Out block — this is the stale anchor.
**How to avoid:** Confirm heading: the correct target block is `### macOS Local Password: User Locked Out` (not `### Platform SSO Re-Registration Failure (Post-Migration)`). These are adjacent blocks. The #36 mandatory step after password recovery belongs in the User-Locked-Out block — not the post-migration block. [VERIFIED: direct file read]

### Pitfall 5: Adding a second PSSO-runbook reference row in FIX-01

**What goes wrong:** Author adds enumeration of #35/#36/#37 to the macOS L1 Runbooks row at `:110`, duplicating the PSSO Runbooks row at `:112`.
**Why it happens:** Natural desire to be thorough; not checking that `:112` already covers it.
**How to avoid:** The fix is a COUNT/wording fix at `:110` only. The "see row below" pattern is the cleanest: `"9 macOS L1 runbooks — 6 ADE plus 3 Platform SSO (see row below)"`. No new rows needed. [VERIFIED: `:112` already references #35/#36/#37]

### Pitfall 6: Using wrong heading for MIGF-02 appendix (double-hyphen trap)

**What goes wrong:** Heading uses `### Jamf Pro / Mosyle` or `## Appendix (Jamf Pro / Mosyle)` which generates double-hyphen slugs.
**Why it happens:** Natural way to express a combined vendor section.
**How to avoid:** Use `### Jamf Pro` and `### Mosyle` as separate H3s under a single H2. H2 title: `## Appendix: Source-MDM Release Steps for Jamf Pro and Mosyle` (no slash, no parentheses in anchor-generating part).

---

## Code Examples

The following are load-bearing patterns from the template file that the author must mirror or adapt.

### macOS Stage 2 Hedge Language Pattern (→ iOS Stage 2 + MIGF-02 Appendix)

```markdown
> **Note:** [Console name] resolves but is a login-gated SPA — console navigation there is not verifiable without operator login credentials. The conceptual action is the same regardless of which portal you access: navigate to the device record, open the Device Action Menu, and access the secret-retrieval options before any deletion step. Verify current console labels on your own authoring day.
```
Source: `docs/macos-lifecycle/02-mdm-migration-psso.md:152-154` [VERIFIED]

### Macros Stage 2 Pre-Deletion Warning Callout (→ iOS Stage 2 + MIGF-02)

```markdown
> **Important:** Retrieve ALL secrets from [source MDM] BEFORE performing Delete Device Record. [Secrets] are **permanently destroyed** when the device record is deleted. There is no recovery path after deletion.
```
Source: `docs/macos-lifecycle/02-mdm-migration-psso.md:134-136` [VERIFIED]

### Platform Gate Blockquote Pattern (→ iOS migration file front matter)

```markdown
> **Platform gate:** This guide covers iOS/iPadOS MDM migration from Kandji/Iru to Microsoft Intune using the ABM "Assign Device Management" + Deadline in-place path (iOS/iPadOS 26 or later). For the underlying ADE enrollment pipeline (including the pre-26 wipe re-enroll path), see [iOS/iPadOS ADE Lifecycle](01-ade-lifecycle.md). For macOS MDM migration, see [macOS MDM Migration Walkthrough](../macos-lifecycle/02-mdm-migration-psso.md).
```
Mirrors: `docs/macos-lifecycle/02-mdm-migration-psso.md:9` [VERIFIED]

### B2 (Pre-26 wipe) Pointer Section Pattern (→ iOS pre-26 subsection)

```markdown
> **Pre-iOS/iPadOS-26 wipe-and-re-enroll path — required for all devices running iOS/iPadOS 25 or earlier.**
>
> The in-place migration path is not available on iOS/iPadOS 25 or earlier. ...
>
> For the complete ADE re-enroll pipeline after wipe, see [iOS/iPadOS ADE Lifecycle](01-ade-lifecycle.md).
```
Mirrors: `docs/macos-lifecycle/02-mdm-migration-psso.md:439-459` B2 path pattern [VERIFIED]

### iOS Deadline Enforcement Stage — SC4 Differentiator Language

The iOS file's Deadline Enforcement stage MUST contain a contrast with macOS. Suggested language for "What Happens" step:

```markdown
**Deadline enforcement on iOS/iPadOS:** At the deadline, iOS/iPadOS performs a **forced device restart** — the device reboots and completes enrollment in Intune automatically. Unlike macOS (which displays a non-dismissible full-screen prompt), there is no locked screen on iOS/iPadOS requiring active user input at deadline time. After the restart, the device re-enrolls with Intune using the ADE enrollment policy assigned to the device serial number.
```

### Version History Entry Pattern (→ iOS migration file)

```markdown
| Date | Change |
|------|--------|
| [authoring-date] | Phase 110: initial iOS/iPadOS MDM migration walkthrough (in-place path, iOS/iPadOS 26+) |
```
Mirrors: `docs/macos-lifecycle/02-mdm-migration-psso.md:560-565` [VERIFIED]

---

## Architecture Patterns

### Recommended File Structure

```
docs/
├── ios-lifecycle/
│   ├── 00-enrollment-overview.md  (exists — nav-hub for iOS lifecycle dir)
│   ├── 01-ade-lifecycle.md        (exists — ADE pipeline; link-not-copy target for pre-26 wipe)
│   └── 02-mdm-migration.md        (NEW — MIGF-01 deliverable)
└── macos-lifecycle/
    └── 02-mdm-migration-psso.md   (exists — append MIGF-02 Appendix at end)
```

### Stage Count for iOS In-Place Track

Based on macOS template (Stages 1-9) with drops and adaptations:

| Stage # | Name | Status |
|---------|------|--------|
| Stage 1 | Fleet Assessment & iOS/iPadOS OS Gate | CARRY (adapt for iOS) |
| Stage 2 | Intune Readiness, Activation Lock Retrieval, and Source Release | CARRY (drop FileVault sub-steps) |
| Stage 3 | ABM "Assign Device Management" | CARRY (identical) |
| Stage 4 | Set Deadline | CARRY (identical 1-90 day range) |
| Stage 5 | User Notification Window | CARRY (identical cadence) |
| Stage 6 | Deadline Enforcement | CARRY with CRITICAL iOS adaptation (forced restart, not full-screen lock) |
| Stage 7 | Post-Migration Enrollment Verification | CARRY (adapted: portal-only verification, no `app-sso` command) |
| Stage 8 (FileVault Key Rotation) | DROP | No iOS analog |
| Stage 9 (PSSO Re-Registration) | DROP | No iOS analog |

**Result: 7-stage in-place track** (Stages 1-7 renumbered as needed, or carried as Stage 1-7 with 8-9 absent).

### Navigation-Last Pattern for MIGF-01

New iOS migration file's nav-hub wiring commits AFTER the content file is committed. Target files for nav-hub entries (to be noted in plan but executed after MIGF-01 content is committed):
- `docs/ios-lifecycle/00-enrollment-overview.md` — add migration walkthrough link
- `docs/index.md` iOS section — add migration walkthrough entry
- `docs/_glossary-macos.md` — any new iOS migration terms (ABM "Assign Device Management" is already covered in the macOS glossary; check if an iOS-specific entry is needed)

---

## Validation Architecture

> `workflow.nyquist_validation` not set to false in config (key absent) — include this section.

This is a documentation-only phase. There are no automated tests for Markdown content correctness. Verification is manual and visual.

### Test Framework

| Property | Value |
|----------|-------|
| Framework | Manual verification (no automated test framework for Markdown corpus) |
| Quick run command | Read the edited file and verify the changed text visually |
| Full suite command | Review all five deliverables against SC1-SC5 in ROADMAP.md Phase 110 |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Verification Method |
|--------|----------|-----------|---------------------|
| FIX-01 | `index.md` macOS L1 runbook count = 9 | Manual | Read `index.md` at the macOS L1 Runbooks row; confirm count ≥8 |
| FIX-02 | `quick-ref-l1.md` #36 trigger uses L1 "Use runbook" pattern | Manual | Read `quick-ref-l1.md` at the #36 trigger; confirm no "Escalate L2 via" language |
| FIX-03 | `common-issues.md` User-Locked-Out block contains L1 #36 bullet between L1 #37 and L2 #27 | Manual | Read the User-Locked-Out block; confirm insertion order: #37 → #36 → #27 |
| MIGF-01 | New iOS file exists at `docs/ios-lifecycle/02-mdm-migration.md` with all required sections | Manual | Verify file exists; confirm Deadline Enforcement stage contains iOS/macOS contrast; confirm no FileVault/PSSO stages present |
| MIGF-02 | Appendix exists at end of `docs/macos-lifecycle/02-mdm-migration-psso.md` with `### Jamf Pro` and `### Mosyle` H3s each covering all three sub-steps | Manual | Read end of macOS migration file; confirm appendix, both H3s, and three sub-steps per vendor |

---

## Environment Availability

Step 2.6: SKIPPED — this is a pure Markdown documentation authoring phase. No external tools, services, runtimes, or CLI utilities are needed beyond a text editor and git.

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | Pre-iOS/iPadOS 26 requires a wipe (no in-place path available for pre-26 iOS) | MIGF-01 — OS Version Gate | Low — consistent with macOS pattern and iOS ADE enrollment mechanics; Apple Support page confirms iOS 26+ gate but doesn't explicitly state pre-26 iOS behavior |
| A2 | iOS Activation Lock bypass code retrieval from source MDM follows the same pre-deletion timing requirement (permanently destroyed on Delete Device Record) as macOS | MIGF-01 — Stage 2 analog | Medium — consistent with Apple MDM protocol behavior for supervised devices; if wrong, the urgency of pre-deletion retrieval in the iOS file would be overstated, but the recommendation to retrieve before deletion is still correct practice |
| A3 | Personal (unmanaged) apps are preserved during iOS in-place migration | MIGF-01 — What Is Preserved | Low — consistent with wipe-free migration premise; Apple docs confirm managed app data preserved; personal app preservation is implicit from "wipe-free" |
| A4 | VPP licenses are NOT automatically transferred during iOS migration; admin must re-assign in Intune | MIGF-01 — What Is Preserved / Watch Out For | Medium — sourced from community (Addigy); if wrong, the Watch Out For callout would be unnecessary but harmless |
| A5 | Jamf Pro stores FileVault recovery keys in the device record security section (exact label not confirmed) | MIGF-02 — Jamf Pro sub-step 1 | Low — conceptual-action framing + authoring-day hedge covers this; if exact label differs, the hedge language is the safety net |
| A6 | Mosyle Activation Lock bypass codes are at Management > Devices Overview > [device] > Security Info tab | MIGF-02 — Mosyle sub-step 2 | Low — from community documentation; hedge language covers label drift; author must verify on authoring day |
| A7 | Jamf Pro's device-record deletion action triggers MDM profile removal at next check-in (~15 minutes), consistent with the ~15-minute agent removal pattern from Kandji/Iru | MIGF-02 — Jamf Pro sub-step 3 | Low — standard MDM protocol behavior; if timing differs, only the "allow 15 minutes" recommendation is affected |
| A8 | iOS supervised devices with Kandji/Iru enrollment have Activation Lock bypass codes available in the Kandji/Iru console following the same pattern as macOS device records | MIGF-01 — Stage 2 analog | Low — Kandji/Iru is a multi-platform MDM; supervised iOS device handling is consistent with macOS in the same console |

---

## Open Questions

1. **Does iOS 26 in-place migration preserve the supervised state from the source MDM enrollment?**
   - What we know: Supervision is set at ADE enrollment time on iOS; the in-place migration re-enrolls the device with the new MDM via ADE enrollment policy.
   - What's unclear: Whether the brief unenrollment moment destroys and re-grants supervision, or whether it is continuous. (Macros walkthrough has this as MEDIUM confidence even for macOS.)
   - Recommendation: Carry as MEDIUM confidence (same as macOS Stage 7 supervision note), verified on a pilot device before fleet migration. No iOS-specific callout needed beyond this standard MEDIUM-confidence hedge.

2. **Does Kandji/Iru expose iOS Activation Lock bypass codes in the same device record view as macOS?**
   - What we know: Kandji/Iru is a multi-platform MDM; macOS bypass codes are in the Device Action Menu / device record.
   - What's unclear: Whether the iOS console path differs from macOS.
   - Recommendation: Use the same "verify current console labels on your authoring day" hedge; note the conceptual action is the same regardless of whether it's an iOS or macOS device record.

3. **Is the `await_device_configured` key / delayed `DeviceConfigured` command relevant to author in MIGF-01?**
   - What we know: Apps remain on the device if the new MDM delivers them before `DeviceConfigured`. This is an Intune-side configuration choice.
   - What's unclear: Whether Intune's iOS ADE enrollment policy handles this automatically or requires admin configuration.
   - Recommendation: Include a Watch Out For note advising admins to pre-assign iOS apps (via VPP) in Intune before migration to minimize app re-installation disruption. The technical mechanism (await_device_configured) is a detail for the "Behind the Scenes" subsection.

---

## Sources

### Primary (HIGH confidence)
- Apple Support — "Migrate managed devices to another device management service" ([dep4acb2aa44](https://support.apple.com/guide/deployment/migrate-managed-devices-dep4acb2aa44/web)) — iOS vs macOS deadline enforcement distinction (forced restart vs full-screen lock); notification cadence; OS 26+ gate; managed app data preservation
- Direct file read — `docs/macos-lifecycle/02-mdm-migration-psso.md` — complete template structure including all stage patterns, hedge language, callout style, See Also format, Glossary QR, Version History
- Direct file read — `docs/ios-lifecycle/01-ade-lifecycle.md` — iOS ADE pipeline (link-not-copy target for pre-26 wipe); template exemplar for iOS lifecycle files
- Direct file read — `docs/ios-lifecycle/00-enrollment-overview.md` — iOS lifecycle nav structure; new `02-` file slot
- Direct file read — `docs/index.md:100-130` — FIX-01 live text confirmed at `:110`
- Direct file read — `docs/quick-ref-l1.md:96-115` — FIX-02 live text confirmed at `:106`
- Direct file read — `docs/common-issues.md:239-262` — FIX-03 live block confirmed at ~`:249-254`
- Direct file read — `docs/l1-runbooks/00-index.md:36-50` — macOS ADE runbook count source of truth (9 runbooks: #10-15 + #35/#36/#37)

### Secondary (MEDIUM confidence)
- Microsoft TechCommunity blog — "Apple making device migration to Microsoft Intune easy with upcoming OS 26 release" (2025-08-04) — iOS/iPadOS 26+ in-place migration Intune support confirmation [cited in macOS template `:335`]
- Addigy blog — "macOS, iOS and iPadOS 26: Seamless Apple Device Management Migration" — iOS forced-restart enforcement detail; apps/data preservation; await_device_configured key for app continuity
- EMM-Blog — "Native MDM Migration in macOS Tahoe and iOS/iPadOS 26" — supplementary iOS migration behavior confirmation
- Mosyle community documentation — Activation Lock bypass code location in Mosyle console (Management > Devices Overview > Security Info tab)
- Jamf community documentation — Activation Lock bypass codes in Jamf Pro device records

### Tertiary (LOW confidence)
- Community sources for Jamf Pro + Mosyle console navigation paths — conceptual-action level only; cannot be confirmed without live admin credentials; all tagged [ASSUMED] and covered by "verify on your authoring day" hedging

---

## Metadata

**Confidence breakdown:**
- Corpus fixes (FIX-01/02/03): HIGH — all three live anchors verified by direct file read; exact text confirmed
- iOS migration mechanics (MIGF-01): MEDIUM — iOS 26 not yet GA; Apple Support confirms key behaviors (forced restart, OS gate, data preservation); some pre-26 and supervision behaviors [ASSUMED]
- Jamf Pro / Mosyle console paths (MIGF-02): MEDIUM-LOW — conceptual-action confirmed correct approach; exact UI paths not live-verifiable; hedge language is the safety net

**Research date:** 2026-07-01
**Valid until:** 2026-09-29 (90 days; iOS 26 features may shift if release cadence changes)
