import type { TownDetail } from '@/types';

const BASE_URL = process.env.BASE_URL || 'https://www.apexwhips.com';

export function buildIrelandCityMetadata(cityData: TownDetail, citySlug: string) {
  const cityName = cityData.city;
  return {
    title: `Buy Smartwhip in ${cityName} | Fast Delivery Ireland | Order via WhatsApp or Telegram`,
    description: `Do you need Smartwhip fast in ${cityName}? Look no further — order from ApexWhips for just €35 and have it delivered in under 30 mins in ${cityName}, Ireland.`,
    alternates: {
      canonical: `/cream-chargers/smartwhip/${citySlug}`,
    },
    keywords: [
      `Smartwhip ${cityName}`,
      `buy Smartwhip ${cityName}`,
      `Smartwhip delivery ${cityName}`,
      `cream chargers ${cityName}`,
      `FastGas ${cityName}`,
      `Cream Deluxe ${cityName}`,
      `N2O cylinders ${cityName}`,
      `Smartwhip Ireland`,
      `cream chargers Ireland`,
      `buy cream chargers ${cityName}`,
      `smartwhip near ${cityName}`,
    ],
    openGraph: {
      title: `Buy Smartwhip in ${cityName} | Fast Delivery Ireland | Order via WhatsApp or Telegram`,
      description: `Do you need Smartwhip fast in ${cityName}? Look no further — order from ApexWhips for just €35 and have it delivered in under 30 mins in ${cityName}, Ireland.`,
      images: ['/og_image/og_image.jpeg'],
    },
    twitter: {
      card: 'summary_large_image' as const,
      images: ['/og_image/og_image.jpeg'],
    },
  };
}

export function buildIrelandCityProductJsonLd(cityData: TownDetail, citySlug: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `SmartWhip 640g — ${cityData.city} Ireland Delivery`,
    description: `Premium 640g SmartWhip, FastGas, Cream Deluxe nitrous oxide cream charger delivery in ${cityData.city}, Ireland.`,
    image: `${BASE_URL}/og_image/og_image.jpeg`,
    brand: {
      '@type': 'Brand',
      name: 'Smartwhip',
    },
    sku: `SW-640G-IE-${cityData.city.toUpperCase().replace(/\s+/g, '-')}`,
    review: {
      '@type': 'Review',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: '5',
        bestRating: '5',
      },
      author: {
        '@type': 'Person',
        name: 'Conor Murphy',
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '87',
    },
    offers: {
      '@type': 'Offer',
      url: `${BASE_URL}/cream-chargers/smartwhip/${citySlug}`,
      priceCurrency: 'EUR',
      price: '35.00',
      priceValidUntil: '2026-12-31',
      itemCondition: 'https://schema.org/NewCondition',
      availability: 'https://schema.org/InStock',
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: {
          '@type': 'MonetaryAmount',
          value: '0',
          currency: 'EUR',
        },
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: 'IE',
        },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: {
            '@type': 'QuantitativeValue',
            minValue: 0,
            maxValue: 1,
            unitCode: 'DAY',
          },
        },
      },
      areaServed: {
        '@type': 'City',
        name: cityData.city,
      },
    },
  };
}

export function buildIrelandCityFaqJsonLd(cityData: TownDetail) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `How fast is SmartWhip delivery in ${cityData.city}, Ireland?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `We offer rapid local delivery of SmartWhip and FastGas in ${cityData.city}, Ireland, with most orders delivered within 25–45 minutes.`,
        },
      },
      {
        '@type': 'Question',
        name: 'Is Smartwhip legal in Ireland?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Our SmartWhip products contain 99.9% pure food-grade Nitrous Oxide (N2O) intended for culinary use such as whipping cream, and are fully compliant with Irish food safety regulations.',
        },
      },
    ],
  };
}
