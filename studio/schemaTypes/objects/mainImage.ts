import { defineField, defineType } from "sanity";

export default defineType({
  name: "mainImage",
  title: "Imagen principal",
  type: "object",
  fields: [
    defineField({
      name: "image",
      title: "Imagen",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "alt",
      title: "Texto alternativo",
      type: "localeString",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { media: "image" },
  },
});
