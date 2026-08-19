# `check-phase-143.mjs` Needle-Spec — Phase 144 Hand-Off

**Authored:** Phase 143 Plan 08, Task 1 (2026-08-11). This is the artifact D-23 (OWNER-RATIFIED,
`143-CONTEXT.md:351-368`) hands off. Phase 143 authors NO validator — it hands off exactly what
Phase 144 needs to build `check-phase-143.mjs` without re-deriving the contract from source.

## 1. The tool and its invocation

`scripts/validation/check-nav-hub-links.mjs` (`check-nav-hub-links.mjs:1-2`) — invoked with no
arguments for the corpus-wide scan, and with `--self-test` for the pure-function assertions
(`:29-30` parses both flags from `argv`).

- Corpus mode: exit 0 iff `allFailures.length === 0` across the hub-presence check
  (`checkOutboundLinks`) and the corpus-link check (`checkInboundLinks`) — `:459-483`.
- Self-test mode: exit 0 iff `stFailed === 0` across all ten `stAssert` cases (`:312-450`, exit
  logic at `:450`).
- No third exit code exists anywhere in the file — every `process.exit` call site
  (`:450`, `:482`) resolves to exactly 0 or 1.

## 2. The spawn idiom to copy

Quoted verbatim from `scripts/validation/check-phase-119.mjs:148`:

```js
execFileSync('node', [HARNESS], { stdio: 'pipe', timeout: 300000, cwd: process.cwd() });
```

Phase 144 substitutes `TOOL = 'scripts/validation/check-nav-hub-links.mjs'` for `HARNESS` and
follows the same try/catch shape at `check-phase-119.mjs:140-159` (pass on clean exit, fail with
`execFailDetail` on a non-zero exit, graceful-skip only if the tool file itself is absent —
`:141-143`).

**Measured committed-state runtime range** (`143-EVIDENCE.md:975-982`): n=3 runs on a quiesced
main worktree, tree at HEAD `db576147`, cache warm, Node v24.17.0, Windows 10 Pro 19045 —
`754 ms / 738 ms / 754 ms`, range **~738–754 ms**. This is sub-second on the measuring machine.
The chosen subprocess timeout must exceed this range by a wide margin rather than track it
closely — `check-phase-119.mjs:148`'s own `300000` ms (300 s, ~400x the measured range) is the
precedent scale to follow, not a tight bound computed from the 738–754 ms figure itself.

## 3. The literals Phase 144 may pin

Each literal below is marked required-PRESENT or required-ABSENT. These are the ONLY literals
this spec authorizes pinning — Section 3's closing note names two literals Phase 144 must NOT pin.

**Required-PRESENT:**

- `check-nav-hub-links summary: ` — the greppable summary-line prefix (`:477-480`), byte-unchanged
  across this phase by design (`143-CONTEXT.md` decision log, `143-07-SUMMARY.md` decision:
  "Summary line buckets reworded... while keeping the `check-nav-hub-links summary:` prefix
  byte-identical for Phase 144's needle-spec").
- `--self-test` — the flag string (`:18`, `:30`), mirroring `check-phase-115.mjs:75`'s bare
  substring pin on the c17 sibling (`if (!c.includes(needle))` where `needle = '--self-test'`).
- `Self-test: ` — the self-test tail, the counted-assertions line (`:449`,
  `'\nSelf-test: ' + stPassed + ' passed, ' + stFailed + ' failed\n'`).

**Required-ABSENT:**

- Any chain-registration array identifier (e.g. `CHAIN_PHASES`). The checker must never
  self-register into a chain array, exactly as `check-phase-115.mjs:102`
  (`if (c.includes('CHAIN_PHASES')) return { pass: false, ... }`) requires of its sibling
  `c17-eee-contract.mjs`. D-23 (`143-CONTEXT.md:365-366`) names this as the same class of
  constraint binding here. Live confirmation this phase: `check-nav-hub-links.mjs` has zero
  occurrences of `CHAIN_PHASES` (grep confirmed at plan time; the file's own header comment
  `:4-5` states "Standalone validator -- no chained per-phase registration array").
- Any baseline, allowlist, ratchet or expected-failure identifier. LINK-04 forbids an
  accepted-violation baseline of any kind (`:7-8`, `:456-457`); pinning its absence is what keeps
  the guarantee from silently eroding after this hand-off.
- The literal `{#` anywhere in the checker source outside its self-test block. LINK-01's
  deliverable is the ABSENCE of Pandoc `{#id}` special-casing (`:10-16`, `:130-133`,
  `:144-150`), and after D-38's conversion (`143-09-SUMMARY.md`) the corpus contains zero
  `{#id}` overrides — measured this session: `grep -rc '{#' docs/ --include=*.md` sums to **0**.
  With the corpus at zero, nothing would fail if a recognition branch were quietly re-added to
  the checker — the class would re-open invisibly the first time anyone authored a new override.
  Pinning the absence is the only thing that keeps the model correct once the corpus stops
  proving it by containing overrides. (Self-test Case D at `:364-370` legitimately contains the
  literal `{#custom-anchor}` as synthetic fixture text proving the negative — that occurrence is
  inside the self-test block and is not itself a violation of this required-ABSENT pin; the
  validator's assertion should scope its `{#` scan to source outside the `if (SELF_TEST) { ... }`
  block, `:312-451`.)

**Explicit warning — do NOT pin these two:** the two bucket labels inside the summary line
(`hub-presence failure(s)` and `corpus-link failure(s)`, `:478-479`). Their wording changed this
phase (`143-07-SUMMARY.md` decision log: "Summary line buckets reworded from hub-presence/
corpus-link... previously implied a four-hub scan") and could reasonably change again. The stable
contract is the prefix (`check-nav-hub-links summary: `), the labelled-counts-plus-total shape,
and the exit code — not the bucket wording itself.

## A corpus-level invariant worth pinning too

**Recommendation:** `check-phase-143.mjs` should ALSO assert that `docs/` contains **zero**
`{#id}` overrides (measured this session: `grep -rc '{#' docs/ --include=*.md | awk -F: '{s+=$2}
END {print s+0}'` → `0`). The Phase 144 record inherits this as the state at hand-off time.

**Why this belongs in the VALIDATOR, not in `check-nav-hub-links.mjs` itself:** adding a `{#id}`
corpus scan to the checker would re-introduce `{#id}` awareness into the exact function LINK-01
deletes it from (`computeAnchorSetFromContent`, `:141-191`) — a maintainer reading that function
would reasonably conclude the model still cares about the token, which is precisely the confusion
this phase exists to end (`check-nav-hub-links.mjs:10-16`'s own header comment: "do not re-add a
recognition branch under a different name if a future corpus count reaches zero"). A
validator-layer assertion keeps the checker's model clean (the checker's job is link/anchor
resolution; the corpus-hygiene invariant is a separate, checker-independent fact) and puts the
invariant where this repo already keeps corpus invariants (`check-phase-NN.mjs` files, not the
tools they spawn).

**Cost of the recommendation:** cheap — one recursive grep over `docs/`, no new file, no new
dependency, well inside `check-phase-119.mjs:148`'s spawn-and-timeout pattern reused for a plain
`readdirSync`/`readFileSync` walk (no subprocess needed for this half).

**Bounded cost if Phase 144 disagrees and omits it:** if a future edit re-introduces a `{#id}`
override into `docs/`, it renders as literal, visible junk text in the heading on GitHub (per the
checker's own documented model, `check-nav-hub-links.mjs:10-16`) — caught in ordinary content
review, not silently. Omitting the invariant does not reopen the 65-link false-negative class
D-01/D-02 closed; it only means a future stray override is caught by a human reader instead of a
validator.

## 4. What the validator should assert

1. The tool exists at `scripts/validation/check-nav-hub-links.mjs`.
2. The corpus-wide run (no flags) exits 0.
3. The `--self-test` run exits 0.
4. The summary line is present (required-PRESENT prefix, Section 3) and its `total` count
   parses to `0`.
5. Each required-ABSENT literal (Section 3) is absent from the checker's source, scoped
   correctly for the `{#` pin (outside the self-test block only).

## 5. The rename bar

`check-phase-123.mjs:40,83` pins this file's PATH STRING via a presence check
(`DELIVERABLE_LINKCHECKER = 'scripts/validation/check-nav-hub-links.mjs'`, `presence('LINKCHECKER',
DELIVERABLE_LINKCHECKER, 'D-01 new standalone validator')`). The file must NOT be renamed by
Phase 144 or any later phase — an in-place edit is safe (this phase made several: fence-mask
widening, corpus-flip condition deletions, `<a id>` recognition), but a rename breaks a frozen
call site in `check-phase-123.mjs`, which sits inside every apex chain.

## 6. What is explicitly NOT handed off

**No C18 harness fold.** ROADMAP Phase 144 SC#2 (`.planning/ROADMAP.md:280`) pins
`v1.20-milestone-audit.mjs` as "(Path-A from v1.19, **C1-C17 inherited**)", and Phase 144's
Discuss-phase flags line reads "None (closing cluster; consumes prior decisions)"
(`.planning/ROADMAP.md`, Phase 144 section). This project reads that phrasing as
authorization-limiting in its own words — `93-CONTEXT.md:51`: "**No C17** — v1.11 ROADMAP locks
'C1–C16 inherited' with **no C17 conditional hook at all**", repeated at `95-CONTEXT.md:64`.

C17 itself landed as a harness fold only because v1.15 pre-booked it under HARN-01 and D-119, with
`check-phase-115.mjs:98-105` (the `V-115-STANDALONE` check quoted in Section 3 above) actively
failing if the contract self-registered into `CHAIN_PHASES` — the fold happened in
`v1.15-milestone-audit.mjs` (Atom 1), a SEPARATE mechanism from the contract file's own standalone
posture, and that separation was itself pre-authorized. Phase 143 has no equivalent booking for
`check-nav-hub-links.mjs` — no ROADMAP SC, no HARN requirement, and no discuss-phase flag
authorizes folding it into `v1.20-milestone-audit.mjs`. The fold is withdrawn as unauthorized;
Phase 144 wires this checker only via the `check-phase-143.mjs` spawn described in Sections 1-4
above, inside the apex chain, exactly as any other `check-phase-NN.mjs` member.

---

*Phase: 143-link-coverage-fence-mask-unification*
*Written: 2026-08-11*
