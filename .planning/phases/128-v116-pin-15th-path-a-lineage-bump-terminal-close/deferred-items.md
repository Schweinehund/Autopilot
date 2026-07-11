# Phase 128 — Deferred / Out-of-Scope Items

## DEFER-128-03-A: check-phase-62.mjs standalone exit is 1 — pre-existing, unrelated to D-128-C

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
