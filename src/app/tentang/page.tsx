'use client';

import { useState } from 'react';
import styles from './page.module.css';

const faqs = [
  {
    q: 'Bagaimana cara membeli tanah melalui D\'Profperty?',
    a: 'Anda cukup mencari tanah yang sesuai, klik detail properti, dan hubungi penjual melalui WhatsApp atau telepon. Tim kami juga siap membantu Anda selama proses transaksi.',
  },
  {
    q: 'Apakah semua listing sudah terverifikasi?',
    a: 'Ya, kami memverifikasi setiap listing yang tayang di platform kami. Kami memastikan keaslian sertifikat, akurasi lokasi, dan kelengkapan informasi properti.',
  },
  {
    q: 'Apakah ada biaya untuk pembeli?',
    a: 'Tidak. D\'Profperty sepenuhnya gratis untuk pembeli. Anda bisa mencari, membandingkan, dan menghubungi penjual tanpa dikenakan biaya apapun.',
  },
  {
    q: 'Jenis sertifikat apa saja yang tersedia?',
    a: 'Kami menyediakan tanah dengan sertifikat SHM (Sertifikat Hak Milik), SHGB (Sertifikat Hak Guna Bangunan), AJB (Akta Jual Beli), dan Girik. Setiap sertifikat memiliki badge warna yang berbeda untuk memudahkan identifikasi.',
  },
  {
    q: 'Apakah bisa survei lokasi sebelum membeli?',
    a: 'Tentu! Kami sangat menganjurkan Anda untuk melakukan survei lokasi sebelum melakukan transaksi. Hubungi penjual untuk menjadwalkan kunjungan ke lokasi properti.',
  },
  {
    q: 'Apakah D\'Profperty tersedia di seluruh Indonesia?',
    a: 'Saat ini kami memiliki listing di lebih dari 50 kota di seluruh Indonesia, mencakup Jawa, Bali, Sumatera, Sulawesi, dan wilayah lainnya. Cakupan kami terus berkembang.',
  },
];

export default function TentangPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroPattern} />
        <div className={`container ${styles.heroContent}`}>
          <h1 className={styles.heroTitle}>Tentang D&apos;Profperty</h1>
          <p className={styles.heroDesc}>
            Platform jual beli tanah terpercaya yang menghubungkan pembeli dengan penjual tanah
            di seluruh Indonesia, dengan cara yang mudah, aman, dan transparan.
          </p>
        </div>
      </section>

      {/* About */}
      <section className={styles.about}>
        <div className="container">
          <div className={styles.aboutGrid}>
            <div className={styles.aboutImg}>
              <div className={styles.aboutImgPlaceholder}>
                🏡
              </div>
            </div>
            <div>
              <span className={styles.aboutLabel}>Siapa Kami</span>
              <h2 className={styles.aboutTitle}>Membantu Anda Menemukan Tanah Terbaik</h2>
              <p className={styles.aboutText}>
                D&apos;Profperty didirikan dengan satu tujuan: memudahkan masyarakat Indonesia
                dalam mencari dan membeli tanah. Kami memahami bahwa membeli tanah adalah keputusan
                besar, dan kami berkomitmen untuk menyediakan informasi yang akurat, transparan,
                dan terpercaya.
              </p>
              <p className={styles.aboutText}>
                Dengan pengalaman bertahun-tahun di industri properti, tim kami bekerja keras
                untuk memverifikasi setiap listing, memastikan keaslian sertifikat, dan memberikan
                pengalaman terbaik bagi pembeli maupun penjual tanah.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className={styles.vision}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">Visi & Misi</span>
            <h2 className="section-title">Apa yang Kami Perjuangkan</h2>
          </div>

          <div className={styles.visionGrid}>
            <div className={styles.visionCard}>
              <div className={styles.visionIcon}>🎯</div>
              <h3 className={styles.visionTitle}>Visi</h3>
              <p className={styles.visionDesc}>
                Menjadi platform jual beli tanah nomor satu di Indonesia yang dipercaya oleh
                jutaan masyarakat, dengan teknologi terdepan dan layanan terbaik.
              </p>
            </div>
            <div className={styles.visionCard}>
              <div className={styles.visionIcon}>🚀</div>
              <h3 className={styles.visionTitle}>Misi</h3>
              <p className={styles.visionDesc}>
                Menyediakan platform digital yang memudahkan pencarian tanah, menjamin transparansi
                informasi, dan mendampingi setiap transaksi dengan profesionalisme tinggi.
              </p>
            </div>
            <div className={styles.visionCard}>
              <div className={styles.visionIcon}>🔒</div>
              <h3 className={styles.visionTitle}>Keamanan</h3>
              <p className={styles.visionDesc}>
                Setiap listing diverifikasi oleh tim kami untuk memastikan keaslian dokumen
                dan legalitas properti, sehingga Anda bisa bertransaksi dengan tenang.
              </p>
            </div>
            <div className={styles.visionCard}>
              <div className={styles.visionIcon}>💡</div>
              <h3 className={styles.visionTitle}>Inovasi</h3>
              <p className={styles.visionDesc}>
                Kami terus berinovasi dengan teknologi terbaru untuk memberikan pengalaman
                pencarian yang lebih pintar, cepat, dan personal sesuai kebutuhan Anda.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={styles.faq}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">FAQ</span>
            <h2 className="section-title">Pertanyaan Umum</h2>
            <p className="section-desc">
              Temukan jawaban untuk pertanyaan yang sering ditanyakan
            </p>
          </div>

          <div className={styles.faqList}>
            {faqs.map((faq, i) => (
              <div key={i} className={styles.faqItem}>
                <button
                  className={styles.faqQuestion}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  {faq.q}
                  <span className={`${styles.faqArrow} ${openFaq === i ? styles.open : ''}`}>
                    ▼
                  </span>
                </button>
                {openFaq === i && (
                  <div className={styles.faqAnswer}>{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
