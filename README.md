# Vishal's design system, skill and six layouts

A Pazcare design assignment by Vishal Yadav, Product (UI/UX) Designer. My portfolio's visual language, written down as a system an AI agent can use, a Claude Code skill that builds new interfaces in it, and three layouts each for two products.

Live: **[vishal-design-system.vercel.app](https://vishal-design-system.vercel.app)** · every layout opens in light or dark from there.

## What is where

| Folder | What it is |
| --- | --- |
| [`design-system/`](design-system) | Tokens for colour, type, spacing, radius, elevation and motion (`tokens/tokens.mjs`, built into `tokens.css`), and React components: Button, Input, Card, Tag, Nav and NavList, List, Modal and Sheet, Avatar, Cover, and icons. `tokens/SOURCES.md` says where every value came from; `tokens/EXTENSIONS.md` lists every value my portfolio never had. |
| [`skills/vishal-design/`](skills/vishal-design) | The skill. `SKILL.md` plus reference files for tokens, components, extending the system and good and bad examples. `notes-from-vishal.md` holds my answers word for word. |
| [`products/messaging/`](products/messaging) | Three layouts for a team messaging app, in teal. |
| [`products/reading-profile/`](products/reading-profile) | Three layouts for a Goodreads style reading profile, in amber. |
| [`products/conventions.md`](products/conventions.md) | What real users expect from Slack and Goodreads, and where the layouts follow or break it. |
| [`products/picks.md`](products/picks.md) | The two layouts I would take forward, in my words. |
| [`products/cold-test.md`](products/cold-test.md) | A fresh agent with only the skill, on a product it had never seen: what it got stuck on and each fix. |
| [`products/cold-test/claim-flow/`](products/cold-test/claim-flow) | What that agent built: a health insurance claim flow. Not one of the six. |

Run any of it locally:

```bash
npm install
npm run dev:messaging      # or dev:reading, dev:system
npm run check              # tokens only: fails on any hard coded colour, size or duration
```

## The six layouts

Each starts from a different idea of what the screen is for, not a different look. Same type, same tokens, one product colour.

### Team messaging (teal)

| Layout | The idea |
| --- | --- |
| **Threads first** | The conversation is the unit, and channels become filters behind it. New replies are marked in place; nothing moves under your finger. |
| **Needs you** · my pick | One inbox of only what needs your reply or decision, with everything else waiting below. |
| **People first** | The people you work with are the unit; open one and every channel, thread and DM between you joins into one timeline. |

### Reading profile (amber)

| Layout | The idea |
| --- | --- |
| **My year** | For the owner: the yearly challenge leads, with what you are reading now beside it. |
| **My taste** · my pick | For a visitor deciding whether to follow: favourites, reviews and shelves lead, and Compare books shows where your taste meets hers. |
| **My reading story** | The year told as a timeline of what was read and when, arriving at what is open now, with the shelves kept in view. |

## My picks

**Messaging: Needs you.** "A messaging app is opened dozens of times a day, and every time the real question is "what needs me right now?" Needs you answers it directly instead of making you dig through channels for it."

**Reading profile: My taste.** "A profile is a page other people visit, so it should answer their question: is this person's taste worth following? Compare books turns that into one number."

## The direction I replaced

"The brief suggested three starting points. I kept two because they held up when I pushed them. I replaced the keyboard driven one, because it changed how you get around the screen, not what the screen is for."

Keyboard first is kept in [`products/messaging/dropped/keyboard-first`](products/messaging/dropped/keyboard-first) so the history shows it. It is not one of the six. Its command bar recipe stays in the skill.

## Where the system stretched

- **A dense tool and a scrolling page from one portfolio.** Messaging fills the window with panels that scroll on their own and no section gaps; the reading profile scrolls with 160 and 72 between and inside sections. The same tokens hold both.
- **Things the portfolio never had** were built from their closest relative: a chat thread from the List row with no bubbles, a book list from the dense List with real covers, a challenge from the stat roles, a command bar from the Modal. Each is marked as an extension.
- **One product colour per screen** carried two products without them looking alike: teal for messaging, amber for reading.
- **Real conventions** (bold unread channels, a reply count under a message, "Also send to #channel", five stars, Want to read, Currently reading and Read as shelves) sit inside the system's type and spacing without changing it.

## Where it broke

- "My portfolio is a site people read once. The system had no rules for a tool people live in: panels that scroll on their own, unread counts, keyboard use. All of it had to be built from the closest relative, and the skill now carries those rules."
- **The display voice is big by nature.** The heavy narrow type only works at 40px and up. On dense screens it shrinks to one number, so a tool has little room for its signature moment, and every heading under 40px had to go back to full width.
- **One accent per screen** limits charts to three series and rules out telling many people apart by colour. People are told apart by name.
- **Status colours** are only live green and error red. There is no warning or info colour.
- **Dark washes** sit only 1.24 to 1.41 to 1 from the page and lean on strong edges to stay separate.
- **Teal's text is a blue** in both themes, close to sky. It is my portfolio's own value, so it stays, and the two are never used together.
- **Most of the product layer is extension**: surfaces, inputs, modals, dense lists, covers, the spacing scale and every state follow the portfolio's logic but were never tested on it. All 36 are listed in `design-system/tokens/EXTENSIONS.md`.

## The cold test

A fresh Claude Code agent got only the skill and the components, and a brief it had never seen: an employee's health insurance claim flow. It wrote three genuinely different directions (organised by money, by steps, and by documents), picked the one that answers "How much will I get back, and when?", and built it. The build passes, and so does the tokens check, in light, in dark and at 375px.

It got stuck or guessed in 21 places. Most were missing recipes (a radio choice, a file upload, a status timeline, four icons) or missing tokens (Reduce motion had left some durations running). Two were rules that disagreed with each other (how many weights, and answer first against the total above the pay button on phones). Every one is recorded, with its fix in the skill, in [`products/cold-test.md`](products/cold-test.md).

See what it built: **[the claim flow, live](https://vishal-design-system.vercel.app/cold-test/claim-flow/)** (source in [`products/cold-test/claim-flow`](products/cold-test/claim-flow)). It is kept apart from the six layouts.

A second test ran in Figma Make, with the repo cloned and the skill used as it is: an employee books a doctor's video consultation through company health benefits. It followed the work order, wrote three directions before any code, kept one product colour and one display moment per screen, designed its states, and its code passed the token check. It found three skill misses: a character escape showing on screen, a hyphen removed from a booking reference, and a theme button labelled with its state instead of its action. All three are now fixed in the skill. Details are in [`products/cold-test.md`](products/cold-test.md).

## How it was made

Built with Claude Code, stage by stage, with a stop at every checkpoint for my review. Every decision that is mine is recorded in my words in `skills/vishal-design/notes-from-vishal.md`; nothing there was filled in for me. The commit history shows the work as it happened.
