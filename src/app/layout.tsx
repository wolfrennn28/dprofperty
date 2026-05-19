import type { Metadata } from 'next';
import { Inter, DM_Sans } from 'next/font/google';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dm-sans',
});

export const metadata: Metadata = {
  title: {
    default: "D'Profperty — Jual Beli Tanah Terpercaya di Indonesia",
    template: "%s | D'Profperty",
  },
  description:
    'Platform jual beli tanah terpercaya di Indonesia. Temukan kavling, sawah, perkebunan, dan tanah komersial dengan harga terbaik. Sertifikat lengkap & terverifikasi.',
  keywords: [
    'jual beli tanah',
    'tanah dijual',
    'kavling murah',
    'tanah sawah',
    'tanah perkebunan',
    'properti Indonesia',
    'investasi tanah',
  ],
  openGraph: {
    title: "D'Profperty — Jual Beli Tanah Terpercaya",
    description: 'Temukan tanah impian Anda di seluruh Indonesia',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${inter.variable} ${dmSans.variable}`}>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
