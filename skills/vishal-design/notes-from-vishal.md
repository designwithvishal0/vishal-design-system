# Notes from Vishal

Decisions and rules in Vishal's words, written down as he gave them. The skill in Stage 4 draws on this file. Nothing here is invented by an agent.

## Stage 1: visual language (confirmed 5 November 2026)

He confirmed the written description of his visual language is right, and answered three questions.

1. Accents. Keep five accent pairs from the site (soft tint plus deeper text colour, the `--w-*` and `--t-*` values) as a named palette. Rule: one accent per screen or product, never mixed. Keep the green live dot as its own status colour.

2. Headlines. Full heavy narrow treatment only for page titles and hero moments. On dense product screens use the same weight contrast at a smaller size, in one place per screen (a channel name, or a stat like "34 of 50 books"). Never in lists, messages or body content.

3. Two added rules.
   1. Buttons never lift or move on hover. Feedback is colour and press only.
   2. In dark mode, no dark on dark. Cards and panels must stay clearly separated from the background.

## Stage 2: tokens (decided 5 November 2026)

1. Accents (superseded by the correction below: orange is not a signature colour and there is no default accent). Use five: orange (the signature accent, from the home hero, wash `#FFE2CC`, text `#F07322` in light and `#FF8A3D` in dark), violet, amber, teal and sky from the base set. Drop coral, it is too close to orange and has the weakest contrast. Drop the home page blue, lime and light blue. Orange is the default accent when a screen needs one and none is chosen.

2. Contrast. Do not rely on components remembering to use the muted accent colour. For every accent in light theme there is a darker accent text shade that passes 4.5 to 1 on its wash and on the page background, marked as an extension. The site's exact accent colours are for headings and large text only. Rule for the skill: any small text in an accent uses `accent-text-aa`, never `accent-text`.

3. The handoff file wins. Where the tokens and `PORTFOLIO_HANDOFF.md` differ, the handoff is right. The changes made are listed in `design-system/tokens/SOURCES.md`.

## Correction before Stage 4 (5 November 2026)

1. Accents. "Orange is not my signature colour, it is ixigo's product colour. My rule (handoff 9.3) is a neutral page where colour comes only from the product being shown, and there is no brand accent of my own. Keep the five accents as a palette, remove orange as the default, and make the default neutral. Each new product picks one accent as its own colour."

2. Covers. "Make all Cover components neutral (surface-2 with a hairline), not the accent wash, so they show on every row including the selected one without a special case. The accent marks the selected row only."

3. Background. `PORTFOLIO_HANDOFF.md` in Claude's Work holds the real source values, his design decisions and his taste. It is background for the interview and the skill. It never stands in for his interview answers.

## Decisions on the handoff differences (5 November 2026)

1. "stat-sm: keep 40px, change the weight to 760 (720 at 32px on phones), with tabular numerals. This matches my site's work titles on phones and keeps 800 for 56px and above, as handoff 9.1 says."

2. "Cover edge: keep line-strong. A plain hairline would vanish on dark rows, which breaks my no dark on dark rule."

3. "Cover corner: keep 4px but give it its own token, radius-cover, so it does not borrow the focus ring radius. cover-md and cover-lg use 6px."

The list of settled differences (header follows the theme, the dark orange values, the derived spacing scale, the new surface, line, shadow and text-aa values) is confirmed.

## Interview answers

Recorded word for word, 5 November 2026. Nothing here is filled in by an agent or taken from the handoff.

### Identity

**1. When a screen feels like mine, what are the two or three things making it feel that way?**

Three things.

1. A few big words that carry the screen. Heavy and narrow Bricolage, set tight, against calm light body text. The big words are usually the user's own question, like "Will I travel tonight?" Everything people read line by line stays light.

2. A quiet page where only the product brings colour. The page is warm off white and near black ink, edges are 1px hairlines, not shadows, and the colour comes from the product being shown, never from me.

3. Space. Generous gaps between sections so every part can breathe. If it feels congested, it is wrong, and I fix it by adding space, not by shrinking things.

**2. What would you never do in your system, visually or in the experience?**

Visually:
1. Lift a button or card on hover. Hover changes colour, press scales down slightly, nothing jumps up.
2. Put dark on dark. A dark card on a dark page has to be clearly separated, or it is wrong.
3. Make it look like a template, a UI kit or an agency site. No service grids, no logo walls.
4. Grey down colour. Pastels stay bright, never muddy.
5. Crop or shrink screens and thumbnails until you cannot read them.
6. Make numbers glow or colour them for effect. I said "Eww" to that once and I meant it.
7. Use heavy weight on anything people read line by line.

In the experience:
1. Show fake prototypes made of images. If it says prototype, it is real and clickable.
2. Let controls cover the content.
3. Hide content on desktop. Phones can trim long paragraphs, desktop shows everything.
4. Add motion for decoration: cursor followers, rolling button labels, parallax.
5. Put lorem ipsum, invented numbers or invented results anywhere. Concept work is called concept work.
