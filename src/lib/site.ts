import sitio from '../../content/sitio.json'

const env = import.meta.env

/** Número de WhatsApp en formato internacional, solo dígitos. Vacío = pedidos desactivados. */
export const WHATSAPP_NUMBER = String(env.VITE_WHATSAPP_NUMBER || sitio.whatsapp || '').replace(/\D/g, '')
export const WHATSAPP_VISIBLE = sitio.whatsappVisible
export const SITE_NAME = sitio.nombre
export const SITE_DESCRIPTION = sitio.descripcion
/** URL pública sin barra final; vacía hasta que exista el dominio o la URL del hosting. */
export const SITE_URL = String(env.VITE_SITE_URL || sitio.urlSitio || '').replace(/\/$/, '')
export const INSTAGRAM_URL = 'https://www.instagram.com/by_ninasflowers'
export const TIKTOK_URL = 'https://www.tiktok.com/@ninas.flowers'
