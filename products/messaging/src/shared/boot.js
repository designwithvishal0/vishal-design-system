// Loaded first by every page: base styles, tokens, and an optional ?theme=light or ?theme=dark
// so a reviewer can open either theme from a link.
import '../../../../design-system/src/styles/base.css';
import './shell.css';

const theme = new URLSearchParams(location.search).get('theme');
if (theme === 'light' || theme === 'dark') document.documentElement.dataset.theme = theme;

// The site strip: the way back to the hand in page, above the layout.
import { mountSiteStrip } from '../../../../design-system/src/site/SiteStrip.jsx';
mountSiteStrip();

// ?accent=orange, violet, amber, teal or sky shows the screen in another product colour.
// Without it, each layout keeps its own accent (the fallback it passes in).
export const ACCENTS = ['orange', 'violet', 'amber', 'teal', 'sky'];
export const accentOr = (fallback) => {
  const asked = new URLSearchParams(location.search).get('accent');
  return ACCENTS.includes(asked) ? asked : fallback;
};
