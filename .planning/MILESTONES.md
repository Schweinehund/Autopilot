# Milestones: Windows Autopilot Troubleshooter

## v1.0 Autopilot Documentation & Troubleshooting Guides (Shipped: 2026-04-10)

**Phases completed:** 10 phases, 24 plans, 28 tasks

**Key accomplishments:**

- 1. Pre-provisioning as primary term (White glove deprecated)
- docs/reference/registry-paths.md
- Two audience-separated Markdown templates enforcing 4-field frontmatter, version gate banners, and explicit content boundaries (L1: no PowerShell/registry; L2: link-to-references pattern)
- `docs/lifecycle/01-hardware-hash.md`
- One-liner:
- End-to-end Autopilot lifecycle overview with two-level Mermaid diagrams (happy path with 3 deployment modes + color-coded failure points), 5-stage actor table, prerequisites checklist, and links to all stage guides and Phase 1 reference assets
- One-liner:
- Master error code index (00-index.md) with 29 entries (23 hex codes + 6 event IDs) linking all 5 category files as a single Ctrl+F lookup entry point
- 02-profile-assignment.md
- Three L1 scripted runbooks using browser-only Intune portal click-paths, user communication scripts, and escalation collect lists matching Phase 4 decision tree data
- ESP runbook with three anchored sub-sections (device/user/error-code), 30/60 min thresholds, and OOBE runbook with misroute detection cross-linking to all other L1 runbooks
- 1. [Rule 3 - Blocking] Prerequisite runbook files 04 and 05 did not exist
- Standalone log collection prerequisite guide (mdmdiagnosticstool cab, 4 wevtutil exports, Get-AutopilotLogs, reg export snapshot, naming convention) and L2 runbook index with escalation routing table
- Hardware-specific TPM attestation investigation covering 5 chipsets (AMD fTPM, ST Micro RSA cert, Nuvoton RSA-3072, Infineon EK cert, Intel Tiger Lake) and hybrid join investigation with ODJ Connector version gate and three distinct 0x80070774 resolution paths
- Decision trees (bare `../l2-runbooks/` bare links resolved):
- Created L1 monitor-taped cheat sheet and L2 terminal-tab copy-pasteable reference covering the full Autopilot troubleshooting toolkit.
- 3 inline HTML anchors added to existing rows:
- Before:

---

## v1.0 — Autopilot Documentation & Troubleshooting Guides (In Progress)

**Started:** 2026-03-10
**Goal:** End-to-end Autopilot lifecycle documentation with integrated troubleshooting, tiered for L1 and L2 teams.
