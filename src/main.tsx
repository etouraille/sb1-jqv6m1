import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { AppProviders } from './providers/AppProviders';
import './index.css';

// Polyfills et configurations globales
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'chart.js/auto';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  </StrictMode>
);