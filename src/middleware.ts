import { defineMiddleware } from "astro:middleware";
import { withEdgeCache } from "./lib/cache";
import { applyCsp } from "./lib/csp";

export const onRequest = defineMiddleware(async (context, next) => {
  const { request } = context;
  const pathname = new URL(request.url).pathname;
  const cfContext = context.locals.cfContext;
  const waitUntil = cfContext?.waitUntil?.bind(cfContext);

  const response = await withEdgeCache(request, pathname, () => next(), waitUntil);
  applyCsp(response.headers);
  return response;
});
