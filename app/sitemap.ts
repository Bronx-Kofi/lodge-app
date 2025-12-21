import { MetadataRoute } from 'next';
import { client } from '@/sanity/lib/client';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://mikyhillside.com';

  // Fetch all rooms
  const rooms = await client.fetch(`
    *[_type == "roomSimplified" && !(_id in path("drafts.**"))]{ 
      "slug": slug.current, 
      _updatedAt 
    }
  `);

  // Fetch all heritage sites
  const heritageSites = await client.fetch(`
    *[_type == "heritageSite" && !(_id in path("drafts.**"))]{ 
      "slug": slug.current, 
      _updatedAt 
    }
  `);

  // Fetch all blog posts
  const blogPosts = await client.fetch(`
    *[_type == "blogPost" && !(_id in path("drafts.**"))]{ 
      "slug": slug.current, 
      _updatedAt 
    }
  `);

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/rooms`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/explore`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ];

  // Room pages
  const roomPages = rooms.map((room: any) => ({
    url: `${baseUrl}/rooms/${room.slug}`,
    lastModified: new Date(room._updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Heritage pages
  const heritagePages = heritageSites.map((site: any) => ({
    url: `${baseUrl}/explore/${site.slug}`,
    lastModified: new Date(site._updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // Blog pages
  const blogPages = blogPosts.map((post: any) => ({
    url: `${baseUrl}/posts/${post.slug}`,
    lastModified: new Date(post._updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }));

  return [...staticPages, ...roomPages, ...heritagePages, ...blogPages];
}
