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
