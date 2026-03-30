import ReactDOM from 'react-dom/client';
// import { InternetIdentityProvider } from './hooks/useInternetIdentity';
import { initEditor } from './hooks/useEditor';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import 'devicon/devicon.min.css';
import './index.css';
import { initLenis } from './lib/lenis';

// Initialize Lenis global singleton once
initLenis();

const queryClient = new QueryClient();

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initEditor());
} else {
    initEditor();
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
        {/* <InternetIdentityProvider> */}
            <App />
        {/* </InternetIdentityProvider> */}
    </QueryClientProvider>
);
