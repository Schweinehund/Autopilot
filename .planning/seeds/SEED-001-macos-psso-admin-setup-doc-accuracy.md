---
seed_id: SEED-001
planted: 2026-06-28
planted_during: "v1.13 pre-scoping — live macOS PSSO build/troubleshooting + cross-doc audit session"
trigger_when: "scoping a macOS admin-setup / Platform SSO documentation milestone (v1.13+)"
status: planted
---

# SEED-001: macOS Platform SSO / Admin-Setup Documentation Accuracy + Depth

## Idea

Formalize and extend the macOS Platform SSO / enrollment / FileVault admin-setup documentation worked through in the 2026-06-27/28 session — under requirements + the audit harness. Four buckets: (A) fix verified factual conflicts, (B) add real-world troubleshooting captures, (C) formalize this session's already-written depth additions, (D) close a new local-password-reset procedure gap. All content was verified against Microsoft Learn during a live build that ended in a working Secure-Enclave during-Setup-Assistant (A2) PSSO deployment.

## When to Surface

When running `/gsd-new-milestone` to scope v1.13+ with a macOS admin-setup / Platform SSO documentation focus.

## Why This Matters

Every item below is either a verified factual error in shipped docs, a real failure mode hit and resolved live, depth added this session as DIRECT edits (outside the GSD phase/validator flow — not tied to requirement IDs or the chain validators), or a confirmed gap. Folding into a milestone brings them under requirements + harness coverage.

## Scope Captured

### A. Verified doc CONFLICTS to fix (from cross-doc audit)
- `docs/macos-lifecycle/00-ade-lifecycle.md` (HIGH; file is self-contradictory):
  - ~line 250: PSSO/SSO-extension policy says "static **device** group" → must be static **user** group (A2).
  - ~line 309: "Company Portal can be deployed via **VPP** (Apps and Books)" → false; macOS CP is PKG/LOB only.
  - ~line 319: names **VPP as the *recommended*** CP method → false. (Line ~326 already correctly says "never VPP on macOS".)
  - ~line 411 (LOW): VPP listed as Stage-6 term; props up the above.
- `docs/admin-setup-macos/07-platform-sso-setup.md` (HIGH):
  - ~line 126: "Deploy via Intune as a managed app (**VPP from Apps and Books** or DMG/PKG)" → drop VPP (macOS CP = PKG/LOB only); contradicts same file's lines 127/320.
  - Reconcile the Step 2 "Deploy to the device" callout wording (install-on-device vs assign-to-device-group conflation).
- `docs/l1-runbooks/15-macos-company-portal-sign-in.md` (HIGH):
  - ~line 30: remediation "assign Company Portal Required to the **device** group" → wrong for user-affinity; should be the **user** group.

### B. New troubleshooting captures (Configuration-Caused-Failures)
- **Extension Identifier typo (RESOLVED a real failure this session).** PSSO loops "This Mac does not have the necessary single sign-on application or extension" during Setup Assistant, despite Company Portal = Installed and PSSO policy = Succeeded. Root cause: typo in the PSSO policy's free-text **Extension Identifier** — must be exactly `com.microsoft.CompanyPortalMac.ssoextension` (failing value was `...ssoexention`). Intune does NOT validate this field, so it reports Succeeded while macOS can't bind the extension. Fix: correct identifier → wipe + re-enroll. Affects BOTH A1 and A2.
- **"Installed ≠ correct version."** With Company Portal "Ignore app version = Yes," Intune reports Installed for ANY version present (detection on bundle ID only). Confirm the uploaded PKG is ≥ 5.2604.0 for A2.
- **During-setup (A2) delivery requirements consolidated.** CP as LOB app (NOT VPP), ≥ 5.2604.0, **Required**, assigned to the **same static USER group** as the PSSO policy; enrollment profile is device/serial-targeted (correct — the bridge to user-targeted policies is user affinity at modern-auth sign-in); the user must be **Intune-licensed**; trim the LOB app's **Included apps** to only `com.microsoft.CompanyPortalMac`.
- **Diagnostic tree** for the Setup-Assistant SSO-extension error: device record (primary user / CP install status / PSSO policy status) → CP version → Extension Identifier → user license → A1 bisect (disable `Enable Registration During Setup` to isolate A2-timing vs a fundamental fault).

### C. Session depth additions to FORMALIZE (already written this session)
- `02-enrollment-profile.md`: Account Settings section (local admin + local user accounts; account-type / prefill / restrict-editing; PSSO account-creation ownership; password-prefill behavior; UPN-via-Full-Name display note).
- `03-configuration-profiles.md`: FileVault (Full Disk Encryption) rewrite — 3 sub-payloads (FileVault / FileVault Options / Recovery Key Escrow), Defer-required, Setup-Assistant enforcement, verification procedure, assignment target; + new "Local Password Policy (Passcode)" section (non-expiring best practice + compliance expiration alternative).
- `07-platform-sso-setup.md`: AccountName token clarification (AccountShortName vs preferred_username + LAPS), Company Portal assignment target, account-binding callouts, Non Platform SSO Accounts, Optional & Advanced Platform SSO Settings (two account models + per-setting reference), Registration Approach decision record, End-User Sign-In Experience (Secure Enclave) + local-password lifecycle.

### D. NEW doc gap identified
- **Local macOS password reset procedure** for Secure-Enclave PSSO devices — no dedicated runbook exists. Needs: recovery paths (escrowed FileVault recovery key; managed admin / macOS LAPS; Apple ID where allowed); the clarification that **SSPR resets the *Entra* password but NOT the independent local password under Secure Enclave**; and the MANDATORY follow-up that any local-password reset or FileVault-recovery-key unlock **invalidates the Secure Enclave key → user must re-register PSSO** (cross-link L1 #36). Currently only the *aftermath* is documented (`l1-runbooks/36-macos-secure-enclave-key.md`); the *procedure* is missing.

### E. Pre-existing deferred item to bundle
- GLOSSARY-IRU-URL-FRESHNESS-01 (from `.planning/milestones/v1.12-DEFERRED-CLEANUP.md`; single-line glossary URL correction; rides with the first corpus-editing phase).

## Decisions locked this session (carry into requirements)
- Target deployment: single-user, Secure Enclave (`UserSecureEnclaveKey`), enrollment-profile-created account, registration-DURING-Setup-Assistant (A2, macOS 26+). UPN appears via Full Name display (`{{username}}`); short name stays `{{partialUPN}}`; PSSO Account Name = `com.apple.PlatformSSO.AccountShortName` (NOT `preferred_username`).
- Local password: strong + non-expiring (NIST / Microsoft best practice) leads; compliance-mandated expiration documented as the labeled alternative.
- Secure Enclave lock-screen credential = local password (+ Touch ID), independent of Entra — NOT an Entra-password login (that is the Password method).
- All content verified against Microsoft Learn on 2026-06-27 / 2026-06-28.
