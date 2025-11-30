import { SiteConfig } from "@/types/siteConfig";

export const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://fontmeme.fun";

const TWITTER_EN = 'https://x.com/flipimageapp'
const TWITTER_ZH = 'https://x.com/flipimageapp'
const BSKY_URL = 'https://bsky.app/profile/flipimage.bsky.social'
const EMAIL_URL = 'mailto:hi@fontmeme.fun'

export const siteConfig: SiteConfig = {
  name: 'Font Meme',
  url: BASE_URL,
  authors: [
    {
      name: "fontmeme.fun",
      url: "https://fontmeme.fun",
    }
  ],
  creator: '@fontmeme',
  socialLinks: {
    bluesky: BSKY_URL,
    twitter: TWITTER_EN,
    twitterZh: TWITTER_ZH,
    email: EMAIL_URL,
  },
  themeColors: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
  defaultNextTheme: 'dark', // next-theme option: system | dark | light
  icons: {
    icon: "/favicon.ico",
    shortcut: "/logo.png",
    apple: "/logo.png", // apple-touch-icon.png
  },
}
