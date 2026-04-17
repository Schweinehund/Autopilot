# Phase 31: iOS L2 Investigation - Pattern Map

**Mapped:** 2026-04-17
**Files analyzed:** 18 (7 NEW / 11 MODIFIED)
**Analogs found:** 16 of 18 (2 support artifacts have no direct analog; they are small bespoke files whose shape is dictated by the harness consuming them)

## Overview

Phase 31 is a pure-documentation + lightweight-harness phase. All four new L2 runbooks have direct structural analogs in the macOS L2 file set (`docs/l2-runbooks/10-13-*.md`). The validation harness inherits verbatim from `scripts/validation/check-phase-30.mjs` (337 lines, argv-parsed, no-shell, execFileSync-based external tools). The index-file injection templates itself directly from the existing macOS L2 section in `docs/l2-runbooks/00-index.md` lines 71-97. The L2 template edit is a one-character enum extension mirroring the Phase 30 D-24 edit to the L1 template. Nine placeholder-retrofit targets are line-anchored single-line substitutions (plus one prose rewrite) with current text and proposed replacement text captured below.

| Bucket | Count | Sub-buckets |
|--------|-------|-------------|
| NEW L2 runbooks | 4 | log collection (1), investigation (3) |
| NEW validation artifacts | 3 | harness (1), expected-prose fixture (1), placeholder-inventory snapshot (1) |
| MODIFIED index | 1 | injection after line 97 |
| MODIFIED template | 1 | line 19 enum extension |
| MODIFIED L1 runbooks (escalation footer retrofit) | 6 | lines 90/114/88/96/83/179 |
| MODIFIED decision tree (5 line anchors in one file) | 1 | lines 44, 72, 82, 89, 94 |
| MODIFIED lifecycle doc | 1 | line 364 |
| MODIFIED admin-setup prose | 1 | line 182 (prose rewrite) |

---

## New Files

### Class `l2_runbook_new` — data flow `doc_authoring`

| New File | Role | Data Flow | Closest Analog | Match Quality |
|----------|------|-----------|----------------|---------------|
| `docs/l2-runbooks/14-ios-log-collection.md` | l2_runbook_new | doc_authoring | `docs/l2-runbooks/10-macos-log-collection.md` (160 lines, verified) | exact-role-different-sub-structure (Section 1/2/3 by tool on macOS; iOS converts to Tier 1/2/3 by method) |
| `docs/l2-runbooks/15-ios-ade-token-profile.md` | l2_runbook_new | doc_authoring | `docs/l2-runbooks/11-macos-profile-delivery.md` (191 lines, verified) | role-match (step-numbered investigation on macOS; iOS adopts D-07 hybrid `Investigation → Analysis → Resolution`) |
| `docs/l2-runbooks/16-ios-app-install.md` | l2_runbook_new | doc_authoring | `docs/l2-runbooks/12-macos-app-install.md` (194 lines, verified) | exact (both use channel-table Context + Investigation steps + Resolution Scenarios + Escalation Ceiling) |
| `docs/l2-runbooks/17-ios-compliance-ca-timing.md` | l2_runbook_new | doc_authoring | `docs/l2-runbooks/13-macos-compliance.md` (217 lines, verified) | role-match (step-numbered on macOS; iOS adopts D-14 hybrid axis structure `Investigation by Axis → Per-Cause Deep-Dive`) |

**Excerpt pointer:** see `## Analog Excerpts` below — "Frontmatter + platform-gate banner" (inherit verbatim), "Triage block" (adapt per-runbook), "Section ordering" (adapt per D-04/D-07/D-14), "Escalation Ceiling block" (inherit shape), "Version History" (inherit schema: single 1-line entry).

### Class `validation_harness` — data flow `harness_code`

| New File | Role | Data Flow | Closest Analog | Match Quality |
|----------|------|-----------|----------------|---------------|
| `scripts/validation/check-phase-31.mjs` (canonical location; NOT in phase dir per Phase 30 precedent) | validation_harness | harness_code | `scripts/validation/check-phase-30.mjs` (337 lines, verified) | exact-structural — inherit scaffold; swap checks array |

> **CONTEXT path discrepancy:** CONTEXT.md references `.planning/phases/31-ios-l2-investigation/check-phase-31.mjs`. **However**, the Phase 30 harness lives at `scripts/validation/check-phase-30.mjs`, not `.planning/phases/30-ios-l1-triage-runbooks/`. Planner should flag this and adopt the established canonical location (`scripts/validation/`) unless the user explicitly overrides.

**Excerpt pointer:** see `## Validation Harness Pattern` below — full scaffold (argv parsing / readFile helper / walkMd helper / checks array shape / CRLF normalization / external-tool skip-on-ENOENT / summary output).

### Class `planning_support_artifact` — data flow `doc_edit`/`harness_code`

| New File | Role | Data Flow | Closest Analog | Match Quality |
|----------|------|-----------|----------------|---------------|
| `.planning/phases/31-ios-l2-investigation/expected-d23.txt` | planning_support_artifact | doc_edit (fixture) | **NO analog** — new fixture pattern | n/a (5-line prose fixture) |
| `.planning/phases/31-ios-l2-investigation/placeholder-inventory.json` | planning_support_artifact | harness_code (input) | **NO analog** — new snapshot pattern | n/a (13-line JSON) |

These two files are input fixtures for `check-phase-31.mjs`. They have no analog because Phase 30 used inline-literal string checks (`content.includes("iOS L1 runbooks (Phase 30)")` at line 127 of the Phase 30 harness). Phase 31's more complex per-line mapping (D-22 table with 12+ distinct line anchors) is better served by externalizing the mapping to JSON. Shape derived from CONTEXT.md D-22 table.

**Proposed `placeholder-inventory.json` shape** (planner finalizes exact schema):
```json
{
  "placeholders": [
    { "file": "docs/l1-runbooks/16-ios-apns-expired.md", "line": 90, "target_primary": "15-ios-ade-token-profile.md", "target_secondary": ["14-ios-log-collection.md"] },
    { "file": "docs/l1-runbooks/17-ios-ade-not-starting.md", "line": 114, "target_primary": "15-ios-ade-token-profile.md", "target_secondary": [] },
    ...
  ]
}
```

**Proposed `expected-d23.txt` shape:** verbatim text the replaced line 182 of `docs/admin-setup-ios/06-compliance-policy.md` must equal after retrofit (see D-23 replacement prose in `## Modified Files` below). Harness uses string-equality diff check against this fixture.

---

## Modified Files

### Class `index_file_injection` — data flow `doc_edit`

| File | Analog (for injection) | Line Anchor(s) | Change Type |
|------|------------------------|----------------|-------------|
| `docs/l2-runbooks/00-index.md` | **Self** — existing macOS L2 section at lines 71-97 IS the structural template for the iOS L2 section to be injected AFTER line 97 | inject new block after current line 97 (between `## macOS ADE Runbooks` end and `## Related Resources`) | structural addition (no deletions) |

**Injection guide:** copy lines 71-97 verbatim, then search/replace `macOS` → `iOS`, `ADE` → `iOS/iPadOS`, adjust filenames `10-13` → `14-17`, adjust L1 source-scenario rows per D-22 mapping, append a new `### MAM-WE Investigation Advisory` blockquote block (D-20).

### Class `template_edit` — data flow `doc_edit`

| File | Line | Current Text | Proposed Text | Source |
|------|------|--------------|---------------|--------|
| `docs/_templates/l2-template.md` | 19 | `platform: Windows \| macOS \| all` | `platform: Windows \| macOS \| iOS \| all` | D-27 |

**Verified analog for this edit:** `docs/_templates/l1-template.md` line 18 already contains `platform: Windows | macOS | iOS | all` (Phase 30 D-24 applied). Same edit shape.

**Note:** Line 11 of the L2 template comment header also says `Set platform to Windows, macOS, or all` — planner should decide whether to also extend that comment to `Set platform to Windows, macOS, iOS, or all` (matches L1 template comment line 10). Recommend yes for consistency.

### Class `l1_runbook_placeholder_retrofit` — data flow `link_retrofit`

All six L1 runbooks share the **exact same line pattern**: a single-line escalation footer with the literal anchor text `[iOS L2 Runbooks (Phase 31)](../l2-runbooks/00-index.md)`. Replacement targets per D-22 map each line to a SPECIFIC `14-17` runbook (no generic `00-index.md` links per D-22 rule).

| File | Line | Current Line (verbatim, confirmed via Read) | Proposed Line (derived from D-22) |
|------|------|----------------------------------------------|------------------------------------|
| `docs/l1-runbooks/16-ios-apns-expired.md` | 90 | `See [iOS L2 Runbooks (Phase 31)](../l2-runbooks/00-index.md) for advanced investigation (Phase 31 placeholder; resolved when Phase 31 ships). For APNs config reference, see [APNs Certificate Guide](../admin-setup-ios/01-apns-certificate.md).` | `See [ADE Token & Profile Delivery Investigation](../l2-runbooks/15-ios-ade-token-profile.md) for advanced investigation of the APNs path through token diagnostics, with log artifacts per [iOS Log Collection Guide](../l2-runbooks/14-ios-log-collection.md). For APNs config reference, see [APNs Certificate Guide](../admin-setup-ios/01-apns-certificate.md).` |
| `docs/l1-runbooks/17-ios-ade-not-starting.md` | 114 | `See [iOS L2 Runbooks (Phase 31)](../l2-runbooks/00-index.md) for advanced ADE investigation (Phase 31 placeholder).` | `See [ADE Token & Profile Delivery Investigation](../l2-runbooks/15-ios-ade-token-profile.md) for advanced ADE investigation.` |
| `docs/l1-runbooks/18-ios-enrollment-restriction-blocking.md` | 88 | `See [iOS L2 Runbooks (Phase 31)](../l2-runbooks/00-index.md) for advanced enrollment investigation. For enrollment restriction configuration reference, see [iOS Admin Setup Overview](../admin-setup-ios/00-overview.md).` | `See [iOS Log Collection Guide](../l2-runbooks/14-ios-log-collection.md) and [ADE Token & Profile Delivery Investigation](../l2-runbooks/15-ios-ade-token-profile.md) for advanced enrollment investigation (restriction-specific diagnosis uses token/profile investigation; there is no dedicated L2 restriction runbook). For enrollment restriction configuration reference, see [iOS Admin Setup Overview](../admin-setup-ios/00-overview.md).` |
| `docs/l1-runbooks/19-ios-license-invalid.md` | 96 | `See [iOS L2 Runbooks (Phase 31)](../l2-runbooks/00-index.md) for advanced license and Entra sync investigation.` | `See [iOS Log Collection Guide](../l2-runbooks/14-ios-log-collection.md) — the MDM diagnostic report surfaces license assignment state. For ADE-path license failures, also see [ADE Token & Profile Delivery Investigation](../l2-runbooks/15-ios-ade-token-profile.md).` |
| `docs/l1-runbooks/20-ios-device-cap-reached.md` | 83 | `See [iOS L2 Runbooks (Phase 31)](../l2-runbooks/00-index.md) for advanced investigation. For device retire action documentation, see [Microsoft Learn — Retire devices](https://learn.microsoft.com/intune/remote-actions/devices-wipe).` | `See [ADE Token & Profile Delivery Investigation](../l2-runbooks/15-ios-ade-token-profile.md) — the token/enrollment-profile diagnostic surfaces device cap state. For device retire action documentation, see [Microsoft Learn — Retire devices](https://learn.microsoft.com/intune/remote-actions/devices-wipe).` |
| `docs/l1-runbooks/21-ios-compliance-blocked.md` | 179 | `See [iOS L2 Runbooks (Phase 31)](../l2-runbooks/00-index.md) for advanced compliance / CA investigation (Phase 31 placeholder).` | `See [Compliance & CA Timing Investigation](../l2-runbooks/17-ios-compliance-ca-timing.md) for advanced compliance / CA investigation (Cause A → timing axis; Causes B and C → config-error axis).` |

**Each file also receives:**
- `last_verified:` date bump to Phase 31 ship date (D-25)
- 1-line entry appended to its `## Version History` table: `| YYYY-MM-DD | Resolved Phase 31 L2 cross-references | -- |` (D-25)
- Commit grouping: single atomic commit `docs(31): resolve Phase 31 L2 placeholders in iOS L1 runbooks` (D-24)

### Class `decision_tree_placeholder_retrofit` — data flow `link_retrofit`

| File | Line | Current Text (verbatim) | Proposed Text (per D-22) | Context |
|------|------|-------------------------|---------------------------|---------|
| `docs/decision-trees/07-ios-triage.md` | 44 | `    IOS3 -->\|"Profile / config /<br/>app not working"\| IOSE2(["Escalate L2:<br/>Not in L1 scope (Phase 31)"])` | `    IOS3 -->\|"Profile / config /<br/>app not working"\| IOSE2(["Escalate L2:<br/>See iOS L2 Runbooks index"])` — **text-only** per Phase 30 D-05 precedent; no edge/node-ID changes | Mermaid node label |
| `docs/decision-trees/07-ios-triage.md` | 72 | `\| Profile/config/app not working \| Visible? Yes \| Symptom: profile/app/config \| L2 escalation (Phase 31 scope) \|` | `\| Profile/config/app not working \| Visible? Yes \| Symptom: profile/app/config \| L2 escalation -- primary [15-ios-ade-token-profile.md](../l2-runbooks/15-ios-ade-token-profile.md) + see-also [16-ios-app-install.md](../l2-runbooks/16-ios-app-install.md) \|` | Routing Verification table row; primary+see-also per D-26 |
| `docs/decision-trees/07-ios-triage.md` | 82 | `\| What is the primary symptom? \| Ask the user: "What specifically isn't working?" Non-compliant / access blocked → runbook 21. Configuration profile missing, app not appearing, or config not applied → L2 escalation (Phase 31 scope). Anything else → L2 escalation. \|` | `\| What is the primary symptom? \| Ask the user: "What specifically isn't working?" Non-compliant / access blocked → runbook 21. Configuration profile missing, app not appearing, or config not applied → L2 escalation via [15-ios-ade-token-profile.md](../l2-runbooks/15-ios-ade-token-profile.md) (profile/config) or [16-ios-app-install.md](../l2-runbooks/16-ios-app-install.md) (app). Anything else → L2 escalation. \|` | How to Check table row |
| `docs/decision-trees/07-ios-triage.md` | 89 | `\| Profile/config/app route (IOSE2 -- Phase 31 L2 scope) \| All of above + the specific profile/app name expected, Intune device-status screenshot showing profile/app delivery state, last check-in time \|` | `\| Profile/config/app route (IOSE2 -- see [15-ios-ade-token-profile.md](../l2-runbooks/15-ios-ade-token-profile.md) or [16-ios-app-install.md](../l2-runbooks/16-ios-app-install.md)) \| All of above + the specific profile/app name expected, Intune device-status screenshot showing profile/app delivery state, last check-in time \|` | Escalation Data table row |
| `docs/decision-trees/07-ios-triage.md` | 94 | `- [iOS L2 Runbooks (Phase 31)](../l2-runbooks/00-index.md) -- L2 investigation (Phase 31 placeholder; resolved when Phase 31 ships)` | `- [iOS L2 Runbooks](../l2-runbooks/00-index.md#ios-l2-runbooks) -- L2 investigation (log collection + 3 investigation runbooks)` | Related Resources footer |

**Critical constraint:** No Mermaid graph modifications. All edits are text-only per Phase 30 D-05 precedent. The IOSE2 node ID stays stable; only its human-readable label changes.

**Commit grouping:** single atomic commit `docs(31): resolve Phase 31 L2 placeholders in iOS triage tree` (D-24).

### Class `lifecycle_placeholder_retrofit` — data flow `link_retrofit`

| File | Line | Current Text | Proposed Text | Type |
|------|------|--------------|---------------|------|
| `docs/ios-lifecycle/01-ade-lifecycle.md` | 364 | `  - For advanced investigation: Mac+cable sysdiagnose (Phase 31 scope)` | `  - For advanced investigation: [Mac+cable sysdiagnose](../l2-runbooks/14-ios-log-collection.md#section-3-mac-cable-sysdiagnose) — see also [ADE Token & Profile Delivery Investigation](../l2-runbooks/15-ios-ade-token-profile.md) for Pattern A-D token-sync context` | single-line link substitution |

**Anchor target dependency:** the link `#section-3-mac-cable-sysdiagnose` requires `14-ios-log-collection.md` to use the exact heading `## Section 3: Mac+Cable Sysdiagnose` (matches macOS analog convention — `10-macos-log-collection.md` line 128 uses `## Section 3: Log Paths by macOS Version`). Planner should lock this heading text in PLAN for file 14 so the retrofit link resolves.

**Commit grouping:** single atomic commit `docs(31): resolve Phase 31 L2 placeholder in iOS ADE lifecycle` (D-24).

### Class `admin_setup_prose_rewrite` — data flow `prose_rewrite`

| File | Line | Current Text (verbatim) | Proposed Text (D-23) | Type |
|------|------|-------------------------|-----------------------|------|
| `docs/admin-setup-ios/06-compliance-policy.md` | 182 | `- **No MDM diagnostic tool on iOS:** Unlike Windows, iOS has no `\u0060mdmdiagnosticstool.exe`\u0060 equivalent. L2 diagnosis of a stuck compliance state requires Company Portal log upload, MDM diagnostic report from Intune admin center, or Mac+cable sysdiagnose (documented in Phase 31 L2 runbooks).` | `- **No MDM diagnostic tool on iOS:** Unlike Windows, iOS has no `\u0060mdmdiagnosticstool.exe`\u0060 equivalent. L2 diagnosis of a stuck compliance state uses [iOS Log Collection](../l2-runbooks/14-ios-log-collection.md) (three methods: MDM diagnostic report, Company Portal upload, Mac+cable sysdiagnose) followed by [Compliance & CA Timing Investigation](../l2-runbooks/17-ios-compliance-ca-timing.md).` | **PROSE REWRITE — not simple substitution.** Mirrors Phase 30 D-18 precedent. |

**Flag for planner:** this is the ONE line in Phase 31 that is NOT a mechanical replace. Planner must enumerate the exact before/after text in PLAN.md so the executor does not mistakenly do a regex-substitute.

**Commit grouping:** single atomic commit `docs(31): resolve Phase 31 L2 placeholder in iOS compliance policy (prose rewrite)` (D-24).

---

## Analog Excerpts

### Analog A: `docs/l2-runbooks/10-macos-log-collection.md` (160 lines, PRIMARY for file 14)

**Frontmatter (lines 1-7) — inherit ALL 5 fields, change `platform: macOS` → `platform: iOS`:**
```yaml
---
last_verified: 2026-04-14
review_by: 2026-07-13
applies_to: ADE
audience: L2
platform: macOS
---
```

**Platform gate banner (line 9) — NOT the Phase 30 D-26 iOS variant:**
```markdown
> **Platform gate:** This guide covers macOS ADE log collection via Intune. For Windows Autopilot, see [Windows Log Collection Guide](01-log-collection.md).
```

**Use instead the Phase 30 D-26 banner per D-29** (verbatim from `docs/l1-runbooks/16-ios-apns-expired.md` line 9, but adapted for L2 per CONTEXT D-29):
```markdown
> **Platform gate:** This guide covers iOS/iPadOS L2 investigation via Intune. For Windows Autopilot, see [Windows L2 Runbooks](00-index.md). For macOS ADE, see [macOS ADE Runbooks](00-index.md#macos-ade-runbooks).
```

**Section structure skeleton (from Grep of `^##\s` headings):**
```
## Context                                       (line 13)
## Section 1: IntuneMacODC Comprehensive Collection   (line 23)
## Section 2: Terminal-Based Targeted Collection      (line 68)
## Section 3: Log Paths by macOS Version              (line 128)
## Related Resources                                   (line 147)
## Version History                                     (line 156)
```

**iOS delta (D-01, D-04):** Tier 1/2/3 by method (not Section 1/2/3 by tool). Also add a `## Tool Landscape` preamble (D-02) and `## Decision Matrix` (D-03) BEFORE Tier 1.

**Version History block (lines 156-160):**
```markdown
## Version History

| Date | Change |
|------|--------|
| 2026-04-14 | Initial version — IntuneMacODC-first log collection with Terminal fallback, macOS version table, macOS 15 IntuneMDMAgent caveat |
```

Single-row initial-version entry. iOS file inherits the shape; `Change` column lists the actual iOS content summary.

---

### Analog B: `docs/l2-runbooks/11-macos-profile-delivery.md` (191 lines, PRIMARY for file 15)

**Section structure skeleton (from Grep):**
```
## Triage                 (line 13)
## Context                (line 19)
## Investigation          (line 29)
  ### Step 1 – Step 8
## Resolution Scenarios   (line 134)
## Escalation Ceiling     (line 158)
## Related Resources      (line 176)
## Version History        (line 187)
```

**Triage block (lines 13-17) — inherit shape, adapt data list for iOS:**
```markdown
## Triage

**From L1 escalation?** L1 collected: device serial number, macOS version, Intune device status screenshot, profile name that failed to apply. Skip to Step 2.

**Starting fresh?** Begin at Step 1.
```

**iOS delta (D-07):** replace `## Investigation` step-numbered structure with hybrid three-layer H2:
```
## Investigation — Data Collection
  ### Step 1: Token sync status
  ### Step 2: Profile assignment state
  ### Step 3: Enrollment profile GUID
  ### Step 4: Device-side enrollment state
## Analysis — Match Against Known Failure Patterns
  ### Pattern A: Token expired or sync stuck
  ### Pattern B: Profile never assigned to device in ABM
  ### Pattern C: Profile assigned but device never received it
  ### Pattern D: Wrong MDM server on device
## Resolution
```

**Escalation Ceiling block (lines 158-173) — shape preserved:**
```markdown
## Escalation Ceiling

Open a Microsoft support case if:

- Profile shows **Error** status with no actionable detail in the Intune error field
- ...

**Data to include in support case:**
- IntuneMacODC zip from the affected device
- `sudo profiles show` output
- ...
```

**iOS delta:** "IntuneMacODC zip" is macOS-specific; iOS replaces with MDM diagnostic report zip + Company Portal logs + optionally sysdiagnose `.tar.gz`.

**Cross-reference anchor convention (lines 124, 182-183):**
```markdown
[Configuration Profile Failures](../admin-setup-macos/06-config-failures.md)
[macOS App Install Failure Diagnosis](12-macos-app-install.md)
```

**iOS inherits pattern; substitute `admin-setup-macos` → `admin-setup-ios`, `macos-lifecycle` → `ios-lifecycle`, filenames `11/12/13` → `15/16/17`. Anchor target `06-compliance-policy.md#compliance-evaluation-timing-and-conditional-access` from Phase 28 D-11 is the primary deep-link for file 17 (confirmed in CONTEXT canonical_refs).**

---

### Analog C: `docs/l2-runbooks/12-macos-app-install.md` (194 lines, PRIMARY for file 16)

**Context block with channel-disambiguation table (lines 19-28) — KEY reusable shape for iOS:**
```markdown
## Context

macOS app deployment in Intune uses two distinct channels. **Which channel is involved determines the entire diagnostic path:**

| Channel | App types | Delivery mechanism | Log source |
|---------|-----------|-------------------|------------|
| **IME channel** | DMG apps, PKG apps, shell scripts | Intune Management Extension daemon (`IntuneMdmDaemon`) | `IntuneMDMDaemon*.log` |
| **MDM channel** | VPP/Apps and Books | Apple MDM command pipeline (APNs) | Intune portal, VPP token status |

**IMPORTANT:** Do NOT cross-diagnose these channels. A DMG install failure has no relation to a VPP license issue, and vice versa. Identify the app type in Step 2 before proceeding.
```

**iOS delta (D-11, D-12):** iOS has no IME channel equivalent for LOB IPA installs (MDM channel only on iOS). Instead, iOS disambiguation axis is VPP device-licensed vs VPP user-licensed vs LOB (IPA) vs supervision-boundary-blocked. Add SC #4 three-class markers:
```markdown
| Failure pattern | Class | Escalation |
|-----------------|-------|------------|
| VPP device-license exhausted | ⚙️ Config error | Fix in ABM VPP assignment |
| Required app stuck `Pending install` > 8h | ⏱️ Timing issue | Trigger Sync; wait for check-in |
| Supervised-only app failing on UE/BYOD | ⚙️ Config error | Supervised flag required; revise deployment model |
| App Store binary version broken post-iOS-17 | 🐛 Genuine defect | Microsoft Support escalation |
```

**Resolution Scenarios block (lines 137-157) — 5 scenarios in macOS file; iOS follows same "named scenario + fix steps" shape.**

---

### Analog D: `docs/l2-runbooks/13-macos-compliance.md` (217 lines, PRIMARY for file 17)

**Context block (lines 19-27) includes L1→L2 boundary framing:**
```markdown
This runbook covers **L2 investigation** of why a device is non-compliant or why compliance status is not updating. The L1 runbook (`14-macos-compliance-access-blocked.md`) handles portal-observable scenarios. This L2 runbook investigates the underlying technical causes using Terminal diagnostics.

Before starting: collect a diagnostic package per [macOS Log Collection Guide](10-macos-log-collection.md).
```

**iOS delta (D-14, D-17):** The L1 handoff block becomes more elaborate because the iOS L1 runbook has Cause A/B/C sub-causes and iOS Compliance has both timing axis and genuine-defect class:
```markdown
**From L1 escalation?** L1 runbook 21 classified the failure as Cause A / B / C. Skip to the matching "Per-Cause Deep-Dive" section below. The "Investigation by Axis" section is the starting point for fresh investigations where L1 did not narrow the cause.
```

**Per-setting compliance sub-sections (lines 77-122) — KEY reusable shape:**
```markdown
**SIP (System Integrity Protection) disabled:**

\`\`\`bash
csrutil status
\`\`\`

Expected: `System Integrity Protection status: enabled.`

If disabled: no MDM remediation exists for SIP. The user must boot to Recovery Mode...
```

**iOS delta (D-15):** replace macOS-specific compliance settings (SIP, FileVault, firewall socketfilterfw) with iOS settings (OS version, jailbreak, passcode, restricted apps Bundle ID). Use Pareto emphasis: CA timing + Default posture get full sub-sections (~50% of runbook); jailbreak / OS version / passcode / restricted apps get compact ~10-line sub-sections with deep-links to `../admin-setup-ios/06-compliance-policy.md#[anchor]`.

**Known-defect sub-section (D-16):** the "Not evaluated" terminal state gets its own sub-section with Microsoft Support escalation data list (APNs tenant ID + expiry timestamp + network-path evidence from kernel.log APNs session records).

**Escalation Ceiling (lines 183-198) — inherit shape; swap macOS specifics for iOS.**

---

### Analog E: `docs/l2-runbooks/00-index.md` lines 71-97 (macOS L2 section — STRUCTURAL TEMPLATE for D-20 injection)

**Full block to mirror (verbatim):**
```markdown
## macOS ADE Runbooks

> **Version gate:** The runbooks below cover macOS Automated Device Enrollment (ADE) via Intune.
> For Windows Autopilot runbooks, see the tables above.

The [macOS Log Collection Guide](10-macos-log-collection.md) is a **prerequisite for all macOS L2 investigation runbooks** -- collect IntuneMacODC diagnostic package and targeted Terminal artifacts before beginning any investigation.

### When to Use

| Runbook | When to Use | Prerequisite |
|---------|-------------|--------------|
| [macOS Log Collection Guide](10-macos-log-collection.md) | Before starting any macOS L2 investigation -- collect IntuneMacODC zip and Terminal diagnostic outputs | None |
| [Profile Delivery Investigation](11-macos-profile-delivery.md) | Configuration profile not delivered, showing error/conflict, or not taking effect on device | [macOS Log Collection](10-macos-log-collection.md) |
| [App Install Failure Diagnosis](12-macos-app-install.md) | DMG, PKG, or VPP app not installing, showing failed status, or continuous reinstall loop | [macOS Log Collection](10-macos-log-collection.md) |
| [Compliance Evaluation Investigation](13-macos-compliance.md) | Device non-compliant, compliance not evaluating, or Conditional Access blocking despite compliance | [macOS Log Collection](10-macos-log-collection.md) |

### macOS L1 Escalation Mapping

| L1 Runbook Source | L2 Runbook |
|-------------------|------------|
| Setup Assistant / Enrollment issues | [Profile Delivery Investigation](11-macos-profile-delivery.md) for profile-related escalation; general enrollment issues reviewed case-by-case |
| Configuration profile not applied | [Profile Delivery Investigation](11-macos-profile-delivery.md) |
| App not installed | [App Install Failure Diagnosis](12-macos-app-install.md) |
| Compliance / access blocked | [Compliance Evaluation Investigation](13-macos-compliance.md) |
| Company Portal sign-in failure | [Compliance Evaluation Investigation](13-macos-compliance.md) for Entra registration issues |

> **Note:** When a ticket arrives via macOS L1 escalation, the escalation checklist from the L1 runbook specifies: serial number, macOS version, Intune device status screenshot, and description of steps attempted. Each macOS L2 runbook opens with a triage block that routes "from L1 escalation" paths to skip initial data collection steps.
```

**iOS delta per D-20:** L1 escalation mapping rows use the 6 L1 runbook titles (16-21) mapped per D-22; plus a new `### MAM-WE Investigation Advisory` blockquote block is appended:
```markdown
### MAM-WE Investigation Advisory
> **MAM-WE investigation is out of Phase 31 scope** — deferred to **ADDTS-01** future milestone. Selective wipe failures, PIN loop, app protection not applying, and MAM-specific compliance failures currently have no L2 runbook. Escalate MAM-specific issues directly to Microsoft Support with Company Portal log upload + app protection policy JSON export.
```

Also update the `## Version History` table (line 112-118) with new row: `| YYYY-MM-DD | Added iOS L2 runbook section | -- |`.

---

### Analog F: `docs/l1-runbooks/16-ios-apns-expired.md` (Phase 30 L1, for platform-gate banner reference)

**Platform gate banner (line 9) — the Phase 30 D-26 verbatim string, adapted to L2 per D-29:**
```markdown
> **Platform gate:** This guide covers iOS/iPadOS troubleshooting via Intune. For Windows Autopilot, see [Windows L1 Runbooks](00-index.md#apv1-runbooks). For macOS ADE, see [macOS ADE Runbooks](00-index.md#macos-ade-runbooks).
```

**D-29-adapted L2 banner (final text for files 14-17):**
```markdown
> **Platform gate:** This guide covers iOS/iPadOS L2 investigation via Intune. For Windows Autopilot, see [Windows L2 Runbooks](00-index.md). For macOS ADE, see [macOS ADE Runbooks](00-index.md#macos-ade-runbooks).
```

**Frontmatter shape (lines 1-7) — iOS L2 applies D-28:**
```yaml
---
last_verified: YYYY-MM-DD        # Phase 31 ship date
review_by: YYYY-MM-DD             # +90 days
applies_to: all | ADE             # per D-28 (15 is ADE-only; 14, 16, 17 are "all")
audience: L2
platform: iOS
---
```

---

## Delta Points

Critical divergences where iOS runbooks MUST NOT blindly copy the macOS structure. Planner should flag these in each plan's `<read_first>` hint.

### File 14 (log collection)

- **Δ1:** macOS uses "Section 1/2/3 by TOOL" (IntuneMacODC / Terminal / macOS-version log paths). iOS uses "Tier 1/2/3 by METHOD" (MDM diagnostic report / Company Portal / Mac+cable sysdiagnose) per D-01.
- **Δ2:** Add a `## Tool Landscape` preamble (D-02 — "no iOS equivalent to mdmdiagnosticstool.exe") — has NO macOS analog (macOS has IntuneMacODC as the dominant tool).
- **Δ3:** Add a `## Decision Matrix` H2 after `## Tool Landscape` (D-03 — 6-column table including `Typical Latency`). macOS has no equivalent.
- **Δ4:** Section 3 heading MUST be `## Section 3: Mac+Cable Sysdiagnose` exactly (anchor-linkable as `#section-3-mac-cable-sysdiagnose` from `ios-lifecycle/01-ade-lifecycle.md` line 364 retrofit).

### File 15 (ADE token/profile)

- **Δ5:** macOS `11-macos-profile-delivery.md` uses "Step 1-8 sequential investigation". iOS adopts D-07 hybrid three-layer structure (`Investigation → Analysis → Resolution` with Pattern A/B/C/D).
- **Δ6:** Add Graph API READ-ONLY warning preamble block per D-09 — no macOS analog.
- **Δ7:** Prerequisites section calls out triple-portal requirement (ABM + Intune + Entra) per D-10 — more elaborate than macOS.
- **Δ8:** Pattern A vs Pattern D disambiguation (specifics #325) — macOS has no equivalent dual-class where similar observation has different resolution.

### File 16 (app install)

- **Δ9:** macOS has dual-channel (IME vs MDM) disambiguation. iOS has no IME channel for app install (MDM channel only). Channel table adapted: replace "IME channel" rows with VPP device vs user vs LOB (IPA) vs supervision boundary.
- **Δ10:** Add SC #4 three-class markers (⚙️ / ⏱️ / 🐛 or text fallbacks per specifics #326) per D-12 — no macOS analog.
- **Δ11:** Add MAM-WE deferral cross-link per D-13 pointing to `00-index.md#mam-we-investigation-advisory`.
- **Δ12:** Supervised-only silent install callout per Phase 28 D-14 (iOS 17 DDM boundary per D-34 research flag) — no macOS analog.

### File 17 (compliance / CA timing)

- **Δ13:** macOS `13-macos-compliance.md` uses Step 1-7 sequential. iOS adopts D-14 hybrid axis structure (`Investigation by Axis` → `Per-Cause Deep-Dive`).
- **Δ14:** L1 handoff block is MORE elaborate than macOS because iOS L1 runbook 21 has Cause A/B/C sub-causes (Phase 30 D-28). Route by L1-classified cause per D-17.
- **Δ15:** Per-setting sub-sections use Pareto emphasis (D-15): CA timing + Default posture ~50% of file; jailbreak / OS version / passcode / restricted apps compact ~10 lines each.
- **Δ16:** "Not evaluated" terminal state gets dedicated sub-section with MS Support escalation data (APNs tenant ID, expiry timestamp, kernel.log APNs session records per specifics #331) per D-16 — no macOS analog.
- **Δ17:** Line ~230 expected vs macOS 217 per CONTEXT specifics #322 (iOS slightly longer).

### Check-phase-31 harness

- **Δ18:** Phase 30 harness checks L1 runbook count/structure (Symptom heading, User Action Required, frontmatter, Platform gate). Phase 31 harness checks L2 runbook count/structure (4 files at 14-17, frontmatter with `audience: L2` + `platform: iOS`, Platform gate banner from D-29 verbatim, presence of `## Triage` block in files 15/16/17 (not 14 per macOS analog), `## Escalation Ceiling` section, Version History table). Adapt check IDs but inherit scaffold verbatim.
- **Δ19:** Add NEW checks Phase 30 doesn't have:
  - Placeholder-inventory diff check: for each row in `placeholder-inventory.json`, assert the file+line no longer contains `Phase 31`. (Phase 30 had inline-literal check; Phase 31 externalizes.)
  - D-23 prose diff check: assert `docs/admin-setup-ios/06-compliance-policy.md` line 182 equals the contents of `expected-d23.txt`.
  - L2 template enum check: assert `docs/_templates/l2-template.md` contains `Windows | macOS | iOS | all` (mirrors Phase 30 check 10 for L1 template).
  - `docs/l2-runbooks/00-index.md` contains `## iOS L2 Runbooks` (mirrors Phase 30 check 9).

---

## Validation Harness Pattern

The Phase 30 harness `scripts/validation/check-phase-30.mjs` (337 lines) is the EXACT scaffold. Phase 31 inherits:

### Scaffold header (lines 1-9) — inherit verbatim, swap phase number in comment

```javascript
#!/usr/bin/env node
// Phase 30 static validation harness
// Source of truth: .planning/phases/30-ios-l1-triage-runbooks/30-VALIDATION.md
// NO SHELL: all file content via fs.readFileSync; external tools via execFileSync with argv arrays

import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
import process from 'node:process';
```

### argv parsing (lines 11-13) — inherit verbatim

```javascript
const argv = process.argv.slice(2);
const QUICK = argv.includes('--quick');
const VERBOSE = argv.includes('--verbose');
```

CONTEXT mentions `--full`; the actual Phase 30 flag is `--quick` (default = full). `--quick` skips external-tool checks (type `external`). Phase 31 should inherit this flag semantics.

### File-read helper (lines 15-19) — inherit verbatim

```javascript
function readFile(relPath) {
  const abs = join(process.cwd(), relPath);
  if (!existsSync(abs)) return null;
  return readFileSync(abs, 'utf8');
}
```

### Recursive Markdown walker (lines 21-38) — inherit verbatim for phase-wide scans

```javascript
function walkMd(dir) {
  const abs = join(process.cwd(), dir);
  if (!existsSync(abs)) return [];
  const results = [];
  function walk(current) {
    let entries;
    try { entries = readdirSync(current); } catch { return; }
    for (const entry of entries) {
      const full = join(current, entry);
      let stat;
      try { stat = statSync(full); } catch { continue; }
      if (stat.isDirectory()) { walk(full); }
      else if (entry.endsWith('.md')) { results.push(full); }
    }
  }
  walk(abs);
  return results;
}
```

### File-group resolver (lines 40-48) — adapt for L2 14-17 instead of L1 16-21

```javascript
function resolveRunbooks() {
  const dir = join(process.cwd(), 'docs/l1-runbooks');      // Phase 31 -> 'docs/l2-runbooks'
  let entries = [];
  try { entries = readdirSync(dir); } catch { return []; }
  return ['16','17','18','19','20','21'].map(n => {         // Phase 31 -> ['14','15','16','17']
    const found = entries.find(f => new RegExp('^' + n + '-ios-.*\.md$').test(f));
    return { num: n, path: found ? join(dir, found) : null };
  });
}
```

### Check array element shape (lines 50-301) — 13 check objects, each with: `id`, `name`, `type`, `required`, `run()`

Representative check types to inherit (adapt names/paths for Phase 31):

**Type `file-match-count` — count regex matches:**
```javascript
{
  id: 1, name: "...", type: "file-match-count", required: true,
  run() {
    const content = readFile("docs/...");
    if (content === null) return { pass: false, detail: "File does not exist: ..." };
    const matches = content.match(/^.../gm) || [];
    const count = matches.length;
    if (count >= 1 && count <= 5) return { pass: true, detail: count + " node(s) found" };
    return { pass: false, detail: "Expected 1-5 nodes, found " + count };
  }
}
```

**Type `multi-file-contains` — iterate group, check each file:**

This pattern (lines 82-96) is the **multi-cause Symptom handler** from commit ca40eb9 — note the try-both-shapes logic for single-flow (H2) vs multi-cause (H3):
```javascript
const missing = runbooks.filter(r => {
  if (!r.path) return true;
  const content = readFileSync(r.path, "utf8");
  if (/^## Symptom\s*$/m.test(content)) return false;
  const isMultiCause = /^## Cause [A-Z]/m.test(content);
  if (isMultiCause && /^### Symptom\s*$/m.test(content)) return false;
  return true;
});
```

Phase 31 adapts: check for `## Triage` on files 15/16/17 (not 14 — file 14 has no Triage per macOS analog). Multi-shape logic may apply to file 17's hybrid structure (`## Investigation by Axis` H2 + `## Per-Cause Deep-Dive` H2).

**Type `frontmatter` — CRLF normalization + field validation (lines 196-218):**
```javascript
const content = readFileSync(r.path, "utf8").replace(/\r\n/g, "\n");  // CRLF normalization from commit ca40eb9
const first20 = content.split("\n").slice(0, 20).join("\n");
const fmMatch = first20.match(/^---\n([\s\S]*?)\n---/m);
if (!fmMatch) { failures.push(r.num + ": no frontmatter found"); continue; }
const fm = fmMatch[1];
const issues = [];
if (!/^last_verified:\s*\d{4}-\d{2}-\d{2}\s*$/m.test(fm)) issues.push("last_verified missing or invalid");
if (!/^review_by:\s*\d{4}-\d{2}-\d{2}\s*$/m.test(fm)) issues.push("review_by missing or invalid");
if (!/^audience:\s*L1\s*$/m.test(fm)) issues.push("audience: L1 missing");       // Phase 31 -> L2
if (!/^platform:\s*iOS\s*$/m.test(fm)) issues.push("platform: iOS missing");
```

**Type `external` — npx markdown-link-check + mermaid-cli with skip-on-missing (lines 251-299):**
```javascript
try {
  execFileSync("npx", ["--yes", "--no-install", "markdown-link-check", ...linkTargets],
    { stdio: "pipe", timeout: 30000, cwd: process.cwd() });
  results.linkCheck = "PASS";
} catch (err) {
  const stderr = err.stderr ? err.stderr.toString() : "";
  const isMissing = err.code === "ENOENT" || err.status === 127
    || stderr.includes("not found") || stderr.includes("Could not resolve")
    || stderr.includes("npm error could not determine executable");
  results.linkCheck = isMissing ? "SKIPPED" : "FAIL";
}
```

Phase 31 targets: all 4 new L2 runbook files + `docs/l2-runbooks/00-index.md` + the 9 retrofitted files.

### Summary output (lines 303-337) — inherit verbatim

```javascript
const LABEL_WIDTH = 56;
function padLabel(s) {
  if (s.length >= LABEL_WIDTH) return s + " ";
  return s + " " + ".".repeat(LABEL_WIDTH - s.length) + " ";
}

let passed = 0, failed = 0, skipped = 0;
const activeChecks = QUICK ? checks.filter(c => c.type !== "external") : checks;

// ... check execution loop (same shape) ...

process.stdout.write("\nSummary: " + passed + " passed, " + failed + " failed, " + skipped + " skipped\n");
process.exit(failed > 0 ? 1 : 0);
```

### JSON-output structure

Phase 30 harness outputs **plain text** (not JSON). CONTEXT mentions "JSON-output structure" — Phase 30 does not have one. Planner options:
1. Inherit plain-text output exactly (recommended; matches precedent).
2. Add opt-in `--json` flag to emit a structured `{ passed, failed, skipped, checks: [...] }` object. If planner chooses this, base the shape on the in-memory `result` objects: `{ id, name, pass, skipped, detail }`.

Recommend option 1 unless the user explicitly requests JSON.

### Check count for Phase 31

Phase 30 has 13 checks. Phase 31 estimated check count: 14-16 (inherit 10 frontmatter/structure checks from Phase 30 adapted, add 3-4 new checks per Δ19: placeholder-inventory diff, D-23 prose diff, L2 template enum, `## iOS L2 Runbooks` index section).

---

## PATTERN MAPPING COMPLETE

**Phase:** 31 - iOS L2 Investigation
**Files classified:** 18
**Analogs found:** 16 / 18 (2 bespoke support artifacts have no direct analog)

### Coverage
- Files with exact analog: 6 (file 14 / file 16 / harness / index injection / template edit / 6 L1 retrofit lines — all share one line pattern)
- Files with role-match analog (structural divergence per Delta Points): 2 (file 15 hybrid structure; file 17 hybrid axis structure)
- Files with no analog: 2 (`expected-d23.txt` 5-line prose fixture; `placeholder-inventory.json` 13-line input snapshot)

### Key Patterns Identified
- **All 4 L2 runbooks share identical frontmatter schema, platform-gate banner (D-29 verbatim), and Version-History table shape** — inherit verbatim, swap field values only.
- **L2 runbook `## Escalation Ceiling` is a standard block shape** across all macOS L2 files — all 4 iOS files inherit this (except file 14 log collection which has no Escalation Ceiling per macOS analog).
- **Cross-reference anchor pattern: `../admin-setup-ios/06-compliance-policy.md#[anchor]`** for deep-links from file 17 per Phase 28 D-11/D-14. Mirror style from macOS file 13 lines 122-143.
- **Placeholder retrofit is 9 line-anchored substitutions + 1 prose rewrite (D-23)** — every retrofit line confirmed via Read tool; current and proposed text captured in tables above.
- **Validation harness: inherit Phase 30's 337-line scaffold verbatim; swap the `checks` array; add 3-4 new checks per Δ19.** CRLF normalization, no-shell constraint, external-tool skip-on-ENOENT all inherited.

### File Created
`.planning/phases/31-ios-l2-investigation/31-PATTERNS.md`

### Ready for Planning
Pattern mapping complete. Planner can now reference analog patterns in PLAN.md files for each of the 10 plans CONTEXT.md will enumerate (4 runbooks + index injection + template edit + 4 retrofit-group commits + validation harness).
