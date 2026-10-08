// CSP centralizada: img-src permite el CDN de Sanity (fotos de artículos),
// frame-src solo youtube-nocookie.com (nunca youtube.com directo, ver
// PortableYoutube.astro). style-src necesita 'unsafe-inline' porque el sitio
// usa atributos style="" dinámicos (Hero.astro, etc.) — sin nonces por ahora.
const DIRECTIVES: Record<string, string[]> = {
  "default-src": ["'self'"],
  "img-src": ["'self'", "data:", "https://cdn.sanity.io"],
  "font-src": ["'self'"],
  "style-src": ["'self'", "'unsafe-inline'"],
  "script-src": ["'self'"],
  "connect-src": ["'self'", "https://*.api.sanity.io"],
  "frame-src": ["https://www.youtube-nocookie.com"],
  "object-src": ["'none'"],
  "base-uri": ["'self'"],
};

export const CSP_HEADER_VALUE = Object.entries(DIRECTIVES)
  .map(([key, values]) => `${key} ${values.join(" ")}`)
  .join("; ");

export function applyCsp(headers: Headers) {
  headers.set("Content-Security-Policy", CSP_HEADER_VALUE);
}
