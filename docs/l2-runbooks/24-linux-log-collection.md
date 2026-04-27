---
last_verified: 2026-04-27
review_by: 2026-06-26
applies_to: all
audience: L2
platform: Linux
---

> **Platform gate:** This guide covers Linux Intune client (`intune-portal`) L2 investigation via Microsoft Intune. For Windows Autopilot, see [Windows L2 Runbooks](00-index.md). For macOS ADE, see [macOS ADE Runbooks](00-index.md#macos-ade-runbooks). For iOS/iPadOS, see [iOS L2 Runbooks](00-index.md#ios-l2-runbooks). For Android Enterprise, see [Android L2 Runbooks](00-index.md#android-l2-runbooks).

# Linux Log Collection Guide

## Context

This guide is the **prerequisite for all Linux L2 investigation runbooks** — collect log surfaces named here before opening [Linux Agent Investigation (Runbook 25)](25-linux-agent-investigation.md). It also serves as the L2 reading point for tickets escalated from L1, including:

- [L1 30: Linux Enrollment Failed](../l1-runbooks/30-linux-enrollment-failed.md) — package install / sign-in / enrollment-timeout symptoms
- [L1 31: Linux Compliance Non-Compliant](../l1-runbooks/31-linux-compliance-non-compliant.md) — distro / encryption / password / custom-compliance failures
- [L1 32: Linux CA Blocking Web-App Access](../l1-runbooks/32-linux-ca-blocking-web-access.md) — Edge for Linux web-app CA blocking (PITFALL-2)
- [L1 33: Linux Agent Service Failure](../l1-runbooks/33-linux-agent-service-failure.md) — `intune-agent.timer` not running

Linux Intune client has **a single confirmed primary log surface** (`journalctl`) — unlike Android (3-method fragmentation by enrollment mode) or Windows (`mdmdiagnosticstool.exe` single-archive) or macOS (IntuneMacODC zip). The Decision Matrix below routes by data-scope need, not enrollment mode (Linux has one supported delivery path: deb from `packages.microsoft.com` on Ubuntu 22.04/24.04 LTS).

> **From L1 escalation?** L1 collected the escalation packet (serial number, user UPN, `lsb_release -a`, `uname -r`, `dpkg -l intune-portal`, journalctl snapshot). Skip to the Decision Matrix to choose your method.

## Tool Landscape

> **Tool landscape:** Linux Intune client (`intune-portal`) has a **single confirmed primary log surface: `journalctl`** (the systemd journal). Unlike Android (3-method fragmentation gated by enrollment mode) or macOS (IntuneMacODC zip) or Windows (`mdmdiagnosticstool.exe` archive), Linux has no Intune admin center per-device diagnostic download. The decision matrix below routes by data-scope need; there is no enrollment-mode axis (Linux has one supported delivery mode: deb from `packages.microsoft.com`). File-based log paths are secondary surfaces — `/var/log/dpkg.log` and `/var/log/intune-update.log` are HIGH/MEDIUM confidence; `/var/log/microsoft/intune/` is LOW-MEDIUM confidence (see Section 2 caveat).

## Decision Matrix

| Method | Who Triggers | Data Scope | Access Path | Physical Requirements | Confidence (Layer 1) | Typical Latency |
|--------|-------------|------------|-------------|----------------------|----------------------|----------------|
| **journalctl (systemd journal)** — Section 1 | L2 engineer (commands run by user on enrolled Linux endpoint) | Agent events, auth events, timer activations, broker errors, intune-portal GUI events | Direct terminal (SSH or physical) | Terminal access | `[HIGH, last_verified 2026-04-27]` | Seconds |
| **File-based paths** (`/var/log/dpkg.log`, `/var/log/intune-update.log`, `/var/log/microsoft/intune/`) — Section 2 | L2 engineer (read-only commands run on endpoint) | Package install history, agent update events, (LOW-MEDIUM) intune-specific component logs | Direct terminal (read-only) | Terminal access | `/var/log/dpkg.log`: `[HIGH, last_verified 2026-04-27]`; `/var/log/intune-update.log`: `[MEDIUM, last_verified 2026-04-27]`; `/var/log/microsoft/intune/`: `[LOW-MEDIUM, last_verified 2026-04-27]` | Seconds |
| **Package-state queries** (`dpkg -l`, `apt list --installed`) — Section 3 | L2 engineer (read-only) | Installed package version, delivery path (deb confirmation; snap-detection negative-space) | Direct terminal (read-only) | Terminal access | `[HIGH, last_verified 2026-04-27]` | Seconds |

## Method Selection

Linux's single supported delivery path means method selection is by **data-type need**, not by enrollment mode:

1. **Start with Section 1 (journalctl)** for ALL investigations. The systemd journal contains agent events, timer activations, broker errors, GUI launch events — virtually every L2-relevant signal Microsoft documents.
2. **Move to Section 2 (file-based paths)** when journalctl output is inconclusive — for example, to read `/var/log/dpkg.log` for the package install timeline, `/var/log/intune-update.log` for custom-compliance script exit codes, or (LOW-MEDIUM confidence) `/var/log/microsoft/intune/` for any intune-component file logs the device may have written.
3. **Use Section 3 (package-state queries)** to confirm the delivery path (deb from `packages.microsoft.com`), package version, and to detect an erroneous snap package on the device (negative-space check per PITFALL-3).

## Section 1: journalctl

`journalctl` is the HIGH-confidence primary log surface for Linux Intune client. The systemd journal aggregates events from `intune-agent`, `intune-agent.timer`, `microsoft-identity-broker` (user scope), and `microsoft-identity-device-broker` (system scope), plus GUI launch events from `intune-portal`.

See [journalctl](../_glossary-linux.md#journalctl) for the systemd logging tool used as the primary log surface and [systemd](../_glossary-linux.md#systemd) for the service-management framework.

### 1.1 Agent service events `[HIGH, last_verified 2026-04-27]`

Run on the enrolled Linux endpoint:

```bash
# System-scope agent events (the canonical SC#1 literal command)
journalctl -u intune-agent --no-pager
journalctl -u intune-agent --since "1 hour ago" --no-pager
```

> **Note:** `intune-agent.timer` is the confirmed user-scope unit per Phase 51 Runbook 33 walkthrough. The `journalctl -u intune-agent` form (without `--user`) is documented in ROADMAP SC#1 and may target a system-scope unit or alias on some Ubuntu installs; if it returns "Unit not found," use the user-scope form below.

```bash
# User-scope timer events
journalctl --user -u intune-agent.timer --since "1 hour ago" --no-pager
```

### 1.2 intune-portal GUI events `[HIGH, last_verified 2026-04-27]`

```bash
# SC#1 literal — captures intune-portal GUI launch events and error signals
journalctl | grep intune-portal
journalctl --since "1 day ago" | grep intune-portal
```

### 1.3 Identity Broker events `[HIGH, last_verified 2026-04-27]`

The Microsoft Identity Broker has TWO scopes (see [microsoft-identity-broker](../_glossary-linux.md#microsoft-identity-broker)):

```bash
# User-scope broker — authentication, SSO sessions, PRT acquisition (no sudo per DPO-Phase52-01)
journalctl --user -u microsoft-identity-broker --since "1 hour ago" --no-pager

# System-scope broker — device registration state (may require sudo for full system journal visibility)
sudo journalctl -u microsoft-identity-device-broker --since "1 hour ago" --no-pager
```

### 1.4 Useful flags

- `--no-pager`: essential for L2 — output streams without interactive pager (`q` to quit) so you can pipe to a file or clipboard
- `--since "1 hour ago"` / `--since "1 day ago"` / `--since "1 week ago"`: time-bounded fetch; human-readable relative form is supported
- `--output=cat` or `--output=short-iso`: useful for log archiving in escalation packets
- `--user`: scope flag for user-instance services; mutually exclusive with `sudo` per the read-vs-write apt distinction

## Section 2: File-based paths

File-based log paths are secondary surfaces. `/var/log/dpkg.log` and `/var/log/intune-update.log` are HIGH/MEDIUM confidence; `/var/log/microsoft/intune/` is LOW-MEDIUM confidence and carries the layered caveat below.

> **Source confidence:** `/var/log/microsoft/intune/` paths are LOW-MEDIUM confidence — Microsoft Learn does not document this path for Ubuntu `intune-portal` as of 2026-04-27. `journalctl` is the confirmed primary surface (Section 1). `/var/log/dpkg.log` and `/var/log/intune-update.log` are documented or community-confirmed. Verify `/var/log/microsoft/intune/` presence on the affected device before citing any files from this path in an escalation packet, and re-verify at `review_by` cadence.

See [dpkg](../_glossary-linux.md#dpkg) and [apt](../_glossary-linux.md#apt) for the Debian package toolchain context.

### 2.1 /var/log/dpkg.log `[HIGH, last_verified 2026-04-27]`

Standard Ubuntu dpkg event log — every package install/remove/configure event lands here. Use this to confirm the timing of an `intune-portal` install and any failed configure stages cross-referenced from L1 [Cause A: Package Install](../l1-runbooks/30-linux-enrollment-failed.md#cause-a-package-install).

```bash
# Read-only; no sudo (file is world-readable on Ubuntu)
grep intune-portal /var/log/dpkg.log
grep -E "intune-portal|microsoft-identity-broker" /var/log/dpkg.log | tail -50
```

### 2.2 /var/log/intune-update.log `[MEDIUM, last_verified 2026-04-27]`

Agent update events — community-confirmed surface (referenced in PITFALLS.md §Pitfall 3 warning signs and Phase 49 glossary). Used for L1 [Cause D: Custom Compliance Failure](../l1-runbooks/31-linux-compliance-non-compliant.md#cause-d-custom-compliance-failure) cross-reference when reading custom-compliance Bash script exit codes.

```bash
# Read-only; tail for recent updates
tail -200 /var/log/intune-update.log
grep -E "compliance|update|fail" /var/log/intune-update.log | tail -50
```

### 2.3 /var/log/microsoft/intune/ directory `[LOW-MEDIUM, last_verified 2026-04-27]`

LOW-MEDIUM confidence — path is NOT documented by Microsoft Learn for Ubuntu `intune-portal` (Source confidence blockquote above). Some community troubleshooting posts reference this path; verify presence on the affected device before relying on it in an escalation packet.

```bash
# Read-only; presence check first `[LOW-MEDIUM, last_verified 2026-04-27]`
ls -la /var/log/microsoft/intune/ 2>/dev/null
# If present, list any log files; tail individually `[LOW-MEDIUM, last_verified 2026-04-27]`
find /var/log/microsoft/intune/ -type f -name "*.log" 2>/dev/null
```

If this path does not exist on the affected device (likely on a clean Ubuntu 22.04/24.04 install with `intune-portal` 2.0.x deb), document the absence in the escalation packet and proceed with `journalctl` as primary surface. Re-verify path documentation at `review_by` cadence.

## Section 3: Package-state queries

Package-state queries confirm the delivery path (deb from `packages.microsoft.com` is GA per Phase 49 prerequisites) and detect any erroneous snap package on the device. All commands are read-only — no `sudo` per the read-vs-write apt distinction (DPO-Phase52-01).

See [intune-portal](../_glossary-linux.md#intune-portal) for the deb package context.

### 3.1 deb installation confirmation `[HIGH, last_verified 2026-04-27]`

```bash
# Confirm intune-portal deb is installed; expected GA output: intune-portal/jammy,now 2.0.X amd64 [installed]
apt list --installed | grep intune-portal

# Confirm dpkg state directly; expected GA: ii  intune-portal  2.0.X  amd64  ...
# (ii = installed+configured; un = not installed; iF = install-failed)
dpkg -l intune-portal
```

### 3.2 Snap negative-space detection `[HIGH, last_verified 2026-04-27]`

`intune-portal` is delivered as a deb from `packages.microsoft.com` only. There is no GA snap distribution. Use these commands to DETECT whether snap is erroneously present (PITFALL-3 negative space):

```bash
# Detection-only: check whether snap is installed and whether intune-related snap is present
snap list 2>/dev/null | grep -i intune
# Expected: no output (snap not involved in GA install path)
# Unexpected: any output = user is on the deprecated preview snap path; route to Runbook 25 Trap B

# Binary path verification — GA deb places binary under /opt/microsoft/ or similar system path
which intune-portal 2>/dev/null
readlink -f $(which intune-portal 2>/dev/null) 2>/dev/null
```

### 3.3 Identity Broker version state `[HIGH, last_verified 2026-04-27]`

```bash
# Confirm Identity Broker version (relevant for Runbook 25 Trap D — v2.0.2+ re-enrollment behavior)
dpkg -l microsoft-identity-broker
dpkg -l microsoft-identity-device-broker
```

> **Note:** If `dpkg -l microsoft-identity-broker` shows version `2.0.2` or later AND L1 reports CA assignment drift, escalate via [Runbook 25 Trap D: Identity Broker v2.0.2+ Re-enrollment](25-linux-agent-investigation.md#trap-d-identity-broker).

## Common Artifacts Cross-Reference

Use this table to map the artifact you collected to the investigation runbook(s) that consume it. Cross-links land at Phase 51 L1 cause anchors (DPO-01 locked surfaces) for return-routes when L2 confirms an L1-symptom root cause.

| Artifact | Collection Method | Used by |
|----------|-------------------|---------|
| `journalctl -u intune-agent` output | Section 1.1 | [Runbook 25 Trap C: Service-State](25-linux-agent-investigation.md#trap-c-service-state) — service activation failures; [L1 30 Cause C: Enrollment Timeout](../l1-runbooks/30-linux-enrollment-failed.md#cause-c-enrollment-timeout) — return-route |
| `journalctl --user -u microsoft-identity-broker` output | Section 1.3 | [Runbook 25 Trap D: Identity Broker](25-linux-agent-investigation.md#trap-d-identity-broker) — re-enrollment events; [L1 30 Cause B: Sign-In Failure](../l1-runbooks/30-linux-enrollment-failed.md#cause-b-sign-in-failure) — return-route |
| `journalctl \| grep intune-portal` output | Section 1.2 | [Runbook 25 Trap B: Snap-vs-Deb](25-linux-agent-investigation.md#trap-b-delivery-path) — GUI launch errors; [Runbook 25 Trap A: Kernel Track](25-linux-agent-investigation.md#trap-a-kernel-track) — startup failures |
| `/var/log/dpkg.log` excerpt | Section 2.1 | [Runbook 25 Trap A: Kernel Track](25-linux-agent-investigation.md#trap-a-kernel-track) — package install timeline; [L1 30 Cause A: Package Install](../l1-runbooks/30-linux-enrollment-failed.md#cause-a-package-install) — return-route |
| `/var/log/intune-update.log` excerpt | Section 2.2 | [L1 31 Cause D: Custom Compliance](../l1-runbooks/31-linux-compliance-non-compliant.md#cause-d-custom-compliance-failure) — Bash exit-code reading |
| `dpkg -l intune-portal` / `apt list --installed` output | Section 3.1 | [Runbook 25 Trap A: Kernel Track](25-linux-agent-investigation.md#trap-a-kernel-track), [Runbook 25 Trap B: Snap-vs-Deb](25-linux-agent-investigation.md#trap-b-delivery-path) |
| `snap list \| grep intune` output | Section 3.2 | [Runbook 25 Trap B: Snap-vs-Deb](25-linux-agent-investigation.md#trap-b-delivery-path) — primary detection signal |
| `dpkg -l microsoft-identity-broker` output | Section 3.3 | [Runbook 25 Trap D: Identity Broker](25-linux-agent-investigation.md#trap-d-identity-broker) — version threshold check |

## Related Resources

- [L2 Runbook Index — Linux L2 Runbooks](00-index.md#linux-l2-runbooks) — Linux L2 runbook set
- [Linux Agent Investigation (Runbook 25)](25-linux-agent-investigation.md) — Trap-by-trap investigation; consumes log surfaces collected here
- [Linux Provisioning Glossary](../_glossary-linux.md) — Canonical Linux Intune terminology (`journalctl`, `systemd`, `dpkg`, `apt`, `intune-portal`, `microsoft-identity-broker`)
- [Linux L1 Triage Decision Tree](../decision-trees/09-linux-triage.md) — Phase 51 L1 routing surface
- [Linux Capability Matrix — Monitoring](../reference/linux-capability-matrix.md#monitoring) — Architectural detail for Linux monitoring surface narrowness
- [L1 30: Linux Enrollment Failed](../l1-runbooks/30-linux-enrollment-failed.md) — L1 escalation source
- [L1 31: Linux Compliance Non-Compliant](../l1-runbooks/31-linux-compliance-non-compliant.md) — L1 escalation source (custom-compliance Bash)
- [L1 33: Linux Agent Service Failure](../l1-runbooks/33-linux-agent-service-failure.md) — L1 escalation source (primary route to Runbook 25 Trap C)

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-04-27 | Initial version (Phase 52 — Linux L2 log collection guide; 3 method sections; 3-layer LOW-MEDIUM caveat on `/var/log/microsoft/intune/` per CONTEXT D-01 / CDI-Phase52-06) | -- |
