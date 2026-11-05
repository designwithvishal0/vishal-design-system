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
// Accents. Five named pairs. One accent per screen or product, never mixed.
// Set an accent on any element with data-accent="violet" (and so on).
// Each accent has a soft wash, deeper heading ink, muted body ink, and an accent text colour.
// ---------------------------------------------------------------------------
export const accents = {
  violet: {
    from: ':root --w-ixigo, --m-ixigo, --h-ixigo, --t-ixigo',
    wash: ['#DCD3FF', '#241852'], muted: ['#4A4A55', '#BDB6DF'], ink: ['#4B32C9', '#BBAAFF'], text: ['#4A2FD0', '#B4A6FF'],
  },
  amber: {
    from: ':root --w-split, --m-split, --h-split, --t-split',
    wash: ['#FFE7A8', '#3B2A02'], muted: ['#45454A', '#D6C7A0'], ink: ['#8A6400', '#FFD466'], text: ['#A35A00', '#F2B640'],
  },
  teal: {
    from: ':root --w-twelve, --m-twelve, --h-twelve, --t-twelve',
    wash: ['#BDEBDF', '#062E28'], muted: ['#40474A', '#A5CFC5'], ink: ['#0E6B5C', '#7FE0CB'], text: ['#006A80', '#5CC8F0'],
  },
  coral: {
    from: ':root --w-jarvis, --m-jarvis, --h-jarvis, --t-jarvis',
    wash: ['#FFCDB8', '#43160B'], muted: ['#4D4441', '#E0B7A9'], ink: ['#B53A16', '#FF9C78'], text: ['#C03A0A', '#FF8A4C'],
  },
  sky: {
    from: ':root --w-sky, --m-sky (wash and muted only)',
    ext: 'The site defines only the wash and muted colours for sky. The heading ink and accent text are proposed here, deeper blues that keep 5 to 1 or better on the wash.',
    wash: ['#CFE6FF', '#0C2C4D'], muted: ['#3F4A57', '#AFC8E2'], ink: ['#174F8A', '#A8D2FB'], text: ['#1B5E9E', '#8CC0F2'],
  },
};

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
    light: '0 0 0 1px var(--color-line), 0 12px 32px #00000024',
    dark: '0 0 0 1px var(--color-line-strong), 0 12px 32px #00000066',
    ...ext('Light value is on the site (0 0 0 1px line, 0 12px 32px). Dark value is proposed: a stronger border and a deeper shadow, since a soft shadow cannot show on near black.'),
    use: 'Menus, popovers, toasts',
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

  // Spacing. A scale in px, drawn from the gaps and paddings the site repeats.
  'space-1': { value: '4px', ...site('gap: 4px'), use: 'Tightest' },
  'space-snug': { value: '6px', ...site('gap: 6px, used on .card'), use: 'Dense lists, tight stacks' },
  'space-2': { value: '8px', ...site('gap: 8px'), use: 'Small gap' },
  'space-3': { value: '12px', ...site('gap: 12px'), use: 'Between related items' },
  'space-4': { value: '16px', ...site('gap: 16px'), use: 'Default gap' },
  'space-5': { value: '24px', ...site('gap: 24px'), use: 'Between groups' },
  'space-6': { value: '32px', ...site('gap: 32px, --gut'), use: 'Between sections of a layout' },
  'space-7': { value: '48px', ...site('padding: 44 to 56px'), use: 'Large block spacing' },
  'space-8': { value: '72px', ...site('padding: 72px 0'), use: 'Section spacing' },
  'space-9': { value: '96px', ...site('padding: 72px 0 96px'), use: 'Large section spacing' },
  'space-10': { value: '120px', ...site('padding: 120px 0'), use: 'Largest section spacing' },

  // Layout
  'layout-max': { value: '1376px', ...site('--max'), use: 'Maximum content width' },
  'layout-gutter': { value: '32px', mobile: '16px', ...site('--gut'), use: 'Side gutter' },
  'layout-bar': { value: '56px', mobile: '52px', ...site('--bar'), use: 'Top nav height' },
  'layout-inset': { value: '16px', mobile: '8px', ...site('--inset'), use: 'Inset inside the gutter' },
  'control-h': { value: '44px', ...site('.pill-btn min-height'), use: 'Default control height and touch target' },
  'control-h-sm': { value: '36px', ...site('.bar-book height'), use: 'Compact controls, nav buttons' },
  'row-h-dense': {
    value: '32px',
    ...ext('Chat messages and long book lists need a row tighter than the 44px control. 32px with space-snug between.'),
    use: 'Dense list rows',
  },

  // Radius
  'radius-xs': { value: '4px', ...site('border-radius: 4px, focus outline'), use: 'Focus outline corners' },
  'radius-sm': { value: '12px', ...site('border-radius: 12px'), use: 'Thumbnails, small cards' },
  'radius-md': { value: '16px', ...site('border-radius: 16px'), use: 'Cards, media' },
  'radius-lg': { value: '24px', ...site('border-radius: 24px'), use: 'Large cards and panels' },
  'radius-xl': { value: '32px', ...site('border-radius: 32px'), use: 'The closing panel' },
  'radius-pill': { value: '999px', ...site('border-radius: 999px'), use: 'Buttons and tags' },
  'radius-round': { value: '50%', ...site('border-radius: 50%'), use: 'Avatars and dots' },

  // Motion
  'dur-press': { value: '0.12s', ...site('transition: transform .12s'), use: 'Press feedback' },
  'dur-fast': { value: '0.2s', ...site('transition .2s'), use: 'Hover colour, small reveals' },
  'dur-base': { value: '0.3s', ...site('transition .3s'), use: 'Default' },
  'dur-slow': { value: '0.52s', ...site('rise .52s'), use: 'Scroll reveals' },
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
  'stat-sm': { size: '40px', mobile: '32px', weight: 800, stretch: '75%', lh: 1, tracking: 'normal', ...site('.proof strong'), use: 'The one heavy number or name on a dense screen, once per screen' },
  'heading-lg': { size: '40px', mobile: '28px', weight: 700, stretch: '85%', lh: 1.05, tracking: '-0.01em', ...site('.ltext h3'), use: 'Large headings' },
  'heading': { size: 'clamp(26px, 3vw, 36px)', mobile: '24px', weight: 700, stretch: '85%', lh: 1.1, tracking: '-0.01em', ...site('#res-h'), use: 'Section headings' },
  'title': { size: '22px', mobile: '19px', weight: 700, stretch: '85%', lh: 1.2, tracking: '-0.01em', ...site('.aud strong, .jobs dt'), use: 'Titles of blocks and cards' },
  'title-sm': { size: '20px', mobile: '20px', weight: 700, stretch: '85%', lh: 1.2, tracking: 'normal', ...site('.whead h2, .card strong'), use: 'Small titles' },
  'story': { size: '24px', mobile: '19px', weight: 400, stretch: '100%', lh: 1.45, tracking: '-0.005em', ...site('.about2 .story'), use: 'Long form intro text' },
  'lead': { size: '18px', mobile: '18px', weight: 500, stretch: '100%', lh: 1.5, tracking: 'normal', ...site('.phead p, .pb'), use: 'Lead paragraph' },
  'body': { size: '18px', mobile: '16px', weight: 400, stretch: '100%', lh: 1.5, tracking: 'normal', ...site('body'), use: 'Body text' },
  'small': { size: '15px', mobile: '15px', weight: 500, stretch: '100%', lh: 1.45, tracking: 'normal', ...site('.nav, --kfs-small'), use: 'Nav, secondary text' },
  'label': { size: '13px', mobile: '13px', weight: 600, stretch: '100%', lh: 1.4, tracking: 'normal', ...site('.pill, --kfs-label'), use: 'Tags and labels' },
};

// Breakpoints cannot be CSS variables inside media queries, so they live here only.
export const breakpoints = {
  mobile: { max: 759, ...site('@media (max-width: 759px)') },
  tablet: { max: 1023, ...site('@media (max-width: 1023px)') },
};
