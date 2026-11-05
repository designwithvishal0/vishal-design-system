import { Button } from '../shared/ds.js';
import { ProfileNav, Challenge, NowReading, ShelfRow, Reviews, PerMonthChart, Identity } from '../shared/parts.jsx';
import { currentlyReading, reviews, stats, readThisYear } from '../shared/data.js';
import './year.css';

// Direction 1, My year. For the owner. Question: "What am I reading, and how am I doing?"
// The yearly challenge leads, set big; what you are reading now sits beside it, ready to update.
// Gives up: showing off your taste to visitors. Signature moment: "34 of 50" counts up once and the bar fills.

const lastFive = readThisYear.slice(-5).reverse();

export function App() {
  return (
    <div data-accent="amber">
      <ProfileNav />
      <main className="vd-container page">
        <section className="page__section" aria-label="Your year">
          <Identity size="md" />
          <div className="yr-hero">
            <Challenge size="stat" count id="yr-challenge" />
            <NowReading books={currentlyReading} id="yr-now" heading="You are reading"
              action={<Button variant="primary" size="sm">Update progress</Button>} />
          </div>
        </section>

        <section className="page__section" aria-labelledby="yr-sofar">
          <h2 className="vd-type-heading" id="yr-sofar">Your year so far</h2>
          <div className="rp-split">
            <PerMonthChart id="yr-chart" />
            <dl className="yr-facts">
              <div><dt>Pages</dt><dd>{stats.pages.toLocaleString('en-IN')}</dd></div>
              <div><dt>Average rating</dt><dd>{stats.average}</dd></div>
              <div><dt>Longest book</dt><dd>{stats.longest.title}, {stats.longest.pages} pages</dd></div>
              <div><dt>Just finished</dt><dd>{lastFive.map((b) => b.title).join(', ')}</dd></div>
            </dl>
          </div>
        </section>

        <section className="page__section" aria-label="Your shelves">
          <ShelfRow id="yr-shelves" heading="Your shelves" />
        </section>

        <section className="page__section" aria-label="Your reviews">
          <Reviews items={reviews} id="yr-reviews" heading="Your recent reviews" />
        </section>
      </main>
    </div>
  );
}
