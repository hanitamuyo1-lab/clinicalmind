export function NavIcon({ d, color = 'currentColor', size = 18 }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" style={{ width: size, height: size, flex: 'none' }}>
      <path d={d} stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
