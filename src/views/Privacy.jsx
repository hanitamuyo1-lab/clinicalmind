import { privacySections } from '../data/index.js';

export function Privacy() {
  return (
    <div style={{ maxWidth: 760 }}>
      <h1 style={{ fontFamily: 'var(--serif)', fontSize: 30, letterSpacing: '-.02em', margin: '0 0 6px' }}>Privacy policy</h1>
      <p style={{ fontSize: 13.5, color: 'rgba(194,240,234,.55)', margin: '0 0 24px' }}>How ClinicalMind handles your data.</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {privacySections.map((sec, i) => (
          <div key={i} style={{ border: '1px solid var(--border)', borderRadius: 13, padding: '18px 20px', background: 'rgba(15,107,94,0.05)' }}>
            <div style={{ fontSize: 13.5, color: 'var(--white)', fontWeight: 500, marginBottom: 6 }}>{sec.title}</div>
            <div style={{ fontSize: 12.5, color: 'rgba(194,240,234,.6)', lineHeight: 1.6 }}>{sec.body}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
