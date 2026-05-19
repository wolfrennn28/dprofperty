export interface Property {
  id: string;
  slug: string;
  title: string;
  description: string;
  price: number;
  area: number;
  location: {
    address: string;
    city: string;
    province: string;
    lat: number;
    lng: number;
  };
  type: 'sawah' | 'kavling' | 'perkebunan' | 'komersial' | 'residensial';
  certificate: 'SHM' | 'SHGB' | 'AJB' | 'Girik';
  images: string[];
  features: string[];
  seller: {
    name: string;
    phone: string;
    whatsapp: string;
    avatar: string;
  };
  createdAt: string;
  isFeatured: boolean;
  isVerified: boolean;
}

export const propertyTypes = [
  { value: 'sawah', label: 'Sawah', icon: '🌾' },
  { value: 'kavling', label: 'Kavling', icon: '📐' },
  { value: 'perkebunan', label: 'Perkebunan', icon: '🌳' },
  { value: 'komersial', label: 'Komersial', icon: '🏢' },
  { value: 'residensial', label: 'Residensial', icon: '🏡' },
];

export const provinces = [
  'Jawa Barat',
  'Jawa Tengah',
  'Jawa Timur',
  'Bali',
  'DI Yogyakarta',
  'Banten',
  'Sumatera Utara',
  'Sulawesi Selatan',
];

export const priceRanges = [
  { value: '0-500000000', label: 'Di bawah 500 Juta' },
  { value: '500000000-1000000000', label: '500 Juta - 1 Miliar' },
  { value: '1000000000-2000000000', label: '1 - 2 Miliar' },
  { value: '2000000000-5000000000', label: '2 - 5 Miliar' },
  { value: '5000000000-999999999999', label: 'Di atas 5 Miliar' },
];

export const areaRanges = [
  { value: '0-500', label: 'Di bawah 500 m²' },
  { value: '500-1000', label: '500 - 1.000 m²' },
  { value: '1000-5000', label: '1.000 - 5.000 m²' },
  { value: '5000-10000', label: '5.000 - 10.000 m²' },
  { value: '10000-999999', label: 'Di atas 10.000 m²' },
];

import type { Tables } from '@/lib/supabase/database.types';

// Helper: Map database row to Property interface
export function mapRowToProperty(row: Tables<'properties'>): Property {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    description: row.description,
    price: row.price,
    area: row.area,
    location: {
      address: row.location_address,
      city: row.location_city,
      province: row.location_province,
      lat: row.location_lat ?? 0,
      lng: row.location_lng ?? 0,
    },
    type: row.type as Property['type'],
    certificate: row.certificate as Property['certificate'],
    images: row.images ?? [],
    features: row.features ?? [],
    seller: {
      name: row.seller_name,
      phone: row.seller_phone,
      whatsapp: row.seller_whatsapp,
      avatar: row.seller_avatar ?? '',
    },
    createdAt: row.created_at ?? new Date().toISOString(),
    isFeatured: row.is_featured ?? false,
    isVerified: row.is_verified ?? false,
  };
}
