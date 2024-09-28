import { NextResponse } from "next/server";

export function middleware(req){
  if(req.nextUrl.pathname === "/") return NextResponse.next();
  
  // Implement checks here, currently middleware will check every path including the root path.

  return NextResponse.next();
}


export const config = {
    matcher: ["/:path*"]
}
