import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
    const path = request.nextUrl.pathname;

    const isPublic =
        path === "/login" ||
        path === "/signup";

    const token = request.cookies.get("token")?.value;

    // Logged-in users shouldn't visit login/signup
    if (isPublic && token) {
        return NextResponse.redirect(new URL("/profile", request.url));
    }

    // Not logged in → protect private pages
    if (!isPublic && !token) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/",
        "/profile",
        "/login",
        "/signup",
    ],
};