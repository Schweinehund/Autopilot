# Phase 160: Licensing / Hardware Decision Record - Source Text (DRAFTS)

**Gathered:** 2026-09-12 · **Status:** locked source text for the planner and executor
**Provenance:** produced by three adversarial-review rounds (Finder → Adversary → Referee, Opus) at HEAD 80179c9e; every capped string and count below was re-measured by the round-2 and round-3 Referees. This file is named in `160-CONTEXT.md` `<canonical_refs>`; the planner MUST put its path in every editing task's `<read_first>` (plan-phase.md `<deep_work_rules>`), and the executor copies the VERBATIM-LOCKED strings byte-exact.

**Lock scope (D-16):** VERBATIM — the three capped lines (E3 lead-in 167, E6 callout 194, E9 matrix blockquote 186) and the PLACEMENT spec (E1b). FACTS + SHAPE (re-measured, not byte-pinned) — bridge, table, P1, P2, the :42 and :62 cells, See Also entries, Version History rows. PLACEHOLDERS — `2026-09-DD` (execution date), `<edition>` / `<status>` / `<xpr-verdict>` (pilot reading), `D-28` already substituted as `D-28` below.

**Traps every string was scanned against:** C17 #12 (≤200 chars per contiguous `>` run, joined with spaces); V-156-ADMIN-4 (`administrator` == 10 in RE-237, == 1 in the matrix); V-156-SIGNINTO (`sign into` == 0 corpus-wide); Phase 155 D-47 tight em-dash canon for NEW prose (the See Also gloss separator keeps the section's spaced convention); table pipes balanced; STD-05 D-02 blank line before every table.

---

## PART 3 — CORRECTED DRAFTS

Lengths are `len()` after stripping `> ` wherever a cap applies. Trap scan over ALL strings below:
`administrator` **0**, `sign into` **0**, spaced em dash in prose **0** (5 tight em dashes; the only
spaced one is the matrix VH row's `| — |` Author-column placeholder, the file's own N/A convention),
bare lowercase `admin` **1** (inside the pinned lead-in only), table pipes balanced in every row.

**Tracked `check.py --no-headings` over the assembled corrected drafts: 4 candidates, down from 12.**

```
L3     [word-list] DON'T USE: admin (2x, L3,10)
L10    [word-list] DON'T USE: under (2x, L10,12)
L12    [word-list] AVOID: should (1x, L12)
L21    [em-dash-spaced] dashes.md: no space before or after an em dash  <- '—'
4 candidate(s) total.
```

All four are deliberate keeps:

- `admin` L3 = the pinned `> **Ask the admin:**` lead-in (owner-instructed keep); L10 = "Intune Admin
  Lead", a role title — sweep3's regex is case-sensitive lowercase, so it never fires on it.
- `under` = "under the volume agreement" and "under either arm". The rule's own guidance is about version
  ranges, so a fix would distort meaning.
- `should` = "a MAK-activated image **should** clear the same gate" — a deliberate hedge, and the one
  modal that makes this sentence visible to a modal-based judge instrument.
- `em-dash-spaced` = the `| — |` Author placeholder, named as a known false positive in check.py's own
  docstring.

### E2 — bridge (prose, first line of the Step 4 body) — 136

```
The licensing standard for this device class decides which rows of the delivery-mechanism table in this step are open to a device today.
```

### E3 — lead-in — 167 after `> ` strip (contiguous run as placed: 167)

```
> **Ask the admin:** Does the kiosk fleet standardize on MAK-activated Windows Enterprise on the current HP hardware, or on OEM-licensed Windows IoT Enterprise hardware?
```

### E4 — the Case-1 table (header 59 / rule 60 / MAK row 793 / IoT row 681; no cap applies)

```
| Option | When to choose | Consequence if wrong | Branch |
|--------|-----------------|----------------------|--------|
| MAK-activated Windows Enterprise on the current HP hardware | Existing fleet; the volume agreement carries a confirmed MAK entitlement; Shell Launcher wanted only after `slmgr /xpr` reports `The machine is permanently activated.` | A MAK activates volume-licensed Windows Enterprise. Volume Licensing reaches IoT Enterprise only by upgrading a device that already runs a qualifying operating system, and nobody has confirmed whether this class's image qualifies; an OEM licenses a device into IoT Enterprise at manufacture. Each MAK activation is permanent and consumes one count; **[PILOT]** an image reported as unactivated kept failing the ShellLauncher node | Standard, ruled 2026-09-10—continue with the multi-app branch at [Step 5](#step-5-author-the-assignedaccessconfiguration-xml) |
| OEM-licensed Windows IoT Enterprise hardware | Purpose-built procurement of further hardware; long-term servicing wanted (IoT Enterprise LTSC, not the general availability channel) | Procurement spend; the factory image can still ship OEM utilities, so [Step 8](#step-8-provisioning-time-baseline-and-drift-remediations) still applies; a device reaches IoT Enterprise through an OEM license at manufacture, and through Volume Licensing only as an upgrade to a qualifying operating system | Alternative—not worked here; after procurement the Shell Launcher row opens with [WindowsApp_AutoLogon.xml](../../assets/recipes/06-walk-up-avd-kiosk/windows-app/WindowsApp_AutoLogon.xml) |
```

Changes against the target: `is confirmed` → `carries a confirmed` (passive); "reports permanent
activation" → the verbatim slmgr string (#25); the three falsified absolutes replaced by the source's own
split, with `qualifying operating system` named and the qualification stated as unconfirmed (#3);
`Net-new` → `Purpose-built … of further hardware` (word-list `new`); both Branch cells now link, and both
`below` directionals are gone (#6, #20, #27).

### E5 P1 — 1,082 (no cap)

```
The Intune Admin Lead ruled on 2026-09-10 that the walk-up AVD kiosk class standardizes on MAK-activated, volume-licensed Windows Enterprise on the current HP hardware, with OEM-licensed Windows IoT Enterprise hardware as the alternative for purpose-built procurement. The ruling carries one prerequisite: confirm a MAK entitlement under the volume agreement before the first activation, because the pilot never activated a device. Microsoft's [Windows IoT Enterprise licensing](https://learn.microsoft.com/en-us/windows/iot/iot-enterprise/commercialization/licensing) page sets the split out as a requirement matrix: an OEM licenses a device into IoT Enterprise at manufacture, Volume Licensing cannot license a device into IoT Enterprise at first licensing, and Volume Licensing (KMS or MAK) reaches IoT Enterprise only by upgrading a device that already runs a qualifying operating system. Whether this class's Windows 11 Enterprise image counts as qualifying stays UNVERIFIED, so plan the MAK arm as producing volume-licensed Windows Enterprise until someone confirms otherwise.
```

### E5 P2 — 1,105 (no cap)

```
The MAK arm clears the ShellLauncher node's edition gate: Microsoft's [AssignedAccess CSP reference](https://learn.microsoft.com/en-us/windows/client-management/mdm/assignedaccess-csp) states that Shell Launcher and the ShellLauncher node both require Windows Enterprise or Windows Education to function, and that the ShellLauncher node is not supported in Windows 10 Pro. That page names no further edition, so the IoT Enterprise arm rests on this recipe's own Prerequisites list, not on the cited page; a MAK-activated image should clear the same gate—not pilot-tested, stated as reasoning from the licensing structure, not as an observation. No first-party page names activation state as a second gate, and the **[PILOT]** failure on an image reported as unactivated stands as recorded in Prerequisites. Under either arm the OEM-cleanup work in [Step 8](#step-8-provisioning-time-baseline-and-drift-remediations) stays, because it addresses the factory image rather than the license; an IoT Enterprise device narrows that work only when its specific SKU ships a clean image, which procurement verifies.
```

The citation now covers only what the page says (`Windows Enterprise or Windows Education`, `not
supported in Windows 10 Pro`); the IoT arm is explicitly attributed to RE-237's own uncited :31/:106
list; and the "not pilot-tested" disclaimer sits inside the single sentence it qualifies (#14). If G1
runs, insert the G3 sentence after "…stands as recorded in Prerequisites."

### E6 — callout — 194 after `> ` strip (contiguous run as placed: 194)

```
> **What breaks if misconfigured:** a MAK bought to reach the IoT arm activates volume-licensed Windows Enterprise; OEMs license IoT Enterprise at manufacture, Volume Licensing only as an upgrade.
```

Note: the fact-corrected first version of this line measured **226** and hard-failed C17 #12 — exactly
the trap the capped-string lock exists for.

### E7 — RE-237:42 remedy cell — 271 (the middle pinned cell is untouched)

```
Activate with a per-device volume key (a MAK, delivered through an Intune Edition upgrade profile, activates volume-licensed Windows Enterprise; reaching IoT Enterprise needs OEM-licensed hardware or a confirmed qualifying-OS upgrade path), procure OEM-licensed IoT Enterprise hardware, or take the multi-app branch worked here—see the licensing standard in [Step 4](#step-4-choose-the-delivery-mechanism)
```

### E8 — matrix :62 Notes cell, OPTION (ii) variant (blockquote kept) — full row 475

```
| Windows Subscription Activation (Pro→Enterprise) | Microsoft 365 E3, E5, or A3/A5 | NOT available in Business Premium or F-series; manual OS upgrade required without this. Also does not apply to a self-deploying, userless kiosk device—see the following blockquote. Ruled 2026-09-10 for the walk-up AVD kiosk class: MAK-activated Windows Enterprise on the current hardware is the standard, OEM-licensed IoT Enterprise hardware the alternative for purpose-built procurement |
```

### E8-alt — matrix :62 Notes cell, OPTION (i) variant (SC2 literal; no blockquote, no VH row) — full row 665, check.py 0 candidates

```
| Windows Subscription Activation (Pro→Enterprise) | Microsoft 365 E3, E5, or A3/A5 | NOT available in Business Premium or F-series; manual OS upgrade required without this. Also does not apply to a self-deploying, userless kiosk device—see the following blockquote. Ruled 2026-09-10 for the walk-up AVD kiosk class: MAK-activated Windows Enterprise on the current hardware is the standard, OEM-licensed IoT Enterprise hardware the alternative for purpose-built procurement; [IoT Enterprise is OEM-licensed at manufacture](https://learn.microsoft.com/en-us/windows/iot/iot-enterprise/commercialization/licensing) and Volume Licensing only upgrades a qualifying OS |
```

### E9 — matrix blockquote (OPTION (ii) only) — 186 after `> ` strip; its own run between :74 and :76

```
> [IoT Enterprise is OEM-licensed at manufacture](https://learn.microsoft.com/en-us/windows/iot/iot-enterprise/commercialization/licensing); Volume Licensing only upgrades a qualifying OS.
```

Measured in place: the matrix goes 9 → **10** runs, the new run lands at :76 = **186**, nothing exceeds
200, and the final byte is still `|`. The 88-char URL plus `[]()` consumes 92 of the 200-char budget,
which is why Google style's spelled-out "operating system" cannot be used here. `OS` is forced, and `OS`
already appears in the matrix at :62.

### E11 — Version History rows

RE-237 (2 columns, `| Date | Change |`; this becomes the file's FIRST change row — 168):

```
| 2026-09-DD | Phase 160 LIC-01: licensing and hardware standard for the kiosk class ruled and recorded in Step 4; Shell Launcher anti-feature remedy restated per SKU |
```

Matrix (3 columns, `| Date | Change | Author |`, newest-first above the `2026-09-03` Phase 155 row —
157). **OPTION (ii) only; dropped entirely under option (i):**

```
| 2026-09-DD | Phase 160 LIC-02: kiosk-class licensing ruling recorded in the Windows Subscription Activation row; OEM-versus-Volume-License note added | — |
```

Insertion method: match the existing `| 2026-09-03 | Phase 155 RCP-08: …` line as the Edit `old_string`
and prepend — a text-level operation that cannot introduce the trailing newline the matrix must not have
(6,428 bytes, final byte `|`). This is the technique 155-04 used.

### E12 — `## See Also` entries (append after the existing eight relative entries)

```
- [Windows IoT Enterprise licensing](https://learn.microsoft.com/en-us/windows/iot/iot-enterprise/commercialization/licensing) — Microsoft's OEM-versus-Volume-License requirement matrix for IoT Enterprise (ms.date 2026-06-24)
- [AssignedAccess CSP](https://learn.microsoft.com/en-us/windows/client-management/mdm/assignedaccess-csp) — the ShellLauncher node's edition gate and the Windows 10 Pro exclusion (ms.date 2025-03-12)
```

The second entry is where SC3's missing `ms.date 2025-03-12` can land at zero cost (#29).

---

---

# Placement spec (E1b) — VERBATIM-LOCKED

**PLACEMENT spec (new, E1b) — MEASURED by simulation at HEAD:**
insert at RE-237 line 101 (immediately after `### Step 4:` at :100 and its blank line), in this order,
each element separated by exactly one blank line, with **no two `>` lines adjacent across elements**:
bridge / blank / lead-in / blank / table (4 rows) / blank / P1 / blank / P2 / blank / callout / blank /
then the pre-existing `:102` lead-in. Post-insert measurement: RE-237 carries **27** `>` runs, max
**197**, **zero** over 200. The new runs land at :104 = 167 (lead-in) and :115 = 194 (callout); the
pre-existing lead-in moves to :117 = 138, unchanged. Post-insert pin state: `administrator` = **10**,
`Ask the admin` = **5**, `What breaks` = **9**, `sign into` = **0**.

---

# Round-3 mechanics (Referee ruling, HEAD 80179c9e)

### FINAL AMENDMENT TEXT

Both strings are **appended to the end of the existing line**, after the antecedent's final bytes
`consistent with the per-user-vs-per-device consequence RCP-08 landed in v1.22.` — which is byte-identical
at the end of both lines — with exactly one leading space. Original words are never deleted. Both files
are LF-only (`.planning/ROADMAP.md` 23,426 bytes; `.planning/REQUIREMENTS.md` 23,379 bytes at HEAD).

**`.planning/ROADMAP.md:79` — append (the antecedent's quoted clause is byte-exact for THIS file):**

```
 **[SUCCESS-CRITERION AMENDMENT, D-28]** The clause "cell-value edits only (no structural edits, respecting the `V-58-22`/`V-58-23` pin hazard)" is superseded, not deleted: it is rescoped to **no heading, column or row-structure change to the pinned capability tables**, which admits one new blockquote line and one new `## Version History` row in `docs/reference/licensing-matrix.md`. A Version History row IS a new table row; the Version History table is not the pinned structure, and this amendment says so explicitly rather than leaving it to be read in. The ruling stands on precedent, not on a measurement: Phase 155 plan 155-04 made the identical three-part edit to this same file, recorded in its SUMMARY under `## Files Created/Modified` as "RCP-08: incumbent Windows Subscription Activation row amended, new blockquote with the per-user-vs-per-device consequence and remedy reasoning, Version History row inserted newest-first; re-stamped", under a v1.22 RCP-08 that carried no structural criterion at all. Corroboration only, load-bearing on nothing: `[MEASURED 2026-09-11, not guarded]` `grep -c licensing-matrix scripts/validation/check-phase-58.mjs` returns 0, `V-58-22` pins an anchor in `android-capability-matrix.md`, and `V-58-23` pins five H2 literals across the macOS/iOS/Android capability matrices -- the named hazard does not read this file. No validator guards that reading and none is added here; re-measure it rather than cite this line.
```

**`.planning/REQUIREMENTS.md:57` (LIC-02) — append (note the DIFFERENT antecedent bytes, #5):**

```
 **[SUCCESS-CRITERION AMENDMENT, D-28]** The clause "cell-value edits (structural edits are the known `V-58-22`/`V-58-23` pin hazard)" is superseded, not deleted: it is rescoped to **no heading, column or row-structure change to the pinned capability tables**; one new blockquote line and one new `## Version History` row in `docs/reference/licensing-matrix.md` are admitted, a Version History row being a new table row that the pinned structure does not cover. The ruling stands on the Phase 155 precedent for this same file -- 155-04's SUMMARY records, under `## Files Created/Modified`, "RCP-08: incumbent Windows Subscription Activation row amended, new blockquote with the per-user-vs-per-device consequence and remedy reasoning, Version History row inserted newest-first; re-stamped" -- not on a measurement. Corroboration only: `[MEASURED 2026-09-11, not guarded]` `grep -c licensing-matrix scripts/validation/check-phase-58.mjs` returns 0. See ROADMAP Phase 160 success criterion 2 for the full reading.
```

Four properties, each deliberate and each answering a real issue:
- **#5** — each file's own antecedent is quoted byte-exact, and they differ. ROADMAP says "cell-value
  edits **only** (no structural edits, respecting…)"; REQUIREMENTS says "cell-value edits (structural
  edits **are the known** … pin hazard)".
- **#6** — the 155 precedent is cited by **quoted text under a named heading**, never by line number.
- **#20** — the precedent is the ground; the grep is explicitly demoted to "corroboration only,
  load-bearing on nothing", carries `[MEASURED 2026-09-11, not guarded]`, and closes by telling the
  next reader to re-measure rather than cite the line. That is the exact discipline
  `reference_one_time_measurement_is_not_a_guard` demands.
- **#1** — `SUCCESS-CRITERION AMENDMENT` on both, the only idiom this repository has ever used.

**Simulation result (scratch copy; repository untouched).** Copied `docs/`, `.planning/` and
`scripts/validation/` to the session scratchpad; reproduced the baseline there (**32 passed, 0 failed,
0 skipped**); applied both appends with a byte-assert on the antecedent (`ROADMAP.md:79` 1,698 chars
after; `REQUIREMENTS.md:57` 1,249 chars after); re-ran:

```
node scripts/validation/check-phase-54.mjs   ->  Summary: 32 passed, 0 failed, 0 skipped
gsd-tools roadmap get-phase 160              ->  found: true, 3 success_criteria, amendment inside #2
gsd-tools requirements mark-complete LIC-02  ->  updated: true, checkbox + traceability both applied
```

Real-tree baselines taken this session for the pre-edit half of the same gate: `check-phase-54` 32/0/0;
`c17-eee-contract` 237 files / 0 violations / all 13 assertions 0; `check-nav-hub-links` 0/0/0;
`check-phase-155` 10 PASS / 0 FAIL; `check-phase-156` 10 PASS / 0 FAIL; apex `check-phase-159`
**117 PASS / 0 FAIL** in 1m47s.

---

### Area J — FINAL plan split

Three plans, three waves, under leaf option (i). Wave numbers are **not** decoration and **not** free:
`phase.cjs:856` recomputes each wave from the `depends_on` DAG (`level + 1`) and warns on any declared
value that disagrees (#15). The values below are the DAG values.

`160-03` declares `depends_on: ["160-02"]` even though the matrix edit is functionally independent,
because both plans write `160-EVIDENCE.md`: `execute-phase.md:584-614`'s intra-wave overlap check
treats a shared `files_modified` entry as an **implicit dependency** and reports a same-wave pair as a
**planning defect**. Declaring it is the documented fix, and it costs nothing — `use_worktrees: false`
serialises everything anyway.

#### 160-01 — SC2 / LIC-02 amendment + gate baseline

```yaml
---
phase: 160-licensing-hardware-decision-record
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - .planning/ROADMAP.md
  - .planning/REQUIREMENTS.md
  - .planning/STATE.md
  - .planning/phases/160-licensing-hardware-decision-record/160-GATE-BASELINE.json
autonomous: true
requirements: []   # D-28: LIC-01 flips at 160-02 and LIC-02 at 160-03; this plan declares none so no
                   # boundary flip can fire before the content lands (159-05-PLAN.md:13 precedent;
                   # requirements.mark-complete runs from frontmatter at EVERY plan boundary)
---
```

`.planning/STATE.md` is declared because 155-01 — the named precedent for a plan that edits
`ROADMAP.md` + `REQUIREMENTS.md` — declares it, and because the harness's boundary commit touches it.
`160-02` and `160-03` omit it: they change nothing in STATE.md as plan work, and a false declaration is
what the overlap check exists to punish.

**Commits:** `docs(160-01): amend Phase 160 SC2 and LIC-02 for the licensing-matrix structural clause`
(the two criterion edits + the baseline JSON), then the harness's own
`docs(160-01): complete … plan` metadata commit. Two commits minimum, by construction (#11).

**`<verification>`:**
- `node scripts/validation/check-phase-54.mjs` → `32 passed, 0 failed` **before** the edits, recorded.
- `node scripts/validation/check-phase-54.mjs` → `32 passed, 0 failed` **after**, recorded. *(V-54-27
  walks `.planning/` recursively — #8 — so this is also the guard on the new phase artifacts.)*
- `node scripts/validation/c17-eee-contract.mjs` → `237 files checked, 0 total violations`, all 13
  per-assertion counts 0.
- `node scripts/validation/check-nav-hub-links.mjs` → `0 hub-presence failure(s), 0 corpus-link failure(s), 0 total`.
- `node scripts/validation/check-phase-155.mjs` → `10 PASS, 0 FAIL`; `check-phase-156.mjs` → `10 PASS, 0 FAIL`.
- `python .claude/skills/google-style/check.py --no-headings docs/recipes/06-walk-up-avd-kiosk-autologon.md`
  → **86 candidates**; same over `docs/reference/licensing-matrix.md` → **20 candidates**. Report-only,
  never a threshold (9,363 on the finished corpus).
- `python scripts/docs-style/sweep3.py docs/recipes scripts/docs-style/_CONTENT-PINS.txt` → `0 TOTAL edits`;
  and separately over `docs/reference` → `0 TOTAL edits`. **Per directory, never `docs`** — `docs`
  reports **1 TOTAL edit** at HEAD, in `docs/operations/`, before this phase touches anything.
- `node scripts/validation/check-phase-159.mjs` → `117 PASS, 0 FAIL` (≈1m47s), the apex pre-edit anchor.
- `gsd_run query roadmap.get-phase 160` returns 3 `success_criteria`.
- No packet judge, no fact check, no `claude -p` in this plan — it edits no prose.

**`160-GATE-BASELINE.json` shape:** ONE `phase_baseline` object mirroring `155-GATE-BASELINE.json`'s
keys (`sha`, `sha_short`, `branch`, `measured_at`, `path_note`, `structural_gate`, plus this phase's
`style_residual` and `pin_residency`). **No pre/post pairs, no post keys** (#10) — 155's own SUMMARY
calls it "a record, never an equality gate". Post-edit numbers go to `160-EVIDENCE.md` (J6, below).

#### 160-02 — RE-237: the pilot reading, the Step-4 block, the :42 cell, fact check, judge packet

```yaml
---
phase: 160-licensing-hardware-decision-record
plan: 02
type: execute
wave: 2
depends_on: ["160-01"]
files_modified:
  - docs/recipes/06-walk-up-avd-kiosk-autologon.md
  - .planning/phases/160-licensing-hardware-decision-record/160-EVIDENCE.md
  - .planning/phases/160-licensing-hardware-decision-record/160-FACTCHECK.md
autonomous: false   # carries one checkpoint:human-action (the pilot reading) — phase-prompt.md:25/:143
requirements: [LIC-01]
---
```

**Task order:** (1) the pilot checkpoint; (2) re-fetch both Learn pages as source bytes; (3) insert the
Step-4 block at line 101 per the locked E1b placement spec; (4) build and dispatch the fact-check judge;
(5) apply any accepted rewrites; (6) `fix` the `:42` remedy cell; (7) See Also ×2, Version History row,
re-stamp; (8) hand-built judge packet for `:42`; (9) measurements into `160-EVIDENCE.md`.

**The checkpoint (the #14 fix) — a single `checkpoint:human-action` with a non-halting decline:**

```xml
<task type="checkpoint:human-action">
  <name>Pilot device licensing reading</name>
  <action>Run two read-only commands on the walk-up AVD kiosk pilot device and report three values.</action>
  <instructions>
On the pilot device, run both:

    cscript //nologo %windir%\System32\slmgr.vbs /dlv
    cscript //nologo %windir%\System32\slmgr.vbs /xpr

Both are read-only. `cscript //nologo` is required: a bare `slmgr /dlv` resolves through
HKLM:\SOFTWARE\Classes\VBSFile\Shell\Open\Command to WScript.exe and opens a modal dialog with no stdout.

Report exactly three values and today's date, and nothing else: the `Name:` line, the `License Status:`
line, and the verbatim `/xpr` verdict. This is an allowlist, never an exclusion list — do not paste the
full /dlv output, which carries Activation ID, Application ID, Extended PID, Installation ID and the
Partial Product Key.

If `License Status:` reads `Licensed`, also say whether re-testing the ShellLauncher node on that device
is in scope. Default if you say nothing: no — it stays DEFERRED.

If you would rather not run this, type `decline`. Declining is a supported answer, not a failure.
  </instructions>
  <verification>160-EVIDENCE.md carries either a three-value reading with its date, or the single token
DECLINED with its date. Either outcome is a pass and the plan continues to completion.</verification>
  <resume-signal>Paste the three values, or type `decline`</resume-signal>
</task>
```

**Decline path — why LIC-01 cannot strand.** Three independent reasons, all measured:
1. The checkpoint is a **task inside the plan that declares LIC-01**, so `blocked_by` propagation
   (`phase.cjs:893`, `execute-phase.md:339`) has no downstream plan to strand — the drafted 160-02/160-03
   split was the only thing that created that exposure (#14).
2. `decline` is a **resume signal**, not a halt. The plan resumes, writes P2 **without** the `[PILOT]`
   measurement sentence (round-2's G ruling: "If the owner declines, drop G1-G5 entirely and delete the
   G3 sentence from P2"), records `DECLINED <date>` in `160-EVIDENCE.md`, and completes. No SUMMARY
   carries `status: halted` or `status: blocked`, so nothing propagates.
3. `requirements.mark-complete` runs from this plan's own frontmatter at its own boundary. A completed
   plan flips LIC-01 whichever way the checkpoint was answered.
   The only way LIC-01 strands is an unanswered session — a stall, not a designed stop.

**Note this merges round-2's G4 `Licensed` → second `checkpoint:decision` into the same gate.** It
preserves the substance (the owner decides scope) and saves one full executor cold-start; if the owner
prefers the two-gate form, restore it as a conditional `checkpoint:decision` task after this one and
nothing else in this plan changes.

**Commits:**
- `docs(160-02): record the kiosk-class licensing ruling in RE-237 Step 4` — bridge, lead-in, table,
  P1, P2, callout, See Also ×2, Version History row, re-stamp.
- `fix(160-02): restate the Shell Launcher anti-feature remedy per SKU at RE-237:42` — a correction to
  existing text, so `fix`, matching `fix(155-04)`.
- `docs(160-02): record the pilot reading, fact-check verdicts and post-edit measurements` — evidence
  and factcheck artifacts.
- plus the harness boundary commit. **Never `feat`** (#12: docs 206 / feat 53 / fix 22 of the last 300).

**`<verification>` — every gate runs in THIS plan, before its own commit (#13):**
- `node scripts/validation/c17-eee-contract.mjs` → 0 total violations, **assertion #12 = 0** named
  explicitly (the 200-char blockquote cap at `c17-eee-contract.mjs:402`; the fact-corrected callout
  measured 226 in round 2 — this is the gate that would have caught it in-plan rather than two plans later).
- `node scripts/validation/check-nav-hub-links.mjs` → 0/0/0. Covers every in-recipe `#fragment`
  corpus-wide; no extra anchor pins are needed (round-2 F5).
- `node scripts/validation/check-phase-155.mjs` → 10 PASS / 0 FAIL.
- `node scripts/validation/check-phase-156.mjs` → 10 PASS / 0 FAIL, with `administrator == 10` on RE-237
  and `sign into == 0` corpus-wide named as the two live pins. *(Measured at HEAD: 10 and 0.)*
- `node scripts/validation/check-phase-54.mjs` → 32/0 — because the two new `.planning/` artifacts are
  inside V-54-27's recursive walk (#8).
- `python .claude/skills/google-style/check.py --no-headings docs/recipes/06-walk-up-avd-kiosk-autologon.md`
  before (**86**) and after, with the six deliberate keeps itemised in `160-EVIDENCE.md`. Report-only.
- `python scripts/docs-style/sweep3.py docs/recipes scripts/docs-style/_CONTENT-PINS.txt` → `0 TOTAL edits`.
  The plan **must also state** that this instrument is blind to the new table cells (6,540 `|` lines
  skipped) and never tests em dashes (`do_em = False`), so D-47 compliance for E4/E7 is a hand ruling
  with no instrument — not proven by a green sweep.
- Packet judge for `:42` via `claude -p` — hand-built, because `judge-packets.py` keeps only
  modal-bearing baseline lines and `:42` has zero modals.
- Fact check via `claude -p` per the Area K rubric, verdicts to `160-FACTCHECK.md`.
- Post-insert measurements into `160-EVIDENCE.md`: 27 `>` runs, max 197, zero over 200; new runs at
  :104 = 167 and :115 = 194; `administrator` 10, `Ask the admin` 5 (from 4), `What breaks` 9 (from 8),
  `sign into` 0. *(Pre-edit values re-measured by me at HEAD: 10 / 4 / 8 / 0.)*

#### 160-03 — the licensing matrix

```yaml
---
phase: 160-licensing-hardware-decision-record
plan: 03
type: execute
wave: 3
depends_on: ["160-02"]   # not reflexive chaining: both plans write 160-EVIDENCE.md, and
                         # execute-phase.md:584-614 treats a shared files_modified entry as an
                         # implicit dependency and flags a same-wave pair as a planning defect
files_modified:
  - docs/reference/licensing-matrix.md
  - .planning/phases/160-licensing-hardware-decision-record/160-EVIDENCE.md
autonomous: true
requirements: [LIC-02]
---
```

**Commits:**
- `fix(160-03): amend the Windows Subscription Activation row for the kiosk-class ruling` — the `:62`
  cell, a correction to existing text.
- `docs(160-03): add the OEM-versus-Volume-License blockquote and Version History row` — new content
  plus the re-stamp.
- plus the harness boundary commit.

**`<verification>`:**
- C17 → 0 violations; the new `>` run at `:76` measures **186**; the matrix goes 9 → **10** runs, nothing
  over 200.
- `check-nav-hub-links` 0/0/0; `check-phase-155` 10/0 (V-155-LICENSING's `no Windows Subscription
  Activation` still present; V-155-HUBWIRING's RE-237 filename still present); `check-phase-156` 10/0
  with `administrator == 1` on the matrix asserted as measured, not assumed.
- `check-phase-54` 32/0.
- `check.py --no-headings docs/reference/licensing-matrix.md` before (**20**) and after; report-only.
- `sweep3.py docs/reference scripts/docs-style/_CONTENT-PINS.txt` → `0 TOTAL edits`.
- Hand-built judge packet for `:62` via `claude -p`.
- Final byte is still `|` (6,428 bytes, no trailing newline) — the Version History row is inserted by
  matching the existing `| 2026-09-03 | Phase 155 RCP-08: …` line as the `Edit` `old_string` and
  prepending, which is the technique `155-04-SUMMARY.md:139` records and cannot introduce a newline.
- **Apex, post-edit:** `node scripts/validation/check-phase-159.mjs` → `117 PASS, 0 FAIL`, recorded in
  `160-EVIDENCE.md` against the pre-edit 117/0 anchor from plan 01. *(1m47s at HEAD.)*
- No fact check here: the `:62` clause and the E9 blockquote reuse sentences the 160-02 fact check
  already cleared, and `160-EVIDENCE.md` records that reuse explicitly rather than silently.

### Area K — FINAL fact-check rubric

**K1 — (a), with the exact command.** Re-fetch both pages as source bytes at execution time, save the
HTML under the phase directory, and record **three** dates per page.

```bash
for u in https://learn.microsoft.com/en-us/windows/iot/iot-enterprise/commercialization/licensing \
         https://learn.microsoft.com/en-us/windows/client-management/mdm/assignedaccess-csp; do
  n=$(basename "$u")
  curl -sSL "$u" -o ".planning/phases/160-licensing-hardware-decision-record/160-src-$n.html"
  echo "== $u"
  tr '\n\t' '  ' < ".planning/phases/160-licensing-hardware-decision-record/160-src-$n.html" \
    | grep -oE '<meta name="(ms\.date|updated_at)" content="[^"]*"|<local-time[^>]*datetime="[^"]*"'
done
```

**The `tr '\n\t' '  '` is load-bearing and is the reason a naive grep fails.** In the served HTML the
`<local-time>` element's attributes are split across newlines and tabs, so
`grep -oE '<local-time[^>]*datetime="[^"]*"'` on the raw bytes returns **nothing**. I hit that this
session before flattening. Output measured 2026-09-11:

| Page | `ms.date` | `updated_at` | `<local-time datetime>` (the rendered "Last updated on") |
|---|---|---|---|
| IoT Enterprise licensing | `2026-06-24T00:00:00Z` | `2026-06-25T22:05:00Z` | `2026-06-24T08:00:00.000Z` → renders `2026-06-24` |
| AssignedAccess CSP | `2025-03-12T00:00:00Z` | `2025-03-12T22:44:00Z` | `2025-03-12T08:00:00.000Z` |

**TIEBREAK RULE.** Record all three; quote exactly one. The `## See Also` gloss and any
`[SOURCED, …, ms.date …]` label carry **`ms.date`** — because the page's own rendered "Last updated on"
tracks `ms.date`, not `updated_at`, **measured on both pages this session**. `updated_at` is recorded in
`160-FACTCHECK.md` as a third column and is never written into `docs/`. The IoT page is a **live decoy**:
its two metas are one day apart today, so a rubric that says only "record the date" produces two
different, both-defensible answers. If `ms.date` has moved since the recorded quotes
(`155-04-SUMMARY.md:134-139` = CSP at ms.date 2025-03-12; `.planning/research/PITFALLS.md:94-101` = IoT at
ms.date 2026-06-24), the See Also entries carry the new value **and** every sentence it supports is
re-verified against the newly fetched bytes before the plan proceeds.

**No public backing repo — state it as a fact in the rubric.** `original_content_git_url` names
`MicrosoftDocs/windows-iot-pr` and `MicrosoftDocs/windows-docs-pr`. Measured:
`api.github.com/repos/MicrosoftDocs/windows-iot-pr` → **404**, `…/windows-docs-pr` → **404**,
`…/memdocs` → **200** from the same probe (so the probe is sound and the two repos are private), and
`raw.githubusercontent.com/MicrosoftDocs/windows-iot-pr/live/…/Licensing.md` → **404**. **There is no
public raw-markdown channel for either page.** Consequence the plan must carry: the served HTML *is* the
source bytes here, and the `gh api` / pinned-SHA technique `155-04` used for the `WindowsApp` repository
is unavailable — it must not be written into the plan. *(Correcting the target's constraint, #25:
`155-04-SUMMARY.md:137` used Playwright DOM-text extraction for the CSP page, not curl. Curl works — both
200 this session — but the attribution was wrong, and `mcp__playwright__*` is in the executor's tool
list if a DOM read is ever wanted.)*

**K2 — adopt, plus a FIFTH class with an aggregation rule (#18).**

1. **Sourced sentence** — PASS iff a sentence on the fetched page supports it, the draft's modal is not
   stronger than the source's, and the link target is the fetched URL.
2. **`**[PILOT]**` sentence** — PASS iff traceable to a cited pre-edit RE-237 line or to
   `160-EVIDENCE.md` from the checkpoint. No new pilot claim.
3. **Reasoning sentence** — PASS iff it carries the "not pilot-tested, stated as reasoning" hedge and
   uses no `must` / `will`.
4. **UNVERIFIED sentence** — PASS iff the sentence itself says so.
5. **Table-cell fragment (NEW)** — a `|`-delimited cell that is not a sentence. Split it at each `;`
   and each sentence boundary into clauses and classify every clause under 1-4.
   **AGGREGATION: the cell PASSES only if every clause passes.** A cell mixing classes must carry each
   clause's own marker inside the cell text — `**[PILOT]**` on the pilot clause, explicit
   "nobody has confirmed" / UNVERIFIED wording on the unverified clause. A cell FAILS if any clause is
   unmarked and would read as sourced. The judge reports per clause; verdicts aggregate per cell.
   *Why it is needed, measured:* the corrected E4 MAK-arm `Consequence if wrong` cell carries six
   clauses across three classes in one cell.

**FAIL on any promotion between classes.** A hedge promoted to a mandate is this corpus's measured
26-defect hazard (memory `reference_judge_pass_strengthened_beats_inverted`).

**K3 — the `claude -p` dispatch (#4), not a fresh Agent.** The executor has no Agent tool. The dispatch
is modelled on the shape this repository already proved, recorded verbatim at
`scripts/docs-style/_JUDGE-VERDICTS-batch10.json:13`:

```bash
timeout 600 claude -p "$(cat .planning/phases/160-licensing-hardware-decision-record/160-FACTCHECK-RUBRIC.md)

## Packet

$(cat .planning/phases/160-licensing-hardware-decision-record/160-FACTCHECK-PACKET.md)" \
  --output-format text </dev/null > "$TMP/160-factcheck-r1.txt"
```

- **Rubric file:** `.planning/phases/160-licensing-hardware-decision-record/160-FACTCHECK-RUBRIC.md` —
  the five classes and the aggregation rule, committed before the dispatch so the judge reads bytes from
  a file rather than retyped prose.
- **Packet file:** `.planning/phases/160-licensing-hardware-decision-record/160-FACTCHECK-PACKET.md` —
  the post-edit block, P1, P2, the `:42` and `:62` cells, RE-237's pre-edit text for the rewritten cells,
  and the two fetched `160-src-*.html` files' relevant extracts. Nothing else: never the CONTEXT
  rationale, never the drafts' history, never this ruling (google-style-verify's "never judge a hunk in
  the context that produced it").
- **Verdict:** transcribed **verbatim** from the captured output file into
  `.planning/phases/160-licensing-hardware-decision-record/160-FACTCHECK.md` as a per-sentence (and
  per-clause, for cells) table, never from a recollection of it. `160-FACTCHECK.md` also records the
  literal dispatch string under a `dispatch_command` key — the 156-03 precedent.
- Pass no tool list, or at most `--tools "Read"`. The packet is self-contained; the judge needs no
  repository access, so the blocklist is satisfied structurally rather than by instruction.

**K4 — iteration cap, hard.** Round 1 = the full packet. On FAIL, rewrite only the failing sentence or
clause and re-judge **that fragment only** in a **fresh process**; that is round 2. **Two rounds
maximum per fragment.** A fragment failing round 2 goes to a `checkpoint:decision` inside 160-02 with
three options: (a) adopt the judge's replacement wording, (b) delete the sentence, (c) the owner supplies
wording. **Total `claude -p` processes for the fact check are capped at 6**; past 6 the plan stops and
escalates rather than iterating. Every process, its round and its verdict are logged in
`160-FACTCHECK.md` — an unlogged re-roll is the failure mode this cap exists to prevent.

**K5 — adopt, scoped.** The fact check covers every NEW sentence or clause in both files, including the
`:42` parenthetical and the `:62` appended clause, under class 5's aggregation rule. The two hand-built
judge packets cover meaning preservation of the two rewritten cells only. Both run inside their own
plan, before that plan's content commit (#13).

---

### Area L — FINAL style keeps

**The list is SIX, not four (#9).** Re-measured by me: tracked
`.claude/skills/google-style/check.py --no-headings` over my own assembly of the corrected drafts
reports **4 candidates without E12 and 6 with it** — 6 reported lines covering 8 tokens.

| # | Candidate | Where | Why it is kept |
|---|---|---|---|
| 1 | `admin` (word-list) | L3 — the `> **Ask the admin:**` lead-in | Owner-instructed keep and a `_CONTENT-PINS.txt` pin. `sweep3.py`'s built-in `admin`→`administrator` SUBS rule is lowercase and case-sensitive, and the pin-alteration rule at `sweep3.py:220-222` protects the line precisely **because** the edit would alter the pin. |
| 2 | `admin` (word-list) | L10 — "Intune Admin Lead" | A named role title. `Admin` is uppercase and the regex is case-sensitive, so no sweep3 rule can fire on it. word-list's own carve-out: "unless it's the name of a UI label or **other element**". |
| 3-4 | `under` ×2 (word-list) | L10 "under the volume agreement", L12 "under either arm" | **Both clauses, in full.** `references/word-list.md`, `DON'T USE: under`, states exactly two prohibitions: **(1)** "Don't use for a range of version numbers. Instead, use *earlier*." — neither use is a version range; **(2)** "Don't use to refer to a position in the UI." — illustrated by "Under **Service account ID**, enter a name."; neither use names a UI position. Both keeps fall outside both clauses, so there is no rule to obey and a rewrite would only distort meaning. |
| 5 | `should` (word-list, AVOID) | L12 — "a MAK-activated image **should** clear the same gate" | The rule is AVOID ("Generally avoid"), not DON'T USE. It is the deliberate hedge that stops the sentence becoming an assertion, and it is the **only modal in either hunk** — `judge-packets.py:107-112` keeps only modal-bearing baseline lines, so deleting it would remove the sentence from every modal-based instrument. |
| 6 | `em-dash-spaced` ×3 | L24 = the matrix VH row's `\| — \|`; L26 + L27 = the two new `## See Also` entries | L24 is the Author-column N/A placeholder, named as a known false positive in `check.py`'s own docstring. **L26/L27 are the file's See Also convention:** all **eight** existing entries in RE-237's `## See Also` use the spaced ` — ` as the gloss separator (measured at HEAD: STD-05, RE-222, RE-224, self-deploying, ESP policy, drift detection, licensing matrix, co-management). D-47's TIGHT canon governs **new prose**; a See Also gloss separator is list furniture, and breaking it would make the two new entries the only inconsistent lines in the section. |
