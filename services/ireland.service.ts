import irelandData from '@/data/ireland.json';
import type { TownDetail } from '@/types';

export interface IrelandCity {
  id: string;
  name: string;
  county: string;
}

export interface NearbyIrishCity extends IrelandCity {
  distanceMiles: number;
}

export function getAllIrishCities(): IrelandCity[] {
  return irelandData.map((c) => ({
    id: c.city.toLowerCase().replace(/\s+/g, '-'),
    name: c.city,
    county: c.admin_name,
  }));
}

export function getIrishCityBySlug(slug: string): TownDetail | null {
  const city = irelandData.find(
    (c) => c.city.toLowerCase().replace(/\s+/g, '-') === slug.toLowerCase()
  );
  return city ?? null;
}

export function getStaticIrishCityParams() {
  return irelandData.map((c) => ({
    city: c.city.toLowerCase().replace(/\s+/g, '-'),
  }));
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

export function getNearbyIrishCitiesByCoords(
  lat: number,
  lng: number,
  excludeSlug: string,
  limit = 8
): NearbyIrishCity[] {
  return irelandData
    .filter((c) => c.city.toLowerCase().replace(/\s+/g, '-') !== excludeSlug.toLowerCase())
    .map((c) => {
      const km = haversineKm(lat, lng, parseFloat(c.lat), parseFloat(c.lng));
      return {
        id: c.city.toLowerCase().replace(/\s+/g, '-'),
        name: c.city,
        county: c.admin_name,
        distanceMiles: Math.round(km * 0.621371),
      };
    })
    .sort((a, b) => a.distanceMiles - b.distanceMiles)
    .slice(0, limit);
}
