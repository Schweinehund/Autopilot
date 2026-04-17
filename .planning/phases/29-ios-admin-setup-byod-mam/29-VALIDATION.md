---
phase: 29
slug: ios-admin-setup-byod-mam
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-04-17
---

# Phase 29 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.
> Phase 29 is a documentation phase. Validation is structural pattern-matching on markdown files (frontmatter schema, required sections, cross-reference anchors, privacy-callout format conformance), not code execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Manual review + shell greps (no markdown test runner configured in this repo) |
| **Config file** | none — Wave 0 does not install a runner (see Wave 0 Gaps below) |
| **Quick run command** | `bash .planning/phases/29-ios-admin-setup-byod-mam/validate-quick.sh` (Wave 0 creates this script) |
| **Full suite command** | `bash .planning/phases/29-ios-admin-setup-byod-mam/validate-full.sh` (Wave 0 creates this script) |
| **Estimated runtime** | <5 seconds (grep-based) |

---

## Sampling Rate

- **After every task commit:** Run `validate-quick.sh` — spot-checks the specific file just modified for required sections and frontmatter.
- **After every plan wave:** Run `validate-full.sh` — structural greps for every row in the Per-Task Verification Map.
- **Before `/gsd-verify-work`:** Full suite must be green (every row ✅).
- **Max feedback latency:** 5 seconds.

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 29-TPL-01 | Template Ext | 1 | ABYOD-01/02/03 | — | Template extension documents privacy-limit callout pattern | structural | `grep -i "PRIVACY-LIMIT CALLOUT PATTERN" docs/_templates/admin-template-ios.md` | ❌ W0 | ⬜ pending |
| 29-01-01 | Overview Restructure | 2 | ABYOD-01/02/03 | — | Overview frontmatter widens to `applies_to: all` | format | `head -10 docs/admin-setup-ios/00-overview.md \| grep "applies_to: all"` | ❌ W0 | ⬜ pending |
| 29-01-02 | Overview Restructure | 2 | ABYOD-01/02 | — | Shared Intune Enrollment Restrictions section present | structural | `grep -iE "^## .*Enrollment Restrictions" docs/admin-setup-ios/00-overview.md` | ❌ W0 | ⬜ pending |
| 29-01-03 | Overview Restructure | 2 | ABYOD-01/02/03 | — | Mermaid diagram restructured (non-ADE paths do not chain from ADE prereqs) | review | Manual: confirm no arrow from `03-ade-enrollment-profile` to BYOD nodes | — | ⬜ pending |
| 29-01-04 | Overview Restructure | 2 | ABYOD-01/02/03 | — | BYOD-path prereqs section present (D-09) | structural | `grep -i "BYOD.*prerequisites\|BYOD-path prereqs" docs/admin-setup-ios/00-overview.md` | ❌ W0 | ⬜ pending |
| 29-02-01 | Device Enrollment (ABYOD-01) | 3 | ABYOD-01 | — | File exists with required sections | structural | `test -f docs/admin-setup-ios/07-device-enrollment.md` | ❌ W0 | ⬜ pending |
| 29-02-02 | Device Enrollment (ABYOD-01) | 3 | ABYOD-01 | — | Capabilities Available Without Supervision table at top (D-14) | structural | `grep -i "Capabilities Available Without Supervision" docs/admin-setup-ios/07-device-enrollment.md` | ❌ W0 | ⬜ pending |
| 29-02-03 | Device Enrollment (ABYOD-01) | 3 | ABYOD-01 | — | Both Company Portal AND web-based flows documented (D-12) | content | `grep -ci "web-based\|company portal" docs/admin-setup-ios/07-device-enrollment.md` → ≥4 | ❌ W0 | ⬜ pending |
| 29-02-04 | Device Enrollment (ABYOD-01) | 3 | ABYOD-01 | — | NO privacy-limit callouts (D-18) | negative | `grep -c "Privacy limit:" docs/admin-setup-ios/07-device-enrollment.md` → 0 | ❌ W0 | ⬜ pending |
| 29-02-05 | Device Enrollment (ABYOD-01) | 3 | ABYOD-01 | — | Personal vs corporate ownership flag section (D-16) | structural | `grep -iE "^##.*Ownership\|Personal.*Corporate" docs/admin-setup-ios/07-device-enrollment.md` | ❌ W0 | ⬜ pending |
| 29-02-06 | Device Enrollment (ABYOD-01) | 3 | ABYOD-01 | — | Configuration-Caused Failures with Phase 30 placeholder | format | `grep -c "iOS L1 runbooks (Phase 30)" docs/admin-setup-ios/07-device-enrollment.md` → ≥1 | ❌ W0 | ⬜ pending |
| 29-03-01 | User Enrollment (ABYOD-02) | 3 | ABYOD-02 | — | File exists | structural | `test -f docs/admin-setup-ios/08-user-enrollment.md` | ❌ W0 | ⬜ pending |
| 29-03-02 | User Enrollment (ABYOD-02) | 3 | ABYOD-02 | — | Top-of-doc "Privacy Boundaries on User Enrollment" summary section (D-19) | structural | `grep -i "Privacy Boundaries on User Enrollment" docs/admin-setup-ios/08-user-enrollment.md` | ❌ W0 | ⬜ pending |
| 29-03-03 | User Enrollment (ABYOD-02) | 3 | ABYOD-02 | — | Inline privacy-limit callouts use plain blockquote (D-01/D-02) | format | `grep -cE "^> \*\*Privacy limit:\*\*" docs/admin-setup-ios/08-user-enrollment.md` → ≥5 | ❌ W0 | ⬜ pending |
| 29-03-04 | User Enrollment (ABYOD-02) | 3 | ABYOD-02 | — | No 🔒 or 🛡️ glyph in privacy callouts (D-02) | negative | `grep -E "Privacy limit.*🔒\|Privacy limit.*🛡️" docs/admin-setup-ios/08-user-enrollment.md \| wc -l` → 0 | ❌ W0 | ⬜ pending |
| 29-03-05 | User Enrollment (ABYOD-02) | 3 | ABYOD-02 | — | Privacy-callout link target matches D-03 | format | `grep "Privacy limit" docs/admin-setup-ios/08-user-enrollment.md \| grep -c "ios-lifecycle/00-enrollment-overview.md#user-enrollment"` → = callout count | ❌ W0 | ⬜ pending |
| 29-03-06 | User Enrollment (ABYOD-02) | 3 | ABYOD-02 | — | Profile-based UE deprecation section (D-21) | structural | `grep -iE "profile-based.*deprecat\|deprecat.*profile-based" docs/admin-setup-ios/08-user-enrollment.md` | ❌ W0 | ⬜ pending |
| 29-03-07 | User Enrollment (ABYOD-02) | 3 | ABYOD-02 | — | Managed Apple ID vs personal Apple ID disambiguation (D-22) | content | `grep -ci "managed apple id" docs/admin-setup-ios/08-user-enrollment.md` → ≥2 | ❌ W0 | ⬜ pending |
| 29-03-08 | User Enrollment (ABYOD-02) | 3 | ABYOD-02 | — | At least 5 D-20 privacy boundaries covered (UDID/serial/IMEI, wipe scope, personal app inventory, location, passcode, VPN scope, APFS volume) | content | `grep -ciE "UDID\|serial number\|IMEI\|APFS\|managed volume\|per-app VPN\|managed-content passcode\|personal apps" docs/admin-setup-ios/08-user-enrollment.md` → ≥5 distinct topics | ❌ W0 | ⬜ pending |
| 29-04-01 | MAM-WE (ABYOD-03) | 3 | ABYOD-03 | — | File exists | structural | `test -f docs/admin-setup-ios/09-mam-app-protection.md` | ❌ W0 | ⬜ pending |
| 29-04-02 | MAM-WE (ABYOD-03) | 3 | ABYOD-03 | — | Three-level summary table at top (D-25) | structural | `grep -iE "Level 1.*Level 2.*Level 3\|Enterprise Basic.*Enhanced.*High" docs/admin-setup-ios/09-mam-app-protection.md` | ❌ W0 | ⬜ pending |
| 29-04-03 | MAM-WE (ABYOD-03) | 3 | ABYOD-03 | — | Level 2 AND Level 3 "What breaks if misconfigured" callouts (D-25) | structural | `grep -ciE "What breaks if misconfigured" docs/admin-setup-ios/09-mam-app-protection.md` → ≥2 | ❌ W0 | ⬜ pending |
| 29-04-04 | MAM-WE (ABYOD-03) | 3 | ABYOD-03 | — | Dedicated `## Selective Wipe` section (D-28) near start of operational content | structural | `grep -E "^## Selective Wipe" docs/admin-setup-ios/09-mam-app-protection.md` | ❌ W0 | ⬜ pending |
| 29-04-05 | MAM-WE (ABYOD-03) | 3 | ABYOD-03 | — | Dual-targeting coverage (enrolled AND unenrolled) (D-26) | content | `grep -ciE "enrolled\b.*unenrolled\|unenrolled\b.*enrolled" docs/admin-setup-ios/09-mam-app-protection.md` → ≥2 | ❌ W0 | ⬜ pending |
| 29-04-06 | MAM-WE (ABYOD-03) | 3 | ABYOD-03 | — | No Android references (D-27) | negative | `grep -ci "android" docs/admin-setup-ios/09-mam-app-protection.md` → 0 | ❌ W0 | ⬜ pending |
| 29-04-07 | MAM-WE (ABYOD-03) | 3 | ABYOD-03 | — | Standalone — no required MDM cross-reads (D-24) | review | Manual: every MDM link is optional-deeper-detail, not required to follow core concepts | — | ⬜ pending |
| 29-04-08 | MAM-WE (ABYOD-03) | 3 | ABYOD-03 | — | iOS-specific behaviors section (D-29) | structural | `grep -iE "^## .*iOS-Specific\|App SDK\|Managed Open In" docs/admin-setup-ios/09-mam-app-protection.md` | ❌ W0 | ⬜ pending |
| 29-ALL-01 | All guides | 4 | ABYOD-01/02/03 | — | Frontmatter `last_verified: 2026-04-17` on new files | format | `grep -c "last_verified: 2026-04-17" docs/admin-setup-ios/0[7-9]*.md` → 3 | ❌ W0 | ⬜ pending |
| 29-ALL-02 | All guides | 4 | ABYOD-01/02/03 | — | Frontmatter `review_by: 2026-07-16` (last_verified + 90d) on new files | format | `grep -c "review_by: 2026-07-16" docs/admin-setup-ios/0[7-9]*.md` → 3 | ❌ W0 | ⬜ pending |
| 29-ALL-03 | All guides | 4 | ABYOD-01/02/03 | — | "iOS L1 runbooks (Phase 30)" placeholder used in Configuration-Caused Failures tables | format | `grep -c "iOS L1 runbooks (Phase 30)" docs/admin-setup-ios/0[7-9]*.md` → ≥3 | ❌ W0 | ⬜ pending |
| 29-ALL-04 | All guides | 4 | ABYOD-01/02/03 | — | All relative cross-references resolve | integrity | Wave 0 link-check script iterates `[text](relative/path.md#anchor)` and verifies each target file and anchor exists | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `.planning/phases/29-ios-admin-setup-byod-mam/validate-quick.sh` — per-file structural check wrapper
- [ ] `.planning/phases/29-ios-admin-setup-byod-mam/validate-full.sh` — full structural verification loop iterating every row above
- [ ] `.planning/phases/29-ios-admin-setup-byod-mam/link-check.sh` — cross-reference integrity (resolves relative paths + anchors across `docs/admin-setup-ios/0[7-9]*.md` and `docs/admin-setup-ios/00-overview.md`)

*No markdown test runner installed in this repo; the three shell scripts above constitute Wave 0 for Phase 29. Scripts are plain bash with grep/test primitives — no new dependencies.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Privacy-callout phrasing is neutral-factual, not alarmist (SPECIFICS guidance) | ABYOD-02 | Prose voice cannot be grepped | Read every `> **Privacy limit:**` line in `08-user-enrollment.md`; each must be a factual statement (no "warn", "beware", "cannot spy", value-laden language) |
| MAM-WE standalone-ness — every cross-reference to MDM content is optional, not required | ABYOD-03 | Reading flow judgement | Read `09-mam-app-protection.md` without following any cross-link; confirm every core concept is comprehensible in isolation |
| "Capabilities Available Without Supervision" table answers "can I do X on BYOD?" in <30 seconds | ABYOD-01 | UX judgement (scannability) | Time-boxed reader test: locate 3 capabilities (e.g., app deployment modes, OS update enforcement, silent install) — each found in <30s |
| Mermaid diagram communicates "choose your path," not "do step 7 after step 6" | ABYOD-01/02/03 | Visual comprehension | Render diagram; confirm BYOD/MAM-WE paths are parallel alternatives, not downstream of ADE prereqs |
| Privacy-limit callouts read with end-user-plausible calm tone (SPECIFICS) | ABYOD-02 | Voice judgement | As above for alarmist check — combined single pass |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references (validate-quick.sh, validate-full.sh, link-check.sh)
- [ ] No watch-mode flags
- [ ] Feedback latency < 5s
- [ ] `nyquist_compliant: true` set in frontmatter (toggle once the three Wave 0 scripts exist and pass on empty state)

**Approval:** pending
