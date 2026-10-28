import { slugify } from "@/lib/admin-schema";
import { guard, saveUpload } from "@/lib/admin-store";

/* Uploads a project image from /admin into public/projects/<slug>/. Local dev server only. */

const MAX_BYTES = 5 * 1024 * 1024;
const TYPES: Record<string, string> = { "image/png": "png", "image/jpeg": "jpg", "image/webp": "webp", "image/svg+xml": "svg" };

export async function POST(request: Request) {
  const refused = guard(request);
  if (refused) return refused;

  const form = await request.formData().catch(() => null);
  const file = form?.get("file");
  const slug = String(form?.get("slug") ?? "");
  if (!(file instanceof File) || !/^[a-z0-9-]+$/.test(slug)) return Response.json({ error: "Isi slug proyek dulu, lalu pilih gambar." }, { status: 400 });

  const ext = TYPES[file.type];
  if (!ext) return Response.json({ error: "Format harus PNG, JPG, WebP, atau SVG." }, { status: 415 });
  if (file.size > MAX_BYTES) return Response.json({ error: "Ukuran maksimal 5 MB." }, { status: 413 });

  const bytes = Buffer.from(await file.arrayBuffer());
  if (ext === "svg" && /<script|\son\w+\s*=|javascript:|<foreignObject/i.test(bytes.toString("utf8"))) {
    return Response.json({ error: "SVG ini berisi skrip atau tautan aktif, jadi tidak diterima." }, { status: 415 });
  }

  const base = slugify(file.name.replace(/\.[^.]+$/, "")) || "gambar";
  const src = await saveUpload(slug, `${base}-${Date.now().toString(36)}.${ext}`, bytes);
  return Response.json({ src });
}
