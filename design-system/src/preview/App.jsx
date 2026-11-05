import { useState } from 'react';
import { Gallery } from './Gallery.jsx';

const ACCENTS = ['orange', 'violet', 'amber', 'teal', 'sky'];

/** Shows every component twice, light on the left and dark on the right. One accent for the whole screen. */
export function App() {
  const [accent, setAccent] = useState('orange');
  return (
    <>
      <div className="pv-toolbar" data-theme="light">
        <strong className="vd-type-title">Components</strong>
        <label className="pv-toolbar__pick">
          Accent for this screen
          <select value={accent} onChange={(e) => setAccent(e.target.value)}>
            {ACCENTS.map((a) => <option key={a}>{a}</option>)}
          </select>
        </label>
      </div>
      <div className="pv-panes">
        <Gallery theme="light" accent={accent} />
        <Gallery theme="dark" accent={accent} />
      </div>
    </>
  );
}
