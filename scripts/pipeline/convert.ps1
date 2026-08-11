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

# PowerShell 7+ required: the PIPE-03 preprocessing writes the temp copy with
# `Set-Content -Encoding utf8NoBOM`, a token introduced in PowerShell 6.0. Under
# Windows PowerShell 5.1 that parameter throws, which would otherwise leave the
# temp file un-rewritten and silently no-op the nav-footer fix. Fail loudly instead.
#Requires -Version 7.0

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

# ─── PIPE-03: Nav-footer YAML-alias preprocessing (D-01/D-03) ────────────────
# Fixes DEFER-119-C (pandoc exit-64 "Unknown alias 'Previous'/'Next'") for the
# `*Previous:`/`*Next step:` `---`...`---` nav-footer bracket shape. Operates on
# an EPHEMERAL TEMP COPY only -- $InputMd on disk is NEVER mutated (D-01). Only
# a standalone, blank-preceded `---` immediately followed (skipping blank lines)
# by a line matching the anchor `^\s*\*(Previous|Next step)\b` is rewritten to
# `* * *` on the temp copy. D-03(a): fenced code (``` / ~~~) is tracked and never
# rewritten inside. D-03(b): a fail-closed guard aborts (non-zero exit) if the
# temp copy differs from the source in any way other than an anchor-matched
# `---` -> `* * *` rewrite.
$rawTempFile = [System.IO.Path]::GetTempFileName()   # this call creates the orphan on disk
$tempMd = $rawTempFile -replace '\.tmp$', '.md'
Remove-Item -LiteralPath $rawTempFile -Force -ErrorAction SilentlyContinue  # clean it up immediately

# WR-06: wrap the ephemeral $tempMd copy's entire lifetime (creation through pandoc
# invocation) in try/finally so it is cleaned up unconditionally -- same bug class as
# the neighboring $rawTempFile leak fixed above. Under the default
# $ErrorActionPreference = 'Continue' most cmdlet failures in this range won't actually
# terminate the script, but any genuinely terminating error (a .NET exception, or a
# future edit adding -ErrorAction Stop) would otherwise skip both of the old inline
# Remove-Item call sites and leak the temp .md copy across all 221 sequential calls.
try {
    Copy-Item -Path $InputMd -Destination $tempMd -Force

    $lines = Get-Content -LiteralPath $tempMd -Encoding utf8
    $inFence = $false
    $fenceChar = $null
    $rewriteCount = 0

    for ($i = 0; $i -lt $lines.Count; $i++) {
        $line = $lines[$i]

        # D-03(a): track ```/~~~ fenced-code state; never rewrite inside a fence
        # LINK-05 (Phase 143, D-16/D-17): the 15th fence-mask site -- a TIGHTENING, not a
        # widening. '^\s*' matched 4+-space/tab indents and Unicode-separator whitespace;
        # '^ {0,3}' narrows to the CommonMark indented-fence bound (0 live instances of any
        # wider form existed pre-edit, so behaviour is unchanged on the current corpus).
        if ($line -match '^ {0,3}(```|~~~)') {
            if (-not $inFence) { $inFence = $true; $fenceChar = $Matches[1] }
            elseif ($line.TrimStart().StartsWith($fenceChar)) { $inFence = $false }
            continue
        }
        if ($inFence) { continue }

        # Standalone "---" line, blank-preceded
        if ($line -match '^---\s*$' -and $i -gt 0 -and $lines[$i-1].Trim() -eq '') {
            # Peek forward past blank lines for the anchor
            $j = $i + 1
            while ($j -lt $lines.Count -and $lines[$j].Trim() -eq '') { $j++ }
            if ($j -lt $lines.Count -and $lines[$j] -match '^\s*\*(Previous|Next step)\b') {
                $lines[$i] = '* * *'
                $rewriteCount++
            }
        }
    }

    Set-Content -LiteralPath $tempMd -Value $lines -Encoding utf8NoBOM

    # D-03(b): fail-closed guard -- the ONLY diff between source and temp must be
    # the intended --- -> * * * rewrites on anchor-matched lines.
    $origLines = Get-Content -LiteralPath $InputMd -Encoding utf8
    $diffCount = 0
    for ($i = 0; $i -lt [Math]::Max($origLines.Count, $lines.Count); $i++) {
        $o = if ($i -lt $origLines.Count) { $origLines[$i] } else { $null }
        $n = if ($i -lt $lines.Count) { $lines[$i] } else { $null }
        if ($o -ne $n) {
            $diffCount++
            # Assert this diff is an expected rewrite: orig was "---", new is "* * *"
            if (-not ($o -match '^---\s*$' -and $n -eq '* * *')) {
                Write-Error "PIPE-03 guard: unexpected diff at line $($i+1): '$o' -> '$n'. Aborting."
                exit 1
            }
        }
    }
    Write-Host "PIPE-03 preprocessing: $rewriteCount nav-footer rewrite(s), guard PASS" -ForegroundColor Green

    # ─── Canonical conversion (SC1) ───────────────────────────────────────────
    # This is the SINGLE SOURCE OF TRUTH for the invocation. No other flags.
    # --standalone is auto-applied for docx output: YAML frontmatter goes into Word
    # document properties, not body text. Do not add extra flags to this invocation.
    # NOTE: feeds $tempMd (the PIPE-03-preprocessed ephemeral copy), not $InputMd --
    # this is the ONLY change to the invocation; the flag set stays identical.
    Write-Host "Converting $InputMd -> $OutputDocx ..." -ForegroundColor Cyan
    & $pandocBin $tempMd -o $OutputDocx "--reference-doc=$ReferenceDoc"
    $pandocExit = $LASTEXITCODE

    if ($pandocExit -ne 0) {
        Write-Error "pandoc conversion failed (exit $pandocExit)"
        exit 1
    }
} finally {
    Remove-Item -LiteralPath $tempMd -Force -ErrorAction SilentlyContinue
}

Write-Host "Conversion complete." -ForegroundColor Green
Write-Host "Run guard: node scripts/pipeline/guard-docx.mjs $OutputDocx" -ForegroundColor Green
