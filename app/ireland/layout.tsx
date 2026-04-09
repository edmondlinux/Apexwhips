import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Buy Smartwhip in Ireland | Fast Delivery | Order via WhatsApp or Telegram',
  description:
    'Order premium SmartWhip, FastGas and Cream Deluxe cream chargers across Ireland. Fast delivery to Dublin, Cork, Galway, Limerick and all major Irish cities. Order via WhatsApp or Telegram.',
  alternates: {
    canonical: '/ireland',
  },
  keywords: [
    'Smartwhip Ireland',
    'buy Smartwhip Ireland',
    'cream chargers Ireland',
    'FastGas Ireland',
    'N2O Ireland',
    'Smartwhip Dublin',
    'Smartwhip Cork',
    'Smartwhip Galway',
    'cream charger delivery Ireland',
    'Smartwhip delivery Ireland',
  ],
  openGraph: {
    title: 'Buy Smartwhip in Ireland | Fast Delivery | Order via WhatsApp or Telegram',
    description:
      'Order premium SmartWhip, FastGas and Cream Deluxe across Ireland. Fast delivery to Dublin, Cork, Galway, Limerick and all major cities.',
    images: ['/og_image/og_image.jpeg'],
  },
};

export default function IrelandLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
