'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import PropertyCard from '@/components/PropertyCard/PropertyCard';
import { createClient } from '@/lib/supabase/client';
import { mapRowToProperty, type Property } from '@/data/properties';
import type { Tables } from '@/lib/supabase/database.types';
import { useWishlist } from '@/hooks/useWishlist';
import styles from './page.module.css';



export default function FavoritPage() {
  const { wishlist, isWishlisted, toggleWishlist, clearWishlist } = useWishlist();
  const supabase = createClient();
  const [favoritedProperties, setFavoritedProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFavorites() {
      if (wishlist.length === 0) {
        setFavoritedProperties([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .in('id', wishlist);

      if (error) {
        console.error('Error fetching favorited properties:', error);
        setFavoritedProperties([]);
      } else {
        setFavoritedProperties((data ?? []).map(mapRowToProperty));
      }
      setLoading(false);
    }
    loadFavorites();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wishlist]);

  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.header}>
          <div className={styles.breadcrumb}>
            <Link href="/">Beranda</Link>
            <span>/</span>
            <span>Favorit</span>
          </div>
          <div className={styles.headerRow}>
            <div>
              <h1 className={styles.pageTitle}>❤️ Properti Favorit</h1>
              <p className={styles.count}>
                {loading ? 'Memuat...' : `${favoritedProperties.length} properti tersimpan`}
              </p>
            </div>
            {favoritedProperties.length > 0 && (
              <button className={styles.clearBtn} onClick={clearWishlist}>
                🗑️ Hapus Semua
              </button>
            )}
          </div>
        </div>

        {favoritedProperties.length > 0 ? (
          <div className={styles.grid}>
            {favoritedProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                isWishlisted={isWishlisted(property.id)}
                onToggleWishlist={toggleWishlist}
              />
            ))}
          </div>
        ) : !loading ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>💝</div>
            <h2 className={styles.emptyTitle}>Belum Ada Favorit</h2>
            <p className={styles.emptyDesc}>
              Anda belum menyimpan properti apapun. Jelajahi listing kami dan klik ikon hati (♥)
              untuk menyimpan properti yang Anda sukai.
            </p>
            <Link href="/properti" className="btn btn-primary btn-lg">
              🔍 Jelajahi Properti
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
}
