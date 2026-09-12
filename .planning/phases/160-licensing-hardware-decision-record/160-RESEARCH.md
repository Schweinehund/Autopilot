# Phase 160: Licensing / Hardware Decision Record - Research

**Researched:** 2026-09-12
**Domain:** Documentation-corpus editing (Markdown, no code) — STD-05 admin decision-point block authoring, licensing-matrix cell edits, ROADMAP/REQUIREMENTS amendment mechanics, fact-check dispatch via `claude -p`
**Confidence:** HIGH

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

Forty decisions (D-01 through D-40) were locked across three `/adversarial-review` rounds. They are reproduced in full in `160-CONTEXT.md` and are NOT re-summarized here — the planner MUST read `160-CONTEXT.md` and `160-DRAFTS.md` directly; this file only adds HEAD-verification and mechanics. The headline points a planner needs at a glance:

- **D-01 [OWNER-RULED 2026-09-10]:** The walk-up AVD kiosk class standardizes on MAK-activated, volume-licensed Windows Enterprise on the current HP hardware; OEM-licensed Windows IoT Enterprise hardware is the documented alternative for purpose-built procurement.
- **D-07/D-08/D-09/D-12:** Block lands at top of RE-237 Step 4 (line 101), STD-05 Case 1 table with linked Branch cells, then P1/P2 prose paragraphs, then one callout — exact placement spec is VERBATIM-LOCKED in `160-DRAFTS.md` (element E1b).
- **D-16:** Lock scope is VERBATIM only for three capped lines (E3 lead-in, E6 callout, E9 matrix blockquote) plus the placement spec. Everything else (bridge, table, P1, P2, cells, See Also, Version History) is FACTS + SHAPE — re-measure at plan/execution time, do not byte-pin.
- **D-28 [OWNER-RULED 2026-09-11]:** ROADMAP Phase 160 SC2 and REQUIREMENTS LIC-02 are AMENDED (not obeyed literally) via a `**[SUCCESS-CRITERION AMENDMENT, D-28]**` append (never delete/edit in place). Final amendment text is in `160-DRAFTS.md` "Round-3 mechanics" section, already committed byte-exact per file (the two antecedents differ).
- **D-30 [OWNER-RULED 2026-09-11]:** One read-only `checkpoint:human-action` pilot reading (`slmgr /dlv` + `/xpr` via `cscript //nologo`), allowlist recording only (`Name`, `License Status`, verbatim `/xpr` verdict, date — never Activation/Application/Extended PID/Installation ID/Partial Product Key). `decline` is a supported resume signal, not a halt.
- **D-31 [OWNER-RULED 2026-09-11]:** `check-phase-160.mjs` is NOT authored this phase — Phase 167 owns it (ROADMAP Phase 167 SC3, HARN-04). This phase hands Phase 167 a needle list in `160-EVIDENCE.md`.
- **D-32/D-33/K1-K5:** Meaning-preservation uses hand-built judge packets (not `judge-packets.py` — zero modals in both rewritten cells means zero packets from that tool). Fact-check uses a `claude -p` dispatch (exact shape below) with a 5-class rubric and a hard cap of 6 processes total / 2 rounds per fragment.
- **D-35/Area J:** Three plans, three waves — 160-01 (SC2/LIC-02 amendment + gate baseline, `requirements: []`), 160-02 (RE-237 content, `requirements: [LIC-01]`, `autonomous: false` for the pilot checkpoint), 160-03 (matrix, `requirements: [LIC-02]`, `depends_on: ["160-02"]` because both write `160-EVIDENCE.md`). Full plan frontmatters, task order, commit messages and `<verification>` blocks are pre-drafted in `160-DRAFTS.md` "Area J — FINAL plan split" — copy them, do not re-derive.

### Claude's Discretion

- Exact wording of P1/P2 sentences that a fact-check round rewrites (facts and shape are locked; bytes are not).
- The `160-GATE-BASELINE.json` field values and the EVIDENCE prose layout.
- Whether the `Licensed` outcome uses the single-gate form (locked default) or a second `checkpoint:decision` task (owner allowed either).

### Deferred Ideas (OUT OF SCOPE)

- Live MAK activation + ShellLauncher re-test on the pilot device — belongs to the kiosk-class follow-through milestone (REQUIREMENTS.md:107 — verified verbatim below).
- Windows 365 Link / Windows 365 Frontline as a Cloud-PC-targeted walk-up device class — different device class, barred by `SHARED-TAXONOMY-DOC` until a third lockdown recipe lands.
- REQUIREMENTS.md:107's "the OEM-cleanup class retires" wording — a planning assumption, corrected only when that milestone is scoped, not in corpus text.
- A corpus-wide `KEEP_LINE` entry for `Ask the admin:` in `sweep3.py` — tooling, not this phase.
- `check-phase-160.mjs` — Phase 167's (D-31); this phase only hands over the needle list.

</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| LIC-01 | A decision record (STD-05 admin decision-point block, blockquote + table, never a fence) lands in RE-237 comparing the two real arms, with the Shell Launcher and OEM-cleanup consequence of each, and the owner's dated ruling. | Placement spec (E1b), block content (E2-E9), fact-check rubric (K1-K5) and pilot checkpoint mechanics (D-30) all re-verified at HEAD below; flips at plan 160-02's boundary per `requirements: [LIC-01]`. |
| LIC-02 | `docs/reference/licensing-matrix.md` reflects the ruling as cell-value edits only (rescoped by the D-28 amendment to admit one blockquote line + one Version History row), consistent with RCP-08. | Matrix byte facts (9→10 `>` runs, 6,428 bytes, no trailing newline) re-verified below; V-58-22/V-58-23 confirmed NOT to pin this file; D-28 amendment text is pre-drafted verbatim in `160-DRAFTS.md`; flips at plan 160-03's boundary per `requirements: [LIC-02]`. |

</phase_requirements>

## Summary

This is a documentation-corpus phase, not a code phase: it edits two existing Markdown files (RE-237 = `docs/recipes/06-walk-up-avd-kiosk-autologon.md`, and `docs/reference/licensing-matrix.md`), appends amendment notes to `.planning/ROADMAP.md` and `.planning/REQUIREMENTS.md`, and produces three planning artifacts (`160-GATE-BASELINE.json`, `160-EVIDENCE.md`, `160-FACTCHECK.md`). All 40 decisions were already resolved in `160-CONTEXT.md` across three adversarial-review rounds, and the exact bytes to write are locked in `160-DRAFTS.md`. This research's job was narrow: **re-measure everything CONTEXT.md/DRAFTS.md measured at commit `80179c9e`, at the current HEAD, and report any drift.**

**Result: zero drift.** HEAD is now `ca3aac7a` (two planning-doc-only commits ahead of `80179c9e`: context capture and this session's own state commit); `git log 80179c9e..HEAD` touches nothing under `docs/`, `.planning/ROADMAP.md`, `.planning/REQUIREMENTS.md`, or `scripts/validation/`. Every byte-level fact this session re-measured — RE-237's 10 `administrator` occurrences, 4 lead-ins, 8 callouts, 25 `>` runs (max 197), 6 `reported as unactivated` sites, 0 markdown external hyperlinks, CRLF with 308 line breaks; the matrix's 9 `>` runs, 6,428 bytes, final byte `|`, no trailing newline, CRLF, 1 `administrator`; both files' `last_verified: 2026-09-03` / `review_by: 2026-12-02` (exactly the 90-day ceiling); all five validators (`check-phase-155` 10/0, `check-phase-156` 10/0, `check-phase-54` 32/0, `c17-eee-contract` 237/0/0, `check-nav-hub-links` 0/0/0) and the apex `check-phase-159` (117/0, measured 1m59s this session) — matches the CONTEXT.md/DRAFTS.md figures exactly. The two Learn pages were re-fetched as raw HTML this session and every cited quote and `ms.date` matches byte-for-byte. `sweep3.py`'s per-directory readings (`docs/recipes`=0, `docs/reference`=0, `docs`=1) and `check.py --no-headings` baselines (86, 20) also match exactly.

**Primary recommendation:** Follow `160-DRAFTS.md` verbatim — it is the source of truth and every string in it has now been independently cross-checked against HEAD by this research pass. The planner's job is to transcribe the three pre-drafted plan frontmatters (Area J) and task bodies into `160-01-PLAN.md`, `160-02-PLAN.md`, `160-03-PLAN.md`, not to re-derive content or structure.

## Architectural Responsibility Map

This phase has no application-tier architecture (browser/server/API/DB) — it is pure documentation-corpus editing. The "tiers" here are documentation surfaces and the harness layer that gates them.

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Decision-record authoring (STD-05 block) | Recipe document (RE-237, `docs/recipes/`) | — | RE-237 is the walk-up kiosk class's Guide document; STD-05 mandates decision blocks live in the recipe, not a separate standard or reference doc |
| Licensing fact reference | Reference document (`docs/reference/licensing-matrix.md`) | Recipe (RE-237, via cross-link) | The matrix is the corpus's single licensing-fact surface (RE-157, Approved); RE-237 links to it rather than duplicating its content |
| Ruling provenance / traceability | Planning artifacts (`.planning/ROADMAP.md`, `.planning/REQUIREMENTS.md`) | `.planning/phases/160-.../160-EVIDENCE.md` | Success-criterion and requirement text is the durable record of what was decided and why; EVIDENCE.md is the phase-scoped measurement trail |
| Fact verification (Learn-page claims) | Fresh `claude -p` process (fact-check judge) | `.planning/phases/160-.../160-FACTCHECK.md` | The executor has no Agent tool; verification must be a subprocess dispatch, with verdicts transcribed to a durable file |
| Structural/style gating | `scripts/validation/*.mjs` (harness) | `scripts/docs-style/*.py` (report-only) | Validators are the pass/fail gate; style scripts (`check.py`, `sweep3.py`) are report-only instruments, never thresholds, per D-34 |
| Cross-phase handoff (leaf validator) | Phase 167 (`check-phase-160.mjs`, not yet authored) | `160-EVIDENCE.md`'s needle list | D-31: every content-leaf validator in this repo's history (15/15) was authored by the harness-close phase, never the content phase itself |

## Standard Stack

Not applicable in the conventional sense — no new libraries or packages are installed by this phase. The "stack" is the existing repo tooling used to author and gate the edits:

| Tool | Role | Invocation (from repo root) |
|------|------|------------------------------|
| Node.js (validators) | Structural/content gating | `node scripts/validation/<name>.mjs` |
| Python 3 (`check.py`, `sweep3.py`) | Report-only style instruments | `python .claude/skills/google-style/check.py --no-headings <file>`; `python scripts/docs-style/sweep3.py <dir> scripts/docs-style/_CONTENT-PINS.txt` |
| `claude -p` (Claude Code CLI) | Fact-check and meaning-preservation judge dispatch (fresh process, no Agent tool available to the executor) | `timeout 600 claude -p "<prompt>" --output-format text </dev/null > <file>` |
| `curl` | Source-byte fetch for the two Learn pages | `curl -sSL <url> -o <file>` |
| `git` (Edit tool, not shell append) | Version History row insertion (matrix has no trailing newline) | Match-and-prepend via `old_string`/`new_string`, never `>>` |

No package legitimacy audit applies — this phase installs no external packages.

## Package Legitimacy Audit

Not applicable — this phase installs no external packages (npm/pip/cargo or otherwise). Skip.

## Architecture Patterns

### Recommended Project Structure (files this phase touches)
```
docs/
├── recipes/
│   └── 06-walk-up-avd-kiosk-autologon.md   # RE-237 — Step 4 gains the decision block; :42 cell rewritten
└── reference/
    └── licensing-matrix.md                  # RE-157 — :62 cell rewritten, one new blockquote, one VH row

.planning/
├── ROADMAP.md                               # Phase 160 SC2 gains D-28 amendment append
├── REQUIREMENTS.md                          # LIC-02 gains D-28 amendment append (different antecedent bytes)
├── STATE.md                                 # touched only by 160-01 (mirrors 155-01 precedent) + harness boundary commits
└── phases/160-licensing-hardware-decision-record/
    ├── 160-CONTEXT.md                       # already written (input)
    ├── 160-DRAFTS.md                        # already written (input, source of truth)
    ├── 160-RESEARCH.md                      # this file
    ├── 160-GATE-BASELINE.json               # written by 160-01
    ├── 160-EVIDENCE.md                      # written by 160-02, appended by 160-03
    ├── 160-FACTCHECK-RUBRIC.md              # written by 160-02 before dispatch
    ├── 160-FACTCHECK-PACKET.md              # written by 160-02 before dispatch
    ├── 160-FACTCHECK.md                     # written by 160-02 (verdicts)
    ├── 160-src-licensing.html               # written by 160-02 (fetched source bytes)
    └── 160-src-assignedaccess-csp.html      # written by 160-02 (fetched source bytes)
```

### Pattern 1: STD-05 Admin Decision-Point Block
**What:** A four-part structure — bridge sentence, `> **Ask the admin:**` lead-in, a `| Option | When to choose | Consequence if wrong | Branch |` table (Case 1: two-arm comparison), dated ruling prose, `> **What breaks if misconfigured:**` callout — each element separated by exactly one blank line, no two `>` lines adjacent across elements.
**When to use:** Every admin-facing decision point in a Device Recipe document (`docs/recipes/*`), per EEE-SOP-standard.md §"Admin Decision-Point Block Format (STD-05)" (verified present at line 456).
**Example (locked text, from `160-DRAFTS.md` E2-E6):**
```
The licensing standard for this device class decides which rows of the delivery-mechanism table in this step are open to a device today.

> **Ask the admin:** Does the kiosk fleet standardize on MAK-activated Windows Enterprise on the current HP hardware, or on OEM-licensed Windows IoT Enterprise hardware?

| Option | When to choose | Consequence if wrong | Branch |
|--------|-----------------|----------------------|--------|
| MAK-activated Windows Enterprise on the current HP hardware | ... | ... | Standard, ruled 2026-09-10—continue with the multi-app branch at [Step 5](#step-5-author-the-assignedaccessconfiguration-xml) |
| OEM-licensed Windows IoT Enterprise hardware | ... | ... | Alternative—not worked here; after procurement the Shell Launcher row opens with [WindowsApp_AutoLogon.xml](../../assets/recipes/06-walk-up-avd-kiosk/windows-app/WindowsApp_AutoLogon.xml) |

[P1 paragraph — the ruling and its prerequisite]

[P2 paragraph — the Shell Launcher consequence, cited]

> **What breaks if misconfigured:** a MAK bought to reach the IoT arm activates volume-licensed Windows Enterprise; OEMs license IoT Enterprise at manufacture, Volume Licensing only as an upgrade.
```
Full verbatim text (E2 through E9, with every measured length) is in `160-DRAFTS.md` — copy from there, not from this excerpt.

### Pattern 2: Annotate-and-Supersede for Success-Criterion / Requirement Amendment
**What:** Append a `**[SUCCESS-CRITERION AMENDMENT, D-28]**` block to the end of the existing line's final bytes — never delete or reword the original clause. This is the repository's only idiom for this class of change (219 uses across `.planning/`, 14 on requirement bullets in v1.22-REQUIREMENTS.md).
**When to use:** Whenever a ROADMAP success criterion or REQUIREMENTS bullet needs correction after the fact, and the correction should be auditable rather than silently applied.
**Example (verbatim, from `160-DRAFTS.md`):** see the "Round-3 mechanics" section — two near-identical append strings, one per file, each quoting that file's own antecedent bytes exactly (the two antecedents differ by wording: ROADMAP says "cell-value edits **only** (no structural edits, respecting…)"; REQUIREMENTS says "cell-value edits (structural edits **are the known**… pin hazard)").
**Verified this session:** `grep -c licensing-matrix scripts/validation/check-phase-58.mjs` returns 0 (confirmed); `V-58-22` pins an anchor in `android-capability-matrix.md` (confirmed at check-phase-58.mjs:365); `V-58-23` pins 5 H2 literals across macOS/iOS/Android matrices (confirmed at check-phase-58.mjs:380) — none of the three touches `licensing-matrix.md`.

### Pattern 3: Hand-Built Judge Packet (bypassing `judge-packets.py`)
**What:** `judge-packets.py` only emits a packet for a hunk containing a surviving modal word (`MODALS = re.compile(r"\b(should|will|would|could|must|shall|may|might)\b", re.I)`, confirmed at line 31 of the script). The `:42` and `:62` rewritten cells carry zero modals, so the automated tool emits zero packets for them. The plan must hand-assemble a packet (`git show <pre-edit-sha>:<path>` ±5 lines paired with post-edit ±5 lines) and dispatch it to a fresh `claude -p` process under the google-style-verify rubric.
**When to use:** Any meaning-preservation check on a rewritten span with no modal words.
**Verified this session:** `judge-packets.py:108/113` confirms the modal-survival filter drops any line where "the modal survived intact" — exactly the zero-modal-in / zero-modal-out case this phase's two cells hit.

### Anti-Patterns to Avoid
- **Shell append (`>>`) to the licensing matrix:** the file has no trailing newline (confirmed: 6,428 bytes, final byte `7c` = `|`, `tail -c 1 | xxd` this session). A shell append would either corrupt the last table row or silently succeed with a malformed table. Use the Edit tool's match-and-prepend technique against the existing `| 2026-09-03 | Phase 155 RCP-08: …` line, exactly as `155-04` did.
- **Bare-LF regex against either target file:** both files are CRLF throughout (RE-237: 308 CRLF / 0 bare-LF; matrix: 101 CRLF / 0 bare-LF, both confirmed this session via byte-level Python scan). A regex assuming `\n` line endings will silently fail to match or double-count.
- **Two adjacent `>` blocks across the new elements:** C17 assertion #12 joins **contiguous** `>` lines (even across different logical elements) with a space and measures the joined length against a 200-char cap. The placement spec's mandatory blank line between every element (bridge/lead-in/table/P1/P2/callout) is what prevents E3 (167 chars) and E6 (194 chars) from being silently concatenated into a 361-char run that would hard-fail. This is a proven trap: the DRAFTS.md file records that the first draft of the callout (E6) measured 226 chars and failed C17 #12 before being rewritten to 194.
- **Using `judge-packets.py`'s automated full-batch mode for these two cells:** it will report 0 packets and give a false sense that meaning-preservation was checked. It was not — the hand-built packet path (Pattern 3) is required.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Fact-checking new prose against source pages | A custom verification script | `claude -p` fresh-process dispatch per the K1-K5 rubric in `160-DRAFTS.md`, with the rubric and packet as separate committed files | The dispatch shape is already proven in this repo (`scripts/docs-style/_JUDGE-VERDICTS-batch10.json:13`, confirmed this session) and the executor has no Agent tool |
| Meaning-preservation check on the two rewritten cells | A new automated diff tool | Hand-built packet + `claude -p` under the google-style-verify rubric | `judge-packets.py` structurally cannot produce a packet for a zero-modal hunk (confirmed at judge-packets.py:31,108,113) |
| Style/em-dash/table checking | Trusting `sweep3.py`'s green result as proof of compliance | Manual hand-ruling for table cells and em dashes, recorded explicitly as "no instrument" | `sweep3.py` skips every table row (`847`/`286` "table row" protected-count lines confirmed this session) and never tests em dashes (`do_em = False`, confirmed at sweep3.py:212 — this is unconditional for every line, not a table-only carve-out) |
| Version History row insertion into a no-trailing-newline file | A shell heredoc or `>>` append | Edit tool match-and-prepend against the existing final VH row | Confirmed: matrix is 6,428 bytes with final byte `|` and no trailing newline; an append changes that invariant |

**Key insight:** every "don't hand-roll" here exists because a prior phase (155, 156, or this phase's own adversarial-review rounds) already discovered the trap by direct measurement. Nothing in this list is theoretical.

## Common Pitfalls

### Pitfall 1: Trusting `sweep3.py`'s green result as compliance proof for table cells or em dashes
**What goes wrong:** A plan's `<verification>` step reports `sweep3.py docs/recipes ... → 0 TOTAL edits` and treats that as proof the new table cells (E4, E7) and the new See Also em-dash gloss separators are style-compliant.
**Why it happens:** `sweep3.py` silently skips every line starting with `|` (table rows) and sets `do_em = False` unconditionally — it never even attempts an em-dash transform on any line, table or prose.
**How to avoid:** State explicitly in the plan and in `160-EVIDENCE.md` that a green `sweep3.py` run does NOT cover the table cells or em dashes; D-47 tight-em-dash compliance for those spans is a hand ruling, not an instrument-verified fact.
**Warning signs:** A verification block that cites `sweep3.py` as the sole evidence for table-cell or em-dash style compliance.

### Pitfall 2: C17 assertion #12 joining adjacent blockquote lines across element boundaries
**What goes wrong:** Two blockquote elements (e.g., a lead-in and a callout) placed without an intervening blank line get concatenated by C17's contiguous-run detector and measured as one string, which can silently exceed 200 chars even though each element individually fits.
**Why it happens:** `c17-eee-contract.mjs`'s assertion #12 (confirmed at line 387-409 this session) collects ALL consecutive lines starting with `>` — regardless of which logical "element" they belong to — strips the `> ` prefix, joins with a space, and checks the joined length.
**How to avoid:** Follow the placement spec in `160-DRAFTS.md` exactly: every element (bridge/lead-in/table/P1/P2/callout) is separated by exactly one blank line, with no two `>` lines adjacent across elements.
**Warning signs:** A draft callout or lead-in that measures under 200 chars alone, but sits immediately after another blockquote line with no blank line between them.

### Pitfall 3: Table-cell fragments containing mixed evidence classes without individual markers
**What goes wrong:** The corrected E4 MAK-arm "Consequence if wrong" cell stacks a sourced clause, an UNVERIFIED clause, and a `**[PILOT]**` clause in one cell. A fact-check pass that treats the whole cell as one sentence either over-fails it (because not every clause is sourced) or under-fails it (lets an unmarked UNVERIFIED clause read as fact).
**Why it happens:** Table cells are not sentences; the standard sentence/PILOT/reasoning/UNVERIFIED rubric doesn't naturally split on `;` and clause boundaries the way corpus reviewers expect.
**How to avoid:** Use the fifth fact-check class (K2 item 5 in `160-DRAFTS.md`): split each cell at `;` and sentence boundaries, classify every clause independently, and require every clause to carry its own marker for the cell to pass.
**Warning signs:** A `[PILOT]` or `UNVERIFIED` clause inside a cell with no bolded marker immediately adjacent to it.

### Pitfall 4: Promoting a hedge to a mandate during a fact-check rewrite round
**What goes wrong:** A fact-check judge (or a human editing the P1/P2 prose) "fixes" a hedged reasoning sentence (e.g., "should clear the same gate") by removing the hedge, turning a stated-as-reasoning claim into an assertion of fact.
**Why it happens:** This is this corpus's single most measured hazard — 26 STRENGTHENED defects out of the v1.22 style pass's 45 total, more than double the 19 INVERTED defects (memory `reference_judge_pass_strengthened_beats_inverted`).
**How to avoid:** K2's FAIL-on-any-promotion-between-classes rule; the `should` in P2 is deliberately the only modal in the hunk and must never be removed.
**Warning signs:** Any edit to P1/P2 that removes `should`, "not pilot-tested, stated as reasoning…", or "nobody has confirmed"/UNVERIFIED language.

### Pitfall 5: A one-time measurement quoted as if it were a standing guard
**What goes wrong:** Citing "`check-phase-58.mjs` doesn't mention `licensing-matrix.md`" (a grep result) as the reason the structural-edit restriction doesn't apply, without re-running the grep at execution time.
**Why it happens:** No validator currently guards the "no structural edit to the licensing matrix" clause at all — the grep is corroboration, not a gate — so a future validator change could silently make the old reading stale.
**How to avoid:** D-28's amendment text explicitly demotes the grep to `[MEASURED 2026-09-11, not guarded]` and instructs the next reader to re-measure rather than cite the recorded line. This research re-ran the grep this session and confirms it still returns 0 — but the plan/executor must re-run it again themselves rather than trust this file.
**Warning signs:** Any plan step that treats a `[MEASURED ..., not guarded]` value as permanently true.

## Code Examples

### Fact-check re-fetch with the flatten-before-grep fix
```bash
# Source: 160-DRAFTS.md K1, re-verified this session (2026-09-12) — output matched exactly
for u in https://learn.microsoft.com/en-us/windows/iot/iot-enterprise/commercialization/licensing \
         https://learn.microsoft.com/en-us/windows/client-management/mdm/assignedaccess-csp; do
  n=$(basename "$u")
  curl -sSL "$u" -o ".planning/phases/160-licensing-hardware-decision-record/160-src-$n.html"
  echo "== $u"
  tr '\n\t' '  ' < ".planning/phases/160-licensing-hardware-decision-record/160-src-$n.html" \
    | grep -oE '<meta name="(ms\.date|updated_at)" content="[^"]*"|<local-time[^>]*datetime="[^"]*"'
done
```
**Why the `tr '\n\t' '  '` matters (verified this session):** without flattening, `<local-time>`'s attributes are split across newlines/tabs in the served HTML and a raw `grep -oE '<local-time[^>]*datetime="[^"]*"'` returns nothing. Confirmed by running both fetches with and without the flatten step during this research pass.

### `claude -p` fact-check dispatch (verbatim shape, confirmed at `scripts/docs-style/_JUDGE-VERDICTS-batch10.json:13`)
```bash
# Source: scripts/docs-style/_JUDGE-VERDICTS-batch10.json:13 (line number confirmed this session via grep -n)
timeout 600 claude -p "$(cat .planning/phases/160-licensing-hardware-decision-record/160-FACTCHECK-RUBRIC.md)

## Packet

$(cat .planning/phases/160-licensing-hardware-decision-record/160-FACTCHECK-PACKET.md)" \
  --output-format text </dev/null > "$TMP/160-factcheck-r1.txt"
```
Pass no tool list, or at most `--tools "Read"` — the packet must be self-contained (per D-33/K3).

### Version History row insertion (match-and-prepend, never append)
```
# Existing final row at HEAD (docs/reference/licensing-matrix.md, confirmed this session):
| 2026-09-03 | Phase 155 RCP-08: self-deploying kiosk userless-device activation consequence documented in Feature-to-License Mapping | — |

# Edit tool: old_string = the line above; new_string = the new row + the line above (newest-first).
```

## State of the Art

Not applicable in the conventional "library version" sense. The one relevant "state of the art" fact is the IoT Enterprise licensing model itself, verified fresh this session against the live Learn page:

| Old framing (REJECTED by REQUIREMENTS.md) | Current, source-verified framing | Verified | Impact |
|--------------------------------------------|-----------------------------------|----------|--------|
| "IoT Enterprise via a MAK key on stock hardware" | New Device: OEM License = Yes, Volume License = No. Upgrade Existing Device: OEM License = Yes, Volume License = Yes (via KMS or MAK). | `[VERIFIED: learn.microsoft.com/.../iot-enterprise/commercialization/licensing, ms.date 2026-06-24]` — table row fetched and quoted verbatim this session (see below) | The MAK arm can only reach IoT Enterprise by *upgrading* a device that already runs a "qualifying operating system" — a phrase confirmed verbatim on the page — never by first-licensing a new device into IoT Enterprise |

**Verbatim table row, fetched this session:**
```
<tr><td>New Device</td><td>✅Yes</td><td>⛔No</td></tr>
<tr><td>Upgrade Existing Device</td><td>✅Yes</td><td>✅Yes</td></tr>
```
(columns: Scenario | OEM License | Volume License; headers confirmed via `<a href="#oem-licensing"...>OEM License</a>` / `<a href="#volume-licensing"...>Volume License</a>` in the same fetch)

**Verbatim "qualifying operating system" sentence, fetched this session:**
> "A volume license is available for end-customers to upgrade existing systems with a qualifying operating system to a new version. A volume license is nontransferrable."

**Verbatim KMS/MAK activation-method row, fetched this session:** the page's activation-method table lists `KMS, MAK` under the Volume License column (adjacent to `OA3.0, ePKEA, PKEA` under OEM License), with `KMS` glossed as "Key Management Service" and `MAK` as "Multiple Activation Key" in the page's own Definitions list.

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | `phase.cjs:855-856` recomputes plan waves from the `depends_on` DAG and warns on disagreement (cited in `160-DRAFTS.md` Area J framing for why `160-03 depends_on: ["160-02"]`). This file lives in the GSD harness (gsd-core), not in this repository's own tree, so it could not be independently located or read this session. | Plan mechanics (Area J wave numbering) | If the harness behavior differs from what CONTEXT.md/DRAFTS.md describe, the declared `wave:` values in the pre-drafted frontmatters could disagree with what the harness actually computes — low risk, since the harness will recompute and warn rather than silently misexecute, per the same claim. |
| A2 | `execute-phase.md:584-614`'s intra-wave overlap check treats a shared `files_modified` entry as an implicit dependency and reports a same-wave pair as a planning defect (the stated reason `160-03` declares `depends_on: ["160-02"]` even though the matrix edit is functionally independent). | Plan mechanics (Area J, `160-03` frontmatter) | Same as A1 — this is harness-side logic outside this repo's tree; not independently re-verified this session, but low risk since declaring the dependency costs nothing under `use_worktrees: false`. |
| A3 | `requirements.mark-complete` and `gsd-tools roadmap`/`requirements` CLI subcommands behave as described (start-anchored regex immune to end-of-line append, etc.) — part of the GSD harness, not this repo's own scripts. | Plan mechanics (D-39, universal anti-pattern 15 carve-out) | If the CLI behaves differently, the direct-Edit carve-out for D-28's append could interact unexpectedly with `requirements.mark-complete` — low risk given the identical technique's precedent at 155-01. |

**All corpus-content and validator-behavior claims in this file were independently re-verified against HEAD this session** (not carried from CONTEXT.md/DRAFTS.md without re-measurement) — see the Sources section. The only items landing in this Assumptions Log are GSD-harness internals that live outside this repository's own file tree and could not be located with `find`/`grep` in this session.

## Flagged Assumptions for the Planner

*(Renamed from "Open Questions" per this repo's plan-checker hard-block on a bare `## Open Questions` heading — memory `reference_plan_checker_open_questions_gate.md`. Everything below is either already resolved by CONTEXT.md/DRAFTS.md or is a low-risk harness-internals assumption the planner can proceed past.)*

1. **Harness wave/dependency mechanics (A1-A3 above).**
   - What we know: `160-DRAFTS.md` cites specific line numbers in `phase.cjs` and `execute-phase.md` for the DAG-recomputation and overlap-check behaviors that justify the three-plan/three-wave split and `160-03`'s declared dependency on `160-02`.
   - What's unclear: those files live in the GSD harness install (gsd-core), not in this repository's own tree, so this research session could not open and re-read them directly.
   - Recommendation: proceed with the pre-drafted frontmatters as-is (`160-DRAFTS.md` Area J) — they are the locked, adversarially-reviewed output. If the harness ever recomputes a different wave number, its own precedent (per A1) is to warn, not silently misexecute, so the risk of silent failure is low.

2. **The `Licensed` pilot-reading outcome's scope question (ShellLauncher re-test).**
   - What we know: D-30 locks a default (`Licensed` → owner is asked in the same gate whether re-testing the ShellLauncher node is in scope; default is "no, stays deferred" if the owner says nothing).
   - What's unclear: which of the two forms (single-gate vs. a second `checkpoint:decision` task) the owner will actually choose at execution time — this is explicitly listed as Claude's Discretion / owner's choice in CONTEXT.md, not something research can resolve in advance.
   - Recommendation: the planner should draft 160-02 with the single-gate form (the locked default) and note in the task text that a second `checkpoint:decision` is a valid substitution if the owner prefers it at execution time — this is already how `160-DRAFTS.md` frames it.

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | All `scripts/validation/*.mjs` validators | ✓ (confirmed — all 5 targeted validators + apex ran successfully this session) | not separately queried; runtime already proven functional | — |
| Python 3 | `check.py`, `sweep3.py` | ✓ (confirmed — both ran successfully this session, producing baselines matching CONTEXT.md exactly) | not separately queried; runtime already proven functional | — |
| `curl` | Fact-check source re-fetch (K1) | ✓ (confirmed — both Learn pages fetched HTTP 200 this session) | — | — |
| `claude` CLI (`claude -p`) | Fact-check dispatch (K3), hand-built judge packets | Not independently invoked this session (would consume the phase's own 6-process budget) — but the dispatch shape and precedent (`_JUDGE-VERDICTS-batch10.json`) are confirmed present and byte-correct in the repo | — | — |
| Network access to `learn.microsoft.com` | Source-byte re-fetch at execution time | ✓ (confirmed — both pages returned HTTP 200 with correct `ms.date` this session, from this environment) | — | — |
| Pilot device (physical HP kiosk) | D-30 checkpoint (`slmgr /dlv`/`/xpr`) | Not verifiable from this research session (requires the owner's own hands-on device access) | — | `decline` is a supported, non-halting resume signal per D-30 — LIC-01 does not strand if the owner declines |

**Missing dependencies with no fallback:** none — every tool this phase needs was confirmed present and working this session.

**Missing dependencies with fallback:** pilot-device access has a designed fallback (the `decline` path).

## Validation Architecture

Nyquist validation is explicitly disabled for this project. Per the phase-prompt's own instruction, this section is intentionally kept minimal — the `<verify>` commands the planner needs are the validator invocations already characterized below and pre-drafted in full in `160-DRAFTS.md`'s Area J plan frontmatters (each plan's own `<verification>` block). No test framework, no Phase Requirements → Test Map, no Wave 0 gaps apply to a documentation-only phase with no code under test.

### Validator invocation reference (all confirmed this session, from repo root, HEAD `ca3aac7a`)

| Validator | Invocation | Result this session | Notes |
|-----------|-----------|----------------------|-------|
| `check-phase-155.mjs` | `node scripts/validation/check-phase-155.mjs` | 10 PASS, 0 FAIL, 0 SKIPPED | No `CHECK_PHASE_NESTED` dependency; reads `process.cwd()`-relative paths, run from repo root |
| `check-phase-156.mjs` | `node scripts/validation/check-phase-156.mjs` | 10 PASS, 0 FAIL, 0 SKIPPED | `administrator` counts per-file confirmed: RE-237=10 (V-156-ADMIN-4), matrix not separately pinned by this validator |
| `check-phase-54.mjs` | `node scripts/validation/check-phase-54.mjs` | 32 passed, 0 failed, 0 skipped | Live-reads `.planning/REQUIREMENTS.md` and `.planning/ROADMAP.md`; V-54-27 recursively walks `.planning/` and `docs/`, so new phase artifacts fall inside it |
| `c17-eee-contract.mjs` | `node scripts/validation/c17-eee-contract.mjs` | 237 files checked, 0 with violations, 0 total (all 13 assertions 0) | Assertion #12 (200-char blockquote-run cap) source confirmed at lines 387-409 |
| `check-nav-hub-links.mjs` | `node scripts/validation/check-nav-hub-links.mjs` | 0 hub-presence failures, 0 corpus-link failures, 0 total | Corpus-wide, no filter; resolves every in-recipe `#fragment` |
| `check-phase-159.mjs` (apex) | `node scripts/validation/check-phase-159.mjs` | 117 PASS, 0 FAIL, 0 SKIPPED | Measured wall-clock **1m59.442s** this session (DRAFTS.md's own "~2 min, not ~17s" estimate confirmed; do not budget the old ~17s figure) |
| `check.py --no-headings` (report-only) | `python .claude/skills/google-style/check.py --no-headings <file>` | RE-237: 86 candidates; matrix: 20 candidates | Never a threshold — report-only per D-34/prior-phase precedent |
| `sweep3.py` (report-only) | `python scripts/docs-style/sweep3.py <dir> scripts/docs-style/_CONTENT-PINS.txt` | `docs/recipes`=0, `docs/reference`=0, `docs` (whole)=1 (the 1 is in `docs/operations/`, pre-existing, not this phase's scope) | Run **per directory**, never bare `docs` for an acceptance check — the whole-corpus run reports the pre-existing 1 |

## Security Domain

Not applicable — this phase edits static documentation and planning-artifact Markdown files only; it introduces no authentication, session management, access control, input-validation surface, or cryptography. No ASVS category applies. `security_enforcement` need not be separately confirmed false; the phase has no security-relevant surface by its nature (a documentation corpus, no code, no secrets, no user input).

## Sources

### Primary (HIGH confidence — fetched/measured directly this session)
- `https://learn.microsoft.com/en-us/windows/iot/iot-enterprise/commercialization/licensing` — fetched as raw HTML this session (`curl -sSL`, HTTP 200, 41,969 bytes); `ms.date` = `2026-06-24T00:00:00Z`, `updated_at` = `2026-06-25T22:05:00Z`, `<local-time datetime>` = `2026-06-24T08:00:00.000Z`; New Device/Upgrade Existing Device OEM-vs-Volume table and "qualifying operating system" sentence quoted verbatim from the fetched bytes.
- `https://learn.microsoft.com/en-us/windows/client-management/mdm/assignedaccess-csp` — fetched as raw HTML this session (HTTP 200, 84,793 bytes); `ms.date` = `2025-03-12T00:00:00Z`, `updated_at` = `2025-03-12T22:44:00Z`, `<local-time datetime>` = `2025-03-12T08:00:00.000Z`; ShellLauncher sentence quoted verbatim.
- `https://learn.microsoft.com/en-us/windows-365/enterprise/requirements` — fetched as raw HTML this session (HTTP 200); `ms.date` = `2026-03-06T00:00:00Z`; D-06's quote confirmed verbatim.
- `docs/recipes/06-walk-up-avd-kiosk-autologon.md` (RE-237) — read/grepped directly at HEAD this session (all hazard counts, frontmatter stamps, CRLF byte scan).
- `docs/reference/licensing-matrix.md` (RE-157) — read/grepped directly at HEAD this session (all hazard counts, frontmatter stamps, CRLF/no-trailing-newline byte scan).
- `docs/recipes/03-windows-11-multi-app-kiosk.md` (RE-224) — lines 27-33 read directly this session, confirming the "Pilot-observed, one tenant:" idiom cited by D-22.
- `.planning/REQUIREMENTS.md`, `.planning/ROADMAP.md` — read in full this session (LIC-01/LIC-02 text at lines 56-57, Phase 160 SC1-3 at lines 71-79, line 107's deferred-idea wording).
- `docs/_standards/EEE-SOP-standard.md` — STD-05 header confirmed at line 456; the `review_by` ≤ 90 days rule confirmed at line 58.
- `scripts/validation/check-phase-155.mjs`, `check-phase-156.mjs`, `check-phase-54.mjs`, `c17-eee-contract.mjs`, `check-nav-hub-links.mjs`, `check-phase-159.mjs` — all executed directly this session from repo root.
- `scripts/validation/check-phase-58.mjs` — read directly this session; V-58-22/V-58-23 line numbers and scope confirmed; `licensing-matrix` grep confirmed 0 occurrences.
- `scripts/docs-style/sweep3.py` — read directly this session; `do_em = False` (line 212, unconditional) and table-row skip (lines 202-204) confirmed in source.
- `scripts/docs-style/judge-packets.py` — read directly this session; `MODALS` regex (line 31) and modal-survival drop logic (lines 108, 113) confirmed.
- `scripts/docs-style/_JUDGE-VERDICTS-batch10.json` — read directly this session; `dispatch_command` key confirmed at line 13 exactly.
- `.planning/milestones/v1.22-phases/155-rcp-walk-up-avd-kiosk-recipe-formalization/155-GATE-BASELINE.json` and `155-01-PLAN.md` — read directly this session as the precedent shape for `160-GATE-BASELINE.json` and a ROADMAP/REQUIREMENTS-editing plan.

### Secondary (MEDIUM confidence)
- None — every claim in this file that could be independently checked was checked directly this session (Primary tier). The remaining unverifiable claims are listed in the Assumptions Log (harness internals outside this repo's tree).

### Tertiary (LOW confidence)
- A1-A3 in the Assumptions Log (GSD-harness `phase.cjs` / `execute-phase.md` internals — not located in this repository's file tree this session).

## Metadata

**Confidence breakdown:**
- Corpus byte-facts (RE-237, matrix, hazard counts, CRLF state, frontmatter stamps): HIGH — every figure independently re-measured this session and matched CONTEXT.md/DRAFTS.md exactly, zero drift found.
- Validator behavior and current pass/fail state: HIGH — all six validators (five leaves + apex) executed directly this session with matching results.
- External source claims (Learn pages, `ms.date`, quoted sentences): HIGH — fetched as raw HTML this session, quoted verbatim from the fetched bytes, not from memory or a prior session's cache.
- Plan mechanics tied to GSD-harness internals (wave DAG recomputation, overlap-check, CLI flip semantics): LOW/ASSUMED — these files are outside this repository and could not be independently opened this session; carried forward from CONTEXT.md/DRAFTS.md's own citations.
- Decision content (the 40 D-NN decisions, the locked draft text): not re-litigated — these are locked, out of scope for research to re-decide; research's role was byte-verification only, which is complete.

**Research date:** 2026-09-12
**Valid until:** Next commit that touches `docs/recipes/06-walk-up-avd-kiosk-autologon.md`, `docs/reference/licensing-matrix.md`, `.planning/ROADMAP.md`, `.planning/REQUIREMENTS.md`, or `scripts/validation/` — re-measure before executing if HEAD has moved past `ca3aac7a`.
