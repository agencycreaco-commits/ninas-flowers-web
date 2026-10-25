import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import App from './App'
import { headTags, metaFor } from './lib/seo'
import { productos } from './data/catalog'

export function render(url: string) {
  const html = renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>,
  )
  const meta = metaFor(url)
  return { html, head: headTags(meta), status: meta.status }
}

/** Rutas que se generan como HTML estático. */
export const rutas = ['/', '/catalogo', '/eventos', '/eventos/disena', ...productos.map((p) => `/ramo/${p.id}`)]
