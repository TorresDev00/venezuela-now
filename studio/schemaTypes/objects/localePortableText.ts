import { defineArrayMember, defineField, defineType } from "sanity";
import { DEFAULT_LANGUAGE, LANGUAGES } from "../../languages";

export default defineType({
  name: "localePortableText",
  title: "Cuerpo multilenguaje",
  type: "object",
  fieldsets: [
    { name: "translations", title: "Traducciones", options: { collapsible: true, collapsed: true } },
  ],
  fields: LANGUAGES.map((lang) =>
    defineField({
      name: lang.id,
      title: lang.title,
      type: "array",
      of: [
        defineArrayMember({ type: "block" }),
        defineArrayMember({ type: "image", options: { hotspot: true } }),
        defineArrayMember({ type: "youtubeEmbed" }),
      ],
      fieldset: lang.id === DEFAULT_LANGUAGE ? undefined : "translations",
      validation: (Rule) => (lang.id === DEFAULT_LANGUAGE ? Rule.required() : Rule),
    }),
  ),
});
