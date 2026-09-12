# Phase 160: Licensing / Hardware Decision Record - Context

**Gathered:** 2026-09-12 (discussion ran 2026-09-10 → 2026-09-12; the ruling itself is dated 2026-09-10)
**Status:** Ready for planning

<domain>
## Phase Boundary

The owner's standing licensing/hardware standard for the walk-up AVD kiosk device class is recorded in two existing documents and nowhere else: an STD-05 decision block in RE-237 (`docs/recipes/06-walk-up-avd-kiosk-autologon.md`, Step 4) and cell-value edits plus one blockquote and one Version History row in the licensing matrix (`docs/reference/licensing-matrix.md`). Requirements LIC-01 and LIC-02. No new document, no registry row, no canary bump, no live activation of any device, no Shell Launcher branch rework (that is the deferred follow-through milestone), and no leaf validator (`check-phase-160.mjs` is Phase 167's per ROADMAP Phase 167 SC3 and HARN-04). The two-arm framing is fixed by REQUIREMENTS.md: MAK-activated volume-licensed Windows Enterprise on the current HP hardware versus OEM-licensed Windows IoT Enterprise hardware. "IoT Enterprise via a MAK on stock hardware" is not an arm.

</domain>

<decisions>
## Implementation Decisions

Twelve gray areas were resolved across three `/adversarial-review` rounds (Finder → Adversary → Referee, Opus): round 1 26 issues / 17 real; round 2 29 / 28 real; round 3 26 / 23 real. Every count below was re-measured by a Referee at HEAD `80179c9e`. Locked source text lives in `160-DRAFTS.md` (D-38).

### The ruling (Area A)

- **D-01:** **[OWNER-RULED 2026-09-10] The walk-up AVD kiosk class standardizes on MAK-activated, volume-licensed Windows Enterprise on the current HP hardware; OEM-licensed Windows IoT Enterprise hardware is the documented alternative for purpose-built procurement.** — **Reversibility:** costly — undoing it means re-editing the RE-237 block, the matrix cell and both Version History tables, and re-running the fact check. The IoT arm's servicing benefit is LTSC-specific ("IoT Enterprise LTSC, not the general availability channel", RE-224:31's vocabulary); buying IoT Enterprise hardware does not by itself entail LTSC.
- **D-02:** The ruling is recorded now, dated **2026-09-10** (the discussion date). No execution-time ruling checkpoint.
- **D-03:** **[OWNER-STATED] Whether the tenant holds a MAK entitlement is unknown.** The ruling is therefore worded as the standard **plus a named prerequisite** ("confirm a MAK entitlement under the volume agreement before the first activation, because the pilot never activated a device"). It never asserts an accomplished activation state.
- **D-04:** Scope is the walk-up AVD kiosk class only (RE-237's `applies_to`). The matrix wording stays general; the ruling line names the class.
- **D-05:** Attribution is plain prose naming the owner role from frontmatter and the date ("The Intune Admin Lead ruled on 2026-09-10 that …"). No bracket label: `[SOURCED …]` has 0 occurrences under `docs/`, `[OWNER-RULED]` appears only in the index-excluded standard, and `**[PILOT]**` is defined at REQUIREMENTS.md:19 and lives in exactly one `docs/` file (RE-237).
- **D-06:** Windows 365 licences are not a third arm. "Windows 365 E3" is not a SKU; Windows Enterprise E3 per user needs a licensed user to sign in (the RCP-08 consequence already in the matrix); Windows 365 Enterprise/Frontline license a Cloud PC per user (`[SOURCED, windows-365/enterprise/requirements, ms.date 2026-03-06]` "Users must have licenses for Windows E3, Intune, Microsoft Entra ID P1, and Windows 365 to use their Cloud PC") and touch nothing about the endpoint's edition. Windows 365 Link is a different device class targeting Cloud PCs, not AVD → deferred.

### Block placement and shape in RE-237 (Areas B, E)

- **D-07:** The block lands at the **top of Step 4** ("Choose the delivery mechanism"), inserted at line 101, preceded by one bridge sentence ("… decides which rows of the delivery-mechanism table in this step are open to a device today."). Not Prerequisites, not a new Step (renumbering breaks three in-file anchors), not an unnumbered H3.
- **D-08:** **STD-05 Case 1** (`| Option | When to choose | Consequence if wrong | Branch |`) with **real, distinct Branch links** as D-01 of the standard requires (all four existing Branch cells link): MAK arm → `[Step 5](#step-5-author-the-assignedaccessconfiguration-xml)`; IoT arm → `[WindowsApp_AutoLogon.xml](../../assets/recipes/06-walk-up-avd-kiosk/windows-app/WindowsApp_AutoLogon.xml)`, byte-identical to the link at :106. **[OWNER-RULED 2026-09-11] The shared target with :106 is accepted.** Reconvergence is permitted by STD-05 D-05.
- **D-09:** The dated ruling is a **prose paragraph pair (P1, P2) immediately after the table**, with a one-word echo in the Branch cells ("Standard, ruled 2026-09-10" / "Alternative"). RE-237's blockquotes stay on their three idioms (`Ask the admin`, `What breaks if misconfigured`, `[PILOT]`).
- **D-10:** **RE-237:42's "Do this instead" remedy cell is rewritten** so each path names the SKU it produces. The middle cell carrying the pinned needle `Class is not licensed for use` is untouched; V-155-CONTENT is presence-only, so the edit cannot break it. "via an Edition upgrade profile" is kept (removing the only meaning change removes the judge question).
- **D-11:** One `> **What breaks if misconfigured:**` callout (194 chars) closes the block. Precedent: every decision block in RE-237 — Steps 2 (:68), 3 (:86), 4 (:102), 8 (:200) — is followed by one. After this phase: 5 lead-ins, 9 callouts (8 today).
- **D-12:** **Placement spec (VERBATIM-LOCKED, in `160-DRAFTS.md`):** bridge / blank / lead-in / blank / table / blank / P1 / blank / P2 / blank / callout / blank / then the pre-existing :102 lead-in; no two `>` lines adjacent across elements (C17 #12 joins contiguous runs — E3+E6 adjacent would measure 362 and hard-fail); the STD-05 D-02 blank line before the table is mandatory. Simulated post-insert: 27 runs, max 197, zero over 200.
- **D-13:** RE-237:31 is left byte-unchanged. It already ends "…never fires; see [Step 4](…)" and :29 carries a second Step-4 link; a third would be link noise.
- **D-14:** `## See Also` gains two glossed external entries (IoT Enterprise licensing, ms.date 2026-06-24; AssignedAccess CSP, ms.date 2025-03-12) after the eight relative entries. Twelve `docs/` files already carry glossed external links in See Also; these are RE-237's first external hyperlinks (:31/:42 name their sources unlinked). The CSP entry is where ROADMAP SC3's `ms.date 2025-03-12` lands.
- **D-15:** Version History rows: RE-237 (two columns) gets its **first change row** (the table holds only the 2026-08-31 Initial Draft row; Phases 155 and 156 added none); the matrix (three columns, Author `—`) gets a row inserted newest-first by matching the existing `| 2026-09-03 | Phase 155 RCP-08 …` line as the `Edit` anchor — never a shell append (the matrix has no trailing newline: 6,428 bytes, final byte `|`).
- **D-16:** **Lock scope.** VERBATIM: the three capped lines (E3 lead-in 167, E6 callout 194, E9 matrix blockquote 186) and the placement spec. FACTS + SHAPE (re-measured by the plan's acceptance, not byte-pinned): bridge, table, P1, P2, the :42 and :62 cells, See Also entries, Version History rows — so the pilot sentence, a fact-check rewrite and the execution date can land. Named placeholders: `2026-09-DD`, `<edition>`, `<status>`, `<xpr-verdict>`.

### Consequences and evidence (Areas C, K)

- **D-17:** **Shell Launcher consequence, per arm, with citations scoped to what the source says.** The AssignedAccess CSP page states only "Shell Launcher as a feature and the ShellLauncher node both require Windows Enterprise or Windows Education to function. The ShellLauncher node is not supported in Windows 10 Pro." P2 cites exactly that; the IoT arm is attributed to RE-237's own uncited Prerequisites list, never to the page. Whether activation state is a second gate is not first-party documented; the `**[PILOT]**` failure on an image reported as unactivated stands as recorded; "a MAK-activated image should clear the same gate" carries the hedge "not pilot-tested, stated as reasoning from the licensing structure, not as an observation" inside the same sentence.
- **D-18:** **The OEM-cleanup remediation class stays under both arms.** It addresses the factory image, not the license; an IoT Enterprise device narrows it only when its specific SKU ships a clean image, verified at procurement. REQUIREMENTS.md:107's "the OEM-cleanup class retires" is a planning assumption, not corpus text (see Deferred). Phases 161 and 165 keep their shelf life.
- **D-19:** **No live MAK activation this phase.** A MAK is permanent and consumes an agreement count; LIC-01's labels are fully specified without it; the Shell Launcher branch return is the deferred milestone. — **Reversibility:** reversible — nothing is consumed.
- **D-20:** The unsourced "a MAK-activated image is expected to pass" claim uses the matrix's own reasoning idiom, never `[PILOT]` (Phase 155 D-45) and never `[UNVERIFIED]` (0 published uses).
- **D-21:** Sourced claims are cited as inline Learn links in prose plus See Also entries; `[SOURCED, …]` labels stay in planning artifacts only.
- **D-22:** **Four licensing surfaces must agree**: RE-237:109, matrix :72, the new block, and **RE-224:29/:31** (which carries the same claim under the spelled-out idiom `**Pilot-observed, one tenant:**`). RE-224 stays byte-unchanged (V-155-HUBWIRING file; different device class); the plan's acceptance cross-checks all four say the same thing and never produces the literal `sign into`.
- **D-23:** **The SKU facts match the source exactly** (`[SOURCED, iot-enterprise/commercialization/licensing, ms.date 2026-06-24]`): New Device → OEM licence only (Volume License: No); Upgrade Existing Device → OEM or Volume License (KMS, MAK). The drafts never say a MAK can "never" reach IoT Enterprise. Whether the pilot's Windows 11 Enterprise image is a "qualifying operating system" for a VL upgrade is stated as **UNVERIFIED**, and the MAK arm is planned as producing volume-licensed Windows Enterprise until someone confirms otherwise. The durable literal `qualifying operating system` is a needle for Phase 167.
- **D-24:** RE-237 frontmatter `applies_to` ("Walk-up AVD kiosk — Windows 11 Enterprise …") is unchanged under D-01. It would widen only under an IoT ruling.

### Licensing-matrix edits (Area D)

- **D-25:** Three edits: the `:62` Windows Subscription Activation Notes cell carries the dated ruling (cell-value edit; "see the blockquote below" becomes "see the following blockquote"); **one** new blockquote (186 chars, own run between the "Not pilot-tested" line and the "See RE-237" line: "[IoT Enterprise is OEM-licensed at manufacture](…); Volume Licensing only upgrades a qualifying OS." — "OS" is forced by the cap, the spelled-out form measures 208); one Version History row. The four existing kiosk blockquote lines (:70, :72, :74, :76) stay byte-unchanged; the "Not pilot-tested" line stays TRUE under D-19. Matrix runs go 9 → 10, nothing over 200; `no Windows Subscription Activation` (V-155-LICENSING) and the RE-237 filename (V-155-HUBWIRING) stay present.
- **D-26:** No `**[PILOT]**` in the matrix. RE-237 owns pilot claims; the matrix links to it for the worked case.
- **D-27:** **Re-stamp `last_verified` / `review_by` on both files** to each file's execution date and +90 days (EEE-SOP:58 states `review_by` ≤ 90 days after `last_verified`, so +90 sits at the ceiling, as both files do today). Rationale corrected in round 3: two live precedents point opposite ways (EEE-SOP:675 "deliberately NOT advanced" for a standard gaining a section; 155-04 re-stamped both content documents it edited). The distinguishing rule: re-stamp when the edit **re-verifies the document's claims against sources** — this phase re-fetches both Learn pages and runs an independent fact check — not when a section is merely appended. `check-phase-160` will carry no date literal (D-31).
- **D-28:** **[OWNER-RULED 2026-09-11] ROADMAP Phase 160 SC2 and REQUIREMENTS LIC-02 are AMENDED**, not obeyed literally. Both say "cell-value edits only (no structural edits, respecting the `V-58-22`/`V-58-23` pin hazard)" (ROADMAP wording; LIC-02's antecedent differs byte-wise and is quoted separately). Measured: `V-58-22` pins an anchor in `android-capability-matrix.md`, `V-58-23` pins five H2 literals across the macOS/iOS/Android capability matrices, and `check-phase-58.mjs` never names `licensing-matrix.md`; the EEE-SOP does not require a Version History row per change (its only VH rules are the one-time v1.15 retrofit row and the supersedence convention); Phase 155 RCP-08 made the identical cell + blockquote + Version History edit to this same file under no structural criterion. Mechanism: the precedented `**[SUCCESS-CRITERION AMENDMENT, D-28]**` note (219 uses across `.planning/`, 14 on requirement bullets in v1.22-REQUIREMENTS.md; `[REQUIREMENT AMENDMENT]` has 0 uses and is not used) **appended** to both lines, original words never deleted, rescoping the clause to "no heading, column or row-structure change to the pinned capability tables" and admitting one blockquote line and one Version History row. The ruling stands on the Phase 155 precedent cited by quoted text; the grep is demoted to "corroboration only, `[MEASURED 2026-09-11, not guarded]`" (memory: a one-time measurement is not a guard). Final text in `160-DRAFTS.md`. — **Reversibility:** reversible — a second appended note supersedes it.
- **D-29:** Matrix insertion technique: match the existing final Version History line as `old_string`; never a shell append (no trailing newline, CRLF file).

### Read-only pilot checkpoint (Area G)

- **D-30:** **[OWNER-RULED 2026-09-11] One read-only owner checkpoint is kept, re-scoped, inside the RE-237 plan.** Commands: `cscript //nologo %windir%\System32\slmgr.vbs /dlv` and `… /xpr` (a bare `slmgr /dlv` resolves to WScript and opens a modal dialog with no stdout). Recording rule is an **allowlist**: `Name`, `License Status`, the verbatim `/xpr` verdict, and the date — never the Activation ID, Application ID, Extended PID, Installation ID or Partial Product Key that `/dlv` prints. One honest sentence lands in P2: it records the device's state on that date and "neither confirms nor falsifies the 2026-08-27 to 2026-08-30 observations" — a 2026-09 reading cannot falsify an August record. The **six** `reported as unactivated` sites (:31, :42, :106, :113, :178, :284) stay byte-unchanged under every outcome. Disposition per `License Status` value (`Licensed`, `Initial grace period`, `Additional grace period (…)`, `Non-genuine grace period.`, `Notification`, `Extended grace period`, `Unlicensed`, `Unknown`): record verbatim; `Licensed` → the owner is asked in the same gate whether re-testing the ShellLauncher node is in scope (default: no, stays deferred); `Unknown` → failed measurement, record, change nothing. **`decline` is a supported resume signal, not a halt:** the plan writes P2 without the pilot sentence, records `DECLINED <date>` in `160-EVIDENCE.md`, and completes, so LIC-01 cannot strand. `autonomous: false` on that plan; the task carries `<action>`, `<instructions>`, `<verification>`, `<resume-signal>`.

### Validator and harness hand-off (Area F)

- **D-31:** **[OWNER-RULED 2026-09-11] `check-phase-160.mjs` is authored by Phase 167**, not this phase. ROADMAP Phase 167 SC3 and HARN-04 assign every `check-phase-160..167` leaf to 167; 15 of 15 prior leaves and apexes were first-committed by the later harness-close phase. Phase 160 hands Phase 167 its needle list in `160-EVIDENCE.md` under `## Needle list handed to Phase 167 (HARN-04)`, every count re-measured at the landing commit: RE-237 `/^> \*\*Ask the admin:\*\*/gm` == **5**; `/^> \*\*What breaks if misconfigured:\*\*/gm` == **9**; the verbatim E3 lead-in present; durable literals `MAK-activated`, `OEM-licensed`, `IoT Enterprise LTSC`, `iot-enterprise/commercialization/licensing`, `mdm/assignedaccess-csp`, `ruled 2026-09-10`, `qualifying operating system` present; `#step-5-author-the-assignedaccessconfiguration-xml` count == 7 (6 today + 1); negatives `administrator` == 10 and `sign into` == 0 on RE-237, `administrator` == 1 on the matrix; matrix literals `OEM-licensed at manufacture` and `Ruled 2026-09-10` present. **No anchor pins** (`check-nav-hub-links.mjs` already resolves every in-recipe `#fragment` corpus-wide and fails on `anchor not found`), **no date literals**, **no line-number or run-count pins**. Between Phase 160 landing and Phase 167, the block is guarded by the corpus-wide gates (C17, nav-hub-links, check-phase-155/156).

### Verification design (Areas H, K)

- **D-32:** **Meaning preservation for the two rewritten cells (RE-237:42, matrix :62) uses hand-built packets**, not `judge-packets.py` (it keeps only modal-bearing baseline lines; both cells have zero modals → zero packets). Packet = `git show <pre-edit-sha>:<path>` ±5 lines paired with the post-edit ±5 lines, judged in a fresh `claude -p` process under the google-style-verify rubric, PASS required, no `verify2` link differ (nav-hub-links covers it).
- **D-33:** **Fact check of every NEW sentence or clause in both files, in a fresh process.** The executor has no Agent tool; the dispatch is `timeout 600 claude -p "$(cat 160-FACTCHECK-RUBRIC.md)\n\n## Packet\n\n$(cat 160-FACTCHECK-PACKET.md)" --output-format text </dev/null > "$TMP/…"` (the shape recorded at `scripts/docs-style/_JUDGE-VERDICTS-batch10.json:13`; 59 `claude -p` uses under `.planning/`), verdicts transcribed verbatim into `160-FACTCHECK.md` with the literal dispatch string. Packet = post-edit block + P1 + P2 + the two cells + RE-237's pre-edit text for the rewritten cells + the fetched source extracts — never the CONTEXT rationale. **Source refetch:** both Learn pages re-fetched as served HTML at execution time (no public backing repo: `MicrosoftDocs/windows-iot-pr` and `windows-docs-pr` return 404 on api.github.com while `memdocs` returns 200; raw.githubusercontent 404), flattened with `tr '\n\t' '  '` before grepping `ms.date`, `updated_at` and the `<local-time … datetime>` element; **quote `ms.date`** — the rendered "Last updated on" tracks it (IoT page measured: ms.date 2026-06-24, updated_at 2026-06-25, local-time 2026-06-24 — a live one-day decoy); record all three in `160-FACTCHECK.md`. **Five classes:** sourced (a page sentence supports it, modal not stronger than the source, link target is the fetched URL); `**[PILOT]**` (traceable to a pre-edit RE-237 line or `160-EVIDENCE.md`); reasoning (carries the hedge, no `must`/`will`); UNVERIFIED (says so); **table-cell fragment** (split at `;` and sentence boundaries, classify each clause, **cell passes only if every clause passes**, mixed cells carry each clause's own marker). FAIL on any promotion between classes. **Cap:** two rounds per fragment, six `claude -p` processes total, then `checkpoint:decision` (adopt the judge's wording / delete / owner supplies).
- **D-34:** Report-only style instruments, before and after, recorded in `160-EVIDENCE.md`: tracked `.claude/skills/google-style/check.py --no-headings` (baselines RE-237 **86**, matrix **20**; never a threshold); `sweep3.py <dir> scripts/docs-style/_CONTENT-PINS.txt` run **per directory** (`docs/recipes` = 0 and `docs/reference` = 0 at HEAD; `docs` reports 1 edit in `docs/operations/` before this phase starts, so the acceptance names directories). The plan must state that sweep3 is **blind to table rows** (6,540 `|` lines skipped) and **never tests em dashes** (`do_em = False`), so D-47 tight-em-dash compliance for the table cells is a hand ruling with no instrument.

### Plan mechanics (Areas I, J)

- **D-35:** **Three plans, three waves** (waves are recomputed from `depends_on` by `phase.cjs:855-856`; a shared `files_modified` entry in one wave is a planning defect, which is why 03 depends on 02 via the shared EVIDENCE file). Exact frontmatter in `160-DRAFTS.md`. 160-01 (wave 1, `requirements: []` with a 159-05-style inline rationale — `requirements.mark-complete` fires at every plan boundary from frontmatter, so an empty field is the flip-control mechanism; two template comments say "must not be empty", nothing enforces it, 28 tracked plans carry it): the SC2/LIC-02 amendment + `160-GATE-BASELINE.json`. 160-02 (wave 2, `requirements: [LIC-01]`, `autonomous: false`): pilot checkpoint → source refetch → Step-4 block → fact check → :42 cell → See Also, Version History, re-stamp → judge packet → measurements. 160-03 (wave 3, `requirements: [LIC-02]`): matrix cell, blockquote, Version History row, re-stamp, judge packet, post-edit apex.
- **D-36:** **Every structural gate runs inside the plan that makes the edit**, before its commit: C17 (assertion #12 named), `check-nav-hub-links`, `check-phase-155`, `check-phase-156`, `check-phase-54` (V-54-27 walks `.planning/` recursively, so the new phase artifacts are inside it). Post-edit apex `check-phase-159` (117/0 at HEAD, ~2 min) at the end of 160-03. Commit types: `docs()` for new prose, `fix()` for corrections to existing text (the :42 and :62 cells), never `feat()` (census of the last 300: docs 206 / feat 53 / fix 22). The harness adds its own `docs(160-NN): complete … plan` boundary commit touching SUMMARY, STATE, ROADMAP and REQUIREMENTS, so "one commit per plan" and "diff shows exactly N files" are never asserted.
- **D-37:** `160-GATE-BASELINE.json` is a **single pre-edit snapshot** written by 160-01, mirroring `155-GATE-BASELINE.json`'s `phase_baseline` key set (a record, never an equality gate). All post-edit numbers go into `160-EVIDENCE.md` as prose with their commands.
- **D-38:** **`160-DRAFTS.md` is committed as a sibling of this file** and is the planner's and executor's source text. This is a recorded deviation from `discuss-phase.md:470`'s literal two-file commit (three files). The binding chain: `<canonical_refs>` here → plan-phase's MANDATORY `<read_first>` rule ("any 'source of truth' file referenced in CONTEXT.md") → the executor reads it before touching anything.
- **D-39:** Universal anti-pattern 15 ("no direct Write/Edit to ROADMAP.md for mutations") is carved out for D-28's criterion-text amendment: `gsd-tools roadmap` and `requirements` subcommands mutate progress and checkboxes only, none touches criterion or bullet text; 155-01 used direct `Edit` for the same class. Acceptance for that plan: `check-phase-54` 32/0 before and after; `05-compliance-policy.md` absent from both files; `roadmap.get-phase 160` still returns 3 success criteria with the note inside criterion 2; `requirements.mark-complete LIC-02` still flips both surfaces (its regex is start-anchored, immune to an end-of-line append).

### Style keeps (Area L)

- **D-40:** **Six deliberate `check.py` keeps, recorded, no tooling change:** `admin` inside the pinned lead-in (a `_CONTENT-PINS.txt` pin; sweep3's built-in lowercase rule cannot alter a line where the edit would alter the pin); `Admin` in "Intune Admin Lead" (role title; regex is case-sensitive); `under` ×2 (word-list bars only version ranges and UI positions — neither applies); `should` (an AVOID rule; the deliberate hedge and the only modal in the hunk); spaced em dash ×3 (the matrix Author placeholder `| — |`, and the two See Also gloss separators — all eight existing See Also entries use it; D-47's tight canon governs new prose, not list furniture). No `KEEP_LINE` edit (a tooling file, no threat to defend against), no `_DISPOSITIONS.tsv` rows (ids hash the evidence text and nothing here runs `verify-meaning.py`).

### Claude's Discretion

- Exact wording of P1/P2 sentences that a fact-check round rewrites (facts and shape are locked; bytes are not).
- The `160-GATE-BASELINE.json` field values and the EVIDENCE prose layout.
- Whether the `Licensed` outcome uses the single-gate form (locked default) or a second `checkpoint:decision` task (owner allowed either).

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Source text and rulings (this phase)
- `.planning/phases/160-licensing-hardware-decision-record/160-DRAFTS.md` — the locked block, paragraphs, cells, matrix lines, Version History rows, See Also entries, placement spec, the two amendment strings, the three plan frontmatters, the checkpoint task text, the fact-check command and dispatch shape, the six style keeps. **Source of truth; every editing task's `<read_first>` names it.**
- `.planning/REQUIREMENTS.md` — LIC-01 (line 56), LIC-02 (line 57, to be amended per D-28), the `[PILOT]` evidence-label definition (line 19), the deferred kiosk-class follow-through (line 107), HARN-04 (line 86).
- `.planning/ROADMAP.md` — Phase 160 (lines 71-82; SC2 to be amended per D-28; SC3 already met at HEAD); Phase 167 SC3 (line 173, leaf ownership).

### Standards and conventions
- `docs/_standards/EEE-SOP-standard.md` §"Admin Decision-Point Block Format (STD-05)" (lines 456-570) — D-01 three-case composite, D-02 mandatory blank line, D-04 normative floor, D-05 reconvergence permitted; §"Prose Style Authoring Standard" (lines 600-680) — Google style Option 1, `--no-headings`, the `must`-promotion hazard; line 58 (`review_by` ≤ 90 days); lines 675-676 (the stamps counter-precedent).
- `.claude/skills/google-style/SKILL.md` and `check.py` — the **tracked** copy (the user-level copy has diverged); `references/word-list.md` ("under" has two clauses).
- `.claude/skills/google-style-verify/SKILL.md` — "never judge a hunk in the context that produced it"; pairing is mandatory only for bulk rewrites (not this phase).

### Prior decisions this phase builds on
- `.planning/milestones/v1.22-phases/155-rcp-walk-up-avd-kiosk-recipe-formalization/155-CONTEXT.md` — D-23/D-24 (`[PILOT]` bare-bold form, C17 #12), D-26 (marker file set), D-44/D-45 (the unsourced MAK remedy), D-46 (matrix trailing newline), D-47 (tight em-dash canon, sweep3 acceptance), D-48 (re-stamp).
- `.planning/milestones/v1.22-phases/155-rcp-walk-up-avd-kiosk-recipe-formalization/155-04-SUMMARY.md` — the fetched CSP quote (lines 134-139) and the matrix edit precedent ("RCP-08: incumbent Windows Subscription Activation row amended, new blockquote …, Version History row inserted newest-first; re-stamped").
- `.planning/milestones/v1.22-phases/155-rcp-walk-up-avd-kiosk-recipe-formalization/155-01-PLAN.md` and `155-GATE-BASELINE.json` — the precedent for a plan that edits ROADMAP/REQUIREMENTS with a baseline artifact.
- `.planning/milestones/v1.22-phases/159-harn-harness-close/159-05-PLAN.md` line 13 — the `requirements: []` flip-control precedent.
- `.planning/research/PITFALLS.md` lines 85-115 (Pitfall 5, the IoT OEM-vs-Volume matrix `[SOURCED, ms.date 2026-06-24]`) and line 266 (the Learn URL); `.planning/research/STACK.md` lines 60-80 (per-arm consequences).

### Validators and instruments that bound the edits
- `scripts/validation/check-phase-155.mjs` — V-155-CONTENT presence needles, V-155-LICENSING (`no Windows Subscription Activation`), V-155-HUBWIRING (four files incl. RE-224 and the matrix), `## Asset Provenance` exactly once.
- `scripts/validation/check-phase-156.mjs` — V-156-ADMIN-4 (RE-237 `administrator` == 10), V-156-SIGNINTO (corpus-wide `sign into` == 0).
- `scripts/validation/check-phase-54.mjs` — V-54-21 negative literal, V-54-27 recursive walk of `docs/` and `.planning/`, V-54-32 atomicity coupling; baseline 32/0.
- `scripts/validation/c17-eee-contract.mjs` lines 387-409 — assertion #12.
- `scripts/validation/check-nav-hub-links.mjs` — corpus-wide relative-link and in-file anchor scan (no hub filter).
- `scripts/validation/check-phase-136.mjs` lines 129-153 — the lead-in/callout count idiom (recipe 04: 5 lead-ins, 6 callouts).
- `scripts/docs-style/sweep3.py`, `_CONTENT-PINS.txt`, `judge-packets.py`, `_JUDGE-VERDICTS-batch10.json:13` (the `claude -p` dispatch shape).

### External sources (fetch as served HTML at execution; quote `ms.date`)
- `https://learn.microsoft.com/en-us/windows/iot/iot-enterprise/commercialization/licensing` — ms.date 2026-06-24 (updated_at 2026-06-25; local-time 2026-06-24).
- `https://learn.microsoft.com/en-us/windows/client-management/mdm/assignedaccess-csp` — ms.date 2025-03-12.
- `https://learn.microsoft.com/en-us/windows-365/enterprise/requirements` — ms.date 2026-03-06 (D-06 only; not cited in the corpus).

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- RE-237 Steps 2/4 (Case 1) and Steps 3/8 (Case 2) — the in-file decision-block idiom, including "Worked here / Not worked here — see …" Branch cells and in-table `**[PILOT]**` markers.
- The matrix's five kiosk blockquote lines (:70-76) and the "Not pilot-tested—stated as reasoning" idiom (D-20).
- `155-GATE-BASELINE.json` shape; `155-01-PLAN.md` for a ROADMAP/REQUIREMENTS-editing plan; `156-03-PLAN.md` for one `claude -p` judge per packet.

### Established Patterns
- Two-column (RE-237) vs three-column (matrix) Version History tables; newest-first insertion by anchor match.
- External links in `## See Also` with an em-dash gloss (12 files).
- `requirements: []` with an inline rationale comment for flip control (15 v1.22 plans).
- Content leaves authored by the harness-close phase (15/15).

### Integration Points
- RE-237 line 101 (insertion point), :42 (remedy cell), :293-302 (See Also), :304-308 (Version History), frontmatter stamps.
- Matrix :62 (Notes cell), between :74 and :76 (new blockquote), :90-93 (Version History), frontmatter stamps.
- ROADMAP.md:79 and REQUIREMENTS.md:57 (amendment appends).
- Phase 167 consumes `160-EVIDENCE.md`'s needle list.

### Measured hazards (re-measure at plan time)
- RE-237 today: 4 lead-ins (:68, :86, :102, :200), 8 callouts (:60, :77, :96, :111, :161, :188, :207, :215), 25 `>` runs, `administrator` 10, 6 `reported as unactivated` sites, 0 external hyperlinks, 0 `SOURCED`, Version History 1 row, both files CRLF.
- Matrix today: 9 `>` runs (:21 156, :25 124, :27 100, :66 148, :68 149, :70 186, :72 144, :74 89, :76 99), `administrator` 1, no trailing newline (6,428 bytes, final byte `|`), Version History 2 rows.
- `sweep3.py docs` = 1 edit at HEAD (in `docs/operations/`); per directory `docs/recipes` = 0, `docs/reference` = 0.
- Apex `check-phase-159` = 117/0 in ~2 min (not ~17 s).

</code_context>

<specifics>
## Specific Ideas

- All locked strings, measured lengths, plan frontmatters, the checkpoint task text, the amendment text and the fact-check dispatch are in `160-DRAFTS.md`; do not redraft them from this summary.
- The Case-1 table's MAK-arm "Consequence if wrong" cell deliberately stacks a sourced clause, an UNVERIFIED clause and a `**[PILOT]**` clause; the fact check's cell class exists for it.
- P2's one modal (`should`) is intentional — it is the hedge and the only thing that makes the sentence visible to a modal-based instrument.

</specifics>

<deferred>
## Deferred Ideas

- **Live MAK activation + ShellLauncher re-test on the pilot device** — converts the D-45 unsourced remedy into a `[PILOT]` observation; belongs to the kiosk-class follow-through milestone (REQUIREMENTS.md:107), not here. If the D-30 reading returns `Licensed`, the owner decides scope at that gate.
- **Windows 365 Link / Windows 365 Frontline shared as a Cloud-PC-targeted walk-up device class** — a different device class and target (Cloud PC, not AVD); a future recipe, subject to the standing bar on a third lockdown recipe (`SHARED-TAXONOMY-DOC`).
- **REQUIREMENTS.md:107 wording "the OEM-cleanup class retires"** — a planning assumption contradicted by STACK.md:69-75 and by D-18; correct it when that milestone is scoped, not in corpus text.
- **A corpus-wide `KEEP_LINE` entry for `Ask the admin:` in `sweep3.py`** — tooling; would protect every lead-in regardless of the pins file.
- **`check-phase-160.mjs`** — Phase 167 (D-31); the needle list is handed over in `160-EVIDENCE.md`.

</deferred>

---

*Phase: 160-licensing-hardware-decision-record*
*Context gathered: 2026-09-12*
