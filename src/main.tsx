import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './i18n'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense fallback={<div className="min-h-screen bg-[#030712] flex items-center justify-center text-white/20 font-bold uppercase tracking-widest animate-pulse">Initializing Lab...</div>}>
      <App />
    </Suspense>
  </StrictMode>,
)
