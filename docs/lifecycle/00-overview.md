---
doc_id: RE-192
status: Approved
owner: Intune Admin Lead
doc_type: Guide
platform: Windows
last_verified: 2026-04-13
review_by: 2026-07-12
applies_to: both
audience: both
---

**Platform:** Windows · **Doc Type:** Guide · **Doc ID:** RE-192 · **Status:** Approved

# Autopilot Lifecycle Overview

## Summary

This overview orients Intune administrators and L1/L2 support to the five sequential stages of the Windows Autopilot (classic) deployment lifecycle — hardware hash import, profile assignment, OOBE and deployment-mode selection, the Enrollment Status Page, and post-enrollment verification — showing how the three OOBE paths (user-driven, pre-provisioning, self-deploying) diverge and reconverge before ESP, and where common failures surface across the pipeline.

> **Version gate:** This guide primarily covers Windows Autopilot (classic). APv2 (Device Preparation) differences are noted inline.

> For a full comparison, see [APv1 vs APv2 disambiguation](../apv1-vs-apv2.md).

## How to Use This Guide

This overview provides the end-to-end picture of the Windows Autopilot deployment lifecycle across five sequential stages. Each stage has a dedicated guide linked from the diagrams and table below — when troubleshooting a reported failure, identify which stage the failure occurred in and navigate directly to that guide. L2 technical details (registry keys, API calls, log paths) appear as callout blocks within each stage guide, keeping the main narrative accessible to L1 readers. Start here to orient yourself, then go to the relevant stage guide for actionable steps.

## The Deployment Pipeline

### Level 1 — Happy Path (LOCKED — 12 (9 nodes + 3 labeled edges))

The pipeline runs through five stages. After Stage 2 (Profile Assignment), the deployment mode (the single decision point) determines which of three paths OOBE takes; the pre-provisioning and self-deploying paths both reconverge before Stage 4 (ESP).

**Trunk edges (outside the decision):** Stage 1: Hardware Hash Import → Stage 2: Profile Assignment → Deployment Mode (decision); Stage 4: ESP → Stage 5: Post-Enrollment.

| Path | Deployment Mode (root decision) | Stage 3 outcome | Reconvergence | Destination |
|------|----------------------------------|-------------------|-----------------|-------------|
| User-Driven | User-Driven | Stage 3: OOBE — User signs in | — | Stage 4: ESP |
| Pre-Provisioning | Pre-Provisioning | Stage 3: OOBE — Technician phase → Reseal + Ship to user | Rejoins Stage 3: OOBE — User signs in (Reseal + Ship to user → Stage 3: OOBE — User signs in) | Stage 4: ESP (via the rejoined User-Driven path) |
| Self-Deploying | Self-Deploying | Stage 3: OOBE — No user interaction | Converges directly into Stage 4 (Stage 3: OOBE — No user interaction → Stage 4: ESP) | Stage 4: ESP |

Stage guide links: [Stage 1](01-hardware-hash.md) · [Stage 2](02-profile-assignment.md) · [Stage 3](03-oobe.md) · [Stage 4](04-esp.md) · [Stage 5](05-post-enrollment.md)

> This table shows the [APv1](../_glossary.md#apv1) (classic) flow. For the [APv2](../_glossary.md#apv2) (Device Preparation) flow, see [APv1 vs APv2](../apv1-vs-apv2.md).

### Level 2 — Failure Points (LOCKED — 10 (10 nodes + 0 labeled edges))

The following table shows where common failures surface across the pipeline. The five stages progress linearly (S1: Hash Import → S2: Profile Assignment → S3: OOBE → S4: ESP → S5: Post-Enrollment); each stage has one associated failure category.

| Stage | Failure Mode |
|-------|--------------|
| S1: Hash Import | Hash not found / stale record |
| S2: Profile Assignment | Profile not assigned / sync delay |
| S3: OOBE | Network unreachable |
| S4: ESP | ESP timeout / app failure |
| S5: Post-Enrollment | Compliance not met |

## Stage Summary

| Stage | Primary Actor | What Happens | Guide |
|-------|--------------|--------------|-------|
| 1: Hardware Hash Import | Admin / OEM / Partner | Device fingerprint uploaded to Intune | [Stage 1](01-hardware-hash.md) |
| 2: Profile Assignment | Admin | Autopilot profile matched to device via AAD group | [Stage 2](02-profile-assignment.md) |
| 3: OOBE | User / Technician / None | Deployment mode activates; device joins Azure AD | [Stage 3](03-oobe.md) |
| 4: ESP | Background (MDM) | Device and user apps/policies installed | [Stage 4](04-esp.md) |
| 5: Post-Enrollment | Admin verifies | Deployment confirmed; device handed off | [Stage 5](05-post-enrollment.md) |

## Prerequisites

All prerequisites must be met before Stage 1. Missing any prerequisite causes failures that surface at Stage 2 or 3.

- [ ] Azure AD tenant configured with Intune
- [ ] Appropriate licenses assigned (Microsoft 365 Business Premium, E3, E5, or standalone Intune)
- [ ] Autopilot deployment profile created and assigned to a group
- [ ] Network connectivity to required [Autopilot endpoints](../reference/endpoints.md)
- [ ] Device [hardware hash](../_glossary.md#hardware-hash) registered in Autopilot service

## Related Documentation

- [Glossary](../_glossary.md) — Autopilot terminology reference
- [APv2 Lifecycle Overview](../lifecycle-apv2/00-overview.md) — APv2 deployment flow, prerequisites, and automatic mode
- [APv1 vs APv2 Disambiguation](../apv1-vs-apv2.md) — Framework comparison
- [Registry Paths Reference](../reference/registry-paths.md) — All Autopilot registry locations
- [Network Endpoints Reference](../reference/endpoints.md) — Required URLs and test commands
- [PowerShell Function Reference](../reference/powershell-ref.md) — Diagnostic and remediation functions
- [Architecture Overview](../architecture.md) — System design context

## Version History

| Date | Change |
|------|--------|
| 2026-07-08 | v1.16 EEE reformat — content not re-reviewed |
| 2026-04-13 | Added APv2 lifecycle overview cross-reference | -- |
| 2026-03-14 | Initial version |
