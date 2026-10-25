import { Link } from 'react-router'
import { Foto } from '../components/Ramo'
import { DESTACADOS, EVENTOS, FOTOS, GALERIA, OTRO, PREGUNTAS } from '../data/eventos'
import { mensajeEventos } from '../lib/idea'
import { enlaceWhatsApp } from '../lib/whatsapp'

export default function Eventos() {
  const wa = enlaceWhatsApp(mensajeEventos())
  return (
    <>
      <section className="hero-foto">
        <Foto img={FOTOS.heroEventos} sizes="100vw" className="hero-foto__img" prioridad />
        <div className="hero-foto__velo" aria-hidden="true" />
        <div className="hero-foto__texto wrap">
          <p className="eyebrow entra entra--1">Eventos · Diseño floral</p>
          <h1 className="hero-foto__titulo entra entra--2">Hay momentos que merecen florecer</h1>
          <p className="entra entra--3">
            Diseñamos experiencias florales para acompañar tus momentos más especiales. Cuéntanos qué estás imaginando y
            creemos juntos una propuesta que refleje tu estilo.
          </p>
          <div className="acciones entra entra--4">
            <Link to="/eventos/disena" className="btn btn--claro">
              Diseñar mi evento
            </Link>
            <a href="#galeria" className="btn btn--claro-sec">
              Ver galería
            </a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="reveal intro-eventos">
            <p className="eyebrow">Para cada celebración</p>
            <h2 className="display">Flores que acompañan tus momentos</h2>
            <p className="lead">
              En Nina's Flowers diseñamos propuestas florales para celebraciones de todo tipo, desde una cena íntima hasta
              un evento de marca.
            </p>
          </div>
          <div className="mosaico">
            {DESTACADOS.map((d, i) => (
              <figure key={d.nombre} className={`mosaico__item reveal mosaico__item--${i + 1}`} style={{ transitionDelay: `${i * 90}ms` }}>
                <Foto img={d.foto} sizes="(min-width: 1100px) 25vw, 50vw" />
                <figcaption>{d.nombre}</figcaption>
              </figure>
            ))}
          </div>
          <ul className="tipos reveal" aria-label="Tipos de evento">
            {EVENTOS.map((e) => (
              <li key={e.id}>{e.id === OTRO ? 'Y cualquier otra celebración' : e.nombre}</li>
            ))}
          </ul>
          <Link to="/eventos/disena" className="btn btn--primary reveal">
            Diseñar mi evento
          </Link>
        </div>
      </section>

      <section className="section section--alt" id="galeria">
        <div className="wrap">
          <div className="reveal">
            <p className="eyebrow">Galería</p>
            <h2 className="display">Flores que transforman cada espacio</h2>
          </div>
          <div className="galeria">
            {GALERIA.map((g, i) => (
              <figure key={g.nombre} className={`galeria__item galeria__item--${i + 1} reveal`}>
                <Foto img={g.foto} sizes="(min-width: 1100px) 30vw, 50vw" />
                <figcaption className="eyebrow">{g.nombre}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--inverso">
        <div className="wrap">
          <div className="reveal">
            <p className="eyebrow">Tu propuesta floral</p>
            <h2 className="display">Diseñemos juntos tu evento</h2>
            <p className="lead">
              Cuatro preguntas rápidas sobre tu evento, tu estilo, tus colores y las flores que necesitas. Al final ves un
              resumen y lo envías por WhatsApp.
            </p>
          </div>
          <ol className="preguntas-intro">
            {PREGUNTAS.map((p, i) => (
              <li key={p} className="reveal" style={{ transitionDelay: `${i * 90}ms` }}>
                <span className="accent">{String(i + 1).padStart(2, '0')}</span>
                <span className="h3">{p}</span>
              </li>
            ))}
          </ol>
          <Link to="/eventos/disena" className="btn btn--claro reveal">
            Crear mi propuesta floral
          </Link>
        </div>
      </section>

      <section className="hero-foto hero-foto--cierre">
        <Foto img={FOTOS.cierre} sizes="100vw" className="hero-foto__img" />
        <div className="hero-foto__velo" aria-hidden="true" />
        <div className="hero-foto__texto wrap reveal">
          <h2 className="display">Cuéntanos qué estás imaginando</h2>
          <p>Elige tu evento, tu estilo y tus colores, y creemos juntos una propuesta floral que hable de ti.</p>
          <div className="acciones">
            <Link to="/eventos/disena" className="btn btn--claro">
              Diseñar mi evento
            </Link>
            {wa && (
              <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn--claro-sec">
                Hablar con Nina's Flowers
              </a>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
