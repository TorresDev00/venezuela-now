// Idiomas soportados por el schema de artículos. Agregar un idioma nuevo es
// una sola línea aquí — los objetos localeString/localeText/localePortableText
// y localeSlug generan sus campos dinámicamente a partir de esta lista.
export const LANGUAGES = [
  { id: "en", title: "English", isDefault: true },
  { id: "es", title: "Español" },
] as const;

export type LanguageId = (typeof LANGUAGES)[number]["id"];

export const DEFAULT_LANGUAGE: LanguageId = LANGUAGES.find((l) => l.isDefault)!.id;
