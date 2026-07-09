# Phase 125: V115 Pin + 14th Path-A Lineage Bump + Terminal Close — Research

**Researched:** 2026-07-09
**Domain:** Milestone-close harness engineering (envelope/structural close — no new technical domain)
**Confidence:** HIGH (every load-bearing fact re-verified against the live repo this session)

## Summary

This is the **v1.16 milestone-close** — the 14th Path-A audit-harness lineage bump, mirroring v1.15
Phase 119 / v1.14 Phase 112 exactly. There is **no domain to research**; the entire value is
**exactness**: the precise copy-source→target diffs, the enumerated predecessor-validator drift set,
the apex CHAIN_PHASES range convention, the C15/ABAUDIT recurrence mechanism, and the PIPE-02 runbook
fork. The four gray areas (C/A/D/B) are **already locked** in CONTEXT.md (D-125-1..4) and the load-bearing
apex-range correction is locked — this research documents **HOW to execute them**, not whether.

Every deciding fact was confirmed against the repo: `V115 = 29a3599` (git log positive-confirmation),
the `check-phase-119.mjs` `[48..(N-1)]` invariant with its hard throw, the C15 `ABAUDIT-NN` HTML-comment
exemption mechanism, the fact that structural retrofit docs carry **zero** ABAUDIT comments today, the
predecessor-workflow cascade (with a material correction to the "all 11 fire" claim — see below), and the
119 seven-plan skeleton.

**Primary recommendation:** Author `frozen-at-close` `V115: '29a3599'` + `readAtV115Close` and the apex
`check-phase-125` with `CHAIN_PHASES = [48..124]` (**77 entries**, NOT the literal `[48..119]` the ROADMAP/
REQUIREMENTS/STATE text says). Copy the v1.15 close scaffold verbatim, repoint `v1.15`→`v1.16`, and treat
the ABAUDIT/C15 exemption on `_glossary-apple-business.md` as the **dominant** (un-pre-convertible) emergent-
slot risk. Follow the 119 seven-plan skeleton (Wave-0 anchor → Atom 1 → Atom 2+push → Axis-2 → emergent slot
→ PIPE-02 owner-run → close-gate flipping all **14** reqs).

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**D-125-1 — Predecessor-validator remediation: C1 emergent slot (3 shapes) + flag-#6 plan-time scoping** (resolves HARN-06, the DOMINANT RISK)
- Pre-authorize an EMERGENT remediation slot that fires ONLY if the authoritative Axis-2 GHA apex comes back RED. The slot admits THREE remediation shapes:
  1. `readAtV115Close` frozen-aware conversion of a predecessor content-assertion validator (real but NOT dominant; already live in `check-phase-50/52/65.mjs`).
  2. `<!-- ABAUDIT-NN -->` C15 FP-exemption on the tripping line — the ACTUAL dominant v1.15 shape (v1.15 emergent RED = commit `ad583fd`, GHA run `28823233887`).
  3. In-class NESTED/guard fix on a predecessor `check-phase-NN` validator.
- MANDATORY RIDER — flag-#6 plan-time SCOPING run: run the FULL predecessor chain at PLAN time to SCOPE which validators drift. Convert/exempt only what actually trips. Broad proactive sweep = out-of-scope `FROZEN-AWARE-ADOPTION-SWEEP-01` (deferred v1.17+).
- MANDATORY RIDER — remediation constraints: NO value-masking, NO predecessor frozen-surface edit, `CHAIN_SKIP` stays EMPTY (V-SELF hard-asserts size 0), honest RED-then-green record. (An ABAUDIT comment on a v1.16 structural doc from Phases 121–123 IS allowed — those are this-milestone surfaces, not predecessor frozen docs.)
- DEPENDENCY: the V115 pin (HARN-05) must land in Atom 2 BEFORE any `readAtV115Close` conversion (the helper must exist first).

**D-125-2 — PIPE-02 grounding: A1 full owner-run, blocking, riders RETARGETED to v1.16 deltas** (resolves HARN-07)
- Fresh full owner-run grounding pass on a representative set of the NEW structural corpus (glossaries / lifecycle / decision-trees / nav-hubs), owner-run in Copilot Studio (agent has NO live Copilot access). Agent prepares the `.docx` set + `PIPE-02-CLOSE-RUNBOOK.md`; owner executes + records `PIPE-02-CLOSE-FINDINGS.md`. Close-gate BLOCKS until owner attests PASS; PIPE-02 Validated in the SAME close-gate commit.
- MANDATORY RIDER — RETARGET probes to v1.16 deltas (do NOT re-run v1.15's RETRO-03 wide-matrix / RETRO-02 Linux-admin riders — untouched surfaces). Target: (a) decision-tree Mermaid→text-equiv table with EVERY decision leaf citable (STD-04 / RETRO-05/08); (b) glossary definition-list anchor-slug citation (plain-GitHub slug); (c) nav-hub link-table retrieval; (d) descriptive-filename citation-label quality (PIPE-04 / OQ1).
- RIDER — real shipped `RE-NNN` `Status: Approved` docs (not synthetic `RE-T*`). PASS = grounded answer + clickable document-level citation + no hallucination, across N queries spanning all 5 platforms.

**D-125-3 — Close skeleton + V115-pin placement: D1 pin rides Atom 2, 3-atom FLOOR + Wave-0 anchor** (resolves HARN-05/06/07 structure)
- V115 pin (HARN-05) rides Atom 2 with `check-phase-120..125` validators + the v1.16 CI workflow + BASELINE_20. `frozen-at-close` Vxx placement is per-milestone; the HARN-05/HARN-06 split is requirement granularity, not commit granularity.
- 3-commit skeleton as a FLOOR, not a ceiling: (Wave-0 pre-anchor) → Atom 1 (harness + allowlist + BASELINE_20 back-anchored to Wave-0 SHA) → Atom 2 (validators + V115 pin + CI workflow) → PUSH → [emergent remediation slot, 1+ commits only if GHA RED] → close-gate (single commit flipping all 14 reqs). v1.14's honest history was ~7 commits.
- Wave-0 pre-anchor commit BEFORE Atom 1 (BASELINE_20 back-anchor target + predecessor-byte-unchanged gate base). V115 = PAST v1.15 close SHA `29a3599`, never the close-gate SHA → no ordering circularity.

**D-125-4 — Cross-OS Axis-2: B1 GHA authoritative, scope WIDENED to the predecessor-workflow cascade** (resolves HARN-07)
- Push the close branch → the new `audit-harness-v1.16-integrity.yml` runs BOTH chain validators (apex + continuity) on `ubuntu-latest`; that GHA run's green is the authoritative Axis-2 result; Windows-local corroborates only (deep-nest timeout at the apex range).
- MANDATORY RIDER — repoint the Path-A `paths:` filter to `v1.16-*` / `v1.16-MILESTONE-AUDIT.md`; preserve `linux-chain-ubuntu-latest` (autocrlf-false + fetch-depth:0 + continue-on-error:false).
- MANDATORY RIDER — "authoritative green" spans the WHOLE predecessor-workflow cascade, not the v1.16 workflow alone. Scan the entire cascade for RED before the close-gate; a shared frozen-aware conversion greens every apex at once. **(See §"CORRECTION: cascade is 9 workflows, not 11" below — the intent holds, the count is refined.)**
- RIDER — B↔C↔D interlock: Atom-2 push FIRST (the `paths:` trigger); the close-gate necessarily post-dates the push and consumes the run ID.

**⚠ LOAD-BEARING GROUNDING CORRECTION — apex CHAIN_PHASES range**
- ROADMAP SC2, REQUIREMENTS HARN-06, AND STATE.md all literally say `CHAIN_PHASES=[48..119]`. This is a transcription error. The invariant is `[48..(closephase−1)]`; the apex = the CLOSE-phase validator.
- CORRECT v1.16 value: `check-phase-125` apex `CHAIN_PHASES = [48..124]` (**77 entries**). PLANNER ACTION: author `[48..124]`, and reconcile / correct the SC + REQUIREMENTS + STATE text at plan time. Do NOT copy the literal `[48..119]`.

### Claude's Discretion (resolve at plan time)
- Exact plan count / plan-to-commit mapping within the D1 skeleton.
- Exact composition of the representative `.docx` set (which specific `RE-NNN` Approved docs per platform/class), subject to the D-125-2 retargeted riders.
- Exact `PIPE-02-CLOSE-RUNBOOK.md` query list (N queries), inheriting the Phase-113/119 runbook shape.
- Whether to run an optional local corroborating Linux (WSL/Docker) chain pass before the authoritative GHA push.

### Deferred Ideas (OUT OF SCOPE)
- **V116 pin** (freezing the v1.16 corpus) → v1.17 (pins back-anchor from the NEXT milestone).
- **`FROZEN-AWARE-ADOPTION-SWEEP-01`** — proactive whole-repo conversion of ALL predecessor readers → deferred v1.17+ (this phase does triggered-only remediation).
- **O(n²) Windows-runner rewrite** (`WINDOWS-CLONE-DEEPNEST-TIMEOUT-01` fix) — out of scope; Windows stays corroborating-only.
- **Programmatic Copilot Studio access** — out of scope; PIPE-02 stays owner-run.
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| **HARN-05** | V115 back-anchor pin: `V115: '29a3599'` + `readAtV115Close` export in `frozen-at-close.mjs`, freezing the v1.15 corpus | §1 gives the exact map entry + export line + dated comment; SHA positively confirmed (message carries both "MILESTONE-AUDIT" and "MILESTONE CLOSE") |
| **HARN-06** | 14th Path-A lineage bump: `v1.16-milestone-audit.mjs` + `v1.16-audit-allowlist.json` + BASELINE_20 + `check-phase-120..125.mjs` + v1.16 CI workflow; predecessor surfaces byte-unchanged; triggered frozen-aware conversion | §2 gives every copy-source→target string-sub; §3 gives the apex range `[48..124]`/77; §4 gives the drift-scope set + the dominant ABAUDIT/C15 shape |
| **HARN-07** | 3-axis terminal re-audit + PIPE-02 grounding confirmation, single close-gate flipping all 14 reqs | §5 gives the 3 axes, the cascade correction, the retargeted PIPE-02 probes + RE-NNN candidates; §6 gives the 14-req flip list |
</phase_requirements>

---

## 1. HARN-05 — The V115 Pin (exact diff)

**SHA confirmed:** `V115 = 29a3599` (`29a3599236fa9724404d1ee95227ab5679ac9d83`). [VERIFIED: `git log --all --grep="MILESTONE-AUDIT" --grep="MILESTONE CLOSE" --all-match -1` returns exactly this SHA; `git log -1 --format=%s 29a3599` = `docs(119-07): Phase 119 close-gate — v1.15 MILESTONE-AUDIT + DEFERRED-CLEANUP + 4-doc traceability + v1.15 MILESTONE CLOSE` — contains BOTH required tokens. Dated `2026-07-06 23:44:48 -0500`.]

This is the **exact positive-confirmation method** Plan 119-01 mandated for V114 (STATE: "the SAME positive-confirmation method must be used to recover V115 at Phase 125"). The naive `--grep` can return a follow-up SUMMARY commit — 119-01 recorded that `f3959c8` was the wrong V114 follow-up. **Verify the recovered SHA's message carries BOTH tokens before pinning.** Here `29a3599` passes cleanly.

**File:** `scripts/validation/_lib/frozen-at-close.mjs`

**Edit A — add the map entry.** Insert **after** the `V114: '7d922a7'` block (currently lines 56–61, ends `...this phase adds only the v1.14 close pin).`) and **before** the `// V14 omitted` comment (line 62). Mirror V114's comment shape exactly:

```js
  V115: '29a3599',  // Phase 119 Plan 119-07 close-gate — v1.15 milestone close-gate; atom == close-gate.
                    // Message contains both "MILESTONE-AUDIT" and "MILESTONE CLOSE" (confirmed via
                    // `git log -1 --format=%s 29a3599`). Do NOT pin a SUMMARY follow-up (the V114
                    // f3959c8 trap). Single entry — same single-entry pattern as V18..V114 (back-anchor
                    // invariant: V115 references a PAST close SHA; the V116 pin is deferred to v1.17 per
                    // the back-anchor rule — this phase adds only the v1.15 close pin).
```

**Edit B — add the convenience export.** Insert **after** the `readAtV114Close` line (currently line 98, the last export):

```js
export const readAtV115Close      = (p) => readAtClose('V115',         p);
```

**Placement (D-125-1 dependency):** both edits ride **Atom 2** (per D-125-3), NOT Atom 1. The helper must exist before any emergent-slot `readAtV115Close` conversion (which lands in the Wave-5 remediation slot, after the Atom-2 push). Since Atom 2 is pushed before the slot fires, the ordering is naturally satisfied. `[VERIFIED: frozen-at-close.mjs read this session — map ends V114 at line 56, exports end readAtV114Close at line 98]`

---

## 2. HARN-06 — The Lineage-Bump Copy-Source Diffs

### 2a. `v1.15-milestone-audit.mjs` → `v1.16-milestone-audit.mjs`

**Copy-source:** `scripts/validation/v1.15-milestone-audit.mjs` (Path-A; C1–C17 inherited verbatim, **C17 already folded in** at v1.15 Phase 119 via subprocess-spawn of `c17-eee-contract.mjs` — no re-fold needed). String substitutions:

| Line(s) | Current | Repoint to |
|---------|---------|------------|
| 2 (lineage banner) | `...→ v1.14 → v1.15; C1-C16 inherited verbatim from v1.14` | append `→ v1.16`; "inherited verbatim from **v1.15**" |
| 3 (source-of-truth) | `.planning/phases/119-.../119-CONTEXT.md (D-119-1..D-119-4)` | `.planning/phases/125-.../125-CONTEXT.md (D-125-1..D-125-4)` |
| 4 (sidecar ref, prose) | `scripts/validation/v1.15-audit-allowlist.json` + the C2/C7/C9 repoint note | `v1.16-audit-allowlist.json`; **drop the "line-pins repointed per Phase-118 EEE-retrofit drift" note** — see §2b (no repoint expected) |
| 5 (frozen anchor) | `v1.6-milestone-audit.mjs pinned at Phase 66 close` | **BYTE-UNCHANGED** (predecessor anchor stays) |
| 34 (C17 comment) | `FOLDED IN Phase 119 D-119` | leave as-is or note "inherited from v1.15" (cosmetic) |
| 36 (usage) | `node scripts/validation/v1.15-milestone-audit.mjs` | `v1.16-milestone-audit.mjs` |
| 82 (parseAllowlist body) | `readFile('scripts/validation/v1.15-audit-allowlist.json')` | `v1.16-audit-allowlist.json` |

**The one functional string that MUST change** is line 82 (`parseAllowlist` reads the sidecar) — the workflow's `path-match` job greps `v1.16-milestone-audit.mjs` for the literal `scripts/validation/v1.16-audit-allowlist.json` (see §2d). All other `v1.15` occurrences are comments/banners. `[VERIFIED: file head + parseAllowlist read this session]`

### 2b. `v1.15-audit-allowlist.json` → `v1.16-audit-allowlist.json`

**Copy verbatim.** The C2/C7/C9 `{file, line}` pins target: `docs/reference/android-capability-matrix.md`, `docs/admin-setup-android/03-fully-managed-cobo.md`, `docs/l2-runbooks/20-android-app-install-investigation.md`, `docs/admin-setup-android/07-knox-mobile-enrollment.md`, `docs/admin-setup-android/02-zero-touch-portal.md`.

**KEY DIFFERENCE FROM v1.15:** In v1.15, Phases 116–118 retrofitted those **exact** reference/admin files, so the sidecar pins had to be repointed (119-01 found harness RED 11/4/0 on HEAD). In v1.16, the retrofit (Phases 121–123) touched glossaries / decision-trees / lifecycle / nav-hubs — **NOT** those five pinned files. `[VERIFIED: git log 29a3599..HEAD -- <each file> = 0 commits for all five]` They are byte-unchanged since v1.15 close → **the sidecar copies verbatim, no line-pin repoint expected.**

**Still run the plan-time reconnaissance** (mirror 119-01's "harness on HEAD" step) to CONFIRM byte-unchanged rather than assume it — but the expectation is a clean verbatim copy. If it comes back green on HEAD, no sidecar edit is needed at all.

### 2c. BASELINE_20 freshness comment in `regenerate-supervision-pins.mjs`

**Insert after the BASELINE_19 comment block** (currently lines 474–482, ending `...-> v1.14 -> BASELINE_18 -> v1.15 -> BASELINE_19).`), immediately before `const BASELINE_9 = [` (line 483). Mirror BASELINE_19's 6-line shape exactly:

```js
// BASELINE_20 refreshed <DATE> (Phase 125 Plan 125-0X): closes BASELINE_19 v1.15 carry-over
// per HARN-06 contract (REQUIREMENTS.md + ROADMAP.md Phase 125 SC#1); v1.16 line positions
// verified against HEAD <WAVE-0-SHA> (JIT pre-Atom-1 HEAD -- captured via `git rev-parse HEAD`
// immediately before authoring Atom 1).
// BASELINE_9 entries above remain unchanged -- Phase 125 does NOT alter the line-coord array;
// this comment records the audit-trail event that line-positions were re-verified at Phase 125
// close and remain valid for the v1.16 corpus. Resolution path: BASELINE_21 will refresh at
// the next milestone close per the Path-A inheritance pattern (... -> v1.15 -> BASELINE_19 -> v1.16 -> BASELINE_20).
```

**The back-anchor HEAD `<WAVE-0-SHA>` is unknown until execution** (it is the Wave-0 / pre-Atom-1 HEAD). **⚠ Pitfall 4:** 119-02 back-anchored BASELINE_19 to `a323332` — the **JIT pre-Atom-1 HEAD**, which DIFFERED from the Wave-0 anchor `c6ea8d2` because an automated Jira-sync commit landed between Wave-0 and Atom 1. Capture the SHA with `git rev-parse HEAD` **immediately before** authoring Atom 1, NOT the earlier Wave-0 anchor. `[VERIFIED: BASELINE_19 block read this session, lines 474–482]`

### 2d. `audit-harness-v1.15-integrity.yml` → `audit-harness-v1.16-integrity.yml`

**Copy-source:** `.github/workflows/audit-harness-v1.15-integrity.yml` (13th coexistence workflow). Repoints:

| Element | Current | Repoint to |
|---------|---------|------------|
| `name:` (line 15) | `Audit Harness v1.15 Integrity` | `Audit Harness v1.16 Integrity` |
| header comment (1–13) | "12th coexistence workflow"; "check-phase-113..119"; "spawns 48..118" | "13th"; "check-phase-120..125"; "spawns 48..124" |
| **`paths:` filter (19–25)** | `scripts/validation/v1.15-*`, `.../v1.15-MILESTONE-AUDIT.md`, `.../v1.15-DEFERRED-CLEANUP.md`, `.../audit-harness-v1.15-integrity.yml` | all `v1.15`→`v1.16` (**MANDATORY — else the workflow never fires**) |
| `paths:` — `check-phase-*.mjs` (21) | `scripts/validation/check-phase-*.mjs` | **BYTE-UNCHANGED** (this is what fires the cascade) |
| parse job (39–48) | validates `v1.15-audit-allowlist.json`, message `v1.15 sidecar OK` | `v1.16-audit-allowlist.json` |
| path-match job (59) | greps `v1.16... audit-allowlist.json in v1.15-milestone-audit.mjs` | both → `v1.16` |
| harness-run job (74–75) | `node scripts/validation/v1.15-milestone-audit.mjs --verbose` | `v1.16-milestone-audit.mjs` |
| `linux-chain-ubuntu-latest` (90–95) | `check-phase-119.mjs (recursively spawns 48..118)`; `::notice ... [48..118]` | `check-phase-125.mjs (recursively spawns 48..124)`; `[48..124]` |
| per-phase jobs (97–193) | `check-phase-113`…`check-phase-118` leaves + `check-phase-119` apex | replace with `check-phase-120`…`check-phase-124` leaves + `check-phase-125` apex |
| DUAL-APEX note (11–13) | "check-phase-119 AND linux-chain-ubuntu-latest BOTH run 48..118" | "check-phase-125 ... 48..124" |

**PRESERVE VERBATIM** (Phase 69 inheritance contracts — do NOT touch): `linux-chain-ubuntu-latest` `core.autocrlf false` (LF-fidelity), `fetch-depth: 0` (FETCH-DEPTH-01), `continue-on-error: false` (D-A9 PR-blocking), `timeout-minutes: 30`, the `CHAIN_TIMING_LINUX ::notice` emission, the 2 crons, `rotting-external-quarterly`, `pin-helper-advisory` (advisory, `continue-on-error: true`). **Do NOT add `CHECK_PHASE_NESTED=1` to either top-level GHA apex invocation** (dual-apex is intentional and audited). `[VERIFIED: full workflow read this session, 246 lines]`

---

## 3. Apex Range — The Load-Bearing Convention (VERIFIED)

**Source of the convention:** `scripts/validation/check-phase-119.mjs`. `[VERIFIED: full file read this session]`

**The v1.15 apex declares (lines 57–60):**
```js
const CHAIN_PHASES = [48,49,...,118];  // 71 entries: integers 48..118 inclusive
```
**with a fail-loud module-load throw (lines 68–73):**
```js
if (CHAIN_PHASES.length !== 71) { throw ... '!== 71 (integers 48..118 inclusive)'; }
if (CHAIN_PHASES[0] !== 48 || CHAIN_PHASES[CHAIN_PHASES.length - 1] !== 118) { throw ...; }
```
**and `CHAIN_SKIP = new Set([])` (line 64)** with V-119-SELF hard-asserting `!includes(119)` AND `CHAIN_SKIP.size === 0` (lines 165–178).

**The invariant, stated in the file's own header (lines 11–15):** "the chain array spans 48..118 (NOT 48..119)… apex excludes its own phase… Authoring 48..119 would include phase 119 itself, tripping V-119-SELF self-reference FAIL." This is `[48..(closephase−1)]`.

**Per-phase (continuity) validators 113–118** carry `CHAIN_PHASES = []` (they are leaves; only the apex carries the range). `[VERIFIED via 119-03 SUMMARY in STATE: "check-phase-113..118 leaves (CHAIN_PHASES=[], CHAIN_SKIP empty)"]`

### Correct v1.16 values (locked by the invariant — NOT a gray area)

| Validator | Role | CHAIN_PHASES | Length throw | Terminus throw | CHAIN_SKIP | SELF assertion |
|-----------|------|--------------|--------------|----------------|------------|----------------|
| `check-phase-120` | leaf (continuity) | `[]` | n/a | n/a | `new Set([])` | — |
| `check-phase-121` | leaf | `[]` | n/a | n/a | `new Set([])` | — |
| `check-phase-122` | leaf | `[]` | n/a | n/a | `new Set([])` | — |
| `check-phase-123` | leaf | `[]` | n/a | n/a | `new Set([])` | — |
| `check-phase-124` | leaf | `[]` | n/a | n/a | `new Set([])` | — |
| **`check-phase-125`** | **apex** | **`[48..124]` (77 entries)** | `length !== 77` | `[0]!==48 \|\| last!==124` | `new Set([])` | `!includes(125)` AND `size===0` |

**77 = 124 − 48 + 1.** `[VERIFIED: arithmetic + invariant]` The apex `HARNESS` const = `'scripts/validation/v1.16-milestone-audit.mjs'`; V-125-AUDIT needles `125-VERIFICATION.md` for "Phase 125" (SKIP-PASS until the close-gate authors it).

**⚠ THE TRANSCRIPTION ERROR:** ROADMAP SC2, REQUIREMENTS HARN-06 (L44), **and STATE.md** all say `CHAIN_PHASES=[48..119]`. `[VERIFIED: grepped all three]` The literal `[48..119]` is wrong two ways: it (a) is 72 entries terminating at 119, which fails a `!== 77` / terminus-124 throw, and (b) would exclude v1.16's own chained phases 120–124. **PLANNER: author `[48..124]` and correct the SC/REQUIREMENTS/STATE text at plan time.** Flag it in the plan; do not silently propagate `[48..119]`.

### Validator-atom deferral note (do NOT miss check-phase-120)

`check-phase-120.mjs` was **deliberately NOT authored** in Phase 120 (STATE: "validator-atom deferral to Phase 125/HARN-06"). `[VERIFIED: file absent on disk]` So Phase 125 authors **6 new validators**: five leaves `check-phase-120..124` (needle-specs handed off from each phase's VERIFICATION.md) + the apex `check-phase-125`. This follows the v1.13 "validator-atom deferral" convention where content phases hand off a needle-spec only and the closing phase authors the validators.

---

## 4. flag-#6 SCOPING — The Predecessor Drift Set (DOMINANT DELIVERABLE)

This is a **plan-time SCOPE**, not a pre-commit conversion list. Per D-125-1, the FULL predecessor chain is run at PLAN time to discover which validators actually drift on the retrofitted corpus; **only what actually trips** is converted/exempted in the Wave-5 emergent slot. The table below is the **candidate surface** the scoping run must exercise — it is NOT a pre-authorized conversion list (that would be the out-of-scope sweep).

### 4a. Reader-drift candidates (predecessor validators reading retrofitted structural docs)

Retrofitted paths (Phases 121/122/123): `docs/_glossary*.md`, `docs/decision-trees/*`, the 22 lifecycle files (`docs/lifecycle/`, `lifecycle-apv2/`, `{android,ios,macos,linux}-lifecycle/`), and the 4 nav-hubs (`docs/index.md`, `common-issues.md`, `quick-ref-l1.md`, `quick-ref-l2.md`).

| Validator | Reads (structural paths) | Read mode | Drift-likelihood |
|-----------|--------------------------|-----------|------------------|
| `check-phase-30` | `decision-trees/07-ios-triage.md`, `00-initial-triage.md` | **live** `readFile` | LOW — existence + region checks; retrofit preserved headings |
| `check-phase-49` | `_glossary-linux.md`, `_glossary.md`, `_glossary-macos.md`, `_glossary-android.md`, `linux-lifecycle/00,01` | **live** (imports frozen-at-close but uses it elsewhere) | MED — reciprocal-link + H2-category assertions; links preserved (RETRO-04) but verify |
| `check-phase-50` | admin-agent doc | **frozen** `readAtV114Close` | NONE — already frozen-aware |
| `check-phase-51` | `decision-trees/09,00`, `_glossary-linux.md` anchor links | **live** | MED — asserts `../_glossary-linux.md#<anchor>` links; anchor slugs preserved per RETRO-04 but confirm |
| `check-phase-52` | RB24 (frozen) + `_glossary-linux.md` anchor | **mixed** (V-52-18 live anchor scan) | MED — anchor-link presence; slugs preserved |
| `check-phase-54` | `operations/patch-management/03-ios-update-lifecycle.md` | **live** | NONE — that path is a SEPARATELY-DEFERRED lifecycle class (excluded from RETRO-07 per D-08); byte-unchanged |
| `check-phase-55` | `operations/app-lifecycle/*` | **live** | NONE — `operations/app-lifecycle/` excluded from RETRO-07 (D-08); byte-unchanged |
| `check-phase-57` | `index.md`, `common-issues.md`, `quick-ref-l1/l2.md` | **mixed** (V-57-06 row-counts frozen `readAtV15Close`; existence/H2/anchor checks live) | MED — many live H2/anchor/literal scans on all 4 nav-hubs; retrofit is reformat-only + navigation-last-preserved, but this is the widest nav-hub reader |
| `check-phase-59` | `index.md`, `quick-ref-l1/l2.md`, all glossaries | **mixed** (V-59-07 row-counts + V-59-24 blockquote-integrity frozen; H2/ordering/negative-token scans live) | MED-HIGH — V-59-32 "existing H2 literals preserved" + V-59-10 ordering + NEGATIVE no-TBD scans run live across all 4 hubs + glossaries; EEE added a `## Summary` H2 — verify ordering/region scans still hold |
| `check-phase-62` | `_glossary-apple-business.md` + 4 glossaries (reciprocal banners, inline see-also) | **live** | MED — banner/see-also presence on retrofitted glossaries; preserved but verify |
| `check-phase-63` | `apple-business/09,10-lifecycle.md` | **live** | NONE — apple-business `*-lifecycle.md` excluded from RETRO-07 (D-08); byte-unchanged |
| `check-phase-65` | `common-issues.md`, `quick-ref-l1/l2.md`, `index.md` (H2 presence); L2_26 frozen | **mixed** | MED — H2-title presence (e.g. "## Apple Business Quick Reference", C16 slug load-bearing) on retrofitted nav-hubs |
| `check-phase-67` | `_glossary-macos.md` (line-pinned {path,line:64}) | **live** | MED-HIGH — a `{path, line}` pin into a retrofitted glossary; EEE reflow may shift line 64 |
| `check-phase-101` | `_glossary-android.md` (802.1X banner at line 14), `_glossary-network.md` | **live** | MED-HIGH — banner "landed at line 14"; EEE header block + Summary-first reflow likely moved it |
| `check-phase-108` | `decision-trees/10-8021x-triage.md` | **live** | LOW — existence + non-empty |
| `check-phase-109` | `quick-ref-l1.md` (802.1X nav-hub entry literal) | **live** | MED — exact nav-hub entry string; navigation-last preserved but literal-match is brittle |
| `check-phase-110` | `index.md`, `quick-ref-l1.md`, `common-issues.md`, `ios-lifecycle/02`, `macos-lifecycle/02` | **live** | MED-HIGH — POST-fix fragment/phrase scans across nav-hubs AND two retrofitted lifecycle files |

**Reading the table:** "live" readers are the drift candidates; "frozen" (`readAtVxxClose`) readers are immune. The **drift trigger** is a live assertion targeting something the retrofit CHANGED. Because Phases 121–123 were **reformat-only with explicit preservation guarantees** (RETRO-04 "anchor slugs not broken"; RETRO-06 "routing/link tables remain accurate"; navigation-last), the majority of anchor/link/heading-presence checks should still PASS. The genuine risk concentrates in: **`{path, line}` pins** into retrofitted docs (67, 101 — line coords shift under EEE reflow) and **exact-literal fragment scans** (109, 110). These are the first candidates the scoping run will surface; if any trip, the fix is `readAtV115Close` conversion of that one assertion (shape #1) — NOT a value-mask, NOT a sweep.

### 4b. The DOMINANT shape — C15 ABAUDIT recurrence (un-pre-convertible)

The naive read emphasizes reader-conversion (§4a), but **the actual dominant v1.15 emergent RED was a C15 anti-pattern trip** (commit `ad583fd`, GHA run `28823233887`), remediated by an ABAUDIT exemption comment — "NO predecessor validator edited." Here is the verified mechanism and why it recurs in v1.16:

**C15 mechanism** (`v1.15-milestone-audit.mjs`, check id 15, lines 713–758): `[VERIFIED: read this session]`
- Scans `appleBusinessDocPaths()` = `docs/_glossary-apple-business.md` + all `docs/cross-platform/apple-business/**` + `docs/admin-setup-macos/01-abm-configuration.md` + `docs/admin-setup-ios/02-abm-token.md`.
- Applies 8 banned-phrase regexes **line-by-line** (`rx.test(ln)`). Regex 7 is `/\bManaged\s+Apple\s+ID\b(?!.{0,160}(Microsoft Intune|...|rebrand|renamed|...|Apple\s+Business|...))/i` — a **negative-lookahead exempting window of 160 chars on the SAME line**.
- **Exemption:** a line matching `<!-- ABAUDIT-\d+: ... -->` exempts **that comment line AND the next line** (`allowlist.add(i); allowlist.add(i+1)`).

**Why it recurs (the v1.16 vector):** `_glossary-apple-business.md` (**RE-180**) is BOTH a glossary retrofitted in **Phase 121 (RETRO-04)** AND in the C15 scan scope. `[VERIFIED: it's in appleBusinessDocPaths + is registry RE-180 Approved]` The v1.15 RED was caused by an EEE **`#12` blockquote split** isolating a sentence outside its exempting-context window. Phases 121/122/123 applied the **same `#12` blockquote-split transform** extensively (STATE records 26+ splits in Phase 121 alone). A `#12` split that puts "Managed Apple ID" on its own line — pushing the exempting token (`Apple Business`, `ABM`, `rebrand`, …) more than 160 chars away or onto a different line — **newly trips regex 7**, because C15 matches per-line.

**This is un-pre-convertible.** It only surfaces on the assembled-corpus harness scan (the GHA apex run) — you cannot know at Atom-2-authoring time which split isolated which sentence. Hence the emergent slot (C1) is the risk-correct posture.

**Structural retrofit docs carry ZERO ABAUDIT comments today.** `[VERIFIED: grep "ABAUDIT-" across docs/_glossary*.md, decision-trees/, all lifecycle dirs, index.md, common-issues.md, quick-ref-l1/l2.md = 0 matches. The only ABAUDIT comments in the repo are in apple-business/admin-setup docs: abm-token.md, abm-configuration.md, apple-business/00,11,12,13,18.]` So if `_glossary-apple-business.md` trips C15, the fix is a **new** `<!-- ABAUDIT-NN: <reason> -->` comment on the tripping line inside that v1.16-retrofitted doc — explicitly ALLOWED by D-125-1 (this-milestone surface, not a predecessor frozen doc). Same class applies to C11 (ops-domain anti-pattern regex, id 11) if a split isolates an ops-domain phrase, though C11's scope is broader — watch it too.

**Note also C11/C13/C16** are line-oriented or link-oriented harness checks; a `#12` reflow theoretically perturbs them, but C15 regex 7 is the empirically-proven vector. Prioritize C15 in the scoping run.

---

## 5. HARN-07 — 3-Axis Re-Audit + PIPE-02

### 5a. The 3 axes + EXACT-MATCH gate

| Axis | Definition | Authority |
|------|-----------|-----------|
| **Axis 1** | Fresh `git clone --no-hardlinks` of the close branch, run the chain | Corroborating |
| **Axis 2** | Cross-OS Linux **GHA** run of `audit-harness-v1.16-integrity.yml` — BOTH chain validators (apex `check-phase-125` recursion 48..124 via `linux-chain-ubuntu-latest` + standalone per-phase jobs) on `ubuntu-latest` | **AUTHORITATIVE** (Windows deep-nests at [48..124]) |
| **Axis 3** | Fresh zero-context sub-agent runs the chain | Corroborating |

**Gate:** cross-OS **PASS/FAIL/SKIP EXACT MATCH** across axes. The close-gate consumes the authoritative GHA run ID (push-before-close-gate is load-bearing per the B↔C↔D interlock). `[VERIFIED against 119 pattern: STATE "119-04 consumes run 28823233887"]`

### 5b. ⚠ CORRECTION: the predecessor-workflow cascade is **9 workflows, not 11**

D-125-4 states "all 11 versioned predecessor integrity workflows (v1.5–v1.15) carry `paths: - 'scripts/validation/check-phase-*.mjs'`." **This is inaccurate.** `[VERIFIED this session: per-workflow grep]`

- **11 versioned integrity workflows exist** (v1.5, v1.6, v1.7, v1.8, v1.9, v1.10, v1.11, v1.12, v1.13, v1.14, v1.15).
- **Only 9 carry `check-phase-*.mjs` in their `paths:` filter** (v1.7–v1.15). These **fire on the close PR** because Phase 125 authors `check-phase-120..125.mjs`.
- **v1.5 and v1.6 do NOT** carry `check-phase-*.mjs`. They filter doc-path globs + their own `v1.5-*`/`v1.6-*` + their own workflow file. `[VERIFIED: v1.5 paths = linux-lifecycle/**, _glossary-linux.md, operations/**, …; v1.6 paths = cross-platform/apple-business/**, common-issues.md, quick-ref-l1.md, …]` Since the retrofit docs were committed in **Phases 121–123 (already on master)**, they are NOT in the close-PR diff → **v1.5/v1.6 workflows do NOT fire on the close PR.**

**Why the intent still holds (and why it still matters):** even though v1.5/v1.6 *workflows* don't fire, the v1.5/v1.6-era *validators* (`check-phase-48..66`, which read structural docs live — §4a) are **still exercised against retrofitted HEAD** via **apex recursion**: both the new `check-phase-125` apex AND each of the 9 firing predecessor apexes (v1.7's `check-phase-70`, … v1.15's `check-phase-119`) recursively spawn their full `48..(N-1)` ranges. So a drifting v1.5-era validator (e.g. `check-phase-62` on `_glossary-apple-business.md`) **will** turn its containing apex RED — the drift surfaces through recursion, not through direct doc-glob firing.

**PLANNER ACTION:** scan the **9 firing workflows** (v1.7–v1.15 integrity + the new v1.16) for RED, understanding that the 48..66 range is covered by recursion within them. A shared frozen-aware conversion / ABAUDIT exemption greens every recursion at once (the fix is idempotent across apexes). Correct the "11" claim to "9 fire; 48..66 covered by apex recursion" in the plan.

### 5c. PIPE-02 retargeted probes + RE-NNN candidates

Agent prepares `.docx` set + `PIPE-02-CLOSE-RUNBOOK.md` (fork the 119 `PIPE-02-CLOSE-RUNBOOK.md` shape — upload → reindex-wait → Q1..Qn → record; PASS = grounded answer + clickable document-level citation + no hallucination). Owner executes in Copilot Studio, records `PIPE-02-CLOSE-FINDINGS.md` (raw transcript in-repo, per the T-119-06-ASSERTED / D-119-1 rider). **autonomous: false** checkpoint. Retargeted probes (D-125-2), with real Approved `RE-NNN` from `docs/_registry/RE-index.md`: `[VERIFIED: registry rows read this session]`

| Probe (D-125-2 rider) | Tests | Candidate RE-NNN (Approved) |
|-----------------------|-------|------------------------------|
| (a) decision-tree Mermaid→text-equiv, every leaf citable | STD-04 / RETRO-05/08 | **RE-217** `decision-trees/10-8021x-triage.md` (the STD-04-cited exemplar, LOCKED-11), RE-215 `08-android-triage`, RE-207 `00-initial-triage` |
| (b) glossary definition-list anchor-slug citation (plain-GitHub slug) | RETRO-04 | **RE-180** `_glossary-apple-business.md`, RE-182 `_glossary-macos.md`, RE-181 `_glossary-linux.md` (watch the double-hyphen slug trap — memory `reference_glossary_anchor_slugs`) |
| (c) nav-hub link-table retrieval | RETRO-06 | **RE-219** `index.md`, RE-218 `common-issues.md`, RE-220/221 `quick-ref-l1/l2.md` |
| (d) descriptive-filename citation-label quality | PIPE-04 / OQ1 | any doc with a descriptive output name from `filename-map.md` (Phase 124 PIPE-04 deliverable) |

**5-platform coverage** (real Approved rows): Windows `_glossary.md` RE-184 / `lifecycle/*` RE-192..197; macOS `_glossary-macos.md` RE-182 / `macos-lifecycle/*` RE-204..206; iOS `ios-lifecycle/*` RE-189..191; Android `_glossary-android.md` RE-179 / `android-lifecycle/*` RE-185..188; Linux `_glossary-linux.md` RE-181 / `linux-lifecycle/*` RE-202..203. **Do NOT** re-run v1.15's RETRO-03 wide-matrix (RE-143) or RETRO-02 Linux-admin (RE-129) riders — those test surfaces v1.16 never touched.

**The PIPE-02 leg is the ONE close-gate leg no re-audit axis can reproduce** (no Copilot access) → asserted, not verified; the in-repo transcript is its audit artifact.

---

## 6. Plan / Commit Skeleton (mirror 119's seven plans)

**119's actual structure** `[VERIFIED: 119-0X-PLAN.md frontmatter read this session]`:

| Plan | Wave | autonomous | Reqs | Role |
|------|------|-----------|------|------|
| 119-01 | 1 | true | HARN-02/03 | Wave-0 pre-anchor + baseline reconnaissance (SHA anchors, V-pin positive-confirm, harness-on-HEAD) |
| 119-02 | 2 | true | HARN-03 | Atom 1 (one indivisible commit: harness + allowlist + BASELINE) |
| 119-03 | 3 | true | HARN-02/03 | Atom 2 (one indivisible commit: validators + V-pin + CI workflow) → PUSH |
| 119-04 | 4 | true | HARN-02/04 | Axis-2 consumption / re-audit / cross-OS EXACT MATCH |
| 119-05 | 5 | true | HARN-02 | Emergent remediation slot (the ABAUDIT/C15 `ad583fd` fix) |
| 119-06 | 5 | **false** | HARN-04 | PIPE-02 owner-run (agent prepares, owner executes) |
| 119-07 | 6 | true | HARN-04 | Close-gate (single commit flips all 16 reqs) |

**Recommended v1.16 mapping** (D1 skeleton; FLOOR not ceiling — real history may add remediation commits):

| Plan | Wave | autonomous | Reqs | Role |
|------|------|-----------|------|------|
| 125-01 | 1 | true | HARN-05/06 | Wave-0 pre-anchor + **flag-#6 full-chain scoping run** + V115 positive-confirm (`29a3599`) + harness-on-HEAD baseline (expect green — sidecar verbatim) |
| 125-02 | 2 | true | HARN-06 | Atom 1: `v1.16-milestone-audit.mjs` + `v1.16-audit-allowlist.json` (verbatim copy) + BASELINE_20 (JIT-anchored) |
| 125-03 | 3 | true | HARN-05/06 | Atom 2: `check-phase-120..124` leaves + `check-phase-125` apex `[48..124]` + `frozen-at-close` V115 pin + `readAtV115Close` + `audit-harness-v1.16-integrity.yml` → PUSH |
| 125-04 | 4 | true | HARN-06/07 | Axis-2 consumption: fresh clone + GHA run-ID + zero-context sub-agent + cross-OS EXACT MATCH + **9-workflow cascade RED scan** |
| 125-05 | 5 | true | HARN-06 | Emergent remediation slot — **only if GHA RED** (dominant: ABAUDIT/C15 on `_glossary-apple-business.md`; or `readAtV115Close` conversion; or nested-guard) |
| 125-06 | 5 | **false** | HARN-07 | PIPE-02 owner-run (retargeted probes §5c) |
| 125-07 | 6 | true | HARN-07 | Close-gate: single commit flips all **14** reqs + `v1.16-MILESTONE-AUDIT.md` + `v1.16-DEFERRED-CLEANUP.md` + 4-doc traceability |

**The 14 v1.16 requirements flipped at the close-gate** `[VERIFIED against REQUIREMENTS.md traceability table — 14 total, 100% coverage]`:
`STD-04`, `HYG-01`, `RETRO-04`, `RETRO-05`, `RETRO-06`, `RETRO-07`, `RETRO-08`, `RETRO-09`, `PIPE-03`, `PIPE-04`, `PIPE-05`, `HARN-05`, `HARN-06`, `HARN-07`.
(= 1 STD + 1 HYG + 6 RETRO + 3 PIPE + 3 HARN = 14. The CONTEXT's shorthand list "STD-04, HYG-01, RETRO-04/05/07/08/09, PIPE-03/04/05, HARN-05/06/07" **omits RETRO-06** — the correct set includes all six RETRO-04..09.)

Flip across all 4 traceability docs: `PROJECT.md` / `ROADMAP.md` / `STATE.md` / `REQUIREMENTS.md`. The close-gate SHA is never referenced by any pin (back-anchor invariant) → no ordering circularity.

---

## Don't Hand-Roll

| Problem | Don't build | Use instead | Why |
|---------|-------------|-------------|-----|
| Recover V115 SHA | `--grep` alone | Positive-confirmation (message has BOTH "MILESTONE-AUDIT" AND "MILESTONE CLOSE") | Naive grep returns SUMMARY follow-ups (the V114 `f3959c8` trap) |
| Milestone audit harness | New harness | Copy `v1.15-milestone-audit.mjs` verbatim, repoint strings | C1–C17 inherited; only the sidecar-ref string is functional |
| CI workflow | New YAML | Copy `audit-harness-v1.15-integrity.yml`, repoint `paths:` + job names | LF-fidelity/fetch-depth/PR-blocking contracts must be preserved verbatim |
| Frozen-aware reads | Inline `git show` | `readAtV115Close` from `_lib/frozen-at-close.mjs` | Centralized per v1.14 Phase 111; CRLF-normalized; hardened stdio |
| C15 false-positive fix | Edit the validator / bump expected value | `<!-- ABAUDIT-NN: reason -->` on the tripping line | Value-masking is the T1 self-disqualifier; ABAUDIT is the sanctioned mechanism |

**Key insight:** every artifact this phase produces already exists one milestone back. The work is *exact repoint*, not authoring — plus the emergent, un-pre-convertible C15/ABAUDIT remediation that only the assembled-corpus GHA scan can reveal.

---

## Common Pitfalls

### Pitfall 1: Copying the literal `[48..119]` apex range
**What goes wrong:** ROADMAP/REQUIREMENTS/STATE all say `[48..119]`; copying it fails `check-phase-125`'s `length !== 77` / terminus-124 throw at module load. **Avoid:** author `[48..124]` (77 entries); correct the docs at plan time.

### Pitfall 2: Back-anchoring BASELINE_20 to the Wave-0 SHA instead of the JIT pre-Atom-1 HEAD
**What goes wrong:** a Jira-sync (or any) commit can land between Wave-0 and Atom 1 (it did in v1.15: `c6ea8d2` vs `a323332`). **Avoid:** `git rev-parse HEAD` immediately before authoring Atom 1.

### Pitfall 3: Repointing the sidecar line-pins when they don't need it
**What goes wrong:** v1.15 had to repoint C2/C7/C9 pins (Phase 116–118 retouched those files); v1.16 did NOT (the five pinned files are byte-unchanged since v1.15 close). Blindly "repointing" would corrupt correct pins. **Avoid:** copy `v1.16-audit-allowlist.json` verbatim; confirm via harness-on-HEAD reconnaissance.

### Pitfall 4: Pre-converting the "~16 known readers" (the rejected C3)
**What goes wrong:** over-converts non-tripping readers (the out-of-scope sweep) and mis-targets the non-dominant surface. **Avoid:** the flag-#6 scoping run converts ONLY what actually trips; the dominant shape is C15/ABAUDIT, not reader-conversion.

### Pitfall 5: Missing check-phase-120
**What goes wrong:** `check-phase-120.mjs` was never authored (validator-atom deferral to Phase 125). Assuming it exists leaves a gap in the 48..124 chain → apex RED. **Avoid:** author 6 validators (120,121,122,123,124 leaves + 125 apex).

### Pitfall 6: Expecting v1.5/v1.6 workflows to fire on the close PR
**What goes wrong:** they filter doc-globs / `v1.5-*` / `v1.6-*`, none in the close-PR diff → they don't fire. Waiting for their green is a deadlock. **Avoid:** scan the 9 firing workflows (v1.7–v1.15 + v1.16); 48..66 is covered by apex recursion.

### Pitfall 7: Windows apex run
**What goes wrong:** `WINDOWS-CLONE-DEEPNEST-TIMEOUT-01` now at [48..124] (one deeper than v1.15). A local Windows recursive apex times out. **Avoid:** GHA (Linux) is authoritative; use `CHECK_PHASE_NESTED=1` for local NESTED enumeration only, never the top-level GHA apex.

---

## Runtime State Inventory

This is a harness/close phase, not a rename — but it does touch validator-runtime state. Explicit inventory:

| Category | Items Found | Action Required |
|----------|-------------|------------------|
| Stored data | None — no datastore keys involved | None (verified: harness reads git-tree + fs only) |
| Live service config | GitHub Actions workflows: authoring `check-phase-120..125.mjs` fires 9 versioned integrity workflows (v1.7–v1.15) + the new v1.16 on the close PR | Push Atom 2 first; consume the authoritative v1.16 GHA run ID at close-gate |
| OS-registered state | None | None |
| Secrets/env vars | `CHECK_PHASE_NESTED` (runtime flag, not a secret); no secret renames | None |
| Build artifacts | None — `.mjs` validators are not compiled; no egg-info/binaries | None |

**Frozen-SHA state:** `MILESTONE_CLOSE_SHAS` gains `V115: '29a3599'` — a git-tree back-anchor, immutable once pinned. No migration of existing pins (V141..V114 byte-unchanged).

---

## Environment Availability

| Dependency | Required by | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| `git` | SHA recovery, frozen reads, byte-unchanged gate | ✓ | (repo active) | — |
| `node` | all validators + harness | ✓ (assumed; used throughout project) | 20 (GHA pin) | — |
| GitHub Actions (ubuntu-latest) | **authoritative Axis-2** | ✓ | — | WSL2/Docker local = corroborating only (NOT authoritative) |
| Copilot Studio / SharePoint | PIPE-02 grounding | **✗ (agent)** / ✓ (owner) | — | Owner-run (REQUIREMENTS L76 out-of-scope for agent) |

**Missing with fallback:** Copilot access → owner-run PIPE-02 (locked by D-125-2). No blocking gaps.

*(Package Legitimacy Audit omitted — this phase installs no external packages; all tooling is in-repo `.mjs` + git + node builtins. The GHA `rotting-external-quarterly` job's `markdown-link-check@3.14.2` is inherited byte-unchanged, not newly added.)*

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | The plan-time flag-#6 scoping run + the authoritative GHA apex will surface the true drift set; §4a is candidates, not a conversion list | §4a | Low — the slot is emergent-by-design; over-listing here would BE the rejected C3 |
| A2 | `_glossary-apple-business.md` is the highest-probability C15 trip, but the EXACT tripping line is unknowable pre-scan | §4b | Low — un-pre-convertible by construction; the ABAUDIT mechanism handles whatever trips |
| A3 | The v1.16 sidecar copies verbatim (no pin repoint) because the 5 pinned files are byte-unchanged since v1.15 close | §2b | Low — VERIFIED 0 commits; plan-time harness-on-HEAD confirms |
| A4 | Nav-hub RE-218..221 and decision-tree RE-207..217 numbering is current for PIPE-02 candidate selection | §5c | Low — VERIFIED against RE-index.md this session |

**Note:** A1/A2 are *intentional* deferrals to the emergent slot (locked by D-125-1), not research gaps. Everything else in this document is VERIFIED or CITED against the live repo.

---

## Open Questions

1. **Exact BASELINE_20 back-anchor SHA** — unknowable until execution (the JIT pre-Atom-1 HEAD). *Recommendation:* capture with `git rev-parse HEAD` immediately before Atom 1; do not pre-fill.
2. **Whether any predecessor validator actually drifts** — determined by the plan-time flag-#6 chain run + the GHA apex. *Recommendation:* run the scoping chain in Wave 1 (delegate to a sub-agent — full chain ~5–9 min, background runs die at turn boundaries per `reference_chain_baseline_run_kill`); record the result to size the Wave-5 slot.
3. **Whether the harness is green on HEAD before Atom 1** — expected green (sidecar verbatim), unlike v1.15's 11/4/0 RED. *Recommendation:* confirm in Wave 1; if RED, the drift is in the §4a live-reader set and rides the emergent slot.

---

## Sources

### Primary (HIGH confidence — read this session)
- `scripts/validation/_lib/frozen-at-close.mjs` — MILESTONE_CLOSE_SHAS map (ends V114 L56), readAtVxxClose exports (end L98)
- `scripts/validation/check-phase-119.mjs` — apex `[48..118]`/71-entry convention, hard throws (L68–73), V-119-SELF dual-invariant (L165–178)
- `scripts/validation/v1.15-milestone-audit.mjs` — head + parseAllowlist (L82) + C15/ABAUDIT mechanism (L713–758) + appleBusinessDocPaths (L93–117)
- `.github/workflows/audit-harness-v1.15-integrity.yml` — full 246-line workflow (paths, jobs, linux-chain contracts)
- `scripts/validation/regenerate-supervision-pins.mjs` — BASELINE_18/19 comment blocks (L462–482)
- `.planning/milestones/v1.15-phases/119-.../119-CONTEXT.md` + `119-0[1-7]-PLAN.md` frontmatter + `PIPE-02-CLOSE-RUNBOOK.md`
- `docs/_registry/RE-index.md` — structural Approved rows (RE-179..221)
- `git log` positive-confirmation of `29a3599` (V115); `git log 29a3599..HEAD --` on 5 sidecar-pinned files (0 commits each); per-workflow `paths:` grep (9/11 fire)

### Secondary (repo docs)
- `.planning/phases/125-.../125-CONTEXT.md` (D-125-1..4 + apex-range correction) — the locked decisions
- `.planning/REQUIREMENTS.md` (HARN-05/06/07, L44/L56/L76/L78) + traceability (14 reqs)
- `.planning/STATE.md` (v1.16 state, 119-0X execution decisions, validator-atom deferral note)

---

## Metadata

**Confidence breakdown:**
- V115 pin / SHA recovery: **HIGH** — positively confirmed both tokens in `29a3599`
- Copy-source diffs (harness/sidecar/workflow/BASELINE): **HIGH** — every source file read this session
- Apex range `[48..124]`/77: **HIGH** — invariant + throw verified in `check-phase-119.mjs`; arithmetic confirmed
- Drift-scope candidates (§4a): **MEDIUM** — enumerated from grep + read-mode inspection; actual drift is plan-time/GHA-determined by design
- C15/ABAUDIT dominant shape (§4b): **HIGH** — mechanism read, zero-exemption state verified, recurrence vector traced to RE-180
- Cascade correction (9 vs 11): **HIGH** — per-workflow `paths:` grep verified
- Plan skeleton + 14-req flip: **HIGH** — 119 frontmatter + REQUIREMENTS traceability verified

**Research date:** 2026-07-09
**Valid until:** through Phase 125 execution (internal harness state; stable — no external dependencies to drift)
</content>
</invoke>
