#!/usr/bin/env node
'use strict';
/*
 * jira-milestone-gate.cjs — GSD ↔ Jira Stop hook (Epic-per-milestone + Story-per-phase).
 *
 * Generic except for ONE documented adaptation (see "ADAPTED" below): the milestone's
 * phase count is derived from .planning/ROADMAP.md instead of STATE.md `total_phases`,
 * because in this project STATE.total_phases is stale (18) vs the real v1.9 scope (8),
 * which would make the per-phase "sync" gate nag forever. The lower bound of the
 * milestone's phase range (from the "## Milestones" line) IS reliable, so we count
 * ROADMAP "## Phases" rows at/after that first phase.
 *
 * Watches GSD planning state and nudges the jira-milestone skill at end-of-turn:
 *   no entry/epic for current milestone  -> create   (epic + one Story per phase, all To Do)
 *   execution begun, epic not InProgress -> start    (epic -> In Progress)
 *   per-phase Stories drift vs STATE     -> sync      (create missing / start active / done completed)
 *   milestone complete, epic not Done    -> complete  (stories -> Done, epic -> Done)
 *
 * Fail-open everywhere: any parse/IO error or missing file -> allow (exit 0).
 */
const fs = require('fs');
const path = require('path');
function readStdin(){ try { return fs.readFileSync(0,'utf8'); } catch { return ''; } }
function allow(){ process.exit(0); }
function block(reason){ process.stdout.write(JSON.stringify({decision:'block',reason})); process.exit(0); }
function main(){
  let input={}; try { input=JSON.parse(readStdin()||'{}'); } catch { input={}; }
  if (input.stop_hook_active===true) allow();
  const projectDir = input.cwd || process.env.CLAUDE_PROJECT_DIR || process.cwd();
  const statePath = path.join(projectDir,'.planning','STATE.md');
  const roadmapPath = path.join(projectDir,'.planning','ROADMAP.md');
  const mappingPath = path.join(projectDir,'.planning','jira','mapping.json');
  if (!fs.existsSync(statePath) || !fs.existsSync(mappingPath)) allow();
  let stateText, mapping, roadmapText='';
  try { stateText=fs.readFileSync(statePath,'utf8'); mapping=JSON.parse(fs.readFileSync(mappingPath,'utf8')); } catch { allow(); }
  try { roadmapText = fs.existsSync(roadmapPath) ? fs.readFileSync(roadmapPath,'utf8') : ''; } catch { roadmapText=''; }
  const fmMatch = stateText.match(/^---\s*([\s\S]*?)\s*---/);
  const fm = fmMatch ? fmMatch[1] : stateText;
  const grab=(re,src=fm)=>{ const m=src.match(re); return m?m[1].trim().replace(/^["']|["']$/g,''):null; };
  const version = grab(/^milestone:\s*(.+)$/m);
  const status = (grab(/^status:\s*(.+)$/m)||'').toLowerCase();
  const completedPhases = parseInt(grab(/completed_phases:\s*(\d+)/)||'0',10);
  const completedPlans = parseInt(grab(/completed_plans:\s*(\d+)/)||'0',10);
  const percent = parseInt(grab(/percent:\s*(\d+)/)||'0',10);
  const currentPhase = grab(/^Phase:\s*(\d+(?:\.\d+)?)\b/m, stateText);
  if (!version || !/^v?\d+\.\d+/.test(version)) allow();

  const milestones = (mapping&&mapping.milestones)||{};
  const entry = milestones[version]||null;
  const mStatus = entry?String(entry.status||'').toLowerCase():null;
  const epicKey = entry?entry.epicKey:null;
  const phases = (entry&&entry.phases&&typeof entry.phases==='object')?entry.phases:{};
  const phaseKeys = Object.keys(phases);
  const doneCount = phaseKeys.filter(k=>String((phases[k]||{}).status||'').toLowerCase()==='done').length;

  // --- ADAPTED (option A): total phase count from ROADMAP, not STATE.total_phases (stale here). ---
  function milestonePhaseCountFromRoadmap(){
    if (!roadmapText || !version) return null;
    const vEsc = version.replace(/[.]/g,'\\.');
    // "## Milestones" line for this version: "**vX.Y ...** — Phases <first>-<last> ..."
    const mLine = roadmapText.match(new RegExp('\\*\\*'+vEsc+'[^\\n]*?Phases\\s+(\\d+)','m'));
    if (!mLine) return null;
    const first = parseInt(mLine[1],10);
    // Count "## Phases" checklist rows at/after the milestone's first phase (upper bound may drift).
    const re = /^- \[[ x]\] \*\*Phase (\d+):/gm; let m, count=0;
    while ((m=re.exec(roadmapText))!==null){ if (parseInt(m[1],10) >= first) count++; }
    return count>0 ? count : null;
  }
  const totalPhases = milestonePhaseCountFromRoadmap() ?? phaseKeys.length;

  const executionStarted = completedPlans>0 || /execut|in.?progress|phase\s*\d/.test(status);
  const completeSignal = /milestone[_\s-]*complete|awaiting next milestone|shipped|archived/.test(status) && (percent===100 || (totalPhases>0 && completedPhases>=totalPhases));
  const SKILL = 'invoke the Skill tool with skill="jira-milestone"';

  if (mStatus==='completed') allow();

  if (!entry) block(`🔵 Jira milestone gate — milestone ${version} has no Jira epic yet.\nBefore ending this turn, ${SKILL} and args="create ${version}". This creates the epic AND one child Story per phase from ROADMAP.md (all To Do, assigned per policy, parent = the epic), then records milestones["${version}"] = { "epicKey", "status": "created", "created": "<YYYY-MM-DD>", "phases": { "<phaseNum>": { "issueKey", "status": "todo", "name" }, ... } }. (If an epic for ${version} already exists, record it instead of duplicating.)`);

  if (completeSignal && mStatus!=='completed') block(`🟢 Jira milestone gate — milestone ${version} is complete but epic ${epicKey||'(unknown)'} is not Done.\nBefore ending this turn, ${SKILL} and args="complete ${version}": transition any phase Stories still open to Done, post the audit-summary comment on the epic, transition the epic to Done, then set milestones["${version}"].status = "completed".`);

  if (mStatus==='created' && executionStarted) block(`🟡 Jira milestone gate — milestone ${version} execution has begun but epic ${epicKey||'(unknown)'} is not In Progress.\nBefore ending this turn, ${SKILL} and args="start ${version}" (epic -> In Progress), then set milestones["${version}"].status = "in_progress".`);

  if (mStatus==='created' || mStatus==='in_progress'){
    const missingStories = phaseKeys.length < totalPhases;
    const completionDrift = doneCount < completedPhases;
    const activePhaseObj = currentPhase!=null ? phases[currentPhase] : undefined;
    const activeNeedsStart = currentPhase!=null && (activePhaseObj===undefined || String((activePhaseObj||{}).status||'').toLowerCase()==='todo');
    if (missingStories || completionDrift || activeNeedsStart){
      block(`🟠 Jira milestone gate — per-phase Stories for milestone ${version} are out of sync (mapped ${phaseKeys.length}/${totalPhases} phases; ${doneCount} done vs ${completedPhases} completed in STATE${currentPhase?`; active phase ${currentPhase}`:''}).\nBefore ending this turn, ${SKILL} and args="sync ${version}": from ROADMAP.md + STATE, create any missing phase Stories (To Do), transition the active phase's Story to In Progress, and transition each completed phase's Story to Done; update milestones["${version}"].phases accordingly.`);
    }
  }
  allow();
}
try { main(); } catch { process.exit(0); }
