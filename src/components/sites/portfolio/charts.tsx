/* Small chart primitives for the device screens. Every value shown is a figure from the owner's doc. */

export function HBar({ rows, label }: { rows: { name: string; value: number; display: string; accent?: boolean }[]; label: string }) {
  return (
    <div className="hbar" role="img" aria-label={label}>
      {rows.map((r) => (
        <div className="hbar__row" key={r.name}>
          <span>{r.name}</span>
          <span className="hbar__track">
            <span className={r.accent ? "hbar__fill hbar__fill--accent" : "hbar__fill"} style={{ width: `${r.value}%` }} data-bar />
          </span>
          <span className="hbar__val">{r.display}</span>
        </div>
      ))}
    </div>
  );
}

export function Split({ parts, label }: { parts: { value: number; text: string }[]; label: string }) {
  return (
    <div className="split" role="img" aria-label={label}>
      {parts.map((p, i) => (
        <span key={p.text} className={`split__${i}`} style={{ width: `${p.value}%` }}>
          {p.text}
        </span>
      ))}
    </div>
  );
}
