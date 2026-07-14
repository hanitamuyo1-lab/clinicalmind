import { useState } from 'react';

/** Renders `as` with `style`, swapping in `hoverStyle` (merged) while the pointer is over it. */
export function Hoverable({ as: Tag = 'div', style, hoverStyle, onMouseEnter, onMouseLeave, children, ...rest }) {
  const [hover, setHover] = useState(false);
  return (
    <Tag
      {...rest}
      style={hover && hoverStyle ? { ...style, ...hoverStyle } : style}
      onMouseEnter={(e) => { setHover(true); onMouseEnter?.(e); }}
      onMouseLeave={(e) => { setHover(false); onMouseLeave?.(e); }}
    >
      {children}
    </Tag>
  );
}
