import { ui, defaultLang, routes } from "./ui";

export type Lang = keyof typeof ui;
export type RouteKey = keyof typeof routes;

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split("/");
  if (lang in ui) return lang as Lang;
  return defaultLang;
}

export function useTranslations(lang: Lang) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]) {
    return ui[lang][key] ?? ui[defaultLang][key];
  };
}

// Devuelve una función que traduce una clave de `routes` a la ruta absoluta
// (desde la raíz del sitio) de esa página en el idioma indicado — por
// ejemplo translatePath('donate', 'es') => '/es/donar'.
export function useTranslatedPath(lang: Lang) {
  return function translatePath(key: RouteKey, targetLang: Lang = lang) {
    const slug = routes[key][targetLang];
    const base = targetLang === defaultLang ? "" : `/${targetLang}`;
    return slug ? `${base}/${slug}` : `${base}/`;
  };
}

// Deduce a qué entrada de `routes` corresponde la URL actual (comparando el
// slug tras el prefijo de idioma). Se usa para que el selector de idioma
// pueda enlazar a la página equivalente en el otro idioma, no siempre a home.
export function getRouteKeyFromUrl(url: URL): RouteKey {
  const lang = getLangFromUrl(url);
  const base = lang === defaultLang ? "" : `/${lang}`;
  const slug = url.pathname.slice(base.length).replace(/^\/|\/$/g, "");

  for (const key of Object.keys(routes) as RouteKey[]) {
    if (routes[key][lang] === slug) return key;
  }
  return "home";
}
