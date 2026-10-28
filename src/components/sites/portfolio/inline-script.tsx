"use client";

/** Inline script that runs during HTML parsing only. On client renders it becomes inert text/plain,
    which also keeps React from warning about script tags (see Next's "preventing flash" guide). */
export function InlineScript({ html }: { html: string }) {
  return <script type={typeof window === "undefined" ? "text/javascript" : "text/plain"} suppressHydrationWarning dangerouslySetInnerHTML={{ __html: html }} />;
}
