---
doc_id: RE-239
status: Draft
owner: Intune Admin Lead
doc_type: Guide
platform: Android
last_verified: 2026-10-16
review_by: 2027-01-14
applies_to: Knox Manage original console certificate authority integration with an internal Microsoft Enterprise AD CS CA, through a dedicated NDES server and Samsung Cloud Connector, to issue per-device EAP-TLS client certificates
audience: admin
---

**Platform:** Android · **Doc Type:** Guide · **Doc ID:** RE-239 · **Status:** Draft

# Knox Manage Certificate Authority: NDES and Samsung Cloud Connector Integration

## Summary

Following this recipe yields a Knox Manage original console tenant that requests per-device client certificates from an internal Microsoft Enterprise AD CS certification authority, through a dedicated Network Device Enrollment Service (NDES) server and the Samsung Cloud Connector (SCC), ready for the EAP-TLS Wi-Fi policy in the Samsung tablet 802.1X recipe. It requires AD CS and server administrator rights for the NDES build, and a Knox Manage administrator account that can manage certificates and settings.

> **Scope:** Knox Manage original console, an internal Enterprise AD CS CA, and Cisco ISE as the RADIUS server for the pilot. The CA itself already exists.

> The NDES server stays internal. Only the SCC client makes an outbound connection to Samsung.

> This recipe hasn't been pilot-tested. The [Pilot Environment Record](#pilot-environment-record) holds the measured state and the pilot result.

## Prerequisites

- **This recipe is NOT:** the Intune certificate infrastructure. Intune SCEP and PKCS profiles keep using their own connector, and nothing in this recipe changes them.
- **An Enterprise AD CS issuing CA**, and an account that can create and publish certificate templates on it.
- **A new Windows Server** for NDES and the SCC client. Samsung's [SCC prerequisites](https://docs.samsungknox.com/admin/knox-manage/original-console/samsung-cloud-connector/prerequisites-for-installing-scc/) (last updated June 17, 2026) list Windows Server 2008 R2 through 2025 (64-bit).
- **Outbound TCP 10000 from that server, with no web proxy,** to the SCC endpoint for your Knox Manage region, for example `scc-us02.manage.samsungknox.com:10000` for region US 02. Samsung's prerequisites state that the connector doesn't function through a web proxy.
- **For the NDES installation:** an account in the local Administrators group with Enroll permission on the **Exchange Enrollment Agent (Offline request)** and **CEP Encryption** templates, and membership in Enterprise Admins for the installation only, as Microsoft's [NDES wiki](https://learn.microsoft.com/en-us/archive/technet-wiki/9063.active-directory-certificate-services-ad-cs-network-device-enrollment-service-ndes) (last updated January 9, 2024) describes.
- **A Knox Manage administrator account** that can manage certificates and Knox Manage settings.

## Unsupported and Anti-Feature Callouts

| Feature | Why it's unsupported / what breaks | Do this instead |
|---|---|---|
| Reusing an NDES server that serves Intune SCEP | Microsoft's [SCEP infrastructure guide](https://learn.microsoft.com/en-us/intune/fundamentals/certificates/scep-infrastructure) (last updated June 26, 2023) states that the Intune Certificate Connector installs an Intune-SCEP policy module on NDES that only accepts Intune-generated challenges, so Knox Manage requests fail | Build a separate NDES server with no Intune Certificate Connector, as in [Step 2](#step-2-build-the-ndes-server) |
| Running the Intune Certificate Connector's SCEP feature on the Knox Manage NDES server | Enabling it installs the same Intune policy module and breaks Knox Manage enrollment | Keep the Intune Certificate Connector off this server |
| **Direct Connection** for an internal CA | The console states that Direct Connection can only use ports 80 and 443, so Knox Manage's cloud must reach the NDES URL from the internet | Use **Secure Connection via Cloud Connector** |
| **No Challenge** | NDES with `EnforcePassword` set to 0 issues a certificate to any client that reaches it | Use **Dynamic**, as in [Step 1](#step-1-choose-the-integration-design) |
| A Knox Manage CA type of **ADCS** with Windows-integrated authentication through SCC | Samsung's [SCC integration guide](https://docs.samsungknox.com/admin/knox-manage/original-console/samsung-cloud-connector/integrate-services-in-knox-manage/) (last updated June 10, 2024) states that the ADCS CA's Windows type certification isn't available | Use the **NDES** CA type, or ADCS with username and password authentication on the Certificate Enrollment Web Service |

## Steps

### Step 1: Choose the integration design

Three decisions shape everything that follows. Make them before you build anything.

> **Ask the admin:** Which Knox Manage CA type should front the internal CA?

| Option | When to choose | Consequence if wrong | Branch |
|---|---|---|---|
| NDES on a new server | No NDES server exists that's free of the Intune policy module | An Intune NDES server rejects every Knox Manage request | [Step 2](#step-2-build-the-ndes-server) |
| ADCS through the Certificate Enrollment Web Service | Certificate Enrollment Web Service with username and password authentication already exists, or is preferred over NDES | You also need Web Enrollment for the **CA Cert Chain URL**, which this recipe doesn't build | Not covered: see Samsung's [certificate authority guide](https://docs.samsungknox.com/admin/knox-manage/original-console/configure/certificates/certificate-authority-ca/) (last updated November 19, 2024) |

> **Ask the admin:** How should Knox Manage reach the CA?

| Option | When to choose | Recorded as |
|---|---|---|
| Secure Connection via Cloud Connector | The CA and NDES are internal | `Connection Type: Secure Connection via Cloud Connector` |
| Direct Connection | The NDES URL is published to the internet on port 80 or 443 | `Connection Type: Direct Connection` |

> **Ask the admin:** Which NDES challenge type should Knox Manage use?

| Option | When to choose | Recorded as |
|---|---|---|
| Dynamic | NDES issues a one-time password for each request, which is its default mode | `Challenge Type: Dynamic` |
| Static | NDES runs in single-password mode, which Microsoft reserves for tightly controlled environments | `Challenge Type: Static` |

The rest of this recipe follows NDES on a new server, the Cloud Connector, and the Dynamic challenge. Microsoft's NDES wiki recommends that no other services run on the NDES computer. This design places the SCC client on the same server anyway, to keep everything that Knox Manage needs away from the Intune servers. Record that choice with the server's owner.

### Step 2: Build the NDES server

NDES runs as an IIS extension and talks to the CA over DCOM, so the new server needs IIS and a network path to the CA. Microsoft's NDES wiki documents these requirements.

1. Create a domain user account for the NDES service, and add it to the local **IIS_IUSRS** group on the new server.
2. On the CA, grant the NDES service account **Request Certificates** permission.
3. Sign in with the installation account from [Prerequisites](#prerequisites), and add the **Network Device Enrollment Service** role service in **Active Directory Certificate Services**.
4. In the role configuration, select the NDES service account as the service identity, and select your issuing CA.

   > **What breaks if misconfigured:** If the service account isn't in **IIS_IUSRS**, the installer stops with an error, and if it lacks **Request Certificates** on the CA, NDES can't obtain certificates.

5. Leave the Intune Certificate Connector off this server.
6. Confirm that NDES answers by opening `http://localhost/certsrv/mscep/mscep.dll?operation=GetCACaps` on the server. A list of capabilities, such as `POSTPKIOperation`, means that NDES is running.

### Step 3: Create the tablet certificate template

The template defines the certificates that the tablets present to Cisco ISE.

1. On the CA, open **Certificate Templates**, duplicate an existing template, and give the copy a clear name. Note the template name, not its display name, for the registry step.
2. On the **Extensions** tab, make sure that **Application Policies** includes **Client Authentication**.

   > **What breaks if misconfigured:** Without **Client Authentication**, Cisco ISE doesn't accept the certificate for EAP-TLS. See [802.1X Certificate Failure](../l1-runbooks/38-8021x-certificate-failure.md).

3. On the **Subject Name** tab, select **Supply in the request**, because Knox Manage sends the subject from its own certificate template in [Step 6](#step-6-register-the-ca-and-the-certificate-template-in-knox-manage). Microsoft's [SCEP infrastructure guide](https://learn.microsoft.com/en-us/intune/fundamentals/certificates/scep-infrastructure) relies on the Intune policy module to secure this setting. This NDES server has no such module, so the one-time Dynamic challenge is what limits who can request a certificate.
4. On the **Security** tab, grant **Read** and **Enroll** to the NDES service account and to the Knox Manage challenge account that you create in [Step 4](#step-4-configure-the-dynamic-challenge-account).
5. Publish the template on the CA by using **Certificate Template to Issue**.
6. On the NDES server, in `HKLM\SOFTWARE\Microsoft\Cryptography\MSCEP`, set the value that matches the template's **Purpose** on the **Request Handling** tab to the template name: **SignatureTemplate** for **Signature**, **EncryptionTemplate** for **Encryption**, or **GeneralPurposeTemplate** for **Signature and encryption**.
7. Restart the NDES server. Microsoft's SCEP infrastructure guide states not to use `iisreset`, because it doesn't complete the required changes.

   > **What breaks if misconfigured:** NDES picks one of the three values based on the key usage in each request, and falls back to the **IPSec (Offline request)** template for any value that isn't set. Samsung doesn't document the key usage that Knox Manage requests, so if a request lands on the wrong template, set the other two values to the tablet template as well.

### Step 4: Configure the dynamic challenge account

With the Dynamic challenge, Knox Manage retrieves a one-time password from `/certsrv/mscep_admin` on the NDES server for each certificate request.

1. Create a domain user account for Knox Manage to retrieve challenge passwords.
2. Grant it **Read** and **Enroll** on the tablet template, as in [Step 3](#step-3-create-the-tablet-certificate-template).
3. Don't add it to the local Administrators group on the NDES server.

   > **What breaks if misconfigured:** Microsoft's NDES wiki states that password retrieval fails for a local administrator who requests it on the NDES computer itself, because of User Account Control. With the SCC client on the same server, every Knox Manage request is local.

4. Leave `EnforcePassword` at its default of `1` and don't set `UseSinglePassword`, so that NDES keeps issuing one-time passwords.

### Step 5: Install the Samsung Cloud Connector client

The SCC client opens an outbound TLS channel to Samsung, which Knox Manage uses to reach NDES. Samsung's [SCC installation guide](https://docs.samsungknox.com/admin/knox-manage/original-console/samsung-cloud-connector/install-the-scc-client/) (last updated June 17, 2026) documents these steps.

1. On the NDES server, install JDK 21 (64-bit), and set `JAVA_HOME` to it.
2. On the server, run `Test-NetConnection <scc-endpoint> -Port 10000`, and confirm `TcpTestSucceeded : True` with no web proxy configured.
3. In the Knox Manage console, go to **Setting** > **Configuration** > **Basic Configuration**, select the **Cloud Connector** tab, and click **Generate** if no secret token exists, then **Copy**.

   > **What breaks if misconfigured:** Samsung supports one SCC client for each tenant, so installing a second client elsewhere doesn't add redundancy.

4. In the console, click the **Download** icon, select the **Cloud Connector / Knox Remote Support** tab, and download the **Cloud Connector Client**.
5. Run the installer, point it at the JDK home directory, keep the default destination `C:\SamsungSDS\`, and enter your tenant ID and the secret token. The tenant ID is the domain after the at sign in your Knox Manage sign-in name.
6. Run `{SCC installation folder}\scc-client\bin\scc_service_install.bat`, and then start the **Samsung SDS Cloud Connector Client(1) Background Service** service.

### Step 6: Register the CA and the certificate template in Knox Manage

Register the root certificate first, because the CA form's **Managing CA** list only shows root certificates that are already registered.

1. Go to **Advanced** > **Certificate** > **External Certificate**, click **Add**, and register the CA's root certificate with **Purpose** set to **CA Cert** and **Type** set to **Root**. Samsung's references use this purpose and type for root CA lists, but this recipe hasn't confirmed that it fills **Managing CA**.
2. Go to **Advanced** > **Certificate** > **Certificate Authority (CA)**, and then click **Add**.
3. Enter a **CA Name**. You can't change it later.
4. In **CA Type**, select **NDES**. You can't change it later.
5. In **SCEP URL**, enter the NDES URL, for example `http://<ndes-server>/certsrv/mscep/mscep.dll`.
6. In **Key Length**, select **2048**, **3072**, or **4096**. The **Key Algorithm** is fixed at **RSA** for NDES.
7. In **Challenge Type**, select **Dynamic**, and then enter the challenge account's **User ID**, **Password**, and **Domain**, and the **Challenge URL**, for example `https://<ndes-server>/certsrv/mscep_admin/`. Microsoft's [NDES overview](https://learn.microsoft.com/en-us/windows-server/identity/ad-cs/network-device-enrollment-service-overview) (last updated January 3, 2025) states that one-time password retrieval should be protected by TLS.
8. In **Connection Type**, select **Secure Connection via Cloud Connector**.
9. Click **Test Connection**. Samsung's guide states that you must pass the connection test to add the CA.

   > **What breaks if misconfigured:** A failed test usually means that the SCC client isn't running, the server can't reach the SCC endpoint, or the challenge account can't retrieve a password. See [Step 4](#step-4-configure-the-dynamic-challenge-account) and [Step 5](#step-5-install-the-samsung-cloud-connector-client).

10. In **Managing CA**, select the root certificate from the first step, and then click **Save & Register Template**.
11. On the certificate template form, or at **Advanced** > **Certificate** > **Certificate Template** > **Add** if the form doesn't open, select **Android** in **Platform**, select the CA, set **Subject Name** to `CN = {value}` in the format that Cisco ISE expects, and set **Certificate Usage** to **Wi-Fi**. Samsung's [certificate templates guide](https://docs.samsungknox.com/admin/knox-manage/original-console/configure/certificates/certificate-templates/) (last updated August 5, 2025) describes the remaining fields.

    > **Ask the admin:** What value must the certificate CN carry for Cisco ISE to identify each tablet?

    Enter the format that the network team supplies, by using **Lookup** to insert a device or user attribute. Record the agreed format in the [Pilot Environment Record](#pilot-environment-record).

12. Click **Save**. The template is then available as **Issuing External CA (Alias)** in the Wi-Fi policy of the [Samsung tablet 802.1X recipe](07-samsung-tablet-8021x-wifi-knox-manage.md).

## Verification

- [ ] `GetCACaps` on the NDES server returns a list of capabilities.
- [ ] The **Samsung SDS Cloud Connector Client(1) Background Service** service is running.
- [ ] **Test Connection** passes on the Knox Manage CA form.
- [ ] The CA and the certificate template appear in **Advanced** > **Certificate** > **Certificate Authority (CA)** and **Certificate Template**.
- [ ] A pilot tablet that receives the Wi-Fi policy with **Issuing external CA** gets a certificate from the internal CA, and the CA's **Issued Certificates** list shows it.
- [ ] Cisco ISE accepts the pilot tablet, and its log shows the CN that you expect.

## Rollback/Recovery

**Stopping certificate issuance to Knox Manage:**

- Stop the **Samsung SDS Cloud Connector Client(1) Background Service** service. Knox Manage can no longer reach NDES until you start it again.

**Removing the integration:**

- Delete the certificate template in Knox Manage, and then the CA. Samsung's guide states that you can delete a CA only when no template uses it. Then remove the NDES role, the template's publication on the CA, and the two service accounts.

## Configuration-Caused Failures

| Misconfiguration | Symptom | Runbook |
|---|---|---|
| Knox Manage pointed at an NDES server that runs the Intune policy module | Every Knox Manage certificate request fails | [Unsupported and Anti-Feature Callouts](#unsupported-and-anti-feature-callouts) |
| Challenge account in the NDES server's local Administrators group | **Test Connection** or certificate issuance fails while the challenge password is retrieved | [Step 4](#step-4-configure-the-dynamic-challenge-account) |
| Tablet template missing **Client Authentication**, or not published on the CA | NDES or the CA rejects the request, or Cisco ISE rejects the certificate | [802.1X Certificate Failure](../l1-runbooks/38-8021x-certificate-failure.md) |
| SCC client behind a web proxy, or outbound TCP 10000 blocked | **Test Connection** fails | [Step 5](#step-5-install-the-samsung-cloud-connector-client) |
| CN format that Cisco ISE doesn't expect | Cisco ISE rejects the tablet after a valid certificate exchange | [802.1X RADIUS Reject](../l1-runbooks/39-8021x-radius-reject.md) |

## Pilot Environment Record

This section records the pilot environment as measured on October 15 and 16, 2026. Server names are replaced with their roles.

| Item | Measured state | Consequence |
|---|---|---|
| Internal CA | Enterprise AD CS | Both the NDES and ADCS CA types work with this CA |
| Intune certificate profiles | PKCS | No NDES is needed for Intune PKCS |
| Existing NDES server | Live, with the Intune Certificate Connector and the policy module `Microsoft.Intune.Ndes.PolicyModule.NDESPolicyInterop` | Unusable by Knox Manage |
| Second connector server | NDES removed, leaving its enrollment agent certificates. It hosts the Intune Connector for Active Directory and the Intune Certificate Connector together, which Microsoft's connector guidance advises against | Not a candidate, and its connector layout needs separate review |
| Outbound TCP 10000 to the region's SCC endpoint | Passed from the existing NDES server, with no proxy | The firewall path exists from that server; the new server needs the same rule |
| Knox Manage tenant | No CA, no certificate template, and an empty **Managing CA** list | Every item in [Step 6](#step-6-register-the-ca-and-the-certificate-template-in-knox-manage) is new |
| RADIUS | Cisco ISE validates the certificate chain to the internal CA and reads the CN | Tablets don't need AD accounts |
| Decision | A new internal-only NDES server with the SCC client on it, the Cloud Connector, and the Dynamic challenge | This recipe's path |

**Open items before the pilot:**

- The CN format, the ISE authorization rule, revocation checking, and the CA and names on the ISE EAP server certificate, from the network team.
- Confirmation from Samsung that tablets never contact NDES directly, and where the tablet's key pair is generated.
- Confirmation of which external certificate purpose fills **Managing CA**.

**Pilot result:** Pending.

## See Also

- [Admin Decision-Point Block Format (STD-05)](../_standards/EEE-SOP-standard.md)—the spec this recipe's decision blocks follow
- [Samsung Tablet 802.1X Wi-Fi: Knox Manage Provisioning](07-samsung-tablet-8021x-wifi-knox-manage.md)—the Wi-Fi recipe that uses this CA through **Issuing external CA**
- [Knox Manage 802.1X Wi-Fi](../admin-setup-8021x/06-android.md#knox-manage-8021x-wi-fi)—the Knox Manage Wi-Fi fields compared with the Intune 802.1X requirements
- [EKU Requirement: Client Authentication](../admin-setup-8021x/02-cert-delivery-foundation.md#eku-requirement-client-authentication)—why the tablet template needs Client Authentication
- [802.1X Triage Decision Tree](../decision-trees/10-8021x-triage.md)—where to start when a tablet doesn't connect
