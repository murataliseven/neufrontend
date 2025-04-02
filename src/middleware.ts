import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token');
  const isLoginPage = request.nextUrl.pathname === '/login';

  // Login sayfasındayken token varsa dashboard'a yönlendir
  if (token && isLoginPage) {
    console.log('Redirecting to dashboard - has token');
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/login'],
}; 