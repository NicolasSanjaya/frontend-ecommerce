import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export function middleware(request: NextRequest) {
  const cookie = cookies().get("jwt")?.value;

  if (!cookie) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
  return NextResponse.next();
}
export const config = {
  matcher: ["/products"],
};
