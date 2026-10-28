import "server-only";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import type { ExperienceEntry, ProjectEntry } from "./admin-schema";

/* Local-only content editing for /admin. Entries are written to src/content/data/*.json,
   which content/profile.ts and content/projects.ts merge with the built-in content.
   Nothing here runs on the published site: every handler is refused outside `next dev`. */

const dataDir = path.join(process.cwd(), "src", "content", "data");
const files = { experience: "experience.json", projects: "projects.json" } as const;
export type Kind = keyof typeof files;

export async function readEntries<K extends Kind>(kind: K): Promise<K extends "experience" ? ExperienceEntry[] : ProjectEntry[]> {
  const raw = await readFile(path.join(dataDir, files[kind]), "utf8").catch(() => "[]");
  return JSON.parse(raw);
}

export async function writeEntries(kind: Kind, entries: ExperienceEntry[] | ProjectEntry[]) {
  await writeFile(path.join(dataDir, files[kind]), JSON.stringify(entries, null, 2) + "\n", "utf8");
}

/** Uploaded project images live in public/projects/<slug>/. */
export const uploadDir = (slug: string) => path.join(process.cwd(), "public", "projects", slug);

export async function saveUpload(slug: string, name: string, bytes: Buffer) {
  const dir = uploadDir(slug);
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, name), bytes);
  return `/projects/${slug}/${name}`;
}

export async function removeUploads(slug: string) {
  await rm(uploadDir(slug), { recursive: true, force: true });
}

/**
 * Admin requests are only served by the local dev server, and only from the admin page itself.
 * Returns an error response to send back, or null when the request may go ahead.
 */
export function guard(request: Request): Response | null {
  if (process.env.NODE_ENV !== "development") return new Response("Not found", { status: 404 });
  const url = new URL(request.url);
  const local = ["localhost", "127.0.0.1", "[::1]"].includes(url.hostname);
  // Same-origin check blocks other websites from posting to the dev server while it runs.
  const origin = request.headers.get("origin");
  if (!local || origin !== url.origin) return new Response("Forbidden", { status: 403 });
  return null;
}
