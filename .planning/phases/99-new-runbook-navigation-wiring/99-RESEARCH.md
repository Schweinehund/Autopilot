# Phase 99: New Runbook + Navigation Wiring — Research

**Researched:** 2026-06-29
**Domain:** Documentation authoring — macOS L1 runbook (local password recovery) + navigation hub wiring
**Confidence:** HIGH — all findings derived directly from corpus file reads; no external research required or performed

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**D-01 (GA1): Runbook home — NEW dedicated L1 runbook `docs/l1-runbooks/37-macos-local-password-reset.md`**
- New file at next free number (37), macOS ADE Runbooks family alongside #35/#36.
- Frontmatter: `audience: L1`, `platform: macOS`, `applies_to: ADE` (mirror #36 exactly).
- Title/slug: use a plain-GitHub slug; if an em-dash title is used, avoid the double-hyphen slug trap.

**D-02 (GA2): Boundary vs L1 #36 — #37 owns access-recovery; hands off to #36 for PSSO re-registration; #36 gets a reciprocal back-link ONLY**
- #37 scope: "regain account access / reset-or-recover the local password" (three recovery paths).
- #36 scope: "restore/re-register Platform SSO" (post-recovery Secure-Enclave-key re-registration).
- Single hand-off: at end of every recovery path, #37 cross-links to #36 for mandatory PSSO re-registration.
- #36 receives only a reciprocal cross-link line — no restructuring.

**D-03 (GA3): Recovery-path structure — sequential per-path sections with a recommended primary**
- Structure B: one labeled section per recovery path.
- Primary: escrowed FileVault recovery key. Secondary: macOS LAPS managed admin. Tertiary: Apple ID ("where org policy allows").
- Apple-ID gating: present conditionally as "where org policy allows."
- SSPR clarification: state brief fact inline at the explanation/root-cause step + cross-link to depth (03/07/08).

**D-04 (GA4): Navigation wiring — 5 hubs IN, quick-ref-l2 OUT, navigation-last**
- IN: `docs/l1-runbooks/00-index.md`, `docs/index.md` (line-110 PSSO row, NOT stale line-108 count), `docs/common-issues.md` (new H3, escalates to L2 #27), `docs/quick-ref-l1.md`, `docs/decision-trees/06-macos-triage.md` (new MAC3 leaf).
- OUT: `docs/quick-ref-l2.md`.
- Navigation-last: hubs committed only after #37 file is committed.

### Claude's Discretion
- Exact runbook section headings, prose wording, and the specific "Say to the user" L1 phrasing (follow #35/#36 voice).
- Exact common-issues H3 wording and quick-ref-l1 trigger phrasing (subject to D-03 distinct-trigger and slug-discipline constraints).
- The precise MAC3 leaf label/edge wording in the triage tree.

### Deferred Ideas (OUT OF SCOPE)
- Stale nav counts: `docs/index.md:108` "(6 runbooks: …)" and `06-macos-triage.md:101` "All 6 macOS L1 runbooks" are pre-existing debt — NOT fixed in this phase.
- `check-phase-99.mjs` validator + chain-apex extension — owned by Phase 100 (HARN-02, indivisible Atom 2). Phase 99 records the needle-spec hand-off only.
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| RUN-01 | A local-macOS-password-reset procedure for Secure-Enclave PSSO devices exists — recovery paths (escrowed FileVault recovery key / managed admin via macOS LAPS / Apple ID where allowed), the clarification that SSPR resets the Entra password but not the independent local password, and the mandatory PSSO re-registration follow-up cross-linked to L1 #36; navigation-wired into the macOS hubs. | Corpus provides the runbook skeleton (#35/#36 structure), FileVault escrow/retrieval facts (03:158-182), PSSO/SSPR facts (07:61-79), and complete hub insertion points. Gaps for LAPS login steps and Apple-ID login-window steps are flagged for executor to author from verified knowledge. |
</phase_requirements>

---

## Summary

Phase 99 delivers a single new documentation artifact (L1 runbook #37) and five navigation-hub edits. This is a pure documentation authoring phase — no code changes, no package installs, no external research. All technical facts needed for the runbook content are present in the existing corpus (guides 03 and 07); gaps are identified precisely below. The authoring constraint that locks out Terminal commands from recovery steps (obj-7 from adversarial review) is fully confirmed against #36's actual step ordering.

The navigation wiring follows the established Phase 81/87/92 pattern: mermaid leaf addition, index table row, quick-ref bullet, common-issues H3, and main-index row extension — all committed only after the runbook file is confirmed merged.

**Primary recommendation:** Author #37 as a pre-login GUI-steps runbook (three labeled sections, primary-first), with SSPR clarification inline using the #35:32/#36:34/45 inline-fact-plus-cross-link pattern, and a single hand-off to #36 at the end of each path. Wire the five hubs in a second commit after #37 is on main.

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| L1 runbook #37 authoring | Static docs | — | Pure markdown file, no application tier |
| Recovery-path source facts | Existing admin guides (03, 07) | — | Cross-link only; those files are locked no-edit |
| Navigation hub wiring | Static docs (5 hub files) | — | Append-only edits per navigation-last constraint |
| PSSO re-registration follow-up | L1 #36 (existing) | — | #37 hands off; #36 owns re-registration |
| Validator authoring | Phase 100 | — | Out of scope; needle-spec hand-off only |

---

## Runbook Content Map

### #37 Frontmatter (mirror #36 exactly)

```yaml
---
last_verified: 2026-06-29
review_by: 2026-09-29
applies_to: ADE
audience: L1
platform: macOS
---
```

[VERIFIED: direct read of 36-macos-secure-enclave-key.md lines 1-7 and 35-macos-sso-sign-in-failure.md lines 1-7]

### #37 Skeleton (mirror #35/#36 structure)

```
> **Platform gate:** This guide covers macOS ADE troubleshooting via Intune.
  For Windows Autopilot, see [Windows L1 Runbooks](00-index.md#apv1-runbooks).

# [H1 title — executor's discretion; avoid em-dash double-hyphen slug trap]

Use this runbook when... [trigger paragraph]

## Prerequisites

- Access to Intune admin center (https://intune.microsoft.com)
- Access to Microsoft Entra admin center (https://entra.microsoft.com) — read-only is sufficient
- Device serial number
- User's UPN (email address)

## Steps

### Recovery Path A — Escrowed FileVault Recovery Key (Primary)
[pre-login GUI steps; SSPR clarification inline here]
...
> After completing this path, proceed to [L1 #36](36-macos-secure-enclave-key.md) for
> the mandatory PSSO re-registration — using the recovery key destroys the Secure
> Enclave binding. See also: [SE Key Destruction Warning](../admin-setup-macos/08-auth-methods-deep-dive.md).

### Recovery Path B — macOS LAPS Managed Admin Account (Secondary)
[pre-login GUI steps]
...
> After completing this path, proceed to [L1 #36](36-macos-secure-enclave-key.md) for
> the mandatory PSSO re-registration — resetting the local password destroys the Secure
> Enclave binding.

### Recovery Path C — Apple ID Reset (Where Org Policy Allows)
[pre-login GUI steps; gating language]
...
> After completing this path, proceed to [L1 #36](36-macos-secure-enclave-key.md) for
> the mandatory PSSO re-registration.

## Escalation Criteria
[escalate to L2 #27 if recovery fails or PSSO re-registration fails after attempting #36]

---

[Back to macOS ADE Triage](../decision-trees/06-macos-triage.md)

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-06-29 | Initial version | -- |
```

[VERIFIED: structure derived from direct reads of #35 and #36]

---

### Recovery Path A — FileVault Recovery Key: Verified Facts

**Source:** `docs/admin-setup-macos/03-configuration-profiles.md` §FileVault [VERIFIED: lines 158-182]

| Fact | Location | Content |
|------|----------|---------|
| Escrow is automatic | 03:160 | "The personal recovery key is escrowed to Intune automatically when an Intune policy encrypts the device… There is no separate 'escrow = on/off' toggle — escrow is a property of Intune-driven encryption." |
| Admin retrieval (Intune) | 03:180 | Devices > All devices > [device] > Monitor > Recovery keys > **Show Recovery Key** (Corporate devices only; RBAC role: **Remote tasks > Rotate FileVault key = Yes**) |
| User self-service retrieval | 03:182 | Company Portal website (`portal.manage.microsoft.com`) > Devices > the Mac > **Get recovery key** (primary/most reliable; also the iOS/Android/Intune apps) |
| Corporate-only restriction | 03:161 | Admins can view/rotate for Corporate devices only — NOT Personal/BYOD |
| RBAC role required | 03:181 | "Requires an RBAC role with Remote tasks > Rotate FileVault key = Yes (built-in: Help Desk Operator or Endpoint Security Administrator)" |

**GAP — pre-boot user-side steps [ASSUMED]:** The corpus documents the admin-side key retrieval from Intune and the user self-service retrieval from Company Portal. The user-side pre-boot steps at the macOS FileVault recovery screen (entering the recovery key at the login window after clicking the "?" icon, or booting to macOS recovery) are NOT documented in the corpus. Executor must author these steps from verified knowledge (standard macOS behavior — not Intune-specific).

**Authoring note:** Path A has two sub-steps:
1. Admin retrieves recovery key from Intune (or user retrieves from Company Portal)
2. User enters recovery key at the macOS login window (the "?" → recovery key entry flow)

Both must be pre-login GUI — no Terminal.

**SE-key destruction on recovery key use:** [VERIFIED: 36:43-45] "Both events destroy the Secure Enclave key binding that Platform SSO uses for Entra authentication." Using the FileVault recovery key is explicitly listed as one of those events.

---

### Recovery Path B — macOS LAPS Managed Admin: Verified Facts

**Source:** `docs/admin-setup-macos/07-platform-sso-setup.md` lines 72-74 [VERIFIED]

| Fact | Location | Content |
|------|----------|---------|
| LAPS admin existence | 07:74 | "Managed local admin (LAPS) — Auto-generated + auto-rotated by Intune (6-month default) — break-glass only." |
| Use context | 07:77 | "reset the local password only on suspected compromise (recovery via the escrowed FileVault recovery key or the managed admin)" |

**GAP — LAPS password retrieval from Intune and login-window steps [ASSUMED]:** How an admin retrieves the LAPS-generated password from Intune admin center (Devices > [device] > Local admin password) and how the user then logs in at the macOS login window as the managed admin account to reset the main user's password are NOT documented in the corpus. Executor must author from verified knowledge (macOS LAPS Intune-side retrieval + local admin login steps).

**Authoring note:** Path B involves:
1. Admin retrieves the LAPS password from Intune (admin portal step, not user-visible)
2. User logs in at the macOS login window as the managed local admin account
3. Admin (or LAPS admin session) resets the end-user's local password
4. User logs back in with their new local password

All steps are pre-login GUI (login window) or admin-portal — no Terminal.

**SE-key destruction on local password reset:** [VERIFIED: 36:43] "Both events destroy the Secure Enclave key binding" — an MDM-driven password reset is listed as one event. Any password reset via LAPS admin similarly changes the local password → mandatory #36 follow-up.

---

### Recovery Path C — Apple ID Reset: Source Facts

**Source:** NOT documented in this corpus.

**GAP — entire path [ASSUMED]:** The macOS "Forgot Password?" → Apple ID reset flow at the macOS login window is a standard macOS feature (user clicks the "?" under the password field, selects "Reset it using your Apple ID"). This flow is NOT documented anywhere in the corpus. Executor must author from verified knowledge.

**Gating language (locked):** Present as "where org policy allows" per D-03. FileVault recovery key + LAPS are the always-available fallbacks so this gated path can never become a dead-end.

**Important caveat for executor:** In ADE/corporate deployments, the local account may NOT have an Apple ID associated (account was created by MDM). The L1 executor must flag this possibility with "If prompted for an Apple ID and none is associated, use Path A or B instead." This is Claude's discretion on wording.

---

### SSPR Clarification — Inline-Fact-Plus-Cross-Link Pattern

**Placement per D-03:** State inline at the explanation/root-cause step — NOT a standalone top callout, NOT cross-link-only.

**Pattern to mirror (verified):**
- `35:32`: "The expected healthy output includes both `Device Registration: REGISTERED` and `User Registration: REGISTERED`… For the confirmed healthy output format, see [Platform SSO Setup Guide — Verification section](../admin-setup-macos/07-platform-sso-setup.md)."
- `36:34`: "After a Secure Enclave key loss event… For the confirmed healthy output format (both `Device Registration: REGISTERED` and `User Registration: REGISTERED`), see [Platform SSO Setup Guide — Verification section]."
- `36:45`: "For the technical explanation of why this occurs, see [macOS Auth Methods Deep-Dive — SE Key Destruction Warning](../admin-setup-macos/08-auth-methods-deep-dive.md)."

[VERIFIED: direct reads of #35 and #36]

**Cross-link depth targets for SSPR clarification:**
- `../admin-setup-macos/07-platform-sso-setup.md#local-password-lifecycle-and-rotation` (07:67 section heading)
- `../admin-setup-macos/03-configuration-profiles.md#local-password-policy-passcode` (03:98 section heading)

[VERIFIED: both sections exist; grep confirmed `## Local Password Policy (Passcode)` at 03:98 and heading "Local password lifecycle and rotation" at 07:67]

---

## Pre-Login Authoring Constraint (obj-7 — CRITICAL)

**Confirmed against #36's actual step ordering:**

| #36 step | Action | Requires login? |
|----------|--------|----------------|
| Step 1 | "Open the Terminal app… run `app-sso platform -s`" | YES — Terminal requires logged-in desktop |
| Step 2 | Confirm trigger event (MDM password reset / FileVault recovery key use) | YES — conversational |
| Step 3 | Re-registration (System Settings / Company Portal) | YES — post-login GUI |
| Step 4 | Verify with `app-sso platform -s` in Terminal again | YES — Terminal |

**Implication for #37:** #36's entire flow assumes the user CAN log in (PSSO broke after login). #37's trigger is the OPPOSITE — the user CANNOT log in (local password lost/unknown). Therefore:

- **#37 recovery steps MUST be pre-login GUI only** (FileVault pre-boot recovery-key screen / login-window LAPS admin / login-window Apple ID).
- **`app-sso platform -s` and all Terminal commands are CONFINED to #36** (the post-recovery re-registration runbook that #37 hands off to).
- **Any step in #37 that asks the user to open Terminal is a HARD ERROR** — the user cannot open Terminal without logging in first.

[VERIFIED: direct read of 36-macos-secure-enclave-key.md steps 1-4; confirmed Step 1 immediately requires Terminal]

---

## Cross-Link / Anchor Inventory

### Hub 1: `docs/l1-runbooks/00-index.md`

**Frontmatter (verified):** `last_verified: 2026-04-30`, `review_by: 2026-06-29` (DUE TODAY — authoring day)
**Re-stamp on touch:** `last_verified: 2026-06-29` / `review_by: 2026-09-29`

**macOS ADE Runbooks table location:** lines 40-49 [VERIFIED]
```
| # | Runbook | When to Use |
|---|---------|-------------|
...
| 35 | [Platform SSO Sign-In Failure](35-macos-sso-sign-in-failure.md) | ... |  ← line 48
| 36 | [Platform SSO — Secure Enclave Key Loss](36-macos-secure-enclave-key.md) | ... |  ← line 49
```

**Insertion point:** Append #37 row AFTER line 49 (the current last row of the macOS ADE table, before the blank line that separates from iOS L1 Runbooks section at line 51).

**Row format to mirror (from lines 48-49):**
```markdown
| 37 | [macOS Local Password Recovery](37-macos-local-password-reset.md) | User cannot log in — local password lost or unknown; recover using FileVault recovery key, LAPS managed admin account, or Apple ID (where org policy allows) |
```
(Exact "When to Use" wording is Claude's discretion — mirror the length/style of rows 35/36)

**Stable needle token:** `](37-macos-local-password-reset.md)` within this table row.

---

### Hub 2: `docs/index.md`

**Frontmatter (verified):** `last_verified: 2026-05-01`, `review_by: 2026-06-30`
**Re-stamp on touch:** `last_verified: 2026-06-29` / `review_by: 2026-09-29`

**Target row — line 110 (verified, DO NOT touch line 108):**
```markdown
Line 108: | [macOS L1 Runbooks](l1-runbooks/00-index.md#macos-ade-runbooks) | Scripted procedures for top macOS ADE enrollment failures (6 runbooks: device, Setup Assistant, profiles, apps, compliance, Company Portal) |
Line 110: | [macOS Platform SSO Runbooks](l1-runbooks/00-index.md#macos-ade-runbooks) | Platform SSO sign-in failure (runbook #35: "Registration Required" not appearing) or Secure Enclave key loss after password reset (runbook #36) |
```

**Action:** Extend the line-110 "When to Use" cell to include #37 reference. Do NOT alter line-108 (stale "(6 runbooks)" count is pre-existing debt, out of scope).

**Extended line-110 cell (pattern):** Append to the existing description: `; or local password recovery for locked-out users (runbook #37: FileVault recovery key / LAPS admin / Apple ID)`.

**Stable needle token:** A reference to `37-macos-local-password-reset.md` or `runbook #37` within the line-110 cell text.

**Inbound ref to preserve byte-stable:** Line 110 itself is being EXTENDED (cell content changes), not replaced. The table row structure, the `[macOS Platform SSO Runbooks]` link text, and the `#macos-ade-runbooks` anchor are all preserved.

---

### Hub 3: `docs/common-issues.md`

**Frontmatter (verified):** `last_verified: 2026-04-30`, `review_by: 2026-06-29` (DUE TODAY — authoring day)
**Re-stamp on touch:** `last_verified: 2026-06-29` / `review_by: 2026-09-29`

**Insertion point:** After the "Platform SSO Re-Registration Failure (Post-Migration)" H3 (currently the last H3 in the macOS ADE Failure Scenarios section), before the `## iOS/iPadOS Failure Scenarios` H2.

**H3 pattern to mirror (from existing macOS H3s):**
```markdown
### Platform SSO Sign-In Failure        ← existing example (line ~213)

Platform SSO "Registration Required" notification... 

- **L1:** [Platform SSO Sign-In Failure](l1-runbooks/35-macos-sso-sign-in-failure.md) — [description]
- **L2:** [Platform SSO Investigation](l2-runbooks/27-macos-sso-investigation.md)
```

**New H3 to add (wording is Claude's discretion; anchor slug must be clean):**
```markdown
### macOS Local Password — User Locked Out

User cannot log in to their Mac — local password is unknown or forgotten. Recover access using the escrowed FileVault recovery key, the macOS LAPS managed admin account, or Apple ID (where org policy allows). Note: SSPR resets the Entra password only and does not reset the independent local password on Secure Enclave devices.

- **L1:** [macOS Local Password Recovery](l1-runbooks/37-macos-local-password-reset.md)
- **L2:** [macOS Platform SSO Investigation](l2-runbooks/27-macos-sso-investigation.md) — if PSSO re-registration fails after recovering access
```

**Escalation per D-04:** escalates to L2 #27 — confirmed: this is the same L2 #36 routes to at 36:86: `See [macOS Platform SSO Investigation (L2 #27)](../l2-runbooks/27-macos-sso-investigation.md)` [VERIFIED]

**Stable needle tokens:** New H3 slug (e.g., `#macos-local-password--user-locked-out`) + `](l1-runbooks/37-macos-local-password-reset.md)` within this section.

---

### Hub 4: `docs/quick-ref-l1.md`

**Frontmatter (verified):** `last_verified: 2026-05-01`, `review_by: 2026-06-30`
**Re-stamp on touch:** `last_verified: 2026-06-29` / `review_by: 2026-09-29`

**macOS Escalation Triggers section — existing #36 entry at line 101 (preserve byte-stable):**
```
- Secure Enclave key error after password reset or FileVault recovery --> **Escalate L2** via [Platform SSO — Secure Enclave Key Loss](l1-runbooks/36-macos-secure-enclave-key.md) first; escalate to L2 if re-registration fails (collect: serial number, macOS version, `app-sso platform -s` output)
```

**New escalation trigger to add** (DISTINCT wording — must not conflict with line 101's trigger):
```
- User cannot log in — local password lost or unknown --> **Use [macOS Local Password Recovery](l1-runbooks/37-macos-local-password-reset.md) runbook** (FileVault recovery key / LAPS admin / Apple ID; PSSO re-registration via #36 required afterward)
```

**macOS Runbooks section — existing #36 entry at line 117 (preserve byte-stable):**
```
- [Platform SSO — Secure Enclave Key Loss](l1-runbooks/36-macos-secure-enclave-key.md) — key loss after password reset
```

**New runbook bullet to add** (after line 117, appended to macOS runbook list):
```
- [macOS Local Password Recovery](l1-runbooks/37-macos-local-password-reset.md) — local password lost or unknown; locked out of Mac
```

**Stable needle token:** `](l1-runbooks/37-macos-local-password-reset.md)` appearing in both the escalation triggers and the macOS Runbooks list.

---

### Hub 5: `docs/decision-trees/06-macos-triage.md`

**Frontmatter (verified):** `last_verified: 2026-06-22`, `review_by: 2026-09-20` (not due — still re-stamp per file-level convention on any touch)
**Re-stamp on touch:** `last_verified: 2026-06-29` / `review_by: 2026-09-29`

**Current MAC3 arms (verified — lines 38-48):**
```
MAC3 -->|"Profile not<br/>applied"| MACR3
MAC3 -->|"App not<br/>installed"| MACR4
MAC3 -->|"Non-compliant /<br/>access blocked"| MACR5
MAC3 -->|"Company Portal<br/>sign-in issue"| MACR6
MAC3 -->|"Other / unclear"| MACE1
MAC3 -->|"Platform SSO<br/>sign-in issue"| MACSSO{...}
MAC3 -->|"MDM migration /<br/>non-dismissible<br/>migration prompt"| MACE3
```

**New MAC3 arm to add** (wording is Claude's discretion):
```
MAC3 -->|"Local password<br/>locked out"| MACR9(["See: macOS Local<br/>Password Recovery Runbook"])
```

**New click target to add** (after existing click targets at lines 49-58):
```
click MACR9 "../l1-runbooks/37-macos-local-password-reset.md"
```

**Class update:** Add MACR9 to the `resolved` class:
```
class MACR1,MACR2,MACR3,MACR4,MACR5,MACR6,MACR9 resolved
```
(Note: MACR7 and MACR8 are already listed separately on line 63 — maintain that structure)

**New Routing Verification row to add:**
```
| Local password — locked out | Setup Assistant? Yes | Symptom: local password | Runbook 37 |
```

**Edge count confirmation:** MAC1(Yes) → MAC3 → MACR9(#37) = **2 edges** ≤ 3 invariant [VERIFIED: CONTEXT.md explicit]

**Inbound #36 refs to preserve byte-stable:**
- Line 45: `MACSSO -->|"Yes, but key error<br/>or lost after reset"| MACR8` — preserved
- Line 56: `click MACR8 "../l1-runbooks/36-macos-secure-enclave-key.md"` — preserved
- Line 81: `| Platform SSO — Secure Enclave key error | Setup Assistant? Yes | Symptom: Platform SSO → key error | Runbook 36 |` — preserved

---

### #36 Reciprocal Cross-Link

**File:** `docs/l1-runbooks/36-macos-secure-enclave-key.md`
**Frontmatter:** `last_verified: 2026-06-21`, `review_by: 2026-09-21`
**Re-stamp on touch:** `last_verified: 2026-06-29` / `review_by: 2026-09-29`

**Scope:** One reciprocal cross-link line only — no restructuring of #36.

**Placement:** The #36 trigger paragraph at line 13 already covers "after a password reset, after using a FileVault recovery key." The reciprocal link should make clear that #37 is the upstream runbook for users who needed to perform those resets. Best placement: after the trigger paragraph (after line 13, before ## Prerequisites), or as a callout within Prerequisites.

**Suggested form (wording is Claude's discretion):**
```markdown
> **If the user cannot log in:** If the user does not yet have access to their Mac (local password unknown or lost), use [macOS Local Password Recovery (L1 #37)](37-macos-local-password-reset.md) first to regain access, then return here for PSSO re-registration.
```

**Stable needle token:** `](37-macos-local-password-reset.md)` within `36-macos-secure-enclave-key.md`.

---

## Common Pitfalls

### Pitfall 1: Terminal Steps in Recovery Paths
**What goes wrong:** Executor authors a step in #37 that asks the locked-out user to open Terminal.
**Why it happens:** #35 and #36 both start with Terminal; the natural impulse is to copy that pattern.
**How to avoid:** Every step in #37's recovery paths must work at the macOS login window (pre-boot recovery key screen, login-window LAPS admin login, login-window Apple ID). Terminal steps belong exclusively in #36.
**Warning signs:** Any step containing `app-sso platform -s`, `fdesetup`, or any CLI command in #37's Steps section.

### Pitfall 2: Touching Line 108 of docs/index.md
**What goes wrong:** Executor "fixes" the stale "(6 runbooks: …)" count at line 108 while editing line 110.
**Why it happens:** The stale count is visibly wrong and tempting to fix.
**How to avoid:** CONTEXT.md D-04 and Deferred Ideas explicitly call this out of scope. Edit ONLY line 110; leave line 108 byte-unchanged.
**Warning signs:** Any diff that includes line 108 of docs/index.md.

### Pitfall 3: Duplicating #36 Re-Registration Steps
**What goes wrong:** Executor copies the macOS 14 Repair / macOS 13 Company Portal re-registration steps from #36 into #37.
**Why it happens:** Wanting to give the user a "complete" guide in one place.
**How to avoid:** D-02 explicitly disqualifies duplication (creates version-drift on #36's macOS-14-vs-13 re-registration paths at 36:49-53). Cross-link to #36; do not copy.

### Pitfall 4: Em-Dash Title Producing Double-Hyphen Slug
**What goes wrong:** Title "macOS Platform SSO — Local Password Recovery" generates anchor `#macos-platform-sso--local-password-recovery` (double hyphen).
**Why it happens:** GitHub Markdown slug generation collapses em-dash + space to double-hyphen.
**How to avoid:** Use a colon instead of em-dash in the H1, or choose a title without em-dash. The file slug (`37-macos-local-password-reset.md`) is fixed; only the H1 heading anchor is at risk.

### Pitfall 5: Navigation Before Runbook Commit
**What goes wrong:** Hub edits committed before #37 file is on main — hub links become dangling.
**Why it happens:** Trying to batch all edits into one commit.
**How to avoid:** navigation-last is a LOCKED constraint (STATE.md, CONTEXT.md D-04). Commit #37 first; verify it's merged; then commit hub edits in a second commit.

### Pitfall 6: Touching #36's Mac-14/13 Re-Registration Paths
**What goes wrong:** Executor adds "helpful" context to #36's steps 3-4 while adding the reciprocal link.
**Why it happens:** Feels natural to explain why the user is there.
**How to avoid:** D-02: #36 gets only a reciprocal cross-link line — no restructuring, no additional prose in steps 3-4.

---

## Needle-Spec Hand-Off (Phase 100 — HARN-02)

All tokens confirmed against actual file reads. These are **presence-only** tokens for `check-phase-99.mjs` — never needle dates or line numbers.

| # | Stable Token | File | Confirmation |
|---|-------------|------|-------------|
| N1 | File path `docs/l1-runbooks/37-macos-local-password-reset.md` exists | new file | Confirmed next-free number: #36 is last at 00-index:49; no #37 exists |
| N2 | Frontmatter key `audience: L1` | 37-macos-local-password-reset.md | Must mirror #35/#36 |
| N3 | Frontmatter key `platform: macOS` | 37-macos-local-password-reset.md | Must mirror #35/#36 |
| N4 | Frontmatter key `applies_to: ADE` | 37-macos-local-password-reset.md | Must mirror #35/#36 |
| N5 | `](37-macos-local-password-reset.md)` (table row link) | docs/l1-runbooks/00-index.md | Appended to macOS ADE table after #36 row |
| N6 | `37-macos-local-password-reset.md` (reference in line-110 PSSO row) | docs/index.md | Line-110 cell extended |
| N7 | `](l1-runbooks/37-macos-local-password-reset.md)` (H3 body link) | docs/common-issues.md | New H3 under macOS ADE Failure Scenarios |
| N8 | `](l2-runbooks/27-macos-sso-investigation.md)` (escalation in new H3) | docs/common-issues.md | L2 #27 escalation per D-04 |
| N9 | `](l1-runbooks/37-macos-local-password-reset.md)` (escalation trigger bullet) | docs/quick-ref-l1.md | New escalation trigger, distinct from existing #36 trigger |
| N10 | `](l1-runbooks/37-macos-local-password-reset.md)` (runbook list bullet) | docs/quick-ref-l1.md | Appended to macOS Runbooks section |
| N11 | `MACR9` (new mermaid node id) | docs/decision-trees/06-macos-triage.md | New MAC3 leaf |
| N12 | `click MACR9` | docs/decision-trees/06-macos-triage.md | Click target for MACR9 |
| N13 | `../l1-runbooks/37-macos-local-password-reset.md` (click target URL) | docs/decision-trees/06-macos-triage.md | Click target body |
| N14 | Routing-Verification row containing `Runbook 37` | docs/decision-trees/06-macos-triage.md | New row in Routing Verification table |
| N15 | `](37-macos-local-password-reset.md)` (reciprocal link) | docs/l1-runbooks/36-macos-secure-enclave-key.md | One reciprocal link line only |
| N16 | SSPR clarification text (fragment: "SSPR resets the Entra password" or "does not reset the… local password") | docs/l1-runbooks/37-macos-local-password-reset.md | Inline at explanation step per D-03 |
| N17 | Hand-off text referencing `36-macos-secure-enclave-key.md` at end of each recovery path | docs/l1-runbooks/37-macos-local-password-reset.md | Appears 3 times (one per path) |

**Additional stable token surfaced during research (not in CONTEXT.md):**
- N18: `](36-macos-secure-enclave-key.md)` appears within #37 body (the hand-off links) — Phase 100 can needle this to confirm the hand-off seam exists.

---

## Freshness Stamp Reference

Per-file freshness stamps for all touched files (file-level convention; +3-month/same-day invariant; no per-section pairs for these files):

| File | Current last_verified | Current review_by | Status | New last_verified | New review_by |
|------|-----------------------|-------------------|--------|-------------------|---------------|
| `docs/l1-runbooks/00-index.md` | 2026-04-30 | 2026-06-29 | DUE TODAY | 2026-06-29 | 2026-09-29 |
| `docs/index.md` | 2026-05-01 | 2026-06-30 | 1 day away | 2026-06-29 | 2026-09-29 |
| `docs/common-issues.md` | 2026-04-30 | 2026-06-29 | DUE TODAY | 2026-06-29 | 2026-09-29 |
| `docs/quick-ref-l1.md` | 2026-05-01 | 2026-06-30 | 1 day away | 2026-06-29 | 2026-09-29 |
| `docs/decision-trees/06-macos-triage.md` | 2026-06-22 | 2026-09-20 | Not due | 2026-06-29 | 2026-09-29 |
| `docs/l1-runbooks/36-macos-secure-enclave-key.md` | 2026-06-21 | 2026-09-21 | Not due | 2026-06-29 | 2026-09-29 |
| `docs/l1-runbooks/37-macos-local-password-reset.md` | NEW | NEW | — | 2026-06-29 | 2026-09-29 |

[VERIFIED: all frontmatter dates read directly from each file]

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | Pre-boot FileVault recovery-key entry steps at macOS login window (pressing "?" icon, entering the key) | Recovery Path A | Low risk — standard macOS behavior; executor should verify against current macOS UI (behavior unchanged since macOS 10.13+) |
| A2 | macOS LAPS password retrieval from Intune admin center path (Devices > [device] > Local admin password) | Recovery Path B | Medium risk — exact Intune portal path could differ from training knowledge; executor should verify against live Intune |
| A3 | macOS login-window LAPS admin login steps (how to switch users at login window, log in as managed admin) | Recovery Path B | Low risk — standard macOS multi-user login; executor should verify macOS version compatibility |
| A4 | Apple ID login-window reset flow ("Forgot Password?" → Apple ID) and caveat that corporate ADE accounts may not have Apple ID associated | Recovery Path C | Medium risk — Apple ID association depends on enrollment setup; executor must verify and add appropriate caveats |
| A5 | MAC3 new node id `MACR9` does not conflict with existing node ids | 06-macos-triage.md | Low risk — existing nodes are MACR1-8 and MACE1-3; MACR9 is next in sequence |

---

## Open Questions

1. **Apple ID path eligibility in corporate ADE**
   - What we know: Apple ID reset is a standard macOS login-window feature; corporate ADE accounts may not have an Apple ID associated; D-03 gates this path as "where org policy allows."
   - What's unclear: Should #37 include a pre-check step that tells L1 to confirm with the user whether they have an Apple ID associated before attempting Path C?
   - Recommendation: Yes — add a brief "check first" note at the top of Path C ("Confirm the user has an Apple ID associated with their macOS account before proceeding"). This is Claude's discretion on wording.

2. **LAPS admin account name at login window**
   - What we know: LAPS admin is "Managed local admin (LAPS)" per 07:74; the AccountName mapping uses `com.apple.PlatformSSO.AccountShortName` for the end-user account.
   - What's unclear: What is the display name / short name of the LAPS admin account at the macOS login window? Guide 07 mentions LAPS in the context of `preferred_username` vs LAPS account naming at 07:65, but does not document the login-window appearance.
   - Recommendation: Executor authors this from verified knowledge; flag to verify against a test macOS LAPS-configured device.

---

## Environment Availability

Step 2.6: SKIPPED — Phase 99 is purely documentation/markdown authoring with no external tool dependencies beyond a text editor and git.

---

## Standard Stack

This is a documentation-only phase. No packages, no installs. The "standard stack" is:
- Markdown with YAML frontmatter (same as all other runbooks in this corpus)
- Mermaid diagram syntax (same as existing `06-macos-triage.md`)
- Plain-GitHub-compatible anchor slugs (byte-stable, no `{#id}` overrides per project memory `reference_glossary_anchor_slugs.md`)

No package legitimacy audit required — no external packages are installed.

---

## Architecture Patterns

### Commit Sequence (navigation-last, per LOCKED constraint)

```
Wave 1 — Runbook file:
  1. Create docs/l1-runbooks/37-macos-local-password-reset.md
  2. Add reciprocal back-link line to docs/l1-runbooks/36-macos-secure-enclave-key.md
  3. Commit: "docs(99): add L1 runbook #37 macOS local password recovery"

Wave 2 — Navigation hubs (ONLY after Wave 1 is committed):
  4. Edit docs/l1-runbooks/00-index.md (append #37 row, re-stamp)
  5. Edit docs/index.md (extend line-110 PSSO row, re-stamp)
  6. Edit docs/common-issues.md (add H3, re-stamp)
  7. Edit docs/quick-ref-l1.md (add escalation trigger + runbook bullet, re-stamp)
  8. Edit docs/decision-trees/06-macos-triage.md (add MACR9 leaf + click + routing row, re-stamp)
  9. Commit: "docs(99): wire runbook #37 into macOS navigation hubs"
```

### Anti-Patterns to Avoid
- **Batch Wave 1 and Wave 2 together:** navigation-last is locked — hubs reference a file that must exist first.
- **Editing six files in one atomic commit:** acceptable only if the runbook is authored first and hubs are strictly additive, but the two-commit structure provides a cleaner rollback boundary.

---

## Sources

### Primary (HIGH confidence — verified by direct corpus read)
- `docs/l1-runbooks/36-macos-secure-enclave-key.md` — full file read; frontmatter, steps 1-4, escalation criteria, version history
- `docs/l1-runbooks/35-macos-sso-sign-in-failure.md` — full file read; frontmatter, structure, inline-fact-plus-cross-link pattern
- `docs/l1-runbooks/00-index.md` — full file read; macOS ADE table format (lines 40-49), freshness stamps
- `docs/index.md` — full file read; line 108 vs line 110, PSSO row format, freshness stamps
- `docs/common-issues.md` — full file read; macOS ADE Failure Scenarios H2 structure, existing H3 patterns, freshness stamps
- `docs/quick-ref-l1.md` — full file read; macOS section structure, lines 101/117 #36 refs, freshness stamps
- `docs/decision-trees/06-macos-triage.md` — full file read; MAC3 arms, click targets, Routing Verification table, version history
- `docs/admin-setup-macos/03-configuration-profiles.md` (lines 96-194) — Local Password Policy section, FileVault section, escrow/retrieval facts at lines 158-182
- `docs/admin-setup-macos/07-platform-sso-setup.md` (lines 58-79) — End-User Sign-In Experience (Secure Enclave) table, local password lifecycle section
- `.planning/phases/99-new-runbook-navigation-wiring/99-CONTEXT.md` — all locked decisions
- `.planning/REQUIREMENTS.md` — RUN-01 definition
- `.planning/STATE.md` — phase dependency block, hard constraints
- `.planning/config.json` — `nyquist_validation: false` confirmed (Validation Architecture section omitted)

---

## Metadata

**Confidence breakdown:**
- Runbook skeleton and conventions: HIGH — derived from direct reads of #35 and #36
- FileVault recovery key facts: HIGH — verified at specific lines in guide 03
- LAPS/Apple-ID path steps: LOW — not in corpus; tagged [ASSUMED]; executor must author from verified knowledge
- Hub insertion points and formats: HIGH — verified at exact line numbers in each hub file
- Freshness stamps: HIGH — read directly from each file's frontmatter
- Needle-spec tokens: HIGH — derived from confirmed file structures

**Research date:** 2026-06-29
**Valid until:** This research does not age (it describes the current state of static markdown files in a git repo). Validity is determined by whether the corpus files are subsequently edited before execution.
