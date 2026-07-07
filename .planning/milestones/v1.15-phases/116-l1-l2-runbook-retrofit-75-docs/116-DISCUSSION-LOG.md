# Phase 116: L1/L2 Runbook Retrofit (~75 docs) - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-07-04
**Phase:** 116-l1-l2-runbook-retrofit-75-docs
**Areas discussed:** Phase vs. plan granularity, Batch grouping & size, Retrofit method, Summary banner + owner

**Adjudication method:** User selected all four areas and directed adjudication via
`/adversarial-review` (three-agent Finder → Adversary → Referee, all Opus, each independently
re-verifying every deciding fact against the repo). Finder recommended 1A/2A/3C/4C; Adversary
overturned 0 and surfaced one material grounding correction (C17 #12 scans ALL blockquotes); Referee
re-ran assertion #12's char-count logic across all 75 files, confirmed all four picks, ruled on the
correction (116 D-05), and fixed the exact owner strings. User confirmed **"Lock all + proceed"**.

---

## Phase vs. plan granularity

| Option | Description | Selected |
|--------|-------------|----------|
| 1A — one Phase 116, batched plans | Deliver RETRO-01 as multiple plans within a single phase (like 113/114) | ✓ |
| 1B — separate L1/L2 sub-phases | Split L1 and L2 into separate roadmap phases | |
| 1C — one plan for all 75 | Single plan covering every file | |

**User's choice:** 1A
**Notes:** Finder + Adversary + Referee unanimous. `REQUIREMENTS.md:13` locks 1-req-1-phase (RETRO-01
spans all 75); 1B would fork the requirement AND trigger a HARN-03 renumber cascade into the
SHA-pinned Phase-119 `check-phase-NN.mjs` chain (`ROADMAP.md:176`). Sub-phase isolation buys nothing
under sequential-on-main + per-file C17 enrollment. 1C rejected under max-thoroughness.

---

## Batch grouping & size

| Option | Description | Selected |
|--------|-------------|----------|
| 2A — tier-then-platform, ~10-15/plan | All L1 first (batched by platform), then all L2; lean ~6 plans | ✓ |
| 2B — platform family across both tiers | Group Windows/macOS/iOS/… spanning L1 and L2 together | |
| 2C — registry order, fixed batch | Sequential RE-001..075 in fixed-size cuts | |
| 2D — single batch of 75 | One plan for everything | |

**User's choice:** 2A (lean ~6 plans)
**Notes:** Platform-homogeneous batches → one D1 label → clean C17 #9 match; tier-outer keeps L1/L2
as clean per-class enrollment-precheck units and keeps the per-tier banner on one side of each
boundary. Referee correction: "registry is tier-then-platform ordered" is coarse — platform is
interleaved within each tier (macOS at L1 10-16 AND 35-37), so batch on filename number-range +
platform cluster, not assumed-contiguous blocks. 2B crosses the tier banner boundary; 2C straddles
platform groups + the RE-042/043 tier boundary; 2D has no checkpoints.

---

## Retrofit method

| Option | Description | Selected |
|--------|-------------|----------|
| 3A — fully scripted codemod | One script transforms all 75 files | |
| 3B — hand-edit every file | Manual edits throughout | |
| 3C — hybrid | Script mechanical parts (block/frontmatter/version-history/relocation) + hand-author Summary/banner + C17-verify each | ✓ |

**User's choice:** 3C
**Notes:** No runbook has a `## Summary` today (grep = 0) and C17 #5 needs ≥30 words of real prose —
3A would emit hollow blurbs. The 183-blockquote D-05 reformat workload needs per-file judgment.
Mechanical shape (doc_id join, block line, Version-History row) is identical across files → belongs
in a script (kills 3B's error-prone hand-transcription of 75 doc_ids vs the #9 exact-match).

---

## Summary banner + owner

| Option | Description | Selected |
|--------|-------------|----------|
| 4A — canned per-tier banner | One fixed L1 read-only banner + one fixed L2 escalation banner | |
| 4B — per-platform owner + bespoke banner | Owner per platform; fully bespoke Summaries | |
| 4C — per-tier default + tailor where not read-only | Canned per-tier banner default, tailored for state-changing runbooks; owner = per-tier role | ✓ |

**User's choice:** 4C (owner: `L1 Team Lead` / `L2 Desktop Lead`)
**Notes:** Adversary + Referee verified `37-macos-local-password-reset.md` (three state-changing
password-reset paths) and `34-apple-business-shared-ipad-passcode-reset.md` (MDM ClearPasscode/Erase)
— a canned "read-only, no destructive actions" banner is factually FALSE for them, and SC2 pushes it
into the lead retrieval chunk Copilot recites → harmful. Owner grounded in template reviewer roles
(l1:20 / l2:21); 114 D-01 keeps owner frontmatter-only, so 4B's per-platform owner buys nothing.

---

## Cross-cutting — 116 D-05 (C17 #12 blockquote compliance)

Emerged during adjudication (Finder flagged gate-only; Adversary corrected to all blockquotes;
Referee measured). C17 assertion #12 caps EVERY top-level blockquote ≤200 chars — **56/75 files,
183 blockquotes over-limit** (gate blockquotes included). Passing C17 collides with reformat-only.
**Locked policy:** structural, word-preserving splits/de-blockquoting ONLY — never trim or reword;
escalate un-splittable atomic sentences to the content owner. Blockquotes nested in list items
(`N. >`) are invisible to #12 and need no change.

## 00-index.md scope confirmation

User confirmed both `00-index.md` files IN scope (retrofitted + enrolled) rather than treated as
deferred nav-hubs — consistent with the registry (RE-001/RE-043, doc_type Runbook) and the named
Phase-1 class directory. (D-06)

## Claude's Discretion

- Exact plan count and file-to-plan assignment within the 2A tier-then-platform scheme (target ~6).
- Shape/name of the mechanical retrofit helper (must join doc_id from RE-index by path).
- Exact canned per-tier banner wording + per-runbook tailored wording for non-read-only files.
- Exact per-runbook `## Summary` prose (≥30 words, reformat-only — summarize existing content).

## Deferred Ideas

- Phase 117 (RETRO-02 admin-setup), Phase 118 (RETRO-03 reference + tables), Phase 119
  (frozen-surface re-baseline + close).
- v1.16 — 45 orphan docs + structural classes (glossaries, decision-trees, standalone nav-hubs,
  lifecycle); the runbook-class `00-index.md` files are explicitly NOT part of this deferral.
- Content re-review of any un-splittable over-limit blockquote — escalated to content owner, out of
  the reformat-only envelope.
