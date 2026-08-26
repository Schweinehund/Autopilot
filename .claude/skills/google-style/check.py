#!/usr/bin/env python3
"""Mechanical Google-developer-style checks for Markdown. Judgment calls stay with the reader.

Usage: python check.py [--no-headings] FILE.md [FILE.md ...]

--no-headings suppresses the sentence-case and heading-punctuation checks. Use it on a
project whose heading strings are pinned by validators or fixed by its own doc standard.

Every hit is a CANDIDATE, not a violation. Most word-list rules are narrowly scoped
("type" is flagged only when it means "enter text"), so each hit carries Google's own
guidance -- read it before changing anything.
"""
import re, sys, pathlib

try:
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
except Exception:
    pass

REF = pathlib.Path(__file__).parent / "references"

# Structural rules, applied to prose only (code and URLs are masked out first).
RULES = [
    # Case-explicit, not re.I: an all-caps WE or US is an acronym or a place
    # (MAM-WE, US Gov), never the pronoun. Hyphen-aware boundaries for the same
    # reason -- \b alone matches the WE in MAM-WE.
    ("person-first",
     re.compile(r"(?<![-\w])(?:[Ww]e|[Oo]urs?|us|Us|[Ll]et's|I'm|I've)(?![-\w])"),
     "person.md: address the reader as 'you'; don't use we/our/us"),
    ("future-tense", re.compile(r"\bwill\b", re.I),
     "tense.md: prefer present tense (OK only for genuinely future actions)"),
    ("directional", re.compile(r"\b(above|below|left-hand|right-hand|left side|right side)\b", re.I),
     "accessibility.md: no directional language; use earlier/preceding/following"),
    ("em-dash-spaced", re.compile(r"\s—|—\s"),
     "dashes.md: no space before or after an em dash"),
    ("passive", re.compile(r"\b(is|are|was|were|be|been|being)\s+(?:\w+ed|done|made|set|given|shown|found|written|built|sent|kept|held|put|taken|seen|known)\b", re.I),
     "voice.md: prefer active voice; make clear who performs the action"),
    ("anthropomorphism", re.compile(r"\bthe\s+(system|server|app|application|code|program|API|service|script|tool)\s+(wants|knows|thinks|sees|believes|decides|likes|feels|understands|remembers)\b", re.I),
     "anthropomorphism.md: don't attribute human qualities to software"),
    ("vague-link", re.compile(r"\[(here|click here|this|this page|this link|link|more|read more|learn more|documentation|docs)\]\(", re.I),
     "cross-references.md: use short, unique, descriptive link text"),
    ("empty-alt", re.compile(r"!\[\s*\]\("),
     "images.md: every image needs alt text"),
    ("latin-abbrev", re.compile(r"(?<![\w.])(e\.g\.|i\.e\.|etc\.|cf\.|vs\.|N\.B\.)"),
     "word-list.md: spell it out - for example / that is / and so on / compared with"),
]

CAPS_OK = re.compile(r"^([A-Z0-9][A-Z0-9._/-]*|\d[\w.-]*)$")  # acronyms, versions, IDs


def mask_code(text):
    """Blank out fenced blocks, indented blocks, inline code, link targets, and URLs.

    Keeps the line count so reported line numbers stay true.
    """
    out, fenced = [], False
    for ln in text.split("\n"):
        if re.match(r"^\s*(```|~~~)", ln):
            fenced = not fenced
            out.append("")
            continue
        if fenced or re.match(r"^ {4,}\S", ln):
            out.append("")
            continue
        ln = re.sub(r"`[^`]*`", lambda m: " " * len(m.group()), ln)
        ln = re.sub(r"\]\([^)]*\)", lambda m: " " * len(m.group()), ln)
        ln = re.sub(r"https?://\S+", lambda m: " " * len(m.group()), ln)
        # bare domain paths (learn.microsoft.com/en-us/...) are URLs too
        ln = re.sub(r"\b[\w-]+(?:\.[\w-]+)+/\S*", lambda m: " " * len(m.group()), ln)
        out.append(ln)
    return out


def load_wordlist():
    """Parse the bundled word list into {term: (verdict, scope, guidance)}.

    Platform-scoped entries (Android:, Cloud:, Workspace:) keep their scope so a
    rule about Android UI wording isn't reported as a global one.
    """
    path = REF / "word-list.md"
    if not path.exists():
        return {}
    text = path.read_text(encoding="utf-8")
    pat = re.compile(r"^(DON'T USE|AVOID): (.+?)[ \t]*$\n(.*?)(?:\n\n|\Z)", re.M | re.S)
    terms = {}
    for m in pat.finditer(text):
        verdict, entry, guidance = m.group(1), m.group(2), " ".join(m.group(3).split())
        scope = ""
        sm = re.match(r"^(Android|Cloud|Workspace):\s*", entry)
        if sm:
            scope, entry = sm.group(1), entry[sm.end():]
        guidance = re.sub(r"\[([^\]]*)\]\([^)]*\)", r"\1", guidance)[:180]
        for t in entry.split(","):
            t = re.sub(r"\s*\(.*?\)\s*", " ", t).strip()
            if 2 < len(t) < 40 and re.match(r"^[\w][\w '/.&-]*$", t):
                terms.setdefault(t, (verdict, scope, guidance))
    return terms


def heading_case(text):
    """Return mid-heading capitalized words (possible Title Case), or []."""
    text = re.sub(r"[`*_]|\[|\]\([^)]*\)", "", text).strip()
    words = text.split()
    bad = [w for w in words[1:]
           if w[:1].isupper() and not CAPS_OK.match(w) and w.strip(".,:;") != "I"]
    return bad if len(bad) >= 2 else []


def check(path, words=None, skip=()):
    lines = mask_code(pathlib.Path(path).read_text(encoding="utf-8", errors="replace"))
    hits = []
    for i, ln in enumerate(lines, 1):
        h = None if "headings" in skip else re.match(r"^(#{1,6})\s+(.*)$", ln)
        if h:
            bad = heading_case(h.group(2))
            if bad:
                hits.append((i, "heading-case",
                             "headings.md: sentence case? capitalized mid-heading: " + ", ".join(bad)))
            if re.search(r"[.!?:]\s*$", h.group(2)):
                hits.append((i, "heading-punct", "headings.md: keep heading punctuation simple"))
        for rid, rx, note in RULES:
            for m in rx.finditer(ln):
                hits.append((i, rid, "%s  <- %r" % (note, m.group().strip())))

    for term, (verdict, scope, guidance) in (load_wordlist() if words is None else words).items():
        # Capitalized entries are proper nouns or UI strings: match case-sensitively.
        rx = re.compile(r"(?<![\w-])" + re.escape(term) + r"(?![\w-])",
                        0 if term[:1].isupper() else re.I)
        found = [i for i, ln in enumerate(lines, 1) if rx.search(ln)]
        if found:
            label = "%s%s: %s" % (verdict, "[%s]" % scope if scope else "", term)
            hits.append((found[0], "word-list", "%s (%d×, L%s)\n             %s" % (
                label, len(found),
                ",".join(map(str, found[:6])) + ("..." if len(found) > 6 else ""), guidance)))
    return hits


def main(argv):
    skip = set()
    if "--no-headings" in argv:
        skip.add("headings")
        argv = [a for a in argv if a != "--no-headings"]
    if not argv:
        print(__doc__)
        return 2
    words, total = load_wordlist(), 0
    for p in argv:
        hits = check(p, words, skip)
        total += len(hits)
        print("\n== %s: %d candidate(s)" % (p, len(hits)))
        for line, rid, note in sorted(hits):
            print("  L%-5d [%s] %s" % (line, rid, note))
    print("\n%d candidate(s) total. Confirm each against references/ before rewriting." % total)
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
