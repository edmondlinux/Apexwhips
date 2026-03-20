'use client';

import Image from 'next/image';
import Link from 'next/link';

export function FloatingActionButtons() {
  const whatsappUrl = process.env.NEXT_PUBLIC_WHATSAPP_URL;
  const telegramUrl = process.env.NEXT_PUBLIC_TELEGRAM_URL;

  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-50">
      {whatsappUrl && (
        <Link
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200"
        >
          <Image
            src="/logo/whatsapplogo.png"
            alt="WhatsApp"
            width={32}
            height={32}
            className="w-8 h-8"
          />
        </Link>
      )}
      {telegramUrl && (
        <Link
          href={telegramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 rounded-full bg-[#0088cc] flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200"
        >
          <Image
            src="/logo/telegramlogo.png"
            alt="Telegram"
            width={32}
            height={32}
            className="w-8 h-8"
          />
        </Link>
      )}
    </div>
  );
}
