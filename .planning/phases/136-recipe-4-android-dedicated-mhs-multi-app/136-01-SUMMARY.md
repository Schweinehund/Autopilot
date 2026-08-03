---
phase: 136-recipe-4-android-dedicated-mhs-multi-app
plan: 01
subsystem: docs
tags: [intune, android, managed-home-screen, dedicated-devices, eee-sop, c17]

requires:
  - phase: 135-recipe-3-windows-11-multi-app-kiosk
    provides: Device Recipe doc-class shell pattern (commit ef155268), delta-authoring convention, D6.1 first-lander handoff table
provides:
  - RE-225 file-identity shell (sentinel-free, C17-clean, 234-file corpus)
  - HYG-06 spot-verification disposition (all NO DRIFT)
  - Ruling A (D1.1/D1.5): exit_lock_task_mode_code ships in Plan 2's fence, 05:253 branch
  - Ruling B (D2.7): sibling key CLOSED, max_number_of_attempts_for_session_PIN sourced
  - Named in-flight research correction to STACK.md:55
  - Four flagged DEFERRED-CLEANUP contributions with named triggers
affects: [136-02-PLAN.md, 137-integration-nav-close, 138-harness-close]

actuals:
  tokens: 1108
  tasks: 3
  commits: 2

tech-stack:
  added: []
  patterns:
    - "Live HTML fetch via curl + Python tag-strip for HYG-06 verification (no WebFetch tool available this session; Bash curl used instead)"
    - "In-flight research correction inline-annotated at the exact challenged cell, per commit 457adc25's CORRECTED-date-reason precedent"

key-files:
  created:
    - docs/recipes/04-android-dedicated-mhs-multi-app.md
  modified:
    - .planning/research/STACK.md

key-decisions:
  - "Ruling A takes the 05:253 branch: exit_lock_task_mode_code ships in Plan 2's fence with a placeholder value, per RESEARCH.md Finding 2's recommendation, confirmed by this plan's own live re-fetch (both the field Note and the JSON worked-example key are present on the same live page, same day)"
  - "Ruling B CLOSED: max_number_of_attempts_for_session_PIN confirmed as the D2.7 sibling; framing ships unsoftened; key stays out of the payload fence"
  - "HYG-06: NO DRIFT on all three SC6 clusters and the PLUS list; anchor left byte-unchanged"

patterns-established:
  - "RE-225 shell mirrors RE-224's Phase-135-Plan-1 shape exactly (frontmatter/EEE-line/H1/Summary only, 19 lines, no blockquote)"

requirements-completed: [HYG-06]

coverage:
  - id: D1
    description: "HYG-06 spot-verification of the three 05-dedicated-devices.md SC6 clusters (token-type semantics, MHS Required-assignment, exit-PIN two-policy locations) plus the PLUS list, against live Microsoft Learn fetches performed this session"
    requirement: "HYG-06"
    verification:
      - kind: manual_procedural
        ref: "live curl fetch of 4 learn.microsoft.com URLs 2026-08-03, cross-checked against docs/admin-setup-android/05-dedicated-devices.md:110-260"
        status: pass
    human_judgment: false
  - id: D2
    description: "RE-225 file-identity shell created: sentinel-free frontmatter, EEE header, one H1, >=30-word Summary; full-corpus C17 gate green at 234 files, 0 violations"
    verification:
      - kind: other
        ref: "node scripts/validation/c17-eee-contract.mjs"
        status: pass
    human_judgment: false
  - id: D3
    description: "Ruling A (D1.1/D1.5 exit-PIN key location) and Ruling B (D2.7 sibling key) closed with first-party evidence; four DEFERRED-CLEANUP contributions drafted with named triggers"
    verification: []
    human_judgment: true
    rationale: "These are editorial/architectural rulings on ambiguous or partially-sourced live documentation, not mechanically checkable outcomes — a human (or Plan 2's own author-time judgment) should confirm the ruling reads as intended before Plan 2 builds the fence on top of it"

duration: 45min
completed: 2026-08-03
status: complete
---

# Phase 136 Plan 1: Android Dedicated MHS Recipe — HYG-06 Verification + Fence-Key Rulings + File-Identity Shell Summary

**HYG-06 spot-verification (all NO DRIFT) + the two Plan-1-gated conditionals ruled (exit-PIN key ships in the fence, D2.7 sibling closed) + the sentinel-free RE-225 shell, C17-clean at 234 files.**

## Performance

- **Duration:** ~45 min
- **Started:** 2026-08-03T18:20:00Z (approx.)
- **Completed:** 2026-08-03T19:05:00Z (approx.)
- **Tasks:** 3
- **Files modified:** 2 (1 created, 1 modified)

## Accomplishments

- HYG-06 discharged at D4.5's exact scope: all three SC6 clusters plus the PLUS list spot-verified against four live Microsoft Learn fetches performed this session (2026-08-03), all NO DRIFT.
- Both surviving Plan-1-gated conditionals ruled: Ruling A (D1.1/D1.5, exit-PIN key location) and Ruling B (D2.7, sibling key), each with first-party citations.
- A named in-flight research correction landed at `.planning/research/STACK.md:55`.
- The RE-225 file-identity shell exists, is sentinel-free, and the full-corpus C17 gate moved 233 → 234 files at zero violations.
- Four DEFERRED-CLEANUP contributions drafted with named triggers, ready for Phase 138/HARN-16's `v1.19-DEFERRED-CLEANUP.md`.

## Task Commits

1. **Task 1 (HYG-06 spot-verification) + Task 2 (rulings + landing spots)** — `36b4becc` (docs) — no separate Task-1-only commit exists because Task 1 produced no file diff (NO-DRIFT branch leaves the anchor byte-unchanged); its findings and Task 2's STACK.md:55 correction are combined in this single commit.
2. **Task 3 (RE-225 file-identity shell)** — `fe6dce27` (feat)

**Plan metadata:** commit pending (this SUMMARY + STATE/ROADMAP/REQUIREMENTS update)

## Files Created/Modified

- `docs/recipes/04-android-dedicated-mhs-multi-app.md` — new. Sentinel-free shell: frontmatter (`doc_id: RE-225`, `status: Draft`, `doc_type: Guide`, `platform: Android`, `last_verified: 2026-08-03`, `review_by: 2026-11-01`), EEE header line, one H1 ("Android Dedicated Multi-App Kiosk: Managed Home Screen Provisioning"), one `## Summary` (92 words).
- `.planning/research/STACK.md` — line 55's `exit_lock_task_mode_code (device-restrictions-profile only)` parenthetical corrected in place (named in-flight correction, see Ruling A below).

---

## 1. HYG-06 Disposition

**Fetch date: 2026-08-03.** Four live Microsoft Learn pages fetched this session via `curl` (no WebFetch/WebSearch tool was available in this session's toolset; outbound network access to `learn.microsoft.com` was confirmed reachable and used directly per the task precondition — this is this plan's own fetch, not a transcription of `136-RESEARCH.md`'s 2026-08-03 pass):

- `learn.microsoft.com/en-us/intune/device-enrollment/android/setup-dedicated`
- `learn.microsoft.com/en-us/intune/app-management/deployment/add-managed-google-play`
- `learn.microsoft.com/en-us/intune/device-configuration/templates/ref-device-restrictions-android-enterprise`
- `learn.microsoft.com/en-us/intune/app-management/configuration/configure-managed-home-screen`

### Cluster A — token-type semantics (`05:116-131`)

**Disposition: NO DRIFT.** Verbatim, live-fetched 2026-08-03 (`setup-dedicated`):

> "Corporate-owned dedicated device (default): This token enrolls devices as a standard Android Enterprise dedicated device. These devices require no user credentials at any point. This is the default token type that dedicated devices will enroll with unless updated by Admin at time of token creation."

Both token names and their semantics (Standard = no per-user credentials; the Entra-shared-mode token auto-configures Entra shared device mode) match `05:120-121` in substance. Mandatory-expiry / no-never-expires: confirmed ("Enter the date you want the token to expire, up to 65 years in the future" — no never-expires field shown). Irreversibility/revoke-recreate-redistribute cost (`05:123`/`05:129`): **not re-sourceable** — the fetched page documents Replace/Revoke/Export actions but never states the field-QR-redistribution cost; recorded as *not re-confirmed, not contradicted*, anchor's existing `[MEDIUM]` tag stays as-is (D0.4: this is not treated as drift or a licence to upgrade the marker).

### Cluster B — MHS Required-assignment (`05:143-153`)

**Disposition: NO DRIFT.** Verbatim, live-fetched 2026-08-03 (`setup-dedicated`):

> "Only apps that have assignment type set to Required can be installed on Android Enterprise dedicated devices."

Verbatim (`add-managed-google-play`):

> "Managed Home Screen - Used for both Android Enterprise dedicated multi-app kiosk and fully managed user affiliated device scenarios. IT admins should create an assignment to install this app on dedicated devices that are going to be used in multi-app kiosk scenarios."

The general Required-only rule and the MHS-specific assignment guidance both confirm `05:145`'s "MUST be assigned as Required" claim. The `05:145` second-sentence consequence ("device boots to the standard Android launcher instead of MHS") is **not independently re-sourceable** — neither fetched page states this fallback explicitly; recorded as *not re-confirmed, not contradicted*.

### Cluster C — exit-PIN two-policy locations (`05:249-255`)

**Disposition: NO DRIFT** on the GUI-label/location facts. Verbatim, live-fetched 2026-08-03 (`ref-device-restrictions-android-enterprise`):

> "Leave kiosk mode: Enable allows Administrators to temporarily pause kiosk mode to update the device... Leave kiosk mode code: Enter a 4-6 digit numeric PIN. The administrator uses this PIN to temporarily pause kiosk mode."

GUI labels and behavior match `05:251` exactly.

**The exit-PIN synchronization requirement's own disposition — separate from the locations (mandatory contents item 2):** neither `ref-device-restrictions-android-enterprise` nor `configure-managed-home-screen` states that the Device Restrictions PIN and the MHS App Configuration PIN must carry identical values. A cross-reference sentence exists (`ref-device-restrictions-android-enterprise`, live-quoted): "Some of the Managed Home Screen settings are available in a device restrictions policy. To view and use all the available settings for the Managed Home Screen, create a Managed Home Screen app configuration policy" — this is a pointer between the two surfaces, **not** a "values must match" statement. This is this session's own independent confirmation of the gap RESEARCH.md's Finding 1 Cluster C called a "third independent research pass" — with this plan's own live fetch, that makes a fourth. **MHS-02's `[MEDIUM: MS Q&A community]` tag stands unchanged, date refreshed only.**

### PLUS list — verbatim confirmations, live-fetched 2026-08-03 (`configure-managed-home-screen`)

- `enable_mhs_signin` default FALSE: "Enable sign in | bool | FALSE | Turn this setting to True to enable end users to sign in to Managed Home Screen... By default this setting is off." — NO DRIFT.
- `signin_type` default + account-type negative: "Sign in type | string | Microsoft Entra ID | ... Otherwise, set it to 'Other.' Users who sign in with a non-Microsoft Entra ID account don't get single sign-on to all apps integrated with Microsoft Entra shared device mode, but they still sign in to Managed Home Screen." — NO DRIFT.
- Exit-PIN retry keys, no-unit confirmation: "Maximum number of attempts to exit lock task mode | integer | 0 | ... This setting can only be used if Exit lock task mode password is configured." and "Time before exit lock task password can be retried | integer | 0 | ..." — neither row states a unit (seconds/minutes), in contrast to sibling timers on the same page that do. NO DRIFT, MHS-04's no-unit claim confirmed exactly.
- D2.7's sibling — see Ruling B below.

**Branch taken: NO-DRIFT.** No edit was made to `docs/admin-setup-android/05-dedicated-devices.md`; `git diff --quiet HEAD -- docs/admin-setup-android/05-dedicated-devices.md` exits 0. This satisfies SC6's "or the no-op recorded explicitly" clause literally: fetch date 2026-08-03, the three cluster names (`05:116-131`, `05:143-153`, `05:249-255`), and the words **no drift**.

## 2. Ruling A (D1.1/D1.5) — the `exit_lock_task_mode_code` location

**Branch taken: the `05:253` branch.** `exit_lock_task_mode_code` ships in Plan 2's fence with a placeholder value (never a concrete PIN), plus an adjacent cross-link to `#exit-kiosk-pin-synchronization`, plus a one-line callout carrying the field Note's own caveat.

**Both live Learn statements, quoted verbatim, fetched 2026-08-03 from `configure-managed-home-screen` (both on the same live page, same fetch):**

**Statement A** (settings table, "Configurations to help with troubleshooting issues on the device"):

> "Exit lock task mode password | string | (blank default) | Enter a 4-6-digit code to use to temporarily drop out of lock-task mode for troubleshooting. Note: This password must be configured through a device configuration profile. Once the password is set, its value is obfuscated and can't be viewed again. To rotate or change the password, configure a new value in the device configuration profile."

**Statement B** (Microsoft's own worked "JSON Data Examples" sample, confirmed present at the JSON-example line carrying this exact key):

```json
{
    "key": "exit_lock_task_mode_code",
    "valueString": "123456"
}
```

— present as a directly-settable `managedProperty` entry inside the MHS App Configuration policy's own JSON payload.

**Additional evidence found by this plan's own fetch, beyond what `136-RESEARCH.md` cited:** the same settings table carries an "Available in device configuration profile" column with a per-row checkmark. "Exit lock task mode password" is marked available (✔️) in the device configuration profile — consistent with Statement A — but this column does not assert exclusivity, and Statement B independently proves the key is also a legal, settable JSON key inside the App Configuration policy. Neither statement is falsified by the other; `05:249-255`'s own "requires configuration in two separate Intune policies" framing is consistent with both.

**Why the answer is not already in the repo (D0.4):** `.planning/research/STACK.md:55` (pre-correction) asserted `exit_lock_task_mode_code` was "(device-restrictions-profile only)" — an exclusivity claim no source in the repo had independently verified against Microsoft's own JSON worked example; only a live fetch of `configure-managed-home-screen` could confirm or falsify it, which is exactly what Task 1 performed.

**Downstream consequence for Plan 2's fence key set:** `exit_lock_task_mode_code` is IN the bounded 8-key payload fence (with a placeholder value, never a concrete PIN), which determines the decomposition table's row for this key, the Verification checklist (exit-PIN prompt line), and the Configuration-Caused Failures table's mismatched-PIN row.

**In-flight research correction (mandatory contents item 8):** `.planning/research/STACK.md:55` — the `(device-restrictions-profile only)` exclusivity parenthetical is corrected in place, per D8.2's `457adc25` in-flight-correction pattern, committed at `36b4becc`. No `05-dedicated-devices.md` edit results — the anchor's own "two separate Intune policies" framing was never contradicted, only `STACK.md`'s stronger exclusivity claim was.

## 3. Ruling B (D2.7) — the sibling key

**Status: CLOSED.** Sibling key: `max_number_of_attempts_for_session_PIN`, designer label **"Maximum number of attempts for session PIN"** — confirmed by this plan's own live fetch (`configure-managed-home-screen`, 2026-08-03):

> "Maximum number of attempts for session PIN | string | | Define the maximum number of times a user can attempt to enter their session PIN before getting automatically logged out from Managed Home Screen. The default value is zero (0), where zero (0) means the user gets infinite tries... This setting can only be used if Enable session PIN and Enable sign in is set to True."

| | `max_number_of_attempts_for_exit_PIN` | `max_number_of_attempts_for_session_PIN` |
|---|---|---|
| Gate | "This setting can only be used if Exit lock task mode password is configured" | "This setting can only be used if Enable session PIN and Enable sign in is set to True" |
| Consequence | "getting blocked from attempting to exit lock task mode" | "getting automatically logged out from Managed Home Screen" |

MHS-04's near-identical-names / opposite-gates / different-consequences framing (blocked-from-retry vs. automatic logout) **ships as written and does NOT soften.** The sibling key stays **OUT of the payload fence** — it is a sign-in-gated sub-key, inert under RE-225's worked `enable_mhs_signin: false`, the same category as D3.3's other excluded sign-in sub-keys — but is now fully cited, available for MHS-04's contrastive prose.

## 4. Four Flagged `v1.19-DEFERRED-CLEANUP.md` Contributions (D4.7's gate)

No `v1.19-DEFERRED-CLEANUP.md` file was created by this plan (`test ! -f .planning/v1.19-DEFERRED-CLEANUP.md` — confirmed). Phase 138/HARN-16 creates the file and transcribes these four entries verbatim:

1. **Option B — a shared kiosk/dedicated taxonomy Reference doc.** Barred here: the canary is locked at 223 → 225 and Phase 137 has a two-row budget (`ROADMAP.md:104` SC2, `REQUIREMENTS.md:30`). **Trigger:** a third lockdown recipe lands and the canary budget is free.
2. **The anchor's past-due `review_by: 2026-06-22`** (`docs/admin-setup-android/05-dedicated-devices.md`). Now 42 days past due as of this session's date (2026-08-03). This entry applies **because Task 1 took the NO-DRIFT branch.** **Trigger:** the next phase or milestone that touches this anchor doc refreshes its `last_verified`/`review_by` pair as a named correction.
3. **The `c17-eee-contract.mjs:150` → `:158` coordinate correction at all six sites** (`135-CONTEXT.md:48`, `:204`, `:287`; `135-01-SUMMARY.md:113`; `135-02-SUMMARY.md:196`; `135-PATTERNS.md:312`). The `^`-anchored fence regex is at `:158`; `:150` is the enclosing `inCodeFence` IIFE opener (T-6). Appended to the existing fence-mask entry rather than opening a new one. **Trigger:** the next phase that edits any of the six sites, or a dedicated tooling pass.
4. **The `## Rollback/Recovery` template-divergence count.** `135-02-SUMMARY.md:195` set the trigger at *"when a third recipe needs the slot"*; RE-225 (Plan 2) will be the **second** recipe to carry this section, so the trigger stays unmet. Recorded here so the successor does not re-derive the count: **2-of-4** as of this phase. **Trigger:** a third recipe needs the `## Rollback/Recovery` slot.

## 5. D2.10 Marker Carry-Forward List (for Plan 2)

Every Step line and decision-table cell whose underlying fact comes from a `05` `[MEDIUM]`-tagged section carries an equivalent marker forward in Plan 2's body. `05:114` tags the **entire Delta-1..4 block** (`05:116-167`) `[MEDIUM: MS Learn setup dedicated, last_verified 2026-04-22]` — this is a block-scope tag, so the carry-forward is unrestricted across all four deltas, not token-type-only:

- **Delta 1 (token type, `05:116-131`)** — Step 1's confirm-and-route content, and the token-type decision-table `Branch` cell — carries `[MEDIUM]` forward.
- **Delta 2 (static device group, `05:133-141`)** — any Step content referencing the static-vs-dynamic device group requirement for the enrollment profile — carries `[MEDIUM]` forward.
- **Delta 3 (MHS Required assignment, `05:143-153`)** — Step 2's MHS app-deployment content, the source for the D2.9a Step-2-window callout — carries `[MEDIUM]` forward (this is the instance R1's Referee confirmed was missing in an earlier round; not a carve-out).
- **Delta 4 (token expiry/QR rotation, `05:155-167`)** — any Step 1 prose referencing token expiry — carries `[MEDIUM]` forward.
- **`05:243-260` (exit-kiosk PIN synchronization)** — separately tagged `[MEDIUM: MS Q&A community, last_verified 2026-04-22]` at `05:247`/`05:255` — Plan 2's D1.7 host sentence carries this tag forward with the date refreshed to 2026-08-03 (this plan's own confirmation, see Section 1 above), per D0.1's single-host-sentence rule.

A marker qualifies the SOURCE, not the SEVERITY (D2.10): the MHS-02 `05:129` revoke/recreate/redistribute cell, if it appears in Plan 2, ships its full operational consequence **and** its marker — neither is softened nor stripped.

## 6. D0.1 Reconciliation Statement

SC1 states the exit-PIN sync is *"cross-linked (never re-authored)"*; SC2 and MHS-02 mandate it ship `[MEDIUM: MS Q&A community]` with only the date refreshed. A marker cannot attach to a bare link. Per D1.7 (locked, non-conditional), Plan 2 carries **exactly one host sentence** in the exit-PIN step naming both GUI labels ("Leave kiosk mode code" / "Exit lock task mode password"), stating the values must match, carrying `[MEDIUM: MS Q&A community, last_verified 2026-08-03]` and the cross-link to `#exit-kiosk-pin-synchronization`. This single sentence is SC1's cross-link carrier **and** SC2 clause 2.3's marked-carrier simultaneously — a verifier reading SC1 verbatim ("cross-linked, never re-authored") should read this host sentence as the cross-link, not as re-authoring, because everything beyond it in Plan 2's exit-PIN step is a link, not new synchronization content.

## Decisions Made

- Ruling A takes the `05:253` branch (RESEARCH.md Finding 2's recommendation), confirmed independently by this plan's own live fetch rather than accepted on RESEARCH.md's authority alone — the precondition required a genuine fetch, and the fetch reproduced the same both-statements ambiguity Finding 2 described, plus one additional corroborating detail (the "Available in device configuration profile" column) not previously cited.
- Ruling B closes outright — no softening needed, the sibling is fully sourced.
- HYG-06 lands NO-DRIFT on every cluster; no anchor edit.

## Deviations from Plan

**None — plan executed exactly as written**, with one process note: this session's toolset did not include a dedicated WebFetch/WebSearch tool, so Task 1's live-fetch precondition was satisfied via `curl` (confirmed reachable to `learn.microsoft.com`, HTTP 200) piped through a Python HTML-tag-stripping pass for readable text extraction, rather than a built-in fetch tool. This is a mechanism substitution only — the fetch itself is this plan's own, dated 2026-08-03, against the same four URLs `136-RESEARCH.md` names, and every quote above was independently re-extracted from the raw HTML, not copied from `136-RESEARCH.md`'s prose.

## Issues Encountered

None.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

Plan 2 (136-02) can proceed immediately: both Plan-1-gated conditionals are ruled (fence carries 8 keys including `exit_lock_task_mode_code` with a placeholder), the HYG-06 disposition is recorded, the D2.10 marker carry-forward list is available, and the RE-225 shell exists at the exact 234-file C17-green baseline Plan 2 will extend. No blockers.

---

## Self-Check: PASSED

- `docs/recipes/04-android-dedicated-mhs-multi-app.md` — FOUND
- `.planning/research/STACK.md` (modified) — FOUND
- Commit `36b4becc` — FOUND in `git log --oneline --all`
- Commit `fe6dce27` — FOUND in `git log --oneline --all`
- `node scripts/validation/c17-eee-contract.mjs` — 234 files checked, 0 with violations, 0 total violations — CONFIRMED
- `git diff --quiet HEAD -- docs/_glossary-android.md docs/reference/android-capability-matrix.md docs/recipes/01-shared-windows-avd-client.md` — exits 0 — CONFIRMED
- `git diff --quiet HEAD -- docs/admin-setup-android/05-dedicated-devices.md` — exits 0 (NO-DRIFT branch, anchor byte-unchanged) — CONFIRMED
- `test ! -f .planning/v1.19-DEFERRED-CLEANUP.md` — CONFIRMED (no file created)

---

*Phase: 136-recipe-4-android-dedicated-mhs-multi-app*
*Completed: 2026-08-03*
