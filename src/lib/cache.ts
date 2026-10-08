// Envoltorio sobre la Cache API de Cloudflare Workers (`caches.default`), ver
// https://developers.astro.build/en/guides/integrations-guide/cloudflare/#cloudflare-runtime
// Solo cachea GET. TTL distinto para listados (300s) y artículos (3600s);
// la isla del home (NewsSection, server:defer) cuenta como listado.
//
// Plan B si este caché resulta inestable en producción: volver el home a
// estático (sin server:defer) y disparar un deploy hook de Cloudflare Pages/
// Workers desde un webhook de Sanity cuando se publique un artículo, en vez
// de depender de la Cache API en cada request.

export const LISTING_TTL_SECONDS = 300;
export const ARTICLE_TTL_SECONDS = 3600;

const ARTICLE_PATH = /^\/(es\/noticias|news)\/[^/]+\/?$/;
const LISTING_PATH = /^\/(es\/noticias|news)\/?$/;
const HOME_ISLAND_PATH = /^\/_server-islands\//;

export function ttlForPath(pathname: string): number | null {
  if (ARTICLE_PATH.test(pathname)) return ARTICLE_TTL_SECONDS;
  if (LISTING_PATH.test(pathname) || HOME_ISLAND_PATH.test(pathname)) return LISTING_TTL_SECONDS;
  return null;
}

type CFCache = { match(req: Request): Promise<Response | undefined>; put(req: Request, res: Response): Promise<void> };

function getCfCache(): CFCache | null {
  const cache = (globalThis as { caches?: { default?: CFCache } }).caches?.default;
  return cache ?? null;
}

export async function withEdgeCache(
  request: Request,
  pathname: string,
  handler: () => Promise<Response>,
  waitUntil?: (p: Promise<unknown>) => void,
): Promise<Response> {
  const ttl = request.method === "GET" ? ttlForPath(pathname) : null;
  const cache = ttl !== null ? getCfCache() : null;

  if (!cache || ttl === null) {
    return handler();
  }

  const cached = await cache.match(request);
  if (cached) {
    const headers = new Headers(cached.headers);
    headers.set("X-Cache", "HIT");
    return new Response(cached.body, { status: cached.status, headers });
  }

  const response = await handler();
  if (response.status !== 200) {
    const headers = new Headers(response.headers);
    headers.set("X-Cache", "MISS");
    return new Response(response.body, { status: response.status, headers });
  }

  const headers = new Headers(response.headers);
  headers.set("Cache-Control", `public, max-age=${ttl}`);
  headers.set("X-Cache", "MISS");
  const toServe = new Response(response.clone().body, { status: response.status, headers });
  const putPromise = cache.put(request, toServe.clone());
  if (waitUntil) waitUntil(putPromise);
  else await putPromise;

  return toServe;
}
