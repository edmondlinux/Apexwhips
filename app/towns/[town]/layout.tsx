import type { Metadata } from 'next';
import { getTownById } from '@/services/town.service';
import { buildTownMetadata, buildTownProductJsonLd, buildTownFaqJsonLd } from '@/lib/seo';
import {
  mightBePostcodeSlug,
  slugToPostcode,
  lookupPostcode,
  postcodeResultToTownDetail,
  lookupPlaceBySlug,
  placeResultToTownDetail,
} from '@/lib/postcode';
import type { TownDetail } from '@/types';

interface Props {
  children: React.ReactNode;
  params: Promise<{ town: string }>;
}

async function resolveTownData(town: string): Promise<TownDetail | null> {
  let townData: TownDetail | null = getTownById(town);

  if (!townData && mightBePostcodeSlug(town)) {
    const postcode = slugToPostcode(town);
    const result = await lookupPostcode(postcode);
    if (result) townData = postcodeResultToTownDetail(result);
  }

  if (!townData) {
    const placeResult = await lookupPlaceBySlug(town);
    if (placeResult) townData = placeResultToTownDetail(placeResult);
  }

  return townData;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ town: string }>;
}): Promise<Metadata> {
  const { town } = await params;
  const townData = await resolveTownData(town);
  if (!townData) return { title: 'Town Not Found' };
  return buildTownMetadata(townData, town);
}

export default async function TownLayout({ children, params }: Props) {
  const { town } = await params;
  const townData = await resolveTownData(town);

  return (
    <>
      {townData && (
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(buildTownProductJsonLd(townData, town)),
            }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(buildTownFaqJsonLd(townData)),
            }}
          />
        </>
      )}
      {children}
    </>
  );
}
