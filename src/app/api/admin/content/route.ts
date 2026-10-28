import { builtInExperienceIds } from "@/content/profile";
import { builtInProjectSlugs } from "@/content/projects";
import { validateExperience, validateProject, type ExperienceEntry, type ProjectEntry } from "@/lib/admin-schema";
import { guard, readEntries, removeUploads, writeEntries } from "@/lib/admin-store";

/* Add, edit, and delete entries from /admin. Local dev server only (see guard). */

type SaveBody =
  | { kind: "experience"; entry: ExperienceEntry; original?: string }
  | { kind: "projects"; entry: ProjectEntry; original?: string };

async function lists() {
  return { experience: await readEntries("experience"), projects: await readEntries("projects") };
}

export async function POST(request: Request) {
  const refused = guard(request);
  if (refused) return refused;
  const body = (await request.json().catch(() => null)) as SaveBody | null;
  if (!body || !body.entry) return Response.json({ error: "Bad request" }, { status: 400 });

  const { experience, projects } = await lists();

  if (body.kind === "experience") {
    const others = experience.filter((e) => e.id !== body.original);
    const projectSlugs = [...builtInProjectSlugs, ...projects.map((p) => p.slug)];
    const res = validateExperience(body.entry, { takenIds: [...builtInExperienceIds, ...others.map((e) => e.id)], projectSlugs });
    if (!res.ok) return Response.json({ errors: res.errors }, { status: 422 });
    const at = experience.findIndex((e) => e.id === body.original);
    // New entries go first: the site lists experience newest first.
    const next = at === -1 ? [res.value, ...experience] : experience.map((e, i) => (i === at ? res.value : e));
    await writeEntries("experience", next);
  } else if (body.kind === "projects") {
    const others = projects.filter((p) => p.slug !== body.original);
    const res = validateProject(body.entry, { takenSlugs: [...builtInProjectSlugs, ...others.map((p) => p.slug)] });
    if (!res.ok) return Response.json({ errors: res.errors }, { status: 422 });
    const at = projects.findIndex((p) => p.slug === body.original);
    const next = at === -1 ? [...projects, res.value] : projects.map((p, i) => (i === at ? res.value : p));
    await writeEntries("projects", next);
    // Keep experience links pointing at a renamed project.
    if (at !== -1 && body.original && body.original !== res.value.slug) {
      await writeEntries(
        "experience",
        experience.map((e) => ({ ...e, related: e.related.map((s) => (s === body.original ? res.value.slug : s)) })),
      );
    }
  } else {
    return Response.json({ error: "Bad request" }, { status: 400 });
  }
  return Response.json(await lists());
}

export async function DELETE(request: Request) {
  const refused = guard(request);
  if (refused) return refused;
  const body = (await request.json().catch(() => null)) as { kind?: string; id?: string } | null;
  if (!body?.id) return Response.json({ error: "Bad request" }, { status: 400 });

  const { experience, projects } = await lists();
  if (body.kind === "experience") {
    await writeEntries("experience", experience.filter((e) => e.id !== body.id));
  } else if (body.kind === "projects") {
    const gone = projects.find((p) => p.slug === body.id);
    if (!gone) return Response.json({ error: "Not found" }, { status: 404 });
    await writeEntries("projects", projects.filter((p) => p.slug !== body.id));
    // Drop links from added experience entries, and the project's uploaded images.
    await writeEntries("experience", experience.map((e) => ({ ...e, related: e.related.filter((s) => s !== body.id) })));
    const folder = gone.figure.src?.match(/^\/projects\/([a-z0-9-]+)\//)?.[1];
    await removeUploads(gone.slug);
    if (folder && folder !== gone.slug && !projects.some((p) => p.slug !== gone.slug && p.figure.src?.startsWith(`/projects/${folder}/`))) {
      await removeUploads(folder);
    }
  } else {
    return Response.json({ error: "Bad request" }, { status: 400 });
  }
  return Response.json(await lists());
}
