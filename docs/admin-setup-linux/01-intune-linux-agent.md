---
last_verified: 2026-04-27
review_by: 2026-06-26
applies_to: enrollment
audience: admin
platform: Linux
---

> **Platform gate:** This guide covers installation of the `intune-portal` deb package and Microsoft Identity Broker on Ubuntu 22.04 LTS and 24.04 LTS.
> For Linux prerequisites and supported distributions, see [Linux Prerequisites](../linux-lifecycle/01-linux-prerequisites.md).
> For Linux provisioning terminology, see the [Linux Provisioning Glossary](../_glossary-linux.md).

# Intune Linux Agent — Install and Configure

This guide walks Intune administrators through installing the `intune-portal` deb package from `packages.microsoft.com` and verifying the Microsoft Identity Broker systemd unit. Completing this step is a prerequisite for all Linux enrollment scenarios.

> ⚠️ **Known admin pitfall — Identity Broker re-enrollment (intune-portal 2.0.2+):** The `intune-portal` 2.0.2 release replaced the Java-based broker with `microsoft-identity-broker` (systemd unit). Updating from a pre-2.0.2 install triggers AUTOMATIC RE-ENROLLMENT of all already-enrolled Linux devices with NEW device IDs. Admin action required after the rollout: review device-based Conditional Access assignments, Intune filters, and Entra ID group memberships scoped to Linux devices — old device IDs become stale and the new device IDs may not match prior assignments. See [Non-version Breakpoints](../linux-lifecycle/01-linux-prerequisites.md#non-version-breakpoints) for the full breakpoint matrix.
>
> Back-link: `docs/linux-lifecycle/01-linux-prerequisites.md#non-version-breakpoints`
>
> **Admin action checklist:**
> 1. Identify Entra ID groups scoped to Linux devices via device-based filters
> 2. After upgrade, verify membership with the new device IDs
> 3. Re-validate device-based CA policies (if any) — note Linux supports web-app CA only
> 4. Audit `microsoft-identity-broker` systemd-unit status post-upgrade: `systemctl status microsoft-identity-broker`

## Prerequisites

- [ ] Ubuntu 22.04 LTS or 24.04 LTS (per [Linux Prerequisites](../linux-lifecycle/01-linux-prerequisites.md))
- [ ] GNOME desktop environment (per Phase 49 whitelist)
- [ ] Intune license assigned to user
- [ ] `sudo` access on target device
- [ ] Outbound HTTPS access to `packages.microsoft.com`

## Steps

### Step 1: Add the Microsoft package signing key

#### On device

1. Add the Microsoft package signing key:

   ```bash
   curl -sSL https://packages.microsoft.com/keys/microsoft.asc | sudo tee /etc/apt/trusted.gpg.d/microsoft.asc
   ```

2. Add the apt repository:

   ```bash
   echo "deb [arch=amd64,arm64,armhf signed-by=/etc/apt/trusted.gpg.d/microsoft.asc] https://packages.microsoft.com/ubuntu/$(lsb_release -rs)/prod $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/microsoft-prod.list
   ```

3. Update apt package index:

   ```bash
   sudo apt update
   ```

### Step 2: Install the intune-portal deb package

#### On device

1. Install the `intune-portal` package:

   ```bash
   sudo apt install intune-portal
   ```

2. Verify the package is installed:

   ```bash
   dpkg -l | grep intune-portal
   ```

> 📋 **Note — deb vs Snap:** The Snap package (`snap install intune-portal`) was available during preview and is **deprecated**. Use the deb package via `packages.microsoft.com` for general-availability deployments. The Snap path will not receive Identity Broker 2.0.2+ updates.

### Step 3: Verify Microsoft Identity Broker is running

#### On device

1. Check the system-scope broker service:

   ```bash
   systemctl status microsoft-identity-broker
   ```

2. Check the user-scope agent timer:

   ```bash
   systemctl --user status intune-agent.timer
   ```

   > **What breaks if misconfigured:** If `microsoft-identity-broker` is not running, `intune-portal` cannot complete Entra ID authentication and enrollment will fail at the sign-in step. Symptom appears in: `intune-portal` app (authentication error at sign-in). See: [Linux Enrollment Failed](../l1-runbooks/30-linux-enrollment-failed.md)

#### In Intune admin center

1. Navigate to **Devices** > **Linux** and confirm the device appears after the user completes enrollment.
2. Verify device status shows **Compliant** or **Not compliant** (not **Unknown** — Unknown indicates the broker is not reporting).

## Verification

- [ ] `dpkg -l | grep intune-portal` shows the package installed with version 2.0.2 or later
- [ ] `systemctl status microsoft-identity-broker` shows **active (running)**
- [ ] `systemctl --user status intune-agent.timer` shows **active (waiting)** or **active (running)**
- [ ] Device appears in Intune admin center > Devices > Linux after user completes enrollment
- [ ] Device shows a primary user associated (confirms user-affinity enrollment succeeded)

## See Also

- [Enrollment Profile](02-enrollment-profile.md)
- [Linux Prerequisites — Non-version Breakpoints](../linux-lifecycle/01-linux-prerequisites.md#non-version-breakpoints)
- [Linux Glossary — intune-portal package](../_glossary-linux.md#intune-portal-package)
- [Linux Glossary — microsoft-identity-broker](../_glossary-linux.md#microsoft-identity-broker)
- [Linux Enrollment Overview](../linux-lifecycle/00-enrollment-overview.md)

---

| Date | Change | Author |
|------|--------|--------|
| 2026-04-27 | Initial version — Intune Linux client install + LIN-05 + PITFALL-3 callouts (Phase 50) | -- |
