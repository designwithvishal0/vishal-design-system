# Where the skill was unclear

A running list kept while building the six layouts with SKILL.md as written, the way a new agent would. Each line is a fix for the skill, made after Vishal's review, never improvised past.

## Messaging

1. **App shells.** The skill describes scrolling pages well, but says little about screens that fill the window: which panels exist, how wide they are, and what scrolls. Column widths had no token, so they were built as multiples of `--space-6`.
2. **Nav in an app.** `Nav` is the portfolio's site header. In an app it is unclear whether the top bar should carry view links, a search field or nothing; and its phone Menu appears even with no links.
3. **Where the one display moment goes in a three panel app.** The skill says one `stat-sm` on a dense screen, but not which panel gets it when each panel has its own question. Threads first put it on the list ("3 with new replies"), because that answers the main question.
4. **Truncation is a rule but not a default.** The skill says titles truncate to one line and previews to two, but the comfortable List does not truncate. Each layout has to add it.
5. **Accent tag on a selected row.** The tag's wash matched the selected row's wash and the pill disappeared. Fixed in `Tag.css`: on a selected row the tag takes the page colour.
6. **The chat recipe put the time under the name.** Chat convention, and the skill's own trade off rule, puts the name and time on one line with the message under both. The recipe in `extending.md` needs the grid version used in `products/messaging/src/shared/thread.css`.
7. **Mentions.** Nothing says how a mention of the reader looks. Built as weight 650 plus `--accent-text-aa`, so it never relies on colour alone.
8. **Unread divider.** The recipe covers day dividers but not the "New" line above the first unread message.
9. **Straight quotes in content.** The punctuation rule is clear, but easy to miss in sample data. The checklist could name "curly quotes in content" next to "no lorem ipsum".
10. **Nav slots on phones.** Everything in `Nav` (links and actions) moves into the phone menu. A command trigger or search that must stay visible has nowhere to go, so Keyboard first adds a second trigger inside the page on phones.
11. **Focus in a command bar.** The native dialog focuses its first button, the close button. A command bar needs focus in its field. The recipe in `extending.md` should say so, or `Modal` should take an initial focus.
12. **Keyboard shortcut labels.** Nothing defines how a key looks. Built as `kbd`: the system mono at `label` size, a `line-strong` edge and `radius-code`.
13. **One primary button per view.** Easy to break in a pane that already has a primary Send button. Threads first first shipped its Jump button as a second primary; it is now an outline button. The checklist could name it.
14. **Group headings inside a panel.** Needs you groups its list under "Waiting on others" and "Everything else". The skill does not say whether the `eyebrow` role may serve as a group heading inside a panel; it was used that way.

## Fixed

All fourteen are fixed in the skill or the components, one commit each, after Vishal's review of the messaging layouts. Three lessons from the same review were added too: counts agree across a screen, a command bar is a field and not a dialog, and navigation marks only the active tab.
