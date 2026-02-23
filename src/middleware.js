import { NextResponse } from "next/server";

// 1. The function MUST be named exactly 'middleware' and must be exported
export function middleware(req) {
  const token = req.cookies.get("admin_token")?.value;
  const { pathname } = req.nextUrl;

  // 2. Your Allowed Admin Paths (Whitelist)
  const allowedAdminPaths = [
    "/admin/profile",
    "/admin/projects",
    "/admin/contact",
    "/admin/settings",
    "/admin/login"
  ];

  // 3. LOGIC FOR ADMIN ROUTES
  if (pathname.startsWith("/admin")) {
    
    // A. Strict path check: If path is not in the whitelist (e.g. /admin/portfilio), show 404
    if (!allowedAdminPaths.includes(pathname)) {
      return NextResponse.rewrite(new URL("/404", req.url));
    }

    // B. Security check: If NOT logged in and trying to access admin pages
    if (token !== "authorized" && pathname !== "/admin/login") {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }

    // C. Logic: If ALREADY logged in, don't show the login page
    if (token === "authorized" && pathname === "/admin/login") {
      return NextResponse.redirect(new URL("/admin/profile", req.url));
    }
  }

  // 4. SWITCHING LOGIC: If on the website, just let the user pass.
  // This allows you to jump from Admin -> Website and back if the cookie exists.
  return NextResponse.next();
}

// 5. Tell Next.js which paths this middleware should watch
export const config = {
  matcher: [
    "/admin/:path*", 
    "/((?!api|_next/static|_next/image|favicon.ico).*)"
  ],
};