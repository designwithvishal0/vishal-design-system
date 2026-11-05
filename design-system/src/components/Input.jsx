import { useId } from 'react';
import './Input.css';
import { cx } from './cx.js';

/**
 * Text field with label, hint and error. EXTENSION: the portfolio has no inputs, so the states
 * (hover, focus, error, disabled) are proposed in Input.css from existing tokens.
 *   multiline  a textarea that grows with its content (the message composer)
 *   leading    an icon or node shown inside the field, left side
 *   hideLabel  keep the label for screen readers only
 */
export function Input({ label, hint, error, multiline = false, leading, hideLabel = false, className, id, ...rest }) {
  const auto = useId();
  const fieldId = id ?? auto;
  const noteId = `${fieldId}-note`;
  const Control = multiline ? 'textarea' : 'input';
  const note = error || hint;
  return (
    <div className={cx('vd-field', className)}>
      {label && <label className={cx('vd-field__label', hideLabel && 'vd-sr')} htmlFor={fieldId}>{label}</label>}
      <div className={cx('vd-input', multiline && 'vd-input--multiline', error && 'vd-input--error', leading && 'vd-input--leading')}>
        {leading && <span className="vd-input__leading">{leading}</span>}
        <Control id={fieldId} className="vd-input__control" aria-invalid={error ? true : undefined} aria-describedby={note ? noteId : undefined} {...rest} />
      </div>
      {note && <p id={noteId} className={cx('vd-field__note', error && 'vd-field__note--error')}>{note}</p>}
    </div>
  );
}
