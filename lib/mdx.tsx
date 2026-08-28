import type { ComponentType } from "react";
import { mdxComponents } from "./generated-content/index.js";

export type MdxComponents = Record<string, unknown>;
export type MdxContentComponent = ComponentType<{ components?: MdxComponents }>;

const generatedMdxComponents = mdxComponents as Record<string, MdxContentComponent | undefined>;

// Haalt de vooraf (tijdens de build, zie scripts/generate-content-data.mjs)
// naar een gewone React-component gecompileerde MDX-body van een post op.
export function getMdxComponent(slug: string): MdxContentComponent | undefined {
  return generatedMdxComponents[slug];
}
