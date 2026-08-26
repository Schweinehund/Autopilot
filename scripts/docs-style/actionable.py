#!/usr/bin/env python3
"""Filter check.py output down to hits this corpus should actually act on.

Usage: python actionable.py FILE.md [FILE.md ...]

Drops, with reasons recorded in RESUME.md:
  passive          owner ruled REPORT ONLY (see _PASSIVE-REPORT.md)
  em-dash-spaced   mechanical sweep done; leftovers sit in protected table/pin rows
  table rows       content-matched by ten v1.NN-milestone-audit.mjs validators
  Say to the user  agent speech scripts, not doc prose
  word-list terms  outside the curated in-scope set below

Every surviving hit is still a candidate, not a verdict.
"""
import sys, pathlib, re, collections

sys.stdout.reconfigure(encoding="utf-8", errors="replace")
# The skill ships in this repo at .claude/skills/google-style. Fall back to the
# user-global copy so the tool still runs from a scratch checkout.
_SKILL = pathlib.Path(__file__).resolve().parents[2] / ".claude/skills/google-style"
if not _SKILL.exists():
    _SKILL = pathlib.Path.home() / ".claude/skills/google-style"
sys.path.insert(0, str(_SKILL))
import check  # noqa: E402

DROP_RULES = {"passive", "em-dash-spaced"}

# Word-list terms that are genuinely in scope here. Everything else the list
# flags (portal, compliance, check, type, access, console, Google, ...) is a
# product name, a UI label, or a narrower Google-Cloud-only rule.
IN_SCOPE = {
    "admin", "via", "should", "would", "could", "just", "simply", "simple",
    "easily", "quick", "etc.", "vs.", "e.g.", "i.e.", "master", "config",
    "sign into", "blast radius", "desired", "actionable", "impact",
}

# Narrower match for terms whose flagged form is mostly untouchable:
# "Intune admin center" is a product name and "Admin Action Required" is a
# heading whose GitHub anchor other docs link to. Only bare lowercase counts.
TERM_RX = {
    "admin": re.compile(r"(?<![\w-])admin(?!\s+center)(?![\w-])"),
}


def actionable(path):
    src = pathlib.Path(path).read_text(encoding="utf-8", errors="replace").split("\n")
    masked = check.mask_code("\n".join(src))
    # Blockquote blocks a **Source:** citation follows are verbatim vendor
    # documentation. Restyling one falsifies the quotation, so they are not
    # actionable at all -- same rule sweep3 enforces.
    quoted, i = set(), 0
    while i < len(src):
        if src[i].startswith(">"):
            start = i
            while i < len(src) and src[i].startswith(">"):
                i += 1
            lead = next((l for l in reversed(src[max(0, start - 3):start])
                         if l.strip()), "")
            if (re.search(r"\*\*Source", " ".join(src[i:i + 3]))
                    or (lead.rstrip().endswith(":")
                        and not lead.lstrip().startswith(("#", "|", ">")))):
                quoted.update(range(start + 1, i + 1))
        else:
            i += 1
    out = []
    for line, rid, note in check.check(path, WORDS, {"headings"}):
        if rid in DROP_RULES:
            continue
        if rid == "word-list":
            term = note.split(": ", 1)[1].split(" (")[0]
            if term.lower() not in IN_SCOPE:
                continue
            # every occurrence line, not just the first
            # check.py truncates its line list at 6 ("L48,60..."), so find the
            # occurrences here instead of parsing them back out of the note.
            rx = TERM_RX.get(term.lower()) or re.compile(
                r"(?<![\w-])" + re.escape(term) + r"(?![\w-])",
                0 if term[:1].isupper() else re.I)
            for n, txt in enumerate(masked, 1):
                if rx.search(txt) and keep(src[n - 1]) and n not in quoted:
                    out.append((n, rid, term, src[n - 1].strip()))
            continue
        txt = src[line - 1]
        if keep(txt) and line not in quoted:
            out.append((line, rid, note.split("  <- ")[-1], txt.strip()))
    return sorted(set(out))


# Only long literals are useful as line-level warnings here. Short ones
# ("troubleshoot", "All Platforms") sit on dozens of lines and would hide real
# work; sweep3 checks pins exactly, per edit, and pins2.py proves none were lost.
PINS = [l for l in (pathlib.Path(__file__).parent / "_CONTENT-PINS.txt")
        .read_text(encoding="utf-8").splitlines() if len(l.strip()) >= 30]


def keep(txt):
    if txt.lstrip().startswith("|") or "Say to the user" in txt:
        return False
    return not any(pin in txt for pin in PINS)


WORDS = check.load_wordlist()

if __name__ == "__main__":
    total = collections.Counter()
    for p in sys.argv[1:]:
        hits = actionable(p)
        if not hits:
            continue
        print("\n== %s: %d" % (p, len(hits)))
        for line, rid, what, txt in hits:
            total[rid] += 1
            print("  L%-5d %-13s %-16s %s" % (line, rid, what, txt[:110]))
    print("\n" + "  ".join("%s=%d" % kv for kv in total.most_common()),
          "| TOTAL", sum(total.values()))
