# MAX Training — Landing de entrenador personal

Página web de una sola pantalla para un entrenador personal, en español y con tema oscuro.
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

Hero · Marquesina · Sobre mí · Tu objetivo · El proceso · Servicios ·
Opiniones · Preguntas frecuentes · Contacto · Footer

## Imágenes pendientes

Los huecos de imagen se ven como un recuadro punteado con el texto «Insertar imagen».
Cada uno está marcado con un atributo `data-slot`:

| `data-slot`              | Dónde va                    | Proporción |
| ------------------------ | --------------------------- | ---------- |
| `hero`                   | Foto principal              | vertical   |
| `sobre-mi`               | Retrato de la sección Sobre mí | 4:5     |
| `avatar-1`, `avatar-2`, `avatar-3` | Fotos de las reseñas | 1:1     |

Para colocar una imagen real, sustituye el contenido del recuadro por una etiqueta `img`
(el CSS ya la recorta a la medida correcta):

```html
<div class="img-slot img-slot--hero" data-slot="hero">
  <img src="img/hero.jpg" alt="Entrenador personal en el gimnasio">
</div>
```

## Personalizar

- **Colores:** todas las variables están al principio de `styles.css`, en `:root`.
  Cambiando `--verde`, `--verde-claro`, `--verde-tinte` y `--verde-hondo` cambia el acento
  de toda la web.
- **Nombre y datos de contacto:** email, teléfono y dirección son de ejemplo. Aparecen en la
  sección de contacto y en el footer.
- **WhatsApp:** hay siete enlaces `wa.me` en `index.html` (los cuatro botones de Servicios,
  el de Contacto, el del footer y el botón flotante), todos con el número real
  `5493424863765`. Si alguna vez cambia, el formato es código de país + área + número,
  sin `+`, espacios ni guiones. Cada botón de Servicios lleva un mensaje distinto ya
  escrito, así sabés desde qué plan te escriben.
- **Instagram:** ya apunta a la cuenta real, `@mr_entrenamiento` (sección Contacto y footer).

No hay formulario de contacto: toda la conversión pasa por WhatsApp e Instagram, así que
esos enlaces son el único canal de entrada. Si dejan de funcionar, la página deja de convertir.

## Accesibilidad

Navegación por teclado con foco visible, etiquetas ARIA en el menú y respeto por
`prefers-reduced-motion`.
