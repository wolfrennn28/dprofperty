'use client';

import { provinces, priceRanges, areaRanges, propertyTypes } from '@/data/properties';
import styles from './SearchFilter.module.css';

interface SearchFilterProps {
  search: string;
  type: string;
  province: string;
  priceRange: string;
  areaRange: string;
  sort: string;
  verified: boolean;
  onSearchChange: (value: string) => void;
  onTypeChange: (value: string) => void;
  onProvinceChange: (value: string) => void;
  onPriceRangeChange: (value: string) => void;
  onAreaRangeChange: (value: string) => void;
  onSortChange: (value: string) => void;
  onVerifiedChange: (value: boolean) => void;
  onClear: () => void;
  resultCount: number;
}

export default function SearchFilter({
  search,
  type,
  province,
  priceRange,
  areaRange,
  sort,
  verified,
  onSearchChange,
  onTypeChange,
  onProvinceChange,
  onPriceRangeChange,
  onAreaRangeChange,
  onSortChange,
  onVerifiedChange,
  onClear,
  resultCount,
}: SearchFilterProps) {
  const hasFilters = search || type || province || priceRange || areaRange || verified;

  return (
    <div>
      <div className={styles.filterSection}>
        <div className={styles.filterHeader}>
          <h3 className={styles.filterTitle}>🔍 Filter Pencarian</h3>
          {hasFilters && (
            <button className={styles.clearBtn} onClick={onClear}>
              ✕ Reset Filter
            </button>
          )}
        </div>

        <div className={styles.filterGrid}>
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Kata Kunci</label>
            <input
              type="text"
              className={styles.filterInput}
              placeholder="Cari lokasi, judul..."
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              id="filter-search"
            />
          </div>

          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Tipe Tanah</label>
            <select
              className={styles.filterSelect}
              value={type}
              onChange={(e) => onTypeChange(e.target.value)}
              id="filter-type"
            >
              <option value="">Semua Tipe</option>
              {propertyTypes.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.icon} {t.label}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Provinsi</label>
            <select
              className={styles.filterSelect}
              value={province}
              onChange={(e) => onProvinceChange(e.target.value)}
              id="filter-province"
            >
              <option value="">Semua Provinsi</option>
              {provinces.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Harga</label>
            <select
              className={styles.filterSelect}
              value={priceRange}
              onChange={(e) => onPriceRangeChange(e.target.value)}
              id="filter-price"
            >
              <option value="">Semua Harga</option>
              {priceRanges.map((r) => (
                <option key={r.value} value={r.value}>{r.label}</option>
              ))}
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Luas</label>
            <select
              className={styles.filterSelect}
              value={areaRange}
              onChange={(e) => onAreaRangeChange(e.target.value)}
              id="filter-area"
            >
              <option value="">Semua Luas</option>
              {areaRanges.map((r) => (
                <option key={r.value} value={r.value}>{r.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.verifiedToggle}>
          <label className={styles.toggleLabel}>
            <input
              type="checkbox"
              checked={verified}
              onChange={(e) => onVerifiedChange(e.target.checked)}
              className={styles.toggleInput}
            />
            <span className={styles.toggleSwitch}></span>
            <span className={styles.toggleText}>✓ Hanya D&apos;Profperty Verified</span>
          </label>
        </div>
      </div>

      {/* Active filter chips */}
      {hasFilters && (
        <div className={styles.activeFilters}>
          {search && (
            <span className={styles.filterChip}>
              🔍 &quot;{search}&quot;
              <button className={styles.filterChipRemove} onClick={() => onSearchChange('')}>×</button>
            </span>
          )}
          {type && (
            <span className={styles.filterChip}>
              {propertyTypes.find(t => t.value === type)?.icon} {propertyTypes.find(t => t.value === type)?.label}
              <button className={styles.filterChipRemove} onClick={() => onTypeChange('')}>×</button>
            </span>
          )}
          {province && (
            <span className={styles.filterChip}>
              📍 {province}
              <button className={styles.filterChipRemove} onClick={() => onProvinceChange('')}>×</button>
            </span>
          )}
          {priceRange && (
            <span className={styles.filterChip}>
              💰 {priceRanges.find(r => r.value === priceRange)?.label}
              <button className={styles.filterChipRemove} onClick={() => onPriceRangeChange('')}>×</button>
            </span>
          )}
          {areaRange && (
            <span className={styles.filterChip}>
              📏 {areaRanges.find(r => r.value === areaRange)?.label}
              <button className={styles.filterChipRemove} onClick={() => onAreaRangeChange('')}>×</button>
            </span>
          )}
          {verified && (
            <span className={styles.filterChip}>
              ✓ D&apos;Profperty Verified
              <button className={styles.filterChipRemove} onClick={() => onVerifiedChange(false)}>×</button>
            </span>
          )}
        </div>
      )}

      {/* Sort bar */}
      <div className={styles.sortBar}>
        <p className={styles.resultCount}>
          Menampilkan <span className={styles.resultCountBold}>{resultCount}</span> properti
        </p>
        <select
          className={styles.sortSelect}
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
          id="sort-select"
        >
          <option value="newest">Terbaru</option>
          <option value="cheapest">Termurah</option>
          <option value="expensive">Termahal</option>
          <option value="largest">Terluas</option>
          <option value="smallest">Terkecil</option>
        </select>
      </div>
    </div>
  );
}
