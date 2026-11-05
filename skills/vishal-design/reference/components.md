# Components

Import from `design-system/src/index.js`. Every component uses tokens only, works in both themes and follows the hover, press and focus rules. Use the existing component for its job before building anything new.

```js
import { Button, Input, Card, Tag, Nav, NavList, List, Modal, Sheet, Avatar, Cover,
         IconSearch, IconSend, IconHash, IconMenu, IconClose, IconPlus, IconStar } from '../../design-system/src/index.js';
```

## Button

Pill button from the site.

| Prop | Values |
| --- | --- |
| `variant` | `primary` (filled ink), `outline` (default), `ghost` (no border, for dense UI) |
| `size` | `md` 44px (default), `sm` 36px |
| `icon` | `true` for a round icon button. Give it `aria-label` |
| `as` | `"a"` to render a link |

One primary button per view. Hover changes colour only, press scales to .97, nothing lifts. Labels are verbs in sentence case and keep the same word everywhere: "Send" is always "Send".

## Input

Field with a visible label, hint and error. Extension: the site has no inputs.

| Prop | Values |
| --- | --- |
| `label` | Always given. A placeholder is never the label |
| `hideLabel` | Keeps the label for screen readers only. Only where the purpose is obvious, like a search field with an icon |
| `hint`, `error` | Text under the field. `error` turns the border and text red |
| `multiline` | A textarea that grows with its content (a message composer) |
| `leading` | An icon inside the field, left side |

Label to field 8px, field to field 24px. Keep what the user typed when an error appears.

## Card

| `variant` | What it is | Use |
| --- | --- | --- |
| `plain` | No surface, just text, like the site's cards | Default. Most content |
| `surface` | `surface-1` with a `line-strong` edge (extension) | A thing you can pick up as a whole |
| `wash` | The accent wash, radius 28 | The one group on a screen that should stand out |
| `inverse` | The dark closing panel | The one dark moment on a page |

Parts: `Card.Title`, `Card.Body`, `Card.Meta parts={['Product', 'Type', 'Concept', '2026']}` (adds the middle dots). `interactive` adds a hover overlay, never a lift. Never put a card around everything: space groups first.

## Tag

| `variant` | Use |
| --- | --- |
| `outline` | Neutral label, like "Concept" |
| `solid` | Ink filled. "Shipped", and counts like unread numbers |
| `accent` | Wash with `text-aa`. One kind of highlight per screen |
| `live` | Green dot with a slow pulse. Availability only |

Counts over 99 show as "99+". On a selected row an `accent` tag takes the page colour, so it stays a pill on the wash.

## Nav and NavList

`Nav` is the site's top bar: name left, links centre, actions right, frosted and sticky. On phones the bar holds only the name and a Menu button; links and actions move into the open menu. `tone="light"` forces the light colours in either theme. Put the page's sections in `.vd-container` so the name lines up with their left edge; inside a panel that has its own padding, use `flush`.

```jsx
<Nav brand="Northwind" actions={<Button variant="primary" size="sm">New message</Button>}>
  <Nav.Link href="#inbox" current>Inbox</Nav.Link>
</Nav>
```

In an app, the bar holds the product's name on the left, its top level views as links in the centre (the current one underlined), and on the right a search or command trigger and the person's avatar. Channels, folders and filters never go in the bar: they belong in a rail or a list. On phones everything in `actions` moves into the menu; put what must stay in the bar, like a search button, in `persistent`.

`NavList` is the vertical sidebar list (extension). `NavList.Heading` with an optional `action`, `NavList.Item` with `current`, `unread` (weight 650), `leading`, `trailing`. The current item is a neutral surface, never the accent, so the sidebar never competes with the content.

## List

Rows divided by hairlines.

| Prop | Values |
| --- | --- |
| `density` | `comfortable`: 48px single line rows, taller than a button. `dense`: 32px rows (extension) for chat and long lists |
| `List.Item` | `leading`, `title`, `meta`, `trailing`, `selected`, `as="button"` or `as="a"` for interactive rows |

Titles truncate to one line and meta to two by default. In a dense row title and meta sit on one line, and the meta truncates before the title. The selected row takes the accent wash. Times, counts and ratings go in `trailing` and use tabular numerals.

## Modal and Sheet

Built on the native `<dialog>`, so focus stays inside and Escape closes it. Clicking the scrim closes it. `placement`: `center` (modal), `bottom` (sheet), `right` (side sheet), `top` (a command bar). The dialog focuses its first button on open, which is the close button: pass `initialFocus` with an element's id to start somewhere else. Leave out `title` for a bare panel, and give it a `label`. `Sheet` is a bottom sheet. Give every modal a `title` and, when it asks for a decision, a `footer` with the actions: secondary first, primary last.

## Avatar

Initials on a neutral surface, or a photo. Sizes `xs` 24, `sm` 32, `md` 36, `lg` 44, `xl` 56. Sidebars use `xs` (24px). Initials are a mark, not reading text: weight 600, never below 10px. `status="live"` adds the green dot on the bottom right edge, ringed in the page colour, never over the initials. People never get their own colours: a screen has one accent. `tone="accent"` marks one person, once. Initials mean a person, so never use them on anything else.

## Cover

A book cover in the real 2 by 3 shape (extension). `size` `sm` 16 by 24 (dense lists), `md` 48 by 72, `lg` 96 by 144. With `src` it shows the image. Without, it is neutral `surface-2` with a `line-strong` edge; only `lg` prints the `title` and `author`. Covers are never filled with the accent: the accent marks the selected row.

## Icons

One family: outline, 1.5px stroke, rounded ends. Arrows are filled. They take the colour of the text beside them and snap to 16, 20 or 24px with it. For a filled state, like a rated star: `<IconStar className="vd-icon vd-icon--filled" fill="currentColor" />`. An icon only button needs `aria-label`.

## Helpers in base.css

`.vd-type-<role>` applies a type role. `.vd-ul` is the site's link underline for links in text: a faint resting line, a full line on hover. `.vd-ul-tab` is for navigation: no resting line, only the current item is underlined. `.vd-inverse` switches everything inside to the dark panel colours. `.vd-sr` hides text visually but keeps it for screen readers. `<kbd>` shows a key beside a command: system mono, outlined, label size.
