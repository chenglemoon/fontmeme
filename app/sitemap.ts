import { listPublishedPostsAction, type PublicPost } from '@/actions/blogs/posts'
import { siteConfig } from '@/config/site'
import { DEFAULT_LOCALE, LOCALES } from '@/i18n/routing'
import { getPosts } from '@/lib/getBlogs'
import { MetadataRoute } from 'next'

// 确保 siteUrl 没有尾部斜杠
const siteUrl = siteConfig.url.replace(/\/$/, '')

type ChangeFrequency = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never' | undefined

// 添加超时辅助函数
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

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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

  const pages = LOCALES.flatMap(locale => {
    return staticPages.map(page => {
      // 构建 URL，确保格式正确
      const localePrefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`
      const path = page === '' ? '/' : page
      const fullUrl = `${siteUrl}${localePrefix}${path}`
      
      return {
        url: fullUrl,
        lastModified: new Date(),
        changeFrequency: 'daily' as ChangeFrequency,
        priority: page === '' ? 1.0 : 0.8,
      }
    })
  })

  const allBlogSitemapEntries: MetadataRoute.Sitemap = [];

  // 添加错误处理和超时，确保即使博客数据加载失败，sitemap 也能正常生成
  // 设置 5 秒超时，避免 sitemap 生成时间过长
  for (const locale of LOCALES) {
    try {
      const { posts: localPosts } = await withTimeout(
        getPosts(locale),
        5000,
        { posts: [] }
      );
      localPosts
        .filter((post) => post.slug && post.status !== "draft")
        .forEach((post) => {
          const slugPart = post.slug.replace(/^\//, "").replace(/^blogs\//, "");
          if (slugPart) {
            const localePrefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`
            const blogUrl = `${siteUrl}${localePrefix}/blogs/${slugPart}`
            allBlogSitemapEntries.push({
              url: blogUrl,
              lastModified: post.metadata?.updatedAt || post.published_at || new Date(),
              changeFrequency: 'daily' as ChangeFrequency,
              priority: 0.7,
            });
          }
        });
    } catch (error) {
      // 静默处理错误，继续生成其他部分的 sitemap
      console.error(`Error loading posts for locale ${locale}:`, error);
    }
  }

  for (const locale of LOCALES) {
    try {
      const serverResult = await withTimeout(
        listPublishedPostsAction({
          pageIndex: 0,
          locale: locale,
          pageSize: 1000,
        }),
        5000,
        { success: false as const, error: 'Timeout' }
      );
      if (serverResult.success && serverResult.data) {
        const data = serverResult.data as { posts: PublicPost[] };
        data.posts.forEach((post: PublicPost) => {
          const slugPart = post.slug?.replace(/^\//, "").replace(/^blogs\//, "");
          if (slugPart) {
            const localePrefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`
            const blogUrl = `${siteUrl}${localePrefix}/blogs/${slugPart}`
            allBlogSitemapEntries.push({
              url: blogUrl,
              lastModified: post.published_at || new Date(),
              changeFrequency: 'daily' as ChangeFrequency,
              priority: 0.7,
            });
          }
        });
      }
    } catch (error) {
      // 静默处理错误，继续生成其他部分的 sitemap
      console.error(`Error loading server posts for locale ${locale}:`, error);
    }
  }

  const uniqueBlogPostEntries = Array.from(
    new Map(allBlogSitemapEntries.map((entry) => [entry.url, entry])).values()
  );

  // 合并所有条目
  const allEntries = [
    ...pages,
    ...uniqueBlogPostEntries,
  ]

  // 验证并清理 URL，确保格式正确
  const validatedEntries = allEntries
    .filter(entry => {
      // 验证 URL 格式
      try {
        new URL(entry.url)
        return true
      } catch {
        console.error(`Invalid URL in sitemap: ${entry.url}`)
        return false
      }
    })
    .map(entry => {
      // 确保 URL 格式正确，移除多余的尾部斜杠（除了根路径）
      let cleanUrl = entry.url.replace(/\/+$/, '')
      if (!cleanUrl || cleanUrl === siteUrl) {
        cleanUrl = `${siteUrl}/`
      }
      return {
        ...entry,
        url: cleanUrl,
      }
    })

  // 确保至少返回一个有效的条目（主页）
  if (validatedEntries.length === 0) {
    return [{
      url: `${siteUrl}/`,
      lastModified: new Date(),
      changeFrequency: 'daily' as ChangeFrequency,
      priority: 1.0,
    }]
  }

  return validatedEntries
}