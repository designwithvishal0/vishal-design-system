# Cold test: health insurance claim flow

Built on 6 November 2026 by a fresh Claude Code agent that had only `skills/vishal-design/` and the components, for a product it had never seen. It is not one of the six layouts. What it got stuck on, and how the skill was fixed for each, is in [`../../cold-test.md`](../../cold-test.md).

Kept as the agent left it, with one change after review: the empty form no longer shows "₹0" in display type. Its four icons in `src/icons.jsx` were the agent's own; the system now ships them too.

Run it: `npx vite` in this folder (dependencies come from the repo root's `npm install`). Add `?theme=light` or `?theme=dark` to the address.
