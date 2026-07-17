---
phase: 130-recipe-1-shared-windows-avd-client-device
plan: 02
subsystem: docs/recipes
tags: [intune, avd, windows-app, kiosk, sharedpc, autopilot, eee-sop, std-05]
requires:
  - 130-01 (HYG-04 RE-084 Wi-Fi correction — the recipe links, never restates)
  - 129 (Device Recipe doc-class foundation — recipe-template.md, STD-05 format)
provides:
  - docs/recipes/01-shared-windows-avd-client.md (RE-222, Draft, C17-enrolled)
affects:
  - Phase 132 (registry row + status-flip + docs/index.md nav wiring)
tech-stack:
  added: []
  patterns:
    - STD-05 composite decision-block format (Case 1 branching at Step 5, Case 2 enumerable at Step 4 session-reset and Step 5b DeletionPolicy, Case-2-nested-conditional at Step 5b InactiveThreshold)
    - Non-converging branch idiom (### Step 5a / ### Step 5b, no reconvergence, PSSO-walkthrough-precedented)
    - Link-not-copy by ownership (RE-084, RE-080, RE-079, RE-177, 802.1X corpus all linked, never restated)
key-files:
  created:
    - docs/recipes/01-shared-windows-avd-client.md
  modified: []
decisions:
  - "doc_id RE-222 assigned now (status Draft); registry row + Approved flip deferred to Phase 132 CLASS-03, per RESEARCH.md Open Question 3 resolution"
  - "AVD-04 maintenance-window/update-ring rendered as a single shared Step 6 block (not per-branch) per Claude's Discretion, with an explicit stated-CSP-differs-per-branch caveat (SharedPC MaintenanceStartTime vs kiosk ScheduleForceRestartForUpdateFailures)"
  - "Session-reset field names (ResetAppOnCloseOnly/ResetAppAfterConnection/ResetAppOnIdle) carried as [ASSUMED] Case-2 enumerable options with an explicit author-time Settings-Catalog verification caveat, per RESEARCH Assumption A4/Pitfall 5"
metrics:
  duration: 45min
  completed: 2026-07-17
---

# Phase 130 Plan 02: Recipe #1 — Shared Windows AVD-Client Device Summary

Authored `docs/recipes/01-shared-windows-avd-client.md` (doc_id RE-222, status Draft) — the first live instantiation of the Phase-129 recipe doc-class — covering the full self-deploying-to-verified-AVD-client happy path, both fully-worked non-converging kiosk/Shared-PC branches, the 4-row anti-feature table, session-hygiene decision points, and the wired-vs-Wi-Fi 802.1X cross-link, entirely within the LOCKED 130-CONTEXT.md design.

## What Was Built

Three tasks, each committed atomically, incrementally authoring one file:

**Task 1 (commit `aaeb4582`):** Scaffolded the recipe from `recipe-template.md`'s fixed skeleton — frontmatter (`doc_id: RE-222`, `platform: Windows`, `status: Draft`, real `last_verified`/`review_by`), EEE header block, D-13 Summary opener (61 words, ≥30-word floor cleared), the H-LOCK-1 verbatim 173-char Scope banner as an isolated blockquote, H-LOCK-3-ordered Prerequisites (RBAC/licensing inline; Autopilot registration, dynamic group, TPM, Ethernet, ESP all linked, never restated), the 4-row anti-feature table in locked order (hybrid Entra join → APv2 → MSRDC → Wi-Fi-at-OOBE, qualified cell), and Steps 1-4 (self-deploying profile, device-phase ESP, dynamic device group, Windows App device-context deployment with the feed-auto-subscribes fact and the `RemoteDesktop/AutoSubscription` legacy CSP note stated once). Step 4 also carries the AVD-04 session-reset STD-05 Case-2 decision block with `[ASSUMED]` field-name flags.

**Task 2 (commit `5889c01a`):** Appended the dominant fork — Step 5's STD-05 Case-1 decision block (Branch cells anchor-synced to `#step-5a-kiosk-configuration` / `#step-5b-shared-pc-configuration`), Step 5a Kiosk (first-party Intune Templates > Kiosk GUI path, Shell-Launcher/Assigned-Access mutual exclusion, MSIX machine-wide provisioning tied to Step 4, `[ASSUMED]` offline-license and console-not-RDP caveats, `Get-StartApps` AUMID discovery with no hardcoded AUMID, an optional-advanced-pointer-only mention of the current turnkey kiosk script), Step 5b Shared PC (Templates > Shared multi-user device recorded-as table, `AccountModel = Domain (1)` with the guest-empty-feed anti-note, `RestrictLocalStorage` polarity stated correctly, `EnableAccountManager` boolean gate, `DeletionPolicy` Case-2 enumerable, `InactiveThreshold` nested conditional under the `DeletionPolicy=2` arm with the 0–60-day GUI bound), Step 6 (shared maintenance-window/update-ring block with the per-branch-CSP-differs caveat), and Step 7 (AVD-05 wired-vs-Wi-Fi boolean if/then prose, cross-linking the 802.1X corpus, no inline 802.1X config).

**Task 3 (commit `d352c2e6`):** Appended the single `## Verification` H2 (shared "confirm first" lead-in with the dynamic-group minutes-to-hours latency caveat and the Windows-App-present-before-sign-in gate, plus two bold-pseudo-heading branch checklists — `**Kiosk branch:**` post-reset autologon + interactive in-app sign-in vs `**Shared PC branch:**` second distinct app-group-assigned Entra user auto-repopulates the feed), `## Configuration-Caused Failures` (6 recipe-owned rows, branch-prefixed, routed to in-recipe anchors or `04-dynamic-groups.md` — zero fabricated runbook links), and `## See Also`.

## Verification Results

- **File:** `docs/recipes/01-shared-windows-avd-client.md` exists, `doc_id: RE-222`, `platform: Windows`, `status: Draft`, `last_verified: 2026-07-17` (no `1970-01-01` sentinel).
- **Anchor-resolution gate** (mirrors `check-nav-hub-links.mjs`'s GitHub-exact strip-in-place slugify, run over the whole file at Task 2 and again at Task 3): **17 headings, all in-doc `#fragment` links resolve.** No double-hyphen slug trap; Step 5 Branch cells match `### Step 5a: Kiosk configuration` / `### Step 5b: Shared PC configuration` exactly.
- **C17 self-test:** `node scripts/validation/c17-eee-contract.mjs --self-test` → **4 passed, 0 failed.**
- **C17 full-corpus:** `node scripts/validation/c17-eee-contract.mjs --verbose` → **231 files checked, 0 with violations, 0 total violations** (recipe enrolled, all 13 assertions `=0`), run after every task.
- **Content guards:** exactly 4 anti-feature rows in locked order; Wi-Fi Feature cell contains both "supported" and "anti-pattern"; the word "supported"/"unsupported" appears next to "Wi-Fi" nowhere else in the body; `2026-03-27` (MSRDC retirement) appears exactly once; no inline ZTDId string (`devicePhysicalIDs` count = 0); no `AVDClientKiosk` string anywhere in the file (the retired-script warning was phrased without naming it, satisfying the plan's literal grep guard); `RestrictLocalStorage = Enabled` string absent; no `runbook` substring in any link target.
- **Note on the plan's Task-1 verify one-liner:** its `grep -qiE '0 violation'` pattern does not match the C17 script's actual phrasing ("`0 with violations`" / "`0 total violations`" — the literal substring "0 violation" never appears contiguously). The underlying assertion — 0 violations — is true and independently confirmed above; this is a cosmetic grep-pattern mismatch in the plan's verify command, not a defect in the recipe or the validator.

## Deviations from Plan

None — plan executed exactly as written. The one item worth flagging is the informational grep-pattern note above (not a Rule 1-4 deviation; no code, content, or validator was changed as a result).

## doc_id / Registry Handoff

`RE-222` was assigned now, in frontmatter, at `status: Draft`, per RESEARCH.md's resolved Open Question 3 (consistent with how every other Guide in this corpus carries its real Doc ID from creation). The registry **row** in `docs/_registry/RE-index.md` (which currently tops out at `RE-221`) and the **status → Approved** flip are explicitly deferred to Phase 132 (CLASS-03) — this phase adds no registry or navigation edits, per 130-CONTEXT.md's phase boundary and the recipe doc-class's navigation-last convention.

## [ASSUMED] Author-Time-Verify Items Remaining

Carried forward, unresolved by this phase (by design — RESEARCH flagged these as requiring live-tenant verification the research agent could not perform):

1. **Windows App session-reset Settings Catalog field names** (`ResetAppOnCloseOnly` / `ResetAppAfterConnection` / `ResetAppOnIdle`, Step 4) — no first-party Learn page documents these for Windows App specifically; sourced from REQUIREMENTS.md only. Flagged inline in the recipe with an explicit "verify against your tenant's Settings Catalog" caveat.
2. **Exact Windows App AUMID string** (Step 5a) — mitigated by design: the recipe instructs `Get-StartApps` discovery on a reference device rather than asserting a specific AUMID.
3. **Autologon-account offline Store license requirement for Windows App** (Step 5a) — inferred by analogy to Kiosk Browser's documented autologon-licensing requirement; no first-party page confirms this specifically for Windows App. Flagged inline as a plan-time verification item.
4. **"Configure from console, not RDP" caveat** (Step 5a) — general Windows administration best practice, no single first-party citation located; low-risk, flagged `[ASSUMED]`.

## AVD-Runbook Gap (G-PLANNER-NOTE)

No AVD/kiosk/feed/SharedPC/autologon runbook exists in `docs/l1-runbooks/` or `docs/l2-runbooks/` (confirmed via glob during research — zero matches). This recipe's `## Configuration-Caused Failures` table routes every row to an in-recipe step anchor or `docs/admin-setup-apv1/04-dynamic-groups.md` instead of a fabricated runbook link. **Flagging as a candidate future phase**: a dedicated AVD-client troubleshooting runbook (covering feed-empty, autologon-fails, app-not-deployed, session-reset-misbehaves scenarios) would let this table route to L1/L2 escalation targets the way every other Configuration-Caused-Failures table in the corpus does. Out of scope for v1.18 per 130-CONTEXT.md G-PLANNER-NOTE — not built here.

## Self-Check: PASSED

- FOUND: `docs/recipes/01-shared-windows-avd-client.md`
- FOUND commit `aaeb4582` (Task 1)
- FOUND commit `5889c01a` (Task 2)
- FOUND commit `d352c2e6` (Task 3)
