import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;
  const { pathname } = req.nextUrl;

  // If the user is logged in, block access to auth pages
  if ((accessToken || refreshToken) && (pathname === "/login" || pathname === "/signup")) {
    // Redirect based on user role if stored somewhere (optional, you can refine later)
    // For now, just go to home route
    return NextResponse.redirect(new URL("/client/home", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/signup"],
};
