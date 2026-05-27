import { ThemeProvider } from './components/ThemeProvider';
import { BrowserRouter } from 'react-router-dom';
import { AppContent } from './AppContent';


function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
