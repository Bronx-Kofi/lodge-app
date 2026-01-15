/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://mikyhillsidelodge.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: [
    '/studio*',
    '/api/*',
    '/server-sitemap.xml',
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: '*',
        disallow: ['/studio', '/api'],
      },
    ],
  },
}
