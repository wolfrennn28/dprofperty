'use client';

import { useState, useEffect, useCallback } from 'react';

export function useWishlist() {
  const [wishlist, setWishlist] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('dprofperty-wishlist');
    if (saved) {
      try {
        setWishlist(JSON.parse(saved));
      } catch {
        setWishlist([]);
      }
    }
  }, []);

  const toggleWishlist = useCallback((propertyId: string) => {
    setWishlist((prev) => {
      const updated = prev.includes(propertyId)
        ? prev.filter((id) => id !== propertyId)
        : [...prev, propertyId];
      localStorage.setItem('dprofperty-wishlist', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const isWishlisted = useCallback(
    (propertyId: string) => wishlist.includes(propertyId),
    [wishlist]
  );

  const clearWishlist = useCallback(() => {
    setWishlist([]);
    localStorage.removeItem('dprofperty-wishlist');
  }, []);

  return { wishlist, toggleWishlist, isWishlisted, clearWishlist };
}
