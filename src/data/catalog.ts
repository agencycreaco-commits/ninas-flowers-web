import raw from '../../content/catalogo.json'
import type { Catalogo, Producto } from './types'

const catalogo = raw as Catalogo

/** Productos publicados, en el orden del documento oficial. */
export const productos: Producto[] = catalogo.productos.filter((p) => p.publicado)

/** Número de catálogo visible (N.º 01…), derivado del orden oficial. */
const numeros = new Map(catalogo.productos.map((p, i) => [p.id, i + 1]))
export const numeroDe = (p: Producto) => numeros.get(p.id) ?? 0

export const getProducto = (id: string | undefined) =>
  id ? productos.find((p) => p.id === id) : undefined

export const moneda = catalogo.moneda

/** Productos con precio más cercano al dado (excluyendo el propio). */
export function preciosSimilares(p: Producto, n = 4): Producto[] {
  return productos
    .filter((o) => o.id !== p.id)
    .map((o) => ({ o, d: Math.abs(o.precio - p.precio) }))
    .sort((a, b) => a.d - b.d || numeroDe(a.o) - numeroDe(b.o))
    .slice(0, n)
    .map(({ o }) => o)
}

export function vecinos(p: Producto) {
  const i = productos.findIndex((o) => o.id === p.id)
  return {
    anterior: i > 0 ? productos[i - 1] : undefined,
    siguiente: i < productos.length - 1 ? productos[i + 1] : undefined,
  }
}
