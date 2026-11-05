import { useMemo, useRef, useState } from 'react';
import { Nav, NavList, Avatar, Tag, Button, Input, IconSearch, IconHash } from '../shared/ds.js';
import { threads, channelMessages, directMessages, channels, people, me, firstName } from '../shared/data.js';
import { Thread } from '../shared/Thread.jsx';
import { Composer } from '../shared/Composer.jsx';
import './people.css';

// Direction 3, People first. The people you work with are the unit; channels and threads sit inside each person.
// Question: "What's going on with the people I work with?" Organised by person, most recent first.
// Gives up: seeing a channel as a whole. Signature moment: opening a person, their conversations from
// different channels join into one timeline, each message labelled with where it happened.

const DAY = { Monday: 0, Yesterday: 1, Today: 2 };
const mins = (t) => { const [h, m] = t.split(':').map(Number); return h * 60 + m; };
const order = (m) => (DAY[m.day ?? 'Today'] ?? 0) * 1440 + mins(m.time);
const now = () => new Date().toTimeString().slice(0, 5).replace(/^0/, '');
const DM = 'Direct message';

// Everything between you and one person, from every channel, thread and DM, oldest first.
function timelineWith(p) {
  const items = [];
  threads.filter((t) => t.people.includes(p)).forEach((t) => {
    const read = t.replies.findIndex((r) => r.id === t.lastRead);
    [t.root, ...t.replies].forEach((m, i) => {
      if (m.author === p || m.author === me) items.push({ ...m, where: `#${t.channel} thread`, channel: t.channel, unread: m.author === p && i - 1 > read });
    });
  });
  Object.entries(channelMessages).forEach(([c, ms]) => ms.forEach((m) => {
    if (m.author === p && !m.thread && m.text.includes('@Rohan')) items.push({ ...m, where: `#${c}`, channel: c, unread: true });
  }));
  (directMessages[p] ?? []).forEach((m) => items.push({ ...m, where: DM, channel: 'dm', unread: m.author === p && !m.day }));
  return items.sort((a, b) => order(a) - order(b));
}

const everyone = Object.keys(people).filter((p) => p !== me).map((id) => {
  const items = timelineWith(id);
  return { id, items, last: items.at(-1), unread: items.filter((m) => m.unread).length };
});
const active = everyone.filter((p) => p.last).sort((a, b) => order(b.last) - order(a.last));
const quiet = everyone.filter((p) => !p.last);

export function App() {
  const [openId, setOpenId] = useState(active[0].id);
  const [seen, setSeen] = useState({});
  const [sent, setSent] = useState({});
  const [where, setWhere] = useState('all');
  const [sendIn, setSendIn] = useState(DM);
  const [phoneView, setPhoneView] = useState('list');
  const scroller = useRef(null);

  const person = everyone.find((p) => p.id === openId);
  const lanes = useMemo(() => [...new Set(person.items.map((m) => m.channel))], [person]);
  const shared = lanes.filter((c) => c !== 'dm');
  const timeline = [...person.items, ...(sent[openId] ?? [])]
    .filter((m) => where === 'all' || m.channel === where)
    .map((m) => ({ ...m, lane: lanes.indexOf(m.channel) }));
  const firstUnread = !seen[openId] ? person.items.find((m) => m.unread)?.id : undefined;

  const openPerson = (id) => {
    setSeen((s) => ({ ...s, [openId]: true }));
    setOpenId(id); setWhere('all'); setSendIn(DM); setPhoneView('person');
  };

  const send = (text) => {
    const id = `s-${Date.now()}`;
    const channel = sendIn === DM ? 'dm' : sendIn.slice(1);
    const add = (status) => setSent((s) => ({ ...s, [openId]: status === 'add'
      ? [...(s[openId] ?? []), { id, author: me, time: now(), text, where: sendIn, channel, status: 'sending' }]
      : s[openId].map((m) => (m.id === id ? { ...m, status: undefined } : m)) }));
    add('add');
    setTimeout(() => add('sent'), 700);
    requestAnimationFrame(() => scroller.current?.scrollTo({ top: scroller.current.scrollHeight }));
  };

  const row = (p) => (
    <NavList.Item key={p.id} as="button" current={p.id === openId} unread={p.unread > 0 && !seen[p.id]} onClick={() => openPerson(p.id)}
      leading={<Avatar name={people[p.id].name} size="xs" status={people[p.id].live ? 'live' : undefined} />}
      trailing={p.unread > 0 && !seen[p.id] ? <Tag variant="accent">{p.unread}</Tag> : <time className="pf-time">{p.last?.day ?? p.last?.time}</time>}>
      <span className="pf-who">
        <span>{people[p.id].name}</span>
        {p.last && <span className="pf-last">{p.last.where === DM ? '' : `${p.last.where} · `}{p.last.text}</span>}
      </span>
    </NavList.Item>
  );

  return (
    <div className="app" data-accent="teal">
      <Nav brand="Kite" sticky={false} bordered label="Views"
        actions={<>
          <Input label="Search people and messages" hideLabel placeholder="Search" leading={<IconSearch />} className="pf-search" />
          <Avatar name={people[me].name} size="sm" status="live" />
        </>}>
        <Nav.Link href="#people" current>People</Nav.Link>
        <Nav.Link href="#channels">Channels</Nav.Link>
        <Nav.Link href="#threads">Threads</Nav.Link>
      </Nav>

      <div className="app__body pf" data-phone={phoneView}>
        <aside className="panel panel--line pf-side" aria-labelledby="pf-q">
          <header className="pf-side__head">
            <p className="vd-type-eyebrow" id="pf-q">People you work with</p>
            <p className="pf-muted">Most recent first. Everything between you, from every channel.</p>
          </header>
          <NavList label="People, most recent first">{active.map(row)}</NavList>
          {quiet.length > 0 && (
            <NavList label="People you have not talked to this week">
              <NavList.Heading>Quiet this week</NavList.Heading>
              {quiet.map(row)}
            </NavList>
          )}
          <NavList label="Channels">
            <NavList.Heading>Channels</NavList.Heading>
            {channels.map((c) => (
              <NavList.Item key={c.id} as="a" href={`#${c.id}`} leading={<IconHash />} unread={c.unread > 0}
                trailing={c.unread ? <span className="pf-count">{c.unread}</span> : null}>{c.name}</NavList.Item>
            ))}
          </NavList>
        </aside>

        <section className="panel pf-open" aria-labelledby="pf-name">
          <header className="pf-open__head">
            <Button className="pf-back" variant="ghost" size="sm" onClick={() => setPhoneView('list')}>Back to people</Button>
            <p className="pf-role">{people[openId].role}</p>
            <h1 className="vd-type-heading" id="pf-name">{people[openId].name}</h1>
            {person.items.length > 0 && (
              <p className="pf-muted">{person.items.length} messages between you, from {shared.length} {shared.length === 1 ? 'channel' : 'channels'}{lanes.includes('dm') ? ' and direct messages' : ''}.</p>
            )}
            {lanes.length > 1 && (
              <div className="pf-tabs" role="tablist" aria-label="Show messages from">
                {['all', ...lanes].map((c) => (
                  <button key={c} role="tab" aria-selected={where === c} className="pf-tab vd-ul-tab" onClick={() => setWhere(c)}>
                    {c === 'all' ? 'Everything' : c === 'dm' ? 'Direct' : `#${c}`}
                  </button>
                ))}
              </div>
            )}
          </header>

          <div className="pf-open__scroll" ref={scroller}>
            {timeline.length ? (
              <Thread key={openId} label={`Everything between you and ${firstName(openId)}`} messages={timeline} firstUnread={firstUnread} />
            ) : (
              <div className="pf-empty">
                <p className="vd-type-title">Nothing between you and {firstName(openId)} yet</p>
                <p className="pf-muted">Messages you share in any channel, thread or direct message will gather here.</p>
              </div>
            )}
          </div>

          <footer className="pf-open__composer">
            <label className="pf-sendin">
              <span>Send in</span>
              <select className="select" value={sendIn} onChange={(e) => setSendIn(e.target.value)}>
                <option>{DM}</option>
                {shared.map((c) => <option key={c}>#{c}</option>)}
              </select>
            </label>
            <Composer label={`Message ${firstName(openId)} in ${sendIn}`} placeholder={sendIn === DM ? `Message ${firstName(openId)}` : `Message ${sendIn}, mentioning ${firstName(openId)}`} onSend={send} />
          </footer>
        </section>
      </div>
    </div>
  );
}
