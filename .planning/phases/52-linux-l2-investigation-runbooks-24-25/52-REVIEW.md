---
phase: 52-linux-l2-investigation-runbooks-24-25
reviewed: 2026-04-27T00:00:00Z
depth: standard
files_reviewed: 4
files_reviewed_list:
  - scripts/validation/check-phase-52.mjs
  - docs/l2-runbooks/24-linux-log-collection.md
  - docs/l2-runbooks/25-linux-agent-investigation.md
  - docs/l2-runbooks/00-index.md
findings:
  critical: 0
  warning: 2
  info: 2
  total: 4
status: issues_found
---

# Phase 52: Code Review Report

**Reviewed:** 2026-04-27
**Depth:** standard
**Files Reviewed:** 4
**Status:** issues_found

## Summary

Phase 52 delivers two new Linux L2 runbooks (24, 25), a 22-check Node.js validator, and an append-only update to `00-index.md`. The validator runs cleanly (22/22 PASS). The runbook content is structurally sound: PITFALL guards are in place, the L2 audience contract is honored, and the append-only ordering in the index is correct.

Two issues require fixing before the phase is closed:

1. **Latent bug in the validator**: `\Z` is not a valid JavaScript regex escape. In JS, `\Z` silently degrades to the literal character `Z`. All six section-extraction and strip regexes in the validator use `\Z` as an end-of-string sentinel — they will stop matching at the first `Z` character in the section body rather than at end-of-string or the next heading. Phase 52 content happens to contain no `Z` characters in the affected sections, so all 22 checks currently pass. This dormancy makes the bug more dangerous, not less: the validator will silently produce wrong results the first time `Z` appears in a section.

2. **Broken glossary anchor links in both runbooks**: Five `../_glossary-linux.md#<anchor>` links use slugs that do not match any heading in the glossary. These links navigate to the correct file but silently fail to jump to the intended definition. V-52-18 does not catch this because it only verifies that at least one glossary link exists — it does not validate the anchor portion.

---

## Warnings

### WR-01: `\Z` is not a JS regex end-of-string anchor — all 6 section-boundary regexes are latently broken

**File:** `scripts/validation/check-phase-52.mjs:99, 115, 122, 183, 197, 213, 267`

**Issue:** JavaScript regex does not support `\Z`. In a JS `RegExp`, `\Z` is an unrecognized escape sequence and silently degrades to the literal character `Z`. The correct JS end-of-string anchors are `$` (with `m` flag: end-of-line) or `\z` (no flag: absolute end of string — but `\z` is also not standard JS; use `$` without `m` flag or restructure the pattern).

Every section-extraction regex in the validator uses `[\s\S]*?(?=^## |\Z)` — the lazy `[\s\S]*?` will stop at the first `Z` character in the section body rather than at the next `## ` heading or end of file. The same flaw appears in the `### Resolution` strip regex in V-52-17 (`/^### Resolution[\s\S]*?(?=^### |^## |\Z)/gm`).

**Currently dormant** because Phase 52's Trap sections and Decision Matrix sections happen to contain zero `Z` characters. The fix is one character per pattern.

Affected checks: V-52-06 (line 99), V-52-07 (lines 115, 122), V-52-08 (line 132 — uses whole-doc scan, less affected), V-52-12 (line 183), V-52-13 (line 197), V-52-14 (line 213), V-52-17 strip regex (line 267).

**Fix:** Replace `\Z` with `$` in each pattern. Because these regexes use the `m` flag, `$` matches end-of-line (which is correct: the section ends when a new `## ` heading starts at the beginning of a line). Drop the `m` flag on the lookahead portion only if you need true end-of-string, but the simpler fix is:

```js
// BEFORE (latent bug):
const trapA = c.match(/## Trap A:[\s\S]*?(?=^## |\Z)/m);

// AFTER (correct):
const trapA = c.match(/## Trap A:[\s\S]*?(?=^## |$)/m);
// Note: with /m flag, $ matches end-of-line, so this stops at the next ## heading OR end of last line
// If you need to handle trailing content after the last ## heading, use /s (dotAll) + lookahead:
// /## Trap A:[\s\S]*?(?=\n## |\n*$)/   (no /m flag needed for this form)
```

The cleanest fix for all six occurrences:

```js
// Section extraction pattern — remove \Z, use \n## for the boundary:
/## Trap A:[\s\S]*?(?=\n## |$)/

// Resolution strip pattern — remove \Z:
c.replace(/^### Resolution[\s\S]*?(?=^### |^## |$)/gm, '')
```

---

### WR-02: Five broken glossary anchor links across RB24 and RB25 (silent navigation failures)

**File:** `docs/l2-runbooks/24-linux-log-collection.md:102, 141` and `docs/l2-runbooks/25-linux-agent-investigation.md:109, 174`

**Issue:** Five `../_glossary-linux.md#<slug>` links reference anchors that do not exist in `docs/_glossary-linux.md`. The file loads correctly but the fragment identifier fails silently — the reader lands at the top of the glossary rather than the intended definition. The glossary's own index table (alphabetical-index section) documents the correct slugs.

| Location | Broken link | Correct anchor |
|----------|------------|----------------|
| RB24:102 | `#apt` | `#apt-repository` (heading: `### APT repository`) |
| RB24:141 | `#intune-portal` | `#intune-portal-package` (heading: `### intune-portal (package)`) |
| RB25:109 | `#deb-repository` | `#deb-package-format` (heading: `### deb (package format)`) |
| RB25:109 | `#snap` | **no entry exists** — the glossary has no `### snap` heading; link target is undefined |
| RB25:174 | `#intune-agent.timer` | `#intune-agenttimer` (dot stripped by GFM; glossary index confirms `#intune-agenttimer`) |

**Fix for RB24:102:**
```markdown
# BEFORE
See [dpkg](../_glossary-linux.md#dpkg) and [apt](../_glossary-linux.md#apt) for the Debian package t...

# AFTER
See [dpkg](../_glossary-linux.md#dpkg) and [APT repository](../_glossary-linux.md#apt-repository) for the Debian package t...
```

**Fix for RB24:141:**
```markdown
# BEFORE
See [intune-portal](../_glossary-linux.md#intune-portal) for the deb package context.

# AFTER
See [intune-portal](../_glossary-linux.md#intune-portal-package) for the deb package context.
```

**Fix for RB25:109:**
```markdown
# BEFORE
See [deb-repository](../_glossary-linux.md#deb-repository) and [snap](../_glossary-linux.md#snap) fo...

# AFTER
See [deb (package format)](../_glossary-linux.md#deb-package-format) and [snap]() fo...
```
For `#snap`: because no glossary entry exists, either (a) add a `### snap` entry to `_glossary-linux.md` or (b) link to `packages.microsoft.com#` or remove the glossary link and use inline prose. Option (a) is recommended given that `snap` is a key concept for the PITFALL-3 negative-space check.

**Fix for RB25:174:**
```markdown
# BEFORE
See [systemd](../_glossary-linux.md#systemd) and [intune-agent.timer](../_glossary-linux.md#intune-agent.timer)

# AFTER
See [systemd](../_glossary-linux.md#systemd) and [intune-agent.timer](../_glossary-linux.md#intune-agenttimer)
```

---

## Info

### IN-01: Validator gap — V-52-18 verifies glossary link presence but not anchor validity

**File:** `scripts/validation/check-phase-52.mjs:288`

**Issue:** The V-52-18 check (`/\.\.\/_glossary-linux\.md#[a-z0-9-]+/`) only verifies that at least one `_glossary-linux.md#<something>` link exists in each runbook. It does not check whether the anchor portion actually maps to a heading in the glossary. This is why WR-02's five broken anchors all passed V-52-18 undetected. Additionally, the character class `[a-z0-9-]` excludes `.` so it matches `#intune-agent` (truncating at the dot) rather than the full `#intune-agent.timer` token.

**Fix (optional — for a future phase):** Extend V-52-18 to cross-reference extracted anchors against a glossary heading slug list. Alternatively, add a dedicated V-52-23 check:

```js
{
  id: 23, name: "V-52-23: all _glossary-linux.md anchors in new runbooks resolve to real headings",
  run() {
    const glossary = readFile("docs/_glossary-linux.md");
    if (!glossary) return { pass: false, detail: "glossary missing" };
    // Build slug set from headings
    const slugs = new Set(
      (glossary.match(/^#{2,3} .+$/gm) || []).map(h =>
        h.replace(/^#+\s+/, '').toLowerCase()
          .replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-')
      )
    );
    const failures = [];
    for (const f of NEW_CONTENT_FILES) {
      const c = readFile(f);
      if (!c) continue;
      const anchors = [...c.matchAll(/\.\.\/_glossary-linux\.md#([^\s)"']+)/g)].map(m => m[1]);
      anchors.forEach(a => { if (!slugs.has(a)) failures.push(f + ": broken anchor #" + a); });
    }
    if (failures.length > 0) return { pass: false, detail: failures.join(" | ") };
    return { pass: true, detail: "all glossary anchors resolve" };
  }
}
```

---

### IN-02: Prose clarity — Section 1.4 of RB24 states `--user` is "mutually exclusive with sudo" immediately before a code block that uses `sudo journalctl`

**File:** `docs/l2-runbooks/24-linux-log-collection.md:94`

**Issue:** Section 1.4 documents the `--user` flag as "mutually exclusive with `sudo` per the read-vs-write apt distinction." Two lines above (line 86) there is `sudo journalctl -u microsoft-identity-device-broker` — where `-u` is the `--unit` flag (not `--user`). The two flags are unrelated, so there is no actual contradiction. However, a reader scanning the flags table might reasonably interpret "mutually exclusive with sudo" as a blanket prohibition on `sudo journalctl`, then be confused by the code block six lines earlier.

**Fix:** Tighten the prose to specify the exact combination being excluded:

```markdown
# BEFORE
- `--user`: scope flag for user-instance services; mutually exclusive with `sudo` per the read-vs-write apt distinction

# AFTER
- `--user`: scope flag for user-instance services; do not combine with `sudo` (user-scope systemd is per-user, not root — `sudo journalctl --user` would query root's user session, not the enrolled user's). Note: `sudo journalctl -u <unit>` (system-scope journal) is a separate command using `--unit`, not `--user`, and is permitted for system-scope broker queries.
```

---

## Recommendation

**Minor fixes required before close.** The two warnings (WR-01 and WR-02) are real defects:

- **WR-01** is a latent validator correctness bug that will produce false-pass results as soon as any future content adds a `Z` character to a Trap section or Resolution block. Fix is mechanical (replace `\Z` with `$` in six regex literals).
- **WR-02** breaks reader navigation to glossary definitions. The `#snap` case also reveals a missing glossary entry. Fixes are straightforward string substitutions plus one optional glossary addition.

Neither issue blocks the runbook content from being usable — the prose is correct and the commands are accurate. The validator is still structurally sound (all 22 assertions are correctly designed; only the boundary regex has the `\Z` defect). Fix WR-01 and WR-02 and the phase is clean.

---

_Reviewed: 2026-04-27_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
