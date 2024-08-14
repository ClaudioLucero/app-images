import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Asegúrate de importar BrowserRouter
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // Importa QueryClient y QueryClientProvider
import App from './App';
import './index.css';

// Crea una instancia del cliente de react-query
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
