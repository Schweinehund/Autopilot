# Phase 75: Glossary, Lifecycle Foundation & Stub Correction - Pattern Map

**Mapped:** 2026-06-20
**Files analyzed:** 4 files to be modified (no new files created)
**Analogs found:** 4 / 4 (all within the same corpus; each file is its own closest analog)

---

## File Classification

| Modified File | Role | Data Flow | Edit Type | Closest Analog (within file) | Match Quality |
|---------------|------|-----------|-----------|------------------------------|---------------|
| `docs/_glossary-macos.md` | reference-glossary | append-section + index-insert | new H2 section + 3 entries + index update + Version History row | Existing `### MAM-WE` entry (lines 110-118) + existing `## Version History` row (lines 123-129) | exact |
| `docs/_glossary.md` | reference-glossary | new-term-insert + body-append | new `### Entra ID SSO` heading + back-pointer inside existing `### TPM` body | Existing `### Secure Boot` / `### SCP` entries (lines 156-166) + existing `### TPM` entry (lines 111-113) | exact |
| `docs/admin-setup-macos/03-configuration-profiles.md` | admin-guide | surgical-edit | targeted prose replacement inside existing `## Extensible SSO` section (lines 163-168) | Other sections in same file (e.g., `## FileVault` block, lines 98-113) | role-match |
| `docs/macos-lifecycle/00-ade-lifecycle.md` | lifecycle-narrative | append-only | bullet append to `### Watch Out For` at Stage 4 (line 246+), Stage 6 (line 324+), Stage 7 (line 363+) | Existing `### Watch Out For` bullets in other stages (e.g., Stage 2 lines 152-155, Stage 5 lines 291-296) | exact |

---

## Pattern Assignments

---

### `docs/_glossary-macos.md` — new `## Authentication` section + 3 entries + index update + Version History row

**Edit type:** New H2 section (append before `## Version History`) + alphabetical index update + new Version History row.

**Anchor-stability constraint:** Adding new `###` headings is safe (no slug collision verified by CONTEXT.md D-04). The alphabetical index update is an in-place line edit on line 17 — the only sanctioned in-place edit in an otherwise append-only file.

---

#### Pattern: Entry skeleton (analog — `### MAM-WE`, lines 110-118)

The MAM-WE entry is the canonical medium-depth template. All three new entries must mirror this shape.

```markdown
### MAM-WE

Managed App Without Enrollment -- Intune's **app-layer** data protection model for iOS/iPadOS where the Intune Company Portal (or line-of-business equivalent) enforces app protection policies on specific Microsoft 365 and third-party apps WITHOUT enrolling the device in Intune MDM. [... 3-5 sentences ...]

**Scope boundary (per Phase 26):** MAM-WE is separate from MDM enrollment paths ... [optional bold-label callout]

> **Windows equivalent:** Intune App Protection Policies on Windows MAM-enrolled devices -- functionally analogous ...
> See also: [Web-app CA](_glossary-linux.md#web-app-ca) (Linux).
```

**What the three new entries must replicate from this shape:**
- `### TermName` heading (produces the anchor slug)
- 3-5 sentence definition paragraph
- `> **Windows equivalent:**` blockquote — **Platform SSO only** (D-01); omit for Secure Enclave and Enterprise SSO Plug-in
- `> See also:` line — either inside the Windows-equivalent blockquote (Phase 59 CLEAN-08 precedent, see below) or as a standalone blockquote when there is no Windows-equivalent block

---

#### Pattern: `> See also:` placement inside blockquote (Phase 59 CLEAN-08 precedent — `### Account-Driven User Enrollment`, lines 27-29)

The Version History at `_glossary-macos.md` line 126 confirms: "Phase 59 (CLEAN-08): appended `> See also:` lines INSIDE existing `> **Windows equivalent:**` blockquotes."

Confirmed current form in the file — `### Account-Driven User Enrollment` (lines 27-29):

```markdown
> **Windows equivalent:** No direct equivalent. The closest parallel is [Intune MAM-WE](#mam-we) on Windows MAM-enrolled devices ...
> See also: [BYOD](_glossary-android.md#byod) (Android); [User Enrollment](_glossary-android.md#user-enrollment) (Android).
```

Rule: When a `> **Windows equivalent:**` blockquote exists, the `> See also:` line is the **last line of that same blockquote** (same `>` prefix, no blank line separator). When no Windows-equivalent block exists (Secure Enclave, Enterprise SSO Plug-in), use a standalone blockquote:

```markdown
> See also: [TargetTerm](file.md#anchor) (platform/context).
```

---

#### Pattern: `## Alphabetical Index` line (line 17, current state)

```markdown
[ABM](#abm) | [ABM Token](#abm-token) | [Account-Driven User Enrollment](#account-driven-user-enrollment) | [ADE](#ade) | [APNs](#apns) | [Await Configuration](#await-configuration) | [Jailbreak Detection](#jailbreak-detection) | [MAM-WE](#mam-we) | [Setup Assistant](#setup-assistant) | [Supervision](#supervision) | [VPP](#vpp)
```

**Three insertions required** (computed by RESEARCH.md alphabetical ordering):

| New term | Insert after | Computed slug |
|----------|-------------|---------------|
| `Enterprise SSO Plug-in` | `[Await Configuration](#await-configuration)` | `#enterprise-sso-plug-in` |
| `Platform SSO` | `[MAM-WE](#mam-we)` | `#platform-sso` |
| `Secure Enclave` | `[Platform SSO](#platform-sso)` | `#secure-enclave` |

Result after insertion:
```
... | [Await Configuration](#await-configuration) | [Enterprise SSO Plug-in](#enterprise-sso-plug-in) | [Jailbreak Detection](#jailbreak-detection) | [MAM-WE](#mam-we) | [Platform SSO](#platform-sso) | [Secure Enclave](#secure-enclave) | [Setup Assistant](#setup-assistant) | ...
```

**Format rule:** Each entry is `[Display Name](#slug)` separated by ` | `. Display name matches the `### ` heading text exactly. Slug is lowercase with spaces→hyphens, parentheses stripped.

---

#### Pattern: `## Version History` row (lines 122-129, current table)

```markdown
## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-05-26 | Phase 67 (SWEEP-02): coordinating row for VPP location token → content token surgical rename in admin-setup-ios/05- + admin-setup-macos/04-app-deployment.md (PITFALLS.md CI-2 closure) | -- |
| 2026-05-05 | Phase 59 (CLEAN-08): appended `> See also:` lines INSIDE existing `> **Windows equivalent:**` blockquotes for collision-matrix terms (Account-Driven User Enrollment, ADE, Await Configuration, Setup Assistant, Supervision, ABM, VPP, MAM-WE); existing `> **Windows equivalent:**` labels PRESERVED verbatim per D-15 anti-rename | -- |
| 2026-04-24 | Phase 42: added Android Enterprise Provisioning Glossary see-also to continuation banner (AEAUDIT-03) | -- |
| 2026-04-17 | Phase 32: added iOS/iPadOS terms (supervision, MAM-WE, APNs, account-driven user enrollment, jailbreak detection), updated VPP with iOS device-licensed vs user-licensed distinction, new ## App Protection (MAM) H2 | -- |
| 2026-04-13 | Initial version -- 6 macOS terms with Windows cross-references | -- |
```

**New row to append** (append as NEWEST row — rows are in reverse chronological order, newest at top):

```markdown
| 2026-06-20 | Phase 75: added ## Authentication section (Platform SSO, Secure Enclave, Enterprise SSO Plug-in); added three new terms to ## Alphabetical Index; updated last_verified and review_by front matter | -- |
```

**Format rule:** Newest row is first in the table body. Date is ISO 8601 (YYYY-MM-DD). Author is ` -- ` (dash-space-dash). Change field uses backticks for inline code, `##` notation for section names.

---

#### Pattern: New `## Authentication` H2 section placement

Current H2 sections in order:
1. `## Alphabetical Index` (line 15)
2. `## Enrollment` (line 21)
3. `## Device Management` (line 60)
4. `## App Distribution` (line 90)
5. `## App Protection (MAM)` (line 108)
6. `## Version History` (line 121)

The new `## Authentication` section must be appended **before** `## Version History`. Placement is between `## App Protection (MAM)` and `## Version History`, separated by `---` dividers matching the file's existing pattern:

```markdown
---

## App Protection (MAM)

[...existing content...]

---

## Authentication

### Platform SSO

[definition]

> **Windows equivalent:** [...]
> See also: [Enterprise SSO Plug-in](#enterprise-sso-plug-in); [Entra ID SSO](_glossary.md#entra-id-sso).

### Secure Enclave

[definition]

> See also: [TPM](_glossary.md#tpm) (analogous hardware root of trust; not bit-for-bit equivalent — Secure Enclave performs no TPM-2.0/DICE attestation).

### Enterprise SSO Plug-in

[definition]

> See also: [Platform SSO](#platform-sso); [Entra ID SSO](_glossary.md#entra-id-sso).

---

## Version History
```

**`---` separator rule:** Each H2 section is preceded by a `---` rule and followed by a blank line before the next `---`. Inspect lines 58-60 and 88-92 for the exact blank-line cadence around separators:

```
[last entry body line]

---

## [Next Section]
```

---

#### Front matter update

Current front matter (lines 1-7):
```yaml
---
last_verified: 2026-05-26
review_by: 2026-07-04
applies_to: both
audience: all
platform: all
---
```

Per RESEARCH.md § Front Matter: updating to `last_verified: 2026-06-20` and `review_by: 2026-09-20` is appropriate because Phase 75 adds materially fact-bearing PSSO content with a 90-day review cadence.

---

### `docs/_glossary.md` — new `### Entra ID SSO` + back-pointer inside `### TPM` body

**Edit type:** (A) Insert new `### Entra ID SSO` term in the Security section alphabetically. (B) Append one `> See also:` line inside the existing `### TPM` entry body.

**Anchor-stability constraint:** Adding `### Entra ID SSO` is anchor-safe (no existing `#entra-id-sso` slug). Editing the body of `### TPM` adds no headings and shifts no slugs.

---

#### Pattern A: Security section structure (lines 154-167, current state)

```markdown
## Security

### Secure Boot

A UEFI firmware feature that verifies the bootloader's digital signature, required for TPM attestation.

### SCP

Service Connection Point -- an Active Directory object that tells Azure AD Connect which tenant to use for hybrid join.

### Selective wipe

See [Device retirement](#device-retirement). The term "selective wipe" is sometimes used interchangeably with Retire in older documentation.

---
```

**Observations:**
- Security section entries have a `### Heading` followed by a **single short definition paragraph** (1-2 sentences) — no blockquotes in `### Secure Boot` or `### SCP` or `### Selective wipe`.
- `### Selective wipe` is the last term before the closing `---` rule and the next H2 section.
- Alphabetical position of `### Entra ID SSO`: "E" comes before "Sc" / "SC" / "Se" — so `### Entra ID SSO` goes **before `### Secure Boot`** as the first entry in the Security section.

**New insertion point:** Line 155 (immediately after `## Security` and a blank line), before the current `### Secure Boot`.

**Skeleton for `### Entra ID SSO`** (modeled on the Secure Boot / SCP short-entry style + adding a `> See also:` blockquote per D-03):

```markdown
### Entra ID SSO

[1-2 sentence definition: WAM + PRT on Entra-joined/registered Windows devices; hardware-bound via TPM; silently authenticates across apps and browsers; PRT carries device compliance claims for Conditional Access.]

> See also: [Enterprise SSO Plug-in](_glossary-macos.md#enterprise-sso-plug-in) (macOS equivalent via Microsoft Enterprise SSO plug-in and Platform SSO).
```

**Note on `> See also:` placement:** Because `### Entra ID SSO` gets no `> **Windows equivalent:**` block (it IS the Windows entry), the `> See also:` is a standalone blockquote, not appended inside a Windows-equivalent block. This matches the pattern used by `### Await Configuration` in `_glossary-macos.md` for entries that only have a see-also and no Windows-equivalent.

---

#### Pattern B: `### TPM` entry — current state (lines 111-113)

```markdown
### TPM

Trusted Platform Module — the hardware security chip that stores cryptographic keys and performs attestation; required for self-deploying and pre-provisioning modes.
```

**Back-pointer to append:** One line appended directly after the definition sentence, forming a new `> See also:` blockquote:

```markdown
### TPM

Trusted Platform Module — the hardware security chip that stores cryptographic keys and performs attestation; required for self-deploying and pre-provisioning modes.

> See also: [Secure Enclave](_glossary-macos.md#secure-enclave) (analogous Apple hardware root of trust; not bit-for-bit equivalent — Secure Enclave performs no TPM-2.0/DICE attestation).
```

**Format rule:** Blank line between the definition paragraph and the `> See also:` blockquote (matches the MAM-WE / Account-Driven User Enrollment pattern where blockquotes are separated from body text by a blank line).

---

#### `_glossary.md` Alphabetical Index — NO change needed

The existing `## Alphabetical Index` in `_glossary.md` (line 18) lists existing terms only. `### Entra ID SSO` is a new term being added. Per the pattern in `_glossary-macos.md`, the index should be updated. However, `_glossary.md` does not list new terms by convention (checking line 18: the index already contains 36 terms). The executor should **add `[Entra ID SSO](#entra-id-sso)`** in alphabetical position within the index line, consistent with D-04's reasoning that "skipping it would leave the new terms undiscoverable." The insertion point is after `[ESP](#esp)` (E-SP) and before `[Firmware TPM (fTPM)](#firmware-tpm-ftpm)` (alphabetically: "Entra" < "ESP" is ambiguous — "En" < "ES" alphabetically, so **before `[ESP](#esp)`**).

Correct position: after `[Enrollment Time Grouping (ETG)](#enrollment-time-grouping-etg)` and before `[ESP](#esp)`.

---

### `docs/admin-setup-macos/03-configuration-profiles.md` — `## Extensible SSO` surgical edit

**Edit type:** Targeted prose replacement within lines 163-168 only. No headings touched.

**Anchor-stability constraint:** The file contains exactly **9 `#### In Intune admin center` headings** (at lines 29, 52, 67, 84, 100, 119, 136, 145, 159). Count must remain 9 after the edit. The `## Extensible SSO` section's own `#### In Intune admin center` heading (line 159) is NOT touched — only the prose lines 163-168 below it change.

---

#### Pattern: Current `## Extensible SSO` section body (lines 157-168 — the exact target)

```markdown
## Extensible SSO

#### In Intune admin center

Navigation: **Devices** > **Manage devices** > **Configuration** > **Create** > **New policy** > **Settings catalog** > **Authentication** > **Extensible Single Sign On (SSO)**

Enterprise SSO plug-in or Platform SSO (macOS 14+) for single sign-on across apps and web. Two configuration approaches:

- **SSO app extension (Redirect type):** For Microsoft Enterprise SSO plug-in -- enables SSO across Safari and apps using Microsoft identity
- **Platform SSO (macOS 14+):** Binds the macOS login password to Entra ID credentials; enables passwordless login via Touch ID or smart card

See official Microsoft documentation for full Platform SSO configuration, as setup requires specific Entra ID and device registration steps.
```

**Lines to change:** 163, 166, 168 (three content lines; line 159 heading and line 165 bullet are preserved with potential minor version-clause fix).

---

#### Pattern: How other sections close/cross-link (analog — `## FileVault`, lines 98-113)

```markdown
## FileVault (Disk Encryption)

#### In Intune admin center

Navigation: **Devices** > **Manage devices** > **Configuration** > **Create** > **New policy** > **Settings catalog** > **Full Disk Encryption**

Key settings:

- **Enable FileVault:** Enforces encryption on next logout.
- **Recovery key escrow to Intune:** Allows admin recovery key retrieval from Intune admin center.
- **Recovery key rotation:** Configurable rotation after each use.

> **What breaks if misconfigured:** [...]
> See: [Profile Not Applied](../l1-runbooks/12-macos-profile-not-applied.md)

**Critical:** FileVault has TWO surfaces -- a configuration profile (enforce via Settings Catalog) AND a compliance policy (verify enabled in [Compliance Policies](05-compliance-policy.md)). Always deploy both together.
```

Sections in this file close with either a `> **What breaks if misconfigured:**` callout or a `**Critical:**` note — they do NOT use `See official Microsoft documentation...` external fallback sentences. The Extensible SSO section's closing sentence must be replaced with an inline-code reference (D-06), which aligns with the file's convention of closing with in-suite cross-links.

---

#### Exact diff mandate for `## Extensible SSO` (lines 163-168)

**Line 163 — intro sentence (DS-5 #2, instance 1):**

Remove:
```
Enterprise SSO plug-in or Platform SSO (macOS 14+) for single sign-on across apps and web. Two configuration approaches:
```

Replace with (corrected version — macOS 13+, note 14 recommended, note Smart Card=14+ only):
```
Enterprise SSO plug-in or Platform SSO (macOS 13+, macOS 14 recommended) for single sign-on across apps and web. Two configuration approaches:
```

**Line 165 — SSO app extension bullet (DS-5 #2, may need version-clause check):**
The existing text has no version clause for the SSO app extension bullet — it is factually fine as written. Preserve as-is unless the executor finds a version inaccuracy:
```
- **SSO app extension (Redirect type):** For Microsoft Enterprise SSO plug-in -- enables SSO across Safari and apps using Microsoft identity
```

**Line 166 — Platform SSO bullet (DS-5 #1 + #2 + #3):**

Remove:
```
- **Platform SSO (macOS 14+):** Binds the macOS login password to Entra ID credentials; enables passwordless login via Touch ID or smart card
```

Replace with (three auth methods, no blanket password-binding claim, corrected version, configured via Settings Catalog):
```
- **Platform SSO (macOS 13+; macOS 14 recommended; Smart Card requires macOS 14+):** Registers the Mac with Entra ID and provides device-wide SSO. Three mutually exclusive authentication methods configured in Settings Catalog: Secure Enclave key/Platform Credential (recommended — local password unchanged), Password sync (Entra ID password replaces local password), and Smart Card (macOS 14+ only)
```

**Line 168 — closing sentence (SC2 / D-06 deferred link):**

Remove:
```
See official Microsoft documentation for full Platform SSO configuration, as setup requires specific Entra ID and device registration steps.
```

Replace with (D-06 inline-code pointer — NOT a markdown link):
```
Continue with Platform SSO setup in `07-platform-sso-setup.md` (added in the next documentation phase).
```

**Critical rule:** The replacement is a plain-text sentence with a code span, NOT `[link text](07-platform-sso-setup.md)`. The C13 audit gate validates markdown link targets, not code spans. Using a live link here would introduce a broken internal link and fail the BLOCKING C13 gate.

---

#### Count verification — `#### In Intune admin center` headings

Before edit count (scanning the file):
1. Line 29 — `## Wi-Fi` section
2. Line 52 — `## VPN` section
3. Line 67 — `## Email` section
4. Line 84 — `## Restrictions` section
5. Line 100 — `## FileVault` section
6. Line 119 — `## Firewall` section
7. Line 136 — `## Gatekeeper` section
8. Line 145 — `## Privacy Preferences (PPPC)` section
9. Line 159 — `## Extensible SSO` section

Count = 9. After the edit, still 9. No `####` headings are touched.

---

### `docs/macos-lifecycle/00-ade-lifecycle.md` — Stage 4 / 6 / 7 `### Watch Out For` bullet appends

**Edit type:** Append-only. One new bullet added to the END of the existing `### Watch Out For` subsection at each of Stages 4, 6, and 7.

**Structural invariant (line 23):** "Each of the seven stages below contains four subsections" — the four subsections are `### What the Admin Sees`, `### What Happens`, `### Behind the Scenes`, `### Watch Out For`. Adding a bullet inside the last subsection preserves the four-subsection count and moves no `### ` headings. No new `### ` headings may be introduced.

**Stage separator:** Each stage ends with `---` on its own line. The new bullet must be appended BEFORE the stage-ending `---`.

---

#### Pattern: `### Watch Out For` bullet format (analog — Stage 2, lines 152-155; Stage 5, lines 291-296)

**Stage 2 `### Watch Out For` bullets (lines 152-155):**

```markdown
### Watch Out For

- **Token expired.** The ADE token must be renewed annually. Expiration is silent -- no alerts are generated by default. Set a calendar reminder 30 days before expiration. Check the token status regularly in the Intune admin center.
- **Apple ID inaccessible.** The Apple ID used to create the token is no longer accessible (employee left, password lost). The token cannot be renewed without the original Apple ID. Use a Managed Apple ID tied to a shared organizational role.
- **ABM terms and conditions changed.** Apple occasionally updates ABM terms. If the new terms are not accepted in ABM, Apple suspends syncing until they are acknowledged.
- **Full sync rate limit hit.** If a full sync was triggered within the last 7 days, the full sync button is grayed out. Wait for the cooldown period, or rely on the incremental 24-hour auto-sync for newly assigned devices.
```

**Stage 5 `### Watch Out For` bullets (lines 291-296):**

```markdown
### Watch Out For

- **Device stuck on "Awaiting final configuration" indefinitely.** This is typically caused by:
  - A misconfigured or undeliverable configuration profile blocking the release signal. Check the Intune admin center for profile delivery errors.
  - APNs connectivity issues preventing policy delivery. Verify the device can reach `*.push.apple.com` on TCP 443, 2197, and 5223.
  - Token sync errors causing Intune to lose track of the device's enrollment state.
- **Await Configuration disabled when it should be enabled.** [...]
- **No Await Configuration on re-enrollment.** [...]
```

**Format rule:** `- **Bold label.** Explanation sentence(s).` New SSO-timing bullets must match this exact format. Inline code for command names uses backticks. Continuation lines (multi-line bullets) use `  - ` sub-bullets. No blockquotes, no callout blocks, no new headings.

---

#### Stage 4: Current `### Watch Out For` bullets (lines 244-250)

```markdown
### Watch Out For

- **Firewall blocks ADE endpoints.** The device cannot reach `deviceenrollment.apple.com`, `iprofiles.apple.com`, or `mdmenrollment.apple.com`. Setup Assistant proceeds without MDM enrollment. Verify that the network allows HTTPS traffic to all required Apple endpoints. See [Network Endpoints Reference](../reference/endpoints.md#macos-ade-endpoints) for the full list.
- **Device not in ABM or wrong MDM server.** The device contacts Apple's ADE service but no MDM server is associated with its serial number (Stage 1 was not completed). Setup Assistant runs in non-managed mode.
- **No enrollment profile assigned.** The device is in ABM and assigned to the correct MDM server, but no enrollment profile was created or assigned in Intune (Stage 3 incomplete). The device cannot enroll.
- **APNs certificate expired on Intune side.** The Apple Push Notification certificate in Intune has expired. New enrollments may fail or experience delayed policy delivery. Renew the APNs certificate in the Intune admin center under **Tenant administration > Connectors and tokens > Apple push notification certificate**.
```

**New bullet to append at the END (after line ~250, before the `---` separator):**

```markdown
- **Platform SSO extension profile must be pre-deployed for ADE enrollment-time registration.** If Platform SSO is configured for ADE enrollment-time registration (advanced path, macOS 26+ with `EnableRegistrationDuringSetup`), the SSO extension Settings Catalog profile must be assigned to a static device group and delivered before the device reaches the Entra credential screen in Setup Assistant. If Company Portal has not finished installing when the user first attempts to sign in, the user sees "Unable to sign in" with a registration error; tapping "Try Again" allows Company Portal to finish and registration to complete. For standard Platform SSO (post-enrollment), this timing constraint does not apply at Stage 4 — registration is triggered later by a "Registration required" notification at the desktop (Stage 7).
```

---

#### Stage 6: Current `### Watch Out For` bullets (lines 324-328)

```markdown
### Watch Out For

- **Company Portal not deployed.** The user cannot find the Company Portal app because it was not deployed as a required app in Intune. Deploy Company Portal via VPP/Apps and Books or as a standalone DMG/PKG app.
- **User sign-in blocked by Conditional Access.** A chicken-and-egg scenario: the user needs to sign into Company Portal to register the device, but a Conditional Access policy requires the device to be registered/compliant before allowing sign-in. Ensure Conditional Access policies exclude the Company Portal app or the device enrollment flow from their scope.
- **User skips sign-in and loses access.** The user dismisses or ignores the Company Portal sign-in prompt. They can use the device but cannot access email, Teams, SharePoint, or other Conditional Access-protected resources until they complete the sign-in. Communicate the sign-in requirement to users during device deployment.
```

**New bullet to append at the END (after line ~328, before the `---` separator):**

```markdown
- **Platform SSO Entra device registration completes at this stage (user-affinity enrollments only).** When Company Portal sign-in occurs (skipped in userless enrollment), Platform SSO device registration completes here: the WPJ (Workplace Join) key is written to the Secure Enclave and the device is registered with Entra ID, enabling Conditional Access device compliance evaluation. For devices enrolled without user affinity, this registration never occurs and those devices cannot participate in user-based Conditional Access policies. From August 2025, new registrations use Secure Enclave storage by default — use `app-sso platform -s` to verify registration (not `security find-certificate`, which returns false negatives for Secure Enclave-stored keys).
```

---

#### Stage 7: Current `### Watch Out For` bullets (lines 363-371)

```markdown
### Watch Out For

- **APNs certificate renewal missed.** The Apple Push Notification certificate in Intune expires annually. If it lapses, all MDM communication to all macOS (and iOS) devices stops -- not just new enrollments. Renew at **Tenant administration > Connectors and tokens > Apple push notification certificate**. This is separate from the ADE token renewal (Stage 2).
- **IME agent not installed or not running.** Shell scripts and certain app deployments fail if the Intune Management Extension agent at `/Library/Intune/Microsoft Intune Agent.app` is not installed or not running. Check with:
  ```bash
  pgrep -il "^IntuneMdm"
  ```
- **Confusion between MDM and IME channels.** Configuration profiles (Wi-Fi, VPN, restrictions) are delivered via the MDM channel (APNs). Shell scripts and DMG/PKG apps are delivered via the IME channel. Troubleshooting the wrong channel for the wrong payload type leads to dead ends.
- **FileVault not enabled.** If FileVault was not enforced during Await Configuration (Stage 5) and the compliance policy requires it, the device may be marked non-compliant after reaching the desktop. Users will see a prompt to enable FileVault.
- **Stale compliance state.** Compliance evaluation runs on a schedule, not in real-time. A device may appear compliant for a short period after a policy change before the next evaluation cycle flags it.
```

**New bullet to append at the END (after line ~372, before the `---` separator):**

```markdown
- **Platform SSO Secure Enclave key is destroyed by MDM-driven or FileVault-recovery password resets.** The macOS Platform SSO PRT renews automatically every 4 hours under normal operation. However, any password reset that bypasses the interactive macOS password-change UI — including MDM-forced password resets and FileVault recovery key resets — destroys the Secure Enclave-stored PSSO key; the key cannot be recovered. The user receives a new "Registration required" notification and must complete Platform SSO re-registration. Warn users and helpdesk staff that MDM password reset actions will require a follow-up PSSO re-registration step on affected devices.
```

---

## Shared Patterns

### Blockquote conventions across both glossary files

**Source:** `docs/_glossary-macos.md` lines 27-29, 34-35, 41-42, 48-49, 55-56, 67-68
**Apply to:** All new glossary entries in `_glossary-macos.md` and the new `### Entra ID SSO` entry in `_glossary.md`

Rules (verified from corpus):
1. `> **Windows equivalent:**` is always bold-label syntax inside a blockquote.
2. `> See also:` (no bold) is the last line of the same blockquote when a Windows-equivalent block exists — same `>` prefix, no blank line between them.
3. When no Windows-equivalent block exists, `> See also:` is a standalone blockquote separated from the definition paragraph by a blank line.
4. Cross-document links use relative paths: `_glossary.md#slug` (no leading `../`) — confirmed by existing cross-links at lines 28, 35, 42.

### Watch Out For bullet format

**Source:** `docs/macos-lifecycle/00-ade-lifecycle.md` lines 108-113, 152-155, 196-199, 244-250, 291-296, 324-328, 363-371
**Apply to:** All three Stage 4 / 6 / 7 appends

Rule: `- **Bold label ending in period.** Explanation in one or more sentences.` Sub-bullets use `  - ` (two-space indent). Inline code uses backticks. No blockquotes, callouts, or new headings inside `### Watch Out For`.

### Front matter date convention

**Source:** Both glossary files (lines 1-7 in each)
**Apply to:** `docs/_glossary-macos.md` only (fact-bearing content added; other files may not need date update per RESEARCH.md)

```yaml
last_verified: YYYY-MM-DD
review_by: YYYY-MM-DD
```

For Phase 75: `last_verified: 2026-06-20`, `review_by: 2026-09-20` (90-day PSSO review cadence).

### Deferred-link inline-code form (C13 gate safety)

**Source:** CONTEXT.md § Specific Ideas; `scripts/validation/v1.8-milestone-audit.mjs` lines 670-676 (15-entry allowlist)
**Apply to:** `docs/admin-setup-macos/03-configuration-profiles.md` closing sentence only

```
Continue with Platform SSO setup in `07-platform-sso-setup.md` (added in the next documentation phase).
```

The filename is a code span (backtick-wrapped), not a markdown link. C13 does not validate code spans as link targets. Using a markdown link `[...](07-platform-sso-setup.md)` would add a 16th allowlist entry and break the hard-coded `allowlist.length !== 15` assertion.

**Phase 76 mandatory task:** Convert the code span to a live markdown link `[Platform SSO setup](07-platform-sso-setup.md)` in the same commit that creates `07-platform-sso-setup.md`.

---

## No Analog Found

None. All four files are their own closest analogs — the edit shapes are established by existing content within each file.

---

## Anchor Contracts for Downstream Phases

The following slugs are established in Phase 75 and become link targets for Phases 76-81. These are contractual.

| Slug | File | Produced by heading |
|------|------|---------------------|
| `#platform-sso` | `docs/_glossary-macos.md` | `### Platform SSO` |
| `#secure-enclave` | `docs/_glossary-macos.md` | `### Secure Enclave` |
| `#enterprise-sso-plug-in` | `docs/_glossary-macos.md` | `### Enterprise SSO Plug-in` |
| `#entra-id-sso` | `docs/_glossary.md` | `### Entra ID SSO` |

No existing slugs are altered. Editing entry bodies and appending bullets creates no new anchors that downstream phases depend on.

---

## Metadata

**Analog search scope:** `docs/_glossary-macos.md`, `docs/_glossary.md`, `docs/admin-setup-macos/03-configuration-profiles.md`, `docs/macos-lifecycle/00-ade-lifecycle.md`
**Files read:** 4 (all four edit targets; CONTEXT.md and RESEARCH.md; CLAUDE.md)
**Pattern extraction date:** 2026-06-20
