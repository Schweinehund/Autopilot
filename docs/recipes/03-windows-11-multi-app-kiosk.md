---
doc_id: RE-224
status: Draft
owner: Intune Admin Lead
doc_type: Guide
platform: Windows
last_verified: 2026-07-30
review_by: 2026-10-28
applies_to: Windows 11 multi-app kiosk (restricted user experience via the AssignedAccess CSP Configuration node, delivered by an Intune custom OMA-URI profile)
audience: admin
---

**Platform:** Windows · **Doc Type:** Guide · **Doc ID:** RE-224 · **Status:** Draft

# Windows 11 Multi-App Kiosk: Assigned Access Provisioning

## Summary

Following this recipe yields a Windows 11 device locked to a restricted user experience — a bounded, multi-app allow-list and Start layout — delivered through the AssignedAccess CSP `Configuration` node via an Intune custom OMA-URI profile, with no Templates GUI path available. It covers Windows 11 22H2 or later on Pro, Enterprise, Education, or IoT Enterprise editions and requires the Intune Administrator role to author the configuration profile and assign it to a device group.
