# Manual de mantenimiento · Nina's Flowers

Esta es la web de Nina's Flowers: inicio, catálogo de 46 ramos con su ficha, página de Eventos y el formulario «Diseña tu evento». Todos los pedidos llegan por WhatsApp (314 300 9277). La web no cobra pagos ni guarda datos de los clientes.

## Cómo se publica

1. El código vive en GitHub, en el repositorio `ninas-flowers-web`.
2. Cloudflare Pages (gratis) está conectado a ese repositorio. Cada vez que algo cambia en la rama `main`, Cloudflare construye y publica la web sola en 1 o 2 minutos.
3. La configuración en Cloudflare Pages es:
   - **Framework preset:** None
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Variable de entorno:** `NODE_VERSION` = `22`

Si algo sale mal en una publicación, la versión anterior sigue en línea. En Cloudflare, en **Deployments**, se puede volver a una versión anterior con **Rollback**.

## Cambios frecuentes (se pueden hacer desde la página de GitHub, sin instalar nada)

En GitHub, abre el archivo, toca el lápiz ✏️ (Edit), haz el cambio y toca **Commit changes**. La web se actualiza sola.

| Quiero cambiar… | Archivo |
| --- | --- |
| Precio o nombre de un ramo | `content/catalogo.json` (campos `precio` y `nombre`). El precio va sin puntos: `185000`. |
| Ocultar un ramo sin borrarlo | `content/catalogo.json`: pon `"publicado": false`. |
| Número de WhatsApp | `content/sitio.json` (`whatsapp` con el 57 adelante, y `whatsappVisible` como se muestra). |
| Dirección de la web (cuando tengan dominio) | `content/sitio.json` → `urlSitio`, por ejemplo `https://ninasflowers.com`. Así se activan el mapa del sitio para Google y los enlaces para compartir. |
| Textos del inicio | `src/pages/Inicio.tsx` |
| Textos de Eventos | `src/pages/Eventos.tsx` |
| Opciones del formulario (eventos, estilos, colores, elementos) | `src/data/eventos.ts` |
| Instagram o TikTok | `src/lib/site.ts` |

**Importante:** no cambies el campo `id` de un ramo (por ejemplo `ramo-01-rosita`), porque forma la dirección de su ficha.

## Agregar un ramo nuevo o cambiar fotos

Esto necesita un computador con Node.js 22, o pedírselo a Claude.

1. Pon la foto original en `source-photos/` con el nombre del ramo, por ejemplo `ramo-47-margarita.jpg`.
2. Agrega el ramo al final de `content/catalogo.json`, copiando la forma de los demás.
3. Ejecuta `npm install` (solo la primera vez) y luego `npm run images`. Esto crea las versiones livianas de las fotos.
4. Ejecuta `npm run build` para revisar que todo funcione y sube los cambios a GitHub.

Las fotos del inicio y de Eventos están en `source-photos/sitio/`. Si cambias una, vuelve a ejecutar `npm run images`.

## Fotos de Eventos

- Las fotos que envió FM (terraza, cumpleaños, evento de empresa y los estilos Romántico, Minimalista, Botánico, Clásico y Moderno) están dentro de la web.
- Las demás fotos de Eventos son de Unsplash (licencia libre, uso comercial permitido sin pedir permiso) y se cargan desde images.unsplash.com.
- Cuando tengan fotos propias de sus eventos, conviene reemplazarlas. Las fotos están definidas en `src/data/eventos.ts`.

## Revisar antes de publicar (opcional, en computador)

```
npm install
npm run build      # construye la web en dist/
npm test           # pruebas del formulario de eventos
npm run test:e2e   # prueba la web en celular y computador
npm run preview    # abre la web construida en http://localhost:4173
```

## Qué hay dentro

- React 19 + Vite + TypeScript. Cada página se genera como HTML estático (inicio, catálogo, eventos, formulario y una página por ramo), lo que la hace rápida y la ayuda a salir en Google.
- Colores y letras del manual de identidad: verde bosque #0C291C, beige #E7D8C2, marfil #F8F5EF, Bodoni Moda y Jost.
- `content/`: datos (catálogo y datos del sitio). `src/`: páginas y estilos. `public/`: fotos ya optimizadas, íconos y logo. `scripts/`: optimización de fotos, generación de páginas y servidor de prueba.
