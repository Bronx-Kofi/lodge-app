import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://mikyhillside.com';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/studio/',
          '/api/',
          '/checkout',
          '/confirmation',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
