import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  const { pathname } = req.nextUrl;

  // ✅ If user is authenticated and tries to access login/register → redirect to dashboard
  if (token && (pathname.startsWith("/login") || pathname.startsWith("/register"))) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // ✅ If user is not authenticated and tries to access dashboard or protected APIs → redirect to login
  if (!token && (pathname.startsWith("/dashboard") || pathname.startsWith("/api/protected"))) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

// ✅ Apply middleware only to these routes
export const config = {
  matcher: ["/login", "/register", "/dashboard", "/api/protected/:path*"],
};
