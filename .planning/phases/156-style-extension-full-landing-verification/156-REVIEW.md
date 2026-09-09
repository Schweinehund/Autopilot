---
phase: 156-style-extension-full-landing-verification
reviewed: 2026-09-05T06:39:27Z
depth: standard
files_reviewed: 17
files_reviewed_list:
  - docs/operations/firmware-bios/00-overview.md
  - docs/operations/firmware-bios/01-windows-dfci.md
  - docs/operations/firmware-bios/02-dell-bios-configuration.md
  - docs/operations/firmware-bios/03-hp-bios-configuration.md
  - docs/operations/firmware-bios/04-lenovo-bios-configuration.md
  - docs/operations/patch-management/07-windows-autopatch.md
  - docs/operations/patch-management/08-windows-app-updates.md
  - docs/recipes/01-shared-windows-avd-client.md
  - docs/recipes/05-enterprise-update-plan.md
  - docs/recipes/06-walk-up-avd-kiosk-autologon.md
  - docs/reference/firmware-oem-matrix.md
  - scripts/docs-style/_DISPOSITIONS-batch10.tsv
  - scripts/docs-style/_JUDGE-VERDICTS-batch10.json
  - scripts/docs-style/judge-packets.py
  - scripts/docs-style/pins2.py
  - scripts/docs-style/subs-batch10.tsv
  - scripts/docs-style/subs-emdash-batch10.tsv
findings:
  critical: 1
  warning: 6
  info: 2
  total: 9
status: issues_found
---

# Phase 156: Code Review Report

**Reviewed:** 2026-09-05T06:39:27Z
**Depth:** standard
**Files Reviewed:** 17
**Status:** issues_found

## Summary

Reviewed the tooling half (`judge-packets.py`, `pins2.py`, and the three batch-10 TSV/JSON
artifacts) and the prose half (11 Markdown files mechanically rewritten by the admin/sign-into and
em-dash substitution passes) at standard depth.

The prose pass produced one confirmed content-corruption defect: the `admin`→`administrator`
regex in `subs-batch10.tsv` has no exception for the proper noun "HP Sure Admin," and it corrupted
two HP page-title references in `firmware-oem-matrix.md` into a product name ("HP Sure
Administrator") that does not exist, while the identical phrase survives correctly everywhere else
in the same corpus. This is a real technical-identifier corruption, not a style nit, and it directly
matches the class of defect this review was asked to hunt for.

The tooling half is largely sound — the git-returncode check on `BASE`, the empty-bin handling, and
the deterministic-ordering fix in `pins2.py` all do what their comments claim — but `judge-packets.py`
has one silent-failure path (`repo_root_of` swallows a failed `git rev-parse`) that is exactly the
"confident wrong reading instead of an error" failure mode the phase is trying to avoid, plus two
smaller robustness gaps. `pins2.py`'s literal-escape handling has a narrow but real correctness bug
that can cause it to silently under-pin (miss) a validator literal containing an escape sequence
other than `\n`.

Separately, cross-checking the shipped `subs-emdash-batch10.tsv` regexes against the actual file
content shows the em-dash tightening pass was applied far more narrowly than the TSV's own header
comment implies: dozens of spaced em dashes in list links, table cells, `**Source:**` lines, and
headings match the shipped regex (verified by running it) yet were never touched. That is a
completeness/consistency gap in the mechanical pass, not a meaning change, but it undercuts the
"fully verified full landing" framing this phase is closing out.

## Critical Issues

### CR-01: The `admin`→`administrator` substitution corrupted the proper noun "HP Sure Admin" into a nonexistent product name

**File:** `docs/reference/firmware-oem-matrix.md:183-185`

**Issue:** `subs-batch10.tsv` row 33 is:

```
(?<![\w-])admin(?!\s+center)(?![\w-])	administrator
```

Its only carve-out is "admin center." It has no exception for the proper noun **HP Sure Admin**
(the actual name of HP's certificate-based BIOS authentication product, cited correctly dozens of
times elsewhere in this exact corpus, e.g. `03-hp-bios-configuration.md`: "HP Sure Admin / EBAM,"
"Secure BIOS with HP Sure Admin and CMSL," "HP Sure Admin step-by-step"). In
`firmware-oem-matrix.md`'s Source Attribution section, this rule fired against two instances of
that proper noun. The rendered (soft-line-break-joined) text now reads:

> "...checked HP's developer-portal pages Secure BIOS with HP Sure **Administrator** and CMSL, HP
> Secure Platform Management and HP Client Management Script Library, and HP Sure **Administrator**
> step-by-step—none documents a recovery path for a lost Endorsement Key, as of 2026-08-25."

Both "HP Sure Admin and CMSL" and "HP Sure Admin step-by-step" are the literal titles of HP
developer-portal pages that are correctly cited by name elsewhere in this same corpus (compare
`03-hp-bios-configuration.md`'s `**Source:** [Secure BIOS with HP Sure Admin and CMSL]` and its
External References entry `[HP Sure Admin step-by-step (HP)]`). This is not a style choice — it
renames a first-party product/document and makes the citation unrecognizable against its own
source. Confirmed via `git diff` against the target `BASE` and by grepping the shipped file; the
identical phrase is untouched everywhere else in the corpus (`firmware-oem-matrix.md:55,114,154-155,175`
still correctly read "HP Sure Admin"), so this is a localized, reproducible miss rather than an
intentional rename.

**Fix:** Add a "Sure Admin" exception to the regex, the same way "admin center" is already excluded,
and re-run the substitution only against the two corrupted lines (or re-derive the TSV row and
re-sweep):

```
(?<![\w-])admin(?!\s+center)(?!\s+Admin)(?![\w-])	administrator
```

(or, more robustly, add a dedicated negative lookahead for `Sure Admin` specifically:
`(?<![\w-])admin(?!\s+center)(?!(?<= )Admin\b)...` — simplest is a pre-pass exception list). Then
hand-fix `docs/reference/firmware-oem-matrix.md:184-185` back to "HP Sure Admin and CMSL" / "HP
Sure Admin step-by-step."

## Warnings

### WR-01: `judge-packets.py` `repo_root_of` swallows a failed `git rev-parse` and silently returns the wrong root

**File:** `scripts/docs-style/judge-packets.py:42-45`

**Issue:**

```python
def repo_root_of(root):
    r = subprocess.run(["git", "rev-parse", "--show-toplevel"], cwd=root,
                       capture_output=True, text=True)
    return pathlib.Path(r.stdout.strip())
```

Unlike `changed_files` (which was just hardened in this phase to check `r.returncode != 0` and
`raise SystemExit` on a failed `git diff`), `repo_root_of` never checks `r.returncode`. If `git
rev-parse --show-toplevel` fails for any reason (not a git repo, a Windows "detached filesystem"/
safe.directory rejection, git missing from PATH), `r.stdout` is `""`, and this function silently
returns `pathlib.Path(".")` — the current working directory — instead of erroring. `changed_files`
then computes `walk_rel` relative to that wrong root, which can silently mis-scope which files are
considered "in the walk root" with no error printed at all. This is precisely the failure mode the
phase is trying to eliminate elsewhere in this same file (a confident-but-wrong reading instead of a
loud failure).

**Fix:**

```python
def repo_root_of(root):
    r = subprocess.run(["git", "rev-parse", "--show-toplevel"], cwd=root,
                       capture_output=True, text=True, encoding="utf-8", errors="replace")
    if r.returncode != 0:
        raise SystemExit("judge-packets: git rev-parse --show-toplevel failed: %s" % r.stderr.strip())
    return pathlib.Path(r.stdout.strip())
```

### WR-02: `changed_files` splits git output on whitespace, not lines

**File:** `scripts/docs-style/judge-packets.py:68`

**Issue:** `return [f for f in r.stdout.split() if f.endswith(".md") and in_walk_root(f)]` uses
`str.split()` (splits on any run of whitespace) on the output of `git diff --name-only`. Any changed
path containing a space would be silently split into two bogus "files," neither of which resolves,
so the real file is dropped from the packet run with no error message — the file is simply absent
from the judge worklist. Not triggered by the current corpus's filenames, but it is a real latent
gap in a tool whose whole job this phase is to make more trustworthy.

**Fix:** Use `r.stdout.splitlines()` instead of `r.stdout.split()`.

### WR-03: Inconsistent subprocess text-decoding between `git_show` and the other two subprocess calls

**File:** `scripts/docs-style/judge-packets.py:36-38, 43-44, 62-63`

**Issue:** `git_show` explicitly passes `encoding="utf-8", errors="replace"`. `repo_root_of` and
`changed_files`'s `git diff --name-only` call use `text=True` with no `encoding=`, which falls back
to `locale.getpreferredencoding()` — cp1252 on the Windows environment this script was just patched
to survive at the stdout layer (`sys.stdout.reconfigure(...)` at line 29). If git ever emits a
non-ASCII byte in a path or in `--show-toplevel` output on this platform, these two calls can raise
`UnicodeDecodeError` where `git_show` would not.

**Fix:** Pass the same `encoding="utf-8", errors="replace"` to both subprocess calls for
consistency with `git_show`.

### WR-04: `pins2.py` literal scanner mishandles escape sequences other than `\n`

**File:** `scripts/docs-style/pins2.py:23-26`

**Issue:**

```python
if src[j] == '\\' and j + 1 < n:
    nxt = src[j + 1]
    buf.append('\n' if nxt == 'n' else nxt)
    j += 2
    continue
```

Only `\n` is decoded to its actual character; every other escape (`\t`, `\r`, `\\`, `\'`, `\"`, or a
regex-source `\d`/`\s` inside a validator literal) has its backslash silently dropped and the
*escaped character itself* appended literally — e.g. `\t` becomes the letter `t`, not a tab. Since
this script's whole job is "extract every validator string literal that appears verbatim in the
corpus" so that a later sweep won't clobber a pinned string, any validator literal containing `\t`,
`\r`, or another non-`n` escape will be reconstructed *incorrectly* and will therefore never match
the doc text it's supposed to protect — a silent false negative (an unprotected pin), which is the
exact failure class this tool exists to prevent.

**Fix:** Extend the escape map instead of special-casing only `\n`:

```python
ESCAPES = {'n': '\n', 't': '\t', 'r': '\r'}
...
buf.append(ESCAPES.get(nxt, nxt))
```

### WR-05: `subs-batch10.tsv` row 33's `admin` regex is over-broad for any text abutting a domain-like continuation

**File:** `scripts/docs-style/subs-batch10.tsv:33`

**Issue:** `(?<![\w-])admin(?!\s+center)(?![\w-])` treats any non-word/non-hyphen character
following "admin" as a valid match boundary, including `.`. The corpus contains literal text like
`` `admin.hp.com` `` (`docs/operations/firmware-bios/00-overview.md:49,61`; `03-hp-bios-configuration.md:31,51,257`)
and a first-party quotation containing plain-text "admin.hp.com" with no backticks
(`03-hp-bios-configuration.md:312`, inside a blockquote). Running the shipped regex against those
exact strings (verified directly) converts them to `administrator.hp.com`, which would both break a
literal hostname reference and — for the blockquote instance — silently rewrite a first-party
quotation, the exact citation-fabrication risk the TSV's own header comment (`subs-batch10.tsv:9-19`)
says this batch was designed to avoid. None of these sites were actually touched in this run
(confirmed unchanged in the diff), which means the rule is not currently being applied blindly
against the whole file — but the regex as written, taken at face value, does not itself prevent this
outcome, and the TSV's own comment claims the three rows are safe "by construction," which is only
true for the `08-windows-app-updates.md:266` citation, not for `admin.hp.com`.

**Fix:** Add a lookahead guard against a following `.` (or more generally, non-space punctuation that
signals a compound token rather than a standalone word), e.g.
`(?<![\w-])admin(?!\s+center)(?![\w.\-])`, and document the domain-name exclusion the same way the
`admin center` exclusion is documented at the top of the file.

### WR-06: Em-dash tightening pass (subs-emdash-batch10.tsv) applied far more narrowly than the file's own guard rules imply

**Files:** `docs/operations/firmware-bios/02-dell-bios-configuration.md:200`,
`docs/operations/firmware-bios/04-lenovo-bios-configuration.md:97,128,176,225,239`,
`docs/operations/firmware-bios/00-overview.md:239,242,244,246,248,251,253,256,257` (and similar
lines across the other 8 reviewed docs)

**Issue:** Running the shipped `subs-emdash-batch10.tsv` pattern
`(?<=[^\s*])\s+—\s+(?=\S)` directly against lines still present in the final files confirms it
matches and would tighten dozens of spaced em dashes that were never touched — list-item links
(`- [Device Firmware Configuration Interface (DFCI)](01-windows-dfci.md) — DFCI mechanics,`),
`**Source:** [...] — Lenovo CDRT, updated ...` attribution lines, level-3 headings
(`### Supervisor password lost — a documented, destructive path`), and table cells. The clearest
single proof is `02-dell-bios-configuration.md`'s own numbered Recovery list: items 3 and 6 in that
list had their mid-sentence em dashes tightened ("Unrecoverable through Intune—contact Dell
directly", "password forgotten—unrecoverable"), but item 1's identically-shaped mid-sentence em dash
("Retrieve it using Graph beta `hardwarePasswordDetails` — the") was left spaced, even though the
character immediately preceding it (a backtick) satisfies the same `(?<=[^\s*])` guard the comment
describes. The TSV's header comment (`subs-emdash-batch10.tsv:1-2`) frames this as "the em-dash
tightening pass," but the actual result is a partial, inconsistent pass — many matching sites in the
same files were left alone with no guard in the TSV explaining why. This doesn't change meaning, but
it leaves the corpus in a visibly inconsistent house style and overstates what this phase's em-dash
work actually covered.

**Fix:** Either re-run the three em-dash rules against the full file set with no additional
undocumented exclusions, or — if the omissions are intentional (e.g., an out-of-band decision to
skip list items, `**Source:**` lines, and headings) — add that scoping as an explicit, testable rule
in the TSV's header comment so a future maintainer doesn't assume "every spaced em dash not preceded
by `*`/whitespace was tightened," which is not what shipped.

## Info

### IN-01: `judge-packets.py` alignment can map two different baseline lines to the same new-file line

**File:** `scripts/docs-style/judge-packets.py:88-100`

**Issue:** Within a `replace` opcode block, each old line index picks its own independent
best-similarity match among the new lines in the same block (`best = max(cands, key=lambda j:
...ratio())`), with no bookkeeping to prevent two different old lines from both being paired with
the same new line. In an uneven-length replace block this can attribute the same "after" context to
two different "before" packets, which would present a judge with a slightly misleading pairing. Not
observed to fire in this corpus's 0-hunk result, but worth a one-to-one (e.g., Hungarian-algorithm-
lite greedy-without-reuse) tie-break if this script is later run on a batch that does produce real
packets.

### IN-02: "Ask the admin:" decision-callout labels are inconsistent with the admin→administrator rule applied to surrounding prose

**File:** `docs/recipes/05-enterprise-update-plan.md:79,130,201,271,368` (and similar callouts
elsewhere in the reviewed set)

**Issue:** The bolded callout label `> **Ask the admin:**` appears five times in this one file alone,
always as plain lowercase "admin" used as a role noun — the same usage the admin→administrator rule
converts everywhere else in the identical sentences (e.g. line 201's own callout ends with
"...should every driver wait for an **administrator's** explicit approval?", one sentence after
"**Ask the admin:**" itself). This may be an intentional, corpus-wide fixed-label convention (the
callout format is reused verbatim across many files outside this batch's scope), in which case no
action is needed — but if it's meant to be swept too, it's a residue site the batch-10 admin rule
did not reach, since the rule's own regex would match "admin" in "Ask the admin:" (verified: not
"admin center", not adjacent to `[\w-]`).

---

_Reviewed: 2026-09-05T06:39:27Z_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
