#!/usr/bin/env python3
"""Every judgment-class term hit that sweep3 could actually edit, with context.

Usage: python prose.py GLOB [TERM ...]
       python prose.py "D:/claude/docs-google-style-test/decision-trees/*.md"
       python prose.py "D:/.../lifecycle/*.md" via above below

Why this exists alongside actionable.py: actionable.py filters check.py, and
check.py's word list is LOWERCASE ONLY. That blindness hid `admins` for four
batches and is still hiding capitalised `Admin` (see RESUME). This script does
not consult check.py at all -- it applies sweep3's own skip logic (frontmatter,
fences, indented code, headings, table rows, cited quotations, speech scripts)
and the PROTECT split, then reports every match of the term regex in what is
LEFT. If a hit shows up here, sweep3 can edit it; if it does not, sweep3 cannot,
and no TSV rule you write for it will ever fire.

Run it BEFORE authoring a TSV to build the worklist, and AFTER applying to prove
the class is closed. "LEFTOVERS: 0" is the batch-complete signal.

NOTE: paths must be Windows-style (D:/...). An MSYS /d/... path silently globs
to nothing and prints LEFTOVERS: 0 -- a false green.
"""
import sys
import re
import pathlib

sys.stdout.reconfigure(encoding="utf-8", errors="replace")
sys.path.insert(0, str(pathlib.Path(__file__).parent))
import sweep3 as S  # noqa: E402

DEFAULT_TERMS = [
    "via", "above", "below", "will", "WILL", "should", "would", "could",
    "just", "simply", "simple", "easily", "quick", "master", "actionable",
    "impact", "blast radius", "desired", "admin", "admins", "Admin", "Admins",
    "we", "We", "our", "Our", "Let's", "etc.", "vs.", "e.g.", "i.e.",
    "sign into", "config",
]


def hits(path, rx):
    lines = path.read_text(encoding="utf-8", errors="replace").split("\n")
    front = 0
    if lines and lines[0].strip() == "---":
        for j in range(1, len(lines)):
            if lines[j].strip() == "---":
                front = j
                break
    quoted = S.quoted_lines(lines)
    fenced = False
    for i, ln in enumerate(lines):
        if i <= front:
            continue
        if S.FENCE.match(ln):
            fenced = not fenced
            continue
        # An indented ">" is a list-continuation blockquote, not a code block.
        if fenced or re.match(r"^ {4,}(?!>)\S", ln):
            continue
        if i in quoted or S.HEADING.match(ln) or ln.lstrip().startswith("|"):
            continue
        if "Say to the user" in ln:
            continue
        segs, last = [], 0
        for m in S.PROTECT.finditer(ln):
            segs.append(ln[last:m.start()])
            last = m.end()
        segs.append(ln[last:])
        for seg in segs:
            for m in rx.finditer(seg):
                yield i + 1, m.group(), seg[max(0, m.start() - 85):m.end() + 50]


def main():
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    pattern = sys.argv[1]
    terms = sys.argv[2:] or DEFAULT_TERMS
    rx = re.compile(r"(?<![\w-])(" + "|".join(re.escape(t) for t in terms)
                    + r")(?![\w-])")
    root = pathlib.Path(pattern).parent
    files = sorted(root.glob(pathlib.Path(pattern).name))
    if not files:
        sys.exit("no files matched %r -- use a Windows path (D:/...), not /d/..."
                 % pattern)
    n, by_term = 0, {}
    for p in files:
        for line, term, ctx in hits(p, rx):
            n += 1
            by_term[term] = by_term.get(term, 0) + 1
            print(f"{p.name}:{line}|{term}|{ctx}")
    print()
    for t, c in sorted(by_term.items(), key=lambda kv: -kv[1]):
        print(f"  {c:5d}  {t}")
    print(f"LEFTOVERS: {n}  ({len(files)} files)")


if __name__ == "__main__":
    main()
