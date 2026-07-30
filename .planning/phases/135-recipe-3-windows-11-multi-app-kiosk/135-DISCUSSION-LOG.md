# Phase 135: Recipe #3 — Windows 11 Multi-App Kiosk - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-07-29
**Phase:** 135-Recipe #3 — Windows 11 Multi-App Kiosk
**Areas discussed:** XML presentation format (DOMINANT), Rollback/Recovery template divergence, Verification mechanism, Enrollment-path fork + XML account scope, Prerequisites shape / edition floors, First-lander precedent, HYG-05 correction scope — all 7 selected

**Method:** The user selected all 7 gray areas and directed: *"Use /grill-me to thoroughly raise additional questions in each of the areas and use /adversarial-review to evaluate each of the questions in each of those areas to recommend the best one and provide your reasoning."*

---

## Process record

| Stage | Output |
|---|---|
| Codebase scout | C17 baseline 232/0; fence census (57/280 files, ~236 blocks, 3 files ship ` ```xml `); validator-pin inventory for `EEE-SOP-standard.md` (3 readers, all content-string) and `recipe-template.md` (1 pin: existence + TEMPLATE-SENTINEL) |
| `/grill-me` | 33 questions across the 7 areas, each with a recommended answer + evidence; 13 ground-truth claims (G1-G13) stated for independent verification |
| Adversarial round 1 | 4 parallel Finders (Area 1+7 / Area 2+3 / Area 4+5 / Area 6+cross-cutting) → 381 pts raw, 72 findings after dedup → Adversary claimed 45 disproofs → Referee: **33 real / 39 false positives**, 6 of the Adversary's disproofs failed |
| User ratification | All 4 flips ratified; **self-deploying** chosen for the enrollment axis; second adversarial round requested |
| Adversarial round 2 | 3 Finders on the amended set → 254 pts raw, 32 findings → Adversary disproved 6 → Referee: **39 real / 7 false positives**, 6 blockers |

Two round-2 Finders **executed** rather than read: one ran pandoc 3.7.0.2 on a fence-inside-numbered-list fixture; one converted a real fenced CDATA payload through the full pipeline and inspected `word/document.xml`. Both results overturned round-1 rulings.

---

## XML presentation format (DOMINANT)

| Option | Description | Selected |
|--------|-------------|----------|
| Column-0 ` ```xml ` fence carrying the complete payload | Schema-valid whole document; matches the RE-126 precedent | |
| Field-decomposition table + assembly prose | Keeps everything in indexed body text; no fence in a recipe | |
| **BOTH — fence for assembly, table for semantics** | Fence carries schema-correct element order; table carries decision-relevant fields in indexed prose | ✓ |

**User's choice:** Recommendation accepted (survived both rounds).
**Notes:** All five attacks on the fence failed. `REQUIREMENTS.md:91` states *"Given that D-03/D-04 bind only decision content"* as a settled premise and supplies *"neither shipped recipe contained payload-shaped content to fence"* — pre-ruling the zero-fence state non-precedential. D-04 rule 2's *"never fenced pseudo-config"* has subject **"Branch bodies"**, of which a single-path recipe authors none. C17 has no fence-ban assertion at all. But **three implementation details were wrong** and were corrected: the backslash direction (round 2 B-3), the fence placement rule (A-1), and the namespace row set (B-4).

**Rejected on evidence:** the Phase-130 `D-LOCK-5` objection (it is a Phase-130 ownership ruling about specific decision content — RE-080's ZTDId rule and a SharedPC "Recorded as" column — not corpus fence law, and its fence aversion rests on the very premise HYG-05 deletes).

---

## Rollback/Recovery template divergence

| Option | Description | Selected |
|--------|-------------|----------|
| Amend `recipe-template.md` to add the slot | Validator-safe (only 1 pin) but makes recipes 01/02 retroactively non-conformant | |
| **Diverge with a named documented exception** | KIOSK-04 locks "named divergence"; avoids foundation-class ripple | ✓ |
| Optional template slot | Genuine third option — no non-conformance, sanctioned home for recipe 04+ | (deferred) |

**User's choice:** Recommendation accepted.
**Notes:** The stated *reason* was corrected — an amendment is validator-safe (`check-phase-129.mjs:57-68` pins only existence + `TEMPLATE-SENTINEL`; no validator asserts an H2 set or order), so the honest rationale is the recipe-01/02 conformance ripple, not "the harness blocks it." Placement (between Verification and Configuration-Caused Failures) is locked by KIOSK-04 + SC4 and inverts 4/4 corpus precedent — but those are `docs/reference/` docs with a different skeleton, so the lock stands. The optional-slot third option is recorded as a deferred idea.

---

## Verification mechanism

| Option | Description | Selected |
|--------|-------------|----------|
| Observable behaviour only | No tooling line; safest | |
| `AssignedAccess > Operational` as a secondary line | What KIOSK-05 and SC5 name | |
| Substitute `AssignedAccess/Admin` (Event 31000) | Enabled by default; Operational is not | (round-1 pick, superseded) |
| **Augment: keep Operational + add its enable-precondition + add Admin/31000** | Satisfies SC5 literally AND is executable | ✓ |

**User's choice:** Round-1 flip ratified, then refined by round 2.
**Notes:** The factual finding held — `Operational` is *"disabled by default"* and *"events are only captured once"*, so a fresh kiosk's empty channel reads as "clean," a guaranteed false pass. But the round-1 *disposition* (substitute) would have failed the phase's **own in-phase verifier**: `gsd-verifier.md:169` — *"must-haves must NOT reduce scope… never subtract roadmap SCs"* — since SC5 names the Operational channel verbatim. The augment resolution satisfies SC5 literally, needs no `overrides:` pre-authorisation, keeps Phase 138's close-gate flip truthful, and is strictly more factual than either alternative. Also confirmed: `AppNotFound` is a `Status`-node code, not a log entry, and was deleted from Verification.

---

## Enrollment-path fork + XML account scope

| Option | Description | Selected |
|--------|-------------|----------|
| Local autologon account | Microsoft's kiosk-resilience pairing; no CA exposure | |
| **Entra named/grouped `Config`** (account-model axis) | What Learn recommends when apps require user authentication | ✓ |
| **Self-deploying** (enrollment axis) | No user affinity; dodges the admin-user hazard; fresh anchor doc | ✓ |
| User-driven (enrollment axis) | Original recommendation | |

**User's choice:** Entra/grouped account model (confirmed twice); **self-deploying** enrollment (user-selected from the A-3 split).
**Notes:** The single highest-stakes call in the review. A round-1 Finder argued the Entra path is what Microsoft documents as *broken*; the Adversary and Referee both refuted it — the *"use a local, nonadministrator account"* sentence is scoped to *"The **kiosk profile** is designed for public-facing kiosk devices"* (single-app `KioskModeApp`), while the very next paragraph covers *"a kiosk **or a restricted user experience**"* and says *"If applications require user authentication, don't use a local or generic user account. Rather, **target the group of users**."* A round-2 Finder re-raised it as "supported but incoherent" and was ruled a false positive: recipe 01 **already ships** self-deploying + interactive Entra sign-in (`01:9`, `01:179`), and Learn lists the sign-on-screen outcome **first**.

The review's real contribution here: the document had **bundled two independent axes**. Splitting them let each be ruled on its own evidence, and choosing self-deploying dissolved three amendments (the admin-user prerequisite, the ESP user-phase delta, the stale `06-user-driven.md` cross-link).

**Case type flipped twice:** round 1 said Case 2 (Case 1 needs both arms worked); round 2 flipped it to **Case 1 with a routing cross-link arm** — `ROADMAP.md:82` Phase-136 SC2 locks that exact shape at **SC level**, and `REQUIREMENTS.md:79`'s "Case-1 fails" ruling is scoped to the SharedPC arm that *cannot* be authored. Round 2 then found the Case-1 `Branch` cell has **no destination in the corpus**, resolved by routing it to a new anti-feature row (the `02:194` idiom).

---

## Prerequisites shape / edition floors

| Option | Description | Selected |
|--------|-------------|----------|
| Split floors by branch | | |
| **Single unified statement with the "identical for both" clause** | `PITFALLS.md:67` mandates this exact clause | ✓ |

**User's choice:** Recommendation accepted, with two corrections.
**Notes:** LTSC variants must be spelled out (four *families*, not four tokens). The Pro Education footnote was **restored** — omitting it overrode `STACK.md:30`'s explicit *"Flag for the recipe"* directive. The 22H2 wording was corrected: "categorical" overrode `STACK.md:107`'s HIGH-rated "v4 = 21H2+" by inference-from-silence (`PITFALLS.md:306` Pitfall 20's named class). Round 2 also found the VM/vTPM `0x800705B4` caveat is **not** discharged by the `08-self-deploying.md` cross-link — that file contains zero matches for it.

---

## First-lander precedent

| Option | Description | Selected |
|--------|-------------|----------|
| **Option A — taxonomy sentence in each recipe's Scope banner** | Zero new files, zero frozen-surface risk | ✓ (RE-224 only) |
| Option B — new Reference doc for the taxonomy | The only DRY option, per ARCHITECTURE.md | |
| Option C — fold into `4-platform-capability-comparison.md` | | |

**User's choice:** Option A, but **scoped to RE-224 only**.
**Notes:** Round 2 found the original ruling decided a gray area `ROADMAP.md:89` charters to **Phase 136** — with no landing spot in Phase 136's scope, which is the milestone's own #1 recurring lesson. Phase 135 now rules only its own Scope banner. Counter-evidence that had been suppressed is now disclosed: `05-dedicated-devices.md:36` **delegates to a single source** (a glossary anchor), and `ARCHITECTURE.md:162` assesses Option B as *"the only one that adds zero risk… while still giving the taxonomy a single, citable, DRY home."* Option A wins on **cost**, not on suppressed evidence. Option C's stated hazard mechanism was also wrong — its pins are filename constants and content-string needles, not `{file,line}` coordinates.

---

## HYG-05 correction scope

| Option | Description | Selected |
|--------|-------------|----------|
| Two sites (`:462`, `:496-497`) | What SC6 and HYG-05 name | |
| **Three sites (+ `:538-539`)** | The third is the *recipe-specific* instance | ✓ |

**User's choice:** Recommendation accepted, expanded by round 1.
**Notes:** `:538-539` (STD-05 D-07) carries the same false mechanism asserted specifically about recipes — the file class this phase creates. Shipping only two sites would have left HYG-05 self-declared-done with the claim still governing. Phase-130 C-LOCK-2 is direct precedent that an undercounted site list is a real defect. A round-2 Finder swept the whole corpus and confirmed **exactly three** sites, no fourth. The third edit is *additive* so it does not falsify SC6 — but it must appear in the plan's `must_haves` or the verifier will never look for it. Separately, HYG-05's own mandated *"retrieve poorly"* wording is unfalsified: `PIPE-02-FINDINGS.md` has zero occurrences of `fence`, `code block`, `SourceCode`, or `VerbatimChar` — it never tested fenced-content retrieval. Ship the locked wording, log the extrapolation.

---

## Claude's Discretion

- Exact prose wording within every locked ruling (step text, callout phrasing, table cell wording).
- The concrete worked app set, AUMIDs, and `pinnedList` entries in the payload.
- Whether `applyOnce` is included in the worked JSON.
- The taxonomy sentence's exact wording in RE-224's Scope banner, subject to the C17 `#12` measurement.
- The descriptive slug within `docs/recipes/03-*.md`.
- Whether the UAC / no-RDP system requirements are stated for the restricted user experience — rule it either way, but rule it explicitly.

## Deferred Ideas

- **Gray area #8** (corpus-wide kiosk/dedicated taxonomy anchor) — chartered to Phase 136; Option B barred there by CLASS-05's locked 223→225 canary.
- **An optional `## Rollback/Recovery` slot in `recipe-template.md`** — the genuine third option to the amend/diverge binary; candidate for the next recipe milestone.
- **C17-vs-pipeline fence-mask divergence** — logged to `v1.19-DEFERRED-CLEANUP.md`; avoided here by mandating column 0.
- **A real retrieval test for fenced content** — would falsify or confirm HYG-05's "retrieve poorly" clause; a future PIPE-class item.
- **RCPFUT-05 leg 1** — arguably satisfied by this phase's fence ruling; leg 2 (branding-asset hosting) still zero-match, so the conjunctive trigger cannot fire.
- **A Windows-kiosk L1/L2 runbook** — Out of Scope per `REQUIREMENTS.md:81`; the failures table routes to in-recipe anchors instead.

## Requirement/SC defects found (to log as named corrections)

1. `REQUIREMENTS.md:17` + `research/FEATURES.md:44` — the security-screen claim is false for 3 of the 4 named shortcuts.
2. Same two sites — `Remove-Logoff` should be `Remove Logoff`.
3. ROADMAP SC5 / `REQUIREMENTS.md:18` + 4 research sites — the Operational channel is disabled by default; the SC is *incomplete*, not wrong.
4. `REQUIREMENTS.md:15` — "base 2017" is `default` in Learn's table, but `default` is not a writable prefix.
5. HYG-05's own "retrieve poorly" clause — unfalsified by its cited evidence base.
