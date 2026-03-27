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
