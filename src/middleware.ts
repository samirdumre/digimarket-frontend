import {NextRequest, NextResponse} from "next/server";

export function middleware(request: NextRequest) {
    const authToken = request.cookies.get('authToken')?.value;
    const {pathname, searchParams} = request.nextUrl;

    const publicPaths = ['/', '/signup', 'signin'];
    const isPublicPath = publicPaths.includes(pathname);

    const protectedPaths = ['/products'];
    const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path));

    // Guarding protected routes on frontend with middleware
    // This logic allows the user to access the guarded routes upon verifying the fist time
    if(isProtectedPath && !authToken) {
        return NextResponse.redirect(new URL('/signin', request.url));
    }

    if(authToken && (pathname === '/signin' || pathname === '/signup')){
        return NextResponse.redirect(new URL('/products', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin'],
}
