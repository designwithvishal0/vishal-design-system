import { useState } from 'react';
import './Nav.css';
import { cx } from './cx.js';
import { Button } from './Button.jsx';
import { IconMenu, IconClose } from './icons.jsx';

/**
 * Top bar, from the portfolio header. Name on the left, links in the middle, actions on the right.
 * Frosted, sticky. Under 760px the links fold into a Menu button.
 *   tone="light"  forces the light colour set in either theme. The handoff says the header is always
 *                 light, the live home page follows the theme, so both are supported.
 *   bordered      the hairline under the bar, which the site shows once the page has scrolled
 */
export function Nav({ brand, brandHref = '#', children, actions, tone, bordered = false, sticky = true, label = 'Sections', className }) {
  const [open, setOpen] = useState(false);
  return (
    <header className={cx('vd-nav', sticky && 'vd-nav--sticky', bordered && 'vd-nav--bordered', open && 'vd-nav--open', className)} data-theme={tone === 'light' ? 'light' : undefined}>
      <div className="vd-nav__in">
        <a className="vd-nav__brand" href={brandHref}>{brand}</a>
        <nav className="vd-nav__links" aria-label={label}>{children}</nav>
        <div className="vd-nav__actions">
          {actions}
          <Button className="vd-nav__menu" icon size="sm" variant="ghost" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>
            {open ? <IconClose /> : <IconMenu />}
          </Button>
        </div>
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
