---
phase: 101-802-1x-foundation-glossary-eap-methods-cert-delivery
plan: "03"
subsystem: documentation
tags: [802.1X, cert-delivery, EAP, SCEP, PKCS, scope-callout, ordering-rule, EKU, server-name-validation, Cloud-PKI, per-platform-matrix]
dependency_graph:
  requires: [101-01, 101-02]
  provides: [DOT1X-03, SC3, SC4, canonical-scope-callout]
  affects: [Phases 102-106 per-platform guides, Phase 109 integration]
tech_stack:
  added: []
  patterns: [link-not-copy, freshness-stamps, canonical-scope-callout-banner-template, 90-day-review-cadence]
key_files:
  created:
    - docs/admin-setup-8021x/02-cert-delivery-foundation.md
  modified: []
decisions:
  - "Scope callout homed in 02-cert-delivery-foundation.md (C3/D-06) -- single canonical definition with #canonical-scope-callout anchor for Phases 102-106 to banner-link"
  - "Deployment ordering rule placed as first substantive section with CRITICAL callout for maximum prominence (A-01)"
  - "Inline freshness stamp on Android 11+/14+ server-name content (version-gated content requires per-section stamp)"
  - "Cloud PKI noted as alternative CA backend without full configuration guide (B3/D-04 -- noted not guided)"
  - "Per-platform cert matrix homed exclusively here (B3) -- single source of truth; downstream guides link back"
metrics:
  duration: "3 minutes"
  completed: "2026-06-29"
  tasks_completed: 3
  files_created: 1
  files_modified: 0
---

# Phase 101 Plan 03: Certificate Delivery Foundation Summary

## One-Liner

Cert-delivery foundation with canonical SC4 scope callout + CRITICAL ordering rule + EKU/server-name/Cloud-PKI sections + B3 per-platform cert asymmetry matrix (macOS/iOS wired = SCEP-only, Windows wired adds PFX Import, Linux = no Intune cert delivery).

## What Was Built

Created `docs/admin-setup-8021x/02-cert-delivery-foundation.md` -- the single source of truth for:

- **SC4 Canonical Scope Callout** (`## Canonical Scope Callout`, anchor `#canonical-scope-callout`): full D-07 exclusion list (RADIUS/NPS config, ADCS/NDES, Certificate Connector, switch/AP port config, MAB, Conditional Access, EAP-SIM/EAP-FAST/LEAP/TEAP-as-a-path) plus one-line banner template for Phases 102-106
- **SC3 Deployment Ordering Rule** (`## The Deployment Ordering Rule`): prominent `> **CRITICAL — Deployment ordering:**` callout as first substantive section; numbered three-step sequence; silent Intune "Succeeded" + live-auth-failure warning
- **Cert-profile sections**: Trusted Root, SCEP (with EKU OID 1.3.6.1.5.5.7.3.2, Android UPN-in-SAN note), PKCS, PFX Import (Windows-wired-only)
- **EKU Requirement section**: OID 1.3.6.1.5.5.7.3.2; missing EKU → Access-Reject failure mode documented
- **RADIUS Server-Name Validation section**: always-populate mandate; Android 11+ required; Android 14+ 256-char/no-special-chars constraint; inline freshness stamp dated 2026-06-29
- **Cloud PKI (Alternative) section**: noted as managed CA backend alternative; full config out of scope
- **B3 Per-Platform Cert-Delivery Support Matrix**: all five platforms x six columns; bolded asymmetry cells; key asymmetry bullet list; `> **Boundary:**` callout deferring UI detail to Phases 102-106

## Commits

| Task | Description | Commit |
|------|-------------|--------|
| Task 1 | Scaffold + SC4 scope callout + banner template + CRITICAL ordering rule | 8c3e4f8 |
| Task 2 | Cert-profile sections + EKU + RADIUS server-name validation + Cloud PKI | b975964 |
| Task 3 | Per-platform cert matrix (B3) + boundary note + change history | fcc5a23 |

## Decisions Made

- **C3/D-06 home:** Canonical scope callout lives in `02-cert-delivery-foundation.md` under `## Canonical Scope Callout` with anchor `#canonical-scope-callout`; per-platform guides use the one-line banner template to link here
- **A-01 prominence:** `## The Deployment Ordering Rule` is placed immediately after the banner template, before all cert-profile sections -- it is the first substantive section
- **Version-gated freshness:** Android 11+/14+ server-name constraints carry inline freshness blockquote (`> *Freshness: last verified 2026-06-29 ...*`) per RESEARCH.md §House-Style Conventions
- **B3 matrix home:** The per-platform cert asymmetry table lives exclusively in this file; all five per-platform guides link back rather than reproducing it (link-not-copy)
- **Cloud PKI altitude:** Referenced as an alternative CA backend; configuration out of scope; no per-phase steps -- respects foundation altitude

## Deviations from Plan

None -- plan executed exactly as specified. All three tasks completed in order, each verified and committed individually.

## Compliance Checks

- **E-01 (No RADIUS/NPS config steps):** PASS -- no RADIUS/NPS configuration steps appear anywhere in the file
- **A-05/C-02 (No server validation disabled):** PASS -- no examples showing server validation disabled
- **E-02 (No per-platform UI walk-throughs):** PASS -- file stays at foundation altitude throughout
- **T-101-05 (Ordering rule prominence):** PASS -- `> **CRITICAL — Deployment ordering:**` is first substantive section
- **T-101-06 (Scope exclusion list):** PASS -- full D-07 exclusion list present in `## Canonical Scope Callout`
- **T-101-07 (Banner anchor):** PASS -- banner template references `#canonical-scope-callout` literal slug

## Known Stubs

None -- all sections are fully authored at foundation altitude. Per-platform UI detail is intentionally deferred to Phases 102-106 (not a stub -- it is a link-not-copy boundary).

## Threat Flags

None -- static documentation only. The three STRIDE threats from the plan threat model are all mitigated:
- T-101-05: CRITICAL ordering callout present as first substantive section
- T-101-06: Full exclusion list present; no RADIUS/NPS steps
- T-101-07: Banner template uses literal `#canonical-scope-callout` slug

## Self-Check: PASSED

- `docs/admin-setup-8021x/02-cert-delivery-foundation.md` exists: CONFIRMED
- Commit 8c3e4f8 exists: CONFIRMED (Task 1)
- Commit b975964 exists: CONFIRMED (Task 2)
- Commit fcc5a23 exists: CONFIRMED (Task 3)
- All 22 verification grep checks: PASSED
