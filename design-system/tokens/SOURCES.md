# Where the tokens came from

There is no Astro source on this Mac, so every value was read from the live site's CSS at https://vishal-designs.vercel.app (the `:root` variables, the dark theme blocks, and the rules for the nav, buttons, tags, headings and closing panel). It was then checked against `PORTFOLIO_HANDOFF.md`, written from the portfolio source on 5 Nov 2026. Where the two differ, the handoff wins. The case study pages were ignored.

Next to every value in `tokens.css` is a comment saying which variable or rule it came from, or that it is an extension.

## Accents (decided by Vishal, 5 Nov 2026)

Five accents, kept as a palette. There is no brand accent and no default accent. Vishal's rule (handoff 9.3): the page is neutral and colour comes only from the product being shown. Each new product picks one of the five as its own colour and sets `data-accent` on its screen. One per screen, never mixed. With no accent set, every accent role falls back to neutral: the wash is `color-surface-1` and the text colours are `color-ink` and `color-muted`.

| Accent | Wash, light | Exact text, light | Small text (text-aa), light | Source |
| --- | --- | --- | --- | --- |
| orange | `#FFE2CC` | `#F07322` | `#A34E17` | ixigo's product colour on the home page (`.kf .work`, `.kf .hero`), confirmed by handoff 2.1. Not a signature colour |
| violet | `#DCD3FF` | `#4A2FD0` | `#4A2FD0` | `:root` ixigo set |
| amber | `#FFE7A8` | `#A35A00` | `#9C5600` | `:root` split set |
| teal | `#BDEBDF` | `#006A80` | `#006A80` | `:root` twelve set |
| sky | `#CFE6FF` | `#1B5E9E` | `#1B5E9E` | `:root` sky set. The site has only wash and muted, so ink and text are extensions |

Dropped: coral (too close to orange, weakest contrast), and the home page blue, lime and light blue.

**Orange in dark theme differs from the site, on purpose.** The site's dark ixigo wash is `#1B1E2C` and its muted text is `#B8BCCB`. Those are a navy and a blue grey, picked for the site's old blue sections, and beside orange text they read as blue: the wash card, the chip, the selected row and the accent avatar all looked blue in dark mode. The tokens use a dark burnt orange wash `#43210A` and a warm muted text `#E3C3A8` instead, built the way the other accents work in dark (amber's dark brown wash, teal's dark green). Both are extensions, marked in the file. Contrast: orange text on the new wash is 6.1 to 1, the heading ink 6.9 to 1, the muted text 8.7 to 1, and the wash sits 1.36 to 1 from the page, close to amber at 1.41. The light theme still uses the site values.

**The contrast rule.** The site's exact accent text colours are for headings and large text only. Every accent also has `text-aa`, the same hue darkened until it passes 4.6 to 1 on its wash, on the page and on surface-1. Use `text-aa` for any small text. The light values are an extension. The dark values already pass and equal the site values. `node tokens/build.mjs` fails if any `text-aa` value drops below 4.5 to 1.

Why it matters, light theme, exact site text colour:

| Accent | On wash | On page |
| --- | --- | --- |
| orange `#F07322` | 2.4 to 1 | 2.8 to 1 |
| amber `#A35A00` | 4.3 to 1 | 5.0 to 1 |
| violet, teal, sky | 4.8 to 1 or better | 5.7 to 1 or better |

Orange at 2.8 to 1 on the page is below even the 3 to 1 that large text needs. The site uses it only as a display size accent on the hero headline. Keep it to that.

## What changed after checking against the handoff

1. **Spacing scale is now marked an extension.** Handoff 2.6: the live site has no spacing tokens. The scale is derived from gaps and paddings the site repeats. Added `space-11` (160px), the home page rhythm between sections.
2. **Radius.** Added `radius-media` (20px, hero media slot) and `radius-row` (28px, work rows and hover washes), both in handoff 2.7 and missing from my first pass.
3. **Menu shadow.** `elev-3` light changed from `0 12px 32px` (that value belongs to the dock) to `0 16px 40px #00000024`, the Accessibility menu (handoff 2.8). A shadow means one thing only: this floats above the page.
4. **Type.** Added the `meta` role, 14px weight 600, for the card meta line "Product · Type · Concept or Shipped · Year" (handoff 2.5 and 3).
5. **Motion.** Hover is 200ms with the ease-out curve. Word rise stays 520ms. Added `dur-reveal` (600ms scroll reveal) and `dur-ping` (2.4s live dot).
6. **Controls.** Added the exact button padding `control-pad-x` (22px), tag padding, and the frosted bar filter (`blur(18px) saturate(1.8)`).

Everything else matched the handoff: the core and dark colours, the closing panel colours, `--bar`, `--gut`, `--max`, `--inset`, the focus ring, the easing curves, the press scale and the breakpoints.

## Where the handoff and the live site disagree, or need Vishal

- **Header colour.** Handoff 2.2 says the header is always light in both themes. The live home page in dark theme shows a dark header, and the `bar-light` rule is not applied there. The Nav component follows the theme by default and has a `tone="light"` option that forces the light set.
- **Weight 800 only at 56px and above.** Settled 5 Nov 2026. `stat-sm` stays 40px (32px on phones) but drops to weight 760, and 720 on phones, like the work titles on phones. It uses tabular numerals. Weight 800 now appears only at 56px and above, as handoff 9.1 says.
- **No brand accent.** Settled 5 Nov 2026. An earlier pass made orange the default accent. Vishal corrected it: orange is ixigo's product colour, not his, and handoff 9.3 stands. The accent tokens are now neutral by default and components stay neutral until a product sets an accent.

## Left out on purpose

- `--u1` to `--u7` and `--t-sells`: the rainbow on "unsure." and "sells?". Handoff 9.3 says never copy the pencil set anywhere else.
- Hero fluid sizes `--hl` and `--hu`, the iPhone frame radius (46px), case study palettes and fonts, the switch control, video controls and the old B2 `tokens.css`.
- Radii of 2, 9, 18 and 48px: each appears once. Folded into the nearest step.

## Book covers (extension)

Covers are neutral: `surface-2` with a 1px `line-strong` edge, on every row. The plain hairline would vanish on dark rows, which breaks the no dark on dark rule. Corners have their own tokens so covers never borrow the focus ring radius: `radius-cover` 4px for the small cover, `radius-cover-lg` 6px for medium and large (Vishal, 5 Nov 2026).

## Other contrast notes

- Body, muted and all dark theme accent text pass 4.5 to 1 or better.
- The live green on the light page is 4.18 to 1. Fine for a dot, too low for text.
- `color-edge` is 4.27 to 1 light and 3.7 to 1 dark, which clears the 3 to 1 needed for borders.
- The site's own dark closing panel (`#18181B` on `#0C0C0E`) is 1.10 to 1 apart, held up by a faint ring. Vishal's rule is no dark on dark, so the panel and all dark cards get `color-line-strong` borders as an extension.
