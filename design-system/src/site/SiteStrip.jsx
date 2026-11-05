import { createRoot } from 'react-dom/client';
import { IconBack } from '../components/icons.jsx';
import './site-strip.css';

/**
 * Site chrome, not a product component: a thin strip above every page except the hand in page.
 * Left, the way back to all the layouts, keeping the current ?theme=. Right, the page's own name.
 * It sits above the product's own UI, so no layout's inner spacing changes.
 */
const NAMES = [
  ['needs-you', 'Needs you'], ['threads', 'Threads first'], ['people', 'People first'],
  ['keyboard-first', 'Keyboard first, dropped'], ['messaging', 'Team messaging'],
  ['year', 'My year'], ['taste', 'My taste'], ['story', 'My reading story'], ['reading-profile', 'Reading profile'],
  ['claim-flow', 'Claim flow, cold test'], ['design-system', 'Components'],
];
const nameOf = (path) => NAMES.find(([seg]) => path.split('/').includes(seg))?.[1] ?? '';

export function SiteStrip({ name }) {
  const theme = new URLSearchParams(location.search).get('theme');
  const href = theme === 'light' || theme === 'dark' ? `/?theme=${theme}` : '/';
  return (
    <nav className="site-strip" aria-label="Hand in">
      <a className="site-strip__back" href={href}><IconBack /> All layouts</a>
      <span className="site-strip__name">{name}</span>
    </nav>
  );
}

/** Renders the strip into its own root at the top of the body, apart from the product's UI. */
export function mountSiteStrip(name = nameOf(location.pathname)) {
  const el = document.createElement('div');
  document.body.prepend(el);
  createRoot(el).render(<SiteStrip name={name} />);
}
