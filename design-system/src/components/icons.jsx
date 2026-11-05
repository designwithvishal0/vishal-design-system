// A few inline icons. They use currentColor and scale with the text (1.25em).
const base = { width: '1.25em', height: '1.25em', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true };

export const IconClose = (p) => (<svg {...base} {...p}><path d="M6 6l12 12M18 6L6 18" /></svg>);
export const IconSearch = (p) => (<svg {...base} {...p}><circle cx="11" cy="11" r="6.5" /><path d="M16 16l4 4" /></svg>);
export const IconSend = (p) => (<svg {...base} {...p}><path d="M5 12h14M13 6l6 6-6 6" /></svg>);
export const IconHash = (p) => (<svg {...base} {...p}><path d="M5 9h14M5 15h14M10 4L8 20M16 4l-2 16" /></svg>);
export const IconMenu = (p) => (<svg {...base} {...p}><path d="M4 8h16M4 16h16" /></svg>);
export const IconBook = (p) => (<svg {...base} {...p}><path d="M5 5.5A1.5 1.5 0 0 1 6.5 4H19v14H6.5A1.5 1.5 0 0 0 5 19.5z" /><path d="M5 19.5A1.5 1.5 0 0 0 6.5 21H19" /></svg>);
export const IconStar = (p) => (<svg {...base} {...p}><path d="M12 4l2.4 5 5.6.7-4.1 3.8 1.1 5.5L12 16.3 7 19l1.1-5.5L4 9.7 9.6 9z" /></svg>);
export const IconPlus = (p) => (<svg {...base} {...p}><path d="M12 5v14M5 12h14" /></svg>);
