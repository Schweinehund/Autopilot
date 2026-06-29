---
phase: 99-new-runbook-navigation-wiring
reviewed: 2026-06-29T00:00:00Z
depth: standard
files_reviewed: 7
files_reviewed_list:
  - docs/l1-runbooks/37-macos-local-password-reset.md
  - docs/l1-runbooks/36-macos-secure-enclave-key.md
  - docs/l1-runbooks/00-index.md
  - docs/index.md
  - docs/quick-ref-l1.md
  - docs/common-issues.md
  - docs/decision-trees/06-macos-triage.md
findings:
  critical: 0
  warning: 2
  info: 1
  total: 3
status: issues_found
---

# Phase 99: Code Review Report

**Reviewed:** 2026-06-29
**Depth:** standard
**Files Reviewed:** 7
**Status:** issues_found

## Summary

Seven documentation files were reviewed for documentation-integrity issues: the new runbook #37 (local password recovery), the updated runbook #36 (back-link only), the L1 runbook index, the top-level index, the L1 quick-reference card, the common-issues router, and the macOS triage decision tree.

The new runbook (#37) is structurally sound. All three recovery paths (A=FileVault key, B=LAPS admin, C=Apple ID) are correctly scoped to pre-login GUI actions only. The `app-sso platform -s` command is correctly confined to runbook #36. The Secure Enclave key destruction fact is stated consistently and accurately after all three paths. Cross-links to #36, the triage tree, and external admin-setup guides use correct relative paths.

Two warnings were found. The first is a mislabeling in quick-ref-l1.md that describes using L1 runbook #36 under the heading "Escalate L2" — this can cause agents to skip the L1 step entirely and escalate prematurely. The second is a gap in the triage decision-tree "How to Check" guidance: the locked-out-user scenario (at the macOS login window) was not covered when the MACR9 leaf was added, leaving an ambiguous branch point that could misroute a locked-out user as MAC1=No.

One info item: the common-issues.md entry for the locked-out scenario does not mention L1 #36 in its escalation chain, which could leave an agent using that page as a standalone reference unaware that #36 is a mandatory intermediate step before L2 escalation.

---

## Warnings

### WR-01: quick-ref-l1.md mislabels runbook #36 as an L2 escalation path

**File:** `docs/quick-ref-l1.md:101`

**Issue:** The escalation trigger for "Secure Enclave key error after password reset or FileVault recovery" begins with the imperative "**Escalate L2** via [Platform SSO — Secure Enclave Key Loss](...) first" followed by "escalate to L2 if re-registration fails." This makes runbook #36 (an L1 runbook) appear to be part of an L2 escalation action. An L1 agent reading this card for the first time would likely interpret the line as a single L2 escalation, rather than as "try this L1 runbook, then escalate L2 only if it fails." The new entry on line 103 (runbook #37) correctly uses the pattern "Use [X] runbook" with a lower-case bullet, making the contrast between the two entries visible.

**Fix:** Reword line 101 to use the same "Use … runbook" pattern established by line 103 (and the analogous #35 entry on line 102):

```markdown
- Secure Enclave key error after password reset or FileVault recovery --> **Use [Platform SSO — Secure Enclave Key Loss](l1-runbooks/36-macos-secure-enclave-key.md) runbook** first; escalate to L2 if re-registration fails (collect: serial number, macOS version, `app-sso platform -s` output)
```

---

### WR-02: 06-macos-triage.md "How to Check" does not cover the login-window state for locked-out users

**File:** `docs/decision-trees/06-macos-triage.md:92-94`

**Issue:** Phase 99 added the MACR9 leaf ("Local password locked out") under MAC3, reachable only via MAC1=Yes (Setup Assistant completed). However, the "How to Check" guidance for MAC1 asks: "Are you at the macOS desktop with a Finder menu bar?" A locked-out user is at the macOS login window — not the desktop — and will answer "No." The subsequent disambiguation text lists only genuine Setup Assistant screens (Apple logo, spinning globe, Remote Management, Setup Assistant wizard) as "No" indicators; the login window is absent. An L1 agent following the script strictly will have the user answer "No" with no matching screen from the list, leaving the MAC1 branch unresolved. In the worst case the agent defaults to MAC1=No and proceeds to MAC2 ("Is the device visible in Intune?") — the device is visible (it was previously enrolled), so MAC2=Yes routes to MACR2 (Setup Assistant Stuck runbook), which is entirely wrong for a locked-out user.

The "How to Check" was not updated when the MACR9 leaf was added; the addition created a reachable tree branch with no corresponding agent-facing disambiguation instruction.

**Fix:** Add the login-window case to the MAC1 "How to Check" cell. Example wording to append to the existing guidance:

```markdown
**Exception — locked-out users:** If the device shows the macOS login window
(the user sees account names or a username/password field but cannot log in),
Setup Assistant has already completed. Treat MAC1 = Yes and proceed to the
primary symptom question (MAC3). Route to the "Local password locked out" leaf
if the issue is a forgotten or unknown local password.
```

---

## Info

### IN-01: common-issues.md locked-out scenario omits L1 #36 from the escalation chain

**File:** `docs/common-issues.md:242-247`

**Issue:** The "macOS Local Password: User Locked Out" section routes L1 to runbook #37 and L2 to runbook #27 (PSSO Investigation) "if PSSO re-registration fails after recovering access." Runbook #36 — the mandatory intermediate L1 PSSO re-registration step that #37 hands off to — is not mentioned in this entry. An agent consulting common-issues.md as a standalone reference after resolving the locked-out case via #37 would not find the explicit instruction to use #36 before escalating to L2 #27. The gap is mitigated because #37 itself mandates the #36 handoff, but common-issues.md as a navigation hub is incomplete at this path.

**Fix:** Add an intermediate L1 step to clarify the expected sequence:

```markdown
- **L1 (recovery):** [macOS Local Password Recovery](l1-runbooks/37-macos-local-password-reset.md)
- **L1 (re-registration):** [Platform SSO — Secure Enclave Key Loss](l1-runbooks/36-macos-secure-enclave-key.md) — mandatory after any recovery path; PSSO re-registration required before closing ticket
- **L2:** [macOS Platform SSO Investigation](l2-runbooks/27-macos-sso-investigation.md) — if PSSO re-registration fails after recovering access
```

---

_Reviewed: 2026-06-29_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
