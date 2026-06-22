# Phase 82 — Deferred Items (out-of-scope discoveries)

## PRE-EXISTING-CHAIN-RED-AT-HEAD-01

**Discovered during:** Plan 82-02, Task 3 (check-phase-82 chain-apex verification)

**Observation:** The full validator chain [48..81] is RED at the current HEAD
(`2cb2b5a`, Phase 82-01 close). Running the chain-apex `check-phase-82.mjs` reports
**10 FAIL / 1 SKIPPED** — all failures are in LEGACY chain phases (58, 59, 60, 61, 62,
63, 64, 65, 66, 73), NOT in any Plan-82-02 deliverable.

**Proof of pre-existing condition (independent of this plan):**
- The PRIOR apex `check-phase-74.mjs` — completely untouched by Plan 82-02 — reports the
  IDENTICAL **10 FAIL / 1 SKIPPED** at the same HEAD over its own chain [48..73].
- The failing validators (check-phase-58/60/66/73, etc.) fail when run STANDALONE too
  (e.g. check-phase-66 = 8 FAIL standalone; check-phase-73 = 10 FAIL + missing
  73-RETRO-INVENTORY.md).
- `git status` confirms these legacy validator files are UNMODIFIED by Plan 82-02.

**Scope verdict:** OUT OF SCOPE for Plan 82-02 per the executor scope boundary
(pre-existing failures in unrelated legacy files). Plan 82-02 only owns check-phase-75..82
+ the v1.9 workflow — all of which are green:
- check-phase-75..81 all exit 0 standalone.
- check-phase-82's own structural assertions (V-82-CHAIN-75..81, V-82-AUDIT-HARNESS,
  V-82-SELF) all PASS.
- check-phase-82 correctly replays the chain and surfaces the legacy reds (it is working
  as designed — the apex is a regression net, and the legacy net was already red).

**Relationship to plan-anticipated risk:** The plan's `<critical_constraints>` and the
threat register (T-82-02-02 / WINDOWS-CLONE-DEEPNEST-TIMEOUT-01) anticipated apex
chain-count fragility and instructed: "rely on the Linux GHA run in Plan 82-03 for the
apex chain count." Plan 82-03's Axis-2 (Linux GHA, warm fetch-depth:0 checkout) is the
authoritative apex source per D-03.

**Routing:** This legacy chain-red predates v1.9 Phase 82 and is a milestone-wide harness
hygiene item. It does NOT block Plan 82-02 (all 82-02 deliverables green) and should be
assessed at v1.9 close-gate (Plan 82-04) / v1.10+ as a chain-health backlog item, not a
Plan-82-02 fix.
