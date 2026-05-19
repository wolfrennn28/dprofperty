export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatArea(area: number): string {
  if (area >= 10000) {
    const hectares = area / 10000;
    return `${hectares.toLocaleString('id-ID')} Hektar`;
  }
  return `${area.toLocaleString('id-ID')} m²`;
}

export function formatShortPrice(price: number): string {
  if (price >= 1000000000) {
    const b = price / 1000000000;
    return `${b % 1 === 0 ? b.toFixed(0) : b.toFixed(1)} Miliar`;
  }
  if (price >= 1000000) {
    const m = price / 1000000;
    return `${m % 1 === 0 ? m.toFixed(0) : m.toFixed(1)} Juta`;
  }
  return price.toLocaleString('id-ID');
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function getWhatsappLink(phone: string, message: string): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function getCertificateColor(cert: string): string {
  switch (cert) {
    case 'SHM':
      return 'var(--color-success)';
    case 'SHGB':
      return 'var(--color-info)';
    case 'AJB':
      return 'var(--color-warning)';
    case 'Girik':
      return 'var(--color-muted)';
    default:
      return 'var(--color-muted)';
  }
}

export function getTypeLabel(type: string): string {
  const types: Record<string, string> = {
    sawah: 'Sawah',
    kavling: 'Kavling',
    perkebunan: 'Perkebunan',
    komersial: 'Komersial',
    residensial: 'Residensial',
  };
  return types[type] || type;
}

export function getTypeIcon(type: string): string {
  const icons: Record<string, string> = {
    sawah: '🌾',
    kavling: '📐',
    perkebunan: '🌳',
    komersial: '🏢',
    residensial: '🏡',
  };
  return icons[type] || '📍';
}
