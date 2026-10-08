import { sanityClient } from "./sanity";
import type { Lang } from "../i18n/utils";

export type ArticleKind = "news" | "story" | "report";

const DEFAULT_LANG: Lang = "en";

export interface NewsImage {
  raw: unknown;
  alt: string;
  lqip: string | null;
  width: number | null;
  height: number | null;
}

export interface NewsArticleSummary {
  id: string;
  kind: ArticleKind;
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  featured: boolean;
  isFallback: boolean;
  hasAttachment: boolean;
  image: NewsImage | null;
}

export interface NewsArticle extends NewsArticleSummary {
  body: unknown[];
  attachmentUrl: string | null;
  alternates: Partial<Record<Lang, string>>;
}

export interface NewsRange {
  items: NewsArticleSummary[];
  total: number;
}

export interface SitemapEntry {
  slugEn: string | null;
  slugEs: string | null;
  publishedAt: string;
}

// Fragmento de imagen reutilizado por el resumen y el artículo completo.
// `raw` se pasa tal cual a urlForImage() (src/lib/sanity.ts); lqip/width/height
// vienen de una dereferencia aparte del asset, solo para el placeholder y el
// srcset — no afecta el valor que necesita el image builder.
const IMAGE_FRAGMENT = `select(
  defined(mainImage.image) => {
    "raw": mainImage.image,
    "alt": coalesce(mainImage.alt[$lang], mainImage.alt.en, ""),
    "lqip": mainImage.image.asset->metadata.lqip,
    "width": mainImage.image.asset->metadata.dimensions.width,
    "height": mainImage.image.asset->metadata.dimensions.height
  },
  null
)`;

const SUMMARY_FIELDS = `
  "id": _id,
  kind,
  featured,
  publishedAt,
  "slug": coalesce(slug[$lang].current, slug.en.current),
  "title": coalesce(title[$lang], title.en),
  "excerpt": coalesce(excerpt[$lang], excerpt.en),
  "isFallback": !defined(title[$lang]),
  "hasAttachment": defined(attachment.asset),
  "image": ${IMAGE_FRAGMENT}
`;

const ARTICLE_FIELDS = `
  ${SUMMARY_FIELDS},
  "body": coalesce(body[$lang], body.en),
  "attachmentUrl": attachment.asset->url,
  "slugEn": slug.en.current,
  "slugEs": slug.es.current
`;

function kindFilter(type?: ArticleKind) {
  return type ? `&& kind == $kind` : "";
}

export async function getLatest(lang: Lang, limit = 6): Promise<NewsArticleSummary[]> {
  if (!sanityClient) return [];
  return sanityClient.fetch(
    `*[_type == "article"] | order(featured desc, publishedAt desc) [0...$limit] { ${SUMMARY_FIELDS} }`,
    { lang, limit },
  );
}

// Rango explícito (start/limit) en vez de page/pageSize: la página 1 sin
// filtro muestra un bento de 6 + 9 tarjetas grid (15 en total) y de ahí en
// adelante son 12 por página — un esquema asimétrico que un simple
// page*pageSize no puede expresar. El cálculo de esa asimetría vive en
// NewsListPage.astro, que es quien conoce la regla de diseño; getPage solo
// resuelve "dame los artículos de start a start+limit".
export async function getPage(
  lang: Lang,
  { type, start, limit }: { type?: ArticleKind; start: number; limit: number },
): Promise<NewsRange> {
  if (!sanityClient) return { items: [], total: 0 };

  const filter = `_type == "article" ${kindFilter(type)}`;
  const end = start + limit;
  // $kind solo se incluye cuando hay filtro — pasar `undefined` como valor
  // de parámetro rompe la serialización de GROQ ("Unable to parse value of
  // $kind=undefined").
  const kindParams = type ? { kind: type } : {};

  const [items, total] = await Promise.all([
    sanityClient.fetch<NewsArticleSummary[]>(
      `*[${filter}] | order(publishedAt desc) [${start}...${end}] { ${SUMMARY_FIELDS} }`,
      { lang, ...kindParams },
    ),
    sanityClient.fetch<number>(`count(*[${filter}])`, kindParams),
  ]);

  return { items, total };
}

export async function getBySlug(lang: Lang, slug: string): Promise<NewsArticle | null> {
  if (!sanityClient) return null;

  const raw = await sanityClient.fetch<
    (Omit<NewsArticle, "alternates"> & { slugEn: string | null; slugEs: string | null }) | null
  >(
    `*[_type == "article" && coalesce(slug[$lang].current, slug.en.current) == $slug][0] { ${ARTICLE_FIELDS} }`,
    { lang, slug },
  );
  if (!raw) return null;

  const { slugEn, slugEs, ...article } = raw;
  const alternates: Partial<Record<Lang, string>> = {};
  if (slugEn) alternates.en = slugEn;
  if (slugEs) alternates.es = slugEs ?? slugEn ?? undefined;
  // Idioma sin slug propio cae al slug en inglés (el artículo se ve en modo
  // fallback bajo esa URL, ver pastilla "English only / Solo en inglés").
  if (!slugEs && slugEn) alternates.es = slugEn;

  return { ...article, alternates };
}

export async function getSitemapEntries(): Promise<SitemapEntry[]> {
  if (!sanityClient) return [];
  return sanityClient.fetch(
    `*[_type == "article"] { "slugEn": slug.en.current, "slugEs": slug.es.current, publishedAt }`,
  );
}

export { DEFAULT_LANG };
