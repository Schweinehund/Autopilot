# Phase 39: Zero-Touch Enrollment + AOSP Stub — Research

**Researched:** 2026-04-23
**Domain:** Documentation — Android Enterprise Zero-Touch Enrollment (corporate-scale admin operations) + AOSP stub authoring with hard scope guard
**Confidence:** HIGH overall (all six STATE.md research flags re-verified against canonical sources this session; Context7 not applicable to documentation phase)

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

Verbatim from `39-CONTEXT.md <decisions>` block. Planner MUST honor these; research does not re-open them.

**GA1 winner 1A — ZTE extension structural placement + device-claim depth:**

- **D-01:** Single appended H2 block `## Corporate-Scale Operations` at position 7 of `docs/admin-setup-android/02-zero-touch-portal.md` — AFTER Phase 35's `## KME/ZT Mutual Exclusion (Samsung)` and BEFORE Phase 35's `## Verification`. Six H3 sub-sections under the H2:
  1. `### Reseller-Upload Handoff Workflow` (anchor `#reseller-upload-handoff`)
  2. `### Device Claim Workflow` (anchor `#device-claim-workflow`)
  3. `### Profile Assignment at Scale` (anchor `#profile-assignment`)
  4. `### Dual-SIM IMEI 1 Registration` (anchor `#dual-sim-imei-1`)
  5. `### KME/ZT Mutual Exclusion — At Device Claim` (anchor `#kme-zt-device-claim`)
  6. `### Configuration Must Be Assigned` (anchor `#configuration-must-be-assigned`) — with prose cross-link to Phase 35's `#dpc-extras-json`
  Device-claim UI discipline: decision-points-as-prose + Google canonical link + existing `<!-- verify UI at execute time -->` HTML-comment pattern (Phase 35 lines 48, 50, 72, 73).
- **D-02:** H2 title is "Corporate-Scale Operations" (NOT "Zero-Touch Enrollment at Scale").
- **D-03:** `### Configuration Must Be Assigned` H3 opens with a prose cross-link to Phase 35's `#dpc-extras-json` at natural point of admin decision (satisfies PITFALL 2 without violating D-22 append-only).
- **D-04:** Device-claim workflow source-strategy is decision-points-as-prose + Google canonical link + HTML-comment verify-UI + source-confidence markers only on assertions that cannot be re-sourced (NOT on every portal step).
- **D-05:** Dual-SIM IMEI 1 H3 opens with assertion + single inline marker `[MEDIUM: Google Developers Zero-touch known issues, last_verified YYYY-MM-DD]`. **NOTE: this research session verified the claim against Google canonical sources — planner should consider upgrading to HIGH confidence per Open Question OQ-1 below.**
- **D-06:** `### KME/ZT Mutual Exclusion — At Device Claim` H3 is the device-claim-step-specific callout, distinct from Phase 35's top-of-page + link-step callouts. Cross-links Phase 35 `#kme-zt-mutual-exclusion`; does NOT restate Phase 35 content.

**GA2 winner 2B — AOSP OEM matrix shape:**

- **D-07:** RealWear-spotlight H3 + enumerate-all-MS-Learn-OEMs bulleted list + PITFALL-7-mandated "not supported" framing + deferred-content table as separate H2. Sub-structure:
  - `### RealWear (confirmed GA)` H3 (anchor `#realwear-confirmed-ga`) — HMT-1, HMT-1Z1, Navigator 500; AR/VR headset usage; Wi-Fi credential embedding requirement; QR-only enrollment; `[HIGH: MS Learn aosp-supported-devices, last_verified YYYY-MM-DD]`
  - `### Other AOSP-Supported OEMs` H3 (anchor `#other-aosp-supported-oems`) — complete enumeration per D-09; PITFALL-7 framing per D-10.
- **D-08:** No inline "Notes" column in OEM matrix (Anti-Pattern 1 / PITFALL 12 guard).
- **D-09:** Complete enumeration of MS Learn OEM list — 8 OEMs as of 2026-04-23 verified: DigiLens, HTC, Lenovo, Meta, PICO, RealWear, Vuzix, Zebra.
- **D-10:** PITFALL-7-mandated framing on non-RealWear OEMs: "Per v1.4 scope, per-OEM enrollment mechanics for non-RealWear OEMs are deferred to v1.4.1. If GMS is present on these devices, use Android Enterprise fully managed instead of AOSP." Non-negotiable.

**GA3 winner 3B — AOSP stub scope-guard enforcement:**

- **D-11:** Fixed H2 section whitelist for `06-aosp-stub.md`, exactly 9 sections in order, no more, no fewer:
  1. `## Scope and Status`
  2. `## What AOSP Is`
  3. `## When to Use AOSP`
  4. `## Supported OEMs`
  5. `## Enrollment Constraints`
  6. `## Prerequisites and Licensing`
  7. `## Deferred Content`
  8. `## See Also`
  9. `## Changelog`
  AEAUDIT-04 (Phase 42) mechanically checks names, count, and order.
- **D-12:** `## Deferred Content` H2 has NO version suffix. V1.4.1 target lives in table rows.
- **D-13:** `## Enrollment Constraints` H2 body MUST include: QR-only (with version tag), one-device-at-a-time (with version tag), Wi-Fi credential embedding for RealWear (explicit prose; cross-link to `#realwear-confirmed-ga`). Enforcement at plan-task-specs level, not audit-regex.
- **D-14:** Intune Plan 2 / Suite licensing research-flag re-verification protocol. See Open Question OQ-2 below — this research session could NOT close the flag authoritatively; plan-time re-verification still required.

**GA4 winner 4B — Phase 39 PLAN structure:**

- **D-15:** Two plans, parallelizable within Phase 39:
  - `39-01-PLAN.md` — ZTE extension to `02-zero-touch-portal.md`, maps AEZTE-01
  - `39-02-PLAN.md` — new `06-aosp-stub.md`, maps AEAOSP-01
  Both run W0 / W1 / W2 in parallel (per STATE.md v1.4 decision + ROADMAP line 173).

**Cross-cutting:**

- **D-16:** Frontmatter schema — `platform: Android`, `audience: admin`, `applies_to: ZTE` (39-01 inherits Phase 35's; updates `last_verified` + `review_by`) / `applies_to: AOSP` (39-02 new file; fresh 60-day window).
- **D-17:** Anchor stability contract — 9 locked anchors for Phase 40/41/42 consumers: `#reseller-upload-handoff`, `#device-claim-workflow`, `#profile-assignment`, `#dual-sim-imei-1`, `#kme-zt-device-claim`, `#configuration-must-be-assigned`, `#realwear-confirmed-ga`, `#other-aosp-supported-oems`, `#deferred-content`. Published via `<a id="...">` scaffolding.
- **D-18:** Shared-file modification guard — NO modifications to `common-issues.md`, `quick-ref-l1.md`, `quick-ref-l2.md`, `docs/index.md`, `_glossary.md`, `_glossary-macos.md`, `_glossary-android.md`, any `admin-setup-ios/`, `admin-setup-macos/`, `l1-runbooks/`, `l2-runbooks/`, `end-user-guides/`, other `admin-setup-android/` files (except `02-zero-touch-portal.md` via D-01 append + new `06-aosp-stub.md`), any `android-lifecycle/`, any `_templates/`.
- **D-19:** 3-wave plan structure (W0 verify / W1 author / W2 audit) matching Phases 36/37/38 precedent. 39-01 W0 is anchor-stability verify; 39-02 W0 is research-flag re-verification (no pre-existing file).
- **D-20:** Source-confidence marker regex (Phase 37 D-11 verbatim): `\[(HIGH|MEDIUM|LOW)(: [A-Za-z ]+)?(, last_verified \d{4}-\d{2}-\d{2})?\]`. Applied to: dual-SIM (MED — but see OQ-1), device-claim UI specifics at executor discretion, AOSP OEM matrix source (HIGH), Intune Plan 2 licensing (MED if inference / HIGH if verified), token 90-day expiry (MED per STATE.md).
- **D-21:** ARCH Q6 Platform note banner mandatory for AOSP stub (Phase 38 D-10 inheritance). Body locked: "AOSP (Android Open Source Project) management in Intune is a distinct enrollment surface from Android Enterprise (COBO/BYOD/Dedicated/ZTE). AOSP devices have no GMS, no FCM push, and no Managed Google Play — this is structurally distinct from iOS User Enrollment (which has user identity) and macOS Automated Device Enrollment (which has Apple ID). For cross-platform comparison, see [Android enrollment overview](../android-lifecycle/00-enrollment-overview.md#aosp)." ZTE extension inherits Phase 35's existing framing (no new banner).
- **D-22:** Research-flag verification protocol — plan-time re-verify 6 flags (portal UI, AOSP supported-devices, Intune Plan 2/Suite, reseller-upload handoff, dual-SIM known-issues, token expiry). **This RESEARCH.md closes 4 of 6 outright; OQ-1 and OQ-2 document the residual work.**
- **D-23:** Executor parallelization discipline — 39-01 and 39-02 parallelizable; numbering chronological not ordering.

### Claude's Discretion

- Exact word counts within envelopes — AOSP stub 600-900 words per PITFALL 12 "≤2 pages"; appended `## Corporate-Scale Operations` block 600-800 words across 6 H3s.
- Exact prose for PITFALL-7-mandated "not supported under AOSP" framing (assertion locked; phrasing author's).
- Whether to include small mermaid diagram in ZTE extension (Reseller → Upload → Customer Claim → Configuration Assign → Device First-Boot) — not required.
- Deferred-content table column design (4-column "Topic / Current state in v1.4 / Target / Rationale" suggested; 3-column also works).
- Cross-platform callout presence for non-RealWear OEMs (PITFALL 7 framing mandatory; additional per-OEM cross-platform notes author's discretion).
- See Also section composition.
- Cross-link wording from `### Configuration Must Be Assigned` back to `#dpc-extras-json`.
- Whether `## Verification` Phase 35 section gets new `- [ ]` checkbox or prose update.

### Deferred Ideas (OUT OF SCOPE for Phase 39)

- Per-OEM (non-RealWear) AOSP enrollment steps → v1.4.1
- AOSP user-associated vs userless full coverage → v1.4.1
- Knox Mobile Enrollment full admin path → v1.4.1 (Phase 39 carries only device-claim-step mutual-exclusion callout)
- COPE full admin path → Phase 36 COBO migration-note scope (not Phase 39)
- Android 15 FRP re-provisioning content → Phase 36 (COBO) / Phase 38 (Dedicated) own
- ZTE L1 triage runbook 27 → Phase 40 owns
- AOSP L1/L2 runbooks → v1.4.1 (PITFALL 12 explicit scope)
- Android mode-first triage decision tree → Phase 40 scope
- Phase 41 L2 log-collection and investigation runbooks → Phase 41 scope
- Android capability matrix + milestone audit → Phase 42
- Cross-platform navigation integration → Phase 42 (index.md stub) + post-v1.4 unification task (common-issues / quick-refs / full index)
- Reciprocal `_glossary-macos.md` → `_glossary-android.md` cross-reference → Phase 42 AEAUDIT-03
- ZT portal migration for legacy consumer Gmail bindings → Phase 35 D-14 deferred to v1.4.1
- 4-platform comparison document → v1.5
- AOSP OEM full behavioral matrix / per-OEM failure catalog → v1.4.1 AEAOSPFULL-04
- Samsung Knox Workspace / E-FOTA / DeX MDM → v1.4 Out of Scope per PROJECT.md
- AOSP enrollment for mainstream Android phones/tablets → not supported (MS Learn list is AR/VR + wearable scanners only)
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description (verbatim from REQUIREMENTS.md) | Research Support |
|----|---------------------------------------------|------------------|
| AEZTE-01 | Intune admin can deploy Zero-Touch Enrollment with mode-specific admin content (extending the Phase 35 ZT portal doc) — reseller-upload handoff, device claim workflow, profile assignment, dual-SIM IMEI 1 note, and KME/ZT mutual-exclusion callout | MS Learn `ref-corporate-methods` page (verified 2026-04-23, `ms.date: 2025-12-04`, `updated_at: 2026-04-16`) confirms Method A/B linking, default-config-overrule behavior, and explicit reseller-side punt to Google canonical. Google AE Help answer/7514005 + Google Developers known-issues confirm dual-SIM IMEI 1 and KME mutual-exclusion text verbatim (upgrades dual-SIM from MEDIUM to HIGH — see OQ-1). |
| AEAOSP-01 | Intune admin can read an AOSP stub guide (`docs/admin-setup-android/06-aosp-stub.md`) with explicit scope callout ("stub in v1.4; full v1.4.1"), what AOSP is, when to use it, OEM matrix from MS Learn (RealWear confirmed GA), QR-only enrollment note, one-device-at-a-time note, Wi-Fi credential embedding requirement (RealWear-specific), and deferred-content table | MS Learn `aosp-supported-devices` page re-verified 2026-04-23 (`ms.date: 2025-05-12`, `updated_at: 2026-04-16`) — 8 OEMs (DigiLens, HTC, Lenovo, Meta, PICO, RealWear, Vuzix, Zebra) with exact device-model list and minimum-firmware column confirmed. No GA-status column; no preview markers — all listed devices are in the "supported" table without qualification. Matches D-09 enumeration. |

Planner maps each requirement to plan tasks via the research findings above; both requirements are **independently plannable** (AEZTE-01 → 39-01-PLAN.md; AEAOSP-01 → 39-02-PLAN.md) per D-15.
</phase_requirements>

## Summary

Phase 39 is a **pure documentation phase** delivering TWO artifacts against Phases 34-38 foundation: (1) an appended H2 block `## Corporate-Scale Operations` into Phase 35's shipped `docs/admin-setup-android/02-zero-touch-portal.md`, and (2) a new hard-scoped `docs/admin-setup-android/06-aosp-stub.md`. Both artifacts are authored against canonical sources that this research session re-verified (MS Learn AOSP page updated 2026-04-16; MS Learn ref-corporate-methods page updated 2026-04-16; Google AE Help answer/7514005; Google Developers known-issues). The adversarial-review output in `39-CONTEXT.md` locks 23 decisions (D-01..D-23) that answer every gray area — structural placement (1A), OEM matrix shape (2B), scope-guard mechanism (3B), plan structure (4B) — with full rationale in `39-DISCUSSION-LOG.md`.

Technically there is no code, no test framework, no library dependencies, and no framework choice: the "stack" is Markdown + frontmatter + git + grep-audit. Validation is grep-based mechanical checks (Phase 35's pattern reused; Phase 42 AEAUDIT-04 is the canonical audit layer). The "Architectural Responsibility Map" below is documentation-tier by nature but is included to flag which decisions belong to Phase 39 versus which are consumed from Phase 34/35 or deferred to Phase 40/41/42.

**Critical research findings delivered this session:**

1. **MS Learn AOSP page confirmed fresh** — `updated_at: 2026-04-16` (7 days before this research). All 8 OEMs + per-OEM device models + minimum-firmware column verified byte-for-byte against D-09 enumeration. `ms.date: 2025-05-12` (header-level doc date, not stale — that was the research snapshot baseline) but the git-backed `updated_at` marker is recent.
2. **MS Learn ZTE linking page confirmed fresh** — `updated_at: 2026-04-16`. DPC extras JSON blob in MS Learn is **byte-for-byte identical** to Phase 35's shipped skeleton (same `I5YvS0O5hXY46mb01BlRjq4oJJGs2kuUcHvVkAPEXlg` checksum; same field names; same structure). Phase 35's D-20 JSON is current.
3. **Dual-SIM IMEI 1 claim verifiable at HIGH confidence** — Google AE Help answer/7514005 explicitly states "It's recommended for the resellers to register dual-SIM devices with the numerically lowest IMEI number" AND Google Developers known-issues says "prefer the numerically lowest IMEI number as zero-touch enrollment works more reliably with the lowest IMEI." D-05 MEDIUM marker is defensible but research supports HIGH — flagged as OQ-1 for planner resolution.
4. **KME mutual-exclusion verbatim Google text captured** — Google Developers known-issues: "It is not recommended to configure zero-touch and KME on the same device. Configuring the device in both services is likely to cause confusion as the configurations can be out of sync, which is difficult to debug if the device experiences further issues." Google AE Help answer/7514005 adds the failure-mode detail: "If a device is registered and configured in both Knox Mobile Enrollment and zero-touch, the device will enroll using Knox Mobile Enrollment." This is load-bearing content for `### KME/ZT Mutual Exclusion — At Device Claim` H3 (D-06).
5. **STACK.md SPARSE DOC FLAG re-verified as real** — MS Learn `ref-corporate-methods` explicitly punts reseller-side workflow to Google canonical: "For more information, such as prerequisites, where to purchase devices, and how to associate a Google Account with your corporate email, see Zero-touch enrollment for IT admins (opens Android Enterprise Help docs)." D-04 decision-points-as-prose discipline is aligned with source reality.
6. **STATE.md-referenced URL `support.google.com/work/android/answer/9040598` is STALE (404)** — this URL appears in STATE.md Phase 39 research flag #5 and CONTEXT.md D-22. Canonical IT-admin-facing URL is `support.google.com/work/android/answer/7514005`. Planner must update the "See also" link in 39-01-PLAN.md task specs.

**Primary recommendation:** Proceed to planning with CONTEXT.md D-01..D-23 verbatim as the structural contract. Two PLANs. 39-01 uses the verified MS Learn ref-corporate-methods content for Method A/B nuance (default-config-overrule caveat is load-bearing for `### Configuration Must Be Assigned` H3). 39-02 uses the verified MS Learn aosp-supported-devices 8-OEM table for D-09 complete enumeration. Unresolved items (OQ-1 dual-SIM confidence uplift; OQ-2 Intune Plan 2/Suite licensing) are LOW-impact on planning — planner can commit to MED marker as fallback and let executor upgrade at execute-time if verifiable.

## Architectural Responsibility Map

This is a documentation phase with no runtime tiers. The "responsibility map" below distinguishes authoring ownership so the planner can verify task assignments align with the D-22 append-only contract from Phase 35.

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| ZTE portal setup mechanics (Step 0, account creation, ZT↔Intune linking Methods A/B, DPC extras JSON) | Phase 35 SHIPPED (locked — no re-author) | — | Phase 35's `02-zero-touch-portal.md` owns; Phase 39 does not duplicate or modify (D-22 append contract) |
| ZTE corporate-scale operations (reseller-upload handoff, device claim, profile assignment at scale, dual-SIM IMEI 1, KME/ZT at device-claim, config-must-be-assigned) | Phase 39 (this phase, 39-01-PLAN) | — | AEZTE-01 SC1 + D-01 appended H2 block |
| AOSP stub content (scope callout, what/when, OEM matrix, enrollment constraints, licensing, deferred) | Phase 39 (this phase, 39-02-PLAN) | — | AEAOSP-01 + D-07, D-11 |
| ZTE L1 triage runbook 27 | Phase 40 | — | STATE.md v1.4 decision; Phase 39 publishes anchor contract, not the runbook |
| AOSP L1/L2 runbooks | DEFERRED to v1.4.1 | — | PITFALL 12 + ROADMAP Phase 39 SC5 explicit scope |
| Android mode-first triage decision tree | Phase 40 | — | Phase 39 does not preempt |
| Phase 41 L2 log-collection / investigation | Phase 41 | — | AOSP has no Phase 41 consumer in v1.4 |
| Phase 42 AEAUDIT-04 mechanical audit (H2 whitelist, anchor presence, SafetyNet/supervision greps, frontmatter scan) | Phase 42 | Phase 39 outputs are audit INPUT | Phase 39 must produce outputs that PASS the audit per D-11 / D-17 |
| Cross-platform nav integration (index.md Android stub) | Phase 42 AEAUDIT-02 | — | Phase 39 explicitly NOT in scope |
| Full cross-platform nav (common-issues, quick-refs, full index) | Post-v1.4 unification | — | PROJECT.md decision; PITFALL 9/11 guard |
| Android capability matrix | Phase 42 AEAUDIT-01 | — | Phase 39 does not preempt |
| Reciprocal `_glossary-macos.md` → `_glossary-android.md` cross-ref | Phase 42 AEAUDIT-03 | — | Phase 39 does NOT touch `_glossary-macos.md` |
| Knox Mobile Enrollment full admin | DEFERRED to v1.4.1 AEKNOX-01..04 | — | Phase 39 D-06 carries only mutual-exclusion callout |

## Standard Stack

Documentation-phase "stack" — no runtime libraries. Entries below are authoring tools and structural conventions inherited from Phases 34-38.

### Core

| Library / Tool | Version | Purpose | Why Standard |
|----------------|---------|---------|--------------|
| Markdown (GitHub Flavored) | GFM | Doc format | Inherited from v1.0-v1.4; no change [VERIFIED: shipped across 120+ docs] |
| YAML frontmatter | — | Metadata (`platform`, `audience`, `applies_to`, `last_verified`, `review_by`) | D-16 schema; inherited from Phase 36 D-13 / Phase 37 D-15 / Phase 38 D-18 precedent [VERIFIED: Phase 35-38 shipped files] |
| HTML anchor scaffolding (`<a id="...">`) | — | Stable anchors for downstream cross-references | D-17 locks 9 anchors; Phase 35-38 precedent [VERIFIED: Phase 35's `02-zero-touch-portal.md` uses this pattern on lines 23, 32, 43, 56, 88, 119, 137] |
| HTML-comment verify-UI pattern (`<!-- verify UI at execute time -->`) | — | Portal-UI-drift resilience | Phase 35 shipped file lines 48, 50, 72, 73 [VERIFIED: Phase 35 `02-zero-touch-portal.md`] |
| HTML-comment subtractive-deletion pattern (`<!-- The #### In X subsection is intentionally omitted. -->`) | — | Template reuse when some H4 sub-sections don't apply | Phase 34 D-17; AOSP stub omits both MGP and ZT portal H4 sub-sections [VERIFIED: Phase 35's doc uses this for MGP subsection omission at line 20-21] |
| Source-confidence marker regex | `\[(HIGH\|MEDIUM\|LOW)(: [A-Za-z ]+)?(, last_verified \d{4}-\d{2}-\d{2})?\]` | Inline claim attribution | Phase 37 D-11 regex; D-20 inherits verbatim [VERIFIED: Phase 37 BYOD and Phase 38 Dedicated shipped docs] |
| Markdown table for OEM matrix + what-breaks callouts + renewal table | — | Structural conventions | Admin-template-android (Phase 34 D-16..D-22) [VERIFIED: `docs/_templates/admin-template-android.md`] |

### Supporting

| Tool | Purpose | When to Use |
|------|---------|-------------|
| `grep` / `wc -w` / `sed` (Bash + coreutils) | Mechanical audit checks for AEAUDIT-04 | Phase 42 audit; Phase 39 W2 validation gates per-plan |
| `git diff --name-only` | PITFALL 9/11 shared-file modification guard | W2 audit per plan |
| Mermaid (optional) | Flow diagram if author elects (Reseller → Upload → Claim → Assign → First-Boot) | Claude's Discretion per D-01; not mandated |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Single appended H2 block (D-01 winner 1A) | Interleaved H2s at natural touch-points (1B) | REJECTED by adversarial review — 3 CRIT: violates AEPREQ-04 SC4 "starts at Step 0"; violates Phase 35 D-22 append-only; creates Anti-Pattern 1 dual-source |
| Decision-points-as-prose (D-04) | Screen-by-screen portal walkthrough (1C) | REJECTED — 3 CRIT: violates STATE.md ZT-portal-redesign flag; duplicates Google canonical (STACK.md SPARSE DOC FLAG); dilutes source-confidence marker semantics |
| Fixed H2 whitelist scope-guard (D-11 winner 3B) | Hard word-count ceiling (3A) / both (3C) / relative-size bound (3D) | REJECTED — 3A shell pipeline broken + arbitrary; 3C inherits 3A brokenness; 3D couples to sibling drift + Windows-broken shell |
| Two plans parallelizable (D-15 winner 4B) | One plan (4A) / sequential (4C) / sub-waves (4D) | REJECTED — 4A contradicts Phase 37 precedent; 4C contradicts ROADMAP parallelism + STATE.md decision; 4D departs precedent without benefit |

**Installation:** N/A — documentation phase. All authoring tools are already in use across Phases 34-38.

**Version verification:** N/A for a doc phase. Canonical-source verification (the analog of "npm view"):

- MS Learn AOSP supported-devices — `ms.date: 2025-05-12`, `updated_at: 2026-04-16` [VERIFIED: 2026-04-23 via WebFetch]
- MS Learn ref-corporate-methods (ZTE content) — `ms.date: 2025-12-04`, `updated_at: 2026-04-16` [VERIFIED: 2026-04-23 via WebFetch]
- Google AE Help answer/7514005 — [VERIFIED: 2026-04-23 via WebFetch; exact dual-SIM IMEI 1 quote captured]
- Google Developers Zero-Touch known-issues — [VERIFIED: 2026-04-23 via WebFetch; dual-SIM IMEI 1 + KME mutual-exclusion quotes captured]
- Google AE Help answer/9040598 — [VERIFIED: 404 stale; CONTEXT.md D-22 / STATE.md flag #5 URL incorrect; replacement is answer/7514005]

## Architecture Patterns

### System Architecture Diagram

Documentation content-flow through Phase 39 artifacts. Data = authored content; arrows = content flow / cross-references.

```
                        ┌─────────────────────────────────┐
                        │  CANONICAL SOURCES              │
                        │  - MS Learn AOSP page           │
                        │  - MS Learn ref-corp-methods    │
                        │  - Google AE Help answer/7514005│
                        │  - Google Dev known-issues      │
                        │  - Google reseller guide (link) │
                        └──────────────┬──────────────────┘
                                       │
                   ┌───────────────────┴────────────────────┐
                   ▼                                        ▼
┌───────────────────────────────────┐      ┌────────────────────────────────────┐
│  39-01: ZTE EXTENSION             │      │  39-02: AOSP STUB                  │
│  (appended H2 into Phase 35 file) │      │  (new file 06-aosp-stub.md)        │
│                                   │      │                                    │
│  ## Corporate-Scale Operations    │      │  Platform gate blockquote          │
│   ├── ### Reseller-Upload Handoff │      │  Platform note banner (D-21)       │
│   ├── ### Device Claim Workflow   │      │   ↓                                │
│   ├── ### Profile Assignment      │      │  ## Scope and Status               │
│   ├── ### Dual-SIM IMEI 1         │      │  ## What AOSP Is                   │
│   ├── ### KME/ZT @ Device Claim   │      │  ## When to Use AOSP (Platform)    │
│   └── ### Config Must Be Assigned │      │  ## Supported OEMs                 │
│       (cross-link #dpc-extras-json│      │   ├── ### RealWear (confirmed GA)  │
│        to Phase 35 section)       │      │   └── ### Other AOSP OEMs          │
│                                   │      │  ## Enrollment Constraints         │
│  Inherited: frontmatter, verify-UI│      │  ## Prerequisites and Licensing    │
│    comments, KME callout @ top,   │      │  ## Deferred Content (table)       │
│    Step 0 reseller, DPC extras,   │      │  ## See Also                       │
│    Methods A/B linking (Phase 35) │      │  ## Changelog                      │
└───────────────┬───────────────────┘      └────────────────┬───────────────────┘
                │                                           │
                ▼                                           ▼
   ┌────────────────────────────┐        ┌──────────────────────────────────────┐
   │  ANCHOR CONTRACT (D-17)    │        │  AEAUDIT-04 MECHANICAL AUDIT         │
   │  9 stable IDs consumed by  │───────►│  (Phase 42 — grep H2 whitelist,      │
   │  Phase 40 L1 runbook 27 +  │        │   anchor-presence, SafetyNet/        │
   │  Phase 41 L2 investigations│        │   supervision greps, frontmatter     │
   │  + Phase 42 audit          │        │   scan, shared-file modification     │
   └────────────────────────────┘        │   guard via git diff)                │
                                         └──────────────────────────────────────┘
```

**Trace the primary use case** (Intune admin finding ZTE corporate-scale guidance):
1. Admin opens `docs/admin-setup-android/02-zero-touch-portal.md` (Phase 35 shipped)
2. Scrolls past Prerequisites → Step 0 → Create Account → Link ZT to Intune → DPC Extras JSON → KME/ZT Mutual Exclusion (all Phase 35)
3. Enters `## Corporate-Scale Operations` H2 (Phase 39 appended)
4. Reads 6 H3 sub-sections in order or jumps via TOC / anchor
5. Cross-links out to Google canonical (reseller guide) for reseller-side workflow
6. Cross-links back to Phase 35 `#dpc-extras-json` for configuration-must-be-assigned anchor context

**Trace the secondary use case** (admin evaluating AOSP for RealWear deployment):
1. Admin opens `docs/admin-setup-android/06-aosp-stub.md` (Phase 39 new)
2. First thing seen: Platform gate blockquote + Platform note banner (D-21) + `## Scope and Status` callout ("stub in v1.4; full v1.4.1")
3. Reads What/When/Supported/Constraints/Prereq
4. If non-RealWear OEM: PITFALL-7 framing routes admin to Android Enterprise fully managed instead of AOSP
5. If RealWear: reads Wi-Fi credential embedding requirement + QR-only + one-device-at-a-time
6. Hits `## Deferred Content` table; finds planned v1.4.1 coverage

### Recommended Project Structure

Phase 39 touches ONLY the following filesystem locations:

```
docs/
├── admin-setup-android/
│   ├── 02-zero-touch-portal.md       # MODIFIED: append ## Corporate-Scale Operations H2 block
│   └── 06-aosp-stub.md               # CREATED: new file, 9-H2 whitelist

.planning/
└── phases/
    └── 39-zero-touch-enrollment-aosp-stub/
        ├── 39-CONTEXT.md              # EXISTS
        ├── 39-CANDIDATES.md           # EXISTS
        ├── 39-DISCUSSION-LOG.md       # EXISTS
        ├── 39-RESEARCH.md             # THIS FILE
        ├── 39-VALIDATION.md           # Next (per Nyquist validation architecture)
        ├── 39-01-PLAN.md              # Produced by planner
        ├── 39-02-PLAN.md              # Produced by planner
        ├── 39-01-SUMMARY.md           # Produced post-execution
        ├── 39-02-SUMMARY.md           # Produced post-execution
        ├── 39-VERIFICATION.md         # Produced by reviewer
        └── 39-REVIEW.md               # Produced by reviewer
```

**Strictly forbidden locations (D-18 shared-file modification guard):**

- `docs/common-issues.md`
- `docs/quick-ref-l1.md`
- `docs/quick-ref-l2.md`
- `docs/index.md`
- `docs/_glossary.md`
- `docs/_glossary-macos.md`
- `docs/_glossary-android.md`
- Anything under `docs/admin-setup-ios/`
- Anything under `docs/admin-setup-macos/`
- Anything under `docs/l1-runbooks/`
- Anything under `docs/l2-runbooks/`
- Anything under `docs/end-user-guides/`
- Any other `docs/admin-setup-android/*.md` file (00/01 Phase 35; 03 Phase 36; 04 Phase 37; 05 Phase 38)
- Anything under `docs/android-lifecycle/`
- Anything under `docs/_templates/`

### Pattern 1: Appended H2 Block into Phase 35-Owned File

**What:** Insert ONE new H2 `## Corporate-Scale Operations` at position 7 of `docs/admin-setup-android/02-zero-touch-portal.md`, between Phase 35's `## KME/ZT Mutual Exclusion (Samsung)` (ends line 126) and Phase 35's `## Verification` (starts line 128). Update Phase 35's Verification placeholder line 135 from "Phase 39 covers device-claim testing at scale" to a resolved cross-reference.

**When to use:** Phase 35 D-22 append-only contract is strict. Never inline-insert into Phase-35-owned H2 bodies; always append at H2 granularity.

**Example** (structural skeleton — actual prose is author's Discretion):

```markdown
<!-- Everything above line 126 is Phase 35 SHIPPED; do not modify. -->

<a id="corporate-scale-operations"></a>
## Corporate-Scale Operations

Corporate-scale ZTE operations — Phase 35 covered single-tenant portal setup; this section covers the per-device workflow once the portal is linked.

<a id="reseller-upload-handoff"></a>
### Reseller-Upload Handoff Workflow

The reseller uploads device IMEI/serial/MEID into the Zero-Touch reseller portal. Google is the canonical source for reseller-side steps; see [Google Zero-Touch IT admin guide](https://support.google.com/work/android/answer/7514005). At handoff, confirm with the reseller: device count, identifier type (IMEI / serial / MEID — see `#dual-sim-imei-1` below for dual-SIM), and your Zero-Touch customer account name.

<!-- verify UI at execute time -->

<a id="device-claim-workflow"></a>
### Device Claim Workflow

Once the reseller uploads devices, the admin sees them in the ZT portal under **Devices**. Decision points:
- Which devices to claim now vs later
- Which configuration to assign (default or specific)
- Per-device vs bulk assignment

Canonical UI walkthrough: [Google ZT customer-portal help](https://support.google.com/work/android/topic/9158960). <!-- verify UI at execute time -->

[... remaining H3s per D-01 ...]

<!-- Everything below line 128 is Phase 35 SHIPPED; only line 135 Verification checkbox updates to resolve the placeholder. -->
```

**Source:** D-01 + Phase 35 shipped file lines 1-158 [VERIFIED: read 2026-04-23]

### Pattern 2: AOSP Stub Whitelist Structure

**What:** Fresh file authored from `docs/_templates/admin-template-android.md` (Phase 34) with BOTH MGP H4 and ZT portal H4 sub-sections subtracted via Phase 34 D-17 HTML-comment pattern. Body follows 9-H2 whitelist per D-11 (no more, no fewer, in order).

**When to use:** Any new Android admin guide where AOSP is the management surface (this is the only v1.4 instance).

**Example** (structural skeleton — actual prose is author's Discretion within the D-13 content requirements):

```markdown
---
last_verified: YYYY-MM-DD
review_by: YYYY-MM-DD
audience: admin
platform: Android
applies_to: AOSP
---

# AOSP Device Management Stub — Intune

> **Platform gate:** This guide covers AOSP (Android Open Source Project) device management in Intune — specialty AR/VR and wearable-scanner hardware with no Google Mobile Services. For other Android Enterprise modes (COBO/BYOD/Dedicated/ZTE), see [Android Admin Setup Overview](00-overview.md).

> **Platform note:** AOSP (Android Open Source Project) management in Intune is a distinct enrollment surface from Android Enterprise (COBO/BYOD/Dedicated/ZTE). AOSP devices have no Google Mobile Services (GMS), no FCM push, and no Managed Google Play — this is structurally distinct from iOS User Enrollment (which has user identity) and macOS Automated Device Enrollment (which has Apple ID). For cross-platform comparison, see [Android enrollment overview](../android-lifecycle/00-enrollment-overview.md#aosp).

<!-- The #### In Managed Google Play subsection is intentionally omitted.
     AOSP does not use Managed Google Play (no GMS). -->

<!-- The #### In Zero-Touch portal subsection is intentionally omitted.
     AOSP does not use the Zero-Touch portal (no reseller-gated enrollment). -->

## Scope and Status

> ⚠️ This is a **stub** in v1.4. Full AOSP admin coverage is planned for v1.4.1. See [Deferred Content](#deferred-content) below for what this stub does NOT cover.

## What AOSP Is

[prose: AOSP = Android without GMS; no FCM; corporate modes mark ownership automatically; Intune uses direct polling instead of push; ...]

## When to Use AOSP

[prose: AR/VR headsets + wearable scanners; mainstream Android phones/tablets should use COBO/BYOD/Dedicated; ...]

## Supported OEMs

<a id="realwear-confirmed-ga"></a>
### RealWear (confirmed GA)

RealWear HMT-1 (firmware 11.2+), HMT-1Z1 (11.2+), and Navigator 500 (1.1+) are confirmed GA for AOSP management in Intune. These are AR/VR headsets deployed for hands-free frontline work. Enrollment is QR-only; one device at a time; Wi-Fi credentials MUST be embedded in the QR payload because RealWear devices cannot join networks interactively during enrollment. `[HIGH: MS Learn aosp-supported-devices, last_verified YYYY-MM-DD]`

<a id="other-aosp-supported-oems"></a>
### Other AOSP-Supported OEMs

The following OEMs appear in Microsoft's AOSP supported-devices list:

- DigiLens (DigiLens ARGO)
- HTC (Vive Focus 3, Vive XR Elite, Vive Focus Vision)
- Lenovo (ThinkReality VRX)
- Meta (Quest 2, Quest 3, Quest 3s, Quest Pro — available in select regions only)
- PICO (PICO 4 Enterprise, PICO Neo3 Pro/Eye)
- Vuzix (Blade 2, M400, M4000)
- Zebra (WS50)

**Per v1.4 scope, per-OEM enrollment mechanics for non-RealWear OEMs are deferred to v1.4.1. If GMS is present on these devices, use Android Enterprise fully managed instead of AOSP.** [MS Learn — AOSP supported devices](https://learn.microsoft.com/en-us/intune/fundamentals/aosp-supported-devices) is the authoritative current list. `[HIGH: MS Learn aosp-supported-devices, last_verified YYYY-MM-DD]`

## Enrollment Constraints

[prose per D-13:
- QR-only (version-tagged per PITFALL 1)
- One device at a time (version-tagged)
- Wi-Fi credential embedding for RealWear — explicit requirement with cross-link to #realwear-confirmed-ga]

## Prerequisites and Licensing

[prose: Intune Plan 2 / Suite per plan-time re-verification; if unverified, MED marker]

<a id="deferred-content"></a>
## Deferred Content

The following AOSP content is tracked for v1.4.1 and out of scope for v1.4:

| Topic | Current state in v1.4 | Target | Rationale |
|---|---|---|---|
| Per-OEM enrollment steps (non-RealWear) | Stub lists OEMs; defers mechanics | v1.4.1 | Sparse public docs per OEM |
| AOSP user-associated enrollment | Mentioned; no admin-guide depth | v1.4.1 | OEM matrix must firm |
| AOSP userless enrollment | Mentioned; no admin-guide depth | v1.4.1 | Same |
| AOSP L1 triage | Not in scope | v1.4.1 | Specialty device class |
| AOSP L2 investigation | Not in scope | v1.4.1 | Specialty device class |
| AOSP OEM behavioral failure catalog | Not written | v1.4.1 | Depends on full OEM matrix |
| Knox Mobile Enrollment full admin | Phase 39 cross-ref only | v1.4.1 | Paid Knox tier + Samsung-specific |

## See Also

- [Android Enterprise Admin Setup Overview](00-overview.md)
- [Managed Google Play Binding](01-managed-google-play.md)
- [Zero-Touch Portal Configuration](02-zero-touch-portal.md)
- [Android Enterprise Provisioning Glossary](../_glossary-android.md#aosp)
- [Android Enterprise Enrollment Overview](../android-lifecycle/00-enrollment-overview.md#aosp)
- [Android Provisioning Methods](../android-lifecycle/02-provisioning-methods.md)
- [MS Learn — AOSP Supported Devices](https://learn.microsoft.com/en-us/intune/fundamentals/aosp-supported-devices)

## Changelog

| Date | Change | Author |
|------|--------|--------|
| YYYY-MM-DD | Initial stub (Phase 39 scope). Full coverage deferred to v1.4.1. | -- |
```

**Source:** D-07, D-09, D-10, D-11, D-12, D-13, D-21 + MS Learn AOSP page [VERIFIED: 2026-04-23]

### Pattern 3: Source-Confidence Marker Placement

**What:** Apply the D-20 regex marker `[(HIGH|MEDIUM|LOW)(: source)?(, last_verified YYYY-MM-DD)?]` to specific claim categories:

| Claim | Confidence | Marker Example | Rationale |
|-------|-----------|---------------|-----------|
| Dual-SIM IMEI 1 | MED (per D-05) — but research upgrades to HIGH (see OQ-1) | `[MEDIUM: Google Developers Zero-touch known issues, last_verified 2026-04-23]` | D-05 locks MED; OQ-1 asks if uplift appropriate |
| AOSP OEM matrix | HIGH | `[HIGH: MS Learn aosp-supported-devices, last_verified 2026-04-23]` | Single marker at matrix bottom (D-07), not per-row |
| Intune Plan 2 / Suite licensing for AOSP | MED or HIGH per plan-time verification | `[MEDIUM: research-inference, last_verified 2026-04-23]` fallback | D-14 / OQ-2 — unresolved at research time |
| Device-claim portal-UI specifics | MED at executor discretion only | `[MEDIUM: Google ZT customer-portal help, last_verified YYYY-MM-DD]` | D-04 — NOT on every portal step (anti-dilution per F-1C-03) |
| Enrollment token 90-day expiry (if referenced) | MED | `[MEDIUM: Google AE Help, last_verified YYYY-MM-DD]` | Phase 35 already carries this; Phase 39 cross-links, does not restate |

**Placement discipline:** one inline marker at the primary assertion; cross-link re-uses do NOT re-mark. Avoids marker dilution per F-1C-03.

### Anti-Patterns to Avoid

- **Inline-insert into Phase 35 H2 bodies** — D-22 append-only violation. Use only H2-level appends. This is the PRIMARY rejected approach from GA1 1B/1D.
- **Screen-by-screen portal walkthrough with breadcrumb/button paths** — STATE.md ZT-portal-redesign flag + STACK.md SPARSE DOC FLAG. Use decision-points-as-prose + Google canonical link.
- **Source-confidence marker on every portal step** — dilutes Phase 37 D-10/D-11 marker semantics. Use markers only where an assertion cannot be re-sourced at plan/execute time.
- **"See MS Learn for current status" as mass-punt for non-RealWear OEMs** — REJECTED 2D candidate; refuses PITFALL 7 mandate. Use PITFALL-7-mandated "not supported under AOSP; use fully managed instead" framing (D-10).
- **Version-suffix in H2 name** (e.g., `## Deferred Content (v1.4.1)`) — self-stales at v1.4.1 ship. D-12: name is `## Deferred Content`; v1.4.1 target lives in table row.
- **Duplicating canonical matrices** — Anti-Pattern 1. AOSP stub OEM matrix IS the canonical AOSP artifact (per F-2A-03 Referee ruling); but do NOT duplicate Phase 34 `02-provisioning-methods.md` AOSP row mechanics.
- **Modifying Phase 34 / 35 / 36 / 37 / 38 anchors** — Phase 36/37/38 anchor-stability contracts carry forward. Phase 39 only publishes its own 9 anchors (D-17); does not modify prior-phase anchors.
- **Hardware-coding the `ms.date` header value as "last_verified" authority** — MS Learn `ms.date` can lag `updated_at` (for the AOSP page: `ms.date 2025-05-12` but `updated_at 2026-04-16`). Use `updated_at` for freshness assessment.
- **Stating negative claims without verification** — Claude-training-data trap. E.g., "MS Learn does not document dual-SIM" — this research verified Google DOES document it at 2 canonical sources; MS Learn references Google. Cite both directions explicitly, don't make "not documented" claims.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Reseller-side workflow documentation | Custom Intune-centric reseller walkthrough | Link to Google canonical (`support.google.com/work/android/answer/7514005`) | MS Learn itself punts here (verified 2026-04-23); STACK.md SPARSE DOC FLAG; Google canonical stays fresh independently |
| Device-claim portal UI screen-by-screen | Custom breadcrumb + button label documentation | Decision-points-as-prose + Google canonical link + `<!-- verify UI at execute time -->` | STATE.md research flag "portal has history of redesigns"; Phase 35 shipped file already uses this pattern |
| OEM matrix row-by-row with per-OEM GA status claims | Custom GA / preview / unknown status column | Complete MS Learn enumeration + PITFALL-7 framing for non-RealWear | MS Learn list has no GA/preview column — all listed devices are supported without qualification; manufacturing a GA column would introduce factual error (F-2A-02 CRIT) |
| AOSP stub scope-guard word-count regex | Custom sed/awk/wc pipeline per Candidate 3A | Fixed H2 whitelist per D-11 (Phase 42 AEAUDIT-04 greps H2 names) | 3A shell mechanics broken on Windows; 3B structural bound is portable + precedent-aligned (Phase 37 D-12 / Phase 38 D-06) |
| Source-confidence marker parser | Custom markdown AST walker | Regex `\[(HIGH|MEDIUM|LOW)...]` per Phase 37 D-11 verbatim | Regex is sufficient for Phase 42 audit; AST would be over-engineering for grep-era validation |
| Dual-SIM IMEI MEDIUM-to-HIGH upgrade decision | Fresh research exercise | Use this RESEARCH.md OQ-1 finding — 2 Google canonical sources confirm the claim | Avoid planner re-running the web verification that researcher already did |
| Zero-Touch authorized-reseller directory enumeration | Custom list of resellers | Link to [Android Enterprise Business Device Solutions Directory — Resellers](https://androidenterprisepartners.withgoogle.com/resellers/) | Google-operated canonical; updates continuously |
| DPC extras JSON fresh authoring | Custom JSON blob with hand-typed signature checksum | Phase 35 shipped JSON (byte-for-byte matches MS Learn verified 2026-04-23) — cross-reference `#dpc-extras-json`, do not restate | Anti-Pattern 1; signature checksum `I5YvS0O5hXY46mb01BlRjq4oJJGs2kuUcHvVkAPEXlg` changes only if CloudDPC is re-signed |

**Key insight:** This phase is 100% "reference canonical sources, synthesize admin-facing narrative, don't restate mechanics." Every attempt to hand-roll content that already exists in Phase 34/35/36/37/38 or in MS Learn / Google canonical sources will trip one of: Anti-Pattern 1 (duplication), D-22 (append-only), or a source-drift failure mode.

## Runtime State Inventory

Not applicable — Phase 39 is a pure documentation phase with no rename, refactor, or migration work.

| Category | Items Found | Action Required |
|----------|-------------|------------------|
| Stored data | None — verified by inspection. No datastores reference renamed strings. Phase 39 creates content; it does not rename existing content. | none |
| Live service config | None — verified by inspection. No external service config references anything Phase 39 authors. | none |
| OS-registered state | None — verified by inspection. No OS-level registrations reference Phase 39 content. | none |
| Secrets and env vars | None — verified by inspection. No secrets / env var names touched. (YourEnrollmentToken in DPC extras JSON is a placeholder string, not a secret value.) | none |
| Build artifacts / installed packages | None — verified by inspection. Documentation files are rendered on demand by wiki/MkDocs/etc.; no build artifacts to invalidate. | none |

## Common Pitfalls

Curated from `.planning/research/PITFALLS.md` (all inherited from Phases 34-38 carry-forward). Listed in order of Phase 39 applicability.

### Pitfall 1: AOSP Scope Creep Beyond Stub (PITFALL 12)
**What goes wrong:** AOSP stub grows beyond "stub" — per-OEM enrollment steps added; L1/L2 content for AOSP; OEM-specific failure catalog introduced.
**Why it happens:** Authoring momentum; "while I'm here I'll add..." impulse. RealWear content is well-sourced so it feels safe to extend to other OEMs too.
**How to avoid:** D-11 locks 9-H2 whitelist. D-13 locks Enrollment Constraints content. D-10 mandates PITFALL-7 framing for non-RealWear. Phase 42 AEAUDIT-04 mechanically verifies H2 count.
**Warning signs:** Any H2 not in the D-11 whitelist; any per-OEM H3 other than `### RealWear (confirmed GA)` and `### Other AOSP-Supported OEMs`; any L1 or L2 reference for AOSP.

### Pitfall 2: Inline-Insert into Phase 35 H2 Bodies (D-22 violation)
**What goes wrong:** Author reaches into Phase 35's shipped `## Link Zero-Touch to Intune` Method B section to insert dual-SIM IMEI 1 callout "at the natural touchpoint." Violates D-22.
**Why it happens:** PITFALL 2 "point of admin decision" discipline pulls content toward the decision location; D-22 pushes it into a separate appended block.
**How to avoid:** D-01 + D-03 resolve the tension — `### Configuration Must Be Assigned` H3 opens with a prose cross-link to Phase 35's `#dpc-extras-json`, satisfying PITFALL 2 without inline-inserting. Same pattern for dual-SIM (it lives in its own H3 in the appended block, with cross-link back into Phase 35's Method B section via anchor).
**Warning signs:** Any edit to lines 1-126 of Phase 35's `02-zero-touch-portal.md` beyond the one permitted Verification-placeholder resolution on line 135.

### Pitfall 3: Manufacturing GA Status Column for Non-RealWear OEMs (F-2A-02 CRIT)
**What goes wrong:** Author adds "GA status" column to AOSP OEM matrix; fills in claims like "GA" / "Preview" / "Unknown" per row. MS Learn page doesn't carry such a column — all listed devices are in a supported table without qualification. Manufacturing the column introduces factual error.
**Why it happens:** Narrative pressure — admin wants to know "is this GA?" → author invents the column.
**How to avoid:** D-07 locks RealWear-spotlight + other-OEMs-bulleted-list pattern. D-08 prohibits inline Notes column. D-10 mandates PITFALL-7 framing. MS Learn has columns: OEM, Device, Minimum Firmware, Type of Device, Restrictions — NOT GA Status.
**Warning signs:** Any GA/preview/status text adjacent to non-RealWear OEMs; any table column beyond OEM + Device + (optionally) firmware.

### Pitfall 4: Duplicating Google Canonical Reseller Workflow (F-1C-02 CRIT)
**What goes wrong:** Author writes step-by-step reseller-side workflow ("reseller logs into reseller portal, clicks Upload, pastes CSV..."). MS Learn punts this to Google; Google documents it on reseller-facing pages that IT admins don't access directly.
**Why it happens:** Completeness impulse; STACK.md SPARSE DOC FLAG is easy to overlook.
**How to avoid:** D-04 explicit: decision-points-as-prose + Google canonical link. `### Reseller-Upload Handoff Workflow` H3 describes what the admin needs to know to HAND OFF to the reseller (device count, identifier type, account name) — not what the reseller does internally.
**Warning signs:** Any step-by-step sequence addressed to "the reseller" in the customer-facing ZT portal doc.

### Pitfall 5: Default-Config-Overrule Footnote (Method A nuance)
**What goes wrong:** Author writes `### Profile Assignment at Scale` without surfacing the MS Learn caveat: "Once you link your account, the default zero-touch configuration created in Intune overrules the default configuration profile set in the zero-touch enrollment portal. If you want to create a zero-touch configuration for a corporate-owned work profile device or a dedicated device, don't link your account to Intune."
**Why it happens:** Phase 35 already covers Method A / Method B; author assumes the scale-out section doesn't need to restate.
**How to avoid:** `### Profile Assignment at Scale` H3 MUST cross-reference Phase 35's `#link-zt-to-intune` Method A/B decision AND restate the operational consequence at scale: admins intending COPE/Dedicated must NOT use Method A because the Fully Managed default overrules per-device configuration. Phase 35 already carries this as a "What breaks" callout at line 77; Phase 39 re-surfaces it as a scale-operations implication.
**Warning signs:** Profile Assignment at Scale content that treats Method A and Method B as equivalent at scale.

### Pitfall 6: `## Deferred Content (v1.4.1)` Self-Staling (F-3B-02 CRIT)
**What goes wrong:** Author adds version suffix to H2 name. When v1.4.1 ships, the H2 itself becomes outdated (should it be "Deferred Content (v1.4.2)"? or just "Deferred Content" retroactively?).
**Why it happens:** Author wants precision in the H2 name; misses D-12.
**How to avoid:** D-12 locks H2 name as `## Deferred Content` (no suffix). V1.4.1 target lives IN the table cells per row.
**Warning signs:** Any H2 with a version-in-parens pattern.

### Pitfall 7: Source-Confidence Marker on Every Portal Step (F-1C-03 CRIT)
**What goes wrong:** Author applies `[MEDIUM: ...]` to every portal navigation step. Dilutes Phase 37 D-10/D-11 marker semantics — readers tune out because EVERY claim is marked.
**Why it happens:** Defensive writing; "when in doubt, mark it."
**How to avoid:** D-04 + D-20 explicit: markers on assertions that cannot be re-sourced at plan/execute time, NOT on every portal-nav claim. Phase 35 shipped file uses `<!-- verify UI at execute time -->` HTML comments instead — same discipline.
**Warning signs:** More than ~3-5 source-confidence markers in the appended block; marker at every breadcrumb nav claim.

## Code Examples

Documentation phase — "code examples" = verified content patterns from canonical sources.

### Example 1: MS Learn DPC Extras JSON (Canonical, byte-for-byte with Phase 35 shipped)

```json
{
"android.app.extra.PROVISIONING_DEVICE_ADMIN_COMPONENT_NAME": "com.google.android.apps.work.clouddpc/.receivers.CloudDeviceAdminReceiver",
"android.app.extra.PROVISIONING_DEVICE_ADMIN_SIGNATURE_CHECKSUM": "I5YvS0O5hXY46mb01BlRjq4oJJGs2kuUcHvVkAPEXlg",
"android.app.extra.PROVISIONING_DEVICE_ADMIN_PACKAGE_DOWNLOAD_LOCATION": "https://play.google.com/managed/downloadManagingApp?identifier=setup",
"android.app.extra.PROVISIONING_ADMIN_EXTRAS_BUNDLE": {
    "com.google.android.apps.work.clouddpc.EXTRA_ENROLLMENT_TOKEN": "YourEnrollmentToken"
}
}
```

**Source:** [MS Learn — ref-corporate-methods](https://learn.microsoft.com/en-us/intune/device-enrollment/android/ref-corporate-methods) — HIGH confidence, verified 2026-04-23. Byte-for-byte identical to Phase 35 `02-zero-touch-portal.md` lines 94-105.

**Phase 39 use:** DO NOT restate. Phase 39 `### Configuration Must Be Assigned` H3 cross-references Phase 35's `#dpc-extras-json` via prose cross-link.

### Example 2: Dual-SIM IMEI 1 Canonical Quotes

> "A dual-SIM device includes two discrete modems and has two IMEI numbers. It's recommended for the resellers to register dual-SIM devices with the numerically lowest IMEI number."
> — [Google AE Help — Zero-touch enrollment for IT admins](https://support.google.com/work/android/answer/7514005), verified 2026-04-23

> "if registering just one, prefer the numerically lowest IMEI number as zero-touch enrollment works more reliably with the lowest IMEI."
> — [Google Developers — Zero-touch known issues](https://developers.google.com/zero-touch/resources/known-issues), verified 2026-04-23

**Phase 39 use:** `### Dual-SIM IMEI 1 Registration` H3. D-05 locks MEDIUM marker but BOTH Google canonical sources verify the claim — see OQ-1 for confidence-uplift question.

### Example 3: KME Mutual-Exclusion Canonical Quotes

> "If a device is registered and configured in both Knox Mobile Enrollment and zero-touch, the device will enroll using Knox Mobile Enrollment...To ensure that a Samsung device enrolls using zero-touch, remove any configuration assigned to the device in the Knox Mobile Enrollment portal."
> — [Google AE Help — Zero-touch enrollment for IT admins](https://support.google.com/work/android/answer/7514005), verified 2026-04-23

> "It is not recommended to configure zero-touch and KME on the same device. Configuring the device in both services is likely to cause confusion as the configurations can be out of sync, which is difficult to debug if the device experiences further issues."
> — [Google Developers — Zero-touch known issues](https://developers.google.com/zero-touch/resources/known-issues), verified 2026-04-23

**Phase 39 use:** `### KME/ZT Mutual Exclusion — At Device Claim` H3 per D-06. Content is load-bearing at device-claim-step (Samsung admin at the moment of claiming devices). Cross-link Phase 35 `#kme-zt-mutual-exclusion` for the top-of-doc framing.

### Example 4: MS Learn AOSP Supported-Devices Table (Canonical)

| OEM | Device | Minimum Firmware | Type of Device | Restrictions |
|-----|--------|-----------------|----------------|--------------|
| DigiLens Inc. | DigiLens ARGO | DigiOS 2068 (B1.0001.2068) | AR/VR Headset | — |
| HTC | HTC Vive Focus 3 | 5.2 - 5.0.999.624 | AR/VR Headset | — |
| HTC | HTC Vive XR Elite | 4.0 - 1.0.999.350 | AR/VR Headset | — |
| HTC | Vive Focus Vision | 7.0.999.159 | AR/VR Headset | — |
| Lenovo | ThinkReality VRX | VRX_user_S766001_2310192349_kona | AR/VR Headset | — |
| Meta | Quest 2 | v49 | AR/VR Headset | Available in select regions only |
| Meta | Quest 3 | v59 | AR/VR Headset | Available in select regions only |
| Meta | Quest 3s | v71 | AR/VR Headset | — |
| Meta | Quest Pro | v49 | AR/VR Headset | Available in select regions only |
| PICO | PICO 4 Enterprise | PUI 5.6.0 | AR/VR Headset | — |
| PICO | PICO Neo3 Pro/Eye | PUI 4.8.19 | AR/VR Headset | — |
| Realwear | HMT-1 | 11.2 | AR/VR Headset | — |
| Realwear | HMT-1Z1 | 11.2 | AR/VR Headset | — |
| Realwear | Navigator 500 | 1.1 | AR/VR Headset | — |
| Vuzix | Blade 2 | Vuzix Blade 2 Version 1.2.1 | AR/VR Headset | — |
| Vuzix | M400 | M-Series Version 3.0.2 | AR/VR Headset | — |
| Vuzix | M4000 | M-Series Version 3.0.2 | AR/VR Headset | — |
| Zebra | WS50 | 11-49-15.00 | Wearable scanner | — |

**Source:** [MS Learn — AOSP Supported Devices](https://learn.microsoft.com/en-us/intune/fundamentals/aosp-supported-devices) — HIGH confidence, verified 2026-04-23 (`ms.date: 2025-05-12`; `updated_at: 2026-04-16`).

**Phase 39 use:** D-09 complete enumeration. Stub OEM matrix per D-07 uses 8-OEM bulleted list (NOT this full table — minimum-firmware detail belongs in v1.4.1 full coverage per D-08 no-Notes-column discipline). Above is for researcher→planner→executor sanity-check.

### Example 5: Method A vs Method B Default-Config-Overrule (Load-bearing for Profile Assignment at Scale)

> "Once you link your account, the default zero-touch configuration created in Intune overrules the default configuration profile set in the zero-touch enrollment portal. If you want to create a zero-touch configuration for a corporate-owned work profile device or a dedicated device, don't link your account to Intune. Instead, select **View devices in the zero-touch portal**."
> — [MS Learn — ref-corporate-methods, Step 2 Caution box](https://learn.microsoft.com/en-us/intune/device-enrollment/android/ref-corporate-methods), verified 2026-04-23

**Phase 39 use:** `### Profile Assignment at Scale` H3 per D-01 sub-structure #3. This is load-bearing content — if omitted, admins using Method A for non-COBO fleets break silently. Phase 35's line 77 already documents this at the link-step; Phase 39 surfaces the scale-operations implication.

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| SafetyNet attestation | Play Integrity API | January 2025 (SafetyNet turned off) | AEAUDIT-04 greps for "SafetyNet" in all Android docs; Phase 39 content mentions neither (not in scope for ZTE/AOSP body) but must not accidentally re-introduce |
| `intunecdnpeasd.azureedge.net` (AOSP endpoint) | `intunecdnpeasd.manage.microsoft.com` | March 2025 | Phase 39 AOSP stub does NOT document network endpoints (deferred to v1.4.1); if mentioned in prose, use current endpoint |
| NFC provisioning for COPE | Removed Android 11+ | Android 11 release | Phase 39 not in COPE scope; no action |
| IMEI/serial for BYOD WP corporate identifiers | Removed Android 12+ | Android 12 release | Phase 39 not in BYOD scope; no action |
| Consumer Gmail MGP binding (pre-Aug 2024) | Entra account binding preferred | August 2024 | Phase 35 D-14 handled as deferred stub; Phase 39 cross-references Phase 35, does not restate |
| Token 90-day max (historical) | 1-65,535 days configurable (per-Phase-36 research) | December 2022 | MEDIUM confidence per STATE.md flag; Phase 39 cross-references Phase 35 `#renewal-maintenance`, does not restate |
| Google AE Help reseller guide at `answer/9040598` | Canonical IT-admin URL is `answer/7514005` | Pre-research-snapshot (unknown) | STATE.md Phase 39 flag #5 + CONTEXT.md D-22 URL is STALE (404 at 2026-04-23). Planner MUST update any task spec using this URL to point to `answer/7514005`. |

**Deprecated/outdated in research context:**

- `answer/9040598` URL (404) — use `answer/7514005`
- "MS Learn ms.date" as freshness authority — use `updated_at` (git-backed). For AOSP page: `ms.date 2025-05-12` is misleading; `updated_at 2026-04-16` is accurate.

## Assumptions Log

Every claim in this RESEARCH.md is tagged verified or cited or explicitly noted below. Assumptions that could not be closed in this session are recorded here for the planner and discuss-phase.

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | Phase 42 AEAUDIT-04 grep mechanism will be implemented as shell grep over H2 headings with exact string match (per D-11 structural bound) | Scope-guard enforcement | LOW — if Phase 42 uses AST-based checker instead, AOSP stub H2 names still pass; only the verification mechanism differs. D-11 H2 names are identical strings either way. |
| A2 | "Phase 35 shipped file lines 1-158" reference is stable for Phase 39 planning purposes | Pattern 1 (append block) | LOW — line numbers may drift if Phase 35 receives gap-closure edits between research and execution; the relevant structural invariant is the H2 order, which D-22 locks. Planner should refer by H2 order (position 7 = after KME/ZT, before Verification) not line numbers. |
| A3 | PITFALL 7 mandatory "use Android Enterprise fully managed instead if GMS is present" wording can be paraphrased within Claude's Discretion per D-10 | D-10 framing | LOW — D-10 locks the core assertion; paraphrasing retains semantic content. Core assertion (routing non-RealWear non-GMS-aware admins to fully managed) must be preserved. |

**Not in this table (not assumptions):**

- All 23 locked decisions D-01..D-23 from CONTEXT.md — these are user-decided, not researcher-assumed
- All 6 verified MS Learn / Google canonical facts (AOSP OEM list, DPC extras JSON byte-match, dual-SIM IMEI 1 text, KME mutual-exclusion text, Method A default-config-overrule caveat, reseller-side punt) — these are VERIFIED per WebFetch 2026-04-23, not assumed

## Open Questions (RESOLVED)

Residual research work that could not be closed in this session. All three OQs have been RESOLVED as noted inline below per 2026-04-23 research verification; execution proceeds under the documented dispositions.

### OQ-1: Dual-SIM IMEI 1 Confidence Level — MED (locked by D-05) vs HIGH (suggested by research) — RESOLVED: honor D-05 MEDIUM; cite both Google canonical sources in marker text

**What we know:**
- D-05 locks the marker as `[MEDIUM: Google Developers Zero-touch known issues, last_verified YYYY-MM-DD]`.
- Research this session found the claim verbatim at TWO Google canonical sources:
  - Google AE Help answer/7514005: "It's recommended for the resellers to register dual-SIM devices with the numerically lowest IMEI number."
  - Google Developers known-issues: "prefer the numerically lowest IMEI number as zero-touch enrollment works more reliably with the lowest IMEI."
- Both sources use "recommended" / "prefer" language (guidance, not hard requirement).

**What's unclear:**
- Whether "recommended" language supports MEDIUM (Google AE Help policy is MEDIUM when not hard-requirement; Google Developers known-issues is HIGH per research hierarchy) — mixed signal.
- Whether D-05 intended MEDIUM due to the "recommended not required" hedge, or due to single-source attribution (now invalidated — TWO sources).
- Whether planner should author `39-01-PLAN.md` task specs with MED marker (respects D-05 verbatim) or propose uplift to HIGH via discuss-phase.

**Recommendation:**
- SAFE path: Honor D-05 verbatim — MED marker at author time. Record this RESEARCH.md finding in the marker text (e.g., `[MEDIUM: Google Developers + Google AE Help, last_verified 2026-04-23]`).
- ASSERTIVE path: Flag to user via discuss-phase — "research verified at 2 canonical Google sources; propose upgrade to HIGH." This is a minor semantic uplift with low planning impact.

**Suggested planner default:** SAFE path — honor D-05 MEDIUM; include both source citations in the marker text. User can re-open if desired.

### OQ-2: Intune Plan 2 / Suite Licensing for AOSP Enrollment Per OEM — RESOLVED: 39-02 Task 1 Step 2 attempts plan-time re-verification; fallback is D-14 MEDIUM prose with inline marker

**What we know:**
- STATE.md flag + SUMMARY.md line 254 + D-14 all cite "Verify Intune Plan 2 / Suite requirement per OEM type before publishing enrollment guide with licensing notes."
- D-14 protocol: plan-phase researcher re-verifies at plan time; if unverified, MED marker per D-20.
- This research session attempted to find authoritative MS Learn licensing statement for AOSP; the AOSP supported-devices page itself does NOT state a licensing tier requirement. Related MS Learn pages (ref-corporate-methods) focus on GMS modes.

**What's unclear:**
- Does Intune Plan 1 cover AOSP enrollment, or is Plan 2 / Suite required?
- Per-OEM variation: is licensing uniform across all 8 OEMs, or specific to (e.g.) AR/VR headsets vs. wearable scanners?
- Whether Microsoft's "Intune Plan 1 vs Plan 2" documentation covers AOSP explicitly or leaves it as inferred.

**Recommendation:**
- Plan-time re-verification attempt against `learn.microsoft.com/en-us/intune/fundamentals/intune-plans-and-pricing` (or current equivalent).
- If still unresolved at plan time: populate `## Prerequisites and Licensing` H2 with MED marker per D-14. Body wording: "Intune Plan 1 is sufficient for baseline Android Enterprise enrollment including AOSP. Intune Suite / Plan 2 may be required for advanced features; verify against Microsoft Learn licensing at execute time. `[MEDIUM: research-inference, last_verified YYYY-MM-DD]`"
- The executor may then upgrade to HIGH via additional verification against MS Learn at execute time.

**Suggested planner default:** Include research-flag re-verification as an explicit W0 task in `39-02-PLAN.md` (per D-19 W0 = research-flag re-verification for AOSP stub). If W0 task finds authoritative answer, H2 body carries HIGH marker; if not, MED fallback.

### OQ-3: Google AE Help Reseller Guide URL — answer/9040598 vs answer/7514005 — RESOLVED: use answer/7514005; answer/9040598 is 404 stale per 2026-04-23 verification

**What we know:**
- STATE.md Phase 39 research flag #5 + CONTEXT.md D-22 both cite `support.google.com/work/android/answer/9040598` as the "Google reseller guide."
- This URL returned 404 at 2026-04-23 verification.
- `support.google.com/work/android/answer/7514005` is the canonical IT-admin-facing URL (verified HIGH this session; contains all content expected of the "reseller guide" reference including reseller workflow description and dual-SIM + KME content).

**What's unclear:**
- Whether `answer/9040598` was a reseller-SIDE URL (reseller-facing, not IT-admin-facing) — possible but not verified this session.
- Whether Google moved/merged the content into `answer/7514005` or into a different answer ID.

**Recommendation:**
- STATE.md Phase 39 research flag #5 and CONTEXT.md D-22 both contain the stale URL. These are USER decisions (locked) — research does not modify them — but research RECOMMENDS that planner surface this in `39-01-PLAN.md` task specs as: "canonical IT-admin reseller reference: `support.google.com/work/android/answer/7514005`. The `answer/9040598` URL referenced in STATE.md / CONTEXT.md D-22 is stale as of 2026-04-23 — replace in any `See Also` link target."

**Suggested planner default:** Use `answer/7514005` in all authored content. Flag D-22 URL discrepancy to user via plan-phase or discuss-phase if concerned about procedural alignment.

## Environment Availability

Documentation phase with no external runtime dependencies. All authoring tools are already in use across Phases 34-38.

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| git | PITFALL 9/11 shared-file modification guard via `git diff` | ✓ | 2.x (Windows Git for Windows) | — |
| grep (Bash / coreutils) | AEAUDIT-04 mechanical checks per Phase 42 and Phase 39 W2 per-plan gates | ✓ | GNU grep (via Git for Windows bash) | — |
| wc (coreutils) | Phase 42 audit word-count hints (not primary guard — D-11 is structural) | ✓ | — | — |
| Network (HTTPS to docs.microsoft.com / learn.microsoft.com / support.google.com / developers.google.com / androidenterprisepartners.withgoogle.com) | Plan-time + execute-time canonical-source re-verification per D-22 | ✓ | — | MEDIUM-confidence markers if network unavailable at execute time |
| Markdown renderer (for preview) | Optional — not required for authoring | ✓ | GFM | — |
| Mermaid renderer (optional — D-01 discretion re: flow diagram) | Optional per Claude's Discretion | ✓ | Rendered server-side if included | Skip diagram if render-capability unclear |

**Missing dependencies with no fallback:** None.

**Missing dependencies with fallback:** None.

**No blocking environment gaps.** All verification can proceed at plan time and execute time with existing tooling.

## Validation Architecture

Per config.json, `workflow.nyquist_validation` is absent — treat as enabled (default). This phase is a documentation phase with no traditional test framework; validation follows the Phase 35 precedent (grep-based mechanical checks + structural audits). Phase 42 AEAUDIT-04 is the canonical audit layer; Phase 39 W2 per-plan audit gates are the in-phase sampling.

### Test Framework

| Property | Value |
|----------|-------|
| Framework | Bash + grep + wc + git (no test runner) — matches Phase 35/36/37/38 precedent |
| Config file | None — checks are per-task grep commands specified in VALIDATION.md |
| Quick run command | Targeted grep against the file modified by the current task (see Per-Task map in VALIDATION.md when authored) |
| Full suite command | Sequential execution of all grep checks defined in VALIDATION.md Per-Task Verification Map |

Typical runtime: < 10 seconds across 2 small markdown files + git diff.

### Phase Requirements → Test Map

Preview — full map authored into `39-VALIDATION.md` as the next step in phase-op sequence. Illustrative entries below.

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| AEZTE-01 | `## Corporate-Scale Operations` H2 present in ZT portal doc | grep | `grep -cE '^## Corporate-Scale Operations' docs/admin-setup-android/02-zero-touch-portal.md` ≥ 1 | ❌ W0 |
| AEZTE-01 | All 6 H3 sub-sections present under the H2 | grep | `grep -cE '^### (Reseller-Upload Handoff Workflow\|Device Claim Workflow\|Profile Assignment at Scale\|Dual-SIM IMEI 1 Registration\|KME/ZT Mutual Exclusion.+Device Claim\|Configuration Must Be Assigned)' docs/admin-setup-android/02-zero-touch-portal.md` = 6 | ❌ W0 |
| AEZTE-01 (D-17 anchors) | 6 ZTE anchors present | grep | `grep -cE 'id="(reseller-upload-handoff\|device-claim-workflow\|profile-assignment\|dual-sim-imei-1\|kme-zt-device-claim\|configuration-must-be-assigned)"' docs/admin-setup-android/02-zero-touch-portal.md` = 6 | ❌ W0 |
| AEZTE-01 (D-22 append-only) | Phase 35 H2 order preserved in positions 1-6 and 8+ | grep + structural | `grep -n '^## ' docs/admin-setup-android/02-zero-touch-portal.md` returns Phase 35 H2s in expected order with `## Corporate-Scale Operations` inserted at position 7 | ❌ W0 |
| AEZTE-01 (D-05 marker) | Dual-SIM source-confidence marker present with regex match | grep | `grep -E '\[(HIGH\|MEDIUM)(: [A-Za-z ,]+)?, last_verified [0-9]{4}-[0-9]{2}-[0-9]{2}\]' docs/admin-setup-android/02-zero-touch-portal.md` returns ≥ 1 match near `#dual-sim-imei-1` anchor | ❌ W0 |
| AEAOSP-01 | New file `06-aosp-stub.md` exists with frontmatter `applies_to: AOSP` | grep + file-existence | `grep -c '^applies_to: AOSP' docs/admin-setup-android/06-aosp-stub.md` = 1 | ❌ W0 |
| AEAOSP-01 (D-11 H2 whitelist) | Exactly 9 H2 headings matching whitelist names in order | grep + structural | `grep -E '^## ' docs/admin-setup-android/06-aosp-stub.md` returns exactly: `## Scope and Status`, `## What AOSP Is`, `## When to Use AOSP`, `## Supported OEMs`, `## Enrollment Constraints`, `## Prerequisites and Licensing`, `## Deferred Content`, `## See Also`, `## Changelog` — in order | ❌ W0 |
| AEAOSP-01 (D-07) | RealWear-spotlight H3 + Other AOSP OEMs H3 present | grep | `grep -cE '^### (RealWear.+confirmed GA\|Other AOSP-Supported OEMs)' docs/admin-setup-android/06-aosp-stub.md` = 2 | ❌ W0 |
| AEAOSP-01 (D-09) | All 8 MS Learn OEMs enumerated | grep | `grep -ciE 'digilens\|htc\|lenovo\|meta\|pico\|realwear\|vuzix\|zebra' docs/admin-setup-android/06-aosp-stub.md` ≥ 8 | ❌ W0 |
| AEAOSP-01 (D-10) | PITFALL-7 framing present | grep | `grep -cE 'fully managed instead\|not supported under AOSP' docs/admin-setup-android/06-aosp-stub.md` ≥ 1 | ❌ W0 |
| AEAOSP-01 (D-13) | Wi-Fi credential embedding explicit content | grep | `grep -cE 'Wi-Fi credential' docs/admin-setup-android/06-aosp-stub.md` ≥ 1 | ❌ W0 |
| AEAOSP-01 (D-13) | QR-only + one-device-at-a-time | grep | `grep -cE 'QR.?only\|one device at a time\|one-device-at-a-time' docs/admin-setup-android/06-aosp-stub.md` ≥ 2 | ❌ W0 |
| AEAOSP-01 (D-11 + PITFALL 12) | Word-count within envelope 600-900 | structural | `wc -w docs/admin-setup-android/06-aosp-stub.md` between 600-900 excluding frontmatter/See Also/Changelog | ❌ W0 |
| AEAOSP-01 (D-21) | Platform note banner present | grep | `grep -cE 'Platform note' docs/admin-setup-android/06-aosp-stub.md` ≥ 1 | ❌ W0 |
| AEAOSP-01 (D-12) | `## Deferred Content` has NO version suffix | grep | `grep -cE '^## Deferred Content( \(v1\.4\.[0-9]\))?$' docs/admin-setup-android/06-aosp-stub.md` with match having no parentheses = 1 | ❌ W0 |
| AEAUDIT-04 pre-check | No SafetyNet references | grep | `grep -cin 'safetynet' docs/admin-setup-android/02-zero-touch-portal.md docs/admin-setup-android/06-aosp-stub.md` = 0 | ❌ W0 |
| AEAUDIT-04 pre-check | No "supervision" as Android management term | grep | `grep -cin 'supervis' docs/admin-setup-android/02-zero-touch-portal.md docs/admin-setup-android/06-aosp-stub.md` returns zero matches OR only matches in explicit cross-platform-note contexts | ❌ W0 |
| PITFALL 9/11 (D-18) | Zero modifications to v1.0-v1.3 shared files across phase commits | git | `git diff --name-only <Phase 39 base> HEAD -- docs/_glossary.md docs/_glossary-macos.md docs/_glossary-android.md docs/index.md docs/common-issues.md docs/quick-ref-l1.md docs/quick-ref-l2.md docs/admin-setup-ios/ docs/admin-setup-macos/ docs/l1-runbooks/ docs/l2-runbooks/ docs/end-user-guides/` returns empty | ❌ gate |
| Anchor stability (D-17) | All 9 locked anchors resolve | structural | Every anchor in D-17 list resolves to `<a id="...">` scaffolding in the corresponding file | ❌ W0 |
| Frontmatter | `last_verified` + `review_by` + 60-day delta | grep + date | Both docs have both fields; `review_by - last_verified` ≤ 60 days | ❌ W0 |

### Sampling Rate

- **Per task commit:** Targeted grep against the file(s) modified by that task. Anchor-integrity spot-check for any doc modified. Runtime: < 5 seconds.
- **Per wave merge:** File-existence check on both deliverables; frontmatter presence + 60-day `review_by` check; AEAUDIT-04 pre-check greps ("supervision", "SafetyNet"); PITFALL 9/11 `git diff` shared-file guard.
- **Phase gate:** Full suite green before `/gsd-verify-work`. All Per-Task Verification Map entries ✅; zero shared-file modifications; all 9 D-17 anchors resolve; AOSP stub H2 whitelist mechanical check passes.

### Wave 0 Gaps

- [ ] `docs/admin-setup-android/06-aosp-stub.md` — doesn't exist yet; 39-02 W1 creates (tested at 39-02 W2)
- [ ] `## Corporate-Scale Operations` H2 block in `docs/admin-setup-android/02-zero-touch-portal.md` — doesn't exist yet; 39-01 W1 appends (tested at 39-01 W2)
- [ ] `39-VALIDATION.md` authored with full Per-Task Verification Map — next step in phase-op sequence
- [ ] `39-01-PLAN.md` and `39-02-PLAN.md` authored — planner next

**Framework install:** None — bash + coreutils + git already in place; identical to Phase 35/36/37/38 validation harness.

**Precedent reuse:** Phase 35 `35-VALIDATION.md` is the closest pattern match (multi-plan documentation phase with per-task grep map). Planner can inherit the VALIDATION.md structure directly, substituting Phase 39 task IDs and grep commands.

## Security Domain

Per config.json, `security_enforcement` is absent — treat as enabled. This is a documentation phase with no authentication, session management, cryptography, or input processing. ASVS categories apply only to content-integrity and supply-chain-of-truth concerns.

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V2 Authentication | no | N/A (no code; no credential handling) |
| V3 Session Management | no | N/A |
| V4 Access Control | no | N/A |
| V5 Input Validation | no | N/A (no user input; authored content is deterministic) |
| V6 Cryptography | no | N/A (no crypto; DPC extras JSON signature checksum is content, not a crypto operation performed by this phase) |
| V10 Malicious Code | yes | Content review — ensure no links to malicious sources; prefer canonical MS Learn + Google AE Help over community blog posts |
| V14 Configuration | yes | Frontmatter schema enforcement (D-16); shared-file modification guard (D-18); grep-based mechanical audits |

### Known Threat Patterns for Documentation

| Pattern | STRIDE | Standard Mitigation |
|---------|--------|---------------------|
| Stale source citations leading to admin misconfiguration | Information Disclosure (indirect — admin misapplies stale guidance) | `last_verified` frontmatter + 60-day review cycle + source-confidence markers |
| Link-rot in external canonical-source references | Information Disclosure | Canonical sources hosted on MS Learn / Google — institutional persistence; plan-time + execute-time re-verification per D-22 |
| Cross-platform terminology collision (e.g., "supervision" used for Android) | Repudiation (admin applies wrong mental model based on iOS term used in Android context) | AEAUDIT-04 grep guard; PITFALL 3 discipline |
| Documented secret/token placeholder accidentally becomes production value | Information Disclosure | DPC extras JSON uses `YourEnrollmentToken` placeholder; Phase 35 verification checklist (line 134) explicitly verifies token substitution; Phase 39 does not re-author the JSON |
| Source-confidence marker dilution (all claims marked MED — readers tune out) | Repudiation (admin trusts marked claim equally to unmarked) | D-04 / D-20 — markers only on assertions that cannot be re-sourced; not every portal step (F-1C-03) |
| PITFALL 7 non-adherence — non-RealWear OEM enrollment documented as supported without GA verification | Information Disclosure | D-07 + D-10 PITFALL-7-mandated framing; Phase 42 AEAUDIT-04 grep checks |
| Shared-file modification leaking Android content into v1.0-v1.3 navigation | Tampering (breaks established cross-platform nav contract) | D-18 + PITFALL 9/11; Phase 42 AEAUDIT git diff guard |

No auth, crypto, or input-validation hand-rolling. All content authored per canonical-source-first discipline.

## Sources

### Primary (HIGH confidence)

- [MS Learn — Android Open Source Project Supported Devices](https://learn.microsoft.com/en-us/intune/fundamentals/aosp-supported-devices) — OEM list, device models, minimum firmware, device type. `ms.date: 2025-05-12`, `updated_at: 2026-04-16`. Verified 2026-04-23 via WebFetch. 18 rows across 8 OEMs confirmed.
- [MS Learn — Enroll Android Enterprise dedicated, fully managed, or corporate-owned work profile devices in Intune (ref-corporate-methods)](https://learn.microsoft.com/en-us/intune/device-enrollment/android/ref-corporate-methods) — Zero-Touch iframe linking (Method A), direct ZT portal configuration (Method B), DPC extras JSON canonical blob. `ms.date: 2025-12-04`, `updated_at: 2026-04-16`. Verified 2026-04-23 via WebFetch.
- [Google Android Enterprise Help — Zero-touch enrollment for IT admins (answer/7514005)](https://support.google.com/work/android/answer/7514005) — Reseller workflow framing, device identifier requirements, dual-SIM IMEI 1 guidance, KME mutual-exclusion behavior. Verified 2026-04-23 via WebFetch.
- [Google Developers — Zero-Touch Known Issues](https://developers.google.com/zero-touch/resources/known-issues) — Dual-SIM IMEI 1 known-issue verbatim text, KME/ZT mutual-exclusion known-issue verbatim text. Verified 2026-04-23 via WebFetch.
- [Phase 35 shipped file — docs/admin-setup-android/02-zero-touch-portal.md](../../../docs/admin-setup-android/02-zero-touch-portal.md) — Canonical target for Phase 39 append. Read 2026-04-23. All 10 H2s and 7 anchors verified.
- [Phase 34 shipped template — docs/_templates/admin-template-android.md](../../../docs/_templates/admin-template-android.md) — Canonical template for AOSP stub authoring. Read 2026-04-23. HTML-comment subtractive-deletion pattern confirmed at lines 82-85.

### Secondary (MEDIUM confidence)

- [Android Enterprise Business Device Solutions Directory — Resellers](https://androidenterprisepartners.withgoogle.com/resellers/) — Referenced in Phase 35 shipped file line 37; Phase 39 cross-references but does not re-verify (Phase 35 verification carries)
- [Google ZT customer-portal help](https://support.google.com/work/android/topic/9158960) — Customer-facing portal help index, used as device-claim-workflow canonical link per D-01 / D-04. Not deeply re-verified this session (link target is a topic index, stable).
- `.planning/research/STACK.md` line 116-145 + line 249-272 — 8-OEM list, reseller ecosystem, SPARSE DOC FLAG. Read 2026-04-23; content matches MS Learn verification.
- `.planning/research/PITFALLS.md` — PITFALL 4 / 7 / 9 / 11 / 12 verbatim. Read 2026-04-23.
- `.planning/research/SUMMARY.md` lines 230-254 — Phase 39 + Phase 40 research summary, flags. Read 2026-04-23.

### Tertiary (LOW confidence / needs plan-time re-verification)

- Intune Plan 2 / Suite licensing for AOSP per OEM — **NOT verified this session** (see OQ-2). D-14 protocol: MED fallback if still unresolved at plan time.
- `support.google.com/work/android/answer/9040598` — **STALE (404)** as of 2026-04-23 (see OQ-3 + State of the Art table). Replacement: `answer/7514005`.
- Zero-Touch portal current UI breadcrumb paths — ZT portal has history of redesigns per STATE.md flag #1. Decision-points-as-prose discipline (D-04) mitigates; HTML-comment `<!-- verify UI at execute time -->` on any portal-step claim.

### Stale URL Log

For transparency — URL referenced in CONTEXT.md / STATE.md that this research verified stale:

- `support.google.com/work/android/answer/9040598` — 404 at 2026-04-23. CONTEXT.md D-22 research-flag #4 + STATE.md Phase 39 flag #5 both cite this URL. Use `answer/7514005` instead.

## Metadata

**Confidence breakdown:**

- Standard stack: HIGH — documentation-phase "stack" is 100% inherited from Phases 34-38 shipped precedents; no net-new tooling choices
- Architecture: HIGH — D-01..D-23 adversarial-review output locks every structural choice; research verified the D-01 H2-position-7 fits Phase 35's shipped H2 order; D-11 H2 whitelist is mechanically audit-able
- Pitfalls: HIGH — inherited pitfall catalog from Phases 34-38 + 7 Phase-39-specific pitfalls identified this session (all sourced from adversarial review findings + canonical-source re-verification)
- Source verification: HIGH — 5 of 6 research flags closed this session via WebFetch; OQ-1 and OQ-2 are low-impact residual items

**Research date:** 2026-04-23

**Valid until:** 2026-05-23 (30-day window for stable content — but ZT portal UI is HIGH-drift and AOSP OEM matrix is updated by Microsoft periodically; executor MUST re-verify at execute time regardless of research validity window)

**Research completeness:** 5 of 6 STATE.md-flagged items closed at HIGH confidence; 1 (Intune Plan 2/Suite) residual via OQ-2 with MED fallback protocol locked in D-14.

**Next step in phase-op sequence:** Author `39-VALIDATION.md` with full Per-Task Verification Map (preview above); then planner authors `39-01-PLAN.md` and `39-02-PLAN.md` in parallel per D-15.
