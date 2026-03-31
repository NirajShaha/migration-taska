import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get the secret key - must match the one used in route.ts
  const secret = process.env.NEXTAUTH_SECRET || "your-secret-key-change-in-production";

  // Get the token from the request
  let token = null;
  try {
    token = await getToken({
      req: request,
      secret: secret,
    });
  } catch (error) {
    console.error("Error validating token:", error);
    token = null;
  }

  const isAuthenticated = !!token;
  const isLoginPage = pathname.startsWith("/login");
  const isAuthPage = pathname.startsWith("/auth");
  const isPublicRoute = pathname === "/" || isAuthPage;
  const isProtectedRoute =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/form") ||
    (pathname.startsWith("/api") && !pathname.startsWith("/api/auth"));

  // Allow public routes and auth routes
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // Handle the Login Page
  if (isLoginPage) {
    if (isAuthenticated) {
      // Bounce logged-in users away from the login page to the dashboard
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    // Let unauthenticated users view the login page
    return NextResponse.next();
  }

  // Handle Protected Routes
  if (isProtectedRoute && !isAuthenticated) {
    // Bounce unauthenticated users trying to access protected routes back to login
    let from = pathname;
    if (request.nextUrl.search) {
      from += request.nextUrl.search;
    }

    // Save the URL they tried to visit so they can be redirected back after login
    return NextResponse.redirect(
      new URL(`/login?callbackUrl=${encodeURIComponent(from)}`, request.url)
    );
  }

  // Let authenticated users access protected routes
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Intercept everything EXCEPT static assets and internal NextAuth API routes
    "/((?!api/auth|_next/static|_next/image|favicon.ico).*)",
  ],
};
