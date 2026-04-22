import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { checkSession } from "./lib/api/serverApi";

const PRIVATE_PREFIXES = ["/notes", "/profile"];
const AUTH_ROUTES = ["/sign-in", "/sign-up"];

const isPrivateRoute = (pathname: string) =>
  PRIVATE_PREFIXES.some((prefix) => pathname.startsWith(prefix));

const isAuthRoute = (pathname: string) => AUTH_ROUTES.includes(pathname);

const appendSetCookie = (response: NextResponse, setCookie: string[]) => {
  for (const cookie of setCookie) {
    response.headers.append("set-cookie", cookie);
  }
};

const resolveResponse = (request: NextRequest, isAuthenticated: boolean) => {
  const { pathname } = request.nextUrl;

  if (!isAuthenticated && isPrivateRoute(pathname)) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (isAuthenticated && isAuthRoute(pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
};

export async function proxy(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  if (accessToken) {
    return resolveResponse(request, true);
  }

  if (refreshToken) {
    try {
      const sessionResponse = await checkSession(
        request.headers.get("cookie") ?? "",
      );
      const response = resolveResponse(request, sessionResponse.data.success);
      const rawSetCookie = sessionResponse.headers["set-cookie"];
      const setCookie = rawSetCookie
        ? Array.isArray(rawSetCookie)
          ? rawSetCookie
          : [rawSetCookie]
        : [];

      if (sessionResponse.data.success && setCookie.length > 0) {
        appendSetCookie(response, setCookie);
      }

      return response;
    } catch {
      return resolveResponse(request, false);
    }
  }

  return resolveResponse(request, false);
}

export const config = {
  matcher: ["/notes/:path*", "/profile/:path*", "/sign-in", "/sign-up"],
};
