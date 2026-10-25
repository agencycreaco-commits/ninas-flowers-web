import { Link } from 'react-router'

export default function NoEncontrada() {
  return (
    <section className="page-intro page-intro--centro">
      <div className="wrap">
        <p className="eyebrow">Error 404</p>
        <h1 className="display">Esta página no existe</h1>
        <p className="lead">Puede que el enlace esté mal escrito o que el ramo ya no esté en el catálogo.</p>
        <div className="acciones">
          <Link to="/catalogo" className="btn btn--primary">
            Ver catálogo
          </Link>
          <Link to="/" className="btn btn--secondary">
            Ir al inicio
          </Link>
        </div>
      </div>
    </section>
  )
}
