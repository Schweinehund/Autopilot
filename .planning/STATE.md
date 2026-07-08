---
gsd_state_version: 1.0
milestone: v1.16
milestone_name: EEE SOP Documentation-Standard Retrofit (Phase-2) + Pipeline/Structural Shelf-Clearing
status: executing
last_updated: "2026-07-08T03:55:35.799Z"
last_activity: 2026-07-08
progress:
  total_phases: 6
  completed_phases: 2
  total_plans: 24
  completed_plans: 21
  percent: 33
---

# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-07-07 — v1.16 milestone scoped)

**Core value:** IT teams can independently provision, troubleshoot, and manage Windows, macOS, iOS/iPadOS, Android, and Linux devices — including Apple-platform single sign-on (macOS Platform SSO + Kerberos SSO + programmatic Platform Credential management), end-to-end PSSO provisioning, Kandji/Iru→Intune MDM migration, and 802.1X enterprise network authentication across all five platforms — through Microsoft Intune / Entra ID without escalating to engineering, finding those answers as clean, correctly-cited results in the Copilot Studio / SharePoint knowledge base (grounding envelope established v1.15, extended to the remaining structural doc classes in v1.16).
**Current focus:** Phase 122 — structural-retrofit-decision-trees-carved-mermaid-files

## Current Position

Phase: 122 (structural-retrofit-decision-trees-carved-mermaid-files) — EXECUTING
Plan: 13 of 15
Status: Ready to execute
Last activity: 2026-07-08

## v1.16 Phase Dependency Summary

```
Phase 120 (EEE Standard Extension — Mermaid/C17 Policy + Hygiene Fix)
  |       STD-04, HYG-01
  |       DELIVERS:
  |         - docs/_standards/EEE-SOP-standard.md: resolved Mermaid-in-enrolled-classes
  |             policy (text-equivalent conversion vs. a documented permitted carve-out)
  |             + rationale, decided via /adversarial-review at discuss-phase
  |         - c17-eee-contract.mjs assertion #1 updated to match the resolved policy;
  |             --self-test still exits 0
  |         - EEE standard Doc Type taxonomy extended: glossary / decision-tree /
  |             nav-hub / lifecycle / end-user guide classes mapped or added
  |         - frozen-at-close.mjs:5-9 stale "REMAIN INLINE" header comment corrected
  |       HARD CONSTRAINTS:
  |         - FIRST content phase of v1.16; RETRO-05 (decision-trees) and RETRO-08
  |             (carved-mermaid) cannot start until the Mermaid policy is locked here
  |         - HYG-01 folded in as a trivial single-comment fix — does not warrant
  |             its own phase
  |         - The Mermaid-vs-C17-#1 collision is the dominant design gray area —
  |             resolved via /adversarial-review, NOT pre-decided at roadmap
  |       DISCUSS-PHASE FLAGS: Mermaid-vs-C17-#1 resolution (dominant); Doc Type
  |         taxonomy mapping for the 5 new structural classes
  |
  v
Phase 121 (Structural Retrofit — Glossaries, Lifecycle & End-User Guides)
  |       RETRO-04, RETRO-07, RETRO-09
  |       DELIVERS:
  |         - All docs/_glossary-*.md: EEE header block + Summary-first + normalized
  |             Platform label; term-surface shape (definition lists/anchor slugs)
  |             preserved; C17 green
  |         - The 13 Mermaid-free lifecycle docs (of the 22-file canonical lifecycle
  |             class): EEE header block + Summary-first + Status: Approved; C17 green.
  |             The 9 Mermaid-bearing lifecycle docs are pre-enrolled at Status: Pending
  |             (path-order IDs) and completed in Phase 122 — RETRO-07 spans 121+122
  |         - RE-175/RE-176 (end-user Guides): EEE header block + Summary-first +
  |             correct doc_type; C17 green
  |       HARD CONSTRAINTS:
  |         - Mermaid-collision (discovered at discuss-phase 121): 9 of 22 lifecycle
  |             files carry ```mermaid — deferred to Phase 122 (adversarial-review D1=B,
  |             HIGH). Phase 121 stays a zero-content-loss reformat (no diagram touch)
  |         - Retrofit-only: no content re-review; last_verified carried verbatim +
  |             one-time "v1.16 EEE reformat" Version-History row (v1.15 D2/META-04 rule)
  |         - Existing plain-GitHub glossary anchor slugs must not break
  |       DISCUSS-PHASE FLAG: structural retrofit phase granularity (whether these
  |         3 classes warrant further splitting) — resolved at /gsd-discuss-phase 121
  |
  v
Phase 122 (Structural Retrofit — Decision-Trees & Carved-Mermaid Files)
  |       RETRO-05, RETRO-08
  |       DELIVERS:
  |         - All docs/decision-trees/*: EEE header block + Summary-first; Mermaid
  |             resolved per the Phase 120 policy, every decision leaf preserved
  |         - RE-128 (linux overview) + RE-147 (ca-enrollment-timing.md): Pending/
  |             keyless -> Status: Approved with registry doc_id, Mermaid resolved
  |         - The 9 Phase-117 admin-setup mermaid carve-outs: retrofitted, Mermaid
  |             resolved, moved to Status: Approved
  |       HARD CONSTRAINTS:
  |         - BLOCKED on Phase 120 — the Mermaid policy must be locked before any
  |             diagram in this phase is converted or retained under a carve-out
  |         - Every decision-tree leaf must be preserved through the text-equivalent
  |             conversion (the v1.15 RE-068 precedent: leaf-count preserved)
  |       DISCUSS-PHASE FLAG: none additional beyond the Phase 120 Mermaid resolution
  |         (this phase consumes the STD-04 decision, does not re-litigate it)
  |
  v
Phase 123 (Orphan Nav-Hub Retrofit — Navigation-Last)
  |       RETRO-06
  |       DELIVERS:
  |         - docs/index.md, common-issues.md, quick-ref-l1.md, quick-ref-l2.md:
  |             EEE header block + Summary-first appropriate to an index/quick-ref
  |             Doc Type; C17 green on all four
  |         - Routing/link-table accuracy preserved across all four hubs
  |       HARD CONSTRAINTS:
  |         - NAVIGATION-LAST: nav-hub commits MUST post-date the content commits
  |             in Phases 121-122 they reference (mirrors v1.15 Phase 109/117)
  |         - Nav-hubs are indexes, not operator runbooks — header block + Summary
  |             application differs from a runbook Summary
  |       DISCUSS-PHASE FLAG: nav-hub EEE application — how the header block +
  |         Summary applies to an index/quick-ref page; correct Doc Type (Reference
  |         vs. a new nav Doc Type)
  |
  v
Phase 124 (Pipeline Fix, Descriptive-Filename Pass & Draft-Label Grounding Probe)
  |       PIPE-03, PIPE-04, PIPE-05
  |       DELIVERS:
  |         - Pandoc YAML-metadata alias defect (DEFER-119-C) fixed: nav-footer
  |             *Previous:/*Next step: shape converts clean (exit 0, no Unknown
  |             alias); OQ4 custom-property promotion regression-tested clean
  |         - Descriptive-filename rename map + pipeline output-name wiring +
  |             RE-registry sync (V1.16-DESCRIPTIVE-FILENAME-PASS)
  |         - True Draft-label grounding probe (PIPE-02-DRAFT-LABEL-PROBE):
  |             BOTH frontmatter status: AND visible **Status:** Ready to execute
  |             Draft label confirmed queryable in live Copilot Studio (owner-run)
  |       HARD CONSTRAINTS:
  |         - Runs against the FULL retrofitted corpus (Phases 121-123 complete) so
  |             the pipeline fix + filename pass exercise every enrolled class
  |         - PIPE-05 is owner-run (autonomous:false checkpoint), mirrors v1.15
  |             Phase 119 Wave-5 PIPE-02 pattern
  |       DISCUSS-PHASE FLAGS: pandoc alias fix approach (canonical invocation fix
  |         vs. corpus-wide nav-footer normalization); descriptive-filename scheme
  |         (naming convention, rename-map source of truth, in-milestone vs.
  |         bulk-upload-time renaming)
  |
  v
Phase 125 (V115 Pin + 14th Path-A Lineage Bump + Terminal Close)
          HARN-05, HARN-06, HARN-07
          SOLE DELIVERABLE CLUSTER OF THIS PHASE — never batches with content or
            retrofit (mirrors v1.15 Phase 119 / v1.14 Phase 112 exactly)
          V115 pin (v1.15 close-gate SHA, recovered via git log --all --grep) rides
            the Atom-2-equivalent commit; BASELINE_20; 13th CI coexistence workflow
          DELIVERS:

            - _lib/frozen-at-close.mjs V115 entry + readAtV115Close export — the
              MANDATORY back-anchor invariant deferred by v1.15 (V115-PIN-DEFERRAL)

            - v1.16-milestone-audit.mjs (Path-A from v1.15, C1-C17 inherited) +
              v1.16-audit-allowlist.json + BASELINE_20

            - check-phase-120..NN.mjs per-phase validators (chain-apex
              CHAIN_PHASES=[48..119], continuing the [48..N-1] invariant)

            - audit-harness-v1.16-integrity.yml (13th parallel CI coexistence
              workflow; predecessors v1.4-v1.15 byte-unchanged)

            - Any predecessor content-assertion validator reading a now-retrofitted
              structural doc at live HEAD converted frozen-aware (readAtV115Close)
              as in-scope close-gate remediation — NO value-masking, CHAIN_SKIP empty
          3-axis terminal re-audit + PIPE-02 grounding confirmation (HARN-07):

            - Axis 1: fresh git clone --no-hardlinks
            - Axis 2: cross-OS Linux GHA (BOTH chain validators authoritative per
              the D-03 OS split — WINDOWS-CLONE-DEEPNEST-TIMEOUT-01 now [48..119])

            - Axis 3: fresh zero-context sub-agent
            - Cross-OS PASS/FAIL/SKIP EXACT MATCH required
            - PIPE-02 grounding-validation confirmation on the retrofitted
              structural corpus
          Close-gate: v1.16-MILESTONE-AUDIT.md + v1.16-DEFERRED-CLEANUP.md +
            4-doc traceability closure (14/14 Validated)
          Predecessor v1.4-v1.15 frozen surfaces BYTE-UNCHANGED invariant, except
            in-scope frozen-aware conversions per HARN-06 remediation clause
```

## v1.16 Requirement Coverage (0/14 — Pending)

| Phase | Requirements | Count |
|-------|-------------|-------|
| 120 | STD-04, HYG-01 | 2 |
| 121 | RETRO-04, RETRO-07, RETRO-09 | 3 |
| 122 | RETRO-05, RETRO-08 | 2 |
| 123 | RETRO-06 | 1 |
| 124 | PIPE-03, PIPE-04, PIPE-05 | 3 |
| 125 | HARN-05, HARN-06, HARN-07 | 3 |
| **Total** | **14/14 mapped** | **14** |

**Sequential-on-main-tree execution** per `.planning/config.json` `use_worktrees:false` (durable per memory `project_execphase_sequential.md`). Phase 125 chain-apex CHAIN_PHASES=[48..119] (per [48..N-1] invariant where N=125; WINDOWS-CLONE-DEEPNEST-TIMEOUT-01 now at depth [48..119], +1 deeper than v1.15's [48..118] — Linux GHA BOTH chain validators authoritative per corrected D-03 OS split, same as v1.12-v1.15).

**Named decisions (LOCKED at roadmap 2026-07-07):**

- PHASE-COUNT: 6 phases (120-125) — derived from natural delivery boundaries: standard-extension + preconditions (120) → non-Mermaid structural retrofit (121) → Mermaid-resolved structural retrofit (122) → nav-hub retrofit navigation-last (123) → pipeline/filename/grounding pass (124) → harness+close (125)
- MERMAID-GATE-FIRST: Phase 120 (STD-04) precedes both Mermaid-consuming retrofits (RETRO-05 decision-trees, RETRO-08 carved-mermaid in Phase 122) — the Mermaid-vs-C17-#1 decision is authored/decided in the standard-extension phase; the mermaid-bearing retrofits only consume it. The gray-area resolution itself is NOT made at roadmap — deferred to `/gsd-discuss-phase 120` + `/adversarial-review`
- HYG-01-FOLD: HYG-01 (stale header comment) folded into Phase 120 as a trivial single-comment fix — does not warrant its own phase
- STRUCTURAL-SPLIT: the 6 RETRO requirements split across 3 phases by Mermaid dependency and navigation-last ordering, not by document-class similarity alone — RETRO-04/09 + the 13 Mermaid-free lifecycle files (Phase 121) vs. RETRO-05/08 + the 9 Mermaid-bearing lifecycle files (Mermaid-dependent, Phase 122) vs. RETRO-06 (navigation-last, Phase 123, depends on both 121 and 122). **2026-07-07 correction (discuss-phase 121, adversarial-review D1=B HIGH):** the roadmap's original premise that RETRO-07/lifecycle = "no Mermaid" was FALSE — 9 of 22 lifecycle files carry ```mermaid. Per this axis's own Mermaid-dependency principle, RETRO-07 splits: Mermaid-free lifecycle → 121, Mermaid-bearing lifecycle → 122. RETRO-07 spans 121+122.
- NAV-LAST: RETRO-06 (nav-hub retrofit) is its own phase, sequenced after BOTH structural retrofit phases (121, 122) complete — nav-hub edits must commit after the content they reference, matching the v1.15 Phase 109/117 navigation-last precedent
- PIPE-BATCH: PIPE-03 (pandoc alias fix) + PIPE-04 (descriptive-filename pass) + PIPE-05 (Draft-label probe, owner-run) share Phase 124 — all three touch the pipeline/citation surface and PIPE-05 needs the full retrofitted + renamed corpus to probe against
- HARNESS-PHASE: Phase 125 is the sole deliverable of the closing cluster — harness lineage bump never batches with content or retrofit (mirrors v1.13 Phase 100 / v1.14 Phase 112 / v1.15 Phase 119 exactly)
- V115-PIN-MANDATORY: Phase 125 adds the `V115` frozen-at-close pin deferred by v1.15 close (`V115-PIN-DEFERRAL`) — the mandatory back-anchor invariant; freezes the v1.15 corpus
- HARNESS-LINEAGE: 14th Path-A milestone (v1.4→v1.16); BASELINE_20; V115 pin; 13th CI workflow; CHAIN_PHASES=[48..119]
- DISCUSS-PHASE-FLAGS: 7 gray-area flags from REQUIREMENTS.md are NOT resolved at roadmap — deferred to `/gsd-discuss-phase` per project convention (Mermaid-vs-C17-#1 resolution — dominant; structural retrofit phase granularity; nav-hub EEE application; pandoc alias fix approach; descriptive-filename scheme; predecessor chain-health-before-close process lesson; Doc Type for structural classes)

## Performance Metrics

**Velocity across milestones:**

- v1.0: 10 phases, 24 plans — shipped 2026-04-10
- v1.1: 9 phases, 18 plans — shipped 2026-04-13
- v1.2: 6 phases, 20 plans — shipped 2026-04-15
- v1.3: 8 phases, 44 plans — shipped 2026-04-19
- v1.4: 9 phases, 40 plans — shipped 2026-04-24
- v1.4.1: 5 phases, 33 plans — shipped 2026-04-25
- v1.5: 14 phases, 101 plans — shipped 2026-05-07
- v1.6: 5 phases (62-66), 30 plans — shipped 2026-05-25
- v1.7: 4 phases (67-70), 15 plans — shipped 2026-05-29
- v1.8: 4 phases (71-74), 13 plans — shipped 2026-06-08
- v1.9: 8 phases (75-82), 19 plans — shipped 2026-06-22
- v1.10: 6 phases (83-88), 16 plans — shipped 2026-06-24
- v1.11: 5 phases (89-93), 13 plans — shipped 2026-06-26
- v1.12: 2 phases (94-95), 5 plans — shipped 2026-06-26
- v1.13: 5 phases (96-100), 14 plans — shipped 2026-06-29
- v1.14: 12 phases (101-112), 38 plans — shipped 2026-07-02
- v1.15: 7 phases (113-119), 40 plans — shipped 2026-07-06
- **v1.16: 6 phases (120-125), planning — roadmap created 2026-07-07**

## Accumulated Context

### Decisions

**v1.16 roadmap decisions (LOCKED 2026-07-07):**

- Six-phase structure: Standard extension + Mermaid/C17 policy + hygiene fix (120) → Structural retrofit non-Mermaid classes (121) → Structural retrofit Mermaid-resolved classes (122) → Nav-hub retrofit navigation-last (123) → Pipeline fix + descriptive-filename pass + Draft-label probe (124) → V115 pin + 14th Path-A lineage bump + terminal close (125)
- STD-04 sequenced first (Phase 120) because it is a hard precondition for RETRO-05 and RETRO-08 (Phase 122) — the Mermaid-vs-C17-#1 policy must exist before any mermaid-bearing file is retrofitted; the gray-area DECISION itself is explicitly NOT made at roadmap, only the sequencing
- HYG-01 folded into Phase 120 (not its own phase) — trivial single-comment documentation fix, no functional change
- RETRO requirements split by Mermaid dependency, not just document-class grouping: RETRO-04 (glossaries) + RETRO-07 (lifecycle) + RETRO-09 (end-user guides) have no Mermaid content and can proceed in parallel with Phase 120's policy-drafting risk; RETRO-05 (decision-trees) + RETRO-08 (carved-mermaid) are hard-blocked on the Phase 120 policy
- RETRO-06 (nav-hubs) isolated into its own phase (123) specifically to enforce navigation-last discipline as an explicit phase boundary — depends on BOTH Phase 121 and Phase 122 so nav-hub edits always post-date every piece of content they reference
- PIPE-03/04/05 batched into Phase 124 — all three touch the pipeline/citation surface; PIPE-05 (Draft-label probe) needs the fully-retrofitted, correctly-filenamed corpus to be a meaningful probe, so it runs after the structural + filename work, not folded into the close-gate
- Phase 125 is the sole closing cluster: V115 pin + lineage bump + close; never batches with content or retrofit; mirrors v1.13 Phase 100 / v1.14 Phase 112 / v1.15 Phase 119
- V115 pin is MANDATORY at this close per `V115-PIN-DEFERRAL` (v1.15-DEFERRED-CLEANUP.md) — v1.15's close-gate deliberately did NOT add its own pin (back-anchor invariant: a close-gate cannot reference its own not-yet-existing SHA); v1.16 Phase 125 adds it
- 7 discuss-phase flags from REQUIREMENTS.md are NOT resolved at roadmap — deferred to `/gsd-discuss-phase` per project convention (dominant: Mermaid-vs-C17-#1 resolution)

**v1.15 roadmap decisions (LOCKED 2026-07-03):**

- Seven-phase structure: Pipeline lock + grounding (113) → Standard + templates + registry + preconditions (114) → C17 validator atom (115) → L1/L2 runbook retrofit (116) → Admin-setup guide retrofit (117) → Reference doc retrofit + table remediation (118) → Frozen-surface re-baseline + 13th Path-A lineage bump + 3-axis close (119)
- PIPE-02 folded into Phase 113: representative-set grounding validation is a direct output of pipeline lock; close-gate (Phase 119) provides the second grounding-confirmation pass against the full retrofit corpus
- Phase 114 batches all seven META/STD requirements: the EEE standard document (STD-01), templates (STD-02), and registry (STD-03) are co-authored with the metadata rules (META-01-04) they enforce; META-01 C10 lenient check is a phase-opening precondition before any file is edited
- Phase 115 is the C17 indivisible validator atom: follows the v1.13 validator-atom deferral convention; content phases hand off a needle-spec only; C17 is never re-opened during content phases
- Retrofit phases (116-118) follow RETRO-01→02→03 mandatory ordering: L1/L2 first (highest operator impact), admin-setup second, reference docs last (highest table-chunking risk per research P-02)
- Phase 119 is the sole closing cluster: frozen-surface re-baseline + lineage bump + close; never batches with content or retrofit; mirrors v1.13 Phase 100 / v1.14 Phase 112
- Frozen-surface re-baseline is DELIBERATELY re-pinning Phase-1 surfaces (intentional inversion of byte-unchanged invariant); non-Phase-1 predecessor surfaces remain byte-unchanged
- 7 discuss-phase flags from REQUIREMENTS.md are NOT resolved at roadmap — deferred to /gsd-discuss-phase per project convention

**Phase 113 execution decisions (2026-07-03):**

- [113-03] convert.ps1 version regex updated to `^pandoc(?:\.exe)?\s+` — Windows pandoc.exe binary banner includes `.exe` in first-line output; original `^pandoc\s+` regex was too strict; both forms are correct pandoc output; Rule 1 auto-fix, no behavior change to version-pin logic
- [113-03] android-capability-matrix Doc Type = Reference (not Runbook) — first Reference-class doc in the representative set; correctly reflects the doc class taxonomy being established in Phase 114
- [113-03] clean-test-doc assigned RE-T00 — avoids collision with RE-T01 used by 01-device-not-registered per RESEARCH candidate numbering
- [113-04] PIPE-02-RUNBOOK.md and PIPE-02-FINDINGS.md authored as agent deliverables; live Copilot Studio / SharePoint legs remain owner-run at the blocking checkpoint (D-01; REQUIREMENTS L77)
- [113-04] OQ1 resolved empirically: citation titles are filename-driven (.docx extension visible in every Copilot citation); v1.16 descriptive-filename normalization pass flagged and deferred
- [113-04] OQ2 resolved empirically: Status:Draft is a label only — draft-test-doc.docx WAS indexed and retrieved; Phase 114 EEE standard must state Draft exclusion = library scoping / content-approval, never the body-text label; content-approval stays a deferred deployment-hardening lever
- [113-04] OQ3 resolved empirically: no P-02 chunk fragmentation observed on mode-first android-capability-matrix (column/mode context intact on Q4 + Q6); Phase 118 table mitigation (<=25-row cap + prose summary, C17-lintable) remains prudent belt-and-suspenders
- [113-04] OQ4 resolved empirically: pandoc 3.7.0.2 promotes non-standard YAML keys to invisible Word custom properties (confirmed via docProps/custom.xml: applies_to/audience/last_verified/review_by all promoted); four Phase-114 EEE keys not yet in corpus frontmatter but mechanism proven — validates the EEE architecture; body-text header block is retrieval-necessary; frontmatter is harness-only and never reaches the index
- [113-04] SC4a confirmed: document-level citations resolve as clickable SharePoint links (whole .docx, no section anchors)
- [113-04] SC4b confirmed: single-line EEE header block indexed as body text — Q2 recited "Doc ID: RE-T01 · Platform: Windows · Doc Type: Runbook · Status: Approved" from body text; load-bearing EEE thesis proven

**Phase 115 execution decisions (2026-07-04):**

- [115-01] TEMPLATE-SENTINEL skip applied to assertion #12 as well as #9 — template blockquotes carry verbose scaffold instructions exceeding 200 chars (reference-template ~224 chars, admin-template ~236 chars, admin-template-ios ~437 chars); TEMPLATE-SENTINEL purpose is to skip assertions on scaffold placeholder content; consistent with established #9 skip idiom
- [115-01] Code-fence tracking (inCodeFence mask) added to heading detection — EEE-SOP-standard.md has H1 inside ```markdown example block; l2-template.md has H1 inside ```powershell fence; without fence tracking assertion #2 fires falsely (Rule 1 auto-fix)
- [115-01] C17 standalone validator authors as c17-eee-contract.mjs (577 lines); node:fs/path/process imports only; all 13 assertions in one checkFile function; exits 0 on 8 enrolled docs/ files; --self-test exits 0 (4/4 sub-tests pass); Phase-119 boundary intact

**Durable architectural decisions (carried forward from v1.14):**

- Sequential-on-main-tree per `use_worktrees:false`; atomic harness commits (Atom 1 + Atom 2); frozen-aware via `_lib/frozen-at-close.mjs`; non-Phase-1 predecessor frozen surfaces BYTE-UNCHANGED
- WINDOWS-CLONE-DEEPNEST-TIMEOUT-01 now at depth [48..119] (v1.16): Linux GHA BOTH chain validators authoritative (D-03 corrected OS split, same as v1.12-v1.15)
- Adversarial-review invoked at discuss-phase for gray-area scoping decisions (per user memory)
- Navigation-last hard constraint: all nav hub edits committed after the content files they reference
- Per-section `last_verified`/`review_by` freshness stamps on version-gated content (carried policy; v1.15/v1.16 carry verbatim — does not reset the clock)
- [Phase ?]: YAML-LEAK guard runs on decompressed extractBodyText() output -- raw byte scan always false-green (D-04 mitigation)
- [Phase ?]: guard-docx.mjs standalone in scripts/pipeline/ (no CHAIN_PHASES); Phase-119 folds it into check-phase-113.mjs per D-07
- [Phase ?]: convert.ps1 version-guards pandoc 3.7.0.2; PATH-then-LOCALAPPDATA resolution (T-113-01 mitigation)
- [Phase ?]: D-07 applied: pipe-list platform placeholders replaced with platform: all in 3 templates; guidance in HTML comment block to avoid | on platform: line
- [Phase ?]: D3-A structure enforced in all 7 templates: gate blockquotes relocated to after ## Summary; EEE block immediately after frontmatter close; ## Summary as first H2
- [Phase ?]: D-06: reference-template.md created with Phase-118 table-remediation rule (>25 rows → prose summary within 5 lines); RCA template deferred to v1.16
- [Phase ?]: [114-03] TEMPLATE-SENTINEL applied to all 7 templates (last_verified: 1970-01-01); ios/macos templates normalized from YYYY-MM-DD placeholder to sentinel
- [Phase ?]: Tasks 1+2 combined: helper writes [FILL-IN] placeholder that would be invalid state if committed before Summary prose; mirrors 116-01 pattern
- [Phase ?]: D-05 em-dash clause split: RE-038 Path B/C first sentences split at em-dash clause boundary into 4 groups; all words preserved per D-05 rules
- [Phase ?]: Transform A (sentence-boundary split) for gate blockquotes; Transform B (de-blockquote) for non-gate callouts — applied in RE-017..RE-030 EEE retrofit
- [Phase ?]: Transform B applied to two single-sentence over-200c blockquotes in file 18 where Transform A not applicable
- [Phase ?]: Mermaid diagram in RE-068 converted to Markdown table — C17 #1 prohibits Mermaid fences; DA-9 locked 7-leaf count preserved in table rows (v1.16 precedent candidate for RETRO-05/08 if the Mermaid policy lands on text-equivalent conversion)
- [Phase ?]: Transform B (de-blockquote) used for all non-gate informational notes exceeding 200c in RE-066..RE-075 — avoids fragmenting technical content while satisfying C17 #12
- [Phase 117-01]: Forked scripts/pipeline/retrofit-guide.mjs rather than refactoring retrofit-runbook.mjs in place -- protects the shipped Phase-116 deliverable from a shared-refactor regression
- [Phase 117-01]: Whole-pre-H1-span relocation fix: replaced 116's first-blockquote-run-only gate capture with full-span capture, trimming only leading/trailing blanks -- fixes confirmed silent-content-loss on ios/02-abm-token.md, macos/01-abm-configuration.md, and android/09..13-aosp-*.md
- [Phase 117-02]: Version-History date filled with actual commit date (2026-07-05) rather than placeholder
- [Phase 117-02]: Transform A (blank-line split) used for all admonition boxes since none contain embedded code fences; Transform B reserved for code-bearing WARNING/DANGER boxes
- [Phase 117-03]: Transform B applied to 3 blockquote groups (05's 1080c, 08's 982c, and one unsplittable-link sentence in 08) -- de-blockquoting preferred over word-splitting when a markdown link would otherwise be broken mid-span
- [Phase ?]: [117-04] Confirmed dry-run span-byte-length equality (orig==reloc) for all 5 AOSP-OEM files before writing -- validates the 117-01 whole-pre-H1-span fix against every confirmed HTML-comment case in the corpus
- [Phase ?]: [117-04] Word-set diff (pre- vs post-#12-fix) confirmed zero real words added/removed across all 5 files; caught and reverted one capitalization/punctuation drift before committing Task 3
- [Phase 117-05]: Confirmed dry-run span-byte-length equality (804=804) for 02-abm-token before writing -- validates the 117-01 whole-pre-H1-span fix against the corpus's canonical 2-blockquote real-file case (Platform gate + Rebrand notice)
- [Phase 117-05]: Used an automated greedy sentence-boundary packing script for the bulk of the 86 #12 splits across the 9 iOS files (heaviest single-file count in Phase 117: 30 groups in 04-configuration-profiles.md), with manual clause-level splits for stragglers; word-set diff confirmed zero real-word deltas for all 9 files
- [Phase 117-06]: Confirmed dry-run span-byte-length equality (658=658) for 01-abm-configuration -- validates whole-pre-H1-span fix against a second real 2-blockquote corpus case (Platform gate + Rebrand notice)
- [Phase 117-06]: Added a prose summary line under 02-enrollment-profile's 29-row Setup Assistant Screens table to satisfy C17 assertion #11, in-scope for the plan's C17-exit-0 done criterion
- [Phase 117-06]: Extended the #12 sentence-split regex to recognize closing **/*/backtick markers before whitespace, and reserved Transform B (de-blockquote) for 02-enrollment-profile's 1458c multi-paragraph bullet-list callout per plan designation
- [Phase ?]: [117-07] Transform B applied to 07's corpus-worst 1892c 'Before You Deploy' box and 6 other multi-paragraph/bulleted WARNING boxes across 08/09/10/11 (incl. 09's box containing an embedded app-sso platform -s fence, unmasked to a real top-level fence); Transform A used for all remaining single-paragraph callouts
- [Phase ?]: [117-07] 11's [!WARNING] GitHub alert marker kept paired only with its first split sentence (no corpus precedent for splitting a marked alert under C17); word-set multiset diff against git HEAD used per-file to prove zero real-word loss across all #12 splits
- [Phase 117]: [117-08] Transform B applied to 01's 1158c Identity Broker re-enrollment box (structured multi-paragraph admonition with numbered checklist) rather than Transform A
- [Phase 117]: [117-08] Five single-sentence blockquotes exceeded 200 chars even alone (02/03/04/05); each split at a natural em-dash or semicolon clause boundary, preserving every word, rather than escalating
- [Phase ?]: [117-09] Transform B (de-blockquote) used for 15 of 18 802.1X #12 groups -- structured multi-paragraph WARNING/NOTE boxes with embedded tables (04, 06) or multi-line markdown links (04, 05) risk fragmentation under Transform A; dot3svc code-embedded WARNING (03-windows) required Transform B per plan mandate so the embedded fence becomes a real masked fence
- [Phase ?]: [117-09] Confirmed dry-run span-byte-length equality (186=186, 169=169 x5) for all 6 files before writing -- this batch exercises the simple single 2-line Prerequisites-blockquote pre-H1-span case, not the multi-blockquote/HTML-comment cases seen in earlier 117 plans
- [Phase 117-10]: This plan is verification-only by design (files_modified: [] in frontmatter) -- no per-task code commits were made; only this SUMMARY + STATE/ROADMAP metadata commit closes the plan
- [Phase 117-10]: Confirmed RETRO-02 is genuinely complete: all three independent proofs (57-key-presence precheck, 9-keyless-mermaid confirmation, full-class C17 exit 0) passed with zero exceptions
- [Phase 118]: [118-01] Forked retrofit-reference.mjs from retrofit-guide.mjs (protects shipped 117 deliverable); VH CREATE branch always 3-column per Open Question 1 lock; detectVhColumnCount defaults to 3-column if inconclusive
- [Phase ?]: [118-02] Legacy dangling changelog tables (macos-capability-matrix.md, windows-vs-macos.md) treated as in-scope D-118-1 tables to match plan must_haves table counts, not restructured
- [Phase ?]: [118-02] Transform A truly-empty-line split applied to the batch's 2 pre-existing C17 #12 violations (aosp-oem-matrix.md 286c, windows-vs-macos.md 230c); word-preservation confirmed via git diff
- [Phase ?]: All 8 files exercised the VH CREATE branch (no pre-existing Version History), matching plan must_haves
- [Phase ?]: 20 over-limit #12 blockquote groups resolved entirely via Transform A (sentence/clause split); no Transform B needed (no embedded code fences in this batch)
- [Phase ?]: Word-set reformat-only proof must strip the leading '>' blockquote-prefix token before comparing multisets -- raw diffs show false positives from added '>' tokens per new split group
- [Phase 118]: [118-04] Version-History date placeholder requires manual fill: retrofit-reference.mjs's CREATE branch writes a literal YYYY-MM-DD token rather than auto-filling the commit date; filled 2026-07-06 across all 10 files matching 117-02/118-02/118-03 precedent
- [Phase ?]: [118-05] All 7 error-codes files confirmed keyless (applies_to: both/APv1/APv2 are not platform keys) -- platform: Windows injected uniformly, resolving cleanly in D1_MAP
- [Phase ?]: [118-05] 01-mdm-enrollment.md's corpus-worst 689c APv2 Note blockquote (with bare '>' continuation lines that do not break a C17 group) required a 6-way sentence-level Transform A split; no embedded code fence found so Transform B was not needed anywhere in this batch
- [Phase ?]: Reference-class registry count verified as 35 (34 Approved + RE-147 Pending); full C17 run scope (174 files) intentionally re-validates all prior retrofit classes alongside the 34 new reference files
- [Phase ?]: [119-01] Wave-0 anchor SHA = c6ea8d25 (predecessor-byte-unchanged HARD-gate base for 119-04); DISTINCT from BASELINE_19 anchor (119-02 captures that JIT before Atom 1 per Pitfall 4)
- [Phase ?]: [119-01] V114 = 7d922a7 positively confirmed (msg has MILESTONE-AUDIT + MILESTONE CLOSE); naive --grep recovery returns f3959c8 (wrong follow-up) — DO NOT pin f3959c8; the SAME positive-confirmation method must be used to recover V115 at Phase 125
- [Phase ?]: [119-01] Baseline v1.14 harness RED on HEAD (11/4/0): C2/C7/C9 sidecar {file,line} pins shifted by EEE retrofit on Phase-1 surfaces; C15 a NEW EEE-Summary collision (RE-108:19). v1.15 sidecar must NOT be copied verbatim — 119-02 repoint worklist recorded in SUMMARY
- [Phase ?]: [119-02] Atom 1 shipped as ONE indivisible commit b530243 (exactly 3 files; git show --stat verified no Atom-2 leak, no deletions)
- [Phase ?]: [119-02] C17 folded as check id 17 via execFileSync subprocess-spawn of c17-eee-contract.mjs (argument-array, NOT inline copy); harness --self-test exits 0; --verbose 15P/1F
- [Phase ?]: [119-02] BASELINE_19 back-anchored to JIT pre-Atom-1 HEAD a323332 (differs from Wave-0 c6ea8d2 — Jira-sync intervened, Pitfall 4); BASELINE_9 + v1.7 refs byte-unchanged
- [Phase ?]: [119-02] Sidecar C2/C7/C9 pins repointed per live re-verification (matrix 89..99->123..135 incl 1 new RETRO-03 prose pin, cobo 36->52/54, runbook 21->33, knox 11/143/143/145->21/167/167/173, zero-touch 131->147, COPE 153->199/55->75); next_review->2026-10-01
- [Phase ?]: [119-02] DEFERRED to 119-05 remediation slot: C15 abm-token.md:19 EEE-Summary collision + regenerate-supervision-pins --self-test pre-existing RED (both out of Atom-1 3-file scope; latter proven RED at v1.14-close 7d922a7, advisory job)
- [Phase ?]: [119-03] Atom 2 = ONE indivisible commit 5ec0f87 (exactly 9 files; git show --stat verified no Atom-1 leak, no deletions): check-phase-113..118 leaves (CHAIN_PHASES=[], CHAIN_SKIP empty) + check-phase-119 apex (CHAIN_PHASES=[48..118] 71 entries, CHAIN_SKIP empty, module-load bound assertion) + frozen-at-close V114='7d922a7'+readAtV114Close (no V115) + audit-harness-v1.15-integrity.yml (12th workflow; dual-apex + LF-fidelity preserved)
- [Phase ?]: [119-03] check-phase-115 leaf asserts standalone c17-eee-contract.mjs (no CHAIN_PHASES) NOT chain registration (115-VERIFICATION Deferred Items → chain fold is Phase-119 Atom-1's job)
- [Phase ?]: [119-03] Axis-2 armed: pushed branch phase-119-atom-2 + PR #2; v1.15 workflow run 28823233887 fired on pull_request (all 11 coexistence workflows triggered). Do NOT run full recursive apex locally on Windows (WINDOWS-CLONE-DEEPNEST-TIMEOUT-01); NESTED-mode run enumerated 74 checks + V-119-SELF PASS. 119-04 consumes run 28823233887
- [Phase ?]: [119-06] PIPE-02 CLOSE: PASS owner-attested (2026-07-06, ~23:10-23:16 live Copilot Studio) on the REAL retrofitted corpus — 6 uploaded RE-NNN .docx all grounded with clickable document-level citations, zero hallucination (incl. negative ChromeOS control). KEY v1.15 wide/flat 5-platform matrix (RE-143) chunk-survival CONFIRMED (the leg Phase 113 could NOT disprove); EEE body-text header-block thesis (RE-129 Q8) confirmed on the real corpus; Q4 surfaced the exact V-50-18 "Known Admin Pitfall" blockquote (content-survival proof). Draft-probe = Option A (test-artifact-only frontmatter mutation of RE-130); honest caveat: mutation flipped ONLY frontmatter status:, not the visible **Status:** block, so the literal Draft label was not exercised — accepted as artifact-prep gap NOT a grounding failure; deferred to v1.16 (mutate BOTH frontmatter + visible block, now PIPE-05/Phase 124's job). Android folded into the wide-matrix probe (6 docs, not 7). 529-line raw transcript captured in-repo (PIPE-02-CLOSE-TRANSCRIPT.txt; D-119-1 rider; T-119-06-ASSERTED mitigation). 4th/final close-gate precondition cleared; NO requirement flipped (119-07's exclusive job)
- [Phase 120]: Written the D-04 honesty caveat as plain prose (no blockquote) to avoid any risk of tripping C17 assertion #12's 200-char blockquote limit
- [Phase 120]: Kept the 5-class illustrative Doc Type mapping table separate from the frozen 4-row Doc Type Taxonomy table (5 rows/3 cols, not merged) per RESEARCH Pitfall 2 guidance
- [Phase 120]: Comment-only pointer added above c17-eee-contract.mjs hasMermaid line, avoiding the literal CHAIN_PHASES substring and preserving --self-test/C17 assertion-violation-counts: needle strings
- [Phase ?]: HYG-01 verified against live grep of check-phase-{61,67,68,70,111}.mjs before finalizing corrected comment wording; 120-VERIFICATION.md cites real committed strings from 120-01 for future needle-check derivation; check-phase-120.mjs deliberately NOT authored (validator-atom deferral to Phase 125/HARN-06)
- [Phase 121-01]: Forked retrofit-reference.mjs (not retrofit-guide.mjs) as the retrofit-structural.mjs template — it already carries the detectVhColumnCount CREATE-vs-PREPEND logic the plan mandates, and the router pattern generalizes to emit either doc_type from one resolved value
- [Phase 121-01]: No special-case needed for docs/_glossary-android.md's reversed H1/blockquote order — the whole-pre-H1-span mechanism naturally produces the same post-Summary blockquote placement, confirmed via --dry-run --all (preH1SpanLines=0 for that file)
- [Phase 121-01]: docs/_glossary-network.md uses ## Change History instead of ## Version History (confirmed vhBranch=CREATE on dry-run) — flagged as an executor hazard for the wave-2 plan that touches this file, to avoid spawning a duplicate section
- [Phase 121]: R1 network Change-History reconciled to Version-History via a pre-fork rename (not a post-fork merge) so insertVersionHistoryRow PREPENDs the v1.16 row instead of CREATE-ing a duplicate section
- [Phase 121]: All 26 over-200-char blockquote splits used word-preserving Transform A (sentence/clause-boundary); one network see-also link-list group hand-split at middle-dot separators to avoid breaking a markdown link mid-span
- [Phase 121-03]: Built a reusable word-preserving greedy blockquote packer (markdown-link/backtick-aware tokenizer, prefers clause-boundary breaks) instead of hand-splitting all 31 over-200-char blockquote groups across the macos/apple-business glossaries
- [Phase 121-03]: Discovered mid-task that a per-line-only length check is insufficient for C17 assertion #12 -- it joins ALL consecutive '>' lines into one measured group; fixed the validator to replicate C17's exact grouping algorithm before any file write occurred
- [Phase 121-03]: Every split blockquote chunk is separated by a genuine blank line (never merely consecutive short '>' lines), and the reformat-only proof strips '>' prefixes before comparing word multisets (git HEAD vs working tree) -- only diff found was the intentional Version-History date-placeholder fill
- [Phase 121]: 121-04: Confirmed registry mapping RE-181=_glossary-linux.md, RE-184=_glossary.md (doc_type Reference) as source of truth over an inconsistent phase-grounding note
- [Phase 121]: 121-04: Built a reusable link/backtick-aware word-preserving greedy blockquote splitter (trailing-punctuation glue set [.,;:)]* to survive nested-paren link constructions); word-set multiset diff proof caught and fixed a first-pass spacing artifact before commit
- [Phase 121]: [121-05] Pre-flight --dry-run --verbose confirmed doc_id/platform resolution (RE-185..188/RE-189/RE-202..203, Android/iOS/Linux) before writing any of the 7 lifecycle Guide files
- [Phase 121]: [121-05] C17 #12's real join-then-measure grouping algorithm caught 3 single-sentence over-200-char blockquotes that a naive per-line length check missed; hand-split at em-dash/clause boundaries down to 3-way splits in the worst cases
- [Phase 121]: [121-05] Did NOT run requirements.mark-complete for RETRO-07 despite it being in this plan's frontmatter requirements field -- REQUIREMENTS.md explicitly scopes RETRO-07 as spanning Phase 121 (13 Mermaid-free files) + Phase 122 (9 Mermaid-bearing files), closing only when all 22 lifecycle files are C17-green; this plan completes 7 of the 13 Mermaid-free files, so RETRO-07 correctly remains Pending in the traceability table
- [Phase 121-06]: RETRO-09 marked complete -- RE-175/176 now carry real EEE frontmatter (doc_id/status/owner/doc_type), not just the registry Approved flip from 121-01; RETRO-07 correctly left Pending (spans Phase 121 + 122)
- [Phase 121-06]: C17 #12 grouping requires a genuine blank (non-'>') line to break a blockquote group -- a bare '>' continuation line still joins with adjacent '>' lines; caught and fixed one 249-char false-negative in 05-post-enrollment.md's L2 Note header
- [Phase 121-07]: Verified C17 195/0 exit-0, registry 19-Approved/9-Pending split, 9-Mermaid-unenrolled invariant, VH-row/anchor-slug discipline; RETRO-04/09 CLOSED, RETRO-07 PARTIAL (13/22) handed to Phase 122
- [Phase 121-07]: Logged DEFER-121-07-A: 9 files (2 glossaries from 121-04, 7 lifecycle files from 121-05) carry an unfilled YYYY-MM-DD Version-History date placeholder -- pre-existing, out of scope for this read-only verification plan, logged to deferred-items.md
- [Phase ?]: [122-01] Expanded KNOWN_WINDOWS_KEYLESS_PATHS from the plan's proposed 5-entry (decision-trees 00-04 only) allowlist to the verified 12-file union across the 30-file roster -- live frontmatter grep found 3 admin-setup APv1/APv2 carve-outs + 4 lifecycle files also genuinely keyless-Windows, matching CONTEXT D-03's own broader claim
- [Phase ?]: [122-01] Recorded the RE-212 (05-device-lifecycle.md) directory-precedence rationale in a new Review Notes section in RE-index.md -- no prior per-row rationale-note precedent existed in that file
- [Phase ?]: 122-02: Corrected 08-android-triage.md LOCKED-N from the plan's precomputed 38 to the independently re-derived 39 (14 nodes + 25 labeled edges), and fixed a collapsed reconvergence row that had dropped 3 of ANDE3's 4 incoming edges -- both caught by the D-01 independent re-derivation discipline during Task 1.
- [Phase ?]: 122-02: Established a grouped multi-stage decision-table shape (headed Stage-N sub-tables) for decision graphs lacking a pre-existing routing-table analog (00-initial-triage.md, 01-esp-failure.md).
- [Phase ?]: [122-03] Verified all 3 files' (02/03/04) plan-precomputed LOCKED-N counts (35/33/23) were correct against git-show 71be4ab bytes -- no corrections needed, unlike 122-02's 08-android off-by-one
- [Phase ?]: [122-03] Deleted 04-apv2-triage.md's Legend section and mermaid click-navigation directives together as one stale-prose removal -- first file in the roster confirmed to carry both anti-pattern classes simultaneously; reworded a freshly-authored VH row to clear a stale-prose grep false-positive on the word 'click'
- [Phase 122-04]: 05-device-lifecycle.md's Q1-Q4 decision graph converted to a single 5-row ordinal-column decision table (one row per terminal action/path) rather than a per-edge table -- matches the shipped 10-8021x-triage.md / 06 / 07 Routing Verification precedent
- [Phase 122-04]: 06/07 already carried a pre-existing Routing Verification table built under the same shape convention prior to this phase; conversion work was fence + Legend removal, LOCKED-N annotation, and (for 06) explicit nested-MACSSO row labeling -- not a from-scratch table author
- [Phase 122-04]: All 3 files' LOCKED-N counts (18/31/23) independently re-derived against git show 71be4ab bytes and found to match the plan's precomputed values exactly -- no corrections needed
- [Phase ?]: [Phase 122-05] 09-linux-triage.md's pre-existing Routing Verification table already covered all 6 edges (5 labeled root branches + LINCA->LINR32 continuation folded into the CA-disambiguation row); conversion work was fence + Legend removal, LOCKED-N annotation, and blockquote split, not from-scratch table authoring
- [Phase ?]: [Phase 122-05] 10-8021x-triage.md's LOCKED-N annotation upgraded from the older 5-leaf-count convention to LOCKED — 11 (nodes + labeled edges, R1 convention) since this file, being the STD-04-cited exemplar, sets precedent for all decision-trees; both LOCKED-N counts (12/11) independently re-derived against git show 71be4ab bytes and matched the plan's precomputed values exactly
- [Phase 122-06]: Independently re-derived admin-setup-android/00-overview.md's LOCKED-N as 15 (11 nodes + 4 labeled edges via git-show-verified grep extraction), correcting the plan's precomputed 16
- [Phase 122-06]: Independently re-derived admin-setup-ios/00-overview.md's LOCKED-N as 15 (11 nodes + 4 labeled edges), correcting the plan's precomputed 18; macos/00's LOCKED-11 matched the plan exactly, confirming the counting methodology
- [Phase 122-06]: macos/00's diamond-free C/D/E->F reconvergence documented as explicit prose directly under the LOCKED-N line (not folded into an existing list item), keeping it maximally visible for the D-01 verification pass
- [Phase ?]: [Phase 122-07] 8021x/01's sequenceDiagram LOCKED-N corrected to 8 messages (not the plan's stated 10) via independent re-derivation against git show 71be4ab; Note annotation folded inline on step 6 rather than counted as a message
- [Phase 122]: [Phase 122-08] apv1/00 + apv2/00 diamond-free linear graphs converted to compact numbered stage lists preceding the pre-existing detailed guide lists (same pattern as 122-07 8021x/00); all 3 plan-precomputed LOCKED-N counts (8/4/5 for apv1/00, apv2/00, linux/00) independently re-derived and confirmed correct
- [Phase 122]: [Phase 122-08] admin-setup-linux/00 B->C/D/E fan-out preserved via explicit parallel-step annotations; ca-enrollment-timing.md LOCKED-N corrected from plan's stated 8 messages to independently re-derived 7 (same off-by-one class as 122-02/06/07); RETRO-08 CLOSED -- all 10 carved-mermaid files now converted, enrolled, Approved
- [Phase 122]: lifecycle/03-oobe.md's 2-diamond decision graph resolved to two linked decision tables (primary Path table + secondary ESP-Result sub-table) preserving both diamonds' branch structure and the 3-way ESP4 merge
- [Phase 122]: Bare '>' lines do NOT break a C17 assertion #12 blockquote group -- only a genuinely blank line does; corrected mid-Task-1 of 122-09 before Tasks 2/3
- [Phase 122]: Phase 122 (122-10): D-01 independent re-derivation caught a 4th planning-input correction -- ios-lifecycle/01-ade-lifecycle.md's diamond (S6 User Affinity?) was missed by RESEARCH/PLAN (stated 0 diamonds); converted to a Path decision table (LOCKED-10) per D-02 bright-line and CONTEXT's own LOCK note naming this file
- [Phase ?]: [Phase 122-11]: All 3 macos-lifecycle LOCKED-N counts (10/13/17) independently re-derived against git show 71be4ab bytes and matched the plan's precomputed values exactly -- no corrections needed, unlike several prior 122 plans
- [Phase ?]: [Phase 122-11]: Fixed a word-preserving greedy blockquote packer bug mid-task: after a break, internal clause/sentence markers within the retained tail were being reset to -1 instead of rescanned, causing hard mid-sentence breaks; rescanning the tail restored clean sentence/clause-boundary splits across all 21 blockquote groups in this plan
- [Phase ?]: [Phase 122-11]: Transform B (de-blockquote) applied to macos/01's corpus-max 5877c A2 Path section and macos/02's 1480c B2 Requirements Summary section -- both carry embedded tables/nested code fences; RETRO-07 CLOSED -- all 9 Mermaid-bearing lifecycle files (22/22 total across Phases 121+122) now C17-green
- [Phase 122]: [Phase 122-12] Independent D-01 re-derivation confirms all 11 decision-tree LOCKED-N annotations (36/43/35/33/23/18/31/23/39/12/11) match git-show 71be4ab base bytes exactly, including independent re-confirmation of two prior corrections (08's 39, 10's upgraded 11); zero gaps, zero stale prose, zero narrowed edge semantics found

### Plan-Time Research Flags (not blockers — resolve at each phase's plan time)

- Phase 120 (STD-04): resolve the Mermaid-vs-C17-#1 collision via `/adversarial-review` before authoring the standard-doc rule and C17 assertion #1 change — this is the DOMINANT discuss-phase flag for the whole milestone
- Phase 120 (Doc Type taxonomy): enumerate the exact set of `doc_type` values already used for nav-hub-adjacent pages (if any) before deciding whether nav-hubs get a new Doc Type or map to Reference
- Phase 121 (RETRO-04/07/09): confirm exact glossary / lifecycle / end-user-guide file counts and paths at plan time; confirm anchor-slug inventory for glossaries before retrofit (do not break existing plain-GitHub slugs)
- Phase 122 (RETRO-05/08): enumerate the exact decision-tree file list + confirm the 9 Phase-117 carve-out file paths + RE-128/RE-147 status before authoring; each Mermaid diagram's decision-leaf count must be captured BEFORE conversion (v1.15 RE-068 precedent: leaf-count preserved)
- Phase 123 (RETRO-06): confirm the routing/link-table inventory in all 4 nav-hubs before retrofit, so post-retrofit link-accuracy can be verified against a known-good baseline
- Phase 124 (PIPE-03): confirm which approach (canonical `--from=markdown-yaml_metadata_block` invocation fix vs. corpus-wide nav-footer normalization) at discuss-phase before implementation; both legs must be regression-tested against OQ4
- Phase 124 (PIPE-04): confirm rename-map source of truth and whether renaming happens in-milestone vs. at bulk-upload time, at discuss-phase
- Phase 124 (PIPE-05): confirm owner SharePoint/Copilot Studio access availability at plan time (mirrors the v1.15 Phase 113/119 owner-checkpoint pattern)
- Phase 125 (HARN-05): confirm V115 SHA via the SAME positive-confirmation method used for V114 at 119-01 (do not trust a naive `--grep` result)
- Phase 125 (HARN-06): run the FULL predecessor chain BEFORE authoring the close-gate (not just the two immediate apexes) per the reaffirmed process lesson (`LATENT-NON-FROZEN-AWARE-CONTENT-ASSERTION-01`) — scope which validators need frozen-aware conversion at plan time, not at the close

### Pending Todos

- At Phase 120 plan time: run `/adversarial-review` (Finder/Adversary/Referee) on the Mermaid-vs-C17-#1 collision before authoring the standard-doc rule and the C17 assertion #1 change
- At Phase 121 plan time: enumerate exact glossary / lifecycle / end-user-guide file paths; confirm anchor-slug inventory
- At Phase 122 plan time: enumerate exact decision-tree file list + confirm 9 Phase-117 carve-out paths + RE-128/RE-147 current status; capture each Mermaid diagram's decision-leaf count before conversion
- At Phase 123 plan time: confirm routing/link-table inventory in all 4 nav-hubs before retrofit
- At Phase 124 plan time: resolve PIPE-03 approach + PIPE-04 rename scheme at discuss-phase before implementation; confirm owner availability for the PIPE-05 live Copilot Studio probe
- At Phase 125 plan time: confirm V115 SHA via positive-confirmation grep; run the FULL predecessor chain before authoring the close-gate; confirm CHAIN_PHASES=[48..119] entry count

### Blockers/Concerns

at roadmap stage. Execution-time watch items (not blockers — address within specified phases):

- Phase 120: the Mermaid-vs-C17-#1 resolution is the dominant design gray area for the entire milestone — if `/adversarial-review` lands on a carve-out rather than conversion, RETRO-05/RETRO-08 (Phase 122) success criteria may need revision at discuss-phase 122
- Phase 122: Mermaid decision-leaf preservation is a correctness risk — any leaf dropped during text-equivalent conversion is a silent content-loss defect (same class as the v1.15 117-01 whole-pre-H1-span defect); capture leaf counts before conversion
- Phase 123: navigation-last discipline is a HARD constraint, not a preference — nav-hub commits must be provably sequenced after Phase 121/122 content commits (git history check, same as v1.15 Phase 109/117)
- Phase 124: PIPE-03's OQ4 regression risk — any invocation change to `convert.ps1` must be proven NOT to break the frontmatter → Word custom-property promotion path that OQ4 (v1.15 Phase 113) depends on
- Phase 125: WINDOWS-CLONE-DEEPNEST-TIMEOUT-01 now at depth [48..119] (+1 deeper than v1.15); Linux GHA BOTH chain validators remain authoritative (D-03 OS split unchanged)
- Phase 125: HARN-06's frozen-aware conversion clause (predecessor content-assertion validators reading now-retrofitted structural docs) must be scoped at Phase 122/123 plan time per the reaffirmed process lesson, not discovered late at close (the v1.15 119-05 two-round remediation is the cautionary precedent)

## Session Continuity

Last session: 2026-07-08T03:53:46.976Z
Stopped at: Completed 122-11-PLAN.md
Resume file: None
Next action: Run `/gsd-discuss-phase 120` to resolve the Phase 120 discuss-phase flags (dominant: Mermaid-vs-C17-#1 resolution via `/adversarial-review`; Doc Type taxonomy mapping) before planning begins.

## Operator Next Steps

- Review `.planning/ROADMAP.md` (v1.16 section) and `.planning/REQUIREMENTS.md` (Traceability table)
- Run `/gsd-discuss-phase 120` to resolve gray-area flags for the first phase
- Then `/gsd-plan-phase 120` to produce executable plans

## Performance Metrics

| Phase | Plan | Duration | Notes |
|-------|------|----------|-------|
| (v1.16 phases not yet started) | — | — | — |
| Phase 113 P02 | 5min | 2 tasks | 3 files |
| Phase 113 P03 | 35min | 2 tasks | 8 files (7 created, 1 modified) |
| Phase 113 P04 | multi-day (owner checkpoint) | 3 tasks | 2 files (PIPE-02-RUNBOOK.md, PIPE-02-FINDINGS.md) |
| Phase 114 P03 | 5min | 2 tasks | 7 files |
| Phase 115 P01 | 6min | 2 tasks | 3 files (c17-eee-contract.mjs + 2 fixtures) |
| Phase 116 P01 | 15 | 2 tasks | 1 files |
| Phase 116 P02 | 20min | 3 tasks | 11 files (10 runbooks + registry) |
| Phase 116-l1-l2-runbook-retrofit-75-docs P03 | 12 | 3 tasks | 10 files |
| Phase 116 P04 | 50min | 3 tasks | 15 files |
| Phase 116-l1-l2-runbook-retrofit-75-docs P05 | 90 | 3 tasks | 10 files |
| Phase 116-l1-l2-runbook-retrofit-75-docs P07 | 55 | 3 tasks | 15 files |
| Phase 116-l1-l2-runbook-retrofit-75-docs P08 | 90 | 3 tasks | 11 files |
| Phase 117 P01 | 12min | 2 tasks | 1 files |
| Phase 117 P02 | 13min | 3 tasks | 14 files |
| Phase 117 P03 | 25min | 3 tasks | 9 files |
| Phase 117 P04 | 45min | 3 tasks | 6 files |
| Phase 117 P05 | 60min | 3 tasks | 10 files |
| Phase 117 P06 | 35min | 3 tasks | 7 files |
| Phase 117 P7 | 16min | - tasks | - files |
| Phase 117 P07 | 16min | 3 tasks | 6 files |
| Phase 117 P08 | 25min | 3 tasks | 6 files |
| Phase 117 P09 | 13min | 3 tasks | 7 files |
| Phase 117 P10 | 8min | 2 tasks | 0 files |
| Phase 118 P01 | 13min | 2 tasks | 1 files |
| Phase 118 P02 | 24min | 3 tasks | 10 files |
| Phase 118 P03 | 30min | 3 tasks | 9 files |
| Phase 118 P04 | 20min | 3 tasks | 11 files |
| Phase 118 P05 | 24min | 3 tasks | 8 files |
| Phase 118 P06 | 8min | 2 tasks | 0 files |
| Phase 119 P01 | 10min | 2 tasks | 1 files |
| Phase 119 P02 | 40min | 3 tasks | 3 files (Atom 1: harness + sidecar + BASELINE_19) |
| Phase 119 P03 | 40min | 3 tasks | 9 files (Atom 2: check-phase-113..119 + frozen-at-close V114 + v1.15 CI workflow; pushed PR #2; Axis-2 run 28823233887) |
| Phase 119 P05 | 55min | 2 tasks | 5 files (remediation slot: C15 FP exemptions + frozen-aware reads 50/52/65; Axis-2 GREEN run 28825186128) |
| Phase 119 P04 | 20min | 3 tasks | 2 files (3-axis re-audit + byte-gate; Axis-2 GREEN 73/0/1; EXACT MATCH; byte-unchanged EMPTY) |
| Phase 119 P06 | multi-day (owner checkpoint) | 3 tasks | 3 files (PIPE-02-CLOSE-RUNBOOK/FINDINGS/TRANSCRIPT; owner PIPE-02 CLOSE: PASS attested 2026-07-06) |
| Phase 120 P01 | 6min | 2 tasks | 2 files |
| Phase 120 P02 | 6min | - tasks | - files |
| Phase 121 P01 | 20min | 2 tasks | 2 files |
| Phase 121 P02 | 20min | 2 tasks | 2 files |
| Phase 121 P03 | 40min | 2 tasks | 2 files |
| Phase 121 P04 | 20min | 2 tasks | 2 files |
| Phase 121 P05 | 20min | 2 tasks | 7 files |
| Phase 121 P06 | 40min | 2 tasks | 8 files |
| Phase 121 P07 | 12min | 2 tasks | 0 files |
| Phase 122 P01 | 25min | 3 tasks | 2 files |
| Phase 122 P02 | 45min | 3 tasks | 4 files |
| Phase 122 P03 | 25min | 3 tasks | 4 files |
| Phase 122 P04 | 15min | 3 tasks | 4 files |
| Phase 122 P05 | 20min | 2 tasks | 3 files |
| Phase 122 P06 | 25min | 3 tasks | 4 files |
| Phase 122 P07 | 45m | 3 tasks | 4 files |
| Phase 122 P08 | 40min | 3 tasks | 5 files |
| Phase 122 P09 | 65min | 3 tasks | 4 files |
| Phase 122 P10 | 70min | 3 tasks | 4 files |
| Phase 122 P11 | 50min | 3 tasks | 3 files |
| Phase 122 P12 | 45min | 2 tasks | 1 files |
