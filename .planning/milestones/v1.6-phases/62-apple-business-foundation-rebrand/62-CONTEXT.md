# Phase 62: Apple Business Foundation & Rebrand - Context

**Gathered:** 2026-05-21
**Status:** Ready for planning

<domain>
## Phase Boundary

Foundation layer for v1.6 Apple Business Delegated Governance & Multi-Org Operations milestone. Phase 62 establishes the Apple Business / OU / permissions vocabulary, the role/permission model with Account Holder + Edit-without-View guardrails, the OUs concept doc, the 3 canonical rebrand callouts (`docs/cross-platform/apple-business/00-overview.md` + `docs/admin-setup-macos/01-abm-configuration.md` intro + `docs/admin-setup-ios/02-abm-token.md` intro), the L1 admin-directory lookup convention, the style-guide HTML comment block convention, and the v1.6 audit harness scaffold (`scripts/validation/v1.6-milestone-audit.mjs` Path-A copy from v1.5) where C14/C15/C16 + new sidecar category `c13_rotting_external` + `+` separator parsing + `check-phase-62.mjs` validator-as-deliverable all land in ONE atomic commit (v1.5 Plan 60-08 precedent). 11 high-severity pitfalls gate this phase before any downstream content phase ships — critical-path bottleneck for Wave A.

</domain>

<decisions>
## Implementation Decisions

All five gray areas were resolved via batched `/adversarial-review` (single Finder/Adversary/Referee pass scoring 12 options across 4 areas + 2 sub-issues). Referee scores in parentheses (lower = better).

### D-01: L1 admin-directory lookup convention format (AB-07 / DA-8)

**Decision:** Ship a dedicated `docs/cross-platform/apple-business/_admin-directory.md` template file with `<TENANT_FILL_IN>` placeholders + lookup-pattern instructions covering 4 backend types (AD/Entra group convention `apple-business-admins-{ou-slug}`; ServiceNow/Jira CMDB; Confluence/SharePoint admin page; "no formal directory yet" fallback). The file provides a stable file-level C16 anchor target that Phase 65 L1 #34 cross-links to.

**Rationale:** Referee score 1 (tied with Option (b) but wins on C16 anchor robustness). DA-8 prevention strategy (`.planning/research/PITFALLS.md`) explicitly calls for a "delegated admin contact-directory doc OR convention" — the file form provides the most stable cross-link target with the lowest PITFALL-6 anchor-stability surface. Decoupled from `02-ous-architecture.md` anchor churn.

**Considered & rejected:** (b) generic convention inside `02-ous-architecture.md` — section anchor less stable than file anchor; (c) per-OU contact-card section — tenant-specific data in upstream corpus; (d) HTML-comment in L1 #34 frontmatter — orphans AB-07 deliverable to Phase 65 (D-A10 phase build order violation; CRITICAL).

### D-02: Per-permission catalog enumeration scope (AB-03 / OP-3)

**Decision:** Ship the FULL canonical per-permission catalog (~50-80 rows) across all 7 in-scope subgroups (Basic Organization / Organization Access / API+OAuth / People / Devices / AppleCare / Apps & Books) in `01-role-permission-model.md` via 1-hour manual scrape of Apple's JS-rendered permission sub-pages. Brand-related subgroups explicitly excluded with a "see Apple official docs" pointer (rotting-external candidate logged in `c13_rotting_external` sidecar). The Edit-without-View dependency table (OP-3 prevention) lives in the same file, cross-mapping dependencies across the 7 subgroups.

**Rationale:** Referee score 2 (next-best Option (b) score 6). AB-03 word "canonical" is load-bearing — partial enumeration fails the requirement text. D-A10 phase build order ("glossary before admin guides; admin guides before L1/L2") mandates Phase 62 publishes the catalog so Phase 63 `04-custom-role-authoring.md` (OU-02 min-viable sub-org-admin bundle template) can cite it as SOT. The 1-hour scrape is already budgeted in STATE.md L127.

**Considered & rejected:** (b) partial + Apple-guide pointer — fails "canonical" + leaves OP-3 dependency-table holes (CRITICAL); (c) defer to Phase 63 — orphans AB-03 from Phase 62 traceability + inverts D-A10 build order + collapses Wave B parallelism precondition (CRITICAL).

### D-03: Audit harness C16 cross-link integrity triangle landing strategy (D-A9 / AUDIT-12)

**Decision:** C16 lands BLOCKING in the Phase 62 atomic harness commit, with a new sidecar category `c16_missing_endpoint_exemptions` carrying 4 per-file exemption entries (one per missing endpoint file: `docs/l1-runbooks/34-apple-business-shared-ipad-passcode-reset.md`, `docs/cross-platform/apple-business/12-shared-ipad-passcode-reset.md`, plus exemption notes for the un-landed cross-links inbound to existing `docs/common-issues.md` and `docs/quick-ref-l1.md`). Each exemption entry includes a `"sunset_phase": "65"` field. Phase 65 commit that creates the missing files (+ adds the inbound cross-link H2 sections to existing hub files) simultaneously removes all 4 exemptions in the same atomic commit. Phase 66 fresh-worktree terminal re-audit verifies zero remaining exemptions and all 4 triangle edges actively enforced.

**Rationale:** Referee score 1 (next-best Option (b) score 2). Only option honoring D-A9 "blocking from start" + "no informational grace period" (STATE.md L110) while matching the v1.5 allowlist file+line+reason schema precedent verified in `scripts/validation/v1.5-audit-allowlist.json`. Preserves auditor-independence at Phase 66 because the harness MUST exit 0 by Phase 65 close — exemption entries failing to be removed = harness exit non-zero = visible to terminal re-audit.

**Considered & rejected:** (a) presence-conditional edges — semantically equivalent to v1.5 informational-then-blocking pattern which D-A9 explicitly rejects (CRITICAL); (b) per-edge allowlist — mechanically similar to (d) but doesn't match v1.5 file+line schema precedent; (c) defer C16 activation — explicit D-A9 violation (CRITICAL, self-rejected).

### D-04: Glossary bidirectional reciprocity presentation (AB-01)

**Decision:** `_glossary-apple-business.md` opens with a two-column rebrand-mapping table at the top (columns: `Legacy term | New term (effective date) | Where used in v1.6 docs`) as the canonical bidirectional-reciprocity surface that the `c13_rotting_external` sidecar regex parses. Per-entry H3 headers use CLEAN slugs (`### Organizational Unit`, NOT `### Organizational Unit (formerly Location)`); rebrand attribution lives in the top table, not in H3 suffixes. First-mention parentheticals (`"Organizational Unit (OU) (formerly Location)"`) appear in v1.6 NEW docs per the v1.5 Linux first-mention convention.

**Rationale:** Referee score 1 (next-best Option (4a-iv) score 2). Mechanically parseable single source of truth + bidirectional by construction (legacy reader scans column 1, new-term reader scans column 2) + no redundancy drift. The "(formerly X)" H3 suffix in option (4a-ii) would generate GitHub-Markdown slugs like `organizational-unit-formerly-location` and break every downstream `#organizational-unit` cross-link silently (PITFALL-6 anchor-stability breach).

**Considered & rejected:** (4a-ii) per-entry H3 with "(formerly X)" suffix — slug-instability CRITICAL; (4a-iii) inline parenthetical only — fails AB-01 bidirectional requirement + no machine-checkable structure (CRITICAL); (4a-iv) combined — robust-but-redundant, no net benefit when (4a-i) already satisfies all axes.

### D-05: AB-06 "5 existing platform glossaries" count discrepancy

**Decision:** Patch the 3 planning files (`REQUIREMENTS.md` AB-06, `ROADMAP.md` Phase 62 SC#4, `STATE.md` D-A2) from "5 existing platform glossaries" to "4 existing platform glossaries" with a rationale line ("`_glossary-macos.md` covers macOS + iOS/iPadOS per its header line 9 — single Apple glossary"). The patch lands INLINE during Phase 62 execution (part of the Phase 62 commit batch, not a separate prereq commit). Phase 62 then adds 4 reciprocal banner lines (one each in `docs/_glossary.md`, `docs/_glossary-macos.md`, `docs/_glossary-android.md`, `docs/_glossary-linux.md`) + 1 inline see-also at `_glossary-macos.md` ABM entry. `_glossary-apple-business.md` becomes the 5th glossary node counting from v1.6 forward.

**Rationale:** Referee score 2 (next-best (4b-ii) score 4). Filesystem ground truth confirms exactly 4 existing glossary files. Research SUMMARY.md D-A2 line 97 ALREADY says "4 other glossaries gain 1 reciprocal banner line each" — the "5" in REQUIREMENTS.md + STATE.md is a counting error inherited from roadmap drafting. Q5(b)-compliant because planning-doc edits are not corpus edits.

**Considered & rejected:** (4b-ii) split `_glossary-macos.md` — Q5(b) corpus-sweep violation + D-A2 architectural contradiction + anchor-stability tsunami (CRITICAL); (4b-iii) include `4-platform-capability-comparison.md` in count — categorical error (not a glossary) + D-A3 immutability invariant breach (CRITICAL); (4b-iv) self-reference banner — AB-06 "existing" word excludes self-reference + semantic absurdity (CRITICAL).

### Claude's Discretion

None — every gray area was explicitly decided via referee verdict + user approval.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents (researcher, planner, executor) MUST read these before planning or implementing.**

### Project planning (LOCKED)
- `.planning/PROJECT.md` — v1.6 milestone overview, Key Decisions table, Apple Business surface scope boundaries
- `.planning/REQUIREMENTS.md` — Phase 62 reqs: **AB-01 through AB-07 + AUDIT-09 through AUDIT-13** (12 reqs total)
- `.planning/ROADMAP.md` — Phase 62 Goal + Success Criteria (5 SC items) + Wave A designation + dependency on nothing (v1.6 entry phase)
- `.planning/STATE.md` — D-A1 through D-A10 architectural decisions; Patterns carried forward into v1.6; Anti-regression invariants inherited from v1.0-v1.5

### v1.6 research (Phase 62 informs all 5 phases of v1.6)
- `.planning/research/SUMMARY.md` — Executive summary, terminology canon (especially OU vs Locations, content token model, Managed Apple Account)
- `.planning/research/STACK.md` — Apple-side surfaces (use new 2026 terminology) + Intune-side surfaces (preserve verbatim labels)
- `.planning/research/FEATURES.md` — 8-category workflow landscape, anti-features (especially Intune Reset/Remove Passcode on Shared iPad per-user partition)
- `.planning/research/ARCHITECTURE.md` — 10 D-A decisions with options taken / alternatives rejected / inherited precedent / confidence
- `.planning/research/PITFALLS.md` — 30-pitfall catalog (OP-1..15 / DA-1..9 / CI-1..6) with severity + warning signs + prevention + addressing phase. **Especially:** OP-2 (Account Holder lockout) + OP-3 (Edit-without-View dependency table) + OP-10/CI-2/CI-3 (Intune-Apple terminology lag) + DA-8 (admin-directory lookup convention)

### Apple-side primary sources (Phase 62 manual-scrape inputs)
- `https://www.apple.com/newsroom/2026/03/introducing-apple-business-a-new-all-in-one-platform-for-businesses-of-all-sizes/` — rebrand announcement; **2026-04-14 GA** is the canonical glossary callout date
- `https://support.apple.com/guide/business/` — Apple Business User Guide (legacy `/guide/apple-business-manager/` still resolves; same article IDs at both paths)
- `https://support.apple.com/guide/apple-business-manager/apple-business-manager-is-now-apple-business-axmd79d79dea/web` — Apple Support transition banner article (cite in glossary timing reference)
- `https://support.apple.com/guide/apple-business-manager/intro-to-roles-and-privileges-axm97dd59159/web` — roles & privileges overview (per-permission catalog scrape root)
- `https://support.apple.com/guide/apple-business-manager/manage-content-tokens-axme0f8659ec/web` — content tokens (per-OU semantics)
- `https://support.apple.com/guide/apple-business-manager/intro-to-federated-authentication-axmb19317543/web` — federated authentication (OP-7 60-day collision context for glossary)

### Intune-side verbatim labels (preserve, do not rename)
- `https://learn.microsoft.com/en-us/intune/app-management/deployment/manage-vpp-apple` — Apple VPP tutorial 2026-04-30 (UI label "Apple VPP tokens" UNCHANGED in Intune; v1.6 glossary annotates this)
- `https://learn.microsoft.com/en-us/intune/device-enrollment/apple/tutorial-automated-ios` — ADE tutorial
- Intune admin center surfaces: `Tenant administration > Connectors and tokens > Apple VPP tokens`; `Devices > Enrollment > Apple > Enrollment program tokens`; `Devices > Enrollment > Apple > MDM Push Certificate`

### Existing corpus — read-only outbound link targets (NO modification except 3 sanctioned canonical sites + 4 banner lines + 1 inline see-also)
- `docs/_glossary.md` — Windows glossary (gains 1 reciprocal banner line at top)
- `docs/_glossary-macos.md` — macOS+iOS/iPadOS Apple glossary (gains 1 reciprocal banner line at top + 1 inline see-also at ABM entry line ~62)
- `docs/_glossary-android.md` — Android glossary (gains 1 reciprocal banner line at top)
- `docs/_glossary-linux.md` — Linux glossary (gains 1 reciprocal banner line at top)
- `docs/admin-setup-macos/01-abm-configuration.md` — receives canonical rebrand callout #2 (intro section); MUST contain tokens "Apple Business Manager", "Apple Business", "2026-04-14" for C14 PASS
- `docs/admin-setup-ios/02-abm-token.md` — receives canonical rebrand callout #3 (intro section); MUST contain same 3 tokens for C14 PASS
- `docs/reference/ios-capability-matrix.md` — Phase 63 modifies (Phase 62 read-only context)
- `docs/reference/macos-capability-matrix.md` — UNCHANGED in v1.6 (D-A3 invariant)
- `docs/reference/4-platform-capability-comparison.md` — UNCHANGED in v1.6 (D-A3 + C12 240-cell math invariant + OU-10)

### Audit harness — Path-A copy source + sidecar precedent
- `scripts/validation/v1.5-milestone-audit.mjs` — Path-A copy source for `v1.6-milestone-audit.mjs`; preserve C1-C13 verbatim; layer C14/C15/C16 + `+` separator parsing
- `scripts/validation/v1.5-audit-allowlist.json` — sidecar schema precedent (file + line + reason; carry-over annotation conventions); `c16_missing_endpoint_exemptions` new category mirrors this schema
- `scripts/validation/regenerate-supervision-pins.mjs` — `--self-test` mode pattern (BASELINE_9 lives here; BASELINE_10 refresh is Phase 66 work, not Phase 62)
- `scripts/validation/check-phase-60.mjs` (or any check-phase-NN.mjs) — validator-as-deliverable pattern for `check-phase-62.mjs`
- `.github/workflows/audit-harness-v1.5-integrity.yml` (if exists) — CI workflow Path-A copy source for `audit-harness-v1.6-integrity.yml` (lands at Phase 66 per AUDIT-13, not Phase 62)

### Phase precedent references
- v1.5 Plan 60-08 — atomic-harness-commit precedent (C14/C15/C16 + sidecar + new category + check-phase-62.mjs land in ONE commit)
- v1.5 Phase 57+59 — navigation-files-last precedent (Phase 65 will follow this; Phase 62 establishes nothing nav-related yet)
- v1.5 D-22 + Phase 61 Plan 61-04 — auditor-independence via fresh worktree (Phase 66 work; Phase 62 only ensures the harness CAN exit 0 from fresh worktree)

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets

- **v1.5 harness `scripts/validation/v1.5-milestone-audit.mjs`** — Path-A copy template; the entire C1-C13 check structure transfers verbatim. C12 240-cell math validator must remain functional against the unchanged `4-platform-capability-comparison.md`.
- **v1.5 sidecar `scripts/validation/v1.5-audit-allowlist.json`** — schema precedent for ~250-line JSON with categories `safetynet_exemptions`, `supervision_exemptions`, `cope_banned_phrases`, `c7_knox_allowlist` etc. The shape (`[{ file, line, reason }, ...]`) is the canonical exemption-entry shape; `c16_missing_endpoint_exemptions` follows the same shape with added `sunset_phase` field.
- **v1.5 chain validators `check-phase-48.mjs..check-phase-61.mjs`** — validator-as-deliverable lineage; `check-phase-62.mjs` extends the chain (Path-A copy of `check-phase-61.mjs` with phase-specific assertions: 1 glossary + 4 banner lines + 1 inline see-also + 3 callout sites + harness file + sidecar file + new sidecar category + check-phase-62.mjs itself + 4 new content docs in `cross-platform/apple-business/`).
- **v1.5 `regenerate-supervision-pins.mjs`** — `--self-test` mode demonstrates the BASELINE refresh pattern; BASELINE_10 refresh is Phase 66 work (AUDIT-14) but the helper's existence is part of the Path-A copy.
- **`docs/_glossary-macos.md`** existing header pattern (line 9-10 "Platform coverage:" blockquote) — template for the reciprocal banner line format added to all 4 existing glossaries.
- **`docs/operations/` tree** (v1.5 precedent) — directory structure template for `docs/cross-platform/apple-business/` per D-A1.

### Established Patterns

- **Per-platform glossary file (`_glossary-{platform}.md`)** — `_glossary-apple-business.md` is the 6th glossary node (split architecture per D-A2 + count-correction patch D-05).
- **Audit harness file-versioning lineage** — `v1.5-milestone-audit.mjs` → `v1.6-milestone-audit.mjs` (Path A copy + additive C14/C15/C16; preserves predecessor reproducibility).
- **Sidecar co-located with harness** — `scripts/validation/v1.6-audit-allowlist.json`.
- **60-day `last_verified` rule** — applies to all Apple Business docs.
- **45-day rule** — applies ONLY to `4-platform-capability-comparison.md` (v1.5 Phase 58 D-19); that file remains UNCHANGED in v1.6.
- **Atomic-harness-commit (v1.5 Plan 60-08)** — Phase 62 harness landing inherits this contract: `v1.6-milestone-audit.mjs` + `v1.6-audit-allowlist.json` + new `c13_rotting_external` sidecar category + new `c16_missing_endpoint_exemptions` sidecar category + `check-phase-62.mjs` + `+` separator parsing all land in ONE commit, harness exits 0 immediately.
- **PITFALL-6 pre-edit anchor inventory mandatory** — Phase 62 must capture inventory of `_glossary-macos.md` anchor table (line 16 alphabetical index + every H3 anchor) BEFORE touching it for the reciprocal banner line + inline see-also.
- **Append-only contract on hub files** — Phase 62 modifies ONLY the 4 banner lines (top of each existing glossary) + 1 inline see-also at `_glossary-macos.md` ABM entry + 2 intro callouts at the macOS/iOS ABM docs. No hub-nav files touched in Phase 62 (Phase 65 work).
- **Wave A sequential** — Phase 62 has no parallel siblings; Wave B (Phase 63 + first half of Phase 64) opens only after Phase 62 close + Phase 63 anchors land.
- **`+` separator parsing for compound-platform frontmatter** — `platform: ios+macos[+shared-ipad|+apple-tv]` format introduced in Phase 62 harness for downstream L1 #34 (Phase 65) per D-A5.

### Integration Points

- **Where Phase 62 connects to Phase 63:** Phase 63's `04-custom-role-authoring.md` cites Phase 62's `01-role-permission-model.md` per-permission catalog as SOT; Phase 63's `05-sub-org-admin-onboarding.md#which-admin-owns-this-pool` anchor cross-links to Phase 62's `_admin-directory.md`.
- **Where Phase 62 connects to Phase 64:** Phase 64's `15-mdm-server-reassign-runbook.md` references Phase 62's `02-ous-architecture.md` OU scoping + content-token-per-OU semantics; Phase 64's `18-cross-org-boundary-cheat-sheet.md` cites the Phase 62 glossary for terminology canon + harbors C15 anti-pattern allowlist exemptions in HTML comments (audit-harness convention established in Phase 62).
- **Where Phase 62 connects to Phase 65:** Phase 65's L1 #34 cross-links to Phase 62's `_admin-directory.md` (C16 4-edge triangle gate); compound frontmatter `platform: ios+macos+shared-ipad` parses through Phase 62's `+` separator implementation in the harness.
- **Where Phase 62 connects to Phase 66:** Phase 66's terminal re-audit runs Phase 62's `v1.6-milestone-audit.mjs` from a fresh worktree; BASELINE_10 refresh (Phase 66) updates Phase 62's harness baseline state; the `c16_missing_endpoint_exemptions` array MUST be empty by Phase 66 close.

</code_context>

<specifics>
## Specific Ideas

- **`_glossary-apple-business.md` top section structure:** rebrand-mapping table at line 12-25 area; followed by Alphabetical Index (mirroring `_glossary-macos.md` line 16 pattern); followed by per-term H3 entries grouped under H2 categories (e.g., `## Organizational Units`, `## Roles & Permissions`, `## Content Distribution`, `## Federated Identity`).
- **Reciprocal banner line text** (added to top of each of 4 existing glossaries): `> **Apple Business governance:** For Apple Business delegated permission terminology (Organizational Units, custom roles, Managed Apple Account, content tokens), see the [Apple Business Governance Glossary](_glossary-apple-business.md).`
- **`_glossary-macos.md` inline see-also at ABM entry** (line ~62, after the existing `> See also:` line): add `> See also: [Apple Business](_glossary-apple-business.md#abm) (renamed 2026-04-14; ABM Token → content token rebrand mapping).`
- **C14 rebrand-statement token check:** harness regex looks for ALL THREE tokens ("Apple Business Manager", "Apple Business", "2026-04-14") within the first 50 lines of EACH of the 3 canonical sites. Failure = non-zero exit.
- **C15 banned-phrase list seed** (refined at Phase 66 AUDIT-14):
  - `\b(Intune|MDM)-?side\b.{0,40}\b(delegate|delegation|RBAC|role)\b`
  - `\bdelegated\s+admin.{0,30}\bIntune\b`
  - (~6 more seed regexes; full 8-regex list finalized at Phase 66)
- **C16 4-edge triangle endpoints** (sunset at Phase 65):
  1. `docs/l1-runbooks/34-apple-business-shared-ipad-passcode-reset.md` ↔ `docs/cross-platform/apple-business/12-shared-ipad-passcode-reset.md`
  2. `docs/cross-platform/apple-business/12-shared-ipad-passcode-reset.md` ↔ `docs/common-issues.md#apple-business-governance-failure-scenarios` (inbound H2 added in Phase 65)
  3. `docs/common-issues.md` ↔ `docs/quick-ref-l1.md#apple-business-quick-reference` (inbound H2 added in Phase 65)
  4. `docs/quick-ref-l1.md` ↔ `docs/l1-runbooks/34-apple-business-shared-ipad-passcode-reset.md` (closes the triangle)
- **`c16_missing_endpoint_exemptions` schema** (added to sidecar):
  ```json
  "c16_missing_endpoint_exemptions": [
    {"file": "docs/l1-runbooks/34-apple-business-shared-ipad-passcode-reset.md", "reason": "Phase 65 deliverable per ABNAV-01; lands with all 4 edges per C16 triangle contract", "sunset_phase": "65"},
    {"file": "docs/cross-platform/apple-business/12-shared-ipad-passcode-reset.md", "reason": "Phase 64 deliverable per DELEG-02; admin-context canonical doc for L1 #34 cross-link", "sunset_phase": "64-65"},
    {"file": "docs/common-issues.md#apple-business-governance-failure-scenarios", "reason": "Phase 65 deliverable per ABNAV-03; inbound H2 section append-only", "sunset_phase": "65"},
    {"file": "docs/quick-ref-l1.md#apple-business-quick-reference", "reason": "Phase 65 deliverable per ABNAV-04; inbound H2 section append-only", "sunset_phase": "65"}
  ]
  ```
- **`_admin-directory.md` template skeleton:**
  ```markdown
  ---
  last_verified: 2026-05-21
  review_by: 2026-07-20
  applies_to: apple-business
  audience: l1
  platform: ios+macos
  ---

  # Apple Business OU Admin Directory (Lookup Convention)

  > **Tenant-fillable.** This is a CONVENTION + TEMPLATE. Each tenant populates with their own admin holders + delegation contacts. Default upstream copy contains `<TENANT_FILL_IN>` placeholders ONLY.

  ## Lookup Pattern

  L1 staff looking up "which admin owns this device pool" SHOULD resolve via one of these backends (in tenant preference order):

  1. **AD/Entra group convention:** `apple-business-admins-{ou-slug}` security group; members are the Account Holders / IT Administrators delegated to that OU.
  2. **ServiceNow / Jira CMDB:** Custom CMDB attribute `apple_business_ou_admin` on the OU CI record.
  3. **Confluence / SharePoint:** Tenant-maintained admin contact page (link below).
  4. **No formal directory:** Email `apple-business-admins@<your-tenant>.tld` mailing list as fallback.

  ## Per-OU Admin Holder Lookup

  | OU | Account Holder (Managed Apple Account) | Delegation Contact | Backend |
  |---|---|---|---|
  | <TENANT_FILL_IN> | <TENANT_FILL_IN> | <TENANT_FILL_IN> | <TENANT_FILL_IN> |

  ## Tenant Population Instructions

  ...
  ```
- **Style-guide HTML comment block convention** (Phase 62 deliverable per dossier line 17): adopt the v1.4.1 `<!-- AEAUDIT-04 ... -->` precedent — `<!-- ABAUDIT-{##}: {one-sentence intent} -->` form for the v1.6 anti-pattern allowlist exemptions that will land in Phase 64's `18-cross-org-boundary-cheat-sheet.md`. Phase 62 publishes the convention definition (1 section in `00-overview.md` or a dedicated `_style-guide.md`) but no actual exemption blocks (those come in Phase 64).
- **D-05 planning-file patch tasks during Phase 62 execution:**
  1. Patch `.planning/REQUIREMENTS.md` AB-06 from "5 existing platform glossaries" to "4 existing platform glossaries" + add inline footnote "`_glossary-macos.md` covers macOS + iOS/iPadOS per its line-9 header".
  2. Patch `.planning/ROADMAP.md` Phase 62 SC#4 same way.
  3. Patch `.planning/STATE.md` D-A2 from "5 existing glossaries" to "4 existing glossaries" + matching footnote.
  4. Same commit batch as the rest of Phase 62 deliverables (planning-file edits are NOT corpus edits per Q5(b)).
- **Phase 62 plan-count estimate** (for downstream planner): likely 6-8 plans:
  1. Planning-file count-correction patch + research-flagged manual scrape preparation (Apple permission sub-pages scrape) (Plan 62-01)
  2. `_glossary-apple-business.md` authoring with rebrand-mapping table (Plan 62-02)
  3. `00-overview.md` (cross-platform/apple-business/) + canonical rebrand callout #1 + style-guide section (Plan 62-03)
  4. `01-role-permission-model.md` full 7-subgroup permission catalog + Edit-without-View dependency table + Account Holder DO NOT delegate callout (Plan 62-04)
  5. `02-ous-architecture.md` OU hierarchy + scoping table (Plan 62-05)
  6. `_admin-directory.md` template (Plan 62-06)
  7. 2 intro callouts (macOS + iOS ABM docs) + 4 reciprocal banner lines + 1 inline see-also (Plan 62-07)
  8. Atomic harness commit: `v1.6-milestone-audit.mjs` Path-A copy + sidecar + new categories + check-phase-62.mjs + `+` separator parsing (Plan 62-08)

</specifics>

<deferred>
## Deferred Ideas

- **Apple Business Device API public surface deep-dive** — Apple has not yet published `developer.apple.com` landing for the Device API Manager preset role. Phase 62 `01-role-permission-model.md` carries an "acknowledge-but-do-not-document-deeply" 1-paragraph mention. Full coverage deferred to v1.7+.
- **OU sub-OU nesting depth** — Apple new docs describe primarily flat; legacy ABM supported one level. Phase 63 portal verification.
- **Audit log retention SLA exact period** — Apple does not publish; community reports 90-365 days. Phase 64's `17-audit-log-scoping-runbook.md` documents the hedge "Apple does not publish — configure periodic SIEM export for compliance >1 year"; Phase 62 glossary entry for "Audit Log" carries the same hedge.
- **Cross-OU audit visibility 3×3 matrix** — definitive single-source matrix not yet documented by Apple. Phase 64 `17-...md` deliverable.
- **Apple TV Conference Room Display mode delegation specifics** — Apple deployment guides thin on per-OU partitioning for shared physical spaces. Phase 63 `10-apple-tv-lifecycle.md` deliverable.
- **CI-1 / CI-2 / CI-3 rotting-reference corpus sweep** — Apple Business Manager rotting URL references (~30 sites) + VPP location token rotting (2 specific lines) + Managed Apple ID corpus-wide rotting — all deferred to v1.7+ per Q5(b) no-corpus-sweep contract; `c13_rotting_external` sidecar quarterly audit category landed at Phase 62 tracks them.
- **CI workflow `audit-harness-v1.6-integrity.yml`** — Path-A copy from v1.5; lands at Phase 66 per AUDIT-13, not Phase 62.
- **BASELINE_10 refresh** — Phase 66 work per AUDIT-14; closes BASELINE_9 v1.5 carry-over.

### Reviewed Todos (not folded)
None — no .planning/todos/ entries matched Phase 62 scope during cross-reference.

</deferred>

---

*Phase: 62-Apple-Business-Foundation-Rebrand*
*Context gathered: 2026-05-21*
