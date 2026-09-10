# Feature Research

**Domain:** Windows Autopilot / Intune / AVD kiosk-class documentation corpus — v1.23 follow-through content
**Researched:** 2026-09-10
**Confidence:** MEDIUM (mix of [SOURCED] Microsoft Learn facts fetched this session, [PILOT] tenant-only observations already carried in RE-237/SEED-002, and [ASSUMED] structural inferences from corpus convention)

This is a documentation-repository milestone. "Features" below means documents, sections,
reference rows, and runbook procedures — judged against what an L2 engineer or Intune admin
needs, and against the EEE SOP standard (`docs/_standards/EEE-SOP-standard.md`) and the shipped
RE-237 recipe (`docs/recipes/06-walk-up-avd-kiosk-autologon.md`) that already govern this corpus.
Pillar labels (A–H) match `.planning/PROJECT.md`'s "Current Milestone: v1.23" target-features list.

## Feature Landscape

### Table Stakes (every new document/edit must have these)

These are corpus-mechanical requirements, not kiosk-specific — missing any of them fails the
existing harness or breaks retrieval, regardless of how good the content is.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| EEE header block + 7-key frontmatter (`doc_id`, `status`, `owner`, `doc_type`, `platform`, `last_verified`, `review_by`) | C17 hard-fails any enrolled doc missing it (STD-001, assertions 2–13) | LOW | `docs/_standards/EEE-SOP-standard.md`; copy the shape from `docs/l2-runbooks/26-apple-business-permission-denied.md` |
| Correct `doc_type` per D-02 edge-case rulings | Wrong type is a registry-review defect, not harness-caught | LOW | New L2 runbook → `Runbook`; new/extended reference rows → `Reference`; an AVD-SSO admin-setup guide → `Guide` |
| Registry row + both publish-bundle drift canaries bumped in the same commit | `docs/_registry/RE-index.md` is the sole source for the `.docx` publish bundle; PROJECT.md states any new Reference doc or L2 runbook bumps registry past 237 | LOW–MEDIUM | `docs/_registry/RE-index.md`; `build-publish-bundle.mjs` (×2 sites); `build-filename-map.mjs` |
| Hub wiring: L2 index, `quick-ref-l2.md`, Windows decision tree | HUB-WIRING-NON-BARRED-SURFACE trigger named explicitly in PROJECT.md Pillar A — hubs route to a runbook, **never** to `docs/recipes` directly | MEDIUM | `docs/l2-runbooks/00-index.md` (When-to-Use + L1 Escalation Mapping tables); `docs/quick-ref-l2.md`; `docs/decision-trees/00-initial-triage.md` (the only Windows-classic triage entry point in-corpus) |
| `[PILOT]` labeling discipline on every tenant-observed claim | RE-237 and SEED-002 both state the harness cannot validate observed-behaviour claims and a promotion review must not treat them as Learn citations | LOW (but load-bearing) | Precedent: every `**[PILOT]**` inline marker in RE-237 |
| `google-style` skill pass, Option 1, `--no-headings` | PROJECT.md "Key context" mandates this for every new sentence this milestone, with the two named hazards (mandate-promotion, passive→active) live | LOW | `docs/_standards/EEE-SOP-standard.md` "Prose Style Authoring Standard" (D-01..D-05) |
| Decision content as blockquote+table, never a fence or Mermaid | STD-04 (no Mermaid fences, C17 #1 hard-fail) and STD-05 (D-03: decision content never in a code fence) both bind any new decision point (e.g., Pillar D's licensing ruling, Pillar A's triage attribution steps) | LOW | STD-05 D-01 three-case composite block; worked example already at RE-237 Steps 2 and 4 |
| Glossary additions in alphabetical-index format | New vocabulary (Assigned Access, RestrictRun, Credential Guard/CredSSP, Remote Help unattended) must be resolvable the way every other glossary-linked term in the corpus is | LOW | `docs/_glossary.md` (RE-184) — alphabetical index line + anchor'd definition block |

### Differentiators (the kiosk-class content itself, by pillar)

| Feature | Value Proposition | Complexity | Dependencies (existing corpus) |
|---------|-------------------|------------|-------------------------------|
| **Pillar A — L2 block-dialog triage runbook** | Distinguishes a logged AppLocker packaged-app block (event ID 8025 — [SOURCED, undated] per system32.eventsentry.com/applocker/event/8025 and Splunk's AppLocker blog: 8025 fires when AppLocker blocks a packaged app under an applied rule) from a silent `RestrictRun` block that produces no log line — [PILOT] observation from SEED-002/RE-237, not documented by Microsoft as a distinct class. Adds the sensor-timestamp attribution method (`Detect-KioskAppBlocks-v6.ps1`) and the autologon-account-rotation rule (`kioskUser0`→`kioskUser1`, evaluate the second boot) as a reusable L2 procedure rather than a recipe callout | MEDIUM — new numbered file, hub wiring, decision-tree touch | RE-237 Anti-Feature table rows ("Judging a kiosk by its first logon…", "Chasing every AL8025 event to zero") already state both facts in recipe form; `assets/recipes/06-walk-up-avd-kiosk/remediations/triage-sensor/Detect-KioskAppBlocks-v6.ps1` is the sensor this runbook narrates; `docs/l2-runbooks/00-index.md`, `docs/quick-ref-l2.md`, `docs/decision-trees/00-initial-triage.md` for wiring |
| **Pillar B — Windows App child-process allow-list + failure-signature row** | Turns RE-237 Step 5's inline prose ("Remove any of them and the sign-in page renders blank / connections fail") into a lookup table other docs can cross-link instead of re-stating | LOW–MEDIUM | RE-237 Step 5 "What each line decides" bullets (`msedgewebview2.exe` → blank sign-in; `msrdc.exe` → connect fails); `docs/reference/win32-app-packaging.md` is the closest existing home, or a new small addendum inside RE-237/a reference doc |
| **Pillar B — HP OEM/consumer package inventory + accepted-residue** | Documents the exact package list that produced the dialog on this hardware class, and — critically — which residue is *accepted* rather than chased (Realtek `RtkAudUService`, Widgets remnant, PROTECTED `MicrosoftEdgeUpdate`) | LOW–MEDIUM | RE-237 Step 8 (`Remove-KioskOemBloat.ps1`, `Remove-KioskRunTasks.ps1`) and its own Anti-Feature row against over-chasing 8025 events; `docs/reference/firmware-oem-matrix.md` naming convention for an OEM-scoped reference row |
| **Pillar B — Remote Help unattended control (Windows)** | [SOURCED, 2026] per learn.microsoft.com/intune/remote-help/plan and the TechCommunity announcement: requires an Intune Suite license (not included in standalone Intune P1/P2), a physical Entra-joined or hybrid-joined corporate Windows x64 device (no VMs, no ARM), a dedicated custom-role permission ("Remote Help app > Windows unattended control remote sign-in" — not in any built-in role including Help Desk Operator), and the Remote Help app deployed as managed Win32/Store with auto-upgrade. This is a genuinely new capability (named as an August 2026 service-release item in PROJECT.md) that changes the support-tooling answer for a userless kiosk that has no logged-on user to grant attended access | MEDIUM — licensing check + custom role scoping is real admin work, not just a doc | New reference row; cross-links from RE-237 Step 9 (ConfigMgr client area) |
| **Pillar B — ConfigMgr Remote Control never over CMG** | Already documented in RE-237's own Anti-Feature table ("Configuration Manager Remote Control over a Cloud Management Gateway … never shipped for internet clients over CMG") | LOW — this is a cross-link, not new research | RE-237 line ~48; Pillar B's job is promoting it to a standalone reference row so other docs (not just this recipe) can cite it |
| **Pillar B — Credential Guard / CredSSP saved-credential failure** | Credential Guard (default-on Windows 11 22H2+ Enterprise) blocks CredSSP delegation of saved credentials by design — this is documented Microsoft behavior, though the specific client-side message text ("server's authentication policy does not allow … saved credentials" appearing even with no such policy on the target) is [PILOT]-observed, not a Microsoft-stated string. The fix is either a Kerberos-clean target or AVD host-pool Entra SSO (Pillar C) | LOW–MEDIUM | Feeds directly from/to Pillar C; new reference row, likely alongside the licensing-matrix.md or a new small reference doc |
| **Pillar C — AVD host-pool Entra SSO (`enablerdsaadauth`)** | [SOURCED, learn.microsoft.com/azure/virtual-desktop/configure-single-sign-on, current] Confirms: `enablerdsaadauth=1` on the host pool; a Kerberos Server object is required when the session host is Entra hybrid-joined (and required for on-prem resource access — SMB, Windows-integrated auth — even for Entra-only-joined hosts with AD present); the Windows Cloud Login service principal's `targetDeviceGroups` property hides the consent prompt (managed via `Remove-MgServicePrincipalRemoteDesktopSecurityConfigurationTargetDeviceGroup` and its `New-`/`Get-` counterparts); a Conditional Access review is part of the documented flow. This single-prompt sign-in is also the structural fix for the Credential Guard/CredSSP failure above | MEDIUM–HIGH | Whether this lands as an RE-237 delta or a standalone admin-setup Guide is explicitly an open discuss-phase decision per PROJECT.md; either way it depends on `docs/admin-setup-apv1/*` Guide conventions and cross-links from RE-237 and the Pillar B Credential Guard row |
| **Pillar D — Licensing/hardware standard decision record** | Converts an already-half-written [ASSUMED]/reasoned-not-tested statement into a ruled decision. `docs/reference/licensing-matrix.md` already carries the exact placeholder language: "Not pilot-tested—stated as reasoning from the licensing structure, not as an observation." This pillar's entire job is resolving that placeholder with a tested or owner-ruled answer (MAK per-device Enterprise vs. IoT Enterprise vs. clean-image hardware) and stating its consequence for Shell Launcher return / OEM-cleanup remediation-class retirement | LOW–MEDIUM (small diff, high-stakes ruling) | `docs/reference/licensing-matrix.md:70-76`; RE-237 Step 4's decision table and Prerequisites section (the `Class is not licensed for use` [PILOT] finding) |
| **Pillar E — Vendor De-Bloat into Kiosk Baseline** | Reuses the exact vendoring pattern RE-237 already ships for the Windows App scripts (pin at a GitHub-API-confirmed commit SHA, Authenticode re-sign, `NOTICE`-style attribution) for a third-party community script (`andrew-s-taylor/public` De-Bloat) | MEDIUM — supply-chain governance, not just prose | RE-237 "Asset Provenance" section already names this exact gap and its resolution method verbatim ("if a fleet later adopts it, vendor it at a GitHub-API-confirmed pinned commit SHA the same way the Windows App files above are vendored"); RE-237 Step 8's "Ask the admin" table already has the `RemoveBloat.ps1 -customwhitelist` row waiting for this decision; lands under `assets/recipes/06-walk-up-avd-kiosk/package-sources/kiosk-baseline/` |
| **Pillar F — STORIS SCiX ClickOnce kiosk investigation** | Per-user ClickOnce install running inside a kiosk (non-interactive, autologon) account via a wrapper, with EULA-acceptance location traced. Highest uncertainty of all eight pillars — `Trace-StorisEula.ps1` ships in the asset tree already but is explicitly marked "untested" in RE-237's own Verification section | MEDIUM–HIGH, high uncertainty | `assets/recipes/06-walk-up-avd-kiosk/diagnostics/Trace-StorisEula.ps1`; outcome is genuinely open — a new recipe step, or a documented negative (see Anti-Features) |
| **Pillar G — Riders (glossary + `DEFER-121-07-A` cleanup)** | Housekeeping, not new investigation — kiosk vocabulary needs to resolve the same way every other glossary-linked term does; nine placeholder Version-History dates need filling so a structurally un-acknowledgeable row set stops resurfacing at every milestone close | LOW | `docs/_glossary.md`; `.planning/milestones/v1.22-DEFERRED-CLEANUP.md` (named in PROJECT.md, not required reading here) |
| **Pillar H — Harness close** | Mechanical milestone-close housekeeping (`V122-PIN-DEFERRAL`, `C17-FROZEN-AWARE-RESIDUE-V22`, 21st Path-A lineage bump) — not a documentation "feature" in the reader-facing sense; belongs in its own final phase per standing convention, never batched with content phases | N/A (harness, not content) | Out of scope for this FEATURES.md; flagged here only so the roadmap does not mis-file it as a content pillar |

### Anti-Features (things that look right for this milestone but aren't)

| Feature | Why it looks appealing | Why it's a problem | Do this instead |
|---------|------------------------|---------------------|------------------|
| Hub (L2 index / quick-ref-l2 / decision tree) linking straight to `docs/recipes/06-walk-up-avd-kiosk-autologon.md` for the block-dialog symptom | Fewer hops, RE-237 already documents the anti-pattern in its own Anti-Feature table | Violates the explicitly named HUB-WIRING-NON-BARRED-SURFACE trigger — hubs must route to a runbook; `docs/recipes` is provisioning-walkthrough content, not L2 investigation content, and mixing the two collapses the corpus's audience separation | Author Pillar A as its own `docs/l2-runbooks/NN-` file; that file cross-links to RE-237, not the other way around for triage entry |
| Presenting a `[PILOT]` observation (e.g., the exact CredSSP client-side error string, or "RestrictRun blocks do not log") as if Microsoft documents it | Reads more authoritative, saves a caveat sentence | This is precisely the mandate-promotion / fabricated-citation failure mode the corpus has already been burned by (per user memory: "gsd-project-researcher fabricated a first-party quote"); RE-237's whole design is to keep tenant observations visibly separate from Learn citations | Keep every tenant-only claim behind a bold `**[PILOT]**` marker, exactly as RE-237 does |
| Chasing every residual AL8025 event on the factory image to zero as part of Pillar A/B | Feels like thoroughness | RE-237 already documents this as counter-productive: some 8025 events are suppressed, harmless, and self-restoring (Realtek, Widgets, `MicrosoftEdgeUpdate`) — churn without benefit, and risks disabling `MicrosoftEdgeUpdate`, which services the WebView2 the sign-in page depends on | State the accepted-residue list explicitly (Pillar B) and extend removal lists only for a dialog-thrower or a clearly consumer-facing app, per RE-237's own rule |
| A third lockdown/kiosk recipe, or edits to `SHARED-TAXONOMY-DOC` | Tempting scope creep once you're deep in kiosk content | Explicitly barred in PROJECT.md ("`SHARED-TAXONOMY-DOC` stays barred — no third lockdown recipe ships") | Extend RE-237/RE-224/RE-222 and reference docs; do not create a fourth kiosk-class recipe |
| Duplicating the Windows App child-process table verbatim into the new L2 runbook, the new reference doc, and RE-237 | Convenient copy-paste, avoids a cross-link | Corpus anti-redundancy convention (D-04, shipped precedent at RE-068: "Per-leaf deep-dives live in the routed-to docs; content is not duplicated here") | Single-source the table in the reference doc; runbook and recipe both cross-link to it |
| Vendoring the De-Bloat script without a pinned commit SHA or re-signing | Fastest path to "it's in the package" | Exactly the supply-chain gap RE-237's own Asset Provenance section flags as unacceptable until resolved this way | Pin at a GitHub-API-confirmed commit SHA, Authenticode-sign, attribute via the existing `NOTICE` pattern — mirror the Windows App vendoring already shipped |
| Authoring Pillar A's or Pillar D's decision content as a Mermaid diagram or inside a fenced code block | Feels like the "natural" way to draw a triage flow or a licensing decision | STD-04 D-02 keeps C17 assertion #1 as an unconditional hard-fail on `^```mermaid`; STD-05 D-03 bans decision content in a fence — fenced content indexes only as non-prose, poorly-retrieved text | Use the STD-05 three-case composite blockquote+table block, same shape as RE-237 Steps 2/4 and the RE-068 decision table |
| Treating Pillar F's outcome as required to be a shipped recipe step | Sunk-cost pressure since the diagnostic script is already committed | `Trace-StorisEula.ps1` is explicitly untested; forcing a positive recipe result risks documenting something that doesn't actually work | A documented negative ("ClickOnce-in-kiosk-account does not work because X, do Y instead") is a legitimate, valuable outcome — RE-237's own Prerequisites/Anti-Feature tables already model this honesty pattern |

## Feature Dependencies

```
Pillar A (L2 triage runbook)
    └──requires──> RE-237 Anti-Feature rows (rotation rule, AL8025 anti-chase) [existing]
    └──requires──> Detect-KioskAppBlocks-v6.ps1 [existing asset]
    └──requires──> docs/l2-runbooks/00-index.md, quick-ref-l2.md, decision-trees/00-initial-triage.md (hub wiring)
    └──enhances──> Pillar B (child-process table, OEM inventory feed the runbook's evidence steps)

Pillar B (reference rows)
    ├── Windows App child-process table ──requires──> RE-237 Step 5 prose (source of truth to extract from)
    ├── HP OEM inventory ──requires──> RE-237 Step 8 (Remove-KioskOemBloat.ps1 / Remove-KioskRunTasks.ps1)
    ├── Remote Help unattended ──requires──> [SOURCED] Intune Suite license + custom role (new fact, no in-corpus precedent)
    ├── ConfigMgr-not-over-CMG ──requires──> RE-237 Anti-Feature table (already stated, just promoted to reference)
    └── Credential Guard/CredSSP ──requires──> Pillar C (SSO is the structural fix)
                                    └──conflicts with──> "just disable Credential Guard" (never proposed; would remove a security baseline)

Pillar C (AVD host-pool Entra SSO)
    └──requires──> Kerberos Server object (hybrid-joined hosts) [SOURCED]
    └──requires──> service-principal targetDeviceGroups config [SOURCED]
    └──enhances──> Pillar B's Credential Guard row (SSO is its fix)
    └──open question──> RE-237 delta vs. standalone admin-setup Guide (discuss-phase decision)

Pillar D (licensing/hardware decision record)
    └──requires──> docs/reference/licensing-matrix.md:70-76 (existing reasoned-not-tested placeholder)
    └──requires──> RE-237 Step 4 decision table (Shell Launcher vs. multi-app branch)
    └──determines──> whether Shell Launcher (V2:AllAppsFullScreen) returns as the delivery mechanism
    └──determines──> whether the OEM-cleanup remediation class (Pillar B / RE-237 Step 8) retires

Pillar E (De-Bloat vendoring)
    └──requires──> RE-237 Asset Provenance section's stated resolution method (pin, re-sign, NOTICE)
    └──requires──> RE-237 Step 8 "Ask the admin" table (already has the fork waiting)

Pillar F (STORIS ClickOnce)
    └──requires──> Trace-StorisEula.ps1 [existing, untested asset]
    └──conflicts with──> shipping a positive recipe step before the EULA-acceptance mechanism is actually traced

Pillar G (Riders) ──enhances──> every pillar above (glossary links make each new term resolvable)

Pillar H (Harness close) ──sequenced after──> all content pillars (own final phase, never batched)
```

### Dependency Notes

- **Pillar A requires Pillar B's extracted tables to be genuinely useful as an investigation aid** — a triage runbook that says "check the child-process allow-list" is much weaker than one that links to a table naming the exact failure signature per missing process.
- **Pillar C enhances Pillar B's Credential Guard row**: the CredSSP failure and the SSO fix are two halves of one story; documenting the failure without a working fix (or vice versa) leaves an L2 engineer stuck.
- **Pillar D determines Pillar B's OEM-cleanup content's shelf life**: if the licensing ruling brings Shell Launcher back into scope, the entire OEM-bloat-remediation reference material's device class narrows (Shell Launcher is a different, simpler shell-replacement branch, not multi-app Assigned Access) — sequence Pillar D before finalizing Pillar B's OEM rows if possible, or explicitly scope Pillar B's rows to the multi-app branch only.
- **Pillar F conflicts with premature completion pressure**: because `Trace-StorisEula.ps1` is untested, this pillar's dependency graph terminates in either a new recipe step (if the trace succeeds) or a documented negative (if it doesn't) — the roadmap should treat both as valid, complete outcomes, not treat "documented negative" as a failed phase.

## MVP Definition

### Launch With (v1.23 core)

- [ ] Pillar A — L2 kiosk block-dialog triage runbook, fully hub-wired — this is the pillar the milestone's own PROJECT.md names as the HUB-WIRING trigger; shipping the recipe-embedded version only (status quo) leaves the stated goal unmet
- [ ] Pillar B — Windows App child-process + HP OEM reference rows — directly extends what RE-237 already half-states; low risk, high reuse value
- [ ] Pillar D — Licensing/hardware decision record — small diff, but it gates Pillar B's long-term scope and RE-237's Step 4 fork; resolving it early avoids re-work
- [ ] Pillar G — Glossary riders + `DEFER-121-07-A` date fill — cheap, removes a recurring close-time irritant

### Add After Core Validated (still v1.23, sequence after the above)

- [ ] Pillar B — Remote Help unattended + Credential Guard/CredSSP rows — genuinely new external facts this session sourced; worth a licensing/role-scoping sanity check before publishing as prescriptive
- [ ] Pillar C — AVD host-pool Entra SSO — explicitly flagged as a discuss-phase decision (delta vs. standalone Guide); don't pre-decide the doc shape in research
- [ ] Pillar E — De-Bloat vendoring — mechanically well-understood (mirrors existing pattern) but needs an actual reviewed commit SHA before it can ship, which is an owner action, not just writing

### Investigate, May Not Ship This Milestone

- [ ] Pillar F — STORIS ClickOnce — the pilot device work here is unfinished; treat "documented negative" as an acceptable, complete outcome rather than deferring the whole pillar

### Always Last

- [ ] Pillar H — Harness close, own final phase, never batched with content (standing convention, not this milestone's invention)

## Sources

- [Configure single sign-on for Azure Virtual Desktop using Microsoft Entra ID](https://learn.microsoft.com/en-us/azure/virtual-desktop/configure-single-sign-on) — [SOURCED] `enablerdsaadauth`, Kerberos Server object requirement for hybrid-joined hosts (and for on-prem resource access generally), `targetDeviceGroups` on the Windows Cloud Login service principal, Conditional Access review step. No visible page-level publish date captured in this fetch; treat the mechanism claims as current Microsoft Learn content, re-verify the rendered `ms.date` before citing in the actual doc per this corpus's own citation convention.
- [Plan for Remote Help with Microsoft Intune](https://learn.microsoft.com/en-us/intune/remote-help/plan) and [Remote Help on Windows: Unattended Support with Remote Sign-In](https://techcommunity.microsoft.com/blog/intunecustomersuccess/remote-help-on-windows-unattended-support-with-remote-sign-in-is-here/4549772) — [SOURCED] Intune Suite license requirement, physical/Entra-joined/Entra-hybrid-joined x64 device requirement (no VMs/ARM), dedicated custom-role permission not present in any built-in role, managed Win32/Store app deployment requirement.
- [AppLocker Event ID 8025 reference](https://system32.eventsentry.com/applocker/event/8025) and the Splunk "Deploy, Test, Monitor: Mastering Microsoft AppLocker, Part 2" post — [SOURCED, no visible publish date on the eventsentry page] 8025 corresponds to a packaged-app block logged under an applied AppLocker rule; corroborates (but does not independently confirm) SEED-002's [PILOT] claim that `RestrictRun` blocks are the silent counterpart.
- `docs/recipes/06-walk-up-avd-kiosk-autologon.md` (RE-237) — [PILOT]-labeled tenant observations throughout; the primary in-corpus source for nearly every pillar's starting material.
- `.planning/seeds/SEED-002-walk-up-avd-kiosk-recipe.md` — carried backlog items (§B, §D) that this milestone's pillars directly resolve.
- `docs/reference/licensing-matrix.md` (RE-157) — existing reasoned-not-tested licensing language Pillar D must resolve.
- `docs/_standards/EEE-SOP-standard.md` (STD-001) — structural/table-stakes rules (STD-04 Mermaid policy, STD-05 decision-block format, Prose Style Authoring Standard).
- `docs/l2-runbooks/26-apple-business-permission-denied.md` (RE-068) and `docs/l2-runbooks/00-index.md` (RE-043) — shape reference for the new L2 runbook and its hub wiring.
- `docs/_registry/RE-index.md` — registry format and existing RE-222/RE-224/RE-237/RE-157 rows.

---
*Feature research for: Windows Autopilot/Intune/AVD kiosk-class documentation, v1.23 milestone*
*Researched: 2026-09-10*
