'use client';

import { useState, useEffect } from 'react';
import type { PlaceResult } from '@/lib/postcode';

export function useUKPlacesSearch(query: string, delay = 350) {
  const [places, setPlaces] = useState<PlaceResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!query || query.trim().length < 2) {
      setPlaces([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://api.postcodes.io/places?q=${encodeURIComponent(query.trim())}&limit=8`
        );
        if (res.ok) {
          const data = await res.json();
          if (data.status === 200 && Array.isArray(data.result)) {
            setPlaces(data.result as PlaceResult[]);
          } else {
            setPlaces([]);
          }
        } else {
          setPlaces([]);
        }
      } catch {
        setPlaces([]);
      } finally {
        setIsLoading(false);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [query, delay]);

  return { places, isLoading };
}
