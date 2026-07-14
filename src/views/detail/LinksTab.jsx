import { Hoverable } from '../../components/Hoverable.jsx';

export function LinksTab({ entry, onOpenCond }) {
  const links = entry.links;
  return (
    <div style={{ maxWidth: 820, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
      <div style={{ gridColumn: '1/-1', background: 'rgba(15,107,94,0.06)', border: '1px solid var(--border)', borderRadius: 11, padding: '14px 16px' }}>
        <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--teal-mid)', marginBottom: 9 }}>Clinical pearl</div>
        <div style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 16, lineHeight: 1.65, color: 'var(--teal-pale)' }}>{links.pearl}</div>
      </div>
      <div style={{ background: 'rgba(15,107,94,0.06)', border: '1px solid var(--border)', borderRadius: 11, padding: '14px 16px' }}>
        <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--teal-mid)', marginBottom: 9 }}>Key labs — the why</div>
        {links.keyLabs.map((x, i) => (
          <div key={i} style={{ fontSize: 13, lineHeight: 1.6, color: 'rgba(194,240,234,.66)', padding: '6px 0', borderBottom: '1px solid rgba(37,196,168,0.07)', display: 'flex', gap: 7 }}>
            <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--green-mid)', flex: 'none', marginTop: 8 }} /><span>{x}</span>
          </div>
        ))}
      </div>
      <div style={{ background: 'rgba(15,107,94,0.06)', border: '1px solid var(--border)', borderRadius: 11, padding: '14px 16px' }}>
        <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--teal-mid)', marginBottom: 9 }}>Common nursing errors</div>
        {links.errors.map((x, i) => (
          <div key={i} style={{ fontSize: 13, lineHeight: 1.6, color: 'rgba(194,240,234,.66)', padding: '6px 0', borderBottom: '1px solid rgba(37,196,168,0.07)', display: 'flex', gap: 7 }}>
            <span style={{ color: 'var(--critical)', flex: 'none', fontSize: 11, fontWeight: 600, marginTop: 1 }}>✕</span><span>{x}</span>
          </div>
        ))}
      </div>
      <div style={{ gridColumn: '1/-1', background: 'rgba(15,107,94,0.06)', border: '1px solid var(--border)', borderRadius: 11, padding: '14px 16px' }}>
        <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--teal-mid)', marginBottom: 11 }}>Explore related conditions</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {links.related.map((name, i) => (
            <Hoverable
              key={i}
              onClick={() => onOpenCond(name)}
              style={{ cursor: 'pointer', fontSize: 12, color: 'var(--teal-bright)', background: 'rgba(37,196,168,0.08)', border: '1px solid rgba(37,196,168,0.18)', borderRadius: 99, padding: '5px 13px' }}
              hoverStyle={{ background: 'rgba(37,196,168,0.18)' }}
            >{name}</Hoverable>
          ))}
        </div>
      </div>
    </div>
  );
}
