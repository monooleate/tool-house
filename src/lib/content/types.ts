// Shared types for SEO content data files
import type { ToolContent, ToolFAQ } from "../tool-registry.ts";

export interface ToolSEOData {
  content: ToolContent;
  faq: ToolFAQ[];
  introText: string;
  guide: string[];
}

export type ContentMap = Record<string, ToolSEOData>;
