---
phase: "156"
slug: "style-extension-full-landing-verification"
status: secured
# threats_open = count of OPEN threats at or above workflow.security_block_on severity (the blocking gate)
threats_open: 0
asvs_level: 1
created: "2026-09-05"
---

# Phase 156 — Security

> Per-phase security contract: threat register, accepted risks, and audit trail.

Register origin: **authored at plan time** — all six PLAN.md files carry a `<threat_model>`
block. 30 numbered threats (T-156-01 … T-156-30) plus `T-156-SC` repeated once per plan.
Verified by `gsd-security-auditor` at ASVS level 1, `block_on: high`, under the
verify-mitigations constraint (no new-threat scanning).

---

## Trust Boundaries

| Boundary | Description | Data Crossing |
|----------|-------------|---------------|
| repository working tree → mutating CLI tools | `sweep3.py --apply` and `--chunk-file` writes cross here; plan 156-01 stays on the dry-run side | document prose, substitution output |
| repository content → committed measurement artifact | measured strings from `docs/` and `scripts/validation/` copied verbatim into git-tracked JSON | document sentences, validator literals |
| local filesystem → scratch perturbation directory | perturbation copies live outside the repository and must not leak back as untracked paths | copied corpus files |
| repository working tree → `verify2.py` / the link differ | both read the working tree rather than a git ref, so uncommitted content would enter a recorded measurement | tally counts, link state |
| archived milestone directory → path resolver | the Phase 154 artifact relocates at milestone close; a silent null poisons the comparison | cross-phase baseline values |
| repository prose → fresh `claude -p` judge processes | document text enters a model context that could be steered by instructions embedded in the prose being judged | hunk text, bounded context window |
| judge output → committed verdict record and applied fixes | model-authored verdicts and replacement lines written into tracked files | model-generated prose |
| Phase 155 pinned constructs → batch-10 prose edits | three live equality assertions authored one phase earlier sit inside edited documents | pinned headings, anchors, trailing byte |
| batch-10 verdict record → the previously judged 406-row record | two records in one directory with overlapping key semantics | verdict rows |

---

## Threat Register

| Threat ID | Category | Component | Severity | Disposition | Mitigation | Status |
|-----------|----------|-----------|----------|-------------|------------|--------|
| T-156-01 | Tampering | `sweep3.py` perturbation runs (156-01 T3) | high | mitigate | Dry runs against a scratch root outside the repo; `--apply` never passed; `git status --porcelain -- docs/` asserted empty | closed |
| T-156-02 | Tampering | `pins2.py` output redirection | high | mitigate | Live pin list written only to `156-LIVE-PINS-before.txt`; `git diff --exit-code` on `_CONTENT-PINS.txt` is an acceptance criterion | closed |
| T-156-03 | Information disclosure | `156-GATE-BASELINE.json` guard register | medium | mitigate | Pre-commit GUID/UPN/tenant-token scrub per the Phase 155 precedent | closed |
| T-156-04 | Tampering | `judge-packets.py` proof-run packet files | medium | mitigate | Packets written to a scratch path outside the repo; no new untracked repo path afterwards | closed |
| T-156-05 | Tampering | `verify2.py` before-half measurement | high | mitigate | Clean-tree precondition asserted immediately before and after as an acceptance criterion | closed |
| T-156-06 | Spoofing | Phase 154 artifact resolution | high | mitigate | Two-candidate glob failing loud on zero and on >1; all three outcomes proven by observation | closed |
| T-156-07 | Repudiation | embedded Phase 154 values going stale | medium | mitigate | `source_sha` + content hash + literal re-runnable `hash_method` and re-derivation procedure | closed |
| T-156-08 | Information disclosure | enumerated residual sites / quoted lines in committed JSON | medium | mitigate | Pre-commit GUID/UPN/tenant-token scrub | closed |
| T-156-09 | Tampering | platform-token quotation inside a `.planning/` artifact | medium | mitigate | Quotation confined to a fence or backticks; `check-phase-54.mjs` re-run after commit | closed |
| T-156-10 | Tampering | `sweep3.py --apply` over the `docs` root | high | mitigate | Apply-then-restore with a fixed-string target list + subset assertion on the changed-path list before every commit | closed |
| T-156-11 | Tampering | indirect prompt injection from judged prose | medium | mitigate | Judge receives committed prompt bytes + packet JSON inline, no repository access; blocklist satisfied structurally | closed |
| T-156-12 | Tampering | judge fix silently reverting the em-dash canon | high | mitigate | Per-hunk em-dash count guard, counts recorded before/after every applied fix | closed — see note 1 |
| T-156-13 | Tampering | overwrite of the 406-row verdict record | high | mitigate | Sibling record + `git diff --exit-code` acceptance criterion on the existing record and both dispositions files | closed |
| T-156-14 | Information disclosure | quoted lines in committed packets and findings | medium | mitigate | Pre-commit GUID/UPN/tenant-token scrub | closed |
| T-156-15 | Tampering | corpus-wide apply reaching deferred documents outside the 13 | high | mitigate | Apply-then-restore against the 13-line target list with a subset commit gate; restored paths recorded | closed |
| T-156-16 | Tampering | an edit moving a Phase 155 pinned construct | high | mitigate | Three Phase 155 pin measurements before and after every commit; bare apex re-run after each commit | closed |
| T-156-17 | Tampering | admin rule family rewriting a controlled-vocabulary frontmatter value | high | mitigate | Byte-for-byte frontmatter comparison across all 13 blocks + direct negative grep for the rewritten audience value | closed |
| T-156-18 | Tampering | an edit fabricating a verbatim vendor quotation | high | **accept** | Declared control (base set never applied; residue rows guard the citation-blocked site) held for its named site but is **narrower than the threat category** — see Accepted Risks | accepted |
| T-156-19 | Information disclosure | quoted document content in the committed audit record | medium | mitigate | Pre-commit GUID/UPN/tenant-token scrub | closed |
| T-156-20 | Tampering | indirect prompt injection from judged prose (full batch) | medium | mitigate | Same isolated dispatch shape as T-156-11; no repository access | closed |
| T-156-21 | Tampering | judge replacement line reverting the em-dash canon | high | mitigate | Per-hunk em-dash count guard with before/after counts | closed — see note 1 |
| T-156-22 | Tampering | overwrite of the previously judged 406-row record | high | mitigate | Sibling record under the owner's D-20 ruling + git-diff exit status acceptance criterion | closed |
| T-156-23 | Tampering | judge fix breaking an armed sentence or a Phase 155 pin | high | mitigate | Fixed-string re-checks for both armed sentences and all three Phase 155 pins after the judge-fix commit, plus bare apex | closed — see note 1 |
| T-156-24 | Repudiation | fix applied with no rule change, re-broken by the next sweep | high | mitigate | Every deletion bound to its causing verdict id; idempotency proof over all 36 rule sets is a hard zero | closed |
| T-156-25 | Information disclosure | quoted evidence spans / replacement lines in committed records | medium | mitigate | Pre-commit GUID/UPN/tenant-token scrub | closed |
| T-156-26 | Tampering | link differ reading a dirty working tree | high | mitigate | Clean-tree precondition asserted before and after the after-half commit as an acceptance criterion | closed |
| T-156-27 | Repudiation | a suppressed or omitted component difference | high | mitigate | All three columns required per component; any difference without a named explanation fails; identical components recorded in full rather than omitted | closed |
| T-156-28 | Spoofing | a stale embedded Phase 154 block | medium | mitigate | Content hash re-derived against the resolved artifact and the check timestamped (`rederivation_checked_at`) | closed |
| T-156-29 | Tampering | a lost live validator literal invisible to the committed pins file | high | mitigate | Live-corpus pin differ compares after against before and fails on any loss; legacy differ recorded alongside, its file asserted byte-unchanged | closed |
| T-156-30 | Information disclosure | residual sites / quoted lines / findings in the committed record | medium | mitigate | Pre-commit GUID/UPN/tenant-token scrub | closed |
| T-156-SC (×6, one per plan) | Tampering | package-manager installs | low | accept | No npm/pip/cargo install runs in this phase; RESEARCH.md Package Legitimacy Audit records the phase as not-applicable | closed |

*Status: open · closed · open — below high threshold (non-blocking)*
*Severity: critical > high > medium > low — only open threats at or above workflow.security_block_on count toward threats_open*
*Disposition: mitigate (implementation required) · accept (documented risk) · transfer (third-party)*

**Note 1 — three guards are closed but were never exercised.** T-156-12, T-156-21 and
T-156-23 all gate the *application of a judge fix*. Plan 156-05 dispatched **zero** judge
processes (0 non-empty packets from 27 modal-bearing candidates, all of which retained their
modal), so no fix was ever applied and `emdash_count_guard.applied` is `false` in both plans.
The mechanisms exist and are correctly wired; they are **structurally untested in this phase**.
Recorded here so a later reader does not mistake "closed" for "proven under load."

---

## Accepted Risks Log

| Risk ID | Threat Ref | Rationale | Accepted By | Date |
|---------|------------|-----------|-------------|------|
| AR-156-01 | T-156-18 | Incident remediated, residual class named and handed forward — see below | Owner (Joshua Anderson) | 2026-09-05 |
| AR-156-02 | T-156-18 | Em-dash tightening inside cited document titles ruled in scope for the style pass — see below | Owner (Joshua Anderson) | 2026-09-05 |

### AR-156-01 — T-156-18 wrapped-guard citation fabrication

**What happened.** `subs-admin-batch9.tsv`'s capitalised-`Admin` row rewrote two `[DIRECT]`
HP page-title citations in `docs/reference/firmware-oem-matrix.md:183-185` to the nonexistent
product "HP Sure Administrator". The row carries a `(?<!Sure )` lookbehind, but `sweep3.py`
processes one line at a time, so when the phrase is line-wrapped (`HP Sure\n  Admin`) the
lookbehind cannot see its prefix and the rule fires. Proven by direct `re.sub()` of the shipped
row: inline `"through HP Sure Admin"` → **blocked**; wrapped `"  Admin and CMSL, ... and HP Sure"`
→ **fires**.

**Why the declared mitigation did not stop it.** T-156-18's control was scoped to one named
site (the `desired` row at `docs/operations/patch-management/08-windows-app-updates.md:266`).
That site genuinely held — a dry run still reports exactly 1 total edit there. But the threat
*category* is broader than the site the control names, and no independent outcome-level check
existed for "no vendor citation was altered anywhere in the corpus" — unlike T-156-16 and
T-156-17, which verify the *result* by byte-diff and negative grep and are therefore wrap-immune.
That architectural difference is the finding: **T-156-18 trusted a substitution rule's own
internal lookbehind instead of checking the outcome independently.**

**Detection gap.** Apex `check-phase-153` (111/0), C17 (237/0) and `check-phase-54` (32/0) were
**all green** with the falsified citation in the tree. Those mechanisms detect a *lost pinned*
string; none can see an *introduced* one. The modal-loss judge pass could not see it either —
the substitution is not a modal. It was found only by `/gsd-code-review` (CR-01).

**Remediation applied.** Commit `bb22f89a` — both sites restored to "HP Sure Admin" and reflowed
so the phrase is not line-split, which also makes the existing guard effective at those sites.
Verified: zero `Sure\s+Administrator` remain corpus-wide (multi-line regex, not a single-line
grep); `git diff --word-diff` shows exactly two `Administrator`→`Admin` changes and the rest
whitespace; the structural gate is green post-fix.

**Residual exposure, accepted.** The class is not closed by that fix:
1. **Every lookbehind guard in every shipped `subs-*.tsv` is unenforced wherever its prefix and
   its token straddle a line break**, corpus-wide. Recorded as `WINDOWS.md` row 15 (`status: open`).
2. **WR-05** — `subs-batch10.tsv` row 33's `admin` regex has no guard against `admin.hp.com`-style
   continuations. Confirmed **not triggered** in this corpus, but it is a second live entry point
   for the same threat category.

**Owner.** Phase 157 (STD + HYG — Authoring Standard & Corpus Hygiene), via `WINDOWS.md` row 15.
The durable fix is an outcome-level control of the T-156-16/17 shape — e.g. reflow-then-scan, or
a corpus-wide post-apply diff of citation-bearing lines against a known-vendor-name allowlist —
not a wider lookbehind, which would remain wrap-blind by construction.

> ⚠ **Enforcement caveat, stated deliberately.** `workflow.windows_enforce` is **false** in this
> project, so `WINDOWS.md` row 15 currently gates nothing — `/gsd-ship` will not block on it. This
> handoff rests on the roadmap being followed, not on a mechanical gate. The owner was shown this
> and accepted it rather than enabling enforcement, because turning it on would also block shipping
> on 12 unrelated pre-existing ledger rows from Phase 147 onward.

### AR-156-02 — em-dash tightening inside cited document titles

Running the missing corpus-wide citation check (the very control AR-156-01 identifies as absent)
surfaced a **second instance of the same category**: the em-dash pass tightened the title of a
cited vendor document in **11 places** across two files —

```
- **Source:** [HP Connect for Microsoft Endpoint Manager — User Guide](…)   ← as published by HP
+ **Source:** [HP Connect for Microsoft Endpoint Manager—User Guide](…)     ← after the pass
```

Sites: `docs/operations/firmware-bios/03-hp-bios-configuration.md` (×10),
`docs/recipes/05-enterprise-update-plan.md` (×1).

**Owner ruling: leave tightened — in scope for the style pass.** Rationale: the change is
typographic rather than factual, no fact or product name is fabricated, the cited title remains
findable, and the tightening applies uniformly corpus-wide. This is recorded as a deliberate
ruling so a future reviewer reads it as a decision rather than an unnoticed side effect, and does
not re-litigate it.

Distinguished from AR-156-01: that one fabricated a **nonexistent product name** inside a
`[DIRECT]` evidence claim and was reverted; this one preserves the title's words and alters only
dash spacing.

---

## Security Audit Trail

| Audit Date | Threats Total | Closed | Open | Run By |
|------------|---------------|--------|------|--------|
| 2026-09-05 | 31 | 30 | 1 → 0 (accepted) | gsd-security-auditor (ASVS L1, block_on high) |

**Audit method.** Register read from the six PLAN `<threat_model>` blocks (not paraphrased).
Auditor re-derived rather than inherited: 20 of 31 threats were confirmed by a command run during
the audit (`git diff --quiet`, byte comparison, GUID/UPN scrub, validator re-run); the remainder
were confirmed by reading a recorded measurement in `156-GATE-BASELINE.json`. The auditor's
verdict was `## OPEN_THREATS` with `threats_open: 1`; T-156-18 moved to `accepted` by owner
ruling, not by the auditor.

**No SUMMARY `## Threat Flags` sections exist** in any of the six summaries — the register came
entirely from plan-time threat models.

### Unregistered tooling findings (tracked, non-blocking)

Surfaced by `156-REVIEW.md`, no register mapping, carried here so they are not lost:

| Ref | Location | Finding |
|-----|----------|---------|
| WR-01 | `scripts/docs-style/judge-packets.py:42-45` | `repo_root_of` swallows a failed `git rev-parse` and silently falls back to `.` — the same "confident wrong reading" class this phase fixed elsewhere in the same file |
| WR-04 | `scripts/docs-style/pins2.py:23-26` | Non-`\n` escape sequences are silently mis-decoded, which can under-pin a validator literal — a latent hole in the exact mechanism T-156-02 and T-156-29 rely on. Not observed to have caused a miss in the current 685-pin set |
| WR-05 | `scripts/docs-style/subs-batch10.tsv` row 33 | `admin` regex has no `admin.hp.com` guard; not triggered in this corpus, but a second live entry point for the T-156-18 category (see AR-156-01) |

---

## Sign-Off

- [x] All threats have a disposition (mitigate / accept / transfer)
- [x] Accepted risks documented in Accepted Risks Log (AR-156-01, AR-156-02)
- [x] `threats_open: 0` confirmed
