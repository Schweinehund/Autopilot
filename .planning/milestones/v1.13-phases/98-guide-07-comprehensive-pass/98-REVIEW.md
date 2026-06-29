---
phase: 98-guide-07-comprehensive-pass
reviewed: 2026-06-29T00:00:00Z
depth: standard
files_reviewed: 1
files_reviewed_list:
  - docs/admin-setup-macos/07-platform-sso-setup.md
findings:
  critical: 0
  warning: 3
  info: 1
  total: 4
status: issues_found
---

# Phase 98: Code Review Report

**Reviewed:** 2026-06-29
**Depth:** standard (documentation review — factual accuracy, internal consistency, link integrity, markdown structure)
**Files Reviewed:** 1
**Status:** issues_found

## Summary

`07-platform-sso-setup.md` is a well-structured, technically rich guide covering macOS Platform SSO configuration via Microsoft Intune. All sibling file references resolve to existing files (`02-enrollment-profile.md`, `03-configuration-profiles.md`, `01-psso-provisioning-walkthrough.md`, `00-ade-lifecycle.md`, `macos-capability-matrix.md`, `_glossary-macos.md`). All internal `#anchor` links were verified against actual headings in the referenced files — all resolve correctly. Markdown table column counts are consistent throughout. Version numbers (CP 5.2404.0 / A1, CP 5.2604.0 / A2, macOS 26 gate) are stated consistently wherever they appear.

Three warnings were found, all in the same cluster: guidance in the Prerequisites section and in the optional-settings decision table does not clearly signal which of its statements apply to the A2 path vs. the A1 path. One info item notes an unlabeled verification checklist entry. No Critical issues found.

---

## Narrative Findings (AI reviewer)

## Warnings

### WR-01: Prerequisites macOS version floor not path-qualified

**File:** `docs/admin-setup-macos/07-platform-sso-setup.md:87`

**Issue:** The Prerequisites section states "macOS 13 minimum (macOS 14 recommended)" as a flat prerequisite, with no qualifier indicating this applies only to the standard post-enrollment (A1) path. The note that immediately follows at line 91 explicitly qualifies the Company Portal version floor ("The Company Portal floor below (5.2404.0) applies to the **standard post-enrollment** alternative") but makes no equivalent statement about the macOS floor. Because this guide's primary chosen approach is the A2 ADE-during-Setup-Assistant path — which hard-gates at macOS 26 — an admin scanning only the Prerequisites section would read "macOS 13" as sufficient, contradicting the macOS 26 gate stated prominently in the opening decision section (line 34) and the ADE Path Prerequisites table (line 379).

**Fix:** Add a path qualifier to the macOS version bullet, mirroring the pattern used for the Company Portal floor at line 91:

```markdown
- **macOS version (standard post-enrollment / A1 path):** macOS 13 minimum (macOS 14
  recommended for full Platform SSO feature set). Smart Card authentication method
  requires macOS 14+. For Sequoia fleets: macOS 15.0–15.2 had a re-registration loop
  bug — fixed in macOS 15.3; upgrade to 15.3+ before deploying.
  **ADE-during-Setup-Assistant path (A2, this deployment): macOS 26 — see the
  [Advanced section](#advanced--optional-ade-during-setup-assistant).**
```

---

### WR-02: "Who creates the account" decision table misrepresents Secure Enclave A2 in both applicable rows

**File:** `docs/admin-setup-macos/07-platform-sso-setup.md:308-312`

**Issue:** The three-row decision table (heading: "The deciding question is 'who creates the macOS account'") has two interlocking accuracy problems for Secure Enclave A2 deployments.

**Row 1** (account created by enrollment profile → "Register only" → "Model B settings needed: No") is where a Secure Enclave A2 deployment correctly lands — the enrollment profile creates the account and PSSO only registers it, just earlier in the flow. However, the "Model B settings needed: No" answer is incomplete: an A2 Secure Enclave admin falling into row 1 would conclude no settings beyond the standard Step 3 fields are required. In reality they still need `Enable Registration During Setup` from the ADE-specific section. The table gives no signal that row 1 has an ADE-path addendum.

**Row 2** (account created by "PSSO during Setup Assistant (ADE-during-Setup, macOS 26)" → "Create + register" → both `Enable Registration During Setup` and `Enable Create First User During Setup`) describes only the Password-method ADE path, where PSSO synthesizes the local account from the Entra password. The parenthetical "(ADE-during-Setup, macOS 26)" in the "Account created by" cell is likely to cause an A2 Secure Enclave admin to misidentify with this row (because they are also on an ADE-during-Setup, macOS 26 path) and consequently enable `Enable Create First User During Setup`, which must NOT be enabled with Secure Enclave (as the Advanced section correctly warns at line 396, but the table does not).

**Fix:** Add a clarifying note to row 1, and qualify the "ADE-during-Setup" label in row 2 to make clear it is specifically the Password-method account-creation variant:

```markdown
| Account created by | PSSO's role | Model B settings needed? |
|---|---|---|
| Enrollment profile (pre-staged) **or** the user interactively in Setup Assistant | Register only | **No** — but if registering *during* Setup Assistant (A2 Secure Enclave path), also enable `Enable Registration During Setup` per the [Advanced section](#advanced--optional-ade-during-setup-assistant). |
| **Password method only:** PSSO during Setup Assistant via `Enable Create First User During Setup` (ADE-during-Setup, macOS 26) | Create + register | **Yes** — `Enable Registration During Setup` + `Enable Create First User During Setup`. **Omit the second setting with Secure Enclave / Smart Card.** |
| PSSO at the login window (shared devices) | Create + register | **Yes** — the full Model B stack below |
```

---

### WR-03: DF-3 silent blocker scoped to "Password sync PSSO registration" — misleads Secure Enclave admins

**File:** `docs/admin-setup-macos/07-platform-sso-setup.md:99`

**Issue:** The DF-3 silent-blocker callout states: "Legacy per-user MFA (set in Azure AD per-user MFA settings, NOT Conditional Access) silently blocks **Password sync PSSO registration**." The qualifier "Password sync" implies that legacy per-user MFA is a blocker only for the Password authentication method. However, per-user MFA can also silently block Secure Enclave PSSO registration, because PSSO registration on any method involves an interactive Entra authentication webview; the PSSO registration host cannot satisfy a legacy per-user MFA challenge regardless of the auth method selected. An admin using Secure Enclave who reads "Password sync PSSO registration" may conclude DF-3 does not apply to their deployment and skip the remediation step, resulting in silent registration failure.

**Fix:** Remove the "Password sync" qualifier to make the blocker unambiguous across auth methods:

```markdown
> - **Remove legacy per-user MFA (DF-3):** Legacy per-user MFA (set in Azure AD
>   per-user MFA settings, NOT Conditional Access) silently blocks PSSO registration
>   on any authentication method. The webview authentication challenge during PSSO
>   registration cannot be completed by the PSSO registration host when legacy
>   per-user MFA is active. No error is shown; the flow stalls. **Resolution:**
>   Disable per-user MFA for all PSSO target users and use Conditional Access MFA
>   policy instead.
```

---

## Info

### IN-01: Verification checklist CP version floor not labeled by path

**File:** `docs/admin-setup-macos/07-platform-sso-setup.md:217`

**Issue:** The verification checklist item "Company Portal version ≥ 5.2404.0 confirmed on at least one enrolled test device" uses the A1 (standard post-enrollment) floor without a path label. The A2-specific items at lines 220-221 check the correct 5.2604.0 floor, but an A2 admin quickly scanning the checklist might tick the 5.2404.0 item and not notice the relationship between it and the A2 item below it.

**Fix:** Add an inline path label to make the scope explicit:

```markdown
- [ ] Company Portal version ≥ 5.2404.0 confirmed on at least one enrolled test device
      *(A1 / standard post-enrollment path; A2 path requires ≥ 5.2604.0 — see item below).*
```

---

_Reviewed: 2026-06-29_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard (documentation)_
