const cop = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
})

/** 185000 → "$ 185.000" (formato colombiano, espacio no separable). */
export const formatPrecio = (valor: number) => cop.format(valor).replace(/\s/g, '\u00a0')

export const pad2 = (n: number) => String(n).padStart(2, '0')
