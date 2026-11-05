import { createRoot } from 'react-dom/client';
import '../../../../design-system/src/styles/base.css';
import './app.css';
import { App } from './App.jsx';

// ?theme=dark or ?theme=light forces a theme for checking. Without it the page follows the system.
const theme = new URLSearchParams(location.search).get('theme');
if (theme) document.documentElement.dataset.theme = theme;

createRoot(document.getElementById('root')).render(<App />);
