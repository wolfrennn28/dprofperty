import 'server-only';

import { createClient } from '@/lib/supabase/server';
import type { Testimonial } from '@/data/testimonials';

export async function fetchTestimonials(): Promise<Testimonial[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }

  return (data ?? []).map((row) => ({
    id: row.id,
    name: row.name,
    avatar: row.avatar ?? '',
    rating: row.rating,
    text: row.text,
    location: row.location,
    propertyType: row.property_type,
  }));
}
