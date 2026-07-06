# Phase 117: Admin-Setup Guide Retrofit (all platforms) - Context

**Gathered:** 2026-07-05
**Status:** Ready for planning

<domain>
## Phase Boundary

Retrofit the admin-setup guide files (registry `doc_type: Guide`, `docs/admin-setup-*/`) to the EEE
standard so **C17 exits 0 on every enrolled file** before phase close. This is the **second Phase-1
document class** (L1/L2 runbooks were the first — Phase 116). Pure reformat — content is NOT
re-reviewed: `last_verified` carried verbatim into `Last Reviewed` + a `v1.15 EEE reformat — content
not re-reviewed` Version-History row (D2-A). Deliverables fixed by ROADMAP Phase-117 SC1–SC4 and
requirement RETRO-02.

**The corpus (verified filesystem + `docs/_registry/RE-index.md`):** the admin-setup Guide class =
registry `RE-076`…`RE-141` = **66 files**, all `doc_type: Guide`, `Status: Pending`, across 7 directories /
6 platform families:

| Guide set | Dir | Files | Platform (D1 label) |
|---|---|---|---|
| APv1 | `docs/admin-setup-apv1/` | 11 | Windows — **keyless** (no `platform:` key → inject `platform: Windows`) |
| APv2 | `docs/admin-setup-apv2/` | 5 | Windows — **keyless** (inject) |
| Android | `docs/admin-setup-android/` | 14 | Android |
| iOS/iPadOS | `docs/admin-setup-ios/` | 10 | iOS |
| macOS | `docs/admin-setup-macos/` | 12 | macOS |
| Linux | `docs/admin-setup-linux/` | 6 | Linux |
| 802.1X | `docs/admin-setup-8021x/` | 8 | **heterogeneous** — `00/01/02` = `all` (→ "All Platforms"); `03-07` = `windows/macos/ios/android/linux` |

**Enrolled scope = 57 files.** Per D-05 (mermaid carve-out), **9 mermaid-bearing files are deferred to
v1.16** and are NOT enrolled this phase → **57 files retrofitted + C17-green; 9 carved out.**

**NOT this phase:** L1/L2 runbook retrofit (Phase 116 / RETRO-01, DONE); reference-doc retrofit + table
remediation (Phase 118 / RETRO-03); frozen-surface re-baseline / 13th Path-A lineage bump / close
(Phase 119); any edit to C17 itself (immutable gate — Phase 115 D-04); the 9 mermaid-bearing admin-setup
files (deferred to v1.16 — D-05); reference-class Guides (`RE-153/154/155`) and end-user Guides
(`RE-175/176`) which are NOT admin-setup (Phase 118 / v1.16). **No new documentation content**
(REQUIREMENTS.md:75-76). New capabilities belong in their own phases.

**Adjudication method:** All four gray areas + the mermaid disposition were resolved via a three-agent
adversarial review (Finder → Adversary → Referee, all Opus), each independently re-verifying every
deciding fact against the repo. The Adversary **overturned 1 of 4** Finder picks (D-03 Summary lead:
3A → 3A′) and surfaced **two material grounding corrections** (C1: #12 workload is 66/66 files not 52;
C2: 9 mermaid files hard-fail C17 #1). The Referee upheld all Adversary verdicts. User confirmed the
four decisions and selected **carve-out + defer the 9 mermaid files to v1.16** on 2026-07-05.

</domain>

<decisions>
## Implementation Decisions

### D-01 — Phase granularity: ONE Phase 117 with batched plans (Decision 1 → 1A) [resolves ROADMAP SC4 flag]
- Deliver RETRO-02 as **one Phase 117** carved into multiple batched **plans** — NOT split into
  per-platform roadmap sub-phases.
- *Rationale (repo-grounded):* `REQUIREMENTS.md:13` locks "each requirement maps to exactly **one**
  roadmap phase"; RETRO-02 (`REQUIREMENTS.md:40`) is a single requirement covering all platforms — a
  sub-phase split forks it across ≥2 phases. A split also triggers a **HARN-03 renumber cascade**:
  `ROADMAP.md` Phase-119 Atom 2 hard-codes `check-phase-113..119.mjs` with `CHAIN_PHASES=[48..118]`,
  `CHAIN_SKIP=new Set([])`, and the `frozen-at-close.mjs` V114 SHA pin `7d922a7` — inserting 117a/b/c
  renumbers 118/119 and desyncs those continuity validators + SHA pins. Sub-phase isolation buys
  nothing: execution is sequential-on-main (no worktrees) and C17 enrolls **per-file by EEE-key
  presence** (`c17-eee-contract.mjs:519-533`), so any batch is independently mergeable/gateable. This
  is the locked **116 D-01** precedent verbatim.
- *Rejected 1B (per-platform sub-phases):* breaks 1-req-1-phase; forces the HARN-03 cascade; contradicts
  116 D-01; isolation benefit is null under sequential-on-main + per-file enrollment. *Rejected 1C (one
  monolithic plan for 57/66):* no reviewable checkpoints for the largest hand-authoring load in the
  phase; violates the max-thoroughness preference; 116 rejected the 1C analog.

### D-02 — Batch grouping & size: size-balanced, platform-homogeneous plans (Decision 2 → 2C)
- Carve the 57 enrolled files into **~6 size-balanced plans**, each **platform-homogeneous** (one D1
  label per plan) where filename ranges allow; split large dirs on natural filename/topic seams.
- *Rationale (repo-grounded):* platform-homogeneous plans give **uniform C17 #9** (block-label ↔
  frontmatter exact match, `c17-eee-contract.mjs:298-329`) review per plan. The #12 workload is heavily
  concentrated (per C1: e.g. `ios/04-configuration-profiles.md` alone ~30 over-limit groups; macOS SSO
  cluster `07-11`, `03`, `01` each ≥10; android `05-dedicated` ~18, `08-cope` ~16) — so size-balance
  matters to keep each plan a reviewable checkpoint. Split heavy dirs on homogeneous seams (e.g. android
  core `00-08` | AOSP-OEM `09-13`; macOS core `00-06` | SSO `07-11`). Mirrors **116 D-02** ("batch on
  actual filename number-range + platform cluster; homogeneous where ranges allow").
- **802.1X handling:** keep the 802.1X set as **one cohesive plan** — its `03-07` per-platform files
  depend on shared foundations `00/01/02` (verified cross-refs, e.g. `8021x/03-windows.md` requires EAP
  Method Overview + Cert Delivery Foundation first). Its multi-label heterogeneity is **not a #9
  correctness risk** (#9 is a mechanical per-file match authored from each file's own frontmatter) —
  only reviewer eyeballing is mildly harder. NOTE: two of the 802.1X files (`00-overview`,
  `01-eap-method-overview`) are mermaid-deferred (D-05) → the enrolled 802.1X plan = `02,03,04,05,06,07`.
- *Rejected 2A (strict 1 plan per dir, 7 plans):* safe (117 platforms are cleanly dir-separated except
  8021x, so 116's "no clean contiguous blocks" hazard doesn't bite) but produces lopsided monster plans
  (a ~90-split android dir, ~110-split macOS dir opposite a 5-file apv2 plan) that undercut the
  reviewable-checkpoint rationale. A defensible close 2nd, not optimal. *Rejected 2B (fold 802.1X 03-07
  into platform plans):* scatters a tightly cross-referential set (802.1X-Windows would ride with APv1
  hardware-hash upload, separated from its own `01/02` prerequisites) to optimize a non-problem (#9
  homogeneity, not a correctness risk). Material flaw.

### D-03 — Guide Summary lead: per-platform-template-matched (Decision 3 → 3A′) [OVERTURNED from 3A by Adversary]
- Each `## Summary` lead is authored to the Summary prescription of the **platform template that governs
  the file**, keyed by frontmatter `platform` (the 116 L1-read-only/L2-escalation safety banner does NOT
  apply — admin-config guides aren't diagnostic-read-only):
  - **Windows** (apv1, apv2, `8021x/03-windows`) → generic `admin-template.md:41`: state the **Autopilot
    framework (APv1 / APv2 / both)**, the platform, and the required admin role/permissions.
  - **Android** (admin-setup-android, `8021x/06-android`) → `admin-template-android.md:50`: state the
    **Android Enterprise enrollment mode** (COBO / BYOD Work Profile / Dedicated / AOSP), whether
    **Managed Google Play and/or Zero-Touch** portal access is required, and the Intune admin role.
  - **iOS** (admin-setup-ios, `8021x/05-ios`) → `admin-template-ios.md:42`: state the **enrollment
    method/feature** (ADE / supervised / APNs), the required **ABM + Intune** admin roles, and any
    **supervised-device** prerequisite.
  - **macOS** (admin-setup-macos, `8021x/04-macos`) → `admin-template-macos.md:42`: state the
    **enrollment method/feature** (ADE / MDM profile / Platform SSO), the required **ABM + Intune** admin
    roles, and any **macOS version** prerequisite.
  - **Linux** (admin-setup-linux, `8021x/07-linux`) and **`all`** (`8021x/02`; `00/01` are
    mermaid-deferred): no platform-specific template exists — use the generic scope-lead shape (platform
    + task scope + required admin role), **omitting the APv1/APv2 framework clause** (not applicable).
  - Every Summary remains **≥30 words** (C17 #5, `c17-eee-contract.mjs:262`) and stays within the
    reformat-only envelope (summarize existing Prerequisites/RBAC content — do not add new claims).
- *Rationale:* the repo has **four** admin templates with materially different Summary prescriptions;
  the generic template's "Autopilot framework APv1/APv2" clause is **irrelevant to 50/66 non-Windows
  files**, and android/ios/macos files have their own required Summary elements that a generic 3A omits.
- *Rejected 3A (generic-template lead for all):* wrong-template mis-grounding for 50/66 files. *Rejected
  3B (what-breaks lead):* duplicates the per-setting callout content (`admin-template.md:61,71`); reframes
  toward asserting failure claims (closer to authoring than summarizing). *Rejected 3C (minimal one
  sentence):* concrete C17 #5 (<30 words) failure risk; wastes the SC2 lead-retrieval chunk.

### D-04 — Owner value: uniform `Intune Admin Lead` (Decision 4 → 4A)
- **All 57 enrolled files → `owner: Intune Admin Lead`.**
- *Rationale (repo-grounded):* C17 constrains `owner` only to exist and be non-empty
  (`c17-eee-contract.mjs:287`) and explicitly keeps it **out of the rendered EEE block** (line 273;
  `EEE-SOP-standard.md:54`) — so per-platform owner values buy **zero citation/rendered value** while
  adding per-file judgment cost. Carries **116 D-04** (which rejected the per-platform-owner analog on
  identical grounds).
- **Caveat (decided trade-off, not a defect):** this deliberately diverges from the platform templates'
  per-platform **reviewer** roles (`Android/iOS/macOS Platform Lead`). Acceptable because `owner` ≠
  `reviewer` and neither is rendered. Record in the plan so it is not later flagged as an inconsistency.
- *Rejected 4B (per-platform owner):* contradicts locked 116 D-04; zero gate/citation value; internally
  inconsistent on the heterogeneous 802.1X dir; rests on a misread of the templates (reviewer-comment vs
  `owner: [FILL-IN]`).

### D-05 — Mermaid carve-out: defer the 9 mermaid-bearing files to v1.16 (user-confirmed 2026-07-05)
- **9 admin-setup files carry a top-level `mermaid` fence that HARD-FAILS C17 assertion #1**
  (`c17-eee-contract.mjs:206-208`; no mermaid allowlist). They are **carved out of Phase 117** — left
  **un-enrolled** (do NOT add the four EEE keys → C17's key-presence enrollment does not scan them,
  `c17-eee-contract.mjs:519-533`) and **deferred to v1.16**, which `REQUIREMENTS.md:13` already owns for
  Mermaid handling. Enrolled scope = 66 − 9 = **57 files**.
- **The 9 carved-out files (verified `grep -rl mermaid docs/admin-setup-*/`):**
  `admin-setup-apv1/00-overview.md` (RE-076), `admin-setup-apv1/01-hardware-hash-upload.md` (RE-077),
  `admin-setup-apv2/00-overview.md` (RE-087), `admin-setup-android/00-overview.md` (RE-092),
  `admin-setup-ios/00-overview.md` (RE-106), `admin-setup-macos/00-overview.md` (RE-116),
  `admin-setup-linux/00-overview.md` (RE-128), `admin-setup-8021x/00-overview.md` (RE-134),
  `admin-setup-8021x/01-eap-method-overview.md` (RE-135).
- *Rationale:* converting/removing a mermaid diagram to pass #1 is a **content edit** that breaches the
  reformat-only / no-new-content envelope (`REQUIREMENTS.md:75-76`) and would pre-empt the v1.16 Mermaid
  decision. Deferral is envelope-clean and consistent with the existing v1.16 Mermaid parking.
- **Consequence for the enrollment-completeness precheck (Phase-115 D-02):** the two-part per-phase SC
  must scope the enrolled class as **"every admin-setup guide EXCEPT the 9 mermaid-deferred files carries
  all four EEE keys" THEN C17 exits 0** on those 57. The 9 carved-out files' `RE-index.md` Status stays
  `Pending` (do NOT flip to Approved). Author SC wording so the precheck does not fail on the 9.

### D-GC-01 — #12 blockquote workload is 66/66 files, not 52 (grounding correction C1 — MANDATORY at plan time)
- C17 assertion #12 (`c17-eee-contract.mjs:387-405`) caps **every top-level blockquote GROUP**
  (consecutive `^>` lines concatenated via `join(' ')`) at ≤200 chars. Recomputed across the corpus:
  **66/66 files carry ≥1 over-limit group; ~370 over-limit groups total; 59/66 files have an over-limit
  GATE blockquote** (e.g. apv1/apv2 `Version gate` = 237c; macOS `07-platform-sso-setup` up to ~1,892c).
- **Consequence:** "relocate the gate blockquote after `## Summary`" does **NOT** clear #12 on its own —
  the relocated gate is still over-limit. Every over-limit group needs a **word-preserving structural
  split** (split at clause/sentence boundaries into blank-line-separated blockquotes, or de-blockquote a
  non-gate callout to a bold-led paragraph). **Trims/rewords are FORBIDDEN** (reformat-only envelope; 116
  D-05). This is the dominant hand-authoring workload — size batches (D-02) accordingly. Re-run the #12
  char-count as the objective per-file completion proof alongside C17 exit-0.

### Claude's Discretion (resolve at plan time)
- Exact plan count and precise file-to-plan assignment within the D-02 size-balanced homogeneous scheme
  (target ~6 plans over the 57 enrolled files; keep each plan platform-homogeneous; split heavy dirs on
  natural filename seams).
- Exact shape/name of the mechanical retrofit helper (D-03 method carries from 116 D-03: script the
  mechanical half — EEE keys joined from `RE-index.md` by path, block line, Version-History row, gate
  relocation — hand-author the Summary + owner, C17-verify each). **Reuse/guard the 116 helper
  `scripts/pipeline/retrofit-runbook.mjs` with care** — it has known defects (drops a 2nd pre-H1
  blockquote → silent content loss; non-idempotent; CRLF→LF); fork/fix a guide variant or guard before
  reuse.
- The exact ≥30-word Summary prose per guide (reformat-only: summarize existing content, per the D-03
  per-platform-template lead — do not add new technical claims).

### Authoring notes (locked upstream — do NOT reinvent)
- **Platform inference for keyless files:** apv1 (11) + apv2 (5) = 16 Windows files have **no `platform:`
  key** → the retrofit MUST inject `platform: Windows` or C17 #10 hard-fails
  (`c17-eee-contract.mjs:331-339`, absent/unmapped = FAIL, no fallback). Files that already carry
  `platform:` carry it verbatim (D1-normalized). **D1 map coverage is clean for the whole corpus** — all
  values (`all`, case variants, lowercase 802.1X) resolve; no unmapped values (unlike the runbook worry).
- **Gate relocation keys on structural position, not the string:** all 66 files carry a pre-H1 first
  blockquote ("Platform gate" / "Version gate"); relocate the **pre-H1 first blockquote** to AFTER
  `## Summary` (D3-A); never match on the literal string; never touch secondary/inline blockquotes. Then
  apply D-GC-01 splitting.
- Block field-set/order = `Platform · Doc Type · Doc ID · Status`; Platform+DocType first; `·` separator;
  `owner` NEVER in the block (Phase-114 D-01/D-05). `Status: Approved` for the 57 enrolled live guides.
  `Last Reviewed` = existing `last_verified` verbatim + the `v1.15 EEE reformat — content not
  re-reviewed` Version-History row (D2-A / SC3).
- **Registry lifecycle:** flip the 57 enrolled files' `RE-index.md` Status `Pending → Approved` as part
  of the phase; leave the 9 carved-out files `Pending`.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### The retrofit target spec (read FIRST)
- `docs/_standards/EEE-SOP-standard.md` — the authoritative D1 platform-normalization map (confirmed to
  cover `all` → "All Platforms" + every case/lowercase variant in this corpus; unmapped = hard failure,
  no fallback), the single-line header-block format + field order, Doc Type taxonomy {Runbook, Guide,
  RCA, Reference}, status set, D2 `Last Reviewed` = `last_verified` verbatim, and the Version-History row
  rule. The `owner`-never-rendered rule (line 54). The retrofit conforms to THIS.
- `docs/_templates/admin-template.md` — generic (Windows/Linux/802.1X-all) target shape: frontmatter EEE
  keys + retained old keys, block line, `## Summary`-first, the Summary prescription (line 41), the
  reviewer role. **`docs/_templates/admin-template-android.md` (line 50) / `-ios.md` (line 42) / `-macos.md`
  (line 42)** — the per-platform Summary prescriptions that govern D-03 (3A′) for those 36 files.
- `docs/_registry/RE-index.md` — `RE-076`…`RE-141` rows (admin-setup Guide class) mapping `RE-NNN → path
  + title + doc_type + status`; the authoritative `doc_id` source (join by path; NO platform column).
  The registry `Status` column tracks the retrofit lifecycle (Pending→Approved), distinct from
  frontmatter `status`.

### The enforcing gate (the phase's live merge gate)
- `scripts/validation/c17-eee-contract.mjs` — the immutable C17 validator. Assertions the retrofit must
  satisfy: **#1** no top-level `mermaid` fence (206-208, the D-05 crux — 9 files carved out); **#5**
  `## Summary` ≥30 words (262); **#8** `owner` present/non-empty, never in block (273, 287, the D-04
  basis); **#9** block↔frontmatter exact match (298-329); **#10** platform resolves in D1, no fallback
  (331-339); **#12** every top-level blockquote group ≤200 chars (387-405, the D-GC-01 crux); enrollment
  scan opt-in by EEE-key presence (519-533). Invoke per file; ship green.
- `scripts/validation/c17-fixtures/` — the `--self-test` passing/failing exemplars (do not modify).

### Phase scope + requirements + locked upstream decisions
- `.planning/ROADMAP.md` §"Phase 117" (SC1–SC4, incl. the SC4 discuss-flag resolved here as D-01);
  §"Phase 119" (the HARN-03 `check-phase-NN` chain + `CHAIN_PHASES=[48..118]` + `frozen-at-close.mjs`
  V114 SHA pin `7d922a7` that D-01 protects).
- `.planning/REQUIREMENTS.md` — RETRO-02 (L40), the 1-req-1-phase rule (L13), the reformat-only /
  no-new-content envelope (L75-76), and the v1.16 Mermaid deferral (L13) that D-05 folds into.
- `.planning/phases/116-l1-l2-runbook-retrofit-75-docs/116-CONTEXT.md` — the direct precedent: D-01
  (one-phase granularity), D-02 (tier/platform batching), D-03 (hybrid script + hand-author + C17-verify
  method), D-04 (uniform owner from template role; owner absent from block), D-05 (the #12
  word-preserving split policy this phase's D-GC-01 inherits). Also the `retrofit-runbook.mjs` helper +
  its defects.
- `.planning/phases/115-c17-harness-check-validator-atom/115-CONTEXT.md` — D-02 (C17 opt-in by key
  presence + the mandatory two-part per-phase SC: enrollment-completeness precheck THEN C17 exit 0 — the
  precheck D-05 must scope to 57), D-04 (C17 immutable during content phases).
- `.planning/phases/114-eee-standard-templates-doc-id-registry-metadata-rules/114-CONTEXT.md` — D-01
  (owner frontmatter-only, absent from block), D-05 (block field-set/order `·` separator), D-09 (D1 map).

### Empirical grounding (why the Summary/block placement matter)
- `.planning/phases/113-conversion-pipeline-lock-representative-set-grounding-valida/PIPE-02-FINDINGS.md`
  — OQ4 (frontmatter → invisible custom properties; the body-text block is retrieval-necessary) and the
  citation/recitation behavior that makes the `## Summary` lead (D-03) a load-bearing retrieval chunk.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `docs/_templates/admin-template{,-android,-ios,-macos}.md` — the born-conformant target shapes every
  retrofitted guide is reshaped toward; the per-platform templates drive the D-03 (3A′) Summary lead.
- `docs/_registry/RE-index.md` — the machine-readable `doc_id` source; the mechanical retrofit joins on
  `Path` to emit the correct `RE-NNN` per file (never hand-transcribe IDs → C17 #9 is unforgiving).
- `scripts/validation/c17-eee-contract.mjs` — the live gate; `--self-test` and per-file scan patterns;
  the #12 char-count + #1 mermaid logic to re-implement as completion measurements.
- `scripts/pipeline/retrofit-runbook.mjs` — the 116 mechanical helper; **has defects** (drops 2nd pre-H1
  blockquote → silent content loss; non-idempotent; CRLF→LF) — guard/fix before reuse (D-03 discretion).
- `scripts/pipeline/` idiom (node-builtins-only) — the shape any retrofit helper should mirror.

### Established Patterns
- **Reshape-only envelope:** carry `last_verified` verbatim, add the fixed Version-History row, never
  re-verify technical content (REQUIREMENTS.md:75-76; D2-A). D-GC-01 (#12) and D-05 (mermaid) are the
  sharp edges of this rule this phase.
- **Per-file C17 enrollment by key presence:** a guide is gated the moment it gains the four EEE keys —
  so batches are independently mergeable/gateable (underpins D-01/D-02), and the 9 carved-out files stay
  invisible to C17 by staying keyless (D-05).
- **Two-part per-phase SC (Phase-115 D-02):** enrollment-completeness precheck (every admin-setup file
  EXCEPT the 9 mermaid-deferred carries all four EEE keys) THEN C17 exits 0 on the 57 — author both as SC.
- **Multi-plan single phase:** 113/114/116 each ran multiple plans within one phase — the house pattern
  D-01 follows (this phase leans ~6 over 57 files).

### Integration Points
- **C17 is the merge gate** between authoring and the Phase-119 audit fold — every enrolled file passes
  it before phase close (SC4). C17 is immutable here.
- **Sequential-on-main execution** (project constraint `use_worktrees:false`) — plans run one at a time
  on the main tree; no parallel-worktree isolation. Batch design (D-02) accounts for this.
- **Registry lifecycle:** retrofitting a file flips its `RE-index.md` Status Pending→Approved (the 57);
  the 9 carved-out files remain Pending.

</code_context>

<specifics>
## Specific Ideas

- The load-bearing surprises this phase (both from the adversarial review, both MANDATORY at plan time):
  **(1) #12 gates ALL top-level blockquote groups and 66/66 files violate it — including 59/66 gate
  blockquotes** (D-GC-01), so gate relocation alone won't pass; resolve by word-preserving structural
  splits only. **(2) 9 overview/intro files carry mermaid fences that hard-fail C17 #1** (D-05) — carved
  out and deferred to v1.16 to keep the reformat-only envelope intact.
- The Summary lead is **per-platform-template-matched, not generic** (D-03 / 3A′): the Windows
  APv1/APv2-framework language is wrong for the 50 non-Windows files; use each file's own platform
  template Summary prescription (Android enrollment mode + MGP/Zero-Touch; iOS/macOS ADE method + ABM
  roles + supervised/version prereq; Linux/`all` generic scope minus the framework clause).
- Owner is uniform `Intune Admin Lead` for all 57 — frontmatter-only, never in the block (D-04).

</specifics>

<deferred>
## Deferred Ideas

- **The 9 mermaid-bearing admin-setup files → v1.16** (D-05): the 7 `00-overview.md` files + `apv1/01`
  + `8021x/01`. Deferred because passing C17 #1 requires converting/removing the diagram (a content edit
  out of the reformat-only envelope), and v1.16 already owns Mermaid handling. Their `RE-index.md` Status
  stays `Pending`.
- **Phase 118 (RETRO-03) — reference-doc retrofit + table remediation** — next in the 116→117→118
  retrofit order; last due to table-chunking severity; includes reference-class Guides (`RE-153/154/155`).
  NOT this phase.
- **Phase 119 — frozen-surface re-baseline + 13th Path-A lineage bump + close** — the HARN-03
  `check-phase-NN` chain + C17 audit-fold; D-01 explicitly protects its SHA pins by refusing a 117
  sub-phase split.
- **v1.16 — orphan docs + structural classes + end-user Guides** (`RE-175/176` and the broader orphan
  set) + the parked Mermaid decision — the deferral D-05 folds into.

None of the above are scope creep into Phase 117 — they are downstream/parallel and preserved here so
they are not lost.

</deferred>

---

*Phase: 117-admin-setup-guide-retrofit-all-platforms*
*Context gathered: 2026-07-05*
