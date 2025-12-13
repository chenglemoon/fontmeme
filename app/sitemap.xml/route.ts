import { listPublishedPostsAction, type PublicPost } from '@/actions/blogs/posts'
import { siteConfig } from '@/config/site'
import { DEFAULT_LOCALE, LOCALES } from '@/i18n/routing'
import { NextResponse } from 'next/server'

const siteUrl = siteConfig.url.replace(/\/$/, '')

type ChangeFrequency = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never' | undefined

// 超时辅助函数
async function withTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number,
  fallback: T
): Promise<T> {
  try {
    const timeoutPromise = new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error('Timeout')), timeoutMs)
    );
    return await Promise.race([promise, timeoutPromise]);
  } catch (error) {
    return fallback;
  }
}

// 简化博客数据获取
async function getBlogPostsSafely(locale: string): Promise<PublicPost[]> {
  try {
    const serverResult = await withTimeout(
      listPublishedPostsAction({
        pageIndex: 0,
        locale: locale as any,
        pageSize: 1000,
      }),
      3000,
      { success: false as const, error: 'Timeout' }
    );
    
    if (serverResult.success && serverResult.data) {
      const data = serverResult.data as { posts: PublicPost[] };
      return data.posts || [];
    }
  } catch (error) {
    console.error(`Error loading posts for locale ${locale}:`, error);
  }
  
  return [];
}

// 格式化日期为 ISO 8601
function formatDate(date: Date): string {
  return date.toISOString();
}

export async function GET() {
  try {
    // Static pages
    const staticPages = [
      '',
      '/privacy-policy',
      '/terms-of-service',
      '/font-generator',
      '/carly-rae-jepsen-font',
      '/calligraphy-generator',
      '/pokemon-font',
      '/minecraft-font',
      '/the-life-of-a-showgirl-font',
      '/disney-font',
      '/brat-font',
      '/graffiti-generator',
      '/hindi-font-generator',
      '/tamil-font-generator',
      '/malayalam-font-generator',
      '/undertale-font',
      '/coca-cola-font',
      '/demon-slayer-font',
      '/gta-font',
      '/squid-game-font',
      '/montserrat-font',
      '/sonic-font',
      '/plus-jakarta-sans',
    ]

    const pages: Array<{ url: string; lastModified: Date; changeFrequency: ChangeFrequency; priority: number }> = [];
    
    LOCALES.forEach(locale => {
      staticPages.forEach(page => {
        const localePrefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`
        const path = page === '' ? '/' : page
        const fullUrl = `${siteUrl}${localePrefix}${path}`
        
        pages.push({
          url: fullUrl,
          lastModified: new Date(),
          changeFrequency: 'daily',
          priority: page === '' ? 1.0 : 0.8,
        });
      });
    });

    // 获取博客文章
    const allBlogSitemapEntries: Array<{ url: string; lastModified: Date; changeFrequency: ChangeFrequency; priority: number }> = [];
    
    const blogPostsPromises = LOCALES.map(locale => 
      getBlogPostsSafely(locale).catch(() => [])
    );
    
    try {
      const allPostsResults = await Promise.all(blogPostsPromises);
      
      LOCALES.forEach((locale, index) => {
        const posts = allPostsResults[index] || [];
        posts
          .filter((post) => post.slug && post.status === "published")
          .forEach((post: PublicPost) => {
            const slugPart = post.slug?.replace(/^\//, "").replace(/^blogs\//, "");
            if (slugPart) {
              const localePrefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`
              const blogUrl = `${siteUrl}${localePrefix}/blogs/${slugPart}`
              allBlogSitemapEntries.push({
                url: blogUrl,
                lastModified: post.published_at ? new Date(post.published_at) : new Date(),
                changeFrequency: 'daily',
                priority: 0.7,
              });
            }
          });
      });
    } catch (error) {
      console.error('Error loading blog posts for sitemap:', error);
    }

    // 合并所有条目
    const allEntries = [...pages, ...allBlogSitemapEntries];

    // 验证并清理 URL
    const validatedEntries = allEntries
      .filter(entry => {
        try {
          new URL(entry.url)
          return true
        } catch {
          console.error(`Invalid URL in sitemap: ${entry.url}`)
          return false
        }
      })
      .map(entry => {
        let cleanUrl = entry.url.replace(/\/+$/, '')
        if (!cleanUrl || cleanUrl === siteUrl) {
          cleanUrl = `${siteUrl}/`
        }
        return {
          ...entry,
          url: cleanUrl,
        }
      })

    // 确保至少有一个条目
    const finalEntries = validatedEntries.length === 0 
      ? [{ url: `${siteUrl}/`, lastModified: new Date(), changeFrequency: 'daily' as ChangeFrequency, priority: 1.0 }]
      : validatedEntries;

    // 生成 XML
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${finalEntries.map(entry => `  <url>
    <loc>${escapeXml(entry.url)}</loc>
    <lastmod>${formatDate(entry.lastModified)}</lastmod>
    <changefreq>${entry.changeFrequency || 'daily'}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`).join('\n')}
</urlset>`

    return new NextResponse(xml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate',
      },
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    // 返回一个基本的 sitemap，至少包含主页
    const fallbackXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}/</loc>
    <lastmod>${formatDate(new Date())}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`
    
    return new NextResponse(fallbackXml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
      },
    });
  }
}

// XML 转义函数
function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

