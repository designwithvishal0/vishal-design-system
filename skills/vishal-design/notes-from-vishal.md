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

**11. Consistency and accessibility: what rules do you never break?**

These rules never break.

Consistency:
1. Tokens only. No value is typed by hand.
2. The same component does the same job everywhere, with the same radius, the same icon and the same words. "Send" is always "Send".
3. The same action sits in the same place on every screen.

Accessibility:
1. Text passes 4.5 to 1. Large text, icons and input borders pass 3 to 1.
2. Colour never carries meaning alone.
3. Everything works with a keyboard, in a logical order. Focus is always visible: a 2px ring with a 3px offset.
4. Dialogs and sheets keep focus inside, close on Escape, and return focus to what opened them.
5. Touch targets are at least 44px, with at least 8px between them.
6. Hover effects only on devices with a mouse, so touch never gets stuck in a hover state.
7. Inputs have visible labels. A placeholder is never the label.
8. Icon only buttons and images have text for screen readers.
9. Headings follow a real order, so the page makes sense when read aloud.
10. Text can grow to 200% and the layout still holds. Zoom is never blocked.
11. Reduce motion is respected everywhere, and nothing flashes more than three times a second.
12. Both themes pass every rule above.

Why: consistency is what makes a product feel trustworthy, and accessibility means the product works for everyone, not most people.
When it may bend: never.

**12. What do you check, in order, before you call a screen done?**

I check from the biggest question to the smallest detail. Fixing details on a screen with the wrong idea is wasted work, so the order matters.

1. The question. Is the main viewer's question answered first, in the most prominent place? Squint at the screen: the first thing you see should be that answer.
2. The idea. Can I say the screen's idea in one line? Swap the logo for another product's: if it still works, the screen has no idea of its own yet.
3. Hierarchy. One display moment at most, no more than four text sizes and three weights below it, heavy type only at 40px and above, paragraphs within their line length.
4. Space and alignment. Every gap from the scale, groups clear from space alone, edges lined up, icons and text optically centred, nothing a pixel off.
5. Colour and depth. Neutral page, one product colour, nothing greyed down, shadows only on things that float, no hover lift.
6. Content. Real names, times and titles. No lorem ipsum, no invented numbers. Copy is short and concrete, with no hyphens or em dashes in prose.
7. States. Empty, loading, error, partial, zero to ten thousand items, long content, offline.
8. Everywhere. Both themes with no dark on dark, the full scroll on a phone, and Reduce motion on.
9. Access. Contrast, keyboard and focus, touch targets, visible labels, text at 200%.
10. Motion. Does each motion fit this product and help the user? Nothing cheap, nothing in the way, and it all turns off cleanly.
11. The signature moment. One moment people remember, where it fits, or a deliberate decision to have none.
12. The standard. Look at it fresh, as if seeing it for the first time. Would a senior designer who loves the craft ship this? If not, it is not done.

Why: a screen fails people in this order. A missing answer loses them in seconds, a weak hierarchy in a minute, broken states over days. Checking in the same order fixes the biggest problems first.
When it may bend: never skip a step. On a small screen some steps take seconds, but every step is checked.

### Wow

**13. Signature moment: what is the one moment on a screen that people remember, and how do you decide where it goes, how big it is, and when a screen should have none?**

A signature moment is the point where the screen's main idea stops being read and starts being felt. It is not decoration added on top. On my site, "unsure." jitters and comes in many pencil colours because the word itself is about uncertainty. The form carries the meaning.

Examples from my portfolio:
1. The rising headline: my idea arrives word by word, the way a thought forms.
2. The "unsure." letters: the one emotional word gets the one expressive treatment.
3. The counting numbers: results like 60% count up, so they feel earned instead of stated.
4. The dark closing panel: the page ends on one strong moment, because people remember how something ends.

Where it goes:
1. On the answer to the main question, or on the moment of change or achievement.
2. Often at the end of a flow, because the end is what people remember.
3. Never on something secondary. If it does not connect to the screen's main idea, it is in the wrong place.

How big it is, from the stakes and how often people see it:
1. Rare and high stakes, like a first visit or a launch: it can be big, a whole hero.
2. Used now and then: a component, like one stat or one headline.
3. Used fifty times a day, like messaging: small and fast, under a second, and it never slows the user down.

How it is built:
1. Only from the system's own materials: the heavy narrow type, numbers, the product's colour and motion. No new styles.
2. It must still work as a still image. Motion makes it stronger, but under Reduce motion it is still the most memorable thing on the screen.

When a screen gets none:
1. Errors, settings, forms people want to finish, and anything where the job is speed.
2. When nothing on the screen is worth remembering, the honest answer is no moment.
3. When two moments compete, keep one and cut the other.

The test: remove it. If the screen loses meaning, it was a real signature moment. If it only loses decoration, it was not.

For messaging, it could be the moment the last thing needing you is cleared, and the screen settles into "You're all caught up." For a reading profile, it could be the yearly challenge, "34 of 50", where the number counts up to where you are.

Why: people do not remember every screen, they remember one moment. Choosing that moment on purpose is what separates a designed product from a tidy one.
When it may bend: a launch can have one moment per section instead of one per screen, but each one still passes the remove test.

**14. Motion with meaning: when does motion explain something to the user, and when is it decoration? What is allowed to move, and what never moves?**

Every motion needs a job. The job decides how it moves.

The jobs motion can do:
1. Explain. Show where something came from or where it went, what changed, and what caused it. A sent message moves up from the composer into the thread.
2. Give feedback. Confirm that a touch, click or action worked: a press scales to .97, a sent message shows sent.
3. Guide attention. Point the eye to one new thing, once.
4. Add character. Small crafted motion that makes the product feel alive, like the live dot or the "unsure." letters. This is welcome when it fits the product, stays small and never gets in the way.
5. Land the signature moment.
If a motion does none of these, it does not go in.

What is allowed to move:
1. Things that change: a state, a number, a position.
2. Things that enter or leave the screen.
3. What the user just touched.
4. The signature moment.

What never moves:
1. Text while someone is reading it.
2. The main answer once it has settled.
3. The layout under the user's finger. Nothing jumps or shifts as content loads.
4. Navigation and controls. They stay in the same place.
5. Anything that makes the user wait to act.

Timing, from my tokens:
1. Press 120ms, hover 200ms, small changes 300ms, colour and theme 900ms.
2. Reveals rise 20px over about 600ms, once, not every visit.
3. Scroll motion follows the scroll itself, never a timed jump.
4. Spring only for expressive moments.
5. In tools used all day, nothing over about 200ms.
6. Leaving is faster than arriving. One thing moves at a time, and lists stagger by about 45ms.
7. Loops pause when off screen.

Reduce motion: movement becomes a quick fade or an instant change, but the meaning stays. A sent message still shows sent.

For messaging: switching channels swaps the thread quickly while the sidebar stays still, and a new message arrives from the bottom. For a reading profile: the challenge number counts up to 34 of 50 once, and a rating fills when you tap it.

Why: motion is how a screen explains change. Used with a job, it makes a product feel clear and alive. Used without one, it feels cheap and slows people down.
When it may bend: a launch or hero moment can take longer and be more expressive, as long as it never blocks the user and passes the signature moment's remove test.

### Judgement

**15. Trade offs: when two of your rules conflict (density against space, a striking moment against speed, the product's colour against legibility), what wins and why?**

*(Given in two parts, recorded together as one answer.)*

When two rules fight, the higher one in this order wins:
1. Access and honesty. Contrast, keyboard, touch targets, real content, nothing invented. This is never traded away.
2. The user's task. The main question answered first, and speed in tools people use all day.
3. Clarity. A hierarchy you read in two seconds, and text you can actually read.
4. Consistency with the system.
5. Character and the signature moment.
6. Taste details that only I would notice.

The conflicts that come up most:
1. Density against space. How often people use it decides. In a tool used all day, density wins inside lists, but groups are still separated by space, and nothing goes below the scale or the touch target size. On rare, high stakes screens, space wins.
2. A striking moment against speed. Speed wins in frequent tools. The moment shrinks to something small and quick, or moves to after the action, and it never blocks. A first visit or a launch can have the big version.
3. The product's colour against legibility. Legibility wins. The colour moves to a wash or a large heading, and small text uses the darker text shade. A colour is darkened, never pushed below contrast.
4. My look against what people already know. Conventions win, like the composer at the bottom of a chat or unread counts on channels. My system dresses the convention, it does not replace it.
5. Consistency against a better idea on one screen. Consistency wins. If the new idea really is better, change the component everywhere, never on one screen only.
6. The brief against my idea. Everything the brief requires appears. My idea decides its order and weight.
7. Motion against Reduce motion. Reduce motion always wins.

When it is still unclear, I ask: which choice would the main viewer thank me for a week later? Then I write the trade off down in that layout's description, so the reason is visible.

Why: every real design is a set of trade offs. Knowing what wins, and saying so out loud, is what makes a design defendable instead of a guess.
When it may bend: the order does not bend. If a case seems to need it, write down why and treat it as a place where the system needs to grow.

**16. Correct versus good: what makes a screen correct but bland, like the B2 direction I rejected as "bland" and "wireframe", and what is the one move that takes it from correct to good?**

A correct screen follows every rule but makes no decision. That is why B2 felt "bland" and like a "wireframe": clean font, one accent, even spacing, nothing wrong, and nothing chosen.

Signs a screen is correct but bland:
1. Everything is equally loud. Same weights, same sizes, nothing leads.
2. Even spacing everywhere, so there is no rhythm.
3. Every section has the same layout, usually a grid of cards.
4. Headings are labels like "Overview", "Dashboard" or "Recent activity", instead of the user's question.
5. Generic content that could belong to any product.
6. Decoration added to make up for it: gradients, shadows, extra icons.

The one move: commit. Decide the one thing that matters most on this screen, make it unmistakably stronger, and make everything else quieter. Good design is contrast in service of one idea. Bigger, heavier, better written for the one thing, calmer for the rest.

Adding decoration never fixes a bland screen. Choosing and contrasting does.

Examples:
1. Messaging, bland: three columns copied from a known chat app, every channel at the same weight, a sidebar titled "Channels". Good: the three things that need a reply lead the screen under "What needs you right now?", and everything else sits quietly below.
2. Reading profile, bland: a row of equal stat cards, "Books read 34", "Pages 9,820", "Average rating 4.2", and shelves as equal rows. Good: "34 of 50" set big, heavy and narrow, with "16 to go by December" under it and the current book's cover beside it. The rest stays calm.

The test: squint at the screen. If nothing stands out, it is bland. Then describe the screen in one sentence. If another product could use the same sentence, it is not good yet.

Why: people trust a screen that knows what matters. A screen that treats everything the same leaves the user to do the designer's job.
When it may bend: a pure reference screen, like settings or a list of everything, can stay even and calm, because its job is to be scanned, not to say one thing.

*The interview is complete: sixteen of sixteen answered, 5 November 2026.*
