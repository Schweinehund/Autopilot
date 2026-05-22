# Phase 64: Apple Business Delegation Runbooks - Pattern Map

**Mapped:** 2026-05-22
**Files analyzed:** 9 (8 runbooks + 1 validator)
**Analogs found:** 9 / 9

---

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|-------------------|------|-----------|----------------|---------------|
| `docs/cross-platform/apple-business/11-vpp-catalog-runbook.md` | runbook | request-response | `06-mdm-server-assignment.md` | exact (same envelope, OP-1 callout model) |
| `docs/cross-platform/apple-business/12-shared-ipad-passcode-reset.md` | runbook | request-response | `09-shared-ipad-lifecycle.md` | exact (same lifecycle domain + hard callout) |
| `docs/cross-platform/apple-business/13-device-release-runbook.md` | runbook | request-response | `06-mdm-server-assignment.md` | role-match (same envelope) |
| `docs/cross-platform/apple-business/14-device-transfer-runbook.md` | runbook | request-response | `06-mdm-server-assignment.md` | role-match (same envelope) |
| `docs/cross-platform/apple-business/15-mdm-server-reassign-runbook.md` | runbook | request-response | `06-mdm-server-assignment.md` | exact (peer admin-setup doc; operational counterpart) |
| `docs/cross-platform/apple-business/16-managed-apple-account-runbook.md` | runbook | request-response | `08-managed-apple-account-provisioning.md` | exact (same domain; `08-` is the admin-setup counterpart) |
| `docs/cross-platform/apple-business/17-audit-log-scoping-runbook.md` | runbook | request-response | `06-mdm-server-assignment.md` | role-match (same envelope) |
| `docs/cross-platform/apple-business/18-cross-org-boundary-cheat-sheet.md` | cheat-sheet | transform | `07-vpp-content-token-consolidation.md` | role-match (same envelope; D-02 SOT destination) |
| `scripts/validation/check-phase-64.mjs` | validator | batch | `scripts/validation/check-phase-63.mjs` | exact (Path-A copy source) |

---

## Pattern Assignments

### All 8 Runbooks — Mandatory Envelope (D-01)

**Analog:** `docs/cross-platform/apple-business/06-mdm-server-assignment.md` lines 1–14

**Exact frontmatter block** (lines 1–7):
```markdown
---
last_verified: 2026-05-21
review_by: 2026-07-20
applies_to: apple-business
audience: admin
platform: ios+macos
---
```

For Phase 64 runbooks replace dates with `last_verified: 2026-05-22` and `review_by: 2026-07-21`. Replace `platform:` per the per-runbook table in RESEARCH.md (no spaces around `+`):

| File | `platform:` value |
|------|-------------------|
| `11-vpp-catalog-runbook.md` | `ios+ipados+macos+tvos` |
| `12-shared-ipad-passcode-reset.md` | `ios+macos+shared-ipad` |
| `13-device-release-runbook.md` | `ios+ipados+macos+tvos` |
| `14-device-transfer-runbook.md` | `ios+ipados+macos+tvos` |
| `15-mdm-server-reassign-runbook.md` | `ios+ipados+macos+tvos` |
| `16-managed-apple-account-runbook.md` | `ios+macos` |
| `17-audit-log-scoping-runbook.md` | `ios+ipados+macos+tvos` |
| `18-cross-org-boundary-cheat-sheet.md` | `ios+ipados+macos+tvos` |

**Platform applicability blockquote pattern** (line 9–14 of `06-`):
```markdown
> **Platform applicability:** This document covers Apple Business per-OU MDM server assignment —
> the Apple-side configuration that determines which MDM server receives newly added devices within
> each Organizational Unit. This is distinct from Intune MDM push-certificate management, which
<!-- ABAUDIT-04: next line distinguishes Apple-side MDM server assignment from Intune MDM push-cert management; C15 regex 4 false-positive exemption (disambiguation clause clarifying distinct surfaces, not conflating Apple and Intune delegation) -->
> is an Intune-side operation outside the Apple Business permission surface. See the
> [Apple Business Governance Glossary](../../_glossary-apple-business.md) for terminology canon.
```

The ABAUDIT comment sits between the blockquote lines; it exempts ONLY the immediately following line (line i+1). The opening sentence is the platform boundary statement. The forward link to `18-` (D-02) replaces the `See the ... Glossary` sentence in runbooks `11-`–`17-`.

**Training-data notice block** (`06-` lines 29–33):
```markdown
> **Training-data notice:** MDM server assignment UI labels and step sequences are authored
> from AI training knowledge of Apple Business portal behavior as of the pre-2026-04-14
> rebrand, cross-referenced against research/PITFALLS.md OP-1. Steps are marked
> `[CITED: training; needs live verification]` pending a live portal scrape.
> Re-verification target: within 60 days of 2026-05-21 (by 2026-07-20).
```

For Phase 64, adapt the research-source citation per runbook and update dates to `2026-05-22` / `2026-07-21`.

**Required sections** (enforce in `check-phase-64.mjs`):
- `## Required Role & Permission` — H2 with standardized block (see D-03 pattern below)
- `## Verification` — H2 with post-action steps

---

### `11-vpp-catalog-runbook.md` (runbook, request-response)

**Analog:** `docs/cross-platform/apple-business/06-mdm-server-assignment.md` (envelope) + `07-vpp-content-token-consolidation.md` (forward-pointer context)

**Inbound forward-refs `11-` must satisfy:**
- `docs/cross-platform/apple-business/02-ous-architecture.md` ~line 104 — forward-refs OP-9 hard-bordered callout in `11-`
- `docs/cross-platform/apple-business/07-vpp-content-token-consolidation.md` lines 117–132 — forward-refs OP-9 hard-bordered callout in `11-`

The exact text in `07-` that `11-` must satisfy (lines 121–126):
```markdown
The Phase 64 VPP catalog consolidation runbook (`11-vpp-catalog-runbook.md`, forthcoming)
carries the OP-9 untouched-OU hard-bordered callout covering cross-OU content-token
migration scenarios. This admin-setup doc does not duplicate that callout — refer to Phase 64
for the operational runbook.
```

**OP-9 hard-bordered callout** — the exact opening string `check-phase-64.mjs` must assert (defined here as the Phase 64 canonical form, Claude's Discretion):
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

The exact opening string `check-phase-64.mjs` asserts: `> **⛔ Untouched-OU — DO NOT ACT`

**D-03 Required Role & Permission block** for `11-` (conditional `04-` cite NOT needed — "Download content tokens" is NOT in the Sub-Org Admin bundle; cite `01-` directly):
```markdown
## Required Role & Permission

**Required permission:** "Download content tokens" (Apps & Books subgroup) — OU-scoped.
See [01-role-permission-model.md](01-role-permission-model.md) Apps & Books subgroup for
full permission catalog and OP-3 companion View dependency ("View content tokens" required).

**OU scope:** Permission is scoped to the sub-org admin's assigned OU. Cross-OU license
transfer requires "Manage content token location" (tenant-wide, **DENY-by-default**).
Contact tenant IT administrator for tenant-wide operations (OP-1 constraint).

> **OP-2:** Do not perform these operations using Account Holder credentials.
> Account Holder is not a delegatable role for routine operations.
```

---

### `12-shared-ipad-passcode-reset.md` (runbook, request-response)

**Analog:** `docs/cross-platform/apple-business/09-shared-ipad-lifecycle.md` (hard callout structure) + `06-mdm-server-assignment.md` (envelope)

**Path ordering** (locked — assert in `check-phase-64.mjs`):
The three Path H2/H3 headings must appear in this order:
1. `### Path A` (or `## Path A`) — Apple Business UI / L1-delegated
2. `### Path B` (or `## Path B`) — MDM ClearPasscode / L2-only
3. `### Path C` (or `## Path C`) — MDM EraseDevice / L2-with-approval

**OP-11 hard-bordered callout** — the exact opening string `check-phase-64.mjs` must assert:
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

The exact opening string `check-phase-64.mjs` asserts: `> **⛔ MDM EraseDevice — DESTRUCTIVE`

**ABAUDIT requirement:** Path B prose will contain "requires Intune RBAC" — this triggers C15 regex 1. Each line containing a C15-banned phrase needs its own ABAUDIT comment on the immediately preceding line.

**C16 status:** `12-` must NOT contain the string `34-apple-business` in Phase 64. The `v1.6-audit-allowlist.json` entry at line 82 exempts `12-` with `"sunset_phase": "64-65"`. `check-phase-64.mjs` must assert the ABSENCE of `34-apple-business` in `12-`.

**`check-phase-64.mjs` V-64-style negative assert:**
```javascript
// V-64-NN: 12- does NOT contain 34-apple-business reference (C16 Phase 65 gate)
const has34 = c.includes('34-apple-business');
if (has34) return { pass: false, detail: '12- contains 34-apple-business reference (C16 sunset Phase 65; must not appear in Phase 64)' };
```

---

### `13-device-release-runbook.md` (runbook, request-response)

**Analog:** `docs/cross-platform/apple-business/06-mdm-server-assignment.md` (envelope)

**OP-6 hard-bordered callout** (D-04 Refined-C — hard callout, NO L2-approval gate):
```markdown
> **⛔ Device Release — "release ≠ removal" (OP-6)**
>
> Releasing a device from Apple Business does NOT remove it from Apple's DEP backend.
> The device-to-MDM-server binding is deleted; however, existing MDM supervision and
> enrollment are NOT immediately broken — the device continues as managed until the next
> factory reset. After factory reset, the device becomes civilian.
>
> Resellers continue to push device serials to Apple Business per commercial agreement.
> A released device can re-appear in Apple Business if the reseller re-pushes it.
> If re-appeared and a default enrollment profile is set, the device will attempt MDM
> enrollment at next factory reset.
>
> **Pre-release checklist (all must be resolved):**
> - [ ] No active Shared iPad session ongoing on device
> - [ ] Admin understands device will re-enroll if DEP profile remains set
> - [ ] No other admin's MDM scope covers this device (coordinate first)
>
> Source: PITFALLS.md OP-6
```

The opening string: `> **⛔ Device Release — "release ≠ removal"`

---

### `14-device-transfer-runbook.md` (runbook, request-response)

**Analog:** `docs/cross-platform/apple-business/06-mdm-server-assignment.md` (envelope)

**Wave-B cross-link:** `docs/cross-platform/apple-business/10-apple-tv-lifecycle.md` — Apple TV transfers follow same mechanics; cross-link target.

**OP-5 hard-bordered callout** (D-04 Refined-C — hard callout, NO L2-approval gate):
```markdown
> **⛔ Cross-OU Transfer — 4-cell impact matrix (OP-5)**
>
> OU transfer has HIGH-severity downstream effects. VPP device-licensed apps **STOP WORKING**
> immediately after transfer; licenses are tied to the source OU's content token and must be
> explicitly revoked and re-assigned from the target OU's catalog.
>
> | Impact Category | Survives OU Transfer? |
> |----------------|----------------------|
> | VPP device-licensed apps | **BREAKS** — stops working |
> | Enrollment profile | **Does NOT follow** device |
> | Intune config profiles | **Survives** (Intune is assignment authority) |
> | Audit entry | **Logged** — author-scope semantics (OP-14) |
>
> **Pre-transfer dependency checklist:**
> - [ ] Identified all VPP license dependencies in source OU
> - [ ] VPP licenses revoked (30-day grace observed for managed devices)
> - [ ] Target OU catalog has replacement licenses available
> - [ ] Enrollment profile compatibility confirmed with target OU
> - [ ] Device user notified
>
> Source: PITFALLS.md OP-5
```

The opening string: `> **⛔ Cross-OU Transfer — 4-cell impact matrix`

---

### `15-mdm-server-reassign-runbook.md` (runbook, request-response)

**Analog:** `docs/cross-platform/apple-business/06-mdm-server-assignment.md` (envelope + forward-ref at line 97)

**Anti-proliferation invariant:** Exactly ONE file. The forward-ref in `06-` lines 97–100 names `15-mdm-server-reassign-runbook.md` — no `15b-` file may exist. `check-phase-64.mjs` V-64 assertion: assert ONLY `15-mdm-server-reassign-runbook.md` exists (no file matching `15b-` or `15-mdm-server-reassign-2`).

**Body structure** (2 sub-H2s):
```markdown
## Sub-H2 A: Legacy Reassignment (iOS/iPadOS ≤ 25 / macOS ≤ 15 / tvOS ≤ 25)
[procedure — requires factory erase + re-run Setup Assistant]

## Sub-H2 B: In-Place Migration (iOS/iPadOS/macOS/tvOS 26+)
[procedure — in-place, no erase, user data preserved]
```

The OS eligibility matrix that must appear in the body (RESEARCH.md table, lines 370–382):

| OS | Version threshold | Path |
|----|------------------|------|
| iOS | 26+ | In-place (Sub-H2 B) |
| iPadOS | 26+ | In-place (Sub-H2 B) |
| macOS | 26+ | In-place (Sub-H2 B) |
| tvOS | 26+ | In-place (Sub-H2 B) |
| iOS/iPadOS | ≤ 25 | Factory erase required (Sub-H2 A) |
| macOS | ≤ 25 | Factory erase required (Sub-H2 A) |
| tvOS | ≤ 25 | Factory erase required (Sub-H2 A) |

---

### `16-managed-apple-account-runbook.md` (runbook, request-response)

**Analog:** `docs/cross-platform/apple-business/08-managed-apple-account-provisioning.md`

**`08-` is the admin-setup counterpart.** `08-` forward-links to `16-`; `16-` back-references `08-` for setup prerequisites. The `08-` envelope (lines 1–34) is the direct model for `16-`'s envelope. `08-` covers which provisioning method to choose (decision matrix); `16-` covers the day-to-day operational procedure for each path.

**`platform: ios+macos`** — same as `08-` (line 6). Unlike `11-/13-/14-/15-`, this file does not span tvOS.

**D-03 Required Role & Permission for `16-`** (conditional `04-` cite NOT needed — people-management permissions are not in the Sub-Org Admin bundle; cite `01-` People subgroup directly, per `08-` which also omits `04-` cite):
```markdown
## Required Role & Permission

**Required permission:** "Create Managed Apple Accounts" / "Edit Managed Apple Accounts"
(People / Organization Access subgroup) — OU-scoped.
For SCIM/OIDC tenant-wide configuration: "Configure SCIM provisioning" /
"Configure federated authentication" — tenant-wide, **DENY-by-default** (requires tenant
IT administrator). See [01-role-permission-model.md](01-role-permission-model.md)
Organization Access subgroup.

> **OP-2:** Managed Apple Account provisioning must NOT be performed under Account Holder
> credentials for routine operations.
```

---

### `17-audit-log-scoping-runbook.md` (runbook, request-response)

**Analog:** `docs/cross-platform/apple-business/06-mdm-server-assignment.md` (envelope)

No hard-bordered callout is required (the "anti-feature" documentation is a note, not a destructive action). A `> **Note:**` blockquote pattern from `09-shared-ipad-lifecycle.md` line 98 or 119 is appropriate for the "no public REST API" notice.

**`> **Note:**` lighter-callout tier** (analog: `09-shared-ipad-lifecycle.md` lines 98–101):
```markdown
> **Note:** Apple does not publish a definitive retention period for audit logs.
> Community reports suggest fewer than one year (LOW confidence). For SOX or
> compliance-framework retention requirements, configure periodic export to an
> external SIEM at least monthly via the Download Logs button (Activity page).
```

---

### `18-cross-org-boundary-cheat-sheet.md` (cheat-sheet, transform)

**Analog:** `docs/cross-platform/apple-business/07-vpp-content-token-consolidation.md` (envelope) + `docs/cross-platform/apple-business/00-overview.md` lines 60–83 (ABAUDIT style guide)

**D-02 status:** `18-` IS the scope-boundary SOT — it does NOT carry the scope-boundary callout that points to itself. It carries the full envelope (frontmatter + Platform applicability + Training-data notice + Verification section).

**ABAUDIT concentration:** This file has the highest ABAUDIT density in Phase 64. Each table row referencing a C15-triggering phrase (Intune RBAC, Intune role, Intune scope tag, etc.) needs one `<!-- ABAUDIT-NN: ... -->` comment on the line immediately before the table row line. ABAUDIT-04 was the last number used in `06-`; Phase 64 continues from **ABAUDIT-05**.

**ABAUDIT comment form** (from `00-overview.md` lines 67–68):
```html
<!-- ABAUDIT-05: intentional Apple-Business-vs-Intune disambiguation table; C15 false-positive allowlisted -->
```

**ABAUDIT numbering sequence:** Wave 1 task must allocate ABAUDIT-05 onward. Reserve a generous block (ABAUDIT-05 through ABAUDIT-20) in Wave 1; assign specific numbers during Wave 2 runbook authoring with `12-` Path B prose consuming the first allocation after `18-` table rows.

---

## Shared Patterns

### Hard-Bordered Callout (D-04 — first realization in Phase 64)

**Source:** `docs/cross-platform/apple-business/09-shared-ipad-lifecycle.md` lines 43–68 (hard tier) vs lines 98, 119, 180, 220 (light `> **Note:**` tier)

**Hard-tier precedent from `09-`** (lines 43–68) — the "Critical (OP-12)" block is the strongest precedent in the corpus. It uses:
- Bold severity label on line 1 of blockquote: `> **Critical (OP-12): Find My — MANDATORY PRE-DEPLOYMENT DISABLE**`
- Body: "Why this is blocking" + ordered steps + "Never assume" admonition
- No `⛔` glyph (it predates Phase 64; Phase 64 introduces `⛔`)
- Separator `---` before and after the callout

**Phase 64 hard-callout convention** (defined here, Claude's Discretion, first realization):
- Opening line: `> **⛔ [ACTION LABEL] — [SEVERITY/CONSEQUENCE] ([OP-NN])**`
- Body: consequence sentence, then mitigation/checklist
- Separator `---` before (matches `09-` line 41 and line 69 pattern)
- The `⛔` glyph is the exact discriminator `check-phase-64.mjs` asserts

**Light-tier precedent from `09-`** (line 98):
```markdown
> **Note:** Apple does not publish a guaranteed ADE enrollment time SLA.
```

**Rule (D-04 Refined-C):** Hard `⛔` callout on EVERY destructive path in `11-`, `12-` Path C, `13-`, `14-`. Light `> **Note:**` for informational warnings in `15-`, `16-`, `17-`.

---

### Scope-Boundary Callout + Forward Link (D-02)

**Source:** `docs/cross-platform/apple-business/07-vpp-content-token-consolidation.md` lines 128–132

**Verbatim analog** (lines 128–132):
```markdown
> **Untouched-OU trap summary:** When a tenant consolidates device pools across OUs, content
> tokens are NOT automatically transferred when devices move between OUs. Token migration is
> a manual, DENY-by-default-gated operation that can break existing license assignments if
> performed without preparation. The full mitigation procedure and hard-bordered callout are
> in `11-vpp-catalog-runbook.md` (Phase 64).
```

**Pattern for runbooks `11-`–`17-`**: One-liner stating the Apple-Business-vs-Intune boundary inline, plus forward pointer to `18-`. Example derived from the `07-` form:

```markdown
> **Scope boundary:** This runbook covers Apple Business-side [action]; Intune-side
> [related concern] is outside the Apple Business permission surface and is not covered here.
> For a full Apple-Business-vs-Intune responsibility table, see
> [18-cross-org-boundary-cheat-sheet.md](18-cross-org-boundary-cheat-sheet.md).
```

This blockquote sits in the envelope — between the Platform applicability block and the Training-data notice, or directly after the Training-data notice and before the first H2. Must be present in all 7 runbooks (`11-`–`17-`); `18-` omits it (it IS the SOT).

---

### Required Role & Permission Block (D-03)

**Source:** `docs/cross-platform/apple-business/06-mdm-server-assignment.md` lines 35–56 (conditional `04-` cite) and `docs/cross-platform/apple-business/08-managed-apple-account-provisioning.md` (no `04-` cite)

**Differential cite rule** (from `06-` lines 40–42 and 52):
- Cite `04-custom-role-authoring.md` ONLY when the permission maps to the Sub-Org Admin custom role bundle (e.g., `Assign devices to MDM server` → cite `04-`).
- Do NOT cite `04-` when the permission is in the People/Organization Access subgroup or Apps & Books subgroup (those are not in the Sub-Org Admin bundle).

**Table form from `06-`** (lines 50–56):
```markdown
| Permission | Who holds it | Scope | Permitted for sub-org admin? |
|------------|-------------|-------|------------------------------|
| Assign devices to MDM server | Sub-org admin (OU-scoped) | OU-scoped | Yes — via Sub-Org Admin custom role bundle (Combined topology; see [04-custom-role-authoring.md](04-custom-role-authoring.md)) or Device Enrollment Manager preset (OUs-only topology) |
| Manage MDM Servers | Tenant IT administrator / Account Holder only | tenant-wide | **DENY-by-default (OP-1)** |
```

**OP-1/OP-2/OP-3 inline safety reminders** must appear in every `## Required Role & Permission` block:
- OP-1: state the DENY-by-default tenant-wide permission (where applicable) explicitly in the table
- OP-2: `> **OP-2:** Do not use Account Holder credentials for routine operations.`
- OP-3: pair every Edit permission with its required companion View (cite `01-` Edit-without-View table at ~line 353)

---

### C15 ABAUDIT Exemption Pattern

**Source:** `docs/cross-platform/apple-business/00-overview.md` lines 67–83 (style guide) + `docs/cross-platform/apple-business/06-mdm-server-assignment.md` lines 12–13 (live example)

**Live example from `06-`** (lines 12–13):
```markdown
<!-- ABAUDIT-04: next line distinguishes Apple-side MDM server assignment from Intune MDM push-cert management; C15 regex 4 false-positive exemption (disambiguation clause clarifying distinct surfaces, not conflating Apple and Intune delegation) -->
> is an Intune-side operation outside the Apple Business permission surface. See the
```

**Rules** (from `00-overview.md:73–78`):
- Numbering: sequential across the entire v1.6 corpus. Last used: ABAUDIT-04 (in `06-`). Phase 64 starts at **ABAUDIT-05**.
- Placement: HTML comment on line i; line i+1 is the exempted content line. Only line i+1 is exempted — not line i+2 or beyond.
- One comment per banned line. If a markdown table row spans 3 lines and 2 of them contain banned phrases, that's 2 ABAUDIT comments.

**C15 regex set** (from `v1.6-milestone-audit.mjs` lines 718–727) — these are the 8 patterns that trigger:
```javascript
/\bIntune\s+(RBAC|role|scope\s+tag|admin\s+role)\b/i,           // regex 1
/\bdelegated\s+admin\b.{0,60}\bIntune\b/i,                       // regex 2
/\b(apple\s+business|apple\s+business\s+manager)\s+(role|privilege|permission)\b.{0,60}\bIntune\s+(role|RBAC)\b/i,  // regex 3
/\bIntune[-\s]side\b.{0,40}\b(delegat|RBAC|role\s+assign)/i,    // regex 4
/\bIntune\b.{0,40}\b(controls?|manages?|owns?)\b.{0,40}\b(Apple\s+Business|ABM)\b.{0,40}\bpermission/i,  // regex 5
/\b(same\s+as|equivalent\s+to|maps\s+to)\s+Intune\s+(RBAC|role)/i,  // regex 6
/\bManaged\s+Apple\s+ID\b(?!.{0,160}(Microsoft Intune|...))/i,  // regex 7
/\bIntune\s+admin\b.{0,60}\b(Apple\s+Business|ABM|Organizational\s+Unit|content\s+token)/i,  // regex 8
```

**Highest-risk surfaces in Phase 64:**
- `12-` Path B: "requires Intune RBAC" → triggers regex 1
- `18-` disambiguation table: each row referencing Intune RBAC/roles → triggers regex 1 and/or regex 4

---

### C16 Edge `admin_12` — What `12-` Must and Must NOT Contain

**Source:** `scripts/validation/v1.6-milestone-audit.mjs` lines 777–782 + `scripts/validation/v1.6-audit-allowlist.json` line 82

**Edge map** (lines 777–782):
```javascript
const edgeMap = {
  l1_34:    { file: endpoints.admin_12, anchor: '12-shared-ipad-passcode-reset' },
  admin_12: { file: endpoints.l1_34,    anchor: '34-apple-business' },
  ...
};
```

**`admin_12` edge requires:** `12-shared-ipad-passcode-reset.md` → outbound link to `34-apple-business-shared-ipad-passcode-reset.md` (anchor `34-apple-business`). BUT this is exempted by `v1.6-audit-allowlist.json` line 82 (`sunset_phase: "64-65"`).

**Phase 64 constraint:** `12-` must NOT contain the string `34-apple-business`. The exemption covers the MISSING link (the file won't have the link); the negative assertion in `check-phase-64.mjs` guards against accidentally adding a broken forward link.

---

## `check-phase-64.mjs` (validator, batch)

**Analog:** `scripts/validation/check-phase-63.mjs` — Path-A copy source

**File structure to copy verbatim then extend:**
- Lines 1–35: shebang, header comment block, imports — update phase number and description
- Lines 27–33: `readFile()` helper — copy unchanged
- Lines 36–52: file-path constants block — replace with AB_11..AB_18 constants + HARNESS
- Lines 52–73: `CHAIN_PHASES` array + `CHAIN_SKIP` set — extend `CHAIN_PHASES` to include 63; `CHAIN_SKIP` carries forward existing entries
- Lines 75–297: `checks` array — replace with Phase 64 assertions
- Lines 299–453: runner loop + exit — copy unchanged (pattern is identical across all phase validators)

**V-63-03 exact-string assertion form** (lines 101–118) — use this exact pattern for OP-9 and OP-11 hard-callout assertions:
```javascript
{
  id: 3, name: 'V-64-NN: 11-vpp-catalog-runbook.md OP-9 hard-bordered callout exact opening string present',
  run() {
    const c = readFile(AB_11);
    if (c === null) return { pass: false, detail: AB_11 + ' missing' };
    const OP9_OPENING = '> **⛔ Untouched-OU — DO NOT ACT until migration completes (OP-9)**';
    if (!c.includes(OP9_OPENING)) {
      return { pass: false, detail: 'OP-9 hard-bordered callout opening string missing from 11-' };
    }
    return { pass: true, detail: 'OP-9 hard-bordered callout opening string present' };
  }
},
```

**V-63-06 section-slice form** (lines 154–179) — use this pattern for path-ordering assertions (e.g., Path A before Path B before Path C in `12-`):
```javascript
{
  id: 6, name: 'V-64-NN: 12- Path A appears before Path B before Path C',
  run() {
    const c = readFile(AB_12);
    if (c === null) return { pass: false, detail: AB_12 + ' missing' };
    const posA = c.indexOf('### Path A');   // or '## Path A'
    const posB = c.indexOf('### Path B');
    const posC = c.indexOf('### Path C');
    if (posA === -1) return { pass: false, detail: 'Path A heading not found in 12-' };
    if (posB === -1) return { pass: false, detail: 'Path B heading not found in 12-' };
    if (posC === -1) return { pass: false, detail: 'Path C heading not found in 12-' };
    if (!(posA < posB && posB < posC)) {
      return { pass: false, detail: 'Path ordering violation: A=' + posA + ' B=' + posB + ' C=' + posC + ' (must be A < B < C)' };
    }
    return { pass: true, detail: 'Path A < Path B < Path C ordering confirmed in 12-' };
  }
},
```

**CHAIN_PHASES extension** (lines 52–53 of `check-phase-63.mjs`):
```javascript
// check-phase-64 must add 63 to CHAIN_PHASES:
const CHAIN_PHASES = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63];
// CHAIN_SKIP carries forward all existing entries from check-phase-63
const CHAIN_SKIP = new Set([48, 51, 58, 60, 61]);
```

**Runner loop** (lines 425–452) — copy verbatim, updating only the phase number string `'check-phase-64'` and the count label in the `console.log` header line.

**Full assertion inventory for `check-phase-64.mjs`** (RESEARCH.md validation test map, lines 644–663):

| Check ID | Target | Assert |
|----------|--------|--------|
| V-64-01 | All 8 files exist | exact-string (file paths) |
| V-64-02 | `11-` OP-9 exact opening string | exact-string |
| V-64-03 | `12-` Path A < B < C ordering | section-slice (indexOf) |
| V-64-04 | `12-` OP-11 exact opening string | exact-string |
| V-64-05 | `12-` does NOT contain `34-apple-business` | negative exact-string |
| V-64-06 | All 8: `last_verified:` in frontmatter | exact-string |
| V-64-07 | All 8: `platform:` in frontmatter | exact-string |
| V-64-08 | Action runbooks `11-`–`17-` ONLY (`18-` cheat-sheet exempt): `## Required Role & Permission` H2 | section-slice |
| V-64-09 | All 8: `## Verification` H2 | section-slice |
| V-64-10 | C15 framing guard on all 8 Apple docs | C15 regex + ABAUDIT allowlist |
| V-64-CHAIN | check-phase-{48..63}.mjs exits 0 | subprocess |
| V-64-AUDIT | v1.6-milestone-audit.mjs exits 0 | subprocess |
| V-64-SELF | CHAIN_PHASES does NOT include 64 | exact-string |

---

## No Analog Found

All 9 new files have strong analogs. No "no analog" entries.

| File | Note |
|------|------|
| `17-audit-log-scoping-runbook.md` | The "anti-feature documentation" pattern (documenting what Apple does NOT provide) has no direct corpus analog, but the envelope and callout forms are identical to other runbooks. Planner should use RESEARCH.md DELEG-07 operational content directly for the body. |

---

## Metadata

**Analog search scope:** `docs/cross-platform/apple-business/` (all 10 existing files), `scripts/validation/` (check-phase-62.mjs, check-phase-63.mjs, v1.6-milestone-audit.mjs, v1.6-audit-allowlist.json)
**Files read:** 10 analog docs + 3 validator files + 1 allowlist JSON
**Pattern extraction date:** 2026-05-22
