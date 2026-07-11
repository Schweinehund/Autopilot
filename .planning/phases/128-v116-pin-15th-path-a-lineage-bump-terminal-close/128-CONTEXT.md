# Phase 128: V116 Pin + 15th Path-A Lineage Bump + Terminal Close - Context

**Gathered:** 2026-07-11
**Status:** Ready for planning

<domain>
## Phase Boundary

The **v1.17 milestone-close** phase — the SOLE deliverable. Three requirements, mirroring
v1.13 Phase 100 / v1.14 Phase 112 / v1.15 Phase 119 / v1.16 Phase 125 exactly (never batches with
pipeline, hook, or content work — all done in Phases 126–127):

- **HARN-08** — add the **V116 back-anchor pin** (`V116: '3dd2512'` + `readAtV116Close` export) to
  `scripts/validation/_lib/frozen-at-close.mjs`, freezing the v1.16 corpus. This is the pin the v1.16 close
  deliberately deferred (`V116-PIN-DEFERRAL`). Back-anchor invariant: pins reference only PAST close SHAs.
- **HARN-09** — the **15th Path-A audit-harness lineage bump**: `v1.17-milestone-audit.mjs` (C1–C17 inherited
  from v1.16) + `v1.17-audit-allowlist.json` + BASELINE_21 + `check-phase-126/127/128.mjs` validators + the
  **14th** parallel CI coexistence workflow (`audit-harness-v1.17-integrity.yml`). Predecessor v1.4–v1.16 frozen
  surfaces stay **byte-unchanged**; predecessor content-assertion validators reading a HYG-02/03-touched doc at
  live HEAD are converted **frozen-aware** (`readAtV116Close`) as in-scope close-gate remediation. NO
  value-masking, NO frozen-surface edit, `CHAIN_SKIP` empty.
- **HARN-10** — the milestone closes via a **3-axis terminal re-audit** (fresh `git clone --no-hardlinks` +
  cross-OS Linux GHA authoritative for BOTH chain validators per the D-03 OS split + fresh zero-context
  sub-agent; cross-OS PASS/FAIL/SKIP EXACT MATCH), in a single close-gate commit flipping all **10** v1.17
  requirements to Validated, with `v1.17-MILESTONE-AUDIT.md` + `v1.17-DEFERRED-CLEANUP.md` authored.

**Key delta from Phase 125:** v1.16 (Phase 125) absorbed drift from a large **structural retrofit** (Phases
121/122/123 — glossaries, lifecycle, decision-trees, nav-hubs). v1.17 did **no** structural retrofit — the
milestone shipped a `.docx` publish pipeline (Phase 126) + an auto-close hook (Phase 127). v1.17's ONLY corpus
edits are the two guard-motivated HYG fixes, and one of them is a no-op (see grounding corrections). The close
is therefore a **clean harness-only lineage bump** with a near-empty drift surface — but the frozen-aware
conversion is still a **mandatory, plan-time-scoped** remediation, not a react-if-RED afterthought.

**NOT this phase:** any content/pipeline/hook work (Phases 126–127 — DONE); any C17 edit (immutable); a V117
pin (that back-anchors from the NEXT milestone); the `FROZEN-AWARE-ADOPTION-SWEEP-01` broad sweep (deferred
v1.18+); the O(n²) Windows-runner rewrite (`WINDOWS-CLONE-DEEPNEST-TIMEOUT-01`, out of scope); auto-upload to
SharePoint (deferred).

**Adjudication method:** All four gray areas (A/B/C/D) were resolved via a **three-agent adversarial review**
(Finder → Adversary → Referee, all Opus), each independently re-verifying every deciding fact against the repo.
The review **converged HIGH on all four picks** and **corrected several v1.17-specific grounding gaps** a naive
"copy Phase 125" would import — see the LOAD-BEARING GROUNDING CORRECTIONS block below. User delegated all four
picks to the adversarial review on 2026-07-11.

</domain>

<decisions>
## Implementation Decisions

### D-128-A — Grounding rider: A1 harness-only close, NO PIPE-02 rider [resolves HARN-10] — HIGH
- **NO PIPE-02 / grounding-confirmation leg attaches to this close.** HARN-10 (REQUIREMENTS L40) ratifies a
  pure 3-axis terminal re-audit (fresh clone + cross-OS Linux GHA authoritative for both chain validators +
  fresh zero-context sub-agent, cross-OS EXACT MATCH) with NO owner-checkpoint/grounding leg. ROADMAP Phase 128
  SC1–SC4 likewise name none.
- **Do NOT copy Phase 125's PIPE-02 rider.** v1.16's HARN-07 (`git show 3dd2512:.planning/REQUIREMENTS.md`)
  explicitly carried "…EXACT MATCH **plus a PIPE-02 grounding-validation confirmation** on the retrofitted
  structural corpus." That rider was a v1.16-structural-retrofit artifact. v1.17 changed no grounding surface
  (HYG-02 removes a non-cited frontmatter key; the deliverable is a `.docx` packaging bundle), so a grounding
  leg would have nothing to ground.
- *Rejected A2 (add a bundle-integrity / grounding smoke test):* a "bundle-integrity smoke test" is NOT
  grounding — mislabels packaging validation, and duplicates the Phase-126 gate that already proved it
  (PUB-02 fail-closed guard on all 221 + PUB-04 registry-parity assertion + Phase-126 self-test 11/11). Also
  structurally incompatible with the fresh-clone axis (`dist/` is gitignored — see D-128-D Sub-Q1). A
  non-blocking `build-publish-bundle.mjs --version=v1.17` parity dry-run is defensible as discretionary
  corroboration but is NOT a HARN-10 requirement and must never be dressed up as "grounding."
- **RIDER:** the close-gate is a SINGLE commit flipping all 10 v1.17 reqs to Validated across
  PROJECT/ROADMAP/STATE/REQUIREMENTS, with `v1.17-MILESTONE-AUDIT.md` + `v1.17-DEFERRED-CLEANUP.md` authored in
  the same gate.

### D-128-B — Cross-OS Axis-2: B1 Linux GHA authoritative for BOTH chain validators [resolves HARN-10] — HIGH
- Push the close branch → the **new `audit-harness-v1.17-integrity.yml`** runs BOTH chain validators (apex +
  continuity) on `ubuntu-latest`; **that GHA run's green is the authoritative Axis-2 result**; the Windows-local
  run corroborates only (deep-nest timeout at the 80-entry apex range — worse than v1.16's 77).
- **MANDATORY RIDER — author `audit-harness-v1.17-integrity.yml` by copying `audit-harness-v1.16-integrity.yml`**;
  repoint `paths:` from `v1.16-*` → `v1.17-*` and the `v1.16-MILESTONE-AUDIT.md`/`v1.16-DEFERRED-CLEANUP.md`
  path entries → `v1.17-*`; preserve the `linux-chain-ubuntu-latest` job (`core.autocrlf false` +
  `fetch-depth:0` + `continue-on-error:false` + `timeout-minutes:30`). This is the **14th** coexistence workflow
  (v1.16 was the 13th).
- **MANDATORY RIDER — B↔C↔D interlock:** Atom-2 push FIRST (fires the `paths:` trigger); the close-gate
  necessarily post-dates the push and consumes the run ID. Authoring the close-gate before the Atom-2 push
  leaves no run ID to consume → the "authoritative Axis-2 = this GHA run" leg is unfulfillable.
- **CASCADE SCAN (see LOAD-BEARING CORRECTION #4):** scan the **10 chain-running predecessor workflows
  (v1.7–v1.16)** + the new v1.17 for RED before the close-gate. Because v1.17's corpus drift is ~nil (D-128-C),
  the cascade is expected **all-green** — the opposite of v1.16's real cascade risk — but the scan remains
  cheap mandatory insurance; a shared `readAtV116Close` conversion greens every apex at once if any tripped.
- *Rejected B2 (local WSL2/Docker authoritative):* not the SC-named GHA surface; local-env/LF variance.
  *Rejected B3 (sub-agent runs chain, GHA skipped):* Windows deep-nest timeout at the apex range; collapses
  Axis-2 into Axis-3, destroying 3-axis independence.

### D-128-C — Predecessor-validator remediation: SYNTHESIS — plan-time pre-scope-AND-convert (mandatory) + emergent slot [resolves HARN-09, the mandate] — HIGH
- **[Finder's C1 "emergent-slot-only / react-if-RED" was OVERRULED by the adversarial review.]** HARN-09
  (REQUIREMENTS L39) *mandates* — verb is declarative "**is converted** frozen-aware (`readAtV116Close`) as
  in-scope close-gate remediation" — the conversion of "any predecessor content-assertion validator that reads a
  HYG-touched doc at live HEAD." STATE.md (L205/L211/L220) independently orders that scoping **at plan time, not
  late at close** (citing the v1.15 119-05 / v1.16 125-05 two-round-remediation cautionary precedent). The
  requirement's driver is `LATENT-NON-FROZEN-AWARE-CONTENT-ASSERTION-01` — eliminating the latent hazard
  **proactively**, independent of whether any validator currently goes RED.
- **DECISION (synthesis):** at PLAN time,
  1. Run the **FULL predecessor chain (48..127, not just immediate apexes)** to enumerate the exact set of
     predecessor content-assertion validators that read a HYG-02/HYG-03-touched doc at live HEAD. The set is
     **provably non-empty** — confirmed live-HEAD readers include `check-phase-121.mjs` (`V-121-VHROW`,
     `readFileSync` of `docs/_glossary-android.md`), `check-phase-101.mjs` (802.1X banner in
     `_glossary-android.md`), and `check-phase-49/59/62` (multiple glossaries).
  2. **Convert each identified validator's read of a HYG-touched doc to `readAtV116Close`** (frozen at the V116
     pin `3dd2512`) — legitimate frozen-aware reading of the pre-edit v1.16 snapshot.
  3. Keep an **emergent slot** for anything the full-chain scoping run surprises (fires only if the authoritative
     Axis-2 GHA apex still comes back RED after the pre-scoped conversions land — expected to fire on nothing).
- **MANDATORY CONSTRAINTS:** NO value-masking (no expected value bumped to the evolved state); NO predecessor
  **frozen**-surface edit; `CHAIN_SKIP` stays **empty** on every touched validator (the apex hard-asserts
  `CHAIN_SKIP.size === 0`); honest RED-then-green record if the slot ever fires.
- **DEPENDENCY:** the V116 pin (HARN-08) must land **before** any `readAtV116Close` conversion — the helper must
  exist first.
- *Rejected C1 (emergent-slot-only, react-if-RED):* collides with the HARN-09 mandate + the STATE
  plan-time-scoping order; would defer a *required* conversion to a reactive close-gate step (the exact
  two-round-remediation failure mode STATE warns against). *Rejected C2 (broad pre-convert-all-readers):* that
  is the out-of-scope `FROZEN-AWARE-ADOPTION-SWEEP-01`, deferred to v1.18 — convert ONLY validators that read a
  HYG-touched doc, not every reader.

### D-128-D — Close skeleton + V116-pin placement + hook-regen + DEFERRED-CLEANUP [resolves HARN-08/09/10 structure] — HIGH
- **3-commit skeleton as a FLOOR, not a ceiling:** (Wave-0 pre-anchor) → **Atom 1** (harness + allowlist +
  BASELINE_21 back-anchored to the Wave-0 SHA) → **Atom 2** (validators + V116 pin + CI workflow) → PUSH →
  [emergent remediation slot, only if GHA RED] → **close-gate** (single commit flipping all 10 reqs). v1.14's
  honest history was ~7 commits — do NOT read "3" as a ceiling.
- **V116 pin rides Atom 2** with `check-phase-126/127` validators + `audit-harness-v1.17-integrity.yml` +
  BASELINE_21 — mirrors V114/V115 (both rode Atom 2; `frozen-at-close.mjs:56,62`). Add `V116: '3dd2512'` +
  `readAtV116Close`, single-entry pattern. **SHA `3dd2512` is a CANDIDATE — positively confirm at plan time**
  via the dual-token recovery command `git log --all --grep="MILESTONE-AUDIT" --grep="MILESTONE CLOSE"
  --all-match -1 --format=%H` (recover-not-assume; the command returns the `docs(125-07)` v1.16 close-gate).
- **BASELINE_21 is the correct freshness marker** — v1.16 = BASELINE_20 (`regenerate-supervision-pins.mjs`
  already anticipates "BASELINE_21 will refresh at [v1.17 close]"). Back-anchor to the Wave-0 / pre-Atom-1 HEAD.
- **Apex = `check-phase-128`, `CHAIN_PHASES = [48..127]` = 80 entries** with a hard `throw` on length≠80 /
  terminus≠127, mirroring `check-phase-125.mjs` (`[48..124]`=77, throw). `check-phase-126` and `check-phase-127`
  carry `CHAIN_PHASES=[]` (chain lives ONLY in the apex; the 121/123/124 pattern). Author `[48..127]` literally
  — **update the length hard-throw from 77 to 80 or it throws** (see LOAD-BEARING CORRECTION #5).
- **Sub-Q1 — the close-gate does NOT verify hook-regen. CONFIRMED.** `publish-bundle-gate.cjs` (`.claude/hooks/`)
  never builds and never self-verifies the zip: `computeDecision` returns only `allow` (if `zipExists`, D-04
  idempotency) / `block(nudge)` / `block(warn)`; the sole zip touch is `fs.existsSync`. `dist/` is gitignored
  (`.gitignore:20`), so a fresh `git clone` (Axis-1) contains no zip. Therefore: the close-gate adds NO leg
  asserting the hook refreshed `docs-library-v1.17.zip`, and the re-audit must NOT assert zip presence inside
  the fresh clone (the re-audit exercises validators, not the zip). Regen is purely the hook's post-close
  idempotency-guarded nudge (a no-op when the zip is present).
- **Sub-Q2 — DEFERRED-CLEANUP scope:**
  - **Resolve now:** `V116-PIN-DEFERRAL` (closed by HARN-08). (`DEFER-125-06-A` and `DEFER-121-07-A` already
    closed in Phase 126.)
  - **Carry to v1.18** (all still open): `FROZEN-AWARE-ADOPTION-SWEEP-01`, `WINDOWS-CLONE-DEEPNEST-TIMEOUT-01` /
    the O(n²) chain-runner rewrite (STATE confirms the apex deepens to `[48..127]` and stays Linux-GHA-
    authoritative), auto-upload-to-SharePoint, SharePoint content-approval Draft-gating, Azure AI Search.
- *Rejected D2 (pin rides Atom 1):* mis-places the pin away from its consuming validators; contradicts the
  v1.12–v1.16 Atom-2 pattern. *Rejected D3 (standalone commit for the pin):* the 119/125 precedents rejected the
  analogous non-problem.

### ⚠ LOAD-BEARING GROUNDING CORRECTIONS (facts a naive "copy Phase 125" gets WRONG — verified by the review)
1. **HYG-03 is a v1.17 NO-OP.** The 9 Version-History date placeholders were already filled in v1.16 commit
   `9031056` (verified ancestor of the V116 close-gate `3dd2512`); `126-01-SUMMARY.md` records HYG-03 as
   verify-only, zero files modified. It froze into the V116 corpus and produces ZERO v1.17 drift. Do NOT treat
   HYG-03 as a live drift source.
2. **HYG-02 touched 5 files, not the 1 named.** REQUIREMENTS HYG-02 (L29) names only `_glossary-android.md`
   (RE-179); the actual edit (`126-01-SUMMARY.md`, commit `7dda1f7`) removed the identical
   `phase_46_wave2_retrofit` frontmatter line from RE-179 + RE-095 (`03-fully-managed-cobo.md`) + RE-096
   (`04-byod-work-profile.md`) + RE-144 (`android-capability-matrix.md`) + RE-188 (`03-android-version-matrix.md`).
   The D-128-C plan-time scoping run MUST cover all 5, not just RE-179.
3. **The dominant v1.16 RED shape (ABAUDIT/C15 FP-exemption from `#12` blockquote splits) is ABSENT this
   milestone.** v1.17 did no structural retrofit → no blockquote splits → no C15 anti-pattern trip. Also, NO
   validator asserts the removed `phase_46_wave2_retrofit` key (`grep phase_46_wave2_retrofit
   scripts/validation/` is empty) and all content assertions are substring `.includes()` (not line-anchored) —
   so emergent-RED probability from the corpus edits is ~nil. The Phase-125 "dominant risk" framing does not
   transfer; the D-128-C conversion is driven by the *latent-hazard mandate*, not a RED reaction.
4. **CI cascade: 11 FIRING workflows, but 10 chain-RUNNING.** A new `check-phase-128.mjs` fires: the base
   `audit-harness-integrity.yml` (via the `scripts/validation/**` superset glob) + v1.7–v1.16 (via
   `check-phase-*.mjs`) = **11 firing**. BUT the base runs only the v1.4/v1.4.1 harnesses — it has NO
   check-phase/chain job and CANNOT go RED on chain content. The **Axis-2 RED-scan surface is the 10
   chain-running predecessors (v1.7–v1.16)** + the new v1.17. **v1.5/v1.6 do NOT fire** (narrow `v1.x-*` globs).
   Phase 125's "all 11 versioned v1.5–v1.16 fire" framing is imprecise — do not chase RED in v1.5/v1.6, and do
   not omit the base from the coexistence check.
5. **Apex is 80 entries (`[48..127]`), not 77.** The length hard-throw copied from `check-phase-125.mjs`
   (`!== 77`) must be updated to `80` (terminus 127) or the new apex throws on itself.
6. **Close flips 10 v1.17 requirements** (REQUIREMENTS Coverage: "v1.17 requirements: 10 total"), NOT the 14 of
   the v1.16 close. Only HARN-08/09/10 remain `[ ]`.
7. **Naming off-by-one:** v1.17 = the **15th Path-A** lineage bump but only the **14th** CI coexistence workflow
   (v1.16 = 14th Path-A + 13th coexistence workflow). Copying Phase 125's "14th/13th" labels mislabels both.

### Claude's Discretion (resolve at plan time)
- Exact plan count / plan-to-commit mapping within the skeleton (Wave-0 anchor + Atom 1 + Atom 2 + emergent slot
  + close-gate).
- Exact `.docx` parity dry-run inclusion (optional, non-blocking, discretionary — NOT a HARN-10 requirement).
- Whether to run an optional local corroborating Linux (WSL/Docker) chain pass before the authoritative GHA push.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase scope + requirements (read FIRST)
- `.planning/ROADMAP.md` §"Phase 128" — SC1–SC4 (V116 pin, the 15th lineage-bump artifact list, the 3-axis
  re-audit, the single-close-gate/10-req flip). Note SC2 uses the parameterized `[48..(closephase-1)]` form
  (no literal-range transcription trap this milestone, unlike Phase 125) — but the invariant still binds:
  author `[48..127]`=80 entries.
- `.planning/REQUIREMENTS.md` — **HARN-08** (V116 pin), **HARN-09** (15th lineage bump; L39 = the MANDATED
  frozen-aware conversion of live-HEAD HYG-doc readers; NO value-masking; `CHAIN_SKIP` empty), **HARN-10**
  (3-axis re-audit + single close-gate flipping all 10). Coverage table: "v1.17 requirements: 10 total".
- `.planning/STATE.md` — v1.17 milestone state; L205/211/220 = the plan-time-scoping order (scope the
  HYG-reading validator set at plan time, not late at close; 119-05/125-05 cautionary precedent); the
  Linux-GHA-authoritative / D-03 OS-split lock; `WINDOWS-CLONE-DEEPNEST-TIMEOUT-01`.

### The direct precedents (the close TEMPLATES — read before planning, but heed the corrections above)
- `.planning/milestones/v1.16-phases/125-v115-pin-14th-path-a-lineage-bump-terminal-close/125-CONTEXT.md`
  — the direct A/B/C/D adjudication template; the 3-commit-skeleton + Wave-0 anchor + emergent-slot pattern.
  **BUT: its PIPE-02 rider, its "dominant ABAUDIT/C15 risk," and its "all 11 versioned workflows fire" framing
  do NOT transfer to v1.17 — see the LOAD-BEARING GROUNDING CORRECTIONS.**
- `.planning/milestones/v1.15-phases/119-*/119-CONTEXT.md` and `.planning/milestones/v1.14-phases/112-*/112-CONTEXT.md`
  — the emergent-slot + predecessor-byte-unchanged-gate precedents; the honest RED-then-green accounting.

### The harness surfaces being authored / re-pinned
- `scripts/validation/_lib/frozen-at-close.mjs` — `MILESTONE_CLOSE_SHAS` ends at `V115` (line 62); line 66 notes
  the V116 pin is deferred to v1.17. Atom 2 ADDS `V116: '3dd2512'` + `readAtV116Close` (single-entry pattern).
  SHA recovered via the dual-token grep (recover-not-assume).
- `scripts/validation/v1.16-milestone-audit.mjs` + `v1.16-audit-allowlist.json` — the Path-A copy-source →
  `v1.17-milestone-audit.mjs` + `v1.17-audit-allowlist.json` (C1–C17 inherited; repoint sidecar reference).
- `scripts/validation/check-phase-125.mjs` — the newest apex validator + the apex-range convention source
  (`CHAIN_PHASES=[48..124]`=77 + hard length/terminus throw). Model for `check-phase-126/127` (carry `[]`) and
  the apex `check-phase-128` (`CHAIN_PHASES=[48..127]`=80 — UPDATE the throw to 80/127).
- `.github/workflows/audit-harness-v1.16-integrity.yml` — the CI copy-source → `audit-harness-v1.17-integrity.yml`;
  preserve `linux-chain-ubuntu-latest`; repoint `paths:` from `v1.16-*` to `v1.17-*` (and the MILESTONE-AUDIT /
  DEFERRED-CLEANUP path entries).
- `.github/workflows/audit-harness-integrity.yml` (BASE) — fires on `scripts/validation/**` (superset glob), so
  it triggers on the new check-phase files but runs only the v1.4/v1.4.1 harnesses (no chain job → cannot go RED
  on chain content). Include in the coexistence check; do NOT expect chain RED from it.
- `scripts/validation/regenerate-supervision-pins.mjs` — Atom 1 adds the BASELINE_21 freshness comment
  (back-anchored to the Wave-0 / pre-Atom-1 HEAD).
- Predecessor content-assertion validators that read a HYG-touched doc at live HEAD (the D-128-C conversion set —
  ENUMERATE via the plan-time full-chain scoping run; confirmed members include `check-phase-121.mjs`
  (`V-121-VHROW`), `check-phase-101.mjs`, `check-phase-49/59/62.mjs`).

### The Phase-127 hook (context for D-128-D Sub-Q1 — NOT a close-gate task)
- `.claude/hooks/publish-bundle-gate.cjs` (Stop-hook) + `scripts/pipeline/build-publish-bundle.mjs` — the hook
  nudges + read-only zip-idempotency-skips; it never builds or self-verifies the zip. `dist/` is gitignored.

### HYG-02/03 evidence (the drift-surface ground truth)
- `.planning/phases/126-*/126-01-SUMMARY.md` — HYG-02 = 5 files (commit `7dda1f7`); HYG-03 = verify-only no-op
  (already fixed in v1.16 commit `9031056`).

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- **The entire v1.16 close scaffold is the copy-source** — `v1.16-milestone-audit.mjs`,
  `v1.16-audit-allowlist.json`, `audit-harness-v1.16-integrity.yml`, `check-phase-125.mjs`. Copy → repoint
  `v1.16`→`v1.17` + advance the check-phase range + set apex `[48..127]` (update the length throw to 80).
- `_lib/frozen-at-close.mjs` — extend `MILESTONE_CLOSE_SHAS` + `readAtVxxClose` family (single-line addition:
  `V116: '3dd2512'` + `readAtV116Close`). `readAtV116Close` is the frozen-aware-conversion mechanism (pattern
  already live in earlier `check-phase-*.mjs` via `readAtV115Close`).

### Established Patterns
- **Two-atom-then-close-gate + Wave-0 anchor + emergent slot** (v1.12–v1.16). Atom 1 and Atom 2 each ship as ONE
  indivisible commit; a separate single close-gate commit flips all requirements.
- **Back-anchor invariant** — pins reference only PAST close SHAs (successor pins predecessor). V116 = v1.16's
  `3dd2512`. No V117 pin here.
- **Apex-only chain** — `CHAIN_PHASES=[48..(closephase-1)]` lives ONLY in the close-apex validator; per-phase
  validators carry `[]`. Hard length/terminus throw on the apex.
- **Linux-GHA-sole-authoritative for both chain validators** (Windows deep-nests at the apex range); Windows
  corroborates. **Predecessor-workflow cascade** — v1.7–v1.16 fire on `check-phase-*.mjs` edits; base fires but
  runs no chain job.
- **Honest-accounting on remediation** — RED-then-green intermediate states recorded, not hidden;
  `CHAIN_SKIP` empty.

### Integration Points
- New `check-phase-126/127/128.mjs` + `audit-harness-v1.17-integrity.yml` slot into the existing versioned
  validator/workflow lineage. The V116 pin + `readAtV116Close` conversions integrate into the existing
  `frozen-at-close.mjs` + predecessor validator surface.

</code_context>

<specifics>
## Specific Ideas

- The close mirrors v1.13 Ph100 / v1.14 Ph112 / v1.15 Ph119 / v1.16 Ph125 in SHAPE (C1/A1/D1/B1-analogs) but
  for materially different REASONS — v1.17's real drift surface is 5 inert frontmatter deletions plus a no-op,
  so the emergent slot should fire on nothing and the close should be a clean harness-only lineage bump. The
  value-add of this discussion is the seven grounding corrections, not new structure.

</specifics>

<deferred>
## Deferred Ideas

- **`FROZEN-AWARE-ADOPTION-SWEEP-01`** — broad frozen-aware conversion of ALL predecessor validators (not just
  HYG-doc readers) — deferred to v1.18+. This phase converts ONLY the mandated live-HEAD HYG-doc readers.
- **`WINDOWS-CLONE-DEEPNEST-TIMEOUT-01` / O(n²) Windows chain-runner rewrite** — the apex deepens to
  `[48..127]`; Linux GHA stays authoritative. Rewrite deferred.
- **Auto-upload to SharePoint** (Graph API + `Sites.ReadWrite.All`), SharePoint content-approval Draft-gating,
  Azure AI Search — all deferred; owner uploads the `.docx` bundle manually this milestone.
- **Optional non-blocking `.docx` parity dry-run at close** — discretionary corroboration only; NOT a HARN-10
  requirement (see D-128-A).

</deferred>

---

*Phase: 128-v116-pin-15th-path-a-lineage-bump-terminal-close*
*Context gathered: 2026-07-11*
