# Extending the system

The system was built from a portfolio. A chat app or a reading profile needs things the portfolio never had. This is how to build them so they still look like Vishal's work.

## What holds and what bends

Vishal's words: "When something does not exist yet, I keep the parts that make it look like mine fixed, and let the structure bend around them."

| Holds, always | Bends |
| --- | --- |
| One family, Bricolage. Heavy and narrow only at 40px and above | Density: row height, gaps inside a component, how much fits |
| A neutral page, one product colour per screen | Layout: columns, panels, what sits where |
| Edges from hairlines. A shadow only means something floats | How components combine |
| Radius from the set, pills fully round, no hover lift | Sizes, as long as they come from the scale |
| Tokens only, the same motion timing and easing, contrast that passes, both themes | The size of the one heavy moment on a dense screen |

Never invent a new colour, a new font, a new shadow style or a radius outside the set.

## The order to build in

1. Try an existing component.
2. Combine existing components.
3. If something new is needed, find its closest relative in the system and follow that relative's logic. A chat message follows the List row, not a speech bubble from another app.
4. Build it only from tokens. If a value is missing, take the nearest step of the scale.
5. Mark it as an extension in a comment, with one line on why it was needed.
6. Check it in both themes, in its states, and next to the existing components. If it looks foreign, it is not done.

If something cannot be built without breaking a rule that holds, do not quietly break it. Write it down under "Where it breaks" in the README.

## Worked examples

These apply Vishal's rules to things the portfolio never had. Where an example sets a detail his answers do not cover, like grouping messages sent within five minutes, it follows the convention people already know, because conventions win over his look (trade off 4).

### 1. A dense chat thread

Relative: the dense List row and Avatar. No bubbles.

```jsx
<List density="dense" divided={false} className="thread">
  <List.Item leading={<Avatar name="Maya Rao" size="sm" />}
             title="Maya Rao" meta={<time dateTime="2026-11-05T09:41">9:41</time>}>
    <p className="message">Pushed the onboarding copy. Can someone check the empty state?</p>
  </List.Item>
</List>
```

```css
/* EXTENSION: chat message. A dense List row where the body wraps under the name. */
.thread .vd-list__main { flex-direction: column; align-items: flex-start; gap: var(--space-1); }
.thread .message { margin: 0; max-width: var(--measure-max); font-size: var(--type-small-size); line-height: var(--type-body-lh); white-space: normal; }
.thread time { font-variant-numeric: tabular-nums; color: var(--color-muted); }
```

Rules: consecutive messages from one person within five minutes drop the avatar and name and keep the 32px rhythm. Group days with an `eyebrow` divider like "TODAY". Long messages wrap; names truncate to one line. A message sending shows "Sending" in muted text; failed shows "Not sent. Retry" in `--color-error` with a Button `ghost` `sm`.

### 2. A long list of books

Relative: the dense List with Cover.

```jsx
<List density="dense">
  <List.Item leading={<Cover />} title="Piranesi" meta="Susanna Clarke" trailing="4.5" as="a" href="/book/piranesi" />
</List>
```

Rules: 32px rows, the author truncates before the title, ratings are tabular and right aligned. Above about 200 books, show the count and a filter (`Input` with `IconSearch`, `hideLabel`) at the top; the list itself never changes design with length. Sort labels are words people use: "Recently read", "Highest rated".

### 3. A yearly reading challenge

Relative: the `stat` and `stat-sm` roles, and the wash.

```jsx
<section aria-labelledby="challenge">
  <p className="vd-type-eyebrow" id="challenge">2026 reading challenge</p>
  <p className="vd-type-stat-sm">34 of 50</p>
  <p className="vd-type-small">16 to go by December</p>
  <div className="bar" role="progressbar" aria-valuenow={34} aria-valuemin={0} aria-valuemax={50}><span style={{ inlineSize: '68%' }} /></div>
</section>
```

```css
/* EXTENSION: progress bar. A track in surface-2, filled with the accent ink, fully round ends. */
.bar { block-size: var(--space-2); border-radius: var(--radius-pill); background: var(--color-surface-2); overflow: hidden; }
.bar > span { display: block; block-size: 100%; border-radius: inherit; background: var(--accent-ink); }
```

Rules: the number is the one heavy moment on the screen. Use `stat-sm` on a dense screen, `stat` when the challenge leads the page. It may count up once with `--dur-reveal`; under Reduce motion it shows the final number. A progress fill uses `--accent-ink` because a bar is a meaningful graphic and needs 3 to 1 against its track. Bars in a chart are filled with the accent wash (Vishal's answer 5), each with a `line-strong` edge so they hold 3 to 1 in both themes, and labelled in muted text. One big number per screen.

### 4. A star rating

Relative: the icons and Tag.

```jsx
<span aria-label="Rated 4 out of 5" className="rating">
  {[1, 2, 3, 4, 5].map((n) => n <= 4
    ? <IconStar key={n} className="vd-icon vd-icon--filled" fill="currentColor" />
    : <IconStar key={n} />)}
</span>
```

```css
/* EXTENSION: rating. Filled stars in the product colour, outline for the rest. */
.rating { display: inline-flex; gap: var(--space-1); color: var(--accent-text-aa); font-size: var(--type-small-size); }
```

Rules: `text-aa`, never the exact accent, so small stars pass 3 to 1. The number beside it in tabular numerals when space allows ("4.0"). As an input, each star is a 44px target.

### 5. Empty states

Relative: Card `plain`. Three different empties, each in plain words with one next step.

| Empty | Messaging | Reading profile |
| --- | --- | --- |
| First use | "No messages in #launch yet. Say what this channel is for." Button: "Write the first message" | "No books this year yet." Button: "Add what you are reading" |
| No results | "Nothing in #design matches "pricing"." Button: "Search all channels" | "No books on this shelf match "Ishiguro"." Button: "Clear the filter" |
| All done | "You're all caught up." (a good place for the signature moment) | "Challenge complete: 50 of 50." |

Rules: `title` for the line, `small` for the detail, one Button. Never a blank area, never an illustration without an action.

### 6. Loading

Placeholders in the exact shape of the content, so nothing jumps.

```css
/* EXTENSION: placeholder. surface-2 blocks the size of the real text and covers, no shimmer. */
.ph { border-radius: var(--radius-xs); background: var(--color-surface-2); }
```

Show nothing for loads under 300ms (`--dur-base`). A spinner only inside the button that was pressed.

### 7. A command bar (keyboard first)

Relative: Modal, Input and the dense List.

Rules: opens with Cmd K or Ctrl K into a `Modal` `center` with an `Input` (`IconSearch`, label "Jump to or do anything") and a dense `List` of results. Arrow keys move the selected row (the accent wash), Enter runs it, Escape closes it. Every result shows its shortcut in `label` text on the right. The bar is a convenience: everything it does is also reachable by mouse.

### 8. Tabs for shelves

Relative: Nav links and the `.vd-ul` underline.

Rules: tabs are Nav style links in `small` weight 500, the current one with the full underline and `aria-selected`. Counts sit beside the label in muted tabular numerals: "Read 34". Never pill tabs filled with the accent.
