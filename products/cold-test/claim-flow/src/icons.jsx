// EXTENSION: four icons the system does not ship, drawn exactly like design-system/src/components/icons.jsx
// (24 grid, outline, rounded ends, stroke from --icon-stroke; arrows filled). Needed for a claim flow:
// a check for done steps and the chosen person, a back arrow, the select chevron the Select recipe
// asks for, and a file mark for added documents.
const base = { className: 'vd-icon', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true };
const filled = { className: 'vd-icon vd-icon--filled', viewBox: '0 0 24 24', fill: 'currentColor', 'aria-hidden': true };

export const IconCheck = (p) => (<svg {...base} {...p}><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>);
export const IconChevron = (p) => (<svg {...base} {...p}><path d="M7 10l5 5 5-5" /></svg>);
export const IconFile = (p) => (<svg {...base} {...p}><path d="M7 3.5h7l4 4V20a.5.5 0 0 1-.5.5h-10.5a.5.5 0 0 1-.5-.5V4a.5.5 0 0 1 .5-.5zM14 3.5V8h4" /></svg>);
// The send arrow, mirrored, so it points back. Arrows are always filled.
export const IconBack = (p) => (<svg {...filled} {...p}><path transform="matrix(-1 0 0 1 24 0)" d="M4 10.75h11.2l-4.1-4.1L12.9 5l7 7-7 7-1.8-1.65 4.1-4.1H4z" /></svg>);
