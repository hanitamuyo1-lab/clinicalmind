import { navIcons } from '../data/index.js';
import { NavIcon } from './NavIcon.jsx';
import { Hoverable } from './Hoverable.jsx';
import { useProgress } from '../context/ProgressProvider.jsx';

const NAV_DEFS = [
  { key: 'dashboard', label: 'Dashboard', v: 'dashboard' },
  { key: 'library', label: 'Library', v: 'library' },
  { key: 'map', label: 'Mechanism Map', v: 'detail', t: 'map' },
  { key: 'cards', label: 'Flashcards', v: 'detail', t: 'cards', badge: true },
  { key: 'quiz', label: 'Quiz', v: 'detail', t: 'quiz' },
  { key: 'progress', label: 'Progress', v: 'progress' },
  { key: 'about', label: 'About', v: 'about' },
  { key: 'faq', label: 'FAQ', v: 'faq' },
  { key: 'privacy', label: 'Privacy', v: 'privacy' },
  { key: 'terms', label: 'Terms', v: 'terms' },
];

const WEEKDAY_LETTERS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export function Sidebar({ view, tab, onGo, onGoTab }) {
  const { streak, data, totalDueCards } = useProgress();

  const week = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const key = d.toISOString().slice(0, 10);
    const active = !!data.activity[key];
    const isToday = i === 6;
    return {
      label: WEEKDAY_LETTERS[d.getDay()],
      style: {
        flex: 1, height: 18, borderRadius: 4,
        background: active ? 'var(--teal-bright)' : (isToday ? 'rgba(37,196,168,0.45)' : 'rgba(37,196,168,0.14)'),
      },
    };
  });

  return (
    <aside style={{
      width: 248, flex: 'none', borderRight: '1px solid var(--border)', background: 'rgba(10,14,13,0.6)',
      backdropFilter: 'blur(8px)', display: 'flex', flexDirection: 'column', padding: '22px 16px',
      position: 'sticky', top: 0, height: '100vh', overflowY: 'auto',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 6px 2px' }}>
        <div style={{
          width: 36, height: 36, borderRadius: 10, background: '#ffffff',
          boxShadow: '0 0 0 2px #1fae57,0 4px 14px rgba(232,50,50,0.35)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none',
        }}>
          <svg viewBox="0 0 24 24" fill="none" style={{ width: 22, height: 22 }}>
            <path d="M5 3v5.5a4 4 0 0 0 8 0V3" stroke="#1fae57" strokeWidth="1.4" strokeLinecap="round" />
            <path d="M9 12.5v1.5a5 5 0 0 0 10 0v-2.3" stroke="#1fae57" strokeWidth="1.4" strokeLinecap="round" />
            <circle cx="19.3" cy="10.7" r="1.6" stroke="#1fae57" strokeWidth="1.3" />
            <rect x="9.4" y="7.7" width="3.2" height="11" rx="1" fill="#e83232" />
            <rect x="6.4" y="10.7" width="9.2" height="3.2" rx="1" fill="#e83232" />
          </svg>
        </div>
        <div>
          <div style={{ fontFamily: 'var(--serif)', fontSize: 18, letterSpacing: '-.02em', lineHeight: 1 }}>
            Clinical<span style={{ color: 'var(--teal-bright)' }}>Mind</span>
          </div>
          <div style={{ fontSize: 9.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'rgba(194,240,234,.42)', marginTop: 3 }}>
            Nurse · Study Hub
          </div>
        </div>
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: 3, marginTop: 26 }}>
        {NAV_DEFS.map((item) => {
          const active = item.t ? (view === 'detail' && tab === item.t) : (view === item.v);
          const iconColor = active ? 'var(--teal-bright)' : 'rgba(122,224,207,0.55)';
          return (
            <Hoverable
              key={item.key}
              onClick={() => (item.t ? onGoTab(item.t) : onGo(item.v))}
              style={{
                display: 'flex', alignItems: 'center', gap: 11, padding: '9px 11px', borderRadius: 9,
                fontSize: 13, cursor: 'pointer', transition: 'all .15s',
                color: active ? 'var(--white)' : 'rgba(194,240,234,0.6)',
                background: active ? 'rgba(37,196,168,0.12)' : 'transparent',
                fontWeight: active ? 400 : 300,
              }}
            >
              <NavIcon d={navIcons[item.key]} color={iconColor} />
              <span>{item.label}</span>
              {item.key === 'cards' && totalDueCards > 0 && (
                <span style={{
                  marginLeft: 'auto', fontSize: 10, fontWeight: 600, color: 'var(--black)',
                  background: 'var(--teal-bright)', borderRadius: 99, padding: '1px 7px',
                }}>{totalDueCards}</span>
              )}
            </Hoverable>
          );
        })}
      </nav>

      <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ border: '1px solid var(--border)', borderRadius: 13, padding: '13px 14px', background: 'rgba(15,107,94,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 17 }}>🔥</span>
            <div>
              <div style={{ fontFamily: 'var(--serif)', fontSize: 19, color: 'var(--teal-bright)', lineHeight: 1 }}>
                {streak.current} day{streak.current === 1 ? '' : 's'}
              </div>
              <div style={{ fontSize: 10, color: 'rgba(194,240,234,.42)', letterSpacing: '.04em' }}>study streak</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 4, marginTop: 11 }}>
            {week.map((d, i) => <div key={i} title={d.label} style={d.style} />)}
          </div>
        </div>
      </div>
    </aside>
  );
}
