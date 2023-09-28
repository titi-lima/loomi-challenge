import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  console.log(request.nextUrl.pathname);
  if (!request?.cookies?.get("token")) {
    return NextResponse.redirect("/");
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/home, /map, /add-product"],
};
