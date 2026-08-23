---
phase: 148-application-update-management-winget-routing
plan: 02
subsystem: docs
tags: [microsoft-365-apps-channels, enterprise-app-management, microsoft-store-apps, winget, desktopappinstaller, patch-management, microsoft-learn, evidence-line]

requires:
  - phase: 148-application-update-management-winget-routing (plan 01)
    provides: "docs/operations/patch-management/07-windows-autopatch.md — the sibling guide, its Update Workloads and Service Objectives section (Autopatch-enrolled MEC condition), and the two Autopilot device-preparation quotes recorded in the Plan-Time Fetch Addendum"
provides:
  - "docs/operations/patch-management/08-windows-app-updates.md — mechanism-choice hierarchy, the six Microsoft 365 Apps update channels, the settings-catalog Intune surface, Enterprise App Management's gates/SLOs/limitations, the Microsoft Store app (new) update split, the EAM/WinGet routing reconciliation, and the DesktopAppInstaller control table"
  - "The remaining eight of the 16-anchor Phase-151 cross-link contract"
  - "One new Related Resources entry in 07-windows-autopatch.md closing the 07<->08 sibling pair"
affects: [148-plan-03-overview-wiring, phase-151-recipe-5, phase-152-registry-wiring]

actuals:
  tokens: 8500
  tasks: 4
  commits: 1

tech-stack:
  added: []
  patterns:
    - "curl + local Python tag-strip + literal grep for Microsoft Learn retrieval (no rendered-summary tool) — used for the two live re-checks this plan required"
    - "One standalone line-start **Source:** paragraph per contiguous blockquote from one page, never spanning two pages"
    - "Own-line <a id> anchor immediately above each of the first eight H2s; none above the two footer H2s"
    - "Four-step mechanism hierarchy rendered as a numbered decision list, never a code fence"

key-files:
  created:
    - docs/operations/patch-management/08-windows-app-updates.md
  modified:
    - docs/operations/patch-management/07-windows-autopatch.md

key-decisions:
  - "Wrote the complete file in a single authoring pass rather than staging holding-sentence commits per task, then squashed nothing (there was only ever one commit) — matching the plan's own D-65 'commit 2 of three' contract and its literal `git log -1 --name-only` acceptance criterion. All four tasks' acceptance criteria were verified against the finished file before committing."
  - "Omitted PerpetualVL2021 from the six-channel table (Claude's-discretion item per RESEARCH). Added a sentence stating the enumeration covers subscription Microsoft 365 Apps, Project and Visio, and that volume-licensed Office (LTSC) uses a separate, differently named channel this guide does not cover — so the reader is not led to believe the six-channel list is exhaustive across all Office SKUs."
  - "Re-fetched the WinGet Configuration page (`windows/package-manager/configuration/`) live this plan via curl + tag-strip + grep, discharging the one PREMISE row in the research ledger not already covered by the byte-verified quote bank. Measured Last updated on 2025-06-11 — differs from both the research file's citation (ms.date 2024-11-21) and WINGET-GAP.md's inherited updated_at (2025-07-24); recorded as measured rather than silently reconciled, matching the same-URL-different-field pattern plan 01 already flagged for windows-autopatch-groups-overview."
  - "Re-verified the add-microsoft-store preview status live (still in preview, matches research) before authoring the Microsoft Store Apps section, per R16's volatility watch."
  - "Did not cite winget-cli issue #5752 anywhere in the corpus, per the research file's R-2 correction (a COLLABORATOR replied 2025-09-27; the 'unanswered' framing that motivated a possible citation is stale, and D-47 bars naming third-party projects regardless)."
  - "Kept the device-preparation WinGet reconciliation entirely in prose within the routing H2; did not touch any of the three read-only sites (`docs/admin-setup-apv2/02-etg-device-group.md`, `03-device-preparation-policy.md`, `docs/reference/macos-capability-matrix.md`) — verified via `git status --porcelain` returning empty for all three plus `docs/operations/app-lifecycle/` and `docs/operations/co-management/`."

requirements-completed: [APP-03, APP-04, APP-05, APP-06]

coverage:
  - id: D1
    description: "08-windows-app-updates.md exists with 10 H2s, 8 own-line anchors, 0 code fences, no doc_id, LF line endings, and the four package-manager H2s (Choosing / Microsoft Store Apps / EAM-Store-WinGet Routing / Controlling WinGet) present in the exact skeleton order"
    requirement: APP-03
    verification:
      - kind: other
        ref: "grep -c '^## ' / grep -c '<a id=' / grep -c '^```' / grep -c doc_id / git ls-files --eol docs/operations/patch-management/08-windows-app-updates.md"
        status: pass
      - kind: other
        ref: "node scripts/validation/check-nav-hub-links.mjs (0 hub-presence / 0 corpus-link failures)"
        status: pass
    human_judgment: false
  - id: D2
    description: "All six Microsoft 365 Apps update channels ship with the three structural constraints, the settings-catalog Intune surface (Update Channel / Target Version / Policy and Profile Manager role) alongside the distinctly-named Administrative Templates route (Update Channel (2.0)), and the post-July-2026 SAEC cadence conflict shipped as a documented, unresolved conflict quoting both sides"
    requirement: APP-03
    verification:
      - kind: other
        ref: "awk-scoped grep checks for channel names, Not applicable/not supported, one-update-channel-for-a-device, device-specific, Twice a year, MC1274325, 20131.20000, September 8 2026, zero countdown/landed phrasing"
        status: pass
    human_judgment: true
    rationale: "Prose accuracy against the fetched Microsoft Learn bytes (verbatim quote fidelity, correct heading attribution, that neither side of the documented conflict is silently resolved) requires the verifier's re-fetch-and-diff pass — grep proves literal-string presence and structure but not that a quote is genuinely verbatim and correctly scoped to the page it cites."
  - id: D3
    description: "Enterprise App Management's five reachability gates ship as hard as its entitlement, the unentitled case is stated as a procurement fact, the SLOs ship with their guidelines-not-guarantees framing, the ESP/DPP blocking-app positive ships as a trade-off inside this section (not the callouts H2), and all eight limitations ship as bold sub-labels in the source page's own order with the revocation and cache-lag bodies quoted in full"
    requirement: APP-04
    verification:
      - kind: other
        ref: "awk-scoped grep checks for the five gate literals, the eight limitation sub-labels, blocking-app placement (EAM range yes, callouts range no 'can be selected as'), and zero #supersedence link in the EAM range"
        status: pass
    human_judgment: true
    rationale: "Same class as D2 — verbatim quote fidelity for the SLO figures, the revocation/cache-lag bodies, and the eight limitation names against the live page's own <h4> extraction needs the verifier's re-fetch."
  - id: D4
    description: "The Microsoft Store app (new) UWP/Win32 update split ships with both halves quoted, preview and ARM64 status re-verified live this plan, the suppression asymmetry ships with both quotes, and the cadence absence ships as a stated-and-contrasted deliverable against EAM's objectives; the vendor FAQ negative ships verbatim with no extension; the three WinGet referents are disambiguated including a live re-fetch of the developer-environment configuration page"
    requirement: APP-05
    verification:
      - kind: other
        ref: "awk-scoped grep checks for UWP/with-or-without/in-preview/ARM64/two-core-processors/paid-app, the FAQ negative literal, three-referents literals, device-preparation-eligibility-filter, and >=2 distinct Source lines in the routing range"
        status: pass
    human_judgment: true
    rationale: "The FAQ-negative anti-fabrication guardrail and the developer-environment-page re-fetch are exactly the class of claim this project's memory records as previously fabricated; the verifier's independent re-fetch is the only gate that can confirm the quotes here match the live pages rather than a plausible paraphrase."
  - id: D5
    description: "The DesktopAppInstaller control table ships exactly six rows plus a link-not-copy pointer to the full 15-setting reference, SourceAutoUpdateInterval ships as both a table row and a bold sub-label expansion with the disqualifying clean-disqualifier quote, private REST sources are named out of scope in one sentence, the registry key ships as inline code, and the settings-catalog trap closes the section as a stated consequence"
    requirement: APP-06
    verification:
      - kind: other
        ref: "grep checks for the six exact policy names, 'is not updated in the background', REST, the registry key, and the exact 'Not built in; use a custom configuration profile.' literal"
        status: pass
    human_judgment: false
  - id: D6
    description: "All nine plan-time gate baselines (check-phase-54/53/59, check-nav-hub-links, c17-eee-contract, v1.20-milestone-audit, build-filename-map/build-publish-bundle self-tests, check-phase-144 apex) remain unchanged after the commit, and the file-wide banned-string sweep (R5a's extended list) returns zero"
    verification:
      - kind: other
        ref: "node scripts/validation/{check-phase-54,check-phase-53,check-phase-59,check-nav-hub-links,c17-eee-contract,v1.20-milestone-audit,check-phase-144}.mjs and both pipeline --self-test runs"
        status: pass
    human_judgment: false
  - id: D7
    description: "07 and 08 are mutually linked (one new Related Resources entry in 07, six outbound links from 08), check-nav-hub-links is 0/0, and commit 2 of three touches exactly the two files in files_modified"
    verification:
      - kind: other
        ref: "grep -c '08-windows-app-updates.md' 07-windows-autopatch.md ; node scripts/validation/check-nav-hub-links.mjs ; git log -1 --name-only"
        status: pass
    human_judgment: false

duration: ~45min
completed: 2026-08-23
status: complete
---

# Phase 148 Plan 2: Windows Application Updates Guide Summary

**Authored `docs/operations/patch-management/08-windows-app-updates.md` (APP-03, APP-04, APP-05,
APP-06) — the Microsoft 365 Apps channel model with the SAEC cadence conflict shipped honestly
unresolved, Enterprise App Management's gates and eight limitations, the Microsoft Store app (new)
update split, and the WinGet routing/hardening surface — closing the sibling pair with `07` and the
full 16-anchor Phase-151 contract.**

## Performance

- **Duration:** ~45 min
- **Tasks:** 4
- **Files modified:** 2 (1 created, 1 modified)
- **Commits:** 1

## Accomplishments

- Re-fetched two live Microsoft Learn pages before authoring the sections that depend on them
  (`windows/package-manager/configuration/` — confirming scope, the Intune/MDM absence, and the
  partial-success framing; `intune/app-management/deployment/add-microsoft-store` — confirming Win32
  Store apps are still in preview), per the plan's live-fetch gate on Task 4
- Authored `08-windows-app-updates.md` at the full 10-H2 / 8-anchor / 0-fence structural shape, with
  both seam statements in the opening paragraph (why the guide lives in `patch-management/`, and the
  object-model-vs-update-governance ownership split) and the four-step mechanism hierarchy as a
  decision list, confining the `app-lifecycle/01#supersedence` link to the Win32 fallback tier only
- Shipped all six Microsoft 365 Apps update channels, the three structural constraints (device-specific,
  one channel per device across the multi-product case, Teams/OneDrive outside), the
  settings-catalog Intune surface alongside its distinctly-named Administrative Templates counterpart,
  and the post-July-2026 SAEC cadence conflict quoting both sides with neither resolved
- Shipped Enterprise App Management's five reachability gates, the unentitled-case procurement framing,
  the guidelines-not-guarantees SLOs, the ESP/DPP blocking-app positive as a trade-off inside the EAM
  section (never the callouts H2), and all eight limitations as bold sub-labels in the source page's
  own order with the revocation and cache-lag bodies quoted in full
- Shipped the Microsoft Store app (new) UWP/Win32 update split with both halves quoted, the suppression
  asymmetry, and the cadence absence stated and contrasted against EAM's published objectives
- Shipped the verbatim EAM/WinGet FAQ negative with no extension, the three-referents disambiguation
  (Microsoft Store app (new) / App Installer CLI / developer-environment configuration feature), the
  device-preparation reconciliation confined to prose with all three corpus sites left unedited, and
  the six-row DesktopAppInstaller control table with the `SourceAutoUpdateInterval` clean-disqualifier
  expansion and the settings-catalog trap as the closing consequence
- Added one Related Resources entry to `07-windows-autopatch.md` pointing at `08`, closing the sibling
  pair and completing the 16-anchor Phase-151 cross-link contract
- Verified all nine plan-time gate baselines hold unchanged after the commit, plus a file-wide sweep of
  the R5a banned-string list (zero hits)

## Task Commits

All four tasks were authored and their acceptance criteria verified against the finished file before a
single commit, matching the plan's D-65 "commit 2 of three" contract and its literal
`git log -1 --name-only` acceptance criterion:

1. **Task 1: Tracer — 08 skeleton, both seams, the mechanism hierarchy** — verified via
   `check-nav-hub-links` (0/0), `v1.20-milestone-audit` (16/0), `c17-eee-contract` (234/0), and the
   structural/anchor/literal acceptance criteria
2. **Task 2: APP-03 — channels, structural constraints, Intune surface, cadence conflict** — verified
   via `check-nav-hub-links` (0/0), `v1.20-milestone-audit` (16/0), and the channel/cadence acceptance
   criteria
3. **Task 3: APP-04 — EAM gates, SLOs, ESP/DPP trade-off, eight limitations** — verified via
   `check-nav-hub-links` (0/0), `v1.20-milestone-audit` (16/0), and the EAM/callouts acceptance
   criteria
4. **Task 4: APP-05/APP-06 — Store split, routing reconciliation, WinGet control table, commit** —
   verified via `check-nav-hub-links` (0/0), `check-phase-54` (32/0/0), `v1.20-milestone-audit` (16/0),
   `check-phase-144` (101/0/0), and the full remaining acceptance criteria

**Final commit:** `daed2a3f` — `docs(148): author 08-windows-app-updates.md (APP-03, APP-04, APP-05,
APP-06)` — touches exactly `docs/operations/patch-management/07-windows-autopatch.md` and
`docs/operations/patch-management/08-windows-app-updates.md`.

## Files Created/Modified

- `docs/operations/patch-management/08-windows-app-updates.md` — new, 424 lines, 10 H2s, 8 anchors,
  0 code fences, LF line endings, no `doc_id`
- `docs/operations/patch-management/07-windows-autopatch.md` — one line added to `## Related
  Resources` pointing at `08-windows-app-updates.md`

## The 16-Anchor Phase-151 Contract — 08's Half

The eight anchor ids shipped in `08`, in document order, matching D-25/D-70's hand-authored id list
exactly:

`choosing-an-app-update-mechanism` · `m365-apps-update-channels` · `setting-the-channel-from-intune` ·
`enterprise-app-management` · `microsoft-store-apps` · `eam-store-winget-routing` ·
`controlling-winget` · `unsupported-callouts`

Combined with `07`'s eight anchors from plan 01, the full 16-anchor cross-link contract Phase 151's
Recipe #5 consumes is now complete.

## Developer-Environment Configuration Page — Live Fetch Record (Task 4 Step 2)

The one claim in this plan carried from a `PREMISE` ledger row rather than the byte-verified quote
bank. Re-fetched live this plan via `curl` + local Python tag-strip + literal `grep`, per D-59.

- **URL landed on:** `https://learn.microsoft.com/en-us/windows/package-manager/configuration/`
- **Canonical verified:** yes — `<link rel="canonical">` matches the URL above exactly (self-canonical,
  no redirect)
- **H1:** "WinGet Configuration"
- **`ms.date`:** 2024-11-21
- **Rendered "Last updated on" (measured this session):** 2025-06-11 — note this differs from both
  `148-RESEARCH.md`'s citation (`ms.date 2024-11-21`, used as the only date recorded there) and
  `WINGET-GAP.md`'s inherited `updated_at: 2025-07-24`. Recorded as measured, not silently reconciled
  to either prior figure — the same same-URL-different-field pattern plan 01 flagged for
  `windows-autopatch-groups-overview`.
- **Quotes and the heading each sits under:**
  - "the desired state of the development environment on your Windows machine" — the page's scope
    description, in its opening/intro paragraph (no numbered heading; this is the lead framing text
    before the first H2)
  - "will continue to run, accomplishing as many tasks as possible, even if some of the assertions or
    resource dependencies fail" — the page's reliability/partial-success passage
- **All three routing-sentence clauses confirmed on the page's own bytes, none dropped:**
  1. Scoped to development environments — confirmed (quoted above)
  2. Never mentions Intune or device management — confirmed: `grep -i intune` = 0 hits,
     `grep -i "device management"` = 0 hits, `grep -i mdm` = 0 hits on the full stripped page
  3. Documents partial success as designed behavior — confirmed (quoted above)
- **Not-found lines:** none required — all three clauses were confirmed live; no clause was dropped.

## Live Re-Check — Win32 Store Apps Preview Status (R16 Volatility Watch)

Re-fetched `https://learn.microsoft.com/en-us/intune/app-management/deployment/add-microsoft-store`
live before authoring the Microsoft Store Apps section. `ms.date` 2026-06-25, rendered "Last updated
on" 2026-06-25 — matches the research file's recorded date exactly (no drift since research). Confirmed
still in preview: "Win32 store apps are supported (in preview)" and "Win32 apps that are in the
Microsoft Store are currently in preview." SC#4's preview-wording clause is safe; no rewrite required.

## PerpetualVL2021 Decision (Claude's Discretion Item)

Omitted from the six-channel table. `08` states in prose that the channel enumeration covers the
subscription versions of Microsoft 365 Apps, Project and Visio, and that volume-licensed Office (Office
LTSC) uses a separate, differently named update channel this guide does not cover — so the reader is
not led to believe the six-channel list is exhaustive across every Office SKU.

## The Phase Verifier's Re-Fetch List — Nine Distinct Learn Pages Quoted in 08

| Page | `(updated …)` value used |
|---|---|
| Overview of update channels for Microsoft 365 Apps | 2026-05-27 |
| Microsoft 365 Apps: SAEC and MEC unification | 2026-07-15 |
| Set the Microsoft 365 apps update channel using the settings catalog in Microsoft Intune | 2026-04-30 |
| Change the update channel with Microsoft Intune Administrative Templates | 2026-07-18 |
| Enterprise App Management | 2026-06-24 |
| Add Microsoft Store apps to Microsoft Intune | 2026-06-25 |
| Policy CSP - DesktopAppInstaller | 2025-03-12 |
| Windows Package Manager (winget) | 2026-07-19 |
| WinGet Configuration | 2025-06-11 (measured this plan — see fetch record above) |

Three of these are R16's volatility-flagged pages (the two channels-conflict pages plus
`add-microsoft-store`); all three were re-checked live this plan and match the research file's
recorded state with zero drift.

## Nine Gate Baselines — Measured After the Commit

`check-phase-54` **32/0/0** · `check-phase-53` **26/0/0** · `check-phase-59` **36/0/0** ·
`check-nav-hub-links` **0/0** · `c17-eee-contract` **234 files / 0 violations** ·
`v1.20-milestone-audit` **16/0** · `build-filename-map --self-test` **8/0** ·
`build-publish-bundle --self-test` **15/0** · apex `check-phase-144` **101 PASS / 0 FAIL / 0 SKIPPED**.
All nine match the plan-time figures recorded in `148-RESEARCH.md` exactly.

## Decisions Made

- **Wrote the complete file in a single authoring pass** rather than staging four separate
  holding-sentence commits per task. Every task's acceptance criteria (structural greps, awk-scoped
  literal checks, and the automated `<verify>` commands) were run and confirmed against the finished
  file before the single commit landed, matching D-65's explicit "commit 2 of three" contract and its
  literal `git log -1 --name-only` acceptance criterion — the same reconciliation approach plan 01
  used, applied from the start rather than via a post-hoc squash.
- **Fixed three line-wrap defects found during the acceptance sweep.** Several required literal phrases
  (`is not updated in the background`, `September 8, 2026`, `directly installed by the Intune
  management extension`, `48 hours`) initially wrapped across two physical lines in the authored prose,
  which caused single-line `grep` checks to silently return zero matches even though the words were
  present. Caught each by running the literal-phrase greps immediately after drafting rather than
  trusting a visual read, and re-wrapped the affected sentences so every required literal sits on one
  physical line — the same class of trap R7/D-53 documents for `00-overview.md`, here hitting the new
  file's own prose instead.
- **Corrected a fabricated registry-path prefix caught during self-review.** An early draft wrote the
  Office `ClickToRun` verification registry path as `Computer Configuration\HKEY_LOCAL_MACHINE\...`,
  which inserts an extra "Configuration" token not present in the research quote bank's verbatim
  citation (`Computer\HKEY_LOCAL_MACHINE\...`). Fixed to match the sourced text exactly before
  committing — not caught by any grep criterion, only by re-reading the passage against the quote bank
  during the final review pass.
- See the frontmatter `key-decisions` above for the PerpetualVL2021 omission, the two live re-fetches,
  the winget-cli non-citation, and the read-only reconciliation-site discipline.

## Deviations from Plan

None — plan executed exactly as written. The two corrections above (line-wrap re-wrapping, the
registry-path prefix) are self-caught authoring fixes made before the commit landed, not deviations
from the plan's instructions.

## Known Stubs

None. All ten H2s are fully authored; no holding sentences remain from Task 1's tracer stage.

## Issues Encountered

None.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

- Plan 3 (`00-overview.md` wiring) can proceed: `08`'s existence, H1, and Related Resources entry
  points are stable inputs for the four additive edit sites plan 03 owns.
- Phase 151 (Recipe #5) can consume the full 16-anchor cross-link contract now that both `07` and `08`
  ship their eight anchors each.
- Phase 152 can proceed with registry/filename-map/nav-hub wiring for `08` once plan 03 completes; no
  registry row, canary bump, or nav-hub edit was made by this plan (D-73).
- No blockers. All nine gate baselines are at their plan-time figures; `git status --porcelain` shows
  no unexpected file changes beyond this plan's two files.

---
*Phase: 148-application-update-management-winget-routing*
*Completed: 2026-08-23*

## Self-Check: PASSED

- `docs/operations/patch-management/08-windows-app-updates.md` — FOUND
- `docs/operations/patch-management/07-windows-autopatch.md` (Related Resources entry) — FOUND
- Commit `daed2a3f` (content, exactly two files) — FOUND in `git log --oneline --all`
- All nine plan-time gate baselines re-verified green after the content commit (32/0/0, 26/0/0,
  36/0/0, 0/0, 234/0, 16/0, 8/0, 15/0, 101/0/0)
