// Source of truth for every design token.
//
// Two kinds of entry:
//   site(from)  the value was read from the live portfolio CSS (vishal-designs.vercel.app).
//               `from` names the variable or rule it came from.
//   ext(why)    EXTENSION. The portfolio has no answer, so the value is proposed here.
//               `why` says what gap it fills. Every extension is listed in EXTENSIONS.md.
//
// Run `node tokens/build.mjs` from design-system/ to regenerate tokens.css and EXTENSIONS.md.

const site = (from) => ({ from });
const ext = (why) => ({ ext: why });
// The spacing scale is one extension, listed once. `from` records which site value each step comes from.
const spacing = (from) => ({
  ext: 'Spacing scale. The live site has no spacing tokens (handoff 2.6), so the scale is derived from the gaps and paddings the site repeats.',
  from,
});

// ---------------------------------------------------------------------------
// Colour. Each token has a light and a dark value.
// ---------------------------------------------------------------------------
export const themed = {
  // Core palette
  'color-bg': { light: '#FAFAF8', dark: '#0C0C0E', ...site('--bg'), use: 'Page background' },
  'color-ink': { light: '#0B0B0C', dark: '#F2F1EC', ...site('--ink'), use: 'Text, icons, focus ring' },
  'color-muted': { light: '#55565C', dark: '#A7A7AE', ...site('--muted'), use: 'Secondary text' },
  'color-edge': { light: '#76777D', dark: '#6B6B72', ...site('--edge'), use: 'Borders on controls (buttons, tags, inputs)' },
  'color-line': { light: '#E2E2DE', dark: '#232328', ...site('--line'), use: 'Hairline dividers' },
  'color-btn': { light: '#0B0B0C', dark: '#F2F1EC', ...site('--btn'), use: 'Primary button fill' },
  'color-on-btn': { light: '#FAFAF8', dark: '#0C0C0E', ...site('--on-btn'), use: 'Text on the primary button' },
  'color-live': { light: '#1E8A4F', dark: '#4CC38A', ...site('--live'), use: 'Live and online status dot. Its own status colour, not an accent' },

  // The dark closing panel. It stays dark in light theme too.
  'color-panel-bg': { light: '#141416', dark: '#18181B', ...site('.end --bg'), use: 'Closing panel and any inverse panel' },
  'color-panel-ink': { light: '#F2F1EC', dark: '#F2F1EC', ...site('.end --ink'), use: 'Text on the panel' },
  'color-panel-muted': { light: '#A7A7AE', dark: '#A7A7AE', ...site('.end --muted'), use: 'Secondary text on the panel' },
  'color-panel-line': { light: '#2A2A30', dark: '#2A2A30', ...site('.end --line'), use: 'Dividers on the panel' },
  'color-panel-edge': { light: '#6B6B72', dark: '#6B6B72', ...site('.end --edge'), use: 'Control borders on the panel' },
  'color-panel-btn': { light: '#F2F1EC', dark: '#F2F1EC', ...site('.end --btn'), use: 'Primary button fill on the panel' },
  'color-panel-on-btn': { light: '#0C0C0E', dark: '#0C0C0E', ...site('.end --on-btn'), use: 'Text on that button' },

  // Gaps the portfolio does not answer
  'color-surface-1': {
    light: '#F2F2EE', dark: '#1C1C20',
    ...ext('The site draws no cards on the page background. Product screens need a surface for cards and panels. In dark it is clearly lighter than the page (1.15 to 1).'),
    use: 'Cards, panels, list containers',
  },
  'color-surface-2': {
    light: '#EAEAE5', dark: '#26262B',
    ...ext('A second surface step for things that sit on a card: menus, popovers, modals, sheets (1.30 to 1 against the page in dark).'),
    use: 'Menus, popovers, modals, sheets',
  },
  'color-line-strong': {
    light: '#CFCFC8', dark: '#3A3A42',
    ...ext('Visible border for cards and panels. Vishal rule: in dark mode, no dark on dark. The site hairline (--line) is only 1.25 to 1 against the page, which is too faint to separate a card.'),
    use: 'Border around cards, panels, modals',
  },
  'color-error': {
    light: '#B3261E', dark: '#FF9A90',
    ...ext('The site has no error state. Chosen to keep 4.5 to 1 or better on the page and on surface-1 in both themes.'),
    use: 'Error text, error borders on inputs',
  },
  'color-scrim': {
    light: '#0B0B0C66', dark: '#000000A6',
    ...ext('Overlay behind a modal or sheet. Not on the site.'),
    use: 'Backdrop behind modals and sheets',
  },

  // Ring strength used by the hairline ring in elevation
  'ring-strength': { light: '8%', dark: '22%', ...site('--ring (8% default, 22% in dark)'), use: 'How strong the ink ring is' },
};

// ---------------------------------------------------------------------------
// Accents. A palette of five, not a brand colour. Vishal has no accent of his own (handoff 9.3):
// the page is neutral and colour comes only from the product being shown. Each new product picks
// one accent as its own colour and sets it with data-accent="violet" (and so on) on the screen.
// One accent per screen or product, never mixed. With no accent set, every accent role is neutral.
//
// Each accent has four colours, each as [light, dark]:
//   wash   soft fill behind a panel
//   muted  body text on the wash
//   ink    heading colour on the wash
//   text   the site's exact accent colour. For headings and large text only.
// and a fifth, added by this system:
//   textAa darker accent text that passes 4.5 to 1 on the wash, on the page and on surface-1.
//          Use it for any small text. Light is an extension. Dark equals `text`, which already passes.
// ---------------------------------------------------------------------------
export const accents = {
  // Orange is ixigo's product colour on the home page. It is one of the five, not a signature colour.
  orange: {
    from: '.kf .work and .kf .hero, the ixigo colours on the home page (--w-ixigo, --m-ixigo, --h-ixigo, --t-ixigo)',
    // The site's dark ixigo wash is #1B1E2C, a navy, and its muted text #B8BCCB, a blue grey. Beside orange
    // text they read as blue, so the dark wash and muted text are replaced (extDark below).
    wash: ['#FFE2CC', '#43210A'], muted: ['#4F4640', '#E3C3A8'], ink: ['#A34400', '#FF9A57'], text: ['#F07322', '#FF8A3D'],
    textAa: ['#A34E17', '#FF8A3D'],
    extDark: {
      wash: 'Dark theme only. The site value is #1B1E2C, a navy that reads as blue next to orange. Replaced with a dark burnt orange (hue 24) set at the same depth as the other dark washes: 1.36 to 1 against the page, where amber is 1.41. Orange text on it is 6.1 to 1.',
      muted: 'Dark theme only. The site value is #B8BCCB, a blue grey chosen for the navy wash. Replaced with a warm light tone that gives 8.7 to 1 on the burnt orange wash.',
    },
  },
  violet: {
    from: ':root --w-ixigo, --m-ixigo, --h-ixigo, --t-ixigo (the base set, replaced by orange on the home page)',
    wash: ['#DCD3FF', '#241852'], muted: ['#4A4A55', '#BDB6DF'], ink: ['#4B32C9', '#BBAAFF'], text: ['#4A2FD0', '#B4A6FF'],
    textAa: ['#4A2FD0', '#B4A6FF'],
  },
  amber: {
    from: ':root --w-split, --m-split, --h-split, --t-split',
    wash: ['#FFE7A8', '#3B2A02'], muted: ['#45454A', '#D6C7A0'], ink: ['#8A6400', '#FFD466'], text: ['#A35A00', '#F2B640'],
    textAa: ['#9C5600', '#F2B640'],
  },
  teal: {
    from: ':root --w-twelve, --m-twelve, --h-twelve, --t-twelve',
    wash: ['#BDEBDF', '#062E28'], muted: ['#40474A', '#A5CFC5'], ink: ['#0E6B5C', '#7FE0CB'], text: ['#006A80', '#5CC8F0'],
    textAa: ['#006A80', '#5CC8F0'],
  },
  sky: {
    from: ':root --w-sky, --m-sky (wash and muted only)',
    ext: 'The site defines only the wash and muted colours for sky. The heading ink and accent text are proposed here, deeper blues that keep 5 to 1 or better on the wash.',
    wash: ['#CFE6FF', '#0C2C4D'], muted: ['#3F4A57', '#AFC8E2'], ink: ['#174F8A', '#A8D2FB'], text: ['#1B5E9E', '#8CC0F2'],
    textAa: ['#1B5E9E', '#8CC0F2'],
  },
};
// No default accent. Without data-accent, the accent roles fall back to these neutrals (Vishal, 5 Nov 2026).
export const neutralAccent = {
  wash: 'var(--color-surface-1)',
  muted: 'var(--color-muted)',
  ink: 'var(--color-ink)',
  text: 'var(--color-ink)',
  'text-aa': 'var(--color-ink)',
};
export const neutralNote =
  'Neutral by default. The page has no brand accent (handoff 9.3, Vishal 5 Nov 2026). Colour appears only when a product sets data-accent. The neutral wash is surface-1, so a selected row still shows and a surface-2 book cover still stands out on it.';

// Why textAa exists. The site's exact accent text colours do not all pass for small text.
// On the wash: orange 2.4 to 1, amber 4.3 to 1. Orange is 2.8 to 1 on the page, below even the 3 to 1
// large text needs, so the exact orange is for display size headline accents only.
// textAa light values pass 4.6 to 1 or better on all three surfaces.
export const textAaNote =
  'Darker accent text for small text. The site exact accent colour (text) fails 4.5 to 1 on its wash or on the page for orange and amber. The shade is the site colour darkened until it passes 4.6 to 1 on the wash, the page and surface-1. Violet, teal and sky already pass and keep their value. Dark equals the site value, which already passes.';

// Elevation. Themed because shadows disappear on near black. Dark leans on surface steps and borders.
Object.assign(themed, {
  'elev-0': { light: 'none', dark: 'none', ...site('box-shadow: none'), use: 'Flat. Most things.' },
  'elev-1': {
    light: '0 0 0 1px var(--color-line)', dark: '0 0 0 1px var(--color-line)',
    ...site('box-shadow: 0 0 0 1px var(--line)'), use: 'Hairline outline',
  },
  'elev-2': {
    light: 'inset 0 0 0 1px color-mix(in srgb, var(--color-ink) var(--ring-strength), transparent)',
    dark: 'inset 0 0 0 1px color-mix(in srgb, var(--color-ink) var(--ring-strength), transparent)',
    ...site('inset 0 0 0 1px color-mix(ink var(--ring))'), use: 'Ink ring, for media and tiles',
  },
  'elev-3': {
    light: '0 0 0 1px var(--color-line), 0 16px 40px #00000024',
    dark: '0 0 0 1px var(--color-line-strong), 0 16px 40px #00000066',
    ...ext('Dark value only. Light is on the site: the Accessibility menu shadow (0 16px 40px) with the hairline ring from the dock. The dark value is proposed: a stronger border and a deeper shadow, since a soft shadow cannot show on near black.'),
    use: 'Menus and popovers. A shadow means one thing: this floats above the page',
  },
  'elev-4': {
    light: '0 0 0 1px var(--color-line), 0 24px 60px #0000002e',
    dark: '0 0 0 1px var(--color-line-strong), 0 24px 60px #00000080',
    ...ext('Light shadow is on the site (0 24px 60px). The ring and the whole dark value are proposed.'),
    use: 'Modals and sheets',
  },
  'elev-panel': {
    light: 'none', dark: 'inset 0 0 0 1px var(--color-line-strong)',
    ...ext('The site closing panel has only a faint ring (#26262b) in dark. Vishal rule: no dark on dark, so the panel gets the strong border.'),
    use: 'The dark closing panel',
  },
});

// ---------------------------------------------------------------------------
// Everything below does not change with theme.
// `mobile` is the value at 759px wide or less.
// ---------------------------------------------------------------------------
export const fixed = {
  // Type families and weights
  'font-sans': { value: '"Bricolage Grotesque Variable", system-ui, sans-serif', ...site('--sans'), use: 'The only family' },
  'weight-regular': { value: 400, ...site('body'), use: 'Body text' },
  'weight-medium': { value: 500, ...site('--kfw-medium'), use: 'Nav, lead text' },
  'weight-semi': { value: 600, ...site('--kfw-semi'), use: 'Tags' },
  'weight-ui': { value: 650, ...site('.pill-btn'), use: 'Button labels' },
  'weight-bold': { value: 700, ...site('--kfw-bold'), use: 'Headings and titles' },
  'weight-display': { value: 760, ...site('.sh, .l1'), use: 'Page titles' },
  'weight-heavy': { value: 800, ...site('--kfw-heavy'), use: 'Stats and closing statements' },
  'stretch-narrow': { value: '75%', ...site('font-stretch on stats and closing h2'), use: 'Narrowest width' },
  'stretch-display': { value: '82%', ...site('font-stretch on .sh'), use: 'Page titles' },
  'stretch-heading': { value: '85%', ...site('font-stretch on headings'), use: 'Headings and titles' },
  'stretch-normal': { value: '100%', ...site('body'), use: 'Body text' },

  // Spacing. The live site has no spacing tokens (handoff 2.6), so this whole scale is an extension.
  // Every step is a gap or padding the site repeats, put on a named step.
  'space-1': { value: '4px', ...spacing('gap: 4px'), use: 'Tightest' },
  'space-snug': { value: '6px', ...spacing('gap: 6px, used on .card'), use: 'Dense lists, tight stacks' },
  'space-2': { value: '8px', ...spacing('gap: 8px'), use: 'Small gap' },
  'space-3': { value: '12px', ...spacing('gap: 12px'), use: 'Between related items' },
  'space-4': { value: '16px', ...spacing('gap: 16px, --inset'), use: 'Default gap' },
  'space-5': { value: '24px', ...spacing('gap: 24px'), use: 'Between groups' },
  'space-6': { value: '32px', ...spacing('gap: 32px, --gut'), use: 'Between parts of a layout' },
  'space-7': { value: '48px', ...spacing('padding: 44 to 56px'), use: 'Large block spacing' },
  'space-8': { value: '72px', ...spacing('72px inside a section, handoff 2.6'), use: 'Spacing inside a section' },
  'space-9': { value: '96px', ...spacing('padding: 72px 0 96px'), use: 'Large section spacing' },
  'space-10': { value: '120px', ...spacing('padding: 120px 0, case study sections'), use: 'Largest block spacing' },
  'space-11': { value: '160px', ...spacing('160px between sections on the home page, handoff 2.6'), use: 'Between sections of a page' },

  // Line width and stacking
  'border-w': { value: '1px', ...site('1px borders, rings and hairlines everywhere'), use: 'Every border and ring' },
  'z-bar': { value: 30, ...site('.bar z-index'), use: 'Sticky top bar' },
  'z-popover': { value: 60, ...ext('The site has one popover and no scale. Menus and popovers sit above the bar.'), use: 'Menus and popovers' },
  'z-overlay': { value: 100, ...ext('Modals and sheets sit above everything.'), use: 'Modals, sheets and their scrim' },

  // Layout
  'layout-max': { value: '1376px', ...site('--max'), use: 'Maximum content width' },
  'layout-gutter': { value: '32px', mobile: '16px', ...site('--gut'), use: 'Side gutter' },
  'layout-bar': { value: '56px', mobile: '52px', ...site('--bar'), use: 'Top nav height' },
  'layout-inset': { value: '16px', mobile: '8px', ...site('--inset'), use: 'Inset inside the gutter' },
  'measure-max': { value: '760px', ...site('case study text column 760px (handoff 2.6)'), use: 'Widest a paragraph may run' },
  'measure-min': { value: '46ch', ...site('How I work text column, 46ch (handoff 2.6)'), use: 'Narrowest comfortable paragraph' },
  'control-h': { value: '44px', ...site('.pill-btn min-height'), use: 'Default control height and touch target' },
  'control-h-sm': { value: '36px', ...site('.bar-book height'), use: 'Compact controls, nav buttons' },
  'control-pad-x': { value: '22px', ...site('.pill-btn padding: 0 22px'), use: 'Side padding of the default button' },
  'tag-pad-x': { value: '10px', ...site('.pill padding: 2px 10px'), use: 'Side padding of a tag' },
  'tag-pad-y': { value: '2px', ...site('.pill padding: 2px 10px'), use: 'Top and bottom padding of a tag' },
  'glass-filter': { value: 'blur(18px) saturate(1.8)', ...site('.bar backdrop-filter'), use: 'Frosted top bar' },
  'glass-mix': { value: '96%', ...site('.bar background: color-mix(bg 96%, transparent)'), use: 'How much page colour the frosted bar keeps' },
  'row-h': {
    value: '48px',
    ...ext('Comfortable single line list row. Taller than the 44px button so a row never reads as a button. Two line rows size to their content (Vishal, 5 Nov 2026).'),
    use: 'Comfortable list rows',
  },
  'section-gap': { value: '160px', mobile: '96px', ...site('160px between sections on the home page (handoff 2.6). 96px on phones, by Vishal 5 Nov 2026, as his case studies shrink sections on small screens'), use: 'Between sections of a page' },
  'section-inner': { value: '72px', mobile: '48px', ...site('72px inside a section on the home page (handoff 2.6). 48px on phones, by Vishal 5 Nov 2026'), use: 'Inside a section' },
  'icon-sm': { value: '16px', ...ext('Icons scale with their text but snap to 16, 20 or 24px so their lines stay crisp (Vishal, 5 Nov 2026). 16px sits with small text.'), use: 'Icon next to small text' },
  'icon-md': { value: '20px', ...ext('Icon snap size for body text (Vishal, 5 Nov 2026).'), use: 'Icon next to body text' },
  'icon-stroke': { value: '1.5px', ...ext('Icon line width at every size. Outline icons with rounded ends, to match the soft shapes of Bricolage (Vishal, 5 Nov 2026).'), use: 'Icon stroke' },
  'icon-lg': { value: '24px', ...ext('Largest icon snap size (Vishal, 5 Nov 2026).'), use: 'Icon next to headings' },
  'row-h-dense': {
    value: '32px',
    ...ext('Chat messages and long book lists need a row tighter than the 44px control. 32px with space-snug between.'),
    use: 'Dense list rows',
  },

  'cover-sm': {
    value: '16px',
    ...ext('Width of the small book cover used in dense lists. Covers keep the real 2 by 3 book shape, so 16 by 24, which keeps dense rows at 32px (Vishal, 5 Nov 2026).'),
    use: 'Small book cover width',
  },

  // Radius
  'radius-xs': { value: '4px', ...site('border-radius: 4px, focus outline'), use: 'Focus outline corners' },
  'radius-sm': { value: '12px', ...site('border-radius: 12px'), use: 'Thumbnails, small cards' },
  'radius-cover': { value: '4px', ...ext('Corner of the small book cover. Same 4px as the focus ring, but its own token so covers never borrow the focus radius (Vishal, 5 Nov 2026).'), use: 'Small book cover' },
  'radius-cover-lg': { value: '6px', ...ext('Corner of the medium and large book covers (Vishal, 5 Nov 2026).'), use: 'Medium and large book covers' },
  'radius-md': { value: '16px', ...site('border-radius: 16px'), use: 'Thumbnails, video boxes, menus' },
  'radius-list-row': { value: '12px', ...ext('Hover and selected background of a list row. Its own token, separate from the 28px used for the big portfolio rows (Vishal, 5 Nov 2026).'), use: 'List rows and sidebar items' },
  'radius-media': { value: '20px', ...site('hero media slot, handoff 2.7'), use: 'Large media slots' },
  'radius-lg': { value: '24px', ...site('border-radius: 24px'), use: 'Cards' },
  'radius-row': { value: '28px', ...site('work rows and How I work hover wash, handoff 2.7'), use: 'Wash panels and rows' },
  'radius-xl': { value: '32px', ...site('border-radius: 32px'), use: 'The closing panel and merged work panel' },
  'radius-pill': { value: '999px', ...site('border-radius: 999px'), use: 'Buttons and tags' },
  'radius-round': { value: '50%', ...site('border-radius: 50%'), use: 'Avatars and dots' },

  // Motion
  'dur-press': { value: '0.12s', ...site('transition: transform .12s'), use: 'Press feedback' },
  'dur-fast': { value: '0.2s', ...site('hover 200ms var(--out), handoff 2.10'), use: 'Hover. Pair with ease-out' },
  'dur-base': { value: '0.3s', ...site('small changes 300ms'), use: 'Default' },
  'dur-slow': { value: '0.52s', ...site('word rise 520ms'), use: 'Word rise' },
  'dur-reveal': { value: '0.6s', ...site('reveal 600ms, 20px rise, handoff 2.10'), use: 'Scroll reveals' },
  'dur-stagger': { value: '0.045s', ...site('word rise, 45ms stagger per word (handoff 2.10)'), use: 'Delay between items that enter one after another' },
  'reveal-distance': { value: '20px', ...site('reveal, 20px rise (handoff 2.10)'), use: 'How far a reveal rises' },
  'dur-ping': { value: '2.4s', ...site('live dot ping 2.4s loop'), use: 'The live dot pulse' },
  'dur-spring': { value: '0.7s', ...site('transition .7s var(--spring)'), use: 'Expressive moments only' },
  'dur-colour': { value: '0.9s', ...site('color .9s var(--ease)'), use: 'Slow colour change, theme change' },
  'ease': { value: 'cubic-bezier(0.2, 0.8, 0.2, 1)', ...site('--ease'), use: 'Colour and background changes' },
  'ease-out': { value: 'cubic-bezier(0.23, 1, 0.32, 1)', ...site('--out'), use: 'Default for movement' },
  'ease-in-out': { value: 'cubic-bezier(0.7, 0, 0.2, 1)', ...site('clip-path transition'), use: 'Large reveals' },
  'ease-spring': { value: 'cubic-bezier(0.2, 0.9, 0.25, 1.1)', ...site('--spring (fallback)'), use: 'Expressive moments only' },

  // States. Feedback is colour and press only. Nothing lifts or moves on hover.
  'state-press-scale': { value: 0.97, ...site('.pill-btn:active'), use: 'Press feedback' },
  'state-hover-ghost': { value: 'color-mix(in oklab, var(--color-ink) 7%, transparent)', ...site('.pill-btn:hover'), use: 'Hover fill on outline buttons' },
  'state-hover-primary': { value: 'color-mix(in oklab, var(--color-btn) 84%, var(--color-bg))', ...site('.pill-btn.primary:hover'), use: 'Hover fill on the primary button' },
  'focus-width': { value: '2px', ...site(':focus-visible'), use: 'Focus ring' },
  'focus-offset': { value: '3px', ...site(':focus-visible'), use: 'Focus ring offset' },
  'state-disabled-opacity': { value: 0.4, ...ext('The site has no disabled state.'), use: 'Disabled controls' },
};

// ---------------------------------------------------------------------------
// Type roles. Each role is size, weight, width, line height, tracking.
// ---------------------------------------------------------------------------
export const roles = {
  'display-xl': { size: 'clamp(56px, 9vw, 136px)', mobile: '52px', weight: 800, stretch: '75%', lh: 0.92, tracking: '-0.025em', ...site('.ct h2'), use: 'Closing statements and one off hero moments' },
  'display': { size: 'clamp(56px, 6vw, 88px)', mobile: '40px', weight: 760, stretch: '82%', lh: 0.92, tracking: '-0.01em', ...site('.sh, .phead h2, hero'), use: 'Page titles and section titles' },
  'stat': { size: 'clamp(56px, 7vw, 104px)', mobile: '56px', weight: 800, stretch: '75%', lh: 0.95, tracking: '-0.02em', ...site('.stats dd'), use: 'Big numbers on a marketing page' },
  'stat-sm': { size: '40px', mobile: '32px', weight: 760, mobileWeight: 720, numeric: 'tabular-nums', stretch: '75%', lh: 1, tracking: 'normal', ...site('.proof strong for size and width. Weight 760, and 720 on phones like the work titles .tt, by Vishal 5 Nov 2026, so 800 stays at 56px and above (handoff 9.1). Tabular numerals'), use: 'The one heavy number or name on a dense screen, once per screen' },
  'heading-lg': { size: '40px', mobile: '28px', weight: 700, stretch: '85%', lh: 1.05, tracking: '-0.01em', ...site('.ltext h3'), use: 'Large headings' },
  'heading': { size: 'clamp(26px, 3vw, 36px)', mobile: '24px', weight: 700, stretch: '85%', lh: 1.1, tracking: '-0.01em', ...site('#res-h'), use: 'Section headings' },
  'title': { size: '22px', mobile: '19px', weight: 700, stretch: '85%', lh: 1.2, tracking: '-0.01em', ...site('.aud strong, .jobs dt'), use: 'Titles of blocks and cards' },
  'title-sm': { size: '20px', mobile: '20px', weight: 700, stretch: '85%', lh: 1.2, tracking: 'normal', ...site('.whead h2, .card strong'), use: 'Small titles' },
  'story': { size: '24px', mobile: '19px', weight: 400, stretch: '100%', lh: 1.45, tracking: '-0.005em', ...site('.about2 .story'), use: 'Long form intro text' },
  'lead': { size: '18px', mobile: '18px', weight: 500, stretch: '100%', lh: 1.5, tracking: 'normal', ...site('.phead p, .pb'), use: 'Lead paragraph' },
  'body': { size: '18px', mobile: '16px', weight: 400, stretch: '100%', lh: 1.5, tracking: 'normal', ...site('body'), use: 'Body text' },
  'small': { size: '15px', mobile: '15px', weight: 500, stretch: '100%', lh: 1.45, tracking: 'normal', ...site('.nav, --kfs-small'), use: 'Nav, secondary text' },
  'meta': { size: '14px', mobile: '14px', weight: 600, stretch: '100%', lh: 1.4, tracking: 'normal', ...site('meta lines, handoff 2.5'), use: 'Card meta line: Product · Type · Concept or Shipped · Year' },
  'label': { size: '13px', mobile: '13px', weight: 600, stretch: '100%', lh: 1.4, tracking: 'normal', ...site('.pill, --kfs-label'), use: 'Tags and labels' },
  'eyebrow': { size: '13px', mobile: '13px', weight: 600, stretch: '100%', lh: 1.4, tracking: '0.14em', transform: 'uppercase', ...site('case study eyebrow, 13px weight 600 .14em (handoff 2.5). Added to the system by Vishal, 5 Nov 2026'), use: 'Small uppercase eyebrow above a heading. The only uppercase text' },
};

// Breakpoints cannot be CSS variables inside media queries, so they live here only.
export const breakpoints = {
  mobile: { max: 759, ...site('@media (max-width: 759px)') },
  tablet: { max: 1023, ...site('@media (max-width: 1023px)') },
};
