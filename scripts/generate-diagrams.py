"""Generate 14 Style-2 (Dark Terminal) SVG diagrams for runbooks and decision trees.

Uses the Python list method per fireworks-tech-graph SKILL.md mandate.
Each function returns a list of SVG lines; main() writes them to disk.

Style 2 palette:
  bg: linear-gradient #0f0f1a -> #1a1a2e
  panel fill: #0f172a (slate-950)
  panel stroke: #334155 (slate-700)
  text primary: #e2e8f0 (slate-200)
  text secondary: #94a3b8 (slate-400)
  blue (main flow): #3b82f6 / panel #1e3a5f
  red (escalate L2): #ef4444 / panel #450a0a
  green (resolved): #10b981 / panel #052e16
  orange (escalate infra): #f97316 / panel #1c1917
  purple (router/async): #a855f7 / panel #1e1b4b
  teal (Android): #14b8a6 / panel #042f2e
  Font: SF Mono / Fira Code monospace
"""

from __future__ import annotations

import os
import xml.etree.ElementTree as ET
from html import escape as h
from pathlib import Path

OUT_DIR = Path("docs/diagrams")

FONT_STACK = "'SF Mono', 'Fira Code', 'Cascadia Code', 'Courier New', monospace"

# ---------- shared helpers -----------------------------------------------------

def svg_open(viewbox: str, width: int, height: int) -> list[str]:
    return [
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{viewbox}" width="{width}" height="{height}">',
        '  <style>',
        f'    text {{ font-family: {FONT_STACK}; fill: #e2e8f0; letter-spacing: 0.02em; }}',
        '    .title { font-size: 18px; font-weight: 700; fill: #e2e8f0; letter-spacing: 0.02em; }',
        '    .subtitle { font-size: 12px; fill: #94a3b8; }',
        '    .label { font-size: 13px; fill: #e2e8f0; }',
        '    .sub { font-size: 11px; fill: #94a3b8; }',
        '    .edge { font-size: 11px; fill: #cbd5e1; font-weight: 700; }',
        '    .col-head { font-size: 13px; font-weight: 700; fill: #cbd5e1; letter-spacing: 0.08em; }',
        '    .legend { font-size: 11px; fill: #94a3b8; }',
        '  </style>',
        '  <defs>',
        '    <linearGradient id="bg-grad" x1="0%" y1="0%" x2="100%" y2="100%">',
        '      <stop offset="0%" stop-color="#0f0f1a"/>',
        '      <stop offset="100%" stop-color="#1a1a2e"/>',
        '    </linearGradient>',
        '    <marker id="arr-blue" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">',
        '      <polygon points="0,0 10,3.5 0,7" fill="#3b82f6"/>',
        '    </marker>',
        '    <marker id="arr-red" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">',
        '      <polygon points="0,0 10,3.5 0,7" fill="#ef4444"/>',
        '    </marker>',
        '    <marker id="arr-green" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">',
        '      <polygon points="0,0 10,3.5 0,7" fill="#10b981"/>',
        '    </marker>',
        '    <marker id="arr-orange" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">',
        '      <polygon points="0,0 10,3.5 0,7" fill="#f97316"/>',
        '    </marker>',
        '    <marker id="arr-purple" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">',
        '      <polygon points="0,0 10,3.5 0,7" fill="#a855f7"/>',
        '    </marker>',
        '    <marker id="arr-gray" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">',
        '      <polygon points="0,0 10,3.5 0,7" fill="#64748b"/>',
        '    </marker>',
        '  </defs>',
    ]


def svg_bg(width: int, height: int) -> list[str]:
    return [f'  <rect width="{width}" height="{height}" fill="url(#bg-grad)"/>']


def svg_close() -> list[str]:
    return ['</svg>']


def title(x: int, y: int, text: str, sub: str | None = None) -> list[str]:
    out = [f'  <text x="{x}" y="{y}" text-anchor="middle" class="title">{h(text)}</text>']
    if sub:
        out.append(f'  <text x="{x}" y="{y + 22}" text-anchor="middle" class="subtitle">{h(sub)}</text>')
    return out


def diamond(x: int, y: int, w: int, h_: int, lines: list[str], sub: str | None = None) -> list[str]:
    """Decision diamond. (x, y) is top-left of bounding box."""
    cx = x + w // 2
    cy = y + h_ // 2
    pts = f"{cx},{y} {x + w},{cy} {cx},{y + h_} {x},{cy}"
    out = [
        f'  <polygon points="{pts}" fill="#1e3a5f" stroke="#3b82f6" stroke-width="1.5"/>',
    ]
    n = len(lines)
    line_h = 16
    base_y = cy - ((n - 1) * line_h) // 2
    if sub:
        base_y -= 6
    for i, ln in enumerate(lines):
        out.append(f'  <text x="{cx}" y="{base_y + i * line_h + 4}" text-anchor="middle" class="label">{h(ln)}</text>')
    if sub:
        out.append(f'  <text x="{cx}" y="{base_y + n * line_h + 4}" text-anchor="middle" class="sub">{h(sub)}</text>')
    return out


def box(
    x: int, y: int, w: int, h_: int,
    lines: list[str],
    fill: str = "#0f172a",
    stroke: str = "#334155",
    sub: str | None = None,
    sub2: str | None = None,
    rx: int = 8,
    dashed: bool = False,
) -> list[str]:
    sd = ' stroke-dasharray="4 3"' if dashed else ''
    out = [
        f'  <rect x="{x}" y="{y}" width="{w}" height="{h_}" rx="{rx}" ry="{rx}" '
        f'fill="{fill}" stroke="{stroke}" stroke-width="1.5"{sd}/>',
    ]
    cx = x + w // 2
    n_lines = len(lines)
    n_subs = (1 if sub else 0) + (1 if sub2 else 0)
    line_h = 16
    sub_h = 13
    total_h = n_lines * line_h + n_subs * sub_h
    cy = y + h_ // 2
    cur_y = cy - total_h // 2 + 12
    for ln in lines:
        out.append(f'  <text x="{cx}" y="{cur_y}" text-anchor="middle" class="label">{h(ln)}</text>')
        cur_y += line_h
    if sub:
        out.append(f'  <text x="{cx}" y="{cur_y}" text-anchor="middle" class="sub">{h(sub)}</text>')
        cur_y += sub_h
    if sub2:
        out.append(f'  <text x="{cx}" y="{cur_y}" text-anchor="middle" class="sub">{h(sub2)}</text>')
    return out


def resolved(x, y, w, h_, lines, sub=None, sub2=None):
    return box(x, y, w, h_, lines, fill="#052e16", stroke="#10b981", sub=sub, sub2=sub2)


def escalate_l2(x, y, w, h_, lines, sub=None, sub2=None):
    return box(x, y, w, h_, lines, fill="#450a0a", stroke="#ef4444", sub=sub, sub2=sub2)


def escalate_infra(x, y, w, h_, lines, sub=None, sub2=None):
    return box(x, y, w, h_, lines, fill="#1c1917", stroke="#f97316", sub=sub, sub2=sub2)


def action_box(x, y, w, h_, lines, sub=None):
    """Action / process step (light blue tint)."""
    return box(x, y, w, h_, lines, fill="#1e3a5f", stroke="#3b82f6", sub=sub)


def router(x, y, w, h_, lines, sub=None):
    """Symptom router (purple tint)."""
    return box(x, y, w, h_, lines, fill="#1e1b4b", stroke="#a855f7", sub=sub)


def line_arrow(x1, y1, x2, y2, color="blue", label=None, label_offset_x=8, label_offset_y=-4):
    marker = f'arr-{color}'
    stroke_color = {
        "blue": "#3b82f6",
        "red": "#ef4444",
        "green": "#10b981",
        "orange": "#f97316",
        "purple": "#a855f7",
        "gray": "#64748b",
    }[color]
    out = [
        f'  <line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="{stroke_color}" '
        f'stroke-width="1.5" marker-end="url(#{marker})"/>'
    ]
    if label:
        # midpoint with bg
        mx = (x1 + x2) // 2
        my = (y1 + y2) // 2
        pad_x = max(20, len(label) * 4 + 6)
        out.append(
            f'  <rect x="{mx - pad_x // 2 + label_offset_x - 8}" y="{my + label_offset_y - 10}" '
            f'width="{pad_x}" height="14" fill="#0f0f1a" opacity="0.95"/>'
        )
        out.append(
            f'  <text x="{mx + label_offset_x}" y="{my + label_offset_y}" '
            f'text-anchor="middle" class="edge">{h(label)}</text>'
        )
    return out


def path_arrow(d: str, color: str = "blue", dashed: bool = False, label: tuple | None = None):
    """d = SVG path data; label = (x, y, text) optional."""
    marker = f'arr-{color}'
    stroke_color = {
        "blue": "#3b82f6",
        "red": "#ef4444",
        "green": "#10b981",
        "orange": "#f97316",
        "purple": "#a855f7",
        "gray": "#64748b",
    }[color]
    sd = ' stroke-dasharray="5 3"' if dashed else ''
    out = [
        f'  <path d="{d}" stroke="{stroke_color}" stroke-width="1.5" fill="none"{sd} '
        f'marker-end="url(#{marker})"/>'
    ]
    if label:
        x, y, text = label
        pad_x = max(28, len(text) * 5 + 8)
        out.append(
            f'  <rect x="{x - pad_x // 2}" y="{y - 10}" width="{pad_x}" height="14" '
            f'fill="#0f0f1a" opacity="0.95"/>'
        )
        out.append(
            f'  <text x="{x}" y="{y}" text-anchor="middle" class="edge">{h(text)}</text>'
        )
    return out


def legend(items: list[tuple], x: int, y: int) -> list[str]:
    """items = list of (kind, color, text). kind in {'box', 'line'}."""
    out = []
    cur_x = x
    for kind, color, text in items:
        if kind == 'box':
            fill, stroke = color
            out.append(
                f'  <rect x="{cur_x}" y="{y}" width="14" height="14" rx="3" ry="3" '
                f'fill="{fill}" stroke="{stroke}" stroke-width="1.2"/>'
            )
            out.append(f'  <text x="{cur_x + 22}" y="{y + 11}" class="legend">{h(text)}</text>')
        else:  # line
            stroke = color
            out.append(
                f'  <line x1="{cur_x}" y1="{y + 7}" x2="{cur_x + 28}" y2="{y + 7}" '
                f'stroke="{stroke}" stroke-width="1.5"/>'
            )
            out.append(f'  <text x="{cur_x + 36}" y="{y + 11}" class="legend">{h(text)}</text>')
        cur_x += max(30, 22 + len(text) * 6 + 18)
    return out


def footer_path(x: int, y: int, text: str) -> list[str]:
    return [f'  <text x="{x}" y="{y}" text-anchor="end" class="legend">{h(text)}</text>']


# ---------- 4 summary diagrams ------------------------------------------------

def gen_decision_tree_triage():
    """Top-level Windows APv1 initial triage. ViewBox 1100x920."""
    W, H = 1100, 920
    out = svg_open(f"0 0 {W} {H}", W, H)
    out += svg_bg(W, H)
    out += title(W // 2, 36, "Initial Triage Decision Tree", "APv1 (classic Autopilot) — L1 symptom routing  ·  docs/decision-trees/00-initial-triage.md")
    out += [f'  <text x="{W // 2}" y="92" text-anchor="middle" class="sub" font-weight="600" font-size="11" letter-spacing="0.08em" fill="#64748b">START</text>']

    # TRD1: network reachable?
    out += diamond(400, 110, 300, 90, ["Device reaches", "any website?"], sub="TRD1")
    out += escalate_infra(70, 130, 260, 60, ["Escalate: Infrastructure"], sub="No network connectivity  ·  TRE1")
    out += path_arrow("M 400,155 L 330,155", color="orange", label=(365, 148, "No"))

    # TRD1 -> TRD2
    out += path_arrow("M 550,200 L 550,235", color="blue", label=(575, 222, "Yes"))

    # TRD2: login.microsoftonline.com?
    out += diamond(400, 240, 300, 90, ["Reach login.", "microsoftonline.com?"], sub="TRD2")
    out += escalate_infra(70, 260, 260, 60, ["Escalate: Infrastructure"], sub="Autopilot endpoints blocked  ·  TRE2")
    out += path_arrow("M 400,285 L 330,285", color="orange", label=(365, 278, "No"))

    # TRD2 -> TRD4
    out += path_arrow("M 550,330 L 550,365", color="blue", label=(575, 352, "Yes"))

    # TRD4: registered?
    out += diamond(400, 370, 300, 90, ["Device registered", "in Autopilot portal?"], sub="TRD4")
    out += escalate_l2(70, 390, 260, 60, ["Escalate L2"], sub="Device not registered  ·  TRE3")
    out += path_arrow("M 400,415 L 330,415", color="red", label=(365, 408, "No"))

    # TRD4 -> TRD5
    out += path_arrow("M 550,460 L 550,495", color="blue", label=(575, 482, "Yes"))

    # TRD5: symptom?
    out += router(380, 500, 340, 110, ["What is the primary", "observable symptom?"], sub="TRD5  ·  route to sub-tree")

    # Fan-out trunk
    out += [
        '  <path d="M 550,610 L 550,645" stroke="#a855f7" stroke-width="1.5" fill="none"/>',
        '  <path d="M 115,645 L 985,645" stroke="#a855f7" stroke-width="1.5" fill="none"/>',
    ]

    # 5 outcomes at y=700-780
    # ESP sub-tree
    out += path_arrow("M 115,645 L 115,695", color="purple")
    out += [
        f'  <rect x="90" y="660" width="60" height="14" fill="#0f0f1a" opacity="0.95"/>',
        f'  <text x="120" y="671" text-anchor="middle" class="edge">ESP stuck</text>',
    ]
    out += box(25, 700, 180, 80, ["→ ESP Failure Tree"], sub="decision-trees/", sub2="01-esp-failure.md", fill="#1e1b4b", stroke="#a855f7")

    # Profile sub-tree
    out += path_arrow("M 330,645 L 330,695", color="purple")
    out += [
        f'  <rect x="290" y="660" width="80" height="14" fill="#0f0f1a" opacity="0.95"/>',
        f'  <text x="332" y="671" text-anchor="middle" class="edge">no profile</text>',
    ]
    out += box(240, 700, 180, 80, ["→ Profile Assignment"], sub="decision-trees/", sub2="02-profile-assignment.md", fill="#1e1b4b", stroke="#a855f7")

    # TPM sub-tree
    out += path_arrow("M 550,645 L 550,695", color="purple")
    out += [
        f'  <rect x="512" y="660" width="76" height="14" fill="#0f0f1a" opacity="0.95"/>',
        f'  <text x="550" y="671" text-anchor="middle" class="edge">TPM error</text>',
    ]
    out += box(460, 700, 180, 80, ["→ TPM Attestation"], sub="decision-trees/", sub2="03-tpm-attestation.md", fill="#1e1b4b", stroke="#a855f7")

    # Error code → resolved
    out += path_arrow("M 770,645 L 770,695", color="green")
    out += [
        f'  <rect x="728" y="660" width="90" height="14" fill="#0f0f1a" opacity="0.95"/>',
        f'  <text x="773" y="671" text-anchor="middle" class="edge">error code</text>',
    ]
    out += resolved(680, 700, 180, 80, ["Resolved: follow L1", "action in error table"], sub="TRR1  ·  error-codes/00-index.md")

    # OOBE / unclear → L2
    out += path_arrow("M 985,645 L 985,695", color="red")
    out += [
        f'  <rect x="945" y="660" width="80" height="14" fill="#0f0f1a" opacity="0.95"/>',
        f'  <text x="985" y="671" text-anchor="middle" class="edge">OOBE/other</text>',
    ]
    out += escalate_l2(895, 700, 180, 80, ["Escalate L2"], sub="OOBE crash / unclear", sub2="TRE5  ·  TRE6")

    # Sibling triage trees note
    out += [
        f'  <rect x="25" y="808" width="1050" height="80" rx="6" ry="6" fill="#0f172a" stroke="#334155" stroke-width="1" stroke-dasharray="4 3"/>',
        f'  <text x="45" y="828" class="col-head">SIBLING TRIAGE TREES</text>',
        f'  <text x="45" y="852" class="label">·  APv2 Device Preparation Triage — decision-trees/04-apv2-triage.md  (routes to APv2 L1 runbooks, APE1/APE2/APE3 → L2)</text>',
        f'  <text x="45" y="872" class="label">·  macOS / iOS / Android / Linux triage — decision-trees/06-09  (per-platform L1 routing)</text>',
    ]

    # Legend
    out += legend([
        ('box', ('#eff6ff', '#2563eb'), 'Decision'),
        ('box', ('#fff7ed', '#ea580c'), 'Escalate Infrastructure'),
        ('box', ('#fef2f2', '#dc2626'), 'Escalate L2'),
        ('box', ('#f0fdf4', '#16a34a'), 'Resolved'),
        ('box', ('#faf5ff', '#9333ea'), 'Symptom router / sub-tree'),
    ], 25, 900)

    out += footer_path(W - 20, H - 8, "docs/diagrams/decision-tree-triage.svg")
    out += svg_close()
    return out


def gen_l1_runbook_map():
    """L1 runbook map across 6 platforms (APv1, APv2, macOS, iOS, Android, Linux)."""
    W, H = 1400, 1100
    out = svg_open(f"0 0 {W} {H}", W, H)
    out += svg_bg(W, H)
    out += title(W // 2, 36, "L1 Runbook Map  ·  Service Desk Procedures",
                 "33 scripted runbooks across 6 platforms  ·  no PowerShell  ·  portal-only  ·  docs/l1-runbooks/")

    # 6 entry headers
    headers = [
        ("APv1 Initial Triage", "decision-trees/00-initial-triage.md", "#052e16", "#10b981"),
        ("APv2 Device Preparation", "decision-trees/04-apv2-triage.md", "#1e3a5f", "#3b82f6"),
        ("macOS ADE Triage", "decision-trees/06-macos-triage.md", "#1e1b4b", "#a855f7"),
        ("iOS Triage", "decision-trees/07-ios-triage.md", "#1c1917", "#f97316"),
        ("Android Triage", "decision-trees/08-android-triage.md", "#042f2e", "#14b8a6"),
        ("Linux Triage", "decision-trees/09-linux-triage.md", "#450a0a", "#ef4444"),
    ]
    col_w = 215
    gap = 12
    start_x = 30
    head_y = 86
    for i, (name, path, fill, stroke) in enumerate(headers):
        x = start_x + i * (col_w + gap)
        out += box(x, head_y, col_w, 56, [name], sub=path, fill=fill, stroke=stroke)
        # entry arrow
        cx = x + col_w // 2
        out += path_arrow(f"M {cx},{head_y + 56} L {cx},{head_y + 86}", color={"#10b981": "green", "#3b82f6": "blue", "#a855f7": "purple", "#f97316": "orange", "#14b8a6": "green", "#ef4444": "red"}[stroke])

    # Column containers
    col_top = 178
    col_bot = H - 130
    col_h = col_bot - col_top
    for i, (_, _, _, stroke) in enumerate(headers):
        x = start_x + i * (col_w + gap)
        out += [
            f'  <rect x="{x}" y="{col_top}" width="{col_w}" height="{col_h}" '
            f'rx="8" ry="8" fill="#0f172a" stroke="#334155" stroke-width="1"/>',
        ]

    # Column 1: APv1 (5 runbooks: 01-05)
    apv1 = [
        ("RB 01", "Device Not Registered", "Serial not found in Autopilot portal"),
        ("RB 02", "ESP Stuck or Failed", "ESP hang / timeout / on-screen error"),
        ("RB 03", "Profile Not Assigned", "Registered but no/wrong profile"),
        ("RB 04", "Network Connectivity", "Required endpoints unreachable"),
        ("RB 05", "OOBE Fails Immediately", "Crashes/freezes before ESP"),
    ]
    # Column 2: APv2 (4 runbooks: 06-09)
    apv2 = [
        ("RB 06", "Deployment Not Launched", "OOBE done · no Device Prep screen"),
        ("RB 07", "Apps Not Installed", "Device Prep done · apps missing"),
        ("RB 08", "APv1 Registration Conflict", "ESP shown instead of Device Prep"),
        ("RB 09", "Deployment Timeout", "Device Preparation timed out"),
    ]
    # Column 3: macOS (6 runbooks: 10-15)
    macos = [
        ("RB 10", "Device Not Appearing", "Not visible after ADE enrollment"),
        ("RB 11", "Setup Assistant Failed", "Auth fail · Await Config stuck"),
        ("RB 12", "Profile Not Applied", "WiFi/VPN/FileVault missing"),
        ("RB 13", "App Not Installed", "DMG/PKG/VPP failed"),
        ("RB 14", "Compliance / Access", "Non-compliant · M365 blocked"),
        ("RB 15", "Company Portal Sign-In", "Entra registration incomplete"),
    ]
    # Column 4: iOS (6 runbooks: 16-21)
    ios = [
        ("RB 16", "APNs Expired", "Fleetwide outage (all Apple)"),
        ("RB 17", "ADE Not Starting", "Setup Assistant stuck · no MDM"),
        ("RB 18", "Enrollment Restriction", "'Invalid Profile' · 'Can't manage'"),
        ("RB 19", "License Invalid", "User lacks Intune license"),
        ("RB 20", "Device Cap Reached", "Too many devices per user"),
        ("RB 21", "Compliance Blocked", "Non-compliant · CA blocking"),
    ]
    # Column 5: Android (8 runbooks: 22-29)
    android = [
        ("RB 22", "Enrollment Blocked", "Restriction · 'can't enroll'"),
        ("RB 23", "Work Profile Missing", "BYOD · briefcase not created"),
        ("RB 24", "Device Not Enrolled", "No error · device never appeared"),
        ("RB 25", "Compliance Blocked", "Non-compliant · access blocked"),
        ("RB 26", "MGP App Not Installed", "Managed Google Play missing"),
        ("RB 27", "ZTE Failed", "Zero-Touch did not start/stalled"),
        ("RB 28", "Knox Failed", "Samsung KME provisioning fail"),
        ("RB 29", "AOSP Failed", "5 OEMs: RealWear/Zebra/Pico/HTC/Meta"),
    ]
    # Column 6: Linux (4 runbooks: 30-33)
    linux = [
        ("RB 30", "Enrollment Failed", "Cannot enroll into Intune"),
        ("RB 31", "Compliance Non-Compliant", "Device shows non-compliant"),
        ("RB 32", "CA Blocking Web Access", "Edge for Linux · web-app CA"),
        ("RB 33", "Agent Service Failure", "Intune agent service not running"),
    ]
    columns = [
        (apv1, "#052e16", "#10b981"),
        (apv2, "#1e3a5f", "#3b82f6"),
        (macos, "#1e1b4b", "#a855f7"),
        (ios, "#1c1917", "#f97316"),
        (android, "#042f2e", "#14b8a6"),
        (linux, "#450a0a", "#ef4444"),
    ]
    rb_y_start = col_top + 14
    rb_h = 76
    rb_gap = 6
    inner_pad = 10
    inner_w = col_w - 2 * inner_pad
    for ci, (rbs, fill, stroke) in enumerate(columns):
        col_x = start_x + ci * (col_w + gap)
        for ri, (num, name, trig) in enumerate(rbs):
            ry = rb_y_start + ri * (rb_h + rb_gap)
            rx = col_x + inner_pad
            out += [
                f'  <rect x="{rx}" y="{ry}" width="{inner_w}" height="{rb_h}" rx="6" ry="6" '
                f'fill="{fill}" stroke="{stroke}" stroke-width="1.2"/>',
                f'  <text x="{rx + 12}" y="{ry + 18}" class="sub" font-weight="700" letter-spacing="0.05em" fill="#64748b">{h(num)}</text>',
                f'  <text x="{rx + 12}" y="{ry + 38}" class="label" font-weight="600">{h(name)}</text>',
                f'  <text x="{rx + 12}" y="{ry + 58}" class="sub">{h(trig[:32])}</text>',
            ]
            if len(trig) > 32:
                out.append(f'  <text x="{rx + 12}" y="{ry + 70}" class="sub">{h(trig[32:64])}</text>')

    # Footer escalation reminder
    foot_y = H - 100
    out += [
        f'  <rect x="30" y="{foot_y}" width="{W - 60}" height="40" rx="6" ry="6" '
        f'fill="#450a0a" stroke="#ef4444" stroke-width="1.2"/>',
        f'  <text x="{W // 2}" y="{foot_y + 18}" text-anchor="middle" class="label" '
        f'font-weight="700" fill="#fecaca">ESCALATION  →  L2 Runbooks (docs/l2-runbooks/00-index.md)</text>',
        f'  <text x="{W // 2}" y="{foot_y + 33}" text-anchor="middle" class="sub">'
        f'Each platform has its own L1 → L2 escalation node IDs. See docs/diagrams/l2-runbook-escalation.svg</text>',
    ]

    # Legend
    out += legend([
        ('box', ('#f0fdf4', '#16a34a'), 'APv1 / Linux runbook'),
        ('box', ('#eff6ff', '#2563eb'), 'APv2 runbook'),
        ('box', ('#faf5ff', '#9333ea'), 'macOS runbook'),
        ('box', ('#fff7ed', '#ea580c'), 'iOS runbook'),
        ('box', ('#f0fdfa', '#0d9488'), 'Android runbook'),
    ], 30, H - 35)
    out += footer_path(W - 20, H - 8, "docs/diagrams/l1-runbook-map.svg")
    out += svg_close()
    return out


def gen_l2_runbook_escalation():
    """L2 escalation map: L1 sources → log collection → L2 investigation runbooks."""
    W, H = 1400, 1200
    out = svg_open(f"0 0 {W} {H}", W, H)
    out += svg_bg(W, H)
    out += title(W // 2, 36, "L2 Runbook Escalation Map",
                 "L1 escalation node IDs → Log Collection prerequisite → L2 investigation runbooks  ·  docs/l2-runbooks/")

    # Column headers
    out += [
        f'  <text x="200" y="92" text-anchor="middle" class="col-head">L1 ESCALATION SOURCES</text>',
        f'  <text x="600" y="92" text-anchor="middle" class="col-head">PREREQUISITE  ·  LOG COLLECTION</text>',
        f'  <text x="1080" y="92" text-anchor="middle" class="col-head">L2 INVESTIGATION RUNBOOKS</text>',
    ]

    # Lane 1: APv1
    lane1_y = 114
    out += [
        f'  <rect x="20" y="{lane1_y}" width="{W - 40}" height="220" rx="8" ry="8" '
        f'fill="#0f172a" stroke="#334155" stroke-width="1"/>',
        f'  <text x="40" y="{lane1_y + 22}" class="col-head">LANE  ·  APv1 CLASSIC AUTOPILOT</text>',
        f'  <text x="320" y="{lane1_y + 22}" class="sub">classic ESP + registry + Graph  ·  decision-trees 00, 01, 02, 03</text>',
    ]
    # source badges
    sources_apv1 = [
        ("ESE1 · ESE2 · ESE3 · ESE4 · ESE5", "ESP stuck / timeout / error"),
        ("TPE1 · TPE2 · TPE3 · TPE4 · TPE5", "TPM attestation (pre-prov / self-deploy)"),
        ("PRE1 · PRE2 · PRE3 · PRE4 · PRE5 · PRE6", "Profile assignment · sync delay"),
        ("TRE3 · TRE4 · TRE5 · TRE6", "Initial triage escalations"),
    ]
    for i, (badge, note) in enumerate(sources_apv1):
        sy = lane1_y + 40 + i * 42
        out += [
            f'  <rect x="40" y="{sy}" width="320" height="36" rx="4" ry="4" '
            f'fill="#450a0a" stroke="#ef4444" stroke-width="1.2"/>',
            f'  <text x="52" y="{sy + 16}" class="label" font-weight="700" font-size="11" fill="#fecaca">{h(badge)}</text>',
            f'  <text x="52" y="{sy + 30}" class="sub">{h(note)}</text>',
        ]
    # prereq
    out += box(420, lane1_y + 80, 240, 100, ["01 · Log Collection Guide"],
               sub="mdmdiagnosticstool cab", sub2="event logs · registry",
               fill="#1c1917", stroke="#f97316")
    out += [
        f'  <text x="540" y="{lane1_y + 70}" text-anchor="middle" class="sub" font-weight="700">PREREQ</text>',
    ]
    # arrows source → prereq
    for i in range(4):
        sy = lane1_y + 58 + i * 42
        out += path_arrow(f"M 360,{sy} L 420,{lane1_y + 130}", color="red")
    # APv1 L2 runbooks
    apv1_l2 = [
        ("L2 RB 02", "ESP Deep-Dive", "device + user phase, app install conflicts"),
        ("L2 RB 03", "TPM Attestation Investigation", "hardware-specific TPM failures"),
        ("L2 RB 04", "Hybrid Join Investigation", "ODJ Connector, 0x80070774"),
        ("L2 RB 05", "Policy Conflict Analysis", "AppLocker · Security Baseline"),
    ]
    for i, (num, name, note) in enumerate(apv1_l2):
        ry = lane1_y + 36 + i * 46
        out += [
            f'  <rect x="720" y="{ry}" width="640" height="40" rx="6" ry="6" '
            f'fill="#052e16" stroke="#10b981" stroke-width="1.2"/>',
            f'  <text x="734" y="{ry + 16}" class="sub" font-weight="700" letter-spacing="0.05em" fill="#64748b">{h(num)}</text>',
            f'  <text x="734" y="{ry + 32}" class="label" font-weight="600">{h(name)}</text>',
            f'  <text x="930" y="{ry + 32}" class="sub">— {h(note)}</text>',
        ]
        out += path_arrow(f"M 660,{lane1_y + 130} C 690,{lane1_y + 130} 690,{ry + 20} 720,{ry + 20}", color="green")

    # Lane 2: APv2
    lane2_y = lane1_y + 240
    out += [
        f'  <rect x="20" y="{lane2_y}" width="{W - 40}" height="180" rx="8" ry="8" '
        f'fill="#0f172a" stroke="#334155" stroke-width="1"/>',
        f'  <text x="40" y="{lane2_y + 22}" class="col-head">LANE  ·  APv2 DEVICE PREPARATION</text>',
        f'  <text x="340" y="{lane2_y + 22}" class="sub">deployment report + IME + BootstrapperAgent  ·  decision-tree 04</text>',
    ]
    apv2_sources = [("APE1", "Entra join failed"), ("APE2", "Enrollment failed"), ("APE3", "IME / infrastructure failure")]
    for i, (badge, note) in enumerate(apv2_sources):
        sy = lane2_y + 40 + i * 42
        out += [
            f'  <rect x="40" y="{sy}" width="320" height="36" rx="4" ry="4" '
            f'fill="#450a0a" stroke="#ef4444" stroke-width="1.2"/>',
            f'  <text x="52" y="{sy + 16}" class="label" font-weight="700" font-size="11" fill="#fecaca">{h(badge)}</text>',
            f'  <text x="52" y="{sy + 30}" class="sub">{h(note)}</text>',
        ]
    out += box(420, lane2_y + 70, 240, 80, ["06 · APv2 Log Collection"],
               sub="BootstrapperAgent + IME logs", fill="#1c1917", stroke="#f97316")
    for i in range(3):
        sy = lane2_y + 58 + i * 42
        out += path_arrow(f"M 360,{sy} L 420,{lane2_y + 110}", color="red")
    apv2_l2 = [
        ("L2 RB 07", "APv2 Event ID Reference", "BootstrapperAgent event lookup"),
        ("L2 RB 08", "APv2 Deployment Report Guide", "status · phase · failures"),
    ]
    for i, (num, name, note) in enumerate(apv2_l2):
        ry = lane2_y + 40 + i * 46
        out += [
            f'  <rect x="720" y="{ry}" width="640" height="40" rx="6" ry="6" '
            f'fill="#1e3a5f" stroke="#3b82f6" stroke-width="1.2"/>',
            f'  <text x="734" y="{ry + 16}" class="sub" font-weight="700" fill="#64748b">{h(num)}</text>',
            f'  <text x="734" y="{ry + 32}" class="label" font-weight="600">{h(name)}</text>',
            f'  <text x="950" y="{ry + 32}" class="sub">— {h(note)}</text>',
        ]
        out += path_arrow(f"M 660,{lane2_y + 110} C 690,{lane2_y + 110} 690,{ry + 20} 720,{ry + 20}", color="green")

    # Lane 3: macOS
    lane3_y = lane2_y + 200
    out += [
        f'  <rect x="20" y="{lane3_y}" width="{W - 40}" height="200" rx="8" ry="8" '
        f'fill="#0f172a" stroke="#334155" stroke-width="1"/>',
        f'  <text x="40" y="{lane3_y + 22}" class="col-head">LANE  ·  macOS ADE</text>',
        f'  <text x="200" y="{lane3_y + 22}" class="sub">IntuneMacODC + Terminal diagnostics  ·  decision-tree 06</text>',
    ]
    macos_sources = [
        ("L1 · Setup Assistant / Enrollment", "RB 10, RB 11"),
        ("L1 · Profile not applied", "RB 12"),
        ("L1 · App not installed", "RB 13"),
        ("L1 · Compliance / CP Sign-In", "RB 14, RB 15"),
    ]
    for i, (badge, note) in enumerate(macos_sources):
        sy = lane3_y + 40 + i * 38
        out += [
            f'  <rect x="40" y="{sy}" width="320" height="32" rx="4" ry="4" '
            f'fill="#450a0a" stroke="#ef4444" stroke-width="1.2"/>',
            f'  <text x="52" y="{sy + 14}" class="label" font-weight="700" font-size="11" fill="#fecaca">{h(badge)}</text>',
            f'  <text x="52" y="{sy + 27}" class="sub">{h(note)}</text>',
        ]
    out += box(420, lane3_y + 80, 240, 80, ["10 · macOS Log Collection"],
               sub="IntuneMacODC + Terminal", fill="#1c1917", stroke="#f97316")
    for i in range(4):
        sy = lane3_y + 56 + i * 38
        out += path_arrow(f"M 360,{sy} L 420,{lane3_y + 120}", color="red")
    macos_l2 = [
        ("L2 RB 11", "Profile Delivery Investigation", "config profile not delivered"),
        ("L2 RB 12", "App Install Failure", "DMG / PKG / VPP failed"),
        ("L2 RB 13", "Compliance Evaluation", "non-compliant · CA blocking"),
    ]
    for i, (num, name, note) in enumerate(macos_l2):
        ry = lane3_y + 40 + i * 50
        out += [
            f'  <rect x="720" y="{ry}" width="640" height="40" rx="6" ry="6" '
            f'fill="#1e1b4b" stroke="#a855f7" stroke-width="1.2"/>',
            f'  <text x="734" y="{ry + 16}" class="sub" font-weight="700" fill="#64748b">{h(num)}</text>',
            f'  <text x="734" y="{ry + 32}" class="label" font-weight="600">{h(name)}</text>',
            f'  <text x="950" y="{ry + 32}" class="sub">— {h(note)}</text>',
        ]
        out += path_arrow(f"M 660,{lane3_y + 120} C 690,{lane3_y + 120} 690,{ry + 20} 720,{ry + 20}", color="green")

    # Lane 4: iOS
    lane4_y = lane3_y + 220
    out += [
        f'  <rect x="20" y="{lane4_y}" width="{W - 40}" height="160" rx="8" ry="8" '
        f'fill="#0f172a" stroke="#334155" stroke-width="1"/>',
        f'  <text x="40" y="{lane4_y + 22}" class="col-head">LANE  ·  iOS / iPadOS</text>',
        f'  <text x="220" y="{lane4_y + 22}" class="sub">3-method log collection (no CLI tool)  ·  decision-tree 07</text>',
    ]
    ios_sources = [
        ("L1 · APNs / ADE / License", "RB 16, 17, 19, 20"),
        ("L1 · Compliance Blocked", "RB 21"),
        ("L1 · Restriction / Cap", "RB 18, 20"),
    ]
    for i, (badge, note) in enumerate(ios_sources):
        sy = lane4_y + 40 + i * 36
        out += [
            f'  <rect x="40" y="{sy}" width="320" height="30" rx="4" ry="4" '
            f'fill="#450a0a" stroke="#ef4444" stroke-width="1.2"/>',
            f'  <text x="52" y="{sy + 13}" class="label" font-weight="700" font-size="11" fill="#fecaca">{h(badge)}</text>',
            f'  <text x="52" y="{sy + 26}" class="sub">{h(note)}</text>',
        ]
    out += box(420, lane4_y + 50, 240, 80, ["14 · iOS Log Collection"],
               sub="3 methods (no CLI tool)", fill="#1c1917", stroke="#f97316")
    for i in range(3):
        sy = lane4_y + 55 + i * 36
        out += path_arrow(f"M 360,{sy} L 420,{lane4_y + 90}", color="red")
    ios_l2 = [
        ("L2 RB 15", "ADE Token & Profile", "Pattern A-D failure analysis"),
        ("L2 RB 16", "App Install Diagnosis", "[CONFIG]/[TIMING]/[DEFECT]"),
        ("L2 RB 17", "Compliance & CA Timing", "compliance axis + CA timing"),
    ]
    for i, (num, name, note) in enumerate(ios_l2):
        ry = lane4_y + 40 + i * 38
        out += [
            f'  <rect x="720" y="{ry}" width="640" height="32" rx="6" ry="6" '
            f'fill="#1c1917" stroke="#f97316" stroke-width="1.2"/>',
            f'  <text x="734" y="{ry + 14}" class="sub" font-weight="700" fill="#64748b">{h(num)}</text>',
            f'  <text x="734" y="{ry + 27}" class="label" font-weight="600">{h(name)}</text>',
            f'  <text x="950" y="{ry + 27}" class="sub">— {h(note)}</text>',
        ]
        out += path_arrow(f"M 660,{lane4_y + 90} C 690,{lane4_y + 90} 690,{ry + 16} 720,{ry + 16}", color="green")

    # Lane 5: Android
    lane5_y = lane4_y + 180
    out += [
        f'  <rect x="20" y="{lane5_y}" width="{W - 40}" height="180" rx="8" ry="8" '
        f'fill="#0f172a" stroke="#334155" stroke-width="1"/>',
        f'  <text x="40" y="{lane5_y + 22}" class="col-head">LANE  ·  ANDROID ENTERPRISE</text>',
        f'  <text x="280" y="{lane5_y + 22}" class="sub">3-method log collection (Company Portal / Microsoft Intune App / adb logcat)  ·  decision-tree 08</text>',
    ]
    android_sources = [
        ("L1 · GMS Enrollment", "RB 22, 24, 27"),
        ("L1 · BYOD Work Profile", "RB 22, 23, 25, 26"),
        ("L1 · Knox / AOSP", "RB 28, 29"),
        ("L1 · Compliance / MGP", "RB 25, 26"),
    ]
    for i, (badge, note) in enumerate(android_sources):
        sy = lane5_y + 40 + i * 32
        out += [
            f'  <rect x="40" y="{sy}" width="320" height="28" rx="4" ry="4" '
            f'fill="#450a0a" stroke="#ef4444" stroke-width="1.2"/>',
            f'  <text x="52" y="{sy + 12}" class="label" font-weight="700" font-size="11" fill="#fecaca">{h(badge)}</text>',
            f'  <text x="52" y="{sy + 24}" class="sub">{h(note)}</text>',
        ]
    out += box(420, lane5_y + 60, 240, 80, ["18 · Android Log Collection"],
               sub="Company Portal / Intune App / adb", fill="#1c1917", stroke="#f97316")
    for i in range(4):
        sy = lane5_y + 54 + i * 32
        out += path_arrow(f"M 360,{sy} L 420,{lane5_y + 100}", color="red")
    android_l2 = [
        ("L2 RB 19", "Enrollment Investigation", "GMS modes (excludes AOSP)"),
        ("L2 RB 20", "App Install Investigation", "MGP / LOB three-class"),
        ("L2 RB 21", "Compliance Investigation", "Cause A-D incl Play Integrity"),
        ("L2 RB 22", "Knox Investigation", "Samsung KME · Knox portal"),
        ("L2 RB 23", "AOSP Investigation", "5 OEMs: RealWear/Zebra/Pico/HTC/Meta"),
    ]
    for i, (num, name, note) in enumerate(android_l2):
        ry = lane5_y + 38 + i * 28
        out += [
            f'  <rect x="720" y="{ry}" width="640" height="24" rx="6" ry="6" '
            f'fill="#042f2e" stroke="#14b8a6" stroke-width="1.2"/>',
            f'  <text x="734" y="{ry + 16}" class="sub" font-weight="700" fill="#64748b">{h(num)}</text>',
            f'  <text x="800" y="{ry + 16}" class="label" font-weight="600">{h(name)}</text>',
            f'  <text x="1000" y="{ry + 16}" class="sub">— {h(note)}</text>',
        ]
        out += path_arrow(f"M 660,{lane5_y + 100} C 690,{lane5_y + 100} 690,{ry + 12} 720,{ry + 12}", color="green")

    # Lane 6: Linux
    lane6_y = lane5_y + 200
    out += [
        f'  <rect x="20" y="{lane6_y}" width="{W - 40}" height="120" rx="8" ry="8" '
        f'fill="#0f172a" stroke="#334155" stroke-width="1"/>',
        f'  <text x="40" y="{lane6_y + 22}" class="col-head">LANE  ·  LINUX (Ubuntu LTS)</text>',
        f'  <text x="240" y="{lane6_y + 22}" class="sub">journalctl / dpkg / Edge web-app CA only  ·  decision-tree 09</text>',
    ]
    out += [
        f'  <rect x="40" y="{lane6_y + 40}" width="320" height="60" rx="4" ry="4" '
        f'fill="#450a0a" stroke="#ef4444" stroke-width="1.2"/>',
        f'  <text x="52" y="{lane6_y + 58}" class="label" font-weight="700" font-size="11" fill="#fecaca">L1 · RB 30 · 31 · 32 · 33</text>',
        f'  <text x="52" y="{lane6_y + 76}" class="sub">Enrollment · Compliance · CA · Agent service</text>',
    ]
    out += box(420, lane6_y + 40, 240, 60, ["24 · Linux Log Collection"],
               sub="journalctl + dpkg snapshot", fill="#1c1917", stroke="#f97316")
    out += path_arrow(f"M 360,{lane6_y + 70} L 420,{lane6_y + 70}", color="red")
    out += [
        f'  <rect x="720" y="{lane6_y + 40}" width="640" height="60" rx="6" ry="6" '
        f'fill="#052e16" stroke="#10b981" stroke-width="1.2"/>',
        f'  <text x="734" y="{lane6_y + 60}" class="sub" font-weight="700" fill="#64748b">L2 RB 25</text>',
        f'  <text x="734" y="{lane6_y + 80}" class="label" font-weight="600">Linux Agent Investigation</text>',
        f'  <text x="930" y="{lane6_y + 80}" class="sub">— intunemgmt service · auth tokens · journalctl --user 1d</text>',
    ]
    out += path_arrow(f"M 660,{lane6_y + 70} L 720,{lane6_y + 70}", color="green")

    # Legend
    out += legend([
        ('box', ('#fef2f2', '#dc2626'), 'L1 escalation node'),
        ('box', ('#fff7ed', '#ea580c'), 'Log collection prereq'),
        ('box', ('#f0fdf4', '#16a34a'), 'APv1 / Linux L2'),
        ('box', ('#eff6ff', '#2563eb'), 'APv2 L2'),
        ('box', ('#faf5ff', '#9333ea'), 'macOS L2'),
        ('box', ('#fff7ed', '#ea580c'), 'iOS L2'),
        ('box', ('#f0fdfa', '#0d9488'), 'Android L2'),
    ], 30, H - 35)
    out += footer_path(W - 20, H - 8, "docs/diagrams/l2-runbook-escalation.svg")
    out += svg_close()
    return out


def gen_lifecycle_pipeline():
    """3-track lifecycle: APv1 (5) / APv2 (10) / macOS ADE (7)."""
    W, H = 1400, 1000
    out = svg_open(f"0 0 {W} {H}", W, H)
    out += svg_bg(W, H)
    out += title(W // 2, 36, "Autopilot & ADE Lifecycle Pipelines",
                 "End-to-end deployment flow with failure surfaces per stage  ·  docs/lifecycle  ·  docs/lifecycle-apv2  ·  docs/macos-lifecycle")

    # Track 1: APv1 (5 stages)
    t1_y = 90
    out += [
        f'  <rect x="20" y="{t1_y}" width="{W - 40}" height="220" rx="8" ry="8" fill="#0f172a" stroke="#334155" stroke-width="1"/>',
        f'  <text x="40" y="{t1_y + 22}" class="col-head">APv1  ·  CLASSIC AUTOPILOT (5 stages)</text>',
        f'  <text x="370" y="{t1_y + 22}" class="sub">docs/lifecycle/00-overview.md</text>',
    ]
    apv1_stages = [
        ("STAGE 1", "Hardware Hash Import", "Admin · OEM · Partner"),
        ("STAGE 2", "Profile Assignment", "Admin · AAD group"),
        ("STAGE 3", "OOBE (3 modes)", "User · Pre-Prov · Self-Deploy"),
        ("STAGE 4", "ESP (device + user)", "Background MDM"),
        ("STAGE 5", "Post-Enrollment", "Compliance · hand-off"),
    ]
    box_w = 240
    box_gap = 30
    total_w = 5 * box_w + 4 * box_gap
    start = (W - total_w) // 2
    for i, (num, name, sub) in enumerate(apv1_stages):
        x = start + i * (box_w + box_gap)
        out += box(x, t1_y + 40, box_w, 80, [name], sub=sub, fill="#052e16", stroke="#10b981")
        out += [
            f'  <text x="{x + box_w // 2}" y="{t1_y + 36}" text-anchor="middle" class="sub" font-weight="700" letter-spacing="0.05em" fill="#64748b">{h(num)}</text>',
        ]
        if i < 4:
            ax = x + box_w
            out += path_arrow(f"M {ax},{t1_y + 80} L {ax + box_gap},{t1_y + 80}", color="green")

    # Failure callouts row
    apv1_failures = ["Hash not found", "Profile not assigned", "Network · TPM fail", "ESP timeout · App fail", "Compliance not met"]
    for i, fail in enumerate(apv1_failures):
        x = start + i * (box_w + box_gap)
        fy = t1_y + 140
        out += [
            f'  <rect x="{x}" y="{fy}" width="{box_w}" height="50" rx="6" ry="6" '
            f'fill="#450a0a" stroke="#ef4444" stroke-width="1" stroke-dasharray="3 2"/>',
            f'  <text x="{x + box_w // 2}" y="{fy + 28}" text-anchor="middle" class="label" fill="#fecaca">{h(fail)}</text>',
            f'  <text x="{x + box_w // 2}" y="{fy + 44}" text-anchor="middle" class="sub">F_{["HASH","PROFILE","CONN","ESP","COMP"][i]}</text>',
        ]
        out += path_arrow(f"M {x + box_w // 2},{fy} L {x + box_w // 2},{t1_y + 122}", color="red", dashed=True)

    # Track 2: APv2 (10 steps)
    t2_y = t1_y + 240
    out += [
        f'  <rect x="20" y="{t2_y}" width="{W - 40}" height="240" rx="8" ry="8" fill="#0f172a" stroke="#334155" stroke-width="1"/>',
        f'  <text x="40" y="{t2_y + 22}" class="col-head">APv2  ·  DEVICE PREPARATION (10 steps)</text>',
        f'  <text x="400" y="{t2_y + 22}" class="sub">docs/lifecycle-apv2/02-deployment-flow.md  ·  ETG replaces hash pre-staging</text>',
    ]
    apv2_steps = [
        ("Boot", "OEM Win 11"),
        ("Network", "Entra auth"),
        ("Entra join", "Intune enrol"),
        ("IME", "installs"),
        ("Std-user", "enforcement"),
        ("MDM sync", "policies"),
        ("LOB +", "M365 apps"),
        ("PowerShell", "scripts"),
        ("Win32 ·", "Store apps"),
        ("Setup", "complete"),
    ]
    s_w = 122
    s_gap = 12
    total_w2 = 10 * s_w + 9 * s_gap
    start2 = (W - total_w2) // 2
    for i, (l1, l2) in enumerate(apv2_steps):
        x = start2 + i * (s_w + s_gap)
        out += [
            f'  <rect x="{x}" y="{t2_y + 50}" width="{s_w}" height="70" rx="6" ry="6" '
            f'fill="#1e3a5f" stroke="#3b82f6" stroke-width="1.5"/>',
            f'  <text x="{x + s_w // 2}" y="{t2_y + 70}" text-anchor="middle" class="sub" font-weight="700" letter-spacing="0.05em" fill="#64748b">STEP {i + 1}</text>',
            f'  <text x="{x + s_w // 2}" y="{t2_y + 92}" text-anchor="middle" class="label">{h(l1)}</text>',
            f'  <text x="{x + s_w // 2}" y="{t2_y + 108}" text-anchor="middle" class="label">{h(l2)}</text>',
        ]
        if i < 9:
            ax = x + s_w
            out += path_arrow(f"M {ax},{t2_y + 85} L {ax + s_gap},{t2_y + 85}", color="blue")

    # ETG annotation between steps 2-3
    etg_x = start2 + 1 * (s_w + s_gap) + s_w + s_gap // 2 - 110
    out += [
        f'  <rect x="{etg_x}" y="{t2_y + 138}" width="220" height="30" rx="4" ry="4" '
        f'fill="#1e1b4b" stroke="#a855f7" stroke-width="1" stroke-dasharray="3 2"/>',
        f'  <text x="{etg_x + 110}" y="{t2_y + 158}" text-anchor="middle" class="sub">ETG · Enrollment-Time Grouping</text>',
    ]
    out += path_arrow(f"M {etg_x + 110},{t2_y + 138} L {etg_x + 110},{t2_y + 122}", color="purple", dashed=True)

    # APv2 failure callouts at fewer steps (3, 4, 7, 8, 9)
    apv2_fails = [(2, "Enrol fails / APv1 conflict", "F_REG"), (3, "IME install fails", "F_IME"),
                  (6, "LOB/M365 install fail", "F_APP1"), (7, "Script failure", "F_SCRIPT"),
                  (8, "Win32/Store app fail", "F_APP2")]
    for idx, label, code in apv2_fails:
        x = start2 + idx * (s_w + s_gap)
        fy = t2_y + 178
        out += [
            f'  <rect x="{x}" y="{fy}" width="{s_w}" height="48" rx="6" ry="6" '
            f'fill="#450a0a" stroke="#ef4444" stroke-width="1" stroke-dasharray="3 2"/>',
            f'  <text x="{x + s_w // 2}" y="{fy + 22}" text-anchor="middle" class="sub" fill="#fecaca">{h(label)}</text>',
            f'  <text x="{x + s_w // 2}" y="{fy + 40}" text-anchor="middle" class="sub">{h(code)}</text>',
        ]
        out += path_arrow(f"M {x + s_w // 2},{fy} L {x + s_w // 2},{t2_y + 120}", color="red", dashed=True)

    # Track 3: macOS ADE
    t3_y = t2_y + 260
    out += [
        f'  <rect x="20" y="{t3_y}" width="{W - 40}" height="220" rx="8" ry="8" fill="#0f172a" stroke="#334155" stroke-width="1"/>',
        f'  <text x="40" y="{t3_y + 22}" class="col-head">macOS  ·  ADE AUTOMATED DEVICE ENROLLMENT (7 stages)</text>',
        f'  <text x="540" y="{t3_y + 22}" class="sub">docs/macos-lifecycle/00-ade-lifecycle.md  ·  ABM + Intune</text>',
    ]
    macos_stages = [
        ("ABM Device Reg", "Admin · ABM portal"),
        ("ADE Token Sync", ".p7m · 24h auto"),
        ("Profile Assign", "Intune admin"),
        ("Setup Assistant", "Device + user"),
        ("Await Config", "APNs push"),
        ("Company Portal", "User affinity only"),
        ("Desktop / MDM", "MDM + IME dual"),
    ]
    m_w = 180
    m_gap = 12
    total_w3 = 7 * m_w + 6 * m_gap
    start3 = (W - total_w3) // 2
    for i, (name, sub) in enumerate(macos_stages):
        x = start3 + i * (m_w + m_gap)
        out += [
            f'  <rect x="{x}" y="{t3_y + 50}" width="{m_w}" height="80" rx="6" ry="6" '
            f'fill="#1e1b4b" stroke="#a855f7" stroke-width="1.5"/>',
            f'  <text x="{x + m_w // 2}" y="{t3_y + 70}" text-anchor="middle" class="sub" font-weight="700" letter-spacing="0.05em" fill="#64748b">STAGE {i + 1}</text>',
            f'  <text x="{x + m_w // 2}" y="{t3_y + 92}" text-anchor="middle" class="label">{h(name)}</text>',
            f'  <text x="{x + m_w // 2}" y="{t3_y + 116}" text-anchor="middle" class="sub">{h(sub)}</text>',
        ]
        if i < 6:
            ax = x + m_w
            out += path_arrow(f"M {ax},{t3_y + 90} L {ax + m_gap},{t3_y + 90}", color="purple")
    # Userless bypass arc
    s5_cx = start3 + 4 * (m_w + m_gap) + m_w // 2
    s7_cx = start3 + 6 * (m_w + m_gap) + m_w // 2
    out += [
        f'  <path d="M {s5_cx},{t3_y + 130} C {s5_cx},{t3_y + 175} {s7_cx},{t3_y + 175} {s7_cx},{t3_y + 130}" '
        f'stroke="#64748b" stroke-width="1.5" fill="none" stroke-dasharray="5 3" marker-end="url(#arr-gray)"/>',
        f'  <rect x="{(s5_cx + s7_cx) // 2 - 60}" y="{t3_y + 165}" width="120" height="14" fill="#0f0f1a" opacity="0.95"/>',
        f'  <text x="{(s5_cx + s7_cx) // 2}" y="{t3_y + 176}" text-anchor="middle" class="edge">userless · skip Stage 6</text>',
    ]

    # Bottom annotations
    bot_y = t3_y + 240
    out += [
        f'  <rect x="20" y="{bot_y}" width="{W - 40}" height="68" rx="8" ry="8" '
        f'fill="#0f172a" stroke="#334155" stroke-width="1" stroke-dasharray="4 3"/>',
        f'  <text x="40" y="{bot_y + 22}" class="col-head">KEY DIVERGENCES</text>',
        f'  <text x="40" y="{bot_y + 42}" class="sub">·  APv1 requires hardware hash pre-registration (Stage 1); APv2 uses ETG security-group membership at enrollment — no pre-staging needed.</text>',
        f'  <text x="40" y="{bot_y + 58}" class="sub">·  APv1 runs ESP with registry-observable state; APv2 surfaces progress via Intune deployment report; macOS has no ESP equivalent (Await Config + APNs push).</text>',
    ]

    # Legend
    out += legend([
        ('box', ('#f0fdf4', '#16a34a'), 'APv1 stage'),
        ('box', ('#eff6ff', '#2563eb'), 'APv2 step'),
        ('box', ('#faf5ff', '#9333ea'), 'macOS ADE stage'),
        ('box', ('#fef2f2', '#dc2626'), 'Failure surface'),
    ], 30, H - 35)
    out += footer_path(W - 20, H - 8, "docs/diagrams/lifecycle-pipeline.svg")
    out += svg_close()
    return out


# ---------- 10 per-decision-tree diagrams ------------------------------------

def gen_dt_00():
    """Initial Triage — 4-question vertical chain + 5-fan-out."""
    return gen_decision_tree_triage()  # same content


def gen_dt_01():
    """ESP Failure tree."""
    W, H = 1100, 1100
    out = svg_open(f"0 0 {W} {H}", W, H)
    out += svg_bg(W, H)
    out += title(W // 2, 36, "ESP Failure Decision Tree",
                 "APv1 · Enrollment Status Page triage  ·  docs/decision-trees/01-esp-failure.md")

    # Layout: top decision, branches down
    # ESD1: stuck on ESP?
    out += diamond(425, 80, 250, 80, ["Stuck on", "Enrollment Status Page?"], sub="ESD1")
    # ESD1 -> No -> Return
    out += resolved(50, 100, 230, 50, ["Return to Initial Triage"], sub="ESR0")
    out += path_arrow("M 425,120 L 280,120", color="green", label=(355, 113, "No"))
    # ESD1 -> Yes -> ESD2
    out += path_arrow("M 550,160 L 550,205", color="blue", label=(575, 192, "Yes"))

    # ESD2: error code shown?
    out += diamond(425, 210, 250, 80, ["Does ESP show", "an error code?"], sub="ESD2")
    # Yes -> ESD3
    out += path_arrow("M 675,250 L 800,250 L 800,330", color="blue", label=(740, 244, "Yes"))
    # No -> ESD4
    out += path_arrow("M 425,250 L 290,250 L 290,330", color="blue", label=(355, 244, "No"))

    # Left branch: ESD4 (no error)
    out += diamond(165, 335, 250, 80, ["What does the", "screen say?"], sub="ESD4")
    # ESD4 splits 3 ways

    # Setting up your device → ESD5 (30 min)
    out += diamond(50, 470, 220, 80, ["Stuck more than", "30 minutes?"], sub="ESD5")
    out += path_arrow("M 280,415 L 220,470", color="blue", label=(245, 442, "device"))
    # ESD5 No -> wait → ESR5
    out += action_box(40, 580, 240, 60, ["Wait — device phase", "up to 30 min"], sub="ESA5")
    out += path_arrow("M 160,550 L 160,580", color="blue", label=(178, 567, "No"))
    out += resolved(40, 660, 240, 60, ["Within expected", "device phase time"], sub="ESR5")
    out += path_arrow("M 160,640 L 160,660", color="green")
    # ESD5 Yes -> reboot/retry → ESD6
    out += action_box(40, 750, 240, 50, ["Reboot device, retry"], sub="ESA2")
    out += path_arrow("M 270,540 L 290,750", color="blue", label=(280, 640, "Yes"))
    out += diamond(40, 815, 240, 70, ["ESP proceed", "after reboot?"], sub="ESD6")
    out += path_arrow("M 160,800 L 160,815", color="blue")
    out += resolved(40, 905, 110, 50, ["Resolved"], sub="ESR2")
    out += escalate_l2(170, 905, 110, 50, ["Escalate L2"], sub="ESE4")
    out += path_arrow("M 100,885 L 100,905", color="green", label=(115, 898, "Yes"))
    out += path_arrow("M 220,885 L 220,905", color="red", label=(235, 898, "No"))

    # Setting up for name → ESD7 (60 min)
    out += diamond(840, 470, 220, 80, ["Stuck more than", "60 minutes?"], sub="ESD7")
    out += path_arrow("M 415,415 L 845,470", color="blue", label=(660, 440, "user phase"))
    out += action_box(830, 580, 240, 60, ["Wait — user phase", "up to 60 min"], sub="ESA4")
    out += path_arrow("M 950,550 L 950,580", color="blue", label=(968, 567, "No"))
    out += resolved(830, 660, 240, 60, ["Within expected", "user phase time"], sub="ESR4")
    out += path_arrow("M 950,640 L 950,660", color="green")
    out += action_box(830, 750, 240, 50, ["Reboot device, retry"], sub="ESA3")
    out += path_arrow("M 1060,540 L 1060,750", color="blue", label=(1075, 640, "Yes"))
    out += diamond(830, 815, 240, 70, ["ESP proceed", "after reboot?"], sub="ESD8")
    out += path_arrow("M 950,800 L 950,815", color="blue")
    out += resolved(830, 905, 110, 50, ["Resolved"], sub="ESR3")
    out += escalate_l2(960, 905, 110, 50, ["Escalate L2"], sub="ESE5")
    out += path_arrow("M 890,885 L 890,905", color="green", label=(905, 898, "Yes"))
    out += path_arrow("M 1010,885 L 1010,905", color="red", label=(1025, 898, "No"))

    # Cannot tell -> ESE3
    out += escalate_l2(425, 470, 250, 70, ["Escalate L2"], sub="Cannot identify ESP phase  ·  ESE3")
    out += path_arrow("M 290,415 L 525,470", color="red", label=(420, 437, "Cannot tell"))

    # Right branch: ESD3 (error code shown)
    out += diamond(675, 335, 250, 80, ["Can you read", "the error code?"], sub="ESD3")
    # ESD3 Yes -> Lookup
    out += action_box(560, 470, 220, 60, ["Look up code in", "ESP error table"], sub="ESA1")
    out += path_arrow("M 800,415 L 670,470", color="blue", label=(740, 440, "Yes"))
    out += resolved(440, 580, 220, 60, ["Resolved: follow", "L1 Action"], sub="ESR1")
    out += escalate_l2(680, 580, 220, 60, ["Escalate L2"], sub="Code not found  ·  ESE1")
    out += path_arrow("M 620,530 L 550,580", color="green", label=(580, 555, "found"))
    out += path_arrow("M 720,530 L 790,580", color="red", label=(750, 555, "not found"))
    # ESD3 No -> Escalate L2
    out += escalate_l2(800, 470, 250, 60, ["Escalate L2"], sub="Cannot read code  ·  ESE2")
    out += path_arrow("M 925,415 L 925,470", color="red", label=(950, 442, "No"))

    # Legend
    out += legend([
        ('box', ('#eff6ff', '#2563eb'), 'Decision / Action'),
        ('box', ('#f0fdf4', '#16a34a'), 'Resolved'),
        ('box', ('#fef2f2', '#dc2626'), 'Escalate L2'),
    ], 30, H - 35)
    out += footer_path(W - 20, H - 8, "docs/diagrams/decision-tree-01-esp-failure.svg")
    out += svg_close()
    return out


def gen_dt_02():
    """Profile Assignment tree."""
    W, H = 1100, 1000
    out = svg_open(f"0 0 {W} {H}", W, H)
    out += svg_bg(W, H)
    out += title(W // 2, 36, "Profile Assignment Decision Tree",
                 "APv1 · Profile not assigned or wrong profile  ·  docs/decision-trees/02-profile-assignment.md")

    # PRD1: registered?
    out += diamond(425, 80, 250, 80, ["Device registered", "in Autopilot portal?"], sub="PRD1")
    out += resolved(50, 100, 230, 50, ["Return to Initial Triage"], sub="PRR0")
    out += path_arrow("M 425,120 L 280,120", color="green", label=(355, 113, "No"))

    # PRD1 Yes -> PRD2
    out += path_arrow("M 550,160 L 550,205", color="blue", label=(575, 192, "Yes"))
    out += diamond(425, 210, 250, 80, ["Profile assigned", "to device?"], sub="PRD2")

    # PRD2 No -> PRD3 (group check)
    out += path_arrow("M 425,250 L 290,250 L 290,330", color="blue", label=(355, 244, "No"))
    out += diamond(165, 335, 250, 90, ["In correct group for", "profile assignment?"], sub="PRD3")

    # PRD3 No -> add to group → PRD4
    out += action_box(50, 470, 230, 60, ["Add device to", "correct group"], sub="PRA1")
    out += path_arrow("M 240,425 L 165,470", color="blue", label=(200, 447, "No"))
    out += diamond(60, 560, 220, 80, ["Wait 30 min — profile", "now assigned?"], sub="PRD4")
    out += path_arrow("M 165,530 L 165,560", color="blue")
    out += resolved(20, 690, 165, 50, ["Resolved"], sub="PRR1 · after group fix")
    out += escalate_l2(195, 690, 165, 50, ["Escalate L2"], sub="PRE1")
    out += path_arrow("M 110,640 L 110,690", color="green", label=(125, 670, "Yes"))
    out += path_arrow("M 230,640 L 230,690", color="red", label=(245, 670, "No"))

    # PRD3 Yes -> PRE2 (in correct group, not assigning)
    out += escalate_l2(380, 470, 230, 60, ["Escalate L2"], sub="In correct group  ·  PRE2")
    out += path_arrow("M 350,425 L 425,470", color="red", label=(395, 447, "Yes"))

    # PRD3 Don't know -> PRE3
    out += escalate_l2(380, 350, 230, 60, ["Escalate L2"], sub="Cannot verify group  ·  PRE3")
    out += path_arrow("M 415,375 L 380,375", color="red", label=(395, 368, "Don't know"))

    # PRD2 Yes -> PRD5
    out += path_arrow("M 675,250 L 800,250 L 800,330", color="blue", label=(740, 244, "Yes"))
    out += diamond(680, 335, 250, 90, ["Correct profile", "for this device?"], sub="PRD5")

    # PRD5 No (wrong profile) -> PRE4
    out += escalate_l2(840, 470, 230, 60, ["Escalate L2"], sub="Wrong profile  ·  PRE4")
    out += path_arrow("M 870,425 L 950,470", color="red", label=(900, 447, "No"))
    # PRD5 Don't know -> PRE6
    out += escalate_l2(620, 470, 200, 60, ["Escalate L2"], sub="Cannot verify  ·  PRE6")
    out += path_arrow("M 740,425 L 720,470", color="red", label=(727, 447, "Don't know"))

    # PRD5 Yes -> PRD6 (applied?)
    out += path_arrow("M 805,425 L 805,470", color="blue", label=(820, 447, "Yes"))
    out += diamond(680, 470, 250, 80, ["Profile applied", "to device?"], sub="PRD6")
    # PRD6 Yes -> PRR3
    out += resolved(940, 580, 130, 60, ["Resolved"], sub="Applied  ·  PRR3")
    out += path_arrow("M 930,510 L 1010,580", color="green", label=(975, 543, "Yes"))
    # PRD6 Pending -> reboot → PRD7
    out += action_box(700, 580, 220, 60, ["Reboot device,", "wait for sync"], sub="PRA2")
    out += path_arrow("M 805,550 L 810,580", color="blue", label=(820, 567, "Pending"))
    out += diamond(700, 670, 220, 70, ["Profile now", "applied?"], sub="PRD7")
    out += path_arrow("M 810,640 L 810,670", color="blue")
    out += resolved(640, 780, 130, 50, ["Resolved"], sub="PRR2")
    out += escalate_l2(810, 780, 180, 50, ["Escalate L2"], sub="Not applying  ·  PRE5")
    out += path_arrow("M 750,740 L 705,780", color="green", label=(720, 760, "Yes"))
    out += path_arrow("M 870,740 L 900,780", color="red", label=(885, 760, "No"))

    out += legend([
        ('box', ('#eff6ff', '#2563eb'), 'Decision / Action'),
        ('box', ('#f0fdf4', '#16a34a'), 'Resolved'),
        ('box', ('#fef2f2', '#dc2626'), 'Escalate L2'),
    ], 30, H - 35)
    out += footer_path(W - 20, H - 8, "docs/diagrams/decision-tree-02-profile-assignment.svg")
    out += svg_close()
    return out


def gen_dt_03():
    """TPM Attestation tree."""
    W, H = 1100, 950
    out = svg_open(f"0 0 {W} {H}", W, H)
    out += svg_bg(W, H)
    out += title(W // 2, 36, "TPM Attestation Decision Tree",
                 "APv1 · Pre-provisioning / Self-deploying TPM 2.0  ·  docs/decision-trees/03-tpm-attestation.md")

    # TPD1
    out += diamond(370, 80, 360, 90, ["TPM-related error during", "pre-prov / self-deploy?"], sub="TPD1")
    out += resolved(50, 100, 230, 50, ["Return to Initial Triage"], sub="TPR0")
    out += path_arrow("M 370,125 L 280,125", color="green", label=(325, 118, "No"))

    # TPD1 Yes -> TPD2
    out += path_arrow("M 550,170 L 550,215", color="blue", label=(575, 202, "Yes"))
    out += diamond(425, 220, 250, 80, ["TPM enabled", "in BIOS?"], sub="TPD2")

    # TPD2 Don't know -> TPE5
    out += escalate_l2(800, 240, 250, 60, ["Escalate L2"], sub="Cannot access BIOS  ·  TPE5")
    out += path_arrow("M 675,260 L 800,265", color="red", label=(740, 252, "Don't know"))

    # TPD2 No -> Enable in BIOS → TPD3
    out += action_box(50, 350, 230, 60, ["Enable TPM in BIOS,", "save settings"], sub="TPA1")
    out += path_arrow("M 425,260 L 280,360", color="blue", label=(355, 305, "No"))
    out += diamond(50, 440, 230, 80, ["Retry — provisioning", "succeeded?"], sub="TPD3")
    out += path_arrow("M 165,410 L 165,440", color="blue")
    out += resolved(30, 555, 110, 50, ["Resolved"], sub="TPR1")
    out += escalate_l2(160, 555, 130, 50, ["Escalate L2"], sub="TPE1")
    out += path_arrow("M 90,520 L 90,555", color="green", label=(105, 540, "Yes"))
    out += path_arrow("M 230,520 L 230,555", color="red", label=(245, 540, "No"))

    # TPD2 Yes -> TPD4
    out += path_arrow("M 550,300 L 550,345", color="blue", label=(575, 332, "Yes"))
    out += diamond(425, 350, 250, 80, ["TPM version 2.0?"], sub="TPD4")

    # TPD4 No -> TPE2
    out += escalate_l2(800, 360, 250, 60, ["Escalate L2"], sub="Version too old · TPE2")
    out += path_arrow("M 675,390 L 800,390", color="red", label=(740, 383, "No (1.2)"))

    # TPD4 Yes -> TPD5
    out += path_arrow("M 550,430 L 550,475", color="blue", label=(575, 462, "Yes"))
    out += diamond(425, 480, 250, 80, ["Error screen shows", "an error code?"], sub="TPD5")

    # TPD5 Yes -> TPA2 (lookup)
    out += action_box(710, 580, 230, 60, ["Look up code in", "TPM error table"], sub="TPA2")
    out += path_arrow("M 675,520 L 825,580", color="blue", label=(750, 547, "Yes"))
    out += resolved(610, 690, 165, 50, ["Resolved"], sub="found  ·  TPR2")
    out += escalate_l2(795, 690, 165, 50, ["Escalate L2"], sub="not found  ·  TPE3")
    out += path_arrow("M 770,640 L 700,690", color="green", label=(720, 670, "found"))
    out += path_arrow("M 880,640 L 880,690", color="red", label=(905, 670, "not found"))

    # TPD5 No -> TPA3 (power off retry) → TPD6
    out += action_box(40, 600, 250, 70, ["Power off, wait 30 sec,", "retry provisioning"], sub="TPA3")
    out += path_arrow("M 425,520 L 165,600", color="blue", label=(280, 558, "No"))
    out += diamond(50, 700, 240, 70, ["Provisioning succeeded", "after retry?"], sub="TPD6")
    out += path_arrow("M 165,670 L 170,700", color="blue")
    out += resolved(40, 820, 130, 50, ["Resolved"], sub="TPR3")
    out += escalate_l2(180, 820, 170, 50, ["Escalate L2"], sub="No code  ·  TPE4")
    out += path_arrow("M 110,770 L 105,820", color="green", label=(120, 800, "Yes"))
    out += path_arrow("M 230,770 L 265,820", color="red", label=(255, 800, "No"))

    out += legend([
        ('box', ('#eff6ff', '#2563eb'), 'Decision / Action'),
        ('box', ('#f0fdf4', '#16a34a'), 'Resolved'),
        ('box', ('#fef2f2', '#dc2626'), 'Escalate L2'),
    ], 30, H - 35)
    out += footer_path(W - 20, H - 8, "docs/diagrams/decision-tree-03-tpm-attestation.svg")
    out += svg_close()
    return out


def gen_dt_04():
    """APv2 Triage."""
    W, H = 1100, 800
    out = svg_open(f"0 0 {W} {H}", W, H)
    out += svg_bg(W, H)
    out += title(W // 2, 36, "APv2 Device Preparation Triage",
                 "Windows Autopilot Device Preparation  ·  docs/decision-trees/04-apv2-triage.md")

    # APD1
    out += diamond(425, 80, 250, 80, ["ESP displayed", "during OOBE?"], sub="APD1")

    # APD1 Yes -> APR1 (APv1 conflict)
    out += action_box(50, 100, 250, 60, ["Possible APv1", "registration conflict"], sub="APA1")
    out += path_arrow("M 425,120 L 300,120", color="blue", label=(360, 113, "Yes"))
    out += resolved(50, 200, 250, 50, ["See: APv1 Reg Conflict"], sub="L1 RB 08  ·  APR1")
    out += path_arrow("M 175,160 L 175,200", color="green")

    # APD1 No -> APD2
    out += path_arrow("M 550,160 L 550,205", color="blue", label=(575, 192, "No"))
    out += diamond(425, 210, 250, 80, ["Device Preparation", "screen appeared?"], sub="APD2")

    # APD2 No -> APR2 (deployment not launched)
    out += action_box(50, 230, 250, 60, ["Deployment never", "launched"], sub="APA2")
    out += path_arrow("M 425,250 L 300,250", color="blue", label=(360, 243, "No"))
    out += resolved(50, 330, 250, 50, ["See: Deployment Not Launched"], sub="L1 RB 06  ·  APR2")
    out += path_arrow("M 175,290 L 175,330", color="green")

    # APD2 Yes -> APD3
    out += path_arrow("M 550,290 L 550,335", color="blue", label=(575, 322, "Yes"))
    out += router(380, 340, 340, 100, ["What is the primary", "failure symptom?"], sub="APD3")

    # APD3 fan-out
    # Apps not installed -> APR3
    out += action_box(40, 510, 230, 60, ["Check app assignment", "+ deployment report"], sub="APA3")
    out += path_arrow("M 380,440 L 155,510", color="purple", label=(255, 472, "apps/scripts"))
    out += resolved(40, 600, 230, 50, ["See: Apps Not Installed"], sub="L1 RB 07  ·  APR3")
    out += path_arrow("M 155,570 L 155,600", color="green")

    # Timed out -> APR4
    out += action_box(290, 510, 230, 60, ["Check timeout settings", "+ app count"], sub="APA4")
    out += path_arrow("M 480,440 L 405,510", color="purple", label=(440, 472, "timed out"))
    out += resolved(290, 600, 230, 50, ["See: Deployment Timeout"], sub="L1 RB 09  ·  APR4")
    out += path_arrow("M 405,570 L 405,600", color="green")

    # Entra join -> APE1
    out += escalate_l2(540, 510, 230, 70, ["Escalate L2"], sub="Entra join failed", sub2="APE1")
    out += path_arrow("M 580,440 L 655,510", color="red", label=(615, 472, "Entra join"))

    # Enrollment -> APE2
    out += escalate_l2(790, 510, 230, 70, ["Escalate L2"], sub="Enrollment failed", sub2="APE2")
    out += path_arrow("M 680,440 L 905,510", color="red", label=(800, 472, "enrollment"))

    # IME / other -> APE3
    out += escalate_l2(540, 600, 480, 70, ["Escalate L2"], sub="IME failed or other", sub2="APE3 · deployment report phase details")
    out += path_arrow("M 720,400 L 770,600", color="red", label=(745, 500, "IME / other"))

    out += legend([
        ('box', ('#eff6ff', '#2563eb'), 'Decision / Action'),
        ('box', ('#faf5ff', '#9333ea'), 'Symptom router'),
        ('box', ('#f0fdf4', '#16a34a'), 'Resolved (L1 RB)'),
        ('box', ('#fef2f2', '#dc2626'), 'Escalate L2'),
    ], 30, H - 35)
    out += footer_path(W - 20, H - 8, "docs/diagrams/decision-tree-04-apv2-triage.svg")
    out += svg_close()
    return out


def gen_dt_05():
    """Device Lifecycle - 'What do you want to preserve?'"""
    W, H = 1100, 750
    out = svg_open(f"0 0 {W} {H}", W, H)
    out += svg_bg(W, H)
    out += title(W // 2, 36, "Device Lifecycle Decision Tree",
                 "What do you want to preserve?  ·  docs/decision-trees/05-device-lifecycle.md")

    # Q1
    out += diamond(390, 80, 320, 100,
                   ["User's personal data", "(files, photos, personal apps)?"], sub="Q1")
    # Yes -> RETIRE
    out += resolved(40, 110, 280, 80, ["Retire"],
                    sub="Removes org data only", sub2="See: 02-retire-wipe.md")
    out += path_arrow("M 390,130 L 320,150", color="green", label=(355, 130, "Yes — remove org only"))

    # No -> Q2
    out += path_arrow("M 550,180 L 550,225", color="blue", label=(575, 212, "No"))
    out += diamond(390, 230, 320, 100,
                   ["Org enrollment + settings", "(re-use for next user)?"], sub="Q2")

    # Yes -> Q3 (same tenant?)
    out += path_arrow("M 710,280 L 800,280 L 800,355", color="blue", label=(755, 273, "Yes"))
    out += diamond(680, 360, 240, 80, ["Same tenant?"], sub="Q3")
    # Yes -> RESET
    out += resolved(620, 480, 320, 80, ["Autopilot Reset"],
                    sub="APv1 only · keeps org config", sub2="See: 01-autopilot-reset.md")
    out += path_arrow("M 800,440 L 780,480", color="green", label=(795, 460, "Yes"))
    # No -> TENANT
    out += escalate_infra(620, 580, 320, 100, ["Tenant Migration"],
                          sub="Deregister Tenant A,", sub2="re-import to Tenant B  ·  04-tenant-migration.md")
    out += path_arrow("M 920,440 L 850,580", color="orange", label=(890, 510, "No — different tenant"))

    # Q2 No -> Q4
    out += path_arrow("M 390,280 L 290,280 L 290,355", color="blue", label=(345, 273, "No"))
    out += diamond(165, 360, 240, 80, ["Keep user documents", "(Home folder)?"], sub="Q4")
    # Yes -> FRESH
    out += resolved(20, 480, 280, 100, ["Fresh Start"],
                    sub="Removes OEM bloatware", sub2="Keeps user documents  ·  02-retire-wipe.md")
    out += path_arrow("M 245,440 L 200,480", color="green", label=(225, 460, "Yes"))
    # No -> WIPE
    out += escalate_l2(310, 480, 280, 100, ["Wipe"],
                      sub="Factory reset — erases all", sub2="Lost/stolen / hybrid devices  ·  02-retire-wipe.md")
    out += path_arrow("M 385,440 L 430,480", color="red", label=(410, 460, "No"))

    out += legend([
        ('box', ('#eff6ff', '#2563eb'), 'Decision'),
        ('box', ('#f0fdf4', '#16a34a'), 'Action (preserve data)'),
        ('box', ('#fef2f2', '#dc2626'), 'Wipe (data loss)'),
        ('box', ('#fff7ed', '#ea580c'), 'Cross-tenant operation'),
    ], 30, H - 35)
    out += footer_path(W - 20, H - 8, "docs/diagrams/decision-tree-05-device-lifecycle.svg")
    out += svg_close()
    return out


def gen_dt_06():
    """macOS Triage."""
    W, H = 1100, 850
    out = svg_open(f"0 0 {W} {H}", W, H)
    out += svg_bg(W, H)
    out += title(W // 2, 36, "macOS ADE Triage Decision Tree",
                 "macOS Automated Device Enrollment  ·  docs/decision-trees/06-macos-triage.md")

    # MAC1
    out += diamond(425, 80, 250, 90, ["Setup Assistant", "complete?"], sub="MAC1")

    # MAC1 No -> MAC2
    out += path_arrow("M 425,125 L 290,125 L 290,205", color="blue", label=(355, 118, "No"))
    out += diamond(155, 210, 270, 90, ["Device visible in Intune", "Devices > macOS?"], sub="MAC2")

    # MAC2 No -> MACR1
    out += resolved(50, 350, 220, 70, ["Device Not Appearing"], sub="L1 RB 10  ·  MACR1")
    out += path_arrow("M 200,300 L 160,350", color="green", label=(180, 325, "No"))
    # MAC2 Yes -> MACR2
    out += resolved(290, 350, 220, 70, ["Setup Assistant Failed"], sub="L1 RB 11  ·  MACR2")
    out += path_arrow("M 380,300 L 400,350", color="green", label=(390, 325, "Yes"))

    # MAC1 Yes -> MAC3
    out += path_arrow("M 675,125 L 800,125 L 800,205", color="blue", label=(740, 118, "Yes"))
    out += router(620, 210, 360, 100, ["What is the", "primary symptom?"], sub="MAC3 · 5 routes")

    # MAC3 fan-out — 5 outcomes
    outcomes = [
        ("MACR3", "Profile Not Applied", "L1 RB 12", "profile"),
        ("MACR4", "App Not Installed", "L1 RB 13", "app"),
        ("MACR5", "Compliance / Access", "L1 RB 14", "compliance"),
        ("MACR6", "Company Portal Sign-In", "L1 RB 15", "CP signin"),
    ]
    for i, (rid, name, sub, label) in enumerate(outcomes):
        x = 540 + i * 130
        out += resolved(x, 460, 120, 70, [name], sub=sub)
        out += path_arrow(f"M {800 + (i - 1.5) * 30},310 L {x + 60},460", color="green", label=(x + 40, 380 + i * 5, label))

    # Other / unclear -> MACE1
    out += escalate_l2(60, 460, 220, 70, ["Escalate L2"], sub="Other / unclear  ·  MACE1")
    out += path_arrow("M 620,310 L 175,460", color="red", label=(380, 380, "other"))

    out += legend([
        ('box', ('#eff6ff', '#2563eb'), 'Decision'),
        ('box', ('#faf5ff', '#9333ea'), 'Symptom router'),
        ('box', ('#f0fdf4', '#16a34a'), 'Resolved (L1 RB)'),
        ('box', ('#fef2f2', '#dc2626'), 'Escalate L2'),
    ], 30, H - 35)
    out += footer_path(W - 20, H - 8, "docs/diagrams/decision-tree-06-macos-triage.svg")
    out += svg_close()
    return out


def gen_dt_07():
    """iOS Triage."""
    W, H = 1300, 950
    out = svg_open(f"0 0 {W} {H}", W, H)
    out += svg_bg(W, H)
    out += title(W // 2, 36, "iOS / iPadOS Triage Decision Tree",
                 "iOS / iPadOS via Microsoft Intune  ·  docs/decision-trees/07-ios-triage.md")

    # IOS1
    out += diamond(525, 80, 250, 90, ["Device visible in Intune", "Devices > iOS/iPadOS?"], sub="IOS1")

    # IOS1 No -> IOS2 (router)
    out += path_arrow("M 525,125 L 320,125 L 320,210", color="blue", label=(420, 118, "No"))
    out += router(70, 215, 500, 90, ["What did the user", "see or attempt?"], sub="IOS2 · 6 routes")

    # IOS1 Yes -> IOS3 (router)
    out += path_arrow("M 775,125 L 980,125 L 980,210", color="blue", label=(880, 118, "Yes"))
    out += router(730, 215, 500, 90, ["What is the", "primary symptom?"], sub="IOS3 · 3 routes")

    # IOS2 outcomes — 6 paths
    ios2_outcomes = [
        ("IOSR1", "APNs Expired", "L1 RB 16", "fleetwide"),
        ("IOSR2", "ADE Not Starting", "L1 RB 17", "ADE stuck"),
        ("IOSR3", "Enrollment Restriction", "L1 RB 18", "Invalid Profile"),
        ("IOSR4", "License Invalid", "L1 RB 19", "license"),
        ("IOSR5", "Device Cap Reached", "L1 RB 20", "cap"),
        ("IOSE1", "Escalate L2", "Other / unclear", "other"),
    ]
    for i, (rid, name, sub, label) in enumerate(ios2_outcomes):
        col = i % 3
        row = i // 3
        x = 60 + col * 200
        y = 380 + row * 120
        if rid.startswith("IOSE"):
            out += escalate_l2(x, y, 180, 80, [name], sub=sub)
        else:
            out += resolved(x, y, 180, 80, [name], sub=sub)
        # connect from IOS2
        col_color = "red" if rid.startswith("IOSE") else "green"
        out += path_arrow(f"M 320,305 L {x + 90},{y}", color=col_color, label=(x + 80, 340 + (i % 2) * 20, label))

    # IOS3 outcomes — 3 paths
    ios3_outcomes = [
        ("IOSR6", "Compliance Blocked", "L1 RB 21", "compliance"),
        ("IOSE2", "Escalate L2", "iOS L2 index", "profile/config/app"),
        ("IOSE3", "Escalate L2", "Other / unclear", "other"),
    ]
    for i, (rid, name, sub, label) in enumerate(ios3_outcomes):
        x = 730 + i * 175
        y = 400
        if rid.startswith("IOSE"):
            out += escalate_l2(x, y, 160, 80, [name], sub=sub)
        else:
            out += resolved(x, y, 160, 80, [name], sub=sub)
        col_color = "red" if rid.startswith("IOSE") else "green"
        out += path_arrow(f"M 980,305 L {x + 80},{y}", color=col_color, label=(x + 80, 350, label))

    out += legend([
        ('box', ('#eff6ff', '#2563eb'), 'Decision'),
        ('box', ('#faf5ff', '#9333ea'), 'Symptom router'),
        ('box', ('#f0fdf4', '#16a34a'), 'Resolved (L1 RB)'),
        ('box', ('#fef2f2', '#dc2626'), 'Escalate L2'),
    ], 30, H - 35)
    out += footer_path(W - 20, H - 8, "docs/diagrams/decision-tree-07-ios-triage.svg")
    out += svg_close()
    return out


def gen_dt_08():
    """Android Triage — mode-first per Phase 40 D-01."""
    W, H = 1500, 1100
    out = svg_open(f"0 0 {W} {H}", W, H)
    out += svg_bg(W, H)
    out += title(W // 2, 36, "Android Triage Decision Tree",
                 "Mode-first routing per Phase 40 D-01  ·  docs/decision-trees/08-android-triage.md")

    # AND1 — root mode question
    out += diamond((W - 380) // 2, 80, 380, 100, ["What type of Android", "enrollment does this device use?"], sub="AND1 · mode-first")

    # 6 mode branches (5 fan-out + 1 'don't know')
    mode_y = 240
    modes = [
        ("BYOD", "Personal phone\nwork profile (BYOD)", "AND2"),
        ("COBO", "Corporate fully\nmanaged (COBO)", "AND3"),
        ("COSU", "Kiosk / single-purpose\n(Dedicated / COSU)", "AND4"),
        ("ZTE", "Corporate\nZero-Touch (ZTE)", "AND5"),
        ("AOSP", "Specialty hardware\n(AOSP)", "→ RB 29"),
        ("?", "Don't know /\nCan't tell", "→ Escalate L2"),
    ]
    mode_w = 220
    mode_gap = 18
    total_w = 6 * mode_w + 5 * mode_gap
    start_x = (W - total_w) // 2
    for i, (code, label, sub) in enumerate(modes):
        x = start_x + i * (mode_w + mode_gap)
        if code in ("AOSP", "?"):
            # outcomes
            if code == "AOSP":
                out += resolved(x, mode_y, mode_w, 80, [*label.split("\n")], sub=sub)
            else:
                out += escalate_l2(x, mode_y, mode_w, 80, [*label.split("\n")], sub=sub)
        else:
            out += diamond(x, mode_y, mode_w, 80, [*label.split("\n")], sub=sub)
        # arrow from AND1
        out += path_arrow(f"M {W // 2},180 L {x + mode_w // 2},{mode_y}", color="purple", label=(x + mode_w // 2, mode_y - 25, code))

    # AND2 (BYOD) -> 6 outcomes
    sym_y = 400
    out += [f'  <text x="{W // 2}" y="{sym_y - 10}" text-anchor="middle" class="col-head">SHARED SYMPTOM ROUTER (AND2/3/4 converge on common runbooks)</text>']
    shared_outcomes = [
        ("ANDR22", "Enrollment Blocked", "RB 22", "restriction"),
        ("ANDR23", "Work Profile Missing", "RB 23 · BYOD only", "no briefcase"),
        ("ANDR24", "Device Not Enrolled", "RB 24", "no error"),
        ("ANDR25", "Compliance Blocked", "RB 25", "non-compliant"),
        ("ANDR26", "MGP App Not Installed", "RB 26", "app missing"),
        ("ANDR27", "ZTE Failed", "RB 27 · ZTE only", "ZTE-specific"),
        ("ANDE3", "Escalate L2", "Other / unclear", "other"),
    ]
    sw = 200
    sgap = 8
    total_sw = 7 * sw + 6 * sgap
    start_sx = (W - total_sw) // 2
    for i, (rid, name, sub, label) in enumerate(shared_outcomes):
        x = start_sx + i * (sw + sgap)
        y = sym_y + 60
        if rid.startswith("ANDE"):
            out += escalate_l2(x, y, sw, 80, [name], sub=sub)
        else:
            out += resolved(x, y, sw, 80, [name], sub=sub)

    # arrows from each mode diamond into router area
    for i, (code, _, _) in enumerate(modes):
        if code in ("AOSP", "?"):
            continue
        mx = start_x + i * (mode_w + mode_gap) + mode_w // 2
        # all converge into shared symptom outcome zone
        out += path_arrow(f"M {mx},320 L {mx},{sym_y - 30}", color="purple")

    # Note about mode-specific routing
    note_y = sym_y + 200
    out += [
        f'  <rect x="40" y="{note_y}" width="{W - 80}" height="100" rx="8" ry="8" '
        f'fill="#0f172a" stroke="#334155" stroke-width="1" stroke-dasharray="4 3"/>',
        f'  <text x="60" y="{note_y + 22}" class="col-head">MODE-SPECIFIC ROUTING NOTES</text>',
        f'  <text x="60" y="{note_y + 44}" class="sub">·  RB 23 (Work Profile Not Created) is BYOD-only — does not apply to COBO / COSU / ZTE</text>',
        f'  <text x="60" y="{note_y + 60}" class="sub">·  RB 27 (ZTE Enrollment Failed) is ZTE-only — Samsung Knox uses RB 28 (link separately)</text>',
        f'  <text x="60" y="{note_y + 76}" class="sub">·  RB 28 (Knox) and RB 29 (AOSP) are mode-specific terminal nodes — not part of the shared symptom router</text>',
        f'  <text x="60" y="{note_y + 92}" class="sub">·  ZTE branch (AND5) only routes to RB 27 (mode-specific) or RB 25 (post-enrollment compliance) — not the full shared router</text>',
    ]

    out += legend([
        ('box', ('#eff6ff', '#2563eb'), 'Mode decision'),
        ('box', ('#faf5ff', '#9333ea'), 'Mode router'),
        ('box', ('#f0fdf4', '#16a34a'), 'Resolved (L1 RB)'),
        ('box', ('#fef2f2', '#dc2626'), 'Escalate L2'),
    ], 30, H - 35)
    out += footer_path(W - 20, H - 8, "docs/diagrams/decision-tree-08-android-triage.svg")
    out += svg_close()
    return out


def gen_dt_09():
    """Linux Triage."""
    W, H = 1200, 900
    out = svg_open(f"0 0 {W} {H}", W, H)
    out += svg_bg(W, H)
    out += title(W // 2, 36, "Linux Triage Decision Tree",
                 "Linux Intune client (Ubuntu 22.04 / 24.04 LTS)  ·  docs/decision-trees/09-linux-triage.md")

    # LIN1 — root question
    out += router((W - 360) // 2, 90, 360, 100, ["What is the user's", "Linux Intune symptom?"], sub="LIN1 · 5 paths")

    # 5 outcomes
    outcomes_y = 290
    outcomes = [
        ("LINR30", "Enrollment Failed", "L1 RB 30", "cannot enroll", "green"),
        ("LINR31", "Compliance Non-Compliant", "L1 RB 31", "non-compliant", "green"),
        ("LINCA", "Web-app CA via Edge\n(PITFALL-2)", "device-CA NOT supported", "M365 web-app", "orange"),
        ("LINR33", "Agent Service Failure", "L1 RB 33", "service down", "green"),
        ("LINE1", "Escalate L2\nDon't know / Other", "collect dpkg-l, journalctl", "other", "red"),
    ]
    o_w = 210
    o_gap = 18
    total_ow = 5 * o_w + 4 * o_gap
    start_ox = (W - total_ow) // 2
    for i, (rid, name, sub, label, color) in enumerate(outcomes):
        x = start_ox + i * (o_w + o_gap)
        lines = name.split("\n")
        if color == "green":
            out += resolved(x, outcomes_y, o_w, 90, lines, sub=sub)
        elif color == "red":
            out += escalate_l2(x, outcomes_y, o_w, 90, lines, sub=sub)
        else:
            out += escalate_infra(x, outcomes_y, o_w, 90, lines, sub=sub)
        # arrow from LIN1
        ax = x + o_w // 2
        out += path_arrow(f"M {W // 2},190 L {ax},{outcomes_y}", color="purple", label=(ax, 240 + (i % 2) * 20, label))

    # LINCA -> LINR32 (PITFALL-2 routing chain)
    pitfall_x = start_ox + 2 * (o_w + o_gap)
    out += path_arrow(f"M {pitfall_x + o_w // 2},{outcomes_y + 90} L {pitfall_x + o_w // 2},{outcomes_y + 130}", color="orange")
    out += resolved(pitfall_x, outcomes_y + 130, o_w, 90, ["Linux CA Blocking", "Web-App Access"], sub="L1 RB 32  ·  LINR32")

    # PITFALL-2 callout
    note_y = outcomes_y + 270
    out += [
        f'  <rect x="40" y="{note_y}" width="{W - 80}" height="120" rx="8" ry="8" '
        f'fill="#1c1917" stroke="#f97316" stroke-width="1" stroke-dasharray="4 3"/>',
        f'  <text x="60" y="{note_y + 24}" class="col-head" fill="#fed7aa">PITFALL-2  ·  LINUX CA SCOPE</text>',
        f'  <text x="60" y="{note_y + 46}" class="sub">Device-level Conditional Access is NOT supported on Linux. Only WEB-APP CA via Microsoft Edge for Linux is enforced.</text>',
        f'  <text x="60" y="{note_y + 64}" class="sub">If a user reports M365 access blocked from a Linux device, route to RB 32 — but only after confirming Edge for Linux is the failing surface.</text>',
        f'  <text x="60" y="{note_y + 82}" class="sub">See: docs/reference/linux-capability-matrix.md#conditional-access</text>',
        f'  <text x="60" y="{note_y + 102}" class="sub">PITFALL-2 is the most common Linux triage misroute — always verify CA scope before assuming device-level enforcement applies.</text>',
    ]

    out += legend([
        ('box', ('#faf5ff', '#9333ea'), 'Symptom router'),
        ('box', ('#f0fdf4', '#16a34a'), 'Resolved (L1 RB)'),
        ('box', ('#fff7ed', '#ea580c'), 'PITFALL-2 callout / chained route'),
        ('box', ('#fef2f2', '#dc2626'), 'Escalate L2'),
    ], 30, H - 35)
    out += footer_path(W - 20, H - 8, "docs/diagrams/decision-tree-09-linux-triage.svg")
    out += svg_close()
    return out


# ---------- main --------------------------------------------------------------

def write_svg(path: Path, lines: list[str]) -> bool:
    """Write SVG to disk and validate well-formedness."""
    content = "\n".join(lines) + "\n"
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content, encoding="utf-8")
    # Validate well-formedness
    try:
        ET.fromstring(content)
        return True
    except ET.ParseError as e:
        print(f"  [FAIL] {path.name}: {e}")
        return False


def main():
    diagrams = [
        ("decision-tree-triage.svg", gen_decision_tree_triage),
        ("decision-tree-00-initial-triage.svg", gen_decision_tree_triage),  # numbered alias for 00
        ("l1-runbook-map.svg", gen_l1_runbook_map),
        ("l2-runbook-escalation.svg", gen_l2_runbook_escalation),
        ("lifecycle-pipeline.svg", gen_lifecycle_pipeline),
        ("decision-tree-01-esp-failure.svg", gen_dt_01),
        ("decision-tree-02-profile-assignment.svg", gen_dt_02),
        ("decision-tree-03-tpm-attestation.svg", gen_dt_03),
        ("decision-tree-04-apv2-triage.svg", gen_dt_04),
        ("decision-tree-05-device-lifecycle.svg", gen_dt_05),
        ("decision-tree-06-macos-triage.svg", gen_dt_06),
        ("decision-tree-07-ios-triage.svg", gen_dt_07),
        ("decision-tree-08-android-triage.svg", gen_dt_08),
        ("decision-tree-09-linux-triage.svg", gen_dt_09),
    ]
    ok_count = 0
    fail_count = 0
    for name, fn in diagrams:
        try:
            lines = fn()
            path = OUT_DIR / name
            if write_svg(path, lines):
                size = path.stat().st_size
                print(f"  [OK]   {name}  ({size:,} bytes)")
                ok_count += 1
            else:
                fail_count += 1
        except Exception as e:
            print(f"  [FAIL] {name}: {type(e).__name__}: {e}")
            fail_count += 1
    print(f"\n{ok_count}/{len(diagrams)} diagrams generated successfully ({fail_count} failed)")
    return 0 if fail_count == 0 else 1


if __name__ == "__main__":
    raise SystemExit(main())
