---
phase: "157"
slug: "std-hyg-authoring-standard-corpus-hygiene"
status: secured
# threats_open = count of OPEN threats at or above workflow.security_block_on severity (the blocking gate)
threats_open: 0
asvs_level: 1
created: "2026-09-06"
---

# Phase 157 — Security

> Per-phase security contract: threat register, accepted risks, and audit trail.

Register origin: **authored at plan time** — all seven PLAN.md files carry a `<threat_model>`
block. 35 numbered threats (T-157-01 … T-157-35) plus `T-157-SC` repeated once per plan.
Verified by three parallel `gsd-security-auditor` runs at ASVS level 1, `block_on: high`, under
the verify-mitigations constraint (no new-threat scanning), split 01–03 / 04–05 / 06–07.

**One threat opened and was closed by remediation, not by acceptance.** T-157-25 was found open
at `high`; the defect was corrected in commit `9a68aa1a` and every gate re-run green. See the
audit trail.

---

## Trust Boundaries

| Boundary | Description | Data Crossing |
|----------|-------------|---------------|
| repository prose → published SharePoint corpus | Edited `docs/` prose is converted to `.docx` and indexed for Copilot Studio retrieval; a false claim crosses undetected by any validator | 44 C17-enrolled files edited across plans 01–03, plus plan 05's five hub sites and plan 06's five glossary entries |
| planning artifacts → later-phase automation | `157-BASELINE.json`'s numbers are consumed as equality targets by plans 02–07 | apex 111/0/0, C17 237/0, needles 2/2/83, `tracked_md` 294 — re-derived from `git archive 1cd8c4d7`, not trusted from the JSON |
| evidence marker → reader trust | The `[CITED: …]` convention signals sourced versus assumed claims; degrading a marker silently downgrades the reader's ability to judge | 118 markers corpus-wide, unchanged across 83 substitutions |
| corpus source → pipeline test fixtures | `scripts/pipeline/test-fixtures/` holds a near-identical sentence to a real corpus file; editing it while chasing a corpus string would change a frozen test input | Confirmed byte-unchanged |
| `git ls-files` output → subprocess argument list | Repo-tracked filenames passed to a Python interpreter as argv elements, never a shell string | Filenames (repo-controlled) → subprocess argv |
| gate verdict → developer and CI trust | A `check-prose-style.py` exit 0 reads as "the corpus is clean" once Phase 159 wires it into CI; a gate that cannot fire would be a lie costing more than no gate | Boolean pass/fail → human and gate decision |
| `.planning/REQUIREMENTS.md` → 20-plus live readers | Read live by three check-phase validators, twenty milestone-audit harnesses and fifteen workflows | Preamble text → validator assertions |
| corpus citation → vendor fact | A citation date parenthetical asserts when a vendor page was last current; a wrong date silently ages or freshens a claim | Vendor page `ms.date` → corpus citation text |
| prose edit → frozen byte-pin | `docs/reference/macos-capability-matrix.md` is read frozen-to-frozen by `check-phase-63.mjs`; safety depends on the live file's structure not moving | Live file bytes → frozen-snapshot comparison |
| glossary definition → reader understanding | A glossary is where a reader resolves an unfamiliar term; a definition stating more than its cited guide supports is worse than no entry, because the reader stops looking | Corpus guide content → glossary H3 body — **this boundary was breached, see T-157-25** |
| glossary structure → live validators | `check-phase-49.mjs` reads both glossaries live for structural assertions (mandatory H2s, collision rule, pinned reciprocal links) but **not content accuracy** | Glossary bytes → validator PASS/FAIL |
| seed metadata → milestone close gate | `audit.cjs`'s `scanSeeds` reads seed frontmatter `status` but recognizes only `{dormant, active, triggered}`; this repository's `planted`/`closed` vocabulary is off-schema and invisible to it | Seed frontmatter → close-gate scan |
| authoring standard → every future corpus document | The new `## Prose Style Authoring Standard` section is the text future authors are held to; a rule stated wrongly propagates into every document written after it | Standard section text → author's context at document-creation time |
| vendored skill → session runtime | Two copies of the authoring skill exist, one tracked and one untracked in the user profile; which loads is environment-dependent, and the **verifier exists only at project level** | Skill-load resolution → whether bulk rewrites get verified |
| template comment block → new document | Eight templates are copied verbatim to start new documents; a wrong pointer is inherited by every document started from that template, invisibly to the link checker which excludes `docs/_templates/` as a link source | Template `Rules:` bullet → new document's authoring context |

---

## Threat Register

| Threat ID | Category | Component | Severity | Disposition | Mitigation | Status |
|-----------|----------|-----------|----------|-------------|------------|--------|
| T-157-01 | Tampering | `EEE-SOP-standard.md` prose edit | high | mitigate | Criteria assert the NEW string present, not merely the old one gone; both replacement strings fire live at `:577` and `:674`, old backticked path absent | closed |
| T-157-02 | Spoofing | `157-BASELINE.json` contents | high | mitigate | All three needle counts and `tracked_md` re-derived from `git archive 1cd8c4d7` tree bytes — literal 2, fix11 2, class 83, 294 — exact match; six-invariant re-parse returns `baseline OK` | closed |
| T-157-03 | Repudiation | FIX-11's traceability row | medium | mitigate | `v1.21-REQUIREMENTS.md:195,244` names both SHAs (`9fd7cf1c`, `285a65d5`) and the link-only-regex blind spot; bare "Complete" row count 0 | closed |
| T-157-04 | Denial of Service | vacuous negative grep | high | mitigate | All needles use the recursive per-file form summed by awk = 0/0/0; positive control on scratch = 1/1/1; bare `grep -c '\.planning/' docs/` demonstrated to error `Is a directory` and print 0 | closed |
| T-157-05 | Tampering | 48 substitutions across 14 runbooks | high | mitigate | Class needle 0 in `apple-business/`; all five external source ids survive; `[CITED:` count 118 unchanged | closed |
| T-157-06 | Tampering | D-04's four protected quotations | high | mitigate | All four byte-diffed against `git show 1cd8c4d7:<path>` — IDENTICAL | closed |
| T-157-07 | Denial of Service | the zero-asserting needle | high | mitigate | Positive control returns non-zero on a scratch known-bad token; apex 111/0/0 equals baseline | closed |
| T-157-08 | Tampering | C17 #12's 200-char blockquote cap | medium | mitigate | `c17-eee-contract.mjs` re-run live: 237 files, 0 violations | closed |
| T-157-09 | Tampering | two three-line-wrapped clone parentheticals | high | mitigate | `git diff 1cd8c4d7` on both files shows a clean rejoined bullet, no orphan fragment, no half-deleted line | closed |
| T-157-10 | Tampering | `scripts/pipeline/test-fixtures/` | medium | mitigate | `git diff --exit-code` exits 0 — byte-unchanged | closed |
| T-157-11 | Tampering | Version History / Changelog rows | medium | mitigate | Row diff shows paired `-`/`+`, cell-content only, same column count | closed |
| T-157-12 | Denial of Service | three zero-asserting needles | high | mitigate | All three fire non-zero on scratch known-bad input, all three return 0 live | closed |
| T-157-13 | Tampering | `docs/v1.9-DEFERRED-CLEANUP.md` retention | medium | mitigate | File exists at path and carries its corrected `PSSO-FUT-01` line | closed |
| T-157-14 | Tampering | subprocess invocation of `check.py` and `git` | medium | mitigate | `grep -n "shell=True\|os.system"` exits 1; all three `subprocess.run` sites use argument-list literals | closed |
| T-157-15 | Denial of Service | a gate reporting zero because it read nothing | high | mitigate | All three guards reproduced live: self-test 7/7; file-count floor 294 == 294; **empty-repo test returned "Refusing to report a false zero-findings pass", exit 1** | closed |
| T-157-16 | Tampering | a hand-rolled protection filter | high | mitigate | `PROTECT`/`FENCE`/`HEADING`/`KEEP_LINE`/`quoted_lines` genuinely imported from `sweep3.py` via `importlib`, not re-transcribed; self-test cases 3/4 hand-traced to discriminate BOTH a suppress-everything and a suppress-nothing filter | closed — see note 1 |
| T-157-17 | Spoofing | substring-matching a rule name | medium | mitigate | `check.py:159`'s print format byte-matched against `HIT_RE`; rule id taken from the bracket capture group, note text never substring-matched | closed |
| T-157-18 | Tampering | editing a file 20+ validators read live | high | mitigate | apex `check-phase-153` 111/0/0 equals baseline; `check-phase-54` 32/0 run separately | closed |
| T-157-19 | Elevation of Privilege | milestone-lifetime assertion welded into a permanent gate | medium | mitigate | Exactly 6 assertions exist; prohibited assertion (c) absent from the file | closed |
| T-157-20 | Tampering | corpus-wide date substitution | high | mitigate | Old citation date 0 occurrences, new 11; `^review_by: 2026-06-19` count = 5, matching the five named files — a blind substitution would have zeroed this too | closed |
| T-157-21 | Tampering | capability matrix's frozen byte-pin | high | mitigate | `git show --numstat` = `1 1`; `check-phase-63.mjs` 32 PASS / 0 FAIL | closed |
| T-157-22 | Tampering | `check-phase-54.mjs`'s column-order assertion | high | mitigate | 32/32 PASS including `V-54-08`, the column-order/platform-presence assertion | closed |
| T-157-23 | Tampering | a false planning limit reaching a reader | high | mitigate | Both new limit strings present; both old-parenthetical variants 0 occurrences — presence-asserted, not absence-only | closed |
| T-157-24 | Spoofing | a link that resolves to nothing | medium | mitigate | Explicit `<a id="eam-store-winget-routing">` confirmed present; nav-hub 0/0; double-hyphen slug 0 occurrences; validator's anchor model confirmed to cover explicit `<a id>` tags, so the 0 genuinely covers this link | closed |
| T-157-25 | Tampering | an invented glossary definition | high | mitigate | **Opened by the audit.** `_glossary-linux.md:143` asserted `/run/reboot-required` was "the same file the `unattended-upgrades` log output also references" — a claim its cited guide explicitly refuses. Remediated in `9a68aa1a`; all gates re-run green | closed — see AR-157-01 |
| T-157-26 | Tampering | `check-phase-49.mjs`'s live glossary assertions | high | mitigate | 22 passed / 0 failed; all five mandatory H2s, V-49-19 collision rule and V-49-20/21/22 reciprocal-link pins PASS (re-run again after the T-157-25 fix) | closed |
| T-157-27 | Tampering | advancing a freshness field | medium | mitigate | Both files unchanged at `2026-06-29`/`2026-09-27`; dedicated Version History rows cite the deliberate non-advance per D-63 (re-confirmed byte-unchanged after the T-157-25 fix) | closed |
| T-157-28 | Spoofing | a duplicate anchor capturing inbound links | medium | mitigate | Each new H3 occurs exactly once; `^### ` count 51 in `_glossary.md`, `^## ` count 9; no slug collision | closed |
| T-157-29 | Repudiation | closing a seed without stating what closure means | medium | mitigate | `SEED-001` reads `status: closed`, `--numstat` = `1 1`; summary carries the rationale-false statement, the `{dormant,active,triggered}` set, "mechanically inert", and the inverse-normalization risk | closed |
| T-157-30 | Tampering | the new normative section's own text | high | mitigate | `_JUDGE-VERDICTS.json` `counts` re-derived = `{STRENGTHENED:26, PRESERVED:360, INVERTED:19, WEAKENED:1}`; section states 26/19/360/one verbatim-matching, as plain `###` prose never a blockquote | closed |
| T-157-31 | Tampering | reintroducing the leak just removed | high | mitigate | Section-scoped grep 0; corpus-wide awk-summed 0; `wc -l` cross-check 0 — two independent methods | closed |
| T-157-32 | Spoofing | an unpinned section rewritten by a later sweep | medium | mitigate | Heading present exactly once in both pin files; `wc -l` 563/187 against pre-phase 562/186 — exactly +1 each, no displaced row | closed |
| T-157-33 | Repudiation | the two-copy skill divergence | medium | mitigate | `google-style-verify/` byte-unchanged across the phase (`git diff --exit-code` = 0); risk recorded verbatim in both the standard's D-05 and the plan summary | closed |
| T-157-34 | Denial of Service | relying on the link checker to prove template wiring | medium | mitigate | Nine-file paired grep run live: 9/9 carry both the heading name and the `EEE-SOP-standard.md` path — proof by grep, since the validator structurally excludes `docs/_templates/` | closed |
| T-157-35 | Elevation of Privilege | milestone-lifetime wiring welded into the gate | medium | mitigate | `git diff --stat -- .github/` empty; `check-prose-style` absent from `check-phase-153.mjs` (grep count 0); apex 111/0/0 | closed |
| T-157-SC (×7, one per plan) | Tampering | package-manager installs | low | accept | No npm/pip/cargo install runs in this phase; no dependency manifest touched by any phase commit; the gate imports Python stdlib only; RESEARCH.md's Package Legitimacy Audit records the phase as not-applicable | closed |

*Status: open · closed · open — below high threshold (non-blocking)*
*Severity: critical > high > medium > low — only open threats at or above workflow.security_block_on count toward threats_open*
*Disposition: mitigate (implementation required) · accept (documented risk) · transfer (third-party)*

**Note 1 — T-157-16 closed, with a re-derived gap in its parity claim.** The imported
primitives are genuine and the paired self-test control genuinely discriminates in both
directions. But the *chain assembly* around those primitives is freshly written and omits
sweep3's YAML front-matter boundary skip (`sweep3.py:162-174`), while the gate's own docstring
claims "sweep3's own semantics, in sweep3's own order." The failure direction is **fail-closed**
(a future first-person front-matter value would wrongly redden the gate), not the fail-open
silent-pass direction T-157-16 guards against, and 0 of 294 live files trigger it today. That is
why the threat is closed rather than open — but the divergence is real and carried forward below.

---

## Accepted Risks Log

| Risk ID | Threat Ref | Rationale | Accepted By | Date |
|---------|------------|-----------|-------------|------|
| AR-157-01 | T-157-25 | Defect remediated; the **detection gap** that let it ship is accepted and handed forward — see below | Owner (Joshua Anderson) | 2026-09-06 |

### AR-157-01 — T-157-25 invented glossary definition

**What happened.** `docs/_glossary-linux.md:143`'s `unattended-upgrades` entry stated that a
pending reboot "is signaled through `/run/reboot-required`, the same file the
`unattended-upgrades` log output also references." Its cited source,
`docs/operations/patch-management/05-linux-update-delivery.md:256-276`, says the opposite in its
own words: the log output writes `/var/run/reboot-required`, and both spellings are stated with
neither asserted to be the other, because no first-party page consulted for that guide documents
the relationship between the two paths.

The entry therefore did two things the guide deliberately refuses to do: it **resolved an
ambiguity the corpus leaves open**, and it **misattributed which path the log actually writes**.

**Detection gap — the accepted part.** `check-phase-49.mjs` (22/22), C17 (237/0), the apex chain
(111/0/0) and `check-prose-style.py` (0 findings) were **all green with the false claim in the
tree**. None of them checks a definition against its cited source; `check-phase-49` reads this
exact file live but only for structure. `157-REVIEW.md`'s `files_reviewed_list` does not include
either glossary file, and neither `157-06-SUMMARY.md` nor `157-VERIFICATION.md` compared the
entry's content to its guide — truth #13 verified the entries were *present and well-formed*,
not that they were *true*. This is the same family as the Phase 156 finding recorded at
AR-156-01: mechanisms here detect a lost pinned string, never an introduced false one.

**Remediation applied.** Commit `9a68aa1a` — the entry now carries the guide's own hedge: both
spellings named, the relationship stated as undocumented, and a check that tests both. Verified:
exactly 1 line in / 1 line out; 283 lines, 31 H3 and 8 H2 unchanged; both freshness fields
byte-unchanged (so T-157-27 still holds); the false substring returns 0 and both path spellings
are present exactly once. Every gate re-run green afterwards — `check-phase-49` 22/0, C17 237/0,
apex 111/0/0, nav-hub 0/0, `check-phase-147` 8/0, prose-style self-test 7/0 and normal 294 files
with 0 findings, leak needles 0/0 by two independent methods.

**Residual exposure, accepted.** The defect is fixed; **the class is not.** No mechanism in this
repository verifies that a glossary definition is supported by the guide it cites. The other four
new entries were traced clause-by-clause to their guides during this audit and are faithful, but
that was a one-time human read, not a guard — and this project has a recorded lesson that a
one-time measurement is not a guard. Any future glossary entry can assert a fact its source
refuses, and every gate will stay green.

**Owner.** Recommended for the Phase 158/159 hygiene surface. A cheap durable form would extend
the existing per-entry "See <guide>" convention into a check that a definition's distinguishing
claims appear in the named guide — but any such check is heuristic, and the honest alternative is
to require a source-trace read whenever a glossary entry is authored, recorded as a rule in the
new Prose Style Authoring Standard rather than as a gate that cannot really fire.

---

## Security Audit Trail

| Audit Date | Threats Total | Closed | Open | Run By |
|------------|---------------|--------|------|--------|
| 2026-09-06 | 36 | 35 → 36 | 1 → 0 (remediated) | gsd-security-auditor ×3 (ASVS L1, block_on high) |

**Audit method.** Register read from the seven PLAN `<threat_model>` blocks, not paraphrased, and
split across three parallel auditors (plans 01–03 / 04–05 / 06–07) so each had a tractable scope.
Every auditor was instructed to **re-derive rather than inherit**: a SUMMARY or VERIFICATION
sentence claiming a check passed was explicitly ruled out as evidence, per this project's recorded
incident in which a written audit log claimed a revert that never happened. **34 of 36 threats
were closed by a command run during the audit**, with its real output quoted; the remainder cite a
recorded measurement in `157-BASELINE.json` and say so. The baseline itself was not trusted — its
needle counts and file count were re-derived from `git archive 1cd8c4d7` tree bytes and matched
exactly.

Two of the three auditors returned `## SECURED`. The third returned `## OPEN_THREATS` with
`threats_open: 1` on T-157-25. The orchestrator independently re-read both the glossary entry and
its cited source before acting, confirmed the contradiction, and put the disposition to the owner,
who chose remediation over acceptance. **The open threat was closed by a code change, not by a
ruling.**

**SUMMARY Threat Flags coverage.** Only `157-02-SUMMARY.md` carries the heading, stating "None."
The other six summaries omit the heading entirely rather than stating "None" — a
documentation-completeness gap in the executor's summary template, not a security gap; each
summary's diffs were independently reviewed by the auditors and no unregistered attack surface was
found.

### Unregistered tooling findings (tracked, non-blocking)

Independently re-derived during this audit (WR-01 and WR-02 were also raised by `157-REVIEW.md`;
the auditors re-verified them rather than inheriting them):

| Ref | Location | Finding |
|-----|----------|---------|
| WR-01 | `scripts/validation/check-prose-style.py:248-295` | The person-first filter chain omits sweep3's YAML front-matter boundary skip (`sweep3.py:162-174`) while the docstring claims exact parity with "sweep3's own semantics, in sweep3's own order". Fail-closed direction; 0 of 294 live files trigger it. See note 1 |
| WR-02 | `scripts/validation/check-prose-style.py` docstring | Three `check.py:NN` citations are stale by exactly +8 lines after this same phase expanded that docstring. Comment-only — but this file explicitly bills a recorded/implemented divergence as "a defect, not a refinement" |
| IN-01 | `scripts/validation/check-prose-style.py` `--self-test` | The self-test never exercises `CLASS_EXCLUDED_DIRS`/`scan_needles()` end-to-end, only the bare regexes. A future inversion of that exclusion would pass `--self-test` while silently changing which files are exempt from the leak needle |
| AR-157-01 residual | `docs/_glossary.md`, `docs/_glossary-linux.md` | No mechanism verifies a glossary definition against its cited guide. See the Accepted Risks Log |

---

## Sign-Off

- [x] All threats have a disposition (mitigate / accept / transfer)
- [x] Accepted risks documented in Accepted Risks Log (AR-157-01)
- [x] `threats_open: 0` confirmed — by remediation (`9a68aa1a`), with all gates re-run green
