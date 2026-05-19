'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useWishlist } from '@/hooks/useWishlist';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { wishlist } = useWishlist();

  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const navClass = `${styles.navbar} ${(scrolled || !isHome) ? styles.scrolled : ''}`;

  const links = [
    { href: '/', label: 'Beranda' },
    { href: '/properti', label: 'Properti' },
    { href: '/verified', label: '✓ Verified' },
    { href: '/tentang', label: 'Tentang' },
  ];

  return (
    <>
      <nav className={navClass} id="main-navbar">
        <div className={styles.navbarInner}>
          <Link href="/" className={styles.logo}>
            <span className={styles.logoIcon}>🏡</span>
            D&apos;<span className={styles.logoAccent}>Profperty</span>
          </Link>

          <div className={styles.navLinks}>
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.navLink} ${pathname === link.href ? styles.active : ''}`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/favorit"
              className={`${styles.navLink} ${styles.wishlistLink} ${pathname === '/favorit' ? styles.active : ''}`}
            >
              ♥ Favorit
              {wishlist.length > 0 && (
                <span className={styles.wishlistCount}>{wishlist.length}</span>
              )}
            </Link>
          </div>

          <button
            className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      <div className={`${styles.mobileMenu} ${menuOpen ? styles.open : ''}`}>
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={styles.mobileLink}
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="/favorit"
          className={styles.mobileLink}
          onClick={() => setMenuOpen(false)}
        >
          ♥ Favorit {wishlist.length > 0 && `(${wishlist.length})`}
        </Link>
      </div>
    </>
  );
}
