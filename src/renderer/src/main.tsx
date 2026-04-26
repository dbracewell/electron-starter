import './assets/main.css'

import { ThemeProvider } from '@/components/ThemeProvider'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="app-ui-theme">
      <App />
    </ThemeProvider>
  </StrictMode>
)
