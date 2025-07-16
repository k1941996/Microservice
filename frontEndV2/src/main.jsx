import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from '@store';
import { ThemeProvider } from '@components/ThemeToggler/ThemeProvider';
import { Toaster } from '@shadcn/components/ui/sonner';

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Toaster richColors />

      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  );
} else {
  console.error('No root element found');
}
