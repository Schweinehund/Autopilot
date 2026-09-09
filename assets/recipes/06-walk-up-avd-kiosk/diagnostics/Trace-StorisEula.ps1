<#
.SYNOPSIS
    Locates where STORIS SCiX persists EULA acceptance by snapshotting per-user state across phases.

.DESCRIPTION
    Run as the SAME standard user that will launch SCiX (a fresh local test account is ideal).
      .\Trace-StorisEula.ps1 -Phase pre        # before first launch (after wrapper/config seeding if you want to mirror the kiosk)
      <launch SCiX, wait until the EULA dialog is on screen, do NOT click>
      .\Trace-StorisEula.ps1 -Phase shown      # isolates first-launch writes from the accept itself
      <click Accept, get to the login screen, close the app>
      .\Trace-StorisEula.ps1 -Phase post
      .\Trace-StorisEula.ps1 -Diff             # prints what changed shown->post (the accept) and pre->shown (first run)

    Covers the places a .NET Framework / ClickOnce app can write per-user state:
      %APPDATA%\Storis, %LOCALAPPDATA%\Storis*, ClickOnce data dir (%LOCALAPPDATA%\Apps\2.0\Data),
      .NET user.config locations, IsolatedStorage, and HKCU\Software (full - the app may not use a Storis key).
    Output: %USERPROFILE%\StorisEulaTrace\<phase>-files.csv / <phase>-reg.csv

.NOTES
    If the diff shows nothing under HKCU or the profile, acceptance is being recorded server-side against
    the STORIS user ID, not the Windows profile - see notes in chat.
#>
[CmdletBinding()]
param(
    [ValidateSet('pre','shown','post')][string]$Phase,
    [switch]$Diff
)
$ErrorActionPreference = 'Continue'
$out = Join-Path $env:USERPROFILE 'StorisEulaTrace'
New-Item -Path $out -ItemType Directory -Force | Out-Null

$fileRoots = @(
    "$env:APPDATA\Storis",
    "$env:LOCALAPPDATA\Storis",
    "$env:LOCALAPPDATA\Storis_Inc",
    "$env:LOCALAPPDATA\Storis,_Inc.",
    "$env:LOCALAPPDATA\Apps\2.0\Data",
    "$env:LOCALAPPDATA\IsolatedStorage",
    "$env:APPDATA\IsolatedStorage",
    "$env:LOCALAPPDATA\Microsoft\Windows\Start Menu\Programs",
    "$env:APPDATA\Microsoft\Windows\Start Menu\Programs"
)

function Get-FileSnapshot {
    foreach ($root in $fileRoots) {
        if (-not (Test-Path -LiteralPath $root)) { continue }
        Get-ChildItem -LiteralPath $root -Recurse -File -Force -ErrorAction SilentlyContinue | ForEach-Object {
            $hash = try { (Get-FileHash -LiteralPath $_.FullName -Algorithm SHA256 -ErrorAction Stop).Hash } catch { 'UNREADABLE' }
            [pscustomobject]@{ Path = $_.FullName; Size = $_.Length; Modified = $_.LastWriteTimeUtc.ToString('o'); Hash = $hash }
        }
    }
}

function Get-RegSnapshot {
    # Whole HKCU\Software - a "Storis" key is the likely home but not guaranteed. Skips volatile noise.
    $skip = '^HKEY_CURRENT_USER\\Software\\(Microsoft\\Windows\\CurrentVersion\\(Explorer|CloudStore|UFH)|Classes\\Local Settings)'
    Get-ChildItem -Path 'HKCU:\Software' -Recurse -ErrorAction SilentlyContinue | Where-Object { $_.Name -notmatch $skip } | ForEach-Object {
        $k = $_
        foreach ($vn in $k.GetValueNames()) {
            $v = $k.GetValue($vn)
            if ($v -is [byte[]]) { $v = [BitConverter]::ToString($v) }
            [pscustomobject]@{ Key = $k.Name; Name = $vn; Value = "$v" }
        }
    }
}

if ($Phase) {
    Get-FileSnapshot | Export-Csv -Path (Join-Path $out "$Phase-files.csv") -NoTypeInformation -Encoding UTF8
    Get-RegSnapshot  | Export-Csv -Path (Join-Path $out "$Phase-reg.csv")   -NoTypeInformation -Encoding UTF8
    Write-Host "Snapshot '$Phase' written to $out"
}

if ($Diff) {
    function Show-Diff($a, $b, $kind) {
        $fa = Join-Path $out "$a-$kind.csv"; $fb = Join-Path $out "$b-$kind.csv"
        if (-not (Test-Path $fa) -or -not (Test-Path $fb)) { Write-Host "Skipping $a->$b ($kind): missing snapshot"; return }
        $A = Import-Csv $fa; $B = Import-Csv $fb
        if ($kind -eq 'files') {
            $keyA = @{}; $A | ForEach-Object { $keyA[$_.Path] = $_ }
            Write-Host "`n=== $kind changed/added $a -> $b ===" -ForegroundColor Cyan
            $B | Where-Object { -not $keyA.ContainsKey($_.Path) -or $keyA[$_.Path].Hash -ne $_.Hash } |
                Select-Object @{n='Change';e={ if ($keyA.ContainsKey($_.Path)) {'MODIFIED'} else {'ADDED'} }}, Path, Size | Format-Table -AutoSize
        } else {
            $keyA = @{}; $A | ForEach-Object { $keyA["$($_.Key)|$($_.Name)"] = $_.Value }
            Write-Host "`n=== $kind changed/added $a -> $b ===" -ForegroundColor Cyan
            $B | Where-Object { $id = "$($_.Key)|$($_.Name)"; -not $keyA.ContainsKey($id) -or $keyA[$id] -ne $_.Value } |
                Select-Object @{n='Change';e={ if ($keyA.ContainsKey("$($_.Key)|$($_.Name)")) {'MODIFIED'} else {'ADDED'} }}, Key, Name, Value | Format-Table -AutoSize -Wrap
        }
    }
    Show-Diff 'shown' 'post' 'files'
    Show-Diff 'shown' 'post' 'reg'
    Show-Diff 'pre'   'shown' 'files'
    Show-Diff 'pre'   'shown' 'reg'
}
