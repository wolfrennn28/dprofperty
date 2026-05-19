'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './Hero.module.css';

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/properti?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push('/properti');
    }
  };

  return (
    <section className={styles.hero} id="hero-section">
      <div className={styles.heroBg} />
      <div className={styles.heroPattern} />

      {/* Floating shapes */}
      <div className={`${styles.floatingShape} ${styles.shape1}`} />
      <div className={`${styles.floatingShape} ${styles.shape2}`} />
      <div className={`${styles.floatingShape} ${styles.shape3}`} />

      <div className={styles.heroContent}>
        <div className={styles.heroText}>
          <span className={styles.heroLabel}>🏡 Platform Jual Beli Tanah #1 di Indonesia</span>
          <h1 className={styles.heroTitle}>
            Temukan <span className={styles.heroHighlight}>Tanah Impian</span> Anda Bersama Kami
          </h1>
          <p className={styles.heroDesc}>
            D&apos;Profperty menyediakan listing tanah terlengkap dan terpercaya di seluruh
            Indonesia. Mulai dari kavling, sawah, perkebunan, hingga tanah komersial.
          </p>
        </div>

        <form className={styles.searchBox} onSubmit={handleSearch}>
          <div className={styles.searchInputWrapper}>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Cari berdasarkan lokasi, tipe tanah, atau kata kunci..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              id="hero-search-input"
            />
            <button type="submit" className={styles.searchBtn}>
              🔍 Cari Tanah
            </button>
          </div>
        </form>

        <div className={styles.quickFilters}>
          <Link href="/properti?type=kavling" className={styles.quickTag}>📐 Kavling</Link>
          <Link href="/properti?type=sawah" className={styles.quickTag}>🌾 Sawah</Link>
          <Link href="/properti?type=perkebunan" className={styles.quickTag}>🌳 Perkebunan</Link>
          <Link href="/properti?type=komersial" className={styles.quickTag}>🏢 Komersial</Link>
          <Link href="/properti?type=residensial" className={styles.quickTag}>🏡 Residensial</Link>
        </div>

        <div className={styles.heroStats}>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>500+</div>
            <div className={styles.statLabel}>Listing Tanah</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>50+</div>
            <div className={styles.statLabel}>Kota di Indonesia</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>1.200+</div>
            <div className={styles.statLabel}>Pembeli Puas</div>
          </div>
        </div>
      </div>
    </section>
  );
}
