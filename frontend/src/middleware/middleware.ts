import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("accessToken")?.value;

  const publicPaths = ["/login", "/signup", "/landing"];
  if (publicPaths.includes(req.nextUrl.pathname)) return NextResponse.next();

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const decoded: any = jwt.decode(token);

    // Role-based redirects
    if (req.nextUrl.pathname.startsWith("/admin") && decoded.role !== "admin")
      return NextResponse.redirect(new URL("/login", req.url));

    if (req.nextUrl.pathname.startsWith("/client") && decoded.role !== "client")
      return NextResponse.redirect(new URL("/login", req.url));

    if (req.nextUrl.pathname.startsWith("/worker") && decoded.role !== "worker")
      return NextResponse.redirect(new URL("/login", req.url));

    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/admin/:path*", "/client/:path*", "/worker/:path*"],
};