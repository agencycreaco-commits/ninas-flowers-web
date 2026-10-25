export type FotoEstado = 'ok' | 'confirmada' | 'captura-con-overlay' | 'pendiente-confirmacion'

export interface Foto {
  /** Nombre base del archivo; las variantes web viven en /img/ramos/<archivo>-<ancho>.webp */
  archivo: string
  ancho: number
  alto: number
  alt: string
  estado: FotoEstado
}

export interface Producto {
  /** Identificador estable: no cambiar aunque cambie el nombre, porque forma la URL. */
  id: string
  nombre: string
  /** Precio en pesos colombianos, entero y sin separadores. */
  precio: number
  foto: Foto
  descripcion: string | null
  categoria: string | null
  variaciones: string[]
  publicado: boolean
  notas: string[]
}

export interface Catalogo {
  moneda: 'COP'
  fuente: string
  productos: Producto[]
}
