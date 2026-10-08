import type { APIRoute } from "astro";
import { getSitemapEntries } from "../lib/news";

export const prerender = false;

function escapeXml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export const GET: APIRoute = async ({ site }) => {
  const base = site?.toString().replace(/\/$/, "") ?? "";
  const entries = await getSitemapEntries();

  const urlEntries = entries.flatMap((entry) => {
    const esSlug = entry.slugEs ?? entry.slugEn;
    const alternates = [
      entry.slugEn ? { lang: "en", path: `/news/${entry.slugEn}` } : null,
      esSlug ? { lang: "es", path: `/es/noticias/${esSlug}` } : null,
    ].filter((a): a is { lang: string; path: string } => a !== null);

    return alternates.map(({ path }) => ({ loc: `${base}${path}`, lastmod: entry.publishedAt, alternates }));
  });

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urlEntries
  .map(
    (u) => `  <url>
    <loc>${escapeXml(u.loc)}</loc>
    <lastmod>${new Date(u.lastmod).toISOString()}</lastmod>
${u.alternates.map((a) => `    <xhtml:link rel="alternate" hreflang="${a.lang}" href="${escapeXml(`${base}${a.path}`)}" />`).join("\n")}
  </url>`,
  )
  .join("\n")}
</urlset>
`;

  return new Response(body, { headers: { "Content-Type": "application/xml" } });
};
