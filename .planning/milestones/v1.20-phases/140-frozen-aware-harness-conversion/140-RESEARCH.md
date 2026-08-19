# Phase 140: Frozen-Aware Harness Conversion - Research

**Researched:** 2026-08-06
**Domain:** Node.js CI-validation tooling — batched frozen-git-object reads, chain-validator regression safety, milestone-scoped governance (CARVE) compliance
**Confidence:** HIGH (every load-bearing number in this document was re-executed against live code at HEAD on 2026-08-06, not copied from CONTEXT.md)

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

Produced by `/grill-me` codebase interrogation followed by a scored `/adversarial-review`
(5 parallel Finders → Adversary → Referee). 70 findings raised (491 Finder points), 9 disproved,
61 confirmed. The review **reversed the V14 SHA choice outright**, corrected two of the draft's
own performance measurements, and converted one open fork into a locked decision. Every
`[MEASURED]` figure was executed against live code at HEAD on 2026-08-06; the load-bearing
result (D-19) was re-executed a fifth time by the orchestrator directly.

**Ground truth established by interrogation**

- **Failure ledger — 11 of 17 harnesses are RED.** v1.4 (C4 + C5×2), v1.4.1 (C4 + C5),
  v1.5–v1.13 ×9 (C5 + C10). v1.14–v1.19 are green at live HEAD. `[MEASURED]` by real exit codes.
- **The conversion premise HOLDS.** At every close SHA v1.5→v1.13 both freshness-scoped glossaries
  read `2026-05-05` / `2026-07-04` = exactly 60 days against a `> 60` test → PASS; live reads
  `2026-06-29` / `2026-09-27` = 90 → FAIL. Verified across the full 32-file C5 scope and 17-file
  C10 scope at all 12 pinned SHAs. Faithful conversion prototypes go **v1.5 12/12, v1.14 15/15,
  v1.16 16/16, v1.18 16/16**.

**The read mechanism (SWEEP-05, SWEEP-06)**

- **D-01:** Convert **all three** read chokepoints per harness — `readFile(relPath)`,
  `walkMd(dir)`, and the bare `existsSync(join(process.cwd(), p))` guards. A converted `readFile`
  behind a live-HEAD membership guard is a hybrid that fails silently toward under-auditing.
  Reversibility: costly — the guards decide which assertions run at all.
- **D-02:** The chokepoint census is **per-harness, not v1.13-shaped**. Guard counts are 1 (v1.4,
  v1.4.1), 2 (v1.5), 4 (v1.6–v1.14), 5 (v1.15–v1.19); `readFile` sits at `:29 / :43 / :50 / :53`
  and `walkMd` at `:36 / :50 / :57 / :60` across those four families. The fifth guard in
  v1.15–v1.19 is the C17 contract-presence guard at `:827` and is IN SCOPE for the census but —
  per the Deferred section below — is the one guard this phase does NOT convert.
- **D-03:** The loader is a **batched prefetch** — one `git cat-file --batch` over the enumerated
  scope, memoized per `(sha, repo-relative path)`. Chosen on margin and determinism only. Per-file
  `git show` is ~40ms/spawn (37ms warm, 112ms cold), and a whole converted harness under the
  per-file option runs in 1.7–11.8s against a 60s budget. Batch is ~157ms for 218 blobs. Both
  options fit; batch is picked for headroom, not necessity.
- **D-04:** Parse `cat-file --batch` output on **Buffer offsets, never decoded-string offsets**.
  The frame is `<sha> <type> <size>\n<content>\n` where `size` is bytes; this corpus is
  saturated with em-dashes, so `docs/_glossary-android.md` is 29528 bytes vs 29438 JS string
  length. Naive string slicing desynchronizes at the first multibyte character and corrupts every
  subsequent file.
- **D-05:** Enumeration runs **before** any batch read, via `lsTreeAtClose`. On a real `file://`
  shallow clone, `lsTreeAtV15Close('docs')` throws `frozenCause=unreachable-sha` before a single
  blob is requested. `cat-file --batch` cannot discriminate — it exits 0 and emits `missing` for
  both absent-path and unreachable-SHA — but it never gets the chance to.
- **D-06:** Frozen `readFile` returns **`null` for absent-at-a-reachable-SHA and throws for
  unreachable-SHA**. This produces zero null returns across five faithfully converted harnesses
  because, under D-01, the scope is tree-derived and every enumerated path exists at the SHA.
- **D-07:** The **sidecar read must fail loud** when its blob is absent at the pinned SHA.
  `parseAllowlist()` currently degrades to `{safetynet_exemptions: [], supervision_exemptions: []}`
  with no diagnostic. At `3c3a140` / `13d2c883` / `5355b3b9` the v1.4 sidecar path does not exist,
  and the harness reports `C2 FAIL -- 45` that reads as content drift when it is entirely "the
  allowlist was never loaded."
- **D-08:** `check-phase-60`'s subprocess budget **stays 60000**; not raised to the peers' 300000.
  Three timeouts in that file — `:193` (30000, pin-helper self-test), `:239` (60000, the
  V-60-12..22 loop), `:261` (60000, the harness spawn) — and only `:261` is SWEEP-06's subject.
- **D-09:** Record that **the apex cannot evidence SWEEP-06**. Both `check-phase-60` spawn sites
  and all seven `V-NN-AUDIT-HARNESS` blocks are `NESTED`-guarded, so no converted harness ever
  executes under the apex. SC#2 therefore cannot be evidenced end-to-end via the apex; the plan
  must state its evidence path explicitly.

**The sidecar — closed, not an open fork (SWEEP-05)**

- **D-10:** The audit-allowlist sidecar reads **frozen, with the corpus, at the same SHA**. This
  is LOCKED, not a fork. Under a live-sidecar hybrid, v1.14 goes 12/3, v1.16 goes 13/3, and v1.5
  goes 9/3 — destroying the v1.5–v1.13 conversion premise. Under the frozen sidecar all four are
  green. Reversibility: one-way in practice.
- **D-11:** The rationale is "correct-by-maintenance, verified per-harness," never
  "self-consistent by construction." Census of pin-vs-frozen-content alignment: v1.4 stale=17 of
  22; v1.4.1 and v1.5–v1.15 stale=0; v1.16/v1.17/v1.18 stale=4 of 30.
- **D-12:** TOOL-04's live re-pin becomes **inert for converted harnesses** — a two-sources-of-truth
  split with Phase 141 RED-02. `check-phase-67.mjs:38` already reads the v1.7 sidecar frozen
  (the supporting precedent). `check-phase-62`, `-65` (V-65-13), `-66` (V-66-02) assert on the
  LIVE sidecar while the harness reads frozen (the inversion).

**Conversion scope (SWEEP-05)**

- **D-13:** Convert **v1.4 through v1.18 (16 harnesses)** in Phase 140. v1.19 converts in Phase
  144 in the same plan that lands its `V119` pin, because `MILESTONE_CLOSE_SHAS` has no `V119`
  and that pin is HARN-17.
- **D-14:** D-13 requires **three** recorded amendments: (a) SWEEP-05's "v1.4–v1.19" wording in
  REQUIREMENTS.md; (b) ROADMAP.md Phase 140 SC#1, which carries the same range; (c) the
  REQUIREMENTS.md traceability row, which must change so SWEEP-05 cannot be marked Validated at
  Phase 140 with v1.19 unconverted.
- **D-15:** Drop the asymmetric use of the no-batching rule (`ROADMAP.md:178/:191` name the seven
  predecessors 100/112/119/125/128/134/138 verbatim). Phase 144's plan must own the fork-vs-convert
  ordering for HARN-18 (v1.20 harness circularity bars a frozen-aware v1.20 harness against its
  own corpus).
- **D-16:** Convert the already-green v1.14–v1.18 too, with the cause stated correctly: they are
  green because Phase 133 TOOL-04 re-pinned their sidecars to live coordinates, not because the
  corpus hasn't drifted (it has, heavily). Conversion of this group is conditional on D-10 — under
  a live sidecar three of them go red.
- **D-17:** v1.4.1 is **in scope** (`V141` = `5c976ec` already pinned).
- **D-18:** Bound and state the coverage each conversion drops, per harness. v1.4's scope is 33
  files live and 33 frozen — identical sets, zero files exit coverage. v1.5 genuinely drops 64
  live-only `.md`, and the gap widens with pin age.

**V14 pin (SWEEP-08) — REVERSED from the draft**

- **D-19:** Pin **`V14 = 0b3be9ab`**, not `b5cf529`. Orchestrator-verified by full conversion
  against the frozen tree:

  | SHA | converted v1.4 result |
  |---|---|
  | `b5cf529` (roadmap candidate) | 3 passed, 2 failed — C2 FAIL 33, C5 FAIL 1 |
  | `671f72a` (roadmap candidate) | 3 passed, 2 failed — C2 FAIL 33, C5 FAIL 1 |
  | `3c3a140` / `13d2c883` / `5355b3b9` | C2 FAIL 45 — sidecar absent, see D-07 |
  | **`0b3be9ab`** | **4 passed, 1 failed** (sole failure = TEMPLATE-SENTINEL) |
  | **`0b3be9ab` + SWEEP-07** | **5 passed, 0 failed, 0 skipped** |

  The viable window is `2574c794`…`ba9ecd87`; `0b3be9ab` is its terminal Phase-43 commit
  ("validation audit — 4 predicate fixes, 27/27 green"). Reversibility: one-way.
- **D-20:** No `MILESTONE CLOSE`-token discriminator exists for v1.4 (`git log --all
  --format="%H|%s" | awk -F'|' '$2 ~ /v1\.4/ && $2 ~ /MILESTONE CLOSE/'` returns empty), so the
  V117/V118 subject-line method does not apply. The pin is chosen as the state the v1.4 sidecar's
  line-pins were generated against.
- **D-21:** `V14` is an **audit-close pin, and `.planning/*` reads at V14 are barred**. v1.4's own
  `.planning/REQUIREMENTS.md` was deleted at `5355b3b9`. If a future validator needs v1.4's
  planning docs, add a second entry `V14_ARCHIVE = 13d2c883` (the V17/V17_CLOSEGATE precedent).
- **D-22:** The `frozen-at-close.mjs` `--self-test` assertion 3 must be re-authored **in the same
  plan as the pin**. `:294-300` hard-asserts `lsTreeAtClose('V14','docs')` throws; landing any
  `V14` flips it to FAIL → 5/6 → `process.exitCode = 1`. Retarget to a genuinely unpinned tag;
  Phase 139's `6/6 PASS` evidence is preserved by substitution, not invalidated.
- **D-23:** Supersede the RETRO-01 comment (at `:135-137`, not `:94-96`); the pin gate is at
  `:151` / `:212`, not `:109-110`. `:137` already records "Candidates if needed: b5cf529 or
  671f72a" — a prior decision record that D-19 overrides on evidence and must be explicitly
  overridden, not silently deleted.

**TEMPLATE-SENTINEL remedy (SWEEP-07)**

- **D-24:** The remedy is the **v1.4.1 sentinel parse backport** — relax the `last_verified` and
  `review_by` regexes to `/^…\s*(#.*)?$/m` and add `if (lvMatch[1] === '1970-01-01') continue;`.
  Orchestrator-verified: takes converted v1.4 from 4/1 to **5/0** at `0b3be9ab`.
- **D-25:** Every rejection reason in the draft was wrong: (a) "exclude `docs/_templates/`" IS
  what v1.4.1 actually did (via `hasUnderscoreDirSegment()`), making the `:268` sentinel `continue`
  dead code for that one file — not an alternative remedy. (b) The "widens the blind spot to four
  other templates" claim is fabricated — exactly one `_`-directory file sits in v1.4's 33-path
  scope. (c) A sidecar exemption is impossible: C5 never reads the allowlist. (d) The full D-24
  backport is ~12 lines; we adopt the minimal regex+continue form, genuinely 3 lines.
- **D-26:** The `continue` suppresses a genuinely malformed `review_by`. `ROADMAP.md:110` SC#3
  says "proven by the assertion passing" while the remedy makes it **skip** — either amend SC#3
  or state the reconciliation explicitly; this must not be papered over.
- **D-27:** SWEEP-07 lands in the **same plan** as the v1.4 conversion, applied after it:
  2 failures → 1 (conversion) → 0 (sentinel). Cite the sentinel at its **frozen** coordinate
  (line 29 at the pin — confirmed by direct read of `0b3be9ab:docs/_templates/admin-template-android.md`
  this session), not the live `:39`.

**Governance and blast radius (GOV-01, GOV-02 carried from Phase 139)**

- **D-28:** The GOV-02 grep must cover the right hazard class — harness pass counts are not
  pinned, harness source text is. In scope: all 15 `audit-harness-*.yml` `path-match` jobs,
  `check-phase-58.mjs:425-441` (800-char forward window), `check-phase-48.mjs:107`,
  `check-phase-70.mjs:126`, `check-phase-66.mjs:76` and `:139`, `check-phase-73.mjs:96-107`,
  `check-phase-120.mjs:107-111`.
- **D-29:** Anticipate a CARVE Category-5 extension: the JSON sidecars and
  `check-phase-{58,73,100,112,119,120,125,128,134,138}` are off-list, and any REPAIR to them would
  trip D-10's hard block — this phase's own file census (below) shows no repair is actually
  needed.
- **D-30:** The CARVE amendment, if one turns out to be needed, lands as its **own commit, alone,
  first** — D-09 rule 1 is stricter than the gate enforces (bars touching any other path, in-scope
  or out-of-scope, in the same commit).
- **D-31:** Fix the Stop-hook's false alarm — `.claude/hooks/v1.20-carve-gate.cjs` reportedly cried
  hard-block against a clean, exit-0 tree three times. This session's direct read of the hook's
  `computeDecision()` and a live re-run (see Findings) could not reproduce the defect against the
  CURRENT committed code; harden defensively anyway (see Pitfalls).
- **D-32:** The zero-margin freshness hazard is at least four instances covering 11 harnesses and
  live HEAD. All six "green at HEAD" harnesses (v1.14–v1.19) sit at zero margin too.
- **D-33:** Two masking behaviours to carry, not discover: v1.4.1's C6/C7/C9 hardcode `pass: true`;
  harness detail strings truncate (`.slice(0,5)` / `.slice(0,3)`), which produced the draft's
  false "39 Android links" attribution.

### Claude's Discretion

- Loader module layout inside `_lib/frozen-at-close.mjs`, cache-key shape, and whether the batch
  reader is a separate export or folded into the existing readers.
- Whether the 16 harness conversions land as one atom or a small number of atoms, subject to
  D-30's amendment-first ordering.
- Exact wording of the three D-14 amendments and the D-22 self-test substitution.
- Naming of the re-authored self-test assertion's replacement tag.

### Deferred Ideas (OUT OF SCOPE)

- **v1.19 harness conversion** — Phase 144, in the same plan as the `V119` pin (D-13/D-14).
- **The C17 live-HEAD leg in v1.15–v1.19** — `c17-eee-contract.mjs` is CARVE Category 3, owned by
  Phase 143. Converting it here collides two phases' scopes. Must be recorded as a named SWEEP-05
  limitation via the amendment instrument, not a prose note.
- **`V14_ARCHIVE = 13d2c883`** — only if a future validator needs v1.4's `.planning` close state.
- **Re-pinning the v1.4 sidecar to live coordinates** — out of scope; D-19 makes it unnecessary.
- **De-informationalizing v1.4's C3 or v1.4.1's C6/C7/C9** — not this phase.
- **`if: always()` on the fanned-out validator jobs** — still Phase 141, carried from Phase 139.

</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| SWEEP-05 | Each frozen milestone-audit harness v1.4–v1.19 reads its corpus at its own close SHA rather than live HEAD | Per-family conversion recipe (readFile/walkMd/existsSync coordinates verified for all 16 in-scope harnesses); loader design (`readManyAtClose`/`createFrozenCorpusReader`); D-14 amendment text narrowing scope to v1.4–v1.18 this phase |
| SWEEP-06 | The converted harnesses complete inside `check-phase-60.mjs`'s 60-second subprocess timeout, verified by measurement | Empirical timing: live (unconverted) v1.5 harness = 12.7s; batched frozen fetch of full v1.5 docs/ tree = ~150ms warm; SC#2 evidence path around the D-09 NESTED-guard blind spot |
| SWEEP-07 | The v1.4 TEMPLATE-SENTINEL assertion has a named, recorded remedy distinct from frozen-awareness | Exact 3-line backport verified present in v1.4.1 at `:265-268`; frozen-coordinate citation (line 29) confirmed by direct read at `0b3be9ab` |
| SWEEP-08 | A V14 pin exists with an explicitly chosen SHA and recorded rationale, satisfying the `frozen-at-close.mjs` gate | Sidecar-presence and sentinel-coordinate spot-verification at `0b3be9ab`; self-test retarget recommendation (`VUNPINNED`); blast-radius census of `MILESTONE_CLOSE_SHAS` consumers |

</phase_requirements>

## Summary

This phase wires the batched frozen-object reader (D-03/D-04/D-05) into 16 near-identical
harness files and adds one new pin. The good news, verified this session by reading every
in-scope harness rather than trusting the family generalization in CONTEXT.md: **the four-family
guard/coordinate census in D-02 is exactly right for all 16 files, with no exceptions** — every
`readFile`, `walkMd`, `parseAllowlist`/sidecar-read, and `existsSync` guard sits at the coordinate
D-02 predicts, harness by harness (verified table below). All 16 target milestone tags already
exist in `MILESTONE_CLOSE_SHAS` except `V14` itself, which this phase adds — so the loader work is
almost entirely a mechanical rewire of an existing per-harness `readFile`/`walkMd` pair onto
already-pinned SHAs, not new pin discovery.

The second piece of good news: this phase's concrete file-edit list (`_lib/frozen-at-close.mjs` +
the 16 `vX.Y-milestone-audit.mjs` files) is **already fully covered by CARVE Categories 2 and 4**
— no new allowlist amendment is required for the edits this research identifies, contrary to
D-29's cautionary framing. A GOV-02 census (below) of every validator that pins one of these files
shows all such pins are substring/key-presence checks (`content.includes(...)`, JSON key
existence), never exact line-number array indexing — so shifting line numbers inside the Helpers
section is safe everywhere this phase touches.

The one genuine exception to "convert all three chokepoints" is the 5th `existsSync` guard in the
v1.15–v1.18 family (`:827`), which gates a live subprocess spawn of `c17-eee-contract.mjs` — a
Phase-143-owned live-HEAD leg that must NOT be converted here (deferred, explicitly).

SC#2 (60s budget) cannot be evidenced through the apex (D-09's NESTED guard blindness is real and
verified) — the plan must time the harness directly and separately confirm `check-phase-60.mjs`'s
own `V-60-23` check line specifically, not the harness's overall exit code.

**Primary recommendation:** Build one new library function pair —
`readManyAtClose(tag, relPaths)` (raw batched `cat-file --batch` reader, Buffer-offset parsed) and
`createFrozenCorpusReader(tag, {extraPaths})` (per-harness convenience: one `lsTreeAtClose('docs')`
enumeration + one batch fetch, memoized in a closure) — then apply the same 4-line wiring pattern
to all 16 harnesses per their family coordinates, land the V14 pin + self-test retarget in the
same commit as the loader (D-22), and apply the SWEEP-07 sentinel backport to the newly-frozen
v1.4 harness only.

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Frozen SHA pin registry (`MILESTONE_CLOSE_SHAS`) | Library (`_lib/frozen-at-close.mjs`) | — | Single source of truth every harness and validator imports; a per-harness duplicate pin would re-create the exact drift class this milestone deletes |
| Batched blob fetch (`git cat-file --batch`) | Library | — | One process-spawn boundary per harness run; harness-local duplication would multiply spawn overhead 16x with no benefit |
| Scope enumeration (`lsTreeAtClose`) | Library | — | Already built (Phase 139); this phase only consumes it |
| Per-harness scope logic (`androidDocPaths()`, `appleBusinessDocPaths()`, etc.) | Harness file | — | Domain-specific membership rules (regex on filename, directory allowlist) stay local; only the underlying read primitive changes |
| Sidecar fail-loud semantics (D-07) | Harness file (`parseAllowlist()`) | Library (`readAtClose`'s existing unconditional-throw contract) | The library's single-file `readAtClose` already throws unconditionally; the harness only needs to route the sidecar path through it instead of through the degrading batch-reader wrapper |
| C17 subprocess spawn guard (v1.15–v1.18 5th guard) | Harness file, but LIVE-HEAD (unconverted) | CARVE Category 3 (`c17-eee-contract.mjs`, Phase 143) | Deliberately excepted from this phase's conversion — converting it here would silently pre-empt Phase 143's ownership of the live corpus that leg reads |
| CARVE allowlist / gate | Governance layer (`.planning/milestones/v1.20-CARVE.md`, `carve-gate.mjs`) | — | Authorizes every edit above; this phase's edits are already inside Categories 2 and 4 (verified, see Findings) |

## Findings — the six numbered questions

### 1. Loader shape

Add two new exports to `scripts/validation/_lib/frozen-at-close.mjs`, next to the existing
`readAtClose`/`lsTreeAtClose` (this file is already CARVE Category 4 — no amendment needed to
edit it):

```js
// scripts/validation/_lib/frozen-at-close.mjs — NEW (SWEEP-05/06, Phase 140)

/**
 * Batch-read many repo-relative paths at a frozen close SHA via ONE `git cat-file --batch`
 * call (D-03). Callers must have already proven the SHA reachable (normally via a prior
 * lsTreeAtClose call, D-05) -- this function does its own per-path missing/absent handling
 * only and does not re-derive frozenCause='unreachable-sha' from a batch-level failure (a
 * batch spawn failure here is genuinely 'other', e.g. a malformed input line).
 *
 * @param {keyof MILESTONE_CLOSE_SHAS} milestoneTag
 * @param {string[]} relPaths - repo-relative paths; may include paths outside docs/ (e.g. the sidecar)
 * @returns {Map<string, string|null>} content keyed by relPath; null = absent-at-this-SHA (D-06)
 */
export function readManyAtClose(milestoneTag, relPaths) {
  const sha = MILESTONE_CLOSE_SHAS[milestoneTag];
  if (!sha) throw new Error(`No frozen SHA for milestone ${milestoneTag}`);
  const uniquePaths = [...new Set(relPaths)];
  const result = new Map();
  if (uniquePaths.length === 0) return result;
  const input = uniquePaths.map((p) => `${sha}:${p}`).join('\n') + '\n';
  let stdout;
  try {
    stdout = execFileSync('git', ['cat-file', '--batch'], {
      input,
      timeout: 20000,
      maxBuffer: SUBPROCESS_MAX_BUFFER,       // reuse the existing 20MB constant (line 41) -- the
      stdio: ['pipe', 'pipe', 'pipe'],        // full v1.5 docs/ tree measures ~2.7MB, ~150ms warm
      // NO `encoding` option -- must stay a Buffer so the byte-length slicing below is exact (D-04)
    });
  } catch (err) {
    const cause = frozenCause(err);
    err.frozenCause = cause;
    err.message = `[${cause}] ${err.message}`;
    throw err;
  }
  const NL = 0x0a;
  let offset = 0;
  for (const p of uniquePaths) {
    const headerEnd = stdout.indexOf(NL, offset);
    if (headerEnd === -1) throw new Error(`cat-file --batch: truncated output before header for ${p}`);
    const header = stdout.toString('utf8', offset, headerEnd); // header line is ASCII -- safe to decode
    offset = headerEnd + 1;
    if (header.endsWith(' missing')) {
      result.set(p, null);           // D-06: absent-at-reachable-SHA
      continue;
    }
    const size = parseInt(header.split(' ')[2], 10);           // '<sha> blob <size>'
    const content = stdout.subarray(offset, offset + size)     // BYTE slice, never a string slice (D-04)
      .toString('utf8').replace(/\r\n/g, '\n');
    offset += size + 1;             // +1 skips the trailing LF cat-file appends after every object
    result.set(p, content);
  }
  return result;
}

/**
 * Per-harness frozen-corpus reader: one lsTreeAtClose('docs') enumeration (throws first if the
 * SHA is unreachable, D-05) + one readManyAtClose batch fetch over the whole tree, memoized for
 * the life of the returned object. Each harness runs as its own `node harness.mjs` subprocess,
 * so there is no cross-invocation cache to build -- a closure-scoped Map is sufficient (ponytail:
 * skip a persistent/disk cache, add one only if a future harness needs to share state across
 * separate process invocations, which none does today).
 *
 * @param {keyof MILESTONE_CLOSE_SHAS} milestoneTag
 * @param {{ extraPaths?: string[] }} [opts] - non-docs/ paths to fetch in the same batch (the sidecar)
 * @returns {{ has(relPath:string): boolean, get(relPath:string): string|null|undefined, paths: string[] }}
 */
export function createFrozenCorpusReader(milestoneTag, { extraPaths = [] } = {}) {
  const docPaths = lsTreeAtClose(milestoneTag, 'docs', { ext: '.md' });
  const content = readManyAtClose(milestoneTag, [...docPaths, ...extraPaths]);
  const docSet = new Set(docPaths);
  return {
    has: (relPath) => docSet.has(relPath),   // tree-derived existence only (D-06); the sidecar is
                                              // NOT in docSet even though it's in `content` -- callers
                                              // that need sidecar presence check `.get(path) != null`
    get: (relPath) => content.get(relPath),  // string | null (absent-at-SHA) | undefined (never requested)
    paths: docPaths,
  };
}
```

**Cache-key shape:** `readManyAtClose` does not need a persistent memo — Claude's Discretion is
exercised here toward the simplest option (ponytail rung 1: it doesn't need to exist). Each
harness process calls `createFrozenCorpusReader` exactly once at module load; the returned
closure's `Map` is the only cache needed for that process's lifetime.

**walkMd re-absolutization (why the ~159 call sites stay untouched):** every existing call site
does `walkMd(dir)` then immediately `relNormalize(abs)` on each result, where `relNormalize`
strips `process.cwd()` back off. Converting `walkMd` to internally call
`FROZEN.paths.filter(...).map(rel => join(process.cwd(), rel))` produces exactly the
cwd-prefixed strings `relNormalize` already expects — `join()` here is a pure string operation and
never touches the filesystem, so it works even though the frozen path may not exist on disk at
all. Verified: `relNormalize` is `abs.replace(process.cwd()+'\\','').replace(process.cwd()+'/','
').replace(/\\/g,'/')` — round-trips a `join(cwd, 'docs/foo.md')` back to `'docs/foo.md'` on both
Windows and POSIX.

### 2. Conversion patch shape, per harness family

Verified directly against all 16 in-scope harness files this session (not sampled — every file
grepped):

| Family | Files (count) | `readFile` line | `walkMd` line | `parseAllowlist` line | sidecar-read line | guard count |
|---|---|---|---|---|---|---|
| A | v1.4, v1.4.1 (2) | 29 | 36 | 57 | 58 | 1 |
| B | v1.5 (1) | 43 | 50 | 71 | 72 | 2 |
| C | v1.6–v1.14 (9) | 50 | 57 | 78 | 79 | 4 |
| D | v1.15–v1.18 (4) | 53 | 60 | 81 | 82 | 5 (5th is the C17 exception, `:827` in v1.15) |

D-02's four-family coordinate claim is **exactly correct with zero exceptions** across all 16
files — the earlier "v1.13-shaped miscoordinate" warning in D-02 refers to a plan that would key
off `:100/:113/:161/:212` (which happen to be v1.6's exact line numbers, coincidentally identical
across the whole Family C copy lineage) and misapply them to Families A, B, or D.

**Milestone-tag mapping** — every tag except `V14` already exists in `MILESTONE_CLOSE_SHAS`
(verified by reading the file, `:69-138`):

| Harness | Tag | SHA | Status |
|---|---|---|---|
| v1.4 | `V14` | `0b3be9ab` | **NEW this phase (D-19)** |
| v1.4.1 | `V141` | `5c976ec` | existing |
| v1.5 | `V15` | `ba2cbc0` | existing |
| v1.6 | `V16` | `9d8877c` | existing |
| v1.7 | `V17` | `aa6de68` | existing |
| v1.8 | `V18` | `2bd79d8` | existing |
| v1.9 | `V19` | `b29dca5` | existing |
| v1.10 | `V110` | `a3617e9` | existing |
| v1.11 | `V111` | `919b23b` | existing |
| v1.12 | `V112` | `12f2c7b` | existing |
| v1.13 | `V113` | `ba24f1a` | existing |
| v1.14 | `V114` | `7d922a7` | existing |
| v1.15 | `V115` | `29a3599` | existing |
| v1.16 | `V116` | `3dd2512` | existing |
| v1.17 | `V117` | `b56bba5` | existing |
| v1.18 | `V118` | `7af8a147` | existing |

**Per-harness edit recipe** (identical shape across all four families; only the line numbers and
`MILESTONE_TAG`/`SIDECAR_PATH` literals differ):

```js
// 1. New import, added next to the existing `import { readFileSync, existsSync, readdirSync,
//    statSync } from 'node:fs';` line (that import stays -- readdirSync/statSync are now dead
//    code inside walkMd's OLD body, which is deleted; existsSync is still used by anything NOT
//    converted, i.e. the v1.15-v1.18 5th guard).
import { createFrozenCorpusReader } from './_lib/frozen-at-close.mjs';

const MILESTONE_TAG = 'V15';                                        // per-family constant
const SIDECAR_PATH = 'scripts/validation/v1.5-audit-allowlist.json'; // UNCHANGED literal -- GOV-02
                                                                       // pins (check-phase-48/70)
                                                                       // search for this exact string
const FROZEN = createFrozenCorpusReader(MILESTONE_TAG, { extraPaths: [SIDECAR_PATH] });

// 2. readFile -- replaces the existsSync+readFileSync body
function readFile(relPath) {
  const c = FROZEN.get(relPath);
  return c === undefined ? null : c;   // undefined (never enumerated) and null (absent-at-SHA)
}                                       // both read as "missing" to every existing caller

// 3. walkMd -- replaces the recursive readdirSync walker
function walkMd(dir) {
  const prefix = dir.endsWith('/') ? dir : dir + '/';
  return FROZEN.paths
    .filter((p) => p.startsWith(prefix))
    .map((p) => join(process.cwd(), p));    // re-absolutize -- every call site still does
}                                            // relNormalize(abs) on the result (D-35 in Phase 139)

// 4. existsSync(join(process.cwd(), p)) guards -- replace EACH occurrence with:
if (FROZEN.has(p)) paths.add(p);

// 5. parseAllowlist -- D-07 fail-loud, only for ABSENCE (not malformed JSON, which keeps its
//    existing degrade per the check-phase-31.mjs parseInventory() precedent already cited in
//    every harness's own comment)
function parseAllowlist() {
  const raw = FROZEN.get(SIDECAR_PATH);
  if (raw === undefined || raw === null) {
    throw new Error(`Sidecar absent at frozen SHA (${MILESTONE_TAG}): ${SIDECAR_PATH} -- D-07 fail-loud`);
  }
  try {
    return JSON.parse(raw);
  } catch (err) {
    return { _parseError: err.message, safetynet_exemptions: [], supervision_exemptions: [] };
  }
}
```

**Family deviation — v1.15–v1.18's 5th guard (the C17 exception).** This guard (`:827` in v1.15,
identical in v1.16–v1.18) must be LEFT UNCONVERTED:

```js
// SWEEP-05 EXCEPTION (Phase 140, deferred per CONTEXT.md <deferred>): this guard and the C17
// spawn below intentionally stay LIVE-HEAD. c17-eee-contract.mjs is CARVE Category 3, owned by
// Phase 143 -- converting this leg here would collide two phases' scopes. Recorded as a named
// SWEEP-05 limitation via the D-14 amendment, not a code comment alone.
if (!existsSync(join(process.cwd(), CONTRACT))) {
  return { pass: false, detail: 'C17 FAIL: ' + CONTRACT + ' not present (EEE contract validator missing)' };
}
```

This means the C17 check's own subprocess spawn (`execFileSync('node', [CONTRACT], ...)`) and
everything it reads also remain live-HEAD for v1.15–v1.18 — the D-14 amendment to SWEEP-05's
wording must state this explicitly, since the requirement text otherwise reads as if every check
in every converted harness reads frozen.

**Family A note:** v1.4.1 already carries the SWEEP-07 backport verbatim at `:265-268` (the
regex relaxation `/^…\s*(#.*)?$/m` and the `if (lvMatch[1] === '1970-01-01') continue;` line) —
confirmed by direct read this session. v1.4 itself does not have it yet; SWEEP-07's job is to
backport those same ~3 lines into v1.4's C5 check, in the same plan as v1.4's conversion (D-27),
applied AFTER the conversion so the ordering matches D-19's measured 2→1→0 arithmetic.

### 3. Pre-edit grep targets (GOV-02)

All pin sites CONTEXT.md D-28 lists were re-verified present at HEAD this session:

| Grep target | Command | Expected hits |
|---|---|---|
| Sidecar path literal, v1.5 (check-phase-48) | `grep -n "v1.5-audit-allowlist.json" scripts/validation/check-phase-48.mjs` | 1, at `:107` (asserts the harness source `.includes()` the literal) |
| Sidecar path literal, v1.7 (check-phase-70) | `grep -n "v1.7-audit-allowlist.json" scripts/validation/check-phase-70.mjs` | 1, at `:126` |
| C11/C9/C13 800-char window (check-phase-58) | `sed -n '423,443p' scripts/validation/check-phase-58.mjs` | V-58-25 present, searches forward 800 chars from `"name: 'C12: 4-platform comparison structural validation'"` |
| Harness path literal + token pins (check-phase-66) | `sed -n '70,82p;133,150p' scripts/validation/check-phase-66.mjs` | V-66-01 (6 LOCKED tokens), V-66-04 (line-725/854 substring-occurrence count, NOT a line-index read) |
| Frozen-at-close.mjs export census (check-phase-73) | `grep -n "MILESTONE_CLOSE_SHAS\|readAtV" scripts/validation/check-phase-73.mjs` | `:91-109`, V-73-LIB-EXISTS checks for `MILESTONE_CLOSE_SHAS`, `V141:`, `V15:`, `V16:`, `V17:`, and 4 `readAtV*Close` export names — all still present after adding V14 (additive) |
| Stale-claim/attribution pin (check-phase-120) | `grep -n "REMAIN INLINE\|Phase 111" scripts/validation/_lib/frozen-at-close.mjs` | 0 hits for "REMAIN INLINE" (must stay 0 — do not introduce this phrase in new comments), 1+ hits for "Phase 111" (must stay present) |
| Broadened census — any `-audit-allowlist.json` pin | `grep -ln "audit-allowlist.json" scripts/validation/check-phase-*.mjs` | `check-phase-{48,60,62,65,66,67,68,70,133}.mjs` (9 files — wider than D-28's named 2; all are substring/JSON-shape checks, none is a line-index read, verified by manual read of each hit this session) |
| Broadened census — any `milestone-audit.mjs` harness-path pin | `grep -ln "milestone-audit.mjs'" scripts/validation/check-phase-*.mjs` | 26 files (60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,82,88,93,95,100,112,119,125,128,134,138 — mostly `HARNESS = '...'` constant declarations in unrelated validators, not pins on OUR edit region) |
| Hardcoded line-index read (the real danger class) | `grep -n "split('\\\\n')\[\|lines\[[0-9]" scripts/validation/check-phase-{48,58,60,61,62,63,64,65,66,70,73,120,133}.mjs` | **0 hits across all 13 files** — confirmed this session; every pin in this project is `indexOf`/`includes`/regex-based, never an exact array-index line lookup |

**The 800-char window slack (check-phase-58).** V-58-25/V-60-01..04 anchor on `c.indexOf("name:
'C12: ...'")` and scan 800 chars FORWARD from that index — this index is found dynamically each
run, not hardcoded. Because this phase's edits are confined to the Helpers section (lines
29-82ish, strictly BEFORE the `checks` array where `"name: 'C12: ...'"` lives), any byte-length
change from the conversion shifts the C12 anchor's absolute position but **not its position
relative to the following `informational: true` line** (both shift together). Net finding: **this
phase's edits carry zero risk to the 800-char-window class of pin**, because the risk only
materializes when a plan edits content WITHIN the `checks` array — which the D-01 recipe above
does not do (it edits only the Helpers section, upstream of `checks`).

### 4. CARVE amendment sequencing

**Finding: no new CARVE allowlist amendment is required for this phase's concrete edit list.**

The two categories of file this phase's own conversion recipe touches:

- `scripts/validation/_lib/frozen-at-close.mjs` → **Category 4**, already on-list
  (`scripts/validation/_lib/frozen-at-close.mjs`).
- `scripts/validation/v1.4-milestone-audit.mjs` … `v1.18-milestone-audit.mjs` (16 files) →
  **Category 2**, already on-list via the glob `scripts/validation/v*.*-milestone-audit.mjs`
  (D-29's live-verified claim that this glob matches the dotted `v1.4.1` filename holds; confirmed
  by this session's own `node scripts/validation/carve-gate.mjs --json` run, exit 0, no glob
  errors).

Everything else this research identifies as needing an edit is **out of `carve-gate.mjs`'s scope
entirely**, so no allowlist entry applies to it either way:

- `.claude/hooks/v1.20-carve-gate.cjs` (D-31 hardening) — the gate's `IN_SCOPE_PREFIXES` is
  `['scripts/', '.github/', 'docs/']` plus two exact paths; `.claude/` matches none of them.
- `.planning/ROADMAP.md`, `.planning/REQUIREMENTS.md` (the three D-14 amendments) — `.planning/`
  is explicitly excluded from the gate's diff scope (`v1.20-CARVE.md`'s own "Scope exclusion"
  section, by design, to avoid the self-referential-gate problem).

D-29's "anticipate a Category-5 extension" warning is a real, live risk for a DIFFERENT scenario —
if implementation discovers it must actually repair a validator's stale pin (not just verify it
still holds) — but this session's own GOV-02 census (above) found no such repair is needed: every
in-scope pin is a substring/key-presence assertion the conversion satisfies by construction.

**If the executor's actual diff DOES need to touch an off-list path** (discovered only during
implementation, contrary to this research), the amendment procedure is:

1. A solo commit touching **only** `.planning/milestones/v1.20-CARVE.md`, adding the new glob(s)
   under a new or existing category, with a one-line rationale comment directly above the glob.
2. Run `node scripts/validation/carve-gate.mjs` — must exit 0 with the new path(s) now on-list
   and zero D-09 violations.
3. **Only then**, in a separate, later commit, land the edit the amendment authorizes.

This sequencing is what `carve-gate.mjs:248-276` (`checkAmendmentViolations`) mechanically
enforces — a commit or dirty working tree that touches `v1.20-CARVE.md` together with any other
in-scope path (even one already on-list) trips a D-09 violation.

### 5. Verification commands, per success criterion

**SC#1** — every v1.4–v1.18 harness (v1.19 excluded, D-13/D-14) derives scope + reads content at
its own close SHA:

```bash
for h in scripts/validation/v1.4-milestone-audit.mjs scripts/validation/v1.4.1-milestone-audit.mjs \
         scripts/validation/v1.5-milestone-audit.mjs scripts/validation/v1.6-milestone-audit.mjs \
         scripts/validation/v1.7-milestone-audit.mjs scripts/validation/v1.8-milestone-audit.mjs \
         scripts/validation/v1.9-milestone-audit.mjs scripts/validation/v1.10-milestone-audit.mjs \
         scripts/validation/v1.11-milestone-audit.mjs scripts/validation/v1.12-milestone-audit.mjs \
         scripts/validation/v1.13-milestone-audit.mjs scripts/validation/v1.14-milestone-audit.mjs \
         scripts/validation/v1.15-milestone-audit.mjs scripts/validation/v1.16-milestone-audit.mjs \
         scripts/validation/v1.17-milestone-audit.mjs scripts/validation/v1.18-milestone-audit.mjs; do
  echo "=== $h ==="; node "$h"; echo "exit=$?"
done
```
Expected: v1.5–v1.13's C5/C10-equivalent freshness checks now show `PASS` where they previously
showed `review_by-last_verified=Nd (>60)` or the Linux-frontmatter equivalent; v1.4 shows 5/5 PASS
after the SWEEP-07 backport; v1.4.1 and v1.14–v1.18 remain green (D-16's "green for the right
reason now" is a manual read of their output, not a different exit code).

**SC#2** — the 60s budget, with an explicit non-apex evidence path (D-09):

```bash
# (a) direct wall-clock of the converted harness, standing in for check-phase-60's own spawn
node -e "
const {execFileSync}=require('child_process');
const t0=Date.now();
execFileSync('node',['scripts/validation/v1.5-milestone-audit.mjs'],{stdio:'pipe',timeout:60000});
console.log('elapsed ms:', Date.now()-t0);
"
# (b) check-phase-60 standalone (NOT nested) -- confirm V-60-23 individually, not the overall exit
node scripts/validation/check-phase-60.mjs --verbose | grep "V-60-23"
```
Baseline measured this session (unconverted, live HEAD): **12746ms** — 47s of headroom before any
conversion work; the batched frozen fetch adds ~150ms warm (measured, 218 `.md` blobs at V15) so
the converted harness should land in the same order of magnitude. Expected evidence: (a) prints an
elapsed value under 60000; (b) shows `[23/25] V-60-23: ... PASS` regardless of `check-phase-60`'s
overall summary line, which will still report other FAILs from V-60-12..22 (Phase 141 scope) —
state this explicitly in the verification writeup so a reviewer doesn't mistake overall exit 1 for
this criterion failing.

**SC#3** — TEMPLATE-SENTINEL remedy proven by the assertion passing:

```bash
node scripts/validation/v1.4-milestone-audit.mjs --verbose
```
Expected: `Summary: 5 passed, 0 failed, 0 skipped`, with check id 5 (C5) showing `PASS` (not
`SKIPPED` — the remedy causes the SENTINEL FILE's frontmatter parse to `continue` past just that
one violation record, not to mark the whole check skipped; the check as a whole still evaluates
every other Android doc normally and passes overall). Cross-check against D-26's SC#3 wording
tension: if the plan does not separately amend ROADMAP.md SC#3's "the assertion passing" language,
record the reconciliation explicitly in the plan (the assertion's overall `pass: true` is what
"passes" — the per-file suppression is the mechanism, not a hidden skip of the whole check).

**SC#4** — V14 entry with rationale, satisfying the pin gate:

```bash
grep -n "V14:" scripts/validation/_lib/frozen-at-close.mjs
node scripts/validation/_lib/frozen-at-close.mjs --self-test
```
Expected: a `V14: '0b3be9ab'` (or full un-abbreviated form, matching the existing abbreviation
convention for other entries) key with an adjacent rationale comment; self-test prints `6/6 PASS`
with the retargeted assertion 3 passing against its new tag (see Finding 6).

### 6. Self-test substitution (D-22)

**Recommendation: retarget assertion 3 to `VUNPINNED`.**

Every existing tag in `MILESTONE_CLOSE_SHAS` is a real milestone identifier (`V15`, `V110`,
`V141`, ...) that WILL eventually be pinned by some future phase's back-anchor rule (the pattern
established by V117→V118→V119: each milestone's close phase pins the PREVIOUS milestone's SHA).
Any numeric-looking candidate (`V119`, `V120`, `V10`) is therefore only temporarily safe — `V119`
is pinned in Phase 144 of THIS milestone, and `V120`/future tags will be pinned by whichever
milestone closes next. A tag that is guaranteed to never collide must be structurally outside the
project's `V` + digits-of-the-version naming convention. `VUNPINNED` reads as deliberately
synthetic (not a stale gap accidentally left over), documents its own intent, and cannot collide
with any real milestone tag this project will ever mint.

```js
// (iii): VUNPINNED is a deliberately synthetic tag, never a real milestone identifier -- see
// SWEEP-08/D-22 (Phase 140): V14 is now pinned, so this assertion can no longer use 'V14' as its
// known-absent probe.
passCount += runAssertion(3, "unpinned milestone tag 'VUNPINNED' throws", () => {
  let threw = false;
  try { lsTreeAtClose('VUNPINNED', 'docs'); } catch { threw = true; }
  if (!threw) throw new Error("VUNPINNED did not throw");
  return 'threw as expected';
}) ? 1 : 0;
```

**Blast-radius confirmation (this session):** grepped every file importing
`MILESTONE_CLOSE_SHAS` (`check-phase-{63,69,70,73}.mjs`, `frozen-read-negative-test.mjs`) — every
access is by a specific named key (`.V113`, `.V17`, `.V17_CLOSEGATE`), never `.keys().length` or
an exact-membership enumeration. No self-test invocation site exists anywhere in the repo (`grep`
for `frozen-at-close.mjs.*--self-test` across all `.mjs`/`.yml` returns zero hits) — the `6/6`
tally is cited only as PROSE in `.planning/` docs (139-VERIFICATION.md, STATE.md,
139-03-PLAN.md), never machine-re-checked. Adding `V14` and retargeting assertion 3 is therefore
safe against every other validator in the repo.

## Standard Stack

Not applicable in the conventional sense — this phase adds zero new dependencies. Everything used
(`node:child_process` `execFileSync`, `node:fs`, `git cat-file --batch`, `git ls-tree`) is already
present in the codebase (`_lib/frozen-at-close.mjs` already imports `execFileSync`) or is the
system `git` binary the whole toolchain already depends on.

### Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Per-file frozen reads | A new per-harness inline `git show` wrapper (the check-phase-61 pattern) | `readAtClose`/the new `readManyAtClose` in `_lib/frozen-at-close.mjs` | Centralization is the whole point of this milestone; a 17th inline reader recreates the drift class SWEEP-05 exists to delete |
| Git object parsing | A hand-rolled `cat-file --batch-check` + separate `cat-file <sha>` per file | `cat-file --batch` (single mode, content inline) | One process spawn instead of N; already measured at ~150ms for the whole v1.5 docs/ tree |
| Existence checks against a frozen tree | A `try { readAtClose(...) } catch { return false }` per-path probe | `lsTreeAtClose` (already built, Phase 139) + `Set.has()` | A catch-based existence probe re-spawns git once per candidate path; the enumeration-first design amortizes this to one spawn for the whole tree |

## Common Pitfalls

### Pitfall 1: String-offset parsing of `cat-file --batch` output
**What goes wrong:** Every file after the first multibyte character (em-dash, curly quote) reads
corrupted or truncated content.
**Why it happens:** `execFileSync` with `encoding: 'utf8'` returns a decoded JS string; string
`.length` counts UTF-16 code units, not bytes, but the `<size>` field in the batch header is
BYTES. `docs/_glossary-android.md` measured 29438 JS-string chars vs 29528 bytes this session.
**How to avoid:** Never pass `encoding` to the `execFileSync` call for `cat-file --batch`; keep
the raw `Buffer`, use `Buffer.indexOf`/`.subarray`, and only call `.toString('utf8')` on the
already-byte-correct slice.
**Warning signs:** Content that looks right for the first ~N files then degrades into garbage or
throws a JSON.parse error partway through a batch (the sidecar, appended last in the batch list,
is a canary for this class of bug).

### Pitfall 2: Treating `walkMd`'s return contract as "whatever's convenient"
**What goes wrong:** `relNormalize(abs)` (used at every call site) silently returns a wrong or
empty string if `walkMd` starts returning repo-relative paths directly instead of the
cwd-prefixed absolute-looking strings it has always returned.
**Why it happens:** `lsTreeAtClose` returns repo-relative paths; it is tempting to have the
converted `walkMd` pass those straight through to save a `join()` call.
**How to avoid:** Always re-wrap `lsTreeAtClose`'s output with `join(process.cwd(), relPath)`
inside the converted `walkMd`, exactly as documented in Phase 139's own D-35 warning ("NOT a
drop-in replacement for walkMd").
**Warning signs:** `androidDocPaths()`/`appleBusinessDocPaths()` etc. return paths still prefixed
with a leading absolute drive letter or an un-stripped `process.cwd()` fragment after
`relNormalize` runs.

### Pitfall 3: Converting the C17 guard in v1.15–v1.18
**What goes wrong:** Converting the 5th `existsSync` guard to check `FROZEN.has(CONTRACT)` makes
the C17 spawn silently skip on every harness whose frozen tree predates `c17-eee-contract.mjs`'s
Phase-115 authoring — a false FAIL that has nothing to do with the actual corpus-content
assertions C17 performs, and pre-empts Phase 143's ownership of that leg.
**Why it happens:** D-01's "convert all three chokepoints" instruction reads as a blanket rule;
this is the one documented exception.
**How to avoid:** Leave this specific guard and its subprocess spawn on live `existsSync` and
`execFileSync`, with an explicit comment (see Finding 2) and a corresponding line in the D-14
amendment text.
**Warning signs:** A converted v1.15–v1.18 harness that used to report C17 PASS starts reporting
C17 FAIL with no corpus change — check whether the 5th guard was accidentally converted.

### Pitfall 4: Conflating "sidecar absent" with "sidecar malformed"
**What goes wrong:** A JSON.parse failure on a corrupt-but-present sidecar starts throwing
(crashing the harness) instead of degrading, when D-07 only asked for fail-loud on ABSENCE.
**Why it happens:** It's tempting to fold both failure modes into one `throw` for simplicity.
**How to avoid:** Keep the existing `try { JSON.parse } catch { degrade }` block exactly as-is;
only the presence check (`raw === undefined || raw === null`) becomes a throw.
**Warning signs:** A harness that used to log `_parseError` in its ALLOWLIST object and continue
now crashes outright on a sidecar with a trailing comma or similar cosmetic JSON defect.

### Pitfall 5: Reading SC#2 evidence off `check-phase-60`'s overall exit code
**What goes wrong:** A verification write-up claims SC#2 is unproven because `check-phase-60.mjs`
still exits 1 standalone.
**Why it happens:** `check-phase-60` bundles V-60-23 (the harness-timeout check, this phase's
subject) together with V-60-12..22 (chain-member regression guards that stay red until Phase 141's
RED-03) in one summary exit code.
**How to avoid:** Grep the specific `V-60-23` output line, not the process exit code, and pair it
with a direct wall-clock measurement of the harness alone (see Finding 5).
**Warning signs:** A plan's verification step runs `node scripts/validation/check-phase-60.mjs &&
echo PASS` and reports SC#2 blocked because that command legitimately still fails today.

### Pitfall 6: Assuming the Stop-hook's D-31 defect is reproducible against current code
**What goes wrong:** Time spent "fixing" a bug in `.claude/hooks/v1.20-carve-gate.cjs` that the
current committed code does not exhibit (this session's direct trace of `computeDecision()` and a
live re-run both show a clean exit-0 path with no fall-through to `block()`).
**Why it happens:** D-31's description may describe a transient state during Phase 139's own
execution (an earlier version of `carve-gate.mjs`, or a scratch-file race) that no longer
reproduces against the final committed pair of files.
**How to avoid:** Re-run the hook's self-test (`node .claude/hooks/v1.20-carve-gate.cjs
--self-test`) and a real `node scripts/validation/carve-gate.mjs --json` before assuming a code
change is needed; if genuinely unreproducible, still land the cheap defensive hardening (treat a
JSON-parse failure on the gate's stdout as fail-open, matching every other failure mode in this
file, rather than defaulting to a populated block message) since it costs nothing and directly
serves D-31's stated intent either way.

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| git | `cat-file --batch`, `ls-tree`, `show` (the entire frozen-read mechanism) | Yes | present on PATH (verified — all `git` invocations in this research session succeeded) | none needed |
| node | Harness execution, `_lib/frozen-at-close.mjs` | Yes | present, ESM (`.mjs`) supported | none needed |

No missing dependencies. This phase adds no new tool or package requirement.

## Security Domain

Not applicable in the ASVS sense — this phase edits internal CI-validation tooling (Node scripts
reading git objects and local files) with no network input, no authentication boundary, no user
input, and no secrets. The one relevant control already exists and is preserved by this design:
every git invocation in `_lib/frozen-at-close.mjs` uses `execFileSync('git', [argv...])` with an
argument array, never a concatenated shell string (the repo-wide convention `carve-gate.mjs`'s own
header calls out) — the new `readManyAtClose` follows the same pattern (`execFileSync('git',
['cat-file', '--batch'], {input, ...})`), and the batch `input` is fed via stdin rather than
command-line interpolation, so no path or SHA value is ever shell-parsed.

## Sources

### Primary (HIGH confidence — read directly this session)
- `scripts/validation/_lib/frozen-at-close.mjs` (full read) — pin registry, `readAtClose`,
  `lsTreeAtClose`, `frozenCause`, self-test assertions
- `scripts/validation/v1.4-milestone-audit.mjs`, `v1.4.1-milestone-audit.mjs`,
  `v1.5-milestone-audit.mjs`, `v1.6-milestone-audit.mjs`, `v1.15-milestone-audit.mjs` (full or
  partial reads) — per-family chokepoint coordinates
- `scripts/validation/check-phase-60.mjs` (full read) — three timeouts, NESTED guard, CHAIN_PHASES
- `scripts/validation/carve-gate.mjs`, `.claude/hooks/v1.20-carve-gate.cjs` (full reads) — gate
  scope, amendment enforcement, hook decision logic
- `.planning/milestones/v1.20-CARVE.md` (full read) — allowlist categories, amendment procedure
- `.planning/phases/140-frozen-aware-harness-conversion/140-CONTEXT.md`,
  `.planning/REQUIREMENTS.md`, `.planning/STATE.md`, `.planning/ROADMAP.md` (full reads)
- Live command execution this session: `git show`/`git ls-tree`/`git cat-file --batch` timing and
  framing measurements (all reproduced in the Findings section with literal command + output)

### Secondary (MEDIUM confidence)
- `scripts/validation/check-phase-58.mjs`, `check-phase-73.mjs`, `check-phase-120.mjs`,
  `check-phase-133.mjs`, `check-phase-67.mjs`, `check-phase-68.mjs`, `check-phase-66.mjs`,
  `check-phase-48.mjs`, `check-phase-70.mjs` (partial reads, targeted grep) — GOV-02 pin census

### Tertiary (LOW confidence — not independently reproduced this session)
- None. Every `[MEASURED]` figure quoted from CONTEXT.md that this document relies on was either
  independently re-executed this session (SHA candidate testing, batch timing, byte-vs-char
  length) or cross-checked against a direct file read (line coordinates, guard counts).

## Metadata

**Confidence breakdown:**
- Loader design (Finding 1): HIGH — the `cat-file --batch` framing was empirically reproduced
  against this repo's own frozen objects this session, including the missing-object case and the
  em-dash byte/char divergence.
- Per-family conversion recipe (Finding 2): HIGH — every one of the 16 in-scope harness files was
  directly grepped for its actual `readFile`/`walkMd`/guard/`parseAllowlist` line numbers this
  session, not sampled.
- GOV-02 pin safety (Finding 3): HIGH — the "no exact line-number indexing" claim was verified by
  a negative grep across all 13 named pin-holding files.
- CARVE amendment scope (Finding 4): HIGH — verified by re-reading `v1.20-CARVE.md`'s actual
  allowlist categories against this phase's actual edit list, and by running `carve-gate.mjs`
  live.
- V14 pin / self-test retarget (Findings 5-6): HIGH for the mechanics (blast-radius grep, sidecar
  and sentinel spot-check at `0b3be9ab`); the SHA CHOICE itself is CONTEXT.md's own D-19, already
  orchestrator-verified 5x — this research did not re-run the full 5-candidate comparison but did
  independently confirm the winning candidate's sidecar presence and sentinel line coordinate.

**Research date:** 2026-08-06
**Valid until:** Until Phase 140's plan lands (this is an implementation-mechanics document for a
specific, already-scoped phase, not a general technology survey — it does not expire on a
calendar timescale, but goes stale the moment any in-scope harness file is edited by a different
change).
