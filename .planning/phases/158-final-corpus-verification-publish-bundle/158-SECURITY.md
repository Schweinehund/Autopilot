---
phase: "158"
slug: "final-corpus-verification-publish-bundle"
status: secured
# threats_open = count of OPEN threats at or above workflow.security_block_on severity (the blocking gate)
threats_open: 0
asvs_level: 1
created: "2026-09-08"
---

# Phase 158 — Security

> Per-phase security contract: threat register, accepted risks, and audit trail.

Register origin: **authored at plan time** — all seven PLAN.md files carry a `<threat_model>`
block. 13 numbered threat IDs (T-158-01 … T-158-13) plus `T-158-SC` repeated once per plan,
giving 38 plan-scoped rows (a threat ID recurs across plans where the same class lands on a
different component; each recurrence is verified against its own plan's mitigation text).
Verified by three parallel `gsd-security-auditor` runs at ASVS level 1, `block_on: high`,
under the verify-mitigations constraint (no new-threat scanning), split 01–03 / 04–05 / 06–07.
The ASVS-L1 short-circuit was deliberately not taken (Phase 157 precedent: the auditor found a
real defect the grep-level classification missed).

**No threat opened.** Every `mitigate` row was closed by re-executing the mitigation's own check
against HEAD `b1bef1e7`, not by reading the SUMMARY's claim. No SUMMARY carries a
`## Threat Flags` section (confirmed by grep in all three runs).

---

## Trust Boundaries

| Boundary | Description | Data Crossing |
|----------|-------------|---------------|
| git object store → audit verdict / requirement discharge | Blob and tree bytes at named revisions become PASS/FAIL rows that VERIFY-06's checkbox rests on | 46 claim rows in `158-FIX-AUDIT.json`, range 0a458c84..aa9ae5ae |
| audit row data → git argument list | Row-supplied needles and paths become child-process argv elements | needles, pathspecs, revisions in `audit-claimed-fixes.mjs` |
| unpushed history → any artifact, log, argv or backup carrier | A scrubbed employer/CMG value survives in local history (commit 9a114815 region); any artifact reproducing it re-publishes it on first push | secret-classified row `secret-cmg-hostname-scrub` (null needle) |
| repository prose → published SharePoint corpus / `.docx` archive | Every edited line is converted and indexed; no validator reads a sentence for truth | 4 hand-remediated files, 15 swept files, 237 staged documents |
| mechanical substitution → protected corpus string | The sweep rewrites lines corpus-wide and reports counts, not identities | 28 tightened lines across 15 files (commit 44ab8c21) |
| registry Title cell → staged document filename | The filename builder slugs the registry Title column before staging | `docs/_registry/RE-index.md` 239 table rows; `filename-map.md` |
| corpus text / author rationale → judge instructions and independence | Packet prose enters a prompt; any milestone artifact is an answer key | 2 packets, blocklist in `158-JUDGE-PROMPT.md` |
| judge output → committed verdict | A verdict written from recollection is the written record this phase distrusts | `_JUDGE-VERDICTS-158.json` (prompt sha256 + per-packet hashes) |
| disposition record → reader trust; recorded line → live corpus | A wrong ground converts an unexamined defect into a documented decision; line numbers go stale | `_DISPOSITIONS-158.tsv` (9 corpus rows), `_STYLE-DISPOSITIONS-158.tsv` (120 rows) |
| measurement record → later-phase automation | The gate baseline's after half is Phase 159's corpus-identity anchor | `158-GATE-BASELINE.json` before (845218a4) / after (b889501f), 9 drift rows |
| build process → tracked bytes | The publish build regenerates one tracked file | `scripts/pipeline/filename-map.md` |
| plan frontmatter → requirement state | The harness writes the checkbox and traceability row at the plan boundary | VERIFY-05, VERIFY-06 (plan 158-07 only) |
| phase-directory markdown → apex chain | Three planning-tree validators walk `.planning/` recursively | 158-JUDGE-PROMPT.md, 158-JUDGE-FINDINGS.md, 158-SWEEP-DISPOSITIONS.md, WINDOWS.md #16 |

---

## Threat Register

| Threat ID | Plan | Category | Component | Severity | Disposition | Mitigation (verified evidence) | Status |
|-----------|------|----------|-----------|----------|-------------|--------------------------------|--------|
| T-158-01 | 158-01 | Information Disclosure | audit needles, run log, discovery scratch | high | mitigate | `assertSecretRow` (`audit-claimed-fixes.mjs:162-178`) requires `needle:null`; secret row carries `[REDACTED]` claim; run log line 22 carries only `removed_lines_at_fix:1`; FQDN-shaped token recovered from 077b29b7's removed lines grepped across all 28 tracked phase artifacts → 0 hits with a working positive control | closed |
| T-158-03 | 158-01 | Spoofing | `158-GATE-BASELINE.json`, `158-FIX-AUDIT-RUN.txt` as self-asserting records | high | mitigate | run-log line 1 == `row_set_hash` (e12dd27e…) by live re-parse; baseline re-parsed: 16 keys, `before.check_phase_153.fail==0`, `before.c17.violations==0`, every recorded command is `{cmd,args[]}` | closed |
| T-158-04 | 158-01 | Tampering | data-driven git argv in the runner | medium | mitigate | `execSync(`/`child_process.exec(`/`shell:true` → 0 matches; 19 `execFileSync('git',[…])` sites with explicit `--` before pathspecs; needles are array elements | closed |
| T-158-07 | 158-01 | Tampering | `.planning/WINDOWS.md` row 16 | medium | mitigate | row matches existing table shape; no bare-platform blockquote token; check-phase-54/55/56 → 32/32/32 live | closed |
| T-158-SC | 158-01 | Tampering | npm/pip/cargo installs | low | accept | no package manifest in any phase commit; runner imports `node:` built-ins only | closed |
| T-158-02 | 158-02 | Tampering | three hand-remediated corpus surfaces | high | mitigate | `byte-identical` count 0 in EEE-SOP-standard.md; replacement sentence at :662 carries subject and consequence clauses; both glossary anchors resolve against `05-linux-update-delivery.md`'s own headings | closed |
| T-158-08 | 158-02 | Tampering | glossary line that is also the sweep target | medium | mitigate | `git merge-base --is-ancestor 804e12ba 44ab8c21` succeeds; post-edit line recorded verbatim in 158-02-SUMMARY.md | closed |
| T-158-09 | 158-02 | Tampering | line endings under a normalising checkout | low | mitigate | `.gitattributes` untouched across 845218a4..44ab8c21; line-count criteria only | closed |
| T-158-SC | 158-02 | Tampering | npm/pip/cargo installs | low | accept | three commits touch only `docs/` prose | closed |
| T-158-08 | 158-03 | Tampering | corpus-wide sweep over 15 files | high | mitigate | live re-run `sweep3.py … --subs subs-emdash-batch10.tsv` → 0 edits; guard 1 recomputed (28 `+` lines, 1 disclosed residual = WINDOWS #16); guard 2 `pins2.py` → 4590 scanned / 685 pinned == before half; guard 3 CR-insensitive identity → 0 differing lines outside the dash | closed |
| T-158-06 | 158-03 | Tampering | `docs/_registry/RE-index.md` Title cells | high | mitigate | 239 table rows before and after 44ab8c21, 0 differing; `build-publish-bundle.mjs --self-test` 15/15; `build-filename-map.mjs --self-test` 8/8 live | closed |
| T-158-09 | 158-03 | Tampering | line endings across the sweep's writes | medium | mitigate | `.gitattributes`, `sweep3.py`, `subs-emdash-batch10.tsv` unchanged across the range; CR stripped in guard 3 | closed |
| T-158-10 | 158-03 | Tampering | `judge-packets.py` as judge input | medium | mitigate | commit 46ad75e9 = exactly one file, 13 ins / 2 del (≤30); diff contains neither the modal set nor changed-file computation | closed |
| T-158-SC | 158-03 | Tampering | npm/pip/cargo installs | low | accept | data-only run of byte-unchanged tools | closed |
| T-158-10 | 158-04 | Tampering | judge subprocess reading corpus bytes | medium | mitigate | prompt+packet pre-assembled to one file; dispatch argv `-p --tools "" --output-format text --add-dir <tmp>` recorded in the verdict JSON; raw capture 1443 bytes matches; blocklisted names grep on the capture → 0 | closed |
| T-158-03 | 158-04 | Spoofing | `_JUDGE-VERDICTS-158.json` | high | mitigate | `sha256sum 158-JUDGE-PROMPT.md` = 25a9b6c0…, byte-identical to `prompt_sha256` in the verdict record | closed |
| T-158-07 | 158-04 | Tampering | two new phase-directory markdown files | medium | mitigate | no `> **Platform:**` token in either file; check-phase-54/55/56 → 32/32/32 | closed |
| T-158-02 | 158-04 | Tampering | judge-driven corpus reword | high | mitigate | both packet verdicts PRESERVED, `corpus_fix_landed:false` — reinstatement path never exercised | closed |
| T-158-SC | 158-04 | Tampering | npm/pip/cargo installs | low | accept | commits d085ceaa, 404ba095 touch no manifest | closed |
| T-158-02 | 158-05 | Tampering | `_STYLE-DISPOSITIONS-158.tsv` grounds and verdicts | high | mitigate | 120 nine-column rows; 0 empty/generic grounds; 25/25 passives KEEP-FLAGGED; 59-file edited set (d0b611e8..937d0a1f) == table file set both directions; 5 EDIT rows resolve to real commits; 27 NO-CANDIDATES | closed |
| T-158-03 | 158-05 | Spoofing | disposition tables as self-asserting records | high | mitigate | `check.py` word-list instrument re-run live on `docs/_glossary-linux.md`: "native" fires only at L283, not at the EDIT row's post_line 143 — limb one corroborated by re-execution | closed |
| T-158-06 | 158-05 | Tampering | two frozen predecessor disposition tables | medium | mitigate | `git diff --exit-code d0531dbf^..HEAD -- _DISPOSITIONS-batch10.tsv _DISPOSITIONS-docs.tsv` → exit 0 | closed |
| T-158-07 | 158-05 | Tampering | `158-SWEEP-DISPOSITIONS.md` | medium | mitigate | no forbidden blockquote token; check-phase-54/55/56 32/32/32; C17 237/0 | closed |
| T-158-SC | 158-05 | Tampering | npm/pip/cargo installs | low | accept | commits 485598e9, e0dbac28, 46e71b09 touch no manifest | closed |
| T-158-01 | 158-06 | Information Disclosure | secret audit rows, run log, gate baseline | high | mitigate | runner throws if a `kind:"secret"` row has a non-null needle (:302-305); no pickaxe call in the file; self-test (d) reproduced live; hostname/FQDN regex sweep across the three artifacts → 0 | closed |
| T-158-03 | 158-06 | Spoofing | gate baseline after half, run log | high | mitigate | `after.tracked_tree_clean` unscoped `git status --porcelain --untracked-files=no` `result_empty:true`; `untracked_set` enumerates 10; `--drift` re-run reproduced `{"unattributed_rows":[]}` byte-identical; causation caveat present | closed |
| T-158-04 | 158-06 | Tampering | git argv across audit and drift rows | medium | mitigate | 11 `execFileSync('git',[…])` sites; 0 string-command forms; needle passed as discrete element (`['grep','-o','-F','-e', needle, rev, '--', path]`) | closed |
| T-158-02 | 158-06 | Tampering | false claim surviving into the bundle | high | mitigate | 46 rows over all 7 claim surfaces; vacuity rule enforced at :185/:267 and self-test (b) live; binding invocation re-run → exit 0, run log byte-identical incl. row-set hash | closed |
| T-158-13 | 158-06 | Information Disclosure | scrubbed value in unpushed local history | medium | accept | cites AR-155-01 (`155-SECURITY.md:137`); branch has no upstream; `git branch -r --contains 9a114815` → empty | closed — accepted (AR-158-01) |
| T-158-SC | 158-06 | Tampering | npm/pip/cargo installs | low | accept | commits b889501f, 828e9744 touch no manifest | closed |
| T-158-05 | 158-07 | Repudiation | killed vs completed archive build | medium | mitigate | `158-BUNDLE-RUN.txt:485` carries the parity line (237 Approved / 237 staged / 0 excluded / 0 missing / 0 orphan); zip on disk 4,105,804 bytes, sha256 65a10234…7b4ce matches the record | closed |
| T-158-06 | 158-07 | Tampering | `filename-map.md` rewritten by the build | high | mitigate | `git rev-parse HEAD:scripts/pipeline/filename-map.md` == `git hash-object` of the CR-stripped file (88e86f3b…); `git diff --exit-code` → 0; last `scripts/pipeline/` touch is d278a3b1 (Phase 155) | closed |
| T-158-11 | 158-07 | Denial of Service | builder's inner archiving timeout | low | mitigate | `build-publish-bundle.mjs:482` timeout scoped to the Compress-Archive call only; per-step timeouts at :266/:279/:300; outer harness cap governs the run | closed |
| T-158-07 | 158-07 | Tampering | amendment text in REQUIREMENTS.md / ROADMAP.md | high | mitigate | check-phase-54/55/56 → 32/32/32 at HEAD; off-by-one compliance-policy filename absent from both documents; no bare-platform blockquote token in the three planning documents | closed |
| T-158-12 | 158-07 | Information Disclosure | a history archive created for backup | high | mitigate | no Phase-158 commit adds an archive; `.gitignore` has no `!` negation for bundle/zip/tar. Note: `.planning/artifacts/154-scratch-corpus.bundle` is a pre-existing tracked bundle (Phase 154, f8750c6d) — cloned and checked, `git cat-file -e 9a114815…` → exit 1 (scrubbed commit absent). Standing fact for the Phase 159 history decision | closed |
| T-158-02 | 158-07 | Tampering | false claim shipping into 237 documents | high | mitigate | `git diff --exit-code b889501f HEAD -- docs/ scripts/pipeline/` → 0 (corpus identity between the audited revision and the post-build tree) | closed |
| T-158-13 | 158-07 | Information Disclosure | scrubbed value in unpushed local history | medium | accept | same AR-155-01 citation, carried as AR-158-01 | closed — accepted (AR-158-01) |
| T-158-SC | 158-07 | Tampering | npm/pip/cargo installs | low | accept | commits 86c5f074, b0d512e5, eec65c6f touch no manifest | closed |

*Status: open · closed · open — below high threshold (non-blocking)*
*Severity: critical > high > medium > low — only open threats at or above workflow.security_block_on count toward threats_open*
*Disposition: mitigate (implementation required) · accept (documented risk) · transfer (third-party)*

---

## Accepted Risks Log

| Risk ID | Threat Ref | Rationale | Accepted By | Date |
|---------|------------|-----------|-------------|------|
| AR-158-01 | T-158-13 (plans 158-06, 158-07) | The scrubbed employer/CMG value remains in unpushed local history (carried from AR-155-01). No remote ref contains the commit, the branch has no upstream, the repository's workflows have no push trigger, and this phase pushed nothing. The removal mechanism (rewrite vs. accept) is Phase 159's HARN-06 decision; the pre-existing tracked Phase 154 bundle was verified not to carry the commit. | owner (carried from Phase 155 ruling) | 2026-09-08 |
| AR-158-02 | T-158-SC (all seven plans) | No package installed in any ecosystem during the phase; the new runner uses Node built-ins only and every other tool was already committed. Package Legitimacy Audit not applicable. | orchestrator | 2026-09-08 |
| AR-159-01 | T-158-01 (re-opened; class: verifier-secret-echo) | `158-VERIFICATION.md:97`'s negative-control command quoted the literal it asserted absent, falsifying its own PASS verdict; recurred in `159-RESEARCH.md` (4 sites, `b0a2f84a`) before this plan scrubbed both files. Accepted going forward on the strength of `.planning/WINDOWS.md` row 17's replacing rule (derive needles in-process, count only, scrub on the branch before any squash, never quote a scrubbed value when documenting the scrub) rather than a new mechanical gate, since the defect is authoring discipline, not a missing runner guard. | Phase 159 Task 1 (159-01-PLAN.md, D-05) | 2026-09-09 |

*Accepted risks do not resurface in future audit runs.*

---

## Supersession Note — T-158-01 (Phase 159, 2026-09-09)

`T-158-01`'s `closed` disposition (both rows above, plans 158-01 and 158-06) covered only the
`audit-claimed-fixes.mjs` runner's own needle/pickaxe guards. It did not cover
`158-VERIFICATION.md:97` itself: that row's "Secret-scrub negative control" quoted the literal
9-character label inside its own `git grep` command while asserting the label absent, committed at
`179cf247`. **The threat this disposition closed was re-opened by the verifier's own negative
control** — a command that quotes the value it asserts absent both leaks the value and inverts its
own verdict, so the row's recorded `exit 1 (no match)` PASS was false from the moment it was written.

**Closed again, by Phase 159 Task 1's scrub:** the literal at `158-VERIFICATION.md:97` and the four
recurrences discovered in `159-RESEARCH.md` (introduced at `b0a2f84a`, after this SECURITY.md was
authored) are replaced with `<SCRUBBED-9CHAR-TOKEN>` across both files, verified 0 on all five D-06
scan surfaces. See `.planning/WINDOWS.md` row 17 for the class-level defect (verifier-secret-echo)
this re-open documents, and `159-CONTEXT.md` D-05/D-06 for the scrub mechanism.

---

## Security Audit Trail

| Audit Date | Threats Total | Closed | Open | Run By |
|------------|---------------|--------|------|--------|
| 2026-09-08 | 14 (plans 158-01..03) | 14 | 0 | gsd-security-auditor (sonnet), ASVS L1, verify-mitigations |
| 2026-09-08 | 10 (plans 158-04..05) | 10 | 0 | gsd-security-auditor (sonnet), ASVS L1, verify-mitigations |
| 2026-09-08 | 14 (plans 158-06..07) | 14 | 0 | gsd-security-auditor (sonnet), ASVS L1, verify-mitigations |

Non-threat notes recorded by the auditors: (1) `158-GATE-BASELINE.json` `discharge.sc4` text says "8 rows" while `drift[]` holds 9 — all 9 enumerated and reproducible via `--drift`, a descriptive miscount only; (2) 158-04-SUMMARY.md prose quotes the prompt hash with a stray trailing character in one sentence — the JSON field is correct and verified byte-for-byte.

---

## Sign-Off

- [x] All threats have a disposition (mitigate / accept / transfer)
- [x] Accepted risks documented in Accepted Risks Log
- [x] `threats_open: 0` confirmed
- [x] `status: verified` set in frontmatter (recorded as `secured`, matching Phases 154–157)

**Approval:** verified 2026-09-08
