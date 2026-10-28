import { Fragment } from "react";

/** Renders `[[detail]]` as a visible placeholder and `**text**` as emphasis. */
export function Rich({ text }: { text: string }) {
  const parts = text.split(/(\[\[.*?\]\]|\*\*.*?\*\*)/g).filter(Boolean);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("[[")) {
          return (
            <span key={i} className="placeholder">
              [{part.slice(2, -2)}]
            </span>
          );
        }
        if (part.startsWith("**")) return <strong key={i}>{part.slice(2, -2)}</strong>;
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </>
  );
}
