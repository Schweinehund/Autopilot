# Phase 107: L1 Runbooks #38-41 (802.1X Triage) - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-06-30
**Phase:** 107-l1-runbooks-38-41-802-1x-triage
**Areas discussed:** Runbook internal structure, Decision-tree axis order, L1/L2 depth boundary, Escalation forward-refs

**Resolution method:** Three-agent adversarial review (Finder → Adversary → Referee, Opus) per the user's standing instruction ("for each choice in each area, use /adversarial-review to recommend the best one and provide your reasoning"). Finder scored 55 (7 ref-anchored picks); Adversary confirmed 6, overturned 1 (GA3), downgraded 1 confidence (GA4.3), 0 wrongful overturns; Referee sided with the Adversary on both contested items and verified all Finder anchors with zero line-number drift. User selected all four gray areas for discussion and locked all seven rulings as-is.

---

## Area 1 — Runbook internal structure (load-bearing)

| Option | Description | Selected |
|--------|-------------|----------|
| 1A | Shared symptom + first-checks, then FIVE per-platform diagnostic-signal subsections (H2/H3 each) | |
| 1B | Single per-platform TABLE (rows=platforms; cols=signal/first-check/escalation) | |
| 1C | HYBRID — shared symptom + shared first-checks → compact per-platform diagnostic-signal table → per-platform escalation-divergence notes | ✓ |

**Ruling:** 1C (HIGH). Load-bearing anchor = `ROADMAP.md:213` (SC2's literal four-part ordering "symptom description, first-check steps, per-platform diagnostic commands, and a clear escalation trigger" IS the structure spec).
**Notes:** Adversary/Referee corrected the Finder's anchor: the #34 multi-platform runbook is a *weak* analog (diverges by path A/B/C, not by platform), so SC2:213 — not #34 — is dispositive. 1A over-splits shared prose 5× (link-not-copy pressure); 1B drops the symptom + first-check narrative SC2 mandates.
**Frontmatter sub-decision:** compound `platform: windows+macos+ios+android+linux` + `audience: L1` + `applies_to` + 90-day freshness (HIGH) — verbatim precedent `#34:1-6` (`platform: ios+macos+shared-ipad`).

---

## Area 2 — Decision-tree axis order (`10-8021x-triage.md`)

| Option | Description | Selected |
|--------|-------------|----------|
| 2A | Symptom-primary root → 4 branches → runbook; per-platform leaves INSIDE the runbook | ✓ |
| 2B | Symptom → per-platform leaf in-tree (up to 20 terminal leaves — blows node budget) | |
| 2C | Platform-primary then symptom (contradicts SC3 "route by symptom") | |

**Ruling:** 2A (HIGH). Anchor = `ROADMAP.md:214` (SC3): "routes L1 **by symptom** … with **per-platform leaves**" + Goal `:207`. Symptom-primary root is mandated verbatim → kills 2C. Leaves-in-runbook keeps the tree under the ~5-node/2-step budget (`09-linux-triage.md:15`,`:55`) → kills 2B.
**Seam ruling:** the tree `10-8021x-triage.md` is a **Phase-107 deliverable** (SC3:214 + Goal:207 + DOT1X-09:30 all bind it; P108 SCs `:226-228` never mention it → the "+ Decision Tree #10" in the P108 title `:219` is a stale label).

---

## Area 3 — L1/L2 depth boundary (KEY RULING — Adversary overturn)

| Option | Description | Selected |
|--------|-------------|----------|
| 3A (as written) | Name signal + ONE user-run read-only command per platform, escalate | (overturned) |
| 3B | L1 collects AND interprets per-platform logs | |
| 3C | Name signal only, zero commands | |
| **3A/3C calibrated** | Name-the-signal baseline everywhere; user-run read-only command ONLY where L1-feasible (macOS/Linux/Windows); iOS=portal; Android=escalation-collected adb | ✓ |

**Ruling:** per-platform-calibrated (HIGH). The Adversary overturned plain 3A: "one user-run command per platform" is physically impossible on iOS (no device command — `ROADMAP.md:226` "iOS Intune portal") and out-of-L1-scope on Android (`adb logcat` needs tethered PC + USB debugging — `REQUIREMENTS.md:31`). Anchor: SC1 `ROADMAP.md:212` says "**identify** the platform-specific event log or **diagnostic signal**" (identification, not execution). Collect-don't-interpret preserved (`#35:34`).
**Final per-platform rule:** Windows = name WLAN-AutoConfig/Dot3Svc channel + collect; macOS = name + one read-only command (`app-sso`-style); iOS = Intune-portal inspection only; Android = name `adb logcat` filter as escalation-collected (not L1 user action); Linux = name + one read-only command (`journalctl --user`/`nmcli`).

---

## Area 4 — Escalation forward-refs, routing map, index scope

| Option | Description | Selected |
|--------|-------------|----------|
| 4A | Reference L2 #31-33 by name/number in prose now; defer live links (navigation-last) | ✓ |
| 4B | Anticipatory relative links to predicted Phase-108 filenames (drift risk) | |
| 4C | Placeholder/TODO links | |

**Ruling (4.1):** 4A (HIGH). Anchor = `ROADMAP.md:243` (P109 SC4 navigation-last invariant). Live links to not-yet-authored #31-33 would commit broken navigation; corpus live-links to L2 only where target exists (`#35:98`, `#34:133`).
**Ruling (4.2 routing map):** #38→L2 #32; #39→#33; #41→#33; **#40→#33 primary + #32 cross-ref**; #31 = shared log-collection prerequisite (HIGH). Anchors: `ROADMAP.md:228` (#33 owns "server-name validation failures" → #40 primary), `:227` (#32 = cert-chain → #38), `:226` (#31 prerequisite for #32/#33).
**Ruling (4.3 index):** DEFER 00-index.md 802.1X section to Phase 109 (MEDIUM). Direction anchor `ROADMAP.md:241` (P109 SC2 names `l1-runbooks/00-index.md`). Confidence downgraded to MEDIUM (Adversary) because `REQUIREMENTS.md:32` omits the runbook indexes AND there's a 4× legacy in-phase-index precedent (`00-index.md:126-128`) — so the planner must defer *consciously* and note the override.

---

## Claude's Discretion

- Exact prose, callout phrasing/labels, section ordering within each runbook and the tree (honoring NOTE/WARNING/DANGER/CRITICAL vocabulary, 90-day stamps, plain-GitHub anchor slugs, double-hyphen trap).
- Exact runbook filenames (suggested `38-8021x-certificate-failure.md` … `41-8021x-eap-negotiation-failure.md`) and the tree's Mermaid node labels/styling.
- Per-platform diagnostic-signal table column shape (signal / first-check-or-command / escalation), staying L1 read-only and link-not-copy.
- Whether #40 surfaces its #32 cross-ref inline or in See-Also (provided #33 named primary).

## Deferred Ideas

- L2 investigation runbooks #31-33 + verified per-platform log-filter strings → Phase 108 (DOT1X-10).
- All live navigation wiring (00-index.md 802.1X section, capability-matrix rows, global nav hubs) → Phase 109 (navigation-last, DOT1X-11).
- Foundation theory restatement (cert-ordering, EKU, server-name-validation, EAP comparison) → already homed in `01-`/`02-`; link, never restate.
- RADIUS/NPS server config, PKI/CA build-out, switch/AP port config → out of milestone scope entirely.

## Plan-time-verify flags

1. Exact per-platform diagnostic-signal strings (DOT1X-10 "verified at plan time") — Windows Event Viewer channel names, macOS/Linux read-only command strings, Android `adb logcat` 802.1X filter — literal-verify against current Microsoft Learn + platform supplicant docs, don't paraphrase.
2. GA4.3 defer is MEDIUM-confidence — make the 00-index.md defer decision consciously and note it overrides the 4× legacy in-phase-index precedent.
