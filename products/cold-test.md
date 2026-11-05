# Cold test: a product the skill had never seen

**When:** 6 November 2026.

**Who:** a fresh Claude Code agent with no memory of this work.

**What it had:** only `skills/vishal-design/` and the components in `design-system/`. It was not allowed to read `products/`.

**The brief it got:** "Design an employee's health insurance claim flow for a company benefits app. An employee who has paid a hospital or clinic bill wants to claim the money back from their company's group health insurance. Cover: starting a claim, adding the bill and documents, the claim amount, reviewing and submitting, and tracking the claim's status afterwards. Make three different layout directions, pick one, and build the picked one as a runnable React screen in the design system."

## What it made

**Three directions:**

1. **What you'll get back.** The amount the employee will get back is worked out live and leads every screen.
2. **One question at a time.** Five short steps, then a timeline.
3. **Nothing missing.** Documents first, as a checklist of what the insurer needs.

**Its pick:** direction 1, because "the main viewer's real question is about money".

**What it built:**
- A claims home.
- A new claim form, with a sticky summary in the wash saying "You could get back about ₹47,340".
- A review step.
- A claim page with a four step status timeline.
- An inline request from the insurer for a missing document.

It built in teal. The app builds, and the tokens check passes. It checked the screens in light, in dark and at 375px wide with no sideways scroll. The build stayed in `scratch/` and is not part of the hand in.

**What worked:**
- The directions template forced real structural differences between the three.
- The frequency and stakes test settled the layout early.
- The new checkout and multi step form examples answered where the pay button goes, when errors appear, and that a form gets no signature moment until the end.
- The select, checkbox, progress bar and toast recipes passed the tokens check first time.
- "Work every count out from the data" made the counts agree with no extra effort.

## Where it got stuck or guessed, and the fix

| # | Where it got stuck | What it guessed | Fixed in the skill |
| --- | --- | --- | --- |
| 1 | The tokens check crashed on an absolute path. The skill never said how to check an app's own CSS. | A path relative to `design-system/`. | The script now takes absolute or relative paths. Checklist: the exact command for an app's own `src`. |
| 2 | The setup import assumes the app sits two levels deep. | Three levels. | Setup says to point the `../` at the repo's `design-system/`. |
| 3 | A new product has no data. The skill said "no invented numbers" without saying how to show sample data. | Computed totals, plus a "Concept, sample data" footer. | Rule 3, Real content: sample records that could be real, every total computed, and the screen labelled once as a concept. |
| 4 | A form page is neither a scrolling page nor an app shell, so no gaps were defined. | 24 between fields, 48 between groups. | Section 4, Space: a form page has 24 between fields, 48 between groups, and `section-inner` above the actions. |
| 5 | Components quietly add text sizes (an `sm` button is 14, a List title is 18), which can break the four size rule. | It avoided `sm` buttons and List. | components.md has a table of the sizes each component brings, and the checklist points to it. |
| 6 | "Three weights" clashed with 700 headings plus a display weight. | Followed the tokens; the checklist failed by the letter. | Rule rewritten: below the display moment, three weights (400, 500 to 650, 700); the display moment adds its own. |
| 7 | A wash card turns all text accent ink, so a number on it came out teal. | Set the number to ink. | New rule: numbers stay ink, even on a wash. |
| 8 | No radio button. | The checkbox, made round. | New recipe: radio choice. |
| 9 | No file upload, though the brief needed one. | A labelled button around a hidden input, file rows, and a size error. | New recipe: file upload, with accepted types, progress, errors, retry and drop. |
| 10 | Only seven icons; the Select recipe asks for a chevron that did not exist. | Drew four icons. | Added check, chevron, file and back icons to `icons.jsx`. New rule: a missing icon is drawn in the same family and listed as an extension. |
| 11 | No status timeline. | A dot rail. | New recipe: status timeline. |
| 12 | No pending or warning status. | Accent tag for "needs you", outline tags for the rest. | Rule: other statuses are words in an outline Tag; the one that needs the user gets the accent Tag. |
| 13 | No guidance on money inputs. | `leading="₹"` and a hint. | components.md: a money input with the currency sign, keyboard, tabular numbers and the format in the hint. |
| 14 | "Answer first" clashed with "total above the pay button" on phones. | Followed checkout; the first checklist line failed on phones. | Section 1: when the answer is worked out from a form, phones also show it as a one line answer pinned at the top. |
| 15 | Reduce motion left reveal, stagger, switch and ping running. | Its own media query. | The tokens now zero every motion duration. Toast time stays, because it is not motion. |
| 16 | No width for a side summary. | `panel-list`. | tokens.md: `panel-list` is the width for a side summary too. |
| 17 | No back link recipe; aligning the icon was only partly right. | A negative margin. | New recipe: a back link whose icon hangs in the margin. |
| 18 | Where review happens was not said. | On the same page. | Section 1: review is on the same page, read only; a Modal is only for one yes or no. |
| 19 | One top level view still gave an empty menu on phones. | Accepted it. | components.md: one view means no links, with the avatar in `persistent`. |
| 20 | A disabled button fails 4.5 to 1. | Exempt, with a reason shown. | Checklist: disabled controls are exempt, but must say why they are disabled. |
| 21 | No way to switch themes while checking. | A `?theme=` parameter. | Setup includes the `?theme=` snippet. |

## What it still left unfinished, by its own checklist

- Upload progress and failure states.
- An "all caught up" empty state.
- Offline.

Upload now has a recipe; the empty and offline states were already in the checklist and it skipped them. Most of its guesses were missing recipes or missing tokens. Two were rules that disagreed with each other (6 and 14), and those are now settled in the rules themselves.

## After review

Vishal spotted one more: the empty claim form showed "₹0" in display type, which looks broken. The claim flow now shows a quiet line in its place until an amount is typed, and the skill has a new rule: a display number never shows a meaningless zero.

# Second test: Figma Make

**When:** 6 November 2026.

**Setup:** Figma Make, with the repo cloned and the skill used exactly as it is in the repo.

**Brief:** an employee books a doctor's video consultation through their company's health benefits. Three screens: choose a doctor and time, booking confirmation, and the screen before the call starts.

## What it got right

1. **It followed the work order.** It worked out whose screen it is and the main question, wrote three directions before any code, picked "Soonest doctor first", and labelled the direction in the build.
2. **One product colour and one display moment per screen.** The colour was sky. The display moments:
   - "Today, 4:30 pm" in the booking summary.
   - "Booked for today, 4:30 pm" on confirmation.
   - "Starts in 2 min" before the call.
3. **It used the newest rules.** No meaningless zero ("Your consultation time appears here once you pick a slot"), and the display style only at 40px and up.
4. **Real content throughout.** Names, times, amounts in rupees, and a ₹0 copay explained by the benefit.
5. **States were designed:**
   - first use;
   - no results;
   - a slot just taken, shown next to the book button;
   - a partial upload failure;
   - offline.
6. **Its code passed the token check.**

## What went wrong, and what changed

| # | What happened | What changed |
| --- | --- | --- |
| 1 | `\u00A0` showed as visible text on every screen (`15\u00A0min`, and a phone number full of them). Its own checklist marked this a pass, because it checked the code, not the screen. | Skill: never write a character escape as text. In JSX, use the real character or `{"\u00A0"}` inside braces. New checklist line: "Look at the rendered screen, not just the code. Any visible \u, &nbsp; or broken character fails the check." The checklist now says every line is judged on the rendered screen. |
| 2 | It removed the hyphen from the booking reference "PZ-4829". | Skill: the hyphen rule covers prose only. Booking references, IDs, phone numbers, file names, dates in data and code keep their real characters, hyphens included. |
| 3 | It looked inside `products/cold-test` although the prompt said not to. | Nothing in the skill. A test setup issue: a cold test should run on a copy without `products/`. |
| 4 | The theme button said "Switch to dark" while the page was already dark. | Fixed in the skill: a toggle's label names the action it takes, not the state it's in, so on a dark page it reads "Switch to light". There is a checklist line for it. |
| 5 | Figma Make's preview stayed on the old site until it was restarted. | Nothing in the skill: this is a tool issue. |

Like the first test, the misses were details the skill had not spelled out, not wrong rules. Both skill misses, 1 and 2, came from the skill being read too literally, and both are now written down plainly.
