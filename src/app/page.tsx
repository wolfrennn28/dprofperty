import Link from 'next/link';
import Hero from '@/components/Hero/Hero';
import TestimonialCard from '@/components/TestimonialCard/TestimonialCard';
import { propertyTypes } from '@/data/properties';
import { fetchFeaturedProperties, fetchPropertyCountByType } from '@/data/properties.server';
import { fetchTestimonials } from '@/data/testimonials.server';
import FeaturedGrid from '@/components/FeaturedGrid/FeaturedGrid';
import styles from './page.module.css';

// Revalidate setiap 30 detik — perubahan dari admin tampil dalam max 30 detik
export const revalidate = 30;

export default async function HomePage() {
  const [featured, testimonials, typeCounts] = await Promise.all([
    fetchFeaturedProperties(),
    fetchTestimonials(),
    Promise.all(
      propertyTypes.map(async (t) => ({
        ...t,
        count: await fetchPropertyCountByType(t.value),
      }))
    ),
  ]);

  return (
    <div className={styles.page}>
      {/* Hero */}
      <Hero />

      {/* Featured Listings */}
      <section className={styles.featured}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">Pilihan Terbaik</span>
            <h2 className="section-title">Listing Tanah Unggulan</h2>
            <p className="section-desc">
              Properti tanah terpilih dengan lokasi strategis dan harga terbaik untuk investasi Anda
            </p>
          </div>

          {featured.length > 0 ? (
            <FeaturedGrid properties={featured} />
          ) : (
            <div className={styles.emptyState}>
              <div className={styles.emptyStateIcon}>🏗️</div>
              <h3 className={styles.emptyStateTitle}>Segera Hadir</h3>
              <p>Listing tanah unggulan akan segera tersedia. Nantikan!</p>
            </div>
          )}

          <div className={styles.viewAll}>
            <Link href="/properti" className="btn btn-outline btn-lg">
              Lihat Semua Properti →
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className={styles.categories}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">Kategori</span>
            <h2 className="section-title">Jenis Tanah Tersedia</h2>
            <p className="section-desc">
              Berbagai jenis tanah siap untuk investasi, hunian, atau pengembangan bisnis Anda
            </p>
          </div>

          <div className={styles.catGrid}>
            {typeCounts.map((cat) => (
              <Link
                key={cat.value}
                href={`/properti?type=${cat.value}`}
                className={styles.catCard}
              >
                <span className={styles.catIcon}>{cat.icon}</span>
                <div className={styles.catName}>{cat.label}</div>
                <div className={styles.catCount}>{cat.count} listing</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why D'Profperty */}
      <section className={styles.whyUs}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">Keunggulan</span>
            <h2 className="section-title">Mengapa D&apos;Profperty?</h2>
            <p className="section-desc">
              Platform terpercaya untuk menemukan tanah impian Anda
            </p>
          </div>

          <div className={styles.whyGrid}>
            <div className={styles.whyCard}>
              <div className={styles.whyIcon}>✓</div>
              <h3 className={styles.whyTitle}>D&apos;Profperty Verified</h3>
              <p className={styles.whyDesc}>
                Setiap listing Verified telah melalui pengecekan sertifikat, kunjungan lokasi, dan validasi data oleh tim kami
              </p>
            </div>
            <div className={styles.whyCard}>
              <div className={styles.whyIcon}>📍</div>
              <h3 className={styles.whyTitle}>Lokasi Akurat</h3>
              <p className={styles.whyDesc}>
                Titik lokasi tepat dengan peta interaktif untuk memudahkan survei
              </p>
            </div>
            <div className={styles.whyCard}>
              <div className={styles.whyIcon}>💰</div>
              <h3 className={styles.whyTitle}>Harga Transparan</h3>
              <p className={styles.whyDesc}>
                Tidak ada biaya tersembunyi, harga yang ditampilkan adalah harga sebenarnya
              </p>
            </div>
            <div className={styles.whyCard}>
              <div className={styles.whyIcon}>🤝</div>
              <h3 className={styles.whyTitle}>Pendampingan Penuh</h3>
              <p className={styles.whyDesc}>
                Tim kami siap membantu Anda dari proses pencarian hingga transaksi selesai
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className={styles.testimonials}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">Testimoni</span>
            <h2 className="section-title">Kata Mereka</h2>
            <p className="section-desc">
              Ribuan pembeli puas telah menemukan tanah impian mereka melalui D&apos;Profperty
            </p>
          </div>

          {testimonials.length > 0 ? (
            <div className={styles.testimonialGrid}>
              {testimonials.slice(0, 3).map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <div className={styles.emptyStateIcon}>💬</div>
              <h3 className={styles.emptyStateTitle}>Belum Ada Testimoni</h3>
              <p>Testimoni dari pembeli akan ditampilkan di sini.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className={styles.cta}>
        <div className={styles.ctaPattern} />
        <div className="container">
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Siap Menemukan Tanah Impian Anda?</h2>
            <p className={styles.ctaDesc}>
              Jelajahi ratusan listing tanah terbaik di seluruh Indonesia.
              Mulai pencarian Anda sekarang dan wujudkan investasi impian!
            </p>
            <div className={styles.ctaBtns}>
              <Link href="/properti" className="btn btn-white btn-lg">
                🔍 Jelajahi Properti
              </Link>
              <a
                href="https://wa.me/6281234567890?text=Halo%20D%27Profperty%2C%20saya%20tertarik%20untuk%20membeli%20tanah"
                className="btn btn-whatsapp btn-lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                💬 Hubungi Kami
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
