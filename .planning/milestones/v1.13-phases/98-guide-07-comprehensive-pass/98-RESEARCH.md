# Phase 98: Guide 07 Comprehensive Pass - Research

**Researched:** 2026-06-29
**Domain:** macOS Platform SSO documentation — single-file comprehensive pass (ACC-03 + TS-01/02/03 + DEP-03)
**Confidence:** HIGH for structure and DEP-03 (inspected live file); MEDIUM for TS-01/02/03 facts (some from session experience, some VERIFIED via Microsoft Learn)

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**D-01 (GA1): Troubleshooting architecture — distribute by semantic home, augment existing structures**
- TS-01 (Extension-Identifier typo) → existing `## Configuration-Caused Failures` table (~line 221) as new schema-conformant row (`Misconfiguration | Portal | Symptom | Runbook`) **plus adjacent prose deep-dive** immediately below the table.
- TS-02 (A2 Company-Portal delivery requirements) → **AUGMENT the existing Advanced-section "ADE Path Prerequisites" table** (~lines 317–324) with the three net-new facts. Do NOT create a second A2-requirements table.
- TS-03 (diagnostic tree) → its **own subsection** adjacent to the failures section (NOT nested under the Configuration-Caused Failures H2).

**D-02 (GA2): Diagnostic-tree format — numbered "if X → check Y" bisection ladder (nested ordered list), NOT mermaid, NOT a flat table**
- TS-03 sequence: Intune device record → Company Portal version ["Installed ≠ correct version"] → Extension Identifier → user license → A1 bisect via disabling `Enable Registration During Setup`
- Terminal A1-bisect drops in as a sub-bullet branch.

**D-03 (GA3): A1/A2 labels — lightweight deferential cross-reference to guide 01; preserve ALL slugs byte-identical**
- Add a lightweight equivalence pointer ("this deployment's during-Setup-Assistant approach is the A2 path — see guide 01") and use A1/A2 where the new troubleshooting content needs them.
- HARD CONSTRAINT: Do NOT rename any heading. `## Advanced / Optional: ADE-during-Setup-Assistant` (slug `#advanced--optional-ade-during-setup-assistant`) and `## End-User Sign-In Experience (Secure Enclave)` (slug `#end-user-sign-in-experience-secure-enclave`) carry inbound cross-file anchors. Add A1/A2 labels in body prose only; headings/slugs stay byte-identical.

**D-04 (GA4): Freshness — file-level frontmatter bump + version-history row; NO new per-section pair-stamp**
- Bump frontmatter `last_verified` / `review_by` with the +3-month/same-day invariant preserved.
- Add one dated version-history row documenting ACC-03 + TS-01/02/03 + DEP-03 work.
- Do NOT add a new per-section pair-stamp to the troubleshooting content.
- Caveat: if the Phase-98 pass edits the existing Advanced section's content, bump its line-311 per-section stamp (`2026-06-20`→edit date, `2026-09-20`→+3-month/same-day) in lockstep.

**Content treatment:**
- TS-01/02/03: net-new authoring — verify all claims.
- DEP-03: formalize-only — already present in guide 07; freeze and do not re-author. Bounded spot-verify only for genuinely uncited high-drift claims.

### Claude's Discretion
- Exact wording of the new failures-table row, the TS-01 deep-dive prose, the A2-augmentation cells, the diagnostic-tree ladder steps, the A1/A2 equivalence pointer, and the version-history row.
- Exact placement of the TS-03 diagnostic-tree subsection (immediately after the failures table vs after the deep-dive), provided it does not nest under the "Configuration-Caused Failures" H2 and does not rename existing headings.

### Deferred Ideas (OUT OF SCOPE)
- `check-phase-98.mjs` validator + chain-apex extension — Phase 100 (HARN-02). Phase 98 records only the needle-spec hand-off.
- Local-macOS-password-reset runbook + macOS navigation wiring — Phase 99 (RUN-01).
- Full re-audit/re-verification of the shipped DEP-03 depth against Microsoft Learn — out of scope (formalize-only + bounded spot-verify cap).
- Link-integrity guard on guide 07's anchors — Phase-100 link-integrity sweep.
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| ACC-03 | Remove "VPP from Apps and Books" from Step 2 CP deployment line (~line 126); reword "Deploy to the device" callout to separate install target (device) from assignment target | Line 126 confirmed as target; callout at lines 129–134. VPP removal is straightforward text patch. |
| TS-01 | Extension-Identifier-typo failure documented as Configuration-Caused-Failure: symptom, root cause (`com.microsoft.CompanyPortalMac.ssoextension`; Intune does not validate), fix, affects A1+A2 | Extension Identifier verified via Microsoft Learn. "Intune does not validate" tagged [ASSUMED]. Symptom string from real-world session. |
| TS-02 | A2 Company Portal delivery requirements consolidated in ADE Path Prerequisites table; LOB ≥ 5.2604.0, Required, same static user group, Intune-licensed user, Included apps trimmed to `com.microsoft.CompanyPortalMac` | CP version floor and "Included apps" trim VERIFIED via Microsoft Learn. "Intune-licensed user" tagged [ASSUMED]. |
| TS-03 | Setup-Assistant SSO-extension diagnostic tree documented as a numbered bisection ladder | Format decided (D-02). Sequence locked in CONTEXT.md. |
| DEP-03 | PSSO admin-setup depth formalized — all DEP-03 content already present in guide 07; bind to REQ-ID + freshness stamps | Full audit confirms DEP-03 content is present. Formalize-only. |
</phase_requirements>

---

## Summary

Phase 98 is a single-file comprehensive pass over `docs/admin-setup-macos/07-platform-sso-setup.md`. The file currently runs 365 lines and contains substantial session-written depth (Registration Approach decision record, End-User Sign-In Experience, Optional and Advanced settings, Non-PSSO-Accounts guidance). Three categories of work apply:

**Category 1 — Fix (ACC-03):** One surgical line edit at line 126 removes the VPP Company Portal option (macOS CP is always LOB/PKG; VPP applies only to iOS/iPadOS CP). The adjacent "Deploy to the device" callout (lines 129–134) needs rewording to cleanly separate install target (the device) from assignment target (user group or device group).

**Category 2 — Net-new authoring (TS-01/02/03):** Three real-world failure modes from the 2026-06-27/28 session must be documented accurately. Most TS-02 facts are VERIFIED via Microsoft Learn (Company Portal version floor, "Included apps" trim, group rules). Two TS-01/TS-02 claims are [ASSUMED] from session experience (Intune does not validate Extension Identifier; user must be Intune-licensed) and must be spot-verified during execution or accepted as [ASSUMED] by the planner.

**Category 3 — Formalize (DEP-03):** All five DEP-03 content areas are already present in the live guide 07 (Registration Approach at lines 17–51, End-User Sign-In at lines 52–79, Optional/Advanced at lines 233–293, AccountName token at lines 175–182, Non-PSSO-Accounts at lines 183–184). Formalize-only means binding these sections to DEP-03, applying freshness stamps, and leaving content untouched unless a bounded spot-verify identifies a genuine error.

**Primary recommendation:** Follow the D-01 distribution exactly — typo row + deep-dive in the existing failures table zone, TS-02 augments the existing ADE Prerequisites table in place, TS-03 gets its own adjacent subsection. This preserves all inbound anchors, avoids duplication, and requires no heading renames.

---

## Architectural Responsibility Map

This is a documentation phase. All work is content authoring within a single markdown file — no code tiers involved.

| Capability | Primary Owner | Secondary Owner | Rationale |
|------------|--------------|----------------|-----------|
| ACC-03 fix | Guide 07, Step 2 | n/a | Line 126 is the sole VPP claim in guide 07 |
| TS-01 documentation | Guide 07, Configuration-Caused Failures table + deep-dive | L1 runbook 35 (linked) | Failures table is the established schema; deep-dive adjacent |
| TS-02 documentation | Guide 07, ADE Path Prerequisites table (Advanced section) | Guide 01 (existing cross-links 01:394, 01:408) | TS-02 requires consolidated single-anchor for guide 01 to point at — table already exists |
| TS-03 documentation | Guide 07, new subsection adjacent to failures | n/a | Diagnostic tree is a distinct content type; must not nest under failures H2 |
| DEP-03 formalization | Guide 07, existing sections (lines 17–293) | n/a | Content already present; formalize-only |
| Freshness stamping | Guide 07 frontmatter (lines 2–3) + version-history (lines 355–364) | Advanced section line 311 (bump if edited) | D-04 convention |

---

## Standard Stack

No packages or libraries. This is a documentation phase — tools are markdown editor + git.

### Package Legitimacy Audit

Not applicable — no packages installed.

---

## Architecture Patterns

### File Structure: Guide 07 (Confirmed Live State — 2026-06-29)

```
docs/admin-setup-macos/07-platform-sso-setup.md  (365 lines)
├── Frontmatter (lines 1–7)           last_verified: 2026-06-27 / review_by: 2026-09-27
├── Platform gate callout (lines 9–11)
├── Registration Approach section (lines 17–51)   DEP-03 ✓ present
├── End-User Sign-In Experience (lines 52–79)     DEP-03 ✓ present
├── Prerequisites (lines 81–103)
├── Steps (lines 105–207)
│   ├── Step 2: Install / Verify Company Portal   ACC-03 target: line 126 + callout 129–134
│   ├── Step 3: Settings Catalog Policy           Extension Identifier at line 147
│   └── Step 4: Assign to User Groups
├── Verification (lines 208–219)
├── Configuration-Caused Failures table (221–231) TS-01 target: new row + deep-dive
├── Optional and Advanced Settings (233–293)      DEP-03 ✓ present
│   ├── Two-account-model table
│   ├── Optional settings reference
│   └── Leave-off callout
├── See Also (294–303)
├── Advanced / Optional: ADE-during-Setup-Assistant (307–352)  [ANCHOR: must not rename]
│   ├── Provenance stamp line 311 (2026-06-20 / 2026-09-20)
│   └── ADE Path Prerequisites table (317–324)    TS-02 augmentation target
└── Version history table (355–364)               D-04 target
```

### Confirmed Exact Line Numbers

| Element | Lines | Notes |
|---------|-------|-------|
| Frontmatter `last_verified` | 2 | `2026-06-27` |
| Frontmatter `review_by` | 3 | `2026-09-27` |
| ACC-03 VPP line | 126 | "Deploy via Intune as a managed app (VPP from Apps and Books or as a DMG/PKG)" |
| "Deploy to the device" callout start | 129 | `> **Deploy to the device, not for the user to launch...` |
| "Deploy to the device" callout end | 134 | End of blockquote |
| Extension Identifier in Step 3 table | 147 | `com.microsoft.CompanyPortalMac.ssoextension` already present |
| Configuration-Caused Failures table start | 221 | H2 heading |
| Configuration-Caused Failures table body | 223–231 | 7 existing rows |
| Advanced section heading | 307 | `## Advanced / Optional: ADE-during-Setup-Assistant` |
| Advanced section provenance stamp | 311 | `last_verified: 2026-06-20` / `review_by: 2026-09-20` |
| ADE Path Prerequisites table start | 315 | `### ADE Path Prerequisites` |
| ADE Path Prerequisites table body | 317–324 | 6 existing rows |
| Version history start | 355 | Header row |
| Version history rows | 356–364 | 9 existing rows |

---

## Anchor-Stability Map

**CRITICAL — these heading slugs must remain byte-identical after Phase 98:**

| Slug | Heading (current) | Inbound from | Internal refs |
|------|--------------------|--------------|---------------|
| `#advanced--optional-ade-during-setup-assistant` | `## Advanced / Optional: ADE-during-Setup-Assistant` | guide 01: lines 394, 408 | guide 07: lines 25, 40, 127, 253 |
| `#end-user-sign-in-experience-secure-enclave` | `## End-User Sign-In Experience (Secure Enclave)` | guide 02: line 102; guide 03: line 104 | none found |
| `#registration-approach-decision-and-alternatives` | `## Registration Approach: Decision and Alternatives` | guide 07:335 (internal only) | — |
| `#configuration-caused-failures` | `## Configuration-Caused Failures` | none external | — |

**Guide 01 → Guide 07 cross-links (TS-02 requirement):** Already exist at guide 01 lines 394 and 408, both pointing to `#advanced--optional-ade-during-setup-assistant`. Since TS-02's augmented content lives in the ADE Path Prerequisites table within that section, the existing links satisfy the TS-02 cross-link requirement. No new guide 01 edit is needed for the cross-link itself.

---

## TS-01: Extension-Identifier-Typo Failure — Verified Claims

### Claim: Extension Identifier correct value
`com.microsoft.CompanyPortalMac.ssoextension` [VERIFIED: Microsoft Learn]

Source: [Configure Platform SSO for macOS devices](https://learn.microsoft.com/en-us/intune/device-configuration/settings-catalog/configure-platform-sso-macos) — Step 2 settings table: "Extension Identifier: `com.microsoft.CompanyPortalMac.ssoextension` — Copy and paste this value in the setting. This ID is the SSO app extension that the profile needs for SSO to work."

The value is also present in guide 07 at line 147 (Step 3 settings catalog table), confirming the guide already uses the correct value.

### Claim: Intune does NOT validate the Extension Identifier field
[ASSUMED] — The Microsoft Learn documentation instructs admins to "Copy and paste this value in the setting," indicating it is a free-text field with no dropdown enforcement. No explicit statement from Microsoft that validation is absent. This is consistent with real-world experience from the 2026-06-27/28 session where a typo went undetected until deployment.

**Risk if wrong:** Low — if Intune added validation recently, the typo failure mode would be prevented, reducing the urgency of TS-01. The documentation value and fix remain correct regardless.

### Claim: Symptom string — "Unable to Sign-In … necessary SSO application or extension"
[ASSUMED] — The Microsoft Learn troubleshooting page documents an "Unable to sign-in – Single sign-on application is missing" error (from a screenshot title), with description: "Setup Assistant may show a missing SSO app message even though the PSSO profile has already been delivered." However, the documented Microsoft cause is Company Portal still downloading (transient), not an Extension Identifier typo (permanent).

**The critical diagnostic distinction (from real-world session experience):**
- **Transient (documented):** CP still downloading → "Try Again" resolves it once CP finishes installing.
- **TS-01 typo (permanent, from session):** CP IS installed + PSSO policy shows Succeeded, yet "Try Again" loops indefinitely. Root cause: macOS cannot activate the SSO extension because the Extension Identifier in the policy does not match the actual extension bundle ID on the device.

The exact on-screen text in the typo scenario may match the "Single sign-on application is missing" title or a variant. The planner should author TS-01 deep-dive prose that describes the symptom in terms the admin can observe (CP Installed, policy Succeeded, looping) rather than relying on a specific exact UI string.

**Source reference:** [macOS Platform SSO known issues and troubleshooting](https://learn.microsoft.com/en-us/entra/identity/devices/troubleshoot-macos-platform-single-sign-on-extension) — section "Unable to sign-in – Single sign-on application is missing"

### Claim: TS-01 affects both A1 and A2
[ASSUMED] — The Extension Identifier is a required field for both paths. A typo in the identifier prevents the macOS SSO extension framework from locating the extension on either path. No specific Microsoft documentation per-path, but the field is shared across both deployments.

---

## TS-02: A2 Company Portal Delivery Requirements — Verified Claims

### Claim: Company Portal LOB app version floor 5.2604.0 for A2
[VERIFIED: Microsoft Learn] — configure-platform-sso-during-enrollment.md, Step 2: "Company Portal 5.2604.0 and newer is required."

### Claim: Company Portal LOB app version floor 5.2404.0 for A1
[VERIFIED: Microsoft Learn] — configure-platform-sso-macos.md, Prerequisites: "Devices require Microsoft Intune Company Portal app version **5.2404.0** or newer."

### Claim: LOB app "Included apps" must be trimmed to `com.microsoft.CompanyPortalMac` only
[VERIFIED: Microsoft Learn] — configure-platform-sso-during-enrollment.md, Step 2: "In the **App bundle ID** list, only add the `com.microsoft.CompanyPortalMac` app bundle ID. Remove any app bundle IDs that aren't related to the Company Portal."

This is one of the three net-new facts for the ADE Path Prerequisites table augmentation.

### Claim: All three policies assigned to the same Assigned (static) user group
[VERIFIED: Microsoft Learn] — configure-platform-sso-during-enrollment.md, Before you begin: "Assign all the policies to the same **Assigned (static)** user groups that will use this feature." Groups must be user groups (not device groups) and Assigned/static (not dynamic).

### Claim: Enrollment profile stays device/serial-targeted in ABM, bridged to user group by user affinity
[ASSUMED] — Standard ADE behavior: in Apple Business Manager, the enrollment profile is assigned to devices by serial number. In Intune, the ADE enrollment profile is assigned to user groups. User affinity (configured in the enrollment profile as "Enroll with User Affinity") bridges the device-serial ABM assignment to the user-group Intune assignment. Microsoft Learn says to "Assign the profile to the same groups as the Platform SSO policy" — confirming the Intune assignment is user-group-based.

**Risk if wrong:** Low — this is standard ADE user-affinity behavior, not specific to Platform SSO. The claim is correct by definition of ADE + user affinity enrollment.

### Claim: User must be Intune-licensed
[ASSUMED] — Standard Intune requirement: any user of a managed device must be licensed for Microsoft Intune. Not called out explicitly in the A2-specific documentation (configure-platform-sso-during-enrollment.md). The main Platform SSO page notes "It's included with all Microsoft Intune licensing plans" — describing feature availability, not a per-user gate specific to A2.

**Risk if wrong:** Medium — if this is not explicitly documented as A2-specific, the planner may wish to present it as a general Intune requirement rather than an A2-specific prerequisite. However, it is a real requirement: if the user is not Intune-licensed, they cannot receive Intune-managed policies and the device will fail to get the PSSO policy, CP LOB app, or enrollment profile.

**Recommendation:** Author this as: "the user must have an active Intune license — required for all Intune-managed users, not specific to A2, but commonly overlooked as an A2 failure cause."

### Claim: macOS 26 hard gate for A2
[VERIFIED: Microsoft Learn] — configure-platform-sso-during-enrollment.md, Prerequisites: "This feature supports the following platform: macOS 26 and newer."

---

## TS-03: Diagnostic Tree — Sequence Locked

The TS-03 bisection sequence is locked by D-02. The planner authors the ladder in this exact order:

1. Check Intune device record — is the device enrolled and showing the PSSO policy as Succeeded?
2. Check Company Portal version — does the device show "Installed ≠ correct version" (below 5.2604.0 for A2, or below 5.2404.0 for A1)?
3. Check Extension Identifier — does the policy value exactly match `com.microsoft.CompanyPortalMac.ssoextension`?
4. Check user license — is the user assigned an active Intune license?
5. A1 bisect branch: if A1 path suspected, disable `Enable Registration During Setup` and re-test with standard post-enrollment flow.

**Format (D-02):** Numbered ordered list with nested sub-bullets for the A1 bisect branch. No mermaid. No decision table.

**Placement (D-01):** Its own subsection adjacent to the failures section. Not nested under the `## Configuration-Caused Failures` H2. Exact heading and placement are Claude's discretion.

---

## DEP-03: Formalize-Only Audit

Full inspection of guide 07 confirms all five DEP-03 content areas are present:

| DEP-03 Content Area | Location in Guide 07 | Status |
|--------------------|---------------------|--------|
| Registration-Approach decision record | Lines 17–51 (`## Registration Approach: Decision and Alternatives`) | Present — 3-table structure (chosen config, why, what required) |
| End-User Sign-In Experience (Secure Enclave) + local-password lifecycle | Lines 52–79 (`## End-User Sign-In Experience (Secure Enclave)`) | Present — per-stage credential table, drift caveat, 3-credential table, rotation guidance |
| AccountName token mapping (AccountShortName vs preferred_username + LAPS) | Lines 175–182 (within Step 3 settings table) | Present — contrast table with use-when column |
| Non Platform SSO Accounts | Lines 183–184 (within Step 3 settings table) | Present — break-glass exclusion note |
| Optional & Advanced Platform SSO Settings (two account models + per-setting reference) | Lines 233–293 (`## Optional and Advanced Platform SSO Settings`) | Present — Model A vs B table, optional settings reference, leave-off callout |

**Formalize-only action required:**
- Bind these sections to DEP-03 in the version-history row.
- Apply D-04 freshness: bump frontmatter + add version-history row.
- If Advanced section content is edited (TS-02 augments the ADE Prerequisites table within it), bump Advanced section line-311 per-section stamp in lockstep per D-04 caveat.

**Bounded spot-verify scope (Phase 97 D-04 cap):** The version-history rows in guide 07 state these sections were "verified against Microsoft Learn" on 2026-06-27. The content is consistent with current Microsoft Learn documentation verified during this research. No forced re-audit needed. Spot-verify is warranted only for the one Advanced-section fact not confirmed during this research: "no in-place fix — recovery is wipe + re-enroll" (guide 07 line 341–351). This is VERIFIED by Microsoft Learn (configure-platform-sso-during-enrollment.md: "wipe the device, follow the steps, and re-enroll").

**Conclusion:** No DEP-03 content needs correction. The Advanced section will be edited (TS-02 augments lines 317–324), triggering the D-04 lockstep stamp bump at line 311.

---

## ACC-03: VPP Fix Details

**Target:** Line 126:
```
- Deploy via Intune as a managed app (VPP from Apps and Books or as a DMG/PKG), or verify existing deployment meets the version floor.
```

**Fix:** Remove "VPP from Apps and Books" — macOS Company Portal is always deployed as a PKG/LOB app. VPP (Apps and Books) applies only to iOS/iPadOS Company Portal. Replace with clean LOB-only description.

[VERIFIED: Microsoft Learn] — From guide 01 (the provisioning walkthrough, line 172): "On macOS the Company Portal is **always deployed as a PKG** — added to Intune as a **line-of-business (LOB) app** (or as an unmanaged **macOS app (PKG)**) using the Microsoft download from https://go.microsoft.com/fwlink/?linkid=853070. It is **never** distributed via Apple VPP / Apps and Books on macOS (that channel applies to the iOS/iPadOS Company Portal only)."

**Callout reword target (lines 129–134):** The callout needs to cleanly separate:
- Install target = the device (Company Portal must be present on the device)
- Assignment target = user group (for user-affinity devices) or device group (for userless/shared)

The current callout already has this logic but the wording is entangled with the VPP context. The reword should clarify both targets without mentioning VPP.

---

## Guide 01 A1/A2 Canonical Definitions (for D-03 cross-reference)

The D-03 deferential cross-reference should point to guide 01's "Which Path Is Right for You?" table. Exact phrasing from guide 01:

- **Document title (line 11):** "macOS Platform SSO Provisioning Walkthrough: A1 Standard and A2 ADE-during-Setup-Assistant"
- **Section heading:** "## Which Path Is Right for You?" (~line 15)
- **A1 label (line 18–19):** "A1 — Standard post-enrollment"
- **A2 label (line 19–20):** "A2 — ADE-during-Setup-Assistant"

**Recommended equivalence pointer wording (Claude's discretion):** Place in the Advanced section or Registration Approach section body prose. Example: "This guide's ADE-during-Setup-Assistant configuration corresponds to the **A2 path** as defined in [guide 01's "Which Path Is Right for You?" table](../macos-lifecycle/01-psso-provisioning-walkthrough.md#which-path-is-right-for-you)."

**Existing cross-links (already in guide 07):** The Registration Approach section and step references already link to guide 01 via the "See Also" section and inline links. The A1/A2 labels are only needed where the new troubleshooting content uses them (TS-01 "affects both A1 and A2"; TS-03 "A1 bisect" branch).

---

## Common Pitfalls

### Pitfall 1: Duplicate A2 Requirements Table
**What goes wrong:** Creating a new consolidated TS-02 section with a second A2 requirements table instead of augmenting the existing ADE Path Prerequisites table.
**Why it happens:** The three net-new TS-02 facts feel like new content that needs a new section.
**How to avoid:** Always augment the existing table at lines 317–324. That table is the single anchor that guide 01:394/408 targets.
**Warning signs:** If the plan creates a new `## ADE Company Portal Requirements` section anywhere, it violates D-01.

### Pitfall 2: Heading Rename Breaking Anchors
**What goes wrong:** Adding "A2" to a heading slug, e.g., renaming `## Advanced / Optional: ADE-during-Setup-Assistant` to include "A2" label.
**Why it happens:** D-03 encourages A1/A2 labels, and the Advanced heading is about the A2 path.
**How to avoid:** A1/A2 labels go in body prose ONLY. The heading text and its slug stay byte-identical. Add "This is the A2 path" in the first sentence under the heading.
**Warning signs:** Any heading text change in lines 307, 52, or 17 violates D-03's hard constraint.

### Pitfall 3: Nesting TS-03 Under the Failures H2
**What goes wrong:** Adding the diagnostic tree as a subsection of `## Configuration-Caused Failures`.
**Why it happens:** The tree is adjacent to the failures table, so it feels like it belongs under that H2.
**How to avoid:** Give TS-03 its own H2 or H3 at the same level as or immediately after the failures section. The diagnostic tree is not a "failure" — it is a diagnostic procedure. D-01 explicitly rules out nesting.

### Pitfall 4: Editing Advanced Section Without Bumping Line-311 Stamp
**What goes wrong:** Augmenting the ADE Path Prerequisites table (lines 317–324) and not updating the Advanced section's per-section provenance stamp at line 311.
**Why it happens:** D-04 says not to add per-section stamps, but the D-04 caveat says to bump *existing* stamps when editing content.
**How to avoid:** Line 311 currently shows `last_verified: 2026-06-20` / `review_by: 2026-09-20`. If TS-02 augmentation edits that table, bump line 311 to the edit date with the +3-month/same-day invariant (e.g., if edit date is 2026-06-29 → `last_verified: 2026-06-29` / `review_by: 2026-09-29`).

### Pitfall 5: Using TS-02 "Intune-licensed user" as an A2-Specific Claim
**What goes wrong:** Presenting "user must be Intune-licensed" as an A2-specific requirement when it is a general Intune requirement.
**Why it happens:** It appears alongside A2-specific requirements in the CONTEXT.md TS-02 claims.
**How to avoid:** Frame it as "user must have an active Intune license — a standard Intune requirement, commonly overlooked as an A2 failure point."

---

## Code Examples

### Failures Table Schema (for TS-01 row, verified from existing table at lines 223–231)

```markdown
| Misconfiguration | Portal | Symptom | Runbook |
|------------------|--------|---------|---------|
| Extension Identifier field contains a typo (correct value: `com.microsoft.CompanyPortalMac.ssoextension`; Intune does not validate this free-text field) | Intune | [symptom — see deep-dive below] | [pointer to deep-dive] |
```

The existing rows use short pointer-style `Runbook` cells (either a linked runbook filename or a cross-section reference). The TS-01 deep-dive should be the `Runbook` cell target.

### ADE Path Prerequisites Table (current state at lines 317–324)

```markdown
| Requirement | Value |
|-------------|-------|
| macOS version | macOS 26 or newer (hard gate — no earlier macOS) |
| Company Portal version | 5.2604.0 or newer (LOB app, NOT VPP) |
| Enrollment method | Automated Device Enrollment via Apple Business Manager |
| Group type | Assigned (static) user groups only — NOT dynamic groups, NOT device groups |
| Three-policy same-group rule | The Settings Catalog PSSO policy, the Company Portal LOB app, and the ADE enrollment profile must all be assigned to the **same** static user groups |
| ADE enrollment profile settings | User Affinity: "Enroll with User Affinity"; Authentication: "Setup Assistant with modern authentication"; Await Final Configuration: Yes; Locked Enrollment: Yes |
```

**Three rows to add (TS-02 net-new facts):**

```markdown
| User license | User must have an active Microsoft Intune license |
| Company Portal Included apps | In the LOB app's App bundle ID list, include only `com.microsoft.CompanyPortalMac` — remove any other bundle IDs |
| Enrollment profile device targeting | The enrollment profile is assigned to devices/serials in ABM; in Intune, assign to the same static user group as the PSSO policy and CP LOB app — user affinity bridges the two |
```

Source for "Included apps" row: [VERIFIED: Microsoft Learn — configure-platform-sso-during-enrollment.md, Step 2]
Source for user license row: [ASSUMED]
Source for enrollment profile targeting row: [ASSUMED — standard ADE behavior]

### Version-History Row Format (from existing rows at lines 356–364)

```markdown
| 2026-06-29 | Phase 98 (ACC-03 + TS-01/02/03 + DEP-03): removed VPP Company Portal option (ACC-03); added Extension-Identifier-typo Configuration-Caused-Failure (TS-01); augmented ADE Path Prerequisites table with three net-new A2 delivery requirements (TS-02); added Setup-Assistant SSO-extension diagnostic tree (TS-03); formalized PSSO admin-setup depth under DEP-03 | -- |
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Company Portal delivered via VPP (Apps and Books) | macOS CP always LOB/PKG — VPP channel applies to iOS only | Documented prior to this milestone; missed in initial guide 07 authoring | ACC-03 fix removes the VPP option |
| PSSO registration only post-enrollment (A1) | A2 path: PSSO registration during Setup Assistant (macOS 26+, CP 5.2604.0) | macOS 26 + Company Portal 5.2604.0 GA | Drives TS-02 and TS-03 |
| "Enable Registration During Setup" field absent | Now present in Settings Catalog for Secure Enclave on the A2 path | macOS 26 feature GA | Planner must include in TS-03 A1-bisect step |

**Current Microsoft Learn revision dates (verified 2026-06-29):**
- configure-platform-sso-macos.md: updated 2026-06-22
- configure-platform-sso-during-enrollment.md: updated 2026-06-23
- troubleshoot-mac-sso-extension-plugin.md: updated 2026-06-15
- troubleshoot-macos-platform-single-sign-on-extension.md: updated 2026-06-15

---

## Phase-100 Needle-Spec Hand-Off

The following stable tokens from guide 07 are candidates for `check-phase-98.mjs` (authored in Phase 100 as part of HARN-02's indivisible Atom 2). Phase 98 only records them — no validator is authored this phase.

| Token | Type | Section |
|-------|------|---------|
| `com.microsoft.CompanyPortalMac.ssoextension` | Extension Identifier — typo anchor | Step 3 settings table (line 147) + TS-01 deep-dive |
| `Enable Registration During Setup` | Setting name | Advanced section + TS-03 bisect |
| `5.2604.0` | A2 CP version floor | Step 2 + ADE Path Prerequisites table |
| `com.microsoft.CompanyPortalMac` | "Included apps" bundle ID | ADE Path Prerequisites table (after TS-02 augmentation) |
| `Non Platform SSO Accounts` | Setting name | Step 3 settings table (line 157) + Optional settings reference |
| `AccountShortName` | Token name | Step 3 settings table (line 151) + contrast table |
| `Configuration-Caused Failures` | Section label | H2 heading (line 221) |
| `ADE Path Prerequisites` | Table name | Advanced sub-heading (line 315) |
| `Registration Approach: Decision and Alternatives` | Section label | H2 heading (line 17) |
| `End-User Sign-In Experience (Secure Enclave)` | Section label | H2 heading (line 52) |

**Harness coverage note:** guide 07 is currently PRESENCE-only in check-phase-76.mjs (V-76-PRESENCE: asserts file exists + non-empty). check-phase-81.mjs needles the inbound link string `](07-platform-sso-setup.md)` from guide 03 (path-level). Neither validator will be broken by the Phase-98 restructuring.

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | Intune does NOT validate the Extension Identifier free-text field | TS-01 | Low — if Intune added validation, typo failure is prevented; the documented correct value and fix remain valid |
| A2 | TS-01 symptom: looping "Unable to Sign-In" despite CP Installed + PSSO Succeeded | TS-01 | Medium — exact on-screen wording may differ; but the diagnostic signature (CP installed, policy Succeeded, persistent failure) is from real-world session experience |
| A3 | TS-01 affects both A1 and A2 paths | TS-01 | Low — Extension Identifier is shared configuration for both paths |
| A4 | User must be Intune-licensed (as an A2 failure point) | TS-02 | Low — this is a standard Intune requirement; risk is only in framing (it should be a general Intune requirement, not presented as A2-specific) |
| A5 | Enrollment profile stays device/serial-targeted in ABM, bridged to user group by user affinity in Intune | TS-02 | Low — this is standard ADE user-affinity behavior; Microsoft Learn confirms the Intune assignment is to user groups |

**Verified claims (all others in this document):** Extension Identifier value, CP version floors (A1 + A2), "Included apps" trim to `com.microsoft.CompanyPortalMac`, macOS 26 hard gate, three-policy same-group rule, group type requirements (static user, not device, not dynamic), wipe-required recovery, existing guide 07 line numbers and content, anchor slugs and their inbound refs.

---

## Open Questions (RESOLVED)

1. **Exact TS-01 symptom string (on-screen text)**
   - What we know: Microsoft Learn documents "Unable to sign-in – Single sign-on application is missing" for the transient (CP still downloading) case.
   - What's unclear: Does the Extension Identifier typo produce identical or different on-screen text? Real-world session says similar but distinguishable by persistence.
   - Recommendation: Author TS-01 prose describing the observable signature (CP Installed + policy Succeeded + "Try Again" loops) rather than an exact quoted UI string. This is resilient to OS-version UI wording differences.
   - **RESOLVED:** Author by observable signature per CONTEXT.md D-01; implemented in plan 98-02 Task 1 ("describe the symptom by observable signature, not by a hard-quoted exact UI string").

2. **Whether "Intune-licensed user" is explicitly called out in A2 Microsoft docs**
   - What we know: It is a standard Intune requirement; Microsoft Learn does not explicitly list it as an A2-specific prerequisite.
   - What's unclear: Whether omitting it from the TS-02 table is more accurate than including it.
   - Recommendation: Include it as "standard Intune prerequisite, commonly overlooked as an A2 failure point" with [ASSUMED] tag. The executor should validate against current docs during the spot-verify step.
   - **RESOLVED:** Frame as a standard Intune prerequisite (not A2-exclusive) per CONTEXT.md Pitfall-5 framing; implemented in plan 98-01 Task 2, with execution-time spot-verify of the [ASSUMED] tag.

---

## Environment Availability

Step 2.6 SKIPPED — this is a pure content/documentation phase editing one existing markdown file. No external tools, services, runtimes, or CLIs beyond git are required.

---

## Validation Architecture

Per `.planning/config.json` — nyquist_validation not set to false; default = enabled.

### Existing Harness Coverage of Guide 07

| Check | File | What it asserts |
|-------|------|----------------|
| V-76-PRESENCE | `scripts/validation/check-phase-76.mjs` | Guide 07 exists and is non-empty (presence-only; restructuring is safe) |
| E7 | `scripts/validation/check-phase-81.mjs` | Inbound link string `](07-platform-sso-setup.md)` from guide 03 (path-level) |

**Phase 98 does NOT author any new validator.** Validators are Phase-100 HARN-02 Atom 2. The existing checks above will remain green because:
- Guide 07 remains non-empty (V-76-PRESENCE green by definition).
- The path reference `](07-platform-sso-setup.md)` from guide 03 targets the file path, not an internal anchor — unaffected by content edits (E7 green).

### Phase-98 Content Verification (manual, not harness)

| Req ID | Behavior | Verification | Automated? |
|--------|----------|-------------|-----------|
| ACC-03 | "VPP from Apps and Books" removed from line 126 | Grep for `VPP from Apps and Books` → zero results | Manual grep |
| ACC-03 | Callout separates install target from assignment target | Read lines 129–134 after edit | Human read |
| TS-01 | Extension-Identifier-typo row present in failures table | Grep for `com.microsoft.CompanyPortalMac.ssoextension` in failures section | Manual grep |
| TS-02 | ADE Path Prerequisites table contains `com.microsoft.CompanyPortalMac` (Included apps row) | Grep for `com.microsoft.CompanyPortalMac` in lines 315–340 | Manual grep |
| TS-03 | Diagnostic tree subsection exists and is NOT nested under `## Configuration-Caused Failures` | Read heading hierarchy | Human read |
| DEP-03 | Frontmatter bumped + version-history row added | Read lines 2–3, 355–366 | Human read |
| D-03 | No heading renamed | Diff heading lines against pre-edit | Git diff |
| D-04 | Line 311 stamp bumped (if Advanced section was edited) | Read line 311 after edit | Human read |

### Wave 0 Gaps

None — this phase has no new test files; it edits a single existing markdown file. The harness check strategy is post-edit manual verification per the table above.

---

## Security Domain

Security enforcement: not applicable to a documentation-only phase. No code is authored or modified. No authentication flows, credentials, or sensitive data are handled. The guide documents security-relevant Intune configuration (MFA, Conditional Access) but the phase work is content authoring only.

---

## Sources

### Primary (HIGH confidence — VERIFIED)
- [Configure Platform SSO for macOS devices - Microsoft Intune](https://learn.microsoft.com/en-us/intune/device-configuration/settings-catalog/configure-platform-sso-macos) — Extension Identifier value, CP version floor (A1), group assignment requirements, general prerequisites (updated 2026-06-22)
- [Add Platform SSO policy to ADE Profile on macOS devices](https://learn.microsoft.com/en-us/intune/device-configuration/settings-catalog/configure-platform-sso-during-enrollment) — CP version floor (A2), "Included apps" trim to `com.microsoft.CompanyPortalMac`, macOS 26 gate, three-policy same-group rule (updated 2026-06-23)
- Guide 07 (`docs/admin-setup-macos/07-platform-sso-setup.md`) — live file inspection confirming all line numbers, DEP-03 content presence, existing anchor slugs
- Guide 01 (`docs/macos-lifecycle/01-psso-provisioning-walkthrough.md`) — A1/A2 canonical definitions, existing cross-links at lines 394 and 408
- Guide 02 (`docs/admin-setup-macos/02-enrollment-profile.md`) — confirmed inbound anchor at line 102
- Guide 03 (`docs/admin-setup-macos/03-configuration-profiles.md`) — confirmed inbound anchor at line 104

### Secondary (MEDIUM confidence — cited)
- [macOS Platform single sign-on known issues and troubleshooting](https://learn.microsoft.com/en-us/entra/identity/devices/troubleshoot-macos-platform-single-sign-on-extension) — "Unable to sign-in – Single sign-on application is missing" error description (updated 2026-06-15)
- [Troubleshooting the Microsoft Enterprise SSO Extension plugin on Apple devices](https://learn.microsoft.com/en-us/entra/identity/devices/troubleshoot-mac-sso-extension-plugin) — general SSO extension troubleshooting flow (updated 2026-06-15)

### Tertiary (LOW confidence — [ASSUMED], marked for validation)
- Real-world session experience 2026-06-27/28 — TS-01 symptom (looping failure with CP Installed + PSSO Succeeded), "Intune does not validate Extension Identifier," "user must be Intune-licensed" as A2 failure point

---

## Metadata

**Confidence breakdown:**
- Guide 07 current state (line numbers, DEP-03 presence, anchors): HIGH — direct file inspection
- TS-01 Extension Identifier correct value: HIGH — verified via Microsoft Learn
- TS-02 CP version floor, "Included apps" trim, group rules: HIGH — verified via Microsoft Learn
- TS-01 "Intune does not validate" claim: LOW — [ASSUMED], not explicitly documented
- TS-01 symptom string for typo scenario: LOW — [ASSUMED] from session experience, transient variant in Microsoft Learn
- TS-02 "Intune-licensed user": LOW — [ASSUMED], standard Intune requirement not A2-specific
- DEP-03 formalize-only correctness: HIGH — content verified consistent with Microsoft Learn

**Research date:** 2026-06-29
**Valid until:** 2026-09-29 (90 days — stable documentation, 3-month review aligned with guide 07's own review_by cycle)
