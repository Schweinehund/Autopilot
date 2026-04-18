---
last_verified: 2026-04-18
review_by: 2026-07-17
applies_to: ADE
audience: admin
platform: iOS
---

> **Platform gate:** This guide covers iOS/iPadOS APNs certificate configuration for Intune MDM.
> For macOS ADE setup, see [macOS Admin Setup Guides](../admin-setup-macos/00-overview.md).
> For iOS/iPadOS enrollment terminology, see the [Apple Provisioning Glossary](../_glossary-macos.md).
> Portal navigation may vary by Intune admin center version. See [Overview](00-overview.md#portal-navigation-note) for details.

# Apple Push Notification (APNs) Certificate

The APNs certificate enables MDM communication between Microsoft Intune and ALL Apple devices — iOS, iPadOS, and macOS. This is shared cross-platform infrastructure: a single APNs certificate covers all Apple platforms enrolled in your Intune tenant. If the certificate expires or is replaced, MDM communication to ALL enrolled iOS, iPadOS, and macOS devices stops simultaneously.

## Prerequisites

- Intune Administrator role in Microsoft Intune admin center
- A company email address Apple ID (NOT a personal Apple ID) — as a best practice, use a distribution list monitored by more than one person
- Microsoft Intune Plan 1 (or higher) subscription
- Access to the [Apple Push Certificates Portal](https://identity.apple.com)

> **What breaks if misconfigured:** Using a personal Apple ID means the APNs certificate cannot be renewed if that employee leaves the organization. ALL enrolled iOS, iPadOS, and macOS devices lose MDM communication when the certificate expires. Symptom appears in: Apple Push Certificates Portal (cannot log in to renew) and Intune admin center (all Apple devices show "Not checking in" after expiration).

## Steps

### Step 1: Download the certificate signing request from Intune

#### In Intune admin center

1. Sign in to [Intune admin center](https://intune.microsoft.com).
2. Navigate to **Devices** > **Device onboarding** > **Enrollment** > **Apple** tab > **Apple MDM Push Certificate**.
3. Select **Download your CSR** to save the certificate signing request (.csr) file locally.
4. Grant permission for Microsoft to send user and device information to Apple when prompted.

### Step 2: Create the certificate in Apple Push Certificates Portal

#### In Apple Push Certificates Portal

1. Navigate to [Apple Push Certificates Portal](https://identity.apple.com).
2. Sign in with the **company email address Apple ID** identified in Prerequisites.
3. Select **Create a Certificate**.
4. Accept the Terms of Use.
5. Upload the .csr file downloaded in Step 1.
6. Select **Download** to save the resulting .pem certificate file locally.

> **What breaks if misconfigured:** Uploading the wrong CSR file (e.g., from a different Intune tenant) creates a certificate that cannot communicate with your Intune instance. Symptom appears in: Intune admin center (certificate upload succeeds but devices cannot check in).

### Step 3: Upload the certificate to Intune

#### In Intune admin center

1. Return to **Devices** > **Device onboarding** > **Enrollment** > **Apple** tab > **Apple MDM Push Certificate**.
2. Enter the Apple ID used in Step 2. Record this Apple ID — it is required for all future renewals.
3. Upload the .pem certificate file downloaded from Apple Push Certificates Portal.
4. Select **Upload**.

## Renewal

The APNs certificate is valid for **365 days**. A **30-day grace period** allows renewal after expiration, but during the grace period MDM communication may be degraded. Set a calendar reminder 30 days before expiration.

### Renew vs. Create: Critical Distinction

> **What breaks if misconfigured:** Creating a **NEW** APNs certificate instead of **renewing** the existing one immediately breaks MDM communication to **ALL** enrolled iOS, iPadOS, and macOS devices. A new certificate has a different UID. Devices enrolled with the old certificate cannot be managed — they must be wiped and re-enrolled. This affects every Apple device in your organization simultaneously. **Always renew. Never create new.**

### Renewal Steps

#### In Intune admin center

1. Navigate to **Devices** > **Device onboarding** > **Enrollment** > **Apple** tab > **Apple MDM Push Certificate**.
2. Select **Download your CSR** to download a new certificate signing request.

#### In Apple Push Certificates Portal

3. Sign in with the **same Apple ID** used to create the original certificate.
4. Find the **existing** certificate in the certificate list.
5. Select **Renew** on the existing certificate. Do NOT select "Create a Certificate."
6. Upload the new CSR from step 2.
7. Download the renewed .pem file.

#### In Intune admin center

8. Upload the renewed .pem file to Intune.
9. Verify the new expiration date (should be ~365 days from renewal).

> **What breaks if misconfigured:** Renewing with a DIFFERENT Apple ID than the one used to create the certificate fails. The Apple Push Certificates Portal does not allow a different Apple ID to renew an existing certificate. Symptom appears in: Apple Push Certificates Portal (certificate not visible under wrong Apple ID).

## Verification

- [ ] APNs certificate status shows "Active" in Intune admin center > Devices > Device onboarding > Enrollment > Apple > Apple MDM Push Certificate
- [ ] Certificate expiration date is visible (should be ~365 days from creation or renewal)
- [ ] Apple ID used is a company email address (not a personal Apple ID)
- [ ] Apple ID is recorded and accessible to multiple IT administrators

## Configuration-Caused Failures

| Misconfiguration | Portal | Symptom | Runbook |
|------------------|--------|---------|---------|
| New certificate created instead of renewed | Apple Push Certificates Portal | ALL enrolled iOS, iPadOS, and macOS devices lose MDM communication; devices show "Not checking in" | [Runbook 16: APNs Expired](../l1-runbooks/16-ios-apns-expired.md) |
| Personal Apple ID used | Apple Push Certificates Portal | Certificate cannot be renewed after employee departure; all Apple devices lose MDM at expiration | [Runbook 16: APNs Expired](../l1-runbooks/16-ios-apns-expired.md) |
| Certificate expired without renewal | Intune | All Apple device MDM communication stops; 30-day grace period for renewal | [Runbook 16: APNs Expired](../l1-runbooks/16-ios-apns-expired.md) |
| Wrong CSR uploaded | Apple Push Certificates Portal | Certificate created but cannot communicate with Intune tenant | [Runbook 16: APNs Expired](../l1-runbooks/16-ios-apns-expired.md) |
| Renewed with different Apple ID | Apple Push Certificates Portal | Existing certificate not visible; renewal fails | [Runbook 16: APNs Expired](../l1-runbooks/16-ios-apns-expired.md) |

## Renewal / Maintenance

| Component | Renewal Period | Consequence of Lapse | Renewal Steps |
|-----------|---------------|---------------------|---------------|
| APNs certificate (.pem) | Annual (365 days) | ALL MDM communication to ALL enrolled iOS, iPadOS, and macOS devices stops immediately | See [Renewal](#renewal) above |

## See Also

- [ABM/ADE Token Configuration](02-abm-token.md)
- [iOS/iPadOS Admin Setup Overview](00-overview.md)
- [iOS/iPadOS ADE Lifecycle](../ios-lifecycle/01-ade-lifecycle.md)
- [Apple Provisioning Glossary](../_glossary-macos.md)

---
*Next step: [ABM/ADE Token](02-abm-token.md)*

---

| Date | Change | Author |
|------|--------|--------|
| 2026-04-18 | Resolved iOS L1 runbook cross-references | -- |
| 2026-04-16 | Initial version -- APNs certificate creation, renewal, and cross-platform expiry impact | -- |
