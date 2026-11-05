# Good and bad, rule by rule

Eight rules from SKILL.md, each shown wrong and right in the two products this system was first tested on: a team messaging app and a reading profile.

## 1. Build around the main question

| | Messaging | Reading profile |
| --- | --- | --- |
| Bad | Three columns copied from a known chat app. The sidebar is titled "Channels" and every channel has the same weight. | A header with the avatar, then tabs "Overview, Books, Stats, Reviews". Nothing answers anything. |
| Good | "What needs you right now?" leads, with the three threads waiting on a reply. Everything else sits quietly below. | For the owner: "What am I reading, and how am I doing?" The current book and "34 of 50" lead. |

Why: the answer to the main question is the first thing people look for. Labels make them do the designer's job.

## 2. One display moment per screen

| | Bad | Good |
| --- | --- | --- |
| Reading profile | Four stat cards in a row, "Books read 34", "Pages 9,820", "Average rating 4.2", "Reviews 12", all the same size. | "34 of 50" in `stat-sm`, "16 to go by December" in `small` under it, the current cover beside it. Pages and ratings sit in a calm `small` line below. |
| Messaging | The channel name, the unread count and the thread title all in `heading`. | The channel name "#launch" in `stat-sm` once. Message names in `small` weight 650, bodies in `small` 400. |

Why: when everything is loud, nothing leads. Heavy type at small sizes reads as shouting.

## 3. Colour comes only from the product

| | Bad | Good |
| --- | --- | --- |
| Messaging | Every person gets their own avatar colour, channels get coloured dots, mentions are orange and reactions are blue. | One accent, set with `data-accent`. It marks the selected thread and the "needs you" count. Avatars are neutral; names tell people apart. |
| Reading profile | Each shelf in a different pastel. | Shelves are neutral rows. The one wash is the yearly challenge. |

Why: if colour is everywhere, it stops meaning anything. Colour that comes from the product keeps the product looking like itself.

## 4. Small accent text uses `text-aa`

| | Bad | Good |
| --- | --- | --- |
| Messaging | A 13px "3 new" in `--accent-text` orange `#F07322` on the orange wash: 2.4 to 1. | The same text in `--accent-text-aa` `#A34E17`: 4.6 to 1 or better. |
| Reading profile | Star ratings drawn in the exact amber. | Stars in `--accent-text-aa`, which keeps 3 to 1 at 15px. |

Why: the exact accent colours were chosen for display sizes on the site. At small sizes several fail.

## 5. No dark on dark

| | Bad | Good |
| --- | --- | --- |
| Messaging, dark | The thread panel in `#121214` on the `#0C0C0E` page, no edge. You cannot see where it starts. | The panel in `surface-1` `#1C1C20` with a `line-strong` edge `#3A3A42`. |
| Reading profile, dark | Neutral covers with the plain hairline, which vanishes on a dark row. | Covers in `surface-2` with the `line-strong` edge, visible on every row. |

Why: shadows barely show on a near black page, so edges and steps in lightness do the work.

## 6. Conventions win over the look

| | Bad | Good |
| --- | --- | --- |
| Messaging | The composer moved to the top to look different. Unread counts removed because they are "noisy". | The composer at the bottom, unread counts on channels, Enter sends. The system dresses these with its type, space and pills. |
| Reading profile | Ratings as a custom slider. | Five stars, the shape everyone reads at once. |

Why: people already know how chat apps and ratings work. Breaking that costs them time and buys nothing.

## 7. Space groups before boxes do

| | Bad | Good |
| --- | --- | --- |
| Messaging | Every message in its own bordered card. | Messages in a dense list. Space separates people; a hairline separates days. |
| Reading profile | Profile, challenge, shelves and reviews each in a surface card with a shadow. | Sections separated by `--section-inner`; one `wash` card for the challenge; no shadows. |

Why: a box around everything makes everything equal. Space is quieter and still shows the groups.

## 8. Every state is designed

| | Bad | Good |
| --- | --- | --- |
| Messaging | An empty channel shows a blank panel. A failed message just disappears. | "No messages in #launch yet. Say what this channel is for." with a "Write the first message" button. A failed message stays, marked "Not sent. Retry". |
| Reading profile | A new profile shows "0 of 0" and empty grey boxes. | "No books this year yet." with "Add what you are reading", and "Set a yearly goal" where the challenge would be. |

Why: real people spend more time in empty, slow and broken moments than on the happy path. That is where trust is won or lost.
