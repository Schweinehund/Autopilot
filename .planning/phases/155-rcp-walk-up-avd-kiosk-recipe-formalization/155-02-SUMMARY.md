---
phase: 155-rcp-walk-up-avd-kiosk-recipe-formalization
plan: 02
subsystem: docs-assets
tags: [assets-tree, vendored-supply-chain, nav-hub-links, pinned-sha, msix-pointer, RE-237]

# Dependency graph
requires:
  - phase: 155-rcp-walk-up-avd-kiosk-recipe-formalization
    provides: "plan 155-01's frozen gate baseline (155-GATE-BASELINE.json) and the retired V-135-RECIPE equality pin this plan's measurements are compared against"
provides:
  - "assets/recipes/06-walk-up-avd-kiosk/ founded as a tracked git tree, reachable and enforced end to end by one real relative link from RE-237, proven by breaking and restoring the link target"
  - "production.xml: a committed, byte-equal (line-ending-normalized) copy of RE-237's own fenced AssignedAccessConfiguration payload"
  - "The four upstream Windows App artifacts (Deploy-WindowsApp.ps1, Detect-WindowsApp.ps1, WindowsApp_AutoLogon.xml, WINDOWS-APP-MSIX.md) vendored/authored, each independently confirmed against a pinned commit SHA before fetch"
  - "NOTICE: a per-asset attribution ledger recording origin, pinned SHA, retrieval date and written-bytes SHA256 for every asset, plus the no-LICENSE-file statement"
affects: [155-03-kiosk-baseline-and-remediation-assets, 155-05-rcp-09-10-content-corrections, 155-06-registration-and-promotion]

# Actuals (#2632)
actuals:
  tokens: 7238
  tasks: 2
  commits: 2

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Programmatic fence extraction: read the fenced XML block out of the markdown source with a regex capture rather than retyping it, so a committed duplicate payload is provably byte-equal (line-ending-normalized) to its markdown source, not merely eyeballed."
    - "Break-and-restore link-checker proof: before trusting a '0 failures' result as evidence the checker enforces a specific link, temporarily rename the link's target, re-run, confirm the exact failure string names the path, then restore and re-run to confirm clean — a checker that would pass either way proves nothing."
    - "Vendoring at a pinned SHA: resolve a specific commit via the GitHub API (never a branch/tag), confirm it exists with one call, list the target directory at that ref with a second call to confirm every named path is present, then fetch raw content at the SHA — never at main."
    - "Auth-gated hash documented, not fabricated: when a binary's SHA256 cannot be computed without an authentication flow the automation cannot complete (here, winget msstore download requiring Entra ID admin-role auth), record the exact blocking message and the packager-side command to compute it later, rather than inventing or omitting the field."

key-files:
  created:
    - assets/recipes/06-walk-up-avd-kiosk/NOTICE
    - assets/recipes/06-walk-up-avd-kiosk/assigned-access/production.xml
    - assets/recipes/06-walk-up-avd-kiosk/windows-app/Deploy-WindowsApp.ps1
    - assets/recipes/06-walk-up-avd-kiosk/windows-app/Detect-WindowsApp.ps1
    - assets/recipes/06-walk-up-avd-kiosk/windows-app/WindowsApp_AutoLogon.xml
    - assets/recipes/06-walk-up-avd-kiosk/windows-app/WINDOWS-APP-MSIX.md
  modified:
    - docs/recipes/06-walk-up-avd-kiosk-autologon.md

key-decisions:
  - "The Dependencies/ folder at the pinned SHA (two VCLibs .appx files, one 6.7 MB) is documented in NOTICE by path/SHA/size but not committed — it is not one of the task's named four-file vendor set, has no entry in the plan's <files> manifest, and committing it would fail the plan's own 2 MB size-cap acceptance gate. Same size-avoidance rationale as D-30's MSIX exclusion, applied by extension."
  - "WindowsApp_AutoLogon.xml was vendored from the ShellLauncher/ variant of the upstream repository (not the MultiApp/ variant of the same filename that also exists there) because it declares the V2 namespace RE-237 Step 4 references, and RE-237's own context (the not-worked-here Shell Launcher branch) matches the ShellLauncherConfiguration root element, not AssignedAccessConfiguration."
  - "The MSIX SHA256 could not be computed — winget msstore download requires Microsoft Entra ID authentication with a Global/User/License Administrator role, confirmed by direct attempt, not assumption. Recorded as a documented limitation with the exact blocking message and the packager-side Get-FileHash command, per the plan's own 'do not record a hash you did not compute' instruction."

requirements-completed: [RCP-09]

coverage:
  - id: D1
    description: "assets/recipes/06-walk-up-avd-kiosk/ founded as a tracked, non-gitignored tree; production.xml byte-equal to RE-237's fenced payload; one real relative link from RE-237 proven enforced by check-nav-hub-links.mjs via break-and-restore"
    requirement: "RCP-09"
    verification:
      - kind: other
        ref: "node scripts/validation/check-nav-hub-links.mjs (0/0 before, 1 corpus-link failure naming production.xml after rename, 0/0 after restore)"
        status: pass
      - kind: other
        ref: "node -e byte-equality check between RE-237's fenced block and production.xml (line-ending-normalized)"
        status: pass
    human_judgment: false
  - id: D2
    description: "Four upstream Windows App artifacts vendored/authored at Azure/WindowsAppKiosk pinned commit 17e1c09b4883ea2062bef801ae24bbc9722861d7, independently confirmed via GitHub API before fetch; each carries a provenance comment; NOTICE carries per-file attribution plus written-bytes SHA256; MSIX pinned by URL/version, not committed"
    requirement: "RCP-09"
    verification:
      - kind: other
        ref: "for-loop over the four vendored paths: test -s, git ls-files, git check-ignore -q (all pass, all tracked, none ignored)"
        status: pass
      - kind: other
        ref: "find assets/recipes/06-walk-up-avd-kiosk -type f -size +2M (empty result)"
        status: pass
    human_judgment: false
  - id: D3
    description: "Structural gates unchanged after both commits: check-nav-hub-links 0/0, c17-eee-contract 237/0, check-phase-153 apex 111/0/0 non-nested, RE-237 sweep3.py residual unchanged at exactly 1 edit, .gitattributes byte-unchanged"
    requirement: ""
    verification:
      - kind: other
        ref: "node scripts/validation/check-phase-153.mjs (CHECK_PHASE_NESTED unset): 111 PASS, 0 FAIL, 0 SKIPPED"
        status: pass
      - kind: other
        ref: "python scripts/docs-style/sweep3.py <scratch>/re237 scripts/docs-style/_CONTENT-PINS.txt: 1 files, 1 TOTAL edits (sign-in-to, the pre-existing :19 residual)"
        status: pass
    human_judgment: false

duration: 14min
completed: 2026-09-03
status: complete
---

# Phase 155 Plan 02: Tracer — Asset Tree Foundation and Windows App Vendoring Summary

**Founded `assets/recipes/06-walk-up-avd-kiosk/` and proved the corpus link checker actually enforces a committed asset by breaking and restoring it, then vendored three upstream Windows App files at a GitHub-API-confirmed pinned commit SHA and pinned the MSIX by Microsoft Store product ID instead of committing it.**

## Performance

- **Duration:** ~14 min
- **Started:** 2026-09-02T22:47:00-05:00 (approximate, first file write)
- **Completed:** 2026-09-02T22:59:48-05:00 (Task 2 commit)
- **Tasks:** 2 completed
- **Files modified:** 7 (6 created, 1 modified) across 2 commits

## Accomplishments

- **Task 1 (tracer):** Extracted RE-237's fenced `AssignedAccessConfiguration` XML programmatically (never retyped) into `assets/recipes/06-walk-up-avd-kiosk/assigned-access/production.xml`, byte-equal line-ending-normalized to the source fence. Wrote `NOTICE` recording the file's origin and the repository's LICENSE-file absence. Negative-controlled both new paths against `.gitignore` (no match, `git check-ignore -v` exit 1 for both). Linked the committed file from RE-237`:115` with a two-level relative path, no backtick label, no fragment. **Proved the enforcement is real**, not assumed: renamed `production.xml`, re-ran the checker (1 corpus-link failure naming the exact path), restored it, re-ran (0 failures). Committed all three files together.
- **Task 2:** Resolved and confirmed a full 40-character commit SHA (`17e1c09b4883ea2062bef801ae24bbc9722861d7`) on `Azure/WindowsAppKiosk` via two independent GitHub API calls (commit lookup, then a directory listing at that ref showing `Deploy-WindowsApp.ps1`, `Detect-WindowsApp.ps1`, `Dependencies`) before fetching any byte. Vendored `Deploy-WindowsApp.ps1`, `Detect-WindowsApp.ps1`, and the Shell Launcher variant of `WindowsApp_AutoLogon.xml` (not the MultiApp variant of the same filename that also exists upstream), each keeping its upstream body verbatim with a prepended/inserted provenance block. Authored `WINDOWS-APP-MSIX.md` pinning the MSIX by Store product ID, version and download command; its SHA256 is documented as not-computable in this environment (Entra ID auth gate) rather than fabricated. Appended four rows plus a "not vendored" disposition note to `NOTICE`. Confirmed no `.gitignore` collision on any of the five new/modified paths.

## Task Commits

Each task was committed atomically:

1. **Task 1: End-to-end asset reachability and enforcement tracer** - `92673910` (feat)
2. **Task 2: Vendor the four upstream Windows App files at a confirmed pinned SHA** - `5c57ee49` (feat)

**Plan metadata:** committed together with this SUMMARY (see final commit below).

## Files Created/Modified

- `assets/recipes/06-walk-up-avd-kiosk/NOTICE` - Per-asset attribution ledger: origin, pinned SHA (where applicable), retrieval date, written-bytes SHA256 for every committed asset, the not-vendored `Dependencies/` disposition, and the no-LICENSE-file statement
- `assets/recipes/06-walk-up-avd-kiosk/assigned-access/production.xml` - Byte-equal (line-ending-normalized) copy of RE-237's fenced `AssignedAccessConfiguration` payload, extracted programmatically
- `assets/recipes/06-walk-up-avd-kiosk/windows-app/Deploy-WindowsApp.ps1` - Vendored verbatim from `Azure/WindowsAppKiosk` at the pinned SHA, provenance block inserted after the existing comment-based-help block
- `assets/recipes/06-walk-up-avd-kiosk/windows-app/Detect-WindowsApp.ps1` - Vendored verbatim; provenance block prepended (no existing header to preserve)
- `assets/recipes/06-walk-up-avd-kiosk/windows-app/WindowsApp_AutoLogon.xml` - Vendored verbatim (Shell Launcher variant); provenance comment node inserted below the XML declaration
- `assets/recipes/06-walk-up-avd-kiosk/windows-app/WINDOWS-APP-MSIX.md` - Authored pointer document: Store product ID, download command, version to pin, documented SHA256 auth-gate limitation, and the size rationale for not committing the binary
- `docs/recipes/06-walk-up-avd-kiosk-autologon.md` - One sentence appended at `:115` linking to the committed `production.xml`; no other prose touched

## Decisions Made

- **The `Dependencies/` folder is documented, not committed.** It exists at the same pinned SHA and holds two VCLibs `.appx` runtime packages (6,757,465 and 896,581 bytes). It is not part of the task's named four-file vendor set, is absent from the plan's `<files>` manifest, and the larger file alone would fail the plan's own `find ... -size +2M` acceptance gate outright. `NOTICE` records its path, pinned SHA, both file sizes, and that both are flat files with no `.gitignore`-trapped subpaths — extending D-30's committed-binary-avoidance rationale to a second upstream artifact of the same shape.
- **`WindowsApp_AutoLogon.xml` sourced from `ShellLauncher/`, not `MultiApp/`.** The upstream repository ships two files of that exact name in sibling folders. The `ShellLauncher/` copy is a `ShellLauncherConfiguration` document declaring the `V2` namespace that RE-237 Step 4 names (`V2:AllAppsFullScreen`); the `MultiApp/` copy is a second, unrelated `AssignedAccessConfiguration` that could be mistaken for a rival to the already-committed `production.xml`. Neither file's actual attribute set includes `AllAppsFullScreen` at this pinned SHA — that specific claim belongs to RCP-10's already-completed research scope, not this vendoring task, which only confirms named paths exist.
- **MSIX SHA256 documented as an auth-gated limitation, not fabricated.** `winget download --source msstore` for Windows App (`9N1F85V9T8BN`) returned, verbatim: "Microsoft Store package download requires Microsoft Entra Id authentication... the Microsoft Entra Id account needs to be a member of Global Administrator, User Administrator, or License Administrator" followed by "Failed to retrieve Microsoft Store package download information." This is a real authentication gate a non-interactive agent cannot satisfy, not a retryable error. `WINDOWS-APP-MSIX.md` records the exact message and gives the packager the `Get-FileHash` command to run once they have Store-licensed access.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - premise correction] The `Dependencies/` folder cannot be committed without violating the plan's own size gate**
- **Found during:** Task 2, after listing `Dependencies/` at the pinned SHA
- **Issue:** The action text's prose ("Fetch its contents at the same SHA... run `git check-ignore -v` over every path in it") reads as an instruction to commit the folder, but the task's own `<files>` manifest never names a `Dependencies/*` output path, and the folder's actual contents at this pinned SHA are two `.appx` binaries (6.7 MB and 0.9 MB) — the larger one alone is over 3x this repository's largest tracked file and would fail the task's own `find assets/recipes/06-walk-up-avd-kiosk -type f -size +2M` acceptance check outright.
- **Fix:** Confirmed the folder's existence and exact contents (names, sizes) at the pinned SHA via the GitHub API, recorded that confirmation plus a `.gitignore`-trap inspection (neither filename matches any repo-wide pattern) in `NOTICE`, and did not commit the binaries — applying the same size-avoidance reasoning D-30 already applies to the MSIX itself, since both are same-shape upstream binaries the recipe references but does not need committed to be usable (a packager fetches both from the pinned SHA directly).
- **Files modified:** `assets/recipes/06-walk-up-avd-kiosk/NOTICE`
- **Verification:** `find assets/recipes/06-walk-up-avd-kiosk -type f -size +2M` returns nothing; `NOTICE` names both files, their sizes and the pinned SHA.
- **Committed in:** `5c57ee49`

**2. [Rule 3 - Blocking, resolved as documented limitation] MSIX SHA256 not computable in this execution environment**
- **Found during:** Task 2, MSIX pinning step
- **Issue:** `winget download --source msstore --id 9N1F85V9T8BN` (the exact command already documented in the vendored `Deploy-WindowsApp.ps1`'s own header) requires interactive Microsoft Entra ID authentication with an administrator-tier role — not obtainable by a non-interactive agent, and not a package-legitimacy question this repository's Rule-3 package-install exclusion was written for (no npm/pip/cargo install was attempted).
- **Fix:** Did not fabricate a hash. Recorded the exact blocking message from `winget` verbatim in `WINDOWS-APP-MSIX.md`, along with the Store product ID, the download command, the version to pin (read from the already-vendored `Detect-WindowsApp.ps1`'s own `$TargetVersion` default, `2.0.704.0`), and the exact `Get-FileHash -Algorithm SHA256` command for a packager with Store access to run.
- **Files modified:** `assets/recipes/06-walk-up-avd-kiosk/windows-app/WINDOWS-APP-MSIX.md`
- **Verification:** `grep -qi 'sha256' assets/recipes/06-walk-up-avd-kiosk/windows-app/WINDOWS-APP-MSIX.md` passes (the field is documented, not silently omitted).
- **Committed in:** `5c57ee49`

---

**Total deviations:** 2 (both premise corrections where a literal instruction would have violated a harder constraint elsewhere in the same plan — the size gate and the "do not record a hash you did not compute" instruction)
**Impact on plan:** Neither affects RCP-09's substance. The asset tree, its enforcement proof, and the three real vendored files all landed exactly as specified; the two deviations are honest, recorded limitations on a folder and a hash that the plan's own acceptance criteria never required to be present.

## Issues Encountered

None beyond the deviations above.

## User Setup Required

**One follow-up requires manual action before the recipe's Windows App package can be assembled.** A packager with Microsoft Entra ID Global/User/License Administrator access must:
1. Run `winget download --id 9N1F85V9T8BN --source msstore --architecture=x64 -d <destination> --accept-package-agreements --accept-source-agreements --skip-license` from an authenticated session.
2. Run `Get-FileHash -Algorithm SHA256 -Path <downloaded .msix>` and record the result in `assets/recipes/06-walk-up-avd-kiosk/windows-app/WINDOWS-APP-MSIX.md`, replacing the "could not be computed" section.

This is documented in `WINDOWS-APP-MSIX.md` itself; it does not block this plan or any later plan in Phase 155, since no later plan in this phase reads the MSIX's hash.

## Verbatim Evidence (per plan `<output>` requirement)

**`git check-ignore -v` — every added/modified path, both tasks (all exit 1, no output, no match):**
```
$ git check-ignore -v assets/recipes/06-walk-up-avd-kiosk/assigned-access/production.xml ; echo exit=$?
exit=1
$ git check-ignore -v assets/recipes/06-walk-up-avd-kiosk/NOTICE ; echo exit=$?
exit=1
$ git check-ignore -v assets/recipes/06-walk-up-avd-kiosk/windows-app/Deploy-WindowsApp.ps1 ; echo exit=$?
exit=1
$ git check-ignore -v assets/recipes/06-walk-up-avd-kiosk/windows-app/Detect-WindowsApp.ps1 ; echo exit=$?
exit=1
$ git check-ignore -v assets/recipes/06-walk-up-avd-kiosk/windows-app/WindowsApp_AutoLogon.xml ; echo exit=$?
exit=1
```
No path collided with any `.gitignore` pattern; no scoped negation was needed.

**GitHub API confirmation — commit exists, at `17e1c09b4883ea2062bef801ae24bbc9722861d7`:**
```
$ curl -s "https://api.github.com/repos/Azure/WindowsAppKiosk/commits/17e1c09b4883ea2062bef801ae24bbc9722861d7" | grep '"sha"'
  "sha": "17e1c09b4883ea2062bef801ae24bbc9722861d7",
```

**Directory listing at the pinned ref — `source/WindowsApp/Apps/WindowsApp`:**
```
dir  Dependencies                  9639fad6fab68fc1e1d3ea11613bd6265c4d198d
file Deploy-WindowsApp.ps1         256047e92ef5fb2e85113b91eaac0b232f55f859
file Detect-WindowsApp.ps1         885e2c1127134e063f431c4c176b9ac47c367633
file README.md                     f3e5453004be8ff841cd0d2617026cef6b737358
```

**Directory listing at the pinned ref — `source/WindowsApp/AssignedAccess/ShellLauncher` (confirming `WindowsApp_AutoLogon.xml`):**
```
file WindowsApp.xml
file WindowsApp_AutoLogon.xml
```

**Break-and-restore experiment — all four link-checker outputs, verbatim:**
```
=== BEFORE (baseline, file present) ===
check-nav-hub-links summary: 0 hub-presence failure(s), 0 corpus-link failure(s), 0 total

=== RENAME (break) ===
Corpus-link failures (every relative link under docs/):
docs/recipes/06-walk-up-avd-kiosk-autologon.md:115 -> [production.xml](../../assets/recipes/06-walk-up-avd-kiosk/assigned-access/production.xml)  -- target file not found: assets/recipes/06-walk-up-avd-kiosk/assigned-access/production.xml
check-nav-hub-links summary: 0 hub-presence failure(s), 1 corpus-link failure(s), 1 total
exit=1

=== RESTORE ===
(no output)

=== AFTER (restored) ===
check-nav-hub-links summary: 0 hub-presence failure(s), 0 corpus-link failure(s), 0 total
```
`git status --porcelain -- assets/` after the restore showed only `?? assets/` (the tree was still untracked at that point in Task 1, before the commit) — no leftover `.bak` file.

**`sweep3.py` — RE-237, scratch-directory instrument, after both commits:**
```
$ find <scratch>/docs/recipes -name '*.md' | wc -l
1
$ python scripts/docs-style/sweep3.py <scratch> scripts/docs-style/_CONTENT-PINS.txt
DRY RUN -- 1 files, 562 pins loaded
       1  sign-in-to
       0  admin
       0  admins
       0  vs
       0  config
       0  desired
       1  TOTAL edits
  protected (em dashes left alone):
      42  table row
       4  validator-pinned string
```
1 file loaded, 1 total edit — unchanged from the pre-existing `:19` "sign into" residual this phase is scoped not to touch (Phase 156 batch-10 scope). The new sentence added at `:115` introduced zero new style violations.

**Pinned SHA and every vendored/written file's SHA256:**

| File | SHA256 (bytes as written to the repo) | Bytes |
|---|---|---|
| `assets/recipes/06-walk-up-avd-kiosk/windows-app/Deploy-WindowsApp.ps1` | `4bd19b9a5a3d1be3c9ee29f9064cb0b2810d334658d46cf952c62bca5d8d7aa3` | 14448 |
| `assets/recipes/06-walk-up-avd-kiosk/windows-app/Detect-WindowsApp.ps1` | `2af252e4ccbaad39051a6f22662f2842ab55c0e4423afb245a6fa029d5880190` | 954 |
| `assets/recipes/06-walk-up-avd-kiosk/windows-app/WindowsApp_AutoLogon.xml` | `7d68ee88cfe04c8b3d8bdbdb10b1f30318c51ba2c33b2a372a59a907f83ee258` | 1153 |

Pinned commit SHA for all three: `17e1c09b4883ea2062bef801ae24bbc9722861d7` (`Azure/WindowsAppKiosk`). SHA256 values are of the final committed bytes (upstream body plus the inserted provenance block), matching what a reader can reproduce locally with `sha256sum` against the tracked file — not a separately-recorded pre-provenance hash.

## Next Phase Readiness

- `assets/recipes/06-walk-up-avd-kiosk/` exists, is tracked, is enforced by a real link, and carries production content plus three vendored files with recorded provenance — plan 155-03's Kiosk Baseline and remediation assets can extend the same tree and `NOTICE` convention.
- `production.xml` is the single source of truth the phase's own D-36 byte-equality check will re-verify after plan 155-05's own RE-237 edits.
- The MSIX SHA256 gap is documented, not blocking — no later plan in this phase reads it.
- `docs/` outside RE-237`:115` is untouched by this plan (`git diff --stat 6bee4d39..5c57ee49 -- docs/` shows only the one-line RE-237 change).
- No blockers for the next plan in this phase.

## Self-Check: PASSED

- `assets/recipes/06-walk-up-avd-kiosk/NOTICE` exists on disk: FOUND
- `assets/recipes/06-walk-up-avd-kiosk/assigned-access/production.xml` exists on disk: FOUND
- `assets/recipes/06-walk-up-avd-kiosk/windows-app/Deploy-WindowsApp.ps1` exists on disk: FOUND
- `assets/recipes/06-walk-up-avd-kiosk/windows-app/Detect-WindowsApp.ps1` exists on disk: FOUND
- `assets/recipes/06-walk-up-avd-kiosk/windows-app/WindowsApp_AutoLogon.xml` exists on disk: FOUND
- `assets/recipes/06-walk-up-avd-kiosk/windows-app/WINDOWS-APP-MSIX.md` exists on disk: FOUND
- Both claimed commit hashes exist in `git log --oneline --all`: FOUND (92673910, 5c57ee49)

---
*Phase: 155-rcp-walk-up-avd-kiosk-recipe-formalization*
*Completed: 2026-09-03*
