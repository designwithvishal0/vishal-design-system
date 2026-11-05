import { useEffect, useRef, useState } from 'react';
import { Nav, Avatar, Cover, Button, Input, IconSearch, IconStar } from './ds.js';
import { reader, shelves, challenge, stats, months } from './data.js';
import './parts.css';

const reduce = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

/** The site bar. A profile is a page inside the product, so no nav link is current. */
export function ProfileNav() {
  return (
    <Nav brand="Margins" label="Margins" actions={<>
      <Input label="Search books" hideLabel placeholder="Search books" leading={<IconSearch />} className="rp-search" />
      <Avatar name="You" size="sm" />
    </>}>
      <Nav.Link href="#home">Home</Nav.Link>
      <Nav.Link href="#books">My books</Nav.Link>
      <Nav.Link href="#browse">Browse</Nav.Link>
    </Nav>
  );
}

/** Goodreads convention: five stars, never a slider or a score. Skill recipe: a star rating. */
export function Stars({ value, label }) {
  return (
    <span className="rp-stars" role="img" aria-label={label ?? `Rated ${value} out of 5`}>
      {[1, 2, 3, 4, 5].map((n) => (n <= value
        ? <IconStar key={n} className="vd-icon vd-icon--filled" fill="currentColor" />
        : <IconStar key={n} className="vd-icon rp-stars__empty" />))}
    </span>
  );
}

/** Shelves as a row of names with counts: the exclusive shelves, then the reader's own. */
export function ShelfRow({ current, onPick, heading = 'Shelves', id = 'shelves' }) {
  const Tag = onPick ? 'button' : 'a';
  return (
    <nav className="rp-shelves" aria-labelledby={id}>
      <h2 className="vd-type-eyebrow" id={id}>{heading}</h2>
      {[shelves.filter((s) => s.exclusive), shelves.filter((s) => !s.exclusive)].map((group, g) => (
        <ul key={g} className={g ? 'rp-shelves__own' : undefined}>
          {group.map((s) => (
            <li key={s.id}>
              <Tag className="rp-shelf vd-ul-tab" aria-current={current === s.id ? 'true' : undefined}
                {...(onPick ? { type: 'button', onClick: () => onPick(s.id) } : { href: `#shelf-${s.id}` })}>
                {s.name} <span className="rp-count">{s.count}</span>
              </Tag>
            </li>
          ))}
        </ul>
      ))}
    </nav>
  );
}

/** Counts up once to the real number with --dur-reveal. Under Reduce motion, the final number at once. */
export function CountUp({ to }) {
  const [n, setN] = useState(reduce() ? to : 0);
  const ref = useRef(null);
  useEffect(() => {
    if (reduce()) return;
    const ms = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--dur-reveal')) * 1000;
    let start;
    const step = (t) => {
      start ??= t;
      const k = Math.min(1, (t - start) / ms);
      setN(Math.round(to * (1 - (1 - k) ** 3)));
      if (k < 1) ref.current = requestAnimationFrame(step);
    };
    ref.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(ref.current);
  }, [to]);
  return n;
}

/** The yearly challenge, skill recipe 3. size "stat" when it leads the page, "stat-sm" otherwise. */
export function Challenge({ size = 'stat-sm', count = false, id = 'challenge' }) {
  const { year, goal, done, left, behind } = challenge;
  const pace = behind > 0 ? `${behind} books behind schedule` : behind < 0 ? `${-behind} books ahead of schedule` : 'right on schedule';
  return (
    <section className="rp-challenge" aria-labelledby={id}>
      <h2 className="vd-type-eyebrow" id={id}>{year} reading challenge</h2>
      <p className={`vd-type-${size}`} aria-label={`${done} of ${goal} books`}>
        <span aria-hidden="true">{count ? <CountUp to={done} /> : done} of {goal}</span>
      </p>
      <p className="rp-muted">{left} to go by December, {pace}.</p>
      <div className="rp-bar" role="progressbar" aria-label="Challenge progress" aria-valuenow={done} aria-valuemin={0} aria-valuemax={goal}>
        <span style={{ inlineSize: `${(done / goal) * 100}%` }} className={count ? 'is-filling' : undefined} />
      </div>
    </section>
  );
}

/** What the reader has open now: cover, title, author, and how far in. */
export function NowReading({ books, size = 'md', id = 'now', heading = 'Currently reading', action }) {
  return (
    <section className="rp-now" aria-labelledby={id}>
      <h2 className="vd-type-eyebrow" id={id}>{heading}</h2>
      <ul className={`rp-now__list rp-now__list--${size}`}>
        {books.map((b) => (
          <li key={b.title} className="rp-now__book">
            <Cover size={size} title={b.title} author={b.author} />
            <div className="rp-now__text">
              <p className="rp-book">{b.title}</p>
              <p className="rp-muted">by {b.author}</p>
              <div className="rp-bar rp-bar--thin" role="progressbar" aria-label={`${b.title}, page ${b.page} of ${b.pages}`} aria-valuenow={b.page} aria-valuemin={0} aria-valuemax={b.pages}>
                <span style={{ inlineSize: `${(b.page / b.pages) * 100}%` }} />
              </div>
              <p className="rp-meta">Page {b.page} of {b.pages} · started {b.started}</p>
            </div>
          </li>
        ))}
      </ul>
      {action}
    </section>
  );
}

/** Recent reviews in Goodreads order: book, stars, excerpt, date. */
export function Reviews({ items, id = 'reviews', heading = 'Recent reviews', large = false }) {
  return (
    <section className="rp-reviews" aria-labelledby={id}>
      <h2 className="vd-type-eyebrow" id={id}>{heading}</h2>
      <ol className={large ? 'rp-reviews__list rp-reviews__list--large' : 'rp-reviews__list'}>
        {items.map((r) => (
          <li key={r.title} className="rp-review">
            <Cover size="md" title={r.title} />
            <article>
              <h3 className="rp-book">{r.title} <span className="rp-muted">by {r.author}</span></h3>
              <p className="rp-review__rating"><Stars value={r.rating} /> <time className="rp-meta">{r.date}</time></p>
              <p className={large ? 'rp-review__text vd-type-story' : 'rp-review__text'}>{r.text}</p>
              <p className="rp-meta"><a className="vd-ul" href="#review">Read more</a> · {r.likes} likes</p>
            </article>
          </li>
        ))}
      </ol>
      <Button as="a" href="#all-reviews" size="sm">All reviews</Button>
    </section>
  );
}

/** Books per month, skill chart recipe: one series in the accent wash with a line-strong edge. */
export function PerMonthChart({ id = 'chart' }) {
  const max = Math.max(...stats.perMonth);
  return (
    <figure className="rp-chart" aria-labelledby={id}>
      <figcaption className="rp-muted" id={id}>Books finished each month</figcaption>
      <ol className="rp-chart__bars">
        {stats.perMonth.map((n, i) => (
          <li key={months[i]} aria-label={`${months[i]}: ${n} books`}>
            <span className="rp-chart__n">{n}</span>
            <span className="rp-chart__bar" style={{ blockSize: `${(n / max) * 100}%` }} />
            <span className="rp-chart__m" aria-hidden="true">{months[i].slice(0, 1)}</span>
          </li>
        ))}
      </ol>
    </figure>
  );
}

export function Identity({ size = 'lg' }) {
  return (
    <div className="rp-identity">
      <Avatar name={reader.name} size={size} />
      <div>
        <p className="rp-book">{reader.name}</p>
        <p className="rp-meta">{reader.place} · reading here since {reader.since} · {reader.totalRead} books</p>
      </div>
    </div>
  );
}
