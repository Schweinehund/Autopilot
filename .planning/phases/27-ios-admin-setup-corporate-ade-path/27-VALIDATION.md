---
phase: 27
slug: ios-admin-setup-corporate-ade-path
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-04-16
---

# Phase 27 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | grep/bash (documentation validation — no executable test framework) |
| **Config file** | none — documentation phase |
| **Quick run command** | `grep -r "Supervised only" docs/admin-setup-ios/ --include="*.md"` |
| **Full suite command** | `bash -c 'grep -rn "Supervised only" docs/admin-setup-ios/ --include="*.md" && grep -rn "ios-lifecycle/00-enrollment-overview.md#supervision" docs/admin-setup-ios/ --include="*.md" && ls docs/admin-setup-ios/{00-overview,01-apns-certificate,02-abm-token,03-ade-enrollment-profile}.md'` |
| **Estimated runtime** | ~2 seconds |

---

## Sampling Rate

- **After every task commit:** Run quick grep for supervised-only callout consistency
- **After every plan wave:** Run full suite command (file existence + pattern checks)
- **Before `/gsd-verify-work`:** Full suite must be green
- **Max feedback latency:** 2 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 27-01-01 | 01 | 1 | — | — | N/A | file check | `test -f docs/_templates/admin-template-ios.md` | ❌ W0 | ⬜ pending |
| 27-02-01 | 02 | 1 | — | — | N/A | file check | `test -f docs/admin-setup-ios/00-overview.md` | ❌ W0 | ⬜ pending |
| 27-02-02 | 02 | 1 | ACORP-01 | — | N/A | grep | `grep -c "renew-not-replace\|Renew.*not.*replace" docs/admin-setup-ios/01-apns-certificate.md` | ❌ W0 | ⬜ pending |
| 27-03-01 | 03 | 2 | ACORP-02 | — | N/A | grep | `grep -c "admin-setup-macos/01-abm-configuration.md" docs/admin-setup-ios/02-abm-token.md` | ❌ W0 | ⬜ pending |
| 27-03-02 | 03 | 2 | ACORP-03 | — | N/A | grep | `grep -c "Supervised only" docs/admin-setup-ios/03-ade-enrollment-profile.md` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

*Existing infrastructure covers all phase requirements. Markdown files are created as the implementation artifact — no test framework installation needed.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| APNs guide covers creation, renewal, cross-platform expiry impact | ACORP-01 | Content quality requires human review | Read 01-apns-certificate.md; verify creation steps, renewal steps, and "What breaks" callout with cross-platform warning |
| ABM token guide uses cross-reference structure without duplicating macOS click-paths | ACORP-02 | Cross-reference quality cannot be automated | Read 02-abm-token.md; verify each section has (1) context summary, (2) macOS link, (3) iOS differences only |
| Enrollment profile guide covers supervised mode, auth methods, Setup Assistant, locked enrollment | ACORP-03 | Completeness of admin guidance requires human review | Read 03-ade-enrollment-profile.md; verify all four topics covered with 🔒 callouts on supervised-only settings |
| Supervised-only callout pattern exactly matches D-01 in every instance | All | Partial automation — grep confirms presence but not exact format | Run `grep -A2 "Supervised only" docs/admin-setup-ios/*.md`; verify each matches `> 🔒 **Supervised only:** [feature] ... See [Supervision](../ios-lifecycle/00-enrollment-overview.md#supervision).` |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 2s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
