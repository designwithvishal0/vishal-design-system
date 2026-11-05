import './Avatar.css';
import { cx } from './cx.js';

const initials = (name = '') => name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join('');

/**
 * Avatar. A photo, or initials on a neutral surface. People are never given their own colours,
 * because a screen has one accent. Use tone="accent" for a single highlighted person.
 *   size    xs | sm | md (default) | lg | xl
 *   status  "live" adds the green live dot with its slow ping
 */
export function Avatar({ name, src, size = 'md', tone = 'neutral', status, className, ...rest }) {
  return (
    <span className={cx('vd-avatar', `vd-avatar--${size}`, `vd-avatar--${tone}`, className)} role="img" aria-label={name} {...rest}>
      {src ? <img className="vd-avatar__img" src={src} alt="" /> : <span aria-hidden="true">{initials(name)}</span>}
      {status === 'live' && <i className="vd-avatar__status" aria-hidden="true" />}
    </span>
  );
}
