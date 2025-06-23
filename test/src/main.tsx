import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'tristan-ui/dist/tristan-ui.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
