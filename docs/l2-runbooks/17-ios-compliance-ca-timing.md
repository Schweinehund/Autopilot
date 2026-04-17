---
last_verified: 2026-04-17
review_by: 2026-07-16
applies_to: all
audience: L2
platform: iOS
---

> **Platform gate:** This guide covers iOS/iPadOS L2 investigation via Intune. For Windows Autopilot, see [Windows L2 Runbooks](00-index.md). For macOS ADE, see [macOS ADE Runbooks](00-index.md#macos-ade-runbooks).

# iOS Compliance & CA Timing Investigation

## Triage

**From L1 escalation?** L1 runbook 21 classified the failure as Cause A / B / C. Skip to the matching "Per-Cause Deep-Dive" section below. The "Investigation by Axis" section is the starting point for fresh investigations where L1 did not narrow the cause.

## Context

**Scope:** L2 investigation of iOS device compliance failures (Non-compliant, Not evaluated, or CA-blocked-despite-compliant) and Conditional Access timing issues. The runbook covers the first-evaluation window post-enrollment, the tenant-level Default compliance posture toggle, per-setting compliance failures (OS version, jailbreak, passcode, restricted apps), and the APNs-blocked terminal state.

**L1 → L2 handoff:** L1 runbook 21 narrows every iOS compliance/CA block to one of three causes:

- **Cause A** — first-evaluation window / timing (enrollment completed < 30 min ago; state "Not evaluated").
- **Cause B** — policy mismatch (OS version, jailbreak, passcode, restricted apps).
- **Cause C** — Default compliance posture = Not compliant combined with APNs-blocked or stuck check-in state.

**Structure choice (D-14 hybrid):** This runbook has two top-level sections. `## Investigation by Axis` (SC #4 literal — configuration errors / timing issues / genuine defects) is the starting point for fresh investigations where the cause is not yet known. `## Per-Cause Deep-Dive` (Cause A / B / C matching L1 runbook 21) is the direct handoff target for L1-routed tickets — skip straight to the matching cause sub-section.

**Pareto emphasis (D-15):** The CA timing + Default posture sub-sections are expanded (roughly 50% of the file) because together they account for the majority of observed iOS compliance escalations. The remaining Cause B settings — jailbreak, OS version, passcode, restricted apps — get compact sub-sections with deep-links to the authoritative admin-setup-ios configuration reference.

**Before starting:** collect a diagnostic package per [iOS Log Collection Guide](14-ios-log-collection.md). Tier 1 (MDM diagnostic report) is sufficient for most Cause A/B investigations; Tier 3 (Mac+cable sysdiagnose) is required for Cause C terminal-state APNs investigation.

## Investigation by Axis

SC #4 axes. Rule out [CONFIG] first (most common); then [TIMING] (requires waiting, not action); then declare [DEFECT] (Microsoft Support escalation).

### Configuration Errors [CONFIG]

Covers Cause B (policy mismatch) and Cause C (Default posture).

- **Cause B matches:** policy mismatch — OS version / jailbreak / passcode / restricted apps. The per-device compliance pane lists at least one failing setting. See `### Cause B:` in the Per-Cause Deep-Dive below for per-setting indicators and resolution.
- **Cause C matches:** the tenant Default posture toggle is set to Not compliant AND the device has no compliance policy assigned (or the assigned policy is stuck evaluating). See `### Cause C:` in the Per-Cause Deep-Dive below.

### Timing Issues [TIMING]

Covers Cause A.

- **Cause A matches:** the first-evaluation window is still open — enrollment completed < 30 min ago AND compliance state is Not evaluated. A Company Portal Sync followed by 15-30 min of waiting usually resolves it without any action.
- See `### Cause A:` in the Per-Cause Deep-Dive below for the specific 0-30 minute mechanics and the decision point at the 30-minute mark.

### Genuine Defects [DEFECT]

Cross-cuts all three causes — a [DEFECT] declaration is the output of a [CONFIG]/[TIMING] investigation that reached its ceiling, not an independent starting branch.

- **Not evaluated stuck indefinitely (APNs-blocked)** — state is Not evaluated > 30 min AND APNs endpoints unreachable from the device network. See the "Not evaluated" Terminal State sub-section in the Per-Cause Deep-Dive.
- **Jailbreak detection false-positive** — device is verifiably NOT jailbroken (no sideloaded apps, factory iOS, current version) but the jailbreak compliance setting persistently fails. See `#### Jailbreak` in the Per-Cause Deep-Dive.
- **OS version gate anomaly** — device reports compliant on passcode and jailbreak but the OS version setting reads as mismatch despite the user having completed the required update. See `#### OS Version` in the Per-Cause Deep-Dive.

**Escalation criteria:** all [CONFIG] investigations ruled out (no failing settings; Default posture verified); all [TIMING] windows exceeded (> 30 min for Cause A; > 8 hours since last check-in for Cause C); APNs reachability tested from the device network. At that point, collect the Microsoft Support defect data package per the `### "Not evaluated" Terminal State` sub-section in the Per-Cause Deep-Dive.

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-04-17 | Initial version — iOS compliance & CA timing investigation | -- |
