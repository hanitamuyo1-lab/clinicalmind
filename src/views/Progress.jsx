import { useProgress } from '../context/ProgressProvider.jsx';

export function Progress() {
  const { data, mastery, heat, streak } = useProgress();

  const conditionsStarted = Object.values(data.conditions).filter(c => c.explored.length > 0 || c.cardReviewedCount > 0 || !!c.quiz).length;
  const cardsReviewedTotal = Object.values(data.conditions).reduce((sum, c) => sum + (c.cardReviewedCount || 0), 0);
  const quizAccuracy = data.totals.quizTotalAllTime
    ? Math.round((data.totals.quizCorrectAllTime / data.totals.quizTotalAllTime) * 100) + '%'
    : '—';

  const progStats = [
    { value: String(conditionsStarted), label: 'Conditions' },
    { value: String(cardsReviewedTotal), label: 'Cards reviewed' },
    { value: quizAccuracy, label: 'Quiz accuracy' },
    { value: String(streak.current), label: 'Day streak' },
  ];

  return (
    <div style={{ maxWidth: 1000 }}>
      <h1 style={{ fontFamily: 'var(--serif)', fontSize: 30, letterSpacing: '-.02em', margin: '0 0 6px' }}>Your progress</h1>
      <p style={{ fontSize: 13.5, color: 'rgba(194,240,234,.55)', margin: '0 0 24px' }}>Mastery builds as you explore mechanisms, review cards, and pass quizzes.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 26 }}>
        {progStats.map((s, i) => (
          <div key={i} style={{ border: '1px solid var(--border)', borderRadius: 13, padding: 16, background: 'rgba(15,107,94,0.06)' }}>
            <div style={{ fontFamily: 'var(--serif)', fontSize: 26, color: 'var(--teal-bright)', lineHeight: 1 }}>{s.value}</div>
            <div style={{ fontSize: 10.5, color: 'rgba(194,240,234,.42)', letterSpacing: '.05em', textTransform: 'uppercase', marginTop: 6 }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 16 }}>
        <div style={{ border: '1px solid var(--border)', borderRadius: 16, padding: 20, background: 'rgba(15,107,94,0.05)' }}>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--teal-mid)', marginBottom: 16 }}>Mastery by body system</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
            {mastery.map((m, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 15, width: 20, flex: 'none' }}>{m.icon}</span>
                <div style={{ fontSize: 12.5, color: 'var(--white2)', width: 140, flex: 'none', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{m.name}</div>
                <div style={{ flex: 1, height: 7, borderRadius: 99, background: 'rgba(37,196,168,0.1)', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${m.pct}%`, background: 'linear-gradient(90deg,var(--teal),var(--teal-bright))' }} />
                </div>
                <span style={{ fontSize: 11.5, color: 'var(--teal-bright)', width: 34, textAlign: 'right', flex: 'none' }}>{m.pct}%</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ border: '1px solid var(--border)', borderRadius: 16, padding: 20, background: 'rgba(15,107,94,0.05)' }}>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--teal-mid)', marginBottom: 14 }}>Last 21 days</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 6 }}>
              {heat.map((h, i) => (
                <div key={i} style={{ aspectRatio: '1', borderRadius: 4, background: h.active ? 'var(--teal-bright)' : 'rgba(37,196,168,0.1)' }} />
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 14, fontSize: 10.5, color: 'rgba(194,240,234,.4)' }}>
              Less<span style={{ width: 10, height: 10, borderRadius: 3, background: 'rgba(37,196,168,0.12)' }} />
              <span style={{ width: 10, height: 10, borderRadius: 3, background: 'var(--teal-bright)' }} />More
            </div>
          </div>
          <div style={{ border: '1px solid var(--border)', borderRadius: 16, padding: 20, background: 'linear-gradient(135deg,rgba(15,107,94,0.18),rgba(37,196,168,0.04))' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 22 }}>🔥</span>
              <div>
                <div style={{ fontFamily: 'var(--serif)', fontSize: 24, color: 'var(--teal-bright)', lineHeight: 1 }}>{streak.current}-day streak</div>
                <div style={{ fontSize: 11, color: 'rgba(194,240,234,.5)', marginTop: 2 }}>Best: {streak.best} days · keep it alive</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
