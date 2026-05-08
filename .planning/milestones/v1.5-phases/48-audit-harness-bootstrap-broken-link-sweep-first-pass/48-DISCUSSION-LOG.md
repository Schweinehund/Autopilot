# Phase 48: Audit Harness Bootstrap + Broken-Link Sweep First Pass - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions captured in 48-CONTEXT.md — this log preserves the alternatives considered and the adversarial-review deliberation.

**Date:** 2026-04-26
**Phase:** 48-audit-harness-bootstrap-broken-link-sweep-first-pass
**Areas discussed:** Phase 48 scope split; C6/C7/C9 graduate-or-keep + emit format; Broken-link inventory + allowlist seeding; CI integration + pin-drift enforcement
**Methodology:** Adversarial review (`/adversarial-review`) — finder/adversary/referee scored pattern. Score totals: Finder 488 raw → Adversary disproved 116 → Referee adopted 14 disproves with 1 inversion.

---

## Gray Area 1 — Phase 48 Scope Split

| Option | Description | Final Score (after referee) | Selected |
|--------|-------------|-----------------------------|----------|
| A | Single Phase 48 (current ROADMAP) — harness + sweep bundled, ~8-10 plans | 21 | |
| B | Split into 48a (harness/tooling) + 48b (sweep) — renumbers 14→15 phases | 21 | |
| C | Single Phase 48 with intra-phase Wave-1 (tooling) → Wave-2 (sweep) plan dependency | 17 | ✓ |

**User's choice:** Option C — single phase, two internal waves
**Notes:** Phase 43 D-27 establishes 10-step intra-phase ordering precedent (not novel). Decimal-phase complexity (Option B) would touch REQUIREMENTS.md traceability, Hotspot Ownership table, Parallelism Map. Option A's circular-validation concern was DISPROVED by adversary citing v1.3+ validator-as-deliverable precedent. Option A's VERIFICATION/deliverable taxonomy collision was DISPROVED — ROADMAP.md Phase 48 SC#4 explicitly says "VERIFICATION artifact" verbatim. Option B's renumbering cascade was DISPROVED by adversary citing decimal-phase precedent (gsd-insert-phase 48.1/48.2). Option B's "rejects working pattern" (Phase 43 precedent) was confirmed by referee — splitting does reject Phase 43's bundled atomicity-contract approach.

---

## Gray Area 2 — C6/C7/C9 Graduate-or-Keep + C10–C13 Emit Format

### Disposition sub-decision

| Option | Description | Final Score | Selected |
|--------|-------------|-------------|----------|
| A | Graduate ALL three (C6 + C7 + C9) to blocking in v1.5 | 20 | |
| B | Keep ALL three informational-first | 21 | |
| C | Selective — graduate C7 + C9, keep C6 informational (original framing) | — | |
| C' (refined) | Selective — graduate C6 + C7, keep C9 informational | 12 | ✓ |

**User's choice:** Option C' (refined) — graduate C6+C7 to blocking; keep C9 informational
**Notes:** This is a REFEREE INVERSION of the original Option C. Adversary disproved 2A.CRIT-2 — Phase 58 retrofit doesn't touch admin-setup-android/ AOSP files (per Hotspot Ownership table line 427), so C6 is structurally safe to block. C7 (bare-Knox) is stable since v1.4.1 Phase 44. C9 (cope_banned_phrases) is the higher-risk check — Phase 53 co-management content + Phase 54 patch-management deprecated-Apple-OS-26 commands legitimately use "deprecated"/"removed"/"EOL" tokens (PITFALL-13 ops-domain false-positive risk). Keeping C9 informational through Phase 60 buys triage time. Option A's "graduate-all violates D-29 grace contract" was DISPROVED — Phase 43 D-06 explicitly intends "promoted to blocking in v1.5"; PITFALL-11 reinforces graduate-unless-documented-reason. Option B's "Phase 60 SC#1 names ONLY C11" claim was DISPROVED on literal wording — Phase 60 SC#1/2/3 cover C11/C12/C13.

### Emit format sub-decision

| Option | Description | Final Score | Selected |
|--------|-------------|-------------|----------|
| Compact | `(informational)` | 11 | ✓ |
| Verbose | `(informational — N findings; promotes to blocking in Phase 60)` | 12 | |

**User's choice:** Compact
**Notes:** Hard-coded "Phase 60" text is a coordinate-drift hazard. C12 has TWO promotion conditions (Phase 48 scaffold + Phase 58 file-existence) — verbose format mis-states. Promotion-schedule context goes in harness HEADER COMMENTS instead.

---

## Gray Area 3 — Broken-Link Inventory + Allowlist Seeding

### Sub-A — Inventory location/format

| Option | Description | Final Score | Selected |
|--------|-------------|-------------|----------|
| A1 | Markdown only at `.planning/phases/48-*/48-VERIFICATION-broken-links.md` | 10 (after disprove of CRIT-2) | ✓ |
| A2 | JSON sidecar at `scripts/validation/v1.5-broken-link-inventory.json` + summary markdown | 11 | |
| A3 | Both — markdown for humans, JSON for tooling, locks Phase 60 contract | 11 | |

**User's choice:** A1 — Markdown VERIFICATION artifact in phase directory
**Notes:** Adversary correctly disproved Phase 43 D-20 prep-shell-deletion concern — D-20 scopes to INPUT artifacts (`PHASE-45-AOSP-SOURCE.md`); VERIFICATION artifacts persist (verified: 10+ such files retained in `.planning/milestones/v1.4.1-phases/43-v1-4-cleanup-audit-harness-fix/` post-shipping). A2's filename namespace collision concern was DISPROVED — CI path glob is broad (`scripts/validation/**`); same-prefix coexistence is precedent. A3's "locks Phase 60 contract" advantage was DISPROVED as non-distinguishing — Phase 60 SC#3 explicitly references Phase 48 inventory categories. A2/A3 over-engineer for a first phase.

### Sub-B — Allowlist seeding

| Option | Description | Final Score | Selected |
|--------|-------------|-------------|----------|
| B1 | Empty schema only — force per-phase pin authoring | 30 | |
| B2 | Inherit v1.4.1 pins verbatim | 21 | ✓ |
| B3 | Inherit + scaffold empty arrays for linux_exemptions, ops_domain_allowlist, broken_link_external_allowlist, c11_legitimate_occurrences | 22 | |

**User's choice:** B2 — Inherit verbatim, refresh pin coordinates same commit
**Notes:** PITFALL-12 explicitly demands BASELINE_9 refresh on Path A copy + same-commit pin-coord update. B1 immediately FAILs C2 + degrades C9 to hardcoded fallback. B3 violates Phase 43 D-05 YAGNI; `broken_link_external_allowlist` directly conflicts with REQUIREMENTS Out of Scope external-MS-Learn-URL exclusion. B2 with refresh closes AUDIT-07 atomically. Adversary's "cross-platform pin scope contamination" concern was DISPROVED — pins are scope-isolated to Android files; harness `androidDocPaths()` strictly scopes C2 to Android tree. v1.5-specific arrays (linux_exemptions etc.) added LAZILY in Phase 49+ when first legitimate occurrence appears.

---

## Gray Area 4 — CI Integration + Pin-Drift Enforcement

### Sub-A — Workflow file

| Option | Description | Final Score | Selected |
|--------|-------------|-------------|----------|
| A1 | Extend existing `.github/workflows/audit-harness-integrity.yml` with v1.5 jobs | 16 | |
| A2 | New `.github/workflows/audit-harness-v1.5-integrity.yml`; existing file frozen | 15 | ✓ |
| A3 | Hybrid — v1.5 jobs in existing file but milestone-tagged for later archive | 16 | |

**User's choice:** A2 — Separate workflow yml
**Notes:** Existing yml hardcodes v1.4 + v1.4.1 sidecar/harness paths in `parse`/`path-match`/`harness-run` jobs (lines 27-50). Extending requires editing locked steps. File-versioning lineage discipline ("v1.4 stays FROZEN") logically extends to its CI replay infrastructure. Adversary disproved A1.CRIT-1 (frozen-marker conflation) and A2.LOW-1 (workflow freeze-marker) — these were on the harness file, not the yml. A3's tagging convention is unprecedented and "later archive" trigger is unspecified.

### Sub-B — PITFALL-12 Pin-coordinate-drift enforcement

| Option | Description | Final Score | Selected |
|--------|-------------|-------------|----------|
| B1 | Pre-commit hook hard-block | 30 | |
| B2 | Pre-commit advisory hook (warn, exit 0) | 16 | ✓ |
| B3 | CI advisory only (current v1.4.1 pattern) | 26 | |
| B4 | Plan-doc checklist only | 26 | |
| B5 | All three (pre-commit advisory + CI advisory + plan-doc) | 22 | |

**User's choice:** B2 — Pre-commit advisory hook
**Notes:** Phase 43 D-14 rejected pre-commit *hard-block* — but advisory mode is a distinct intermediate. v1.4.1 close shipped with `--self-test` failing; CI advisory missed it for 5+ phases. Pre-commit fail-fast surfaces drift at the moment the author edits pinned files, when context is fresh, without velocity penalty. Hard-block remains a future option for v1.6+. B3 (CI-only) repeats v1.4.1 close failure mode. B4 (plan-doc) is procedural; PITFALL methodology section warns procedural gates fail under velocity. B5 (all three) — Phase 43 D-24 belt-and-suspenders pattern was for PASSIVE defenses (scope-filter + sentinel); stacking three ACTIVE enforcement layers doesn't generalize.

---

## Claude's Discretion (passed-through to planner)

- Pre-commit hook tooling mechanism (Husky / native / lefthook) — pick what aligns with existing repo tooling at plan time
- Exact comment header text in `audit-harness-v1.5-integrity.yml` as long as it cites v1.4 + v1.4.1 frozen state
- `48-VERIFICATION-broken-links.md` triage table column order (markdown table format flexible) as long as three-category split + file/line/link-target shape preserved
- Exact `.mlc-config.json` flag set as long as redirect-following + internal/external split + GFM-anchor-case-sensitivity present
- Phase numbering treatment for ROADMAP.md SC#1 textual contradiction (D-09) — wording correction commit OR VERIFICATION.md note only

---

## Deferred Ideas

- CI advisory → blocking promotion ladder for pin drift (revisit v1.6+)
- Plugin-architecture harness refactor (revisit v1.6+ after 3 milestones of duplication)
- C7 sidecar allowlist mechanism (earn if Phase 49+ produces false positives)
- `broken_link_external_allowlist` array (only if C13 + external scope expands)
- iOS/macOS/Windows admin template `last_verified` normalization (Phase 60 second-pass triage)
- Pre-commit hook tooling standardization (document in PROJECT.md Key Decisions if repo settles on a tool)
- Hard-CI blocking on pin drift (revisit if pre-commit advisory false-positive rate near-zero over 3 months)
- C12 promotion-condition split (split into C12a file-existence + C12b structural if logic gets complex in Phase 60)
- `audit-harness-v1.5-integrity.yml` archival lifecycle (parallel to harness-archival pattern at v1.6 milestone-start)

---

## Adversarial-Review Methodology Note

This was a *design-decision* review (not a code review). Skipped Synthesizer phase (no code to fix). Single-Finder mode (no large codebase). Spawned 3 sequential Opus sub-agents:

1. **Finder** (488 raw pts): aggressively enumerated 488 pts of plausible flaws across 21 options.
2. **Adversary** (116 earned, claimed): disproved 16 issues citing source documents/decisions.
3. **Referee** (final ruling): adopted 14 disproves with 1 inversion (Gray Area 2 Option C C7+C9 → C6+C7).

The C6/C9 inversion is the load-bearing finding — original framing assumed AOSP files were unstable in v1.5 (so kept C6 informational), but Hotspot Ownership table inspection showed v1.5 phases don't touch admin-setup-android/ AOSP files. The reverse turned out to be true: C9 ops-domain false-positive risk in Phase 53/54 was higher than C6 stability risk.

Total wall-clock: ~3 sequential agent calls + 1 referee = 4 deliberation passes.
