---
phase: 152-integration-registry-navigation-last-close
plan: 02
subsystem: docs-pipeline
tags: [publish-bundle, reachability-proof, manifest, filename-map, no-commit]

requires:
  - phase: 152-integration-registry-navigation-last-close
    provides: "Plan 01 Commit A 74917b7d — registry at 236 Approved rows, filename map at 236 rows, both canaries at 236"
provides:
  - "dist/docs-library-v1.21.0.zip — 238 entries (236 .docx + manifest.csv + README.md), built from the committed 236-row registry"
  - "A computed reachability proof that all eleven Phase 146-151 documents reach the bundle as .docx and as manifest rows"
  - "The measured nine-row blank-Status set, recorded and accepted under D-28"
  - "The measured nine unregistered docs/operations/** link targets of the eleven new documents, recorded under D-73"
  - "The recorded discharge of the ROADMAP research flag's pre-flight, with the ordering inversion measured rather than asserted"
affects: [152-03 navigation-last, 152-04 inbound links and terminal gates, 153 harness close]

actuals:
  tokens: 5500
  tasks: 3
  commits: 1

tech-stack:
  added: []
  patterns:
    - "A build step that rewrites a tracked file is proved harmless by blob-hash equality, never by claiming the surface was untouched"
    - "Every count in this summary is extracted from the run's own output or from the artifact it produced; none is transcribed from a planning artifact"

key-files:
  created:
    - dist/docs-library-v1.21.0.zip
    - .planning/phases/152-integration-registry-navigation-last-close/152-02-bundle-run.txt
  modified: []

key-decisions:
  - "The run was invoked with --version=v1.21.0 after a blocking operator confirmation; the bare fallback would have written a current-corpus zip under the reserved v1.17 name"
  - "The tracked filename map was rewritten by the bundle's build step and asserted byte-identical to its committed blob rather than assumed untouched"
  - "The nine blank manifest Status cells are accepted, not fixed; no status key was added to any operations document"
  - "The stale pre-plan staging directory was measured before removal, which further weakened the ordering-inversion claim the plan objective made"

patterns-established:
  - "Where a plan verification command over-reaches (an untracked foreign file failing an emptiness test), report both the as-written result and the narrowed result that isolates the plan's actual surface"

requirements-completed: [INT-02]

duration: 22min
completed: 2026-08-27
status: complete
---

# Phase 152 Plan 02: Publish-Bundle Reachability Proof Summary

**A real publish-bundle run over the committed 236-row registry exited 0 with zero conversion, guard and parity failures, put all eleven Phase 146-151 documents into `dist/docs-library-v1.21.0.zip` as `.docx` and into its `manifest.csv` as rows, and left the tracked tree byte-identical — no commit of any tracked pipeline file.**

## Performance

- **Duration:** ~22 min (continuation agent; Task 1 answered by the operator separately)
- **Tasks:** 3 of 3 (Task 1 completed by the prior agent)
- **Commits:** 1, planning-only. Zero content commits, zero commits of any tracked pipeline file.
- **HEAD unchanged through Tasks 2 and 3:** `3b5378aa` before the run and after it.

## Task 1 carry-forward

The operator replied **"approved"**, so the run used `--version=v1.21.0`. The prior agent recorded the fallback at `scripts/pipeline/build-publish-bundle.mjs:40` (`: 'v1.17'`), the unconditional rename at `:483`, and the pre-run absence of `dist/docs-library-v1.17.zip`.

## Task 2 — preconditions

| Check | Command | Result |
|---|---|---|
| pandoc pin extracted from the script, not hard-coded | `sed -n '43p' scripts/pipeline/convert.ps1` | `$expectedVer = '3.7.0.2'` |
| pandoc installed | `pandoc --version \| head -1` | `pandoc.exe 3.7.0.2` |
| pin vs installed, compared programmatically | string equality of the two extracted values | `PANDOC_PIN_MATCH` |
| PowerShell 7 | `pwsh --version` | `PowerShell 7.6.5` |
| tracked tree under `docs/` and `scripts/` | `git status --porcelain -- docs/ scripts/` | empty |
| pre-run filename-map blob | `git rev-parse HEAD:scripts/pipeline/filename-map.md` | `71c384c9bd1be807902bd0ace4ababf5947432c5` |
| `dist/` inventory | `ls -la dist/` | v1.18, v1.19, v1.20 only; **no** `docs-library-v1.17.zip`; no `*.tmp` |

### Stale staging removed, and what it turned out to be

`.pipeline-output/publish-staging/` existed, dated 2026-08-27 07:43, and was removed under D-25. Measured before removal:

- **228 files** total: **226 `.docx`** plus `manifest.csv` plus `README.md`
- `manifest.csv` carried **226 data rows**, the last being `RE-226,windows-autopatch.docx,,2026-08-23`

That is the pre-plan probe's output: the 225 Approved rows of the pre-Commit-A registry plus one scratch `RE-226` row. Nothing under `dist/` needed cleaning.

## Task 3 — the run

Invoked from the repository root with a ten-minute timeout:

```
node scripts/pipeline/build-publish-bundle.mjs --version=v1.21.0
```

**Exit code 0.** Not killed; no retry was needed. The full 486-line console log is retained verbatim at `.planning/phases/152-integration-registry-navigation-last-close/152-02-bundle-run.txt`. Reproduced here with the two uniform per-document blocks folded — every folded line has the exact form `RE-NNN <dots> CONVERT-OK` or `RE-NNN <dots> GUARD-OK`, and the fold is discharged by the counts in the table immediately below it.

```
build-publish-bundle -- Phase 126 PUB-01..04 batch orchestrator

Regenerating filename-map.md...
Parsed 236 registry rows -> 236 output filenames, 0 unresolved collisions.
Wrote D:\claude\Autopilot\scripts\pipeline\filename-map.md

Converting 236 Approved doc(s)...
RE-001 .................................................................. CONVERT-OK
   [log lines 9-243: RE-002 .. RE-236, all CONVERT-OK]

Guarding 236 converted .docx...
RE-001 .................................................................. GUARD-OK
   [log lines 247-481: RE-002 .. RE-236, all GUARD-OK]

Registry parity: 236 Approved rows, 236 staged, 0 excluded, 0 missing, 0 orphan.

Wrote D:\claude\Autopilot\dist\docs-library-v1.21.0.zip
Batch complete: 236 docx converted+guarded+staged, 0 errors.
```

| Measured over the log | Command | Result |
|---|---|---|
| convert successes | `grep -c 'CONVERT-OK$'` | **236** |
| convert failures | `grep -c 'CONVERT-FAIL'` | **0** |
| guard successes | `grep -c 'GUARD-OK$'` | **236** |
| guard failures | `grep -c 'GUARD-FAIL'` | **0** |
| any `FAIL`, `FATAL` or `ERROR` line anywhere in the log | `grep -nE 'FAIL\|FATAL\|ERROR'` | **none** |

### Converted count against Approved row count, side by side

Both numbers were extracted from the run's own output and compared to each other, never to a number written in the plan.

| Source line (verbatim, from the log) | Extracted |
|---|---|
| `Batch complete: 236 docx converted+guarded+staged, 0 errors.` | converted = **236** |
| `Registry parity: 236 Approved rows, 236 staged, 0 excluded, 0 missing, 0 orphan.` | Approved rows = **236**, staged = **236** |

`converted == Approved` → `CONVERTED_EQUALS_APPROVED`.

### Zip entry count with the arithmetic

```
unzip -Z1 dist/docs-library-v1.21.0.zip | wc -l   ->  238
```

Approved rows + 2 = 236 + 2 = **238**. Entry count = **238**. `ZIP_COUNT_OK`.

Of the 238 entries, 236 end in `.docx`; the two that do not are `manifest.csv` and `README.md`, enumerated by `grep -v '\.docx$'` over the listing rather than assumed.

`dist/docs-library-v1.21.0.zip` — 4,069,321 bytes, 2026-08-27 11:25.

### The eleven `.docx` stems, derived from the map and found in the zip

Stems were read out of `scripts/pipeline/filename-map.md` by script (`awk` over the eleven `RE-22[6-9]|RE-23[0-6]` rows) and each was matched against the zip listing with `grep -qxF`. None was retyped.

| Doc ID | `.docx` stem from `filename-map.md` | In zip |
|---|---|---|
| RE-226 | `firmware-oem-capability-matrix.docx` | yes |
| RE-227 | `enterprise-update-plan-a-governed-update-posture-for-the-whole-fleet.docx` | yes |
| RE-228 | `firmware-and-bios-governance.docx` | yes |
| RE-229 | `device-firmware-configuration-interface-dfci.docx` | yes |
| RE-230 | `dell-bios-configuration-through-intune.docx` | yes |
| RE-231 | `hp-bios-configuration-through-intune.docx` | yes |
| RE-232 | `lenovo-bios-configuration-through-intune.docx` | yes |
| RE-233 | `linux-update-delivery.docx` | yes |
| RE-234 | `windows-driver-and-firmware-updates.docx` | yes |
| RE-235 | `windows-autopatch.docx` | yes |
| RE-236 | `windows-application-updates.docx` | yes |

`missing_in_zip=0`.

### The eleven manifest rows, extracted from inside the zip

`unzip -p dist/docs-library-v1.21.0.zip manifest.csv` → 237 lines (header plus 236 data rows), header `RE-ID,Output Filename,Status,Last Verified`.

```
RE-226,firmware-oem-capability-matrix.docx,Approved,2026-08-25
RE-227,enterprise-update-plan-a-governed-update-posture-for-the-whole-fleet.docx,Approved,2026-08-26
RE-228,firmware-and-bios-governance.docx,,2026-08-25
RE-229,device-firmware-configuration-interface-dfci.docx,,2026-08-24
RE-230,dell-bios-configuration-through-intune.docx,,2026-08-25
RE-231,hp-bios-configuration-through-intune.docx,,2026-08-25
RE-232,lenovo-bios-configuration-through-intune.docx,,2026-08-25
RE-233,linux-update-delivery.docx,,2026-08-21
RE-234,windows-driver-and-firmware-updates.docx,,2026-08-20
RE-235,windows-autopatch.docx,,2026-08-23
RE-236,windows-application-updates.docx,,2026-08-23
```

Count of rows matching `^RE-(22[6-9]|23[0-6]),` = **11**.

### Conversion wall window, computed from the artifact

The zip's own entry timestamps run `2026-08-27 11:20` (earliest) to `2026-08-27 11:25` (latest) — roughly five to six minutes for 236 documents, consistent with the D-25 budget of about 1.4 seconds per document. The run was not separately instrumented; this window is derived from the artifact rather than estimated.

## Recorded, not fixed — the blank `Status` cells (D-28)

Nine manifest rows carry an empty `Status` cell. The set was computed over the **whole** 236-row manifest (`awk -F',' 'NR>1 && $3==""'`), not sampled from the eleven, so it is a complete enumeration: the count is exactly nine and they are exactly the nine operations documents.

| Doc ID | Output filename | Status | Last Verified |
|---|---|---|---|
| RE-228 | `firmware-and-bios-governance.docx` | *(blank)* | 2026-08-25 |
| RE-229 | `device-firmware-configuration-interface-dfci.docx` | *(blank)* | 2026-08-24 |
| RE-230 | `dell-bios-configuration-through-intune.docx` | *(blank)* | 2026-08-25 |
| RE-231 | `hp-bios-configuration-through-intune.docx` | *(blank)* | 2026-08-25 |
| RE-232 | `lenovo-bios-configuration-through-intune.docx` | *(blank)* | 2026-08-25 |
| RE-233 | `linux-update-delivery.docx` | *(blank)* | 2026-08-21 |
| RE-234 | `windows-driver-and-firmware-updates.docx` | *(blank)* | 2026-08-20 |
| RE-235 | `windows-autopatch.docx` | *(blank)* | 2026-08-23 |
| RE-236 | `windows-application-updates.docx` | *(blank)* | 2026-08-23 |

**Reason.** The manifest writer sources `Status` from the source document's own frontmatter with an empty-string fallback (`build-publish-bundle.mjs:459`, `readFrontmatterField(srcContent, 'status') || ''`), and the nine operations documents carry no `status:` key by INT-02's design. `Last Verified` populates on all nine because those documents do carry `last_verified:`.

**Accepted.** This is the expected shape, not a defect. Code review should not surface it. No `status:` key was added: `grep -c '^status:'` returns **0** on all nine paths, and `grep -c '^doc_id:'` returns **0** on all nine as well — so the divergence guard passed and C17 gating never applied, which is the end-to-end proof INT-02's owner ruling needed.

## Recorded, not fixed — the unregistered link targets (D-73)

Measured, not transcribed. The measurement resolves every relative `.md` link in the eleven new documents against its own directory, keeps those landing under `docs/operations/`, and subtracts the 236 registered paths parsed out of `docs/_registry/RE-index.md`:

```
# ad-hoc measurement script (scratchpad, not committed):
#   resolve every relative ](*.md) target in the 11 source documents against
#   its own directory, keep those under docs/operations/, subtract the 236
#   paths parsed from docs/_registry/RE-index.md, count the distinct remainder
python <scratchpad>/unreg.py
```

The script parsed 236 registered rows and 11 source paths, and found **9 distinct unregistered `docs/operations/**` link targets**, all of which exist on disk:

| Unregistered target | Linked from |
|---|---|
| `docs/operations/patch-management/00-overview.md` | 5 — RE-227, RE-233, RE-234, RE-235, RE-236 |
| `docs/operations/patch-management/01-windows-wufb-rings.md` | 4 — RE-227, RE-229, RE-234, RE-235 |
| `docs/operations/co-management/03-cocmgmt-migration-paths.md` | 2 — RE-234, RE-235 |
| `docs/operations/app-lifecycle/00-overview.md` | 1 — RE-236 |
| `docs/operations/app-lifecycle/01-windows-win32-msix-scale.md` | 1 — RE-236 |
| `docs/operations/co-management/02-windows-workload-sliders.md` | 1 — RE-234 |
| `docs/operations/patch-management/02-macos-update-enforcement.md` | 1 — RE-227 |
| `docs/operations/patch-management/03-ios-update-lifecycle.md` | 1 — RE-227 |
| `docs/operations/patch-management/04-android-patch-delivery.md` | 1 — RE-227 |

The independently measured count and the five-way concentration on the patch-management overview both reproduce D-73. The bundle rewrites no links, so this is a content-completeness fact about the published library, not a broken-anchor one: the bundle ships eleven new documents whose most-cited routing hub is not itself in the library. Registering the legacy twenty is out of scope and parked in a future hygiene milestone.

## Post-run tracked-file assertions

| Assertion | Result |
|---|---|
| `git rev-parse HEAD:scripts/pipeline/filename-map.md` | `71c384c9bd1be807902bd0ace4ababf5947432c5` |
| `git hash-object scripts/pipeline/filename-map.md` | `71c384c9bd1be807902bd0ace4ababf5947432c5` |
| equality | **MAP_BYTE_IDENTICAL** — the build step rewrote the file and reproduced its committed bytes exactly |
| `dist/docs-library-v1.17.zip` post-run | **absent**, matching the Task 1 baseline |
| `dist/*.tmp` | none |
| `git status --porcelain -uno -- docs/ scripts/` | empty — no tracked file modified or deleted |
| `git log --oneline 74917b7d..HEAD -- docs/ scripts/` | empty — no commit touched those trees |
| `git rev-parse --short HEAD` | `3b5378aa`, unchanged from the Task 2 pre-flight |

D-24 is discharged as written: the surface **was** touched, and equality was asserted rather than the touch denied.

## Deviations from Plan

**1. [Rule 3 — verification command over-reaches] The plan's `git status --porcelain -- docs/ scripts/` emptiness check fails on a foreign untracked file, and the narrowed check is reported alongside it**

- **Found during:** Task 3, post-run assertions.
- **Issue:** `git status --porcelain -- docs/ scripts/` returns one line, `?? scripts/docs-style/judge-packets.py`, so the plan's `<verify>` block exits 1. The same command was empty at the Task 2 pre-flight.
- **Provenance, measured:** the file is dated 2026-08-27 11:19 and belongs to the Google-style documentation toolkit — every sibling in `scripts/docs-style/` is tracked and dated 2026-08-25 or 2026-08-26, and the directory carries the audit's `RESUME.md`. It cannot have come from this plan: `grep -c "docs-style"` returns **0** in all three pipeline scripts (`build-publish-bundle.mjs`, `build-filename-map.mjs`, `convert.ps1`), which write only `.docx`, `.csv`, `.md` and `.zip` outputs and never a `.py` file. It appeared from concurrent work outside this plan's scope.
- **Resolution:** not touched. Committing it would violate this plan's commit contract; deleting another workstream's uncommitted file would be destructive. The substantive claim the criterion protects — that this plan changed no tracked file under `docs/` or `scripts/` — is asserted instead by `git status --porcelain -uno -- docs/ scripts/`, which is **empty**, and by the empty `git log 74917b7d..HEAD -- docs/ scripts/`. Both forms are reported above; the as-written form's exit 1 is not hidden.
- **Follow-on:** later plans in this phase that reuse the bare emptiness check will hit the same line until that file is committed or removed by its own workstream.

**2. [Rule 1 — framing correction] The plan objective's "never ran the bundle" wording is measurably too strong, and the correction is weaker than the one handed forward**

- **Found during:** Task 2, inventorying the stale staging directory.
- **Issue:** the plan objective and D-27 state that the pre-plan probe "covered conversion and the docx guard against a scratch row; it never ran the bundle, never exercised the filename-map coverage or parity checks, and never touched the manifest". The 07:43 staging directory contains 226 `.docx` **and a 226-row `manifest.csv` and a `README.md`** — artifacts only the bundle's post-parity stage writes. The probe therefore ran the bundle end to end, including the coverage and parity checks and the manifest writer, and (per D-23) produced and then removed a v1.17-named zip.
- **Correct framing, recorded here in place of the stronger wording:** the probe exercised the bundle's full code path, but against a **scratch 226-row registry** — the 225 pre-Commit-A Approved rows plus one hand-added `RE-226` row — not against the committed 236-row registry, not against the eleven real rows, and not against the bumped canaries. Its manifest did already show the D-28 blank-`Status` behaviour on that single scratch row. What this plan's run adds is the real-row proof: 236 committed Approved rows, eleven real documents, coverage and parity computed over them, and an artifact named for this milestone.
- **The substantive conclusion is unchanged:** the pre-flight was not discharged before this plan, because a scratch-row run over a superseded registry proves nothing about the eleven documents. See the discharge note below.

## Research-flag discharge and the recorded ordering inversion

This real-row run is the accepted discharge of the ROADMAP research flag's pre-flight for INT-02 and SC#3. The ordering was inverted — the probe ran before the plan existed, the real discharge after — and that inversion is recorded here rather than hidden, exactly as D-27 requires. The probe's coverage is stated at its measured extent in Deviation 2 above, not at the broader extent the plan text asserted; the correction makes the probe look like it covered *more*, and it is recorded anyway.

## INT-02 unclassified edge — residual, surfaced not dismissed

The deterministic probe could not classify INT-02's edge family. The substantive question it points at — that an **absent** frontmatter `status` key is not the same as `status: Draft`, so the D-12 divergence guard passes and the manifest ships a blank `Status` cell — is governed by D-28 and disposed there. This run is the empirical confirmation: nine rows with no `status:` key passed the guard and produced nine blank cells, and zero rows failed the guard. No further decision is taken here; the residual is recorded.

## Verification

| Check | Result |
|---|---|
| exit code | 0 |
| `dist/docs-library-v1.21.0.zip` exists | yes, 4,069,321 bytes |
| converted count == Approved row count, both from the run's output | 236 == 236 |
| conversion failures / guard failures | 0 / 0 |
| parity line | `0 excluded, 0 missing, 0 orphan` |
| zip entries == Approved + 2 | 238 == 236 + 2 |
| eleven map-derived `.docx` stems in the zip | 11/11 |
| eleven identifiers in the bundled `manifest.csv` | 11/11 |
| filename map byte-identical to its committed blob | yes, `71c384c9…` both sides |
| `dist/docs-library-v1.17.zip` | absent before, during and after |
| `git status --porcelain -uno -- docs/ scripts/` | empty |
| commits made by this plan touching `docs/` or `scripts/` | 0 |
| `^status:` / `^doc_id:` on the nine operations documents | 0 / 0 on all nine |
| unregistered `docs/operations/**` link targets from the eleven | 9, enumerated |

The plan's `<verify>` block as written exits 1 on the untracked-file clause only; the same block with `-uno` prints `BUNDLE_OK` and exits 0. Both are recorded in Deviation 1.

## Known Stubs

None.

## Threat Flags

None. This plan added no network endpoint, no auth path, no schema change at a trust boundary, and no package-manager install. The register's mitigations were applied: T-152-07 by the parity line at zero excluded / missing / orphan plus the 238 == 236 + 2 arithmetic; T-152-08 by the blocking version checkpoint plus the pre-run and post-run absence of the v1.17 name; T-152-10 by clearing the stale staging before the run, which then completed without a kill; T-152-11 by the blob-hash equality on the filename map. T-152-09 and T-152-SC were accepted as planned, with the pandoc pin asserted programmatically against the script's own value.

## Commit

| Commit | Subject | Files |
|---|---|---|
| *(see final metadata commit)* | `docs(152-02): publish-bundle reachability proof summary` | `.planning/**` only — SUMMARY, run log, STATE, ROADMAP |

No content commit. No commit of any tracked pipeline file.

## Hand-forward to Plan 03

- The bundle is proved reachable at 236 rows; `dist/docs-library-v1.21.0.zip` is this plan's proof artifact and is deliberately named apart from the plain `v1.21` artifact HARN-05 produces in Phase 153.
- `?? scripts/docs-style/judge-packets.py` is untracked and foreign. Any later plan whose verification uses a bare `git status --porcelain -- docs/ scripts/` emptiness test will fail on it; use `-uno`, or narrow the pathspec.
- The nine unregistered `docs/operations/**` link targets are enumerated above and are the concrete content-completeness gap the phase leaves open.
