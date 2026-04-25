# Phase 46: COPE Full Admin — Context

**Gathered:** 2026-04-25
**Status:** Ready for planning
**Method:** 4-area 3-agent adversarial review (Finder / Adversary / Referee × 4 gray areas; 12 agents in 3 parallel waves of 4) following Phases 39 / 44 / 45 precedent. Per-area winners: GA1=1A-true-mirror (synthesized) / GA2=2E+2G / GA3=3F / GA4=4C-refined.

<domain>
## Phase Boundary

Phase 46 ships the full Intune admin guide for "Corporate-owned devices with work profile" (COPE) at `docs/admin-setup-android/08-cope-full-admin.md`, parallel-structured to `03-fully-managed-cobo.md` (the COBO sibling). Path A LOCKED 2026-04-24 against MS Learn `setup-corporate-work-profile` updated 2026-04-16; not formally deprecated; Google's WPCO terminology is the same deployment shape. Scope:

**One new admin guide (AECOPE-01):**
- `docs/admin-setup-android/08-cope-full-admin.md` — 11 H2s mirroring COBO 1:1 (Key Concepts / Prerequisites / COPE Migration Note (inverse-direction back-link) / Enrollment profile creation / Enrollment token management / Provisioning method choice / Android 15 FRP and EFRP / What Breaks Summary / Renewal & Maintenance / See Also / Changelog). One-line `> ⚠️` Android 15 Private Space callout in Key Concepts forward-linking to glossary + version-matrix (NOT own H2 — see GA2 D-08). Two GA token types (default + 65-year staging), naming templates `{{SERIAL}}` / `{{SERIALLAST4DIGITS}}` / `{{DEVICETYPE}}` / `{{ENROLLMENTDATETIME}}` / `{{UPNPREFIX}}` / `{{USERNAME}}` / `{{RAND:x}}`, Android 8-15 version breakpoints, `afw#setup` + NFC removed Android 11+ note, COPE-vs-COBO decision matrix as H2 `#cope-vs-cobo-decision` (3-col × 5-row corporate-only — see GA3 D-13), Samsung-admins KME-or-ZT callout with WPCO-equivalence clarification in `### Zero-Touch` H3 (per GA4 D-19).

**Capability matrix retrofit (AECOPE-02):**
- `docs/reference/android-capability-matrix.md` — add COPE column at index 1 (between COBO and BYOD per ownership×scope axes); update all 5 H2 sub-tables (Enrollment / Configuration / App Deployment / Compliance / Software Updates); preserve Cross-Platform Equivalences section structure (NO new paired row — WPCO has no iOS/macOS/Windows analog per glossary line 79); add Android 15 Private Space row across all modes as `N/A¹` with shared footnote per GA2 D-12.

**COBO migration-note retrofit (AECOPE-03):**
- `docs/admin-setup-android/03-fully-managed-cobo.md` — γ3 sentence-scoped trim of line 64 ONLY; preserve lines 58-63 (WPCO-direction paragraph) and lines 65-66 (verification HTML comment with `last_verified: 2026-04-21`); replace deferred-language sentence with forward-link sentence per GA4 D-21.

**Glossary updates (AECOPE-04 expanded):**
- `docs/_glossary-android.md` — see-also + anchor to new COPE admin doc (existing scope); ADD new `### Private Space` H3 under `## Ownership & Management Scope` H2 (alphabetical insertion between Fully Managed and Supervision); update line 15 alphabetical index; add Cross-platform note declaring no Win/macOS/iOS analog per GA2 D-09.

**Atomic same-commit BYOD retrofit (NEW — folded from GA2 SSOT pattern):**
- `docs/admin-setup-android/04-byod-work-profile.md:167` — replace standalone Private Space prose sentence with forward-link to glossary + version-matrix anchors per GA2 D-10. Eliminates drift surface (Pitfall 1).

**Atomic same-commit version-matrix update:**
- `docs/android-lifecycle/03-android-version-matrix.md` — add new `### Android 15 — Private Space (Personal-Side, Unmanageable)` H3 in Version Breakpoint Details section; promote existing line 30 BYOD-row text to anchor link to new sub-section per GA2 D-11.

**Out of scope (deferred to other phases / milestones):**
- L1/L2 runbooks for COPE-specific failures — REQUIREMENTS.md AECOPE-01..04 omits runbooks; route to v1.5 if needed
- New BYOD or WPCO admin guides separate from existing `04-byod-work-profile.md` — locked Out of Scope (Phase 46 deliverable set is exactly AECOPE-01..04 + 2 atomic retrofits)
- 4-platform comparison row in Cross-Platform Equivalences — DEFER-08 / AECOMPARE-01 routed to v1.5
- Cross-platform nav unification (Android backport into `docs/index.md` etc.) — DEFER-07 / AENAVUNIFY-04 routed to v1.5
- Audit-harness C9 banned-phrase check sidecar JSON — Phase 47 AEINTEG-02 owns; informational-first per Phase 43 D-29

</domain>

<decisions>
## Implementation Decisions

### GA1 — H2 Skeleton for `08-cope-full-admin.md` (D-01..D-07)

**Synthesis winner: True 1:1 mirror of COBO (11 H2s)** — overrides Wave 3 GA1 Referee's Option 1D (12 H2s) because GA2's single-source-of-truth pattern resolves Android 15 Private Space discoverability via in-doc one-line callout (NOT own H2). Final H2 count matches COBO sibling exactly.

- **D-01** — **Lock 11 H2s in fixed order** for `docs/admin-setup-android/08-cope-full-admin.md`, mirroring COBO sibling lines 25/38/58/69/100/128/169/198/219/231/245:
  1. `## Key Concepts` (with Work-profile-as-the-personal-partition + Entra-join-on-corporate-side H3 children + Android 15 Private Space one-line `> ⚠️` callout per GA2 D-08)
  2. `## Prerequisites`
  3. `## COPE Migration Note` (inverse-direction back-link to `03-fully-managed-cobo.md` + COPE-side migration framing for existing COPE fleets)
  4. `## Enrollment profile creation`
  5. `## Enrollment token management`
  6. `## Provisioning method choice` (with QR / NFC / `afw#setup` / Zero-Touch H3 children mirroring COBO; afw#setup + NFC carry Android 11+ removal callout for COPE/WPCO; `### Zero-Touch` H3 carries Samsung-admins KME callout per GA4 D-19; COPE-vs-COBO decision matrix at H2 `#cope-vs-cobo-decision` per GA3 D-13)
  7. `## Android 15 FRP and EFRP`
  8. `## What Breaks Summary`
  9. `## Renewal / Maintenance`
  10. `## See Also`
  11. `## Changelog`

  **Why:** AECOPE-01 verbatim "parallel-structured to COBO guide" satisfied at the strongest reading (structural isomorphism). Sibling-parity envelope preserved (11 H2s = COBO 11 = ZT 11; well under Knox 15 ceiling). Zero sibling-departure rationale required.

- **D-02** — **SC#2 "callout is present" interpretation LOCKED**: a `> ⚠️` blockquote with forward-links satisfies SC#2; the body of the callout does NOT have to live in `08-cope-full-admin.md`. Precedent: `03-fully-managed-cobo.md:162` Samsung-admins callout uses exactly this shape (short flag + multi-link forward-references). Forecloses any future re-litigation that would require the callout body to be self-contained.

- **D-03** — **COBO `## COPE Migration Note` H2 (line 58) is REPURPOSED, not duplicated.** In COBO, the H2 contains an outbound-link-to-COPE-doc plus COBO-side framing (per AECOPE-03 atomic same-commit retrofit at line 64). In `08-cope-full-admin.md`, the same-named H2 contains the inverse-direction back-link to COBO plus COPE-side migration framing for existing COPE fleets. Bidirectional repurposing satisfies parallel-structure (same H2 name, same slot position) without content duplication.

- **D-04** — **NO sibling-departure rationale required for GA1.** Final 11-H2 count exactly matches COBO sibling. (GA1 Referee's D-04 sibling-departure rationale becomes UNNECESSARY after the GA1+GA2 synthesis.)

- **D-05** — **Banned content axes for H2 promotion** (do NOT promote to H2): COPE-vs-COBO decision matrix (AECOPE-01 lists as decision-matrix CONTENT — render at H2 `#cope-vs-cobo-decision` per GA3 D-13 INSIDE `## Provisioning method choice` or as a sibling H2 at planner's discretion within the 11-slot envelope); WPCO terminology mechanics (render inline within `## Key Concepts` and `## COPE Migration Note`); naming-template enumeration `{{SERIAL}}` etc. (render at H3 within `## Enrollment profile creation` mirroring COBO sibling). **Note:** D-13 (GA3) places the decision matrix as its OWN H2 `#cope-vs-cobo-decision`. Reconcile by treating the matrix H2 as a sub-H3 of `## Provisioning method choice` if planner wants strict 11-H2 lock, OR allow it to be the 12th H2 (in which case sibling-departure rationale is required per D-04 reversal). **Planner picks at plan-phase**; recommended path is sub-H3 inside `## Key Concepts` or `## COPE Migration Note` to preserve the 11-H2 lock.

- **D-06** — **Step-numbered H2s NOT used.** COPE follows COBO's content-named H2 convention (Key Concepts / Prerequisites / Enrollment profile creation / etc.), NOT Knox/ZT step-numbered H2 convention. Test 4 from Adversary GA1: Knox/ZT step-numbering reflects enrollment-mechanism-shape (one-time setup procedure); COBO/COPE are management-mode-shape (ongoing admin operations). Knox/ZT step-numbering would break parallelism with COBO sibling.

- **D-07** — **Anchor IDs mirror COBO verbatim where H2 names match.** Planner inspects COBO anchor ID at each H2 (e.g., `<a id="cope-migration"></a>` at line 57; `<a id="prerequisites">` at line 37; `<a id="enrollment-profile">` at line 68; `<a id="enrollment-token">` at line 99; `<a id="android-15-frp">` at line 168; `<a id="what-breaks">` at line 197; `<a id="renewal-maintenance">` at line 218) and ports verbatim. Decision matrix H2 anchor: `<a id="cope-vs-cobo-decision"></a>`.

### GA2 — Android 15 Private Space Callout Strategy (D-08..D-12)

**Winner: Option 2E+2G (Glossary-anchored single-source-of-truth + version-matrix breakpoint sub-section + one-line in-doc COPE callout)**. Adversary disproved Finder's "2B has zero CRITs" verdict by surfacing existing duplication risk (`04-byod-work-profile.md:167` and `03-android-version-matrix.md:30` already own Private Space content).

- **D-08** — **In-doc COPE callout = one-line `> ⚠️` blockquote inside `## Key Concepts` H2** (NOT own H2). Verbatim text:

   ```markdown
   > ⚠️ **Android 15 — Private Space (unmanaged):** Android 15+ devices include a user-controlled hidden profile partition that Intune cannot manage; there is no admin policy lever in COPE or any other mode. See [_glossary-android.md#private-space](../_glossary-android.md#private-space) and [version matrix breakpoint](../android-lifecycle/03-android-version-matrix.md#android-15-private-space-breakpoint).
   ```

   Word budget: ~50 words single line. Tone: neutral-warn ("thing exists, you cannot manage it" — NOT FUD). Placement: Key Concepts trailing line, before next H2.

- **D-09** — **Glossary canonical entry** at `docs/_glossary-android.md`: add new `### Private Space` H3 under existing `## Ownership & Management Scope` H2 (alphabetical placement between Fully Managed and Supervision). Update line 15 alphabetical index inline. Body text:

   ```markdown
   ### Private Space

   Private Space is an Android 15+ personal-side feature that creates a user-controlled, hidden profile partition on the device. It exists alongside the work profile but on the personal side; **Intune cannot manage Private Space content, visibility, or settings** — there is no admin policy lever, on COPE, COBO, BYOD, or any other Android Enterprise mode. Admins should treat Private Space as out-of-scope for MDM governance and adjust user-facing privacy messaging accordingly. Applies to Android 15.0+. [HIGH: MS Learn setup-personal-work-profile Limitations + Google AE Help, last_verified: <plan-time-verify>]

   > **Cross-platform note:** No iOS, macOS, or Windows equivalent — the "user-controlled hidden personal-side partition that admin policies cannot reach" model is Android 15-specific. Apple's analog "Hidden" album/Locked Notes are app-level features without OS-partition status.
   ```

- **D-10** — **BYOD line 167 retrofit IN-SCOPE for Phase 46 atomic same-commit.** AECOPE-04 expands to include this retrofit (or numbered as new sub-task at planner's discretion). Replace `04-byod-work-profile.md:167` verbatim:

   ```markdown
   Android 15 introduced [Private Space](../_glossary-android.md#private-space) as a personal-side feature on the work-profile partition; Intune cannot manage it. See [version matrix breakpoint](../android-lifecycle/03-android-version-matrix.md#android-15-private-space-breakpoint) for the cross-mode behavior.
   ```

   **Why IN-SCOPE:** AECOPE-03 establishes the atomic-same-commit retrofit precedent; leaving BYOD line 167 as free-standing prose after glossary canonical exists creates the exact drift surface this decision eliminates. Five surfaces ship together: COPE doc + glossary + version matrix + BYOD line 167 + COBO migration note.

- **D-11** — **Version matrix breakpoint sub-section** at `docs/android-lifecycle/03-android-version-matrix.md`: add new `### Android 15 — Private Space (Personal-Side, Unmanageable)` H3 in Version Breakpoint Details section, parallel structure to existing Android 15 FRP breakpoint. Affected modes line: "All modes — feature is personal-side and outside MDM management surface (informational, not an admin lever)." Body: 80–120 words, neutral tone. Update matrix table line 30 to add anchor `[Android 15: Private Space unsupported](#android-15-private-space-breakpoint)`.

- **D-12** — **Capability-matrix Private Space row added across ALL Android columns (N/A everywhere with shared footnote)** — NOT COPE-only. Reason: Private Space is mode-agnostic personal-side feature; COPE-only entry would mislead. Added under AECOPE-02. Footnote: *"Personal-side feature outside Intune management surface across all modes; see [glossary](../_glossary-android.md#private-space) and [version matrix breakpoint](../android-lifecycle/03-android-version-matrix.md#android-15-private-space-breakpoint)."*

### GA3 — COPE-vs-COBO Decision Matrix (D-13..D-18)

**Winner: Option 3F (3-column corporate-only matrix, 5 rows × 3 cols)**. Adversary verified sibling corpus uniformly maps "matrix" → tabular ≥3 cols; 3A (Mermaid tree) and 3B (2-col) fail SC#1 literal. 3F drops BYOD column to address scope-misframing.

- **D-13** — **Matrix shape: 5 rows × 3 cols** in `docs/admin-setup-android/08-cope-full-admin.md` at H2 anchor `#cope-vs-cobo-decision`. Columns: `Decision factor` | `COBO (Fully Managed)` | `COPE (WPCO / Corp-Owned Work Profile)`. Rows in fixed order:
  1. **Personal apps on the device**
  2. **Profile boundary model**
  3. **Android version floor for new provisioning**
  4. **Samsung KME compatibility**
  5. **Recommended for net-new in 2026**

   Order rationale: row 1 is the user's actual decision question; row 2 explains structural difference; row 3 is hard prerequisite gate; row 4 is platform-specific gotcha; row 5 is call-to-action.

- **D-14** — **Matrix LIVES inside `08-cope-full-admin.md`** as H2 (NOT a new shared file). Add one back-link from COBO `## COPE Migration Note` H2 (line 58) to `08-cope-full-admin.md#cope-vs-cobo-decision`. Reason: SC#1 binds the matrix to COPE deliverable; ROADMAP line 180 lists it as content of `08-cope-full-admin.md`; the artifact serves two pages, not the multi-page shared-file pattern.

- **D-15** — **Column 3 header reads `COPE (WPCO / Corp-Owned Work Profile)`** — single column, both names, WPCO-equivalence anchor-linked at first cell mention via `[WPCO](../_glossary-android.md#wpco)`. Reason: per `_glossary-android.md:75-77`, WPCO is "successor pattern to COPE / formerly COPE" — same Android Enterprise mode under different names; making them separate columns would reify a distinction the canonical glossary collapses.

- **D-16** — **Knox row affirms KME compatibility for both columns** (no false-pin). Cell content for Samsung KME compatibility row:
  - COBO column: `KME provisions COBO directly — see [KME](../_glossary-android.md#kme) and [07-knox-mobile-enrollment.md](07-knox-mobile-enrollment.md)`
  - COPE column: `KME provisions WPCO (the modern COPE shape) — see [KME](../_glossary-android.md#kme), [WPCO glossary](../_glossary-android.md#wpco), and [07-knox-mobile-enrollment.md](07-knox-mobile-enrollment.md)`

   NO cell anywhere claims "KME does not support COPE" (technically false per WPCO equivalence; would reify a deprecation pin).

- **D-17** — **Banned-phrase guard rules for matrix cells**:
  - For "Recommended for net-new in 2026" row: positive framing only. COBO: `Yes — when no personal-app allowance is needed`. COPE: `Yes — provision as WPCO per current Google guidance` (mirrors `_glossary-android.md:49` corpus-canonical wording).
  - For "Profile boundary model" row: never use {old, legacy, previous, former} attached to COPE.
  - Hard-banned set across all cells: {deprecated, end of life, EOL, removed, no longer supported, obsolete, sunset, retired} applied to COPE.
  - Positive-framing rule: recommend WPCO as the *provisioning name* per current Google guidance, never as a *replacement* for COPE.

- **D-18** — **Migration story is NOT a separate matrix row.** Belongs in `08-cope-full-admin.md`'s `## COPE Migration Note` H2 narrative (parallel to `03-fully-managed-cobo.md:58`). Matrix routes; H2 narrative explains. Capability matrix has no migration row; adding one here is content-creep without sibling precedent. Cell-content discipline: rows 3 and 4 use anchor links only (NEVER restating Android version literal or Knox SKU detail) per Adversary anti-creep guard.

### GA4 — Knox/KME Forward-Link + Capability-Matrix Column Placement + COBO Migration Text (D-19..D-25)

**Winner: Option 4C-refined (α1-WPCO + β1 + γ3)**. Five independently-verified anchors converge: AECOPE-03 verbatim "REPLACE" verb is sentence-scoped; WPCO≡COPE equivalence is glossary-canonical (`_glossary-android.md:71/75-77/98`); Phase 44 reciprocal-pin discipline is load-bearing; β1 ownership×scope ordering is matrix-canonical; Cross-Platform Equivalences requires no new paired row.

- **D-19** — **Samsung-admins callout in `08-cope-full-admin.md`** placed under `### Zero-Touch` H3 of `## Provisioning method choice` (mirrors structural placement of `03-fully-managed-cobo.md:162`). Verbatim text:

   ```markdown
   > ⚠️ **Samsung admins:** Choose Knox Mobile Enrollment (KME) or Zero-Touch — never both. Configuring both on the same Samsung devices causes out-of-sync enrollment state; KME takes precedence at the device firmware level. KME provisions Samsung corporate-owned-with-work-profile devices into the **WPCO** mode in the Knox EMM profile dropdown — WPCO is Google's modern terminology for the same deployment shape this guide calls COPE (corporate-owned device with a user-separated work profile). See [Knox Mobile Enrollment](07-knox-mobile-enrollment.md) for full KME admin coverage; [02-zero-touch-portal.md#kme-zt-mutual-exclusion](02-zero-touch-portal.md#kme-zt-mutual-exclusion) for the mutual-exclusion record; [_glossary-android.md#wpco](../_glossary-android.md#wpco) for the WPCO↔COPE terminology equivalence; and [_glossary-android.md#zero-touch-enrollment](../_glossary-android.md#zero-touch-enrollment) for the Zero-Touch definition and the iOS ADE cross-platform analog.
   ```

   Honors Phase 44 reciprocal-pin discipline (COPE/WPCO admin doc becomes 3rd Samsung-admin reading-path node after COBO `:162` and KME doc `:14`).

- **D-20** — **Capability matrix β1 placement: insert COPE column at index 1** (between COBO and BYOD per ownership×scope axes). New column order: `COBO (Fully Managed) | COPE (WPCO / Corp-Owned Work Profile) | BYOD (Work Profile) | Dedicated (COSU) | ZTE (Zero-Touch) | AOSP`. All 5 capability H2 sub-tables (Enrollment / Configuration / App Deployment / Compliance / Software Updates) receive the COPE column in the same atomic commit. β3 (after AOSP stub) rejected as semantic relegation; β2 (between BYOD and Dedicated) rejected as ownership-axis violation.

- **D-21** — **COBO migration-note retrofit (γ3 sentence-scoped trim)** at `docs/admin-setup-android/03-fully-managed-cobo.md` lines 58-66:
  - **Lines that stay verbatim:** 57 (`<a id="cope-migration"></a>`), 58 (`## COPE Migration Note`), 59 (blank), 60 (existing intro sentence), 61 (blank), 62 (entire WPCO-direction paragraph), 63 (blank), 65 (blank), 66 (entire `<!-- MEDIUM confidence ... last_verified: 2026-04-21 -->` HTML comment block — LOAD-BEARING source attribution PRESERVED)
  - **Line that goes (line 64 in full):** `The full COPE admin path (separate from COBO) is deferred to v1.4.1; see `.planning/PROJECT.md` deferred items. For net-new corporate-with-work-profile deployments, provision WPCO; for existing COPE fleets, continue running them until your v1.4.1 migration is in place.`
  - **Replacement at line 64 (verbatim):**

     ```markdown
     The full COPE admin path (separate from COBO) is documented in [08-cope-full-admin.md](08-cope-full-admin.md). For net-new corporate-with-work-profile deployments, provision WPCO per [_glossary-android.md#wpco](../_glossary-android.md#wpco); for existing COPE fleets, see [08-cope-full-admin.md](08-cope-full-admin.md) for full-admin coverage including profile creation, token lifecycle, and Android 8-15 version breakpoints.
     ```

- **D-22** — **Cross-Platform Equivalences section receives ZERO new paired rows for COPE.** Verified at `android-capability-matrix.md:72-88` the section is bounded by ROADMAP SC#1 to 3 paired rows; WPCO entry at `_glossary-android.md:79` explicitly states "No Windows, macOS, or iOS equivalent — the 'corporate device with user-separated personal partition' model is Android-specific." Forcing a paired row would manufacture a false cross-platform analog. Defer 4-platform expansion to v1.5 AECOMPARE-01 per existing footer at `:128-135`. AECOPE-02 verbatim "preserve Cross-Platform Equivalences Section structure" is honored by this no-change decision.

- **D-23** — **AECOPE-01..04 are ATOMIC SAME-COMMIT** (extended to include BYOD line 167 + version-matrix retrofits per D-10/D-11). AECOPE-03's verbatim "ATOMIC same-commit with AECOPE-01" extends naturally to the full Phase 46 deliverable set, mirroring Phase 42 Wave 1/2 unified-rebuild atomicity. Prevents transient dead-link windows between commits.

- **D-24** — **Phase 44 reciprocal-pin discipline EXTENDED** to COPE/WPCO admin doc as third Samsung-admin reading-path node (after COBO `03:162` and KME doc `07:14`). Future v1.5 work introducing additional corporate-owned-mode admin docs MUST follow the same reciprocal-pin pattern.

- **D-25** — **Mandatory plan-time research re-verification gate (SC#5)**: researcher MUST re-verify "no formal deprecation" against Google AE Help + Android Developers release notes + Bayton FAQ BEFORE authoring. Path A (full admin guide) is LOCKED 2026-04-24, but the gate is belt-and-braces. If verification reveals a formal deprecation declaration since 2026-04-24, re-scope Phase 46 to deprecation-rationale doc at 40% scope (preserves what-was-written as historical appendix). Findings recorded in `46-RESEARCH.md`.

### Locked Carry-Forward Decisions (D-26..D-32)

These are LOCKED by prior phases — Phase 46 inherits without re-litigation:

- **D-26 — 60-day Android freshness (Phase 34 D-14)**: All Phase 46 docs use `last_verified` + `review_by` (+60d) frontmatter. Audit harness C5 freshness applies.
- **D-27 — Frontmatter contract**: `audience: admin`, `platform: Android`, `applies_to: COPE` (single-string per Phase 37 D-15 / Phase 38 D-18 / Phase 45 D-27 precedent).
- **D-28 — Source-confidence marker regex** (Phase 37 D-11 / Phase 39 D-20 / Phase 45 D-28 inheritance): All MEDIUM/LOW assertions carry `[(HIGH|MEDIUM|LOW)(: [A-Za-z ]+)?(, last_verified \d{4}-\d{2}-\d{2})?]` markers.
- **D-29 — Append-only contract on shared files** (Phase 36/37/38/44/45 D-25 precedent): Phase 46 commits to `docs/reference/android-capability-matrix.md` (column add + Private Space row), `docs/_glossary-android.md` (Private Space H3 + see-also additions), `docs/android-lifecycle/03-android-version-matrix.md` (Android 15 Private Space breakpoint H3), `docs/admin-setup-android/03-fully-managed-cobo.md:64` (sentence-scoped trim), `docs/admin-setup-android/04-byod-work-profile.md:167` (sentence retrofit) MUST be additive H2/H3/cell additions OR sentence-scoped replacements per D-21. Phase 47 AEINTEG-01 owns atomic single-author rebuilds.
- **D-30 — Shared-file modification guard**: Phase 46 MUST NOT modify: `docs/index.md`, `docs/common-issues.md`, `docs/quick-ref-l1.md`, `docs/quick-ref-l2.md`, `docs/_glossary.md`, `docs/_glossary-macos.md`, any file under `docs/admin-setup-ios/`, `docs/admin-setup-macos/`, `docs/end-user-guides/`, `docs/_templates/`. Permitted writes listed in `<domain>` Scope above.
- **D-31 — Banned-phrase discipline (SC#5)**: Zero instances of "deprecated" / "end of life" / "removed" / "EOL" / "no longer supported" / "obsolete" / "sunset" / "retired" applied to COPE across any new or edited file in this phase. Audit harness C9 sidecar JSON enforcement is informational-first per Phase 43 D-29 (Phase 47 owns blocking promotion). Phase 46 enforcement is at-author-time + `46-PLAN.md` task-spec discipline.
- **D-32 — Wave structure for plan parallelization** (anticipates `/gsd-plan-phase 46`):
  - **Wave 1** — `08-cope-full-admin.md` authoring (AECOPE-01) + `46-RESEARCH.md` plan-time gate (D-25). Single plan; cannot parallelize internally because the matrix + Samsung callout + Private Space callout depend on coherent doc-wide narrative.
  - **Wave 2** — Atomic same-commit retrofits in single plan: capability matrix column + Private Space row (AECOPE-02 + D-12), COBO migration-note trim (AECOPE-03 + D-21), glossary Private Space H3 + COPE see-also (AECOPE-04 + D-09), BYOD line 167 retrofit (D-10), version-matrix Private Space breakpoint H3 (D-11). All 5 surfaces ship in ONE atomic commit per D-23.

### Plan-Time Amendments (D-33..D-34)

These decisions are added in Phase 46 plan-time revision (2026-04-25) to formalize discretionary calls that downstream plans rely on. Append-only — D-01..D-32 text above is unchanged.

- **D-33** — **D-08 + D-09 verbatim text amendment per RESEARCH Pitfall 8 Option A**: Both the in-doc COPE callout (D-08) and the glossary canonical entry (D-09) use scope-tightened "Intune cannot manage" wording rather than the absolute "no admin policy lever in COPE or any other mode" claim. RESEARCH Pitfall 8 verified that Bayton documents AMAPI-native COPE deployments DO get application allowlist/blocklist policies in Private Space; only customDPC EMMs are blocked. The "no admin policy lever in COPE or any other mode" wording is correct for Intune specifically (per MS Learn Limitations) but overstates cross-EMM behavior. Plan-time amendment: substitute "**Intune cannot manage** Private Space content, visibility, or settings — there is no admin policy lever **for Intune** on COPE, COBO, BYOD, or any other Android Enterprise mode" in BOTH the in-doc callout (D-08) and glossary entry (D-09). All other text in D-08/D-09 preserved.

- **D-34** — **SC#3 "ATOMIC same-commit" interpretation LOCKED**: SC#3 verbatim "ATOMIC same-commit replacing 'deferred to v1.4.1' sentence (closes v1.4 forward promise)" is interpreted as "atomic deliverable bundle within same wave-set" per CONTEXT D-32 wave structure — NOT literal single-commit-across-Wave-1-and-Wave-2. Wave 1 (Plan 01) commits `08-cope-full-admin.md` creation. Wave 2 (Plan 02) commits the 5-file retrofit bundle in ONE atomic commit (capability matrix + COBO migration trim + glossary + BYOD line 167 + version-matrix breakpoint H3). The "atomic" requirement applies to the Wave 2 retrofit bundle (5 files in 1 commit), preserving D-23 atomicity. Phase 47 verification reads SC#3 against this interpretation. The transient broken-link window between Wave 1 commit and Wave 2 commit is acceptable because: (a) Plan 01 forward-links to glossary/version-matrix anchors that Plan 02 creates — the broken-link window closes when Plan 02 lands; (b) Phase 46 deliverable is a TWO-commit phase (Wave 1 + Wave 2), not a single-commit phase; (c) Wave 2 plan declares `depends_on: [46-01]` ensuring sequential landing. Plan-checker accepts this interpretation as the resolved-decision form of D-23 atomicity.

### Claude's Discretion (deferred to planner)

- **H3 sub-skeleton inside each H2** — defer to planner per parallel-structure-with-COBO; planner inspects COBO's H3s within each matching H2 and proposes COPE-equivalent H3s. Decision matrix slot (D-13/D-18 reconciliation), naming-template enumeration, and WPCO-mechanics rendering depth are H3/inline-table per D-05.
- **Anchor IDs** for new H2/H3s not covered by D-07 — planner picks following sibling convention.
- **`## See Also` link list contents** — planner enumerates per AECOPE-02/03/04 cross-references; discretion on link order.
- **`## Changelog` initial entry wording** — planner discretion within the v1.4.1 release entry shape; must record SC#2 NEW callout and AECOPE-03 atomic retrofit.
- **`## What Breaks Summary` entry count and ordering** — planner maps COPE-specific WPCO/Android-15-Private-Space/`afw#setup` Android 11+ removal failure modes.
- **`## Provisioning method choice` decision-matrix table format** — markdown table (per D-13 shape) inside H2; planner picks placement (sub-H3 vs sibling H2) per D-05 reconciliation guidance.
- **Exact word counts** within approximate envelope (~2000-3000 words for `08-cope-full-admin.md` per sibling COBO ~250-line shape).
- **Frontmatter `last_verified` date** — set at execute time (planner uses execute-time date per D-26).

### Folded Todos

None — `gsd-tools todo match-phase 46` returned 0 matches at discussion time (2026-04-25).

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents (researcher, planner, executor, reviewer) MUST read these before planning or implementing.**

### Requirements and Roadmap
- `.planning/REQUIREMENTS.md` lines 41-46 (AECOPE-01..04 verbatim) — 4 Phase 46 requirements with file paths, naming-template enumeration, "Android 15 Private space unmanaged callout (NEW for v1.4.1)" wording, AECOPE-03 atomic-same-commit "REPLACE" verb (load-bearing for D-21 / GA4)
- `.planning/ROADMAP.md` lines 175-186 — Phase 46 entry: Goal, 5 success criteria, context risks. SC#1 verbatim "parallel structure to `03-fully-managed-cobo.md` — enrollment profile creation, default + 65-year staging tokens, naming templates ... COPE-vs-COBO decision matrix"; SC#2 verbatim "Android 15 Private space unmanaged callout is present in the new guide (NEW for v1.4.1; not in v1.4 COBO doc)"; SC#3 verbatim "ATOMIC same-commit replacing 'deferred to v1.4.1' sentence"; SC#4 verbatim "preserve Cross-Platform Equivalences Section structure"; SC#5 verbatim banned-phrase + research gate.
- `.planning/PROJECT.md` — vision; v1.4.1 Key Decisions table (line 211: "COPE ships as FULL admin guide (Path A confirmed 2026-04-24...)" — LOCKED).
- `.planning/STATE.md` — Phase 46 research flag (Mandatory research gate BEFORE authoring; banned-phrase discipline via C9 sidecar JSON); COPE scope re-scope trigger Blocker; Path A LOCKED context.

### Phase 39 / 43 / 44 / 45 prior phase contexts (locked decisions inherited)
- `.planning/phases/44-knox-mobile-enrollment/44-CONTEXT.md` — D-02 Step 0 wait-gate H2 precedent (informational reference for this phase); D-03 anti-paste blockquote pattern (informational reference); reciprocal-pin discipline (anchor for D-19 / D-24).
- `.planning/phases/45-per-oem-aosp-expansion/45-CONTEXT.md` — D-22 sibling-departure rationale precedent (informational; not invoked because D-04 confirms 11-H2 mirror has zero departure); D-25 append-only contract precedent (anchor for D-29); D-28 source-confidence marker (anchor for D-28); D-29 informational-first audit-harness extensions (anchor for D-31).
- `.planning/phases/43-v1-4-cleanup-audit-harness-fix/43-CONTEXT.md` — D-14 60-day freshness inheritance (D-26 carry-forward); D-29 informational-first grace period (D-31 carry-forward).
- `.planning/phases/39-zero-touch-enrollment-aosp-stub/39-CONTEXT.md` — D-20 source-confidence marker regex (D-28 inheritance); D-22 research-flag verification protocol (anchor for D-25).

### Sibling shipped admin docs (Phase 46 must match patterns)
- `docs/admin-setup-android/03-fully-managed-cobo.md` — **PRIMARY SIBLING.** 11 H2s at lines 25, 38, 58, 69, 100, 128, 169, 198, 219, 231, 245. Verbatim parallel-structure target per AECOPE-01. Line 58-66 is COPE Migration Note (target of AECOPE-03 / D-21 retrofit). Line 162 is Samsung-admins callout pattern (template for D-19). Line 167-191 is Android 15 FRP H2 (sibling precedent for Android-15-specific H2 discoverability).
- `docs/admin-setup-android/02-zero-touch-portal.md` — sibling Step 0 H2 pattern; line 16 KME/ZT mutex callout (Phase 44 reciprocal pin); 11-H2 sibling parity reference.
- `docs/admin-setup-android/04-byod-work-profile.md` — line 167 Private Space prose (target of D-10 atomic retrofit).
- `docs/admin-setup-android/05-dedicated-devices.md` — `## What-breaks summary` H2; `## Renewal / Maintenance` H2 sibling.
- `docs/admin-setup-android/06-aosp-stub.md` — Scope-and-Status H2 ⚠️ blockquote pattern reference.
- `docs/admin-setup-android/07-knox-mobile-enrollment.md` — Phase 44 sibling. Line 16/61/72 KME→WPCO mode list (load-bearing for D-15/D-16/D-19 WPCO equivalence). Line 14 Knox doc reciprocal-pin precedent.

### Sibling reference matrix (Phase 46 must update per AECOPE-02)
- `docs/reference/android-capability-matrix.md` — line 11 "organized mode-first; columns = modes, rows = features"; 5 H2 sub-tables (Enrollment line 13, Configuration line 27, App Deployment line 40, Compliance line 52, Software Updates line 63); line 72-88 Cross-Platform Equivalences (D-22 NO change); line 128-135 4-platform deferral footer; line 139 `## Version History`.
- `docs/reference/aosp-oem-matrix.md` — same-phase shared-file precedent (informational; D-14 selected NOT to use shared-file pattern for COPE-vs-COBO matrix).

### Glossary canonical
- `docs/_glossary-android.md` — line 15 alphabetical index (D-09 update target); line 39-79 Ownership & Management Scope H2 with COBO/COPE/WPCO/BYOD entries (existing — DO NOT duplicate); line 47-51 COPE entry (existing); line 75-79 WPCO entry (existing — load-bearing for D-15 WPCO≡COPE equivalence); line 71 Work Profile entry (load-bearing "WPCO, formerly COPE"); line 98 KME entry (load-bearing for D-16/D-19 KME→WPCO modes list); line 145 Microsoft Store for Business "deprecated" reference (Windows context — NOT a banned-phrase violation in COPE scope); line 179 changelog entry "Google has NOT formally deprecated COPE; community shorthand incorrectly conflates 'recommended-against' with 'deprecated.'" (LOAD-BEARING corpus posture for D-17/D-31).

### Version matrix
- `docs/android-lifecycle/03-android-version-matrix.md` — line 30 BYOD row Private Space entry (D-11 retrofit target); existing Android 15 breakpoint H3 (D-11 sibling precedent); 60-day freshness (D-26 inheritance).

### v1.4.1 audit harness (Phase 43 LOCKED)
- `scripts/validation/v1.4.1-milestone-audit.mjs` — checks C2 supervision, C5 freshness, C6 PITFALL-7, C9 banned-phrase (informational-first per D-31). New Phase 46 content respects all checks.
- `scripts/validation/v1.4-audit-allowlist.json` — supervision_exemptions baseline; new Phase 46 supervision-related cross-platform bridge prose (if any) must be added as new pins per Phase 43 Plan 04 helper workflow.

### Microsoft Learn / Google primary sources (researcher MUST verify currency at plan time per D-25)
- MS Learn — Set up Intune enrollment for personally-owned Work Profile devices: https://learn.microsoft.com/en-us/intune/intune-service/enrollment/setup-corporate-work-profile (Path A confirmation source; updated 2026-04-16 per PROJECT.md Key Decision)
- MS Learn — Android Enterprise enrollment paths overview
- Google AE Help — COPE / WPCO terminology page (gate trigger for D-25)
- Android Developers release notes — Android 11 / 12 / 15 breakpoint references (`afw#setup` + NFC removal Android 11+ for COPE/WPCO; Private Space Android 15+)
- Bayton "Android 11 COPE changes" article (corpus-canonical citation per `_glossary-android.md:66`)
- MS Learn — Android Enterprise Personal Work Profile Limitations (Private Space sourcing for D-09 / D-11)
- Microsoft Intune Plan 1 / Plan 2 / Suite licensing matrix (informational; COPE scope is Plan 1+ baseline)

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `scripts/validation/v1.4.1-milestone-audit.mjs` — existing audit harness; C5 freshness + C9 banned-phrase informational-first cover Phase 46 content space. Phase 46 deliverables flow through this harness without harness modification.
- `scripts/validation/v1.4-audit-allowlist.json` — supervision_exemptions baseline; Phase 46 may need NO new pins (COPE-specific bridge-prose surface is light vs Phase 45 AOSP).
- `scripts/validation/regenerate-supervision-pins.mjs` — Tier-1/Tier-2 classifier helper. Phase 46 invokes ONLY if any Cross-Platform Equivalences bridge prose is added to COPE column (D-22 says NO new paired row, so likely NOT needed).

### Established Patterns (Phase 34/35/36/37/38/40/41/44/45 precedent)
- **11-H2 admin guide skeleton** (Key Concepts / Prerequisites / [Mode-specific] / Enrollment profile / Enrollment token / Provisioning method / Android 15 FRP / What Breaks / Renewal / See Also / Changelog) — D-01 baseline; verified across COBO 11 + ZT 11 (sibling parity).
- **Inline `> What breaks if misconfigured` blockquotes** at action points (sibling pattern in 03-fully-managed-cobo.md and 07-knox-mobile-enrollment.md).
- **Emoji-bearing blockquote callouts** for cross-portal mutex / safety warnings (`02:16` ⚠️ pattern; `06-aosp-stub.md:23` ⚠️ scope-and-status pattern; `03:162` ⚠️ Samsung-admins pattern — D-19 template; D-08 one-line `> ⚠️` Private Space callout).
- **60-day Android freshness** (`last_verified` + `review_by` = +60d) per Phase 34 D-14 (D-26 carry-forward).
- **Multi-sub-table-under-capability-H2 reference matrix shape** (sibling android/ios/macos verified) — D-12 Private Space row across all columns; D-20 column insertion in all 5 H2 sub-tables.
- **Source-confidence marker regex** `\[(HIGH|MEDIUM|LOW)(: [A-Za-z ]+)?(, last_verified \d{4}-\d{2}-\d{2})?]` (Phase 37 D-11 / Phase 39 D-20 / Phase 45 D-28) — D-28 enforcement.
- **HTML-comment subtractive deletion** for absent portal subsections (Phase 34 D-17) — applies to D-21 sentence-scoped trim if relevant for HTML-comment marker discipline.
- **Atomic same-commit unified retrofits** (Phase 42 Wave 1/2 + Phase 44 D-03 + Phase 45 D-25) — D-23 enforcement.

### Integration Points
- `docs/reference/android-capability-matrix.md` — column insertion at index 1 (D-20) + Private Space row across all columns (D-12); 5 H2 sub-tables affected.
- `docs/admin-setup-android/03-fully-managed-cobo.md:64` — sentence-scoped trim (D-21); lines 58-63 + 65-66 PRESERVED.
- `docs/admin-setup-android/04-byod-work-profile.md:167` — Private Space sentence retrofit (D-10).
- `docs/_glossary-android.md` — Private Space H3 add + alphabetical index update (D-09); see-also entries to new COPE admin doc per AECOPE-04.
- `docs/android-lifecycle/03-android-version-matrix.md` — Android 15 Private Space breakpoint H3 add (D-11); line 30 anchor link update.
- `docs/admin-setup-android/00-overview.md` Mermaid — informational reference; Phase 46 does NOT modify per D-30 (Mermaid extension is Phase 47 AEINTEG-01 atomic-rebuild scope).
- `docs/admin-setup-android/08-cope-full-admin.md` (NEW) — D-01..D-07 H2 skeleton + D-08 Private Space callout + D-13..D-18 decision matrix + D-19 Samsung-admins callout.

</code_context>

<specifics>
## Specific Ideas

- **Adversarial-review precedent (Phase 46 method)**: Phase 46 gray-area decisions resolved via 4-area 3-agent adversarial review (Finder / Adversary / Referee × 4 gray areas; 12 agents in 3 parallel waves of 4) on 2026-04-25. Method matches Phase 39 + Phase 44 + Phase 45 precedent. See `46-DISCUSSION-LOG.md` for full audit trail. Cross-area conflict between GA1 and GA2 resolved by synthesizing Wave 3 winners: GA1 H2 list reverts to true 1:1 COBO mirror (11 H2s) once GA2's single-source-of-truth pattern eliminates need for own-H2 Private Space treatment.
- **Single-source-of-truth (Pitfall 1) discovery**: Adversary GA2 surfaced existing Private Space content at `04-byod-work-profile.md:167` and `03-android-version-matrix.md:30` that Finder missed. This invalidated Finder's "Option 2B has zero CRITs" verdict and converted GA2 from "where do we put a new callout" into "how do we eliminate drift across existing touchpoints" — a substantively different question. The pattern (existing-content discovery before option-evaluation) is worth replicating in future doc-decision phases.
- **WPCO≡COPE equivalence precedent**: Adversary GA4 disproved Finder's "α1 = false KME pin" CRIT by surfacing 4 glossary-canonical anchors (`_glossary-android.md:71/75-77/98` + `07-knox-mobile-enrollment.md:16/61/72`) collectively establishing WPCO and COPE as the same Android Enterprise mode under different terminology. This converts the GA4 binary include/exclude debate into a phrasing precision decision (D-19 callout text). Future phases evaluating COPE/WPCO terminology decisions may reuse this equivalence chain.
- **Banned-phrase discipline as positive-framing rule (D-17)**: Rather than maintaining a list of phrases-to-avoid, the corpus-canonical posture (`_glossary-android.md:49`/`:179`) is stated positively: "Google has NOT formally deprecated COPE; recommend WPCO as the *provisioning name* per current Google guidance, never as a *replacement* for COPE." This positive framing is more robust than negative blocklist enforcement at author time.
- **Atomic same-commit deliverable bundle (D-23)**: Phase 46 ships AECOPE-01 + -02 + -03 + -04 + BYOD line 167 retrofit + version-matrix breakpoint H3 in ONE atomic commit. This extends the AECOPE-03 verbatim "ATOMIC same-commit with AECOPE-01" clause naturally; mirrors Phase 42 Wave 1/2 unified-rebuild atomicity. Five+ surfaces ship together or not at all.

</specifics>

<deferred>
## Deferred Ideas

- **Audit harness C9 banned-phrase check** sidecar JSON authoring — Phase 47 AEINTEG-02 owns; Phase 46 enforcement is at-author-time + plan-task-spec discipline only. Informational-first per Phase 43 D-29.
- **L1/L2 runbooks for COPE-specific failure modes** — REQUIREMENTS.md AECOPE-01..04 omits runbooks. Likely route to v1.5 if user adoption surfaces COPE-specific failure patterns distinct from existing runbooks 22 (enrollment blocked) / 23 (work profile not created) / 24 (device not enrolled).
- **4-platform unified capability comparison doc (Windows + macOS + iOS + Android)** — DEFER-08 / AECOMPARE-01, routed to v1.5 per PROJECT.md.
- **Cross-platform nav unification (Android backport into `docs/index.md`, `common-issues.md`, `quick-ref-l1.md`, `quick-ref-l2.md`)** — DEFER-07 / AENAVUNIFY-04, routed to v1.5 per PROJECT.md.
- **WPCO-as-separate-glossary-entry distinction**: corpus already collapses COPE↔WPCO as same-mode-different-name (`_glossary-android.md:75-77`); creating separate column / separate H3 / separate H2 would reify a distinction the canonical glossary explicitly rejects. Out of Phase 46 scope and out of any future phase scope.
- **Mermaid diagram in `08-cope-full-admin.md`** — Claude's discretion per `## Decisions §Claude's Discretion`; not required.
- **Same-phase shared-file `cope-vs-cobo-decision.md`** — D-14 explicitly REJECTED in favor of in-doc H2. If future v1.5+ work needs cross-document COPE/WPCO/BYOD decision support, a shared file becomes viable; not in Phase 46 scope.
- **Cross-platform analog row in capability matrix for COPE/WPCO** — D-22 NO new paired row; WPCO has no iOS/macOS/Windows analog per glossary line 79. Out of Phase 46 scope. If hypothetical future Apple analog emerges (e.g., iOS Managed Apple ID + Personal/Work split), revisit at that time.
- **What-Breaks Summary table row for Private Space** — D-08 explicitly REJECTS this (no admin lever to break; row would have to read N/A which breaks established What-Breaks pattern). Honest asymmetry preserved (FRP gets H2 + What-Breaks row because it has admin actions; Private Space gets one-line callout + cross-mode N/A row because it has none).

### Reviewed Todos (not folded)

None — `gsd-tools todo match-phase 46` returned 0 pending todos at discussion time (2026-04-25).

</deferred>

---

*Phase: 46-cope-full-admin*
*Context gathered: 2026-04-25*
*Method: 4-area 3-agent adversarial review (Finder / Adversary / Referee × 4 gray areas; 12 agents in 3 parallel waves of 4) — winners GA1=1A-true-mirror (synthesized) / GA2=2E+2G / GA3=3F / GA4=4C-refined*
