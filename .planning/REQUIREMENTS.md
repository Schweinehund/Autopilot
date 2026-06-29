# Requirements — v1.13 macOS Platform SSO Admin-Setup Documentation Accuracy & Depth

**Milestone:** v1.13
**Status:** Roadmap defined — ready for Phase 96
**Basis:** `SEED-001` (planted 2026-06-28). All content verified against Microsoft Learn 2026-06-27/28.

---

## v1.13 Requirements

### Accuracy — fix verified factual conflicts (Pillar A)

- [x] **ACC-01**: `docs/macos-lifecycle/00-ade-lifecycle.md` describes the macOS Company Portal as a **PKG/LOB app only (never VPP / Apps and Books)** — Stage-6 lines ~309/319 corrected, the Stage-4-vs-Stage-6 self-contradiction removed, and the Stage-6 VPP glossary-term reference reconciled.
- [x] **ACC-02**: `docs/macos-lifecycle/00-ade-lifecycle.md` (~line 250) assigns the A2 PSSO/SSO-extension policy to a **static user group** (corrects "static device group").
- [x] **ACC-03**: `docs/admin-setup-macos/07-platform-sso-setup.md` (~line 126) removes the "VPP from Apps and Books" Company Portal option, and the Step 2 "Deploy to the device" callout is reworded to separate *install target* (the device) from *assignment target* (user group for affinity / device group for userless).
- [x] **ACC-04**: `docs/l1-runbooks/15-macos-company-portal-sign-in.md` (~line 30) corrects the remediation to **user-group** assignment for user-affinity devices.

### Troubleshooting captures (Pillar B)

- [x] **TS-01**: The **Extension-Identifier-typo** failure is documented as a Configuration-Caused-Failure in guide 07 — symptom ("Unable to Sign-In … necessary SSO application or extension" looping in Setup Assistant despite Company Portal Installed + PSSO policy Succeeded), root cause (typo in the free-text Extension Identifier; correct value `com.microsoft.CompanyPortalMac.ssoextension`; Intune does not validate it), fix, and note that it affects both A1 and A2.
- [x] **TS-02**: **During-setup (A2) Company Portal delivery requirements** are consolidated (LOB app ≥ 5.2604.0, **Required**, assigned to the **same static user group** as the PSSO policy; enrollment profile stays device/serial-targeted, bridged by user affinity; user must be **Intune-licensed**; trim LOB **Included apps** to `com.microsoft.CompanyPortalMac`) in guide 07, cross-linked from guide 01.
- [x] **TS-03**: The **Setup-Assistant SSO-extension diagnostic tree** is documented (Intune device record → Company Portal version ["Installed ≠ correct version"] → Extension Identifier → user license → A1 bisect via disabling `Enable Registration During Setup`).

### Formalize session depth under requirements + harness (Pillar C)

- [x] **DEP-01**: `docs/admin-setup-macos/02-enrollment-profile.md` carries the verified Account Settings depth — local admin + local user account fields (account type / prefill / restrict-editing), PSSO account-creation ownership, password-prefill (passwordless/federated) behavior, and the UPN-via-Full-Name display note — freshness-stamped and harness-covered.
- [x] **DEP-02**: `docs/admin-setup-macos/03-configuration-profiles.md` carries the verified FileVault (Full Disk Encryption) depth — three sub-payloads (FileVault / FileVault Options / Recovery Key Escrow), required `Defer`, Setup-Assistant enforcement, the recovery-key-escrow verification procedure, the assignment target, and the Local Password Policy (Passcode) section — freshness-stamped and harness-covered.
- [x] **DEP-03**: `docs/admin-setup-macos/07-platform-sso-setup.md` carries the verified PSSO admin-setup depth — AccountName token mapping (AccountShortName vs preferred_username + LAPS), Company Portal assignment target, Non Platform SSO Accounts, Optional & Advanced Platform SSO Settings (two account models + per-setting reference), the Registration-Approach decision record, and the End-User Sign-In Experience (Secure Enclave) + local-password lifecycle — freshness-stamped and harness-covered.

### New runbook (Pillar D)

- [ ] **RUN-01**: A **local-macOS-password-reset procedure** for Secure-Enclave PSSO devices exists (new or extended runbook) — recovery paths (escrowed FileVault recovery key / managed admin via macOS LAPS / Apple ID where allowed), the clarification that SSPR resets the **Entra** password but **not** the independent local password under Secure Enclave, and the mandatory **PSSO re-registration** follow-up (cross-linked to L1 #36); navigation-wired into the macOS hubs.

### Glossary fix (Pillar E)

- [x] **GLOS-01**: `docs/_glossary-macos.md` Iru/Kandji entry reflects the 3-URL reality (`support.iru.io` primary / `support.kandji.io` legacy redirect / `docs.iru.com` documentation source), consistent with guide 02's MIGV-02 content — closes carried `GLOSSARY-IRU-URL-FRESHNESS-01`.

### Audit-harness lineage bump + close (Pillar F)

- [ ] **HARN-01**: 11th Path-A audit-harness lineage bump — `v1.13-milestone-audit.mjs` (C1-C16 inherited) + `v1.13-audit-allowlist.json` sidecar + BASELINE_17 freshness comment.
- [ ] **HARN-02**: Per-phase validators `check-phase-96..NN.mjs` (chain-apex extended) + `_lib/frozen-at-close.mjs` `V112` pin (v1.12 close-gate SHA) + 10th parallel CI coexistence workflow (predecessors v1.4–v1.12 byte-unchanged).
- [ ] **HARN-03**: 3-axis terminal re-audit (fresh `git clone --no-hardlinks` + cross-OS Linux GHA + fresh zero-context sub-agent; cross-OS PASS/FAIL/SKIP EXACT MATCH) + milestone close (`v1.13-MILESTONE-AUDIT.md` + `v1.13-DEFERRED-CLEANUP.md` + 4-doc traceability closure).

---

## Future Requirements (deferred)

- None new — v1.13 is scoped to the `SEED-001` backlog.

## Out of Scope

- **New platforms or net-new features** — v1.13 is a macOS documentation accuracy + depth milestone; no Windows/iOS/Android/Linux changes, no new product code, no UI work.
- **Multi-tenant PSSO (MTPSSO-01/02/03)**, **Kerberos follow-ons (KRBFUT-01/02)**, **iOS/Jamf migration (MIGFUT-01/02)** — carried in `v1.12-DEFERRED-CLEANUP.md`; not macOS-PSSO-admin-setup-doc work.
- **CI-3 Managed-Apple-ID→Account rename** — trigger-gated on the Intune portal rebrand (byte-unchanged hazard); remains deferred.
- **Tooling refactors** (EXEC-FAIL-DETAIL-EXTRACTION-01, FROZEN-AWARE-ADOPTION-SWEEP-01, HELPER-SPAWN-STDERR-01, WINDOWS-CLONE-DEEPNEST-TIMEOUT-01) — chain-validator internals, not this milestone's doc focus.

## Traceability

| REQ-ID | Phase | Status |
|--------|-------|--------|
| ACC-01 | Phase 96 | Complete |
| ACC-02 | Phase 96 | Complete |
| ACC-04 | Phase 96 | Complete |
| GLOS-01 | Phase 96 | Complete |
| DEP-01 | Phase 97 | Complete |
| DEP-02 | Phase 97 | Complete |
| ACC-03 | Phase 98 | Complete |
| TS-01 | Phase 98 | Complete |
| TS-02 | Phase 98 | Complete |
| TS-03 | Phase 98 | Complete |
| DEP-03 | Phase 98 | Complete |
| RUN-01 | Phase 99 | Pending |
| HARN-01 | Phase 100 | Pending |
| HARN-02 | Phase 100 | Pending |
| HARN-03 | Phase 100 | Pending |
