---
phase: 157-std-hyg-authoring-standard-corpus-hygiene
verified: 2026-09-06T00:00:00Z
status: passed
score: 14/14 must-haves verified
behavior_unverified: 0
overrides_applied: 0
coincidental_reliance_items: []
---

# Phase 157: STD + HYG — Authoring Standard & Corpus Hygiene Verification Report

**Phase Goal:** Google style becomes the standing authoring standard for new documents, with a
mechanical gate bounded to exactly the slice that can report zero and the three permanent
exclusions recorded with their reasons, and the located hygiene defects plus the stale-open
SEED-001 are closed.

**Verified:** 2026-09-06
**Status:** passed
**Re-verification:** No — initial verification

## Method

All claims below were checked against the live tree at HEAD (`728bc2b1`, branch
`v1.22/154-style-landing`), not against SUMMARY.md prose. Every grep, gate run, and validator run
quoted here was re-executed independently in this session; commands and outputs are recorded next
to each finding. The orchestrator's pre-verified apex/C17/prose-style/self-test/clean-tree results
were treated as established per its briefing; this report re-confirms `check-phase-54`,
`check-phase-63`, `check-phase-49`, and `check-nav-hub-links` independently since those were not on
the pre-verified list, and spot-checks the two SUMMARY-authored gate scripts (`check-prose-style.py`)
by reading their source directly rather than trusting the reported PASS lines.

## Goal Achievement

### Observable Truths

| # | Truth (mapped to SC) | Status | Evidence |
|---|---|---|---|
| 1 | SC-1: `google-style` skill wired into document-creation flow (CLAUDE.md + all 8 `docs/_templates/*.md`) | ✓ VERIFIED | `CLAUDE.md:326-334` "Documentation Authoring" section; `grep` confirms all 8 templates carry both the exact heading name and the `EEE-SOP-standard.md` path (`docs/_templates/admin-template.md:20-21` etc., 8/8 files) |
| 2 | SC-1: `google-style-verify` pairing for bulk prose rewrite documented | ✓ VERIFIED | `CLAUDE.md:329-331` states the pairing rule explicitly ("never run one without the other on a multi-file pass") |
| 3 | SC-2: A mechanical gate exists over exactly the `check.py --no-headings` slice that can report zero | ✓ VERIFIED | `scripts/validation/check-prose-style.py` exists (474 lines, executable); `run_checkpy()` (`:215-218`) invokes `[sys.executable, CHECKPY_PATH, "--no-headings"] + files` as an argument array; live self-test run: `7 passed, 0 failed`; live normal run: `all assertions PASS -- 0 findings` (re-executed independently, matches 157-BASELINE.json and the orchestrator's pre-check) |
| 4 | SC-2: em-dash rule, Android `admin` class, and headings recorded as permanent exclusions with reasons stated inline (not implicit) | ✓ VERIFIED | `check-prose-style.py:52-78` "PERMANENT EXCLUSION RECORD" block states each exclusion's true mechanism and unprotected count (em-dash 3,123→832; Android-`admin`-only, distinct from the global entry; headings' true `--no-headings` mechanism — 9 structural rules still run on heading lines, 142 hits) |
| 5 | SC-3: Authoring guidance records the mandate-promotion hazard (26 STRENGTHENED vs 19 INVERTED across 406 judged hunks) | ✓ VERIFIED | `docs/_standards/EEE-SOP-standard.md:648-650` (D-02), prose not blockquote; figures match `scripts/docs-style/_JUDGE-VERDICTS.json`'s `{STRENGTHENED:26, PRESERVED:360, INVERTED:19, WEAKENED:1}` |
| 6 | SC-3: Authoring guidance records the passive→active actor-invention hazard | ✓ VERIFIED | `EEE-SOP-standard.md:652-654` (D-03); also added to `google-style/SKILL.md:127-128` beside the quoted-error-message anti-pattern, citing `references/voice.md` |
| 7 | SC-3: The non-gate rule ("never mandate a rule set whose checker cannot report zero on work already accepted") is written down as a standing rule | ✓ VERIFIED | Present in all three required homes: `EEE-SOP-standard.md:644-646` (D-01), `check.py:13` module docstring (confirmed printed on bare invocation), `scripts/docs-style/RESUME.md:658` |
| 8 | SC-4 / HYG-02: `grep -rn "\.planning/" docs/` returns 0 | ✓ VERIFIED | Independently re-run: `0` (literal needle), `0` (FIX-11 two-prefix needle), `0` (widened class needle excl. `_standards/`/`_registry/`) — all three match `157-BASELINE.json`'s post-fix target |
| 9 | SC-4 / HYG-01: update-enforcement hub description matches current 5-platform scope | ✓ VERIFIED | `docs/operations/00-index.md:28,32`, `docs/index.md:305,309` name Linux/5-platform; `docs/operations/patch-management/00-overview.md` routes to `05-linux-update-delivery.md` (4 live link sites); `check-phase-54.mjs` 32/0 (column order unmoved) |
| 10 | SC-4 / HYG-03: package-manager conflation corrected, bare twin linked | ✓ VERIFIED | `docs/reference/macos-capability-matrix.md:70` now reads "Intune Microsoft Store app type"; `docs/admin-setup-apv2/03-device-preparation-policy.md:141` links `#eam-store-winget-routing` (the explicit HTML anchor at `08-windows-app-updates.md:251`, not the double-hyphen slug); `check-phase-63.mjs` 32/0 (frozen byte-pin unmoved) |
| 11 | SC-4 / HYG-04: citation-date mismatch corrected | ✓ VERIFIED | All citations of the Windows Autopatch groups overview article read `2025-06-17` at `00-overview.md:102`, `01-windows-wufb-rings.md:76,101`, and the two bundle-shipped citations in `docs/recipes/05-enterprise-update-plan.md:95,106` — no `2026-06-19` citation remains |
| 12 | SC-4 / HYG-05: ambiguous antecedent corrected | ✓ VERIFIED | `00-overview.md:83` now reads "an Autopatch group supports up to 15 deployment rings, and a tenant supports up to 300 Autopatch groups" — matches `07-windows-autopatch.md:219-222`'s verbatim Microsoft quotes; neither limit shares an antecedent with the other |
| 13 | SC-4 / HYG-06: the 6 new v1.21 terms have glossary entries (with the DFCI falsification judged, not silently absorbed) | ✓ VERIFIED (with recorded falsification) | `docs/_glossary.md:326,332,338,344` (Hotpatching, Autopatch group, Microsoft 365 Apps update channels, Enterprise App Catalog) and `docs/_glossary-linux.md:141` (unattended-upgrades) all present live, each a complete 4-part unit. DFCI already existed at `docs/_glossary.md:183` (Phase 149) — **not** re-added. The falsification (6 named → 5 genuinely absent) is recorded in `157-CONTEXT.md` D-44 and in `157-06-SUMMARY.md`'s `key-decisions`/`coverage` (tied to requirement HYG-06) — not silently absorbed. See "D-44 disposition" note below for one gap in how far this recording reaches. |
| 14 | SC-4 / HYG-07: SEED-001 reads `status: closed` | ✓ VERIFIED (with recorded falsification of its own rationale) | `.planning/seeds/SEED-001-macos-psso-admin-setup-doc-accuracy.md:6` reads `status: closed`; `git diff --numstat` == 1 line changed. D-49's finding that HYG-07's own stated rationale is false (the seed scanner's `{dormant,active,triggered}` set never included `planted`, so it never trained anyone to ignore anything) is recorded in `157-CONTEXT.md` D-49 and `157-06-SUMMARY.md` key-decisions, with no guard built, exactly as ruled |

**Score:** 14/14 truths verified (0 present-but-behavior-unverified)

### Required Artifacts

| Artifact | Expected | Status | Details |
|---|---|---|---|
| `scripts/validation/check-prose-style.py` | STD-02 standalone gate | ✓ VERIFIED | 474 lines, executable bit set, imports `sweep3.PROTECT`/`check.RULES`/`mask_code` by file location (confirmed via `importlib.util.spec_from_file_location` at read time), never reimplements them |
| `docs/_standards/EEE-SOP-standard.md` (new `## Prose Style Authoring Standard` section) | STD-01/03/04 authoring standard | ✓ VERIFIED | Section at line 640, before terminal `## Version History` (666), preceded by `---`, no requirement ID in heading, pinned in both `_CONTENT-PINS.txt:563` and `_PINNED-HEADINGS.txt:83` |
| `.planning/phases/157-.../157-BASELINE.json` | apex-chain/needle equality target | ✓ VERIFIED | Committed, `base_sha`/`apex`/`c17`/`needles`/`needle_class_sites` all present and match the live re-measurement |

### Key Link Verification

| From | To | Via | Status | Details |
|---|---|---|---|---|
| `check-prose-style.py` | `scripts/docs-style/sweep3.py` | `importlib` file-location import of `PROTECT`/`HEADING`/`FENCE`/`KEEP_LINE`/`quoted_lines` | ✓ WIRED | Confirmed by reading `check-prose-style.py:1-40` module-load block and by the reviewer's independent hand-trace; person-first reduces 86 raw → 2 mechanical survivors → 0 after 2 named exemptions, matching D-03's measurement |
| `check-prose-style.py` | `.claude/skills/google-style/check.py` | `subprocess.run([sys.executable, CHECKPY_PATH, "--no-headings"] + files, ...)` | ✓ WIRED | Confirmed at `:215-218`; never forked or given `--only` |
| `CLAUDE.md` + 8 templates | `docs/_standards/EEE-SOP-standard.md#Prose Style Authoring Standard` | textual path+heading pointer (not link-checker-verified, per D-31) | ✓ WIRED | 9/9 grep-confirmed; `check-nav-hub-links.mjs` structurally excludes `docs/_templates/` as a link source so this wiring is correctly proven by grep, not by that validator |
| `v1.21-REQUIREMENTS.md` FIX-11 row | Phase 157 re-discharge | annotation naming both commit SHAs | ✓ WIRED | `v1.21-REQUIREMENTS.md:195,244` — no longer a bare "Complete"; regression/discharge SHAs and validator blind-spot both named |

### Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
|---|---|---|---|---|
| STD-01 | 157-07 | google-style wired + verify pairing documented | ✓ SATISFIED | CLAUDE.md + 8 templates |
| STD-02 | 157-04 | mechanical gate bounded to zero-capable slice | ✓ SATISFIED | `check-prose-style.py` live, self-test + normal run PASS |
| STD-03 | 157-04, 157-07 | non-gate rule written down | ✓ SATISFIED | 3 homes confirmed |
| STD-04 | 157-07 | both hazards + scope resolution recorded | ✓ SATISFIED | D-02/D-03/D-04 in standard section |
| HYG-01 | 157-05 | update-enforcement hub 5-platform | ✓ SATISFIED | 5 sites, all corrected |
| HYG-02 | 157-01,02,03 | leaked planning references removed corpus-wide | ✓ SATISFIED | 3/3 needles = 0 |
| HYG-03 | 157-05 | package-manager conflation | ✓ SATISFIED | cell + link corrected |
| HYG-04 | 157-05 | citation-date mismatch | ✓ SATISFIED | all citations agree |
| HYG-05 | 157-05 | ambiguous antecedent | ✓ SATISFIED | limits re-attached correctly |
| HYG-06 | 157-06 | glossary entries for v1.21 vocabulary | ✓ SATISFIED (falsification recorded) | 5 genuinely new entries + DFCI already present |
| HYG-07 | 157-06 | SEED-001 closed | ✓ SATISFIED (rationale falsification recorded) | `status: closed` |

**Orphan check:** `.planning/REQUIREMENTS.md` traceability table lists exactly these 11 IDs against Phase 157, all "Complete" (`:160-170`). No requirement ID maps to Phase 157 outside this set, and no plan in this phase claims a requirement ID outside this set. No orphans.

### Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
|---|---|---|---|---|
| (none introduced by this phase) | — | — | — | Pre-existing `TBD` occurrences in `docs/index.md:406`, `docs/cross-platform/apple-business/14-...:130`, `.planning/ROADMAP.md:241,256` confirmed via `git diff` to be **outside** this phase's diff — not touched, not new |

No debt markers (`TBD`/`FIXME`/`XXX`) were introduced by any file this phase modified, including the newly authored `check-prose-style.py`.

### Code Review Findings (157-REVIEW.md, cross-checked live)

0 Critical, 2 Warning, 2 Info — independently re-confirmed, neither Warning rises to blocker level:

- **WR-01** (person-first filter omits `sweep3.py`'s YAML front-matter skip): confirmed real by reading `check-prose-style.py:248-295` — no `front`-boundary computation exists before the per-line filter chain runs. This is a **false-positive** risk only (a future front-matter field phrased in first person would wrongly fail the gate); it does not affect today's live `0`-finding result, confirmed by the reviewer's empirical front-matter scan and by this session's own live gate run (`0 found`). Not a blocker for SC-2, which is about the gate's ability to report zero today, backed by a self-test proving both rules fire — both hold.
- **WR-02** (three stale `check.py:NN` citations in the gate's own docstring, off by +8 lines from the docstring expansion this same phase made to `check.py`): comment-only, no behavioral effect; confirmed by line-counting `check.py` live.
- **IN-01**, **IN-02**: informational, no action required per the reviewer's own scoping.

None of these four findings affect exit codes, gate correctness on the live corpus, or any of the 14 truths above.

## Judged Dispositions (per verification brief)

### D-44 disposition (HYG-06 six-vs-five)

**Both halves checked, as requested:**

1. **The falsification was recorded, not silently absorbed.** `157-CONTEXT.md` D-44 states plainly: "HYG-06 is five entries, not six — DFCI is already satisfied," with the evidence (`docs/_glossary.md:183`, Phase 149). `157-06-SUMMARY.md`'s `coverage` block (id D1) and `key-decisions` restate this explicitly, tied to `requirement: HYG-06`. This is the standard GSD traceability surface for a requirement's disposition and it does carry the falsification.
2. **The five genuinely-absent terms now have entries**, confirmed live above (truth #13).

**One gap worth flagging (not blocking):** `.planning/REQUIREMENTS.md:80`'s own HYG-06 line text is unedited — it still reads "...DFCI, hotpatching, the Autopatch group model, `unattended-upgrades`, the Microsoft 365 Apps update channels, and the Enterprise App Catalog" with no annotation that DFCI was already satisfied before this phase. This is inconsistent with the phase's own "annotate-and-supersede" pattern applied elsewhere in this same phase to two other falsified REQUIREMENTS.md-family statements (the STD gate's 9,363 preamble in `.planning/REQUIREMENTS.md:62`, and FIX-11's row in `v1.21-REQUIREMENTS.md`). It is not a gap against any must_have in `157-06-PLAN.md`'s frontmatter — that plan's `files_modified` list never included `.planning/REQUIREMENTS.md`, so this was a scoping choice made at planning time, not an oversight at execution time, and the CONTEXT/SUMMARY recording is sufficient traceability for GSD's own audit tooling (`requirements-completed: [HYG-06]` + the `coverage` array). Recorded here as an observation for Phase 158/159, not as a phase-157 gap.

### D-49 disposition (HYG-07 rationale falsification)

Properly recorded. `157-CONTEXT.md` D-49 and `157-06-SUMMARY.md` key-decisions both state, with the specific `audit.cjs` line numbers, that HYG-07's own stated rationale ("a seed that never closes trains the seed-scan to be ignored") is false, because `scanSeeds`'s recognized-unimplemented set (`{dormant, active, triggered}`) never included `planted` in the first place. No guard was built, matching D-49's explicit ruling against normalizing this repository's off-schema seed vocabulary (which would flip SEED-001 to open at a future close gate). This is a clean disposition: falsification identified, evidence cited, ruling followed, no silent fix.

## Gaps Summary

No gaps found. All 14 must-have truths verify against the live tree, all four Success Criteria hold,
all 11 requirement IDs trace to Phase 157 and are marked Complete with supporting evidence, the
code review found 0 Criticals, and both explicitly-flagged falsifications (D-44, D-49) are properly
recorded rather than silently absorbed. The one observation above (REQUIREMENTS.md's HYG-06 line
text remaining unannotated) is recorded as an advisory note for a future phase, not as a blocking
gap, because it was a deliberate plan-time scoping choice with adequate alternate traceability, not
an execution defect.

---

*Verified: 2026-09-06*
*Verifier: Claude (gsd-verifier)*
