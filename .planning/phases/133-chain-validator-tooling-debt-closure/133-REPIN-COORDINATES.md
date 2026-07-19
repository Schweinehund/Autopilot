# Phase 133 Plan 01: TOOL-04 Re-Pin Coordinate Tables

**Purpose:** Authoritative old->new `{file,line}` coordinate tables for the 6 distinct TOOL-04
reconciliation targets, consumed mechanically by Plan 02's atomic D-00a-exception re-pin commit.
Recon-only (D-01) — **no sidecar or `.mjs` file is edited by this document or by Plan 01.**

Ground truth: `scripts/validation/v1.17-audit-allowlist.json` (git-confirmed byte-unchanged content
since the v1.17 close SHA `a96f3b76`). Every `line` transition below was derived by matching each
older pin's semantic identity (content/context, cross-referenced via v1.16's and v1.17's own
`reason`-field shift-history annotations, e.g. `"was line 51, single blockquote"`) against
v1.17's current, verified-correct line. **No blind arithmetic** (per RESEARCH Pitfall 1). `reason`
text is never altered here or in Plan 02 — only the `line` integer moves.

---

## 1. Freshness Guard (PASSED)

```
FILES = docs/_glossary-android.md
        docs/android-lifecycle/00-enrollment-overview.md
        docs/admin-setup-android/03-fully-managed-cobo.md
        docs/l2-runbooks/20-android-app-install-investigation.md
        docs/reference/android-capability-matrix.md
        docs/android-lifecycle/03-android-version-matrix.md
        docs/admin-setup-android/07-knox-mobile-enrollment.md
        docs/admin-setup-android/02-zero-touch-portal.md

git log --oneline a96f3b76..HEAD -- $FILES  =>  ZERO lines
```

Result: **PASS.** None of the 8 pinned Android/Linux files have changed since the v1.17 close SHA.
`v1.17-audit-allowlist.json`'s current line numbers are today's live-tree-correct coordinates for
every pin category (supervision, c7_knox, c9, safetynet). Ground truth is valid; proceed.

## 2. Group-S Byte-Identity (CONFIRMED)

`v1.5` through `v1.13` (9 sidecars) carry byte-identical `supervision_exemptions`,
`c7_knox_allowlist`, `c9_exemptions`, and `safetynet_exemptions` arrays (verified via direct JSON
string-equality diff, all 4 categories, all 8 comparisons `v1.6..v1.13` vs `v1.5` = `true`).
**One computation (below) covers all 9 sidecars.** Reduces the 13-sidecar problem to 6 distinct
reconciliation targets: `v1.4`, `v1.4.1`, `Group-S` (=`v1.5`..`v1.13`), `v1.14`, `v1.15`, `v1.16`.

---

## 3. Target: v1.16 -> v1.17 (Case 1 — fully solved, zero-risk)

Pure copy of the already-verified 35-pin `-1` shift (Phase 128's own fix, cross-checked against
raw JSON this session — exact match). Source: RESEARCH Appendix B / `128-01-SUMMARY.md`.

**`docs/_glossary-android.md`** (21 pins, all `-1`):
38->37, 90->89, 94->93, 126->125, 128->127, 130->129, 132->131, 146->145, 148->147, 152->151,
187->186, 202->201, 219->218, 221->220 (x2, two distinct pins share this line), 225->224,
304->303, 331->330, 333->332, 334->333, 338->337

**`docs/reference/android-capability-matrix.md`** (8 pins, all `-1`):
75->74, 123->122, 125->124, 126->125, 128->127, 130->129, 134->133, 135->134

**`docs/admin-setup-android/03-fully-managed-cobo.md`** (3 pins, all `-1`):
52->51, 54->53, 199->198

**`docs/android-lifecycle/03-android-version-matrix.md`** (3 pins, all `-1`):
58->57, 102->101, 104->103

**No-change files** (v1.16 values already match v1.17 exactly — not touched by HYG-02):
- `docs/android-lifecycle/00-enrollment-overview.md`: 65, 67, 97 (unchanged)
- `docs/l2-runbooks/20-android-app-install-investigation.md`: 33 (unchanged)

Total: 35 line moves + 4 no-change pins = 39 pins, count/identity unchanged vs v1.17 (26/10/4/4).

---

## 4. Target: v1.15 -> v1.17 (Case 2)

**`docs/android-lifecycle/00-enrollment-overview.md`** (3 pins, +14 shift, pre-Phase-125 values):
51->65, 53->67, 83->97

**`docs/l2-runbooks/20-android-app-install-investigation.md`** (1 pin): 33->33 (no change)

**`docs/admin-setup-android/03-fully-managed-cobo.md`** (2 pins, `-1` only, already Phase-119-split):
52->51, 54->53

**`docs/reference/android-capability-matrix.md`** (7 pins, `-1` only, already Phase-119-shifted —
includes the Phase-119 NEW pin at 130, which v1.15 already has):
123->122, 125->124, 126->125, 128->127, 130->129, 134->133, 135->134

**`docs/_glossary-android.md` supervision** (9 pre-Phase-125 pin identities -> 13 current lines;
2 of the 9 are C17 #12 fragmentation-expansion sources — see Section 9):
- 18 -> 37 (Alphabetical Index entry)
- 51 -> **{89, 93}** (COBO Cross-platform-note; FRAGMENTS 1->2, see Section 9)
- 71 -> **{125, 127, 129, 131}** (Fully-Managed Cross-platform-note; FRAGMENTS 1->4, see Section 9)
- 81 -> 145 (### Supervision H3 heading)
- 83 -> 147 (Android note blockquote for Supervision H3)
- 84 -> 151 ('> See also:' line inside Supervision H3 blockquote)
- 183 -> 303 (cumulative Summary-first-insertion row)
- 197 -> 330 (Version History row, Phase 59 CLEAN-08)
- 200 -> 333 (Phase 34 Foundation Version History entry)

**`docs/_glossary-android.md` c7_knox** (5 pin identities -> 5 current lines, no expansion; the
124/125 dup-pair below is a pre-existing 2-pins-same-line pattern, not a new expansion):
123 -> 218, 125 -> 220 (x2, dup pair carried forward as-is), 127 -> 224, 199 -> 332

**Non-glossary c7_knox** (5 pins, already byte-unchanged since v1.15 close — **no change**):
`07-knox-mobile-enrollment.md`: 21, 167 (x2), 173 (all unchanged)
`02-zero-touch-portal.md`: 147 (unchanged)

**c9_exemptions** (4 pins):
`03-android-version-matrix.md` 41->57; `_glossary-android.md` 204->337;
`03-fully-managed-cobo.md` 199->198; `android-capability-matrix.md` 75->74

**safetynet_exemptions** (4 pins, identical raw values to v1.16 -> same `-1` shift):
`_glossary-android.md` 187->186, 202->201; `03-android-version-matrix.md` 102->101, 104->103

Post-fix v1.15 pin count: supervision 22->26 (+4 from the 2 fragmentation expansions),
c7_knox 10 (unchanged), c9 4 (unchanged), safetynet 4 (unchanged). **Exactly matches v1.17's
26/10/4/4** — v1.15 already had 100% of v1.17's pin identities pre-freeze.

---

## 5. Target: v1.14 -> v1.17 (Case 3a)

**`docs/android-lifecycle/00-enrollment-overview.md`** (3 pins, +14): 51->65, 53->67, 83->97

**`docs/l2-runbooks/20-android-app-install-investigation.md`** (1 pin): 21->33

**`docs/admin-setup-android/03-fully-managed-cobo.md`** (1 pin -> 2 lines, Phase-119 split —
NOT C17 #12; see Section 9): 36 -> **{51, 53}**

**`docs/reference/android-capability-matrix.md`** (6 pins, semantic Phase-58-carryover match to
v1.17's "was line X" annotations; the 7th v1.17 pin, the Phase-119 NEW pin at 129, has **no v1.14
source** — see Section 10 residual note):
89->122, 91->124, 92->125, 94->127, 98->133, 99->134

**`docs/_glossary-android.md` supervision** (9 pin identities -> 13 current lines; same 2
fragmentation sources as v1.15's, identical target sets):
18->37, **51 -> {89, 93}**, **71 -> {125, 127, 129, 131}**, 81->145, 83->147, 84->151, 183->303,
197->330, 200->333

**`docs/_glossary-android.md` c7_knox** (5 pins, no expansion): 123->218, 125->220 (x2), 127->224,
199->332

**Non-glossary c7_knox** (5 pins, `v1.5` graduation-baseline raw values, need the Phase-119 shift):
`07-knox-mobile-enrollment.md` 11->21, 143->167 (x2), 145->173
`02-zero-touch-portal.md` 131->147

**c9_exemptions** (4 pins): `03-android-version-matrix.md` 41->57; `_glossary-android.md` 204->337;
`03-fully-managed-cobo.md` 153->198; `android-capability-matrix.md` 55->74

**safetynet_exemptions** (4 pins, identical raw values to v1.15/v1.16): `_glossary-android.md`
187->186, 202->201; `03-android-version-matrix.md` 102->101, 104->103

Post-fix v1.14 pin count: supervision 20->25 (glossary 9->13 [+4] + cobo 1->2 [+1]; capability-matrix
stays 6, NOT 7 — the Phase-119 NEW pin has no v1.14 source, see Section 10), c7_knox 10 (unchanged),
c9 4 (unchanged), safetynet 4 (unchanged).

---

## 6. Target: Group-S (`v1.5`..`v1.13`, one computation) -> v1.17 (Case 3b)

**`docs/android-lifecycle/00-enrollment-overview.md`** (3 pins, +14): 51->65, 53->67, 83->97

**`docs/l2-runbooks/20-android-app-install-investigation.md`** (1 pin): 21->33

**`docs/admin-setup-android/03-fully-managed-cobo.md`** (1 pin -> 2 lines, Phase-119 split):
36 -> **{51, 53}**

**`docs/reference/android-capability-matrix.md`** (6 pins; semantic match, same targets as v1.14's
— content is identical, only the frozen-snapshot line numbers differ by 1; 7th pin has no source,
see Section 10): 88->122, 90->124, 91->125, 93->127, 97->133, 98->134

**`docs/_glossary-android.md` supervision** (9 pin identities -> 13 current lines; same targets as
v1.14/v1.15's, values 1 less throughout):
17->37, **50 -> {89, 93}**, **70 -> {125, 127, 129, 131}**, 80->145, 82->147, 83->151, 182->303,
196->330, 199->333

**`docs/_glossary-android.md` c7_knox** (5 pins, no expansion): 122->218, 124->220 (x2), 126->224,
198->332

**Non-glossary c7_knox** (5 pins, `v1.5` graduation-baseline values, need Phase-119 shift):
`07-knox-mobile-enrollment.md` 11->21, 143->167 (x2), 145->173
`02-zero-touch-portal.md` 131->147

**c9_exemptions** (4 pins): `03-android-version-matrix.md` 41->57; `_glossary-android.md` 203->337;
`03-fully-managed-cobo.md` 153->198; `android-capability-matrix.md` 54->74

**safetynet_exemptions** (4 pins): `_glossary-android.md` 186 (no change — already equals target;
coincidental numeric collision, not semantically "unchanged," see note below), 201 (no change,
same caveat); `03-android-version-matrix.md` 102->101, 104->103

> Note on the glossary safetynet "no change" pins: Group-S's raw glossary values (186, 201)
> numerically equal v1.17's target (186, 201), but this is coincidental, not a true zero-diff —
> Group-S's pre-growth snapshot and v1.17's post-HYG-02 snapshot land on the same integers via two
> different histories (no unrelated-growth shift ever applied to Group-S's copy; a +1 unrelated
> growth shift *and* the -1 HYG-02 shift both applied to v1.14/v1.15/v1.16's copy, netting to the
> same target). Operationally the coordinate is correct either way — flagged for transparency only.

Post-fix Group-S pin count (applies once, to all 9 sidecars `v1.5`-`v1.13`): supervision 20->25
(glossary 9->13 [+4] + cobo 1->2 [+1]; capability-matrix stays 6/7, see Section 10), c7_knox 10
(unchanged), c9 4 (unchanged), safetynet 4 (unchanged).

---

## 7. Target: v1.4 -> v1.17 (Case 3c, unique)

**`docs/android-lifecycle/00-enrollment-overview.md`** (3 pins): 51->65, 53->67, 83->97

**`docs/l2-runbooks/20-android-app-install-investigation.md`** (1 pin): 21->33

**`docs/admin-setup-android/03-fully-managed-cobo.md`** (1 pin -> 2 lines, Phase-119 split):
35 -> **{51, 53}**

**`docs/reference/android-capability-matrix.md`** (6 pins, Phase-42-D-12-baseline, semantic match):
74->122, 76->124, 77->125, 79->127, 83->133, 84->134

**`docs/_glossary-android.md` supervision** (7 pin identities; 6 map cleanly, 1 is an unresolved
residual — see Section 10):
- 15 -> 37 (Alphabetical index link)
- 45 -> **{89, 93}** (COBO Cross-platform note; FRAGMENTS 1->2)
- 63 -> **{125, 127, 129, 131}** (Fully Managed Cross-platform note; FRAGMENTS 1->4)
- 65 -> 145 (H3 Supervision disambiguation heading)
- 67 -> 147 (Supervision disambiguation blockquote body)
- 148 -> 333 (Version History row, Phase 34 foundation decision)
- **134 -> NO TARGET (residual, out of re-pin scope — see Section 10, "MHS pin")**

**`docs/_glossary-android.md` c7_knox**: none (v1.4 predates Knox content; `c7_knox_allowlist: 0`)

**c9_exemptions**: none (v1.4 predates COPE/c9 content; `c9_exemptions: 0`)

**safetynet_exemptions** (4 pins): `_glossary-android.md` 138->186 (Play Integrity predecessor
prose), 150->201 (SafetyNet sunset changelog row); `03-android-version-matrix.md` 85->101 (H3
header), 87->103 (body paragraph)

Post-fix v1.4 pin count: supervision 18 -> 22 or 23 depending on the MHS residual disposition
(6 clean single-target pins + 2-fragment [+1] + 4-fragment [+3] + enrollment-overview 3 +
l2-runbook 1 + cobo 1->2 [+1] + capability-matrix 6 = 21 resolved + 1 orphaned MHS pin = 22 total
array entries if MHS is kept unmoved, 21 if dropped — Plan 02 decision, see Section 10), c7_knox 0,
c9 0, safetynet 4 (unchanged).

---

## 8. Target: v1.4.1 -> v1.17 (Case 3d, unique — same structure as v1.4, different absolute lines)

**`docs/android-lifecycle/00-enrollment-overview.md`** (3 pins): 51->65, 53->67, 83->97

**`docs/l2-runbooks/20-android-app-install-investigation.md`** (1 pin): 21->33

**`docs/admin-setup-android/03-fully-managed-cobo.md`** (1 pin -> 2 lines, Phase-119 split):
36 -> **{51, 53}**

**`docs/reference/android-capability-matrix.md`** (6 pins): 78->122, 80->124, 81->125, 83->127,
87->133, 88->134

**`docs/_glossary-android.md` supervision** (7 pin identities; 6 map, 1 residual):
- 16 -> 37 (Alphabetical index link)
- 46 -> **{89, 93}** (COBO Cross-platform note; FRAGMENTS 1->2)
- 66 -> **{125, 127, 129, 131}** (Fully Managed Cross-platform note; FRAGMENTS 1->4)
- 76 -> 145 (H3 Supervision disambiguation heading)
- 78 -> 147 (Supervision disambiguation blockquote body)
- 188 -> 333 (Version History row, Phase 34 foundation decision)
- **172 -> NO TARGET (residual, out of re-pin scope — same MHS pin as v1.4, see Section 10)**

**c7_knox_allowlist / c9_exemptions**: none (same as v1.4)

**safetynet_exemptions** (4 pins): `_glossary-android.md` 176->186, 190->201;
`03-android-version-matrix.md` 102->101, 104->103

Post-fix v1.4.1 pin count: same shape as v1.4 (22 or 23 depending on MHS disposition), c7_knox 0,
c9 0, safetynet 4 (unchanged).

---

## 9. Fragmentation expansions (identity-preserving)

Per the LOCKED D-01 interpretation (RESEARCH Pitfall 2): a single pre-fragmentation pin's semantic
occurrence, later split into N current physical lines (each independently carrying a real
supervision/Knox/COPE match), maps to **all N** current lines — raw pin COUNT for the affected
sidecar increases, semantic IDENTITY is preserved (one pre-existing exemption intent, now
expressed as N sibling pins with the same underlying `reason`). This is mechanical fragmentation,
not value-masking, and is the only way `v1.4`-`v1.15` reach genuine C2/C7 green on these specific
lines.

| Sidecar | Source pin (file, old line) | Cause | Target fragment lines (v1.17-current) | Count |
|---|---|---|---|---|
| v1.4 | `_glossary-android.md`:45 | Phase 125 C17 #12 word-preserving split (COBO Cross-platform note) | 89, 93 | 1->2 |
| v1.4.1 | `_glossary-android.md`:46 | same | 89, 93 | 1->2 |
| Group-S (v1.5-v1.13) | `_glossary-android.md`:50 | same | 89, 93 | 1->2 |
| v1.14 | `_glossary-android.md`:51 | same | 89, 93 | 1->2 |
| v1.15 | `_glossary-android.md`:51 | same | 89, 93 | 1->2 |
| v1.4 | `_glossary-android.md`:63 | Phase 125 C17 #12 word-preserving split (Fully-Managed Cross-platform note) | 125, 127, 129, 131 | 1->4 |
| v1.4.1 | `_glossary-android.md`:66 | same | 125, 127, 129, 131 | 1->4 |
| Group-S (v1.5-v1.13) | `_glossary-android.md`:70 | same | 125, 127, 129, 131 | 1->4 |
| v1.14 | `_glossary-android.md`:71 | same | 125, 127, 129, 131 | 1->4 |
| v1.15 | `_glossary-android.md`:71 | same | 125, 127, 129, 131 | 1->4 |
| v1.4 | `admin-setup-android/03-fully-managed-cobo.md`:35 | Phase 119 EEE-retrofit table-remediation split (NOT C17 #12 — same identity-preserving principle) | 51, 53 | 1->2 |
| v1.4.1 | `admin-setup-android/03-fully-managed-cobo.md`:36 | same | 51, 53 | 1->2 |
| Group-S (v1.5-v1.13) | `admin-setup-android/03-fully-managed-cobo.md`:36 | same | 51, 53 | 1->2 |
| v1.14 | `admin-setup-android/03-fully-managed-cobo.md`:36 | same | 51, 53 | 1->2 |

`v1.16`'s own sidecar (Case 1) already carries all these post-fragmentation pins natively — no
expansion needed there, it only needed the flat `-1` HYG-02 shift. `v1.15`'s cobo pins are already
split (52, 54) — no expansion needed for cobo at v1.15.

## 10. Known residuals (NOT resolved by coordinate matching — flag for Plan 02)

**R-1: `v1.4`/`v1.4.1` "MHS cross-platform note" pin has no current-content target.**
`v1.4:_glossary-android.md:134` ("MHS cross-platform note referencing iOS supervised MDM profile")
and its `v1.4.1` counterpart (`:172`) describe content that, per a live-file grep for `supervis` in
`docs/_glossary-android.md` (13 matches, all accounted for by the 13 mapped targets above), **no
longer exists** — the current "Managed Home Screen" glossary section (`### Managed Home Screen`,
live line ~299) carries zero supervision-related text. This pin's exempted content was removed or
reworded between the v1.4.1 freeze and the v1.5 graduation baseline (v1.5's sidecar already omits
it — confirmed, `v1.5` has 9 glossary pins, none matching this content). This is genuinely
different from the C17 #12 fragmentation case (content split, still present) — here the content
itself is gone. **Plan 02 must decide:** (a) drop this 1 pin from `v1.4`/`v1.4.1` (violates strict
literal pin-count-unchanged, but the content it exempted no longer exists to be un-exempted), or
(b) leave the pin unmoved at its stale coordinate (preserves literal count, but the pin will
never match anything and is inert — does not block a green C2 for `v1.4`/`v1.4.1`, since a stale
non-matching pin cannot cause a false failure, only a permanently-unused entry). Recommendation:
(b) — leave unmoved, since it is inert either way and (a) is a scope change beyond "coordinate
re-pin." Not a blocker for this plan; recorded here per D-01's discretion clause.

**R-2: `v1.14`/Group-S `android-capability-matrix.md` is missing v1.17's Phase-119 "NEW pin" (target
line 129).** v1.17's capability-matrix supervision set has 7 pins; the 7th (`"Phase 119 NEW pin:
Phase-118 RETRO-03 table-remediation added a prose summary line"`) was added by content authored
*after* `v1.14`/Group-S froze — there is no old pin identity to move, because the exemption never
existed in those sidecars. This is not a re-pin gap; it is a content-timeline gap. `v1.15` and
`v1.16` already have this 7th pin (they postdate Phase 119). No action possible within TOOL-04's
coordinate-only scope; `v1.14`/Group-S will carry 6 capability-matrix pins post-fix, not 7 — this
does not block C2 green (a missing exemption for `v1.14`'s own already-pinned-elsewhere content
does not cause a false positive on unrelated lines; verify at Plan 02's harness-replay step that
line 129's content, if present verbatim in `v1.14`/Group-S-era text, doesn't independently need
this pin — flagged for Plan 02's verification pass, not assumed safe).

---

## 11. Per-sidecar summary of expected post-fix pin counts

| Sidecar | supervision | c7_knox | c9 | safetynet | Notes |
|---|---|---|---|---|---|
| v1.4 | 22 (or 21 if MHS dropped, see R-1) | 0 | 0 | 4 | +5 from 2 C17#12 + 1 Phase-119-cobo expansions minus the pre-existing single-pin baseline arithmetic; residual R-1 |
| v1.4.1 | 22 (or 21 if MHS dropped) | 0 | 0 | 4 | same as v1.4 |
| Group-S (v1.5-v1.13, x9) | 25 | 10 | 4 | 4 | +5 from expansions; gap R-2 (capability-matrix 6 not 7) |
| v1.14 | 25 | 10 | 4 | 4 | same expansions as Group-S; gap R-2 |
| v1.15 | 26 | 10 | 4 | 4 | matches v1.17 exactly — no gaps, no residuals |
| v1.16 | 26 | 10 | 4 | 4 | already-solved baseline (Case 1); matches v1.17 exactly |
| v1.17 (ground truth, unchanged) | 26 | 10 | 4 | 4 | reference |

All counts verified by direct construction from the tables in Sections 3-8. No `reason` text was
altered or invented anywhere in this document — every transition is a `line`-integer-only move,
matched to v1.17's live-verified-correct coordinate by semantic identity per Section 0's method.

**Zero sidecar or `.mjs` files were edited to produce this document.** `git status` at the time of
writing shows only this planning artifact as new/modified within the phase's file-modified scope.
