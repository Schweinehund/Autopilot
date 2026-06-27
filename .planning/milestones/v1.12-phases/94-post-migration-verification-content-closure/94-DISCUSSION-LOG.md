# Phase 94: Post-Migration Verification Content Closure - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-06-26
**Phase:** 94-post-migration-verification-content-closure
**Areas discussed:** MIGV-01 placement, Iru-doc fallback, MIGV-03 callout, Freshness stamps

**Method:** User requested `/adversarial-review` adjudication for every gray-area choice (durable
preference). A Finder → Adversary → Referee panel (all Opus) scored the options per decision. Picks
were unanimous across all three agents; the one contested item (D2 URL sub-question) resolved for the
Adversary. User ratified all picks as recommended ("Lock all as recommended").

---

## MIGV-01 placement

| Option | Description | Selected |
|--------|-------------|----------|
| 1A — Upgrade in-place | Promote the existing Stage 7 / Stage 3 Behind-the-Scenes assertion to a stamped, MS-Learn-cited, full-confidence statement where it already lives | ✓ |
| 1B — New pre-migration readiness sidebar | Add a distinct stamped sidebar near Stage 2 stating the verified answer | |
| 1C — Both | Upgrade in-place AND add a cross-referenced sidebar | |

**User's choice:** 1A (adversarial-review unanimous; user ratified).
**Notes:** Minimal-edit / single-source-of-truth / anti-drift at the 90-day re-verify. Finder verified
against Microsoft Learn that Intune has no separate "profile-based enrollment config mode." Referee
struck the Finder's "readiness list already carries the reassurance" sub-claim as false (the readiness
list gates the *action*, not the reassurance) — pick stands on minimal-edit grounds.

## Iru-doc fallback

| Option | Description | Selected |
|--------|-------------|----------|
| 2A — Verified-or-honest-hedge | Attempt live verification; if reachable confirm concrete steps; if login-gated keep conceptual steps + log the attempt/date/blocker | ✓ |
| 2B — Conceptual-steps-only | Keep hedged steps as-is; only fix URL/branding facts; no verification claim | |
| 2C — Aggressive correction | Assume portal migrated to support.iru.io; rewrite UI labels; drop the hedge | |

**Sub-question — support.kandji.io vs support.iru.io:**

| Option | Description | Selected |
|--------|-------------|----------|
| Keep support.kandji.io | Retain "URL unchanged at support.kandji.io" assertion | |
| Switch to support.iru.io | Flip the asserted URL to support.iru.io (Finder's pick) | |
| Surface BOTH | kandji.io = known-documented, iru.io = rebrand-expected; verify which resolves | ✓ |

**User's choice:** 2A + Surface BOTH (adversarial-review; Adversary overturned the Finder's "switch to
iru.io"; user ratified).
**Notes:** Operator at Stage 2 holds irreversible secret-destruction actions — a guessed UI path is
worse than an honest hedge. Flipping one unverified flat URL assertion to another repeats the sin 2A
exists to avoid; nothing in review confirmed support.iru.io resolves. Both names stay for searchability.

## MIGV-03 callout

| Option | Description | Selected |
|--------|-------------|----------|
| 3A — Refine in-place at Stage 7 step 4 | Keep callout where it is, tighten to locked MEDIUM framing | ✓ |
| 3B — Relocate/consolidate into a verification checklist | Move to a post-migration verification surface | |
| 3C — Keep + add pointer from verification checklist | No duplicated prose, add a cross-pointer | |

**Sub-question — pilot command set:**

| Option | Description | Selected |
|--------|-------------|----------|
| `profiles status -type enrollment` only | Single targeted Supervised-flag check (existing) | ✓ |
| Add `profiles list` before-and-after | Pre/post baseline diff using both commands | |

**User's choice:** 3A + single command (adversarial-review unanimous on pick; user ratified).
**Notes:** Callout already sits at the right diagnostic moment, co-located with its Watch-Out bullet
and the provenance block's re-confirm instruction. 3C's "verification checklist" surface does not exist
in the file. Referee corrected the Finder's reasoning: a pilot before-and-after is *operator*-runnable
(permitted), so the reason to keep one command is diagnostic targeting (`profiles status` shows the
Supervised flag directly; `profiles list` is noisier) + minimal operator burden, not "author-unrunnable."

## Freshness stamps

| Option | Description | Selected |
|--------|-------------|----------|
| 4A — Bump the existing Stage 7 section block | One block re-dated to cover all Stage-7-area edits | |
| 4B — Per-addendum inline stamps | Discrete stamps on each new addendum/callout | |
| 4C — Hybrid | Bump the Stage 7 block for in-coverage edits; inline stamp only on the out-of-coverage Stage 2 MIGV-02 edit | ✓ |

**User's choice:** 4C (adversarial-review unanimous; user ratified).
**Notes:** MIGV-01 + MIGV-03 sit inside the Stage 7 block's macOS-26-gated coverage → bump the block.
MIGV-02 lives in Stage 2 (shared pre-flight), verified against a vendor portal, and is *not* OS-26-gated
→ keep its freshness signal separate. Referee corrected the Finder: the Stage 2 stamp is discretionary
hygiene (the stamp-lock binds only OS-26-gated additions), not a mandated stamp.

## Claude's Discretion

- Exact prose wording, placement within the identified passages, and Markdown formatting (within the
  locked framing).
- Whether the MIGV-02 Stage 2 inline freshness signal is a full `last_verified`/`review_by` pair or a
  lighter date-of-attempt note (hygiene, planner's call).

## Deferred Ideas

None — discussion stayed within phase scope. Scope was pre-locked by prior adversarial-review
(CI-3 rename, multi-tenant PSSO, iOS migration depth, new scenario docs, code-scaffolding integration
all remain out of v1.12).
