import './shared/boot.js';
import { createRoot } from 'react-dom/client';
import { Card, Button } from './shared/ds.js';
import './landing.css';

// The three directions, each with its one line idea, and links in both themes.
const directions = [
  { href: './threads/', name: 'Threads first', idea: 'The conversation is the unit, and channels become filters behind it. New replies are marked in place; nothing moves under your finger.' },
  { href: './needs-you/', name: 'Needs you', idea: 'One inbox of only what needs your reply or decision, with everything else waiting below.' },
  { href: './keyboard/', name: 'Keyboard first', idea: 'A command bar drives everything, and the screen is one wide conversation.' },
];

function Landing() {
  return (
    <main className="vd-container landing" data-accent="teal">
      <p className="vd-type-eyebrow">Kite messaging</p>
      <h1 className="vd-type-display">Three ways to answer “What needs me?”</h1>
      <ol className="landing__list">
        {directions.map((d, i) => (
          <li key={d.href}>
            <Card variant="surface">
              <Card.Meta>{`Direction ${i + 1}`}</Card.Meta>
              <Card.Title as="h2">{d.name}</Card.Title>
              <Card.Body>{d.idea}</Card.Body>
              <div className="landing__links">
                <Button as="a" href={`${d.href}?theme=light`} variant="primary" size="sm">Open in light</Button>
                <Button as="a" href={`${d.href}?theme=dark`} size="sm">Open in dark</Button>
              </div>
            </Card>
          </li>
        ))}
      </ol>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<Landing />);
