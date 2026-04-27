---
last_verified: 2026-04-26
review_by: 2026-06-25
applies_to: both
audience: admin
platform: Linux
---

# Linux Intune Client Prerequisites

> **Platform gate:** This reference shows the supported Ubuntu LTS versions (22.04 / 24.04), the dropped Ubuntu version (20.04 — Intune 2508 / August 2025 end-of-support), GA vs HWE kernel-track breakpoints, and one non-version breakpoint (Identity Broker v2.0.2+ re-enrollment behavior) that affects all supported Ubuntu versions.
> For enrollment overview and capability whitelist, see [Linux Device Management Enrollment Overview](00-enrollment-overview.md). For Linux terminology, see the [Linux Provisioning Glossary](../_glossary-linux.md).

## Supported Ubuntu Versions

The following matrix locks Ubuntu LTS support scope for Microsoft Intune Linux device management. Three rows are tracked: the two currently-supported versions (22.04 LTS / 24.04 LTS) and the dropped version (20.04 LTS) retained for visibility because admins searching the matrix for "20.04" need to find an explicit dropped-status row, not silence.

| Version | GA Kernel | HWE Kernel | Support Status | EOS Date |
|---|---|---|---|---|
| Ubuntu 24.04 LTS (Noble) | 6.8 [verify-on-current-Ubuntu] | 6.11+ [verify-on-current-Ubuntu] | Supported — x86_64 only | April 2029 (standard) |
| Ubuntu 22.04 LTS (Jammy) | 5.15 [verify-on-current-Ubuntu] | 6.8 [verify-on-current-Ubuntu] | Supported — x86_64 only | April 2027 (standard) |
| Ubuntu 20.04 LTS (Focal) | 5.4 | 5.15 | Dropped — Intune 2508 [^1] | April 2025 (standard) |

[^1]: Ubuntu 20.04 LTS support was removed in the Intune 2508 service release (August 2025). Devices running Ubuntu 20.04 cannot enroll or maintain Intune enrollment. See [Ubuntu 20.04 — End-of-Support](#ubuntu-2004--end-of-support) below for the upgrade path.

**Source confidence:** Ubuntu version supportability HIGH (Microsoft Learn enroll-linux page, last verified 2026-04). GA / HWE kernel-version cells MEDIUM (Ubuntu wiki kernel-version inventory; specific intune-portal kernel minima are not explicitly documented by Microsoft). Cells marked `[verify-on-current-Ubuntu]` carry an inline freshness marker — re-validate on a current Ubuntu install at execution time.

**EOS Date column uses pinned-event labels** ("Intune 2508 — August 2025") rather than bare dates to prevent date-drift surface in admin reading. Bare dates ("August 2025") have lower information density than pinned-event references that name the Intune service release.

### Ubuntu 20.04 — End-of-Support

Ubuntu 20.04 LTS (Focal) support was dropped in the Intune 2508 service release (August 2025). Devices running Ubuntu 20.04 cannot enroll in Intune nor maintain an existing Intune enrollment after this service release.

**Admin action required:**

- **Audit:** Identify any Ubuntu 20.04 endpoints currently enrolled or attempting enrollment via Intune reporting.
- **Upgrade path:** In-place upgrade is supported from 20.04 → 22.04 via `do-release-upgrade`. Direct upgrade from 20.04 to 24.04 is NOT supported by Ubuntu — go through 22.04 first.
- **Reference:** See [Ubuntu upgrade documentation](https://ubuntu.com/server/docs/upgrade-introduction) for the recommended `do-release-upgrade` procedure.
- **Re-enrollment:** After OS upgrade, re-install `intune-portal` deb from `packages.microsoft.com` and re-enroll via the GUI sign-in flow. The Identity Broker re-enrollment behavior in [Non-version Breakpoints](#non-version-breakpoints) applies post-upgrade if the upgraded `intune-portal` includes Identity Broker v2.0.2+.

### Non-version Breakpoints

The following drift event is NOT gated by Ubuntu LTS version — it is a component-version-gated change in the `intune-portal` package that affects all supported Ubuntu versions identically.

#### Identity Broker v2.0.2+

When the `intune-portal` package updates to include Identity Broker v2.0.2+, the device automatically re-registers with Intune — creating new Intune device IDs and new Microsoft Entra device IDs. Existing device-based Conditional Access assignments, Intune filters, and Entra group memberships that rely on device object IDs continue to point at the *previous* device ID and silently stop applying to the re-registered device.

**Behavior summary:** Single-event re-enrollment that is not visible in the Intune portal as a discrete enrollment action; admins discover it via CA / compliance assignment drift after the fact.

**Source:** Microsoft Learn — Linux deployment guide (verified 2026-04, HIGH confidence).

**Admin action required:** See the [Phase 50 LIN-05 admin pitfall callout](../admin-setup-linux/01-intune-linux-agent.md#identity-broker-v202-re-enrollment) for the step-by-step review checklist (audit CA assignments, filters, Entra group membership; re-target post-re-enrollment device IDs). Phase 49 anchors the breakpoint in this matrix-doc context; Phase 50 owns the detailed admin-action callout.

## Hardware and Software Prerequisites

Beyond the supported Ubuntu LTS versions in the matrix above, the Microsoft Intune Linux client requires the following hardware and software prerequisites. Devices that fail any of these gates cannot enroll.

### Architecture and Hardware

- **CPU architecture:** x86_64 (64-bit Intel / AMD) only. ARM64 / aarch64 is NOT supported.
- **Display environment:** GNOME graphical desktop session. Headless / server-only / IoT installations are NOT supported — `intune-portal` requires interactive GUI sign-in.
- **Supported environments:** Physical hardware, Azure-hosted virtual machines, Hyper-V virtual machines. Other hypervisor hosts are not officially supported (use cases possible but undocumented by Microsoft).

### Required Software Components

- **Microsoft Edge for Linux 102.x or later:** Required for web-app Conditional Access flows. Install via the Microsoft Edge for Linux package from `packages.microsoft.com`.
- **`intune-portal` deb package:** Distributed exclusively via `packages.microsoft.com`. NOT available via snap, NOT available via the default Ubuntu archive. See the [Linux Provisioning Glossary](../_glossary-linux.md#packagesmicrosoftcom) for the package source convention.
- **`microsoft-identity-broker` systemd service:** Installed as a dependency of `intune-portal`. See [Linux Provisioning Glossary — microsoft-identity-broker](../_glossary-linux.md#microsoft-identity-broker).
- **`intune-agent.timer` systemd unit:** User-scoped systemd timer activated post-enrollment. See [Linux Provisioning Glossary — intune-agent.timer](../_glossary-linux.md#intune-agenttimer).

### Networking

- **Outbound HTTPS to Microsoft Intune endpoints:** Required for enrollment, compliance reporting, and Conditional Access evaluation. Specific endpoint list maintained by Microsoft Learn — `last_verified` discipline applies.
- **Outbound HTTPS to `packages.microsoft.com`:** Required for `intune-portal` and Microsoft Edge for Linux installation and updates.
