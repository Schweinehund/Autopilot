---
last_verified: 2026-04-27
review_by: 2026-06-26
applies_to: enrollment
audience: admin
platform: Linux
---

> **Platform gate:** This guide covers app delivery to Linux devices managed by Intune (Ubuntu 22.04/24.04 LTS).
> For Linux provisioning terminology, see the [Linux Provisioning Glossary](../_glossary-linux.md).

# Linux App Delivery — Admin Overview

> 📋 **Scope note — Linux app delivery is script-based only.** Intune does NOT deliver binary packages to Linux. There is no Win32 / MSIX / `.pkg` / `.deb` direct-delivery analog for Linux. Intune delivers Shell/Bash scripts to the device; the script itself is responsible for downloading and installing whatever package the org needs (e.g., `apt install` from a trusted repo, `curl | sh` from a vendor URL, etc.).
>
> See [Linux Capability Matrix — App Deployment](../reference/linux-capability-matrix.md#app-deployment) for the bilateral-comparison context.

## Prerequisites

- Linux device enrolled and reporting healthy in Intune (see [01-intune-linux-agent.md](01-intune-linux-agent.md))
- Intune Administrator role
- Bash available on target distro (default on Ubuntu LTS)
- Trusted package repository configured (admin's choice — `packages.microsoft.com` for Microsoft software; org-internal apt mirror; vendor URLs)
- Org-authored Bash script validated and tested before upload

## Concept Overview

Intune delivers Bash scripts to Linux devices as the only app-delivery mechanism. The script content is org-authored; Intune handles delivery, schedule, and exit-code reporting. The Linux client executes the script and surfaces success or failure to the Intune admin center based on the script exit code.

**How it works:**

1. Admin authors a Bash script that installs or configures the required software
2. Admin uploads the script to Intune and assigns it to a Linux device group
3. The Intune Linux client (`intune-agent.timer`) delivers and executes the script on target devices
4. Intune admin center reports exit-code success (0) or failure (non-zero)

**Common patterns (concept-level — full deep-dive deferred to v1.5.1 LIN-DEFER-01 Bash custom-compliance guide):**

- **Install a deb from a Microsoft repo:** Script runs `apt update && apt install <package>` after ensuring `packages.microsoft.com` repo is configured
- **Install a vendor binary:** Script `curl`s the binary from a vendor URL, verifies signature or checksum, then runs the installer
- **Configure a service:** Script writes configuration files to the appropriate path, then runs `systemctl enable --now <unit>`
- **Remove a package:** Script runs `apt remove <package>` and cleans up associated configuration

> ⚠️ **Supply-chain note:** Bash scripts run with elevated privileges on Linux devices. Orgs are responsible for verifying script sources and signatures before uploading to Intune. Scripts downloaded from vendor URLs should be verified against published checksums. There is no Win32 app catalog or Managed Google Play analog that pre-validates package provenance.

## Minimal Example

The following minimal script illustrates the pattern. It installs a hypothetical org tool from an internal apt mirror:

```bash
#!/bin/bash
# Example: install org-tool from internal apt mirror
# Exit 0 = success; non-zero = failure (Intune reports failure)
set -e
apt-get update -qq
apt-get install -y org-tool
echo "org-tool installed successfully"
exit 0
```

This is a concept illustration only. See LIN-DEFER-01 (v1.5.1 Bash deep-dive) for production-grade script patterns including error handling, idempotency, and exit-code discipline.

## Comparison with Other Platforms

Linux app delivery is significantly narrower than other Intune-managed platforms:

| Delivery Method | Windows | macOS | iOS/Android | Linux |
|----------------|---------|-------|-------------|-------|
| Binary package delivery (Win32 / MSI / MSIX / `.pkg` / APK) | Yes | Yes | Yes (via store) | **No** |
| Script-based install | Yes (Remediations/PowerShell) | Yes (Shell scripts) | No | **Yes — only path** |
| Enterprise app store catalog | Yes (Win32 catalog) | No | Yes | **No** |
| Direct `.deb` delivery | n/a | n/a | n/a | **No** |

## Verification

- [ ] Script saved and uploaded in Intune admin center (Devices > Linux > Scripts)
- [ ] Script assigned to a test device group containing one or more enrolled Linux devices
- [ ] Test device reports successful script execution (exit code 0) in Intune admin center
- [ ] Installed package or configuration verifiable on the test device (e.g., `dpkg -l org-tool`)
- [ ] No sensitive credentials or tokens are embedded in the script body (use environment variables or secure delivery if needed)

## See Also

- [Linux Capability Matrix — App Deployment](../reference/linux-capability-matrix.md#app-deployment)
- [Compliance Policy](03-compliance-policy.md) — custom-compliance Bash scripts use the same script-execution surface as app-delivery scripts
- [01-intune-linux-agent.md](01-intune-linux-agent.md) — agent installation required before scripts are delivered
- (v1.5.1 LIN-DEFER-01) Bash custom-compliance deep-dive — when shipped, will cross-link here

---

| Date | Change | Author |
|------|--------|--------|
| 2026-04-27 | Initial version — Linux app delivery concept overview + PITFALL-1 scope callout (Phase 50) | -- |
