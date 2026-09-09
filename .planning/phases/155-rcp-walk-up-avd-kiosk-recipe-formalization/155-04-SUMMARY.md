---
phase: 155-rcp-walk-up-avd-kiosk-recipe-formalization
plan: 04
subsystem: docs-content
tags: [rcp-06, rcp-07, rcp-08, rcp-10, assignedaccess-csp, shell-launcher, licensing-matrix, source-bytes-fetch, playwright-render]

# Dependency graph
requires:
  - phase: 155-rcp-walk-up-avd-kiosk-recipe-formalization
    provides: "plan 155-01's D-05 flip-first amendment, V-135-RECIPE pin retirement (unblocking RE-224 prose edits) and 155-GATE-BASELINE.json"
provides:
  - "155-RCP10-CLAIMS.json: both RCP-10 external claims and RCP-08's out-of-scope remedy clause, each re-confirmed against source bytes fetched during this plan's own execution (not copied from 155-RESEARCH.md), committed before any prose edit"
  - "RE-222's three [ASSUMED] markers reconciled: Step 5a autologon-routing callout (worded per claim_1's durable positive), Step 4 reset field names field-resolved to three named registry values, Step 5a offline-license marker field-resolved as a negative finding"
  - "RE-224's three corrections landed: anti-feature row narrowed in place (autologon-multi-app arm added, table still 12 rows), Step 6 data type confirmed tenant-observed, Shell Launcher prerequisite extended without asserting the unverified activation mechanism"
  - "Licensing consequence propagated to docs/reference/licensing-matrix.md's Feature-to-License Mapping: incumbent Windows Subscription Activation row amended (not a new row) plus a new blockquote stating the per-user-vs-per-device consequence and the remedy as reasoning, not observation; Version History row inserted newest-first with the file's no-trailing-newline final byte preserved"
affects: [155-05-rcp-09-10-content-corrections, 155-06-registration-and-promotion, 156-style-extension-full-landing-verification]

# Actuals (#2632)
actuals:
  tokens: 8400
  tasks: 3
  commits: 3

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Rendered-DOM text extraction over WebFetch for a JS-rendered Learn page: Playwright browser_navigate + browser_evaluate reading document.querySelector('main').innerText and <meta> tags returns the actual served source bytes, not an LLM-produced summary of them -- avoids this project's recorded WebFetch same-URL-contradiction failure mode (D-42) while still working around the bare-curl skeleton-HTML pitfall RESEARCH.md documented."
    - "Two independent targeted full-text searches (learn.microsoft.com/search) on both the error code and the error string, recorded as found-with-citation or not-found-with-the-query-used, close the specific 'did I just not look hard enough' gap an absence-based disposition otherwise leaves open."

key-files:
  created:
    - .planning/phases/155-rcp-walk-up-avd-kiosk-recipe-formalization/155-RCP10-CLAIMS.json
  modified:
    - docs/recipes/01-shared-windows-avd-client.md
    - docs/recipes/03-windows-11-multi-app-kiosk.md
    - docs/reference/licensing-matrix.md

key-decisions:
  - "Claim 1 resolved POSITIVE per D-43: Azure/WindowsAppKiosk's solution-specific README and its AssignedAccess/ folder listing at pinned SHA 17e1c09b enumerate exactly two modes (MultiApp, ShellLauncher). No negative single-variant assertion recorded in either direction, and the disposition text was written to avoid the literal phrase this plan's own automated check regex-tests for."
  - "Claim 2 resolved UNVERIFIED for the activation mechanism, matching the predicted outcome -- no HALT. Microsoft's AssignedAccess CSP page states the ShellLauncher gate in edition-only terms; two targeted Learn searches for a first-party troubleshooting article on the Intune error code/string found none (one Q&A response states the code itself 'is not a specific error'); the corroborating GitHub issue (#508, explicitly Windows 11 Pro) matches the edition-only gate, not an activation gate."
  - "RCP-08 amended the incumbent Windows Subscription Activation row rather than adding a new row -- RCP-08's finding is about the same licensed feature failing on a userless device, and its remedy is not a licence SKU, so a new row's Minimum License cell would have no natural value (D-46's own reasoning, confirmed correct at execute time)."
  - "The Version History row was inserted by matching the file's exact final line verbatim in an Edit old_string/new_string pair, prepending the new row above it -- this preserves the file's no-trailing-newline final byte without a manual byte-level patch."
  - "Three blockquotes exceeded C17 assertion 12's 200-char cap on first draft (RE-222 x2, licensing-matrix.md x1) and were split into shorter, blank-line-separated blockquotes rather than shortened prose -- caught by a Python re-check against the same joined-consecutive-line logic C17 itself uses, before running C17."

requirements-completed: [RCP-06, RCP-07, RCP-08, RCP-10]

coverage:
  - id: D1
    description: "Both RCP-10 external claims and RCP-08's out-of-scope remedy clause re-confirmed against source bytes fetched during this plan's execution, recorded with sources/timestamps/dispositions/governed-sites, and committed alone before any prose edit"
    requirement: "RCP-10"
    verification:
      - kind: other
        ref: "node -e (155-RCP10-CLAIMS.json schema check: all 3 keys, non-empty disposition/sources/governs_sites) -- RCP-10 claims artifact OK"
        status: pass
      - kind: other
        ref: "node -e (claim_1.disposition negative/positive regex check) -- POSITIVE"
        status: pass
    human_judgment: false
  - id: D2
    description: "RE-222's three [ASSUMED] markers reconciled at their named sites; out-of-scope third marker untouched; three frozen headings byte-unchanged; re-stamped"
    requirement: "RCP-06"
    verification:
      - kind: other
        ref: "node scripts/validation/check-phase-130.mjs (5 PASS, 0 FAIL) + check-phase-135.mjs (7 PASS, 0 FAIL) before and after"
        status: pass
      - kind: other
        ref: "grep -n '\\[ASSUMED\\]' docs/recipes/01-shared-windows-avd-client.md -- exactly one line, the out-of-scope RDP marker"
        status: pass
    human_judgment: false
  - id: D3
    description: "RE-224's three corrections landed at their named sites; anti-feature table still 12 rows with outbound link preserved byte-for-byte; no unverified mechanism stated as fact"
    requirement: "RCP-07"
    verification:
      - kind: other
        ref: "node scripts/validation/check-phase-135.mjs (7 PASS, 0 FAIL, all six content-assertion detail lines quoted below)"
        status: pass
      - kind: other
        ref: "grep -n '^| Feature |' docs/recipes/03-windows-11-multi-app-kiosk.md -- exactly one match, at line 43"
        status: pass
    human_judgment: false
  - id: D4
    description: "Licensing consequence propagated to docs/reference/licensing-matrix.md without corrupting the file's no-trailing-newline final byte; remedy clause worded as reasoning, not observation"
    requirement: "RCP-08"
    verification:
      - kind: other
        ref: "tail -c 1 docs/reference/licensing-matrix.md | xxd -p -- 7c (pipe character, no newline)"
        status: pass
      - kind: other
        ref: "node scripts/validation/check-phase-153.mjs (apex, non-nested) -- 111 PASS, 0 FAIL, 0 SKIPPED"
        status: pass
    human_judgment: false

duration: ~20min
completed: 2026-09-03
status: complete
---

# Phase 155 Plan 04: RCP-06/07/08/10 Content Corrections Summary

**Re-fetched both RCP-10 external claims as source bytes (Playwright DOM extraction, not WebFetch summarization), then landed all six named RE-222/RE-224 reconciliation corrections and propagated the licensing consequence to the matrix, preserving its no-trailing-newline final byte.**

## Performance

- **Duration:** ~20 min
- **Started:** 2026-09-02T22:59:48-05:00 (approximate, first fetch after reading required context)
- **Completed:** 2026-09-02T23:18:38-05:00 (Task 3 commit)
- **Tasks:** 3 completed
- **Files modified:** 4 (1 created, 3 modified) across 3 commits

## Accomplishments

- **Task 1:** Re-confirmed both RCP-10 claims against source bytes fetched this session (not copied from `155-RESEARCH.md`) and committed `155-RCP10-CLAIMS.json` alone, before any prose edit. Claim 1 resolved POSITIVE (Azure/WindowsAppKiosk's solution-specific README and AssignedAccess/ folder listing enumerate exactly two modes at pinned SHA `17e1c09b`). Claim 2 resolved UNVERIFIED for the activation mechanism, matching the predicted outcome — no HALT. RCP-08's remedy clause recorded as neither sourced nor pilot-observed.
- **Task 2:** Landed RE-222's three reconciliation corrections: a new Step 5a callout routing autologon readers to RE-237 (worded per claim_1's positive disposition), the Step 4 reset field names field-resolved to three named registry values delivered by an install parameter, and the Step 5a offline-license marker field-resolved as a negative finding. The out-of-scope third `[ASSUMED]` marker (console-vs-RDP) was left untouched; all three frozen heading literals stayed byte-unchanged.
- **Task 3:** Landed RE-224's three corrections (anti-feature row narrowed in place at 12 rows, Step 6 data type confirmed tenant-observed, Shell Launcher prerequisite extended without asserting the unverified mechanism) and propagated the licensing consequence into `docs/reference/licensing-matrix.md`'s Feature-to-License Mapping by amending the incumbent Windows Subscription Activation row and adding a new blockquote, plus a newest-first Version History row that preserved the file's no-trailing-newline final byte.

## Task Commits

Each task was committed atomically:

1. **Task 1: Re-confirm both RCP-10 claims and commit dispositions** - `3275bc5a` (docs)
2. **Task 2: Land RCP-06's three corrections in RE-222** - `36225814` (fix)
3. **Task 3: Land RCP-07's three corrections in RE-224 and propagate to the licensing matrix** - `c49af29a` (fix)

**Plan metadata:** committed together with this SUMMARY (see final commit below).

## Files Created/Modified

- `.planning/phases/155-rcp-walk-up-avd-kiosk-recipe-formalization/155-RCP10-CLAIMS.json` - New measurement artifact: both RCP-10 claim dispositions plus RCP-08's remedy-clause disposition, each with fetched sources, retrieval timestamps, verbatim evidence, served-revision identifiers, and governed document sites
- `docs/recipes/01-shared-windows-avd-client.md` - RCP-06(a)/(b)/(c): Step 5a autologon-routing callout, Step 4 reset field names field-resolved, Step 5a offline-license marker field-resolved as negative; re-stamped
- `docs/recipes/03-windows-11-multi-app-kiosk.md` - RCP-07(a)/(b)/(c): anti-feature row narrowed in place, Step 6 data type confirmed tenant-observed, Shell Launcher prerequisite extended per claim_2's UNVERIFIED disposition; re-stamped
- `docs/reference/licensing-matrix.md` - RCP-08: incumbent Windows Subscription Activation row amended, new blockquote with the per-user-vs-per-device consequence and remedy reasoning, Version History row inserted newest-first; re-stamped

## Decisions Made

- **Claim 1 (positive framing, D-43):** Confirmed via GitHub API + raw source bytes at pinned SHA `17e1c09b4883ea2062bef801ae24bbc9722861d7` — `source/WindowsApp/README.md` enumerates exactly two deployment modes, and `source/WindowsApp/AssignedAccess/` contains exactly two subfolders (`MultiApp`, `ShellLauncher`). Disposition worded to state only the positive claim ("the reference implementation's shipped pattern for this device class is multi-app autologon"), with no assertion in either direction about a missing single-app variant — verified against this plan's own regex acceptance check.
- **Claim 2 (UNVERIFIED, no HALT, D-44):** Fetched Microsoft's AssignedAccess CSP reference via Playwright DOM-text extraction (not WebFetch, per D-42's fetch-discipline rule and this project's own recorded WebFetch-contradiction incident). The gate is stated in edition-only terms: *"Shell Launcher as a feature and the ShellLauncher node both require Windows Enterprise or Windows Education to function. The ShellLauncher node is not supported in Windows 10 Pro."* Two targeted `learn.microsoft.com/search` queries (on the Intune error code and on the error string) found no first-party troubleshooting article naming either — one Microsoft Q&A response states the error code itself "is not a specific error," a generic Intune remediation-failure code reused across unrelated policy classes. The corroborating GitHub issue (`microsoft/Windows-iotcore-samples#508`, "Shell Launcher V2 is not working on Windows 11 Pro 22H2") reports the identical `Class is not licensed for use` string on a device explicitly stated as Windows 11 Pro — an edition failure matching the fetched gate table, not an activation failure. This outcome matches the predicted resolution, so no HALT and no expansion of Task 2/3 scope.
- **RCP-08 lands as an amendment, not a new row:** the incumbent Windows Subscription Activation row already carries the subject (per-user subscription activation), and RCP-08's answer is not a licence SKU, so a new row's Minimum License cell would have no natural, honest value.
- **Version History insertion preserves the no-trailing-newline final byte:** matched the file's exact final line as the Edit `old_string`, with the new row prepended in `new_string` — this is a text-level operation that cannot introduce a trailing newline, unlike a shell `>>` append.

## Deviations from Plan

None — plan executed exactly as written. Three blockquotes (two in RE-222, one in `licensing-matrix.md`) exceeded C17 assertion 12's 200-character cap on first draft; each was caught by an independent Python re-implementation of C17's own joined-consecutive-blockquote-line logic before running C17 itself, and split into shorter blank-line-separated blockquotes. This is execution care within Task 2/3's own acceptance criteria, not a deviation from the plan's scope.

## Claim Dispositions (verbatim, per `<output>`)

**Claim 1 — positive, sourced this session:**

> The durable, sourceable statement is that the reference implementation's shipped pattern for this device class is multi-app autologon. Azure/WindowsAppKiosk's solution-specific documentation (source/WindowsApp/README.md, pinned SHA 17e1c09b4883ea2062bef801ae24bbc9722861d7) enumerates exactly two deployment modes for the Windows App kiosk solution -- Multi-App Kiosk Mode and Shell Launcher Mode -- and the AssignedAccess/ folder at the same pinned SHA contains exactly two subfolders matching those modes, MultiApp/ and ShellLauncher/. RCP-06(a) and RCP-07(a) may state this positive claim as fact.

Sources: `https://api.github.com/repos/Azure/WindowsAppKiosk` (2026-09-03T04:06:02Z), `.../commits/17e1c09b...` (2026-09-03T04:06:03Z), `.../contents/source/WindowsApp/AssignedAccess?ref=17e1c09b...` (2026-09-03T04:06:04Z), `https://raw.githubusercontent.com/Azure/WindowsAppKiosk/17e1c09b.../source/WindowsApp/README.md` (2026-09-03T04:06:05Z), same repo's root `README.md` for context only (2026-09-03T04:06:33Z).

**Claim 2 — UNVERIFIED, matching the predicted outcome, no HALT:**

> UNVERIFIED for the activation mechanism, matching the predicted outcome. No first-party sentence fetched this session -- on the AssignedAccess CSP reference page itself, nor via two targeted searches for a troubleshooting article naming the specific Intune error code or error string -- states or implies that the ShellLauncher node's licensing gate depends on activation status as distinct from edition. The only first-party statement of the gate is edition-only... The corroborating GitHub issue's root cause (Windows 11 Pro, an edition failure) matches this edition-only gate and does not corroborate an activation-based mechanism.

Sources: `https://learn.microsoft.com/en-us/windows/client-management/mdm/assignedaccess-csp` (2026-09-03T04:08:52Z, Playwright DOM extraction, `git_commit_id` meta `aeb8f2bbd5d93e85c6f2a46e2705928aa1df9c9e`, `ms.date` 2025-03-12), `https://learn.microsoft.com/en-us/search/?terms=%22-2016281112%22` (2026-09-03T04:09:05Z), `https://learn.microsoft.com/en-us/search/?terms=%22Class%20is%20not%20licensed%20for%20use%22` (2026-09-03T04:09:11Z), `https://api.github.com/repos/microsoft/Windows-iotcore-samples/issues/508` (2026-09-03T04:09:20Z).

**RCP-08 remedy clause — reasoned, not observed:**

> The remedy clause is neither first-party-sourced nor pilot-observed -- the pilot never tested a volume key, a MAK activation, or purpose-built (already-activated) hardware... It will instead be worded as the reasoned consequence of the licensing structure already documented in this repository's own RE-237 Step 4 content... attributed explicitly to reasoning from the licensing structure, not to a test that was run.

## check-phase-135.mjs Content-Assertion Detail Lines (final run)

```
[RECIPE/7] V-135-RECIPE: docs/recipes/03-windows-11-multi-app-kiosk.md exists, non-empty, H1 + content needles present PASS
[ROLLBACKORDER/7] V-135-ROLLBACKORDER: ## Rollback/Recovery between ## Verification and ## Configuration-Caused Failures PASS
[RECIPE01ZEROEDIT/7] V-135-RECIPE01ZEROEDIT: docs/recipes/01-shared-windows-avd-client.md Step 5a/5b headings unchanged (zero-edit tripwire) PASS
[XMLFENCE/7] V-135-XMLFENCE: exactly one column-0 ```xml fence present in docs/recipes/03-windows-11-multi-app-kiosk.md PASS
[NAMESPACETABLE/7] V-135-NAMESPACETABLE: 3-row namespace/version-floor table present in docs/recipes/03-windows-11-multi-app-kiosk.md PASS
[ANTIFEATURE/7] V-135-ANTIFEATURE: anti-feature table carries 12 rows in docs/recipes/03-windows-11-multi-app-kiosk.md PASS

Result: 7 PASS, 0 FAIL, 0 SKIPPED
```

## sweep3.py Scratch-Directory Residual (final run, all three edited documents)

Per plan 155-01's own recorded finding, sweep3.py's printed `%d files` is a touched-file count (files with ≥1 non-protected edit), not a scanned/loaded count. Non-vacuity is independently proven both ways below: a direct filesystem count of the `.md` file present under each scratch root, and sweep3.py's own non-zero `protected` counts (only emitted when the file was actually read and tokenized).

| Document | Files present (filesystem) | sweep3.py touched-files | Total edits | Protected (non-vacuity proof) |
|---|---|---|---|---|
| `docs/recipes/01-shared-windows-avd-client.md` | 1 | 0 | 0 | 38 table row + 4 validator-pinned string = 42 |
| `docs/recipes/03-windows-11-multi-app-kiosk.md` | 1 | 0 | 0 | 64 table row + 1 validator-pinned string = 65 |
| `docs/reference/licensing-matrix.md` | 1 | 0 | 0 | 29 table row (up from the phase baseline's 28, matching the one new table row added) |

All three: `DRY RUN -- 0 files, 562 pins loaded / 0 TOTAL edits`, never run with `--apply`.

## RCP-08 Disposition: Amended the Incumbent Row, Did Not Add a New Row

Amended `docs/reference/licensing-matrix.md:62`, the existing "Windows Subscription Activation (Pro→Enterprise)" row, rather than adding a new row. The incumbent row already carries the exact subject RCP-08's finding is about (per-user Windows Subscription Activation), and RCP-08's answer — "a device-scoped activation path is needed instead" — is not a licence SKU a new row's `Minimum License` cell could honestly hold. A new blockquote states the durable consequence and the remedy; a new Version History row records the change, inserted above the pre-existing row to preserve the file's no-trailing-newline final byte.

## Final Wording of the Three Governed Passages

**RE-224 `:29` (RCP-07(c), Shell Launcher prerequisite):**
> **This recipe is NOT:** the single-app kiosk experience (one UWP app or Microsoft Edge running full-screen—see the following anti-feature table), Shell Launcher (a shell replacement; Microsoft's own AssignedAccess CSP reference states the gate in edition-only terms—not supported on Pro—and no first-party page names activation status as a separate factor. **Pilot-observed, one tenant:** the node also failed with `Class is not licensed for use` on an installed Enterprise image that was reported as unactivated; that observation is not first-party-documented and is recorded here as what happened, not as why), Shared PC mode, or Entra "Shared device mode" (SDM/Global Sign-Out is iOS/Android-only).

**RE-224 `:53` (RCP-07(a), anti-feature row, "Do this instead" cell):**
> Where the sole allow-listed app performs its own sign-in, autologon multi-app is the correct arm—it is the reference implementation's shipped pattern for that device class; see [Walk-Up AVD Kiosk (RE-237)](06-walk-up-avd-kiosk-autologon.md). If the device needs autologon into one fixed app, that is the **single-app** case, not this one — see [Step 5a: Kiosk configuration](../recipes/01-shared-windows-avd-client.md#step-5a-kiosk-configuration)

**`licensing-matrix.md` Feature-to-License Mapping (RCP-08, new blockquotes):**
> **Self-deploying kiosk consequence:** a per-user entitlement cannot license a device nobody signs into, so a self-deploying kiosk never triggers per-user Windows Subscription Activation.
>
> This needs a device-scoped activation path instead. A per-device volume key (MAK) is the reasoned option for an Entra-only, internet-only kiosk.
>
> Not pilot-tested—stated as reasoning from the licensing structure, not as an observation.
>
> See [Walk-Up AVD Kiosk (RE-237)](../recipes/06-walk-up-avd-kiosk-autologon.md) for the worked case.

No sentence in either RE-224 or `licensing-matrix.md` asserts the activation mechanism as fact; the volume-key remedy is explicitly labelled "Not pilot-tested."

## Final Gate Run (end of plan)

```
check-phase-130.mjs:        5 PASS, 0 FAIL, 0 SKIPPED
check-phase-135.mjs:        7 PASS, 0 FAIL, 0 SKIPPED
check-nav-hub-links.mjs:    0 hub-presence failure(s), 0 corpus-link failure(s), 0 total
c17-eee-contract.mjs:       237 files checked, 0 with violations, 0 total violations (assertion #12 = 0)
conflict-marker sweep:      git grep exit=1 (no matches)
check-phase-153.mjs (apex): 111 PASS, 0 FAIL, 0 SKIPPED (non-nested)
```

`git diff --exit-code HEAD -- scripts/docs-style/_CONTENT-PINS.txt` exits 0 (unchanged). `tail -c 1 docs/reference/licensing-matrix.md` is `7c` (a pipe character, no trailing newline). Registry row count unchanged at 236 (`grep -c '^| RE-' docs/_registry/RE-index.md`).

## Issues Encountered

None beyond the three over-length blockquotes caught and fixed during execution (see Deviations above — not treated as a deviation since it is normal acceptance-criteria compliance work, not unplanned scope).

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Plan 155-05 (RCP-09/RCP-10 content corrections in RE-237 itself) can consume `155-RCP10-CLAIMS.json`'s `claim_2` disposition directly for RE-237`:31` — the same UNVERIFIED, no-HALT disposition this plan already applied to RE-224 and the licensing matrix.
- **Forward note for Phase 156:** this plan rewrote 3 of Phase 156's 13 batch-10 documents (`docs/recipes/01-shared-windows-avd-client.md`, `docs/recipes/03-windows-11-multi-app-kiosk.md`, `docs/reference/licensing-matrix.md`) — Phase 156 must re-measure these three documents' own baselines rather than inherit `155-RESEARCH.md`'s or `155-GATE-BASELINE.json`'s pre-execution figures (VERIFY-01's staleness caveat, D-53). RE-224's line count remains un-pinned by `check-phase-135.mjs` per plan 155-01's D-10 retirement, but its five remaining `V-135-*` content assertions still apply and must survive Phase 156's own restyle pass.
- No blockers for plan 155-05 or 155-06.

## Self-Check: PASSED

- `.planning/phases/155-rcp-walk-up-avd-kiosk-recipe-formalization/155-RCP10-CLAIMS.json` exists on disk: FOUND
- `docs/recipes/01-shared-windows-avd-client.md` exists on disk: FOUND
- `docs/recipes/03-windows-11-multi-app-kiosk.md` exists on disk: FOUND
- `docs/reference/licensing-matrix.md` exists on disk: FOUND
- All 3 claimed commit hashes exist in `git log --oneline --all`: FOUND (3275bc5a, 36225814, c49af29a)

---
*Phase: 155-rcp-walk-up-avd-kiosk-recipe-formalization*
*Completed: 2026-09-03*
