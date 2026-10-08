import { createClient, type SanityClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const projectId = import.meta.env.SANITY_PROJECT_ID;
const dataset = import.meta.env.SANITY_DATASET;

export const sanityEnabled = Boolean(projectId && dataset);

if (!sanityEnabled) {
  // No rompe el build/la página: news.ts devuelve listas vacías cuando
  // sanityClient es null, pero avisamos una vez para que no pase inadvertido.
  console.warn(
    "[sanity] SANITY_PROJECT_ID/SANITY_DATASET no están definidas — las secciones de noticias se mostrarán vacías.",
  );
}

export const sanityClient: SanityClient | null = sanityEnabled
  ? createClient({
      projectId,
      dataset,
      apiVersion: "2024-01-01",
      useCdn: true,
    })
  : null;

const builder = sanityClient ? imageUrlBuilder(sanityClient) : null;

export function urlForImage(source: unknown) {
  if (!builder || !source) return null;
  return builder.image(source as any);
}
