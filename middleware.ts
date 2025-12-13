import createIntlMiddleware from 'next-intl/middleware';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { routing } from './i18n/routing';

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // 排除 sitemap.xml、robots.txt 和其他静态文件
  if (
    pathname === '/sitemap.xml' ||
    pathname === '/robots.txt' ||
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/_vercel/') ||
    pathname.match(/\.(ico|png|jpg|jpeg|svg|gif|webp|woff|woff2|ttf|eot)$/)
  ) {
    return NextResponse.next();
  }
  
  const intl = createIntlMiddleware(routing);
  return intl(request);
}

export const config = {
  matcher: [
    /*
     * 匹配所有请求路径，除了：
     * - api (API 路由)
     * - _next (Next.js 内部)
     * - _vercel (Vercel 内部)
     * - favicon.ico, robots.txt, sitemap.xml
     * - 静态资源文件 (图片、字体等)
     */
    '/((?!api|_next|_vercel|favicon\\.ico|robots\\.txt|sitemap\\.xml|.*\\.(?:ico|png|jpg|jpeg|svg|gif|webp|woff|woff2|ttf|eot)).*)',
  ]
};

