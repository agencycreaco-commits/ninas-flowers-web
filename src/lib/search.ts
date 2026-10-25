import type { Producto } from '../data/types'

/** Minúsculas y sin tildes, para que "petalo" encuentre "Pétalo Feliz". */
export const normalizar = (s: string) =>
  s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim()

export interface RangoPrecio {
  id: string
  etiqueta: string
  min: number
  max: number
}

/** Rangos fijos sobre los precios reales del catálogo ($145.000 – $750.000). */
export const RANGOS: RangoPrecio[] = [
  { id: 'hasta-170', etiqueta: 'Hasta $170.000', min: 0, max: 170_000 },
  { id: '170-200', etiqueta: '$170.000 – $200.000', min: 170_001, max: 200_000 },
  { id: '200-250', etiqueta: '$200.000 – $250.000', min: 200_001, max: 250_000 },
  { id: 'mas-250', etiqueta: 'Más de $250.000', min: 250_001, max: Infinity },
]

export type Orden = 'catalogo' | 'precio-asc' | 'precio-desc' | 'nombre'

export const ORDENES: { id: Orden; etiqueta: string }[] = [
  { id: 'catalogo', etiqueta: 'Orden del catálogo' },
  { id: 'precio-asc', etiqueta: 'Precio: menor a mayor' },
  { id: 'precio-desc', etiqueta: 'Precio: mayor a menor' },
  { id: 'nombre', etiqueta: 'Nombre: A – Z' },
]

export interface Filtros {
  q: string
  rangos: string[]
  orden: Orden
}

export function filtrar(lista: Producto[], { q, rangos, orden }: Filtros): Producto[] {
  const nq = normalizar(q)
  const activos = RANGOS.filter((r) => rangos.includes(r.id))
  const out = lista.filter(
    (p) =>
      (!nq || normalizar(p.nombre).includes(nq)) &&
      (activos.length === 0 || activos.some((r) => p.precio >= r.min && p.precio <= r.max)),
  )
  switch (orden) {
    case 'precio-asc':
      return out.sort((a, b) => a.precio - b.precio)
    case 'precio-desc':
      return out.sort((a, b) => b.precio - a.precio)
    case 'nombre':
      return out.sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'))
    default:
      return out
  }
}

export const contarEnRango = (lista: Producto[], r: RangoPrecio) =>
  lista.filter((p) => p.precio >= r.min && p.precio <= r.max).length
