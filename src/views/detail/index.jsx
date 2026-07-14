import { findConditionMeta, hasContentFor, entryFor, nodesFor, edgesFor, cardsFor, quizFor, URG } from '../../data/index.js';
import { MapTab } from './MapTab.jsx';
import { PathoTab } from './PathoTab.jsx';
import { PrioritiesTab } from './PrioritiesTab.jsx';
import { InterventionsTab } from './InterventionsTab.jsx';
import { LinksTab } from './LinksTab.jsx';
import { FlashcardsTab } from './FlashcardsTab.jsx';
import { QuizTab } from './QuizTab.jsx';

const TAB_DEFS = [
  ['map', 'Mechanism Map'], ['patho', 'Pathophysiology'], ['priorities', 'Priorities'],
  ['interventions', 'Interventions'], ['links', 'Clinical Links'], ['cards', 'Flashcards'], ['quiz', 'Quiz'],
];

export function DetailView({ conditionId, tab, onGoTab, onGoLibrary, onOpenCond }) {
  const meta = findConditionMeta(conditionId);
  const hasContent = hasContentFor(conditionId);
  const urg = URG[meta.urgKey];

  return (
    <div style={{ maxWidth: 1120 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 18 }}>
        <div onClick={onGoLibrary} style={{
          cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontSize: 12.5, color: 'var(--teal-bright)',
          background: 'rgba(37,196,168,0.08)', border: '1px solid rgba(37,196,168,0.2)', borderRadius: 8, padding: '7px 13px',
        }}>
          <svg viewBox="0 0 12 12" fill="none" style={{ width: 11, height: 11 }}><path d="M7.5 1.5L3 6l4.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          Library
        </div>
        <div style={{ fontFamily: 'var(--serif)', fontSize: 23, letterSpacing: '-.02em' }}>{conditionId}</div>
        <div style={{ fontSize: 11, color: 'rgba(194,240,234,.5)', background: 'rgba(15,107,94,0.12)', border: '1px solid var(--border)', padding: '4px 11px', borderRadius: 99 }}>{meta.sysName}</div>
        <div style={{
          fontSize: 10, fontWeight: 600, letterSpacing: '.07em', textTransform: 'uppercase', padding: '3px 11px',
          borderRadius: 99, background: `${urg.c}22`, color: urg.c,
        }}>{urg.label}</div>
      </div>

      <div style={{ display: 'flex', gap: 4, borderBottom: '1px solid var(--border)', marginBottom: 22, overflowX: 'auto' }}>
        {TAB_DEFS.map(([t, label]) => {
          const on = tab === t;
          return (
            <div key={t} onClick={() => onGoTab(t)} style={{
              fontSize: 13, padding: '10px 16px', cursor: 'pointer', whiteSpace: 'nowrap',
              borderBottom: `2px solid ${on ? 'var(--teal-bright)' : 'transparent'}`, marginBottom: -1, transition: 'all .15s',
              color: on ? 'var(--teal-bright)' : 'rgba(194,240,234,0.4)', fontWeight: on ? 500 : 300,
            }}>{label}</div>
          );
        })}
      </div>

      {!hasContent ? (
        <div style={{ textAlign: 'center', padding: '56px 20px', border: '1px dashed var(--border2)', borderRadius: 16, background: 'rgba(15,107,94,0.05)' }}>
          <div style={{ fontSize: 30, marginBottom: 12 }}>🧭</div>
          <div style={{ fontFamily: 'var(--serif)', fontSize: 20, marginBottom: 8 }}>Mechanism map in progress</div>
          <div style={{ fontSize: 13, color: 'rgba(194,240,234,.5)', maxWidth: 380, margin: '0 auto 20px', lineHeight: 1.6 }}>
            This condition's interactive cascade is being authored. Study the featured worked example to see how the hub works.
          </div>
          <div onClick={() => onOpenCond('Heart failure')} style={{
            cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 500,
            color: 'var(--black)', background: 'var(--teal-bright)', borderRadius: 9, padding: '10px 18px',
          }}>
            Open featured map · Heart failure
            <svg viewBox="0 0 16 16" fill="none" style={{ width: 14, height: 14 }}><path d="M3 8h9M8 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
        </div>
      ) : (
        <>
          {tab === 'map' && <MapTab conditionId={conditionId} nodes={nodesFor(conditionId)} edges={edgesFor(conditionId)} onGoTab={onGoTab} />}
          {tab === 'patho' && <PathoTab entry={entryFor(conditionId)} />}
          {tab === 'priorities' && <PrioritiesTab entry={entryFor(conditionId)} />}
          {tab === 'interventions' && <InterventionsTab entry={entryFor(conditionId)} />}
          {tab === 'links' && <LinksTab entry={entryFor(conditionId)} onOpenCond={onOpenCond} />}
          {tab === 'cards' && <FlashcardsTab conditionId={conditionId} cardBank={cardsFor(conditionId)} />}
          {tab === 'quiz' && <QuizTab conditionId={conditionId} quizBank={quizFor(conditionId)} />}
        </>
      )}
    </div>
  );
}
