import { useEffect, useMemo, useRef, useState } from 'react';
import { Nav, NavList, List, Avatar, Button, Modal, Input, IconHash, IconSearch } from '../../src/shared/ds.js';
import { channels as seedChannels, channelMessages, people, me, firstName } from '../../src/shared/data.js';
import { Thread } from '../../src/shared/Thread.jsx';
import { Composer } from '../../src/shared/Composer.jsx';
import './keyboard.css';

// Direction 3, Keyboard first. A command bar drives everything; the screen is one wide conversation.
// Question: "Where do I need to be next?" Organised by channel, reached by typing.
// Signature moment: type a few letters, press Enter, and you are there, with no animation in the way.

const isMac = typeof navigator !== 'undefined' && /Mac/.test(navigator.platform);
const MOD = isMac ? '⌘' : 'Ctrl';
const now = () => new Date().toTimeString().slice(0, 5).replace(/^0/, '');

// Show which typed letters matched, in weight, so it never relies on colour.
function Match({ text, query }) {
  const i = query ? text.toLowerCase().indexOf(query.toLowerCase()) : -1;
  if (i < 0) return text;
  return <>{text.slice(0, i)}<strong>{text.slice(i, i + query.length)}</strong>{text.slice(i + query.length)}</>;
}

export function App() {
  const [channels, setChannels] = useState(seedChannels);
  const [current, setCurrent] = useState('launch');
  const [sent, setSent] = useState({});
  const [barOpen, setBarOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const composerRef = useRef(null);

  const go = (id) => {
    setCurrent(id);
    setChannels((cs) => cs.map((c) => (c.id === id ? { ...c, unread: 0, mention: false } : c)));
    setBarOpen(false);
    setQuery('');
    requestAnimationFrame(() => composerRef.current?.querySelector('textarea')?.focus());
  };

  const commands = useMemo(() => [
    ...channels.map((c, i) => ({ id: `ch-${c.id}`, label: `#${c.name}`, hint: c.unread ? `${c.unread} new` : c.topic, keys: `Alt ${i + 1}`, run: () => go(c.id), icon: <IconHash /> })),
    { id: 'new', label: 'New message', hint: `In #${current}`, keys: '/', run: () => { setBarOpen(false); setQuery(''); requestAnimationFrame(() => composerRef.current?.querySelector('textarea')?.focus()); } },
    { id: 'mentions', label: 'Go to mentions', hint: channels.some((c) => c.mention) ? `${channels.filter((c) => c.mention).length} channels mention you` : 'Nobody has mentioned you', keys: '', run: () => { const c = channels.find((x) => x.mention); if (c) go(c.id); else setBarOpen(false); } },
    { id: 'read-all', label: 'Mark all as read', hint: `${channels.reduce((n, c) => n + c.unread, 0)} unread`, keys: 'Shift Esc', run: () => { setChannels((cs) => cs.map((c) => ({ ...c, unread: 0, mention: false }))); setBarOpen(false); } },
    ...['maya', 'dev', 'asha'].map((p) => ({ id: `dm-${p}`, label: `Message ${people[p].name}`, hint: people[p].role, keys: '', run: () => setBarOpen(false), icon: <Avatar name={people[p].name} size="xs" /> })),
  ], [channels, current]);

  const results = commands.filter((c) => c.label.toLowerCase().includes(query.toLowerCase()));

  const openBar = () => { setBarOpen(true); setActive(0); };

  // Global keys: Mod K opens the bar, Alt and a number jumps to a channel, Shift Esc marks all read.
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setBarOpen(true); setActive(0); }
      else if (e.altKey && /^Digit[1-9]$/.test(e.code)) { const c = channels[Number(e.code.slice(5)) - 1]; if (c) { e.preventDefault(); go(c.id); } }
      else if (e.shiftKey && e.key === 'Escape') { setChannels((cs) => cs.map((c) => ({ ...c, unread: 0, mention: false }))); }
      else if (e.key === '/' && !/INPUT|TEXTAREA/.test(document.activeElement?.tagName)) { e.preventDefault(); composerRef.current?.querySelector('textarea')?.focus(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [channels]);

  const onBarKey = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive((a) => Math.min(a + 1, results.length - 1)); }
    if (e.key === 'ArrowUp') { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
    if (e.key === 'Enter') { e.preventDefault(); results[active]?.run(); }
  };

  const channel = channels.find((c) => c.id === current);
  const messages = [...(channelMessages[current] ?? []), ...(sent[current] ?? [])];
  const send = (text) => {
    const id = `s-${Date.now()}`;
    setSent((s) => ({ ...s, [current]: [...(s[current] ?? []), { id, author: me, time: now(), text, status: 'sending' }] }));
    setTimeout(() => setSent((s) => ({ ...s, [current]: s[current].map((m) => (m.id === id ? { ...m, status: undefined } : m)) })), 700);
  };
  const members = new Set(messages.map((m) => m.author)).size;

  return (
    <div className="app" data-accent="teal">
      <Nav brand="Kite" sticky={false} bordered label="Views"
        actions={<Avatar name={people[me].name} size="sm" status="live" />}>
        <button type="button" className="kb-trigger" onClick={openBar}>
          <IconSearch /><span>Jump to or do anything</span><kbd>{MOD} K</kbd>
        </button>
      </Nav>

      <div className="app__body kb">
        <aside className="panel panel--line kb-rail">
          <NavList label="Channels">
            <NavList.Heading>Channels</NavList.Heading>
            {channels.map((c, i) => (
              <NavList.Item key={c.id} as="button" leading={<IconHash />} current={c.id === current} unread={c.unread > 0}
                onClick={() => go(c.id)} trailing={<span className="kb-keys">{c.unread ? <b>{c.unread}</b> : null}<kbd>Alt {i + 1}</kbd></span>}>
                {c.name}
              </NavList.Item>
            ))}
          </NavList>
        </aside>

        <main className="panel kb-main" aria-labelledby="kb-title">
          <header className="kb-head vd-container kb-measure">
            {/* Phones have no keyboard and no bar centre: the trigger moves into the page. */}
            <button type="button" className="kb-trigger kb-trigger--phone" onClick={openBar}><IconSearch /><span>Jump to a channel or a person</span></button>
            <p className="vd-type-eyebrow">Channel</p>
            <h1 className="vd-type-stat-sm" id="kb-title">#{channel.name}</h1>
            <p className="kb-muted">{channel.topic} · {members} {members === 1 ? 'person' : 'people'} talking</p>
          </header>
          <div className="kb-scroll">
            <div className="vd-container kb-measure">
              {messages.length ? (
                <Thread label={`Messages in #${channel.name}`} messages={messages} />
              ) : (
                <div className="kb-empty">
                  <p className="vd-type-title">No messages in #{channel.name} yet</p>
                  <p className="kb-muted">Say what this channel is for, so people know when to use it.</p>
                  <Button size="sm" onClick={() => composerRef.current?.querySelector('textarea')?.focus()}>Write the first message</Button>
                </div>
              )}
            </div>
          </div>
          <footer className="kb-composer" ref={composerRef}>
            <div className="vd-container kb-measure">
              <Composer label={`Message #${channel.name}`} placeholder={`Message #${channel.name}`} onSend={send}
                hint={`Enter to send · Shift and Enter for a new line · ${MOD} K to jump · Alt and a number for a channel`} />
            </div>
          </footer>
        </main>
      </div>

      {/* A command bar is a field, not a dialog: no heading, no close button, Escape closes it. */}
      <Modal open={barOpen} onClose={() => { setBarOpen(false); setQuery(''); }} label="Jump to or do anything" placement="top" initialFocus="kb-input" className="kb-bar">
        <Input id="kb-input" label="Type a channel, a person or an action" hideLabel placeholder="Type a channel, a person or an action" leading={<IconSearch />}
          value={query} onChange={(e) => { setQuery(e.target.value); setActive(0); }} onKeyDown={onBarKey}
          role="combobox" aria-expanded="true" aria-controls="kb-results" aria-activedescendant={results[active] ? `kb-${results[active].id}` : undefined} />
        {results.length ? (
          <List density="dense" divided={false} id="kb-results" role="listbox" className="kb-results">
            {results.map((r, i) => (
              <List.Item key={r.id} id={`kb-${r.id}`} as="button" role="option" aria-selected={i === active} selected={i === active} tabIndex={-1}
                onMouseMove={() => setActive(i)} onClick={r.run} leading={r.icon} title={<Match text={r.label} query={query} />} meta={r.hint}
                trailing={r.keys ? <kbd>{r.keys}</kbd> : null} />
            ))}
          </List>
        ) : (
          <p className="kb-muted kb-none">Nothing matches “{query}”. Try a channel name like “launch”.</p>
        )}
      </Modal>
    </div>
  );
}
