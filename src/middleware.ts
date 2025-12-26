
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
    const sessionCookie = request.cookies.get("better-auth.session_token") || request.cookies.get("session_token");

    const isAuthRoute = request.nextUrl.pathname.startsWith("/login") || request.nextUrl.pathname.startsWith("/register");
    const isProtectedRoute = request.nextUrl.pathname.startsWith("/booking") || request.nextUrl.pathname.startsWith("/my-bookings");

    if (isProtectedRoute && !sessionCookie) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    if (isAuthRoute && sessionCookie) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/booking/:path*", "/my-bookings/:path*", "/login", "/register"],
};
