# Phase 131: Recipe #2 — Shared iPad Full Provisioning - Research

**Researched:** 2026-07-17
**Domain:** Documentation authoring (Markdown, EEE-conformant corpus) — Microsoft Intune Shared iPad provisioning content, no application code
**Confidence:** HIGH (all 5 plan-time-verify items independently re-confirmed via direct `WebFetch` of live Microsoft Learn pages, not summarized secondary sources)

## Summary

Phase 131 is a pure content-authoring phase: instantiate `docs/_templates/recipe-template.md` as `docs/recipes/02-shared-ipad-full-provisioning.md`, applying the 20 LOCKED decisions in `131-CONTEXT.md`. No code, no packages, no validators are touched. The dominant research task was re-verifying CONTEXT.md's 5 PLAN-TIME-VERIFY flags against live first-party Microsoft Learn — all 5 were independently re-confirmed via direct page fetches (not WebSearch summaries), and one **new nuance** surfaced that CONTEXT.md did not carry: a temporary-session-specific idle-timeout field (`Maximum seconds of inactivity until temporary session logs out`) exists as a sibling to the named-user session-inactivity field, gated behind `Require Shared iPad temporary session only`. This is additive detail for the already-out-of-scope B4 mention, not a contradiction of any locked decision.

All 20 LOCKED decisions in CONTEXT.md hold up against live sourcing. Two additional non-load-bearing gaps were found during verification: (1) the literal string "Block Shared iPad temporary sessions" does **not** appear in the standalone `ref-device-restrictions-apple` reference article's documented-settings prose (it is Settings-Catalog-only and that page explicitly disclaims incomplete coverage), though it **is** directly named in the authoritative `shared-ipad` applicability table — so the setting's existence is HIGH confidence but its exact Settings Catalog category/path needs an in-tenant spot-check at authoring time; (2) QuotaSize / OnlineAuthenticationGracePeriod schema internals remain genuinely unverifiable from Intune-facing docs (they are Apple MDM protocol keys Intune only reads back) — CONTEXT.md's "plan-time-verify pointer only, never Intune fact" posture is the correct and now-doubly-confirmed disposition.

**Primary recommendation:** Instantiate the template exactly per CONTEXT.md's 20 locked decisions; treat this research's Sources section as the citation set for the recipe's first-party links; do not re-derive any of the gray-area calls — they are settled and independently re-verified.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

Decision IDs preserve the review's area lettering: **A** cross-link boundary, **B** unsupported/passcode/guest, **C** layered config/applicability, **D** storage/session sizing. Each is LOCKED with its first-party basis. All 4 Adversary trims applied (A3, C2, D2, D4 + eligibility-floor calibration).

**Requirement-inversion traps (carry these; do NOT regress to requirement wording):**
- **T-1 (IPAD-04 inverted):** "Maximum cached users" **IS** a real, settable Intune enrollment-policy field (bounded, ≤24 on a 32/64-GB device). QuotaSize and OnlineAuthenticationGracePeriod are the ones **NOT** Intune-settable.
- **T-2 (IPAD-03 mis-readable):** "per-role allow-lists on user groups" does **NOT** mean per-role app assignment. LOB + device-licensed VPP apps are **device-group-only** (Not applicable to user groups); only web clips are user-assignable. ALL apps → device group as **Required**; per-role differentiation = home-screen-layout + show/hide-apps allow-list on user groups.
- **T-3 (conflict resolution):** NOT last-writer-wins. Verbatim first-party: conflicting value "**can't be pre-determined**"; Intune applies "the **first setting assigned**"; both-applicable on both group types → "**chosen by the operating system**."
- **T-4 (RE-109 defect):** RE-109 line 83 conflates Entra "shared device mode" with "Shared iPad." Cross-link RE-109 but state the correct distinction — do NOT inherit its bug.
- **T-5 (Email contradiction):** first-party self-contradicts — applicability table lists Email device/user-applicable, but Known Limitations says email profiles unsupported (error on assignment). Resolve to **NOT supported** (anti-feature row) + plan-time-verify.
- **T-6 (wipe trigger):** real wipe = a Shared-iPad-enabled policy sent to an **unsupported device**. SEPARATE fact = changing an existing enrollment policy requires factory reset to apply. Keep distinct.

**A — Cross-link boundary (own vs. link):**
- A1: Recipe owns inline the Shared-iPad-specific ADE toggles (values table). EXCLUDE "Await final configuration" (unavailable in this combo). Link RE-109 for general ADE fields only.
- A2: Minimal inline federated sign-in (one sentence); federation setup → Prerequisites + LINK OU-06.
- A3: Recipe owns inline the Shared-iPad VPP triple (device-licensed + Required + device-group). LINK RE-111 for exhaustive mechanics.
- A4: Recipe owns only the Intune-admin decision framing + enrollment-profile session values; LINK OU-07 for session mechanics/lifecycle.
- A5: Lead eligibility with iPadOS 13.4+ / ≥32 GB. Drop "64 GB+ recommended." Note the first-party internal 13.3-vs-13.4 inconsistency.

**B — Unsupported table + passcode + guest:**
- B1: 7–8 rows, one per IPAD-02 feature, frozen header `| Feature | Why it's unsupported / what breaks | Do this instead |`.
- B2: Passcode = dedicated note adjacent to table (not a row, not a decision block). Eight ALPHANUMERIC characters, unchangeable; grace period only knob. Split for C17 #12.
- B3: Guest decision block = STD-05 Case-1 boolean. Guest ON by default; Intune control = "Block Shared iPad temporary sessions" at INVERTED polarity (guest-enabled = Block = No/Not configured).
- B4: Document "Require Shared iPad temporary session only" as a distinct third mode, out-of-scope but stated (not silently omitted).
- B5: "Available"/user-licensed VPP as unsupported rows + positive how-to at VPP step, no third restatement. Table stays in normal skeleton slot (no D-06 reorder).

**C — Layered config + applicability:**
- C1: Two distinct surfaces — trimmed applicability reference table + per-role worked example. Link RE-110 for full matrix.
- C2: Exactly 2 roles, healthcare (Nurse/Clinician). Device baseline = Wi-Fi + all apps Required (device-group-only). User overlay = per-role home-screen layout + show/hide allow-list. Home-screen layout is user-applicable for per-role differentiation AND device-applicable on device-group assignment.
- C3: Wi-Fi/VPN/Certificate baseline placement is platform-forced (Not applicable to user groups), not a preference.
- C4: `> **What breaks if misconfigured:**` callout (not STD-05 block) for the conflict warning, using the three verbatim first-party phrases (T-3).
- C5: Device→user spine split; worked-example table as one contiguous artifact at user-overlay step. Temp/guest sessions get device-group assignments only. Verification must be on-device (no Company Portal, no Intune user-status reports).

**D — Storage/session sizing:**
- D1: "Maximum cached users" = STD-05 Case-3 bounded (≤24 on 32/64-GB). Sizing prose outside the blockquote.
- D2: Screen-lock timeout = STD-05 Case-2 enum, values 0/60/300/900/3600/14400 (iPadOS 13.0+), labeled in SECONDS.
- D3: Session inactivity = STD-05 Case-3 bounded (min 30, 0/blank = never, iPadOS 14.5+).
- D4: QuotaSize + OnlineAuthenticationGracePeriod are NOT settable in Intune GUI → advanced/plan-time-verify pointers only, never STD-05 blocks.
- D5: No dedicated "Sizing" H2. Enrollment-policy items cluster at the single enrollment-policy step. "Block Shared iPad temporary sessions" is a distinct block at the device-restrictions step (13.4+). Per-field iPadOS floors, not blanket "iPadOS 17+."

### Claude's Discretion
- Exact prose wording within every LOCKED constraint (step text, callout phrasing, table cell wording).
- Synthetic happy-path values where the requirement pins none (specific cached-users number, chosen timeout values, concrete Nurse/Clinician app sets and layouts).
- The healthcare vertical for the worked example (Nurse/Clinician chosen; education Student/Teacher is an equivalent fallback).
- Whether the trimmed applicability table shows 4–8 rows (limited to what the worked example touches).

### Deferred Ideas (OUT OF SCOPE)
- Guest-only (kiosk-style) Shared iPad deployment — the "Require Shared iPad temporary session only" third mode (B4) is a real supported pattern but out-of-scope for this named-user recipe; stated as out-of-scope, a candidate future recipe/variant.
- QuotaSize fixed-bytes provisioning via custom/Settings-Catalog profile — documented only as an advanced pointer (D4); a full custom-profile walkthrough is out of scope.
- RE-109 line-83 conflation fix — a real doc bug but fixing an existing Approved doc is out-of-scope this phase; candidate for a future HYG item.
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| IPAD-01 | Linear happy-path: ADE enrollment (Shared iPad=Yes+Supervised+no user affinity) → eligibility floors → federated sign-in → device-licensed VPP Required → applicability split table → home screen layout → verification | Confirmed verbatim ADE config steps + eligibility (13.4+/32GB) + applicability table content via direct fetch of `learn.microsoft.com/.../shared-ipad` and `.../setup-automated-ios`; exact cross-link targets confirmed by reading RE-109/110/111, OU-06/OU-07 source files (anchors below) |
| IPAD-02 | Unsupported-feature callouts with WHY + fixed-passcode note + guest-session decision block | Confirmed verbatim "Known limitations" list (7 items) + verbatim passcode text ("eight alphanumeric characters... can't be changed... grace period... minutes") from direct fetch; guest-decision Intune control name confirmed present in the applicability table (`Block Shared iPad temporary sessions`, Device/Not applicable) |
| IPAD-03 | Per-role layered-configuration worked example (device baseline + user overlay) + conflict warning | Confirmed verbatim conflict-resolution language (T-3 three phrases) + confirmed app-type applicability table (device-licensed VPP/LOB = Device/Not applicable; user-licensed VPP = Not applicable/Not applicable) directly from the `shared-ipad` page's "Add apps" table — stronger confirmation of T-2 than CONTEXT.md's own citation |
| IPAD-04 | Storage/session sizing decision points | Confirmed verbatim enrollment-policy field text for Maximum cached users (≤24 on 32/64-GB), screen-lock timeout enum (0/60/300/900/3600/14400, 13.0+), session-inactivity (min 30, 14.5+), and Require-temp-session-only (14.5+) directly from `setup-automated-ios`; surfaced one additive field (`Maximum seconds of inactivity until temporary session logs out`) not in CONTEXT.md, relevant only to the out-of-scope B4 mention |
</phase_requirements>

## Project Constraints (from CLAUDE.md)

`./CLAUDE.md` describes an unrelated PowerShell/Python-backend/React-frontend toolkit (Windows Autopilot Troubleshooter) — module layout, `uvicorn`/`pytest`/`npm` commands, Graph API auth patterns, PowerShell `-ShouldProcess` conventions, `.env` secrecy rules. **None of these directives apply to this phase.** Phase 131 touches only `docs/recipes/02-shared-ipad-full-provisioning.md` (Markdown), no PowerShell modules, no backend/frontend code, no `.env` or credentials. The only CLAUDE.md rule with any surface area here — "never commit `.env` file or any credentials" — is inapplicable (this phase introduces no secrets). No CLAUDE.md-derived constraint changes any planning decision for this phase.

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| ADE Shared-iPad enrollment toggles | Documentation (recipe, owns inline) | Cross-link (RE-109, general ADE fields) | A1 — no existing Approved doc owns the Shared-iPad-specific toggle values; RE-109 mislabels the adjacent concept (T-4) |
| Federated Managed Apple Account sign-in | Cross-link (OU-06 owns) | Documentation (recipe, 1-sentence inline) | A2 — provisioning-matrix depth is OU-06's explicit scope; recipe only states the end-user experience |
| VPP device-licensed app deployment | Documentation (recipe, owns the Shared-iPad triple) | Cross-link (RE-111, exhaustive VPP mechanics) | A3 — the working shared-iPad-specific combination (device-licensed + Required + device-group) is unique enough to own; general VPP mechanics stay in RE-111 |
| Session/guest lifecycle mechanics | Cross-link (OU-07 owns) | Documentation (recipe owns Intune-admin decision framing only) | A4 — session knobs live in the ADE enrollment profile in Intune (not OU-07's post-enrollment framing); recipe supersedes OU-07's training-sourced values for the Intune-specific fields |
| Home-screen layout / applicability matrix | Cross-link (RE-110 owns full matrix) | Documentation (recipe, trimmed reference table + worked example) | C1 — full matrix duplication risk is high (RE-110 is already a long reference); recipe scopes to what the worked example touches |
| Storage/session sizing enrollment-policy fields | Documentation (recipe owns, STD-05 decision blocks) | — | D5 — these are single-screen, Intune-native fields with no other doc owner in this corpus |

## Standard Stack

Not applicable — this phase produces a single Markdown document within an existing, already-built documentation pipeline (EEE-conformant corpus, C17 validator, registry/filename-map/publish-bundle tooling). No new libraries, frameworks, or packages are installed. `docs/_templates/recipe-template.md` (built in Phase 129) and `docs/_standards/EEE-SOP-standard.md` STD-05 (also Phase 129) are the only "stack" this phase consumes, and both are pre-existing repo assets, not external dependencies.

## Package Legitimacy Audit

Not applicable — this phase installs no external packages (Node/Python/Rust or otherwise). Skip the Package Legitimacy Gate entirely.

## Architecture Patterns

### System Architecture Diagram

```
[Admin reads recipe] 
       |
       v
[ADE enrollment profile] --(A1, own inline)--> Shared iPad=Yes/Supervised=Yes/no user affinity
       |                                         |
       |                                    (cross-link RE-109 for general ADE fields only)
       v
[Eligibility gate: iPadOS 13.4+ / >=32GB] --(A5)--> device meets/fails floor
       |
       v
[Federated sign-in, 1-sentence] --(A2, cross-link OU-06 for provisioning depth)--> Managed Apple Account JIT-created
       |
       v
[VPP device-licensed app deploy, Required, device group] --(A3, cross-link RE-111 for exhaustive mechanics)
       |
       v
[Unsupported-feature table + passcode note + guest decision block] --(B1-B5, rendered in normal skeleton slot after Prerequisites)
       |
       v
[Device-group baseline: Wi-Fi + all apps Required] --(C2/C3, platform-forced placement)
       |
       v
[User-group overlay: home-screen layout + show/hide allow-list, per role] --(C2/C4, conflict-warning callout)
       |
       v
[Storage/session sizing at the single enrollment-policy step] --(D1-D5: cached users, screen-lock timeout, session inactivity)
       |
       v
[On-device verification per role] --(C5: no Company Portal, no Intune user-status reports)
```

A reader traces: enroll → gate on eligibility → sign in → get apps → read what's unsupported and decide on guest → apply shared baseline → apply per-role overlay → size storage/session knobs → verify by physically signing in as each role.

### Recommended Project Structure

```
docs/recipes/
├── 01-shared-windows-avd-client.md   # sibling exemplar, non-converging branches shape
└── 02-shared-ipad-full-provisioning.md  # THIS PHASE — layering shape (device baseline + user overlay), not branches
```

No new directories or files beyond the single recipe. `doc_id: RE-223` is the next unassigned ID (RE-222 was claimed by Recipe #1 in its own frontmatter at Phase 130 but not yet inserted into `docs/_registry/RE-index.md` — registry insertion is Phase 132's job per D-14/CLASS-03). Assign `RE-223` in this recipe's frontmatter now, following the same not-yet-registered precedent Phase 130 set.

### Pattern 1: STD-05 Case-1 (branching/boolean) — the guest-session decision block

**What:** One-sentence `> **Ask the admin:**` lead-in, blank line, then either a 4-column branch table or (per D-04 rule 3) an if/then prose pair for a boolean.
**When to use:** IPAD-02's guest/temporary-session on-or-off decision (B3).
**Example (illustrative, values confirmed against first-party text above):**
```markdown
> **Ask the admin:** Should this Shared iPad allow guest (temporary) sessions without a Managed Apple Account?

Temporary sessions are allowed by default. To disable them, set **Block Shared iPad temporary sessions** to **Yes**
in an iOS/iPadOS device restrictions profile assigned to the device group — leaving it **No** or **Not configured**
keeps guest sign-in available (the inverted-polarity default).
```
Source: `learn.microsoft.com/intune/device-enrollment/apple/shared-ipad` ("Configure temporary sessions" section — "Temporary sessions are allowed by default with Shared iPad") + the applicability table row `Block Shared iPad temporary sessions | Device | Not applicable`.

### Pattern 2: STD-05 Case-2 (enumerable) — screen-lock timeout

**What:** Lead-in + `| Option | When to choose | Recorded as |` table.
**When to use:** IPAD-04's "Maximum seconds after screen lock before password is required" field (D2).
**Example:**
```markdown
> **Ask the admin:** How many seconds after screen lock should this Shared iPad require a password to unlock?

| Option | When to choose | Recorded as |
|--------|-----------------|-------------|
| Immediate | Highest security; users unlock every time | `0` |
| 1 minute | Balance of convenience and security | `60` |
| 5 minutes | Frequent hand-offs between short sessions | `300` |
| 15 minutes | Longer single-user sessions | `900` |
| 1 hour | Low-security, trusted environment | `3600` |
| 4 hours | Rarely-locked kiosk-style use | `14400` |
```
Source: verbatim field text, `learn.microsoft.com/intune/device-enrollment/apple/setup-automated-ios` — "Accepted values include: 0, 60, 300, 900, 3600, and 14400... Available for devices in Shared iPad mode running iPadOS 13.0 and later."

### Pattern 3: STD-05 Case-3 (bounded free-value) — cached users

**What:** Lead-in alone, sizing prose outside the blockquote.
**When to use:** IPAD-04's "Maximum cached users" field (D1).
**Example:**
```markdown
> **Ask the admin:** How many distinct users do you expect to sign in on this Shared iPad?

Enter the number as a whole value up to 24 on a 32-GB or 64-GB device. A low number can delay a new user's
data appearing after their first sign-in on the device; a high number risks running out of on-device storage.
```
Source: verbatim, same page — "You can cache up to 24 users on a 32-GB or 64-GB device. If you choose a low number, it might take a while for your users' data to appear on their devices after they sign in. If you choose a high number, your users could run out of disk space."

### Anti-Patterns to Avoid

- **Reproducing RE-109's Entra-shared-mode/Shared-iPad conflation:** confirmed live — `setup-automated-ios` treats "Enroll with Microsoft Entra ID shared mode" (a User Affinity enum value) and the separate "Shared iPad" Yes/No toggle (available only under Enroll-without-affinity + Supervised=Yes) as two distinct, non-overlapping mechanisms. Do not merge them into one row/sentence the way RE-109 line 83 does.
- **"Available" VPP/App-Store-app assignment to Shared iPad:** confirmed unsupported — App assignment requirements state "You must assign apps as required to device groups. Available apps are not supported with Shared iPad," and the app-type table shows User-licensed VPP as `Not applicable`/`Not applicable` (not assignable to either group type at all — stronger than "needs a personal Apple Account," it is flatly not an assignment option for Shared iPad).
- **Treating the Email applicability-table row as authoritative:** the row says Device/User applicable, but Known Limitations directly contradicts it ("Email profile not supported... An error occurs when you assign an email profile"). CONTEXT.md's resolution (NOT supported, T-5) is confirmed correct against the more specific, more recently-emphasized statement.
- **Deterministic last-writer-wins framing for conflicting settings:** confirmed wrong — first-party text is explicit: "can't be pre-determined," Intune "will apply the first setting assigned," and OS-arbitration language for the cross-group-type case. Any of these three outcomes can occur depending on the exact conflict shape; do not collapse to one rule.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Federated Managed Apple Account provisioning depth | A recipe-owned SCIM/OIDC+JIT walkthrough | Link to OU-06 (`docs/cross-platform/apple-business/08-managed-apple-account-provisioning.md`) | OU-06 already owns the decision matrix (manual/SCIM/OIDC+JIT) with its own training-data-notice caveats; re-authoring duplicates and risks drifting from it |
| Full VPP/app-deployment mechanics | A recipe-owned exhaustive VPP reference | Link to RE-111 (`docs/admin-setup-ios/05-app-deployment.md`) | RE-111 already documents the device-vs-user-licensed distinction, silent-install boundary table, and renewal cadences in full; the recipe only needs the one working Shared-iPad combination |
| Full device-vs-user applicability matrix | A recipe-owned complete settings/applicability table | Link to RE-110 (`docs/admin-setup-ios/04-configuration-profiles.md`) for the general matrix; recipe carries only a trimmed 4-8 row table scoped to what the worked example touches | RE-110 already documents Wi-Fi/VPN/Email/Certificates/Home-Screen-Layout/Device-Restrictions in depth; full duplication triggers C17 #11's >25-row prose-summary requirement for no benefit |
| Session/lifecycle mechanics (sign-in/sign-out, wipe/re-provision, session residency) | A recipe-owned lifecycle section | Link to OU-07 (`docs/cross-platform/apple-business/09-shared-ipad-lifecycle.md`) for lifecycle; recipe owns only the Intune enrollment-policy decision framing | OU-07 already has 5 lifecycle stages including the mandatory OP-12 Find-My-disable pre-deployment gate; the recipe's job is the Intune-admin-facing config decisions, not the ABM-side lifecycle |

**Key insight:** This recipe's dominant discipline is link-not-copy across 5 already-existing, already-Approved docs (RE-109/110/111, OU-06/07). The temptation to hand-roll here isn't "build a library" — it's "restate an already-owned section" which produces drift risk identical to hand-rolling: two sources of truth for one fact, one of which will silently go stale.

## Common Pitfalls

### Pitfall 1: C17 #12 blockquote-run inflation from decision content or multi-fact callouts
**What goes wrong:** A faithful "prompt + options + consequence" blockquote, or a conflict-warning callout using all three verbatim first-party phrases in one contiguous run, measures well over 200 characters and hard-fails C17 #12.
**Why it happens:** C17 #12 joins *all* contiguous top-level `>` lines (no intervening blank line) into one string and measures its length — confirmed by direct read of `scripts/validation/c17-eee-contract.mjs` lines 386-408: `bqLines.push(...); const bqText = bqLines.join(' '); if (bqText.length > 200)`.
**How to avoid:** (1) STD-05's Case-1/2 lead-ins are ONE sentence, options/consequences go in the table, never the blockquote. (2) The passcode note (B2) and the conflict-warning callout (C4) must be word-split across multiple `>` lines *separated by blank lines* where the content naturally allows it, or written as plain prose outside the blockquote for the sizing/passcode facts. A blank line starts a new run and resets the count.
**Warning signs:** Any blockquote carrying more than one distinct fact (prompt + reason + consequence) in a single unbroken run.

### Pitfall 2: Table row-count near the C17 #11 threshold
**What goes wrong:** Assertion #11 fires on any Markdown table with **more than 25 data rows** (separator rows excluded) that lacks a non-blank, non-`|`/`#`/`>`/fence prose line within 5 lines after the table — confirmed by direct read of the C17 script (lines 344-384).
**Why it happens:** The anti-feature table (7-8 rows, B1) and the trimmed applicability table (4-8 rows, C1) are both explicitly designed to stay under this threshold — this is safe by construction if the LOCKED row counts are honored. Risk only appears if an author later "completes" the applicability table to match RE-110's full matrix.
**How to avoid:** Keep the applicability table strictly scoped to rows the worked example touches (C1's explicit instruction); do not treat it as a place to reproduce RE-110's matrix.
**Warning signs:** Applicability table growing past ~10 rows during drafting.

### Pitfall 3: Passcode terminology drift ("8-digit" vs "eight alphanumeric characters")
**What goes wrong:** CONTEXT.md's B2 explicitly warns "Never '8-digit.'" First-party confirms why: `learn.microsoft.com/.../shared-ipad` states "Shared iPad passcodes must have **eight alphanumeric characters**... The passcode complexity and length settings available in Intune device configuration profiles don't apply to Shared iPad. An MDM administrator can set the grace period, which specifies the number of **minutes** a user has to unlock the iPad without a passcode."
**Why it happens:** "8-digit" is the intuitive (and wrong) assumption for a numeric-looking passcode; the actual requirement is alphanumeric.
**How to avoid:** Use "eight alphanumeric characters" verbatim; note the grace period is in **minutes** (distinct unit from the screen-lock-before-password field, which is in seconds — D2).
**Warning signs:** Any draft text saying "digit," "PIN," or "numeric" for the Shared iPad passcode.

### Pitfall 4: Conflating the two distinct "session inactivity" fields
**What goes wrong:** First-party documents **two separate** idle-timeout fields: "Maximum seconds of inactivity until user session logs out" (min 30, iPadOS 14.5+, applies to named-user sessions — D3) and a sibling "Maximum seconds of inactivity until temporary session logs out" (also min 30) that is **only available when "Require Shared iPad temporary session only" is set to Yes**. Setting that field to Yes also **cancels out** Maximum cached users, the screen-lock timeout, and the named-user session-inactivity field entirely (they aren't applicable in temporary-only mode).
**Why it happens:** Not present in CONTEXT.md's specifics — this is new detail this research surfaced. It only matters if the recipe's B4 mention needs a precise one-line factual anchor.
**How to avoid:** Since B4 (guest-only mode) is explicitly out of scope for this named-user recipe (stated but not implemented per CONTEXT.md), this fact only needs a single accurate sentence if referenced at all — do not build out a parallel STD-05 block for the temp-session-only field.
**Warning signs:** Any attempt to give the temp-session-only mode its own worked decision block (out of scope; would violate B4's "stated, not implemented" framing).

### Pitfall 5: The eligibility floor's genuine first-party internal inconsistency
**What goes wrong:** Two different, both-live Microsoft Learn pages give different numbers for the same claim. `shared-device-solutions-ios` (the dedicated comparison page, `ms.date: 2024-09-16`, `updated_at: 2026-07-01`) states cleanly: "Minimum device requirements: iPadOS 13.4 or later with at least 32 GB of storage." But `setup-automated-ios` (`updated_at: 2026-07-01`) says the Shared iPad *toggle* "requires iOS/iPadOS 13.4 or later" while its own adjacent Note says "Supported devices include iPads running iPadOS 13.3 and later" (in the wipe-trigger context) — an internal 13.3-vs-13.4 mismatch on the same page.
**Why it happens:** Apparent doc-authoring drift between two different first-party articles/sections, not a version-history change (both pages carry the same `updated_at` timestamp).
**How to avoid:** Lead the eligibility statement with the cleaner, dedicated-comparison-page number (iPadOS 13.4+ / ≥32GB — A5's exact call), and if the recipe mentions the wipe-trigger boundary at all, note the 13.3 wording appears there specifically for "which devices trigger a wipe if targeted" rather than "the eligibility floor to plan for."
**Warning signs:** Citing "13.3" as the eligibility floor anywhere outside the wipe-trigger-specific context.

### Pitfall 6: `Block Shared iPad temporary sessions` is not in the standalone device-restrictions reference article
**What goes wrong:** A direct, targeted string search of the full `ref-device-restrictions-apple` page content found **zero** instances of "temporary session" anywhere on the page (confirmed by direct fetch with an exhaustive-search prompt). The setting is real (directly named in the `shared-ipad` page's own applicability table: `Block Shared iPad temporary sessions | Device | Not applicable`), but its GUI category/exact navigation path is not documented in Microsoft's own device-restrictions reference article — that article's own disclaimer states "Intune might support more settings than the settings listed in this article."
**Why it happens:** The setting is likely Settings-Catalog-only and/or Shared-iPad-specific-category, not part of the general "General/Password/Kiosk/..." categories the reference article documents in prose.
**How to avoid:** Cite the setting by name (confirmed real) but do not assert a specific portal navigation path for it beyond "an iOS/iPadOS device restrictions profile" (already what CONTEXT.md's B3 says) — do not invent a category name like "Shared iPad" as a Settings Catalog category without an in-tenant check.
**Warning signs:** A draft step that names an exact Settings Catalog category/breadcrumb for this setting that wasn't independently confirmed.

## Code Examples

### Trimmed applicability reference table (C1) — confirmed rows only

```markdown
| Profile type | Setting | Device group assignment | User group assignment |
|---|---|---|---|
| Device features | Home screen layout | Device | User |
| Device restrictions | Block Shared iPad temporary sessions | Device | Not applicable |
| Device restrictions | All other settings in device restrictions | Device | User |
| Networking | Wi-Fi, VPN, Certificate (all settings) | Device | Not applicable |
| Email | All settings | Device | User (⚠ see anti-feature table — unsupported per Known Limitations) |
```
Source: verbatim table, `learn.microsoft.com/intune/device-enrollment/apple/shared-ipad`, "Configure settings for Shared iPads" section.

### App-type assignment table (feeds A3/B5/T-2) — confirmed rows only

```markdown
| App type | Device group | User group |
|---|---|---|
| Line-of-business app | Device | Not applicable |
| Device-licensed VPP/custom app | Device | Not applicable |
| User-licensed VPP/custom app | Not applicable | Not applicable |
| Web app (web clip) | Not supported | User |
| App Store app | Not applicable | Not applicable |
```
Source: verbatim table, same page, "Add apps" section. Note this is a **stronger** confirmation of T-2 than CONTEXT.md's own framing: user-licensed VPP is `Not applicable` for BOTH group types, not merely "device-group-only excluded" — it cannot be group-assigned to a Shared iPad at all via either path.

### Anti-feature table — WHY column sourcing (B1, 7 confirmed items)

```markdown
| Feature | Why it's unsupported / what breaks | Do this instead |
|---|---|---|
| Compliance policies | Not supported with Shared iPad (Known Limitations) | N/A — no alternative; document as a gap |
| App-based Conditional Access | Not supported with Shared iPad | N/A |
| Device-based Conditional Access | Not supported with Shared iPad | N/A |
| App protection policies | Not supported with Shared iPad | N/A |
| Email profiles | "An error occurs when you assign an email profile to a Shared iPad device" | N/A |
| Company Portal (app + website) | "Not supported with Shared iPad" | N/A |
| "Available" app intent / user-licensed VPP | App Store installs disabled by default on Shared iPad; user licensing requires a personal Apple Account App Store sign-in the device doesn't support | Assign apps as Required, device-licensed, to device groups (see VPP step) |
```
Source: verbatim, `learn.microsoft.com/intune/device-enrollment/apple/shared-ipad`, "Known limitations" section, plus "Add apps" section for the VPP/Available row.

## State of the Art

Not meaningfully applicable — this is a fixed-scope MDM feature (Shared iPad), not a fast-moving library. One relevant shift: the Intune admin center is migrating enrollment-policy creation from **Enrollment program tokens > Profiles** to **Enrollment program tokens > Enrollment policies** (per `setup-automated-ios`, dated 2026-05-18: "This article reflects the updated policy creation experience... The older experience won't receive new features"). The recipe's ADE step should use the newer **Enrollment policies** navigation, matching the current first-party guidance, not the older **Profiles** path (which RE-109, last verified 2026-04-18, still documents — an acceptable staleness gap outside this phase's scope per T-4/deferred-idea disposition, since fixing RE-109 is explicitly out of scope).

**Deprecated/outdated:** "Setup Assistant (legacy)" authentication remains documented but is explicitly de-emphasized ("not recommended") on every page that mentions it; consistent with RE-109's own table.

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | Exact Settings Catalog category/navigation breadcrumb for "Block Shared iPad temporary sessions" (beyond "an iOS/iPadOS device restrictions profile") | Pitfall 6 / Pattern 1 | Low — the setting name and Device/Not-applicable behavior are confirmed; only the precise portal click-path is unconfirmed. An in-tenant spot-check at authoring time resolves this without changing any locked decision. |
| A2 | QuotaSize / OnlineAuthenticationGracePeriod exact Apple MDM schema key names and units (CONTEXT.md D4 already flags these as unverified-from-Intune-docs pointers) | D4, Code Examples (deliberately excluded from STD-05 blocks) | Low — CONTEXT.md's own posture (pointer-only, never asserted as Intune fact) already fully mitigates this; no new risk introduced by this research |
| A3 | The exact GUI-level default label for "Block Shared iPad temporary sessions" (e.g., whether the portal displays "Not configured" vs "No" as the literal default state) | Pattern 1 | Low — the polarity (blocking is off by default, guest sessions allowed by default) is confirmed via the "Temporary sessions are allowed by default with Shared iPad" statement; only the exact UI label text for the unset state is unconfirmed |

**If this table is empty:** Not applicable — see rows above. All three items are low-risk refinements that do not affect any LOCKED decision in CONTEXT.md; they are authoring-time in-tenant spot-checks, not design gray areas.

## Open Questions

1. **Exact Settings Catalog breadcrumb for "Block Shared iPad temporary sessions"**
   - What we know: The setting exists (named in the shared-ipad applicability table), applies Device-only, and is confirmed absent from the general device-restrictions reference article's documented-settings prose.
   - What's unclear: Whether the Intune tenant surfaces it under a "Shared iPad" Settings Catalog category, a general "Restrictions" category, or only via the legacy Templates path.
   - Recommendation: The recipe can safely say "configure in an iOS/iPadOS device restrictions profile" (matches CONTEXT.md B3 exactly) without committing to a specific breadcrumb; if the plan wants a precise navigation string, flag it as a one-line in-tenant verification step at authoring time (not a blocker).

2. **RE-109's stale "Profiles" navigation vs. the newer "Enrollment policies" experience**
   - What we know: `setup-automated-ios` (dated 2026-05-18) documents the new **Enrollment policies** navigation as current, noting the older **Profiles** path "won't receive new features." RE-109 (last verified 2026-04-18) still uses the older navigation.
   - What's unclear: Whether the recipe should use the new navigation exclusively (recommended) or hedge with a "navigation may differ" note like RE-109 and RE-110 already do.
   - Recommendation: Use the new **Enrollment policies** navigation as primary (it's what live Learn docs show today), optionally with the same soft "navigation may vary by tenant rollout" hedge the existing iOS corpus already uses elsewhere (e.g., RE-109's Step 1 note) — this is a Claude's Discretion prose matter, not a locked-decision conflict.

## Security Domain

Not applicable in the code-security (ASVS) sense — this phase produces a static Markdown document with no application code, no auth flow, no session-management implementation, and no cryptography. The content itself *describes* Intune-side security-relevant settings (passcode policy, session idle timeout, Conditional Access unsupported-status), but documenting a third-party platform's settings accurately is a content-accuracy concern already fully covered by this research's verbatim first-party sourcing (Common Pitfalls #3/#4/#5) and by CONTEXT.md's T-1..T-6 traps — not a new ASVS control surface this phase implements or exposes.

## Sources

### Primary (HIGH confidence — directly fetched, full-text, not summarized)
- `learn.microsoft.com/en-us/intune/device-enrollment/apple/shared-ipad` (canonical `.../intune-service/enrollment/device-enrollment-shared-ipad`) — Known limitations, applicability table, app-type table, temporary-session default, conflict-resolution language (T-3), passcode text (B2), recommended policy/app-assignment scenarios (feeds C2/C5). `updated_at: 2026-07-01`.
- `learn.microsoft.com/en-us/intune/device-enrollment/apple/setup-automated-ios` — full ADE enrollment-policy field reference: User Affinity enum (incl. "Enroll with Microsoft Entra ID shared mode" as a distinct value from Shared iPad, T-4), Supervised/Locked-enrollment, Shared iPad Yes/No toggle + wipe-trigger note (T-6), Maximum cached users (D1), screen-lock timeout enum (D2), session-inactivity (D3), temp-session-only field + its cancel-out behavior and sibling timeout field (Pitfall 4), Await final configuration unavailability with Shared iPad (A1). `ms.date: 2026-05-18`, `updated_at: 2026-07-01`.
- `learn.microsoft.com/en-us/intune/device-enrollment/apple/shared-device-solutions-ios` — clean eligibility statement ("iPadOS 13.4 or later with at least 32 GB of storage," A5), Shared iPad vs Shared Device Mode comparison table (further T-4 support), unsupported-scenarios list (B1). `updated_at: 2026-07-01`.
- `docs/admin-setup-ios/03-ade-enrollment-profile.md` (RE-109, in-repo) — read directly to confirm the T-4 conflation is present at the exact cited location (User Affinity table row: "Microsoft Entra shared mode... shared mode = Shared iPad (iPadOS only)").
- `docs/admin-setup-ios/04-configuration-profiles.md` (RE-110, in-repo) — confirmed cross-link target content and anchors (Home Screen Layout section, supervised-only 🔒 callouts).
- `docs/admin-setup-ios/05-app-deployment.md` (RE-111, in-repo) — confirmed VPP device-vs-user-licensed silent-install boundary table and anchors.
- `docs/cross-platform/apple-business/08-managed-apple-account-provisioning.md` (OU-06, in-repo) and `.../09-shared-ipad-lifecycle.md` (OU-07, in-repo) — confirmed cross-link content, anchors, and OU-07's own `[CITED: training; needs live verification]` caveat on its session/storage prose (supports A4's "recipe supersedes OU-07's training-sourced values" framing).
- `docs/_standards/EEE-SOP-standard.md` STD-05 section (in-repo) — confirmed exact D-01..D-07 spec text.
- `scripts/validation/c17-eee-contract.mjs` (in-repo) — confirmed exact #11/#12 assertion mechanics by reading the implementation directly (lines 344-408).
- `docs/recipes/01-shared-windows-avd-client.md` (in-repo) — confirmed the sibling's applied STD-05 Case-1/2 shapes, anti-feature table format, and link-not-copy execution as the concrete style precedent.

### Secondary (MEDIUM confidence)
- WebSearch summary (not directly fetched) partially corroborated the cached-users/screen-lock/temp-session field values before the direct fetch confirmed them verbatim — superseded by the Primary-tier direct fetch above, kept here only as the initial discovery trail.

### Tertiary (LOW confidence)
- None retained — every claim in this research was either directly fetched from a live first-party page or read directly from an in-repo file.

## Metadata

**Confidence breakdown:**
- Standard stack: N/A — no external stack, docs-only phase
- Architecture (cross-link boundaries, STD-05 block shapes): HIGH — confirmed against both the in-repo STD-05 spec/C17 implementation and live first-party field text
- Pitfalls (T-1..T-6 plus 2 new nuances): HIGH — all 6 CONTEXT.md traps independently re-confirmed via direct fetch of current Microsoft Learn pages (not summaries); the 2 new findings (Pitfall 4's temp-session timeout field, Pitfall 6's missing-from-reference-article setting) are additive, non-blocking, and don't touch any locked decision

**Research date:** 2026-07-17
**Valid until:** 30 days (2026-08-16) — Microsoft Learn Intune/Apple pages are actively edited (`updated_at: 2026-07-01` on all three primary pages fetched); re-verify screen-lock enum values, cached-users ceiling, and the 13.3-vs-13.4 eligibility wording if authoring is delayed past that window.
