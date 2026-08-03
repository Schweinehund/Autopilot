# Phase 137: Integration & Navigation-Last Close - Research

**Researched:** 2026-08-03
**Domain:** Docs-pipeline mechanical wiring (registry, generated filename map, nav-hub index, drift-canary self-tests, pandoc pre-flight) — zero recipe-body content edits
**Confidence:** HIGH

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
All 25 decisions (D-01 through D-25) in `137-CONTEXT.md` are LOCKED — produced via `/grill-me` (21 questions) + `/adversarial-review` (3 Finders → Adversary → Referee, 50 findings, 22 confirmed real, 6 CRITICAL). Highlights this research does not re-litigate:
- **D-01/D-02/D-03/D-04/D-05/D-06:** Troubleshooting hubs stay NOT-WIRED. `check-phase-132.mjs:97`'s regex does NOT cover recipes 03/04 (`REQUIREMENTS.md:31` is factually wrong on this point) — re-verified this session. Enforcement is a raw grep in `137-VERIFICATION.md`, not a code edit. `check-phase-132.mjs` is NOT edited (frozen v1.18 surface). Ruling is scoped to RE-224/225 only, no standing rule. Non-barred-surface hub wiring is out of scope, drafted as a `v1.19-DEFERRED-CLEANUP.md` candidate inside `137-02-SUMMARY.md`.
- **D-07/D-08/D-09/D-10/D-11/D-12:** Line-38 bullet's exact final string is FIXED (see Architecture Patterns Pattern 3). Table row order = filename order (03 then 04). Link text = recipe H1 verbatim, inherited from Phases 135/136, never re-derived. "When to Use" blurb budget 20-33 words, exact wording is Claude's discretion. Existing line-38 capitalization is not a defect; new entries preserve corpus-standard capitalization (`Dedicated` stays capitalized). Platform-section cross-reference rows are out of scope.
- **D-13/D-14/D-15/D-16/D-17:** Two plans, `137-02 depends_on: ["137-01"]`. THREE content commits, flip-FIRST (Commit A: flip; Commit B: registry+regen+both canaries; Commit C: index.md both surfaces). The binding same-commit atom is `{filename-map regen + BOTH canary bumps}`. Navigation-last evidence is a `137-VERIFICATION.md` observable truth (commit SHAs + timestamps), not a SUMMARY note. Three validation gates: C17 after every commit, `check-nav-hub-links.mjs` after Commit C only, plus a NEW manual outbound-link sweep before close (no tool covers the ~28 `../` links the two recipes ship).
- **D-18/D-19/D-20/D-21/D-22:** Phase 137 does NOT author `check-phase-137.mjs` — handed off to Phase 138. The needle-spec is a per-recipe line-scoped co-presence invariant (not whole-file `includes()`), with literals fixed by D-20. The spec lands in three places: CONTEXT, `137-VERIFICATION.md`'s "Needle-spec handoff" section, and an append to `STATE.md`'s Phase-138 flags block. Plan 137-02 lands both index.md surfaces in one task/commit plus a mechanical grep pair in the VERIFICATION evidence column, since the durable validator has a hard-blocked window before Phase 138.
- **D-23/D-24/D-25:** Phase 137 OWNS and bumps the SECOND registry-derived canary (`build-publish-bundle.mjs`, already RED — re-verified this session at 14 passed/1 failed). `REQUIREMENTS.md` CLASS-05 and `ROADMAP.md` Phase-137 SC2 are amended in-phase to name BOTH canaries (confirmed safe — no validator pins that prose). pandoc + `guard-docx.mjs` pre-flight of BOTH recipes gated BEFORE Commit A (re-verified passing live this session for both recipes). `STATE.md:307` is corrected in Phase 137's first commit (confirmed safe — no validator pins that text either).

**Explicitly NOT delivered this phase (from CONTEXT `<domain>`):** any edit to recipe body prose; any edit to `check-phase-132.mjs`; any `check-phase-137.mjs` authorship; any hub-file edit.

### Claude's Discretion
- Exact "When to Use" blurb wording for each new index.md row, within the 20-33 word budget (D-10), either conformant shape ([what you get]+[scoping caveat] OR [what you get]+[component list]).
- Exact commit-message subjects, following the `docs(137-NN):` convention.
- Placement of the D-23 correction comment inside `build-publish-bundle.mjs`.

### Deferred Ideas (OUT OF SCOPE)
- Hub wiring via a non-barred surface (`docs/l1-runbooks/00-index.md`, `docs/decision-trees/`) — routed to a `v1.19-DEFERRED-CLEANUP.md` candidate drafted in `137-02-SUMMARY.md` (D-06).
- A standing rule on recipes-vs-hubs for recipe 05+ — deliberately declined; the phase adding recipe 05 re-rules (D-05).
- Genericizing the line-38 quick-nav bullet — considered and owner-ruled against at D-07.
- `V-132-HUBSNOTWIRED`'s broken regex — declines to fix (frozen surface, zero gain); additive coverage lands in `check-phase-137.mjs` instead (Phase 138).
- The recipes' own `../` outbound links having no durable validator coverage — a one-off manual sweep covers this phase; a durable checker is out of scope (v1.19 has NO-TOOLING-PILLAR).
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|--------------|-------------------|
| CLASS-05 | Both recipes carry RE-NNN registry rows, flip to `Status: Approved`, enter the publish set via a regenerated `filename-map.md`; the `build-filename-map.mjs --self-test` row-count canary bumps 223→225 in the same commit as the regeneration. | Architecture Patterns Pattern 1 (slug algorithm executed, both stems computed, zero collision confirmed) and Pattern 2 (exact registry insertion site + row shape); Common Pitfalls 1-3 (canary/placement/sequencing risks); Code Examples (self-test before/after states, both re-run live this session) |
| CLASS-06 | Recipes reachable from `docs/index.md` via both surfaces (table + line-38 bullet) in the same commit; navigation-last discipline; troubleshooting-hub disposition is an explicit recorded ruling; full-corpus C17 green; link-checker 0/0. | Architecture Patterns Pattern 3 (exact index.md edit sites, current text vs. D-07 fixed replacement) and Pattern 4 (recipe flip sites); Code Examples (D-03 hub grep, C17 234/0 baseline, link-checker 0/0 baseline, all re-run live this session) |

</phase_requirements>

## Summary

This is not exploratory research — every claim below was re-verified by direct execution against HEAD this session (commit-independent, working tree as of 2026-08-03). All eleven mechanical facts the 137-CONTEXT.md orchestrator flagged as load-bearing were re-confirmed byte-for-byte: the `check-phase-132.mjs:97` regex genuinely misses `recipes/03-`/`recipes/04-`; `build-publish-bundle.mjs --self-test` is genuinely RED today (14 passed, 1 failed, `rows.length=223` vs expected 221); the D-05 slug algorithm was executed against both RE-224/225 titles and produces the exact stems D-09 names, with **zero collision** against the 234 existing `filename-map.md` stems; every one of the 6 named canary/count sites (3 in `build-filename-map.mjs`, 3 in `build-publish-bundle.mjs`) was located and no 7th site exists; all 15 candidate predecessor validators (11 named + 4 discovered by an independent grep) pass clean at HEAD; C17 is 234/0 and the nav-hub link-checker is 0/0; and — the one genuinely new finding this pass adds — **both recipes convert cleanly through the full pandoc + guard-docx pre-flight right now**, meaning D-24's pre-flight gate is proven passable in advance, not merely plausible.

**Primary recommendation:** Plan exactly the three-commit, two-plan shape CONTEXT already locked (D-13/D-14) — flip → register+regen+canaries → index.md — and lean on the pre-verified mechanics below rather than re-deriving them. The only real execution risk is sequencing (each step's precondition genuinely depends on the prior step's file state) and the two self-test harnesses' interaction (`build-filename-map.mjs --self-test` is independent of registry *content* correctness beyond row count; `build-publish-bundle.mjs --self-test` reads the same registry file directly, so both flip from RED/stale to correct only once RE-224+RE-225 rows physically exist at `Status: Approved` in `RE-index.md`).

## Blockers

None. No CONTEXT decision (D-01 through D-25) was found to be mechanically impossible. All locked decisions are confirmed executable exactly as specified.

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Registry row authorship (RE-224/225) | Content/Data (RE-index.md) | — | Registry is the single source of truth (D-07 in build-filename-map.mjs) consumed by two downstream generators |
| Filename-map regeneration | Build/Pipeline (`build-filename-map.mjs`) | — | Pure function of registry content; never hand-edited (D-09) |
| Status flip (Draft→Approved) | Content (frontmatter + byline, 2 sites per recipe) | Pipeline (gates `build-publish-bundle.mjs:312` Approved-only selection) | Frontmatter/byline drive both C17 #9 and the D-12 divergence guard, in different mechanisms |
| Drift-canary self-tests | Pipeline (Node self-test harnesses) | — | Hardcoded integer assertions that must track registry row count; the recurring defect class this phase closes |
| Navigation surfaces (table + bullet) | Content (docs/index.md) | — | Discovery-only; no pipeline dependency, but gated behind content-completion (navigation-last, D-13 wave dependency) |
| Troubleshooting-hub disposition | Content (non-edit) | Validation (Phase 138 leaf validator, per D-18) | A recorded ruling with zero file mutation; enforcement lives in a future leaf validator, not in this phase |
| pandoc/guard-docx pre-flight | Build/Pipeline (`convert.ps1` + `guard-docx.mjs`) | — | One-time verification gate before the flip, not a persistent artifact (output is `.pipeline-output/`, gitignored) |

## Standard Stack

No new libraries. This phase runs existing zero-dependency Node scripts (`node:fs`/`node:path`/`node:child_process` built-ins only) and existing PowerShell 7+ tooling. No `npm install`, no new packages, nothing to legitimacy-check.

### Core (existing, unchanged)
| Tool | Version (confirmed this session) | Purpose |
|------|-----------------------------------|---------|
| pandoc | 3.7.0.2 [VERIFIED: `pandoc --version` run this session] | MD→.docx conversion, pinned by `convert.ps1:3` |
| PowerShell (pwsh) | 7.6.3 [VERIFIED: `pwsh --version` run this session] | Runs `convert.ps1` (`#Requires -Version 7.0`) |
| Node.js | v24.17.0 [VERIFIED: `node --version` run this session] | Runs all `scripts/pipeline/*.mjs` and `scripts/validation/*.mjs` |

## Package Legitimacy Audit

Not applicable — zero external package installs in this phase (docs-and-pipeline-script phase only).

## Architecture Patterns

### System Architecture Diagram

```
docs/recipes/03-*.md   docs/recipes/04-*.md
  (frontmatter status:Draft, byline Status:Draft)
        |  Commit A: flip both, 2 sites each (frontmatter + byline)
        v
  status:Approved (both sites, both files) --- gated by D-24 pandoc pre-flight
        |
        |  Commit B, step 1: append 2 rows to
        v
docs/_registry/RE-index.md  (table ends at :239 RE-223; "## Review Notes" prose follows at :241 -- rows MUST land inside the table, above :240)
        |
        |  Commit B, step 2: `node scripts/pipeline/build-filename-map.mjs`
        |  reads RE-index.md (Title col = source of truth) -> derives .docx stem
        |  via D-05 5-step slug -> writes scripts/pipeline/filename-map.md
        v
scripts/pipeline/filename-map.md (GENERATED, 225 rows after regen)
        |
        |  Commit B, step 3: bump BOTH drift canaries in the SAME commit
        |    build-filename-map.mjs   :274-276 comment, :281 label, :282 assertion  (223->225)
        |    build-publish-bundle.mjs :7 header comment, :515 label, :519 assertion (221->225)
        v
  `--self-test` on both scripts now exits 0 (was: filename-map 8/8 green already;
   publish-bundle 14/15 RED today, becomes 15/15 after both edits)
        |
        |  Commit C (plan 137-02, depends_on: ["137-01"]): docs/index.md, BOTH surfaces
        |    table rows after :281 (filename order: 03 then 04)
        |    line-38 bullet: fixed string from D-07, replacing the existing parenthetical
        v
  Full-corpus C17 (0 violations) + check-nav-hub-links (0/0) green after every commit
        |
        v
  Phase 138 (not this phase): authors check-phase-137.mjs needle per D-18/D-19/D-20,
  consumes the "measured actuals" 137-VERIFICATION.md records per D-21
```

### Recommended Task/Commit Structure (already locked by D-13/D-14 — do not re-derive)
```
Plan 137-01 (wave 1, depends_on: [])
├── Task: D-24 pandoc pre-flight on BOTH recipes (gate before flip)
├── Commit A: two-site Draft->Approved flip, both recipe files
├── Task: append RE-224/RE-225 rows to RE-index.md (inside table, before "## Review Notes")
├── Task: run build-filename-map.mjs (regenerate filename-map.md)
├── Task: bump BOTH drift canaries (build-filename-map.mjs 223->225, build-publish-bundle.mjs 221->225)
├── Commit B: registry rows + regen + BOTH canary bumps, together (SC2 binding atom, D-15)
├── Task: STATE.md:307 correction (D-25) -- can ride in Commit B or its own small commit
├── Task: REQUIREMENTS.md CLASS-05 + ROADMAP.md Phase-137 SC2 amendment (D-23) -- name both canaries
└── C17 + self-tests + hubs-not-wired grep, after Commit B

Plan 137-02 (wave 2, depends_on: ["137-01"])
├── Task: docs/index.md table rows (after :281, filename order 03 then 04) + line-38 bullet (D-07 fixed string), SAME task/commit
├── Commit C
└── check-nav-hub-links + C17 + the D-17 outbound-link manual sweep, after Commit C
```

### Pattern 1: D-05 slug algorithm — exact 5-step order [VERIFIED: scripts/pipeline/build-filename-map.mjs:74-81]
```javascript
// Source: scripts/pipeline/build-filename-map.mjs:74-81 (read this session)
export function slug(title) {
  let s = title.toLowerCase();                    // 1. lowercase
  s = s.replace(/[/\s]+/g, '-');                   // 2. "/" and whitespace runs -> single "-"
  s = s.replace(/[^a-z0-9-]/g, '');                // 3. delete everything else (incl. ".", ":", "—", "(", ")")
  s = s.replace(/-+/g, '-').replace(/^-|-$/g, ''); // 4. collapse/trim "-"
  return s;                                        // 5. caller appends ".docx"
}
```
**Executed against the two D-09 titles this session** (`node -e` with the verbatim algorithm above, output captured):
- `slug("Windows 11 Multi-App Kiosk: Assigned Access Provisioning")` → `windows-11-multi-app-kiosk-assigned-access-provisioning` → **`windows-11-multi-app-kiosk-assigned-access-provisioning.docx`** — matches D-09's stated expected stem exactly.
- `slug("Android Dedicated Multi-App Kiosk: Managed Home Screen Provisioning")` → `android-dedicated-multi-app-kiosk-managed-home-screen-provisioning` → **`android-dedicated-multi-app-kiosk-managed-home-screen-provisioning.docx`** — D-09 does not state this stem explicitly; this is the first authoritative computation of it.
- **Collision check:** `grep -F` for both exact `.docx` strings against the live 234-row `scripts/pipeline/filename-map.md` returned **zero matches** [VERIFIED: `scripts/pipeline/filename-map.md`, grepped this session]. Neither new stem collides with any existing row, so the D-08 disambiguation branch (append Path parent-dir segments) is **not triggered** — both rows resolve on the singleton (`group.length === 1`) path at `build-filename-map.mjs:132-151`.

### Pattern 2: RE-index.md row insertion site [VERIFIED: docs/_registry/RE-index.md:225-250]
```
# Source: docs/_registry/RE-index.md:238-241 (read this session)
| RE-222 | docs/recipes/01-shared-windows-avd-client.md | Shared Windows AVD-Client Device: Self-Deploying Provisioning | Guide | Approved |
| RE-223 | docs/recipes/02-shared-ipad-full-provisioning.md | Shared iPad Full Provisioning: Federated Sign-In to Verified End State | Guide | Approved |
                                                              <- INSERT RE-224/RE-225 HERE, before the blank line at :240
## Review Notes
```
The new rows are **`| RE-224 | docs/recipes/03-windows-11-multi-app-kiosk.md | Windows 11 Multi-App Kiosk: Assigned Access Provisioning | Guide | Approved |`** and **`| RE-225 | docs/recipes/04-android-dedicated-mhs-multi-app.md | Android Dedicated Multi-App Kiosk: Managed Home Screen Provisioning | Guide | Approved |`** — 5-column shape byte-identical to RE-222/RE-223. `parseRegistry`'s filter is `/^\|\s*RE-\d+\s*\|/` [VERIFIED: `build-filename-map.mjs:106`], so it would still count a row placed *after* `## Review Notes` (the canary is blind to placement, per CONTEXT's own note) — insert inside the table anyway for document correctness, not because the canary would catch a misplacement.

**`## Review Notes` disposition:** the existing single entry (`docs/_registry/RE-index.md:243-250`) is a Doc-Type classification dispute for RE-212 (directory-precedence ruling), unrelated to either new recipe. **No new Review Notes entry is needed for RE-224 or RE-225's `## Rollback/Recovery` template divergence** — `135-CONTEXT.md:76` (D2.2) already ruled that divergence is recorded in the phase SUMMARY/VERIFICATION plus a `v1.19-DEFERRED-CLEANUP.md` entry (created by Phase 138), explicitly *not* as registry meta-commentary ("no corpus precedent exists for a live doc annotating its own template divergence" in `RE-index.md`). This was independently confirmed by reading `135-02-SUMMARY.md:112` and `135-CONTEXT.md:76` this session.

### Pattern 3: docs/index.md edit sites [VERIFIED: docs/index.md:25-42, 270-283]
Line-38 bullet, **current text at HEAD** (verbatim, read this session):
```
- [Device Configuration Recipes](#device-configuration-recipes) -- End-to-end provisioning recipes with embedded admin decision points (shared Windows AVD-client device, Shared iPad full provisioning)
```
D-07's fixed replacement (copy verbatim, do not compose):
```
- [Device Configuration Recipes](#device-configuration-recipes) -- End-to-end provisioning recipes with embedded admin decision points (shared Windows AVD-client device, Shared iPad full provisioning, Windows 11 multi-app kiosk, Android Dedicated multi-app kiosk)
```
Table rows — **current table ends at `:281`** (RE-223/Shared iPad), followed by a blank line at `:282` and `---` at `:283` before `## Operations` at `:285` [VERIFIED: docs/index.md:278-285, read this session]. New rows insert after `:281`, before `:282`, filename order (03 then 04, per D-08):
```
| [Windows 11 Multi-App Kiosk: Assigned Access Provisioning](recipes/03-windows-11-multi-app-kiosk.md) | <20-33 word blurb, Claude's discretion per D-10> |
| [Android Dedicated Multi-App Kiosk: Managed Home Screen Provisioning](recipes/04-android-dedicated-mhs-multi-app.md) | <20-33 word blurb, Claude's discretion per D-10> |
```
Link text is the recipe H1 **verbatim** — confirmed by reading both recipe files this session: `docs/recipes/03-windows-11-multi-app-kiosk.md:15` is `# Windows 11 Multi-App Kiosk: Assigned Access Provisioning`; `docs/recipes/04-android-dedicated-mhs-multi-app.md:15` is `# Android Dedicated Multi-App Kiosk: Managed Home Screen Provisioning` — both match D-09's Titles character-for-character, confirming the identity chain (index link text == RE-index Title == filename-map slug source) holds with no re-derivation needed.

### Pattern 4: recipe status-flip sites [VERIFIED: docs/recipes/03-windows-11-multi-app-kiosk.md:1-13, docs/recipes/04-android-dedicated-mhs-multi-app.md:1-13]
Both recipes currently read (confirmed this session, byte-identical shape across both files):
```
---
doc_id: RE-224          (RE-225 for the second file)
status: Draft            <- site 1, line 3
...
---

**Platform:** Windows · **Doc Type:** Guide · **Doc ID:** RE-224 · **Status:** Draft   <- site 2, line 13
```
Both `status:` values must flip from `Draft` to `Approved` at line 3 and line 13 of each file — 4 total site edits across the two files. Note the D-11 forward rule's applies_to-fragment observation: `docs/recipes/04-*.md:9` frontmatter `applies_to` reads *"Android Enterprise Dedicated multi-app kiosk (…)"* — the leading fragment includes "Enterprise", but D-11's ruled bullet/table string is **"Android Dedicated multi-app kiosk"** (Enterprise dropped). This is D-11 as locked, not a defect to fix — flagging only so the planner does not "correct" the bullet text to match the frontmatter verbatim.

### Pattern 5: pandoc + guard-docx pre-flight — exact invocation [VERIFIED: scripts/pipeline/convert.ps1:1-40, scripts/pipeline/guard-docx.mjs:1-40, both run live this session]
```powershell
# Source: scripts/pipeline/convert.ps1:7-11 (usage comment) — invoked exactly this way this session
pwsh -NoProfile -File scripts/pipeline/convert.ps1 `
  -InputMd docs/recipes/03-windows-11-multi-app-kiosk.md `
  -OutputDocx .pipeline-output/03-windows-11-multi-app-kiosk.docx

node scripts/pipeline/guard-docx.mjs .pipeline-output/03-windows-11-multi-app-kiosk.docx
```
**Both recipes were run through this exact pipeline live this session, with results NOT previously recorded anywhere in the repo for RE-225:**
- RE-224 (03): `convert.ps1` exit 0 ("pandoc 3.7.0.2 (pinned 3.7.0.2) — version guard PASS", "PIPE-03 preprocessing: 0 nav-footer rewrite(s), guard PASS"); `guard-docx.mjs` **3 PASS, 0 FAIL, 0 SKIPPED** (YAML-leak, heading-style, custom-props all clean).
- RE-225 (04) — **the file with zero prior pandoc/guard-docx artifacts per D-24's own grep finding** — same result: `convert.ps1` exit 0; `guard-docx.mjs` **3 PASS, 0 FAIL, 0 SKIPPED**, including the JSON fence D-24 calls "the highest-risk conversion surface in the corpus."

**This is the one genuinely new finding this research pass adds beyond re-confirming CONTEXT's claims: D-24's pre-flight gate is not merely required, it is proven passable right now.** The planner can write the pre-flight task with high confidence it will pass on the first attempt; no remediation-round contingency is needed for this specific gate (unlike broad-corpus milestones' historical pattern of two-round closes — see Common Pitfalls). Test artifacts were written to `.pipeline-output/` (gitignored) and deleted after verification; they leave no tracked-file residue.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Filename derivation | A custom slug function or manual filename entry | `node scripts/pipeline/build-filename-map.mjs` (regenerate, never hand-edit — D-09) | The generator is the sole source of truth; hand-editing `filename-map.md` breaks the D-09 sync invariant and desyncs from the registry on the next regen |
| Registry-row-count assertions | A new counting mechanism | The two existing hardcoded `--self-test` integers (bump both, in the SAME commit as the regen, per D-15/D-23) | Two independent canaries already exist; adding a third mechanism duplicates coverage instead of closing the actual gap (which was: the second canary being forgotten) |
| Hub-not-wired enforcement | A new automated check inside this phase | The D-03 raw grep, recorded as an observable truth in `137-VERIFICATION.md` (mirrors `132-VERIFICATION.md` truth #3) | The durable validator is explicitly Phase 138's job (D-18); building one now forks the established leaf-validator-authored-by-close-phase convention |
| .docx conversion / guard logic | A new conversion script | `convert.ps1` + `guard-docx.mjs`, run as-is | Both are already-proven, self-tested tools from Phase 113/126; this phase only runs them, never modifies them |

**Key insight:** every mechanical operation this phase performs already has an existing, tested tool. The entire phase is orchestration of pre-built pipeline steps in a specific commit order — there is no net-new logic to author except two integer edits (the canary bumps) and prose (index.md bullet/rows, REQUIREMENTS.md/ROADMAP.md/STATE.md amendments).

## Common Pitfalls

### Pitfall 1: The exact defect class this phase exists to close — a canary bump landing in the wrong commit, or only one of the two canaries getting bumped
**What goes wrong:** `build-filename-map.mjs`'s canary was bumped 221→223 at the v1.18 close, but `build-publish-bundle.mjs`'s independent canary (`:515`/`:519`) was never touched — it has been silently RED since the v1.18 close and was only caught by a pre-archive `/gsd-audit-milestone` run, per `.planning/RETROSPECTIVE.md:594,597` [CITED: .planning/RETROSPECTIVE.md, read this session]. Verbatim: *"A cross-phase deferral was dropped silently — Phase 132 deferred the `--self-test` row-count fix to Phase 133, but 133's scope … never covered `build-filename-map.mjs` and the item was never re-logged."*
**Why it happens:** the two canaries live in two different files with two different `--self-test` invocations; nothing forces them to be bumped together except discipline.
**How to avoid:** bump both integers (all 6 sites total: 3 in `build-filename-map.mjs`, 3 in `build-publish-bundle.mjs`) in Commit B, and make `node scripts/pipeline/build-publish-bundle.mjs --self-test` exiting 15/15 (not just `build-filename-map.mjs --self-test` exiting 8/8) an explicit close-gate check, per D-23.
**Warning signs:** if a plan task only mentions "the self-test," ask which one — both must be named.

### Pitfall 2: Registry row insertion landing outside the table
**What goes wrong:** `RE-index.md` does not end at its last table row — `## Review Notes` prose follows. A row pasted after that prose header would still be counted by `parseRegistry`'s `/^\|\s*RE-\d+\s*\|/` filter (the canary is blind to placement — confirmed by reading the regex at `build-filename-map.mjs:106`), so nothing would flag the mistake mechanically; it's a document-correctness bug, not a build failure.
**Why it happens:** appending "at the end of the file" is the naive instinct; the file's actual end is prose, not the table.
**How to avoid:** insert both new rows between `:239` (last existing row, RE-223) and `:241` (`## Review Notes` header) — i.e., immediately after the last table row, inside the table's contiguous block.

### Pitfall 3: Regenerating filename-map.md before the registry rows exist
**What goes wrong:** running `build-filename-map.mjs` before RE-224/225 rows land would regenerate a 223-row map (no-op for the new recipes) and could desync the "regenerate in the same commit as the canary bump" requirement if run at the wrong point in the task sequence.
**How to avoid:** strict order within Commit B: (1) append registry rows, (2) run the regen script, (3) bump both canaries, (4) commit all three changes together. This is exactly D-15's "binding same-commit atom."

### Pitfall 4: Trusting `build-publish-bundle.mjs --self-test`'s current RED state as "broken tooling" rather than "expected, pre-existing, and this phase's job to fix"
**What goes wrong:** a plan or verifier unfamiliar with the history might see `14 passed, 1 failed` at HEAD and treat it as a regression to investigate, rather than the known, named, pre-existing drift that CLASS-05/D-23 explicitly charter this phase to close.
**How to avoid:** `137-VERIFICATION.md` should record the BEFORE state (14/15, `rows.length=223`) and the AFTER state (15/15, `rows.length=225`) explicitly, so the delta is legible as intentional.

### Pitfall 5: Copying `132-VERIFICATION.md:22`'s "zero pipeline code changes" observable truth forward
**What goes wrong:** Phase 132's VERIFICATION included a truth asserting `git diff --quiet scripts/pipeline/build-filename-map.mjs` (i.e., no pipeline code changed). Phase 137 **does** change pipeline code (the two canary integers) — copying that truth forward verbatim would either fail the gate or tempt a "fix" that reverts the canary bump, recreating the exact defect this phase exists to close. Already flagged in CONTEXT as D-25; confirmed here that `STATE.md:307`'s current text (*"Phase 137 is standard mechanical execution, zero pipeline code changes expected"*) is still present at HEAD and needs the D-25 correction in this phase's first commit.
**How to avoid:** `137-VERIFICATION.md`'s observable truths must be authored fresh for this phase, not copied from `132-VERIFICATION.md`, for the pipeline-code-changes truth specifically.

### Pitfall 6: Broad-corpus milestones historically needed a second remediation round at close
**What goes wrong:** per `.planning/RETROSPECTIVE.md` (v1.14 through v1.17 entries), corpus-wide churn has repeatedly drifted predecessor content assertions that only surface at the terminal chain/harness close (Phase 138 here, not 137). This is a documented recurring pattern across nearly every milestone close.
**How this phase mitigates it:** Phase 137's edits are narrowly scoped (2 recipe metadata flips, 1 registry append, 1 generated-file regen, 2 integer bumps, 2 index.md surfaces) — none of which are the kind of broad-corpus retrofit that historically caused drift. All 15 predecessor validators checked this session (11 named in CONTEXT + 4 discovered independently) are green at HEAD with zero prior indication of fragility toward these specific files. This is a low-risk phase by the corpus's own historical pattern; the note is for Phase 138's awareness, not a Phase 137 action item.

## Code Examples

### Running both self-test harnesses (verify before/after state)
```bash
# Source: scripts/pipeline/build-filename-map.mjs --self-test / build-publish-bundle.mjs --self-test (both run this session)
node scripts/pipeline/build-filename-map.mjs --self-test
# BEFORE this phase: 8 passed, 0 failed (row count 223)
# AFTER Commit B:    8 passed, 0 failed (row count 225)

node scripts/pipeline/build-publish-bundle.mjs --self-test
# BEFORE this phase: 14 passed, 1 failed -- "(a) Approved selection yields exactly 221 rows FAIL -- rows.length=223"
# AFTER Commit B:    15 passed, 0 failed (row count 225)
```

### Hub-not-wired enforcement grep (D-03, run as a VERIFICATION observable truth, not a new script)
```bash
# Source: 137-CONTEXT.md <specifics> block, verbatim
grep -lE 'recipes/0[34]-|03-windows-11-multi-app-kiosk|04-android-dedicated-mhs' docs/common-issues.md docs/quick-ref-l1.md docs/quick-ref-l2.md
# Expected: no output (exit 1 from grep -l when no file matches), plus `git diff` over the 3 hub files being empty
```

### Full-corpus C17 + nav-hub link-checker (run after every content commit)
```bash
node scripts/validation/c17-eee-contract.mjs
# Baseline this session: "234 files checked, 0 with violations, 0 total violations", all 13 assertion counts 0

node scripts/validation/check-nav-hub-links.mjs
# Baseline this session: "0 outbound failure(s), 0 inbound failure(s), 0 total"
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|---------------|--------|
| Registry-status flip + registration in one commit | Flip-FIRST, then register+regen — 3 separate content commits | D-14 (this phase, overruling an initial 1-commit candidate) | Restores the exact Phase-132 precedent shape (`996dcead` flip → `fb179bfa` register+regen → `71ad89a3` index.md), verified this session to be the actual git history |
| Single drift-canary (filename-map.md only) | Two independently-tracked canaries, both must move together | D-23 (this phase; the gap was discovered only via pre-archive audit at v1.18 close) | Closes the FILENAME-MAP-SELFTEST-DRIFT recurring-lesson class named in `REQUIREMENTS.md` |

**Deprecated/outdated:** none — no library or tool version changes in this phase.

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | The 20-33 word "When to Use" blurb text for each new index.md table row (Claude's discretion per D-10, not yet drafted) | Architecture Patterns Pattern 3 | Low — explicitly discretionary, budget-bounded, no downstream validator depends on exact wording (D-19's needle only asserts link presence + target path, not blurb text) |

**All other claims in this research were verified this session by direct file read or command execution.** No claim about a discrete value (line number, regex, filename, row count, exit code) rests on training-data recall alone — every one was re-confirmed against the live working tree.

## Open Questions

None. All items CONTEXT flagged for re-verification were confirmed true, and the pandoc pre-flight (previously untested for RE-225) is now confirmed to pass.

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|--------------|-----------|---------|----------|
| pandoc | D-24 pre-flight, `build-publish-bundle.mjs` (future Phase 138 run) | Yes [VERIFIED: `pandoc --version` this session] | 3.7.0.2 (matches `convert.ps1:3`'s pin) | — |
| pwsh (PowerShell 7+) | `convert.ps1` (`#Requires -Version 7.0`) | Yes [VERIFIED: `pwsh --version` this session] | 7.6.3 | — |
| Node.js | All `scripts/pipeline/*.mjs` and `scripts/validation/*.mjs` | Yes [VERIFIED: `node --version` this session] | v24.17.0 | — |

**Missing dependencies with no fallback:** none.
**Missing dependencies with fallback:** none — everything required is present. (D-24's own contingency — "if pandoc is absent, record NOT-RUN and proceed with the flip" — is now moot; pandoc is present and both recipes pass.)

## Security Domain

This phase is a docs-and-generated-pipeline-config wiring phase — no authentication, session, or external-input trust boundary is touched. The four files this phase edits (`docs/recipes/03-*.md`, `docs/recipes/04-*.md`, `docs/_registry/RE-index.md`, `docs/index.md`) are static Markdown content with no execution surface; the two pipeline scripts touched (`build-filename-map.mjs`, `build-publish-bundle.mjs`) receive only integer literal edits (the canary bumps), not new logic paths. No ASVS category applies materially.

| ASVS Category | Applies | Standard Control |
|----------------|---------|-------------------|
| V2 Authentication | No | N/A — no auth surface in this phase |
| V3 Session Management | No | N/A |
| V4 Access Control | No | N/A |
| V5 Input Validation | No (pre-existing controls unchanged) | `build-publish-bundle.mjs`'s existing `validateSourcePathUnderDocs`/`validateOutputFilename`/path-traversal guards [VERIFIED: build-publish-bundle.mjs:170-185, read this session] already cover the registry-row/filename-map inputs this phase adds rows to; this phase adds no new input-parsing code |
| V6 Cryptography | No | N/A |

### Known Threat Patterns for this stack
None specific to this phase's edits — the only "threat" class relevant to this pipeline (path traversal via a malicious registry Path or `--version` flag) is guarded by pre-existing, unmodified code (`validateSourcePathUnderDocs`, `deriveZipName`'s anchored regex), both confirmed present and untouched by this phase's diff.

## Sources

### Primary (HIGH confidence — all verified by direct execution this session)
- `scripts/pipeline/build-filename-map.mjs` — full file read; `--self-test` executed
- `scripts/pipeline/build-publish-bundle.mjs` — full file read; `--self-test` executed
- `scripts/pipeline/convert.ps1`, `scripts/pipeline/guard-docx.mjs` — read + executed live against both recipe files
- `docs/_registry/RE-index.md`, `docs/index.md`, `docs/recipes/03-*.md`, `docs/recipes/04-*.md` — all read at exact cited line ranges
- `scripts/validation/c17-eee-contract.mjs`, `scripts/validation/check-nav-hub-links.mjs`, and all 15 predecessor `check-phase-*.mjs` validators — executed at HEAD
- `git log -1` on all 5 precedent commit SHAs cited in CONTEXT — all confirmed to exist with the stated subject lines

### Secondary (MEDIUM confidence)
- `.planning/RETROSPECTIVE.md` — read for the FILENAME-MAP-SELFTEST-DRIFT history and the broad-corpus two-round-close pattern
- `.planning/phases/135-.../135-CONTEXT.md`, `135-02-SUMMARY.md`, `136-CONTEXT.md` — read for the D2.2 Review-Notes disposition and the D4.8 no-cross-link precedent

### Tertiary (LOW confidence)
None — no unverified claims carried forward.

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — no new tools; existing tool versions confirmed live this session
- Architecture: HIGH — every edit site, line number, and generated value re-verified against HEAD
- Pitfalls: HIGH — drawn from this repo's own documented retrospective history, not general knowledge

**Research date:** 2026-08-03
**Valid until:** Next commit to any of the 6 files this phase touches invalidates line-number citations; otherwise valid through Phase 137's execution window (expected within days).
