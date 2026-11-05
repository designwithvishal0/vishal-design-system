# Good and bad, rule by rule

Rules from SKILL.md, each shown wrong and right. Examples 1 to 8 use the two products the system was first tested on, a team messaging app and a reading profile. Examples 9 to 13 use five other kinds of product. The table at the end gives every rule at least one example outside messaging and reading. The products are examples; the rules are what carry over.

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

## 9. A multi step form: one question per step

| Bad | Good |
| --- | --- |
| A loan application as one long page titled "Application form", twenty fields in two columns, a red error under each field as soon as you start typing. | Five steps, each headed by the question in the user's words: "Where do you work?" One column, 24px between fields. Errors appear when you leave a field, beside it, and keep what you typed. |

Why: a form people want to finish should feel short and never accuse them mid word.

## 10. A data dashboard: answer the question, then explain it

| Bad | Good |
| --- | --- |
| Six equal cards: "Revenue", "Orders", "Visitors", "Conversion", "Returns", "AOV", each with a green or red arrow. | "₹2.4 lakh this week, up 12% on last week" in `stat-sm`, a chart of the week under it in the accent wash, and the table of orders below. Ups and downs are words, never colour alone. |

Why: a grid of equal numbers answers nothing; one number with its comparison answers "How is my store doing?"

## 11. Checkout: the total and the pay button never leave

| Bad | Good |
| --- | --- |
| A "Place order" button at the bottom of a long page, the total hidden in a collapsed summary, a bank error shown as "Error 05". | "Pay ₹1,840" as the one primary button, the total always in view, the bank error rewritten as "Your bank declined this card. Try another card or UPI." next to the card field, with what was typed kept. |

Why: people pay when they know exactly what they pay and trust that nothing will surprise them.

## 12. Settings: even on purpose

| Bad | Good |
| --- | --- |
| Each setting in its own card with a shadow, a hero banner "Make it yours!", and a Save button at the bottom that people forget to press. | Rows grouped by space and an eyebrow ("Notifications"), each with a label, one line of explanation and a switch that saves at once with a quiet "Saved". "Close account" last, behind a confirmation. |

Why: settings are scanned, not read; they are the one screen that may stay even (section 8).

## 13. Onboarding: earn every question

| Bad | Good |
| --- | --- |
| Eight screens of feature tours with illustrations, then a form asking for date of birth, gender and city "to personalise your experience". | Three screens, each one question in `display` that changes what you see next ("What do you want to train for?"), each skippable, ending on your own first week, built from your answers. That last screen is the signature moment. |

Why: onboarding sets the tone; asking for what you will not use spends trust before the product has earned any.

## Every rule, outside messaging and reading

One example per rule from a product that is neither a chat app nor a reading profile. Section numbers are SKILL.md's.

| Rule | Example |
| --- | --- |
| 1. Name the main viewer and who else looks | A claims status page: the employee is the main viewer; the HR admin who checks it later is served second, with a "Download for records" link. |
| 1. Frequency and stakes decide the layout | A payroll run, monthly and high stakes, gets one clear summary and one button. A support agent's ticket queue, used all day, gets dense rows that never move. |
| 1. Main question in the user's words, answer most prominent | A flight booking: "Will I make my connection?" answered first, "Yes, 1 h 40 min to change", before any fare detail. |
| 1. Keep repeated jobs in reach | An invoicing tool keeps "New invoice" in the same top right place on every screen. |
| 1. Order by what people need next; drop nothing the brief requires | A product page: price and delivery date before reviews; the returns policy still appears, lower. |
| 1. Check nothing, a little, a lot | An expense list with no expenses, three, and four hundred. |
| 2. One line idea per direction, no style words | A dashboard: "Today's exceptions first", "The week as a story", "One number per team". |
| 2. Directions differ in viewer, question, organisation, use or moment | A checkout organised by cost, by time ("arrives Friday"), or by trust (who you are paying and how it is protected). |
| 2. Write who it is for and what it gives up | "One number per team" is best for a founder at a glance and gives up drilling into one order. |
| 3. A few big words carry the screen | A loan approval screen: "Approved: ₹3 lakh" big; the terms below in body text. |
| 3. Neutral page, colour only from the product | A health app keeps the page off white and uses its own green as the one accent pair. |
| 3. Space shows what belongs together | A settings page groups rows with 48px between groups, not a card around each row. |
| 3. Edges are lines, shadows mean floating | A date picker popover gets `--elev-3`; the form card under it gets only a `line-strong` edge. |
| 3. Tokens only; same component, same job | Every "Delete" in an admin tool is the same outline button with the same word. |
| 3. Hover is colour, press scales, nothing lifts | Pricing plan cards change their wash on hover; they never rise. |
| 3. Conventions win | A checkout keeps the card number, expiry and CVV in that order, because people type them from the card. |
| 3. Navigation marks only the active item | A dashboard's "Overview, Orders, Customers" tabs underline only the current one. |
| 3. A command bar is a field | An admin console's Cmd K opens with the cursor in the field and no close button. |
| 3. Real content only | A dashboard sample shows "Asha's Kitchen, Pune, ₹1,240", never "Customer 1, $0.00". |
| 3. Short, concrete copy | A payment button says "Pay ₹1,840", never "Proceed to payment". |
| 3. No hyphens in prose, real characters in codes | A booking confirmation reads "Your consultation is booked" with no dashes in the sentence, and the reference stays "DR-20931-K" exactly as the system issued it. |
| 3. Counts agree | An inbox badge, a tab count and a "4 unpaid invoices" heading all say 4, and all drop when one is paid. |
| 3. Opening clears its count | Opening a notification marks it read and the bell's badge drops at once. |
| 3. Both themes designed | A trading chart's grid lines use `--color-line` in both themes, never a fixed grey. |
| 4. One display moment per screen | An onboarding screen's question in `display`; nothing else that size. |
| 4. Four text sizes at most | A settings page: `label` for eyebrows, `small` for explanations, `body` for labels, `title` for the page. |
| 4. Three weights at most; buttons and labels never above 650 | A form's field labels at 600, its inputs at 400, its heading at 700. |
| 4. A display number never shows a meaningless zero | An empty claim form says "Your estimate appears here once you add the amount you paid" where "₹47,340" will go, never "₹0". |
| 4. Display style only at 40px and up | A dashboard card title at 22px is full width 700, not narrow 760. |
| 4. Code only in monospace | An API key on a developer settings page is in `--font-mono` on `surface-2`. |
| 4. Eyebrow heads a group, never a name | "Billing" as an eyebrow over the billing rows; a company name "Acme Labs" is never uppercased. |
| 4. Emphasis from weight or position | A required field is marked with the word "Required", not a red asterisk alone. |
| 4. Paragraphs at reading measure | Terms on a loan offer run 46ch to 760px wide, never full width. |
| 4. Line height and tracking from the roles | A dashboard number in `stat-sm` at 1, its caption in `small` at 1.4. |
| 4. Tabular numerals | Prices in a cart line up by the rupee digit. |
| 4. Balanced headings | "Where do you work?" never leaves "work?" alone on a line. |
| 4. Real punctuation | "₹1,840" and "9 to 5" and curly quotes in a review prompt. |
| 4. Text aligns left | A pricing page's plan descriptions are left aligned, even inside centred cards. |
| 4. Truncate names, never the main answer | A long company name in a table row truncates; the claim amount on the claim page never does. |
| 4. Every gap from the scale | A multi step form uses 24 between fields and 48 between groups, nothing typed by hand. |
| 4. Gap grows with the level | A dashboard: 8 inside a stat, 24 between stats and chart, 72 between sections of a long report. |
| 4. Group with space, then wash, then line | A checkout summary is grouped by space; only the payment method selected gets the wash. |
| 4. Label to input 8, field to field 24 | Every field on a signup form. |
| 4. Rows repeat at 48 or 32 | A transactions table at 32px rows; a settings list at 48px. |
| 4. Content capped at 1376px | A wide analytics page stops growing past 1376px instead of stretching charts. |
| 4. Optical over measured | The play triangle in a video course's button sits a pixel right of centre. |
| 4. Align to the text edge; 44px targets | An onboarding "Skip" link has a 44px tap area even though the text is small. |
| 4. One product colour, in few places | A fitness app's green marks today's workout and the progress ring, nowhere else. |
| 4. Small accent text uses text-aa | A "Recommended" plan label at 13px uses `--accent-text-aa`. |
| 4. Status colours carry meaning only | A failed payment row uses `--color-error`; "Paid" is plain text, not green. |
| 4. Colour never alone | A selected shipping option gets the wash and a check mark. |
| 4. Pastels stay bright | A health app's mint wash is never greyed to look serious. |
| 4. Depth: page, surface, wash; shadows only float | A dashboard's filter menu has `--elev-3`; the cards do not. |
| 4. Dark is designed, no dark on dark | A dark analytics panel sits on `surface-1` with a `line-strong` edge. |
| 4. One icon family | A settings page uses the same outline icons as the rest of the app. |
| 4. Icons mean something | A dashboard's export button has a download icon and the word "Export". |
| 4. Images shown whole | Product photos in a cart keep their shape; nothing is cropped to a square circle. |
| 4. Real images over placeholders | A cart shows the real product photo from the catalogue; the neutral surface only if it fails to load. |
| 4. Radius from the set | Inputs at 12, cards at 24, the pay button a full pill. |
| 4. Finished means every state | A form's Continue has hover, focus, pressed and a disabled state that says why ("Add your salary to continue"). |
| 5. One signature moment, at the change or the end | A checkout's "Paid" screen; a claim's "Approved: ₹18,400". |
| 5. Size it from stakes and frequency | A one off loan approval gets a whole hero; a daily expense entry gets a one line "Added". |
| 5. Built from the system, works without motion | The approved amount counts up once; under Reduce motion it is simply there. |
| 5. Errors, settings and speed tasks get none | A settings page and a "card declined" error have no signature moment. |
| 5. Motion has a job | A row slides out when an invoice is marked paid, to show where it went. |
| 5. What may move and what never moves | The pay button never moves while a coupon is applied. |
| 5. Timing from tokens | A dashboard filter applies in 200ms. |
| 5. Reduce motion wins | An onboarding carousel becomes a fade. |
| 6. Extend without breaking | A stepper for a form is built from the eyebrow and the progress bar, not a new component style. |
| 6. A brand colour is a new accent pair | A bank's own blue added as a sixth pair, with its `text-aa` shade. |
| 7. Trade offs: the brief wins over the idea | A minimal checkout idea still shows the legally required price breakdown. |
| 0. The written brief wins | A brief says the claim form has two steps; on a call someone says three. Build two and say where the call differed. |
| 8. Correct versus good: commit | A dashboard that was six equal cards becomes one big number with a chart under it. |
