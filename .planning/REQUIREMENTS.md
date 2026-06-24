# Requirements: macOS PSSO End-to-End Provisioning & MDM Migration (v1.11)

**Defined:** 2026-06-24
**Core Value:** IT teams can independently provision and migrate macOS devices to Intune with Platform SSO — following a single operator-followable journey from enrollment profile through delivery to a PSSO-registered end user, and migrating fleets from Kandji/Iru without escalating to engineering.

**Research basis:** `.planning/research/SUMMARY.md` (+ STACK / FEATURES / ARCHITECTURE / PITFALLS, committed `1dd1606`) — MEDIUM-HIGH confidence; sources Microsoft Learn (Intune Apple ADE overview; ADE-during-Setup-Assistant PSSO updated 2026-06-15/06-23; sync restrictions), Apple Platform Deployment ("Migrate managed devices" `dep4acb2aa44`), the Intune OS-26 migration blog (`techcommunity` 4439895), Apple Platform SSO deployment guide, and Kandji/Iru support docs.

**Scope decided via `/gsd-new-milestone` questioning (2026-06-24):**
- **Delivery paths:** BOTH the standard post-enrollment path AND the ADE-during-Setup-Assistant zero-click path (macOS 26+)
- **Migration source:** Kandji/Iru (Kandji's 2026 rebrand) source-side steps; ABM "Assign Device Management" + Deadline is MDM-agnostic on the Apple side
- **OS scope:** BOTH the macOS 26+ in-place migration AND the pre-macOS-26 retire/wipe-and-re-enroll fallback
- **Doc strategy:** new consolidated scenario docs (link-not-copy to guides 00/02/07); walkthrough troubleshooting is cross-link-only
- **Migration triage:** a NEW dedicated L2 migration-failure runbook (#30)
- **Harness:** continue the Path-A lineage (9th bump, v1.10→v1.11) + 3-axis terminal re-audit close

**Reconciled research facts (firm guidance for authoring):**
- OS-26 in-place migration is a **genuine unenroll + reenroll** (NOT a profile swap); on Intune's side the result is **profile-based enrollment**; the **ACME cert is reissued** on reenroll.
- **PSSO re-registration is ALWAYS required post-migration** (Apple authoritative: MDM unenrollment = IdP unregistration). Same-tenant key survival is LOW-confidence and must NOT be relied upon in the docs.

---

## v1 Requirements

Requirements for milestone v1.11. Each maps to exactly one roadmap phase.

### macOS PSSO Provisioning Walkthrough (PROV)

- [x] **PROV-01**: An operator can follow a single consolidated walkthrough (`docs/macos-lifecycle/01-psso-provisioning-walkthrough.md`) to provision a Mac end-to-end for the **standard post-enrollment path** — enrollment profile → assignment → delivery → Setup Assistant → desktop → "Registration Required" → end-user PSSO registration → verify — using the per-stage "what the admin sees / what the user sees / how to verify" structure mirrored from guide `00`
- [x] **PROV-02**: The walkthrough documents the **ADE-during-Setup-Assistant** zero-click PSSO path (macOS 26+ hard gate) — Company Portal **5.2604.0 LOB** floor (not VPP), `EnableRegistrationDuringSetup`, the **three-policy same-Assigned-static-user-group** rule, SmartCard exclusion, and **wipe-only** misconfiguration recovery — with a prominent OS-26 gate callout
- [x] **PROV-03**: The walkthrough opens with a **path-divergence selector/table** (standard post-enrollment vs ADE-during-SA) and threads `app-sso platform -s` → `Device Registration: REGISTERED` / `User Registration: REGISTERED` verification gates at each applicable stage; the **user-affinity-only** scope (userless devices never register) is called out
- [x] **PROV-04**: The walkthrough cross-links **link-not-copy** to guides `00`/`02`/`07` and to L1 #35/#36 + L2 #27 for failures (no inline troubleshooting), with reciprocal "See Also" links added to guides `00`/`02`/`07` (content-phase edits, NOT navigation-last)

### Kandji/Iru → Intune MDM Migration Walkthrough (MIG)

- [ ] **MIG-01**: An operator can follow a single consolidated walkthrough (`docs/macos-lifecycle/02-mdm-migration-psso.md`) to migrate Macs from Kandji/Iru into Intune via Apple Business Manager **"Assign Device Management" + Deadline** (macOS 26+ in-place, **wipe-free**) — including a pre-migration readiness checklist (OS gate, ADE token, PSSO policy, VPP/location-token sequencing, sync timing) and an **OS≥26-vs-OS<26 path selector** at the top, with deadline mechanics (1–90 day range, notification cadence, non-dismissible enforcement)
- [ ] **MIG-02**: The walkthrough documents the **pre-macOS-26 fallback** (retire/wipe-and-re-enroll through Setup Assistant), explicitly stating that `profiles renew` is **NOT** a no-wipe shortcut for ADE devices
- [ ] **MIG-03**: The walkthrough documents **Kandji/Iru source-side steps** — secret retrieval (FileVault keys / Activation Lock bypass) **BEFORE** deletion, Delete Device Record, and ~15-min agent profile auto-removal — surfacing both the **Kandji** and **Iru** (Oct-2025 rebrand) names
- [ ] **MIG-04**: The walkthrough documents **mandatory post-migration PSSO re-registration** (genuine unenroll → IdP unregistration; Secure Enclave key re-created against the new tenant; ACME cert reissued; "Registration Required" notification) with `app-sso platform -s` verification, and **bidirectionally cross-links** the provisioning walkthrough (`01`) at the shared PSSO-registration handoff junction

### L2 Migration-Failure Runbook (RUN)

- [ ] **RUN-01**: An L2 engineer can investigate MDM-migration failures via a new runbook (`docs/l2-runbooks/30-macos-mdm-migration-failure.md`) — three failure tracks: **deadline lockout** (non-dismissible full-screen) + ABM admin recovery, **profile-not-delivered / enrollment-failed** (leftover source-MDM agent), and **PSSO re-registration stuck** — with macOS log-collection prerequisites (L2 #10); indexed in `l2-runbooks/00-index.md` (content-phase internal hub edit)

### Reference Integration (REF)

- [ ] **REF-01**: `_glossary-macos.md` (+ reciprocal `_glossary.md` see-also) gain **MDM Migration**, **"Assign Device Management"**, and **Deadline** entries, plus a **Kandji→Iru rebrand** note
- [ ] **REF-02**: `docs/reference/macos-capability-matrix.md` gains an **MDM-migration coverage row** under the **pre-edit anchor-inventory** convention, committed **atomically** with the `check-phase-63.mjs` **V-63-08 blob-hash** baseline update (`73f16378197223378a8507a6751c763902de58db` baseline; verify on authoring day); `4-platform-capability-comparison.md` macOS cells updated **link-not-copy**

### Navigation Integration (NAV)

- [ ] **NAV-01**: Navigation hubs integrate the two new walkthroughs + L2 #30 **navigation-last** (after all content files confirmed committed) — `docs/index.md`, `docs/common-issues.md`, `docs/quick-ref-l2.md`, and the `docs/decision-trees/06-macos-triage.md` migration leaf

### Audit Harness & Milestone Close (HARN)

- [ ] **HARN-01**: `v1.11-milestone-audit.mjs` + `v1.11-audit-allowlist.json` ship as Path-A copies from v1.10 (C1-C16 inherited) + `BASELINE_15` freshness comment in `regenerate-supervision-pins.mjs` (**Atom 1**, indivisible)
- [ ] **HARN-02**: Per-phase `check-phase-89..NN.mjs` validators ship as deliverables + `_lib/frozen-at-close.mjs` gains a **`V110`** entry (v1.10 close-gate SHA `a3617e9`, pinned BEFORE any validator is authored — confirm SHA at Phase 93) + `audit-harness-v1.11-integrity.yml` ships as the **8th** parallel CI coexistence workflow (predecessors v1.4–v1.10 byte-unchanged) (**Atom 2**, indivisible)
- [ ] **HARN-03**: 3-axis terminal re-audit (Axis 1 fresh `git clone --no-hardlinks` + Axis 2 cross-OS Linux GHA + Axis 3 fresh zero-context sub-agent; cross-OS PASS/FAIL/SKIP-count **EXACT MATCH**) + `v1.11-MILESTONE-AUDIT.md` + `v1.11-DEFERRED-CLEANUP.md` + 4-doc traceability closure (PROJECT / ROADMAP / STATE / REQUIREMENTS)

## v2 Requirements

Deferred but tracked. Moving v2 → v1 requires a roadmap update.

### Multi-tenant Platform SSO (MTPSSO) — own architectural milestone

- **MTPSSO-01**: Cross-tenant Platform Credential registration models (one macOS fleet, multiple Entra tenants)
- **MTPSSO-02**: Multi-tenant Conditional Access / compliance scoping for PSSO
- **MTPSSO-03**: Multi-tenant PSSO L2 troubleshooting

### Kerberos extensions (KRBFUT)

- **KRBFUT-01**: On-prem-AD-only (non-Entra) Kerberos realm deep-dive beyond the Intune/Entra-scoped baseline
- **KRBFUT-02**: Azure Files Cloud-Kerberos full coverage (promote from limited-preview callout once GA)

### Migration follow-ons (MIGFUT)

- **MIGFUT-01**: iOS/iPadOS MDM migration walkthrough (forced-restart + mandatory-enrollment deadline behavior differs from macOS full-screen lock) — deferred; v1.11 is macOS-scoped
- **MIGFUT-02**: Jamf Pro / Mosyle / other source-MDM-specific release steps — deferred; v1.11 documents Kandji/Iru source-side only (the ABM-side migration is MDM-agnostic)
- **MIGFUT-03**: Apple Configurator provisional / non-ABM device migration paths

## Out of Scope

Explicitly excluded. Documented to prevent scope creep.

| Feature | Reason |
|---------|--------|
| Multi-tenant Platform SSO (MTPSSO-01/02/03) | Net-new architecture requiring its own planning surface; deferred to its own milestone |
| On-prem-AD-only Kerberos deep-dive / Azure Files Cloud-Kerberos GA | Out of v1.11 scope (KRBFUT-01/02); Kerberos shipped in v1.10 guide 10 at the Intune/Entra baseline |
| iOS/iPadOS PSSO + iOS/iPadOS migration depth | v1.11 is macOS-scoped; iOS migration deadline behavior differs (MIGFUT-01) |
| SmartCard via ADE-during-Setup-Assistant | Not supported on that path (Apple/Intune); documented as an exclusion, not coverage |
| Re-documenting guide 00/02/07 settings inline | Link-not-copy — the new scenario docs stitch the journey, they do not duplicate per-setting reference |
| Building Intune / ADE from scratch | Already covered by existing admin-setup guides; the walkthroughs assume an established Intune ADE baseline |
| Jamf/Mosyle/other source-MDM-specific steps | v1.11 documents Kandji/Iru source-side only (MIGFUT-02) |
| CI-3 Managed Apple ID → Managed Apple Account rename | Trigger-gated on Intune portal rebrand adoption; unchanged |
| PowerShell / FastAPI / React code-scaffolding integration | Dormant since v1.5; documentation-only milestone |

## Traceability

Populated during roadmap creation (gsd-roadmapper). Each requirement maps to exactly one phase.

| Requirement | Phase | Status |
|-------------|-------|--------|
| PROV-01 | Phase 89 | Active |
| PROV-02 | Phase 89 | Active |
| PROV-03 | Phase 89 | Active |
| PROV-04 | Phase 89 | Active |
| MIG-01 | Phase 90 | Active |
| MIG-02 | Phase 90 | Active |
| MIG-03 | Phase 90 | Active |
| MIG-04 | Phase 90 | Active |
| RUN-01 | Phase 90 | Active |
| REF-01 | Phase 91 | Active |
| REF-02 | Phase 91 | Active |
| NAV-01 | Phase 92 | Active |
| HARN-01 | Phase 93 | Active |
| HARN-02 | Phase 93 | Active |
| HARN-03 | Phase 93 | Active |

**Coverage:**
- v1 requirements: 15 total
- Mapped to phases: 15/15 (roadmap complete 2026-06-24)
- Unmapped: 0

---
*Requirements defined: 2026-06-24 after `/gsd-new-milestone` v1.11 (research-first; 4 parallel researchers + synthesis at `1dd1606`)*
