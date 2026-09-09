<# Intune detection: CcmExec service running AND client version present. #>
$svc = Get-Service -Name CcmExec -ErrorAction SilentlyContinue
$ver = (Get-ItemProperty 'HKLM:\SOFTWARE\Microsoft\SMS\Mobile Client' -ErrorAction SilentlyContinue).ProductVersion
if ($svc -and $svc.Status -eq 'Running' -and $ver) { Write-Output "CM client $ver"; exit 0 }
exit 1
