# Phase 64: Apple Business Delegation Runbooks — Research

**Researched:** 2026-05-22
**Domain:** Apple Business (formerly Apple Business Manager) delegated-action documentation — 8 operational runbooks (`11-`…`18-`) for Pillar 3 of the v1.6 milestone
**Confidence:** HIGH (all factual claims sourced from prior-phase v1.6 research + corpus inspection; Apple-side operational details carry `[ASSUMED]` or `[CITED]` where live verification is needed)

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**D-01: Runbook template uniformity — enforced envelope + flexible body (Option C)**
All 8 runbooks share a mandatory ENVELOPE that `check-phase-64.mjs` enforces, with BODY flexible per action:
- Envelope (enforced): 5-field frontmatter (`last_verified` / `review_by` / `applies_to` / `audience` / `platform`) + `> **Platform applicability:**` scope blockquote + `> **Training-data notice:**` block + `## Verification` section + Apple-Business-vs-Intune scope-boundary callout (D-02) + `## Required Role & Permission` block (D-03).
- Body (flexible): shaped by each requirement — `11-` license-verify steps, `12-` 3-path decision matrix, `15-` OS-eligibility matrix, `17-` author/target-scope model, `18-` disambiguation table.

**D-02: Scope-boundary callout source-of-truth — self-sufficient one-liner + forward link (Option C)**
Each delegation runbook carries a self-sufficient one-line Apple-Business-vs-Intune scope-boundary callout (states the boundary so the runbook stands alone) + a forward link to `18-cross-org-boundary-cheat-sheet.md`. `18-` remains the canonical disambiguation-TABLE SOT (DELEG-08) without being copied into runbooks.

**D-03: Required-permission precondition block — standardized block, conditional bundle ref (Option C)**
Each runbook opens with a standardized `## Required Role & Permission` block citing `01-role-permission-model.md` (SOT) + the OU-scope, always; cite the Phase 63 `04-custom-role-authoring.md` Sub-Org Admin bundle only where the action's permission maps to that bundle (as `06-` does for `Assign devices to MDM server`).

**D-04: Destructive-action gating — Refined-C: uniform HARD callout, path-specific gate clause**
A uniform HARD-bordered callout on EVERY destructive path — but the "L2 approval required" gate clause appears ONLY on `12-` Path C (EraseDevice):
- `12-` Path C (EraseDevice) → hard callout WITH the L2-approval gate (OP-11 / SC#1); ordered LAST in the 3-path matrix.
- `13-` release → hard callout, body = OP-6 "release ≠ removal + 30-day provisional" warning — NO L2-approval gate.
- `14-` transfer → hard callout, body = OP-5 4-cell impact matrix + pre-transfer dependency checklist — NO L2-approval gate.

### Claude's Discretion

- The exact hard-bordered callout convention (first realization in `11-` OP-9 and `12-` OP-11; planner/researcher defines the convention; `check-phase-64.mjs` asserts its exact string).
- Exact criteria rows for the `15-` OS-version eligibility matrix and the `14-` 4-cell impact matrix.
- Exact `## Required Role & Permission` block layout (table vs prose) — must respect OP-1/OP-2/OP-3.
- Sequential ABAUDIT comment numbering (continues from `ABAUDIT-04` shipped in `06-`).

### Deferred Ideas (OUT OF SCOPE)

- Per-OU CRD partitioning deep-dive + sub-OU nesting at depth > 2 → v1.7+.
- L1 #34 + L2 #26 + hub-navigation integration (common-issues / quick-ref-l1/l2 / operations index / docs/index.md) → Phase 65 (NAVIGATION-LAST). The C16 `admin_12 ↔ l1_34` edge goes live in Phase 65.

</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| DELEG-01 | `11-vpp-catalog-runbook.md` — VPP catalog claim + transfer + buy + payment-scoping; OP-9 hard-bordered callout; post-migration license-count verification within 0.1% | FEATURES §3, OP-9, STACK §4 confirm per-OU token model + untouched-OU trap semantics |
| DELEG-02 | `12-shared-ipad-passcode-reset.md` — canonical admin-context doc (C16 gate target); 3-path decision matrix Path A (Apple Business UI / L1 first) / Path B (MDM ClearPasscode / L2) / Path C (MDM EraseDevice / L2+approval) | FEATURES §4, OP-11, STACK §7 confirm 3-path mechanics + anti-feature (Intune Reset Passcode ≠ Shared iPad partition reset) |
| DELEG-03 | `13-device-release-runbook.md` — "release ≠ removal" semantics + 30-day provisional-period callout (OP-6) | FEATURES §5.1, OP-6 confirm soft-delete semantics + reseller re-appearance risk |
| DELEG-04 | `14-device-transfer-runbook.md` — cross-OU transfer; 4-cell impact matrix (VPP license / enrollment profile / Intune config profile / audit entry) + pre-transfer dependency checklist (OP-5) | FEATURES §5.2, OP-5 confirm 4 impact categories |
| DELEG-05 | `15-mdm-server-reassign-runbook.md` — SINGLE runbook with OS-version eligibility matrix (iOS/iPadOS/macOS/tvOS 26+ → in-place; legacy → factory erase) + 2 sub-H2s consolidating FEATURES Workflow 5.3 split | FEATURES §5.3, STACK §3 confirm OS-26 boundary + in-place migration semantics |
| DELEG-06 | `16-managed-apple-account-runbook.md` — manual + SCIM + OIDC+JIT; 60-day federation collision sub-section (OP-7); SCIM token renewal cadence | FEATURES §6, STACK §5, OP-7 confirm all 3 paths + 60-day window + 1-year SCIM token |
| DELEG-07 | `17-audit-log-scoping-runbook.md` — author-scope vs target-scope semantics (OP-14); SIEM export pattern (OP-13); "no public REST API" anti-feature | FEATURES §7, OP-13/OP-14 confirm UI-only access + scoping behavior |
| DELEG-08 | `18-cross-org-boundary-cheat-sheet.md` — Apple-Business-vs-Intune disambiguation table; C15 anti-pattern allowlist exemptions in HTML comments | STACK §6, C15 guard semantics, ABAUDIT numbering |

</phase_requirements>

---

## Summary

Phase 64 delivers 8 operational runbooks (files `11-` through `18-`) under `docs/cross-platform/apple-business/`. These sit on top of the Phase 62/63 foundation layer and transform the admin-setup concepts into step-by-step delegation procedures. The runbooks are documentation-only deliverables; no code, packages, or data migrations are involved.

All Apple Business operational procedures described in these runbooks are sourced from the v1.6 research corpus (FEATURES.md, PITFALLS.md, STACK.md) which was verified against Apple Support documentation in May 2026. Portal-navigation labels that could not be confirmed via live scrape are tagged `[CITED: training; needs live verification]` per the 60-day `last_verified` discipline. The corpus is the source of truth for what each runbook must describe; this research document summarizes those findings at the level of precision the planner needs to assign tasks.

**Critical constraint:** `check-phase-64.mjs` is a deliverable of this phase alongside the 8 runbooks. The validator inherits the check-phase-63 Path-A template structure and extends it with DELEG-01..08 assertions covering: file existence, envelope presence (frontmatter keys, Platform-applicability block, Training-data notice, scope-boundary callout, Required Role & Permission block), hard-bordered callout exact strings (OP-9 in `11-`, OP-11 EraseDevice gate in `12-`), Path ordering in `12-`, single-runbook invariant for `15-`, and C15/C16 milestone-audit gate.

**Primary recommendation:** Author the 8 runbooks as parallel tasks in Wave 2 (after Wave 1 creates `check-phase-64.mjs` scaffold + defines the hard-bordered callout string that check-phase-64 asserts). The callout string must be decided in Wave 1 so all 8 runbooks can use it consistently.

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| VPP catalog operations (claim/transfer/buy/payment) | Apple Business portal (UI) | Intune (downstream token upload — out-of-scope) | Apple Business owns content token + Apps & Books surface; Intune receives the token but token management lives in Apple Business |
| Shared iPad passcode reset | Apple Business portal (Path A, primary) | MDM / Intune (Paths B/C, L2-only) | Apple Business holds the Managed Apple Account credential; MDM ClearPasscode is a device-level, not partition-level, operation |
| Device release | Apple Business portal (UI) | Reseller backend (soft-delete semantics — no API) | "Release" is an Apple Business ADE record action; Intune receives notification but the canonical action is Apple-side |
| Cross-OU device transfer | Apple Business portal (UI) | Intune (VPP license re-assignment — separate, explicit step) | Device Location move is Apple Business-owned; VPP license does not follow automatically |
| MDM server reassignment | Apple Business portal (UI) | Intune (re-enrollment after factory reset or in-place migration) | Apple Business owns the device-to-MDM-server binding; Intune is the target MDM |
| Managed Apple Account provisioning | Apple Business portal (manual) / Entra (SCIM + OIDC) | Intune (downstream enrollment, out-of-scope) | Identity creation lives in Apple Business and Entra; Intune consumes the resulting Managed Apple Account |
| Audit log access and export | Apple Business portal (UI-only download) | External SIEM (export target — no REST API) | No public Apple Business REST API for audit; UI CSV download is the only export mechanism |
| Cross-org boundary documentation | Documentation layer (`18-` cheat sheet) | All tiers (disambiguates Apple Business vs Intune responsibility) | `18-` is a reference document, not a workflow runner |

---

## Standard Stack

This is a documentation-only phase. There is no executable stack to install.

### Documentation Tooling (already installed in corpus)

| Tool | Purpose | Status |
|------|---------|--------|
| Node.js (existing) | Run `check-phase-64.mjs` validator | Already present (inherited from check-phase-62/63) |
| `v1.6-milestone-audit.mjs` | C15 / C16 gate validation | Active and blocking since Phase 62 |
| Markdown (existing) | All runbook content | No new dependencies |

### Package Legitimacy Audit

Not applicable — this phase installs no external packages.

---

## Architecture Patterns

### System Architecture Diagram

```
Phase 63 foundation layer (09-, 10-, 05-#which-admin-owns-this-pool anchors)
    │
    └─ Phase 64 Wave 1 (check-phase-64.mjs scaffold + hard-bordered callout string defined)
         │
         └─ Phase 64 Wave 2 (8 runbooks authored in parallel, referencing callout string)
              │
              ├─ 11-vpp-catalog-runbook.md
              │     └─ OP-9 hard-bordered callout (first realization)
              │     └─ forward pointer ← 02-ous-architecture.md, 07-vpp-content-token-consolidation.md
              │
              ├─ 12-shared-ipad-passcode-reset.md  (C16 admin_12 target)
              │     └─ OP-11 hard-bordered callout + L2-approval gate on Path C only
              │     └─ C16 edge: 12- exempted from 34- back-link until Phase 65
              │
              ├─ 13-device-release-runbook.md
              │     └─ OP-6 hard-bordered callout (no L2-approval gate)
              │
              ├─ 14-device-transfer-runbook.md
              │     └─ OP-5 hard-bordered callout (no L2-approval gate) + 4-cell matrix
              │
              ├─ 15-mdm-server-reassign-runbook.md  (SINGLE, 2 sub-H2s)
              │
              ├─ 16-managed-apple-account-runbook.md
              │
              ├─ 17-audit-log-scoping-runbook.md
              │
              └─ 18-cross-org-boundary-cheat-sheet.md  (D-02 disambiguation SOT; C15 ABAUDIT host)
                    └─ receives forward links from 11-..17-

Phase 64 Wave 3: check-phase-64.mjs completed + VERIFICATION.md authored
    │
    └─ Phase 65 (L1 #34 cross-links to 12-, completing C16 triangle)
```

### Recommended Project Structure

```
docs/cross-platform/apple-business/
├── 11-vpp-catalog-runbook.md         # DELEG-01
├── 12-shared-ipad-passcode-reset.md  # DELEG-02
├── 13-device-release-runbook.md      # DELEG-03
├── 14-device-transfer-runbook.md     # DELEG-04
├── 15-mdm-server-reassign-runbook.md # DELEG-05
├── 16-managed-apple-account-runbook.md # DELEG-06
├── 17-audit-log-scoping-runbook.md   # DELEG-07
└── 18-cross-org-boundary-cheat-sheet.md # DELEG-08

scripts/validation/
└── check-phase-64.mjs                # validator-as-deliverable

.planning/phases/64-apple-business-delegation-runbooks/
└── 64-VERIFICATION.md                # authored after all runbooks pass harness
```

### Pattern 1: Enforced Envelope (D-01)

**What:** All 8 runbooks share an identical mandatory envelope that the validator greps for.
**When to use:** Every runbook `11-` through `18-`.
**Example (verbatim from `06-mdm-server-assignment.md`):**

```markdown
---
last_verified: 2026-05-21
review_by: 2026-07-20
applies_to: apple-business
audience: admin
platform: ios+macos
---

> **Platform applicability:** [one-sentence scope statement] ...
<!-- ABAUDIT-NN: [rationale for C15 exemption if needed] -->
> [scope-boundary callout with forward link to 18-]

> **Training-data notice:** [standard notice block]

# [Title]

## Required Role & Permission
[standardized block, conditional 04- bundle ref per D-03]

## [Body H2s — flexible per runbook]

## Verification
[post-action verification steps]
```

**Source:** `docs/cross-platform/apple-business/06-mdm-server-assignment.md:1-14` [VERIFIED: corpus inspection]

### Pattern 2: Hard-Bordered Callout (Claude's Discretion — first realization)

**What:** A visually distinct "hard-bordered" callout for HIGH-severity destructive or data-loss-risk warnings. Forward-referenced 5× in shipped docs but never yet realized. Phase 64 (`11-` OP-9, `12-` OP-11 Path C) is the first realization.
**When to use:** OP-9 untouched-OU trap in `11-`; OP-11 EraseDevice gate in `12-`; OP-6 release warning in `13-`; OP-5 transfer warning in `14-`.
**Recommended form** (blockquote with `⛔` bold prefix line, consistent with `09-shared-ipad-lifecycle.md:43-68` Critical callout pattern):

```markdown
> **⛔ [ACTION] — [SEVERITY LABEL]**
>
> [Body sentence 1: what breaks.]
>
> [Body sentence 2: why it's irreversible or HIGH-impact.]
>
> [Mitigation or prerequisite checklist.]
>
> Source: PITFALLS.md [OP-NN]
```

For `12-` Path C ONLY, add the L2-approval gate clause:

```markdown
> **⚠️ L2 approval required before proceeding.**
```

**Source:** `09-shared-ipad-lifecycle.md:43-68` callout structure [VERIFIED: corpus inspection]; `64-CONTEXT.md` D-04 Refined-C [VERIFIED: context file]

**check-phase-64 must assert the exact opening string** of the OP-9 callout in `11-` and the OP-11 callout in `12-` (V-64-style exact-string assertion, analogous to V-63-03).

### Pattern 3: Self-Sufficient Scope-Boundary Callout + Forward Link (D-02)

**What:** Each runbook carries a one-liner that states the boundary inline, plus a forward pointer to `18-`.
**When to use:** Every runbook `11-`–`17-`. `18-` IS the SOT so it does not forward-link to itself.
**Example (verbatim from `07-vpp-content-token-consolidation.md:128-132`):**

```markdown
> **Scope boundary:** This runbook covers Apple Business-side [action]; Intune-side
> [related concern] is outside the Apple Business permission surface and is not covered here.
> For a full Apple-Business-vs-Intune responsibility table, see
> [18-cross-org-boundary-cheat-sheet.md](18-cross-org-boundary-cheat-sheet.md).
```

**Source:** `07-vpp-content-token-consolidation.md` callout pattern [VERIFIED: corpus inspection]

### Pattern 4: ABAUDIT Exemption (line-pair-scoped)

**What:** `<!-- ABAUDIT-NN: [rationale] -->` immediately before a line that would otherwise trigger C15. Exempts ONLY the comment line and the single immediately-following line (line i and i+1).
**Critical:** One comment per banned line. Multi-line Intune prose in `18-` needs one ABAUDIT comment per row of the table that contains a banned phrase.
**Next ABAUDIT number:** ABAUDIT-04 was used in `06-mdm-server-assignment.md`. Phase 64 continues from **ABAUDIT-05** onward. The planner should assign a sequential block to each runbook that needs exemptions (primarily `12-` Path B prose and `18-` table rows).

**Source:** `v1.6-milestone-audit.mjs:733-739` [VERIFIED: corpus inspection]; `00-overview.md:61-78` ABAUDIT style guide [VERIFIED: corpus inspection]

### Anti-Patterns to Avoid

- **Copying `18-` disambiguation content into each runbook:** Violates D-02 (anti-redundancy / link-not-copy from Phase 62 D-04). One-liner + link is the correct pattern.
- **Adding L2-approval gate to `13-` or `14-`:** Violates D-04 Refined-C. Destructive HIGH-severity warrants a hard callout; L2-approval gate is SC#1 / OP-11 specific to EraseDevice (`12-` Path C only).
- **Using bare ABAUDIT block comment for multiple lines:** The exemption is line-pair-scoped — covers only line i+1. Each banned-phrase line needs its own ABAUDIT comment on the preceding line.
- **Adding `34-` back-link to `12-` in Phase 64:** The C16 `admin_12 ↔ l1_34` edge sunsets in Phase 65 per the locked removal contract. `12-` must NOT carry the `34-` back-link during Phase 64; the exemption in `v1.6-audit-allowlist.json` (`sunset_phase: "64-65"`) specifically covers this.
- **Creating 2 MDM-reassign runbooks:** CI-5 anti-proliferation invariant (SC#3). `15-` is exactly ONE runbook with 2 sub-H2s for legacy vs OS-26+ paths.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Audit harness structural assertions | Custom grep scripts inline per plan | `check-phase-64.mjs` validator pattern from `check-phase-63.mjs` | Path-A copy preserves chain regression guard + CHAIN_PHASES array logic |
| ABAUDIT numbering tracking | Ad-hoc numbering per runbook | Sequential registry starting at ABAUDIT-05, tracked in Wave 1 plan | Out-of-order or duplicate ABAUDIT numbers cause harness confusion |
| Hard-bordered callout HTML/CSS | Div blocks, HTML tables | Markdown blockquote with `⛔` bold prefix | Corpus uses pure markdown; no HTML block rendering in this docs suite |
| Per-runbook scope boundary prose | 8 different formulations | D-02 one-liner template (see Pattern 3) | 8× prose copies drift and 8× multiply C15 regex surface |

---

## Operational Content: What Each Runbook Must Accurately Describe

This section documents the Apple Business 2026 operational reality each runbook covers, sourced from the v1.6 research corpus. Claims tagged `[ASSUMED]` need live portal verification before publication.

### DELEG-01: `11-vpp-catalog-runbook.md` — VPP Catalog Operations

**Content token model:** One content token per Organizational Unit (OU). Each OU has its own Apps & Books catalog. A content token is valid 365 days; annual renewal required. The token can be downloaded by a user holding "Download content tokens" permission scoped to that OU. [CITED: STACK.md §4, FEATURES.md §3 — sourced from Apple Support `axme0f8659ec`]

**Claim a content token:** Sub-org admin signs in, navigates to Settings > Apps and Books, selects their OU's token, downloads it, then uploads to Intune at `Tenant administration > Connectors and tokens > Apple VPP tokens`. [ASSUMED — portal path may differ slightly in 2026 Apple Business UI; needs live verification]

**Transfer licenses between OUs:** Admin selects Apps and Books > [app] > Transfer > enter quantity + target OU. Up to 24,999 per transfer. **Only unassigned licenses can be transferred.** Assigned licenses must be revoked first (with 30-day grace period observed for managed devices). [CITED: FEATURES.md §3.4 — sourced from Apple Support `axm1242b0715`]

**Buy apps for sub-org:** Content Manager or equivalent navigates Apps and Books > Search > Buy. Selects Device or User licensing, picks OU, enters quantity. Payment charges against the OU's payment method at Settings > Apps and Books > Payment Methods (per-OU budget isolation). [CITED: FEATURES.md §3.5 — sourced from Apple Support `axmc21817890`]

**OP-9 untouched-OU trap — the exact hard-bordered callout `11-` must realize:**
Apple's official documentation states: "When you create a location in an untouched state, it allows Apple to transfer all licenses, including licenses currently in use from a legacy token, but as soon as anything is done on this location, only unused licenses are transferred." [CITED: PITFALLS.md OP-9 — sourced from Apple official "Migrate content tokens" guide, HIGH confidence]

The hard-bordered callout must include:
- Trigger: DO NOT perform any action in the new OU before completing the full legacy-token migration.
- Forbidden actions: purchase any app, assign any license, edit any metadata in the new OU.
- Pre-migration checklist: all Content Managers invited and accepted; OU is empty (no licenses, no people, no devices).
- Post-migration verification: compare license counts between legacy token and new OU — must match within 0.1% (DELEG-01 requirement).

**Intune label note:** Intune still labels these "Apple VPP tokens" (not "content tokens"). The runbook must include a disambiguation callout: "Apple calls this a 'content token'; Microsoft Intune calls it an 'Apple VPP token'. Same artifact, different label." [CITED: STACK.md §6.1 — HIGH confidence, verified against Microsoft Learn tutorial 2026-04-30]

### DELEG-02: `12-shared-ipad-passcode-reset.md` — 3-Path Decision Matrix

**What the Apple Business UI path (Path A) does:** Resets the user's Managed Apple Account passcode for Shared iPad. Admin navigates: Users sidebar > search for user > More menu > Lock > Reset Shared iPad Passcode. Generates a new 8-character alphanumeric passcode (Apple-enforced minimum). Delivery options: Download as 1-up PDF or Download as CSV. [CITED: FEATURES.md §4.1 — sourced from Apple Support `axm61439a814`]

**Required privilege for Path A:** "Reset Shared iPad Passcode" — in the People permission group. Per-OU scoped. Holdable by Administrator, People Manager, or custom role with this permission. This is an L1-delegatable privilege. [CITED: STACK.md §2.4, FEATURES.md §1.2]

**Federated-auth caveat:** Resetting the Shared iPad passcode in Apple Business does NOT change the user's federated Entra password. The Shared iPad passcode is a separate device-side credential. [CITED: FEATURES.md §4.1]

**Path B anti-feature (MDM ClearPasscode / MDM Reset Passcode):** Intune exposes "Reset Passcode" and "Remove Passcode" remote actions. On a Shared iPad, BOTH affect the DEVICE-LEVEL passcode (rarely set on managed Shared iPad), NOT the per-user Shared iPad partition passcode. Per-user Shared iPad partition passcode can ONLY be reset via Path A or factory wipe. This is the highest-stakes anti-feature in v1.6. [CITED: FEATURES.md §4.2 — sourced from Microsoft Q&A `learn.microsoft.com/answers/1192129` and Microsoft Learn Shared iPad page]

**Path B correct use:** MDM ClearPasscode IS useful for clearing the device-level screen lock on a non-Shared-iPad supervised device. Requires Intune RBAC (not Apple Business permission). [ASSUMED — needs live verification that Intune still exposes this action in 2026]

**Path C (MDM EraseDevice):** Destructive factory reset. Destroys all Shared iPad user partitions. Last-resort path. Requires Intune RBAC and explicit L2 approval (the only D-04 path that gets the L2-approval gate). [CITED: PITFALLS.md OP-11 — HIGH confidence]

**Path ordering (locked):** Path A FIRST → Path B → Path C LAST. [CITED: 64-CONTEXT.md D-04, CONTEXT.md DELEG-02]

**C16 status:** `12-` is exempted from carrying the `34-` back-link in Phase 64 (`v1.6-audit-allowlist.json` entry, `sunset_phase: "64-65"`). Phase 65 removes the exemption and installs the bidirectional link. The runbook must be authored knowing this back-link will be added by Phase 65.

**Path B line in `12-` will trigger C15 regex 1 (`Intune RBAC`) or regex 4:** The phrase "requires Intune RBAC" or similar is required by DELEG-02 to describe Path B. This needs an ABAUDIT exemption comment (one per banned line).

### DELEG-03: `13-device-release-runbook.md` — Release ≠ Removal

**What "release" does:** Admin navigates Devices sidebar > select device(s) > Release Devices > confirm. Apple sends a release notification to the MDM server (Intune). The device-to-MDM-server binding is deleted. **Existing supervision and MDM enrollment are NOT immediately broken** — device continues as managed until next factory reset. After factory reset, device becomes civilian. [CITED: FEATURES.md §5.1 — sourced from Apple Support `axmf500c0851`]

**What "release" does NOT do:** Does NOT remove the device from Apple's DEP backend. Resellers continue to push device serials to Apple Business per commercial agreement. A released device can re-appear in Apple Business if the reseller re-pushes it. If re-appeared and a default enrollment profile is set, the device will attempt MDM enrollment at next factory reset. [CITED: PITFALLS.md OP-6 — HIGH confidence]

**30-day provisional period:** When a device is re-added to Apple Business via Apple Configurator (not the release path itself, but re-add path), the end-user has 30 days to remove the device from MDM unilaterally. This is relevant when an admin releases then re-adds via Configurator. [CITED: FEATURES.md §5.1, STACK.md §3.4]

**OP-6 pre-release checklist (3 blocking conditions):**
1. Active shared iPad session ongoing on device — resolve first.
2. DEP profile assignment still active — admin must understand device will re-enroll if profile is set.
3. Another admin's MDM scope covers this device — coordinate before release.

**Hard callout (D-04 Refined-C):** Hard-bordered callout, body = "release ≠ removal + 30-day provisional" warning. NO L2-approval gate.

### DELEG-04: `14-device-transfer-runbook.md` — Cross-OU Transfer

**What cross-OU transfer does:** Admin navigates Devices > select device(s) > Edit Location (Apple Business UI label) or Reassign to OU > confirm. No approval workflow within Apple Business — single admin click. [CITED: FEATURES.md §5.2 — sourced from Apple Support `axmf500c0851`]

**4-cell impact matrix (OP-5):**

| Impact Category | Survives OU Transfer? | Notes |
|----------------|----------------------|-------|
| VPP device-licensed apps | **BREAKS** — stops working | License tied to source OU's content token; must be explicitly revoked and re-assigned from target OU's catalog |
| Enrollment profile | **Does NOT follow** the device | On next factory reset, device gets target OU's enrollment profile (may differ in supervision flags, app pre-load, restrictions) |
| Intune config profiles | **Survives** (Intune is assignment authority, not Apple Business) | Creates mixed-state device: Intune-managed config A + target-OU enrollment profile |
| Audit entry | **Logged** — "Device Location changed" with admin, serial, timestamp, source + target OU | Source-OU admin and tenant admin can see it; target-OU admin may NOT see the action if they have only target-OU scope (author-scope semantics — see OP-14) |

[CITED: PITFALLS.md OP-5 — HIGH confidence for VPP and enrollment profile; MEDIUM for Intune profile survival; FEATURES.md §5.2]

**Pre-transfer dependency checklist:** Before transferring, admin must: identify cross-OU license dependencies; revoke source-OU VPP licenses (observed 30-day grace period); re-assign from target-OU catalog; confirm enrollment profile compatibility; notify the device user. [CITED: PITFALLS.md OP-5]

**Hard callout (D-04 Refined-C):** Hard-bordered callout, body = OP-5 impact matrix + pre-transfer checklist. NO L2-approval gate.

**`10-apple-tv-lifecycle.md` cross-link:** Apple TV transfer between OUs follows same mechanics. Wave-B cross-link target.

### DELEG-05: `15-mdm-server-reassign-runbook.md` — SINGLE Runbook, 2 Sub-H2s

**Why SINGLE:** CI-5 anti-proliferation invariant and SC#3. FEATURES Workflow 5.3 identified two sub-paths; DELEG-05 consolidates them into one file. [CITED: 64-CONTEXT.md DELEG-05, REQUIREMENTS.md DELEG-05]

**Sub-H2 A — Legacy Reassign (iOS 18 / iPadOS 18 / macOS 15 and earlier):**
Admin navigates Devices > select devices > Edit MDM Server > select new MDM server > confirm. Changes next-factory-reset routing only. Device continues talking to OLD MDM server until factory wiped. Required device-side action: factory wipe + re-run Setup Assistant. Use case: greenfield rollouts, device refresh cycles. [CITED: FEATURES.md §5.3.1 — sourced from Apple Deployment Guide `dep4acb2aa44`]

**Sub-H2 B — OS-26+ In-Place Migration (NO ERASE):**
Eligibility: devices running iOS 26 / iPadOS 26 / macOS 26 / tvOS 26 or later. Admin navigates Devices > select devices > Edit MDM Server + sets enrollment deadline. Device receives notification of pending migration. User experiences guided migration: unenrolls from old MDM (preserves user data + declarative managed apps) → enrolls in new MDM (redeploys configs + managed apps). Escalating notifications; if deadline passes, mandatory restart (iOS/iPadOS) or full-screen prompt (macOS) enforces migration. [CITED: FEATURES.md §5.3.2 — sourced from Apple Deployment Guide `dep4acb2aa44`]

**What is preserved in OS-26+ migration:** All user data; declarative managed app data; managed apps re-pushed by new MDM.
**What is NOT preserved:** MDM-installed configs, restrictions, VPN profiles, Wi-Fi profiles — new MDM must redeploy.
**VPP token implication:** New MDM server must have a valid content token uploaded; VPP-purchased apps require new content-token-upload within 30 days of migration start. [CITED: FEATURES.md §5.3.2]

**OS-version eligibility matrix for `15-`:**

| OS | Version threshold | Path |
|----|------------------|------|
| iOS | 26+ | In-place migration (Sub-H2 B) |
| iPadOS | 26+ | In-place migration (Sub-H2 B) |
| macOS | 26+ | In-place migration (Sub-H2 B) |
| tvOS | 26+ | In-place migration (Sub-H2 B) |
| iOS/iPadOS | ≤ 25 (iOS 18 and earlier) | Factory erase required (Sub-H2 A) |
| macOS | ≤ 25 (macOS 15 and earlier) | Factory erase required (Sub-H2 A) |
| tvOS | ≤ 25 | Factory erase required (Sub-H2 A) |

[CITED: FEATURES.md §5.3.1-5.3.2 — sourced from Apple Deployment Guide `dep4acb2aa44`]

**Mixed-OS fleet note:** Mixed fleets must split into two waves — OS 26+ devices via Sub-H2 B; legacy devices via Sub-H2 A.

**platform frontmatter for `15-`:** `ios+ipados+macos+tvos` (all 4 Apple device classes). [CITED: 64-CONTEXT.md code_context]

### DELEG-06: `16-managed-apple-account-runbook.md` — Manual + SCIM + OIDC+JIT

**Path A — Manual account creation:** People Manager navigates Users > Add (+) > Add Account. Enters first/middle/last name, Managed Apple Account (must be globally unique in Apple's namespace), Location/OU, role. Generates one-time password or verification code. Use case: small orgs, test/break-glass accounts, contractors. [CITED: FEATURES.md §6.1 — sourced from Apple Support `axm402206497`]

**Path B — SCIM provisioning from Microsoft Entra ID:** Admin sets up Entra Enterprise App "Apple Business Manager" gallery app. Configures SCIM endpoint (`https://federation.apple.com/feeds/business/scim`) and tenant URL. Generates SCIM token in Apple Business > pastes into Entra. Maps attributes (UPN → Managed Apple Account). Assigns Entra groups to sync scope. Start provisioning. [CITED: STACK.md §5.3, FEATURES.md §6.2 — sourced from Apple Support `axm526a05814`]

**SCIM token renewal cadence:** SCIM token valid 1 year. Apple sends renewal notice 60 days before expiry. Failure to renew = sync stops; new accounts don't appear. Token transfer window: 4 calendar days to complete handoff after token generation. [CITED: STACK.md §5.3 — HIGH confidence]

**Path C — OIDC + JIT (Just-In-Time Provisioning):** Admin navigates Account > Preferences > Federated Authentication > Microsoft Entra ID > OIDC. OIDC supports JIT: when user signs in with Entra account for first time on Apple device, Managed Apple Account is auto-created if none exists. Requires scopes `ssf.manage` and `ssf.read` in Entra. [CITED: FEATURES.md §6.3 — sourced from Apple Support `axm8c1cac980`]

**SCIM vs OIDC decision criteria:**

| Criterion | SCIM (Path B) | OIDC + JIT (Path C) |
|-----------|---------------|---------------------|
| Shared iPad pre-staging | Required (must pre-stage accounts for passcode reset Path A) | Insufficient (account doesn't exist until user signs in) |
| Token renewal burden | Annual | None (OIDC tokens managed by Entra) |
| Best for | Shared iPad fleets, account-driven User Enrollment with pre-known users | macOS/iOS supervised single-user fleets, ad-hoc user adds |

[CITED: FEATURES.md §6.3]

**OP-7 — 60-day federation collision sub-section:**
When org federates Entra to Apple Business, users with an existing personal Apple ID at the corp email domain get flagged. Apple notifies the user via email with a 60-day window to rename their personal Apple ID. If unresolved within 60 days, Apple forces the rename or blocks federation. The notification often lands in personal mailbox and is missed. [CITED: PITFALLS.md OP-7 — HIGH confidence]

Sub-section content must include:
- Pre-federation preflight: federation rollout pre-flight check shows count of "conflicting Apple IDs" in Apple Business federation banner.
- User-comms template (60-day window notice to affected users).
- Resolution path: user renames personal Apple ID at appleid.apple.com OR admin force-federates.
- Recovery if 60-day window missed: [ASSUMED — Apple Enterprise Support ticket; needs live verification].

**SCIM-manual-roaming conflict:** If a user account was created via SCIM from Entra, manual OU reassignment may be overwritten on next SCIM sync if the SCIM mapping enforces a specific OU. Document as anti-pattern callout. [CITED: FEATURES.md §6.5]

**`08-managed-apple-account-provisioning.md` relationship:** `08-` is the admin-setup counterpart (covers how to set up federation); `16-` is the operational runbook (covers day-to-day account management). `08-` forward-links to `16-`. `16-` may back-reference `08-` for setup prerequisites.

### DELEG-07: `17-audit-log-scoping-runbook.md` — Audit Access + Anti-Feature

**Activity log access path:** Admin navigates: Activity sidebar. Filter by Category, Event name, Activity status, Date range. Download Logs button exports filtered log set. [CITED: FEATURES.md §7.1 — sourced from Apple Support `axmf7d043c03`]

**Required privilege:** "Read log files" — in the Logs / Activity permission group. Delegatable via custom role. [CITED: FEATURES.md §1.2]

**Author-scope vs target-scope semantics (OP-14):**
Audit log entries are scoped to the AUTHOR's OU, not the TARGET resource's OU. Example: Sub-org admin for OU-A transfers a device to OU-B. Audit entry exists. Who sees it?
- Sub-org admin for OU-A (author): sees the action they performed.
- Sub-org admin for OU-B (target): may NOT see the inbound device because the action was authored in OU-A's scope.
- Central tenant admin (tenant-wide scope): sees both.
Result: OU-B admin discovers a "ghost device" — traceable only via tenant-wide log query. [CITED: PITFALLS.md OP-14 — MEDIUM confidence; Apple does not single-source document this matrix]

**Author-scope vs target-scope sub-section** is a required H2 (DELEG-07 requirement).

**SIEM export pattern (OP-13):**
Apple Business does NOT publish a definitive retention period for audit logs. Community reports suggest <1 year (MEDIUM confidence). SOX/compliance frameworks typically require 7-year retention. Recommended: configure periodic export to external SIEM / log archive at least monthly. [CITED: PITFALLS.md OP-13 — MEDIUM confidence for retention SLA; HIGH confidence for "no published SLA" claim per FEATURES.md §7.5]

Export mechanism: Download Logs button on Activity page exports filtered log set as a text/log file. CSV is available for device-assignment-specific events. [CITED: FEATURES.md §7.4]

**"No public REST API" anti-feature documentation (DELEG-07):**
Apple Business does NOT provide a public REST API for activity log export. Audit log access is UI-only. [CITED: FEATURES.md §7.6 — HIGH confidence, directly stated in Apple Support documentation]

This runbook documents this as an explicit anti-feature with a recommendation to file requests via Apple Feedback Assistant. Admins asking for automation should be redirected here.

**Note on "no public REST API" claim:** The runbook must distinguish the Apple Business Device API (a separate, newer surface for device management operations via the Device API Manager preset role) from the audit log surface. The Device API does not expose audit logs. [CITED: STACK.md §9.3]

### DELEG-08: `18-cross-org-boundary-cheat-sheet.md` — Disambiguation Table

**Purpose:** Single-source disambiguation table clarifying which capabilities belong to Apple Business, which to Intune, and which to their integration layer. Receives forward links from `11-`–`17-` (D-02 pattern). Does NOT carry the envelope scope-boundary callout (it IS the SOT) but does carry the full envelope (frontmatter + Platform applicability + Training-data notice + Verification section).

**Content:** Table with columns: Capability | Apple Business owns | Intune owns | Integration layer. Rows covering at minimum: VPP catalog management, Shared iPad passcode reset, Device release, Cross-OU device transfer, MDM server reassignment, Managed Apple Account provisioning, Audit log access, Content token download, Enrollment profile assignment (Intune-side, out of Apple Business scope).

**C15 ABAUDIT exemptions:** This file will contain the highest concentration of ABAUDIT exemptions in Phase 64 because the disambiguation table necessarily references both Apple Business permissions AND Intune RBAC in the same rows. Each row that contains a C15-triggering phrase needs its own ABAUDIT comment on the preceding line.

**C15 exemption planning:** The disambiguation table is the `18-` deliverable described in REQUIREMENTS.md AUDIT-11: "allowlist exemptions live in `18-cross-org-boundary-cheat-sheet.md` HTML comments." This is the canonical host for C15 allowlist content. ABAUDIT numbering must be tracked sequentially across all runbooks; Phase 64 planner should allocate ABAUDIT-05 through ABAUDIT-NN in Wave 1.

---

## Common Pitfalls

### Pitfall 1: ABAUDIT comment exempts WRONG number of lines

**What goes wrong:** Author writes one ABAUDIT comment expecting it to exempt a 3-line table row in `18-`, but the C15 harness only skips line i and line i+1 (two lines: the comment itself and the next line).

**Why it happens:** The exemption is "line-pair-scoped" per `v1.6-milestone-audit.mjs:733-739`. The comment line is i; the only exempted content line is i+1. Multi-line content needs one ABAUDIT comment per banned line.

**How to avoid:** In `18-` disambiguation table, every row that triggers C15 needs `<!-- ABAUDIT-NN: ... -->` on the line immediately before the table row line that contains the banned phrase. If a single table row spans multiple markdown lines, each line needs its own comment.

**Warning sign:** `v1.6-milestone-audit.mjs` C15 check reports a violation in `18-` even though an ABAUDIT comment exists in the file.

---

### Pitfall 2: `12-` carries a back-link to `34-` in Phase 64

**What goes wrong:** Author adds a cross-link from `12-shared-ipad-passcode-reset.md` to `docs/l1-runbooks/34-apple-business-shared-ipad-passcode-reset.md` (which doesn't exist yet).

**Why it happens:** The C16 edge `admin_12 ↔ l1_34` is the end-state; the author anticipates it. But `34-` is a Phase 65 deliverable. Adding the link in Phase 64 would create a broken outbound link in `12-` and could mislead the C16 harness check.

**How to avoid:** The `v1.6-audit-allowlist.json` entry for `12-` has `sunset_phase: "64-65"` — the exemption covers Phase 64. Phase 65 removes the exemption AND installs the back-link. Phase 64 author must leave `12-` without any `34-` reference.

**Warning sign:** `12-` contains the string `34-apple-business` in Phase 64 deliverable.

---

### Pitfall 3: Hard-bordered callout string defined differently across runbooks

**What goes wrong:** `11-` uses `> **⛔ DO NOT TOUCH` and `13-` uses `> **WARNING:` — two different callout opening strings. `check-phase-64.mjs` can only assert one exact string per file, creating validator inconsistency.

**Why it happens:** Each runbook is authored as an independent task; without an agreed callout string defined in Wave 1, authors independently choose formats.

**How to avoid:** Wave 1 task defines the exact hard-bordered callout opening string (e.g., `> **⛔`) and documents it in the Wave 1 plan artifact. All Wave 2 runbook tasks reference this definition. `check-phase-64.mjs` asserts this exact string in `11-` (OP-9) and `12-` (OP-11).

---

### Pitfall 4: L2-approval gate applied to `13-` or `14-`

**What goes wrong:** Author sees `12-` Path C has "L2 approval required" callout and copies it to `13-` (release) or `14-` (transfer) because those actions also feel destructive.

**Why it happens:** D-04 Refined-C is a nuanced decision (uniform HARD callout, but gate clause ONLY on `12-` Path C). Without explicit attention to the gate clause restriction, authors default to copying the most prominent callout element.

**How to avoid:** D-04 is locked. `13-` and `14-` get hard callouts with HIGH-severity warnings (OP-6 / OP-5) but without the L2-approval gate clause. The planner must flag this in each runbook task specification.

---

### Pitfall 5: `15-` split into two separate files

**What goes wrong:** Planner creates two tasks, one for legacy reassign and one for OS-26+ in-place migration, each producing a separate `.md` file.

**Why it happens:** FEATURES Workflow 5.3 documents them as two sub-paths (5.3.1 and 5.3.2); a planner reading only FEATURES could infer two files.

**How to avoid:** REQUIREMENTS.md DELEG-05 and CONTEXT.md explicitly say "SINGLE runbook" and "CI-5 anti-proliferation: exactly 1, not 2." SC#3 also states "exactly 1 MDM Reassign runbook ships." The planner task must produce ONE file `15-mdm-server-reassign-runbook.md` with two sub-H2 sections.

---

### Pitfall 6: ABAUDIT numbering gaps or conflicts with shipped files

**What goes wrong:** Phase 64 starts ABAUDIT numbering from ABAUDIT-01 (restart) rather than continuing from ABAUDIT-04 (the last number used in `06-mdm-server-assignment.md`).

**Why it happens:** The ABAUDIT convention is corpus-wide sequential, not per-file. Without checking the last-used number, a new phase restarts from 01.

**How to avoid:** The last ABAUDIT number used in the shipped corpus is ABAUDIT-04 (in `06-mdm-server-assignment.md`, verified by corpus grep). Phase 64 continues from ABAUDIT-05. Wave 1 task allocates the full range needed (estimate: ABAUDIT-05 through ABAUDIT-15 or higher depending on `18-` table density).

---

### Pitfall 7: Training-data notice omitted or wrong date

**What goes wrong:** A runbook is authored without the `> **Training-data notice:**` block, or the block uses the wrong `last_verified` date, causing the C15/C16 harness to potentially fail on missing envelope elements and the 60-day rule to be unenforceable.

**Why it happens:** The training-data notice block is part of the D-01 enforced envelope but is not always in scope for check-phase-64 assertions. Authors focusing on body content may skip it.

**How to avoid:** All 8 runbooks are new Phase 64 docs; `last_verified` should be the Phase 64 execution date (approximately 2026-05-22). `review_by` = 60 days later (approximately 2026-07-21). These values should be pre-filled in the Wave 1 envelope template. `check-phase-64.mjs` should assert the presence of `last_verified:` in frontmatter for all 8 files.

---

## Code Examples

### Envelope Template for Phase 64 Runbooks

```markdown
---
last_verified: 2026-05-22
review_by: 2026-07-21
applies_to: apple-business
audience: admin
platform: [see per-runbook values below]
---

> **Platform applicability:** [one-sentence scope statement; states Apple Business side only].
> For a full Apple-Business-vs-Intune responsibility table, see
> [18-cross-org-boundary-cheat-sheet.md](18-cross-org-boundary-cheat-sheet.md).

> **Training-data notice:** [Action] UI labels and step sequences in this document are authored
> from AI training knowledge of Apple Business portal behavior as of the pre-2026-04-14
> rebrand, cross-referenced against [relevant research sources]. Steps are marked
> `[CITED: training; needs live verification]` pending a live portal scrape.
> Re-verification target: within 60 days of 2026-05-22 (by 2026-07-21).

# [Runbook Title]

## Required Role & Permission

[Standardized block per D-03. Cite 01-role-permission-model.md always. Cite 04-custom-role-authoring.md only if action's permission maps to the Sub-Org Admin bundle.]

## [Body H2 content — flexible per runbook]

## Verification

[Post-action steps to confirm the action succeeded.]
```

**Per-runbook `platform:` values (compound frontmatter, `+` separator, no spaces):**

| File | platform value |
|------|---------------|
| `11-vpp-catalog-runbook.md` | `ios+ipados+macos+tvos` |
| `12-shared-ipad-passcode-reset.md` | `ios+macos+shared-ipad` |
| `13-device-release-runbook.md` | `ios+ipados+macos+tvos` |
| `14-device-transfer-runbook.md` | `ios+ipados+macos+tvos` |
| `15-mdm-server-reassign-runbook.md` | `ios+ipados+macos+tvos` |
| `16-managed-apple-account-runbook.md` | `ios+macos` |
| `17-audit-log-scoping-runbook.md` | `ios+ipados+macos+tvos` |
| `18-cross-org-boundary-cheat-sheet.md` | `ios+ipados+macos+tvos` |

[CITED: 64-CONTEXT.md code_context; STACK.md §12 cross-platform applicability matrix]

### Hard-Bordered Callout Example (OP-9 realization for `11-`)

```markdown
> **⛔ Untouched-OU — DO NOT ACT until migration completes (OP-9)**
>
> Apple transfers ALL licenses (including in-use) only while the destination OU is
> **untouched**. As soon as any action is performed in the new OU (purchase, assign,
> edit metadata), Apple's migration tool switches to transferring ONLY unassigned licenses.
> In-use licenses remain locked to the source OU's legacy token permanently.
>
> **Forbidden actions during migration:** purchase any app; assign any license; edit
> metadata; grant any role in the new OU.
>
> **Pre-migration gate (all must be TRUE):**
> - [ ] New OU has zero licenses, zero people, zero devices
> - [ ] All Content Managers have selected the new OU
> - [ ] All VPP purchasers invited and accepted
>
> Source: PITFALLS.md OP-9 — Apple official "Migrate content tokens" guide
```

### Hard-Bordered Callout Example (OP-11 realization for `12-` Path C)

```markdown
> **⛔ MDM EraseDevice — DESTRUCTIVE / L2 approval required (OP-11)**
>
> `EraseDevice` wipes the device and destroys ALL Shared iPad user partitions and
> their cached data. There is no recovery path for user session data once this command
> executes. This path is irreversible.
>
> **⚠️ L2 approval required before proceeding.**
>
> Only use Path C when:
> - Path A (Apple Business UI) is unavailable AND
> - Path B (MDM ClearPasscode) has been attempted and failed AND
> - Data loss on all Shared iPad user partitions has been explicitly accepted by the
>   device owner and an L2 admin has approved the action.
>
> Source: PITFALLS.md OP-11 — Apple MDM Protocol reference; ROADMAP.md SC#1
```

---

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | Node.js ESM (`check-phase-64.mjs`) — Path-A copy from `check-phase-63.mjs` |
| Config file | None — standalone script, inherits from harness structure |
| Quick run command | `node scripts/validation/check-phase-64.mjs` |
| Full suite command | `node scripts/validation/v1.6-milestone-audit.mjs && node scripts/validation/check-phase-64.mjs` |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| DELEG-01 | `11-vpp-catalog-runbook.md` exists | structural | `node check-phase-64.mjs` | ❌ Wave 1 |
| DELEG-01 | `11-` contains OP-9 hard-bordered callout exact string | structural exact-string | `node check-phase-64.mjs` | ❌ Wave 1 |
| DELEG-02 | `12-shared-ipad-passcode-reset.md` exists | structural | `node check-phase-64.mjs` | ❌ Wave 1 |
| DELEG-02 | `12-` Path A appears before Path B before Path C | structural section-order | `node check-phase-64.mjs` | ❌ Wave 1 |
| DELEG-02 | `12-` contains OP-11 hard-bordered callout exact string | structural exact-string | `node check-phase-64.mjs` | ❌ Wave 1 |
| DELEG-02 | `12-` does NOT contain `34-apple-business` reference (C16 Phase 65 gate) | negative structural | `node check-phase-64.mjs` | ❌ Wave 1 |
| DELEG-03 | `13-device-release-runbook.md` exists | structural | `node check-phase-64.mjs` | ❌ Wave 1 |
| DELEG-04 | `14-device-transfer-runbook.md` exists | structural | `node check-phase-64.mjs` | ❌ Wave 1 |
| DELEG-05 | `15-mdm-server-reassign-runbook.md` exists | structural | `node check-phase-64.mjs` | ❌ Wave 1 |
| DELEG-05 | `15-` contains EXACTLY ONE file (no `15b-` or similar) | anti-proliferation | `node check-phase-64.mjs` | ❌ Wave 1 |
| DELEG-06 | `16-managed-apple-account-runbook.md` exists | structural | `node check-phase-64.mjs` | ❌ Wave 1 |
| DELEG-07 | `17-audit-log-scoping-runbook.md` exists | structural | `node check-phase-64.mjs` | ❌ Wave 1 |
| DELEG-08 | `18-cross-org-boundary-cheat-sheet.md` exists | structural | `node check-phase-64.mjs` | ❌ Wave 1 |
| All 8 | Frontmatter contains `last_verified:` | structural | `node check-phase-64.mjs` | ❌ Wave 1 |
| All 8 | Frontmatter contains `platform:` | structural | `node check-phase-64.mjs` | ❌ Wave 1 |
| All 8 | Contains `## Required Role & Permission` H2 | structural section-slice | `node check-phase-64.mjs` | ❌ Wave 1 |
| All 8 | Contains `## Verification` H2 | structural section-slice | `node check-phase-64.mjs` | ❌ Wave 1 |
| All 8 | C15 banned-phrase guard passes | corpus-integrity | `node v1.6-milestone-audit.mjs` | Harness active |
| DELEG-02 | C16 `admin_12` exemption active + correct sunset_phase | corpus-integrity | `node v1.6-milestone-audit.mjs` | Harness active |

### Sampling Rate

- Per task commit: `node scripts/validation/check-phase-64.mjs`
- Per wave merge: `node scripts/validation/v1.6-milestone-audit.mjs && node scripts/validation/check-phase-64.mjs`
- Phase gate: Full suite green before `/gsd:verify-work`

### Wave 0 Gaps

- [ ] `scripts/validation/check-phase-64.mjs` — Path-A copy from check-phase-63.mjs; extend with DELEG-01..08 assertions (Wave 1, Plan 64-01)

*(The harness itself `v1.6-milestone-audit.mjs` already exists and is active since Phase 62.)*

---

## Security Domain

No new authentication, authorization, secrets, or data at rest are introduced by this phase. All deliverables are markdown documentation files committed to git.

**ASVS not applicable:** Documentation-only phase with no executable code, APIs, or user-facing interfaces.

**Security constraint (documentation quality):** The runbooks themselves document security-sensitive operational procedures (device release, MDM reassignment, federation). They must be accurate per the `[ASSUMED]` / `[CITED]` tagging discipline so practitioners do not take incorrect actions.

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | Apple Business portal navigation path for content token download: "Settings > Apps and Books > [OU] > Download" | DELEG-01 | Wrong UI path in runbook; verify against live portal within 60 days |
| A2 | "Reset Shared iPad Passcode" button appears under "More" menu on user profile | DELEG-02 Path A | Wrong UI navigation; verify against live portal |
| A3 | Path B MDM ClearPasscode remote action name and location in Intune 2026 admin center | DELEG-02 Path B | Intune may have renamed or relocated the action; verify against Intune admin center |
| A4 | 60-day federation collision window: Apple forces rename after 60 days if unresolved | DELEG-06 OP-7 | Window duration may differ; verify against Apple Support `axm8c1cac980` |
| A5 | Audit log Activity sidebar filter dimensions (Category, Event, Status, Date range) per FEATURES §7.3 | DELEG-07 | Filter UI may differ; FEATURES rates this MEDIUM confidence |
| A6 | SCIM token transfer window is 4 calendar days | DELEG-06 SCIM renewal | Token window may differ; verify against Apple Support `axm526a05814` |
| A7 | Intune "Remove Passcode" remote action affects device-level passcode NOT per-user Shared iPad partition (Path B anti-feature) | DELEG-02 | If behavior changed in 2026 Intune, the runbook misstates the anti-feature; verify against Microsoft Learn |

---

## Open Questions (RESOLVED)

> All four are resolved by **documentation design decision**, not by needing a definitive
> external answer before planning. Each resolution is encoded in the relevant plan's
> `<action>`/`<acceptance_criteria>`. None is a blocking unknown.

1. **Exact portal navigation path for content token operations in 2026 Apple Business UI**
   - What we know: Pre-rebrand path was `Preferences > Payments and Billing > Apps and Books > Content Tokens`. STACK.md flags this as possibly changed.
   - What's unclear: Whether 2026 Apple Business portal moved this to `Settings > Apps and Books` or kept original path.
   - **RESOLVED:** Tag the path with `[CITED: training; needs live verification]` in `11-` (per Plan 64-02 action); the 60-day `review_by` date creates the audit trail. No fabricated definitive path.

2. **Audit log retention period**
   - What we know: Apple does not publish a definitive retention SLA. Community reports suggest approximately 90 days (LOW confidence per FEATURES §7.5).
   - What's unclear: Whether the retention period changed with the 2026 Apple Business rebrand.
   - **RESOLVED:** `17-` documents "Apple does not publish a definitive retention period" and recommends monthly SIEM export (per Plan 64-04 action). Do NOT state a specific number; flag for per-org live-tenant validation.

3. **SCIM token renewal: does Apple send renewal notice at 60 days before expiry, or at 90 days?**
   - What we know: STACK.md says "60 days before expiry." FEATURES §6.2 cites an HCS Online community source for the 60-day figure.
   - What's unclear: Whether this is 60 or 90 days; Apple's official page `axm526a05814` should be checked.
   - **RESOLVED:** Tag the exact window as `[ASSUMED]` in `16-` and cite `axm526a05814` as the authoritative source for the current value (per Plan 64-04 action).

4. **What ABAUDIT numbers does `18-` need?**
   - What we know: `18-` disambiguation table will have multiple rows referencing both Apple Business and Intune, each requiring an ABAUDIT comment per banned line.
   - What's unclear: Exact number of ABAUDIT comments until `18-` body is authored.
   - **RESOLVED:** Wave 1 (Plan 64-01) reserves the ABAUDIT-05 through ABAUDIT-20 block in `64-CONVENTIONS.md`; specific numbers are allocated as runbooks are authored in Wave 2, tracked in the conventions registry.

---

## Environment Availability

Step 2.6: No external tools beyond the project's existing Node.js installation are required. The validator `check-phase-64.mjs` is a new file this phase creates; it runs on the same Node.js already used by `check-phase-63.mjs`.

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | check-phase-64.mjs | ✓ | (existing — same as check-phase-62/63) | — |
| `v1.6-milestone-audit.mjs` | C15/C16 gate | ✓ | Active since Phase 62 | — |
| `v1.6-audit-allowlist.json` | C16 exemption lookup | ✓ | Active since Phase 62 | — |

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Legacy ABM role triad (5 fixed roles) | Organization Administrator / IT Administrator / Marketing Administrator / Staff + 5 preset custom roles + granular custom role authoring | 2026-04-14 GA | Custom roles now first-class; preset roles are convenience bundles, not the only option |
| "Locations" terminology | "Organizational Units (OUs)" | 2026-04-14 | v1.6 docs use OU; existing v1.0-v1.5 docs retain "Location" per Q5(b) no-corpus-sweep |
| "privileges" | "permissions" | 2026-04-14 | Use "permissions" in v1.6 docs |
| "Managed Apple ID" | "Managed Apple Account" | 2024 (predates Apple Business rebrand) | v1.6 uses new term; Microsoft Intune retains "Managed Apple ID" in some docs |
| MDM server reassign = factory erase required | MDM server reassign = in-place migration available on iOS/iPadOS/macOS/tvOS 26+ | 2026 (OS 26) | Runbook `15-` must document both paths with OS-version gate |
| VPP token per Location (Location token) | Content token per Organizational Unit | 2026-04-14 | Same semantics, renamed; Intune UI still says "Apple VPP tokens" |
| Separate ABM / ABE / ABC platforms | Unified Apple Business platform | 2026-04-14 | v1.6 scope = device-management surface (formerly ABM) only |

**Deprecated / outdated:**
- "Apple Business Manager" (ABM) as primary product name: retired 2026-04-14. Use "Apple Business" in new docs, parenthetical "(formerly Apple Business Manager)" on first mention.
- Profile-based User Enrollment on iOS 18+: deprecated. Not covered in Phase 64 runbooks.
- Apple Business Essentials (ABE) as separate product: retired 2026-04-14. Blueprints surface is in-scope for glossary mention only; not covered in Phase 64 runbooks.

---

## Sources

### Primary (HIGH confidence)

- [VERIFIED: corpus inspection] `.planning/research/FEATURES.md` — Apple Business workflow landscape; Workflows 3, 4, 5, 6, 7 directly feed DELEG-01..07
- [VERIFIED: corpus inspection] `.planning/research/PITFALLS.md` — OP-5, OP-6, OP-7, OP-9, OP-11, OP-13, OP-14 directly feed runbook callout requirements
- [VERIFIED: corpus inspection] `.planning/research/STACK.md` — Apple-side surfaces, Intune-side verbatim labels, URL canon
- [VERIFIED: corpus inspection] `.planning/phases/64-apple-business-delegation-runbooks/64-CONTEXT.md` — locked decisions D-01..D-04
- [VERIFIED: corpus inspection] `scripts/validation/v1.6-milestone-audit.mjs` — C15 regex set, C16 edgeMap, ABAUDIT exemption scoping rule
- [VERIFIED: corpus inspection] `scripts/validation/v1.6-audit-allowlist.json` — C16 exemptions, ABAUDIT-04 last-used number
- [VERIFIED: corpus inspection] `docs/cross-platform/apple-business/06-mdm-server-assignment.md` — envelope template, ABAUDIT-04 example
- [VERIFIED: corpus inspection] `docs/cross-platform/apple-business/09-shared-ipad-lifecycle.md` — hard-bordered callout precedent (OP-12 Critical block)
- [VERIFIED: corpus inspection] `docs/cross-platform/apple-business/07-vpp-content-token-consolidation.md:128-132` — D-02 self-sufficient-callout + forward-pointer precedent
- [VERIFIED: corpus inspection] `scripts/validation/check-phase-63.mjs` — Path-A template for check-phase-64.mjs

### Secondary (MEDIUM confidence)

- [CITED: FEATURES.md §4.2 citing Microsoft Q&A] Intune "Reset Passcode" / "Remove Passcode" affect device-level not Shared iPad partition — Microsoft Learn `learn.microsoft.com/answers/1192129`
- [CITED: FEATURES.md §7.5] Apple audit log retention ~90 days (community-reported; Apple does not publish SLA)
- [CITED: STACK.md §5.3 citing Apple Support `axm526a05814`] SCIM token 60-day renewal notice + 4-day transfer window

### Tertiary (LOW confidence)

- A3-A7 in Assumptions Log above — specific portal navigation paths and exact window durations that require live-portal verification within 60 days

---

## Metadata

**Confidence breakdown:**
- Operational procedures (VPP, passcode reset, release, transfer, MDM reassign): HIGH — sourced from v1.6 FEATURES.md which was verified against Apple Support documentation in May 2026
- Corpus conventions and validator constraints: HIGH — sourced from direct corpus inspection of shipped Phase 62/63 files and active harness
- Specific portal navigation paths in 2026 Apple Business UI: ASSUMED — tagged for live verification within 60-day window
- Audit log retention SLA: LOW — Apple does not publish; FEATURES.md rates this LOW

**Research date:** 2026-05-22
**Valid until:** 2026-07-21 (60-day Apple Business portal verification window)
