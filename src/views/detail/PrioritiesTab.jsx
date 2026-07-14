const P_URG = {
  immediate: { bg: 'rgba(232,93,93,0.06)', bd: 'rgba(232,93,93,0.2)', nb: 'rgba(232,93,93,0.15)', nc: '#e85d5d', tb: 'rgba(232,93,93,0.14)', tc: '#e85d5d' },
  urgent: { bg: 'rgba(232,168,74,0.06)', bd: 'rgba(232,168,74,0.2)', nb: 'rgba(232,168,74,0.15)', nc: '#e8a84a', tb: 'rgba(232,168,74,0.14)', tc: '#e8a84a' },
  monitor: { bg: 'rgba(54,212,114,0.06)', bd: 'rgba(54,212,114,0.16)', nb: 'rgba(54,212,114,0.15)', nc: '#36d472', tb: 'rgba(54,212,114,0.14)', tc: '#36d472' },
};

export function PrioritiesTab({ entry }) {
  return (
    <div style={{ maxWidth: 740 }}>
      <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '.12em', textTransform: 'uppercase', color: 'rgba(37,196,168,.5)', marginBottom: 14 }}>
        Ranked by clinical urgency
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
        {entry.priorities.map((p) => {
          const u = P_URG[p.urgency] || P_URG.monitor;
          return (
            <div key={p.rank} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '14px 16px', borderRadius: 11, background: u.bg, border: `1px solid ${u.bd}` }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 600, flex: 'none', background: u.nb, color: u.nc }}>{p.rank}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--white)', marginBottom: 4 }}>{p.title}</div>
                <div style={{ fontSize: 13, lineHeight: 1.6, color: 'rgba(194,240,234,.6)' }}>{p.rationale}</div>
              </div>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '.07em', textTransform: 'uppercase', padding: '2px 9px', borderRadius: 99, flex: 'none', alignSelf: 'flex-start', marginTop: 2, background: u.tb, color: u.tc }}>{p.urgency}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
