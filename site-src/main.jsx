import '../design-system/src/styles/base.css';
import './site.css';
import { createRoot } from 'react-dom/client';
import { Button, Tag } from '../design-system/src/index.js';

// The same theme switch as the layouts: ?theme=light or ?theme=dark, otherwise the system setting.
const theme = new URLSearchParams(location.search).get('theme');
if (theme === 'light' || theme === 'dark') document.documentElement.dataset.theme = theme;

// The hand in page: every layout with its one line idea, in light and dark, and the two picks.
const products = [
  { name: 'Team messaging', accent: 'teal', base: './messaging/', layouts: [
    { path: 'threads/', name: 'Threads first', idea: 'The conversation is the unit, and channels become filters behind it. New replies are marked in place; nothing moves under your finger.' },
    { path: 'needs-you/', name: 'Needs you', pick: true, idea: 'One inbox of only what needs your reply or decision, with everything else waiting below.' },
    { path: 'people/', name: 'People first', idea: 'The people you work with are the unit; open one and every channel, thread and DM between you joins into one timeline.' },
  ] },
  { name: 'Reading profile', accent: 'amber', base: './reading-profile/', layouts: [
    { path: 'year/', name: 'My year', idea: 'For the owner: the yearly challenge leads, with what you are reading now beside it.' },
    { path: 'taste/', name: 'My taste', pick: true, idea: 'For a visitor deciding whether to follow: favourites, reviews and shelves lead, and Compare books shows where your taste meets hers.' },
    { path: 'story/', name: 'My reading story', idea: 'The year told as a timeline of what was read and when, arriving at what is open now, with the shelves kept in view.' },
  ] },
];

function Site() {
  return (
    <main className="vd-container site">
      <header className="site__head">
        <p className="vd-type-eyebrow">Pazcare design assignment · Vishal Yadav</p>
        <h1 className="vd-type-display">One system, two products, six ideas</h1>
        <p className="site__lead">A design system taken from my portfolio, a Claude Code skill that builds in it, and three layouts each for a team messaging app and a reading profile.</p>
        <div className="site__links">
          <Button as="a" href="https://github.com/designwithvishal0/vishal-design-system" variant="primary">The repo</Button>
          <Button as="a" href="./design-system/">The components</Button>
        </div>
      </header>
      {products.map((p) => (
        <section key={p.name} className="site__product" data-accent={p.accent} aria-labelledby={p.accent}>
          <h2 className="vd-type-heading" id={p.accent}>{p.name}</h2>
          <ol className="site__layouts">
            {p.layouts.map((l) => (
              <li key={l.path} className="site__layout">
                <h3 className="site__name">{l.name} {l.pick && <Tag variant="accent">Vishal’s pick</Tag>}</h3>
                <p className="site__idea">{l.idea}</p>
                <p className="site__open">
                  <a className="vd-ul" href={`${p.base}${l.path}?theme=light`}>Open in light</a>
                  <a className="vd-ul" href={`${p.base}${l.path}?theme=dark`}>Open in dark</a>
                </p>
              </li>
            ))}
          </ol>
        </section>
      ))}
    </main>
  );
}

createRoot(document.getElementById('root')).render(<Site />);
