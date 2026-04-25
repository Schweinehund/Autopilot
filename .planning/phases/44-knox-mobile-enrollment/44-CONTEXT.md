# Phase 44: Knox Mobile Enrollment — Context

**Gathered:** 2026-04-25
**Status:** Ready for planning

<domain>
## Phase Boundary

Phase 44 delivers Samsung Knox Mobile Enrollment (KME) as a first-class Intune enrollment path for Samsung fleets. Scope:

- New admin guide `docs/admin-setup-android/07-knox-mobile-enrollment.md` — covers B2B account onboarding (1-2 business day gate), reseller bulk upload + Knox Deployment App (Bluetooth/NFC) for existing stock, EMM profile with Intune DPC-extras JSON, and a 5-SKU disambiguation H2 that prevents the "KME requires paid license" misconception
- New L1 runbook `docs/l1-runbooks/28-android-knox-enrollment-failed.md` (KME-specific failures; D-10 actor-boundary + D-12 three-part escalation; Play Integrity only)
- New L2 runbook `docs/l2-runbooks/22-android-knox-investigation.md` (Knox portal → Intune handoff audit; Play Integrity 3-tier verdicts; zero SafetyNet tokens)
- Capability matrix retrofit (`docs/reference/android-capability-matrix.md`): rename anchor `#deferred-knox-mobile-enrollment-row` → `#knox-mobile-enrollment-row`; populate live Knox row
- Mermaid 6-branch update in `docs/admin-setup-android/00-overview.md` (add Knox branch); Setup Sequence numbered list update
- Glossary entries in `docs/_glossary-android.md`: Knox / KME / KPE / AMAPI (WPCO already exists; do not duplicate)
- `docs/android-lifecycle/02-provisioning-methods.md#knox-mobile-enrollment` anchor populated
- Reciprocal forward-link pins: Phase 35 ZT (`02-zero-touch-portal.md:16` KME/ZT mutex callout) and Phase 36 COBO (Samsung-admins callout) point to the new admin guide; closes v1.4 forward promises

Out of scope (deferred to other phases):
- Cross-platform analogs of KME (KME is Samsung-only by design — locked context)
- BYOD Work Profile + Knox combinations (Knox does NOT support BYOD WP — locked context)
- Knox Manage / Knox Configure / Knox Suite first-class admin guides (these are Samsung-Suite product family; Phase 44 only disambiguates them, does not document procedures)
- Samsung tablet/wearable-specific KME variants (RealWear, Zebra etc. routed to Phase 45 per-OEM AOSP)

</domain>

<decisions>
## Implementation Decisions

### 5-SKU Disambiguation Table Structure (D-01)

**Decision:** Use Option 1B — five rows (KME / KPE / Knox Manage / Knox Suite / Knox Configure), with KPE row collapsing Standard|Premium into two adjacent columns.

| SKU | KPE Standard | KPE Premium | Cost | Required for KME | Intune relationship |
|---|---|---|---|---|---|
| KME | — | — | Free | YES (the deliverable itself) | Knox portal → Intune handoff |
| KPE | Free baseline | Per-device upgrade | Free / Premium tier | NOT required for KME | Plan 1+ supplies Premium transparently |
| Knox Manage | — | — | Per-device | N/A — alternative MDM | Mutually exclusive with Intune |
| Knox Suite | — | — | Per-device bundle | NOT required for KME | Bundle that includes KPE Premium |
| Knox Configure | — | — | Per-device | NOT required for KME | Independent |

**Why:** Matches REQUIREMENTS.md line 21 literal "5-SKU disambiguation table (KME / KPE / Knox Suite / Knox Manage / Knox Configure)" verbatim. Keeps the locked "free baseline; Knox Suite gates advanced; Intune supplies KPE Premium transparently" framing in a single KPE row that visually carries the hierarchy. Researcher must verify Samsung product page wording for column headers and confirm Plan 1+ KPE Premium supply is still accurate at execute time.

**Mitigation for mixed-cardinality readability:** Use consistent em-dash `—` in non-KPE Standard|Premium cells (no blanks, no `N/A`). Render the H2 as `## Knox SKU disambiguation (5 SKUs)` so the table title disambiguates count.

### B2B 1-2 Day Approval Gate UX (D-02)

**Decision:** Use Option 2A — Step 0 callout above Step 1 in Setup Steps section, BUT render it as `## Step 0 — Samsung Knox Portal B2B account approval (1-2 business days)` H2 to match the sibling pattern in `02-zero-touch-portal.md:33` (`## Step 0 — Verify Reseller Relationship`). Body explicitly tells the admin to submit on Day 0 and lists what they can productively do during the wait (read the rest of this doc; identify devices; align with reseller).

**Why:** Top-of-procedure placement gives the 1-2-day timing risk maximum visual weight as the procedure's first action. Modeling the doc as "before Day 1, do this thing that takes 1-2 days" is the strongest reader-success framing. Sibling ZT doc already establishes the H2 Step 0 pattern, so this is canonical for the doc set (Adversary disprove of Finder's "non-canonical" finding confirmed at line 33 of `02-zero-touch-portal.md`).

**Deep-link mitigation:** AEKNOX-07 reciprocal forward-links from Phase 35 ZT and Phase 36 COBO docs land readers at the H1 of `07-knox-mobile-enrollment.md`, NOT mid-doc anchors. Top-of-doc landing means readers always pass Step 0.

### DPC-Extras-JSON Cross-Paste Anti-Pattern Callout (D-03)

**Decision:** Use Option 3A — identical blockquote at the JSON-paste step in BOTH `07-knox-mobile-enrollment.md` and `02-zero-touch-portal.md`. Wrap with HTML comment marker `<!-- AEKNOX-03-shared-anti-paste-block -->` for grep discoverability and future drift detection.

```
> ⚠️ **DO NOT paste this JSON into the other portal**
> The KME and ZT DPC-extras JSON look similar but use different field names.
> Pasting ZT JSON into KME (or vice versa) silently produces a "stuck applying configuration" failure.
> If you maintain both portals: confirm the portal name in your browser tab before pasting.
```

**Why:** Identical block at point-of-action gives silent-failure protection in BOTH directions. JSON-paste is the exact moment the misuse can occur; reader must see the warning here, not in a "Common Pitfalls" section earlier in the doc (3C's fatal flaw — admitted). 3B's "if you came here from a ZT setup" conditional weakens protection for first-time configurers. The drift risk in 3A is real but mitigatable via the HTML-comment marker; sibling pattern (ZT line 16 already ships an emoji-bearing blockquote callout) supports the format.

**Implementation note:** When updating either doc later (post-v1.4.1), grep for `AEKNOX-03-shared-anti-paste-block` to find both copies and keep them synchronized. Researcher must verify whether the audit harness should grep for the marker as a C8-tier informational check (route to v1.5 backlog if so).

### Glossary Granularity (D-04)

**Decision:** Use Option 4B with WPCO dropped. Add four new entries to `docs/_glossary-android.md`:

1. `### Knox` — umbrella entry; one-paragraph description; cross-link to admin doc for SKU breakdown
2. `### KME (Knox Mobile Enrollment)` — Samsung-only, Free, Knox portal → Intune handoff, mutex with ZT for Samsung devices
3. `### KPE (Knox Platform for Enterprise)` — Standard (free baseline) / Premium (per-device upgrade); Plan 1+ supplies Premium transparently
4. `### AMAPI (Android Management API)` — Google's MDM API surface that Intune calls for AOSP and Knox enrollment paths (and post-April-2025 COBO/BYOD)

**Do NOT add:**
- A separate WPCO entry — `_glossary-android.md` already has WPCO at line 75 (verified)
- Separate entries for Knox Manage / Knox Suite / Knox Configure — covered by the umbrella Knox entry's cross-link to the admin doc's 5-SKU H2 table

**Why:** Matches AEKNOX-06 literal enumeration ("Knox / KME / KPE glossary entries (+ AMAPI if missing)"). Preserves `#kme` and `#kpe` deep-link anchors used by `reference/android-capability-matrix.md` per AEKNOX-04. 4A's umbrella collapse breaks anchors; 4C over-delivers into SKU-catalog territory beyond AEKNOX-06 scope. AMAPI scope must include AOSP + Knox + COBO/BYOD-post-April-2025 (researcher verifies).

### Claude's Discretion

- **Anchor names** for the new admin doc (`#prerequisites`, `#step-0-b2b-approval`, `#step-1-...`, `#dpc-extras-json`, `#sku-disambiguation`) — follow sibling doc conventions; planner picks final anchor slugs.
- **Knox glossary entry length** (target 1-2 sentences per peer pattern); planner can adjust based on actual prose density.
- **Mermaid branch label** for the new Knox branch in `00-overview.md` — planner picks between "Knox Mobile Enrollment" / "Knox (KME)" / "KME"; recommendation is "Knox (KME)" for full-name first / abbreviation discoverability.
- **L1/L2 runbook prominent failure modes** — D-10/D-12 patterns are locked; specific failures (B2B-account-not-approved, reseller-doesn't-show-device, KME-profile-mismatch, Knox-license-expired, DPC-extras-JSON-wrong-format) are researcher's call based on Microsoft Learn + Samsung KB sources.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase 44 inputs (locked context)
- `.planning/REQUIREMENTS.md` (search AEKNOX-01..07) — requirement enumeration; literal "5-SKU" wording in line 21
- `.planning/ROADMAP.md` §"### Phase 44: Knox Mobile Enrollment" — Goal, success criteria, context risks. Note SC#1 enumerates 6 SKUs (KME / KPE Standard / KPE Premium / Knox Manage / Knox Suite / Knox Configure) but D-01 reconciles via 5-row table with KPE Standard|Premium columns
- `.planning/PROJECT.md` — vision, principles, non-negotiables

### Sibling docs (Phase 44 must match patterns)
- `docs/admin-setup-android/02-zero-touch-portal.md` — sibling Samsung-adjacent admin guide; line 16 KME/ZT mutex callout (reciprocal pin target per AEKNOX-07); line 33 Step 0 H2 pattern (model for D-02); line 16 emoji-bearing blockquote callout pattern (model for D-03)
- `docs/admin-setup-android/03-fully-managed-cobo.md` — sibling COBO admin guide; Prerequisites H2 pattern, inline `> What breaks` callouts, Samsung-admins callout (reciprocal pin target per AEKNOX-07)
- `docs/admin-setup-android/00-overview.md` — Mermaid 5-branch chart (extend to 6); Setup Sequence numbered list (add Knox step)
- `docs/_glossary-android.md` — existing WPCO entry at line 75 (do not duplicate); existing alphabetical index pattern; cross-platform note pattern

### Validator patterns (Phase 40/41 — locked)
- `docs/l1-runbooks/27-android-zte-enrollment-failed.md` — D-10 sectioned actor-boundary + D-12 three-part escalation reference (planner reads to mirror structure for runbook 28)
- `docs/l2-runbooks/19-android-enrollment-investigation.md` — D-10/D-12 + Play Integrity 3-tier verdict structure (model for runbook 22)

### Audit harness (Phase 43 — locked)
- `scripts/validation/v1.4.1-milestone-audit.mjs` — checks C2 supervision, C5 freshness, C7 bare-Knox informational; new Knox content must respect these
- `scripts/validation/v1.4.1-audit-allowlist.json` — supervision_exemptions baseline; Knox-related supervision references (if any) must be added as new pins per Plan 04 helper workflow
- `.planning/phases/43-v1-4-cleanup-audit-harness-fix/43-CONTEXT.md` — D-25 Android-scoped lock; D-14 60-day freshness; freeze contract D-01/D-02

### Forward-looking (do NOT pre-commit content for these)
- `docs/reference/android-capability-matrix.md` lines 113-119 — `#deferred-knox-mobile-enrollment-row` to be renamed and populated per AEKNOX-04
- Phase 35 `docs/admin-setup-android/02-zero-touch-portal.md:16` — KME/ZT mutex callout (currently forward-promises Knox doc; Phase 44 closes the promise via reciprocal pin)
- Phase 36 COBO Samsung-admins callout — reciprocal pin target per AEKNOX-07

### Microsoft Learn / Samsung primary sources (researcher must verify currency at plan time)
- Samsung Knox Mobile Enrollment Guide (https://docs.samsungknox.com/admin/knox-mobile-enrollment/welcome.htm) — B2B account onboarding, reseller flow, KDA app
- Microsoft Learn — Intune Samsung Knox Mobile Enrollment configuration (search "Intune Knox Mobile Enrollment configure profile")
- Samsung Knox Platform for Enterprise (KPE) product page — Standard vs Premium feature matrix
- Samsung Knox Suite product page — bundle composition (KPE Premium + Knox Manage + Knox Configure)

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `scripts/validation/v1.4.1-milestone-audit.mjs` — audit harness; C2/C5/C7 checks already cover Knox content space. Phase 44 deliverables flow through this harness without harness modification.
- `scripts/validation/regenerate-supervision-pins.mjs` — Tier-1/Tier-2 classifier helper. If Phase 44 adds any iOS-attributed bridge prose to Knox content (e.g., comparing KME to ADE), helper's `--emit-stubs` mode surfaces stub-eligible pins.

### Established Patterns
- **Step-numbered admin guides** with `## Step N — Title` H2 sections (per `02-zero-touch-portal.md`, `03-fully-managed-cobo.md`)
- **Inline `> What breaks if misconfigured` blockquotes** at action points (COBO doc lines 52/77/79/89/93)
- **Emoji-bearing blockquote callouts** for cross-portal mutex / safety warnings (ZT line 16 ships ⚠️)
- **D-10 sectioned actor-boundary + D-12 three-part escalation** for L1/L2 runbooks (Phase 40/41 validators)
- **Play Integrity 3-tier verdicts only** in L2 investigation runbooks (zero SafetyNet)
- **60-day Android freshness** (`last_verified` + `review_by` = +60d) per Phase 34 D-14
- **Prereq → Step 0 → Step N → Verification → Common failures → Changelog** doc skeleton

### Integration Points
- `docs/reference/android-capability-matrix.md` line 113-119 — anchor rename + row population (AEKNOX-04)
- `docs/admin-setup-android/00-overview.md` Mermaid + Setup Sequence (AEKNOX-05)
- `docs/_glossary-android.md` — alphabetical index + cross-platform notes (AEKNOX-06)
- `docs/admin-setup-android/02-zero-touch-portal.md:16` — reciprocal forward-link pin (AEKNOX-07)
- `docs/admin-setup-android/03-fully-managed-cobo.md` Samsung-admins callout — reciprocal forward-link pin (AEKNOX-07)
- `docs/android-lifecycle/02-provisioning-methods.md#knox-mobile-enrollment` — anchor population

</code_context>

<specifics>
## Specific Ideas

- **Misconception focus:** the doc's primary purpose is preventing the "KME requires paid Knox license" misconception (existing internet folklore). Every editorial decision (5-SKU table structure, glossary granularity, anti-paste callout) was selected on misconception-prevention grounds, not aesthetic consistency.
- **Adversarial review precedent:** Phase 44 gray-area decisions were resolved via 3-agent adversarial review (Finder/Adversary/Referee) on 2026-04-25. See `44-DISCUSSION-LOG.md` for full audit trail. Future phases involving documentation-decision tradeoffs may benefit from the same pattern.
- **Reciprocal pin convention:** AEKNOX-07 forward-links FROM Phase 35 ZT and Phase 36 COBO TO the new Knox guide are H1-landing (no mid-doc anchors), so Step 0 placement (D-02) catches all cross-doc traffic.

</specifics>

<deferred>
## Deferred Ideas

- **Audit harness C8 informational check** for `AEKNOX-03-shared-anti-paste-block` HTML-comment marker drift detection (D-03 implementation note) — route to v1.5 backlog or Phase 47 (integration & re-audit). Out of Phase 44 scope (which is content + reciprocal pins, not harness extension).
- **Knox Manage / Knox Suite / Knox Configure first-class admin guides** — these are full Samsung-Suite product offerings; Phase 44 only disambiguates them in the 5-SKU table, does not document procedures. Future milestone if user adoption warrants.
- **Samsung tablet / wearable / Galaxy XR KME variants** — routed to Phase 45 (per-OEM AOSP) and v1.5+ backlogs, not Phase 44.
- **DPC-extras-JSON validator at lint time** (parse JSON before paste, warn on field-name mismatch) — would prevent the silent-failure entirely but requires tooling out of Phase 44 doc scope. v1.5 tooling backlog candidate.
- **Cross-platform Knox analog explainer** (e.g., "iOS equivalent of KME?" callout for readers transitioning fleets) — out of locked Samsung-only scope per ROADMAP. Future milestone if multi-platform fleets become a documented use case.

### Reviewed Todos (not folded)
None — `gsd-tools list-todos` returned 0 pending todos at discussion time (2026-04-25).

</deferred>

---

*Phase: 44-knox-mobile-enrollment*
*Context gathered: 2026-04-25*
*Method: 3-agent adversarial review (Finder / Adversary / Referee) for all 4 gray areas*
