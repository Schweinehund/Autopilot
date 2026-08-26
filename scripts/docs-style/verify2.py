#!/usr/bin/env python3
"""Rigorous proof that the sweep changed ONLY what it was supposed to,
plus a before/after comparison of link + anchor health.

Proof method: normalize both baseline and current lines with a canonicalizer that
collapses exactly the transformations the sweep performs. If every changed line pair
is equal after canonicalization, no other edit occurred.
"""
import re
import subprocess
import pathlib
import collections

LINK = re.compile(r'\]\(([^)]*)\)')
HEAD = re.compile(r'^#{1,6}\s+(.*)$', re.M)


def canon(s):
    s = re.sub(r'\s*—\s*', '—', s)          # collapse em-dash spacing
    s = s.replace('for example,', 'e.g.,').replace('for example', 'e.g.')
    s = s.replace('that is,', 'i.e.,').replace('that is', 'i.e.')
    s = s.replace('compare ', 'cf. ')
    return s


def baseline(f):
    return subprocess.run(['git', 'show', 'HEAD~1:' + f],
                          capture_output=True, text=True, encoding='utf-8').stdout


def slug(h):
    """GitHub anchor slug. NOTE: each space becomes its own hyphen -- runs are NOT
    collapsed, so '### A — B' yields 'a--b'. Collapsing them (as an earlier version of
    this function did) makes an em-dash edit look like a no-op and hides broken anchors."""
    s = re.sub(r'\[([^\]]*)\]\([^)]*\)', r'\1', h.strip())
    s = re.sub(r'[`*_]', '', s).lower()
    s = re.sub(r'[^a-z0-9 -]', '', s)
    return s.replace(' ', '-').strip('-')


files = sorted(p for p in pathlib.Path('.').rglob('*.md') if '.git' not in p.parts)

print("=== A. proof: only the intended substitutions occurred ===")
changed_lines = unexplained = 0
bad = []
for p in files:
    b, c = baseline(p.as_posix()).split('\n'), p.read_text(encoding='utf-8', errors='replace').split('\n')
    if len(b) != len(c):
        bad.append((p.as_posix(), 'LINE COUNT DIFFERS'))
        continue
    for i, (lb, lc) in enumerate(zip(b, c), 1):
        if lb == lc:
            continue
        changed_lines += 1
        if canon(lb) != canon(lc):
            unexplained += 1
            if len(bad) < 8:
                bad.append((p.as_posix() + ':' + str(i), lb[:70], lc[:70]))
print("  changed lines            %d" % changed_lines)
print("  explained by the 4 rules %d" % (changed_lines - unexplained))
print("  UNEXPLAINED              %d" % unexplained)
for x in bad:
    print("   !", x)


def health(getter):
    heads, text = {}, {}
    for p in files:
        text[p] = getter(p)
        heads[p] = {slug(m) for m in HEAD.findall(text[p])}
    byres = {p.resolve(): p for p in files}
    ok = mf = ma = 0
    items = set()
    for p in files:
        for t in LINK.findall(text[p]):
            if t.startswith(('http', 'mailto:')):
                continue
            if t.startswith('#'):
                if slug(t[1:]) in heads[p]:
                    ok += 1
                else:
                    ma += 1
                    items.add((p.as_posix(), t))
                continue
            path, _, anchor = t.partition('#')
            if not path:
                continue
            tgt = (p.parent / path).resolve()
            key = byres.get(tgt)
            if key is None:
                if tgt.exists():
                    ok += 1
                else:
                    mf += 1
                    items.add((p.as_posix(), t))
                continue
            if anchor and slug(anchor) not in heads[key]:
                ma += 1
                items.add((p.as_posix(), t))
            else:
                ok += 1
    return ok, mf, ma, items


print()
print("=== B. link + anchor health: BEFORE vs AFTER ===")
b_ok, b_mf, b_ma, b_items = health(lambda p: baseline(p.as_posix()))
a_ok, a_mf, a_ma, a_items = health(lambda p: p.read_text(encoding='utf-8', errors='replace'))
print("  %-18s %10s %10s" % ("", "baseline", "after"))
print("  %-18s %10d %10d" % ("resolved OK", b_ok, a_ok))
print("  %-18s %10d %10d" % ("missing file", b_mf, a_mf))
print("  %-18s %10d %10d" % ("missing anchor", b_ma, a_ma))
introduced = a_items - b_items
fixed = b_items - a_items
print()
print("  INTRODUCED by the sweep: %d" % len(introduced))
for x in sorted(introduced)[:15]:
    print("   !", x[0], "->", x[1])
print("  incidentally fixed:      %d" % len(fixed))
