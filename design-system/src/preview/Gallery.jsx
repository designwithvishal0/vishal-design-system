import { useState } from 'react';
import { Button, Input, Card, Tag, Nav, NavList, List, Modal, Sheet, Avatar, Cover, IconSearch, IconSend, IconClose, IconHash, IconPlus } from '../index.js';

const PALETTE = ['orange', 'violet', 'amber', 'teal', 'sky'];

/** One full set of components inside a themed wrapper. */
export function Gallery({ theme, accent }) {
  const [modal, setModal] = useState(null);
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
        <p className="pv-cap">With no product accent the wash card is neutral. A product picks one of these five as its own colour:</p>
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

      <section>
        <h2 className="vd-type-title">Avatar</h2>
        <div className="pv-row">
          <Avatar name="Maya Rao" size="xs" />
          <Avatar name="Dev Iyer" size="sm" />
          <Avatar name="Asha Nair" />
          <Avatar name="Kabir Shah" size="lg" status="live" />
          <Avatar name="Ira Bose" size="xl" tone="accent" />
        </div>
        <p className="pv-cap">People share one neutral surface. The accent avatar marks a single person.</p>
      </section>

      <section>
        <h2 className="vd-type-title">Nav</h2>
        <Nav
          brand="Vishal Yadav"
          sticky={false}
          bordered
          actions={<><Button variant="primary" size="sm">Book a call</Button><Button size="sm">Resume</Button></>}
        >
          <Nav.Link href="#work" current>Work</Nav.Link>
          <Nav.Link href="#about">About</Nav.Link>
          <Nav.Link href="#contact">Contact</Nav.Link>
        </Nav>
        <div className="pv-sidebar">
          <NavList label="Channels">
            <NavList.Heading action={<Button icon size="sm" variant="ghost" aria-label="Add channel"><IconPlus /></Button>}>Channels</NavList.Heading>
            <NavList.Item current leading={<IconHash />}>design</NavList.Item>
            <NavList.Item unread leading={<IconHash />} trailing={<Tag variant="solid">3</Tag>}>launch-week</NavList.Item>
            <NavList.Item leading={<IconHash />}>random</NavList.Item>
            <NavList.Heading>Direct messages</NavList.Heading>
            <NavList.Item leading={<Avatar name="Maya Rao" size="xs" status="live" />}>Maya Rao</NavList.Item>
            <NavList.Item leading={<Avatar name="Dev Iyer" size="xs" />}>Dev Iyer</NavList.Item>
          </NavList>
        </div>
        <p className="pv-cap">Top bar from the portfolio. The vertical list is an extension, for sidebars.</p>
      </section>

      <section>
        <h2 className="vd-type-title">List</h2>
        <div className="pv-grid">
          <div className="pv-stack">
            <p className="pv-cap">Comfortable</p>
            <List>
              <List.Item leading={<Avatar name="Maya Rao" />} title="Maya Rao" meta="Shared the Figma file" trailing="9:41" />
              <List.Item selected leading={<Avatar name="Dev Iyer" />} title="Dev Iyer" meta="Can we ship Friday?" trailing={<Tag variant="solid">2</Tag>} />
              <List.Item as="button" leading={<Avatar name="Asha Nair" />} title="Asha Nair" meta="Thanks, that works" trailing="Mon" />
            </List>
          </div>
          <div className="pv-stack">
            <p className="pv-cap">Dense. EXTENSION, for chat and long lists</p>
            <List density="dense">
              <List.Item leading={<Cover />} title="The Remains of the Day" meta="Kazuo Ishiguro" trailing="4.5" />
              <List.Item selected leading={<Cover />} title="Stoner" meta="John Williams" trailing="5" />
              <List.Item as="button" leading={<Cover />} title="Pachinko" meta="Min Jin Lee" trailing="4" />
              <List.Item as="button" leading={<Cover />} title="Piranesi" meta="Susanna Clarke" trailing="4.5" />
            </List>
          </div>
        </div>
      </section>

      <section>
        <h2 className="vd-type-title">Modal and Sheet</h2>
        <div className="pv-row">
          <Button onClick={() => setModal('center')}>Open modal</Button>
          <Button onClick={() => setModal('bottom')}>Open sheet</Button>
          <Button onClick={() => setModal('right')}>Open side sheet</Button>
        </div>
        <Modal open={modal === 'center'} onClose={() => setModal(null)} title="Invite to #design" footer={<><Button variant="ghost" onClick={() => setModal(null)}>Cancel</Button><Button variant="primary" onClick={() => setModal(null)}>Send invite</Button></>}>
          <Input label="Email" placeholder="name@company.com" />
        </Modal>
        <Sheet open={modal === 'bottom'} onClose={() => setModal(null)} title="Channel details">
          <List density="dense"><List.Item title="Members" trailing="24" /><List.Item title="Created" trailing="12 Oct" /></List>
        </Sheet>
        <Modal placement="right" open={modal === 'right'} onClose={() => setModal(null)} title="Thread">
          <List><List.Item leading={<Avatar name="Maya Rao" />} title="Maya Rao" meta="Looks good to me" trailing="9:41" /></List>
        </Modal>
      </section>
    </div>
  );
}
