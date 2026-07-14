import { aboutStats, aboutSections } from '../data/index.js';

export function About() {
  return (
    <div style={{ maxWidth: 820 }}>
      <h1 style={{ fontFamily: 'var(--serif)', fontSize: 30, letterSpacing: '-.02em', margin: '0 0 6px' }}>About ClinicalMind</h1>
      <p style={{ fontSize: 13.5, color: 'rgba(194,240,234,.55)', margin: '0 0 24px', maxWidth: 640 }}>
        A pathophysiology study hub built for nursing students — turning disease mechanisms into something you can see, click through, and actually remember on the ward.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 28 }}>
        {aboutStats.map((s, i) => (
          <div key={i} style={{ border: '1px solid var(--border)', borderRadius: 13, padding: 16, background: 'rgba(15,107,94,0.06)' }}>
            <div style={{ fontFamily: 'var(--serif)', fontSize: 26, color: 'var(--teal-bright)', lineHeight: 1 }}>{s.value}</div>
            <div style={{ fontSize: 10.5, color: 'rgba(194,240,234,.42)', letterSpacing: '.05em', textTransform: 'uppercase', marginTop: 6 }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ border: '1px solid var(--border)', borderRadius: 16, padding: 22, background: 'rgba(15,107,94,0.05)', marginBottom: 20 }}>
        <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--teal-mid)', marginBottom: 16 }}>
          Every condition, the same seven-part structure
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {aboutSections.map((sec, i) => (
            <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--teal-bright)', flex: 'none', marginTop: 6 }} />
              <div>
                <div style={{ fontSize: 13.5, color: 'var(--white)', fontWeight: 500, marginBottom: 2 }}>{sec.title}</div>
                <div style={{ fontSize: 12.5, color: 'rgba(194,240,234,.55)', lineHeight: 1.5 }}>{sec.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ border: '1px solid var(--border)', borderRadius: 16, padding: 22, background: 'rgba(15,107,94,0.05)' }}>
        <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--teal-mid)', marginBottom: 10 }}>A note on use</div>
        <p style={{ fontSize: 12.5, color: 'rgba(194,240,234,.6)', lineHeight: 1.6, margin: 0 }}>
          ClinicalMind is a study aid, not a clinical reference — always defer to your institution's protocols, your clinical instructors, and current guidelines when making real patient care decisions. Content here is written to build understanding and support revision, not to replace supervised clinical judgement.
        </p>
      </div>
    </div>
  );
}
