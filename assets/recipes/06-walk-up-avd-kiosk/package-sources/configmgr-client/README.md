# ConfigMgr Client (CMG / Entra auth) - Kiosk Win32 package

Purpose: inventory/reporting/collection integration for internet-only Entra-joined kiosks via CMG.
NOTE: ConfigMgr Remote Control does NOT work over CMG - that is not what this package is for.

## Assemble
1. Copy ccmsetup.exe from \\<siteserver>\SMS_<site>\Client\ccmsetup.exe into this folder (ONLY the exe).
2. Fill the five values at the top of Install-ConfigMgrClient.ps1:
   - CmgPath: confirmed CCM_Proxy_MutualAuth string (ClientLocation.log / young-client method)
   - SiteCode: console > Administration > Site Configuration > Sites
   - AAD values: console > Administration > Cloud Services > Azure Services > Cloud Management > Applications
     (Native app -> Application ID = AADCLIENTAPPID; Web/server app -> App ID URI = AADRESOURCEURI)
3. Sign the scripts (Key Vault workflow). Wrap:
   IntuneWinAppUtil.exe -c . -s Install-ConfigMgrClient.ps1 -o .\out

## Intune Win32 app
Install:    powershell.exe -ExecutionPolicy Bypass -File Install-ConfigMgrClient.ps1
Uninstall:  powershell.exe -ExecutionPolicy Bypass -File Uninstall-ConfigMgrClient.ps1
Behavior:   System | Restart: no specific action | Req: x64, Win11 22H2+
Detection:  custom script Detect-ConfigMgrClient.ps1 (32-bit: No; signature check per signing)
Returns:    defaults + 70001 Failed (missing exe) + 70002 Failed (no result in log)
Assign:     REQUIRED -> kiosk device group ONLY. NOT an ESP-blocking app (additive management,
            not a provisioning dependency - keep it out of the first-boot critical path).

## Before first assignment (gating checks - see runbook)
- Co-management workloads: kiosks must land with Device Configuration / Compliance / Client Apps
  authority on INTUNE (check global workloads + staging collections).
- Custom ConfigMgr Client Settings for a kiosk collection: Remote Tools disabled, notifications off.
- CMG cert chain must be publicly trusted or the issuing root pushed to kiosks via Intune first.

## Validate on pilot kiosk (all remote)
- ccmsetup.log via the triage/collect tooling: "CcmSetup is exiting with return code 0"
- CcmMessaging.log: successful token auth to CMG
- Console: device appears as internet client; hardware inventory on next cycle
- v6 sensor + one reboot: watch for SCNotification.exe in the kiosk session (allowlist or suppress
  via client settings if it surfaces - known follow-up, not a mystery)
