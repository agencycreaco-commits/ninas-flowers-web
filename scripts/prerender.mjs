// Genera una página HTML estática por ruta (dist/<ruta>/index.html), lista para cualquier hosting estático.
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const root = path.resolve(import.meta.dirname, '..')
const dist = path.join(root, 'dist')
const template = await readFile(path.join(dist, 'index.html'), 'utf8')
const { render, rutas } = await import(pathToFileURL(path.join(root, 'dist-ssr/entry-server.js')).href)

const pagina = (url) => {
  const { html, head } = render(url)
  return template.replace('<!--app-head-->', head).replace('<!--app-html-->', html)
}

for (const url of rutas) {
  const file = url === '/' ? path.join(dist, 'index.html') : path.join(dist, url.slice(1), 'index.html')
  await mkdir(path.dirname(file), { recursive: true })
  await writeFile(file, pagina(url))
}
// Página de error: Cloudflare Pages la muestra con estado 404 para cualquier ruta que no exista.
await writeFile(path.join(dist, '404.html'), pagina('/pagina-no-encontrada'))

const sitio = JSON.parse(await readFile(path.join(root, 'content/sitio.json'), 'utf8'))
const url = String(process.env.VITE_SITE_URL || sitio.urlSitio || '').replace(/\/$/, '')
const robots = ['User-agent: *', 'Allow: /']
if (url) {
  const hoy = new Date().toISOString().slice(0, 10)
  const items = rutas.map((r) => `  <url><loc>${url}${r}</loc><lastmod>${hoy}</lastmod></url>`).join('\n')
  await writeFile(path.join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${items}\n</urlset>\n`)
  robots.push(`Sitemap: ${url}/sitemap.xml`)
}
await writeFile(path.join(dist, 'robots.txt'), robots.join('\n') + '\n')
await rm(path.join(root, 'dist-ssr'), { recursive: true, force: true })
console.log(`Prerenderizadas ${rutas.length} páginas${url ? ' y sitemap.xml' : ''}.`)
