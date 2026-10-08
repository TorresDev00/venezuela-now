import { defineMiddleware } from "astro:middleware";
import { withEdgeCache } from "./lib/cache";
import { applyCsp } from "./lib/csp";

export const onRequest = defineMiddleware(async (context, next) => {
  const { request } = context;
  const pathname = new URL(request.url).pathname;
  const cfContext = context.locals.cfContext;
  const waitUntil = cfContext?.waitUntil?.bind(cfContext);

  const response = await withEdgeCache(request, pathname, () => next(), waitUntil);

  // Reconstruir siempre: algunas respuestas (p.ej. la sub-request interna de
  // un Server Island) llegan con Headers inmutables y `.set()` directo
  // revienta con "Can't modify immutable headers".
  const headers = new Headers(response.headers);
  applyCsp(headers);
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
});
