'use client';

import Link from 'next/link';
import { Property } from '@/data/properties';
import { formatRupiah, formatArea, getTypeLabel, getCertificateColor } from '@/utils/format';
import styles from './PropertyCard.module.css';

interface PropertyCardProps {
  property: Property;
  isWishlisted?: boolean;
  onToggleWishlist?: (id: string) => void;
}

export default function PropertyCard({ property, isWishlisted, onToggleWishlist }: PropertyCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img
          src={property.images[0]}
          alt={property.title}
          className={styles.image}
          loading="lazy"
        />
        <div className={styles.badges}>
          {property.isVerified && (
            <span className={styles.badgeVerified}>✓ Verified</span>
          )}
          {property.isFeatured && (
            <span className={styles.badgeFeatured}>⭐ Unggulan</span>
          )}
          <span className={styles.badgeType}>
            {getTypeLabel(property.type)}
          </span>
        </div>

        {onToggleWishlist && (
          <button
            className={`${styles.wishlistBtn} ${isWishlisted ? styles.active : ''}`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onToggleWishlist(property.id);
            }}
            aria-label={isWishlisted ? 'Hapus dari favorit' : 'Tambah ke favorit'}
          >
            {isWishlisted ? '❤️' : '🤍'}
          </button>
        )}

        <span
          className={styles.certBadge}
          style={{ background: getCertificateColor(property.certificate) }}
        >
          {property.certificate}
        </span>
      </div>

      <Link href={`/properti/${property.slug}`} className={styles.cardLink}>
        <div className={styles.body}>
          <div className={styles.price}>{formatRupiah(property.price)}</div>
          <h3 className={styles.title}>{property.title}</h3>
          <div className={styles.location}>
            <span className={styles.locationIcon}>📍</span>
            {property.location.city}, {property.location.province}
          </div>
          <div className={styles.meta}>
            <div className={styles.metaItem}>
              <span className={styles.metaIcon}>📏</span>
              <span className={styles.metaValue}>{formatArea(property.area)}</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaIcon}>📜</span>
              <span className={styles.metaValue}>{property.certificate}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
