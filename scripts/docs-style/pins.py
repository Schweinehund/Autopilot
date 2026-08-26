#!/usr/bin/env python3
"""Extract every em-dash string literal in the live validators that appears
VERBATIM in the docs corpus. Those are genuine content pins the sweep must not touch.

Uses a character scanner rather than a regex so quoting/escaping can't trip it.
"""
import pathlib

V = pathlib.Path('D:/claude/Autopilot/scripts/validation')
D = pathlib.Path('D:/claude/docs-google-style-test')
EM = '\u2014'


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


lits = set()
for f in sorted(V.glob('*.mjs')):
    for s in literals(f.read_text(encoding='utf-8', errors='replace')):
        if EM in s:
            lits.add(s)

docs = {p: p.read_text(encoding='utf-8', errors='replace')
        for p in D.rglob('*.md') if '.git' not in p.parts}

pins = []
for s in {x.strip() for x in lits if len(x.strip()) > 8}:
    hits = [p for p, t in docs.items() if s in t]
    if hits:
        pins.append((len(hits), s))
pins.sort(key=lambda x: (-x[0], -len(x[1])))

print("em-dash literals in live validators : %d" % len(lits))
print("present VERBATIM in docs (real pins) : %d" % len(pins))
print()
for n, s in pins:
    flat = s.replace('\n', ' | ')
    print("  %3dx  %s" % (n, flat[:125]))

out = pathlib.Path('D:/claude/_EMDASH-PINS.txt')
out.write_text('\n'.join(s.replace('\n', ' ') for _, s in pins), encoding='utf-8')
print()
print("wrote %s (%d pins)" % (out, len(pins)))
