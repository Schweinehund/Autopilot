---
phase: 136-recipe-4-android-dedicated-mhs-multi-app
plan: 02
subsystem: docs
tags: [intune, android, managed-home-screen, dedicated-devices, eee-sop, c17, json-payload]

requires:
  - phase: 136-recipe-4-android-dedicated-mhs-multi-app
    provides: "Plan 1's RE-225 shell, Ruling A (exit_lock_task_mode_code ships in the fence), Ruling B (session-PIN sibling sourced), HYG-06 NO-DRIFT disposition"
provides:
  - "RE-225 body: Scope banner, Prerequisites, Anti-Feature table, 6 Steps (3 decision blocks + 2 Case-3 prompts), single json fence, decomposition table, Verification, Rollback/Recovery, Configuration-Caused Failures, See Also"
  - "Closure-table counts holding exactly on the finished file (8 H2, 6 Steps, 5 Ask-the-admin, 6 What-breaks, 7 Verification lines, 9 anti-feature rows, 10 decomposition rows, 1 json fence)"
  - "D2.9a Step-2-to-Step-6 no-exit-PIN window closed via the named callout-plus-failures-row resolution"
affects: [137-integration-nav-close, 138-harness-close]

actuals:
  tokens: 7300
  tasks: 4
  commits: 4

tech-stack:
  added: []
  patterns:
    - "One-clause bold-lead-in blockquote + plain-prose-beneath for long What-breaks callouts (D3.9's house remedy), used throughout Steps 1-4 and Step 5's assignment callout to stay under the C17 #12 200-char cap without splitting into further blockquote runs"
    - "Case-3 free-value prompt: bare > **Ask the admin:** lead-in, routing/recording prose immediately below and outside the blockquote (grid_size, managed_folders)"

key-files:
  created: []
  modified:
    - docs/recipes/04-android-dedicated-mhs-multi-app.md

key-decisions:
  - "M-A disposition: the OEMConfig Overlay/exact-alarm grant lands as a lead-in sentence in Step 5, not an anti-feature row. Anti-feature table stays at exactly 9 rows, sourced 1:1 from FEATURES.md:93-101."
  - "D2.9a resolution taken: the callout-plus-failures-row path, not the PIN-surfaces-before-Step-2 reorder. Step 2 carries an explicit What-breaks callout naming the window, the no-PIN symptom, and the 05:257 forced-sync remediation; Configuration-Caused Failures carries a matching row."
  - "The offline-device-wrong-allow-list Rollback bullet (D4.3 procedure iii) was DROPPED, not authored uncited — no first-party source for offline-device app-list correction behavior was found or fetched this session. Rollback/Recovery ships 2 procedures (return-to-launcher, forgotten PIN), not 3."
  - "D0.1 reconciliation holds: Step 6 carries exactly one host sentence naming both GUI labels (Leave kiosk mode code / Exit lock task mode password), stating the values must match, carrying [MEDIUM: MS Q&A community, last_verified 2026-08-03], and cross-linking #exit-kiosk-pin-synchronization. Everything else in the exit-PIN half of Step 6 is a link, not new synchronization content — SC1's cross-link clause and SC2's marked-carrier clause are both satisfied by that one sentence."
  - "Runbook-link-first (recipe-template.md:29) landed as a deliberate, named compliance: Step 3's What-breaks callout and one Configuration-Caused Failures row route to the real l2-runbooks/20-android-app-install-investigation.md target; every other What-breaks callout and failures row routes to an in-recipe section anchor (03:311-style), because no other symptom in this recipe genuinely fits an existing L1/L2 runbook's scope."

patterns-established:
  - "RE-225 is now the 2nd recipe carrying ## Rollback/Recovery (KIOSK-04 mandated RE-224's; this phase's own D4.3 ruling — not a requirement — mandates RE-225's). The v1.19-DEFERRED-CLEANUP.md trigger for a template amendment (a third recipe needing the slot) stays unmet; count moves 2-of-4 per 136-01-SUMMARY.md's carry-forward."

requirements-completed: [MHS-01, MHS-02, MHS-03, MHS-04, MHS-05]

coverage:
  - id: D1
    description: "Scope banner, Prerequisites (This recipe is NOT opener + 4 cross-linked prerequisites), and Unsupported/Anti-Feature table (9 rows) authored"
    requirement: "MHS-05"
    verification:
      - kind: other
        ref: "node scripts/validation/c17-eee-contract.mjs — 234 files, 0 violations"
        status: pass
      - kind: other
        ref: "anti-feature table row count = 9 (awk column count over docs/recipes/04-android-dedicated-mhs-multi-app.md)"
        status: pass
    human_judgment: false
  - id: D2
    description: "Steps 1-4 authored: Case-1 token-type block + Case-2 provisioning-method block in Step 1, inlined MHS Required-assignment click-path in Step 2 with D2.9a window closed, allow-listed app deployment in Step 3, Case-2 sign-in-mode block in Step 4"
    requirement: "MHS-01, MHS-02, MHS-03"
    verification:
      - kind: other
        ref: "grep -c '^### Step ' = 4 at task end; grep -c '^> **Ask the admin:**' = 3; grep -c '^> **What breaks if misconfigured:**' = 4 (all confirmed in-session)"
        status: pass
    human_judgment: false
  - id: D3
    description: "Steps 5-6 authored: policy create+assign click-path, single column-0 json fence in the confirmed kind/productId/managedProperty envelope (8 payload keys incl. exit_lock_task_mode_code per Ruling A), decomposition table (10 rows), exit-PIN host sentence (D0.1), MHS-04 contrastive prose sourcing the session-PIN sibling per Ruling B"
    requirement: "MHS-02, MHS-04"
    verification:
      - kind: other
        ref: "node -e fence-parse script: JSON.parse succeeds, envelope has kind/productId/managedProperty, every managedProperty entry has a key — confirmed in-session"
        status: pass
    human_judgment: false
  - id: D4
    description: "Verification (7 lines), Rollback/Recovery (2 procedures), Configuration-Caused Failures (4 rows), See Also (6 entries) authored; full closure-table count assertion passes on the finished file"
    requirement: "MHS-01, MHS-05"
    verification:
      - kind: other
        ref: "closure-table assertion script (Task 4 <verify>) — printed CLOSURE-TABLE OK; c17-eee-contract.mjs — 234 files checked, 0 with violations, 0 total violations"
        status: pass
    human_judgment: false

duration: 55min
completed: 2026-08-03
status: complete
---

# Phase 136 Plan 2: Android Dedicated MHS Recipe — Body Authoring Summary

**RE-225's full body authored over Plan 1's shell — 6 Steps carrying 3 decision blocks + 2 Case-3 prompts, one confirmed-envelope JSON payload fence with its decomposition table, and the four closing sections — every closure-table count from CONTEXT holds exactly on the finished, C17-green 234-file corpus.**

## Performance

- **Duration:** ~55 min
- **Started:** 2026-08-03T19:10:00Z (approx.)
- **Completed:** 2026-08-03T20:05:00Z (approx.)
- **Tasks:** 4
- **Files modified:** 1

## Accomplishments

- Scope banner, Prerequisites, and a 9-row Unsupported/Anti-Feature table authored, sourced 1:1 from `FEATURES.md:93-101`; Knox/Zero-Touch product name and initialism confined to link text throughout the file (Pitfall 14).
- Six `### Step` headings authored carrying exactly 5 decision blocks (1 Case-1 token-type, 2 Case-2 — provisioning method and sign-in mode, 2 Case-3 — `grid_size` and `managed_folders`) and exactly 6 `What breaks if misconfigured` callouts, one per step.
- The D2.9a Step-2-to-Step-6 no-exit-PIN window closed via the named callout-plus-failures-row resolution — not the PIN-surfaces-reorder alternative.
- The single column-0 `json` fence ships in the confirmed `kind`/`productId`/`managedProperty` envelope (Finding 5) with all 8 bounded payload keys, including `exit_lock_task_mode_code` with a placeholder value and an adjacent `[MEDIUM]` caveat callout, per Plan 1's Ruling A.
- Step 6 carries exactly one host sentence satisfying both SC1's cross-link clause and SC2's marked-carrier clause (D0.1), plus MHS-04's fully-sourced contrastive prose naming the `max_number_of_attempts_for_session_PIN` sibling per Plan 1's Ruling B.
- Verification (7 lines), Rollback/Recovery (2 procedures), Configuration-Caused Failures (4 rows), and See Also (6 entries) close the file at exactly 8 H2 headings in template order.
- Every closure-table count from `136-CONTEXT.md`'s Closure section holds exactly on the finished file: 8 H2 / 6 Step / 5 Ask-the-admin / 6 What-breaks / 7 Verification / 9 anti-feature rows / 10 decomposition rows / 1 json fence.
- Full-corpus C17 gate: 234 files checked, 0 with violations, 0 total violations — held after every task.

## Task Commits

Each task was committed atomically:

1. **Task 1: Scope banner, Prerequisites, and the anti-feature table** — `fa8cc1a1` (feat)
2. **Task 2: Steps 1-4 — token type, provisioning method, MHS deployment, app deployment, sign-in mode** — `0eb364c3` (feat)
3. **Task 3: Steps 5-6 — the json payload fence, the decomposition table, and the exit-PIN and hardening step** — `f31d44d2` (feat)
4. **Task 4: Verification, Rollback/Recovery, Configuration-Caused Failures, See Also, and the closure-table count assertions** — `aae6a1bf` (feat)

**Plan metadata:** commit pending (this SUMMARY + STATE/ROADMAP/REQUIREMENTS update)

## Files Created/Modified

- `docs/recipes/04-android-dedicated-mhs-multi-app.md` — grew from the 19-line Plan-1 shell to the full 301-line RE-225 recipe body: Scope banner, Prerequisites, Anti-Feature table, `## Steps` (6 steps), `## Verification`, `## Rollback/Recovery`, `## Configuration-Caused Failures`, `## See Also`.

---

## 1. The Named `## Rollback/Recovery` Template Divergence (mandatory contents item 1)

`## Rollback/Recovery` is a documented divergence from `docs/_templates/recipe-template.md`, which has no such H2 slot. RE-225 carries it per this phase's own D4.3 ruling (not a requirement — `136-01-SUMMARY.md` §4 item 4 records RE-225 as the **second** recipe to carry the section; the `v1.19-DEFERRED-CLEANUP.md` trigger for a template amendment, "a third recipe needs the slot," stays unmet). Positioned between `## Verification` and `## Configuration-Caused Failures`, matching the sole corpus precedent (`03:275-306`). Named here, per D2.2 / D6.3 discipline — the recipe body itself carries zero self-narration of this divergence.

## 2. The Named Runbook-Link-First (mandatory contents item 2)

`recipe-template.md:29` ("Link to relevant troubleshooting runbooks from 'what breaks' callouts") had been silently declined by all three previously-shipped recipes with live targets available (D3.8's `grep 'l1-runbooks\|l2-runbooks' docs/recipes/*.md` returns 0 across RE-222/223/224). **RE-225's compliance is a deliberate, named first.**

Routed to a real runbook (the symptom genuinely fits):
- **Step 3's `What breaks if misconfigured` callout** — `> See: [L2: Android App Install Investigation](../l2-runbooks/20-android-app-install-investigation.md)`, which covers "an MGP or LOB app shows Failed, Not installed, or Pending" — a direct fit for an allow-listed app assigned Available or to the wrong group.
- **One `## Configuration-Caused Failures` row** — the same allow-listed-app-absent symptom, same runbook target.

Routed to an in-recipe section anchor (`03:311`-style) everywhere else, because no other symptom in this recipe's own failure surface genuinely matches an existing L1/L2 runbook's documented scope: the PIN-mismatch, lockout, and D2.9a-window failures route to `[Step 2]`/`[Step 6]` section anchors instead of `l1-runbooks/27` or `28` (which cover ZTE and Knox *enrollment* failures — a different failure class than a post-enrollment PIN-sync or lockout symptom).

## 3. The Three Author-Time Judgments (mandatory contents item 3)

- **M-A row-or-sentence disposition:** the OEMConfig Overlay/exact-alarm grant lands as **one lead-in sentence in Step 5** ("Also declined: the OEMConfig Overlay and exact-alarm permission grant, because every dependent feature ... is itself deferred or scoped to a non-worked sign-in arm"), **not** a 10th anti-feature row. The anti-feature table ships at exactly **9** rows, matching `FEATURES.md:93-101`'s own 9-row source 1:1.
- **D2.9a resolution taken:** the **callout-plus-failures-row** path. Step 2 carries an explicit `What breaks if misconfigured` callout (split into a bold-lead-in blockquote line plus plain prose beneath, per D3.9's house remedy) naming the window, the exact `05:255` symptom string, and the `05:257` forced-sync remediation (force a policy sync rather than wait the typical 8-hour window). `## Configuration-Caused Failures` carries a matching row routing back to `[Step 2]`. The PIN-surfaces-before-Step-2 reorder alternative was **not** taken — it would have broken the linear happy-path spine's step numbering (Steps 1-6 map 1:1 to the artifacts table CONTEXT and this plan both pin).
- **Offline-allow-list Rollback bullet:** **dropped**, not authored uncited. D4.3 procedure (iii) — "an offline device with a wrong `applications` allow-list" — has no first-party source in the repo or fetched this session describing offline-device app-list correction behavior. Per D4.3's explicit instruction ("cite it first-party at author time or drop it. Dropping it is acceptable; asserting it uncited is not"), `## Rollback/Recovery` ships **2** procedures (return-to-standard-launcher, forgotten exit PIN), not 3.

## 4. Closure-Table Actuals (mandatory contents item 4)

Measured on the finished file, all inside CONTEXT's ranges and matching Phase 138's needle-authoring surface exactly:

| Property | CONTEXT range/value | Measured actual |
|---|---|---|
| H2 headings, order | 8, template order + Rollback/Recovery between Verification and Configuration-Caused Failures | **8**, exact order: Summary, Prerequisites, Unsupported and Anti-Feature Callouts, Steps, Verification, Rollback/Recovery, Configuration-Caused Failures, See Also |
| `### Step` headings | 6 | **6** |
| Decision blocks | 5 (1 Case-1, 2 Case-2, 2 Case-3) | **5** |
| `> **Ask the admin:**` lead-ins | 5, all column-0, each ≤200 chars/run | **5**, all column-0, max measured run = 193 chars |
| `What breaks if misconfigured` callouts | ~6, one per step | **6** |
| Anti-feature rows | 9-10 | **9** |
| Decomposition table rows (incl. header) | 10-16 | **10** |
| Verification checklist lines | exactly 7 | **7** |
| Failures-table rows | ≥3 | **4** |
| Code fences | exactly 1, column-0, `json` | **1** |
| Frontmatter tuple | RE-225 / Draft / Guide / Android | intact (Plan 1 shell, unchanged) |
| Blockquote cap | every run ≤200 chars, column-0 | max 193 chars, 0 indented blockquotes |
| Full-corpus C17 | 234 files, 0 violations | **234 files checked, 0 with violations, 0 total violations** |

## 5. D0.1 Reconciliation, Restated (mandatory contents item 5)

SC1 requires the exit-PIN sync be "cross-linked (never re-authored)"; SC2 clause 2.3 mandates it ship `[MEDIUM: MS Q&A community]` with only the date refreshed. Both are satisfied by **exactly one marked host sentence** in Step 6: *"The Device Restrictions profile's **Leave kiosk mode code** and this policy's **Exit lock task mode password** name the same field and must be set to the same value. `[MEDIUM: MS Q&A community, last_verified 2026-08-03]` See [Exit-kiosk PIN synchronization](../admin-setup-android/05-dedicated-devices.md#exit-kiosk-pin-synchronization) for the two policy locations and the remediation if they drift."* `grep -c 'MS Q&A community'` confirms exactly 1 occurrence in the file — this sentence is the cross-link SC1 requires, not re-authored synchronization content; everything beyond it in Step 6's exit-PIN half is a link.

## 6. `[MEDIUM]`-Confidence Click-Path Detail Carried Forward (mandatory contents item 6)

- **Step 5's Assignments-page device-group claim** — `[MEDIUM: MS Learn app-configuration-policies-use-android, last_verified 2026-08-03]`, flagged inline: the article's own introductory prose says "user groups" while its wizard's **Assign to** dropdown offers **Add groups** and **Add all devices**; RESEARCH.md's Open Question 2 notes no page explicitly confirms device-group Entra objects are accepted in the App-Configuration-policy Assignments picker specifically (as opposed to app assignment, separately confirmed device-group-capable). Author-time verification against a live tenant is called out explicitly in the same sentence.
- **Step 2 / Step 5 Delta-3 carry-forward** — `[MEDIUM: MS Learn setup dedicated + add-managed-google-play, last_verified 2026-08-03]` on the MHS auto-add/Required-assignment content, per D2.10's block-scope tag carried from `05:114`.
- **Step 1's token-type Consequence cell** — `[MEDIUM: MS Learn setup dedicated, last_verified 2026-08-03]` on the revoke/recreate/redistribute operational cost, carried per D2.10 with the full consequence unsoftened (Pitfall 11) and the marker unstripped (Pitfall 20).
- **Step 5's exit-PIN caveat callout** — `[MEDIUM: MS Learn, last_verified 2026-08-03]` on the "must be configured through a device configuration profile" caveat (Finding 2's recommended resolution).

## Decisions Made

See "Key Decisions" in frontmatter and Section 3 above for the three author-time judgments. No decisions departed from CONTEXT's locked rulings or Plan 1's two closed conditionals (Ruling A: `exit_lock_task_mode_code` in the fence with a placeholder; Ruling B: `max_number_of_attempts_for_session_PIN` fully sourced, out of the fence).

## Deviations from Plan

None — plan executed exactly as written. Every task's acceptance criteria and `<verify>` command passed on the first or second attempt (six blockquotes needed a length trim across Tasks 2 and 3 to stay under the C17 `#12` 200-character cap — anticipated by the plan's own guardrail 7 and D3.9's "assume overflow" instruction, not a deviation from it).

## Issues Encountered

None.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

RE-225's content is complete and C17-green at the full 234-file corpus. `status: Draft` is unchanged (Phase 137 owns the registry row, the Draft→Approved flip, `docs/index.md` wiring, and the filename-map canary bump 223→225). Zero edits landed on the three frozen surfaces or on the anchor (`git diff --quiet HEAD` confirmed after every task). Phase 138 can author `check-phase-136.mjs` directly against Section 4's measured actuals above — every count is exact, not a range, on the shipped file.

---

## Self-Check: PASSED

- `docs/recipes/04-android-dedicated-mhs-multi-app.md` — FOUND, 301 lines
- Commit `fa8cc1a1` — FOUND in `git log --oneline --all`
- Commit `0eb364c3` — FOUND in `git log --oneline --all`
- Commit `f31d44d2` — FOUND in `git log --oneline --all`
- Commit `aae6a1bf` — FOUND in `git log --oneline --all`
- `node scripts/validation/c17-eee-contract.mjs` — 234 files checked, 0 with violations, 0 total violations — CONFIRMED
- Closure-table assertion script — `CLOSURE-TABLE OK` — CONFIRMED
- `git diff --quiet HEAD -- docs/_glossary-android.md docs/reference/android-capability-matrix.md docs/recipes/01-shared-windows-avd-client.md docs/admin-setup-android/05-dedicated-devices.md` — exits 0 — CONFIRMED
- `git status --porcelain docs/_registry/ docs/index.md scripts/` — empty — CONFIRMED

---

*Phase: 136-recipe-4-android-dedicated-mhs-multi-app*
*Completed: 2026-08-03*
