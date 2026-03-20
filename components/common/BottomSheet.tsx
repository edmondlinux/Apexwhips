'use client';

import { useState, useEffect, useMemo } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { BOTTOM_SHEET_SCROLL_THRESHOLD, BOTTOM_SHEET_RESULTS_LIMIT } from '@/constants';
import { searchTownsSuggestions } from '@/services/town.service';
import Link from 'next/link';

export function BottomSheet() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > BOTTOM_SHEET_SCROLL_THRESHOLD) {
        if (!hasScrolled) {
          setIsOpen(true);
          setHasScrolled(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasScrolled]);

  const filteredTowns = useMemo(
    () => searchTownsSuggestions(search, BOTTOM_SHEET_RESULTS_LIMIT),
    [search]
  );

  if (!isOpen && !hasScrolled) return null;

  return (
    <div
      className={cn(
        'fixed inset-x-0 bottom-0 z-50 transition-transform duration-300 ease-in-out transform',
        isOpen ? 'translate-y-0' : 'translate-y-full'
      )}
    >
      <div className="bg-white rounded-t-2xl shadow-[0_-8px_30px_rgb(0,0,0,0.12)] border-t border-gray-100 p-6 pb-8">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h2 className="text-lg font-bold text-gray-900 mb-1">Find Your Town</h2>
            <p className="text-sm text-gray-600">
              We noticed you&apos;ve been scrolling in search of your town. Quickly find it by
              searching its name below.
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full -mr-2"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Search className="h-4 w-4" />
          </div>
          <Input
            type="text"
            placeholder="Search for your town..."
            className="pl-10 h-12 rounded-xl border-gray-200 focus:ring-black"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
          />
        </div>

        {search && (
          <div className="mt-4 max-h-[40vh] overflow-y-auto divide-y divide-gray-50 bg-gray-50 rounded-xl">
            {filteredTowns.length > 0 ? (
              filteredTowns.map((town) => (
                <Link
                  key={town.id}
                  href={`/towns/${town.id}`}
                  className="flex items-center px-4 py-3 hover:bg-gray-100 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="text-sm font-medium text-gray-900">{town.name}</span>
                </Link>
              ))
            ) : (
              <div className="px-4 py-3 text-sm text-gray-500 text-center">
                No towns found matching &quot;{search}&quot;
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
