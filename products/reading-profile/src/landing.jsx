import { accentOr } from './shared/boot.js';
import { createRoot } from 'react-dom/client';
import { Card, Button, Tag } from './shared/ds.js';
import './landing.css';

// The three directions, each with its one line idea, and links in both themes.
const directions = [
  { href: './year/', name: 'My year', idea: 'For the owner: the yearly challenge leads, with what you are reading now beside it, and everything else answers "how am I doing?"' },
  { href: './taste/', name: 'My taste', idea: 'For a visitor deciding whether to follow: favourites, shelves and reviews lead, and Compare books shows where your taste meets hers.' },
  { href: './story/', name: 'My reading story', idea: 'The year told as a timeline of what was read and when, with the shelves kept in view as a row of names and counts.' },
];

function Landing() {
  return (
    <main className="vd-container landing" data-accent={accentOr('amber')}>
      <p className="vd-type-eyebrow">Margins reading profile</p>
      <h1 className="vd-type-display">Three ways to read one reader</h1>
      <ol className="landing__list">
        {directions.map((d, i) => (
          <li key={d.href}>
            <Card variant="surface">
              <Card.Meta>{`Direction ${i + 1}`}</Card.Meta>
              {d.href === './taste/' && <Tag variant="accent">Vishal’s pick</Tag>}
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
