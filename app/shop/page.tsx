'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Zap, MapPin, ChevronRight, Truck, ShieldCheck, Clock, ArrowLeft, ChevronLeft, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import gbData from '@/data/gb.json';

const TOWNS_PER_PAGE = 24;

export default function ShopPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const towns = useMemo(() => {
    const allTowns = gbData.map(t => ({
      id: t.city.toLowerCase().replace(/\s+/g, '-'),
      name: t.city,
      admin: t.admin_name
    }));

    if (!searchQuery) return allTowns;

    return allTowns.filter(t => 
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      t.admin.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const totalPages = Math.ceil(towns.length / TOWNS_PER_PAGE);
  const displayedTowns = towns.slice((currentPage - 1) * TOWNS_PER_PAGE, currentPage * TOWNS_PER_PAGE);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white selection:bg-orange-100 selection:text-orange-900">
      <header className="border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
          <Link href="/" className="flex items-center group cursor-pointer">
            <div className="bg-orange-500 p-2 rounded-xl group-hover:rotate-12 transition-transform duration-300">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <span className="ml-3 text-2xl font-black text-gray-900 tracking-tighter uppercase italic">ApexWhips</span>
          </Link>
          
          <div className="flex items-center gap-6">
            <Link href="/" className="text-sm font-bold text-gray-500 hover:text-orange-500 transition-colors uppercase tracking-widest">Home</Link>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <section className="py-16 bg-gray-50/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
              <div className="flex-1">
                <h1 className="text-5xl font-black text-gray-900 tracking-tighter uppercase italic">All Locations</h1>
                <p className="text-gray-500 font-bold uppercase tracking-widest text-xs mt-2">Browse products across the UK</p>
                
                <div className="mt-8 max-w-md relative group">
                  <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                  </div>
                  <Input 
                    type="text" 
                    placeholder="Search by city or region..." 
                    className="w-full pl-14 h-14 bg-white border-2 border-gray-100 rounded-2xl font-bold text-gray-900 focus:border-orange-500 focus:ring-orange-500/20 transition-all placeholder:text-gray-400 placeholder:font-bold placeholder:uppercase placeholder:tracking-widest placeholder:text-[10px]"
                    value={searchQuery}
                    onChange={handleSearch}
                  />
                </div>
              </div>
              <div className="text-right hidden md:block">
                <span className="text-5xl font-black text-orange-500/10 tracking-tighter leading-none select-none">SHOP ALL</span>
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
                        View Products
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-16 flex justify-center items-center gap-4">
              <Button
                variant="outline"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                className="rounded-xl h-12 px-6 font-bold uppercase tracking-widest text-xs border-2"
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Prev
              </Button>
              <div className="flex items-center gap-2 px-4">
                <span className="text-sm font-black text-gray-900">Page {currentPage}</span>
                <span className="text-sm font-bold text-gray-400">of {totalPages}</span>
              </div>
              <Button
                variant="outline"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                className="rounded-xl h-12 px-6 font-bold uppercase tracking-widest text-xs border-2"
              >
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 py-12 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400 text-xs font-bold uppercase tracking-[0.3em]">© 2026 APEXWHIPS INTERNATIONAL</p>
        </div>
      </footer>
    </div>
  );
}
