import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Redirect het kale apex-domein (opakreta.be) permanent naar www.opakreta.be.
//
// Dit stond eerder in next.config.mjs's redirects() via de
// `has: [{ type: "host", value: "opakreta.be" }]`-matcher. Die matcher werkt
// op deze Cloudflare Workers/OpenNext-deploy niet betrouwbaar: de
// `:path*`-placeholder in de destination werd niet ingevuld, en de
// host-check matchte zowel `opakreta.be` als `www.opakreta.be` (waarschijnlijk
// een substring-match i.p.v. een exacte match), wat een oneindige
// redirect-lus veroorzaakte (ERR_TOO_MANY_REDIRECTS) zodra beide hostnamen
// als Custom Domain aan dezelfde Worker gekoppeld waren.
//
// Middleware met een expliciete, exacte Host-header-check is hier wel
// geverifieerd betrouwbaar (getest via `wrangler dev` met beide hostnamen).
export function middleware(request: NextRequest) {
  const host = request.headers.get("host");

  if (host === "opakreta.be") {
    const url = request.nextUrl.clone();
    url.protocol = "https:";
    url.hostname = "www.opakreta.be";
    url.port = "";
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  // Alles behalve Next.js' eigen interne asset-paden.
  matcher: ["/((?!_next/).*)"],
};
