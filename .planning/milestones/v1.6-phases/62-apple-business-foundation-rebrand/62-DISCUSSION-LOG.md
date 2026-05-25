# Phase 62: Apple Business Foundation & Rebrand - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in `62-CONTEXT.md` — this log preserves the alternatives considered.

**Date:** 2026-05-21
**Phase:** 62 - Apple Business Foundation & Rebrand
**Areas discussed:** L1 admin-directory lookup convention format (AB-07); Per-permission catalog enumeration scope (AB-03); Audit harness C16 landing strategy (D-A9); Glossary bidirectional reciprocity presentation (AB-01); AB-06 "5 existing glossaries" count discrepancy
**Mode:** discuss-phase with `--chain` + batched `/adversarial-review` (single Finder/Adversary/Referee pass scoring 12 options + 2 sub-issues)

---

## L1 Admin-Directory Lookup Convention Format (AB-07)

| Option | Description | Selected |
|--------|-------------|----------|
| (a) Dedicated `_admin-directory.md` template file with `<TENANT_FILL_IN>` placeholders | Stable file-level C16 anchor target; tenant-adaptable for AD/Entra/CMDB/Confluence/SharePoint/none; decoupled from OU-doc anchor churn | ✓ |
| (b) Generic convention pointing to tenant identity system (no new file) | Sub-section in `02-ous-architecture.md` explaining lookup pattern; suggests `apple-business-admins-{ou-slug}` naming convention | |
| (c) Per-OU contact-card section inside `02-ous-architecture.md` | H2 sub-section "Per-OU Admin Ownership" listing schema (OU name, Admin Holder, escalation contact); tenants extend in their fork | |
| (d) HTML-comment convention block in L1 #34 frontmatter | No Phase 62 file at all; convention text lives in PROJECT.md / STATE.md prose | |

**Adversarial review scores (lower = better):** (a)=1, (b)=1, (c)=3, (d)=8

**User's choice:** (a) — Dedicated `_admin-directory.md` template file
**Notes:** Ties with (b) on raw score but wins on C16 anchor robustness — file-level anchor is more stable than section-level. (d) is structurally incompatible with D-A10 phase build order (orphans AB-07 to Phase 65). Referee sustained Adversary's downgrade of (b)'s "anchor instability" from CRITICAL to LOW.

---

## Per-Permission Catalog Enumeration Scope (AB-03)

| Option | Description | Selected |
|--------|-------------|----------|
| (a) Full enumeration of all 7 in-scope subgroups via 1-hour manual scrape | ~50-80 rows covering Basic Org / Org Access / API+OAuth / People / Devices / AppleCare / Apps & Books; Brand-related explicitly excluded with pointer | ✓ |
| (b) Partial enumeration + Apple-guide pointer + selected examples | 3 subgroups (Devices, Apps & Books, People) in full; others as one-paragraph + 2-3 example rows | |
| (c) Defer full enum to Phase 63 custom-role authoring | Phase 62 publishes only Edit-without-View skeleton + Account Holder lockout callout + 4-role-+-5-preset overview | |

**Adversarial review scores:** (a)=2, (b)=6, (c)=12

**User's choice:** (a) — Full enumeration of 7 in-scope subgroups
**Notes:** AB-03 word "canonical" is load-bearing per REQUIREMENTS.md L14. D-A10 phase build order ("glossary before admin guides") mandates Phase 62 publishes the catalog so Phase 63 OU-02 custom-role authoring can cite it as SOT. Referee overruled Adversary's disprove of (c)'s "critical-path inversion" — sustained Finder's CRITICAL rating because AB-03 IS the gate for Phase 63's custom-role authoring + Wave B parallelism precondition.

---

## Audit Harness C16 Cross-Link Integrity Triangle Landing Strategy (D-A9)

| Option | Description | Selected |
|--------|-------------|----------|
| (a) Presence-conditional edges | "If both endpoints exist, edge must be bidirectional"; missing files don't trigger failure | |
| (b) Allowlist entries for missing-file edges (per-edge framing), removed in Phase 65 | New sidecar category `c16_missing_endpoint_exemptions` with 4 entries; Phase 65 removes them | |
| (c) Defer C16 activation to Phase 65 | Violates D-A9 "blocking from start" mandate (self-rejected) | |
| (d) Edge presence by default with per-missing-file allowlist exemption | Same sidecar mechanism as (b) but per-file framing matches v1.5 allowlist file+line schema precedent | ✓ |

**Adversarial review scores:** (a)=10, (b)=2, (c)=4, (d)=1

**User's choice:** (d) — Per-missing-file allowlist exemption (4 entries with `sunset_phase` field)
**Notes:** Referee overruled Adversary's two high-risk disproves on option (a): presence-conditional IS semantically equivalent to informational-grace-period (which D-A9 explicitly rejects per STATE.md L110), and Phase 66 auditor-independence can't prove blocking-from-start if checks silently no-op during Phases 62-64. Option (d) is the only choice honoring D-A9 while matching v1.5 allowlist schema precedent (verified in `scripts/validation/v1.5-audit-allowlist.json`).

---

## Glossary Bidirectional Reciprocity Presentation (AB-01) — Sub-issue 4a

| Option | Description | Selected |
|--------|-------------|----------|
| (4a-i) Two-column rebrand-mapping table at top of glossary | `Legacy term \| New term (effective date) \| Where used in v1.6 docs`; single SOT for `c13_rotting_external` sidecar | ✓ |
| (4a-ii) Per-entry H3 header convention `### Organizational Unit (formerly Location)` | Discoverable inline; harder to parse mechanically; "(formerly X)" suffix creates anchor-slug instability | |
| (4a-iii) Inline parenthetical first-mention convention only | Minimal; unidirectional new→old; no machine-checkable structure | |
| (4a-iv) Combined: mapping table at top + per-entry header convention | Robust-but-redundant; double SOT with drift risk | |

**Adversarial review scores:** (4a-i)=1, (4a-iv)=2, (4a-ii)=4, (4a-iii)=6

**User's choice:** (4a-i) — Two-column rebrand-mapping table at top
**Notes:** Mechanically parseable single SOT + bidirectional by construction + no redundancy drift. (4a-ii)'s "(formerly X)" suffix generates GitHub-Markdown slugs like `organizational-unit-formerly-location` and breaks every downstream `#organizational-unit` cross-link silently (PITFALL-6 breach). Referee partially sustained Adversary's flag that Finder conflated AB-06 (cross-glossary banner reciprocity) with AB-01 (within-glossary terminology reciprocity) on option (4a-iii) — but underlying AB-01 bidirectionality failure remains.

---

## AB-06 "5 Existing Platform Glossaries" Count Discrepancy — Sub-issue 4b

| Option | Description | Selected |
|--------|-------------|----------|
| (4b-i) Count-correction to "4 existing glossaries" | Patch REQUIREMENTS.md AB-06 + ROADMAP.md SC#4 + STATE.md D-A2 with rationale line | ✓ |
| (4b-ii) Split `_glossary-macos.md` into `_glossary-ios.md` + `_glossary-macos.md` | Q5(b) corpus-sweep violation; cascades through ~30 iOS doc references | |
| (4b-iii) Alternative count interpretation (4 + capability-comparison reference) | Categorical error (matrix ≠ glossary); D-A3 immutability invariant breach | |
| (4b-iv) Self-reference banner on `_glossary-apple-business.md` | AB-06 "existing" excludes self-reference; semantic absurdity | |

**Adversarial review scores:** (4b-i)=2, (4b-ii)=4, (4b-iv)=6, (4b-iii)=8

**User's choice:** (4b-i) — Patch 3 planning files from "5" to "4 existing glossaries"
**Notes:** Filesystem confirms exactly 4 glossary files on disk. Research SUMMARY.md D-A2 line 97 ALREADY says "4 other glossaries gain 1 reciprocal banner line each" — the "5" in REQUIREMENTS.md AB-06 + STATE.md D-A2 is a counting error inherited from roadmap drafting (likely assumed `_glossary-ios.md` would exist as a separate file). Patch lands INLINE during Phase 62 execution per user preference (atomic with the Phase 62 commit batch, not a separate prereq).

---

## Claude's Discretion

None — every gray area was decided by adversarial-review referee verdict + explicit user approval.

## Deferred Ideas

Captured in `62-CONTEXT.md` `<deferred>` section. Highlights:
- Apple Business Device API public surface deep-dive — v1.7+
- OU sub-OU nesting depth verification — Phase 63
- Audit log retention SLA exact period — Phase 64 / hedge in Phase 62 glossary
- Cross-OU audit visibility 3×3 matrix — Phase 64
- Apple TV Conference Room Display mode delegation specifics — Phase 63
- CI-1 / CI-2 / CI-3 rotting-reference corpus sweep — v1.7+ via `c13_rotting_external` quarterly audit
- CI workflow + BASELINE_10 refresh — Phase 66

---

## Adversarial Review Methodology

Single batched `/adversarial-review` invocation scored 12 options + 2 sub-issues across 4 areas:
- **Finder** (Opus): 22 CRITICAL + 42 MEDIUM + 28 LOW flaws identified across all options (total 464 points)
- **Adversary** (Opus): disproved 14 flaws (+83 self-assessed); flagged 5 high-risk disproves
- **Referee** (Opus): sustained 3 Adversary disproves + overturned 3 (the 3 high-risk ones); produced ranked verdict per area with locked-in recommendation paragraphs

Referee rulings used ground-truth anchors:
- STATE.md L110 — D-A9 explicit rejection of informational ladder
- REQUIREMENTS.md L14 — "canonical" word load-bearing in AB-03
- `scripts/validation/v1.5-audit-allowlist.json` — file+line schema precedent for C16 sidecar
- Filesystem `ls docs/_glossary*.md` — 4 files, not 5
- SUMMARY.md L97 — D-A2 already says "4 other glossaries"

User memory feedback "Adversarial-review for gray areas — User invokes /adversarial-review for gray-area picks during /gsd-discuss-phase" applied — this is the established pattern.
