import { IconInstagram, IconTikTok, IconWhatsApp } from '../components/Icons'
import { INSTAGRAM_URL, TIKTOK_URL, WHATSAPP_VISIBLE } from '../lib/site'
import { enlaceWhatsApp, mensajeGeneral } from '../lib/whatsapp'

export default function Contacto() {
  const wa = enlaceWhatsApp(mensajeGeneral())
  return (
    <section className="page-intro section">
      <div className="wrap">
        <p className="eyebrow">Contacto</p>
        <h1 className="display">Hablemos</h1>
        <p className="lead">Escríbenos por WhatsApp para pedir tu ramo o contarnos tu evento, y síguenos en redes.</p>
        <div className="contacto">
          {wa && (
            <a className="contacto__item" href={wa} target="_blank" rel="noopener noreferrer">
              <span className="contacto__icono">
                <IconWhatsApp size={22} />
              </span>
              <div>
                <strong>WhatsApp</strong>
                <span>{WHATSAPP_VISIBLE}</span>
              </div>
            </a>
          )}
          <a className="contacto__item" href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
            <span className="contacto__icono">
              <IconInstagram />
            </span>
            <div>
              <strong>Instagram</strong>
              <span>@by_ninasflowers</span>
            </div>
          </a>
          <a className="contacto__item" href={TIKTOK_URL} target="_blank" rel="noopener noreferrer">
            <span className="contacto__icono">
              <IconTikTok />
            </span>
            <div>
              <strong>TikTok</strong>
              <span>@ninas.flowers</span>
            </div>
          </a>
        </div>
      </div>
    </section>
  )
}
