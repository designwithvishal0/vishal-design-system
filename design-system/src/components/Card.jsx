import './Card.css';
import { cx } from './cx.js';

/**
 * Card. The portfolio draws almost no cards: its .card is plain text, and panels are soft washes.
 *   variant  plain    no surface, just text (the portfolio card)
 *            surface  EXTENSION. A step lighter than the page, with a strong border. Product screens.
 *            wash     soft accent fill with the accent's muted text, like the work rows
 *            inverse  the dark closing panel. Everything inside swaps to panel colours.
 *   accent   orange | violet | amber | teal | sky. Only used by the wash variant. One per screen.
 *   as       render as another element, for example "a" for a link
 * Interactive cards change colour on hover and never lift.
 */
export function Card({ as: Tag = 'div', variant = 'plain', accent, interactive = false, className, ...rest }) {
  return (
    <Tag
      className={cx('vd-card', `vd-card--${variant}`, variant === 'inverse' && 'vd-inverse', interactive && 'vd-card--interactive', className)}
      data-accent={accent}
      {...rest}
    />
  );
}

const Title = ({ as: Tag = 'h3', className, ...rest }) => <Tag className={cx('vd-card__title', className)} {...rest} />;
const Body = ({ as: Tag = 'p', className, ...rest }) => <Tag className={cx('vd-card__body', className)} {...rest} />;

/** The approved meta line: Product · Type · Concept or Shipped · Year. Pass the parts, it adds the dots. */
const Meta = ({ parts = [], className, children }) => (
  <p className={cx('vd-card__meta', className)}>{children ?? parts.filter(Boolean).join(' · ')}</p>
);

Card.Title = Title;
Card.Body = Body;
Card.Meta = Meta;
