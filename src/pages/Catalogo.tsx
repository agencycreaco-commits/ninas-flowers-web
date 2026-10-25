import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router'
import { IconClose, IconSearch } from '../components/Icons'
import { TarjetaRamo } from '../components/Ramo'
import { productos } from '../data/catalog'
import { ORDENES, RANGOS, filtrar, type Orden } from '../lib/search'

export default function Catalogo() {
  const [urlParams, setParams] = useSearchParams()
  // El HTML prerenderizado muestra el catálogo completo; los filtros de la URL se aplican al hidratar.
  const [montado, setMontado] = useState(false)
  useEffect(() => setMontado(true), [])
  const params = montado ? urlParams : new URLSearchParams()
  const q = params.get('q') ?? ''
  const rangos = (params.get('rango') ?? '').split(',').filter((r) => RANGOS.some((x) => x.id === r))
  const ordenParam = params.get('orden') as Orden | null
  const orden: Orden = ORDENES.some((o) => o.id === ordenParam) ? (ordenParam as Orden) : 'catalogo'

  const lista = useMemo(() => filtrar([...productos], { q, rangos, orden }), [q, rangos.join(','), orden]) // eslint-disable-line react-hooks/exhaustive-deps

  const actualizar = (cambios: Record<string, string>) => {
    const next = new URLSearchParams(params)
    for (const [k, v] of Object.entries(cambios)) {
      if (v) next.set(k, v)
      else next.delete(k)
    }
    setParams(next, { replace: true, preventScrollReset: true })
  }
  const alternarRango = (id: string) => {
    const set = rangos.includes(id) ? rangos.filter((r) => r !== id) : [...rangos, id]
    actualizar({ rango: set.join(',') })
  }
  const hayFiltros = q !== '' || rangos.length > 0

  return (
    <>
      <section className="page-intro">
        <div className="wrap">
          <p className="eyebrow">Catálogo</p>
          <h1 className="display">Nuestros ramos</h1>
          <p className="lead">Elige tu ramo, ábrelo y pídelo por WhatsApp. Precios en pesos colombianos.</p>
        </div>
      </section>

      <section className="section section--tight">
        <div className="wrap">
          <div className="toolbar">
            <label className="search">
              <IconSearch />
              <span className="sr-only">Buscar por nombre</span>
              <input
                type="search"
                placeholder="Buscar por nombre"
                value={q}
                onChange={(e) => actualizar({ q: e.target.value })}
                enterKeyHint="search"
              />
              {q && (
                <button type="button" className="search__clear" aria-label="Borrar búsqueda" onClick={() => actualizar({ q: '' })}>
                  <IconClose size={18} />
                </button>
              )}
            </label>
            <div className="toolbar__row">
              <div className="chips" role="group" aria-label="Filtrar por precio">
                <button type="button" className="chip" aria-pressed={rangos.length === 0} onClick={() => actualizar({ rango: '' })}>
                  Todos
                </button>
                {RANGOS.map((r) => (
                  <button key={r.id} type="button" className="chip" aria-pressed={rangos.includes(r.id)} onClick={() => alternarRango(r.id)}>
                    {r.etiqueta}
                  </button>
                ))}
              </div>
              <label className="sort">
                <span>Ordenar</span>
                <select value={orden} onChange={(e) => actualizar({ orden: e.target.value === 'catalogo' ? '' : e.target.value })}>
                  {ORDENES.map((o) => (
                    <option key={o.id} value={o.id}>
                      {o.etiqueta}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          <p className="results" aria-live="polite">
            {lista.length === productos.length ? `${lista.length} ramos` : `${lista.length} de ${productos.length} ramos`}
          </p>

          {lista.length > 0 ? (
            <div className="grid">
              {lista.map((p, i) => (
                <TarjetaRamo key={p.id} p={p} prioridad={i < 4} />
              ))}
            </div>
          ) : (
            <div className="empty">
              <h2 className="h2">No encontramos ramos con esa búsqueda</h2>
              <p className="muted">Prueba con otro nombre o quita los filtros de precio.</p>
              {hayFiltros && (
                <button type="button" className="btn btn--secondary" onClick={() => setParams(new URLSearchParams(), { replace: true })}>
                  Ver todos los ramos
                </button>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
