#!/usr/bin/env python3
"""Extract EVERY validator string literal that appears verbatim in the corpus.

pins.py did this for em-dash literals only. The judgment batches change words
(admin, via, should, above/below, will), so the pin list has to cover any literal
a rewrite could break -- not just the ones with an em dash in them.

Usage: python pins2.py > _CONTENT-PINS.txt
"""
import pathlib
import sys
sys.stdout.reconfigure(encoding="utf-8", errors="replace")


def literals(src):
    """Yield the contents of every single/double/backtick-quoted run."""
    out, i, n = [], 0, len(src)
    while i < n:
        ch = src[i]
        if ch in ("'", '"', '`'):
            j, buf = i + 1, []
            while j < n and src[j] != ch:
                if src[j] == '\\' and j + 1 < n:
                    nxt = src[j + 1]
                    buf.append('\n' if nxt == 'n' else nxt)
                    j += 2
                    continue
                if src[j] == '\n' and ch != '`':
                    break
                buf.append(src[j])
                j += 1
            if j < n and src[j] == ch:
                out.append(''.join(buf))
                i = j + 1
                continue
        i += 1
    return out



V = pathlib.Path("D:/claude/Autopilot/scripts/validation")
D = pathlib.Path("D:/claude/docs-google-style-test")
MIN = 12  # shorter literals match too much to be meaningful pins

lits = set()
for f in sorted(V.glob("*.mjs")):
    for s in literals(f.read_text(encoding="utf-8", errors="replace")):
        s = s.strip()
        # a literal spanning lines can't pin a single doc line
        if len(s) >= MIN and "\n" not in s:
            lits.add(s)

docs = {p: p.read_text(encoding="utf-8", errors="replace")
        for p in D.rglob("*.md") if ".git" not in p.parts}

pins = sorted((s for s in lits if any(s in t for t in docs.values())), key=len, reverse=True)
for s in pins:
    print(s)
print("%d literals scanned, %d pinned" % (len(lits), len(pins)), file=sys.stderr)
