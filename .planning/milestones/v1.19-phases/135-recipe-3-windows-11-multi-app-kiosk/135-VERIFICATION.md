---
phase: 135-recipe-3-windows-11-multi-app-kiosk
verified: 2026-07-30T06:30:00Z
status: passed
score: 6/6 must-haves verified (all six ROADMAP SC1-SC6)
behavior_unverified: 0
overrides_applied: 0
re_verification:
  previous_status: none
  previous_score: n/a
  gaps_closed: []
  gaps_remaining: []
  regressions: []
---

# Phase 135: Recipe #3 — Windows 11 Multi-App Kiosk Verification Report

**Phase Goal:** An Intune admin can follow a linear happy-path recipe from zero to a working, verified Windows 11 multi-app kiosk delivered through the AssignedAccess CSP `Configuration` node — the only first-party mechanism, since the Templates GUI's "Multi app kiosk" option is Windows-10-only.
**Verified:** 2026-07-30
**Status:** passed
**Re-verification:** No — initial verification

## Goal Achievement

I read `docs/recipes/03-windows-11-multi-app-kiosk.md` end to end as the target admin would (Prerequisites → Anti-Feature table → Steps 1-6 → Verification → Rollback/Recovery → Configuration-Caused Failures → See Also). It is a single, linear, followable procedure with no dead ends: every step names what to click or paste, callouts state failure modes inline, and the account-model fork routes the untaken arm to a labeled anti-feature row rather than leaving it dangling. The XML payload is copy-pasteable with exactly three named substitution points. This reads as genuinely followable, not merely structurally complete.

### Observable Truths (ROADMAP SC1-SC6, verbatim)

| # | ROADMAP SC (verbatim) | Status | Evidence |
|---|---|---|---|
| 1 | "`docs/recipes/03-*.md` walks a linear happy path: Autopilot enrollment → kiosk account → apps pre-installed → `AssignedAccessConfiguration` XML authored → pushed via an Intune Custom profile (OMA-URI) to `./Vendor/MSFT/AssignedAccess/Configuration` → verification, with the single-app case as a one-line cross-link to `docs/recipes/01-shared-windows-avd-client.md#step-5a-kiosk-configuration` and zero edits to that file." | ✓ VERIFIED | File has 6 `### Step` headings in exactly that order (lines 60, 72, 87, 103, 120, 225); the autologon anti-feature row (line 53) and `## See Also` (line 328) both cross-link `01-shared-windows-avd-client.md#step-5a-kiosk-configuration`, explicitly framed as "the single-app case". `git diff --stat <pre-phase>..HEAD -- docs/recipes/01-shared-windows-avd-client.md` is empty; `node scripts/validation/check-phase-130.mjs` (pins recipe 01's Step 5a/5b headings as literal strings) exits 0 with 5 PASS. |
| 2 | "The worked XML field set is bounded and schema-valid (`AllAppsList`/`AllowedApps`, `Taskbar`/`ShowTaskbar`, minimal `v5:StartPins` with the Windows 11 22H2 floor stated), with `BreakoutSequence`, managed folders, and `v5:TaskbarLayout` excluded on correctness grounds and a 3-row namespace/version-floor table present." | ✓ VERIFIED | One column-0 ` ```xml ` fence (lines 131-162) carries `AllAppsList`/`AllowedApps` (138-143), `v5:StartPins` (145-151), `Taskbar ShowTaskbar="true"` (152) in correct XSD `profile_t` order. `BreakoutSequence`, folder keys and `v5:TaskbarLayout` do not appear anywhere in the file (grep 0 hits). The 22H2 floor is stated at line 32. A 3-row namespace table (206-212) labels rows by year (2017/2021/2022) exactly matching CONTEXT.md D1.6's locked row set, with no asserted mismatch failure mode (line-level grep for "mismatch" returns 0 hits). |
| 3 | "The recipe embeds the kiosk account model decision block and an anti-feature table covering CA/MFA hard-breaking sign-in, the Windows-11-wrong-GUI trap, group-`Configs`-requires-`AllAppList`, nested `UserGroup`, hardcoded AUMIDs, `Configuration` silently superseding `KioskModeApp`, SharedPC layering, and `AssignedAccess/Status` (not deliverable as a verification mechanism)." | ✓ VERIFIED | STD-05 Case-1 block at lines 72-85 with the 4-column `Option / When to choose / Consequence if wrong / Branch` header (line 76). The anti-feature table (41-56) carries all 8 mandated rows plus 2 locked additions (autologon-tradeoff, app-provisioning-timing) plus 2 bonus rows — every distinguishing token present (`AADSTS50158`/`AADSTS50076`, "Multi app kiosk", "kiosk profile", "Nested groups", AUMID, `KioskModeApp`...SUCCESS, SharedPC, "not deliverable"). `AssignedAccess/Status` is phrased "Not deliverable" (line 52), never "impossible". |
| 4 | "A `## Rollback/Recovery` section exists between `## Verification` and `## Configuration-Caused Failures`, documented as a named divergence from the recipe template, bounded to first-party facts (Settings self-service removal ≠ rollback, un-blockable shortcuts, Autopilot Reset caveat)." | ✓ VERIFIED | H2 order confirmed by direct read: Summary(17) → Prerequisites(27) → Unsupported and Anti-Feature Callouts(41) → Steps(58) → Verification(256) → **Rollback/Recovery(275)** → Configuration-Caused Failures(307) → See Also(321) — exactly between Verification and Configuration-Caused Failures. Content: shortcuts sentence (281, sourced rewording, no unsourced "security screen" clause — grep 0 hits), Settings self-service removal (290), "Removal is not rollback" (289), one Autopilot Reset sentence (294) plus the self-deploying no-re-enrollment fact (295). Named-divergence rationale recorded in `135-02-SUMMARY.md` (D2.1/D2.2): the real reason is the recipes-01/02 non-conformance ripple, not a harness block — confirmed true, since `check-phase-129.mjs` asserts only template existence + sentinel, no H2 set/order. |
| 5 | "Verification is admin-executable end-to-end: restricted Start menu with only allow-listed apps, a non-allow-listed app failing to launch, a secondary app flow completing without an app-blocked error, and a clean `AssignedAccess > Operational` event log — with `AppNotFound` named as a prerequisite symptom, not a status check." | ✓ VERIFIED | `## Verification` (256-273) retains "The `AssignedAccess > Operational` ... event log is clean" **verbatim** (line 269) — CONTEXT.md D3.1's AUGMENT-not-SUBSTITUTE ruling honored, confirmed via the phase's own `checkpoint:decision` gate ratified `augment-locked` (135-02-SUMMARY.md:123-130). Restricted Start menu (265), non-allow-listed app fails to launch (266), secondary flow (267) all present. `AppNotFound` appears only in Prerequisites (line 39) as a named prerequisite symptom, and is absent from the `## Verification` section body (confirmed by section-scoped read of lines 256-273 — no match). |
| 6 | "`docs/_standards/EEE-SOP-standard.md`'s fenced-content rationale at `:462`/`:496-497` is corrected to state the true mechanism (fenced content is indexed but as poorly-retrieving non-prose runs), resolving the self-contradiction at `:415`, with the normative D-03/D-04 rules untouched." | ✓ VERIFIED | Live-file read confirms both named sites (STD-05 intro ~:462, D-03 case-boundary ~:496-498) now read "fenced content **is** indexed, but as non-prose runs that retrieve poorly." D-03's normative sentence "Decision content is never placed inside a code fence in a live recipe" survives byte-identical (line 495-496); `:415`'s "lands verbatim as garbage in the citation body" is untouched. **Additive third site** (D7.1/A-3, not named by this SC but a real must-have): D-07 preamble (:538-539) also corrected — no longer reads "silently hide the decision from retrieval", now reads "...would leave the decision indexed only as non-prose runs that retrieve poorly." |

**Score:** 6/6 ROADMAP Success Criteria verified. 0 present-but-behavior-unverified.

### Required Artifacts

| Artifact | Expected | Status | Details |
|---|---|---|---|
| `docs/recipes/03-windows-11-multi-app-kiosk.md` | RE-224, third Device Recipe instantiation, 8-H2 skeleton, delivers SC1-SC5 | ✓ VERIFIED | Exists, 329 lines, `doc_id: RE-224`, `status: Draft` (correctly not flipped — Phase 137's job), EEE block byte-equal to frontmatter, H1 concrete end-state, `## Summary` ≥30 words |
| `docs/_standards/EEE-SOP-standard.md` | Corrected fenced-content rationale at 3 sites + dated Version History row, normative rules unchanged | ✓ VERIFIED | All 3 sites corrected; `## Version History` has exactly 4 dated rows (614-618), the new 2026-07-30 row appended after the unaltered 2026-07-17 row |
| `.planning/research/STACK.md`, `FEATURES.md`, `SUMMARY.md` | D8.2 Operational-precondition appends | ✓ VERIFIED | `git diff --stat` confirms these 3 files modified (+4/-2, +2/-1, +1/-1 lines respectively) — consistent with append-only edits |
| `.planning/REQUIREMENTS.md` | Corrected security-screen claim (KIOSK-04) and namespace-alias paraphrase (KIOSK-02) | ✓ VERIFIED | Traceability table shows KIOSK-01..05 and HYG-05 all marked "Complete" (lines 107-112); `:17` and `:15` corrections present per 135-01-SUMMARY.md |

### Key Link Verification

| From | To | Via | Status | Details |
|---|---|---|---|---|
| Autologon anti-feature row (`Do this instead` cell) | `01-shared-windows-avd-client.md#step-5a-kiosk-configuration` | one-line outbound cross-link, framed as single-app case | ✓ WIRED | Line 53; also duplicated in the Case-1 table's Branch cell (line 79) and `## See Also` (328) |
| Case-1 Branch cell (autologon arm) | `#unsupported-and-anti-feature-callouts` in-doc anchor | fragment link | ✓ WIRED | Line 79 resolves against the actual H2 heading; plan's Gate B mirrored-slugify check asserted this in-phase (135-02 Task 3 `<verify>`) |
| Prerequisites / Steps | `../admin-setup-apv1/08-self-deploying.md`, `03-esp-policy.md`, `04-dynamic-groups.md` | direct relative links | ✓ WIRED | Lines 33, 35 (self-deploying), 36 (ESP), 37 (dynamic groups), 62-64 (Steps); no chaining through recipe 01 (ARCHITECTURE.md Anti-Pattern 8 honored) |
| Payload fence `Profile/@Id` and `DefaultProfile/@Id` | same braced GUID | XSD `guid_t` pattern | ✓ WIRED | Both instances of `{9A2A490F-10F6-4764-974A-43B19E722C23}` (lines 137, 158) — identical, confirmed by direct read |

### Data-Flow Trace (Level 4)

Not applicable — this is a static documentation corpus, not a data-rendering application. No state variables, no API calls, no dynamic data flow to trace.

### Behavioral Spot-Checks / Gate Re-Runs (independently reproduced by the verifier, not trusted from SUMMARY)

| Check | Command | Result | Status |
|---|---|---|---|
| C17 full-corpus | `node scripts/validation/c17-eee-contract.mjs` | `233 files checked, 0 with violations` (all 13 assertions 0) | ✓ PASS |
| C17 self-test | `node scripts/validation/c17-eee-contract.mjs --self-test` | `4 passed, 0 failed` | ✓ PASS |
| check-phase-114 | `node scripts/validation/check-phase-114.mjs` | 7 PASS, 0 FAIL | ✓ PASS |
| check-phase-120 | `node scripts/validation/check-phase-120.mjs` | 6 PASS, 0 FAIL | ✓ PASS |
| check-phase-129 | `node scripts/validation/check-phase-129.mjs` | 3 PASS, 0 FAIL | ✓ PASS |
| check-phase-130 (recipe-01 tripwire) | `node scripts/validation/check-phase-130.mjs` | 5 PASS, 0 FAIL | ✓ PASS |
| check-phase-54 (REQUIREMENTS.md safety) | `node scripts/validation/check-phase-54.mjs` | 32 PASS, 0 FAIL | ✓ PASS |
| check-nav-hub-links | `node scripts/validation/check-nav-hub-links.mjs` | `0 outbound failure(s), 0 inbound failure(s)` | ✓ PASS |
| check-nav-hub-links self-test | `node scripts/validation/check-nav-hub-links.mjs --self-test` | 7 passed, 0 failed | ✓ PASS |
| build-filename-map self-test | `node scripts/pipeline/build-filename-map.mjs --self-test` | 8 passed, 0 failed; registry still 223 rows | ✓ PASS |
| Registry row count | `grep -cE '^\|[[:space:]]*RE-[0-9]+[[:space:]]*\|' docs/_registry/RE-index.md` | `223` | ✓ PASS (unchanged, Phase 137's job) |
| pandoc → convert.ps1 → guard-docx (HARN-16 de-risk, re-run independently) | `pwsh -File scripts/pipeline/convert.ps1 ...` then `node scripts/pipeline/guard-docx.mjs ...` | pandoc 3.7.0.2 confirmed on PATH; convert exit 0; guard-docx 3 PASS, 0 FAIL, 0 SKIPPED | ✓ PASS |
| Debt-marker scan | `grep -inE 'TBD|FIXME|XXX' docs/recipes/03-*.md docs/_standards/EEE-SOP-standard.md` | 0 matches | ✓ PASS |

### Frozen-Surface Diff Check (phase-specific check #4)

```
git diff --stat 444cd987^..HEAD -- docs/recipes/01-shared-windows-avd-client.md scripts/validation/ \
  docs/index.md docs/_registry/RE-index.md scripts/pipeline/filename-map.md docs/_templates/recipe-template.md
```
Output: **empty**. Zero changes to any frozen surface across all of the phase's commits. Full diff-stat (`444cd987^..HEAD`, i.e. before-context to HEAD) confirms exactly the 16 files the plans declared: `.planning/REQUIREMENTS.md`, `.planning/ROADMAP.md`, `.planning/STATE.md`, phase-135 planning artifacts, `.planning/research/{FEATURES,STACK,SUMMARY}.md`, `docs/_standards/EEE-SOP-standard.md`, and `docs/recipes/03-windows-11-multi-app-kiosk.md`.

### Eight Anti-Regression Traps (T-1..T-8) — independently re-checked

| Trap | Verifier's own check | Result |
|---|---|---|
| T-1 backslashes | `grep -n 'DesktopAppPath'` shows single `\` at line 141; `v5:StartPins` JSON shows doubled `\\` at line 148 (`%ALLUSERSPROFILE%\\Microsoft\\Windows\\Start Menu\\Programs\\Microsoft Edge.lnk`) | ✓ correct, inverse not present |
| T-2 pandoc numbering | No sentence anywhere justifies fence placement by "numbering restarts" (grep confirms none in the file) | ✓ no regression |
| T-3 Operational disabled by default | Line 260 states "It is disabled by default, so do this before the first kiosk sign-in" | ✓ present |
| T-4 `AppNotFound` | Section-scoped: absent from lines 256-273 (`## Verification`), present at line 39 (Prerequisites) | ✓ correct placement |
| T-5 shortcuts / GPO name | `grep -in 'security screen'` → 0 hits; `grep -n 'Remove-Logoff'` → 0 hits; `Remove Logoff`/`Remove Task Manager`/`Remove Change Password` all present at line 281 | ✓ correct |
| T-6 22H2 not categorical | Line 32 states the floor plus "not documented... do not assume" caveat; no "22H2 is categorical" assertion anywhere | ✓ correct |
| T-7 unprefixed root / `default:` | `grep -n 'default:'` → 0 hits in the file; namespace table (208-212) labels 2017 row "(root)" with "none — the unprefixed default `xmlns`" | ✓ correct |
| T-8 `AllAppsList` vs `AllAppList` | `<AllAppsList>` appears twice (correct element spelling); `<AllAppList>` (inside angle brackets) 0 hits | ✓ correct |

### Content Honesty Spot-Checks (phase-specific check #7)

Cross-checked 4 first-party claims in the shipped recipe against `135-RESEARCH.md`'s verbatim quotes:

1. **Backslash rule** (line 166 of recipe) — matches `135-RESEARCH.md:176` verbatim CSP-page quote: *"domain\user used in Configuration xml does not need \\ but only one \"*. ✓ Not fabricated.
2. **`Remove Logoff`/`Remove Task Manager`/`Remove Change Password`** (recipe line 281) — matches `135-RESEARCH.md:406-422`, sourced from `assigned-access/policy-settings`, correctly unhyphenated. ✓ Not fabricated.
3. **30-second relaunch time-out, attributed to "the multi-app kiosk page"** (recipe line 283) — matches `135-RESEARCH.md:447`'s exact suggested wording, deliberately avoiding an overclaim that it's verified for a multi-app profile specifically (Concern #3). ✓ Correctly scoped, not overclaimed.
4. **Autopilot Reset / self-deploying no-re-enrollment** (recipe lines 294-295) — matches `135-RESEARCH.md:565` verbatim quote from `autopilot/self-deploying`. ✓ Not fabricated.

No instance found where the recipe asserts something RESEARCH.md marked NOT-FOUND or `[ASSUMED]` as if it were confirmed. The two genuinely `[ASSUMED]`/MEDIUM items (Admin-channel default state, Intune Data-type = String) are both explicitly flagged in the shipped body (lines 270-271, 245) rather than stated as fact.

### Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
|---|---|---|---|---|
| KIOSK-01 | 135-02 | Linear happy path, single-app cross-link, zero recipe-01 edits | ✓ SATISFIED | SC1 row above |
| KIOSK-02 | 135-02 | Bounded schema-valid XML, 3-row namespace table | ✓ SATISFIED | SC2 row above |
| KIOSK-03 | 135-02 | Account-model decision block + anti-feature table | ✓ SATISFIED | SC3 row above |
| KIOSK-04 | 135-02 | `## Rollback/Recovery` named divergence | ✓ SATISFIED | SC4 row above |
| KIOSK-05 | 135-02 | Admin-executable verification, `AppNotFound` as symptom only | ✓ SATISFIED | SC5 row above |
| HYG-05 | 135-01 | EEE-SOP fenced-content rationale corrected at 3 sites | ✓ SATISFIED | SC6 row above |

No orphaned requirements — `.planning/REQUIREMENTS.md` Traceability table maps exactly these 6 IDs to Phase 135, all now marked "Complete", and no Phase-135 requirement is missing a plan `requirements:` claim (135-01-PLAN.md claims `[HYG-05]`; 135-02-PLAN.md claims `[KIOSK-01..05]`).

### Anti-Patterns Found

None. Debt-marker scan (TBD/FIXME/XXX) returned 0 matches across all files this phase modified. No placeholder text, no empty implementations, no hardcoded-empty stub patterns applicable (documentation corpus, not application code).

### Human Verification Required

None. This phase's must-haves are all structurally/textually verifiable via grep, file reads, and re-running the project's own validators — which I did independently rather than trusting SUMMARY.md's reported results. No UI, no runtime behavior, no external service integration is in scope for a documentation phase.

### Gaps Summary

No gaps. All 6 ROADMAP Success Criteria verified against the live corpus with evidence I personally observed (not copied from SUMMARY.md). All phase-specific checks from the verification brief passed:

1. SC5 literally satisfied — AUGMENT-NOT-SUBSTITUTE honored, checkpoint ratified `augment-locked`, Operational line retained verbatim, Admin-channel Event 31000 added as an extra.
2. SC6 + HYG-05's third site — all three sites corrected, D-03's normative sentence unchanged, `:415` and Grounding Notes `:268` and the pre-existing `2026-07-17` Version-History row untouched.
3. Eight traps (T-1..T-8) all held, independently re-checked, no inversions found.
4. Frozen surfaces — zero diff across the phase's commits on recipe 01, all validators, `docs/index.md`, registry, filename-map, and the template.
5. Scope discipline — no navigation/registry wiring, registry still 223 rows, `status: Draft` unflipped.
6. All gates independently re-run by the verifier (not trusted from SUMMARY): C17 233/0, self-test, check-phase-54/114/120/129/130, link-checker 0/0, filename-map self-test, and a fresh pandoc→convert.ps1→guard-docx round-trip (3 PASS/0 FAIL).
7. Four spot-checked first-party claims all trace to verbatim RESEARCH.md quotes — no fabrication found.

---

_Verified: 2026-07-30_
_Verifier: Claude (gsd-verifier)_
