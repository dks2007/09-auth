import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const PRIVATE_PREFIXES = ["/notes", "/profile"];
const AUTH_ROUTES = ["/sign-in", "/sign-up"];

const isPrivateRoute = (pathname: string) =>
  PRIVATE_PREFIXES.some((prefix) => pathname.startsWith(prefix));

const isAuthRoute = (pathname: string) => AUTH_ROUTES.includes(pathname);

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;
  const isAuthenticated = Boolean(accessToken || refreshToken);

  if (!isAuthenticated && isPrivateRoute(pathname)) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (isAuthenticated && isAuthRoute(pathname)) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/notes/:path*", "/profile/:path*", "/sign-in", "/sign-up"],
};
