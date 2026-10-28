import { notFound } from "next/navigation";
import { AdminApp } from "@/components/admin/admin-app";
import { builtInExperienceIds, experience } from "@/content/profile";
import { builtInProjectSlugs, getProject, projectLabel } from "@/content/projects";
import { readEntries } from "@/lib/admin-store";

export const dynamic = "force-dynamic";

/** Local content admin. Only available while running `npm run dev`; the published site returns 404. */
export default async function AdminPage() {
  if (process.env.NODE_ENV !== "development") notFound();

  const builtInProjects = builtInProjectSlugs.map((slug) => {
    const p = getProject(slug)!;
    return { slug, label: projectLabel(p, "id"), title: p.title.id, category: p.category };
  });
  const builtInExperience = experience
    .filter((e) => builtInExperienceIds.includes(e.id))
    .map((e) => ({ id: e.id, org: e.org, role: e.role.id, date: e.date.id }));

  return (
    <AdminApp
      initial={{ experience: await readEntries("experience"), projects: await readEntries("projects") }}
      builtInProjects={builtInProjects}
      builtInExperience={builtInExperience}
    />
  );
}
