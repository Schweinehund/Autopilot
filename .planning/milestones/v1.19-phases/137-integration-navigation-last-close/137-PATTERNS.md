# Phase 137: Integration & Navigation-Last Close - Pattern Map

**Mapped:** 2026-08-03
**Files analyzed:** 9 (2 recipe metadata flips, registry, generated filename-map, index.md, 2 pipeline scripts, REQUIREMENTS/ROADMAP/STATE prose)
**Analogs found:** 9 / 9 — exact structural analog exists for every file (Phase 132, same repo, same job)

This phase has a byte-exact precedent: Phase 132 (`.planning/milestones/v1.18-phases/132-integration-navigation-last-close/`) did the identical wiring job for the previous two recipes (RE-222/RE-223). Every pattern below is extracted directly from that phase's three commits, not from a generic template.

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|-------------------|------|-----------|-----------------|---------------|
| `docs/recipes/03-windows-11-multi-app-kiosk.md` (frontmatter+byline flip) | content/config | transform (2-site status flip) | `docs/recipes/01-shared-windows-avd-client.md` (commit `996dcead`) | exact |
| `docs/recipes/04-android-dedicated-mhs-multi-app.md` (frontmatter+byline flip) | content/config | transform | `docs/recipes/02-shared-ipad-full-provisioning.md` (commit `996dcead`) | exact |
| `docs/_registry/RE-index.md` (append 2 rows) | model/registry | CRUD (append) | Same file, RE-222/RE-223 append (commit `fb179bfa`) | exact |
| `scripts/pipeline/filename-map.md` (regenerated) | generated artifact | batch/transform | Same file, regen after RE-222/RE-223 (commit `fb179bfa`) | exact — never hand-edit, run the generator |
| `docs/index.md` (table rows + line-38 bullet) | content/nav | CRUD (append) | Same file, Device Configuration Recipes section (commit `71ad89a3`) — **shape differs, see note below** | role-match (D-07 changed the shape from Phase 132's) |
| `scripts/pipeline/build-filename-map.mjs` (canary 223→225) | utility/config | batch (self-test literal) | Same file, canary 221→223 bump (commit `6acc429b`) | exact |
| `scripts/pipeline/build-publish-bundle.mjs` (canary 221→225) | utility/config | batch (self-test literal) | Same file/pattern as above, second independent canary, never previously bumped (D-23 — this phase owns it) | exact (pattern transfer from the same commit) |
| `.planning/REQUIREMENTS.md` CLASS-05 + `.planning/ROADMAP.md` Phase-137 SC2 | docs/prose | transform | No direct Phase-132 analog (Phase 132 didn't amend its own roadmap text) — treat as plain prose edit naming both canary files/values | partial (no strong prior analog; low-risk prose) |
| `.planning/STATE.md:307` correction | docs/prose | transform | No analog — one-line factual correction | no analog needed (trivial edit) |

## Pattern Assignments

### `docs/recipes/03-windows-11-multi-app-kiosk.md` and `04-android-dedicated-mhs-multi-app.md` (2-site status flip)

**Analog:** commit `996dcead docs(132-01): flip RE-222/RE-223 recipes Draft to Approved`

**Exact diff shape to reproduce** (both files, both sites):
```diff
 ---
 doc_id: RE-222
-status: Draft
+status: Approved
 owner: Intune Admin Lead
 doc_type: Guide
 ...
 ---

-**Platform:** Windows · **Doc Type:** Guide · **Doc ID:** RE-222 · **Status:** Draft
+**Platform:** Windows · **Doc Type:** Guide · **Doc ID:** RE-222 · **Status:** Approved
```
For Phase 137: `doc_id: RE-224` (file 03, `:3` and `:13`) and `doc_id: RE-225` (file 04, `:3` and `:13`). Frontmatter `status:` and the `**Status:**` byline token are the ONLY two lines that change per file — `doc_type` and everything else in the frontmatter block stays untouched, matching the analog exactly (2 insertions / 2 deletions per file, 4 total per file across both sites... actually 4 lines changed total across both files = 4 ins/4 del, matching the analog's `4 files changed, 4 insertions(+), 4 deletions(-)` scaled to 2 files).

**Commit message convention** (from analog): `docs(137-01): flip RE-224/RE-225 recipes Draft to Approved`, with a body bullet per file plus `doc_type unchanged (Guide); no body content edited`.

---

### `docs/_registry/RE-index.md` (append RE-224/RE-225 rows)

**Analog:** commit `fb179bfa`, `docs/_registry/RE-index.md` hunk

**Exact diff shape:**
```diff
 | RE-222 | docs/recipes/01-shared-windows-avd-client.md | Shared Windows AVD-Client Device: Self-Deploying Provisioning | Guide | Approved |
 | RE-223 | docs/recipes/02-shared-ipad-full-provisioning.md | Shared iPad Full Provisioning: Federated Sign-In to Verified End State | Guide | Approved |
+| RE-224 | docs/recipes/03-windows-11-multi-app-kiosk.md | Windows 11 Multi-App Kiosk: Assigned Access Provisioning | Guide | Approved |
+| RE-225 | docs/recipes/04-android-dedicated-mhs-multi-app.md | Android Dedicated Multi-App Kiosk: Managed Home Screen Provisioning | Guide | Approved |

 ## Review Notes
```
Insert **inside the table**, after the last row (`:239` at current HEAD, RE-223) and before the blank line that precedes `## Review Notes` (`:241`). Column shape is `| RE-NNN | <path> | <Title verbatim> | Guide | Approved |` — 5 columns, byte-identical to RE-222/RE-223's shape. Titles are fixed by CONTEXT D-09, copy verbatim, do not re-derive.

---

### `scripts/pipeline/filename-map.md` (regenerated, never hand-edited)

**Analog:** commit `fb179bfa`, `scripts/pipeline/filename-map.md` hunk (2-line append, generator output)
```diff
 | RE-221 | docs/quick-ref-l2.md | l2-quick-reference-card.docx |
+| RE-222 | docs/recipes/01-shared-windows-avd-client.md | shared-windows-avd-client-device-self-deploying-provisioning.docx |
+| RE-223 | docs/recipes/02-shared-ipad-full-provisioning.md | shared-ipad-full-provisioning-federated-sign-in-to-verified-end-state.docx |
```
**Do not hand-edit.** Run `node scripts/pipeline/build-filename-map.mjs` after the registry rows land (Pitfall 3 in RESEARCH.md — order matters: rows first, then regen, then bump canaries, then commit all three together). Per RESEARCH.md Pattern 1, the two new stems are already computed and collision-checked:
- `windows-11-multi-app-kiosk-assigned-access-provisioning.docx`
- `android-dedicated-multi-app-kiosk-managed-home-screen-provisioning.docx`

---

### `docs/index.md` (table rows + line-38 bullet)

**Analog:** commit `71ad89a3 docs(132-02): add Device Configuration Recipes section to index.md`

**IMPORTANT — do not copy the analog's shape verbatim.** Phase 132 authored a brand-new `## Device Configuration Recipes` section (11 lines, new H2 + intro sentence + table) because the section didn't exist yet. That section now exists (from Phase 132). Phase 137 only **appends 2 rows to the existing table** (after `:281`, before the trailing blank line / `---`) and **replaces the line-38 quick-nav bullet's parenthetical** — it does NOT re-create the H2/intro.

**Table-row diff shape** (same column convention as the analog's new rows):
```diff
 | [Shared Windows AVD-Client Device: Self-Deploying Provisioning](recipes/01-shared-windows-avd-client.md) | Provision a self-deploying, Entra-joined shared Windows device running the Windows App as its Azure Virtual Desktop client -- device/Intune config only, assumes AVD host pools and session hosts already exist |
 | [Shared iPad Full Provisioning: Federated Sign-In to Verified End State](recipes/02-shared-ipad-full-provisioning.md) | Provision a supervised Shared iPad end-to-end -- ADE enrollment, federated Managed Apple Account sign-in, device-licensed Required apps, and per-role layered configuration |
+| [Windows 11 Multi-App Kiosk: Assigned Access Provisioning](recipes/03-windows-11-multi-app-kiosk.md) | <20-33 word blurb per D-10, Claude's discretion> |
+| [Android Dedicated Multi-App Kiosk: Managed Home Screen Provisioning](recipes/04-android-dedicated-mhs-multi-app.md) | <20-33 word blurb per D-10, Claude's discretion> |
```
Link text = recipe H1 verbatim (confirmed identical to RE-index Title). Blurb style precedent from the analog's own rows (word count ~33 and ~22): `[what you get] + [scoping caveat]` or `[what you get] + [component list]`.

**Line-38 bullet — fixed replacement (copy verbatim, CONTEXT D-07):**
```diff
-- [Device Configuration Recipes](#device-configuration-recipes) -- End-to-end provisioning recipes with embedded admin decision points (shared Windows AVD-client device, Shared iPad full provisioning)
+- [Device Configuration Recipes](#device-configuration-recipes) -- End-to-end provisioning recipes with embedded admin decision points (shared Windows AVD-client device, Shared iPad full provisioning, Windows 11 multi-app kiosk, Android Dedicated multi-app kiosk)
```

**Commit message convention** (adapted from analog, since this is an append not a new-section add): `docs(137-02): register RE-224/RE-225 in index.md navigation (table + quick-nav bullet)`.

---

### `scripts/pipeline/build-filename-map.mjs` (canary 223 → 225, 3 sites)

**Analog:** commit `6acc429b chore(audit): v1.18 pre-archive audit — fix build-filename-map self-test drift` (the 221→223 bump)

**Current HEAD state (verified this session):**
```
:274-276  // (c) Parsing the REAL docs/_registry/RE-index.md yields exactly 223 rows
          //     (bumped 221 -> 223 at v1.18 close: RE-222/RE-223 recipes added in Phase 132;
:281      '(c) parseRegistry(docs/_registry/RE-index.md) yields exactly 223 rows',
:282      rows.length === 223,
```
**Pattern to copy (from the analog commit body, adapt the count/phase reference):**
```diff
-  // (c) Parsing the REAL docs/_registry/RE-index.md yields exactly 223 rows
+  // (c) Parsing the REAL docs/_registry/RE-index.md yields exactly 225 rows
+  //     (bumped 223 -> 225 in Phase 137: RE-224/RE-225 recipes added)
...
-      '(c) parseRegistry(docs/_registry/RE-index.md) yields exactly 223 rows',
-      rows.length === 223,
+      '(c) parseRegistry(docs/_registry/RE-index.md) yields exactly 225 rows',
+      rows.length === 225,
```
All 3 sites (`:274-276` comment, `:281` label, `:282` assertion) move together, in the SAME commit as the registry rows + regen (D-15 binding atom).

---

### `scripts/pipeline/build-publish-bundle.mjs` (canary 221 → 225, 3 sites — the previously-forgotten one)

**Analog for the mechanical bump shape:** same commit `6acc429b` pattern, applied to this file's own independent canary (this is D-23's "second canary" — never bumped before, currently RED at HEAD: `14 passed, 1 failed`).

**Current HEAD state (verified this session):**
```
:7    // Converts EVERY docs/_registry/RE-index.md Status:Approved doc (221 today) to .docx,
:515  // (a) Approved selection yields exactly 221 rows (reuses the imported, self-test-proven parser)
:516  stTry('(a) Approved selection yields exactly 221 rows', () => {
:519  stAssert('(a) Approved selection yields exactly 221 rows', rows.length === 221, 'rows.length=' + rows.length);
```
**Pattern to copy (mirror the build-filename-map.mjs 221→223 diff shape above, applied here with 221→225):**
```diff
-// Converts EVERY docs/_registry/RE-index.md Status:Approved doc (221 today) to .docx,
+// Converts EVERY docs/_registry/RE-index.md Status:Approved doc (225 today) to .docx,
...
-  // (a) Approved selection yields exactly 221 rows (reuses the imported, self-test-proven parser)
-  stTry('(a) Approved selection yields exactly 221 rows', () => {
+  // (a) Approved selection yields exactly 225 rows (reuses the imported, self-test-proven parser)
+  //     (bumped 221 -> 225 in Phase 137: previously-missed canary, RED since v1.18 close per FILENAME-MAP-SELFTEST-DRIFT precedent — see 6acc429b)
+  stTry('(a) Approved selection yields exactly 225 rows', () => {
     ...
-    stAssert('(a) Approved selection yields exactly 221 rows', rows.length === 221, 'rows.length=' + rows.length);
+    stAssert('(a) Approved selection yields exactly 225 rows', rows.length === 225, 'rows.length=' + rows.length);
```
Note the label string appears in BOTH `stTry(...)` and `stAssert(...)` calls at `:516`/`:519` — bump both occurrences plus the `:515` comment and the `:7` header comment (4 literal-string sites total, all naming "221"/"225" or "exactly N rows"). This is the SAME commit as the `build-filename-map.mjs` bump and the registry+regen (D-15/D-23 binding atom — the analog commit `6acc429b` bundled its one canary with the audit report; Phase 137 bundles both canaries with the registry+regen instead, per CONTEXT).

---

### `.planning/REQUIREMENTS.md` CLASS-05 / `.planning/ROADMAP.md` Phase-137 SC2 / `.planning/STATE.md:307`

**No strong structural analog** — these are one-off prose amendments naming both canary files/values (D-23) and correcting a stale "zero pipeline code changes" claim (D-25). Treat as plain text edits, no code pattern needed. Style precedent: match the terse, declarative style already used elsewhere in these files (e.g., `6acc429b`'s own commit-body prose narrating the canary/drift fix is a reasonable tone model).

## Shared Patterns

### Three-commit, flip-first topology (D-13/D-14)
**Source:** Phase 132's `996dcead` → `fb179bfa` → `71ad89a3` sequence
**Apply to:** the whole phase's commit plan
- Commit A: 2-site Draft→Approved flip on both recipe files (gated by D-24 pandoc pre-flight)
- Commit B: registry rows + filename-map regen + BOTH canary bumps (the binding atom, D-15) + STATE.md:307 correction + REQUIREMENTS/ROADMAP amendment
- Commit C (plan 137-02, `depends_on: ["137-01"]`): docs/index.md table rows + line-38 bullet, together

### Commit-message convention
**Source:** `996dcead`, `fb179bfa`, `71ad89a3` subject lines
**Apply to:** all 137-0N commits
Format: `docs(137-NN): <imperative summary>`, body = bulleted list of concrete file-level changes, e.g. `docs(137-01): flip RE-224/RE-225 recipes Draft to Approved`, `docs(137-01): register RE-224/RE-225 and regenerate filename-map`, `docs(137-02): register RE-224/RE-225 in index.md navigation`.

### Generated-file discipline
**Source:** `fb179bfa`'s commit body: "Regenerate scripts/pipeline/filename-map.md via build-filename-map.mjs (generator byte-unchanged, zero pipeline code changes)"
**Apply to:** `scripts/pipeline/filename-map.md` only — **but do NOT copy the "zero pipeline code changes" phrase into 137's commit message or VERIFICATION**, since Phase 137 DOES change pipeline code (the 2 canary bumps). This is CONTEXT D-25's explicit warning — the phrase is a false-premise trap this exact phase must avoid repeating.

### Drift-canary bump mechanics
**Source:** commit `6acc429b` (the only prior canary-bump commit in this repo's history)
**Apply to:** both `scripts/pipeline/build-filename-map.mjs` and `scripts/pipeline/build-publish-bundle.mjs`
Pattern: bump the integer literal in every occurrence (comment + label string + assertion), run `--self-test` before/after to prove the flip (RESEARCH.md records exact before/after self-test output for both scripts), and land the bump in the SAME commit as the registry change that necessitates it — never a standalone commit, per the FILENAME-MAP-SELFTEST-DRIFT lesson this repo already learned once.

## No Analog Found

None — every file in this phase's scope has at least a role-match analog from Phase 132 or commit `6acc429b`. The weakest matches (REQUIREMENTS/ROADMAP/STATE prose edits) need no code pattern; they are one-line factual/prose corrections with no meaningful "pattern" to extract beyond matching existing prose tone.

## Metadata

**Analog search scope:** `.planning/milestones/v1.18-phases/132-integration-navigation-last-close/` (CONTEXT/plans/VERIFICATION), git history (`996dcead`, `fb179bfa`, `71ad89a3`, `6acc429b`), current HEAD of `scripts/pipeline/build-filename-map.mjs`, `scripts/pipeline/build-publish-bundle.mjs`, `docs/index.md`, `docs/_registry/RE-index.md`.
**Files scanned:** 4 commits (full diffs read), 2 pipeline scripts (canary sites grepped + read), 2 CONTEXT/RESEARCH docs (already exhaustively verified this session per RESEARCH.md's own claims).
**Pattern extraction date:** 2026-08-03
