import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isKeystaticEnabled } from "@/lib/cms-flags";

export function middleware(request: NextRequest) {
  if (!isKeystaticEnabled()) {
    const { pathname } = request.nextUrl;
    if (pathname === "/keystatic" || pathname.startsWith("/keystatic/") || pathname.startsWith("/api/keystatic")) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/keystatic", "/keystatic/:path*", "/api/keystatic/:path*"],
};
