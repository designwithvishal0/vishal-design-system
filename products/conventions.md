# Conventions real users expect

What people already know from Slack and Goodreads. The layouts dress these in the system's type, space and colour; they do not reinvent them. Where a layout breaks one on purpose, it says so.

Sources, read on 5 and 6 November 2026:
- Slack Help Center: "Send and read messages" (slack.com/help/articles/201457107) and "Use threads to organize discussions" (slack.com/help/articles/115000769927).
- A public Goodreads profile (goodreads.com/user/show/1-otis-chandler), the Goodreads help article "About Reading Challenge" and reader discussions of the challenge widget.
- Mobbin was not available: its connector needs a paid plan.

## Messaging (Slack)

| Convention | What users expect | In our layouts |
| --- | --- | --- |
| Bold means unread | A channel or DM with unread messages is bold in the sidebar. | NavList `unread` on channels and people in Threads first and People first. Added in this step. |
| Counts for mentions | A number appears when you are mentioned or messaged directly, not for every message. | Accent tag for new replies or mentions; plain counts stay muted. |
| Channels and DMs live in the sidebar | Channels in one group, direct messages in another, under Home. | Threads first and People first have a sidebar. Needs you moves channels under Everything else, on purpose. |
| Threads hang off a message | Replies live in a thread on the message, not in the channel. A message with replies shows a reply count. | Thread view in all three; reply counts on channel messages in Needs you. |
| Also send to the channel | A thread reply can be sent back to the channel with a checkbox under the field. | Added to the thread composer in Threads first. |
| Threads view | Home has a Threads view of threads you are part of; threads with unread replies go to the top. | Threads first keeps the order you arrived to on purpose, and marks new replies in place, so nothing moves under your finger. A deliberate break. |
| Enter sends | Enter sends; Shift and Enter adds a line. | All three. |
| Message field at the bottom | The field sits under the conversation with formatting, files, emoji and mentions as icons. | Field at the bottom. Formatting, files and emoji are left out of the prototype. |
| Drafts are kept | An unsent message is saved as a draft. | Not built. |
| Mark as unread | You can mark a message unread to come back to it. | Not built; Needs you covers "come back to this" with its list. |
| Presence | A dot shows who is active. | Avatar `status="live"`. |

## Reading profile (Goodreads)

| Convention | What users expect | How the profile uses it |
| --- | --- | --- |
| Three exclusive shelves | Every book is on exactly one of Want to read, Currently reading, Read (plus Did not finish). These names are the vocabulary. | The same four names, with counts. |
| Custom shelves with counts | Below the three, the reader's own shelves, each with its count in brackets: "fiction (241)". Shelves are names, not folders of covers. | A row of shelf names with counts, in every layout. |
| Currently reading | Cover, title, "by" author, and when it was started or last updated. Often more than one book. | Cover, title, author and progress. Up to three books, then "See all". |
| Reading challenge | "Read 34 of 50 books", a progress bar, and "4 books ahead of schedule" or "behind schedule". | "34 of 50" leads, with ahead or behind in plain words. |
| Ratings are five stars | Ratings are 1 to 5 stars, shown as stars, with an average. | Five stars in `text-aa`, never a slider or a score. |
| Reviews | Book, the reader's stars, a short excerpt with "Read more", the date. | Recent reviews in the same order. |
| Stats | Books and pages per year, average rating. | Calm line under the challenge, or its own section in My year. |
| Favourite books | A row of favourite covers near the top. | Used in My taste, for visitors. |
| Recent updates | A feed of "wants to read", "rated", "reviewed", newest first. | Used in My reading story as the timeline. |
| Owner and visitor | The same page serves the reader and visitors. Visitors see Follow and Compare books. | Each layout names its main viewer. |
