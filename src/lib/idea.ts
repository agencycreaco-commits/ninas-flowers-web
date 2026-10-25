import { ELEMENTOS, ESTILOS, EVENTOS, OTRO, PALETAS, PALETA_PERSONALIZADA } from '../data/eventos'
import { SITE_NAME } from './site'

/** Respuestas del formulario «Diseña tu evento». Solo vive en el navegador de quien lo llena. */
export interface Idea {
  evento: string
  otroEvento: string
  estilo: string
  otroEstilo: string
  paletas: string[]
  paletaPersonalizada: string
  elementos: string[]
  otroElemento: string
}

export const IDEA_VACIA: Idea = {
  evento: '',
  otroEvento: '',
  estilo: '',
  otroEstilo: '',
  paletas: [],
  paletaPersonalizada: '',
  elementos: [],
  otroElemento: '',
}

const todosLosElementos = ELEMENTOS.flatMap((g) => g.opciones)
const nombre = (lista: { id: string; nombre: string }[], id: string) => lista.find((o) => o.id === id)?.nombre ?? ''
const limpio = (s: string) => s.trim().replace(/\s+/g, ' ')

/** Texto legible de cada respuesta; las opciones «Otro» llevan lo que escribió la persona. */
export function textoEvento(i: Idea) {
  return i.evento === OTRO ? limpio(i.otroEvento) || 'Otro evento' : nombre(EVENTOS, i.evento)
}
export function textoEstilo(i: Idea) {
  return i.estilo === OTRO ? limpio(i.otroEstilo) || 'Otro estilo' : nombre(ESTILOS, i.estilo)
}
export function textoPaletas(i: Idea): string[] {
  return PALETAS.filter((p) => i.paletas.includes(p.id)).map((p) =>
    p.id === PALETA_PERSONALIZADA && limpio(i.paletaPersonalizada)
      ? `Paleta personalizada: ${limpio(i.paletaPersonalizada)}`
      : p.nombre,
  )
}
export function textoElementos(i: Idea): string[] {
  return todosLosElementos
    .filter((e) => i.elementos.includes(e.id))
    .map((e) => (e.id === OTRO && limpio(i.otroElemento) ? limpio(i.otroElemento) : e.nombre))
}

/** Mensaje de error de la pregunta n (1 a 4), o null si está completa. */
export function errorPregunta(i: Idea, n: number): string | null {
  switch (n) {
    case 1:
      if (!i.evento) return 'Para continuar, elige el tipo de evento.'
      if (i.evento === OTRO && !limpio(i.otroEvento)) return 'Cuéntanos qué evento quieres celebrar.'
      return null
    case 2:
      if (!i.estilo) return 'Para continuar, elige un estilo floral.'
      if (i.estilo === OTRO && !limpio(i.otroEstilo)) return 'Describe brevemente el estilo que imaginas.'
      return null
    case 3:
      if (i.paletas.length === 0) return 'Para continuar, elige al menos una paleta.'
      if (i.paletas.includes(PALETA_PERSONALIZADA) && !limpio(i.paletaPersonalizada))
        return 'Describe los colores de tu paleta personalizada.'
      return null
    case 4:
      if (i.elementos.length === 0) return 'Para continuar, elige al menos un elemento.'
      if (i.elementos.includes(OTRO) && !limpio(i.otroElemento)) return 'Cuéntanos qué otro elemento necesitas.'
      return null
    default:
      return null
  }
}

export const ideaCompleta = (i: Idea) => [1, 2, 3, 4].every((n) => errorPregunta(i, n) === null)

/** Mensaje ordenado que se abre en WhatsApp. */
export function mensajeIdea(i: Idea): string {
  const lista = (xs: string[]) => xs.join(', ')
  return [
    `Hola, ${SITE_NAME}. Quiero consultar una propuesta de diseño floral para mi evento.`,
    `Tipo de evento: ${textoEvento(i)}.`,
    `Estilo floral: ${textoEstilo(i)}.`,
    `Paleta de colores: ${lista(textoPaletas(i))}.`,
    `Elementos florales que necesito: ${lista(textoElementos(i))}.`,
    'Me gustaría conocer las posibilidades para mi celebración.',
  ].join('\n\n')
}

export const mensajeEventos = () =>
  `Hola, ${SITE_NAME}. Quiero información sobre la decoración floral para un evento.`
