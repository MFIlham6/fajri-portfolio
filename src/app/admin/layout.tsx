import type { Metadata } from "next";
import "./admin.css";

export const metadata: Metadata = {
  title: "Admin konten",
  robots: { index: false, follow: false },
};

/** Separate root layout: the admin is a local tool, not part of the bilingual site. */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="admin">{children}</body>
    </html>
  );
}
