#!/usr/bin/env node
'use strict';
/*
 * jira-milestone-gate.cjs — GSD ↔ Jira PER-PHASE Stop hook.
 *
 * Generic (no project-specific values). Reads .planning/STATE.md,
 * .planning/ROADMAP.md, and .planning/jira/mapping.json from the project dir
 * and, at end-of-turn, nudges the agent to keep each GSD phase's Jira epic in
 * lockstep with the phase lifecycle via the jira-milestone skill:
 *
 *   no epic for current phase            -> create   (status "created")
 *   phase complete, epic not Done        -> complete (status "completed")
 *   execution begun, epic not InProgress -> start    (status "in_progress")
 *   in_progress, more plans done         -> update   (advances lastCommentedPlans)
 *
 * Contract with mapping.json (per-phase model):
 *   mapping.phases["<N>"] = {
 *     epicKey, name, milestone, status, lastCommentedPlans, created, completedDate
 *   }
 *   status lifecycle: "created" -> "in_progress" -> "completed"
 *
 * Scope: acts on the CURRENT phase (and the just-completed phase, for closeout)
 * only. It does NOT nag to backfill older unsynced phases — that stays a manual
 * `/jira-milestone create-all`.
 *
 * Fail-open everywhere: any parse/IO error or missing file -> allow (exit 0).
 */
const fs = require('fs');
const path = require('path');

function readStdin(){ try { return fs.readFileSync(0, 'utf8'); } catch { return ''; } }
function allow(){ process.exit(0); }
function block(reason){ process.stdout.write(JSON.stringify({ decision: 'block', reason })); process.exit(0); }

function main(){
  let input = {};
  try { input = JSON.parse(readStdin() || '{}'); } catch { input = {}; }
  // Avoid infinite loop: if this Stop was already triggered by a prior block, let it through.
  if (input.stop_hook_active === true) allow();

  const projectDir = input.cwd || process.env.CLAUDE_PROJECT_DIR || process.cwd();
  const statePath   = path.join(projectDir, '.planning', 'STATE.md');
  const roadmapPath = path.join(projectDir, '.planning', 'ROADMAP.md');
  const mappingPath = path.join(projectDir, '.planning', 'jira', 'mapping.json');
  if (!fs.existsSync(statePath) || !fs.existsSync(mappingPath)) allow();

  let stateText, mapping, roadmapText = '';
  try {
    stateText = fs.readFileSync(statePath, 'utf8');
    mapping   = JSON.parse(fs.readFileSync(mappingPath, 'utf8'));
  } catch { allow(); }
  try { roadmapText = fs.existsSync(roadmapPath) ? fs.readFileSync(roadmapPath, 'utf8') : ''; } catch { roadmapText = ''; }

  const phases = (mapping && mapping.phases) || {};

  // ---- parse STATE.md ----
  const fmMatch = stateText.match(/^---\s*([\s\S]*?)\s*---/);
  const fm = fmMatch ? fmMatch[1] : stateText;
  const grabFm = (re) => { const m = fm.match(re); return m ? m[1].trim().replace(/^["']|["']$/g, '') : null; };

  // Current phase: body "Phase: N" under Current Position (frontmatter has no bare "Phase:" line).
  const curMatch = stateText.match(/^Phase:\s*(\d+)\s*$/m);
  const currentPhase = curMatch ? parseInt(curMatch[1], 10) : null;
  if (currentPhase == null) allow();

  const milestone = grabFm(/^milestone:\s*(.+)$/m) || '';

  // Phase-level status text: body "Status:" line + frontmatter status: (combined, lowercased).
  const bodyStatus = (stateText.match(/^Status:\s*(.+)$/m) || [, ''])[1];
  const statusText = ((bodyStatus || '') + ' ' + (grabFm(/^status:\s*(.+)$/m) || '')).toLowerCase();

  // Just-completed phase from stopped_at (e.g. "Phase 76 complete (2/2) — ...").
  const stoppedAt = grabFm(/^stopped_at:\s*(.+)$/m) || '';
  const doneMatch = stoppedAt.match(/Phase\s+(\d+)\s+complete/i);
  const justCompletedPhase = doneMatch ? parseInt(doneMatch[1], 10) : null;

  // ---- ROADMAP helpers ----
  const phaseCheckboxComplete = (n) => {
    if (!roadmapText || n == null) return false;
    const m = roadmapText.match(new RegExp('^- \\[(x| )\\] \\*\\*Phase ' + n + ':', 'm'));
    return m ? m[0].includes('[x]') : false;
  };
  const completedPlanCount = (n) => {
    if (!roadmapText || n == null) return 0;
    return (roadmapText.match(new RegExp('^\\s*- \\[x\\] 0*' + n + '-\\d+-PLAN', 'gm')) || []).length;
  };

  // ---- mapping helpers ----
  const key = (n) => String(n);
  const entryOf = (n) => (n != null && phases[key(n)]) ? phases[key(n)] : null;
  const statusOf = (e) => e ? String(e.status || '').toLowerCase() : null;

  const SKILL = 'invoke the Skill tool with skill="jira-milestone"';

  // 1. COMPLETE a finished phase whose epic exists but isn't Done.
  //    Candidates: the phase named in stopped_at, and the current phase if ROADMAP marks it [x].
  const completeCandidates = [];
  if (justCompletedPhase != null) completeCandidates.push(justCompletedPhase);
  if (phaseCheckboxComplete(currentPhase)) completeCandidates.push(currentPhase);
  for (const cand of completeCandidates) {
    const e = entryOf(cand);
    if (e && statusOf(e) !== 'completed') {
      block(`🟢 Jira phase gate — Phase ${cand} is complete but its epic ${e.epicKey || '(unknown)'} is not Done.\n` +
        `Before ending this turn, ${SKILL} and args="complete ${cand}", then set ` +
        `.planning/jira/mapping.json phases["${cand}"].status = "completed" (and completedDate). ` +
        `Clears once status is "completed".`);
    }
  }

  // 2. CREATE the current phase's epic if it has none (current phase only — no backfill nag).
  const curEntry = entryOf(currentPhase);
  if (!curEntry) {
    block(`🔵 Jira phase gate — Phase ${currentPhase} has no Jira epic yet.\n` +
      `Before ending this turn, ${SKILL} and args="create ${currentPhase}" (read ROADMAP.md for ` +
      `goal/requirements; apply the project's Account + label policy from the skill).\n` +
      `Then record phases["${currentPhase}"] = { "epicKey":"<KEY>", "name":"<phase name>", ` +
      `"milestone":"${milestone}", "status":"created", "lastCommentedPlans":0, "created":"<YYYY-MM-DD>" } ` +
      `in .planning/jira/mapping.json. (If an epic already exists, record it instead of duplicating.)`);
  }

  // 3. START the current phase epic once execution has begun.
  const curStatus = statusOf(curEntry);
  const donePlans = completedPlanCount(currentPhase);
  const executionStarted = donePlans >= 1 || /execut|in.?progress/.test(statusText);
  if (executionStarted && curStatus !== 'in_progress' && curStatus !== 'completed') {
    block(`🟡 Jira phase gate — Phase ${currentPhase} execution has begun but epic ${curEntry.epicKey || '(unknown)'} is not In Progress.\n` +
      `Before ending this turn, ${SKILL} and args="start ${currentPhase}", then set ` +
      `phases["${currentPhase}"].status = "in_progress".`);
  }

  // 4. UPDATE the current phase epic when more plans have completed than last reported.
  const lastCommented = curEntry ? parseInt(curEntry.lastCommentedPlans || 0, 10) : 0;
  if (curStatus === 'in_progress' && donePlans > lastCommented) {
    block(`🟠 Jira phase gate — Phase ${currentPhase} advanced to ${donePlans} completed plan(s) ` +
      `(last comment covered ${lastCommented}).\n` +
      `Before ending this turn, ${SKILL} and args="update ${currentPhase}", then set ` +
      `phases["${currentPhase}"].lastCommentedPlans = ${donePlans}.`);
  }

  allow();
}

try { main(); } catch { process.exit(0); }
