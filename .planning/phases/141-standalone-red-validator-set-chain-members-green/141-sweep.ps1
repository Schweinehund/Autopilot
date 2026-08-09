<#
.SYNOPSIS
  Phase 141 Plan 05 -- RED-03 dual-form evidence sweep, form (a): eight ascending
  quiesced BARE invocations of the standalone-RED validator set (D-20a).

.DESCRIPTION
  One-shot phase evidence tooling -- NOT a durable script (per plan prohibition,
  this file lives in the phase directory, not scripts/, and is off the CARVE
  allowlist by design; it is never referenced by any validator or CI workflow).

  Runs check-phase-{48,60,61,62,63,64,65,66}.mjs strictly serially, one process
  at a time, in ascending order, with CHECK_PHASE_NESTED explicitly cleared for
  each child (never relying on it being merely absent from the parent). Before
  and after the sweep it asserts the count of running validator processes by
  filtering CommandLine on the validator script name pattern -- NOT a bare
  node.exe count, which is unexecutable on this machine (permanent MCP-server
  node residents) and unexecutable on a Linux CI runner.

  Emits one machine-readable JSON record plus a human-readable transcript so
  141-EVIDENCE.md can quote both without re-deriving them.

.PARAMETER CacheState
  Operator-declared cache state for this run: 'cold' or 'warm'. The script
  does not infer this -- D-22 requires the operator to state it.

.PARAMETER OutFile
  Path to write the JSON record. Defaults to 141-sweep-result.json next to
  this script.

.EXAMPLE
  powershell -File .planning/phases/141-standalone-red-validator-set-chain-members-green/141-sweep.ps1 -CacheState warm
#>
param(
  [Parameter(Mandatory = $true)]
  [ValidateSet('cold', 'warm')]
  [string]$CacheState,

  [string]$OutFile
)

$ErrorActionPreference = 'Stop'

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
if ([string]::IsNullOrEmpty($OutFile)) {
  $OutFile = Join-Path $ScriptDir '141-sweep-result.json'
}

# Ascending order is load-bearing (D-20a): a failure at 48 surfaces in under a
# second instead of eleven minutes deep inside 66's chain replay, and it
# prevents a downstream member's own CHAIN guard from being the first place a
# predecessor's failure is seen.
$members = @(48, 60, 61, 62, 63, 64, 65, 66)

# Known clean warm costs (ms), ascending, per 141-CONTEXT.md D-32 / 141-04-SUMMARY.md.
# Anomaly rule (plan Task 2): if a member's wall clock exceeds 2x its listed
# figure, record it as an anomaly rather than silently accepting it. This is
# NOT a new pass/fail threshold (D-19 prohibition) -- it only annotates the
# record; it never affects exit code or PASS/FAIL classification.
$knownWarmMs = @{
  48 = 500; 60 = 10000; 61 = 22000; 62 = 43000
  63 = 84000; 64 = 171000; 65 = 335000; 66 = 665000
}

function Get-ValidatorProcessCount {
  # Filter on command lines matching the validator script name pattern rather
  # than a bare node-process count -- this machine carries ~8 permanent
  # non-validator node residents (MCP servers), and Get-Process node -eq 0 is
  # unsatisfiable here and unexecutable on ubuntu-latest (D-23).
  $procs = Get-CimInstance Win32_Process -Filter "Name='node.exe'" |
    Where-Object { $_.CommandLine -like '*check-phase-*.mjs*' }
  return @($procs)
}

function Assert-Quiesced([string]$when) {
  $procs = Get-ValidatorProcessCount
  $count = $procs.Count
  if ($count -ne 0) {
    $lines = $procs | ForEach-Object { "  PID $($_.ProcessId): $($_.CommandLine)" }
    $joined = $lines -join "`n"
    Write-Error "FATAL: $count validator process(es) still running ($when) -- refusing to proceed.`n$joined"
    exit 1
  }
  return $count
}

Write-Host "=== Phase 141-05 RED-03 sweep (form a) ==="
Write-Host "Declared cache state: $CacheState"

$preCount = Assert-Quiesced 'pre-sweep'
Write-Host "Pre-sweep validator process count: $preCount (asserted zero)"

$results = @()
$sweepStart = Get-Date

foreach ($n in $members) {
  $scriptPath = "scripts/validation/check-phase-$n.mjs"
  Write-Host "--- Running $scriptPath (cache=$CacheState) ---"

  # Explicitly clear the nesting variable for THIS child process rather than
  # relying on it being unset in the parent (plan Task 2 requirement).
  $env:CHECK_PHASE_NESTED = $null
  Remove-Item Env:\CHECK_PHASE_NESTED -ErrorAction SilentlyContinue

  $t0 = Get-Date
  $stdout = & node $scriptPath 2>&1 | Out-String
  $exitCode = $LASTEXITCODE
  $t1 = Get-Date
  $wallMs = [math]::Round(($t1 - $t0).TotalMilliseconds)

  $tallyLine = ($stdout -split "`n" | Where-Object { $_ -match '^Result:' } | Select-Object -Last 1)
  if ($tallyLine) { $tallyLine = $tallyLine.Trim() }

  $passN = 0; $failN = 0; $skipN = 0
  if ($tallyLine -match '(\d+)\s+PASS,\s+(\d+)\s+FAIL,\s+(\d+)\s+SKIPPED') {
    $passN = [int]$Matches[1]; $failN = [int]$Matches[2]; $skipN = [int]$Matches[3]
  }

  $expected = $knownWarmMs[$n]
  $anomaly = $false
  if ($CacheState -eq 'warm' -and $wallMs -gt (2 * $expected)) { $anomaly = $true }

  $row = [ordered]@{
    member       = $n
    script       = $scriptPath
    exitCode     = $exitCode
    wallClockMs  = $wallMs
    pass         = $passN
    fail         = $failN
    skipped      = $skipN
    tallyLine    = $tallyLine
    cacheState   = $CacheState
    expectedWarmMs = $expected
    anomaly      = $anomaly
  }
  $results += [pscustomobject]$row

  $status = if ($exitCode -eq 0 -and $failN -eq 0 -and $passN -gt 0) { 'OK' } else { 'PROBLEM' }
  Write-Host ("  exit={0} wall={1}ms tally=[{2}] status={3}{4}" -f $exitCode, $wallMs, $tallyLine, $status, $(if ($anomaly) { ' ANOMALY(>2x expected)' } else { '' }))

  if ($status -eq 'PROBLEM') {
    Write-Host "STOPPING sweep -- member $n did not meet the zero-FAIL / non-zero-PASS / exit-0 bar."
    break
  }
}

$sweepEnd = Get-Date
$totalMs = [math]::Round(($sweepEnd - $sweepStart).TotalMilliseconds)

$postCount = Assert-Quiesced 'post-sweep'
Write-Host "Post-sweep validator process count: $postCount (asserted zero)"

$record = [ordered]@{
  cacheStateDeclared = $CacheState
  preSweepProcessCount = $preCount
  postSweepProcessCount = $postCount
  serialExecution = $true
  ascendingOrder = $members
  totalWallClockMs = $totalMs
  results = $results
}

$record | ConvertTo-Json -Depth 6 | Out-File -FilePath $OutFile -Encoding utf8
Write-Host "=== Sweep complete. Total: ${totalMs}ms. Record written to $OutFile ==="
