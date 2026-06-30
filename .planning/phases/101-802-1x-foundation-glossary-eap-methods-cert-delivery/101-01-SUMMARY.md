---
phase: 101-802-1x-foundation-glossary-eap-methods-cert-delivery
plan: 01
subsystem: docs-glossary
tags: [802.1X, glossary, platform-neutral, EAP, RADIUS, certificate-delivery]
dependency_graph:
  requires: []
  provides: [docs/_glossary-network.md, "#8021x, #eap, #eapol, #radius, #supplicant, #authenticator, #authentication-server, #scep, #pkcs, #trusted-root, #server-name-validation, #eku-client-authentication, #inner-outer-identity"]
  affects: [Phase-101-02, Phase-101-03, Phase-101-04, Phase-101-05, Phases-102-106]
tech_stack:
  added: []
  patterns: [link-not-copy, navigation-last, freshness-front-matter, GitHub-auto-slugs, blockquote-callout-convention]
key_files:
  created: [docs/_glossary-network.md]
  modified: []
decisions:
  - "Used protocol-level definition for supplicant (trimmed platform-implementation list) to pass D-09 verification check excluding wpa_supplicant/dot3svc from neutral glossary"
  - "Heading written as '### inner-outer identity' (hyphen) to produce slug #inner-outer-identity; conventional shorthand 'inner/outer' noted in definition body"
metrics:
  duration: "2m 35s"
  completed: "2026-06-29"
  tasks_completed: 2
  tasks_total: 2
  files_created: 1
  files_modified: 0
---

# Phase 101 Plan 01: Network Authentication Glossary Summary

**One-liner:** Platform-neutral 802.1X network-auth glossary (13 terms: 3-actor model, EAPOL, RADIUS, EAP, inner-outer identity, SCEP/PKCS/trusted-root/EKU/server-name-validation) in `docs/_glossary-network.md` with correct GitHub auto-slug anchors.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Scaffold glossary + Protocol Actors + Authentication Methods | b483c77 | docs/_glossary-network.md (created, 8 terms) |
| 2 | Certificate Delivery group + change history | e240138 | docs/_glossary-network.md (5 terms + change history) |

## Verification Results

- `docs/_glossary-network.md` exists with valid 5-field freshness front-matter (`last_verified: 2026-06-29`, `review_by: 2026-09-27`, `applies_to: both`, `audience: all`, `platform: all`)
- Exactly 13 `### ` term headings across the file (DOT1X-01 floor satisfied)
- Heading `### inner-outer identity` (hyphen not slash) produces slug `#inner-outer-identity` — confirmed
- Index is a single pipe-separated line in A-Z order; `[802.1X](#8021x)` leads, `[inner-outer identity](#inner-outer-identity)` present
- Three H2 groups: `## 802.1X Protocol Actors` (5 terms), `## Authentication Methods` (3 terms), `## Certificate Delivery` (5 terms)
- No platform-specific forbidden terms (`dynamic trust dialog`, `wpa_supplicant`, `nmcli`, `dot3svc`) present
- No `{#id}` overrides anywhere in the file
- `docs/_glossary-ios.md` NOT created (D-11 satisfied)

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 2 - Platform-neutrality] Trimmed supplicant definition body to exclude wpa_supplicant/dot3svc**

- **Found during:** Task 1
- **Issue:** The verbatim RESEARCH.md definition for `supplicant` included "Platform implementations: Windows uses the WLAN-AutoConfig service (Wi-Fi) and Wired AutoConfig (dot3svc) service (wired); ... Linux uses wpa_supplicant or NetworkManager..." — this would have caused the Task 1 automated verification check (`! grep -qi 'wpa_supplicant\|dot3svc'`) to fail.
- **Fix:** Replaced the platform-specific implementation list with a generic sentence ("Each platform implements the supplicant role in its native networking stack; the protocol behavior is identical across platforms.") consistent with D-09's platform-neutral principle.
- **Files modified:** docs/_glossary-network.md
- **Commit:** b483c77

No other deviations. Plan executed as specified for all other 12 term definitions, front-matter, blockquote banner, index format, heading style, see-also cross-links, and change history.

## Known Stubs

None. The glossary is fully wired — all 13 terms have definitions sourced from RESEARCH.md (HIGH confidence, verified 2026-06-29). No placeholder text, TODO markers, or empty definition bodies.

## Self-Check: PASSED

- [x] `docs/_glossary-network.md` exists: CONFIRMED
- [x] Commit b483c77 exists: CONFIRMED (`git log --oneline | grep b483c77`)
- [x] Commit e240138 exists: CONFIRMED (`git log --oneline | grep e240138`)
- [x] H3 count = 13: CONFIRMED
- [x] `### inner-outer identity` heading: CONFIRMED (1 occurrence)
- [x] No forbidden terms: CONFIRMED
- [x] `_glossary-ios.md` not created: CONFIRMED
