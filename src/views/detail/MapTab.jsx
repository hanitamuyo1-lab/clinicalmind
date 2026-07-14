import { useState, useEffect } from 'react';
import { PHASE } from '../../data/index.js';
import { useProgress } from '../../context/ProgressProvider.jsx';

const LEGEND_KEYS = ['trigger', 'comp', 'decomp', 'signs', 'endorgan'];

export function MapTab({ conditionId, nodes, edges, onGoTab }) {
  const { data, actions } = useProgress();
  const [selectedNode, setSelectedNode] = useState(null);

  useEffect(() => { setSelectedNode(null); }, [conditionId]);

  const explored = data.conditions[conditionId]?.explored || [];

  const N = {};
  nodes.forEach(n => { N[n.id] = n; });

  function select(id) {
    setSelectedNode(sel => (sel === id ? null : id));
    actions.exploreNode(conditionId, id);
  }

  const exploredCount = explored.length;
  const exploredPct = nodes.length ? Math.round((exploredCount / nodes.length) * 100) : 0;
  const selN = nodes.find(n => n.id === selectedNode);
  const selPh = selN ? PHASE[selN.ph] : null;

  return (
    <div style={{ display: 'flex', gap: 18, alignItems: 'flex-start', flexWrap: 'wrap' }}>
      <div style={{ flex: '1 0 640px', overflow: 'visible', border: '1px solid var(--border)', borderRadius: 16, background: 'rgba(10,14,13,0.45)', padding: 10 }}>
        <div style={{ position: 'relative', width: 660, height: 910, margin: '0 auto' }}>
          <svg viewBox="0 0 660 910" width="660" height="910" style={{ position: 'absolute', inset: 0, overflow: 'visible', pointerEvents: 'none' }}>
            <defs><marker id="arrow" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0 0L7 3L0 6" fill="rgba(122,224,207,0.45)" /></marker></defs>
            {edges.map(([a, b], i) => {
              const s = N[a], t = N[b];
              if (!s || !t) return null;
              const sx = s.left + s.w / 2, sy = s.top + s.h, tx = t.left + t.w / 2, ty = t.top;
              const my = sy + (ty - sy) * 0.45, ty2 = ty - (ty - sy) * 0.45;
              const active = selectedNode === a || selectedNode === b;
              return (
                <path key={i} d={`M ${sx} ${sy} C ${sx} ${my} ${tx} ${ty2} ${tx} ${ty}`}
                  fill="none" stroke={active ? 'var(--teal-bright)' : 'rgba(122,224,207,0.2)'}
                  strokeWidth={active ? 2.2 : 1.4} markerEnd="url(#arrow)" />
              );
            })}
          </svg>
          {nodes.map((n) => {
            const ph = PHASE[n.ph];
            const sel = selectedNode === n.id;
            const isExplored = explored.includes(n.id);
            const bg = sel ? ph.bg.replace('0.1', '0.22').replace('0.13', '0.26') : ph.bg;
            return (
              <div
                key={n.id}
                onClick={() => select(n.id)}
                style={{
                  position: 'absolute', left: n.left, top: n.top, width: n.w, minHeight: n.h, boxSizing: 'border-box',
                  padding: '10px 13px', borderRadius: 13, cursor: 'pointer', display: 'flex', flexDirection: 'column',
                  justifyContent: 'center', background: bg, border: `1.5px solid ${sel ? ph.c : ph.bd}`,
                  boxShadow: sel ? `0 0 0 1px ${ph.c}, 0 0 26px ${ph.c}55, 0 8px 22px rgba(0,0,0,0.4)` : '0 1px 2px rgba(0,0,0,0.3)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 3 }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', flex: 'none', background: ph.c }} />
                  <span style={{ fontSize: 9.5, fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', color: ph.c }}>{ph.name}</span>
                  {isExplored && <span style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--teal-bright)' }}>✓</span>}
                </div>
                <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--white)', lineHeight: 1.25 }}>{n.title}</div>
                <div style={{ fontSize: 11, color: 'rgba(194,240,234,.55)', marginTop: 3, lineHeight: 1.35 }}>{n.sub}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ flex: '1 1 300px', minWidth: 280, display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{ border: '1px solid var(--border)', borderRadius: 14, padding: 16, background: 'rgba(15,107,94,0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
            <div style={{
              width: 46, height: 46, borderRadius: '50%', flex: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: `conic-gradient(var(--teal-bright) ${exploredPct}%, rgba(37,196,168,0.14) 0)`,
            }}>
              <div style={{ width: 38, height: 38, borderRadius: '50%', background: '#0c1210', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 600, color: 'var(--teal-bright)' }}>
                {exploredCount}/{nodes.length}
              </div>
            </div>
            <div>
              <div style={{ fontSize: 13, color: 'var(--white2)', fontWeight: 500 }}>Cascade explored</div>
              <div style={{ fontSize: 11, color: 'rgba(194,240,234,.45)' }}>Tap each step to unpack it</div>
            </div>
          </div>
          <div style={{ height: 1, background: 'var(--border)', margin: '0 -16px 14px' }} />

          {selN ? (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                <span style={{ width: 9, height: 9, borderRadius: '50%', background: selPh.c }} />
                <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', color: selPh.c }}>{selPh.name}</span>
              </div>
              <div style={{ fontFamily: 'var(--serif)', fontSize: 18, lineHeight: 1.2, marginBottom: 10 }}>{selN.title}</div>
              <div style={{ fontSize: 12.5, color: 'rgba(194,240,234,.72)', lineHeight: 1.6, marginBottom: 14 }}>{selN.mech}</div>
              <div style={{ borderLeft: '2px solid var(--teal-bright)', padding: '2px 0 2px 12px' }}>
                <div style={{ fontSize: 9.5, fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--teal-mid)', marginBottom: 4 }}>Nursing focus</div>
                <div style={{ fontSize: 12.5, color: 'var(--teal-pale)', lineHeight: 1.55 }}>{selN.nursing}</div>
              </div>
            </div>
          ) : (
            <div>
              <div style={{ fontSize: 9.5, fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--teal-mid)', marginBottom: 12 }}>Phases</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                {LEGEND_KEYS.map(k => (
                  <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                    <span style={{ width: 11, height: 11, borderRadius: 3, background: PHASE[k].c, flex: 'none' }} />
                    <span style={{ fontSize: 12.5, color: 'rgba(194,240,234,.7)' }}>{PHASE[k].name}</span>
                  </div>
                ))}
              </div>
              <div style={{ fontSize: 12, color: 'rgba(194,240,234,.45)', lineHeight: 1.55, marginTop: 14, paddingTop: 14, borderTop: '1px solid var(--border)' }}>
                Each step initially compensates, then drives the failure forward — the core teaching point.
              </div>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', gap: 9 }}>
          <div onClick={() => onGoTab('cards')} style={{ flex: 1, cursor: 'pointer', textAlign: 'center', fontSize: 12.5, fontWeight: 500, color: 'var(--teal-bright)', border: '1px solid rgba(37,196,168,0.25)', borderRadius: 10, padding: 11 }}>Flashcards</div>
          <div onClick={() => onGoTab('quiz')} style={{ flex: 1, cursor: 'pointer', textAlign: 'center', fontSize: 12.5, fontWeight: 500, color: 'var(--black)', background: 'var(--teal-bright)', borderRadius: 10, padding: 11 }}>Quiz</div>
        </div>
      </div>
    </div>
  );
}
