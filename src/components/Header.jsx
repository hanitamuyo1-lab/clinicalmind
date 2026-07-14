import { useMemo, useState } from 'react';
import { getAllConditions, URG } from '../data/index.js';
import { Hoverable } from './Hoverable.jsx';
import { useProgress } from '../context/ProgressProvider.jsx';

export function Header({ onOpenCondition, onGoTab }) {
  const [search, setSearch] = useState('');
  const [focused, setFocused] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);
  const { totalDueCards } = useProgress();

  const query = search.trim().toLowerCase();
  const results = useMemo(() => {
    if (!query) return [];
    return getAllConditions().filter(c => c.name.toLowerCase().includes(query)).slice(0, 8);
  }, [query]);

  const showResults = focused && !!query;

  function handleKeyDown(e) {
    if (e.key !== 'Enter') return;
    const q = search.trim().toLowerCase();
    if (!q) return;
    const match = getAllConditions().find(c => c.name.toLowerCase().includes(q));
    if (match) {
      onOpenCondition(match.name, match.sysId);
      setSearch('');
      setFocused(false);
    }
  }

  function pick(r) {
    onOpenCondition(r.name, r.sysId);
    setSearch('');
    setFocused(false);
  }

  return (
    <header style={{
      display: 'flex', alignItems: 'center', gap: 14, padding: '14px 30px', borderBottom: '1px solid var(--border)',
      background: 'rgba(10,14,13,0.82)', backdropFilter: 'blur(8px)', flex: 'none', position: 'sticky', top: 0, zIndex: 50,
    }}>
      <div style={{ position: 'relative', flex: 1, maxWidth: 440 }}>
        <svg viewBox="0 0 18 18" fill="none" style={{
          position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', width: 16, height: 16,
          color: 'var(--teal-mid)', pointerEvents: 'none',
        }}>
          <circle cx="7.5" cy="7.5" r="5.5" stroke="currentColor" strokeWidth="1.5" />
          <path d="M11.5 11.5L16 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <input
          placeholder="Search conditions — sepsis, DKA, heart failure…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => { setFocused(true); setInputFocused(true); }}
          onBlur={() => { setInputFocused(false); setTimeout(() => setFocused(false), 150); }}
          style={{
            width: '100%', height: 42, background: 'rgba(15,107,94,0.12)',
            border: `1px solid ${inputFocused ? 'var(--teal-bright)' : 'var(--border)'}`,
            borderRadius: 10, padding: '0 36px 0 40px', fontSize: 13.5, fontFamily: 'var(--sans)',
            fontWeight: 300, color: 'var(--white)', outline: 'none',
            backgroundColor: inputFocused ? 'rgba(15,107,94,0.2)' : 'rgba(15,107,94,0.12)',
          }}
        />
        {!!search && (
          <div
            onClick={() => setSearch('')}
            title="Clear"
            style={{
              position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', width: 18, height: 18,
              borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
              color: 'rgba(194,240,234,.5)', fontSize: 13,
            }}
          >✕</div>
        )}
        {showResults && (
          <div style={{
            position: 'absolute', top: 'calc(100% + 8px)', left: 0, right: 0, background: '#10201c',
            border: '1px solid var(--border)', borderRadius: 12, boxShadow: '0 18px 40px rgba(0,0,0,.5)',
            maxHeight: 360, overflowY: 'auto', zIndex: 60, padding: 6,
          }}>
            {results.length > 0 ? results.map((r, i) => (
              <Hoverable
                key={r.name + i}
                onMouseDown={() => pick(r)}
                style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 10px', borderRadius: 8, cursor: 'pointer' }}
                hoverStyle={{ background: 'rgba(37,196,168,0.12)' }}
              >
                <span style={{ width: 7, height: 7, borderRadius: '50%', flex: 'none', background: URG[r.urg].c }} />
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ fontSize: 13, color: 'var(--white)' }}>{r.name}</div>
                  <div style={{ fontSize: 10.5, color: 'rgba(194,240,234,.45)' }}>{r.sysName}</div>
                </div>
              </Hoverable>
            )) : (
              <div style={{ padding: '16px 10px', fontSize: 12.5, color: 'rgba(194,240,234,.45)', textAlign: 'center' }}>
                No conditions match "{search}"
              </div>
            )}
          </div>
        )}
      </div>
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
        <Hoverable
          onClick={() => onGoTab('cards')}
          style={{
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 7, fontSize: 12, color: 'var(--teal-bright)',
            background: 'rgba(37,196,168,0.1)', border: '1px solid rgba(37,196,168,0.25)', borderRadius: 99, padding: '6px 13px',
          }}
          hoverStyle={{ background: 'rgba(37,196,168,0.18)' }}
        >
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--teal-bright)', animation: 'blink 2s ease-in-out infinite' }} />
          {totalDueCards} card{totalDueCards === 1 ? '' : 's'} due
        </Hoverable>
        <div style={{
          fontSize: 11, fontWeight: 500, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--teal-bright)',
          background: 'rgba(37,196,168,0.1)', border: '1px solid rgba(37,196,168,0.25)', padding: '5px 12px', borderRadius: 99,
        }}>Nurse Edition</div>
      </div>
    </header>
  );
}
