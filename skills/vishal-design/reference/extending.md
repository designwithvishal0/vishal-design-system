# Extending the system

The system was built from a portfolio. A chat app or a reading profile needs things the portfolio never had. This is how to build them so they still look like Vishal's work.

## What holds and what bends

Vishal's words: "When something does not exist yet, I keep the parts that make it look like mine fixed, and let the structure bend around them."

| Holds, always | Bends |
| --- | --- |
| One family, Bricolage (code alone uses the system monospace). Heavy and narrow only at 40px and above | Density: row height, gaps inside a component, how much fits |
| A neutral page, one product colour per screen | Layout: columns, panels, what sits where |
| Edges from hairlines. A shadow only means something floats | How components combine |
| Radius from the set, pills fully round, no hover lift | Sizes, as long as they come from the scale |
| Tokens only, the same motion timing and easing, contrast that passes, both themes | The size of the one heavy moment on a dense screen |

Never invent a colour for decoration, a new font, a new shadow style or a radius outside the set. A product's own brand colour is allowed as a new accent pair: see [tokens.md](tokens.md#adding-a-brand-accent).

## The order to build in

1. Try an existing component.
2. Combine existing components.
3. If something new is needed, find its closest relative in the system and follow that relative's logic. A chat message follows the List row, not a speech bubble from another app.
4. Build it only from tokens. If a value is missing, take the nearest step of the scale.
5. Mark it as an extension in a comment, with one line on why it was needed.
6. Check it in both themes, in its states, and next to the existing components. If it looks foreign, it is not done.

If something cannot be built without breaking a rule that holds, do not quietly break it. Write it down under "Where it breaks" in the README.

## App shells: screens that fill the window

Messaging, inboxes and tools fill the window instead of scrolling as a page. Build every one the same way.

| Rule | Why | Break only when |
| --- | --- | --- |
| The page never scrolls. The top bar stays, and each panel scrolls on its own. | A tool used all day keeps everything in place, so nothing moves under the hand. | On phones, where one panel shows at a time and the page may scroll. |
| Panels are columns: a rail (`--panel-rail`, 224px), a list (`--panel-list`, 384px) and the main pane (the rest). Use only the panels the idea needs. | Fixed widths keep the same things in the same place on every screen. | Never with a width typed by hand. |
| Panels are separated by a `line-strong` edge, never a shadow or a gap. | Lines work in both themes and keep the panels flat. | Never. |
| No section gaps: groups inside a panel use 24 to 48 (`--space-5` to `--space-7`). | Section gaps are for scrolling pages. | Never. |
| Pane headers and composers line up with the message text, not the avatars. | Edges align to the text. | Never. |
| Tablet (1023px and below): the rail folds into tabs above the list. Phone (759px and below): one panel at a time, with a ghost "Back" button, and the composer sticks to the bottom. | Three panels do not fit, and a phone has room for one task. | Never. |

```css
/* EXTENSION: app shell */
.app { height: 100dvh; display: grid; grid-template-rows: auto 1fr; }
.app__body { min-height: 0; display: grid; grid-template-columns: var(--panel-rail) var(--panel-list) 1fr; }
.panel { min-height: 0; min-width: 0; overflow: auto; border-right: var(--border-w) solid var(--color-line-strong); }
```

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
/* EXTENSION: chat message. The name and time share one line; the message sits under both. */
.thread .vd-list__main { display: grid; grid-template-columns: auto 1fr; align-items: baseline; column-gap: var(--space-2); }
.thread .vd-list__title { font-weight: var(--weight-ui); }
.thread .message { grid-column: 1 / -1; margin: 0; max-width: var(--measure-max); font-size: var(--type-small-size); line-height: var(--type-body-lh); white-space: normal; }
.thread time { font-variant-numeric: tabular-nums; color: var(--color-muted); }
```

Code in a message uses the system monospace, the one font exception:

```css
/* EXTENSION: code in messages */
.message code { padding: var(--tag-pad-y) var(--space-1); border-radius: var(--radius-code); background: var(--color-surface-2); font-family: var(--font-mono); font-size: var(--type-label-size); }
.message pre { margin: var(--space-2) 0 0; padding: var(--space-3); overflow-x: auto; border: var(--border-w) solid var(--color-line-strong); border-radius: var(--radius-sm); background: var(--color-surface-1); font-family: var(--font-mono); font-size: var(--type-label-size); line-height: var(--type-body-lh); }
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

Rules: the number is the one heavy moment on the screen. Use `stat-sm` on a dense screen, `stat` when the challenge leads the page. It may count up once with `--dur-reveal`; under Reduce motion it shows the final number. A progress fill uses `--accent-ink` because a bar is a meaningful graphic and needs 3 to 1 against its track. A chart follows the chart recipe below. One big number per screen.

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

## Fixed recipes for missing components

The system ships eight components. These eight more are not components yet, so every product builds them from one fixed recipe, the same way each time. Mark each as an extension in the hand back.

### Tabs

Relative: Nav links and the `.vd-ul` underline. Underlined links, never pills filled with the accent.

```jsx
<div role="tablist" aria-label="Shelves" className="tabs">
  <button role="tab" aria-selected="true" className="tab vd-ul">Read <span className="count">34</span></button>
  <button role="tab" aria-selected="false" className="tab vd-ul">Want to read <span className="count">12</span></button>
</div>
```

```css
/* EXTENSION: tabs */
.tabs { display: flex; gap: var(--space-6); border-bottom: var(--border-w) solid var(--color-line); }
.tab { padding: var(--space-3) 0; border: 0; background: none; color: var(--color-muted); font: inherit; font-size: var(--type-small-size); font-weight: var(--type-small-weight); cursor: pointer; }
.tab[aria-selected='true'] { color: var(--color-ink); background-size: 100% var(--border-w), 100% var(--border-w); }
.count { color: var(--color-muted); font-variant-numeric: tabular-nums; }
```

Rules: arrow keys move between tabs, Tab moves into the panel. Labels are nouns people use. On phones the row scrolls sideways inside itself, never the page.

### Menu

Relative: the site's Accessibility menu: 280px wide, radius 16, shadow `0 16px 40px`. Opened by a Button.

```css
/* EXTENSION: menu (values from the site's Accessibility menu) */
.menu { position: absolute; z-index: var(--z-popover); inline-size: var(--menu-w); margin-top: var(--space-2); padding: var(--space-2); border-radius: var(--radius-md); background: var(--color-surface-2); box-shadow: var(--elev-3); }
.menu [role='menuitem'] { /* use NavList.Item styling: 36px rows, radius-list-row, hover ghost */ }
```

Rules: the trigger has `aria-haspopup="menu"` and `aria-expanded`. Opens on click, closes on Escape, on a choice and on a click outside, and returns focus to the trigger. Arrow keys move between items. Items are `NavList.Item` rows with `as="button"` and `role="menuitem"`. A destructive item comes last, in `--color-error`, with a hairline above it. It floats, so it is one of the few things with a shadow.

### Toast

Relative: the site's "Copied" confirmation.

```css
/* EXTENSION: toast */
.toast { position: fixed; inset-inline: 0; inset-block-end: var(--space-5); z-index: var(--z-popover); inline-size: fit-content; max-inline-size: calc(100% - var(--layout-gutter) * 2); margin-inline: auto; display: flex; align-items: center; gap: var(--space-3); padding: var(--space-2) var(--space-2) var(--space-2) var(--space-4); border-radius: var(--radius-pill); background: var(--color-surface-2); box-shadow: var(--elev-3); font-size: var(--type-small-size); }
```

Rules: one line confirming what happened, past tense: "Message deleted". At most one action, a ghost `sm` Button: "Undo". Stays `--dur-toast` (5s), longer if hovered or focused. `role="status"` with `aria-live="polite"`. One toast at a time. Never for an error the user must fix: that sits next to what failed.

### Tooltip

Relative: the solid Tag.

```css
/* EXTENSION: tooltip */
.tooltip { position: absolute; z-index: var(--z-popover); padding: var(--tag-pad-y) var(--tag-pad-x); border-radius: var(--radius-pill); background: var(--color-ink); color: var(--color-bg); font-size: var(--type-label-size); font-weight: var(--type-label-weight); white-space: nowrap; pointer-events: none; }
```

Rules: only for icon only buttons and truncated text, and only a short name ("Search"), never information people need. Appears after `--dur-slow` on hover, at once on keyboard focus, hides on Escape. Linked with `aria-describedby`. No tooltips on touch: the icon button's `aria-label` does the job.

### Table

Relative: the comfortable and dense List.

```css
/* EXTENSION: table */
.table { inline-size: 100%; border-collapse: collapse; font-size: var(--type-small-size); }
.table th { padding: var(--space-2) var(--space-3); color: var(--color-muted); font-size: var(--type-label-size); font-weight: var(--type-label-weight); text-align: left; border-bottom: var(--border-w) solid var(--color-line-strong); }
.table td { block-size: var(--row-h); padding: 0 var(--space-3); border-bottom: var(--border-w) solid var(--color-line); }
.table .num { text-align: right; font-variant-numeric: tabular-nums; }
```

Rules: hairlines between rows only, no vertical lines, no zebra stripes. Text left, numbers right in tabular numerals. Dense tables use `--row-h-dense`. A table wider than the screen scrolls sideways inside its own container. On phones, a table of records becomes a List with one row per record.

### Checkbox

Relative: the Input's border and the primary Button's fill.

```css
/* EXTENSION: checkbox */
.check { appearance: none; inline-size: var(--check-size); block-size: var(--check-size); margin: 0; border: var(--border-w) solid var(--color-edge); border-radius: var(--radius-check); background: transparent; display: inline-grid; place-content: center; cursor: pointer; transition: background-color var(--dur-fast) var(--ease-out); }
.check:checked { background: var(--color-btn); border-color: var(--color-btn); }
.check:checked::after { content: ''; inline-size: 40%; block-size: 70%; border: solid var(--color-on-btn); border-width: 0 calc(var(--border-w) * 2) calc(var(--border-w) * 2) 0; rotate: 45deg; translate: 0 -12%; }
```

Rules: a native `<input type="checkbox">` inside its `<label>`, so the whole label is the 44px touch target. Label in `small`, 8px from the box. Checked is ink, never the accent. A group of checkboxes sits 12px apart with a `label` heading.

### Switch

Relative: the site's Dark mode and Reduce motion switches: 62 by 34, a 26px knob, 260ms.

```css
/* EXTENSION: switch (values from the site) */
.switch { appearance: none; position: relative; flex: none; inline-size: var(--switch-w); block-size: var(--switch-h); margin: 0; border-radius: var(--radius-pill); background: var(--color-surface-2); box-shadow: inset 0 0 0 var(--border-w) var(--color-edge); cursor: pointer; transition: background-color var(--dur-switch) var(--ease-out); }
.switch::after { content: ''; position: absolute; inset-block-start: calc((var(--switch-h) - var(--switch-knob)) / 2); inset-inline-start: calc((var(--switch-h) - var(--switch-knob)) / 2); inline-size: var(--switch-knob); block-size: var(--switch-knob); border-radius: var(--radius-round); background: var(--color-bg); box-shadow: inset 0 0 0 var(--border-w) var(--color-line-strong); transition: translate var(--dur-switch) var(--ease-out); }
.switch:checked { background: var(--color-btn); box-shadow: none; }
.switch:checked::after { translate: calc(var(--switch-w) - var(--switch-h)) 0; }
```

Rules: `<input type="checkbox" role="switch">` with a visible label on the left, the switch on the right of the row. A switch acts at once; if the change needs a Save button, use a checkbox. Under Reduce motion the knob jumps.

### Chart

Relative: the progress bar and the accent roles. Up to three series, from steps of the one accent plus ink and muted.

| Series | Fill or line | Use |
| --- | --- | --- |
| One series | `--accent-wash` with a `line-strong` edge (Vishal's answer 5) | A single measure, like books per month |
| First of two or three | `--accent-ink` | The series that answers the main question |
| Second | Bars: `--accent-wash` with a `line-strong` edge. Lines: a 1px solid `--color-ink` line | The comparison |
| Third | `--color-muted`, dashed for lines | Context, like last year |

```css
/* EXTENSION: chart */
.chart { font-size: var(--type-label-size); color: var(--color-muted); font-variant-numeric: tabular-nums; }
.chart .bar-1 { fill: var(--accent-ink); }
.chart .bar-2 { fill: var(--accent-wash); stroke: var(--color-line-strong); stroke-width: var(--border-w); }
.chart .line-1 { stroke: var(--accent-ink); stroke-width: calc(var(--border-w) * 2); fill: none; }
.chart .line-2 { stroke: var(--color-ink); stroke-width: var(--border-w); fill: none; }
.chart .line-3 { stroke: var(--color-muted); stroke-width: var(--border-w); stroke-dasharray: var(--space-1) var(--space-1); fill: none; }
.chart .grid { stroke: var(--color-line); }
```

Rules: labels sit directly on the chart, at the end of each line or on each bar, never in a legend. Colour never carries the meaning alone: series also differ by weight, dash or position. Axis labels in muted `label` text, numbers in tabular numerals. Hairline gridlines only where they help reading values; no chart borders, no shadows, no gradients. More than three series is outside the system: split it into small charts, one per series, or a table.

### Select

Relative: the Input.

```css
/* EXTENSION: select. A native select dressed like the Input. */
.select { appearance: none; inline-size: 100%; min-block-size: var(--control-h); padding: 0 calc(var(--space-4) + var(--icon-md)) 0 var(--space-4); border: var(--border-w) solid var(--color-edge); border-radius: var(--radius-sm); background: transparent; color: var(--color-ink); font: inherit; font-size: var(--type-small-size); }
.select-wrap { position: relative; }
.select-wrap .vd-icon { position: absolute; inset-inline-end: var(--space-3); inset-block-start: 50%; translate: 0 -50%; pointer-events: none; color: var(--color-muted); }
```

Rules: always the native `<select>`, so it works with every keyboard, screen reader and phone. A visible label above it, like the Input. A chevron icon on the right. Up to about seven options; more than that becomes a searchable list in a Menu.
