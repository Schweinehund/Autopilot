---
phase: "159"
slug: "harn-harness-close"
status: secured
# threats_open = count of OPEN threats at or above workflow.security_block_on severity (the blocking gate)
threats_open: 0
asvs_level: 1
created: "2026-09-10"
---

# Phase 159 — Security

> Per-phase security contract: threat register, accepted risks, and audit trail.

Register origin: **authored at plan time** — all thirteen PLAN.md files carry a `<threat_model>`
block. 62 numbered threat IDs (T-159-01 … T-159-62, roughly five per plan, no ID reused across
plans) plus `T-159-SC` repeated once per plan, giving 75 plan-scoped rows. No SUMMARY.md carries
a `## Threat Flags` entry. Verified by three parallel `gsd-security-auditor` runs at ASVS level 1,
`block_on: high`, under the verify-mitigations constraint (no new-threat scanning), split
01–04 / 05–09 / 10–13. The ASVS-L1 short-circuit was deliberately not taken (Phase 157 and 158
precedent), and the owner selected "Verify all open threats" at the Step 4 gate.

**One threat left open, below the blocking threshold.** Every `mitigate` row was closed by
re-executing the mitigation's own check against HEAD `05cc9d64` (the post-close-gate head that
also carries the code-review report), not by reading the SUMMARY's claim. T-159-20 (medium,
Repudiation, plan 159-04) stays **open** because `159-REVIEW.md` CR-01, independently reconfirmed
by two auditors, shows `scripts/validation/v1.21-milestone-audit.mjs` lines 138, 151, 199 and 250
still gate three root-singleton doc-path lists with a live `existsSync(join(process.cwd(), p))`
instead of the `FROZEN.has(p)` form every v1.15–v1.20 sibling uses at the identical site. The
perturbation test recorded in `159-EVIDENCE.md` §13 exercised only a sidecar-pinned line, so the
row's "the working tree no longer influences the verdict" claim is proven for one dimension only.
The defect is dormant while the five singleton files exist at HEAD; `V-159-HARN03` asserts exit 0
plus a substring and cannot see it. Fix route: `/gsd-code-review 159 --fix` (CR-01) or a v1.23
gap item; re-run `/gsd-secure-phase 159` afterward to close T-159-20.

**Disclosed-and-compensated deviation on T-159-45 (plan 159-10).** The tracked pre-push guard was
not installed as `.git/hooks/pre-push` when 159-10 pushed (plan 159-01 proved it only in throwaway
clones), so the mechanism the mitigation names did not run. `159-EVIDENCE.md` §27.2 discloses this
and substitutes direct post-push scans of the guard's two rejection conditions; the auditor re-ran
both live (landing branch and `refs/archive/*` absent from the remote, five-surface token scan 0)
and the guard fired (`pre-push: OK`, §28.2) on 159-11's corrective push. Closed on the compensating
evidence, recorded here because the mechanism that ran differs from the one the plan named.

---

## Trust Boundaries

| Boundary | Description | Plan |
|---|---|---|
| local history to any remote | The squash decides what a future push publishes; the pre-push hook is the only mechanical guard between the archived history and a remote. | 159-01 |
| scrubbed value to tracked content | A 9-character label must be removed from tracked bytes without ever being written into a scanner, a needle, a message or a hash. | 159-01 |
| stdin of the pre-push hook to git plumbing arguments | Four untrusted-shaped fields per line are interpolated into `git rev-list` invocations. | 159-01 |
| untracked machine-local state to the tracked repository | Settings, worktrees, ignore-list candidates and an installer payload cross into commits at this close. | 159-01 |
| milestone tag to git command line | The tag selects a SHA that is interpolated into git subprocess arguments by the shared readers. | 159-02 |
| git object store to validator memory | Frozen blobs are read from history and treated as authoritative corpus content by every consumer of the pin. | 159-02 |
| the pinned prefix to the full object name | An 8-character prefix stands in for a 40-character object name; ambiguity or a wrong prefix silently redirects every downstream read. | 159-02 |
| frozen blob to new tracked file | The new harness's entire provenance rests on reading the correct blob at the correct SHA before any local edit. | 159-03 |
| sidecar JSON to harness behaviour | The sidecar suppresses checks; a silently altered pin turns a real violation into a pass. | 159-03 |
| harness process to spawned validators | The forked harness carries subprocess spawns that must remain in argument-array form. | 159-03 |
| git object store to temp directory | Frozen documentation blobs are written to a filesystem location outside the repository before the child process runs. | 159-04 |
| harness process to spawned contract validator | A child process is launched with a swapped working directory and an absolutized script path. | 159-04 |
| milestone tag to git command line | The tag selects a SHA interpolated into git subprocess arguments by the shared readers. | 159-04 |
| sidecar content to check verdicts | The allowlist suppresses checks; its absence at the frozen SHA must fail loud rather than degrade to an empty allowlist. | 159-04 |
| repository corpus to validator verdict | A leaf's verdict is a claim about the corpus; a wrongly-rooted or empty walk turns a real regression into a green. | 159-05 |
| leaf process to spawned tool | One leaf launches a Python self-test as a child process. | 159-05 |
| line-ending representation to byte-length and count needles | A checkout with converted line endings changes byte lengths and can change counts. | 159-05 |
| leaf process to spawned Python gate | A long-running Python process is launched from a chain member and its exit status decides an apex verdict. | 159-06 |
| leaf process to spawned Node self-test | A second child process is launched with an argument array. | 159-06 |
| tool absence to check verdict | A missing tool and a missing runtime must produce different verdicts; conflating them turns a real gap into a skip. | 159-06 |
| corpus content to enforcing gate | Making the gate enforcing means any future corpus violation reddens the apex. | 159-06 |
| apex process to spawned chain members | The apex launches over a hundred child validators and one harness, and its verdict is the sum of theirs. | 159-07 |
| apex process to spawned harnesses | Two harnesses are launched as children, one of which is the newly converted one. | 159-07 |
| archive-root token to the path resolver | A token that only becomes meaningful after archival decides where the apex looks for phase artifacts. | 159-07 |
| nested-flag environment to leg behaviour | An environment variable changes which legs run, so a wrongly-skipped leg is invisible in every nested invocation. | 159-07 |
| workflow file to CI runner | A committed YAML file becomes executable instructions on GitHub-hosted infrastructure once it reaches the default branch. | 159-08 |
| third-party actions to the runner | Setup actions for Node and Python execute with the job's permissions. | 159-08 |
| clone depth to frozen object reads | A shallow checkout silently breaks every frozen read, turning real audits into errors or, worse, skips. | 159-08 |
| the sidecar path literal to the governance job | A CI job asserts a string that lives in a source file, and neither side can see the other locally. | 159-08 |
| bundle contents to the push set | A tracked binary carries two roots of history that no other scan in this phase covers, and it cannot be separated from the push set without a rewrite. | 159-09 |
| derived label to the evidence record | The scan's own subject must never be written into the record it produces. | 159-09 |
| evidence document to the owner decision | The next plan's irreversible decision is made entirely from this document. | 159-09 |
| local history to the public remote | The push is the moment private history becomes public and cannot be retracted. | 159-10 |
| owner decision to executed command | A four-branch decision must map to exactly one command with no interpretation left to the executor. | 159-10 |
| pre-push guard to the push attempt | A per-clone hook is the only mechanical protection between the archived history and the remote. | 159-10 |
| this repository to a dispatched sub-agent | A separate agent process runs on the same host with shell access and can read anything the user can. | 159-11 |
| remote CI to the evidence record | Job results come from an external service and must be read back and matched against a recorded commit. | 159-11 |
| clone depth to frozen object reads | A shallow clone silently breaks every frozen read in both reproduction axes. | 159-11 |
| an incomplete leg to a recorded pass | A leg killed by a budget produces no verdict; treating it as one manufactures evidence. | 159-11 |
| predecessor documents to this milestone's counts | Counts carried rather than measured are the mechanism by which a wrong figure survives across milestones. | 159-12 |
| deferral population to the ledger | An entry silently dropped between milestones disappears with no gate to notice. | 159-12 |
| corrections of record to durability | A falsification recorded only in a phase artifact archives out of easy reach; the audit is where it stays visible. | 159-12 |
| owner decision to an irreversible flip | A three-branch decision must map to exactly one commit with no interpretation left to the executor. | 159-13 |
| build artifact to the published corpus | An ignored output directory holds the archive that represents the milestone's shipped corpus; nothing tracks it. | 159-13 |
| harness-owned flip to the requirements document | Automatic machinery writes to the same file the gate commit just wrote, and a second write would split the close across two commits. | 159-13 |
| close-gate commit to a future milestone's pin | A future milestone recovers this commit by a subject-line discriminator that must return exactly one candidate. | 159-13 |

---

## Threat Register

| Threat ID | Plan | Category | Component | Severity | Disposition | Mitigation | Status |
|---|---|---|---|---|---|---|---|
| T-159-01 | 159-01 | Information Disclosure | the scrubbed label in tracked content, messages and blobs | high | mitigate | The token is derived in-process from a diff and held only in a shell variable; five surfaces are scanned before and after; counts and filenames only are recorded; no scanner and no hash of the value is committed. Post-scrub count 0 on every surface is a verify command, not an inspection. The scrub scope is the LIVE population, not the context's figure: the class has already recurred once in this phase's own research document, so the task re-measures the population instead of trusting a one-file expectation. | closed |
| T-159-02 | 159-01 | Tampering | a push that publishes the archived history | high | mitigate | `scripts/hooks/pre-push.sh` rejects any range containing the scrub-source object name and any `refs/archive/*` refspec, and handles the all-zero remote SHA arm that the first draft omitted. Proven by three throwaway-clone push transcripts, not by reading. | closed |
| T-159-03 | 159-01 | Tampering | history rewrite at the scrub-source commit | high | mitigate | Prohibited outright by this plan and by D-01. The landing is a `commit-tree` squash whose single-parent shape and tree equality are both asserted, so no predecessor commit is altered and the archived ref preserves the original tip. | closed |
| T-159-04 | 159-01 | Elevation of Privilege | the pre-push hook's stdin fields reaching git arguments | medium | mitigate | Fields are used as ref and SHA operands in argument position only; no evaluated string, no shell interpolation into a command name. A grep asserting the absence of an evaluated string, a network fetch and a force flag is an acceptance command. | closed |
| T-159-05 | 159-01 | Spoofing | the installer payload diverging from the live hook | medium | mitigate | The payload is re-encoded from the tracked hook and proven by decoding the committed constant and comparing bytes to the tracked hook file in the verify command. | closed |
| T-159-06 | 159-01 | Repudiation | the landing losing its provenance | medium | mitigate | The archive ref is created before the branch is deleted, both tree hashes are recorded verbatim, the squash message file is appended to the evidence document, and the count of STATE-cited SHAs that become unreachable is measured and annotated. | closed |
| T-159-SC | 159-01 | Tampering | npm/pip/cargo installs | low | accept | This plan performs zero package-manager installs. It edits tracked text and runs git plumbing and existing Node validators. No package is introduced, so no legitimacy audit applies. | closed |
| T-159-07 | 159-02 | Spoofing | the recovered close SHA | high | mitigate | The SHA is recovered by a subject-line pair discriminator whose candidate count must be exactly 1, regression-checked at count 1 against four already-pinned predecessors, and then proven by a real frozen read returning real bytes — not accepted from CONTEXT prose. | closed |
| T-159-08 | 159-02 | Tampering | pin placement inside the object literal | high | mitigate | An object-order assertion command proves the V121 literal precedes the V14 literal and that the post-V14 slice contains zero V-tag keys, and the live pin check is run standalone before and after the edit. | closed |
| T-159-09 | 159-02 | Information Disclosure | a vacuously resolving pin | medium | mitigate | The end-to-end proof asserts non-empty content from a named path and a non-empty path list, and the docs tree count at V121 is asserted strictly greater than at V120, so a pin resolving to the wrong or an empty tree cannot read as green. | closed |
| T-159-10 | 159-02 | Repudiation | provenance of the pin | medium | mitigate | Five discriminator rows with full object names and subject lines, six guard triples, and the one-time append-only re-amendment are all recorded in the evidence document and in the file's own comment block. | closed |
| T-159-SC | 159-02 | Tampering | npm/pip/cargo installs | low | accept | This plan performs zero package-manager installs. It edits one library file and runs existing Node validators using built-ins only. | closed |
| T-159-11 | 159-03 | Tampering | fork provenance | high | mitigate | Three hashes — frozen blob, unconverted working copy, new file — are computed and asserted equal before any edit, and the ordering precondition is itself a verify command that fails if the working copy has already been converted. | closed |
| T-159-12 | 159-03 | Tampering | sidecar pin content | high | mitigate | A programmatic array-by-array comparison against the predecessor sidecar is an acceptance command; any repointed, reordered or dropped pin prints the differing array name and exits non-zero. | closed |
| T-159-13 | 159-03 | Elevation of Privilege | subprocess calls in the forked harness | medium | mitigate | A grep asserting the absence of string-command child process calls is an acceptance command on the new file, matching the ban the predecessor phase established. | closed |
| T-159-14 | 159-03 | Information Disclosure | dead exemption pins passing vacuously | medium | mitigate | The dead pins are enumerated by file and line, their pass mechanism is stated, and they are disclosed in the sidecar's journal block and in the close artifact rather than silently carried. | closed |
| T-159-15 | 159-03 | Repudiation | baseline drift claimed rather than measured | medium | mitigate | The drift instrument is a per-pin token check run at two named SHAs with counts recorded; the unusable diff method and the script's own report mode are both explicitly excluded as evidence. | closed |
| T-159-SC | 159-03 | Tampering | npm/pip/cargo installs | low | accept | This plan performs zero package-manager installs. It creates two files, edits one, and runs existing Node scripts using built-ins only. | closed |
| T-159-16 | 159-04 | Information Disclosure | a vacuously green C17 run | high | mitigate | The child exits 0 on an empty corpus, so an empty or wrong-milestone materialization would pass silently. The known-member assertion runs before the spawn and is proved failable by two deliberate negative probes, and a non-zero written-path assertion runs alongside it as the empty-case catch. | closed |
| T-159-17 | 159-04 | Elevation of Privilege | subprocess invocation with a swapped working directory | high | mitigate | Argument-array spawn only, no shell string; the contract path is absolutized from the live repository root before the swap so the child never resolves its own script through the materialized tree. A grep asserting the absence of string-command spawns is an acceptance command. | closed |
| T-159-18 | 159-04 | Tampering | the structural contract validator | medium | mitigate | The plan reads it and never writes it; a numeric-stat diff against the V121 close is an acceptance command, and its zero-commit history since that close is measured in Task 1. | closed |
| T-159-19 | 159-04 | Spoofing | the milestone tag reaching the reader | medium | mitigate | The tag is a literal looked up in the close-SHA map, which throws when the key is absent; the wrong-tag negative probe demonstrates that a mismatched tag produces a real failure rather than a silent pass. | closed |
| T-159-20 | 159-04 | Repudiation | claiming a frozen result from a live run | medium | mitigate | The C17 detail string names the frozen corpus and the materialized file count, the perturbation test shows the working tree no longer influences the verdict, and both triples are recorded side by side. | open — below high threshold (non-blocking) |
| T-159-SC | 159-04 | Tampering | npm/pip/cargo installs | low | accept | This plan performs zero package-manager installs. It edits one harness file and runs existing Node scripts using built-ins only. | closed |
| T-159-21 | 159-05 | Information Disclosure | a vacuously green corpus-wide zero | high | mitigate | Every corpus-wide negative carries the corpus-floor sentinel as a hard FAIL below 250 files, the floor literal's presence is a grep-based acceptance command, and the live documentation file count is measured and asserted above the floor. | closed |
| T-159-22 | 159-05 | Repudiation | a needle attributed to the wrong phase | high | mitigate | Every corpus-wide zero carries a full boundary series proving the transition landed inside the owning phase's window and stayed stable at every later boundary; the predecessor's misattributions are enumerated and superseded in writing. | closed |
| T-159-23 | 159-05 | Elevation of Privilege | the one permitted spawn | medium | mitigate | Argument-array form only, asserted by a grep acceptance command; the spawn is paired with a fail-loud presence check so a missing tool cannot be laundered into a skip. | closed |
| T-159-24 | 159-05 | Tampering | a needle that cannot fail | medium | mitigate | Every needle is perturbed in a scratch copy and its FAIL output recorded before it enters a committed leaf; a needle with no recorded failure does not ship. | closed |
| T-159-25 | 159-05 | Spoofing | a byte-length or count needle moved by line-ending conversion | medium | mitigate | Every leaf normalizes line endings before counting, and the byte-length needle records both the normalized and the raw converted-line-ending value so the normalization is visible. | closed |
| T-159-SC | 159-05 | Tampering | npm/pip/cargo installs | low | accept | This plan performs zero package-manager installs. It creates three Node validators using built-ins only. | closed |
| T-159-26 | 159-06 | Information Disclosure | a missing tool laundered into a skip | high | mitigate | Each spawn is paired with a hard, non-skipping presence check on the tool file; the skip classifier fires only on a missing runtime. A grep asserting the presence-check pairing and a run asserting no skip on the presence check are acceptance commands. | closed |
| T-159-27 | 159-06 | Elevation of Privilege | two subprocess launches from a chain member | high | mitigate | Argument-array form only, asserted by grep; the child cap is set explicitly to 600 seconds so a hung child is terminated rather than left running; no shell string is constructed anywhere. | closed |
| T-159-28 | 159-06 | Denial of Service | the enforcing gate's runtime on every apex | medium | mitigate | The full-run wall time is measured before the wiring lands, the per-apex cost is stated as an accepted number in the leaf's own comment, and the 600-second cap bounds the worst case. | closed |
| T-159-29 | 159-06 | Repudiation | a needle attributed to the wrong phase | medium | mitigate | Every per-file needle is confined to the owning phase's own changed-file list, computed at execution time; the two candidates outside that list are dropped and the drops recorded. | closed |
| T-159-30 | 159-06 | Tampering | an unstable needle chosen for convenience | medium | mitigate | Em-dash counts, the citation-blocked phrase and the build-run totals are each rejected with a stated reason, and every surviving needle carries a scratch-copy failability proof. | closed |
| T-159-SC | 159-06 | Tampering | npm/pip/cargo installs | low | accept | This plan performs zero package-manager installs. It creates two Node validators that spawn already-tracked scripts. | closed |
| T-159-31 | 159-07 | Information Disclosure | a leg that silently skips under the nested flag | high | mitigate | The conversion leg deliberately omits the nested-skip branch, and its real pass is asserted in both a plain and a nested run by two separate acceptance commands that fail on a skip marker. | closed |
| T-159-32 | 159-07 | Tampering | the skip set gaining an entry | high | mitigate | The self invariant hard-asserts the skip set's size is zero, and a programmatic declaration assertion is an acceptance command, so an added entry fails the apex and the plan. | closed |
| T-159-33 | 159-07 | Elevation of Privilege | over a hundred subprocess launches | medium | mitigate | Argument-array spawns only, asserted by grep; explicit caps of 600 and 300 seconds bound every child, asserted by grep for both values. | closed |
| T-159-34 | 159-07 | Repudiation | an unfalsifiable archive-root token | medium | mitigate | The token is named from the decision record rather than transcribed, and its in-phase unfalsifiability, the resolver's skip-pass behaviour, and the predecessor that carried a wrong token for two milestones are all recorded in the evidence document. | closed |
| T-159-35 | 159-07 | Tampering | a negative content assertion that silently rots | medium | mitigate | No negative substring assertion about any harness is written; a detector for that pattern is an acceptance command, and the positive-only rule is stated in the plan's prohibitions. | closed |
| T-159-SC | 159-07 | Tampering | npm/pip/cargo installs | low | accept | This plan performs zero package-manager installs. It creates one Node orchestrator that spawns already-tracked scripts. | closed |
| T-159-36 | 159-08 | Information Disclosure | a shallow checkout silently disabling frozen reads | high | mitigate | Every checkout step pairs one-to-one with a full-depth fetch setting, asserted by a count-equality acceptance command that fails when the two counts diverge. | closed |
| T-159-37 | 159-08 | Tampering | third-party action versions | medium | mitigate | Every action is pinned at a major version already used across the eighteen existing workflows; the newly introduced Python action is additionally pinned at an explicit minor, and its job placement is asserted by a count of exactly three. | closed |
| T-159-38 | 159-08 | Denial of Service | a probe job with a dependency key | medium | mitigate | The probe job's dependency-free requirement is asserted by a scoped scan of that job's own block, and the globbing chain member is run standalone before and after the commit. | closed |
| T-159-39 | 159-08 | Repudiation | a forward-duplicated predecessor apex job | medium | mitigate | A phase-numbered job scan asserts exactly six jobs, all at or above the first content phase of this milestone, so no predecessor apex can be present unnoticed. | closed |
| T-159-40 | 159-08 | Elevation of Privilege | workflow triggers | medium | mitigate | The trigger set is asserted to carry no push trigger, matching every existing workflow; the file is dispatched manually and on a schedule only. | closed |
| T-159-SC | 159-08 | Tampering | npm/pip/cargo installs | low | accept | This plan performs zero package-manager installs. It authors one YAML file that invokes already-tracked Node and Python scripts. | closed |
| T-159-41 | 159-09 | Information Disclosure | secrets inside the bundle's two roots | high | mitigate | Both roots are fetched and every reachable blob is walked with an enumerated pattern set of at least five named classes; per-pattern counts are recorded, and a true hit removes the bundle from the tracked tree and hands the owner an explicit choice rather than being absorbed. | closed |
| T-159-42 | 159-09 | Information Disclosure | the scan echoing its own subject | high | mitigate | The label is derived in-process and held in a variable; an absence check over the evidence document is an acceptance command, so a leak into the record fails the task. This is the same defect class the leak scrub itself was created to fix. | closed |
| T-159-43 | 159-09 | Repudiation | a collage of readings taken at different commits | medium | mitigate | Every current reading is re-run at one head, that head is quoted once and asserted identical across them, and every reading that cannot be reproduced is explicitly marked carried and attributed to the plan that produced it. | closed |
| T-159-44 | 159-09 | Tampering | an incomplete record reaching the checkpoint | medium | mitigate | A checkpoint-readiness index enumerates all eleven presentation items and an acceptance command fails when any has no section to read from. | closed |
| T-159-SC | 159-09 | Tampering | npm/pip/cargo installs | low | accept | This plan performs zero package-manager installs. It runs git plumbing and existing Node validators and writes one planning document. | closed |
| T-159-45 | 159-10 | Information Disclosure | publishing the scrubbed label or the archived history | high | mitigate | The derived-token scan is re-run across all five surfaces at the checkpoint and the proceed branch is withheld unless every surface reads 0; after the push the published tree is scanned again. The installed pre-push guard rejects any archive refspec and any range containing the scrub-source commit, and its allow output is recorded so its execution is proven. | closed |
| T-159-46 | 159-10 | Elevation of Privilege | an over-broad push command | high | mitigate | The plan names exactly one permitted command shape and prohibits all-refs, all-tags, mirror, force, the archive ref and the secondary remote; two acceptance commands assert the landing branch and the archive ref are absent from the remote afterwards. | closed |
| T-159-47 | 159-10 | Repudiation | an unrecorded or misattributed shared commit | medium | mitigate | The resulting head is recorded, and the plan states explicitly that it is provisional because later boundary commits will supersede it — the exact supersession the predecessor milestone had to make. | closed |
| T-159-48 | 159-10 | Tampering | a red or gap absorbed rather than fixed | medium | mitigate | The plan states that no accepted-red disposition exists at this close and none will be created; the decline branch records the requirement unmet rather than inventing a disposition. | closed |
| T-159-SC | 159-10 | Tampering | npm/pip/cargo installs | low | accept | This plan performs zero package-manager installs. It runs git commands and writes one planning document. | closed |
| T-159-49 | 159-11 | Information Disclosure | the blind agent reading the owner's live repository | high | mitigate | The agent runs from a working directory outside this repository in its own throwaway clone, and the plan records verbatim that no flag confines shell execution to a directory, so the confinement is prompt-barred and same-host rather than sandboxed. The returned report is checked for planning-tree citations. | closed |
| T-159-50 | 159-11 | Repudiation | axes measuring different trees | high | mitigate | Every dispatched run's head is read back and asserted equal to the recorded shared commit, both clones are checked out at that commit, and the value is quoted three times from three independent sources with an acceptance command counting those occurrences. | closed |
| T-159-51 | 159-11 | Information Disclosure | a shallow clone silently disabling frozen reads | high | mitigate | Both clones are proved non-shallow before anything runs in them and the assertion output is quoted; the clones are of the remote, never of a local path. | closed |
| T-159-52 | 159-11 | Tampering | an incomplete leg recorded as a pass | medium | mitigate | An incomplete leg is defined by an observable condition — no output growth within a budget below the tool cap — is labelled incomplete, and is attributed to a named finding only when a three-way green test holds; otherwise it is an open finding. | closed |
| T-159-53 | 159-11 | Tampering | a red absorbed by an invented disposition | medium | mitigate | The plan states in its prohibitions and in the checkpoint context that no accepted-red disposition exists or will be created, and the unmet branch is offered explicitly as the alternative to remediation. | closed |
| T-159-SC | 159-11 | Tampering | npm/pip/cargo installs | low | accept | This plan performs zero package-manager installs. It clones, runs existing scripts, and dispatches CI runs. | closed |
| T-159-54 | 159-12 | Repudiation | a dropped deferral | high | mitigate | A mapping table enumerates all twelve predecessor deferred ideas against their carrying entries, merges are named and justified, and a heading-count acceptance command asserts the ledger has at least as many entries as the mapping requires. | closed |
| T-159-55 | 159-12 | Tampering | a carried rather than measured source count | medium | mitigate | Every source row quotes its own command and result at authoring time; two acceptance commands assert the predecessor's heading and numbered-item patterns still match, so a changed structure forces a rebuild rather than a stale carry. | closed |
| T-159-56 | 159-12 | Information Disclosure | a scrubbed value or a purged filename in a close artifact | medium | mitigate | Both prohibitions are stated, the planning-tree validators run before and after each commit, and a platform-blockquote grep asserts zero on both documents. | closed |
| T-159-57 | 159-12 | Repudiation | an unrecorded falsification | medium | mitigate | The corrections section requires at least seven entries each naming its falsifying measurement, and the four sharing a single cause are grouped so the common root is visible rather than implied. | closed |
| T-159-SC | 159-12 | Tampering | npm/pip/cargo installs | low | accept | This plan performs zero package-manager installs. It writes two planning documents and runs existing Node validators. | closed |
| T-159-58 | 159-13 | Tampering | a conversion failure landing after an irreversible flip | high | mitigate | The bundle assertion runs before the gate by design, expressed against a tree object name because the build commit is unreachable after the squash; a rebuild, if needed, also runs before the flip. Both assertions are acceptance commands. | closed |
| T-159-59 | 159-13 | Repudiation | a close-gate commit a future milestone cannot recover | high | mitigate | The subject carries both the milestone version and the close marker phrase; the discriminator is asserted to return 0 before the commit and exactly 1 after, and both readings are recorded. | closed |
| T-159-60 | 159-13 | Tampering | the close split across two commits by the harness-owned flip | medium | mitigate | The two harness rows are hand-flipped inside the gate commit and the requirement ids are declared by this plan alone, so the boundary flip finds them already validated; an acceptance command asserts the metadata commit's stat carries no requirements-document path. | closed |
| T-159-61 | 159-13 | Information Disclosure | a documentation edit slipping into the close | medium | mitigate | An empty-documentation-diff assertion runs in the pre-gate task and again after the gate commit, and the phase prohibits documentation edits outright. | closed |
| T-159-62 | 159-13 | Elevation of Privilege | a tag created or pushed early | medium | mitigate | An acceptance command asserts no tag exists at the end of this plan; the tag and its push are named as archival steps in the written handoff, and no force flag is permitted on either. | closed |
| T-159-SC | 159-13 | Tampering | npm/pip/cargo installs | low | accept | This plan performs zero package-manager installs. It edits planning documents and runs existing Node validators. | closed |

*Status: open · closed · open — below high threshold (non-blocking)*
*Severity: critical > high > medium > low — only open threats at or above workflow.security_block_on count toward threats_open*
*Disposition: mitigate (implementation required) · accept (documented risk) · transfer (third-party)*

---

## Accepted Risks Log

| Risk ID | Threat Ref | Rationale | Accepted By | Date |
|---------|------------|-----------|-------------|------|
| AR-159-SC-01 | T-159-SC (159-01) | Plan 159-01 touched no dependency manifest (package.json, requirements.txt, Cargo.toml or equivalent); verified by the auditor against the plan's own commits with `git show --stat` or a name-only log, 0 manifest paths. Supply-chain exposure unchanged by this plan. | gsd-security-auditor (Sonnet), orchestrator write | 2026-09-10 |
| AR-159-SC-02 | T-159-SC (159-02) | Plan 159-02 touched no dependency manifest (package.json, requirements.txt, Cargo.toml or equivalent); verified by the auditor against the plan's own commits with `git show --stat` or a name-only log, 0 manifest paths. Supply-chain exposure unchanged by this plan. | gsd-security-auditor (Sonnet), orchestrator write | 2026-09-10 |
| AR-159-SC-03 | T-159-SC (159-03) | Plan 159-03 touched no dependency manifest (package.json, requirements.txt, Cargo.toml or equivalent); verified by the auditor against the plan's own commits with `git show --stat` or a name-only log, 0 manifest paths. Supply-chain exposure unchanged by this plan. | gsd-security-auditor (Sonnet), orchestrator write | 2026-09-10 |
| AR-159-SC-04 | T-159-SC (159-04) | Plan 159-04 touched no dependency manifest (package.json, requirements.txt, Cargo.toml or equivalent); verified by the auditor against the plan's own commits with `git show --stat` or a name-only log, 0 manifest paths. Supply-chain exposure unchanged by this plan. | gsd-security-auditor (Sonnet), orchestrator write | 2026-09-10 |
| AR-159-SC-05 | T-159-SC (159-05) | Plan 159-05 touched no dependency manifest (package.json, requirements.txt, Cargo.toml or equivalent); verified by the auditor against the plan's own commits with `git show --stat` or a name-only log, 0 manifest paths. Supply-chain exposure unchanged by this plan. | gsd-security-auditor (Sonnet), orchestrator write | 2026-09-10 |
| AR-159-SC-06 | T-159-SC (159-06) | Plan 159-06 touched no dependency manifest (package.json, requirements.txt, Cargo.toml or equivalent); verified by the auditor against the plan's own commits with `git show --stat` or a name-only log, 0 manifest paths. Supply-chain exposure unchanged by this plan. | gsd-security-auditor (Sonnet), orchestrator write | 2026-09-10 |
| AR-159-SC-07 | T-159-SC (159-07) | Plan 159-07 touched no dependency manifest (package.json, requirements.txt, Cargo.toml or equivalent); verified by the auditor against the plan's own commits with `git show --stat` or a name-only log, 0 manifest paths. Supply-chain exposure unchanged by this plan. | gsd-security-auditor (Sonnet), orchestrator write | 2026-09-10 |
| AR-159-SC-08 | T-159-SC (159-08) | Plan 159-08 touched no dependency manifest (package.json, requirements.txt, Cargo.toml or equivalent); verified by the auditor against the plan's own commits with `git show --stat` or a name-only log, 0 manifest paths. Supply-chain exposure unchanged by this plan. | gsd-security-auditor (Sonnet), orchestrator write | 2026-09-10 |
| AR-159-SC-09 | T-159-SC (159-09) | Plan 159-09 touched no dependency manifest (package.json, requirements.txt, Cargo.toml or equivalent); verified by the auditor against the plan's own commits with `git show --stat` or a name-only log, 0 manifest paths. Supply-chain exposure unchanged by this plan. | gsd-security-auditor (Sonnet), orchestrator write | 2026-09-10 |
| AR-159-SC-10 | T-159-SC (159-10) | Plan 159-10 touched no dependency manifest (package.json, requirements.txt, Cargo.toml or equivalent); verified by the auditor against the plan's own commits with `git show --stat` or a name-only log, 0 manifest paths. Supply-chain exposure unchanged by this plan. | gsd-security-auditor (Sonnet), orchestrator write | 2026-09-10 |
| AR-159-SC-11 | T-159-SC (159-11) | Plan 159-11 touched no dependency manifest (package.json, requirements.txt, Cargo.toml or equivalent); verified by the auditor against the plan's own commits with `git show --stat` or a name-only log, 0 manifest paths. Supply-chain exposure unchanged by this plan. | gsd-security-auditor (Sonnet), orchestrator write | 2026-09-10 |
| AR-159-SC-12 | T-159-SC (159-12) | Plan 159-12 touched no dependency manifest (package.json, requirements.txt, Cargo.toml or equivalent); verified by the auditor against the plan's own commits with `git show --stat` or a name-only log, 0 manifest paths. Supply-chain exposure unchanged by this plan. | gsd-security-auditor (Sonnet), orchestrator write | 2026-09-10 |
| AR-159-SC-13 | T-159-SC (159-13) | Plan 159-13 touched no dependency manifest (package.json, requirements.txt, Cargo.toml or equivalent); verified by the auditor against the plan's own commits with `git show --stat` or a name-only log, 0 manifest paths. Supply-chain exposure unchanged by this plan. | gsd-security-auditor (Sonnet), orchestrator write | 2026-09-10 |

*Accepted risks do not resurface in future audit runs.*

---

## Open Threats (non-blocking)

| Threat ID | Severity | Why open |
|---|---|---|
| T-159-20 | medium | CR-01: v1.21-milestone-audit.mjs:138,151,199,250 gate root-singleton doc paths with live existsSync(join(process.cwd(), p)) instead of FROZEN.has(p); the perturbation test in EVIDENCE §13 only exercised a sidecar-pinned line, so 'working tree no longer influences the verdict' is proven for one dimension only. Dormant while the 5 singleton files exist at HEAD. |

---

## Unregistered Flags

Surface the auditors found that no T-159-NN row models. None blocks; each is recorded so it cannot be lost.

1. CR-01 live-existsSync sites in v1.21-milestone-audit.mjs:138,151,199,250 — no threat row in 159-01..04; recommend a v1.23 fix item
2. WR-01 confirmed live: the workflow's check-phase-154 job (lines 121-134) has no setup-python step while check-phase-154.mjs V-154-SELFTEST spawns python3 and hard-FAILs on a missing runtime (source lines 167-171); masked only by ubuntu-latest's system python3. Add a setup-python step to that job or model it as a threat row.
3. WR-03: pre-push.sh is optional, per-clone and bypassable with no CI backstop; belongs to T-159-02 and T-159-45/46. No 05-09 threat relies on it.
4. CR-01 cross-reference: v1.21-milestone-audit.mjs live existsSync at 4 sites; does not undermine T-159-31 (the HARN03 leg genuinely never skips) but the leg exercises a harness with a latent frozen-read gap.

---

## Auditor Notes

- pre-push guard not installed at push time (EVIDENCE §27.2) does not reopen T-159-02: 159-01 promised only a tracked, documented, clone-tested script; corroborates WR-03; relevant to T-159-45/46 in the 10-13 slice
- T-159-45 closed as disclosed-and-compensated: the pre-push guard was not installed in .git/hooks at 159-10's push (EVIDENCE §27.2) and did not fire; independent post-push scans of the two rejection conditions substituted and were re-verified live (landing branch and refs/archive/* absent from remote, five-surface token scan 0). Guard fired (pre-push: OK, §28.2) on 159-11's corrective push.

---

## Security Audit Trail

| Audit Date | Threats Total | Closed | Open | Run By |
|------------|---------------|--------|------|--------|
| 2026-09-10 | 75 | 74 | 1 | 3× gsd-security-auditor (Sonnet) via /gsd-secure-phase 159; orchestrator Claude Fable 5.1 |

---

## Sign-Off

- [x] All threats have a disposition (mitigate / accept / transfer)
- [x] Accepted risks documented in Accepted Risks Log
- [x] `threats_open: 0` confirmed (one medium-severity threat open, below the `high` block threshold)
- [x] `status: secured` set in frontmatter

**Approval:** secured 2026-09-10 — T-159-20 carried open until CR-01 is fixed.
