import { MetadataRoute } from 'next';

const SITE_URL = process.env.SITE_URL || 'https://www.example.com';

const staticPages = [
  '/',
  '/aboutus',
  '/game',
  '/contact',
];

async function getBlogPostSlugs(): Promise<string[]> {
  return fetch('https://api.example.com')
    .then(res => res.json())
    .then((posts: Array<{ slug: string }>) =>
      posts.map(p => `/game/${p.slug}`)
    );
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const dynamicPages = await getBlogPostSlugs();

  const routes = [...staticPages, ...dynamicPages].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date().toISOString(),
  }));

  return routes;
}
