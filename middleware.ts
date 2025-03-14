import { NextResponse } from "next/server";
import authConfig from "./auth.config";
import NextAuth from "next-auth";

// Initialize Auth.js with edge-compatible config only
const { auth } = NextAuth(authConfig);

// Wrap the middleware function with auth
export default auth(async function middleware(req) {
  // Access the session via req.auth instead of req.nextauth.token
  const session = req.auth;

  // Check if user is authorized (your admin email)
  const isAuthorized =
    session?.user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL;
  if (!isAuthorized) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
});

// Keep your existing matcher config
export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/api/admin/:path*"],
};
