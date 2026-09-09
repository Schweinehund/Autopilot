# Phase 157: STD + HYG — Authoring Standard & Corpus Hygiene - Pattern Map

**Mapped:** 2026-09-05
**Files analyzed:** 1 new tool + 3 tooling-doc edits + 1 pins edit + 1 standard-section edit + 9 wiring edits (CLAUDE.md + 8 templates) + ~14 corpus hygiene edit sites + 1 seed metadata edit
**Analogs found:** strong for the gate tool and the standard section; no analog for the `git ls-files` enumeration line; hygiene edits are in-place text corrections with no "pattern" beyond the surrounding file's own conventions

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|---|---|---|---|---|
| `scripts/validation/check-prose-style.mjs` (new, name is Claude's Discretion) | validator/gate | batch (subprocess invoke + parse) | `scripts/validation/check-nav-hub-links.mjs` | exact (only content-phase standalone-gate-with-`--self-test` precedent) |
| `.claude/skills/google-style/check.py` (docstring edit only) | utility (vendored) | transform | itself — edit its own module docstring | n/a, self-edit |
| `scripts/docs-style/RESUME.md` (edit) | doc/config | n/a | itself | n/a, self-edit |
| `scripts/docs-style/_CONTENT-PINS.txt` / `_PINNED-HEADINGS.txt` (add STD-heading pin) | config | n/a | existing STD-04/STD-05 pin rows in same files | exact |
| `docs/_standards/EEE-SOP-standard.md` (`## Prose Style Authoring Standard` new section) | doc (C17-governed standard) | transform (prose authoring) | STD-04 (`:402`) / STD-05 (`:456`) sections in the same file | exact |
| `CLAUDE.md` (project root, add authoring-standard pointer) | config/doc | n/a | none — file currently has zero authoring guidance | no analog, greenfield addition |
| `docs/_templates/*.md` (8 files, add pointer to the standard) | template | n/a | `docs/_templates/reference-template.md`'s existing top-of-file `<!-- ... TEMPLATE ... -->` comment-block convention | exact (all 8 share the same comment-block shape) |
| `docs/_glossary.md` (5 new H3 entries + Summary + Index + VH row) | doc (glossary, C17-governed) | CRUD (append) | Phase 149/150 additions in the same file (`### BIOS configuration and other settings`, `### DFCI`, etc.) | exact |
| `docs/_glossary-linux.md` (`unattended-upgrades` entry) | doc (glossary) | CRUD (append) | its own existing entries under the 5 mandatory H2s | exact |
| `docs/operations/00-index.md`, `docs/index.md`, `patch-management/00-overview.md` (HYG-01 5-platform fix) | doc (corpus prose) | transform (cell/text edit) | surrounding rows/paragraphs in same file | exact (in-file precedent) |
| `docs/operations/*` (HYG-02 leak-class removals, 10 clone sites + 47+9+6+1 research/planning citations) | doc (corpus prose) | transform (text removal) | the un-leaked sibling sentences in the same files | exact |
| `docs/_standards/EEE-SOP-standard.md:578,649` (drop `.planning/` path, keep provenance) | doc | transform | none needed — mechanical string edit | n/a |
| `docs/reference/macos-capability-matrix.md:70`, `admin-setup-apv2/03-device-preparation-policy.md:141` (HYG-03) | doc (frozen-pinned table) | transform (cell-only edit) | `02-etg-device-group.md:129`'s already-linked sibling row | exact |
| `patch-management/00-overview.md:101`, `01-windows-wufb-rings.md:76,101` (HYG-04 date fix) | doc | transform | the 8 already-correct `2025-06-17` citations elsewhere in the same files | exact |
| `patch-management/00-overview.md:79-86` (HYG-05) | doc | transform | `07-windows-autopatch.md:219-222`'s verbatim-correct Microsoft quote | exact |
| `.planning/seeds/SEED-001-*.md` (status flip) | config/metadata | CRUD (single-field update) | none needed — single YAML-like field edit | n/a |
| `.planning/REQUIREMENTS.md:62` (annotate-and-supersede) | doc (planning) | transform | Phase 154's annotate-and-supersede precedent (cited in CONTEXT canonical_refs, not re-read here — text-only precedent) | role-match |

## Pattern Assignments

### `scripts/validation/check-prose-style.mjs` (new gate tool)

**Analog:** `scripts/validation/check-nav-hub-links.mjs` (485 lines, read in full)

**Header/usage-comment pattern** (`check-nav-hub-links.mjs:1-19`):
```javascript
#!/usr/bin/env node
// check-nav-hub-links.mjs -- corpus-wide relative-link and anchor checker for docs/, excluding
// docs/_templates/ (...). Standalone validator -- no chained per-phase registration array...
//
// Usage:  node scripts/validation/check-nav-hub-links.mjs [--verbose] [--self-test]
// Exit 0: zero failures across the corpus-wide scan (normal mode), or all self-test assertions
//         pass (--self-test mode)
// Exit 1: at least one broken link/anchor found, or a self-test assertion failed

// Node built-ins ONLY -- zero external npm packages (matches scripts/validation/ convention)
import { readFileSync, existsSync, readdirSync, lstatSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import process from 'node:process';

const argv = process.argv.slice(2);
const VERBOSE = argv.includes('--verbose');
const SELF_TEST = argv.includes('--self-test');
```
Copy this shape verbatim (imports, flag parsing, header-comment discipline naming the exact D-NN decisions it encodes). Add `import { execFileSync } from 'node:child_process';` for the subprocess call — no existing `scripts/validation/*.mjs` file shells out to Python; this is a genuinely new addition, not a copy.

**Corpus enumeration — NO ANALOG, write fresh** (per D-12/D-13 in RESEARCH.md Pitfall 3): every existing validator (`check-nav-hub-links.mjs`, `c17-eee-contract.mjs`, `sweep3.py`) uses a recursive filesystem walk (`walkMd`/`rglob`), never `git ls-files`. Do not search further for a copyable precedent; write:
```javascript
const files = execFileSync('git', ['ls-files', 'docs/*.md'], { encoding: 'utf8' })
  .trim().split('\n');
```

**Subprocess invocation of `check.py` — NO ANALOG, write fresh, but follow the security convention already established** (RESEARCH.md Security Domain / V5): use an argument array, never a shell-interpolated string, matching how `check-nav-hub-links.mjs` and `c17-eee-contract.mjs` use `fs`/`child_process` primitives directly instead of `exec()`:
```javascript
const out = execFileSync('python', ['.claude/skills/google-style/check.py', '--no-headings', ...files],
  { encoding: 'utf8' });
```

**Positional hit-parsing pattern** (from `check.py:152`'s fixed print format, quoted in RESEARCH.md Code Examples — never substring-grep the rule name per D-10):
```javascript
// Fixed format from check.py:152 -- "  L%-5d [%s] %s"
const m = /^\s*L(\d+)\s+\[([a-z-]+)\]\s(.*)$/.exec(line);
if (m) {
  const [, lineNo, ruleId, note] = m;
}
```

**`--self-test` block pattern** (`check-nav-hub-links.mjs:310-322`, full shape read):
```javascript
// ── Self-test mode (c17-eee-contract.mjs --self-test analog) ────────────────────────────────
if (SELF_TEST) {
  let stPassed = 0, stFailed = 0;
  function stAssert(label, pass, detail) {
    const tag = pass ? 'PASS' : 'FAIL';
    process.stdout.write(padLabel('[ST] ' + label) + tag + (detail ? ' -- ' + detail : '') + '\n');
    if (pass) stPassed++; else stFailed++;
  }
  // one stAssert() call per synthetic case ...
  process.stdout.write('\nSelf-test: ' + stPassed + ' passed, ' + stFailed + ' failed\n');
  process.exit(stFailed > 0 ? 1 : 0);
}
```
For this gate, per D-11: feed a synthetic line per gated rule (e.g. a line containing `"the system wants to reboot"` for `anthropomorphism`, matching `check.py:38`'s literal regex `\bthe\s+(system|server|...)\s+(wants|knows|...)\b`) through `check.py` and assert it fires, for both `anthropomorphism` and `person-first`.

**Summary/exit-code pattern** (`check-nav-hub-links.mjs:478-485`, the tail of the file):
```javascript
process.stdout.write(
  `\ncheck-nav-hub-links summary: ${hubPresenceFailures.length} hub-presence failure(s), ` +
  `${corpusLinkFailures.length} corpus-link failure(s), ${allFailures.length} total\n`
);
process.exit(allFailures.length > 0 ? 1 : 0);
```
Copy this two-line "human-readable summary line, then a single `process.exit(N>0?1:0)`" shape for the gate's own pass/fail report.

**`_templates/` exclusion pattern** (`check-nav-hub-links.mjs:280`, referenced by D-31 but NOT applicable to this gate — the gate scopes to `git ls-files 'docs/*.md'` which already includes templates; the exclusion below is cited only as the reason NOT to rely on the link checker for the template→standard wiring):
```javascript
if (relPath.startsWith('docs/_templates/')) continue;
```

**The exact rules being gated** (`.claude/skills/google-style/check.py:38`, verified — CONTEXT's own `:37` citation is off by one line per RESEARCH.md Pitfall 1):
```python
("anthropomorphism", re.compile(r"\bthe\s+(system|server|app|application|code|program|API|service|script|tool)\s+(wants|knows|thinks|sees|believes|decides|likes|feels|understands|remembers)\b", re.I),
 "anthropomorphism.md: don't attribute human qualities to software"),
```
**CORRECTED 2026-09-05 during planning:** `person-first` is **not** a `word-list.md` entry — it is the **first** tuple in `check.py`'s `RULES` list, defined at lines 27-29 with the case-explicit regex `(?<![-\w])(?:[Ww]e|[Oo]urs?|us|Us|[Ll]et's|I'm|I've)(?![-\w])`. Verified by reading the source. The gate must apply `sweep3.py:64-67`'s `PROTECT`/skip semantics on top of `check.py`'s raw `person-first` **rule** hits, not invent its own filter (D-03). Measured during planning: this filter reduces 86 raw hits to exactly the 2 survivors D-03 names, and no others.

**`sweep3.py`'s protection semantics — copy verbatim, do not hand-roll** (`scripts/docs-style/sweep3.py`, lines 66-69 confirmed exact):
```python
PROTECT = re.compile(r"`[^`]*`|\]\([^)]*\)|https?://\S+|<[^>]+>"
                     r"|\"[^\"\n]{1,400}\""
                     r"|\b[\w-]+(?:\.[\w-]+)*\.(?:com|net|org|io|dev|gov|edu|mil)\b(?:/\S*)?")
HEADING = re.compile(r"^\s{0,3}#{1,6}\s")   # line 69
```

**Error handling:** No try/catch pattern exists in `check-nav-hub-links.mjs` — it fails loud by letting Node's own uncaught-exception path handle any I/O error, consistent with the "no accepted-violation baseline of any kind" doctrine stated in its header comment. Match this: do not wrap the `execFileSync` calls in a try/catch that swallows a `check.py` crash into a false "0 hits" pass (this is exactly the D-11 anti-vacuity concern).

---

### `docs/_standards/EEE-SOP-standard.md` (`## Prose Style Authoring Standard` new section)

**Analog:** the file's own STD-04 section (`:402-454`) and STD-05 section (`:456-581`), both read in full for shape.

**Section-boundary pattern** (confirmed via `grep -n "^## \|^---$"`): every top-level standard section is preceded by a bare `---` rule line, then `## <Name> (<STD-ID or none>)`:
```
400:---
402:## Mermaid-in-Enrolled-Classes Policy (STD-04)
...
454:---
456:## Admin Decision-Point Block Format (STD-05)
...
581:---
583:## C17 Enforcement Reference (Needle-Spec for Phase 115)
639:---
641:## Version History
```
Insert the new section as `---` + `## Prose Style Authoring Standard` (no ID per D-25) immediately before line 641's `---`/`## Version History` pair.

**Internal decision-block pattern** (`:407-451`, STD-04's body): `### D-NN: <short title>` subheadings, each followed by 1-3 paragraphs of prose stating the rule and its rationale — no blockquotes for normative "must"/"never" text (C17 assertion #12 hard-fails a joined top-level `>` run over 200 chars; the ~900-char blockquote at `google-style-verify/SKILL.md:104-121` is cited by D-27 as the shape to avoid). Example subheading shape:
```
### D-01: Text-equivalent conversion, not a carve-out

Every enrolled Mermaid diagram is **converted to a C17-compliant text equivalent**. This is a
conversion rule, not a permitted-exception carve-out for C17 assertion #1. ...
```

**Version History row pattern** (`docs/_glossary.md:328-338`, the same convention this file's own `## Version History` at `:641` uses): `| Date | Change | Author |` table, newest row on top, milestone/phase token inline in the Change cell, `Author` cell `--` or `—`:
```
| 2026-08-25 | Phase 150 (BIOS-05..BIOS-12): added ... | -- |
```
Use this shape for the `v1.22 STD-01..STD-04` attribution row per D-25 (the milestone token goes in the VH row, never in the heading itself).

**Pin-file entries to add** (`scripts/docs-style/_CONTENT-PINS.txt:103,139` and `_PINNED-HEADINGS.txt:72`, confirmed exact):
```
scripts/docs-style/_CONTENT-PINS.txt:103:## Mermaid-in-Enrolled-Classes Policy (STD-04)
scripts/docs-style/_CONTENT-PINS.txt:139:Admin Decision-Point Block Format (STD-05)
scripts/docs-style/_PINNED-HEADINGS.txt:72:## Mermaid-in-Enrolled-Classes Policy (STD-04)
```
Add a third line to each file with the new exact heading string `## Prose Style Authoring Standard`.

---

### `docs/_glossary.md` (5 new entries) / `docs/_glossary-linux.md` (1 new entry)

**Analog:** Phase 149/150's own additions in the same file — "shoehorn plus re-declare" precedent (D-45).

**Entry shape** (`docs/_glossary.md:183-189`, the DFCI entry read in full):
```markdown
### Device Firmware Configuration Interface (DFCI)

The Windows firmware management layer Intune reaches through a configuration service provider, addressing UEFI (BIOS) settings below the operating system. ...

> See also: [Secure Boot](#secure-boot) -- a UEFI firmware feature, not one of DFCI's eight setting categories; [UEFI CSP](#uefi-csp) -- the interface DFCI settings travel through.
```
`### <Term>` H3, one or more plain prose paragraphs, optional single-line `> See also:` cross-reference blockquote (well under C17's 200-char cap — the existing DFCI one is close to it per D-46, watch the budget on new entries).

**Alphabetical Index line** (`docs/_glossary.md:33`, one long pipe-delimited line — confirmed NOT strictly alphabetical at the tail, per D-47; match the existing convention, do not re-sort):
```
... | [Device Firmware Configuration Interface (DFCI)](#device-firmware-configuration-interface-dfci) | ...
```
Insert new `[Term](#slug)` entries at their alphabetically-plausible position among neighbors, same as existing entries — but do not attempt to fix the known-broken `ZTDID`/`ZTD` tail ordering elsewhere in the same line.

**Version History row + explicit non-advance of `last_verified`** (`docs/_glossary.md:330-332`, read in full — this is the load-bearing part of the pattern):
```
| 2026-08-25 | Phase 150 (BIOS-05..BIOS-12): added `### Sure Admin`, ... | -- |
| 2026-08-24 | Phase 149 (BIOS-02 / BIOS-04): added `### BIOS configuration ...` ... | -- |
| 2026-08-25 | Phase 149: `last_verified` deliberately NOT advanced for the 2026-08-24 additions. This file is on a 90-day review cycle, not the milestone's 60-day one ... Owner ruling, 2026-08-25; see D-63 | -- |
```
Copy this two-row shape exactly: one row naming what was added, one row (or an inline clause) stating `last_verified`/`review_by` were deliberately not advanced, citing this phase's own D-46.

**`## Summary` re-declaration** (`docs/_glossary.md:17`, category H2 list at `:37,43,109,226,238,264` — `Autopilot`, `Enrollment`, `Hardware`, `Network`, `Security`, `Deployment Modes`): amend the `## Summary` coverage sentence in the same commit as the new entries, per D-45 — this is the "re-declare" half of the precedent; do not add entries without touching Summary.

**`_glossary-linux.md` mandatory H2s** (per D-46/RESEARCH, `check-phase-49.mjs:199-214` `V-49-13`): Distro & Lifecycle, Agent & Service, Compliance & Encryption, Operations & Diagnostics, Cross-Platform Collisions — place `unattended-upgrades` under whichever of these fits (likely Agent & Service or Operations & Diagnostics), and respect `V-49-20`'s pinned reciprocal-link literal `[Linux Provisioning Glossary](_glossary-linux.md)`.

---

### `docs/_templates/*.md` (8 files) — wiring pointer to the standard

**Analog:** each template's own existing top-of-file HTML comment block (`docs/_templates/reference-template.md:1-15`, read in full):
```markdown
<!-- REFERENCE DOCUMENT TEMPLATE
     Usage: Copy this file as your starting point for any reference doc ...
     Rules:
     - Fill in last_verified and review_by dates at doc creation time (review_by = last_verified + 90 days)
     - The `1970-01-01 # TEMPLATE-SENTINEL` value on last_verified is a harness-skip sentinel —
       REPLACE with actual authoring date when copying this template
     - Fill in doc_id from docs/_registry/RE-index.md at doc creation time
     - Set owner to the person or role responsible for this document
     ...
-->
```
Add one new bullet to each of the 8 templates' `Rules:` list pointing at `docs/_standards/EEE-SOP-standard.md`'s new `## Prose Style Authoring Standard` section — same bullet-list style, same HTML-comment scope. Remember all 8 templates carry `doc_id: RE-[FILL-IN]` (the TEMPLATE-SENTINEL path) and are therefore C17-enrolled (D-31) — keep any added prose inside the existing comment block or plain paragraphs, never a new over-200-char blockquote.

**`CLAUDE.md`** has no analog (zero existing authoring guidance) — this is a greenfield addition; follow the file's own existing heading-and-prose style (plain `##`-level Markdown sections, no special template).

---

### Hygiene corpus edits (HYG-01 through HYG-07)

No copyable "pattern" beyond each site's own file — these are targeted text corrections. The applicable analog for each is the correct/uncorrected sibling text in the same document, all already located and quoted verbatim in `157-CONTEXT.md`/`157-RESEARCH.md` at the cited line numbers:
- HYG-01: `docs/operations/00-index.md:48,60` and `docs/index.md:320,330` are the already-correct 5-platform siblings to match at `:28,32` / `:305,309`.
- HYG-02: the un-leaked sentence templates elsewhere in the same files are the pattern; simply drop the leaking clause/citation.
- HYG-03: `docs/reference/macos-capability-matrix.md`'s row-neighbors and `02-etg-device-group.md:129`'s already-linked format (`[Microsoft Store (WinGet)](../operations/patch-management/08-windows-app-updates.md#eam-store-winget-routing)` — use the explicit `<a id="eam-store-winget-routing">` anchor at `08-windows-app-updates.md:251-252`, not the fragile double-hyphen slug, per D-39).
- HYG-04/05: the correct citations/quotes already in the same files (`05-enterprise-update-plan.md:95,106` for the date; `07-windows-autopatch.md:219-222` for the ring/group count).
- HYG-06/07: covered under the glossary and seed-file sections above.

## Shared Patterns

### Node built-ins only, no new dependencies
**Source:** `scripts/validation/check-nav-hub-links.mjs:22` comment: `// Node built-ins ONLY -- zero external npm packages (matches scripts/validation/ convention)`
**Apply to:** the new gate tool exclusively — use `node:fs`, `node:path`, `node:child_process`, `node:process`.

### Argument-array subprocess invocation (never shell-string interpolation)
**Source:** RESEARCH.md Security Domain / V5, confirmed as the existing convention across `check-nav-hub-links.mjs` and `c17-eee-contract.mjs` (neither uses `exec()` with an interpolated string).
**Apply to:** the gate tool's `check.py` invocation and its `git ls-files` invocation — always `execFileSync(cmd, [args])`.

### Standalone validator, no chain registration, header comment states scope + exit codes + provenance
**Source:** `check-nav-hub-links.mjs:1-19` full header block.
**Apply to:** the gate tool — the header comment must state (a) it is standalone and not yet in any chain per D-09, (b) exit-0/exit-1 semantics for both normal and `--self-test` modes, (c) the D-NN decisions it encodes (mirroring how the analog cites its own Phase-123/143 D-numbers).

### Standard-section boundary: `---` rule + `## Name` + `### D-NN:` decisions + Version History row
**Source:** `EEE-SOP-standard.md` STD-04/STD-05 sections, confirmed at `:400-402`, `:454-456`.
**Apply to:** the new `## Prose Style Authoring Standard` section only.

### Glossary "shoehorn plus re-declare": entry + Index + Summary + Version History row, `last_verified` untouched
**Source:** `docs/_glossary.md:183-189` (DFCI entry), `:33` (index), `:17` (Summary), `:330-332` (VH rows).
**Apply to:** all 5 new `docs/_glossary.md` entries and the 1 new `docs/_glossary-linux.md` entry.

## No Analog Found

| File/Change | Role | Data Flow | Reason |
|---|---|---|---|
| Corpus enumeration via `git ls-files` in the new gate tool | validator internals | batch | Confirmed by RESEARCH.md (Pitfall 3): every existing `scripts/validation/*.mjs` and `scripts/docs-style/*.py` file uses a recursive filesystem walk (`walkMd`/`rglob`), never `git ls-files`. Write this fresh — it is a 1-line `execFileSync` call, not a research risk. |
| Node → Python subprocess invocation (`execFileSync` calling `check.py`) | validator internals | request-response (subprocess) | No existing `scripts/validation/*.mjs` shells out to a Python script. Follow the argument-array security convention (Shared Patterns above) since there is no direct prior invocation to copy verbatim. |
| `CLAUDE.md` authoring-standard pointer | config/doc | n/a | File currently carries zero documentation-authoring guidance (confirmed: `grep -in "documentation\|authoring\|google-style" CLAUDE.md` returns only generic mentions). Greenfield addition — follow the file's existing plain-Markdown heading style, no dedicated analog section exists to copy. |
| `.planning/seeds/SEED-001-*.md` status-field edit | metadata | CRUD (single field) | Single YAML-frontmatter-like field flip (`status: planted` → `status: closed`); no code pattern needed. |

## Metadata

**Analog search scope:** `scripts/validation/` (all `.mjs`), `scripts/docs-style/` (`check.py`, `sweep3.py`, pin files), `docs/_standards/EEE-SOP-standard.md`, `docs/_glossary.md`, `docs/_glossary-linux.md`, `docs/_templates/*.md`
**Files scanned:** `check-nav-hub-links.mjs` (485 lines, read in full), `check.py` (targeted sections: rule tuples, `mask_code`, `main`), `sweep3.py` (`PROTECT`/`HEADING` lines), `EEE-SOP-standard.md` (heading map + STD-04/STD-05 bodies), `_glossary.md` (Summary/Index/DFCI entry/Version History), pin files (`_CONTENT-PINS.txt`, `_PINNED-HEADINGS.txt`), `reference-template.md` (frontmatter comment block)
**Pattern extraction date:** 2026-09-05

## PATTERN MAPPING COMPLETE
