import { NextResponse } from "next/server";

export function middleware(req){
  if(req.nextUrl.pathname === "/") return NextResponse.next();
  if (
    req.nextUrl.pathname.startsWith('/_next') || 
    req.nextUrl.pathname.startsWith('/favicon.ico') || 
    req.nextUrl.pathname.startsWith("/api") || 
    req.nextUrl.pathname.startsWith('/images') ||
    req.nextUrl.pathname === "/signup" || 
    req.nextUrl.pathname === "/login"
  ) return NextResponse.next();

  if(!req.cookies.has("access")){
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}


export const config = {
    matcher: ["/:path*"]
}
