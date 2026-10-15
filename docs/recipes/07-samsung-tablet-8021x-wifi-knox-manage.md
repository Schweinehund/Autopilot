---
doc_id: RE-238
status: Draft
owner: Intune Admin Lead
doc_type: Guide
platform: Android
last_verified: 2026-10-15
review_by: 2027-01-13
applies_to: Samsung tablets enrolled in Knox Manage as Android Enterprise fully managed devices, receiving an 802.1X (802.1xEAP) Wi-Fi network from a Knox Manage original console profile
audience: admin
---

**Platform:** Android · **Doc Type:** Guide · **Doc ID:** RE-238 · **Status:** Draft

# Samsung Tablet 802.1X Wi-Fi: Knox Manage Provisioning

## Summary

Following this recipe yields a Samsung tablet that joins an 802.1X Wi-Fi network automatically, with RADIUS server validation turned on, from an Android Enterprise profile that you build and assign in the Knox Manage original console. It covers tablets that Knox Manage already manages as Android Enterprise fully managed devices, and requires a Knox Manage administrator account that can manage certificates and profiles.

> **Scope:** Knox Manage original console only. Knox Manage replaces Intune on the tablets it manages, so no Intune profile in this corpus reaches them.

> See [Knox Manage 802.1X Wi-Fi](../admin-setup-8021x/06-android.md#knox-manage-8021x-wi-fi) for how this differs from the Intune 802.1X requirements.

> Assumes the RADIUS server, its certificate, and the tablet enrollment already exist. This recipe hasn't been pilot-tested on a device.

## Prerequisites

- **This recipe is NOT:** 802.1X Wi-Fi for Samsung devices that Intune manages, which use the Intune Wi-Fi profiles in [Android Enterprise 802.1X Admin Setup](../admin-setup-8021x/06-android.md#wi-fi), and it doesn't cover the Knox Manage new console, whose reference documents none of the 802.1X fields.
- **Tablets enrolled in Knox Manage as Android Enterprise fully managed devices.** Samsung's [original console Android Enterprise policies reference](https://docs.samsungknox.com/admin/knox-manage/original-console/configure/profile/configure-profile-policies/android-enterprise-policies/) (last updated October 8, 2026) states that the Wi-Fi configuration isn't applied to the work profile area.
- **The RADIUS server's root CA certificate** in CER, DER, PFX, or P12 format, and the domain or alternate subject names on the RADIUS server certificate.
- **A Knox Manage group** that contains the target tablets.
- **For EAP-TLS, or for a shared client certificate:** a client certificate in PFX or P12 format, or a CA that Knox Manage can request certificates from (ADCS, Generic SCEP, or NDES).
- **A Knox Manage administrator account** with permission to manage certificates and profiles.

## Unsupported and Anti-Feature Callouts

| Feature | Why it's unsupported / what breaks | Do this instead |
|---|---|---|
| **Select Certificate to Use** set to **Connector Interworking** | The original console's own notice lists this option as deprecated since version 25.11 and unsupported in the new console | Use **EMM Management Certificate** or **Issuing external CA** in [Step 3](#step-3-provide-the-client-certificate) |
| **Trust on First Use** set to **Use** | On Android 13 or later it lets the configuration skip the **CA Certificate (Alias)** and **Domain** or **Alternate Subject** requirements, which removes the RADIUS server validation that those fields provide | Leave **Trust on First Use** at **Do Not Use** and set the CA certificate and domain in [Step 5](#step-5-configure-the-8021x-wi-fi-policy) |
| An anonymous outer identity | Neither the console nor Samsung's reference has an identity privacy or outer identity field, so you can't set an anonymous outer identity | N/A -- no alternative exists in Knox Manage. If your policy requires identity privacy, see [Anonymous Outer Identity](../admin-setup-8021x/06-android.md#anonymous-outer-identity-identity-privacy) |
| Delivering the Wi-Fi network to a work profile | Samsung's original console reference states that the Wi-Fi configuration isn't applied to the work profile area | Enroll the tablets as fully managed devices |
| Choosing a network MAC address behavior | Neither the console nor Samsung's reference has a MAC address randomization field | N/A -- no alternative exists in Knox Manage |

## Steps

### Step 1: Choose the EAP method

The EAP method decides whether the tablet authenticates with a client certificate or with a user name and password inside an encrypted tunnel.

> **Ask the admin:** Which EAP method does the RADIUS server accept for this SSID?

| Option | When to choose | Recorded as |
|---|---|---|
| PEAP | The RADIUS server accepts a user name and password inside a PEAP tunnel | `EAP Method: PEAP` |
| TTLS | The RADIUS server accepts a user name and password inside a TTLS tunnel | `EAP Method: TTLS` |
| TLS | The RADIUS server requires a client certificate from each tablet | `EAP Method: TLS` |

The console offers **TLS**, although Samsung's reference lists only PEAP and TTLS. EAP-TLS through Knox Manage hasn't been tested on a device, so pilot it on one tablet before you assign it to the group.

### Step 2: Register the RADIUS root CA certificate

Register the root certificate first, because the Wi-Fi policy can only select a root certificate that's already registered. Samsung's [external certificates guide](https://docs.samsungknox.com/admin/knox-manage/original-console/configure/certificates/external-certificates/) (last updated January 22, 2024) documents these steps.

1. In the Knox Manage console, go to **Advanced** > **Certificate** > **External Certificate**, and then click **Add**.
2. In **External Certificate Name**, enter a unique name.
3. In **Purpose**, select **Wi-Fi**.

   > **What breaks if misconfigured:** The **CA Certificate (Alias)** list in the Wi-Fi policy shows only certificates with **Purpose** set to **Wi-Fi** and **Type** set to **Root**. Any other value leaves the certificate out of the list.

4. In **Type**, select **Root**.
5. Upload the root certificate file in CER, DER, PFX, or P12 format, enter its password if it has one, and then click **Save**.

### Step 3: Provide the client certificate

The Wi-Fi policy's **Select Certificate to Use** field decides where the tablet's client certificate comes from. EAP-TLS needs a client certificate. For PEAP or TTLS, Samsung's reference doesn't state whether one is required, but Samsung's EAP-PEAP knowledge base article configures one.

> **Ask the admin:** Should every tablet share one client certificate, or should each tablet get its own from your CA?

| Option | When to choose | Recorded as |
|---|---|---|
| EMM Management Certificate | One shared certificate is acceptable to your RADIUS policy | `Select Certificate to Use: EMM Management Certificate` |
| Issuing external CA | Each tablet needs its own certificate from an ADCS, Generic SCEP, or NDES CA | `Select Certificate to Use: Issuing external CA` |

If you chose **EMM Management Certificate**, register the shared certificate:

1. Go to **Advanced** > **Certificate** > **External Certificate**, and then click **Add**.
2. In **Purpose**, select **Wi-Fi**, and in **Type**, select **User**.
3. Upload the certificate in PFX or P12 format, enter its password, and then click **Save**.

   > **What breaks if misconfigured:** Samsung's reference states that all users share this one certificate, so RADIUS sees the same client identity from every tablet, and revoking it disconnects every tablet at once.

If you chose **Issuing external CA**, register your CA and a Wi-Fi certificate template:

1. Go to **Advanced** > **Certificate** > **Certificate Authority (CA)**, click **Add**, and register your CA as described in Samsung's [certificate authority guide](https://docs.samsungknox.com/admin/knox-manage/original-console/configure/certificates/certificate-authority-ca/) (last updated November 19, 2024).
2. Go to **Advanced** > **Certificate** > **Certificate Template**, and then click **Add**.
3. In **Template Name**, enter a unique name, and in **Platform**, select **Android**.
4. In **CA**, select the CA from the previous step.
5. In **Subject Name**, enter the subject in `CN = {Subject name value}` format.
6. In **Certificate Usage**, select **Wi-Fi**, and then click **Save**. Samsung's [certificate templates guide](https://docs.samsungknox.com/admin/knox-manage/original-console/configure/certificates/certificate-templates/) (last updated August 5, 2025) describes the remaining fields.

   > **What breaks if misconfigured:** A template with any other **Certificate Usage** value can't issue the certificate that the Wi-Fi policy needs, and the tablet has no client certificate to present. See [802.1X Certificate Failure](../l1-runbooks/38-8021x-certificate-failure.md).

### Step 4: Create the Android Enterprise profile

Create a separate profile for the Wi-Fi network so that you can assign it, and later remove it, without changing other profiles.

1. Go to **Profile**, and then click **Add**.
2. In **Name**, enter a profile name that uses only letters, numbers, and underscores. You can't change the name after you save it.
3. In **Platform**, select **Android Enterprise**. The console also selects **Samsung Knox**.
4. Click **Save & Set Policy**.

   > **What breaks if misconfigured:** A profile created for any other platform doesn't offer the Android Enterprise Wi-Fi policy, and doesn't apply to the tablets.

### Step 5: Configure the 802.1X Wi-Fi policy

Configure the network in the profile's Wi-Fi policy. Samsung's [original console Android Enterprise policies reference](https://docs.samsungknox.com/admin/knox-manage/original-console/configure/profile/configure-profile-policies/android-enterprise-policies/) defines these fields.

1. In the **Android Enterprise** policy list, select **Wi-Fi**.
2. In **Configuration ID**, enter a unique ID for this network.
3. In **Network Name (SSID)**, enter the SSID.
4. In **Automatically Connect to Wi-Fi**, select **Use**.

   > **What breaks if misconfigured:** With **Do Not Use**, Knox Manage pushes the network to the tablet, but the tablet doesn't join it until someone selects it.

5. In **Security Type**, select **802.1xEAP**.
6. In **EAP Method**, select the method that you chose in [Step 1](#step-1-choose-the-eap-method).

   > **What breaks if misconfigured:** A method that the RADIUS server doesn't accept fails the EAP exchange. See [802.1X EAP Negotiation Failure](../l1-runbooks/41-8021x-eap-negotiation-failure.md).

7. For PEAP or TTLS, in **2-step Authentication**, select the inner method that the RADIUS server accepts: **PAP**, **MSCHAP**, or **MSCHAPV2**.
8. In **Set User Sign-in Information**, choose where the user name and password come from.

   > **Ask the admin:** Should the tablets authenticate with one fixed account, or with each user's Knox Manage information?

   | Option | When to choose | Recorded as |
   |---|---|---|
   | Manual Input | One fixed account authenticates every tablet | `Set User Sign-in Information: Manual Input` |
   | User Information | Each tablet authenticates with the user information registered in Knox Manage | `Set User Sign-in Information: User Information` |

   For **Manual Input**, enter the **ID** and **Password**. **Connector Interworking** depends on directory integration, which the original console's notice lists as deprecated.

9. If you provided a client certificate in [Step 3](#step-3-provide-the-client-certificate), select that option in **Select Certificate to Use**, and then select the certificate in **User Certificate (Alias)** or **Issuing External CA (Alias)**.
10. In **CA Certificate (Alias)**, select the root certificate that you registered in [Step 2](#step-2-register-the-radius-root-ca-certificate).

    > **What breaks if misconfigured:** Without a CA certificate, Samsung devices running Android 13 or later with a June 2023 or later security patch fail the configuration, and you might see error KMA_D9001.

11. Leave **Trust on First Use** at **Do Not Use**.
12. In **Domain** or **Alternate Subject**, add the names on the RADIUS server certificate, and then click **Add**. Each list accepts more than one entry.

    > **Ask the admin:** Which domain or alternate subject names does the RADIUS server certificate carry?

    Enter at least one value in **Domain** or **Alternate Subject**. Samsung's [EAP-PEAP knowledge base article](https://docs.samsungknox.com/admin/knox-manage/kbas/kba-142-wifi-eap-peap-with-cert-in-knox-manage/) (last updated August 26, 2025) states that the configuration fails without one on Samsung devices running Android 13 or later with a June 2023 or later security patch.

    > **What breaks if misconfigured:** A name that doesn't match the RADIUS server certificate makes the tablet reject the server. See [802.1X Server Trust Failure](../l1-runbooks/40-8021x-server-trust-failure.md).

13. Click **Save**.

### Step 6: Assign the profile to the tablet group

Assign the profile to the group so that Knox Manage applies it to every tablet in the group. Samsung's [assign profiles to groups guide](https://docs.samsungknox.com/admin/knox-manage/original-console/configure/profile/apply-policies-and-configurations-to-devices/manual-deployment-all-other-platforms/assign-profiles-to-groups/) (last updated December 7, 2023) documents these steps.

1. Go to **Profile**, and then select the checkbox for the profile.
2. Click **Assign**.
3. On the **Assign Profile** page, select **Group**, and then select the checkbox for the tablet group.
4. If Knox Manage shows a policy conflict with a profile that's already assigned, click **Preview Policy** and review it before you continue.

   > **What breaks if misconfigured:** When two assigned profiles set conflicting policies, Knox Manage applies the policy from the profile with the higher priority, so the Wi-Fi policy might not be the one that applies.

5. Click **Assign & Push**, and then click **OK**.

## Verification

- [ ] In the Knox Manage console, go to **Device**, select a tablet, and confirm that the **Profile** tab on **Device Details** lists the profile and its Wi-Fi policy.
- [ ] The tablet joins the SSID without anyone selecting it.
- [ ] The RADIUS server log shows an accept for the tablet, using the EAP method from [Step 1](#step-1-choose-the-eap-method).
- [ ] For EAP-TLS, the RADIUS server log shows the client certificate that you expect: the shared certificate, or one issued by your CA.

## Rollback/Recovery

**Removing the network from the tablets:**

- Unassign the profile from the tablet group, or delete the profile. Samsung's references don't state whether unassigning removes a network that's already on the tablet, so confirm the result on one tablet. Removing the network on the tablet itself doesn't last: Samsung's reference states that a configuration a user deletes is applied again when the device restarts.

**Resending the profile to one tablet:**

- Go to **Device**, select the checkbox for the tablet, click **Device Command**, select **Push Profile**, and then click **OK**. Samsung's [Android Enterprise device commands reference](https://docs.samsungknox.com/admin/knox-manage/original-console/configure/devices/send-commands-to-devices/android-enterprise-device-commands/) (last updated October 8, 2026) describes this command as pushing the current profile to the device and applying it.

## Configuration-Caused Failures

| Misconfiguration | Symptom | Runbook |
|---|---|---|
| **CA Certificate (Alias)**, or both **Domain** and **Alternate Subject**, left empty | The Wi-Fi configuration fails on Samsung devices running Android 13 or later, and you might see error KMA_D9001 | [Step 5](#step-5-configure-the-8021x-wi-fi-policy) |
| **Domain** or **Alternate Subject** doesn't match the RADIUS server certificate | The tablet rejects the RADIUS server and doesn't connect | [802.1X Server Trust Failure](../l1-runbooks/40-8021x-server-trust-failure.md) |
| **EAP Method** or **2-step Authentication** that the RADIUS server doesn't accept | The EAP exchange fails before authentication | [802.1X EAP Negotiation Failure](../l1-runbooks/41-8021x-eap-negotiation-failure.md) |
| Client certificate or user credentials that the RADIUS policy rejects | RADIUS rejects the tablet after the EAP exchange | [802.1X RADIUS Reject](../l1-runbooks/39-8021x-radius-reject.md) |
| Root certificate registered with a **Purpose** other than **Wi-Fi** or a **Type** other than **Root** | The certificate is missing from the **CA Certificate (Alias)** list | [Step 2](#step-2-register-the-radius-root-ca-certificate) |

## See Also

- [Admin Decision-Point Block Format (STD-05)](../_standards/EEE-SOP-standard.md)—the spec this recipe's decision blocks follow
- [Knox Manage 802.1X Wi-Fi](../admin-setup-8021x/06-android.md#knox-manage-8021x-wi-fi)—the Knox Manage fields compared with this corpus's Intune 802.1X requirements
- [Knox SKU disambiguation](../admin-setup-android/07-knox-mobile-enrollment.md#sku-disambiguation)—why Knox Manage replaces Intune rather than working alongside it
- [Certificate Delivery Foundation](../admin-setup-8021x/02-cert-delivery-foundation.md)—EKU requirements and certificate concepts shared by every platform
- [802.1X Triage Decision Tree](../decision-trees/10-8021x-triage.md)—where to start when a tablet doesn't connect
- [Network Authentication Glossary](../_glossary-network.md)—802.1X, EAP, RADIUS, and server-name validation terms
