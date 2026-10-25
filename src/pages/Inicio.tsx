import { Link } from 'react-router'
import { Foto, TarjetaRamo } from '../components/Ramo'
import { IconArrow, IconCheck, IconSearch, IconWhatsApp, Monograma } from '../components/Icons'
import { productos } from '../data/catalog'
import { FOTOS } from '../data/eventos'
import { RANGOS, contarEnRango } from '../lib/search'

const PASOS = [
  { n: '01', titulo: 'Elige tu ramo', texto: 'Explora el catálogo y abre la ficha del ramo que te guste.', Icono: IconSearch },
  { n: '02', titulo: 'Toca «Pedir por WhatsApp»', texto: 'Se abre WhatsApp con un mensaje listo que incluye el nombre y el precio del ramo.', Icono: IconWhatsApp },
  { n: '03', titulo: 'Confirma por chat', texto: "Nina's Flowers te confirma la disponibilidad y los detalles de la entrega.", Icono: IconCheck },
]

export default function Inicio() {
  return (
    <>
      <section className="hero-inicio">
        <Foto img={FOTOS.inicioHero} sizes="100vw" className="hero-inicio__foto" prioridad />
        <div className="hero-inicio__velo" aria-hidden="true" />
        <div className="hero-inicio__texto wrap">
          <p className="eyebrow entra entra--1">Floristería</p>
          <h1 className="hero-inicio__titulo entra entra--2">
            <em>Nina's</em>
            <br />
            Flowers
          </h1>
          <p className="hero-inicio__frase entra entra--3">
            Venimos de raíces que crecieron entre flores; Nina's Flowers es nuestra forma de honrar esa historia y
            hacerla florecer a nuestra manera.
          </p>
          <span className="linea entra entra--4" aria-hidden="true" />
          <p className="eyebrow hero-inicio__invita entra entra--4">Conoce nuestro catálogo aquí</p>
          <Link to="/catalogo" className="btn btn--claro entra entra--5">
            Ver catálogo
          </Link>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section__head reveal">
            <div>
              <p className="eyebrow">Del catálogo</p>
              <h2 className="h1">Los primeros ramos</h2>
            </div>
            <Link to="/catalogo" className="btn btn--text solo-escritorio">
              Ver los {productos.length} ramos <IconArrow size={18} />
            </Link>
          </div>
          <div className="grid">
            {productos.slice(0, 8).map((p, i) => (
              <div key={p.id} className={`reveal${i >= 6 ? ' solo-escritorio-grid' : ''}`} style={{ transitionDelay: `${(i % 4) * 70}ms` }}>
                <TarjetaRamo p={p} prioridad={i < 2} />
              </div>
            ))}
          </div>
          <Link to="/catalogo" className="btn btn--secondary btn--block solo-movil section__cta">
            Ver los {productos.length} ramos
          </Link>
        </div>
      </section>

      <section className="section section--alt" id="como-pedir">
        <div className="wrap como-pedir">
          <div className="como-pedir__logo reveal" aria-hidden="true">
            <span className="como-pedir__marco" />
            <Monograma size={220} />
            <span className="como-pedir__nombre">Nina's Flowers</span>
            <span className="linea" />
            <span className="eyebrow">Floristería</span>
          </div>
          <div className="como-pedir__texto">
            <div className="reveal">
              <p className="eyebrow">Cómo pedir</p>
              <h2 className="display">Tres pasos, por WhatsApp</h2>
            </div>
            <ol className="pasos">
              {PASOS.map(({ n, titulo, texto, Icono }, i) => (
                <li key={n} className="paso reveal" style={{ transitionDelay: `${i * 120}ms` }}>
                  <span className="paso__icono">
                    <Icono size={22} />
                  </span>
                  <div className="paso__tarjeta">
                    <p className="paso__cabecera">
                      <span className="accent paso__num">{n}</span>
                      <span className="h3">{titulo}</span>
                    </p>
                    <p className="muted">{texto}</p>
                  </div>
                </li>
              ))}
            </ol>
            <Link to="/catalogo" className="btn btn--primary reveal">
              Ver catálogo
            </Link>
          </div>
        </div>
      </section>

      <section className="section section--inverso">
        <div className="wrap teaser-eventos">
          <Link to="/eventos" className="teaser-eventos__foto reveal" tabIndex={-1} aria-hidden="true">
            <Foto img={FOTOS.terraza} sizes="(min-width: 1100px) 45vw, 100vw" />
          </Link>
          <div className="teaser-eventos__texto reveal">
            <p className="eyebrow">Eventos</p>
            <h2 className="display">Hay momentos que merecen florecer</h2>
            <p>
              Bodas, cumpleaños, aniversarios, baby showers, eventos de empresa y más. Cuéntanos qué estás imaginando y
              creamos juntos tu propuesta floral.
            </p>
            <Link to="/eventos" className="btn btn--claro">
              Diseñar mi evento
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="reveal">
            <p className="eyebrow">Por precio</p>
            <h2 className="h1">Encuentra tu rango</h2>
          </div>
          <div className="ranges">
            {RANGOS.map((r, i) => (
              <Link key={r.id} to={`/catalogo?rango=${r.id}`} className="range reveal" style={{ transitionDelay: `${i * 70}ms` }}>
                <span className="range__label">{r.etiqueta}</span>
                <span className="range__count">{contarEnRango(productos, r)} ramos</span>
                <IconArrow size={18} />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
