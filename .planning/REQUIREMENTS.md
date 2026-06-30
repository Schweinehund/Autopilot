# Requirements: Windows Autopilot & macOS Provisioning Documentation Suite — Milestone v1.14

**Defined:** 2026-06-29
**Milestone:** v1.14 — 802.1X Network Authentication Documentation + Backlog & Tooling Closure
**Core Value:** IT teams can independently provision, troubleshoot, and manage Windows, macOS, iOS/iPadOS, Android, and Linux devices through Microsoft Intune / Entra ID without escalating to engineering.
**Research basis:** `.planning/research/SUMMARY.md` (+ STACK / FEATURES / ARCHITECTURE / PITFALLS), committed `5150fa7`. All Intune settings verified against Microsoft Learn 2026-06-29 (HIGH confidence for Windows/macOS/iOS/Android-Wi-Fi; MEDIUM for Linux EAP-TLS).

---

## Milestone v1.14 Requirements

Requirements for this milestone. Each maps to exactly one roadmap phase (phases 101+). REQ-IDs continue project-wide conventions; numbering restarts per category prefix.

### Pillar A — 802.1X Foundation & Certificates

- [x] **DOT1X-01**: An operator can learn the 802.1X conceptual model (supplicant / authenticator / authentication server; EAPOL; RADIUS exchange) at L1/L2 depth from a new cross-platform foundation guide, with terms minted in a new `docs/_glossary-network.md` (802.1X, EAP, EAPOL, RADIUS, supplicant, SCEP, PKCS, trusted root, server-name validation) and see-also banners added to existing platform glossaries.
- [x] **DOT1X-02**: An admin can choose among the three EAP methods from a co-equal EAP-method overview — EAP-TLS (mutual cert), PEAP-MSCHAPv2 (server-cert + tunneled password), EAP-TTLS (server-cert + configurable inner auth) — including when each is chosen and what the client requires.
- [x] **DOT1X-03**: An admin can follow a certificate-delivery foundation guide establishing the hard deployment ordering (trusted-root profile → SCEP/PKCS client cert → 802.1X network profile), the EKU (Client Authentication) + server-name-validation requirements, and the per-platform cert-delivery support matrix (incl. macOS/iOS wired = SCEP-only / no PKCS; Windows wired adds PFX Import; Linux = no Intune cert delivery), with Cloud PKI noted as an alternative.

### Pillar A — 802.1X Per-Platform Admin Setup

- [x] **DOT1X-04**: An Intune admin can configure 802.1X for **Windows** devices (Wi-Fi + wired) across all three EAP methods, including the `dot3svc` (Wired AutoConfig) service dependency (with a Remediation pattern), the `PerformServerValidation` security requirement, and the SCEP/PKCS/PFX-Import client-cert options.
- [x] **DOT1X-05**: An Intune admin can configure 802.1X for **macOS** devices (Wi-Fi + wired) across all three EAP methods, including the irreversible deployment-channel (user vs device keychain) caveat and the wired-profile SCEP-only / PKCS-not-supported constraint.
- [x] **DOT1X-06**: An Intune admin can configure 802.1X for **iOS/iPadOS** devices (Wi-Fi + wired — wired GA on M-series iPad) across all three EAP methods, including MAC-address-randomization handling for NAC (iOS 14+), the wired SCEP-only constraint, and PEAP inner-auth = MS-CHAPv2.
- [ ] **DOT1X-07**: An Intune admin can configure 802.1X Wi-Fi for **Android Enterprise** devices across all three EAP methods, including the UPN-in-SAN hard requirement (missing → profile deployment fails) and the version-gated RADIUS server-name behavior (Android 11+ required; Android 14+ ≤256 chars / no special chars), with the **no-native-wired-profile gap** documented explicitly (freshness-stamped).
- [ ] **DOT1X-08**: An operator can configure 802.1X on **Linux** (Ubuntu LTS) via the documented script/`nmcli` (NetworkManager `802-1x`) EAP-TLS workaround, with the **no-native-Intune-Wi-Fi/wired/cert-profile reality leading the guide** and PEAP/EAP-TTLS marked out of scope (MEDIUM-confidence callout; verify at plan time).

### Pillar A — 802.1X Troubleshooting Runbooks

- [ ] **DOT1X-09**: An L1 technician can triage 802.1X connection failures via new cross-platform L1 runbooks (#38–41: certificate failure, RADIUS reject, server-trust/validation failure, EAP negotiation failure) routed by a new `docs/decision-trees/10-8021x-triage.md`, with per-platform leaves.
- [ ] **DOT1X-10**: An L2 engineer can investigate 802.1X failures via new L2 runbooks (#31–33: log collection, certificate-chain investigation, RADIUS/EAP investigation) using the per-platform diagnostic-signal map (Windows event channels / macOS logs / Android `adb logcat` / Linux `journalctl` wpa_supplicant — log filters verified at plan time).
- [ ] **DOT1X-11**: A reader can discover all 802.1X content through integrated navigation — Network-Authentication rows in the 5 platform capability matrices + the 4-platform comparison, glossary see-also wiring, and nav-hub entries (`docs/index.md`, `common-issues.md`, `quick-ref-l1.md`, `quick-ref-l2.md`), all committed navigation-last after content lands.

### Pillar B — Corpus Accuracy Fixes (v1.13 deferrals)

- [ ] **FIX-01**: `docs/index.md:108` stale macOS L1-runbook count is corrected to the actual count (≥8 after #35/#36/#37).
- [ ] **FIX-02**: `docs/quick-ref-l1.md:101` (WR-01) surfaces L1 #36 as an L1 "try this first" entry rather than an L2 escalation target; surrounding L1 #37 wiring confirmed.
- [ ] **FIX-03**: `docs/common-issues.md:242-247` (IN-01) inserts the L1 #36 mandatory PSSO re-registration step as an intermediate between L1 #37 (local password reset) and L2 #27 escalation.

### Pillar C — MDM Migration Walkthroughs

- [ ] **MIGF-01**: An admin can follow an iOS/iPadOS ABM "Assign Device Management" + Deadline migration walkthrough (Kandji/Iru → Intune) covering iOS/iPadOS-specific forced-restart + deadline enforcement (vs the macOS full-screen lock) and post-migration enrollment verification.
- [ ] **MIGF-02**: An admin can follow source-MDM-specific release steps for **Jamf Pro + Mosyle** (FileVault key retrieval, Activation Lock bypass, device-record deletion) as an addendum to `docs/macos-lifecycle/02-mdm-migration-psso.md`.

### Pillar D — Validator Tooling Refactors

- [ ] **TOOL-01**: EXEC-FAIL-DETAIL-EXTRACTION-01 — a `scripts/validation/_lib/exec-fail-detail.mjs` helper DRYs the `(stdout + stderr).slice(0, N).trim()` failure-detail pattern duplicated across the CHAIN/AUDIT/helper-spawn wrapper sites.
- [ ] **TOOL-02**: FROZEN-AWARE-ADOPTION-SWEEP-01 — the ~13 inline frozen-aware helpers across `check-phase-{61,67,68,70}.mjs` are refactored to consume the centralized `_lib/frozen-at-close.mjs` module.
- [ ] **TOOL-03**: HELPER-SPAWN-STDERR-01 — the 3 helper-spawn stderr-only catch-block sites in `check-phase-{48,60,61}.mjs` capture both stdout and stderr with a `--self-test` discriminator.

### Pillar E — Audit-Harness Lineage Bump & Milestone Close

- [ ] **HARN-01**: 12th Path-A lineage bump (Atom 1, indivisible) — `v1.14-milestone-audit.mjs` (Path-A from v1.13, C1-C16 inherited verbatim) + `v1.14-audit-allowlist.json` sidecar repointed + BASELINE_18 freshness comment.
- [ ] **HARN-02**: Per-phase validators + frozen pin + CI surface (Atom 2, indivisible) — `check-phase-101..NN.mjs` (chain-apex `CHAIN_PHASES=[48..111]`, 64 entries, `CHAIN_SKIP=new Set([])`) + `_lib/frozen-at-close.mjs` V113 entry (v1.13 close-gate SHA `ba24f1a`) + `audit-harness-v1.14-integrity.yml` as the 11th parallel CI coexistence workflow (predecessors v1.4–v1.13 byte-unchanged).
- [ ] **HARN-03**: 3-axis terminal re-audit (fresh `git clone --no-hardlinks` + cross-OS Linux GHA + fresh zero-context sub-agent) with cross-OS PASS/FAIL/SKIP EXACT MATCH; `v1.14-MILESTONE-AUDIT.md` + `v1.14-DEFERRED-CLEANUP.md` + 4-doc traceability closure (all Validated); predecessor frozen surfaces byte-unchanged.

---

## Future Requirements (deferred — not in this roadmap)

Tracked in `.planning/milestones/v1.13-DEFERRED-CLEANUP.md`; not committed to v1.14.

### Multi-Tenant Platform SSO
- **MTPSSO-01/02/03** + **PSSO-FUT-03**: cross-tenant Platform Credential registration, CA scoping, L2 troubleshooting — net-new architecture, own milestone.

### Kerberos Follow-ons
- **KRBFUT-01**: on-prem-AD-only Kerberos realm deep-dive. **KRBFUT-02**: Azure Files Cloud-Kerberos full coverage at GA.

### Other carried backlog
- **CI-3** (Managed Apple ID → Managed Apple Account rename; trigger-gated on Intune portal), **ASM** education surfaces, Apple Business Device API, per-OU CRD, Account Holder runbook, ARCHIVE-UPSTREAM-01, WINDOWS-CLONE-DEEPNEST-TIMEOUT-01 root-cause O(n²) fix (mitigated; stretch only).

---

## Out of Scope

Explicitly excluded for v1.14. Documented to prevent scope creep.

| Feature | Reason |
|---------|--------|
| RADIUS / NPS server-side build-out (install, connection-request/network policies, server cert issuance) | Locked scope: Intune **client-side** config only; assumes RADIUS/NPS already exists. Client-side server-name/trusted-root validation IS in scope. |
| Network-switch / authenticator config (port auth, VLAN assignment, dynamic ACLs) | Infrastructure layer, not Intune device management. |
| MAB / MAC Authentication Bypass | Non-802.1X fallback; server/switch-side concern. |
| Linux PEAP-MSCHAPv2 / EAP-TTLS | No verifiable Microsoft/vendor source; Linux is script-delivered EAP-TLS only. |
| Android Enterprise **wired** 802.1X full config guide | No native Intune wired-network profile type for Android — documented as an explicit gap stub only (DOT1X-07). |
| Cloud PKI / Intune Certificate Connector deep-dive | Noted as an alternative cert-delivery approach in DOT1X-03; full guide is out of scope. |
| Android AOSP-specific 802.1X depth | AOSP remains a stub in the suite (v1.4); confirm at plan time whether a note suffices. |

---

## Discuss-Phase Flags (gray-area scoping — resolve via /adversarial-review at discuss-phase)

Surfaced by research `SUMMARY.md`; these are roadmap/phase-structure decisions, not requirement-content changes:

1. Cert-delivery (DOT1X-03) as a standalone phase vs absorbed into the Phase-101 foundation.
2. macOS (DOT1X-05) + iOS/iPadOS (DOT1X-06) as one combined phase or two.
3. Android-wired gap (DOT1X-07) depth — one paragraph vs a full "why no profile + alternatives" section.
4. iOS/iPadOS wired — full peer depth vs shorter use-case framing (M-series iPad niche).
5. Linux PEAP/TTLS — strict silent exclusion vs a one-line "out of scope" acknowledgment.
6. Pillar D refactors (TOOL-01/02/03) — one combined phase vs sub-phases.
7. Freshness review cycle — 90-day (Android version-gated) vs 180-day (stable Windows/macOS) `review_by` stamps.
8. New `docs/admin-setup-8021x/00-overview.md` — include an abbreviated 5-platform comparison table vs link-only to capability matrices.

---

## Traceability

Populated at roadmap creation 2026-06-29. Each requirement maps to exactly one phase.

| Requirement | Phase | Status |
|-------------|-------|--------|
| DOT1X-01 | Phase 101 | Complete |
| DOT1X-02 | Phase 101 | Complete |
| DOT1X-03 | Phase 101 | Complete |
| DOT1X-04 | Phase 102 | Complete |
| DOT1X-05 | Phase 103 | Complete |
| DOT1X-06 | Phase 104 | Complete |
| DOT1X-07 | Phase 105 | Pending |
| DOT1X-08 | Phase 106 | Pending |
| DOT1X-09 | Phase 107 | Pending |
| DOT1X-10 | Phase 108 | Pending |
| DOT1X-11 | Phase 109 | Pending |
| FIX-01 | Phase 110 | Pending |
| FIX-02 | Phase 110 | Pending |
| FIX-03 | Phase 110 | Pending |
| MIGF-01 | Phase 110 | Pending |
| MIGF-02 | Phase 110 | Pending |
| TOOL-01 | Phase 111 | Pending |
| TOOL-02 | Phase 111 | Pending |
| TOOL-03 | Phase 111 | Pending |
| HARN-01 | Phase 112 | Pending |
| HARN-02 | Phase 112 | Pending |
| HARN-03 | Phase 112 | Pending |

**Coverage:**
- v1.14 requirements: 22 total
- Mapped to phases: 22/22 ✓
- Unmapped: 0 ✓

**Phase distribution:**
| Phase | Requirements | Count |
|-------|-------------|-------|
| 101 | DOT1X-01, DOT1X-02, DOT1X-03 | 3 |
| 102 | DOT1X-04 | 1 |
| 103 | DOT1X-05 | 1 |
| 104 | DOT1X-06 | 1 |
| 105 | DOT1X-07 | 1 |
| 106 | DOT1X-08 | 1 |
| 107 | DOT1X-09 | 1 |
| 108 | DOT1X-10 | 1 |
| 109 | DOT1X-11 | 1 |
| 110 | FIX-01, FIX-02, FIX-03, MIGF-01, MIGF-02 | 5 |
| 111 | TOOL-01, TOOL-02, TOOL-03 | 3 |
| 112 | HARN-01, HARN-02, HARN-03 | 3 |
| **Total** | | **22** |

---
*Requirements defined: 2026-06-29 after v1.14 research synthesis (`5150fa7`)*
*Traceability populated: 2026-06-29 at roadmap creation*
*Last updated: 2026-06-29 — traceability complete, 22/22 requirements mapped to phases 101-112*
