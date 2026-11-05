import { Button, Input, Card, Tag, IconSearch, IconSend, IconClose } from '../index.js';

const PALETTE = ['orange', 'violet', 'amber', 'teal', 'sky'];

/** One full set of components inside a themed wrapper. */
export function Gallery({ theme, accent }) {
  return (
    <div className="pv" data-theme={theme} data-accent={accent}>
      <h1 className="pv__title vd-type-display">{theme === 'light' ? 'Light' : 'Dark'}</h1>

      <section>
        <h2 className="vd-type-title">Button</h2>
        <div className="pv-row">
          <Button variant="primary">Book a call</Button>
          <Button>Resume</Button>
          <Button variant="ghost">Cancel</Button>
          <Button disabled>Disabled</Button>
        </div>
        <div className="pv-row">
          <Button variant="primary" size="sm">Send</Button>
          <Button size="sm">Resume</Button>
          <Button icon aria-label="Search"><IconSearch /></Button>
          <Button icon variant="primary" aria-label="Send"><IconSend /></Button>
          <Button icon size="sm" variant="ghost" aria-label="Close"><IconClose /></Button>
        </div>
        <Card variant="inverse">
          <Card.Title>On the dark panel</Card.Title>
          <div className="pv-row">
            <Button variant="primary">Book a call</Button>
            <Button>Resume</Button>
          </div>
        </Card>
        <p className="pv-cap">Hover changes colour, press scales to 0.97. Nothing lifts.</p>
      </section>

      <section>
        <h2 className="vd-type-title">Input</h2>
        <div className="pv-grid">
          <Input label="Name" placeholder="Your name" />
          <Input label="Search" placeholder="Search channels" leading={<IconSearch />} />
          <Input label="Email" defaultValue="design@example.com" hint="I reply within a day." />
          <Input label="Email" defaultValue="design@example" error="That email is missing a domain." />
          <Input label="Disabled" placeholder="Not available" disabled />
          <Input label="Message" placeholder="Write to #design" multiline rows={3} />
        </div>
      </section>

      <section>
        <h2 className="vd-type-title">Card</h2>
        <div className="pv-grid">
          <Card>
            <Card.Meta parts={['ixigo Trains', 'Travel app', 'Concept', '2026']} />
            <Card.Title>Will I travel tonight?</Card.Title>
            <Card.Body>The four hours nobody designs for.</Card.Body>
          </Card>
          <Card variant="surface" interactive as="a" href="#card">
            <Card.Meta parts={['Reading', 'Shelf', '34 of 50']} />
            <Card.Title>On the surface</Card.Title>
            <Card.Body>A step off the page, with a strong border. Hover is a quiet overlay.</Card.Body>
          </Card>
          <Card variant="wash">
            <Card.Meta>Accent wash</Card.Meta>
            <Card.Title>Colour comes from one accent</Card.Title>
            <Card.Body>Small text here uses the accent's muted colour.</Card.Body>
          </Card>
        </div>
        <p className="pv-cap">The accent set for this screen colours the wash card. The palette, all five, for reference only:</p>
        <div className="pv-row">
          {PALETTE.map((a) => <span key={a} className="pv-chip" data-accent={a} style={{ background: 'var(--accent-wash)', color: 'var(--accent-ink)' }}>{a}</span>)}
        </div>
      </section>

      <section>
        <h2 className="vd-type-title">Tag</h2>
        <div className="pv-row">
          <Tag>Concept</Tag>
          <Tag variant="solid">Shipped</Tag>
          <Tag variant="solid">12</Tag>
          <Tag variant="accent">Draft</Tag>
          <Tag variant="live">Open to work</Tag>
        </div>
      </section>
    </div>
  );
}
