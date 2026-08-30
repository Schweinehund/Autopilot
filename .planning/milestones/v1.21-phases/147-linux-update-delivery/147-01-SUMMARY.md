---
phase: 147-linux-update-delivery
plan: 01
subsystem: documentation-corpus
tags: [linux, ubuntu, patch-management, unattended-upgrades, ubuntu-pro, livepatch, compliance]
status: complete
requires:
  - docs/operations/patch-management/06-windows-driver-firmware-updates.md (structural analog)
  - docs/admin-setup-linux/04-app-delivery.md (platform-script mechanism, cross-linked not re-authored)
  - docs/reference/linux-capability-matrix.md (reconciled, not edited)
  - docs/reference/4-platform-capability-comparison.md (reconciled, not edited)
  - .planning/phases/147-linux-update-delivery/147-RESEARCH.md (byte-verified quote bank)
provides:
  - docs/operations/patch-management/05-linux-update-delivery.md
  - "8 anchor ids: what-intune-can-and-cannot-do, deferral-enforcement-attestation, bash-platform-script-delivery, configuring-unattended-upgrades, reboot-handling, ubuntu-pro-livepatch, compliance-conditional-access, unsupported-callouts"
  - "H1 '# Linux Update Delivery' — Phase 152's registry Title input"
affects:
  - plan 02 (00-overview.md six edit sites; routing bullet and Related Resources entry point at this file)
  - Phase 148 (cross-links to the eight anchors)
  - Phase 151 Recipe #5 (Linux row synthesis; constrained to attestation-only decisions)
  - Phase 152 (registry row, filename-map row, ops-index row, nav-hub wiring — none of it this phase)
tech-stack:
  added: []
  patterns:
    - "blockquote + standalone **Source:** paragraph, one Source line per one contiguous blockquote from one page (R7, D-21)"
    - "Canonical sources dated from backing-repo commit date; undated Canonical pages use (retrieved YYYY-MM-DD) plus a trailing absence clause, per 02-macos-update-enforcement.md:27 (R8, D-09)"
    - "bold sub-labels for named pitfalls, no PITFALL-N identifier (D-26)"
    - "own-line <a id> above each major H2 (D-69)"
    - "zero code fences in docs/operations/patch-management/ (R2, D-23)"
key-files:
  created:
    - docs/operations/patch-management/05-linux-update-delivery.md
  modified: []
decisions:
  - "LIN-DEFER-01 is NOT discharged by Phase 147 — this is an update guide, not the promised Bash custom-compliance deep-dive; the standing promise at 04-app-delivery.md:104/:78 and 03-compliance-policy.md:86 stays open (D-43)"
  - "FEATURES.md D-3's [PREMISE] label is NOT deleted — the substitute Canonical authority carries one of its three facts, and irrelevant-versus-lapsed is an owner-level judgement this phase does not make unilaterally (D-11)"
  - "No glossary entry added for unattended-upgrades, Livepatch, Ubuntu Pro or 'platform script' — no v1.21 requirement covers glossary additions and _glossary-linux.md is C17-enrolled; PROJECT.md:31's terminology scope statement is left stale and unassigned (D-47)"
  - "STACK.md:478 flagged for correction (NOT edited this plan): its '5 machines' and 'ESM provides 10 years' figures are incomplete — they omit the 50-machine official-Ubuntu-Community-members tier and the 15-year Legacy add-on — and it names ubuntu.com/pro as the verification target for the pro attach command, which that page does not carry (D-16, D-17)"
  - "The four sibling routing blockquotes in 01/02/03/04 each enumerate the other three platform siblings and now silently omit Linux. Knowingly accepted, not a new defect — the roadmap's blast radius locks edits to 00-overview.md only (D-49)"
  - "External References ships four Microsoft plus four Canonical pages, not five Microsoft — the driver-update-policy page is plan 02's correction source and R9 rules driver/firmware a Windows surface with no Linux analog (owner-ratified deviation)"
metrics:
  duration: ~75 min
  completed: 2026-08-21
  tasks: 3
  commits: 1
actuals:
  tokens: 20500
  tasks: 3
  commits: 1
---

# Phase 147 Plan 01: Linux Update Delivery Summary

Authored `docs/operations/patch-management/05-linux-update-delivery.md` (482 lines, 10 H2s, 8 contract
anchors, 11 first-party `**Source:**` lines, zero code fences) — the corpus's first Linux
patch-management guide, stating that Intune has no update policy for Linux at all and that the honest
framing is delivery plus attestation, never orchestration or enforcement.

## What Shipped

| Section | Requirement | Substance |
|---|---|---|
| What Intune Can and Cannot Do | LNX-01, SC#1 | "There is no native Intune Linux update policy" stated as an outright negative; reconciled with both reference matrices via **"Intune does not orchestrate Linux updates; it delivers a script that does"** — neither matrix edited |
| Deferral, Enforcement and Attestation | LNX-01, SC#1 | Mapped onto `00-overview.md#deferral-vs-enforcement`'s existing triad. Deferral: none tenant-side. Enforcement: **no primitive exists at all**. Attestation: the one Linux has. CA lever narrowed to web access to Entra-protected apps via Microsoft Edge for Linux 102.x and later (D-30) |
| Delivering Updates with a Bash Platform Script | LNX-01 + LNX-02 | D-53 execution-defaults blockquote byte-exact; Root-versus-User pair with the frequency consequence in the same breath; cap-absence clause; cross-links the mechanism rather than re-authoring it (D-44) |
| Configuring unattended-upgrades | LNX-03, SC#3 | Default `Allowed-Origins` block — **four enabled origins, three commented out** — pinned to the block the page's own `This is the default:` preamble introduces; 24.04 / `noble` scoping clause (D-15) |
| Reboot Handling | LNX-03, SC#3 | `Automatic-Reboot` (default `false`) versus `Automatic-Reboot-WithUsers` (default `true`) distinguished explicitly; marker defined as a readable state from `upgrade-your-release.md`; both path spellings stated, no equivalence asserted |
| Ubuntu Pro and Livepatch | LNX-04, SC#4 | Structural claim leads; every figure re-verified and bound to its own tier; attach command cited to `attach-tutorial`, never to `ubuntu.com/pro` |
| Compliance and Conditional Access | LNX-01 + LNX-04 | Pointer-only on script authoring and cadence (D-45 SSoT firewall); the five-minute quarantine with its disclaimer one line above the string |
| Unsupported and Anti-Feature Callouts | LNX-02, SC#2 | Root-context hazard as the **first** bold sub-label, all four SC#2 conjuncts, the 96-runs-a-day arithmetic, six absence sub-labels, closing binary table |

## Validation Gates — Actual Output

All eight R1 baselines held exactly. The apex ran twice: once before the file existed, once after the commit.

| Gate | Actual output | Baseline | Result |
|---|---|---|---|
| `check-phase-144.mjs` (apex, **before** file creation) | `Result: 101 PASS, 0 FAIL, 0 SKIPPED (total checks: 101)` | 101/0/0 | PASS |
| `v1.20-milestone-audit.mjs` | `Summary: 16 passed, 0 failed, 0 skipped` | 16/0 | PASS |
| `check-nav-hub-links.mjs` | `check-nav-hub-links summary: 0 hub-presence failure(s), 0 corpus-link failure(s), 0 total` | 0/0 | PASS |
| `c17-eee-contract.mjs` | `C17 summary: 234 files checked, 0 with violations, 0 total violations` | 234/0 | PASS — **234, not 235**; the no-`doc_id` rule held |
| `check-phase-54.mjs` | `Summary: 32 passed, 0 failed, 0 skipped` | 32/0/0 | PASS |
| `check-phase-50.mjs` | `Summary: 26 passed, 0 failed, 0 skipped` | 26/0/0 | PASS |
| `build-filename-map.mjs --self-test` | `8 passed, 0 failed` | 8/0 | PASS — mechanical proof no registry row landed |
| `build-publish-bundle.mjs --self-test` | `15 passed, 0 failed` | 15/0 | PASS — second canary, same proof |
| `check-phase-144.mjs` (apex, **after** commit) | `Result: 101 PASS, 0 FAIL, 0 SKIPPED (total checks: 101)` | 101/0/0 | PASS |

## Checkpoint

The plan's blocking `checkpoint:decision` — three sourcing rulings no gate in this repository can
catch, since `grep -rn "Source:" scripts/` returns 0 — was surfaced after Task 1 and resolved by the
owner as **proceed** under all three. Tasks 2 and 3 were authored under them:

- **Ruling 1 (D-14):** `Allowed-Origins` pinned to the default block. Verified by one positive and two
  negative greps — see Deviation 1a for the one criterion that is mis-specified.
- **Ruling 2 (D-02):** two claims, two pages, two separate own-line `**Source:**` lines. Both path
  spellings stated and attributed; no equivalence asserted; actionable framing is "check both paths".
- **Ruling 3 (D-13 versus D-52 item (d)):** item (d) ships as the `Automatic-Reboot` prerequisite
  fully sourced with D-12's rewording, plus an explicit documented-silence statement.
  `update-notifier-common` occurs once, in prose, never inside a blockquote.

## Deviations from Plan

### 1. [Rule 1 - Bug] Two acceptance criteria are mis-specified and cannot be satisfied as written

Both are criterion defects, not content defects. Both intents were verified with corrected probes.

**1a — the `-updates` negative criterion (Task 2).** The plan asserts that
`grep -cE '^>.*[^/] "\$\{distro_id\}:\$\{distro_codename\}-updates";'` returns `0` as proof that no
uncommented `-updates` entry was quoted. It returns `1`, and the matching line is the *correctly
commented* line at :193 — `> //  "${distro_id}:${distro_codename}-updates";`. Canonical writes `//`
followed by **two** spaces, so the character immediately before the space-quote sequence is itself a
space, which satisfies `[^/]`. The criterion matches the very commented form it was written to exclude.

Corrected probe, run and recorded:
`grep -cE '^>[[:space:]]+"\$\{distro_id\}:\$\{distro_codename\}-updates";'` returns **0** — no
uncommented entry inside any blockquote. Corroborating evidence that the default block was quoted: the
plan's positive criterion returns **3** (all three trailing entries present and still commented),
`grep -c 'LP-PPA'` returns **0**, and a bare `grep -c 'PPA'` also returns **0**.

**1b — the platform-script five-minute negative criterion (Task 3).** The plan asserts the
platform-script section returns `0` for `grep -cE 'five minutes|five-minute|5 minutes'`. It returns
`1`. The `5 minutes` alternation has no left word boundary, so it matches inside `Every 15 minutes` —
the first-party default string that Task 1's own criterion *requires* be present. The two criteria are
mutually unsatisfiable as literally written.

Corrected probe, run and recorded: `grep -cE 'five minutes|five-minute|(^|[^0-9])5 minutes'` over the
platform-script section returns **0**. The cap is never attributed to the platform-script surface.
Supporting evidence: the string occurs exactly **1** time in the whole file, inside
`## Compliance and Conditional Access`.

### 2. [Owner-ratified] External References ships four Microsoft pages, not five

The plan's Task 1 action says External References carries "the five Microsoft Learn pages and the four
Canonical pages" from `147-RESEARCH.md`'s nine-row table. The fifth Microsoft row is
[Configure Windows driver update policies](https://learn.microsoft.com/en-us/intune/device-updates/windows/configure-driver-update-policy),
which RESEARCH assigns to D-31/D-73 as the correction source for `00-overview.md:87` — **plan 02's**
edit site — and R9 rules driver and firmware a Windows surface with no Linux analog. Listing a Windows
driver-policy page in a Linux update guide's External References is a category error the plan's own
reasoning argues against. Surfaced at the checkpoint and **ratified by the owner**: four Microsoft plus
four Canonical is correct.

### 3. [Rule 3 - Blocking] The attach command ships as prose, without a placeholder-token literal

`147-RESEARCH.md` carries the attach command with **two different placeholder spellings** — the D-16
`[RESOLVED]` annotation writes it with spaces inside the brackets, while the
`## External Sources — Verified` table row 4 writes it without. R6 bars re-fetching to settle the
difference, and shipping either as a verbatim quote would gamble on a byte that a re-fetch-and-diff
verifier checks. Resolution: the command stem `sudo pro attach` — on which both RESEARCH forms agree
byte-exactly — ships as inline code inside the guide's own prose, followed by "the subscription token"
in words. No blockquote, so R6 is satisfied; no placeholder literal, so T-147-03's
credential-in-example risk is reduced rather than merely managed. D-16's actual obligations (name the
command, cite the second Canonical target) are both met.

### 4. [Rule 2 - Missing] The triad section carries no external Source line

The plan's Task 2 action suggests citing Microsoft for the Conditional Access narrowing. RESEARCH row 9
(`deployment-guide-platform-linux`) records **no `updated_at` value** — "(page fetched, no update
section found)". R8 requires a Microsoft Learn page to carry an `ms.date`-derived `(updated YYYY-MM-DD)`
field, and inventing one is exactly the fabrication class T-147-02 exists to prevent. The section
instead cites `docs/_glossary-linux.md` and `docs/reference/linux-capability-matrix.md` as relative
links, which is precisely what D-30 instructs. The file's Source-line count is **11**, well over the
required 7.

### 5. [Rule 1 - Bug] Disclaimer line-wrap adjusted after measurement

The first draft wrapped the five-minute disclaimer so that `grep -B2` returned the fragment
"to platform scripts:" rather than a complete sentence. Re-wrapped so the line at -2 reads in full:
"The limits quoted below belong to custom compliance discovery scripts, and not to platform scripts:".
The `**Source:**` line still sits at +2, so R7's "immediately after the claim" holds.

## Prohibitions — Verified

| Prohibition | Check | Result |
|---|---|---|
| No copy-pasteable root-context fleet-wide upgrade command (LNX-02, T-147-01) | `grep -cnE` over the apt upgrade / dist-upgrade / full-upgrade / sudo apt alternation | **0** |
| No code fences at all (R2, D-23) | `grep -cE '^\s*```'` | **0** |
| Intune never framed as orchestrating, scheduling, deferring or enforcing (LNX-01) | `does not orchestrate` present twice; `no native` present; enforcement stated as an absence in three sections | PASS |
| RHEL gap never left implicit (LNX-01, D-01) | `RHEL 9` and `RHEL 10` in the scope paragraph; restated as an absence sub-label and as a table row in the callouts | PASS |
| No advice to weaken a security posture (LNX-03) | Section 4 explicitly bars removing a security origin, disabling automatic security updates, or widening origins outside a change process | PASS |
| Phase-50 compliance-script SSoT not re-authored (LNX-04, D-45) | Section 7 is pointer-only; no Bash body, no evaluation-cadence figure; `03-compliance-policy.md` linked twice | PASS |
| No `doc_id`, no `## Version History`, no `PITFALL-`, no `systemd` / `dnf-automatic` / `yum-cron`, no `SCCM` / `System Center`, no `TBD` / `TODO` / `FIXME` / `PLACEHOLDER`, no `behaviour` in the guide's own prose | one grep each | **all 0** |
| Nothing outside the one file touched (R11, D-64) | `git show --stat HEAD` | **1 file changed, 482 insertions(+)**; `docs/reference/` and `docs/admin-setup-linux/` clean; zero deletions |

## Handed Forward

**To plan 02 (commit 2 of D-59).** The file exists and is referenced by nothing.
`check-nav-hub-links`'s hub-presence check asks only whether the four ratified nav-hubs exist — it is
not orphan detection — so the corpus is green, not red, between the two commits. `00-overview.md` is
CRLF in the worktree while this new file is LF: **verify every string replacement actually matched, a
zero-match is silent** (D-63).

**To Phase 151 (Recipe #5), per D-73.** The eight anchor ids listed in the frontmatter are the
cross-link contract the recipe cannot author for itself; the guide is Ubuntu-scoped by owner ruling;
and **Linux has no enforcement primitive at all**, which constrains every Linux decision a prescriptive
artifact can express to an attestation-only decision.

**To Phase 152.** The H1 `# Linux Update Delivery` is the registry Title input. No registry row,
filename-map row, canary bump, ops-index row or nav-hub wiring was created — both canaries verified
green at 225 rows as mechanical proof.

## Known Stubs

None. All ten sections are authored at final quality; zero placeholder sentences survive. The two
`grep 'This section '` hits at :238 and :335 are authored prose, not placeholders.

## Threat Flags

None. No new network endpoint, auth path, file-access pattern or schema change — the deliverable is one
Markdown document. T-147-03 (a credential literal in a shipped example) is reduced below its planned
residual by Deviation 3: no placeholder token literal ships at all.

## Self-Check: PASSED

- `docs/operations/patch-management/05-linux-update-delivery.md` — FOUND (482 lines)
- Commit `8189c560` — FOUND in `git log`, `1 file changed, 482 insertions(+)`, 0 deletions
- All eight R1 gate baselines re-measured and recorded above with actual output
