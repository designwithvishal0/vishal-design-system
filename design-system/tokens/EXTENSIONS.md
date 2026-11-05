# Extensions

Every token that is not read from the live portfolio. Each one fills a gap the portfolio never needed to answer. This list feeds the "where it breaks" section of the README.

- `color-surface-1`: The site draws no cards on the page background. Product screens need a surface for cards and panels. In dark it is clearly lighter than the page (1.15 to 1).
- `color-surface-2`: A second surface step for things that sit on a card: menus, popovers, modals, sheets (1.30 to 1 against the page in dark).
- `color-line-strong`: Visible border for cards and panels. Vishal rule: in dark mode, no dark on dark. The site hairline (--line) is only 1.25 to 1 against the page, which is too faint to separate a card.
- `color-error`: The site has no error state. Chosen to keep 4.5 to 1 or better on the page and on surface-1 in both themes.
- `color-scrim`: Overlay behind a modal or sheet. Not on the site.
- `elev-3`: Light value is on the site (0 0 0 1px line, 0 12px 32px). Dark value is proposed: a stronger border and a deeper shadow, since a soft shadow cannot show on near black.
- `elev-4`: Light shadow is on the site (0 24px 60px). The ring and the whole dark value are proposed.
- `elev-panel`: The site closing panel has only a faint ring (#26262b) in dark. Vishal rule: no dark on dark, so the panel gets the strong border.
- `row-h-dense`: Chat messages and long book lists need a row tighter than the 44px control. 32px with space-snug between.
- `state-disabled-opacity`: The site has no disabled state.
- `accent-sky-ink and accent-sky-text`: The site defines only the wash and muted colours for sky. The heading ink and accent text are proposed here, deeper blues that keep 5 to 1 or better on the wash.
- `accent-wash, accent-muted, accent-ink, accent-text`: Neutral default so a screen with no accent still has valid values.
- `prefers-reduced-motion block`: Zeroes every duration at token level. The site has a Reduce motion toggle, but no token level rule.
