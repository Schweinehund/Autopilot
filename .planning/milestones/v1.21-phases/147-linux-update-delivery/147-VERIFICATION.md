---
phase: 147-linux-update-delivery
verified: 2026-08-21T00:00:00Z
status: passed
score: 29/29 must-haves verified
behavior_unverified: 0
overrides_applied: 0
flagged_prohibitions: 7
human_verification:

  - test: "Judgment-tier prohibition (LNX-02, safety): confirm the guide ships no copy-pasteable root-context fleet-wide package-upgrade command or script body."
    expected: "No runnable upgrade artifact. Verifier evidence: zero code fences in the file (grep -c '```' = 0); zero matches for `apt upgrade`/`apt-get upgrade`/`apt full-upgrade`/`sudo apt`; the guide states its own abstention at line 163. The only shell string present is `sudo pro attach` (a subscription-attach command, not a package upgrade)."
    why_human: "Judgment-tier prohibition with no wired enforcement test. LLM-judge verdict is non-authoritative — unverified-prohibition, human review recommended."

  - test: "Judgment-tier prohibition (LNX-01, transparency): confirm no framing of Intune as orchestrating, scheduling, deferring or enforcing Linux updates."
    expected: "Only 'Intune delivers a script and the distro does the updating'. Verifier evidence: lines 56-80 state the absence four ways; the matrix-reconciliation paragraph draws the delivery-vs-orchestration line explicitly ('Intune does not orchestrate Linux updates; it delivers a script that does'). The one scheduling verb present ('runs it on a schedule Intune sets') is scoped to the script, and the Unsupported callouts restate 'A schedule on a platform script is a schedule for the script, not a deadline for the update.'"
    why_human: "Judgment-tier prohibition — reads as honored, but the verdict is a language judgment, not a gate."

  - test: "Judgment-tier prohibition (LNX-01, transparency): confirm Ubuntu-only apt-family mechanics are not presented as covering the full Intune-supported Linux estate."
    expected: "RHEL 9/10 gap stated explicitly, never implicit. Verifier evidence: the Scope paragraph (lines 27-34), the supported-platform blockquote, and a dedicated Unsupported callout plus a final table row all state the gap. Live-confirmed that ref-supported-platforms carries RedHat Enterprise Linux 9 and 10."
    why_human: "Judgment-tier prohibition — sufficiency of a disclosure is a human call."

  - test: "Judgment-tier prohibition (LNX-03, safety): confirm no advice to weaken security posture for cleaner reporting/compliance/scheduling."
    expected: "No advice to disable a security origin, disable automatic security updates, or widen Allowed-Origins beyond the first-party source. Verifier evidence: the guide affirmatively bars all three at lines 213-216 ('Do not make reporting or scheduling tidier by weakening this posture')."
    why_human: "Judgment-tier prohibition — absence of bad advice cannot be proven by grep."

  - test: "Judgment-tier prohibition (LNX-04, values): confirm the Phase-50 compliance-script single source of truth is not re-authored, forked or partially restated."
    expected: "Compliance section is pointer-only for script authoring and evaluation cadence. Verifier evidence: lines 334-339 state 'It does not teach discovery-script authoring and it does not state an evaluation cadence: both belong to Linux Compliance Policy, which is the single source of truth'."
    why_human: "Judgment-tier prohibition — 'partial restatement' is a boundary judgment."

  - test: "Judgment-tier prohibition (plan 02, LNX-01, transparency): confirm the overview's Linux cells never imply Intune orchestrates/schedules/defers/enforces, with every absent capability written as an explicit parenthetical absence."
    expected: "No blank or softened cells. Verifier evidence: Deferral cell = '(No Intune-side deferral; distro-native only)'; Enforcement cell = '(None — compliance policy + web-app CA is attestation only)'. All rows carry 6 columns; no empty Linux cell."
    why_human: "Judgment-tier prohibition — 'softened' is a wording judgment."

  - test: "Judgment-tier prohibition (plan 02, LNX-01, values): confirm no existing platform's cells, routing sentences or capability statements were degraded, truncated or dropped to make room for Linux."
    expected: "Five-platform rewrite is additive for every existing reader. Verifier evidence: git diff bbfe959b..HEAD on 00-overview.md shows each removed 4-column row replaced by a 6-column row preserving the Windows/macOS/iOS/Android cell text verbatim; only additive prose changes elsewhere."
    why_human: "Judgment-tier prohibition — requires reading the full diff for subtle wording loss."

  - test: "WR-10 (unfixed code-review warning, owner decision requested): the overview's Cadence-alignment bullet at 00-overview.md:194 reads 'Linux distro-native `apt` updates on the distribution's own security-pocket cadence'."
    expected: "Owner decides whether to fix or accept. This clause states the security-only reading that the guide it routes to exists specifically to refute (05-linux-update-delivery.md:200-206: 'Four origins are enabled by default, not one … The default is therefore not security-only'). It is new text introduced by this phase, in a file this phase modified. It does not fail any must_have truth (SC#3 is scoped to the guide, which is correct and emphatic) and the overview's own Cadence-model table cell is correct, but the hub and the guide now disagree on LNX-03's central claim. REVIEW.md supplies a one-clause fix."
    why_human: "Internal-consistency judgment across two files; no validator covers it, and the fix is a scope call for the owner."
---

# Phase 147: Linux Update Delivery Verification Report

**Phase Goal:** The corpus becomes genuinely five-platform for updates — a Linux admin learns exactly what Intune can and cannot enforce, and the fleet-wide root-context hazard is named before someone ships it.
**Verified:** 2026-08-21
**Status:** human_needed
**Re-verification:** No — initial verification

## Goal Achievement

The phase goal is achieved. `05-linux-update-delivery.md` (484 lines) exists, is substantive, is
wired into the hub from three link sites plus a fourth prose clause, and every load-bearing claim in
it was independently re-fetched from the live source by this verifier and matched byte-for-byte.
All six declared gates were re-run and reproduce their claimed output exactly.

### Observable Truths

Merged from ROADMAP Success Criteria (SC#1–4) and both plans' `must_haves.truths` (29 total,
including 4 `verification: backstop` truths).

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | SC#1 — no native Intune Linux update policy; Bash platform script as mechanism; compliance + CA as attestation not enforcement; mapped onto the deferral/enforcement/attestation triad | ✓ VERIFIED | `05:56-59` states the absence flatly ("Not a partial one, not a preview one — the policy surface does not exist"). `05:61-66` names the Bash platform script. `05:81-115` maps all three primitives explicitly; Attestation bullet + closing line "a compliance policy plus Conditional Access is attestation — and attestation only." |
| 2 | SC#2 — root-context hazard is the primary pitfall, all four conjuncts at the hazard site | ✓ VERIFIED | `05:381-397`, first item under Unsupported and Anti-Feature Callouts: **Root** context bullet, **Every 15 minutes** default bullet, **no documented run-time cap on that surface** bullet, and the fleet-wide consequence bullet. |
| 3 | SC#2 arithmetic stated exactly — 96 times a day = 1440 / 15 | ✓ VERIFIED | `05:396-397`: "96 times a day. The arithmetic is exact: 1,440 minutes in a day divided by 15 minutes is 96 runs, per device, fleet-wide." |
| 4 | SC#2 consequence spelled out — lock contention + reports "patched" while running the old kernel | ✓ VERIFIED | `05:399-405`: "`dpkg` and `apt` take exclusive locks … a device that installed a kernel update but never rebooted reports itself patched while it is still running the old kernel." |
| 5 | SC#2 — the five-minute cap is NOT attributed to this surface | ✓ VERIFIED | The only "five minutes" occurrence in the file is `05:351`, inside the compliance-discovery blockquote. `05:365-368` states the separation explicitly. **Live negative confirmed:** the platform-script page carries 0 occurrences of `run time`/`runtime`/`timeout`/`maximum`/`megabyte`/`five minutes`. |
| 6 | User-default empty case stated (no signed-in user / no user affinity → does not run) | ✓ VERIFIED | `05:141-146`. |
| 7 | Two Bash surfaces never merge; disclaimer within two lines of the five-minutes string | ✓ VERIFIED | Disclaimer at `05:349`, quote at `05:351` — 2 lines. Both 1-MB limits distinguished at `05:355-356`. |
| 8 | SC#3 — four enabled origins (not security-only) + three commented-out, quoted from the `This is the default:` block | ✓ VERIFIED | **13/13 lines byte-identical** to the live Canonical block following the page's own literal preamble `This is the default:`. Correct block selected (the page carries 8 `Allowed-Origins` occurrences); `-updates`/`-proposed`/`-backports` commented, no PPA. Prose at `05:196-209`. |
| 9 | SC#3 — reboot-required detection in `## Reboot Handling`, first-party source, marker as readable state not a log line | ✓ VERIFIED | `05:233-290`. Live-confirmed on upgrade-your-release: "if the file `/run/reboot-required` exists, then you will need to reboot". |
| 10 | Both reboot-path spellings attributed to the page that carries each, with no equivalence asserted | ✓ VERIFIED | **Live-confirmed disjoint:** `/var/run/reboot-required` HIT on automatic-updates, MISS on upgrade-your-release; `/run/reboot-required` HIT on upgrade-your-release. `05:277-283` states "neither is asserted to be the other" and claims no relationship. |
| 11 | SC#4 — Ubuntu Pro / Livepatch as Canonical-side entitlement outside Intune's control plane, verifiable only via custom compliance script | ✓ VERIFIED | `05:294-303`; restated at `05:326-329` and in the Unsupported callouts. |
| 12 | SC#4 — every third-party figure re-verified before shipping or omitted | ✓ VERIFIED | All four figures re-fetched live from `ubuntu.com/pro` this session; all four HIT verbatim. |
| 13 | Each Ubuntu Pro figure bound to its own tier (5→personal, 50→Community members, 10 yr→ESM whole archive, 15 yr→Legacy add-on) | ✓ VERIFIED | All four bindings confirmed against the live page as full-sentence literals — no re-pairing. `05:311-315` keeps each in its own quoted sentence. |
| 14 | Guide openly Ubuntu-scoped; RHEL 9/10 named as Intune-supported; apt-family stated; RHEL out of scope with no first-party Intune source (D-01) | ✓ VERIFIED | `05:27-34` + blockquote + Unsupported callout + table row. Live-confirmed RedHat Enterprise Linux 9 and 10 on ref-supported-platforms. |
| 15 | `v1.20-milestone-audit.mjs` → 16 passed, 0 failed | ✓ VERIFIED | Re-run: `Summary: 16 passed, 0 failed, 0 skipped`. |
| 16 | `check-nav-hub-links.mjs` → 0 hub-presence, 0 corpus-link failures | ✓ VERIFIED | Re-run: `0 hub-presence failure(s), 0 corpus-link failure(s), 0 total`. |
| 17 | `c17-eee-contract.mjs` → 234 files, 0 violations (count does NOT become 235) | ✓ VERIFIED | Re-run: `234 files checked, 0 with violations`, all 13 assertions 0. |
| 18 | `check-phase-54.mjs` → 32 passed, 0 failed, 0 skipped | ✓ VERIFIED | Re-run: `Summary: 32 passed, 0 failed, 0 skipped`. |
| 19 | [backstop] Between commit 1 and commit 2 the corpus is green, not red | ✓ VERIFIED | **Directly observed**, not inferred: a throwaway worktree at `8189c560` shows the guide present with **0** inbound references in 00-overview.md, and all four validators green (nav-hub 0/0, C17 234/0, ph54 32/0/0, audit 16/0). Mechanism confirmed at `check-nav-hub-links.mjs:457` — hub-presence tests only that the 4 ratified hubs exist; there is no orphan detection. Worktree removed. |
| 20 | [backstop] Root / frequency / retries ship as one blockquote in source order; causal chain stated in that order | ✓ VERIFIED | Single blockquote `05:130-137`, order Execution context → Execution frequency → Execution retries, matching the live page. Causal chain `05:139-152` runs User no-op → switch to Root → inherits 15-min default → No-retries hides failure. |
| 21 | [backstop] Every `**Source:**` line re-fetchable and diffable; MS date-derived vs Canonical commit/retrieval-derived shapes distinguished | ✓ VERIFIED (exogenous) | See Sourcing Re-Verification below. **Zero fabrications.** All 3 Microsoft `updated_at` values match exactly; both Canonical commit dates match exactly; both undated Canonical pages correctly carry `(retrieved …)` plus an explicit statement that the page exposes no date. |
| 22 | Overview carries a fifth Linux column, appended last, every row on one physical line | ✓ VERIFIED | Header `\| Concept \| Windows \| macOS \| iOS/iPadOS \| Android \| Linux \|`; rows 52-58 all 6 columns, all single physical lines (max 403 chars, unwrapped). |
| 23 | Overview prose reads five-platform everywhere | ✓ VERIFIED | `grep -oi '\bfour\b' \| wc -l` = **0**; 7 `five` tokens. Column-order sentence, blockquote enumeration, H1 intro, Ring Terminology sentence and Planning-Considerations bullets all updated. |
| 24 | Overview frontmatter `platform:` is still exactly `cross-platform` | ✓ VERIFIED | Line 6: `platform: cross-platform`. |
| 25 | Overview routes a Linux reader from four places | ✓ VERIFIED | Blockquote `:20`, routing list `:179`, Related Resources `:245` (3 links), plus the Attestation `Examples:` clause `:140-142`. D-39 specifies "a Linux **clause**" for site 5, not a link — and the sibling platforms in that same clause are likewise prose-only ("detailed in the Android per-platform guide"), so the delivered form matches both the decision and the local convention. |
| 26 | Phase-146 D-73 defect corrected with a Microsoft Learn source | ✓ VERIFIED | `00:90-96` now reads "the driver policy has its own 0–30 day deferral instead, configured by its **Make updates available after (days)** setting and counted from the day the update was added to the policy". **Live-confirmed** on `configure-driver-update-policy` (`updated_at` 2026-04-24, matching the Source line): "The delay supports from zero to 30 days and starts from the day the update is added to the policy". The old defective text ("the 0–30 day deferral are set per deployment ring") is gone from the diff. |
| 27 | Three `**[OWNER-RULED IN SCOPE 2026-08-20]**` markers in REQUIREMENTS.md | ✓ VERIFIED | Lines 42 (DRV-02), 51 (LNX-01), 53 (LNX-03) — following the REQUIREMENTS.md:46 DRV-06 instrument. |
| 28 | PITFALLS.md misattributed Canonical citation corrected in-phase | ✓ VERIFIED | `PITFALLS.md:541` carries the `[CORRECTED 2026-08-21 … D-32]` marker. **Live-confirmed:** `update-notifier-common` = **0** occurrences on the cited Canonical page; the single `update-notifier` hit is the same-prefix decoy ("implemented graphically on Ubuntu Desktop by the update-notifier program"). |
| 29 | `check-phase-144.mjs` (apex) → 101 PASS, 0 FAIL, 0 SKIPPED | ✓ VERIFIED | Re-run: `Result: 101 PASS, 0 FAIL, 0 SKIPPED (total checks: 101)`. |
| 30 | [backstop] Each inserted literal appears in 00-overview.md exactly once | ✓ VERIFIED | `05-linux-update-delivery.md` = 3 (the three intended link sites), `\| Linux \|` = 1, `Linux Update Delivery` = 3. `sort \| uniq -d` yields only `---` (frontmatter delimiter + horizontal rules). No double insertion. |

**Score:** 29/29 truths verified (0 present-but-behavior-unverified). Truth count is 29 distinct
must-haves; the table lists 30 rows because SC#2's consequence clause is broken out separately from
the four-conjunct row for readability.

### Sourcing Re-Verification (independent live re-fetch)

The executors were confined to the RESEARCH quote bank by rule R6. This verifier re-fetched every
`**Source:**` target independently and diffed the quoted strings.

| Source | Guide's date claim | Live value | Quotes diffed | Result |
|--------|-------------------|-----------|---------------|--------|
| MS: ref-supported-platforms | updated 2026-07-01 | `updated_at` = 2026-07-01T22:34:00Z (`ms.date` 2025-10-14) | 4 distro strings | ✓ exact |
| MS: custom-settings-linux | updated 2026-07-01 | `updated_at` = 2026-07-01T22:34:00Z (`ms.date` 2025-01-09) | Root/User/frequency/retries blockquote (8 literals) + RHEL 8 conflict claim | ✓ exact |
| MS: create-custom-script | updated 2026-07-15 | `updated_at` = 2026-07-15T22:35:00Z (`ms.date` 2025-09-04) | two 1-MB limits, five-minutes cap, user-context/elevation limit, /etc/sudoers example | ✓ exact |
| MS: configure-driver-update-policy | updated 2026-04-24 | `updated_at` = 2026-04-24T12:33:00Z | "zero to 30 days", "Make updates available after (days)" | ✓ exact |
| Canonical: automatic-updates | updated 2026-07-15 | commit `4826f308`, 2026-07-15T12:46:36Z | Allowed-Origins block (13/13 lines), both reboot keys + both defaults, the WARNING log line | ✓ exact |
| Canonical: upgrade-your-release | updated 2026-07-06 | commit `07aa7d44`, 2026-07-06T09:17:36Z | `/run/reboot-required` prose | ✓ exact |
| Canonical: ubuntu.com/pro | retrieved 2026-08-21 | page exposes no date — guide says so explicitly | all 4 figure-to-tier sentences | ✓ exact |
| Canonical: pro attach-tutorial | retrieved 2026-08-21 | site exposes no date — guide says so explicitly | `sudo pro attach` narrative | ✓ consistent |

**Zero fabrications.** The date-shape difference the verification notes warned about is real and
benign: Microsoft pages carry both `ms.date` (2025-*) and `updated_at` (2026-*); the corpus
convention uses `updated_at`, and RESEARCH.md:749-751 records both fields for each page. Canonical
pages correctly use commit dates or `(retrieved …)`.

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `docs/operations/patch-management/05-linux-update-delivery.md` | New Linux update guide | ✓ VERIFIED | 484 lines, 8 H2 sections, 8 own-line anchors, 2 tables, Related Resources + External References. Exists / substantive / wired / claims sourced. |
| `docs/operations/patch-management/00-overview.md` | Five-platform hub | ✓ VERIFIED | 6-column table, 0 `four` tokens, 4 Linux routing sites, D-73 correction, frontmatter unchanged. |
| `.planning/REQUIREMENTS.md` | 3 owner-ruled markers + LNX rows | ✓ VERIFIED | Lines 42/51/53 markers; LNX-01..04 all `[x]`. |
| `.planning/research/PITFALLS.md` | Misattribution corrected | ✓ VERIFIED | Line 541 corrected with marker; live-confirmed. |

### Key Link Verification

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| `00-overview.md` | `05-linux-update-delivery.md` | 3 relative links + 1 prose clause | ✓ WIRED | Lines 20, 179, 245 + Examples clause 140-142. |
| `05-linux-update-delivery.md` | `00-overview.md`, `admin-setup-linux/*`, `reference/*`, `_glossary-linux.md`, `decision-trees/09-linux-triage.md` | relative links | ✓ WIRED | check-nav-hub-links: 0 corpus-link failures, no allowlist / ratchet / expected-failure list. |
| 8 own-line `<a id>` anchors | Phases 148 / 151 consumers | stable cross-link contract (D-69, D-73) | ✓ WIRED | Lines 52, 81, 117, 167, 233, 292, 332, 381. All 8 intra-document `#anchor` references resolve (nav-hub anchor-fragment check green). |
| H1 `# Linux Update Delivery` | Phase 152 registry Title input | deferred by D-64 | ✓ PRESENT | H1 at line 17. No registry / filename-map / ops-index / nav-hub row created — correct per D-64. |

### Behavioral Spot-Checks

| Behavior | Command | Result | Status |
|----------|---------|--------|--------|
| Apex chain green | `node scripts/validation/check-phase-144.mjs` | `101 PASS, 0 FAIL, 0 SKIPPED` | ✓ PASS |
| Milestone audit green | `node scripts/validation/v1.20-milestone-audit.mjs` | `16 passed, 0 failed, 0 skipped` | ✓ PASS |
| Link integrity | `node scripts/validation/check-nav-hub-links.mjs` | `0 hub-presence, 0 corpus-link, 0 total` | ✓ PASS |
| EEE contract, count unchanged | `node scripts/validation/c17-eee-contract.mjs` | `234 files checked, 0 with violations` | ✓ PASS |
| Patch-management validator | `node scripts/validation/check-phase-54.mjs` | `32 passed, 0 failed, 0 skipped` | ✓ PASS |
| Filename-map self-test | `node scripts/pipeline/build-filename-map.mjs --self-test` | `8 passed, 0 failed` | ✓ PASS |
| Intermediate-commit greenness | worktree @ `8189c560` + 4 validators | guide present, 0 inbound refs, all 4 green | ✓ PASS |
| Live source re-fetch | `curl` + tag-strip + literal grep, 8 pages | all quoted strings HIT; all dates exact | ✓ PASS |

All six declared gates reproduce their claimed output exactly. No SUMMARY claim was taken on trust.

### Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
|-------------|-------------|-------------|--------|----------|
| LNX-01 | 147-01, 147-02 | No native Linux update policy; Bash script mechanism; compliance + CA as attestation, mapped onto the triad | ✓ SATISFIED | Truths 1, 22-25; REQUIREMENTS.md:51 `[x]`, traceability :181 Complete |
| LNX-02 | 147-01 | Root-context execution hazard as primary pitfall | ✓ SATISFIED | Truths 2-7; REQUIREMENTS.md:52 `[x]`, :182 Complete |
| LNX-03 | 147-01 | `unattended-upgrades` four enabled origins, commented-out trio, reboot-required detection | ✓ SATISFIED | Truths 8-10; REQUIREMENTS.md:53 `[x]`, :183 Complete |
| LNX-04 | 147-01 | Ubuntu Pro / Livepatch outside Intune's control plane; figures re-verified or omitted | ✓ SATISFIED | Truths 11-13; REQUIREMENTS.md:54 `[x]`, :184 Complete |

**No orphaned requirements.** REQUIREMENTS.md:227 maps Phase 147 → `LNX-01..LNX-04`, count 4;
both plans' `requirements:` fields claim exactly that set (plan 01 all four, plan 02 LNX-01).
Every ID is accounted for in both directions.

### Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
|------|------|---------|----------|--------|
| `05-linux-update-delivery.md` | — | `TBD`/`FIXME`/`XXX`/`TODO`/`HACK`/`PLACEHOLDER` | — | **None found** (0 matches). Confirmed independently by V-54-30. |
| `00-overview.md` | — | debt markers | — | **None found.** |
| `00-overview.md` | 194 | Content contradiction — "security-pocket cadence" | ⚠️ Warning | WR-10, unfixed. See below. |

No stubs, no empty implementations, no placeholder prose. Zero debt markers in either modified file,
so the debt-marker gate does not fire.

### Code-Review Warning Triage (which of the 11 bear on a must_have)

CR-01/02/03 (blockers) were fixed in `02b21244` and are confirmed fixed in the working tree.

| Finding | Bears on a must_have? | Verifier disposition |
|---------|----------------------|---------------------|
| WR-01 "Four facts / The three together" | No | **Fixed** in 02b21244 — the bullet now reads "Three facts combine". |
| WR-02 overview asserts uncreated cross-referencing state | No | **Fixed** in 02b21244. |
| WR-03 RHEL-8 Source line attributes an unverified claim | Touches truth 14 | **Resolved by this verification.** Live re-fetch confirms `RedHat Enterprise Linux 8` IS present on custom-settings-linux. The claim is true and correctly attributed. |
| WR-04 24.04/`noble` scoping does not reach `## Reboot Handling` | No | Editorial. The scoping clause at `05:181-185` governs the section it opens; the reboot section quotes the same page. Advisory. |
| WR-05 "Expanded" vs "Extended" Security Maintenance | No — does not invert SC#3 | Both spellings are Canonical's own: the automatic-updates code comment says "Extended", `ubuntu.com/pro` says "Expanded" (live-confirmed). The verbatim block is unaltered; only surrounding prose uses the product name. Cosmetic. |
| WR-06 "documented end to end" overclaims 04-app-delivery | No | Advisory wording. |
| WR-07 D-73 correction drops the automatic-approval scoping | Touches DRV-02 (Phase 146), not an LNX must_have | **Valid.** The live source scopes the deferral to "the automatically approved updates"; the corrected overview sentence omits that qualifier. Precision loss on a prior-phase requirement. Recommend folding into a later phase rather than reopening 147. |
| WR-08 hazard bullet says the source "states" an absence it omits | No | SC#2 mandates the literal "no documented run-time cap on that surface". The guide also states the omission correctly at `05:154-157`. Register quibble. |
| WR-09 LNX-03 flipped Complete against one reboot spelling | No | The requirement text names only `/var/run/`; the guide ships **both** spellings correctly attributed. The guide exceeds the requirement. |
| **WR-10 overview "security-pocket cadence"** | **Yes — bears on SC#3's substance** | **Unfixed. Escalated** — see Human Verification item 8. |
| WR-11 unsourced categorical claim under a sourced blockquote | No — SC#4 covers figures, not this inference | **Valid but non-blocking.** Every *figure* is sourced and live-verified; the flagged sentence carries no figure. Register fix available in REVIEW.md. |

### Ruled Decisions (not gaps — confirmed honored, not reported as failures)

Verified present and correct, per the phase's ratified decisions: RHEL 9/10 out of scope with no
first-party Intune source (D-01); `update-notifier-common` shipped as a documented silence (D-13 /
D-52, and independently confirmed as a *correct* silence — 0 occurrences on the cited page);
the four sibling routing blockquotes in 01-04 left without a Linux link (D-49); the Windows Deferral
table cell left stale against the corrected D-73 prose; no registry / filename-map / ops-index /
nav-hub wiring (D-64, deferred to Phase 152); External References ships four Microsoft pages
(owner-ratified); LIN-DEFER-01 not discharged (D-43).

### Human Verification Required

8 items — 7 judgment-tier prohibitions carrying non-authoritative LLM-judge verdicts, plus 1
unfixed code-review warning needing an owner decision. Full detail in the frontmatter
`human_verification` block.

All 7 prohibitions read as **honored** on the evidence gathered, but none has a wired enforcement
test, so each is flagged `unverified-prohibition — human review recommended` rather than passed
silently.

### Gaps Summary

**No gaps.** Every must-have truth is verified, every artifact exists and is substantive and wired,
every key link resolves, all six gates reproduce their claimed output, and all four requirement IDs
are accounted for in both directions with no orphans.

The single substantive finding is **WR-10** — a one-clause factual defect at `00-overview.md:194`
introduced by this phase, stating the security-only reading of `unattended-upgrades` that this
phase's own guide exists to refute. It fails no must_have (SC#3 is scoped to the guide, which is
correct and emphatic; the overview's own Cadence-model table cell is also correct), so it is a
warning and not a blocker — but the hub and the guide currently disagree on LNX-03's central claim,
and REVIEW.md already supplies the fix.

The strongest evidence in this report is negative-space evidence: the platform-script page carries
**zero** run-time-cap tokens, and the Canonical page carries **zero** `update-notifier-common`
occurrences. Both absences are load-bearing for SC#2 and for the D-32 correction respectively, and
both were confirmed against the live pages rather than inherited from the quote bank.

---

_Verified: 2026-08-21_
_Verifier: Claude (gsd-verifier)_
