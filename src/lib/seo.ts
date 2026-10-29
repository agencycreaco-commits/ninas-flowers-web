import { getProducto, numeroDe, productos } from '../data/catalog'
import { formatPrecio } from './format'
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from './site'

export interface Meta {
  title: string
  description: string
  path: string
  image: string
  status: number
  jsonLd?: object
}

const ogDefault = '/img/og/portada.jpg'

/** Metadatos por ruta. Se usan en el prerender (HTML estático) y en el navegador. */
export function metaFor(pathname: string): Meta {
  const path = pathname.replace(/\/+$/, '') || '/'
  if (path === '/') {
    return {
      title: `${SITE_NAME} · Floristería · Catálogo de ramos y eventos`,
      description: SITE_DESCRIPTION,
      path,
      image: ogDefault,
      status: 200,
      jsonLd: { '@context': 'https://schema.org', '@type': 'Florist', name: SITE_NAME },
    }
  }
  if (path === '/catalogo') {
    return {
      title: `Catálogo de ramos · ${SITE_NAME}`,
      description: `Los ${productos.length} ramos de ${SITE_NAME} con su precio. Busca por nombre, filtra por precio y pide por WhatsApp.`,
      path,
      image: ogDefault,
      status: 200,
    }
  }
  if (path === '/eventos') {
    return {
      title: `Eventos · Diseño floral · ${SITE_NAME}`,
      description: `Decoración floral para bodas, cumpleaños, aniversarios, baby showers, eventos de empresa y más. Cuéntanos tu idea y creamos juntos tu propuesta.`,
      path,
      image: '/img/og/eventos.jpg',
      status: 200,
    }
  }
  if (path === '/eventos/disena') {
    return {
      title: `Diseña tu evento · ${SITE_NAME}`,
      description: `Cuatro preguntas sobre tu evento, tu estilo, tus colores y las flores que necesitas. Recibe tu resumen y envíalo por WhatsApp.`,
      path,
      image: '/img/og/eventos.jpg',
      status: 200,
    }
  }
  if (path === '/contacto') {
    return {
      title: `Contacto · ${SITE_NAME}`,
      description: `Escríbele a ${SITE_NAME} por WhatsApp y síguenos en Instagram y TikTok.`,
      path,
      image: ogDefault,
      status: 200,
    }
  }
  const m = path.match(/^\/ramo\/([^/]+)$/)
  const p = m ? getProducto(m[1]) : undefined
  if (p) {
    const image = `/img/og/${p.foto.archivo}.jpg`
    return {
      title: `${p.nombre} · ${formatPrecio(p.precio)} · ${SITE_NAME}`,
      description: `Ramo ${p.nombre} (N.º ${numeroDe(p)}) por ${formatPrecio(p.precio)}. Consulta disponibilidad y entrega por WhatsApp.`,
      path,
      image,
      status: 200,
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: p.nombre,
        image: SITE_URL ? `${SITE_URL}/img/ramos/${p.foto.archivo}-720.webp` : undefined,
        brand: { '@type': 'Brand', name: SITE_NAME },
        offers: {
          '@type': 'Offer',
          price: p.precio,
          priceCurrency: 'COP',
          url: SITE_URL ? `${SITE_URL}${path}` : undefined,
        },
      },
    }
  }
  return {
    title: `Página no encontrada · ${SITE_NAME}`,
    description: SITE_DESCRIPTION,
    path,
    image: ogDefault,
    status: 404,
  }
}

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/** Etiquetas <head> como texto, para el HTML prerenderizado. */
export function headTags(meta: Meta): string {
  const abs = (u: string) => (SITE_URL ? `${SITE_URL}${u}` : u)
  const tags = [
    `<title>${esc(meta.title)}</title>`,
    `<meta name="description" content="${esc(meta.description)}" />`,
    `<meta property="og:site_name" content="${esc(SITE_NAME)}" />`,
    `<meta property="og:locale" content="es_CO" />`,
    `<meta property="og:type" content="${meta.path.startsWith('/ramo/') ? 'product' : 'website'}" />`,
    `<meta property="og:title" content="${esc(meta.title)}" />`,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
    `<meta property="og:image" content="${esc(abs(meta.image))}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
  ]
  if (SITE_URL && meta.status === 200) {
    tags.push(`<link rel="canonical" href="${esc(SITE_URL + (meta.path === '/' ? '/' : meta.path))}" />`)
    tags.push(`<meta property="og:url" content="${esc(SITE_URL + meta.path)}" />`)
  }
  if (meta.status !== 200) tags.push('<meta name="robots" content="noindex" />')
  if (meta.jsonLd) {
    tags.push(
      `<script type="application/ld+json">${JSON.stringify(meta.jsonLd).replace(/</g, '\\u003c')}</script>`,
    )
  }
  return tags.join('\n    ')
}
