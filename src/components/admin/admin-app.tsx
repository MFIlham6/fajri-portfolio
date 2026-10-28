"use client";

import { useId, useState, type ReactNode } from "react";
import {
  blankBsa,
  blankExperience,
  blankProject,
  emptyL,
  emptyRow,
  slugify,
  validateExperience,
  validateProject,
  type Errors,
  type ExperienceEntry,
  type BsaDetail,
  type BsaRow,
  type L,
  type ProjectEntry,
  type ProjectFile,
} from "@/lib/admin-schema";

/* Local content admin. Built-in entries (written in content/*.ts) are shown read-only;
   entries added here are saved to content/data/*.json and appear on the site right away. */

type Lists = { experience: ExperienceEntry[]; projects: ProjectEntry[] };
type BuiltInProject = { slug: string; label: string; title: string; category: "data" | "bsa" };
type BuiltInExperience = { id: string; org: string; role: string; date: string };
type Editing =
  | { kind: "experience"; original?: string; draft: ExperienceEntry; slugTouched: boolean }
  | { kind: "projects"; original?: string; draft: ProjectEntry; slugTouched: boolean };

/* ---------- Small form pieces ---------- */

function Field({ label, hint, error, children }: { label: string; hint?: string; error?: string; children: ReactNode }) {
  const id = useId();
  // The group's name tells screen readers which field an EN / ID box belongs to.
  return (
    <div className={error ? "f has-error" : "f"} role="group" aria-labelledby={id}>
      <div className="f__label" id={id}>{label}</div>
      {hint && <p className="f__hint">{hint}</p>}
      {children}
      {error && <p className="f__error" role="alert">{error}</p>}
    </div>
  );
}

function BiInput({ value, onChange, long, placeholder }: { value: L | undefined; onChange: (v: L) => void; long?: boolean; placeholder?: L }) {
  const v = value ?? emptyL();
  const Tag = long ? "textarea" : "input";
  return (
    <div className="bi">
      {(["en", "id"] as const).map((k) => (
        <label key={k} className="bi__col">
          <span className="bi__tag">{k.toUpperCase()}</span>
          <Tag value={v[k]} rows={long ? 4 : undefined} placeholder={placeholder?.[k]} onChange={(e) => onChange({ ...v, [k]: e.target.value })} />
        </label>
      ))}
    </div>
  );
}

function BiList({ items, onChange, errors, path, long, addLabel }: { items: L[]; onChange: (v: L[]) => void; errors: Errors; path: string; long?: boolean; addLabel: string }) {
  return (
    <div className="list">
      {items.map((it, i) => (
        <div className="list__row" key={i}>
          <span className="list__no">{i + 1}</span>
          <div className="list__body">
            <BiInput value={it} long={long} onChange={(v) => onChange(items.map((x, j) => (j === i ? v : x)))} />
            {errors[`${path}.${i}`] && <p className="f__error">{errors[`${path}.${i}`]}</p>}
          </div>
          <button type="button" className="btn-x" aria-label="Hapus baris" onClick={() => onChange(items.filter((_, j) => j !== i))}>
            ×
          </button>
        </div>
      ))}
      <button type="button" className="btn-sm" onClick={() => onChange([...items, emptyL()])}>
        + {addLabel}
      </button>
    </div>
  );
}

/** Rows of two bilingual cells, for the BSA tables (role → needs, feedback → change, step → reason). */
function RowList({ items, onChange, errors, path, labels, addLabel }: { items: BsaRow[]; onChange: (v: BsaRow[]) => void; errors: Errors; path: string; labels: [string, string]; addLabel: string }) {
  const setRow = (i: number, r: Partial<BsaRow>) => onChange(items.map((x, j) => (j === i ? { ...x, ...r } : x)));
  return (
    <div className="list">
      {items.map((r, i) => (
        <div className="list__row" key={i}>
          <span className="list__no">{i + 1}</span>
          <div className="list__body">
            <Field label={labels[0]} error={errors[`${path}.${i}.label`]}>
              <BiInput value={r.label} onChange={(label) => setRow(i, { label })} />
            </Field>
            <Field label={labels[1]} error={errors[`${path}.${i}.text`]}>
              <BiInput long value={r.text} onChange={(text) => setRow(i, { text })} />
            </Field>
          </div>
          <button type="button" className="btn-x" aria-label="Hapus baris" onClick={() => onChange(items.filter((_, j) => j !== i))}>
            ×
          </button>
        </div>
      ))}
      <button type="button" className="btn-sm" onClick={() => onChange([...items, emptyRow()])}>
        + {addLabel}
      </button>
    </div>
  );
}

function BsaFields({ bsa, set, errors }: { bsa: BsaDetail; set: (b: BsaDetail) => void; errors: Errors }) {
  const up = (d: Partial<BsaDetail>) => set({ ...bsa, ...d });
  return (
    <fieldset>
      <legend>Format Business &amp; System Analyst</legend>
      <p className="f__hint">Bagian ini menggantikan susunan halaman analisis data. Isian “Data” di atas tampil sebagai Sumber, “Keputusan” sebagai Keputusan desain, “Temuan” sebagai Hasil, dan “Rekomendasi” sebagai pengantar Langkah berikutnya.</p>
      <Field label="Proses lama" hint="Bagaimana prosesnya berjalan sebelum ada sistem, dan apa yang bermasalah." error={errors["bsa.asIs"]}>
        <BiInput long value={bsa.asIs} onChange={(asIs) => up({ asIs })} />
      </Field>
      <Field label="Akar masalah" hint="Satu akar masalah satu baris." error={errors["bsa.rootCauses"]}>
        <BiList items={bsa.rootCauses} onChange={(rootCauses) => up({ rootCauses })} errors={errors} path="bsa.rootCauses" addLabel="Tambah akar masalah" />
      </Field>
      <Field label="Stakeholder & kebutuhan" hint="Peran (boleh ditambah posisinya, misalnya “· problem owner”) dan apa yang mereka butuhkan dari sistem." error={errors["bsa.stakeholders"]}>
        <RowList items={bsa.stakeholders} onChange={(stakeholders) => up({ stakeholders })} errors={errors} path="bsa.stakeholders" labels={["Peran", "Kebutuhan"]} addLabel="Tambah stakeholder" />
      </Field>
      <Field label="Perubahan dari review pengguna (opsional)" hint="Umpan balik per iterasi dan apa yang diubah karenanya." error={errors["bsa.iterations"]}>
        <RowList items={bsa.iterations} onChange={(iterations) => up({ iterations })} errors={errors} path="bsa.iterations" labels={["Umpan balik", "Yang diubah"]} addLabel="Tambah iterasi" />
      </Field>
      <Field label="Modul" hint="Satu modul atau halaman utama satu baris." error={errors["bsa.modules"]}>
        <BiList items={bsa.modules} onChange={(modules) => up({ modules })} errors={errors} path="bsa.modules" addLabel="Tambah modul" />
      </Field>
      <Field label="Pengujian (opsional)" hint="Metode uji, jumlah dan siapa respondennya, hasilnya." error={errors["bsa.testing"]}>
        <BiInput long value={bsa.testing} onChange={(testing) => up({ testing })} />
      </Field>
      <Field label="Skor uji (opsional)" hint="Aspek dan skornya, misalnya Usability → 91.75% / 91,75%." error={errors["bsa.acceptance"]}>
        <RowList items={bsa.acceptance} onChange={(acceptance) => up({ acceptance })} errors={errors} path="bsa.acceptance" labels={["Aspek", "Skor"]} addLabel="Tambah aspek" />
      </Field>
      <Field label="Langkah berikutnya" hint="Urut dari prioritas tertinggi, masing-masing dengan alasannya." error={errors["bsa.roadmap"]}>
        <RowList items={bsa.roadmap} onChange={(roadmap) => up({ roadmap })} errors={errors} path="bsa.roadmap" labels={["Langkah", "Alasan"]} addLabel="Tambah langkah" />
      </Field>
    </fieldset>
  );
}

/* ---------- Forms ---------- */

function ExperienceForm({ draft, set, errors, projects }: { draft: ExperienceEntry; set: (d: Partial<ExperienceEntry>) => void; errors: Errors; projects: { slug: string; label: string }[] }) {
  return (
    <>
      <Field label="Nama perusahaan / organisasi" hint="Contoh: PT Duniatex atau RevoU × Telkom Indonesia" error={errors.org}>
        <input value={draft.org} onChange={(e) => set({ org: e.target.value })} />
      </Field>
      <Field label="Posisi" hint="Format: Nama posisi · Lokasi. Contoh: PPIC Intern · Ungaran" error={errors.role}>
        <BiInput value={draft.role} onChange={(role) => set({ role })} placeholder={{ en: "Data Analyst Intern · Bandung", id: "Data Analyst Intern · Bandung" }} />
      </Field>
      <Field label="Periode" hint="EN: “July – October 2023”. ID: “Juli sampai Oktober 2023”." error={errors.date}>
        <BiInput value={draft.date} onChange={(date) => set({ date })} placeholder={{ en: "July – October 2023", id: "Juli sampai Oktober 2023" }} />
      </Field>
      <Field label="Pengantar (opsional)" hint="Satu paragraf singkat tentang tempat atau programnya." error={errors.intro}>
        <BiInput long value={draft.intro} onChange={(intro) => set({ intro })} />
      </Field>
      <Field label="Poin pekerjaan" hint="Satu poin satu baris. Mulai dengan kata kerja, sebutkan angka kalau ada." error={errors.bullets}>
        <BiList items={draft.bullets} onChange={(bullets) => set({ bullets })} errors={errors} path="bullets" long addLabel="Tambah poin" />
      </Field>
      <Field label="Proyek terkait (opsional)" hint="Muncul sebagai tautan di samping poin pekerjaan.">
        <div className="checks">
          {projects.map((p) => (
            <label key={p.slug} className="check">
              <input
                type="checkbox"
                checked={draft.related.includes(p.slug)}
                onChange={(e) => set({ related: e.target.checked ? [...draft.related, p.slug] : draft.related.filter((s) => s !== p.slug) })}
              />
              {p.label}
            </label>
          ))}
        </div>
      </Field>
      <Field label="ID (otomatis)" hint="Dipakai di dalam kode. Terisi dari nama perusahaan; ubah kalau bentrok." error={errors.id}>
        <input value={draft.id} onChange={(e) => set({ id: slugify(e.target.value) })} />
      </Field>
    </>
  );
}

function ProjectForm({ draft, set, errors, onSlug }: { draft: ProjectEntry; set: (d: Partial<ProjectEntry>) => void; errors: Errors; onSlug: (s: string) => void }) {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  async function upload(file: File, target: "src" | "srcEn") {
    setUploadError("");
    if (!draft.slug) {
      setUploadError("Isi judul atau slug dulu, lalu pilih gambar.");
      return;
    }
    setUploading(true);
    const body = new FormData();
    body.set("slug", draft.slug);
    body.set("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", body });
    const json = await res.json().catch(() => ({}));
    setUploading(false);
    if (!res.ok) setUploadError(json.error ?? "Gagal mengunggah.");
    else set({ figure: { ...draft.figure, [target]: json.src } });
  }

  const setFile = (i: number, f: Partial<ProjectFile>) => set({ files: draft.files.map((x, j) => (j === i ? { ...x, ...f } : x)) });

  return (
    <>
      <fieldset>
        <legend>Kartu proyek</legend>
        <Field label="Kategori" error={errors.category}>
          <div className="radios">
            <label className="check"><input type="radio" checked={draft.category === "data"} onChange={() => set({ category: "data" })} /> Data Analyst</label>
            <label className="check"><input type="radio" checked={draft.category === "bsa"} onChange={() => set({ category: "bsa", bsa: draft.bsa ?? blankBsa() })} /> Business &amp; System Analyst</label>
          </div>
        </Field>
        <Field label="Kode" hint="Label pendek, misalnya “CASE 15”, “Telkom M3”, atau “Thesis”." error={errors.code}>
          <input value={draft.code} onChange={(e) => set({ code: e.target.value })} />
        </Field>
        <Field label="Nama proyek" hint="Judul utama di daftar dan kartu proyek. Contoh: “Market Basket Analysis” atau “Analisis Penjualan Ritel”." error={errors.name}>
          <BiInput value={draft.name} onChange={(name) => set({ name })} />
        </Field>
        <Field label="Industri" hint="Bidang usaha dalam kasusnya. Tampil di kiri daftar proyek. Contoh: Ritel, Logistik, Kesehatan." error={errors.industry}>
          <BiInput value={draft.industry} onChange={(industry) => set({ industry })} placeholder={{ en: "Retail", id: "Ritel" }} />
        </Field>
        <Field label="Bidang" hint="Area bisnis yang dibahas. Pakai yang sudah ada supaya filternya mengelompok: Penjualan, Pemasaran digital, Analitik pelanggan, Keuangan, SDM, Rantai pasok & persediaan, Operasional layanan, Risiko & fraud, Analitik produk, Pelaporan kinerja." error={errors.field}>
          <BiInput value={draft.field} onChange={(field) => set({ field })} placeholder={{ en: "Sales", id: "Penjualan" }} />
        </Field>
        <Field label="Tools" hint="Pisahkan dengan koma. Dipakai untuk filter. Contoh: SQL, Python, Tableau.">
          <input
            defaultValue={draft.tools.join(", ")}
            onChange={(e) => set({ tools: e.target.value.split(",").map((t) => t.trim()).filter(Boolean) })}
            placeholder="SQL, Python"
          />
        </Field>
        <Field label="Judul temuan" hint="Satu kalimat temuan utama, dengan angka. Tampil di bawah nama proyek dan sebagai judul halaman ringkasan. Contoh: “Volume pesan OCA turun 28%, dan email jadi penyebab utamanya”." error={errors.title}>
          <BiInput long value={draft.title} onChange={(title) => set({ title })} />
        </Field>
        <Field label="Kalimat ringkas" hint="Apa yang dikerjakan, dalam satu kalimat pendek." error={errors.sentence}>
          <BiInput value={draft.sentence} onChange={(sentence) => set({ sentence })} />
        </Field>
        <Field label="Tag" hint="Dua sampai empat. Contoh: SQL, Dashboard, Supply Chain." error={errors.tags}>
          <BiList items={draft.tags} onChange={(tags) => set({ tags })} errors={errors} path="tags" addLabel="Tambah tag" />
        </Field>
        <Field label="Baris info" hint="Urutan: alat, peran/tim, sumber. Contoh: “SQL”, “Dikerjakan sendiri”, “Windata Academy”." error={errors.info}>
          <BiList items={draft.info} onChange={(info) => set({ info })} errors={errors} path="info" addLabel="Tambah info" />
        </Field>
        <Field label="Slug (alamat halaman)" hint="Terisi otomatis dari judul. Halaman: /id/projects/<slug>" error={errors.slug}>
          <input value={draft.slug} onChange={(e) => onSlug(slugify(e.target.value))} />
        </Field>
      </fieldset>

      <fieldset>
        <legend>Grafik utama</legend>
        <Field label="Gambar (opsional)" hint="PNG, JPG, WebP, atau SVG, maksimal 5 MB. Supaya tajam, pakai lebar minimal 1600 px atau SVG.">
          {(["src", "srcEn"] as const).map((target) => (
            <div className="upload" key={target}>
              <span className="bi__tag">{target === "src" ? "Gambar utama (dipakai di halaman ID, dan EN kalau versi EN kosong)" : "Versi EN (opsional, teks grafik dalam bahasa Inggris)"}</span>
              <input type="file" accept="image/png,image/jpeg,image/webp,image/svg+xml" disabled={uploading} onChange={(e) => e.target.files?.[0] && upload(e.target.files[0], target)} />
              {draft.figure[target] && (
                <div className="preview">
                  {/* eslint-disable-next-line @next/next/no-img-element -- local preview of the uploaded file */}
                  <img src={draft.figure[target]} alt="" />
                  <button type="button" className="btn-sm" onClick={() => set({ figure: { ...draft.figure, [target]: undefined } })}>
                    Lepas gambar
                  </button>
                </div>
              )}
            </div>
          ))}
          {uploading && <p className="f__hint">Mengunggah…</p>}
          {uploadError && <p className="f__error">{uploadError}</p>}
        </Field>
        <Field label="Keterangan grafik" hint="Contoh: “Gambar 1: pengguna per tahap funnel”." error={errors["figure.label"]}>
          <BiInput value={draft.figure.label} onChange={(label) => set({ figure: { ...draft.figure, label } })} />
        </Field>
      </fieldset>

      <fieldset>
        <legend>Halaman ringkasan</legend>
        <Field label="Ringkasan" hint="Masalahnya, apa yang dikerjakan, dan hasilnya." error={errors.summary}>
          <BiInput long value={draft.summary} onChange={(summary) => set({ summary })} />
        </Field>
        <Field label="Data" hint="Sumber, jumlah baris, periode, dan pembersihan." error={errors.data}>
          <BiInput long value={draft.data} onChange={(data) => set({ data })} />
        </Field>
        <Field label="Keputusan analisis" error={errors.decisions}>
          <BiList items={draft.decisions} onChange={(decisions) => set({ decisions })} errors={errors} path="decisions" long addLabel="Tambah keputusan" />
        </Field>
        <Field label="Temuan" error={errors.findings}>
          <BiList items={draft.findings} onChange={(findings) => set({ findings })} errors={errors} path="findings" long addLabel="Tambah temuan" />
        </Field>
        <Field label="Rekomendasi" error={errors.recommendation}>
          <BiInput long value={draft.recommendation} onChange={(recommendation) => set({ recommendation })} />
        </Field>
        <Field label="Batas" hint="Apa yang tidak bisa disimpulkan dari data ini." error={errors.limits}>
          <BiInput long value={draft.limits} onChange={(limits) => set({ limits })} />
        </Field>
      </fieldset>

      {draft.category === "bsa" && <BsaFields bsa={draft.bsa ?? blankBsa()} set={(bsa) => set({ bsa })} errors={errors} />}

      <fieldset>
        <legend>File pendukung (opsional)</legend>
        <div className="list">
          {draft.files.map((f, i) => (
            <div className="list__row" key={i}>
              <span className="list__no">{i + 1}</span>
              <div className="list__body">
                <Field label="Nama file / folder" error={errors[`files.${i}.label`]}>
                  <BiInput value={f.label} onChange={(label) => setFile(i, { label })} placeholder={{ en: "CASE 15 folder", id: "Folder CASE 15" }} />
                </Field>
                <Field label="Link (https://…)" hint="Kosongkan kalau belum ada; akan tampil “link menyusul”." error={errors[`files.${i}.href`]}>
                  <input value={f.href ?? ""} onChange={(e) => setFile(i, { href: e.target.value })} />
                </Field>
                <Field label="Isi folder (opsional)" error={errors[`files.${i}.note`]}>
                  <BiInput value={f.note} onChange={(note) => setFile(i, { note })} />
                </Field>
              </div>
              <button type="button" className="btn-x" aria-label="Hapus file" onClick={() => set({ files: draft.files.filter((_, j) => j !== i) })}>
                ×
              </button>
            </div>
          ))}
          <button type="button" className="btn-sm" onClick={() => set({ files: [...draft.files, { label: emptyL(), href: "", note: emptyL() }] })}>
            + Tambah file
          </button>
        </div>
      </fieldset>
    </>
  );
}

/* ---------- App ---------- */

export function AdminApp({ initial, builtInProjects, builtInExperience }: { initial: Lists; builtInProjects: BuiltInProject[]; builtInExperience: BuiltInExperience[] }) {
  const [tab, setTab] = useState<"experience" | "projects">("experience");
  const [lists, setLists] = useState<Lists>(initial);
  const [editing, setEditing] = useState<Editing | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [notice, setNotice] = useState<ReactNode>(null);
  const [busy, setBusy] = useState(false);

  const allProjects = [
    ...builtInProjects.map((p) => ({ slug: p.slug, label: p.label })),
    ...lists.projects.map((p) => ({ slug: p.slug, label: p.name.id || p.code })),
  ];

  function open(next: Editing) {
    setErrors({});
    setNotice(null);
    setEditing(next);
    window.scrollTo({ top: 0 });
  }

  function patch(d: Partial<ExperienceEntry> | Partial<ProjectEntry>) {
    setEditing((cur) => {
      if (!cur) return cur;
      if (cur.kind === "experience") {
        const draft = { ...cur.draft, ...(d as Partial<ExperienceEntry>) };
        if (!cur.slugTouched && "org" in d) draft.id = slugify(draft.org);
        return { ...cur, draft };
      }
      const draft = { ...cur.draft, ...(d as Partial<ProjectEntry>) };
      if (!cur.slugTouched && ("title" in d || "code" in d)) draft.slug = slugify(draft.title.id || draft.title.en || draft.code);
      return { ...cur, draft };
    });
  }

  async function save() {
    if (!editing) return;
    // Same rules as the server, so mistakes show up before sending.
    const takenIds = [...builtInExperience.map((e) => e.id), ...lists.experience.filter((e) => e.id !== editing.original).map((e) => e.id)];
    const takenSlugs = [...builtInProjects.map((p) => p.slug), ...lists.projects.filter((p) => p.slug !== editing.original).map((p) => p.slug)];
    const check =
      editing.kind === "experience"
        ? validateExperience(editing.draft, { takenIds, projectSlugs: allProjects.map((p) => p.slug) })
        : validateProject(editing.draft, { takenSlugs });
    if (!check.ok) {
      setErrors(check.errors);
      setNotice(<span className="bad">Ada {Object.keys(check.errors).length} isian yang perlu diperbaiki (ditandai merah).</span>);
      return;
    }
    setBusy(true);
    const res = await fetch("/api/admin/content", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ kind: editing.kind, entry: editing.draft, original: editing.original }),
    });
    const json = await res.json().catch(() => ({}));
    setBusy(false);
    if (res.status === 422) {
      setErrors(json.errors ?? {});
      setNotice(<span className="bad">Server menolak beberapa isian (ditandai merah).</span>);
      return;
    }
    if (!res.ok) {
      setNotice(<span className="bad">Gagal menyimpan ({res.status}).</span>);
      return;
    }
    setLists(json);
    const href = editing.kind === "projects" ? `/id/projects/${editing.draft.slug}` : "/id#experience";
    setNotice(
      <span className="good">
        Tersimpan. <a href={href} target="_blank" rel="noreferrer">Lihat di situs ↗</a>
      </span>,
    );
    setEditing(null);
  }

  async function remove(kind: "experience" | "projects", id: string, label: string) {
    if (!window.confirm(`Hapus “${label}”? Ini tidak bisa dibatalkan.`)) return;
    const res = await fetch("/api/admin/content", { method: "DELETE", headers: { "content-type": "application/json" }, body: JSON.stringify({ kind, id }) });
    if (res.ok) {
      setLists(await res.json());
      setNotice(<span className="good">“{label}” dihapus.</span>);
    } else setNotice(<span className="bad">Gagal menghapus ({res.status}).</span>);
  }

  return (
    <main className="adm">
      <header className="adm__head">
        <div>
          <p className="adm__kicker">Hanya di komputer ini · npm run dev</p>
          <h1>Admin konten portofolio</h1>
          <p className="adm__lead">
            Tambah pengalaman atau proyek dengan format yang sama seperti yang sudah ada. Semua teks wajib diisi dalam dua bahasa (EN dan ID). Hasilnya tersimpan di
            <code> src/content/data/</code>, lalu ikut terbit saat situs di-build ulang.
          </p>
        </div>
        <a className="btn-sm" href="/id" target="_blank" rel="noreferrer">Buka situs ↗</a>
      </header>

      {notice && <p className="notice">{notice}</p>}

      {editing ? (
        <section className="card">
          <h2>{editing.original ? "Ubah" : "Tambah"} {editing.kind === "experience" ? "pengalaman" : "proyek"}</h2>
          {editing.kind === "experience" ? (
            <ExperienceForm
              draft={editing.draft}
              errors={errors}
              projects={allProjects}
              set={(d) => {
                if ("id" in d) setEditing({ ...editing, slugTouched: true, draft: { ...editing.draft, ...d } });
                else patch(d);
              }}
            />
          ) : (
            <ProjectForm
              draft={editing.draft}
              errors={errors}
              set={patch}
              onSlug={(slug) => setEditing({ ...editing, slugTouched: true, draft: { ...editing.draft, slug } })}
            />
          )}
          <div className="actions">
            <button type="button" className="btn-primary" disabled={busy} onClick={save}>
              {busy ? "Menyimpan…" : "Simpan"}
            </button>
            <button type="button" className="btn-sm" onClick={() => { setEditing(null); setErrors({}); setNotice(null); }}>
              Batal
            </button>
          </div>
        </section>
      ) : (
        <>
          <nav className="tabs" aria-label="Jenis konten">
            <button type="button" aria-pressed={tab === "experience"} onClick={() => setTab("experience")}>Pengalaman</button>
            <button type="button" aria-pressed={tab === "projects"} onClick={() => setTab("projects")}>Proyek</button>
          </nav>

          {tab === "experience" ? (
            <section className="card">
              <div className="card__head">
                <h2>Pengalaman profesional</h2>
                <button type="button" className="btn-primary" onClick={() => open({ kind: "experience", draft: blankExperience(), slugTouched: false })}>
                  + Tambah pengalaman
                </button>
              </div>
              <p className="f__hint">Entri baru tampil paling atas di situs (terbaru dulu).</p>
              <ul className="rows">
                {lists.experience.map((e) => (
                  <li key={e.id}>
                    <div><strong>{e.org}</strong><span>{e.role.id} · {e.date.id}</span></div>
                    <div className="rows__act">
                      <button type="button" className="btn-sm" onClick={() => open({ kind: "experience", original: e.id, draft: { ...blankExperience(), ...e, intro: e.intro ?? emptyL() }, slugTouched: true })}>Ubah</button>
                      <button type="button" className="btn-sm danger" onClick={() => remove("experience", e.id, e.org)}>Hapus</button>
                    </div>
                  </li>
                ))}
                {builtInExperience.map((e) => (
                  <li key={e.id} className="is-builtin">
                    <div><strong>{e.org}</strong><span>{e.role} · {e.date}</span></div>
                    <span className="badge" title="Ditulis langsung di kode (content/profile.ts)">bawaan</span>
                  </li>
                ))}
              </ul>
            </section>
          ) : (
            <section className="card">
              <div className="card__head">
                <h2>Proyek</h2>
                <button type="button" className="btn-primary" onClick={() => open({ kind: "projects", draft: blankProject(), slugTouched: false })}>
                  + Tambah proyek
                </button>
              </div>
              <p className="f__hint">Proyek baru tampil di akhir kategorinya. Yang punya gambar juga muncul di daftar proyek halaman utama.</p>
              <ul className="rows">
                {lists.projects.map((p) => (
                  <li key={p.slug}>
                    <div><strong>{p.name.id || p.code}</strong><span>{p.title.id}</span></div>
                    <div className="rows__act">
                      <a className="btn-sm" href={`/id/projects/${p.slug}`} target="_blank" rel="noreferrer">Lihat ↗</a>
                      <button
                        type="button"
                        className="btn-sm"
                        onClick={() => open({ kind: "projects", original: p.slug, draft: { ...blankProject(), ...p }, slugTouched: true })}
                      >
                        Ubah
                      </button>
                      <button type="button" className="btn-sm danger" onClick={() => remove("projects", p.slug, p.name.id || p.code)}>Hapus</button>
                    </div>
                  </li>
                ))}
                {builtInProjects.map((p) => (
                  <li key={p.slug} className="is-builtin">
                    <div><strong>{p.label}</strong><span>{p.title}</span></div>
                    <span className="badge" title="Ditulis langsung di kode (content/projects.ts)">bawaan</span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </>
      )}
    </main>
  );
}
