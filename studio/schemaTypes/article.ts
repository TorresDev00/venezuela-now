import { defineField, defineType } from "sanity";
import { DEFAULT_LANGUAGE } from "../languages";

export default defineType({
  name: "article",
  title: "Artículo",
  type: "document",
  fields: [
    defineField({
      name: "kind",
      title: "Tipo",
      type: "string",
      options: {
        list: [
          { title: "Noticia", value: "news" },
          { title: "Historia", value: "story" },
          { title: "Informe", value: "report" },
        ],
        layout: "radio",
      },
      initialValue: "news",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Título",
      type: "localeString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "localeSlug",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Extracto",
      type: "localeText",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "body",
      title: "Cuerpo",
      type: "localePortableText",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Fecha de publicación",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "mainImage",
      title: "Imagen principal",
      type: "mainImage",
    }),
    defineField({
      name: "featured",
      title: "Destacado",
      description: "Aparece en el bloque grande de la sección de noticias del home.",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "attachment",
      title: "Informe adjunto (PDF)",
      type: "file",
      options: { accept: "application/pdf" },
      hidden: ({ document }) => document?.kind !== "report",
    }),
  ],
  preview: {
    select: {
      title: `title.${DEFAULT_LANGUAGE}`,
      kind: "kind",
      media: "mainImage.image",
    },
    prepare({ title, kind, media }) {
      return { title, subtitle: kind, media };
    },
  },
});
