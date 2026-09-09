# Phase 155: RCP — Walk-Up AVD Kiosk Recipe Formalization - Context

**Gathered:** 2026-09-02
**Status:** Ready for planning

<domain>
## Phase Boundary

RE-237 (`docs/recipes/06-walk-up-avd-kiosk-autologon.md`, 292 lines, `status: Draft`) — authored by
Claude Desktop outside the GSD phase flow from a live pilot build and imported **unmodified** at
`68c747a9` as a provenance baseline — becomes a registered, cross-linked, review-Approved Device
Recipe #6: registry row 237, nav wiring, both publish-bundle canaries, executable assets committed
under a new top-level tree, its two external claims researched, its pilot claims labelled, its six
conflicts against RE-222 and RE-224 reconciled, and the licensing consequence propagated.

Discharges RCP-01 through RCP-10.

**Out of scope in both directions.** No batch-10 styling of the other 9 post-fork documents (Phase
156). No authoring-standard or hygiene work (Phase 157). No publish bundle rebuild (Phase 158) — this
phase deliberately leaves the bundle unbuilt and does not run it. No harness work, no
`check-phase-155.mjs` (Phase 159 authors every content-phase leaf; see D-31). A defect found in a
batch-10 file is recorded, not fixed.

This CONTEXT was produced by `/gsd-discuss-phase` + `/grill-me` + `/adversarial-review`
(5 parallel Finders → Adversary → Referee). 127 raw findings → 97 deduplicated → **86 confirmed
real, 11 false positives**, clustered into 11 distinct defects. Every `[MEASURED]` row below was
executed against this repository at `cb454431` on branch `v1.22/154-style-landing`; the load-bearing
ones were reproduced independently by at least two agents, several by perturb-and-restore experiment.
The repository was left byte-identical after every perturbation (`git status --porcelain` verified
at start and end of each agent).

**The draft's own central recommendations were falsified in four places** — the promotion ordering,
the canary arithmetic, the asset provenance and the `[PILOT]` marker shape. All four corrections are
load-bearing and are recorded below with the evidence that overturned them.

</domain>

<decisions>
## Implementation Decisions

### Area A — The publish gate and promotion ordering

- **D-01:** **The registry `Status` column and each document's frontmatter `status:` key are
  different vocabularies and must never be conflated.** `[MEASURED]` `build-publish-bundle.mjs:524`
  filters `parseRegistry(content).filter(r => r.status === 'Approved')`, where `parseRegistry`
  (`build-filename-map.mjs:103-114`) sets `status: cols[5]` — the **registry table column**.
  `docs/_registry/RE-index.md:9-14` states the distinction outright ("This column tracks the EEE
  retrofit lifecycle, **not** a document's frontmatter `status` field"), and
  `build-publish-bundle.mjs:137-139` repeats it. **Frontmatter `status:` never gates bundle
  membership.** The discussion draft conflated them and built two further errors on top; both are
  corrected below.

- **D-02:** **RE-237's registry row lands at `Status: Approved`. No other value is available.**
  `[MEASURED]` `awk -F'|' '/^\| RE-/{...print $6}' docs/_registry/RE-index.md | sort | uniq -c` returns
  **one** distinct value across all 236 rows: `Approved`, 236 times. `Pending` is documented in the
  registry header as the pre-EEE-retrofit state and has **zero** instances corpus-wide.
  `152-CONTEXT.md` D-10 already ruled this class: "forced by mechanism — `build-publish-bundle.mjs`
  filters on it, so `Pending` would silently exclude them." `V-132-REGISTRY`
  (`check-phase-132.mjs:44-58`) asserts registration-time `Approved` for the RE-222/223 precedent.

- **D-03:** **`checkDivergence` is a fail-closed guard the draft missed, and it inverts the draft's
  claim.** `[MEASURED]` `build-publish-bundle.mjs:141-149`, call site `:371-380`: registry
  `Status: Approved` + frontmatter `status: Draft` → `integrityFailures` →
  `=== INTEGRITY FAILURES ===` on stderr → `process.exit(1)`, **no zip written**. The draft asserted
  under a `[MEASURED]` tag that "nothing mechanical stops a premature flip"; it hunted for a guard
  against premature promotion, found none, and missed the build-breaker firing in the other
  direction.

- **D-04:** **RCP-01 + RCP-03 + RCP-04 + a buildable bundle are jointly unsatisfiable.** RCP-03
  requires the Approved-row canary to read 237 **in the same commit as the registry row**, which by
  D-02 requires that row to be `Approved`. D-03 then requires frontmatter `Approved` in that same
  commit. RCP-04 (`REQUIREMENTS.md:52`) and **ROADMAP SC#5** require the frontmatter flip in a
  **later** commit. The first two force the flip at-or-before registration; the third forces it
  after. Note precisely: the *requirement set* is satisfiable — what is unsatisfiable is "all three
  requirements **and** a buildable bundle at every commit."

- **D-05:** **[OWNER-RULED 2026-09-02] Resolution: flip first, then register. RCP-04's ordering
  clause and ROADMAP SC#5 are amended by annotate-and-supersede.** Order:
  `/adversarial-review` on RE-237's content → owner sign-off → **frontmatter flip** → the atomic
  registration commit. Chosen over the alternative (accept a transient bundle-unbuildable window)
  on four grounds:
  1. That window's cost is a **premise, not a guard** — `[MEASURED]` neither generator is invoked by
     any `check-phase-*.mjs` validator or any of the 18 CI workflows, so nothing would ever report
     it. That exact structural blindness is why the bundle canary "sat RED for an entire milestone."
  2. RCP-04's *"only once RCP-01 through RCP-03 are landed"* clause **protects nothing** — under
     D-02 the row lands `Approved` regardless, so registering first does not delay publication; it
     only manufactures the broken window.
  3. The review gate is preserved exactly: review precedes both the flip and the registration.
  4. It is this repository's own one-milestone-old precedent for the same document class.
  — **Reversibility:** costly — the amendment edits `.planning/REQUIREMENTS.md` and
  `.planning/ROADMAP.md`, which `check-phase-54.mjs` reads **live** on the apex chain (see D-08).

- **D-06:** **The Phase 137 precedent runs the REVERSE of what the draft claimed, and the draft's
  claim was sourced from a ledger rather than from git.** `[MEASURED]`
  ```
  c3733928  2026-08-03 17:20:08  docs(137-01): flip RE-224/RE-225 recipes Draft to Approved
  f0b7aa90  2026-08-03 17:21:25  docs(137-01): register RE-224/RE-225, regenerate filename-map, bump both row-count canaries
  git merge-base --is-ancestor c3733928 f0b7aa90 → TRUE   (77 seconds apart)
  ```
  Phase 137 **flipped first, registered second**. The draft asserted the opposite under `[MEASURED]`,
  citing `152-CONTEXT.md:62` — a secondary ledger — and never ran `git log`. This is the project's own
  recorded anti-pattern (`reference_audit_log_is_not_evidence`), committed in the same document that
  cites the rule against it. `f0b7aa90` also regenerated `filename-map.md` in the same commit as the
  registry row, independently vindicating D-13.

- **D-07:** **The Draft→Approved flip is a TWO-site edit per file.** `[MEASURED]` `c3733928`'s own
  commit body: "flip `status:Draft` to `Approved` at frontmatter `:3` **and the Status byline at
  `:13`**." RE-237 carries `status: Draft` at `:3` and `**Status:** Draft` at `:13`. C17 assertion #9
  (`c17-eee-contract.mjs:327-331`) enforces block-field/frontmatter equality. A single-site flip is a
  hard C17 violation on the apex chain. C17 #13 accepts `{Draft, Approved, Superseded}`
  (`c17-eee-contract.mjs:49`), so nothing mechanical prevents a premature flip — the gate is D-05's
  review, and it is human.

- **D-08:** **The D-05 amendment carries the `check-phase-54` rider.** `[MEASURED]`
  `check-phase-54.mjs:30` reads `.planning/REQUIREMENTS.md` live; `V-54-21` is a negative assertion at
  `:347`; `V-54-27` recursively walks `.planning/` at `:462` and therefore covers every artifact this
  phase writes under `.planning/phases/155-…/`. Baseline `check-phase-54` before the edit and re-run
  it after, in the same task. This mirrors Phase 154's D-13 for its own amendment.

### Area B — The RE-224 line-count pin

- **D-09:** **`V-135-RECIPE` pins RE-224 at exactly 328 lines and fires under the apex. Proven by
  perturbation, not by reading.** `[MEASURED]` `check-phase-135.mjs:49` `EXPECTED_LINE_COUNT = 328`;
  the file is 328 lines; `check-phase-135.mjs` contains **no** `CHECK_PHASE_NESTED` guard (grep: zero
  matches); the apex `check-phase-153.mjs` runs `CHAIN_PHASES = [48..152]`, 105 entries. Appending one
  blank line:
  ```
  BEFORE:  check-phase-153 → 111 PASS, 0 FAIL, 0 SKIPPED   exit 0
  DURING:  check-phase-135 →   6 PASS, 1 FAIL              exit 1  ("line count drift: expected 328, got 329")
           check-phase-153 → 110 PASS, 1 FAIL              exit 1  (V-153-CHAIN-135 FAIL)
  AFTER (git checkout --): check-phase-153 → 111 PASS, 0 FAIL, exit 0
  ```
  **No requirement mentions this collision** (grep for `328`, `check-phase-135`, `line count` across
  `REQUIREMENTS.md` → 0 hits).

- **D-10:** **[OWNER-RULED 2026-09-02] Retire the equality pin; replace it with grep content
  needles.** `V-135-RECIPE` becomes "file exists, non-empty, H1 verbatim" plus one or two content
  needles. This is the instrument `151-05-SUMMARY.md:450` explicitly recommends: *"**Do not propose a
  line-count pin on this recipe.** … a line-count pin is exactly what makes recipes 03 and 04
  untouchable today — a cost this phase paid in full … `grep`-based content needles cost nothing and
  survive growth."* Chosen over amending the constant because **RE-224 is inside Phase 156's
  13-document batch-10 set** — a re-pin at 155 is staleable by 156 and would demand a *second*
  amendment of the *same* predecessor constant in the *same* milestone, with nobody warned. Both
  options cost the identical predecessor-surface edit, so D-11's exception-scoping is a wash; only
  this one removes the collision permanently. Line-count-neutral editing was rejected outright: it
  subordinates three mandated prose corrections to an arithmetic target.
  — **Reversibility:** costly — edits a v1.19 predecessor validator; see D-11.

- **D-11:** **The draft's stated reasons for the option it recommended were all false, and are
  recorded here so they are not re-litigated.** `[MEASURED]`
  (i) `git log -S"EXPECTED_LINE_COUNT" -- scripts/validation/` returns **exactly one** commit —
  `17d6ad35 feat(138-03)`, the authoring commit. Neither constant (`135:49` = 328, `136:44` = 301) has
  **ever** been amended, so the "established idiom" the draft cited does not exist; the file's
  "CORRECTION OF RECORD" header records an authoring-time choice of 328 over the prose's 329, not an
  amendment.
  (ii) The draft dismissed the frozen-read option citing HARN-02; `REQUIREMENTS.md:84` HARN-02 is the
  `readAtV121Close`/`lsTreeAtV121Close` export helpers, and the conversion requirement is **HARN-03**
  (`:85`), which converts `v1.21-milestone-audit.mjs`'s C17 leg, **not** `V-135-RECIPE`. No phase in
  this milestone frozen-reads `check-phase-135`.

- **D-12:** **D-48 is superseded by RCP-07, explicitly and in writing.** `151-CONTEXT.md:278` D-48
  reads *"Recipes 03 and 04 are not touched. Their line-count pins (328 and 301) … make any edit an
  immediate red."* `[MEASURED]` `grep D-48 .planning/STATE.md` → **no hits**, so it is a Phase-151
  **scoping** decision, not carried-forward durable doctrine; and Phase 151 had an escape (decline the
  edit) that RCP-07 denies Phase 155. D-48 therefore cannot be followed and does not govern the
  mechanism — but the phase must say so rather than silently reverse a prior phase's recorded ruling.

- **D-13:** **Editing `check-phase-135.mjs` needs an explicitly-scoped D-00a exception recorded
  now.** `STATE.md:112` carries the durable doctrine: "non-current-milestone predecessor frozen
  surfaces BYTE-UNCHANGED except explicitly-scoped exceptions", and HARN-05 (`REQUIREMENTS.md:87`)
  re-measures exactly that at close. `.github/workflows/audit-harness-v1.19-integrity.yml:105-117`
  runs `check-phase-135` as its own CI job. `[MEASURED]` the edit is otherwise safe: no validator
  names `check-phase-135.mjs`, and it is absent from the `PRED_BLOBS` frozen-blob maps
  (`check-phase-69.mjs:46`, `check-phase-70.mjs:88`). Without the recorded exception, HARN-05 reports
  an unexplained predecessor diff at close.

- **D-14:** **The acceptance surface covers all six `V-135-*` assertions, not the line count alone.**
  `[MEASURED, and one draft hazard disproved]` RE-224's only ` ```xml ` fence is `:131` and its sole
  `| Namespace (year)` table header is `:208` — **both inside Step 5 (`:120`)**, 17–94 lines above
  Step 6 (`:225`). So RCP-07(b) **cannot** disturb `V-135-XMLFENCE`, `V-135-NAMESPACETABLE` or
  `V-135-ROLLBACKORDER`. Still assert all six. Two mechanical notes: `countTableDataRows`
  (`:54`) uses `findIndex` on the **first** `^| Feature |` line, so any new table with that header
  above `:43` silently retargets `V-135-ANTIFEATURE`; and `wc -l` agrees with the validator only while
  RE-224's trailing newline survives (it does today).

### Area C — Requirement coverage and the reconciliation edit sites

- **D-15:** **All six RCP-06/07 sub-parts are in scope with named sites. The draft covered two.**
  `[MEASURED]` sites:

  | Sub-part | Site | Containing heading |
  |---|---|---|
  | RCP-06(a) Step 5a callout | `docs/recipes/01-shared-windows-avd-client.md` Step 5a body | `### Step 5a: Kiosk configuration` (`:114`) |
  | RCP-06(b) reset field names | `01-…:101` | `### Step 4: Deploy Windows App (device-context)` (`:78`) |
  | RCP-06(c) offline Store license | `01-…:129` | `### Step 5a: Kiosk configuration` (`:114`) |
  | RCP-07(a) anti-feature row | `docs/recipes/03-windows-11-multi-app-kiosk.md:53` | anti-feature table (header `:43`) |
  | RCP-07(b) Step 6 data type | `03-…:245` (`Data type` cell) | `### Step 6: Deliver the configuration through a custom OMA-URI profile` (`:225`) |
  | RCP-07(c) Shell Launcher prereq | `03-…:29` | `## Summary` bullet |

  **The third `[ASSUMED]` at `01-…:133` is OUT of RCP-06's scope** and must not be touched — nothing
  in the requirement or the draft said so.

- **D-16:** **Four heading literals are frozen as byte-unchanged acceptance assertions**, because
  live links and validators depend on them: `### Step 5a: Kiosk configuration` and
  `### Step 5b: Shared PC configuration` in RE-222 (`V-130-KIOSKFORK` at `check-phase-130.mjs:57-72`,
  `V-135-RECIPE01ZEROEDIT` at `check-phase-135.mjs:104-119`, **plus** RE-224:53's own outbound link);
  `### Step 4: Deploy Windows App (device-context)` in RE-222 (pinned by **no validator** — only by
  RE-237:94's inbound link); and `### Step 6: Deliver…` in RE-224 (referenced twice internally at
  `:107` and `:319`). Record explicitly that the "zero-edit tripwire" names **two headings, not the
  file** — a reviewer trusting the name would over-constrain RE-222, and one trusting the draft's
  "neither pins body text" would under-constrain it.

- **D-17:** **RCP-06(b) makes RE-237 self-contradictory, and fixing that is part of RCP-06(b).**
  `[MEASURED]` `docs/recipes/06-walk-up-avd-kiosk-autologon.md:94` reads "the registry names that
  [RE-222 Step 4](01-shared-windows-avd-client.md#step-4-deploy-windows-app-device-context) marked
  `` `[ASSUMED]` ``" — present tense. RCP-06(b) removes that label, making the sentence **false inside
  the document being promoted to `Approved` in the same phase**. No gate catches it and no area owned
  it. Add the `:94` rewrite to RCP-06(b)'s edit set.

- **D-18:** **RCP-07(a) narrows the row in place — one row in, one row out — and preserves its
  outbound link.** `[MEASURED]` `03-…:53` **ends with**
  `[Step 5a: Kiosk configuration](../recipes/01-shared-windows-avd-client.md#step-5a-kiosk-configuration)`.
  `V-135-ANTIFEATURE` counts exactly 12 data rows. The redundant `../recipes/` form (from inside
  `docs/recipes/`) is **not** to be "cleaned up" — no upside, and a resolution risk.

- **D-19:** **RCP-02's nav surface is three places in one file, and one of them is doubly pinned.**
  `[MEASURED]` there is **no** `docs/recipes/00-index.md` — the "recipes navigation surface" *is*
  `docs/index.md`. (a) The quick-nav bullet at `docs/index.md:38` is pinned **simultaneously** by
  `V-137-BULLET` (`check-phase-137.mjs:46-50`: exactly one line matching the anchor regex, containing
  **both** `Windows 11 multi-app kiosk` and `Android Dedicated multi-app kiosk`) and
  `V-152-MASTERHUB-QUICKNAV` (`check-phase-152.mjs:107,134`, line-scoped, `enterprise update plan`) —
  RE-237's fragment is **appended to** that one line, never a rewrite of it. (b) The recipes table at
  `:280-284`. (c) A Version History row at `:391`, per the Phase 152 precedent.

- **D-20:** **The hub-unwiring policy is convention-only for RE-237.** `[MEASURED]`
  `V-132-HUBSNOTWIRED`'s regex is `/docs\/recipes|01-shared-windows-avd|02-shared-ipad/` and
  `V-137-HUBSNOTWIRED`'s literals are `recipes/03-` / `recipes/04-`. **Neither matches a relative
  `recipes/06-…md` link from a hub.** Honour the ratified invariant (INT-05) — do not wire
  `common-issues.md`, `quick-ref-l1.md` or `quick-ref-l2.md` — but know that nothing enforces it here.

### Area D — The `[PILOT]` label

- **D-21:** **RCP-05 needs active editing — this settles the roadmap's own deferred question.**
  `[MEASURED]` `grep -rn "\[PILOT\]" docs/` → **0 occurrences**. RE-237 carries the semantics in prose
  at four or more sites but **not one `[PILOT]` token**. This closes the `DISCUSS-PHASE-FLAGS` item at
  `STATE.md:63`.

- **D-22:** **`[PILOT]` is ALREADY DEFINED, bindingly, at `.planning/REQUIREMENTS.md:17`.** The draft
  asked where to define it and offered four options, having grepped only `docs/`. The definition
  reads: *"`[PILOT]` is new this milestone: a behaviour observed on one device in one tenant during
  the 2026-08-27→30 build. `[PILOT]` is **not** `[SOURCED]` — the harness cannot validate it, and no
  promotion review may treat it as though it were first-party documentation."* **Do not author a
  competing inline definition.** RE-237 gains a one-sentence pointer consistent with `:17`, because
  `.planning/` is never published and a `.docx` reader must still learn what the label means.

- **D-23:** **The marker is a bare `**[PILOT]**` lead-in, placed inline at the head of the claim —
  table cell, list item, prose or blockquote alike.** The draft's "mirror the `[ASSUMED]` idiom
  exactly" is rejected on two measured grounds:
  (i) `[MEASURED]` the idiom does not exist as described — exact-token `[ASSUMED]` is 10 occurrences
  across 5 files, of which **3** are bolded-lead-in blockquotes; variant forms (`[ASSUMED -- …]`)
  take the true population to 16, so the claimed shape holds for **3 of 16**. The dominant real idiom
  is an inline code span in a table cell.
  (ii) `[MEASURED]` the shape is structurally impossible at ~85% of its own target sites — only
  RE-237 `:98/:111/:172/:174/:205` are blockquotes; the rest are anti-feature table cells (`:42-50`),
  a prerequisites list item (`:31`), a decision-matrix cell (`:106`), troubleshooting rows
  (`:267-274`), prose (`:190`) and a Version History cell (`:292`). RE-237:43 **already** carries the
  correct table-cell idiom.

- **D-24:** **The bare form is forced by C17 #12, measured by experiment.** `[MEASURED]`
  `c17-eee-contract.mjs:387-409` caps **every** top-level blockquote at 200 chars, joining consecutive
  `>` lines with a space. Baseline C17 = 237 files / 0 violations. Applying the descriptor form
  (`**[PILOT] Observed on the pilot device:** `) to RE-237:111 → **`[#12] Blockquote exceeds 200 chars
  (221 chars)`**, 237 files / 1 with violations. A bare `**[PILOT]** ` (12 chars) is safe everywhere.
  RE-237 has 23 top-level blockquotes; five have under 30 chars of headroom:

  | Line | Chars | Headroom |
  |---|---|---|
  | `:111` | 179 | 21 |
  | `:184` | 176 | 24 |
  | `:211` | 176 | 24 |
  | `:203` | 173 | 27 |
  | `:96`  | 171 | 29 |

- **D-25:** **Phase 155 owes Phase 156 a protection obligation for `[PILOT]`, discharged in this
  phase.** `[MEASURED]` `.claude/skills/google-style-verify/SKILL.md:114` protects
  `[ASSUMED — needs live verification]` as a must-stay-hedged signal; `[PILOT]` appears **0** times in
  that skill and **0** times among `_CONTENT-PINS.txt`'s 562 pins. `PROJECT.md:34` records that
  hedge-promotion (STRENGTHENED) outnumbered INVERTED **26 to 19** and names section labels as the
  reliable tell. RE-237 is in batch-10. Introducing a label the next phase's tooling will strengthen
  away is the exact failure RCP-05 exists to prevent, executed by the tooling — so `[PILOT]` is added
  to the protected-signal list and/or `_CONTENT-PINS.txt` **in the same phase that introduces it**.

- **D-26:** **The class-(ii) set is enumerated exhaustively in the plan, with a stopping rule, and
  two edge cases are adjudicated.** Label pilot observations only; first-party-documentable mechanism
  claims stay unlabelled; the RCP-10 external claims take `[SOURCED]`/`[UNVERIFIED]`. The draft's
  five-example list is materially incomplete — at minimum `:37`, `:44`, `:50`, `:98`, `:190`, `:205`
  also qualify. Two cases the three-class split does not cover and the plan must rule on: **hybrid**
  claims (`:44`, `:46`, `:47` pair a documentable mechanism with a pilot-derived particular) and
  **`:48`** (ConfigMgr Remote Control over CMG — a first-party-documentable *negative*, neither pilot
  nor one of RCP-10's two). Also: RE-237:94 already uses `[ASSUMED]` and D-17 rewrites it. Pick **one**
  greppable form — backticked or bare — because `extractLinks` (`check-nav-hub-links.mjs:219-233`)
  masks single-backtick code spans, so a code-spanned label is invisible to the link checker and a
  bare one is not. Never write `[PILOT](…)`: that is a markdown link and fails `existsSync`.

### Area E — Assets

- **D-27:** **The asset set splits three ways. The draft's "authored on the pilot device, cannot be
  fabricated" premise was false for most of it.** `[MEASURED]` RE-237 sources its own assets:
  - **Upstream, vendorable (4+):** `:81` — "Assemble a Win32 package from `Azure/WindowsAppKiosk`
    (`source/WindowsApp/Apps/WindowsApp`): `Deploy-WindowsApp.ps1`, `Detect-WindowsApp.ps1`, the
    `Dependencies` folder…"; `:106` — `WindowsApp_AutoLogon.xml` in the same repo; `:200` +
    `SEED-002 §D` — `RemoveBloat.ps1` is Andrew Taylor's public De-Bloat.
  - **Owner-supplied only (2):** `Remove-KioskOemBloat.ps1`, `Remove-KioskRunTasks.ps1`.
  - **Unnamed (needs a filename decision):** the debug XML (`:157`), the three PSADT package sources
    (`:192`), the triage sensor (`:193`), the two diagnostics. `[MEASURED]` RE-237 names exactly
    **six** filenames in 292 lines, so RCP-09's "reference them by relative path rather than bare
    filename" is **undefined** where there is no bare filename — new prose must be authored.
  **[OWNER-RULED 2026-09-02]** Vendor the upstream files at a **pinned commit SHA**; the owner
  supplies the two pilot-only scripts; fabrication is prohibited. Note the draft's internal
  contradiction it must not repeat: it declared the same GitHub repo authoritatively enumerable at a
  pinned SHA in one area and its files unobtainable in another.

- **D-28:** **The "11 assets" figure is deleted.** `[MEASURED]` it appears in no requirement.
  `REQUIREMENTS.md:57` enumerates to 10 or 12 depending on whether "two detect/remediate pairs" is 2
  items or 4 files. The plan uses the requirement's own enumeration and rules 10-vs-12 explicitly; in
  a document where every other count is `[MEASURED]`, an invented number becomes a false acceptance
  criterion.

- **D-29:** **[OWNER-RULED 2026-09-02] The ConfigMgr package source is scrubbed to documented
  placeholders, and the phase routes through `/gsd-secure-phase`.** `[MEASURED]` RE-237:209 states the
  install command carries `AADTENANTID`, `AADCLIENTAPPID`, `AADRESOURCEURI`, the site code and the CMG
  mutual-auth path; `git remote -v` → `origin https://github.com/Schweinehund/Autopilot.git`, which
  HARN-06 pushes to; `.gitignore` guards only `.env`/`*.pem`/`*.pfx`; there are no non-sample git
  hooks and no PreToolUse hooks. The two `Remove-Kiosk*` scripts delete provisioned packages,
  Run/RunOnce values, scheduled tasks and `kioskUser*` profiles as SYSTEM — they get a
  `-WhatIf`/`SupportsShouldProcess` review per `CLAUDE.md`'s own PowerShell convention. The draft
  proposed an adversarial **content** review and explicitly ruled out "a code review of the diff",
  which is backwards for the one artifact class in this phase that is executable code. `/gsd-secure-phase`
  is additionally owed from Phase 154.
  — **Reversibility:** **one-way** — a secret committed to a public remote requires history rewrite;
  removal from HEAD is not removal.

- **D-30:** **[OWNER-RULED 2026-09-02] The Windows App MSIX is pinned by URL + SHA256, not
  committed.** `[MEASURED]` RE-237:81 pins the MSIX *into* the package "so ESP never depends on the
  CDN"; `.git` is 43 MB and the largest tracked file is 1.6 MB; GitHub caps files at 100 MB. Recording
  the download URL and a SHA256 preserves the recipe's actual intent — a pinned, verifiable version —
  without the binary. Needs a one-line RCP-09 scope note, not an amendment.

- **D-31:** **[OWNER-RULED 2026-09-02] RE-237 gains a provenance section so a published reader can
  reach the assets.** `[MEASURED]` `assets/` is structurally invisible to the bundle —
  `build-publish-bundle.mjs` never walks a directory; it reads `docs/_registry/RE-index.md` (`:42`,
  `:306`) and converts registry rows — yet `:193` writes "This bundle contains the entire Approved
  documentation corpus" and the bundle grounds Copilot Studio. The section names the repository path,
  the upstream source at its pinned SHA, and how to request the two pilot-only scripts. Keeps the
  owner's `assets/` location ruling intact; Phase 156 styles the new section with the rest of RE-237.

- **D-32:** **Asset references are markdown links, and every committed asset path is negative-control
  checked against `.gitignore` before the commit.** `[MEASURED]` `checkInboundLinks`
  (`check-nav-hub-links.mjs:273-302`) walks every `.md` under `docs/`, resolves targets relative to
  the linking file, and hard-fails `target file not found` for any non-`http(s):`/`mailto:` target —
  so a link makes the checker enforce asset existence. But `[MEASURED]` `git check-ignore -v` matches
  on `dist/` (`.gitignore:20`), `build/` (`:21`), `*.log` (`:47`) and `*.ps1xml` (`:32`) under the
  proposed tree, and `existsSync` reads the **working tree** — so a gitignored asset passes for the
  author and dangles in every clone. Two further mechanics: a **directory** target passes `existsSync`
  (so the three package sources get no enforcement from a link, and git cannot track an empty
  directory), and a non-`.md` target **with a fragment** hard-fails `anchor not found` (asset links
  carry no fragment).

- **D-33:** **The detector is an apex gate, not a CI gate — state it plainly.** `[MEASURED]`
  `V-143-CORPUSRUN` (`check-phase-143.mjs:78-92`) spawns `check-nav-hub-links.mjs` corpus-wide and
  requires exit 0, and `check-phase-143` is inside the apex chain — so D-32's enforcement is real and
  hard **locally**. But `origin/master` is **28 commits behind HEAD**, local `master` is 11 behind,
  there is no remote branch for `v1.22/154-style-landing`, and GitHub's weekly `schedule: cron` runs
  on the default branch. **No CI run observes any Phase 155 work until HARN-06's close push.** Do not
  let "standing detector" imply remote enforcement.

- **D-34:** **[OWNER-RULED 2026-09-02] Per-asset attribution headers plus a `NOTICE` file in
  `assets/recipes/06-walk-up-avd-kiosk/`.** `[MEASURED]` `ls LICENSE*` → nothing; this repo has no
  LICENSE file, and `SEED-002 §D` lists vendoring De-Bloat as a **deferred** item, not a decided one.
  Each vendored file keeps its upstream header and gains a provenance comment naming the source repo,
  pinned SHA and retrieval date. This deliberately avoids the question of what licence *this* repo is
  under, which is not Phase 155's to decide.

- **D-35:** **`.gitattributes` is not changed, but for a corrected reason.** The draft's premise —
  "`core.autocrlf=true` lives in the system gitconfig so **every clone** inherits it" — is `[MEASURED]`
  **false**: system gitconfig is machine-local (`C:/Program Files/Git/etc/gitconfig`), and a GitHub
  Actions ubuntu runner inherits nothing. With the MSIX excluded by D-30, no binary lands and no
  `text eol=` rule is warranted. Note that Phase 154's Deferred Ideas defers
  `.gitattributes * text=auto eol=lf` to **Phase 159**, which would renormalize this tree afterwards.

- **D-36:** **The production XML will exist twice; the plan states which copy is authoritative.**
  `[MEASURED]` the complete `AssignedAccessConfiguration` XML is an inline fenced block at RE-237
  `:117-148`, and RCP-09 commits the same XML to `assets/`. Nothing keeps them equal. A fenced-block ↔
  file byte-equality assertion is a two-line check and cheaper than leaving them to drift.

### Area F — Canaries, registry and generated artifacts

- **D-37:** **Both canaries go 236 → 237 in the same commit, to the same value.** The draft's
  divergence claim (all-rows 237 vs Approved-only 236) is **false** per D-01: the Approved-row canary
  reads the registry column, which RCP-04's flip does not touch. `[MEASURED]` `f0b7aa90` bumped both
  canaries 223→225 in one commit while both files' frontmatter still said `Draft`. Splitting the bumps
  would reproduce exactly the regression RCP-03 names ("sat RED for an entire milestone").

- **D-38:** **Editable sites are given as per-file LINE LISTS, not a count — the draft's "four sites
  each" is wrong.** `[MEASURED]` occurrence-counted:

  | File | Editable | Provenance — DO NOT EDIT |
  |---|---|---|
  | `scripts/pipeline/build-filename-map.mjs` | `:274`, `:284`, `:285` (**3 lines**) | `:277` (2 occurrences) |
  | `scripts/pipeline/build-publish-bundle.mjs` | `:8`, `:515`, `:522`, `:525` (**4 lines, 5 occurrences** — `:525` carries two) | `:520` (2 occurrences) |

  An executor told "four each" and finding three in the first file will reach for `:277` — the
  provenance history — which is precisely what Phase 152's D-18 forbids, two clauses after the draft
  cites D-18. Append a new provenance line; never edit the existing history (152 D-18). Compute both
  targets from the registry after the rows land; never transcribe a predicted number (152 D-19).

- **D-39:** **RCP-03's own site list is incomplete and gets annotated.** `REQUIREMENTS.md:51` names
  only `:522`/`:525`. Literal compliance ships a stale module header at `:8` and a stale comment at
  `:515` — the precise D-17 failure mode the requirement itself invokes.

- **D-40:** **`scripts/pipeline/filename-map.md` is a fourth artifact at 236 rows that no requirement
  names.** `[MEASURED]` 236 `| RE-` rows. It is regenerated with the **real generator** (never
  hand-edited) inside the same atomic commit as the registry row, the nav wiring and both canary
  bumps — the shape `f0b7aa90` used. The draft named the wrong enforcer: `V-152-FILENAMEMAP`
  (`check-phase-152.mjs:215-227`) asserts **presence** of eleven fixed IDs and **passes on a stale
  map**; the real fail-closed detectors are `checkFilenameMapCoverage` (`build-publish-bundle.mjs:339-345`,
  PUB-03) and `validateOutputFilename` (`:363-366`), neither of which runs in this phase.
  `--dry-run` exists at `build-filename-map.mjs:394-397`.

- **D-41:** **The registry row is five columns, and the collision question is already answered.**
  `parseRegistry` takes Doc ID / Path / Title / Doc Type / Status. Title = the H1 **verbatim**
  (`Walk-Up AVD Kiosk: Autologon Multi-App Assigned Access with Windows App Auto-Launch`), Doc Type =
  `Guide`, Status = `Approved` (D-02). `[MEASURED, in a scratch tree]` appending the row and running
  the real generator: `Parsed 237 registry rows -> 237 output filenames, 0 unresolved collisions`;
  `diff vs committed map: 247a248` — one pure addition, zero renames, zero reordering; slug
  `walk-up-avd-kiosk-autologon-multi-app-assigned-access-with-windows-app-auto-launch.docx`, 87 chars,
  under the 94-char incumbent. **No collision, no D-08 disambiguation, no incumbent rename.**
  Allocation ceiling verified: max ID is RE-236, so 237 is free (152 D-21's step-one, which the draft
  dropped).
  — **Reversibility:** **one-way** — registry IDs are never reused.

### Area G — RCP-10 research

- **D-42:** **Fetch discipline: source bytes, verbatim sentence, URL, fetch date.** The draft's "two
  independent fetches by different agents" is replaced — it misdiagnoses its own cited incident, whose
  root cause was **WebFetch summarization** (the instrument), not sample size; two summarizing agents
  can agree on the same wrong summary. RCP-10's own "fetch canonical pages as source bytes" already
  fixes it. Carry the concrete search key `STATE.md:137` supplies and the draft dropped:
  `Class is not licensed for use`, Intune **`-2016281112`**.

- **D-43:** **Claim 1 resolves against the repository tree at a pinned SHA — and the corpus asserts
  the POSITIVE claim, not the third-party negative.** A "ships no single-app variant" negative rots
  (it is true-at-a-date while RCP-06(a) words the corpus sentence unqualified), turns on an undefined
  "counts as shipping one" (branch? release asset? parameter? doc section?), and rests on a repo name
  taken on faith from pilot prose. RCP-07(a) already words the durable positive — *"the reference
  implementation's shipped pattern is multi-app autologon"*. Prefer it. Confirm the org/repo exists as
  step zero.

- **D-44:** **Claim 2 is a hard predecessor of the RCP-07(c) and RCP-08 edits, and an `[UNVERIFIED]`
  outcome forces a rewrite, not just a label.** `[MEASURED]` RCP-07(c) states the mechanism as fact
  ("**because** a self-deploying kiosk never triggers per-user subscription activation") and RCP-08
  likewise; **no requirement names the dependency**. And RE-237:31 **already asserts it as documented
  fact today** — "the AssignedAccess CSP `ShellLauncher` node checks **activation** and fails on an
  installed-but-unactivated Enterprise image" — so `[UNVERIFIED]` obliges an edit to `:31` and to Step
  4 which cross-references it. If the mechanism cannot be sourced, the **observation**
  (`Class is not licensed for use` on an unactivated Enterprise image) stays `[PILOT]` and the
  mechanism claim is removed from all three documents.

- **D-45:** **RCP-08 carries a THIRD claim outside RCP-10's scope that needs its own disposition.**
  Its remedy clause — *"so a per-device volume key or purpose-built hardware **is required**"* — is
  neither sourced nor pilot-observed; the pilot never tested a volume key. It must not be labelled
  `[PILOT]` (that would assert an observation that never happened) and must not ship as fact.

- **D-46:** **RCP-08 lands in `## Feature-to-License Mapping`, and the incumbent row is considered
  first.** `[MEASURED]` `docs/reference/licensing-matrix.md:62` already carries
  `| Windows Subscription Activation (Pro→Enterprise) | Microsoft 365 E3, E5, or A3/A5 | … |` — and
  RCP-08's finding *is* about subscription activation failing on a userless device. Amending that row
  or its adjacent blockquote may beat a new row; RCP-08's answer is not a licence SKU, so a new row's
  `Minimum License` cell has no natural value. `[MEASURED]` the file has **no trailing newline** (5,650
  bytes; last line is the sole Version History row at `:93`) — a naive append corrupts it. Its Version
  History is **three** columns (`Date | Change | Author`); RE-237's is two; **RE-222 and RE-224 have no
  Version History section at all.** No *validator* names this file, but `_JUDGE-VERDICTS.json:3230`
  does and 9 `_CONTENT-PINS.txt` strings are resident in it — VERIFY-04 names the pin differ as a gate
  member.

### Area H — Style, freshness, record

- **D-47:** **[OWNER-RULED 2026-09-02] New prose is written in Google style now, with
  `--no-headings`, in the tight em-dash canon.** The reason is stronger than the draft's: `[MEASURED]`
  STYLE-06 (`REQUIREMENTS.md:32`) and VERIFY-01 (`:38`) are both marked **`[x]` COMPLETE** and both
  assert "0 wanted edits over the LANDED set", which contains RE-222, RE-224 and `licensing-matrix.md`
  — writing un-styled prose into them **regresses a completed requirement**. Mandatory riders the
  draft omitted: STYLE-04 (`:30`) requires `--no-headings` on **every** style invocation this
  milestone; STD-02 (`:65`) records that the em-dash rule directly conflicts with ten
  `v1.NN-milestone-audit.mjs` validators, so new prose uses the repo's **tight** em-dash canon, not
  the guide's spacing — and nothing will catch a mistake (`sweep3.py:212` hardcodes `do_em = False`;
  `check.py` cannot gate). **Acceptance assertion:** `sweep3.py` over the three Area C files stays at
  0. `[MEASURED]` full-corpus baseline today: 9 edits / 5 files / 562 pins, **none** in those three.

- **D-48:** **[OWNER-RULED 2026-09-02] Re-stamp `last_verified` / `review_by` on the four documents
  this phase edits only.** `[MEASURED]` RE-222 `2026-08-26`/`2026-10-25`; RE-224
  `2026-07-30`/`2026-10-28`; `licensing-matrix.md` `2026-04-13`/`review_by: 2026-07-12` — **52 days
  past due**; RE-237 `2026-08-31`, about to be materially rewritten. `151-CONTEXT.md:277` sets the
  convention. Owner ruling 4 scoped out a corpus-wide past-due sweep; it does not exempt a file this
  phase rewrites.

- **D-49:** **[OWNER-RULED 2026-09-02] `SEED-002` is closed in this phase's final commit.**
  `[MEASURED]` `.planning/seeds/SEED-002-…md:6` reads `status: planted`, and
  `grep -rn "SEED-002" .planning/{REQUIREMENTS,ROADMAP,STATE}.md` → **zero hits**. Phase 155
  discharges its §A (the six conflicts) and §C (asset placement) in full. HYG-07 exists in this very
  milestone because "a seed that never closes trains the seed-scan to be ignored." Flip to
  `status: closed`, note which sections discharged where, and carry §B and §D to the backlog.

- **D-50:** **[OWNER-RULED 2026-09-02] Phase 155 commits land on `v1.22/154-style-landing`.** Phases
  155–159 stack there and the milestone merges at HARN-06's close push, preserving Phase 154's D-33
  promise that `master` is never touched. Consequence recorded per D-33: the apex is this phase's real
  gate throughout.

- **D-51:** **Ordering constraints forced by mechanism (the plan must honour all five).**
  1. **Assets land in the same commit as, or before, RE-237's link edits** — D-32 makes the link
     checker enforce asset existence, so a link-only commit fails.
  2. **RCP-10 research precedes the RCP-07(c) and RCP-08 edits** (D-44).
  3. **All content commits precede the nav commit** — RCP-02's nav-last convention, satisfied here
     because RE-237's content file already exists at `68c747a9`. State the exception rather than
     leaving RCP-ATOMICITY silently at odds with a milestone-spanning invariant.
  4. **Review → flip → atomic registration** (D-05).
  5. **Apply, gate and commit inside a single tool invocation** where a multi-commit sequence spans
     turns — Phase 154's D-22 Stop-hook hazard (`.claude/settings.local.json` registers two `Stop`
     hooks whose jira sync commits pathspec-scoped) still applies.
  The **wave shape, plan count and estimates are `/gsd-plan-phase`'s to determine**, not this
  document's.

- **D-52:** **Phase 155's prose is a future validator's needle set.** `[MEASURED]` every v1.21
  content-phase leaf was authored in the **closing harness phase** (`check-phase-145.mjs` ←
  `eaae69e3 feat(153-06)`; `check-phase-149.mjs` ← `2468764a feat(153-07)`; `check-phase-151.mjs` ←
  `30700ff1 feat(153-08)`), and no `check-phase-154.mjs` exists. So Phase 159 will author
  `check-phase-155.mjs` against whatever this phase leaves — **after Phase 156 restyles RE-237, RE-222
  and RE-224.** Record which literals are intended to be pinnable, and prefer needles that survive a
  style pass (D-10's own lesson).

- **D-53:** **Phase 156 handoff, both directions.** Forward: Phase 155 rewrites 4 of Phase 156's 13
  batch-10 documents, so Phase 156 must re-measure rather than inherit (VERIFY-01's staleness caveat).
  **Reverse, and unrecorded anywhere until now:** Phase 156 restyles RE-224, whose line count Phase
  155 has just un-pinned (D-10) — its five remaining `V-135-*` content assertions still apply, and
  Phase 156 must know that.

### Claude's Discretion

- Exact wording of the `[PILOT]` pointer sentence in RE-237, provided it does not contradict
  `REQUIREMENTS.md:17`.
- Exact grep needles chosen to replace `V-135-RECIPE`'s equality assertion, provided they survive a
  style pass and the acceptance surface still covers all six `V-135-*` assertions.
- Commit message wording throughout, provided the atomic registration commit's body names the
  vendored upstream SHA and the D-05 amendment cites `c3733928 → f0b7aa90`.
- Whether the `NOTICE` file is one file per tree or one per asset, provided every vendored file's
  origin and pinned SHA are recorded.
- Filenames chosen for the currently-unnamed assets (debug XML, package sources, triage sensor, two
  diagnostics), provided they are derived from the owner-supplied artifacts rather than invented for
  documents that do not exist.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Governing planning documents
- `.planning/ROADMAP.md` — Phase 155's Goal, its 5 Success Criteria, and Phases 156/158 which depend
  on it. **SC#5 is amended by D-05.**
- `.planning/REQUIREMENTS.md` — RCP-01..RCP-10 verbatim (`:49-58`); **`:17` carries the binding
  `[PILOT]` definition** (D-22); STYLE-02 (`:28`), STYLE-04 (`:30`), STYLE-06 (`:32`), VERIFY-01
  (`:38`), VERIFY-04 (`:41`), STD-02 (`:65`), HYG-07 (`:79`), HARN-02/03 (`:84-85`), HARN-05 (`:87`),
  HARN-06 (`:88`). **RCP-04 is amended by D-05; RCP-03's site list is annotated by D-39.**
- `.planning/STATE.md` — the LOCKED named decisions (`:58` RCP-ATOMICITY, RCP-BEFORE-STYLE2,
  DISCUSS-PHASE-FLAGS at `:63`); `:112` the D-00a predecessor-byte-unchanged doctrine; `:137` the
  `-2016281112` research handle; `:156` the EEE-SOP watch note (**not `:135`**, which the draft
  miscited).
- `.planning/seeds/SEED-002-walk-up-avd-kiosk-recipe.md` — the origin seed; §A and §C are discharged
  here, §B and §D go to backlog. Closed by D-49.
- `.planning/phases/154-style-landing-merge-the-verified-google-style-pass/154-CONTEXT.md` — the
  immediately prior phase; D-12 annotate-and-supersede, D-20 commit reviewability, D-21 the
  conflict-marker gate, D-22 the Stop-hook hazard, D-26 the tight em-dash canon, D-33 rollback.

### The documents this phase edits
- `docs/recipes/06-walk-up-avd-kiosk-autologon.md` — RE-237. `:3`/`:13` the two Status sites; `:31`
  claim 2 stated as fact; `:81`/`:106`/`:200` asset provenance; `:94` the self-contradiction; `:117-148`
  the fenced XML; `:209` the ConfigMgr secrets; the 23 blockquotes and their headroom (D-24).
- `docs/recipes/01-shared-windows-avd-client.md` — RE-222. `:78`/`:114` frozen headings; `:101`/`:129`
  the RCP-06 edit sites; **`:133` is out of scope.**
- `docs/recipes/03-windows-11-multi-app-kiosk.md` — RE-224. `:29` RCP-07(c); `:43` the anti-feature
  table header; `:53` the row plus its outbound link; `:107`/`:319` internal Step 6 anchors; `:120`
  Step 5; `:131` the xml fence; `:208` the namespace table; `:225` Step 6; `:245` the data-type cell.
- `docs/reference/licensing-matrix.md` — `:62` the incumbent activation row; `:93` the sole Version
  History row and **no trailing newline**; H2s at `:17,29,50,70,83,89`.
- `docs/index.md` — `:38` the doubly-pinned quick-nav bullet; `:280-284` the recipes table; `:391` the
  Version History precedent.
- `docs/_registry/RE-index.md` — `:9-14` the Status-column vocabulary warning; 236 rows.

### Pipeline and validators
- `scripts/pipeline/build-publish-bundle.mjs` — `:42`/`:306` registry read; `:137-139` the vocabulary
  note; `:141-149` + `:371-380` `checkDivergence`; `:193` the bundle README claim; `:339-345`
  `checkFilenameMapCoverage`; `:363-366` `validateOutputFilename`; canary at `:8,:515,:522,:525`
  (provenance `:520`).
- `scripts/pipeline/build-filename-map.mjs` — `:103-114` `parseRegistry`; `:110` `title: cols[3]`;
  canary at `:274,:284,:285` (provenance `:277`); `:394-397` `--dry-run`.
- `scripts/pipeline/filename-map.md` — 236 rows; regenerated by D-40.
- `scripts/validation/c17-eee-contract.mjs` — `:49` `VALID_STATUSES`; `:81` the `.md` filter;
  `:327-331` assertion #9; `:387-409` assertion #12; `:526` `walkMd('docs')`.
- `scripts/validation/check-phase-135.mjs` — `:49` the constant D-10 retires; `:54`
  `countTableDataRows`; `:104-119` `V-135-RECIPE01ZEROEDIT`.
- `scripts/validation/check-phase-130.mjs` — `:57-72` `V-130-KIOSKFORK`.
- `scripts/validation/check-phase-132.mjs` — `:44-58` `V-132-REGISTRY`, the registration-time
  `Approved` precedent.
- `scripts/validation/check-phase-137.mjs` — `:44-50` `V-137-BULLET` and the table-row assertions.
- `scripts/validation/check-phase-152.mjs` — `:107,:134` `V-152-MASTERHUB-QUICKNAV`; `:108`,
  `:215-227` `V-152-FILENAMEMAP`; the nav-wiring precedent.
- `scripts/validation/check-phase-143.mjs` — `:78-92` `V-143-CORPUSRUN`, the apex's link-checker leg.
- `scripts/validation/check-phase-54.mjs` — `:30` the live `REQUIREMENTS.md` read; `:347` `V-54-21`;
  `:462` `V-54-27`. D-08's rider.
- `scripts/validation/check-nav-hub-links.mjs` — `:10-16` the `{#id}` note; `:219-233` `extractLinks`
  and its code-span mask; `:273-302` `checkInboundLinks`.
- `scripts/validation/check-phase-153.mjs` — the current apex; `:151` the chain span.

### Style tooling
- `.claude/skills/google-style-verify/SKILL.md` — `:114` the protected-signal list D-25 extends.
- `scripts/docs-style/_CONTENT-PINS.txt` — 562 pins, zero `ASSUMED`/`PILOT` entries (D-25).
- `scripts/docs-style/sweep3.py` — `:212` `do_em = False`; D-47's acceptance instrument.

### Precedent
- `.planning/milestones/v1.21-phases/152-…/152-CONTEXT.md` — D-10 registry Status forced by mechanism;
  D-17 canary site counting; D-18 append-provenance-never-edit; D-19 compute-never-transcribe; D-21
  the allocation-ceiling step.
- `.planning/milestones/v1.21-phases/151-…/151-CONTEXT.md:277-278` — D-47 the re-stamp convention;
  **D-48**, superseded by D-12.
- `.planning/milestones/v1.21-phases/151-…/151-05-SUMMARY.md:450` — the grep-needles-over-line-counts
  recommendation D-10 adopts.
- `.planning/milestones/v1.20-GOV-02-LEDGER.md:64` — Phase 143 D-29, annotate-and-supersede.
- Commits `c3733928` and `f0b7aa90` — the flip-then-register precedent (D-06).

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- **Phase 152's registration shape** (`f0b7aa90`) is a directly reusable four-file commit template:
  registry row + regenerated `filename-map.md` + both canaries, with nav in a following commit.
- **`build-filename-map.mjs --dry-run`** (`:394-397`) gives a safe collision/diff preview; D-41 has
  already run it for row 237.
- **`_DISPOSITIONS-docs.tsv`** (created in Phase 154 for `verify-meaning.py`'s main-repo geometry) is
  the sibling-file pattern to imitate if this phase needs its own dispositions.
- **`git check-ignore -v`** is the negative control D-32 requires; no new tooling needed.

### Established Patterns
- **Two-commit promotion** — register and promote are never the same commit (137, 152). D-05 keeps the
  split and only reverses the order.
- **Annotate-and-supersede** for planning-document amendments (141 D-27, 143 D-29, 154 D-12) — never
  amend history in place, never delete the superseded wording.
- **Append-provenance-never-edit** for canary comments (152 D-18).
- **Nav-last** — nav-hub edits come after the content they point at exists.
- **Content phases author no validator** — the closing harness phase does (D-52).
- **`[MEASURED]` rows carry the command that produced them**, so they are re-derivable rather than
  asserted.

### Integration Points
- The atomic registration commit touches `docs/_registry/RE-index.md`, `docs/index.md`,
  `scripts/pipeline/filename-map.md`, `scripts/pipeline/build-filename-map.mjs` and
  `scripts/pipeline/build-publish-bundle.mjs` together.
- `assets/recipes/06-walk-up-avd-kiosk/` is a **new top-level tree** — invisible to C17, the bundle,
  `verify2.py` and the registry; reachable only through RE-237's links (D-32) and the D-31 provenance
  section.
- `check-phase-135.mjs` is the one predecessor validator this phase edits (D-10, D-13).

</code_context>

<specifics>
## Specific Ideas

- The owner ratified all four primary recommendations and all seven follow-ups without amendment,
  including the two that **reversed** the discussion draft (D-05's ordering and D-10's pin
  disposition).
- The bar set for RE-237's claims: a pilot observation is never promoted to a sourced mechanism, and
  an untested prescription is never labelled as an observation (D-44, D-45).
- Fabricating asset contents is explicitly prohibited (D-27) — the recipe's authority rests on being
  field-validated, and an agent that never saw the device cannot supply that.

</specifics>

<deferred>
## Deferred Ideas

- **A corpus-wide evidence-label taxonomy** (`[SOURCED]` / `[ASSUMED]` / `[UNVERIFIED]` / `[PILOT]`
  defined in one place, in `docs/`) — Phase 157 (STD pillar). `[ASSUMED]` is used 16 times across the
  corpus and defined nowhere; this phase only ensures `[PILOT]` points at its binding definition.
- **A `LICENSE` file for the repository** — project-level, outside RCP-09; D-34 works around its
  absence with per-asset attribution.
- **A merge-marker / conflict gate as a standing validator** — Phase 154 proved C17 is blind to
  conflict markers; still no validator covers it.
- **`V-132-HUBSNOTWIRED` / `V-137-HUBSNOTWIRED` regex repair** — neither matches a relative
  `recipes/06-` link (D-20); the carried backlog item `V-132-HUBSNOTWIRED-REGEX-BROKEN`.
- **`.gitattributes * text=auto eol=lf`** — already deferred to Phase 159 by Phase 154.
- **SEED-002 §B** — the L2 "kiosk popup blocked by your system administrator" triage runbook; the
  Windows App child-process allow-list as a reference row; Credential Guard / CredSSP saved-credential
  behaviour; Intune Remote Help unattended control.
- **SEED-002 §D** — the kiosk-class licensing/hardware standard (MAK vs IoT Enterprise); AVD host-pool
  Entra SSO (`enablerdsaadauth`); the STORIS SCiX ClickOnce kiosk.
- **`CLAUDE.md:305` "Project Structure"** goes stale when `assets/` is founded; no validator pins it.
- **A fenced-block ↔ file byte-equality check** for duplicated payloads (D-36 applies it once here;
  generalizing it is future work).

</deferred>

---

*Phase: 155-rcp-walk-up-avd-kiosk-recipe-formalization*
*Context gathered: 2026-09-02*
