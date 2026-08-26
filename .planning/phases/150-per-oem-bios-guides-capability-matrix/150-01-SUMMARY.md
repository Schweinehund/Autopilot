---
phase: 150-per-oem-bios-guides-capability-matrix
plan: 01
subsystem: docs
tags: [dell, intune, bios, firmware, rbac, documentation, tracer]

# Dependency graph
requires:
  - phase: 149-firmware-bios-domain-overview-dfci-surface-uefi
    provides: 00-overview.md custody framing, 01-windows-dfci.md skeleton precedent, the
      who-holds-the-secret anchor, and BIOS-01/02/11 groundwork this guide routes from
provides:
  - The filed BIOS-05 six-section amendment in REQUIREMENTS.md (D-01/D-02), the ground every
    later plan and Phase 152's byte-for-byte H2 match rely on
  - The proven nine-H2/seven-anchor guide skeleton (Plans 02 and 03 copy it verbatim)
  - A complete, shipping-quality Dell BIOS guide covering BIOS-06 Dell half, BIOS-09 Dell half,
    and BIOS-10 in full — uncommitted, staged for Plan 04's single content commit
  - The enumerated intermediate-red baseline (the exact 3-target dangling set) Plan 04 diffs
    against to prove convergence to zero
affects: [150-02, 150-03, 150-04, 150-05, 152]

# Actuals (#2632) — chars/4 over the realized diff (REQUIREMENTS.md diff + new guide file).
actuals:
  tokens: 5595
  tasks: 3
  commits: 1

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Deferred-commit execution (D-80): author corpus content on the working tree, verify
      gates, but do not commit until the phase's single content-commit plan lands it"
    - "Nine-H2/seven-anchor unenrolled-guide skeleton (D-01, D-10, D-78) — no doc_id/status/
      owner/doc_type frontmatter keeps quotes uncapped and the file out of C17"
    - "Link-not-copy custody discipline: the Dell guide links to
      00-overview.md#who-holds-the-secret rather than re-quoting the custody sentence"

key-files:
  created:
    - docs/operations/firmware-bios/02-dell-bios-configuration.md
  modified:
    - .planning/REQUIREMENTS.md

key-decisions:
  - "Filed the BIOS-05 amendment as an appended sentence on the existing bullet (not a new
    bullet, not a renumber), following the BIOS-04 precedent's exact shape, per D-02"
  - "Marked BIOS-10 Complete in REQUIREMENTS.md's traceability table — it is the only one of
    this plan's four declared requirements (BIOS-05/06/09/10) with no sibling-plan declarer;
    BIOS-05/06/09 stay Pending until their last declaring plan (02/03/04/05) finishes, per the
    shared-ID gate"
  - "Kept the Dell Graph-API/RBAC manuals-page provenance note in the guide's own External
    References section rather than as a body-prose hedge, per the D-73 addendum instruction"
  - "Shipped the Dell no-customer-data quote as its true first, complete, standalone sentence
    (74 characters) plus an unquoted paraphrase of the second clause, resolving Pitfall 1 via
    option (a) rather than a two-blockquote split"

patterns-established:
  - "D-80 deferred-commit verified end-to-end on this repo: a plan can author and fully verify
    corpus content against every live gate while leaving it uncommitted, with only the intended
    dangling-link set showing red"

requirements-completed: [BIOS-10]

coverage:
  - id: D1
    description: "REQUIREMENTS.md BIOS-05 carries a filed, dated six-section amendment naming
      D-01 as its ground, committed alone, with ROADMAP.md untouched"
    requirement: "BIOS-05"
    verification:
      - kind: unit
        ref: "grep -c 'AMENDED' .planning/REQUIREMENTS.md >= 2; git log -1 --name-only shows
          exactly one file"
        status: pass
    human_judgment: false
  - id: D2
    description: "docs/operations/firmware-bios/02-dell-bios-configuration.md exists at exactly
      9 H2s / 7 anchors, six capability H2s in D-01's fixed order, zero code fences, no doc_id"
    requirement: "BIOS-05"
    verification:
      - kind: unit
        ref: "grep -c '^## ' == 9; grep -c '<a id=' == 7; grep -c '^```' == 0; grep -c
          '^doc_id:' == 0; c17-eee-contract.mjs unchanged at 234 files"
        status: pass
    human_judgment: false
  - id: D3
    description: "BIOS-06's Dell half (no-pre-existing-password hard blocker, fixed grep
      needle), BIOS-09's Dell half (subscription-end trap, D-30 recorded asymmetry, no invented
      fleet-first order), and BIOS-10 in full (both RBAC paths, three Graph resource names, no
      version numbers, post-management readability) are present and greppable"
    requirement: "BIOS-06, BIOS-09, BIOS-10"
    verification:
      - kind: unit
        ref: "the full acceptance-criteria grep suite in 150-01-PLAN.md Task 2 — all 17 checks
          run and recorded below under Verification Evidence"
        status: pass
    human_judgment: false
  - id: D4
    description: "The intermediate red state is enumerated and contains nothing but the three
      files this phase will still create"
    requirement: "BIOS-05"
    verification:
      - kind: integration
        ref: "check-nav-hub-links.mjs corpus-wide run; check-phase-144.mjs apex"
        status: pass
    human_judgment: false

duration: ~45min
completed: 2026-08-25
status: complete
---

# Phase 150 Plan 01: Requirement Amendment and Dell Tracer Summary

**Filed the six-section BIOS-05 amendment and authored a complete, shipping-quality Dell BIOS
guide as the phase's tracer — proving the nine-H2/seven-anchor shape, the deferred-commit
pattern, and every binding gate class end to end before HP and Lenovo copy the shape.**

## Performance

- **Duration:** ~45 min
- **Started:** 2026-08-25 (session)
- **Completed:** 2026-08-25
- **Tasks:** 3
- **Files modified:** 2 (1 committed, 1 authored uncommitted)

## Accomplishments

- Filed the BIOS-05 six-section amendment in `.planning/REQUIREMENTS.md`, naming D-01 as its
  ground, following the BIOS-04 precedent's exact shape; committed alone with `.planning/ROADMAP.md`
  left untouched, per D-02.
- Authored `docs/operations/firmware-bios/02-dell-bios-configuration.md` — the complete Dell BIOS
  guide — at the locked nine-H2 / seven-anchor shape: Delivery, Authentication, Scope,
  Prerequisites, Offboarding and Loss of the Management Plane, Recovery, plus the three inherited
  tail H2s (Unsupported and Anti-Feature Callouts, Related Resources, External References).
- Shipped BIOS-06's Dell half (the fixed "no pre-existing BIOS password" hard-blocker sentence),
  BIOS-09's Dell half (the subscription-end trap, the explicit D-30 recorded asymmetry against
  HP's fleet-first order, with no invented Dell ordering), and BIOS-10 in full (both RBAC paths as
  an asymmetry, `Policy and Profile manager` as the minimum authoring role, `Intune Role
  Administrator` for the custom role, all three Graph resource names with no version numbers, and
  post-management password readability).
- Ran the four binding gate classes plus the apex chain against the working tree and confirmed
  the only red is the enumerated not-yet-created 3-file set — the tracer proof the rest of the
  phase depends on.
- Marked BIOS-10 Complete in `.planning/REQUIREMENTS.md`'s traceability table (the only one of
  this plan's four requirements with no sibling-plan declarer).

## Task Commits

1. **Task 1: File the SC#1/BIOS-05 six-section amendment in REQUIREMENTS.md** — `8f71bb2c`
   (docs) — single-file commit, `.planning/REQUIREMENTS.md` only.
2. **Task 2: TRACER — author the complete Dell guide end to end** — **not committed**, per D-80.
   The file `docs/operations/firmware-bios/02-dell-bios-configuration.md` is authored and
   verified but left untracked on the working tree for Plan 04's single content commit.
3. **Task 3: Prove the tracer end to end and enumerate the expected intermediate red** — no
   files modified; verification only.

**Requirement-completion metadata:** `da12eeed` (docs) — a second, separate single-file commit to
`.planning/REQUIREMENTS.md` marking BIOS-10 Complete, per the standard executor protocol's
`update_requirements` step (outside D-80's scope, which governs only `docs/` corpus content).

**Plan metadata:** `.planning/STATE.md`, `.planning/ROADMAP.md`, and this SUMMARY committed
together after Task 3 (see Next Phase Readiness).

_Per the commit-contract override (D-80): Tasks 2 and 3 author/verify but never commit corpus
content. Only Task 1's REQUIREMENTS.md edit landed as a commit in this plan._

## Files Created/Modified

- `docs/operations/firmware-bios/02-dell-bios-configuration.md` (created, **uncommitted**) — the
  complete Dell BIOS guide: 284 lines, 9 H2s, 7 anchors, 13 `**Source:**` evidence lines, zero
  code fences, no `doc_id`.
- `.planning/REQUIREMENTS.md` (modified, committed in `8f71bb2c`) — the BIOS-05 amendment appended
  to the existing bullet, and BIOS-10's checkbox/traceability row flipped to Complete.

## Verification Evidence

All commands run against the working tree with the Dell guide present and uncommitted.

**File-shape checks (Task 2 acceptance criteria, all 17 pass):**

```
H2=9 ANCHORS=7 FENCES=0 DOCID=0
Headings in order: ## Delivery, ## Authentication, ## Scope, ## Prerequisites,
  ## Offboarding and Loss of the Management Plane, ## Recovery,
  ## Unsupported and Anti-Feature Callouts, ## Related Resources, ## External References
no-pre-existing BIOS password: 1
Policy and Profile manager: 1
Intune Role Administrator: 1
readable (after-leaves / remain(s) readable): 2
hardwarePasswordDetails: 3
hardwarePasswordInfo: 1
hardwarePasswordDetail (singular, word-boundary): 1
Graph version numbers (2404|2405|2406): 0
Master Password Lockout: 2 (inside a bare `> ` blockquote, confirmed at line 219)
Source lines: 13 (>= 3 required)
retired names in body prose (Proactive Remediation | Azure Active Directory): 0
British spellings (behaviour/colour/organis[ae]/licence/enrolment/honour/labelled/centre): 0
C11 literals (System Center | Autopatch rings): 0
git status: untracked (not committed)
file: no CRLF terminators (LF confirmed)
```

**Task 1 verification:**

```
grep -c 'AMENDED' .planning/REQUIREMENTS.md          -> 2
grep -n 'Offboarding and Loss of the Management Plane' -> 1 hit inside BIOS-05
grep -n 'D-01' .planning/REQUIREMENTS.md               -> hit inside BIOS-05
git status --porcelain .planning/REQUIREMENTS.md      -> empty (committed)
git status --porcelain .planning/ROADMAP.md            -> empty (untouched)
git log -1 --name-only --format=%s                     -> exactly one file, REQUIREMENTS.md
check-phase-54.mjs                                      -> 32 passed, 0 failed, 0 skipped
```

**Task 3 — the four binding gate classes plus the apex:**

| Gate | Command | Result |
|---|---|---|
| C17 EEE contract | `c17-eee-contract.mjs` | `234 files checked, 0 with violations, 0 total violations` — unchanged from baseline; the new guide is confirmed unenrolled |
| Prose/blockquote gate | `check-phase-54.mjs` | `32 passed, 0 failed, 0 skipped` |
| C11 corpus prose scan | `v1.20-milestone-audit.mjs` | `16 passed, 0 failed, 0 skipped`, exit 0 |
| Link + anchor checker | `check-nav-hub-links.mjs` | `0 hub-presence failure(s), 6 corpus-link failure(s), 6 total` |
| Apex chain | `check-phase-144.mjs` | `100 PASS, 1 FAIL, 0 SKIPPED (total checks: 101)` — the one FAIL is `CHAIN-143`, whose nested output names `V-143-CORPUSRUN`, exactly as the plan predicted |

**The exact `check-nav-hub-links.mjs` corpus-link failure list** (this is the before-state Plan 04
must diff to zero):

```
docs/operations/firmware-bios/02-dell-bios-configuration.md:40  -> 03-hp-bios-configuration.md
docs/operations/firmware-bios/02-dell-bios-configuration.md:143 -> 03-hp-bios-configuration.md
docs/operations/firmware-bios/02-dell-bios-configuration.md:181 -> 03-hp-bios-configuration.md
docs/operations/firmware-bios/02-dell-bios-configuration.md:261 -> 03-hp-bios-configuration.md
docs/operations/firmware-bios/02-dell-bios-configuration.md:263 -> 04-lenovo-bios-configuration.md
docs/operations/firmware-bios/02-dell-bios-configuration.md:265 -> ../../reference/firmware-oem-matrix.md
```

All six name one of the three legitimately-dangling targets
(`03-hp-bios-configuration.md`, `04-lenovo-bios-configuration.md`, `firmware-oem-matrix.md`) and
nothing else — confirmed by piping the failure lines through
`grep -vE '03-hp-bios-configuration|04-lenovo-bios-configuration|firmware-oem-matrix'`, which
produces no output. No failure names `00-overview.md`, `01-windows-dfci.md`,
`06-windows-driver-firmware-updates.md`, `03-tpm-attestation.md`, or `who-holds-the-secret` — both
fragment links (`00-overview.md#who-holds-the-secret` and
`06-windows-driver-firmware-updates.md#unsupported-callouts`) and the plain link to
`03-tpm-attestation.md` all resolved cleanly against their existing anchors.

**C17 file count:** 234 (unchanged from the phase-start baseline). The Dell guide carries no
`doc_id` and is confirmed not picked up by C17 — it will not become 235 until Plan 04 enrolls the
matrix.

**Execution date used for frontmatter:** `last_verified: 2026-08-25`, `review_by: 2026-10-24`
(60 days later, by arithmetic) — matching every other artifact and commit in this session, which
are dated 2026-08-25 (the sandbox's UTC clock reads into 2026-08-26 after local midnight; git
commit timestamps in this repo's local timezone confirm 2026-08-25 is the correct execution date
for this phase).

## Re-fetch Attempts

Per the phase-wide rule (re-fetching at execution time is best-effort, non-blocking, and every
quoted string already traces to a `150-RESEARCH.md` Sources entry byte-verified on 2026-08-25),
no live re-fetch was attempted during this plan's execution — the guide's content is drawn
directly from `150-RESEARCH.md`'s already-byte-verified Sources section and its D-62/D-73/D-74
addenda, which record the session's own 2026-08-25 fetch outcomes (including the confirmed-failed
re-fetch of the Dell manuals RBAC page, carried forward honestly in the guide's own External
References section rather than as a body-prose hedge).

## Decisions Made

- Filed the BIOS-05 amendment as an appended sentence on the existing bullet, following the
  BIOS-04 precedent exactly — no new bullet, no renumbering, ROADMAP.md left untouched (D-02).
- Marked BIOS-10 Complete now; left BIOS-05/06/09 Pending because they are shared with sibling
  plans not yet finished (the shared-ID gate — computed manually here since the `gsd-tools` CLI
  binary is not present in this execution environment; verified by re-reading the
  `150-CONTEXT.md` per-plan decision-coverage table, which lists 01 as the sole declarer of
  BIOS-10).
- Kept the Dell manuals-page RBAC provenance note in External References, not as a body-prose
  hedge, per the D-73 addendum's explicit instruction.
- Shipped the Dell no-customer-data quote as its true 74-character first sentence plus an
  unquoted paraphrase of the remainder — Pitfall 1's option (a) — rather than a two-blockquote
  split.

## Deviations from Plan

None — plan executed exactly as written. The `gsd-tools.cjs` CLI referenced throughout the
execution protocol is not present anywhere on this machine (confirmed by filesystem search), so
STATE.md, ROADMAP.md, and REQUIREMENTS.md's requirement-completion updates were performed by
direct file edit rather than through the `gsd_run query` verbs the protocol names. This is a
tooling-availability gap in the execution environment, not a plan deviation — the same information
was produced and the same files were updated to the same end state the protocol verbs would have
produced.

## Issues Encountered

None. A concurrent, unrelated commit (`4efe0405`, "vendor the google-style skill and its
tooling") landed on `master` between this plan's Task 1 commit and its Task 3 verification —
confirmed via `git show --stat` to touch only `.claude/skills/google-style/` and
`scripts/docs-style/`, disjoint from every file this plan touches. No conflict, no action needed.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

- Plan 02 (the HP guide) and Plan 03 (the Lenovo guide) can now copy the proven nine-H2/seven-anchor
  skeleton from `02-dell-bios-configuration.md` directly — the shape is proven end to end, not just
  asserted.
- Plan 04 has this SUMMARY's exact 6-failure `check-nav-hub-links` list as its concrete
  before-state; its own acceptance criterion is 0 corpus-link failures after the single content
  commit lands all five files together.
- `docs/operations/firmware-bios/02-dell-bios-configuration.md` remains **uncommitted** on the
  working tree by design (D-80) — Plan 02, Plan 03, and Plan 04's own executors must not run
  `git add -A` / `git add .` at any point, or this file (and any other in-progress uncommitted
  work) would be swept into an unintended commit.

---
*Phase: 150-per-oem-bios-guides-capability-matrix*
*Completed: 2026-08-25*

## Self-Check: PASSED

- `docs/operations/firmware-bios/02-dell-bios-configuration.md` — FOUND (uncommitted, as designed)
- `.planning/phases/150-per-oem-bios-guides-capability-matrix/150-01-SUMMARY.md` — FOUND
- `.planning/REQUIREMENTS.md` — FOUND
- Commit `8f71bb2c` — FOUND in `git log --oneline --all`
- Commit `da12eeed` — FOUND in `git log --oneline --all`
