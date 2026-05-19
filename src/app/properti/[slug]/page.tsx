'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { mapRowToProperty, type Property } from '@/data/properties';
import type { Tables } from '@/lib/supabase/database.types';
import { formatRupiah, formatArea, formatDate, getTypeLabel, getWhatsappLink, getCertificateColor } from '@/utils/format';
import PropertyCard from '@/components/PropertyCard/PropertyCard';
import { useWishlist } from '@/hooks/useWishlist';
import styles from './page.module.css';



export default function PropertyDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { isWishlisted, toggleWishlist } = useWishlist();
  const supabase = createClient();

  const [property, setProperty] = useState<Property | null>(null);
  const [related, setRelated] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    async function loadProperty() {
      setLoading(true);
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error || !data) {
        setProperty(null);
        setLoading(false);
        return;
      }

      const prop = mapRowToProperty(data);
      setProperty(prop);

      // Fetch related
      const { data: relatedData } = await supabase
        .from('properties')
        .select('*')
        .eq('type', prop.type)
        .neq('id', prop.id)
        .limit(3);

      setRelated((relatedData ?? []).map(mapRowToProperty));
      setLoading(false);
    }
    loadProperty();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  if (loading) {
    return (
      <div className={styles.page}>
        <div className="container">
          <div className={styles.notFound}>
            <div className={styles.notFoundIcon}>⏳</div>
            <h1 className={styles.notFoundTitle}>Memuat Properti...</h1>
          </div>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className={styles.page}>
        <div className="container">
          <div className={styles.notFound}>
            <div className={styles.notFoundIcon}>🏚️</div>
            <h1 className={styles.notFoundTitle}>Properti Tidak Ditemukan</h1>
            <p className={styles.notFoundDesc}>
              Maaf, properti yang Anda cari tidak ditemukan atau sudah tidak tersedia.
            </p>
            <Link href="/properti" className="btn btn-primary">
              ← Kembali ke Listing
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const pricePerMeter = Math.round(property.price / property.area);
  const waMessage = `Halo, saya tertarik dengan tanah "${property.title}" di ${property.location.city} (${formatRupiah(property.price)}). Apakah masih tersedia?`;

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = '';
  };

  const nextImage = () => setLightboxIndex((i) => (i + 1) % property.images.length);
  const prevImage = () => setLightboxIndex((i) => (i - 1 + property.images.length) % property.images.length);

  return (
    <div className={styles.page}>
      <div className="container">
        {/* Breadcrumb */}
        <div className={styles.breadcrumb}>
          <Link href="/">Beranda</Link>
          <span>/</span>
          <Link href="/properti">Properti</Link>
          <span>/</span>
          <span>{property.title}</span>
        </div>

        {/* Verified Banner */}
        {property.isVerified && (
          <div className={styles.verifiedBanner}>
            <div className={styles.verifiedBannerContent}>
              <span className={styles.verifiedBannerIcon}>✓</span>
              <div>
                <strong className={styles.verifiedBannerTitle}>D&apos;Profperty Verified</strong>
                <p className={styles.verifiedBannerDesc}>Properti ini telah diverifikasi oleh tim kami</p>
              </div>
            </div>
            <div className={styles.verifiedChecklist}>
              <span>📜 Sertifikat ✓</span>
              <span>📍 Lokasi ✓</span>
              <span>📊 Data ✓</span>
            </div>
          </div>
        )}

        {/* Gallery */}
        {property.images.length > 0 && (
          <div className={styles.gallery}>
            <div className={styles.galleryGrid}>
              <div className={styles.galleryMain} onClick={() => openLightbox(0)}>
                <img
                  src={property.images[0]}
                  alt={property.title}
                  className={styles.galleryMainImg}
                />
              </div>
              <div className={styles.gallerySide}>
                {property.images.slice(1, 3).map((img, i) => (
                  <div
                    key={i}
                    className={styles.gallerySideItem}
                    onClick={() => openLightbox(i + 1)}
                  >
                    <img src={img} alt={`${property.title} ${i + 2}`} className={styles.gallerySideImg} />
                    {i === 1 && property.images.length > 3 && (
                      <div className={styles.galleryMore}>
                        +{property.images.length - 3} Foto
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        <div className={styles.contentGrid}>
          {/* Main */}
          <div className={styles.mainContent}>
            <div className={styles.titleSection}>
              <div className={styles.badges}>
                {property.isFeatured && (
                  <span className="badge badge-accent">⭐ Unggulan</span>
                )}
                {property.isVerified && (
                  <span className={styles.badgeVerifiedInline}>✓ D&apos;Profperty Verified</span>
                )}
                <span className="badge badge-primary">{getTypeLabel(property.type)}</span>
                <span
                  className="badge"
                  style={{
                    background: getCertificateColor(property.certificate),
                    color: 'white',
                  }}
                >
                  {property.certificate}
                </span>
              </div>
              <h1 className={styles.propertyTitle}>{property.title}</h1>
              <div className={styles.location}>
                📍 {property.location.address}, {property.location.city}, {property.location.province}
              </div>
              <div className={styles.price}>
                {formatRupiah(property.price)}
                <span className={styles.pricePerMeter}>
                  {' '}· {formatRupiah(pricePerMeter)}/m²
                </span>
              </div>
            </div>

            {/* Specifications */}
            <div className={styles.infoCard}>
              <h2 className={styles.infoCardTitle}>📋 Spesifikasi</h2>
              <div className={styles.specsGrid}>
                <div className={styles.specItem}>
                  <span className={styles.specLabel}>Luas Tanah</span>
                  <span className={styles.specValue}>{formatArea(property.area)}</span>
                </div>
                <div className={styles.specItem}>
                  <span className={styles.specLabel}>Tipe Tanah</span>
                  <span className={styles.specValue}>{getTypeLabel(property.type)}</span>
                </div>
                <div className={styles.specItem}>
                  <span className={styles.specLabel}>Sertifikat</span>
                  <span className={styles.specValue}>{property.certificate}</span>
                </div>
                <div className={styles.specItem}>
                  <span className={styles.specLabel}>Harga/m²</span>
                  <span className={styles.specValue}>{formatRupiah(pricePerMeter)}</span>
                </div>
                <div className={styles.specItem}>
                  <span className={styles.specLabel}>Lokasi</span>
                  <span className={styles.specValue}>{property.location.city}</span>
                </div>
                <div className={styles.specItem}>
                  <span className={styles.specLabel}>Dipublikasi</span>
                  <span className={styles.specValue}>{formatDate(property.createdAt)}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className={styles.infoCard}>
              <h2 className={styles.infoCardTitle}>📝 Deskripsi</h2>
              <p className={styles.description}>{property.description}</p>
            </div>

            {/* Features */}
            {property.features.length > 0 && (
              <div className={styles.infoCard}>
                <h2 className={styles.infoCardTitle}>✨ Fasilitas & Keunggulan</h2>
                <div className={styles.featuresGrid}>
                  {property.features.map((feature, i) => (
                    <div key={i} className={styles.featureItem}>
                      <span className={styles.featureIcon}>✅</span>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Map */}
            {(property.location.lat !== 0 || property.location.lng !== 0) && (
              <div className={styles.infoCard}>
                <h2 className={styles.infoCardTitle}>🗺️ Lokasi di Peta</h2>
                <div className={styles.mapWrapper}>
                  <iframe
                    src={`https://maps.google.com/maps?q=${property.location.lat},${property.location.lng}&z=14&output=embed`}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`Peta lokasi ${property.title}`}
                  ></iframe>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className={styles.sidebar}>
            <div className={styles.sellerCard}>
              <div className={styles.sellerHeader}>
                {property.seller.avatar ? (
                  <img
                    src={property.seller.avatar}
                    alt={property.seller.name}
                    className={styles.sellerAvatar}
                  />
                ) : (
                  <div className={styles.sellerAvatar} style={{ background: 'var(--color-primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
                    👤
                  </div>
                )}
                <div>
                  <div className={styles.sellerName}>
                  {property.seller.name}
                  {property.isVerified && (
                    <span className={styles.sellerVerified}>✓</span>
                  )}
                </div>
                <div className={styles.sellerLabel}>
                  {property.isVerified ? 'Penjual Terverifikasi' : 'Penjual'}
                </div>
                </div>
              </div>
              <div className={styles.sellerActions}>
                <a
                  href={getWhatsappLink(property.seller.whatsapp, waMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp"
                  style={{ width: '100%' }}
                >
                  💬 Hubungi via WhatsApp
                </a>
                <a
                  href={`tel:${property.seller.phone}`}
                  className="btn btn-outline"
                  style={{ width: '100%' }}
                >
                  📞 Telepon Penjual
                </a>
                <button
                  className={`btn ${isWishlisted(property.id) ? 'btn-primary' : 'btn-outline'}`}
                  onClick={() => toggleWishlist(property.id)}
                  style={{ width: '100%' }}
                >
                  {isWishlisted(property.id) ? '❤️ Tersimpan di Favorit' : '🤍 Simpan ke Favorit'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className={styles.related}>
            <div className="section-header">
              <span className="section-label">Rekomendasi</span>
              <h2 className="section-title">Properti Serupa</h2>
            </div>
            <div className={styles.relatedGrid}>
              {related.map((p) => (
                <PropertyCard
                  key={p.id}
                  property={p}
                  isWishlisted={isWishlisted(p.id)}
                  onToggleWishlist={toggleWishlist}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxOpen && property.images.length > 0 && (
        <div className={styles.lightbox} onClick={closeLightbox}>
          <button className={styles.lightboxClose} onClick={closeLightbox}>✕</button>
          <button
            className={`${styles.lightboxNav} ${styles.lightboxPrev}`}
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
          >
            ‹
          </button>
          <img
            src={property.images[lightboxIndex]}
            alt={`${property.title} ${lightboxIndex + 1}`}
            className={styles.lightboxImg}
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className={`${styles.lightboxNav} ${styles.lightboxNext}`}
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}
