import { Link, useParams } from 'react-router'
import { IconChevronLeft, IconChevronRight, IconWhatsApp } from '../components/Icons'
import { FotoRamo, TarjetaRamo } from '../components/Ramo'
import { getProducto, numeroDe, preciosSimilares, vecinos } from '../data/catalog'
import { formatPrecio, pad2 } from '../lib/format'
import { enlaceWhatsApp, mensajeProducto } from '../lib/whatsapp'
import NoEncontrada from './NoEncontrada'

export default function Ramo() {
  const { id } = useParams()
  const p = getProducto(id)
  if (!p) return <NoEncontrada />
  const mensaje = mensajeProducto(p)
  const wa = enlaceWhatsApp(mensaje)
  const { anterior, siguiente } = vecinos(p)

  return (
    <>
      <div className="wrap">
        <nav className="crumbs" aria-label="Ruta">
          <Link to="/catalogo">Catálogo</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{p.nombre}</span>
        </nav>
      </div>

      <article className="product wrap">
        <div className="product__photo entra entra--1">
          <FotoRamo p={p} prioridad sizes="(min-width: 1100px) 50vw, 100vw" />
        </div>
        <div className="product__detail">
          <p className="eyebrow entra entra--1">N.º {pad2(numeroDe(p))}</p>
          <h1 className="display entra entra--2">{p.nombre}</h1>
          <p className="price price--l entra entra--3">{formatPrecio(p.precio)}</p>
          <p className="muted entra entra--3">Precio en pesos colombianos. La disponibilidad y la entrega se confirman por WhatsApp.</p>
          {wa ? (
            <a className="btn btn--primary btn--block product__cta entra entra--4" href={wa} target="_blank" rel="noopener noreferrer">
              <IconWhatsApp size={20} /> Pedir por WhatsApp
            </a>
          ) : (
            <p className="notice">Los pedidos por WhatsApp no están disponibles en este momento.</p>
          )}
          <div className="message entra entra--5">
            <p className="eyebrow">Mensaje que se enviará</p>
            <p>{mensaje}</p>
          </div>
          <div className="pager">
            {anterior ? (
              <Link to={`/ramo/${anterior.id}`} className="btn btn--text">
                <IconChevronLeft size={18} /> {anterior.nombre}
              </Link>
            ) : (
              <span />
            )}
            {siguiente && (
              <Link to={`/ramo/${siguiente.id}`} className="btn btn--text pager__next">
                {siguiente.nombre} <IconChevronRight size={18} />
              </Link>
            )}
          </div>
        </div>
      </article>

      <section className="section section--alt">
        <div className="wrap">
          <div className="reveal">
            <p className="eyebrow">Precios similares</p>
            <h2 className="h1">También te pueden gustar</h2>
          </div>
          <div className="grid">
            {preciosSimilares(p).map((o) => (
              <div key={o.id} className="reveal">
                <TarjetaRamo p={o} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
