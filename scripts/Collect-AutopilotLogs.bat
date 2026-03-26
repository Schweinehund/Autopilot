@echo off
set LOGPATH=D:\Autopilot_Logs
mkdir %LOGPATH%

echo Collecting MDM Diagnostics...
mdmdiagnosticstool.exe -out %LOGPATH%\MDMDiag.html
mdmdiagnosticstool.exe -area "Autopilot;DeviceEnrollment;DeviceProvisioning" -zip %LOGPATH%\mdmdiag.zip

echo Exporting Event Logs...
wevtutil epl Microsoft-Windows-DeviceManagement-Enterprise-Diagnostics-Provider/Admin %LOGPATH%\MDM-Admin.evtx
wevtutil epl Microsoft-Windows-Provisioning-Diagnostics-Provider/Admin %LOGPATH%\Provisioning-Admin.evtx
wevtutil epl Microsoft-Windows-AAD/Operational %LOGPATH%\AAD-Operational.evtx
wevtutil epl Microsoft-Windows-User Device Registration/Admin %LOGPATH%\DeviceRegistration.evtx
wevtutil epl Application %LOGPATH%\Application.evtx
wevtutil epl System %LOGPATH%\System.evtx

echo Collecting system info...
systeminfo > %LOGPATH%\SystemInfo.txt
ipconfig /all > %LOGPATH%\NetworkConfig.txt
route print > %LOGPATH%\RouteTable.txt

echo Checking TPM...
powershell -Command "Get-Tpm | Out-File -FilePath %LOGPATH%\TPMStatus.txt"

echo Checking Autopilot registry...
reg export "HKLM\SOFTWARE\Microsoft\Provisioning" %LOGPATH%\AutopilotRegistry.reg /y

echo Logs collected at %LOGPATH%
echo Copy this folder to a USB drive or network share for analysis
pause
