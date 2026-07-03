---
phase: 101-802-1x-foundation-glossary-eap-methods-cert-delivery
verified: 2026-06-29T00:00:00Z
status: passed
score: 4/4 roadmap success criteria verified; 8/8 plan must-have truths verified; 3/3 requirements satisfied
overrides_applied: 0
---

# Phase 101: 802.1X Foundation — Glossary, EAP Methods & Cert Delivery Verification Report

**Phase Goal:** Operators and admins have the conceptual model, EAP-method co-equal overview, and cert-delivery ordering prerequisites that all five per-platform guides link into — without which any per-platform guide authoring violates link-not-copy.
**Verified:** 2026-06-29
**Status:** PASSED
**Re-verification:** No — initial verification

---

## Goal Achievement

### Observable Truths (ROADMAP Success Criteria)

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| SC1 | `docs/_glossary-network.md` lets a reader learn the 3-actor model (supplicant / authenticator / authentication server), EAPOL, and RADIUS; see-also banners wired into all existing platform glossaries pointing to it | ✓ VERIFIED | File has H3s for all five terms with definitions. `_glossary.md`, `_glossary-macos.md`, `_glossary-android.md`, `_glossary-linux.md` each carry `> **802.1X / Network authentication:**` banner linking to `_glossary-network.md` |
| SC2 | `01-eap-method-overview.md` presents EAP-TLS, PEAP-MSCHAPv2, EAP-TTLS as co-equal paths (no recommended default), including what each requires from the client and when each is selected | ✓ VERIFIED | Three `## ` sections at equal H2; each has "What the Client Requires" and "When to Choose" sub-sections; intro states "No method is ranked or recommended as a default"; "recommended default" absent from file |
| SC3 | `02-cert-delivery-foundation.md` documents the hard ordering rule (trusted-root → SCEP/PKCS client cert → network profile), EKU (Client Authentication) requirement, RADIUS server-name validation, and the per-platform cert-delivery support matrix (incl. macOS/iOS wired = SCEP-only / no PKCS; Windows wired adds PFX Import; Linux = no Intune cert delivery), with Cloud PKI noted as an alternative | ✓ VERIFIED | `> **CRITICAL — Deployment ordering:**` callout with 3-step numbered sequence present; `## EKU Requirement: Client Authentication` states OID 1.3.6.1.5.5.7.3.2 and Access-Reject consequence; `## RADIUS Server-Name Validation` present with Android 11+/14+ constraints; `## Per-Platform Cert-Delivery Support Matrix` has all 5 platforms and DOT1X-03 cells; `## Cloud PKI (Alternative)` present |
| SC4 | The Intune-client-side-only scope-callout template is present in the foundation and reusable by per-platform guides | ✓ VERIFIED | `## Canonical Scope Callout` section in `02-cert-delivery-foundation.md` has full exclusion list (RADIUS/NPS, ADCS/NDES, Certificate Connector, switch/AP port config, MAB, Conditional Access, EAP-SIM/EAP-FAST/LEAP/TEAP); one-line fenced markdown banner template references `#canonical-scope-callout` |

**Score:** 4/4 roadmap success criteria verified.

---

### Plan Must-Have Truths (All Plans Combined)

| # | Truth (source plan) | Status | Evidence |
|---|---------------------|--------|----------|
| 1 | A reader can learn the 802.1X 3-actor model, EAPOL, and RADIUS from `_glossary-network.md` | ✓ VERIFIED | `### supplicant`, `### authenticator`, `### authentication server`, `### EAPOL`, `### RADIUS` all present with full definitions |
| 2 | All 13 platform-neutral network-auth terms are defined with exact GitHub auto-slug anchors (incl. `#inner-outer-identity`, `#8021x`, `#eku-client-authentication`) | ✓ VERIFIED | `grep -c '^### '` returns 13; alphabetical index contains `[802.1X](#8021x)`, `[inner-outer identity](#inner-outer-identity)`, `[EKU (Client Authentication)](#eku-client-authentication)`; heading is `### inner-outer identity` (hyphen, not slash — no double-hyphen trap) |
| 3 | No platform-specific term (dynamic trust dialog, dot3svc, NAC, wpa_supplicant, nmcli) appears in the neutral glossary | ✓ VERIFIED | None of these strings found in `_glossary-network.md`; "NAC" appears only as the standard IEEE abbreviation within the `### 802.1X` definition body — protocol-level reference, not a platform-specific term |
| 4 | EAP-TLS, PEAP-MSCHAPv2, EAP-TTLS presented as co-equal paths each with what authenticates / client requirements / trust requirements / when chosen | ✓ VERIFIED | All three have `### What Authenticates`, `### What the Client Requires`, `### Trust Requirements`, `### When to Choose` sub-sections |
| 5 | Comparison table summarizes the three methods; TEAP appears as one awareness paragraph only (no H2, not co-equal) | ✓ VERIFIED | `## EAP Method Comparison` table present; TEAP is a bold inline paragraph within the comparison section with no `## TEAP` heading — correctly not co-equal |
| 6 | No example or callout shows server validation disabled | ✓ VERIFIED | `> **Security note:**` describes the dangerous default but does not show a disabled-validation example; no `PerformServerValidation=false` in any file |
| 7 | Hard deployment ordering rule as prominent CRITICAL callout; EKU, server-name validation, Cloud PKI, per-platform cert matrix with DOT1X-03 cells | ✓ VERIFIED | All sections present with correct content (see SC3 above) |
| 8 | Canonical Intune-client-side-only scope callout defined once with full exclusion list plus one-line banner template for downstream guides | ✓ VERIFIED | `## Canonical Scope Callout` with seven exclusion categories; fenced `markdown` block contains the one-line banner template |

---

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `docs/_glossary-network.md` | 13 terms, 3 H2 groups, 5-field front-matter, one-way domain-coverage banner | ✓ VERIFIED | Exists, 13 H3 terms, front-matter fields correct (`last_verified: 2026-06-29`, `review_by: 2026-09-27`, `applies_to: both`, `audience: all`, `platform: all`) |
| `docs/admin-setup-8021x/01-eap-method-overview.md` | Co-equal EAP overview, Mermaid sequenceDiagram, comparison table | ✓ VERIFIED | Exists; Mermaid `sequenceDiagram` block present; three co-equal H2 sections; comparison table present |
| `docs/admin-setup-8021x/02-cert-delivery-foundation.md` | Canonical scope callout, ordering rule, cert-profile sections, EKU, RADIUS, Cloud PKI, cert matrix | ✓ VERIFIED | Exists; all sections present; correct front-matter |
| `docs/admin-setup-8021x/00-overview.md` | Thin A2 nav: Mermaid graph LR, two linked entries, wired-gap flag, scope link | ✓ VERIFIED | Exists; `graph LR` with unlinked placeholder `C[3–7. Platform Guides]` node; two numbered linked entries; wired-gap blockquote; `#canonical-scope-callout` link |
| `docs/_glossary.md` (modified) | See-also banner + bumped freshness | ✓ VERIFIED | `> **802.1X / Network authentication:**` banner present; `last_verified: 2026-06-29`, `review_by: 2026-09-27` |
| `docs/_glossary-macos.md` (modified) | See-also banner + bumped freshness (covers iOS/iPadOS — D-11) | ✓ VERIFIED | Banner present; freshness bumped; no `_glossary-ios.md` created |
| `docs/_glossary-android.md` (modified) | See-also banner + bumped freshness + `phase_46_wave2_retrofit` preserved | ✓ VERIFIED | Banner present; freshness bumped; `phase_46_wave2_retrofit: 2026-04-25` preserved |
| `docs/_glossary-linux.md` (modified) | See-also banner + bumped freshness | ✓ VERIFIED | Banner present; freshness bumped |
| `docs/_glossary-ios.md` | Must NOT exist (D-11 — iOS see-also covered by `_glossary-macos.md`) | ✓ VERIFIED | File does not exist |

---

### Key Link Verification

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| `_glossary.md`, `_glossary-macos.md`, `_glossary-android.md`, `_glossary-linux.md` | `_glossary-network.md` | `> **802.1X / Network authentication:**` blockquote banner | ✓ WIRED | All four glossaries carry the one-directional banner; no back-links from network glossary |
| `01-eap-method-overview.md` | `_glossary-network.md` term anchors | Prerequisites banner + inline term links | ✓ WIRED | Prerequisites banner links to `../_glossary-network.md`; inline links to `#8021x`, `#eap`, `#radius`, `#supplicant`, `#authentication-server`, `#inner-outer-identity`, `#scep`, `#pkcs`, `#trusted-root`, `#server-name-validation` |
| `01-eap-method-overview.md` | `02-cert-delivery-foundation.md` | Forward-reference link in EAP Method Comparison section | ✓ WIRED | `For certificate delivery requirements ... see [02-cert-delivery-foundation.md](02-cert-delivery-foundation.md)` |
| `02-cert-delivery-foundation.md` | `_glossary-network.md#scep` etc. | Prerequisites banner + inline term links | ✓ WIRED | Banner links to `../_glossary-network.md#scep`; inline links to `#trusted-root`, `#scep`, `#pkcs`, `#eku-client-authentication`, `#server-name-validation` |
| `00-overview.md` | `02-cert-delivery-foundation.md#canonical-scope-callout` | Scope sentence | ✓ WIRED | `See [full scope exclusion list](02-cert-delivery-foundation.md#canonical-scope-callout)` |
| `00-overview.md` | `../_glossary-network.md` | Guide scope blockquote | ✓ WIRED | Links to network glossary for protocol terminology |

---

### Anchor Resolution

| Anchor Referenced | Heading in File | GitHub Auto-Slug | Status |
|-------------------|-----------------|------------------|--------|
| `#8021x` | `### 802.1X` in `_glossary-network.md` | `802.1x` → strip `.` → `8021x` | ✓ RESOLVES |
| `#inner-outer-identity` | `### inner-outer identity` | `inner-outer-identity` | ✓ RESOLVES |
| `#eku-client-authentication` | `### EKU (Client Authentication)` | strip `()` → `eku-client-authentication` | ✓ RESOLVES |
| `#canonical-scope-callout` | `## Canonical Scope Callout` | `canonical-scope-callout` | ✓ RESOLVES |
| `#scep`, `#pkcs`, `#trusted-root`, `#radius`, `#eap`, `#eapol`, `#supplicant`, `#authenticator`, `#authentication-server`, `#server-name-validation` | Corresponding `### ` headings | Standard auto-slug | ✓ ALL RESOLVE |

---

### CONTEXT.md Locked Decision Verification

| Decision | Rule | Status | Evidence |
|----------|------|--------|----------|
| A2 | `00-overview.md` carries descriptive one-liners only — NO capability table | ✓ HELD | File has two numbered entries with descriptions; wired-gap flag only; no EAP-method or cert-type capability cells |
| D-01 / D-02 | Only wired-availability gap flag permitted at entry point | ✓ HELD | `> **Wired 802.1X availability note:**` present; no capability table |
| B3 | Concise asymmetry matrix with exactly DOT1X-03 cells | ✓ HELD | 5-platform × 6-column matrix; macOS/iOS wired PKCS = NOT supported; Windows wired adds PFX Import; Linux = no Intune cert delivery |
| C3 | Canonical scope callout defined once in foundation; one-line banner template for downstream guides | ✓ HELD | `## Canonical Scope Callout` in `02-`; fenced banner template present |
| D-08 | 13 terms (DOT1X-01 floor of 9 + authenticator + authentication server + EKU + inner-outer identity) | ✓ HELD | Exactly 13 H3 terms verified |
| D-09 | Platform-specific terms (dynamic trust dialog, NAC-specifics, dot3svc, wpa_supplicant, nmcli) OUT of neutral glossary | ✓ HELD | None of these strings present in `_glossary-network.md` |
| D-10 | One-directional see-also banners only (existing platform glossaries → network glossary; no back-links) | ✓ HELD | Banners present in 4 platform glossaries; no reciprocal back-links in `_glossary-network.md` |
| D-11 | iOS see-also banner lands in `_glossary-macos.md`; `_glossary-ios.md` must not be created | ✓ HELD | `_glossary-macos.md` has banner; `_glossary-ios.md` does not exist |

---

### Code Review Findings — Confirmed Fixed

| Finding | Severity | Fix Required | Status |
|---------|----------|-------------|--------|
| CR-01: Linux* in PEAP-MSCHAPv2 Intune support cell (false capability claim) | Critical | Remove `/ Linux*` from PEAP-MSCHAPv2 column | ✓ FIXED — current row reads `Win / macOS / iOS / Android` for PEAP-MSCHAPv2 and EAP-TTLS; only EAP-TLS retains `Linux*` |
| WR-01: PKCS glossary entry inconsistent (omitted macOS/iOS Wi-Fi support) | Warning | Align with cert matrix | ✓ FIXED — entry now states "supported for 802.1X Wi-Fi on Windows, macOS, iOS/iPadOS, and Android Enterprise, and additionally for wired profiles on Windows" |
| WR-02: iOS/iPadOS PFX Import cell had stray "non-AOSP" qualifier (Android artifact) | Warning | Remove `, non-AOSP` from iOS row | ✓ FIXED — iOS/iPadOS PFX Import cell now reads `Wi-Fi only` |
| WR-03: PFX Import vs PKCS Imported column conflation | Warning | Add clarifying note or split column | ✓ FIXED — `> **Column note:**` blockquote added explaining PFX Import (Windows wired) vs PKCS Imported (cross-platform Wi-Fi) |
| IN-01: Inconsistent inline freshness-stamp placement | Info | Standardize | ✓ FIXED — standardized on YAML front-matter only across all three guide files; inline stamp removed from `02-` |
| IN-02: "Highest assurance posture" EAP-TLS bullet (soft ranking) | Info | Reframe situationally | ✓ FIXED — now reads "Passwordless, certificate-only authentication is a requirement" |

---

### Requirements Coverage

| Requirement | Phase | Description | Status | Evidence |
|-------------|-------|-------------|--------|----------|
| DOT1X-01 | 101 | 3-actor model + EAPOL + RADIUS learnable from `_glossary-network.md`; 9 terms minted; see-also banners in all platform glossaries | ✓ SATISFIED | `_glossary-network.md` with 13 terms (DOT1X-01 floor of 9 plus 4 additional); all four platform glossaries have one-way banners |
| DOT1X-02 | 101 | Co-equal EAP-method overview (EAP-TLS / PEAP-MSCHAPv2 / EAP-TTLS) with when-chosen and client-requirements | ✓ SATISFIED | `01-eap-method-overview.md` with three co-equal H2 sections, Mermaid diagram, comparison table, no default ranking |
| DOT1X-03 | 101 | Cert-delivery foundation: ordering rule, EKU, server-name validation, per-platform cert matrix (macOS/iOS wired = SCEP-only; Windows wired adds PFX Import; Linux = no Intune cert delivery); Cloud PKI noted | ✓ SATISFIED | `02-cert-delivery-foundation.md` with all required sections; matrix carries exactly the DOT1X-03 cells; column note clarifies PFX Import asymmetry |

**Orphaned requirements:** None. DOT1X-04 through DOT1X-11, FIX-01/02/03, MIGF-01/02, TOOL-01/02/03, HARN-01/02/03 are mapped to later phases (102–112) per REQUIREMENTS.md traceability table.

---

### Harness Validator Note

`check-phase-101.mjs` is authored in Phase 112 (HARN-02), not in Phase 101. Its absence is expected and is NOT a gap. The frozen `v1.13-audit-allowlist.json` is byte-unchanged (git diff returns empty). Phase 112 will recompute allowlist offsets accounting for the +1 line shift in `_glossary-android.md` from the see-also banner insertion.

---

### Anti-Patterns Found

No debt markers (TBD, FIXME, XXX), placeholder text, or hollow implementations found in any of the 8 files modified by this phase. The one grep hit in `_glossary.md` at line 65 matched "Admin" as part of an event-log path within an existing term definition — not a debt marker.

---

### Behavioral Spot-Checks

**SKIPPED** — Documentation-only phase. No runnable entry points; spot-checks do not apply.

### Probe Execution

**SKIPPED** — No probes declared in PLAN files; conventional probe path `scripts/*/tests/probe-*.sh` not applicable to a documentation phase.

### Human Verification Required

None. All assertions are structural and textual — verifiable by grep and file inspection.

---

## Final Verdict

All four ROADMAP success criteria are VERIFIED. All eight plan must-have truths across Plans 101-01 through 101-05 are VERIFIED. All three requirements (DOT1X-01, DOT1X-02, DOT1X-03) are SATISFIED. All six code-review findings (CR-01, WR-01, WR-02, WR-03, IN-01, IN-02) are confirmed fixed. All locked CONTEXT.md decisions (A2, B3, C3, D-08 through D-11) are held. No debt markers found. Frozen `v1.13-audit-allowlist.json` is byte-unchanged.

**Phase 101 goal is achieved.** The foundation glossary, co-equal EAP-method overview, and cert-delivery foundation file are complete, internally consistent, cross-linked, and ready to serve as the link-not-copy root for per-platform guides (Phases 102–106).

---

_Verified: 2026-06-29_
_Verifier: Claude (gsd-verifier)_
