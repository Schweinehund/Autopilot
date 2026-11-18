---
created: 2026-11-18T16:43:27.173Z
title: Document Knox Manage management of Galaxy Tab Active4 Pro and Active5
area: docs
severity: minor
files:
  - docs/recipes/07-samsung-tablet-8021x-wifi-knox-manage.md
  - docs/recipes/08-knox-manage-ca-ndes-scc.md
  - docs/admin-setup-android/07-knox-mobile-enrollment.md:199
---

## Problem

The corpus has no end-to-end admin guide for managing Samsung Galaxy Tab Active4 Pro
and Galaxy Tab Active5 tablets with Knox Manage. Knox Manage coverage today is two
narrow Draft recipes (RE-238 802.1X Wi-Fi, RE-239 CA integration through NDES and
Samsung Cloud Connector) plus mentions that Knox Manage is an alternative MDM that
cannot be used alongside Intune (KME guide SKU table, L2 runbook 22). Nothing names the
Active4 Pro or Active5 models.

## Solution

TBD. Candidate scope for a Knox Manage admin guide:
- Licensing and console (original console vs new), KME enrollment pointed at Knox Manage
- Android Enterprise fully managed enrollment and device groups
- Baseline policy: restrictions, kiosk, app deployment (managed Google Play)
- Wi-Fi: PSK lockdown, including blocking admin-configured Wi-Fi sharing
  (`DISALLOW_SHARING_ADMIN_CONFIGURED_WIFI`, Android 13+) so the QR code doesn't show
  the PSK. Link out to RE-238 and RE-239 for 802.1X and certificates.
- Active-series specifics: programmable Active key, glove and touch modes,
  hot-swappable battery and battery-protect charging, DeX, firmware (E-FOTA)
- Check every console label against the live Knox Manage console before writing.
  Use targeted finds only, never full snapshots of the policy editor, because it
  shows stored PSKs in clear text.
