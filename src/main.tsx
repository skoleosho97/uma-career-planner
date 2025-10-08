import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//import App from './App'
import TempApp from './temp'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TempApp />
  </StrictMode>,
)
