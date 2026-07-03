# convert.ps1
# Canonical pandoc invocation wrapper for the Phase 113 MD→.docx pipeline.
# Pandoc 3.7.0.2 is PINNED. Do not change the version without also regenerating
# scripts/pipeline/reference.docx and re-running the guard self-test.
#
# Usage:
#   .\scripts\pipeline\convert.ps1 -InputMd docs\l1-runbooks\01-device-not-registered.md `
#                                   -OutputDocx .pipeline-output\01-device-not-registered.docx
#
# After conversion, run the guard:
#   node scripts/pipeline/guard-docx.mjs <OutputDocx>

[CmdletBinding()]
param(
    [Parameter(Mandatory)][string]$InputMd,
    [Parameter(Mandatory)][string]$OutputDocx,
    [string]$ReferenceDoc = 'scripts/pipeline/reference.docx'
)

# ─── Resolve pandoc binary ────────────────────────────────────────────────────
# Try bare 'pandoc' on PATH first; fall back to user-scope LOCALAPPDATA install.
$pandocBin = $null

$onPath = Get-Command pandoc -ErrorAction SilentlyContinue
if ($onPath) {
    $pandocBin = 'pandoc'
} elseif (Test-Path "$env:LOCALAPPDATA\Pandoc\pandoc.exe") {
    $pandocBin = "$env:LOCALAPPDATA\Pandoc\pandoc.exe"
} else {
    Write-Error "pandoc not found on PATH or at '$env:LOCALAPPDATA\Pandoc\pandoc.exe'. Install pandoc 3.7.0.2 from https://github.com/jgm/pandoc/releases/tag/3.7.0.2"
    exit 1
}

# ─── Version guard (T-113-01) ─────────────────────────────────────────────────
# Hard-assert the pinned version. An unpinned pandoc can silently drift styleIds
# in the output .docx, corrupting heading styles across the entire corpus.
$expectedVer = '3.7.0.2'
$verOutput = & $pandocBin --version 2>&1 | Select-Object -First 1
# Match 'pandoc 3.7.0.2' (POSIX) or 'pandoc.exe 3.7.0.2' (Windows binary banner)
$verMatch = [regex]::Match($verOutput, '^pandoc(?:\.exe)?\s+(\S+)')
if (-not $verMatch.Success) {
    Write-Error "Could not parse pandoc version from: $verOutput"
    exit 1
}
$ver = $verMatch.Groups[1].Value
if ($ver -ne $expectedVer) {
    Write-Error "pandoc version mismatch: expected $expectedVer, got $ver. Install the pinned version from https://github.com/jgm/pandoc/releases/tag/3.7.0.2"
    exit 1
}
Write-Host "pandoc $ver (pinned 3.7.0.2) -- version guard PASS" -ForegroundColor Green

# ─── Validate inputs ──────────────────────────────────────────────────────────
if (-not (Test-Path $InputMd)) {
    Write-Error "Input file not found: $InputMd"
    exit 1
}
if (-not (Test-Path $ReferenceDoc)) {
    Write-Error "Reference doc not found: $ReferenceDoc (run from repo root or pass -ReferenceDoc)"
    exit 1
}

# Ensure output directory exists
$outputDir = Split-Path $OutputDocx -Parent
if ($outputDir -and -not (Test-Path $outputDir)) {
    Write-Host "Creating output directory: $outputDir" -ForegroundColor Cyan
    New-Item -ItemType Directory -Path $outputDir -Force | Out-Null
}

# ─── Canonical conversion (SC1) ───────────────────────────────────────────────
# This is the SINGLE SOURCE OF TRUTH for the invocation. No other flags.
# --standalone is auto-applied for docx output: YAML frontmatter goes into Word
# document properties, not body text. Do not add extra flags to this invocation.
Write-Host "Converting $InputMd -> $OutputDocx ..." -ForegroundColor Cyan
& $pandocBin $InputMd -o $OutputDocx "--reference-doc=$ReferenceDoc"

if ($LASTEXITCODE -ne 0) {
    Write-Error "pandoc conversion failed (exit $LASTEXITCODE)"
    exit 1
}

Write-Host "Conversion complete." -ForegroundColor Green
Write-Host "Run guard: node scripts/pipeline/guard-docx.mjs $OutputDocx" -ForegroundColor Green
