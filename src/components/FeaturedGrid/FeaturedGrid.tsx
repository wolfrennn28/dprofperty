'use client';

import PropertyCard from '@/components/PropertyCard/PropertyCard';
import { useWishlist } from '@/hooks/useWishlist';
import type { Property } from '@/data/properties';

interface FeaturedGridProps {
  properties: Property[];
}

export default function FeaturedGrid({ properties }: FeaturedGridProps) {
  const { isWishlisted, toggleWishlist } = useWishlist();

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
      gap: '1.5rem',
    }}>
      {properties.map((property) => (
        <PropertyCard
          key={property.id}
          property={property}
          isWishlisted={isWishlisted(property.id)}
          onToggleWishlist={toggleWishlist}
        />
      ))}
    </div>
  );
}
