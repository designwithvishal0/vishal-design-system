import { useEffect, useRef, useState } from 'react';
import { Avatar, Button, Card, Input, Nav, Tag, IconPlus, IconClose } from '../../../../design-system/src/index.js';
import { IconCheck, IconBack, IconChevron, IconFile } from './icons.jsx';
import {
  TODAY, policy, members, kinds, docTypes, steps, seedClaims, money, day, time, size, memberOf,
  coverLeft, estimate, addWorkingDays, needed,
} from './data.js';

// ?accent=orange, violet, amber, teal or sky shows the flow in another product colour; teal without it.
const asked = new URLSearchParams(location.search).get('accent');
const accent = ['orange', 'violet', 'amber', 'teal', 'sky'].includes(asked) ? asked : 'teal';

const MAX_FILE = 10e6;
const emptyForm = { member: '', hospital: '', treatment: '', kind: 'stay', from: '', to: '', amount: '', files: {} };
// What comes back: the approved amount once there is one, until then the estimate.
const backFor = (c, left) => c.approved ?? estimate(c.amount, c.member, left).back;
const stepIndex = { sent: 1, needs: 1, review: 1, approved: 3, paid: 4 }; // the step in progress

export function App() {
  const [claims, setClaims] = useState(seedClaims);
  const [view, setView] = useState({ name: 'home' });
  const [form, setForm] = useState(emptyForm);
  const [toast, setToast] = useState('');
  const left = coverLeft(claims);
  const needsYou = claims.filter((c) => c.state === 'needs');

  useEffect(() => { if (!toast) return; const t = setTimeout(() => setToast(''), 5000); return () => clearTimeout(t); }, [toast]);
  useEffect(() => { window.scrollTo(0, 0); document.getElementById('page-title')?.focus({ preventScroll: true }); }, [view.name, view.id]);

  const send = () => {
    const amount = Number(form.amount);
    const claim = {
      id: `CLM-${25211 + claims.length - seedClaims.length}`, member: form.member, hospital: form.hospital.trim(),
      treatment: form.treatment.trim(), kind: form.kind, from: form.from, to: form.kind === 'stay' ? form.to : form.from,
      amount, state: 'sent', sentAt: TODAY.toISOString(),
      files: Object.entries(form.files).flatMap(([type, list]) => list.map((f) => ({ ...f, type }))), fresh: true,
    };
    setClaims([claim, ...claims]);
    setForm(emptyForm);
    setView({ name: 'claim', id: claim.id });
  };

  const answer = (id, file) => {
    setClaims(claims.map((c) => (c.id === id ? { ...c, state: 'review', ask: undefined, files: [...c.files, { ...file, type: c.ask.doc }] } : c)));
    setToast(`${docTypes.find((t) => t.id === claims.find((c) => c.id === id).ask.doc).label} sent to your insurer`);
  };

  const claim = view.name === 'claim' && claims.find((c) => c.id === view.id);
  const goHome = () => { setClaims((cs) => cs.map((c) => ({ ...c, fresh: false }))); setView({ name: 'home' }); };

  return (
    <div className="app" data-accent={accent}>
      <Nav
        brand={`${policy.company} benefits`}
        bordered
        persistent={<Avatar name="Ananya Iyer" size="sm" />}
      >
        <Nav.Link href="#claims" current onClick={(e) => { e.preventDefault(); goHome(); }}>
          Claims{needsYou.length > 0 && <Tag variant="solid" className="nav-count" aria-label={`${needsYou.length} needs you`}>{needsYou.length}</Tag>}
        </Nav.Link>
      </Nav>

      <main className="vd-container page">
        {view.name === 'home' && <Home claims={claims} left={left} needsYou={needsYou} open={(id) => setView({ name: 'claim', id })} start={() => setView({ name: 'new' })} />}
        {(view.name === 'new' || view.name === 'review') && (
          <NewClaim form={form} setForm={setForm} left={left} review={view.name === 'review'}
            onReview={() => setView({ name: 'review' })} onEdit={() => setView({ name: 'new' })}
            onCancel={() => { setForm(emptyForm); setView({ name: 'home' }); }} onSend={send} />
        )}
        {claim && <ClaimPage claim={claim} left={left} back={goHome} answer={answer} />}
      </main>

      <footer className="vd-container foot"><p>Concept · Sample claims and amounts, not real data · 2026</p></footer>

      <div className="toast-slot" role="status" aria-live="polite">
        {toast && <div className="toast">{toast}<Button variant="ghost" icon aria-label="Dismiss" onClick={() => setToast('')}><IconClose /></Button></div>}
      </div>
    </div>
  );
}

/* ---------- Home: the claims this year ---------- */

function Home({ claims, left, needsYou, open, start }) {
  const used = policy.cover - left;
  return (
    <div className="home">
      <header className="home__head">
        <h1 className="vd-type-heading" id="page-title" tabIndex={-1}>Your claims this year</h1>
        <Button variant="primary" onClick={start}><IconPlus />Start a claim</Button>
      </header>

      {needsYou.map((c) => (
        <Card key={c.id} variant="wash" className="needs">
          <p className="vd-type-eyebrow">Needs you</p>
          <h2 className="vd-type-title-sm">Add the signed {docTypes.find((t) => t.id === c.ask.doc).label.toLowerCase()} for {memberOf(c.member).name.split(' ')[0]}’s claim</h2>
          <p className="small">About {money(backFor(c, left))} is waiting on it. Your insurer asked on {day(c.ask.on)}.</p>
          <div><Button onClick={() => open(c.id)}>Open the claim</Button></div>
        </Card>
      ))}

      {claims.length === 0 ? (
        <div className="empty">
          <h2 className="vd-type-title-sm">No claims this year yet</h2>
          <p className="small muted">Paid a hospital or clinic bill? Claim it back within 30 days of the bill.</p>
        </div>
      ) : (
        <ul className="claims" aria-label="Claims">
          {claims.map((c) => (
            <li key={c.id}>
              <button className="claim-row" onClick={() => open(c.id)}>
                <span className="claim-row__main">
                  <span className="claim-row__title">{c.hospital}</span>
                  <span className="claim-row__meta">{memberOf(c.member).name} · {c.treatment} · {day(c.from)}</span>
                </span>
                <StatusTag claim={c} />
                <span className="num claim-row__amount">{money(backFor(c, left))}</span>
              </button>
            </li>
          ))}
        </ul>
      )}

      <section className="cover" id="cover" aria-labelledby="cover-title">
        <h2 className="vd-type-title-sm" id="cover-title">{money(left)} cover left this year</h2>
        <div className="bar" role="progressbar" aria-label="Cover used" aria-valuemin={0} aria-valuemax={policy.cover} aria-valuenow={used} aria-valuetext={`${money(used)} of ${money(policy.cover)} used`}>
          <span style={{ inlineSize: `${(used / policy.cover) * 100}%` }} />
        </div>
        <p className="small muted">{money(used)} used of {money(policy.cover)} for you, Rohan and Meera, until 31 March 2027.</p>
      </section>
    </div>
  );
}

function StatusTag({ claim }) {
  if (claim.state === 'needs') return <Tag variant="accent">Needs a document</Tag>;
  const label = { sent: 'Sent', review: 'Under review', approved: 'Approved', paid: `Paid ${day(claim.paidOn)}` }[claim.state];
  return <Tag>{label}</Tag>;
}

/* ---------- New claim and review: one page, the amount you get back beside it ---------- */

function validate(form, today) {
  const e = {};
  const req = needed(form.kind);
  if (!form.member) e.member = 'Choose who was treated.';
  if (!form.hospital.trim()) e.hospital = 'Add the hospital or clinic name, as it is on the bill.';
  if (!form.treatment.trim()) e.treatment = 'Say in a few words what it was for, like “Knee scan”.';
  if (!form.from) e.from = form.kind === 'stay' ? 'Add the date you were admitted.' : 'Add the date of treatment.';
  else if (form.from > today) e.from = 'This date is in the future. Check it against the bill.';
  if (form.kind === 'stay') {
    if (!form.to) e.to = 'Add the date you went home.';
    else if (form.from && form.to < form.from) e.to = 'Discharge can’t be before admission. Check the dates.';
  }
  const n = Number(form.amount);
  if (form.amount === '') e.amount = 'Add the amount you paid, from the final bill.';
  else if (!/^\d+$/.test(form.amount) || n <= 0) e.amount = 'Use whole rupees, numbers only, like 48200.';
  req.forEach((t) => { if (!form.files[t.id]?.length) e[`doc-${t.id}`] = `Add the ${t.label.toLowerCase()}.`; });
  return e;
}

function NewClaim({ form, setForm, left, review, onReview, onEdit, onCancel, onSend }) {
  const [touched, setTouched] = useState({});
  const [tried, setTried] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [fileErr, setFileErr] = useState({});
  const today = TODAY.toISOString().slice(0, 10);
  const errors = validate(form, today);
  const show = (k) => (tried || touched[k]) && errors[k];
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const blur = (k) => () => setTouched({ ...touched, [k]: true });
  const amount = /^\d+$/.test(form.amount) ? Number(form.amount) : 0;
  const est = estimate(amount, form.member, left);
  const member = memberOf(form.member);
  const req = needed(form.kind);
  const missing = Object.keys(errors);

  const addFiles = (type) => (e) => {
    const picked = [...e.target.files];
    e.target.value = '';
    const big = picked.find((f) => f.size > MAX_FILE);
    setFileErr({ ...fileErr, [type]: big ? `${big.name} is ${size(big.size)}. Files must be under 10 MB. Try a PDF or a phone photo.` : '' });
    const ok = picked.filter((f) => f.size <= MAX_FILE).map((f) => ({ name: f.name, size: f.size }));
    if (ok.length) setForm({ ...form, files: { ...form.files, [type]: [...(form.files[type] ?? []), ...ok] } });
  };
  const removeFile = (type, i) => setForm({ ...form, files: { ...form.files, [type]: form.files[type].filter((_, j) => j !== i) } });

  const next = () => {
    setTried(true);
    if (missing.length) { document.getElementById(fieldId(missing[0]))?.focus(); return; }
    onReview();
  };

  return (
    <div className="claim-layout">
      <div className="claim-main">
        <Button variant="ghost" className="back" onClick={review ? onEdit : onCancel}><IconBack />{review ? 'Back to edit' : 'Cancel'}</Button>
        <p className="vd-type-eyebrow">{review ? 'Check and send' : 'New claim'}</p>
        <h1 className="vd-type-heading" id="page-title" tabIndex={-1}>{review ? 'Is everything right?' : 'Claim back a medical bill'}</h1>

        {review ? (
          <dl className="review">
            <ReviewRow label="Who was treated">{member.name}, {member.relation.toLowerCase()}</ReviewRow>
            <ReviewRow label="Where">{form.hospital}</ReviewRow>
            <ReviewRow label="What for">{form.treatment}</ReviewRow>
            <ReviewRow label="When">{kinds.find((k) => k.id === form.kind).label}, {day(form.from)}{form.kind === 'stay' && ` to ${day(form.to)}`}</ReviewRow>
            <ReviewRow label="You paid"><span className="num">{money(amount)}</span></ReviewRow>
            <ReviewRow label="Documents">
              <ul className="plain">{Object.entries(form.files).flatMap(([t, list]) => list.map((f) => <li key={t + f.name}>{f.name} <span className="muted">· {docTypes.find((d) => d.id === t).label}</span></li>))}</ul>
            </ReviewRow>
            <ReviewRow label="Paid to">{policy.account}, from your payroll details</ReviewRow>
          </dl>
        ) : (
          <form className="claim-form" noValidate onSubmit={(e) => { e.preventDefault(); next(); }}>
            <fieldset className="group" aria-describedby={show('member') ? 'member-err' : undefined}>
              <legend className="vd-type-title-sm">Who was treated?</legend>
              <div className="choices">
                {members.map((m) => (
                  <label key={m.id} className={`choice${form.member === m.id ? ' is-on' : ''}`}>
                    <input type="radio" name="member" id={m === members[0] ? 'f-member' : undefined} className="radio" value={m.id} checked={form.member === m.id} onChange={set('member')} />
                    <span className="choice__text"><span className="choice__name">{m.name}</span><span className="muted">{m.relation}{m.share ? ` · you pay ${m.share * 100}% of each claim` : ''}</span></span>
                  </label>
                ))}
              </div>
              {show('member') && <p className="err" id="member-err">{errors.member}</p>}
            </fieldset>

            <fieldset className="group">
              <legend className="vd-type-title-sm">Where and when?</legend>
              <Input id="f-hospital" label="Hospital or clinic" autoComplete="off" value={form.hospital} onChange={set('hospital')} onBlur={blur('hospital')} error={show('hospital')} hint="As it is written on the bill" />
              <Input id="f-treatment" label="What it was for" value={form.treatment} onChange={set('treatment')} onBlur={blur('treatment')} error={show('treatment')} />
              <div className="vd-field">
                <label className="vd-field__label" htmlFor="f-kind">Kind of treatment</label>
                <div className="select-wrap">
                  <select id="f-kind" className="select" value={form.kind} onChange={set('kind')}>
                    {kinds.map((k) => <option key={k.id} value={k.id}>{k.label}</option>)}
                  </select>
                  <IconChevron />
                </div>
              </div>
              <div className="dates">
                <Input id="f-from" type="date" max={today} label={form.kind === 'stay' ? 'Admitted on' : 'Date of treatment'} value={form.from} onChange={set('from')} onBlur={blur('from')} error={show('from')} />
                {form.kind === 'stay' && <Input id="f-to" type="date" max={today} label="Went home on" value={form.to} onChange={set('to')} onBlur={blur('to')} error={show('to')} />}
              </div>
            </fieldset>

            <fieldset className="group">
              <legend className="vd-type-title-sm">Add the bill and documents</legend>
              <p className="small muted">PDF, JPG or PNG, under 10&nbsp;MB each. A clear phone photo is fine.</p>
              <ul className="docs">
                {docTypes.filter((t) => t.needs.includes(form.kind) || t.id === 'reports').map((t) => {
                  const list = form.files[t.id] ?? [];
                  const err = fileErr[t.id] || show(`doc-${t.id}`);
                  return (
                    <li key={t.id} className="doc">
                      <div className="doc__head">
                        <span className="doc__text">
                          <span className="doc__name">{t.label}{!req.includes(t) && <span className="muted"> · optional</span>}</span>
                          <span className="muted">{t.hint}</span>
                        </span>
                        <Button as="label" className="file-btn">
                          <IconPlus />{list.length ? 'Add more' : 'Add'}
                          <span className="vd-sr"> {t.label.toLowerCase()}</span>
                          <input type="file" id={fieldId(`doc-${t.id}`)} className="vd-sr" accept=".pdf,.jpg,.jpeg,.png" multiple onChange={addFiles(t.id)} aria-describedby={err ? `${t.id}-err` : undefined} />
                        </Button>
                      </div>
                      {list.length > 0 && (
                        <ul className="files">
                          {list.map((f, i) => (
                            <li key={f.name + i} className="file">
                              <IconFile /><span className="file__name">{f.name}</span><span className="muted num">{size(f.size)}</span>
                              <Button variant="ghost" icon aria-label={`Remove ${f.name}`} onClick={() => removeFile(t.id, i)}><IconClose /></Button>
                            </li>
                          ))}
                        </ul>
                      )}
                      {err && <p className="err" id={`${t.id}-err`}>{err}</p>}
                    </li>
                  );
                })}
              </ul>
            </fieldset>

            <fieldset className="group">
              <legend className="vd-type-title-sm">How much did you pay?</legend>
              <Input id="f-amount" label="Amount on the final bill, in rupees" inputMode="numeric" autoComplete="off" leading="₹"
                value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value.replace(/[,\s]/g, '') })} onBlur={blur('amount')} error={show('amount')}
                hint="The total you paid yourself, not any part the hospital billed to the insurer" />
            </fieldset>
          </form>
        )}
      </div>

      <aside className="summary" aria-labelledby="back-label">
        <p className="small muted" id="back-label">{amount ? (review ? 'You’ll get back about' : 'You could get back about') : 'What you’ll get back'}</p>
        {/* A display number never shows a meaningless zero: before an amount is typed, a quiet line says what will appear here. */}
        {amount > 0
          ? <p className="vd-type-stat amount num" aria-live="polite">{money(est.back)}</p>
          : <p className="summary__waiting" aria-live="polite">Your estimate appears here once you add the amount you paid.</p>}
        {amount > 0 ? (
          <dl className="sums">
            <div><dt>You paid</dt><dd className="num">{money(amount)}</dd></div>
            {est.share > 0 && <div><dt>{member.name.split(' ')[0]}’s 10% share</dt><dd className="num">−{money(est.share)}</dd></div>}
            {est.capped && <div><dt>Over your cover left</dt><dd className="num">−{money(amount - est.share - est.back)}</dd></div>}
          </dl>
        ) : null}
        <p className="small muted">An estimate. Your insurer confirms the final amount, usually within {policy.daysToPay} working days of getting every document. Paid to your {policy.account}.</p>

        {review ? (
          <div className="send">
            <label className="check-row">
              <input type="checkbox" className="check" checked={confirm} onChange={(e) => setConfirm(e.target.checked)} />
              <span className="small">These bills are real and I haven’t claimed them anywhere else.</span>
            </label>
            <Button variant="primary" className="wide" aria-disabled={!confirm} onClick={() => confirm && onSend()}>Send claim</Button>
            {!confirm && <p className="small muted">Tick the box above to send.</p>}
          </div>
        ) : (
          <div className="send">
            <Button variant="primary" className="wide" onClick={next}>Check and send</Button>
            {tried && missing.length > 0 && <p className="err">{missing.length === 1 ? '1 thing' : `${missing.length} things`} left to fill in above.</p>}
          </div>
        )}
      </aside>
    </div>
  );
}

const fieldId = (k) => `f-${k}`;

function ReviewRow({ label, children }) {
  return <div className="review__row"><dt className="muted">{label}</dt><dd>{children}</dd></div>;
}

/* ---------- One claim: where the money is ---------- */

function ClaimPage({ claim, left, back, answer }) {
  const [err, setErr] = useState('');
  const m = memberOf(claim.member);
  const at = stepIndex[claim.state];
  const expectedBy = addWorkingDays(claim.sentAt, policy.daysToPay);
  const amount = backFor(claim, left);
  const headline = {
    sent: 'Sent. Your insurer has it.',
    needs: 'Waiting on one document from you',
    review: 'Under review',
    approved: 'Approved',
    paid: `Paid on ${day(claim.paidOn)}`,
  }[claim.state];
  const sub = {
    sent: `Your estimate. It should reach your ${policy.account} by ${day(expectedBy)}.`,
    needs: 'Your estimate, waiting on the document below. Nothing moves until your insurer has it.',
    review: `Your estimate. Your insurer has every document and should answer by ${day(addWorkingDays(TODAY, policy.daysToPay))}.`,
    approved: `On its way to your ${policy.account}.`,
    paid: `Paid to your ${policy.account}.`,
  }[claim.state];

  const onFile = (e) => {
    const f = e.target.files[0];
    e.target.value = '';
    if (!f) return;
    if (f.size > MAX_FILE) { setErr(`${f.name} is ${size(f.size)}. Files must be under 10 MB. Try a PDF or a phone photo.`); return; }
    setErr('');
    answer(claim.id, { name: f.name, size: f.size });
  };

  return (
    <article className="claim-page">
      <Button variant="ghost" className="back" onClick={back}><IconBack />All claims</Button>
      <p className="small muted">{claim.id} · {m.name} · {claim.hospital}</p>
      <h1 className="vd-type-title-sm" id="page-title" tabIndex={-1}>{headline}</h1>
      <p className={`vd-type-stat num${claim.fresh ? ' rise' : ''}`}>{money(amount)}</p>
      <p className={`small${claim.fresh ? ' rise rise--late' : ''}`}>{sub}</p>

      <ol className="timeline" aria-label="Progress">
        {steps.map((s, i) => {
          const done = i < at;
          const now = i === at;
          return (
            <li key={s} className={`step${done ? ' is-done' : ''}${now ? ' is-now' : ''}`} aria-current={now ? 'step' : undefined}>
              <span className="step__dot" aria-hidden="true">{done && <IconCheck />}</span>
              <span className="step__text">
                <span className="step__name">{s}<span className="vd-sr">{done ? ', done' : now ? ', now' : ', next'}</span></span>
                {i === 0 && <span className="muted">{day(claim.sentAt)}, {time(claim.sentAt)}</span>}
                {i === 3 && claim.state === 'paid' && <span className="muted">{day(claim.paidOn)}</span>}
                {now && claim.state === 'needs' && (
                  <span className="ask">
                    <span>{claim.ask.text} Asked on {day(claim.ask.on)}.</span>
                    <Button as="label" className="file-btn">
                      <IconPlus />Add the signed copy
                      <input type="file" className="vd-sr" accept=".pdf,.jpg,.jpeg,.png" onChange={onFile} aria-describedby={err ? 'ask-err' : undefined} />
                    </Button>
                    {err && <span className="err" id="ask-err">{err}</span>}
                  </span>
                )}
              </span>
            </li>
          );
        })}
      </ol>

      <section className="sent" aria-labelledby="sent-title">
        <h2 className="vd-type-title-sm" id="sent-title">What you sent</h2>
        <dl className="review">
          <ReviewRow label="Treatment">{claim.treatment}, {day(claim.from)}{claim.to !== claim.from && ` to ${day(claim.to)}`}</ReviewRow>
          <ReviewRow label="You paid"><span className="num">{money(claim.amount)}</span></ReviewRow>
          <ReviewRow label="Documents">
            <ul className="plain">{claim.files.map((f) => <li key={f.name}>{f.name} <span className="muted">· {docTypes.find((d) => d.id === f.type).label}</span></li>)}</ul>
          </ReviewRow>
        </dl>
        <div><Button onClick={() => window.print()}>Print for your records</Button></div>
      </section>
    </article>
  );
}
