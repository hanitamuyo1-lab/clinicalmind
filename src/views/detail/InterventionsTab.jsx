import { IV_ICONS } from '../../data/index.js';

export function InterventionsTab({ entry }) {
  return (
    <div style={{ maxWidth: 760 }}>
      <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '.12em', textTransform: 'uppercase', color: 'rgba(37,196,168,.5)', marginBottom: 14 }}>
        Evidence-linked nursing actions
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
        {entry.interventions.map((iv, i) => (
          <div key={i} style={{ border: '1px solid var(--border)', borderRadius: 11, overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 14px', background: 'rgba(15,107,94,0.1)', borderBottom: '1px solid var(--border)' }}>
              <span style={{ width: 24, height: 24, borderRadius: 6, background: 'rgba(37,196,168,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>{IV_ICONS[iv.category] || '📋'}</span>
              <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--teal-light)' }}>{iv.category}</span>
            </div>
            <div style={{ padding: '11px 14px', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {iv.actions.map((a, j) => (
                <div key={j} style={{ display: 'flex', gap: 9, alignItems: 'flex-start' }}>
                  <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--teal-mid)', flex: 'none', marginTop: 7 }} />
                  <span style={{ fontSize: 13, lineHeight: 1.6, color: 'rgba(194,240,234,.7)' }}>{a}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
