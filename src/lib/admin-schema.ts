/* Format for entries added from /admin, shared by the form (client) and the API (server).
   It mirrors the shapes in content/profile.ts and content/projects.ts, so added entries render
   exactly like the built-in ones. Every text needs both languages. */

export type L = { en: string; id: string };

export type ExperienceEntry = {
  id: string;
  org: string;
  role: L;
  date: L;
  intro?: L;
  bullets: L[];
  related: string[];
};

export type ProjectFile = { label: L; href?: string; note?: L };

export type BsaRow = { label: L; text: L };

/** Business & System Analyst sections; only kept when the category is "bsa". */
export type BsaDetail = {
  asIs: L;
  rootCauses: L[];
  stakeholders: BsaRow[];
  iterations: BsaRow[];
  modules: L[];
  testing: L;
  acceptance: BsaRow[];
  roadmap: BsaRow[];
};

export type ProjectEntry = {
  slug: string;
  code: string;
  name: L;
  industry: L;
  field: L;
  tools: string[];
  category: "data" | "bsa";
  title: L;
  sentence: L;
  tags: L[];
  info: L[];
  figure: { src?: string; srcEn?: string; label: L };
  summary: L;
  data: L;
  decisions: L[];
  findings: L[];
  recommendation: L;
  limits: L;
  files: ProjectFile[];
  bsa?: BsaDetail;
};

export type Errors = Record<string, string>;
export type Result<T> = { ok: true; value: T } | { ok: false; errors: Errors };

export const emptyL = (): L => ({ en: "", id: "" });

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);

const filled = (s: string | undefined) => typeof s === "string" && s.trim().length > 0;
const isL = (v: unknown): v is L => !!v && typeof v === "object" && typeof (v as L).en === "string" && typeof (v as L).id === "string";
const lEmpty = (v: L | undefined) => !v || (!filled(v.en) && !filled(v.id));
const trimL = (v: L): L => ({ en: v.en.trim(), id: v.id.trim() });

const MSG = {
  both: "Isi versi EN dan ID.",
  required: "Wajib diisi.",
  minOne: "Isi minimal satu.",
  slug: "Hanya huruf kecil, angka, dan tanda hubung.",
  taken: "Sudah dipakai entri lain.",
  url: "Link harus diawali https://",
  related: "Proyek ini tidak ada.",
};

function needL(errors: Errors, path: string, v: unknown) {
  if (!isL(v) || !filled(v.en) || !filled(v.id)) errors[path] = MSG.both;
}

/** Optional bilingual text: empty is fine, half-filled is not. */
function optionalL(errors: Errors, path: string, v: unknown) {
  if (v === undefined || (isL(v) && lEmpty(v))) return;
  needL(errors, path, v);
}

function needList(errors: Errors, path: string, v: unknown, min = 1) {
  if (!Array.isArray(v)) {
    errors[path] = MSG.minOne;
    return;
  }
  const items = v.filter((x) => !(isL(x) && lEmpty(x)));
  if (items.length < min) errors[path] = MSG.minOne;
  items.forEach((x, i) => needL(errors, `${path}.${i}`, x));
}

const cleanList = (v: L[]) => v.filter((x) => !lEmpty(x)).map(trimL);

const rowEmpty = (r: BsaRow) => lEmpty(r.label) && lEmpty(r.text);
const cleanRows = (v: BsaRow[]) => v.filter((r) => !rowEmpty(r)).map((r) => ({ label: trimL(r.label), text: trimL(r.text) }));

/** Table rows: empty rows are ignored, a started row needs both cells in both languages. */
function rows(errors: Errors, path: string, v: unknown, min = 0) {
  const list = Array.isArray(v) ? (v as BsaRow[]).filter((r) => r && !rowEmpty(r)) : [];
  if (list.length < min) errors[path] = MSG.minOne;
  (Array.isArray(v) ? (v as BsaRow[]) : []).forEach((r, i) => {
    if (!r || rowEmpty(r)) return;
    needL(errors, `${path}.${i}.label`, r.label);
    needL(errors, `${path}.${i}.text`, r.text);
  });
}

function validateBsa(errors: Errors, b: BsaDetail | undefined) {
  needL(errors, "bsa.asIs", b?.asIs);
  needList(errors, "bsa.rootCauses", b?.rootCauses);
  rows(errors, "bsa.stakeholders", b?.stakeholders, 1);
  rows(errors, "bsa.iterations", b?.iterations);
  needList(errors, "bsa.modules", b?.modules);
  optionalL(errors, "bsa.testing", b?.testing);
  rows(errors, "bsa.acceptance", b?.acceptance);
  rows(errors, "bsa.roadmap", b?.roadmap, 1);
}
const cleanOptional = (v: L | undefined) => (v && !lEmpty(v) ? trimL(v) : undefined);

export function validateExperience(input: ExperienceEntry, ctx: { takenIds: string[]; projectSlugs: string[] }): Result<ExperienceEntry> {
  const errors: Errors = {};
  if (!filled(input.org)) errors.org = MSG.required;
  if (!/^[a-z0-9-]+$/.test(input.id ?? "")) errors.id = MSG.slug;
  else if (ctx.takenIds.includes(input.id)) errors.id = MSG.taken;
  needL(errors, "role", input.role);
  needL(errors, "date", input.date);
  optionalL(errors, "intro", input.intro);
  needList(errors, "bullets", input.bullets);
  (input.related ?? []).forEach((s, i) => {
    if (!ctx.projectSlugs.includes(s)) errors[`related.${i}`] = MSG.related;
  });
  if (Object.keys(errors).length) return { ok: false, errors };
  const value: ExperienceEntry = {
    id: input.id,
    org: input.org.trim(),
    role: trimL(input.role),
    date: trimL(input.date),
    intro: cleanOptional(input.intro),
    bullets: cleanList(input.bullets),
    related: [...new Set(input.related ?? [])],
  };
  return { ok: true, value };
}

export function validateProject(input: ProjectEntry, ctx: { takenSlugs: string[] }): Result<ProjectEntry> {
  const errors: Errors = {};
  if (!/^[a-z0-9-]+$/.test(input.slug ?? "")) errors.slug = MSG.slug;
  else if (ctx.takenSlugs.includes(input.slug)) errors.slug = MSG.taken;
  if (!filled(input.code)) errors.code = MSG.required;
  if (input.category !== "data" && input.category !== "bsa") errors.category = MSG.required;
  needL(errors, "name", input.name);
  needL(errors, "industry", input.industry);
  needL(errors, "field", input.field);
  needL(errors, "title", input.title);
  needL(errors, "sentence", input.sentence);
  needList(errors, "tags", input.tags);
  needList(errors, "info", input.info);
  needL(errors, "figure.label", input.figure?.label);
  for (const k of ["summary", "data", "recommendation", "limits"] as const) needL(errors, k, input[k]);
  needList(errors, "decisions", input.decisions);
  needList(errors, "findings", input.findings);
  if (input.category === "bsa") validateBsa(errors, input.bsa);
  (input.files ?? []).forEach((f, i) => {
    if (lEmpty(f.label) && !filled(f.href) && lEmpty(f.note)) return; // an empty row is ignored
    needL(errors, `files.${i}.label`, f.label);
    if (filled(f.href) && !/^https:\/\/\S+$/.test(f.href!.trim())) errors[`files.${i}.href`] = MSG.url;
    optionalL(errors, `files.${i}.note`, f.note);
  });
  if (Object.keys(errors).length) return { ok: false, errors };
  const value: ProjectEntry = {
    slug: input.slug,
    code: input.code.trim(),
    name: trimL(input.name),
    industry: trimL(input.industry),
    field: trimL(input.field),
    tools: [...new Set((input.tools ?? []).map((t) => t.trim()).filter(Boolean))],
    category: input.category,
    title: trimL(input.title),
    sentence: trimL(input.sentence),
    tags: cleanList(input.tags),
    info: cleanList(input.info),
    figure: { src: input.figure.src || undefined, srcEn: input.figure.srcEn || undefined, label: trimL(input.figure.label) },
    summary: trimL(input.summary),
    data: trimL(input.data),
    decisions: cleanList(input.decisions),
    findings: cleanList(input.findings),
    recommendation: trimL(input.recommendation),
    limits: trimL(input.limits),
    files: (input.files ?? [])
      .filter((f) => !(lEmpty(f.label) && !filled(f.href) && lEmpty(f.note)))
      .map((f) => ({ label: trimL(f.label), href: filled(f.href) ? f.href!.trim() : undefined, note: cleanOptional(f.note) })),
    bsa:
      input.category === "bsa" && input.bsa
        ? {
            asIs: trimL(input.bsa.asIs),
            rootCauses: cleanList(input.bsa.rootCauses),
            stakeholders: cleanRows(input.bsa.stakeholders),
            iterations: cleanRows(input.bsa.iterations),
            modules: cleanList(input.bsa.modules),
            testing: cleanOptional(input.bsa.testing) ?? emptyL(),
            acceptance: cleanRows(input.bsa.acceptance),
            roadmap: cleanRows(input.bsa.roadmap),
          }
        : undefined,
  };
  return { ok: true, value };
}

export const blankExperience = (): ExperienceEntry => ({
  id: "",
  org: "",
  role: emptyL(),
  date: emptyL(),
  intro: emptyL(),
  bullets: [emptyL()],
  related: [],
});

export const blankProject = (): ProjectEntry => ({
  slug: "",
  code: "",
  name: emptyL(),
  industry: emptyL(),
  field: emptyL(),
  tools: [],
  category: "data",
  title: emptyL(),
  sentence: emptyL(),
  tags: [emptyL()],
  info: [emptyL()],
  figure: { label: emptyL() },
  summary: emptyL(),
  data: emptyL(),
  decisions: [emptyL()],
  findings: [emptyL()],
  recommendation: emptyL(),
  limits: emptyL(),
  files: [],
});

export const emptyRow = (): BsaRow => ({ label: emptyL(), text: emptyL() });

export const blankBsa = (): BsaDetail => ({
  asIs: emptyL(),
  rootCauses: [emptyL()],
  stakeholders: [emptyRow()],
  iterations: [emptyRow()],
  modules: [emptyL()],
  testing: emptyL(),
  acceptance: [],
  roadmap: [emptyRow()],
});
