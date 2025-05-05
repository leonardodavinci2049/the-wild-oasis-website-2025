import { auth } from "./services/auth";
/* 
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  console.log('middleware:  ', request);

 // return NextResponse.redirect(new URL("/about", request.url));
}
 */


 export const middleware = auth;

export const config = {
  matcher: ["/account"],
};
 