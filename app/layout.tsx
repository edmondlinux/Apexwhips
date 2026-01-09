import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Manrope } from 'next/font/google';
import Script from 'next/script';

const baseUrl = process.env.BASE_URL || 'https://apexwhips.com';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: '/',
  },
  title: 'ApexWhips - SmartWhips across the UK | Fast Delivery',
  description: 'Premium automotive SmartWhips available for delivery across all major UK towns. Buy SmartWhips, Fastgas, and Flake with rapid local dispatch.',
  keywords: ['Smartwhips for sale in UK', 'Buy smartwhips in UK', 'smartwhips UK', 'ApexWhips', 'Smartwhip', 'Fastgas', 'Flake'],
  icons: {
    icon: [
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon/favicon.ico' }
    ],
    apple: [
      { url: '/favicon/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ],
    other: [
      { rel: 'manifest', url: '/favicon/site.webmanifest' }
    ]
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'ApexWhips - Premium SmartWhips UK',
    description: 'Rapid delivery of premium automotive smart technology across the UK.',
    type: 'website',
    url: baseUrl,
    images: [
      {
        url: '/og_image/og_image.jpeg',
        width: 1200,
        height: 630,
        alt: 'ApexWhips Logo',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ApexWhips - Premium SmartWhips UK',
    description: 'Rapid delivery of premium automotive smart technology across the UK.',
    images: ['/og_image/og_image.jpeg'],
  }
};

export const viewport: Viewport = {
  maximumScale: 1
};

const manrope = Manrope({ subsets: ['latin'] });

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`bg-white text-black ${manrope.className}`}
    >
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
      </body>
    </html>
  );
}
