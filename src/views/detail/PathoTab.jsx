import { STEP_LABELS } from '../../data/index.js';

export function PathoTab({ entry }) {
  const cascade = entry.cascade.map((t, i) => ({ n: i + 1, label: STEP_LABELS[i] || `Step ${i + 1}`, text: t }));
  return (
    <div style={{ maxWidth: 760 }}>
      <div style={{
        fontSize: 15, lineHeight: 1.75, color: 'rgba(194,240,234,.85)', padding: '16px 20px', background: 'rgba(15,107,94,0.1)',
        border: '1px solid var(--border)', borderRadius: 11, borderLeft: '3px solid var(--teal-bright)', marginBottom: 24,
      }}>{entry.summary}</div>
      <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '.12em', textTransform: 'uppercase', color: 'rgba(37,196,168,.5)', marginBottom: 6 }}>
        Pathophysiological cascade
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', position: 'relative', paddingLeft: 2 }}>
        {cascade.map((c) => (
          <div key={c.n} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', padding: '11px 0' }}>
            <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'var(--black3)', border: '2px solid var(--teal)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 600, color: 'var(--teal-bright)', flex: 'none' }}>{c.n}</div>
            <div style={{ paddingTop: 4 }}>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--teal-mid)', marginBottom: 3 }}>{c.label}</div>
              <div style={{ fontSize: 13.5, lineHeight: 1.65, color: 'rgba(194,240,234,.78)' }}>{c.text}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
