# 160-02 Fact-Check Packet

## Post-edit Step-4 block (as landed in the document)

### Step 4: Choose the delivery mechanism

The licensing standard for this device class decides which rows of the delivery-mechanism table in this step are open to a device today.

> **Ask the admin:** Does the kiosk fleet standardize on MAK-activated Windows Enterprise on the current HP hardware, or on OEM-licensed Windows IoT Enterprise hardware?

| Option | When to choose | Consequence if wrong | Branch |
|--------|-----------------|----------------------|--------|
| MAK-activated Windows Enterprise on the current HP hardware | Existing fleet; the volume agreement carries a confirmed MAK entitlement; Shell Launcher wanted only after `slmgr /xpr` reports `The machine is permanently activated.` | A MAK activates volume-licensed Windows Enterprise. Volume Licensing reaches IoT Enterprise only by upgrading a device that already runs a qualifying operating system, and nobody has confirmed whether this class's image qualifies; an OEM licenses a device into IoT Enterprise at manufacture. Each MAK activation is permanent and consumes one count; **[PILOT]** an image showing as unactivated kept failing the ShellLauncher node | Standard, ruled 2026-09-10—continue with the multi-app branch at Step 5 |
| OEM-licensed Windows IoT Enterprise hardware | Purpose-built procurement of further hardware; long-term servicing wanted (IoT Enterprise LTSC, not the general availability channel) | Procurement spend; the factory image can still ship OEM utilities, so Step 8 still applies; a device reaches IoT Enterprise through an OEM license at manufacture, and through Volume Licensing only as an upgrade to a qualifying operating system | Alternative—not worked here; after procurement the Shell Launcher row opens with WindowsApp_AutoLogon.xml |

### P1 (first prose paragraph after the table)

The Intune Admin Lead ruled on 2026-09-10 that the walk-up AVD kiosk class standardizes on MAK-activated, volume-licensed Windows Enterprise on the current HP hardware, with OEM-licensed Windows IoT Enterprise hardware as the alternative for purpose-built procurement. The ruling carries one prerequisite: confirm a MAK entitlement under the volume agreement before the first activation, because the pilot never activated a device. Microsoft's Windows IoT Enterprise licensing page sets the split out as a requirement matrix: an OEM licenses a device into IoT Enterprise at manufacture, Volume Licensing cannot license a device into IoT Enterprise at first licensing, and Volume Licensing (KMS or MAK) reaches IoT Enterprise only by upgrading a device that already runs a qualifying operating system. Whether this class's Windows 11 Enterprise image counts as qualifying stays UNVERIFIED, so plan the MAK arm as producing volume-licensed Windows Enterprise until someone confirms otherwise.

### P2 (second prose paragraph, before the callout)

The MAK arm clears the ShellLauncher node's edition gate: Microsoft's AssignedAccess CSP reference states that Shell Launcher and the ShellLauncher node both require Windows Enterprise or Windows Education to function, and that the ShellLauncher node is not supported in Windows 10 Pro. That page names no further edition, so the IoT Enterprise arm rests on this recipe's own Prerequisites list, not on the cited page; a MAK-activated image should clear the same gate—not pilot-tested, stated as reasoning from the licensing structure, not as an observation. No first-party page names activation state as a second gate, and the **[PILOT]** failure on an image showing as unactivated stands as recorded in Prerequisites. Under either arm the OEM-cleanup work in Step 8 stays, because it addresses the factory image rather than the license; an IoT Enterprise device narrows that work only when its specific SKU ships a clean image, which procurement verifies.

### Callout

> **What breaks if misconfigured:** a MAK bought to reach the IoT arm activates volume-licensed Windows Enterprise; OEMs license IoT Enterprise at manufacture, Volume Licensing only as an upgrade.

## The `:42` remedy cell — pre-edit form (current in the document, not yet touched)

Activate with a per-device volume key (MAK via an Edition upgrade profile), buy IoT Enterprise hardware, or take the multi-app branch worked here

## The `:42` remedy cell — intended post-edit form (not yet applied; judged here for the same source support as the Step-4 block, since it makes the same two claims)

Activate with a per-device volume key (a MAK, delivered through an Intune Edition upgrade profile, activates volume-licensed Windows Enterprise; reaching IoT Enterprise needs OEM-licensed hardware or a confirmed qualifying-OS upgrade path), procure OEM-licensed IoT Enterprise hardware, or take the multi-app branch worked here—see the licensing standard in Step 4

## Source extract 1 — Windows IoT Enterprise licensing page (`160-src-licensing.html`, fetched 2026-09-14, `ms.date` 2026-06-24)

> **Volume Licensing** — A volume license is available for end-customers to upgrade existing systems with a qualifying operating system to a new version. A volume license is nontransferrable. Volume licenses for Windows IoT Enterprise LTSC are available through the following Volume License programs: [Open Value / Enterprise Agreement links]...

> **OEM Licensing** — An OEM license is required for device makers that preinstall the operating system on new devices for sale to an end-customer. OEMs can also obtain upgrade licenses for existing devices, originally produced with a previous version of the operating system, and offer full solution upgrades to the end-customer. An OEM License must be transferred to an end-customer purchasing a new device from the OEM.

## Source extract 2 — AssignedAccess CSP reference page (`160-src-assignedaccess-csp.html`, fetched 2026-09-14, `ms.date` 2025-03-12)

> **Note** — Configuring Shell Launcher using the ShellLauncher node automatically enables the Shell Launcher feature, if it is available within the SKU. Shell Launcher as a feature and the ShellLauncher node both require Windows Enterprise or Windows Education to function. The ShellLauncher node is not supported in Windows 10 Pro.
