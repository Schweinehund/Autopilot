---
phase: 145-corpus-correction-validator-gate-archival-drift-fix
verified: 2026-08-19T00:00:00Z
status: passed
score: 5/5 roadmap success criteria verified (12/12 FIX requirements confirmed in corpus)
behavior_unverified: 0
overrides_applied: 0
---

# Phase 145: Corpus Correction, Validator Gate & Archival-Drift Fix — Verification Report

**Phase Goal:** A reader of the patch-management domain gets the current first-party position on
every falsified claim — with evidence, not a date stamp — and the two validator-level traps that
would silently redden this milestone are disarmed before any new content lands.

**Verified:** 2026-08-19
**Status:** PASSED
**Re-verification:** No — initial verification

## Method

This verification did not trust SUMMARY.md claims. All five `docs/operations/patch-management/*.md`
files were read in full; the co-management, Linux, and Apple-Business glossary edits were diffed
against their pre-145 git history; every referenced validator was re-run from a clean shell (not
copied from SUMMARY output); the apex `check-phase-144.mjs` was executed twice — once misconfigured
with `CHECK_PHASE_NESTED=1` (which incorrectly skips nested chain expansion and must never be set by
a human invoker) to confirm the trap, then correctly without the env var, reproducing 101/0/0. The
SVG regeneration was independently re-verified by `md5sum` against the digests recorded in
`145-EVIDENCE.md`, which matched the file currently on disk. Seven first-party Microsoft/Apple/Google
source URLs cited in the corrected documents were fetched live (`curl`) and cross-checked for the
exact quoted language and `ms.date` values the corpus attributes to them — zero fabrications found,
one page (Intune's JS-rendered Settings Catalog reference table) could not be verified this way and
is noted below as a residual limitation, not a defect.

## Goal Achievement

### Observable Truths — ROADMAP Success Criteria

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | All five patch-management docs state the current first-party position on the 8 named falsified claims, each with a dated evidence line and `review_by − last_verified ≤ 60 days` | ✓ VERIFIED | All 5 files carry `last_verified: 2026-08-19` / `review_by: 2026-10-18` (exactly 60 days). Read every file in full: Autopatch `Test`/`Last` rings + WUfB containment (00-overview.md, 01-windows...md, co-management/03), driver deferral-vs-deadline split (00-overview.md `## Ring Terminology`), `Windows Update client policies` rename (both Windows files), Apple two-stage cutover (02-macos...md, verified against live Apple support page — see below), Apple settings-catalog display names (03-ios...md), hotpatch's two configuration levels (01-windows...md `## Hotpatch`), Android patch-age scoping to `MEETS_STRONG_INTEGRITY` all-partitions (04-android...md). Every claim carries a standalone `**Source:**` line with a dated URL. |
| 2 | No surviving `First`/`Fast`/`Broad` Autopatch ring naming; no mutual-exclusivity claim at any of the five sites | ✓ VERIFIED | `grep -rniP "\bAutopatch rings\b" docs/` returns exactly ONE hit — the deliberate self-kept H2 `## Windows Autopatch Rings (Disambiguation)` at `01-windows-wufb-rings.md:65`, confirmed untouched and correctly labeled. `grep -rniE "mutual.{0,20}exclus"` across `docs/operations/` returns nothing (the only corpus-wide `mutually exclusive` hits are unrelated Samsung KME/Zero-Touch content in `admin-setup-android/`). `co-management/03-cocmgmt-migration-paths.md:25` reads "Test and Last." |
| 3 | `grep -rn "\.planning/research/\|\.planning/phases/" docs/` returns 0 | ✓ VERIFIED | Ran the exact command: 0 hits, exit code 1 (no match). Diffed commit `9fd7cf1c` — all 4 target files (`_glossary-linux.md`, `_glossary-apple-business.md`, `l2-runbooks/25-linux-agent-investigation.md`, `apple-business/10-apple-tv-lifecycle.md`) had substance inlined, not just paths stripped. Confirmed every stripped identifier (PITFALL-2, PITFALL-4, OP-1/2/3/7, CI-2, CI-3) retains ≥1 other defining occurrence in `docs/` — PITFALL-4 legitimately has 0 remaining occurrences and its substance ("HWE kernel divergence is a known risk") is inlined at the sole prior use site, matching the phase's own claim. |
| 4 | `check-phase-59.mjs`'s ops-index read is a frozen read; `V-59-14` asserts a historical row count | ✓ VERIFIED | `V-59-14` reads via `readAtV15Close(OPS_INDEX_MD)`, assertion name carries `[v1.5-frozen @ ba2cbc0]` suffix (not the filename, per D-37 — confirmed `audit-harness-v1.5-integrity.yml:270` guards on filename, unaffected). `check-phase-59.mjs` re-run: 36 passed / 0 failed. |
| 5 | `Ubuntu 22.04` gone from every markdown occurrence; the SVG was regenerated, not text-edited; the RHEL-8-vs-9/10 conflict is stated wherever a supported-version list appears | ✓ VERIFIED (with one scope note) | `grep -rn "Ubuntu 22\.04" docs/ scripts/generate-diagrams.py` → 0 hits. `grep -c "Ubuntu 22.04" docs/diagrams/decision-tree-09-linux-triage.svg` → 0. Independently `md5sum`'d the current SVG: `90bb20d0ca967eb14a887b6d94f1df34`, matches the "after" digest recorded in `145-EVIDENCE.md` exactly — confirms the file on disk is the regenerated output, not a hand edit, and the other 13 diagrams were not touched. `check-phase-54.mjs`: 32/32. **Scope note:** the RHEL-8-vs-9/10 conflict is stated at exactly one site (`docs/decision-trees/09-linux-triage.md` + the SVG subtitle), not repeated across all 26 Ubuntu-version-bearing files — see Gray-Area Note below. |

**Score:** 5/5 roadmap Success Criteria verified, 0 behavior-unverified.

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `docs/operations/patch-management/00-overview.md` | FIX-01/02/03/04/06/10, one commit | ✓ VERIFIED | Read in full. Ring Terminology H2 correctly names Test/Last, states containment not exclusivity, driver sentence correctly split (independence clause + per-ring gating fact both present), rename applied, OfferPrograms recategorised at both table-cell and prose sites. |
| `docs/operations/patch-management/01-windows-wufb-rings.md` | FIX-01/02/04/07/10, one commit | ✓ VERIFIED | Read in full. PITFALL-9 blockquote states containment (not exclusivity), retains its label. Hotpatch section: default-on, two configuration levels correctly described, Arm64+CHPE, VBS requirement, Windows 11 Pro exclusion retained and flagged unconfirmed (not deleted). The superseded May 2026 / April 2026 framing is explicitly attributed to "this guide's prior position," not asserted as fact. |
| `docs/operations/patch-management/02-macos-update-enforcement.md` | FIX-05, one commit | ✓ VERIFIED | Two-stage cutover (deprecated with Apple OS 26 / non-functional in Apple OS 27.0) stated consistently across every restatement (Cutover summary, migration steps, What-breaks section) — no leftover single-event framing found. Undated-Intune-banner absence explicitly stated. Cross-checked against Apple's live support page: exact match ("Announced last year, legacy software update management no longer functions in all 27.0 operating systems"). |
| `docs/operations/patch-management/03-ios-update-lifecycle.md` + `docs/admin-setup-ios/07-device-enrollment.md` | FIX-06, one coupled commit | ✓ VERIFIED | Settings Catalog display names (Target OS Version, Target Build Version, Target Date Time, Delay in Days, Install Time, Details URL) all named. OfferPrograms recategorised as a `Beta`-dictionary key at all 5 corpus sites — confirmed against Apple's live DDM declarative-configuration page, which independently confirms OfferPrograms lives in the `Beta` dictionary. |
| `docs/operations/patch-management/04-android-patch-delivery.md` | FIX-08, one commit | ✓ VERIFIED | 12-month patch-age condition correctly scoped to the `MEETS_STRONG_INTEGRITY` verdict (all partitions — OS + vendor), not general Android 13+. October 31 2026 date cited from Intune's live "In development" page and explicitly attributed as an *announced* enforcement date, with the page's own "dates might change" caveat carried into the corpus text — matches the verification brief's specific concern exactly. Date confirmed absent from `docs/quick-ref-l2.md`'s Play Integrity H3 region. |
| `scripts/validation/check-phase-59.mjs` | V-59-14 frozen-read conversion | ✓ VERIFIED | See Truth #4. |
| `.planning/phases/.../145-EVIDENCE.md` | SVG idempotency proof | ✓ VERIFIED | Digests reproduced independently; matches file on disk. |

### Key Link Verification

| From | To | Via | Status | Details |
|------|-----|-----|--------|---------|
| `readAtV15Close` (`frozen-at-close.mjs`) | immutable commit `ba2cbc0` | `docs/operations/00-index.md` as it stood at v1.5 close | ✓ WIRED | Confirmed by source read of `check-phase-59.mjs:449-450` and a clean 36/36 run. |
| `scripts/generate-diagrams.py` subtitle string | `docs/diagrams/decision-tree-09-linux-triage.svg` | `docs/decision-trees/09-linux-triage.md` | ✓ WIRED | All three carry the identical version list; SVG regenerated (not hand-edited) per matched digest. |
| `check-nav-hub-links.mjs` / `check-phase-143` / apex | `.planning/` links in docs/ | archival-drift trap | ✓ DISARMED | 0 `.planning/` references remain under `docs/`; `check-nav-hub-links.mjs` 0/0; apex 101/0/0. |
| `check-phase-49.mjs` V-49-10 | `docs/linux-lifecycle/01-linux-prerequisites.md` distro-row regex | same-commit validator update | ✓ CORRECT, NOT WEAKENED | The corpus's own prerequisites matrix legitimately carries 3 rows (Ubuntu 20.04 dropped / 24.04 / 26.04). The regex was updated `20.04\|22.04\|24.04` → `20.04\|24.04\|26.04`, still requiring exactly 3 literal-pinned rows. This is a necessary consequence of the FIX-09 sweep, not a scope reduction — 22 checks still pass (22/22 on `check-phase-49.mjs`). |

### Data-Flow / Behavioral Spot-Checks

| Behavior | Command | Result | Status |
|----------|---------|--------|--------|
| `check-phase-53.mjs` (co-management + Autopatch prereqs) | `node scripts/validation/check-phase-53.mjs` | 26 passed, 0 failed | ✓ PASS |
| `check-phase-54.mjs` (patch-management corpus) | `node scripts/validation/check-phase-54.mjs` | 32 passed, 0 failed | ✓ PASS |
| `check-phase-57.mjs` (quick-ref / hub integrity) | `node scripts/validation/check-phase-57.mjs` | 26 passed, 0 failed | ✓ PASS |
| `check-phase-59.mjs` (ops-index frozen read) | `node scripts/validation/check-phase-59.mjs` | 36 passed, 0 failed | ✓ PASS |
| `check-phase-49.mjs` (Linux distro matrix) | `node scripts/validation/check-phase-49.mjs` | 22 passed, 0 failed | ✓ PASS |
| `c17-eee-contract.mjs` | `node scripts/validation/c17-eee-contract.mjs` | 234 files, 0 violations | ✓ PASS |
| `check-nav-hub-links.mjs` | `node scripts/validation/check-nav-hub-links.mjs` | 0/0 failures | ✓ PASS |
| `v1.20-milestone-audit.mjs` | `node scripts/validation/v1.20-milestone-audit.mjs` | 16 passed, 0 failed | ✓ PASS |
| Apex `check-phase-144.mjs` (unset CHECK_PHASE_NESTED) | `node scripts/validation/check-phase-144.mjs` | 101 PASS, 0 FAIL, 0 SKIPPED | ✓ PASS |
| SVG digest match | `md5sum docs/diagrams/decision-tree-09-linux-triage.svg` | `90bb20d0ca967eb14a887b6d94f1df34` (matches EVIDENCE.md "after" digest) | ✓ PASS |
| Live-source cross-check (7 URLs fetched) | `curl` + text/date grep | All quoted language + `ms.date` values match corpus citations | ✓ PASS |

### Fabricated-Citation / Evidence-Line Audit

Given this repository's recorded incident of a fabricated first-party quote reaching requirements,
seven citations were independently fetched and checked:

1. **Windows Autopatch groups overview** (`ms.date=2026-07-27`, matches corpus) — confirmed "up to 15" / "up to 300" ring/group limits, confirmed Test/Last naming, confirmed **no** First/Fast/Broad naming anywhere on the page.
2. **Manage Windows Update for client policies** — confirmed the product-name rename appears 22 times vs. 4 legacy mentions; confirmed the cited `2025-10-02` date string is present on the page.
3. **Apple: device management updates** — confirmed the verbatim two-stage language: *"Announced last year, legacy software update management no longer functions in all 27.0 operating systems."*
4. **Apple: Software Update Settings declarative configuration** — confirmed `OfferPrograms` is documented as a `Beta`-dictionary key for beta-programme enrollment, matching the corpus's recategorisation exactly.
5. **Manage driver updates / Driver updates FAQ** — confirmed `2026-04-09` present on both pages.
6. **Hotpatch updates / Configure hotpatch** — confirmed `2026-06-02` and `2026-04-29` respectively.
7. **Intune "In development" page** — confirmed the exact quoted sentence *"Microsoft Intune will enforce this change by October 31, 2026"* under the Strong Integrity plan-for-change heading, confirmed `ms.date=2026-07-27`, and confirmed the page's own "Dates and individual features might change" caveat — exactly what the corpus's attribution-as-announced (not GA) framing claims.

**No fabricated citations found.** One citation (Intune's Settings Catalog `ref-apple-settings` reference table, backing the 6 display names in FIX-06) could not be independently verified via `curl` because that page renders its settings table client-side via JavaScript; this is a tooling limitation of this verification pass, not evidence of a problem — the underlying Apple-side declarative keys were independently confirmed to exist and behave as described on Apple's own page.

### Truth-vs-Token-Presence Audit

Checked that literal-presence validator pins (`May 2026`, `Apple OS 26`, `Oct 31 2026`) are not
merely present but truthfully framed:

- `01-windows-wufb-rings.md`: "This guide previously described a single opt-out toggle... ahead of a May 2026 default-on cutover... that single-toggle, single-cutover framing is this guide's own prior position, not the current first-party description." — superseded framing correctly attributed to the corpus's own earlier claim, not asserted as current fact.
- `02-macos-update-enforcement.md`: "Apple OS 26" is consistently the deprecation-announcement event; "Apple OS 27.0" is consistently the non-functional event — no site collapses them back into a single-event claim.
- `04-android-patch-delivery.md`: "Oct 31 2026" is consistently framed with `[HARD-DEADLINE]` callouts pointing at an *announced* Google/Intune enforcement cascade, sourced to the "In development" page and explicitly not claimed as GA.

### Gray-Area Note (not a gap — flagged for awareness)

ROADMAP SC#5 and REQUIREMENTS.md FIX-09 both use the phrase "wherever a supported-version list
appears" for the RHEL-8-vs-9/10 conflict. This was interpreted at plan time (145-CONTEXT.md D-48/
D-49) to mean the one site where the corpus discusses Microsoft's actual RHEL support claims —
`docs/decision-trees/09-linux-triage.md` plus the SVG subtitle — rather than every Ubuntu-version
table in the corpus (most of which are explicitly Ubuntu-only project-scoped lists that already
state "RHEL 9/10 deferred to v1.6+" and would be *inaccurate* to annotate with a Microsoft-support
conflict about a distro this project doesn't cover). The 145-05-SUMMARY.md self-disclosed this
narrowing rather than hiding it. This is a defensible, disclosed interpretation of ambiguous roadmap
language, not a silent scope cut, and no automated gate treats it as a gap — `check-phase-49.mjs`
and `check-phase-54.mjs` both pass. Recorded here per the instruction to be honest about partial
readings rather than rounding up silently.

### Anti-Patterns Found

None. `TBD`/`TODO`/`FIXME`/`XXX`/`PLACEHOLDER` negative checks pass on every touched file
(`V-53-25`, `V-54-30`, `V-57-26`, `V-59-34/35/36`). No empty-return stubs, no hardcoded-empty props,
no console.log-only implementations found in the five patch-management docs or the swept files.

### Requirements Coverage

| Requirement | Status | Evidence |
|---|---|---|
| FIX-01 | ✓ SATISFIED | Test/Last naming at all 4 sites, no First/Fast/Broad anywhere |
| FIX-02 | ✓ SATISFIED | No mutual-exclusivity claim at any of 5 sites; containment position stated |
| FIX-03 | ✓ SATISFIED | Driver sentence split correctly in `00-overview.md` |
| FIX-04 | ✓ SATISFIED | "Windows Update client policies" used throughout; WUfB retained only for the reports surface |
| FIX-05 | ✓ SATISFIED | Two-stage Apple cutover stated consistently; undated banner absence stated |
| FIX-06 | ✓ SATISFIED | Settings-catalog display names present; OfferPrograms recategorised (not deleted) at all 5 sites |
| FIX-07 | ✓ SATISFIED | Hotpatch two-level config, Arm64+CHPE, VBS, Win11 Pro exclusion retained-unconfirmed |
| FIX-08 | ✓ SATISFIED | Patch-age scoped to MEETS_STRONG_INTEGRITY, all partitions; date sourced + attributed as announced |
| FIX-09 | ✓ SATISFIED (with gray-area note above) | 0 Ubuntu 22.04 occurrences; SVG regenerated (digest-confirmed) |
| FIX-10 | ✓ SATISFIED | All 5 files: review_by − last_verified = 60 days exactly, ≤ 60 |
| FIX-11 | ✓ SATISFIED | 0 `.planning/` refs under docs/; all dropped identifiers retain a defining occurrence |
| FIX-12 | ✓ SATISFIED | V-59-14 is a frozen read; 6th Patch row would pass |

No orphaned requirements found — all 12 FIX-* IDs mapped to plans and confirmed in the corpus.

### Human Verification Required

None. All must-haves were verifiable by direct corpus reading, live validator execution, and live
first-party source cross-checking.

## Gaps Summary

None. All five ROADMAP Success Criteria hold, all 12 FIX requirements are satisfied in the actual
corpus text (not just claimed in SUMMARY files), every cited baseline gate reproduces its claimed
pass count from a clean re-run, the apex reproduces 101/0/0, and seven live first-party source
fetches confirm the evidence lines are honest rather than fabricated or GA-washed. The one
noteworthy judgment call (RHEL-conflict site scope) is disclosed above for awareness but does not
block any gate and reflects a reasonable, self-disclosed reading of ambiguous roadmap phrasing.

---

_Verified: 2026-08-19_
_Verifier: Claude (gsd-verifier)_
