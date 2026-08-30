# Phase 128 — Deferred / Out-of-Scope Items

---

## ⚠ CORRECTION (Phase-128 pre-push adversarial review, 2026-07-11)

A three-agent adversarial review (Finder → Adversary, converged, explicit-exit-code verified) at the
pre-push pause corrected the characterization below and surfaced the ACTUAL close-blocker. Two corrections:

**1. The standalone check-phase-48/60/61/62/63 failures are NOT "unrelated to Phase 128."** They ARE
HYG-02-caused (Phase 126 removed one frontmatter line from 5 Android docs → −1 line-shift; the predecessor
`regenerate-supervision-pins.mjs --self-test` BASELINE_9 pins and the frozen `v1.4..v1.16-audit-allowlist.json`
sidecar line-pins all read those docs at LIVE HEAD and drift). The Adversary's full `CHECK_PHASE_NESTED=1`
sweep of [48..125] proved every one of these is **NESTED-MASKED**: the apex spawns children with
`CHECK_PHASE_NESTED=1`, under which their CHAIN / AUDIT-07 / AUDIT-HARNESS sub-checks return `skipped:true`,
so they exit 0 when run BY the apex. **Therefore they do NOT make apex-128 RED and are correctly deferred**
— but the scope is broader than the `v1.6` this file originally named: it is `regenerate-supervision-pins.mjs`
+ **all predecessor milestone audits v1.4..v1.16** and their frozen sidecars. These are un-fixable under the
"no frozen-surface edit" rule (read-converting them or repointing their frozen sidecars = a forbidden frozen
edit) and are the exact `FROZEN-AWARE-ADOPTION-SWEEP-01` mandate → **deferred to v1.18** (see DEFER-128-A).

**2. The ACTUAL apex-128 close-blocker was `check-phase-124.mjs` — a DIFFERENT class (archival drift, not
HYG-02) — RESOLVED in Phase 128 (see RESOLVED-128-B).**

---

## RESOLVED-128-B: check-phase-124.mjs archived-planning-path live read (the sole apex-128 close-blocker)

**Class:** `LATENT-NON-FROZEN-AWARE-CONTENT-ASSERTION-01` (archival drift, NOT HYG-02).

**Root cause:** `check-phase-124.mjs`'s `V-124-PIPE05-OUTCOME` check read a hardcoded live path
`.planning/phases/124-.../PIPE-05-FINDINGS.md`. `/gsd-complete-milestone` git-archived that file to
`.planning/milestones/v1.16-phases/124-.../` AFTER the v1.16 close-gate, so the live path is now absent.
The check is NOT NESTED-gated (reads unconditionally), so it fails even under `CHECK_PHASE_NESTED=1` (exit 1)
— the SOLE validator in [48..125] that fails nested. apex-128 (`124 ∈ CHAIN_PHASES=[48..127]`, `CHAIN_SKIP`
empty) spawns it nested → `V-128-CHAIN-124 FAIL` → Axis-2 GHA RED. Fresh discovery: the v1.16 CI workflow's
`paths: scripts/validation/check-phase-*.mjs` filter never fired on the `.planning`-only archival commit.

**Why D-128-C's plan-time scoping missed it:** D-128-C is scoped strictly to predecessor validators reading
a **HYG-touched doc** at live HEAD. check-phase-124 reads no HYG doc — it reads an archived planning artifact.
So this is an **emergent-slot** remediation (D-128-D bullet), applied PRE-PUSH (pre-scoped) rather than
reactively after a GHA RED, per STATE.md's plan-time-remediation discipline.

**Fix (applied Phase 128, pre-push):** converted the one `readFile(DELIVERABLE_PIPE05)` in check-phase-124.mjs
to frozen-aware `readAtV116Close(DELIVERABLE_PIPE05)` — reads the file at the v1.16 close snapshot V116=3dd2512
where it still lived at the `phases/124/` path (verified: `git show 3dd2512:...PIPE-05-FINDINGS.md` exists +
contains `OUTCOME: PASS`). Needle unchanged (no value-masking); `CHAIN_SKIP` stays empty; only the archived
PIPE05 read converted (the other 4 checks read live `scripts/pipeline/` sources that still exist). Verified:
check-phase-124 now exits 0 standalone AND nested (5 PASS, 0 FAIL). apex-128 `V-128-CHAIN-124` will PASS.

---

## DEFER-128-A: HYG-02 −1 line-shift drift in predecessor supervision-pin regenerator + v1.4..v1.16 audit sidecars (NESTED-masked, non-blocking) → v1.18 FROZEN-AWARE-ADOPTION-SWEEP-01

Superset of DEFER-128-03-A below. NESTED-masked (proven non-blocking for the apex-128 re-audit). Un-fixable
without a frozen-surface edit; the correct home is the already-deferred `FROZEN-AWARE-ADOPTION-SWEEP-01` (v1.18),
which should repoint the pre-v1.17 frozen sidecars (v1.4..v1.16) −1 for the HYG-02 shift, OR convert those
predecessor audits' + `regenerate-supervision-pins.mjs`' own reads frozen-aware. Not in Phase-128 scope.

---

## DEFER-128-03-A: check-phase-62.mjs standalone exit is 1 — HYG-02-caused (Phase 126), NESTED-masked, non-blocking [SEE CORRECTION ABOVE]
  **Status:** acknowledged

**Discovered during:** Plan 128-03 Task 2 verification (running each of the 8 converted validators standalone).

**Observation:** `node scripts/validation/check-phase-62.mjs` exits 1 (30 PASS, 4 FAIL) both BEFORE and
AFTER this plan's D-128-C conversion of its `V-62-06..09` check. Byte-for-byte diff of the FAIL set
(pre-conversion `git show HEAD:scripts/validation/check-phase-62.mjs` run standalone, vs. post-conversion
working-tree run) is IDENTICAL — confirmed via `diff` of the two FAIL-line lists.

**Root cause (pre-existing, out of D-128-C scope):**
- `check-phase-48.mjs`, `check-phase-60.mjs`, `check-phase-61.mjs` each independently exit 1 when run
  standalone (unrelated to Phase 128; not touched by this plan).
- `regenerate-supervision-pins.mjs --self-test` independently exits 1 (unrelated to Phase 128).
- `v1.6-milestone-audit.mjs` (invoked by `check-phase-62.mjs`'s `V-62-AUDIT` subprocess check) fails its
  own C2 (supervision) check against `docs/_glossary-android.md` at LIVE HEAD — this is the OLDER
  `v1.6-audit-allowlist.json` sidecar's OWN line-pins, now also stale by the same HYG-02 `-1` line-shift
  that Phase 128-02 already fixed for `v1.17-audit-allowlist.json`. `v1.6-milestone-audit.mjs` and its
  sidecar are a DIFFERENT, frozen-Path-A-predecessor surface — NOT in scope for D-128-C (which converts
  ONLY the 8 named `check-phase-*.mjs` content-assertion validators' OWN reads, not the transitive
  subprocess chain they invoke, and NOT any predecessor milestone's OWN sidecar/harness).

**The specific check this plan converted — `V-62-06..09` (id 6, `check-phase-62.mjs`) — PASSES** both
before and after conversion; it is unaffected by the above pre-existing chain-subprocess failures.

**Disposition:** Out of scope per SCOPE BOUNDARY (pre-existing, unrelated failures in files this plan does
not touch). NOT fixed. This is the exact "OTHER milestone's sidecar" hazard RESEARCH.md's Open Questions
section flagged as `FROZEN-AWARE-ADOPTION-SWEEP-01`-adjacent and recommended deferring — carrying that
recommendation forward here with the concrete confirmed evidence (v1.6-milestone-audit.mjs C2 FAIL against
live-HEAD `docs/_glossary-android.md`, same HYG-02 `-1` shift root cause, different milestone's frozen
sidecar).

**Recommendation for future work:** `FROZEN-AWARE-ADOPTION-SWEEP-01` (already deferred to v1.18+) should
also cover repointing `v1.6-audit-allowlist.json` (and potentially other pre-v1.16 milestone sidecars) for
the same HYG-02 line-shift, OR converting `v1.6-milestone-audit.mjs`'s own reads frozen-aware. Neither is
this plan's mandate (D-128-C scopes ONLY the 8 named validators' own direct reads).
