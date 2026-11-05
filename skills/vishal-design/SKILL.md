---
name: vishal-design
description: Design an interface in Vishal Yadav's design system for a product it has never seen. Use it to work out what a screen is built around, write three genuinely different layout directions, build them with his tokens and React components, extend the system without breaking it, and check a finished screen against a pass or fail list. Use it for any screen, layout or prototype that should look like Vishal made it.
---

# Vishal's design skill

This skill turns a product brief into screens that look like Vishal Yadav designed them. His system lives in `design-system/` in this repo: tokens in `design-system/tokens/`, React components in `design-system/src/`. Everything here comes from his portfolio and from his own answers in [`notes-from-vishal.md`](notes-from-vishal.md). When this file and his notes disagree, his notes win.

## The standard

Whoever uses this skill is making work to a standard, so the standard has to be clear. The standard is a professional senior designer who loves the craft and shows it in the work. Every screen should look like that person made it with care: one clear idea, a deliberate hierarchy, real content, even spacing, finished details and, where it fits, one moment people remember. When no rule covers a case, ask one question: would that designer ship this? If not, it is not done.

## How to use this skill

Work in this order, and do not skip ahead:

1. **Start**: find the moment that matters and the user's question (section 1).
2. **Directions**: write three one line ideas before any code (section 2).
3. **Clean**: build with the rules every screen gets (sections 3 and 4).
4. **Wow**: choose one signature moment, or decide on none (section 5).
5. **Check**: run the hygiene checklist in order (section 9).
6. **Hand back**: the directions, the pick, the trade offs and every extension (section 12).

Reference files:

| File | What is in it |
| --- | --- |
| [reference/tokens.md](reference/tokens.md) | Every token with its value and use, and how to set the theme and accent |
| [reference/components.md](reference/components.md) | The components, their props and when to use each |
| [reference/extending.md](reference/extending.md) | How to build what does not exist yet: twelve worked examples (a chat thread, a book list, a challenge, a rating, empty states, loading, a command bar, a multi step form, a dashboard, checkout, settings, onboarding), and one fixed recipe each for tabs, menu, toast, tooltip, table, checkbox, switch, chart and select |
| [reference/examples.md](reference/examples.md) | Good and bad versions of the rules in seven kinds of product, and one example of every rule outside messaging and reading |
| [`notes-from-vishal.md`](notes-from-vishal.md) | His answers, word for word. Read it when a rule here feels unclear |

Set up once per app:

```js
import '../../design-system/src/styles/base.css';
import { Button, List, Avatar } from '../../design-system/src/index.js';
```

Put `data-accent="violet"` (or orange, amber, teal, sky) on the product's root to give it its one colour. Leave it out to stay neutral. Check every screen with `data-theme="light"` and `data-theme="dark"`.

Every rule below has three parts: the rule, why it exists, and when it may be broken. A rule without a reason is not in this file.

## 1. How to start

Build the layout around the moment that matters most and the question the user has in it. On Vishal's site that is "I design for the moment people are unsure." For ixigo it was "Will I travel tonight?" Not every screen is an unsure moment, so first work out what kind of moment it is.

| Step | Why | Break only when |
| --- | --- | --- |
| 1. Name whose screen it is and who else looks at it. Pick the main viewer from what the product is trying to achieve; serve the other one second. | A reading profile has an owner and visitors, and they want different things. One layout cannot lead with both. | Never. A second viewer is served, never ignored. |
| 2. Decide how often it is used and how much is at stake. Rare and high stakes gets one clear answer, big and first. Used fifty times a day gets speed: things stay in place, it is dense, the frequent action is always in reach. | The same screen design fails at the wrong frequency: a hero slows a tool, and a dense tool hides a rare answer. | Never. |
| 3. Write the main question in the user's own words, then put its answer in the most prominent place. Prominence can come from position, weight or contrast, not only size. | The answer is what people came for. If they must hunt, the screen has failed before any detail matters. | A pure reference screen, like settings, can stay even (section 8). |
| 4. List the jobs people repeat here, like writing a message, and keep them within reach. | Repeated jobs are not the main question but are done most often. | Never. |
| 5. Order everything else by what people need next, not by what the product wants to show. Later things move lower. Nothing the brief requires is removed: the question decides order and weight, never whether it is there. | People read top to bottom. Dropping a required part breaks the brief. | Never. |
| 6. Check the main question in its states: nothing new, a little, a lot. | A layout that only works with three items is not a layout. | Never. |

Example questions. Messaging: "What needs me right now?" Reading profile, owner: "What am I reading, and how am I doing?" A checkout: "What will I pay, and is it safe?" A sales dashboard: "How is my store doing this week?" A loan form: "How much longer is this?" A settings page has no single question: it is a reference screen (section 8).

## 2. Three directions

Three directions are genuinely different when each is built around a different idea of what the screen is for, not a different look. The system stays the same in all three: same type, same tokens, same product colour. The difference comes from structure, never from styling.

Each direction changes at least one of: the **main viewer**, the **main question**, **how it is organised** (by time, people, topic or status), **how it is used** (a glance or deep work, mouse or keyboard), or **where the signature moment sits**.

| Rule | Why | Break only when |
| --- | --- | --- |
| Write a one line idea for each direction before building anything. | Code makes weak ideas look finished. A line shows whether there is an idea at all. | Never. |
| Describe each line without mentioning colour, type or style. If you cannot, it is a style variant. | The look is fixed by the system, so a look is not a direction. | Never. |
| If two directions share the same main question and the same organisation, replace one. | They will come out as the same layout. | Never. |
| Every direction must be one you would ship, meet the standard and include everything the brief requires. | No safe one with two fillers: each must be a real answer. | Never. |
| For each, write who it is best for and what it gives up. Then pick the one that best answers the main question for the main viewer, and say what the others do better. | Every real direction makes a trade off. Saying it out loud makes the pick defendable. | Never. |

Not a direction: the same layout in three colours, the same layout with the sidebar moved, a light, dark and dense version of one idea, or a copy of one reference.

Write the three like this before any code:

```
1. <Name>: <one line idea, no colour, type or style words>.
   Viewer: ... Question: "..." Organised by: ... Best for: ... Gives up: ... Signature moment: ...
```

Vishal's own examples. Messaging: **Threads first** (conversations are the unit, channels sit behind them), **Needs you** (one inbox of only what needs a reply or a decision, everything else waits), **Keyboard first** (a command bar drives everything, for people who live in it all day). Reading profile: **My year** (the challenge and progress lead, for the owner), **My taste** (shelves, ratings and reviews lead, for a visitor deciding whether to follow), **My reading story** (the year as a timeline of what was read and when). A sales dashboard, for contrast: **Exceptions first** (only what went wrong today), **The week as a story** (a timeline of the week's orders), **One number per team** (each team's one figure, for a founder at a glance).

## 3. Clean: what every screen gets

These make a screen look like Vishal's. Following them gives a clean screen. Section 5 makes it more than clean.

| Rule | Why | Break only when |
| --- | --- | --- |
| A few big words carry the screen: heavy and narrow Bricolage, set tight, usually the user's own question. Everything read line by line stays light. | It is the first thing that makes a screen his, and it puts the answer where the eye lands. | Never on body text. A dense screen gets the small version once (section 4). |
| The page is neutral: `--color-bg` warm off white, `--color-ink` near black. Colour comes only from the product, through its one `data-accent`, never from Vishal. Pick one of the five accents, or add the product's own brand colour as a new accent pair (section 6). | A neutral page lets every product look like itself, in its own colours (handoff 9.3). Colour everywhere stops meaning anything. | A launch can use one full colour field, if text on it passes contrast and it is the one colour moment. |
| Space shows what belongs together. If a screen feels congested, add space; never shrink things to fit. | Even spacing and clear groups let people understand a screen before reading it. | A dense tool tightens rows, never the gaps between groups (section 7). |
| Edges are 1px lines. A shadow means one thing: this floats. | Lines work in both themes. Shadows break in dark mode and lose meaning if cards have them. | Never on cards, rows, panels or buttons. |
| Tokens only. The same component does the same job everywhere, with the same radius, icon and words. The same action sits in the same place. | Consistency is what makes a product feel trustworthy. | Never. Change a component everywhere, never on one screen. |
| Hover changes colour, press scales to .97, nothing lifts or jumps. | Lift is the look of a template. Colour and press give feedback without movement. | Never. |
| Conventions win: the composer at the bottom of a chat, unread counts on channels, five stars for a rating. The system dresses a convention; it does not replace it. | People already know how these work. Breaking that costs them time. | Never for the sake of looking different. |
| Navigation marks only the active item: the current Nav link or tab is underlined, the others show no line until hovered. | A line under every tab marks nothing. | Never. |
| A command bar is a field near the top of the screen with results below: no heading, no close button, focus in the field, Escape closes it. | It exists for speed; a dialog's chrome slows it and moves focus to the close button. | Never. |
| Real content only: real names, times like "9:41" and "Mon", real book titles. No lorem ipsum, no invented numbers or results. | Fake content hides layout problems and breaks trust. | Never. |
| Copy is short and concrete. No hyphens or em dashes in prose, no filler words, sentence case, "Send" is always "Send". | Vishal's voice is plain and specific. | Never. |
| Counts agree across the whole screen: a headline, a sidebar badge and a list tag that count the same thing show the same number, and all of them drop the moment it is read. Work every count out from the data, never type one. | A count that disagrees with another tells people the screen cannot be trusted. | Never. |
| Both themes are designed, not inverted, and pass every rule. | Vishal's site runs in both, and a colour that passes in light can fail in dark. | Never. |

## 4. Visual finesse

Concrete values. Every value is a token in [reference/tokens.md](reference/tokens.md).

### Type

| Rule | Why | Break only when |
| --- | --- | --- |
| One display moment per screen: `display`, `display-xl` or `stat` (weight 760 to 800, width 75 to 85%, 56px and up). On a dense screen, one `stat-sm` (40px, 760) for a page title or one stat. In an app with several panels it goes in the panel that answers the main question, never one per panel. | Hierarchy comes from the user's question. Two loud things fight. | A launch moment may push the display size further, still one per screen. |
| Below the display moment, at most four text sizes in total on one screen, headings included. Pick them from the roles: 13, 14, 15, 16, 18 and 20px (`label`, `meta`, `small`, `body` on phones, `body`, `title-sm`) and the heading tier 22 to 40px (`title`, `heading`, `heading-lg`). Nothing below 13px. | Too many sizes and nothing reads as a step. | Never more than four. Below 13px only for avatar initials: they are a mark, not reading text, so they may drop to 10px (`--avatar-initials-min`), at weight 600. |
| At most three weights visible: 400 for reading, 500 to 650 for interface text, and the display weight. Buttons and labels never go above 650. Weight 800 only at 56px and up. | Heavy weight on anything read line by line is shouting. | Never. |
| Code, and only code, is set in `--font-mono` at the `small` size, inline on `surface-2` with `radius-code` (4px), blocks on `surface-1` with a `line-strong` edge and `radius-sm`. | People expect code in monospace, and conventions win. It is the system font, so nothing new loads. | Never for anything that is not code. |
| The `eyebrow` (13px, uppercase) may head a group inside a panel, like "Waiting on others". Never set a name in it: channel names, people and titles keep their own case. | A group label helps scanning; uppercase would turn "#launch" into "#LAUNCH", which is not its name. | Never on names. |
| Emphasis comes from weight or position, never colour alone, italics, or underlines that are not links. | Colour alone fails people who cannot see it; underline means link. | Never. |
| Paragraphs run between `--measure-min` (46ch) and `--measure-max` (760px). Never full width text. | Long lines are hard to follow back. | Never. |
| Line height: display .92 to .95, body 1.5, interface text 1.3 to 1.4 (`small`, `meta` and `label` all at 1.4). Tracking: display -.01 to -.025em, `eyebrow` .14em uppercase, body untouched. | Tight display reads as one shape; body needs air. | Never. |
| Tabular numerals for times, counts, prices and ratings; numbers in columns align right. | Digits line up and do not jitter as they change. | Never. |
| Headings never leave one word alone on the last line: use `text-wrap: balance`. | A lone word makes a heading look unfinished. | Never. |
| Real punctuation: curly quotes, a real ellipsis, a non breaking space between a number and its unit, ranges written with "to". | These are the details that read as finished. | Never. |
| Text aligns left. Centre only very short lines. | Ragged centred paragraphs are hard to read. | Never for paragraphs. |
| Names and titles in lists truncate to one line with an ellipsis; message previews to two lines. The answer to the main question never truncates. | Truncation keeps rows even; the answer must always be whole. | Never on the main answer. |

### Space and alignment

| Rule | Why | Break only when |
| --- | --- | --- |
| Every gap comes from the scale: 4, 6, 8, 12, 16, 24, 32, 48, 72, 96, 120, 160 (`--space-1` to `--space-11`). | No random values: rhythm is what makes a screen look intentional. | Never. |
| The gap grows with the level: inside a component, then between components, then between sections. Scrolling pages, like a reading profile: `--section-gap` 160 between sections, `--section-inner` 72 inside; 96 and 48 on phones. App layouts that fill the screen, like messaging, have no sections: their panels and groups use component gaps of 24 to 48 (`--space-5` to `--space-7`). | The size of a gap tells people what belongs together. | The signature moment may get extra space to land. Never less than the scale. |
| Group with space first, a wash second, a 1px hairline third. Never a box around everything; cards are for things you pick up as a whole. | Each step is louder than the last; use the quietest one that works. | Never. |
| A label and its input are 8px apart; two fields are 24px apart. | One decision is one group. | Never. |
| Rows repeat: 48px comfortable (`--row-h`), 32px dense (`--row-h-dense`). | Dense screens keep rhythm through repetition. | Two line rows grow to their content. |
| Content is capped at 1376px with a 32px gutter (16px on phones); panels sit 16px in from the screen edge (8px on phones). | The site's frame, and lines stay readable on wide screens. | Never. |
| Optical over measured: icons centre on their text, not their box; arrows and play triangles shift slightly toward their point; round things get a little more size than square ones; text inside a pill is nudged a pixel if descenders make it look low. | What looks right beats what measures right. | Never. |
| Everything aligns to the text's left edge, not the icon's. Touch targets are 44px with at least 8px between them. | Lines of text are what the eye follows; taps must never hit the wrong thing. | Never. |

### Colour and depth

| Rule | Why | Break only when |
| --- | --- | --- |
| One product colour per screen, used in few places: one wash for a group that should stand out, a selected state, headings and large accent text, the signature moment. | If colour is everywhere, it stops meaning anything. | A launch may use one full colour field. |
| Small accent text uses `--accent-text-aa`. The exact `--accent-text` is for headings and large text only. | Several exact accents fail at small sizes; orange is 2.4 to 1 on its wash. | Never. |
| Status colours carry meaning only: `--color-live` for live or available, `--color-error` for errors. | Decorative green or red teaches people to ignore status. | Never. |
| Colour never carries meaning alone: a selected row also gets the wash plus weight or a mark. | It must work for people who cannot see the colour. | Never. |
| Pastels stay bright. Never grey them down. | Muddy colour reads as tired. | Never. |
| Depth goes page, then surface, then wash. Lines: `--color-line` for dividers, `--color-line-strong` for edges of cards, surfaces and covers, `--elev-2` ring on images. Shadows (`--elev-3`, `--elev-4`) only on menus, popovers, dialogs, toasts and hover previews. Modals and sheets sit on `--color-scrim`. | Lines say where things are in both themes; shadows say what floats. | Never. |
| Dark is designed: page `#0C0C0E` not black, text `#F2F1EC` not white, things that rise get lighter, washes and accent text use their own dark values. No dark on dark: every card and panel is clearly separated by a surface step and a `line-strong` edge. | Shadows barely show on a dark page, and pure black and white strain the eyes. | Never. |

### Icons, images and finish

| Rule | Why | Break only when |
| --- | --- | --- |
| One icon family: outline, 1.5px stroke, rounded ends. Filled only for active states and arrows. Sizes snap to 16, 20 or 24px with the text. Icons take the text colour beside them. | It matches the soft shapes of Bricolage, and mixed families look assembled. | Never. |
| An icon must stand for something; never decoration. An icon only button has an `aria-label` and a 44px target. | Decorative icons add noise and nothing for screen readers. | Never. |
| Images and covers are shown whole, uncropped, at a size you can read. Covers keep the real 2 by 3 shape. Photos crop around the subject, eyes in the upper third. | A cropped screen or cut title is the opposite of showing the work. | A signature moment may show a cover huge and tilted, once. |
| A missing image is never an empty grey box: a neutral surface with the title (large covers) or initials (people). | An empty box looks broken. | Small and medium covers stay plain, because the title sits beside them in a list. |
| Radius only from the set: 999 pills, 50% round, 32 big panels, 28 big rows, 24 cards, 20 hero media, 16 media and menus, 12 small media, inputs and list rows, 6 and 4 covers, 4 focus ring. Same component, same radius. Nested corners stay parallel (inner = outer minus padding). | Mixed radii look assembled. | A signature moment may break it, once. |
| Finished means: every interactive thing has hover, focus and pressed states; every button goes somewhere; the same words and capitalisation everywhere; edges line up; small honest details like a live dot or a "Copied" confirmation; empty space looks chosen. | These are noticed only when wrong, and they separate built from finished. | Never. |

## 5. Wow: one signature moment

A signature moment is where the screen's main idea stops being read and starts being felt. On Vishal's site, "unsure." jitters in many pencil colours because the word itself is about uncertainty: the form carries the meaning. Other examples there: the headline that rises word by word, results like 60% that count up so they feel earned, and the page ending on one dark closing panel.

| Rule | Why | Break only when |
| --- | --- | --- |
| At most one per screen. Put it on the answer to the main question, or on the moment of change or achievement, often at the end of a flow. Never on something secondary. | People remember one moment per screen, and they remember how things end. | A launch may have one per section, each passing the remove test. |
| Size it from stakes and frequency: rare and high stakes can be a whole hero; used now and then, one component like a stat; used fifty times a day, small and under a second, never slowing anyone. | A big moment in a frequent tool becomes an obstacle. | Never. |
| Build it only from the system: heavy narrow type, numbers, the product's colour and motion. It must still work as a still image under Reduce motion. | A new style breaks the system; a moment that needs motion is decoration. | Never. |
| Errors, settings, forms people want to finish and speed tasks get none. If nothing is worth remembering, choose none. If two compete, cut one. | A moment that does not connect to the idea is decoration. | Never. |

**The remove test**: remove it. If the screen loses meaning, it was a signature moment. If it only loses decoration, it was not.

Messaging: the last thing needing you is cleared and the screen settles into "You're all caught up." Reading profile: "34 of 50" counts up once to where you are. Checkout: "Paid" with the order number, at the end of the flow. Onboarding: the user's own first week, built from their answers. A settings page or an error: none.

### Motion with meaning

Every motion needs a job: **explain** (where something came from or went, what changed), **give feedback** (a press scales to .97, a sent message shows sent), **guide attention** to one new thing once, **add character** that fits the product and stays small, or **land the signature moment**. Any motion that fits the product and improves it is welcome. The site's motions are examples, not a set to copy.

| Rule | Why | Break only when |
| --- | --- | --- |
| A motion with none of the five jobs does not go in. Cheap motion never goes in: cursor followers, rolling button labels, parallax. | Motion without a job feels cheap and slows people down. | Never. |
| What may move: things that change, things entering or leaving, what the user just touched, the signature moment. What never moves: text being read, the settled main answer, the layout under a finger, navigation and controls, anything that makes the user wait. | Movement in the wrong place costs attention or causes mis taps. | Never. |
| Timing from tokens: press 120ms, hover 200ms, small changes 300ms, reveals rise 20px over 600ms once, colour and theme 900ms, stagger 45ms, spring only for expressive moments. Tools used all day: nothing over 200ms. Leaving is faster than arriving; one thing moves at a time; loops pause off screen; scroll motion follows the scroll. | Consistent timing is part of the look. | A launch or hero moment can be longer and more expressive if it never blocks and passes the remove test. |
| Reduce motion always wins: movement becomes a quick fade or instant change, and the meaning stays. | The product has to work for everyone. | Never. |

## 6. Extending the system

When something does not exist yet, keep fixed what makes it look like Vishal's (one family, a neutral page with one product colour, hairline edges, radius from the set, tokens only, both themes, the standard) and let the structure bend (density, layout, how components combine, sizes from the scale). Build in this order: an existing component, then a combination, then something new that follows its closest relative's logic, built only from tokens and marked as an extension. Never invent a colour for decoration, and never a new font, shadow style or radius.

A product's own brand colour is allowed. Add it as a new accent pair built exactly like the five (wash, muted, ink, text, `text-aa`, and dark values for each), passing contrast, marked as an extension. Recipe: [reference/tokens.md](reference/tokens.md#adding-a-brand-accent).

Why: the parts that hold are what make it his; everything else is a means to serve the product. Break only by writing it down: if something truly cannot be built without breaking a fixed part, record it as a place where the system breaks.

Screens that fill the window, like messaging, follow the app shell recipe: fixed panel widths, panels that scroll on their own, one panel at a time on phones. Worked examples, from a chat thread with no bubbles to a reading challenge and empty states, plus one fixed recipe each for tabs, menu, toast, tooltip, table, checkbox, switch and select, so every product builds them the same way: [reference/extending.md](reference/extending.md).

## 7. Trade offs

When two rules fight, the higher one wins. The order does not bend; if a case seems to need it, write down why and treat it as a place where the system needs to grow.

1. **Access and honesty**: contrast, keyboard, touch targets, real content, nothing invented. Never traded away.
2. **The user's task**: the main question answered first, and speed in tools used all day.
3. **Clarity**: a hierarchy read in two seconds, text you can actually read.
4. **Consistency** with the system.
5. **Character** and the signature moment.
6. **Taste details** only Vishal would notice.

| Conflict | What wins | How |
| --- | --- | --- |
| Density against space | How often it is used decides | In a tool used all day, density wins inside lists, but groups keep their space and nothing drops below the scale or the touch target. On rare, high stakes screens, space wins. |
| A striking moment against speed | Speed, in frequent tools | The moment shrinks to small and quick, or moves to after the action, and never blocks. A first visit or launch gets the big version. |
| Product colour against legibility | Legibility | The colour moves to a wash or a large heading; small text uses `text-aa`. A colour is darkened, never pushed below contrast. |
| Vishal's look against what people know | Conventions | The system dresses the convention: composer at the bottom, unread counts on channels. |
| Consistency against a better idea on one screen | Consistency | If the idea really is better, change the component everywhere. |
| The brief against the idea | The brief | Everything the brief requires appears; the idea decides order and weight. |
| Motion against Reduce motion | Reduce motion | Always. |

When it is still unclear, ask: which choice would the main viewer thank me for a week later? Then write the trade off into that layout's one line description, so the reason is visible.

Why: every real design is a set of trade offs. Knowing what wins, and saying it, makes a design defendable instead of a guess.

## 8. Correct versus good

A correct screen follows every rule but makes no decision. Vishal rejected his own early B2 direction as "bland" and a "wireframe": clean font, one accent, even spacing, nothing wrong, nothing chosen.

Signs a screen is correct but bland:

1. Everything is equally loud: same weights, same sizes, nothing leads.
2. Even spacing everywhere, so there is no rhythm.
3. Every section has the same layout, usually a grid of cards.
4. Headings are labels like "Overview", "Dashboard" or "Recent activity" instead of the user's question.
5. Generic content that could belong to any product.
6. Decoration added to make up for it: gradients, shadows, extra icons.

**The one move: commit.** Decide the one thing that matters most on the screen, make it unmistakably stronger (bigger, heavier, better written) and make everything else quieter. Adding decoration never fixes a bland screen; choosing and contrasting does.

**The test**: squint. If nothing stands out, it is bland. Then describe the screen in one sentence. If another product could use the same sentence, it is not good yet.

Why: people trust a screen that knows what matters. Break only for a pure reference screen, like settings or a list of everything, which can stay even because its job is to be scanned. Examples in both products: [reference/examples.md](reference/examples.md), rules 1 and 2.

## 9. Hygiene checklist

Run it in this order on every finished screen and mark each line pass or fail. Biggest problems first: fixing details on a screen with the wrong idea is wasted work. Never skip a step; on a small screen some take seconds. A screen with any fail is not done.

**1. The question**
- [ ] Squinting, the first thing seen is the answer to the main viewer's question.

**2. The idea**
- [ ] The screen's idea fits in one line.
- [ ] With another product's logo swapped in, the screen no longer works.

**3. Hierarchy**
- [ ] One display moment at most; on a dense screen, one `stat-sm` at most.
- [ ] At most four text sizes in total below the display moment, headings included, and at most three weights; nothing under 13px except avatar initials (10px at least, weight 600).
- [ ] Weight 800 only at 56px and up; no interface text above 650.
- [ ] The display style (narrow width, display weight) only at 40px and up. Anything smaller, a section heading, a block title, a month, a person's name in a panel, a number in a sidebar, uses the normal heading: full width, weight 700.
- [ ] Paragraphs between 46ch and 760px wide.

**4. Space and alignment**
- [ ] Every gap is a token from the scale.
- [ ] Groups read from space alone before any box or line.
- [ ] Edges line up; icons and text are optically centred.

**5. Colour and depth**
- [ ] The page is neutral; one product colour at most, set with `data-accent`.
- [ ] Small accent text uses `text-aa`.
- [ ] Shadows only on things that float; no hover lift.
- [ ] One primary button per view. A composer's Send counts.

**6. Content**
- [ ] Real names, times and titles; no lorem ipsum; no invented numbers.
- [ ] Curly quotes and apostrophes everywhere, sample data included.
- [ ] No hyphens or em dashes in prose; sentence case; the same words for the same thing.

**7. States**
- [ ] Empty: first use, no results and all cleared are each designed with one next step.
- [ ] Loading uses placeholders in the real shape; nothing for under 300ms; a spinner only in a pressed button.
- [ ] Errors say what happened and what to do, sit next to what failed, keep what was typed, offer a retry.
- [ ] Partial failure shows what worked and marks only what failed.
- [ ] Zero, one, a few, a hundred and ten thousand items all hold; plurals read right ("1 book"); big numbers shorten ("1.2k", "99+").
- [ ] Long names truncate, long messages wrap, nothing breaks the layout.
- [ ] Offline shows the last saved content with its time ("Updated 9:41"); sent items show sending, sent or failed.
- [ ] Every action confirms quietly; disabled things say why.
- [ ] Every count agrees with every other count of the same thing, before and after reading.

**8. Everywhere**
- [ ] Light and dark both pass, with no dark on dark.
- [ ] The full scroll works on a 390px phone with no sideways scroll.
- [ ] Reduce motion on: nothing breaks, the meaning stays.

**9. Access**
- [ ] Text passes 4.5 to 1; large text, icons and input borders pass 3 to 1; colour never carries meaning alone.
- [ ] Everything works by keyboard in a logical order, with the 2px focus ring at a 3px offset.
- [ ] Dialogs keep focus inside, close on Escape and return focus.
- [ ] Touch targets 44px with 8px between; hover only on devices with a mouse.
- [ ] Inputs have visible labels; icon buttons and images have text for screen readers; headings follow a real order.
- [ ] Text at 200% still holds; zoom is not blocked; nothing flashes more than three times a second.

**10. Motion**
- [ ] Every motion has one of the five jobs, fits the product, stays out of the way and turns off cleanly.

**11. The signature moment**
- [ ] There is one, it passes the remove test, or there is a deliberate decision to have none.

**12. The standard**
- [ ] Looked at fresh: would a senior designer who loves the craft ship this?

**Tokens only**
- [ ] `npm run check` in `design-system/` passes for any new CSS.

## 10. Never do

These have no exceptions.

| Never | Why |
| --- | --- |
| Lift or move a button or card on hover | Hover is colour, press scales down slightly. Lift is a template's look. |
| Put dark on dark | A dark card on a dark page has to be clearly separated, or it is wrong. |
| Make something that looks like a UI kit assembled by someone instead of designed by a senior designer | If it could be any product's screen with the logo swapped, it is not done. |
| Grey down colour | Pastels stay bright, never muddy. |
| Crop or shrink screens and thumbnails until they cannot be read | The work is the content. |
| Make numbers glow or colour them for effect | Vishal said "Eww" to that and meant it. |
| Use heavy weight on anything read line by line | Heavy is for a few big words only. |
| Show a fake prototype made of images | If it says prototype, it is real and clickable. |
| Let controls cover the content | The content is what people came for. |
| Hide content on desktop | Phones can trim long paragraphs; desktop shows everything. |
| Reuse the same few motions on every design, or add cheap motion | Each product gets the motion that fits it. Cursor followers, rolling labels and parallax were removed from his own site. |
| Use lorem ipsum, invented numbers or invented results | Concept work is called concept work. |
| Invent a colour for decoration, or a new font, shadow style or radius | The system grows by extension, not by exception. A product's brand colour is not decoration: it becomes a new accent pair. The system monospace for code is the one font exception. |
| Use a placeholder as the label, or block zoom | People must always know what a field is and be able to read it. |

## 11. Where it breaks

Honest limits, so a new product knows where to be careful. Every token that is not from the site is listed in `design-system/tokens/EXTENSIONS.md`.

1. **One accent per screen** limits charts to three series: steps of the one accent plus ink and muted, labelled directly on the chart ([recipe](reference/extending.md#chart)). Beyond three series, or telling many people apart by colour, is outside the system: use labels, position and names.
2. **Status colours** are only live green and error red. There is no warning or info colour.
3. **One family**: there is no serif or italic voice. Code is the one exception: it uses the system monospace (`--font-mono`), for code only, because conventions win in a messaging app.
4. **Heavy narrow type** is a display voice. On dense screens it shrinks to one `stat-sm`, so a dense product has little room for its signature.
5. **The spacing scale, surfaces, inputs, modals, dense lists, covers, avatars in groups, the sidebar list and every state** are extensions: the portfolio never needed them. They follow its logic but were not tested by Vishal over time.
6. **Dark washes** sit only 1.24 to 1.41 to 1 from the page and lean on `line-strong` edges to stay separate.
7. **The exact orange** (`#F07322`) is 2.8 to 1 on the light page: display size only.
8. **The site's motion** (GSAP scroll scrub, the "unsure." jitter) is not part of the components; only timing tokens are.

## 12. What to hand back

When the work is done, hand back these five things with the screens, in this order:

1. **The three directions**, each with its one line idea, written as in section 2: viewer, question, organised by, best for, gives up, signature moment.
2. **The pick and its reason**: which direction best answers the main question for the main viewer, and what the other two do better.
3. **The trade offs made**: every place two rules fought, which one won (section 7) and why, in one line each.
4. **Every extension added**: each new token, accent pair, recipe use or component built for this product, with one line on why it was needed. Include anything that could not be built without breaking a fixed rule, as a place where the system breaks.
5. **The checklist result**: section 9, with every line marked pass, or fail with what is left to fix.

Why: the reasons behind a design are what make it defendable, and a list of extensions shows where the system grew. A screen without them is a guess. Break: never. A hand back without these five is not finished.
