import { Fragment } from 'react';
import { List, Avatar, Button } from './ds.js';
import { people } from './data.js';
import './thread.css';

// Inline code between backticks becomes <code>. Mentions of you are marked with weight and colour.
function Text({ text }) {
  return text.split('`').map((part, i) =>
    i % 2 ? <code key={i}>{part}</code> : part.split(/(@Rohan)/).map((p, j) => (p === '@Rohan' ? <strong key={`${i}-${j}`} className="mention">{p}</strong> : p)),
  );
}

const minutes = (t) => { const m = /^(\d+):(\d+)$/.exec(t); return m ? Number(m[1]) * 60 + Number(m[2]) : null; };

/**
 * EXTENSION: a chat thread built from the dense List row and Avatar (skill: extending.md, example 1).
 * No bubbles. A message from the same person within five minutes drops the avatar and name.
 * A day divider ("Yesterday", "Today") appears where the day changes, so no message repeats it.
 * firstUnread puts a "New" divider above that message. flashId briefly washes one message.
 */
export function Thread({ messages, firstUnread, flashId, onRetry, label, renderAfter }) {
  return (
    <List as="ol" density="dense" divided={false} className="thread" aria-label={label}>
      {messages.map((m, i) => {
        const prev = messages[i - 1];
        const day = m.day ?? 'Today';
        const newDay = i === 0 ? m.day && day : day !== (prev.day ?? 'Today') && day;
        const grouped = prev && !newDay && prev.author === m.author && m.id !== firstUnread && minutes(m.time) - minutes(prev.time) <= 5;
        const person = people[m.author];
        return (
          <Fragment key={m.id}>
            {newDay && (
              <li className="thread__day"><span>{newDay}</span></li>
            )}
            {m.id === firstUnread && (
              <li className="thread__divider" id={`new-${m.id}`}><span className="vd-type-eyebrow">New</span></li>
            )}
            <List.Item
              id={`msg-${m.id}`}
              className={flashId === m.id ? 'is-flash' : undefined}
              leading={grouped ? <span className="thread__gutter" aria-hidden="true" /> : <Avatar name={person.name} size="sm" />}
              title={grouped ? undefined : person.name}
              meta={grouped ? undefined : <time>{m.time}</time>}
            >
              <div className="thread__body">
                <p><Text text={m.text} /></p>
                {m.code && <pre><code>{m.code}</code></pre>}
                {m.status === 'sending' && <p className="thread__status">Sending</p>}
                {m.status === 'failed' && (
                  <p className="thread__status thread__status--failed">Not sent. <Button variant="ghost" size="sm" onClick={() => onRetry?.(m.id)}>Retry</Button></p>
                )}
                {renderAfter?.(m)}
              </div>
            </List.Item>
          </Fragment>
        );
      })}
    </List>
  );
}
