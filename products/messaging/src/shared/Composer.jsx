import { useState } from 'react';
import { Input, Button, IconSend } from './ds.js';
import './composer.css';

/** The composer sits at the bottom, as people expect. Enter sends, Shift and Enter adds a line. */
export function Composer({ label, placeholder, onSend, hint = 'Enter to send, Shift and Enter for a new line', autoFocus }) {
  const [text, setText] = useState('');
  const send = () => { const t = text.trim(); if (!t) return; onSend?.(t); setText(''); };
  return (
    <form className="composer" onSubmit={(e) => { e.preventDefault(); send(); }}>
      <Input
        label={label}
        hideLabel
        multiline
        rows={1}
        placeholder={placeholder}
        value={text}
        autoFocus={autoFocus}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } }}
      />
      <Button type="submit" variant="primary" icon aria-label="Send" disabled={!text.trim()}><IconSend /></Button>
      <p className="composer__hint">{hint}</p>
    </form>
  );
}
