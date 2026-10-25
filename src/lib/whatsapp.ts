import type { Producto } from '../data/types'
import { formatPrecio } from './format'
import { SITE_NAME, WHATSAPP_NUMBER } from './site'

export const mensajeProducto = (p: Producto) =>
  `Hola, ${SITE_NAME}. Quisiera consultar la disponibilidad del ramo ${p.nombre}, ` +
  `con precio publicado de ${formatPrecio(p.precio).replace(/\u00a0/g, ' ')}. ` +
  `¿Me pueden dar más información sobre el pedido y la entrega?`

export const mensajeGeneral = () =>
  `Hola, ${SITE_NAME}. Vi su catálogo y quisiera hacer una consulta.`

/** Enlace oficial wa.me con el texto codificado; null si el número no está configurado. */
export function enlaceWhatsApp(texto: string, numero = WHATSAPP_NUMBER): string | null {
  if (!/^\d{8,15}$/.test(numero)) return null
  return `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`
}
