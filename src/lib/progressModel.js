import { SYSTEMS, CONDS, nodesFor, cardsFor, hasContentFor, findConditionMeta } from '../data/index.js';

export function defaultProgress() {
  return {
    streak: { current: 0, best: 0, lastActiveDate: null },
    activity: {},
    totals: { quizCorrectAllTime: 0, quizTotalAllTime: 0 },
    ratingEvents: [],
    recent: [],
    conditions: {},
  };
}

function todayStr(d = new Date()) { return d.toISOString().slice(0, 10); }
function daysAgoStr(n) { return todayStr(new Date(Date.now() - n * 86400000)); }

function cloneProgress(data) {
  return {
    streak: { ...data.streak },
    activity: { ...data.activity },
    totals: { ...data.totals },
    ratingEvents: [...data.ratingEvents],
    recent: [...data.recent],
    conditions: Object.fromEntries(Object.entries(data.conditions).map(([k, v]) => [k, {
      explored: [...(v.explored || [])],
      cardBox: { ...(v.cardBox || {}) },
      cardReviewedCount: v.cardReviewedCount || 0,
      quiz: v.quiz ? { ...v.quiz } : null,
    }])),
  };
}

function ensureCondition(data, name) {
  if (!data.conditions[name]) {
    data.conditions[name] = { explored: [], cardBox: {}, cardReviewedCount: 0, quiz: null };
  }
  return data.conditions[name];
}

function touchActivity(data, now = new Date()) {
  const today = todayStr(now);
  if (data.activity[today]) return;
  data.activity[today] = true;
  const yesterday = daysAgoStr(1);
  data.streak.current = data.streak.lastActiveDate === yesterday ? (data.streak.current || 0) + 1 : 1;
  data.streak.best = Math.max(data.streak.best || 0, data.streak.current);
  data.streak.lastActiveDate = today;
}

function recordRecent(data, name) {
  data.recent = [name, ...data.recent.filter(n => n !== name)].slice(0, 8);
}

export function exploreNode(data, conditionName, nodeId) {
  const next = cloneProgress(data);
  const c = ensureCondition(next, conditionName);
  if (!c.explored.includes(nodeId)) c.explored.push(nodeId);
  touchActivity(next);
  recordRecent(next, conditionName);
  return next;
}

const SRS_DAYS = { Again: 0, Hard: 1, Good: 3, Easy: 7 };

export function rateCard(data, conditionName, cardIndex, rating) {
  const next = cloneProgress(data);
  const c = ensureCondition(next, conditionName);
  const now = new Date();
  const days = SRS_DAYS[rating] ?? 1;
  const due = new Date(now.getTime() + days * 86400000).toISOString();
  c.cardBox[cardIndex] = { lastRating: rating, due, ratedAt: now.toISOString() };
  c.cardReviewedCount = (c.cardReviewedCount || 0) + 1;
  next.ratingEvents = [...next.ratingEvents, { t: now.toISOString() }].slice(-300);
  touchActivity(next, now);
  recordRecent(next, conditionName);
  return next;
}

export function recordQuiz(data, conditionName, score, total) {
  const next = cloneProgress(data);
  const c = ensureCondition(next, conditionName);
  const now = new Date();
  const prevAttempts = c.quiz?.attempts || 0;
  const prevBest = c.quiz?.bestScore ?? -1;
  c.quiz = {
    attempts: prevAttempts + 1,
    lastScore: score,
    bestScore: Math.max(prevBest, score),
    total,
    lastAttemptAt: now.toISOString(),
  };
  next.totals = {
    quizCorrectAllTime: (next.totals.quizCorrectAllTime || 0) + score,
    quizTotalAllTime: (next.totals.quizTotalAllTime || 0) + total,
  };
  touchActivity(next, now);
  recordRecent(next, conditionName);
  return next;
}

/* ───────────── selectors (pure, read-only) ───────────── */

function isStarted(cond) {
  return !!cond && (cond.explored.length > 0 || cond.cardReviewedCount > 0 || !!cond.quiz);
}

export function conditionMasteryPct(data, conditionName) {
  const cond = data.conditions[conditionName];
  if (!cond) return 0;
  const totalNodes = nodesFor(conditionName).length || 10;
  const exploredFrac = Math.min(1, cond.explored.length / totalNodes);
  if (cond.quiz && cond.quiz.total) {
    const quizFrac = cond.quiz.bestScore / cond.quiz.total;
    return Math.round((exploredFrac * 0.6 + quizFrac * 0.4) * 100);
  }
  return Math.round(exploredFrac * 100);
}

export function dueCardsForCondition(data, conditionName) {
  const cond = data.conditions[conditionName];
  const bank = cardsFor(conditionName);
  if (!cond || !isStarted(cond)) return 0;
  const now = Date.now();
  let due = 0;
  for (let i = 0; i < bank.length; i++) {
    const entry = cond.cardBox[i];
    if (!entry || new Date(entry.due).getTime() <= now) due++;
  }
  return due;
}

export function totalDueCards(data) {
  let total = 0;
  for (const name of Object.keys(data.conditions)) total += dueCardsForCondition(data, name);
  return total;
}

export function cardsThisWeek(data) {
  const cutoff = Date.now() - 7 * 86400000;
  return data.ratingEvents.filter(e => new Date(e.t).getTime() >= cutoff).length;
}

export function conditionsStartedCount(data) {
  return Object.values(data.conditions).filter(isStarted).length;
}

export function quizAccuracyLabel(data) {
  const { quizCorrectAllTime, quizTotalAllTime } = data.totals;
  if (!quizTotalAllTime) return '—';
  return Math.round((quizCorrectAllTime / quizTotalAllTime) * 100) + '%';
}

export function dashboardStats(data) {
  return [
    { value: String(data.streak.current), label: 'Day streak' },
    { value: String(cardsThisWeek(data)), label: 'Cards this week' },
    { value: String(conditionsStartedCount(data)), label: 'Conditions started' },
    { value: quizAccuracyLabel(data), label: 'Quiz accuracy' },
  ];
}

export function recentList(data) {
  return data.recent.slice(0, 4).map(name => {
    const meta = findConditionMeta(name);
    const sys = SYSTEMS.find(s => s.id === meta.sysId);
    return { name, sys: sys ? sys.name : '', icon: sys ? sys.icon : '📄', pct: conditionMasteryPct(data, name) };
  });
}

export function masteryBySystem(data) {
  return SYSTEMS.map(sys => {
    const names = [...new Set((CONDS[sys.id] || []).map(c => c[0]))];
    const pct = names.length
      ? Math.round(names.reduce((sum, n) => sum + conditionMasteryPct(data, n), 0) / names.length)
      : 0;
    return { icon: sys.icon, name: sys.name, pct };
  });
}

export function heatmapLast21Days(data) {
  return Array.from({ length: 21 }, (_, i) => {
    const day = daysAgoStr(20 - i);
    const active = !!data.activity[day];
    return { active };
  });
}

export function reviewQueue(data, actions) {
  const items = [];
  const startedNames = Object.keys(data.conditions).filter(n => isStarted(data.conditions[n]));

  const dueSorted = startedNames
    .map(n => ({ n, due: dueCardsForCondition(data, n) }))
    .filter(x => x.due > 0)
    .sort((a, b) => b.due - a.due);
  if (dueSorted[0]) {
    items.push({ icon: '🃏', title: `${dueSorted[0].n} · ${dueSorted[0].due} card${dueSorted[0].due === 1 ? '' : 's'} due`, meta: 'Spaced repetition', onClick: () => actions.openTab(dueSorted[0].n, 'cards') });
  }

  const retake = startedNames
    .map(n => data.conditions[n].quiz && { n, q: data.conditions[n].quiz })
    .filter(Boolean)
    .filter(x => x.q.bestScore < x.q.total)
    .sort((a, b) => new Date(b.q.lastAttemptAt) - new Date(a.q.lastAttemptAt))[0];
  if (retake && items.length < 3) {
    items.push({ icon: '📝', title: `${retake.n} quiz`, meta: `Last score ${retake.q.lastScore}/${retake.q.total} · retake`, onClick: () => actions.openTab(retake.n, 'quiz') });
  }

  if (items.length < 3) {
    const unstarted = getAllUnstartedCritical(data);
    for (const name of unstarted) {
      if (items.length >= 3) break;
      const meta = findConditionMeta(name);
      const sys = SYSTEMS.find(s => s.id === meta.sysId);
      items.push({ icon: sys ? sys.icon : '📄', title: `${name} mechanism`, meta: 'Not started', onClick: () => actions.openCond(name) });
    }
  }

  return items.slice(0, 3);
}

function getAllUnstartedCritical(data) {
  const out = [];
  for (const sys of SYSTEMS) {
    for (const [name, urg] of (CONDS[sys.id] || [])) {
      if (urg === 'critical' && hasContentFor(name) && !data.conditions[name]) out.push(name);
    }
  }
  return out;
}
