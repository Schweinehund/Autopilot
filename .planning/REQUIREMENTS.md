# Requirements: macOS Platform SSO Follow-ons — Kerberos, Graph API & NUAL (v1.10)

**Defined:** 2026-06-22
**Core Value:** IT teams can independently provision, troubleshoot, and manage Apple-platform single sign-on (macOS Platform SSO + Kerberos SSO + programmatic Platform Credential management) through Microsoft Intune / Entra ID without escalating to engineering.

**Research basis:** `.planning/research/SUMMARY.md` (+ STACK / FEATURES / ARCHITECTURE / PITFALLS, committed `856c0e3`) — HIGH confidence; sources Microsoft Learn (Entra Kerberos tutorial 2026-06-15, Graph v1.0 `platformCredentialAuthenticationMethod` 2025-11-08..2026-01-28) + Apple `device-management` `com.apple.extensiblesso` schema + Apple Platform Deployment. All three v1.9 research flags **resolved** (no deeper research needed).

**Gray-area picks resolved via `/adversarial-review` (2026-06-22):**
- **Area 1 Kerberos → Option A** — standalone `10-kerberos-sso-extension.md` guide + cross-links + glossary + matrix + L2 runbook (L2 in PSSO-FUT-04's own effort estimate; new file mandated by the deferred item)
- **Area 2 Graph API → Option A** — dedicated Graph-API operations doc + L2 troubleshooting (Graph is GA; deferred item sanctions a dedicated doc)
- **Area 3 Multi-tenant PSSO (PSSO-FUT-03) → DEFERRED** to its own architectural milestone (net-new architecture, not auth-doc cleanup; would break the single-feature-content-milestone convention)
- **Area 4 NUAL → Option A** — minimal verify + document the MDM key literal(s) in guide 08; close PSSO-FUT-01 (key literals now VERIFIED from Apple schema)
- **Graph-API doc placement → Option A** (`docs/admin-setup-macos/11-graph-api-platform-credential.md`, keeps the macOS guide sequence together; revisitable at discuss-phase)
- **Pre-existing chain-red (PRE-EXISTING-CHAIN-RED-AT-HEAD-01) → fold in a dedicated chain-health phase** before the v1.10 harness lineage bump (no CHAIN_SKIP masking)

---

## v1 Requirements

Requirements for milestone v1.10. Each maps to exactly one roadmap phase.

### Kerberos SSO Extension (KRB)

- [x] **KRB-01**: Admin can configure the Apple Kerberos SSO extension from a new guide (`docs/admin-setup-macos/10-kerberos-sso-extension.md`) — extension identity `com.apple.AppSSOKerberos.KerberosExtension` (`Type: Credential`, Team ID `apple`), Intune **Custom Template (.mobileconfig)** deployment path (NOT Settings Catalog), realm/KDC + on-prem AD prerequisites, and explicit disambiguation from Platform SSO (`Redirect`) and the Microsoft Enterprise SSO plug-in
- [x] **KRB-02**: Guide 10 documents PSSO + Kerberos TGT integration — `usePlatformSSOTGT` / `custom_tgt_setting` (Company Portal floor), **macOS 14.6** floor for PSSO-integrated Kerberos, the cosmetic "Not signed in" menu-bar note, and the Microsoft Entra (cloud) Kerberos scenario; Azure Files Cloud-Kerberos documented as a **limited-preview** callout (not GA)
- [x] **KRB-03**: Guide 10 documents Kerberos diagnostics — `app-sso platform -s` (`tgt_ad` / `tgt_cloud`) + `klist`, ticket lifecycle, and realm/KDC reachability checks (standalone `app-sso kerberos` subcommand verified at plan time; default to `klist` + `app-sso platform -s`)
- [x] **KRB-04**: The legacy Enterprise SSO plug-in & migration guide (`09`) SSOMIG-04 deferred-note is replaced with a live forward cross-link to guide 10, and the macOS admin-setup overview (`00-overview.md`) Mermaid + bullet flow is extended to include guide 10

### Graph API Platform Credential Management (GRAPH)

- [x] **GRAPH-01**: Admin can manage macOS Secure Enclave Platform Credentials programmatically from a new Graph-API operations doc (`docs/admin-setup-macos/11-graph-api-platform-credential.md`) — the **GA** `platformCredentialAuthenticationMethod` resource (Graph v1.0), **List / Get / Delete** operations (no Create/Update — credentials are device-initiated only), key properties (`id`, `displayName`, `createdDateTime`, `keyStrength`, `platform`), and the `Microsoft.Graph.Identity.SignIns` PowerShell SDK cmdlets
- [x] **GRAPH-02**: Graph doc documents required Graph permissions + Entra roles (read vs delete; delegated vs application; national-cloud availability) and, via the suite's mandatory `[!WARNING]` safety-callout convention, warns that **Delete severs the Entra binding (forces PSSO re-registration) and does NOT remote-erase the device Secure Enclave key** (least-privilege delete scope resolved at plan time)

### NUAL MDM Key Verification (NUAL)

- [x] **NUAL-01**: Guide 08's NUAL section documents the **verified** MDM payload key literals `NewUserAuthorizationMode` (one-time; `Standard`/`Admin`/`Groups`/`Temporary`) and `UserAuthorizationMode` (persistent; `Standard`/`Admin`/`Groups`) + the `EnableCreateUserAtLogin` prerequisite and the one-time-vs-persistent behavioral asymmetry; the v1.9 deferred-item callout is replaced and **PSSO-FUT-01 is closed** (Apple-schema-vs-Intune-Settings-Catalog display-name second-pass + the `Temporary`-not-in-Intune-UI caveat handled at plan time)

### Troubleshooting Runbooks (RUN)

- [x] **RUN-01**: L2 engineer can investigate Kerberos SSO extension failures via a new runbook (`docs/l2-runbooks/28-macos-kerberos-sso-investigation.md`) — ticket acquisition, realm/KDC reachability, TGT verification (`app-sso platform -s` / `klist`), and log collection
- [x] **RUN-02**: L2 engineer can investigate Graph-side Platform Credential issues via a new runbook (`docs/l2-runbooks/29-macos-graph-credential-investigation.md`) — enumerate/verify, the delete-and-re-register flow, and permission/role troubleshooting

### Reference & Navigation Integration (REF)

- [x] **REF-01**: `docs/reference/macos-capability-matrix.md` gains Kerberos SSO Extension (+ Graph-managed Platform Credential) rows under the **pre-edit anchor-inventory** convention, committed atomically with the `check-phase-63.mjs` V-63-08 blob-hash baseline update
- [x] **REF-02**: `_glossary-macos.md` (+ reciprocal `_glossary.md` see-also) gain Kerberos SSO extension + Graph Platform Credential entries, and the `4-platform-capability-comparison.md` macOS cells are updated link-not-copy
- [ ] **REF-03**: Navigation hubs integrate the new content **navigation-last** (after all content exists) — `docs/index.md`, `common-issues.md`, `quick-ref-l2.md`, `l2-runbooks/00-index.md`, and the `decision-trees/06-macos-triage.md` Kerberos/Graph leaf

### Chain Health (CHAIN)

- [x] **CHAIN-01**: The 10 pre-existing legacy chain FAILs (`check-phase-{58,59,60,61,62,63,64,65,66,73}.mjs`) are resolved — HEAD-coupled assertions converted to frozen-aware reads via `_lib/frozen-at-close.mjs`, and the missing `73-RETRO-INVENTORY.md` restored/regenerated, with **no CHAIN_SKIP masking** (closes PRE-EXISTING-CHAIN-RED-AT-HEAD-01)
- [x] **CHAIN-02**: The full validator chain exits **0 FAIL** on both Windows local and Linux GHA before the v1.10 harness lineage bump adds new validators

### Audit Harness & Milestone Close (HARN)

- [ ] **HARN-01**: `v1.10-milestone-audit.mjs` + `v1.10-audit-allowlist.json` ship as Path-A copies from v1.9 (C1-C16 inherited) + BASELINE_14 freshness comment in `regenerate-supervision-pins.mjs` (Atom 1, indivisible)
- [ ] **HARN-02**: Per-phase `check-phase-83..NN.mjs` validators ship as deliverables + `_lib/frozen-at-close.mjs` gains a `V19` entry (v1.9 close-gate SHA, pinned BEFORE any validator is authored) + `audit-harness-v1.10-integrity.yml` ships as the **7th** parallel CI coexistence workflow (predecessors v1.4–v1.9 byte-unchanged) (Atom 2, indivisible)
- [ ] **HARN-03**: 3-axis terminal re-audit (Axis 1 fresh `git clone --no-hardlinks` + Axis 2 cross-OS Linux GHA + Axis 3 fresh sub-agent; cross-OS PASS/FAIL/SKIP-count EXACT MATCH) + `v1.10-MILESTONE-AUDIT.md` + `v1.10-DEFERRED-CLEANUP.md` + 4-doc traceability closure (PROJECT / ROADMAP / STATE / REQUIREMENTS)

## v2 Requirements

Deferred but tracked. Moving v2 → v1 requires a roadmap update.

### Multi-tenant Platform SSO (MTPSSO) — own architectural milestone

- **MTPSSO-01**: Cross-tenant Platform Credential registration models (one macOS fleet, multiple Entra tenants)
- **MTPSSO-02**: Multi-tenant Conditional Access / compliance scoping for PSSO
- **MTPSSO-03**: Multi-tenant PSSO L2 troubleshooting

### Kerberos extensions (KRBFUT)

- **KRBFUT-01**: On-prem-AD-only (non-Entra) Kerberos realm deep-dive beyond the Intune/Entra-scoped baseline
- **KRBFUT-02**: Azure Files Cloud-Kerberos full coverage (promote from limited-preview callout once GA)

## Out of Scope

Explicitly excluded. Documented to prevent scope creep.

| Feature | Reason |
|---------|--------|
| Multi-tenant Platform SSO (PSSO-FUT-03) | Net-new architecture requiring its own planning surface; deferred to its own milestone (per `/adversarial-review`) |
| Graph **Create / Update** of Platform Credential | Operations do not exist — credentials are device-initiated only; only List/Get/Delete are documentable |
| Azure Files Cloud-Kerberos as a GA feature | Limited-preview only; documented as a preview callout, not full coverage |
| On-prem AD / KDC standup deep-dive | Outside the Intune/Entra scope maintained across v1.0–v1.9; link out rather than re-document AD administration |
| Multi-tenant Apple Business surfaces | Unrelated net-new architecture; deferred indefinitely (distinct from Multi-tenant PSSO) |
| CI-3 Managed Apple ID → Managed Apple Account rename | Trigger-gated on Intune portal rebrand adoption; unchanged |
| PowerShell / FastAPI / React code-scaffolding integration | Dormant since v1.5; documentation-only milestone |

## Traceability

Populated during roadmap creation (gsd-roadmapper). Each requirement maps to exactly one phase.

| Requirement | Phase | Status |
|-------------|-------|--------|
| KRB-01 | Phase 83 | Complete |
| KRB-02 | Phase 83 | Complete |
| KRB-03 | Phase 83 | Complete |
| KRB-04 | Phase 83 | Complete |
| GRAPH-01 | Phase 84 | Complete |
| GRAPH-02 | Phase 84 | Complete |
| NUAL-01 | Phase 84 | Complete |
| RUN-01 | Phase 85 | Complete |
| RUN-02 | Phase 85 | Complete |
| REF-01 | Phase 85 | Complete |
| REF-02 | Phase 85 | Complete |
| REF-03 | Phase 87 | Pending |
| CHAIN-01 | Phase 86 | Complete |
| CHAIN-02 | Phase 86 | Complete |
| HARN-01 | Phase 88 | Pending |
| HARN-02 | Phase 88 | Pending |
| HARN-03 | Phase 88 | Pending |

**Coverage:**
- v1 requirements: 17 total
- Mapped to phases: 17/17 ✓
- Unmapped: 0 ✓

---
*Requirements defined: 2026-06-22 after `/gsd-new-milestone` v1.10 (research-first; scope via `/adversarial-review`)*
*Last updated: 2026-06-22 — Traceability filled at roadmap creation (gsd-roadmapper)*
