/** Contenido de la página de Eventos y del formulario «Diseña tu evento». */

export interface Imagen {
  src: string
  srcSet: string
  alt: string
}

/** Fotos propias de Nina's Flowers (en /public/img/sitio, generadas con `npm run images`). */
const propia = (archivo: string, alt: string): Imagen => ({
  src: `/img/sitio/${archivo}-1280.webp`,
  srcSet: `/img/sitio/${archivo}-640.webp 640w, /img/sitio/${archivo}-1280.webp 1280w`,
  alt,
})

/** Fotos de Unsplash (licencia libre). Se cargan desde images.unsplash.com. */
const unsplash = (id: string, alt: string): Imagen => {
  const u = (w: number) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=70`
  return { src: u(1200), srcSet: `${u(640)} 640w, ${u(1200)} 1200w, ${u(1800)} 1800w`, alt }
}

export const FOTOS = {
  inicioHero: propia('inicio-ramo-rojo', 'Ramo de flores rojas y naranjas dentro de una caja blanca, junto a una ventana.'),
  terraza: propia('eventos-terraza', 'Arreglos florales en rosados, blancos y verdes sobre una terraza frente al mar.'),
  cumpleanos: propia('eventos-cumpleanos', 'Arreglo floral rosado con globos de corazón para un cumpleaños.'),
  empresa: propia('eventos-empresa', 'Mesa larga con arreglos florales de colores y un arco floral de fondo.'),
  estRomantico: propia('estilo-romantico', 'Mesas redondas con rosas rosadas y blancas, velas y candelabros.'),
  estMinimalista: propia('estilo-minimalista', 'Mesa larga en un jardín con calas blancas y velas.'),
  estBotanico: propia('estilo-botanico', 'Mesa en un jardín con dalias rosadas y follaje verde.'),
  estClasico: propia('estilo-clasico', 'Centro de mesa con rosas rosadas y blancas alrededor de velas.'),
  heroEventos: unsplash('photo-1759124649699-010eeb1f69f8', 'Mesas de evento con centros florales de colores.'),
  cierre: unsplash('photo-1710587385309-f264b4d503cd', 'Jarrones con flores de distintos colores.'),
  bodas: unsplash('photo-1769812343890-4e406a33cfbe', 'Arco floral para una ceremonia al aire libre.'),
  cena: unsplash('photo-1732495522010-e0db10e3a56c', 'Mesa larga con velas y flores rosadas.'),
  galCumpleanos: unsplash('photo-1755704282977-340323fa52df', 'Salón de cumpleaños decorado con flores y globos.'),
  galRomantico: unsplash('photo-1562050147-fda1cc9a6378', 'Flores blancas junto a una vela encendida.'),
  galBabyShower: unsplash('photo-1743437935763-3624f213d02f', 'Decoración de baby shower con flores y velas.'),
  galFamiliar: unsplash('photo-1555495769-4defd2601c2c', 'Rosas blancas y rosadas en un jarrón.'),
  galEmpresa: unsplash('photo-1653821355226-6def361cc7ab', 'Mesa formal de cena decorada con flores.'),
  galLanzamiento: unsplash('photo-1785339677925-0d3aa66a8ce9', 'Instalación de orquídeas colgantes.'),
  galCelebracion: unsplash('photo-1759124650320-d629a3d73d9f', 'Mesas con arreglos florales de colores.'),
  estSilvestre: unsplash('photo-1625036801912-fe3e180234bb', 'Flores blancas y secas sobre hojas verdes.'),
} satisfies Record<string, Imagen>

export const DESTACADOS: { nombre: string; foto: Imagen }[] = [
  { nombre: 'Bodas y matrimonios', foto: FOTOS.bodas },
  { nombre: 'Cumpleaños', foto: FOTOS.cumpleanos },
  { nombre: 'Eventos de empresa y marca', foto: FOTOS.empresa },
  { nombre: 'Cenas y celebraciones privadas', foto: FOTOS.cena },
]

export const GALERIA: { nombre: string; foto: Imagen }[] = [
  { nombre: 'Bodas y ceremonias', foto: FOTOS.bodas },
  { nombre: 'Cumpleaños', foto: FOTOS.galCumpleanos },
  { nombre: 'Celebraciones románticas', foto: FOTOS.galRomantico },
  { nombre: 'Eventos familiares', foto: FOTOS.galFamiliar },
  { nombre: 'Empresas y marcas', foto: FOTOS.galEmpresa },
  { nombre: 'Lanzamientos e inauguraciones', foto: FOTOS.galLanzamiento },
  { nombre: 'Baby showers', foto: FOTOS.galBabyShower },
  { nombre: 'Celebraciones especiales', foto: FOTOS.galCelebracion },
]

export interface Opcion {
  id: string
  nombre: string
}

export const OTRO = 'otro'

export const EVENTOS: Opcion[] = [
  { id: 'boda', nombre: 'Boda o matrimonio' },
  { id: 'cumpleanos', nombre: 'Cumpleaños' },
  { id: 'aniversario', nombre: 'Aniversario o celebración romántica' },
  { id: 'baby-shower', nombre: 'Baby shower' },
  { id: 'familiar', nombre: 'Bautizo, primera comunión u otra celebración familiar' },
  { id: 'graduacion', nombre: 'Graduación' },
  { id: 'empresarial', nombre: 'Evento empresarial o corporativo' },
  { id: 'lanzamiento', nombre: 'Lanzamiento o inauguración' },
  { id: 'cena', nombre: 'Cena especial o celebración privada' },
  { id: OTRO, nombre: 'Otro evento' },
]

export interface Estilo extends Opcion {
  descripcion: string
  foto?: Imagen
}

export const ESTILOS: Estilo[] = [
  { id: 'romantico', nombre: 'Romántico', descripcion: 'Composiciones delicadas, formas suaves y una atmósfera cálida.', foto: FOTOS.estRomantico },
  { id: 'minimalista', nombre: 'Minimalista', descripcion: 'Diseños limpios, elegantes y equilibrados.', foto: FOTOS.estMinimalista },
  { id: 'botanico', nombre: 'Botánico editorial', descripcion: 'Composiciones naturales, expresivas y con una estética artística.', foto: FOTOS.estBotanico },
  { id: 'clasico', nombre: 'Clásico y elegante', descripcion: 'Arreglos sofisticados y atemporales.', foto: FOTOS.estClasico },
  { id: 'silvestre', nombre: 'Silvestre y orgánico', descripcion: 'Flores y follajes con una apariencia natural.', foto: FOTOS.estSilvestre },
  { id: 'moderno', nombre: 'Moderno y vanguardista', descripcion: 'Propuestas creativas con composiciones diferentes.', foto: { ...FOTOS.terraza, alt: 'Composiciones florales altas en rosados, blancos y verdes frente al mar.' } },
  { id: OTRO, nombre: 'Otro estilo', descripcion: 'Cuéntanos tu idea con tus propias palabras.' },
]

export interface Paleta extends Opcion {
  colores: string[]
}

export const PALETAS: Paleta[] = [
  { id: 'blancos', nombre: 'Blancos, marfiles y crema', colores: ['#FBF8F1', '#F1E8D6', '#E3D5B8'] },
  { id: 'rosados', nombre: 'Rosados suaves y pastel', colores: ['#F6D7DE', '#E9B5C2', '#D8E4F0'] },
  { id: 'rojos', nombre: 'Rojos, borgoñas y vino', colores: ['#C1272D', '#8E1B2E', '#5A0F1F'] },
  { id: 'tierra', nombre: 'Tonos tierra, beige y arena', colores: ['#E7D8C2', '#C8A27C', '#9A6B45'] },
  { id: 'verdes', nombre: 'Verdes y tonos botánicos', colores: ['#DCE5D2', '#8FA882', '#4F6B45'] },
  { id: 'amarillos', nombre: 'Amarillos y colores cálidos', colores: ['#F7E39A', '#F2B84B', '#E07B39'] },
  { id: 'lilas', nombre: 'Lila, lavanda y violeta', colores: ['#E6DDF2', '#B9A3D9', '#7D5BA6'] },
  { id: 'vibrantes', nombre: 'Vibrantes y atrevidos', colores: ['#E8336D', '#F5A623', '#2D9CDB'] },
  { id: 'personalizada', nombre: 'Una paleta personalizada', colores: [] },
]
export const PALETA_PERSONALIZADA = 'personalizada'

export const ELEMENTOS: { grupo: string; opciones: Opcion[] }[] = [
  { grupo: 'Mesas', opciones: [
    { id: 'centros-mesa', nombre: 'Centros de mesa' },
    { id: 'mesas-principales', nombre: 'Arreglos para mesas principales' },
    { id: 'mesas-postres', nombre: 'Mesas de postres o estaciones especiales' },
  ] },
  { grupo: 'Ceremonia', opciones: [
    { id: 'arco', nombre: 'Arco floral o estructura decorativa' },
    { id: 'altar', nombre: 'Decoración de altar o ceremonia' },
    { id: 'pasillos', nombre: 'Decoración de pasillos' },
    { id: 'sillas', nombre: 'Decoración de sillas' },
  ] },
  { grupo: 'Accesorios florales', opciones: [
    { id: 'ramo-novia', nombre: 'Ramo de novia' },
    { id: 'prendidos', nombre: 'Boutonnières y prendidos florales' },
    { id: 'coronas', nombre: 'Coronas y accesorios florales' },
  ] },
  { grupo: 'Espacios', opciones: [
    { id: 'bienvenida', nombre: 'Arreglos de bienvenida' },
    { id: 'entradas', nombre: 'Entradas y recibidores' },
    { id: 'instalaciones', nombre: 'Instalaciones florales y fondos decorativos' },
    { id: 'escenarios', nombre: 'Escenarios o espacios de fotografía' },
  ] },
  { grupo: 'A tu medida', opciones: [
    { id: 'marca', nombre: 'Eventos empresariales y de marca' },
    { id: 'personalizados', nombre: 'Arreglos florales personalizados' },
    { id: 'integral', nombre: 'Diseño floral integral para todo el evento' },
    { id: OTRO, nombre: 'Otro elemento' },
  ] },
]

export const PREGUNTAS = ['Evento', 'Estilo', 'Colores', 'Elementos'] as const
