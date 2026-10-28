import "server-only";
import { readFile } from "node:fs/promises";
import path from "node:path";
import type { Lang } from "@/content/i18n";
import { hideDriveFolders } from "@/content/projects";
import { getStudiKasus } from "@/content/studi-kasus";

export type ImageMeta = { width: number; height: number; alt?: string };

export type LoadedCase = {
  /** Lines that appear before the title in the source (e.g. "Studi Kasus · …"). */
  kicker: string;
  /** Everything after the title, unchanged and in source order. */
  body: string;
  images: Record<string, ImageMeta>;
  /** "gambar N" / "figure N" → "Gambar N. …" / "Figure N. …" titles found in the text, used as alt text. */
  figureTitles: Record<string, string>;
};

const contentDir = (slug: string) => path.join(process.cwd(), "src", "content", "studi-kasus", slug);
const imageDir = (slug: string) => path.join(process.cwd(), "public", "studi-kasus", slug, "images");

const normalize = (s: string) =>
  s
    .replace(/^#+\s*/, "")
    .replace(/\*/g, "")
    .replace(/\s+/g, " ")
    .trim();

/** Intrinsic size (and SVG aria-label) of an image under /public, e.g. "/studi-kasus/x/images/gambar-1.png". */
export async function publicImageMeta(src: string): Promise<ImageMeta> {
  return readImageMeta(path.join(process.cwd(), "public", ...src.split("/").filter(Boolean)));
}

async function readImageMeta(file: string): Promise<ImageMeta> {
  const buf = await readFile(file);
  if (file.endsWith(".png")) {
    return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  }
  const svg = buf.toString("utf8");
  const vb = svg.match(/viewBox="[\d.\s-]*?\s([\d.]+)\s+([\d.]+)"/);
  const label = svg.match(/aria-label="([^"]+)"/);
  return { width: vb ? Number(vb[1]) : 700, height: vb ? Number(vb[2]) : 300, alt: label?.[1] };
}

/** Loads the full case in one language: portfolio.en.md for English, the original portofolio.md for Indonesian. */
export async function loadCase(slug: string, lang: Lang = "id"): Promise<LoadedCase> {
  const meta = getStudiKasus(slug);
  if (!meta) throw new Error(`Unknown case study: ${slug}`);

  const file = lang === "en" ? "portfolio.en.md" : "portofolio.md";
  const title = lang === "en" ? meta.titleEn : meta.title;
  const raw = hideDriveFolders((await readFile(path.join(contentDir(slug), file), "utf8")).replace(/\r\n/g, "\n"));
  const lines = raw.split("\n");
  const titleIndex = lines.findIndex((l) => normalize(l) === normalize(title));
  if (titleIndex === -1) {
    // Guard: the card title and the document title must stay identical.
    throw new Error(`Title of "${slug}" in ${file} does not match the card title`);
  }

  const kicker = lines
    .slice(0, titleIndex)
    .map((l) => l.trim())
    .filter(Boolean)
    .join(" ");
  // Charts are shown in English in both languages: point each figure at its "-en" version where one exists.
  const body = lines
    .slice(titleIndex + 1)
    .join("\n")
    .replace(/images\/([\w-]+)\.(png|svg)\)/g, (m, name: string, ext: string) =>
      meta.images.includes(`${name}-en.${ext}`) ? `images/${name}-en.${ext})` : m,
    );

  const images: Record<string, ImageMeta> = {};
  for (const file of meta.images) {
    images[file] = await readImageMeta(path.join(imageDir(slug), file));
  }

  const figureTitles: Record<string, string> = {};
  for (const m of body.matchAll(/\*\*((Gambar|Figure) (\d+)\.[^*]+?)\*\*/g)) {
    figureTitles[`${m[2].toLowerCase()} ${m[3]}`] = m[1].trim();
  }

  return { kicker, body, images, figureTitles };
}
