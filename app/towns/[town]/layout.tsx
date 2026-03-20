import type { Metadata } from 'next';
import { getTownById } from '@/services/town.service';
import { buildTownMetadata, buildTownProductJsonLd, buildTownFaqJsonLd } from '@/lib/seo';

interface Props {
  children: React.ReactNode;
  params: Promise<{ town: string }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ town: string }>;
}): Promise<Metadata> {
  const { town } = await params;
  const townData = getTownById(town);

  if (!townData) return { title: 'Town Not Found' };

  return buildTownMetadata(townData, town);
}

export default async function TownLayout({ children, params }: Props) {
  const { town } = await params;
  const townData = getTownById(town);

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
