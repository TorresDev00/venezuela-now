import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemaTypes";

// projectId/dataset son información pública (no secretos); el fallback
// hardcodeado permite abrir el studio sin configurar env vars primero.
const projectId = process.env.SANITY_STUDIO_PROJECT_ID || "fhf7y78g";
const dataset = process.env.SANITY_STUDIO_DATASET || "production";

export default defineConfig({
  name: "default",
  title: "Venezuela NOW — Noticias",
  projectId,
  dataset,
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
});
