# Phase 35: Android Prerequisites — MGP & Zero-Touch Portal - Context

**Gathered:** 2026-04-21
**Status:** Ready for planning
**Method:** Adversarial review (finder/adversary/referee scored pattern) across 27 candidate options in 9 sub-decisions (4 gray areas). 85 flaws scored; 80 confirmed real; 5 disputed, 3 ruled real / 2 false positive.

<domain>
## Phase Boundary

Phase 35 delivers four documents that stand up the two hard gates for Android Enterprise — Managed Google Play tenant binding and Zero-Touch portal configuration — so that Phases 36–39 can reference them without duplicating portal mechanics.

1. `docs/android-lifecycle/01-android-prerequisites.md` — conceptual orientation to the tri-portal surface, GMS-vs-AOSP split, and Android 12+ corporate-identifier behavior (IMEI/serial removed). (AEPREQ-01)
2. `docs/admin-setup-android/00-overview.md` — tri-portal setup sequence with per-mode portal-dependency routing. (AEPREQ-02)
3. `docs/admin-setup-android/01-managed-google-play.md` — MGP binding mechanics: Entra account preferred since August 2024, `endpoint.microsoft.com` portal, what-breaks table covering disconnect consequences. (AEPREQ-03)
4. `docs/admin-setup-android/02-zero-touch-portal.md` — ZT portal configuration: Step 0 reseller gate, DPC extras JSON, ZT↔Intune linking, KME/ZT Samsung mutual-exclusion callout. (AEPREQ-04)

Phase 35 does NOT own corporate-scale ZTE content (device-claim workflow, profile assignment at scale, reseller-upload handoff, dual-SIM IMEI 1 note). Those extend Phase 35's ZT portal doc in Phase 39 per ROADMAP Phase 39 SC1 and AEZTE-01. Phase 35 does NOT own runbook 27 (ZTE L1 triage) — that lands in Phase 40 per STATE.md v1.4 decisions.

Carrying forward from Phase 34 (locked — do not re-open):

- Tri-portal shorthand: "Intune admin center" / "Managed Google Play (MGP)" / "Zero-Touch portal (ZT portal)". Full names on first appearance per doc, shorthand thereafter.
- Mode labels: COBO (Fully Managed), BYOD (Work Profile), Dedicated (COSU), ZTE (Zero-Touch Enrollment), AOSP.
- AEAUDIT-04 guard: never use "supervision" as an Android management term.
- AEAUDIT-03 reciprocal cross-reference (`_glossary-macos.md` → `_glossary-android.md`) is Phase 42 scope — do not modify `_glossary-macos.md` in Phase 35.
- No modifications to v1.0–v1.3 shared files (PITFALL 9, PITFALL 11).
- 60-day review cycle on all Phase 35 frontmatter (faster than macOS 90-day).
- Admin template `docs/_templates/admin-template-android.md` (Phase 34 deliverable) is the structural template for the three `admin-setup-android/*.md` docs in Phase 35. The HTML-comment subtractive-deletion pattern (D-17 in Phase 34 CONTEXT) applies to the ZT portal subsection when a guide doesn't cover ZT.

</domain>

<decisions>
## Implementation Decisions

### `01-android-prerequisites.md` shape (AEPREQ-01 / SC1)

- **D-01:** **Concept-only orientation.** No setup mechanics. The doc explains what each of the three portals is, the GMS-vs-AOSP split, and Android 12+ corporate-identifier behavior — then points to `01-managed-google-play.md` and `02-zero-touch-portal.md` for mechanics. Cross-references Phase 34's `02-provisioning-methods.md` and `03-android-version-matrix.md` for methods and version gates. *Winner of Area 1 adversarial review (1A: 0 CRIT / 1 MED / 4 LOW) over 1B (summary+routing: 0 CRIT / 2 MED / 3 LOW) and 1C (standalone-depth: 1 CRIT / 2 MED / 2 LOW). 1B rejected for inherent Anti-Pattern 1 duplication (F-007 MED) and SC1 "understand" weakness (F-008 MED); 1C rejected for direct Anti-Pattern 1 violation (F-012 CRIT).*
- **D-02:** **No admin decisions in this doc.** Because the doc is concept-only, SC5 ("callouts inline at point of admin decision") is vacuously satisfied here — callouts live in the two standalone guides where decisions are made.
- **D-03:** **Android 12+ IMEI/serial assertion must be version-tagged inline** (PITFALL 1 discipline). Reference the Phase 34 version matrix as the canonical source; do NOT restate version-gate details that belong in `03-android-version-matrix.md`. The prerequisites doc surfaces the concrete admin consequence ("corporate identifiers no longer accept IMEI/serial starting Android 12") with a single link back to the matrix.
- **D-04:** **GMS-vs-AOSP split is a dedicated subsection**, not a column in a matrix. Explains that GMS modes (COBO, BYOD WP, Dedicated, ZTE) require MGP binding; AOSP uses neither MGP nor ZT portal; ZTE additionally requires ZT portal. One-line forward-reference to Phase 39 AOSP stub — do not deep-dive AOSP here.
- **D-05:** **Stable anchors** (downstream Phase 36–42 docs depend on these): `#tri-portal-surface`, `#gms-vs-aosp-split`, `#android-12-corporate-identifiers`, `#portal-dependencies-by-mode`.
- **D-06:** **Target length 600–900 words** — shorter than Phase 34's 800–1200-word enrollment overview because this doc does not carry the axis-explanation narrative.

### `00-overview.md` setup-sequence representation (AEPREQ-02 / SC2)

- **D-07:** **Single mermaid flowchart** modeled on `docs/admin-setup-ios/00-overview.md` and `docs/admin-setup-macos/00-overview.md`. Root node "Admin lands here" branches on "Choose your mode": COBO / BYOD WP / Dedicated → all converge through `01-managed-google-play.md` → then into mode-specific Phase 36/37/38 admin guides; ZTE → through MGP + `02-zero-touch-portal.md` → Phase 39 admin content; AOSP → Phase 39 stub directly (neither portal). *Winner of Area 2 adversarial review (2A: 0 CRIT / 1 MED / 2 LOW) over 2B (per-mode tables: 1 CRIT / 2 MED / 2 LOW) and 2C (hybrid: 0 CRIT / 1 MED / 3 LOW). 2B rejected for Anti-Pattern 1 (F-021 CRIT: MGP duplicated across 4 tables).*
- **D-08:** **Numbered list per branch** accompanies the mermaid, one list per admin path (COBO-path, BYOD-path, Dedicated-path, ZTE-path, AOSP-path). Each list entry is a one-line capsule linking to the canonical guide. Lists must not duplicate guide content.
- **D-09:** **Prerequisites checklists split by path** — same pattern as `docs/admin-setup-ios/00-overview.md` ADE-Path-Prerequisites / BYOD-Path-Prerequisites. Four checklists: GMS-path (COBO/BYOD/Dedicated), ZTE-path, AOSP-path, all-paths-shared (Intune Plan 1, Intune Administrator role, Entra tenant).
- **D-10:** **Portal Navigation Note** at the bottom of the overview, mirroring iOS 00-overview's portal-navigation-note section. This is the single location for the `endpoint.microsoft.com` vs `intune.microsoft.com` redirect reminder at overview-level; the full what-breaks callout for the wrong-URL case lives inline in `01-managed-google-play.md`.
- **D-11:** **Stable anchors**: `#choose-your-mode`, `#gms-path-prerequisites`, `#zte-path-prerequisites`, `#aosp-path-prerequisites`, `#portal-navigation-note`.

### `01-managed-google-play.md` (AEPREQ-03 / SC3)

- **D-12:** **What-breaks table uses hybrid granularity** — failure-mode rows with an explicit "Downstream impact" column listing which modes break per failure. *Winner of Sub-decision 3a adversarial review (3a-iii: 0 CRIT / 0 MED / 3 LOW) over 3a-i (0 CRIT / 1 MED / 2 LOW) and 3a-ii (1 CRIT / 1 MED / 1 LOW). 3a-ii rejected because per-mode-impact-only rows violate PITFALL 2 explicit "Row per failure mode" (F-033 CRIT); 3a-i rejected because failure-mode-only rows miss SC3 blast-radius requirement (F-030 MED).*

  Required rows (at minimum): wrong portal URL (`intune.microsoft.com` used), wrong account type (Google Workspace / G-Suite), binding disconnected, app assignment lost post-binding. Required "Downstream impact" column values: which of {COBO, BYOD WP, Dedicated, ZTE-GMS-path, AOSP} break and by what mechanism.

- **D-13:** **Entra-preferred-since-August-2024 uses BOTH a dedicated "Account types" subsection AND an inline reminder at the account-selection step.** Subsection carries the three-row comparison table (Entra preferred / consumer Gmail still works / Google Workspace fails); inline reminder is a one-line blockquote at the portal-step where the admin selects the account. *Winner of Sub-decision 3b adversarial review (3b-iii: 0 CRIT / 0 MED / 2 LOW) over 3b-i (inline-only: 0 CRIT / 1 MED / 2 LOW) and 3b-ii (subsection-only: 0 CRIT / 0 MED / 3 LOW). 3b-i rejected because single inline callout is skippable on non-linear skim (F-039 MED, PITFALL 2 warning sign).*
- **D-14:** **Pre-August-2024 consumer Gmail bindings: deferred cross-reference stub.** A one-line "See also" pointing to a v1.4.1 placeholder (e.g., "Binding migration for legacy Google/Gmail bindings — tracked for v1.4.1"). Phase 35 does NOT document migration mechanics. *Winner of Sub-decision 3c adversarial review (3c-ii: 0 CRIT / 1 MED / 1 LOW) over 3c-i (in-scope migration: 0 CRIT / 2 MED / 1 LOW) and 3c-iii (out-of-scope "continues to work": 0 CRIT / 1 MED / 2 LOW). 3c-i rejected for scope creep (F-047 MED) + research-verification burden (F-048 MED).*

  **Stub target:** Point the "See also" stub to a named section in `PROJECT.md` or to the v1.4.1 deferred-items list — whichever exists at author time. If neither exists, the stub reads: "Binding migration for pre-August-2024 consumer Google/Gmail bindings is tracked for v1.4.1 and is out of scope for v1.4." This resolves F-050 (dangling cross-ref) by making the reference text-only rather than a hyperlink to a nonexistent doc.

- **D-15:** **Portal URL specificity**: every portal-step reference in this guide uses the full URL `endpoint.microsoft.com` — never bare "Intune admin center" without the URL when the `intune.microsoft.com` redirect is in play. PITFALL 2 warning sign.
- **D-16:** **Disconnect-consequence callout placement**: inline at the binding step AND in the what-breaks table "binding disconnected" row. This is the highest-blast-radius failure mode (all GMS app assignments lost) — per PITFALL 2, treat as critical-path callout.
- **D-17:** **Stable anchors**: `#prerequisites`, `#account-types`, `#bind-mgp`, `#what-breaks`, `#disconnect-consequences`, `#renewal-maintenance`.
- **D-18:** **Frontmatter**: `platform: Android`, `audience: admin`, `applies_to: GMS-modes`, `last_verified: YYYY-MM-DD`, `review_by: YYYY-MM-DD` (60-day review cycle).

### `02-zero-touch-portal.md` (AEPREQ-04 / SC4)

- **D-19:** **Step 0 reseller gate uses BOTH a top-of-page prerequisites blockquote AND a numbered "Step 0 — Verify reseller relationship" section** as the first numbered step. *Winner of Sub-decision 4a adversarial review (4a-iii: 0 CRIT / 0 MED / 2 LOW) over 4a-ii (Step 0 section only: 0 CRIT / 0 MED / 2 LOW) and 4a-i (blockquote only: 1 CRIT / 1 MED / 1 LOW). 4a-i rejected because a top-of-page blockquote alone fails PITFALL 4 "Include a reseller eligibility check as Step 0" and SC4 "starts at Step 0" (F-055 CRIT). 4a-iii chosen over 4a-ii because it matches SC4 phrasing literally AND satisfies PITFALL 4 warning-sign guard.*

  **Blockquote content** (top of page): "Devices must be purchased from an authorized Zero-Touch reseller. Self-registration of existing stock is not supported. Devices deregistered from Zero-Touch cannot be re-registered without reseller involvement. See Step 0 below."

  **Step 0 section content**: reseller-eligibility checklist, how to verify reseller status with the device vendor, what to do if reseller relationship is not in place (cannot proceed — enroll via COBO QR/NFC/afw#setup or defer to corporate procurement).

- **D-20:** **DPC extras JSON: commented skeleton** showing required vs optional fields with inline references to Microsoft Learn (authoritative for Intune-specific extras) and Google AE Help (authoritative for the underlying `android.app.extra.PROVISIONING_ADMIN_EXTRAS_BUNDLE` schema). Skeleton uses JSON `//` comments removed on copy, OR a "Fields reference" table adjacent to the skeleton rather than in-JSON comments (to avoid F-070 copy-paste-with-comments risk). *Winner of Sub-decision 4b adversarial review (4b-iii: 0 CRIT / 0 MED / 3 LOW) over 4b-i (full runnable: 0 CRIT / 1 MED / 2 LOW) and 4b-ii (schema+link: 0 CRIT / 1 MED / 2 LOW). 4b-i rejected for research-flag stale-JSON risk (F-062 MED); 4b-ii rejected for cross-phase scope ambiguity (F-065 MED) and weak SC4 "configures DPC extras JSON" satisfaction (F-067 LOW).*

  **Required fields in skeleton**: DPC package name (`com.google.android.apps.work.clouddpc`), `android.app.extra.PROVISIONING_ADMIN_EXTRAS_BUNDLE` wrapper, Intune-specific tenant identifier value (placeholder).

  **Research flag**: DPC extras JSON schema is a plan-time research flag per STATE.md — verify against current Microsoft Learn and Google AE Help at plan/execute time. If schema has changed post-research (2026-04-19), update skeleton accordingly before publish.

- **D-21:** **KME/ZT Samsung mutual-exclusion callout: both a top-of-doc warning box AND an inline callout** at the natural decision point within Phase 35's scope (the ZT-Intune linking step, where Samsung-device admins are making commitment decisions). *Winner of Sub-decision 4c adversarial review (4c-iii: 0 CRIT / 0 MED / 2 LOW) over 4c-ii (inline-only: 0 CRIT / 0 MED / 2 LOW) and 4c-i (top-only: 0 CRIT / 1 MED / 1 LOW). 4c-i rejected because a top-of-doc warning box is a "separate gotchas section" per SC5 (F-071 MED).*

  **Top warning placement**: a single `> ⚠️ KME/ZT mutual exclusion` blockquote positioned at top but framed as a cross-phase forward-reference, not a gotchas section — the warning identifies the decision the admin must make ("for Samsung fleets: choose KME or ZT, never both") rather than enumerating gotchas.

  **Inline placement**: at the ZT-Intune linking step, a one-line callout reminding Samsung admins to confirm KME is not also in use for the same device set.

  **Full device-claim-step callout** (where Samsung admins claim devices into ZT) lives in Phase 39 per D-22 below.

- **D-22:** **Phase 35 / Phase 39 scope split (locked).** *Winner of Sub-decision 4d adversarial review (4d-i: 0 CRIT / 1 MED / 2 LOW) over 4d-ii (Phase 35 owns all ZT admin: 1 CRIT / 1 MED / 1 LOW) and 4d-iii (Phase 35 = portal setup only: 1 CRIT / 1 MED / 1 LOW). 4d-ii rejected for contradicting ROADMAP Phase 39 SC1 "extending the Phase 35 ZT portal doc" (F-080 CRIT); 4d-iii rejected for contradicting AEPREQ-04 / SC4 explicit "configures DPC extras JSON" in Phase 35 (F-083 CRIT).*

  **Phase 35 owns** (this doc): portal account creation, ZT↔Intune linking, DPC extras JSON configuration, Step 0 reseller gate, KME/ZT mutual-exclusion surface-level forward-reference, network-dependency note (device needs internet before first boot), single-org-to-account-link constraint.

  **Phase 39 extends** (same doc, different sections or new content in Phase 39 PLANs): reseller-upload handoff workflow, device claim workflow, profile assignment at scale, dual-SIM IMEI 1 registration note, full KME/ZT mutual-exclusion callout at device-claim step, configuration-must-be-assigned gotcha.

  **Phase 40 owns** (not this doc): ZTE L1 triage runbook 27 per STATE.md v1.4 decision.

- **D-23:** **Stable anchors**: `#prerequisites`, `#step-0-reseller`, `#create-zt-account`, `#dpc-extras-json`, `#link-zt-to-intune`, `#kme-zt-mutual-exclusion`, `#renewal-maintenance`. Phase 39 will append anchors `#device-claim-workflow`, `#profile-assignment`, `#dual-sim-imei-1`, `#reseller-upload-handoff` — these must not collide with Phase 35's anchor namespace.
- **D-24:** **Frontmatter**: `platform: Android`, `audience: admin`, `applies_to: ZTE`, `last_verified: YYYY-MM-DD`, `review_by: YYYY-MM-DD` (60-day review cycle).
- **D-25:** **Research flags to verify at plan/execute time** (from STATE.md): ZT portal UI navigation paths (portal has history of redesigns — verify `enterprise.google.com/android/zero-touch/customers` current state before writing portal-step descriptions); enrollment token expiry language (90-day max is MEDIUM confidence — not in current MS Learn; label MEDIUM with explicit `last_verified` date if retained); DPC extras JSON schema (verify against current Google AE Help and MS Learn).

### Research-flag verification protocol (locked for Phase 35)

- **D-26:** Plan-phase researcher MUST run plan-time verification for all three research flags listed in STATE.md for Phase 35 before authoring tasks. Findings are recorded in the phase RESEARCH.md.
- **D-27:** Executor re-verifies at execute time for any assertion that is portal-UI-specific (ZT portal layout, Intune admin center breadcrumb paths). Any unverifiable MEDIUM-confidence assertion is labeled inline with `MEDIUM confidence` + `last_verified: YYYY-MM-DD`.
- **D-28:** If the 90-day enrollment token expiry cannot be verified against current MS Learn at plan/execute time, it is either (a) omitted entirely from Phase 35 content with a note in RESEARCH.md that it remains to verify, or (b) documented with explicit MEDIUM-confidence labeling citing community consensus. Never stated as authoritative without verification.

### Claude's Discretion

- Exact word counts within the 600–900-word target for `01-android-prerequisites.md`; 800–1200 target for admin guides (matching v1.3 precedent).
- Whether the DPC extras JSON skeleton uses a "Fields reference" table adjacent to the skeleton (preferred per D-20) or inline JSON comments with an explicit "remove comments before use" warning.
- Exact phrasing of the Step 0 blockquote at top vs the Step 0 numbered section — avoid verbatim duplication; blockquote is decision-framing, Step 0 section is execution.
- Whether to include a mermaid diagram in `02-zero-touch-portal.md` (Step 0 → Create → Link → Configure DPC → Assign) — not required, author's call.
- Per-term cross-platform callouts in these Phase 35 docs that reference Phase 34 `_glossary-android.md` anchors (e.g., MGP, Zero-Touch, DPC) use the standard "see `_glossary-android.md#anchor`" pattern established in Phase 34 D-10.
- How the what-breaks table rows are ordered (severity-descending recommended).

### Folded Todos

None — `gsd-tools todo match-phase 35` returned zero matches.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents (researcher, planner, executor, reviewer) MUST read these before planning or implementing.**

### Requirements and Roadmap

- `.planning/REQUIREMENTS.md` — AEPREQ-01 through AEPREQ-04 verbatim; AEZTE-01 (Phase 39 extension scope); traceability table
- `.planning/ROADMAP.md` — Phase 35 entry lines 110-121 (goal, depends on Phase 34, SC1–5); Phase 39 entry lines 162-173 (ZTE extends Phase 35 ZT portal doc); Phase 40 entry (runbook 27 placement)
- `.planning/PROJECT.md` — v1.4 scope, tri-portal admin template decision, deferred items (Knox ME / AOSP full / nav-unification / 4-platform comparison)
- `.planning/STATE.md` — Phase 35 research flags to verify at plan time; v1.4 decisions including "ZTE L1 runbook 27 lands in Phase 40"

### v1.4 Android Enterprise Research (all 2026-04-19)

- `.planning/research/FEATURES.md` — tri-portal model (Intune + MGP + ZT portal), table-stakes vs differentiators, MGP binding as foundational prereq (FCM/Play Integrity/Entra ID context)
- `.planning/research/ARCHITECTURE.md` — tri-portal template H4 structure (Phase 34 D-16..D-22 delivers), prerequisite DAG (MGP gate → all GMS modes; ZT portal gate → ZTE), Anti-Pattern 1 (single canonical reference)
- `.planning/research/PITFALLS.md` — PITFALL 1 (version decay / drift), PITFALL 2 (MGP binding footnote / what-breaks table required), PITFALL 4 (ZT reseller Step 0 upfront / dual-SIM IMEI 1 / KME exclusion), PITFALL 5 (provisioning method misrouting), PITFALL 9 (append-only; no v1.0–v1.3 shared file mods), PITFALL 10 (template-first constraint), PITFALL 11 (shared-file modification guard)
- `.planning/research/SUMMARY.md` — Phase 35 section (MGP binding + ZT prerequisites rationale, research flags: ZT portal UI / enrollment token / COPE language), confidence assessment, open questions for plan-time
- `.planning/research/STACK.md` — portal URLs (`endpoint.microsoft.com`, `play.google.com/work`, `enterprise.google.com/android/zero-touch/customers`), frontmatter conventions, 60-day review cycle

### Phase 34 Foundation (just shipped — locked decisions feed Phase 35)

- `.planning/phases/34-android-foundation/34-CONTEXT.md` — Phase 34 locked decisions: tri-portal shorthand (MGP / ZT portal), mode labels (COBO / BYOD WP / Dedicated / ZTE / AOSP), AEAUDIT-04 no-"supervision" guard, 60-day review cycle, AOSP forward-reference to Phase 39, HTML-comment subtractive-deletion pattern (D-17)
- `docs/_glossary-android.md` (Phase 34 deliverable) — term anchors for cross-reference: `#mgp`, `#zero-touch-enrollment`, `#dpc`, `#fully-managed`, `#work-profile`, `#dedicated`, `#aosp`, `#play-integrity`, `#amapi`
- `docs/_templates/admin-template-android.md` (Phase 34 deliverable) — structural template for `01-managed-google-play.md` and `02-zero-touch-portal.md` and `00-overview.md`; H4 sub-section convention
- `docs/android-lifecycle/00-enrollment-overview.md` (Phase 34 deliverable) — 5-column mode-comparison table, ownership × management-scope axes; cross-reference target for `01-android-prerequisites.md`
- `docs/android-lifecycle/02-provisioning-methods.md` (Phase 34 deliverable) — 5×4 provisioning matrix; cross-reference target when Phase 35 docs mention method choices
- `docs/android-lifecycle/03-android-version-matrix.md` (Phase 34 deliverable) — version breakpoints (Android 11 COPE NFC removal, Android 12 IMEI/serial removal from corporate identifiers, Android 15 FRP hardening); `01-android-prerequisites.md` links here for the IMEI/serial assertion

### v1.3 Validated Precedents (structural templates)

- `docs/admin-setup-ios/00-overview.md` — **PRIMARY structural template** for `docs/admin-setup-android/00-overview.md` (mermaid flowchart + path-split prerequisites + Portal Navigation Note at bottom)
- `docs/admin-setup-macos/00-overview.md` — secondary template for dual-portal variant of the overview pattern
- `docs/admin-setup-ios/02-abm-token.md` — cross-reference pattern precedent (per-section summary + link to canonical guide + platform-specific differences inline). Not directly applicable to Phase 35 (no canonical cross-guide to reference), but the structure is useful for the D-12 what-breaks hybrid table pattern.
- `docs/admin-setup-macos/01-abm-configuration.md` — structural template for `docs/admin-setup-android/01-managed-google-play.md` (portal steps + what-breaks callouts)
- `docs/_templates/admin-template-ios.md`, `docs/_templates/admin-template-macos.md` — HTML-comment subtractive-deletion pattern (Phase 34 D-17); the ZT portal subsection in `admin-template-android.md` uses the same pattern

### Cross-Platform Navigation (for awareness only — NOT modified in Phase 35)

- `docs/index.md` — navigation hub (Android stub integration deferred to Phase 42)
- `docs/common-issues.md`, `docs/quick-ref-l1.md`, `docs/quick-ref-l2.md` — cross-platform routing (Android integration deferred post-v1.4 per PROJECT.md)
- `docs/_glossary-macos.md` — see-also cross-reference back to `_glossary-android.md` is Phase 42 (AEAUDIT-03) scope

### Adversarial Review Artifact

- `.planning/phases/35-android-prerequisites-mgp-zero-touch-portal/35-DISCUSSION-LOG.md` — full adversarial-review audit trail (finder / adversary / referee verdicts; all 85 flaws scored; 5 disputed rulings)

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets (from Phase 34 + v1.0–v1.3)

- **Admin template** (`docs/_templates/admin-template-android.md`, Phase 34) — drives the three `admin-setup-android/*.md` docs in Phase 35. H4 sub-sections (Intune admin center / MGP / ZT portal). ZT portal H4 section deleted from `01-managed-google-play.md` via HTML-comment subtractive pattern; kept in `02-zero-touch-portal.md`.
- **Android glossary** (`docs/_glossary-android.md`, Phase 34) — term anchors for `#mgp`, `#zero-touch-enrollment`, `#dpc`, `#fully-managed` cross-references in Phase 35 prose.
- **Enrollment overview** (`docs/android-lifecycle/00-enrollment-overview.md`, Phase 34) — cross-reference target for `#fully-managed`, `#work-profile`, `#dedicated`, `#aosp`, `#two-axes` anchors when Phase 35 docs reference modes.
- **Version matrix** (`docs/android-lifecycle/03-android-version-matrix.md`, Phase 34) — single-source for Android 12+ IMEI/serial assertion; Phase 35 `01-android-prerequisites.md` links here (D-03).
- **Provisioning-method matrix** (`docs/android-lifecycle/02-provisioning-methods.md`, Phase 34) — single-source for method support per mode; Phase 35 references for COBO/Dedicated method options (no duplication).
- **Frontmatter schema** — `last_verified`, `review_by`, `platform`, `audience`, `applies_to` — established across 118 docs. Phase 35 uses `platform: Android`, `audience: admin`, `applies_to: GMS-modes` (for MGP doc) / `applies_to: ZTE` (for ZT portal doc) / `applies_to: all` (for overview and prerequisites docs).
- **"What breaks if misconfigured" callout convention** — from `admin-template-macos.md` / `admin-template-ios.md`, inherited into `admin-template-android.md` (Phase 34 D-19). Phase 35 uses this pattern extensively in MGP and ZT portal docs.
- **Platform gate blockquote pattern** — standard opening for all platform-specific docs; Phase 35 docs use "`> **Platform gate:** This guide covers Android Enterprise [scope]. For [other-platform], see [link].`"
- **HTML-comment subtractive-deletion pattern** — `<!-- Include the 'In Zero-Touch portal' subsection ONLY if ... -->` from Phase 34 D-17. `01-managed-google-play.md` deletes the ZT portal H4 section; `02-zero-touch-portal.md` keeps it.
- **Mermaid flowchart pattern** — from `docs/admin-setup-ios/00-overview.md` lines 19–31 and `docs/admin-setup-macos/00-overview.md`. Phase 35 `00-overview.md` uses the same pattern with 5-mode branching.
- **5-column comparison table pattern** — from `docs/ios-lifecycle/00-enrollment-overview.md` lines 31–36. Not used in Phase 35 directly (Phase 34 owns that table), but the hybrid what-breaks table in `01-managed-google-play.md` (D-12) inherits the column-density precedent.
- **iOS prerequisites-split pattern** — `docs/admin-setup-ios/00-overview.md` lines 51–73 (ADE-Path-Prerequisites + BYOD-Path-Prerequisites). Phase 35 `00-overview.md` uses the same pattern with GMS-Path / ZTE-Path / AOSP-Path / Shared checklists (D-09).

### Established Patterns

- **60-day review cycle for fast-moving platforms** — iOS uses 60-day; Android per SUMMARY.md also 60-day. Phase 35 frontmatter inherits.
- **Source-hierarchy confidence attribution** — HIGH: Google Android Enterprise Help; MEDIUM: Microsoft Learn Android docs; MEDIUM: Jason Bayton; LOW: community blogs. Phase 35 MEDIUM-confidence assertions (90-day enrollment token) carry explicit labels + `last_verified` date.
- **Anti-Pattern 1 guard** — matrices live in single canonical reference docs, not duplicated into mode guides. Phase 35 rigorously enforces this: `01-android-prerequisites.md` does NOT duplicate mechanics from `01-managed-google-play.md` or `02-zero-touch-portal.md`.
- **PITFALL 2 what-breaks table required** — MGP binding doc must carry a structured what-breaks table (D-12 hybrid granularity) covering wrong URL / wrong account type / disconnect / Workspace-used.
- **PITFALL 4 Step 0 reseller upfront** — ZT portal doc must open with Step 0 reseller gate (D-19 dual-placement).
- **PITFALL 5 provisioning-method misrouting guard** — Phase 35 docs reference Phase 34's provisioning-method matrix for method choices, never duplicate the matrix rows.
- **SC5 inline-at-decision callout guard** — all what-breaks and mutual-exclusion callouts are placed at the point of admin decision; `01-android-prerequisites.md` is a concept-only doc with no admin decisions and no inline callouts (D-02), so SC5 is vacuously satisfied for that doc.

### Integration Points

- `docs/android-lifecycle/` — directory created in Phase 34; Phase 35 adds `01-android-prerequisites.md`. File numbering: 00 (Phase 34), 01 (Phase 35), 02 (Phase 34), 03 (Phase 34) — non-contiguous numbering preserved across Phase 34/35 boundary.
- `docs/admin-setup-android/` — directory created in Phase 35 (NOT Phase 34 per Phase 34 CONTEXT D-22). Phase 35 adds the first three files: `00-overview.md`, `01-managed-google-play.md`, `02-zero-touch-portal.md`. Phase 36 continues with `03-fully-managed-cobo.md`; Phase 37 adds `04-byod-work-profile.md`; Phase 38 adds `05-dedicated-devices.md`; Phase 39 adds `06-aosp-stub.md`.
- **Anchor stability contract with Phase 36–42**: the anchors listed in D-05, D-11, D-17, D-23 are consumed by downstream admin guides and runbooks. Renaming or removing these anchors in Phase 35 breaks Phase 36–42 cross-references — treat as a stability contract.
- **Phase 39 extension contract** (D-22): Phase 39 appends content to `02-zero-touch-portal.md` (device-claim workflow, profile assignment at scale, dual-SIM IMEI 1, reseller-upload handoff, full KME/ZT callout at device-claim). Phase 35 reserves anchor namespace accordingly — Phase 39 anchors (`#device-claim-workflow`, `#profile-assignment`, `#dual-sim-imei-1`, `#reseller-upload-handoff`) must not collide with Phase 35's.
- **Phase 34 admin-template verification**: before Phase 35 PLAN authoring, confirm `docs/_templates/admin-template-android.md` is merged (Phase 34 is currently executing per STATE.md — Phase 35 depends on Phase 34 completion). If Phase 34 is incomplete when Phase 35 planning runs, defer admin-guide PLANs until the template is available.

</code_context>

<specifics>
## Specific Ideas

### From Adversarial Review Evidence

- **Concept-only orientation for `01-android-prerequisites.md`**: the doc is explicitly NOT an admin guide and NOT a mechanics guide. It is an orientation read by admins who need to know WHY the tri-portal surface exists, WHICH portal does what, and WHEN the Android 12+ IMEI/serial behavior matters for their mode choice. All mechanics live in the two standalone admin guides. Length target 600–900 words reflects this slim scope.
- **Single mermaid flowchart for `00-overview.md`**: the diagram is the navigation artifact. Five mode branches: COBO / BYOD WP / Dedicated → converge at MGP → mode-specific admin guides; ZTE → MGP + ZT portal → Phase 39 admin content; AOSP → Phase 39 stub (no portal). Numbered list accompanies the diagram but does NOT duplicate guide content — each list entry is a one-line capsule linking to the canonical guide.
- **Hybrid what-breaks table in MGP doc**: failure-mode rows ("Wrong portal URL used" / "Google Workspace account used" / "Binding disconnected" / "Wrong-account-type binding attempted") with an explicit "Downstream impact" column ("COBO / BYOD WP / Dedicated broken; apps lost" / "Binding fails; retry with Entra account" / etc.). PITFALL 2 satisfaction + SC3 blast-radius satisfaction in a single artifact.
- **Step 0 dual-placement for ZT portal doc**: top-of-page blockquote frames the decision ("devices must be purchased from authorized reseller; self-registration not supported"), then numbered Step 0 section executes the verification ("confirm reseller relationship with device vendor; if not in place, STOP and defer to corporate procurement or use COBO QR/NFC/afw#setup"). The blockquote is decision-framing; the Step 0 section is execution.
- **DPC extras JSON commented skeleton**: JSON skeleton with inline comments that an adjacent "Fields reference" table resolves. The Fields reference table lists each JSON key, its required/optional status, its source (MS Learn link for Intune-specific keys; Google AE Help link for the underlying schema), and plan-time verification requirement. Skeleton is expected to be copy-paste-modified, not copy-paste-as-is; the table gives admins what they need to customize for their tenant.
- **Phase 35 / Phase 39 split for ZT portal content**: Phase 35's `02-zero-touch-portal.md` ships with the portal-setup and DPC-extras content. Phase 39 will append (same file, new sections) the corporate-scale content. Stable anchor namespace is contract-level — Phase 35 reserves `#step-0-reseller`, `#create-zt-account`, `#dpc-extras-json`, `#link-zt-to-intune`, `#kme-zt-mutual-exclusion` for its content and does NOT use `#device-claim-workflow`, `#profile-assignment`, `#dual-sim-imei-1`, `#reseller-upload-handoff` (those are Phase 39's).

### Cross-Platform Callout Pattern (inherited from Phase 34)

Each Phase 35 doc that references an Android term defined in `_glossary-android.md` uses:

```markdown
[Android-native term description.]

> **Cross-platform note:** On [Windows/macOS/iOS], "[term]" refers to [different
> concept]. See [sibling glossary link]. Do not conflate.
```

Phase 35 applies this to: MGP (no Windows/macOS/iOS equivalent — note absent), Zero-Touch Enrollment (contrast with Apple ADE — explicit analog note), DPC (no iOS/macOS analog), Managed Google Play (contrast with Apple VPP — explicit analog note).

### What-Breaks Table Row Pattern (from macOS/iOS admin templates, extended for Phase 35 hybrid)

```markdown
| Failure mode | What happens | Downstream impact (modes broken) | Recovery |
|-------------|--------------|----------------------------------|----------|
| Wrong portal URL used (`intune.microsoft.com`) | Binding redirect loops or fails silently | None — no binding created | Use `endpoint.microsoft.com` |
| Google Workspace account used | Binding fails with opaque error | None — no binding created | Use Entra account (preferred) or consumer Gmail |
| Consumer Gmail used post-August-2024 | Binding succeeds but Entra-preference path not taken | All GMS modes work but future migration required | Bind fresh with Entra account |
| Binding disconnected | All app assignments lost, OEMConfig assignments lost, LOB app availability lost instantly | **CRITICAL**: COBO broken; BYOD WP broken; Dedicated broken; ZTE-GMS-path broken; AOSP unaffected | Re-bind; reassign every app and config manually |
```

</specifics>

<deferred>
## Deferred Ideas

Ideas that surfaced during the adversarial review but belong in other phases, other milestones, or separate tracking:

- **Pre-August-2024 consumer Google/Gmail binding migration path** — deferred to v1.4.1 per D-14. Phase 35 notes this as a "See also" stub with text-only reference (not a hyperlink to a nonexistent doc).
- **Full DPC extras JSON example with tenant-specific Intune values** — deferred; Phase 35 ships a commented skeleton per D-20. A full runnable example requires per-tenant adaptation which is out of scope for generic docs.
- **ZT portal corporate-scale content** (device-claim workflow, profile assignment at scale, reseller-upload handoff, dual-SIM IMEI 1 registration note, configuration-must-be-assigned gotcha) — deferred to Phase 39 per D-22 and ROADMAP Phase 39 SC1.
- **ZTE L1 triage runbook 27** — deferred to Phase 40 per STATE.md v1.4 decisions (L1 triage aggregation).
- **COPE migration language and Android 15 FRP callout** — not Phase 35 scope; belongs in Phase 36 COBO admin guide per AECOBO-02 / AECOBO-03.
- **Knox Mobile Enrollment (KME) full admin path** — deferred to v1.4.1 per PROJECT.md Key Decisions. Phase 35's `02-zero-touch-portal.md` carries only the KME/ZT mutual-exclusion callout (D-21) pointing to v1.4.1 for full KME coverage.
- **BYOD-specific enrollment restrictions and privacy-boundary table** — not Phase 35 scope; belongs in Phase 37 BYOD admin guide per AEBYOD-01.
- **Managed Home Screen exit-PIN sync callout** — not Phase 35 scope; belongs in Phase 38 Dedicated admin guide per AEDED-02.
- **Cross-platform nav integration** (Android stub in `docs/index.md`, `common-issues.md`, quick-refs) — deferred to post-v1.4 unification task per PROJECT.md. Phase 35 does NOT modify v1.0–v1.3 shared files.
- **Reciprocal `_glossary-macos.md` → `_glossary-android.md` cross-reference** — deferred to Phase 42 (AEAUDIT-03). Phase 35 does NOT modify `_glossary-macos.md`.
- **Full Android Enterprise FRP (EFRP) documentation** — belongs in Phase 36 (COBO) and Phase 38 (Dedicated) per AECOBO-03 / AEDED-03. Phase 35 does not cover FRP.
- **Play Integrity verdict depth documentation** — belongs in Phase 41 L2 compliance runbook per AEL2-04. Phase 35 does not cover compliance attestation.
- **Enrollment token 90-day expiry authoritative statement** — pending plan-time verification per D-28. If unverifiable at plan/execute time, the assertion is either omitted or labeled MEDIUM confidence.

### Reviewed Todos (not folded)

None — `gsd-tools todo match-phase 35` returned zero matches.

</deferred>

---

*Phase: 35-android-prerequisites-mgp-zero-touch-portal*
*Context gathered: 2026-04-21*
*Method: adversarial-review skill (finder → adversary → referee) — 85 flaws evaluated, 80 confirmed real, 5 disputed (3 real / 2 false positive), 9 sub-decisions resolved on lowest-real-flaw basis*
