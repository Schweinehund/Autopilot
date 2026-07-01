---
phase: 108-l2-runbooks-31-33-decision-tree-10
plan: "02"
subsystem: docs/l2-runbooks
tags: [802.1x, l2-runbook, certificate-investigation, cross-platform, scep, eku, san]
dependency_graph:
  requires: [108-01]
  provides: [DOT1X-10-SC2]
  affects: [docs/l2-runbooks/33-8021x-radius-eap-investigation.md, docs/decision-trees/10-8021x-triage.md]
tech_stack:
  added: []
  patterns: [D-01-hybrid-structure, link-not-copy, 90-day-freshness-stamps, colon-separator-headings]
key_files:
  created:
    - docs/l2-runbooks/32-8021x-cert-investigation.md
  modified: []
decisions:
  - "H2 headings use colon separators (## Windows: Certificate Inspection) per anchor-slug discipline — avoids double-hyphen trap from em-dash"
  - "macOS keychain-location note kept to one sentence + link to 04-macos.md — Pitfall 6 not restated"
  - "Linux cert paths sourced from nmcli connection show 802-1x.* — only nmcli on-device approach (no Intune SCEP profile per Phase 106 D-01)"
  - "SCEP Profile Deployment Status table placed as shared H2 section after per-platform subsections, before the EKU/SAN/Expiry checklist"
metrics:
  duration: "3m"
  completed: "2026-07-01"
  tasks: 1
  files: 1
---

# Phase 108 Plan 02: 802.1X Certificate-Chain Investigation (#32) Summary

**One-liner:** Cross-platform L2 certificate-chain investigation runbook covering certutil/security/openssl/nmcli cert inspection per platform, SCEP profile status, and shared EKU/SAN/expiry checklist with link-not-copy to cert-delivery foundation.

## What Was Built

Created `docs/l2-runbooks/32-8021x-cert-investigation.md` — the 802.1X L2 certificate-chain
investigation runbook (SC2, DOT1X-10). The file implements the D-01 hybrid structure: shared
investigation-flow prose (platform-agnostic validation sequence) followed by five per-platform
deep-dive subsections, a SCEP profile deployment status table, and a shared EKU/SAN/expiry
checklist.

### Key content delivered

- **Frontmatter:** `platform: windows+macos+ios+android+linux`, `audience: L2`,
  `applies_to: both`, `last_verified: 2026-07-01`, `review_by: 2026-09-29`
- **Context:** two entry conditions (Intune Error/Pending vs Succeeded-but-failing);
  Before-starting link to #31; From-L1-escalation routing naming L1 #38
- **Investigation Overview:** three-step shared sequence (portal → cert store → CAPI2)
  with link-not-copy reference to cert-delivery ordering rule
- **Windows:** `certutil -v -silent -store MY`, `certutil -v -silent -user -store MY`,
  `certutil -v -silent -store ROOT`, `certutil -verify -urlfetch`; CAPI2 cross-reference
  to #31 enable procedure
- **macOS:** `security find-certificate -a -Z`, `security find-certificate -a -c ... -p`,
  `openssl x509 -in ... -text -noout`, `security verify-cert -c`; keychain-location NOTE
  (one sentence + link to 04-macos.md — Pitfall 6 boundary honored)
- **iOS/iPadOS:** Intune portal SCEP status (Device configuration → Trusted Certificate +
  SCEP/PKCS profile), delivery timestamp path, on-device Settings > VPN & Device Management
- **Android:** Intune portal SCEP status (primary), on-device Settings > Security >
  Encryption & credentials (limited), adb OMADM log (`adb logcat -s "omadm" "SyncML"`) with
  WARNING covering USB debugging prerequisites
- **Linux:** `nmcli connection show <name>` (802-1x.client-cert, 802-1x.ca-cert,
  802-1x.identity, 802-1x.eap), `openssl x509 -in ... -text -noout`,
  `openssl verify -CAfile ...`; NOTE that SCEP profile status is N/A (script-deployed)
- **SCEP Deployment Status table:** portal paths for all five platforms
- **EKU/SAN/Expiry Checklist:** four-row table (EKU OID `1.3.6.1.5.5.7.3.2`, SAN,
  expiry, issuer chain) with link-not-copy reference to 02-cert-delivery-foundation.md
- **Related Resources + Version History**

## Task Commits

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Author #32 cross-platform 802.1X L2 certificate-chain investigation runbook | 349e72e | docs/l2-runbooks/32-8021x-cert-investigation.md |

## Deviations from Plan

None — plan executed exactly as written.

## Known Stubs

None. The runbook does not contain placeholder text, hardcoded empty values, or components
with no data source. All Intune portal paths and CLI commands are complete and actionable.
iOS/iPadOS and Android limited on-device inspection is not a stub — it is the documented
constraint of those platforms (no device-side cert inspection commands).

## Threat Flags

None. This plan authors a single Markdown documentation file. No executable code, no new
network endpoints, no auth paths, no schema changes. The documented commands (certutil,
security, openssl, nmcli) are read-only cert-inspection operations.

## Self-Check: PASSED

- [x] `docs/l2-runbooks/32-8021x-cert-investigation.md` exists
- [x] Commit 349e72e present in git log
- [x] Automated grep gate: all 11 checks passed (platform, audience, #31 link, foundation link, OID, certutil, security find-certificate, openssl x509, no Important, no {#)
- [x] Additional checks passed: nmcli connection show, -store MY, -store ROOT, all five platform H2 headings with colon separators
