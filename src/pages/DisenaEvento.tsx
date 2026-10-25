import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import { IconChevronLeft, IconWhatsApp } from '../components/Icons'
import { Foto } from '../components/Ramo'
import { ELEMENTOS, ESTILOS, EVENTOS, OTRO, PALETAS, PALETA_PERSONALIZADA, PREGUNTAS } from '../data/eventos'
import {
  IDEA_VACIA,
  errorPregunta,
  ideaCompleta,
  mensajeIdea,
  textoElementos,
  textoEstilo,
  textoEvento,
  textoPaletas,
  type Idea,
} from '../lib/idea'
import { enlaceWhatsApp } from '../lib/whatsapp'

const CLAVE = 'nf-idea-floral'
const RESUMEN = 5

function leerGuardado(): { idea: Idea; paso: number } | null {
  try {
    const raw = sessionStorage.getItem(CLAVE)
    if (!raw) return null
    const v = JSON.parse(raw)
    return { idea: { ...IDEA_VACIA, ...v.idea }, paso: Math.min(Math.max(Number(v.paso) || 1, 1), RESUMEN) }
  } catch {
    return null
  }
}

function Campo({ label, value, onChange, placeholder, id }: { label: string; value: string; onChange: (v: string) => void; placeholder: string; id: string }) {
  return (
    <div className="campo">
      <label htmlFor={id}>{label}</label>
      <input id={id} type="text" value={value} placeholder={placeholder} maxLength={160} onChange={(e) => onChange(e.target.value)} autoFocus />
    </div>
  )
}

function Filas({ idea, onEditar }: { idea: Idea; onEditar?: (n: number) => void }) {
  const filas: [string, string, number][] = [
    ['Tipo de evento', textoEvento(idea), 1],
    ['Estilo floral', textoEstilo(idea), 2],
    ['Paleta de colores', textoPaletas(idea).join(' · '), 3],
    ['Elementos florales', textoElementos(idea).join(' · '), 4],
  ]
  return (
    <dl className="filas">
      {filas.map(([l, v, n]) => (
        <div key={l} className="fila">
          <div>
            <dt className="eyebrow">{l}</dt>
            <dd>{v || '—'}</dd>
          </div>
          {onEditar && (
            <button type="button" className="btn btn--text" onClick={() => onEditar(n)} aria-label={`Editar ${l.toLowerCase()}`}>
              Editar
            </button>
          )}
        </div>
      ))}
    </dl>
  )
}

export default function DisenaEvento() {
  const [idea, setIdea] = useState<Idea>(IDEA_VACIA)
  const [paso, setPaso] = useState(1)
  const [error, setError] = useState<string | null>(null)
  const [desdeResumen, setDesdeResumen] = useState(false)
  const [listo, setListo] = useState(false)
  const titulo = useRef<HTMLHeadingElement>(null)

  // Recupera las respuestas si la persona recarga la página o vuelve desde WhatsApp.
  useEffect(() => {
    const g = leerGuardado()
    if (g) {
      setIdea(g.idea)
      setPaso(g.paso === RESUMEN && !ideaCompleta(g.idea) ? 1 : g.paso)
    }
    setListo(true)
  }, [])
  useEffect(() => {
    if (!listo) return
    try {
      sessionStorage.setItem(CLAVE, JSON.stringify({ idea, paso }))
    } catch {
      /* sin almacenamiento: el formulario sigue funcionando */
    }
  }, [idea, paso, listo])

  const set = (cambios: Partial<Idea>) => {
    setIdea((i) => ({ ...i, ...cambios }))
    setError(null)
  }
  const alternar = (campo: 'paletas' | 'elementos', id: string) =>
    set({ [campo]: idea[campo].includes(id) ? idea[campo].filter((x) => x !== id) : [...idea[campo], id] })

  const ir = (n: number) => {
    setPaso(n)
    setError(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
    requestAnimationFrame(() => titulo.current?.focus({ preventScroll: true }))
  }
  const siguiente = () => {
    const e = errorPregunta(idea, paso)
    if (e) {
      setError(e)
      return
    }
    if (desdeResumen || paso === 4) {
      setDesdeResumen(false)
      ir(RESUMEN)
    } else ir(paso + 1)
  }
  const editar = (n: number) => {
    setDesdeResumen(true)
    ir(n)
  }

  const esResumen = paso === RESUMEN
  const wa = enlaceWhatsApp(mensajeIdea(idea))
  const estilo = ESTILOS.find((e) => e.id === idea.estilo)

  return (
    <section className="disena">
      <div className="wrap">
        <div className="progreso">
          <div className="progreso__fila">
            <span className="eyebrow">Diseña tu evento</span>
            <span className="eyebrow progreso__paso">{esResumen ? 'Resumen' : `Pregunta ${paso} de 4 · ${PREGUNTAS[paso - 1]}`}</span>
          </div>
          <div className="progreso__barra" role="progressbar" aria-valuemin={0} aria-valuemax={4} aria-valuenow={esResumen ? 4 : paso - 1} aria-label="Avance del formulario">
            {[1, 2, 3, 4].map((k) => (
              <span key={k} className={k < paso || esResumen ? 'hecho' : k === paso ? 'actual' : ''} />
            ))}
          </div>
        </div>

        <div className={`disena__cuerpo${esResumen ? ' disena__cuerpo--resumen' : ''}`}>
          <div className="disena__contenido" key={paso}>
            {paso === 1 && (
              <fieldset>
                <legend>
                  <h1 className="disena__titulo" ref={titulo} tabIndex={-1}>
                    ¿Qué evento quieres celebrar?
                  </h1>
                  <span className="muted">Elige una opción. Puedes cambiarla cuando quieras.</span>
                </legend>
                <div className="opciones opciones--3">
                  {EVENTOS.map((e) => (
                    <label key={e.id} className="opcion">
                      <input type="radio" name="evento" value={e.id} checked={idea.evento === e.id} onChange={() => set({ evento: e.id })} />
                      <span className="opcion__nombre">{e.nombre}</span>
                    </label>
                  ))}
                </div>
                {idea.evento === OTRO && (
                  <Campo id="otro-evento" label="¿Qué evento quieres celebrar?" placeholder="Ej.: despedida, fiesta de quince años…" value={idea.otroEvento} onChange={(v) => set({ otroEvento: v })} />
                )}
              </fieldset>
            )}

            {paso === 2 && (
              <fieldset>
                <legend>
                  <h1 className="disena__titulo" ref={titulo} tabIndex={-1}>
                    ¿Qué estilo floral te gustaría?
                  </h1>
                  <span className="muted">Elige el que mejor represente lo que imaginas.</span>
                </legend>
                <div className="opciones opciones--3">
                  {ESTILOS.map((e) => (
                    <label key={e.id} className={`opcion${e.foto ? ' opcion--imagen' : ''}`}>
                      <input type="radio" name="estilo" value={e.id} checked={idea.estilo === e.id} onChange={() => set({ estilo: e.id })} />
                      {e.foto && <Foto img={e.foto} sizes="(min-width: 1100px) 22vw, 46vw" className="opcion__foto" />}
                      <span className="opcion__nombre">{e.nombre}</span>
                      <span className="opcion__desc">{e.descripcion}</span>
                    </label>
                  ))}
                </div>
                {idea.estilo === OTRO && (
                  <Campo id="otro-estilo" label="Describe el estilo que imaginas" placeholder="Cuéntanos tu idea…" value={idea.otroEstilo} onChange={(v) => set({ otroEstilo: v })} />
                )}
              </fieldset>
            )}

            {paso === 3 && (
              <fieldset>
                <legend>
                  <h1 className="disena__titulo" ref={titulo} tabIndex={-1}>
                    ¿Qué colores te gustarían?
                  </h1>
                  <span className="muted">Puedes elegir varias paletas y combinarlas.</span>
                </legend>
                <div className="opciones opciones--3">
                  {PALETAS.map((p) => (
                    <label key={p.id} className="opcion opcion--paleta">
                      <input type="checkbox" value={p.id} checked={idea.paletas.includes(p.id)} onChange={() => alternar('paletas', p.id)} />
                      <span className="muestras" aria-hidden="true">
                        {(p.colores.length ? p.colores : ['', '', '']).map((c, k) => (
                          <span key={k} style={c ? { background: c } : undefined} className={c ? '' : 'muestra--libre'} />
                        ))}
                      </span>
                      <span className="opcion__nombre">{p.nombre}</span>
                    </label>
                  ))}
                </div>
                {idea.paletas.includes(PALETA_PERSONALIZADA) && (
                  <Campo id="paleta-personalizada" label="Describe tus colores" placeholder="Ej.: verde oliva con toques dorados…" value={idea.paletaPersonalizada} onChange={(v) => set({ paletaPersonalizada: v })} />
                )}
              </fieldset>
            )}

            {paso === 4 && (
              <fieldset>
                <legend>
                  <h1 className="disena__titulo" ref={titulo} tabIndex={-1}>
                    ¿Qué elementos florales necesitas?
                  </h1>
                  <span className="muted">Elige todo lo que te interese y lo revisamos contigo por WhatsApp.</span>
                </legend>
                {ELEMENTOS.map((g) => (
                  <div key={g.grupo} className="grupo" role="group" aria-labelledby={`grupo-${g.grupo}`}>
                    <p className="eyebrow" id={`grupo-${g.grupo}`}>
                      {g.grupo}
                    </p>
                    <div className="opciones opciones--2">
                      {g.opciones.map((o) => (
                        <label key={o.id} className="opcion opcion--check">
                          <input type="checkbox" value={o.id} checked={idea.elementos.includes(o.id)} onChange={() => alternar('elementos', o.id)} />
                          <span className="opcion__nombre">{o.nombre}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
                {idea.elementos.includes(OTRO) && (
                  <Campo id="otro-elemento" label="¿Qué otro elemento necesitas?" placeholder="Ej.: flores para el carro, para el pastel…" value={idea.otroElemento} onChange={(v) => set({ otroElemento: v })} />
                )}
              </fieldset>
            )}

            {!esResumen && (
              <>
                <p className="validacion" role="alert">
                  {error}
                </p>
                <div className="navegacion">
                  {paso === 1 ? (
                    <Link to="/eventos" className="btn btn--secondary">
                      <IconChevronLeft size={18} /> Volver a eventos
                    </Link>
                  ) : (
                    <button type="button" className="btn btn--secondary" onClick={() => ir(paso - 1)}>
                      <IconChevronLeft size={18} /> Atrás
                    </button>
                  )}
                  <button type="button" className="btn btn--primary" onClick={siguiente}>
                    {desdeResumen ? 'Guardar y ver resumen' : paso === 4 ? 'Ver mi resumen' : 'Continuar'}
                  </button>
                </div>
              </>
            )}

            {esResumen && (
              <div className="resumen">
                <h1 className="disena__titulo disena__titulo--grande" ref={titulo} tabIndex={-1}>
                  Tu idea floral
                </h1>
                <p className="muted">Revisa tus respuestas. Puedes editar cualquiera sin empezar de nuevo.</p>
                {estilo?.foto && <Foto img={estilo.foto} sizes="(min-width: 1100px) 50vw, 100vw" className="resumen__foto" />}
                <div className="muestras muestras--resumen" aria-hidden="true">
                  {PALETAS.filter((p) => idea.paletas.includes(p.id)).flatMap((p) => p.colores).map((c, k) => (
                    <span key={k} style={{ background: c }} />
                  ))}
                </div>
                <Filas idea={idea} onEditar={editar} />
                <div className="navegacion navegacion--resumen">
                  {wa && ideaCompleta(idea) ? (
                    <a className="btn btn--primary" href={wa} target="_blank" rel="noopener noreferrer">
                      <IconWhatsApp size={20} /> Enviar mi idea floral
                    </a>
                  ) : (
                    <p className="notice">Completa las cuatro preguntas para enviar tu idea.</p>
                  )}
                  <button type="button" className="btn btn--secondary" onClick={() => editar(1)}>
                    Modificar mis respuestas
                  </button>
                </div>
                <p className="muted nota">Se abre WhatsApp con tu mensaje listo para que lo revises y lo envíes.</p>
              </div>
            )}
          </div>

          {!esResumen && (
            <aside className="tu-idea" aria-label="Tu idea floral">
              <p className="h3">Tu idea floral</p>
              <Filas idea={idea} />
            </aside>
          )}
        </div>
      </div>
    </section>
  )
}
