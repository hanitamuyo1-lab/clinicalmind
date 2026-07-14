import { useEffect, useState } from 'react';
import { useProgress } from '../../context/ProgressProvider.jsx';

const RATE_DEFS = [
  ['Again', '<10m', '#e85d5d', 'rgba(232,93,93,0.12)', 'rgba(232,93,93,0.3)'],
  ['Hard', '1d', '#e8a84a', 'rgba(232,168,74,0.12)', 'rgba(232,168,74,0.3)'],
  ['Good', '3d', '#25c4a8', 'rgba(37,196,168,0.12)', 'rgba(37,196,168,0.3)'],
  ['Easy', '7d', '#36d472', 'rgba(54,212,114,0.12)', 'rgba(54,212,114,0.3)'],
];

export function FlashcardsTab({ conditionId, cardBank }) {
  const { actions, data } = useProgress();
  const [cardIndex, setCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => { setCardIndex(0); setFlipped(false); }, [conditionId]);

  const cardsDone = cardIndex >= cardBank.length;
  const card = cardsDone ? cardBank[0] : cardBank[cardIndex];
  const reviewedCount = data.conditions[conditionId]?.cardReviewedCount || 0;
  const cardProg = Math.round((Math.min(cardIndex, cardBank.length) / cardBank.length) * 100);

  function rate(label) {
    actions.rateCard(conditionId, cardIndex, label);
    setFlipped(false);
    setCardIndex(i => i + 1);
  }

  return (
    <div style={{ maxWidth: 620, margin: '0 auto' }}>
      {!cardsDone ? (
        <>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <div style={{ fontSize: 12, color: 'rgba(194,240,234,.5)' }}>Card {cardIndex + 1} of {cardBank.length}</div>
            <div style={{ flex: 1, height: 5, borderRadius: 99, background: 'rgba(37,196,168,0.12)', margin: '0 14px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${cardProg}%`, background: 'var(--teal-bright)' }} />
            </div>
            <div style={{ fontSize: 12, color: 'var(--teal-bright)' }}>{reviewedCount} reviewed</div>
          </div>
          <div
            onClick={() => setFlipped(f => !f)}
            style={{
              cursor: 'pointer', minHeight: 280, border: '1px solid var(--border2)', borderRadius: 18,
              background: 'linear-gradient(150deg,rgba(15,107,94,0.16),rgba(10,14,13,0.4))', padding: 34,
              display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center', position: 'relative',
            }}
          >
            <div style={{ position: 'absolute', top: 16, left: 20, fontSize: 10, fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--teal-mid)' }}>
              {flipped ? 'Answer' : 'Question'}
            </div>
            {!flipped ? (
              <>
                <div style={{ fontFamily: 'var(--serif)', fontSize: 23, lineHeight: 1.35 }}>{card.q}</div>
                <div style={{ fontSize: 11.5, color: 'rgba(194,240,234,.4)', marginTop: 20 }}>Tap to reveal answer</div>
              </>
            ) : (
              <div style={{ fontSize: 15.5, lineHeight: 1.7, color: 'var(--teal-pale)' }}>{card.a}</div>
            )}
          </div>
          {flipped && (
            <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
              {RATE_DEFS.map(([label, sub, c, bg, bd]) => (
                <div key={label} onClick={() => rate(label)} style={{
                  flex: 1, cursor: 'pointer', textAlign: 'center', padding: '12px 6px', borderRadius: 11, fontSize: 13,
                  color: c, background: bg, border: `1px solid ${bd}`, transition: 'all .15s',
                }}>
                  <div style={{ fontWeight: 500 }}>{label}</div>
                  <div style={{ fontSize: 10, opacity: .65, marginTop: 2 }}>{sub}</div>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <div style={{ textAlign: 'center', padding: '56px 20px', border: '1px solid var(--border2)', borderRadius: 18, background: 'rgba(15,107,94,0.08)' }}>
          <div style={{ fontSize: 34, marginBottom: 12 }}>🎉</div>
          <div style={{ fontFamily: 'var(--serif)', fontSize: 24, marginBottom: 8 }}>Deck complete</div>
          <div style={{ fontSize: 13, color: 'rgba(194,240,234,.55)', marginBottom: 20 }}>
            You reviewed all {cardBank.length} {conditionId} cards. They'll resurface on schedule.
          </div>
          <div onClick={() => { setCardIndex(0); setFlipped(false); }} style={{
            cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 500,
            color: 'var(--black)', background: 'var(--teal-bright)', borderRadius: 9, padding: '10px 18px',
          }}>Study again</div>
        </div>
      )}
    </div>
  );
}
