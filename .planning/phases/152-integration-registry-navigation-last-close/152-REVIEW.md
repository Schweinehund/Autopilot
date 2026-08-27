---
phase: 152-integration-registry-navigation-last-close
reviewed: 2026-08-27T00:00:00Z
depth: standard
files_reviewed: 10
files_reviewed_list:
  - docs/_registry/RE-index.md
  - docs/admin-setup-apv1/01-hardware-hash-upload.md
  - docs/admin-setup-apv2/02-etg-device-group.md
  - docs/index.md
  - docs/operations/00-index.md
  - docs/operations/app-lifecycle/00-overview.md
  - docs/operations/patch-management/06-windows-driver-firmware-updates.md
  - scripts/pipeline/build-filename-map.mjs
  - scripts/pipeline/build-publish-bundle.mjs
  - scripts/pipeline/filename-map.md
findings:
  critical: 2
  warning: 2
  info: 3
  total: 7
status: issues-found
---

# Phase 152: Code Review Report

**Reviewed:** 2026-08-27
**Depth:** standard
**Files Reviewed:** 10
**Status:** issues_found

## Summary

The mechanical core of this phase is sound and I could not break it. I independently
reproduced every load-bearing measurement rather than trusting the commit bodies or the
four SUMMARYs:

- **Registry rows.** All 236 rows parse; a script that opens each target file and compares
  the registry `Title` to the file's first `# ` heading reports **236/236 exact, 0
  mismatches, 0 missing files**. All eleven new Titles are the H1 byte-for-byte, including
  the parenthetical in `Device Firmware Configuration Interface (DFCI)` and the colon in
  Recipe #5. `Doc Type` is defensible on all eleven and matches frontmatter `doc_type` on
  the two enrolled documents. All 236 rows are `Approved`.
- **Filename map.** I copied `RE-index.md` and `build-filename-map.mjs` into a scratch tree
  and ran the real generator: `Parsed 236 registry rows -> 236 output filenames, 0
  unresolved collisions`, and the output is **byte-identical** to the committed
  `filename-map.md`. The commit diff is eleven pure additions, zero deletions, zero
  reordering, **zero renames of any incumbent `.docx`**. The D-08 disambiguator did not fire.
- **Canaries.** Measured separately, each with its own instrument over its own set:
  `grep -c '^| RE-'` = 236 (all rows, canary 1) and
  `parseRegistry(...).filter(r => r.status === 'Approved').length` = 236 (canary 2).
  Both literals are correct for the set they actually count. All four sites in each script
  are bumped; `grep -n '\b225\b'` leaves only the two Phase-137 ledger lines, which survive
  verbatim, un-edited-in-place. Both `--self-test` runs exit 0 (8/8 and 15/15).
- **Divergence guard.** `checkDivergence` fails only on a literal `status: Draft`; the nine
  operations documents carry no `status:` key, so the guard passes without a flip commit —
  D-04's premise verified directly against the code, not the claim.
- **Gates.** C17 `236 files checked, 0 violations`; `check-nav-hub-links` `0/0/0`; apex
  `check-phase-144.mjs` **101 PASS, 0 FAIL, 0 SKIPPED** at HEAD. Every anchor fragment added
  in Commit B resolves, including the double-hyphen em-dash artifact in
  `#enterprise-app-management-store-apps-and-winget--routing`, which I confirmed against the
  checker's own `githubSlug` implementation.
- **Prose fact-checks.** I opened each target document and verified the new hub `Covers`
  cells against their sources: Dell/DCECMI/Intune-holds-the-password, HP Connect/Sure
  Admin/Remediations/vendor-held, Lenovo TBCT V2 + LBCT V2/customer-held/no-connector,
  Autopatch's `## Autopatch Groups and the Test / Last Model`, and the Linux, driver and
  app-update headings. **All accurate.** The four inbound links land in semantically correct
  places — the DFCI prerequisites section that the apv1 guide's hash-upload paths actually
  disqualify is a genuinely well-chosen target, and the `06 -> firmware-bios/00` link is a
  true reciprocal (00 already linked to 06).
- **Section-order mirror.** Both hub files carry the identical six-item domain sequence.
  Row counts stated in prose match the tables: 6/9/3/4/5, H2 count 11 == 11, banner
  paragraph 143 -> 173 against the 200 cap, file growth 79->99 and 395->408. Every number
  in the SUMMARYs that I re-measured held.
- **One claim I expected to break and did not.** I tested whether the six new documents with
  no master-hub row (RE-226, RE-231, RE-232, RE-234, RE-235, RE-236) are orphaned inside the
  published bundle, since the operations index itself is unregistered. They are not — each
  is reachable from at least three registered documents, and the whole set is reachable from
  RE-219 via RE-228 and RE-227. No finding.

The defects below are all in the class the validators structurally cannot see: prose that is
now false, an unrecorded asymmetry, and a live data-loss footgun in a script this phase
edited but did not fix.

## Critical Issues

### CR-01: The recipes section lead-in is now factually false for Recipe #5, and contradicts the bullet this phase amended 238 lines above it

**File:** `docs/index.md:276`

**Issue:** The phase added the Recipe #5 row at line 285 and amended the quick-nav bullet at
line 38 to read `End-to-end provisioning **and governance** recipes` — D-46 did this
explicitly because "Recipe #5 is a governance recipe, and the parenthetical is otherwise a
device-end-state list that it does not belong to." That exact reasoning applies verbatim to
the section's own lead-in, which was not touched:

```
Step-by-step, admin-decision-point-driven provisioning recipes -- each yields a concrete,
reproducible device configuration end-to-end through Intune, from zero to verified end state.
```

Recipe #5 is none of those things, by its own text. `docs/recipes/05-enterprise-update-plan.md`
carries the blockquote **"Scope: A tenant-wide configuration plan, not a per-platform
procedure guide"**, and its Anti-Feature table's first row bars "tenant-specific ring sizes,
deferral days, deadlines or percentages written into this plan … This plan is a decision
framework, not a tenant configuration." It yields no device configuration and no device end
state. The sentence uses the universal quantifier "each", so adding row 5 made it false.

`docs/index.md` is `RE-219` and ships as a `.docx` in the published bundle, so this is a
false statement in a released artifact, in the same file whose quick-nav bullet asserts the
opposite. No `.planning/` artifact for this phase mentions line 276 at all
(`grep` across all phase files returns nothing) — this is an omission, not a recorded
deferral.

**Fix:** Free and safe — I grepped `scripts/` and **no validator pins this line**, so it can
be amended with the same shape D-46 used on the bullet:

```markdown
Step-by-step, admin-decision-point-driven provisioning and governance recipes -- each yields
a concrete, reproducible outcome end-to-end through Intune, from zero to verified end state
for a device, or a governed posture for a fleet.
```

Recount C17 assertion 12 is not implicated (this is a plain paragraph, not a blockquote), and
`check-phase-137.mjs` anchors only on the quick-nav bullet line.

---

### CR-02: `build-publish-bundle.mjs` still defaults to `v1.17` and clobbers an existing release zip with no existence check — and the shipped `dist/docs-library-v1.17.zip` is already gone

**File:** `scripts/pipeline/build-publish-bundle.mjs:40`, `:11`, `:484-486`

**Issue:** Two lines, both in a file this commit edited:

```js
// :40
const VERSION = versionArg ? versionArg.slice('--version='.length) : 'v1.17'; // fallback preserves current behavior when the flag is absent
// :484-486
const zipDest = join(distDirAbs, ZIP_NAME);
...
renameSync(zipTmp, zipDest);   // unconditional -- no existsSync guard, no --force required
```

An invocation with no `--version` flag silently rebuilds the **current 236-document corpus**
under the name of a shipped historical release and overwrites it. There is no existence
check, no prompt, no `--force` gate. The comment at `:11` (`--version=, defaults to v1.17`)
documents the hazard three lines below the line-8 canary this commit bumped, and the fix
was not made.

This is not hypothetical — the loss has already occurred inside this phase:

- `152-CONTEXT.md` D-23 records `[MEASURED]` on 2026-08-26 that
  `dist/docs-library-v1.17.zip` existed at **3,711,194 bytes, dated 2026-07-12**, and rates
  the reversibility "one-way — the clobbered artifact is a shipped deliverable with no
  source of truth other than the file itself."
- `152-02-SUMMARY.md:269` records that the pre-plan probe "ran the bundle end to end … and
  (per D-23) **produced and then removed a v1.17-named zip**."
- `ls -la dist/` at HEAD shows `docs-library-v1.18.zip`, `v1.19.zip`, `v1.20.zip` and the new
  `v1.21.0.zip`. **`docs-library-v1.17.zip` is absent.**

D-23 correctly protected the *planned* Wave-2 run by mandating `--version=v1.21.0`. It did
not protect against the unflagged probe run, and `152-02-SUMMARY`'s verification table then
reports the file as `absent before, during and after` — true, but framed as a clean
baseline rather than as the destruction D-23 predicted one day earlier. The next unflagged
invocation by anyone will do it again, now to whatever occupies the v1.17 slot.

**Fix:** Two additions at the top of the write path, plus removing the dangerous default:

```js
// :40 -- fail closed rather than aliasing an old release
if (!versionArg && !SELF_TEST) {
  process.stderr.write('FATAL: --version=vX.Y[.Z] is required (the old v1.17 default silently overwrote a shipped release artifact)\n');
  process.exit(1);
}
const VERSION = versionArg ? versionArg.slice('--version='.length) : null;

// :484 -- never clobber an existing release without an explicit opt-in
const zipDest = join(distDirAbs, ZIP_NAME);
if (existsSync(zipDest) && !argv.includes('--overwrite')) {
  process.stderr.write('FATAL: ' + zipDest + ' already exists -- pass --overwrite to replace a released artifact\n');
  process.exit(1);
}
```

Also amend the `:11` header comment, which currently advertises the removed default. The
lost v1.17 artifact should be separately recorded as an unrecoverable deliverable loss (or
rebuilt from tag `v1.17` if the corpus at that tag can be re-converted).

## Warnings

### WR-01: `docs/admin-setup-apv2/02-etg-device-group.md` received a content edit but no Version History row, while its sibling in the same commit did

**File:** `docs/admin-setup-apv2/02-etg-device-group.md:129` (the edit), Version History table at
the file tail

**Issue:** Commit B edits four inbound-link host files. Two of them carry a
`## Version History` section: `docs/admin-setup-apv1/01-hardware-hash-upload.md` and
`docs/admin-setup-apv2/02-etg-device-group.md`. The apv1 file got a row
(`2026-08-27 | Phase 152 INT-04: added a See Also link …`); the apv2 file did not, and its
table still ends at `2026-07-05 | v1.15 EEE reformat`. The other two hosts have no Version
History section at all, so they are correctly exempt.

D-54's stated justification for the apv1 row is that "that file … carries its own See Also
and Version History sections." That justification holds identically for the apv2 file.
`152-04-SUMMARY.md` records three sub-decisions for the apv1 row (lines 115-118) and records
nothing about the apv2 file's history table — the asymmetry was never noticed, let alone
ruled on. D-47 established for this corpus that "essentially every edit gets a row."

Consequence: the apv2 document's provenance ledger silently loses this change. A future
reader diffing that file finds an edit with no recorded owner or requirement.

**Fix:** Add the mirror row, matching the apv1 wording and the reverse-chronological
convention:

```markdown
| Date | Change | Author |
|------|--------|--------|
| 2026-08-27 | Phase 152 INT-04: linked the supported-app-types "Microsoft Store (WinGet)" phrase to the Windows application updates routing section. | -- |
| 2026-07-05 | v1.15 EEE reformat — content not re-reviewed | — |
```

If the omission was deliberate, record the reason — the two files were treated differently
in the same commit for no stated cause.

---

### WR-02: `docs/index.md` now carries three enumerations of the operational domains, one updated by this phase and two stale — and the deferral record names only one of the two stale sites

**File:** `docs/index.md:291` (and `:39`)

**Issue:** The phase added a sixth Operations sub-heading and correctly appended
`firmware and BIOS governance` to the banner blockquote at line 23 (D-44). Two other
enumerations of the same list were left alone:

- **Line 39** (quick-nav bullet) — deliberately left, D-43, ratified precedent, and recorded
  in the CONTEXT's Deferred Ideas as "The Operations quick-nav bullet's stale enumeration."
- **Line 291** (the Operations H2 lead-in) — `Cross-platform operational guidance for
  Intune-managed fleets -- co-management, patch and update management, app lifecycle
  automation, and compliance drift detection plus tenant migration.` I confirmed by
  `git show 56f55307:docs/index.md` that this line is byte-identical to the phase base, so
  the staleness is inherited (it has omitted Apple Business since Phase 65) — **but it is
  named nowhere.** It is absent from D-43, from D-33/D-34's "four sites, two literals"
  analysis, from the Deferred Ideas list, and from all four SUMMARYs.

The phase's own D-34 makes precisely this point about a different cell — that the draft's
site inventory was wrong and "a future phase will inherit it." The same inventory error
recurs here. Line 291 now enumerates four domains where the section carries six, and the
same file's banner three paragraphs of prose apart says five and then six.

**Fix:** Either append the two missing domains to line 291 in this phase (no validator pins
this line — I grepped `scripts/` for the sentence and got zero hits, so the edit is free),
or add it by name to the Deferred Ideas entry so the corpus-hygiene milestone inherits a
complete checklist:

```markdown
- **The Operations quick-nav bullet AND the Operations H2 lead-in (`docs/index.md:39` and
  `:291`).** Both list four domains; the section carries six after Phase 152. Two sites,
  two distinct literals, neither validator-pinned.
```

## Info

### IN-01: The master-hub firmware lead-in names three OEMs but the curated table exposes only Dell, with no in-section route to the other two

**File:** `docs/index.md:345-352`

**Issue:** The lead-in reads "who holds the BIOS secret across **Dell, HP and Lenovo**
hardware … and the **per-OEM** delivery, offboarding and recovery paths", but the three-row
table lists the overview, DFCI and Dell only. HP (`RE-231`) and Lenovo (`RE-232`) have no
master-hub presence and no pointer from inside the section. D-39 rules three rows by Phase-65
precedent, and the overview row does route onward, so this is a curation choice rather than a
defect — but the lead-in over-promises relative to its own table.

**Fix:** Either trim the lead-in to what the table delivers, or add a trailing clause such as
"…; HP, Lenovo and the cross-vendor matrix are on the [Operations Index](operations/00-index.md#firmware-and-bios-governance)."

---

### IN-02: Both Patch table lead-ins are now stale by four documents, not one, and the deferral text still says "omit Linux"

**File:** `docs/operations/00-index.md:28`, `docs/index.md:304`

**Issue:** The operations-index Patch table grew from five rows to nine and the master-hub
sub-table from three to four, but both lead-in sentences still enumerate only WUfB rings,
macOS DDM, iOS lifecycle and Android per-OEM delivery. The CONTEXT's Deferred Ideas entry
describes the gap as "the lead-in sentences above both tables omit Linux"; after this phase
they also omit Windows driver and firmware updates, Windows Autopatch and Windows application
updates. Same accepted-deferral class as WR-02 and D-33, so not a defect — but the deferral's
recorded scope is now understated by three documents.

**Fix:** Update the Deferred Ideas wording to name all four omissions, so the hygiene
milestone sizes the work correctly.

---

### IN-03: The Approved-only canary's new provenance line describes an all-rows event

**File:** `scripts/pipeline/build-publish-bundle.mjs:520-521`

**Issue:**

```js
//     (bumped 225 -> 236 in Phase 152: RE-226..RE-236 registered -- the firmware OEM matrix,
//      Recipe #5 and nine docs/operations/ guides; both canaries bumped together)
```

"RE-226..RE-236 **registered**" is the event canary 1 (all registry rows) counts. This canary
counts `Approved`-only rows, and D-20 is explicit that conflating the two sets is the failure
mode this ledger exists to prevent — the two numbers are equal today only because every row
is Approved. The line is harmless while they agree and will read as misleading provenance the
first time they diverge.

**Fix:** Name the set the canary counts:

```js
//     (bumped 225 -> 236 in Phase 152: RE-226..RE-236 registered AND Approved, so the
//      Approved-only count moved with the all-rows count; measured independently, not transcribed)
```

---

_Reviewed: 2026-08-27_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
