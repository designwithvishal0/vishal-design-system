# Tokens

Every value on a screen comes from here. The source is `design-system/tokens/tokens.mjs`, built into `design-system/tokens/tokens.css`. Each value in that file says whether it came from Vishal's site or is an extension. Never type a colour, size, duration or curve by hand. `npm run check` in `design-system/` fails if you do.

## Set up

```js
import '../../design-system/src/styles/base.css'; // fonts, tokens, base styles, once per app
```

```html
<html data-theme="light">             <!-- or "dark". Leave it out to follow the system -->
  <main data-accent="violet">         <!-- the product's one accent. Leave it out to stay neutral -->
```

`data-theme` and `data-accent` work on any element, so a preview can show light and dark side by side.

## Colour

| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| `--color-bg` | `#FAFAF8` | `#0C0C0E` | Page |
| `--color-ink` | `#0B0B0C` | `#F2F1EC` | Text, icons, focus ring |
| `--color-muted` | `#55565C` | `#A7A7AE` | Secondary text (7 to 1 and 8.2 to 1) |
| `--color-edge` | `#76777D` | `#6B6B72` | Borders of controls: buttons, tags, inputs |
| `--color-line` | `#E2E2DE` | `#232328` | Hairline dividers in lists |
| `--color-line-strong` | `#CFCFC8` | `#3A3A42` | Edges of cards, panels, modals, covers |
| `--color-surface-1` | `#F2F2EE` | `#1C1C20` | Cards and panels, one step off the page |
| `--color-surface-2` | `#EAEAE5` | `#26262B` | Menus, modals, sheets, covers, avatars |
| `--color-btn` / `--color-on-btn` | ink / page | ink / page | Primary button |
| `--color-live` | `#1E8A4F` | `#4CC38A` | Live and available dot only. Not text in light (4.18 to 1) |
| `--color-error` | `#B3261E` | `#FF9A90` | Errors only |
| `--color-scrim` | ink at 40% | black at 65% | Behind modals and sheets |
| `--color-panel-*` | dark in both themes | dark in both themes | The one dark closing panel. Use `.vd-inverse` |

## Accents

A palette of five. There is no brand accent of Vishal's own and no default: the page is neutral until a product picks one. Set it once with `data-accent` on the product's root. One per screen, never mixed. A product with its own brand colour adds it as a sixth pair (below).

| Accent | Wash light / dark | Exact text light / dark | `text-aa` light |
| --- | --- | --- | --- |
| orange | `#FFE2CC` / `#43210A` | `#F07322` / `#FF8A3D` | `#A34E17` |
| violet | `#DCD3FF` / `#241852` | `#4A2FD0` / `#B4A6FF` | `#4A2FD0` |
| amber | `#FFE7A8` / `#3B2A02` | `#A35A00` / `#F2B640` | `#9C5600` |
| teal | `#BDEBDF` / `#062E28` | `#006A80` / `#5CC8F0` | `#006A80` |
| sky | `#CFE6FF` / `#0C2C4D` | `#1B5E9E` / `#8CC0F2` | `#1B5E9E` |

Use the role tokens, never the named ones, so the product can change its accent in one place:

| Role | Use | With no accent |
| --- | --- | --- |
| `--accent-wash` | Soft fill: a selected row, one standout group | `surface-1` |
| `--accent-ink` | Heading on the wash | ink |
| `--accent-muted` | Body text on the wash | muted |
| `--accent-text` | The exact accent. Headings and large text only (24px and up, or 19px at 700) | ink |
| `--accent-text-aa` | Any small text in the accent. Passes 4.6 to 1 on the wash, the page and surface-1 | ink |

Orange's exact text is 2.8 to 1 on the light page: display size only.

Teal's text is a blue (`#006A80` light, `#5CC8F0` dark), close to sky. Both are the site's own values for its teal project, not a copy of sky's row (`#1B5E9E` and `#8CC0F2`). Never use teal and sky on the same screen; one accent per screen already rules it out.

### Adding a brand accent

A new product may show in its own brand colour (handoff 9.3: each product shows in its own colours). Add it as a new accent pair, built exactly like the five. It is never a second accent on a screen: the brand colour replaces the palette choice for that product.

1. In `design-system/tokens/tokens.mjs`, add an entry to `accents` with an `ext` note naming the brand.
2. Give it five colours, each as `[light, dark]`:
   - `wash`: a soft tint of the brand hue, as light and bright as the other washes (never greyed). Dark: a deep shade of the same hue, about 1.3 to 1.4 to 1 from the dark page, like amber's dark brown.
   - `muted`: body text on the wash, 6 to 1 or better on it.
   - `ink`: heading colour on the wash, 4.5 to 1 or better on it.
   - `text`: the brand's exact colour, for headings and large text only.
   - `textAa`: the brand colour darkened (light) or lightened (dark) until it passes 4.6 to 1 on its wash, on the page and on `surface-1`.
3. Run `npm run tokens` in `design-system/`. The build fails if `textAa` drops below 4.5 to 1 on any of the three, so a brand colour cannot slip below contrast.
4. Set `data-accent="<brand>"` on the product's root, and list the new pair in the hand back as an extension.

## Type

One family: Bricolage Grotesque Variable (`--font-sans`). The one exception is code, which uses the system monospace (`--font-mono`), for code only. Use a role, never a loose size. Each role is five tokens: `--type-<role>-size`, `-weight`, `-stretch`, `-lh`, `-tracking` (plus `-numeric` and `-transform`). Helper classes: `.vd-type-<role>`.

| Role | Size (phone) | Weight | Width | Line height | Tracking | For |
| --- | --- | --- | --- | --- | --- | --- |
| `display-xl` | 56 to 136 (52) | 800 | 75% | .92 | -.025em | A closing statement or launch moment |
| `display` | 56 to 88 (40) | 760 | 82% | .92 | -.01em | Page title, the main answer |
| `stat` | 56 to 104 (56) | 800 | 75% | .95 | -.02em | One big number on a calm screen |
| `stat-sm` | 40 (32) | 760 (700) | 75% (100%) | 1 | 0 | The one heavy number or name on a dense screen. Tabular numerals |
| `heading-lg` | 40 (28) | 700 | 85% (100%) | 1.05 | -.01em | Large heading |
| `heading` | 26 to 36 (24) | 700 | 100% | 1.1 | -.01em | Section heading |
| `title` | 22 (19) | 700 | 100% | 1.2 | -.01em | Block or card title |
| `title-sm` | 20 | 700 | 100% | 1.2 | 0 | Small title |
| `story` | 24 (19) | 400 | 100% | 1.45 | -.005em | Long intro text |
| `lead` | 18 | 500 | 100% | 1.5 | 0 | Lead paragraph |
| `body` | 18 (16) | 400 | 100% | 1.5 | 0 | Reading text |
| `small` | 15 | 500 | 100% | 1.4 | 0 | Interface text, nav, list meta |
| `meta` | 14 | 600 | 100% | 1.4 | 0 | Card meta line: Product · Type · Concept · 2026 |
| `label` | 13 | 600 | 100% | 1.4 | 0 | Labels, tags |
| `eyebrow` | 13 | 600 | 100% | 1.4 | .14em, uppercase | The only uppercase text |

The narrow display width only appears at 40px and up; every role smaller than that is full width.

Weights: `--weight-regular` 400, `-medium` 500, `-semi` 600, `-ui` 650 (buttons, the ceiling for interface text), `-bold` 700, `-display` 760, `-heavy` 800 (56px and up only).

Paragraph width: `--measure-min` 46ch to `--measure-max` 760px.

## Space

| Token | Value | Typical use |
| --- | --- | --- |
| `--space-1` | 4 | Inside a dense row |
| `--space-snug` | 6 | Title to meta, tight stacks |
| `--space-2` | 8 | Label to input, between touch targets |
| `--space-3` | 12 | Related items |
| `--space-4` | 16 | Default gap |
| `--space-5` | 24 | Between fields, between groups |
| `--space-6` | 32 | Between parts of a layout |
| `--space-7` | 48 | Large blocks |
| `--space-8` | 72 | Inside a section |
| `--space-9` | 96 | Large sections |
| `--space-10` | 120 | Largest blocks |
| `--space-11` | 160 | Between page sections |
| `--section-gap` | 160 (phone 96) | Between sections of a scrolling page |
| `--section-inner` | 72 (phone 48) | Inside a section of a scrolling page |

App layouts that fill the screen, like a chat app, an inbox or a dashboard, do not use section gaps. Their panels and groups use 24 to 48 (`--space-5` to `--space-7`).

Layout: `--layout-max` 1376px, `--layout-gutter` 32 (phone 16), `--layout-inset` 16 (phone 8), `--layout-bar` 56 (phone 52). Breakpoints: phone at 759px and below, tablet at 1023px and below.

Sizes: `--control-h` 44 (buttons and touch targets), `--control-h-sm` 36, `--control-pad-x` 22, `--row-h` 48 (comfortable list row), `--row-h-dense` 32, `--icon-sm` 16, `--icon-md` 20, `--icon-lg` 24, `--icon-stroke` 1.5px, `--cover-sm` 16 (cover 16 by 24).

## Radius

| Token | Value | Only for |
| --- | --- | --- |
| `--radius-pill` | 999 | Buttons, tags |
| `--radius-round` | 50% | Avatars, round buttons, dots |
| `--radius-xl` | 32 | Big panels, the closing panel |
| `--radius-row` | 28 | Big wash rows and panels |
| `--radius-lg` | 24 | Cards, modals |
| `--radius-media` | 20 | Hero media |
| `--radius-md` | 16 | Media, menus |
| `--radius-sm` | 12 | Small media, inputs |
| `--radius-list-row` | 12 | List row and sidebar item backgrounds |
| `--radius-cover-lg` | 6 | Medium and large covers |
| `--radius-cover` | 4 | Small covers |
| `--radius-check` | 4 | Checkboxes |
| `--radius-code` | 4 | Inline code |
| `--radius-xs` | 4 | The focus ring only |

Nested corners: inner radius equals outer radius minus the padding between them.

## Depth

| Token | Use |
| --- | --- |
| `--elev-0` | Flat. Most things |
| `--elev-1` | Hairline ring |
| `--elev-2` | 1px ink ring on images and media (8% light, 22% dark) |
| `--elev-3` | Menus, popovers, toasts. Floats |
| `--elev-4` | Modals and sheets. Floats |
| `--elev-panel` | The dark panel's edge in dark theme |

A shadow means one thing: this floats above the page. Cards, rows, panels and buttons never get one.

## Motion

| Token | Value | For |
| --- | --- | --- |
| `--dur-press` | 120ms | Press feedback (`scale(var(--state-press-scale))`, .97) |
| `--dur-fast` | 200ms | Hover, small reveals. The ceiling in tools used all day |
| `--dur-base` | 300ms | Small changes |
| `--dur-slow` | 520ms | Word rise |
| `--dur-reveal` | 600ms | Scroll reveal, rising `--reveal-distance` (20px), once |
| `--dur-stagger` | 45ms | Between items entering one after another |
| `--dur-spring` | 700ms | Expressive moments only |
| `--dur-colour` | 900ms | Colour and theme changes |
| `--dur-ping` | 2.4s | The live dot pulse |
| `--ease-out` | (.23, 1, .32, 1) | Default for movement |
| `--ease` | (.2, .8, .2, 1) | Colour and background |
| `--ease-in-out` | (.7, 0, .2, 1) | Large reveals |
| `--ease-spring` | (.2, .9, .25, 1.1) | Expressive moments only |

Under `prefers-reduced-motion` every duration becomes 0. Design that state on purpose.

## States

`--state-hover-ghost` (ink at 7%), `--state-hover-primary`, `--state-press-scale` .97, `--state-disabled-opacity` .4, `--focus-width` 2px, `--focus-offset` 3px. Hover only inside `@media (hover: hover) and (pointer: fine)`.
