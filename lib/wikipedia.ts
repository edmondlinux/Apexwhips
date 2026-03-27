export interface WikiSummary {
  extract: string;
  thumbnail?: { source: string };
}

export async function getWikipediaSummary(cityName: string): Promise<WikiSummary | null> {
  try {
    const res = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(cityName)}`,
      { next: { revalidate: 86400 } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    if (!data.extract || data.type === 'disambiguation') return null;
    return {
      extract: data.extract as string,
      thumbnail: data.thumbnail,
    };
  } catch {
    return null;
  }
}

export function truncateExtract(extract: string, maxSentences = 3): string {
  const sentences = extract.match(/[^.!?]+[.!?]+/g) || [];
  return sentences.slice(0, maxSentences).join(' ').trim();
}
