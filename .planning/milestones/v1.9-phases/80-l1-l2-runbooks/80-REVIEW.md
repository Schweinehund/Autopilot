---
phase: 80-l1-l2-runbooks
reviewed: 2026-06-21T00:00:00Z
depth: standard
files_reviewed: 5
files_reviewed_list:
  - docs/l1-runbooks/35-macos-sso-sign-in-failure.md
  - docs/l1-runbooks/36-macos-secure-enclave-key.md
  - docs/l2-runbooks/27-macos-sso-investigation.md
  - docs/l1-runbooks/00-index.md
  - docs/l2-runbooks/00-index.md
findings:
  critical: 0
  warning: 3
  info: 3
  total: 6
status: issues_found
---

# Phase 80: Code Review Report

**Reviewed:** 2026-06-21
**Depth:** standard
**Files Reviewed:** 5
**Status:** issues_found

## Summary

Reviewed the three new macOS Platform SSO runbooks (L1 #35, L1 #36, L2 #27) plus the two index edits (L1/L2 `00-index.md`) against the locked Phase-80 constraints (CONTEXT.md A1/B1/C1/D2), the verified research facts (RESEARCH.md), and the house-style analogs (L1 #15, L2 #19).

**The phase passes every high-risk gate cleanly.** Specifically, all checks the prompt flagged as Critical-eligible came back negative:

- **Banned strings (SC3):** Neither `security find-certificate` nor `app-sso diagnose` appears in any of the three new runbooks. (Both strings appear only in pre-existing guides 08/09, which is expected and out of scope.) L2 #27 additionally carries an explicit negative-assertion note that `app-sso` has no `diagnose` subcommand.
- **Command accuracy:** `app-sso platform -s` is reproduced verbatim everywhere; the log predicate is `subsystem == "com.apple.AppSSO"`; the sysdiagnose debug-enable → reproduce → `sudo sysdiagnose` → reset procedure matches research exactly; the macOS 15.0–15.2 error signature and "fixed in 15.3" callout match research verbatim.
- **Internal link integrity:** Every relative link target in all three runbooks exists now (guides 07/08/09, `10-macos-log-collection.md`, `06-macos-triage.md`, `27-…`, `35-…`, `36-…`). No forward-links to Phase-81 nav-hub or decision-tree-SSO-leaf targets (navigation-last invariant honored).
- **Locked decisions:** A1 (L2 #27 is two linear tracks with a "From L1 escalation?" block and a log-collection opener — no Mermaid router) ✓; C1 (guided `app-sso platform -s` Terminal walkthrough in both L1 runbooks) ✓; D2 (#35 and #36 do not reference each other) ✓; B1 (in-phase #35→#27 / #36→#27 escalation links + reciprocal #27→#35/#36 back-refs; no nav-hub edits) ✓.
- **SC1–SC4 coverage:** #35's four root causes present; #36's SE-key-loss recovery present; #27's version-gated 15.0–15.2 "fixed in 15.3" callout present; both index escalation rows map L1 #35 and L1 #36 → L2 #27.
- **House-style:** Frontmatter, platform-gate blockquote, Escalation Criteria + "Before escalating, collect:" checklist, back-to-triage footer (L1 only, matching #15), and Version History table are all present and conformant.

No Critical findings. Three Warnings concern internal logical consistency of the triage flow and one link-not-copy sourcing accuracy issue; three Info items are minor.

## Warnings

### WR-01: L1 #35 Step 2 decision tree can never reach Root Cause 1 (old Company Portal), the most fundamental failure cause

**File:** `docs/l1-runbooks/35-macos-sso-sign-in-failure.md:36-40`
**Issue:** Step 2 is the routing/triage step. Its three branches send the reader to Root Cause 2 (error code), Root Cause 3 or 4 ("Succeeded" + no notification), and Root Cause 4 ("Succeeded" + notification received) — but there is **no branch that routes to Root Cause 1 (Company Portal older than 5.2404.0)**. Root Cause 1 appears in document order as the very next block (Step 3, line 42), but a reader following Step 2's explicit branches will skip past it. This matters because per RESEARCH §6.1 an old Company Portal is a precondition for *any* registration: `app-sso platform -s` shows NOT REGISTERED regardless of the other three causes. Compounding the defect, Root Cause 4 (line 66) is written assuming RC1 was already ruled out ("the device has a compatible Company Portal version"), yet nothing in the flow tells the agent to verify it. Result: an L1 agent triaging a stalled-registration ticket on an out-of-date Company Portal can be routed straight to RC3/RC4 and never check the actual blocker.
**Fix:** Add a Company Portal version branch to Step 2 (ahead of the "Succeeded" branches), e.g.:
```markdown
   - If the policy shows **"Succeeded"** — first confirm the Company Portal version is **5.2404.0 or later** (see **Root Cause 1** below). If it is older, that is the root cause; stop here.
   - If the policy shows an **error code (such as Error 10002)** — proceed to **Root Cause 2** below.
   - If the policy shows **"Succeeded"**, Company Portal is current, but the user never received a "Registration Required" notification — proceed to **Root Cause 3 or 4** below.
```

### WR-02: L2 #27 "From L1 escalation?" routing contradicts Track B's own entry condition (REGISTERED vs. no REGISTERED state)

**File:** `docs/l2-runbooks/27-macos-sso-investigation.md:23` (vs. `:24` and `:138`)
**Issue:** The routing block at line 23 sends "Password-sync failures (**no REGISTERED state** + per-user MFA suspected or AD-bound account)" to Track B. But Track B's own opening sentence (line 138) states Track B is used "when the device and user registration state **shows REGISTERED** … but the user cannot complete the Password-sync PSSO sign-in flow," and line 24 reinforces "proceed to Track B **if registration state shows REGISTERED**." So a ticket with no REGISTERED state is simultaneously (a) routed to Track B by line 23 and (b) excluded from Track B by lines 24 and 138. The L2 engineer gets contradictory entry criteria. (Note: per RESEARCH §9–§10, per-user MFA and AD-bound failures actually do present as NOT REGISTERED, so line 23's *symptom description* is the technically accurate one — but it flatly conflicts with the gating prose Track B carries.)
**Fix:** Make the gate consistent. Either (a) reword line 23 to drop the "no REGISTERED state" qualifier so Track B is entered on suspected per-user-MFA / AD-bound cause regardless of registration state, or (b) reword Track B's intro (line 138) and line 24 to acknowledge that password-sync blockers can leave the device NOT REGISTERED. Option (a) example for line 23:
```markdown
- Password-sync failure suspected (per-user MFA enabled, or AD-bound/mobile account) → Track B: Password-Sync Failure Investigation — these blockers can leave registration incomplete *or* break sign-in after a successful registration.
```

### WR-03: L2 #27 cites guide 07 §Known Silent Blockers as the "full list" of TLS exclusion endpoints, but that list omits the Apple domains the runbook itself lists

**File:** `docs/l2-runbooks/27-macos-sso-investigation.md:114-117`
**Issue:** Step 4 enumerates two endpoint categories to exclude from TLS inspection — the Apple `app-site-association` domains (line 114) and the three Microsoft endpoints (line 115) — then tells the reader: "For the **full list** of required TLS exclusion endpoints (DF-10 Known Silent Blocker), see [Platform SSO Setup Guide §Known Silent Blockers]." However, guide 07's DF-10 callout (`docs/admin-setup-macos/07-platform-sso-setup.md:35`) lists **only** the three Microsoft endpoints (`login.microsoftonline.com`, `login.microsoft.com`, `sts.windows.net`) — it does **not** contain the Apple `app-site-association.cdn-apple.com` / `app-site-association.networking.apple` domains. So the runbook frames an *incomplete* source as the authoritative "full list," and that source is actually a subset of what the runbook itself just printed. An L2 engineer who follows the link to confirm the Apple domains will not find them and may wrongly conclude they are not required. (The Apple domains themselves are verified by RESEARCH §8 from Microsoft Learn, so this is a sourcing/attribution defect, not a fabricated fact.)
**Fix:** Stop attributing the Apple domains to guide 07's DF-10. Reword line 117 to scope the link to what DF-10 actually covers, and cite the Apple domains to their real source, e.g.:
```markdown
The three Microsoft identity endpoints above are the DF-10 Known Silent Blocker — see [Platform SSO Setup Guide §Known Silent Blockers](../admin-setup-macos/07-platform-sso-setup.md). The Apple `app-site-association` domains are an additional PSSO requirement (Microsoft Learn — macOS PSSO troubleshooting, TLS Inspection URLs) not enumerated in DF-10.
```

## Info

### IN-01: L1 #35 Step 2 branch "received a notification → Root Cause 4" is semantically loose

**File:** `docs/l1-runbooks/35-macos-sso-sign-in-failure.md:40`
**Issue:** The branch "If the policy shows 'Succeeded' **and the user did receive a notification** — proceed to Root Cause 4" routes to RC4, but RC4 is specifically the *dismissed-without-completing* case (line 64). A user who received and acted on the notification is not an RC4 fit; the branch conflates "received" with "received but dismissed." This is a minor wording imprecision rather than a flow break (RC4 itself re-asks whether the notification was dismissed).
**Fix:** Tighten to "received a notification but did not complete registration → Root Cause 4."

### IN-02: Company Portal version-check UI path ("Help menu") is an unverified detail

**File:** `docs/l1-runbooks/35-macos-sso-sign-in-failure.md:44`
**Issue:** "ask the user to open Company Portal and check the version via the **Help** menu" specifies a UI path that RESEARCH did not verify and guide 07 does not document. It is roughly consistent with the #15 analog ("Company Portal > Menu > Help", line 61), so it is plausible, but it is an asserted UI detail without a cited source. Low risk.
**Fix:** Either align the wording to the #15 phrasing ("Company Portal > Menu > Help") for cross-doc consistency, or soften to "check the version in the Company Portal About/Help screen."

### IN-03: L1 index intro still promises "no log file analysis required" while macOS rows now include a Terminal step

**File:** `docs/l1-runbooks/00-index.md:13` (in relation to new rows at `:48-49`)
**Issue:** The index intro (line 13) states each L1 runbook needs "no registry access, no PowerShell execution, and no log file analysis required." The new #35/#36 rows add a guided `app-sso platform -s` Terminal step. Per CONTEXT.md C1 and the `00-index.md:81` "terminal walkthrough as appropriate per cause" affordance, this tension is *explicitly accepted and in-scope* for Phase 80 (the Terminal step collects state, not log-file analysis), so this is not a defect to block on. Flagged only for awareness: the intro's blanket "no … " phrasing is now slightly out of step with the macOS ADE and Linux sections. No action required in Phase 80; a future intro-copy reconciliation (Phase 81 nav pass) could note the per-cause Terminal affordance inline.
**Fix:** Optional, defer to Phase 81: append "(except cause-gated Terminal walkthroughs where noted)" to the line-13 promise, mirroring the line-83 Linux-section phrasing.

---

_Reviewed: 2026-06-21_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
