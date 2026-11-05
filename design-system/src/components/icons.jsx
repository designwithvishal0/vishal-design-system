// One icon family. Outline, 1.5px stroke, rounded ends. They use currentColor, scale with the
// text and snap to 16, 20 or 24px (the .vd-icon rule in base.css).
const base = { className: 'vd-icon', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true };
// Arrows are always filled. Everything else is a 1.5px outline (--icon-stroke, set in base.css).
const filled = { className: 'vd-icon vd-icon--filled', viewBox: '0 0 24 24', fill: 'currentColor', 'aria-hidden': true };

export const IconClose = (p) => (<svg {...base} {...p}><path d="M6 6l12 12M18 6L6 18" /></svg>);
export const IconSearch = (p) => (<svg {...base} {...p}><circle cx="11" cy="11" r="6.5" /><path d="M16 16l4 4" /></svg>);
export const IconSend = (p) => (<svg {...filled} {...p}><path d="M4 10.75h11.2l-4.1-4.1L12.9 5l7 7-7 7-1.8-1.65 4.1-4.1H4z" /></svg>);
export const IconHash = (p) => (<svg {...base} {...p}><path d="M5 9h14M5 15h14M10 4L8 20M16 4l-2 16" /></svg>);
export const IconMenu = (p) => (<svg {...base} {...p}><path d="M4 8h16M4 16h16" /></svg>);
export const IconStar = (p) => (<svg {...base} {...p}><path d="M12 4l2.4 5 5.6.7-4.1 3.8 1.1 5.5L12 16.3 7 19l1.1-5.5L4 9.7 9.6 9z" /></svg>);
export const IconPlus = (p) => (<svg {...base} {...p}><path d="M12 5v14M5 12h14" /></svg>);
