import { useState } from 'react';
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
 *   src   a cover image, with the elev-2 ring. If it fails to load, the neutral placeholder shows instead.
 *   title  the book. Read by screen readers, and shown on a large cover with no image.
 *   author shown in muted text under the title on a large cover with no image.
 */
export function Cover({ size = 'sm', src, title, author, className }) {
  const [failed, setFailed] = useState(false);
  const img = src && !failed;
  return (
    <span className={cx('vd-cover', `vd-cover--${size}`, img && 'vd-cover--img', className)} role={title ? 'img' : undefined} aria-label={title && author ? `${title} by ${author}` : title} aria-hidden={title ? undefined : true}>
      {img && <img className="vd-cover__img" src={src} alt="" loading="lazy" onError={() => setFailed(true)} />}
      {!img && size === 'lg' && title && (
        <span className="vd-cover__text" aria-hidden="true">
          <span className="vd-cover__title">{title}</span>
          {author && <span className="vd-cover__author">{author}</span>}
        </span>
      )}
    </span>
  );
}
