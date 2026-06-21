# Phase 77: Auth Methods Deep-Dive — Pattern Map

**Mapped:** 2026-06-21
**Files analyzed:** 2 (1 create, 1 edit)
**Analogs found:** 2 / 2

---

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|-------------------|------|-----------|----------------|---------------|
| `docs/admin-setup-macos/08-auth-methods-deep-dive.md` | documentation / reference guide | method-per-section with corpus skeleton tail | `docs/admin-setup-macos/07-platform-sso-setup.md` (structure, callouts, front matter, tail) + `docs/admin-setup-macos/02-enrollment-profile.md` (skeleton exemplar, Version History) | exact (same corpus, same guide series, same 90-day front-matter pattern) |
| `docs/admin-setup-macos/00-overview.md` | documentation / navigation hub | atomic line edit (code-span → live link) | `docs/admin-setup-macos/00-overview.md` line 47 itself — self-referential edit; Phase-76 D-02 mechanism | exact (identical conversion pattern from same file) |

---

## Pattern Assignments

### `docs/admin-setup-macos/08-auth-methods-deep-dive.md` (new reference guide)

**Primary analog:** `docs/admin-setup-macos/07-platform-sso-setup.md`
**Secondary analog:** `docs/admin-setup-macos/02-enrollment-profile.md`
**Failure-table shape source:** `docs/admin-setup-macos/06-config-failures.md`

---

#### Front-Matter Block (copy exactly from `07-platform-sso-setup.md` lines 1–7, update dates)

```yaml
---
last_verified: 2026-06-21
review_by: 2026-09-21
applies_to: ADE
audience: admin
platform: macOS
---
```

All five fields are corpus-standard for this guide series. `applies_to: ADE` is invariant across guides 01–07. `last_verified` and `review_by` follow the 90-day PSSO cadence (DS-2); set on creation date 2026-06-21, expires 2026-09-21. Guide 08 carries rapidly-changing facts (CP 2504 / macOS 14.6 Touch-ID gate, macOS 15.0–15.2 re-registration loop fix) that make the 90-day annotation mandatory.

---

#### Platform Gate Banner (copy pattern from `07-platform-sso-setup.md` lines 9–11, adapt target)

Analog:
```markdown
> **Platform gate:** This guide covers macOS Platform SSO configuration via Microsoft Intune.
> For Windows Autopilot setup, see [Windows Admin Setup Guides](../admin-setup-apv1/00-overview.md).
> For macOS provisioning terminology, see the [macOS Glossary](../_glossary-macos.md).
```

Guide 08 adaptation (same three-line structure, swap the second line target):
```markdown
> **Platform gate:** This guide covers macOS Platform SSO authentication methods in depth.
> For the Platform SSO setup walk-through, see [Platform SSO Setup](07-platform-sso-setup.md).
> For macOS provisioning terminology, see the [macOS Glossary](../_glossary-macos.md).
```

Note: The second line must link back to `07-platform-sso-setup.md` — this satisfies the ROADMAP:451 depends-on requirement and the `## See Also` companion link (the banner and See Also independently satisfy the same cross-link contract).

---

#### Hard-Bordered Callout Pattern (from `07-platform-sso-setup.md` lines 27–35)

The corpus uses standard Markdown blockquote syntax. Guide 07 demonstrates the "hard-bordered" callout used for D-03 blockers and point-of-use warnings. Copy this exact syntax:

```markdown
> **Before You Deploy — Resolve These First:**
>
> The following issues cause Platform SSO registration to fail silently — no error is displayed, and the registration flow simply stalls or is blocked. Resolve all three before configuring the Settings Catalog policy.
>
> - **Remove legacy per-user MFA (DF-3):** Legacy per-user MFA (set in Azure AD per-user MFA settings, NOT Conditional Access) silently blocks Password sync PSSO registration...
```

The pattern: `> **Bold Title:** Prose` with blank blockquote continuation lines (`>`) between paragraphs, and nested bullet points for multi-item callouts. This is the "hard-bordered callout" referenced throughout CONTEXT.md. Use this exact syntax for:
- The D-03 consolidated "Common Misconceptions" myth/fact box
- The per-method point-of-use callouts (FileVault, SE key destruction, Smart Card CBA prerequisite, Touch ID no-fallback)
- The Smart Card section opener prerequisite callout (DF-11 — must appear BEFORE any Smart Card configuration detail)

Example of a single-warning callout from guide 07 (lines 46–47 area, condensed pattern):
```markdown
> **CA exclusion (DF-9 point-of-use):** If your tenant has Conditional Access policies requiring "compliant device," create a CA exclusion for newly enrolling devices or users for the duration of the PSSO bootstrapping window.
```

---

#### Comparison Table Style (from `07-platform-sso-setup.md` lines 69–82, 103–108)

Guide 07 uses standard GitHub-flavored Markdown tables with bold first-column labels and a header separator row. Two table shapes appear:

**Simple key-value table** (lines 69–82):
```markdown
| Field | Value | Scope |
|-------|-------|-------|
| Extension Identifier | `com.microsoft.CompanyPortalMac.ssoextension` | All |
| Team Identifier | `UBF8T346G9` | All |
```

**Comparison table with leading empty cell** (lines 103–108 — this is the SC1 table shape):
```markdown
| | macOS 13 | macOS 14+ |
|--|----------|-----------|
| **Field** | `Authentication Method (Deprecated)` | `Platform SSO > Authentication Method` |
| **Supported values** | `Password`, `UserSecureEnclaveKey` (no SmartCard on macOS 13) | `Password`, `UserSecureEnclaveKey`, `SmartCard` |
| **Supports SmartCard** | No | Yes |
| **Failure if missing** | Error 10001 on macOS 13 devices | macOS 14+ devices miss Platform SSO sub-settings |
```

For guide 08's SC1 four-dimension selection table (D-04), copy the second shape (leading empty cell, bold row labels, columns = method names). The RESEARCH.md Code Examples section gives the exact cell values:

```markdown
| | Secure Enclave Key | Password Sync | Smart Card |
|--|-------------------|---------------|-----------|
| **Microsoft recommendation** | **Recommended** | Second choice | Third choice |
| **Passwordless** | Yes | No | Yes |
| **Phishing-resistant** | Yes | No | Yes |
| **Hardware required** | Yes — T2 Intel or Apple Silicon | No | No — external token |
| **macOS version gate** | macOS 13+ | macOS 13+ | macOS 14+ only |
```

Place this table at the TOP of the doc (after front matter, banner, and `# heading`), before any method deep-dive section — D-04 "decision-first."

---

#### `## Configuration-Caused Failures` Table Shape

**Source of truth:** `docs/admin-setup-macos/07-platform-sso-setup.md` lines 132–138 (the inline version), AND `docs/admin-setup-macos/06-config-failures.md` lines 24–77 (the hub version).

The guide-level `## Configuration-Caused Failures` section (as in guide 07 and guide 02) uses a **four-column table**: `Misconfiguration | Portal | Symptom | Runbook`.

From `07-platform-sso-setup.md` lines 132–138:
```markdown
## Configuration-Caused Failures

| Misconfiguration | Portal | Symptom | Runbook |
|------------------|--------|---------|---------|
| Only macOS 14+ `Platform SSO > Authentication Method` configured on mixed fleet (no deprecated field) | Intune | Error 10001 on macOS 13 devices | `35-macos-sso-sign-in-failure.md` (Phase 80) |
| Legacy SSO app extension profile still assigned alongside Platform SSO Settings Catalog policy | Intune | Error 10002; PSSO registration suppressed | `35-macos-sso-sign-in-failure.md` (Phase 80) |
| `{{DEVICEREGISTRATION}}` registration token mistyped or missing braces | Intune | Profile deploys successfully but no "Registration Required" notification appears; registration never starts | `35-macos-sso-sign-in-failure.md` (Phase 80) |
| Authentication method changed on existing policy applied to enrolled fleet | Intune | Fleet-wide re-registration triggered for all users | — |
```

Key observations for guide 08's table:
- Runbook values use **code-span filenames** (e.g., `` `35-macos-sso-sign-in-failure.md` ``), NOT live links, when the runbook file does not yet exist (Phase 80 creates them). Use the same code-span pattern for guide 08's runbook column.
- A bare `—` is acceptable when no runbook yet applies (see last row above).
- The Portal column value is `Intune` for all PSSO-related entries (no ABM/Apple-side entries expected for auth methods).

**Hub compatibility note:** The `06-config-failures.md` hub (lines 24–77) uses a **five-column table** adding a `Guide` column: `Misconfiguration | Portal | Symptom | Guide | Runbook`. The guide-level table intentionally omits `Guide` (the guide IS the context). When Phase 78+ wires guide 08 into the hub, the hub gains the Guide column entry. Guide 08 does NOT need to add the Guide column — just use the four-column shape matching guide 07.

---

#### `## See Also` Link Format (from `07-platform-sso-setup.md` lines 140–146)

```markdown
## See Also

- [Platform SSO](../_glossary-macos.md#platform-sso)
- [Secure Enclave](../_glossary-macos.md#secure-enclave)
- [Enterprise SSO Plug-in](../_glossary-macos.md#enterprise-sso-plug-in)
- [Configuration Profiles](03-configuration-profiles.md)
- [macOS ADE Lifecycle Overview](../macos-lifecycle/00-ade-lifecycle.md)
```

Guide 08's `## See Also` must include:
- `[Platform SSO Setup](07-platform-sso-setup.md)` — mandatory (ROADMAP:451 depends-on; this is the setup-TASK companion)
- `[Platform SSO](../_glossary-macos.md#platform-sso)` — glossary anchor (Phase 75, confirmed live)
- `[Secure Enclave](../_glossary-macos.md#secure-enclave)` — glossary anchor (Phase 75, confirmed live)
- `[Enterprise SSO Plug-in](../_glossary-macos.md#enterprise-sso-plug-in)` — glossary anchor (Phase 75, confirmed live)
- `[Entra ID SSO](../_glossary.md#entra-id-sso)` — cross-glossary anchor (Phase 75, confirmed live)
- `09-enterprise-sso-plugin-migration.md` — **code-span only, NOT a live link** (Phase 78 not yet authored; C13 mechanism). Format: `` `09-enterprise-sso-plugin-migration.md` `` (plain text in the list, not a `[text](url)` link).

---

#### Version History Table (from `07-platform-sso-setup.md` lines 196–199 and `02-enrollment-profile.md` lines 136–141)

```markdown
---

| Date | Change | Author |
|------|--------|--------|
| 2026-06-21 | Phase 77 (PSSO-05..11): initial version — auth method selection table and three-method deep-dive with FileVault interaction, misconceptions box, Touch ID biometric policy, Passkey/FIDO2, NUAL | -- |
```

Pattern rules (confirmed from both analogs):
- A horizontal rule (`---`) immediately precedes the table — no heading above it.
- Three columns exactly: `Date | Change | Author`.
- Author value is `--` (two hyphens, not an em-dash).
- Most-recent entry goes last (bottom of table), same as guide 07.
- The change text should name the Phase and the requirement IDs.

---

#### Section-Local `last_verified` / `review_by` Annotation Pattern (from `07-platform-sso-setup.md` lines 153–154)

Guide 07 uses inline blockquote annotations for high-drift sub-sections:

```markdown
> _Section provenance — `last_verified: 2026-06-20` / `review_by: 2026-09-20`. This is the highest-drift content in this guide (macOS 26 GA, Company Portal 5.2604.0); re-confirm against current Microsoft Learn / Apple documentation at each 90-day review._
```

Apply this pattern in guide 08 to:
- The Touch ID subsection (Company Portal 2504 / macOS 14.6 facts — confirmed high-drift per RESEARCH.md)
- The Password sync method section for the ~4-hour sync timing claim (MEDIUM confidence per Assumptions Log A2)
- Any individual fact that RESEARCH.md flags as MEDIUM confidence

The format: `> _Section provenance — \`last_verified: YYYY-MM-DD\` / \`review_by: YYYY-MM-DD\`. [Drift explanation]._`

---

### `docs/admin-setup-macos/00-overview.md` (atomic line edit)

**Analog:** Self-referential. The file's own Phase-76 edit (lines 69–70) demonstrates the Version History pattern. The line to convert is line 47.

---

#### Exact Current Text of Line 47 (confirmed from direct read)

```
8. `08-auth-methods-deep-dive.md` (added in a later documentation phase)
```

This is a plain numbered-list item where the filename is a code-span and there is no link.

---

#### Required Replacement Text (from RESEARCH.md "00-overview.md Edit" section)

```markdown
8. **[Auth Methods Deep-Dive](08-auth-methods-deep-dive.md)** — Selection guide and deep-dive reference for all three Platform SSO authentication methods (Secure Enclave key [recommended], Password sync, Smart card) with FileVault interaction, dangerous misconceptions, Touch ID biometric policy, and Passkey/FIDO2 from the Platform Credential.
```

This follows the same bold-link + em-dash + prose-description pattern used for items 1–7 in the overview list. Compare item 7 (line 45):

```markdown
7. **[Platform SSO Setup](07-platform-sso-setup.md)** -- Configure macOS Platform SSO via the Settings Catalog `com.apple.extensiblesso` payload. Covers Entra prerequisites, the three silent bootstrapping blockers, dual-field mixed-fleet configuration, user-group assignment, and `app-sso platform -s` verification.
```

Note that existing list items 1–7 use double hyphen `--` while the RESEARCH.md replacement uses `—` (em-dash). Use the double hyphen `--` to match the existing corpus style (items 1–7 all use `--`).

Corrected replacement matching existing style:
```markdown
8. **[Auth Methods Deep-Dive](08-auth-methods-deep-dive.md)** -- Selection guide and deep-dive reference for all three Platform SSO authentication methods (Secure Enclave key [recommended], Password sync, Smart card) with FileVault interaction, dangerous misconceptions, Touch ID biometric policy, and Passkey/FIDO2 from the Platform Credential.
```

---

#### Surrounding Context for Find/Replace (lines 43–49 from direct read)

```
43	7. **[Platform SSO Setup](07-platform-sso-setup.md)** -- Configure macOS Platform SSO via the Settings Catalog `com.apple.extensiblesso` payload. Covers Entra prerequisites, the three silent bootstrapping blockers, dual-field mixed-fleet configuration, user-group assignment, and `app-sso platform -s` verification.
44	
45	(blank line 44 — there is actually no line 44 blank; verify exact line numbers when editing)
46	
47	8. `08-auth-methods-deep-dive.md` (added in a later documentation phase)
48	
49	9. `09-enterprise-sso-plugin-migration.md` (added in a later documentation phase)
```

Exact lines 33–49 from the direct read (for executor anchor):

```
33	1. **[ABM Configuration](01-abm-configuration.md)** -- Create ADE token in Apple Business Manager and Intune, assign devices to MDM server, configure token renewal. This must be complete before any enrollment profile can be created.
...
45	7. **[Platform SSO Setup](07-platform-sso-setup.md)** -- Configure macOS Platform SSO via the Settings Catalog `com.apple.extensiblesso` payload. Covers Entra prerequisites, the three silent bootstrapping blockers, dual-field mixed-fleet configuration, user-group assignment, and `app-sso platform -s` verification.
46	
47	8. `08-auth-methods-deep-dive.md` (added in a later documentation phase)
48	
49	9. `09-enterprise-sso-plugin-migration.md` (added in a later documentation phase)
```

**Find:** `` 8. `08-auth-methods-deep-dive.md` (added in a later documentation phase) ``
**Replace with:** `8. **[Auth Methods Deep-Dive](08-auth-methods-deep-dive.md)** -- Selection guide and deep-dive reference for all three Platform SSO authentication methods (Secure Enclave key [recommended], Password sync, Smart card) with FileVault interaction, dangerous misconceptions, Touch ID biometric policy, and Passkey/FIDO2 from the Platform Credential.`

Line 49 (`9. \`09-enterprise-sso-plugin-migration.md\`...`) is **NOT touched** — it remains a code-span (Phase 78 not yet authored; C13 mechanism unchanged).

---

#### Version History Row to Add to `00-overview.md` (from lines 67–70)

Existing Version History (lines 67–70):
```markdown
| Date | Change | Author |
|------|--------|--------|
| 2026-06-20 | Phase 76: added guides 07/08/09 to Mermaid diagram and numbered list | -- |
| 2026-04-14 | Initial version -- macOS admin setup overview with Mermaid diagram and 6-guide setup sequence | -- |
```

New row to append (most-recent = bottom):
```markdown
| 2026-06-21 | Phase 77: converted `08-auth-methods-deep-dive.md` code-span to live link with description | -- |
```

The existing Mermaid diagram (lines 19–31) already has `H[8. Auth Methods<br/>Deep-Dive]` as a node — the diagram does NOT need to change. Only line 47 (numbered list) and the Version History table change.

---

## Shared Patterns

### Glossary Anchor Slugs (confirmed live — Phase 75)

**Source:** `docs/_glossary-macos.md` (Authentication section, confirmed lines 122–141) and `docs/_glossary.md` (Security section, lines 158–163).

| Anchor | Full Link | Confirmed? |
|--------|-----------|------------|
| `#platform-sso` | `../_glossary-macos.md#platform-sso` | Yes — H3 heading `### Platform SSO` present at line 123 |
| `#secure-enclave` | `../_glossary-macos.md#secure-enclave` | Yes — H3 heading `### Secure Enclave` present at line 131 |
| `#enterprise-sso-plug-in` | `../_glossary-macos.md#enterprise-sso-plug-in` | Yes — H3 heading `### Enterprise SSO Plug-in` present at line 137 |
| `#entra-id-sso` | `../_glossary.md#entra-id-sso` | Yes — H3 heading `### Entra ID SSO` present at line 158 |

All four anchors are live and confirmed from direct file reads. Guide 08's `## See Also` and any inline definitions that link to these can use the paths above without risk of C13 breakage.

---

### Front-Matter Convention (applies to all guides 01–08)

All guides in `docs/admin-setup-macos/` use identical front matter shape:
```yaml
---
last_verified: YYYY-MM-DD
review_by: YYYY-MM-DD
applies_to: ADE
audience: admin
platform: macOS
---
```
`applies_to: ADE` is invariant. `audience: admin` is invariant. `platform: macOS` is invariant.

---

### Hard-Bordered Callout (applies to all D-03 callouts in guide 08)

The corpus "hard-bordered callout" is standard Markdown blockquote (`>`) with bold title. There is no HTML border markup — the term "hard-bordered" in CONTEXT.md refers to the visual weight of the bold + blockquote combination, not literal CSS borders.

Pattern from guide 07:
```markdown
> **Title Here:**
>
> Body text here.
>
> - **Bullet item:** detail
```

Apply to all of the following in guide 08:
- Consolidated "Common Misconceptions" box (the myth/fact table lives inside or directly after this callout)
- Per-method point-of-use callouts (FileVault canonical statement, SE key destruction warning, Smart Card CBA prerequisite opener, Touch ID no-fallback warning)

---

### Duplication-with-Cross-Reference Pattern (applies to C3 and D3 requirements)

Pattern sourced from guide 07 (Section "Step 1" lines 46–49 point-of-use cross-references pointing back to the Known Silent Blockers callout):

```markdown
**CA exclusion (DF-9 point-of-use):** If your tenant has... See the [Known Silent Blockers](#known-silent-blockers--resolve-before-deployment) callout above for the circular-dependency detail.
```

For guide 08:
- State each FileVault fact ONCE in the Secure Enclave section's FileVault sub-section.
- In the Password Sync section, use: `For cold-boot behavior and FileVault interaction, see [FileVault and the Secure Enclave Key](#filevault-and-the-secure-enclave-key) above.`
- In the misconception box, use the same anchor-link cross-reference pattern.
- Do NOT restate the canonical FileVault paragraph verbatim in more than one location.

---

### Code-Span for Not-Yet-Authored Files (C13 mechanism)

Pattern confirmed from `00-overview.md` lines 47–49:
```
8. `08-auth-methods-deep-dive.md` (added in a later documentation phase)
9. `09-enterprise-sso-plugin-migration.md` (added in a later documentation phase)
```

Apply to `09-enterprise-sso-plugin-migration.md` reference in guide 08's `## See Also` — use `` `09-enterprise-sso-plugin-migration.md` `` (code-span, no link), not `[text](09-enterprise-sso-plugin-migration.md)` (which would be a broken link and fail C13).

---

## No Analog Found

No files in this phase are without analogs. Both deliverables map directly to the existing corpus.

---

## Metadata

**Analog search scope:** `docs/admin-setup-macos/` (all 8 files), `docs/_glossary-macos.md`, `docs/_glossary.md`
**Files read:** 6 (`07-platform-sso-setup.md`, `02-enrollment-profile.md`, `06-config-failures.md`, `00-overview.md`, `_glossary-macos.md`, `_glossary.md`)
**Pattern extraction date:** 2026-06-21
