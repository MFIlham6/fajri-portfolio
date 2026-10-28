import type { Element, ElementContent } from "hast";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Lang } from "@/content/i18n";
import { imageSrc } from "@/content/studi-kasus";
import type { LoadedCase } from "@/lib/studi-kasus";

/* Renders a case study's markdown as-is (same text, same order), in Indonesian or English.
   Only presentation is added: one section per heading in a single reading column, plus
   figure title/caption styling, scrollable tables, and a callout for the data note. */

const FIGURE = /^(Gambar|Figure) \d+\./;

type Section = { label?: string; body: string };

/** "**Ringkasan.** Text…" → the short bold lead that opens a section in files without ## headings. */
const LEAD = /^\*\*([^*]{1,40}?)\.\*\*\s*/;

/**
 * Splits the body into sections: at `## ` headings when the file has them, otherwise at paragraphs that
 * open with a short bold label (the format of CASE 1–7). Text before the first section has no label.
 */
function splitSections(body: string): Section[] {
  const lines = body.split("\n");
  const sections: Section[] = [{ body: "" }];
  // Section labels drop the document's numbering ("6. Temuan", "5 dan 6. Gambar dan temuan"), like the summary page.
  const push = (label: string, first = "") => sections.push({ label: label.replace(/^\d+(\s*(dan|and)\s*\d+)?\.\s+/, ""), body: first });
  const add = (line: string) => (sections[sections.length - 1].body += line + "\n");
  let fence = false;
  const hasHeadings = lines.some((l) => /^## /.test(l));
  lines.forEach((line) => {
    if (/^```/.test(line)) fence = !fence;
    if (!fence && hasHeadings && /^## /.test(line)) return push(line.slice(3).replace(/\*\*/g, "").trim());
    // Some files run these labeled paragraphs together without a blank line, so any line may open one.
    const lead = !fence && !hasHeadings ? line.match(LEAD) : null;
    if (lead && !FIGURE.test(lead[1])) return push(lead[1].trim(), line.slice(lead[0].length) + "\n");
    add(line);
  });
  return sections.filter((x) => x.label || x.body.trim());
}

const anchor = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

function textOf(node: ElementContent | Element): string {
  if (node.type === "text") return node.value;
  if (node.type === "element") return node.children.map(textOf).join("");
  return "";
}

function hasTag(node: Element, tag: string): boolean {
  return node.children.some((c) => c.type === "element" && (c.tagName === tag || hasTag(c, tag)));
}

/** True when every non-whitespace child is one of the given tags. */
function onlyTags(node: Element, tags: string[]): boolean {
  const kids = node.children.filter((c) => !(c.type === "text" && !c.value.trim()));
  return kids.length > 0 && kids.every((c) => c.type === "element" && tags.includes(c.tagName));
}

export function CaseMarkdown({ slug, data, lang }: { slug: string; data: LoadedCase; lang: Lang }) {
  const components: Components = {
    // Sections already have the page's h2; headings inside a section sit one level under it.
    h1: ({ children }) => <h3>{children}</h3>,
    h2: ({ children }) => <h3>{children}</h3>,
    h3: ({ children }) => <h3>{children}</h3>,
    h4: ({ children }) => <h4>{children}</h4>,
    p: ({ node, children }) => {
      if (!node) return <p>{children}</p>;
      const text = textOf(node).trim();
      if (text.startsWith("Catatan data") || text.startsWith("Data note")) return <p className="md-note">{children}</p>;
      if (hasTag(node, "img")) return <div className="md-figure">{children}</div>;
      if (onlyTags(node, ["em"])) return <p className="md-caption">{children}</p>;
      if (onlyTags(node, ["strong"]) && FIGURE.test(text)) return <p className="md-fig-title">{children}</p>;
      // A bold line on its own is a sub-heading in these files ("**Temuan.**", "**Tiga segmen yang terpisah jauh.**").
      if (onlyTags(node, ["strong"])) return <p className="md-lead">{children}</p>;
      return <p>{children}</p>;
    },
    strong: ({ node, children }) => {
      const isFig = node ? FIGURE.test(textOf(node).trim()) : false;
      return <strong className={isFig ? "md-fig-title-inline" : undefined}>{children}</strong>;
    },
    img: ({ src, alt }) => {
      const file = typeof src === "string" ? src.replace(/^\.?\/?images\//, "") : "";
      const meta = data.images[file];
      const key = (alt ?? "").toLowerCase().trim();
      const label = data.figureTitles[key] ?? meta?.alt ?? alt ?? "";
      return (
        // eslint-disable-next-line @next/next/no-img-element -- markdown figures keep their own intrinsic size
        <img src={imageSrc(slug, file)} alt={label} width={meta?.width} height={meta?.height} loading="lazy" decoding="async" />
      );
    },
    table: ({ children }) => (
      <div className="md-table" role="region" aria-label={lang === "en" ? "Table (scrolls sideways)" : "Tabel (bisa digulir ke samping)"} tabIndex={0}>
        <table>{children}</table>
      </div>
    ),
    a: ({ href, children }) => {
      const external = typeof href === "string" && /^https?:/.test(href);
      return (
        <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
          {children}
        </a>
      );
    },
    pre: ({ children }) => <pre className="md-code">{children}</pre>,
  };

  return (
    <>
      {splitSections(data.body).map((sec, i) => {
        const id = sec.label ? anchor(sec.label) || `bagian-${i}` : undefined;
        return (
          <section className="proj-sec sk-sec" key={i} id={id} aria-labelledby={id ? `${id}-h` : undefined}>
            {sec.label && <h2 id={`${id}-h`}>{sec.label}</h2>}
            <div className="md">
              <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
                {sec.body}
              </ReactMarkdown>
            </div>
          </section>
        );
      })}
    </>
  );
}

export function KickerMarkdown({ text }: { text: string }) {
  return (
    <ReactMarkdown
      components={{
        p: ({ children }) => <p className="sk-kicker mono">{children}</p>,
        strong: ({ children }) => <>{children}</>,
      }}
    >
      {text}
    </ReactMarkdown>
  );
}
