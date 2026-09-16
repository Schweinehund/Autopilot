# Phase 161: Vendor De-Bloat into the Kiosk Baseline - Pattern Map

**Mapped:** 2026-09-16
**Files analyzed:** 8 (4 execute plans + 4 target source/doc files the plans edit)
**Analogs found:** 8 / 8

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|---|---|---|---|---|
| `.planning/phases/161-.../161-01-PLAN.md` | plan (config) | batch (gate-then-append) | `.planning/phases/160-.../160-01-PLAN.md` | exact |
| `.planning/phases/161-.../161-02-PLAN.md` | plan (config) | file-I/O (vendor + hash) | `160-01-PLAN.md` structure + NOTICE `Post-vendoring correction` idiom | role-match |
| `.planning/phases/161-.../161-03-PLAN.md` | plan (config) | transform (review authoring) | `160-03-PLAN.md` | exact |
| `.planning/phases/161-.../161-04-PLAN.md` | plan (config) | event-driven (checkpoint) + CRUD (doc edits) | `160-02-PLAN.md` Task 1 (checkpoint) | exact |
| `assets/.../KioskBaseline-Invoke-AppDeployToolkit-functions.ps1` | service/installer script | batch (ordered process loop) | itself (pre-edit version) | exact (self-analog, extend loop) |
| `assets/.../kiosk-baseline/README.md` | docs | transform | Baseline README's own existing H2 sections + NOTICE idiom | role-match |
| `assets/recipes/06-walk-up-avd-kiosk/NOTICE` | docs/provenance record | event-driven (append-on-vendor) | NOTICE's own `Post-vendoring correction` block | exact (self-analog) |
| `docs/recipes/06-walk-up-avd-kiosk-autologon.md` (RE-237 Step 8) | docs (STD-05 decision record) | request-response (ruling record) | RE-237 Step 4 (lines 100-116) | exact |

## Pattern Assignments

### `161-01-PLAN.md` (plan, batch)

**Analog:** `.planning/phases/160-licensing-hardware-decision-record/160-01-PLAN.md`

**Frontmatter pattern:**
```yaml
phase: 160-licensing-hardware-decision-record
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - .planning/ROADMAP.md
  - .planning/REQUIREMENTS.md
  - .planning/STATE.md
  - .planning/phases/160-licensing-hardware-decision-record/160-GATE-BASELINE.json
autonomous: true
requirements: []   # D-28: LIC-01 flips at 160-02 and LIC-02 at 160-03; this plan declares none so no
                   # boundary flip can fire before the content lands (159-05-PLAN.md:13 precedent;
                   # requirements.mark-complete runs from frontmatter at EVERY plan boundary)
estimate:
  tokens: 40000
  raw_tokens: 40000
  tasks: 2
```
Copy this shape verbatim for 161-01, substituting the `requirements: []` rationale comment for D-35/O-2 (VND-01 at 161-02, VND-02+VND-03 at 161-04) — 161-CONTEXT.md D-35 and `161-DRAFTS.md` PART H `E-J1` already supply the exact frontmatter and comment text; do not re-derive it.

**Gate-baseline JSON shape** (`160-GATE-BASELINE.json` lines 1-20):
```json
{
  "phase_baseline": {
    "sha": "...", "sha_short": "...", "branch": "master", "measured_at": "...",
    "path_note": "This artifact lives at .planning/phases/<phase>/ for the duration of v1.23; it relocates to .planning/milestones/v1.23-phases/ only at milestone close.",
    "structural_gate": {
      "check-phase-54": { "script": "...", "invocation": "...", "exitCode": 0, "passed": 32, "failed": 0, "skipped": 0, "tallyLine": "Summary: 32 passed, 0 failed, 0 skipped" },
      "c17-eee-contract": { "...": "..." }
    }
  }
}
```
161's baseline adds `pin_residency` and `line_endings` sections per D-39/D-44 (161-CONTEXT.md); use the same four-section shape (`structural_gate`, `style_residual`, `pin_residency`, `line_endings`) 160 established.

**Evidence-file header pattern** (`160-EVIDENCE.md` lines 1-13):
```markdown
# Phase 160 Plan 02 — Evidence Record

## Task 1: Pilot device licensing reading

**Outcome: DECLINED 2026-09-14**

The owner declined to run the two read-only `slmgr.vbs` commands ... Per D-30's decline path,
this is a supported answer, not a failure: the plan continues to completion ...
```
161-EVIDENCE.md uses task-headed sections (`## Task N (161-0M): …`) per D-57 — same idiom, finer-grained heading.

---

### `161-02-PLAN.md` (plan, file-I/O — vendoring)

**Analog:** `160-01-PLAN.md` structure for gate-bracket task shape; NOTICE's own `Post-vendoring correction` block for the append-idiom the NOTICE edits in this plan must follow.

**NOTICE append idiom** (`assets/recipes/06-walk-up-avd-kiosk/NOTICE` lines 295-314):
```text
Post-vendoring correction — Remove-KioskRunTasks.ps1 and Detect-KioskRunTasks.ps1
  (2026-09-03, applied after this NOTICE's initial hashes were recorded).
  These are owner-authored scripts; this is a correctness fix applied by the
  repository during its own phase-155 code review, not an upstream change.
  ...
  Applied identically to both committed copies of Remove-KioskRunTasks.ps1
  ... re-confirmed byte-identical by SHA256 after the edit ... The
  hashes above reflect the corrected bytes.
```
Copy the shape: a dated, column-0 heading line, a one-sentence attribution/nature statement, the substantive body, and a closing sentence stating what the recorded hashes now reflect. `161-DRAFTS.md` PART B (`E-N1`, `E-N2`, `E-N3`, `E-N4`) is the VERBATIM/FACTS+SHAPE text to insert using this same idiom — do not free-write NOTICE prose; use the locked strings.

---

### `161-03-PLAN.md` (plan, transform — review authoring)

**Analog:** `.planning/phases/160-licensing-hardware-decision-record/160-03-PLAN.md`

**Frontmatter + must_haves pattern:**
```yaml
phase: 160-licensing-hardware-decision-record
plan: 03
type: execute
wave: 3
depends_on: ["160-02"]   # not reflexive chaining: both plans write 160-EVIDENCE.md, and a shared
                         # files_modified entry is an implicit dependency ...
files_modified:
  - docs/reference/licensing-matrix.md
  - .planning/phases/160-licensing-hardware-decision-record/160-EVIDENCE.md
autonomous: true
requirements: [LIC-02]
must_haves:
  truths:
    - "`docs/reference/licensing-matrix.md` reflects the 2026-09-10 ruling: ..."
    - "Exactly three edits land, and no more: ..."
```
161-03 mirrors this: `depends_on: ["161-02"]` (shared-file dependency, not reflexive), `requirements: []` per D-35 (161-03 declares none — review/reconciliation content only, no VND flip), `must_haves.truths` naming the exact scope bound (Kiosk-safety review + Pattern-list reconciliation + fetch-paths table, nothing else).

---

### `161-04-PLAN.md` (plan, event-driven checkpoint + CRUD doc edits)

**Analog:** `160-02-PLAN.md` Task 1 (`checkpoint:human-action`, lines 175-216)

**Checkpoint task pattern** (verbatim structural idiom):
```xml
<task type="checkpoint:human-action">
  <name>Task 1: Pilot device licensing reading</name>
  <read_first>
- `.planning/phases/.../160-DRAFTS.md` — the checkpoint task block ..., and the "Decline path" paragraph
explaining why LIC-01 cannot strand (D-30, D-38).
  </read_first>
  <action>Run two read-only commands ... report three values plus today's date. The recording rule is
an allowlist of exactly four items, not an exclusion list applied to a full dump ... If the owner types
`decline`, that is a supported answer: record the single token with its date and continue to completion.</action>
  <instructions>...</instructions>
  <verification>160-EVIDENCE.md carries either a three-value reading with its date, or the single token
DECLINED with its date. Either outcome is a pass and the plan continues to completion.</verification>
  <resume-signal>Paste the three values, or type `decline`</resume-signal>
  <acceptance_criteria>...</acceptance_criteria>
  <done>...</done>
  <reversibility rating="reversible">A read-only measurement. Nothing on the device changes and nothing
is consumed.</reversibility>
</task>
```
161's Task 2 checkpoint (`161-DRAFTS.md` PART F, `E-C1`) is already drafted VERBATIM in this exact shape, but with `rating="costly"` (device-mutating, not read-only) — use `161-DRAFTS.md`'s `E-C1` block byte-exact, do not re-derive from the 160 analog; the analog only establishes the XML skeleton and the "decline is a supported answer, not a failure" phrasing convention.

**Decline-path record convention** (`160-02-SUMMARY.md` key-decisions, quoted verbatim in 161-CONTEXT.md D-31/E-A3/E-A4):
```
"Task 1's pilot device licensing checkpoint was resolved DECLINED by the owner (2026-09-14); P2 was
written without the pilot-measurement sentence per D-30's decline path, and LIC-01 flipped at this
plan's boundary regardless"
```
This exact sentence is the corroboration quote already embedded VERBATIM in `161-DRAFTS.md` E-A3/E-A4 — copy those amendment blocks byte-exact; do not re-quote SUMMARY yourself.

---

### PSADT functions file — `$script:BundledScripts` loop (service, batch)

**Analog:** the file's own pre-edit state (self-analog; this is an in-place extension, not a new pattern)

**Current header + loop** (lines 1-16, 21-29, 40, 46-68):
```powershell
##================================================
## EEE-WIN-Kiosk-Baseline - provisioning-time cleanup for the walk-up kiosk device class
## ...
## ESP-BLOCKING by design: local-only work, seconds to run, no network dependencies.
##
## Files\ must contain (copied from the SAME repo commit as the remediation packages - one source):
##   Remove-KioskOemBloat.ps1     (pattern list vN - lockstep with Detect-KioskOemBloat.ps1)
##   Remove-KioskRunTasks.ps1     (v2+ - launchers, OneDrive root fixes, orphan profiles)
## ...
##================================================

function Install-ADTDeployment
{
    ##================================================
    ## MARK: Pre-Install
    ##================================================
    $adtSession.InstallPhase = "Pre-$($adtSession.DeploymentType)"
    foreach ($f in 'Remove-KioskOemBloat.ps1','Remove-KioskRunTasks.ps1') {
        if (-not (Test-Path (Join-Path $adtSession.DirFiles $f))) {
            Write-ADTLogEntry -Message "Bundled script missing: $f" -Severity 3
            Close-ADTSession -ExitCode 70001
        }
    }

    ##================================================
    ## MARK: Install
    ##================================================
    $adtSession.InstallPhase = $adtSession.DeploymentType
    ## Invoke the SAME scripts the drift remediations use. Each is defensive (SilentlyContinue) and
    ## exits 0; a non-zero here means the script itself is broken, which should fail provisioning
    ## loudly rather than ship a device that only looks clean.
    foreach ($f in 'Remove-KioskOemBloat.ps1','Remove-KioskRunTasks.ps1') {
        Write-ADTLogEntry -Message "Running $f"
        $r = Start-ADTProcess -FilePath "$env:SystemRoot\System32\WindowsPowerShell\v1.0\powershell.exe" `
              -ArgumentList "-NoProfile -ExecutionPolicy Bypass -File `"$(Join-Path $adtSession.DirFiles $f)`"" `
              -WindowStyle Hidden -PassThru
        Write-ADTLogEntry -Message "$f exit code $($r.ExitCode)"
        if ($r.ExitCode -ne 0) { Close-ADTSession -ExitCode 70002 }
    }
```
This is exactly what `161-DRAFTS.md` PART C (`E-P1`, `E-P2a`, `E-P2b`) replaces: the flat `foreach ($f in 'A','B')` becomes `foreach ($s in $script:BundledScripts)` iterating an ordered hashtable array, `-PassThru` gains `-ErrorAction SilentlyContinue` (load-bearing per D-21), and a conditional `reg unload HKU\temphive` line is added after the vendored entry. Use `161-DRAFTS.md` `E-P1` verbatim for the new code block; this analog is only the shape being replaced (to diff against, not to copy from).

---

### Baseline README — new/edited H2 sections (docs, transform)

**Analog:** the Baseline README's own section-order convention plus NOTICE's provenance-field idiom (no distinct external analog needed; this is a docs file gaining sections in an established local shape).

Locked H2 literals and section order are already fully specified in `161-DRAFTS.md` PART D (`E-B1`, D-25 order list). Use `161-DRAFTS.md` verbatim for `## Assemble` replacement and the five new H2 headings pinned by `grep -cFx`; do not author new heading text.

---

### RE-237 Step 8 STD-05 block (docs, request-response ruling record)

**Analog:** RE-237's own Step 4 (lines 100-116)

**STD-05 idiom to mirror** (excerpt, lines 100-116):
```markdown
> **Ask the admin:** Does the kiosk fleet standardize on MAK-activated Windows Enterprise on the
current HP hardware, or on OEM-licensed Windows IoT Enterprise hardware?

| Option | When to choose | Consequence if wrong | Branch |
|--------|-----------------|----------------------|--------|
| MAK-activated Windows Enterprise ... | Existing fleet; ... | ...; **[PILOT]** an image showing as
unactivated failed the ShellLauncher node | Standard, ruled 2026-09-10—continue with the multi-app
branch at [Step 5](#step-5-...) |
| OEM-licensed Windows IoT Enterprise hardware | Purpose-built procurement ... | ... | Alternative—not
worked here; after procurement the Shell Launcher row opens with [WindowsApp_AutoLogon.xml](...) |

The Intune Admin Lead ruled on 2026-09-10 that the walk-up AVD kiosk class standardizes on ...
The ruling carries one prerequisite: ... Microsoft's [Windows IoT Enterprise licensing](...) page
sets the split out as a requirement matrix: ...

> **What breaks if misconfigured:** a MAK bought to reach the IoT arm activates volume-licensed
Windows Enterprise; OEMs license IoT Enterprise at manufacture, Volume Licensing only as an upgrade.
```
Pattern: `> **Ask the admin:**` lead-in (byte-unchanged, already present) → two-arm table with a "Recorded as"/"When to choose" style cell → one or two prose paragraphs stating the ruling with its date and its ground/precedent → `> **What breaks if misconfigured:**` callout, with exactly one blank line of separation on each side (C17 assertion 12 — no two `>` lines may become adjacent). `161-DRAFTS.md` PART E (`E-R1`, `E-R2`, `E-R3`, `E-R6`) is the VERBATIM/FACTS+SHAPE text for Step 8's Row 1/Row 2/ruling-paragraph edits, drafted to fit this exact idiom — use it byte-exact, this analog only shows the surrounding shape to preserve.

---

### Signing idiom (shared, referenced by NOTICE, README, ROADMAP/REQUIREMENTS amendments, RE-237)

**Analog:** `assets/recipes/06-walk-up-avd-kiosk/package-sources/windows-app-win32/Build-WindowsAppPackage.ps1` (lines 86-93)

```powershell
# 3. Sign (optional)
function Sign-Script([string]$Path) {
    $cert = Get-ChildItem Cert:\CurrentUser\My, Cert:\LocalMachine\My -ErrorAction SilentlyContinue |
            Where-Object Thumbprint -eq $CodeSigningCertThumbprint | Select-Object -First 1
    if (-not $cert) { throw "Code-signing cert $CodeSigningCertThumbprint not found in CurrentUser\My or LocalMachine\My" }
    $r = Set-AuthenticodeSignature -FilePath $Path -Certificate $cert -TimestampServer $TimestampServer -HashAlgorithm SHA256
    if ($r.Status -ne 'Valid') { throw "Signing failed for $Path : $($r.StatusMessage)" }
    Write-Host "Signed $(Split-Path $Path -Leaf)"
}
if ($CodeSigningCertThumbprint) {
    Sign-Script (Join-Path $here 'Deploy-WindowsApp.ps1')
```
This is the only in-repo Authenticode signing idiom (cert-by-thumbprint, `-TimestampServer`, `-HashAlgorithm SHA256`, `throw` on invalid). Phase 161 never runs this code — D-24 documents the idiom as a README-recorded manual assembly step for all three `Files\` scripts, with `[PILOT]` checkpoint evidence being `Status` x3 plus a distinct-thumbprint count, never a thumbprint/Subject/Issuer. Cite this excerpt by path and line range in the README `## Assemble` step 3 and in the four amendment strings (E-A1..A4); do not commit signed bytes or a new signing script.

## Shared Patterns

### Annotate-and-supersede (never delete, always append)
**Source:** NOTICE `Post-vendoring correction` block (lines 295-314); ROADMAP/REQUIREMENTS amendment precedent quoted in `161-CONTEXT.md` D-27.
**Apply to:** 161-01 (ROADMAP/REQUIREMENTS amendments E-A1..A4), 161-02 (NOTICE GAP-closure and supersede paragraphs E-N2/E-N4).
Pattern: original words retained byte-unchanged; a dated, clearly labelled paragraph is appended (`CLOSED …`, `SUPERSEDED IN PART …`, `**[SUCCESS-CRITERION AMENDMENT, D-NN]**`) that states what changed and points to the new source of truth. Never an in-place rewrite.

### `requirements: []` as flip control
**Source:** `160-01-PLAN.md` frontmatter comment (`requirements: []` with rationale); `160-03-PLAN.md` (`requirements: [LIC-02]` declared only where the last conjunct is settled).
**Apply to:** all four 161 plans — 161-01 and 161-03 declare `requirements: []`; VND-01 is declared in 161-02; VND-02/VND-03 in 161-04, per D-35.

### Checkpoint `checkpoint:human-action` with a `decline` resume signal
**Source:** `160-02-PLAN.md` Task 1 (lines 175-216); decline-path sentence quoted verbatim in `160-02-SUMMARY.md` key-decisions.
**Apply to:** 161-04 Task 2 (`161-DRAFTS.md` E-C1) — allowlist of exactly N items (not an exclusion filter over a full dump), `decline` recorded as a single token with date, requirement(s) still flip at the plan boundary regardless of outcome, `<reversibility>` rated explicitly (161's is `costly` because it mutates a device, unlike 160's `reversible` read-only check).

### Fresh-context `claude -p` fact-check/review dispatch
**Source:** `160-FACTCHECK-RUBRIC.md` (five judging classes, class 2 = `[PILOT]` traceability); `160-02-SUMMARY.md` tech-stack pattern notes (rubric + packet, output captured to scratchpad, transcribed verbatim; packet-completeness as a first-class failure mode).
**Apply to:** 161-03 review pass and 161-04 fact-check/judge passes — copy `160-FACTCHECK-RUBRIC.md` to `161-FACTCHECK-RUBRIC.md` with only the title and the class-2 record-file name changed (D-33); cap is three rounds per fragment, residual recorded as a named open finding if the cap is hit.

### Task-headed EVIDENCE file
**Source:** `160-EVIDENCE.md` (`## Task 1: Pilot device licensing reading`, `**Outcome: DECLINED 2026-09-14**` heading style).
**Apply to:** `161-EVIDENCE.md`, sectioned `## Task N (161-0M): …` per D-57's nine named sections.

## No Analog Found

None — all eight files/plan-artifacts have a strong exact or role-match analog in Phase 160's artifacts, the target files' own pre-edit states, or in-repo signing/NOTICE idioms.

## Metadata

**Analog search scope:** `.planning/phases/160-licensing-hardware-decision-record/`, `assets/recipes/06-walk-up-avd-kiosk/` (NOTICE, kiosk-baseline package sources, windows-app-win32), `docs/recipes/06-walk-up-avd-kiosk-autologon.md`.
**Files scanned:** 8 analog files/sections read directly (no broad Glob/Grep sweep was needed — the orchestrator's prompt named every analog path and line range up front).
**Pattern extraction date:** 2026-09-16
**Secret-hygiene verification:** counted zero SID-shape occurrences and zero certificate-Subject/Issuer-shape occurrences in this file before finalizing.
