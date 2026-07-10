# Phase 124: Pipeline Fix, Descriptive-Filename Pass & Draft-Label Grounding Probe - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-07-08
**Phase:** 124-pipeline-fix-descriptive-filename-pass-draft-label-grounding
**Areas discussed:** PIPE-03 alias-fix approach, PIPE-04 filename scheme, PIPE-05 probe execution, Phase sequencing/scope

**Method:** All four areas selected by the owner and delegated to a 12-agent `/adversarial-review` (Proponent → Adversary → Referee per area, 3 waves). Each Referee independently verified decisive claims against the repo (re-ran pandoc 3.7.0.2, re-ran the slug sanitizer over all 221 RE-index titles, read the v1.15 `PIPE-02-FINDINGS.md`). Two follow-up decisions (REQUIREMENTS.md:35 correction, SC4 rewording) were surfaced by the referees and confirmed by the owner via AskUserQuestion.

---

## PIPE-03 — Pandoc nav-footer alias fix

| Option | Description | Selected |
|--------|-------------|----------|
| A — canonical invocation fix | `--from=markdown-yaml_metadata_block` (one pipeline edit) | |
| A2 — frontmatter-extract + `--metadata-file` | Disable body YAML, promote frontmatter separately | |
| B — corpus-wide nav-footer normalization | Rewrite footers across the corpus | |
| C-blanket — pipeline preprocessing (all blank-preceded `---`) | Rewrite every blank-preceded `---` → `* * *` | |
| **C-surgical — pipeline preprocessing (anchored)** | Rewrite `---`→`* * *` only when next non-blank line matches `^\s*\*(Previous\|Next step)\b`; ephemeral temp copy; source untouched; + fence guard + fail-closed assertion + generator emits `* * *` | ✓ |

**Referee verdict (conf. 0.9):** C-surgical. A/A2 empirically break OQ4 custom-property promotion (0/9 props; body leak). B is a frozen-surface violation (20 of 26 footer files frozen v1.15). C-blanket over-matches 27× (718 blank-preceded `---` vs 26 nav-openers). Surgical anchor covers 100% of the 12 real failures with 0 false hits across the 277-file corpus.
**Notes:** True defect surface verified = 12 files (full `---`…`---` bracket), not 26. Hardening bundle (fence guard + fail-closed delta assertion + generator) locked as mandatory. SC2 regression test required: 12 files exit-0 + 9 custom-props preserved + byte-identity on 14 passers.

---

## PIPE-04 — Descriptive-filename scheme

| Option | Description | Selected |
|--------|-------------|----------|
| Path-flatten (output-only) | `output = docs-relative-path` with `/`→`-`; provably collision-free bijection; keep ordinals; add registry column; in-milestone batch driver | |
| **Title-derived slug (output-only)** | `output = slug(RE-index.Title)`; generated committed map (not a registry column); define map + convention now, defer batch driver; scope = 221 registered docs | ✓ |
| Basename-only | Source basename verbatim | |
| Source `.md` rename | Physically rename source files | |

**Referee verdict:** Title-derived. Both schemes verified 0 collisions across 221 titles, so uniqueness does not discriminate; title-derived reads decisively better as a citation (`tpm-attestation-failure-investigation` vs `l2-runbooks-03-tpm-attestation`) — the actual PIPE-02-OQ1 goal. Path-flatten re-introduces the exact directory jargon + ordinals the requirement's own example omits.
**Notes:** LOCKED — source `.md` files never renamed (both parties agree; they're already descriptively named, RE-NNN registry-only). Sanitizer step order is exact. Collision policy = append minimal parent-dir segments, fail-closed on unresolvable. Sync = generated build-artifact map, not a hand-synced registry column. Batch driver deferred to deployment. `convert.ps1` byte-unchanged. D-01 link-checker re-run downgraded to no-op (output-only → no link-target change).

---

## PIPE-05 — Draft-label probe execution

| Option | Description | Selected |
|--------|-------------|----------|
| Agent-run | Agent queries live Copilot Studio | (impossible — no tenant access) |
| Owner-run + A/B twin | Owner runs live; draft + approved twin fixtures | |
| **Owner-run + single artifact** | Owner runs live; ONE Draft fixture (both legs mutated) reformatted to shipped EEE block; blocking checkpoint last; reusable runbook | ✓ |
| Defer entirely | Push to deployment/content-approval phase | |

**Referee verdict:** Owner-run, single artifact, outcome-neutral SC4 + FAIL-escalation. Agent-run verified impossible (no Copilot Studio / Graph / SharePoint connector or creds). A/B twin exceeds SC4 (ceremony). **Critical finding:** the Proponent's (and REQUIREMENTS.md:35's) premise is factually inverted — v1.15 already exercised the visible `**Status:**` body-text leg (it's the leg that surfaced); frontmatter is the non-surfacing leg. PIPE-05 is a cosmetic FORMAT re-confirmation, already codified in EEE-SOP-standard.md §L284-296.
**Notes:** Owner-gate sequenced last; hold Jira Story In Progress until confirmed; no auto-flip. Evidence = committed PIPE-05-FINDINGS.md + reusable PIPE-05-RUNBOOK.md. PIPE-05 ≠ HARN-07 (necessary but not sufficient).

---

## Phase sequencing / scope

| Option | Description | Selected |
|--------|-------------|----------|
| 4 plans (Proponent baseline) | define/apply split for PIPE-04 | |
| **3 plans, escalation-gated to 4** | 124-01 PIPE-03 (gating) / 124-02 PIPE-04 combined / 124-03 PIPE-05 (terminal owner-gate); escalate only on source mass-rename | ✓ |
| 2 plans | Fold PIPE-03 into PIPE-04 | |

**Referee verdict:** 3 plans. C1 confirmed: source `.md` already descriptively named, RE-NNN registry-only → no mass-rename → the escalation trigger does not fire. PIPE-03 earns its own gating plan (distinct correctness surface + OQ4 regression). Ordering PIPE-03 → PIPE-04 → PIPE-05 invariant.
**Notes:** Validator schedule — OQ4 regression after 124-01; D-01 + C17 after 124-02 only if link targets change (they don't under output-only → neither runs). Phase-125 firewall explicit: no chain / re-audit / V115 pin / check-phase-124.mjs / requirement-flip in Phase 124.

---

## Follow-up decisions (owner-confirmed via AskUserQuestion)

**REQUIREMENTS.md:35 correction** — Owner chose "Correct L35 + keep probe": fix the inverted wording during Phase 124 planning (note it re-confirms v1.15's shipped-format leg) and still run the cheap owner probe.

**SC4 rewording** — Owner chose "Reword neutral + FAIL escalates": SC4 becomes outcome-neutral ("probe executed; render+queryability recorded"); a PASS or tenant-unavailable-deferred closes cleanly, a genuine surfacing FAIL escalates as a defect before close.

## Claude's Discretion

None material — all four areas adjudicated to locked decisions. Implementation-mechanism details (exact preprocessing regex, generator script structure, fixture reformat) are the executor's within the D-01…D-22 constraints.

## Deferred Ideas

- PIPE-04 batch driver + `.docx` generation/upload → deployment (v1.17+).
- True-source nav-footer normalization (`* * *` in source) → post-freeze / v1.17.
- SharePoint content-approval (gate vs label) → owner/ops deferral, pairs with PIPE-05.
- Whole-class enrollment of `operations/`, `device-operations/`, `cross-platform/apple-business/` → v1.17+.
