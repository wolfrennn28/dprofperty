'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import PropertyCard from '@/components/PropertyCard/PropertyCard';
import { createClient } from '@/lib/supabase/client';
import { mapRowToProperty, type Property } from '@/data/properties';
import type { Tables } from '@/lib/supabase/database.types';
import { useWishlist } from '@/hooks/useWishlist';
import styles from './page.module.css';



export default function VerifiedPage() {
  const { isWishlisted, toggleWishlist } = useWishlist();
  const supabase = createClient();
  const [verifiedProperties, setVerifiedProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadVerified() {
      setLoading(true);
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('is_verified', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching verified properties:', error);
        setVerifiedProperties([]);
      } else {
        setVerifiedProperties((data ?? []).map(mapRowToProperty));
      }
      setLoading(false);
    }
    loadVerified();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.page}>
      <div className="container">
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.breadcrumb}>
            <Link href="/">Beranda</Link>
            <span>/</span>
            <span>D&apos;Profperty Verified</span>
          </div>

          <div className={styles.heroBanner}>
            <div className={styles.heroIcon}>✓</div>
            <div className={styles.heroText}>
              <h1 className={styles.heroTitle}>D&apos;Profperty Verified</h1>
              <p className={styles.heroDesc}>
                Properti yang telah melalui proses verifikasi ketat oleh tim kami.
                Sertifikat, lokasi, dan data telah dikonfirmasi kebenarannya.
              </p>
            </div>
          </div>

          <div className={styles.trustGrid}>
            <div className={styles.trustItem}>
              <span className={styles.trustIcon}>📜</span>
              <div>
                <strong>Sertifikat Asli</strong>
                <p>Keaslian sertifikat telah diverifikasi</p>
              </div>
            </div>
            <div className={styles.trustItem}>
              <span className={styles.trustIcon}>📍</span>
              <div>
                <strong>Kunjungan Lokasi</strong>
                <p>Tim kami telah mengunjungi lokasi properti</p>
              </div>
            </div>
            <div className={styles.trustItem}>
              <span className={styles.trustIcon}>📊</span>
              <div>
                <strong>Data Valid</strong>
                <p>Luas, harga, dan spesifikasi telah divalidasi</p>
              </div>
            </div>
          </div>
        </div>

        {/* Property Grid */}
        <div className={styles.resultInfo}>
          {loading ? (
            'Memuat properti terverifikasi...'
          ) : (
            <>Menampilkan <strong>{verifiedProperties.length}</strong> properti terverifikasi</>
          )}
        </div>

        <div className={styles.propertyGrid}>
          {verifiedProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              isWishlisted={isWishlisted(property.id)}
              onToggleWishlist={toggleWishlist}
            />
          ))}
        </div>

        {/* CTA */}
        <div className={styles.cta}>
          <p>Ingin melihat semua properti termasuk yang belum terverifikasi?</p>
          <Link href="/properti" className="btn btn-outline btn-lg">
            Lihat Semua Properti →
          </Link>
        </div>
      </div>
    </div>
  );
}
