---
doc_id: RE-225
status: Draft
owner: Intune Admin Lead
doc_type: Guide
platform: Android
last_verified: 2026-08-03
review_by: 2026-11-01
applies_to: Android Enterprise Dedicated multi-app kiosk (Managed Home Screen curated app allow-list, delivered by an Intune App Configuration policy assigned to com.microsoft.launcher.enterprise)
audience: admin
---

**Platform:** Android · **Doc Type:** Guide · **Doc ID:** RE-225 · **Status:** Draft

# Android Dedicated Multi-App Kiosk: Managed Home Screen Provisioning

## Summary

Following this recipe yields an Android Enterprise Dedicated device locked to a curated Managed Home Screen (MHS) multi-app kiosk — a bounded allow-list of apps on a fixed home-screen grid, delivered by an Intune App Configuration policy assigned to the Managed Home Screen app (`com.microsoft.launcher.enterprise`). It covers Android 8.0 and later on devices already enrolled with a Standard Corporate-owned dedicated device token, and requires the Intune Administrator role to assign the Managed Home Screen app as Required and to author and assign the MHS App Configuration policy carrying the worked JSON payload.
