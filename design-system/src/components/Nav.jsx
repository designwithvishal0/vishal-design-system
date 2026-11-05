import { useId, useState } from 'react';
import './Nav.css';
import { cx } from './cx.js';
import { Button } from './Button.jsx';
import { IconMenu, IconClose } from './icons.jsx';

/**
 * Top bar, from the portfolio header. Name on the left, links in the middle, actions on the right.
 * Frosted, sticky. Under 760px the bar shows only the name and a Menu button. The links and the
 * actions (Book a call, Resume) move into the open menu, so nothing wraps or crowds the bar.
 *   tone="light"  forces the light colour set in either theme. The handoff says the header is always
 *                 light, the live home page follows the theme, so both are supported.
 *   bordered      the hairline under the bar, which the site shows once the page has scrolled
 *   flush         drop the side gutter when the bar sits inside a panel that has its own padding
 * Put the page's sections in .vd-container so they share the bar's frame and the name lines up.
 */
export function Nav({ brand, brandHref = '#', children, actions, tone, bordered = false, sticky = true, flush = false, label = 'Sections', className }) {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const close = (e) => { if (e.target.closest('a')) setOpen(false); };
  return (
    <header className={cx('vd-nav', sticky && 'vd-nav--sticky', bordered && 'vd-nav--bordered', flush && 'vd-nav--flush', open && 'vd-nav--open', className)} data-theme={tone === 'light' ? 'light' : undefined}>
      <div className="vd-nav__in">
        <a className="vd-nav__brand" href={brandHref}>{brand}</a>
        <nav className="vd-nav__links" aria-label={label} onClick={close}>{children}</nav>
        {/* Wide screens: the actions sit in the bar. */}
        <div className="vd-nav__actions">{actions}</div>
        <Button className="vd-nav__menu" icon size="sm" variant="ghost" aria-label="Menu" aria-expanded={open} aria-controls={menuId} onClick={() => setOpen(!open)}>
          {open ? <IconClose /> : <IconMenu />}
        </Button>
      </div>
      {/* Phones: the bar holds only the name and Menu. Links and actions live in the open menu. */}
      <div className="vd-nav__sheet" id={menuId} hidden={!open}>
        <nav className="vd-nav__sheet-links" aria-label={`${label} menu`} onClick={close}>{children}</nav>
        {actions && <div className="vd-nav__sheet-actions">{actions}</div>}
      </div>
    </header>
  );
}

Nav.Link = function NavLink({ current, className, ...rest }) {
  return <a className={cx('vd-nav__link', 'vd-ul', className)} aria-current={current ? 'page' : undefined} {...rest} />;
};

/**
 * Vertical navigation for a sidebar. EXTENSION: the portfolio has only a top bar.
 * Current item is a neutral surface, never an accent, so a sidebar does not compete with the content.
 */
export function NavList({ label, children, className }) {
  return <nav className={cx('vd-navlist', className)} aria-label={label}>{children}</nav>;
}

NavList.Heading = function NavListHeading({ children, action }) {
  return (
    <div className="vd-navlist__heading">
      <span>{children}</span>
      {action}
    </div>
  );
};

NavList.Item = function NavListItem({ as: Tag = 'a', current, unread, leading, trailing, children, className, ...rest }) {
  return (
    <Tag className={cx('vd-navlist__item', current && 'is-current', unread && 'is-unread', className)} aria-current={current ? 'page' : undefined} {...rest}>
      {leading && <span className="vd-navlist__lead" aria-hidden="true">{leading}</span>}
      <span className="vd-navlist__text">{children}</span>
      {trailing}
    </Tag>
  );
};
