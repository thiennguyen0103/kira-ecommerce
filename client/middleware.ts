import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { RoleEnum } from "./enums/roles.enum";

async function fetchUser(cookies: string | null) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/me`,
      {
        headers: {
          Cookie: cookies || "", // Pass cookies for session/auth
        },
        withCredentials: true,
      },
    );
    return response.data;
  } catch (error) {
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip middleware for the login page or public routes
  if (pathname.startsWith("/login")) {
    return NextResponse.next();
  }

  // Get the cookie (authentication token/session)
  const cookies = request.headers.get("cookie");

  // Fetch user data
  const user = await fetchUser(cookies);

  // If no user is found, redirect to login
  if (pathname.startsWith("/admin")) {
    if (!user) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Role-based redirection
  if (user?.role?.name === RoleEnum.Admin) {
    // Redirect regular users trying to access admin routes
    if (!pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  } else if (user?.role?.name === RoleEnum.Client) {
    // Redirect admin trying to access user routes
    if (pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}
// Apply middleware to the specified routes
export const config = {
  matcher: ["/admin/:path*", "/"],
};
