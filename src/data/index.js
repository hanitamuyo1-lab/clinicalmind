import { SYSTEMS } from './SYSTEMS.js';
import { CONDS } from './CONDS.js';
import { URG } from './URG.js';
import { FAQ } from './FAQ.js';
import { PHASE } from './PHASE.js';
import { NODES } from './NODES.js';
import { EDGES } from './EDGES.js';
import { HF } from './HF.js';
import { STEP_LABELS } from './STEP_LABELS.js';
import { IV_ICONS } from './IV_ICONS.js';
import { CARDS } from './CARDS.js';
import { QUIZ } from './QUIZ.js';
import { EXTRA } from './EXTRA.js';
import { navIcons } from './navIcons.js';
import { aboutStats } from './aboutStats.js';
import { aboutSections } from './aboutSections.js';
import { privacySections } from './privacySections.js';
import { termsSections } from './termsSections.js';

export {
  SYSTEMS, CONDS, URG, FAQ, PHASE, NODES, EDGES, HF, STEP_LABELS, IV_ICONS,
  CARDS, QUIZ, EXTRA, navIcons, aboutStats, aboutSections, privacySections, termsSections
};

/** name -> {sysId, urg} for every condition (handles the one duplicate name across systems) */
export function getAllConditions(){
  const out = [];
  for (const sys of SYSTEMS){
    const list = CONDS[sys.id] || [];
    for (const c of list) out.push({ name: c[0], urg: c[1], sysId: sys.id, sysName: sys.name });
  }
  return out;
}

export function findConditionMeta(name){
  for (const sysId in CONDS){
    const found = CONDS[sysId].find(c => c[0] === name);
    if (found){
      const sys = SYSTEMS.find(s => s.id === sysId);
      return { sysId, sysName: sys ? `${sys.icon} ${sys.name}` : sysId, urgKey: found[1] };
    }
  }
  return { sysId: null, sysName: 'Clinical condition', urgKey: 'high' };
}

export function nodesFor(name){ return (EXTRA[name] && EXTRA[name].nodes) || NODES; }
export function edgesFor(name){ return (EXTRA[name] && EXTRA[name].edges) || EDGES; }
export function entryFor(name){ return (EXTRA[name] && EXTRA[name].entry) || HF; }
export function cardsFor(name){ return (EXTRA[name] && EXTRA[name].cards) || CARDS; }
export function quizFor(name){ return (EXTRA[name] && EXTRA[name].quiz) || QUIZ; }
export function hasContentFor(name){ return name === 'Heart failure' || !!EXTRA[name]; }
