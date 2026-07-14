import { createContext, useContext, useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { firebaseEnabled, getAnonymousUid } from '../firebase/client.js';
import * as firestoreBackend from '../lib/firestoreBackend.js';
import * as localBackend from '../lib/localBackend.js';
import {
  defaultProgress, exploreNode, rateCard, recordQuiz,
  dashboardStats, recentList, masteryBySystem, heatmapLast21Days, reviewQueue,
  totalDueCards, dueCardsForCondition, conditionMasteryPct,
} from '../lib/progressModel.js';

const ProgressContext = createContext(null);

const LOCAL_UID_KEY = 'clinicalmind_local_uid';
function getLocalUid() {
  let uid = localStorage.getItem(LOCAL_UID_KEY);
  if (!uid) {
    uid = 'local-' + Math.random().toString(36).slice(2);
    localStorage.setItem(LOCAL_UID_KEY, uid);
  }
  return uid;
}

export function ProgressProvider({ children }) {
  const [data, setData] = useState(defaultProgress());
  const [ready, setReady] = useState(false);
  const [backendMode, setBackendMode] = useState(firebaseEnabled ? 'firebase' : 'local');
  const uidRef = useRef(null);
  const backendRef = useRef(localBackend);

  useEffect(() => {
    let cancelled = false;
    async function init() {
      let uid, backend;
      if (firebaseEnabled) {
        try {
          uid = await getAnonymousUid();
          backend = firestoreBackend;
          setBackendMode('firebase');
        } catch {
          uid = getLocalUid();
          backend = localBackend;
          setBackendMode('local-fallback');
        }
      } else {
        uid = getLocalUid();
        backend = localBackend;
        setBackendMode('local');
      }
      uidRef.current = uid;
      backendRef.current = backend;
      const loaded = await backend.load(uid).catch(() => null);
      if (!cancelled) {
        setData(loaded || defaultProgress());
        setReady(true);
      }
    }
    init();
    return () => { cancelled = true; };
  }, []);

  const persist = useCallback((next) => {
    setData(next);
    if (uidRef.current) backendRef.current.save(uidRef.current, next).catch(() => {});
  }, []);

  const actions = useMemo(() => ({
    exploreNode: (conditionName, nodeId) => persist(exploreNode(data, conditionName, nodeId)),
    rateCard: (conditionName, cardIndex, rating) => persist(rateCard(data, conditionName, cardIndex, rating)),
    recordQuiz: (conditionName, score, total) => persist(recordQuiz(data, conditionName, score, total)),
  }), [data, persist]);

  const value = useMemo(() => ({
    ready,
    backendMode,
    data,
    actions,
    stats: dashboardStats(data),
    recent: recentList(data),
    mastery: masteryBySystem(data),
    heat: heatmapLast21Days(data),
    streak: data.streak,
    totalDueCards: totalDueCards(data),
    dueCardsForCondition: (name) => dueCardsForCondition(data, name),
    conditionMasteryPct: (name) => conditionMasteryPct(data, name),
    getReviewQueue: (navActions) => reviewQueue(data, navActions),
  }), [ready, backendMode, data, actions]);

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useProgress must be used within ProgressProvider');
  return ctx;
}
