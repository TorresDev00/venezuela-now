import { defineField, defineType } from "sanity";

// El editor pega cualquier enlace estándar de YouTube; el frontend (ver
// astro-portabletext components en src/lib/portabletext.tsx) es responsable
// de extraer el video ID y construir siempre el iframe contra
// youtube-nocookie.com — así la CSP (frame-src) nunca depende de lo que el
// editor haya pegado aquí.
export default defineType({
  name: "youtubeEmbed",
  title: "Video de YouTube",
  type: "object",
  fields: [
    defineField({
      name: "url",
      title: "Enlace de YouTube",
      type: "url",
      validation: (Rule) =>
        Rule.required().custom((value) =>
          value && /youtu\.?be/.test(value) ? true : "Debe ser un enlace de youtube.com o youtu.be",
        ),
    }),
  ],
  preview: {
    select: { url: "url" },
    prepare({ url }) {
      return { title: "Video de YouTube", subtitle: url };
    },
  },
});
