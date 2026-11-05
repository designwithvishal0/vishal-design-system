import { useEffect, useId, useRef } from 'react';
import './Modal.css';
import { cx } from './cx.js';
import { Button } from './Button.jsx';
import { IconClose } from './icons.jsx';

/**
 * Modal and Sheet, on the browser's own <dialog>, so focus is trapped and Escape closes it for free.
 * EXTENSION: the portfolio has one popover and one full screen viewer, nothing else.
 *   placement  center (a modal) | bottom (a sheet that rises from the bottom) | right (a side sheet)
 *              | top (near the top of the screen, for a command bar)
 *   open       controlled. Call onClose when the user closes it.
 *   title      the heading, with a close button. Leave it out for a bare panel, like a command bar
 *              (then give it a label). Escape and the scrim still close it.
 *   initialFocus  the id of the element to focus on open. Otherwise the dialog focuses its first
 *              button, which is the close button.
 * Clicking the scrim closes it. A shadow here means one thing: it floats above the page.
 */
export function Modal({ open, onClose, title, label, placement = 'center', footer, initialFocus, children, className }) {
  const ref = useRef(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      if (initialFocus) document.getElementById(initialFocus)?.focus();
    }
    if (!open && dialog.open) dialog.close();
  }, [open, initialFocus]);

  return (
    <dialog
      ref={ref}
      className={cx('vd-modal', `vd-modal--${placement}`, className)}
      aria-labelledby={title ? titleId : undefined}
      aria-label={title ? undefined : label}
      onClose={onClose}
      onClick={(e) => { if (e.target === ref.current) onClose?.(); }}
    >
      <div className="vd-modal__panel">
        {title && (
          <header className="vd-modal__head">
            <h2 id={titleId} className="vd-modal__title">{title}</h2>
            <Button icon size="sm" variant="ghost" aria-label="Close" onClick={onClose}><IconClose /></Button>
          </header>
        )}
        <div className="vd-modal__body">{children}</div>
        {footer && <footer className="vd-modal__foot">{footer}</footer>}
      </div>
    </dialog>
  );
}

/** A Modal that rises from the bottom. */
export const Sheet = (props) => <Modal placement="bottom" {...props} />;
