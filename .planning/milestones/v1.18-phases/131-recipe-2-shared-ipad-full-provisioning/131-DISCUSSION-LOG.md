# Phase 131: Recipe #2 — Shared iPad Full Provisioning - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-07-17
**Phase:** 131-Recipe #2 — Shared iPad Full Provisioning
**Areas discussed:** A (cross-link boundary), B (unsupported table + passcode + guest), C (layered config + applicability), D (storage/session sizing)

---

## Gray-area selection

| Option | Description | Selected |
|--------|-------------|----------|
| A. Cross-link boundary vs OU-07/RE-109 | Own-vs-link split given OU-07/OU-06/RE-109 already cover the journey from an ABM angle | ✓ |
| B. IPAD-02 unsupported-table + passcode + guest block | Row count/grouping, passcode-behavior placement, guest-session decision block | ✓ |
| C. IPAD-03 layered config + IPAD-01 applicability table | Device-baseline + user-overlay layering; applicability split; conflict warning | ✓ |
| D. IPAD-04 storage/session sizing blocks | STD-05 case types + QuotaSize uncertainty + placement | ✓ |

**User's choice:** All four areas — plus an explicit instruction: *"For each choice in each of the areas, use /adversarial-review to recommend the best one and provide your reasoning."*
**Notes:** Matches the established repo convention (memory: user invokes /adversarial-review for gray-area picks) and the Phases 129/130 precedent of 2 adversarial rounds. Executed as one full Finder/Adversary/Referee round with 4 parallel Finders (one per area), all first-party-grounded.

---

## Method: adversarial review (1 round)

| Stage | Result |
|-------|--------|
| Finders (4 parallel, opus) | A=80 pts · B=52 · C=64 · D=49; each verified load-bearing iPad facts against first-party Microsoft Learn |
| Adversary (opus) | Independently re-verified every fact against live docs; **disproved 0 findings** (score 0); applied 4 surgical trims (A-F3 home-screen scope, D-C1 Apple-schema internals, D-M2 seconds-not-minutes, eligibility-floor calibration) |
| Referee (opus) | Locked all 20 sub-decisions (A1–A5, B1–B5, C1–C5, D1–D5); folded the 4 trims; produced 12 planner traps + 5 plan-time-verify items |

**User ratification:** Chose "Lock round 1 & write CONTEXT.md" — declined a 2nd round (round 1 came back with zero disproofs; a 2nd round expected to only re-confirm).

---

## Area A — Cross-link boundary (own vs. link)

| Option | Description | Selected |
|--------|-------------|----------|
| Inline everything | Re-author enrollment/sign-in/VPP in the recipe | |
| Link everything | Point to RE-109/OU-06/OU-07/RE-111 for all of it | |
| Own the Shared-iPad-specific happy-path values, link the exhaustive references (by ownership) | Minimal actionable inline + link owner docs | ✓ |

**Locked:** A1 own inline toggles (exclude "Await final configuration"); A2 one-sentence sign-in + link OU-06; A3 own the device-licensed→device-group→Required triple + link RE-111; A4 own Intune decision framing + link OU-07 for mechanics; A5 iPadOS 13.4+/≥32 GB, stable first-party externals OK.
**Notes:** Key catch — RE-109 line 83 conflates Entra "shared device mode" with Shared iPad (real defect); cross-link but state the distinction. "Await final configuration" is unavailable with (no affinity + Shared iPad=Yes).

## Area B — Unsupported table + passcode + guest

| Option | Description | Selected |
|--------|-------------|----------|
| 7 individual rows | One row per IPAD-02 feature | ✓ |
| Grouped rows ("MAM stack") | Collapse policy types | (rejected — misclassifies compliance/device-CA) |
| Passcode as table row / decision block / adjacent note | Placement of the fixed-passcode limitation | Adjacent note ✓ |

**Locked:** B1 7–8 rows; B2 passcode = eight ALPHANUMERIC, adjacent note in plain/split prose (C17 #12); B3 guest Case-1 block, inverted "Block Shared iPad temporary sessions" polarity; B4 "Require temp session only" third mode stated; B5 Available/user-VPP as rows + positive how-to at VPP step, sourced WHY, no skeleton reorder.

## Area C — Layered config + applicability

| Option | Description | Selected |
|--------|-------------|----------|
| One combined table | Merge applicability + worked example | |
| Two surfaces (reference table + worked example) | Distinct, cross-linked | ✓ |
| Worked example only | Drops IPAD-01 table requirement | (rejected) |

**Locked:** C1 two surfaces, link RE-110 for full matrix; C2 2 roles (Nurse/Clinician), all apps device-group Required, per-role via layout + allow-list; C3 Wi-Fi/VPN/Cert device-only forced; C4 conflict = `What breaks` callout with verbatim "can't be pre-determined/first-assigned/OS-chooses" (NOT last-writer-wins); C5 split placement, on-device verification, Email unsupported.
**Notes:** Biggest trap — "allow-lists on user groups" does NOT mean per-role app assignment (apps are device-group-only; only web clips user-assignable).

## Area D — Storage / session sizing

| Option | Description | Selected |
|--------|-------------|----------|
| Follow requirement literally (QuotaSize block + cached-users prose) | Would invent a phantom field + omit a real one | (rejected — inverted) |
| Reframe around the real Intune surface | Cached-users = settable Case-3; QuotaSize/grace = pointers only | ✓ |

**Locked:** D1 Maximum cached users = Case-3 (≤24 on 32/64-GB) — the real settable field; D2 screen-lock enum Case-2 (seconds, 13.0+); D3 session-inactivity Case-3 (min 30s, 14.5+); D4 QuotaSize + online-auth grace = plan-time-verify pointers, never STD-05 blocks; D5 cluster at enrollment-policy step, per-field iPadOS floors (not blanket 17+).
**Notes:** Requirement IPAD-04 is inverted — cached-users IS a config field; QuotaSize is the non-settable one.

---

## Claude's Discretion

- Exact prose within every locked constraint; synthetic happy-path values (cached-users number, timeout values, concrete Nurse/Clinician app sets/layouts).
- Healthcare vertical for the worked example (education Student/Teacher is an equivalent fallback).
- Trimmed applicability-table row count (limited to rows the worked example touches).

## Deferred Ideas

- Guest-only (kiosk-style) Shared iPad deployment — the "Require temp session only" third mode; candidate future recipe/variant.
- QuotaSize fixed-bytes provisioning via custom/Settings-Catalog profile — advanced pointer only this phase.
- RE-109 line-83 conflation fix — real doc defect, but fixing an existing Approved doc is out-of-scope this phase (candidate future HYG item).
