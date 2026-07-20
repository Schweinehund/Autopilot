# Phase 131: Recipe #2 — Shared iPad Full Provisioning - Pattern Map

**Mapped:** 2026-07-17
**Files analyzed:** 1 (new file)
**Analogs found:** 1 / 1 (exact-class match, plus template + 5 link-only cross-link targets)

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|--------------------|------|-----------|-----------------|---------------|
| `docs/recipes/02-shared-ipad-full-provisioning.md` (new) | documentation — `doc_type: Guide`, Device Recipe, `platform: ios+shared-ipad` | request-response (admin reads → makes STD-05 decisions → performs portal steps → verifies) | `docs/recipes/01-shared-windows-avd-client.md` | exact (same doc-class, same phase-129 template instantiation, only prior live example) |

Secondary structural analog (skeleton, not content): `docs/_templates/recipe-template.md` — the fixed H2 spine every recipe instantiates.

**Note on structural divergence:** Recipe #1 is a **non-converging branch** shape (Step 5 forks into 5a Kiosk / 5b Shared PC, never rejoins). Recipe #2 is a **layering** shape (device-group baseline steps, then a user-group overlay step, both applying simultaneously — not alternatives). Copy Recipe #1's *block-level* patterns (STD-05 cases, anti-feature table, what-breaks callouts, verification idiom, link-not-copy) but do **not** copy its branch/fork structure (`### Step 5a` / `### Step 5b` H3 pattern) — Recipe #2 has no branch point of that kind. The one Case-1 boolean decision in Recipe #2 (guest sessions, B3) is explicitly an if/then prose pair per D-04 rule 3 ("Boolean decisions... may skip branch headings entirely"), not a table-branch.

## Pattern Assignments

### `docs/recipes/02-shared-ipad-full-provisioning.md` (Guide, Device Recipe)

**Analog:** `docs/recipes/01-shared-windows-avd-client.md` (primary) + `docs/_templates/recipe-template.md` (skeleton)

#### 1. Frontmatter + fixed H2 skeleton

Copy verbatim structure, substitute values (RE-223 is next unassigned per RESEARCH.md; `platform: ios+shared-ipad` already exists in the D1 map — zero C17 #10 risk):

`docs/recipes/01-shared-windows-avd-client.md` lines 1-25:
```markdown
---
doc_id: RE-222
status: Draft
owner: Intune Admin Lead
doc_type: Guide
platform: Windows
last_verified: 2026-07-17
review_by: 2026-10-15
applies_to: Shared Windows AVD-client device (self-deploying, kiosk or Shared PC)
audience: admin
---

**Platform:** Windows · **Doc Type:** Guide · **Doc ID:** RE-222 · **Status:** Draft

# Shared Windows AVD-Client Device: Self-Deploying Provisioning

## Summary

Following this recipe yields a self-deploying, Entra-joined shared Windows device that runs the
Windows App as its Azure Virtual Desktop client, provisioned end-to-end from zero through Intune.
It covers Windows 10/11 devices and requires the Intune Administrator role plus Entra ID Groups
permissions to create the deployment profile, Enrollment Status Page, dynamic device group, and
app assignment this recipe walks through.

> **Scope:** Provisions the physical shared Windows device that runs the AVD client, not the Azure session hosts. Assumes host pools, session hosts, and FSLogix already exist.
```
For Recipe #2: `doc_id: RE-223`, `platform: ios+shared-ipad` (renders "iOS + Shared iPad" per template comment line 18), `applies_to: Shared iPad full provisioning (federated Managed Apple Account, device-licensed VPP, per-role layered config)`. The `> **Scope:**` banner MUST specialize per H-LOCK-1 precedent (Phase 130) — e.g., state this recipe covers named-user Shared-iPad provisioning only, not the guest-only/kiosk-style third mode (B4), and not compliance/CA/app-protection configuration (all documented as unsupported, never configured). Summary must state the concrete end-state (verified, fully-provisioned Shared iPad) + platform + admin role, ≥30 words (template line 54: "C17 #5 fires on templates" — actually a real-doc word-count floor).

The fixed H2 order (`docs/_templates/recipe-template.md` lines 49-140) is non-negotiable: Summary → Prerequisites → Unsupported and Anti-Feature Callouts → Steps → Verification → Configuration-Caused Failures → See Also (D-06). B5 explicitly confirms: anti-feature table stays in its **normal skeleton slot**, no reorder even though B-decisions "lead with unsupported" conceptually.

#### 2. `## Unsupported and Anti-Feature Callouts` — frozen header

`docs/recipes/01-shared-windows-avd-client.md` lines 39-46 (frozen 3-column header, one row per unsupported combination, terse WHY + concrete alternative):
```markdown
## Unsupported and Anti-Feature Callouts

| Feature | Why it's unsupported / what breaks | Do this instead |
|---------|-------------------------------------|------------------|
| Hybrid Microsoft Entra join | Self-deploying mode has no user affinity, and hybrid join cannot complete without one | Use Microsoft Entra joined only — see [Self-Deploying Mode Configuration](../admin-setup-apv1/08-self-deploying.md) |
| Autopilot Device Preparation (APv2) | APv2 uses a Device Preparation Policy, a different enrollment framework that cannot deliver this recipe's self-deploying flow | See [APv1 vs APv2](../apv1-vs-apv2.md) to confirm framework selection before starting |
```
Recipe #2 needs **7-8 rows** (B1, RESEARCH.md's confirmed set): Compliance policies / App-based CA / Device-based CA / App protection policies / Email profiles / Company Portal / "Available" intent + user-licensed VPP. Use RESEARCH.md's already-sourced table verbatim as the content source (RESEARCH.md lines 284-295) — every WHY cell is first-party-verified, do not re-derive. 7-8 rows is safely under C17 #11's >25-row threshold (Pitfall 2) — no prose-summary line required, but do not "complete" this table toward RE-110's full matrix during drafting.

The **passcode note (B2)** is NOT a table row (`docs/recipes/01-shared-windows-avd-client.md` has no exact analog for this — it's new to Recipe #2). Render as plain prose or a short split-blockquote directly under the table, never one contiguous >200-char blockquote. Content: "eight alphanumeric characters" (never "8-digit" — Pitfall 3), unchangeable in Apple Business Manager, Intune complexity/length settings don't apply, grace period (minutes) is the only knob.

#### 3. STD-05 decision blocks — Case-1 boolean, Case-2 enum, Case-3 bounded

Sibling's applied Case-2 example, `docs/recipes/01-shared-windows-avd-client.md` lines 93-101 (mandatory blank line before table — D-02):
```markdown
> **Ask the admin:** When should Windows App reset cached session state between users on this shared device?

| Option | When to choose | Recorded as |
|--------|-----------------|-------------|
| Reset on app close only | Users are trained to close Windows App between sessions | `ResetAppOnCloseOnly` |
| Reset after each connection ends | Users may leave Windows App open; reset on remote-session disconnect | `ResetAppAfterConnection` |
| Reset after an idle period | Device sits unattended between users; reset after a timeout | `ResetAppOnIdle` |
```
Sibling's Case-1 branching example, lines 105-112 (this is the ONE pattern Recipe #2 should NOT copy structurally — its two rows route to H3 branch sections; Recipe #2's guest decision is a boolean, D-04 rule 3, so it skips the table+branch-heading shape entirely and uses if/then prose instead — see RESEARCH.md Pattern 1, lines 156-164, already drafted for direct reuse):
```markdown
> **Ask the admin:** Should this Shared iPad allow guest (temporary) sessions without a Managed Apple Account?

Temporary sessions are allowed by default. To disable them, set **Block Shared iPad temporary sessions** to **Yes**
in an iOS/iPadOS device restrictions profile assigned to the device group — leaving it **No** or **Not configured**
keeps guest sign-in available (the inverted-polarity default).
```
Note this exact excerpt is itself ~280 chars as one run — split it across `>` lines with a blank-line break if kept as a blockquote, or move the "leaving it No..." consequence sentence to plain prose outside the blockquote (matches D-01's rule that only the one-sentence prompt goes in the blockquote).

Case-3 bounded (cached users, D1) and Case-2 enum (screen-lock timeout, D2) — use RESEARCH.md Patterns 2 and 3 verbatim (RESEARCH.md lines 166-196), both already drafted with sourced field text and correct table shapes. Session-inactivity (D3) is also Case-3 — same shape as Pattern 3, no table, lead-in + prose bounds (min 30, 0/blank = never) outside the blockquote.

#### 4. Per-step `> **What breaks if misconfigured:**` callouts

`docs/recipes/01-shared-windows-avd-client.md` lines 85-91 (multi-line callout split across separate `>` blocks — each is its own C17 #12 run because of intervening blank lines):
```markdown
> **What breaks if misconfigured:** Assigning Windows App as Available instead of Required, or to a user group instead of a device group, means it is not present before anyone signs in.

> Targeting a device group installs the app before the user signs in; targeting a user group instead delays install until after that user's first sign-in.
```
Also `docs/admin-setup-ios/03-ade-enrollment-profile.md` lines 100-106 (RE-109's own split pattern for a longer callout — 3 short blockquote paragraphs, each under 200 chars, blank-line-separated):
```markdown
> **What breaks if misconfigured:** Setting supervised to No on a corporate ADE deployment means locked enrollment cannot be enforced,

> supervised-only configuration profiles will not apply, and OS updates cannot be silently enforced.

> Changing to supervised later requires wiping every affected device.

> Symptom appears in: Intune admin center (supervised-only policies show "Not applicable" on affected devices).
```
Apply this exact split-paragraph idiom to Recipe #2's every configurable step (ADE toggles, VPP assignment, layered-config conflict warning C4, guest decision B3).

#### 5. `## Verification` `- [ ]` idiom

`docs/recipes/01-shared-windows-avd-client.md` lines 206-223 (grouped under bold pseudo-headings per branch — G-LOCK-1 precedent):
```markdown
## Verification

Both branches — confirm first:

- [ ] Device completed OOBE unattended (no manual credential entry during device deployment)
- [ ] Device is Entra joined (not hybrid) and enrolled in Intune
- [ ] Device is a member of the dynamic device group (expected latency: minutes to hours)
- [ ] Windows App is present on the device BEFORE any user has signed in

**Kiosk branch:**

- [ ] Device boots directly into Windows App in full-screen kiosk mode via the autologon local account
```
Recipe #2 has no branches, so it needs a single flat `- [ ]` list (no bold pseudo-heading groups needed — that device only exists in the sibling because it forks). Per C5 (LOCKED): verification MUST be **on-device** (sign in as each role, observe layout/app set) — no Company Portal item, no Intune-report-based item (user-assigned policy status doesn't surface there). Include a guest-session check (temp sessions receive device-group assignments only).

#### 6. `## Configuration-Caused Failures` table

`docs/recipes/01-shared-windows-avd-client.md` lines 225-234 (each row links back to the step, one row per distinct misconfiguration — not exhaustive, just the highest-value failure modes):
```markdown
## Configuration-Caused Failures

| Misconfiguration | Symptom | Runbook |
|------------------|---------|---------|
| (Both) Windows App assigned Available instead of Required, or to a user group instead of a device group | App absent at first sign-in; feed never appears | [Step 4](#step-4-deploy-windows-app-device-context) |
| (Shared PC) Guest account left at default (Guest, not Domain) | AVD feed is empty for every signed-in user — no Entra token | [Step 5b](#step-5b-shared-pc-configuration) |
```
Recipe #2 candidates: VPP assigned Available/user-licensed instead of Required/device-licensed (app absent); email profile assigned (assignment error, T-5); guest-session Block toggle left in wrong polarity; layered-config conflict (same setting on both device and user group — "chosen by the operating system," not deterministic).

#### 7. Blockquote splitting for C17 #12 (≤200-char cap)

Confirmed mechanically from `scripts/validation/c17-eee-contract.mjs` lines 390-408: the validator walks consecutive lines matching `/^>/` (no blank line between them) into one joined string (`bqLines.join(' ')`) and hard-fails if that joined string exceeds 200 chars. **A blank line ends the run and starts a fresh 200-char budget.** This is the single mechanical constraint Recipe #2's two highest-risk callouts must satisfy:
- **B2 passcode note** — the natural single-paragraph version (~280 chars per RESEARCH.md Pitfall 1) must be split into ≥2 blank-line-separated blockquote paragraphs, or moved to plain (non-`>`) prose entirely.
- **C4 conflict-warning callout** — must carry T-3's three verbatim phrases ("can't be pre-determined" / "first setting assigned" / "chosen by the operating system") but a single run measures ~330 chars (RESEARCH.md Pitfall 1) — split following the RE-109 lines 100-106 idiom above (one short blockquote paragraph per fact, blank line between each).

#### 8. Link-not-copy cross-links (dominant discipline — 5 existing owners)

`docs/recipes/01-shared-windows-avd-client.md` demonstrates the pattern at lines 58 and 67 — state the fact needed inline, then link the owner for depth, explicitly declining to reproduce:
```markdown
See [Dynamic Device Groups](../admin-setup-apv1/04-dynamic-groups.md) for the exact membership-rule syntax — do not recreate the rule here.
```
```markdown
See [Self-Deploying Mode Configuration](../admin-setup-apv1/08-self-deploying.md) for the full field reference, the TPM 2.0 requirement, and network prerequisites — this recipe links rather than repeats that detail.
```
Recipe #2's 5 link targets and their confirmed anchor slugs (verified by direct heading read):
- `../admin-setup-ios/03-ade-enrollment-profile.md` (RE-109) — general ADE fields only. **Its own `## Steps` → `### Step 2: Configure enrollment settings` table (lines 81-88) contains the T-4 conflation** (`User Affinity` row: "shared mode = Shared iPad (iPadOS only)") — cross-link the doc but do not inherit this bug; state the correct distinction (Entra shared-device-mode ≠ Shared iPad feature) inline instead. Its line 138 (`#### Await final configuration`) already documents "Not available when Shared iPad = Yes combined with Enroll without User Affinity" — matches A1's exclusion exactly, safe to cite.
- `../admin-setup-ios/04-configuration-profiles.md` (RE-110) — anchors confirmed: `## Wi-Fi` (line 48), `## Home Screen Layout` (line 130), `## Show or Hide Apps` (line 353, H3 under Device Restrictions). Link for the full applicability matrix (C1) — Recipe #2 carries only its own 4-8-row trimmed table.
- `../admin-setup-ios/05-app-deployment.md` (RE-111) — anchors confirmed: `## VPP Device-Licensed` (line 107), `## VPP User-Licensed` (line 131), `### Silent Install Boundary` (line 47). Link for exhaustive VPP mechanics (A3/B5); narrow the verification cross-link to `### 2. Device-centric view` (line 203), not the app-centric/Company-Portal view.
- `../cross-platform/apple-business/08-managed-apple-account-provisioning.md` (OU-06) — anchor confirmed: `## Provisioning Method Decision Matrix` (line 36). One-sentence inline (A2), link here for setup depth, never re-author.
- `../cross-platform/apple-business/09-shared-ipad-lifecycle.md` (OU-07) — anchor confirmed: `### Stage 2: Shared iPad Session Configuration` (line 103). A4: recipe owns the Intune-admin decision framing + enrollment-profile session values and **supersedes** OU-07's `[CITED: training; needs live verification]` session/storage prose (unit mismatch: OU-07 says minutes, the real Intune field is seconds) — link for lifecycle stages, do not adopt its values.

## Shared Patterns

### STD-05 composite decision-block format
**Source:** `docs/_standards/EEE-SOP-standard.md` lines 456-500 (D-01 through D-05)
**Apply to:** Every admin decision point in Recipe #2 (guest boolean B3, screen-lock enum D2, cached-users bounded D1, session-inactivity bounded D3)
```
D-01: one-sentence `> **Ask the admin:**` lead-in ONLY (options/consequences never in the blockquote).
D-02: mandatory blank line between lead-in and any following table (GFM lazy-continuation trap).
D-03: Case 3 (free-value) never gets a table.
D-04 rule 3: boolean decisions MAY skip branch headings, use if/then prose instead — this is Recipe #2's guest decision (B3), not Case-1's table+branch shape.
```

### C17 gate (read-only — DO NOT EDIT)
**Source:** `scripts/validation/c17-eee-contract.mjs`
**Apply to:** Whole file, pre-publish
- Assertion #11 (lines 344-384): tables >25 data rows need a prose line within 5 lines after — not a risk at 7-8/4-8 rows, but do not grow the applicability table toward RE-110's full matrix.
- Assertion #12 (lines 390-408): contiguous `>` runs (no blank line) joined and capped at 200 chars — the mechanical reason every multi-fact callout in this recipe must be blank-line-split (see Pattern Assignments #7 above).
- Run `node scripts/validation/c17-eee-contract.mjs --self-test` then the full-corpus `--verbose` pass before considering the file done; must exit 0.

### `doc_type`/`platform` D1 map + registry deferral
**Source:** `docs/_standards/EEE-SOP-standard.md` D-02 ruling; `docs/_templates/recipe-template.md` lines 13-19
**Apply to:** Frontmatter only
- `doc_type: Guide` always for `docs/recipes/*` — never introduce a new "Recipe" enum value.
- `platform: ios+shared-ipad` is a pre-existing D1-map compound value (renders "iOS + Shared iPad") — zero C17 #10 risk, no map edit needed.
- `doc_id: RE-223` assigned in frontmatter now but **not** inserted into `docs/_registry/RE-index.md` this phase — Recipe #1 (RE-222) set this not-yet-registered precedent; registry insertion + `docs/index.md` wiring + filename-map regen is Phase 132 (navigation-last).

## No Analog Found

None — every element of Recipe #2 maps to either the sibling recipe (structural/format patterns), the template (skeleton), or one of the 5 cross-link targets (content ownership for what NOT to author inline). The only genuinely new content shape (no prior in-repo example) is the **passcode dedicated-note** (B2, a fixed non-configurable limitation adjacent to but not inside the anti-feature table) — RESEARCH.md's Pitfall 3 and this file's Pattern Assignments #2 already specify its exact shape; treat RESEARCH.md's sourced text as the content source, not a further analog search.

## Metadata

**Analog search scope:** `docs/recipes/`, `docs/_templates/`, `docs/_standards/EEE-SOP-standard.md`, `scripts/validation/c17-eee-contract.mjs`, `docs/admin-setup-ios/03-05`, `docs/cross-platform/apple-business/08-09`
**Files scanned:** 8 (1 sibling recipe, 1 template, 1 standard, 1 validator, 5 cross-link targets — headers/anchors confirmed via targeted grep, full content already verified in RESEARCH.md's direct-fetch pass)
**Pattern extraction date:** 2026-07-17
