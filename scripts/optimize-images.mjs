// Genera versiones web de las fotos originales (source-photos/ no se modifica).
// Uso: npm run images
import { readFile, mkdir, readdir } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const root = path.resolve(import.meta.dirname, '..')
const srcDir = path.join(root, 'source-photos')
const outDir = path.join(root, 'public/img/ramos')
const ogDir = path.join(root, 'public/img/og')
const WIDTHS = [360, 720]
const IVORY = { r: 0xf8, g: 0xf5, b: 0xef }

await mkdir(outDir, { recursive: true })
await mkdir(ogDir, { recursive: true })
const catalog = JSON.parse(await readFile(path.join(root, 'content/catalogo.json'), 'utf8'))
const files = new Set(await readdir(srcDir))
const sitioDir = path.join(srcDir, 'sitio')
const sitioOut = path.join(root, 'public/img/sitio')
await mkdir(sitioOut, { recursive: true })

for (const p of catalog.productos) {
  const file = `${p.foto.archivo}.jpg`
  if (!files.has(file)) throw new Error(`Falta la foto original ${file}`)
  const input = path.join(srcDir, file)
  for (const w of WIDTHS) {
    await sharp(input)
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(path.join(outDir, `${p.foto.archivo}-${w}.webp`))
  }
  // Imagen para compartir (1200x630): la foto completa sobre fondo marfil, sin recortar el ramo.
  const photo = await sharp(input).resize({ height: 630 }).toBuffer()
  await sharp({ create: { width: 1200, height: 630, channels: 3, background: IVORY } })
    .composite([{ input: photo, gravity: 'center' }])
    .jpeg({ quality: 82 })
    .toFile(path.join(ogDir, `${p.foto.archivo}.jpg`))
}
// Fotos del sitio (inicio y eventos): dos anchos en webp.
const sitio = (await readdir(sitioDir)).filter((f) => f.endsWith('.jpg'))
for (const file of sitio) {
  const base = file.replace(/\.jpg$/, '')
  for (const w of [640, 1280]) {
    await sharp(path.join(sitioDir, file))
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: 78 })
      .toFile(path.join(sitioOut, `${base}-${w}.webp`))
  }
}
// Imagen para compartir la portada: el ramo rojo de la portada, recortado a 1200x630.
await sharp(path.join(sitioDir, 'inicio-ramo-rojo.jpg'))
  .resize({ width: 1200, height: 630, fit: 'cover', position: 'attention' })
  .jpeg({ quality: 82 })
  .toFile(path.join(ogDir, 'portada.jpg'))
await sharp(path.join(sitioDir, 'eventos-terraza.jpg'))
  .resize({ width: 1200, height: 630, fit: 'cover', position: 'attention' })
  .jpeg({ quality: 82 })
  .toFile(path.join(ogDir, 'eventos.jpg'))
console.log(`Optimizadas ${catalog.productos.length} fotos de ramos y ${sitio.length} del sitio.`)
