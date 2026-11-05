import { accentOr } from '../shared/boot.js';
import { useEffect, useRef, useState } from 'react';
import { Nav, List, Avatar, Tag, Button, Input, IconSearch } from '../shared/ds.js';
import { needsYou as seedNeeds, waitingOnOthers, channels, people, me, firstName, threadById, channelMessages } from '../shared/data.js';
import { Thread } from '../shared/Thread.jsx';
import { Composer } from '../shared/Composer.jsx';
import './needs-you.css';

// Direction 2, Needs you. One inbox of only what needs your reply or decision; everything else waits.
// There is no channel sidebar: channels live under Everything else, below what needs you.
// Question: "What needs me right now?" Organised by status. Signature moment: clearing the last item
// settles the screen into "You're all caught up."

const dmMessages = { 'dm-maya': [{ id: 'dm1', author: 'maya', time: '10:11', text: 'Free for 10 minutes before lunch? I want your eyes on the goals chart.' }] };
const now = () => new Date().toTimeString().slice(0, 5).replace(/^0/, '');
// Deadlines first, soonest first; then everything else oldest first.
const mins = (t) => { const [h, m] = t.split(':').map(Number); return h * 60 + m; };
const byUrgency = (a, b) => (a.dueBy ? mins(a.dueBy) : Infinity) - (b.dueBy ? mins(b.dueBy) : Infinity) || mins(a.time) - mins(b.time);
const reduce = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

// What the right pane shows for an item: its thread, a DM, or a channel.
function conversationFor(open) {
  if (open.kind === 'channel') return { eyebrow: `#${open.id}`, title: channels.find((c) => c.id === open.id).topic, messages: channelMessages[open.id], replyTo: `#${open.id}` };
  if (open.dm) return { eyebrow: 'Direct message', title: people[open.from].name, messages: dmMessages[open.dm], replyTo: firstName(open.from) };
  const t = threadById(open.thread);
  return { eyebrow: `#${t.channel}`, title: open.text, messages: [t.root, ...t.replies], replyTo: firstName(open.from ?? open.who) };
}

export function App() {
  const [unsorted, setNeeds] = useState(seedNeeds);
  const needs = [...unsorted].sort(byUrgency);
  const [openId, setOpenId] = useState([...seedNeeds].sort(byUrgency)[0].id);
  const [sent, setSent] = useState({});
  const [toast, setToast] = useState(null);
  const [phoneView, setPhoneView] = useState('inbox');
  const toastTimer = useRef();

  const everything = channels.filter((c) => c.unread > 0);
  const busiest = [...everything].sort((a, b) => b.unread - a.unread)[0];
  const allItems = [...needs, ...waitingOnOthers, ...everything.map((c) => ({ id: `c-${c.id}`, kind: 'channel', ...c }))];
  const open = allItems.find((i) => i.id === openId) ?? (needs[0] || null);
  const convo = open && conversationFor(open);
  const messages = convo ? [...convo.messages, ...(sent[open.id] ?? [])] : [];

  const showToast = (t) => { setToast(t); clearTimeout(toastTimer.current); toastTimer.current = setTimeout(() => setToast(null), 5000); };
  useEffect(() => () => clearTimeout(toastTimer.current), []);

  const done = (item) => {
    const rest = needs.filter((n) => n.id !== item.id);
    setNeeds(rest);
    setOpenId(rest[0]?.id ?? null);
    showToast({ text: `Moved out of Needs you: ${item.kind === 'Direct message' ? 'message from' : 'question from'} ${firstName(item.from)}.`, undo: () => { setNeeds((n) => seedNeeds.filter((s) => s.id === item.id || n.some((x) => x.id === s.id))); setOpenId(item.id); setToast(null); } });
    if (!rest.length) setPhoneView('inbox');
  };

  const send = (text) => {
    const id = `s-${Date.now()}`;
    setSent((s) => ({ ...s, [open.id]: [...(s[open.id] ?? []), { id, author: me, time: now(), text, status: 'sending' }] }));
    setTimeout(() => setSent((s) => ({ ...s, [open.id]: s[open.id].map((m) => (m.id === id ? { ...m, status: undefined } : m)) })), 700);
    // Replying to something that needs you is the most common way it gets done.
    if (needs.some((n) => n.id === open.id)) setTimeout(() => done(open), 900);
  };

  const openItem = (id) => { setOpenId(id); setPhoneView('convo'); };
  const isNeed = open && needs.some((n) => n.id === open.id);

  return (
    <div className="app" data-accent={accentOr('teal')}>
      <Nav brand="Kite" sticky={false} wide bordered label="Views"
        actions={<>
          <Input label="Search Kite" hideLabel placeholder="Search" leading={<IconSearch />} className="ny-search" />
          <Avatar name={people[me].name} size="sm" status="live" />
        </>}
      >
        <Nav.Link href="#needs" current>Needs you</Nav.Link>
        <Nav.Link href="#channels">Channels</Nav.Link>
        <Nav.Link href="#direct">Direct messages</Nav.Link>
      </Nav>

      <div className="app__body ny" data-phone={phoneView}>

        <section className="panel panel--line ny-inbox" aria-labelledby="ny-q">
          <header className="ny-head">
            <p className="vd-type-eyebrow" id="ny-q">What needs you right now</p>
            {needs.length ? (
              <>
                <p className="vd-type-stat-sm">{needs.length} {needs.length === 1 ? 'needs' : 'need'} you</p>
                <p className="ny-muted">Deadlines first, then oldest first. Reply, or mark it done, and it leaves this list.</p>
              </>
            ) : (
              <p className="ny-muted">Nothing needs your reply right now.</p>
            )}
          </header>

          {needs.length > 0 && (
            <List className="ny-rows ny-rows--needs">
              {needs.map((n) => (
                <List.Item key={n.id} as="button" selected={open?.id === n.id} onClick={() => openItem(n.id)}
                  leading={<Avatar name={people[n.from].name} size="sm" />}
                  title={n.channel ? `${firstName(n.from)} in #${n.channel}` : `${firstName(n.from)}, direct message`}
                  meta={n.text}
                  trailing={<span className="ny-when"><time className="ny-time">{n.time}</time>{n.due && <Tag variant="accent">{n.due}</Tag>}</span>}
                />
              ))}
            </List>
          )}

          <h2 className="ny-group vd-type-eyebrow">Waiting on others</h2>
          <List className="ny-rows ny-rows--quiet">
            {waitingOnOthers.map((o) => (
              <List.Item key={o.id} as="button" selected={open?.id === o.id} onClick={() => openItem(o.id)}
                leading={<Avatar name={people[o.who].name} size="sm" />} title={o.text} meta={`#${o.channel}`} trailing={<time className="ny-time">{o.time}</time>} />
            ))}
          </List>

          <h2 className="ny-group vd-type-eyebrow">Everything else</h2>
          <List className="ny-rows ny-rows--quiet">
            {everything.map((c) => (
              <List.Item key={c.id} as="button" selected={open?.id === `c-${c.id}`} onClick={() => openItem(`c-${c.id}`)}
                title={`#${c.name}`} meta={c.topic} trailing={<span className="ny-time">{c.unread} new</span>} />
            ))}
          </List>
        </section>

        <section className="panel ny-convo" aria-labelledby="ny-title">
          {convo ? (
            <>
              <header className="ny-convo__head">
                <Button className="ny-back" variant="ghost" size="sm" onClick={() => setPhoneView('inbox')}>Back to inbox</Button>
                <p className="ny-where">{convo.eyebrow}</p>
                <h1 className="vd-type-title" id="ny-title">{convo.title}</h1>
                {isNeed && <div className="ny-convo__actions"><Button size="sm" onClick={() => done(open)}>Mark as done</Button></div>}
              </header>
              <div className="ny-convo__scroll"><Thread label="Messages" messages={messages} renderAfter={(m) => m.thread && <p className="ny-replies">{threadById(m.thread).replies.length} replies</p>} /></div>
              <footer className="ny-convo__composer">
                <Composer label={`Reply to ${convo.replyTo}`} placeholder={`Reply to ${convo.replyTo}`} onSend={send} />
              </footer>
            </>
          ) : needs.length === 0 ? (
            // The signature moment: the last thing needing you is cleared, and the big pane settles.
            // Built from the system: one display line, the eyebrow, muted text and one next step.
            <div className="ny-caught" aria-live="polite">
              <p className="vd-type-eyebrow">Needs you</p>
              <p className="vd-type-display">You’re all caught up.</p>
              <p className="ny-caught__more">Nothing needs your reply. {waitingOnOthers.length} things wait on others, and {everything.length} channels have news on the left.</p>
              {busiest && <Button onClick={() => openItem(`c-${busiest.id}`)}>Open #{busiest.name}, {busiest.unread} new</Button>}
            </div>
          ) : (
            <div className="ny-convo__empty">
              <p className="vd-type-title">Nothing open</p>
              <p className="ny-muted">Pick a channel or a message on the left.</p>
            </div>
          )}
        </section>
      </div>

      {toast && (
        <div className="ny-toast" role="status" aria-live="polite">
          <span>{toast.text}</span>
          <Button variant="ghost" size="sm" onClick={toast.undo}>Undo</Button>
        </div>
      )}
    </div>
  );
}
