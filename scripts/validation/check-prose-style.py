#!/usr/bin/env python3
"""check-prose-style.py -- standalone STD-02 mechanical gate over exactly the slice that CAN
report zero on unprotected prose: anthropomorphism and person-first. vague-link and empty-alt
are recorded below, not gated, because they are STRUCTURALLY INCAPABLE of firing: check.py's
own mask_code() (check.py:66) substitutes over the "](...)" syntax both regexes require before
RULES (check.py:121) ever runs, destroying the bracket-paren sequence they need. Two of the
three rules this phase's own draft first chose were exactly these dead regexes -- the observed
zero was read as a clean corpus. A green from a dead regex is worse than no rule at all, which
is why this gate carries a `--self-test` that runs every time (D-11), rather than a one-time
perturb-and-restore: a file-count floor alone proves files were read, not that a rule can
match -- 294 scanned, 0 hits, PASS is exactly what a dead regex produces.

Usage:
  python scripts/validation/check-prose-style.py [--verbose]
  python scripts/validation/check-prose-style.py --self-test

Exit codes, normal mode:
  0  every assertion holds: anthropomorphism == 0, person-first == 0 after the sweep3
     protection filter and the two named exemptions below, all three HYG-02 leak needles
     (157-BASELINE.json `needles`) == 0, and the file-count floor matches the enumeration.
  1  any assertion above failed.
  A `git ls-files 'docs/*.md'` enumeration that returns zero files is a HARD FAILURE (exit
  non-zero, reason printed) -- never a false "0 findings" pass (D-11 / T-157-15). This mode
  never wraps the check.py or git subprocess calls in a try/except that would convert a crashed
  interpreter or a non-zero return into a false zero-findings pass.

Exit codes, --self-test mode:
  0  every synthetic-fixture assertion passed.
  1  any assertion failed.
  This mode never reads the corpus -- it writes its own fixtures to a temporary directory and
  deletes them before returning -- so it runs to completion even against an empty/absent tree.

Standalone. Registered in NO validator chain (check-phase-153.mjs or any other) and referenced
by no existing validator. NOT enforcing until Phase 159 (D-09) -- that phase promotes this into
a check-phase-157.mjs leaf and the CI job that runs it, and that job will need
`actions/setup-python` because none of the 18 existing workflows installs Python (D-10); this
file adds no `.github/workflows/` entry itself.

Why Python, not a `.mjs` matching the 132-file scripts/validation/ convention: D-03 and this
project's own research require the person-first protection filter be the REAL
scripts/docs-style/sweep3.py PROTECT regex and skip set, imported, never re-transcribed -- a
hand-rolled version of this filter inverted the rule on all four of its own findings during
this phase's draft and proposed falsifying a Windows OOBE string. Only Python lets this gate
import the real symbols instead of hand-porting ~40 lines of them into JavaScript, which is
exactly the reimplementation D-03 forbids. Claude's Discretion governs everything else about
this tool's internal structure, provided it is single-file, invokes check.py rather than
reimplementing it, carries `--self-test`, and enumerates via `git ls-files` -- all four hold.

-----------------------------------------------------------------------------------------------
PERMANENT EXCLUSION RECORD (STD-02 / STD-03). A future milestone re-opens one of these
deliberately; it never rediscovers the narrowing by re-litigating the same candidates as a
backlog. Every count below is UNPROTECTED, never raw, per D-05 (raw -> unprotected):
person-first 86 -> 0, em-dash-spaced 3,123 -> 832, directional 207 -> 96, latin-abbrev 61 -> 35,
future-tense 91 -> 40, passive 3,756 -> 2,790. Recording "person-first: 86, permanently
excluded" would defeat STD-03 in the other direction -- it is gated, not excluded, and its
gated count is 0.

  em-dash-spaced -- PERMANENTLY EXCLUDED. This repository's own validators content-match the em
    dash used as a table N/A placeholder, so the corpus's own gate requires what the style
    guide bars. Re-measured at this HEAD rather than copied from STD-02's "ten": 19 of the
    scripts/validation/v1.*-milestone-audit.mjs files contain a literal em dash. STD-02's "ten"
    is not wrong; it counted a narrower or earlier population than this needle.

  admin (Android class ONLY) -- PERMANENTLY EXCLUDED, per D-05. Google's own word-list.md
    self-contradicts across two DISTINCT entries: line 116 is a global "DON'T USE: admin"
    (2,220 hits); line 121 is a separate "DON'T USE: Android: administrator" (1,156 hits). This
    exclusion covers ONLY the Android entry. The two entries are never conflated.

  headings -- excluded per STYLE-04, but the TRUE mechanism, per D-06: `--no-headings` only
    adds "headings" to check.py's skip set (check.py:139-142), which suppresses heading-case
    and heading-punct. The nine STRUCTURAL rules -- including em-dash-spaced, latin-abbrev,
    passive, directional -- still run on heading lines: 142 hits land there (em-dash 128,
    latin-abbrev 8, passive 5, directional 1) at the time of the D-06 measurement. Do NOT read
    this as "headings are excluded via --no-headings" -- they are not, for those nine rules.
    By contrast scripts/docs-style/sweep3.py:199 skips heading lines outright.

  vague-link, empty-alt -- NOT GATED, because structurally incapable of firing (D-02). See the
    module docstring's opening paragraph for the mechanism. Do not record a weaker reason such
    as "they report zero" -- a dead regex reporting zero is not evidence of a clean corpus.

  D-15 (HYG-02 needle iii, the requirement-identifier arm) -- DROPPED, recorded as mechanically
    undecidable, by owner ruling. [MEASURED] `[A-Z]{2,6}-[0-9]{2}` over docs/ -> 149 distinct
    identifiers / 360 occurrences / 104 files, of which 129 of the 142 outside the meta
    directories are formal planning requirement identifiers -- but the same token carries both
    roles: OP-11 is a `.planning/research/PITFALLS.md` pitfall ID AND a published
    permission-matrix cell AND a callout header; DELEG-05 sits in a published top-level
    heading; STD-05, RE-237 and PITFALL-7 are published vocabulary; and UTF-8, UTF-16, OS-26,
    CD-07 and PHASE-45 are pure shape false positives. Enforcing it means editing published
    H1s, which changes the registry Title column that build-filename-map.mjs treats as the
    sole source of truth, and that build-publish-bundle.mjs fails closed on. This is a
    requirement reinterpretation and is recorded as one. Reversibility: one-way -- HYG-02's own
    text mandates catching "the class rather than the prefix"; dropping an arm is a documented
    narrowing a later milestone must re-open deliberately, not rediscover.

  D-18 (HYG-02, the "Phase NN" construction) -- OUT OF THE GATED CLASS for v1.22, by owner
    ruling, its census recorded here as a deferred item. [MEASURED] 666 occurrences on 607
    lines: body prose 332 (49.8%) across 95 files, Version History rows 198 (29.7%), other
    table rows 115, a legacy `## Changelog` heading 21. The exemption's originally stated
    ground -- "large majority inside Version History rows" -- was false twice over:
    EEE-SOP-standard.md mandates a Version History row whose canonical form is a MILESTONE
    token carrying zero phase numbers, and 351 of 527 VH rows across 251 files carry no
    "Phase NN" at all. Gating body prose would put this gate RED on 95 files at HEAD, past the
    HYG preamble's own bound of "defects that already carry a file and a line".

  HYG-02 two-tier leak rule -- stated as mechanics, not as a claim about publication. The
    literal `.planning/` needle is corpus-wide with NO directory exclusion (SC#4). The class
    needle -- `(ROADMAP|REQUIREMENTS|PITFALLS|FEATURES|RESEARCH|STACK|PLAN|SUMMARY)`, with and
    without `.md` -- excludes `docs/_standards/` and `docs/_registry/` because recording
    provenance is those documents' function. The literal arm's entire live surface before this
    phase (2 hits) sat inside the very directory the class arm excludes -- that is the fact
    that makes the two-tier layering worth documenting.
  [DATED 2026-09-08] The em-dash-spaced and directional pairs recorded above (both raw and unprotected halves) moved under Phase 158's corpus-wide em-dash sweep and are not re-derivable from this record; this gate's own assertions (`--self-test` plus a full run reporting PASS) read none of those figures and cannot detect that they are now stale.

This tool never wraps the check.py or git subprocess calls in a try/except that would convert a
crashed interpreter or a non-zero return into a false zero-findings pass (T-157-15). Argument
arrays only, never a shell string, for every subprocess invocation (T-157-14).
-----------------------------------------------------------------------------------------------
"""
import importlib.util
import pathlib
import re
import shutil
import subprocess
import sys
import tempfile

# ── Fixed locations, resolved by file location (never by an assumed cwd or by a git-derived
# repo root -- an empty-repo invocation must still find these two real files). ──────────────
_SCRIPT_DIR = pathlib.Path(__file__).resolve().parent          # scripts/validation/
_DEPS_ROOT = _SCRIPT_DIR.parent.parent                          # repository root
CHECKPY_PATH = _DEPS_ROOT / ".claude" / "skills" / "google-style" / "check.py"
SWEEP3_PATH = _DEPS_ROOT / "scripts" / "docs-style" / "sweep3.py"

# The three HYG-02 leak needles, verbatim from 157-BASELINE.json's `needles` object (plan 01).
# A divergence between the recorded regex and the one implemented here is a defect, not a
# refinement.
NEEDLES = {
    "literal": re.compile(r"\.planning/"),
    "fix11": re.compile(r"\.planning/research/|\.planning/phases/"),
    "class": re.compile(r"\b(ROADMAP|REQUIREMENTS|PITFALLS|FEATURES|RESEARCH|STACK|PLAN|SUMMARY)(\.md)?\b"),
}
# D-23: the class needle excludes the two provenance-recording meta directories. The literal and
# fix11 needles carry NO directory exclusion, corpus-wide, per SC#4 / D-20-D-21.
CLASS_EXCLUDED_DIRS = ("docs/_standards/", "docs/_registry/")

# The two named person-first exemptions (D-03/D-04), matched by path plus a stable literal
# substring of the line -- never by line number, which shifts. Both are must-not-edit.
EXEMPTIONS = [
    ("docs/operations/patch-management/05-linux-update-delivery.md",
     "unattended upgrades are switched on, so we are"),
    ("docs/cross-platform/apple-business/16-managed-apple-account-runbook.md",
     "Our organization is enabling federated authentication with Apple Business"),
]

HEADER_RE = re.compile(r"^== (.+): (\d+) candidate\(s\)$")
HIT_RE = re.compile(r"^  L(\d+)\s+\[([a-z-]+)\] (.*)$")


def _load_module(name, path):
    spec = importlib.util.spec_from_file_location(name, str(path))
    if spec is None or spec.loader is None:
        sys.exit("check-prose-style: cannot load %s from %s" % (name, path))
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


def import_deps():
    """Import RULES + mask_code from check.py and PROTECT/HEADING/FENCE/KEEP_LINE/quoted_lines
    from sweep3.py, both by file location. Fail loudly with the missing name on any gap --
    never fall back to a private copy of the regex (D-10)."""
    if not CHECKPY_PATH.exists():
        sys.exit("check-prose-style: check.py not found at %s" % CHECKPY_PATH)
    if not SWEEP3_PATH.exists():
        sys.exit("check-prose-style: sweep3.py not found at %s" % SWEEP3_PATH)
    checkpy = _load_module("_check_prose_style_checkpy", CHECKPY_PATH)
    sweep3 = _load_module("_check_prose_style_sweep3", SWEEP3_PATH)
    for name in ("RULES", "mask_code"):
        if not hasattr(checkpy, name):
            sys.exit("check-prose-style: check.py is missing required symbol %r" % name)
    for name in ("PROTECT", "HEADING", "FENCE", "KEEP_LINE", "quoted_lines"):
        if not hasattr(sweep3, name):
            sys.exit("check-prose-style: sweep3.py is missing required symbol %r" % name)
    return checkpy, sweep3


def repo_root_for_scan():
    """Resolve the repository root for corpus enumeration via `git rev-parse`, an argument
    array, failing loudly on a non-zero return rather than falling back to the cwd (D-12)."""
    try:
        out = subprocess.run(["git", "rev-parse", "--show-toplevel"],
                              capture_output=True, text=True)
    except OSError as e:
        sys.exit("check-prose-style: cannot run git: %s" % e)
    if out.returncode != 0:
        sys.exit("check-prose-style: git rev-parse --show-toplevel failed: %s"
                  % out.stderr.strip())
    return pathlib.Path(out.stdout.strip())


def enumerate_corpus(repo_root):
    """Enumerate with `git ls-files`, never a filesystem walk -- a walk's result depends on
    whether the author last ran the graphify skill (docs/graphify-out/ is 268 untracked,
    gitignored files) (D-12)."""
    try:
        out = subprocess.run(["git", "ls-files", "docs/*.md"], cwd=str(repo_root),
                              capture_output=True, text=True)
    except OSError as e:
        sys.exit("check-prose-style: cannot run git ls-files: %s" % e)
    if out.returncode != 0:
        sys.exit("check-prose-style: git ls-files failed: %s" % out.stderr.strip())
    return [line for line in out.stdout.split("\n") if line.strip()]


def run_checkpy(repo_root, files):
    """Invoke check.py with --no-headings and the enumerated file list, as an argument array,
    using the same interpreter running this gate. Never a shell string (D-10/T-157-14)."""
    argv = [sys.executable, str(CHECKPY_PATH), "--no-headings"] + files
    out = subprocess.run(argv, cwd=str(repo_root), capture_output=True, text=True)
    return out.stdout


def parse_checkpy_output(stdout):
    """Parse both shapes positionally, per D-10. Never substring-match a rule name against the
    note text -- the note is guidance prose sliced from word-list.md and a corpus or reference
    edit can collide with it. Returns (headers, hits)."""
    headers = []
    hits = []
    current_path = None
    for line in stdout.split("\n"):
        m = HEADER_RE.match(line)
        if m:
            current_path = m.group(1)
            headers.append((current_path, int(m.group(2))))
            continue
        m = HIT_RE.match(line)
        if m and current_path is not None:
            hits.append((current_path, int(m.group(1)), m.group(2), m.group(3)))
    return headers, hits


def person_first_regex(checkpy):
    for rid, rx, _note in checkpy.RULES:
        if rid == "person-first":
            return rx
    sys.exit("check-prose-style: person-first rule not found in check.py RULES")


def unprotected_person_first_in_file(rel_path, abs_path, sweep3, checkpy, person_first_re,
                                      exemptions):
    """Apply sweep3's own semantics, in sweep3's own order (D-03): drop a hit whose zero-based
    line index is in quoted_lines(); drop lines inside a fence, tracked by toggling on FENCE;
    drop lines matching 4+ leading spaces followed by a non-blockquote non-space character;
    drop lines matching HEADING; drop lines whose left-stripped form starts with a pipe; drop
    lines containing the agent-speech-script marker; drop lines matching KEEP_LINE; and drop a
    match whose start offset falls inside any PROTECT span on that line, where a span is closed
    on the left and open on the right (a match starting exactly at a span's first offset is
    protected; one starting exactly at the offset after a span ends is not).

    mask_code() replaces a matched span with same-length whitespace, so a match's offset in the
    masked line is the identical offset in the raw line -- PROTECT spans are computed on the raw
    line, exactly as sweep3.py itself does.
    """
    raw_text = abs_path.read_text(encoding="utf-8", errors="replace")
    raw_lines = raw_text.split("\n")
    masked_lines = checkpy.mask_code(raw_text)
    quoted = sweep3.quoted_lines(raw_lines)
    fenced = False
    unprotected, exempted = [], []
    for i, raw_ln in enumerate(raw_lines):
        if i in quoted:
            continue
        if sweep3.FENCE.match(raw_ln):
            fenced = not fenced
            continue
        if fenced or re.match(r"^ {4,}(?!>)\S", raw_ln):
            continue
        if sweep3.HEADING.match(raw_ln):
            continue
        if raw_ln.lstrip().startswith("|"):
            continue
        if "Say to the user" in raw_ln:
            continue
        if sweep3.KEEP_LINE.search(raw_ln):
            continue
        masked_ln = masked_lines[i]
        protect_spans = [(m.start(), m.end()) for m in sweep3.PROTECT.finditer(raw_ln)]
        for m in person_first_re.finditer(masked_ln):
            start = m.start()
            if any(s <= start < e for s, e in protect_spans):
                continue
            hit = (rel_path, i + 1, m.group().strip())
            exempt = any(rel_path == ex_path and ex_substr in raw_ln
                         for ex_path, ex_substr in exemptions)
            (exempted if exempt else unprotected).append(hit)
    return unprotected, exempted


def compute_unprotected_person_first(repo_root, sweep3, checkpy, files, exemptions):
    person_first_re = person_first_regex(checkpy)
    all_unprotected, all_exempted = [], []
    for rel in files:
        u, e = unprotected_person_first_in_file(rel, repo_root / rel, sweep3, checkpy,
                                                 person_first_re, exemptions)
        all_unprotected.extend(u)
        all_exempted.extend(e)
    return all_unprotected, all_exempted


def scan_needles(repo_root, files):
    """The literal and fix11 needles run corpus-wide with no directory exclusion. The class
    needle excludes docs/_standards/ and docs/_registry/ (D-23)."""
    counts = {"literal": 0, "fix11": 0, "class": 0}
    sites = {"literal": [], "fix11": [], "class": []}
    for rel in files:
        class_excluded = rel.startswith(CLASS_EXCLUDED_DIRS)
        text = (repo_root / rel).read_text(encoding="utf-8", errors="replace")
        for i, ln in enumerate(text.split("\n"), 1):
            if NEEDLES["literal"].search(ln):
                counts["literal"] += 1
                sites["literal"].append((rel, i))
            if NEEDLES["fix11"].search(ln):
                counts["fix11"] += 1
                sites["fix11"].append((rel, i))
            if NEEDLES["class"].search(ln) and not class_excluded:
                counts["class"] += 1
                sites["class"].append((rel, i))
    return counts, sites


def padlabel(s, width=78):
    return s if len(s) >= width else s + " " + "." * (width - len(s) - 1) + " "


def run_normal(verbose):
    checkpy, sweep3 = import_deps()
    repo_root = repo_root_for_scan()

    files = enumerate_corpus(repo_root)
    if not files:
        print("check-prose-style: git ls-files 'docs/*.md' returned no files -- empty "
              "enumeration. Refusing to report a false zero-findings pass; this is a hard "
              "failure, not a clean corpus.")
        return 1

    stdout = run_checkpy(repo_root, files)
    headers, hits = parse_checkpy_output(stdout)

    floor_ok = len(headers) == len(files)

    anthro_hits = sorted(h for h in hits if h[2] == "anthropomorphism")
    person_first_raw = sum(1 for h in hits if h[2] == "person-first")

    unprotected, exempted = compute_unprotected_person_first(repo_root, sweep3, checkpy, files,
                                                              EXEMPTIONS)
    unprotected.sort(key=lambda h: (h[0], h[1]))
    exempted.sort(key=lambda h: (h[0], h[1]))

    needle_counts, needle_sites = scan_needles(repo_root, files)
    for k in needle_sites:
        needle_sites[k].sort(key=lambda s: (s[0], s[1]))

    if verbose:
        for path, line, note in anthro_hits:
            print("anthropomorphism  %s:%d  %s" % (path, line, note))
        for path, line, text in unprotected:
            print("person-first      %s:%d  %r  (unprotected)" % (path, line, text))
        for path, line, text in exempted:
            print("person-first      %s:%d  %r  (named exemption, not counted)" % (path, line, text))
        for kind in ("literal", "fix11", "class"):
            for path, line in needle_sites[kind]:
                print("leak-%s  %s:%d" % (kind, path, line))

    assertions = [
        ("file-count floor: %d per-file headers == %d enumerated files" % (len(headers), len(files)),
         floor_ok),
        ("anthropomorphism == 0 (%d found)" % len(anthro_hits), len(anthro_hits) == 0),
        ("person-first unprotected == 0 (%d raw, %d named exemptions, %d unprotected)"
         % (person_first_raw, len(exempted), len(unprotected)), len(unprotected) == 0),
        ("leak needle 'literal' (.planning/) == 0 (%d found)" % needle_counts["literal"],
         needle_counts["literal"] == 0),
        ("leak needle 'fix11' (two-prefix) == 0 (%d found)" % needle_counts["fix11"],
         needle_counts["fix11"] == 0),
        ("leak needle 'class' (planning-artifact names) == 0 (%d found)" % needle_counts["class"],
         needle_counts["class"] == 0),
    ]

    print()
    ok = True
    for label, passed in assertions:
        tag = "PASS" if passed else "FAIL"
        print(padlabel(label) + tag)
        ok = ok and passed

    print("\ncheck-prose-style summary: %s"
          % ("all assertions PASS -- 0 findings across the gated slice" if ok
             else "one or more assertions FAILED"))
    return 0 if ok else 1


def self_test():
    checkpy, sweep3 = import_deps()
    person_first_re = person_first_regex(checkpy)

    passed = [0]
    failed = [0]

    def assert_case(label, condition):
        tag = "PASS" if condition else "FAIL"
        print(padlabel("[ST] " + label) + tag)
        if condition:
            passed[0] += 1
        else:
            failed[0] += 1

    tmpdir = tempfile.mkdtemp(prefix="check-prose-style-selftest-")
    try:
        tmp = pathlib.Path(tmpdir)

        # Case 1: anthropomorphism fires on a synthetic violation, matching its own regex
        # literally (check.py:38).
        f1 = tmp / "anthro.md"
        f1.write_text("The service knows which devices are enrolled.\n", encoding="utf-8")
        hits1 = checkpy.check(str(f1), words={}, skip={"headings"})
        assert_case("anthropomorphism fires on a synthetic violation",
                     any(rid == "anthropomorphism" for _line, rid, _note in hits1))

        # Case 2: person-first fires on a first-person-plural synthetic violation.
        f2 = tmp / "personfirst.md"
        f2.write_text("We recommend enabling encryption on every device.\n", encoding="utf-8")
        hits2 = checkpy.check(str(f2), words={}, skip={"headings"})
        assert_case("person-first fires on a first-person-plural synthetic violation",
                     any(rid == "person-first" for _line, rid, _note in hits2))

        # Case 3 + 4: the protection filter suppresses a quoted match and does NOT suppress an
        # unquoted match -- the paired positive/negative control that proves the filter is
        # doing work rather than returning empty (D-11: "a filter that suppressed everything
        # would fail here").
        f3 = tmp / "protect.md"
        quoted_line = 'Click "We are ready" to continue.\n'
        unquoted_line = "We recommend enabling encryption on every device.\n"
        f3.write_text(quoted_line + unquoted_line, encoding="utf-8")
        unprotected, _exempted = unprotected_person_first_in_file(
            "protect.md", f3, sweep3, checkpy, person_first_re, [])
        line1_hits = [h for h in unprotected if h[1] == 1]
        line2_hits = [h for h in unprotected if h[1] == 2]
        assert_case("protection filter SUPPRESSES a person-first match inside a quoted span",
                     len(line1_hits) == 0)
        assert_case("protection filter does NOT suppress a person-first match on unquoted prose",
                     len(line2_hits) >= 1)

        # Cases 5-7: each of the three leak needles fires on a synthetic line carrying all
        # three known-bad tokens at once.
        needle_line = "See .planning/research/PITFALLS.md for the full pitfall register."
        assert_case("leak needle 'literal' (.planning/) fires on synthetic line",
                     bool(NEEDLES["literal"].search(needle_line)))
        assert_case("leak needle 'fix11' (two-prefix) fires on synthetic line",
                     bool(NEEDLES["fix11"].search(needle_line)))
        assert_case("leak needle 'class' (PITFALLS[.md]) fires on synthetic line",
                     bool(NEEDLES["class"].search(needle_line)))
    finally:
        shutil.rmtree(tmpdir, ignore_errors=True)

    print("\nSelf-test: %d passed, %d failed" % (passed[0], failed[0]))
    return failed[0] == 0


def main(argv):
    if "--self-test" in argv:
        return 0 if self_test() else 1
    return run_normal(verbose="--verbose" in argv)


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
