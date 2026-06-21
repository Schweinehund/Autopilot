# Phase 75: Glossary, Lifecycle Foundation & Stub Correction - Research

**Researched:** 2026-06-20
**Domain:** macOS Platform SSO vocabulary, ADE lifecycle SSO timing, stub factual correction
**Confidence:** HIGH — all primary claims sourced from Microsoft Learn (updated 2026-05-18 to 2026-06-15) and Apple Platform Security Guide (June 2026)

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**D-01:** Medium-depth entries (Option 1C, modified). Each of the three macOS glossary terms gets a 3-5 sentence definition. Include a `> **Windows equivalent:**` blockquote for Platform SSO only. Secure Enclave↔TPM equivalence deliberately omitted (too lossy). Enterprise SSO Plug-in gets no Windows equivalent block.

**D-02:** See-also wiring (anchor-safe). Secure Enclave → `_glossary.md#tpm` with one-clause caveat ("analogous hardware root of trust; not bit-for-bit equivalent — Secure Enclave performs no TPM-2.0/DICE attestation"). Platform SSO and Enterprise SSO Plug-in cross-link each other and link to the new `_glossary.md#entra-id-sso`. Reciprocal back-pointer goes inside the existing `### TPM` entry body in `_glossary.md`, pointing to `_glossary-macos.md#secure-enclave`.

**D-03:** Create one short `### Entra ID SSO` term in `_glossary.md` (1-2 sentences, Windows PRT/WAM brokered SSO concept) with reciprocal see-also back to `_glossary-macos.md#enterprise-sso-plug-in`.

**D-04:** Update the `## Alphabetical Index` in `_glossary-macos.md`. Add three new terms with slugs: `platform-sso`, `secure-enclave`, `enterprise-sso-plug-in`. Insert in correct alphabetical position.

**D-05:** Targeted edit to `03-configuration-profiles.md` § Extensible SSO. Fix both DS-5 #2 version instances (lines ~163 and ~166). Rewrite Platform SSO bullet to remove "binds login password" blanket claim and three-method conflation. Delete the external Microsoft fallback sentence. Do NOT add/remove/rename any `#### In Intune admin center` heading.

**D-06:** Deferred link mechanism. Phase 75 writes the closing pointer as inline code — `` Continue with Platform SSO setup in `07-platform-sso-setup.md` (added in the next documentation phase). `` — not a markdown link. Phase 76 converts it to a live link in the same commit that creates the file.

**D-07:** Append SSO-timing notes to the end of the existing `### Watch Out For` subsection at Stages 4, 6, and 7 of `00-ade-lifecycle.md`. Match local bullet formatting. Stage 6 wording must acknowledge the userless-enrollment skip.

### Claude's Discretion

- Exact prose wording of glossary definitions, stub bullets, and stage notes — left to the planner/executor within the factual constraints above.
- Whether any new fact-bearing line gets `last_verified` / `review_by` front matter per the v1.9 90-day PSSO review cadence — apply where the researcher flags rapidly-changing facts.

### Deferred Ideas (OUT OF SCOPE)

- Convert the guide-07 code-span to a live markdown link (Phase 76)
- Capability-matrix Authentication section (Phase 79)
- Nav-hub integration (Phase 81)
- SPEC-wording correction for SSOREF-01 in REQUIREMENTS.md
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| PSSO-04 | Existing inaccurate Extensible SSO stub in `03-configuration-profiles.md` (lines ~157-168, 3 factual errors) is corrected and repointed to `07-platform-sso-setup.md` | DS-5 error analysis; corrected version facts for all three inaccuracies; deferred-link mechanism verified |
| SSOREF-01 | `_glossary-macos.md` gains a `## Authentication` section (Platform SSO, Secure Enclave, Enterprise SSO plug-in entries) with reciprocal `_glossary.md` see-also | Verified definitions; hardware scope; auth method distinctions; anchor slugs; Entra ID SSO Windows definition |
| SSOREF-03 | `00-ade-lifecycle.md` Stage 4/6/7 are surgically extended with PSSO timing/registration notes | SSO extension profile delivery timing; Company Portal device registration at Stage 6; PRT renewal/expiry at Stage 7 |
</phase_requirements>

---

## Summary

Phase 75 is a pure documentation edit phase: three targeted markdown file changes that establish the vocabulary and lifecycle foundation all subsequent v1.9 phases depend on. No new files are created; no code ships. The research task is to verify the factual content that the planner must put in those edits so they are accurate.

All implementation architecture decisions are locked in CONTEXT.md. The research below answers one question per deliverable: what do the exact words need to say to be factually correct?

**Key finding 1 — DS-5 corrections fully verified.** All three errors in the existing stub are confirmed against current Microsoft Learn documentation. The correct version statement is: Platform SSO framework available macOS 13.0+; macOS 14 recommended; Smart Card method requires macOS 14+. "Binds the macOS login password" is accurate only for the Password sync method. The three auth methods (Secure Enclave key, Password sync, Smart Card) are distinct and must not be conflated.

**Key finding 2 — Entra ID SSO definition grounded.** The `### Entra ID SSO` term (D-03) should describe: on Windows, users of Entra-joined/registered devices receive a Primary Refresh Token (PRT) brokered by Web Account Manager (WAM), which silently provides SSO across apps and browsers without re-entering credentials. This is the Windows analogue to macOS Platform SSO.

**Key finding 3 — ADE lifecycle SSO timing verified.** Stage 4 (Setup Assistant): the SSO extension profile must arrive and Company Portal must install before the first sign-in attempt; failure produces "Unable to sign in" error. Stage 6 (Company Portal sign-in): this is where Entra device registration completes and the WPJ key is written to Secure Enclave; skipped entirely in userless enrollment. Stage 7 (Desktop/Ongoing): the macOS PSSO PRT renews every 4 hours; a password reset that bypasses interactive macOS password change destroys the Secure Enclave key and requires PSSO re-registration.

**Primary recommendation:** Write the glossary entries, stub correction, and lifecycle notes using the exact facts documented in the Standard Content Facts section below. Tag any line referencing Company Portal version, macOS version floors, or WPJ/Secure Enclave storage with `last_verified` / `review_by` per the 90-day PSSO review cadence.

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Platform SSO glossary definition | Documentation (reference) | — | Vocabulary anchor for all v1.9 cross-links |
| Secure Enclave glossary definition | Documentation (reference) | — | Hardware-layer fact; no config surface |
| Enterprise SSO Plug-in glossary definition | Documentation (reference) | — | Umbrella product scoping for migration framing |
| Entra ID SSO term (Windows-side) | Documentation (reference) | — | Reciprocal cross-link target required by D-03 |
| Stub correction (03-configuration-profiles.md) | Documentation (admin setup) | Audit harness (C13 gate) | Factual fix; deferred-link is the C13 guard |
| ADE lifecycle SSO timing notes | Documentation (lifecycle) | — | Surgical append-only to existing Watch Out For sections |

---

## Standard Content Facts

This section is the primary research output. Every fact below is tagged with its source confidence level. The planner must use these facts when drafting the exact prose for each edit.

### Fact Group 1: Platform SSO — Definition and Auth Methods

**What Platform SSO is:**
Platform SSO (PSSO) is a macOS-native feature (macOS 13+) powered by the Microsoft Enterprise SSO plug-in that enables users to sign in to their Mac using their Microsoft Entra ID credentials and provides SSO across apps and browsers that use Entra ID for authentication. It registers the Mac with Entra ID, delivering a hardware-bound Primary Refresh Token (PRT) used for device-wide SSO. [VERIFIED: learn.microsoft.com/en-us/entra/identity/devices/macos-psso]

**The three authentication methods — exact distinctions:**

| Method | What it does to local password | macOS version | Hardware requirement | Microsoft recommendation |
|--------|-------------------------------|---------------|---------------------|--------------------------|
| Secure Enclave key (Platform Credential) | Local password unchanged — NOT synced or replaced | macOS 13+ | Requires Secure Enclave (T2 Intel or Apple Silicon) | RECOMMENDED |
| Password sync | Entra ID password replaces local account password; two passwords stay in sync | macOS 13+ | None | Second choice |
| Smart Card | Local password unchanged; user signs in with smart card/hardware token + PIN | macOS 14+ ONLY | External smart card or compatible token (e.g., Yubikey) | Third choice |

[VERIFIED: learn.microsoft.com/en-us/intune/device-configuration/settings-catalog/configure-platform-sso-macos]

**DS-5 error #1 — "binds the macOS login password" is only true for Password sync:**
The Secure Enclave key method explicitly does NOT bind, sync, or replace the local macOS login password. Quoting official docs: "Leaves the local account username and password as-is. These values aren't changed — this behavior is by design due to Apple's FileVault disk encryption, which uses the local password as the unlock key." The same behavior (local password unchanged) applies to the Smart Card method. Only the Password sync method causes "The Microsoft Entra ID password replaces the local account password, and the two passwords stay in sync." [VERIFIED: learn.microsoft.com/en-us/intune/device-configuration/settings-catalog/configure-platform-sso-macos]

**DS-5 error #2 — macOS version floor correction:**
- Platform SSO framework minimum: macOS 13.0 (Ventura)
- Recommended: macOS 14.0 (Sonoma) — "strongly recommended for the best experience"
- Smart Card method only: macOS 14.0+ (not supported on 13)
- Secure Enclave and Password methods: both work on macOS 13+

The stub's "macOS 14+" claim incorrectly implies the feature is unavailable on macOS 13 and omits the Smart-card-only restriction. [VERIFIED: learn.microsoft.com/en-us/entra/identity/devices/macos-psso and learn.microsoft.com/en-us/intune/device-configuration/settings-catalog/configure-platform-sso-macos]

**DS-5 error #3 — conflation of the three methods:**
The existing stub describes Platform SSO as a single feature that "enables passwordless login via Touch ID or smart card" — merging all three methods as if they are one behavior. The three methods are mutually exclusive choices configured in the Settings Catalog. [VERIFIED: learn.microsoft.com/en-us/intune/device-configuration/settings-catalog/configure-platform-sso-macos]

**Windows equivalent for Platform SSO (for D-01 blockquote):**
On Windows, Entra-joined devices receive a Primary Refresh Token brokered by Windows Hello for Business or the Web Account Manager, which silently provides SSO across apps, Edge, and Chrome. Platform SSO on macOS is conceptually similar to Windows Hello for Business: hardware-bound credentials, phishing-resistant MFA, device-wide SSO. [VERIFIED: learn.microsoft.com/en-us/entra/identity/devices/concept-primary-refresh-token; learn.microsoft.com/en-us/entra/identity/devices/macos-psso]

**Settings Catalog identifiers (for stub correction — these must be accurate):**
- Extension Identifier: `com.microsoft.CompanyPortalMac.ssoextension`
- Team Identifier: `UBF8T346G9`
- Registration Token: `{{DEVICEREGISTRATION}}`
- Payload type: `com.apple.extensiblesso`
- Type: Redirect
[VERIFIED: learn.microsoft.com/en-us/intune/device-configuration/settings-catalog/configure-platform-sso-macos]

**Assignment scope:** Assign to user groups (NOT device groups) for devices with user affinity. [VERIFIED: learn.microsoft.com/en-us/intune/device-configuration/settings-catalog/configure-platform-sso-macos]

---

### Fact Group 2: Secure Enclave — Definition and Hardware Scope

**What the Secure Enclave is:**
The Secure Enclave is a dedicated secure subsystem integrated into Apple's SoC, physically isolated from the main processor. It stores and manages cryptographic keys such that software — including the OS kernel — cannot extract the private key material. Keys are generated and used within the Secure Enclave; they never leave in plain-text form. [VERIFIED: support.apple.com/guide/security/the-secure-enclave-sec59b0b31ff/web]

**Hardware scope (which Macs have Secure Enclave):**
- All Apple Silicon Macs (M1, M2, M3, M4 and later — 2020+)
- Intel Macs with Apple T2 Security Chip: MacBook Pro 2018-2020, MacBook Air 2018-2020, Mac mini 2018, iMac 2020, Mac Pro 2019
- Pre-2018 Intel Macs (no T2 chip) do NOT have Secure Enclave — the Secure Enclave PSSO auth method cannot provision on these

Apple's own Security Guide scope statement: "All Mac computers with Apple silicon and those with the Apple T2 Security Chip." [VERIFIED: support.apple.com/guide/security/the-secure-enclave-sec59b0b31ff/web]

**Non-exportable key design — exact wording from Apple:**
"Not having a mechanism to transfer plain-text key data into or out of the Secure Enclave is fundamental to its security." Keys are hardware-bound to the specific device and cannot be exported, backed up, or transferred. [VERIFIED: support.apple.com/guide/security/the-secure-enclave-sec59b0b31ff/web; developer.apple.com/documentation/security/protecting-keys-with-the-secure-enclave]

**Relationship to Windows TPM — the caveat for D-02:**
Both the Secure Enclave (Apple) and TPM (Windows) are hardware-isolated security subsystems that store cryptographic keys for device identity and authentication. However, they are NOT equivalent:
- The Windows TPM implements the TCG TPM-2.0 specification and DICE attestation protocol
- The Secure Enclave does not implement TPM-2.0 or DICE; it uses Apple's own SEP architecture and attestation format
- The Secure Enclave performs Apple Device Attestation (not TPM attestation) for Platform SSO registration
The analogy is valid at the "hardware root of trust for non-exportable keys" level, but they are different security subsystems with different protocols and attestation models. The CONTEXT.md D-02 caveat text "analogous hardware root of trust; not bit-for-bit equivalent — Secure Enclave performs no TPM-2.0/DICE attestation" is factually accurate. [VERIFIED: support.apple.com/guide/security/the-secure-enclave-sec59b0b31ff/web; CITED: learn.microsoft.com/en-us/entra/identity/devices/concept-primary-refresh-token (TPM role on Windows)]

**WPJ key storage in Secure Enclave — timing and implication:**
From August 2025, the Secure Enclave is the default storage location for the Workplace Join (WPJ) certificate on new device registrations. Previously, the WPJ key was stored in the Login Keychain. This means: `security find-certificate` commands that check for WPJ presence in Keychain return false negatives for post-August-2025 devices. The `app-sso platform -s` command is the correct verification method. [VERIFIED: learn.microsoft.com/en-us/entra/identity-platform/apple-sso-plugin (Device Identity Key Storage section)]

**Secure Enclave and Platform SSO key generation:**
During Platform SSO registration, macOS generates Secure Enclave-backed cryptographic key pairs (one for device signing, one for device encryption). The public key references are shared with the SSO extension, which completes Entra device registration. The resulting hardware-bound PRT is used for device-wide SSO. [VERIFIED: learn.microsoft.com/en-us/entra/identity/devices/concept-primary-refresh-token (macOS tab)]

---

### Fact Group 3: Enterprise SSO Plug-in — Definition and Framing

**What the Microsoft Enterprise SSO plug-in for Apple devices is:**
The Microsoft Enterprise SSO plug-in is an Apple enterprise SSO extension delivered on macOS via the Intune Company Portal app. It is the umbrella product with two sub-features: Platform SSO (the modern mode, configured via Settings Catalog, macOS 13+) and the SSO app extension (the legacy mode, configured via Intune Device Features template). The plug-in provides SSO for Entra accounts across apps and browsers on macOS, iOS, and iPadOS. [VERIFIED: learn.microsoft.com/en-us/entra/identity-platform/apple-sso-plugin]

**Kerberos vs. Redirect type:**
The Microsoft Enterprise SSO plug-in uses the **Redirect** type in Apple's extensible SSO framework. (The Kerberos SSO extension — used for on-premises AD Kerberos — is a separate Apple-native extension with different extension identifiers; it coexists with PSSO but is a distinct product.) [VERIFIED: learn.microsoft.com/en-us/intune/device-configuration/settings-catalog/configure-platform-sso-macos; learn.microsoft.com/en-us/entra/identity/devices/macos-psso]

**Product name hierarchy (must be enforced in glossary):**

| Term | What it is |
|------|-----------|
| Microsoft Enterprise SSO plug-in for Apple devices | Umbrella product; installed via Company Portal |
| Platform SSO | Modern sub-feature (macOS 13+, recommended 14+); OS-level Entra ID login + SSO |
| SSO app extension | Legacy sub-feature; app/browser SSO without OS-level login integration |
| Kerberos SSO extension | Separate Apple-native extension for on-premises AD Kerberos; coexists with PSSO |

[VERIFIED: learn.microsoft.com/en-us/entra/identity-platform/apple-sso-plugin; learn.microsoft.com/en-us/entra/identity/devices/macos-psso]

**Legacy → Platform SSO migration framing:**
The SSO app extension was the previous approach. Platform SSO is the current recommended approach. Key migration caution: having both the old Device Features SSO app extension profile AND a new Settings Catalog Platform SSO policy simultaneously causes Error 10002 (multiple SSOe payloads conflict). Migration sequence: assign PSSO to pilot → validate → THEN unassign legacy profile. [VERIFIED: learn.microsoft.com/en-us/intune/device-configuration/settings-catalog/configure-platform-sso-macos (Common Platform SSO errors section)]

---

### Fact Group 4: Entra ID SSO — Windows-Side Definition (for D-03)

**What to put in the `### Entra ID SSO` entry in `_glossary.md`:**

Entra ID SSO on Windows is brokered by the **Web Account Manager (WAM)**, a system-level token broker on Windows 10+. When a user signs in to an Entra-joined or Entra-registered Windows device, WAM obtains a **Primary Refresh Token (PRT)** — a hardware-bound credential (backed by the device's TPM when available) that is silently presented to apps and browsers to provide SSO across Microsoft 365, Azure, and other Entra-authenticated resources without requiring the user to re-enter credentials.

The PRT is issued at device sign-in, valid for 90 days with continuous renewal, and carries device and user claims used by Conditional Access to evaluate compliance before granting resource access. Microsoft Edge uses the PRT natively; Chrome uses the Microsoft Single Sign On extension; Firefox uses the MicrosoftEntraSSO policy. [VERIFIED: learn.microsoft.com/en-us/entra/identity/devices/concept-primary-refresh-token]

**Recommended 1-2 sentence definition for the glossary entry:**

"Microsoft Entra ID single sign-on on Windows devices: when a user signs in to an Entra-joined or Entra-registered device, the Web Account Manager (WAM) obtains a Primary Refresh Token (PRT) that silently authenticates the user to apps and browsers without requiring repeated credential entry. The PRT is hardware-bound (via TPM when available) and carries device compliance claims evaluated by Conditional Access policies."

**Reciprocal see-also:** `_glossary-macos.md#enterprise-sso-plug-in` (per D-03, because Enterprise SSO Plug-in is the macOS analogue of the Windows Entra ID SSO mechanism).

---

### Fact Group 5: ADE Lifecycle SSO Timing — Stages 4, 6, 7

**Stage 4 — Setup Assistant SSO timing:**

The SSO extension profile (Settings Catalog Platform SSO policy) must be delivered to the device — and the Company Portal must finish installing — *before* the user's first sign-in attempt during Setup Assistant. If the SSO extension profile arrives but Company Portal is still downloading, the user sees an "Unable to sign in — There was an issue with the extension while registering your account for single sign-on" error. The user can tap "Try again" until Company Portal finishes.

For standard (post-enrollment) PSSO registration: the SSO extension policy is delivered during Await Configuration (Stage 5), and registration is triggered by a "Registration required" notification that appears at the desktop (Stage 7). The Stage 4 timing constraint applies specifically to the ADE-during-Setup-Assistant path (`EnableRegistrationDuringSetup`, macOS 26+ only).

**Wording guidance for Stage 4 Watch Out For note:** The note should flag that when Platform SSO is configured for ADE enrollment-time registration (the advanced path), the SSO extension profile must be delivered before the user reaches the Entra credential screen in Setup Assistant; if Company Portal hasn't finished installing, the user will see a registration error. For standard PSSO (post-enrollment), this timing issue does not apply at Stage 4 — registration happens later.

[VERIFIED: learn.microsoft.com/en-us/intune/device-configuration/settings-catalog/configure-platform-sso-during-enrollment]

**Stage 6 — Company Portal Sign-In and Entra device registration:**

When the user signs in to Company Portal at Stage 6, this is where Entra device registration completes and the WPJ (Workplace Join) key is written to the Secure Enclave. From August 2025, new registrations use Secure Enclave storage by default (not Login Keychain). This enables Conditional Access device compliance evaluation.

Stage 6 is skipped entirely in userless/device-affinity-less enrollment (devices without user affinity are enrolled in Intune MDM but never registered with Entra ID and cannot participate in user-based Conditional Access). The CONTEXT.md D-07 wording guidance — "When Company Portal sign-in occurs (skipped in userless enrollment), Platform SSO device registration completes here..." — is factually accurate. [VERIFIED: learn.microsoft.com/en-us/intune/device-configuration/settings-catalog/configure-platform-sso-macos; learn.microsoft.com/en-us/entra/identity-platform/apple-sso-plugin (Device Identity Key Storage section)]

**Stage 7 — Desktop/Ongoing SSO key management:**

Two ongoing SSO management facts relevant to Watch Out For:

1. **PSSO PRT renewal:** The macOS PSSO Primary Refresh Token (PRT) renews every 4 hours (or sooner if tokens are missing/expired). This is automatic and silent. [VERIFIED: learn.microsoft.com/en-us/entra/identity/devices/concept-primary-refresh-token (macOS tab)]

2. **Secure Enclave key loss on password reset:** "Secure Enclave keys are protected by your local account password, and password resets that occur without providing this password reset the Secure Enclave, rendering keys previously stored for this account inaccessible." An MDM-driven password reset or FileVault recovery key reset destroys the Secure Enclave PSSO key. The device must re-register PSSO (user receives a new "Registration required" notification). [CITED: support.apple.com/guide/deployment/platform-sso-for-macos-dep7bbb05313/web; VERIFIED conceptually at: learn.microsoft.com/en-us/intune/device-configuration/settings-catalog/configure-platform-sso-macos (Secure Enclave tab description)]

**Wording guidance for Stage 7 Watch Out For note:** Flag that PSSO re-registration is required after any password reset that bypasses the interactive macOS password-change UI (MDM-forced reset, FileVault recovery) — the Secure Enclave key is destroyed and cannot be recovered. The user will receive a new "Registration required" notification.

---

## Architecture Patterns

### Recommended Project Structure (for this phase's edits)

```
docs/
├── _glossary-macos.md       # Add ## Authentication section + 3 entries + Alphabetical Index + Version History row
├── _glossary.md             # Add ### Entra ID SSO; add back-pointer to existing ### TPM body
├── admin-setup-macos/
│   └── 03-configuration-profiles.md   # Targeted edit: ## Extensible SSO section only
└── macos-lifecycle/
    └── 00-ade-lifecycle.md  # Append-only: Stage 4 Watch Out For + Stage 6 Watch Out For + Stage 7 Watch Out For
```

### Pattern 1: Glossary Entry Shape (from existing corpus)

The MAM-WE entry in `_glossary-macos.md` establishes the template for medium-depth entries:
- Body: 3-5 sentences of accurate definition
- Blockquote `> **Windows equivalent:**` (for Platform SSO only per D-01)
- Blockquote `> See also:` with cross-document anchor links

The Phase 59 (CLEAN-08) pattern established: `> See also:` lines are APPENDED INSIDE existing `> **Windows equivalent:**` blockquotes — not added as a separate blockquote below.

[ASSUMED: Phase 59 precedent from existing corpus read, not re-verified in this session]

### Pattern 2: Watch Out For Bullet Format

All seven Stage `### Watch Out For` sections in `00-ade-lifecycle.md` use bullet lists with `- **Bold label.** Explanation.` format. The Stage 4, 6, and 7 notes must match this exact format. [VERIFIED: direct file read of 00-ade-lifecycle.md]

### Anchor Slugs (contracts for downstream phases)

The following slugs are established in this phase and become link targets for Phases 76-81:

| Term | File | Anchor | Computed from |
|------|------|--------|---------------|
| Platform SSO | `_glossary-macos.md` | `#platform-sso` | `### Platform SSO` heading |
| Secure Enclave | `_glossary-macos.md` | `#secure-enclave` | `### Secure Enclave` heading |
| Enterprise SSO Plug-in | `_glossary-macos.md` | `#enterprise-sso-plug-in` | `### Enterprise SSO Plug-in` heading |
| Entra ID SSO | `_glossary.md` | `#entra-id-sso` | `### Entra ID SSO` heading |

These are deterministic GitHub markdown anchor slugs: lowercase, spaces→hyphens, parentheses stripped. [VERIFIED: D-04 decision; confirmed by existing corpus anchor patterns]

### Anti-Patterns to Avoid

- **Adding a fifth structural element to lifecycle stages.** The file documents "four subsections" per stage at line 23. The D-07 decision (append to existing `### Watch Out For`) is the safe path. Do NOT introduce a new `### SSO Notes` or callout block.
- **Editing any `#### In Intune admin center` subheading in 03-configuration-profiles.md.** The file has 9 duplicate headings whose position-numbered duplicate anchors are referenced by the audit harness. Count must stay at 9.
- **Creating a markdown link to `07-platform-sso-setup.md`** — that file does not exist until Phase 76. Use inline code only (D-06).
- **Claiming Secure Enclave is a direct TPM equivalent.** The caveat wording from D-02 is required.
- **Applying "binds the macOS login password" to Platform SSO in general.** It is true ONLY for the Password sync method.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Anchor slugs for new headings | Manually compute anchors | Trust GitHub markdown heading-slug algorithm: lowercase, spaces→hyphens, punctuation stripped | The algorithm is deterministic; manual computation risks typos in cross-links |
| Version floor facts | Write from memory | Use the Standard Content Facts table above | All version facts verified against Microsoft Learn 2026-05-18 docs |
| macOS auth method settings key names | Write from intuition | `UserSecureEnclaveKey` / `Password` / `SmartCard` (verified values) | Incorrect key values cause Error 10001 in production deployments |

---

## Common Pitfalls

### Pitfall 1: Conflating Platform SSO with the SSO App Extension
**What goes wrong:** An executor treats "Platform SSO" and "SSO app extension" as synonyms. The glossary entry then defines Platform SSO as "the SSO app extension" without clarifying that Platform SSO is a *sub-feature* of the Enterprise SSO Plug-in.
**Why it happens:** Microsoft documentation uses "Microsoft Enterprise SSO plug-in" as both the umbrella and sometimes colloquially to mean the legacy SSO app extension.
**How to avoid:** Use the product name hierarchy table in Fact Group 3. Always distinguish: umbrella product (Enterprise SSO plug-in) → modern sub-feature (Platform SSO) → legacy sub-feature (SSO app extension).
**Warning signs:** A definition that says Platform SSO is configured via "Device Features template" (that's the legacy SSO app extension path).

### Pitfall 2: Stating Platform SSO requires macOS 14 for all features
**What goes wrong:** A bullet says "Platform SSO (macOS 14+)" without qualification, causing admins to think macOS 13 devices are incompatible.
**Why it happens:** macOS 14 is the RECOMMENDED floor and is required for the Smart Card method. The framework itself works on macOS 13.
**How to avoid:** Use the version table from Fact Group 1. State: "available macOS 13+; macOS 14 recommended; Smart Card requires macOS 14+."
**Warning signs:** Either an unqualified "macOS 14+" or a missing Smart Card version gate callout.

### Pitfall 3: Asserting Secure Enclave ≡ TPM (bit-for-bit equivalence)
**What goes wrong:** The see-also in the Secure Enclave glossary entry says "equivalent to TPM" without the caveat.
**Why it happens:** Both are hardware security modules for key storage. The analogy is useful but the protocols differ.
**How to avoid:** The D-02 caveat is mandatory: "analogous hardware root of trust; not bit-for-bit equivalent — Secure Enclave performs no TPM-2.0/DICE attestation."
**Warning signs:** The see-also link is bare without a parenthetical clarification.

### Pitfall 4: Anchor shift in 03-configuration-profiles.md
**What goes wrong:** An executor renames or adds an `#### In Intune admin center` subheading, shifting the position-numbered duplicate anchors that the audit harness references.
**Why it happens:** The D-05 fix requires prose changes, and it's tempting to restructure headings for clarity.
**How to avoid:** ONLY edit prose inside the `## Extensible SSO` section body. The `#### In Intune admin center` heading count MUST remain at 9.
**Warning signs:** The diff shows any `####` heading added or removed.

### Pitfall 5: Creating a markdown link to guide 07 before it exists
**What goes wrong:** An executor writes `[Platform SSO setup](07-platform-sso-setup.md)` as the closing pointer, creating a broken internal link that fails the C13 gate.
**Why it happens:** Natural instinct is to create an active link.
**How to avoid:** Inline code only (D-06): `` `07-platform-sso-setup.md` `` in running text, not a markdown link. The planner must add a Phase-76 task to convert it.
**Warning signs:** Any `[...](...07-platform-sso-setup.md...)` syntax in the diff.

### Pitfall 6: Disrupting the "four subsections" invariant in 00-ade-lifecycle.md
**What goes wrong:** An executor adds a fifth `###`-level subsection within a lifecycle stage, violating the structure invariant documented at line 23.
**Why it happens:** A "Platform SSO Notes" subsection feels cleaner than a bullet appended to Watch Out For.
**How to avoid:** Always append to the LAST BULLET of the existing `### Watch Out For` list. The D-07 decision exists to prevent this.
**Warning signs:** The diff shows a new `### ` heading inside a stage block.

---

## Code Examples

### Correct stub prose for 03-configuration-profiles.md § Extensible SSO (after DS-5 fix)

The current stub (lines 163-168) reads:
```
Enterprise SSO plug-in or Platform SSO (macOS 14+) for single sign-on across apps and web. Two configuration approaches:

- **SSO app extension (Redirect type):** For Microsoft Enterprise SSO plug-in -- enables SSO across Safari and apps using Microsoft identity
- **Platform SSO (macOS 14+):** Binds the macOS login password to Entra ID credentials; enables passwordless login via Touch ID or smart card

See official Microsoft documentation for full Platform SSO configuration, as setup requires specific Entra ID and device registration steps.
```

After the DS-5 fix, the content should convey (exact prose left to planner/executor, but must include ALL of these elements):
- Line ~163: correct version statement — "macOS 13+" (not "macOS 14+") with a "macOS 14 recommended" note; Smart Card is macOS 14+ only
- Line ~165 (SSO app extension bullet): may remain largely intact if its version clause is correct; verify it does not state "macOS 14+" for the SSO app extension itself (the SSO app extension works on macOS 10.15+)
- Line ~166 (Platform SSO bullet): rewrite to NOT say "binds the macOS login password"; instead describe the three available auth methods (Secure Enclave key [recommended], Password sync, Smart Card); mention all three are configured in Settings Catalog
- Replace the final "See official Microsoft documentation..." sentence with inline-code pointer (D-06 mechanism)

### Closing pointer inline code form (D-06 exact form)
```
Continue with Platform SSO setup in `07-platform-sso-setup.md` (added in the next documentation phase).
```

Source: CONTEXT.md § Specific Ideas — confirmed factually valid because C13 does not validate inline-code spans.

### Alphabetical Index insertion positions in _glossary-macos.md

Current index (from file read):
```
[ABM](#abm) | [ABM Token](#abm-token) | [Account-Driven User Enrollment](#account-driven-user-enrollment) | [ADE](#ade) | [APNs](#apns) | [Await Configuration](#await-configuration) | [Jailbreak Detection](#jailbreak-detection) | [MAM-WE](#mam-we) | [Setup Assistant](#setup-assistant) | [Supervision](#supervision) | [VPP](#vpp)
```

New terms insertion positions:
- `Enterprise SSO Plug-in` → after `ADE` (E comes after AD alphabetically) — actually: ADE, APNs, Await Configuration, then **Enterprise SSO Plug-in** (E)
- `Platform SSO` → after `MAM-WE`, before `Setup Assistant` (P)
- `Secure Enclave` → after `Platform SSO`, before `Setup Assistant` (S, but Se before Se...wait: Platform SSO is P, Secure Enclave is S — after Setup Assistant? No: Sec < Set alphabetically)

Correct alphabetical ordering of full merged list:
ABM | ABM Token | Account-Driven User Enrollment | ADE | APNs | Await Configuration | **Enterprise SSO Plug-in** | Jailbreak Detection | MAM-WE | **Platform SSO** | **Secure Enclave** | Setup Assistant | Supervision | VPP

[VERIFIED: alphabetical order; ASSUMED: GitHub anchor slug `#enterprise-sso-plug-in` will resolve from `### Enterprise SSO Plug-in` heading — consistent with existing slug patterns in the file]

### Entra ID SSO term location in _glossary.md

Current Security section neighbors (from file read, lines ~111-168):
- `### Secure Boot` (line ~156)
- `### SCP` (line ~162)
- `### Selective wipe` (line ~164)

The `### Entra ID SSO` term is to be placed in the Security section (per CONTEXT.md — neighbors `### TPM`, `### TPM attestation`, `### Secure Boot`). Alphabetically "Entra" falls before "Secure Boot" and after nothing that starts with E in that section currently. The planner should verify the exact insertion point by reading the Security section header order at authoring time. [ASSUMED: exact line position may vary; planner must read live file state]

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| SSO app extension (Device Features template) | Platform SSO (Settings Catalog) | macOS 13 GA (2022); recommended macOS 14 (2023) | Legacy approach still works but is superseded; both simultaneously = Error 10002 |
| WPJ key in Login Keychain | WPJ key in Secure Enclave | Default for new registrations from August 2025 | `security find-certificate` commands return false negatives; use `app-sso platform -s` |
| Per-user deployment | Assign Platform SSO to user groups (NOT device groups) | Current requirement | Assigning to device groups on user-affinity devices can cause Company Portal to bypass Entra device registration |
| macOS 13 only field: `Authentication Method (Deprecated)` | macOS 14+ field: `Platform SSO > Authentication Method` | macOS 14 GA (2023) | Mixed fleets MUST configure BOTH fields in the same policy (Error 10001 if only one is set) |

**Deprecated/outdated:**
- "SSO app extension" via Device Features template: superseded by Platform SSO via Settings Catalog; keep both simultaneously = Error 10002
- `security find-certificate` for WPJ verification: returns false negatives since WPJ moved to Secure Enclave (August 2025); replaced by `app-sso platform -s`

---

## Front Matter / Review Cadence

Per SUMMARY.md lines 182-188, the following fact-bearing content added in Phase 75 warrants `last_verified` / `review_by` front matter with a 90-day review cycle:

| File edited | Fact-bearing lines that need review tagging | Rationale |
|-------------|---------------------------------------------|-----------|
| `_glossary-macos.md` | macOS version floor statements (13+, 14 recommended, Smart Card = 14+) | Platform SSO version gates may change as Apple releases new OS |
| `_glossary-macos.md` | WPJ key storage in Secure Enclave (default from August 2025) | Rollout timing; Secure Enclave default confirmed but may have exceptions |
| `03-configuration-profiles.md` | Version floor correction in Extensible SSO section | Same as above |
| `00-ade-lifecycle.md` | Stage 7 Secure Enclave key loss / re-registration note | Platform SSO re-registration behavior may change in future OS releases |

The files `_glossary-macos.md`, `_glossary.md`, `03-configuration-profiles.md`, and `00-ade-lifecycle.md` each have existing `last_verified` / `review_by` front matter. The planner should evaluate whether Phase 75 edits are significant enough to update those dates. Given that the glossary terms and stub correction add new PSSO-specific content, updating `last_verified: 2026-06-20` and `review_by: 2026-09-20` (90 days) in `_glossary-macos.md` is appropriate. The other three files may not require date updates unless the executor changes are judged materially fact-bearing at the file level.

---

## Package Legitimacy Audit

Not applicable. Phase 75 is a pure documentation edit phase — no packages are installed.

---

## Runtime State Inventory

Not applicable. Phase 75 is not a rename, refactor, or migration phase. It adds new content and corrects existing prose; it does not rename identifiers, strings, or symbols that would have runtime state.

---

## Environment Availability

Phase 75 is purely markdown edits to existing files. No external tools, services, runtimes, or CLIs are required beyond a text editor and git. Step 2.6 SKIPPED (no external dependencies identified).

---

## Validation Architecture

`nyquist_validation` is explicitly `false` in `.planning/config.json`. Section omitted per instructions.

---

## Security Domain

Phase 75 adds only documentation content — no code, no endpoints, no auth flows implemented. The security domain section would apply to Phase 76 (admin setup guide implementation decisions) and beyond. OMITTED for Phase 75.

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | The Phase 59 (CLEAN-08) pattern established that `> See also:` lines are appended INSIDE existing `> **Windows equivalent:**` blockquotes (not as a separate blockquote below) | Architecture Patterns — Pattern 1 | If wrong: the executor may add a second blockquote below the Windows equivalent blockquote, creating a visual inconsistency with other entries. Planner should verify by reading MAM-WE entry format. |
| A2 | GitHub markdown anchor slug for `### Enterprise SSO Plug-in` resolves to `#enterprise-sso-plug-in` (parentheses stripped, spaces→hyphens) | Code Examples — Alphabetical Index | If wrong: all downstream cross-links using this anchor fail silently. Planner should verify slug resolution at authoring time. |
| A3 | Exact line position of `### Entra ID SSO` insertion point in `_glossary.md` Security section | Code Examples — Entra ID SSO location | If wrong: the term may be alphabetically misplaced. Planner must read live Security section order at authoring time. |
| A4 | Stage 7 Secure Enclave key loss on password reset: the behavior described (MDM-driven reset destroys SE key, triggering re-registration) applies to PSSO Secure Enclave method specifically | Fact Group 5 — Stage 7 | If wrong: the Watch Out For note may alarm admins incorrectly. Risk LOW — behavior confirmed from Apple PSSO deployment guide via WebSearch citation; conceptually consistent with Microsoft's statement that SE keys are "protected by local account password." |

**Confidence note on A4:** The Apple Platform SSO deployment guide (support.apple.com/guide/deployment/dep7bbb05313/web) was found via WebSearch but not deeply fetched. The claim is tagged [CITED] rather than [VERIFIED] for the specific Secure Enclave password-reset behavior. The conceptual mechanism is HIGH confidence; the exact wording of the Watch Out For note should be reviewed against that Apple guide at authoring time.

---

## Open Questions

1. **Stage 4 Watch Out For — standard vs. ADE-enrollment-time PSSO**
   - What we know: The SSO extension profile timing constraint applies to the ADE-during-Setup-Assistant path (macOS 26+, `EnableRegistrationDuringSetup`, Phase 76 PSSO-12 scope). For standard PSSO (post-enrollment), the "Registration required" notification appears at the desktop.
   - What's unclear: Whether the Stage 4 Watch Out For note should mention the ADE-during-Setup-Assistant path at all (it is Phase 76 territory) or limit itself to a general note about the SSO extension profile needing to be delivered before first sign-in.
   - Recommendation: Keep the Stage 4 note narrowly scoped. Note that if Platform SSO is configured for ADE enrollment-time registration (advanced, macOS 26+ only), the SSO extension profile must be deployed to the static assignment group before the device enrolls. This is forward-compatible with Phase 76's PSSO-12 content without requiring guide 07 to exist yet.

2. **`_glossary.md` Security section ordering**
   - What we know: The Security section contains Secure Boot, SCP, Selective wipe, TPM, TPM attestation (all confirmed by file read). Entra ID SSO needs to be inserted alphabetically (E before S).
   - What's unclear: Whether there are any E-prefixed terms currently in the Security section that would affect insertion position.
   - Recommendation: Planner should read the Security section live and insert `### Entra ID SSO` in alphabetical position relative to actual current content.

---

## Sources

### Primary (HIGH confidence)

- [learn.microsoft.com/en-us/entra/identity/devices/macos-psso](https://learn.microsoft.com/en-us/entra/identity/devices/macos-psso) — Platform SSO overview; auth methods; macOS version requirements; PRT on macOS. Updated 2026-06-15.
- [learn.microsoft.com/en-us/intune/device-configuration/settings-catalog/configure-platform-sso-macos](https://learn.microsoft.com/en-us/intune/device-configuration/settings-catalog/configure-platform-sso-macos) — Step-by-step configuration; auth method comparison table; Settings Catalog identifiers; Error 10001/10002; assignment requirements. Updated 2026-05-18.
- [learn.microsoft.com/en-us/entra/identity-platform/apple-sso-plugin](https://learn.microsoft.com/en-us/entra/identity-platform/apple-sso-plugin) — Enterprise SSO plug-in; WPJ key storage migration to Secure Enclave (August 2025). Updated 2026-06-15.
- [learn.microsoft.com/en-us/entra/identity/devices/concept-primary-refresh-token](https://learn.microsoft.com/en-us/entra/identity/devices/concept-primary-refresh-token) — PRT definition; WAM; macOS PRT (4-hour renewal); Windows TPM role. Updated 2026-02-26.
- [learn.microsoft.com/en-us/intune/device-configuration/settings-catalog/configure-platform-sso-during-enrollment](https://learn.microsoft.com/en-us/intune/device-configuration/settings-catalog/configure-platform-sso-during-enrollment) — ADE enrollment-time PSSO; Stage 4 timing; three required policies; static groups requirement. Updated 2026-06-01.
- [support.apple.com/guide/security/the-secure-enclave-sec59b0b31ff/web](https://support.apple.com/guide/security/the-secure-enclave-sec59b0b31ff/web) — Secure Enclave definition; hardware scope; non-exportable key design.

### Secondary (MEDIUM confidence)

- [support.apple.com/guide/deployment/platform-sso-for-macos-dep7bbb05313/web](https://support.apple.com/guide/deployment/platform-sso-for-macos-dep7bbb05313/web) — macOS PSSO deployment guide (found via WebSearch; Secure Enclave key loss on password reset behavior — not deeply fetched)
- WebSearch results confirming WPJ key storage in Secure Enclave from community sources (Jamf, intuneirl.com) — corroborates the Microsoft Learn primary source

### Tertiary (LOW confidence)

- None. All factual claims in the Standard Content Facts section are from HIGH or MEDIUM confidence sources.

---

## Project Constraints (from CLAUDE.md)

The CLAUDE.md for this project is a Windows Autopilot Troubleshooter project — the `.planning/` suite is a documentation project layered on top of it. The CLAUDE.md directives (PowerShell, Python FastAPI, TypeScript React) govern the main codebase and do not apply to the `.planning/` documentation work. No CLAUDE.md directives are violated by Phase 75's markdown-only edits.

---

## Metadata

**Confidence breakdown:**
- Standard Content Facts (auth methods, version floors, hardware scope): HIGH — sourced from Microsoft Learn docs updated within 30 days
- ADE lifecycle SSO timing (Stage 4/6/7): HIGH — sourced from Microsoft Learn; Stage 7 Secure Enclave key loss tagged MEDIUM (CITED but not deeply fetched from Apple source)
- Anchor slugs: HIGH for known slugs; ASSUMED for computed slugs not yet verified in live file
- Entra ID SSO definition: HIGH — sourced from PRT concept article
- DS-5 error corrections: HIGH — directly verified against current Microsoft Learn auth method docs

**Research date:** 2026-06-20
**Valid until:** 2026-09-20 (90-day PSSO review cycle; Platform SSO ecosystem is rapidly evolving)
