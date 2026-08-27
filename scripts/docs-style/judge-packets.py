#!/usr/bin/env python3
"""Turn verify-meaning.py's judge worklist into packets a fresh reader can judge.

The worklist itself is deliberately over-inclusive: it emits every CHANGED baseline
line that CONTAINED a modal, whether or not the modal survived. That is the right
default for a detector (it cannot know which rewrite is the inversion) and the wrong
input for a judge, who needs the after-line and the surrounding lines -- "the diff
summary always looks clean, the inversions only appear in the surrounding lines."

This script:
  1. aligns each baseline line to its counterpart in the new file (difflib opcodes),
  2. DROPS entries where every modal in the line survived -- that is not this class,
  3. emits before + after + N lines of new-file context.

Step 2 is deterministic, not judgment: it compares modal counts, it does not read
meaning. Nothing that lost a modal is dropped.

Usage:
  python judge-packets.py BASE CORPUS_ROOT [--context N] [--risk high] [--chunks N]
  python judge-packets.py BASE CORPUS_ROOT --chunk-file OUT_PREFIX
"""
import difflib
import json
import pathlib
import re
import subprocess
import sys

MODALS = re.compile(r"\b(should|will|would|could|must|shall|may|might)\b", re.I)
CONTEXT = 4


def git_show(root, rev, path):
    r = subprocess.run(["git", "show", f"{rev}:{path}"], cwd=root,
                       capture_output=True, text=True, encoding="utf-8",
                       errors="replace")
    return r.stdout if r.returncode == 0 else None


def changed_files(root, base):
    out = subprocess.run(["git", "diff", "--name-only", base], cwd=root,
                         capture_output=True, text=True).stdout
    return [f for f in out.split() if f.endswith(".md")]


def modal_bag(s):
    return sorted(m.lower() for m in MODALS.findall(s))


def packets(root, base, context=CONTEXT):
    root = pathlib.Path(root)
    out = []
    for f in changed_files(root, base):
        old = git_show(root, base, f)
        p = root / f
        if old is None or not p.exists():
            continue
        new = p.read_text(encoding="utf-8", errors="replace")
        oldL, newL = old.split("\n"), new.split("\n")
        newset = set(newL)
        sm = difflib.SequenceMatcher(None, oldL, newL, autojunk=False)
        # map every replaced baseline line index -> its aligned new index
        aligned = {}
        for tag, i1, i2, j1, j2 in sm.get_opcodes():
            if tag != "replace":
                continue
            # within a replace block, pair up by best similarity, in order
            for k, oi in enumerate(range(i1, i2)):
                cands = range(j1, j2)
                if not cands:
                    continue
                best = max(cands, key=lambda j: difflib.SequenceMatcher(
                    None, oldL[oi], newL[j]).ratio())
                aligned[oi] = best
        for i, ln in enumerate(oldL):
            if ln in newset or not MODALS.search(ln):
                continue
            j = aligned.get(i)
            after = newL[j] if j is not None else None
            # the modal survived intact -> not this class
            if after is not None and modal_bag(ln) == modal_bag(after):
                continue
            lo = max(0, (j if j is not None else 0) - context)
            hi = min(len(newL), (j if j is not None else 0) + context + 1)
            out.append({
                "file": f,
                "baseline_line": i + 1,
                "new_line": (j + 1) if j is not None else None,
                "risk": "high" if re.search(r"\bshould\b", ln) else "normal",
                "lost": [m for m in modal_bag(ln)
                         if modal_bag(ln).count(m) >
                         (modal_bag(after).count(m) if after else 0)],
                "before": ln.rstrip(),
                "after": after.rstrip() if after is not None else "<LINE DELETED>",
                "context_after": [l.rstrip() for l in newL[lo:hi]],
            })
    return out


def main():
    if len(sys.argv) < 3:
        print(__doc__)
        return 2
    base, root = sys.argv[1], sys.argv[2]
    ctx = int(sys.argv[sys.argv.index("--context") + 1]) if "--context" in sys.argv else CONTEXT
    ps = packets(root, base, ctx)
    if "--risk" in sys.argv:
        want = sys.argv[sys.argv.index("--risk") + 1]
        ps = [p for p in ps if p["risk"] == want]
    if "--chunk-file" in sys.argv:
        prefix = sys.argv[sys.argv.index("--chunk-file") + 1]
        n = int(sys.argv[sys.argv.index("--chunks") + 1]) if "--chunks" in sys.argv else 8
        # chunk by FILE so one judge sees a whole document's hunks together
        byfile = {}
        for p in ps:
            byfile.setdefault(p["file"], []).append(p)
        groups = sorted(byfile.values(), key=len, reverse=True)
        bins = [[] for _ in range(n)]
        for g in groups:                       # greedy balance on hunk count
            min(bins, key=len).extend(g)
        for k, b in enumerate(bins, 1):
            b.sort(key=lambda p: (p["file"], p["baseline_line"]))
            pathlib.Path(f"{prefix}{k}.json").write_text(
                json.dumps(b, indent=1, ensure_ascii=False), encoding="utf-8")
            print(f"{prefix}{k}.json  {len(b)} hunks  "
                  f"{len({p['file'] for p in b})} files")
        return 0
    print(json.dumps(ps, indent=1, ensure_ascii=False))
    return 0


if __name__ == "__main__":
    sys.exit(main())
