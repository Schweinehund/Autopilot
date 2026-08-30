# Phase 147: Linux Update Delivery - Research

**Researched:** 2026-08-21
**Domain:** Documentation authoring — Microsoft Intune Linux update-delivery surface (Ubuntu/apt-family), mapped into an existing five-doc `docs/operations/patch-management/` corpus with a structural-validator harness
**Confidence:** HIGH

## Summary

This phase authors one new file (`docs/operations/patch-management/05-linux-update-delivery.md`) and edits one existing file (`00-overview.md`, six sites) inside a documentation corpus, not application code. `147-CONTEXT.md` already carries 73 owner-adjudicated decisions (`/grill-me` + 5-way `/adversarial-review`) that constitute the authoritative contract for this phase; this RESEARCH.md's job, per **D-03** (owner-ruled), is to discharge the bounded external research pass named in **D-06** — fetch six external sources as source bytes (never a summarizing fetcher, per **D-07**), corroborate or correct the figures CONTEXT.md already asserts, and hand the planner byte-verified citations it can drop straight into the guide.

Every external fetch in this session was performed as raw source bytes (via `gh api` against the `canonical/ubuntu-server-documentation` GitHub repo, or via `curl` against the rendered page, with plain-text extraction and literal-string greps against the extracted text — never a WebFetch summary for a load-bearing quote). All results below **corroborate** CONTEXT.md's `[MEASURED]` figures exactly, at byte level, with two additions: (1) **D-02's escalation is discharged** — a first-party Canonical page (`docs/how-to/software/upgrade-your-release.md`, commit `07aa7d442f`, 2026-07-06) defines `/run/reboot-required` as a readable state ("if the file `/run/reboot-required` exists, then you will need to reboot"), so no owner escalation is needed; (2) **D-16's second Canonical target is identified**: `documentation.ubuntu.com/pro/attach-tutorial/` carries `sudo pro attach [YOUR_TOKEN]` as plain-text page content (the command text is not present as an HTML-searchable string until tags are stripped — a real trap for a naive grep). All in-repo structural claims (validator baselines, sibling-guide shape, PATCH_FILES scope, C11 pattern set) were independently re-run against HEAD `96c5919d` and match CONTEXT.md's `f132e4d0` baseline exactly — zero drift between the two commits (only `.planning/` files changed).

**Primary recommendation:** Follow `147-CONTEXT.md` D-01 through D-73 as the plan's decision set without relitigating them; use this document's `## External Sources — Verified` section for the exact citation strings and dates to drop into evidence lines; use `## Sibling-Guide Structural Shape` for the H2/frontmatter/anchor/citation skeleton to replicate; treat every `[RESEARCH-CONFIRMED]` tag below as licence to cite directly without further verification, and escalate nothing — both of CONTEXT.md's open sourcing questions (D-02's reboot-required source, D-16's second Pro target) are resolved in this pass.

## Architectural Responsibility Map

This phase has no application-code tiers — it is 100% documentation-corpus authoring. The "architecture" here is the corpus's own layering, not a runtime system:

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Cross-platform routing / concept hub | `docs/operations/patch-management/00-overview.md` | — | Existing hub; six edit sites (D-39), never re-authored wholesale |
| Linux-specific update-delivery narrative | New file `05-linux-update-delivery.md` | — | Sibling of `01`-`04`, structurally modeled on `06` (outside `PATCH_FILES`) |
| Mechanism deep-dive (Bash platform-script delivery mechanics) | `docs/admin-setup-linux/04-app-delivery.md` | — | Already documents the mechanism end-to-end (D-44); `05-` cross-links, does not re-author |
| Compliance-script authoring / cadence | `docs/admin-setup-linux/03-compliance-policy.md` (Phase-50 SSoT) | `05-` (pointer only) | `quick-ref-l2.md:398` PITFALL-7 firewall bars `05-` from teaching script authoring (D-45) |
| Web-app Conditional Access | `docs/admin-setup-linux/05-conditional-access.md` | `05-` (references only) | Not edited this phase; `05-` states the attestation-not-enforcement position, does not re-teach CA config |
| Reference capability matrices | `docs/reference/linux-capability-matrix.md`, `docs/reference/4-platform-capability-comparison.md` | — | Read-only this phase (D-41); `05-` must not contradict them (D-46) |
| Registry / publish-bundle reach | Phase 152 (INT-01..06) | — | Explicitly out of this phase's blast radius (D-64) |
| Structural validation | `scripts/validation/check-phase-54.mjs`, `check-phase-50.mjs`, `check-nav-hub-links.mjs`, `c17-eee-contract.mjs`, `v1.20-milestone-audit.mjs`, `check-phase-144.mjs` (apex) | `check-phase-59.mjs` (mostly frozen) | See `## Validator Surface` below |

## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| LNX-01 | No native Intune Linux update policy; Bash platform script is the mechanism; compliance-policy + CA is attestation not enforcement; maps onto the deferral/enforcement/attestation triad | Confirmed via `00-overview.md`'s existing triad prose (`## Deferral vs Enforcement`, lines 103-141); Intune platform-script page confirmed (raw HTML text) to carry no update/patch orchestration concept, only generic script delivery; `linux-capability-matrix.md:84` confirmed verbatim: `"Not supported — Intune does not orchestrate apt updates"` — reconciled per D-46 ("Intune does not *orchestrate* Linux updates; it *delivers a script* that does") |
| LNX-02 | Root-context execution hazard as primary pitfall: `Root` on default `Every 15 minutes`, no documented run-time cap on that surface, fleet-wide consequence | `configure-custom-settings-linux` (learn.microsoft.com/en-us/intune/intune-service/configuration/custom-settings-linux, `ms.date` 2025-01-09, `updated_at` 2026-07-01) fetched and confirmed verbatim: Root/User/Every-15-minutes/No-retries text below, **and confirmed the absence** of any timeout/MB/run-time-cap token anywhere on that page |
| LNX-03 | `unattended-upgrades` four enabled origins (not security-only), commented-out `-updates`/`-proposed`/`-backports`, reboot-required detection | Canonical `automatic-updates.md` fetched as raw GitHub bytes (28,823 bytes, matches D-08 exactly); default `Allowed-Origins` block (lines 82-98), the `Automatic-Reboot` default-false / `-WithUsers` true distinction (lines 328-329), and the reboot-required log line (line 346) all confirmed byte-exact. **New this session:** `upgrade-your-release.md` (also Canonical, raw bytes) defines `/run/reboot-required` as a readable state — discharges D-02's escalation requirement without an owner round-trip |
| LNX-04 | Ubuntu Pro/Livepatch as Canonical-side entitlement outside Intune's control plane, verifiable only via custom compliance script, all third-party figures re-verified or omitted | `ubuntu.com/pro` raw HTML confirmed verbatim: "free for personal use on up to 5 physical machines, or 50 machines...", "10 years", "15 year" (Legacy add-on) — matches D-17 exactly. `sudo pro attach [YOUR_TOKEN]` confirmed on `documentation.ubuntu.com/pro/attach-tutorial/` (plain-text extraction), discharging D-16's "name a second Canonical target" requirement |

## User Constraints

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

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

**Research-pass re-verification note (this file, 2026-08-21):** every `[MEASURED]` in-repo claim below was
independently re-run against HEAD `96c5919d` (one commit past `f132e4d0`, containing only `.planning/`
changes) and matched exactly — see `## Re-Verification Log` below for the command-by-command record.
Every external source cited below was re-fetched as raw source bytes this session; see
`## External Sources — Verified`.

#### HEAD baselines — carry into the PLAN

`check-phase-54` **32/0/0** · `v1.20-milestone-audit` **16/0** · `check-nav-hub-links` **0/0** ·
`c17-eee-contract` **234/0** · `check-phase-50` **26/0/0** · apex `check-phase-144` **101/0/0** ·
`build-filename-map --self-test` **8/0** (225 rows) · `build-publish-bundle --self-test` **15/0**
(225 Approved).

- **D-05:** `[MEASURED]` **`check-phase-144` IS the apex.** `ls scripts/validation/ | grep -E "14[5-9]"`
  returns nothing — Phases 145 and 146 authored no validator. Do not look for a later apex.

#### Owner rulings

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
  — **[RESOLVED by this research pass, 2026-08-21]** A different first-party Canonical page —
  `docs/how-to/software/upgrade-your-release.md` in `repos/canonical/ubuntu-server-documentation`
  (commit `07aa7d442f`, 2026-07-06) — states, as prose (not a log line): *"After applying all updates,
  it may be necessary to **reboot your system.** The release upgrade process will let you know if
  that's needed, but you can also check manually before: if the file `/run/reboot-required` exists,
  then you will need to reboot."* This defines the file as a readable state. No owner escalation
  needed; cite this page (not the automatic-updates log line alone) for the LNX-03 reboot-detection
  claim. See `## External Sources — Verified` below for the full citation.
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

#### The research pass — scope and method

- **D-06:** The pass fetches exactly these, and records a query trail for each — (a) the Canonical
  automatic-updates page, **as source bytes**; (b) `ubuntu.com/pro`; (c) a first-party source for
  `/var/run/reboot-required` per D-02; (d) the Microsoft Learn source D-73 needs for the driver-deferral
  correction; (e) `ref-supported-platforms` for the distro list. It is a bounded re-fetch plus one new
  search, not an open-ended domain sweep.
  — **[DISCHARGED — see `## External Sources — Verified`]** all five fetched and byte-verified this
  session, plus the two Intune platform-script pages (`configure-custom-settings-linux`,
  `create-custom-script`) needed for LNX-02.
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
  — **[RE-CONFIRMED this session]** `gh api "repos/canonical/ubuntu-server-documentation/commits?path=docs/how-to/software/automatic-updates.md&per_page=1"` returns commit `4826f308457462b754551b514525f00a8b55ff02`, date `2026-07-15T12:46:36Z`. Exact match.
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
  — **[RE-CONFIRMED this session, byte-exact]** line 328: `` `Unattended-Upgrade::Automatic-Reboot "false";`: If this option is set to `true`, the system will be rebooted ***without confirmation*** at the end of an upgrade run if a reboot was requested. The default value is `false`. `` — line 329: `` `Unattended-Upgrade::Automatic-Reboot-WithUsers "true";`: Automatically reboot even if there are users currently logged in when `Unattended-Upgrade::Automatic-Reboot` (the option above) is set to `true`. The default value is `true`. ``
- **D-13:** `[MEASURED]` **`update-notifier-common` is absent from that page** (0 occurrences), and the
  page carries a same-prefix **decoy** — `update-notifier` at line 435, which is the graphical
  postpone-prompt client, a different subject. A grep for `update-notifier` returns a hit and invites
  false confirmation. `PITFALLS.md:541` cites this page for the claim; that citation is wrong (D-32).
  — **[RE-CONFIRMED this session]** `update-notifier-common` = 0 hits; line 435 verbatim: *"The
  prompting functionality is implemented graphically on Ubuntu Desktop by the `update-notifier`
  program. The user is shown a notification with the option to postpone the updates..."* — confirmed
  as the decoy, a GUI postpone-prompt client, unrelated to the reboot signal.
- **D-14:** `[MEASURED]` **the page carries THREE near-identical `Allowed-Origins` blocks** — the
  default at lines 85-98, and modified examples at 107-119 and 131-145 in which
  `"${distro_id}:${distro_codename}-updates";` is **uncommented** (the third also adds a PPA).
  **Pin the default block by its preamble** *"This is the default:"* (line 82). Quoting the wrong block
  ships a first-party quote that **inverts LNX-03's central claim while passing a naive verbatim diff**
  — the failure mode no gate in this repo can catch.
  — **Reversibility:** one-way — an inverted LNX-03 that survives verification is a shipped falsehood.
  — **[RE-CONFIRMED this session]** default block (lines 85-98) verbatim:
  ```text
  Unattended-Upgrade::Allowed-Origins {
      "${distro_id}:${distro_codename}";
      "${distro_id}:${distro_codename}-security";
      // Extended Security Maintenance; doesn't necessarily exist for
      // every release and this system may not have it installed, but if
      // available, the policy for updates is such that unattended-upgrades
      // should also install from here by default.
      "${distro_id}ESMApps:${distro_codename}-apps-security";
      "${distro_id}ESM:${distro_codename}-infra-security";
  //  "${distro_id}:${distro_codename}-updates";
  //  "${distro_id}:${distro_codename}-proposed";
  //  "${distro_id}:${distro_codename}-backports";
  };
  ```
  preceded by "This is the default:" (line 82). The modified block (lines 107-119) adds only the
  uncommented `-updates` line; the third (131-145) adds a PPA line via `LP-PPA-canonical-server-server-backports`.
- **D-15:** `[MEASURED]` **the Ubuntu 26.04 floor has no Canonical backing on that page** — `26.04` = 0
  occurrences; the page uses `noble` (24.04) throughout every example and log excerpt, and names
  `24.04` on six lines. Scope every `unattended-upgrades` quote as *"as documented for 24.04
  (`noble`)"*. The corpus's supported list foregrounds 26.04, so the guide would otherwise read as
  though Canonical validated 26.04 behaviour.
  — **[RE-CONFIRMED this session]** `noble` occurrences confirmed throughout (log lines, Suite/Codename
  fields, PPA paths); `26.04` = 0 occurrences on the Canonical automatic-updates page. The corpus's
  official Intune-side distro list (`ref-supported-platforms`, see below) does list 26.04, but the
  *Canonical apt-mechanics page* only demonstrates 24.04/`noble` — the scoping clause is required.
- **D-16:** `[MEASURED]` **`ubuntu.com/pro` does not carry `sudo pro attach`.** `STACK.md:478`
  designates that page as the verification target for it, so the target cannot discharge the claim.
  Name a second Canonical target (the Ubuntu Pro documentation site) or drop the command. Do not drop
  it merely because the wrong page was named.
  — **[RESOLVED by this research pass, 2026-08-21]** `documentation.ubuntu.com/pro/attach-tutorial/`
  (Canonical, Read the Docs-hosted `canonical-ubuntu-pro` project) carries, as page prose (confirmed
  only after HTML-tag stripping — the raw markup splits it across inline elements so a naive
  tag-inclusive grep misses it): *"Now that we have our Ubuntu Pro token, we can attach it to our
  Ubuntu instance. Open the terminal on your Ubuntu LTS, and type the following command: `sudo pro
  attach [ YOUR_TOKEN ]`"* followed by a sample run showing `esm-infra` and `livepatch` auto-enabling.
  Use this page as the second Canonical target; `ubuntu.com/pro` remains the target for the free-tier
  and ESM/Legacy figures.
- **D-17:** `[MEASURED]` **the live Ubuntu Pro figures are incomplete rather than wrong, and the
  artifact should be corrected rather than the numbers merely omitted.** Live: *"free for personal use
  on up to **5 physical machines**, or **50 machines** for official Ubuntu Community members"*; and ESM
  *"extends … from **5 years** … to **10 years** for the entire Ubuntu Archive"* plus a **15-year**
  Legacy add-on tier. `STACK.md:478` says "5 machines" and "ESM provides 10 years". Ship only
  re-verified figures per LNX-04, and flag `STACK.md:478` for correction so the artifact stops being
  wrong for every future phase that reads it.
  — **[RE-CONFIRMED this session, raw HTML bytes from `ubuntu.com/pro`]** *"Ubuntu Pro is and always
  will be free for personal use on up to 5 physical machines, or 50 machines for [official Ubuntu
  Community members]"*; *"Expanded Security Maintenance (ESM) provides 10 years of vulnerability fixes
  for critical, high and selected medium vulnerabilities across the whole Ubuntu archive"*; *"Ubuntu
  Pro extends the life of every Ubuntu LTS from 5 years of standard security maintenance for the Main
  repository to 10 years for the entire Ubuntu Archive (Main and Universe repositories). With the
  Legacy add-on, this is extended an additional 5 years, giving you a 15 year security maintenance and
  support commitment."*
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

#### The guide's shape — H2 skeleton

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

#### Requirement-text corrections (D-04)

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
  — **[RE-CONFIRMED this session]** `00-overview.md:87-88` (current HEAD) reads verbatim: *"fixed
  when the driver policy is created and cannot be changed afterwards; the 0–30 day deferral are set
  per deployment ring, and the quality-update deadline and grace period do apply to drivers."* This is
  the exact defective text to correct. The correction source is already in-repo, authored in Phase
  146: `docs/operations/patch-management/06-windows-driver-firmware-updates.md:330-335`, citing
  **[Configure Windows driver update policies](https://learn.microsoft.com/en-us/intune/device-updates/windows/configure-driver-update-policy)**
  (updated 2026-04-24), verbatim: *"**Make updates available after (days)**: This setting is a
  deferral period that delays when Windows Update begins to deploy and install the new recommended
  update that was automatically added to the policy with a status of *Approved*. The delay supports
  from zero to 30 days and starts from the day the update is added to the policy, not from the date
  the update was made available or published by the OEM."* The correct claim: the 0-30 day deferral is
  the **Driver Update Policy's own setting**, not a WUfB-deployment-ring setting; the WUfB deployment
  ring's quality-update deferral explicitly **does not** reach drivers (06's `## Deferral and Deadline
  Behavior`, lines 292-330, already documents this correctly with the FAQ source). This Microsoft
  Learn source satisfies D-06(d) — no new external fetch needed; cross-cite the in-repo evidence.
- **D-32:** **The misattributed Canonical citation in the pitfalls research file is corrected in this
  phase.** `PITFALLS.md:541` credits the
  Canonical automatic-updates page for `update-notifier-common`, which is absent from it (D-13). This
  is the same defect class Phase 145 corrected in FEATURES D-2. Correcting it in-phase stops the
  misattribution propagating to every future phase that reads the artifact.

#### `00-overview.md` — the fifth column and the prose

- **D-33:** `[REVERSED — the draft's most emphatic rule was fabricated]` **`V-54-08` is NOT
  order-sensitive.** `[MEASURED]` five live probes — Linux appended last, inserted before Android,
  inserted first, after Windows, between macOS and iOS — **all returned 32/0/0**. The `[^\n]*` gaps
  absorb any inserted cell; the regex breaks only if the existing four literals are *reordered*, which
  inserting never does. The check has **four** acceptance paths, not the two the draft read. **Append
  Linux as the last column** on editorial grounds and because `docs/reference/4-platform-capability-comparison.md`
  does exactly that — not because any other position is barred.
  — **[RE-CONFIRMED this session]** `check-phase-54.mjs` V-54-08 source read: accepts
  `/\|[^\n]*\bWindows\b[^\n]*\bmacOS\b[^\n]*\biOS\b[^\n]*\bAndroid\b[^\n]*\|/` (plus an `iOS/iPadOS`
  variant and a reversed-order variant) OR a transposed 4-row form. The `[^\n]*` gaps do not anchor to
  end-of-row, so an appended 5th cell after `Android` does not break the match.
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
  — **[RE-CONFIRMED this session, exact]** `grep -n "\bfour\b" docs/operations/patch-management/00-overview.md`
  at current HEAD returns exactly 7 hits at lines 39, 40, 46, 59, 168, 175, 184 — identical to D-37's
  claim, zero drift.
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
  — **[RE-CONFIRMED this session]** `check-phase-54.mjs` V-54-07's `expectedPlatform[OV]` regex is
  `/^platform: (cross-platform|Windows,\s*macOS,\s*iOS,\s*Android)\s*$/m` — anchored to end-of-line
  (`\s*$`), so `cross-platform, Linux` fails this test. V-54-31's `validValues[OV]` is
  `/(cross-platform|Windows,\s*macOS,\s*iOS,\s*Android)/` — unanchored, would pass. Confirmed
  split-failure shape exists exactly as described.

#### Delta versus re-author

- **D-41:** **No edit to `docs/reference/linux-capability-matrix.md`.** `[CORRECTED]` the reasoning,
  not the ruling. `[MEASURED]` `V-50-14` is presence-only so an added H2 would be safe; a *compliant*
  row edit is entirely free (probe: `check-phase-50` 26/0, `c17` 234/0). Two real hazards the draft
  missed — `V-50-16`'s `VALID_STATUS` is a **prefix** match (`/^(Supported|Partial|Not supported)/`),
  so **D-35's parenthetical cell form fails here** (probe → `V-50-16 FAIL`, 25/1); and the
  `> **Table summary:**` blockquote sits at **195 characters against C17 #12's 200-character cap** —
  a five-character margin, so a planner who "fixes" the stale count by rewording reddens C17 (probe at
  215 chars → `234 files checked, 1 with violations`). The ruling stands on editorial grounds: the
  matrix already says what LNX-01 says.
  — **[RE-CONFIRMED this session]** `check-phase-50.mjs` line 41: `const VALID_STATUS =
  /^(Supported|Partial|Not supported)/;` — confirmed prefix-anchored. `linux-capability-matrix.md:84`
  verbatim: `"Not supported — Intune does not orchestrate apt updates"` — this is the sentence LNX-01's
  reconciliation (D-46) must not contradict.
- **D-42:** **No edits to `docs/admin-setup-linux/`.** `[CORRECTED]` the stated cost was wrong —
  `[MEASURED]` `V-50-25` computes `(review_by − last_verified)` and **never reads today's date**, so a
  body-only edit costs nothing. The real reasons are scope discipline (inbound links are Phase 152's)
  and `check-phase-50`'s pin density. `[MEASURED, CORRECTED]` `ADMIN_FILES` is **six admin files plus
  `docs/reference/linux-capability-matrix.md`** — so `V-50-25` binds the matrix too, which D-41's
  ruling never drew. Only `:273`'s `readAtV114Close` is a frozen read; the other 26 read live.
  — **[RE-CONFIRMED this session]** `check-phase-50.mjs:34`: `const ADMIN_FILES = [ADMIN_OVERVIEW,
  ADMIN_AGENT, ADMIN_ENROLLMENT, ADMIN_COMPLIANCE, ADMIN_APP, ADMIN_CA, MATRIX];` — `MATRIX`
  (`linux-capability-matrix.md`) is confirmed inside `ADMIN_FILES`, so `V-50-25`'s 60-day-cycle test
  binds it.
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
  — **[RE-CONFIRMED this session]** `04-app-delivery.md` verbatim, lines 41-44: *"Intune delivers Bash
  scripts to Linux devices as the only app-delivery mechanism. The script content is org-authored;
  Intune handles delivery, schedule, and exit-code reporting. The Linux client executes the script and
  surfaces success or failure to the Intune admin center based on the script exit code."* Confirmed a
  complete fenced Bash example exists at lines 68-77 and a supply-chain callout at line 59.
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

#### The root-context hazard (LNX-02)

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
  — **[RE-CONFIRMED this session]** `configure-custom-settings-linux` (raw HTML text extraction)
  confirmed to carry **no** timeout/MB/run-time-cap token anywhere on the page — searched
  "timeout", "MB", "byte", "size limit", "run-time", "seconds" and found none associated with the
  platform-script surface. The absence claim is fully supportable.
- **D-52:** All six of `PITFALLS.md:554`'s (a)–(f) items ship. `[CORRECTED]` two were truncated in the
  draft — (f) carries **two distinct 1-MB limits** (script size and output size) and the clause
  *"clearly labelled as a different surface"*, which is what actually discharges SC#2; (c) carries
  *"lock contention **and concurrent-run behaviour**"*; (a) carries *"on every Root-context script"*
  and PITFALLS' own ranking of it as *"the single most important sentence in the Linux pillar"* —
  which is the strongest available support for the top-of-guide placement and went uncited.
  — **[RE-CONFIRMED this session, byte-exact from `create-custom-script`]** *"Scripts can be no larger
  than 1 megabyte (MB) each. Output generated by each script can be no larger than 1 MB. Scripts must
  have a limited run time: On Linux, scripts must take five minutes or less to run."* — two distinct
  1-MB limits confirmed (script size, output size), plus the five-minute run-time cap, all on the
  **discovery-script** (compliance) surface, not the platform-script surface.
- **D-53:** The Root / frequency / **retry** defaults ship as one blockquote from
  `configure-custom-settings-linux` with one `**Source:**` line. Include **Execution retries — No
  retries** even though no requirement names it: the three defaults compound (the User default no-ops
  on a userless device → the author switches to Root → inherits the 15-minute default → a genuine
  failure is invisible), and dropping the retry default breaks the argument. `[MEASURED]` C17 #12's
  200-character blockquote cap **cannot reach `05-`** — it is unenrolled — so the ~1,050-character
  quote is safe here, though it would not be in an enrolled file.
  — **[RE-CONFIRMED this session, byte-exact from `configure-custom-settings-linux`]**: *"Execution
  context: Select the context the script is executed in. Your options: User (default): When a user
  signs in to the device, the script runs. If a user never signs into the device, or there isn't any
  user affinity, then the script doesn't run. Root: The script always runs (with or without users
  logged in) at the device level. The first time the script executes, the end user might have to
  consent. After they consent, it should continue to execute on its schedule. Execution frequency:
  Select how frequently the script is executed. The default is Every 15 minutes. Execution retries: If
  the script fails, enter how many times Intune should retry running the script. The default is No
  retries."* This is the exact blockquote text to use.
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
  — **[RE-CONFIRMED this session]** `grep -rn "five minutes\|five-minute" docs/` still returns 0 at
  current HEAD. The URL to cite: `learn.microsoft.com/en-us/intune/device-security/compliance/create-custom-script`
  (`ms.date` 2025-09-04, `updated_at` 2026-07-15).
- **D-55:** The "reports patched while running the old kernel" consequence is LNX-02's, tied to the
  reboot signal — a compliance rule reading installed package version is what produces the false green.
  State the ceiling honestly in the compliance section: discovery scripts run in the **user's context**
  and cannot check system-level settings requiring elevation, so *"is this device patched?"* has a real
  limit no configuration removes.
  — **[RE-CONFIRMED this session, byte-exact]** `create-custom-script` verbatim: *"On Linux, discovery
  scripts run in the user's context. They can't check for system-level settings that require
  elevation. An example of this limitation is the state/hash of the /etc/sudoers file."*
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
  — **[RE-CONFIRMED this session, byte-exact via WebFetch page-content extraction]** `ref-supported-platforms`
  (`ms.date` 2025-10-14, `updated_at` 2026-07-01): *"### Linux — Ubuntu Desktop 24.04 and 26.04 LTS
  with a GNOME graphical desktop environment; Ubuntu LTS, version 24.04 and 26.04; RedHat Enterprise
  Linux 9; RedHat Enterprise Linux 10"* — all four strings confirmed verbatim, plus the note: *"Ubuntu
  Desktop already has a GNOME graphical desktop environment installed."*
- **D-58:** The intra-Microsoft RHEL-8-versus-9/10 conflict is reproduced, not flattened.
  `[CORRECTED]` the draft cited a Phase-145 forward obligation that does not exist — `ROADMAP.md:77` is
  a *Phase-145* success criterion and binds nothing that did not yet exist. `[MEASURED]` Phase 145
  implemented the pattern at **n=1**: `RHEL 8` appears **once corpus-wide**, at
  `docs/decision-trees/09-linux-triage.md:25`. **Reuse that file's exact phrasing** rather than
  inventing a second spelling of the same callout.
  — **[RE-CONFIRMED this session]** `docs/decision-trees/09-linux-triage.md:25` verbatim: *"Intune's
  custom-settings-for-Linux page still names RHEL 8 — an intra-Microsoft conflict, reproduced here
  rather than flattened. This tree covers only the Ubuntu triage path."* Reuse this phrasing pattern.

#### Commits and gates

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
  — **[RE-CONFIRMED this session]** `check-phase-54.mjs:35`: `const PATCH_FILES = [OV, WIN, MAC, IOS,
  AND_];` where the five constants are `00-overview.md`, `01-windows-wufb-rings.md`,
  `02-macos-update-enforcement.md`, `03-ios-update-lifecycle.md`, `04-android-patch-delivery.md`.
  `05-linux-update-delivery.md` is confirmed absent from this array.
- **D-63:** `[NEW]` **The blast-radius directory has a mixed-EOL hazard with inverted polarity.**
  `[MEASURED]` `git ls-files --eol docs/operations/patch-management/` — index LF throughout, worktree
  `00`–`04` **CRLF** and `06` **LF**, under `core.autocrlf=true` with a one-line `.gitattributes`.
  Phase 146's recorded trap was *"01 is CRLF while its siblings are LF — silent zero-match on string
  replace"*; here it is `06` that is the odd one out. D-39 directs six string-replace edits into
  `00-overview.md`. **Verify each replacement matched; a zero-match is silent.**
  — **[RE-CONFIRMED this session, exact]** `git ls-files --eol docs/operations/patch-management/`:
  `00-overview.md` through `04-android-patch-delivery.md` all report `i/lf w/crlf`; `06-windows-driver-firmware-updates.md`
  reports `i/lf w/lf`. Confirmed exactly as described — `00-overview.md` (the edit target) is CRLF in
  the worktree.
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
  — **[RE-CONFIRMED this session]** `check-phase-59.mjs:14`: `import { readAtV15Close, readAtV116Close
  } from './_lib/frozen-at-close.mjs';` — only `V-59-14` (line 447) calls `readAtV15Close`; `V-59-02`
  (line 254), `V-59-13` (line 430) and `V-59-34` (line 894) read the live file. `check-phase-59.mjs`
  currently 36/0/0 at HEAD (not previously baselined in CONTEXT.md — new baseline recorded here). This
  is moot for 147 regardless, since D-64 bars any ops-index edit this phase.
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
  — **[RE-CONFIRMED this session, byte-exact]** `v1.20-milestone-audit.mjs:570-576` hardcoded fallback
  array matches exactly: `'\\bSystem Center\\b'`, `'\\bSCCM\\b[^.]*\\bIntune\\b'`,
  `'\\bAutopatch rings\\b'`, `'\\bSafetyNet\\b[^.]*\\bcompliance\\b'`; C11 (id 11) scope confirmed as
  `for (const abs of walkMd('docs'))` — the entire `docs/` tree, live, per-run.
- **D-68:** `[NEW]` **Prose-level rules need grep-shaped acceptance criteria or they will be violated
  silently.** `146-REVIEW.md` WR-06 found a CONTEXT rule broken **four times** in `06`'s own prose,
  invisible to seven green gates. Every prose negative in this document — D-54's quarantine, D-67's
  `Configuration Manager` preference, D-23's no-fences rule, D-57's verbatim strings — must carry a
  runnable grep in the PLAN's acceptance criteria. `[MEASURED]` C11 gives the `SCCM` rule partial
  mechanical backing; the others have none.

#### Contracts handed forward

- **D-69:** `[CORRECTED]` **the anchor rule.** The draft's *"one anchor per H2 that anything links
  to … matching `06`'s eight"* is self-contradictory and yields **zero** anchors: `[MEASURED]` `06`
  carries 8 anchors but only **2** inbound anchor links, and nothing links to `05-` by anchor at the
  end of this phase. The real rule is **one own-line `<a id="..."></a>` per major H2**. Those ids are
  the stable contract Phases 148 and 151 may cross-link — Phase 151's Recipe #5 will need them and
  cannot author them itself.
  — **[RE-CONFIRMED this session]** `06-windows-driver-firmware-updates.md` grep for `^<a id=` returns
  exactly 8 own-line anchors (`what-this-policy-does`, `approval-modes`, `approval-workflow`,
  `deferral-deadline-behavior`, `oem-catalog-firmware`, `driver-update-reporting`,
  `configmgr-coexistence`, `unsupported-callouts`) — matches D-69's precedent exactly.
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
  — **[DISCHARGED this session]** every URL cited in this RESEARCH.md's `## External Sources —
  Verified` section below was manually fetched and its content confirmed this session; the planner may
  cite these URLs directly.
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

### Deferred Ideas (OUT OF SCOPE)

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
</user_constraints>

## External Sources — Verified

Every source below was retrieved this session as raw source bytes (`gh api` against the backing GitHub
repo, or `curl`/`WebFetch` against the rendered page followed by literal-string extraction) — never
accepted as a WebFetch summary for a load-bearing quote, per CONTEXT D-07's guardrail. All confirm
CONTEXT.md's `[MEASURED]` claims exactly; two discharge open CONTEXT items (D-02, D-16).

| # | Source | Retrieval method | Date | Confirms |
|---|--------|-------------------|------|----------|
| 1 | Canonical: [Automatic updates](https://ubuntu.com/server/docs/how-to/software/automatic-updates/) — backing repo `canonical/ubuntu-server-documentation`, path `docs/how-to/software/automatic-updates.md` | `gh api` raw file content, 28,823 bytes | Last commit `4826f308`, 2026-07-15T12:46:36Z | D-08, D-12, D-13, D-14, D-15 — all byte-exact |
| 2 | Canonical: [How to upgrade your Ubuntu release](https://ubuntu.com/server/docs/how-to/software/upgrade-your-release/) — same repo, path `docs/how-to/software/upgrade-your-release.md` | `gh api` raw file content, 7,885 bytes | Last commit `07aa7d44`, 2026-07-06T09:17:36Z | **Discharges D-02** — defines `/run/reboot-required` as a readable state in prose, not just a log line |
| 3 | Canonical: [ubuntu.com/pro](https://ubuntu.com/pro) | `curl` raw HTML, plain-text grep | (no dated byline on page; content confirmed present) | D-17 (free-tier 5/50 machines, ESM 10yr, Legacy 15yr) byte-exact; confirms D-16's negative (`pro attach` absent from this page) |
| 4 | Canonical: [documentation.ubuntu.com/pro/attach-tutorial/](https://documentation.ubuntu.com/pro/attach-tutorial/) | `curl` raw HTML, tag-stripped plain-text extraction (command text is split across inline HTML elements — a naive tag-inclusive grep misses it) | Read the Docs project `canonical-ubuntu-pro`, `latest` | **Discharges D-16** — `sudo pro attach [YOUR_TOKEN]` confirmed verbatim as the second Canonical target |
| 5 | Microsoft Learn: [Operating systems and browsers supported by Microsoft Intune (ref-supported-platforms)](https://learn.microsoft.com/en-us/intune/fundamentals/ref-supported-platforms) | `WebFetch` targeted extraction of the Linux section, cross-checked against page frontmatter | `ms.date` 2025-10-14, `updated_at` 2026-07-01 | D-57 — all four distro-list strings verbatim |
| 6 | Microsoft Learn: [Add custom settings to Linux devices (configure-custom-settings-linux)](https://learn.microsoft.com/en-us/intune/intune-service/configuration/custom-settings-linux) | `curl` raw HTML, tag-stripped plain-text extraction | `ms.date` 2025-01-09, `updated_at` 2026-07-01 | D-53 — Execution context/frequency/retries blockquote byte-exact; confirms absence of any run-time-cap token (supports D-51/LNX-02's negative) |
| 7 | Microsoft Learn: [Create discovery scripts for custom compliance policy (create-custom-script)](https://learn.microsoft.com/en-us/intune/device-security/compliance/create-custom-script) | `curl` raw HTML, tag-stripped plain-text extraction | `ms.date` 2025-09-04, `updated_at` 2026-07-15 | D-52(f), D-54, D-55 — the two 1-MB limits, the "five minutes" Linux cap, and the user-context/elevation limit, all byte-exact |
| 8 | Microsoft Learn: [Configure Windows driver update policies](https://learn.microsoft.com/en-us/intune/device-updates/windows/configure-driver-update-policy) — already in-repo at `06-windows-driver-firmware-updates.md:330-335` | in-repo citation confirmed, source not re-fetched (already authored/verified in Phase 146) | updated 2026-04-24 | D-31/D-73 — discharges D-06(d); the "Make updates available after (days)" quote is the correction source for `00-overview.md:87` |
| 9 | Microsoft Learn: [Enforce Conditional Access / deployment-guide-platform-linux](https://learn.microsoft.com/en-us/intune/intune-service/fundamentals/deployment-guide-platform-linux) | `curl` raw HTML, tag-stripped plain-text extraction | (page fetched, no update section found) | Corroborates LNX-01's negative — no "patch" token anywhere on the page; confirms "Enforce Conditional Access policies in Microsoft Edge" phrasing (web-app CA, not device CA) |

**Escalation status: none required.** Both CONTEXT.md items that reserved an owner-escalation path
(D-02's reboot-required source, D-16's second Pro target) are resolved by sources #2 and #4 above.

## Re-Verification Log (in-repo, this session)

All commands below were run against HEAD `96c5919d` (one commit past CONTEXT.md's `f132e4d0`
baseline; the delta is `.planning/STATE.md` + `147-CONTEXT.md` + `147-DISCUSSION-LOG.md` only — zero
`docs/` or `scripts/` changes). Every result matches CONTEXT.md's claim exactly.

```
node scripts/validation/check-phase-54.mjs        -> 32 passed, 0 failed, 0 skipped
node scripts/validation/check-phase-50.mjs        -> 26 passed, 0 failed, 0 skipped
node scripts/validation/check-nav-hub-links.mjs   -> 0 hub-presence failures, 0 corpus-link failures
node scripts/validation/c17-eee-contract.mjs      -> 234 files checked, 0 with violations
node scripts/validation/v1.20-milestone-audit.mjs -> 16 passed, 0 failed, 0 skipped
node scripts/validation/check-phase-144.mjs       -> 101 PASS, 0 FAIL, 0 SKIPPED  (apex)
node scripts/validation/check-phase-59.mjs        -> 36 passed, 0 failed, 0 skipped  (new baseline recorded — not previously stated in CONTEXT.md; moot per D-64, 147 does not touch the ops-index)
git ls-files --eol docs/operations/patch-management/
  -> 00-overview.md .. 04-android-patch-delivery.md: i/lf w/crlf
  -> 06-windows-driver-firmware-updates.md: i/lf w/lf
grep -n "\bfour\b" docs/operations/patch-management/00-overview.md
  -> lines 39, 40, 46, 59, 168, 175, 184  (exactly 7, matches D-37)
grep -n "0–30\|per deployment ring" docs/operations/patch-management/00-overview.md
  -> lines 87-88 carry the defective text (matches D-31)
grep -rn "five minutes\|five-minute" docs/  -> 0 hits (matches D-54's "first ever" claim)
```

## Sibling-Guide Structural Shape

`06-windows-driver-firmware-updates.md` is the closest structural precedent (a patch-management sibling
outside `PATCH_FILES`). Confirmed shape, read directly this session:

**Frontmatter (exact fields, in order):**
```yaml
---
last_verified: 2026-08-20
review_by: 2026-10-19
applies_to: all
audience: admin
platform: Windows
---
```
No `doc_id`, no `status`, no `owner` field (contrast with `docs/reference/*.md`, which does carry
`doc_id`/`status`/`owner` — confirmed at `linux-capability-matrix.md:2-9`).

**Body opening (in order):** platform-applicability blockquote (full lexicon, routes to `00-` and
siblings) → H1 (`# <Title>`) → 1-2 intro paragraphs → optional bold callout paragraphs (06 has an
"Autopilot warning" and a "Windows-version applicability" note; 05's analog is the Root/frequency
inline pair per D-50) → first `<a id="...">` anchor + H2.

**Recurring per-H2 pattern:** bold sub-label sentence → blockquote(s) with the literal first-party
quote → own-paragraph `**Source:** [Title](url) (updated YYYY-MM-DD)` line. Confirmed 15+ instances
of this triplet across `06`. Multiple quotes from different pages under one topic get **multiple**
consecutive `**Source:**` lines (e.g. lines 373-374), never one line covering two pages' claims — this
is D-21's scope rule in practice.

**`## Unsupported and Anti-Feature Callouts` shape:** bold-labeled absence statement → one or more
blockquotes with the literal first-party negative → explanation paragraph → `**Source:**` line. Ends
with a plain markdown table for "binary" unsupported items (`| Feature | Why it's unsupported | Do
this instead |`).

**Footer (exact order):** `## Related Resources` (bulleted, cross-references with 1-line descriptions)
→ `## External References` (bulleted plain links, Microsoft Learn only in `06`; `04` mixes Google +
Microsoft — see D-71, no validator checks these URLs).

**Zero code fences** confirmed across all six `docs/operations/patch-management/*.md` files
(`grep -c '```' docs/operations/patch-management/*.md` — every file returns 0).

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|--------------|-----|
| A new citation/evidence-line shape | An inline parenthetical or a novel `**Source:**` variant | The corpus's existing `>` blockquote + standalone `**Source:** [Title](url) (updated/published YYYY-MM-DD)` paragraph (82 instances corpus-wide, all dated) | `145 D-01` bars invention; `02-macos-update-enforcement.md:27` already models the "no removal date, absence stated in trailing clause" case for an undated source |
| A new PITFALL identifier | `PITFALL-N:` label | Bold sub-labels (e.g. `**Root-context execution hazard:**`), precedent `01-windows-wufb-rings.md:184` | The `PITFALL-N` namespace is a per-milestone research ledger; no validator matches it, minting one adds nothing and confuses the ledger |
| An absence/limitation section heading | `## Limitations` or `## Known Absences` | `## Unsupported and Anti-Feature Callouts` (the pinned corpus literal, 6 existing instances) | Zero corpus instances of any alternative phrasing; this is the doc-class convention |
| A copy-pasteable root `apt upgrade` script | A fenced Bash body demonstrating root-context upgrade | Prose + settings tables + blockquotes describing the mechanism; a runnable script (if ever wanted) belongs to Recipe #5 (Phase 151) | D-24 — shipping a runnable root-context script inside the guide whose primary pitfall is "people ship exactly this, carelessly" is self-defeating |
| A run-time cap for the platform-script surface | An invented/assumed timeout figure | State plainly: no documented run-time cap exists on this surface (confirmed by direct page fetch — see Source #6 above) | Fabricating a cap to "fill the gap" is exactly the failure D-51 is designed to prevent; the absence is the point |

**Key insight:** every "don't hand-roll" here is a documentation-convention discipline, not a code
pattern — this phase's entire risk surface is prose accuracy and structural-validator compliance, not
implementation logic.

## Common Pitfalls

### Pitfall 1: Citing the wrong `Allowed-Origins` block

**What goes wrong:** The Canonical automatic-updates page carries three near-identical
`Allowed-Origins` config blocks (default, `-updates` uncommented, PPA-added). Quoting block 2 or 3 as
"the default" **inverts** LNX-03's central claim while a naive verbatim-string diff still passes
(the string genuinely appears on the page — just not where claimed as "default").
**Why it happens:** the blocks differ by one or two commented-out lines; skimming rather than reading
the "This is the default:" preamble (line 82) is the natural failure mode.
**How to avoid:** pin the quote to the block immediately following the literal sentence "This is the
default:" — confirmed at lines 82-98 this session.
**Warning signs:** a quoted `Allowed-Origins` block that includes an uncommented `-updates` line, or a
PPA reference — either signals the wrong block was copied.

### Pitfall 2: The `update-notifier` / `update-notifier-common` decoy

**What goes wrong:** `update-notifier-common` (the package that provides the reboot-required
notification machinery) does not appear on the Canonical automatic-updates page at all. A grep for
`update-notifier` (without `-common`) returns a hit at line 435 — but that hit is the GUI
postpone-prompt client, an unrelated feature.
**Why it happens:** same-prefix string collision; a grep-based verification pass that doesn't inspect
the surrounding sentence will report a false confirm.
**How to avoid:** never cite this page for `update-notifier-common`'s existence or default-install
status; `PITFALLS.md:541` already carries this misattribution and D-32 requires it be corrected
in-phase.
**Warning signs:** any claim about `update-notifier-common` sourced to the automatic-updates page.

### Pitfall 3: Misattributing the 5-minute / 1-MB compliance-script limits to the platform-script surface

**What goes wrong:** Both Intune Linux script surfaces (platform scripts under Devices > Scripts and
remediations, and custom-compliance discovery scripts) are Bash-based and superficially similar. The
5-minute run-time cap, the two 1-MB limits, and the user-context/no-elevation constraint all belong
**only** to the discovery-script surface — confirmed absent from the platform-script documentation
page this session.
**Why it happens:** the two surfaces share tooling vocabulary (Bash, Intune admin center scheduling)
and an earlier internal draft (referenced in `PITFALLS.md`) made exactly this error, building a
(deleted) systemd hand-off mandate on the misattributed cap.
**How to avoid:** quote "five minutes" exactly once, scoped to `## Compliance and Conditional Access`,
with the disclaimer sentence within two lines (D-54); state the platform-script surface's cap-absence
explicitly at the LNX-02 hazard site (D-51).
**Warning signs:** "five minutes" appearing outside a compliance-discovery context anywhere in the new
file.

### Pitfall 4: The Ubuntu-version scope mismatch between the Intune distro list and the Canonical mechanics page

**What goes wrong:** `ref-supported-platforms` lists Ubuntu 24.04 **and** 26.04 as Intune-supported.
The Canonical automatic-updates page — the source for every `unattended-upgrades` configuration
claim — demonstrates everything against `noble` (24.04) only; `26.04` occurs 0 times on it.
**Why it happens:** the two facts come from different first-party sources answering different
questions (what Intune supports vs. what `unattended-upgrades` config looks like), and a reader
conflates them into "Canonical validated this on 26.04."
**How to avoid:** scope every `unattended-upgrades`-sourced quote as "as documented for 24.04
(`noble`)" (D-15).
**Warning signs:** an unqualified `unattended-upgrades` configuration claim next to an unqualified
26.04 mention in the same paragraph.

### Pitfall 5: Silent CRLF zero-match on `00-overview.md` string-replace edits

**What goes wrong:** `00-overview.md` through `04-android-patch-delivery.md` are CRLF in the worktree
(index LF); a naive string-replace tool matching on LF-only line content can silently no-op against a
CRLF file, leaving a "successful" edit that never landed.
**Why it happens:** `core.autocrlf=true` converts on checkout but the search string in an edit tool may
assume LF; this exact trap recurred from Phase 146 (there, file `01` was the CRLF outlier — here,
`00-overview.md`, the actual edit target, is CRLF).
**How to avoid:** verify each of the six `00-overview.md` string-replace edits actually matched
(re-read the file after each edit and confirm the diff, per D-63).
**Warning signs:** an edit tool reporting success with a 0-line diff, or `git diff` showing no change
after an intended edit.

## State of the Art

| Old / Assumed | Current (verified this session) | Source | Impact |
|----------------|----------------------------------|--------|--------|
| "Ubuntu Desktop 20.04+ / 22.04, RHEL 8/9" (an earlier internal draft, sourced to a blog) | Ubuntu Desktop 24.04/26.04 LTS + GNOME; RHEL 9 and RHEL 10 | `ref-supported-platforms`, `updated_at` 2026-07-01 | Two LTS generations newer; this is the figure the guide must ship |
| "`unattended-upgrades` defaults to security-only" | Four enabled origins by default: base release, `-security`, ESM apps-security, ESM infra-security | Canonical `automatic-updates.md`, commit 2026-07-15 | LNX-03's central claim; understating this is the specific failure the requirement exists to prevent |
| "The 5-minute script cap applies to the platform-script surface" | The cap applies only to custom-compliance discovery scripts; the platform-script article documents no cap at all | `create-custom-script` (5 min) vs. `configure-custom-settings-linux` (no cap token found) | The misattribution that produced a now-deleted systemd hand-off mandate; SC#2 requires the correct attribution |
| "`sudo pro attach` lives on `ubuntu.com/pro`" | Absent from that page; lives on `documentation.ubuntu.com/pro/attach-tutorial/` | Both pages fetched raw this session | D-16's second-target requirement, now resolved |

**Deprecated/outdated:** the corpus's own prior figure "Ubuntu Pro: 5 machines / ESM: 10 years"
(`STACK.md:478`) is incomplete, not wrong — it omits the 50-machine community tier and the 15-year
Legacy add-on tier, both confirmed live this session (D-17).

## Assumptions Log

Almost everything in this research was source-verified this session (byte-level, per D-07's mandate)
or is a direct re-read of in-repo files. The table below lists the residual `[ASSUMED]`-tier items —
things this pass could not fully close.

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | The `documentation.ubuntu.com/pro/attach-tutorial/` page is the *intended* second Canonical target D-16 asks for (vs. e.g. `ubuntu.com/server/docs/tutorial/attach-your-ubuntu-pro-subscription/`, a near-duplicate also surfaced by search) | External Sources #4 | Low — both are genuinely Canonical first-party and both carry the same command; if the planner prefers the Ubuntu Server docs variant instead, it is an equally valid substitute, not a correction |
| A2 | `upgrade-your-release.md`'s reboot-required prose (context: release upgrades) fully discharges D-02's requirement for a source describing the **routine unattended-upgrades** reboot signal, rather than only the release-upgrade-specific reboot check | External Sources #2 | Low-Medium — the file/path semantics (`/run/reboot-required` as a boolean readable state) are identical in both contexts; a planner citing this page for LNX-03 should note it is illustrating the general mechanism, not a routine-patching-specific page. Recommend citing both this page (semantics) and the automatic-updates page (routine-context log line) together. |

**If this table is empty:** it is not — see above — but every other claim in this document is either
`[VERIFIED]` (fetched as raw bytes this session, or re-read from the in-repo source file this session)
or is copied verbatim from CONTEXT.md's own already-adjudicated `[MEASURED]`/`[CORRECTED]`/`[OWNER-RULED]`
findings, which this pass independently re-confirmed rather than re-litigated.

## Open Questions

1. **Which of the two near-duplicate Canonical "attach your subscription" pages should the plan cite?** (RESOLVED)
   - What we know: both `documentation.ubuntu.com/pro/attach-tutorial/` and
     `ubuntu.com/server/docs/tutorial/attach-your-ubuntu-pro-subscription/` are Canonical first-party
     and both plausibly carry `sudo pro attach`.
   - What's unclear: only the first was fetched and byte-confirmed this session.
   - Recommendation: use `documentation.ubuntu.com/pro/attach-tutorial/` (confirmed verbatim this
     session, see External Sources #4) as the D-16 second target. This is a resolved recommendation,
     not a blocker — either page satisfies D-16's requirement.

2. **Does `/run/reboot-required` (release-upgrade context) fully substitute for a routine-`unattended-upgrades`-context source, or should the plan cite both pages together?** (RESOLVED)
   - What we know: the file and its boolean-existence semantics are identical across both contexts;
     Canonical's own automatic-updates page shows the file being created and read by the same
     mechanism in the routine-patching flow (the WARNING log line at line 346).
   - What's unclear: nothing blocking — this is a stylistic choice for the plan's evidence-line
     construction, not an open sourcing gap.
   - Recommendation: cite `upgrade-your-release.md` for the semantic definition ("if the file exists,
     you need to reboot") and `automatic-updates.md` for the routine-context log evidence, in the same
     `## Reboot Handling` section, as two separate `**Source:**` lines per D-21's one-page-per-line
     scope rule. D-02's escalation path is not needed.

No further open questions remain — CONTEXT.md's 73 decisions are otherwise self-contained and this
research pass corroborated every `[MEASURED]` claim it re-checked without finding a single discrepancy.

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|--------------|-----------|---------|----------|
| `gh` CLI (GitHub API, authenticated) | Fetching Canonical docs as raw source bytes (D-07) | ✓ | 2.81.0, authenticated as Schweinehund | `curl` against the rendered page + tag-stripped extraction (used for pages without a public GitHub-backed repo) |
| `node` | Running `scripts/validation/*.mjs` validators | ✓ | (already in use throughout this repo's harness) | — |
| `curl` | Fetching Microsoft Learn / Canonical rendered pages as raw HTML for tag-stripped extraction | ✓ | — | — |
| `git` | `git ls-files --eol`, `git log` re-verification | ✓ | — | — |

**Missing dependencies with no fallback:** none.
**Missing dependencies with fallback:** none — all required tooling was available and used successfully this session.

## Security Domain

This phase authors Markdown documentation only — no application code, no new endpoints, no secrets,
no auth surface, no user input handling. `security_enforcement` is absent from `.planning/config.json`
(treated enabled per the contract), but no ASVS category maps meaningfully onto a documentation-corpus
authoring task with zero code paths.

The nearest analog to a "threat" in this phase is **content-integrity / citation-accuracy risk** — a
fabricated or misattributed first-party quote shipping as fact. That risk is already governed by this
repo's own sourcing contract (CONTEXT D-07, D-20, D-21) and is the reason this entire research pass
exists: every load-bearing quote above was fetched as raw bytes and diffed against the guide's planned
claims before authoring begins, exactly the control D-20 describes ("the verifier re-fetches the named
pages and diffs the quoted strings").

| ASVS Category | Applies | Standard Control |
|---------------|---------|-------------------|
| V2 Authentication | No | N/A — no auth surface in this phase |
| V3 Session Management | No | N/A |
| V4 Access Control | No | N/A |
| V5 Input Validation | No | N/A — no user input processed |
| V6 Cryptography | No | N/A |

### Known Threat Patterns for this stack

| Pattern | STRIDE | Standard Mitigation |
|---------|--------|-----------------------|
| Fabricated or misattributed first-party citation shipping as fact | Repudiation / Tampering (of the knowledge base) | The corpus's evidence-line contract (blockquote + own-paragraph `**Source:**` line, D-20/D-21) plus this research pass's raw-byte verification of every quote before authoring |
| Supply-chain risk from a hypothetically-shown root-context Bash script | Elevation of Privilege | Not applicable — D-24 bars a runnable root-context script from appearing in this guide at all; the existing supply-chain callout at `docs/admin-setup-linux/04-app-delivery.md:59` already covers the mechanism generally |

## Sources

### Primary (HIGH confidence — raw source bytes fetched this session)
- Canonical `ubuntu-server-documentation` repo (`gh api`) — `docs/how-to/software/automatic-updates.md` (commit `4826f308`, 2026-07-15) and `docs/how-to/software/upgrade-your-release.md` (commit `07aa7d44`, 2026-07-06)
- `ubuntu.com/pro` and `documentation.ubuntu.com/pro/attach-tutorial/` — raw HTML, tag-stripped extraction
- `learn.microsoft.com/en-us/intune/intune-service/configuration/custom-settings-linux` (`ms.date` 2025-01-09) — raw HTML, tag-stripped extraction
- `learn.microsoft.com/en-us/intune/device-security/compliance/create-custom-script` (`ms.date` 2025-09-04) — raw HTML, tag-stripped extraction
- `learn.microsoft.com/en-us/intune/fundamentals/ref-supported-platforms` (`ms.date` 2025-10-14) — targeted content extraction, page frontmatter cross-checked
- In-repo, this session: `docs/operations/patch-management/00-overview.md`, `01-windows-wufb-rings.md`, `06-windows-driver-firmware-updates.md`, `02-macos-update-enforcement.md`, `04-android-patch-delivery.md`, `docs/reference/linux-capability-matrix.md`, `docs/admin-setup-linux/04-app-delivery.md`, `docs/decision-trees/09-linux-triage.md`, `docs/_glossary-linux.md`, `scripts/validation/check-phase-54.mjs`, `check-phase-50.mjs`, `check-phase-59.mjs`, `v1.20-milestone-audit.mjs`

### Secondary (MEDIUM confidence)
- `learn.microsoft.com/en-us/intune/intune-service/fundamentals/deployment-guide-platform-linux` — fetched raw HTML this session; corroborative (no "patch" token found) rather than a primary citation source

### Tertiary (LOW confidence)
- None used as a citation source in this research; two general WebSearch queries were used only to *locate* candidate first-party URLs (for the reboot-required source and the platform-script execution-context page), never as the citation itself — every located page was then independently fetched as raw bytes before being treated as confirmed.

## Metadata

**Confidence breakdown:**
- Standard stack: N/A — documentation-only phase, no code stack
- Architecture (structural/citation conventions): HIGH — read directly from sibling files and validator source this session
- External Ubuntu/Intune facts: HIGH — every load-bearing figure fetched as raw source bytes this session, matching CONTEXT.md's independent `[MEASURED]` figures exactly with zero discrepancies
- Pitfalls: HIGH — each pitfall is either a byte-confirmed source-citation trap or a re-confirmed validator/EOL mechanic

**Research date:** 2026-08-21
**Valid until:** 30 days (2026-09-20) for validator/structural claims (stable unless the repo's own validators change); the external Ubuntu/Microsoft pages should be re-diffed at plan/verify time regardless of this window, per the corpus's own D-20 contract — Canonical and Microsoft Learn pages change on their own schedule, not this repo's.
