import { useEffect, useRef, useState } from 'react';
import { Cover } from '../shared/ds.js';
import { ProfileNav, NowReading, ShelfRow, Stars, Identity } from '../shared/parts.jsx';
import { currentlyReading, readThisYear, reviews, months, challenge, coverOf, reader } from '../shared/data.js';
import './story.css';

// Direction 3, My reading story. The year told as a timeline of what was read and when.
// Question: "What has this year of reading been like?" Organised by month, oldest first.
// Shelves stay visible as a row of names with counts (Vishal's change). Reviews sit under their book.
// Gives up: comparing books across the year at a glance. Signature moment: as you scroll through the
// months, the running count on the left climbs towards 50, so the year adds up as you read it.

const byMonth = months.map((name, m) => ({ name, books: readThisYear.filter((b) => b.m === m) }));
const upTo = (m) => readThisYear.filter((b) => b.m <= m);
const NOW = months.length; // the stop after the last month
const reviewOf = (title) => reviews.find((r) => r.title === title);

export function App() {
  const [month, setMonth] = useState(0);
  const refs = useRef([]);

  // You are in the last month whose top has passed the upper third of the screen, scrolling either way.
  useEffect(() => {
    let raf;
    const update = () => {
      const line = innerHeight / 3;
      const passed = refs.current.filter((el) => el && el.getBoundingClientRect().top < line);
      setMonth(passed.length ? Number(passed.at(-1).dataset.m) : 0);
    };
    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(update); };
    update();
    addEventListener('scroll', onScroll, { passive: true });
    return () => { removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, []);

  const sofar = upTo(month);
  const pages = sofar.reduce((n, b) => n + b.pages, 0);

  return (
    <div data-accent="amber">
      <ProfileNav viewer={reader.name} />
      <main className="vd-container page">
        <section className="page__section" aria-labelledby="st-title">
          <Identity size="md" />
          <h1 className="vd-type-heading st-title" id="st-title">{reader.first}’s 2026, month by month</h1>
          <ShelfRow id="st-shelves" heading="Shelves" />
        </section>

        <section className="st-year" aria-label="The year, month by month">
          <aside className="st-count" aria-live="polite">
            <p className="vd-type-eyebrow">{month === NOW ? 'Now' : `By the end of ${months[month]}`}</p>
            <p className="vd-type-heading">{sofar.length} <span className="st-of">of {challenge.goal}</span></p>
            <div className="rp-bar" role="progressbar" aria-label="Reading challenge progress" aria-valuenow={sofar.length} aria-valuemin={0} aria-valuemax={challenge.goal}>
              <span className="st-fill" style={{ inlineSize: `${(sofar.length / challenge.goal) * 100}%` }} />
            </div>
            <p className="rp-meta">{pages.toLocaleString('en-IN')} pages</p>
          </aside>

          <ol className="st-months">
            {byMonth.map(({ name, books }, m) => (
              <li key={name} className="st-month" data-m={m} ref={(el) => { refs.current[m] = el; }}>
                <h2 className="st-month__name"><span className="vd-type-title">{name}</span> <span className="rp-meta">{books.length} {books.length === 1 ? 'book' : 'books'}</span></h2>
                <ol className="st-books">
                  {books.map((b) => {
                    const r = reviewOf(b.title);
                    return (
                      <li key={b.title} className="st-book">
                        <Cover size="md" src={coverOf(b.title)} title={b.title} author={b.author} />
                        <div className="st-book__text">
                          <p className="rp-book">{b.title}</p>
                          <p className="rp-muted">by {b.author} · {b.pages} pages</p>
                          <Stars value={b.rating} />
                          {r && (
                            <blockquote className="st-review">
                              <p>{r.text}</p>
                              <footer className="rp-meta">Her review, {r.date} · <a className="vd-ul" href="#review">Read more</a></footer>
                            </blockquote>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </li>
            ))}
            {/* The last stop: the timeline arrives at now. The page's one display moment. */}
            <li className="st-month st-now" data-m={NOW} ref={(el) => { refs.current[NOW] = el; }}>
              <h2 className="st-month__name"><span className="vd-type-title">Now</span></h2>
              <p className="vd-type-stat">{readThisYear.length} books</p>
              <p className="st-now__line">finished so far this year. Two more are open now.</p>
              <NowReading books={currentlyReading} size="md" id="st-now" heading="Reading now" />
            </li>
            <li className="st-month st-month--next">
              <h2 className="st-month__name"><span className="vd-type-title">Still to come</span></h2>
              <p className="rp-muted">{challenge.left} more books to reach {challenge.goal} by December.</p>
            </li>
          </ol>
        </section>
      </main>
    </div>
  );
}
