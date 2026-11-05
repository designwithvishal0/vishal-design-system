import './Button.css';
import { cx } from './cx.js';

/**
 * Pill button, from the portfolio's .pill-btn.
 *   variant  primary (filled ink) | outline (default) | ghost (no border, for dense UI)
 *   size     md (44px, the touch target) | sm (36px, the nav button)
 *   icon     true makes it a round icon button. Give it an aria-label.
 *   as       render as another element, for example "a" for a link
 * Feedback is colour and press only. Nothing lifts or moves on hover.
 */
export function Button({ as: Tag = 'button', variant = 'outline', size = 'md', icon = false, className, type, ...rest }) {
  const extra = Tag === 'button' ? { type: type ?? 'button' } : {};
  return <Tag className={cx('vd-btn', `vd-btn--${variant}`, `vd-btn--${size}`, icon && 'vd-btn--icon', className)} {...extra} {...rest} />;
}
