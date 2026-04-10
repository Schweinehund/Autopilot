# Architecture Research

**Domain:** Documentation suite — APv2 lifecycle, error codes/decision trees/runbooks, admin setup guides for APv1 and APv2
**Researched:** 2026-04-10
**Confidence:** HIGH (existing structure directly inspected; APv2 documentation from Microsoft Learn official sources updated 2026-04-10)

## Standard Architecture

### As-Built v1.0 Structure (Canonical Reference)

```
docs/
├── _glossary.md                        # Shared terminology (both)
├── _templates/
│   ├── l1-template.md                  # L1 runbook template
│   └── l2-template.md                  # L2 runbook template
├── apv1-vs-apv2.md                     # APv1/APv2 disambiguation
├── architecture.md                     # System architecture reference
├── common-issues.md                    # Symptom-based navigation index
├── index.md                            # Role-based entry point (L1/L2)
├── quick-ref-l1.md                     # L1 one-page cheat sheet
├── quick-ref-l2.md                     # L2 one-page cheat sheet
│
├── decision-trees/                     # Mermaid triage flowcharts
│   ├── 00-initial-triage.md
│   ├── 01-esp-failure.md
│   ├── 02-profile-assignment.md
│   └── 03-tpm-attestation.md
│
├── error-codes/                        # Error code lookup tables
│   ├── 00-index.md                     # Master index + quick lookup table
│   ├── 01-mdm-enrollment.md
│   ├── 02-tpm-attestation.md
│   ├── 03-esp-enrollment.md
│   ├── 04-pre-provisioning.md
│   └── 05-hybrid-join.md
│
├── l1-runbooks/                        # Service Desk scripted procedures
│   ├── 00-index.md
│   ├── 01-device-not-registered.md
│   ├── 02-esp-stuck-or-failed.md
│   ├── 03-profile-not-assigned.md
│   ├── 04-network-connectivity.md
│   └── 05-oobe-failure.md
│
├── l2-runbooks/                        # Desktop Engineering deep dives
│   ├── 00-index.md
│   ├── 01-log-collection.md
│   ├── 02-esp-deep-dive.md
│   ├── 03-tpm-attestation.md
│   ├── 04-hybrid-join.md
│   └── 05-policy-conflicts.md
│
├── lifecycle/                          # APv1 lifecycle stages
│   ├── 00-overview.md
│   ├── 01-hardware-hash.md
│   ├── 02-profile-assignment.md
│   ├── 03-oobe.md
│   ├── 04-esp.md
│   └── 05-post-enrollment.md
│
└── reference/                          # Lookup tables and references
    ├── endpoints.md
    ├── powershell-ref.md
    └── registry-paths.md
```

Key structural facts from direct inspection:
- Flat `decision-trees/` (not `l1-decision-trees/`) at `docs/` level
- Flat `l1-runbooks/` and `l2-runbooks/` at `docs/` level (not under `troubleshooting/`)
- Error codes split across category files under `error-codes/`, not a single file
- 4-field frontmatter on every file: `last_verified`, `review_by`, `applies_to`, `audience`
- Version gate banner on every file as the first body element after frontmatter
- Existing `apv1-vs-apv2.md` already notes APv2 coverage will expand — this is the hook

### APv2-Specific Technical Context

APv2 is fundamentally different from APv1 at the architectural level, which drives specific documentation structure decisions:

| Domain | APv1 | APv2 | Documentation Impact |
|--------|------|------|----------------------|
| Device registration | Hardware hash required | No registration required | APv2 lifecycle has no Stage 1 equivalent |
| Configuration delivery | Autopilot profile → ESP → apps | Device Preparation policy → Enrollment Time Grouping | APv2 lifecycle stages differ entirely |
| Progress UI | ESP (blocks desktop) | % progress OOBE screen (no ESP) | APv2 has no ESP-related troubleshooting |
| Monitoring | None in-product | Near real-time deployment report | APv2 troubleshooting uses Intune reporting as primary diagnostic |
| Logs | MDM diagnostics, Event Viewer | Export logs button (USB) + Intune report | APv2 log collection is different; PowerShell diagnostics not applicable |
| Error codes | Well-documented hex codes | Scenario-based failure modes, few hex codes | APv2 error content is structured differently |
| Admin setup | Profile + group + ESP policy | Policy + device group + user group + apps | APv2 setup is a 7-step workflow, simpler but distinct |
| Diagnostic tools | Get-WindowsAutopilotDiagnostics | Not applicable — tool is APv1-only | APv2 L2 runbooks must not reference APv1 PowerShell tools |

Source: [APv2 troubleshooting FAQ](https://learn.microsoft.com/en-us/autopilot/device-preparation/troubleshooting-faq) — "The Get-WindowsAutopilotDiagnostics.ps1 tool isn't useful for troubleshooting APv2 enrollment failures as it's designed for the original Autopilot." (HIGH confidence — official docs)

### Admin Setup Guide Context

Admin setup guides are a new content type in v1.1. They differ from troubleshooting runbooks in purpose, audience, and structure:

| Attribute | Troubleshooting Runbooks | Admin Setup Guides |
|-----------|--------------------------|-------------------|
| Purpose | Fix a broken deployment | Configure a working deployment |
| Reader state | Something is already wrong | Starting fresh or reviewing config |
| Audience | L1 (scripted) or L2 (investigative) | Admin (configuration authority) |
| Tone | Diagnostic steps | Step-by-step setup procedures |
| Scope | One failure scenario per file | One deployment type or feature per file |

The "admin" role is functionally an L2+ audience: they have Intune admin access, can create policies and groups, and can run PowerShell. They are not the same as the Desktop Engineering L2 who investigates individual device failures.

## Recommended Project Structure

### Integration Strategy: Parallel Directories for APv2

APv2 content should go into new parallel directories alongside existing APv1 directories — **not integrated into existing directories**. The case for parallel directories:

1. Version gate semantics: every existing file opens with `> This guide covers APv1 (classic).` Mixing APv2 content into existing files invalidates those gates and forces dual-mode content, which violates the audience-separation principle that the v1.0 structure was built around.

2. APv2 has no 1:1 mapping to APv1 troubleshooting scenarios. There is no APv2 ESP, no APv2 hardware hash, no APv2 TPM attestation, no APv2 hybrid join. Appending APv2 sections to existing APv1 files would produce asymmetric, hollow structures.

3. Discoverability: an L1 agent who knows a device is running APv2 can immediately navigate to `apv2-l1-runbooks/` without filtering through APv1 content. Clear separation enables fast routing.

4. Admin guides are a new content type entirely — they serve a different reader, have a different structure, and should not be embedded within L1/L2 runbooks.

### Full Target Structure

```
docs/
├── _glossary.md                        # MODIFY: add APv2-specific terms
├── _templates/
│   ├── l1-template.md                  # KEEP: already supports applies_to: APv2
│   ├── l2-template.md                  # KEEP: already supports applies_to: APv2
│   └── admin-template.md               # NEW: admin setup guide template
│
├── apv1-vs-apv2.md                     # MODIFY: add links to APv2 lifecycle + setup guides
├── architecture.md                     # KEEP
├── common-issues.md                    # MODIFY: add APv2 section
├── index.md                            # MODIFY: add Admin and APv2 sections
├── quick-ref-l1.md                     # KEEP (APv1)
├── quick-ref-l2.md                     # KEEP (APv1)
│
├── decision-trees/                     # KEEP (APv1 only)
│   └── [existing 4 files]
│
├── error-codes/                        # EXTEND
│   ├── [existing 6 files]              # MODIFY 00-index.md: add APv2 section
│   └── 06-apv2-device-preparation.md  # NEW: APv2-specific error scenarios
│
├── l1-runbooks/                        # KEEP (APv1 only)
│   └── [existing 6 files]
│
├── l2-runbooks/                        # KEEP (APv1 only)
│   └── [existing 6 files]
│
├── lifecycle/                          # KEEP (APv1 only)
│   └── [existing 6 files]
│
├── reference/                          # KEEP (APv1 primary)
│   ├── endpoints.md                    # MODIFY: add APv2-specific endpoints
│   ├── powershell-ref.md               # KEEP (APv1/L2 only; explicitly excluded from APv2)
│   └── registry-paths.md              # MODIFY: add APv2 registry note
│
│   ── APv2 CONTENT (NEW DIRECTORIES) ──────────────────────────────────────
│
├── apv2-lifecycle/                     # NEW: APv2 deployment stages
│   ├── 00-overview.md                  # APv2 overview + OOBE flow diagram
│   ├── 01-prerequisites.md             # Admin + device + OS requirements
│   ├── 02-enrollment-time-grouping.md  # The core APv2 mechanism
│   ├── 03-oobe-experience.md           # What the user sees during APv2 OOBE
│   └── 04-post-enrollment.md           # Desktop delivery, remaining apps/scripts
│
├── apv2-decision-trees/                # NEW: APv2 L1 triage trees
│   ├── 00-initial-triage.md            # APv2 initial triage (very different from APv1)
│   └── 01-app-script-failure.md        # App/script not installing
│
├── apv2-l1-runbooks/                   # NEW: APv2 Service Desk runbooks
│   ├── 00-index.md
│   ├── 01-deployment-never-starts.md   # APv2 experience never launches at OOBE
│   ├── 02-app-not-installed.md         # App shows Skipped or Failed in report
│   └── 03-policy-wrong-or-missing.md   # User gets wrong policy or no policy
│
├── apv2-l2-runbooks/                   # NEW: APv2 Desktop Engineering guides
│   ├── 00-index.md
│   ├── 01-log-collection.md            # APv2-specific log export (USB, Intune report)
│   └── 02-deployment-report-analysis.md # Reading the near-real-time deployment report
│
│   ── ADMIN SETUP GUIDES (NEW DIRECTORY) ────────────────────────────────────
│
└── admin-guides/                       # NEW: admin configuration guides
    ├── 00-index.md                     # Navigation hub for admin content
    │
    ├── apv1/                           # APv1 admin setup
    │   ├── 01-profile-configuration.md     # Deployment profile settings
    │   ├── 02-esp-policies.md              # ESP configuration + timeouts
    │   ├── 03-dynamic-groups.md            # Group targeting for profiles
    │   ├── 04-oobe-customization.md        # Branding, skipped screens, naming
    │   ├── 05-deployment-modes.md          # User-driven, pre-provisioning, self-deploying
    │   └── 06-setup-troubleshooting.md     # Config mistakes that cause downstream failures
    │
    └── apv2/                           # APv2 admin setup
        ├── 01-prerequisites.md             # Licensing, OS version, RBAC permissions
        ├── 02-device-group-setup.md        # Assigned group + Intune Provisioning Client
        ├── 03-user-group-setup.md          # User group for policy assignment
        ├── 04-app-script-assignment.md     # Apps/scripts selection + System context
        ├── 05-policy-creation.md           # Full Device Preparation policy walkthrough
        └── 06-setup-troubleshooting.md     # Config mistakes: wrong group type, RBAC, etc.
```

### Structure Rationale

**Parallel APv2 directories over integration:**
APv2 lifecycle stages, failure modes, and troubleshooting approaches have no 1:1 mapping to APv1. Integrating APv2 into existing files would produce hollow, asymmetric content and invalidate version gate semantics. Parallel directories (`apv2-lifecycle/`, `apv2-decision-trees/`, `apv2-l1-runbooks/`, `apv2-l2-runbooks/`) follow the existing naming convention and make APv2 discoverable without navigating APv1 content.

**Admin guides as a dedicated top-level directory:**
`admin-guides/` is a new content type distinct from both L1 and L2. Admin content describes how to configure a working deployment — it presupposes Intune admin access and serves a different reader than either L1 (scripted) or L2 (investigative). Embedding admin setup in L2 runbooks would conflate configuration authority with investigation authority. Separate directory with `apv1/` and `apv2/` subdirectories maintains the APv1/APv2 separation.

**Error codes: extend existing directory, add one file:**
APv2 error behavior is scenario-based (no hex codes for most failures; structured as "X doesn't happen" troubleshooting rather than "error code Y means Z"). A single new file `06-apv2-device-preparation.md` in the existing `error-codes/` directory is appropriate. The master index (`error-codes/00-index.md`) gets an APv2 section. This avoids creating a parallel `apv2-error-codes/` directory that would have only one file.

**Modify existing files selectively:**
Four existing files need updates, not new parallels: `index.md` (add Admin and APv2 navigation sections), `apv1-vs-apv2.md` (add links to new APv2 content), `common-issues.md` (add APv2 symptom routing), `_glossary.md` (add APv2-specific terms). Everything else stays unchanged.

**No APv2 quick-ref or APv2 reference duplicates yet:**
APv2 L2 tooling is fundamentally different (Intune deployment report is the primary diagnostic, no PowerShell module, USB log export only). A quick-ref card for APv2 may be warranted once the runbooks establish what the most common admin actions are. Defer to a later phase after runbook content is authored.

## Architectural Patterns

### Pattern 1: APv1/APv2 Version Gate — Always First Body Element

**What:** Every file opens with a version gate banner immediately after frontmatter. The banner specifies which framework the file covers and cross-links to the disambiguation page and/or the parallel framework's equivalent content.

**When to use:** Every single file in the docs/ tree. No exceptions. This is the established pattern in all 40+ v1.0 files.

**APv1 files (existing pattern):**
```markdown
---
last_verified: YYYY-MM-DD
review_by: YYYY-MM-DD
applies_to: APv1
audience: L1
---

> **Version gate:** This guide applies to Windows Autopilot (classic).
> For Autopilot Device Preparation, see [APv1 vs APv2 disambiguation](../apv1-vs-apv2.md).
```

**APv2 files (new pattern):**
```markdown
---
last_verified: YYYY-MM-DD
review_by: YYYY-MM-DD
applies_to: APv2
audience: L1
---

> **Version gate:** This guide applies to Windows Autopilot Device Preparation (APv2).
> For Windows Autopilot classic, see [APv1 vs APv2 disambiguation](../apv1-vs-apv2.md).
```

**Admin files (new pattern):**
```markdown
---
last_verified: YYYY-MM-DD
review_by: YYYY-MM-DD
applies_to: APv1
audience: admin
---

> **Version gate:** This guide applies to Windows Autopilot (classic) admin configuration.
> For APv2 (Device Preparation) admin setup, see [APv2 Admin Guides](../apv2/00-index.md).
```

### Pattern 2: Tiered Entry Points — Index Sections for Admin

**What:** The existing `index.md` has Service Desk (L1) and Desktop Engineering (L2) sections. A new Admin section must be added, and an APv2 troubleshooting section must be added alongside the existing APv1 content.

**Target index.md structure:**

```markdown
## Service Desk (L1) — Windows Autopilot (APv1)
[existing table]

## Service Desk (L1) — APv2 Device Preparation
| Resource | When to Use |
[new APv2 L1 content]

## Desktop Engineering (L2) — Windows Autopilot (APv1)
[existing table]

## Desktop Engineering (L2) — APv2 Device Preparation
| Resource | When to Use |
[new APv2 L2 content]

## Administrator — Setup and Configuration
| Resource | When to Use |
[new admin content for both APv1 and APv2]

## Shared References
[existing table, updated]
```

### Pattern 3: Scenario-Anchored Cross-References — Extend to APv2 and Admin

**What:** The established pattern of linking to specific sections (`file.md#section`) continues unchanged for all new content. APv2 L1 runbooks link to APv2 decision trees, not APv1 trees. APv2 escalation paths lead to APv2 L2 runbooks, not APv1 L2 runbooks. Admin setup guides link to their own setup troubleshooting, not to L1/L2 runbooks.

**APv2 escalation cross-reference:**
```markdown
**L2 escalation path:** See [APv2 Deployment Report Analysis](../../apv2-l2-runbooks/02-deployment-report-analysis.md#app-skipped-status) for log export and report interpretation.
```

**Admin-to-troubleshooting cross-reference:**
```markdown
> **Setup pitfall:** If applications are not installing during OOBE, verify system context configuration.
> See [App and Script Assignment](04-app-script-assignment.md#system-context-requirement).
```

**Admin-to-downstream failure cross-reference:**
```markdown
> **Common admin mistake that causes L1 tickets:** Omitting `Intune Provisioning Client` as device group owner causes "deployment never starts" failures.
> See [APv2 L1 Runbook: Deployment Never Starts](../../apv2-l1-runbooks/01-deployment-never-starts.md).
```

### Pattern 4: APv2 Numbering Convention — Mirror Existing

**What:** Existing directories use 2-digit zero-padded numeric prefixes (`00-index.md`, `01-device-not-registered.md`). All new directories follow the same convention. Index file is always `00-index.md`. Content files start at `01-`.

### Pattern 5: Admin Template — New Addition to _templates/

**What:** Admin guides follow a distinct structure from L1 and L2 runbooks. A new `admin-template.md` in `_templates/` establishes the standard. Admin guides have Prerequisites, Steps (numbered, portal-navigation oriented), Configuration Settings (explaining each option), Troubleshooting (config mistakes that cause deployment failures), and Related Resources.

## Data Flow

### Navigation Flow — With New Content

```
User arrives with a problem or task
    ↓
index.md (role-based entry)
    ↓
[If admin configuring] → admin-guides/00-index.md
    → admin-guides/apv1/ OR admin-guides/apv2/
    → Links to: setup troubleshooting within admin guides
    → Links out to: L1 runbooks (when mistake causes user-reported failure)

[If L1, APv1 device] → decision-trees/00-initial-triage.md
    → l1-runbooks/ → error-codes/ → escalate to l2-runbooks/

[If L1, APv2 device] → apv2-decision-trees/00-initial-triage.md
    → apv2-l1-runbooks/ → escalate to apv2-l2-runbooks/

[If L2, APv1 device] → lifecycle/ (understand expected)
    → l2-runbooks/ → reference/ (registry, PowerShell, endpoints)

[If L2, APv2 device] → apv2-lifecycle/ (understand expected)
    → apv2-l2-runbooks/01-log-collection.md (USB export + Intune report)
    → apv2-l2-runbooks/02-deployment-report-analysis.md
```

### Cross-Reference Flow — APv2

```
apv2-lifecycle/00-overview.md
    → apv2-lifecycle/01-prerequisites.md (for setup context)
    → admin-guides/apv2/02-device-group-setup.md (admin who needs to configure)
    → apv2-l1-runbooks/00-index.md (troubleshooter for failures)

apv2-l1-runbooks/01-deployment-never-starts.md
    → apv2-decision-trees/00-initial-triage.md (triage flowchart)
    → apv2-l2-runbooks/00-index.md (escalation path)
    → admin-guides/apv2/06-setup-troubleshooting.md (config-caused failures)

apv2-l2-runbooks/02-deployment-report-analysis.md
    → apv2-lifecycle/02-enrollment-time-grouping.md (expected behavior)
    → error-codes/06-apv2-device-preparation.md (scenario mapping)
```

### Cross-Reference Flow — Admin Guides

```
admin-guides/apv1/02-esp-policies.md
    → l1-runbooks/02-esp-stuck-or-failed.md (what users see when ESP is misconfigured)
    → l2-runbooks/02-esp-deep-dive.md (deep investigation when config causes failures)
    → reference/registry-paths.md (registry verification for L2)

admin-guides/apv2/05-policy-creation.md
    → apv2-lifecycle/02-enrollment-time-grouping.md (how the policy is consumed)
    → apv2-l1-runbooks/01-deployment-never-starts.md (what fails when policy is wrong)
    → admin-guides/apv2/06-setup-troubleshooting.md (common configuration mistakes)
```

### Key Data Flows for New Content

1. **Admin setup → failure link:** Every admin guide section documents which specific L1 symptom is caused when that configuration step is wrong. This is the "setup troubleshooting" cross-reference pattern that bridges admin guides to troubleshooting content.

2. **APv2 L1 escalation:** APv2 L1 runbooks escalate to APv2 L2 runbooks only, not to APv1 L2 runbooks. The two escalation paths must never cross.

3. **APv2 error codes:** APv2 does not use hex error codes the way APv1 does. The APv2 error file (`error-codes/06-apv2-device-preparation.md`) is scenario-based, not code-based. It documents failure modes ("deployment never starts", "app shows Skipped", "stuck at 100%") with causes and actions.

4. **Admin-to-L1 forward link:** Admin guides may link to L1 runbooks to show admins what the downstream user experience looks like when a configuration mistake is made. This is a forward reference from admin content to troubleshooting content — acceptable because it is informational, not procedural.

## Integration Points

### Existing Files — Modifications Required

| Existing File | Change Type | What Changes |
|---------------|-------------|--------------|
| `docs/index.md` | Modify | Add Admin section; add APv2 L1/L2 sections |
| `docs/apv1-vs-apv2.md` | Modify | Add links to `apv2-lifecycle/`, `apv2-l1-runbooks/`, `admin-guides/` |
| `docs/common-issues.md` | Modify | Add APv2 symptom section with links to `apv2-l1-runbooks/` |
| `docs/_glossary.md` | Modify | Add APv2 terms: Enrollment Time Grouping, Device Preparation policy, Intune Provisioning Client, OOBE progress screen |
| `docs/error-codes/00-index.md` | Modify | Add APv2 section with link to `06-apv2-device-preparation.md` |
| `docs/reference/endpoints.md` | Modify | Verify APv2 uses same endpoints as APv1 (enrollment.manage.microsoft.com, graph.microsoft.com); add APv2 note if different |

### New Files — All New

All files in `apv2-lifecycle/`, `apv2-decision-trees/`, `apv2-l1-runbooks/`, `apv2-l2-runbooks/`, and `admin-guides/` are new. No existing files are moved.

### Template Addition

`docs/_templates/admin-template.md` is new. It follows the same frontmatter standard as `l1-template.md` and `l2-template.md` with `audience: admin`. It documents the admin guide section structure as comments.

### APv2 PowerShell Boundary

The existing PowerShell module (`AutopilotDiagnostics.psm1`) and its reference (`docs/reference/powershell-ref.md`) are APv1-only. APv2 L2 runbooks must not link to or reference PowerShell diagnostic functions because:
- `Get-WindowsAutopilotDiagnostics` is explicitly documented by Microsoft as inapplicable to APv2.
- APv2 log collection uses the in-OOBE USB export or the Intune near-real-time deployment report.

APv2 L2 runbooks link to the Intune portal (deployment report) and the APv2-specific log collection guide, not to `reference/powershell-ref.md`.

### Admin Guide Audience Boundary

Admin guides target admins who configure deployments. They are distinct from L2 engineers who investigate individual device failures. Cross-referencing rules:

- Admin guides MAY link to L1/L2 runbooks (forward reference to show downstream impact).
- L1/L2 runbooks SHOULD NOT link to admin guides (a Service Desk agent resolving an ESP failure does not need the ESP configuration guide).
- Exception: L2 runbooks that investigate policy conflicts may reference admin guides as a "check your configuration" note.

## Build Order for New Content

Build in this sequence — each layer's output is referenced by the next:

**Layer 1 — APv2 Lifecycle (foundation for all APv2 content):**
1. `docs/apv2-lifecycle/00-overview.md` — APv2 stages + Mermaid flow diagram
2. `docs/apv2-lifecycle/01-prerequisites.md` — OS version, licensing, RBAC
3. `docs/apv2-lifecycle/02-enrollment-time-grouping.md` — core mechanism
4. `docs/apv2-lifecycle/03-oobe-experience.md` — user-visible OOBE flow
5. `docs/apv2-lifecycle/04-post-enrollment.md` — desktop delivery + remaining config

**Layer 2 — APv2 Error Codes (decision trees and runbooks link to this):**
6. `docs/error-codes/06-apv2-device-preparation.md` — scenario-based error file
7. Update `docs/error-codes/00-index.md` — add APv2 section

**Layer 3 — APv2 Decision Trees and L1 Runbooks (depend on lifecycle + error codes):**
8. `docs/apv2-decision-trees/00-initial-triage.md`
9. `docs/apv2-decision-trees/01-app-script-failure.md`
10. `docs/apv2-l1-runbooks/00-index.md`
11. `docs/apv2-l1-runbooks/01-deployment-never-starts.md`
12. `docs/apv2-l1-runbooks/02-app-not-installed.md`
13. `docs/apv2-l1-runbooks/03-policy-wrong-or-missing.md`

**Layer 4 — APv2 L2 Runbooks (depend on lifecycle and error codes):**
14. `docs/apv2-l2-runbooks/00-index.md`
15. `docs/apv2-l2-runbooks/01-log-collection.md`
16. `docs/apv2-l2-runbooks/02-deployment-report-analysis.md`

**Layer 5 — Admin Setup Guides (depend on lifecycle for both APv1 and APv2):**
17. `docs/_templates/admin-template.md` — establish template before any guide
18. `docs/admin-guides/00-index.md`
19. `docs/admin-guides/apv1/01-profile-configuration.md`
20. `docs/admin-guides/apv1/02-esp-policies.md`
21. `docs/admin-guides/apv1/03-dynamic-groups.md`
22. `docs/admin-guides/apv1/04-oobe-customization.md`
23. `docs/admin-guides/apv1/05-deployment-modes.md`
24. `docs/admin-guides/apv1/06-setup-troubleshooting.md`
25. `docs/admin-guides/apv2/01-prerequisites.md`
26. `docs/admin-guides/apv2/02-device-group-setup.md`
27. `docs/admin-guides/apv2/03-user-group-setup.md`
28. `docs/admin-guides/apv2/04-app-script-assignment.md`
29. `docs/admin-guides/apv2/05-policy-creation.md`
30. `docs/admin-guides/apv2/06-setup-troubleshooting.md`

**Layer 6 — Navigation and Hub Updates (written last, link to everything):**
31. Update `docs/index.md` — add Admin + APv2 sections
32. Update `docs/apv1-vs-apv2.md` — add APv2 lifecycle and setup links
33. Update `docs/common-issues.md` — add APv2 symptom section
34. Update `docs/_glossary.md` — add APv2 terms

**Rationale for this ordering:**
- APv2 lifecycle must exist before APv2 decision trees (trees reference lifecycle stages).
- APv2 error codes must exist before APv2 runbooks (runbooks link to specific error scenarios).
- APv2 decision trees must exist before APv2 L1 runbooks (runbooks embed or link to trees).
- Admin setup guides depend on lifecycle docs for both frameworks (guides reference what the lifecycle stages do and what happens when config is wrong).
- Admin template must be created before admin guides (template-then-content follows established pattern from `_templates/`).
- Hub files (`index.md`, `apv1-vs-apv2.md`, `common-issues.md`) are always written last.
- APv1 admin guides can be authored in parallel with APv2 admin guides after the template is established.

## Anti-Patterns

### Anti-Pattern 1: Appending APv2 to APv1 Files

**What people do:** Add "APv2 equivalent" sections at the bottom of existing APv1 lifecycle files, runbooks, and decision trees.

**Why it's wrong:** Every APv1 file opens with a version gate banner stating `applies_to: APv1`. Appending APv2 content forces either removing the version gate (invalidating the metadata pattern across all 40+ files) or leaving a contradictory gate. L1 agents who are given a decision tree named `01-esp-failure.md` will use it for an APv2 device even if it says APv1 in the banner.

**Do this instead:** Parallel files in parallel directories. Version gates remain accurate. Navigation is explicit.

### Anti-Pattern 2: Putting Admin Setup in L2 Runbooks

**What people do:** Add "How to configure this" sections to L2 investigation runbooks on the theory that the L2 engineer understands the configuration.

**Why it's wrong:** L2 runbooks are used when something is already broken. An L2 engineer investigating an ESP failure does not want to read through ESP configuration steps — they want registry paths and log locations. Admin setup in L2 runbooks creates noise for the reader who is already under pressure troubleshooting.

**Do this instead:** `admin-guides/` is a separate directory. L2 runbooks may have a brief callout box ("If this is a configuration issue, see [ESP Policies](../admin-guides/apv1/02-esp-policies.md)") but the configuration content lives in admin guides.

### Anti-Pattern 3: Using APv1 PowerShell Functions in APv2 Runbooks

**What people do:** Reference `Get-AutopilotLogs`, `Test-AutopilotConnectivity`, or `Get-AutopilotDeviceStatus` in APv2 L2 runbooks because they exist in the project.

**Why it's wrong:** These functions target APv1 registry paths and WMI classes. On an APv2 device, the registry paths don't exist in the same locations, and `Get-WindowsAutopilotDiagnostics` is explicitly documented by Microsoft as inapplicable to APv2. Running APv1 diagnostic tools on APv2 deployments produces misleading or empty output.

**Do this instead:** APv2 L2 runbooks describe the Intune deployment report (portal-based), USB log export (in-OOBE), and the `DevicePreparation` registry key as the diagnostic surface. Do not link to `reference/powershell-ref.md` from APv2 content.

### Anti-Pattern 4: APv2 Error Codes as Hex Code Table

**What people do:** Create an APv2 error code file that mirrors the APv1 error code structure with a Quick Lookup table of hex codes.

**Why it's wrong:** APv2 does not expose hex error codes to the same degree as APv1. The failure modes for APv2 are scenario-based: "deployment never starts", "apps show Skipped", "stuck at 100%", "wrong policy applied". A hex code table for APv2 would be mostly empty or filled with generic MDM enrollment codes that appear in both frameworks.

**Do this instead:** APv2 error file is structured as a scenario catalog — one section per failure mode, with symptom, probable cause, L1 action, L2 action. No hex code Quick Lookup table. The `error-codes/00-index.md` notes this distinction explicitly.

### Anti-Pattern 5: Single Admin Guide for Both Frameworks

**What people do:** Create one `admin-guide-apv1-apv2.md` that covers both frameworks in side-by-side sections.

**Why it's wrong:** APv1 and APv2 admin setup have no shared steps (different portal navigation, different policy types, different group structures). A combined guide doubles the length and forces admins who are only deploying one framework to read through the other. It also breaks the version gate metadata pattern.

**Do this instead:** `admin-guides/apv1/` and `admin-guides/apv2/` are separate subdirectories. The `admin-guides/00-index.md` routes admins to the correct subdirectory.

## Confidence Notes

| Area | Confidence | Source |
|------|------------|--------|
| Existing v1.0 structure | HIGH | Direct inspection of 40+ files in docs/ |
| APv2 lifecycle stages | HIGH | Microsoft Learn official docs, updated 2026-04-10 |
| APv2 admin setup workflow | HIGH | Microsoft Learn tutorial series (7 steps), verified |
| APv2 error/failure modes | HIGH | Microsoft Learn troubleshooting FAQ + known issues page, updated 2026-04-10 |
| APv2 PowerShell non-applicability | HIGH | Microsoft Learn troubleshooting FAQ — explicit statement |
| Admin guide as separate content type | HIGH | Derived from content type analysis; consistent with established IT doc patterns |

## Sources

- Existing codebase: `docs/` directory — all 40+ files directly inspected (2026-04-10)
- [Windows Autopilot Device Preparation Overview — Microsoft Learn](https://learn.microsoft.com/en-us/autopilot/device-preparation/overview) — Updated 2026-04-07
- [APv2 User-Driven Entra Join Workflow — Microsoft Learn](https://learn.microsoft.com/en-us/autopilot/device-preparation/tutorial/user-driven/entra-join-workflow) — Updated 2026-02-05
- [APv2 Create Policy — Microsoft Learn](https://learn.microsoft.com/en-us/autopilot/device-preparation/tutorial/user-driven/entra-join-autopilot-policy) — Updated 2026-04-10
- [APv2 Troubleshooting FAQ — Microsoft Learn](https://learn.microsoft.com/en-us/autopilot/device-preparation/troubleshooting-faq) — Updated 2026-04-07
- [APv2 Known Issues — Microsoft Learn](https://learn.microsoft.com/en-us/autopilot/device-preparation/known-issues) — Updated 2026-04-10
- Project context: `.planning/PROJECT.md` — v1.1 milestone requirements confirmed

---
*Architecture research for: APv2 documentation and admin setup guides — integration with existing docs/ structure*
*Researched: 2026-04-10*
