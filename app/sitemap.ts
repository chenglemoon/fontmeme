import { listPublishedPostsAction, type PublicPost } from '@/actions/blogs/posts'
import { siteConfig } from '@/config/site'
import { DEFAULT_LOCALE, LOCALES } from '@/i18n/routing'
import { getPosts } from '@/lib/getBlogs'
import { MetadataRoute } from 'next'

const siteUrl = siteConfig.url

type ChangeFrequency = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never' | undefined

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
    return staticPages.map(page => ({
      url: `${siteUrl}${locale === DEFAULT_LOCALE ? '' : `/${locale}`}${page}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as ChangeFrequency,
      priority: page === '' ? 1.0 : 0.8,
    }))
  })

  const allBlogSitemapEntries: MetadataRoute.Sitemap = [];

  for (const locale of LOCALES) {
    const { posts: localPosts } = await getPosts(locale);
    localPosts
      .filter((post) => post.slug && post.status !== "draft")
      .forEach((post) => {
        const slugPart = post.slug.replace(/^\//, "").replace(/^blogs\//, "");
        if (slugPart) {
          allBlogSitemapEntries.push({
            url: `${siteUrl}${locale === DEFAULT_LOCALE ? '' : `/${locale}`}/blogs/${slugPart}`,
            lastModified: post.metadata?.updatedAt || post.published_at || new Date(),
            changeFrequency: 'daily' as ChangeFrequency,
            priority: 0.7,
          });
        }
      });
  }

  for (const locale of LOCALES) {
    const serverResult = await listPublishedPostsAction({
      pageIndex: 0,
      locale: locale,
      pageSize: 1000,
    });
    if (serverResult.success && serverResult.data) {
      const data = serverResult.data as { posts: PublicPost[] };
      data.posts.forEach((post: PublicPost) => {
        const slugPart = post.slug?.replace(/^\//, "").replace(/^blogs\//, "");
        if (slugPart) {
          allBlogSitemapEntries.push({
            url: `${siteUrl}${locale === DEFAULT_LOCALE ? '' : `/${locale}`}/blogs/${slugPart}`,
            lastModified: post.published_at || new Date(),
            changeFrequency: 'daily' as ChangeFrequency,
            priority: 0.7,
          });
        }
      });
    }
  }

  const uniqueBlogPostEntries = Array.from(
    new Map(allBlogSitemapEntries.map((entry) => [entry.url, entry])).values()
  );

  return [
    ...pages,
    ...uniqueBlogPostEntries,
  ]
}