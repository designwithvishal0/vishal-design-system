import './Tag.css';
import { cx } from './cx.js';

/**
 * Pill tag, from the portfolio's .pill.
 *   variant  outline (default) | solid (ink filled, the "Shipped" tag, also a count badge)
 *            accent (soft wash with accent text) | live (green dot, availability)
 *   accent   orange | violet | amber | teal | sky, for the accent variant only
 */
export function Tag({ variant = 'outline', accent, className, children, ...rest }) {
  return (
    <span className={cx('vd-tag', `vd-tag--${variant}`, className)} data-accent={accent} {...rest}>
      {variant === 'live' && <i className="vd-tag__dot" aria-hidden="true" />}
      {children}
    </span>
  );
}
