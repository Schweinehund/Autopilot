#!/usr/bin/env python3
"""Corpus-wide prose.py. Usage: python prose_all.py ROOT [TERM ...]"""
import sys, re, pathlib
sys.stdout.reconfigure(encoding="utf-8", errors="replace")
sys.path.insert(0, str(pathlib.Path(__file__).parent))
import prose as P
import sweep3 as S

root = pathlib.Path(sys.argv[1])
terms = sys.argv[2:] or P.DEFAULT_TERMS
rx = re.compile(r"(?<![\w-])(" + "|".join(re.escape(t) for t in terms) + r")(?![\w-])")
files = sorted(p for p in root.rglob("*.md")
               if ".git" not in p.parts and not p.name.startswith("_PASSIVE"))
n, by_term = 0, {}
for p in files:
    for line, term, ctx in P.hits(p, rx):
        n += 1
        by_term[term] = by_term.get(term, 0) + 1
        print(f"{p.relative_to(root).as_posix()}:{line}|{term}|{ctx}")
print()
for t, c in sorted(by_term.items(), key=lambda kv: -kv[1]):
    print(f"  {c:5d}  {t}")
print(f"LEFTOVERS: {n}  ({len(files)} files)")
