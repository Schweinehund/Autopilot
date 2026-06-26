# Phase 94: Post-Migration Verification Content Closure - Context

**Gathered:** 2026-06-26
**Status:** Ready for planning

<domain>
## Phase Boundary

Source-verify and upgrade/correct **three existing preliminary passages** in the single file
`docs/macos-lifecycle/02-mdm-migration-psso.md` so each post-migration verification question reads at
its correct confidence level. This is an **upgrade-and-verify** phase, not net-new authoring — guide
`02` already contains preliminary, under-verified content for all three gaps (written in v1.11):

- **MIGV-01** — Stage 7 "Behind the Scenes" (~line 330) and Stage 3 "Behind the Scenes" (~line 204)
  already assert *informally and unstamped* that Intune needs no separate "profile-based enrollment
  config mode" beyond the ADE policy.
- **MIGV-02** — Stage 2 step 5 (~line 154) already documents the Iru "Delete Device Record" path with
  a hedge; Stage 2 step 3 (~line 148) + glossary (~line 548) currently assert "support portal URL
  unchanged at support.kandji.io" — which collides with MIGV-02's instruction to verify against
  `support.iru.io`.
- **MIGV-03** — Stage 7 step 4 (~lines 324-326) already is a "Supervision status (MEDIUM confidence)"
  callout with a `profiles status` pilot recommendation.

**Locked scope (carried from roadmap / prior adversarial-review — NOT re-litigated here):**
no new files; no nav-hub edits (`docs/index.md`, `common-issues.md`, `quick-ref-l2.md`,
`decision-trees/06-macos-triage.md`); no CI-3 Managed-Apple-ID→Account rename; MIGV-03 stays a
MEDIUM-confidence callout (never a flat assertion, never an author-unrunnable validated procedure);
MIGV-01 documented at full confidence **only after** Microsoft Learn verification on authoring day;
the PSSO Secure Enclave key never survives migration (re-registration always required); all
OS-26-gated additions carry `last_verified`/`review_by` stamps (90-day cycle).

</domain>

<decisions>
## Implementation Decisions

All four decisions below were adjudicated via `/adversarial-review` (Finder → Adversary → Referee,
all Opus) per the user's durable gray-area-pick preference. The four picks were **unanimous across all
three agents**; the only contested item (D-02 URL sub-question) resolved for the Adversary. The Finder
performed live Microsoft Learn verification during the review.

### D-01 — MIGV-01 placement → **Upgrade in-place (option 1A)**
- Promote the **existing** Stage 7 / Stage 3 "Behind the Scenes" assertion to a stamped,
  Microsoft-Learn-cited, **full-confidence** statement where it already lives. Minimal new prose.
- Do **not** add a separate pre-migration readiness-checklist sidebar (rejected 1B/1C): a 2nd–3rd copy
  of the same MS-Learn fact would drift at the 90-day re-verify.
- **Rationale correction (Referee-upheld):** the Stage 2 readiness list (~line 138) gates the
  *action* ("assign the ADE policy"); it does **not** carry the MIGV-01 *reassurance* ("no separate
  config mode needed"). The 1A pick stands on minimal-edit / anti-drift grounds — not on a
  "readiness list already says this" claim (it does not).
- **Verified during review:** Microsoft Learn exposes exactly one Intune enrollment construct (an
  enrollment policy assigned to device groups or set as token default); there is **no separate
  "profile-based enrollment configuration mode."** The existing assertion is factually correct and now
  qualifies for the full-confidence, cited upgrade. *(Planner MUST re-confirm against current MS-Learn
  on the actual authoring day before stamping at full confidence — see canonical refs.)*
- L2 #30 (`docs/l2-runbooks/30-macos-mdm-migration-failure.md`) is edited **only if** the verified
  MIGV-01 answer changes migration-failure triage. Default expectation: no change.

### D-02 — Iru-doc fallback posture → **Verified-or-honest-hedge (option 2A)**
- Attempt live verification of the Iru console device-deletion UI path against the current support
  portal. **If reachable:** replace the hedge with confirmed concrete steps. **If login-gated /
  unreachable:** keep the conceptual-steps form but update the hedge to record the verification
  **attempt + date + what blocked it**.
- Rejected 2C (fabricate Iru-branded UI labels, drop hedge) — **disqualified on operator-safety
  grounds**: Stage 2 is where the operator holds *irreversible* secret-destruction actions (FileVault
  recovery key + Activation Lock bypass code, permanently destroyed on Delete Device Record). Shipping
  a guessed UI path into that surface is worse than an honest hedge. Rejected 2B (status-quo wording,
  no verification attempt logged).
- **D-02 URL sub-question → Surface BOTH URLs (Adversary overturned the Finder's "switch to
  support.iru.io").** Nothing in the review confirmed `support.iru.io` resolves. Flipping the asserted
  URL from `support.kandji.io` to `support.iru.io` merely swaps one *unverified* flat assertion for
  another — the exact failure 2A exists to prevent. Resolution: surface **both** (`support.kandji.io`
  = known-documented anchor; `support.iru.io` = rebrand-expected target to verify on authoring day),
  demote the standing "URL unchanged at support.kandji.io" assertion to "verify which resolves." Both
  "Kandji" and "Iru" names remain present for searchability (locked).

### D-03 — MIGV-03 supervision callout → **Refine in-place at Stage 7 step 4 (option 3A)**
- Keep the MEDIUM-confidence supervision callout where it is (~lines 324-326), co-located with its
  "Watch Out For — Supervision status not preserved" bullet (~line 338) and the section-provenance
  block's explicit 90-day supervision re-confirm instruction (~line 428). Tighten wording to the
  locked MEDIUM framing.
- Rejected 3B (relocate to a post-migration verification checklist) — would strand the callout from
  its provenance/Watch-Out triad. Rejected 3C (pointer from a verification checklist) — **no such
  checklist surface exists** in the file, and creating one violates locked "no new surfaces."
- **D-03 command sub-question → Keep `profiles status -type enrollment | grep Supervised` only.** Do
  **not** add a `profiles list` before-and-after baseline. `profiles status` surfaces the Supervised
  flag directly; `profiles list` is noisier and does not cleanly expose supervision.
- **Rationale correction (Referee-upheld):** the reason to keep the single command is
  **diagnostic-targeting + minimal operator burden**, NOT "author-unrunnable." A pilot before-and-after
  baseline is *operator*-runnable, and operator-run pilot recommendations are explicitly permitted by
  the locked MEDIUM-callout framing. MIGV-03 makes **no claim the PSSO key survives** (Apple
  authoritative).

### D-04 — Freshness-stamp granularity → **Hybrid (option 4C)**
- **Bump** the existing Stage 7 section-provenance block (`last_verified`/`review_by` → authoring day)
  to cover the in-coverage edits (MIGV-01 at D-01, MIGV-03 at D-03 — both sit inside the block's
  "macOS-26-gated B1 content" scope).
- Add a **discrete inline freshness signal only on the out-of-coverage Stage 2 MIGV-02 edit**, which
  lives in the shared pre-flight stage and was verified against a *vendor portal* (different source),
  not Microsoft Learn.
- Rejected 4A (single block covers all) — would mislabel the vendor-sourced Stage 2 edit under the
  Apple-sourced Stage 7 date/scope. Rejected 4B (per-addendum stamps everywhere) — clutters
  in-coverage content already governed by the block.
- **Rationale correction (Referee-upheld):** the Stage 2 inline stamp is **discretionary hygiene**,
  not a locked requirement. The stamping lock binds only *OS-26-gated additions*, and MIGV-02 (vendor
  rebrand / URL) is **not** OS-26-gated. Keep it for source-trail separation, but the planner should
  treat it as recommended hygiene rather than a mandated stamp.

### Claude's Discretion
- Exact prose wording, sentence placement within the identified passages, and Markdown formatting of
  the upgraded statements/callouts (within the locked framing above).
- Whether the MIGV-02 Stage 2 inline freshness signal is a full `last_verified`/`review_by` pair or a
  lighter date-of-attempt note (hygiene, not mandated — planner's call).

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Target file (ALL Phase 94 edits land here)
- `docs/macos-lifecycle/02-mdm-migration-psso.md` — the single file edited. Key surfaces:
  Stage 2 "Intune Readiness, Secret Retrieval, and Source Release" (~lines 126-176, MIGV-02 + secret
  pre-flight); Stage 3 "Behind the Scenes" (~line 204, MIGV-01); Stage 7 "Post-Migration Profile-Based
  Enrollment" + step 4 supervision callout + "Behind the Scenes" (~lines 310-340, MIGV-01 + MIGV-03);
  Stage 7 section-provenance block (~line 428, D-04 stamp bump); B2 Stage 3 "Retire and Wipe in
  Kandji/Iru" (~lines 477-489, secondary Iru delete surface); glossary (~line 548, support-portal URL
  assertion).

### Conditionally-touched / frozen siblings
- `docs/l2-runbooks/30-macos-mdm-migration-failure.md` — updated **only if** the verified MIGV-01
  answer affects migration-failure triage (default: untouched).
- `docs/macos-lifecycle/01-psso-provisioning-walkthrough.md` — **FROZEN for v1.12** (link-not-copy
  target; guide 02 cross-references its Stage 7A — do not edit).

### Freshness-stamp precedent
- `docs/admin-setup-macos/07-platform-sso-setup.md` — ADE-section `last_verified`/`review_by` 90-day
  freshness-stamp precedent that OS-26-gated additions follow.

### External research targets (must be resolved at plan time — NOT pre-blocked)
- **Microsoft Learn** (MIGV-01) — current Intune ADE / profile-based-enrollment configuration
  requirement after an OS-26 in-place ABM migration. Document MIGV-01 at full confidence **only after**
  re-confirming on the actual authoring day. (Finder's review-time check: ADE policy assignment alone
  is sufficient; no separate config mode exists.)
- **`support.iru.io` / `support.kandji.io`** (MIGV-02) — current Iru (post-Kandji-rebrand, Oct 2025)
  console device-deletion UI path; confirm whether the secret-retrieval pre-flight (FileVault recovery
  key / Activation Lock bypass) is still required. Verify which portal URL resolves on authoring day;
  surface both if unconfirmed.
- **Best-available supervision sources** (MIGV-03) — Apple MDM protocol spec, developer forums,
  community reports on supervision preservation through OS-26 in-place migration. Best-available
  inference only; pilot recommended but not author-runnable. (Review-time check: Microsoft Learn does
  **not** confirm supervision preservation for this path → MEDIUM confidence is correct.)

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- **All three gaps already have preliminary prose in guide 02** — the work is surgical
  upgrade/correction of existing passages, not new sections. Reuse the existing callout/Behind-the-
  Scenes structures and the Stage 7 section-provenance block format already present in the file.
- The MIGV-03 callout already uses the locked MEDIUM framing + pilot command — refine, don't rewrite.

### Established Patterns
- **Section-provenance block** at the end of the Stage 7 (B1) content (~line 428) is the established
  freshness-stamp vehicle; D-04 bumps it. Mirrors guide 07's ADE-section 90-day stamp precedent.
- **"What the Admin Sees / What Happens / Behind the Scenes / Watch Out For"** four-part stage
  structure throughout guide 02 — keep edits inside the matching sub-block.
- **Both-names-for-searchability** convention ("Kandji/Iru") is already applied throughout — preserve.

### Integration Points
- Guide 02 is already navigation-wired from v1.11 (hubs + L2 #30 + glossary) — **no nav-last phase
  needed**; do not touch hub files.
- Phase 95 (harness/close) will author `check-phase-94.mjs`; Phase 94 edits should stay surgical and
  byte-disciplined so the validator chain and frozen-surface invariants remain clean.

</code_context>

<specifics>
## Specific Ideas

- Operator-safety is the decisive lens for D-02: at Stage 2 the operator holds irreversible
  secret-destruction actions, so an honest hedge always beats a guessed UI path.
- Single-source-of-truth + 90-day-review ergonomics is the decisive lens for D-01 and D-04: avoid
  duplicate copies of the same fact, and keep vendor-sourced freshness separate from Apple-sourced.
- MIGV-03 must read as MEDIUM confidence + operator-run pilot recommendation, never as a validated
  assertion that supervision is preserved.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope. (Scope was already locked by prior adversarial-review:
CI-3 rename, multi-tenant PSSO, iOS migration depth, new scenario docs, and code-scaffolding
integration all remain out of v1.12 per `.planning/REQUIREMENTS.md` Out-of-Scope table.)

</deferred>

---

*Phase: 94-post-migration-verification-content-closure*
*Context gathered: 2026-06-26*
