import ReactDOM from 'react-dom/client';
import App from './App';
import 'devicon/devicon.min.css';
import './styles/index.css';
import './styles/shared-ui.css';
import { initLenis } from './lib/lenis';

// Initialize Lenis global singleton once
initLenis();

ReactDOM.createRoot(document.getElementById('root')!).render(
        <App />
);
