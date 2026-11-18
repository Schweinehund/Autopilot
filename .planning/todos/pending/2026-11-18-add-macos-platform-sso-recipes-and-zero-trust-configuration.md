---
created: 2026-11-18T17:19:54.201Z
title: Add macOS Platform SSO recipes and zero-trust configuration
area: docs
severity: minor
files:
  - docs/admin-setup-macos/07-platform-sso-setup.md
  - docs/admin-setup-macos/08-auth-methods-deep-dive.md:28
  - docs/admin-setup-macos/03-configuration-profiles.md:142
  - docs/recipes/
---

## Problem

The two macOS Platform SSO (PSSO) options we evaluated, passwordless Secure Enclave key and
password sync, are documented only as admin guides: RE-123 (setup procedure; the
Settings Catalog step offers `Password` or `UserSecureEnclaveKey`) and RE-124 (method
comparison and per-method deep-dive). There are no macOS device recipes in
`docs/recipes/` (01-10 are all Windows, iPad, or Android), so nothing gives an ordered build
ending in a working Mac for either option. There is also no zero-trust configuration
doc: "Zero Trust" appears once in macOS docs, as a cited source at
`03-configuration-profiles.md:142`.

## Solution

TBD. Three pieces, possibly one milestone phase:
1. Recipe: Mac with passwordless Secure Enclave PSSO (ADE, T2 or Apple Silicon,
   Touch ID policy, FileVault behavior, NUAL optional).
2. Recipe: Mac with password-sync PSSO (legacy non-T2 fallback, FileVault Policy
   `AttemptAuthentication` on macOS 15+, per-user MFA blocker from RE-123).
3. Zero-trust configuration tying PSSO to compliance policy, Conditional Access
   (device-compliant + phishing-resistant auth strength for the Secure Enclave
   path), and Entra password protection for the password path. Decide whether this
   is a section in each recipe or its own guide.
- Recipes follow the Device Recipe doc class (EEE-SOP-standard.md STD-05; see v1.18
  Phase 129) and link to RE-123/RE-124 rather than repeating them.
- Re-verify RE-123/RE-124 claims against current Microsoft Learn before reusing them.
