import './Cover.css';
import { cx } from './cx.js';

// Initials for a medium cover: the first letters of the first two words that are not small words.
const SMALL = new Set(['the', 'a', 'an', 'of', 'and', 'in', 'on', 'to']);
const initials = (title = '') => {
  const words = title.split(/\s+/).map((w) => w.replace(/[^\p{L}\p{N}]/gu, '')).filter(Boolean);
  const main = words.filter((w) => !SMALL.has(w.toLowerCase()));
  return (main.length ? main : words).slice(0, 2).map((w) => w[0].toUpperCase()).join('');
};

/**
 * Book cover. EXTENSION: the portfolio has no media tile this small.
 * Without an image it is a neutral rectangle (surface-2 with a 1px edge) that shows on every row,
 * including a selected one. The accent never fills a cover: it marks the selected row only.
 * With no image: large covers show the title, medium covers show its initials (a full title does
 * not fit 48px without breaking words), small covers stay plain.
 * Covers keep the real 2 by 3 book shape. The width sets the size.
 *   size  sm (20 by 30, dense lists) | md (48 by 72) | lg (96 by 144, wide enough for a title)
 *   src   a cover image. Leave it out for the wash fill.
 *   title the book. Read by screen readers, and shown on medium and large covers with no image.
 */
export function Cover({ size = 'sm', src, title, className }) {
  return (
    <span className={cx('vd-cover', `vd-cover--${size}`, className)} role={title ? 'img' : undefined} aria-label={title} aria-hidden={title ? undefined : true}>
      {src && <img className="vd-cover__img" src={src} alt="" />}
      {!src && size === 'lg' && title && <span className="vd-cover__title" aria-hidden="true">{title}</span>}
      {!src && size === 'md' && title && <span className="vd-cover__initials" aria-hidden="true">{initials(title)}</span>}
    </span>
  );
}
