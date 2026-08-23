---
phase: 148-application-update-management-winget-routing
verified: 2026-08-23T19:17:14Z
status: gaps_found
score: 6/7 must-haves verified
behavior_unverified: 0
overrides_applied: 0
gaps:
  - truth: "Every quoted claim in 07/08 traces to a single-page Source line that actually carries that quote (R7/D-63 evidence-line contract; plan 02 Task 2 acceptance criterion: 'no single Source line is followed by quoted material attributed to two different articles')"
    status: partial
    reason: "In docs/operations/patch-management/08-windows-app-updates.md's '## Microsoft 365 Apps Update Channels' cadence-conflict passage, two verbatim quotes — the build-number discriminator ('Devices with build numbers higher than 20131.20000 have successfully installed Version 2606') and the escape-hatch date ('Version 2508 is supported through September 8, 2026') — have no Source line of their own. The nearest preceding Source line (line 104) attributes only to 'Overview of update channels for Microsoft 365 Apps'. I re-fetched that exact page live (https://learn.microsoft.com/en-us/microsoft-365-apps/updates/overview-update-channels) and it contains neither string (0 hits for '20131' and for 'September 8, 2026'). I then re-fetched the channel-unification companion article (https://learn.microsoft.com/en-us/microsoft-365-apps/updates/unified-update-channels) and confirmed both quotes appear there byte-for-byte. The content itself is genuine and accurately quoted — this is a citation-attribution gap, not a fabrication — but a reader tracing the cited Source to verify the claim lands on the wrong page and cannot confirm it there."
    artifacts:
      - path: "docs/operations/patch-management/08-windows-app-updates.md"
        issue: "Lines 106-113 (the 'Neither reading is supportable...' paragraph) quote two strings sourced from unified-update-channels but carry no Source line of their own; the last Source line above them (line 104) names overview-update-channels instead."
    missing:
      - "Add a standalone '**Source:** [Microsoft 365 Apps: SAEC and MEC unification](https://learn.microsoft.com/en-us/microsoft-365-apps/updates/unified-update-channels) (updated 2026-07-15)' line immediately after the paragraph ending '...remain on Version 2508.' (currently line 113), matching this file's established one-Source-line-per-contiguous-quote-per-page convention used everywhere else in the file."
deferred: []
human_verification: []
---

# Phase 148: Application Update Management & WinGet Routing Verification Report

**Phase Goal:** The missing patching half of application management exists — an admin can choose an
app-update channel, understand exactly what an Autopatch entitlement does and does not buy them, and
stop treating WinGet as an enterprise patching surface.
**Verified:** 2026-08-23T19:17:14Z
**Status:** gaps_found
**Re-verification:** No — initial verification

## Goal Achievement

### Observable Truths (ROADMAP Success Criteria)

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| SC#1 | `07-windows-autopatch.md` documents enrolment mechanics, `Test`/`Last` model, Autopatch app updates and reporting; cross-links `co-management/03` and the `01` disambiguation anchor; re-authors neither; `check-phase-53.mjs` exits 0 | ✓ VERIFIED | File ships all required content (see below). `co-management/03-cocmgmt-migration-paths.md` and `01-windows-wufb-rings.md` are byte-identical to their state at phase-start commit `a161a43c` (`git diff a161a43c HEAD` on both paths returns empty). `check-phase-53.mjs` independently re-run: **26 passed, 0 failed, 0 skipped**. |
| SC#2 | Reader cannot conclude "if you have Autopatch you have Hotpatch": both licence lists shown differing, VDA on one side, Windows 365 Enterprise on the other | ✓ VERIFIED | `## Autopatch and Hotpatch` ships both lists in full, each under its own `**Source:**` line. Autopatch list carries "Windows 10/11 Enterprise E3 or E5 VDA"; Hotpatch list carries "Windows 365 Enterprise". Both quotes re-fetched live and matched byte-for-byte against `windows-autopatch-prerequisites` and `windows-autopatch-hotpatch-updates`. The barred phrase never appears (`grep -ci 'if you have autopatch you have hotpatch'` = 0); "necessary but not sufficient" is present. |
| SC#3 | `08-windows-app-updates.md` documents the six M365 Apps channels (Current default, rollback "Not applicable", Beta not supported), one-channel-per-device, device-scoped, Teams/OneDrive outside; plus EAM's 5 reachability gates as hard as its licence, all 8 limitations including malicious-version revocation, and the blocking-app positive | ✓ VERIFIED (one supporting citation defect — see gap) | All six channels ship in a table with the correct rollback/support values, re-fetched and matched against `overview-update-channels`. The three structural constraints are quoted verbatim and verified live. EAM's five gates, the guidelines-not-guarantees SLOs, and all eight limitation sub-labels (in the source page's own order and heading text) were verified against the live `enterprise-app-management` page's own `<h4>` extraction — exact match, including the revocation quote "You're still responsible for identifying impacted devices and taking remediation action." The blocking-app positive is correctly filed under `## Enterprise App Management`, not under the callouts H2. **One defect**: the cadence-conflict passage's build-number and escape-hatch quotes lack their own Source line (see gaps). |
| SC#4 | WinGet reads as routing/hardening, not patching: EAM-is-not-WinGet-based negative; Store-app split (UWP/Store, Win32/Intune, in preview, ARM64 unsupported) with the stated-and-contrasted cadence absence; `DesktopAppInstaller` CSP trap (two recommended policies absent from settings catalog) | ✓ VERIFIED | FAQ negative "No. Enterprise App Catalog apps are directly installed by the Intune management extension (IME)." verified verbatim against the live EAM FAQ. Store split ("UWP apps are kept up to date by the Store..." / "Microsoft Store Win32 apps are kept up to date by Intune...") verified verbatim against `add-microsoft-store`; preview status and ARM64-only-entry both confirmed live. Cadence absence stated and explicitly contrasted against EAM's SLOs. `DesktopAppInstaller` six-row table verified against the live CSP reference (confirmed exactly 15 total settings on that page, six correctly selected); `SourceAutoUpdateInterval` quote byte-matched; both "Not built in; use a custom configuration profile" policy names (EnableMicrosoftStoreSource, EnableAppInstaller) confirmed live on `add-microsoft-store`. |

**Score:** 4/4 ROADMAP Success Criteria substantively achieved; 6/7 plan-level must-haves cleanly verified, 1 with a documented citation-attribution defect (see Gaps below).

### 16-Anchor Contract and Structural Shape

| Check | Expected | Measured | Status |
|---|---|---|---|
| `07` H2 count | 10 | 10 | ✓ |
| `07` `<a id=` count | 8 | 8 | ✓ |
| `08` H2 count | 10 | 10 | ✓ |
| `08` `<a id=` count | 8 | 8 | ✓ |
| Total anchors | 16 (per RESEARCH DISCHARGED flag, "16 anchors, not 15") | 16 | ✓ |
| Code fences (`07`, `08`) | 0, 0 | 0, 0 | ✓ |
| `doc_id` field | absent from both | absent from both | ✓ |
| Conditional H2 `## Setting the Channel from Intune` | ships (fetch succeeded per RESEARCH) | present in `08`, filled with settings-catalog content | ✓ |
| Line endings | `07`/`08` LF; `00-overview.md` CRLF preserved | `w/lf`, `w/lf`, `w/crlf` (`git ls-files --eol`) | ✓ |

### Required Artifacts

| Artifact | Expected | Status | Details |
|---|---|---|---|
| `docs/operations/patch-management/07-windows-autopatch.md` | New, full Autopatch delta guide | ✓ VERIFIED | 435 lines, all sections filled, no holding sentences remain |
| `docs/operations/patch-management/08-windows-app-updates.md` | New, application-update governance guide | ✓ VERIFIED | 424 lines, all sections filled |
| `docs/operations/patch-management/00-overview.md` | 4 additive insertion sites + conditional re-stamp | ✓ VERIFIED | Two routing bullets (:168-169), two Related Resources entries (:241, :245), frontmatter `last_verified`/`review_by` = 2026-08-23/2026-10-22 (exactly 60 days) |
| `.planning/REQUIREMENTS.md` | 9 evidence-carrying backlog entries + 1 SUPERSEDED marker | ✓ VERIFIED | 14 bullets under `## Future Requirements` (5 existing + 9 new), 0 colon-in-bold violations, SUPERSEDED marker present naming the canonical article that discharged it |

### Key Link Verification

| From | To | Via | Status |
|---|---|---|---|
| `07-windows-autopatch.md` | `01-windows-wufb-rings.md#autopatch-disambiguation` | corpus's first inbound link | ✓ WIRED — anchor confirmed live at `01:66` |
| `07-windows-autopatch.md` | `01-windows-wufb-rings.md#hotpatch` | corpus's first inbound link | ✓ WIRED — anchor confirmed live at `01:119` |
| `07-windows-autopatch.md` | `co-management/03-cocmgmt-migration-paths.md#autopatch-prerequisites` | cross-link, no edit | ✓ WIRED — anchor confirmed live at `03:33`; file byte-identical to phase-start |
| `07-windows-autopatch.md` | `08-windows-app-updates.md` | Related Resources | ✓ WIRED |
| `08-windows-app-updates.md` | `07-windows-autopatch.md` | Autopatch-enrolled channel condition | ✓ WIRED |
| `08-windows-app-updates.md` | `../app-lifecycle/01-windows-win32-msix-scale.md#supersedence` | Win32 fallback tier only | ✓ WIRED — confined correctly, no supersedence link from EAM section |
| `00-overview.md` | `07-windows-autopatch.md`, `08-windows-app-updates.md` | routing bullets + Related Resources | ✓ WIRED — 2 occurrences each, confirmed |

### Prohibitions (must-NOT checks)

| Prohibition | Verification | Status |
|---|---|---|
| MUST NOT edit `docs/operations/co-management/**` | `git diff a161a43c HEAD -- docs/operations/co-management/` empty | ✓ HELD |
| MUST NOT edit `01-windows-wufb-rings.md` | `git diff a161a43c HEAD -- docs/operations/patch-management/01-windows-wufb-rings.md` empty | ✓ HELD |
| MUST NOT edit `app-lifecycle/**`, `admin-setup-apv2/**`, `docs/reference/**` | `git diff a161a43c HEAD` on all three empty | ✓ HELD |
| MUST NOT resolve Windows 11 Pro hotpatch eligibility | `grep 'Windows 11 Pro'` on live hotpatch page = 0 hits; `07`/`08`/`01` all flag it unconfirmed, none assert either direction | ✓ HELD |
| MUST NOT name third-party patch products/community automation | `grep -ciE 'patchmypc\|chocolatey\|ninite\|scappman\|robopack\|ivanti\|techdirect'` = 0 across all three files | ✓ HELD |
| MUST NOT correct the falsified overview hotpatch cell | `00-overview.md:56-57` byte-identical to `a161a43c`; filed to backlog instead | ✓ HELD |
| MUST NOT invert the Autopatch⇒Hotpatch conclusion | `grep -ci 'if you have autopatch you have hotpatch'` = 0; positive "necessary but not sufficient" present | ✓ HELD |
| MUST NOT strengthen the WinGet FAQ negative | Verbatim, no added rationale/date — confirmed against live page | ✓ HELD |

### Gate Battery (independently re-run, not trusted from SUMMARY)

| Gate | Result |
|---|---|
| `check-phase-53.mjs` | 26 passed, 0 failed, 0 skipped |
| `check-phase-54.mjs` | 32 passed, 0 failed, 0 skipped |
| `check-phase-59.mjs` | 36 passed, 0 failed, 0 skipped |
| `check-nav-hub-links.mjs` | 0 hub-presence, 0 corpus-link failures |
| `c17-eee-contract.mjs` | 234 files checked, 0 violations |
| `v1.20-milestone-audit.mjs` | 16 passed, 0 failed |
| `check-phase-144.mjs` (apex) | 101 PASS, 0 FAIL, 0 SKIPPED |

### Requirements Coverage

| Requirement | Source Plan | Status | Evidence |
|---|---|---|---|
| APP-01 | 148-01 | ✓ SATISFIED | Enrollment mechanics, Test/Last model, containment position, cross-links — all present and byte-verified |
| APP-02 | 148-01 | ✓ SATISFIED | Both entitlement lists differing, necessary-but-not-sufficient positive present |
| APP-03 | 148-02 | ✓ SATISFIED (citation gap noted) | Six channels, structural constraints, settings-catalog surface all present and byte-verified; cadence-conflict passage has an uncited quote pair (see gap) |
| APP-04 | 148-02 | ✓ SATISFIED | 5 gates, guidelines-not-guarantees SLOs, all 8 limitations in source order, blocking-app trade-off |
| APP-05 | 148-02 | ✓ SATISFIED | FAQ negative verbatim, three-referents disambiguation, Store split, cadence absence stated and contrasted |
| APP-06 | 148-02 | ✓ SATISFIED | Six-row policy table, `SourceAutoUpdateInterval` disqualifier, settings-catalog trap |

No orphaned requirements — `REQUIREMENTS.md`'s Phase 148 rows (APP-01..APP-06) exactly match the six IDs declared across the three plans' frontmatter.

### Anti-Patterns Found

None introduced by this phase. Two pre-existing `00-overview.md` conditions were re-measured (not fixed, per explicit owner ruling and this phase's additive-only blast radius): the falsified Hotpatch/VBS comparison-table cell (`:56-57`, unchanged since `a161a43c`, filed to backlog) and three pre-existing negative-battery hits (`:56, :108, :133` — "beta-enrolment", "PITFALL-9", "beta-programme enrolment", all from prior phases, outside this phase's insertion sites). Both are correctly documented in `148-03-SUMMARY.md`'s Deviations section rather than silently "fixed" out of scope.

### Behavioral Spot-Checks / Re-fetch-and-Diff (the phase's own named verification gate)

Re-fetched, as raw HTML bytes via `curl` + Python tag-strip + literal `grep` (per this project's own established method, never a rendered-summary tool), and diffed against the shipped quotes:

| Page | Claims checked | Result |
|---|---|---|
| `windows-autopatch-prerequisites` | Autopatch entitlement list, Entra ID P1/P2, corporate-owned, 28-day check-in | Byte-exact match |
| `windows-autopatch-hotpatch-updates` | Hotpatch entitlement list, zero "Windows 11 Pro" hits | Byte-exact match |
| `windows-autopatch-groups-overview` | Containment sentence, Test/Last language, 15-ring/300-group figures | Byte-exact match |
| `enterprise-app-management` | 5 gates, SLOs, all 8 limitation headings in order, revocation quote, FAQ negative, supersedence disclaimer | Byte-exact match |
| `add-microsoft-store` | UWP/Win32 split, preview status, ARM64-only-entry, suppression asymmetry, two "Not built in" policies | Byte-exact match |
| `policy-csp-desktopappinstaller` | 15 total settings (6 shipped), `SourceAutoUpdateInterval` quote | Byte-exact match |
| `windows/package-manager/configuration/` | Dev-environment scope, partial-success framing | Byte-exact match |
| `overview-update-channels` | Six channels, 3 structural constraints, "Twice a year" comparison-table quote | Byte-exact match |
| `unified-update-channels` | MC1274325 announcement, "Beginning July 2026..." | Byte-exact match, **but two further quotes from this same page (build-number discriminator, Sept-8 escape hatch) ship in `08` with no Source line of their own — see Gaps** |
| `update-office` (settings catalog) | Update Channel, Target Version, Policy and Profile Manager role, scheduled task, registry key, "at least a day and more" | Byte-exact match |
| `change-update-channels` (admin templates) | "Update Channel (2.0)", registry path | Byte-exact match |

No fabricated quote found anywhere in the two new guides. One citation-attribution gap found (detailed above).

### Gaps Summary

The phase is substantively complete and unusually well-sourced — every quote I independently re-fetched and diffed against live Microsoft Learn pages matched byte-for-byte, across eleven distinct source pages and roughly twenty checked claims. All four ROADMAP Success Criteria are met in substance, all six requirements are satisfied, all prohibitions are honored (co-management/03 and 01-windows-wufb-rings.md are provably untouched), all nine gates plus the apex are green on independent re-run, and the code review's two Warnings are both pre-existing content this phase did not introduce.

The one gap found is narrow and precisely located: in `08-windows-app-updates.md`'s cadence-conflict passage, two verbatim quotes (the build-number discriminator and the September 8, 2026 escape-hatch date) are genuine and accurately transcribed, but they belong to the SAEC/MEC unification article, not the "Overview of update channels" page the nearest preceding Source line names — and they carry no Source line of their own. This is exactly the class of defect this phase's own R7 rule and D-62/D-63 must-haves exist to prevent ("no validator in this repository parses evidence lines, so the verifier is the only gate that can catch a fabricated quote"), and it is precisely what an independent re-fetch-and-diff is for. The fix is a single added Source line, not a re-plan.

**This looks like a straightforward one-line fix.** Recommended remediation: insert
`**Source:** [Microsoft 365 Apps: SAEC and MEC unification](https://learn.microsoft.com/en-us/microsoft-365-apps/updates/unified-update-channels) (updated 2026-07-15)`
immediately after the paragraph ending "...remain on Version 2508." in `08-windows-app-updates.md`.

---

_Verified: 2026-08-23T19:17:14Z_
_Verifier: Claude (gsd-verifier)_
