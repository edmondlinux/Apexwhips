'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Home, ShoppingBag, X, Menu } from 'lucide-react';

const navItems = [
  { label: 'Home', icon: Home, href: '/', type: 'link' as const },
  { label: 'Ireland', emoji: '🇮🇪', href: '/ireland', type: 'link' as const },
  { label: 'Shop', icon: ShoppingBag, href: '/shop', type: 'link' as const },
];

export function FloatingBottomNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const whatsappUrl = process.env.NEXT_PUBLIC_WHATSAPP_URL;
  const telegramUrl = process.env.NEXT_PUBLIC_TELEGRAM_URL;

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Nav panel */}
      <div
        className={`fixed bottom-24 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
          open ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <div className="bg-white rounded-[2rem] shadow-2xl border border-gray-100 p-4 flex items-center gap-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`flex flex-col items-center gap-1.5 px-5 py-3 rounded-2xl transition-all ${
                  isActive
                    ? 'bg-orange-500 text-white'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-orange-500'
                }`}
              >
                {item.emoji ? (
                  <span className="text-xl leading-none">{item.emoji}</span>
                ) : (
                  item.icon && <item.icon className="h-5 w-5" />
                )}
                <span className="text-[10px] font-black uppercase tracking-widest">{item.label}</span>
              </Link>
            );
          })}

          {/* Divider */}
          <div className="w-px h-10 bg-gray-100 mx-1" />

          {/* WhatsApp */}
          {whatsappUrl && (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="flex flex-col items-center gap-1.5 px-5 py-3 rounded-2xl hover:bg-green-50 transition-all"
            >
              <Image src="/logo/whatsapplogo.png" alt="WhatsApp" width={20} height={20} className="w-5 h-5" />
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-600">
                WhatsApp
              </span>
            </a>
          )}

          {/* Telegram */}
          {telegramUrl && (
            <a
              href={telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="flex flex-col items-center gap-1.5 px-5 py-3 rounded-2xl hover:bg-blue-50 transition-all"
            >
              <Image src="/logo/telegramlogo.png" alt="Telegram" width={20} height={20} className="w-5 h-5" />
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-600">
                Telegram
              </span>
            </a>
          )}
        </div>
      </div>

      {/* Toggle pill button */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <button
          onClick={() => setOpen(!open)}
          className={`flex items-center gap-3 px-6 h-14 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 ${
            open
              ? 'bg-gray-900 text-white'
              : 'bg-gray-900 text-white'
          }`}
        >
          {open ? (
            <>
              <X className="h-5 w-5" />
              <span className="text-xs font-black uppercase tracking-widest">Close</span>
            </>
          ) : (
            <>
              <Menu className="h-5 w-5" />
              <span className="text-xs font-black uppercase tracking-widest">Menu</span>
              <span className="flex gap-1 ml-1">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                <span className="w-1.5 h-1.5 rounded-full bg-orange-300" />
              </span>
            </>
          )}
        </button>
      </div>
    </>
  );
}
