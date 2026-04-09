import { FloatingBottomNav } from '@/components/common/FloatingBottomNav';
import { BottomSheet } from '@/components/common/BottomSheet';
import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Manrope } from 'next/font/google';
import Script from 'next/script';

const baseUrl = process.env.BASE_URL || 'https://www.apexwhips.com';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: '/',
  },
  title: 'SmartWhip UK | Buy Smartwhip, FastGas & Cream Deluxe | 25 mins Delivery',
  description:
    "Buy Smartwhip, FastGas & Cream Deluxe 640g and 2kg N2O Canisters with fast same-day delivery across the UK. Wholesale prices on bulk orders. Same-day delivery in Bristol, Manchester, Coventry & more. Buy now",
  keywords: [
    'SmartWhip UK',
    'Buy SmartWhips online',
    'SmartWhip 640g',
    'FastGas cylinders',
    'Nitrous Oxide UK',
    'Cream chargers near me',
    'Smartwhip wholesale',
    'smart whip',
    'baloons UK',
    'smartwhip near me',
    'ApexWhips',
    'apexwhips',
  ],
  icons: {
    icon: [
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon/favicon.ico' },
    ],
    apple: [{ url: '/favicon/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    other: [{ rel: 'manifest', url: '/favicon/site.webmanifest' }],
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'ApexWhips - Premium SmartWhips UK| apexwhips',
    description:
      'Buy Smartwhip, FastGas & Cream Deluxe 640g and 2kg N2O Canisters with fast same-day delivery across the UK. Wholesale prices on bulk orders. Same-day delivery in Bristol, Manchester, Coventry & more. Buy now',
    type: 'website',
    url: baseUrl,
    images: [
      {
        url: '/og_image/og_image.jpeg',
        width: 1200,
        height: 630,
        alt: 'ApexWhips Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ApexWhips - Premium SmartWhips UK',
    description:
      'Fast delivery of Smartwhip, Fastgas, and Cream Deluxe canisters. Get original 640g,2kg N2O cream chargers delivered in under 25 minutes. Best wholesale prices guaranteed.',
    images: ['/og_image/og_image.jpeg'],
  },
};

export const viewport: Viewport = {
  maximumScale: 1,
};

const manrope = Manrope({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`bg-white text-black ${manrope.className}`}>
      <body className="min-h-[100dvh] bg-gray-50">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-SVEFLWNMY3"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-SVEFLWNMY3');
          `}
        </Script>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'ApexWhips',
              url: baseUrl,
              logo: `${baseUrl}/logo/logo.jpeg`,
              description: 'Premium SmartWhip and Cream Charger supplier in the UK.',
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'GB',
              },
            }),
          }}
        />
        <FloatingBottomNav />
        <BottomSheet />
      </body>
    </html>
  );
}
