import { createRoot } from 'react-dom/client';
import '../styles/base.css';
import './preview.css';
import { App } from './App.jsx';
import { mountSiteStrip } from '../site/SiteStrip.jsx';

createRoot(document.getElementById('root')).render(<App />);
mountSiteStrip({ theme: 'light', variant: 'toolbar' }); // site chrome: the strip, in the same theme and frame as the toolbar
