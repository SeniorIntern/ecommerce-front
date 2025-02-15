import { NextRequest, NextResponse } from 'next/server';
import { COOKIES } from './constants';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const authPath = path === '/login' || path === '/register';
  const adminPath =
    path === '/dashboard' ||
    path === '/orders' ||
    path === '/users' ||
    path === '/inventory' ||
    path === '/payments' ||
    path === '/categories';
  const userPath =
    path === '/checkout' ||
    path === '/confirm-payment' ||
    path === '/payment' ||
    path === '/profile';

  const token = request.cookies.get(COOKIES.ACCESS_TOKEN)?.value;
  const user = request.cookies.get(COOKIES.USER)?.value;

  if (!token && (adminPath || userPath)) {
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }

  if (token && authPath) {
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }

  if (token && adminPath && user && JSON.parse(user).role !== 'ADMIN') {
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }
}

export const config = {
  matcher: [
    '/profile',
    '/login',
    '/register',
    '/checkout',
    '/payment',
    '/payments',
    '/confirm-payment',
    '/dashboard',
    '/orders',
    '/users',
    '/categories',
    '/inventory'
  ]
};
