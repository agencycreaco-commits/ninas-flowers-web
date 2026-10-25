import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import '@fontsource-variable/bodoni-moda/wght.css'
import '@fontsource-variable/bodoni-moda/wght-italic.css'
import '@fontsource-variable/jost/wght.css'
import './styles/tokens.css'
import './styles/global.css'
import App from './App'

const root = document.getElementById('root')!
const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)

// Las páginas vienen prerenderizadas (HTML estático); si no, se monta desde cero (modo desarrollo).
if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)
