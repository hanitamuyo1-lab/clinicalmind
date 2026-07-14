import { useState } from 'react';
import { Hoverable } from '../components/Hoverable.jsx';
import { SYSTEMS, CONDS, URG } from '../data/index.js';

const URG_DEFS = [['all', 'All'], ['critical', 'Critical'], ['high', 'High'], ['mod', 'Moderate']];

export function Library({ onOpenCond }) {
  const [selectedSystem, setSelectedSystem] = useState('cardiac');
  const [urgFilter, setUrgFilter] = useState('all');

  const sysObj = SYSTEMS.find(x => x.id === selectedSystem);
  const rawConds = CONDS[selectedSystem] || [];
  const filtered = urgFilter === 'all' ? rawConds : rawConds.filter(c => c[1] === urgFilter);
  const totalConds = new Set(Object.values(CONDS).flat().map(c => c[0])).size;

  return (
    <div style={{ maxWidth: 1080 }}>
      <h1 style={{ fontFamily: 'var(--serif)', fontSize: 30, letterSpacing: '-.02em', margin: '0 0 6px' }}>Condition library</h1>
      <p style={{ fontSize: 13.5, color: 'rgba(194,240,234,.55)', margin: '0 0 22px' }}>
        12 body systems · {totalConds} conditions. Choose a system, then open a condition to study its mechanism.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(176px,1fr))', gap: 10, marginBottom: 28 }}>
        {SYSTEMS.map((s) => {
          const sel = selectedSystem === s.id;
          return (
            <div
              key={s.id}
              onClick={() => { setSelectedSystem(s.id); setUrgFilter('all'); }}
              style={{
                padding: 15, borderRadius: 13, cursor: 'pointer', transition: 'all .15s',
                border: `1px solid ${sel ? 'var(--teal-bright)' : 'var(--border)'}`,
                background: sel ? 'rgba(37,196,168,0.1)' : 'rgba(15,107,94,0.06)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 9 }}>
                <span style={{ width: 34, height: 34, borderRadius: 8, background: 'rgba(37,196,168,0.1)', border: '1px solid rgba(37,196,168,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>{s.icon}</span>
                <span style={{ fontSize: 10, fontWeight: 500, color: 'var(--teal-bright)', background: 'rgba(37,196,168,0.1)', border: '1px solid rgba(37,196,168,0.18)', padding: '2px 7px', borderRadius: 99 }}>{s.count}</span>
              </div>
              <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--white)', marginBottom: 2 }}>{s.name}</div>
              <div style={{ fontSize: 11, color: 'rgba(194,240,234,.4)' }}>{s.desc}</div>
            </div>
          );
        })}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10, marginBottom: 14 }}>
        <div style={{ fontFamily: 'var(--serif)', fontSize: 18 }}>{sysObj ? `${sysObj.icon} ${sysObj.name}` : 'Conditions'}</div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {URG_DEFS.map(([u, label]) => {
            const on = urgFilter === u;
            const col = u === 'all' ? 'var(--teal-bright)' : URG[u].c;
            return (
              <div
                key={u}
                onClick={() => setUrgFilter(u)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, fontWeight: 500, padding: '4px 12px',
                  borderRadius: 99, cursor: 'pointer', transition: 'all .15s',
                  border: `1px solid ${on ? col : 'rgba(194,240,234,0.12)'}`,
                  color: on ? col : 'rgba(194,240,234,0.45)',
                  background: on ? 'rgba(37,196,168,0.08)' : 'transparent',
                }}
              >
                {u !== 'all' && <span style={{ width: 6, height: 6, borderRadius: '50%', background: URG[u] ? URG[u].c : 'var(--teal-bright)' }} />}
                {label}
              </div>
            );
          })}
        </div>
      </div>
      <div style={{ fontSize: 12, color: 'rgba(194,240,234,.3)', marginBottom: 12 }}>
        {filtered.length} condition{filtered.length !== 1 ? 's' : ''}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(196px,1fr))', gap: 8 }}>
        {filtered.map((c, i) => (
          <Hoverable
            key={i}
            onClick={() => onOpenCond(c[0])}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, padding: '11px 13px', background: 'rgba(15,107,94,0.06)', border: '1px solid var(--border)', borderRadius: 9, cursor: 'pointer' }}
            hoverStyle={{ borderColor: 'var(--teal-bright)', background: 'rgba(37,196,168,0.08)' }}
          >
            <span style={{ fontSize: 13, color: 'var(--white2)', lineHeight: 1.3 }}>{c[0]}</span>
            <span style={{ width: 7, height: 7, borderRadius: '50%', flex: 'none', background: URG[c[1]].c }} />
          </Hoverable>
        ))}
      </div>
    </div>
  );
}
