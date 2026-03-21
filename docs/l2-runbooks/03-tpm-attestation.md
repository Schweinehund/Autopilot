---
last_verified: 2026-03-21
review_by: 2026-06-19
applies_to: APv1
audience: L2
---

> **Version gate:** This guide applies to Windows Autopilot (classic).
> For Autopilot Device Preparation, see [APv1 vs APv2 disambiguation](../apv1-vs-apv2.md).

# TPM Attestation Failure Investigation

## Context

[TPM](../_glossary.md#tpm) attestation failures occur during [pre-provisioning](../_glossary.md#pre-provisioning) and [self-deploying mode](../_glossary.md#self-deploying-mode) where device identity is verified via TPM before provisioning can proceed. These are the most hardware-dependent Autopilot failures — every branch requires identifying the specific TPM chipset and error code before a resolution path becomes clear. [OOBE](../_glossary.md#oobe)-stage failures with codes in the 0x80070xxx, 0x80190xxx, or 0x8103xxxx ranges are the typical presentation.

Because TPM attestation depends on chipset firmware, L2 investigation identifies the chipset and error code, then routes to the appropriate OEM for firmware updates. L2 does not perform the firmware update — that is the vendor boundary (see Escalation Ceiling).

## Triage

**From L1 escalation ([TPE1](../decision-trees/03-tpm-attestation.md), [TPE2](../decision-trees/03-tpm-attestation.md), [TPE3](../decision-trees/03-tpm-attestation.md), [TPE4](../decision-trees/03-tpm-attestation.md), or [TPE5](../decision-trees/03-tpm-attestation.md))?**
L1 collected: serial, device make and model, BIOS version, TPM manufacturer, deployment mode (pre-provisioning or self-deploying), timestamp, error code (if any), screenshot.
Skip to Step 2.

**Starting fresh?** Begin at Step 1.

## Investigation

### Step 1: Collect diagnostic package

Follow the [Log Collection Guide](01-log-collection.md) to gather the MDM diagnostic package and event logs before proceeding. Logs must be collected before any remediation steps alter device state.

### Step 2: Check TPM status

Run the following on the affected device. All five values must be `True` for TPM attestation to succeed.

```powershell
$tpm = Get-TPMStatus
$tpm | Format-List
# Key values: TpmPresent, TpmReady, TpmEnabled, TpmActivated, TpmOwned
```

See [Get-TPMStatus](../reference/powershell-ref.md#get-tpmstatus) for return value definitions.

If `TpmPresent` is `False`, the device has no hardware TPM — it cannot be used with pre-provisioning or self-deploying mode. If `TpmReady` is `False` with other values `True`, proceed to manufacturer identification before attempting remediation.

### Step 3: Identify TPM manufacturer and version

Run the following to identify the chipset. The `ManufacturerId` value determines which hardware-specific resolution scenario applies.

```powershell
Get-CimInstance -Namespace "root\cimv2\security\microsofttpm" -ClassName Win32_Tpm |
    Select-Object IsEnabled_InitialValue, IsActivated_InitialValue, ManufacturerId, ManufacturerVersion, SpecVersion
```

**ManufacturerId mapping:**

| ManufacturerId | Manufacturer | Resolution Scenario |
|----------------|--------------|---------------------|
| `1398033696` (`NTC `) | Nuvoton | Scenario C |
| `1112687437` (`STM `) | ST Micro | Scenario B |
| `1229346816` (`IFX `) or `1229870147` (`IFXQ`) | Infineon | Scenario D |
| `1096043852` (`AMD `) | AMD fTPM | Scenario A |
| `1229870163` (`INTL`) | Intel | Scenario E |

Note `SpecVersion` — a value starting with `1.2` rather than `2.0` means the device is running TPM 1.2 firmware (see Scenario G).

### Step 4: Check Autopilot registration state

Verify the device has a valid Autopilot registration before concluding the failure is a pure TPM hardware issue. A missing or corrupt registration state can manifest as TPM errors.

```powershell
Get-ItemProperty "HKLM:\SOFTWARE\Microsoft\Provisioning\Diagnostics\Autopilot" -ErrorAction SilentlyContinue
```

If this key is absent, the device is not registered. Re-registration must be completed before TPM attestation can succeed. See [Registry Paths](../reference/registry-paths.md) for the full set of Autopilot registry locations.

### Step 5: Cross-reference error code

If an error code was captured during the failure, look up the code in [TPM Attestation Error Codes](../error-codes/02-tpm-attestation.md). Do not reproduce the error code table here — the error codes file is the source of truth and includes hardware-specific notes per chipset.

Key codes and their expected scenario:

| Error Code | Expected Scenario |
|------------|-------------------|
| 0x80070490 | Scenario A (AMD fTPM) |
| 0x800705b4 | Scenario G (TPM 1.2) or Scenario H (retry limit) |
| 0x80190190 | Identify chipset via Step 3, then apply matching scenario |
| 0x801c03ea | Scenario G (TPM firmware version mismatch) |
| 0x81039001 | Scenario H (retry limit exceeded) |
| 0x81039024 | Scenarios B, C, or D (known vulnerability in ST Micro, Nuvoton, or Infineon) |

## Resolution

### Scenario A: AMD fTPM (0x80070490)

Investigation confirms AMD fTPM via `ManufacturerId`. The AMD ASP firmware-based TPM fails attestation on affected platforms; the fix is a firmware update from the OEM.

**Action:** Contact OEM support and reference the AMD fTPM attestation failure. Request the specific BIOS/firmware update version that resolves the AMD ASP fTPM attestation issue. Escalate per Escalation Ceiling below — this is a firmware update and is outside L2 scope.

### Scenario B: ST Micro RSA cert expiry

Investigation confirms ST Micro chipset via `ManufacturerId`. The ST Micro RSA certificate expired December 2024; affected devices fail TPM attestation in pre-provisioning and self-deploying mode.

**Action:** Contact OEM support for the ST Micro firmware update. For Lenovo devices, Lenovo has released the fix — contact Lenovo support directly. For other OEMs, reference the ST Micro RSA-3072 attestation failure. Escalate per Escalation Ceiling.

### Scenario C: Nuvoton RSA-3072 key length

Investigation confirms Nuvoton chipset via `ManufacturerId`. The latest Nuvoton models supporting RSA-3072bit keys fail TPM attestation in pre-provisioning and self-deploying mode.

**Action:** Contact OEM support for a firmware update that corrects the RSA-3072 key length handling. For Lenovo devices, the fix is available — contact Lenovo support. For other OEMs, reference the Nuvoton RSA-3072 attestation failure. Escalate per Escalation Ceiling.

### Scenario D: Infineon SLB9670 / SLB9672

Investigation confirms Infineon chipset via `ManufacturerId`. Infineon SLB9672 modules running firmware 15.22 have an EK (Endorsement Key) certificate issue that causes attestation timeout.

**Action:** Check the exact firmware version from `ManufacturerVersion`. If running Infineon firmware 15.22, contact the OEM for the firmware update resolving the EK certificate issue. Reference the Infineon SLB9672 attestation failure documented June 2023. Escalate per Escalation Ceiling.

### Scenario E: Intel Tiger Lake platform

Investigation identifies Intel Tiger Lake platform via `ManufacturerId` combined with device model information (Tiger Lake = 11th Gen Intel Core, 2020–2021 platforms).

**Action:** Verify Windows build. Tiger Lake requires KB5007253 (November 2021) or a later cumulative update for TPM attestation to succeed on Windows 10 21H2. Apply the required update. If update alone does not resolve the issue, contact OEM for platform firmware update. Escalate per Escalation Ceiling if firmware update is needed.

### Scenario F: TPM clear and retry (generic — non-hardware-specific)

Use this scenario when no hardware-specific chipset issue is identified and the TPM is in a bad ownership state. Applicable when `TpmOwned` is `True` but `TpmReady` is `False`, or after a failed provisioning attempt left partial TPM state.

> **Warning:** This function clears TPM ownership. The device will reboot. Confirm with the user or technician before executing.

```powershell
# Dry run first — confirm what will happen
Reset-TPMForAutopilot -WhatIf

# Execute after confirming — device WILL reboot
Reset-TPMForAutopilot
```

After reboot, retry provisioning. See [Reset-TPMForAutopilot](../reference/powershell-ref.md#reset-tpmforautopilot) for full function documentation.

### Scenario G: TPM version 1.2 (TPE2)

`SpecVersion` shows `1.2`, or error code is 0x801c03ea with no hardware-specific chipset issue. The device TPM is running 1.2 firmware mode — not supported for pre-provisioning or self-deploying mode.

**Action:** Determine if the device has a firmware upgrade path from TPM 1.2 to TPM 2.0 (some OEMs provide this via BIOS update). If no upgrade path exists, the device cannot be used with pre-provisioning or self-deploying mode. Contact OEM for BIOS update options. Escalate per Escalation Ceiling.

### Scenario H: Retry limit exceeded (0x81039001)

Error code 0x81039001 indicates an intermittent TPM attestation retry limit failure. This is not a hardware defect — it is typically a transient service-side issue.

**Action:** Retry provisioning. Allow 15 minutes between attempts. Maximum 2 retry attempts before escalating. If persistent across multiple sessions, investigate network connectivity to TPM attestation endpoints, then escalate.

## Escalation Ceiling

Escalate when a firmware update is needed. L2 identifies the chipset and error code; the OEM or vendor handles the firmware update. This is the explicit boundary between Desktop Engineering (L2) and vendor support.

**Escalate when:**
- Chipset identified as AMD fTPM, ST Micro, Nuvoton, Infineon, or Intel and firmware update is the required fix
- TPM 1.2 device has no firmware upgrade path
- Three retry attempts fail for 0x81039001 (possible service-side issue — open a Microsoft support case)

**Collect before escalating:** serial number, device make and model, BIOS version, `ManufacturerId` value, `ManufacturerVersion` value, `SpecVersion`, error code, deployment mode, timestamp, screenshot of failure screen, log package from Step 1.

## Tool References

- [Get-TPMStatus](../reference/powershell-ref.md#get-tpmstatus) — TPM readiness check; returns TpmPresent, TpmReady, TpmEnabled, TpmActivated, TpmOwned
- [Reset-TPMForAutopilot](../reference/powershell-ref.md#reset-tpmforautopilot) — TPM clearing for re-attestation (requires reboot; use -WhatIf first)
- [Get-AutopilotDeviceStatus](../reference/powershell-ref.md#get-autopilotdevicestatus) — comprehensive device state snapshot including TPM status
- [Registry Paths](../reference/registry-paths.md) — Autopilot registration state paths
- [TPM Attestation Error Codes](../error-codes/02-tpm-attestation.md) — error code lookup with hardware-specific notes

---

Prev: [02-device-registration.md](02-device-registration.md) | Next: [04-hybrid-join.md](04-hybrid-join.md)

## Version History

| Date | Change |
|------|--------|
| 2026-03-21 | Initial creation |
