import { Hoverable } from '../components/Hoverable.jsx';
import { useProgress } from '../context/ProgressProvider.jsx';
import { SYSTEMS, CONDS } from '../data/index.js';

const LEARNER_NAME = 'Amara';

function fallbackRecent() {
  return SYSTEMS.slice(0, 4).map(sys => ({
    name: (CONDS[sys.id] || [])[0]?.[0] || sys.name,
    sys: sys.name, icon: sys.icon, pct: 0,
  }));
}

export function Dashboard({ onOpenCond, onGoTab }) {
  const { stats, recent, totalDueCards, conditionMasteryPct, getReviewQueue } = useProgress();

  const hfPct = conditionMasteryPct('Heart failure');
  const reviewQueue = getReviewQueue({
    openTab: (name, tab) => { onOpenCond(name); onGoTab(tab); },
    openCond: onOpenCond,
  });
  const recentItems = recent.length ? recent : fallbackRecent();

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <div style={{ maxWidth: 1080 }}>
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 11, fontWeight: 500, letterSpacing: '.1em',
        textTransform: 'uppercase', color: 'var(--teal-bright)', marginBottom: 12,
      }}>
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--teal-bright)', animation: 'blink 2s ease-in-out infinite' }} />
        Welcome back
      </div>
      <h1 style={{ fontFamily: 'var(--serif)', fontSize: 38, lineHeight: 1.08, letterSpacing: '-.03em', margin: '0 0 8px' }}>
        {greeting}, <span style={{ color: 'var(--teal-bright)' }}>{LEARNER_NAME}</span>
      </h1>
      <p style={{ fontSize: 14, color: 'rgba(194,240,234,.55)', margin: '0 0 26px', maxWidth: 520, lineHeight: 1.6 }}>
        You have <strong style={{ color: 'var(--white2)', fontWeight: 500 }}>{totalDueCards} flashcard{totalDueCards === 1 ? '' : 's'}</strong> due.
        Pick up the cascade where you left off.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 26 }}>
        {stats.map((s, i) => (
          <div key={i} style={{ border: '1px solid var(--border)', borderRadius: 13, padding: '16px 16px', background: 'rgba(15,107,94,0.06)' }}>
            <div style={{ fontFamily: 'var(--serif)', fontSize: 27, color: 'var(--teal-bright)', letterSpacing: '-.02em', lineHeight: 1 }}>{s.value}</div>
            <div style={{ fontSize: 10.5, color: 'rgba(194,240,234,.42)', letterSpacing: '.05em', textTransform: 'uppercase', marginTop: 6 }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.55fr 1fr', gap: 16, marginBottom: 26 }}>
        <Hoverable
          onClick={() => onOpenCond('Heart failure')}
          style={{
            cursor: 'pointer', border: '1px solid var(--border2)', borderRadius: 16, padding: 22,
            background: 'linear-gradient(135deg,rgba(15,107,94,0.2),rgba(37,196,168,0.05))', position: 'relative', overflow: 'hidden',
          }}
          hoverStyle={{ borderColor: 'var(--teal-bright)' }}
        >
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--teal-mid)', marginBottom: 10 }}>
            Continue studying · Mechanism map
          </div>
          <div style={{ fontFamily: 'var(--serif)', fontSize: 25, letterSpacing: '-.02em', marginBottom: 6 }}>Heart failure</div>
          <div style={{ fontSize: 13, color: 'rgba(194,240,234,.6)', lineHeight: 1.6, maxWidth: 380, marginBottom: 18 }}>
            Trace how a failing ventricle triggers RAAS, sympathetic drive, and the congestion you see at the bedside.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ flex: 1, height: 7, borderRadius: 99, background: 'rgba(37,196,168,0.12)', overflow: 'hidden', maxWidth: 240 }}>
              <div style={{ height: '100%', width: `${hfPct}%`, background: 'linear-gradient(90deg,var(--teal),var(--teal-bright))' }} />
            </div>
            <span style={{ fontSize: 12, color: 'var(--teal-bright)', fontWeight: 500 }}>{hfPct}%</span>
          </div>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 7, marginTop: 18, fontSize: 13, fontWeight: 500,
            color: 'var(--black)', background: 'var(--teal-bright)', borderRadius: 9, padding: '9px 16px',
          }}>
            Resume map
            <svg viewBox="0 0 16 16" fill="none" style={{ width: 14, height: 14 }}><path d="M3 8h9M8 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
        </Hoverable>

        <div style={{ border: '1px solid var(--border)', borderRadius: 16, padding: 18, background: 'rgba(15,107,94,0.06)' }}>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--teal-mid)', marginBottom: 14 }}>Review queue</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {reviewQueue.length ? reviewQueue.map((r, i) => (
              <Hoverable
                key={i}
                onClick={r.onClick}
                style={{
                  cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 11, padding: '10px 11px', borderRadius: 10,
                  border: '1px solid var(--border)', background: 'rgba(15,107,94,0.08)',
                }}
                hoverStyle={{ borderColor: 'var(--teal-bright)' }}
              >
                <span style={{ width: 30, height: 30, borderRadius: 8, background: 'rgba(37,196,168,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, flex: 'none' }}>{r.icon}</span>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ fontSize: 12.5, color: 'var(--white2)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.title}</div>
                  <div style={{ fontSize: 10.5, color: 'rgba(194,240,234,.42)' }}>{r.meta}</div>
                </div>
                <svg viewBox="0 0 16 16" fill="none" style={{ width: 13, height: 13, color: 'var(--teal-mid)', flex: 'none' }}><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </Hoverable>
            )) : (
              <div style={{ fontSize: 12.5, color: 'rgba(194,240,234,.45)', padding: '10px 2px' }}>Nothing due — explore the library to get started.</div>
            )}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
        <span style={{ fontSize: 10, fontWeight: 500, letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(37,196,168,.5)', whiteSpace: 'nowrap' }}>Jump back in</span>
        <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12 }}>
        {recentItems.map((c, i) => (
          <Hoverable
            key={i}
            onClick={() => onOpenCond(c.name)}
            style={{ cursor: 'pointer', border: '1px solid var(--border)', borderRadius: 13, padding: 15, background: 'rgba(15,107,94,0.06)' }}
            hoverStyle={{ borderColor: 'var(--teal-bright)', background: 'rgba(37,196,168,0.08)' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <span style={{ fontSize: 17 }}>{c.icon}</span>
              <span style={{ fontSize: 10, color: 'rgba(194,240,234,.4)' }}>{c.pct}%</span>
            </div>
            <div style={{ fontSize: 13.5, color: 'var(--white2)', marginBottom: 4, lineHeight: 1.25 }}>{c.name}</div>
            <div style={{ fontSize: 10.5, color: 'rgba(194,240,234,.4)', marginBottom: 10 }}>{c.sys}</div>
            <div style={{ height: 5, borderRadius: 99, background: 'rgba(37,196,168,0.12)', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${c.pct}%`, background: 'linear-gradient(90deg,var(--teal),var(--teal-bright))' }} />
            </div>
          </Hoverable>
        ))}
      </div>
    </div>
  );
}
