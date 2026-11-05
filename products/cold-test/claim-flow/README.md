# Cold test: health insurance claim flow

Built on 6 November 2026 by a fresh Claude Code agent that had only `skills/vishal-design/` and the components, for a product it had never seen. It is not one of the six layouts. What it got stuck on, and how the skill was fixed for each, is in [`../../cold-test.md`](../../cold-test.md).

Kept as the agent left it, with two changes after review. First, the empty form no longer shows "₹0" in display type. Its four icons in `src/icons.jsx` were the agent's own; the system now ships them too.

Changed after the test: the line ‘About ₹43,380 is waiting on it’ used amber’s heading colour on its wash and failed contrast at 4.42 to 1 when switched to amber. It now uses the muted colour, as the skill already said. Everything else is as the agent built it.

Run it: `npx vite` in this folder (dependencies come from the repo root's `npm install`). Add `?theme=light` or `?theme=dark` to the address.
