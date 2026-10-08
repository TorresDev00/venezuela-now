import { defineField, defineType } from "sanity";
import { DEFAULT_LANGUAGE, LANGUAGES } from "../../languages";

export default defineType({
  name: "localeSlug",
  title: "Slug multilenguaje",
  type: "object",
  fieldsets: [
    { name: "translations", title: "Traducciones", options: { collapsible: true, collapsed: false } },
  ],
  fields: LANGUAGES.map((lang) =>
    defineField({
      name: lang.id,
      title: lang.title,
      type: "slug",
      options: {
        source: (doc: any) => doc?.title?.[lang.id],
        maxLength: 96,
      },
      fieldset: lang.id === DEFAULT_LANGUAGE ? undefined : "translations",
      validation: (Rule) => (lang.id === DEFAULT_LANGUAGE ? Rule.required() : Rule),
    }),
  ),
});
