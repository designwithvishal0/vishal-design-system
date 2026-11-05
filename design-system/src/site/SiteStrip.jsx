import { createRoot } from 'react-dom/client';
import { IconBack } from '../components/icons.jsx';
import './site-strip.css';

/**
 * Site chrome, not a product component: a thin strip above every page except the hand in page.
 * Left, the way back to all the layouts, keeping the current ?theme=. Right, the page's own name.
 * It uses the same frame as the product's Nav (the layout gutter), so the arrow lines up with the brand
 * and the name with the nav's right edge.
 * It sits above the product's own UI, so no layout's inner spacing changes.
 */
const NAMES = [
  ['needs-you', 'Needs you'], ['threads', 'Threads first'], ['people', 'People first'],
  ['keyboard-first', 'Keyboard first, dropped'], ['messaging', 'Team messaging'],
  ['year', 'My year'], ['taste', 'My taste'], ['story', 'My reading story'], ['reading-profile', 'Reading profile'],
  ['claim-flow', 'Claim flow, cold test'], ['design-system', 'Components'],
];
const nameOf = (path) => NAMES.find(([seg]) => path.split('/').includes(seg))?.[1] ?? '';

export function SiteStrip({ name, theme: forced, variant }) {
  const theme = new URLSearchParams(location.search).get('theme');
  const href = theme === 'light' || theme === 'dark' ? `/?theme=${theme}` : '/';
  return (
    <nav className={variant ? `site-strip site-strip--${variant}` : 'site-strip'} data-theme={forced} aria-label="Hand in">
      <div className="site-strip__in">
        <a className="site-strip__back" href={href}><IconBack /> All layouts</a>
        <span className="site-strip__name">{name}</span>
      </div>
    </nav>
  );
}

/**
 * Renders the strip into its own root at the top of the body, apart from the product's UI.
 * theme forces the strip's theme when the page's own header is forced (the components page's toolbar is
 * always light). variant "toolbar" matches a header that keeps the same padding at every width.
 */
export function mountSiteStrip({ name = nameOf(location.pathname), theme, variant } = {}) {
  const el = document.createElement('div');
  document.body.prepend(el);
  createRoot(el).render(<SiteStrip name={name} theme={theme} variant={variant} />);
}
