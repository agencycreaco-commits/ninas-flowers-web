import { useState } from 'react'
import { Link } from 'react-router'
import { numeroDe } from '../data/catalog'
import type { Imagen } from '../data/eventos'
import type { Producto } from '../data/types'
import { formatPrecio, pad2 } from '../lib/format'

/** Foto de un ramo en dos tamaños (360 y 720 px de ancho). */
export function FotoRamo({ p, sizes, prioridad = false }: { p: Producto; sizes: string; prioridad?: boolean }) {
  const [error, setError] = useState(false)
  const base = `/img/ramos/${p.foto.archivo}`
  return (
    <div className={`photo${error ? ' photo--error' : ''}`} style={{ aspectRatio: `${p.foto.ancho} / ${p.foto.alto}` }}>
      {!error && (
        <img
          src={`${base}-720.webp`}
          srcSet={`${base}-360.webp 360w, ${base}-720.webp 720w`}
          sizes={sizes}
          width={p.foto.ancho}
          height={p.foto.alto}
          alt={p.foto.alt}
          loading={prioridad ? 'eager' : 'lazy'}
          fetchPriority={prioridad ? 'high' : undefined}
          decoding="async"
          onError={() => setError(true)}
        />
      )}
    </div>
  )
}

export function TarjetaRamo({ p, prioridad = false }: { p: Producto; prioridad?: boolean }) {
  return (
    <Link to={`/ramo/${p.id}`} className="card">
      <div className="card__foto">
        <FotoRamo p={p} prioridad={prioridad} sizes="(min-width: 1100px) 22vw, (min-width: 768px) 30vw, 46vw" />
        <span className="card__ver" aria-hidden="true">
          Ver ramo
        </span>
      </div>
      <div className="card__info">
        <span className="card__num">N.º {pad2(numeroDe(p))}</span>
        <span className="card__name">{p.nombre}</span>
        <span className="price">{formatPrecio(p.precio)}</span>
      </div>
    </Link>
  )
}

/** Foto del sitio (inicio y eventos). */
export function Foto({ img, sizes, className = '', prioridad = false }: { img: Imagen; sizes: string; className?: string; prioridad?: boolean }) {
  const [error, setError] = useState(false)
  return (
    <div className={`foto ${className}${error ? ' foto--error' : ''}`}>
      {!error && (
        <img
          src={img.src}
          srcSet={img.srcSet}
          sizes={sizes}
          alt={img.alt}
          loading={prioridad ? 'eager' : 'lazy'}
          fetchPriority={prioridad ? 'high' : undefined}
          decoding="async"
          onError={() => setError(true)}
        />
      )}
    </div>
  )
}
