'use client';

import { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Zap, MapPin, Search, ChevronRight, Truck, ShieldCheck, Clock } from 'lucide-react';
import Link from 'next/link';
import gbData from '@/data/gb.json';

const TOWNS_PER_PAGE = 12;

export default function HomePage() {
  const [visibleTowns, setVisibleTowns] = useState(TOWNS_PER_PAGE);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showRecommendations, setShowRecommendations] = useState(false);

  const towns = useMemo(() => {
    return gbData.map(t => ({
      id: t.city.toLowerCase().replace(/\s+/g, '-'),
      name: t.city,
      admin: t.admin_name
    }));
  }, []);

  const filteredTowns = useMemo(() => {
    return towns.filter(town => 
      town.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, towns]);

  const recommendations = useMemo(() => {
    if (!searchQuery) return [];
    return towns
      .filter(town => town.name.toLowerCase().startsWith(searchQuery.toLowerCase()))
      .slice(0, 5);
  }, [searchQuery, towns]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 200 >=
        document.documentElement.offsetHeight
      ) {
        if (visibleTowns < filteredTowns.length && !loading) {
          setLoading(true);
          setTimeout(() => {
            setVisibleTowns(prev => prev + TOWNS_PER_PAGE);
            setLoading(false);
          }, 400);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [visibleTowns, loading, filteredTowns.length]);

  const displayedTowns = filteredTowns.slice(0, visibleTowns);

  return (
    <div className="flex flex-col min-h-screen bg-white selection:bg-orange-100 selection:text-orange-900">
      <header className="border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
          <div className="flex items-center group cursor-pointer">
            <div className="bg-orange-500 p-2 rounded-xl group-hover:rotate-12 transition-transform duration-300">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <span className="ml-3 text-2xl font-black text-gray-900 tracking-tighter uppercase italic">ApexWhips</span>
          </div>
          
          <div className="hidden md:flex items-center gap-6">
            <Link href="/shop" className="text-sm font-bold text-gray-500 hover:text-orange-500 transition-colors uppercase tracking-widest">Shop All</Link>
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Current Pricing</span>
              <div className="flex items-center gap-3">
                <span className="text-sm font-black text-gray-900">£30 <span className="text-gray-400 font-medium">Single</span></span>
                <div className="w-1 h-1 rounded-full bg-gray-200" />
                <span className="text-sm font-black text-orange-500">£130 <span className="text-orange-400 font-medium italic">Case</span></span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <section className="relative pt-24 pb-20 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-40 pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-200 blur-[120px] rounded-full" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-blue-100 blur-[100px] rounded-full" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-gray-900 text-white px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-8 shadow-2xl shadow-orange-200">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                </span>
                UK-Wide Dispatch Active
              </div>
              <h1 className="text-6xl md:text-8xl font-black text-gray-900 tracking-tight leading-[0.9] mb-8">
                PREMIUM <br />
                <span className="text-orange-500 italic">SMARTWHIPS</span>
              </h1>
              <p className="text-xl text-gray-500 font-medium leading-relaxed mb-12">
                The industry standard for automotive smart integration. 
                Same-day delivery available across all major UK territories.
              </p>

              <div className="relative max-w-xl mx-auto group">
                <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                </div>
                <input 
                  type="text"
                  placeholder="Enter your town or city..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowRecommendations(true);
                  }}
                  onBlur={() => setTimeout(() => setShowRecommendations(false), 200)}
                  onFocus={() => setShowRecommendations(true)}
                  className="w-full bg-white border-2 border-gray-100 h-18 pl-16 pr-6 rounded-3xl text-lg font-semibold focus:outline-none focus:border-orange-500/30 focus:ring-4 focus:ring-orange-500/5 transition-all shadow-xl shadow-gray-100/50"
                />
                
                {showRecommendations && recommendations.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50">
                    {recommendations.map((rec) => (
                      <Link 
                        key={rec.id}
                        href={`/towns/${rec.id}`}
                        className="flex items-center gap-3 px-6 py-4 hover:bg-orange-50 transition-colors border-b border-gray-50 last:border-0"
                      >
                        <MapPin className="h-4 w-4 text-orange-500" />
                        <div>
                          <div className="font-bold text-gray-900">{rec.name}</div>
                          <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{rec.admin}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
              {[
                { icon: Truck, label: 'Fast Delivery', sub: 'Within 2 hours' },
                { icon: ShieldCheck, label: 'Secure Pay', sub: 'Encrypted apps' },
                { icon: Clock, label: '24/7 Support', sub: 'Live assistance' },
                { icon: Zap, label: 'High Grade', sub: 'Medical quality' },
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center md:items-start text-center md:text-left gap-3 px-4">
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

        <section className="py-24 bg-gray-50/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
              <div>
                <h2 className="text-4xl font-black text-gray-900 tracking-tighter uppercase italic">Local Supply</h2>
                <p className="text-gray-500 font-bold uppercase tracking-widest text-xs mt-2">Available Delivery Locations</p>
              </div>
              <div className="text-right">
                <span className="text-5xl font-black text-orange-500/10 tracking-tighter leading-none select-none">UK NETWORK</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {displayedTowns.map((town) => (
                <Link href={`/towns/${town.id}`} key={town.id} className="group">
                  <Card className="h-full overflow-hidden border-none shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 rounded-[2.5rem] bg-white relative">
                    <div className="aspect-[4/5] relative overflow-hidden">
                      <img 
                        src="/IMG_1867.jpeg" 
                        alt={town.name}
                        className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-gray-900/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                      
                      <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                        In Stock
                      </div>

                      <div className="absolute bottom-8 left-8 right-8 text-white">
                        <div className="flex items-center gap-2 text-orange-400 mb-2">
                          <MapPin className="h-4 w-4 fill-current" />
                          <span className="text-[10px] font-black uppercase tracking-[0.3em]">{town.admin}</span>
                        </div>
                        <h3 className="text-3xl font-black italic uppercase tracking-tighter leading-none mb-4">{town.name}</h3>
                      </div>
                    </div>

                    <CardContent className="p-8">
                      <div className="flex flex-col gap-1 mb-6">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Single Unit</span>
                          <span className="text-xl font-black text-gray-900">£30</span>
                        </div>
                        <div className="h-px bg-gray-100 my-2" />
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-black text-orange-400 uppercase tracking-widest">Case Pack</span>
                          <span className="text-xl font-black text-orange-500">£130</span>
                        </div>
                      </div>
                      <Button className="w-full bg-gray-900 hover:bg-orange-600 text-white rounded-2xl h-14 text-sm font-black uppercase tracking-widest transition-colors flex items-center justify-center gap-2">
                        Get Local Access
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
      </main>

      <footer className="bg-gray-900 py-24 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center group mb-8">
                <div className="bg-orange-500 p-2 rounded-xl">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <span className="ml-3 text-2xl font-black tracking-tighter uppercase italic">ApexWhips</span>
              </div>
              <p className="text-gray-400 font-medium max-w-sm">
                Leading the market in high-performance automotive smart tech. 
                Quality, speed, and discretion guaranteed.
              </p>
            </div>
            <div className="flex flex-col md:items-end gap-4 text-gray-400 text-xs font-bold uppercase tracking-[0.3em]">
              <p>© 2026 APEXWHIPS INTERNATIONAL</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
