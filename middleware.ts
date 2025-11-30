import createIntlMiddleware from 'next-intl/middleware';
import type { NextRequest } from 'next/server';
import { routing } from './i18n/routing';

export default async function middleware(request: NextRequest) {
  const intl = createIntlMiddleware(routing);
  return intl(request);
}

export const config = {
  matcher: [
    // 匹配所有语言路径
    '/(de|en|es|fr|it|ja|ko|pl|pt|ru|zh)/:path*',
    // 匹配根路径
    '/',
    // 排除不需要处理的路径
    '/((?!api|_next|_vercel|auth|.*\\.|favicon.ico).*)'
  ]
};