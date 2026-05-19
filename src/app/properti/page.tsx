'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import PropertyCard from '@/components/PropertyCard/PropertyCard';
import SearchFilter from '@/components/SearchFilter/SearchFilter';
import { useWishlist } from '@/hooks/useWishlist';
import { createClient } from '@/lib/supabase/client';
import { mapRowToProperty, type Property } from '@/data/properties';
import type { Tables } from '@/lib/supabase/database.types';
import styles from './page.module.css';
import filterStyles from '@/components/SearchFilter/SearchFilter.module.css';



function PropertyListContent() {
  const searchParams = useSearchParams();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const supabase = createClient();

  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [type, setType] = useState(searchParams.get('type') || '');
  const [province, setProvince] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [areaRange, setAreaRange] = useState('');
  const [sort, setSort] = useState('newest');
  const [verified, setVerified] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Fetch properties from Supabase
  useEffect(() => {
    async function loadProperties() {
      setLoading(true);
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching properties:', error);
        setProperties([]);
      } else {
        setProperties((data ?? []).map(mapRowToProperty));
      }
      setLoading(false);
    }
    loadProperties();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync URL params
  useEffect(() => {
    const urlSearch = searchParams.get('search');
    const urlType = searchParams.get('type');
    if (urlSearch) setSearch(urlSearch);
    if (urlType) setType(urlType);
  }, [searchParams]);

  const filtered = useMemo(() => {
    let result = [...properties];

    // Search
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.location.city.toLowerCase().includes(q) ||
          p.location.province.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    // Type
    if (type) {
      result = result.filter((p) => p.type === type);
    }

    // Province
    if (province) {
      result = result.filter((p) => p.location.province === province);
    }

    // Price range
    if (priceRange) {
      const [min, max] = priceRange.split('-').map(Number);
      result = result.filter((p) => p.price >= min && p.price <= max);
    }

    // Area range
    if (areaRange) {
      const [min, max] = areaRange.split('-').map(Number);
      result = result.filter((p) => p.area >= min && p.area <= max);
    }

    // Verified
    if (verified) {
      result = result.filter((p) => p.isVerified);
    }

    // Sort
    switch (sort) {
      case 'cheapest':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'expensive':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'largest':
        result.sort((a, b) => b.area - a.area);
        break;
      case 'smallest':
        result.sort((a, b) => a.area - b.area);
        break;
      default:
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    return result;
  }, [properties, search, type, province, priceRange, areaRange, sort, verified]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginatedItems = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleClear = () => {
    setSearch('');
    setType('');
    setProvince('');
    setPriceRange('');
    setAreaRange('');
    setVerified(false);
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <div className={styles.page}>
        <div className="container">
          <div className={styles.header}>
            <div className={styles.breadcrumb}>
              <Link href="/">Beranda</Link>
              <span>/</span>
              <span>Properti</span>
            </div>
            <h1 className={styles.pageTitle}>Cari Tanah Idealmu</h1>
            <p className={styles.pageDesc}>
              Jelajahi koleksi properti tanah terbaik di seluruh Indonesia
            </p>
          </div>
          <div className={filterStyles.emptyState}>
            <div className={filterStyles.emptyIcon}>⏳</div>
            <h3 className={filterStyles.emptyTitle}>Memuat properti...</h3>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.header}>
          <div className={styles.breadcrumb}>
            <Link href="/">Beranda</Link>
            <span>/</span>
            <span>Properti</span>
          </div>
          <h1 className={styles.pageTitle}>Cari Tanah Idealmu</h1>
          <p className={styles.pageDesc}>
            Jelajahi koleksi properti tanah terbaik di seluruh Indonesia
          </p>
        </div>

        <SearchFilter
          search={search}
          type={type}
          province={province}
          priceRange={priceRange}
          areaRange={areaRange}
          sort={sort}
          verified={verified}
          onSearchChange={(v) => { setSearch(v); setCurrentPage(1); }}
          onTypeChange={(v) => { setType(v); setCurrentPage(1); }}
          onProvinceChange={(v) => { setProvince(v); setCurrentPage(1); }}
          onPriceRangeChange={(v) => { setPriceRange(v); setCurrentPage(1); }}
          onAreaRangeChange={(v) => { setAreaRange(v); setCurrentPage(1); }}
          onSortChange={setSort}
          onVerifiedChange={(v) => { setVerified(v); setCurrentPage(1); }}
          onClear={handleClear}
          resultCount={filtered.length}
        />

        {paginatedItems.length > 0 ? (
          <>
            <div className={styles.propertyGrid}>
              {paginatedItems.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  isWishlisted={isWishlisted(property.id)}
                  onToggleWishlist={toggleWishlist}
                />
              ))}
            </div>

            {totalPages > 1 && (
              <div className={filterStyles.pagination}>
                <button
                  className={filterStyles.pageBtn}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  ‹
                </button>
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    className={`${filterStyles.pageBtn} ${currentPage === i + 1 ? filterStyles.active : ''}`}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  className={filterStyles.pageBtn}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  ›
                </button>
              </div>
            )}
          </>
        ) : (
          <div className={filterStyles.emptyState}>
            <div className={filterStyles.emptyIcon}>🔍</div>
            <h3 className={filterStyles.emptyTitle}>Tidak ada properti ditemukan</h3>
            <p className={filterStyles.emptyDesc}>
              Coba ubah filter pencarian Anda atau hapus beberapa filter
            </p>
            <button className="btn btn-primary" onClick={handleClear}>
              Reset Filter
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function PropertiPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', paddingTop: 'calc(var(--navbar-height) + 40px)' }}><div className="container"><p>Memuat...</p></div></div>}>
      <PropertyListContent />
    </Suspense>
  );
}
