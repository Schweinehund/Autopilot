# Phase 122: Structural Retrofit — Decision-Trees, Carved-Mermaid Files & the 9 Mermaid-bearing Lifecycle Docs — Pattern Map

**Mapped:** 2026-07-07
**Note on scope:** This is a REFORMAT-IN-PLACE retrofit (30 existing files enrolled/converted, no new files). RESEARCH.md already enumerates all 30 targets file-by-file with node/edge/tier detail — this map does NOT re-enumerate them. It maps the four **work-TYPE classes** the planner needs analogs for: (1) the pipeline fork, (2) decision-graph→table conversion, (3) EEE envelope on a Reference doc, (4) registry Pending→Approved flip.
**Work-type classes analyzed:** 4
**Analogs found:** 4 / 4 (all exact — every class has a shipped, in-repo precedent)

## File Classification

| Work-Type Class | Role | Data Flow | Closest Analog | Match Quality |
|------------------|------|-----------|-----------------|---------------|
| Pipeline fork (`retrofit-structural-122.mjs` or similar) | utility / transform script | file-I/O, batch | `scripts/pipeline/retrofit-structural.mjs` (Phase-121 fork; itself forked from `retrofit-guide.mjs`/`retrofit-reference.mjs`) | exact — fork-of-fork is the established convention |
| Decision-graph Mermaid block → table conversion (11 decision-trees + `admin-setup-android/00`, `admin-setup-apv1/01`, `admin-setup-ios/00`, `admin-setup-macos/00`, `lifecycle/00` block-1, `lifecycle/03`, `macos-lifecycle/{00,01,02}`) | content transform (hand-authored) | transform | `docs/decision-trees/10-8021x-triage.md` (ordinal-column table shape, still needs its own fence/Legend removed) + `docs/l2-runbooks/26-apple-business-permission-denied.md` (RE-068, shipped `Scenario\|Leaf\|Resolution` + `LOCKED-N`) | exact |
| EEE envelope on a Reference-typed doc (applies to all 11 new decision-trees + `ca-enrollment-timing.md`/RE-147) | config / frontmatter+header transform | file-I/O | `docs/reference/00-index.md` (RE-142, shipped enrolled Reference) | exact |
| Registry Pending→Approved flip row (19 existing IDs) + net-new Pending→Approved-via-mint rows (RE-207..217) | model / registry data row | CRUD (update-in-place) | `docs/_registry/RE-index.md` rows for RE-128, RE-147, RE-190, RE-200, RE-206 (Pending, pre-flip) + RE-202/203 (Approved, post-flip, same directory-class precedent from Phase 121) | exact |

## Pattern Assignments

### 1. Pipeline fork — `scripts/pipeline/retrofit-structural-122.mjs` (utility, batch/file-I/O)

**Analog:** `scripts/pipeline/retrofit-structural.mjs` (767 lines, Phase-121 fork; ancestors `retrofit-guide.mjs`, `retrofit-reference.mjs`). Fork it — do NOT edit in place (established "fork, don't refactor" convention across 117/118/121).

**Path-allowlist Set pattern to replicate** (`scripts/pipeline/retrofit-structural.mjs:94-124`):
```javascript
// The 6 bare glossary files -> doc_type Reference (D-04 lifecycle -> Guide / glossary -> Reference
// ruling, EEE-SOP-standard.md Doc Type Taxonomy).
const GLOSSARY_FILES = new Set([
  'docs/_glossary.md',
  'docs/_glossary-android.md',
  'docs/_glossary-apple-business.md',
  'docs/_glossary-linux.md',
  'docs/_glossary-macos.md',
  'docs/_glossary-network.md',
]);

// The 7 lifecycle + end-user-guide directory prefixes -> doc_type Guide (D-02 directory-
// enumerated scope, NOT glob-matched -- see 121-CONTEXT.md D2).
const GUIDE_DIRS = [
  'docs/lifecycle/',
  'docs/lifecycle-apv2/',
  'docs/android-lifecycle/',
  'docs/ios-lifecycle/',
  'docs/macos-lifecycle/',
  'docs/linux-lifecycle/',
  'docs/end-user-guides/',
];

// Resolve the doc_type for a normalized relative path, or null if outside the allowlist.
function resolveDocType(rel) {
  if (GLOSSARY_FILES.has(rel)) return 'Reference';
  if (GUIDE_DIRS.some(d => rel.startsWith(d))) return 'Guide';
  return null;
}
```
**Fork this into an explicit-Set (not prefix) router per D-03 SPECIFIC ADD 3 / RESEARCH Pitfall 2** — add `DECISION_TREE_PATHS` (11 entries → `'Reference'`), `ADMIN_SETUP_CARVEOUT_PATHS` (9 entries → `'Guide'`, confirmed live registry value), and a single-path check `'docs/reference/ca-enrollment-timing.md'` → `'Reference'`. Do NOT add directory prefixes for admin-setup — siblings in those directories are already enrolled (`GUIDE_DIRS`-style prefix match would reprocess them).

**`MERMAID_DEFERRED_PATHS` — the exact block to DELETE, and its 3 other call sites** (`scripts/pipeline/retrofit-structural.mjs:126-140`):
```javascript
// D-01: the 9 Mermaid-bearing lifecycle files -- hard-excluded, deferred to Phase 122.
// Never enumerated under --all; fails CLOSED (ERROR) if invoked against one by explicit path.
// Enrolling one of these (adding doc_id) would trip C17 assertion #1 (Mermaid hard-fail on
// enrolled files, Phase-120 D-02, byte-unchanged).
const MERMAID_DEFERRED_PATHS = new Set([
  'docs/lifecycle/00-overview.md',
  'docs/lifecycle/03-oobe.md',
  'docs/lifecycle/04-esp.md',
  'docs/lifecycle-apv2/02-deployment-flow.md',
  'docs/ios-lifecycle/01-ade-lifecycle.md',
  'docs/ios-lifecycle/02-mdm-migration.md',
  'docs/macos-lifecycle/00-ade-lifecycle.md',
  'docs/macos-lifecycle/01-psso-provisioning-walkthrough.md',
  'docs/macos-lifecycle/02-mdm-migration-psso.md',
]);
```
This constant has **4 call sites** in the 767-line file (verified this session — RESEARCH's Pitfall 1 count confirmed):
1. Declaration — lines 130-140 (above) — DELETE the whole `const`.
2. Guard 1b in `processFile()` — lines 310-314:
```javascript
  // Guard 1b (D-01): hard-exclude the 9 mermaid-deferred lifecycle files -- fail CLOSED, never
  // a silent skip, so the script itself enforces D-01 even against an explicit invocation.
  if (MERMAID_DEFERRED_PATHS.has(rel)) {
    return { ok: false, rel, error: 'MERMAID-DEFERRED: file is one of the 9 D-01 mermaid-carve-out lifecycle files -- deferred to Phase 122, refusing to process' };
  }
```
Replace with the fail-closed mermaid-absence precondition (idiom below).
3. `--all` enumeration filter — lines 675-681:
```javascript
  if (ALL) {
    const glossaryAbsPaths = [...GLOSSARY_FILES].map(p => join(process.cwd(), p)).filter(existsSync);
    const guideDirPaths = GUIDE_DIRS.flatMap(d => walkMd(d));
    const merged = [...glossaryAbsPaths, ...guideDirPaths];
    // Exclude the 9 mermaid-deferred files from --all enumeration entirely (D-01) -- they
    // must never be enumerated, not merely "expected to fail".
    targetAbsPaths = merged.filter(abs => !MERMAID_DEFERRED_PATHS.has(relNormalize(abs)));
```
DELETE the `.filter(...)` line — no longer needed once Guard 1b is content-based, not path-based.
4. Self-test sub-test (e) — lines 554-577 (assertion literally checks the Set exists, will throw `ReferenceError` if only the declaration is deleted):
```javascript
  // (e) A Mermaid-deferred path is refused (hard-excluded, fail-closed); a non-deferred
  //     lifecycle path in the same directory is NOT refused; a path outside the router is
  //     also refused (path-allowlist proof folded in)
  {
    const outsidePaths = [
      'docs/l1-runbooks/01-device-not-registered.md',
      'docs/reference/endpoints.md',
      'docs/operations/app-lifecycle/00-overview.md',
    ];
    const mermaidPath = 'docs/lifecycle/00-overview.md';
    const nonMermaidLifecyclePath = 'docs/lifecycle/01-hardware-hash.md';

    const allOutsideRefused = outsidePaths.every(p => resolveDocType(p) === null);
    const mermaidRefused = MERMAID_DEFERRED_PATHS.has(mermaidPath);
    const nonMermaidAllowed = resolveDocType(nonMermaidLifecyclePath) !== null && !MERMAID_DEFERRED_PATHS.has(nonMermaidLifecyclePath);
    const allNineDeferred = MERMAID_DEFERRED_PATHS.size === 9;

    stAssert(
      '(e) PATH-ROUTER + D-01: outside paths refused, all 9 Mermaid-deferred paths hard-excluded, sibling non-Mermaid lifecycle path allowed',
      allOutsideRefused && mermaidRefused && nonMermaidAllowed && allNineDeferred,
      'outsideRefused=' + allOutsideRefused + ' mermaidRefused=' + mermaidRefused +
        ' nonMermaidAllowed=' + nonMermaidAllowed + ' deferredCount=' + MERMAID_DEFERRED_PATHS.size
    );
  }
```
Rewrite to assert the NEW mermaid-absence guard fires against a synthetic fixture containing `` ```mermaid `` body content, not against the deleted Set.

**`buildDocIdMap()` join — UNCHANGED, copy verbatim** (`scripts/pipeline/retrofit-structural.mjs:190-204`):
```javascript
/**
 * Parse RE-index.md and return a Map<relativePath, docId>.
 * Joins on the Path column (column 2) only -- never on title or order.
 * Example: Map { 'docs/_glossary-android.md' => 'RE-179' }
 */
function buildDocIdMap(registryPath) {
  const content = readFile(registryPath);
  if (!content) return new Map();
  const map = new Map();
  for (const line of content.split('\n')) {
    // Match data rows: | RE-NNN | docs/path/to/file.md | ...
    const m = line.match(/^\|\s*(RE-\d+)\s*\|\s*(docs\/[^|]+?)\s*\|/);
    if (m) map.set(m[2].trim(), m[1].trim());
  }
  return map;
}
```
**Precondition for decision-trees:** the 11 `RE-207..217` rows must be hand-minted in `RE-index.md` (path-keyed) BEFORE this map is built/joined against — the fork never edits the registry.

**Fail-closed guard idiom — the pattern EVERY new guard must match** (`scripts/pipeline/retrofit-structural.mjs:301-354`, `return {ok:false, ...}`, never a silent skip):
```javascript
function processFile(absPath, docIdMap) {
  const rel = relNormalize(absPath);

  // Guard 1: path router -- 6 glossary bare files OR the 7 guide-dir prefixes
  const docType = resolveDocType(rel);
  if (docType === null) {
    return { ok: false, rel, error: 'PATH-ALLOWLIST: path not one of the 6 glossary files or under a GUIDE_DIRS prefix' };
  }
  ...
  // Guard 2: TEMPLATE-SENTINEL -- refuse 1970-01-01 (prevents C17 #9/#12 false-pass)
  const lvMatch = fm.match(/^last_verified:\s*(\d{4}-\d{2}-\d{2})\s*(#.*)?$/m);
  const lastVerified = lvMatch ? lvMatch[1] : null;
  if (lastVerified === '1970-01-01') {
    return { ok: false, rel, error: 'SENTINEL-GUARD: last_verified is 1970-01-01 (TEMPLATE-SENTINEL) — refusing to process' };
  }

  // Guard 3: doc_id must resolve in registry (join on path)
  const docId = docIdMap.get(rel);
  if (!docId) {
    return { ok: false, rel, error: 'DOC-ID-UNRESOLVED: path not found in RE-index.md: ' + rel };
  }

  // Platform: detect presence in frontmatter; inject Windows if absent
  const platformMatch = fm.match(/^platform:\s*(.+?)\s*(#.*)?$/m);
  let platform = platformMatch ? platformMatch[1] : null;
  const platformInjected = (platform === null);
  if (platformInjected) platform = 'Windows';

  // Guard 4: platform must resolve in D1_MAP (hard failure, no fallback)
  const d1Label = D1_MAP[platform];
  if (d1Label === undefined) {
    return { ok: false, rel, error: 'UNMAPPED-PLATFORM: platform "' + platform + '" not in D1_MAP' };
```
**New guards to add, matching this exact `return {ok:false, error:'CODE: message'}` idiom** (never silent-skip, per D-03 SPECIFIC OVERRULE 1):
- Mermaid-absence precondition (insert right after content read, ~line 320, before frontmatter parse): mask code fences using C17's own detection method, then `return {ok:false, rel, error:'MERMAID-STILL-PRESENT'}` if any unmasked line matches `` /^```mermaid/ ``.
- doc_id-idempotency guard (insert immediately after the Guard 2 TEMPLATE-SENTINEL check, before Guard 3): `if (fm.match(/^doc_id:\s*\S+/m)) return {ok:false, rel, error:'DOC-ID-ALREADY-PRESENT: refusing to re-enroll'};`
- Keyless-non-Windows guard (extend the platform-injection block at line 349): `if (platformInjected && !KNOWN_WINDOWS_KEYLESS_PATHS.has(rel)) return {ok:false, rel, error:'UNKNOWN-KEYLESS-PLATFORM: refusing to default to Windows outside the confirmed-Windows allowlist'};`

**VH-row literal token to auto-fill** (`scripts/pipeline/retrofit-structural.mjs:231-232` — the DEFER-121-07-A root-cause site):
```javascript
const NEW_ROW_2COL = '| YYYY-MM-DD | v1.16 EEE reformat — content not re-reviewed |';
const NEW_ROW_3COL = '| YYYY-MM-DD | v1.16 EEE reformat — content not re-reviewed | — |';
```
Replace the literal `'YYYY-MM-DD'` with the actual retrofit date at write time (template-string interpolation), mirroring the 117-02/118-04 fix precedent.

**LF-normalize — KEEP UNCHANGED, do NOT add CRLF-restore** (WR-01 closed WONTFIX per D-03 SPECIFIC OVERRULE 2): the read call at `retrofit-structural.mjs:155` (`readFileSync(...).replace(/\r\n/g, '\n')`) and the write call at `retrofit-structural.mjs:745` (`writeFileSync(..., result.newContent, 'utf8')`) both stay exactly as-is — no new logic needed at either site, just verify the fork didn't accidentally reintroduce CRLF handling.

---

### 2. Decision-graph → table conversion (content transform, hand-authored)

**Analog A — `docs/decision-trees/10-8021x-triage.md`** (the STD-04-cited exemplar; NOTE this file is NOT yet actually converted — its own fence at lines 27-47 and "Legend" section at lines 17-23 must be deleted as part of its own conversion task, even though the target table already exists alongside them).

**The ordinal-column table shape to copy** (lines 53-59):
```markdown
## Routing Verification

All terminal nodes are within 2 decision steps of the root node (EAP1).

| Path | Step 1 (root: EAP1) | Step 2 | Destination |
|------|---------------------|--------|-------------|
| Certificate profile error | Intune cert profile shows Error or Pending | (terminal) | Runbook 38 |
| Server trust / validation failure | Trust prompt or untrusted server / RADIUS root CA missing | (terminal) | Runbook 40 |
| EAP negotiation failure | EAP method or inner-auth mismatch | (terminal) | Runbook 41 |
| RADIUS reject | Cert profiles Succeeded, RADIUS rejects auth | (terminal) | Runbook 39 |
| Unknown / Other | Don't know / Other | (terminal) | Escalate EAPE |
```
Per D-02 Amendment 3, use **diagram-fitted columns with an ordinal first column where order is load-bearing** — this table's `Path` first-column IS that ordinal pattern (not the literal `Scenario|Leaf|Resolution` wording).

**Anti-pattern present in this SAME file — the Legend section that becomes stale prose the instant the fence is deleted** (lines 17-23, DELETE as part of conversion):
```markdown
## Legend

| Symbol | Meaning |
|--------|---------|
| Diamond `{...}` | Decision -- answer the question |
| Green rounded `([...])` | Resolved -- follow the linked L1 runbook |
| Red rounded `([...])` | Escalate to L2 -- collect data listed in Escalation Data table and hand off |
```

**Analog B — `docs/l2-runbooks/26-apple-business-permission-denied.md` (RE-068)** — out of the 30-file roster (already Approved, do NOT edit), used ONLY as a shape/anti-pattern reference.

**The `Scenario | Leaf | Resolution` + `LOCKED — N leaves` shape** (lines 41-53):
```markdown
## 7-Leaf Decision Tree

**Decision tree — identify the permission error type:**

| Scenario | Leaf | Resolution |
|----------|------|-----------|
| Role lacks permission | ABPDR1 | [Role & Permission Model](../cross-platform/apple-business/01-role-permission-model.md) |
| OU boundary violation | ABPDR2 | [OUs Architecture](../cross-platform/apple-business/02-ous-architecture.md) |
| Apple Business scope error | ABPDR3 | [Cross-Org Boundary Cheat Sheet](../cross-platform/apple-business/18-cross-org-boundary-cheat-sheet.md) |
| Intune-scope path | ABPDE1 | Scope boundary — see [ABPDE1](#abpde1--intune-scope-path-out-of-apple-business-surface) below |
| Federation state error | ABPDR5 | [Managed Apple Account Runbook](../cross-platform/apple-business/16-managed-apple-account-runbook.md) |
| Quota limit reached | ABPDR6 | [Managed Apple Account Provisioning](../cross-platform/apple-business/08-managed-apple-account-provisioning.md) |
| Account Holder lockout | ABPDR7 | [Role Permission Model — OP-2](../cross-platform/apple-business/01-role-permission-model.md) |
```
Note D-02 AMENDMENT 3 explicitly says this exact column wording is only a *parenthetical example* in the standard — use diagram-fitted columns instead (Analog A's `Path` shape), but the row-per-leaf/branch density and the `LOCKED — N leaves` annotation convention below both still apply as the container-neutral pattern.

**⚠ ANTI-PATTERN excerpt — the shipped stale-prose defect (line 29), grep for this class of text in all 30 converted files:**
```
This runbook contains a 7-leaf Mermaid decision tree (DA-9 LOCKED — 7 leaves). Start at the root, follow the matching branch, then click the leaf to the target runbook (Apple-Business-scoped leaves route via `click` to existing corpus docs) or follow the inline scope-boundary callout (Intune-scope leaf — C15-safe, no `click`).
```
This text describes diagram-interaction semantics ("click the leaf") for a diagram that (in RE-068's shipped state) has already been converted to a table — it shipped green under C17 because C17 has no diagram parser (D-04). Grep every converted file for `mermaid|click|decision tree|diagram above/below|node shape|legend` before considering a file done (D-01 RIDER 3 / D-02 anti-pattern).

**`LOCKED — N leaves` annotation line to replicate (container-neutral, per D-02 Amendment 3 — count nodes PLUS labeled edges, NOT terminal leaves only):**
```
(DA-9 LOCKED — 7 leaves)
```
Note the RESEARCH Open Question: this RE-068-style count is the OLDER "terminal leaves only" convention; D-02 Amendment 3 locks a broader "nodes + labeled edges" convention that would produce a materially larger N for the same diagram. The planner/executor must pick one convention explicitly per file and note it in the annotation (e.g., `LOCKED — 18 (nodes + labeled edges)` vs. the older `LOCKED — 7 leaves` style) — do not silently mix conventions across the 30 files.

**Non-decision-table conversion shapes (for the branchless/failure-map/subgraph blocks — same D-02 bright-line, RESEARCH-verified against live content):**
- Failure-annotation map (`lifecycle/00-overview.md` block 2, `lifecycle-apv2/02-deployment-flow.md` block 2) → 2-column `Stage | Failure Mode` table (RESEARCH.md lines 226-247 have the full before/after excerpt — reuse verbatim, do not re-derive).
- Subgraph-partitioned flow (`lifecycle/04-esp.md`) → headed sub-lists preserving the partition label as a load-bearing transition note (RESEARCH.md lines 249-262 have the full before/after excerpt).

---

### 3. EEE envelope on a Reference doc (frontmatter + header, applies to all 11 new decision-trees + RE-147)

**Analog:** `docs/reference/00-index.md` (RE-142, shipped enrolled Reference — Phase-118 vintage, still the current envelope shape).

**Frontmatter key block** (lines 1-11):
```yaml
---
doc_id: RE-142
status: Approved
owner: Intune Admin Lead
doc_type: Reference
last_verified: 2026-04-17
review_by: 2026-07-16
applies_to: both
audience: all
platform: all
---
```
For the 11 decision-trees, `doc_type: Reference` is LOCKED (D-04a, directory precedence). `owner`/`audience`/`applies_to`/`platform` must be set per-file to match each decision-tree's actual scope (most are `audience: L1`, several are single-platform per RESEARCH's per-file table — e.g. `04-apv2-triage.md` is Windows APv2-scoped).

**Visible header block** (line 13, rendered from frontmatter — exact format to copy verbatim, substituting per-file values):
```markdown
**Platform:** All Platforms · **Doc Type:** Reference · **Doc ID:** RE-142 · **Status:** Approved
```

**`## Summary` shape** (lines 17-19, ≥30 words, scope statement — Claude's Discretion on exact prose per CONTEXT, but this is the layout/sourcing pattern to match):
```markdown
## Summary

This index organizes the technical reference documentation for Windows Autopilot and macOS ADE deployments, covering network endpoints, PowerShell diagnostics, registry paths, platform capability matrices, infrastructure prerequisites, security and compliance considerations, migration guides, and monitoring operations. It spans Windows, macOS, iOS/iPadOS, Android, and Linux, and is intended for Intune administrators and L2 engineers navigating to detailed reference material.
```

**For `ca-enrollment-timing.md` (RE-147) specifically** — currently unenrolled (verified this session, no `doc_id` in its frontmatter yet):
```yaml
---
last_verified: 2026-04-13
review_by: 2026-07-12
applies_to: both
audience: admin
platform: Windows
---
```
This file also carries a `sequenceDiagram` block (lines 25-39) that must convert to an ordered numbered step list per D-02 (sequence diagrams → step list, not table) BEFORE the fork enrolls it — the fork's new mermaid-absence guard will fail-closed otherwise.

---

### 4. Registry Pending→Approved flip row (applies to all 19 existing-ID flip targets) + net-new mint rows (RE-207..217)

**Analog — registry table header + format** (`docs/_registry/RE-index.md:15`):
```markdown
| Doc ID | Path | Title | Doc Type | Status |
```

**Pending rows, pre-flip (exact current state, verified this session):**
```markdown
| RE-128 | docs/admin-setup-linux/00-overview.md | Linux Admin Setup Overview | Guide | Pending |
| RE-147 | docs/reference/ca-enrollment-timing.md | Conditional Access Enrollment Timing: The Compliance Chicken-and-Egg Problem | Reference | Pending |
| RE-190 | docs/ios-lifecycle/01-ade-lifecycle.md | iOS/iPadOS ADE Lifecycle: Automated Device Enrollment End-to-End | Guide | Pending |
| RE-200 | docs/lifecycle-apv2/02-deployment-flow.md | APv2 User-Driven Deployment Flow | Guide | Pending |
| RE-206 | docs/macos-lifecycle/02-mdm-migration-psso.md | macOS MDM Migration Walkthrough: B1 In-Place (macOS 26+) and B2 Wipe-and-Re-Enroll | Guide | Pending |
```
**Flip is a single-column edit** — change the trailing `Pending` → `Approved`. Nothing else in the row changes (Doc ID, Path, Title, Doc Type all stay fixed — the fork joins on Path, not on Status).

**Post-flip precedent from the immediately-preceding directory class (Phase 121, `linux-lifecycle/`, already Approved — use as the "what the flipped row should look like" reference):**
```markdown
| RE-202 | docs/linux-lifecycle/00-enrollment-overview.md | Linux Device Management Enrollment Overview | Guide | Approved |
| RE-203 | docs/linux-lifecycle/01-linux-prerequisites.md | Linux Intune Client Prerequisites | Guide | Approved |
```

**Net-new mint rows (RE-207..217, decision-trees) — append sequentially after the current max (RE-206), path order 00→10, BEFORE the fork runs (D-03 SPECIFIC ADD 4):**
```markdown
| RE-207 | docs/decision-trees/00-initial-triage.md | [Title] | Reference | Pending |
| RE-208 | docs/decision-trees/01-esp-failure.md | [Title] | Reference | Pending |
...
| RE-212 | docs/decision-trees/05-device-lifecycle.md | [Title] | Reference | Pending |
...
| RE-217 | docs/decision-trees/10-8021x-triage.md | [Title] | Reference | Pending |
```
These rows are minted as `Pending` first (hand-authored, matching table shape), then flipped to `Approved` in the same pass as the other 19 once the fork has run and C17 is green on all 30 — mirroring the exact two-phase lifecycle the 19 existing rows are already in mid-flight through.

## Shared Patterns

### Fail-closed guard idiom (applies to all 3 new fork guards)
**Source:** `scripts/pipeline/retrofit-structural.mjs:301-354` (`PATH-ALLOWLIST`, `SENTINEL-GUARD`, `DOC-ID-UNRESOLVED`, `UNMAPPED-PLATFORM`)
**Apply to:** the mermaid-absence guard, the doc_id-idempotency guard, and the keyless-non-Windows guard — every one returns `{ ok: false, rel, error: 'CODE: message' }` and is checked by the caller before any write. None ever silently skip.

### Stale-diagram-prose grep (applies to all 30 converted files, post-conversion QA step)
**Source:** RE-068 line 29 anti-pattern (see Class 2 above) + D-01 RIDER 3
**Apply to:** every file after its Mermaid block(s) are converted — grep the WHOLE file (not just near the old fence location) for `mermaid|click|decision tree|diagram above|diagram below|node shape|legend|classDef`.

### Fork-don't-refactor-in-place (applies to the pipeline fork itself)
**Source:** established across Phases 117/118/121 — `retrofit-structural.mjs` is itself a fork of `retrofit-reference.mjs`/`retrofit-guide.mjs`, never merged back
**Apply to:** name the Phase-122 fork something distinct (e.g. `retrofit-mermaid-structural.mjs`, per the `retrofit-<class>.mjs` convention) — do NOT overwrite `retrofit-structural.mjs`.

### LF-normalize, no CRLF-restore (applies to all 30 files' final on-disk state)
**Source:** `retrofit-structural.mjs:155` (read) and `:745` (write) — both KEEP UNCHANGED
**Apply to:** all 30 targets, even though they are currently CRLF on disk — accept the whole-file EOL-flip diff noise (review with `git diff -w`/`--ignore-space-at-eol`), do not attempt to restore CRLF (D-03 SPECIFIC OVERRULE 2, WR-01 WONTFIX).

## No Analog Found

None — every work-type class in this phase has a direct, shipped, in-repo analog (this is expected: Phase 122 is explicitly a continuation of the Phase 116/117/118/121 retrofit-pipeline lineage, not new architecture).

## Metadata

**Analog search scope:** `scripts/pipeline/`, `docs/decision-trees/`, `docs/l2-runbooks/`, `docs/reference/`, `docs/_registry/RE-index.md`
**Files read in full or targeted-range this session:** `scripts/pipeline/retrofit-structural.mjs` (lines 90-150, 190-240, 300-360, 550-580, 670-686), `docs/decision-trees/10-8021x-triage.md` (full), `docs/l2-runbooks/26-apple-business-permission-denied.md` (full), `docs/reference/00-index.md` (lines 1-60), `docs/reference/ca-enrollment-timing.md` (full), `docs/_registry/RE-index.md` (lines 1-15, 144, 163, 206-223)
**Pattern extraction date:** 2026-07-07

## PATTERN MAPPING COMPLETE
