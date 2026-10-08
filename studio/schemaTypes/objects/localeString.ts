import { defineField, defineType } from "sanity";
import { DEFAULT_LANGUAGE, LANGUAGES } from "../../languages";

export default defineType({
  name: "localeString",
  title: "Texto corto multilenguaje",
  type: "object",
  fieldsets: [
    { name: "translations", title: "Traducciones", options: { collapsible: true, collapsed: false } },
  ],
  fields: LANGUAGES.map((lang) =>
    defineField({
      name: lang.id,
      title: lang.title,
      type: "string",
      fieldset: lang.id === DEFAULT_LANGUAGE ? undefined : "translations",
      validation: (Rule) => (lang.id === DEFAULT_LANGUAGE ? Rule.required() : Rule),
    }),
  ),
});
