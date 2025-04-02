import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token');
  const isLoginPage = request.nextUrl.pathname === '/login';
  const isDashboardPage = request.nextUrl.pathname === '/dashboard';

  console.log('Current path:', request.nextUrl.pathname);
  console.log('Token:', token);

  // Ana sayfa veya dashboard için token kontrolü
  if (!token && (request.nextUrl.pathname === '/' || isDashboardPage)) {
    console.log('Redirecting to login page - no token');
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Login sayfasındayken token varsa dashboard'a yönlendir
  if (token && isLoginPage) {
    console.log('Redirecting to dashboard - has token');
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}; 