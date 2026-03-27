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

function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export interface NearbyTown extends Town {
  distanceMiles: number;
}

export function getNearbyTownsByCoords(
  lat: number,
  lng: number,
  excludeSlug: string,
  limit = 8
): NearbyTown[] {
  return gbData
    .filter((t) => t.city.toLowerCase().replace(/\s+/g, '-') !== excludeSlug.toLowerCase())
    .map((t) => {
      const km = haversineKm(lat, lng, parseFloat(t.lat), parseFloat(t.lng));
      return {
        id: t.city.toLowerCase().replace(/\s+/g, '-'),
        name: t.city,
        admin: t.admin_name,
        distanceMiles: Math.round(km * 0.621371),
      };
    })
    .sort((a, b) => a.distanceMiles - b.distanceMiles)
    .slice(0, limit);
}
