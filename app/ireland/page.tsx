'use client';

import { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Zap, MapPin, Search, ChevronRight, Truck, ShieldCheck, Clock, MessageCircle, Send } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Footer } from '@/components/layout/Footer';
import { getAllIrishCities } from '@/services/ireland.service';
import type { IrelandCity } from '@/services/ireland.service';

const IRELAND_PRICES = { single: '€35', case: '€150' } as const;
const CITIES_PER_PAGE = 12;

export default function IrelandPage() {
  const [visibleCount, setVisibleCount] = useState(CITIES_PER_PAGE);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [scrollRotation, setScrollRotation] = useState(0);

  const cities: IrelandCity[] = useMemo(() => getAllIrishCities(), []);

  const filteredCities = useMemo(
    () => cities.filter((c) => c.name.toLowerCase().includes(searchQuery.toLowerCase())),
    [searchQuery, cities]
  );

  const displayedCities = filteredCities.slice(0, visibleCount);

  useEffect(() => {
    let rafId: number;
    const handleScroll = () => {
      rafId = requestAnimationFrame(() => {
        setScrollRotation((window.scrollY / 5) % 360);
      });
      const nearBottom =
        window.innerHeight + document.documentElement.scrollTop + 200 >=
        document.documentElement.offsetHeight;
      if (nearBottom && visibleCount < filteredCities.length && !loading) {
        setLoading(true);
        setTimeout(() => {
          setVisibleCount((prev) => prev + CITIES_PER_PAGE);
          setLoading(false);
        }, 400);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [visibleCount, loading, filteredCities.length]);

  return (
    <div className="flex flex-col min-h-screen bg-white selection:bg-orange-100 selection:text-orange-900">

      {/* ── HEADER ── */}
      <header className="border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-orange-500" />
            <span className="text-xl font-black text-gray-900 uppercase tracking-tighter italic">
              ApexWhips
            </span>
          </Link>

          <div className="flex items-center gap-4 sm:gap-6">
            <Link
              href="/"
              className="hidden sm:block text-sm font-bold text-gray-500 hover:text-orange-500 transition-colors uppercase tracking-widest"
            >
              UK
            </Link>
            <Link
              href="/shop"
              className="hidden sm:block text-sm font-bold text-gray-500 hover:text-orange-500 transition-colors uppercase tracking-widest"
            >
              Shop All
            </Link>

            <button
              onClick={() => setShowSearch(!showSearch)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-orange-500"
            >
              <Search className="h-5 w-5" />
            </button>

            <div className="hidden sm:flex flex-col items-end">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                Ireland Pricing
              </span>
              <div className="flex items-center gap-3">
                <span className="text-sm font-black text-gray-900">
                  {IRELAND_PRICES.single}{' '}
                  <span className="text-gray-400 font-medium">Single</span>
                </span>
                <div className="w-1 h-1 rounded-full bg-gray-200" />
                <span className="text-sm font-black text-orange-500">
                  {IRELAND_PRICES.case}{' '}
                  <span className="text-orange-400 font-medium italic">Case</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Search dropdown */}
        {showSearch && (
          <div className="border-t border-gray-100 bg-white px-4 py-4">
            <div className="max-w-7xl mx-auto">
              <input
                autoFocus
                type="text"
                placeholder="Search Irish cities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onBlur={() => setTimeout(() => setShowSearch(false), 200)}
                className="w-full max-w-md bg-gray-50 border border-gray-100 h-12 px-5 rounded-2xl text-sm font-semibold focus:ring-2 focus:ring-orange-500/20 outline-none"
              />
            </div>
          </div>
        )}
      </header>

      <main className="flex-grow">

        {/* ── HERO ── */}
        <section className="relative pt-24 pb-20 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-40">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-200 blur-[120px] rounded-full" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-green-100 blur-[100px] rounded-full" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-gray-900 text-white px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-8 shadow-2xl shadow-orange-200">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500" />
                </span>
                🇮🇪 Ireland Dispatch Active
              </div>

              <h1 className="text-6xl md:text-8xl font-black text-gray-900 tracking-tight leading-[0.9] mb-8">
                <div className="flex justify-center mb-8">
                  <div
                    style={{
                      transform: `rotateY(${scrollRotation}deg) rotateX(${scrollRotation / 2}deg)`,
                      willChange: 'transform',
                    }}
                    className="transition-transform duration-75 ease-out"
                  >
                    <Image
                      src="/logo/logo.jpeg"
                      alt="ApexWhips Ireland — SmartWhip Supplier"
                      width={200}
                      height={200}
                      className="rounded-3xl shadow-2xl"
                      priority
                    />
                  </div>
                </div>
                SMARTWHIPS <br />
                <span className="text-orange-500 italic">IRELAND 🇮🇪</span>
              </h1>

              <p className="text-xl text-gray-500 font-medium leading-relaxed mb-12">
                Order premium SmartWhip cylinders and FastGas cream chargers for rapid delivery
                across Ireland. ApexWhips is Ireland&apos;s leading supplier of food-grade N2O cream
                chargers — local dispatch in under 30 minutes.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={process.env.NEXT_PUBLIC_WHATSAPP_URL || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-2xl px-8 h-14 text-sm font-black uppercase tracking-widest transition-all hover:scale-[1.02] shadow-xl shadow-green-100"
                >
                  <MessageCircle className="h-5 w-5" />
                  Order via WhatsApp
                </a>
                <a
                  href={process.env.NEXT_PUBLIC_TELEGRAM_URL || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 bg-[#0088cc] hover:bg-[#0077b5] text-white rounded-2xl px-8 h-14 text-sm font-black uppercase tracking-widest transition-all hover:scale-[1.02] shadow-xl shadow-blue-100"
                >
                  <Send className="h-5 w-5" />
                  Order via Telegram
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── FEATURE STRIP ── */}
        <section className="py-12 border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
              {[
                { icon: Truck, label: 'Fast Delivery', sub: 'Under 30 mins' },
                { icon: ShieldCheck, label: 'Food-Grade', sub: 'EU Certified' },
                { icon: Clock, label: '24/7 Ireland', sub: 'Live assistance' },
                { icon: Zap, label: 'Best Price', sub: 'From €35' },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center md:items-start text-center md:text-left gap-3 px-4"
                >
                  <item.icon className="h-6 w-6 text-orange-500" />
                  <div>
                    <div className="font-black text-sm uppercase tracking-tighter">{item.label}</div>
                    <div className="text-xs text-gray-400 font-bold uppercase tracking-widest">{item.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CITY GRID ── */}
        <section className="py-24 bg-gray-50/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
              <div>
                <h2 className="text-4xl font-black text-gray-900 tracking-tighter uppercase italic">
                  Ireland Delivery
                </h2>
                <p className="text-gray-500 font-bold uppercase tracking-widest text-xs mt-2">
                  Select Your City
                </p>
              </div>
              <div className="text-right">
                <span className="text-5xl font-black text-orange-500/10 tracking-tighter leading-none select-none">
                  IE NETWORK 🇮🇪
                </span>
              </div>
            </div>

            {/* Inline search if not in header */}
            <div className="mb-10">
              <div className="relative max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search Irish cities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-gray-100 h-12 pl-10 pr-4 rounded-2xl text-sm font-semibold shadow-sm focus:ring-2 focus:ring-orange-500/20 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {displayedCities.map((city) => (
                <Link
                  href={`/cream-chargers/smartwhip/${city.id}`}
                  key={city.id}
                  className="group"
                >
                  <Card className="h-full overflow-hidden border-none shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 rounded-[2.5rem] bg-white relative">
                    <div className="aspect-[4/5] relative overflow-hidden">
                      <Image
                        src="/IMG_1867.jpeg"
                        alt={city.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-gray-900/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                      <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                        In Stock
                      </div>

                      <div className="absolute top-6 left-6">
                        <span className="text-lg">🇮🇪</span>
                      </div>

                      <div className="absolute bottom-8 left-8 right-8 text-white">
                        <div className="flex items-center gap-2 text-orange-400 mb-2">
                          <MapPin className="h-4 w-4 fill-current" />
                          <span className="text-[10px] font-black uppercase tracking-[0.3em]">
                            {city.county}
                          </span>
                        </div>
                        <h3 className="text-3xl font-black italic uppercase tracking-tighter leading-none mb-4">
                          {city.name}
                        </h3>
                      </div>
                    </div>

                    <CardContent className="p-8">
                      <div className="flex flex-col gap-1 mb-6">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                            Single Canister
                          </span>
                          <span className="text-xl font-black text-gray-900">{IRELAND_PRICES.single}</span>
                        </div>
                        <div className="h-px bg-gray-100 my-2" />
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-black text-orange-400 uppercase tracking-widest">
                            Case Pack
                          </span>
                          <span className="text-xl font-black text-orange-500">{IRELAND_PRICES.case}</span>
                        </div>
                      </div>
                      <Button className="w-full bg-gray-900 hover:bg-orange-600 text-white rounded-2xl h-14 text-sm font-black uppercase tracking-widest transition-colors flex items-center justify-center gap-2">
                        Order Now
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            {loading && (
              <div className="mt-20 text-center">
                <div className="inline-flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-orange-500 animate-bounce" />
                  <div className="w-3 h-3 rounded-full bg-orange-500 animate-bounce [animation-delay:-.3s]" />
                  <div className="w-3 h-3 rounded-full bg-orange-500 animate-bounce [animation-delay:-.5s]" />
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gray-900 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500 blur-[150px] rounded-full opacity-20 -mr-48 -mt-48" />
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase italic mb-6">
                Order Smartwhip Anywhere in Ireland
              </h2>
              <p className="text-gray-400 font-medium max-w-xl mx-auto mb-10">
                WhatsApp or Telegram us your address and we will confirm your order and
                delivery time immediately. Available 24/7 across Ireland.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a
                  href={process.env.NEXT_PUBLIC_WHATSAPP_URL || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-2xl px-10 h-16 text-sm font-black uppercase tracking-widest transition-all hover:scale-[1.02]"
                >
                  <MessageCircle className="h-5 w-5" />
                  Order via WhatsApp
                </a>
                <a
                  href={process.env.NEXT_PUBLIC_TELEGRAM_URL || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 bg-[#0088cc] hover:bg-[#0077b5] text-white rounded-2xl px-10 h-16 text-sm font-black uppercase tracking-widest transition-all hover:scale-[1.02]"
                >
                  <Send className="h-5 w-5" />
                  Order via Telegram
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer variant="full" />
    </div>
  );
}
