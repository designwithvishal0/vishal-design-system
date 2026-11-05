import { createRoot } from 'react-dom/client';
import '../styles/base.css';
import './preview.css';
import { App } from './App.jsx';
import { mountSiteStrip } from '../site/SiteStrip.jsx';

createRoot(document.getElementById('root')).render(<App />);
mountSiteStrip(); // site chrome: the strip above the page
