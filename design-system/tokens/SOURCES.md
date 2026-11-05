# Where the tokens came from

There is no Astro source on this Mac, so every value was read from the live site's CSS at https://vishal-designs.vercel.app (the `:root` variables, the dark theme blocks, and the rules for the nav, buttons, tags, headings and closing panel). The case study pages were ignored. Next to every value in `tokens.css` is a comment saying which variable or rule it came from, or that it is an extension.

## One open question: which five accents

The site holds two accent sets.

**Set A, the five pairs in `:root`.** These are the ones now in the tokens, named by hue:

| Name | Site name | Wash, light | Accent text, light |
| --- | --- | --- | --- |
| violet | ixigo | `#DCD3FF` | `#4A2FD0` |
| amber | split | `#FFE7A8` | `#A35A00` |
| teal | twelve | `#BDEBDF` | `#006A80` |
| coral | jarvis | `#FFCDB8` | `#C03A0A` |
| sky | sky | `#CFE6FF` | none on the site (extension) |

**Set B, what the home page actually shows.** The home page remaps four of these inside the work section and the hero (`.kf .work`, `.kf .hero`):

| Name | Wash, light | Accent text, light | Wash, dark | Accent text, dark |
| --- | --- | --- | --- | --- |
| orange | `#FFE2CC` | `#F07322` | `#1B1E2C` | `#FF8A3D` |
| blue | `#D3E3FD` | `#1A62D6` | `#0F2247` | `#8AB4F8` |
| lime | `#E4F2B8` | `#1D5A3A` | `#0B2A1F` | `#CDE86F` |
| light blue | `#D2E4F6` | `#2E86E0` | `#0F2A48` | `#6CB0F7` |

Set A has five pairs, which matches "five accent pairs", so it is the default. Set B is what a visitor sees on the home page today, and it has only four, two of them close blues. This needs Vishal's call.

## Left out on purpose

- `--u1` to `--u7` and `--t-sells`: the rainbow on the word "sells?" in the closing panel. It breaks the one accent per screen rule.
- The fluid hero sizes `--hl` and `--hu`: they depend on the hero layout. The type roles use the fixed sizes the rest of the site uses.
- Radii of 2, 9, 18, 20, 28 and 48px: each appears once or twice. Folded into the nearest step.

## Contrast notes

Checked against the page background and against each accent wash, in both themes.

- Body text, muted text and every dark theme accent pass 4.5 to 1 or better.
- In light theme, accent text on its wash is 3.8 to 1 for coral and 4.3 to 1 for amber. That is fine for headings and large text, and too low for small body text. Use `accent-muted` for small text on a wash.
- The live green on the light page is 4.18 to 1. Fine for a dot, too low for text.
- The control border `color-edge` is 4.27 to 1 light and 3.7 to 1 dark, which clears the 3 to 1 needed for borders.
- The site's own dark closing panel (`#18181B` on `#0C0C0E`) is only 1.10 to 1 apart, held up by a faint ring. Vishal's rule is no dark on dark, so the panel and all dark cards get `color-line-strong` borders as an extension.
