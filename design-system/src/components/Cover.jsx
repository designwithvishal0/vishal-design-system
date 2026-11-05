import './Cover.css';
import { cx } from './cx.js';


/**
 * Book cover. EXTENSION: the portfolio has no media tile this small.
 * Without an image it is a neutral rectangle (surface-2 with a 1px edge) that shows on every row,
 * including a selected one. The accent never fills a cover: it marks the selected row only.
 * With no image only the large cover shows the title. Small and medium covers stay plain: in lists
 * the title already sits beside them, and initials would read as a person, since avatars use them.
 * Covers keep the real 2 by 3 book shape. The width sets the size.
 *   size  sm (16 by 24, dense lists) | md (48 by 72) | lg (96 by 144, wide enough for a title)
 *   src   a cover image. Leave it out for the wash fill.
 *   title the book. Read by screen readers, and shown on a large cover with no image.
 */
export function Cover({ size = 'sm', src, title, className }) {
  return (
    <span className={cx('vd-cover', `vd-cover--${size}`, className)} role={title ? 'img' : undefined} aria-label={title} aria-hidden={title ? undefined : true}>
      {src && <img className="vd-cover__img" src={src} alt="" />}
      {!src && size === 'lg' && title && <span className="vd-cover__title" aria-hidden="true">{title}</span>}
    </span>
  );
}
