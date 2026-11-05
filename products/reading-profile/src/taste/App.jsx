import { accentOr } from '../shared/boot.js';
import { useState } from 'react';
import { Avatar, Button, Cover, List, Tag } from '../shared/ds.js';
import { ProfileNav, Challenge, NowReading, ShelfRow, Reviews, Stars } from '../shared/parts.jsx';
import { reader, shelves, currentlyReading, reviews, readThisYear, favourites, visitorRatings, stats, coverOf } from '../shared/data.js';
import './taste.css';

// Direction 2, My taste. For a visitor deciding whether to follow.
// Question: "Is this person's taste worth following?" Favourites, reviews and shelves lead.
// Gives up: the owner's progress, which drops to a calm line. Signature moment: Compare books marks
// every book you have both read with your rating beside hers, and says how often you agree.

const shared = readThisYear.filter((b) => visitorRatings[b.title]);
const agree = shared.filter((b) => Math.abs(visitorRatings[b.title] - b.rating) <= 1).length;
const agrees = (b) => Math.abs(visitorRatings[b.title] - b.rating) <= 1;

// Agreeing within a star gets the accent tag; disagreeing gets a neutral tag with both ratings.
function Match({ book, first }) {
  const yours = visitorRatings[book.title];
  return agrees(book)
    ? <Tag variant="accent">You gave it {yours}</Tag>
    : <Tag variant="outline">You {yours}, {first} {book.rating}</Tag>;
}

const onShelf = (id) => (id === 'read' ? [...readThisYear].reverse() : readThisYear.filter((b) => b.tags.includes(id)));

export function App() {
  const [comparing, setComparing] = useState(false);
  const [following, setFollowing] = useState(false);
  const [shelf, setShelf] = useState('read');
  const picked = shelves.find((s) => s.id === shelf);
  const books = shelf === 'currently-reading' ? currentlyReading.map((b) => ({ ...b, rating: 0 })) : onShelf(shelf);

  const yours = (title) => comparing && visitorRatings[title];

  return (
    <div data-accent={accentOr('amber')}>
      <ProfileNav />
      <main className="vd-container page">
        <section className="page__section ts-head" aria-labelledby="ts-name">
          <Avatar name={reader.name} size="xl" />
          <div className="ts-head__text">
            <h1 className="vd-type-heading-lg" id="ts-name">{reader.name}</h1>
            <p className="ts-lead">Reads mostly Indian fiction and anything in translation. {reader.totalRead} books, {stats.average} average rating, {reader.followers} followers.</p>
            <div className="ts-actions">
              <Button variant={following ? 'outline' : 'primary'} onClick={() => setFollowing((f) => !f)} aria-pressed={following}>{following ? 'Following' : 'Follow'}</Button>
              <Button onClick={() => setComparing((c) => !c)} aria-pressed={comparing}>{comparing ? 'Stop comparing' : 'Compare books'}</Button>
            </div>
            {/* The signature moment: Compare books answers the visitor's question in one number. */}
            <div className="ts-compare" aria-live="polite">
              {comparing && <>
                <p className="vd-type-stat">{agree} of {shared.length}</p>
                <p className="ts-compare__line">You agree with {reader.first} on {agree} of the {shared.length} books you have both read, within a star.</p>
              </>}
            </div>
          </div>
        </section>

        <section className="page__section" aria-labelledby="ts-fav">
          <h2 className="vd-type-eyebrow" id="ts-fav">{reader.first}’s favourites</h2>
          <ul className="ts-favs">
            {favourites.slice(0, 6).map((b) => (
              <li key={b.title} className={yours(b.title) ? 'is-shared' : undefined}>
                <Cover size="lg" src={coverOf(b.title)} title={b.title} author={b.author} />
                <Stars value={b.rating} label={`${reader.first} rated it ${b.rating} out of 5`} />
                {yours(b.title) && <Match book={b} first={reader.first} />}
              </li>
            ))}
          </ul>
        </section>

        <section className="page__section" aria-label="Reviews">
          <Reviews items={reviews} id="ts-reviews" heading={`${reader.first}’s recent reviews`} large />
        </section>

        <section className="page__section" aria-label="Shelves">
          <ShelfRow id="ts-shelves" heading={`${reader.first}’s shelves`} current={shelf} onPick={setShelf} />
          <div className="ts-shelf">
            <p className="rp-muted">{picked.name}, {picked.count} books{books.length < picked.count ? `. The ${books.length} from this year:` : ':'}</p>
            <List density="dense" className="ts-books">
              {books.slice(0, 10).map((b) => (
                <List.Item key={b.title} as="a" href="#book" leading={<Cover size="sm" src={coverOf(b.title)} />} title={b.title} meta={b.author}
                  trailing={<span className="ts-trail">
                    {yours(b.title) && <Match book={b} first={reader.first} />}
                    {b.rating ? <Stars value={b.rating} /> : <span className="rp-meta">Reading now</span>}
                  </span>} />
              ))}
            </List>
            {books.length > 10 && <Button as="a" href="#shelf" size="sm" variant="ghost">See all {picked.count}</Button>}
          </div>
        </section>

        <section className="page__section rp-split" aria-label="Reading now and this year">
          <NowReading books={currentlyReading} size="sm" id="ts-now" heading={`${reader.first} is reading`} />
          <Challenge size="title" id="ts-challenge" />
        </section>
      </main>
    </div>
  );
}
