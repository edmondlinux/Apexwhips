import { MetadataRoute } from 'next';
import gbData from '@/data/gb.json';
import irelandData from '@/data/ireland.json';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://apexwhips.com';

  const townUrls = gbData.map((t) => ({
    url: `${baseUrl}/towns/${t.city.toLowerCase().replace(/\s+/g, '-')}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const irelandUrls = irelandData.map((c) => ({
    url: `${baseUrl}/cream-chargers/smartwhip/${c.city.toLowerCase().replace(/\s+/g, '-')}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/ireland`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    ...townUrls,
    ...irelandUrls,
  ];
}
