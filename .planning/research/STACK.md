# Technology Stack

**Project:** Windows Autopilot Troubleshooter — v1.1 APv2 Documentation & Admin Setup Guides
**Researched:** 2026-04-10
**Confidence:** HIGH (all core sources verified against live Microsoft Learn pages updated 2026-04-07 to 2026-04-10)

---

## Section 1: Documentation Tooling (unchanged from v1.0)

The documentation tooling stack is unchanged from v1.0 research. See the v1.0 STACK.md for the Markdown/Mermaid/MkDocs/Pandoc/markdownlint-cli2 selections and rationale. No tooling changes are needed for v1.1 content.

---

## Section 2: Authoritative Reference Sources for v1.1 Content

This is the primary new research area for v1.1. The question is: what sources are authoritative for APv2 behavior, error codes, and admin configuration — and what documentation gaps exist?

### Primary Microsoft Learn Sources (HIGH confidence — verified 2026-04-10)

| Source | URL | Content | Last Updated |
|--------|-----|---------|--------------|
| APv2 Overview | `https://learn.microsoft.com/en-us/autopilot/device-preparation/overview` | Architecture, Enrollment Time Grouping, capabilities, user experience | 2026-04-07 |
| APv2 Requirements | `https://learn.microsoft.com/en-us/autopilot/device-preparation/requirements` | Software, networking, licensing, configuration, RBAC — tabbed layout | 2026-04-07 |
| APv2 FAQ | `https://learn.microsoft.com/en-us/autopilot/device-preparation/faq` | APv2 vs APv1 differences, limitations, supported scenarios | 2026-04-07 |
| APv2 Troubleshooting FAQ | `https://learn.microsoft.com/en-us/autopilot/device-preparation/troubleshooting-faq` | Failure scenarios with step-by-step resolution — critical for runbooks | 2026-04-07 |
| APv2 Known Issues | `https://learn.microsoft.com/en-us/autopilot/device-preparation/known-issues` | Active and resolved bugs with workarounds — updated 2026-04-10 | 2026-04-10 |
| APv2 Reporting & Monitoring | `https://learn.microsoft.com/en-us/autopilot/device-preparation/reporting-monitoring` | Deployment status report, app/script statuses, log download | 2026-02-05 |
| APv2 Compare | `https://learn.microsoft.com/en-us/autopilot/device-preparation/compare` | Feature matrix vs APv1 — the definitive side-by-side | 2026-04-07 |
| APv2 Tutorial Scenarios | `https://learn.microsoft.com/en-us/autopilot/device-preparation/tutorial/scenarios` | Two supported scenarios: user-driven Entra join, automatic (W365) | 2026-02-05 |
| APv2 User-Driven Workflow | `https://learn.microsoft.com/en-us/autopilot/device-preparation/tutorial/user-driven/entra-join-workflow` | 7-step admin setup walkthrough | 2026-02-05 |
| APv1 Profiles | `https://learn.microsoft.com/en-us/autopilot/profiles` | All APv1 profile settings, OOBE configuration options, assignment | 2026-02-05 |
| APv1 ESP Setup | `https://learn.microsoft.com/en-us/intune/intune-service/enrollment/windows-enrollment-status` | Full ESP configuration reference — all settings, tracking phases, known issues | 2026-04-09 |
| APv1 Tutorial Index | `https://learn.microsoft.com/en-us/autopilot/tutorial/autopilot-scenarios` | Links to all APv1 scenario tutorials (user-driven, pre-provision, self-deploy, existing devices) | — |
| APv1 Registration Overview | `https://learn.microsoft.com/en-us/autopilot/registration-overview` | Hardware hash registration, deregister flow | — |

### Secondary Sources (MEDIUM confidence — community-verified content)

| Source | URL | Value |
|--------|-----|-------|
| Call4Cloud APv2 Technical Flow | `https://call4cloud.nl/autopilot-device-preparation-flow-apv2/` | Deep technical walkthrough of BootstrapperAgent flow; diagrams and event log references |
| Call4Cloud APv2 Introduction | `https://call4cloud.nl/autopilot-device-preparation-v2-apv2/` | Early practical guide; good for understanding differences from admin perspective |
| Out Of Office Hours APv2 Troubleshooting | `https://oofhours.com/2025/05/01/next-generation-autopilot-troubleshooting/` | Next-gen Autopilot troubleshooting guidance from Michael Niehaus (Microsoft Autopilot PM) — HIGH authority |
| Ocean Leaf APv2 Troubleshooting | `https://www.oceanleaf.ch/autopilot-troubleshooting-v2/` | Practical combined APv1/APv2 troubleshooting guide |
| Patch My PC APv2 Troubleshooting | `https://patchmypc.com/blog/ultimate-guide-troubleshoot-windows-autopilot/` | Covers BootstrapperAgent log locations and event log sources |
| Insentra APv1 Log Guide | `https://www.insentragroup.com/us/insights/geek-speak/modern-workplace/mastering-windows-autopilot-logs-troubleshooting-insights/` | Comprehensive APv1 log walkthrough — applicable for L2 guide |

---

## Section 3: Key APv2 Technical Facts (for content accuracy)

These are verified facts from official sources that documentation authors must get right.

### Windows Version Requirements (HIGH confidence)

- Windows 11 24H2 or later — no KB patch required
- Windows 11 23H2 with KB5035942 (March 2024 cumulative update) or later
- Windows 11 22H2 with KB5035942 or later
- Windows 10 — NOT supported (APv2 is Windows 11 only)
- OEM-shipped devices: verify with OEM that the minimum update is pre-installed before first boot

### Supported Deployment Scenarios (HIGH confidence)

APv2 supports exactly two scenarios as of April 2026:
1. User-driven Microsoft Entra join (physical devices)
2. Automatic deployment for Windows 365 Frontline shared/dedicated/Cloud Apps (in preview for some sub-scenarios)

NOT supported in APv2 (APv1 only):
- Pre-provisioning (white glove)
- Self-deploying mode
- Existing devices scenario
- Autopilot Reset
- Microsoft Entra hybrid join
- HoloLens, Teams Meeting Room
- Windows 10
- DFCI management
- Co-management with ConfigMgr

### Core Architecture Differences from APv1 (HIGH confidence)

| Dimension | APv1 | APv2 |
|-----------|------|------|
| Device pre-registration | Required (hardware hash upload) | Not required |
| OOBE tracking mechanism | Enrollment Status Page (ESP) | Custom "Setting up for work or school" window with % progress |
| Group membership at enrollment | Dynamic groups (query-based, slow) | Enrollment Time Grouping — static assigned group, immediate |
| Admin config objects | Deployment profile + ESP profile | Single Device Preparation policy |
| LOB + Win32 in same deployment | Not supported (TrustedInstaller conflict) | Supported (serialized delivery) |
| App limit during OOBE | Up to 100 | Up to 25 (LOB/Win32/Store/M365) + up to 10 PowerShell scripts |
| Monitoring | Batch, not real-time | Near real-time per-device status |
| Profile precedence | APv1 wins if both exist on same device | APv2 policy is ignored if device has APv1 registration |

### Admin Setup Steps — APv2 User-Driven (HIGH confidence, 7 steps)

1. Set up Windows automatic Intune enrollment
2. Allow users to join devices to Microsoft Entra ID
3. Create an assigned device security group — must have "Intune Provisioning Client" (AppID: f1346770-5b25-470b-88bd-d5744ab7952c) as owner; must NOT be role-assignable
4. Create a user group — policy is assigned to users, not devices
5. Assign applications and PowerShell scripts to the device group in System context
6. Create the Device Preparation policy — select device group, user group, apps, scripts, timeout, user account type
7. (Optional) Add Windows corporate identifiers for devices

### Admin Setup Steps — APv1 (HIGH confidence, varies by scenario)

All APv1 scenarios share:
- Device registration (hardware hash via OEMS, MPC, Intune, or PowerShell)
- Dynamic or assigned device group for profile targeting
- Deployment profile creation (mode, OOBE settings, join type, naming template)
- ESP profile creation (blocking behavior, timeout, app list, quality updates setting)

Scenario-specific additions:
- **Pre-provisioning**: Enable "Allow pre-provisioned deployment" in profile; technician flow execution
- **Hybrid join**: Domain Join profile + Intune Connector for AD + on-premises OU configuration
- **Self-deploying**: TPM attestation prerequisite; no user association

### Licensing Requirements (HIGH confidence)

APv2 requires one of:
- Microsoft 365 Business Premium, F1, F3, Academic A1/A3/A5, Enterprise E3/E5
- EMS E3/E5
- Intune for Education
- Entra ID P1/P2 + Intune subscription

Same licensing as APv1 — no new license tier required for APv2.

### RBAC Requirements — APv2 Specific (HIGH confidence)

APv2 requires a custom Intune role with these minimum permissions:
- Device configurations: Read, Delete, Assign, Create, Update
- Enrollment programs: Enrollment time device membership assignment
- Managed apps: Read
- Mobile apps: Read
- Organization: Read

Note: The "Enrollment time device membership assignment" permission is APv2-unique — it does not exist as a concept in APv1 administration.

### Network Endpoints — APv2 Additions (HIGH confidence)

APv2 uses all standard Autopilot endpoints plus:
- `lgmsapeweu.blob.core.windows.net` — automatic diagnostics collection upload (must not be blocked)
- `login.live.com` — Windows Autopilot deployment service
- All Intune endpoints from: `https://learn.microsoft.com/en-us/intune/intune-service/fundamentals/intune-endpoints`

Note: APv2 does NOT require `ztd.dds.microsoft.com` or `cs.dds.microsoft.com` (the APv1 ZTD registration endpoints) because device pre-registration is not required.

### Diagnostic Log Sources — APv2 (MEDIUM confidence, partially from community sources)

| Log Source | Location | Purpose |
|------------|----------|---------|
| BootstrapperAgent event log | Event Viewer during OOBE | Primary real-time log; orchestrates provisioning flow |
| Intune admin center deployment report | Devices > Monitor > Windows Autopilot device preparation deployments | Per-device status, app/script status, deployment time |
| Diagnostic download (admin) | Deployment report > Device deployment details > Failed device | Available for 28 days post-deployment; auto-collected on failure |
| Export logs (user) | User-initiated from OOBE failure screen | Saves to first USB drive without dialog (known issue: no success/failure message shown) |
| AppWorkload.log | `C:\ProgramData\Microsoft\IntuneManagementExtension\Logs\` | App installation details (replaced IntuneManagementExtension.log for app tracking) |

### Key Known Issues Active as of 2026-04-10 (HIGH confidence)

1. **Managed installer policy blocks Win32/WinGet/Enterprise App Catalog during OOBE** — apps are marked "Skipped" and install post-desktop. Affects tenants with Managed Installer policy active; also always affects Education tenants (Windows 11 SE requirement). Status: RESOLVED April 2026 per Microsoft known issues page.
2. **BitLocker defaults to 128-bit even when 256-bit configured** — race condition during deployment. Workaround: don't use 256-bit BitLocker with APv2 until resolved. Status: ACTIVE (no resolution date).
3. **Device stuck at 100% during OOBE** — user must manually restart. Status: ACTIVE (fix in progress).
4. **Conflict between APv2 "Standard user" setting and Entra ID Local Administrator Settings** — specific combinations cause provisioning to be skipped, leaving user at desktop without apps. Documented workarounds available. Status: ACTIVE.
5. **Exporting logs during OOBE failure doesn't show result** — saves silently to USB. Status: ACTIVE (fix planned).
6. **Apps/Scripts tabs in policy editing show wrong content** — visual bug only; workaround: click table header to reload. Status: ACTIVE.

### Common APv2 Failure Scenarios for Runbook Coverage (HIGH confidence)

From official troubleshooting FAQ:
1. Device not added to device group → Intune Provisioning Client not set as group owner; or role-assignable group used; or admin lacks "Enrollment time device membership assignment" RBAC permission
2. APv2 experience never launches → minimum Windows version not met; device is registered as APv1 device (APv1 takes precedence); user not in user group; no device group selected in policy; corporate identifiers blocking enrollment
3. Apps/scripts not installing → not assigned to device group; not configured for System context
4. Policy shows "0 groups assigned" → Intune Provisioning Client not owner of group (intermittent UI display bug — may also be a data issue)
5. Wrong policy applied when multiple exist → priority order; use Intune policy priority list to reorder

### APv1 Admin Setup — Profile Configuration Reference (HIGH confidence)

APv1 Deployment Profile settings available in Intune:
- Deployment mode: User-driven or Self-deploying
- Join type: Entra join or Entra hybrid join
- Convert all targeted devices to Autopilot (auto-register)
- Microsoft Software License Terms (show/hide EULA)
- Privacy settings (show/hide)
- Hide change account options
- User account type (Administrator or Standard)
- Allow pre-provisioned deployment (enables white glove)
- Language/Region pre-selection
- Automatic keyboard configuration
- Device name template (up to 15 chars; %SERIAL%, %RAND:x% macros)

APv1 ESP Settings available in Intune:
- Show app and profile configuration progress (yes/no)
- Timeout (minutes; default 60)
- Custom error message
- Log collection and diagnostics page (yes/no)
- Show only during OOBE (yes/no — controls if repeated for subsequent users)
- Install Windows quality updates during OOBE (new setting, 2025-06 D+ required)
- Block device use until all apps/profiles installed (yes/no)
- Allow users to reset on install error (yes/no)
- Allow users to bypass on install error (yes/no)
- Block until specific apps installed (all or selected list, up to 100 apps)
- Only fail selected blocking apps in technician phase (pre-provisioning)

---

## Section 4: Documentation Gap Analysis

### What Microsoft Learn Does Cover for APv2

- Complete requirements (software, network, licensing, config, RBAC)
- Two tutorial walkthroughs (user-driven Entra join in 7 steps, automatic for W365)
- Troubleshooting FAQ for most common failures
- Known issues list (actively maintained — updated 2026-04-10)
- Reporting/monitoring reference
- Feature comparison vs APv1

### What Microsoft Learn Does NOT Cover (Gaps)

1. **No APv2 error code catalog** — The troubleshooting FAQ is scenario-based, not error-code-indexed. Unlike APv1 (which has specific hex codes like 0x80180014, 0x80180018), APv2 failures are described in natural language in the deployment report. There is no official Microsoft error code table for APv2. Documentation must derive error conditions from troubleshooting FAQ scenarios rather than a code list.

2. **No APv2 L1/L2 runbook content** — Microsoft provides admin configuration guidance and troubleshooting FAQs but no tiered Service Desk vs Desktop Engineering split. The project's tiered runbook structure must be authored from first principles using the troubleshooting FAQ as source material.

3. **No official BootstrapperAgent event ID reference** — Microsoft docs acknowledge the BootstrapperAgent log as the primary OOBE log source but do not publish a structured event ID catalog. Community sources (Call4Cloud, oofhours.com) provide the most detailed coverage here. Mark as MEDIUM confidence.

4. **Limited APv2 OOBE flow documentation** — The 10-step deployment flow in the user-driven workflow tutorial is the most complete description, but it is admin-facing setup context, not a detailed stage-by-stage lifecycle document comparable to the APv1 lifecycle docs built in v1.0.

5. **No APv2 decision tree content from Microsoft** — Decision trees must be authored based on the troubleshooting FAQ failure scenarios. The logical flow (Did APv2 launch? → check Windows version → check APv1 registration → check user group → etc.) must be constructed from the FAQ.

6. **No APv1 admin setup guide in one place** — Microsoft's APv1 setup documentation is distributed across multiple tutorial pages by scenario. There is no single "APv1 admin setup guide" document. The admin setup guide must synthesize content from the profiles page, ESP page, and scenario tutorial links.

### Documentation Coexistence Concern

APv1 and APv2 coexist in the same tenant, but a given device runs only one. APv1 profiles take precedence over APv2 policies. This "precedence" behavior is a critical concept for both troubleshooting (why isn't APv2 running?) and admin setup (deregister APv1 devices before APv2 rollout). The existing `docs/apv1-vs-apv2.md` partially addresses this but does not yet include admin action guidance.

---

## Section 5: Alternatives Considered

| Category | Recommended Source | Alternative | Why Not |
|----------|--------------------|-------------|---------|
| APv2 error code reference | Troubleshooting FAQ scenarios | Microsoft error code glossary | Does not exist for APv2 |
| APv2 event log reference | Community sources (oofhours.com, Call4Cloud) | Official Microsoft event ID catalog | Microsoft does not publish one for APv2/BootstrapperAgent |
| APv2 lifecycle stages | Microsoft Learn tutorial flow + FAQ | Third-party deployment guides | Official source is more complete and authoritative |
| APv1 admin setup synthesis | Profiles page + ESP page + scenario tutorials | Single official guide | No single guide exists; synthesis required |

---

## Sources

All Microsoft Learn sources confirmed current (last updated dates verified against live pages):

- [APv2 Overview](https://learn.microsoft.com/en-us/autopilot/device-preparation/overview) — updated 2026-04-07, HIGH confidence
- [APv2 Requirements](https://learn.microsoft.com/en-us/autopilot/device-preparation/requirements) — updated 2026-04-07, HIGH confidence
- [APv2 FAQ](https://learn.microsoft.com/en-us/autopilot/device-preparation/faq) — updated 2026-04-07, HIGH confidence
- [APv2 Troubleshooting FAQ](https://learn.microsoft.com/en-us/autopilot/device-preparation/troubleshooting-faq) — updated 2026-04-07, HIGH confidence
- [APv2 Known Issues](https://learn.microsoft.com/en-us/autopilot/device-preparation/known-issues) — updated 2026-04-10, HIGH confidence
- [APv2 Reporting and Monitoring](https://learn.microsoft.com/en-us/autopilot/device-preparation/reporting-monitoring) — updated 2026-02-05, HIGH confidence
- [APv2 Compare to APv1](https://learn.microsoft.com/en-us/autopilot/device-preparation/compare) — updated 2026-04-07, HIGH confidence
- [APv2 Tutorial Scenarios](https://learn.microsoft.com/en-us/autopilot/device-preparation/tutorial/scenarios) — HIGH confidence
- [APv2 User-Driven Workflow](https://learn.microsoft.com/en-us/autopilot/device-preparation/tutorial/user-driven/entra-join-workflow) — HIGH confidence
- [APv1 Profiles](https://learn.microsoft.com/en-us/autopilot/profiles) — HIGH confidence
- [APv1 ESP Setup](https://learn.microsoft.com/en-us/intune/intune-service/enrollment/windows-enrollment-status) — updated 2026-04-09, HIGH confidence
- [Out Of Office Hours APv2 Troubleshooting](https://oofhours.com/2025/05/01/next-generation-autopilot-troubleshooting/) — MEDIUM confidence (community; authored by Michael Niehaus, Microsoft Autopilot PM)
- [Call4Cloud APv2 Technical Flow](https://call4cloud.nl/autopilot-device-preparation-flow-apv2/) — MEDIUM confidence (community)
- [Patch My PC APv2 Troubleshooting](https://patchmypc.com/blog/ultimate-guide-troubleshoot-windows-autopilot/) — MEDIUM confidence (community)

---
*Stack research for: APv2 documentation and admin setup guides — v1.1 milestone*
*Researched: 2026-04-10*
