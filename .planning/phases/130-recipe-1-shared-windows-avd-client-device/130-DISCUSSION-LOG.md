# Phase 130: Recipe #1 — Shared Windows AVD-Client Device - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-07-17
**Phase:** 130-Recipe #1 — Shared Windows AVD-Client Device
**Areas discussed:** (Round 1) kiosk-path depth, feed-subscription design, HYG-04 fix mechanics, recipe shape & link boundaries; (Round 2) anti-feature table framing, SharedPC branch decision points, verification depth, scope banner & prerequisites

**Method:** Each area resolved via a full `/adversarial-review` (Finder/Adversary/Referee, 4 parallel Finders per round). Round 1 = 56 findings (55 confirmed, 1 disproved). Round 2 = 58 findings (57 confirmed, 1 disproved, 0 referee overturns). Every load-bearing external claim independently re-verified against first-party Microsoft Learn 2–3×. User ratified each round's per-area recommendations.

---

## Round 1 — Area A: Kiosk-path depth (AVD-02)

| Option | Description | Selected |
|--------|-------------|----------|
| (a) Fully-worked now + blanket confidence flags | Author both branches; flag MEDIUM-confidence steps | |
| (b) Depth gated on plan-time verification | Full branch only if first-party sourcing verifies, else shallow | |
| (c) Shallow pointer-style kiosk branch | Worked SharedPC + kiosk-as-verified-core + link out | |
| (a′) Fully-worked via first-party Intune Kiosk-template GUI path | Portal prose, no XML; surgical flags on residual repo-sourced items only | ✓ |

**User's choice:** Ratify (a′). **Notes:** Review found the roadmap's "kiosk not first-party" premise stale — the whole mechanism is now first-party on Microsoft Learn. (c) violates SC2; (b)'s gate is already resolved and its fallback is SC2-violating.

## Round 1 — Area B: Feed-subscription design (AVD-01)

| Option | Description | Selected |
|--------|-------------|----------|
| (a) Resolve now, assert single verified scope | One authoritative CSP path | |
| (b) Device-vs-user scope as a permanent decision block | Both worked | |
| (c) corrected (a)+(c) hybrid | State the resolved fact (no device-context feed CSP exists; feed auto-per-user); keep mandatory second-user verification | ✓ |

**User's choice:** Ratify corrected hybrid; reject (b). **Notes:** The "device-vs-user conflict" was a false premise — AutoSubscription is user-scope only, welded to the retiring MSRDC client; Windows App has no feed CSP. (b) would document a non-existent device node. AVD-01 requirement prose flagged for a latent factual error.

## Round 1 — Area C: HYG-04 fix mechanics

| Option | Description | Selected |
|--------|-------------|----------|
| Atomic 6-site correction (stale fork live) | Fix all sites + last_verified/review_by bump + changelog row | ✓ |
| Minimal-touch / defer to plan time | Patch named sites only, or re-verify later | |

**User's choice:** Ratify atomic 6-site fix. **Notes:** Wi-Fi IS supported for self-deploying per current Microsoft Learn (verified 3×). Claim appears at 6 sites (not 3); minimal-touch would ship an intra-doc self-contradiction. No frozen sidecar pins the file.

## Round 1 — Area D: Recipe shape & link boundaries

| Option | Description | Selected |
|--------|-------------|----------|
| Slug 01-shared-windows-avd-client.md + Step 5a/5b + ownership-calibrated links | Template-anchor heading style; link-not-copy by ownership; AVD-04 blocks at natural steps; single two-stage Wi-Fi story | ✓ |
| Branch A/B headings | D-05's `### Branch A —` naming | |

**User's choice:** Ratify. **Notes:** Everything stays inside the locked D-06 skeleton; template-anchor style resolves a latent inconsistency between D-05 and the C17-green template. Wi-Fi reframed "anti-pattern for zero-touch," not "unsupported."

---

## Round 2 — Area E: Anti-feature table framing (AVD-03)

| Option | Description | Selected |
|--------|-------------|----------|
| 4 rows, Wi-Fi Feature-cell qualifier, links out, per-fact-once, stable-externals-OK | | ✓ |
| Same but strict no-externals | Keep the disproved absolutist no-external-URL rule | |

**User's choice:** Ratify (stable-externals-OK). **Notes:** A bare "Wi-Fi" under the "unsupported" header would resurrect the exact stale claim the C-LOCK fix deletes in the same commit. Blockquote alternative hard-fails C17 #12. MSRDC-retirement lives once in the table; AutoSubscription-CSP once inline (amends B-LOCK-3).

## Round 2 — Area F: SharedPC branch internals (AVD-02/AVD-04)

| Option | Description | Selected |
|--------|-------------|----------|
| Templates GUI; 1 gate + 1 enumerable + 1 nested conditional; asserted values | | ✓ |
| More decision blocks (AccountModel + RestrictLocalStorage as full blocks) | Over-quizzes Step 5b | |

**User's choice:** Ratify. **Notes:** First-party verified — "Local Storage: Disabled" = restrict (inverted polarity); AccountModel default "Only guest" yields an empty AVD feed (assert Domain); InactiveThreshold literally absent from the GUI outside the DeletionPolicy=2 arm (amends D-LOCK-6 to nested conditional).

## Round 2 — Area G: Verification depth

| Option | Description | Selected |
|--------|-------------|----------|
| Two pseudo-heading branch checklists + shared lead-in; per-branch B-LOCK-4 meaning; recipe-owned failure rows; runbook-gap flag | | ✓ |
| Keep literal B-LOCK-4 (second-distinct-user on both branches) | Factually wrong on kiosk | |

**User's choice:** Ratify per-branch meaning. **Notes:** The kiosk "second user" is a local autologon account with no Entra identity — the check must mean session-reset/interactive-sign-in on kiosk vs. second-Entra-user auto-repopulation on SharedPC (amends B-LOCK-4). No AVD runbook exists — failures route to in-recipe steps/refs, never fabricated links.

## Round 2 — Area H: Scope banner & prerequisites

| Option | Description | Selected |
|--------|-------------|----------|
| Specialized 173-char banner (both facts) + 9-row prereqs + SDM ban + client-device-only Intune scoping | | ✓ |
| Split banner + prereq | Disambiguation in banner, infra assumption in a prereq row | |

**User's choice:** Ratify combined banner. **Notes:** Banner carries both the session-host disambiguation and the infra assumption with 27 chars to spare. The generic template banner is a silent trap (C17-green but fails Pitfall-#1). Four name-collision traps closed (SDM, RemoteApp, Intune-on-session-hosts, no-user-affinity-vs-per-user-feed).

---

## Claude's Discretion

- Exact prose wording within every LOCKED constraint (step text, callout phrasing, table cell wording, row order beyond E-LOCK-1's fixed order).
- Synthetic values for asserted happy-path settings the requirement doesn't pin (InactiveThreshold canned values within 0–60; update-ring cadence).
- Whether the update-ring/`MaintenanceStartTime` block is a single late shared block or split per-branch.

## Deferred Ideas

- AVD/kiosk/feed/SharedPC L1/L2 runbook(s) — none exist; candidate future phase, not Phase 130.
- `EnableSharedPCModeWithOneDriveSync` / full Settings-Catalog SharedPC walkthrough — advanced-pointer note only; out of scope.
- Multi-app kiosk — explicitly out of scope; single-app Windows App kiosk only.
