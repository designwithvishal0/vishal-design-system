// Loaded first by every page: base styles, tokens, and an optional ?theme=light or ?theme=dark
// so a reviewer can open either theme from a link.
import '../../../../design-system/src/styles/base.css';
import './shell.css';

const theme = new URLSearchParams(location.search).get('theme');
if (theme === 'light' || theme === 'dark') document.documentElement.dataset.theme = theme;

// The site strip: the way back to the hand in page, above the layout.
import { mountSiteStrip } from '../../../../design-system/src/site/SiteStrip.jsx';
mountSiteStrip();
