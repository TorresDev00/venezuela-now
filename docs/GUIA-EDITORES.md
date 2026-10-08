# Guía para editores — Noticias de Venezuela NOW

Esta guía explica cómo publicar noticias, historias e informes desde Sanity Studio, sin tocar código.

## 1. Acceder al Studio

El Studio vive en la carpeta `studio/` del proyecto y se publica como una app aparte (no es parte del sitio web). Para entrar:

1. Pide que te agreguen como colaborador del proyecto de Sanity (proyecto `fhf7y78g`, dataset `production`).
2. Abre la URL del Studio publicado (la persona que lo desplegó con `npx sanity deploy` te la puede compartir — normalmente algo como `https://<nombre-del-proyecto>.sanity.studio`).
3. Inicia sesión con tu cuenta de Google/GitHub/email asociada al proyecto.

## 2. Crear un artículo nuevo

En el panel izquierdo, elige **Artículo** → **Create new**. Completa:

- **Tipo** — Noticia, Historia o Informe. Esto decide el color del punto en la tarjeta y si aparece la pastilla amarilla de descarga (solo Informes).
- **Título** — en inglés es obligatorio; en español es opcional. Si dejas el español vacío, el sitio en español muestra el artículo en inglés con una nota de "Solo en inglés" — esto es intencional, no un error.
- **Slug** — se genera solo a partir del título, en cada idioma. Puedes editarlo a mano si quieres una URL distinta.
- **Extracto** — el resumen corto que aparece en las tarjetas (una o dos líneas).
- **Cuerpo** — el texto completo del artículo. Admite negritas, cursivas, enlaces, encabezados, imágenes y videos de YouTube.
- **Fecha de publicación** — controla el orden en los listados.
- **Imagen principal** — la foto de portada. Siempre agrega el texto alternativo (describe la foto para personas que usan lector de pantalla).
- **Destacado** — si lo activas, este artículo tiene prioridad para aparecer como la tarjeta grande del home.
- **Informe adjunto (PDF)** — solo visible si el tipo es "Informe". Sube el PDF que la gente podrá descargar desde la página del artículo.

## 3. Videos de YouTube en el cuerpo

Dentro del editor de **Cuerpo**, usa el botón de insertar bloque y elige "Video de YouTube". Pega el enlace normal de YouTube (youtube.com/watch?v=... o youtu.be/...) — el sitio lo convierte automáticamente a la versión sin cookies (youtube-nocookie.com) por privacidad, no necesitas hacer nada especial.

## 4. Traducciones

Todo campo de texto tiene una sección plegable "Traducciones" con el resto de los idiomas (hoy, español). Si un artículo no tiene traducción al español:

- No aparece en el listado en español en su idioma propio, pero sigue siendo visible: se muestra con el contenido en inglés y una pastilla que avisa "Solo en inglés".
- Esto es útil para publicar algo rápido sin esperar a la traducción — pero trata de traducir cuanto antes los artículos importantes.

## 5. Publicar

Sanity guarda borradores automáticamente. Para que el cambio se vea en el sitio, dale click a **Publish** (arriba a la derecha del documento). Los cambios tardan unos minutos en reflejarse por el caché del sitio (hasta 5 minutos en listados, hasta 1 hora en artículos ya publicados).

## 6. Si algo no se actualiza

Si publicas un cambio y no lo ves en el sitio después de un rato razonable, puede ser el caché. Avisa a quien mantiene el sitio — puede forzar una limpieza, o si el caché resulta poco confiable, el sitio tiene un plan B (home estático + webhook de despliegue desde Sanity) que no depende de este caché en absoluto.

## 7. Primera carga de contenido (solo una vez)

Si el dataset está vacío, alguien con acceso técnico debe importar los artículos de ejemplo:

```
cd studio
npx sanity dataset import seed/sample-articles.ndjson production
```

Esto no borra nada existente; si un artículo con el mismo ID ya existe, te preguntará si quieres reemplazarlo.
