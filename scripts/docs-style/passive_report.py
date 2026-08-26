#!/usr/bin/env python3
"""Passive-voice report. Changes nothing.

Splits findings into two buckets, because they carry very different risk:
  AGENTLESS  - no actor anywhere in the sentence. Recasting FORCES you to invent one.
  ACTOR-NAMED - sentence contains 'by <someone>'. Safe mechanical recast.
"""
import re
import pathlib
import collections
import importlib.util

# The skill ships in this repo at .claude/skills/google-style. Fall back to the
# user-global copy so the tool still runs from a scratch checkout.
_SKILL = pathlib.Path(__file__).resolve().parents[2] / ".claude/skills/google-style"
if not _SKILL.exists():
    _SKILL = pathlib.Path.home() / ".claude/skills/google-style"
spec = importlib.util.spec_from_file_location('c', str(_SKILL / 'check.py'))
chk = importlib.util.module_from_spec(spec)
spec.loader.exec_module(chk)

PASSIVE = re.compile(
    r"\b(is|are|was|were|be|been|being)\s+"
    r"(?:\w+ed|done|made|set|given|shown|found|written|built|sent|kept|held|put|taken|seen|known)\b",
    re.I)
BY = re.compile(r"\bby\s+(?:the\s+|a\s+|an\s+)?[A-Za-z]", re.I)

root = pathlib.Path('.')
rows = []
for p in sorted(root.rglob('*.md')):
    if '.git' in p.parts:
        continue
    for i, ln in enumerate(chk.mask_code(p.read_text(encoding='utf-8', errors='replace')), 1):
        for m in PASSIVE.finditer(ln):
            # sentence around the match
            s = ln[max(0, m.start() - 160):m.start() + 160]
            bucket = 'ACTOR-NAMED' if BY.search(s) else 'AGENTLESS'
            rows.append((bucket, p.as_posix(), i, m.group(), ln.strip()))

by_bucket = collections.Counter(r[0] for r in rows)
by_file = collections.Counter(r[1] for r in rows)

out = ["# Passive-voice report (report-only, nothing changed)", ""]
out.append("Total flagged: **%d**" % len(rows))
out.append("")
out.append("| Bucket | Count | Risk |")
out.append("|---|---|---|")
out.append("| AGENTLESS | %d | Recasting forces an invented actor. Needs a human decision per instance. |"
           % by_bucket['AGENTLESS'])
out.append("| ACTOR-NAMED | %d | Sentence already names the actor via 'by X'. Safe mechanical recast. |"
           % by_bucket['ACTOR-NAMED'])
out.append("")
out.append("## Worst 25 files")
out.append("")
out.append("| Count | File |")
out.append("|---|---|")
for f, n in by_file.most_common(25):
    out.append("| %d | `%s` |" % (n, f))
out.append("")
out.append("## ACTOR-NAMED instances (the safe subset, all of them)")
out.append("")
named = [r for r in rows if r[0] == 'ACTOR-NAMED']
if named:
    out.append("| File | Line | Match | Text |")
    out.append("|---|---|---|---|")
    for _, f, i, g, ln in named:
        out.append("| `%s` | %d | `%s` | %s |" % (f, i, g, ln.replace('|', '\\|')[:150]))
else:
    out.append("_None._")
out.append("")
out.append("## AGENTLESS instances")
out.append("")
out.append("Grouped by file. Each needs an actor decision before it can be recast.")
out.append("")
cur = None
for b, f, i, g, ln in rows:
    if b != 'AGENTLESS':
        continue
    if f != cur:
        out.append("")
        out.append("### `%s`" % f)
        cur = f
    out.append("- L%d `%s` — %s" % (i, g, ln.replace('|', '\\|')[:160]))

pathlib.Path('_PASSIVE-REPORT.md').write_text("\n".join(out) + "\n", encoding='utf-8')
print("wrote _PASSIVE-REPORT.md")
print("  total       %d" % len(rows))
print("  AGENTLESS   %d" % by_bucket['AGENTLESS'])
print("  ACTOR-NAMED %d" % by_bucket['ACTOR-NAMED'])
