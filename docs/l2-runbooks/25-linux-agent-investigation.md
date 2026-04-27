---
last_verified: 2026-04-27
review_by: 2026-06-26
applies_to: all
audience: L2
platform: Linux
---

> **Platform gate:** This guide covers Linux Intune client (`intune-portal`) L2 investigation via Microsoft Intune. For Windows Autopilot, see [Windows L2 Runbooks](00-index.md). For macOS ADE, see [macOS ADE Runbooks](00-index.md#macos-ade-runbooks). For iOS/iPadOS, see [iOS L2 Runbooks](00-index.md#ios-l2-runbooks). For Android Enterprise, see [Android L2 Runbooks](00-index.md#android-l2-runbooks).

# Linux Agent Investigation

## Context

This runbook is the L2 trap-by-trap investigation guide for Linux Intune client (`intune-portal`) failures on Ubuntu 22.04/24.04 LTS. It is consumed AFTER log collection — start with [Linux Log Collection Guide (Runbook 24)](24-linux-log-collection.md) to gather `journalctl` output, file-based log snapshots, and `dpkg`/`apt` package-state queries before opening this runbook.

The four trap families documented below are cross-tier-distinct from Phase 51 L1 cause topology (Anti-Pattern 1 mitigation per CDI-Phase52-03). L1 causes describe user-facing symptoms (package install / sign-in / enrollment timeout / agent service failure); L2 traps describe investigation tools and techniques (kernel-track verification, snap-vs-deb delivery path detection, user-scope vs system-scope service mechanics, Identity Broker re-enrollment signals).

**From L1 escalation?** One of the Phase 51 Linux L1 runbooks has routed here. L1 collected the escalation packet: serial number, user UPN, distro+kernel version (`lsb_release -a` and `uname -r` output), `dpkg -l intune-portal` output, and device-side symptom description.

- L1 [30-linux-enrollment-failed.md#cause-a-package-install](../l1-runbooks/30-linux-enrollment-failed.md#cause-a-package-install) → [Trap A](#trap-a-kernel-track) (kernel-track mismatch causes deb install failure) or [Trap B](#trap-b-delivery-path) (snap-vs-deb delivery confusion)
- L1 [30-linux-enrollment-failed.md#cause-b-sign-in-failure](../l1-runbooks/30-linux-enrollment-failed.md#cause-b-sign-in-failure) → [Trap D](#trap-d-identity-broker) (Identity Broker v2.0.2+ re-enrollment)
- L1 [30-linux-enrollment-failed.md#cause-c-enrollment-timeout](../l1-runbooks/30-linux-enrollment-failed.md#cause-c-enrollment-timeout) → [Trap C](#trap-c-service-state) (service-state user-scope confusion)
- L1 [33-linux-agent-service-failure.md](../l1-runbooks/33-linux-agent-service-failure.md) → [Trap C](#trap-c-service-state) (primary L2 escalation target from Runbook 33)
- L1 [31-linux-compliance-non-compliant.md#cause-d-custom-compliance-failure](../l1-runbooks/31-linux-compliance-non-compliant.md#cause-d-custom-compliance-failure) → return to [Runbook 24 Section 2.2](24-linux-log-collection.md#section-2-file-based-paths) for `/var/log/intune-update.log` Bash exit-code reading
- No L1 escalation: begin at [Trap A](#trap-a-kernel-track) and work through independently

## How to Use This Runbook

Check the trap that matches your observation. Traps are independently diagnosable — you do not need to rule out prior traps. Each trap has its own Entry condition, Symptom, Investigation Steps, Resolution, and Verification subsections; choose the trap matching the L1 escalation packet (or the symptom you observed) and follow that trap's Investigation Steps.

- [Trap A: Ubuntu HWE vs GA Kernel Mismatch](#trap-a-kernel-track)
- [Trap B: Snap-vs-Deb Delivery Path Confusion](#trap-b-delivery-path)
- [Trap C: Service-State User-Scope Confusion](#trap-c-service-state)
- [Trap D: Identity Broker v2.0.2+ Re-enrollment](#trap-d-identity-broker)

## Trap A: Ubuntu HWE vs GA Kernel Mismatch {#trap-a-kernel-track}

**Entry condition:** L1 escalation packet shows `uname -r` output with a kernel version that does not match the Ubuntu release's GA kernel band, AND the user reports `intune-portal` deb install failure or `intune-agent.timer` activation failure.

See [HWE kernel](../_glossary-linux.md#hwe-kernel) and [GA kernel](../_glossary-linux.md#ga-kernel) for the kernel-channel distinction. Phase 49 version matrix: Ubuntu 22.04 GA = 5.15 / HWE = 6.8; Ubuntu 24.04 GA = 6.8 / HWE = 6.11+ (24.04.3 HWE may be 6.14+).

### Symptom

- `intune-portal` deb install fails at `dpkg --configure` stage with PAM-module errors
- `intune-agent.timer` activation fails after a successful enrollment with no clear journalctl error in user-scope timer journal
- `lsb_release -rs` shows 22.04 but `uname -r` shows a kernel starting with `6.` (HWE backport from 24.04 GA)

### Investigation Steps

1. Verify kernel track on the device:

   ```bash
   uname -r
   lsb_release -rs
   ```

2. Cross-reference against the Linux version-track matrix (Phase 49 [01-linux-prerequisites.md](../linux-lifecycle/01-linux-prerequisites.md)):
   - Ubuntu 22.04 + GA kernel → `uname -r` returns `5.15.x-xxx-generic`
   - Ubuntu 22.04 + HWE kernel → `uname -r` returns `6.8.x-xxx-generic`
   - Ubuntu 24.04 + GA kernel → `uname -r` returns `6.8.x-xxx-generic`
   - Ubuntu 24.04 + HWE kernel → `uname -r` returns `6.11.x-xxx-generic` (or 6.14+ for 24.04.3)

3. Confirm package version compatibility against installed kernel:

   ```bash
   dpkg -l intune-portal | grep -A1 intune-portal
   ```

4. Pull recent dpkg.log entries for the install attempt timeline:

   ```bash
   grep -E "intune-portal|microsoft-identity-broker" /var/log/dpkg.log | tail -50
   ```

> **Note:** Microsoft Learn does not document specific HWE-kernel-related failure signatures for `intune-portal`. PITFALL-4 in `.planning/research/PITFALLS.md` establishes HWE divergence as a known risk; the L2-actionable signal is the `uname -r` output cross-referenced against the version-track matrix above.

### Resolution

If the user is on HWE kernel for Ubuntu 22.04 and the `intune-portal` deb install is failing, pin to GA kernel via:

```bash
sudo apt install linux-image-generic
```

Or, if HWE compatibility is required for other reasons, install the `intune-portal` deb against the HWE kernel:

```bash
sudo apt update
sudo apt install --reinstall intune-portal
```

Then reboot and re-attempt enrollment.

### Verification

```bash
uname -r
dpkg -l intune-portal | grep ^ii
systemctl --user status intune-agent.timer
```

Expected: `uname -r` matches GA or HWE band per the version-track matrix; `dpkg -l intune-portal` shows `ii` (installed+configured); `intune-agent.timer` is `active (waiting)`. If still failing, escalate to L1 [30-linux-enrollment-failed.md#cause-a-package-install](../l1-runbooks/30-linux-enrollment-failed.md#cause-a-package-install) for return-route triage.

## Trap B: Snap-vs-Deb Delivery Path Confusion {#trap-b-delivery-path}

**Entry condition:** L1 escalation packet shows enrollment failed at package-install stage AND `dpkg -l intune-portal` returns no rows OR shows an unexpected version. The user may have followed deprecated preview-era instructions referencing a snap installation path.

See [deb (package format)](../_glossary-linux.md#deb-package-format) for delivery-path context. `intune-portal` is delivered EXCLUSIVELY as a deb from `packages.microsoft.com` per Phase 49 D-04 — there is no GA snap distribution; snap is a deprecated preview path only.

### Symptom

- `dpkg -l intune-portal` returns no rows even though the user believes the agent is installed
- `which intune-portal` returns a path under `/snap/` instead of `/opt/microsoft/`
- `apt list --installed | grep intune-portal` returns empty but `snap list` shows an `intune-portal` entry
- Enrollment workflow fails because the snap-based binary is not the same as the GA deb-based agent

### Investigation Steps

1. Confirm whether deb is installed (read-only):

   ```bash
   apt list --installed | grep intune-portal
   dpkg -l intune-portal
   ```

   Expected GA output: `intune-portal/jammy,now 2.0.X amd64 [installed]` and `ii  intune-portal  2.0.X  amd64  ...` (`ii` = installed + configured).

2. Detect erroneous snap installation (negative-space check):

   ```bash
   snap list 2>/dev/null | grep -i intune
   ```

   Expected: no output. Unexpected: any snap entry indicates the user is on the deprecated preview path.

3. Verify binary path (deb vs snap):

   ```bash
   which intune-portal 2>/dev/null
   readlink -f $(which intune-portal 2>/dev/null) 2>/dev/null
   ```

   - GA deb path: `/opt/microsoft/intune-portal/bin/intune-portal` or similar system path
   - Snap path: contains `/snap/intune-portal/` (deprecated)

### Resolution

If the user is on a snap-based installation, remove the snap and install the GA deb:

```bash
sudo snap remove intune-portal
curl -sSL https://packages.microsoft.com/keys/microsoft.asc | sudo gpg --dearmor -o /usr/share/keyrings/microsoft.gpg
sudo apt update
sudo apt install intune-portal
```

If both snap and deb are present (theoretically possible if user added the Microsoft APT repo after installing the snap), remove the snap first then re-confirm the deb is the primary binary.

### Verification

```bash
which intune-portal
dpkg -l intune-portal | grep ^ii
snap list 2>/dev/null | grep -i intune
```

Expected: `which intune-portal` resolves to the deb system path; `dpkg -l intune-portal` shows `ii`; snap detection returns empty. If still failing, escalate to L1 [30-linux-enrollment-failed.md#cause-a-package-install](../l1-runbooks/30-linux-enrollment-failed.md#cause-a-package-install).

## Trap C: Service-State User-Scope Confusion {#trap-c-service-state}

**Entry condition:** L1 escalation packet (typically from L1 [33-linux-agent-service-failure.md](../l1-runbooks/33-linux-agent-service-failure.md)) shows that the user reports `intune-agent` is "not running," but the L1 responder may have queried the wrong systemd scope (system vs user). `intune-agent.timer` is a USER-scope unit; querying it with `systemctl status intune-agent` (no `--user`) returns "Unit not found" or wrong information.

See [systemd](../_glossary-linux.md#systemd) and [intune-agent.timer](../_glossary-linux.md#intune-agenttimer) for service-management context.

### Symptom

- `systemctl status intune-agent` (without `--user`) returns "Unit intune-agent.service could not be found" or a stale system-scope record
- `systemctl --user status intune-agent.timer` returns `inactive (dead)` or `failed`
- L1 attempted `sudo systemctl restart intune-agent` and reported no improvement (because the unit they restarted was wrong scope)

### Investigation Steps

1. Confirm the system-scope query L1 may have used (this is the SC#1 ROADMAP literal):

   ```bash
   systemctl status intune-agent
   ```

   This may report "Unit not found" — that's expected because the canonical user-scope unit is `intune-agent.timer`.

2. Query the correct user-scope timer (no sudo per DPO-Phase52-01):

   ```bash
   systemctl --user status intune-agent.timer
   systemctl --user is-active intune-agent.timer
   systemctl --user is-enabled intune-agent.timer
   ```

   Expected healthy state: `Active: active (waiting)`, `is-active` returns `active`, `is-enabled` returns `enabled`.

3. List all user-scope timers to confirm `intune-agent.timer` is registered:

   ```bash
   systemctl --user list-timers --all
   ```

   Expected: `intune-agent.timer` appears with a non-empty NEXT column.

4. Collect user-scope timer journal for recent activations:

   ```bash
   journalctl --user -u intune-agent.timer --since "1 hour ago" --no-pager
   ```

5. If the timer is failed/inactive, also inspect related user-scope services (broker, agent process):

   ```bash
   systemctl --user status microsoft-identity-broker
   journalctl --user -u microsoft-identity-broker --since "1 hour ago" --no-pager
   ```

### Resolution

If the timer is inactive and not enabled, re-enable it (no sudo for `--user` scope — this is the SC#2 ROADMAP literal):

```bash
systemctl enable --user --now intune-agent.timer
```

If the user-scope systemd instance is in a degraded state, reload the user-scope daemon (no sudo):

```bash
systemctl --user daemon-reload
systemctl --user restart intune-agent.timer
```

If the system-scope agent is genuinely failed (rare — it is typically a wrapper service), restart it explicitly (sudo permitted only for system-scope state-changing operations):

```bash
sudo systemctl restart intune-agent
```

### Verification

```bash
systemctl --user is-active intune-agent.timer
systemctl --user list-timers intune-agent.timer
journalctl --user -u intune-agent.timer --since "5 minutes ago" --no-pager
```

Expected: `is-active` returns `active`; `list-timers` shows a non-empty NEXT column; recent journal entries show timer firing successfully.

## Trap D: Identity Broker v2.0.2+ Re-enrollment {#trap-d-identity-broker}

**Entry condition:** Admin reports CA assignment drift, Intune filter regression, or Entra group membership not applying for a previously-working Linux endpoint, AND `dpkg -l microsoft-identity-broker` shows version 2.0.2 or later. The Identity Broker v2.0.2+ architecture automatically re-registers and re-enrolls devices, creating new Intune device IDs and new Microsoft Entra device IDs — silently — when the broker package crosses the v2.0.2 threshold.

See [microsoft-identity-broker](../_glossary-linux.md#microsoft-identity-broker) for broker context. This trap consumes Phase 50 LIN-05 admin-side pitfall callout (`docs/admin-setup-linux/01-intune-linux-agent.md`) by reference per CD-07.

### Symptom

- A Linux endpoint that was previously compliant suddenly shows up as non-compliant or unassigned in the Intune admin center
- The endpoint's Intune device ID has changed since the last L1 escalation packet
- Existing CA assignments scoped to the old device ID stop applying after a broker package update — affected users see policy not enforced or filters not matching the new device IDs

### Investigation Steps

1. Confirm Identity Broker version crossed the v2.0.2 threshold:

   ```bash
   dpkg -l microsoft-identity-broker
   dpkg -l microsoft-identity-device-broker
   ```

   Look for version `2.0.2` or later in either package.

2. Check current device state via the dsreg tool:

   ```bash
   dsreg --status
   ```

   Capture the output `Device ID` field. Compare against the L1 escalation packet's recorded device ID — if they differ, re-enrollment occurred.

3. Check user-scope broker for re-enrollment events:

   ```bash
   journalctl --user -u microsoft-identity-broker --since "1 week ago" --no-pager | grep -iE "register|enroll|device.id|re-register"
   ```

4. Check system-scope broker for device registration events (system journal may require sudo):

   ```bash
   sudo journalctl -u microsoft-identity-device-broker --since "1 week ago" --no-pager | grep -iE "register|enroll|device.id"
   ```

5. Cross-reference the new device ID against Intune admin center (Devices > All devices > filter by Linux platform) to confirm the new device ID is assigned the correct CA filters / Entra groups.

> **Note:** Microsoft Learn does not document specific journal log message text for re-enrollment events. The `grep -iE "register|enroll|device.id"` pattern above is an inferred broad signal; the definitive check is `dsreg --status` device ID comparison.

### Resolution

This trap does NOT have a device-side fix — it is an after-the-fact admin investigation. The remediation is admin-side:

- Update CA assignments / Intune filters / Entra group memberships to scope to the NEW device ID (or to a dynamic membership rule that survives device ID changes)
- Document the re-enrollment event in the ticket history
- Cross-link to Phase 50 LIN-05 admin-side pitfall callout for re-enrollment-aware admin workflows

If the device-side cleanup is required (e.g., to force a full re-enrollment to a clean state), the dsreg cleanup workflow is:

```bash
sudo dsreg --tenant-id <tenant-id> --unregister
dsreg --cleanup
```

(Then the user re-signs in via the Intune Portal app to trigger fresh enrollment.)

### Verification

```bash
dsreg --status
dpkg -l microsoft-identity-broker | grep ^ii
journalctl --user -u microsoft-identity-broker --since "1 hour ago" --no-pager | tail -20
```

Expected: `dsreg --status` reports a stable device ID; broker package shows `ii` state; recent broker journal entries show normal sign-in activity (no fresh re-register events). For return-route to L1, see [30-linux-enrollment-failed.md#cause-b-sign-in-failure](../l1-runbooks/30-linux-enrollment-failed.md#cause-b-sign-in-failure).

## Related Resources

- [L2 Runbook Index — Linux L2 Runbooks](00-index.md#linux-l2-runbooks) — Linux L2 runbook set
- [Linux Log Collection Guide (Runbook 24)](24-linux-log-collection.md) — prerequisite for this runbook; Section 1 journalctl output is consumed by all 4 traps
- [Linux Provisioning Glossary](../_glossary-linux.md) — `microsoft-identity-broker`, `intune-agent.timer`, `systemd`, `journalctl`, `hwe-kernel`, `ga-kernel`, `deb-repository`, `snap`
- [Linux L1 Triage Decision Tree](../decision-trees/09-linux-triage.md) — Phase 51 L1 routing surface
- [Linux Capability Matrix — Supported Management Surface](../reference/linux-capability-matrix.md#supported-management-surface) — Ubuntu 22.04/24.04 LTS scope and version-track context for Trap A
- [L1 30: Linux Enrollment Failed](../l1-runbooks/30-linux-enrollment-failed.md) — L1 escalation source; Cause A (package install) → Trap A or Trap B; Cause B (sign-in) → Trap D; Cause C (timeout) → Trap C
- [L1 31: Linux Compliance Non-Compliant](../l1-runbooks/31-linux-compliance-non-compliant.md) — L1 escalation source (custom-compliance Bash via Runbook 24 Section 2)
- [L1 33: Linux Agent Service Failure](../l1-runbooks/33-linux-agent-service-failure.md) — L1 escalation source (primary route to Trap C)
- [Phase 50 LIN-05 Identity Broker callout](../admin-setup-linux/01-intune-linux-agent.md) — admin-side pitfall context for Trap D

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-04-27 | Initial version (Phase 52 — Linux L2 agent investigation; 4 anchor-indexed Traps; CONTEXT D-05/D-06/D-08/D-09; SC#2 literal coverage per V-52-12/13/14; PITFALL-2 negative regression-guard per V-52-21) | -- |
