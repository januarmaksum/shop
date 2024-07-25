import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { verifyToken } from "./utils/auth";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  if (token) {
    const isTokenValid = verifyToken(token);

    if (isTokenValid && request.nextUrl.pathname === "/auth/login") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
