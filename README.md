# Máximo Romero Entrenamiento — Landing

Página web de una sola pantalla para Máximo Romero, entrenador e instructor en musculación
de Santa Fe Capital. Español rioplatense, paleta monocroma (negro, gris y blanco).
HTML, CSS y JavaScript sin dependencias ni proceso de compilación.

## Ver la página

- **En producción:** https://awdawawdadwawd.github.io/max-training/
- **En local:** abre `index.html` en el navegador. No hace falta servidor.

## Estructura

```
index.html    Estructura y contenido
styles.css    Estilos (paleta y medidas en :root)
script.js     Menú móvil, animaciones de entrada y navegación activa
img/          Imágenes del sitio
```

## Secciones

Hero · Marquesina · Sobre mí · Tu objetivo · El proceso · Galería · Servicios ·
Preguntas frecuentes · Contacto · Footer

## Imágenes

Las fotos viven en `img/` y están optimizadas para web (lado largo de 1200 a 1600 px,
JPEG de calidad 80-86). Las cinco juntas pesan unos 750 KB.

| Archivo          | Dónde se usa                | Proporción del hueco |
| ---------------- | --------------------------- | -------------------- |
| `hero.jpg`       | Foto principal              | vertical, recortada  |
| `sobre-mi.jpg`   | Retrato de la sección Sobre mí | 4:5               |
| `galeria-1..3.jpg` | Sección «Así se entrena»  | 3:4                  |
| `poster-1..2.jpg`  | Fotograma de respaldo de cada video | 3:4          |

## Videos

Están en `video/`, recortados a 6 segundos, sin audio y comprimidos en H.264.
Se reproducen solos, en bucle y en silencio, dentro de la galería.

Con `preload="none"` no se descargan hasta que la persona baja hasta la galería, y
`script.js` los arranca y los pausa según entren o salgan de la pantalla. Quien nunca
llega a esa sección no gasta ni un byte en ellos.

Si el navegador bloquea la reproducción automática, o si el sistema tiene activado
«reducir movimiento», aparecen los controles en lugar de reproducirse solos.

Para reemplazar una foto, pisá el archivo con otro del mismo nombre y actualizá los
atributos `width` y `height` de la etiqueta `img` en `index.html` para que coincidan con
las nuevas dimensiones (evitan que el texto salte mientras carga la imagen).

Antes de subir una foto nueva conviene reducirla: las fotos de teléfono pesan varios
megabytes y harían la página muy lenta en datos móviles.

## Personalizar

- **Colores:** todas las variables están al principio de `styles.css`, en `:root`.
  La paleta es monocroma: `--fondo`, `--superficie` y `--texto` para los grises, y
  `--acento` (blanco) para botones y detalles. Cambiando `--acento` y `--sobre-acento`
  se puede introducir un color de marca sin tocar nada más.
- **WhatsApp:** hay siete enlaces `wa.me` en `index.html` (los cuatro botones de Servicios,
  el de Contacto, el del footer y el botón flotante), todos con el número real
  `5493424863765`. Si alguna vez cambia, el formato es código de país + área + número,
  sin `+`, espacios ni guiones. Cada botón de Servicios lleva un mensaje distinto ya
  escrito, así sabés desde qué plan te escriben.
- **Instagram:** ya apunta a la cuenta real, `@mr_entrenamiento` (sección Contacto y footer).

No hay formulario de contacto: toda la conversión pasa por WhatsApp e Instagram, así que
esos enlaces son el único canal de entrada. Si dejan de funcionar, la página deja de convertir.

## Contenido pendiente de completar

- **Textos legales:** los enlaces del footer a aviso legal, privacidad y cookies no
  apuntan a ninguna página todavía.
## Nota sobre las fotos que se envían por WhatsApp

WhatsApp recomprime las imágenes que se mandan como foto: una de 2288x4080 llega a
718x1280 y pierde definición. Para conservar la calidad hay que enviarlas como
**documento** (el clip → «Documento»), no desde la galería de fotos.

## Accesibilidad

Navegación por teclado con foco visible, etiquetas ARIA en el menú y respeto por
`prefers-reduced-motion`.
