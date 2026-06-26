# Research Summary — v1.11 macOS PSSO End-to-End Provisioning & MDM Migration

**Domain:** Documentation suite — macOS scenario/journey guides
**Researched:** 2026-06-24
**Synthesized:** 2026-06-24
**Confidence:** MEDIUM-HIGH overall

> Synthesized from `.planning/research/{STACK,FEATURES,ARCHITECTURE,PITFALLS}.md` (4 parallel `gsd-project-researcher` agents). The synthesizer agent committed the four source files at SHA `1dd1606`; this SUMMARY was persisted by the orchestrator from the synthesizer's returned synthesis.

---

## Executive Summary

v1.11 is a two-pillar documentation content milestone. **Pillar A** delivers a consolidated end-to-end PSSO provisioning walkthrough covering two delivery paths: standard post-enrollment (all supported macOS) and the new ADE-during-Setup-Assistant zero-click path (macOS 26+, GA as of 2026-06-23). **Pillar B** delivers a Kandji/Iru → Intune MDM migration walkthrough using Apple's OS 26 "Assign Device Management" + Deadline feature (in-place, wipe-free on macOS 26+) plus the pre-macOS-26 retire/wipe/re-enroll fallback. Both pillars close a gap where operators must currently stitch together guides 00, 02, and 07. A new L2 runbook (#30) covers migration-specific failures. The milestone closes with glossary + capability-matrix integration (**Pillar C**) and the 9th Path-A harness lineage bump (**Pillar D**).

Recommended approach: two new scenario docs in `docs/macos-lifecycle/` (`01-psso-provisioning-walkthrough.md`, `02-mdm-migration-psso.md`), L2 runbook at `docs/l2-runbooks/30-macos-mdm-migration-failure.md`, link-not-copy to guides 00/02/07, navigation-last hub wiring in a dedicated phase, and capability-matrix update with atomic V-63-08 blob-hash commit. The 5-phase sequence (89→93) is confirmed by dependency analysis.

Highest-risk area: **PSSO re-registration behavior after MDM migration.** All four researchers reached consensus — PSSO re-registration is ALWAYS required post-migration. Apple's Platform SSO deployment guide is authoritative: "If you unenroll a Mac from the device management service, it also unregisters from the IdP." The OS-26 migration IS a genuine unenroll. Same-tenant key-survival is LOW confidence with no authoritative source and must NOT be relied upon in the docs.

---

## Cross-Researcher Discrepancy Reconciliation

**Discrepancy 1 — Migration enrollment type (STACK vs PITFALLS): RESOLVED.**
Both are correct and compatible. The OS-26 migration IS a genuine unenroll + reenroll. On macOS, this reenrollment results in **profile-based enrollment** (not ADE re-enrollment) from Intune's perspective — Apple's business guide states this explicitly. The **ACME cert IS reissued** because it is a genuine re-enrollment. Residual uncertainty: whether Intune requires explicit profile-based enrollment configuration to receive the migrated device — flagged as a HIGH open gap for Phase 90.

**Discrepancy 2 — PSSO survival through migration: RESOLVED as FIRM guidance.**
PSSO re-registration is **ALWAYS** required after MDM migration (Apple authoritative: MDM unenrollment triggers IdP unregistration). The same-tenant key-survival hypothesis (LOW confidence) must NOT appear in the docs as a possible outcome. Post-migration PSSO re-registration is a mandatory documented step, not conditional on tenant match.

---

## Authoritative Facts the Docs MUST Cite

| Fact | Value | Confidence |
|------|-------|------------|
| OS gate: in-place ABM migration | macOS 26 / iOS 26 / iPadOS 26 (hard gate) | HIGH |
| OS gate: ADE-during-SA PSSO | macOS 26 (hard gate) | HIGH |
| ABM feature name | "Assign Device Management" | HIGH |
| Deadline range | 1–90 days | HIGH |
| Deadline-miss lock: macOS | Non-dismissible full-screen prompt | HIGH |
| Wipe required (OS-26 path)? | NO — wipe-free | HIGH |
| macOS post-migration enrollment type | Profile-based enrollment (NOT ADE re-enrollment) | HIGH |
| Pre-macOS-26 migration | Retire + wipe + re-enroll required | HIGH |
| CP version: standard PSSO | 5.2404.0 | HIGH |
| CP version: ADE-during-SA PSSO | 5.2604.0 LOB (NOT VPP) | HIGH |
| Three-policy same-group rule | PSSO catalog + CP LOB + ADE profile → same Assigned static user groups | HIGH |
| SmartCard in ADE-during-SA | NOT supported | HIGH |
| ADE-during-SA misconfiguration recovery | Wipe required — no in-place fix | HIGH |
| PSSO survival through migration | ALWAYS requires re-registration (Apple authoritative) | HIGH |
| Verify PSSO state | `app-sso platform -s` → `Device Registration: REGISTERED` + `User Registration: REGISTERED` | HIGH |
| Kandji → Iru rebrand | October 2025; support portal URL unchanged (support.kandji.io) | HIGH |
| V-63-08 baseline (capability matrix) | `73f16378197223378a8507a6751c763902de58db` (verify on authoring day) | HIGH |

---

## Feature Coverage — Table Stakes / Differentiators / Anti-Features

**Table stakes (must-have):** Ordered stage lists for all 4 walkthroughs (A1 standard post-enrollment, A2 ADE-during-SA, B1 OS-26 in-place migration, B2 pre-26 fallback); Kandji/Iru source-side release steps; ABM deadline mechanics + notification cadence; post-migration PSSO re-registration as a mandatory step; L2 #30 three failure tracks; `app-sso platform -s` verification gates at every applicable stage; glossary entries; navigation integration.

**Differentiators (should-have):** Pre-migration readiness checklist; deadline-window guidance; VPP/location-token migration step explicitly sequenced before the device deadline; `last_verified` freshness stamps on all macOS-26-gated sections (`review_by: 2026-09-24`); pilot-device recommendation before fleet deadline; front-matter path-divergence table per walkthrough.

**Anti-features (defer / out of scope):** Multi-tenant PSSO; SmartCard ADE-during-SA; Apple Configurator provisional device migration; iOS/iPadOS PSSO depth; on-prem-AD-only Kerberos; Azure Files Cloud-Kerberos GA; building Intune from scratch; re-documenting guide 00/02/07 settings inline.

**Ordered stages (condensed):**
- **A1 (standard, 8 stages):** enrollment profile → PSSO Settings Catalog policy → Company Portal (5.2404.0+ VPP) → ADE Setup Assistant (Entra credential at Stage 4) → Await Configuration → desktop + "Registration Required" → user completes MFA (WPJ SE key written) → verify `app-sso platform -s`.
- **A2 (ADE-during-SA, macOS 26+):** diverges at Company Portal (5.2604.0+ **LOB**, not VPP) + three-policy same-static-group rule + `EnableRegistrationDuringSetup` → PSSO registers inside Setup Assistant (no desktop notification). Misconfig recovery = wipe.
- **B1 (OS-26 in-place, 9 stages):** fleet assessment (OS gate) → Intune readiness (ADE token, PSSO policy, CA exclusion, TLS exemptions) → secret retrieval from Kandji/Iru (FileVault keys / bypass codes — BEFORE deletion) → Kandji/Iru source-side release (Delete Device Record; agent removes profiles ~15 min) → ABM "Assign Device Management" → set Deadline (1–90 days) → user notification window → deadline enforcement (non-dismissible) → post-migration policy delivery + FileVault key rotation → mandatory PSSO re-registration → verify.
- **B2 (pre-26 fallback, 5 stages):** OS gate → secret retrieval → retire/wipe in Kandji/Iru → ADE re-enroll via Intune → standard PSSO path from scratch.

---

## Architecture Decisions (confirmed)

- **File placement:** `docs/macos-lifecycle/01-psso-provisioning-walkthrough.md` + `docs/macos-lifecycle/02-mdm-migration-psso.md` (NOT a new `scenarios-macos/` dir — `*-lifecycle/` is the cross-platform journey-doc convention; `admin-setup-macos/` is per-setting reference only).
- **L2 runbook:** `docs/l2-runbooks/30-macos-mdm-migration-failure.md` (next in global sequence after #29). `l2-runbooks/00-index.md` extension is a **content-phase** edit (internal hub), per v1.10 Phase 85 precedent.
- **Both new docs:** `audience: all` frontmatter (multi-role).
- **Handoff junction:** migration walkthrough (02) ends exactly where provisioning walkthrough (01) begins, at the PSSO re-registration / "Registration Required" stage. Explicit bidirectional cross-link required at that junction.
- **Capability matrix:** new Migration row under `## Enrollment` in `macos-capability-matrix.md`, **atomic commit with V-63-08 hash update**; pre-edit anchor-inventory artifact first (Phase 85 Plan 85-01 precedent). `4-platform-capability-comparison.md` macOS cells updated link-not-copy (its own blob-hash atomic constraint — confirm governing validator before plan authoring).
- **Reciprocal "See Also"** edits to existing content files (00-ade-lifecycle, 07-platform-sso-setup, 02-enrollment-profile, L2 #27) are **content-phase** edits, NOT navigation-last. Only the four top-level nav hubs (`docs/index.md`, `common-issues.md`, `quick-ref-l2.md`, `decision-trees/06-macos-triage.md`) are navigation-last targets.

---

## Watch Out For (top pitfalls, with owning phase)

1. **PSSO re-registration mandatory post-migration** (Phase 90) — Apple authoritative: unenrollment = IdP unregistration. Document as a required step; `app-sso platform -s` verification gate mandatory.
2. **Deadline miss = non-dismissible full-screen lock** (Phase 90 + L2 #30) — pilot one device first; set deadline only after the Intune enrollment profile is ready; document ABM admin release recovery (MEDIUM confidence on exact recovery steps).
3. **Pre-macOS-26 wipe required; `profiles renew` is NOT a shortcut** (Phase 90) — macOS queries ABM only during Setup Assistant after a wipe; document explicitly in the pre-26 fallback.
4. **Three-policy same-static-group rule for ADE-during-SA** (Phase 89) — dynamic groups and device groups both break it; misconfig recovery = wipe. Highest-risk misconfiguration — most prominent callout.
5. **V-63-08 blob-hash desync** (Phase 91) — capability-matrix edit must be atomic with the hash update; baseline `73f16378197223378a8507a6751c763902de58db`.
6. **Navigation-last invariant** (Phase 92) — no nav-hub edits until all content files confirmed committed.
7. **Link-not-copy** (Phases 89–90) — no duplication of guide 00/02/07 content in the scenario guides.
8. **Freshness stamps** (Phases 89–90) — every OS-26-gated section needs `last_verified: 2026-06-24` / `review_by: 2026-09-24`.
9. **Predecessor guides 00/02/07 frozen** for v1.11 — new context belongs in new files only.

---

## Roadmap Implications — Suggested 5 Phases (89–93)

1. **Phase 89 — PSSO Provisioning Walkthrough (Pillar A)** — no v1.11 content dependencies. Delivers `docs/macos-lifecycle/01-psso-provisioning-walkthrough.md` (both delivery paths) + See Also appended to guides 00/07/02. *Research-phase recommended:* verify ADE-during-SA GA + CP 5.2604.0 floor on authoring day.
2. **Phase 90 — Migration Walkthrough + L2 #30 (Pillar B)** — depends on Phase 89 committed. Delivers `docs/macos-lifecycle/02-mdm-migration-psso.md` + `docs/l2-runbooks/30-macos-mdm-migration-failure.md` + L2 #30 row in `00-index.md` + See Also to L2 #27. *Research-phase recommended:* verify Iru console steps; resolve the HIGH open gap (Intune profile-based-enrollment config for migrated macOS 26 devices); pilot supervision-status check.
3. **Phase 91 — Glossary + Capability Matrix (Pillar C content)** — depends on 89+90. Glossary terms (MDM Migration / Assign Device Management / Deadline; Kandji→Iru rebrand note) + `macos-capability-matrix.md` migration row (atomic V-63-08) + `4-platform-capability-comparison.md` cells.
4. **Phase 92 — Navigation Hub Integration (Pillar C, NAV-LAST)** — all 89–91 committed first. `docs/index.md`, `common-issues.md`, `quick-ref-l2.md`, `decision-trees/06-macos-triage.md`.
5. **Phase 93 — Harness Lineage Bump + 3-Axis Terminal Re-Audit + Milestone Close (Pillar D)** — Atom 1 + Atom 2 two-atomic-commit pattern; 9th Path-A lineage; frozen-aware V110 pin; 3-axis re-audit (fresh clone + cross-OS Linux GHA + fresh sub-agent); `v1.11-MILESTONE-AUDIT.md` + `v1.11-DEFERRED-CLEANUP.md`.

---

## Open Gaps / Plan-Time Verification Flags

1. **HIGH:** Does Intune require explicit profile-based enrollment configuration to receive OS-26-migrated macOS devices? (Apple says result is profile-based; unclear if Intune needs config beyond ADE token assignment.) → Phase 90.
2. **MEDIUM:** Current Iru console device-deletion steps post-rebrand (support portal not fetchable during research). → Phase 90.
3. **MEDIUM:** Supervision status preserved post-migration (pilot-device verification required before stating as fact). → Phase 90.
4. **MEDIUM:** Pre-26-ABM-enrolled devices one-time-reset requirement (community-only; document with MEDIUM-confidence callout). → Phase 90.
5. **LOW:** ABM exact button label ("Assign Device Management" vs "Re-assign…"); verify in portal. → Phase 90.
6. **LOW:** macOS 26 / CP 5.2604.0 final GA confirmation; verify on authoring day; add `last_verified` stamps. → Phases 89–90.

---

## Out of Scope (reaffirmed)

Multi-tenant PSSO (MTPSSO-01/02/03; own architectural milestone) · on-prem-AD-only Kerberos deep-dive (KRBFUT-01) · Azure Files Cloud-Kerberos GA (KRBFUT-02) · iOS/iPadOS PSSO depth · building Intune from scratch · re-documenting guide 00/02/07 settings inline.

---

## Ready for Requirements

All four research files committed at SHA `1dd1606`. The 5-phase sequence (89–93) and the discrepancy reconciliations above are the primary inputs for requirements definition and the roadmapper.
