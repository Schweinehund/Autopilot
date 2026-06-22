# Phase 81 — SSO Cross-Link Closure Checklist (SC4 / SSOREF-04)

**Artifact type:** Planning-directory verification artifact — NOT part of the `docs/` corpus (D-02).
**Phase:** 81 — Nav Hub Integration
**Requirement:** SSOREF-04
**Created:** 2026-06-22
**Status:** ALL 8 EDGES PRESENT — SC4 SATISFIED

---

## Purpose

This checklist is the **authoritative SC4 closure record** for Phase 81. The frozen v1.8 audit
harness does NOT crawl internal links or anchor targets (harness-blind). Therefore this checklist
and the Routing Verification table additions to `docs/decision-trees/06-macos-triage.md` (Plan
81-02) are the **only safety nets** for the 8 SSO cross-link edges (E1–E8) until Phase 82.

Phase 82's C17 adversarial-review decides whether these edges become a blocking harness check.

---

## Edge Enumeration (ROADMAP line 531 order)

ROADMAP SC4 verbatim: `07→glossary (E1), glossary→07 (E2), 07→capability-matrix#authentication (E3), capability-matrix→07 (E4), 35→27 escalation (E5), 27→35 back-link (E6), 03-config-profiles→07 (E7), 00-ade-lifecycle→07 (E8)`

| Edge | Definition | Phase Delivered | Status | Evidence (file:line) | Link string | Resolved? |
|------|-----------|----------------|--------|----------------------|-------------|-----------|
| E1 | `07→glossary` | Phase 76 | PRESENT (pre-existing) | `docs/admin-setup-macos/07-platform-sso-setup.md:15` and `:142` | `[Platform SSO](../_glossary-macos.md#platform-sso)` | [x] |
| E2 | `glossary→07` | Phase 81 Plan 03 | PRESENT (created 81-03) | `docs/_glossary-macos.md:128` | `[Platform SSO Setup Guide](admin-setup-macos/07-platform-sso-setup.md)` | [x] |
| E3 | `07→capability-matrix#authentication` | Phase 81 Plan 03 | PRESENT (created 81-03) | `docs/admin-setup-macos/07-platform-sso-setup.md:147` | `[macOS Capability Matrix — Authentication](../reference/macos-capability-matrix.md#authentication)` | [x] |
| E4 | `capability-matrix→07` | Phase 81 Plan 03 | PRESENT (created 81-03) | `docs/reference/macos-capability-matrix.md:120` | `[Platform SSO Setup Guide](../admin-setup-macos/07-platform-sso-setup.md)` | [x] |
| E5 | `35→27 escalation` | Phase 80 | PRESENT (pre-existing) | `docs/l1-runbooks/35-macos-sso-sign-in-failure.md:98` | `[macOS Platform SSO Investigation (L2 #27)](../l2-runbooks/27-macos-sso-investigation.md)` | [x] |
| E6 | `27→35 back-link` | Phase 80 | PRESENT (pre-existing) | `docs/l2-runbooks/27-macos-sso-investigation.md:191` | `[L1 Runbook 35: macOS Platform SSO Sign-In Failure](../l1-runbooks/35-macos-sso-sign-in-failure.md)` | [x] |
| E7 | `03-config-profiles→07` | Phase 76 | PRESENT (pre-existing) | `docs/admin-setup-macos/03-configuration-profiles.md:168` | `[07-platform-sso-setup.md](07-platform-sso-setup.md)` | [x] |
| E8 | `00-ade-lifecycle→07` | Phase 81 Plan 03 | PRESENT (created 81-03) | `docs/macos-lifecycle/00-ade-lifecycle.md:395` | `[Platform SSO Setup](../admin-setup-macos/07-platform-sso-setup.md)` | [x] |

**All 8 checkboxes: [x] RESOLVED. Zero unresolved edges.**

---

## Verification Detail

### E1 — `07→glossary` (PRESENT — pre-existing, Phase 76)

- **Source:** `docs/admin-setup-macos/07-platform-sso-setup.md:15`
  ```
  This guide walks an Intune administrator through configuring [Platform SSO](../_glossary-macos.md#platform-sso) on macOS
  ```
- **Also at `:142`:**
  ```
  - [Platform SSO](../_glossary-macos.md#platform-sso)
  ```
- **Anchor target:** `docs/_glossary-macos.md` heading `### Platform SSO` at line 123 — slug `#platform-sso` resolves.

### E2 — `glossary→07` (PRESENT — created Phase 81 Plan 03)

- **Source:** `docs/_glossary-macos.md:128`
  ```
  > See also: [Enterprise SSO Plug-in](#enterprise-sso-plug-in); [Entra ID SSO](_glossary.md#entra-id-sso); [Platform SSO Setup Guide](admin-setup-macos/07-platform-sso-setup.md).
  ```
- **Target:** `docs/admin-setup-macos/07-platform-sso-setup.md` — file exists.
- **Delivery note:** Appended to the existing `> See also:` blockquote in the Platform SSO term entry; existing targets preserved.

### E3 — `07→capability-matrix#authentication` (PRESENT — created Phase 81 Plan 03)

- **Source:** `docs/admin-setup-macos/07-platform-sso-setup.md:147`
  ```
  - [macOS Capability Matrix — Authentication](../reference/macos-capability-matrix.md#authentication) -- macOS vs Windows auth-method capability comparison and hardware/version gates
  ```
- **Anchor target:** `docs/reference/macos-capability-matrix.md:100` — heading `## Authentication` — slug `#authentication` resolves (GitHub-flavored Markdown).

### E4 — `capability-matrix→07` (PRESENT — created Phase 81 Plan 03)

- **Source:** `docs/reference/macos-capability-matrix.md:120`
  ```
  - [Platform SSO Setup Guide](../admin-setup-macos/07-platform-sso-setup.md) -- step-by-step Platform SSO configuration (Settings Catalog payload, registration flow)
  ```
- **Target:** `docs/admin-setup-macos/07-platform-sso-setup.md` — file exists.

### E5 — `35→27 escalation` (PRESENT — pre-existing, Phase 80)

- **Source:** `docs/l1-runbooks/35-macos-sso-sign-in-failure.md:98`
  ```
  See [macOS Platform SSO Investigation (L2 #27)](../l2-runbooks/27-macos-sso-investigation.md) for PSSO registration and Password-sync failure investigation.
  ```
- **Target:** `docs/l2-runbooks/27-macos-sso-investigation.md` — file exists.

### E6 — `27→35 back-link` (PRESENT — pre-existing, Phase 80)

- **Source:** `docs/l2-runbooks/27-macos-sso-investigation.md:191`
  ```
  - [L1 Runbook 35: macOS Platform SSO Sign-In Failure](../l1-runbooks/35-macos-sso-sign-in-failure.md) — escalation source (registration not appearing / sign-in failure)
  ```
- **Target:** `docs/l1-runbooks/35-macos-sso-sign-in-failure.md` — file exists.

### E7 — `03-config-profiles→07` (PRESENT — pre-existing, Phase 76)

- **Source:** `docs/admin-setup-macos/03-configuration-profiles.md:168`
  ```
  Continue with Platform SSO setup in [07-platform-sso-setup.md](07-platform-sso-setup.md).
  ```
- **Target:** `docs/admin-setup-macos/07-platform-sso-setup.md` — file exists (same directory as source).

### E8 — `00-ade-lifecycle→07` (PRESENT — created Phase 81 Plan 03)

- **Source:** `docs/macos-lifecycle/00-ade-lifecycle.md:395`
  ```
  - [Platform SSO Setup](../admin-setup-macos/07-platform-sso-setup.md) -- Configure macOS Platform SSO authentication via the Settings Catalog `com.apple.extensiblesso` payload
  ```
- **Target:** `docs/admin-setup-macos/07-platform-sso-setup.md` — file exists.
- **Delivery note:** Appended as a bullet to the "Related Guides:" list after the `[Documentation Hub]` bullet.

---

## Harness Blind-Spot Note

The frozen v1.8 harness (`scripts/validation/v1.8-milestone-audit.mjs`) does NOT crawl internal
links or anchor targets. C13 only checks the broken-link allowlist sidecar entry count. C16 checks
4 hardcoded Apple-Business endpoints. **All Phase-81 edges are harness-invisible.**

Safety nets for these edges until Phase 82:
1. This closure checklist (planning-dir — not published).
2. The Routing Verification table additions in `docs/decision-trees/06-macos-triage.md` (Plan 81-02).

**Phase 82 C17 decision:** The adversarial-review at Phase 82 plan time determines whether
`check-phase-81.mjs` adds a blocking link-crawl check for these 8 edges. That is a Phase-82-owned
scope decision; the Phase-81 closure record is this file.

---

## SC4 Verdict

**SC4 SATISFIED.** All 8 SSO-E edges (E1–E8) are PRESENT in the corpus with confirmed file:line
evidence. Four edges (E1/E5/E6/E7) were pre-existing from Phases 76/80; four edges (E2/E3/E4/E8)
were created in Phase 81 Plan 03 as one-line additive cross-links. No deferred-gap rows remain.

---

*Phase 81 — Nav Hub Integration*
*Completed: 2026-06-22*
