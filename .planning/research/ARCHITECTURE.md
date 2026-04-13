# Architecture Research

**Domain:** Cross-platform provisioning documentation — macOS ABM/ADE integration + Windows Autopilot operational gap closure
**Researched:** 2026-04-13
**Confidence:** HIGH (existing architecture is well-established; macOS structure follows proven patterns; Microsoft Learn docs confirm feature scope)

## Architectural Decision: Parallel Platform Directories, Not Integrated

### The Core Question

Should macOS content be woven into the existing Windows directories (e.g., a macOS section inside `lifecycle/`) or structured as parallel peer directories (e.g., `lifecycle-macos/` alongside `lifecycle/` and `lifecycle-apv2/`)?

**Recommendation: Parallel platform directories.** The existing architecture already uses this pattern — `lifecycle/` and `lifecycle-apv2/` are siblings, not nested. macOS follows the same convention. The provisioning workflows are fundamentally different technologies (Windows Autopilot vs. Apple ADE/ABM through Intune), sharing almost no diagnostic steps, registry paths, or tooling. Integrated files would violate the established anti-pattern of audience mixing, except applied to platforms instead of roles.

### Why Not Integrated

1. **Different tooling ecosystems.** Windows troubleshooting uses PowerShell, registry inspection, Event Viewer, and MDMDiagnosticsTool. macOS troubleshooting uses Terminal, syslog, `/Library/Logs/Microsoft/Intune/`, and the Company Portal diagnostic export. Zero overlap in commands.

2. **Different enrollment models.** Windows Autopilot uses hardware hash pre-staging (APv1) or ETG (APv2). macOS uses Apple Business Manager device assignment with enrollment program tokens and Setup Assistant. The admin setup sequences share no portal paths.

3. **Different failure modes.** Windows failures surface as ESP timeouts, TPM attestation errors, and hybrid join failures. macOS failures surface as expired Apple MDM push certificates, profile installation failures, keychain errors, and Setup Assistant completion issues. No shared error codes.

4. **Proven pattern.** The APv1/APv2 split already validates that separate-but-linked directories work for this doc suite. The navigation hub (`index.md`) handles routing. Readers self-select by platform before diving in.

## System Overview: v1.2 Target State

```
docs/
├── index.md                          # Cross-platform hub — Windows + macOS entry points
├── _glossary.md                      # Expanded: macOS terms (ABM, ADE, Setup Assistant, APNS)
├── _templates/
│   ├── admin-template.md             # Existing — Windows admin guides
│   ├── admin-template-macos.md       # NEW — macOS admin guides (adapted)
│   ├── l1-template.md                # Existing — reusable for macOS L1
│   └── l2-template.md                # Existing — adapted version for macOS L2
│
├── apv1-vs-apv2.md                   # Existing — unchanged
├── platform-comparison.md            # NEW — "Windows Autopilot vs macOS ADE: which docs?"
│
│ ── WINDOWS CONTENT (existing + operational gap fills) ──
│
├── lifecycle/                         # Existing — APv1 lifecycle
├── lifecycle-apv2/                    # Existing — APv2 lifecycle
├── admin-setup-apv1/                  # Existing — APv1 admin setup
├── admin-setup-apv2/                  # Existing — APv2 admin setup
├── decision-trees/                    # Existing — L1 triage (APv1 + APv2)
├── l1-runbooks/                       # Existing — L1 runbooks (APv1 + APv2)
├── l2-runbooks/                       # Existing — L2 investigation (APv1 + APv2)
├── error-codes/                       # Existing — error code lookup
├── reference/                         # Existing — PowerShell, registry, endpoints
│
│ ── WINDOWS OPERATIONAL GAP CONTENT (new, in existing dirs) ──
│
├── lifecycle/
│   ├── 06-autopilot-reset.md          # NEW — local reset, remote reset, re-provisioning
│   ├── 07-device-retirement.md        # NEW — retirement, wipe, tenant migration
│   └── 08-infrastructure.md           # NEW — network rules, Entra prereqs, licensing matrix
│
├── admin-setup-apv1/
│   ├── 11-app-deployment-esp.md       # NEW — Win32 packaging, install order, timeout tuning
│   ├── 12-security-compliance.md      # NEW — Conditional Access, baselines, compliance timing
│   └── 13-migration-scenarios.md      # NEW — APv1->APv2, imaging->Autopilot, GPO->Intune
│
├── l2-runbooks/
│   └── 09-monitoring-operations.md    # NEW — deployment reporting, drift detection, batch workflow
│
│ ── macOS CONTENT (all new) ──
│
├── lifecycle-macos/                   # NEW — macOS ADE lifecycle
│   ├── 00-overview.md                 # macOS provisioning overview + flow diagram
│   ├── 01-abm-device-assignment.md    # ABM setup, device assignment to MDM server
│   ├── 02-enrollment-profile.md       # ADE enrollment profile configuration
│   ├── 03-setup-assistant.md          # Setup Assistant flow, screen configuration
│   ├── 04-post-enrollment.md          # Profile delivery, app installation, compliance
│   └── 05-device-management.md        # Ongoing management, updates, retirement
│
├── admin-setup-macos/                 # NEW — macOS admin configuration
│   ├── 00-overview.md                 # Setup sequence overview
│   ├── 01-apple-mdm-push-cert.md      # APNS certificate setup + renewal
│   ├── 02-abm-integration.md          # ABM token, MDM server assignment
│   ├── 03-enrollment-profile.md       # ADE enrollment profile + Setup Assistant screens
│   ├── 04-configuration-profiles.md   # Device restrictions, Wi-Fi, VPN, certificates
│   ├── 05-app-deployment.md           # DMG, PKG, VPP, managed apps
│   ├── 06-compliance-security.md      # Compliance policies, FileVault, firewall, Gatekeeper
│   └── 07-config-failures.md          # Configuration-caused failures reference
│
├── decision-trees/
│   └── 05-macos-triage.md             # NEW — macOS L1 triage decision tree
│
├── l1-runbooks/
│   ├── 10-macos-enrollment-failure.md  # NEW — enrollment fails, profile not installing
│   ├── 11-macos-app-not-installed.md   # NEW — apps missing after enrollment
│   └── 12-macos-compliance-issue.md    # NEW — device non-compliant
│
├── l2-runbooks/
│   ├── 10-macos-log-collection.md     # NEW — Intune agent logs, syslog, diagnostic export
│   ├── 11-macos-enrollment-deep.md    # NEW — certificate issues, token expiry, ADE debugging
│   └── 12-macos-profile-delivery.md   # NEW — configuration profile analysis
│
├── reference/
│   ├── endpoints.md                   # MODIFIED — add macOS-specific endpoints section
│   ├── macos-log-paths.md             # NEW — all macOS log file locations
│   └── macos-commands.md              # NEW — Terminal diagnostic commands (macOS equivalent of powershell-ref.md)
│
├── quick-ref-l1.md                    # MODIFIED — add macOS section
├── quick-ref-l2.md                    # MODIFIED — add macOS section
├── common-issues.md                   # MODIFIED — add macOS symptom routing
│
└── architecture.md                    # Existing — unchanged
```

## Component Responsibilities

### New Components

| Component | Responsibility | Communicates With |
|-----------|----------------|-------------------|
| `lifecycle-macos/` | End-to-end macOS provisioning narrative — ABM through ongoing management | Links to `admin-setup-macos/` for configuration steps; links to decision trees at failure points |
| `admin-setup-macos/` | Step-by-step macOS Intune configuration for admins | Links to `lifecycle-macos/` for context; links to L1/L2 runbooks from "what breaks" callouts |
| `decision-trees/05-macos-triage.md` | Mermaid flowchart for macOS enrollment triage | Routes to macOS L1 runbooks |
| `l1-runbooks/10-12` (macOS) | Scripted macOS troubleshooting for Service Desk | Links to macOS decision tree; escalates to macOS L2 runbooks |
| `l2-runbooks/10-12` (macOS) | Technical macOS investigation with Terminal commands | Links to `reference/macos-log-paths.md` and `reference/macos-commands.md` |
| `reference/macos-log-paths.md` | Canonical macOS log file location reference | Linked from all macOS L2 runbooks |
| `reference/macos-commands.md` | Terminal diagnostic commands for macOS | macOS equivalent of `powershell-ref.md`; linked from L2 runbooks |
| `platform-comparison.md` | "Which platform docs do I need?" router | Parallel to `apv1-vs-apv2.md`; linked from `index.md` |

### Modified Components

| Component | Modification | Rationale |
|-----------|-------------|-----------|
| `index.md` | Add macOS sections for L1, L2, Admin; restructure from framework-split to platform+framework-split | Single entry point must route to all content |
| `_glossary.md` | Add macOS terms: ABM, ADE, APNS, Setup Assistant, VPP, FileVault, Gatekeeper, Company Portal (macOS), Intune MDM Agent | Shared glossary serves all platforms |
| `reference/endpoints.md` | Add macOS section with Apple push notification, Intune, and Apple services URLs | Keeps endpoint reference consolidated |
| `quick-ref-l1.md` | Add macOS quick checks section | L1 staff may handle both platforms |
| `quick-ref-l2.md` | Add macOS commands and log paths section | L2 staff handle both platforms |
| `common-issues.md` | Add macOS symptom routing section | Symptom-based entry for macOS issues |

### Windows Operational Gap Components

| Component | Responsibility | Where It Fits |
|-----------|----------------|---------------|
| `lifecycle/06-autopilot-reset.md` | Local reset, remote reset, re-provisioning, retirement | Extends existing lifecycle sequence — next logical stage after post-enrollment |
| `lifecycle/07-device-retirement.md` | Wipe, selective wipe, Autopilot deregistration, tenant migration | Completes the device lifecycle end-to-end |
| `lifecycle/08-infrastructure.md` | Network/firewall deep-dive, Entra ID prerequisites, licensing matrix | Pre-provisioning infrastructure that lifecycle/00-overview.md references but doesn't detail |
| `admin-setup-apv1/11-app-deployment-esp.md` | Win32 packaging for ESP, install order dependencies, timeout tuning | Admin configuration that affects ESP behavior — extends the admin setup sequence |
| `admin-setup-apv1/12-security-compliance.md` | Conditional Access during enrollment, security baselines, compliance timing | Security configuration timed to enrollment phases |
| `admin-setup-apv1/13-migration-scenarios.md` | APv1 to APv2 migration, imaging to Autopilot, GPO to Intune mapping | Transition guides for admins changing deployment models |
| `l2-runbooks/09-monitoring-operations.md` | Deployment success reporting, registration drift detection, new-batch onboarding workflow | Operational readiness for L2/admin teams |

## Architectural Patterns

### Pattern 1: Platform-Gated Entry Points

**What:** The navigation hub (`index.md`) gains a top-level platform selector before the role-based (L1/L2/Admin) routing. Users choose platform first, then role.

**Structure:**

```markdown
## Choose Your Platform

| [Windows Autopilot](#windows-autopilot) | [macOS (ABM/ADE)](#macos-provisioning) |

## Windows Autopilot
### Service Desk (L1) -- APv1
### Service Desk (L1) -- APv2
### Desktop Engineering (L2) -- APv1
### Desktop Engineering (L2) -- APv2
### Admin Setup

## macOS Provisioning (ABM/ADE through Intune)
### Service Desk (L1) -- macOS
### Desktop Engineering (L2) -- macOS
### Admin Setup -- macOS
```

**Why:** Platform selection is binary and fast. Nobody troubleshooting a Mac needs to scroll past Windows content. This extends the existing APv1/APv2 role-routing pattern to a higher level.

### Pattern 2: Shared References, Platform-Specific Sections

**What:** Reference files that serve both platforms (glossary, endpoints) add clearly labeled platform sections rather than creating separate files. Reference files that are entirely platform-specific (macOS log paths, macOS commands) are separate files.

**Decision rule:**
- If the reference concept applies to both platforms (e.g., network endpoints, glossary terms) → **one file, platform-labeled sections**
- If the reference is entirely platform-specific (e.g., PowerShell functions for Windows, Terminal commands for macOS) → **separate files**

**Why:** Readers looking up a network endpoint should not need to know which file to open. Readers looking up a macOS Terminal command should not need to scroll past 12 PowerShell functions.

**Example in `reference/endpoints.md`:**

```markdown
## Windows Autopilot Endpoints
[existing content unchanged]

## macOS Enrollment Endpoints

| URL / Pattern | Service | Purpose | Criticality |
|---------------|---------|---------|-------------|
| `https://identity.apple.com` | Apple Identity | ABM/ADE device assignment | Critical |
| `https://mdmenrollment.apple.com` | Apple MDM | Enrollment protocol | Critical |
| `https://iprofiles.apple.com` | Apple Profiles | ADE profile delivery | Critical |
| `https://albert.apple.com` | Apple Activation | Device activation check | Critical |
| `https://gateway.push.apple.com` | APNS | Push notification delivery | Critical |
| `*.push.apple.com` (TCP 5223) | APNS | Device push channel | Critical |
| `https://login.microsoftonline.com` | Microsoft Entra ID | User authentication | Critical (shared) |
| `https://graph.microsoft.com` | Microsoft Graph | Intune management | Critical (shared) |
| `https://manage.microsoft.com` | Intune | MDM commands | Critical |
```

### Pattern 3: macOS Admin Template Adaptation

**What:** Create `_templates/admin-template-macos.md` by adapting the existing `admin-template.md` with macOS-specific conventions.

**Key differences from Windows admin template:**
- Version gate references "macOS ABM/ADE" instead of "APv1/APv2"
- Portal paths reference both Intune admin center and Apple Business Manager portal
- "What breaks if misconfigured" callouts include Apple-side consequences (e.g., "devices will not appear in ABM if the MDM server assignment is incorrect")
- Prerequisites include Apple Managed Apple ID, APNS certificate, and ABM enrollment
- No registry paths; instead reference macOS configuration profile payloads

**L1 and L2 templates** can be reused directly — the structure (prerequisites, steps, escalation criteria) is platform-agnostic. The only change is the version gate banner text and the specific commands/paths used in steps.

### Pattern 4: Cross-Platform Glossary Sections

**What:** The glossary (`_glossary.md`) adds macOS terms in a new "macOS / Apple" section, with cross-references to equivalent Windows concepts where applicable.

**Example entries:**

```markdown
## macOS / Apple

### ABM

Apple Business Manager — Apple's portal for purchasing, managing, and assigning devices to an MDM server. The macOS equivalent of Windows Autopilot hardware hash registration for device pre-staging.

> **Windows equivalent:** [Hardware hash](#hardware-hash) (device identity) + Intune portal (management assignment).

### ADE

Automated Device Enrollment — Apple's zero-touch provisioning protocol. Devices assigned in ABM receive MDM enrollment profiles over the air at first boot, similar to Windows Autopilot profile assignment.

> **Windows equivalent:** [ZTD](#ztd) / Autopilot deployment profile assignment.

### APNS

Apple Push Notification Service — the push infrastructure Apple devices use to receive MDM commands. The APNS certificate must be renewed annually; expiry causes complete loss of device management.

> **No direct Windows equivalent.** Windows Autopilot uses WNS (Windows Notification Service) for push, but it requires no manual certificate management.
```

### Pattern 5: Numbering Continuation

**What:** New files in existing directories continue the existing numbering sequence. macOS content in shared directories (l1-runbooks, l2-runbooks, decision-trees) uses numbers that follow the last Windows entry.

**Rationale:** The existing convention uses sequential numbers (`00-index.md`, `01-...`, `02-...`). macOS content starting at 10 in l1-runbooks and l2-runbooks leaves room for future Windows additions (which could take 10-19 range in l1 if needed, though this is unlikely to be a real constraint).

**Numbering plan:**
| Directory | Last Windows file | macOS starts at |
|-----------|-------------------|-----------------|
| `decision-trees/` | `04-apv2-triage.md` | `05-macos-triage.md` |
| `l1-runbooks/` | `09-apv2-deployment-timeout.md` | `10-macos-enrollment-failure.md` |
| `l2-runbooks/` | `08-apv2-deployment-report.md` | Windows gaps: `09-monitoring-operations.md`; macOS: `10-macos-log-collection.md` |
| `lifecycle/` | `05-post-enrollment.md` | Windows gaps: `06-`, `07-`, `08-` |

## Data Flow

### Cross-Platform Navigation Flow

```
User arrives with a problem
    │
    ▼
index.md (platform selector)
    │
    ├─ Windows ──→ APv1/APv2 selector ──→ Role-based routing (existing flow)
    │
    └─ macOS ──→ Role-based routing
                    │
                    ├─ L1 → decision-trees/05-macos-triage.md → l1-runbooks/10-12
                    │                                              │
                    │                                              └─ Resolve OR escalate
                    │
                    ├─ L2 → lifecycle-macos/ → l2-runbooks/10-12
                    │           │                    │
                    │           │                    └─ reference/macos-log-paths.md
                    │           │                       reference/macos-commands.md
                    │           │                       reference/endpoints.md#macos
                    │
                    └─ Admin → admin-setup-macos/00-overview.md → 01-07 guides
                                                                    │
                                                                    └─ "What breaks" → l1-runbooks/10-12
```

### Windows Operational Gap Integration Flow

```
lifecycle/00-overview.md
    │
    ├─ (existing stages 1-5) ──→ existing troubleshooting docs
    │
    └─ (new stages 6-8) ──→ lifecycle/06-autopilot-reset.md
                              lifecycle/07-device-retirement.md
                              lifecycle/08-infrastructure.md
                                    │
                                    └─ reference/endpoints.md (expanded)

admin-setup-apv1/00-overview.md
    │
    ├─ (existing guides 01-10) ──→ existing error-codes, l1/l2 runbooks
    │
    └─ (new guides 11-13) ──→ admin-setup-apv1/11-app-deployment-esp.md
                                admin-setup-apv1/12-security-compliance.md
                                admin-setup-apv1/13-migration-scenarios.md
                                    │
                                    └─ lifecycle-apv2/ (for APv1→APv2 migration)
```

### Cross-Platform Reference Flow

```
_glossary.md ──→ All files (both platforms link to shared glossary)
    │
    └─ macOS terms cross-reference Windows equivalents

reference/endpoints.md ──→ Both platform troubleshooting flows
    │
    ├─ Windows section (existing)
    └─ macOS section (new)

platform-comparison.md ──→ index.md (linked for platform selection help)
    │
    └─ "macOS ADE is not Windows Autopilot — different tools, different issues"
```

## Integration Points

### Existing Files to Modify

| File | Modification | Priority |
|------|-------------|----------|
| `docs/index.md` | Add platform selector; add macOS L1/L2/Admin sections | HIGH — gatekeeper for all navigation |
| `docs/_glossary.md` | Add macOS/Apple terminology section (~15 terms) | HIGH — referenced by all new content |
| `docs/reference/endpoints.md` | Add macOS endpoints section | MEDIUM — needed by macOS L2 content |
| `docs/quick-ref-l1.md` | Add "macOS Quick Checks" section | MEDIUM — L1 convenience |
| `docs/quick-ref-l2.md` | Add "macOS Commands & Logs" section | MEDIUM — L2 convenience |
| `docs/common-issues.md` | Add macOS symptom routing section | MEDIUM — entry point for some users |
| `docs/lifecycle/00-overview.md` | Add links to new lifecycle stages (06-08) | LOW — minor update |
| `docs/admin-setup-apv1/00-overview.md` | Add links to new admin guides (11-13) | LOW — minor update |
| `docs/l2-runbooks/00-index.md` | Add monitoring/operations entry and macOS entries | LOW — minor update |
| `docs/l1-runbooks/00-index.md` | Add macOS runbook section | LOW — minor update |

### New Files to Create

**Total new files: ~28**

| Category | Files | Count |
|----------|-------|-------|
| macOS lifecycle | `lifecycle-macos/00-05` | 6 |
| macOS admin setup | `admin-setup-macos/00-07` | 8 |
| macOS troubleshooting (L1) | `l1-runbooks/10-12`, `decision-trees/05` | 4 |
| macOS troubleshooting (L2) | `l2-runbooks/10-12` | 3 |
| macOS reference | `reference/macos-log-paths.md`, `reference/macos-commands.md` | 2 |
| Cross-platform | `platform-comparison.md` | 1 |
| Templates | `_templates/admin-template-macos.md` | 1 |
| Windows operational gaps (lifecycle) | `lifecycle/06-08` | 3 |
| Windows operational gaps (admin) | `admin-setup-apv1/11-13` | 3 |
| Windows operational gaps (L2) | `l2-runbooks/09` | 1 |

### Codebase Integration Points

| Doc Location | Links To | Notes |
|--------------|----------|-------|
| `reference/macos-commands.md` | No codebase link | macOS management uses standard Terminal + Intune agent; no custom module exists |
| `reference/macos-log-paths.md` | No codebase link | Log paths are OS-level, not project code |
| `admin-setup-macos/` | Apple Business Manager portal, Intune admin center | External portal links only |
| `lifecycle/06-autopilot-reset.md` | `src/powershell/AutopilotRemediation.psm1` `Reset-AutopilotRegistration` | Links to existing PowerShell reference |
| `admin-setup-apv1/11-app-deployment-esp.md` | `src/powershell/AutopilotDiagnostics.psm1` `Get-AutopilotLogs` | App install debugging uses existing log collection |

## Anti-Patterns

### Anti-Pattern 1: Platform Mixing Within Files

**What:** Creating lifecycle files that alternate between "on Windows, do X... on macOS, do Y..." throughout the document.

**Why bad:** Windows Autopilot and macOS ADE share almost no procedural steps. Interleaving them creates long, unfocused documents where readers must constantly filter out irrelevant content. The existing APv1/APv2 split already validates separation.

**Instead:** Platform-specific directories. Cross-reference at the conceptual level only (e.g., "the macOS equivalent of hardware hash registration is ABM device assignment — see [ABM Device Assignment](lifecycle-macos/01-abm-device-assignment.md)").

### Anti-Pattern 2: Separate Glossaries Per Platform

**What:** Creating `_glossary-macos.md` alongside `_glossary.md`.

**Why bad:** When a reader encounters "OOBE" in a macOS doc, they should not need to know which glossary to check. A single glossary with platform-labeled sections handles both. The glossary is already organized by topic (Enrollment, Hardware, Network, Security), and a new "macOS / Apple" section fits naturally.

**Instead:** One `_glossary.md`, expanded with platform labels on platform-specific terms.

### Anti-Pattern 3: Duplicating Shared Endpoints

**What:** Creating `reference/macos-endpoints.md` that duplicates the Entra ID and Graph API endpoints already in `reference/endpoints.md`.

**Why bad:** Shared endpoints (login.microsoftonline.com, graph.microsoft.com) are used by both platforms. Two files means two places to update when Microsoft changes something.

**Instead:** One `reference/endpoints.md` with platform-labeled sections. Shared endpoints appear once with a "(shared)" label in both sections' tables.

### Anti-Pattern 4: Windows Gaps as Separate Directories

**What:** Creating `docs/operational/` or `docs/advanced/` directories for the Windows operational gap content.

**Why bad:** The content logically extends existing directories. Autopilot Reset is a lifecycle stage. App deployment for ESP is admin setup configuration. Creating new top-level directories fragments the reader's mental model and breaks the established navigation pattern.

**Instead:** Add numbered files to existing directories (`lifecycle/06-...`, `admin-setup-apv1/11-...`). Update the overview/index files in those directories to include the new entries.

### Anti-Pattern 5: macOS Content Using Windows Terminology

**What:** Referring to macOS Setup Assistant as "OOBE" or calling configuration profiles "policies" without distinction.

**Why bad:** macOS and Windows use different terminology for analogous concepts. Using Windows terminology in macOS content creates confusion, especially for admins managing both platforms. Readers familiar with macOS will not find "OOBE" intuitive.

**Instead:** Use correct Apple terminology (Setup Assistant, configuration profiles, managed preferences) with cross-references to Windows equivalents in the glossary. The `platform-comparison.md` file exists specifically to map concepts across platforms.

## Build Order

Build in this sequence — each phase's output is referenced by the next.

### Phase 1: Shared Foundation Updates

Dependencies: None. Everything else depends on this.

1. `_glossary.md` — add macOS terms (ABM, ADE, APNS, Setup Assistant, VPP, FileVault, Gatekeeper, Company Portal macOS, Intune MDM Agent, Managed Apple ID, configuration profile, enrollment program token, MDM server assignment, Setup Assistant screens, Await Final Configuration)
2. `platform-comparison.md` — "Windows Autopilot vs macOS ADE" router
3. `_templates/admin-template-macos.md` — macOS admin guide template
4. `reference/endpoints.md` — add macOS endpoints section

### Phase 2: Windows Operational Gap Content

Dependencies: Phase 1 (glossary terms). Can run in parallel with Phase 3 since the two platform tracks are independent.

5. `lifecycle/06-autopilot-reset.md` — local reset, remote reset, re-provisioning
6. `lifecycle/07-device-retirement.md` — retirement, wipe, tenant migration
7. `lifecycle/08-infrastructure.md` — network deep-dive, Entra prereqs, licensing matrix
8. `admin-setup-apv1/11-app-deployment-esp.md` — Win32 for ESP
9. `admin-setup-apv1/12-security-compliance.md` — Conditional Access, baselines
10. `admin-setup-apv1/13-migration-scenarios.md` — APv1->APv2, imaging->AP, GPO->Intune
11. `l2-runbooks/09-monitoring-operations.md` — deployment reporting, drift, batch workflow
12. Update `lifecycle/00-overview.md`, `admin-setup-apv1/00-overview.md`, `l2-runbooks/00-index.md` with new entries

### Phase 3: macOS Foundation

Dependencies: Phase 1 (glossary, endpoints, template).

13. `lifecycle-macos/00-overview.md` — macOS provisioning overview + flow diagram
14. `lifecycle-macos/01-abm-device-assignment.md` — ABM setup, device assignment
15. `lifecycle-macos/02-enrollment-profile.md` — ADE enrollment profile
16. `lifecycle-macos/03-setup-assistant.md` — Setup Assistant flow
17. `lifecycle-macos/04-post-enrollment.md` — profile delivery, app install, compliance
18. `lifecycle-macos/05-device-management.md` — ongoing management, updates, retirement
19. `reference/macos-log-paths.md` — canonical macOS log locations
20. `reference/macos-commands.md` — Terminal diagnostic commands

### Phase 4: macOS Admin Setup

Dependencies: Phase 3 (lifecycle provides context for admin guides' "what breaks" links).

21. `admin-setup-macos/00-overview.md` — setup sequence overview
22. `admin-setup-macos/01-apple-mdm-push-cert.md` — APNS certificate
23. `admin-setup-macos/02-abm-integration.md` — ABM token, MDM server
24. `admin-setup-macos/03-enrollment-profile.md` — ADE profile + Setup Assistant
25. `admin-setup-macos/04-configuration-profiles.md` — restrictions, Wi-Fi, VPN
26. `admin-setup-macos/05-app-deployment.md` — DMG, PKG, VPP
27. `admin-setup-macos/06-compliance-security.md` — compliance, FileVault, firewall
28. `admin-setup-macos/07-config-failures.md` — configuration-caused failures

### Phase 5: macOS Troubleshooting

Dependencies: Phase 3 (lifecycle) and Phase 4 (admin setup — "what breaks" callouts feed runbook scenarios).

29. `decision-trees/05-macos-triage.md` — L1 triage flowchart
30. `l1-runbooks/10-macos-enrollment-failure.md`
31. `l1-runbooks/11-macos-app-not-installed.md`
32. `l1-runbooks/12-macos-compliance-issue.md`
33. `l2-runbooks/10-macos-log-collection.md`
34. `l2-runbooks/11-macos-enrollment-deep.md`
35. `l2-runbooks/12-macos-profile-delivery.md`

### Phase 6: Navigation and Cross-Platform Integration

Dependencies: All previous phases (needs all content to exist for linking).

36. `index.md` — restructure with platform selector and full macOS sections
37. `quick-ref-l1.md` — add macOS section
38. `quick-ref-l2.md` — add macOS section
39. `common-issues.md` — add macOS symptom routing
40. `l1-runbooks/00-index.md` — add macOS section
41. `l2-runbooks/00-index.md` — add macOS and monitoring entries

### Parallelism Opportunity

Phases 2 and 3 can execute in parallel since Windows operational gap content and macOS lifecycle content have no cross-dependencies. This is the most significant time-saving opportunity in the build order.

## Scaling Considerations

| Scale | Adjustment |
|-------|------------|
| Two platforms (current) | Platform selector in `index.md`; separate directories per platform; shared references |
| Three platforms (future — e.g., ChromeOS, Linux) | Same pattern extends: `lifecycle-chromeos/`, `admin-setup-chromeos/`, numbered macOS runbooks continue from 13+ in shared dirs |
| Multi-language docs | Directory structure already uses English slugs; translation would add `docs-es/`, `docs-fr/` as peer directories, not nest under `docs/` |

The parallel-directory pattern scales linearly. Each new platform adds a fixed set of directories and extends shared references. The navigation hub (`index.md`) grows by one section. No existing content requires refactoring.

## Sources

- Existing codebase: All files in `docs/` (direct inspection of 70 files, 8,023 lines)
- Existing architecture: `.planning/research/ARCHITECTURE.md` from v1.0/v1.1 milestone (pattern continuity)
- [Set up ADE for macOS - Microsoft Learn](https://learn.microsoft.com/en-us/intune/intune-service/enrollment/device-enrollment-program-enroll-macos) — enrollment program token, profile configuration, Setup Assistant screens
- [macOS device enrollment guide - Microsoft Learn](https://learn.microsoft.com/en-us/intune/device-enrollment/apple/guide-macos) — enrollment method selection
- [Get started with macOS endpoints - Microsoft Learn](https://learn.microsoft.com/en-us/intune/solutions/end-to-end-guides/macos-endpoints-get-started) — end-to-end macOS management overview
- [macOS compliance settings - Microsoft Learn](https://learn.microsoft.com/en-us/intune/intune-service/protect/compliance-policy-create-mac-os) — device health, properties, system security
- [Apple MDM Push certificate - Microsoft Learn](https://learn.microsoft.com/en-us/intune/intune-service/enrollment/apple-mdm-push-certificate-get) — APNS setup and renewal
- [Network endpoints for Intune - Microsoft Learn](https://learn.microsoft.com/en-us/intune/intune-service/fundamentals/intune-endpoints) — all required URLs
- [Add macOS DMG app - Microsoft Learn](https://learn.microsoft.com/en-us/intune/intune-service/apps/lob-apps-macos-dmg) — DMG deployment
- [Add unmanaged macOS PKG - Microsoft Learn](https://learn.microsoft.com/en-us/intune/intune-service/apps/macos-unmanaged-pkg) — PKG deployment
- [Troubleshooting Intune management agent on macOS - Microsoft Community Hub](https://techcommunity.microsoft.com/blog/intunecustomersuccess/support-tip-troubleshooting-microsoft-intune-management-agent-on-macos/4431810) — log locations, diagnostic commands
- Community sources (MEDIUM confidence): [IntuneMacAdmins](https://www.intunemacadmins.com/troubleshooting/enrollment_error/), [IntuneBrew docs](https://docs.intunebrew.com/docs/Troubleshooting-Common-macOS-App-Deployment-Issues-in-Intune), [allthingscloud.blog](https://allthingscloud.blog/macos-app-deployment-with-microsoft-intune/)

---
*Architecture research for: v1.2 Cross-Platform Provisioning — macOS ABM/ADE integration + Windows operational gaps*
*Researched: 2026-04-13*
