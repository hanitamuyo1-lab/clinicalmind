import { useState } from 'react';
import { FAQ } from '../data/index.js';

export function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <div style={{ maxWidth: 760 }}>
      <h1 style={{ fontFamily: 'var(--serif)', fontSize: 30, letterSpacing: '-.02em', margin: '0 0 6px' }}>Frequently asked questions</h1>
      <p style={{ fontSize: 13.5, color: 'rgba(194,240,234,.55)', margin: '0 0 24px' }}>Everything about how the study hub works, in one place.</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {FAQ.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={i} style={{ border: '1px solid var(--border)', borderRadius: 13, background: isOpen ? 'rgba(37,196,168,0.08)' : 'rgba(15,107,94,0.05)', overflow: 'hidden', transition: 'background .15s' }}>
              <div onClick={() => setOpen(o => (o === i ? -1 : i))} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14, padding: '16px 18px', cursor: 'pointer' }}>
                <div style={{ fontSize: 13.5, color: 'var(--white)', fontWeight: 500 }}>{f.q}</div>
                <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'rgba(37,196,168,0.15)', color: 'var(--teal-bright)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, flex: 'none' }}>{isOpen ? '−' : '+'}</div>
              </div>
              {isOpen && <div style={{ padding: '0 18px 16px', fontSize: 12.5, color: 'rgba(194,240,234,.6)', lineHeight: 1.6 }}>{f.a}</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
