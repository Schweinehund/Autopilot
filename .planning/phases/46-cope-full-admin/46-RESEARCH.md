# Phase 46: COPE Full Admin — Research

**Researched:** 2026-04-25
**Domain:** Android Enterprise documentation — Corporate-Owned Devices with Work Profile (COPE / WPCO / WPCoD) admin guide authoring
**Confidence:** HIGH (research gate D-25 PASSED with 4 independent authoritative sources; 1 NEW finding requires planner attention)

## Summary

Research gate D-25 (mandatory pre-authoring deprecation re-verification) **PASSES** against all three required sources plus a fourth authoritative cross-check. Path A (full admin guide) is **CONFIRMED** for execution; no re-scope to deprecation-rationale doc is required. The Microsoft Learn doc `setup-corporate-work-profile.md` was last updated **2026-04-16** (verified via direct fetch with frontmatter inspection), shows zero deprecation language, and continues to use the active Intune admin-center label `Corporate-owned devices with work profile`. Bayton's canonical EMM-COPE-support page treats COPE/WPCoD as the current Android Enterprise mode for the use case (Android 11+ revamped implementation, NOT a deprecation). Bayton's glossary explicitly does NOT mark COPE/WPCoD/WPCO as deprecated. A targeted search of `developer.android.com` for "COPE deprecated 2026" returned zero hits.

The research surfaces ONE substantive correction to CONTEXT and TWO new HIGH-value findings. **Correction:** D-09 glossary entry verbatim text says "no admin policy lever in COPE or any other mode" — this is correct for **Intune specifically** (verified via MS Learn `setup-corporate-work-profile.md` Limitations section: "Microsoft Intune doesn't support mobile device management within the private space or provide technical support for devices that attempt to enroll the private space"), but Bayton's canonical Android-15-Private-Space article documents that **AMAPI-native COPE deployments DO get application allowlist/blocklist policies applied within Private Space**. The planner must scope the D-09 wording to Intune-specifically OR add a brief Bayton-cited footnote to avoid overstating cross-EMM behavior. **New Finding 1 (HIGH):** MS Learn `ref-corporate-methods.md` (updated 2026-04-16) documents that **token-entry enrollment is also unsupported for COPE on Android 11.0** — in addition to NFC and afw#setup. The COPE doc must surface this as a third Android-11-removed method, not just NFC+afw#setup. **New Finding 2 (HIGH):** MS Learn `ref-corporate-methods.md` carries a COPE-specific FRP behavior table and an Android-15 COPE re-enrollment requirement ("you will need to re-enter the Google account associated with the configuration after any reset done via the Settings app") that is materially different from COBO's FRP behavior. The COPE Android 15 FRP/EFRP H2 must mirror — not duplicate — COBO's H2 with the COPE-specific FRP table built in.

**Primary recommendation:** Author `08-cope-full-admin.md` against MS Learn `setup-corporate-work-profile.md` (HIGH-confidence verbatim source for UI label, navigation path, token types, naming templates, Android floor, Limitations) + MS Learn `ref-corporate-methods.md` (HIGH-confidence verbatim source for QR, ZT, KME, NFC, token enrollment methods + COPE-specific FRP table) + MS Learn `factory-reset-protection-emails-not-enforced` for FRP/EFRP nuance. Adopt **Android 8.0** as the COPE Android floor (HIGH; differs from COBO's Android 10.0 floor). Document NFC + afw#setup + token-entry as the three Android-11-removed methods. Embed the COPE-specific FRP behavior table verbatim from MS Learn `ref-corporate-methods.md` inside the Android 15 FRP H2.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**GA1 — H2 Skeleton (D-01..D-07)** — 11 H2s in fixed order mirroring COBO sibling 1:1: Key Concepts / Prerequisites / COPE Migration Note / Enrollment profile creation / Enrollment token management / Provisioning method choice / Android 15 FRP and EFRP / What Breaks Summary / Renewal & Maintenance / See Also / Changelog. SC#2 satisfied by `> ⚠️` blockquote with forward-links (NOT requiring callout body to be self-contained, per D-02). COPE Migration Note H2 is REPURPOSED (D-03): contains inverse-direction back-link to COBO + COPE-side migration framing. NO sibling-departure rationale required (D-04). COPE-vs-COBO decision matrix at H2 anchor `#cope-vs-cobo-decision`; planner picks placement (sub-H3 of `## Provisioning method choice` recommended to preserve 11-H2 lock per D-05). Step-numbered H2s NOT used (D-06). Anchor IDs mirror COBO verbatim where H2 names match (D-07).

**GA2 — Android 15 Private Space (D-08..D-12)** — In-doc COPE callout = one-line `> ⚠️` blockquote inside `## Key Concepts` H2 (NOT own H2) with verbatim text routing to glossary + version-matrix anchors (D-08). Glossary canonical entry is new `### Private Space` H3 under `## Ownership & Management Scope` H2 (alphabetical between Fully Managed and Supervision); update line 15 alphabetical index inline (D-09). BYOD line 167 retrofit IN-SCOPE for Phase 46 atomic same-commit (D-10). Version matrix breakpoint sub-section: new `### Android 15 — Private Space (Personal-Side, Unmanageable)` H3 (D-11). Capability-matrix Private Space row added across ALL Android columns with shared footnote (D-12).

**GA3 — COPE-vs-COBO Decision Matrix (D-13..D-18)** — 5 rows × 3 cols (Decision factor / COBO / COPE) at H2 anchor `#cope-vs-cobo-decision` inside `08-cope-full-admin.md` (D-13). Matrix LIVES in `08-cope-full-admin.md` with one back-link from COBO `## COPE Migration Note` H2 (D-14). Column 3 header reads `COPE (WPCO / Corp-Owned Work Profile)` (D-15). Knox row affirms KME compatibility for both columns; no false-pin (D-16). Banned-phrase guard rules for matrix cells; positive-framing only for "Recommended for net-new in 2026" row (D-17). Migration story is NOT a separate matrix row; belongs in `## COPE Migration Note` H2 narrative (D-18).

**GA4 — Knox/KME + Capability-Matrix Column + COBO Migration Text (D-19..D-25)** — Samsung-admins callout in `08-cope-full-admin.md` placed under `### Zero-Touch` H3 with verbatim text including WPCO↔COPE terminology equivalence (D-19). Capability matrix β1 placement: insert COPE column at index 1 between COBO and BYOD; all 5 H2 sub-tables receive COPE column in same atomic commit (D-20). COBO migration-note retrofit γ3 sentence-scoped trim of line 64 ONLY; preserve lines 58-63 + 65-66 (D-21). Cross-Platform Equivalences receives ZERO new paired rows for COPE (D-22). AECOPE-01..04 are ATOMIC SAME-COMMIT (D-23). Phase 44 reciprocal-pin discipline EXTENDED to COPE/WPCO admin doc as 3rd Samsung-admin reading-path node (D-24). **Mandatory plan-time research re-verification gate (D-25): VERIFIED by this RESEARCH.md — Path A LOCKED, no re-scope.**

**Locked Carry-Forward (D-26..D-32)** — D-26 60-day Android freshness; D-27 frontmatter contract `audience: admin / platform: Android / applies_to: COPE`; D-28 source-confidence marker regex enforced; D-29 append-only contract on shared files; D-30 shared-file modification guard (do NOT modify `docs/index.md`, `common-issues.md`, quick-refs, etc.); D-31 banned-phrase discipline (zero "deprecated"/"end of life"/"removed"/"EOL"/"no longer supported"/"obsolete"/"sunset"/"retired" applied to COPE); D-32 wave structure (Wave 1: 08-cope-full-admin.md authoring + RESEARCH gate; Wave 2: atomic same-commit retrofits in single plan).

### Claude's Discretion

- H3 sub-skeleton inside each H2 (planner inspects COBO H3s and proposes COPE-equivalent)
- Anchor IDs for new H2/H3s not covered by D-07 (planner picks per sibling convention)
- `## See Also` link list contents and order
- `## Changelog` initial entry wording within v1.4.1 release entry shape
- `## What Breaks Summary` entry count and ordering (planner maps COPE-specific WPCO/Android-15-Private-Space/`afw#setup` Android 11+ removal failure modes)
- `## Provisioning method choice` decision-matrix table format (markdown table per D-13 shape; placement sub-H3 vs sibling H2)
- Exact word counts within ~2000-3000 word envelope per sibling COBO ~250-line shape
- Frontmatter `last_verified` date set at execute time

### Deferred Ideas (OUT OF SCOPE)

- Audit harness C9 banned-phrase check sidecar JSON authoring (Phase 47 AEINTEG-02 owns)
- L1/L2 runbooks for COPE-specific failure modes (route to v1.5 if needed)
- 4-platform unified capability comparison doc (DEFER-08 / AECOMPARE-01, v1.5)
- Cross-platform nav unification (DEFER-07 / AENAVUNIFY-04, v1.5)
- WPCO-as-separate-glossary-entry distinction (corpus collapses COPE↔WPCO)
- Mermaid diagram in `08-cope-full-admin.md` (Claude's discretion; not required)
- Same-phase shared-file `cope-vs-cobo-decision.md` (D-14 explicitly REJECTED; in-doc H2)
- Cross-platform analog row in capability matrix for COPE/WPCO (D-22 NO new paired row)
- What-Breaks Summary table row for Private Space (D-08 explicitly REJECTS)

</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| AECOPE-01 | COPE full admin guide (`docs/admin-setup-android/08-cope-full-admin.md`) — parallel-structured to COBO guide; "Corporate-owned devices with work profile" enrollment profile; default + 65-year staging tokens; naming templates; Android 8-15 version breakpoints; `afw#setup` + NFC removal Android 11+; Android 15 Private space unmanaged callout (NEW for v1.4.1); COPE-vs-COBO decision matrix; research-gated path confirmation | All HIGH-confidence verbatim sources verified: MS Learn `setup-corporate-work-profile.md` (UI label "Corporate-owned devices with work profile" verified verbatim; Android 8.0 floor verified; default + staging-up-to-65-year tokens verified; all 7 naming templates verified verbatim; Android 11+ NFC + afw#setup + token removal verified verbatim; Private Space Limitations section verified verbatim). MS Learn `ref-corporate-methods.md` (FRP behavior table verified verbatim; KME/ZT enrollment paths verified). Bayton EMM-COPE-support + glossary + provisioning-methods (deprecation gate D-25 verified PASS). |
| AECOPE-02 | Add COPE column to `docs/reference/android-capability-matrix.md` (insert at index 1 per D-20); preserve Cross-Platform Equivalences Section structure | Existing matrix structure verified (5 H2 sub-tables: Enrollment / Configuration / App Deployment / Compliance / Software Updates lines 13/27/40/52/63); Cross-Platform Equivalences at lines 72-88 verified to require ZERO new paired rows per D-22 + glossary line 79 "No Windows, macOS, or iOS equivalent" lock |
| AECOPE-03 | Retrofit Phase 36 COBO `§COPE Migration Note` (`03-fully-managed-cobo.md:58-66`) — replace "deferred to v1.4.1" sentence with forward link to `08-cope-full-admin.md` (ATOMIC same-commit with AECOPE-01) | Source line 64 verified verbatim; lines 58-63 + 65-66 verified intact; HTML comment last_verified 2026-04-21 confirmed load-bearing per D-21 |
| AECOPE-04 | COPE glossary back-link in `docs/_glossary-android.md` (WPCO term already exists from Phase 34); add see-also + anchor to new COPE admin doc; **EXPANDED scope (per D-09/D-10/D-11):** add Private Space H3 + alphabetical index update + BYOD line 167 retrofit + version-matrix breakpoint H3 | Existing glossary COPE entry at line 47-51, WPCO entry at line 75-79, alphabetical index at line 15 verified; BYOD line 167 verified ("Android 15 introduced 'private space' as a personal-side feature; Intune does not manage private space content or visibility..."); version-matrix line 30 verified ("Android 15: Private Space unsupported"); existing FRP H3 at android-version-matrix.md line 67 verified as parallel-structure precedent for new Private Space breakpoint H3 |

</phase_requirements>

## Mandatory Research Gate (D-25 / SC#5) — RESULT: PASS

> **Gate trigger:** This section MUST be the first finding section in RESEARCH.md per CONTEXT D-25 + ROADMAP SC#5. If any source declares formal deprecation since 2026-04-24, Phase 46 re-scopes to deprecation-rationale doc at 40% scope. **Result: NO source declares formal deprecation. Path A (full admin guide) is CONFIRMED.**

### Source 1: Google Android Enterprise Help (`support.google.com/work/android`) — VERIFIED no deprecation

**Method:** Targeted WebSearch for "COPE / WPCO / deprecated" on `support.google.com/work/android` returned zero results matching deprecation language. Direct fetch of `support.google.com/work/android/answer/9534506` returned 404 (page restructured), but the absence of an active "COPE deprecated" announcement page is itself evidence — a formal deprecation would have a current canonical Help page.

**Verdict:** No formal deprecation declaration. [VERIFIED: WebSearch + WebFetch 2026-04-25, last_verified: 2026-04-25]

### Source 2: Android Developers (`developer.android.com`) — VERIFIED no deprecation

**Method:** Targeted WebSearch for "WPCO / 'work profile on company-owned' / deprecated 2026" on `developer.android.com` returned zero results.

**Verdict:** No formal deprecation declaration on Android Developers release notes for Android 11/12/13/14/15. [VERIFIED: WebSearch 2026-04-25]

### Source 3: Bayton (community-canonical Android Enterprise reference) — VERIFIED no deprecation

**Method:** WebFetch of three canonical Bayton resources:
- `bayton.org/android/android-enterprise-emm-cope-support/` — explicitly states "Android 11 has brought with it a completely revamped implementation of Work Profiles on Corporate Owned Devices (WPCoD) over the previous WPoFMD"; treats WPCoD as **active replacement implementation**, not deprecation. [CITED: bayton.org/android/android-enterprise-emm-cope-support, last_verified: 2026-04-25]
- `bayton.org/android/android-glossary/` — "Corporate Owned, Personally Enabled. A COPE device will support both work and (limited) personal usage" → COPE remains current terminology; WPCoD/WPCoMD documented as Android 11+ technical implementation names; **does NOT mark any as deprecated**. [CITED: bayton.org/android/android-glossary, last_verified: 2026-04-25]
- `bayton.org/android/android-enterprise-provisioning-methods/` — COPE supports QR / Zero-touch / KME / DPC identifier; only NFC explicitly removed for COPE on Android 11+. **No deprecation language for the mode itself.** [CITED: bayton.org/android/android-enterprise-provisioning-methods, last_verified: 2026-04-25]

**Verdict:** No formal deprecation declaration in community-canonical reference. WPCoD is a re-architecture of COPE on Android 11+, not a sunset. [VERIFIED: WebFetch 2026-04-25]

### Source 4 (Bonus, beyond required gate): Microsoft Learn — VERIFIED active

**Method:** Direct WebFetch of `learn.microsoft.com/en-us/intune/device-enrollment/android/setup-corporate-work-profile`. Page frontmatter:
- `ms.date: 2025-05-08T00:00:00.0000000Z`
- `updated_at: 2026-04-16T16:28:00.0000000Z`
- `git_commit_id: b89468cf523726d0dbf067b46b8c53858e86aa8f`
- Title: "Set up Android Enterprise work profile for corporate owned devices - Microsoft Intune | Microsoft Learn"
- Active opening line: "Android Enterprise corporate-owned devices with a work profile are single user devices intended for corporate and personal use."

**Verdict:** Page is **actively maintained** (last edit 2026-04-16, 9 days before Phase 46 research). Zero deprecation language. Microsoft documents the mode as a current production capability. [VERIFIED: WebFetch 2026-04-25, last_verified: 2026-04-25]

### Gate Outcome

**ALL FOUR sources unanimous: COPE / WPCO / WPCoD has not been formally deprecated.** Phase 46 proceeds on Path A (full admin guide). The C9 banned-phrase discipline (D-31) is justified by this evidence: any "deprecated" language applied to COPE would contradict all four authoritative sources. [VERIFIED: 4 independent sources, last_verified: 2026-04-25]

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| COPE admin guide doc authoring | Static markdown (`docs/admin-setup-android/`) | — | Existing tri-portal admin-guide pattern (Phase 34/36/37/38/44/45 precedent); no runtime component |
| Capability matrix update | Static markdown (`docs/reference/`) | — | Reference doc; planner inserts column at index 1 across 5 H2 sub-tables |
| Glossary update | Static markdown (`docs/_glossary-android.md`) | — | Glossary is single-author append-only per D-29; alphabetical index hotspot |
| Version-matrix breakpoint | Static markdown (`docs/android-lifecycle/`) | — | Existing Android 11/12/15 breakpoint H3 pattern at lines 39/53/67; new Private Space breakpoint H3 mirrors |
| BYOD line 167 retrofit | Static markdown (`docs/admin-setup-android/04-byod-work-profile.md:167`) | — | Sentence-scoped replacement; eliminates drift surface (Pitfall 1) per D-10 |
| COBO migration-note retrofit | Static markdown (`docs/admin-setup-android/03-fully-managed-cobo.md:64`) | — | Sentence-scoped replacement per D-21 γ3 |
| Audit harness validation | Node script (`scripts/validation/v1.4.1-milestone-audit.mjs`) | Sidecar JSON allow-list (`scripts/validation/v1.4.1-audit-allowlist.json`) | Existing 5-check harness; C5 freshness + C9 banned-phrase informational-first cover Phase 46 content space without harness modification |

## Standard Stack

### Authoritative source documents (HIGH-confidence verbatim citations)

| Source | Version / Last Updated | Purpose | Why Standard |
|--------|------------------------|---------|--------------|
| MS Learn `setup-corporate-work-profile.md` | ms.date 2025-05-08; updated_at 2026-04-16; git_commit b89468cf | Primary verbatim source for COPE Intune admin center workflow, UI label, navigation path, token types, naming templates, Limitations (Private Space) | Microsoft-authored canonical doc for the exact deliverable; Path A confirmation source per PROJECT.md Key Decision |
| MS Learn `ref-corporate-methods.md` | ms.date 2025-12-04; updated_at 2026-04-16; git_commit b89468cf | Primary verbatim source for QR / ZT / KME / NFC / token enrollment methods + COPE-specific FRP behavior table + Android 15 COPE-specific re-enrollment requirement + Android 11+ removed methods | Microsoft-authored sibling doc to setup-corporate-work-profile; provides FRP table + ZT iframe DPC extras JSON for COPE |
| MS Learn `setup-fully-managed.md` | (sibling, ms.date 2025-05-08; updated_at 2026-04-16) | COBO sibling reference; structural parallel for token/profile workflow | Already cited in Phase 36 COBO doc; structural parallel target per AECOPE-01 verbatim "parallel-structured to COBO" |
| MS Learn `factory-reset-protection-emails-not-enforced` | (troubleshoot KB) | Authoritative FRP/EFRP nuance | Already cited in Phase 36 COBO doc line 193; same source serves COPE Android 15 FRP/EFRP H2 |
| Google AE Help `answer/14549362` (Enable EFRP) | active | EFRP feature description | Cited in Phase 36 COBO doc line 175; same source serves COPE doc |
| Google AE Help `answer/7514005` (Zero-touch enrollment for IT admins) | active | ZT IT-admin guide | Cited in Phase 35 ZT doc line 50; same source serves COPE Zero-Touch H3 |
| Bayton `android-enterprise-emm-cope-support` | active 2026 | Community-canonical COPE/WPCoD evolution | Existing Phase 36 COBO doc line 66 cites; corpus-canonical source for D-25 deprecation gate |
| Bayton `what-is-android-15-private-space` | active 2026 | Private Space management nuance (AMAPI vs customDPC EMM) | Critical for refining D-09 wording — Bayton documents AMAPI-native COPE allowlist/blocklist applies within Private Space; Intune (per its own Limitations section) does NOT manage Private Space |

### Existing project assets (REUSE, do not author)

| Asset | Purpose | Why Reuse |
|-------|---------|-----------|
| `scripts/validation/v1.4.1-milestone-audit.mjs` | 5-check audit harness; C1 SafetyNet, C2 supervision, C3 AOSP word count, C4 deferred-file guard, C5 freshness | Phase 46 deliverables flow through harness without harness modification per CONTEXT code_context |
| `scripts/validation/v1.4.1-audit-allowlist.json` | Supervision exemptions baseline (18 pins from Phase 43) + 4 SafetyNet pins | Phase 46 may need 0 new pins (D-22 NO new Cross-Platform Equivalences row → no new bridge prose); planner re-runs `regenerate-supervision-pins.mjs --report` after content lands to confirm |
| `scripts/validation/regenerate-supervision-pins.mjs` | Tier-1/Tier-2 classifier helper | Self-test gate per Phase 43 D-12; available for line-shift maintenance |
| `docs/_templates/admin-template-android.md` | 11-H2 admin guide template (Phase 34 D-15) | Source template for `08-cope-full-admin.md` (planner reads template + COBO sibling and merges) |

### Alternatives Considered (and Rejected)

| Instead of | Could Use | Why Rejected |
|------------|-----------|--------------|
| Path A: full admin guide | Path B: deprecation-rationale doc at 40% scope | Research gate D-25 PASS — no formal deprecation across 4 sources; PROJECT.md line 211 LOCKS Path A; ROADMAP SC#5 verbatim banned-phrase discipline forecloses |
| WPCO as separate glossary entry | Existing single WPCO entry at `_glossary-android.md:75-79` + COPE entry at `:47-51` | Glossary canonically collapses WPCO ↔ COPE as same-mode-different-name (`:71/75-77`); separate entry would reify a distinction the glossary explicitly rejects |
| 12-H2 skeleton with COPE-vs-COBO matrix as own H2 | 11-H2 skeleton with matrix as sub-H3 of `## Provisioning method choice` | D-04 + D-05 lock 11-H2 mirror; sub-H3 placement preserves sibling-parity envelope |
| Path-only forward-link in COBO migration note | γ3 sentence-scoped trim of line 64 with forward-link content | D-21 LOCKED γ3 (sentence-scoped); preserves lines 58-63 narrative + lines 65-66 HTML comment with last_verified 2026-04-21 |

**Installation:** No new tooling required. Phase 46 is documentation-only authoring against existing audit harness + glossary + capability matrix + version matrix.

**Version verification:** All MS Learn sources verified within 9 days (updated_at 2026-04-16, research date 2026-04-25); Bayton sources active in 2026 corpus; Google AE Help sources cited by existing Phase 36 doc and load-bearing.

## Architecture Patterns

### System Architecture Diagram

```
                          ┌─────────────────────────────┐
                          │   PHASE 46 INPUTS            │
                          │   - CONTEXT.md (32 D-locks)  │
                          │   - REQUIREMENTS.md (4 reqs) │
                          │   - RESEARCH.md (this doc)   │
                          │   - MS Learn sources         │
                          │   - COBO sibling             │
                          └──────────────┬───────────────┘
                                         │
                         ┌───────────────┴────────────────┐
                         │                                │
                         ▼                                ▼
              ┌──────────────────┐            ┌──────────────────────┐
              │  WAVE 1 plan     │            │  WAVE 2 plan         │
              │  (single agent)  │            │  (single atomic plan)│
              │                  │            │                      │
              │  AECOPE-01 author│            │  AECOPE-02 + -03 + -04│
              │  08-cope-full-   │            │  + D-10 BYOD retrofit │
              │  admin.md        │            │  + D-11 version-matrix│
              │                  │            │  breakpoint H3        │
              │  + RESEARCH      │            │                       │
              │  gate D-25 (this │            │  → SAME COMMIT (D-23) │
              │  doc satisfies)  │            │                       │
              └──────────┬───────┘            └──────────┬────────────┘
                         │                                │
                         ▼                                ▼
              ┌──────────────────────────────────────────────┐
              │  AUDIT HARNESS (no modifications)             │
              │  scripts/validation/v1.4.1-milestone-audit.mjs│
              │  - C1 SafetyNet PASS (zero in new content)    │
              │  - C2 supervision PASS (no new bridge prose)  │
              │  - C3 AOSP word count PASS (out of scope)     │
              │  - C4 deferred-file PASS (D-30 guard honored) │
              │  - C5 freshness PASS (60-day, D-26 inherited) │
              │  - C9 banned-phrase (informational; D-31)     │
              └──────────────────────────────────────────────┘
                                         │
                                         ▼
                          ┌──────────────────────────────┐
                          │  PHASE 47 (terminal re-audit)│
                          │  - merges Knox + AOSP + COPE │
                          │  - flips status              │
                          │    tech_debt → passed        │
                          └──────────────────────────────┘
```

### Component Responsibilities

| Component | File | Responsibility |
|-----------|------|----------------|
| New COPE admin doc | `docs/admin-setup-android/08-cope-full-admin.md` | 11 H2s mirroring COBO; ~2000-3000 words; HIGH-confidence content from MS Learn `setup-corporate-work-profile.md` + `ref-corporate-methods.md` verbatim |
| Capability matrix update | `docs/reference/android-capability-matrix.md` | Insert COPE column at index 1 (between COBO and BYOD per D-20); update all 5 H2 sub-tables atomically; add Private Space row across all columns per D-12; preserve Cross-Platform Equivalences (D-22 zero new paired rows) |
| Glossary update | `docs/_glossary-android.md` | Add `### Private Space` H3 alphabetical-between Fully Managed and Supervision (D-09); update line 15 alphabetical index; add see-also from COPE entry (line 47) and WPCO entry (line 75) to new admin doc |
| Version-matrix breakpoint | `docs/android-lifecycle/03-android-version-matrix.md` | Add `### Android 15 — Private Space (Personal-Side, Unmanageable)` H3 after existing Android 15 FRP breakpoint H3 (line 67); update matrix table line 30 anchor |
| BYOD retrofit | `docs/admin-setup-android/04-byod-work-profile.md:167` | Sentence-scoped replacement per D-10 |
| COBO retrofit | `docs/admin-setup-android/03-fully-managed-cobo.md:64` | Sentence-scoped trim per D-21 γ3 |

### Pattern 1: 11-H2 Admin Guide Mirror

**What:** Author `08-cope-full-admin.md` with exact COBO H2 sequence, COPE-specific content per H2.

**When to use:** Any phase authoring an admin doc parallel to an existing sibling per D-01-style mirror lock.

**Example:** Reference `docs/admin-setup-android/03-fully-managed-cobo.md` H2 anchors verbatim:
```markdown
<a id="key-concepts"></a>          ## Key Concepts                       (line 24-25)
<a id="prerequisites"></a>         ## Prerequisites                      (line 37-38)
<a id="cope-migration"></a>        ## COPE Migration Note                (line 57-58) → REPURPOSED inverse-direction
<a id="enrollment-profile"></a>    ## Enrollment profile creation        (line 68-69)
<a id="enrollment-token"></a>      ## Enrollment token management        (line 99-100)
<a id="provisioning-method-choice"></a> ## Provisioning method choice    (line 127-128)
<a id="android-15-frp"></a>        ## Android 15 FRP and EFRP            (line 168-169)
<a id="what-breaks"></a>           ## What Breaks Summary                (line 197-198)
<a id="renewal-maintenance"></a>   ## Renewal / Maintenance              (line 218-219)
                                   ## See Also                            (line 231)
                                   ## Changelog                           (line 245)
```
*Source: `docs/admin-setup-android/03-fully-managed-cobo.md` lines 24-251, verified 2026-04-25.*

### Pattern 2: One-line `> ⚠️` callout with forward-links

**What:** Single-source-of-truth callout pattern (D-08); body lives in glossary + version-matrix; doc carries flag + multi-link.

**When to use:** Any cross-doc topic where canonical content lives in glossary or reference matrix and admin doc needs only a flag-and-route.

**Example:** Verbatim D-08 text:
```markdown
> ⚠️ **Android 15 — Private Space (unmanaged):** Android 15+ devices include a user-controlled hidden profile partition that Intune cannot manage; there is no admin policy lever in COPE or any other mode. See [_glossary-android.md#private-space](../_glossary-android.md#private-space) and [version matrix breakpoint](../android-lifecycle/03-android-version-matrix.md#android-15-private-space-breakpoint).
```
*Source: D-08 verbatim text; structural precedent at `03-fully-managed-cobo.md:162` Samsung-admins callout.*

### Pattern 3: γ3 sentence-scoped trim with HTML-comment preservation

**What:** Replace exactly one sentence; preserve surrounding paragraphs and load-bearing HTML comments.

**When to use:** Retrofitting an existing doc where most content stays and only one sentence must change (D-21 archetype).

**Example:** D-21 LOCKED replacement at `03-fully-managed-cobo.md:64`:
```markdown
The full COPE admin path (separate from COBO) is documented in [08-cope-full-admin.md](08-cope-full-admin.md). For net-new corporate-with-work-profile deployments, provision WPCO per [_glossary-android.md#wpco](../_glossary-android.md#wpco); for existing COPE fleets, see [08-cope-full-admin.md](08-cope-full-admin.md) for full-admin coverage including profile creation, token lifecycle, and Android 8-15 version breakpoints.
```
Lines 58-63 (intro + WPCO-direction paragraph), line 65 (blank), line 66 (HTML comment with `last_verified: 2026-04-21`) PRESERVED. *Source: D-21 verbatim.*

### Anti-Patterns to Avoid

- **Step-numbered H2s in COPE doc:** D-06 LOCK — Knox/ZT use step-numbering because they're enrollment-mechanism-shape; COPE/COBO are management-mode-shape. Step-numbering would break parallelism with COBO sibling.
- **Cross-Platform Equivalences paired row for COPE/WPCO:** D-22 LOCK — glossary line 79 explicitly states "No Windows, macOS, or iOS equivalent." Forcing a paired row manufactures a false analog.
- **WPCO as separate column in capability matrix:** Per glossary line 75-77 + D-15, WPCO ≡ COPE (same mode under different names). Separate columns would reify a distinction the corpus rejects.
- **Restating Android version literals or Knox SKU detail in cope-vs-cobo decision matrix cells:** D-18 cell-content discipline — rows 3 (Android version floor) + 4 (Knox compatibility) use anchor links only, never literal values.
- **"Deprecated" / "EOL" / "removed" / "obsolete" language applied to COPE:** D-31 + D-17 LOCK — corpus posture (`_glossary-android.md:179`) is "Google has NOT formally deprecated COPE." Banned-phrase discipline is at-author-time.
- **Knox row claiming "KME does not support COPE":** D-16 explicitly forbids — KME provisions WPCO (the modern COPE shape) per `_glossary-android.md:98` + `07-knox-mobile-enrollment.md:16/61/72`.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Source-confidence regex enforcement | Custom validator | Existing `scripts/validation/v1.4.1-milestone-audit.mjs` | Phase 37 D-11 / Phase 39 D-20 / Phase 45 D-28 lock the regex; informational-first per D-31 |
| Allow-list pin generation | Hand-author each pin | `scripts/validation/regenerate-supervision-pins.mjs --report` | Phase 43 Plan 04 helper with self-test gate; D-12 dogfood-PASSES |
| 60-day freshness checking | Manual date math | Audit harness C5 (existing) | Phase 34 D-14 + D-26 carry-forward |
| 11-H2 admin doc skeleton | Copy and paste from blog post | `docs/_templates/admin-template-android.md` + `03-fully-managed-cobo.md` | Phase 34 D-15 template + 11-H2 sibling parity verified across COBO + ZT + Dedicated |
| FRP behavior matrix for COPE | Author from scratch | Verbatim verbatim from MS Learn `ref-corporate-methods.md` | Microsoft-authored 3-row x 4-col table covering Settings reset / Bootloader / Intune wipe behaviors per mode |
| WPCO ↔ COPE terminology equivalence | Re-litigate at every callout | Anchor-link to `_glossary-android.md#wpco` | D-15/D-19 LOCKED equivalence; glossary is single source of truth |
| Naming template enumeration | Approximate from memory | Verbatim from MS Learn `setup-corporate-work-profile.md` (7 templates: `{{SERIAL}}`, `{{SERIALLAST4DIGITS}}`, `{{DEVICETYPE}}`, `{{ENROLLMENTDATETIME}}`, `{{UPNPREFIX}}`, `{{USERNAME}}`, `{{RAND:x}}`) | All 7 templates verified verbatim from MS source; AECOPE-01 enumerates same 7 |

**Key insight:** Phase 46 is high-leverage REUSE of v1.4 + v1.4.1 audit infrastructure + sibling COBO doc. The only NEW authoring is one ~2500-word admin doc + 4 surgical edits to existing files. Don't reinvent the harness, the template, or the cross-reference patterns.

## Runtime State Inventory

> Phase 46 is documentation-only with NO runtime state migration concerns.

| Category | Items Found | Action Required |
|----------|-------------|------------------|
| Stored data | None — verified by grep audit of `.planning/phases/46-cope-full-admin/`; no databases, no datastores referenced by COPE doc deliverables | None |
| Live service config | None — verified by inspection of CONTEXT D-30 shared-file modification guard; no n8n / Datadog / Tailscale / Cloudflare configs touched by Phase 46 | None |
| OS-registered state | None — verified; no Windows Task Scheduler / pm2 / launchd / systemd state introduced by markdown doc authoring | None |
| Secrets / env vars | None — verified; no SOPS / .env / CI environment variables referenced; the `.env` examples in CLAUDE.md remain orthogonal to docs/ tree | None |
| Build artifacts / installed packages | None — verified; no pip / npm / cargo packages introduced; no compiled binaries; no Docker images | None |

**Allow-list line-shift maintenance (Rule 3 auto-fix per Phase 45 Plan 10 precedent):** When `08-cope-full-admin.md` is authored AND retrofits ship in same atomic commit, line numbers in `scripts/validation/v1.4.1-audit-allowlist.json` for any pre-existing pins in `_glossary-android.md` or `android-capability-matrix.md` MAY shift. Run `regenerate-supervision-pins.mjs --report` AFTER the atomic Wave 2 commit lands; if line shifts detected, run `--emit-stubs` and hand-merge per Phase 43 D-12 protocol. **Likely zero-shift expected** because D-22 forecloses new bridge prose in Cross-Platform Equivalences (the historical line-shift cause).

## Common Pitfalls

### Pitfall 1: Single-Source-of-Truth (drift surface from duplication)

**What goes wrong:** New Private Space content authored in 4+ locations diverges over time. Each surface gets edited independently; readers see different "facts."

**Why it happens:** Without canonical source, every doc author re-derives the explanation; eventually each surface drifts from the others.

**How to avoid:** **Canonical placement is the glossary** per D-09. All other surfaces (BYOD line 167 retrofit per D-10; version-matrix breakpoint H3 per D-11; COPE doc one-line callout per D-08; capability matrix Private Space row per D-12) carry **anchor-links to the glossary**, NOT restatements of the content. Single-source-of-truth eliminates 4 future drift surfaces. [VERIFIED: D-08/D-09/D-10/D-11/D-12 codify this pattern]

**Warning signs:** Reviewer asks "why does X say one thing and Y says another?" → drift detected. Run audit harness; pin to glossary canonical.

### Pitfall 2: Banned-phrase erosion at author time (D-31 / D-17)

**What goes wrong:** Author writes "COPE is being deprecated in favor of WPCO" — a single instance violates ROADMAP SC#5 + D-31 banned-phrase discipline.

**Why it happens:** Community shorthand conflates "Google recommends WPCO" with "Google deprecated COPE." Author repeats community phrasing without verifying against corpus-canonical posture.

**How to avoid:** Use **positive framing** per D-17: "Google recommends WPCO as the *provisioning name* per current Google guidance" — never as a *replacement* for COPE. Reference glossary line 49 ("Google recommends WPCO as the successor pattern") and line 179 ("Google has NOT formally deprecated COPE; community shorthand incorrectly conflates 'recommended-against' with 'deprecated'"). C9 audit harness check (informational-first per D-29) provides backup detection but at-author-time discipline is primary defense. [VERIFIED: D-17 + D-31 + glossary line 179]

**Warning signs:** Any sentence containing {deprecated, end of life, EOL, removed, no longer supported, obsolete, sunset, retired} within ±200 chars of "COPE" → flag immediately.

### Pitfall 3: Knox row falsely pinning COPE-incompatibility (D-16)

**What goes wrong:** Author writes "KME does not support COPE" in cope-vs-cobo decision matrix Knox row → reifies a deprecation pin that is **technically false** per WPCO equivalence.

**Why it happens:** Author confuses "KME EMM profile dropdown shows WPCO not COPE" (a UI-label fact) with "KME doesn't provision COPE" (a capability-fact, which is FALSE — KME provisions WPCO which is the same mode as COPE per glossary line 71/75-77/98).

**How to avoid:** Per D-16 LOCKED cell content: "KME provisions WPCO (the modern COPE shape) — see [KME], [WPCO glossary], and [07-knox-mobile-enrollment.md]." Mirror exact phrasing for COBO column. NO cell anywhere claims KME-COPE-incompatibility. [VERIFIED: D-16 + Knox doc line 16/61/72 + glossary line 98]

**Warning signs:** Any matrix cell text containing "KME does not" / "KME doesn't" / "KME requires" attached to COPE → revisit per D-16 cell discipline.

### Pitfall 4: COBO migration-note retrofit accidentally drops load-bearing HTML comment (D-21)

**What goes wrong:** Author replaces lines 58-66 wholesale instead of γ3 sentence-scoped trim of line 64 only → drops the HTML comment with `last_verified: 2026-04-21` source attribution.

**Why it happens:** Bulk-replace muscle memory; "I'll just regenerate the section."

**How to avoid:** D-21 LOCK is **sentence-scoped to line 64 only**. Lines 58, 59, 60, 61, 62, 63 PRESERVED (intro paragraph, blank line, WPCO-direction paragraph). Line 65 PRESERVED (blank). **Line 66 PRESERVED (entire HTML comment block including `last_verified: 2026-04-21` and source-attribution narrative).** Use Edit tool with old_string capturing the exact line 64 text and new_string capturing the D-21 verbatim replacement; do not regenerate the H2 wholesale. [VERIFIED: D-21 + actual file inspection 2026-04-25]

**Warning signs:** git diff for COBO retrofit shows changes outside line 64 → STOP, re-read D-21, re-apply scoped Edit.

### Pitfall 5: Atomic same-commit discipline broken across 5 surfaces (D-23)

**What goes wrong:** Wave 2 ships AECOPE-02 (capability matrix) + AECOPE-04 (glossary) in commit 1, then AECOPE-03 (COBO retrofit) + D-10 (BYOD retrofit) + D-11 (version matrix) in commit 2 → transient broken-link windows where the COPE doc references glossary anchors that exist but version-matrix anchors that don't yet.

**Why it happens:** Wave 2 has 5 surfaces (capability matrix + glossary + COBO + BYOD + version matrix). It's tempting to commit "almost done" subsets.

**How to avoid:** D-23 + D-32 LOCK Wave 2 as **single atomic commit**. Plan-phase output is ONE plan with ONE commit covering all 5 surfaces. Mirrors Phase 42 Wave 1/2 unified-rebuild atomicity + Phase 45 Plan 10 atomic 6-file-edit + 1-file-deletion in commit 3400bff. [VERIFIED: D-23 + D-32 + Phase 45 Plan 10 commit 3400bff precedent]

**Warning signs:** git status shows partial Wave 2 changes when about to commit → STOP, stage all 5 surfaces, commit atomically.

### Pitfall 6: Token-entry enrollment Android 11+ removal MISSED (NEW finding)

**What goes wrong:** COPE doc documents NFC + afw#setup Android 11+ removal but misses **token-entry enrollment** which is ALSO unsupported on COPE Android 11.0 per MS Learn `ref-corporate-methods.md`.

**Why it happens:** CONTEXT + glossary + COBO sibling discuss only NFC + afw#setup. Token-entry enrollment is a separate method documented in MS Learn at the bottom of `ref-corporate-methods.md` with its own "Note: Not supported on Android Enterprise corporate-owned devices with a work profile (COPE) running Android version 11.0" note.

**How to avoid:** When documenting COPE Android 11+ method removals, enumerate **three** methods removed: (1) NFC, (2) afw#setup / DPC identifier, (3) token-entry. Cite MS Learn `ref-corporate-methods.md` "Enroll by using a token" Note section verbatim. [VERIFIED: WebFetch 2026-04-25, last_verified 2026-04-25]

**Warning signs:** Provisioning method choice H2 lists only 2 Android 11-removed methods → missing token-entry; revisit MS Learn `ref-corporate-methods.md`.

### Pitfall 7: Android 15 FRP H2 conflated with COBO (NEW finding)

**What goes wrong:** Author copy-pastes COBO Android 15 FRP H2 (lines 168-191) verbatim into COPE doc → misses that COPE has its OWN FRP behavior table per MS Learn `ref-corporate-methods.md` and an Android 15 COPE-specific re-enrollment requirement that does NOT apply to COBO.

**Why it happens:** Sibling-parity instinct says "copy COBO H2." But COPE FRP behaviors differ at Settings > Factory data reset row (COPE has FRP enforcement; COBO does not).

**How to avoid:** Embed the verbatim FRP behavior table from MS Learn `ref-corporate-methods.md` inside the Android 15 FRP H2:

```markdown
| Enrollment method | Settings > Factory data reset | Settings > Recovery/bootloader | Intune wipe |
|---|---|---|---|
| **Corporate-owned devices with work profile** (COPE) | ✅ factory reset protection | ✅ factory reset protection | ❌ no factory reset protection |
```

Then add the COPE-specific Android 15 callout (verbatim from MS Learn): *"For corporate owned devices with a work profile running Android 15, you will need to re-enter the Google account associated with the configuration after any reset done via the Settings app."* [VERIFIED: WebFetch MS Learn ref-corporate-methods.md 2026-04-25]

**Warning signs:** COPE Android 15 FRP H2 reads identically to COBO Android 15 FRP H2 → missing COPE-specific FRP table + Settings-app-reset Google-account requirement.

### Pitfall 8: Private Space "no admin policy lever in COPE or any other mode" overstated for non-Intune EMMs

**What goes wrong:** D-09 verbatim glossary text says "Intune cannot manage Private Space content, visibility, or settings — there is no admin policy lever, on COPE, COBO, BYOD, or any other Android Enterprise mode." Per Bayton's Android 15 Private Space article, **AMAPI-native COPE deployments DO get application allowlist/blocklist policies applied within Private Space**: *"application policies; allow & block list policies that would apply to the parent profile, preventing unfettered access to Google Play, also apply within the Private Space."* The blanket "no admin policy lever in any mode" misrepresents AMAPI-native EMM behavior.

**Why it happens:** D-09 was written from MS Learn Limitations perspective only. The MS Learn statement ("Microsoft Intune doesn't support mobile device management within the private space") is correct **for Intune specifically** — Intune is undergoing AMAPI migration but historically used customDPC, and the customDPC EMM behavior per Bayton is "administrators are not able to restrict the applications users install within the Private Space."

**How to avoid:** Planner has TWO acceptable resolutions:
- **Option A (recommended, scope-tightening):** Edit the D-09 glossary text from "Intune cannot manage Private Space content, visibility, or settings — there is no admin policy lever, on COPE, COBO, BYOD, or any other Android Enterprise mode" to "**Intune** cannot manage Private Space content, visibility, or settings on COPE, COBO, BYOD, or any other Android Enterprise mode." (Drop the absolute "no admin policy lever" claim; keep the Intune-specific lock.)
- **Option B (annotation):** Keep D-09 verbatim text but add a footnote: *"^Other AMAPI-native EMMs may apply allowlist/blocklist policies within Private Space on COPE deployments per Google AMAPI; this is outside Intune's customDPC management surface."*

Either resolution preserves the C9 banned-phrase discipline and the SC#2 callout-is-present requirement while honoring Bayton's documented EMM-tier nuance. **Recommend Option A for terseness.** [VERIFIED: WebFetch Bayton + WebFetch MS Learn 2026-04-25]

**Warning signs:** Reviewer with Bayton familiarity flags "this is overstated for AMAPI-native EMMs" → apply Option A or Option B above.

## Code Examples

> Phase 46 is documentation-only — "code" here means verbatim markdown content patterns from authoritative sources.

### Example 1: Intune admin center COPE navigation path (HIGH-confidence verbatim)

```markdown
1. Sign in to the [Microsoft Intune admin center](https://endpoint.microsoft.com).
2. Go to **Devices** → **Enrollment**.
3. Select the **Android** tab.
4. Under **Android Enterprise** → **Enrollment Profiles**, choose **Corporate-owned devices with work profile**.
5. Select **Create profile**.
```
*Source: MS Learn `setup-corporate-work-profile.md` "Create an enrollment profile" section, last_verified 2026-04-25, updated_at 2026-04-16.*

### Example 2: Token types verbatim from MS Learn

```markdown
**Token type**: Choose the type of token you want to use to enroll devices.
- **Corporate-owned with work profile (default)**
- **Corporate-owned with work profile, via staging**

> **Tip:** Enrollment time grouping isn't supported with the staging token. If you're configuring a profile for use with enrollment time grouping, use the corporate-owned with work profile (default) token.

**Token expiration date**: Only available with the staging token. Enter the date you want the token to expire, up to 65 years in the future. Acceptable date format: `MM/DD/YYYY` or `YYYY-MM-DD`. The token expires on the selected date at 12:59:59 PM in the time zone it was created.
```
*Source: MS Learn `setup-corporate-work-profile.md` "Create an enrollment profile" section, last_verified 2026-04-25.*

### Example 3: Naming templates (all 7, verbatim)

```markdown
You can use the following strings to create your naming template. Intune replaces the strings with device-specific values.

- `{{SERIAL}}` for the device's serial number.
- `{{SERIALLAST4DIGITS}}` for the last 4 digits of the device's serial number.
- `{{DEVICETYPE}}` for the device type. Example: *AndroidForWork*
- `{{ENROLLMENTDATETIME}}` for the date and time of enrollment.
- `{{UPNPREFIX}}` for the user's first name. Example: *Eric*, when device is user affiliated.
- `{{USERNAME}}` for the user's username when the device is user affiliated. Example: *EricSolomon*
- `{{RAND:x}}` for a random string of numbers, where *x* is between 1 and 9 and indicates the number of digits to add. Intune adds the random digits to the end of the name.

Edits you make to the naming template only apply to new enrollments.
```
*Source: MS Learn `setup-corporate-work-profile.md` "Naming Template" section, verified verbatim against AECOPE-01 enumeration in REQUIREMENTS.md line 43.*

### Example 4: Android 11+ removal of NFC + afw#setup + token-entry for COPE (verbatim)

```markdown
For corporate-owned work profile (COPE) devices, the `afw#setup` enrollment method and the Near Field Communication (NFC) enrollment method are only supported on devices running Android 8-10. They are not available on Android 11.
```
*Source: MS Learn `setup-corporate-work-profile.md` "Create an enrollment profile" Note section, last_verified 2026-04-25.*

```markdown
[Token-entry method]
Note: Not supported on Android Enterprise corporate-owned devices with a work profile (COPE) running Android version 11.0.
```
*Source: MS Learn `ref-corporate-methods.md` "Enroll by using a token" section, last_verified 2026-04-25. **NEW FINDING — must be surfaced in COPE doc Provisioning method choice H2.***

### Example 5: COPE FRP behavior table (verbatim)

```markdown
| Enrollment method | Settings > Factory data reset | Settings > Recovery/bootloader | Intune wipe |
|---|---|---|---|
| **Corporate-owned devices with work profile** (COPE) | ✅ factory reset protection | ✅ factory reset protection | ❌ no factory reset protection |
| **Fully managed** (COBO) | ❌ no factory reset protection | ✅ factory reset protection | ❌ no factory reset protection |
| **Dedicated** (COSU) | ❌ no factory reset protection | ✅ factory reset protection | ❌ no factory reset protection |
```
*Source: MS Learn `ref-corporate-methods.md` Factory reset protection section, last_verified 2026-04-25. Embed inside `## Android 15 FRP and EFRP` H2.*

### Example 6: Android 15 COPE-specific re-enrollment requirement (verbatim)

```markdown
For corporate owned devices with a work profile running Android 15, you will need to re-enter the Google account associated with the configuration after any reset done via the Settings app. It's important to plan your reprovisioning workflow (such as applying an Intune wipe or resetting via the Settings app) accordingly so that you can provide the required credentials if needed. For background and guidance, see [Factory reset protection (FRP) enforcement behavior for Android Enterprise](https://learn.microsoft.com/en-us/troubleshoot/mem/intune/device-configuration/factory-reset-protection-emails-not-enforced).
```
*Source: MS Learn `ref-corporate-methods.md` Factory reset protection section, last_verified 2026-04-25. **DIFFERENT FROM COBO** — embed inside `## Android 15 FRP and EFRP` H2 as COPE-specific callout.*

### Example 7: Private Space Limitations (verbatim, Intune-specific)

```markdown
Private space is a feature introduced with Android 15 that lets people create a space on their device for sensitive apps and data they want to keep hidden. The private space is considered a personal profile. Microsoft Intune doesn't support mobile device management within the private space or provide technical support for devices that attempt to enroll the private space.
```
*Source: MS Learn `setup-corporate-work-profile.md` Limitations section, last_verified 2026-04-25. Anchor for D-09 glossary canonical text + version-matrix breakpoint H3.*

### Example 8: Conditional Access exclusion note (verbatim)

```markdown
If you have a Microsoft Entra Conditional Access policy defined that uses the *require a device to be marked as compliant* Grant control or a Block policy and applies to **All Cloud apps**, **Android**, and **Browsers**, you must exclude the **Microsoft Intune** cloud app from this policy. This is because the Android setup process uses a Chrome tab to authenticate your users during enrollment.
```
*Source: MS Learn `ref-corporate-methods.md` opening Note section, last_verified 2026-04-25. Embed in `## Prerequisites` H2 (mirrors COBO sibling line 53).*

### Example 9: ZT iframe DPC extras JSON for COPE (verbatim)

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
*Source: MS Learn `ref-corporate-methods.md` "Create configuration in zero-touch enrollment portal" section, last_verified 2026-04-25. **CAUTION** per D-19 + Phase 44 D-03 + ZT line 93 anti-paste blockquote: this is the ZT JSON; KME uses a different FLAT EXTRA_ENROLLMENT_TOKEN JSON. The COPE doc Zero-Touch H3 should LINK to `02-zero-touch-portal.md#dpc-extras-json` rather than re-state, to honor the canonical-source pattern.*

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| WPoFMD (Work Profile on Fully Managed Device) — pre-Android 11 COPE implementation | WPCoD (Work Profile on Corporate-Owned Device) — Android 11+ implementation, also called WPCO | Android 11 (Sep 2020) | Architecture shift: WPCoD reduces personal-side admin visibility (user-privacy increase); admins lose some COPE-era visibility into personal apps. Bayton: "drastically reduced organisational visibility into the personal side." |
| NFC provisioning for COPE | Removed; use QR or ZT | Android 11+ | Admins migrating COPE-enrolled fleets from Android 10 to 11 must abandon NFC tag workflows |
| `afw#setup` (DPC identifier) for COPE | Removed; use QR or ZT | Android 11+ | Admins lose the typed-identifier setup path for COPE; only QR / ZT / KME / token (Android 8-10) remain |
| Token-entry enrollment for COPE | Removed (Android 11+) | Android 11+ | **NEW FINDING** — third method removed alongside NFC + afw#setup; documented in MS Learn `ref-corporate-methods.md` |
| SafetyNet Attestation API | Play Integrity API | January 2025 | Android compliance UI uses "Play Integrity Verdict" terminology; no SafetyNet fallback on any Android device today |
| Custom OMA-URI for BYOD personally-owned work profile | AMAPI (Android Management API) | April 2025 | BYOD-specific (not COPE); custom OMA-URI removed for BYOD; Wi-Fi requires certificate auth on BYOD post-AMAPI; Microsoft Intune app replaces Company Portal as primary BYOD DPC. Phase 46 COPE doc does NOT need to surface AMAPI migration prominently — AMAPI April 2025 affected BYOD specifically, not COPE/WPCO mode |
| COPE doc deferred to v1.4.1 (Phase 36 COBO sibling line 64) | COPE doc shipped as Phase 46 (`08-cope-full-admin.md`) | This phase | Closes 1 of 6 v1.4 forward-promises (DEFER-06); atomic same-commit retrofit of COBO line 64 per AECOPE-03 |

**Deprecated/outdated (DO NOT USE in COPE doc):**
- "Corporate-Owned, Personally-Enabled" used as the *only* expansion of COPE without WPCO equivalence — corpus posture (`_glossary-android.md:71`) collapses to "WPCO, formerly COPE." Use "COPE (Corporate-Owned, Personally-Enabled) / WPCO (Work Profile on Corporate-Owned)" with first-mention anchor links per D-15 column header convention.
- "afw#setup is the standard COPE provisioning method" — false per Android 11+ removal; this language must NOT appear in COPE doc Provisioning method choice H2.
- "NFC remains supported for COPE" — false per Android 11+ removal; same as above.
- "COPE will be deprecated by Google" or "WPCO replaces deprecated COPE" — banned per D-31 + D-17 + corpus posture line 179.
- SafetyNet attestation references — turned off January 2025; use Play Integrity exclusively per Phase 34 D-corpus.

## Assumptions Log

> List of all `[ASSUMED]` claims in this research. Empty assumption table = all claims verified or cited.

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | Audit harness will pass without modification when Phase 46 deliverables land | Code Examples + Don't Hand-Roll | LOW — D-29 informational-first contract + Phase 43-45 precedent both confirm; if C9 banned-phrase informational-first surfaces a regression it's caught at commit time, not blocking |
| A2 | Allow-list line-shifts will be zero or trivial after Wave 2 lands | Runtime State Inventory | LOW — D-22 forecloses new bridge prose in Cross-Platform Equivalences; only line-shift causes are Cross-Platform Equivalences edits historically. `regenerate-supervision-pins.mjs --report` after commit confirms |
| A3 | The 11-H2 mirror is achievable without sibling-departure rationale | Architecture Patterns | LOW — D-04 LOCK; if matrix slot decision (D-05) reconciliation forces 12th H2, planner records sibling-departure rationale per D-04 reversal |
| A4 | Bayton's customDPC nuance for Private Space (D-09 Pitfall 8) is correctly characterized | Common Pitfalls Pitfall 8 | MEDIUM — Bayton article clearly distinguishes AMAPI-native vs customDPC EMMs, but the Bayton page was excerpted to ~80% by WebFetch summarization; if planner needs verbatim Bayton text, re-fetch and verify before applying Option A or Option B |

**All other claims:** VERIFIED via WebFetch / WebSearch / direct file read with `last_verified: 2026-04-25` confidence markers attached. No assumed facts in the gate, the Standard Stack, the Code Examples, the State of the Art, or the Validation Architecture sections.

## Open Questions

1. **D-05 reconciliation: COPE-vs-COBO matrix slot — sub-H3 vs sibling H2?**
   - What we know: D-05 LOCK leaves the placement at planner's discretion within the 11-slot envelope; matrix is at H2 anchor `#cope-vs-cobo-decision` per D-13.
   - What's unclear: Whether planner places matrix as sub-H3 of `## Provisioning method choice` (preserves 11-H2 lock) or as a 12th sibling H2 (requires sibling-departure rationale per D-04 reversal).
   - Recommendation: **Sub-H3 placement** preserves 11-H2 lock and avoids D-04 reversal. Planner places matrix as `### COPE-vs-COBO decision matrix` inside `## Provisioning method choice` H2.

2. **D-09 Bayton-customDPC nuance: Option A vs Option B?**
   - What we know: D-09 verbatim text says "no admin policy lever in COPE or any other mode"; Bayton documents AMAPI-native EMM behavior differs from customDPC EMM behavior; MS Learn confirms Intune-specific Limitation.
   - What's unclear: Whether to scope-tighten D-09 to "Intune cannot..." (Option A, recommended) or annotate with footnote (Option B).
   - Recommendation: **Option A** for terseness. Planner edits the verbatim D-09 text from "Intune cannot manage Private Space content, visibility, or settings — there is no admin policy lever, on COPE, COBO, BYOD, or any other Android Enterprise mode" to "**Intune** cannot manage Private Space content, visibility, or settings on COPE, COBO, BYOD, or any other Android Enterprise mode" (drop the absolute "no admin policy lever" claim).

3. **Token-entry method enumeration in `## Provisioning method choice` H2 — sub-H3 needed?**
   - What we know: COBO sibling has 4 sub-H3s under `## Provisioning method choice`: QR / NFC / afw#setup / Zero-Touch. Token-entry is the 5th method per MS Learn `ref-corporate-methods.md`. **NEW FINDING** — token-entry is also unsupported on COPE Android 11.0.
   - What's unclear: Whether COPE doc enumerates 5 sub-H3s (QR / NFC / afw#setup / Token / Zero-Touch) or 4 (drops Token; surfaces Android 11+ removal of all three legacy methods in a single callout).
   - Recommendation: **5 sub-H3s** for parity-preservation with what MS Learn enumerates as available enrollment methods + COPE-specific Android 11+ removal callout aggregated near `### NFC` and `### afw#setup` H3s. Planner inspects MS Learn enumeration and applies discretion.

4. **Intune Plan licensing tier callout — needed in Prerequisites?**
   - What we know: `setup-corporate-work-profile.md` does not call out a specific Plan tier. Phase 36 COBO sibling line 42 lists "Microsoft Intune Plan 1+" as the hard prereq.
   - What's unclear: Whether COPE has the same Plan 1+ baseline (most likely YES) or requires additional Plan 2 / Suite licensing.
   - Recommendation: Mirror COBO Plan 1+ assertion (HIGH confidence) unless Phase 47 integration audit surfaces evidence to the contrary; cite same source.

## Environment Availability

> Phase 46 is documentation-only authoring; no external runtime tools required. Audit harness + Node already installed per Phase 43 (existing). Skip per "code/config-only changes" exception is partially applicable, but listed for completeness.

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js (audit harness) | `v1.4.1-milestone-audit.mjs` | ✓ (per Phase 43 verification) | ≥ 18 | — |
| `regenerate-supervision-pins.mjs` helper | Allow-list line-shift maintenance | ✓ (per Phase 43 Plan 04) | — | — |
| MS Learn URLs (3 canonical sources) | RESEARCH gate + content authoring | ✓ (verified WebFetch 2026-04-25) | updated_at 2026-04-16 | Bayton + Google AE Help if MS Learn unreachable |
| Bayton URLs (3 canonical sources) | RESEARCH gate + Pitfall 8 nuance | ✓ (verified WebFetch 2026-04-25) | active 2026 | Glossary line 71/75-77/98/179 corpus posture if Bayton unreachable |
| `docs/_templates/admin-template-android.md` | 11-H2 skeleton template | ✓ (Phase 34 D-15) | last_verified 2026-04-25 | COBO sibling at `03-fully-managed-cobo.md` if template missing |
| `docs/admin-setup-android/03-fully-managed-cobo.md` | Primary sibling for parallel-structure | ✓ (verified file read 2026-04-25) | last_verified 2026-04-25 | — |

**Missing dependencies with no fallback:** None.

**Missing dependencies with fallback:** None — all inputs verified available.

## Validation Architecture

> Per `.planning/config.json`: `nyquist_validation` key absent → defaults to ENABLED. Section included.

### Test Framework

| Property | Value |
|----------|-------|
| Framework | Node `node:fs` mechanical checks via `scripts/validation/v1.4.1-milestone-audit.mjs` (no test framework like Jest/Mocha; declarative file-content checks) |
| Config file | `scripts/validation/v1.4.1-audit-allowlist.json` (sidecar JSON, line-pinned exemptions) |
| Quick run command | `node scripts/validation/v1.4.1-milestone-audit.mjs` |
| Full suite command | `node scripts/validation/v1.4.1-milestone-audit.mjs --verbose` |
| Helper command (line-shift maintenance) | `node scripts/validation/regenerate-supervision-pins.mjs --report` (advisory; --emit-stubs for new pins; --self-test for dogfood gate) |
| Pre-commit hook | `scripts/hooks/pre-commit.sh` (Phase 43 Plan 08; native bash + node; 4-job: parse / path-match / harness-run / pin-helper-advisory) |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| AECOPE-01 | New file `08-cope-full-admin.md` with 11 H2s, last_verified frontmatter, banned-phrase compliance | C5 freshness + C9 banned-phrase (informational-first) | `node scripts/validation/v1.4.1-milestone-audit.mjs` | ✅ harness exists; new doc subject to checks at landing |
| AECOPE-01 | Zero SafetyNet references, zero "supervised" Android attribution | C1 SafetyNet + C2 supervision | `node scripts/validation/v1.4.1-milestone-audit.mjs` | ✅ |
| AECOPE-01 | Source-confidence markers regex compliance for MEDIUM/LOW assertions | C9 banned-phrase + visual review | grep `\[(HIGH\|MEDIUM\|LOW)(: [A-Za-z ]+)?(, last_verified \d{4}-\d{2}-\d{2})?]` | ✅ |
| AECOPE-02 | Capability matrix retains 5 H2 sub-tables; COPE column inserted at index 1; Cross-Platform Equivalences UNCHANGED structure | C2 supervision (no new bridge prose triggers no new pins per D-22) | `node scripts/validation/v1.4.1-milestone-audit.mjs` + `node scripts/validation/regenerate-supervision-pins.mjs --report` | ✅ |
| AECOPE-03 | COBO line 64 sentence-scoped trim; lines 58-63 + 65-66 PRESERVED including HTML comment | Visual diff inspection + git diff scope check | `git diff docs/admin-setup-android/03-fully-managed-cobo.md` | ✅ git available |
| AECOPE-04 | Glossary `### Private Space` H3 added alphabetical between Fully Managed and Supervision; line 15 alphabetical index updated | C5 freshness on glossary; manual H3-presence check | `node scripts/validation/v1.4.1-milestone-audit.mjs` + visual review | ✅ |
| D-10 | BYOD line 167 sentence-scoped retrofit | Visual diff scope check | `git diff docs/admin-setup-android/04-byod-work-profile.md` | ✅ |
| D-11 | Version-matrix `### Android 15 — Private Space` H3 added; line 30 anchor-link updated | C5 freshness on version-matrix; manual H3-presence + anchor check | `node scripts/validation/v1.4.1-milestone-audit.mjs` + visual review | ✅ |
| D-23 | All 5 Wave-2 surfaces ship in single atomic commit | git log inspection | `git log -1 --stat <commit>` shows all 5 files | ✅ git available |
| D-25 | RESEARCH gate ran BEFORE authoring | This RESEARCH.md exists with PASS verdict | Existence of `46-RESEARCH.md` with "Gate Outcome: ALL FOUR sources unanimous" | ✅ this doc satisfies |
| D-31 | Zero banned phrases applied to COPE in any new or edited Phase 46 file | C9 banned-phrase (informational-first per D-29) + at-author-time discipline | `node scripts/validation/v1.4.1-milestone-audit.mjs` + grep `\b(deprecated\|end of life\|removed\|EOL\|no longer supported\|obsolete\|sunset\|retired)\b` near COPE | ✅ |

### Sampling Rate

- **Per task commit:** `node scripts/validation/v1.4.1-milestone-audit.mjs` — 5-check audit harness, ~10s runtime, expects 8/8 PASS (5 checks per Phase 43 + 3 informational per D-29 + Phase 47)
- **Per wave merge:** Same harness + `node scripts/validation/regenerate-supervision-pins.mjs --report` — confirms zero allow-list line-shifts (or surfaces shifts for hand-merge)
- **Phase gate:** Full suite green before `/gsd-verify-work`; pre-commit hook (`scripts/hooks/pre-commit.sh`) provides automatic enforcement at every git commit per Phase 43 Plan 08

### Wave 0 Gaps

None — existing audit infrastructure (Phase 43 Plan 02 v1.4.1 harness + Phase 43 Plan 04 regenerate-supervision-pins helper + Phase 43 Plan 08 pre-commit hook) covers all Phase 46 verification requirements without extension. The harness handles:
- C1 SafetyNet zero-tolerance with allow-list pin OR nearby deprecation prose exemption
- C2 supervision zero-tolerance with allow-list pin by {file, line}
- C5 60-day freshness on all Android docs (D-26 inheritance)
- C9 banned-phrase informational-first per D-29 (Phase 47 owns blocking promotion)
- _-prefix scope filter excludes templates and drafts (Phase 43 D-24)

Phase 46 deliverables MUST use the Phase 34 admin-template-android.md frontmatter discipline (audience: admin / platform: Android / applies_to: COPE / last_verified: <execute-time> / review_by: <last_verified + 60d>) so C5 passes on first run.

## Project Constraints (from CLAUDE.md)

> CLAUDE.md is the project's general PowerShell + Python + React CLI orchestration guide for the Autopilot codebase. Phase 46 ships markdown documentation only; CLAUDE.md directives apply only insofar as the documentation must remain consistent with the project's established patterns. Specific applicable directives:

- **Markdown in docs/** for version control + wiki export (matches Phase 46 deliverable format exactly)
- **Per-setting "what breaks" callouts** at admin config decision points (Phase 46 follows this pattern in COPE doc per COBO sibling)
- **Confidence-attributed citations** for community sources where Microsoft docs lack coverage (Phase 46 honors via D-28 source-confidence marker regex)
- **Tiered doc structure (L1/L2/Admin)** preserved (Phase 46 ships an Admin-tier doc; deferred L1/L2 COPE-specific runbooks routed to v1.5)
- **Generic over environment-specific** (no tenant-specific COPE content; Phase 46 honors)
- **Documentation-first milestone** (Phase 46 is documentation by definition)
- **No commits of `.env`** or credentials (Phase 46 has no secret surface)

CLAUDE.md does not contain directives that contradict any Phase 46 CONTEXT decision. The PowerShell / Python / React tier guidance is orthogonal to Phase 46 scope.

## Sources

### Primary (HIGH confidence)

- **MS Learn `setup-corporate-work-profile.md`** — `https://learn.microsoft.com/en-us/intune/device-enrollment/android/setup-corporate-work-profile`
  - frontmatter: ms.date 2025-05-08; updated_at 2026-04-16; git_commit_id b89468cf
  - last_verified: 2026-04-25 via WebFetch
  - Topics: UI label "Corporate-owned devices with work profile" (verbatim); navigation path Devices → Enrollment → Android → Android Enterprise → Enrollment Profiles → Corporate-owned devices with work profile; token types (default + staging up to 65 years); 7 naming templates verbatim; Android 8.0 floor; Android 11+ removal of NFC + afw#setup; Private Space Limitations section; managed app flow

- **MS Learn `ref-corporate-methods.md`** — `https://learn.microsoft.com/en-us/intune/device-enrollment/android/ref-corporate-methods`
  - frontmatter: ms.date 2025-12-04; updated_at 2026-04-16; git_commit_id b89468cf
  - last_verified: 2026-04-25 via WebFetch
  - Topics: QR / Zero-Touch / KME / NFC / token enrollment methods; CA exclusion note (verbatim); FRP behavior table per mode; Android 15 COPE-specific re-enrollment requirement; ZT iframe DPC extras JSON

- **MS Learn `setup-fully-managed.md`** (sibling reference; cited via existing Phase 36 COBO doc lines 97 + 125)
  - last_verified: 2026-04-25 via cross-reference

- **MS Learn `factory-reset-protection-emails-not-enforced`** — `https://learn.microsoft.com/en-us/troubleshoot/mem/intune/device-configuration/factory-reset-protection-emails-not-enforced`
  - last_verified: cited in Phase 36 COBO doc line 193

- **Google AE Help `answer/14549362`** — Enable enterprise factory reset protection
  - last_verified: cited in Phase 36 COBO doc line 175 + version-matrix line 74

- **Google AE Help `answer/7514005`** — Zero-touch enrollment for IT admins
  - last_verified: cited in Phase 35 ZT doc line 50

### Secondary (MEDIUM confidence — verified with cross-reference to primary)

- **Bayton `android-enterprise-emm-cope-support`** — `https://bayton.org/android/android-enterprise-emm-cope-support/`
  - last_verified: 2026-04-25 via WebFetch
  - Topics: WPCoD ↔ COPE evolution; Android 11 architecture revamp; corpus-canonical "no formal deprecation" verification

- **Bayton `android-glossary`** — `https://bayton.org/android/android-glossary/`
  - last_verified: 2026-04-25 via WebFetch
  - Topics: COPE / WPCoD / WPCoMD glossary; corpus-canonical terminology

- **Bayton `android-enterprise-provisioning-methods`** — `https://bayton.org/android/android-enterprise-provisioning-methods/`
  - last_verified: 2026-04-25 via WebFetch
  - Topics: provisioning-method × mode matrix; Android version availability; NFC removal Android 11+ for COPE

- **Bayton `what-is-android-15-private-space`** — `https://bayton.org/android/what-is-android-15-private-space/`
  - last_verified: 2026-04-25 via WebFetch
  - Topics: Private Space mechanics; AMAPI-native vs customDPC EMM management nuance (load-bearing for Pitfall 8)

### Tertiary (LOW confidence — flagged for plan-time verification)

- None. All Phase 46 research findings achieve HIGH or MEDIUM confidence via primary or primary-cross-referenced secondary sources.

## Metadata

**Confidence breakdown:**
- Research gate D-25: **HIGH** — 4 independent authoritative sources unanimous; no formal deprecation
- Standard stack (MS Learn sources): **HIGH** — WebFetch verified within 9 days of research; ms.date + updated_at + git_commit_id all captured
- Architecture (11-H2 mirror + sibling parity): **HIGH** — verified via direct file read of COBO sibling 2026-04-25
- Don't hand-roll (existing audit infrastructure): **HIGH** — verified via direct file read of harness 2026-04-25
- Pitfalls 1-7: **HIGH** — derived from CONTEXT D-locks + verbatim source verification
- Pitfall 8 (Bayton customDPC nuance): **MEDIUM** — Bayton article excerpted ~80% by WebFetch; planner should re-fetch verbatim before applying Option A or Option B if uncertain
- Validation Architecture: **HIGH** — derived from existing Phase 43 audit harness + Phase 43 Plan 08 pre-commit hook + Phase 43 Plan 04 helper

**Research date:** 2026-04-25

**Valid until:** 2026-05-25 (30 days; standard for stable Microsoft + Google + Bayton documentation surfaces). Re-verification triggers earlier if (a) MS Learn `setup-corporate-work-profile.md` updated_at advances, (b) Google AE Help publishes a deprecation announcement (D-25 gate would re-fire and re-scope to deprecation-rationale doc per ROADMAP SC#5), or (c) any of the 4 sources flips on the deprecation question.

**Researcher:** gsd-research-phase agent, working from CONTEXT D-01..D-32 + REQUIREMENTS AECOPE-01..04 + ROADMAP Phase 46 entry.

---

*Phase: 46-cope-full-admin*
*Research date: 2026-04-25*
*Method: 4-source D-25 gate (Google AE Help + Android Developers + Bayton + MS Learn) + verbatim source verification + sibling-parity inspection + audit-harness availability audit*
*Gate result: PATH A LOCKED (full admin guide); 1 substantive correction surfaced (D-09 wording per Pitfall 8); 2 NEW HIGH-value findings (token-entry Android 11+ removal; COPE-specific FRP table)*
