# Phase 110: Pillar B + C — Corpus Fixes + MDM Migration Walkthroughs - Context

**Gathered:** 2026-07-01
**Status:** Ready for planning

<domain>
## Phase Boundary

Two **independent** pillars against a mature, convention-heavy doc corpus — no 802.1X content, no dependency on Pillar A (phases 101-109).

**Pillar B — Corpus Fixes (FIX-01/02/03):** three v1.13-deferred accuracy nits in *existing* files. Literal, line-anchored edits. **All three ROADMAP/REQUIREMENTS line anchors have drifted post-Phase-109 — see D-04 drift table; the planner targets the REAL live anchors, not the cited stale ones.**

**Pillar C — MDM Migration Walkthroughs (MIGF-01/02):**
- MIGF-01: a **new** iOS/iPadOS ABM "Assign Device Management" + Deadline migration walkthrough (Kandji/Iru → Intune).
- MIGF-02: a Jamf Pro + Mosyle source-MDM release **addendum** appended to the existing `docs/macos-lifecycle/02-mdm-migration-psso.md`.

**In scope:** the 3 literal fixes + 1 new iOS migration file + 1 addendum section in the macOS file.

**Out of scope (deferred / other phases):** any 802.1X content; a full iOS wipe-and-re-enroll *track* (pre-26 wipe is a substantive pointer to `01-ade-lifecycle.md`, not a peer track — see D-02); editing the Post-Migration common-issues block (FIX-03 touches only the User-Locked-Out block); Windows/Android/Linux migration walkthroughs; Pillar D validator refactors (Phase 111); Pillar E harness bump (Phase 112).

**Decision method:** all four gray areas were resolved via a three-agent adversarial review (Finder → Adversary → Referee, Opus) per the user's standing convention. Finder scored 38/40; Adversary landed one calibrated overturn (D2: B→A) and declined the FIX-03 "both blocks" bait; Referee re-verified every load-bearing anchor and **upheld all six final positions**. See `110-DISCUSSION-LOG.md` for the full scored reasoning.

</domain>

<decisions>
## Implementation Decisions

### iOS/iPadOS migration walkthrough (MIGF-01)

- **D-01 — Walkthrough home & template = new standalone file (HIGH).** Author `docs/ios-lifecycle/02-mdm-migration.md` (exact filename suffix is Claude's discretion — e.g. `02-mdm-migration.md`), mirroring the macOS `02-mdm-migration-psso.md` template: front-matter freshness stamp, platform gate blockquote, "Which Path Is Right for You?" table, mermaid pipeline, Stage Summary Table, per-stage `What the Admin Sees / What Happens / Behind the Scenes / Watch Out For`, See Also, Glossary Quick Reference, Version History. This is the exact per-platform parallel (`ios-lifecycle/` already holds `00-enrollment-overview.md` + `01-ade-lifecycle.md`; `01-ade-lifecycle.md:15` self-declares the macOS-sibling parallel). **Rejected B** (append an H2 into an existing ios-lifecycle file): breaks one-topic-per-file numbering. **Rejected C** (co-locate inside the macOS file): that file is `platform: macOS`-gated and built around FileVault/PSSO/Secure Enclave, all N/A for iOS — cross-platform contamination, and collides with the D-03 addendum.

- **D-02 — Path coverage = in-place path ONLY; pre-26 wipe as a substantive pointer, NOT a full parallel track (HIGH; Finder's B overturned to A, Referee-upheld).**
  - **iOS technical fact (web-verified by two independent agents):** ABM "Assign Device Management" + Deadline migrates an already-ADE-enrolled device **wipe-free, in place, on iOS/iPadOS 26+** (apps/data/config preserved; non-dismissible full-screen deadline prompt → forced restart). **Pre-26 (iOS/iPadOS 18 or earlier) requires an erase/wipe** (server reassignment only takes effect at next activation). This is the exact analog of the macOS B1 (26+ in-place) / B2 (pre-26 wipe) split.
  - **Decision:** document the **in-place "Assign Device Management + Deadline" path as the primary (only staged) track.** Cover the pre-26 wipe case as a **short subsection**, not a staged peer track: (a) wipe-required statement, (b) source-MDM release + Activation Lock consideration, (c) link-not-copy pointer to `01-ade-lifecycle.md` for the ADE re-enroll. Precedent: the macOS file itself thins its wipe path — `02-mdm-migration-psso.md:505` "B2 Stage 5: Fresh PSSO Provisioning (Link-Not-Copy Handoff to Guide 01)".
  - **Why A over B (full B1+B2-parallel track):** MIGF-01 (`REQUIREMENTS.md:42`) + SC4 (`ROADMAP.md:297`) scope *only* the in-place path ("post-migration enrollment verification" = verification of the in-place migration, not a second track); an iOS wipe = plain ADE re-enroll already fully documented in guide 01 (link-not-copy); and iOS has **no FileVault and no Platform SSO**, so a wipe "track" has zero platform-specific substance (macOS B2 earned its stages from FileVault Key Rotation + PSSO Re-Registration only).
  - **Stages CARRIED for the iOS in-place track:** Stage 1 (fleet/OS gate), Stage 2 (source release — **keep Activation Lock bypass retrieval + Kandji/Iru Delete Device Record; DROP the FileVault-key-retrieval sub-steps**), ABM Assign Device Management, Set Deadline (1–90 day), User Notification Window, **Deadline Enforcement (must contrast iOS forced-restart vs macOS full-screen lock — the SC4 differentiator)**, Post-Migration Enrollment Verification.
  - **Stages DROPPED (no iOS analog — drop entirely, not "N/A callout"):** FileVault Key Rotation (`macOS :347`), PSSO Re-Registration (`macOS :373`). iOS has no FileVault (Data Protection is always-on, hardware-tied, no MDM-escrowed key) and no Platform SSO/Secure Enclave/"Registration Required" flow.

### Jamf Pro + Mosyle source-release addendum (MIGF-02)

- **D-03 — Structure = one combined appendix, two H3 subsections; depth = conceptual-action + hedged (HIGH).** Append **one** `## Appendix` section to `docs/macos-lifecycle/02-mdm-migration-psso.md` with two H3 subsections `### Jamf Pro` and `### Mosyle`, each mirroring Stage 2's release sub-structure (FileVault key retrieval / Activation Lock bypass / device-record deletion — the three sub-steps MIGF-02 names verbatim). MIGF-02 (`REQUIREMENTS.md:43`) says "as **an addendum**" (singular) → one section. **Depth:** conceptual-action framing + "verify current console labels on your authoring day" hedging — NOT invented literal click-paths (Jamf/Mosyle consoles are not live-verifiable; matches Stage 2's Kandji/Iru hedge discipline at `:126-182`). **Rejected B** (two separate appendices): redundant scaffolding for structurally identical procedures. **Rejected C** (interleave into Stage 2): the whole file is authored around Kandji/Iru as the single source MDM; injecting parallel vendor callouts shatters the narrative — MIGF-02 says "addendum," not "rewrite Stage 2."
  - **⚠ Anchor-slug double-hyphen trap:** headings must slug clean. Use bare `### Jamf Pro` / `### Mosyle` (NOT `### Jamf Pro / Mosyle`). The H2 title must also avoid ` / ` and parentheses if anything links to it by anchor — prefer `## Appendix: Source-MDM Release Steps for Jamf Pro and Mosyle` over `... (Jamf Pro / Mosyle)` (the latter slugs to `...jamf-pro--mosyle`).

### Corpus fixes (FIX-01/02/03) — real anchors + rules

- **D-04 — FIX bundle (HIGH). All three cited anchors are STALE (Phase-109 drift); target the live anchors below.**
  - **FIX-01 — `docs/index.md:110` (NOT `:108`); 6 → 9; macOS-specific only.** Bump the stale "(6 runbooks: device, Setup Assistant, profiles, apps, compliance, Company Portal)" parenthetical on the "macOS L1 Runbooks" row to **9** and extend/reword the enumeration to include the 3 Platform SSO scenarios (#35 sign-in, #36 Secure Enclave key loss, #37 local password recovery). The `#macos-ade-runbooks` anchor section (`l1-runbooks/00-index.md:36-50`) = #10-15 **+** #35/#36/#37 = 9. **Exclude 802.1X #38-41** (6→9, NOT 6→13): they live under a separate `## 802.1X L1 Runbooks` H2 (`l1-runbooks/00-index.md:123`) and are cross-platform; `REQUIREMENTS.md:36` scopes "≥8 after #35/#36/#37" with no 802.1X mention. This is a **count/enumeration reword** — the `:112` "macOS Platform SSO Runbooks" row already references #35/#36/#37, so add NO new reference rows (DRY / link-not-copy). *Cleaner option to avoid `:112` duplication:* "9 macOS L1 runbooks — 6 ADE plus 3 Platform SSO (see row below)".
  - **FIX-02 — `docs/quick-ref-l1.md:106` (NOT `:101`).** Reword the #36 escalation trigger from "**Escalate L2** via [Secure Enclave Key Loss](l1-runbooks/36-macos-secure-enclave-key.md) first; escalate to L2 if re-registration fails" to the L1 "try this first" pattern: "**Use [Platform SSO — Secure Enclave Key Loss](l1-runbooks/36-macos-secure-enclave-key.md) runbook** first; escalate to L2 if re-registration fails (collect: …)". Matches siblings #35 (`:107`) and #37 (`:108`). Surrounding #37 wiring at `:108` already correct (already carries "PSSO re-registration via #36 required afterward") — no change there.
  - **FIX-03 — `docs/common-issues.md` "### macOS Local Password: User Locked Out" block (~`:249-254`), NOT the cited `:242-247`.** The cited range is the "### Platform SSO Re-Registration Failure (Post-Migration)" block, which contains neither #37 nor a local-password step — it CANNOT host an "intermediate between L1 #37 and L2 #27." Insert a new `- **L1:** [Platform SSO — Secure Enclave Key Loss](l1-runbooks/36-macos-secure-enclave-key.md) — mandatory PSSO re-registration after password recovery (the reset invalidates the Secure Enclave key)` bullet **between** the existing L1 #37 line (`:253`) and the L2 #27 line (`:254`). **Do NOT also edit the Post-Migration block** — #36 (key loss after password reset) doesn't fit that block's trigger; touching it is scope creep. Corroborated by `quick-ref-l1.md:108` ("PSSO re-registration via #36 required afterward") and `common-issues.md:251` (SSPR doesn't reset the local password on Secure Enclave PSSO devices).

  **Stale-anchor drift table (planner + verifier MUST honor so it isn't re-flagged):**

  | Requirement | Cited (stale) anchor | Real live anchor | Note |
  |---|---|---|---|
  | FIX-01 | `index.md:108` | `index.md:110` | `:108` is now the "macOS ADE Lifecycle" row (+2) |
  | FIX-02 | `quick-ref-l1.md:101` | `quick-ref-l1.md:106` | `:101` is now the "not in Intune after 24h" trigger (+5) |
  | FIX-03 | `common-issues.md:242-247` | `common-issues.md` User-Locked-Out block ~`:249-254` | cited range hits the WRONG (Post-Migration) block; semantic text is authoritative |

### Claude's Discretion (within the locked decisions)
- D-01: exact filename suffix; frontmatter freshness values.
- D-02: exact stage count for the in-place track; whether Activation Lock retrieval is its own stage or folds into a release sub-step; depth of the forced-restart-vs-full-screen-lock contrast.
- D-03: whether each vendor H3 mirrors Stage 2's full three-part release sub-structure or a lighter list; confidence-callout wording; exact See Also wiring (navigation-last).
- D-04: exact enumeration/link-text/callout phrasing at each fix site; whether FIX-01 adds an optional see-also to the separate 802.1X L1 section (likely unnecessary — `index.md:115` already surfaces the 802.1X Triage tree).

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

> **Line-number note:** ROADMAP/REQUIREMENTS *content* verified live 2026-07-01; their embedded `docs/…:NN` anchors are STALE (see D-04 drift table) — always re-verify the live doc anchor before editing.

### Phase scope & requirements
- `.planning/ROADMAP.md` §"Phase 110" (~`:287-305`) — Goal + SC1 (FIX-01 count), SC2 (FIX-02 WR-01), SC3 (FIX-03 IN-01), SC4 (MIGF-01 iOS walkthrough), SC5 (MIGF-02 Jamf/Mosyle addendum).
- `.planning/REQUIREMENTS.md` — FIX-01 `:36`, FIX-02 `:37`, FIX-03 `:38`, MIGF-01 `:42`, MIGF-02 `:43`.

### Pillar C — MDM migration (author/append targets + template source)
- `docs/macos-lifecycle/02-mdm-migration-psso.md` — **template to mirror (D-01)** AND **MIGF-02 append target (D-03)**. Load-bearing: stage template throughout; Stage 2 "Intune Readiness, Secret Retrieval, and Source Release" (`:126-182`) = the Kandji/Iru release sub-structure + hedge discipline to mirror; Stage 8 FileVault Key Rotation (`:347`) & Stage 9 PSSO Re-Registration (`:373`) = macOS-only, DROP for iOS; B2 handoff (`:505-513`) = link-not-copy wipe-path precedent; See Also (`:517`), Glossary Quick Reference (`:541`), Version History (`:560`).
- `docs/ios-lifecycle/01-ade-lifecycle.md` — **link-not-copy target for the iOS pre-26 wipe re-enroll (D-02)**; the ADE pipeline the wipe pointer hands off to; also the closest template exemplar for the new file.
- `docs/ios-lifecycle/00-enrollment-overview.md` — iOS lifecycle nav/overview; new `02-` file slots beside it.
- `docs/_glossary-macos.md` — shared Apple glossary (covers iOS/iPadOS terms); new file's glossary links resolve here (link-not-copy).

### Pillar B — corpus fixes (live edit targets, per D-04 drift table)
- `docs/index.md` — FIX-01 at `:110` (macOS L1 Runbooks row); `:112` PSSO row already references #35/#36/#37.
- `docs/quick-ref-l1.md` — FIX-02 at `:106` (#36 trigger); siblings #35 `:107`, #37 `:108`.
- `docs/common-issues.md` — FIX-03 in the "macOS Local Password: User Locked Out" block ~`:249-254` (#37 `:253` → insert #36 → L2 #27 `:254`); the "Platform SSO Re-Registration Failure (Post-Migration)" block ~`:241-247` is **NOT** the target.
- `docs/l1-runbooks/00-index.md` — count source of truth: `## macOS ADE Runbooks` H2 (`:36`, #10-15 + #35/#36/#37 = 9) vs separate `## 802.1X L1 Runbooks` H2 (`:123`, cross-platform #38-41).

### Conventions & predecessor decisions
- `.planning/phases/109-802-1x-integration-capability-matrices-navigation-hubs/109-CONTEXT.md` — link-not-copy, plain-GitHub auto-slug anchors + double-hyphen trap, 90-day freshness stamps, navigation-last invariant, callout vocabulary (NOTE/WARNING/DANGER/CRITICAL). (Note: the macOS migration file predates the callout-vocab lock and uses `> **Important:**` in places — reuse the file's own existing callout style when appending D-03, don't mint new types.)

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- **macOS migration stage template** (`02-mdm-migration-psso.md`): the entire scaffold (front-matter, path table, mermaid, Stage Summary, 4-part per-stage blocks, See Also, Glossary QR, Version History) is copied wholesale into the new iOS file (D-01), minus the FileVault/PSSO stages.
- **Stage 2 source-release sub-structure** (`:126-182`): FileVault-key / Activation-Lock-bypass / Delete-Device-Record pattern + the "verify on your authoring day" hedge language is reused twice — for the iOS Activation-Lock release (D-02) and the Jamf/Mosyle appendix (D-03).
- **`ios-lifecycle/01-ade-lifecycle.md` ADE pipeline**: the D-02 pre-26 wipe pointer links here instead of re-authoring enrollment.

### Established Patterns
- One-topic-per-file with parallel `NN-` numbering per platform lifecycle dir (drives D-01).
- link-not-copy (drives D-02 pointer + D-03 "reference, don't re-author Stage 2").
- Conceptual-action + heavy "verify labels on your authoring day" hedging for un-verifiable vendor consoles (drives D-03 depth).
- Plain-GitHub auto-slug anchors; ` / ` in headings → double-hyphen slug trap (drives D-03 heading wording).

### Integration Points
- New iOS migration file (D-01) will need nav-hub entries (index.md, ios nav) — but **navigation-last**: wire only after the content file is committed.
- FIX edits are self-contained single-line/single-block touches; no cross-file wiring beyond the existing cross-links already present.

</code_context>

<specifics>
## Specific Ideas

- SC4's explicit differentiator: the iOS Deadline Enforcement stage MUST contrast **iOS/iPadOS forced-restart + deadline enforcement** against the **macOS full-screen lock** — this is the phrase the requirement is built around; do not gloss it.
- MIGF-02 names the three Jamf/Mosyle sub-steps verbatim: **FileVault key retrieval, Activation Lock bypass, device-record deletion** — each vendor H3 should cover all three.

</specifics>

<deferred>
## Deferred Ideas

- Full iOS wipe-and-re-enroll *track* (Finder's original Option B) — deliberately rejected as over-build vs literal MIGF-01 scope; the pre-26 case is covered as a pointer (D-02). If a future milestone wants a first-class iOS wipe walkthrough, it's a new requirement.
- Windows / Android / Linux MDM-migration walkthroughs — out of scope; not requested by any v1.14 requirement.
- Reconciling the macOS migration file's pre-callout-vocab `> **Important:**` usages to the locked NOTE/WARNING/DANGER/CRITICAL set — corpus-hygiene nit, not in Phase 110 scope.

</deferred>

---

*Phase: 110-pillar-b-c-corpus-fixes-mdm-migration-walkthroughs*
*Context gathered: 2026-07-01*
