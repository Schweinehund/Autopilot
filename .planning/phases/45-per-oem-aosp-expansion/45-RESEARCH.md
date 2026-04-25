# Phase 45: Per-OEM AOSP Expansion — Research

**Researched:** 2026-04-25
**Domain:** Microsoft Intune AOSP device management — per-OEM admin coverage (RealWear / Zebra / Pico / HTC VIVE Focus / Meta Quest)
**Confidence:** HIGH (MS Learn primary source verified 2026-04-25; per-OEM specifics verified against vendor authoritative sources; Meta Horizon wind-down fully resolved against authoritative Meta channel)

## Summary

Phase 45 lifts the v1.4 hard-scoped AOSP stub (`docs/admin-setup-android/06-aosp-stub.md`) into real per-OEM coverage across 5 specialty-hardware OEMs while preserving Phase 39's PITFALL-7 "not supported under AOSP" framing. All adversarial-review winners (GA1=1B / GA2=2B / GA3=3B / GA4=4A) are LOCKED in `45-CONTEXT.md`. This research delivers the verified per-OEM technical reference that the planner needs to author 5 admin docs (09-13), 1 reference matrix (`aosp-oem-matrix.md`), 2 runbooks (L1 29 + L2 23), and 5 atomic same-commit retrofits.

**Headline finding (D-06 plan-time gate resolved):** Meta Horizon Managed Services wind-down on Feb 20, 2026 is **HIGH-confidence VERIFIED** against Meta's official `forwork.meta.com/blog/an-update-on-meta-for-work/` channel — but the wind-down is NOT a discontinuation. It is a **commercial-SKU + paid-tier discontinuation with HMS infrastructure entering free-tier maintenance mode through Jan 4, 2030**. Per D-07 branch-resolution, this maps to a **HIBRID branch: Intune-direct AOSP enrollment is preferred for net-new (commercial Quest SKUs no longer sold post-2026-02-20); existing HMS subscribers continue uninterrupted; HMS is now free for managing consumer Quest 3/3s through 2030-01-04**. The 4-portal pattern (Intune + Meta for Work) IS preserved in the doc per D-08 LOCKED deliverables, with the wind-down callout properly framed as "commercial-SKU discontinuation + free-tier transition" rather than "HMS shutdown."

**Headline finding #2 (token expiry asymmetry — surprise):** MS Learn explicitly documents two AOSP token ceilings: **userless = 90 days max**; **user-associated = up to 65 years**. The "AOSP 90-day token ceiling" referenced in CONTEXT D-30 + AEAOSPFULL-09 SC#5 is the userless ceiling; user-associated tokens follow the 65-year COBO pattern. Both must be surfaced distinctly in `02-provisioning-methods.md`.

**Headline finding #3 (RealWear Wi-Fi auth narrowing):** Per RealWear's authoritative support docs, the staging Wi-Fi network embedded in the AOSP QR **MUST be WPA/WPA2-PSK or WPA3** — NOT EAP-PEAP, NOT EAP-TLS. This contradicts the PHASE-45-AOSP-SOURCE.md placeholder which speculated EAP support. Document explicitly that EAP (PEAP/TLS) is NOT supported for staging Wi-Fi; corporate EAP networks require separate device-restrictions Wi-Fi config post-enrollment.

**Headline finding #4 (Zebra Android-12 gap):** MS Learn `oemconfig-zebra-android-devices` (updated 2026-04-14) explicitly states **"Zebra devices don't support Android 12"**. WS50 ships on Android 11 (firmware 11-49-15.00 minimum per AOSP supported-devices page).

**Primary recommendation:** Plan Wave 1 with confidence — all per-OEM data points are verified against primary sources. Wave 2 / Wave 3 / Wave 4 follow without research blockers. Use `[HIGH: <source>, last_verified 2026-04-25]` markers throughout; only the per-OEM "Common Failures" inventory carries MEDIUM markers because some failure-mode signal comes from community sources (RealWear support forum, Microsoft Q&A).

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**GA1 — Per-OEM Admin Doc Shape (D-01..D-05) — Winner Option 1B (Hybrid 11-H2 sibling-parity baseline + per-OEM REQUIRED add-ons)**

- **D-01:** 11-H2 fixed core in fixed order for all 5 per-OEM admin docs (09-13):
  1. `## Scope and Status` (PITFALL-7 framing inline at top)
  2. `## Hardware Scope` (models + firmware minimums)
  3. `## Prerequisites and Licensing`
  4. `## Enrollment Method`
  5. `## Provisioning Steps` (step-numbered H3 children: `### Step 0 — ...`)
  6. `## Verification`
  7. `## Common Failures`
  8. `## Renewal / Maintenance`
  9. `## What Breaks Summary`
  10. `## See Also`
  11. `## Changelog`

- **D-02:** Per-OEM REQUIRED add-on H2s between H2 #5 and H2 #6:
  - `09-aosp-realwear.md`: `## Wi-Fi QR Embedding Walkthrough` (REQUIRED)
  - `10-aosp-zebra.md`: `## OEMConfig APK Push (Intune)` (REQUIRED)
  - `11-aosp-pico.md`: `## Pico Business Suite Coexistence` (OPTIONAL — preserves AEAOSPFULL-03 literal "optional")
  - `12-aosp-htc-vive-focus.md`: NO add-on H2s (preserves "simplest of AR/VR OEMs" framing)
  - `13-aosp-meta-quest.md`: `## Meta for Work Portal Setup` AND `## Meta Horizon Subscription Status` — BOTH REQUIRED REGARDLESS of alive-status

- **D-03:** Universal banner contract — `> **Platform gate:** ...` + `> **Platform note:** ...` blockquotes BEFORE H1.
- **D-04:** PITFALL-7 framing per-claim discipline — every "supported under AOSP" assertion paired inline with AOSP baseline caveat.
- **D-05:** Anchor scaffolding contract — stable `<a id="..."></a>` anchors at minimum on `#prerequisites`, `#provisioning-steps`, `#verification`, `#renewal-maintenance`, `#what-breaks-summary`, plus per-OEM add-on anchors.

**GA2 — Meta Horizon Strategy (D-06..D-10) — Winner Option 2B (Plan-time re-verification gate with branch-resolution + MEDIUM-marker safe-default)**

- **D-06:** Plan-time re-verification gate against Meta Business Help / Meta for Work official channels + corroborating source. Same-source MEDIUM community re-confirmation INSUFFICIENT. **RESOLVED IN THIS RESEARCH — see "Meta Horizon Wind-Down Re-Verification" section below.**
- **D-07:** Branch-resolution rule (HIGH-DISCONTINUED → Intune-direct + historical appendix; HIGH-ALIVE → dual-path; Unresolvable → MEDIUM marker + dual-path safe-default).
- **D-08:** LOCKED deliverables PRESERVED across all branches (4-portal pattern, MHS subscription requirement, regional restrictions, Feb 20 callout, PITFALL-7 framing).
- **D-09:** Meta-for-Work approval gate as `### Step 0 — ...` H3 inside `## Provisioning Steps` if onboarding latency exists.
- **D-10:** 30-day re-verify trigger for wind-down assertion in `## Renewal / Maintenance` H2.

**GA3 — `aosp-oem-matrix.md` Shape (D-11..D-16) — Winner Option 3B (Multiple narrow tables grouped by capability)**

- **D-11:** Four `## H2` sub-tables in fixed order:
  1. `## Hardware Scope`
  2. `## Enrollment Method and Wi-Fi Embedding`
  3. `## Vendor Portals and Licensing`
  4. `## Intune AOSP Mode`
- **D-12:** Dimension fidelity — all 5 AEAOSPFULL-06 dimensions as named columns. NO prose-Notes column.
- **D-13:** Single `## Scope` H2 at top carries PITFALL-7 framing once (do NOT repeat).
- **D-14:** Meta Horizon volatility via reference-style footnote `[^meta-volatility]`.
- **D-15:** Source-confidence markers OUTSIDE tables in `## Source Attribution` section at file bottom.
- **D-16:** Cell-value rules — literal strings (`Yes` / `No` / `REQUIRED` / `OPTIONAL` / `N/A` / `Plan 1` / `Plan 2` / `Suite`); NO `+` notation; footnotes for exceptions.

**GA4 — L1/L2 Runbook Split + Triage Tree Integration (D-17..D-22) — Winner Option 4A (Single L1 runbook 29 with OEM-scoped Causes A-E + aggregate Escalation Criteria)**

- **D-17:** L1 runbook 29 — 5 OEM-scoped Causes A-E + aggregate `## Escalation Criteria`.
- **D-18:** L2 runbook 23 — per-OEM Pattern A-E (1:1 routing); Play Integrity 3-tier verdicts only; zero SafetyNet.
- **D-19:** Triage tree edit — single ANDR29 click target (preserves Phase 40 D-05 LOCK + ROADMAP SC#4 singular wording).
- **D-20:** In-runbook OEM-identification step (`## How to Use This Runbook` BEFORE Cause list).
- **D-21:** Cross-link anchor convention — Causes cross-link to per-OEM admin guide `## Common Failures` H2 anchor.
- **D-22:** Sibling-departure rationale entries REQUIRED in 45-PLAN.md.

**Locked Carry-Forward Decisions (D-23..D-30):**

- **D-23:** PITFALL-7 framing carry-forward (Phase 39 D-10 + STATE.md Blocker).
- **D-24:** `06-aosp-stub.md` 9-H2 whitelist preserved (Phase 39 D-11).
- **D-25:** Append-only contract on shared files (capability matrix anchor fill, 00-overview.md Mermaid, glossary alphabetical index).
- **D-26:** 60-day Android freshness rule (Phase 34 D-14).
- **D-27:** Frontmatter contract — admin docs `audience: admin`, `platform: Android`, `applies_to: AOSP`; runbooks `audience: L1` / `L2`, `platform: Android`, `applies_to: AOSP`; matrix `audience: admin`.
- **D-28:** Source-confidence marker regex `\[(HIGH|MEDIUM|LOW)(: [A-Za-z ]+)?(, last_verified \d{4}-\d{2}-\d{2})?\]`.
- **D-29:** Shared-file modification guard (NO writes to `docs/index.md`, `common-issues.md`, `quick-ref-l1.md`, `quick-ref-l2.md`, `_glossary.md`, `_glossary-macos.md`, `admin-setup-ios/`, `admin-setup-macos/`, `end-user-guides/`, `_templates/`).
- **D-30:** Wave structure (Wave 1 = 5 admin docs in parallel; Wave 2 = matrix + stub collapse; Wave 3 = L1+L2 runbooks in parallel; Wave 4 = atomic retrofits).

### Claude's Discretion

- Exact word counts within envelopes (per-OEM admin docs ~1500-2500 words; matrix ~600-1000 words; L1 runbook 29 ~280-310 lines per Knox runbook 28 sibling at 234 lines; L2 runbook 23 ~305 lines per Knox runbook 22 sibling).
- Exact prose for PITFALL-7 framing pairings.
- Mermaid diagram inclusion in any per-OEM admin doc.
- `## See Also` cross-link composition.
- Footnote text composition in `aosp-oem-matrix.md`.
- Per-OEM `## Common Failures` H2 internal structure (table vs bullets vs sub-H3s).
- Frontmatter `applies_to` value for runbook 29 / 23 (`AOSP` is the natural value).
- Wave 2 `06-aosp-stub.md` collapse timing.

### Deferred Ideas (OUT OF SCOPE)

- DigiLens, Lenovo (ThinkReality VRX), Vuzix per-OEM AOSP coverage — future v1.5+
- AOSP user-associated vs userless mode admin-guide-level disambiguation beyond per-OEM hint — Phase 47 / v1.5
- AOSP harness mechanical checks (C7-equivalent for AOSP terms) — Phase 47 owns
- Vendor-proprietary MDM (ArborXR / ManageXR / Ivanti / Omnissa) deep coverage
- Zebra MX schema deep documentation
- Knox tablet / wearable / Galaxy XR per-OEM variants
- 4-platform unified capability comparison (DEFER-08 / AECOMPARE-01 → v1.5)
- Cross-platform nav unification (DEFER-07 / AENAVUNIFY-04 → v1.5)
- Wi-Fi-embed QR generator UI walkthrough beyond Intune admin center steps (RealWear Cloud QR generator vendor-side UI)
- Mermaid diagram requirement in per-OEM admin docs

</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| AEAOSPFULL-01 | RealWear per-OEM admin (`09-aosp-realwear.md`) — HMT-1, HMT-1Z1, Navigator 500; Wi-Fi-credentials-embedded-in-QR REQUIRED; Intune-direct OR hybrid with RealWear Cloud | §1 RealWear (devices + firmware verified MS Learn 2026-04-16); §7 Wi-Fi QR walkthrough (RealWear authoritative source — WPA/WPA2-PSK/WPA3 only, NOT EAP); RealWear Cloud co-existence verified at support.realwear.com [HIGH] |
| AEAOSPFULL-02 | Zebra per-OEM admin (`10-aosp-zebra.md`) — WS50 wearable scanner; OEMConfig-via-Intune-APK path (NOT MGP); StageNow desktop tool optional | §1 Zebra (WS50 firmware 11-49-15.00 min, MS Learn 2026-04-16); §6 OEMConfig delivery (MS Learn `oemconfig-zebra-android-devices` 2026-04-14 — TWO OEMConfig apps "Zebra OEMConfig Powered by MX" Android 13+/11 vs "Legacy Zebra OEMConfig" Android 11 and earlier); StageNow XML-export-to-MDM workflow [HIGH] |
| AEAOSPFULL-03 | Pico per-OEM admin (`11-aosp-pico.md`) — Pico 4 Enterprise, Neo3 Pro/Eye; Enterprise SKU required (not consumer); Pico Business Suite optional coexistence | §1 Pico (PUI 5.6.0 / PUI 4.8.19 minimums per MS Learn 2026-04-16); §6 Pico Business Suite (PICO Business sub-brand for enterprise; SDK $50-$150/year/device per MEDIUM community sources); Enterprise SKU disambiguation vs consumer Pico 4 [HIGH/MEDIUM] |
| AEAOSPFULL-04 | HTC VIVE Focus per-OEM admin (`12-aosp-htc-vive-focus.md`) — Vive Focus 3, XR Elite, Focus Vision; direct-QR Intune flow (simplest); 3-model firmware minimum matrix | §1 HTC (Focus 3 5.2-5.0.999.624 / XR Elite 4.0-1.0.999.350 / Focus Vision 7.0.999.159 per MS Learn 2026-04-16); §6 in-device UI path (Settings > Advanced > MDM setup > QR code per vive.com support docs) [HIGH] |
| AEAOSPFULL-05 | Meta Quest per-OEM admin (`13-aosp-meta-quest.md`) — Quest 2/3/3s/Pro; 4-portal pattern (Intune + Meta for Work; MGP/ZT N/A); Meta Horizon Managed Services subscription gate; regional restrictions per model; Feb 20 2026 wind-down re-verification gate + Intune-direct fallback | §1 Meta (Quest 2 v49 / Quest 3 v59 / Quest 3s v71 / Quest Pro v49 per MS Learn 2026-04-16; 2/3/Pro region-restricted); §2 Meta Horizon wind-down RESOLVED HIGH-confidence (commercial-SKU sales end 2026-02-20; HMS becomes FREE; maintenance mode through 2030-01-04 per Meta's official forwork.meta.com blog); 4-portal pattern PRESERVED [HIGH] |
| AEAOSPFULL-06 | AOSP OEM matrix (`docs/reference/aosp-oem-matrix.md`) — OEM × capability dimensions (5 dimensions: enrollment methods / vendor portals / license tiers / Intune AOSP mode / Wi-Fi embedding) | §1 per-OEM dimension data; §3 MS Learn supported-devices snapshot 2026-04-25; D-11 4-table shape; D-15 source-attribution policy [HIGH] |
| AEAOSPFULL-07 | L1 runbook 29 (`29-android-aosp-enrollment-failed.md`) — replaces ANDE1 escalation stub; ANDE1 → ANDR29 resolved node | §4 sibling-pattern excerpts (Knox runbook 28 OEM-scoped Cause structure at lines 33-39, 192-211); §8 per-OEM Common Failures taxonomy; D-17 + D-19 triage edit [HIGH] |
| AEAOSPFULL-08 | L2 runbook 23 (`23-android-aosp-investigation.md`) — per-OEM symptom catalog; Play Integrity only; cross-links to admin guides 09-13 | §4 sibling Pattern A-E precedent (Knox runbook 22 lines 113-254); D-18 1:1 OEM Pattern routing [HIGH] |
| AEAOSPFULL-09 | Retrofit `06-aosp-stub.md` (collapse deferred-content table; preserve PITFALL-7) + fill `android-capability-matrix.md:121-127` anchor + update `02-provisioning-methods.md` (90-day token + per-OEM firmware rows) | §3 token expiry asymmetry (userless=90d / user-associated=65y); §1 per-OEM firmware rows; §4 anchor target patterns [HIGH] |

</phase_requirements>

## Project Constraints (from CLAUDE.md)

- Markdown for git versioning + wiki export
- Three audiences: L1 (scripted) / L2 (technical) / Admins (step-by-step)
- Generic Microsoft Intune guidance — not tenant-specific
- Documentation-only phase (no executable code; ASVS L1 security threat model largely N/A beyond doc-supply-chain). Phase 45 carries no API surface, no auth flows, no input-validation surface — `security_enforcement` not applicable as defined for code-bearing phases.

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|--------------|----------------|-----------|
| Per-OEM admin guidance (5 docs) | Documentation-as-Reference | — | Single canonical source per OEM for Intune admin workflow |
| AOSP cross-OEM matrix | Documentation-as-Reference | — | Sibling pattern: Android/iOS/macOS capability matrices live in `docs/reference/` |
| L1 enrollment-failure runbook | Documentation-as-Operational-Procedure | — | L1 Service Desk scripted procedure; portal-only; no code surface |
| L2 investigation runbook | Documentation-as-Operational-Procedure | — | L2 Desktop Engineering technical investigation; READ-ONLY Graph API references |
| Triage tree integration | Documentation-as-Routing | — | Mermaid + table edit; single click-target replacement |
| Capability matrix anchor fill | Documentation-as-Reference | — | Atomic retrofit per AEAOSPFULL-09; sibling Knox-row precedent (Phase 44 Plan 04) |
| Provisioning-methods 90-day token + firmware rows | Documentation-as-Reference | — | Additive H2/row; sibling Knox provisioning-methods anchor precedent |
| Stub collapse | Documentation-as-Source-Migration | — | Phase 39 9-H2 whitelist + 8-OEM enumeration + PITFALL-7 PRESERVED; deferred-content table COLLAPSED |

**Why this matters:** Phase 45 is documentation-only. Tier-misassignment risk is zero — there is no code/API/data tier. The "tier" axis here is *documentation type*, and that mapping is locked by sibling-pattern conventions established in Phases 34-44. Wave structure (D-30) sequences the 4 documentation tiers correctly: admin guides land first (Wave 1) so matrix/runbooks (Waves 2-3) have anchors to cross-link; atomic retrofits land last (Wave 4) so they reflect final state.

## Standard Stack

### Core (Documentation Stack)

| Tool / Convention | Version / Source | Purpose | Why Standard |
|-------------------|------------------|---------|--------------|
| Markdown (CommonMark + GitHub-Flavored Markdown extensions) | n/a | Documentation authoring | Project uses md across 143+ files; locked since v1.0 |
| YAML frontmatter | n/a | `last_verified` / `review_by` / `audience` / `platform` / `applies_to` | Phase 34 D-14 60-day cycle; Phase 37 D-15 single-string `applies_to`; Phase 27 audit harness reads frontmatter |
| Mermaid diagrams | GitHub native | Triage tree (08-android-triage.md edit) | Phase 30 D-04 locked; sibling 5-mode + 6-mode patterns |
| HTML-comment subtractive deletion | `<!-- subsection intentionally omitted -->` | Tri-portal template H4 omission | Phase 34 D-17; current usage in `06-aosp-stub.md:15-19` |
| HTML-comment verify-UI-at-execute-time | `<!-- verify UI at execute time -->` | Portal-nav specifics subject to UI drift | Phase 39 D-07; sibling usage 02-zero-touch-portal.md:48,50,72,73 |
| Source-confidence inline markers | `[(HIGH|MEDIUM|LOW)(: [A-Za-z ]+)?(, last_verified \d{4}-\d{2}-\d{2})?]` regex | Per-claim source attribution | Phase 37 D-11 / Phase 39 D-20 / D-28 carry-forward |
| Reference-style footnote | `[^meta-volatility]` | aosp-oem-matrix.md Meta-row volatility callout | D-14 LOCKED; markdown reference-style footnote |
| Audit harness | `scripts/validation/v1.4.1-milestone-audit.mjs` | C1-C5 mechanical checks (informational-first per D-29 for C6/C7/C9) | Phase 43 LOCKED; Phase 45 ships content-only |

### Supporting

| Tool | Source | Purpose | When to Use |
|------|--------|---------|-------------|
| Phase-34 admin template | `docs/admin-setup-android/admin-template-android.md` | 11-H2 skeleton | When authoring per-OEM admin docs (09-13) — D-01 enforced |
| Phase 44 Knox runbook patterns | `docs/l1-runbooks/28-android-knox-enrollment-failed.md` (234 lines) + `docs/l2-runbooks/22-android-knox-investigation.md` (305 lines) | Sibling-pattern source for L1 29 + L2 23 | When authoring runbooks 29 + 23 — D-17/D-18 sibling-departure documented per D-22 |
| Sibling reference matrix | `docs/reference/android-capability-matrix.md` (5 H2 sub-tables) | Multi-sub-table-under-capability-H2 shape | When authoring `aosp-oem-matrix.md` — D-11 |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Multi-table matrix (D-11 winner 3B) | Single wide table (option 3A) | Wide table ergonomics fail at 5×5 dimensions; sibling-pattern precedent is multi-table |
| Single L1 runbook 29 with OEM Causes (D-17 winner 4A) | Per-OEM L1 runbooks 29-33 (option 4B) | 5-runbook split breaks Phase 40 D-05 LOCK (single click target); 4A produces clean ANDR29 entry per ROADMAP SC#4 |
| Hybrid 11-H2 (D-01 winner 1B-expanded) | 8-H2 minimal (option 1A) | 8-H2 omits sibling-parity sections (`## Renewal / Maintenance`, `## What Breaks Summary`); 11-H2 restores parity with 02/03/05/07 siblings |

**Installation:** No new tooling. Phase 45 ships content-only against existing harness.

**Version verification:** No package versions to verify (documentation-only).

## Architecture Patterns

### System Architecture Diagram

```
┌─ Wave 1 (parallel; 5 plans) ───────────────────────────────────────────────┐
│  09-aosp-realwear.md     ┐                                                 │
│  10-aosp-zebra.md        │                                                 │
│  11-aosp-pico.md         ├──► 5 admin docs land with #common-failures      │
│  12-aosp-htc-vive-focus.md  │     anchors stable for Wave 3 cross-links    │
│  13-aosp-meta-quest.md   ┘                                                 │
└────────────────────────────────────────────────────────────────────────────┘
        │                                              │
        ▼                                              ▼
┌─ Wave 2 (parallel; 2 plans) ─────────────────────────────┐
│  aosp-oem-matrix.md      ─── reads OEM data from         │
│  06-aosp-stub.md collapse     Wave 1 admin docs          │
└──────────────────────────────────────────────────────────┘
        │
        ▼
┌─ Wave 3 (parallel; 2 plans) ─────────────────────────────────────────────┐
│  29-android-aosp-enrollment-failed.md  ─── cross-links Wave 1 #common    │
│  23-android-aosp-investigation.md          failures + #provisioning-steps │
└──────────────────────────────────────────────────────────────────────────┘
        │
        ▼
┌─ Wave 4 (atomic same-commit; 1 plan) ────────────────────────────────────┐
│  08-android-triage.md (ANDE1 → ANDR29 single click)                       │
│  android-capability-matrix.md:121-127 anchor fill                         │
│  02-provisioning-methods.md (90-day token + per-OEM firmware rows)        │
│  l1-runbooks/00-index.md (Android section append)                         │
│  _glossary-android.md (additive AOSP terms)                               │
│  PHASE-45-AOSP-SOURCE.md DELETED (per Phase 43 D-20 lifecycle)            │
└───────────────────────────────────────────────────────────────────────────┘
```

### Component Responsibilities

| File | Owner | Source Verified |
|------|-------|----------------|
| `docs/admin-setup-android/09-aosp-realwear.md` (NEW) | Wave 1 Plan 01 | MS Learn AOSP supported devices 2026-04-16; RealWear support.realwear.com knowledge base |
| `docs/admin-setup-android/10-aosp-zebra.md` (NEW) | Wave 1 Plan 02 | MS Learn `oemconfig-zebra-android-devices` 2026-04-14; Zebra TechDocs |
| `docs/admin-setup-android/11-aosp-pico.md` (NEW) | Wave 1 Plan 03 | MS Learn 2026-04-16; PICO Business sub-brand site |
| `docs/admin-setup-android/12-aosp-htc-vive-focus.md` (NEW) | Wave 1 Plan 04 | MS Learn 2026-04-16; vive.com/business support docs |
| `docs/admin-setup-android/13-aosp-meta-quest.md` (NEW) | Wave 1 Plan 05 | MS Learn 2026-04-16; forwork.meta.com/blog (wind-down) |
| `docs/reference/aosp-oem-matrix.md` (NEW) | Wave 2 Plan 06 | aggregates Wave 1 admin doc data |
| `docs/admin-setup-android/06-aosp-stub.md` (collapse) | Wave 2 Plan 07 | preserves Phase 39 9-H2 whitelist + 8-OEM + PITFALL-7 |
| `docs/l1-runbooks/29-android-aosp-enrollment-failed.md` (NEW) | Wave 3 Plan 08 | sibling Knox runbook 28 |
| `docs/l2-runbooks/23-android-aosp-investigation.md` (NEW) | Wave 3 Plan 09 | sibling Knox runbook 22 |
| `docs/decision-trees/08-android-triage.md` (edit) | Wave 4 Plan 10 (atomic) | single ANDE1→ANDR29 swap |
| `docs/reference/android-capability-matrix.md:121-127` (anchor fill) | Wave 4 Plan 10 | sibling Knox-row 113-119 fill pattern |
| `docs/android-lifecycle/02-provisioning-methods.md` (additive) | Wave 4 Plan 10 | additive AOSP rows |
| `docs/l1-runbooks/00-index.md` (append-only) | Wave 4 Plan 10 | sibling AEKNOX precedent |
| `docs/_glossary-android.md` (additive) | Wave 4 Plan 10 | sibling AEKNOX precedent |
| `.planning/phases/45-per-oem-aosp-expansion/PHASE-45-AOSP-SOURCE.md` (DELETED) | Wave 4 Plan 10 final commit | Phase 43 D-20 lifecycle |

### Pattern 1: 11-H2 Admin Doc Skeleton (D-01 LOCKED)

**What:** Hybrid 8-H2 minimal core expanded to 11-H2 sibling-parity baseline.
**When to use:** Every Wave 1 plan (5 per-OEM admin docs).
**Example skeleton (verbatim H2 order):**
```markdown
# Configure {OEM} AOSP Devices in Intune

## Scope and Status                    {# H2 #1: PITFALL-7 framing inline at top}
## Hardware Scope                       {# H2 #2: models + firmware mins}
## Prerequisites and Licensing          {# H2 #3}
## Enrollment Method                    {# H2 #4}
## Provisioning Steps                   {# H2 #5: step-numbered H3 children}
### Step 0 — {prerequisite step}       {# wait gates / B2B onboarding / etc.}
### Step 1 — Create AOSP enrollment profile in Intune
### Step 2 — {OEM-specific token / Wi-Fi config}
### Step 3 — {device-side QR scan / OEMConfig push / etc.}
{add-on H2: per-OEM REQUIRED add-on per D-02; OPTIONAL for Pico}
## Verification                         {# H2 #6}
## Common Failures                      {# H2 #7: anchor target for runbook 29 cross-links}
## Renewal / Maintenance                {# H2 #8: 60-day cycle; Meta = +30-day re-verify}
## What Breaks Summary                  {# H2 #9: severity-descending table}
## See Also                             {# H2 #10: cross-links to siblings}
## Changelog                            {# H2 #11: version-history rows}
```
*Source:* `docs/admin-setup-android/07-knox-mobile-enrollment.md` lines 27-156 (Step 0-6 step-numbered H2s); `docs/admin-setup-android/03-fully-managed-cobo.md:218` (Renewal/Maintenance); `docs/admin-setup-android/03-fully-managed-cobo.md:197` (What Breaks Summary).

### Pattern 2: OEM-Scoped L1 Cause Structure (D-17 LOCKED)

**What:** Single L1 runbook 29 with 5 OEM-scoped Causes A-E mirroring Knox runbook 28's KME-scoped 4-cause + Cause E pattern.
**Source excerpt** from `docs/l1-runbooks/28-android-knox-enrollment-failed.md` lines 33-39 (sibling Cause routing):
```markdown
- [Cause A: Samsung Knox B2B Account Approval Pending](#cause-a-b2b-account-pending)
- [Cause B: Device Not in Knox Admin Portal](#cause-b-device-not-in-kap)
- [Cause C: KME Profile Not Assigned to Device Set](#cause-c-profile-unassigned)
- [Cause D: KME/ZT Mutual-Exclusion Conflict (Samsung)](#cause-d-kme-zt-mutex-collision)

If none of Causes A-D match and enrollment still fails, see [Escalation Criteria](#escalation-criteria) below for Cause E
```
**For Phase 45 runbook 29:** Cause A = RealWear; Cause B = Zebra; Cause C = Pico; Cause D = HTC; Cause E = Meta Quest. Plus aggregate `## Escalation Criteria` H2 mirroring `28:190-225`.

### Pattern 3: Per-Pattern Microsoft Support Escalation Packet (D-18 LOCKED)

**What:** Three-bullet escalation packet per Pattern (token sync status / profile assignment state / enrollment profile GUID).
**Source excerpt** from `docs/l2-runbooks/22-android-knox-investigation.md` lines 135-139:
```markdown
**Microsoft Support escalation packet (D-09):**

- **Token sync status:** Intune-side enrollment-profile staging-token Active state + last token-rotation timestamp (Intune admin center screenshot).
- **Profile assignment state:** Knox Admin Portal Profile-to-Devices assignment view (admin-provided screenshot of KAP Devices view with Profile column populated).
- **Enrollment profile GUID:** Intune admin center URL fragment for the enrollment profile (Graph API READ-ONLY GET if URL not directly visible).
```

### Pattern 4: Triage Tree Single-Click-Target Replacement (D-19 LOCKED)

**What:** Mermaid edge `AND1 -->|"Specialty hardware (AOSP)"| ANDE1(escalate stub)` is replaced with `AND1 -->|"Specialty hardware (AOSP)"| ANDR29(["See: AOSP Enrollment Failed (Runbook 29)"])` and a `click ANDR29 "../l1-runbooks/29-android-aosp-enrollment-failed.md"` line is added.
**Source excerpt** from `docs/decision-trees/08-android-triage.md` lines 37, 70-73:
```mermaid
AND1 -->|"Specialty hardware<br/>(AOSP)"| ANDE1(["Escalate L2 — AOSP L1 troubleshooting out of scope in v1.4"])
{...edits...}
classDef resolved fill:#28a745,color:#fff
class ANDR22,ANDR23,ANDR24,ANDR25,ANDR26,ANDR27 resolved   {# add ANDR29}
class ANDE1,ANDE2,ANDE3 escalateL2                          {# remove ANDE1}
```
Plus the Routing Verification table at line 100 — `| AOSP all paths | Specialty hardware (AOSP) | (any) | Escalate ANDE1 (L2 out-of-scope v1.4) |` becomes `| AOSP all paths | Specialty hardware (AOSP) | (any) | Runbook 29 |`.
The Escalation Data table line 121 (`AOSP — out of scope v1.4 (ANDE1)`) is removed; OEM-identification step now lives inside runbook 29 per D-20.

### Pattern 5: Cross-Link Anchor Convention (D-21 LOCKED)

**What:** L1 runbook 29 Cause cross-links to per-OEM admin guide `## Common Failures` H2 anchor.
**Convention:** `[admin doc](../admin-setup-android/{09|10|11|12|13}-...md#common-failures)` or `[admin doc anchor](../admin-setup-android/{...}.md#wi-fi-qr-embedding)`.
**Sibling precedent:** `docs/l1-runbooks/28-android-knox-enrollment-failed.md:64` cross-links to `../admin-setup-android/07-knox-mobile-enrollment.md#step-0-b2b-approval` and `:138` cross-links to `../admin-setup-android/07-knox-mobile-enrollment.md#step-4-assign-profile`. Wave 1 plans MUST emit stable `<a id="common-failures"></a>` and `<a id="wi-fi-qr-embedding"></a>` etc. anchors per D-05.

### Anti-Patterns to Avoid

- **Inline-prose Notes column in matrix tables** — Phase 39 D-08 carry-forward; D-12 explicit ban. Footnotes only for exceptions.
- **PITFALL-7 framing erosion** — every per-OEM "supported under AOSP" assertion MUST pair with the AOSP baseline caveat (D-04 + D-23). Common erosion: "RealWear is GA on Intune AOSP" without saying "use Android Enterprise fully managed instead if GMS is present."
- **MGP cross-link from any AOSP doc** — AOSP has no GMS, no MGP. The HTML-comment subtractive-deletion pattern (D-29 inheritance from Phase 34 D-17) handles tri-portal H4 omissions; do not author cross-links into MGP guidance from AOSP docs.
- **SafetyNet token references in L2 runbook 23** — D-18 explicit ban; Play Integrity 3-tier verdicts only. Sibling `22-android-knox-investigation.md:256-264` is the verbatim Play Integrity reference template.
- **Multi-OEM cross-links per Cause in runbook 29** — F-4B-MED-03 disqualified symptom-routing; D-17 4A-winner OEM-scoping prevents this. One Cause = one OEM admin doc cross-link.
- **Cross-platform analog assertions** ("AOSP equivalent of iOS Supervised Mode" etc.) — out of scope; locked Out of Scope per CONTEXT line 40-41.
- **Wi-Fi EAP claims for RealWear** — RealWear staging Wi-Fi REQUIRES WPA/WPA2-PSK or WPA3 only. EAP-PEAP and EAP-TLS are NOT supported for the staging network. (Corporate EAP networks must be configured via post-enrollment device-restrictions Wi-Fi profile.)
- **Pasting MGP-style or ZT-style provisioning JSON into AOSP** — not relevant; AOSP enrollment is QR-only with token, not JSON. No anti-paste callout needed for AOSP per se. (KME/ZT anti-paste pattern at `28:127-131` and `02-zero-touch-portal.md:93-97` is BYOD/COBO-tier, not AOSP-tier.)
- **Confusing userless 90-day token with user-associated 65-year token** — MS Learn explicitly differentiates. Surface BOTH in `02-provisioning-methods.md` per AEAOSPFULL-09 SC#5; do not collapse to single "AOSP 90-day token ceiling" prose.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Authoritative AOSP supported-devices list | A static OEM matrix maintained by hand-edit | Cross-link to MS Learn `aosp-supported-devices` page; mirror current snapshot in `aosp-oem-matrix.md` `## Hardware Scope` with `last_verified` date | MS Learn is authoritative; OEM list evolves; mirroring with date-stamp keeps doc honest |
| Meta Horizon wind-down date verification | Speculative inference from community sources | Cross-link to `forwork.meta.com/blog/an-update-on-meta-for-work` (Meta's official channel) — verified 2026-04-25 | Meta is the only authoritative source for its own product wind-down; community sources confirm but don't supersede |
| Per-OEM Wi-Fi auth-type compatibility | Generalized "EAP supported" prose | Per-OEM specific: RealWear = WPA/WPA2-PSK/WPA3 only (NOT EAP); others verify against Intune AOSP profile UI auth-type dropdown | EAP-PEAP / EAP-TLS support varies per device; getting it wrong silently breaks Wi-Fi |
| Token expiry ceilings | Single "90-day AOSP" generalization | Two distinct values: userless = 90d max; user-associated = up to 65y | MS Learn explicitly documents asymmetry |
| Zebra OEMConfig profile authoring | Custom XML schema | Use Zebra's StageNow desktop tool (Export to MDM workflow) OR direct OEMConfig profile in Intune | StageNow handles MX schema versioning; hand-authored XML drifts as MX evolves (currently MX 13.5 / 14.2) |
| Pico license tier disambiguation | Pricing speculation | Authoritative cross-link to `business.picoxr.com` for current Enterprise SKU + PICO Business Suite licensing | Mid-2025 license-term changes per STATE.md; pricing ranges vary $50-$150/year/device per community sources [MEDIUM] |
| HTC-specific in-device QR scan UI path | Generic "scan QR code" prose | Verbatim path: `Settings > Advanced > MDM setup > QR code` (per vive.com/business support docs) | Per-device UI path differs from RealWear "skip first time setup; scan QR" pattern; specificity reduces L1 confusion |
| AOSP enrollment-failure inventory | Speculative failure modes | Per-OEM inventory derived from authoritative + community sources; flag MEDIUM where community-only | Failure modes evolve; static inventory ages |

**Key insight:** The biggest risk in per-OEM documentation is over-generalization across OEMs. Each OEM has a distinct enrollment idiom (RealWear staging-Wi-Fi-PSK; Zebra OEMConfig-via-APK; Pico Business Suite-coexists-but-not-required; HTC in-device Settings>Advanced>MDM-setup; Meta 4-portal-with-Meta-for-Work). Wave 1 plans must enforce per-OEM specificity, not a copy-paste template fill.

## Per-OEM Technical Reference (§1)

The authoritative source for the per-OEM data points below is **MS Learn AOSP Supported Devices page** (`learn.microsoft.com/en-us/intune/intune-service/fundamentals/android-os-project-supported-devices`), `updated_at: 2026-04-16T16:28:00Z` (verified by direct fetch on 2026-04-25).

### RealWear (AEAOSPFULL-01)

| Property | Value | Source |
|----------|-------|--------|
| Models | HMT-1, HMT-1Z1, Navigator 500 | `[HIGH: MS Learn AOSP supported devices, last_verified 2026-04-25]` |
| Minimum firmware | HMT-1 11.2; HMT-1Z1 11.2; Navigator 500 1.1 | `[HIGH: MS Learn AOSP supported devices, last_verified 2026-04-25]` |
| Intune AOSP mode | BOTH user-associated AND userless supported | `[HIGH: support.realwear.com/knowledge/faq-intune-aosp, last_verified 2026-04-25]` (RealWear FAQ explicitly lists both modes) |
| Enrollment method | QR-only, one device at a time, Wi-Fi credentials embedded in QR | `[HIGH: MS Learn setup-aosp-corporate-userless, last_verified 2026-04-25]` |
| Wi-Fi embedding | **REQUIRED** (device cannot join Wi-Fi interactively at enrollment — no text-input UI) | `[HIGH: AEAOSPFULL-01 verbatim + RealWear authoritative]` |
| Wi-Fi auth types supported (staging) | WPA-PSK, WPA2-PSK, WPA3 ONLY — NOT EAP-PEAP, NOT EAP-TLS | `[HIGH: support.realwear.com/knowledge/enrolling-in-microsoft-intune, last_verified 2026-04-25]` ("staging network MUST BE a WPA/WPA2 PSK/WPA3 network type, meaning there is an SSID and Password only") |
| Vendor portal | RealWear Cloud (OPTIONAL — coexists with Intune; Microsoft Teams for HMT distributed exclusively through RealWear Cloud) | `[HIGH: support.realwear.com/knowledge/faq-intune-aosp, last_verified 2026-04-25]` |
| License tier | Intune Plan 2 OR Intune Suite (specialty device requirement) | `[HIGH: MS Learn specialty-devices-with-intune, last_verified 2026-04-25]` ("for example RealWear and HTC devices, organizations need to purchase either the Microsoft Intune Suite or Intune Plan 2") |
| Per-device target | AR/VR Headset (frontline / hands-free / field service) | `[HIGH: MS Learn]` |

### Zebra (AEAOSPFULL-02)

| Property | Value | Source |
|----------|-------|--------|
| Models | WS50 wearable scanner | `[HIGH: MS Learn, last_verified 2026-04-25]` |
| Minimum firmware | 11-49-15.00 | `[HIGH: MS Learn, last_verified 2026-04-25]` |
| Intune AOSP mode | Userless typically (shared-shift wearable scanner); user-associated when single-user assignment | `[MEDIUM: inferred from Zebra wearable-scanner use case + MS Learn AOSP modes, last_verified 2026-04-25]` (MS Learn does not explicitly enumerate AOSP-mode-by-OEM) |
| Enrollment method | QR-only AOSP enrollment + OEMConfig profile push (NOT MGP — AOSP has no GMS) | `[HIGH: AEAOSPFULL-02 verbatim + MS Learn oemconfig-zebra-android-devices 2026-04-14]` |
| Wi-Fi embedding | OPTIONAL (wearable scanner has buttons / interactive Wi-Fi UI per Intune profile note "Wi-Fi details are required if the device doesn't have a button or option that lets it automatically connect") | `[MEDIUM: MS Learn user-associated profile note, last_verified 2026-04-25]` |
| Vendor portal | None required (StageNow desktop tool OPTIONAL for OEMConfig profile generation) | `[HIGH: MS Learn oemconfig-zebra-android-devices, last_verified 2026-04-25]` |
| OEMConfig delivery | TWO apps: "Zebra OEMConfig Powered by MX" (Android 13+ AND Android 11; new app; single-profile recommended) OR "Legacy Zebra OEMConfig" (Android 11 and earlier; multi-profile supported); deployed as APK via Intune | `[HIGH: MS Learn oemconfig-zebra-android-devices, last_verified 2026-04-25]` |
| Android 12 | **NOT supported** ("Zebra devices don't support Android 12" per MS Learn explicit statement) | `[HIGH: MS Learn oemconfig-zebra-android-devices, last_verified 2026-04-25]` |
| License tier | Intune Plan 1 baseline (general AOSP wearable scanner is not exclusively in "specialty AR/VR headset" Plan 2 / Suite scope; verify per-tenant) | `[MEDIUM: MS Learn specialty-devices-with-intune scope ambiguity, last_verified 2026-04-25]` (Note: WS50 is a wearable scanner; specialty-devices article lists "AR/VR headsets, large smart-screen devices, and select conference room meeting devices" — wearable scanners not explicitly named) |
| Per-device target | Wearable Scanner (warehouse / retail / logistics frontline) | `[HIGH: MS Learn]` |
| StageNow workflow | XML-based profile authoring tool; Export to MDM step generates XML for Intune OEMConfig profile | `[HIGH: techdocs.zebra.com/oemconfig, last_verified 2026-04-25]` |
| MX schema version | OEMConfig supports MX 13.5 (current) and 14.2 (latest); ongoing schema development | `[HIGH: techdocs.zebra.com/oemconfig, last_verified 2026-04-25]` |

### Pico (AEAOSPFULL-03)

| Property | Value | Source |
|----------|-------|--------|
| Models | PICO 4 Enterprise; PICO Neo3 Pro/Eye | `[HIGH: MS Learn, last_verified 2026-04-25]` |
| Minimum firmware | PICO 4 Enterprise PUI 5.6.0; Neo3 Pro/Eye PUI 4.8.19 | `[HIGH: MS Learn, last_verified 2026-04-25]` |
| Intune AOSP mode | BOTH user-associated AND userless supported (typical AR/VR pattern) | `[MEDIUM: AR/VR pattern inference + MS Learn dual-mode AOSP, last_verified 2026-04-25]` |
| Enrollment method | QR-only AOSP enrollment | `[HIGH: AEAOSPFULL-03 + MS Learn]` |
| Wi-Fi embedding | OPTIONAL (Pico devices have interactive Wi-Fi setup UI; embedding helps zero-touch but not strict requirement) | `[MEDIUM: PICO Business + general AR/VR pattern, last_verified 2026-04-25]` |
| Vendor portal | PICO Business Suite (OPTIONAL coexistence per AEAOSPFULL-03 verbatim "optional") | `[HIGH: AEAOSPFULL-03 + business.picoxr.com, last_verified 2026-04-25]` |
| Enterprise SKU disambiguation | PICO 4 Enterprise (NOT consumer Pico 4); PICO Neo3 Pro/Eye (NOT consumer Neo3); Pico 4 Ultra Enterprise also enterprise-tier | `[HIGH: business.picoxr.com + MACE Virtual Labs comparison, last_verified 2026-04-25]` |
| License tier (Intune) | Intune Plan 2 OR Intune Suite (AR/VR specialty device) | `[HIGH: MS Learn specialty-devices-with-intune, last_verified 2026-04-25]` |
| License tier (Pico) | PICO Business Suite licensing changed mid-2025 per STATE.md; SDK access $50-$150/year/device per community sources | `[MEDIUM: aliexpress.com / community, last_verified 2026-04-25]` (vendor primary source for current pricing: business.picoxr.com) |
| Per-device target | AR/VR Headset (training / simulation / enterprise XR) | `[HIGH: MS Learn]` |

### HTC VIVE Focus (AEAOSPFULL-04)

| Property | Value | Source |
|----------|-------|--------|
| Models | HTC Vive Focus 3; HTC Vive XR Elite; Vive Focus Vision | `[HIGH: MS Learn, last_verified 2026-04-25]` |
| Minimum firmware | Focus 3: 5.2 - 5.0.999.624; XR Elite: 4.0 - 1.0.999.350; Focus Vision: 7.0.999.159 | `[HIGH: MS Learn, last_verified 2026-04-25]` |
| Intune AOSP mode | BOTH user-associated AND userless supported | `[MEDIUM: AR/VR pattern + vive.com support docs imply both, last_verified 2026-04-25]` |
| Enrollment method | Direct QR Intune flow — simplest of AR/VR OEMs (per AEAOSPFULL-04 verbatim) | `[HIGH: AEAOSPFULL-04 + vive.com support]` |
| Wi-Fi embedding | OPTIONAL (HTC devices have interactive Wi-Fi UI in Settings; embedding optional for zero-touch) | `[HIGH: vive.com support, last_verified 2026-04-25]` |
| In-device QR scan UI path | Settings > Advanced > MDM setup > QR code (Vive Focus Vision specifically; Focus 3 / XR Elite similar) | `[HIGH: vive.com/us/support, last_verified 2026-04-25]` |
| Vendor portal | None required (no equivalent to RealWear Cloud / Pico Business Suite / Meta for Work for Intune-direct enrollment); HTC's Vive Business Management System is alternative MDM, not Intune-coexistence | `[HIGH: vive.com support + ManageXR alternative, last_verified 2026-04-25]` |
| License tier | Intune Plan 2 OR Intune Suite (AR/VR specialty device, explicitly named in MS Learn specialty-devices-with-intune) | `[HIGH: MS Learn specialty-devices-with-intune, last_verified 2026-04-25]` |
| Enterprise vs Consumer SKU | Vive Focus 3 / XR Elite / Focus Vision are all enterprise-positioned; consumer Vive variants exist but are out of scope per CONTEXT | `[HIGH: vive.com/business, last_verified 2026-04-25]` |
| Per-device target | AR/VR Headset (enterprise training / simulation / XR collaboration) | `[HIGH: MS Learn]` |

### Meta Quest (AEAOSPFULL-05)

| Property | Value | Source |
|----------|-------|--------|
| Models | Quest 2; Quest 3; Quest 3s; Quest Pro | `[HIGH: MS Learn, last_verified 2026-04-25]` |
| Minimum firmware | Quest 2 v49; Quest 3 v59; Quest 3s v71; Quest Pro v49 | `[HIGH: MS Learn, last_verified 2026-04-25]` |
| Region restrictions | Quest 2, Quest 3, Quest Pro: "Available in select regions only" (per MS Learn link to `work.meta.com/help/307276701907179`); Quest 3s has NO region restriction | `[HIGH: MS Learn AOSP supported devices, last_verified 2026-04-25]` |
| Intune AOSP mode | BOTH user-associated AND userless supported | `[MEDIUM: AR/VR pattern, last_verified 2026-04-25]` |
| Enrollment method | QR-only AOSP enrollment + Meta for Work portal pattern (4-portal: Intune + MGP-N/A + ZT-N/A + Meta for Work) | `[HIGH: AEAOSPFULL-05 + Meta for Work blog]` |
| Wi-Fi embedding | OPTIONAL | `[MEDIUM, last_verified 2026-04-25]` |
| Vendor portal | Meta for Work / Meta Horizon Managed Services (REQUIRED for HMS-managed deployments; OPTIONAL post-2026-02-20 wind-down — see GA2 D-06 resolution below) | `[HIGH: forwork.meta.com/blog/an-update-on-meta-for-work, last_verified 2026-04-25]` |
| License tier (Intune) | Intune Plan 2 OR Intune Suite (AR/VR specialty device per MS Learn specialty-devices) | `[HIGH: MS Learn specialty-devices-with-intune, last_verified 2026-04-25]` |
| License tier (Meta) | Meta Horizon Managed Services subscription was REQUIRED pre-2026-02-20; FREE post-2026-02-20 (see §2 below) | `[HIGH: forwork.meta.com/blog, last_verified 2026-04-25]` |
| Hardware availability | Commercial Quest SKUs (work-tier) discontinued for sale starting 2026-02-20; consumer Quest 3 / 3s remain purchasable AND can be enrolled via HMS+ManageXR | `[HIGH: forwork.meta.com/blog, last_verified 2026-04-25]` |
| HMS infrastructure timeline | HMS infrastructure entering free-tier maintenance mode through 2030-01-04 (bug fixes + support; no new platform capabilities) | `[HIGH: managexr.com Help Center + forwork.meta.com/blog, last_verified 2026-04-25]` |
| Per-device target | AR/VR Headset (consumer-derived enterprise XR; training, collaboration, frontline) | `[HIGH: MS Learn]` |

## §2 Meta Horizon Managed Services Wind-Down Re-Verification (D-06 Plan-Time Gate RESOLVED)

**Verdict:** **HIGH-CONFIDENCE VERIFIED — HYBRID resolution per D-07 branch logic**

The Feb 20, 2026 wind-down date IS verified, but the wind-down framing must be precise. This is **NOT** a discontinuation of HMS; it is a **commercial-SKU + paid-tier discontinuation transitioning HMS into a free-tier maintenance mode with continued infrastructure support through 2030-01-04**.

### Verification Sources

1. **PRIMARY (Meta authoritative):** `https://www.meta.com/blog/an-update-on-meta-for-work` (formerly `forwork.meta.com/blog/an-update-on-meta-for-work/`; 301-redirected to meta.com)
   - Verbatim quotes from fetch 2026-04-25:
     - "Horizon managed services and commercial SKUs of Meta Quest will no longer be available for sale" starting February 20, 2026.
     - "HMS licenses will be available for free" beginning February 20, 2026 via meta.com/meta-for-work/.
     - Existing customers retain access "through January 4, 2030, with ongoing support during this period."
   - Source classification: **HIGH** — Meta is the only authoritative source for its own product wind-down.

2. **SECONDARY (corroborating, ManageXR official integration partner):** `https://help.managexr.com/en/articles/13394353-update-meta-horizon-managed-services-will-be-free-starting-feb-20-2026`
   - Verbatim quotes:
     - "On January 15th, Meta announced that HMS would be free starting February 20, 2026."
     - "Existing HMS monthly subscriptions will stop being billed after that date."
     - "Maintenance mode through January 4, 2030"; "bug fixes + support, but no new platform capabilities".
     - "Organizations can continue using HMS and ManageXR together with no disruption."
     - "Future Deployments: As of February 20, 2026, organizations can, according to Meta, continue to use HMS in combination with a consumer version of Meta Quest (e.g. Quest 3 / Quest 3S)."
   - Source classification: **HIGH** — official Meta integration partner re-confirming Meta's announcement; satisfies D-06 corroborating-source requirement.

3. **CORROBORATING (community sources confirming same date / framing):** unboundxr.com, komete-xr.com, redboxvr.com, raum.app — all cite Feb 20, 2026 as the commercial-SKU end date and HMS-free-tier transition. Same-source MEDIUM community alone is INSUFFICIENT per D-06; these are corroborating only.

### Branch Resolution per D-07

The verbatim D-07 branches are:
1. **Verified DISCONTINUED (HIGH-confidence)** → ship Intune-direct + historical appendix
2. **Verified ALIVE (HIGH-confidence)** → ship full 4-portal pattern + Feb 20 callout + Intune-direct fallback
3. **Unresolvable** → MEDIUM marker + dual-path safe-default

**Actual finding falls under Branch 2 (Verified ALIVE — HIGH-confidence) with a refinement: "ALIVE in transformed form."** HMS infrastructure remains operational through 2030-01-04. Net-new admin doc must:

- Document the **4-portal pattern (Intune + Meta for Work) as PRESERVED** per D-08 LOCKED deliverables.
- Carry the **explicit Feb 20, 2026 callout** in `## Scope and Status` as a `> ⚠️` blockquote per ROADMAP SC#3 verbatim "explicit Feb 20, 2026 wind-down re-verification callout with Intune-direct fallback guidance."
- Frame the wind-down accurately: **"As of Feb 20, 2026, Meta no longer sells commercial Quest SKUs. HMS becomes free for managing consumer Quest 3 / Quest 3s through ManageXR or direct deployment. HMS infrastructure enters maintenance mode through Jan 4, 2030. Net-new fleets MAY use Intune-direct AOSP enrollment instead of HMS for vendor-independent management."**
- Document **Intune-direct fallback** as a parallel-path option (not the only path); existing HMS subscribers continue uninterrupted; net-new fleets choose between (a) HMS-free + consumer Quest 3/3s, (b) Intune-direct AOSP enrollment.
- Preserve the **`## Meta Horizon Subscription Status` H2** per D-02 (REQUIRED regardless of alive-status) — content now reflects the post-2026-02-20 free-tier reality.

### Source-Confidence Marker for Shipping Doc

`[HIGH: meta.com/blog/an-update-on-meta-for-work + managexr.com Help Center, last_verified 2026-04-25]` for the wind-down assertion. NO MEDIUM-marker fallback needed — this is HIGH-confidence resolved.

### D-10 30-Day Re-Verify Trigger

The `## Renewal / Maintenance` H2 of `13-aosp-meta-quest.md` documents a **30-day re-verify trigger** for the Meta Horizon assertion specifically. Standard 60-day cycle applies elsewhere. Next forward re-verify: 2026-05-25.

## §3 MS Learn AOSP Supported-Devices Page Snapshot (Current as of 2026-04-25)

**Source:** `https://learn.microsoft.com/en-us/intune/intune-service/fundamentals/android-os-project-supported-devices`
**Page metadata:** `ms.date: 2025-05-12`; `updated_at: 2026-04-16T16:28:00Z`; `word_count: 218`
**Source classification:** `[HIGH: MS Learn AOSP supported devices, last_verified 2026-04-25]`

### Current OEM List (Verbatim from MS Learn)

| OEM | Device | Minimum Firmware | Type | Restrictions |
|-----|--------|------------------|------|--------------|
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

### Deltas vs 2026-04-23 Stub Baseline

The stub `06-aosp-stub.md` snapshot (`[HIGH: MS Learn AOSP supported devices, last_verified 2026-04-23]`) lists:
- DigiLens (ARGO) ✓ matches
- HTC (Vive Focus 3, Vive XR Elite, Vive Focus Vision) ✓ matches
- Lenovo (ThinkReality VRX) ✓ matches
- Meta (Quest 2/3/3s/Pro — select regions only for 2/3/Pro) ✓ matches (regional asymmetry confirmed)
- PICO (4 Enterprise, Neo3 Pro/Eye) ✓ matches
- RealWear (HMT-1, HMT-1Z1, Navigator 500) ✓ matches
- Vuzix (Blade 2, M400, M4000) ✓ matches
- Zebra (WS50) ✓ matches

**Conclusion:** **Zero deltas.** MS Learn AOSP supported-devices list is unchanged between 2026-04-23 stub baseline and 2026-04-25 plan-time re-verification. Phase 45 plan can proceed against the verified list above without OEM-list adjustments.

### Token Expiry Asymmetry (Critical Finding for AEAOSPFULL-09 SC#5)

MS Learn explicitly documents two different AOSP token ceilings:

| Mode | Token Expiry Ceiling | MS Learn Source |
|------|---------------------|-----------------|
| **Userless (Corporate-owned, userless devices)** | **Up to 90 days max** | `setup-aosp-corporate-userless` step 6 verbatim: "Token expiration date: Select the date the token expires, which can be up to 90 days in the future"; replace step 6 verbatim: "The token must be replaced at least every 90 days." `[HIGH: learn.microsoft.com setup-aosp-corporate-userless, ms.date 2025-05-15, updated_at 2026-04-16, last_verified 2026-04-25]` |
| **User-associated (Corporate-owned, user-associated devices)** | **Up to 65 years** | `setup-aosp-corporate-user-associated` step 6 verbatim: "Token expiration date: Select the date the token expires, which can be up to 65 years in the future." `[HIGH: learn.microsoft.com setup-aosp-corporate-user-associated, ms.date 2025-05-15, updated_at 2026-04-16, last_verified 2026-04-25]` |

**Implication for `02-provisioning-methods.md`:** When surfacing the AOSP token row per AEAOSPFULL-09 SC#5, document BOTH ceilings explicitly. Do NOT collapse to "AOSP 90-day token ceiling" — that's only userless. Sibling COBO doc (`03-fully-managed-cobo.md:117`) already correctly distinguishes: "Legacy '90-day' language does NOT apply to COBO. The 'up to 90-day max' enrollment-token expiry language from older documentation applies ONLY to AOSP (non-GMS) corporate user-associated tokens." (Note: COBO doc has a small error — 90-day is actually the userless ceiling, not user-associated. Phase 45 retrofit may want to flag this for Phase 47 atomic correction.)

## §4 Sibling-Pattern Code Excerpts

### D-01 11-H2 Skeleton (Wave 1 Plans 01-05)

**Source for step-numbered H3 children pattern:** `docs/admin-setup-android/07-knox-mobile-enrollment.md`
- `:27` `## Step 0 — Samsung Knox Portal B2B account approval (1-2 business days)`
- `:44` `## Step 1 — Sign in to Knox Admin Portal`
- `:58` `## Step 2 — Create KME EMM profile (target Microsoft Intune)`
- `:77` `## Step 3 — Add devices: reseller bulk upload OR Knox Deployment App`
- `:107` `## Step 4 — Assign KME profile to device set`
- `:121` `## Step 5 — DPC Custom JSON Data`
- `:147` `## Step 6 — Verify first-boot enrollment`

**Note:** Phase 44 used Step-X as `## H2`, but D-01 LOCKED says step-numbered H3 children INSIDE `## Provisioning Steps` H2. Wave 1 plans MUST follow D-01 (H3 children) NOT Phase 44 (H2 siblings). This is an explicit sibling-departure documented by D-01.

**Source for `## Renewal / Maintenance` H2:** `02-zero-touch-portal.md:214`, `03-fully-managed-cobo.md:218`, `05-dedicated-devices.md:249`, `07-knox-mobile-enrollment.md:193`. Sibling table format:
```markdown
| Component | Renewal Period | Consequence of Lapse | Renewal Steps |
|-----------|----------------|----------------------|---------------|
| {item} | {cadence} | {what breaks} | {how to renew} |
```

**Source for `## What Breaks Summary` H2:** `03-fully-managed-cobo.md:197`, `05-dedicated-devices.md:229`, `07-knox-mobile-enrollment.md:202`. Sibling table format:
```markdown
| Misconfiguration | Section | Severity |
|------------------|---------|----------|
| {issue} | [{anchor}](#{anchor}) | {CRITICAL|HIGH|MEDIUM} |
```

### D-17 L1 Cause/Pattern Structure (Wave 3 Plan 08)

**Source:** `docs/l1-runbooks/28-android-knox-enrollment-failed.md`
- `:33-39` Cause routing list (anchor cross-links)
- `:43-78` Cause A pattern (Entry condition / Symptom / L1 Triage Steps / Admin Action Required / Verify / Escalation within Cause)
- `:190-225` `## Escalation Criteria` aggregate H2 with Cause-by-Cause escalate-to-L2 conditions + Cause E (admin-only escalate-only path) + "Before escalating, collect" packet

**Verbatim per-Cause skeleton:**
```markdown
## Cause A: {OEM-scoped failure label} {#cause-a-anchor}

**Entry condition:** {what observation puts the user in this Cause}

### Symptom
- {bullet — what user reports}
- {bullet — what L1 sees in Intune}

### L1 Triage Steps
1. > **Say to the user:** "{scripted opener}"
2. {portal-only step}
3. {data-collection step}

### Admin Action Required
**Ask the admin to:**
- {admin-only step with cross-link to admin doc anchor}

**Verify:**
- {what success looks like}

**If {fallback condition}:** Route to [Cause X](#cause-x-anchor).

### Escalation (within Cause A)
- {when to escalate within this Cause's diagnosis path}
```

### D-18 L2 Pattern Structure + Microsoft Support Escalation Packet (Wave 3 Plan 09)

**Source:** `docs/l2-runbooks/22-android-knox-investigation.md`
- `:30-107` Investigation Data Collection (Steps 1-4: device registration / Knox portal state / sync state / device-side state)
- `:113-254` Patterns A-E with per-Pattern Resolution Steps + Microsoft Support escalation packet
- `:256-264` Play Integrity 3-tier reference H2 (zero SafetyNet — D-18 enforcement template)

**Verbatim per-Pattern skeleton:**
```markdown
### Pattern A: {OEM-scoped pattern} {#pattern-a-anchor}

**Typical class:** ⚙️ Config Error / ⏱️ Timing / 🔌 Hardware / etc.

**Symptom:** {what the device shows}

**Known Indicators:**
- {indicator}
- {indicator}

**Resolution Steps:**
1. {step with cross-link to admin doc anchor}
2. {step}

**Microsoft Support escalation packet (D-09):**

- **Token sync status:** {what to capture}
- **Profile assignment state:** {what to capture}
- **Enrollment profile GUID:** {Intune URL fragment OR Graph API READ-ONLY GET}
```

### D-19 Triage Tree Edit (Wave 4 Plan 10)

**Source:** `docs/decision-trees/08-android-triage.md` lines 37, 70-73, 100, 121

**Edit 1 (Mermaid line 37):**
```diff
- AND1 -->|"Specialty hardware<br/>(AOSP)"| ANDE1(["Escalate L2 — AOSP L1 troubleshooting out of scope in v1.4"])
+ AND1 -->|"Specialty hardware<br/>(AOSP)"| ANDR29(["See: AOSP Enrollment Failed (Runbook 29)"])
```

**Edit 2 (Mermaid click directives, after line 68):**
```diff
+ click ANDR29 "../l1-runbooks/29-android-aosp-enrollment-failed.md"
```

**Edit 3 (Mermaid classDef assignments at line 72-73):**
```diff
- class ANDR22,ANDR23,ANDR24,ANDR25,ANDR26,ANDR27 resolved
+ class ANDR22,ANDR23,ANDR24,ANDR25,ANDR26,ANDR27,ANDR29 resolved
- class ANDE1,ANDE2,ANDE3 escalateL2
+ class ANDE2,ANDE3 escalateL2
```

**Edit 4 (Routing Verification table line 100):**
```diff
- | AOSP all paths | Specialty hardware (AOSP) | (any) | Escalate ANDE1 (L2 out-of-scope v1.4) |
+ | AOSP all paths | Specialty hardware (AOSP) | (any) | Runbook 29 |
```

**Edit 5 (Escalation Data table line 121):** REMOVE the `AOSP — out of scope v1.4 (ANDE1)` row entirely (the OEM-identification step now lives inside runbook 29 per D-20).

**Edit 6 (For AOSP tickets blockquote line 76):** REMOVE or rewrite to point to runbook 29 instead of mentioning "out of scope in v1.4".

### D-21 Cross-Link Anchor Convention (Wave 3 Plans 08-09)

**Convention pattern from sibling Knox runbook 28:**
- Cross-link to admin doc Step anchor: `[admin doc Step 0](../admin-setup-android/07-knox-mobile-enrollment.md#step-0-b2b-approval)` (line 64)
- Cross-link to admin doc Step 4 (assign): `../admin-setup-android/07-knox-mobile-enrollment.md#step-4-assign-profile` (line 138)
- Cross-link to admin doc Step 5 (DPC JSON): `../admin-setup-android/07-knox-mobile-enrollment.md#dpc-custom-json` (line 207)
- Cross-link to admin doc KME/ZT mutex H2: `../admin-setup-android/07-knox-mobile-enrollment.md#kme-zt-mutual-exclusion` (line 174)

**For Phase 45 runbook 29:**
- Cross-link Cause A (RealWear) → `../admin-setup-android/09-aosp-realwear.md#wi-fi-qr-embedding` (per-OEM REQUIRED add-on H2 anchor)
- Cross-link Cause B (Zebra) → `../admin-setup-android/10-aosp-zebra.md#oemconfig-apk-push`
- Cross-link Cause C (Pico) → `../admin-setup-android/11-aosp-pico.md#pico-business-suite-coexistence` (where applicable)
- Cross-link Cause D (HTC) → `../admin-setup-android/12-aosp-htc-vive-focus.md#provisioning-steps` (no add-on H2)
- Cross-link Cause E (Meta) → `../admin-setup-android/13-aosp-meta-quest.md#meta-horizon-subscription-status` (subscription-related failures) AND `#meta-for-work-portal-setup`
- Generic cross-link to common-failures H2 in any per-OEM doc: `../admin-setup-android/{NN}-aosp-{oem}.md#common-failures`

**Wave dependency:** Wave 1 plans MUST publish stable `<a id="..."></a>` anchors for these targets BEFORE Wave 3 plans land. D-05 anchor scaffolding contract enforces this; planner's Wave 3 task specs must verify anchor existence in Wave 1 deliverables before Wave 3 plans commit cross-links.

## §5 Validation Architecture (Nyquist)

`workflow.nyquist_validation` is absent in `.planning/config.json` — defaulting to enabled per researcher contract.

Phase 45 is a documentation-only phase. Test infrastructure for documentation differs from code-bearing phases — Phase 45 ships against the **`scripts/validation/v1.4.1-milestone-audit.mjs` audit harness** (Phase 43 LOCKED). C1-C5 are blocking; C6/C7/C9 are informational-first per D-29.

### Test Framework

| Property | Value |
|----------|-------|
| Framework | `scripts/validation/v1.4.1-milestone-audit.mjs` (Node ESM, no shell invocations) |
| Config file | `scripts/validation/v1.4.1-audit-allowlist.json` (sidecar; supervision_exemptions + safetynet_exemptions) |
| Quick run command | `node scripts/validation/v1.4.1-milestone-audit.mjs` |
| Verbose run | `node scripts/validation/v1.4.1-milestone-audit.mjs --verbose` |
| Pre-commit hook | `scripts/hooks/pre-commit.sh` (Phase 43 Plan 08; bash + node native) |
| CI workflow | `.github/workflows/audit-harness-integrity.yml` (4-job: parse / path-match / harness-run / pin-helper-advisory) |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | Coverage |
|--------|----------|-----------|-------------------|----------|
| AEAOSPFULL-01..05 | Per-OEM admin doc 11-H2 + REQUIRED add-on H2 presence | structural | manual H2 enumeration in PR review (proposed C-N harness check is informational-first per D-29; Phase 47 owns) | reviewer-acceptance via plan-checker visible structure |
| AEAOSPFULL-01..05 | Per-OEM doc PITFALL-7 framing per-claim | content | C6 PITFALL-7 preservation regex check (informational-first per D-29) | `node scripts/validation/v1.4.1-milestone-audit.mjs` C6 |
| AEAOSPFULL-01..05 | Per-OEM doc 60-day freshness frontmatter | mechanical | C5 freshness check (review_by - last_verified ≤ 60 days; +30-day for Meta) | `node scripts/validation/v1.4.1-milestone-audit.mjs` C5 |
| AEAOSPFULL-01..05 | Zero SafetyNet references | mechanical | C1 SafetyNet check | C1 |
| AEAOSPFULL-01..05 | Zero "supervision" as Android management term (allow-list pinned for legitimate iOS-attributed bridge prose) | mechanical | C2 supervision check | C2 |
| AEAOSPFULL-06 | aosp-oem-matrix.md 4 sub-table H2 structure + `## Scope` + `## Source Attribution` + `## Version History` | structural | manual H2 enumeration in PR review | reviewer-acceptance |
| AEAOSPFULL-07 | L1 runbook 29 5 OEM-scoped Causes A-E + aggregate `## Escalation Criteria` | structural | manual H2/anchor enumeration | reviewer-acceptance |
| AEAOSPFULL-08 | L2 runbook 23 5 OEM-scoped Patterns A-E + per-Pattern Microsoft Support escalation packet (3-bullet) + Play Integrity 3-tier reference + zero SafetyNet | structural + mechanical | manual H2 enumeration + C1 SafetyNet | reviewer-acceptance + C1 |
| AEAOSPFULL-09 | Triage tree single ANDR29 click target (preserves Phase 40 D-05 LOCK + ROADMAP SC#4) | structural + mechanical | manual Mermaid diff inspection | reviewer-acceptance |
| AEAOSPFULL-09 | `06-aosp-stub.md` post-collapse: 9-H2 whitelist + 8-OEM enumeration + PITFALL-7 + Platform note PRESERVED | mechanical (C3 informational-first PASS) + manual | C3 + reviewer-acceptance | C3 + reviewer |
| AEAOSPFULL-09 | `android-capability-matrix.md:121-127` anchor fill points to `aosp-oem-matrix.md` | mechanical | grep for `#deferred-full-aosp-capability-mapping` anchor target | manual or sanity check |
| AEAOSPFULL-09 | `02-provisioning-methods.md` carries 90-day token ceiling + per-OEM firmware rows | structural | reviewer-acceptance | reviewer |
| AEAOSPFULL-09 | `l1-runbooks/00-index.md:77` "AOSP L1 planned for v1.4.1" note removed | mechanical | grep absence check | reviewer or sanity check |

### Sampling Rate

- **Per task commit:** `node scripts/validation/v1.4.1-milestone-audit.mjs` (must exit 0 — all C1-C5 PASS)
- **Per wave merge:** Same (audit re-runs after wave landing; harness is idempotent)
- **Phase gate:** Audit 8/8 PASS (5 blocking checks + 3 informational that always emit PASS per D-29) before `/gsd-verify-work`

### Wave 0 Gaps

- [x] None — `scripts/validation/v1.4.1-milestone-audit.mjs` exists (Phase 43 Plan 02 LOCKED)
- [x] None — `scripts/validation/v1.4.1-audit-allowlist.json` exists (Phase 43 Plan 03)
- [x] None — pre-commit hook exists (Phase 43 Plan 08)
- [x] None — CI workflow exists (Phase 43 Plan 08)

*All test infrastructure is in place. Phase 45 plans flow through the existing harness without harness modification. Phase 47 (AEINTEG-02) owns harness extensions for C6 PITFALL-7 promotion + new AOSP-specific checks.*

## §6 Per-OEM Authoritative Source List

Per-OEM primary sources for citation in shipped docs (`## See Also` H2 + inline source-confidence markers):

### RealWear

- **Vendor authoritative:** `https://support.realwear.com/knowledge/faq-intune-aosp` — Intune AOSP FAQ (HMT-1 / HMT-1Z1 / Navigator 500 enrollment overview, user-associated vs userless, RealWear Cloud co-existence)
- **Vendor authoritative:** `https://support.realwear.com/knowledge/enrolling-in-microsoft-intune` — Step-by-step enrollment guide (staging Wi-Fi network type WPA/WPA2-PSK/WPA3 ONLY constraint)
- **Vendor authoritative:** `https://support.realwear.com/knowledge/supported-enterprise-mobility-management-providers` — Supported EMM providers list
- **MS Learn primary:** `https://learn.microsoft.com/en-us/intune/intune-service/fundamentals/android-os-project-supported-devices` (firmware minimums)
- **MS Learn primary:** `https://learn.microsoft.com/en-us/intune/intune-service/enrollment/android-aosp-corporate-owned-userless-enroll` (RealWear-specific enrollment notes — "Since you're managing the device via Intune, you should skip the RealWear first time setup. The Intune QR code is the only thing you need to set up the device.")

### Zebra

- **Vendor authoritative:** `https://techdocs.zebra.com/oemconfig/` — OEMConfig overview + MX schema (current MX 13.5; latest MX 14.2)
- **Vendor authoritative:** `https://techdocs.zebra.com/stagenow/` — StageNow desktop tool documentation
- **MS Learn primary:** `https://learn.microsoft.com/en-us/intune/intune-service/configuration/oemconfig-zebra-android-devices` — Deploy OEMConfig profiles to Zebra devices using Microsoft Intune (TWO apps: Zebra OEMConfig Powered by MX vs Legacy Zebra OEMConfig; Android 12 NOT supported)
- **MS Learn primary:** `https://learn.microsoft.com/en-us/intune/intune-service/configuration/android-zebra-mx-overview` — Use Zebra Mobility Extensions on Android devices in Microsoft Intune
- **Community reference:** TechCommunity blog "New Zebra OEMConfig app for Android" (referenced in MS Learn)

### Pico

- **Vendor authoritative:** `https://business.picoxr.com/` — PICO Business sub-brand site (Enterprise SKU + PICO Business Suite licensing)
- **Vendor authoritative:** `https://www.picoxr.com/global/products/neo3-enterprise` — PICO Neo3 Enterprise product page
- **MS Learn primary:** `https://learn.microsoft.com/en-us/intune/intune-service/fundamentals/android-os-project-supported-devices` (firmware minimums)
- **Community reference:** `https://arborxr.com/blog/pico-business-suite` — In-depth PICO Business Suite guide (third-party but informative on PICO portal feature set)
- **Community reference:** `https://help.arborxr.com/en/articles/6384889-set-up-pico-4-ultra-enterprise-pico-4-enterprise-pico-neo-3-pro-and-pico-g3-devices` — ArborXR Pico setup guide

### HTC VIVE Focus

- **Vendor authoritative:** `https://www.vive.com/us/support/focus3/category_howto/enrolling-vive-focus-in-microsoft-intune.html` — Enrolling VIVE Focus 3 in Microsoft Intune (5.0.999.624+ requirement)
- **Vendor authoritative:** `https://business.vive.com/us/support/focusvision/category_howto/microsoft-intune.html` — Vive Focus Vision Microsoft Intune support page
- **Vendor authoritative:** `https://www.vive.com/us/support/vive-xr/category_howto/microsoft-intune.html` — Vive XR Elite Microsoft Intune support
- **MS Learn primary:** AOSP supported devices (firmware minimums)
- **Community reference:** `https://www.managexr.com/supported-devices/htc` — ManageXR HTC support
- **Community reference:** `https://help.arborxr.com/en/articles/6384896-set-up-vive-focus-3-vive-xr-elite-and-vive-focus-vision-devices` — ArborXR HTC setup

### Meta Quest

- **Vendor authoritative:** `https://www.meta.com/blog/an-update-on-meta-for-work` — Official wind-down announcement (verified 2026-04-25)
- **Vendor authoritative:** `https://meta.com/meta-for-work/` — Meta for Work portal landing
- **Vendor authoritative:** `https://work.meta.com/help/307276701907179` — Quest 2/3/Pro region-restriction page (linked from MS Learn)
- **MS Learn primary:** AOSP supported devices (firmware minimums + region restrictions)
- **MS Learn primary:** Specialty devices with Microsoft Intune (license tier requirement)
- **Integration partner authoritative:** `https://help.managexr.com/en/articles/13394353-update-meta-horizon-managed-services-will-be-free-starting-feb-20-2026` — ManageXR HMS-free transition (D-06 corroborating source)
- **Integration partner reference:** `https://www.managexr.com/supported-devices/meta` — ManageXR Meta supported devices

### Cross-OEM (License + Specialty Device)

- **MS Learn primary:** `https://learn.microsoft.com/en-us/intune/intune-service/fundamentals/specialty-devices-with-intune` — Manage Specialty devices with Microsoft Intune (Intune Plan 2 / Suite requirement for AR/VR; effective 2023-03-01; updated 2026-04-16)

## §7 Wi-Fi QR-Payload Embedding Walkthrough (D-02 RealWear REQUIRED Add-On H2)

This expands the PHASE-45-AOSP-SOURCE.md placeholder (lines 35-46) with verified Intune admin center UI path + RealWear authoritative constraints.

### Intune Admin Center UI Path (per MS Learn `setup-aosp-corporate-userless` step 6)

```
Microsoft Intune admin center
  → Devices
    → Enrollment
      → Android tab
        → Android Open Source Project (AOSP) section
          → Corporate-owned, userless devices  (or "Corporate-owned, user-associated devices")
            → Create profile
              → Name: {descriptive name}
              → Description: {optional}
              → Token expiration date:
                  - Userless: up to 90 days
                  - User-associated: up to 65 years
              → SSID: {staging Wi-Fi SSID}
              → Hidden Network: {disabled by default}
              → Wi-Fi Type: {select auth type}
                  - For RealWear: WEP Pre-Shared Key OR WPA Pre-Shared Key (PSK only — NOT EAP)
              → Pre-shared key: {SSID password — embedded in QR plaintext}
              → Naming Template: {optional, with {{SERIAL}}, {{ENROLLMENTDATETIME}}, etc.}
              → Next → Scope tags → Next → Review → Create
```

### Token / QR Access Path

```
Microsoft Intune admin center
  → Devices → Enrollment → Android tab
    → Android Open Source Project (AOSP) → Corporate-owned, userless devices
      → {select profile}
        → Token (or "Tokens")
          → QR code displayed (scannable from device)
          → Export (downloads enrollment profile JSON)
          → Replace token (regenerates with new expiration)
          → Revoke token (immediately invalidates)
```

### Supported Auth Types per Intune AOSP Profile UI

| Wi-Fi Type | Supported in Intune AOSP profile UI | RealWear-Compatible | Notes |
|------------|-------------------------------------|---------------------|-------|
| Open / no auth | Yes | NO (not recommended) | Profile allows open networks but RealWear authoritative source emphasizes "WPA/WPA2 PSK/WPA3 network type, meaning there is an SSID and Password only" |
| WEP Pre-Shared Key | Yes (per MS Learn user-associated step 6) | NO (deprecated; not recommended) | Listed in profile UI; not RealWear-recommended |
| WPA Pre-Shared Key (WPA-PSK / WPA2-PSK / WPA3) | Yes | **YES** (canonical RealWear staging path) | Required per RealWear authoritative |
| WPA2-Enterprise EAP-PEAP | **NOT** in Intune AOSP profile UI per MS Learn step 6 enumeration | **NOT supported** for RealWear staging | Authentication via username + corporate PEAP requires interactive UI which RealWear lacks during enrollment |
| WPA2-Enterprise EAP-TLS | **NOT** in Intune AOSP profile UI per MS Learn step 6 enumeration | **NOT supported** for RealWear staging | Certificate-based; requires post-enrollment cert delivery, which is itself a post-enrollment Wi-Fi profile concern |

**CRITICAL:** PHASE-45-AOSP-SOURCE.md placeholder (line 43) speculated EAP-PEAP and EAP-TLS support. **This is incorrect.** MS Learn AOSP enrollment-profile UI for staging Wi-Fi enumerates ONLY: open / WEP-PSK / WPA-PSK. RealWear authoritative source narrows further to WPA/WPA2-PSK/WPA3 ONLY. Wave 1 Plan 01 must NOT carry forward the speculative EAP-PEAP / EAP-TLS phrasing from the placeholder; it must accurately document the WPA-PSK constraint.

**Implication for corporate EAP networks:** RealWear staging Wi-Fi is a one-time bootstrap connection. After enrollment completes and the device is under Intune management, deploy a separate Wi-Fi configuration profile (Devices > Configuration > Android Enterprise > Wi-Fi) with EAP-PEAP / EAP-TLS for the production corporate network. The staging Wi-Fi can be a guest or pre-shared corporate network used only for enrollment.

### Failure Mode 1: Wi-Fi Absent from QR

**Symptom:** Device hangs at "Connecting to Intune" — no error surface. Device cannot reach the Intune enrollment server because it has no network.
**Recovery:** Factory-reset device; regenerate QR with Wi-Fi credentials embedded; re-scan.
**MEDIUM-confidence note:** No verbatim Microsoft documentation captures this exact symptom; inferred from RealWear architectural constraint (no interactive Wi-Fi UI during enrollment) + MS Learn note "the user can't join a network from the device." `[MEDIUM: inferred from RealWear authoritative + MS Learn, last_verified 2026-04-25]`

### Failure Mode 2: Wrong Wi-Fi Credentials in QR

**Symptom:** Silent timeout; no retry UI on device. Device joins SSID but cannot authenticate; eventually times out without surfacing error.
**Recovery:** Same as Failure Mode 1 — factory-reset, regenerate QR with corrected SSID/password, re-scan.
**MEDIUM-confidence note:** Same provenance as Failure Mode 1.

### Failure Mode 3: SSID Embedded in QR Conflicts with Staging Wi-Fi at Different Site

**Symptom:** Devices provisioned for Site A's staging Wi-Fi cannot enroll at Site B because the QR-embedded SSID doesn't match Site B's network.
**Recovery:** Generate per-site QR codes with site-specific staging Wi-Fi credentials.
**MEDIUM-confidence:** Operational pattern from RealWear-class-OEM field deployments; no Microsoft documentation for this site-scoping pattern.

### Failure Mode 4: Captive-Portal Wi-Fi at Provisioning Site

**Symptom:** Device joins SSID but the network requires captive-portal sign-in (e.g., guest WiFi with browser-based agreement page). RealWear has no browser to complete captive-portal flow during enrollment.
**Recovery:** Use a non-captive-portal staging network OR pre-pair the staging SSID with known-non-captive credentials.
**HIGH-confidence:** Captive-portal pattern is well-documented for Android Enterprise generally (see `03-fully-managed-cobo.md:164` for COBO ZT version); RealWear inherits this constraint with even less recovery surface than COBO.

### MEDIUM-Confidence Note on EAP-TLS Certificate Embedding

PHASE-45-AOSP-SOURCE.md line 43 raised the question "Certificate embedding for EAP-TLS — is that AOSP-supported at GA?" Based on this research: **NO, EAP-TLS is not in the Intune AOSP profile UI's supported auth-type enumeration. Certificate-based Wi-Fi for AOSP devices is achieved via post-enrollment Configuration profile (not embedded in the staging QR).** RealWear's authoritative "WPA/WPA2 PSK/WPA3 only" guidance corroborates this. `[HIGH: MS Learn setup-aosp-corporate-userless step 6 + support.realwear.com/knowledge/enrolling-in-microsoft-intune, last_verified 2026-04-25]`

## §8 Per-OEM `## Common Failures` Taxonomy

For each OEM, the top failure modes drive (a) admin doc `## Common Failures` H2 #7 content, (b) L1 runbook 29 Cause cross-link target, and (c) L2 runbook 23 Pattern cross-link target. Maintains 1:1 OEM → Cause → Pattern routing per D-21.

### RealWear (Cause A in runbook 29; Pattern A in runbook 23)

| Failure | Symptom | Likely Cause | Recovery |
|---------|---------|--------------|----------|
| Wi-Fi absent from QR | Device hangs at "Connecting to Intune" | Admin omitted SSID/password during profile creation | Regenerate QR with Wi-Fi; factory-reset; re-scan |
| Wrong Wi-Fi credentials in QR | Silent timeout post-scan | Typo in SSID or password during profile creation | Regenerate QR; factory-reset; re-scan |
| Wi-Fi auth type EAP-PEAP / EAP-TLS attempted | Profile creation succeeds but staging fails | Admin tried EAP for staging; not supported | Use WPA/WPA2-PSK/WPA3 staging Wi-Fi; deploy EAP via post-enrollment Configuration profile |
| Captive-portal Wi-Fi | Device joins SSID, can't reach Intune | Staging Wi-Fi is captive-portal network | Use non-captive-portal staging network |
| First-time setup not skipped | Device runs RealWear OOBE before enrolling | Admin / user did not skip RealWear OOBE | Per MS Learn: "Since you're managing the device via Intune, you should skip the RealWear first time setup" — factory-reset, skip OOBE, scan QR immediately |

### Zebra (Cause B in runbook 29; Pattern B in runbook 23)

| Failure | Symptom | Likely Cause | Recovery |
|---------|---------|--------------|----------|
| Android 12 device attempted | OEMConfig profile fails to apply | Admin tried to enroll an Android 12 Zebra device — not supported | Verify device is Android 11 or Android 13+; per MS Learn "Zebra devices don't support Android 12" |
| Wrong OEMConfig app deployed | Profile assignment never reaches device | Mismatch between Zebra OEMConfig Powered by MX (Android 13+/11) vs Legacy Zebra OEMConfig (Android 11 and earlier) | Verify device Android version; deploy matching OEMConfig app variant |
| Multiple profiles with conflicting top-level groups (Powered by MX) | Configurations conflict; unpredictable result | Admin deployed multiple OEMConfig profiles where same parent group is set in two | Consolidate to single profile OR use Transaction Steps for ordering |
| OEMConfig profile order matters but devices receive in wrong order | Unexpected runtime behavior | Multiple Intune profiles deployed; Google Play limitation prevents ordering | Use Zebra's Transaction Step feature in single Intune profile |
| StageNow XML not exported as MDM-compatible | Profile creation in Intune fails | Admin saved XML without "Export to MDM" final step | Re-export from StageNow with Export to MDM workflow |

### Pico (Cause C in runbook 29; Pattern C in runbook 23)

| Failure | Symptom | Likely Cause | Recovery |
|---------|---------|--------------|----------|
| Consumer Pico 4 attempted | Device doesn't appear in Intune | Admin tried to enroll consumer Pico 4 (not Enterprise SKU) | Verify SKU is PICO 4 Enterprise (not consumer Pico 4); consumer SKU not supported |
| Pico Business Suite not configured (when desired) | Vendor portal features unavailable | Admin assumed Pico Business Suite mandatory or not | Confirm AEAOSPFULL-03 verbatim "optional" — admins may use Intune-direct without Pico Business Suite |
| PUI version below minimum | Enrollment fails or behaves unexpectedly | Device on PUI < 5.6.0 (Pico 4 Enterprise) or PUI < 4.8.19 (Neo3 Pro/Eye) | Update device firmware to minimum |
| Pico license tier mismatch (mid-2025 changes) | Pico-side feature unavailability | Admin assumed pre-mid-2025 license terms | Re-verify Pico Business Suite licensing at business.picoxr.com |

### HTC VIVE Focus (Cause D in runbook 29; Pattern D in runbook 23)

| Failure | Symptom | Likely Cause | Recovery |
|---------|---------|--------------|----------|
| Vive Focus 3 below 5.0.999.624 | Enrollment fails — device version below Intune minimum | Device firmware < 5.0.999.624 | Update device to 5.2 - 5.0.999.624 or later (per vive.com support) |
| Wrong UI path (older firmware) | User cannot find QR scan UI | UI path varies; current Focus Vision path is Settings > Advanced > MDM setup > QR code | Use vive.com support page for current UI path; upgrade firmware if older path |
| Confusion with Vive Business Management System (alternative MDM) | Device enrolls in Vive BMS instead of Intune | Admin / user tried Vive BMS QR code | Vive BMS and Intune are mutually exclusive enrollment paths; choose one; for Intune, use Intune-generated QR only |
| Consumer Vive variant attempted | Device not on AOSP supported list | Admin tried consumer Vive Cosmos / similar | Use enterprise SKU (Vive Focus 3 / XR Elite / Focus Vision) only |
| ArborXR / ManageXR co-installed conflict | Multiple management agents | Admin deployed both ArborXR and Intune | Choose one MDM path; remove the other; factory-reset |

### Meta Quest (Cause E in runbook 29; Pattern E in runbook 23)

| Failure | Symptom | Likely Cause | Recovery |
|---------|---------|--------------|----------|
| Region restriction (Quest 2/3/Pro) | Device refuses to enroll in Intune AOSP | Quest 2 / Quest 3 / Quest Pro deployed in non-supported region | Verify region per `work.meta.com/help/307276701907179`; Quest 3s has no region restriction |
| Meta for Work account not configured | Cannot access Meta for Work portal | Admin attempted enrollment without Meta for Work account | Configure Meta for Work account at meta.com/meta-for-work/; HMS now free post-2026-02-20 |
| Commercial Quest SKU sourcing post-2026-02-20 | Cannot procure new commercial Quest devices | Admin attempted to purchase work-tier Quest after wind-down | Commercial SKUs no longer sold; switch to consumer Quest 3 / 3s + HMS-free or Intune-direct AOSP enrollment |
| Confusion about HMS subscription state | Admin paying for HMS or assuming HMS gone | HMS transition to free not understood | Verify at meta.com/meta-for-work/ — HMS infrastructure free; maintenance through 2030-01-04 |
| Quest 2 v49+ firmware below minimum | Enrollment fails | Device firmware < v49 | Update Quest device to v49+ minimum |

## §9 Anti-Pattern Catalog

Phase 45 must explicitly call out the following anti-patterns either inline (per-OEM doc `## Common Failures` H2 #7) or in `## What Breaks Summary` H2 #9:

### Per-OEM Device Administrator Legacy Mode Anti-Pattern

**Pattern:** Admin attempts to enroll RealWear / Zebra / Pico / HTC / Meta device via legacy Android Device Administrator (DA) mode instead of Intune AOSP enrollment.
**Why it's wrong:** Android Device Administrator is deprecated since Android 10 for new enrollments (REQUIREMENTS.md / PROJECT.md Out of Scope). AOSP devices on Android 10+ MUST use Intune AOSP enrollment, not legacy DA.
**Where to call out:** Per-OEM admin doc `## Scope and Status` H2 #1 (inline).
**Source:** `[HIGH: PROJECT.md Out of Scope + REQUIREMENTS.md v1.4.1 exclusions, last_verified 2026-04-25]`

### Inline Wi-Fi-During-Enrollment Anti-Pattern (RealWear-Specific)

**Pattern:** Admin assumes RealWear admin can interactively enter Wi-Fi credentials on the device during enrollment.
**Why it's wrong:** RealWear devices have no text-input UI during enrollment; the enrollment app runs before the Wi-Fi picker is available. Wi-Fi credentials MUST be embedded in the QR payload.
**Where to call out:** `09-aosp-realwear.md` `## Wi-Fi QR Embedding Walkthrough` H2 (D-02 REQUIRED add-on).
**Source:** `[HIGH: support.realwear.com/knowledge/enrolling-in-microsoft-intune + AEAOSPFULL-01 verbatim, last_verified 2026-04-25]`

### MGP-via-AOSP Attempt Anti-Pattern

**Pattern:** Admin attempts to publish apps to AOSP devices via Managed Google Play.
**Why it's wrong:** AOSP devices have no GMS, no Play Services, no MGP. Apps must be sideloaded (per OEM mechanism — RealWear Cloud, Zebra OEMConfig, Pico Business Suite, HTC ArborXR, Meta-for-Work) or pushed via Intune APK upload to private app store equivalents.
**Where to call out:** Per-OEM admin doc `## Scope and Status` H2 #1 (inline) AND `## Common Failures` H2 #7.
**Source:** `[HIGH: AEAOSPFULL-* verbatim + 06-aosp-stub.md PITFALL-7 framing, last_verified 2026-04-25]`

### ChromeOS / Android TV / Wear OS Scope-Creep Anti-Pattern

**Pattern:** Admin / reader assumes Phase 45 covers ChromeOS, Android TV, Android Auto, Wear OS specialty devices.
**Why it's wrong:** ChromeOS is a different management platform (Google Admin); Android TV / Android Auto / Wear OS are specialized device classes outside Intune enrollment scope (v1.4 exclusion preserved per PROJECT.md Out of Scope).
**Where to call out:** Per-OEM admin doc `## Scope and Status` H2 #1 (inline disclaimer).
**Source:** `[HIGH: PROJECT.md Out of Scope, last_verified 2026-04-25]`

### Cross-Portal Anti-Paste (Not Applicable to AOSP)

**Pattern:** Admin pastes ZT-style nested JSON wrapper or KME-style flat `EXTRA_ENROLLMENT_TOKEN` JSON into AOSP enrollment profile.
**Why this is NOT an anti-pattern for AOSP:** AOSP enrollment is QR-only with token; no JSON-paste step in the admin flow. The KME/ZT anti-paste pattern (D-03 in Phase 44 CONTEXT, currently in `28:127-131` and `02-zero-touch-portal.md:93-97`) does not apply to AOSP. **No anti-paste callout needed in any of files 09-13.**
**Source:** `[HIGH: MS Learn AOSP profile UI does not include JSON Custom Data field; AOSP token is rendered as QR code per setup-aosp-corporate-* docs, last_verified 2026-04-25]`

### Pico Consumer SKU Anti-Pattern

**Pattern:** Admin procures consumer Pico 4 (non-Enterprise) and attempts to enroll in Intune AOSP.
**Why it's wrong:** MS Learn AOSP supported devices list includes only PICO 4 Enterprise and PICO Neo3 Pro/Eye (enterprise SKUs); consumer Pico 4 is not on the supported list and lacks the enterprise OS surface.
**Where to call out:** `11-aosp-pico.md` `## Hardware Scope` H2 #2 (inline).
**Source:** `[HIGH: MS Learn AOSP supported devices + AEAOSPFULL-03 verbatim, last_verified 2026-04-25]`

### Vive BMS / ArborXR / ManageXR Co-Enrollment Anti-Pattern

**Pattern:** Admin enrolls device in Intune AOSP AND simultaneously in Vive Business Management System / ArborXR / ManageXR / Pico Business Suite (where the latter operate as alternative MDMs, not coexistent vendor portals).
**Why it's wrong:** Multiple management agents conflict; device may show in multiple consoles but receive contradictory policy. Choose one MDM path.
**Caveat:** Pico Business Suite is OPTIONAL coexistence (per AEAOSPFULL-03); Meta-for-Work + HMS coexists with Intune (per AEAOSPFULL-05); RealWear Cloud coexists with Intune for Microsoft Teams app distribution (per RealWear FAQ). These are vendor PORTALS not MDMs. ArborXR / ManageXR / VMware AirWatch / Vive BMS / Omnissa are alternative MDMs and MUST be chosen instead-of, not in-addition-to, Intune.
**Where to call out:** Per-OEM admin doc `## Scope and Status` H2 #1 + `## See Also` H2 #10 (alternative MDMs as `## See Also` cross-links only).
**Source:** `[HIGH: vendor portals vs alternative MDMs distinction inferred from MS Learn AOSP enrollment scope + vendor docs, last_verified 2026-04-25]`

## Common Pitfalls

### Pitfall 1: Treating "AOSP" as a Single Behavior Across All 5 OEMs

**What goes wrong:** Wave 1 plans copy a template across 5 admin docs without per-OEM specificity.
**Why it happens:** Admin template enforcement (D-01 11-H2 fixed core) is necessary but not sufficient — the per-OEM mechanics (Wi-Fi REQUIRED for RealWear; OPTIONAL elsewhere; OEMConfig-via-APK for Zebra; in-device Settings>Advanced for HTC; 4-portal pattern for Meta) are distinctive.
**How to avoid:** Each Wave 1 plan must derive content from its OEM-specific authoritative source (per §6 Per-OEM Authoritative Source List), not from the sibling templates.
**Warning signs:** Two per-OEM docs share more than ~50% of `## Provisioning Steps` content; per-OEM REQUIRED add-on H2 (D-02) absent or generic.

### Pitfall 2: PITFALL-7 Framing Erosion

**What goes wrong:** Per-OEM "supported under AOSP" assertion ships without the AOSP baseline caveat.
**Why it happens:** Once 5 admin docs assert "RealWear is supported under AOSP" / "Zebra WS50 is supported under AOSP" etc., the cumulative effect contradicts the original Phase 39 framing of "AOSP is for non-GMS specialty hardware; if GMS is present use Android Enterprise fully managed instead."
**How to avoid:** D-04 + D-23 require per-claim discipline — every "supported under AOSP" assertion paired inline with caveat. Wave 1 plans encode this in task specs; planner enforces.
**Warning signs:** Per-OEM doc contains "supported under AOSP" without nearby phrase like "no GMS" / "use Android Enterprise fully managed if GMS available" / "specialty hardware" / similar.
**Detection:** Audit harness C6 PITFALL-7 preservation regex check is informational-first per D-29; Phase 47 owns promotion.

### Pitfall 3: Wave 3 Cross-Link Anchor Drift

**What goes wrong:** Wave 1 plans publish per-OEM admin docs with anchors like `#common-failures` or `#wi-fi-qr-embedding-walkthrough`; Wave 3 plans cross-link to slightly different anchor strings (e.g., `#wi-fi-qr-embedding`).
**Why it happens:** Anchor strings and H2 titles are not 1:1 identical (markdown auto-anchor inference can differ from explicit `<a id="">` anchors).
**How to avoid:** D-05 anchor scaffolding contract requires explicit `<a id="..."></a>` anchors; Wave 3 task specs must verify per-OEM admin doc anchor strings before Wave 3 plans commit cross-links.
**Warning signs:** Cross-link 404s in published doc preview; broken cross-links discovered in Wave 4 atomic retrofit verification.

### Pitfall 4: Meta Horizon Wind-Down Misframing

**What goes wrong:** `13-aosp-meta-quest.md` ships with "HMS shutdown" or "HMS discontinued" framing.
**Why it happens:** Headline-level wind-down language ("HMS sales end Feb 20, 2026") interpreted as discontinuation when actual finding is commercial-SKU + paid-tier transition with infrastructure free-tier maintenance through 2030-01-04.
**How to avoid:** Wave 1 Plan 05 task spec includes verbatim copy of §2 Meta Horizon Wind-Down resolution above; reviewer-check enforces accurate framing.
**Warning signs:** Doc carries phrases like "HMS shut down" / "Meta Horizon discontinued" / "no longer available" without paired "free-tier" / "maintenance mode" / "through 2030-01-04" qualifiers.

### Pitfall 5: Token Expiry Asymmetry Collapsed in `02-provisioning-methods.md`

**What goes wrong:** AEAOSPFULL-09 SC#5 retrofit collapses to "AOSP 90-day token ceiling" without distinguishing userless (90d) vs user-associated (65y).
**Why it happens:** Earlier Phase 39 / Phase 43 framing referenced only the 90-day ceiling; carried forward without re-verification.
**How to avoid:** Wave 4 Plan 10 task spec for `02-provisioning-methods.md` includes both ceilings explicitly; references §3 Token Expiry Asymmetry above.
**Warning signs:** Provisioning-methods doc says "90-day max" without "userless" qualifier; user-associated 65-year ceiling absent from AOSP row.

### Pitfall 6: RealWear Wi-Fi EAP Speculation Carry-Forward

**What goes wrong:** Wave 1 Plan 01 inherits PHASE-45-AOSP-SOURCE.md placeholder line 43 EAP-PEAP / EAP-TLS speculation.
**Why it happens:** Placeholder is verbatim-tagged as "Suggested section outline for Phase 45 authoring" — easy to copy without re-verifying claims.
**How to avoid:** Wave 1 Plan 01 task spec includes verbatim copy of §7 Wi-Fi QR-Payload Embedding Walkthrough above; speculative EAP claims are explicitly removed; RealWear authoritative WPA-PSK constraint documented; corporate EAP networks routed to post-enrollment Configuration profile.
**Warning signs:** `09-aosp-realwear.md` mentions EAP-PEAP or EAP-TLS in the context of staging Wi-Fi.

### Pitfall 7: Per-OEM Admin Doc Author Forgets Step 0 H3 Wait Gates

**What goes wrong:** Per-OEM admin doc lacks `### Step 0 — ...` H3 child for prerequisite latency (e.g., Meta-for-Work account approval; Pico Business Suite licensing onboarding; HTC enterprise account verification).
**Why it happens:** D-09 explicitly handles Meta-for-Work approval gate as `### Step 0 — ...` H3, but other OEMs may also have onboarding latencies.
**How to avoid:** Wave 1 plans include explicit decision: does the OEM require account onboarding latency? If yes, Step 0 H3 (per Phase 44 D-02 precedent). If no, document explicitly that no Step 0 needed.
**Warning signs:** Admin doc `## Provisioning Steps` H2 #5 jumps directly to `### Step 1 — Create Intune AOSP profile` without checking for OEM onboarding gates.

### Pitfall 8: Zebra Android-12 Gap Forgotten

**What goes wrong:** `10-aosp-zebra.md` documents WS50 as Android 11+ supported without flagging Android 12 specifically as NOT supported.
**Why it happens:** Common Android version language ("Android 11+") implies all later versions; the Zebra-specific Android 12 gap is unusual.
**How to avoid:** Wave 1 Plan 02 task spec includes verbatim Android-12 gap flag from §1 Zebra above.
**Warning signs:** Zebra admin doc lacks explicit "Zebra devices don't support Android 12" callout in `## Hardware Scope` H2 #2.

## Code Examples

### Per-OEM Frontmatter (D-27 LOCKED)

```yaml
---
last_verified: 2026-04-25
review_by: 2026-06-24
audience: admin
platform: Android
applies_to: AOSP
---
```

(For `13-aosp-meta-quest.md`, additionally document 30-day re-verify trigger in `## Renewal / Maintenance` H2 per D-10. The frontmatter `review_by` remains 2026-06-24 — 60-day cycle — but the H2 documents the additional 30-day Meta-Horizon-specific trigger date 2026-05-25.)

### L1 Runbook 29 Frontmatter (D-27 LOCKED)

```yaml
---
last_verified: 2026-04-25
review_by: 2026-06-24
applies_to: AOSP
audience: L1
platform: Android
---
```

### L2 Runbook 23 Frontmatter (D-27 LOCKED)

```yaml
---
last_verified: 2026-04-25
review_by: 2026-06-24
applies_to: AOSP
audience: L2
platform: Android
---
```

### `aosp-oem-matrix.md` Frontmatter (D-27 LOCKED)

```yaml
---
last_verified: 2026-04-25
review_by: 2026-06-24
applies_to: AOSP
audience: admin
platform: Android
---
```

### Meta Horizon Wind-Down Callout (D-08 LOCKED + §2 resolution)

```markdown
> ⚠️ **Meta Horizon Managed Services transition (Feb 20, 2026 — verified 2026-04-25):**
> Meta has discontinued sales of commercial Quest SKUs and the paid HMS subscription as of 2026-02-20. **HMS infrastructure remains operational and is now FREE** for managing Meta Quest 3 / 3s through ManageXR or direct Meta-for-Work integration. HMS enters maintenance mode (bug fixes + support; no new platform capabilities) through 2030-01-04. Existing HMS subscribers continue uninterrupted. Net-new fleets MAY use HMS-free + consumer Quest 3 / 3s OR switch to **Intune-direct AOSP enrollment** for vendor-independent management. The 4-portal pattern (Intune + Meta for Work) is preserved; this guide documents both paths. `[HIGH: meta.com/blog/an-update-on-meta-for-work + managexr.com Help Center, last_verified 2026-04-25]`
```

### Source-Confidence Marker Examples (D-28 LOCKED)

```markdown
RealWear HMT-1, HMT-1Z1, and Navigator 500 are confirmed GA for AOSP management in Intune. `[HIGH: MS Learn AOSP supported devices, last_verified 2026-04-25]`

Pico Business Suite SDK access is reportedly priced $50-$150/year/device. `[MEDIUM: aliexpress.com / community, last_verified 2026-04-25]`

Zebra WS50 OEMConfig delivery requires the Zebra OEMConfig Powered by MX app (Android 13+ AND Android 11) OR Legacy Zebra OEMConfig (Android 11 and earlier). `[HIGH: MS Learn oemconfig-zebra-android-devices, last_verified 2026-04-25]`
```

### `aosp-oem-matrix.md` Sample Sub-Table (D-11 / D-16 LOCKED)

```markdown
## Hardware Scope

| OEM | Models | Minimum Firmware | Type |
|-----|--------|------------------|------|
| RealWear | HMT-1, HMT-1Z1, Navigator 500 | 11.2 / 11.2 / 1.1 | AR/VR Headset |
| Zebra | WS50 | 11-49-15.00 | Wearable Scanner |
| Pico | PICO 4 Enterprise, PICO Neo3 Pro/Eye | PUI 5.6.0 / PUI 4.8.19 | AR/VR Headset |
| HTC | Vive Focus 3, Vive XR Elite, Vive Focus Vision | 5.2-5.0.999.624 / 4.0-1.0.999.350 / 7.0.999.159 | AR/VR Headset |
| Meta | Quest 2, Quest 3, Quest 3s, Quest Pro[^meta-volatility] | v49 / v59 / v71 / v49 | AR/VR Headset |

## Enrollment Method and Wi-Fi Embedding

| OEM | Enrollment Method | Wi-Fi Embedding |
|-----|-------------------|-----------------|
| RealWear | QR-only (Intune AOSP) | REQUIRED |
| Zebra | QR-only (Intune AOSP) + OEMConfig profile push | OPTIONAL |
| Pico | QR-only (Intune AOSP) | OPTIONAL |
| HTC | QR-only (Intune AOSP) | OPTIONAL |
| Meta | QR-only (Intune AOSP) + Meta for Work portal[^meta-volatility] | OPTIONAL |

## Vendor Portals and Licensing

| OEM | Vendor Portal | Vendor Portal Required | Intune License Tier |
|-----|---------------|------------------------|---------------------|
| RealWear | RealWear Cloud | OPTIONAL | Plan 2 / Suite |
| Zebra | None | N/A | Plan 1 (verify per tenant) |
| Pico | Pico Business Suite | OPTIONAL | Plan 2 / Suite |
| HTC | None | N/A | Plan 2 / Suite |
| Meta | Meta for Work / HMS[^meta-volatility] | REQUIRED (free post-2026-02-20) | Plan 2 / Suite |

## Intune AOSP Mode

| OEM | User-Associated | Userless |
|-----|-----------------|----------|
| RealWear | Yes | Yes |
| Zebra | Yes | Yes |
| Pico | Yes | Yes |
| HTC | Yes | Yes |
| Meta | Yes | Yes |

## Source Attribution

- `[HIGH: MS Learn AOSP supported devices (https://learn.microsoft.com/en-us/intune/intune-service/fundamentals/android-os-project-supported-devices), updated_at 2026-04-16, last_verified 2026-04-25]` — Hardware Scope table values
- `[HIGH: MS Learn setup-aosp-corporate-{userless,user-associated} (updated_at 2026-04-16), last_verified 2026-04-25]` — Intune AOSP Mode table values
- `[HIGH: MS Learn specialty-devices-with-intune (updated_at 2026-04-16), last_verified 2026-04-25]` — Intune License Tier
- `[HIGH: meta.com/blog/an-update-on-meta-for-work + managexr.com Help Center, last_verified 2026-04-25]` — Meta volatility footnote
- `[MEDIUM: vendor docs (RealWear FAQ; PICO Business; ManageXR; ArborXR), last_verified 2026-04-25]` — Vendor Portal columns

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-04-25 | Initial version (Phase 45 scope) — 4 sub-tables grouped by capability per D-11; per-OEM hardware / enrollment / portals-licensing / Intune AOSP mode dimensions; Meta footnote per D-14; Source Attribution outside tables per D-15; literal cell values per D-16. | -- |

[^meta-volatility]: Meta Quest commercial SKUs are no longer sold for new procurement as of 2026-02-20; consumer Quest 3 / 3s remain available and can be enrolled via HMS-free or Intune-direct AOSP. HMS enters maintenance mode through 2030-01-04. See `13-aosp-meta-quest.md#meta-horizon-subscription-status` for the full Meta Horizon transition narrative. `[HIGH: meta.com/blog/an-update-on-meta-for-work, last_verified 2026-04-25]`
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| RealWear-only "GA" mention in `06-aosp-stub.md` | 5-OEM expansion (RealWear / Zebra / Pico / HTC / Meta Quest) | Phase 45 (this phase) | Real coverage parity for AR/VR + wearable-scanner specialty hardware |
| Meta Horizon Managed Services as paid subscription | HMS becomes free; commercial Quest SKUs no longer sold; consumer Quest 3 / 3s remain | 2026-02-20 | Net-new fleets choose Intune-direct OR HMS-free + consumer Quest |
| AOSP token expiry as universal "90-day max" | Userless = 90d max; user-associated = 65y max | MS Learn updates 2025-05-15 (codified 2026-04-16) | Doc must distinguish; cobo:117 has minor error to flag for Phase 47 atomic correction |
| Zebra OEMConfig single-app | TWO apps: Powered by MX (Android 13+/11) vs Legacy (Android 11 and earlier) | Microsoft TechCommunity blog ~2023; codified MS Learn 2024-06-27, updated 2026-04-14 | Wave 1 Plan 02 must enumerate both apps |
| AOSP L1 escalation stub (ANDE1) | AOSP L1 runbook 29 with 5 OEM-scoped Causes | Phase 45 (this phase) | L1 has actionable runbook; ANDE1 → ANDR29 single click target preserves Phase 40 D-05 LOCK |
| Phase 39 9-H2 stub whitelist | 9-H2 PRESERVED + deferred-content table COLLAPSED | Phase 45 retrofit (AEAOSPFULL-09) | Stub becomes thin routing pin to per-OEM coverage + matrix |

**Deprecated/outdated:**
- "Other OEMs deferred to v1.4.1" stub language → Phase 45 ships per-OEM coverage; collapsed.
- "AOSP user-associated vs userless full coverage deferred" → Per-OEM hint in 13-aosp-meta-quest.md and aosp-oem-matrix.md Mode column; full disambiguation deferred to v1.5 per CONTEXT.

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | Pico Business Suite SDK access pricing $50-$150/year/device | §1 Pico license tier (Pico) | Doc carries imprecise pricing; admin may budget incorrectly. Mitigation: cite as `[MEDIUM: aliexpress.com / community]` and direct readers to `business.picoxr.com` for authoritative current pricing. |
| A2 | Intune AOSP mode (user-associated AND userless) supported on all 5 OEMs | §1 Zebra / Pico / HTC / Meta Mode rows | Inferred from MS Learn dual-mode availability and AR/VR pattern; per-OEM authoritative confirmation absent. Mitigation: cite as `[MEDIUM: AR/VR pattern + MS Learn dual-mode AOSP]`; planner may want to verify against each OEM's vendor docs at execute time. |
| A3 | Zebra WS50 license tier = Plan 1 baseline (not specialty Plan 2 / Suite) | §1 Zebra license tier | MS Learn specialty-devices-with-intune lists "AR/VR headsets, large smart-screen devices, conference room meeting devices" — wearable scanners not explicitly named. If Microsoft adds wearable scanners to specialty-devices scope, license tier reclassifies. Mitigation: `[MEDIUM: MS Learn specialty-devices-with-intune scope ambiguity]` marker; planner should re-verify at execute time. |
| A4 | Meta Quest region restrictions list per `work.meta.com/help/307276701907179` | §1 Meta region restrictions | Region list maintained by Meta; could change. Mitigation: cite Meta source URL directly; 30-day re-verify per D-10. |
| A5 | All 5 OEMs accept WPA-PSK staging Wi-Fi (not just RealWear) | §7 Wi-Fi auth types per Intune AOSP profile UI | Intune AOSP profile UI auth-type enumeration is per-profile, not per-OEM. RealWear's narrowing to PSK only is OEM-specific (no interactive UI). Other OEMs with interactive UI may accept richer auth in post-enrollment Configuration profiles but NOT in staging QR. Mitigation: explicit per-OEM Wi-Fi embedding row in matrix `## Enrollment Method and Wi-Fi Embedding` H2 distinguishes REQUIRED (RealWear) vs OPTIONAL (others). |
| A6 | RealWear Cloud + Intune coexistence applies post-2022 (RealWear FAQ snapshot is from October 2022) | §1 RealWear vendor portal | RealWear's "October 2022" FAQ may have stale feature-availability list (cert/Wi-Fi management gaps). Mitigation: planner should re-verify against current RealWear support docs at execute time; the coexistence claim itself is durable. |
| A7 | Pico Neo3 Pro/Eye and Pico 4 Enterprise are the only Enterprise SKUs in scope (not Pico 4 Ultra Enterprise) | §1 Pico models | MS Learn supported-devices list does NOT name Pico 4 Ultra Enterprise; community docs do. If Pico 4 Ultra Enterprise is supported but unlisted, Phase 45 admin doc undercoverage. Mitigation: cite ONLY MS-Learn-listed devices; if Pico 4 Ultra Enterprise is critical, it routes to v1.5 backlog per CONTEXT Out of Scope ("Consumer Pico 4 / consumer HTC Vive variants" — note the negative scoping doesn't explicitly cover Pico 4 Ultra Enterprise; planner should confirm with user if this matters). |

**If this table contained no entries:** All claims in this research were either HIGH-verified or explicitly cited as MEDIUM/LOW with provenance — no silent assumptions. The 7 entries above represent transparent assumptions with mitigation paths; planner has the option to elevate to confirmation if any matter to phase scope.

## Open Questions (RESOLVED via deferral/recommendation)

1. **MS Learn AOSP supported-devices: per-OEM AOSP mode (user-associated vs userless) explicit enumeration**
   - What we know: MS Learn AOSP supported-devices list does NOT enumerate which OEMs support which mode.
   - What we know: MS Learn `setup-aosp-corporate-userless` says "this article describes how to set up Android (AOSP) device management and enroll **RealWear** devices for use at work" — implies RealWear is the canonical userless OEM. `setup-aosp-corporate-user-associated` is more general.
   - What's unclear: Whether Zebra WS50 supports user-associated mode (typically userless wearable scanner), whether Meta Quest in HMS context defaults to user-associated, etc.
   - Recommendation: Document with `[MEDIUM: AR/VR pattern + MS Learn dual-mode AOSP]` markers in `aosp-oem-matrix.md` `## Intune AOSP Mode` H2; flag as Open Question for execute-time verification per D-22 Phase 39 protocol.
   - **RESOLVED via Plan 06 W-3 fix:** Plan 06 action documents the disposition explicitly — per-OEM Intune AOSP Mode cells use literal `Yes` for both columns (User-Associated / Userless) WITHOUT per-cell MEDIUM markers; section-level confidence pin lives at `## Source Attribution` H2 with `[MEDIUM: AR/VR pattern inference + MS Learn dual-mode AOSP support, last_verified 2026-04-25] — per-OEM verification deferred to v1.5 if mode-specific failure modes emerge in field use`. Cell-level markers add noise; section-level pinning matches sibling matrix convention.

2. **Pico 4 Ultra Enterprise scope**
   - What we know: Community docs (ArborXR setup guide; PICO Business site) treat Pico 4 Ultra Enterprise as supported.
   - What we know: MS Learn AOSP supported-devices list lists ONLY PICO 4 Enterprise and PICO Neo3 Pro/Eye (not Pico 4 Ultra Enterprise).
   - What's unclear: Whether Pico 4 Ultra Enterprise is supported under AOSP via Intune (perhaps under MS Learn list as PICO 4 Enterprise alias?) OR is a different SKU not in scope for v1.4.1.
   - Recommendation: Stick to MS-Learn-listed devices (PICO 4 Enterprise + Neo3 Pro/Eye) in Phase 45; flag Pico 4 Ultra Enterprise for v1.5 backlog as a possible expansion.
   - **RESOLVED via v1.5 backlog deferral:** Phase 45 ships only MS-Learn-listed Pico devices (PICO 4 Enterprise + Neo3 Pro/Eye). Pico 4 Ultra Enterprise routes to v1.5 backlog per CONTEXT Out of Scope alignment; no Phase 45 admin-doc coverage. If user-tenant requires Pico 4 Ultra Enterprise, escalate to v1.5 expansion rather than retrofit Phase 45.

3. **Zebra WS50 license tier classification (Plan 1 vs Plan 2 / Suite)**
   - What we know: MS Learn specialty-devices-with-intune lists "AR/VR headsets, large smart-screen devices, conference room meeting devices" — wearable scanners not explicitly named.
   - What we know: AR/VR headsets explicitly require Plan 2 / Suite.
   - What's unclear: Whether Zebra WS50 wearable scanner falls under "specialty devices" requiring Plan 2 / Suite, or under general AOSP requiring only Plan 1.
   - Recommendation: Document as `[MEDIUM: MS Learn specialty-devices-with-intune scope ambiguity]`; planner should escalate to user for tenant-specific confirmation if license-tier accuracy is critical.
   - **RESOLVED via Plan 02 W-1 escalation pathway:** Plan 02 Task 1 action carries an explicit license-tier escalation pathway — "If reviewer flags Zebra WS50 license tier as deployment-blocking ambiguity, escalate to user via STATE.md flag for tenant-specific Plan 1 vs Plan 2 confirmation per RESEARCH.md Open Question §3 recommendation." Plan 02 documents the MEDIUM marker AND the execute-time escalation trigger; ambiguity is captured without blocking ship.

4. **Meta-for-Work account onboarding latency (D-09 trigger)**
   - What we know: D-09 specifies Meta-for-Work approval as `### Step 0 — ...` H3 if there's onboarding latency.
   - What we know: Meta-for-Work account creation flow is at meta.com/meta-for-work/.
   - What's unclear: Actual latency for new Meta-for-Work account approval (e.g., is it instant, hours, or days like Samsung KME B2B 1-2 business days?).
   - Recommendation: Wave 1 Plan 05 task spec includes researcher verification of current Meta-for-Work onboarding latency at execute time; if no latency, document explicitly that Step 0 NOT needed (preserving the optionality).
   - **RESOLVED via Plan 05 execute-time verification:** Plan 05 Task 1 includes `### Step 0 — Meta for Work account approval (variable latency; verify at vendor onboarding time)` H3 per D-09. Latency is verified at execute time; if onboarding proves instant, Step 0 collapses to a one-line note preserving the H3 anchor for sibling parity. The optionality is preserved by the variable-latency framing in the H3 title itself.

5. **Whether `02-provisioning-methods.md` AOSP row needs additional NFC / afw#setup / Zero-Touch ✗ entries for per-OEM**
   - What we know: AEAOSPFULL-09 SC#5 says "per-OEM firmware rows in version matrix" — implies per-OEM rows.
   - What we know: Current `02-provisioning-methods.md:29` AOSP row is a single row for all OEMs.
   - What's unclear: Whether SC#5 means (a) split AOSP into 5 per-OEM rows, or (b) keep AOSP as single row but add per-OEM firmware-minimum sub-rows or column annotations.
   - Recommendation: Wave 4 Plan 10 task spec for `02-provisioning-methods.md` retrofit chooses (b) — single AOSP row with per-OEM firmware-minimum cell expansion or footnote — to honor append-only contract D-25 and avoid breaking Phase 34 D-26 single-canonical-source matrix discipline. Cross-link to `aosp-oem-matrix.md` for the per-OEM expansion.
   - **RESOLVED via Plan 10 single-row + footnote choice:** Plan 10 Task 3 Operation 1 keeps `02-provisioning-methods.md:29` as a SINGLE AOSP row; Notes column updated with cross-link to `aosp-oem-matrix.md#hardware-scope` for per-OEM minimum firmware (RealWear / Zebra / Pico / HTC / Meta Quest). Token-ceiling asymmetry surfaces in a NEW additive `## AOSP Token Expiry Asymmetry` H2 (Operation 2) per D-25 append-only contract. The single-row + cross-link choice avoids splitting the AOSP row into 5 per-OEM rows (which would violate Phase 34 D-26 single-canonical-source matrix discipline).

## Environment Availability

Phase 45 is documentation-only; the only "external dependency" is the audit harness which is already in place per Phase 43.

| Dependency | Required By | Available | Version | Fallback |
|------------|-------------|-----------|---------|----------|
| Node.js (for harness execution) | All Phase 45 plans | ✓ (Phase 43 LOCKED) | Per Phase 43 spec | — |
| `scripts/validation/v1.4.1-milestone-audit.mjs` | All Phase 45 plans | ✓ (Phase 43 Plan 02) | Phase 43 LOCKED | — |
| `scripts/validation/v1.4.1-audit-allowlist.json` | All Phase 45 plans | ✓ (Phase 43 Plan 03) | Phase 43 LOCKED | — |
| Pre-commit hook | All Phase 45 plans (CI integration) | ✓ (Phase 43 Plan 08) | Phase 43 LOCKED | — |
| GitHub Actions CI workflow | All Phase 45 plans | ✓ (Phase 43 Plan 08) | Phase 43 LOCKED | — |
| MS Learn / vendor authoritative URLs | Wave 1 plan task specs (citation) | ✓ (verified 2026-04-25 in this research) | n/a (web-fetched) | URLs subject to change; researcher's per-source verification is the snapshot of record |

**Missing dependencies with no fallback:** None.
**Missing dependencies with fallback:** None.

*Phase 45 plans flow through existing infrastructure without environment additions or modifications.*

## Validation Architecture

(See §5 Validation Architecture (Nyquist) above for the full per-requirement test map. Quick summary:)

| Property | Value |
|----------|-------|
| Framework | `scripts/validation/v1.4.1-milestone-audit.mjs` (Node ESM) |
| Quick run command | `node scripts/validation/v1.4.1-milestone-audit.mjs` |
| Phase gate | 8/8 PASS before `/gsd-verify-work` |

## Sources

### Primary (HIGH confidence)

**Microsoft Learn — verified 2026-04-25 via WebFetch:**
- `https://learn.microsoft.com/en-us/intune/intune-service/fundamentals/android-os-project-supported-devices` (`updated_at: 2026-04-16T16:28:00Z`) — Per-OEM AOSP supported devices + minimum firmware
- `https://learn.microsoft.com/en-us/intune/intune-service/enrollment/android-aosp-corporate-owned-user-associated-enroll` (`updated_at: 2026-04-16`) — User-associated AOSP enrollment + 65-year token + UI path
- `https://learn.microsoft.com/en-us/intune/device-enrollment/android/setup-aosp-corporate-userless` (`updated_at: 2026-04-16`) — Userless AOSP enrollment + 90-day token + UI path
- `https://learn.microsoft.com/en-us/intune/intune-service/configuration/oemconfig-zebra-android-devices` (`updated_at: 2026-04-14`) — Zebra OEMConfig deployment via Intune (Powered by MX vs Legacy; Android 12 NOT supported)
- `https://learn.microsoft.com/en-us/intune/intune-service/fundamentals/specialty-devices-with-intune` (`updated_at: 2026-04-16`) — Intune Plan 2 / Suite licensing for AR/VR specialty devices

**Vendor authoritative:**
- `https://www.meta.com/blog/an-update-on-meta-for-work` — Meta official wind-down announcement (commercial-SKU + paid HMS sales end 2026-02-20; HMS becomes free; maintenance mode through 2030-01-04)
- `https://help.managexr.com/en/articles/13394353-update-meta-horizon-managed-services-will-be-free-starting-feb-20-2026` — ManageXR Help Center (Meta integration partner; D-06 corroborating source)
- `https://support.realwear.com/knowledge/faq-intune-aosp` — RealWear Intune AOSP FAQ (HMT-1 / HMT-1Z1 / Navigator 500 + RealWear Cloud co-existence)
- `https://support.realwear.com/knowledge/enrolling-in-microsoft-intune` — RealWear Intune enrollment guide (staging Wi-Fi WPA/WPA2-PSK/WPA3 ONLY constraint)
- `https://www.vive.com/us/support/focus3/category_howto/enrolling-vive-focus-in-microsoft-intune.html` — HTC Vive Focus 3 Intune enrollment (5.0.999.624 minimum)
- `https://business.vive.com/us/support/focusvision/category_howto/microsoft-intune.html` — Vive Focus Vision Intune support (Settings > Advanced > MDM setup > QR code UI path)
- `https://business.picoxr.com/` — PICO Business sub-brand (Enterprise SKU + PICO Business Suite)

**In-repo authoritative:**
- `.planning/phases/45-per-oem-aosp-expansion/45-CONTEXT.md` — D-01..D-30 LOCKED decisions
- `.planning/phases/45-per-oem-aosp-expansion/PHASE-45-AOSP-SOURCE.md` — RealWear deep content + Wi-Fi-embed placeholder (lifecycle: deleted in Phase 45 final commit)
- `.planning/REQUIREMENTS.md` — AEAOSPFULL-01..09 verbatim requirements
- `.planning/ROADMAP.md` lines 152-163 — Phase 45 entry + 5 success criteria
- `.planning/STATE.md` — Phase 45 research flags + Blockers
- `.planning/PROJECT.md` — Out of Scope + v1.4.1 Key Decisions
- `docs/admin-setup-android/06-aosp-stub.md` — Phase 39 stub (9-H2 whitelist + 8-OEM enumeration + PITFALL-7)
- `docs/admin-setup-android/07-knox-mobile-enrollment.md` — Phase 44 KME admin guide (sibling 4th-portal precedent)
- `docs/admin-setup-android/02-zero-touch-portal.md` — Phase 35 ZT portal guide (sibling Step 0 H2 precedent + DPC Extras JSON own-H2)
- `docs/admin-setup-android/03-fully-managed-cobo.md` — Phase 36 COBO guide (sibling `## What Breaks Summary` + `## Renewal / Maintenance`)
- `docs/admin-setup-android/05-dedicated-devices.md` — Phase 38 Dedicated guide
- `docs/reference/android-capability-matrix.md` lines 121-127 — `#deferred-full-aosp-capability-mapping` anchor target for AEAOSPFULL-09
- `docs/decision-trees/08-android-triage.md` — ANDE1 → ANDR29 single-target replacement target
- `docs/l1-runbooks/27-android-zte-enrollment-failed.md` — Phase 40 multi-cause precedent
- `docs/l1-runbooks/28-android-knox-enrollment-failed.md` — Phase 44 OEM-scoped precedent
- `docs/l2-runbooks/22-android-knox-investigation.md` — Phase 44 L2 Pattern A-E precedent
- `docs/android-lifecycle/02-provisioning-methods.md` — 90-day token + per-OEM firmware retrofit target
- `scripts/validation/v1.4.1-milestone-audit.mjs` — Phase 43 audit harness
- `.planning/phases/39-zero-touch-enrollment-aosp-stub/39-CONTEXT.md` — D-08, D-10, D-11, D-13, D-17, D-20, D-22, D-26 locked carry-forward
- `.planning/phases/43-v1-4-cleanup-audit-harness-fix/43-CONTEXT.md` — D-14, D-16, D-17, D-19, D-20 locked carry-forward
- `.planning/phases/44-knox-mobile-enrollment/44-CONTEXT.md` — D-02 Step 0 H2 precedent + D-03 anti-paste precedent

### Secondary (MEDIUM confidence)

- `https://help.arborxr.com/en/articles/6384889-set-up-pico-4-ultra-enterprise-pico-4-enterprise-pico-neo-3-pro-and-pico-g3-devices` — ArborXR Pico setup (third-party but informative)
- `https://help.arborxr.com/en/articles/6384896-set-up-vive-focus-3-vive-xr-elite-and-vive-focus-vision-devices` — ArborXR HTC setup (third-party but informative)
- `https://www.managexr.com/supported-devices/htc` — ManageXR HTC supported devices (third-party)
- `https://arborxr.com/blog/pico-business-suite` — In-depth PICO Business Suite guide (third-party but informative)
- `https://techdocs.zebra.com/oemconfig/` — Zebra OEMConfig overview + MX schema documentation
- Multiple community sources for Meta Horizon wind-down (corroborating only; Meta is authoritative)

### Tertiary (LOW confidence — flagged for execute-time validation)

- aliexpress.com / accio.com / community pricing for Pico 4 Enterprise + Pico Business Suite (LOW pricing — direct to business.picoxr.com for authoritative current pricing)
- Anecdotal community posts on per-OEM AOSP enrollment failure modes (LOW signal; Wave 1 plans verify against vendor docs at execute time)

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — documentation-only, no code dependencies; sibling-pattern conventions LOCKED across Phases 34-44.
- Architecture: HIGH — wave structure (D-30) LOCKED; 11-H2 admin doc skeleton (D-01) verified against 5 sibling shipped admin docs.
- Pitfalls: HIGH — derived from sibling-shipped runbooks 27/28 (multi-cause + OEM-scoped) and matrix 113-127 (anchor fill precedent from Phase 44 Plan 04).
- Per-OEM technical reference: HIGH for MS-Learn-sourced data (firmware minimums, device models, region restrictions, license tier); MEDIUM for AR/VR pattern inferences (Intune AOSP mode per OEM).
- Meta Horizon wind-down: HIGH — Meta authoritative + ManageXR corroborating; D-06 plan-time gate fully resolved.
- Wi-Fi auth types: HIGH — MS Learn enumerates explicitly; RealWear authoritative narrows further.
- Source attribution: HIGH — all primary sources verified by direct WebFetch on 2026-04-25.

**Research date:** 2026-04-25
**Valid until:** 2026-05-25 for Meta Horizon assertion (per D-10 30-day re-verify trigger); 2026-06-24 for all other content (per D-26 60-day cycle).

---

*Phase: 45-per-oem-aosp-expansion*
*Researched: 2026-04-25*
*Method: 8-source primary research (MS Learn × 5 + Meta × 1 + RealWear × 2 + ManageXR × 1) + 6 corroborating community sources + sibling-pattern code excerpts from Phases 34-44 LOCKED files*
*Adversarial-review winners (LOCKED in 45-CONTEXT.md): GA1=1B / GA2=2B / GA3=3B / GA4=4A*
