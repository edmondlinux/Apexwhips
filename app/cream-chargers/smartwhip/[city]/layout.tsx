import type { Metadata } from 'next';
import { getIrishCityBySlug } from '@/services/ireland.service';
import {
  buildIrelandCityMetadata,
  buildIrelandCityProductJsonLd,
  buildIrelandCityFaqJsonLd,
} from '@/lib/ireland-seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city } = await params;
  const cityData = getIrishCityBySlug(city);
  if (!cityData) return { title: 'City Not Found' };
  return buildIrelandCityMetadata(cityData, city);
}

export default async function IrelandCityLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const cityData = getIrishCityBySlug(city);

  return (
    <>
      {cityData && (
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(buildIrelandCityProductJsonLd(cityData, city)),
            }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(buildIrelandCityFaqJsonLd(cityData)),
            }}
          />
        </>
      )}
      {children}
    </>
  );
}
