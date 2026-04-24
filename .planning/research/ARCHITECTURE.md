# ARCHITECTURE.md — v1.4.1 Android Enterprise Completion & v1.4 Cleanup

**Research mode:** Project Research — Architecture integration
**Researched:** 2026-04-24
**Confidence:** HIGH (all findings verified against on-disk v1.4 artifacts)
**Research type:** Documentation information-architecture integration (not code architecture)

---

## Executive Summary

v1.4.1 adds **three new content blocks** (Knox Mobile Enrollment, per-OEM AOSP expansion, COPE full admin path) plus **three in-place hardening edits** (audit allow-list expansion, 60-day freshness normalization, AOSP stub re-validation) to the v1.4 Android documentation architecture. The existing information architecture is **preserved intact**. v1.4.1 is additive + pin-synchronizing, never refactoring.

**Six architectural seams exist on disk as forward-link anchors waiting to be satisfied:**

1. `docs/admin-setup-android/02-zero-touch-portal.md:16` — KME/ZT mutual-exclusion callout with `<a id="kme-zt-mutual-exclusion">` anchor
2. `docs/reference/android-capability-matrix.md:113-127` — three `<a id="deferred-*">` anchors
3. `docs/admin-setup-android/06-aosp-stub.md:99-112` — `<a id="deferred-content">` table (7 rows)
4. `docs/admin-setup-android/03-fully-managed-cobo.md:58-66` — COPE Migration Note
5. `docs/decision-trees/08-android-triage.md:37,76` — AOSP escalation stub (ANDE1)
6. `docs/l1-runbooks/00-index.md:77` — "AOSP L1 coverage planned for v1.4.1" note

Each v1.4.1 new-content phase lands into one of these pre-placed anchors and retrofits the pointing file's deferral language into a live forward link.

---

## File-Tree Diff

### NEW files (v1.4.1 creates)

```
docs/admin-setup-android/
  07-knox-mobile-enrollment.md          # DEFER-04 Samsung KME admin (4th portal overlay)
  08-cope-full-admin.md                 # DEFER-06 COPE full admin guide
  09-aosp-realwear.md                   # DEFER-05 per-OEM AOSP
  10-aosp-zebra.md                      # DEFER-05
  11-aosp-pico.md                       # DEFER-05
  12-aosp-htc-vive-focus.md             # DEFER-05
  13-aosp-meta-quest.md                 # DEFER-05 (special-case 4-portal)

docs/reference/
  aosp-oem-matrix.md                    # DEFER-05 OEM × capability matrix

docs/l1-runbooks/
  28-android-knox-enrollment-failed.md  # DEFER-04 KME L1 runbook
  29-android-aosp-enrollment-failed.md  # DEFER-05 AOSP L1 runbook (replaces ANDE1)

docs/l2-runbooks/
  22-android-knox-investigation.md      # DEFER-04 KME L2
  23-android-aosp-investigation.md      # DEFER-05 AOSP L2

scripts/validation/
  v1.4-audit-allowlist.json             # MOVED from archived .planning/phases/42-*/ to persistent path
  regenerate-supervision-pins.mjs       # Helper — auto-regenerate sidecar after line-shifts
```

### MODIFIED files (v1.4.1 edits in-place)

```
docs/admin-setup-android/
  00-overview.md                        # 5-branch → 6-branch Mermaid; AOSP per-OEM leaves
  02-zero-touch-portal.md               # Fill KME/ZT mutual-exclusion anchor → 07-*
  03-fully-managed-cobo.md              # COPE Migration Note: "deferred to v1.4.1" → link to 08-*
  06-aosp-stub.md                       # DEFER-03 content-migration approach (move RealWear deep content to 09-*); preserve PITFALL-7

docs/reference/
  android-capability-matrix.md          # Fill 3 deferred-anchors with live rows / links

docs/_glossary-android.md               # Add Knox / KME / AMAPI / WPCO entries
docs/_templates/admin-template-android.md # DEFER-02: harness scope-exempt OR normalize frontmatter

docs/android-lifecycle/
  00-enrollment-overview.md             # Add KME as 6th mode bullet; per-OEM AOSP split note
  02-provisioning-methods.md            # Expand #knox-mobile-enrollment anchor to live row

docs/decision-trees/
  08-android-triage.md                  # Replace ANDE1 stub with ANDR29 resolved; add Knox sub-branch

docs/l1-runbooks/00-index.md            # Append rows 28-29; remove "planned for v1.4.1" note
docs/l2-runbooks/00-index.md            # Append rows 22-23

docs/l2-runbooks/18-android-log-collection.md           # DEFER-02: review_by 2026-07-22 → 2026-06-22
docs/l2-runbooks/19-android-enrollment-investigation.md # DEFER-02
docs/l2-runbooks/20-android-app-install-investigation.md # DEFER-02
docs/l2-runbooks/21-android-compliance-investigation.md # DEFER-02

scripts/validation/v1.4-milestone-audit.mjs             # DEFER-01: update sidecar path pointer line 57

.planning/PROJECT.md                    # Active → Validated table moves
.planning/STATE.md                      # Carry forward audit re-run result
.planning/milestones/v1.4-MILESTONE-AUDIT.md            # Append re_audit_resolution: block flipping tech_debt→passed
```

---

## Integration-Point Table (new-file → existing-anchor)

| New File | Forward-links TO (existing anchor) | Back-linked FROM (to retrofit) |
|---|---|---|
| `07-knox-mobile-enrollment.md` | `02-zero-touch-portal.md#kme-zt-mutual-exclusion` | `02-zero-touch-portal.md:16` |
| `07-knox-mobile-enrollment.md` | `01-managed-google-play.md` (prereq) | `00-overview.md` Mermaid |
| `07-knox-mobile-enrollment.md` | `android-capability-matrix.md#deferred-knox-mobile-enrollment-row` | `android-capability-matrix.md:113-119` |
| `08-cope-full-admin.md` | `03-fully-managed-cobo.md#cope-migration-note` | `03-fully-managed-cobo.md:58-66` |
| `09-13-aosp-*.md` | `06-aosp-stub.md#realwear-confirmed-ga`, `#other-aosp-supported-oems` | `06-aosp-stub.md` |
| `aosp-oem-matrix.md` | `android-capability-matrix.md#deferred-full-aosp-capability-mapping` | `android-capability-matrix.md:121-127` |
| `28-android-knox-enrollment-failed.md` | `08-android-triage.md` Knox sub-branch | `08-android-triage.md` Mermaid |
| `29-android-aosp-enrollment-failed.md` | `08-android-triage.md` ANDE1 (replace) | `08-android-triage.md:37,76` |
| `22-android-knox-investigation.md` | `28-android-knox-enrollment-failed.md` | `l2-runbooks/00-index.md` |
| `23-android-aosp-investigation.md` | `29-android-aosp-enrollment-failed.md`, 09-13 | `l2-runbooks/00-index.md` |

---

## Audit Harness Extension Design

### Current 5 checks (`scripts/validation/v1.4-milestone-audit.mjs`)

| ID | Check | Scope | Behavior |
|----|-------|-------|----------|
| C1 | SafetyNet semantic-zero | Android paths | Fail un-exempted match |
| C2 | Supervision semantic-zero | Android paths | Fail un-exempted match |
| C3 | AOSP stub word count | `06-aosp-stub.md` | INFORMATIONAL (D-29) |
| C4 | Deferred-file Android-link guard | common-issues, quick-refs | Fail if Android link |
| C5 | last_verified frontmatter freshness | Android paths | Fail if review_by − last_verified > 60 days |

### Sidecar location blocker (MUST resolve in Phase 43)

Harness line 57 hardcodes `.planning/phases/42-integration-milestone-audit/v1.4-audit-allowlist.json`. That directory was archived. **Without repair, no audit can run end-to-end.**

**Recommendation:** Move to `scripts/validation/v1.4-audit-allowlist.json` (co-located with harness). Update harness line 57.

### DEFER-01 allow-list — sidecar-only (no new C-check)

27 un-exempted C2 findings are legitimate iOS-attributed supervision references. Add `supervision_exemptions[]` entries for `docs/_glossary-android.md:15, :45, :63` and `docs/reference/android-capability-matrix.md:74, :76, :77, :79, :83, :84` (plus full enumeration at plan time).

**For v1.4.1 new content:** Line numbers shift — sidecar must be regenerated, not patched. Create `regenerate-supervision-pins.mjs` that scans Android paths, auto-identifies iOS-attributed contexts via regex proximity, emits sidecar.

### DEFER-02 — C5 freshness normalization

**Path A (recommended):** Add `docs/_templates/` to harness exclusion; re-date L2 runbooks 18-21 review_by from 2026-07-22 → 2026-06-22.

### DEFER-03 — AOSP stub envelope

**Recommended (content-migration):** Let DEFER-05 per-OEM expansion naturally absorb content from stub. Move RealWear deep content to `09-aosp-realwear.md`. Stub becomes thin routing/PITFALL-7 doc at 600-900 words. Naturally flips C3 to passing without envelope change.

---

## Proposed Phase DAG

```
                    ┌──────────────────────────────────────┐
                    │ Phase 43: v1.4 Cleanup & Harness Fix │
                    │ (DEFER-01/02/03 + sidecar path)      │
                    └──────────┬───────────────────────────┘
                               │
           ┌───────────────────┼────────────────────────┐
           │                   │                        │
           ▼                   ▼                        ▼
┌────────────────────┐ ┌─────────────────────┐ ┌──────────────────────┐
│ Phase 44: Knox ME  │ │ Phase 45: AOSP      │ │ Phase 46: COPE       │
│ (DEFER-04)         │ │ Per-OEM (DEFER-05)  │ │ Full Admin (DEFER-06)│
│                    │ │                     │ │                      │
│ 07-knox-mobile-*   │ │ 09 RealWear         │ │ 08-cope-full-admin.md│
│ 28-android-knox-*  │ │ 10 Zebra            │ │ + capability row     │
│ 22-android-knox-*  │ │ 11 Pico             │ │ + COBO note retrofit │
│ + capability row   │ │ 12 HTC Vive         │ │                      │
│ + Mermaid branch   │ │ 13 Meta (4-portal)  │ │                      │
│ + ZT doc retrofit  │ │ + aosp-oem-matrix   │ │                      │
│ + KME L1/L2        │ │ + 29 L1 + 23 L2     │ │                      │
│                    │ │ + ANDE1 → ANDR29    │ │                      │
│                    │ │ + stub retrofit     │ │                      │
└────────────────────┘ └─────────────────────┘ └──────────────────────┘
           │                    │                        │
           └────────────────────┼────────────────────────┘
                                ▼
                    ┌────────────────────────────────────┐
                    │ Phase 47: Integration & Re-Audit   │
                    │ (flip tech_debt → passed)          │
                    └────────────────────────────────────┘
```

**Parallelization:** Phases 44/45/46 parallelize (zero cross-deps after Phase 43). Share only capability matrix + Mermaid — use Phase 42 D-03 atomic-append precedent.

**Cross-phase merge contention:**

| File | Writers | Mitigation |
|---|---|---|
| `00-overview.md` Mermaid | 44, 45, 46 | Atomic append per writer; merge-order via integration plan |
| `android-capability-matrix.md` | 44, 45, 46 | Same pattern; deferred-anchor fills in order |
| `08-android-triage.md` | 44 (Knox sub-branch), 45 (ANDE1 replace) | Disjoint nodes |
| L1/L2 indexes | 44, 45 | Append-only; auto-mergeable |

---

## Build-Order Rationale

### Phase 43 MUST land before 44/45/46:

1. Sidecar path fix — harness nonexistent path blocks all audits
2. Allow-list baseline — 44/45 add new supervision refs; must have stable baseline
3. Freshness normalization — new files inherit 60-day baseline from normalized template
4. Content-migration prep — move RealWear deep content so 45 can land it

### Phases 44/45/46 parallelize:

- Disjoint file sets
- Shared files append-only (atomic pinning)
- Research flags independent

### Phase 47 MUST land last:

- Harness sees final state for C1/C2/C5
- MILESTONE-AUDIT `re_audit_resolution:` records clean re-run
- PROJECT.md Active → Validated requires all merged
- Capability matrix deferred-anchors must be filled

### Phase 47 Wave Structure (if conflicts)

```
Wave 0: ingest 44+45+46 completion
Wave 1: atomic capability-matrix rebuild (3 row sets)
Wave 2: atomic Mermaid rebuild (Knox + AOSP)
Wave 3: harness re-run + MILESTONE-AUDIT update
Wave 4: PROJECT.md/STATE.md/ROADMAP.md traceability flips
```

Mirrors v1.4 Phase 42 Wave 1/2 pattern.

---

## Retrofit Enumeration

### Required retrofits (MUST land)

| File | Current language | Required retrofit |
|---|---|---|
| `02-zero-touch-portal.md:16` | "Full KME coverage tracked for v1.4.1" | Link to `07-*#zt-mutual-exclusion` |
| `03-fully-managed-cobo.md:64` | "Full COPE admin deferred to v1.4.1" | Link to `08-cope-full-admin.md` |
| `06-aosp-stub.md:26` | "Stub in v1.4. Full AOSP planned for v1.4.1" | "v1.4.1 expansion: see per-OEM guides 09-13" |
| `06-aosp-stub.md` deferred-content table (7 rows) | All target v1.4.1 | Collapse: rows 1-3 → per-OEM 09-13; row 4 → 29; row 5 → 23; row 6 → L2 runbook 23; row 7 → `aosp-oem-matrix.md` |
| `06-aosp-stub.md:75` | "Per-OEM mechanics deferred" | Link to `aosp-oem-matrix.md` |
| `android-capability-matrix.md:113-119` | Deferred Knox row | Rename anchor to `#knox-mobile-enrollment-row`; fill live row |
| `android-capability-matrix.md:121-127` | Deferred full AOSP | Rename to `#full-aosp-capability-mapping`; link to matrix |
| `08-android-triage.md:37,76` (ANDE1) | "AOSP L1 out of scope v1.4" | Replace with ANDR29 → `29-*` |
| `l1-runbooks/00-index.md:77` | "AOSP L1 planned for v1.4.1" | Remove; append rows 28-29 |
| `l2-runbooks/00-index.md` | Lists 18-21 | Append rows 22-23 |
| `02-provisioning-methods.md` `#knox-mobile-enrollment` | Placeholder | Live Knox row |
| `_glossary-android.md` §Knox | Placeholder | Live entry + anchor |

### Optional retrofits

- `docs/_glossary.md` (Windows): see-also to `_glossary-android.md` — closes DEFER-05 orphan edge
- `00-overview.md:87,90` Setup Sequence: add Knox step, AOSP per-OEM leaf-expansion — mirrors Mermaid

---

## Audit Harness Re-Run Plan (Phase 47)

**Sequence:**

1. Verify all retrofits in place (no `v1.4.1` deferral language remains)
2. Run `node scripts/validation/v1.4-milestone-audit.mjs --verbose`
3. Expected:
   - C1 SafetyNet → PASS
   - C2 supervision → PASS (27 v1.4 pins + new v1.4.1 pins)
   - C3 AOSP word count → PASS informational
   - C4 deferred-file guard → PASS (DEFER-07 still deferred to v1.5)
   - C5 freshness → PASS (all files at 60-day)
4. Exit 0 → append `re_audit_resolution:` block with commit SHA + timestamp
5. Update status: `tech_debt → passed`
6. Close DEFER-01..06 in PROJECT.md deferred-items

**If failures:** classify per D-04 taxonomy; content-gap → surgical fix; allow-list/metadata → extend sidecar. Budget one intra-phase loop.

---

## Research Flags for Phase Authoring

| Phase | Research flag |
|---|---|
| 43 | Sidecar path decision |
| 44 | Current Samsung Knox portal UI/URL; KME license-tier; Knox L1 routing (new branch vs AND5 sub-gate) |
| 45 | OEM GA status for 5 spotlight OEMs; Meta Horizon wind-down date verification; per-OEM Wi-Fi embedding variance |
| 46 | Current Google COPE positioning; Intune admin center UI label; confirm full-admin-guide path |
| 47 | Re-audit acceptance criteria; classification of any new C2 findings |

---

## Confidence Assessment

| Area | Confidence |
|---|---|
| Existing v1.4 architecture state | HIGH |
| Naming convention extension (07-13) | HIGH |
| Integration points (retrofit targets) | HIGH |
| Audit harness extension (sidecar-only) | HIGH |
| Sidecar-path blocker | HIGH |
| Parallel-execution feasibility 44/45/46 | MEDIUM |

---

## Open Questions

1. Sidecar location — `scripts/validation/` or `.planning/validation/`? (Phase 43)
2. AOSP stub fate — content-migrate recommended; confirm at Phase 43 plan
3. Knox L1 routing — new AND-Knox branch OR AND5 sub-gate? (Phase 44)
4. COPE path — full admin (path A); confirm at Phase 46 research
5. Capability matrix write-conflict — atomic Phase 47 wave OR split-file during 44/45/46?

---

## Key File Paths Referenced

- `.planning/PROJECT.md`, `.planning/STATE.md`
- `.planning/milestones/v1.4-MILESTONE-AUDIT.md`, `.planning/milestones/v1.4-ROADMAP.md`
- `scripts/validation/v1.4-milestone-audit.mjs`
- `docs/admin-setup-android/00-overview.md`, `02-zero-touch-portal.md`, `03-fully-managed-cobo.md`, `06-aosp-stub.md`
- `docs/decision-trees/08-android-triage.md`
- `docs/l1-runbooks/00-index.md`, `docs/l2-runbooks/00-index.md`
- `docs/reference/android-capability-matrix.md`

**Missing file (Phase 43 blocker):** `v1.4-audit-allowlist.json` — expected at archived `.planning/phases/42-*/` per harness line 57. Must be restored at persistent path.
