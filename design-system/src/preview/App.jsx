import { IconChevronDown } from '../index.js';
import { useState } from 'react';
import { Gallery } from './Gallery.jsx';

const ACCENTS = ['orange', 'violet', 'amber', 'teal', 'sky'];
const NEUTRAL = 'none';

/**
 * Shows every component twice, light on the left and dark on the right.
 * Neutral by default. Pick an accent to see the screen as a product that owns that colour.
 */
export function App() {
  const [accent, setAccent] = useState(NEUTRAL);
  const screenAccent = accent === NEUTRAL ? undefined : accent;
  return (
    <>
      <div className="pv-toolbar" data-theme="light">
        <strong className="vd-type-title">Components</strong>
        <div className="pv-toolbar__accent">
        <label className="pv-toolbar__pick">
          Product accent
          {/* The Select recipe from the skill: the native select dressed like the Input, with IconChevronDown. */}
          <span className="select-wrap">
            <select className="select" value={accent} onChange={(e) => setAccent(e.target.value)}>
              <option value={NEUTRAL}>none, neutral</option>
              {ACCENTS.map((a) => <option key={a}>{a}</option>)}
            </select>
            <IconChevronDown />
          </span>
        </label>
        <p className="pv-toolbar__note">Only parts that carry the product colour change: the wash card, accent tags, the accent avatar and selected rows. Everything else stays neutral by design.</p>
        </div>
      </div>
      <div className="pv-panes">
        <Gallery theme="light" accent={screenAccent} />
        <Gallery theme="dark" accent={screenAccent} />
      </div>
    </>
  );
}
