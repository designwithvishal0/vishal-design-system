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

## The standard

Vishal's words, 5 November 2026. This is the opening section of SKILL.md, above every rule, titled "The standard".

Whoever uses this skill is making work to a standard, so the standard has to be clear. The standard is a professional senior designer who loves the craft and shows it in the work. Every screen should look like that person made it with care: one clear idea, a deliberate hierarchy, real content, even spacing, finished details and, where it fits, one moment people remember. When no rule covers a case, ask one question: would that designer ship this? If not, it is not done.

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
3. Make something that looks like a UI kit assembled by someone, instead of designed by a senior designer. Every screen has to meet the standard at the top of the skill. If it could be any product's screen with the logo swapped, it is not done. *(Replaced by Vishal, 5 Nov 2026.)*
4. Grey down colour. Pastels stay bright, never muddy.
5. Crop or shrink screens and thumbnails until you cannot read them.
6. Make numbers glow or colour them for effect. I said "Eww" to that once and I meant it.
7. Use heavy weight on anything people read line by line.

In the experience:
1. Show fake prototypes made of images. If it says prototype, it is real and clickable.
2. Let controls cover the content.
3. Hide content on desktop. Phones can trim long paragraphs, desktop shows everything.
4. Reuse the same few motions on every design. The motions on my site, like words that rise, numbers that count, scroll that scrubs and the "unsure." letters, are examples, not a set to copy. Each product gets the motion that fits it. Any kind of motion is welcome when it suits the design, improves the experience and feels in context. Motion that looks cheap or out of place does not go in, like the cursor followers, rolling button labels and parallax I removed from my own site. Everything must turn off cleanly under Reduce motion. *(Replaced by Vishal, 5 Nov 2026.)*
5. Put lorem ipsum, invented numbers or invented results anywhere. Concept work is called concept work.

### Thinking

**3. When you start a new product, how do you decide what the layout is built around?**

I build the layout around the moment that matters most and the question the user has in it. On my site that is "I design for the moment people are unsure." For ixigo it was "Will I travel tonight?" But not every screen is an unsure moment, so I first work out what kind of moment it is.

My steps:
1. Whose screen is it, and who else looks at it? A reading profile has the owner and visitors, and they want different things. Pick the main viewer from what the product is trying to achieve, and serve the other one second.
2. How often and how much is at stake? A rare, high stakes moment like ixigo gets one clear answer, big and first. A tool used fifty times a day, like messaging, gets speed: things stay in the same place, it is dense, and the frequent action is always in reach.
3. Write the main question in the user's own words, then put the answer in the most prominent place. Prominence can come from position, weight or contrast, not only size.
4. List the jobs people repeat on this screen, like writing a message, and keep them within reach even though they are not the main question.
5. Order the rest by what they need next, not by what the product wants to show. Things they need later move lower. They are not removed. Everything the brief requires appears; the question decides its order and weight, never whether it is there.
6. Check the main question in its different states: nothing new, a little, a lot.

For messaging, the question might be "What needs me right now?" For a reading profile, the owner asks "What am I reading, and how am I doing?" and a visitor asks "Is this person's taste worth following?" Building for a different main viewer is one honest way to get a genuinely different direction.

**4. How do you come up with three genuinely different directions instead of three versions of one?**

Three directions are genuinely different when each one is built around a different idea of what the screen is for, not a different look. My system stays the same in all three: same type, same tokens, same product colour. So the difference has to come from the structure, never from styling.

Where I find the difference. Each direction changes at least one of these:
1. The main viewer. Build one for the owner and one for a visitor.
2. The main question. Different moments give different questions, like "What needs me right now?" versus "What happened while I was away?"
3. How it is organised. By time, by people, by topic, or by status.
4. How it is used. A quick glance versus deep work, mouse versus keyboard.
5. The signature moment. Each direction puts its one memorable moment somewhere different.

My steps:
1. Write a one line idea for each direction before building anything.
2. Check each line: can I describe it without mentioning colour, type or style? If not, it is a style variant, not a direction.
3. If two directions share the same main question and the same organisation, replace one.
4. Each direction must be one I would be willing to ship. No safe one with two filler ones.
5. Each direction must meet the standard and include everything the brief requires.
6. For each one, write who it is best for and what it gives up. Every real direction makes a trade off.
7. Pick the one that best answers the main question for the main viewer, and say what the others do better.

What does not count as a direction: the same layout in three colours, the same layout with the sidebar moved, or a light, dark and dense version of one idea. And never copy one reference.

Examples:
Messaging
1. Threads first: conversations are the unit, channels sit behind them.
2. Needs you: one inbox of only what needs a reply or a decision, everything else waits.
3. Keyboard first: a command bar drives everything, built for people who live in it all day.

Reading profile
1. My year: the reading challenge and progress lead, for the owner.
2. My taste: shelves, ratings and reviews lead, for a visitor deciding whether to follow.
3. My reading story: the year told as a timeline of what was read and when.

**5. When something does not exist in your system yet, what do you hold on to and what are you willing to bend?**

When something does not exist yet, I keep the parts that make it look like mine fixed, and let the structure bend around them.

What I hold on to, always:
1. One family, Bricolage. Heavy and narrow only at 40px and above, light for anything people read line by line.
2. A neutral page where colour comes only from the product, one product colour per screen.
3. Edges from hairlines. A shadow only means something floats.
4. Radius from the set, pills at full round, and no hover lift.
5. Tokens only, the same motion timing and easing, contrast that passes, and both themes.
6. The standard at the top of the skill.

What I am willing to bend:
1. Density: row height, gaps inside a component, how much fits on one screen.
2. Layout: columns, panels, what sits where.
3. How components combine into something new.
4. Sizes, as long as they come from the scale.
5. The size of the one heavy moment on a dense screen.

How I build something new, in order:
1. Try an existing component first.
2. If that does not work, combine existing components.
3. If something new is needed, find its closest relative in the system and follow that relative's logic. A chat message follows the List row, not a speech bubble from another app.
4. Build it only from tokens. If a value is missing, take it from the existing scale, never pick a random one.
5. Mark it as an extension, with one line on why it was needed.
6. Check it in both themes, in its states, and next to the existing components. If it stands out as foreign, it is not done.

What I never invent: a new colour, a new font, a new shadow style, or a radius outside the set.

If something truly cannot be built without breaking one of the things I hold on to, do not quietly break it. Write it down as a place where the system breaks. That is honest, and it tells me where the system needs to grow next.

Examples:
1. A dense chat thread: built from the dense List and Avatar, separated by space and hairlines, timestamps in tabular numbers, 32px rows. No bubbles.
2. A reading stats chart: bars filled with the product's accent wash, labels in muted text, one big number using the stat style, used once on the screen.
3. A star rating: drawn as filled icons in the product colour, sized from the type scale, passing contrast.

### Visual finesse

**6. Typography: how do you decide hierarchy on a screen, how many sizes and weights you allow at once, and which details you always fix?**

Hierarchy comes from the user's question. The answer to the main question gets the strongest type on the screen, and everything else steps down in the order people need it. I build that contrast with size, weight and width together, never with colour alone.

Limits on one screen:
1. One display moment at most: heavy and narrow Bricolage, 760 to 800 weight, 75 to 85% width, only at 40px and above. On dense screens it appears once, as a page title or one stat.
2. At most four text sizes below that, taken from the scale: 13, 15, 16, 18 and 20px. Body is 18px, or 16px on phones and dense screens. Nothing below 13px.
3. At most three weights visible: 400 for reading, 500 to 650 for interface text like labels and buttons, and the display weight. Buttons and labels never go above 650.
4. Emphasis comes from weight or position. Not from colour, not from italics, not from underlines that are not links.

Details I always fix:
1. Line length: paragraphs stay between about 46 characters and 760px wide. Never full width text.
2. Line height: display tight at .92 to .95, body at 1.5, interface text at 1.3 to 1.4.
3. Tracking: display slightly tighter, -.01 to -.025em. Small uppercase eyebrows slightly looser, .14em at 13px. Body left alone.
4. Numbers: tabular figures for times, counts, prices, ratings and anything in a column, so they line up. Numbers in columns align right.
5. Headings never end with one word alone on the last line. Balance the lines.
6. Real punctuation: curly quotes and apostrophes, a real ellipsis, a non breaking space between a number and its unit. In prose, ranges are written with "to".
7. Case: sentence case for interface text. Uppercase only for small eyebrows.
8. Alignment: text aligns left. Centred text only for very short lines, never for paragraphs.
9. Truncation: names and titles in lists truncate to one line with an ellipsis, and message previews to two lines. The answer to the main question is never truncated.
10. Muted text is for secondary information only and still passes 4.5 to 1.

Why: type is most of what people see on a screen. When the hierarchy is right, a screen reads in two seconds, and when the details are fixed, it looks finished even before colour or images arrive.
When it may bend: marketing or launch moments can push the display size beyond the usual, but still one moment per screen.

**Decision on the type differences (5 November 2026)**

"My size list in answer 6 was the body and interface tier, not the whole scale. Keep the 14px meta role and the 22px title role, keep the heading tier from 24px to 40px, and add an eyebrow token: 13px, weight 600, uppercase, .14em tracking."

**7. Spacing and alignment: how do you keep rhythm, what do you do about optical alignment, and how do you decide what gets grouped versus separated?**

Spacing is how I show what belongs together. Things that belong together sit close, things that do not get more room. If a screen feels congested, I add space. I never shrink things to fit.

Rhythm:
1. Every gap comes from one scale built on steps of 4 and 8: 4, 8, 12, 16, 24, 32, 48, 72, 120, 160. No random values.
2. The gap grows with the level. Inside a component is smaller than between components, which is smaller than between sections. On my home page that is 72 inside a section and 160 between sections.
3. Panels sit 16px in from the screen edge (8px on phones), with a 32px side gutter (16px on phones) and content capped at 1376px.
4. On phones the gaps roughly halve, but the order of small, medium and large stays the same.
5. Dense screens keep rhythm through repetition: every row the same height, 32px for dense lists and 48px for comfortable ones.

Grouping versus separating, in this order:
1. Space first. If space alone shows the groups, stop there.
2. A colour wash second, for a group that needs to stand out as one unit.
3. A 1px hairline third, for lists and dividers.
4. Never a box around everything. Cards are for things you can pick up as a whole.
A group is one decision or one task. A label and its input are one group, so 8px apart. Two fields are separate groups, so 24px apart.

Optical alignment, because what looks right beats what measures right:
1. Icons sit centred on the text they belong to, not on the box. Icon size follows the text: 16px with small text, 20px with body text.
2. Text inside a pill looks centred, not just measured centred. Buttons are 44px tall with 22px side padding, and I nudge by a pixel if descenders make it look low.
3. Shapes that point, like play triangles and arrows, shift slightly towards their point so they look centred.
4. Round things look smaller than square things of the same size, so circles and avatars get a little more size or space to match.
5. Everything lines up to the text's left edge, not the icon's. When an icon starts a row, the text after it is what aligns with the rest of the page.
6. Numbers in columns align right, so their digits line up.
7. Touch targets have at least 8px between them so taps never hit the wrong one.

Why: when spacing is even and grouping is clear, people understand a screen before they read it. Uneven spacing is the fastest way to make a screen look amateur.
When it may bend: a single moment can get extra space to make it land, like the one signature moment on the screen. Never less space than the scale allows.

**Decisions on the answer 7 differences (5 November 2026)**

1. "Keep space-snug (6px) and space-9 (96px) in the scale."
2. "Comfortable single line List rows become 48px, so rows do not read as buttons. Two line rows size to their content."
3. "Icons scale with the text but snap to 16, 20 or 24px, so their lines stay crisp."
4. "On phones, section gaps shrink: 96px between sections and 48px inside, instead of 160 and 72. My case studies already shrink their sections on small screens."

**8. Colour and depth: where is colour allowed to appear, how do you use hairlines, surfaces and shadows, and how is dark mode designed rather than inverted?**

The page is neutral. Colour belongs to the product, not to me, and depth is drawn with lines, not shadows.

Where colour may appear:
1. One product colour per screen, never two mixed.
2. It appears in a few places only: a wash for one group that should stand out, a selected state, headings and large accent text, and the screen's signature moment.
3. Small accent text always uses the darker text shade that passes 4.5 to 1. The exact accent colour is for headings and large text only.
4. Status colours are separate and carry meaning only: green means live or available, red means error. Never used for decoration.
5. Colour never carries meaning alone. A selected row also changes weight or gets a mark, so it still works for people who cannot see the colour.
6. Pastels stay bright. Never greyed down or muddy.
7. Most of the screen stays neutral. If colour is everywhere, it stops meaning anything.

How depth works:
1. Levels go page, then surface, then wash. A surface is one quiet step off the page.
2. Lines: the hairline for dividers and lists, the stronger line for edges of cards and surfaces, and a 1px ring on images and media.
3. A shadow means one thing only: this floats above the page. Menus, popovers, dialogs, toasts, hover previews and device frames get one. Cards, rows, panels and buttons never do.
4. Modals and sheets sit on a scrim so the page behind clearly steps back.

How dark mode is designed, not inverted:
1. The page is near black #0C0C0E, not pure black, and text is warm off white #F2F1EC, not pure white. Pure black and white strain the eyes.
2. Things that rise get lighter, because shadows barely show on a dark page. Surfaces step up in lightness, and floating things get a 1px ring as well as a shadow.
3. Lines switch to their own dark tokens. Washes get their own deep dark values, not inverted pastels, and accent text gets its own lighter tone.
4. Contrast is checked again in dark. A colour that passes in light can fail in dark.
5. No dark on dark: every card and panel stays clearly separated from the page.
6. The one dark moment, like my closing panel, becomes a lifted surface with an edge in dark mode, so it still stands apart.

Why: a neutral page lets the product be the only thing with colour, so every product looks like itself. Lines work in both themes, while shadows break in dark mode.
When it may bend: a launch or marketing moment can use a full colour field for impact, as long as the text on it still passes contrast and it stays the one big colour moment on the page.

**9. Icons, imagery and small details: what icon style and size do you use, how are images and covers cropped, how do you keep radius consistent, and what small things make a screen feel finished?**

*(Given in two parts, recorded together as one answer.)*

Icons:
1. One icon family only, never mixed libraries. Outline style with a 1.5px stroke and rounded ends, so it matches the soft shapes of Bricolage.
2. Filled icons only for active or selected states, and for arrows, which are always filled.
3. Sizes snap to 16, 20 or 24px, following the text they sit with.
4. An icon takes the colour of the text next to it. It never gets its own colour.
5. An icon must stand for something. Never add icons as decoration.
6. An icon only button still has a label for screen readers and a 44px touch area.

Imagery:
1. Screens and covers are shown full and uncropped, at a size you can actually read.
2. Book covers keep their real 2 by 3 shape. A crop never cuts the title.
3. Images fill their space without stretching. Photos crop around the subject, with faces and eyes in the upper third.
4. Every image gets a 1px ring at 8% ink, 22% in dark, so its edge stays clean on any background.
5. A missing image never shows as an empty grey box. Use a neutral surface with the title or initials.
6. The phone frame only when a screen needs it, never everything in a frame.

Radius:
1. Only values from the set: full round for pills, 50% for round buttons and avatars, 32 for big panels, 28 for rows, 24 for cards, 20 for hero media, 16 for media and menus, 12 for small media and inputs, 6 and 4 for covers, 4 for the focus ring.
2. The same component always has the same radius.
3. Nested corners stay parallel: the inner radius equals the outer radius minus the padding between them.

Small things that make a screen feel finished:
1. Real content everywhere: real names, real times like "9:41" and "Mon", real book titles. No placeholder text left behind.
2. Every interactive thing has its hover, focus and pressed states.
3. Every button goes somewhere.
4. Long names and titles cut off neatly with an ellipsis, never overflowing or breaking the layout.
5. The same capitalisation and the same words for the same thing everywhere.
6. Edges line up across the whole screen, with nothing a pixel off.
7. Small honest details: a live dot, a copied confirmation, a meta line like "Product · Type · Concept · 2026".
8. Empty space looks chosen, not left over.

Why: these are the details nobody notices when they are right, and everybody notices when they are wrong. They are the difference between a screen that is built and a screen that is finished.
When it may bend: a signature moment can break the radius or image rules for effect, like a cover shown huge and tilted, as long as it is the one moment on the screen.

**Decisions on the answer 9 differences (5 November 2026)**

1. "Icon stroke becomes 1.5px at every size."
2. "Arrows are filled, including the send arrow."
3. "Covers keep the real 2 by 3 shape, so the small cover is 20 by 30."
4. "Small covers stay plain. Medium and large covers show the title when there is no image."
5. "List row hover and selected backgrounds keep 12px. Add it as its own radius token for list rows, separate from the 28 used for big portfolio rows."

Built as asked, with two calls to confirm: a full title does not fit a 48px medium cover without breaking words, so the medium cover shows the title's initials (answer 9 allows "title or initials"); and the large cover is 96px wide instead of 72px so a title fits in whole words.

### Hygiene

**10. States: what must every screen cover beyond the happy path (empty, loading, error, long content, one item versus a hundred, offline)?**

The happy path is only one state. A screen is not done until every state looks designed, not left over.

Every screen covers:
1. Empty. First use, no results from a search or filter, and everything cleared are three different empties. Each says what is happening in plain words and offers one next step. Never a blank area, never a sad illustration with no action.
2. Loading. Placeholders in the shape of the real layout, so nothing jumps when content arrives. Show nothing for quick loads under about 300ms. A spinner only inside a button that was pressed.
3. Error. Say what happened and what to do next, keep whatever the user typed, and offer a retry. Errors sit right next to the thing that failed. Never blame the user, and red is used only for errors.
4. Partial. Some things loaded and some failed. Show what worked and mark only what failed.
5. Counts. Design for zero, one, a few, a hundred and ten thousand. Plurals read right: "1 book", "34 of 50". Big numbers shorten, like "1.2k" or "99+".
6. Long content. Long names and titles truncate neatly, long messages wrap, and nothing breaks the layout.
7. Offline and slow. Show the last saved content with its time, like "Updated 9:41". Things the user sends wait in a queue and show sending, sent or failed.
8. Feedback. Every action confirms quietly that it worked, and disabled things say why they are disabled.
9. Everywhere. Both themes, the full scroll on phones, and Reduce motion.

For messaging, that means zero unread versus forty, a message stuck sending, and a channel with no messages yet. For a reading profile, it means no books this year, a challenge not set yet, and a profile with no reviews.
Why: the happy path is where a screen spends the least time. Real people see the empty, slow and broken moments, and that is where trust is won or lost.
When it may bend: none. Every state is designed, even when it is simple.

**Cover decisions (5 November 2026)**

a. "Medium covers stay plain, no initials. Initials mean a person in my system, because avatars use them. In lists the title already sits next to the cover. Only large covers show the title."
b. "Large cover at 96 by 144 is approved."
c. "Dense rows stay 32px. Make the small cover 16 by 24, still 2 by 3."
