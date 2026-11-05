import './List.css';
import { cx } from './cx.js';

/**
 * List of rows with hairline dividers.
 *   density  comfortable (default, 48px single line rows, taller than a button) | dense. EXTENSION: dense uses --row-h-dense with a snug gap,
 *            for chat messages and long book lists.
 * A row has leading content, a title, a meta line and trailing content. Pass as="a" or as="button"
 * on a row to make it interactive. The selected row takes the accent wash.
 */
export function List({ as: Tag = 'ul', density = 'comfortable', divided = true, className, ...rest }) {
  return <Tag className={cx('vd-list', `vd-list--${density}`, divided && 'vd-list--divided', className)} {...rest} />;
}

List.Item = function ListItem({ as: Row = 'div', leading, title, meta, trailing, selected = false, children, className, ...rest }) {
  const interactive = Row !== 'div';
  return (
    <li className="vd-list__li">
      <Row className={cx('vd-list__row', interactive && 'vd-list__row--interactive', selected && 'is-selected', className)} aria-current={selected ? 'true' : undefined} {...rest}>
        {leading && <span className="vd-list__lead">{leading}</span>}
        <span className="vd-list__main">
          {title && <span className="vd-list__title">{title}</span>}
          {meta && <span className="vd-list__meta">{meta}</span>}
          {children}
        </span>
        {trailing && <span className="vd-list__trail">{trailing}</span>}
      </Row>
    </li>
  );
};
