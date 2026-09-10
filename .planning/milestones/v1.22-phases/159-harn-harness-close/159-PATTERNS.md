# Phase 159: HARN — Harness Close - Pattern Map

**Mapped:** 2026-09-08
**Files analyzed:** 19 new/modified files across 13 plans
**Analogs found:** 19 / 19 (all have a live, tracked, git-ls-files-verified analog — this phase is a mechanical extension of 16-19 prior Path-A generations; no "no analog" bucket)

**Tracked-source gate:** every analog path below was verified via `git ls-files -- <path>` returning non-empty at HEAD on branch `v1.22/154-style-landing`. None is a `.gsd/` or plugin-mirror path.

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|---|---|---|---|---|
| `scripts/validation/_lib/frozen-at-close.mjs` (EDIT: insert V121 pin + exports) | utility/library | transform (git-object read) | itself, prior insertion for `V120` (same file, `V120`/`readAtV120Close`/`lsTreeAtV120Close` block) | exact — mid-file insertion of the same shape as its own immediately-preceding entry |
| `scripts/validation/v1.21-milestone-audit.mjs` (EDIT: whole-harness live→frozen conversion) | validation harness | CRUD-ish batch (reads corpus, spawns subprocess) | `scripts/validation/v1.20-milestone-audit.mjs` (already-converted twin) | exact — same lineage, one milestone older, already frozen |
| `scripts/validation/v1.22-milestone-audit.mjs` (NEW, forked) | validation harness | batch | `git show e129081e:scripts/validation/v1.21-milestone-audit.mjs` (the frozen blob, NOT the working-tree unconverted file) | exact — this IS the fork source by design (D-22) |
| `scripts/validation/v1.22-audit-allowlist.json` (NEW) | config/sidecar | file-I/O | `scripts/validation/v1.21-audit-allowlist.json` | exact — header-fields-only copy, pins byte-identical (D-23) |
| `scripts/validation/regenerate-supervision-pins.mjs` (EDIT: insert `BASELINE_26` block) | utility | batch | itself, the `BASELINE_25` comment-block insertion immediately above `const BASELINE_9` | exact |
| `scripts/validation/check-phase-154.mjs` (NEW) | validation leaf (content) | batch/transform | `scripts/validation/check-phase-145.mjs` (floor+presence template) + `check-phase-143.mjs` (spawn/classifier for the `verify-meaning.py --self-test` presence check) | role-match, strong |
| `scripts/validation/check-phase-155.mjs` (NEW) | validation leaf (content) | batch/transform | `scripts/validation/check-phase-135.mjs` (RECIPE content-needle shape, same asset-pair byte-identity pattern) | role-match, strong |
| `scripts/validation/check-phase-156.mjs` (NEW) | validation leaf (content) | batch/transform | `scripts/validation/check-phase-145.mjs` (per-file substring-count needle shape) | role-match, strong |
| `scripts/validation/check-phase-157.mjs` (NEW, incl. STD-02 python gate spawn) | validation leaf (content + subprocess) | batch + event-driven (subprocess) | `scripts/validation/check-phase-143.mjs` (spawn + ENOENT/127/"not found" classifier + `V-143-TOOLPRESENCE` presence pairing) | exact for the spawn portion |
| `scripts/validation/check-phase-158.mjs` (NEW) | validation leaf (content + subprocess) | batch + event-driven | `scripts/validation/check-phase-143.mjs` (spawn/classifier) + `check-phase-145.mjs` (presence) | role-match, strong |
| `scripts/validation/check-phase-159.mjs` (NEW, apex) | validation orchestrator | batch (recursive spawn of chain) | `scripts/validation/check-phase-153.mjs` (immediately-prior apex template: `CHAIN_START`/`CHAIN_END`/`CHAIN_EXTRA`/`ARCHIVE_ROOT_TOKEN`/AUDIT-HARNESS/SELF legs) | exact — direct lineage template |
| `.github/workflows/audit-harness-v1.22-integrity.yml` (NEW) | CI config | event-driven (workflow_dispatch/schedule/pull_request) | `.github/workflows/audit-harness-v1.21-integrity.yml` (16-job structure, per-job mechanical diff to 13 jobs) | exact — direct lineage template |
| `scripts/hooks/pre-push.sh` (NEW) | git hook script | event-driven (git pre-push) | `scripts/hooks/pre-commit.sh` (sibling hook: shebang, set -e, per-line/per-item guard loop, exit-code contract) | role-match — same directory, same install contract, different trigger event |
| `scripts/hooks/README.md` (EDIT: add pre-push install block) | docs/config | file-I/O | itself — existing `## pre-commit.sh` section (Install / Rationale / Why Not Husky headings) | exact — same file, mirror an existing section |
| `.gitattributes` (EDIT: append line) | config | file-I/O | itself — existing single line `scripts/pipeline/reference.docx binary` | exact |
| `.planning/config.json` (EDIT: add `branching_strategy`) | config | CRUD (single key add) | itself — existing 6-key object | exact |
| `.claude/skills/jira-milestone/install-jira-milestone-hook.cjs` (commit untracked, re-encode `HOOK_B64`) | installer/utility | file-I/O (base64 embed) | `.claude/hooks/jira-milestone-gate.cjs` (the tracked, adapted, live hook whose bytes must be re-embedded) | exact — installer's payload must equal this file byte-for-byte |
| `v1.22-MILESTONE-AUDIT.md` (NEW) | docs/close-artifact | batch/transform | `.planning/milestones/v1.21-MILESTONE-AUDIT.md` | exact — direct lineage template |
| `v1.22-DEFERRED-CLEANUP.md` (NEW) | docs/close-artifact | batch/transform | `.planning/milestones/v1.21-DEFERRED-CLEANUP.md` | exact — direct lineage template (Parts A-D shape, D-58/D-59/D-60) |
| `159-EVIDENCE.md` (NEW) | docs/evidence | batch/transform | `.planning/milestones/v1.21-phases/153-harness-close-v120-pin-c17-frozen-aware-residue-19th-path-a/153-EVIDENCE.md` | exact — direct lineage template (§1 harness runs, §2 nested scan, §3 archival census, §6.3 checkpoint record) |

## Pattern Assignments

### `scripts/validation/_lib/frozen-at-close.mjs` (utility, insert-only)

**Analog:** itself, the `V120` block (lines ~171-187) and its export-append points (line 261, line 330)

**Insertion-point pattern** (verified this session, lines 171-229 per RESEARCH.md Pattern 1):
```javascript
  V120: '246fa3dd',  // Phase 144 Plan 144-12 close-gate ...
                    // PLACEMENT: inserted here, strictly before the V14 entry immediately below —
                    // never appended — because `V-140-V14PIN` (check-phase-140.mjs) regex-asserts
                    // no V-tag key follows the V14 literal inside this object body.
  V14: '0b3be9ab',  // Phase 43 terminal commit ...
```
Insert `V121: 'e129081e',` with its own regression-checked-discriminator comment **between** the end of the V120 comment block and the `V14:` line — a mid-file insertion, never an append (D-15 re-amends the APPEND-ONLY ruling for this one insert).

**Enforcing guard, quoted verbatim** (`check-phase-140.mjs:118-145`, substring-then-regex, not object-key-order):
```javascript
const PIN = "V14: '0b3be9ab'";
// ...
const after = body.slice(pinIdx + PIN.length);
if (/\n\s*V\w+:\s*'/.test(after)) {
  return { pass: false, detail: 'V14PIN regression: another V-tag key appears after V14 ...' };
}
```
Inserting before `V14` trivially satisfies this; appending after fails it immediately.

**Export-append pattern:** append `readAtV121Close`/`lsTreeAtV121Close` immediately following the existing `readAtV120Close`/`lsTreeAtV120Close` exports in the two existing export runs — do not create new export blocks.

---

### `scripts/validation/v1.21-milestone-audit.mjs` (validation harness, live→frozen conversion)

**Analog:** `scripts/validation/v1.20-milestone-audit.mjs` (already-converted twin, lines 44/58-91 and 820-878)

**Current (unconverted) state, confirmed this session** (`v1.21-milestone-audit.mjs:79-82`):
```javascript
function readFile(relPath) {
  const abs = join(process.cwd(), relPath);
  if (!existsSync(abs)) return null;
  return readFileSync(abs, 'utf8').replace(/\r\n/g, '\n');
}
```

**Target shape to copy** (`v1.20-milestone-audit.mjs:44,58-91`):
```javascript
import { createFrozenCorpusReader, withDocsAtClose } from './_lib/frozen-at-close.mjs';
const MILESTONE_TAG = 'V120';
const SIDECAR_PATH = 'scripts/validation/v1.20-audit-allowlist.json'; // UNCHANGED literal -- GOV-02
const FROZEN = createFrozenCorpusReader(MILESTONE_TAG, { extraPaths: [SIDECAR_PATH] });

function readFile(relPath) {
  const c = FROZEN.get(relPath);
  return c === undefined ? null : c;
}
function walkMd(dir) {
  const prefix = dir.endsWith('/') ? dir : dir + '/';
  return FROZEN.paths.filter((p) => p.startsWith(prefix)).map((p) => join(process.cwd(), p));
}
function parseAllowlist() {
  const raw = FROZEN.get(SIDECAR_PATH);
  if (raw === undefined || raw === null) {
    throw new Error(`Sidecar absent at frozen SHA (${MILESTONE_TAG}): ${SIDECAR_PATH} -- D-07 fail-loud`);
  }
  try { return JSON.parse(raw); }
  catch (err) { return { _parseError: err.message, safetynet_exemptions: [], supervision_exemptions: [] }; }
}
```
For v1.21: `MILESTONE_TAG = 'V121'`, `SIDECAR_PATH = 'scripts/validation/v1.21-audit-allowlist.json'` (unchanged literal), everything else copies verbatim.

**C17 leg conversion pattern** (`v1.20-milestone-audit.mjs:820-878`, the `existsSync` guard STAYS LIVE per D-19):
```javascript
run() {
  const CONTRACT_REL = 'scripts/validation/c17-eee-contract.mjs';
  const CONTRACT_ABS = resolve(process.cwd(), CONTRACT_REL);
  if (!existsSync(CONTRACT_ABS)) {
    return { pass: false, detail: 'C17 FAIL: ' + CONTRACT_REL + ' not present (EEE contract validator missing)' };
  }
  try {
    return withDocsAtClose('V120', (tmpDir, writtenPaths) => {
      const KNOWN_MEMBER = join(tmpDir, 'docs', 'recipes', '03-windows-11-multi-app-kiosk.md');
      if (!existsSync(KNOWN_MEMBER)) {
        throw new Error('C17 FAIL: known-member guard failed -- ' + KNOWN_MEMBER + ' absent from materialized V120 corpus');
      }
      if (!writtenPaths || writtenPaths.length === 0) {
        throw new Error('C17 FAIL: materialize guard failed -- zero files written to the temp directory');
      }
      try {
        execFileSync('node', [CONTRACT_ABS], { stdio: 'pipe', timeout: 300000, cwd: tmpDir });
        return { pass: true, detail: 'c17-eee-contract.mjs exits 0 against frozen V120 corpus (' + writtenPaths.length + ' files materialized ...)' };
      } catch (err) {
        const stderr = err.stderr ? err.stderr.toString() : '';
        const stdout = err.stdout ? err.stdout.toString() : '';
        return { pass: false, detail: execFailDetail(stdout, stderr, { n: 500, trim: true, prefix: 'C17 FAIL: ' }) };
      }
    });
  } catch (err) { return { pass: false, detail: err.message }; }
}
```
For V121: `MILESTONE_TAG` swaps to `'V121'`, `KNOWN_MEMBER = join(tmpDir, 'docs', 'recipes', '05-enterprise-update-plan.md')`, success-string prose swaps `V120`→`V121` (D-21 copy hazard — the hardcoded prose string must be edited, not left stale).

---

### `scripts/validation/v1.22-milestone-audit.mjs` (NEW, forked harness)

**Analog:** `git show e129081e:scripts/validation/v1.21-milestone-audit.mjs` — the FROZEN BLOB, not the working-tree file (which is unconverted until 159-04 runs). Fork order: pin → fork (byte-equal assertion against the frozen blob) → convert working-tree copy → sidecar/BASELINE_26 → leaves → apex → workflow (D-22).

**Copy hazards to preserve exactly** (D-21): `SIDECAR_PATH`'s literal string (grepped by `audit-harness-v1.21-integrity.yml:77`, GOV-02); rewrite the "BORN LIVE-HEAD" header paragraph in place since this new file's conversion IS the target.

---

### `scripts/validation/v1.22-audit-allowlist.json` (NEW)

**Analog:** `scripts/validation/v1.21-audit-allowlist.json` (89 entries, 73 line-keyed, 33 distinct files, 44 line-enforced)

**Pattern:** header-fields-only copy, pins byte-identical (Phase 153-04 D-47 shape). The four dead `safetynet_exemptions` pins (pointing at lines carrying no `SafetyNet` token) are carried byte-identical and disclosed in the `BASELINE_26` comment and in `v1.22-DEFERRED-CLEANUP.md` Part A as a v1.23 repoint — do not "fix" them silently.

---

### `scripts/validation/regenerate-supervision-pins.mjs` (EDIT)

**Analog:** itself — the existing `BASELINE_9`/`BASELINE_24`/`BASELINE_25` comment-block history immediately above `const BASELINE_9 = [` (lines ~540-590)

**Pattern (confirmed, RESEARCH.md Pitfall 4):** there is exactly ONE array, always named `const BASELINE_9`. Each "`BASELINE_NN` refreshed <date>" is a journal-entry COMMENT BLOCK, not a new array. Insert the `BASELINE_26` comment block immediately above `const BASELINE_9 = [` — mid-file insertion, matching the shape of the `BASELINE_25` block it sits below.

---

### `scripts/validation/check-phase-154.mjs` / `-155.mjs` / `-156.mjs` / `-157.mjs` / `-158.mjs` (NEW content leaves)

**Analogs:** `check-phase-145.mjs` (floor + presence template), `check-phase-135.mjs` (asset byte-identity + content-substring needle shape), `check-phase-143.mjs` (spawn + classifier + `V-143-TOOLPRESENCE`)

**Floor guard** (`check-phase-145.mjs:145-146`):
```javascript
if (files.length < 250) {
  return { pass: false, detail: 'docs/ walk found only ' + files.length + ' files (expected >= 250) -- treating as a missing-corpus null sentinel, not a vacuous pass' };
}
```

**Presence helper** (`check-phase-145.mjs:113-124`):
```javascript
function presence(id, path, req) {
  checks.push({
    id,
    name: 'V-145-' + id + ': ' + path + ' exists and is non-empty' + (req ? ' (' + req + ')' : ''),
    run() {
      const c = readFile(path);
      if (c === null) return { pass: false, detail: path + ' missing' };
      if (c.trim().length === 0) return { pass: false, detail: path + ' is empty' };
      return { pass: true, detail: path + ' present (' + c.length + ' bytes)' };
    }
  });
}
```

**Spawn + skip classifier** (`check-phase-143.mjs:91-97`, required for the 157/158 leaves' python/node self-test spawns):
```javascript
const isMissing = err.code === 'ENOENT' || err.status === 127
  || stderr.includes('not found') || stderr.includes('Could not resolve');
if (isMissing) return { pass: true, skipped: true, detail: 'node not found -- skipped' };
```
D-38 pairs this with a hard, non-skipping `V-143-TOOLPRESENCE`-shape presence check on the tool file itself so absence-of-tool and absence-of-runtime are distinguished.

**Needle-attribution proof loop** (worked example, D-32, copy for any corpus-wide `== 0` needle):
```bash
for c in 8de413aa af678f0c ce9b0b73 2a46d32a bb22f89a 937d0a1f HEAD; do
  cnt=$(git grep -c "i\.e\." $c -- 'docs' 2>/dev/null | awk -F: '{s+=$NF} END{print s+0}')
  echo "$c: i.e. count = $cnt"
done
```
Every needle must be proved to fail in a scratch copy before it enters a plan (D-31).

**Anti-pattern:** no leaf spawns anything except the three named exceptions (154's `verify-meaning.py --self-test`, 157's python gate, 158's `audit-claimed-fixes.mjs --self-test`) — D-39.

---

### `scripts/validation/check-phase-159.mjs` (NEW apex)

**Analog:** `scripts/validation/check-phase-153.mjs` (immediately-prior apex, lines 148-234 chain guards, 264-291 AUDIT-HARNESS, 292-330 additive leg)

**Arithmetic pattern** (from `check-phase-153.mjs:149-151`, applied to N=159):
```javascript
const CHAIN_START = 48;
const CHAIN_END = 158;   // [48..158], apex excludes phase 159 itself
const CHAIN_PHASES = Array.from({ length: CHAIN_END - CHAIN_START + 1 }, (_, i) => CHAIN_START + i); // 111
const CHAIN_SKIP = new Set([]);        // V-159-SELF hard-asserts size===0
const CHAIN_EXTRA = [30, 31];
const HARNESS = 'scripts/validation/v1.22-milestone-audit.mjs';
const ARCHIVE_ROOT_TOKEN = 'v1.22-phases';
```
Total checks = 1 AUDIT + 111 chain + 2 CHAIN_EXTRA + 1 AUDIT-HARNESS + 1 V-159-HARN03 (replaces `check-phase-153`'s C17CARVEOUT-SUCCESSOR leg) + 1 SELF = **117** (D-29).

**AUDIT-HARNESS leg shape to copy for V-159-HARN03** (`check-phase-153.mjs:264-286`) — copy the shape but WITHOUT the `if (NESTED) return skip` branch, per D-25 ("a frozen harness has no evolved corpus to skip for"):
```javascript
checks.push({
  id: 'HARN03',
  name: 'V-159-HARN03: v1.21-milestone-audit.mjs exits 0 and references withDocsAtClose (frozen harness)',
  run() {
    if (!existsSync(join(process.cwd(), 'scripts/validation/v1.21-milestone-audit.mjs'))) {
      return { pass: false, detail: '... missing -- HARN03 regression' };
    }
    // NO NESTED-skip branch here (D-25)
    try {
      execFileSync('node', ['scripts/validation/v1.21-milestone-audit.mjs'], { stdio: 'pipe', timeout: 300000, cwd: process.cwd() });
      const src = readFileSync('scripts/validation/v1.21-milestone-audit.mjs', 'utf8');
      if (!src.includes('withDocsAtClose')) {
        return { pass: false, detail: 'HARN03 FAIL: harness converted signature absent (withDocsAtClose not referenced)' };
      }
      return { pass: true, detail: 'v1.21-milestone-audit.mjs exits 0 and is frozen-read converted' };
    } catch (err) { /* ... execFailDetail ... */ }
  }
});
```
**Anti-pattern (D-25):** never a NEGATIVE substring assertion about the v1.22 harness — that recreates the `V-140-C17CARVEOUT` defect (a negative claim about current content becomes false the moment the file is next edited, with nothing catching the regression). Positive presence/substring only.

---

### `.github/workflows/audit-harness-v1.22-integrity.yml` (NEW)

**Analog:** `.github/workflows/audit-harness-v1.21-integrity.yml` (16 jobs: `parse`, `path-match`, `harness-run`, `linux-chain-ubuntu-latest`, per-phase leaf jobs, `rotting-external-quarterly`, `pin-helper-advisory`, `frozen-read-probe`)

**Pattern:** mechanical per-job diff. New job count = 13 (5 leaves + 1 apex + 7 support), mirroring v1.20's 13-job precedent. `path-match` keeps the literal `SIDECAR_PATH` string grep (GOV-02). `frozen-read-probe` keeps no `needs:` key (`V-139-PROBEJOB` requires this). Every `actions/checkout@v4` step pairs 1:1 with `fetch-depth: 0`. Add `actions/setup-python@v5` (pinned 3.x) ONLY to the three jobs that transitively run `check-phase-157.mjs`: `linux-chain-ubuntu-latest`, `check-phase-157`, `check-phase-159`. Same triggers as v1.21 (`pull_request`, `schedule`, `workflow_dispatch`; never `push`).

**Verify:** `node scripts/validation/check-phase-139.mjs` must PASS against the new file (`V-139-PROBEJOB`, `V-139-FETCHDEPTH`) before committing.

---

### `scripts/hooks/pre-push.sh` (NEW)

**Analog:** `scripts/hooks/pre-commit.sh` (sibling hook, same directory, same install contract)

**Full analog source** (`scripts/hooks/pre-commit.sh`, read in full — 22 lines):
```bash
#!/usr/bin/env bash
# Pre-commit hook: fast JSON-parse check on audit allow-list sidecars.
# Install (manual, per-developer): cp scripts/hooks/pre-commit.sh .git/hooks/pre-commit && chmod +x .git/hooks/pre-commit
set -e

SIDECARS=(
  "scripts/validation/v1.4-audit-allowlist.json"
  "scripts/validation/v1.4.1-audit-allowlist.json"
)

for sidecar in "${SIDECARS[@]}"; do
  if [ -f "$sidecar" ]; then
    if ! node -e "JSON.parse(require('fs').readFileSync('$sidecar', 'utf8'))" 2>/dev/null; then
      echo "FAIL: $sidecar is not valid JSON" >&2
      exit 1
    fi
  fi
done

echo "pre-commit: audit allow-list JSON parse OK"
exit 0
```
**Reuse:** shebang, `set -e`, exit-code contract (0=allow, 1=reject with a `FAIL:`-prefixed stderr message), the "Install (manual, per-developer)" comment-line convention. **Differs:** pre-push reads stdin lines (`<local ref> <local sha> <remote ref> <remote sha>`), not a fixed file list — per D-08: skip deletions; when remote SHA is all-zero use `git rev-list "$ls" --not --remotes="$2"`, else `"$rs..$ls"`; reject if the range contains the full 40-char SHA of `9a114815` (exact-line-match grep, status checked explicitly); reject any `refs/archive/*` refspec.

---

### `scripts/hooks/README.md` (EDIT)

**Analog:** itself — existing `## pre-commit.sh` section (verified in full):
```markdown
## pre-commit.sh

Fast JSON-parse check on `scripts/validation/v1.4-audit-allowlist.json` and `scripts/validation/v1.4.1-audit-allowlist.json` before each commit.

Runtime: ~100ms (single `node -e` invocation per sidecar).

## Install (one-time per clone)

```bash
cp scripts/hooks/pre-commit.sh .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit   # Git Bash on Windows honors this
```

On PowerShell / cmd (Windows without Git Bash):
```powershell
Copy-Item scripts\hooks\pre-commit.sh .git\hooks\pre-commit
```

After install, every `git commit` runs the hook. To bypass in an emergency: `git commit --no-verify`.
```
**Pattern:** add a mirrored `## pre-push.sh` section with the same Install (bash + PowerShell variants) and an Uninstall line, per D-08. The existing "Why Not Husky / lefthook / pre-commit-framework?" section is the rationale precedent to cite, not duplicate — D-08 extends the same established pattern, it is not a new decision.

---

### `.gitattributes` (EDIT)

**Analog:** itself — the single existing line, read in full: `scripts/pipeline/reference.docx binary`

**Pattern:** append `* text=auto eol=lf` as a new line below the existing one (D-40). Verified this session: 0 CRLF-in-index files exist, so `git add --renormalize .` is a no-op; no blast-radius risk.

---

### `.claude/skills/jira-milestone/install-jira-milestone-hook.cjs` (commit untracked)

**Analog:** `.claude/hooks/jira-milestone-gate.cjs` (the tracked, adapted, LIVE hook — 7,075 bytes, counts ROADMAP rows because `STATE.total_phases` is stale)

**Pattern (D-67):** the installer's embedded `HOOK_B64` currently decodes to a DIFFERENT, generic hook (7,552 bytes, counts via `STATE.total_phases`). Before committing the installer, re-encode: `base64 -w0 .claude/hooks/jira-milestone-gate.cjs` → replace the installer's `HOOK_B64` constant, so the tracked tool and the tracked hook agree byte-for-byte.

---

## Shared Patterns

### Frozen-corpus read (cross-cutting: applies to `_lib` pin, v1.21 conversion, v1.22 fork)
**Source:** `scripts/validation/_lib/frozen-at-close.mjs` — `createFrozenCorpusReader`, `readAtClose`/`lsTreeAtClose`, `withDocsAtClose`, `frozenCause` error taxonomy
**Apply to:** every harness file this phase touches or creates. Never hand-roll a `git show sha:path` wrapper — the shared `frozenCause` taxonomy is what every downstream check depends on.

### Fail-loud sidecar absence
**Source:** `v1.20-milestone-audit.mjs` `parseAllowlist()` — `throw new Error(...D-07 fail-loud...)` on sidecar absence at the frozen SHA, never a silent `{}` fallback for the "file itself missing" case (only a JSON-parse-error path degrades gracefully).
**Apply to:** `v1.21-milestone-audit.mjs` conversion, `v1.22-milestone-audit.mjs` fork.

### Spawn safety (argument-array only)
**Source:** `v1.21-milestone-audit.mjs:29` (documented as "the repo's one process-level security control") and every `execFileSync('node', [PATH], {...})` call across `check-phase-*.mjs`.
**Apply to:** every new spawn in the 154-159 leaves and apex — argument-array form only, never a concatenated shell string.

### ENOENT/127 skip classifier + hard presence pairing
**Source:** `check-phase-143.mjs:91-97` (classifier) + `V-143-TOOLPRESENCE` shape (hard, non-skipping presence check on the tool file itself).
**Apply to:** `check-phase-157.mjs` (python gate spawn) and `check-phase-158.mjs` (`audit-claimed-fixes.mjs --self-test` spawn).

### Corpus-floor sentinel
**Source:** `check-phase-145.mjs:145-146` — `files.length < 250` → hard FAIL, not a vacuous pass, on any corpus-wide walk.
**Apply to:** every leaf in 154-158 that asserts a corpus-wide `== 0` count.

### Needle-attribution two-part proof
**Source:** RESEARCH.md Pattern 5 worked example (the `i.e.` loop across the six phase-boundary SHAs).
**Apply to:** every corpus-wide `== 0` needle across the five content leaves — proves the transition happened inside the owning phase's window AND stayed stable through every later boundary.

### Annotate-and-supersede (never rewrite planning-doc history)
**Source:** `.planning/REQUIREMENTS.md`/`ROADMAP.md` amendment-block precedents at lines 88-90, 121, 153, 237 (`**[SUCCESS-CRITERION AMENDMENT, D-NN]**` form).
**Apply to:** 159-01's five amendment blocks (D-51) and the close-gate's HARN-05/HARN-06 hand-flip note (D-28).

## No Analog Found

None. Every file this phase creates or edits has a direct, verified, tracked lineage predecessor (16-19 prior Path-A generations). This is explicitly the nature of the phase per RESEARCH.md: "every piece of infrastructure this phase needs already has 16-19 prior instances in this exact repository."

## Metadata

**Analog search scope:** `scripts/validation/`, `scripts/validation/_lib/`, `scripts/hooks/`, `.github/workflows/`, `.claude/hooks/`, `.claude/skills/jira-milestone/`, `.planning/milestones/v1.21-phases/153-*`, `.planning/milestones/v1.21-*.md`
**Files scanned:** 20 (all read this session or in the upstream RESEARCH.md pass; see RESEARCH.md "Sources → Primary" for the full read list)
**Pattern extraction date:** 2026-09-08
