import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerGrid}>
          <div className={styles.brand}>
            <div className={styles.brandLogo}>
              <span className={styles.brandLogoIcon}>🏡</span>
              D&apos;<span className={styles.brandAccent}>Profperty</span>
            </div>
            <p className={styles.brandDesc}>
              Platform jual beli tanah terpercaya di Indonesia. Temukan tanah impian Anda
              dengan mudah, aman, dan transparan bersama D&apos;Profperty.
            </p>
          </div>

          <div>
            <h4 className={styles.groupTitle}>Navigasi</h4>
            <div className={styles.linkList}>
              <Link href="/" className={styles.link}>Beranda</Link>
              <Link href="/properti" className={styles.link}>Properti</Link>
              <Link href="/tentang" className={styles.link}>Tentang Kami</Link>
              <Link href="/favorit" className={styles.link}>Favorit</Link>
            </div>
          </div>

          <div>
            <h4 className={styles.groupTitle}>Kategori</h4>
            <div className={styles.linkList}>
              <Link href="/properti?type=kavling" className={styles.link}>Kavling</Link>
              <Link href="/properti?type=sawah" className={styles.link}>Sawah</Link>
              <Link href="/properti?type=perkebunan" className={styles.link}>Perkebunan</Link>
              <Link href="/properti?type=komersial" className={styles.link}>Komersial</Link>
              <Link href="/properti?type=residensial" className={styles.link}>Residensial</Link>
            </div>
          </div>

          <div>
            <h4 className={styles.groupTitle}>Hubungi Kami</h4>
            <div className={styles.contactItem}>
              <span className={styles.contactIcon}>📍</span>
              <span>Jl. Sudirman No. 123, Jakarta Selatan, DKI Jakarta</span>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.contactIcon}>📞</span>
              <span>(021) 1234-5678</span>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.contactIcon}>✉️</span>
              <span>info@dprofperty.co.id</span>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} D&apos;Profperty. Semua hak dilindungi.
          </p>
          <div className={styles.socials}>
            <a href="#" className={styles.socialLink} aria-label="Facebook">📘</a>
            <a href="#" className={styles.socialLink} aria-label="Instagram">📸</a>
            <a href="#" className={styles.socialLink} aria-label="Twitter">🐦</a>
            <a href="#" className={styles.socialLink} aria-label="YouTube">🎬</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
