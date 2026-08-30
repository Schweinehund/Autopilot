# Phase 147: Linux Update Delivery - Discussion Log

**Date:** 2026-08-20
**Mode:** `/gsd-discuss-phase 147` → `/grill-me` → `/adversarial-review`
**Purpose:** Human reference (audits, retrospectives). Not consumed by downstream agents — they read
`147-CONTEXT.md`.

## Gray areas presented

Four phase-specific areas were offered. The owner selected **all four** and directed that `/grill-me`
expand each into sub-questions and `/adversarial-review` adjudicate every recommendation.

1. **The overview's fifth column** — the table has five concept rows and three have no Linux answer;
   the overview says "four platforms" in several places.
2. **Delta vs re-author** — the Linux admin-setup tree already owns Bash-script delivery, compliance
   categories and web-app CA; what is `05-`'s actual delta?
3. **Root-hazard shape** — where LNX-02 lives structurally, and which of PITFALLS C1-13's six items
   are in scope.
4. **Non-Microsoft sourcing** — LNX-03 and LNX-04 rest on Canonical-side facts, and FEATURES D-3 was
   held out of Launch With as `[PREMISE]`.

## Method

- `/grill-me` produced **30 sub-questions** with a recommended answer each, grounded in live repo
  measurement rather than reasoning.
- `/adversarial-review` ran **5 parallel Finders** (one per area plus a cross-cutting agent) →
  **Adversary** → **Referee**.
- Finders were instructed to probe empirically — write a probe file, run the validator, restore —
  rather than reason about regexes, and to retrieve external pages as source bytes.

## Outcome

| Stage | Result |
|---|---|
| Finder raw findings | 115 (F1 83 · F2 137 · F3 102 · F4 94 · F5 144 points) |
| After dedup | 106 |
| Adversary disproved | 18 (0 CRITICAL, 15 MEDIUM, 3 LOW) |
| Referee confirmed | **87 — 16 CRITICAL, 39 MEDIUM, 32 LOW** |
| Referee severity changes | 15 demoted, **2 promoted** to CRITICAL |

All 18 Adversary disproofs were upheld. The Referee also corrected figures *inside* confirmed
findings, on the grounds that downstream agents inherit the figures.

## What the review overturned

The draft's picks fared badly. Three `[MEASURED]`-labelled rows turned out never to have been executed:

- **`V-54-08` is not order-sensitive.** Five probes — Linux appended last, before Android, first,
  after Windows, mid-table — all returned 32/0/0. The "never insert before Android" prohibition was
  fabricated. The real constraint is that **every table row stays on one physical line**; re-wrapping
  the Hotpatch/EOL row reddens `V-54-29`, re-wrapping the header reddens `V-54-08`.
- **The `four`-token map was wrong in both directions** — three named sites carry none, two real
  sites were never named.
- **Frontmatter dates were wrong for three of five files.**

Beyond that:

- **`V-54-26`** pins the exact blockquote string the draft sent the executor into, and was never named.
- **146 D-73**, an `[OWNER-RULED]` correction deferred *into* Phase 147, was absent from all 30
  questions. The defect is live at `00-overview.md:87`.
- **No H2 skeleton.** Phase 146 fixed ten before authoring; the draft named one, leaving LNX-02's
  hazard and the reboot signal homeless. Authored as D-22.
- **Area 4 was unsafe as written.** Source-byte retrieval showed the Canonical page carries
  `Automatic-Reboot "false"` (not the `"true"` the draft told the executor to quote),
  `/var/run/reboot-required` only inside a sample log line, and no `update-notifier-common` at all —
  with a same-prefix decoy that invites false confirmation. It also carries **three** near-identical
  `Allowed-Origins` blocks, two with `-updates` uncommented; quoting the wrong one inverts LNX-03 while
  passing a verbatim diff.
- **The research-pass precedent was inverted** — the draft forbade respawning the researcher on the
  authority of a phase that respawned it (8 pages, 36 strings diffed).

## Owner rulings

| Question | Ruling |
|---|---|
| Guide scope, given RHEL 9/10 vs an apt-only mechanism | **Ubuntu-scoped, stated openly** — name RHEL as supported, state the apt-family limitation, leave a documented gap rather than false coverage |
| `/var/run/reboot-required` source | **Find a different first-party source**; escalate rather than assert if none exists |
| Research pass, given ROADMAP:127 vs 146 D-73 | **Full research pass** — respawn `gsd-phase-researcher` for a bounded fetch |
| Requirement-text corrections | **All three ruled in** with `[OWNER-RULED IN SCOPE]` markers — LNX-01 CA narrowing, 146 D-73, and the `PITFALLS.md` citation fix |

The through-line is a preference for documented silences over false coverage.

## Deferred, not lost

The six-site off-by-one in `4-platform-capability-comparison.md`; `_glossary-linux.md` terminology
(`unattended-upgrades`, Livepatch, Ubuntu Pro) which `PROJECT.md:31` claims for this milestone but no
requirement covers; `LIN-DEFER-01`, the Bash deep-dive the corpus has promised an inbound link to
since v1.5; a sourced RHEL section; and two overstated claims in the milestone record
(`ARCHITECTURE.md:338`, and PROJECT.md's "six workflows" glossary hazard, which is really one).

## Verification at close of discussion

`check-phase-54` 32/0/0 · `v1.20-milestone-audit` 16/0 · `check-nav-hub-links` 0/0 ·
`c17-eee-contract` 234/0 · apex `check-phase-144` **101/0/0**, measured with CONTEXT.md on disk.
Five decision bullets carrying a colon inside a bold run were rewritten before commit — that pattern
hard-blocks the plan-checker's decision-coverage gate at `covered:0`.

---

*Phase: 147-Linux Update Delivery*
*Logged: 2026-08-20*
