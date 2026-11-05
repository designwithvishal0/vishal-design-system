# Extensions

Every token that is not read from the live portfolio. Each one fills a gap the portfolio never needed to answer. This list feeds the "where it breaks" section of the README.

- `color-surface-1`: The site draws no cards on the page background. Product screens need a surface for cards and panels. In dark it is clearly lighter than the page (1.15 to 1).
- `color-surface-2`: A second surface step for things that sit on a card: menus, popovers, modals, sheets (1.30 to 1 against the page in dark).
- `color-line-strong`: Visible border for cards and panels. Vishal rule: in dark mode, no dark on dark. The site hairline (--line) is only 1.25 to 1 against the page, which is too faint to separate a card.
- `color-error`: The site has no error state. Chosen to keep 4.5 to 1 or better on the page and on surface-1 in both themes.
- `color-scrim`: Overlay behind a modal or sheet. Not on the site.
- `elev-3`: Dark value only. Light is on the site: the Accessibility menu shadow (0 16px 40px) with the hairline ring from the dock. The dark value is proposed: a stronger border and a deeper shadow, since a soft shadow cannot show on near black.
- `elev-4`: Light shadow is on the site (0 24px 60px). The ring and the whole dark value are proposed.
- `elev-panel`: The site closing panel has only a faint ring (#26262b) in dark. Vishal rule: no dark on dark, so the panel gets the strong border.
- `space-1, space-snug, space-2, space-3, space-4, space-5, space-6, space-7, space-8, space-9, space-10, space-11`: Spacing scale. The live site has no spacing tokens (handoff 2.6), so the scale is derived from the gaps and paddings the site repeats.
- `z-popover`: The site has one popover and no scale. Menus and popovers sit above the bar.
- `z-overlay`: Modals and sheets sit above everything.
- `row-h`: Comfortable single line list row. Taller than the 44px button so a row never reads as a button. Two line rows size to their content (Vishal, 5 Nov 2026).
- `icon-sm`: Icons scale with their text but snap to 16, 20 or 24px so their lines stay crisp (Vishal, 5 Nov 2026). 16px sits with small text.
- `icon-md`: Icon snap size for body text (Vishal, 5 Nov 2026).
- `icon-stroke`: Icon line width at every size. Outline icons with rounded ends, to match the soft shapes of Bricolage (Vishal, 5 Nov 2026).
- `icon-lg`: Largest icon snap size (Vishal, 5 Nov 2026).
- `row-h-dense`: Chat messages and long book lists need a row tighter than the 44px control. 32px with space-snug between.
- `cover-sm`: Width of the small book cover used in dense lists. Covers keep the real 2 by 3 book shape, so 20 by 30 (Vishal, 5 Nov 2026).
- `radius-cover`: Corner of the small book cover. Same 4px as the focus ring, but its own token so covers never borrow the focus radius (Vishal, 5 Nov 2026).
- `radius-cover-lg`: Corner of the medium and large book covers (Vishal, 5 Nov 2026).
- `radius-list-row`: Hover and selected background of a list row. Its own token, separate from the 28px used for the big portfolio rows (Vishal, 5 Nov 2026).
- `state-disabled-opacity`: The site has no disabled state.
- `accent-sky-ink, accent-sky-text`: The site defines only the wash and muted colours for sky. The heading ink and accent text are proposed here, deeper blues that keep 5 to 1 or better on the wash.
- `accent-orange-wash (dark only)`: Dark theme only. The site value is #1B1E2C, a navy that reads as blue next to orange. Replaced with a dark burnt orange (hue 24) set at the same depth as the other dark washes: 1.36 to 1 against the page, where amber is 1.41. Orange text on it is 6.1 to 1.
- `accent-orange-muted (dark only)`: Dark theme only. The site value is #B8BCCB, a blue grey chosen for the navy wash. Replaced with a warm light tone that gives 8.7 to 1 on the burnt orange wash.
- `accent-<name>-text-aa (all five accents)`: Darker accent text for small text. The site exact accent colour (text) fails 4.5 to 1 on its wash or on the page for orange and amber. The shade is the site colour darkened until it passes 4.6 to 1 on the wash, the page and surface-1. Violet, teal and sky already pass and keep their value. Dark equals the site value, which already passes.
- `accent-wash, accent-muted, accent-ink, accent-text, accent-text-aa`: Neutral by default. The page has no brand accent (handoff 9.3, Vishal 5 Nov 2026). Colour appears only when a product sets data-accent. The neutral wash is surface-1, so a selected row still shows and a surface-2 book cover still stands out on it.
- `prefers-reduced-motion block`: Zeroes every duration at token level. The site has a Reduce motion toggle, but no token level rule.
