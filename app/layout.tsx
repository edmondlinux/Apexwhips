import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Manrope } from 'next/font/google';

export const metadata: Metadata = {
  title: 'ApexWhips - SmartWhips across the UK | Fast Delivery',
  description: 'Premium automotive SmartWhips available for delivery across all major UK towns. Buy SmartWhips, Fastgas, and Flake with rapid local dispatch.',
  keywords: ['Smartwhip', 'Fastgas', 'Flake', 'Smartwhips for sale', 'Buy Smartwhip', 'UK Delivery'],
  openGraph: {
    title: 'ApexWhips - Premium SmartWhips UK',
    description: 'Rapid delivery of premium automotive smart technology across the UK.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ApexWhips - Premium SmartWhips UK',
    description: 'Rapid delivery of premium automotive smart technology across the UK.',
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
