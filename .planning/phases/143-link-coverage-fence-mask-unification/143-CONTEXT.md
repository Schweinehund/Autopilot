# Phase 143: Link Coverage & Fence-Mask Unification - Context

**Gathered:** 2026-08-11
**Status:** Ready for planning

<domain>
## Phase Boundary

The milestone's **corpus-integrity** layer. `docs/` acquires a corpus-wide relative-link and
anchor checker that models **GitHub's** real anchor semantics, exits 0 with **no accepted-violation
baseline of any kind**, and every genuine break it finds is repaired. Separately, fence-masking
behaviour is unified across all 15 call sites in 9 files via a `^ {0,3}` CommonMark-equivalent
rule, with c17 proven count-identical before and after.

**This phase authors no new documentation content.** Every corpus edit is a *repair* — a link
re-pointed, an anchor fragment dropped, or an `<a id>` added to an existing table row. The CARVE
Standing bar (`v1.20-CARVE.md:183-185`, "never new documentation content") is in force and was the
governing constraint on the remedy design (D-12).

**This phase authors no `check-phase-143.mjs`.** Validators are the close phase's indivisible atom;
Phase 143 hands off a needle-spec (D-16).

Requirements in scope: LINK-01, LINK-02, LINK-03, LINK-04, LINK-05, LINK-06.

</domain>

<decisions>
## Implementation Decisions

Produced by `/grill-me` codebase interrogation followed by a scored `/adversarial-review`
(**4 parallel Finders → Adversary → Referee**). **63 findings raised (286 Finder points); the
Adversary disproved 5; the Referee confirmed 60, overturned 3, and reversed the Adversary on 2 of
its 3 critical disproves.** The review **reversed five of the draft's recommendations** and
surfaced one defect class no branch of the interrogation had considered (D-01).

**Measurement declaration — read before trusting any `[MEASURED]` row below.**
Tree: main worktree (NOT a clone — Phase 142 D-36 records that the same code at the same SHA
measures 16.8 s in `main` and 27.9 s in a clone). Cache: warm. Machine: quiesced, no build running.
Defender: default real-time protection ON (not excluded). Node: v24.17.0. OS: Windows 10 Pro
19045. SHA: `599a996b`. `n=3` on every count row below; all count rows were bit-identical across
the three runs. Wall-clock rows carry their own ranges — **never quote a single timing value**
(Phase 142 D-16). Rows tagged `[DERIVED]` are arithmetic over measured rows, not measurements.

Phase 142 D-36, cited correctly: it records **six** bad `[MEASURED]` rows in that phase's own
draft — **the fifth consecutive recurrence** of the bad-row class — whose root cause was **new**:
undeclared tree identity. This phase's draft repeated the pattern in a different register (see
D-25), which is why the declaration above is longer than its predecessors'.

---

### Ground truth established by interrogation

**Corpus link scan under the RATIFIED model** (GitHub slug semantics + `<a id>` recognition +
inline-code masking + `docs/_templates/` exclusion), `[MEASURED]` n=3, deterministic:

| Metric | value |
|---|---|
| files scanned / relative links | 274 / 6252 |
| broken **file targets** | **13** |
| broken **anchors** | **132** |
| **total genuine breaks** | **145** |
| distinct source files / target files / **union** | 36 / 33 / **50** |

`[MEASURED]` the same scan under the checker's *current* Pandoc `{#id}` model returns **67**
broken anchors / 80 total — the 65-link delta is D-01.

**Scope reconciliation — four scopes, all internally correct, none interchangeable.**
`[MEASURED]` n=3:

| templates | inline mask | `<a id>` | files | links | broken file | broken anchor |
|---|---|---|---|---|---|---|
| INCLUDED | off | off | 282 | 6311 | 40 | **271** |
| INCLUDED | off | on | 282 | 6311 | 40 | **70** |
| excluded | masked | off | 274 | 6252 | 13 | 268 |
| excluded | masked | on (Pandoc model) | 274 | 6252 | 13 | 67 |
| excluded | masked | on (**GitHub model — the deliverable**) | 274 | 6252 | 13 | **132** |

Rows 1–2 reproduce `REQUIREMENTS.md`'s prototype figures **exactly on all four numbers**
(6311 / 40 / 271 → 70). They are the *prototype* scope. `[DERIVED]` the deltas reconcile with zero
unexplained noise: templates add 58 links and 26 broken targets; dropping inline masking adds
exactly 1 link and 1 target (`13 + 26 + 1 = 40`; `6252 + 58 + 1 = 6311`).

**Fence census** — `[MEASURED]` **14** JS sites carrying `/^(`{3,}|~{3,})/` at
`retrofit-guide:314`, `retrofit-mermaid-structural:268,271,496`, `retrofit-nav-hub:252,255,481`,
`retrofit-reference:341`, `retrofit-runbook:262`, `retrofit-structural:378`,
`c17-eee-contract:158,166`, `check-nav-hub-links:91,94`; **+1** PowerShell site at
`convert.ps1:108`. `[DERIVED]` 15 sites / 9 files — matches REQUIREMENTS' census.

**Indented fences** — `[MEASURED]` **74** fences indented 1–3 spaces across **11** files; **0** at
4+; **0** tab-indented. Adding `docs/_templates/` and `scripts/pipeline/test-fixtures/` changes
none of these. A `^ {0,3}` rule covers 100% of live instances.

**LINK-06 gate, already computed** — `[MEASURED]` c17 at HEAD: `234 files, 0 with violations,
0 total`, all 13 counters 0. With both c17 sites rewritten to `^ {0,3}`: byte-identical output,
exit 0 both. Mask-state diff over the corpus: **46 lines change state (46 newly-masked, 0 newly
unmasked) across 11 files**, and **0** match any c17-relevant pattern across a 12-pattern set.
`[MEASURED]` the same widening applied to `check-nav-hub-links.mjs:91,94` leaves the corpus scan
byte-identical (13 / 132). Correction to a draft footnote: fence **marker** lines are never masked
under either rule (both branches leave `mask[i]=false`), so the 46-line diff *does* cover them —
they simply never flip.

**Runtime** — `[MEASURED]` `check-nav-hub-links.mjs` 0.343–0.369 s (exit 0, `0 outbound /
0 inbound / 0 total`); corpus-wide scan 0.717–0.811 s; `--self-test` 7 passed / 0 failed; c17
0.353 s. **Cost is not a constraint anywhere in this phase.**

**Vessel** — `[MEASURED]` `checkInboundLinks()` (`:253-269`) is the **only** caller of
`walkMd('docs')` (`:256`); `checkOutboundLinks()` (`:218-247`) iterates `HUB_PATHS` = **4 files**.
Per-pass link counts: `outbound=484, inbound=5827, total=6311`. `resolveLinkTarget:206-215`
already handles bare `#anchor` self-links and http/mailto exclusion; `resolvableAnchorSet:171-177`
already caches per file.

**Pin safety** — `[MEASURED]` `check-nav-hub-links.mjs` is referenced only by
`check-phase-123.mjs:40,83` via `presence()`; **no content pin**, but the **path string is
pinned**, so it must not be renamed. `c17-eee-contract.mjs` carries **four** live
`String.includes()` pins: `check-phase-115.mjs:75` (`'--self-test'`), `:88`
(`'C17 assertion-violation-counts:'`), `:102` (`'CHAIN_PHASES'` **required-ABSENT**),
`check-phase-120.mjs:97` (`'[v1.16 Phase-120 addition, comment-only]'`, whose needle text asserts
"assertion #1 byte-unchanged"). `convert.ps1` is pinned by `check-phase-113.mjs:75`
(`"$expectedVer = '3.7.0.2'"`) and `check-phase-124.mjs:70` (`'nav-footer'`). The six
`retrofit-*.mjs` are unpinned. All needles survive the planned edits — verified, not assumed.

---

### Area 1 — the anchor model (OWNER-RATIFIED 2026-08-11)

- **D-01:** The checker models Pandoc, the corpus is authored for GitHub, and 65 links are green in
  the checker while broken on GitHub. Adopt the GitHub model and fix all 65. (OWNER-RATIFIED)
  `computeAnchorSetFromContent` (`check-nav-hub-links.mjs:137-143,151-156`) registers a `{#id}`
  override verbatim **and suppresses the heading's auto-slug** — Pandoc/kramdown semantics. GitHub
  does neither: the `{#…}` renders as literal text and *participates in* the slug. `[MEASURED]`
  n=3 across 2283 anchor links: **65 CHECKER-GREEN / GITHUB-BROKEN, 0 in the reverse direction.**
  Worked example: `docs/l1-runbooks/30-linux-enrollment-failed.md:53` links
  `(#cause-a-package-install)`; the target heading at `:63` is
  `## Cause A: Package Install Failure {#cause-a-package-install}`, whose real GitHub slug is
  `cause-a-package-install-failure-cause-a-package-install`.
  **The "pandoc is the authoritative renderer" escape was tested and is dead on three independent
  legs:** (a) `docs/_standards/EEE-SOP-standard.md:278` — citations are *document-level*, "no
  section or page anchors", so anchors do not exist in the `.docx` deliverable at all;
  (b) `PROJECT.md:759` — "plain-GitHub anchor slugs preserved"; (c) `[MEASURED]` pandoc 3.7.0.2
  emits **no `w:bookmarkStart`** for an `<a id>` in a table cell, so even a Pandoc-authoritative
  reading gives the anchors nothing. Shipping LINK-04 on the current model would hard-code a
  65-link **invisible** baseline under a criterion that says "no accepted-violation baseline of any
  kind" — the exact disposition class this milestone exists to delete.
  — **Reversibility:** one-way — the model change is what makes the 65 visible; reverting it after
  the corpus is repaired would re-hide nothing but would silently re-admit the class.

- **D-02:** DELETE the draft's "`{#id}` is barred" `[MEASURED]` row — it is false about the corpus.
  `[MEASURED]` `grep -rcE '\{#[a-zA-Z0-9_-]+\}' docs` → **87 occurrences across 29 files**, all on
  heading lines. The convention (plain GitHub auto-slug, no `{#id}` overrides) is genuinely
  ratified — `102-RESEARCH.md:360`, `103-RESEARCH.md:408`, and `91-RESEARCH.md:88` which states
  the override "renders literally in the heading as visible characters, does NOT set the anchor".
  It is **ratified but never enforced**. Say that; do not use "barred" as a premise. Phase 123's
  CR-01 fix justified itself on "Kramdown/GFM anchor semantics generally" — wrong for GFM, and
  that is the root cause of D-01.

- **D-03:** The residual anchors are genuine corpus defects — do NOT attempt a further model
  widening. Verified on four cases independently. This is the `V-132-HUBSNOTWIRED` false-negative
  class: a model change that "resolved" a genuine break would be a false-negative generator.
  **Correction to the draft:** its fourth cited case was wrong —
  `docs/lifecycle-apv2/00-overview.md:40` **does** carry
  `## Enrollment Time Grouping (ETG) -- The Core Mechanism`; the link is stale by exactly one
  inserted token (`etg`), not pointing at an absent heading. Re-audit every "no target" claim
  before acting on it; a stale-by-one-token anchor and a missing section have opposite remedies.

- **D-04:** Remedy direction is per-class, and "add the missing section" is BARRED.
  (OWNER-RATIFIED) Class C (token present in an existing table row) → **target-side `<a id>`** on
  that row: a repair to an existing row, not new content, and `<a id>` is precisely what LINK-01
  teaches the checker to resolve. Class B/A (a correct target exists under a different slug) →
  **source-side link rewrite**. Class D (no correct target exists) → **drop the fragment and link
  to the file**. Nothing in this phase authors prose. See D-12 for the governing bar.

- **D-05:** Class B and C are NOT disjoint, and the draft's 46/12 split was an if/else ORDERING
  artifact. `[MEASURED]` re-running the classifier with C tested before B moves nine anchors:
  `{A:1, B:3, C:48, D:15}` vs `{A:1, B:12, C:46, D:8}`. `#intune` satisfies both tests. Since D-04
  routes B and C to **opposite** remedies, the planner must define the classes disjointly or state
  an explicit precedence rule — an order-dependent split silently picks the remedy.
  `[MEASURED]` class-C token locations under a fence-masked, hyphen-exact test: table-row-only 36,
  prose-only 6, both 5 — so **6 members have no table row to anchor** and D-04's class-C remedy
  does not reach them.

- **D-06:** `#intune` is a false friend — the prefix match is not a semantic match. `[MEASURED]`
  `docs/_glossary.md` has **no** `### Intune` entry; it carries `### Intune Management Extension
  (IME)` and `### Intune Provisioning Client`. Under D-04 and D-12 the remedy is de-anchor, not
  "add a real `### Intune` entry". Clean class-B substitutions that DO hold:
  `#enrollment-status-page` → `#esp`, `#self-deploying` → `#self-deploying-mode`, `#entra` →
  `#entra-id-sso`. `[MEASURED]` these are human substitutions, not classifier output — for
  `#enrollment-status-page` the classifier's prefix match is `## Enrollment`, not `### ESP`. The
  false-friend count is **5 of 12**, not 4.

- **D-07:** `<a id>` precedent is BROADER than the draft claimed, which strengthens D-04.
  `[MEASURED]` **201** `<a id=` in the corpus, **146** in `admin-setup-android/` +
  `android-lifecycle/` and **55 outside**, including macOS runbooks 11–14,
  `l1-runbooks/02-esp-stuck-or-failed.md`, `21-ios-compliance-blocked.md` and
  `ios-lifecycle/01-ade-lifecycle.md`. It is a corpus-wide convention, not an Android-family one.
  `[MEASURED]` **0** `<a name=` anywhere.

- **D-08:** `<a id>` insertions are c17-safe (measured, not hedged) but are NOT proven in the
  `.docx`. `[MEASURED]` 10 real `<a id>` applied to `docs/error-codes/01-mdm-enrollment.md` left
  c17 at `234 files / 0 violations / 0 total` and dropped residual anchors 67→56; neither
  assertion #11 (table rows) nor #12 (blockquote length) is sensitive to raw HTML in a cell.
  **But** `[MEASURED]` pandoc 3.7.0.2 emits **no `w:bookmarkStart`** for a table-cell `<a id>`,
  leaving `<w:hyperlink w:anchor="…">` pointing at a nonexistent bookmark. Per D-01(a) the `.docx`
  deliverable uses no section anchors at all, so this is **not a defect** — but a bundle build
  exiting 0 must never be presented as evidence the anchor works in the deliverable.

- **D-09:** 132 is stable across LINK-03 — verified, not assumed. `[MEASURED]` 6 of the 11
  `docs/_glossary-macos.md` over-escapes carry anchor fragments that are **never evaluated today**
  (`check-nav-hub-links.mjs:236-241` `continue`s when the target file is missing), so the figure
  was structurally a pre-LINK-03 count. All three target headings resolve under the GitHub model at
  `docs/macos-lifecycle/02-mdm-migration-psso.md`, so LINK-03 adds **0** new anchor failures.
  Re-measure after LINK-03 anyway before writing any number into a permanent amendment.

- **D-10:** Class C is not purely mechanical — name the editorial calls. `[MEASURED]`
  `0x80180014` occupies two rows (`01-mdm-enrollment.md:33,34`) and `0x801c03ea` two rows
  (`02-tpm-attestation.md:34,35`); which row carries the anchor is an editorial choice.
  `[DERIVED]` the 36 error-code deep links need only **29** distinct anchors (7 codes are linked
  from two places), so "36 edits" overstates. Verbatim-fragment anchoring also bakes in a
  mixed-case artifact — `02-tpm-attestation.md:33` is `0x801C03F3`, `:34` is `0x801c03ea`, and the
  incoming fragments mirror both.

### Area 2 — checker vessel

- **D-11:** Extend `check-nav-hub-links.mjs` IN PLACE. Do not create a net-new file. Do NOT rename
  it. It already walks and fence-masks the whole corpus; coverage is condition removal, not new
  machinery. It is already CARVE Category 3, so no allowlist amendment is needed *for the vessel*
  — avoiding a third recurrence of the absent-from-allowlist trap (Phase 141 D-12
  `check-phase-67`, Phase 142 D-10 `check-phase-138`). `check-phase-123.mjs:40` pins its **path
  string**, so a rename breaks a frozen call site while an in-place edit is safe.
  **Struck from the draft:** the "this avoids a CARVE amendment" *cost* argument is void — D-19
  mandates a CARVE amendment commit this phase regardless, so one more glob in the same commit is
  free. The decision stands on the vessel analysis alone.
  `[MEASURED]` the rename/reword cost is larger than "one comment header": stale strings at
  `:2-7`, `:9-12`, `:26`, `:82-84`, `:249-252`, `:397-398`, plus **runtime output** at `:406`,
  `:410`, `:414`, `:419-420`, which would otherwise print "N inbound failure(s)" for a 274-file
  corpus scan.

- **D-12:** Corpus coverage requires deleting TWO conditions — `:269` AND `:259` — and the plan must
  name which function survives. The draft's D-08 was WRONG and is withdrawn.
  `:269` (`if (!hubSet.has(resolvedRel)) continue;`) filters by *target*; `:259`
  (`if (hubSet.has(relPath)) continue;`) skips the 4 hubs as *sources*. The draft said "retire the
  inbound pass" — but `checkInboundLinks()` **is** the only corpus scan, and retiring it collapses
  coverage to 4 files, failing LINK-02 outright. The draft's justifying sentence ("post-widening
  every file is both source and target, so the two scans converge") is **false while `:259`
  stands**: the two scans *partition* the corpus by source, 4 files vs 274.
  `[MEASURED]` deleting `:269` alone yields `0 outbound failure(s), 311 inbound failure(s)` — all
  311 from inbound, outbound contributing 0; the 4 hubs' **484** relative links are covered only by
  `checkOutboundLinks()`. Whichever single pass survives, it must scan every file as both source
  and target.
  — **Reversibility:** costly — the surviving pass's report format and exit semantics are what
  Phase 144's needle-spec pins.

- **D-13:** Preserve the `hub file not found` hard-fail and rule on `HUB_PATHS`.
  `checkOutboundLinks:222-224` pushes a failure when a hub file is missing; `checkInboundLinks:261`
  merely `continue`s. Collapsing to one pass silently deletes the only assertion that the four
  ratified hubs **exist**, and makes the "D-01 locked" `HUB_PATHS` roster (`:26-32`) dead code.
  Preserve the existence check explicitly or retire the roster consciously — not by omission.
  `[MEASURED]` the `--self-test` is unaffected: all 7 assertions exercise only `githubSlug`,
  `computeAnchorSetFromContent` and `resolveLinkTarget`; none touches `HUB_PATHS` or either scan.

- **D-14:** Ordering is LINK-01 → `_templates` exclusion → inline-code masking → corpus flip.
  Flipping first produces a **311**-finding red interval with no diagnostic value. `[MEASURED]` the
  inline-mask leg is load-bearing: without it broken file targets go 13 → **14**, the extra being
  `docs/recipes/03-windows-11-multi-app-kiosk.md:173`'s
  `` `$x = [xml](Get-Content .\kiosk.xml -Raw)` `` — a PowerShell cast inside a backtick span read
  as a markdown link. **Correction:** the draft's "268 + 40" mixed processed and raw counts; the
  real bare-flip figure is **311** (271 anchor + 40 file).

- **D-15:** Two scan-scope hazards the draft missed, both currently masked by `:269`.
  (a) `[MEASURED]` **14** links resolve outside `docs/` and exactly **one** target exists —
  `docs/_glossary-linux.md → ../.planning/research/PITFALLS.md`. `.planning/` is *deliberately*
  outside `carve-gate`'s `IN_SCOPE_PREFIXES`; rule on whether it is in the checker's scope.
  (b) `relNormalize:75-80` strips only a `cwd` prefix, so a target above `cwd` stays absolute and
  `readFile`'s `join(cwd, 'D:/…')` yields a bogus "anchor not found". 0 instances today; `:269` is
  what suppresses the class, and D-12 removes `:269`.

### Area 3 — fence-mask unification

- **D-16:** Verbatim `^ {0,3}` into all 15 sites; do NOT create `_lib/fence-mask.mjs` — but the
  draft's REASONS are struck. `[MEASURED]` `scripts/validation/_lib/` already holds three shared
  modules imported **92 times** (`frozen-at-close.mjs` 43, `exec-fail-detail.mjs` 33,
  `archive-path.mjs` 24), plus `scripts/pipeline/lib/ooxml.mjs` — the shared-lib idiom is the
  **incumbent** one for small pure helpers, not a novel structure. And "PowerShell cannot import an
  `.mjs`" is not decisive: `build-publish-bundle.mjs:248,263,482` already crosses that boundary via
  `execFileSync('pwsh', …)`. The decision survives on the **real** cost — a `node` spawn per
  document across 221+ sequential `convert.ps1` invocations adds ≈60 s to every bundle build — and
  on the fact that a shared lib still cannot cover `convert.ps1` without that spawn, leaving the
  outlier LINK-05 exists to end. **Record the honest counter-argument:** copy-verbatim is what
  caused this drift, and this decision re-arms the next occurrence. That trade is accepted here,
  not denied.
  — **Reversibility:** costly — undoing means touching all 15 sites again across 9 frozen files,
  each needing its own GOV-02 ledger row (D-19).

- **D-17:** `convert.ps1` is a TIGHTENING on three axes, not a widening — its own ledger row.
  `[MEASURED]` `convert.ps1:108` is `'^\s*(```|~~~)'`, which already matches (a) 4+-space and
  (b) tab indents, and — because .NET `\s` covers `\p{Z}` — (c) NBSP / U+2000–U+200A / U+3000.
  `^ {0,3}` narrows all three. `[MEASURED]` 0 live instances of any, so it is behaviourally
  identical on today's corpus. It must **not** be described as "the same change applied 15 times".
  Resolve the evidence asymmetry the draft left: D-08 demands a bundle re-run for `<a id>` edits
  while proposing none for editing `convert.ps1`'s fence loop, which feeds the D-03(b) fail-closed
  guard at `:129`.

- **D-18:** Two further unification axes exist and are DEFERRED with names.
  (a) **Fence length** — `[MEASURED]` `convert.ps1:110` closes via
  `TrimStart().StartsWith($fenceChar)` where `$fenceChar` holds only the 3-char prefix, so a
  4-backtick opener is closed by a 3-backtick line; the 14 JS sites track `fenceLen` and require
  `>=`. (b) **Mask scope** — `retrofit-mermaid-structural.mjs:422` and `retrofit-nav-hub.mjs:406`
  mask the whole file including frontmatter, while `c17:150` and the six first-H1 scanners run over
  post-frontmatter `bodyLines`. LINK-05's subject is *indentation*. Carry both forward under the
  token **`FENCE-AXIS-02`** (every other carry-forward in this repo has a token: `SWEEP-09`,
  `DEFER-121-07-B`, `CARVE-1`).

- **D-19:** → renumbered, see Governance. D-19 below is the fence-census correction.

- **D-20:** The fence census is scoped to a REGEX LITERAL, not to fence behaviour — record the
  divergent sites it misses. `[MEASURED]` after this phase the repo still holds:
  `check-phase-66.mjs:274` — `if (/^\s*```/.test(ln)) { inFence = !inFence; return; }`, a live
  fence tracker in a **frozen chain validator** (CARVE Category 5, runs in every apex) using `^\s*`
  and a bare toggle with no `fenceChar`/`fenceLen`; **12** unanchored strip sites
  (`.replace(/```[\s\S]*?```/g,'')`) across `check-phase-54/55/56/57/58/59`; and
  `carve-gate.mjs:65`, whose allowlist parser tolerates an indented opener but requires a column-0
  closer, with a **hard throw**. Plus column-0-only detectors at `check-phase-135:128`,
  `-136:216`, `-55:345`, `-122:44`. Rule each in-scope or as a named carry-forward — do not let
  LINK-05 claim a unification the repo does not have.

- **D-21:** Unify the MASK only; leave detection regexes at column 0. The "widening creates an
  evasion" objection is PRE-ANSWERED and must not recur. `[MEASURED]` on unmodified HEAD c17, a
  **column-0** `~~~` wrapper already suppresses assertions #1–#5 today with zero code changes — the
  capability is pre-existing and `^ {0,3}` only adds an indented spelling of it. Further, `^ {0,3}`
  is a **CommonMark conformance fix**: an indented fence *is* a real fence and its interior *is*
  real code, so masking it is the checker becoming correct. And a whole-body wrapper does not even
  pass — `[MEASURED]` it trips #2/#4/#5/#7/#9, so c17 is not vacuously maskable. Deferring the c17
  sites would breach LINK-05 and ROADMAP SC#4, which name `:158` and `:166` explicitly. Record the
  residual honestly: `c17:209` and `retrofit-*:423`'s `/^```mermaid/` stay column-0, so an indented
  ```` ```mermaid ```` opens a mask but escapes assertion #1 — `[MEASURED]` **0** mermaid fences of
  any indentation exist in `docs/`.

- **D-22:** LINK-06's evidence needs THREE legs, not the draft's ranking of two.
  (a) c17 count-equality before/after (234/0/0, all 13 counters 0). (b) The 46-line mask-state diff
  with 0 c17-relevant matches. (c) **NEW — an assertion-#5 leg the draft's pattern set cannot
  reach:** `c17:259-264` is a *content-agnostic word count* over any unmasked line in a
  `## Summary` section, so a newly-masked line of plain prose changes #5's input while matching
  none of heading/table/blockquote/mermaid. For #5, count-equality is the **only** evidence.
  `[MEASURED]` the closing figure: **0** newly-masked lines fall inside a `## Summary` section.
  Also: (d) `[MEASURED]` add the missing null result for `check-nav-hub-links.mjs:91,94` — 2 of the
  15 sites get the mask widened and the draft carried no evidence for them; the corpus scan is
  byte-identical. Note `c17:352,355` detects table rows with `.trim().startsWith('|')`
  (indentation-insensitive) — a probe written `/^\|/` under-detects.

### Area 4 — enforcement surface (OWNER-RATIFIED 2026-08-11)

- **D-23:** Phase 143 authors + self-tests + runs the checker to green; Phase 144 wires it into
  `check-phase-143.mjs`, NOT into the harness as a C18. (OWNER-RATIFIED) `check-phase-139..NN.mjs`
  is booked **verbatim** by HARN-18, and `check-phase-119.mjs:148` is the validator-layer spawn
  idiom (`execFileSync('node', [TOOL], { stdio: 'pipe', timeout: 300000, cwd: process.cwd() })`).
  This needs **no** scope amendment, runs inside the apex chain, and adds **no** second permanent
  live-HEAD leg to the harness lineage — the frozen-awareness debt class SWEEP-05/Phase 140 just
  paid down. Phase 143 authors no `check-phase-143.mjs`; it hands off a needle-spec.
  **The draft's C18 harness fold is WITHDRAWN as unauthorized:** ROADMAP Phase 144 SC#2 pins
  `v1.20-milestone-audit.mjs` as "(Path-A from v1.19, **C1-C17 inherited**)" and Phase 144's
  discuss-phase flags read "None (closing cluster; consumes prior decisions)". This project reads
  that phrasing as authorization-limiting **in its own words** — `93-CONTEXT.md:51`: "**No C17** —
  v1.11 ROADMAP locks 'C1–C16 inherited' with **no C17 conditional hook at all**", repeated at
  `95-CONTEXT.md:64`. C17 itself landed only because v1.15 **pre-booked** it under HARN-01 + D-119,
  with `check-phase-115.mjs:98-105` *actively failing* if the contract self-registered. Phase 143
  has no equivalent booking. Note also `check-phase-115.mjs:102` pins `'CHAIN_PHASES'` as
  **required-ABSENT** in `c17-eee-contract.mjs` — the same class of constraint would bind here.
  — **Reversibility:** costly — Phase 144's validator must carry the spawn forward or enforcement
  evaporates, exactly as it did for this checker between Phases 123 and 143.

- **D-24:** "Inert for 20 phases" is FALSE — the draft's causal premise is struck. `[MEASURED]`
  the checker has been run as a plan-level `<automated>` gate and verifier spot-check in Phases
  **123, 130, 135 and 137**; `137-VERIFICATION.md:27` scores **SC5** on it
  (`0 outbound / 0 inbound / 0 total`) and `:70` lists it as a PASS gate. The real gap is **CI
  wiring only**, not a missing hand-off. Two related corrections: `[MEASURED]` only **5 of 16**
  harnesses contain `c17-eee-contract` (v1.15–v1.19), so a harness fold would have bought **one**
  workflow, not 16; and "its only reference anywhere is check-phase-123's presence check" is false
  — the true claim is **zero *executing* references outside `.planning/`**.

- **D-25:** Trigger-blindness is the real enforcement gap, and it survives D-23. Name it.
  `[MEASURED]` `audit-harness-v1.19-integrity.yml:22-33` — the template the 17th workflow copies —
  filters `pull_request` on `scripts/validation/v1.19-*`, `check-phase-*.mjs`, the workflow file
  and `.planning/REQUIREMENTS.md`; **10 of 16 workflows carry zero `docs/` path filters**. A
  `docs/**`-only PR — i.e. **every link-breaking change** — matches no filter and fires nothing.
  Real cadence is weekly cron + `workflow_dispatch`. State this explicitly so nobody reads
  "enforced" as "per-change". A Stop-hook is still rejected: `v1.20-CARVE.md:83-85` rules that a
  Stop-hook "is advisory, **not the enforcement mechanism itself**", and `[MEASURED]` three hooks
  already exist, so a new one would be the **fourth**.

- **D-26:** Add the late-discovery mitigation the draft missed. Phase 144 is terminal and blocked
  on 139–143; if the wiring turns the checker red there, no phase remains to absorb it and the
  milestone bar ("both accepted-red dispositions **deleted**") is what would give. `[MEASURED]` at
  0.34–0.81 s the checker can ride HARN-19's 3-axis terminal re-audit as a spot-check **regardless**
  of whether the `check-phase-143.mjs` wiring lands — decoupling the close from the wiring's
  success. Route the hand-off through a row in `.planning/milestones/v1.20-DEFERRED-CLEANUP.md`,
  the established instrument, not through prose.

- **D-27:** Phase 143's own verification is goal-backward — "enforced" is a real risk, not
  hygiene. ROADMAP Phase 143's goal says the corpus has "durable, **enforced**" coverage, and
  `gsd-verifier` scores Goal Achievement / Observable Truths against the *goal*, not only the SC
  list (see `142-VERIFICATION.md`). Deferring enforcement risks failing Phase 143 itself, which
  hard-blocks Phase 144. Also separate the two requirements: "exits 0" is **LINK-04's** wording
  only — **LINK-02** carries no exit-0 clause and is the requirement most exposed by deferral.
  `[MEASURED]` a manual run **is** an accepted evidence standard here: `142-VERIFICATION.md`
  discharges "check-phase-30 exits 0 standalone" by exactly a live `node …` run.

### Governance (OWNER-RATIFIED 2026-08-11 — amend and absorb in Phase 143)

- **D-28:** The roadmap's "Discuss-phase flags: None dominant" is FALSE and is amended. It rested
  on "LINK-01's precedence and LINK-04's no-baseline rule are already settled by the requirement
  text". Both *are* settled. What no requirement, success criterion or CARVE category addressed is
  the **145 genuine breaks** (13 file targets + 132 anchors) that LINK-04 requires be cleared with
  no baseline — of which 65 were invisible to the checker entirely (D-01).

- **D-29:** Amendment surfaces — SEVEN statements, not one. The draft named only LINK-03.
  Amend: (1) `REQUIREMENTS.md` **LINK-03** (from "the 13 genuine broken links" to "the 13 genuine
  broken **file targets** and the **132** genuine broken **anchors**"); (2) `REQUIREMENTS.md:59`'s
  sequencing note (the 6311 / 40 / 271 / 70 / 74% figures); (3) ROADMAP Phase 143 **SC#1**;
  (4) **SC#2**; (5) **SC#3**; (6) the Phase 143 **Goal** line; (7) the Phase 143 **Discuss-phase
  flags** line. Phase 141 D-28's precedent is "six statements, three documents" — this is seven.
  **SC#1 specifically:** carry **both** scope-tagged pairs — `271 → 70` (templates included, no
  inline mask — the discarded prototype) and `268 → 67 → 132` (the LINK-02 scope, Pandoc then
  GitHub model). Under D-14's own ordering **no state of the shipped checker ever emits 271 or
  70**, so a verifier re-deriving SC#1 from the deliverable reads it as unmet. Update "74%" → 75%.

- **D-30:** Use the ratified amendment INSTRUMENT, on all three surfaces. The in-line marker pair
  `**[SUCCESS-CRITERION AMENDMENT, D-NN]**` (mechanism withdrawn) and `**[DISCHARGED, D-NN]**`
  (met as written); the **annotate-and-supersede, never overwrite** rule (Phase 141 D-23); **and**
  a bullet per amendment in `v1.20-CARVE.md`'s "Recorded scope amendments" section — which is what
  Phase 144's close-gate actually reads, not the in-line markers (Phase 142 D-33).

- **D-31:** Commit sequence is D-19's THREE steps, not the draft's fused two.
  (1) SC-amendment commit → (2) CARVE amendment commit touching **only** `v1.20-CARVE.md` →
  (3) the edits. Phase 142 D-19 exists precisely because a draft claimed "alone and first" for two
  commits without ordering them; this draft went further and fused them. `carve-gate` **cannot**
  detect the fold — `.planning/` is outside `IN_SCOPE_PREFIXES` (`carve-gate.mjs:36`) — so the
  discipline is not gate-enforced and must be executed deliberately.

- **D-32:** CARVE Category 10 roster — `[MEASURED]` 50-file union, of which 3 are already on
  Category 8, so ~46-47** need listing.** The draft's "35 distinct after overlap" was wrong on
  both legs (the anchors-only union is 30 with overlap 6, not 35 with overlap 1; and it omitted
  the file-target set entirely). Directory spread of the Category-10 roster: `l1-runbooks` 8,
  `l2-runbooks` 7, `error-codes` 6, `docs/` root 4, `admin-setup-android` 3,
  `operations/co-management` 3, `operations/patch-management` 3, `reference` 3, `android-lifecycle`
  2, then singletons in `admin-setup-apv2`, `admin-setup-linux`, `admin-setup-macos`,
  `cross-platform/apple-business`, `lifecycle-apv2`, `linux-lifecycle`,
  `operations/app-lifecycle`. **Re-derive the exact roster at plan time after LINK-03 lands**
  (D-09) — an off-list path is a hard exit 1 with no warn-and-continue path (CARVE D-10). Note
  `docs/_glossary-macos.md` **is** already on Category 8; the draft's "no category covers any of
  them" was false. Also check `.gitattributes` and `package.json`: both are `IN_SCOPE_EXACT`
  (`carve-gate.mjs:37`) with **no** matching allowlist category — if the phase touches either it
  hard-blocks.

- **D-33:** The GOV-02 ledger is MANDATORY and the draft omitted it entirely. CARVE D-12
  (`v1.20-CARVE.md:93-113`) requires a target-scoped **path-string grep** *and* a row in
  `.planning/milestones/v1.20-GOV-02-LEDGER.md` (schema
  `File | Grep command | Hit count | Regression gate run | Result | Plan`) **before** editing any
  frozen path. Phase 143 edits **9** Pillar-C files plus the corpus set plus
  ROADMAP/REQUIREMENTS — roughly **11+ rows**. `[MEASURED]` the 8 non-checker Pillar-C files carry
  **121** external references between them (`c17-eee-contract.mjs` 74, `convert.ps1` 19, the six
  retrofits 2–7 each). The draft performed the D-12 grep for **1 of 9** files and generalised from
  it. This is the milestone's documented most-expensive failure class.

- **D-34:** Standing bars that constrain this phase and were never named. (a)
  `v1.20-CARVE.md:183-185` — "**No new content documentation.** … This CARVE authorizes
  tooling/governance/CI edits only, **never new documentation content**", restated in
  `REQUIREMENTS.md` Out of Scope. A Category-10 amendment **cannot** cure this: the Standing bars
  sit outside the allowlist and constrain what it may authorize. This is what forces D-04's
  de-anchor remedy. (b) `v1.20-CARVE.md:178-182` — the **glossary zero-margin hazard**: both
  `docs/_glossary-macos.md` and `docs/_glossary-android.md` sit at exactly 90 days against a `>90`
  freshness test, and all 11 LINK-03 fixes land in the macOS glossary. **Do not touch
  `last_verified` or `review_by`** — a one-day edit flips multiple currently-green workflows red.
  (c) The standing rule "a corpus edit requires proof the document is wrong" is **discharged** for
  LINK-03: `[MEASURED]` all four destinations exist
  (`docs/operations/patch-management/03-ios-update-lifecycle.md`,
  `docs/macos-lifecycle/02-mdm-migration-psso.md`,
  `docs/l2-runbooks/30-macos-mdm-migration-failure.md`,
  `docs/macos-lifecycle/01-psso-provisioning-walkthrough.md`), and the breaks are plain `../`
  over-escapes. Record this — the draft never discharged it.

- **D-35:** CRLF hazard — unverified on 8 of 9 edited files. `[MEASURED]` `core.autocrlf=true` and
  `.gitattributes` contains only `scripts/pipeline/reference.docx binary` — **no `*.md`
  normalization**. `check-nav-hub-links.mjs:47` normalizes CRLF on read; the other 8 Pillar-C fence
  sites are unverified on this axis. A bare-LF regex that works in the authoring worktree can break
  in a fresh clone, invisibly.

### Recorded method failures — carry these, do not repeat them

- **D-36:** This phase's draft shipped a defect the four prior phases' warnings did not cover — a
  false *premise* row, not a false *number* row. Every count in the draft reproduced under
  independent re-derivation; what failed were **assertions about the repo**: "`{#id}` is barred"
  (87 exist), "all 200 `<a id>` are Android-family" (55 are not), "copy-verbatim is the established
  idiom" (`_lib/` is imported 92 times), "inert for 20 phases" (run in 4 phases), "all 16 CI
  workflows run it" (5 of 16), "no category covers any of them" (Category 8 does). Phase 142 D-36's
  remedy — declare tree, cache, load, Defender, node, n — **cannot catch this class**, because
  these rows were never measurements. **New rule: a `[MEASURED]` tag belongs only on a row produced
  by an executed command; every claim about what the repo contains or what the project does must
  cite a file:line or carry no tag at all.** Tag arithmetic over measurements `[DERIVED]`.

- **D-37:** The adversarial review reversed five draft recommendations and the Referee reversed the
  Adversary twice. The Adversary correctly disproved the draft's biggest self-flagged worry
  (mask-widening-creates-an-evasion — pre-existing at column 0) and two convention findings; it
  then over-reached on F-13 and F-06, and the Referee caught both by asking a question neither
  agent had: not "is the number wrong?" but "can anyone reproduce it from the shipped artifact?".
  The single highest-value finding (D-01) came from testing an assumption **nobody had written
  down** — that the checker's anchor model matches the corpus's renderer. Findings are not true
  because they are confident, and premises are not true because they are old.

### Claude's Discretion

- Plan/atom decomposition, subject to D-31's commit sequence, D-14's ordering, and D-33's
  ledger-row-before-edit rule.
- The disjoint class definition or explicit precedence rule required by D-05.
- Which table row carries the anchor for the two double-row error codes (D-10).
- Exact `<a id>` slug spelling per row — must equal the incoming fragment verbatim, including case.
- Self-test case selection for the GitHub `{#id}` model, `<a id>` recognition, and the inline-mask
  leg.
- Evidence-artifact format for the mask-delta table and the per-class remedy ledger.
- Whether D-15(a)'s `.planning/` link is in the checker's scope or excluded with a recorded reason.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Requirements, roadmap, governance
- `.planning/REQUIREMENTS.md` §LINK-01..LINK-06 (`:52-61`) — the six requirements, the sequencing
  note, and the LINK-05 15-site census. Also `:20` (SWEEP-05's C17 live-HEAD limitation) and the
  **Out of Scope** table (no content pillar).
- `.planning/ROADMAP.md` §Phase 143 — goal, five success criteria, hard constraints. §Phase 144 —
  SC#2's "C1-C17 inherited" (the D-23 constraint).
- `.planning/milestones/v1.20-CARVE.md` — the allowlist (Category 3 = the 9 Pillar-C files,
  Category 8 = LINK-03's docs), **Standing bars** at `:178-185` (glossary zero-margin +
  no-new-content), D-09/D-10/D-12 (amendment isolation, hard-block, grep-before-edit), `:83-85`
  (Stop-hooks are advisory), and the "Recorded scope amendments" section Phase 144's close-gate reads.
- `.planning/milestones/v1.20-GOV-02-LEDGER.md` — the mandatory pre-edit ledger (D-33).
- `.planning/milestones/v1.20-DEFERRED-CLEANUP.md` — the hand-off instrument for D-26.

### The nine Pillar-C files this phase edits
- `scripts/validation/check-nav-hub-links.mjs` — the vessel. `:85-103` buildFenceMask,
  `:132-166` computeAnchorSetFromContent (D-01's target), `:186-198` extractLinks,
  `:206-215` resolveLinkTarget, `:218-247` outbound, `:253-269` inbound (`:259` + `:269` = D-12).
- `scripts/validation/c17-eee-contract.mjs` — `:150-176` inCodeFence (`:158` opening, `:166`
  closing), `:209` mermaid detection, `:259-264` assertion #5 (D-22's third leg), `:352,355` table
  rows.
- `scripts/pipeline/convert.ps1` — `:104-115` the D-03(a) fence loop (`:108` = the 15th site).
- `scripts/pipeline/retrofit-{guide,mermaid-structural,nav-hub,reference,runbook,structural}.mjs`
  — the remaining 10 JS sites.

### Frozen call sites that constrain the edits (D-33 greps start here)
- `scripts/validation/check-phase-123.mjs:40,83` — presence pin on the checker's **path string**.
- `scripts/validation/check-phase-115.mjs:75,88,102` — three `String.includes()` pins on c17,
  including `'CHAIN_PHASES'` **required-ABSENT**.
- `scripts/validation/check-phase-120.mjs:97` — c17 comment-marker pin ("assertion #1 byte-unchanged").
- `scripts/validation/check-phase-113.mjs:75` and `check-phase-124.mjs:70` — `convert.ps1` pins.
- `scripts/validation/carve-gate.mjs:36-37,65` — `IN_SCOPE_PREFIXES`/`IN_SCOPE_EXACT`, and its own
  fence-parsing divergence (D-20).
- `scripts/validation/check-phase-66.mjs:274` — the frozen `^\s*` fence toggle (D-20).

### Precedent and convention
- `docs/_standards/EEE-SOP-standard.md:278` — citations are document-level, "no section or page
  anchors" (the leg that kills the pandoc-authoritative reading, D-01).
- `.planning/PROJECT.md:759` — "plain-GitHub anchor slugs preserved".
- `.planning/milestones/v1.11-phases/91-glossary-capability-matrix/91-RESEARCH.md:88` — `{#id}`
  "renders literally … does NOT set the anchor" (D-02).
- `.planning/milestones/v1.11-phases/93-*/93-CONTEXT.md:51` and `95-*/95-CONTEXT.md:64` — "C1–C16
  inherited" read as authorization-limiting (D-23).
- `scripts/validation/check-phase-119.mjs:148` — the validator-layer `execFileSync` spawn idiom (D-23).
- `.planning/phases/142-*/142-CONTEXT.md` — D-16 (never quote a single timing), D-19 (commit
  sequence), D-33 (amendment surfaces), D-36 (measurement discipline).
- `.planning/milestones/v1.19-phases/137-*/137-VERIFICATION.md:27,70` — the checker scored as an
  SC gate (D-24).

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- **`checkInboundLinks()` is already a corpus scanner.** It walks all of `docs/`, fence-masks every
  file, and extracts every link — then discards by target. LINK-02 is condition removal, not new
  machinery. The walker, resolver, anchor-set builder and per-file cache all already operate at
  corpus scale in 0.34 s.
- **`resolveLinkTarget:206-215`** already handles bare `#anchor` self-links and excludes
  http/mailto, and never throws on a pathological `../../../../etc/passwd` target.
- **`--self-test` (7 assertions)** exercises only the three pure functions, so it survives the
  vessel change untouched and is the natural home for D-01's new model cases.
- **`<a id>` is an established corpus-wide convention** — 201 instances across Android, macOS, iOS
  and ESP docs — so D-04's class-C remedy follows precedent rather than inventing one.

### Established Patterns
- **Copy-verbatim-with-provenance vs shared `_lib/`** — the repo runs BOTH. `_lib/` holds three
  modules imported 92 times; the fence masks are copied verbatim with a provenance comment. D-16
  chooses copy-verbatim on cost, not on idiom.
- **Tool authored in phase N, wired in the close phase** — the C17 precedent (Phase 115 → 119), but
  it held only because 115 *pre-booked* the fold and `check-phase-115.mjs:98` enforced the split.
  D-23 replicates the booking discipline via `check-phase-143.mjs`.
- **Frozen call-site pinning** — a later validator may pin an earlier file's exact string; grep
  before editing any frozen path (D-33).

### Integration Points
- `check-phase-143.mjs` (Phase 144) spawns the checker — the needle-spec D-23 hands off.
- `carve-gate.mjs` hard-blocks any in-scope off-list path, including net-new files under `scripts/`.
- `build-publish-bundle.mjs` / `convert.ps1` render the corpus to `.docx`; D-08 bounds what a clean
  bundle build does and does not prove.

</code_context>

<specifics>
## Specific Ideas

- The owner ratified all four gray-area recommendations unchanged: model GitHub and fix all 65;
  target-side `<a id>` plus de-anchor with no new prose; `check-phase-143.mjs` rather than a C18
  harness fold; and amend-and-absorb inside Phase 143 rather than splitting or trimming.
- The `#intune` case is the phase's canonical example of why the remedy cannot be automated: four
  links, a plausible prefix match, and no correct target — the honest fix is to de-anchor, not to
  invent a glossary entry.

</specifics>

<deferred>
## Deferred Ideas

- **`FENCE-AXIS-02`** (D-18) — the fence-**length** divergence (`convert.ps1:110`'s 3-char prefix
  vs the JS sites' `fenceLen >=`) and the mask-**scope** divergence (whole-file vs post-frontmatter).
  LINK-05's subject is indentation only.
- **Detection-regex widening** (D-21) — `c17:209` and `retrofit-*:423` stay column-0. A behaviour
  change to a frozen contract belongs in its own phase; 0 live instances today.
- **The divergent fence sites outside the census** (D-20) — `check-phase-66.mjs:274`, the 12
  unanchored strip sites in `check-phase-54..59`, and `carve-gate.mjs:65`. Rule in-scope or route.
- **`.gitattributes` `*.md` normalization** (D-35) — the CRLF trap is real but is not LINK-scoped,
  and `.gitattributes` is `IN_SCOPE_EXACT` with no allowlist category.

</deferred>

---

*Phase: 143-Link Coverage & Fence-Mask Unification*
*Context gathered: 2026-08-11*
