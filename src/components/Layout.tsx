import { useEffect, useState, type ReactNode } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { metaFor } from '../lib/seo'
import { INSTAGRAM_URL, SITE_NAME, TIKTOK_URL, WHATSAPP_VISIBLE } from '../lib/site'
import { enlaceWhatsApp, mensajeGeneral } from '../lib/whatsapp'
import { mensajeEventos } from '../lib/idea'
import { IconClose, IconInstagram, IconMenu, IconSearch, IconTikTok, IconWhatsApp, Monograma } from './Icons'

export function Logo({ inverso = false }: { inverso?: boolean }) {
  return (
    <Link to="/" className={`logo${inverso ? ' logo--inverso' : ''}`} aria-label={`${SITE_NAME}, inicio`}>
      <Monograma size={34} />
      <span className="logo__texto">{SITE_NAME}</span>
    </Link>
  )
}

function Redes({ className = '' }: { className?: string }) {
  return (
    <div className={`redes ${className}`}>
      <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label="Instagram de Nina's Flowers (@by_ninasflowers)">
        <IconInstagram />
      </a>
      <a href={TIKTOK_URL} target="_blank" rel="noopener noreferrer" aria-label="TikTok de Nina's Flowers (@ninas.flowers)">
        <IconTikTok />
      </a>
    </div>
  )
}

const NAV = [
  { to: '/', label: 'Inicio', end: true },
  { to: '/catalogo', label: 'Catálogo', end: false },
  { to: '/eventos', label: 'Eventos', end: false },
]

function Header() {
  const [abierto, setAbierto] = useState(false)
  const { pathname } = useLocation()
  const wa = enlaceWhatsApp(mensajeGeneral())

  useEffect(() => setAbierto(false), [pathname])
  useEffect(() => {
    if (!abierto) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setAbierto(false)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [abierto])

  return (
    <header className="header">
      <div className="header__inner wrap">
        <Logo />
        <nav className="nav" aria-label="Principal">
          {NAV.map((n) => (
            <NavLink key={n.to} to={n.to} end={n.end}>
              {n.label}
            </NavLink>
          ))}
          <Link to="/#como-pedir">Cómo pedir</Link>
          {wa && (
            <a href={wa} target="_blank" rel="noopener noreferrer">
              Contacto
            </a>
          )}
        </nav>
        <div className="header__actions">
          <Redes className="solo-escritorio" />
          {wa && (
            <a className="btn btn--primary btn--sm solo-escritorio" href={wa} target="_blank" rel="noopener noreferrer">
              <IconWhatsApp size={18} /> WhatsApp
            </a>
          )}
          <Link to="/catalogo" className="icon-btn solo-movil" aria-label="Buscar en el catálogo">
            <IconSearch />
          </Link>
          <button
            type="button"
            className="icon-btn solo-movil"
            aria-label="Abrir menú"
            aria-expanded={abierto}
            aria-controls="menu-movil"
            onClick={() => setAbierto(true)}
          >
            <IconMenu />
          </button>
        </div>
      </div>

      <div id="menu-movil" className={`menu${abierto ? ' menu--abierto' : ''}`} role="dialog" aria-modal="true" aria-label="Menú" hidden={!abierto}>
        <div className="menu__top wrap">
          <Logo inverso />
          <button type="button" className="icon-btn" aria-label="Cerrar menú" onClick={() => setAbierto(false)}>
            <IconClose />
          </button>
        </div>
        <nav className="menu__nav wrap" aria-label="Menú">
          {NAV.map((n) => (
            <NavLink key={n.to} to={n.to} end={n.end}>
              {n.label}
            </NavLink>
          ))}
          <Link to="/#como-pedir">Cómo pedir</Link>
          {wa && (
            <a href={wa} target="_blank" rel="noopener noreferrer">
              Contacto
            </a>
          )}
        </nav>
        <div className="menu__foot wrap">
          {wa && (
            <a className="btn btn--claro btn--block" href={wa} target="_blank" rel="noopener noreferrer">
              <IconWhatsApp size={18} /> Escríbenos por WhatsApp
            </a>
          )}
          <Redes />
        </div>
      </div>
    </header>
  )
}

function Footer() {
  const wa = enlaceWhatsApp(mensajeGeneral())
  return (
    <footer className="footer">
      <div className="wrap footer__grid">
        <div className="footer__brand">
          <Logo inverso />
          <p>Ramos y diseño floral para tus momentos especiales. Pedidos por WhatsApp.</p>
        </div>
        <nav aria-label="Pie de página">
          <p className="eyebrow">Explora</p>
          <Link to="/">Inicio</Link>
          <Link to="/catalogo">Catálogo</Link>
          <Link to="/eventos">Eventos</Link>
          <Link to="/#como-pedir">Cómo pedir</Link>
        </nav>
        <div>
          <p className="eyebrow">Contacto</p>
          {wa && (
            <a href={wa} target="_blank" rel="noopener noreferrer">
              WhatsApp {WHATSAPP_VISIBLE}
            </a>
          )}
          <p className="eyebrow footer__siguenos">Síguenos</p>
          <Redes />
        </div>
      </div>
      <div className="wrap footer__legal">
        <span>© {new Date().getFullYear()} {SITE_NAME}</span>
      </div>
    </footer>
  )
}

function Fab() {
  const { pathname } = useLocation()
  const wa = enlaceWhatsApp(pathname.startsWith('/eventos') ? mensajeEventos() : mensajeGeneral())
  if (!wa) return null
  return (
    <a className="fab" href={wa} target="_blank" rel="noopener noreferrer" aria-label="Escribir a Nina's Flowers por WhatsApp">
      <IconWhatsApp size={28} />
    </a>
  )
}

/** Títulos de la pestaña, scroll al cambiar de página y animaciones al aparecer. */
function useComportamientoDePagina() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    document.title = metaFor(pathname).title
  }, [pathname])
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)))
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  useEffect(() => {
    const els = Array.from(document.querySelectorAll('.reveal:not(.is-visible)'))
    if (!('IntersectionObserver' in window)) {
      els.forEach((e) => e.classList.add('is-visible'))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const en of entries) {
          if (en.isIntersecting) {
            en.target.classList.add('is-visible')
            io.unobserve(en.target)
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )
    els.forEach((e) => io.observe(e))
    return () => io.disconnect()
  })
}

export function Layout({ children }: { children: ReactNode }) {
  useComportamientoDePagina()
  return (
    <>
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <Header />
      <main id="contenido">{children}</main>
      <Footer />
      <Fab />
    </>
  )
}
