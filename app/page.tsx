'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, MapPin } from 'lucide-react';
import Link from 'next/link';
import townsData from '@/data/towns.json';

const TOWNS_PER_PAGE = 10;

export default function HomePage() {
  const [visibleTowns, setVisibleTowns] = useState(TOWNS_PER_PAGE);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 100 >=
        document.documentElement.offsetHeight
      ) {
        if (visibleTowns < townsData.length && !loading) {
          setLoading(true);
          setTimeout(() => {
            setVisibleTowns(prev => prev + TOWNS_PER_PAGE);
            setLoading(false);
          }, 500);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [visibleTowns, loading]);

  const displayedTowns = townsData.slice(0, visibleTowns);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Zap className="h-6 w-6 text-orange-500" />
            <span className="ml-2 text-xl font-bold text-gray-900 tracking-tight uppercase">ApexWhips</span>
          </div>
          <nav className="hidden md:flex space-x-8 items-center">
            <span className="text-sm font-bold text-orange-500 bg-orange-50 px-3 py-1 rounded-full uppercase tracking-wider">
              SmartWhips £30 | Case £130
            </span>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        <section className="py-20 bg-linear-to-b from-white to-gray-50 text-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight sm:text-6xl">
              SmartWhips <span className="text-orange-500">Across UK</span>
            </h1>
            <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto">
              Premium automotive smart tech. Delivered locally in every major town. 
              Single canisters for £30, Cases for £130.
            </p>
          </div>
        </section>

        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
              <MapPin className="h-6 w-6 text-orange-500 mr-2" />
              Select Your Town
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedTowns.map((town) => (
                <Card key={town.id} className="overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 rounded-2xl group border-b-4 border-b-orange-500">
                  <div className="aspect-square relative overflow-hidden bg-gray-100">
                    <img 
                      src="/IMG_1867.jpeg" 
                      alt={town.name}
                      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full font-bold text-xs uppercase tracking-widest shadow-lg">
                      Free Delivery
                    </div>
                  </div>
                  <CardHeader className="bg-white">
                    <CardTitle className="text-2xl font-black italic uppercase tracking-tighter text-gray-900 flex justify-between items-center">
                      {town.name}
                      <Zap className="h-5 w-5 text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-center text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">
                      <span>SmartWhip Pro</span>
                      <span className="text-orange-500 italic">£30 or £130 for a case</span>
                    </div>
                    <p className="text-gray-500 text-sm">
                      Immediate delivery available in {town.name}. Professional local service.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Link href={`/towns/${town.id}`} className="w-full">
                      <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-xl py-6 text-lg font-bold">
                        View Deals in {town.name}
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {loading && (
              <div className="mt-12 text-center">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-orange-500 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
                <p className="mt-2 text-gray-500 font-medium">Loading more towns...</p>
              </div>
            )}

            {!loading && visibleTowns >= townsData.length && (
              <div className="mt-12 text-center text-gray-400 font-medium italic">
                All major UK towns listed
              </div>
            )}
          </div>
        </section>
      </main>

      <footer className="bg-white border-t border-gray-200 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center items-center mb-4">
            <Zap className="h-5 w-5 text-orange-500" />
            <span className="ml-2 text-lg font-bold text-gray-900 uppercase tracking-tighter">ApexWhips</span>
          </div>
          <p className="text-gray-500">© 2026 ApexWhips.com. Premier UK SmartWhip Supplier.</p>
        </div>
      </footer>
    </div>
  );
}
