# Phase 131: Recipe #2 — Shared iPad Full Provisioning - Context

**Gathered:** 2026-07-17
**Status:** Ready for planning

<domain>
## Phase Boundary

Phase 131 authors **`docs/recipes/02-shared-ipad-full-provisioning.md`** — the second live instantiation of the Phase-129 Device Recipe doc-class, mirroring the format precedents set by Recipe #1 (Phase 130). An Intune admin walks a linear happy path from zero to a **verified, fully-provisioned Shared iPad**: ADE enrollment profile (Shared iPad = Yes / Supervised / no user affinity) → device eligibility floors → federated Managed Apple Account sign-in (cross-linked) → device-licensed VPP Required apps → device-vs-user profile-applicability split → per-role layered configuration → home-screen layout → verification. The recipe **leads with the all-unsupported callouts** and embeds admin decision-point blocks for guest sessions and storage/session sizing.

Delivers (IPAD-01..04):
1. **Linear happy-path spine** (IPAD-01): ADE Shared-iPad enrollment → eligibility → federated Managed Apple Account sign-in → device-licensed VPP Required → device-vs-user applicability table → home-screen layout → verification. Cross-references (never duplicates) OU-06, OU-07, RE-109, RE-110, RE-111.
2. **All-unsupported anti-feature table** (IPAD-02): 7–8 genuinely-unsupported features documented with WHY + the fixed-passcode limitation + the temporary/guest-session decision block.
3. **Per-role layered-configuration worked example** (IPAD-03): device-group baseline + user-group overlay, with the never-set-the-same-setting-twice conflict warning.
4. **Storage/session sizing decision points** (IPAD-04): the real Intune enrollment-policy knobs, rendered as STD-05 admin decisions.

**Out of scope** (per ROADMAP + REQUIREMENTS Out-of-Scope): compliance/Conditional-Access/app-protection **configuration** on Shared iPad (the recipe documents these as *unsupported*, never configures them); Shared iPad SCIM/OIDC+JIT Managed-Apple-Account provisioning **depth** (OU-06 owns it — cross-link only); tenant/ABM-side lifecycle mechanics (OU-07 owns them); the `doc_type` enum extension (recipes are `doc_type: Guide` per D-02, `platform: ios+shared-ipad` — already a D1-map entry, zero C17 #10 risk); navigation/registry wiring (Phase 132, navigation-last). **This phase writes recipe content only** — no `docs/index.md` edit, no RE-index row, no filename-map regen.

**Decision provenance:** All decisions below were resolved through a **full `/adversarial-review` round** (Finder/Adversary/Referee; 4 parallel Finders — one per gray area A/B/C/D; ~245 points of findings). Every load-bearing external claim was **independently verified twice** against first-party Microsoft Learn — once by each area's Finder, once by the Adversary re-checking live docs. **The Adversary disproved zero findings** (score 0) and applied only 4 surgical trims, all folded in below. User ratified round 1 and locked (2nd round declined — clean re-confirmation expected). **These are LOCKED — do not re-litigate.**

**⚠ Highest-value finding — three of the four requirements contain factual inversions** the review corrected. Downstream agents MUST NOT regress to the requirement's original wording on these (see `<decisions>` traps + PLANNER NOTES). This is the payoff of the adversarial pass.

</domain>

<decisions>
## Implementation Decisions

Decision IDs preserve the review's area lettering: **A** cross-link boundary, **B** unsupported/passcode/guest, **C** layered config/applicability, **D** storage/session sizing. Each is LOCKED with its first-party basis. All 4 Adversary trims applied (A3, C2, D2, D4 + eligibility-floor calibration).

### ⚠ Requirement-inversion traps (carry these; do NOT regress to requirement wording)
- **T-1 (IPAD-04 inverted):** "Maximum cached users" **IS** a real, settable Intune enrollment-policy field (bounded, ≤24 on a 32/64-GB device). QuotaSize and OnlineAuthenticationGracePeriod are the ones **NOT** Intune-settable. IPAD-04's "cached-users = planning guidance, not a config field" is **factually wrong** — invert it.
- **T-2 (IPAD-03 mis-readable):** "per-role allow-lists on user groups" does **NOT** mean per-role app assignment. LOB + device-licensed VPP apps are **device-group-only** (Not applicable to user groups); only web clips are user-assignable. ALL apps → device group as **Required**; per-role differentiation = home-screen-layout + show/hide-apps allow-list on user groups.
- **T-3 (conflict resolution):** NOT last-writer-wins. Verbatim first-party: conflicting value "**can't be pre-determined**"; Intune applies "the **first setting assigned**"; both-applicable on both group types → "**chosen by the operating system**." Any deterministic-precedence phrasing is wrong.
- **T-4 (RE-109 defect):** RE-109 line 83 conflates Entra "shared device mode" with "Shared iPad." First-party: "Entra shared device mode isn't supported with Shared iPad feature in Intune." Cross-link RE-109 but state the correct distinction — do NOT inherit its bug. (Fixing RE-109 is out of scope this phase.)
- **T-5 (Email contradiction):** first-party self-contradicts — applicability table lists Email device/user-applicable, but Known Limitations says email profiles unsupported (error on assignment). Resolve to **NOT supported** (anti-feature row) + plan-time-verify.
- **T-6 (wipe trigger):** real wipe = a Shared-iPad-enabled policy sent to an **unsupported device** (iPhone / iPad ≤ iPadOS 13.3). SEPARATE fact = changing an existing enrollment policy requires factory reset to apply ("reset to apply," not "toggle-change punitively wipes"). Keep distinct; don't merge into a scary "any change wipes."

### A — Cross-link boundary (own vs. link) — LOCKED
- **A1 (ADE enrollment step):** Recipe **owns inline** the Shared-iPad-specific toggles as a values table — Enable Shared iPad / User affinity = **Enroll without user affinity** / Supervised = **Yes** / Shared iPad = **Yes** — plus the wipe warning in first-party wording (T-6). **EXCLUDE "Await final configuration"** — first-party: unavailable with (no user affinity + Shared iPad=Yes). LINK RE-109 for **general** ADE fields only (supervised/locked/auth/panes), not as the Shared-iPad-settings reference. *Basis:* no Approved in-repo doc owns the Shared-iPad enrollment toggles (RE-109 mislabels them — T-4); recipe becomes their de-facto owner, backed by stable first-party Learn URLs.
- **A2 (federated sign-in step):** Minimal inline = **one sentence** (users sign in with their federated Managed Apple Account; the Managed Apple ID is JIT-created at first sign-in). Federation **setup** → Prerequisites bullet + LINK OU-06 (`docs/cross-platform/apple-business/08-managed-apple-account-provisioning.md`). Do NOT re-author OU-06's provisioning matrix.
- **A3 (VPP step):** Recipe **owns inline** the Shared-iPad triple (device-licensed VPP + Required intent + device-group assignment) — the only working path. LINK RE-111 (`docs/admin-setup-ios/05-app-deployment.md`) for exhaustive VPP mechanics. State user-licensed VPP / App Store apps / "Available" intent are unsupported here (coordinate with B).
- **A4 (OU-07 overlap):** Recipe owns **only** the Intune-admin decision framing + enrollment-profile-embedded session values; LINK OU-07 (`docs/cross-platform/apple-business/09-shared-ipad-lifecycle.md`) for session mechanics/lifecycle. Do NOT reproduce OU-07's Stage-2 session table. *Basis:* in Intune the session knobs live in the **ADE enrollment profile** (not OU-07's post-enrollment-profile framing) — reproducing OU-07 both duplicates AND misattributes the mechanism.
- **A5 (eligibility + externals):** Lead eligibility with **iPadOS 13.4+ (enrollment-policy floor) / ≥32 GB**. Drop "64 GB+ recommended" (first-party has no such floor; 64 GB appears only in "cache up to 24 users on a 32-GB or 64-GB device"). Note the first-party internal inconsistency (Important box says "13.3 and later") — 13.4 is dominant, not the sole number. Stable first-party learn.microsoft.com externals are permitted (no allowlist entry); flaky ones barred.

### B — Unsupported table + passcode + guest — LOCKED
- **B1 (row shape):** 7–8 rows, **one per IPAD-02 feature** (compliance, app-based CA, device-based CA, app protection, email, Company Portal, "Available" intent, user-licensed VPP), in the frozen table header `| Feature | Why it's unsupported / what breaks | Do this instead |`. All confirmed genuinely unsupported first-party. Do NOT collapse under a "MAM stack" label (misclassifies compliance + device-based CA, which are MDM constructs). C17 #11 not triggered (≤25 rows).
- **B2 (passcode):** Rendered as a **dedicated note adjacent to the table** (NOT a table row — "Do this instead" has no answer for a fixed limitation; NOT a decision block). Content: **eight ALPHANUMERIC characters**, unchangeable in Apple Business; Intune complexity/length settings don't apply; the grace period (screen-lock, minutes-to-unlock-without-passcode) is the only knob. **Write as plain prose or split blockquotes** — the natural single-blockquote note (~280 chars) breaks C17 #12's ≤200-char cap. Never "8-digit."
- **B3 (guest decision block):** STD-05 **Case-1 boolean** at the session-config step. Guest is **ON by default**; the Intune control is **"Block Shared iPad temporary sessions"** (iOS device-restrictions profile) at **INVERTED polarity** — guest-enabled = Block set to **No / Not configured**. The "Recorded as" value MUST carry the real inverted Block setting, never a fabricated positive `enabled` key. Coordinate with OU-07 (recommends disabling guest for OU-managed pools); use the Intune-verified control name, not OU-07's training-tagged Apple-side key.
- **B4 (third mode):** Document the enrollment-profile **"Require Shared iPad temporary session only"** (guest-ONLY — no Managed Apple ID sign-in) as a distinct third mode, out-of-scope for this named-user recipe but stated (IPAD-02 "not silently omitted"). It lives on a different surface than B3's Block toggle — keep separate.
- **B5 (Available/VPP framing + ordering):** "Available" intent + user-licensed VPP appear as unsupported table rows (terse "do this instead: Required + device-licensed") AND the positive how-to lives at the VPP step (A3), both linking RE-111 — no third restatement. Sourced WHY for user-licensed-VPP N/A: App Store installs are disabled on Shared iPad + user licensing needs personal-Apple-Account App Store sign-in (NOT an invented "Managed Apple Accounts can't hold licenses"). "Leads with unsupported" = table in its **normal skeleton slot** (after Prerequisites, before Steps) — NO D-06 reorder.

### C — Layered config + applicability — LOCKED
- **C1 (two surfaces):** Render **two distinct, cross-linked surfaces** — a **trimmed applicability reference table** (which setting types are device- vs user-targetable, limited to rows the example touches) + a **per-role worked example** (concrete instance). Link RE-110 (`docs/admin-setup-ios/04-configuration-profiles.md`) for the full matrix to avoid duplication. IPAD-01's "applicability split as a table" = the reference table; IPAD-03's "worked example" = the scenario table.
- **C2 (worked example):** **Exactly 2 roles, healthcare (Nurse / Clinician).** Device-group baseline = common **Wi-Fi** (platform-forced device-only, C3) + **all apps** as device-licensed VPP / LOB **Required** (device-group-only, T-2) + common device restrictions. User-group overlay = per-role **home-screen layout** + per-role **show/hide-apps allow-list**. **Trim (A-F3 applied):** home-screen layout is **user-applicable for per-role differentiation** AND device-applicable on device-group assignment — do NOT overstate as "user-only, never device." Keep the example internally clean (no same-app-in-dock-and-page self-conflict). Frame layout as per-signed-in-role, not per-physical-user persistence.
- **C3 (baseline is forced, not chosen):** Wi-Fi / VPN / Certificate are **Not applicable to user groups** → device-group baseline placement is **platform-forced**, stated as a constraint, not a best-practice preference.
- **C4 (conflict warning):** A `> **What breaks if misconfigured:**` **callout** (template's per-step idiom) at the layered-config step — **NOT** an STD-05 block (STD-05 is for admin decisions; this is a hazard). WHY uses the three **verbatim** first-party phrases (T-3): "can't be pre-determined" / "first setting assigned" / "chosen by the operating system." Word-split across `>` lines for C17 #12 (~330 chars single-run otherwise).
- **C5 (placement + verification consequence):** Split the example along the natural device→user spine (device baseline earlier; user overlay + home-screen layout as a **late step before Verification**, per IPAD-01 ordering) but render the worked-example **table as one contiguous artifact** at the user-overlay step. State that **temporary/guest sessions receive device-group assignments only** (user overlays never apply in guest mode). **Verification MUST be on-device** (sign in as each role, observe layout/app set) — user-assigned policy status does **not** appear in Intune reports. No Company-Portal-based verification (unsupported). Email = **unsupported** anti-feature row (T-5) + plan-time-verify.

### D — Storage / session sizing (reframed around the real Intune surface) — LOCKED
- **D1 (cached users — the inverted knob, T-1):** **"Maximum cached users"** = STD-05 **Case-3 bounded** block (up to 24 on a 32/64-GB device) — a REAL settable enrollment-policy field. Sizing-calculation prose (storage ÷ per-user footprint; low = slow first-sign-in population, high = out-of-disk risk) lives **outside** the blockquote. This resolves IPAD-04's cached-users item; do NOT render it as prose-only "planning guidance."
- **D2 (screen-lock timeout):** **"Maximum seconds after screen lock before password"** = STD-05 **Case-2 enum**, "Recorded as" values **0 / 60 / 300 / 900 / 3600 / 14400** (iPadOS **13.0+**). **Trim (D-M2 applied):** label in **SECONDS**, not minutes. This is the screen-lock passcode grace — distinct from the online-auth grace (D4).
- **D3 (session inactivity):** **"Maximum seconds of inactivity until user session logs out"** = STD-05 **Case-3 bounded** (min 30, 0/blank = never, iPadOS **14.5+**).
- **D4 (phantom fields — trim D-C1 applied):** **QuotaSize** and **OnlineAuthenticationGracePeriod** are **NOT settable in Intune GUI** (Apple-MDM `SharedDeviceConfiguration` keys Intune only reads back) → **advanced / plan-time-verify pointers only**, NEVER STD-05 "Recorded as" blocks. The Apple-schema internals ("iPadOS 17 QuotaSize honoring for temp sessions," online-auth grace "in days") are **unverified from Intune docs and non-load-bearing** — keep as pointers, do not assert as Intune facts. Two DISTINCT "grace periods": screen-lock passcode grace (seconds, settable — D2) vs online-auth grace (days, not settable — here). QuotaSize and cached-users (ResidentUsers) are **alternates for one mechanism** — present either/or, not two additive knobs.
- **D5 (placement + floors):** No dedicated "Sizing" H2 (breaks the fixed skeleton). The enrollment-policy items (cached users, timeouts, temp-session-only) **cluster naturally as consecutive blocks at the single enrollment-policy step** — they are co-located on ONE Intune screen (the Windows sibling's "scatter across steps" reasoning does NOT transfer; only its "no dedicated section" ruling does). "Block Shared iPad temporary sessions" is a distinct block at the device-restrictions step (13.4+). **Per-field iPadOS floors** (13.0 screen-lock / 13.4 Shared iPad / 14.5 session-inactivity & temp-session), NOT the blanket "iPadOS 17+" the requirement attaches. Confidence HIGH on cached-users/timeout blocks; surgical verify-flag only on the QuotaSize/grace pointers.

### Claude's Discretion
- Exact prose wording within every LOCKED constraint (step text, callout phrasing, table cell wording).
- Synthetic happy-path values where the requirement pins none (specific cached-users number in the worked example, chosen timeout values, the concrete Nurse/Clinician app sets and layouts).
- The healthcare vertical for the worked example (Nurse/Clinician chosen; education Student/Teacher is an equivalent fallback if authoring prefers).
- Whether the trimmed applicability table shows 4–8 rows (limited to what the worked example touches).

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Locked format & foundation (the surfaces this recipe instantiates)
- `.planning/phases/129-device-recipe-doc-class-foundation/129-CONTEXT.md` — LOCKED D-01..D-15: STD-05 composite decision-block format (3 cases), 3-rule branch floor, D-06 fixed H2 skeleton, D-13 Summary end-state, anti-feature table shape, TEMPLATE-SENTINEL convention.
- `.planning/phases/130-recipe-1-shared-windows-avd-client-device/130-CONTEXT.md` — the **first live instantiation** whose class-signaling precedents this recipe inherits: anti-feature-table shape (E-LOCK series — E-LOCK-2 explicitly anticipated IPAD-02 as the "pure all-unsupported case"), scope-banner specialization (H-LOCK-1), link-not-copy-by-ownership (D-LOCK-5), single `## Verification` with bold pseudo-heading groups (G-LOCK-1), surgical-confidence-flag discipline (A-LOCK-4).
- `docs/_templates/recipe-template.md` — the skeleton this recipe instantiates: fixed H2 order (Summary / Prerequisites / Unsupported and Anti-Feature Callouts / Steps / Verification / Configuration-Caused Failures / See Also), `> **Scope:**` banner (MUST specialize), anti-feature table header, `### Step N:` pattern, per-step `> **What breaks if misconfigured:**` callouts, `## Verification` `- [ ]` idiom.
- `docs/recipes/01-shared-windows-avd-client.md` — the sibling recipe; the concrete reference for how link-not-copy, STD-05 cases, and the anti-feature table were applied in practice. NOTE its structural shape is **branches** (non-converging); Recipe #2 uses **layering** instead — do not copy the branch structure.
- `docs/_standards/EEE-SOP-standard.md` — STD-05 spec (decision-block format), D-02 recipe→Guide ruling, C17 needle-spec, D1 platform map (`ios+shared-ipad` pre-exists).

### The gate (stay green; DO NOT EDIT)
- `scripts/validation/c17-eee-contract.mjs` — live C17. Load-bearing: #12 caps each contiguous top-level `>`-run ≤200 chars (blank line splits runs, markup counted) — the passcode note (B2) and conflict callout (C4) both risk this; #11 fires only on tables >25 rows (the 7–8-row anti-feature table is exempt); no code fences in body (values → tables). Subprocess-spawned by v1.15/16/17 milestone audits — any edit retroactively mutates every predecessor audit. **DO NOT EDIT.**
- The milestone-audit `-audit-allowlist.json` frozen `count==15` assertion — stable first-party learn.microsoft.com externals need no entry (A5); flaky/transient ones are barred.

### Cross-link targets (own-vs-link boundary, Area A)
- `docs/admin-setup-ios/03-ade-enrollment-profile.md` (RE-109) — general ADE enrollment-profile authority. **⚠ line 83 conflates Entra "shared device mode" with Shared iPad (T-4) — a real defect; cross-link but state the correct distinction, do NOT inherit it.** Line 138 already notes "Await final configuration" is unavailable with (no user affinity + Shared iPad=Yes) — A1.
- `docs/admin-setup-ios/04-configuration-profiles.md` (RE-110) — owns home-screen layout + restrictions detail; LINK for the full applicability matrix (C1) to avoid duplication.
- `docs/admin-setup-ios/05-app-deployment.md` (RE-111) — owns VPP/app-deployment mechanics + assignment intents; LINK for exhaustive detail (A3/B5). Narrow the VPP-verification cross-link to the device-licensed / MDM-channel path (NOT Company-Portal-based — CP unsupported on Shared iPad).
- `docs/cross-platform/apple-business/08-managed-apple-account-provisioning.md` (OU-06) — owns the federated Managed Apple Account provisioning matrix; LINK-only (A2), never re-author.
- `docs/cross-platform/apple-business/09-shared-ipad-lifecycle.md` (OU-07) — owns ABM-side lifecycle + post-enrollment session mechanics; LINK for lifecycle/session (A4). Its session-config + storage-quota prose is `[CITED: training; needs live verification]` and carries a unit error ("15–30 minutes" vs the Intune field's seconds) — the recipe owns the Intune-admin decision framing and supersedes, does NOT copy OU-07's training-sourced values.

### Planning inputs
- `.planning/REQUIREMENTS.md` — IPAD-01..04, Out-of-Scope table. **⚠ IPAD-04 inverts cached-users vs QuotaSize (T-1); IPAD-03 "allow-lists on user groups" is mis-readable as per-role app assignment (T-2). Read against the traps above, not literally.**
- `.planning/ROADMAP.md` — Phase 131 goal + SC1-SC4.
- `.planning/research/ARCHITECTURE.md` — grounded option space; confirms `docs/recipes/` placement, `doc_type: Guide`, `platform: ios+shared-ipad` (zero C17 #10 risk), Phase-132 navigation-last wiring.

### First-party Microsoft Learn (verified 2× during review — cite in SUMMARY/VERIFICATION, keep body cross-links internal where an owner exists)
- Shared iPad setup / known limitations / add-apps table / passcode / temporary sessions: `learn.microsoft.com/intune/device-enrollment/apple/shared-ipad`.
- ADE enrollment policy (Maximum cached users, timeouts, Require temp session only, Await-final-config unavailability, wipe trigger): `learn.microsoft.com/intune/device-enrollment/apple/setup-automated-ios`.
- Device-restrictions "Block Shared iPad temporary sessions" + applicability table + conflict resolution: `learn.microsoft.com/intune/device-configuration/templates/ref-device-restrictions-apple#shared-ipad`.
- Eligibility floors / solution comparison: `learn.microsoft.com/intune/device-enrollment/apple/shared-device-solutions-ios`.
- Entra-shared-mode ≠ Shared iPad (T-4): `learn.microsoft.com/intune/solutions/frontline-worker/ios-ipados`.
- VPP licensing WHY (B5): `learn.microsoft.com/intune/apps/manage-vpp-apple`.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `docs/_templates/recipe-template.md` — instantiated wholesale (fixed H2 spine, anti-feature table header, `### Step N:`/what-breaks idiom, `## Verification` `- [ ]` list, Configuration-Caused Failures table).
- `docs/recipes/01-shared-windows-avd-client.md` — the sibling's applied STD-05 cases, anti-feature table, and link-not-copy execution are the concrete style reference.
- C17 self-test (`node scripts/validation/c17-eee-contract.mjs --self-test`) + full-corpus run (`--verbose`) — the green-gate for the new recipe; must exit 0.

### Established Patterns
- Recipes are `doc_type: Guide` (D-02), value-live (not TEMPLATE-SENTINEL-exempt) — #4/#5/#9/#11/#12 all fire on real values. The all-unsupported table is #11-exempt only because ≤25 rows.
- Link-not-copy by ownership (D-LOCK-5, Phase 130) — this recipe's dominant discipline given 5 overlapping existing docs (RE-109/110/111, OU-06/07).
- **Structural divergence from the sibling:** Recipe #1 = non-converging branches; Recipe #2 = device-baseline + user-overlay **layering** (a different shape — not a fork). First-party documents this layering pattern verbatim.

### Integration Points
- Phase 132 (navigation-last) wires `docs/index.md`, flips the RE-index row to Approved, and regenerates filename-map — this phase writes recipe content only.
- Recipe #2 inherits Recipe #1's anti-feature-table class-signaling precedent (Phase-130 E-PLANNER-NOTE) and is the pure all-unsupported instance.

</code_context>

<specifics>
## Specific Ideas

- **ADE enrollment happy-path toggles (verbatim first-party):** Enable Shared iPad · User affinity = Enroll without user affinity · Supervised = Yes · Shared iPad = Yes. EXCLUDE "Await final configuration" (unavailable in this combo).
- **Eligibility floor:** iPadOS 13.4+ / ≥32 GB (drop "64 GB recommended").
- **Worked example (IPAD-03):** 2 roles, healthcare (Nurse / Clinician). Device baseline = Wi-Fi (forced device-only) + all apps Required to device group. User overlay = per-role home-screen layout + show/hide allow-list. NEVER per-role app assignment to user groups.
- **Conflict warning WHY (verbatim, word-split for C17 #12):** "can't be pre-determined" / "first setting assigned" / "chosen by the operating system." Never "last-writer-wins."
- **Guest decision block (B3):** Intune control = "Block Shared iPad temporary sessions" (device-restrictions), inverted polarity — guest-on = Block No/Not configured. Not an "Enable guest" toggle.
- **Sizing knobs (D):** Maximum cached users (Case-3, ≤24 on 32/64-GB) · screen-lock-before-password (Case-2 enum 0/60/300/900/3600/14400 seconds, 13.0+) · session-inactivity logout (Case-3, min 30s, 14.5+). QuotaSize + online-auth grace = plan-time-verify pointers only.
- **Passcode:** eight alphanumeric, Apple-fixed; grace period the only knob. Plain prose / split blockquote (not one >200-char blockquote).

</specifics>

<deferred>
## Deferred Ideas

- **Guest-only (kiosk-style) Shared iPad deployment** — the "Require Shared iPad temporary session only" third mode (B4) is a real supported pattern (healthcare check-in / education carts) but out-of-scope for this named-user recipe; stated as out-of-scope, a candidate future recipe/variant.
- **QuotaSize fixed-bytes provisioning via custom/Settings-Catalog profile** — documented only as an advanced pointer (D4); a full custom-profile QuotaSize walkthrough is out of scope (not Intune-GUI-exposed; Apple-MDM key).
- **RE-109 line-83 conflation fix** — the Entra-shared-mode ≠ Shared iPad defect (T-4) is a real doc bug but fixing an existing Approved doc is out-of-scope this phase (mirrors HYG-04's scoped-once discipline; this milestone's only existing-doc edit was HYG-04 in Phase 130). Candidate for a future HYG item — flag it, don't fix it here.

### Reviewed Todos (not folded)
None — `todo.match-phase 131` returned 0 matches.

</deferred>

---

*Phase: 131-Recipe #2 — Shared iPad Full Provisioning*
*Context gathered: 2026-07-17*
