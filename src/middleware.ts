import { NextRequest, NextResponse } from "next/server";
import cookie from "cookie";

export const middleware = (request: NextRequest) => {
  const cookies = request.headers.get("cookie");
  const parsedCookies = cookies ? cookie.parse(cookies) : {};
  const token = parsedCookies.authToken;
  if (!token && !request.url.includes("signin")) {
    return NextResponse.redirect(new URL("/signin", request.url));
  } else if (token && request.url.includes("signin")) {
    return NextResponse.redirect(new URL("/", request.url));
  } else {
    return NextResponse.next();
  }
};

export const config = {
  matcher: [
    "/",
    "/signin",
    "/chat",
    "/market",
    "/marketplace",
    "/application",
    "/community",
    "/forms/form-layout",
    "/forms/form-elements",
  ],
};
