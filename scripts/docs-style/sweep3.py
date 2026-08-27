#!/usr/bin/env python3
"""Deterministic Google-style sweep, v3 (judgment-batch mechanical slice).

Prose only. Never touches:
  - code fences, indented code, inline code, link targets, URLs, HTML tags
  - HEADING LINES (Option 1: heading casing/anchors are out of scope, and editing a
    heading changes its GitHub anchor slug, breaking every link that points at it)
  - table rows (a lone em dash is the corpus "N/A" cell placeholder, content-matched
    by ten milestone audits)
  - any line containing a validator-pinned string (loaded from _EMDASH-PINS.txt)

Usage: python sweep3.py ROOT PINSFILE [--subs TSV] [--apply]
"""
import re
import sys
import pathlib
import collections

SUBS = [
    # "Write out administrator unless it's the name of a UI label." Case-sensitive:
    # "Intune admin center", "Tenant admin" and "Admin Action Required" (a heading
    # whose anchor other docs link to) are labels and stay as they are.
    ("admin", re.compile(r"(?<![\w-])admin(?!\s+center)(?![\w-])"), "administrator"),
    # The plural was missed for four batches because the bundled word list only
    # carries "admin", which left "administrator" and "admins" mixed inside the
    # same paragraph. Same rule, same exemptions.
    ("admins", re.compile(r"(?<![\w-])admins(?![\w-])"), "administrators"),
    ("vs", re.compile(r"(?<![\w.])vs\.(?!\w)"), "versus"),
    # NOTE: "via" is deliberately NOT here. It looked like a safe blanket
    # substitution across l1 (almost all channel-sense) and then produced
    # "confirms the chipset through `ManufacturerId`" and "connect the device
    # through cable" on l2. Judge it per doc class -- see subs-via-sense.tsv.
    ("sign-in-to", re.compile(r"(?<![\w-])sign into(?![\w-])"), "sign in to"),
    ("config", re.compile(r"(?<![\w-])config(?![\w-])"), "configuration"),
    ("desired", re.compile(r"(?<![\w-])desired(?![\w-])"), "intended"),
]
# UI labels, and quoted agent speech that is read aloud rather than read.
# "Enrolled via DEP" is a line of `profiles status` OUTPUT. It sits verbatim in a
# code fence four lines up and again as the bold label of the bullet that
# interprets it; batch 3 kept it and a corpus-wide generic via rule broke it.
# Three label pairs adjudicated against verify-meaning.py's label-drift rule
# (2026-08-26). Each appears twice in its document; the second copy sits in a
# table cell the sweep never touches, so converting the prose copy alone
# splits the label. "Create a local admin account" is the 30th defect -- it was
# reverted in dc7e996 and re-broken by the very next sweep run because nothing
# pinned it.
KEEP_LINE = re.compile(r"Tenant admin\b|Ask the user: \"|Enrolled via DEP"
                       r"|Create a local admin account|Tri-portal admin surface"
                       r"|Intune config profiles|via staging")
EMDASH = re.compile(r"\s+—\s+|\s+—|—\s+")
# The bare-domain arm is load-bearing: without it the admin rule rewrote the real
# host admin.microsoft.com into administrator.microsoft.com. Schemeless hosts are
# how this corpus cites portals, so \S+ after https?:// is not enough.
# The bare-domain arm must require a real TLD. A generic dotted-token pattern also
# swallows 802.1X, 5.2404.0 and intune-agent.timer, which silently blocks edits on
# any line containing one.
# The straight-double-quote arm is the answer to the quotation guard's blind
# spot: quoted_lines() only recognises BLOCKQUOTES, so a verbatim vendor
# sentence or a UI string quoted INLINE sailed through three times -- the
# Microsoft PSSO re-registration passage, the Apple "manually assign it to the
# devices via device serial number" sentence, and the Android UI error "A PIN to
# exit kiosk mode has not been set by your IT admin". Falsifying any of them is
# worse than the style violation it fixes and no validator can see it.
# Bounded to one line and 400 chars so a stray quote cannot swallow a paragraph.
# Cost: the corpus's own scare-quoted phrases are no longer restyled either.
PROTECT = re.compile(r"`[^`]*`|\]\([^)]*\)|https?://\S+|<[^>]+>"
                     r"|\"[^\"\n]{1,400}\""
                     r"|\b[\w-]+(?:\.[\w-]+)*\.(?:com|net|org|io|dev|gov|edu|mil)\b(?:/\S*)?")
HEADING = re.compile(r"^\s{0,3}#{1,6}\s")
FENCE = re.compile(r"^\s*(```|~~~)")


def transform(line, do_emdash, counts):
    out, last = [], 0
    for m in PROTECT.finditer(line):
        out.append(("p", line[last:m.start()]))
        out.append(("k", m.group()))
        last = m.end()
    out.append(("p", line[last:]))
    res = []
    for kind, seg in out:
        if kind == "k":
            res.append(seg)
            continue
        for rid, rx, rep in SUBS:
            seg, n = rx.subn(rep, seg)
            counts[rid] += n
        if do_emdash:
            seg, n = EMDASH.subn("—", seg)
            counts["em-dash"] += n
        res.append(seg)
    return "".join(res)


def quoted_lines(lines):
    """Lines inside a blockquote block that a **Source:** citation follows.

    Those blocks are verbatim vendor documentation. Restyling one falsifies the
    quotation, which is worse than the style violation it fixes -- and no
    validator can see it. Seven had already been altered before this guard
    existed, two of them by the mechanical em-dash sweep.
    """
    out, i = set(), 0
    while i < len(lines):
        if lines[i].startswith(">"):
            start = i
            while i < len(lines) and lines[i].startswith(">"):
                i += 1
            # Two conventions mark a quotation in this corpus, and 06-windows-
            # driver-firmware-updates.md uses the second almost exclusively:
            #   a trailing **Source:** line, or a lead-in sentence ending in ":"
            lead = next((l for l in reversed(lines[max(0, start - 3):start])
                         if l.strip()), "")
            cited = re.search(r"\*\*Source", " ".join(lines[i:i + 3]))
            lead_in = (lead.rstrip().endswith(":")
                       and not lead.lstrip().startswith(("#", "|", ">")))
            if cited or lead_in:
                out.update(range(start, i))
        else:
            i += 1
    return out


def bq_len(lines, idx, replacement):
    """Length C17 #12 would measure for the blockquote block containing idx.

    Consecutive lines starting with ">", each stripped of its "> " prefix and
    joined with a single space -- verbatim from c17-eee-contract.mjs.
    """
    start = idx
    while start > 0 and lines[start - 1].startswith(">"):
        start -= 1
    end = idx
    while end + 1 < len(lines) and lines[end + 1].startswith(">"):
        end += 1
    block = [replacement if n == idx else lines[n] for n in range(start, end + 1)]
    return len(" ".join(re.sub(r"^>\s?", "", b) for b in block))


def sweep(root, pins, apply):
    counts = collections.Counter()
    skipped = collections.Counter()
    touched = []
    for p in sorted(pathlib.Path(root).rglob("*.md")):
        if ".git" in p.parts:
            continue
        # Our own generated artifacts, not corpus prose. _PASSIVE-REPORT.md is a
        # record of the BASELINE wording -- restyling it destroys the record, and
        # it quotes 3,333 sentences so a corpus-root run would rewrite hundreds.
        if p.name in ("_PASSIVE-REPORT.md", "_PINNED-HEADINGS.txt"):
            continue
        lines = p.read_text(encoding="utf-8", errors="replace").split("\n")
        fenced = changed = False
        # YAML frontmatter is metadata with a controlled vocabulary, never prose.
        # Without this, the admin rule rewrote "audience: admin" (the value used
        # by 124 files) to "audience: administrator" in 20 reference docs.
        # The eight _templates/ files open with an HTML authoring-comment block,
        # so anchoring on lines[0] missed their frontmatter entirely and the
        # admin rule rewrote `audience: admin` in five of them -- the same bug
        # this guard was written for, one file shape later. Skip a leading
        # comment block first, then look for the fence.
        front, start = 0, 0
        if lines and lines[0].lstrip().startswith("<!--"):
            for j, l in enumerate(lines):
                if "-->" in l:
                    start = j + 1
                    break
        while start < len(lines) and not lines[start].strip():
            start += 1
        if start < len(lines) and lines[start].strip() == "---":
            for j in range(start + 1, len(lines)):
                if lines[j].strip() == "---":
                    front = j
                    break
        # C17 enrolls a file iff its frontmatter carries a doc_id key.
        # C17 skips assertions #9 and #12 for authoring scaffolds, which it
        # identifies by the TEMPLATE-SENTINEL last_verified value 1970-01-01.
        # Without the same skip, the 200-char guard refused every edit in the
        # eight _templates/ blockquotes -- they are deliberately 220-450 chars.
        template = any(re.match(r"last_verified:\s*1970-01-01\b", l)
                       for l in lines[:front])
        enrolled = (not template
                    and any(l.startswith("doc_id:") for l in lines[:front]))
        quoted = quoted_lines(lines)
        for i, ln in enumerate(lines):
            if i <= front:
                continue
            if i in quoted:
                skipped["cited verbatim quotation"] += 1
                continue
            if FENCE.match(ln):
                fenced = not fenced
                continue
            # An indented ">" is a blockquote inside a list continuation, not an
            # indented code block. C17 #12 anchors on /^>/ so it never measures
            # these, but they are ordinary prose and were being skipped whole.
            if fenced or re.match(r"^ {4,}(?!>)\S", ln):
                continue
            if HEADING.match(ln):
                if "—" in ln:
                    skipped["heading line"] += 1
                continue
            if ln.lstrip().startswith("|"):
                skipped["table row"] += 1
                continue
            if "Say to the user" in ln:
                skipped["agent speech script"] += 1
                continue
            if KEEP_LINE.search(ln):
                skipped["UI label line"] += 1
                continue
            do_em = False
            probe = collections.Counter()
            new = transform(ln, do_em, probe)
            if new == ln:
                continue
            # Exact pin check, not a heuristic: a validator literal only matters
            # if this edit would actually alter it. Blocking every line that
            # merely contains a pin skips real work -- generic literals like
            # "troubleshoot" appear on dozens of lines.
            if any(pin in ln and pin not in new for pin in pins):
                skipped["validator-pinned string"] += 1
                continue
            # C17 assertion #12 caps a blockquote at 200 chars. Match the
            # validator exactly, or the guard is wrong in both directions:
            #  - it applies ONLY to enrolled files (frontmatter has doc_id);
            #    the whole operations tree has none, so the cap is not in play
            #    there and a per-line guard was blocking legitimate edits.
            #  - it measures CONSECUTIVE "> " lines stripped and joined with a
            #    space, not one line, so several short lines can breach it.
            if enrolled and new.startswith(">") and bq_len(lines, i, new) > 200:
                skipped["blockquote would exceed C17 #12 200-char cap"] += 1
                continue
            counts.update(probe)
            lines[i] = new
            changed = True
        if changed:
            touched.append(str(p))
            if apply:
                p.write_text("\n".join(lines), encoding="utf-8")
    return counts, skipped, touched


if __name__ == "__main__":
    root, pinsfile = sys.argv[1], sys.argv[2]
    apply = "--apply" in sys.argv
    if "--subs" in sys.argv:
        # TSV of  regex <TAB> replacement, applied in file order (longest first).
        SUBS[:] = []
        for row in pathlib.Path(sys.argv[sys.argv.index("--subs") + 1]).read_text(
                encoding="utf-8").splitlines():
            if not row.strip() or row.lstrip().startswith("#"):
                continue
            pat, rep = row.split("\t")
            # Two bugs that batch 1 shipped silently, now hard errors:
            #  - pattern eats a trailing space the replacement doesn't restore
            #    ("version is below " -> "earlier than" gave "earlier than102.x")
            #  - a [Cc]-style case class with a fixed-case replacement recases the
            #    text ("Escalation Criteria" -> "Escalation criteria")
            if pat.endswith(" ") and not rep.endswith(" "):
                sys.exit("subs: pattern ends in a space, replacement does not: %r" % pat)
            #  - a backslash in the REPLACEMENT: re.sub processes escapes there,
            #    so "\*\*not\*\*" shipped literal backslashes into the corpus.
            #    "\n" is allowed -- batch 5 uses it deliberately to hard-wrap a line.
            if re.search(r"\\(?!n)", rep):
                sys.exit("subs: replacement %r has a backslash escape; re.sub will "
                         "process it. Write the literal text (only a newline "
                         "escape is allowed)." % rep)
            if re.search(r"\[[A-Za-z]{2}\]", pat):
                sys.exit("subs: case class %r needs one rule per case, not a shared "
                         "fixed-case replacement" % pat)
            SUBS.append((pat, re.compile(pat), rep))
    pins = [l.strip() for l in pathlib.Path(pinsfile).read_text(encoding="utf-8").split("\n") if l.strip()]
    c, s, t = sweep(root, pins, apply)
    print(("APPLIED" if apply else "DRY RUN") + " -- %d files, %d pins loaded" % (len(t), len(pins)))
    for k, v in c.most_common():
        print("  %6d  %s" % (v, k))
    print("  %6d  TOTAL edits" % sum(c.values()))
    print("  protected (em dashes left alone):")
    for k, v in s.most_common():
        print("  %6d  %s" % (v, k))
