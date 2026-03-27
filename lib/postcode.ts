export interface PostcodeResult {
  postcode: string;
  latitude: number;
  longitude: number;
  admin_district: string;
  admin_county: string;
  region: string;
  parish: string;
  country: string;
}

export interface PlaceResult {
  code: string;
  name_1: string;
  county_unitary: string | null;
  region: string;
  country: string;
  longitude: number;
  latitude: number;
  local_type: string;
}

const UK_POSTCODE_REGEX = /^[A-Z]{1,2}[0-9][0-9A-Z]?\s*[0-9][A-Z]{2}$/i;

export function isUKPostcode(query: string): boolean {
  return UK_POSTCODE_REGEX.test(query.trim());
}

export function postcodeToSlug(postcode: string): string {
  return postcode.trim().toLowerCase().replace(/\s+/g, '');
}

export function slugToPostcode(slug: string): string {
  const clean = slug.toUpperCase().replace(/[^A-Z0-9]/g, '');
  if (clean.length >= 5 && clean.length <= 7) {
    return clean.slice(0, -3) + ' ' + clean.slice(-3);
  }
  return clean;
}

export function mightBePostcodeSlug(slug: string): boolean {
  const reconstructed = slugToPostcode(slug);
  return isUKPostcode(reconstructed);
}

export function placeToSlug(place: PlaceResult): string {
  return place.name_1.toLowerCase().replace(/\s+/g, '-');
}

export async function lookupPostcode(postcode: string): Promise<PostcodeResult | null> {
  try {
    const res = await fetch(
      `https://api.postcodes.io/postcodes/${encodeURIComponent(postcode.trim())}`,
      { next: { revalidate: 86400 } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    if (data.status === 200 && data.result) return data.result as PostcodeResult;
    return null;
  } catch {
    return null;
  }
}

export async function searchUKPlaces(query: string, limit = 8): Promise<PlaceResult[]> {
  if (!query || query.trim().length < 2) return [];
  try {
    const res = await fetch(
      `https://api.postcodes.io/places?q=${encodeURIComponent(query.trim())}&limit=${limit}`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return [];
    const data = await res.json();
    if (data.status === 200 && Array.isArray(data.result)) return data.result as PlaceResult[];
    return [];
  } catch {
    return [];
  }
}

export async function lookupPlaceBySlug(slug: string): Promise<PlaceResult | null> {
  const query = slug.replace(/-/g, ' ');
  const results = await searchUKPlaces(query, 1);
  if (results.length === 0) return null;
  return results[0];
}

export function postcodeResultToTownDetail(result: PostcodeResult) {
  return {
    city: result.admin_district || result.parish || result.postcode,
    admin_name: result.admin_county || result.region || 'United Kingdom',
    lat: String(result.latitude),
    lng: String(result.longitude),
    population: '0',
    iso2: 'GB',
  };
}

export function placeResultToTownDetail(result: PlaceResult) {
  return {
    city: result.name_1,
    admin_name: result.county_unitary || result.region || 'United Kingdom',
    lat: String(result.latitude),
    lng: String(result.longitude),
    population: '0',
    iso2: 'GB',
  };
}
