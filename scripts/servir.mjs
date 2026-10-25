// Servidor estático mínimo que imita Cloudflare Pages (para probar dist/ en local): node scripts/servir.mjs
import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import path from 'node:path'

const dist = path.resolve(import.meta.dirname, '../dist')
const tipos = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.png': 'image/png', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.json': 'application/json', '.webmanifest': 'application/manifest+json', '.txt': 'text/plain', '.xml': 'application/xml' }
const existe = async (f) => (await stat(f).catch(() => null))?.isFile()

createServer(async (req, res) => {
  const ruta = decodeURIComponent(new URL(req.url, 'http://x').pathname)
  let f = path.join(dist, ruta)
  if (!f.startsWith(dist)) return res.writeHead(403).end()
  if (!(await existe(f))) f = path.join(f, 'index.html')
  const ok = await existe(f)
  if (!ok) f = path.join(dist, '404.html')
  res.writeHead(ok ? 200 : 404, { 'content-type': tipos[path.extname(f)] ?? 'application/octet-stream' })
  res.end(await readFile(f))
}).listen(Number(process.env.PORT) || 4173, () => console.log('http://localhost:' + (process.env.PORT || 4173)))
