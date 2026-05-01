import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// 🔒 Public routes (no auth required)
const PUBLIC_ROUTES = ["/login", "/signup"];

// 🔒 Protected routes
const PROTECTED_ROUTES = [
  "/dashboard",
  "/records",
  "/buses",
  "/staff",
  "/routes",
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 🍪 Get token from cookies
  const token = request.cookies.get("token")?.value;

  const isPublicRoute = PUBLIC_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  // 🚫 If NOT logged in → block protected routes
  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 🔁 If logged in → prevent access to login/signup
  if (token && isPublicRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

// ⚡ Apply middleware only to needed routes
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/records/:path*",
    "/buses/:path*",
    "/staff/:path*",
    "/routes/:path*",
    "/login",
    "/signup",
  ],
};