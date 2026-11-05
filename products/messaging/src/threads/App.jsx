import { useMemo, useRef, useState } from 'react';
import { Nav, NavList, List, Avatar, Tag, Button, Input, IconHash, IconSearch } from '../shared/ds.js';
import { threads as seed, channels, people, me, firstName } from '../shared/data.js';
import { Thread } from '../shared/Thread.jsx';
import { Composer } from '../shared/Composer.jsx';
import './threads.css';

// Direction 1, Threads first. The conversation is the unit; channels are filters behind it.
// Question: "Where did my conversations get to?" The list keeps the order it had when you arrived:
// new replies are marked in place and nothing moves under your finger.

const unreadOf = (t) => { const i = t.replies.findIndex((r) => r.id === t.lastRead); return i < 0 ? 0 : t.replies.length - 1 - i; };
const firstUnreadOf = (t) => { const i = t.replies.findIndex((r) => r.id === t.lastRead); return t.replies[i + 1]?.id; };
const who = (t) => {
  const names = t.people.map((p) => (p === me ? 'you' : firstName(p)));
  return names.length > 3 ? `${names.slice(0, 2).join(', ')} and ${names.length - 2} others` : names.join(', ').replace(/, ([^,]*)$/, ' and $1');
};
const reduce = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

export function App() {
  const [threads, setThreads] = useState(seed);
  const [filter, setFilter] = useState('all');
  const [openId, setOpenId] = useState('t-goals');
  const [flashId, setFlashId] = useState(null);
  const [phoneView, setPhoneView] = useState('list');
  const scroller = useRef(null);

  // The order is fixed at arrival. Filtering hides rows, it never reorders them.
  const visible = useMemo(() => threads.filter((t) => filter === 'all' || t.channel === filter), [threads, filter]);
  const withNew = threads.filter((t) => unreadOf(t) > 0).length;
  const open = threads.find((t) => t.id === openId);
  const firstUnread = open && firstUnreadOf(open);
  const newCount = open ? unreadOf(open) : 0;

  const openThread = (id) => { setOpenId(id); setFlashId(null); setPhoneView('thread'); };

  // The signature moment: jump straight to the first reply you have not read.
  const jump = () => {
    const el = document.getElementById(`new-${firstUnread}`);
    el?.scrollIntoView({ behavior: reduce() ? 'auto' : 'smooth', block: 'start' });
    setFlashId(firstUnread);
    setThreads((ts) => ts.map((t) => (t.id === openId ? { ...t, lastRead: t.replies.at(-1).id, seenFrom: firstUnread } : t)));
  };

  const send = (text) => {
    const id = `new-${Date.now()}`;
    const now = new Date().toTimeString().slice(0, 5).replace(/^0/, '');
    const add = (status) => setThreads((ts) => ts.map((t) => (t.id !== openId ? t : {
      ...t,
      lastRead: id,
      replies: status === 'add' ? [...t.replies, { id, author: me, time: now, text, status: 'sending' }] : t.replies.map((r) => (r.id === id ? { ...r, status: undefined } : r)),
    })));
    add('add');
    setTimeout(() => add('sent'), 700);
    requestAnimationFrame(() => scroller.current?.scrollTo({ top: scroller.current.scrollHeight }));
  };

  const retry = (id) => setThreads((ts) => ts.map((t) => ({ ...t, replies: t.replies.map((r) => (r.id === id ? { ...r, status: undefined } : r)) })));

  return (
    <div className="app" data-accent="teal">
      <Nav
        brand="Kite"
        sticky={false}
        bordered
        label="Views"
        actions={<>
          <Input label="Search Kite" hideLabel placeholder="Search" leading={<IconSearch />} className="tf-search" />
          <Avatar name={people[me].name} size="sm" status="live" />
        </>}
      >
        <Nav.Link href="#threads" current>Threads</Nav.Link>
        <Nav.Link href="#channels">Channels</Nav.Link>
        <Nav.Link href="#direct">Direct messages</Nav.Link>
      </Nav>

      <div className="app__body tf" data-phone={phoneView}>
        <aside className="panel panel--line tf-side">
          <NavList label="Show threads from">
            <NavList.Heading>New replies by channel</NavList.Heading>
            <NavList.Item as="button" current={filter === 'all'} onClick={() => setFilter('all')}>All channels</NavList.Item>
            {channels.map((c) => (
              <NavList.Item key={c.id} as="button" leading={<IconHash />} current={filter === c.id} onClick={() => setFilter(c.id)}
                trailing={<span className="tf-count">{threads.filter((t) => t.channel === c.id && unreadOf(t) > 0).length || ''}</span>}>
                {c.name}
              </NavList.Item>
            ))}
          </NavList>
        </aside>

        <section className="panel panel--line tf-list" aria-labelledby="tf-q">
          <header className="tf-list__head">
            <p className="vd-type-eyebrow" id="tf-q">Threads you follow</p>
            <p className="vd-type-stat-sm">{withNew} with new replies</p>
            <p className="tf-muted">In the order they had when you arrived at 10:14. New replies are marked where they are.</p>
          </header>

          <div className="tf-tabs" role="tablist" aria-label="Show threads from">
            {['all', ...channels.map((c) => c.id)].map((id) => (
              <button key={id} role="tab" aria-selected={filter === id} className="tf-tab vd-ul" onClick={() => setFilter(id)}>{id === 'all' ? 'All' : `#${id}`}</button>
            ))}
          </div>

          {visible.length ? (
            <List className="tf-rows">
              {visible.map((t) => {
                const n = unreadOf(t);
                return (
                  <List.Item
                    key={t.id}
                    as="button"
                    selected={t.id === openId}
                    onClick={() => openThread(t.id)}
                    leading={<Avatar name={people[t.root.author].name} size="sm" />}
                    title={t.root.text}
                    meta={`#${t.channel} · ${who(t)}`}
                    trailing={n ? <Tag variant="accent">{n} new</Tag> : <time className="tf-time">{t.replies.at(-1).time}</time>}
                  />
                );
              })}
            </List>
          ) : (
            <div className="tf-empty">
              <p className="vd-type-title">No threads in #{filter} yet</p>
              <p className="tf-muted">A thread starts when someone replies to a message in the channel.</p>
              <Button size="sm" onClick={() => setFilter('all')}>Show all channels</Button>
            </div>
          )}
        </section>

        <section className="panel tf-open" aria-labelledby="tf-title">
          {open && (
            <>
              <header className="tf-open__head">
                <Button className="tf-back" variant="ghost" size="sm" onClick={() => setPhoneView('list')}>Back to threads</Button>
                <p className="vd-type-eyebrow">#{open.channel}</p>
                <h1 className="vd-type-title" id="tf-title">{open.root.text.split('. ')[0]}</h1>
                <div className="tf-open__actions">
                  {newCount > 0 ? (
                    <Button size="sm" onClick={jump}>Jump to {newCount} new {newCount === 1 ? 'reply' : 'replies'}</Button>
                  ) : (
                    <p className="tf-muted">You are up to date in this thread.</p>
                  )}
                </div>
              </header>
              <div className="tf-open__scroll" ref={scroller}>
                <Thread label="Messages" messages={[open.root, ...open.replies]} firstUnread={firstUnread ?? open.seenFrom} flashId={flashId} onRetry={retry} />
              </div>
              <footer className="tf-open__composer">
                <Composer label={`Reply in thread in #${open.channel}`} placeholder={`Reply to ${firstName(open.root.author)}`} onSend={send} />
              </footer>
            </>
          )}
        </section>
      </div>
    </div>
  );
}
