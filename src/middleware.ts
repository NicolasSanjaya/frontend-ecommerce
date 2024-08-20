import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export function middleware(request: NextRequest) {
  const cookie = cookies().get("jwt")?.value;

  if (!cookie && request.nextUrl.pathname.startsWith("/products")) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  } else if (cookie && request.nextUrl.pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  } else if (cookie && request.nextUrl.pathname.startsWith("/register")) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  } else if (!cookie && request.nextUrl.pathname.startsWith("/profile")) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
  return NextResponse.next();
}
export const config = {
  matcher: ["/", "/products", "/login", "/register", "/profile"],
};
