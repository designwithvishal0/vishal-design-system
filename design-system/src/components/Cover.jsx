import './Cover.css';
import { cx } from './cx.js';

/**
 * Book cover. EXTENSION: the portfolio has no media tile this small.
 * Without an image it is a neutral rectangle (surface-2 with a 1px edge), a stand in that keeps a
 * long list of books calm and shows on every row, including a selected one. The accent never fills
 * a cover: it marks the selected row only. The width sets the size and the height follows 5 to 7.
 *   size  sm (20px wide, dense lists) | md (48px) | lg (72px)
 *   src   a cover image. Leave it out for the wash fill.
 *   title the book, for screen readers. Leave it out when the title sits next to the cover.
 */
export function Cover({ size = 'sm', src, title, className }) {
  return (
    <span className={cx('vd-cover', `vd-cover--${size}`, className)} role={title ? 'img' : undefined} aria-label={title} aria-hidden={title ? undefined : true}>
      {src && <img className="vd-cover__img" src={src} alt="" />}
    </span>
  );
}
