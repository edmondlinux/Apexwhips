import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Manrope } from 'next/font/google';

const baseUrl = process.env.BASE_URL || 'https://apexwhips.com';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: '/',
  },
  title: 'ApexWhips - SmartWhips across the UK | Fast Delivery',
  description: 'Premium automotive SmartWhips available for delivery across all major UK towns. Buy SmartWhips, Fastgas, and Flake with rapid local dispatch.',
  keywords: ['Smartwhip', 'Fastgas', 'Flake', 'Smartwhips for sale', 'Buy Smartwhip', 'UK Delivery'],
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
        url: '/IMG_1867.jpeg',
        width: 1200,
        height: 630,
        alt: 'ApexWhips Premium Product',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ApexWhips - Premium SmartWhips UK',
    description: 'Rapid delivery of premium automotive smart technology across the UK.',
    images: ['/IMG_1867.jpeg'],
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
        {children}
      </body>
    </html>
  );
}
