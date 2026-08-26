#!/usr/bin/env python3
"""Prove a style pass did not change MEANING, references, or citations.

The structural gate (C17, check-nav-hub-links, the apex), verify2.py (link and
anchor health) and pins2.py (validator string literals) already cover shape,
links and pins. Every one of the 30 recorded defects in this corpus passed all
of them. This script covers only what none of them can see.

Two layers, because the defect record splits cleanly in two:

  DETERMINISTIC   classes with a textual signature. Reported as findings.
  JUDGE WORKLIST  the modal->assertion inversion class, which provably has NO
                  textual signature: "The device appears with Join type X" is
                  structurally identical to a correct declarative sentence. All
                  5 recorded inversions came from a removed modal, so every hunk
                  where a modal was removed is emitted for an independent
                  fresh-context reader to judge. Measured recall on the only
                  recoverable inversion set: 5/5.

Findings gate (exit 1) unless dispositioned in _DISPOSITIONS.tsv. A disposition
is keyed to the finding AND the text it fired on, so it goes stale the moment
the line changes again -- a documented keep must not silence a future edit.

Usage:
  python verify-meaning.py BASE [--dispositions FILE] [--json]
  python verify-meaning.py --self-test

BASE is any git rev the pass started from. Run from the corpus root.
"""
import re
import sys
import json
import subprocess
import pathlib
import hashlib
import collections

sys.stdout.reconfigure(encoding="utf-8", errors="replace")

DISPOSITIONS = "_DISPOSITIONS.tsv"

# ---------------------------------------------------------------- primitives

FENCE = re.compile(r"^\s*```")
MODALS = re.compile(r"\b(should|will|would|could|must|shall)\b")
# Converted verb + coordination + bare infinitive. One `will` governing two
# verbs breaks when only the first is converted:
#   "will fail silently or produce unclear errors" -> "fails ... or produce"
SPLIT_VERB = re.compile(
    r"\b(fails|receives|blocks|shows|matches|takes|appears|reports|returns|sends|"
    r"applies|installs|enrolls|is|are|does|do|has|have)\b[^.]{0,110}?"
    r"\b(?:and|or)\s+(?!not\b)([a-z]+)\b")
BARE_INFINITIVE = re.compile(r"^(fail|receive|block|show|match|take|appear|report|"
                             r"return|send|apply|install|enroll|produce|remove|be)$")
# A directional word inserted INSIDE a multi-word proper name:
#   "Per-OU Admin Holder Lookup table below" -> "Per-OU Admin Holder following Lookup"
WORD_ORDER = re.compile(r"([A-Z][\w-]*)\s+(following|preceding)\s+([A-Z][\w-]*)")
SENTENCE_INITIAL = {"The", "A", "An", "This", "That", "These", "Those", "See",
                    "Each", "Every", "Use", "Set", "If", "When", "For", "In",
                    "On", "At", "To", "From", "It", "Its", "As", "All", "Any",
                    "Note", "Confirm", "Verify", "Check", "Both", "Some"}
QUOTE_SPAN = re.compile(r'"[^"\n]{4,400}"')
HTML_COMMENT = re.compile(r"<!--.*?-->", re.S)
LINKISH = re.compile(r"\]\([^)]*\)|`[^`]*`|https?://\S+")


def mech_canon(s):
    """The MECHANICAL transformation set, kept in step with verify2.py's canon().
    Four lines duplicated deliberately: verify2.py executes at import time, so it
    cannot be imported without running its whole proof. If the mechanical rules
    ever change, change both."""
    s = re.sub(r"\s*—\s*", "—", s)
    s = s.replace("for example,", "e.g.,").replace("for example", "e.g.")
    s = s.replace("that is,", "i.e.,").replace("that is", "i.e.")
    return s.replace("compare ", "cf. ")


def git_show(rev, path):
    r = subprocess.run(["git", "show", f"{rev}:{path}"], capture_output=True,
                       text=True, encoding="utf-8", errors="replace")
    return r.stdout if r.returncode == 0 else None


def changed_files(base):
    out = subprocess.run(["git", "diff", "--name-only", base],
                         capture_output=True, text=True).stdout
    return [f for f in out.split() if f.endswith(".md")]


def frontmatter(lines):
    """Comment-aware: eight _templates/ files open with an authoring comment, and
    anchoring on lines[0] missed their frontmatter entirely (batch-8 defect)."""
    i = 0
    while i < len(lines) and (not lines[i].strip() or lines[i].lstrip().startswith("<!--")
                              or "-->" in lines[i]):
        if "-->" in lines[i]:
            i += 1
            break
        i += 1
    if i < len(lines) and lines[i].strip() == "---":
        for j in range(i + 1, len(lines)):
            if lines[j].strip() == "---":
                return lines[i:j + 1]
    return []


def prose_lines(text):
    """Line numbers outside code fences. Cheap; the callers all work on changed
    lines only, and a fenced line is never a meaning change we can judge."""
    out, fenced = set(), False
    for i, ln in enumerate(text.split("\n"), 1):
        if FENCE.match(ln):
            fenced = not fenced
            continue
        if not fenced:
            out.add(i)
    return out


# ---------------------------------------------------------------- the checks

def check_frontmatter(f, old, new, add):
    if frontmatter(old.split("\n")) != frontmatter(new.split("\n")):
        add("frontmatter", f, 0,
            "YAML frontmatter changed. It is metadata with a controlled "
            "vocabulary (audience:, owner:, doc_id), never prose.", "")


def check_spans(f, old, new, add):
    """A quoted span or HTML comment that changed. Falsifying a vendor quotation
    is worse than the style violation it fixes and no validator can see it."""
    for label, rx, why in (
            ("quotation", QUOTE_SPAN,
             "A quoted span changed. If it is a verbatim vendor sentence this "
             "falsifies a citation."),
            ("htmlcomment", HTML_COMMENT,
             "An HTML comment changed. ABAUDIT-NN comments carry validator "
             "waivers; restyling one can break a suppression.")):
        o, n = rx.findall(old), rx.findall(new)
        canon_n = {mech_canon(s) for s in n}
        for span in o:
            # A quoted span whose ONLY change is the mechanical transformation set
            # is not a semantic finding -- verify2.py already proves that set line
            # by line. Without this, quoted labels carrying an em dash ("Intune
            # Production — iOS/iPadOS") report as falsified citations.
            if span not in n and mech_canon(span) not in canon_n:
                add(label, f, 0, why, span[:120])


def check_label_drift(f, old, new, add):
    """C1: a string verbatim in the baseline is no longer verbatim HERE, while an
    identical copy elsewhere in the same file is untouched. That inconsistency is
    the signature of a UI label expanded by a blanket rule. Baseline-relative on
    purpose -- an intra-document 'label family' detector fires on 'Create a local
    primary account' vs 'Create a local admin account', two DIFFERENT real labels."""
    for span in set(re.findall(r"\*\*[^*\n]{6,60}\*\*|\| [A-Z][^|\n]{6,60} \|", old)):
        core = span.strip("*| ")
        # NOT `if core in new: continue` -- the surviving copy keeps it present,
        # which short-circuits exactly the case this must catch. The signature is
        # that ONE of N verbatim copies stopped matching.
        if old.count(core) > 1 and 1 <= new.count(core) < old.count(core):
            add("label-drift", f, 0,
                "A string that appears verbatim more than once in the baseline "
                "was changed in one place only. UI labels must not diverge "
                "within a document.", core[:120])


def check_line_shapes(f, old, new, add):
    """Deterministic residue: shapes that survive a correctly-firing rule."""
    oldset = set(old.split("\n"))
    prose = prose_lines(new)
    for i, ln in enumerate(new.split("\n"), 1):
        if ln in oldset or i not in prose:
            continue
        bare = LINKISH.sub(" ", ln)
        m = SPLIT_VERB.search(bare)
        if m and BARE_INFINITIVE.match(m.group(2)):
            add("split-verb", f, i,
                "A converted verb coordinates with a bare infinitive. One modal "
                "governing two verbs breaks when only the first is converted.",
                m.group(0)[:120])
        # `through` ONLY. Adding `using`/`with` was my invention, not the recorded
        # shape, and it fired 40+ times on ordinary prose ("confirm three items
        # with them: (a) the corporate Google account ... with"). The documented
        # grep is `through .{0,80} through` -- the via-rule's own failure mode.
        # Clause-bounded, not sentence-bounded, or it spans a colon list.
        if re.search(r"\bthrough\b[^.,;:]{0,60}\bthrough\b", bare):
            add("doubled-connective", f, i,
                "'through' repeated in one clause. The generic via-rule produced "
                "nine of these; each wanted a different second word.",
                ln.strip()[:120])
        w = WORD_ORDER.search(bare)
        # Only a defect if the two tokens it now SPLITS were adjacent in the
        # baseline -- i.e. it was inserted into a real multi-word name. This is
        # also what keeps correct prose silent: "see the following Conditional
        # Access policy" has no capitalised token immediately before `following`,
        # which is precisely where a bare directional grep produced false hits.
        # A capitalised SENTENCE-INITIAL word is not part of a proper name.
        # "The following H3" fired because "The H3" happens to occur in the
        # baseline -- the exact false positive a bare directional grep produces.
        if (w and w.group(1) not in SENTENCE_INITIAL
                and f"{w.group(1)} {w.group(3)}" in old):
            add("word-order", f, i,
                "A directional word was inserted inside what reads as a "
                "multi-word proper name that exists verbatim in the baseline.",
                w.group(0)[:120])


def check_prose_crossrefs(f, old, new, add):
    """A by-NAME reference to a heading. 'See Escalation Criteria' -> 'Escalation
    criteria' is invisible to every link checker because it is not a link."""
    heads = {h.strip() for h in re.findall(r"^#{1,6}\s+(.*)$", old, re.M)}
    for h in heads:
        if len(h) < 8 or h not in old:
            continue
        before, after = old.count(h), new.count(h)
        if after < before and h.lower() in new.lower():
            add("prose-crossref", f, 0,
                "A prose reference to a heading changed case or wording. No link "
                "checker can see this -- it is not a link.", h[:120])


def judge_worklist(f, old, new):
    """Hunks where a modal was REMOVED. No textual signature exists for the
    inversion itself, so these go to an independent reader."""
    out, newset = [], set(new.split("\n"))
    for i, ln in enumerate(old.split("\n"), 1):
        if ln in newset or not MODALS.search(ln):
            continue
        out.append({"file": f, "baseline_line": i, "before": ln.strip()[:400],
                    "risk": "high" if re.search(r"\bshould\b", ln) else "normal"})
    return out


CHECKS = [check_frontmatter, check_spans, check_label_drift,
          check_line_shapes, check_prose_crossrefs]


# ---------------------------------------------------------------- dispositions

def fingerprint(kind, f, evidence):
    """Keyed to the evidence text, so a disposition goes stale when the line
    changes again. A documented keep must not silence a future edit."""
    return hashlib.sha1(f"{kind}\x00{f}\x00{evidence}".encode("utf-8")).hexdigest()[:12]


def load_dispositions(path):
    p = pathlib.Path(path)
    if not p.exists():
        return {}
    out = {}
    for row in p.read_text(encoding="utf-8").splitlines():
        if not row.strip() or row.lstrip().startswith("#"):
            continue
        parts = row.split("\t")
        if len(parts) >= 2:
            out[parts[0].strip()] = parts[1].strip()
    return out


# ---------------------------------------------------------------- driver

def run(base, disp_path):
    findings, worklist = [], []

    seen = set()

    def add(kind, f, line, why, evidence):
        fid = fingerprint(kind, f, evidence)
        if fid in seen:        # same finding reached twice (e.g. a label that is
            return             # both a table cell and a bold span)
        seen.add(fid)
        findings.append({"kind": kind, "file": f, "line": line, "why": why,
                         "evidence": evidence, "id": fid})

    files = changed_files(base)
    for f in files:
        old = git_show(base, f)
        if old is None:
            continue                      # new file: no before-state to preserve
        new = pathlib.Path(f).read_text(encoding="utf-8", errors="replace")
        if old == new:
            continue
        for chk in CHECKS:
            chk(f, old, new, add)
        worklist.extend(judge_worklist(f, old, new))

    disp = load_dispositions(disp_path)
    live = [x for x in findings if x["id"] not in disp]
    return files, findings, live, worklist, disp


def main():
    if "--self-test" in sys.argv:
        return self_test()
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    base = sys.argv[1]
    disp_path = (sys.argv[sys.argv.index("--dispositions") + 1]
                 if "--dispositions" in sys.argv else DISPOSITIONS)
    files, findings, live, worklist, disp = run(base, disp_path)

    if "--json" in sys.argv:
        print(json.dumps({"findings": live, "judge_worklist": worklist}, indent=2))
    else:
        print(f"verify-meaning: {len(files)} changed .md vs {base}")
        by = collections.Counter(x["kind"] for x in live)
        for k, v in by.most_common():
            print(f"  {v:5d}  {k}")
        print(f"  {len(findings) - len(live):5d}  dispositioned (silent)")
        for x in live:
            loc = f"{x['file']}:{x['line']}" if x["line"] else x["file"]
            print(f"\n  [{x['kind']}] {loc}   id={x['id']}")
            print(f"      {x['why']}")
            if x["evidence"]:
                print(f"      -> {x['evidence']}")
        hi = sum(1 for w in worklist if w["risk"] == "high")
        print(f"\n  JUDGE WORKLIST: {len(worklist)} hunks where a modal was removed "
              f"({hi} high-risk: a 'should' was dropped)")
        print("  These have NO textual signature. An independent fresh-context")
        print("  reader must confirm each is still an instruction/expectation and")
        print("  did not become a bare assertion of fact.")

    # In --json mode the payload must be the ONLY thing on stdout, or a caller
    # piping it to a parser gets "Extra data". Status goes to stderr.
    out = sys.stderr if "--json" in sys.argv else sys.stdout
    if live:
        print(f"\nFAIL: {len(live)} undispositioned finding(s). Fix, or add the id "
              f"to {disp_path} with a reason.", file=out)
        return 1
    print("\nPASS: no undispositioned findings.", file=out)
    return 0


# ---------------------------------------------------------------- self-test

def self_test():
    """Fixtures are the REAL before/after pairs from this corpus's defect record,
    inlined so the test needs no git and no foreign scratch repo."""
    cases = []

    def case(name, kind, old, new, should_fire=True):
        cases.append((name, kind, old, new, should_fire))

    # C1, admin-setup-macos/02:146 -- live for four batches, RESUME recorded it
    # as reverted when it was not.
    case("C1 label drift", "label-drift",
         "| Create a local admin account | Yes / No | provision it |\n"
         "**Recommended:** Create a local admin account = **Yes**\n",
         "| Create a local admin account | Yes / No | provision it |\n"
         "**Recommended:** Create a local administrator account = **Yes**\n")
    # batch 5 -> batch 9, the third instance of this shape
    case("word order in a proper name", "word-order",
         "link provided in the\nPer-OU Admin Holder Lookup table. Resolution method:\n",
         "link provided in the\nPer-OU Admin Holder following Lookup table. Resolution method:\n")
    # batch 8, all three read fine in a one-line diff
    case("split verb", "split-verb",
         "The agent will fail silently or produce unclear errors.\n",
         "The agent fails silently or produce unclear errors.\n")
    # d71f0d3, invisible to every link checker
    case("prose cross-reference recased", "prose-crossref",
         "## Escalation Criteria\nSee Escalation Criteria for the rule.\n",
         "## Escalation Criteria\nSee Escalation criteria for the rule.\n")
    # the guard that closed it exists; this proves the CHECK sees it too
    case("frontmatter controlled vocabulary", "frontmatter",
         "---\naudience: admin\n---\nbody\n",
         "---\naudience: administrator\n---\nbody\n")
    case("falsified quotation", "quotation",
         'Microsoft states "the device must be reset before re-enrollment".\n',
         'Microsoft states "the device must be reset prior to re-enrollment".\n')
    case("doubled connective", "doubled-connective",
         "Deploy it via Intune via the portal.\n",
         "Deploy it through Intune through the portal.\n")
    # negatives: correct edits that must NOT fire
    case("correct modal rewrite is not a shape defect", "split-verb",
         "The device should appear in the list.\n",
         "Confirm the device appears in the list.\n", should_fire=False)
    case("two DIFFERENT real labels must not fire", "label-drift",
         "| Create a local primary account |\n| Create a local admin account |\n"
         "Set Create a local primary account = Yes\n",
         "| Create a local primary account |\n| Create a local admin account |\n"
         "Set Create a local primary account = No\n", should_fire=False)

    failed = 0
    for name, kind, old, new, should_fire in cases:
        got = []

        def add(k, f, line, why, evidence):
            got.append(k)
        for chk in CHECKS:
            chk("fixture.md", old, new, add)
        fired = kind in got
        ok = fired == should_fire
        failed += not ok
        verdict = "ok" if ok else "FAIL"
        want = "fire" if should_fire else "stay silent"
        print(f"  [{verdict}] {name:46s} ({kind} should {want}; got {got or 'nothing'})")

    # the judge worklist must reach all five recorded inversions
    inversions = [
        'The device should appear with Join type "Registered"',
        "APNs failures should escalate to L2 via the standard triage",
        "If the user's Android ownership type should be allowed: set the column",
        "what the user should have seen during setup",
        "shows Not Applicable for an app that should apply based on group membership",
    ]
    reached = sum(bool(judge_worklist("f.md", s + "\n", "REWRITTEN\n")) for s in inversions)
    hi = sum(1 for s in inversions
             if judge_worklist("f.md", s + "\n", "X\n")[0]["risk"] == "high")
    print(f"  [{'ok' if reached == 5 else 'FAIL'}] judge worklist reaches all 5 "
          f"recorded inversions ({reached}/5, {hi} flagged high-risk)")
    failed += reached != 5

    print(f"\n{'PASS' if not failed else 'FAIL'}: {len(cases) + 1 - failed}/"
          f"{len(cases) + 1} self-test assertions")
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
