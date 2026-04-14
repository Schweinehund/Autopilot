---
last_verified: 2026-04-14
review_by: 2026-07-13
applies_to: ADE
audience: L2
platform: macOS
---

> **Version gate:** This reference documents macOS Terminal commands for Intune and ADE diagnostics. Commands are OS-shipped unless noted. Last verified against macOS 14 (Sonoma). For Windows PowerShell equivalents, see [PowerShell Reference](powershell-ref.md).

# macOS Terminal Commands Reference

Field guide to macOS Terminal commands for Intune and ADE enrollment diagnostics. These are OS-shipped binaries and Microsoft-provided tools -- not project-owned code. The structure mirrors [PowerShell Reference](powershell-ref.md) for cross-platform consistency.

---

## profiles

**Type:** OS-shipped binary
**Synopsis:** Manages configuration profiles on macOS. Primary tool for viewing installed profiles, checking enrollment status, and triggering re-enrollment.
**Last verified:** macOS 14 (Sonoma)

**Subcommands and Flags:**

| Flag / Subcommand | Purpose |
|-------------------|---------|
| `show` | Lists all installed profiles with full detail |
| `list` | Lists profile identifiers (shorter output) |
| `status -type enrollment` | Shows MDM enrollment status and user-approved MDM state |
| `-C -v` | Lists all system-domain profiles verbosely |
| `renew -type enrollment` | Triggers ADE re-enrollment on an already-set-up Mac (macOS 10.13+) |

**Expected Output (`profiles status -type enrollment`):**

```
Enrolled via DEP: Yes
MDM enrollment: Yes (User Approved)
MDM server: https://*.manage.microsoft.com/...
```

**Output Interpretation:**

- **Enrolled via DEP: Yes** -- The device was enrolled through Automated Device Enrollment (ADE) via Apple Business Manager. If `No`, the device was enrolled manually via Company Portal or user-initiated enrollment.
- **MDM enrollment: Yes (User Approved)** -- The device has an active MDM enrollment and the user has approved MDM management in System Settings > Privacy & Security. `User Approved` is required for full management capabilities (kernel extensions, PPPC, etc.). If only `Yes` without `User Approved`, management scope is limited.
- **MDM server** -- The URL of the Intune MDM server the device checks in to. The `*.manage.microsoft.com` pattern confirms Intune management.

**Example:**

```bash
# Check MDM enrollment status
profiles status -type enrollment

# List all installed profiles with full payload detail (requires sudo)
sudo profiles show

# List installed profile identifiers (compact output)
sudo profiles list
```

---

## log show / log stream

**Type:** OS unified logging
**Synopsis:** Queries (`log show`) or streams (`log stream`) the macOS unified log. Primary tool for filtering MDM and profile management events by subsystem.
**Last verified:** macOS 14 (Sonoma)

**Key Subsystem Identifiers:**

| Subsystem | What It Covers |
|-----------|----------------|
| `com.apple.ManagedClient` | Configuration profile installation, MDM command processing |
| `com.apple.ManagedClient.cloudconfigurationd` | ADE/DEP cloud configuration daemon (Setup Assistant enrollment) |
| `com.apple.securityd` | Keychain interactions triggered by MDM profiles |

**Parameters:**

| Flag | Purpose |
|------|---------|
| `--predicate 'subsystem == "..."'` | Filter log entries by subsystem identifier |
| `--info` | Include informational-level messages (excluded by default) |
| `--last 1h` | Show entries from the last hour (`log show` only) |
| `--debug` | Include debug-level messages (verbose) |

**Enable Debug Logging:**

```bash
# Enable debug-level MDM logging (persists across reboots)
sudo log config --subsystem com.apple.ManagedClient --mode="level:debug,persist:debug"

# Reset after troubleshooting
sudo log config --subsystem com.apple.ManagedClient --reset
```

**Example:**

```bash
# Query unified log for MDM/profile events in the last hour
log show --predicate 'subsystem == "com.apple.ManagedClient"' --info --last 1h

# Live stream MDM log entries
log stream --predicate 'subsystem contains "com.apple.ManagedClient"' --info
```

---

## system_profiler

**Type:** OS-shipped binary
**Synopsis:** Reports detailed system configuration. The `SPConfigurationProfileDataType` data type outputs all installed configuration profiles in plist format.
**Last verified:** macOS 14 (Sonoma)

**Parameters:**

| Data Type | Purpose |
|-----------|---------|
| `SPConfigurationProfileDataType` | Outputs all installed configuration profiles with payload details |

**Example:**

```bash
# Output all installed configuration profile data
system_profiler SPConfigurationProfileDataType
```

---

## defaults read

**Type:** OS-shipped binary
**Synopsis:** Reads macOS defaults (preference) values. Used to inspect Intune-managed preference plists.
**Last verified:** macOS 14 (Sonoma)

**Parameters:**

| Parameter | Purpose |
|-----------|---------|
| domain path | Path to the plist domain (e.g., `/Library/Managed Preferences/com.microsoft.intune`) |
| key (optional) | Specific key to read; omit to dump all keys |

**Example:**

```bash
# Read all Intune-managed preferences
defaults read /Library/Managed\ Preferences/com.microsoft.intune
```

---

## pgrep

**Type:** OS-shipped binary
**Synopsis:** Searches for processes by name. Used to verify Intune management agent processes are running.
**Last verified:** macOS 14 (Sonoma)

**Key Processes:**

| Process Name | Role |
|--------------|------|
| `IntuneMdmDaemon` | Intune management daemon (system-level, runs as root) |
| `IntuneMdmAgent` | Intune management agent (user-level) |

**Example:**

```bash
# Check if Intune management processes are running
pgrep -il "^IntuneMdm"
```

---

## IntuneMacODC

**Type:** Microsoft-provided diagnostic collection script (NOT OS-shipped)
**Synopsis:** Collects all Intune diagnostic logs and system info into a zip file. Requires download from Microsoft.
**Last verified:** macOS 14 (Sonoma), requires macOS 10.15+

**Acquisition:**

```bash
# Download the diagnostic collection script
curl -L https://aka.ms/IntuneMacODC -o IntuneMacODC.sh

# Make executable
chmod u+x ./IntuneMacODC.sh

# Run with elevated privileges
sudo ./IntuneMacODC.sh
```

**Output:** `IntuneMacODC.zip` in an `ODC/` subfolder, opened automatically in Finder. The zip contains Intune agent logs, system profiler output, installed profiles, and process lists.

**Example:**

```bash
# Run the diagnostic collection
sudo ./IntuneMacODC.sh
```

---

## See Also

- [macOS Log Paths Reference](macos-log-paths.md) -- Log file locations referenced by these commands
- [macOS Provisioning Glossary](../_glossary-macos.md) -- ADE and ABM terminology
- [PowerShell Reference](powershell-ref.md) -- Windows equivalent diagnostic commands
- [Windows vs macOS Concept Comparison](../windows-vs-macos.md) -- Cross-platform diagnostic tool mapping
