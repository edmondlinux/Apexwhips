import gbData from '@/data/gb.json';
import townsData from '@/data/towns.json';
import type { Town, TownDetail } from '@/types';

export function getAllTowns(): Town[] {
  return gbData.map((t) => ({
    id: t.city.toLowerCase().replace(/\s+/g, '-'),
    name: t.city,
    admin: t.admin_name,
  }));
}

export function searchTowns(query: string): Town[] {
  if (!query) return getAllTowns();
  const lower = query.toLowerCase();
  return getAllTowns().filter(
    (t) =>
      t.name.toLowerCase().includes(lower) ||
      t.admin.toLowerCase().includes(lower)
  );
}

export function getTownById(slug: string): TownDetail | null {
  const townData = gbData.find(
    (t) => t.city.toLowerCase().replace(/\s+/g, '-') === slug.toLowerCase()
  );
  return townData ?? null;
}

export function getStaticTownParams() {
  return gbData.map((town) => ({
    town: town.city.toLowerCase().replace(/\s+/g, '-'),
  }));
}

export function searchTownsSuggestions(query: string, limit = 10) {
  if (!query) return [];
  const lower = query.toLowerCase();
  return townsData
    .filter((town) => town.name.toLowerCase().includes(lower))
    .slice(0, limit);
}

export function getTownRecommendations(query: string, limit = 5): Town[] {
  if (!query) return [];
  const lower = query.toLowerCase();
  return getAllTowns()
    .filter((town) => town.name.toLowerCase().startsWith(lower))
    .slice(0, limit);
}
