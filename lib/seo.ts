import type { TownDetail } from '@/types';

const BASE_URL = process.env.BASE_URL || 'https://www.apexwhips.com';

export function buildTownProductJsonLd(townData: TownDetail, townSlug: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `SmartWhip 640g- ${townData.city} Delivery`,
    description: `Do you need Smartwhip fast? Look no further order now for just £30, Under 30 mins delivery in ${townData.city}.`,
    image: `${BASE_URL}/og_image/og_image.jpeg`,
    brand: {
      '@type': 'Brand',
      name: 'Smartwhip',
    },
    sku: `SW-640G-${townData.city.toUpperCase().replace(/\s+/g, '-')}`,
    review: {
      '@type': 'Review',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: '5',
        bestRating: '5',
      },
      author: {
        '@type': 'Person',
        name: 'James Wilson',
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '124',
    },
    offers: {
      '@type': 'Offer',
      url: `${BASE_URL}/towns/${townSlug}`,
      priceCurrency: 'GBP',
      price: '30.00',
      priceValidUntil: '2026-12-31',
      itemCondition: 'https://schema.org/NewCondition',
      availability: 'https://schema.org/InStock',
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: {
          '@type': 'MonetaryAmount',
          value: '0',
          currency: 'GBP',
        },
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: 'GB',
        },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: {
            '@type': 'QuantitativeValue',
            minValue: 0,
            maxValue: 1,
            unitCode: 'DAY',
          },
          transitTime: {
            '@type': 'ShippingDeliveryTime',
            transitTime: {
              '@type': 'QuantitativeValue',
              minValue: 0,
              maxValue: 1,
              unitCode: 'DAY',
            },
          },
        },
      },
      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        applicableCountry: 'GB',
        returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnPeriod',
        merchantReturnDays: 30,
        returnMethod: 'https://schema.org/ReturnByMail',
        returnFees: 'https://schema.org/FreeReturn',
      },
      areaServed: {
        '@type': 'City',
        name: townData.city,
      },
    },
  };
}

export function buildTownFaqJsonLd(townData: TownDetail) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `How fast is SmartWhip delivery in ${townData.city}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `We offer rapid local delivery of SmartWhip and FastGas in ${townData.city}, with most orders delivered within 25-45 minutes.`,
        },
      },
      {
        '@type': 'Question',
        name: 'Is the Smartwhip food-grade?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, all our Smartwhip canisters contain 99.9% pure food-grade Nitrous Oxide (N2O).',
        },
      },
    ],
  };
}

export function buildTownMetadata(townData: TownDetail, townSlug: string) {
  const cityName = townData.city;
  return {
    title: `Buy Smartwhip in ${cityName} | Fast Delivery | Order via WhatsApp or Telegram`,
    description: `Do you need Smartwhip fast? Look no further order now for just £30, Under 30 mins delivery in ${cityName}.`,
    alternates: {
      canonical: `/towns/${townSlug}`,
    },
    keywords: [
      `Smartwhip ${cityName}`,
      `buy Smartwhip ${cityName}`,
      `Smartwhip delivery ${cityName}`,
      `640g cream chargers ${cityName}`,
      `FastGas ${cityName}`,
      `Cream Deluxe ${cityName}`,
      `N2O cylinders ${cityName}`,
      `Smartwhip wholesale ${cityName}`,
      `smart whip ${cityName}`,
      `smartwhip Near ${cityName}`,
    ],
    openGraph: {
      title: `Buy Smartwhip in ${cityName} | Fast Delivery | Order via WhatsApp or Telegram`,
      description: `Do you need Smartwhip fast? Look no further — order from ApexWhips for just £30 and have it delivered in under 30 mins in ${cityName}.`,
      images: ['/og_image/og_image.jpeg'],
    },
    twitter: {
      card: 'summary_large_image' as const,
      images: ['/og_image/og_image.jpeg'],
    },
  };
}
