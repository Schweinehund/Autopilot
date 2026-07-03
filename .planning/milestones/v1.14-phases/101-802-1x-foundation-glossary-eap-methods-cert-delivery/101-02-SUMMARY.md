---
phase: 101-802-1x-foundation-glossary-eap-methods-cert-delivery
plan: 02
subsystem: documentation
tags: [802.1x, eap, eap-tls, peap, eap-ttls, network-auth, foundation]
dependency_graph:
  requires: [101-01]
  provides: [docs/admin-setup-8021x/01-eap-method-overview.md]
  affects: [Phase 102-106 per-platform guides link into this file]
tech_stack:
  added: []
  patterns: [link-not-copy, co-equal-H2-method-sections, blockquote-callouts, mermaid-sequenceDiagram]
key_files:
  created:
    - docs/admin-setup-8021x/01-eap-method-overview.md
  modified: []
decisions:
  - "EAP-TLS / PEAP-MSCHAPv2 / EAP-TTLS presented as co-equal H2 sections with identical four-sub-topic depth (what authenticates / client requires / trust requirements / when chosen) -- no ranking or recommended default (E-06)"
  - "TEAP given H2 heading with single-paragraph body (not co-equal) -- Windows-wired-only awareness deferred to Phase 102"
  - "PEAP Security note callout mandates server validation; default Windows EAP XML skeleton ships disabled -- override required; no disabled-example shown (A-05/C-02)"
  - "Comparison table placed after individual method sections per RESEARCH spec (not before as in macOS 08-auth-methods-deep-dive.md analog)"
  - "Forward reference to 02-cert-delivery-foundation.md for cert delivery content (E-02 link-not-copy split)"
metrics:
  duration: "3 minutes"
  completed: "2026-06-30"
  tasks_completed: 2
  files_created: 1
---

# Phase 101 Plan 02: EAP Method Overview Summary

Co-equal 802.1X EAP-method overview (EAP-TLS mutual-cert / PEAP-MSCHAPv2 server-cert-plus-password / EAP-TTLS server-cert-plus-flexible-inner) with Mermaid EAPOL sequence diagram, four-sub-topic sections per method, security callout for PEAP server-validation requirement, comparison table, single-paragraph TEAP awareness note, and forward reference to cert-delivery foundation.

## What Was Built

Created `docs/admin-setup-8021x/01-eap-method-overview.md` -- the first file in the new `docs/admin-setup-8021x/` folder. This is the canonical EAP-method overview that all five per-platform 802.1X guides (Phases 102-106) link into.

The file delivers:

1. **The 802.1X Three-Actor Model** -- supplicant/authenticator/authentication server explanation with EAPOL flow and a Mermaid `sequenceDiagram` (four-space indent, `->>` requests, `-->>` responses). All terms linked to `_glossary-network.md` anchors; definitions not restated (link-not-copy).

2. **Three co-equal H2 method sections** (`## EAP-TLS`, `## PEAP-MSCHAPv2`, `## EAP-TTLS`) each with H3 sub-sections covering the four mandated sub-topics: what authenticates, what the client requires, trust requirements, when to choose. Sections separated by `---` rules.

3. **PEAP `> **Security note:**`** -- server validation required; default Windows EAP XML skeleton ships disabled; override before deploying. No example or callout showing server validation disabled.

4. **`## EAP Method Comparison` table** -- six property rows (client cert, server cert, inner credential, identity privacy, Intune support, wired support) with equal column treatment across all three methods; Linux footnote for script-based EAP-TLS only.

5. **`## TEAP` single paragraph** -- H2 heading with one paragraph body; explicitly not co-equal; Windows-wired-only awareness pointing to Phase 102.

6. **Forward reference** to `02-cert-delivery-foundation.md` for certificate delivery content (link-not-copy split; no cert content duplicated here).

7. **`## Change History`** table with `2026-06-29 | Initial version` row.

## Commits

| Task | Commit | Description |
|------|--------|-------------|
| Task 1 | ea0461e | feat(101-02): scaffold 01-eap-method-overview with 3-actor model and three co-equal EAP method sections |
| Task 2 | 11e9afe | feat(101-02): add EAP comparison table, TEAP awareness paragraph, and change history |

## Deviations from Plan

None -- plan executed exactly as written.

## Threat Model Compliance

| Threat | Mitigation Status |
|--------|------------------|
| T-101-03: PEAP rogue-RADIUS (server validation) | Mitigated -- `> **Security note:**` in PEAP-MSCHAPv2 section mandates server validation; no disabled-server-validation example anywhere in file |
| T-101-04: EAP mis-selection (co-equal presentation) | Mitigated -- three H2 sections at equal depth; "when to choose" guidance per method; "recommended default" absent; TEAP explicitly not co-equal |

## Known Stubs

None -- all three method sections are fully authored with substantive content. TEAP is intentionally a single paragraph per plan specification (not a stub).

## Threat Flags

None -- static Markdown documentation; no executable surface introduced.

## Self-Check

- [x] `docs/admin-setup-8021x/01-eap-method-overview.md` exists
- [x] Commits ea0461e and 11e9afe present in git log
- [x] All automated verify checks passed (19/19)
