# Phase 147: Linux Update Delivery - Context

**Gathered:** 2026-08-20
**Status:** Ready for planning

<domain>
## Phase Boundary

`docs/operations/patch-management/05-linux-update-delivery.md` is authored as the fifth per-platform
update guide (LNX-01..LNX-04) — the honest capability statement, the Bash platform-script delivery
mechanism, the root-context execution hazard, `unattended-upgrades` configuration, reboot handling,
and Ubuntu Pro / Livepatch as a Canonical-side entitlement. `00-overview.md` is touched for the third
of four times, for routing plus the Linux column plus the D-73 correction inherited from Phase 146.

**Not this phase:** the Autopatch and app-update guides (148), the firmware/BIOS domain (149–150),
recipe #5 (151), **any registry row, filename-map row, canary bump, ops-index row or nav-hub wiring**
(152, one atomic commit), the harness close (153). No edits to `docs/admin-setup-linux/`, to
`docs/reference/linux-capability-matrix.md`, or to `06-windows-driver-firmware-updates.md`.

</domain>

<decisions>
## Implementation Decisions

Produced by `/grill-me` (30 sub-questions expanded from the 4 selected gray areas) then adjudicated by
`/adversarial-review` (5 parallel Finders → Adversary → Referee). 115 raw findings, 106 after dedup,
**18 disproved, 87 confirmed** — 16 CRITICAL / 39 MEDIUM / 32 LOW. The Referee demoted 15 findings,
**promoted 2**, and corrected figures inside several confirmed findings. The draft's picks fared badly:
three `[MEASURED]`-labelled rows were fabricated, and the entire sourcing area rested on facts that are
false at the byte level.

Every `[MEASURED]` figure below was re-executed at HEAD `f132e4d0` by at least two independent agents.
Figures a later pass corrected carry `[CORRECTED]`. **All byte offsets, line numbers and hit maps are
to be re-measured at plan time, never transcribed** — Phase 146's coordinates went stale *inside Phase
146 itself*, shifted +2 by a commit two later.

### HEAD baselines — carry into the PLAN

`check-phase-54` **32/0/0** · `v1.20-milestone-audit` **16/0** · `check-nav-hub-links` **0/0** ·
`c17-eee-contract` **234/0** · `check-phase-50` **26/0/0** · apex `check-phase-144` **101/0/0** ·
`build-filename-map --self-test` **8/0** (225 rows) · `build-publish-bundle --self-test` **15/0**
(225 Approved).

- **D-05:** `[MEASURED]` **`check-phase-144` IS the apex.** `ls scripts/validation/ | grep -E "14[5-9]"`
  returns nothing — Phases 145 and 146 authored no validator. Do not look for a later apex.

### Owner rulings

- **D-01:** **[OWNER-RULED 2026-08-20]** **The guide is Ubuntu-scoped, and says so openly.** It names
  RHEL 9 / RHEL 10 as Intune-supported, then states plainly that every delivery mechanism documented
  here is apt-family and that the RHEL equivalents are out of scope with no first-party Intune source.
  `[MEASURED]` `grep -rn "dnf-automatic\|yum-cron" .planning/research/ docs/` = **0 hits repo-wide**;
  `unattended-upgrades` = **1 hit** in `docs/`, in a Debian-family alternatives list. Without this
  ruling the guide ships false coverage on the majority of the surface it claims. The scope sentence is
  mandatory, not optional — it is what converts a silent gap into a documented one.
  — **Reversibility:** reversible — a later phase can add a sourced RHEL section additively.
- **D-02:** **[OWNER-RULED 2026-08-20]** **`/var/run/reboot-required` needs a different first-party
  source, and the phase escalates rather than asserts.** `[MEASURED]` on the page the research cites
  (`ubuntu.com/server/docs/how-to/software/automatic-updates/`, retrieved as source bytes, 28,823
  bytes) the path occurs **once, at line 346, inside a sample log line** —
  `2025-03-13 20:43:40,201 WARNING Found /var/run/reboot-required, rebooting`. The page never defines
  its semantics and never presents it as a state to read. Research the `update-notifier` documentation,
  the `unattended-upgrades` man page, or Debian/Ubuntu release notes. **If no first-party page
  documents it as a readable state, escalate to the owner — do not ship an unsourced assertion and do
  not ship the log line as though it were a specification.**
  — **Reversibility:** one-way — a fabricated or mis-sourced LNX-03 claim is a close-gate failure
  discovered late, and LNX-03 mandates the path by name.
- **D-03:** **[OWNER-RULED 2026-08-20]** **Phase 147 carries a full research pass.** Respawn
  `gsd-phase-researcher` for a bounded fetch. This resolves a live contradiction in the record —
  `ROADMAP.md:127` says *"no external research pass"* while `146-CONTEXT.md` D-73 says Phase 147
  *"carries its own research pass"*. `[MEASURED]` the draft's contrary instruction was inverted against
  its own precedent: `146-RESEARCH.md` exists and `146-VERIFICATION.md` records `pages_fetched: 8`,
  `verbatim_strings_diffed: 36`. Phase 146 respawned the researcher. Scope of the pass is D-06.
- **D-04:** **[OWNER-RULED 2026-08-20]** **Three requirement-text corrections land with
  `**[OWNER-RULED IN SCOPE 2026-08-20]**` markers in `REQUIREMENTS.md`**, not merely as CONTEXT notes.
  Repo practice for exactly this instrument is `REQUIREMENTS.md:46` (DRV-06). The three are the LNX-01
  Conditional-Access narrowing (D-30), the Phase-146 D-73 correction (D-31), and the `PITFALLS.md`
  misattributed citation (D-32).

### The research pass — scope and method

- **D-06:** The pass fetches exactly these, and records a query trail for each — (a) the Canonical
  automatic-updates page, **as source bytes**; (b) `ubuntu.com/pro`; (c) a first-party source for
  `/var/run/reboot-required` per D-02; (d) the Microsoft Learn source D-73 needs for the driver-deferral
  correction; (e) `ref-supported-platforms` for the distro list. It is a bounded re-fetch plus one new
  search, not an open-ended domain sweep.
- **D-07:** **Retrieve source bytes, never a summarizing fetcher, wherever a repo backs the page.**
  `[MEASURED]` the Canonical docs live at `repos/canonical/ubuntu-server-documentation`, path
  `docs/how-to/software/automatic-updates.md`, reachable via `gh api`. This is not a preference —
  **two WebFetches of the same URL in one session returned contradictory answers** about whether
  `Automatic-Reboot "false";` appears on the page; only byte retrieval settled it. Phase 146's sourcing
  was trustworthy for exactly this reason (`146-RESEARCH.md` — *"six of eight pages were retrieved as
  source markdown bytes … not through a summarizing fetcher"*).
- **D-08:** `[CORRECTED]` **the Canonical page does expose a date, and the invented citation shape is
  withdrawn.** The draft built a new `**Source:**` form on `SUMMARY.md:431`'s *"no date exposed"*. That
  is true only of the rendered page. `[MEASURED]` `gh api` on the backing repo's commit history for
  that path returns **2026-07-15**. Use the corpus's existing dated form. **145 D-01 governs and is on
  point** — *"Evidence lines use the convention that already exists in the corpus. Do not invent an
  inline parenthetical."* `[MEASURED]` all **82** `**Source:**` lines in `docs/` carry a date.
- **D-09:** For a genuinely undated source, the corpus already models the absence case one file over —
  `docs/operations/patch-management/02-macos-update-enforcement.md:27` keeps the dated field and states
  the absence in a trailing clause. Reuse that shape. Do not coin a fourth.
- **D-10:** `[MEASURED]` **the strongest non-Microsoft precedent goes uncited by the draft** —
  `docs/operations/patch-management/04-android-patch-delivery.md:75` is a **solo, load-bearing Google
  citation** with a date. Vendor-first-party sourcing is settled corpus practice; a Canonical page is
  first-party for Ubuntu. Cite that precedent, not the weaker External-References one.
- **D-11:** `[CORRECTED]` **do not delete FEATURES D-3's `[PREMISE]` label as "the wrong authority".**
  The label was **correct** — the substitute authority carries one of its three facts (D-02, D-12,
  D-13). If it is discharged, use `FEATURES.md:321`'s own sanctioned mechanism (*"If a reason lapses at
  plan time, the row moves up"*) and record that a Canonical page makes the stated reason *irrelevant*,
  not *lapsed*. That distinction is an owner-level judgement, and the draft asserted it unilaterally.
- **D-12:** `[MEASURED]` **`Automatic-Reboot "true"` does not exist on the cited page.** Line 328 is
  `Unattended-Upgrade::Automatic-Reboot "false";` with prose *"If this option is set to `true`… The
  default value is `false`."* The only `"true"` assignment is a **different key**,
  `Automatic-Reboot-WithUsers "true";` at line 329. The claim is recoverable by rewording — *"set
  `Unattended-Upgrade::Automatic-Reboot` to `true`; Canonical documents the default as `false`"* —
  which the page fully supports. **Never ship the draft's original string as a verbatim quote.**
- **D-13:** `[MEASURED]` **`update-notifier-common` is absent from that page** (0 occurrences), and the
  page carries a same-prefix **decoy** — `update-notifier` at line 435, which is the graphical
  postpone-prompt client, a different subject. A grep for `update-notifier` returns a hit and invites
  false confirmation. `PITFALLS.md:541` cites this page for the claim; that citation is wrong (D-32).
- **D-14:** `[MEASURED]` **the page carries THREE near-identical `Allowed-Origins` blocks** — the
  default at lines 85-98, and modified examples at 107-119 and 131-145 in which
  `"${distro_id}:${distro_codename}-updates";` is **uncommented** (the third also adds a PPA).
  **Pin the default block by its preamble** *"This is the default:"* (line 82). Quoting the wrong block
  ships a first-party quote that **inverts LNX-03's central claim while passing a naive verbatim diff**
  — the failure mode no gate in this repo can catch.
  — **Reversibility:** one-way — an inverted LNX-03 that survives verification is a shipped falsehood.
- **D-15:** `[MEASURED]` **the Ubuntu 26.04 floor has no Canonical backing on that page** — `26.04` = 0
  occurrences; the page uses `noble` (24.04) throughout every example and log excerpt, and names
  `24.04` on six lines. Scope every `unattended-upgrades` quote as *"as documented for 24.04
  (`noble`)"*. The corpus's supported list foregrounds 26.04, so the guide would otherwise read as
  though Canonical validated 26.04 behaviour.
- **D-16:** `[MEASURED]` **`ubuntu.com/pro` does not carry `sudo pro attach`.** `STACK.md:478`
  designates that page as the verification target for it, so the target cannot discharge the claim.
  Name a second Canonical target (the Ubuntu Pro documentation site) or drop the command. Do not drop
  it merely because the wrong page was named.
- **D-17:** `[MEASURED]` **the live Ubuntu Pro figures are incomplete rather than wrong, and the
  artifact should be corrected rather than the numbers merely omitted.** Live: *"free for personal use
  on up to **5 physical machines**, or **50 machines** for official Ubuntu Community members"*; and ESM
  *"extends … from **5 years** … to **10 years** for the entire Ubuntu Archive"* plus a **15-year**
  Legacy add-on tier. `STACK.md:478` says "5 machines" and "ESM provides 10 years". Ship only
  re-verified figures per LNX-04, and flag `STACK.md:478` for correction so the artifact stops being
  wrong for every future phase that reads it.
- **D-18:** LNX-04's structural claim needs **no figure at all** and is what must survive: Livepatch
  and ESM are Canonical-side subscription entitlements entirely outside Intune's control plane,
  verifiable only via a custom compliance script. `[MEASURED]` `livepatch` = 0 corpus occurrences.
- **D-19:** `[CORRECTED]` **the block-and-escalate rule is a three-way split, not the draft's binary.**
  `ROADMAP.md` SC#3 says only *"reboot-required detection"* — the path is named in LNX-03, not in the
  phase gate, so the gate is **looser** than the requirement. SC#4 mandates that Livepatch **is
  documented** and scopes the omission escape hatch to **figures only**. So: LNX-03's presence
  obligations block (D-02); LNX-04's *structural* obligation blocks; LNX-04's *figures* may be omitted
  without blocking. Carry 146 D-50's discipline otherwise — a different first-party page carrying the
  claim is the only permitted alternative, never an unsourced assertion.
- **D-20:** `[MEASURED]` **no validator parses the evidence-line marker — the entire sourcing
  contract is human-only.** `grep -rn "Source:" scripts/` = 0. This is why D-12, D-13 and D-14 would have survived
  every gate the phase runs. The verifier re-fetches the named pages and diffs the quoted strings
  (145's precedent — 7 live URLs, zero fabrications); write that contract into the PLAN, and tell the
  verifier which sources are Microsoft (carrying `ms.date`) and which are Canonical, so a shape
  difference is not read as a fabrication.
- **D-21:** `[MEASURED]` **the evidence line's SCOPE rule is as load-bearing as its shape, and the
  draft carried only the shape.** `146-REVIEW.md` WR-01 found `01`'s new Source line scoped to a whole
  mitigation list rather than to the claim it was authored for, *"lend[ing] first-party authority to an
  unsourced claim"*. `146-PATTERNS.md` §2 codifies the fix — **own paragraph, standalone, after the
  claim**. One Source line may cover one blockquote of contiguous quotes from one page; it may never
  span claims from different pages.

### The guide's shape — H2 skeleton

- **D-22:** `[NEW — the draft specified none]` **The H2 skeleton, mapped to requirements.** Phase 146
  fixed all ten of `06`'s H2s before a line was authored (146 D-37) and `06` shipped exactly those;
  the 147 draft named one, which left LNX-02's hazard and the reboot signal with nowhere to live.

  ```
  ## What Intune Can and Cannot Do for Linux Updates    LNX-01 (the honest statement)
  ## Deferral, Enforcement and Attestation for Linux    LNX-01 (the triad mapping)
  ## Delivering Updates with a Bash Platform Script     LNX-01 + LNX-02 (Root/frequency pair INLINE)
  ## Configuring unattended-upgrades                    LNX-03 (the four origins)
  ## Reboot Handling                                    LNX-03 (reboot detection + the reboot pair)
  ## Ubuntu Pro and Livepatch                           LNX-04
  ## Compliance and Conditional Access                  LNX-01 + LNX-04 + the 5-minute quarantine
  ## Unsupported and Anti-Feature Callouts              LNX-02 first entry
  ## Related Resources
  ## External References
  ```

  American spelling throughout (146 D-39 — `[MEASURED]` `behaviour` = 4 occurrences against 216
  `behavior`, and zero British-spelled headings exist). H2 names are Claude's discretion **except**
  `## Unsupported and Anti-Feature Callouts`, which is the pinned corpus literal (D-25).
- **D-23:** `[MEASURED]` **the guide carries no code fences.** All six `docs/operations/patch-management`
  files have **zero** fences; only 3 of 21 `docs/operations/*.md` files carry any. Ship configuration
  as prose, settings tables and `>` blockquotes. The verbatim `Allowed-Origins` block is **not** an
  exception — `STACK.md:474` renders all four origins as inline code inside a table row, and 146 D-53's
  contract is a blockquote plus a Source line. The bar is on a copy-pasteable root `apt upgrade`
  script, not on quoted configuration.
- **D-24:** **No runnable `apt upgrade` script body.** `docs/admin-setup-linux/04-app-delivery.md:59`
  already carries the corpus's supply-chain callout that Bash scripts run elevated and orgs must verify
  provenance. A copy-pasteable root-context upgrade script inside the guide whose primary pitfall is
  "people ship exactly this, carelessly" is self-inflicted. A prescriptive artifact, if ever wanted,
  belongs to Recipe #5 (Phase 151).
- **D-25:** Absences use `## Unsupported and Anti-Feature Callouts`. `[MEASURED, CORRECTED]` it exists
  in **six** files, not the draft's five — the four recipes, `docs/_templates/recipe-template.md:98`,
  **and `06-windows-driver-firmware-updates.md:664`**, which is the only `docs/operations/` instance and
  the closest precedent by directory and doc class. `grep -rn "^## .*Limitation\|^## .*Absence" docs/`
  = 0.
- **D-26:** **No new `PITFALL-N` identifier.** `[CORRECTED]` the inherited 146 D-41 rationale is
  **false** — `[MEASURED]` `check-phase-49.mjs:288` (`V-49-19`) is a *positive* collision audit, not a
  negative guard, and no validator matches a `PITFALL-N` identifier against any file, so minting one
  would trip nothing. The correct reason is narrower: **the identifier namespace is a per-milestone
  research-ledger and is not this guide's to extend.** Use bold sub-labels — precedent
  `01-windows-wufb-rings.md:184`, `**Dual-scan source conflict pitfall:**`.
- **D-27:** **No `## Version History`.** `[MEASURED, CORRECTED]` the directory holds **six** `.md` files,
  not five; none carries one. Domain convention wins. INT-04's Version-History row in
  `docs/operations/00-index.md` is separately Phase 152's.
- **D-28:** **No diagram and no decision tree.** `[CORRECTED]` the draft's C17 rationale is **inert** —
  `[MEASURED]` `05-` can never be C17-enrolled (enrollment requires a `doc_id`; zero
  `docs/operations/` files carry one; ROADMAP Phase 152 SC#3 makes that permanent), so the Mermaid
  argument does not apply. The surviving reason is that re-entering the SVG regeneration pipeline for
  an artifact FEATURES does not request is unbudgeted. `[MEASURED]`
  `docs/decision-trees/09-linux-triage.md` carries **zero** update content, so its existence is not
  evidence either way.
- **D-29:** **`05-` carries a platform-applicability blockquote** using the full lexicon form, never
  the bare one.
  `[MEASURED]` nothing *forces* it — `V-54-26` binds only the five hardcoded `PATCH_FILES` and `05-` is
  outside them — but `146-PATTERNS.md` §1 makes it part of the sibling shape and all six existing files
  carry one. It routes to `00-overview.md` and to the Linux admin-setup tree. **The full lexicon is
  mandatory**: `V-54-27` is a corpus-wide negative on a line-start `> **Platform:**` walking `docs/`
  **and** `.planning/`, so it binds this CONTEXT file and every plan file too.

### Requirement-text corrections (D-04)

- **D-30:** **LNX-01's Conditional-Access lever is narrowed to the corpus's ratified position.**
  `[MEASURED]` `docs/_glossary-linux.md` — *"Device-level CA grants … are NOT available for Linux"*;
  `docs/reference/linux-capability-matrix.md` carries the literal `Not supported — web-app CA only`
  pinned by `V-50-15` (U+2014 em-dash, byte-exact). The lever gates **web access to Entra-protected
  applications** via Microsoft Edge for Linux 102.x+, not device access. This makes LNX-01's
  "attestation, not enforcement" strictly **stronger**. `[CORRECTED]` the draft's companion rule *"coin
  no Device-Level CA framing anywhere"* is **withdrawn** — it has no validator behind it (`V-50-24` is
  one exact H2 in one file) and the corpus already uses the phrase in prose on **11 lines across 6
  files**. The guide may and should use it; what it must not do is create a Device-Level CA **H2** in
  `docs/admin-setup-linux/05-conditional-access.md`, which 147 does not edit anyway.
- **D-31:** **The Phase-146 D-73 correction lands here as a fifth `00-overview.md` edit site.**
  `146-CONTEXT.md` D-73 is `[OWNER-RULED 2026-08-19]` and deferred it explicitly to Phase 147; no other
  phase owns it. `[MEASURED]` the defect is live — `00-overview.md:87` reads *"the 0–30 day deferral
  are set per deployment ring"*, and the deferral belongs to the **driver policy**. It earns a
  **sourced** correction (a Microsoft Learn citation, per D-06(d)), not a drive-by edit.
- **D-32:** **The misattributed Canonical citation in the pitfalls research file is corrected in this
  phase.** `PITFALLS.md:541` credits the
  Canonical automatic-updates page for `update-notifier-common`, which is absent from it (D-13). This
  is the same defect class Phase 145 corrected in FEATURES D-2. Correcting it in-phase stops the
  misattribution propagating to every future phase that reads the artifact.

### `00-overview.md` — the fifth column and the prose

- **D-33:** `[REVERSED — the draft's most emphatic rule was fabricated]` **`V-54-08` is NOT
  order-sensitive.** `[MEASURED]` five live probes — Linux appended last, inserted before Android,
  inserted first, after Windows, between macOS and iOS — **all returned 32/0/0**. The `[^\n]*` gaps
  absorb any inserted cell; the regex breaks only if the existing four literals are *reordered*, which
  inserting never does. The check has **four** acceptance paths, not the two the draft read. **Append
  Linux as the last column** on editorial grounds and because `docs/reference/4-platform-capability-comparison.md`
  does exactly that — not because any other position is barred.
- **D-34:** `[MEASURED — this is the real constraint, and the draft ruled it out]` **Every table row
  must stay on one physical line.** `V-54-29`'s strip is `/^\|.*\|.*$/gm`, per **physical** line, and
  `V-54-08` matches with `[^\n]*`. Probe: re-wrapping the Hotpatch/EOL row onto two lines →
  `V-54-29 FAIL` (31/1); re-wrapping the header row → `V-54-08 FAIL` (31/1). `00-overview.md` wraps
  prose at ~95 columns and a sixth column pushes the Enforcement row past **380 characters**, so
  wrapping is the natural author move and the failure is silent until the validator runs. This is the
  mid-execution remediation round `REQUIREMENTS.md:133` predicts.
  — **Reversibility:** reversible, but only if caught — the failure is invisible on inspection.
- **D-35:** The five Linux cells, using the table's own parenthetical convention for absent
  capabilities (the Android Deferral cell already reads `(No tenant-side deferral; Google Play handles)`):
  Cadence model → distro-native `apt` + `unattended-upgrades`, no Intune orchestration; Deferral →
  `(No Intune-side deferral; distro-native only)`; Enforcement primitive → `(None — compliance policy
  + web-app CA is attestation only)`; Hotpatch/EOL surface → Livepatch via Ubuntu Pro (Canonical-side
  entitlement); Hard deadline → `(no hard deadline)`. `[MEASURED]` `V-54-29` strips table rows before
  testing its banned set, and `Livepatch` neither is nor contains `Hotpatch`, so the cells are safe.
  **The same parenthetical form is fatal in `linux-capability-matrix.md`** — see D-41.
- **D-36:** `[MEASURED]` **`V-54-26` pins the exact string the blockquote edit touches** and the draft
  never named it. It requires the literal `> **Platform applicability:**` inside the first 50 body
  lines of every `PATCH_FILES` entry; a probe rewording the lead-in to `> **Platform applicability
  (five platforms):**` → `V-54-26 FAIL`, 31/1. **Add the Linux line; never touch the lead-in.**
  Q1.3's constraint list omitted both `V-54-26` and `V-54-29` — the two negatives most exposed here.
- **D-37:** `[CORRECTED]` **the `four`-token map, re-measured.** Real hits are at `:39, :40, :46, :59`
  (all in `## Cross-Platform Comparison`), `:168` (the Routing **post**amble, not the preamble), and
  `:175, :184` (in `## Cross-Platform Planning Considerations`). The draft named three sites carrying
  **zero** `four` tokens and missed two real ones; its count matched 7-for-7 by coincidence. Re-measure
  before editing.
- **D-38:** **The overview's prose becomes five-platform.** `[MEASURED]` no validator pins the word
  "four" anywhere in the file, and the corpus's own 4→5 precedent is
  `docs/reference/4-platform-capability-comparison.md` (RE-143) — **filename kept, H1 retitled to
  `# 5-Platform Capability Comparison: Windows, macOS, iOS/iPadOS, Android, Linux`**, Linux last. A
  probe rewriting all seven `four` tokens plus the column-order sentence and blockquote lead-in list
  returned 54: 32/0/0, audit 16/0, nav 0/0. Note that the three **largest** four-platform assertions
  carry no `four` token at all — the Platform-applicability blockquote, the H1 intro, and the four
  bullets of `## Cross-Platform Planning Considerations`.
- **D-39:** **Six edit sites in `00-overview.md`, not the draft's four.** (1) a Linux line in the
  Platform-applicability blockquote; (2) the Linux column; (3) a routing bullet; (4) a Related
  Resources entry; (5) a Linux clause in the Attestation bullet's `Examples:` list; (6) the D-73
  correction (D-31). Plus the D-37/D-38 prose sweep. `[MEASURED]` the Related Resources list is
  ordered **01, 06, 02, 03, 04** — non-numeric — so the insertion point for `05-` is a judgement call,
  not an obvious append.
- **D-40:** **The overview's frontmatter platform value stays `cross-platform`, and Linux is never
  added.**
  Locked by `ROADMAP.md:126`, not a decision. `[MEASURED]` a second, looser pin exists and is worth
  knowing — `V-54-31` tests the same field **unanchored**, so a value like `cross-platform, Linux`
  would pass `V-54-31` and fail `V-54-07`, a split-failure shape.

### Delta versus re-author

- **D-41:** **No edit to `docs/reference/linux-capability-matrix.md`.** `[CORRECTED]` the reasoning,
  not the ruling. `[MEASURED]` `V-50-14` is presence-only so an added H2 would be safe; a *compliant*
  row edit is entirely free (probe: `check-phase-50` 26/0, `c17` 234/0). Two real hazards the draft
  missed — `V-50-16`'s `VALID_STATUS` is a **prefix** match (`/^(Supported|Partial|Not supported)/`),
  so **D-35's parenthetical cell form fails here** (probe → `V-50-16 FAIL`, 25/1); and the
  `> **Table summary:**` blockquote sits at **195 characters against C17 #12's 200-character cap** —
  a five-character margin, so a planner who "fixes" the stale count by rewording reddens C17 (probe at
  215 chars → `234 files checked, 1 with violations`). The ruling stands on editorial grounds: the
  matrix already says what LNX-01 says.
- **D-42:** **No edits to `docs/admin-setup-linux/`.** `[CORRECTED]` the stated cost was wrong —
  `[MEASURED]` `V-50-25` computes `(review_by − last_verified)` and **never reads today's date**, so a
  body-only edit costs nothing. The real reasons are scope discipline (inbound links are Phase 152's)
  and `check-phase-50`'s pin density. `[MEASURED, CORRECTED]` `ADMIN_FILES` is **six admin files plus
  `docs/reference/linux-capability-matrix.md`** — so `V-50-25` binds the matrix too, which D-41's
  ruling never drew. Only `:273`'s `readAtV114Close` is a frozen read; the other 26 read live.
- **D-43:** `[NEW]` **`LIN-DEFER-01` must be dispositioned, and the draft never asked.** `[MEASURED]`
  `docs/admin-setup-linux/04-app-delivery.md:104` — *"(v1.5.1 LIN-DEFER-01) Bash custom-compliance
  deep-dive — **when shipped, will cross-link here**"*; also `:78` and
  `03-compliance-policy.md:86`. The corpus has a **standing promise** of an inbound link to the
  Bash-script deep-dive. Phase 147's guide is adjacent to but not identical with that deferral. Rule
  explicitly at plan time: **147 does not discharge LIN-DEFER-01** (it is an update guide, not a
  custom-compliance deep-dive) and the promise stays open — or escalate. Do not leave it unstated.
- **D-44:** `[CORRECTED — delta item was false]` **The platform-script mechanism is already documented
  and must be cross-linked, not re-authored.** `[MEASURED]`
  `docs/admin-setup-linux/04-app-delivery.md:41-62` documents the mechanism end to end, `:54` carries
  *"Script runs `apt update && apt install <package>`"*, and `:68-77` is a complete runnable fenced
  Bash body. The genuine delta is **root execution context, execution frequency, and
  `unattended-upgrades` configuration** — not the delivery mechanism itself.
- **D-45:** `[NEW]` **A declared SSoT firewall governs the compliance content this guide needs.**
  `[MEASURED]` `docs/quick-ref-l2.md:398` — *"⚠️ **Bash discovery script authoring,
  compliance-evaluation cadence, and per-category remediation playbooks are owned by [Phase 50 SSoT —
  Linux Compliance Policy]**"*; `:366` names it the PITFALL-7 firewall. `05-`'s
  `## Compliance and Conditional Access` section is **pointer-only** for script authoring and cadence;
  it may state *what signal to read* (D-02) and *what the ceiling is*, but not *how to author the
  script*. No validator enforces this.
- **D-46:** `[NEW]` **Decide whether `05-` contradicts the reference layer it cites — this is the
  question that decides D-41.** `[MEASURED]`
  `docs/reference/4-platform-capability-comparison.md` marks all seven Linux update rows
  `Not supported`, including *"Update management mechanism"*, and `linux-capability-matrix.md` reads
  *"Not supported — Intune does not orchestrate apt updates"*. LNX-01 mandates that `05-` name a Bash
  platform script as **the mechanism**. The reconciliation is real and must be stated in the guide:
  **Intune does not *orchestrate* Linux updates; it *delivers a script* that does.** If that sentence
  cannot be written without contradicting the matrices, D-41's "no edit" is wrong and must be revisited.
- **D-47:** **No glossary edits.** `[CORRECTED]` the C10 reason is falsified — `[MEASURED]` C10
  computes an interval and never reads today's date; a probe appending a `### Livepatch` entry with
  frontmatter untouched returned audit 16/0, c17 234/0, nav 0/0. The real reasons are that no v1.21
  requirement covers glossary additions, that `docs/_glossary-linux.md` is C17-enrolled (`RE-181`) so a
  new entry inherits C17's assertions, and that `## Alphabetical Index` imposes maintenance. **But
  `PROJECT.md:31` names `unattended-upgrades` as terminology this milestone adds** — so the deferral
  leaves that scope statement stale and unassigned. Record it as a deferred idea, do not ignore it.
  `[CORRECTED]` PROJECT.md's "flips six currently-green workflows red" is **overstated** — of 16 audit
  scripts defining `linuxDocPaths`, **15 read from a frozen Map and only `v1.20` reads live**, so at
  most one C10 can move.
- **D-48:** **`05-` links to `00-`, the Linux admin-setup tree, both reference matrices and the
  glossary. It does not link to `06-`, and `06-` is not edited.** `[CORRECTED]` the mechanism — there
  is **no "forward link" concept** in the checker, only target existence. `[MEASURED]` a probe `05-`
  linking `07-windows-autopatch.md` gives *"target file not found"*, 1 corpus-link failure, while links
  to `06-` and to a `00-` anchor both **passed**. So the rule is simply *do not link to files that do
  not exist yet* — no links to `07-`/`08-` (148) or the firmware/BIOS guides (149/150). The `05 ↛ 06`
  choice is editorial: driver/firmware is a Windows surface with no Linux analog.
- **D-49:** `[NEW]` **The sibling routing blockquotes go stale, and that is knowingly accepted.**
  `[MEASURED, CORRECTED]` **four** files — `01`, `02`, `03`, `04` — each open with a
  `> **Platform applicability:**` blockquote enumerating the *other three* platform siblings (`06`
  carries no platform enumeration). When `05-` lands, all four silently omit Linux. The roadmap's blast
  radius locks edits to `00-` only, so not editing them is correct — **but record it here as an
  accepted inconsistency** so the verifier and code review do not surface it as a new defect.

### The root-context hazard (LNX-02)

- **D-50:** **LNX-02 lands in two places, and the pair is not split.** The **Root-versus-User trade-off
  with the frequency consequence in the same breath** lives inline in
  `## Delivering Updates with a Bash Platform Script` — that is where it prevents the error. The full
  treatment with the fleet-wide consequence is the **first** bold sub-label under
  `## Unsupported and Anti-Feature Callouts`. `[CORRECTED]` the draft fused "Root-vs-User" and
  "Root/frequency" into one thing; `PITFALLS.md:554` item (b) has two distinct elements — the *pair* is
  Root-versus-User, and the *same breath* attaches the frequency consequence. Losing the User-default
  no-op breaks the compounding chain D-53 depends on.
- **D-51:** `[NEW]` **SC#2's fourth conjunct belongs at the hazard site.** `ROADMAP.md` SC#2 is one
  sentence with four conjuncts — Root context, the `Every 15 minutes` default, **"with no documented
  run-time cap on that surface"**, and the consequence. The draft shipped three and exiled the
  cap-absence clause to the compliance section. A verifier reading SC#2 will look for it inside the
  primary-pitfall treatment. **All four conjuncts, at the hazard site.**
- **D-52:** All six of `PITFALLS.md:554`'s (a)–(f) items ship. `[CORRECTED]` two were truncated in the
  draft — (f) carries **two distinct 1-MB limits** (script size and output size) and the clause
  *"clearly labelled as a different surface"*, which is what actually discharges SC#2; (c) carries
  *"lock contention **and concurrent-run behaviour**"*; (a) carries *"on every Root-context script"*
  and PITFALLS' own ranking of it as *"the single most important sentence in the Linux pillar"* —
  which is the strongest available support for the top-of-guide placement and went uncited.
- **D-53:** The Root / frequency / **retry** defaults ship as one blockquote from
  `configure-custom-settings-linux` with one `**Source:**` line. Include **Execution retries — No
  retries** even though no requirement names it: the three defaults compound (the User default no-ops
  on a userless device → the author switches to Root → inherits the 15-minute default → a genuine
  failure is invisible), and dropping the retry default breaks the argument. `[MEASURED]` C17 #12's
  200-character blockquote cap **cannot reach `05-`** — it is unenrolled — so the ~1,050-character
  quote is safe here, though it would not be in an enrolled file.
- **D-54:** **Quote "five minutes" once, in `## Compliance and Conditional Access`, with its own
  `**Source:**` line naming `create-custom-script`**, and state in the same breath that the
  platform-script article documents no run-time cap at all. `[MEASURED]` this introduces the corpus's
  **first ever** `five minutes` token — `grep -rn "five minutes\|five-minute" docs/` = **0** today, and
  no validator pins or bans it. SC#2's plain reading bars *attribution*, not mention, and
  `PITFALLS.md:556`'s warning sign is scoped *"outside a compliance-discovery context"* — but the
  margin is thin. **Mitigation, mandatory:** the disclaimer sentence *"This limit belongs to custom
  compliance discovery scripts, not to platform scripts"* must sit within two lines of the string, so a
  verifier's grep returns the disclaimer in context. **Never write a systemd hand-off mandate** — that
  mandate was built on the misattributed cap and is deleted.
  — **Reversibility:** reversible — but it is the highest-probability route to an SC#2 verifier failure.
- **D-55:** The "reports patched while running the old kernel" consequence is LNX-02's, tied to the
  reboot signal — a compliance rule reading installed package version is what produces the false green.
  State the ceiling honestly in the compliance section: discovery scripts run in the **user's context**
  and cannot check system-level settings requiring elevation, so *"is this device patched?"* has a real
  limit no configuration removes.
- **D-56:** `[NEW]` **The reboot signal has one home and one cross-link.** It has dual ownership —
  LNX-03 names it, LNX-02's consequence needs it — and the draft never placed it. Ruling: the
  **definition** lives in `## Reboot Handling` (LNX-03); `## Unsupported and Anti-Feature Callouts`
  references it by anchor as LNX-02's remedy. Both SC#2 and SC#3 then find it where they look.
- **D-57:** The distro list ships **verbatim** from `ref-supported-platforms` — *"Ubuntu Desktop 24.04
  and 26.04 LTS with a GNOME graphical desktop environment"*, *"Ubuntu LTS, version 24.04 and 26.04"*,
  *"RedHat Enterprise Linux 9"*, *"RedHat Enterprise Linux 10"*. `[CORRECTED]` the draft altered all
  four, most damagingly by **truncating the GNOME clause** — a material supportability constraint the
  corpus already relies on (`docs/linux-lifecycle/00-enrollment-overview.md:67`, headless unsupported)
  — and by abbreviating `RedHat Enterprise Linux` to `RHEL`. Under D-20's re-fetch-and-diff contract
  every one of those would diff-fail.
- **D-58:** The intra-Microsoft RHEL-8-versus-9/10 conflict is reproduced, not flattened.
  `[CORRECTED]` the draft cited a Phase-145 forward obligation that does not exist — `ROADMAP.md:77` is
  a *Phase-145* success criterion and binds nothing that did not yet exist. `[MEASURED]` Phase 145
  implemented the pattern at **n=1**: `RHEL 8` appears **once corpus-wide**, at
  `docs/decision-trees/09-linux-triage.md:25`. **Reuse that file's exact phrasing** rather than
  inventing a second spelling of the same callout.

### Commits and gates

- **D-59:** **Two commits.** (1) create `05-linux-update-delivery.md` — gate on
  `v1.20-milestone-audit` 16/0, `check-nav-hub-links` 0/0, `c17-eee-contract` 234/0. (2)
  `00-overview.md`'s six edit sites plus the prose sweep plus the conditional re-stamp — gate on
  `check-phase-54` 32/0/0 plus both of the above. Apex `check-phase-144` **101/0/0** once before
  commit 1 and once after commit 2. **Commit 1 is the riskier one** — it puts new prose under C11's
  live `walkMd('docs')` and new outbound links into a checker with no allowlist. `[MEASURED]`
  `check-nav-hub-links`'s hub-presence check asks only *"do the 4 ratified nav-hubs exist"* — it is
  **not** orphan detection, so an unreferenced `05-` in commit 1 does not redden it.
- **D-60:** `[CORRECTED]` **run all seven gates, not five.** `146-VERIFICATION.md` records
  `gates_run_by_verifier: 7` — the five above plus **both canaries**. The draft dropped them, but its
  own argument (a stray registry row takes both self-tests to 225-vs-226 RED) is an argument for
  *running* them as mechanical proof that no row landed. Add `check-phase-50` **26/0/0** as an eighth,
  since D-41/D-42 depend on it and the draft never stated its baseline.
- **D-61:** `[CORRECTED]` **frontmatter dates, re-measured.** `00`, `01` and `06` are
  `2026-08-20 / 2026-10-19`; **`02`, `03` and `04` are `2026-08-19 / 2026-10-18`.** All six intervals
  are exactly 60 — the ceiling of `V-54-07`'s `> 60` test, zero slack. 147 edits none of `02`/`03`/`04`,
  so the conditional re-stamp (146 D-59) applies only to `00-overview.md`: if the execution date
  differs from its `last_verified`, re-stamp and recompute `review_by = last_verified + 60` by
  arithmetic in the same commit; if not, the instruction is a deliberate no-op — do not manufacture a
  diff. **Never advance one stamp without the other** — `check-phase-54.mjs` tests `if (days > 60)`
  only, so advancing `last_verified` alone drives the interval negative and silently **passes**.
- **D-62:** `05-`'s frontmatter — `platform: Linux`, `applies_to: all`, `audience: admin`,
  `last_verified` = the actual execution date, `review_by` = that plus 60 by arithmetic. `[MEASURED]`
  the `platform:` value is genuinely validator-neutral today: `05-` sits outside `PATCH_FILES` and
  outside `linuxDocPaths()`, and probes with `Linux`, `all` and `cross-platform` all returned 32/0/0,
  16/0, 0/0. `Linux` is chosen because it matches every other Linux document and because a future
  extension of `linuxDocPaths()` to `docs/operations/` would demand it. **No `doc_id`** — `05-` is not
  C17-enrolled, and Phase 152 SC#3 makes that permanent.
- **D-63:** `[NEW]` **The blast-radius directory has a mixed-EOL hazard with inverted polarity.**
  `[MEASURED]` `git ls-files --eol docs/operations/patch-management/` — index LF throughout, worktree
  `00`–`04` **CRLF** and `06` **LF**, under `core.autocrlf=true` with a one-line `.gitattributes`.
  Phase 146's recorded trap was *"01 is CRLF while its siblings are LF — silent zero-match on string
  replace"*; here it is `06` that is the odd one out. D-39 directs six string-replace edits into
  `00-overview.md`. **Verify each replacement matched; a zero-match is silent.**
- **D-64:** **No registry row, no filename-map row, no canary bump, no ops-index row, no nav-hub
  wiring.** All Phase 152's, as one atomic commit (INT-01). `[MEASURED]` verified safe — both canaries
  parse `docs/_registry/RE-index.md` rather than walking the filesystem, so an unregistered `05-` moves
  neither. A planner obeying INT-02 literally would take both self-tests RED.
- **D-65:** `[CORRECTED]` **the ops-index frozen-read claim is narrower than the draft's.**
  `[MEASURED]` Phase 145's FIX-12 converted only `V-59-14`; `V-59-02`, `V-59-13` and `V-59-34` still
  **live-read** `docs/operations/00-index.md`. Row growth is genuinely safe (`V-59-13` is presence-only
  and `V-54-28` bars only the literal `## Patch Management`, while the index carries
  `## Patch & Update Management`) — but 147 touches the ops index either way, and the conclusion was
  asserted without checking the three live readers.
- **D-66:** `[MEASURED]` **`V-54-11`'s bare-`ring` negative does NOT bind `00-overview.md` or `05-`** —
  it reads `01-windows-wufb-rings.md` only, and **`check-phase-54.mjs` is the only validator in the
  repo that reads `00-overview.md` at all**, with no frozen reader touching it. Record this explicitly:
  145 D-03 and 146 D-16 are easy to over-generalise. `V-54-09` has ~1380 bytes of slack in its
  1500-byte window and is effectively unbreakable by this phase's edits.
- **D-67:** C11 exposure. `[CORRECTED]` the four patterns — `\bSystem Center\b`,
  `\bSCCM\b[^.]*\bIntune\b`, `\bAutopatch rings\b`, `\bSafetyNet\b[^.]*\bcompliance\b` — are a
  **fallback**; the live source is `ALLOWLIST.c11_ops_patterns`, which the sidecar does not define
  today. `c11_ops_exemptions` is `[]` and no line-pin touches `docs/operations/`. A Linux update guide
  has no natural reason to emit any of the four; write `Configuration Manager`, never `SCCM` or
  `System Center`. Verify by running the audit, never by reading the keyword list.
- **D-68:** `[NEW]` **Prose-level rules need grep-shaped acceptance criteria or they will be violated
  silently.** `146-REVIEW.md` WR-06 found a CONTEXT rule broken **four times** in `06`'s own prose,
  invisible to seven green gates. Every prose negative in this document — D-54's quarantine, D-67's
  `Configuration Manager` preference, D-23's no-fences rule, D-57's verbatim strings — must carry a
  runnable grep in the PLAN's acceptance criteria. `[MEASURED]` C11 gives the `SCCM` rule partial
  mechanical backing; the others have none.

### Contracts handed forward

- **D-69:** `[CORRECTED]` **the anchor rule.** The draft's *"one anchor per H2 that anything links
  to … matching `06`'s eight"* is self-contradictory and yields **zero** anchors: `[MEASURED]` `06`
  carries 8 anchors but only **2** inbound anchor links, and nothing links to `05-` by anchor at the
  end of this phase. The real rule is **one own-line `<a id="..."></a>` per major H2**. Those ids are
  the stable contract Phases 148 and 151 may cross-link — Phase 151's Recipe #5 will need them and
  cannot author them itself.
- **D-70:** `05-`'s H1 is **`# Linux Update Delivery`**. `[MEASURED]` no collision against the 225
  registry Titles, and none against the planned v1.21 titles (148 → `07`/`08`, 149 →
  `firmware-bios/00-overview.md`, 150 → three OEM guides plus `firmware-oem-matrix.md`, 151 →
  `docs/recipes/05-*`). `[CORRECTED]` two claims — the draft's `Linux X — Y` naming convention is a
  **minority** pattern (6 of 20 Linux rows), and the H1 is not itself the generator's input: the
  registry **Title** column is, and `05-` gets no registry row until Phase 152. `[CORRECTED]` an
  unresolvable collision does exit 1, but a *resolvable* Title collision silently renames the whole
  colliding group's `.docx` outputs — a quieter hazard worth recording.
- **D-71:** `05-`'s `## External References` may duplicate freely against the siblings (146 D-69).
  `[MEASURED]` `check-nav-hub-links`'s `resolveLinkTarget` returns null for `http(s)`, so **no tool
  verifies those URLs** — the orchestrator confirms each one manually during the D-06 fetch pass.
- **D-72:** If execution spans midnight, both files take the date of **commit 1** (146 D-70).
- **D-73:** `[NEW]` **`05-` contributes to Recipe #5.** Phase 151 synthesises this guide into the
  enterprise update plan's Linux row. Hand forward the anchor ids (D-69), the Ubuntu-scope ruling
  (D-01), and the fact that Linux has **no enforcement primitive** — the recipe's Linux decisions are
  attestation-only, which constrains what a prescriptive artifact can say.

### Claude's Discretion

Prose wording throughout; the exact H2 names except the pinned callouts literal (D-22, D-25); which
article titles are chosen for `**Source:**` lines; the insertion point for the `05-` Related Resources
entry (D-39); the order of edits within each commit; the exact phrasing of the Ubuntu-scope statement
(D-01) provided it names RHEL 9/10 and states the apt-family limitation explicitly.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Governing artifacts
- `.planning/ROADMAP.md` §Phase 147 — goal, four Success Criteria, blast radius, research flag
- `.planning/REQUIREMENTS.md` — LNX-01..LNX-04, the 5-minute-cap scoping note, and the
  "Validator Constraints on Requirement Text" table
- `.planning/PROJECT.md` — v1.21 Pillar D; also the glossary-terminology statement D-47 flags as stale
- `.planning/phases/146-windows-driver-firmware-update-depth/146-CONTEXT.md` — the immediate
  precedent; D-73 is the owner-ruled deferral into this phase, and D-35/D-36/D-38/D-39/D-41/D-50/D-53/D-59/D-60/D-66/D-69/D-70 all have 147 analogues carried above
- `.planning/phases/146-windows-driver-firmware-update-depth/146-REVIEW.md` — WR-01 (Source-line
  scope) and WR-06 (a CONTEXT prose rule broken four times, invisible to seven gates) and CR-02
  (an assertion contradicting its own adjacent quote)
- `.planning/phases/146-windows-driver-firmware-update-depth/146-PATTERNS.md` — §1 sibling shape,
  §2 the Source-line placement fix
- `.planning/phases/145-corpus-correction-validator-gate-archival-drift-fix/145-CONTEXT.md` — D-01
  (evidence-line convention; do not invent an inline parenthetical), D-03, D-06, D-27

### Research
- `.planning/research/PITFALLS.md` §Pitfall C1-13 — the root-context hazard, the six (a)–(f) items,
  the verbatim Root/frequency/retry defaults, the distro list, the 5-minute-cap scoping
- `.planning/research/FEATURES.md` §Pillar D — rows D-1..D-5, and :321's deferral-lapse mechanism
- `.planning/research/STACK.md` — the `Allowed-Origins` four-origin block and the Ubuntu Pro figures
  flagged for correction in D-17
- `.planning/research/SUMMARY.md` — the Pillar-D summary and the source table

### Validators that gate this phase
- `scripts/validation/check-phase-54.mjs` — `V-54-07` frontmatter, `V-54-08` the table, `V-54-09`
  Ring Terminology, `V-54-10`, `V-54-11` (binds `01` only), `V-54-26` the blockquote literal,
  `V-54-27` the corpus-wide `> **Platform:**` negative over `docs/` and `.planning/`, `V-54-29`,
  `V-54-31`
- `scripts/validation/v1.20-milestone-audit.mjs` — C11 (live `walkMd('docs')`), C10 and
  `linuxDocPaths()` (which does **not** reach `docs/operations/`)
- `scripts/validation/check-phase-50.mjs` — `V-50-14/15/16/24/25`; baseline 26/0/0
- `scripts/validation/check-nav-hub-links.mjs` — target existence, no baseline of any kind
- `scripts/validation/c17-eee-contract.mjs` — enrollment gate and check #12
- `scripts/validation/check-phase-144.mjs` — the apex
- `scripts/validation/check-phase-59.mjs` — `V-59-14` frozen, `V-59-02/13/34` still live

### Edit targets
- `docs/operations/patch-management/05-linux-update-delivery.md` — new
- `docs/operations/patch-management/00-overview.md` — six edit sites plus the prose sweep

### Corpus the guide cross-links rather than re-authors
- `docs/admin-setup-linux/04-app-delivery.md` — the platform-script mechanism; `:59` supply-chain
  callout; `:78`/`:104` the LIN-DEFER-01 promise
- `docs/admin-setup-linux/03-compliance-policy.md` — the Phase-50 SSoT for compliance scripts
- `docs/admin-setup-linux/05-conditional-access.md` — web-app CA
- `docs/reference/linux-capability-matrix.md` — `## Software Updates`; the `V-50-15` pinned literal
- `docs/reference/4-platform-capability-comparison.md` — the 4→5 retitle precedent; also the
  six-site off-by-one defect recorded as a deferred idea
- `docs/_glossary-linux.md` — Web-app CA, Linux compliance settings, `/var/log/intune-update.log`
- `docs/decision-trees/09-linux-triage.md` §:25 — the RHEL-8 conflict phrasing to reuse

### External sources to fetch (D-06)
- `learn.microsoft.com/en-us/intune/device-configuration/templates/configure-custom-settings-linux`
- `learn.microsoft.com/en-us/intune/device-security/compliance/create-custom-script`
- `learn.microsoft.com/en-us/intune/fundamentals/ref-supported-platforms`
- `learn.microsoft.com/en-us/intune/intune-service/fundamentals/deployment-guide-platform-linux`
- `ubuntu.com/server/docs/how-to/software/automatic-updates/` — **via `gh api` on
  `repos/canonical/ubuntu-server-documentation`, path `docs/how-to/software/automatic-updates.md`**
- `ubuntu.com/pro` plus a second Canonical target for `pro attach` (D-16)
- A first-party source for `/var/run/reboot-required` (D-02) — **may not exist; escalate if not found**
- A Microsoft Learn source for the D-73 driver-deferral correction (D-31)

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `06-windows-driver-firmware-updates.md`: the closest structural precedent — a patch-management
  sibling *outside* `PATCH_FILES`, `platform: Windows`, `applies_to: all`, `audience: admin`, 60-day
  cycle, 10 H2s, 8 own-line anchors, no `doc_id`, no Version History, zero code fences
- `4-platform-capability-comparison.md` (RE-143): the corpus's own 4→5 transition — filename kept,
  H1 retitled, Linux appended last
- `02-macos-update-enforcement.md:27`: the citation shape for a source with a missing date field

### Established Patterns
- Evidence lines are `>` blockquote plus a standalone `**Source:**` paragraph after the claim, with
  URL and date; all 82 in the corpus carry a date
- Absences use `## Unsupported and Anti-Feature Callouts` with bold sub-labels, no new identifiers
- Content phases author documents; registry, filename-map, canaries and navigation are the close
  phase's single atomic commit

### Integration Points
- `00-overview.md`'s comparison table, routing list, triad section and Related Resources
- Anchor ids in `05-` become the cross-link contract for Phases 148 and 151

</code_context>

<specifics>
## Specific Ideas

The owner ruled four gray areas directly: Ubuntu-scoped with the limitation stated openly rather than
papered over or narrowed to Ubuntu-only; a different first-party source for the reboot signal with
escalation rather than a weakly-sourced assertion; a full research pass despite the roadmap flag; and
all three requirement-text corrections carried with formal owner-ruled markers rather than as CONTEXT
notes. The through-line is a preference for **documented silences over false coverage**, which matches
the roadmap's own framing of this phase.

</specifics>

<deferred>
## Deferred Ideas

- **The six-site off-by-one in `docs/reference/4-platform-capability-comparison.md`** — every
  `> **Table summary:** This table compares N …` blockquote overstates its row count by one (`:47`
  12/11, `:65` 10/9, `:83` 10/9, `:101` 10/9, `:117` 8/7, `:131` 6/5). Out of 147's blast radius, and
  the file is pinned by ~20 audit harnesses plus `check-phase-58/60/63/109`. Needs its own scoped item.
- **`docs/_glossary-linux.md` terminology** — `unattended-upgrades`, Livepatch, Ubuntu Pro and
  "platform script" have no glossary entries; `PROJECT.md:31` names this milestone as the one that adds
  the terminology. No v1.21 requirement covers it. Either a later v1.21 phase claims it or PROJECT.md's
  Pillar-D scope statement should be corrected.
- **`LIN-DEFER-01`** — the v1.5.1 Bash custom-compliance deep-dive the corpus has promised an inbound
  cross-link to since v1.5. Not discharged by 147 (D-43).
- **A sourced RHEL update-delivery section** (`dnf-automatic`) — deferred by owner ruling D-01; zero
  first-party sourcing exists anywhere in the repo today.
- **`ARCHITECTURE.md:338`'s claim that the C5/C10 tests read frozen** — wrong for v1.20, which reads
  live. Recorded, not fixed here.
- **`PROJECT.md:31`'s "six currently-green workflows" glossary hazard** — overstated; only one audit's
  C10 reads live. Worth correcting in the milestone record.
- **`00-overview.md:46`'s `(file numbers 01 through 04)` parenthetical** — becomes `01 through 05`
  in this phase, but `06` sits outside that range by design. If a later phase adds another
  non-platform sibling the parenthetical will need rethinking rather than incrementing.

</deferred>

---

*Phase: 147-Linux Update Delivery*
*Context gathered: 2026-08-20*
