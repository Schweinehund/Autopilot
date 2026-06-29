# Phase 97: Enrollment & FileVault Depth Formalization - Context

**Gathered:** 2026-06-28
**Status:** Ready for planning

<domain>
## Phase Boundary

**Formalize — do not author.** The Account Settings depth in guide 02 and the FileVault / Local-Password-Policy depth in guide 03 were already written during the 2026-06-27 live session (both files show as modified, uncommitted, in git status). This phase binds that already-written content to requirements **DEP-01** and **DEP-02**, confirms its freshness stamps, and leaves it in a state where the Phase-100 chain validators **can** assert its presence ("harness-validated corpus").

The *what* (content) is locked and complete. This phase resolves only the *how* of formalization. No new doc content is authored, no validator `.mjs` is written here (that is a Phase-100 deliverable), and there is **no scope bleed into Phase 98** (guide 07 comprehensive pass).

Targets:
- `docs/admin-setup-macos/02-enrollment-profile.md` — Account Settings section (DEP-01)
- `docs/admin-setup-macos/03-configuration-profiles.md` — FileVault + Local Password Policy sections (DEP-02)

</domain>

<decisions>
## Implementation Decisions

All four HOW decisions were resolved via `/adversarial-review` (Finder → Adversary → Referee, ground-truth-verified against the live files, the validator lineage, and the Phase-100 roadmap entry). Recommendations locked by user. The review converged on D1=B, D2=C, D3=B, D4=A.

### D-01: Freshness-stamp granularity — file-level frontmatter + version-history row (NOT per-section stamps)
- Keep freshness at the **file level**: the existing frontmatter `last_verified` / `review_by` (both guides already carry `2026-06-27` / `2026-09-27`, the +3-month/same-day invariant) plus a dated `| Date | Change | Author |` version-history row.
- **Rationale:** Per-section `last_verified`/`review_by` *pair-blocks* exist **nowhere** in the corpus and buy zero harness leverage. (The Android corpus uses inline `last_verified`-only citation tags, but never inline `review_by` pairs — so the literal per-section-pair pattern is genuinely unprecedented.) File-level frontmatter + version-history is the established macOS-suite convention, matching Phase 96 D-03 and Phase 96 D-04's "durable reference content kept free of dated operational detail" principle.
- **SC reconciliation (user ruling):** ROADMAP Phase 97 Goal + SC#1/#3 literally say "per-section freshness stamps," which contradicts the file-level mechanism. Per user decision, **DO NOT amend the ROADMAP**. This CONTEXT.md is the authoritative ruling: **file-level frozen frontmatter stamps + a dated version-history row SATISFY the intent of "per-section ... freshness stamps."** The Phase-100 milestone-close auditor must read this interpretation rather than the literal SC text.
- **Implementation note:**
  - Both guides **already have** version-history tables (guide 02 ~lines 186-191; guide 03 ~lines 288-293) under a bare `| Date | Change | Author |` header (no "Version History" heading). Add **one new dated row per guide** documenting the Phase-97 DEP-01/DEP-02 formalization.
  - The freshness frontmatter is **already satisfied** from the live session. Only bump `last_verified`/`review_by` if Phase 97 makes a substantive content edit (e.g. a spot-verify correction under D-04); if so, recompute `review_by` = `last_verified` + 3 months, same day-of-month. Never bump one without the other.
  - The new version-history row should honestly read "formalized under DEP-01/DEP-02," not imply a content rewrite (no content changes unless D-04 spot-verify finds one).

### D-02: Harness-coverage mechanism — defer validator authoring to Phase 100; Phase 97 only makes content assertable (presence-only)
- Phase 97 does **NOT** author `scripts/validation/check-phase-97.mjs` or touch any chain-apex. Its only harness obligation is to leave **durable, assertable anchors** (stable section headers + stable content markers) in guides 02/03, and to **record the intended needle-spec as a hand-off for Phase 100**.
- **Rationale:** ROADMAP Phase 100 SC#2 + REQUIREMENTS HARN-02 ship `check-phase-96.mjs … check-phase-100.mjs` + the chain extension (`CHAIN_PHASES=[48..100]`) as **"one indivisible Atom 2 commit."** Authoring `check-phase-97` now would (a) fracture that indivisible atom and (b) produce an orphan validator that runs in **no chain and no CI** until Phase 100 (current apex is `check-phase-95` with `CHAIN_PHASES=[48..94]`; the v1.13 CI workflow is also a Phase-100 deliverable). Phase 97 SC#4 requires only that content be *"committed such that chain validators **can** assert their presence"* — assertability, a content-shape requirement, not a running validator at phase close.
- **Sub-decision — presence-only, NOT freshness:** the eventual Phase-100 validator must needle **stable content presence**, never the freshness dates. Asserting `last_verified`/`review_by` values would be a time-bomb (fails on future runs as dates drift) and is unprecedented — no macOS doc is in any existing freshness-assertion scope (milestone-audit C5 = Android, C10 = Linux only). The `check-phase-94` precedent asserts content needles, not dates.

### D-03: Check granularity — fine-grained needles on STABLE tokens (recorded now, implemented in Phase 100)
- The needle-spec handed to Phase 100 must be **fine-grained** (a needle per durable content element), not coarse (one check per success criterion).
- **Rationale:** A coarse "section header present" check stays green even if every FileVault sub-payload, the `Defer` row, and the escrow-verification procedure are deleted — the exact anti-pattern `check-phase-94.mjs` calls out ("bare PRESENCE is trivially green on old bytes"). Fine needles deliver the regression-lock that is this phase's entire reason to exist.
- **Implementation note:** Needles MUST target **stable, structural tokens** — Apple payload/key names and section labels — not paraphrasable prose or dates, so that legitimate copy-edits in Phases 98-99 don't turn CI red. Candidate stable tokens (verify exact strings at Phase-100 author time):
  - Guide 02 (DEP-01): `Non Platform SSO Accounts`, `Restrict editing`, `Prefill account info`, `{{partialUPN}}`, `{{username}}`, the UPN-via-Full-Name note.
  - Guide 03 (DEP-02): `FileVault Options`, `Recovery Key Escrow`, `Defer`, `dontAllowFDEDisable`, `DestroyFVKeyOnStandby`, `Recovery Key Rotation In Months`, `Local Password Policy`, escrow error `-2016341107`.
- Note: guide 03 is **already** a live chain-assertion target — `check-phase-81.mjs` E7 needles `](07-platform-sso-setup.md)` in it. Guide 02 is wholly uncovered corpus today. New needles should not duplicate/diverge from E7.

### D-04: Content treatment — formalize-only + bounded spot-verify (NOT verify-and-fill)
- **Freeze the live-written content as-is.** Do not re-audit or re-author. An independent element-by-element re-audit (by both Finder and Adversary) found **all** DEP-01/DEP-02 elements already present (see Ground-Truth Audit below) — there is essentially nothing to fill.
- **Rationale:** Phase 97 is explicitly not a content-authoring phase; verify-and-fill re-opens authoring, risks regressions into already-shipped stamped content, and overlaps Phase 98's comprehensive-pass remit. Maintains the clean Phase-97/Phase-98 boundary.
- **Bounded spot-verify (the one allowed content touch):** because the version-history rows self-assert "verified against Microsoft Learn" with no backing artifact, spot-verify **only** these four uncited HIGH-impact factual claims — and correct only if wrong:
  1. FileVault `XTS-AES 128` cipher (guide 03 ~line 137)
  2. macOS LAPS recovery-key "rotated every 6 months by default" (guide 02 ~line 71)
  3. Escrow error code `-2016341107` / `0x87d1138d` (guide 03 ~line 189)
  4. "macOS 14.4+ removes the Setup-Assistant admin-role restriction" (guide 03 ~line 174)
  Anything beyond these four is **deferred, not done here** (cap the spot-verify; do not drift into a full re-audit).

### Claude's Discretion
- Exact wording of the new version-history rows (D-01) and the precise needle-string list handed to Phase 100 (D-03) are at the planner/executor's discretion, provided they satisfy the locked decisions and use stable tokens.
- Whether to record the Phase-100 needle-spec as a dedicated hand-off note inside the phase dir vs inline in the plan is a process choice (recording it somewhere is required, to avoid Phase-100 re-discovery).

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Requirements & scope (locked)
- `.planning/ROADMAP.md` §"Phase 97: Enrollment & FileVault Depth Formalization" (~lines 66-77) — goal + 4 success criteria. **Read the D-01 SC reconciliation above before treating "per-section" literally.**
- `.planning/REQUIREMENTS.md` — `DEP-01` (~line 26), `DEP-02` (~line 27): full text of the required Account Settings and FileVault/Passcode depth.

### Target files (the docs being formalized — already carry the content)
- `docs/admin-setup-macos/02-enrollment-profile.md` — Account Settings section (Step 2, ~lines 61-102), frontmatter stamps (~lines 2-3), version-history table (~lines 186-191).
- `docs/admin-setup-macos/03-configuration-profiles.md` — FileVault (Disk Encryption) section (~lines 123-196), Local Password Policy (Passcode) section (~lines 98-121), frontmatter stamps (~lines 2-3), version-history table (~lines 288-293).

### Cross-milestone dependency — the harness atom this phase hands off to
- `.planning/ROADMAP.md` §"Phase 100" (~lines 110-120) — SC#2: `check-phase-96..100.mjs` + `CHAIN_PHASES=[48..100]` as **one indivisible Atom 2 commit**. Phase 97 must NOT pre-author any of these.
- `.planning/REQUIREMENTS.md` — `HARN-01` (~line 40, Path-A lineage copy, frozen predecessors) and `HARN-02` (~line 41, the check-phase + chain atom).

### Validator lineage (read to design the Phase-100 needle-spec correctly)
- `scripts/validation/check-phase-94.mjs` — the model content-needle validator (PRESENCE + content needles, **no freshness assertion**; header rationale "trivially green on old bytes").
- `scripts/validation/check-phase-95.mjs` — current chain apex, `CHAIN_PHASES=[48..94]` (~line 41).
- `scripts/validation/check-phase-81.mjs` — E7 (~line 52) already needles guide 03's `](07-platform-sso-setup.md)`.
- `scripts/validation/v1.12-milestone-audit.mjs` — C5 (Android doc paths ~line 381) / C10 (Linux doc paths ~line 517) / C11 (all-docs sweep ~line 578); confirms macOS docs are in **no** freshness scope.

### Precedent
- `.planning/phases/96-surgical-conflict-fixes/96-CONTEXT.md` — D-03 (freshness = file-level frontmatter + version-history row, +3-month invariant, "no validator asserts last_verified") and D-04 (durable-reference-content principle). Phase 97 inherits these.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- **Freshness convention:** file-level frontmatter `last_verified`/`review_by` + bare `| Date | Change | Author |` version-history tables — already present in both target guides; mirror for the new Phase-97 row.
- **Needle-validator exemplar:** `check-phase-94.mjs` content-needle pattern is the template the Phase-100 validator will follow for guides 02/03.
- **Stable-token inventory:** the Apple payload/key strings already in guide 03 (`dontAllowFDEDisable`, `DestroyFVKeyOnStandby`, `-2016341107`, etc.) and the MDM tokens in guide 02 (`{{partialUPN}}`, `{{username}}`) are durable needle candidates.

### Established Patterns
- **Per-phase validators are a CLOSE-phase deliverable**, authored at the milestone-close phase, not the content phase (e.g. `check-phase-94` cites "Phase 95 D-02"). This is why Phase 97 defers authoring to Phase 100.
- **Frozen predecessors:** v1.4–v1.12 harnesses are byte-unchanged; HARN-01 mandates a Path-A *copy* to v1.13, never mutation of an existing audit — so "extend v1.12-milestone-audit.mjs" is off the table.
- **+3-month / same-day-of-month** `last_verified`→`review_by` invariant (Phase 96 D-03). Never bump one without the other.

### Integration Points
- Phase 97 → **Phase 100**: the needle-spec (D-03) and the assertable anchors (D-02) are consumed by the Phase-100 `check-phase-97.mjs` author. Record the hand-off explicitly.
- Guide 03 is already reachable from the live chain (apex 95 → 48..94 → `check-phase-81` E7); guide 02 becomes newly-covered corpus only at Phase 100.

</code_context>

<specifics>
## Specific Ideas

- The dominant principle, inherited from Phase 96, is **"formalize, don't author"** — bind already-written content to requirements + stamps + assertable anchors, keep durable reference content free of dated operational minutiae, and preserve a clean phase boundary (97 ≠ 98, and validator authoring belongs to 100).
- **Ground-Truth Audit (from adversarial review — DEP content is COMPLETE):**
  - DEP-01 (guide 02): local-admin fields (~67-74) ✓, account-type (~83) / prefill (~84) / restrict-editing (~87) ✓, PSSO account-creation ownership (~65) ✓, password-prefill passwordless/federated (~89-93) ✓, UPN-via-Full-Name note (~102) ✓.
  - DEP-02 (guide 03): three sub-payloads — FileVault (~133) / FileVault Options (~144) / Recovery Key Escrow (~152) ✓, required `Defer` (~138) ✓, Setup-Assistant enforcement + pre-14.4 caveat (~174) ✓, recovery-key-escrow verification procedure (~176-189) ✓, assignment target devices-vs-users (~172) ✓, Local Password Policy (Passcode): non-expiring best-practice (~114-116) + 90-day compliance alternative (~118) ✓.
  - No critical content gaps. Only the four uncited factual claims in D-04 warrant a bounded spot-verify.
- DISCUSSION-LOG.md captures the full Finder/Adversary/Referee scoring trail for audit.

</specifics>

<deferred>
## Deferred Ideas

- **`check-phase-97.mjs` validator + chain-apex extension (`CHAIN_PHASES=[48..100]`)** — owned by **Phase 100** (HARN-02, indivisible Atom 2). Phase 97 only records the needle-spec hand-off.
- **Full re-audit / re-verification of guides 02 & 03 against Microsoft Learn** — out of scope; only the four-claim bounded spot-verify (D-04) happens here.
- **Guide 07 VPP conflict + troubleshooting depth + PSSO admin-setup depth (DEP-03)** — owned by **Phase 98**.
- **Link-integrity guard on the `#end-user-sign-in-experience-secure-enclave` anchor** (linked from guide 02:102 and 03:104 into guide 07, which Phase 98 rewrites) — the Phase-100 link-integrity sweep is the real guard, not Phase 97.

None beyond the above — discussion stayed within phase scope.

</deferred>

---

*Phase: 97-enrollment-filevault-depth-formalization*
*Context gathered: 2026-06-28*
