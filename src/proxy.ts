import { NextResponse, type NextRequest } from "next/server";

const locales = ["en", "id"] as const;
type Lang = (typeof locales)[number];

function preferredLang(request: NextRequest): Lang {
  const saved = request.cookies.get("lang")?.value;
  if (saved === "en" || saved === "id") return saved;
  const accept = request.headers.get("accept-language") ?? "";
  // First listed language wins: Indonesian (id / in) → id, anything else → en.
  const first = accept.split(",")[0]?.trim().toLowerCase() ?? "";
  return first.startsWith("id") || first.startsWith("in") ? "id" : "en";
}

/** Sends paths without a language prefix (e.g. "/", "/projects") to /en or /id. */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasLang = locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
  if (hasLang) return;
  request.nextUrl.pathname = `/${preferredLang(request)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  // Skip Next internals, the local admin and its API, and any path with a file extension (public assets).
  matcher: ["/((?!_next|api/|admin|.*\\..*).*)"],
};
