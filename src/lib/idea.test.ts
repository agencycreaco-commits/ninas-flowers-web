import { describe, expect, it } from 'vitest'
import { IDEA_VACIA, errorPregunta, ideaCompleta, mensajeIdea, type Idea } from './idea'

const completa: Idea = {
  ...IDEA_VACIA,
  evento: 'cumpleanos',
  estilo: 'romantico',
  paletas: ['blancos', 'rosados'],
  elementos: ['centros-mesa', 'bienvenida'],
}

describe('formulario de eventos', () => {
  it('pide una respuesta en cada pregunta', () => {
    expect(errorPregunta(IDEA_VACIA, 1)).toMatch(/tipo de evento/)
    expect(errorPregunta(IDEA_VACIA, 2)).toMatch(/estilo/)
    expect(errorPregunta(IDEA_VACIA, 3)).toMatch(/paleta/)
    expect(errorPregunta(IDEA_VACIA, 4)).toMatch(/elemento/)
    expect(ideaCompleta(completa)).toBe(true)
  })

  it('exige el texto cuando se elige «Otro»', () => {
    const otro = { ...completa, evento: 'otro', otroEvento: '  ' }
    expect(errorPregunta(otro, 1)).not.toBeNull()
    expect(errorPregunta({ ...otro, otroEvento: 'Despedida' }, 1)).toBeNull()
    expect(errorPregunta({ ...completa, paletas: ['personalizada'] }, 3)).not.toBeNull()
  })

  it('arma el mensaje de WhatsApp en orden', () => {
    const m = mensajeIdea({ ...completa, elementos: ['centros-mesa', 'otro'], otroElemento: 'Flores para el carro' })
    expect(m).toContain('Tipo de evento: Cumpleaños.')
    expect(m).toContain('Estilo floral: Romántico.')
    expect(m).toContain('Paleta de colores: Blancos, marfiles y crema, Rosados suaves y pastel.')
    expect(m).toContain('Elementos florales que necesito: Centros de mesa, Flores para el carro.')
    expect(m.indexOf('Tipo de evento')).toBeLessThan(m.indexOf('Estilo floral'))
  })
})
