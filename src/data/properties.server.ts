import 'server-only';

import { createClient } from '@/lib/supabase/server';
import { mapRowToProperty } from '@/data/properties';
import type { Property } from '@/data/properties';

export async function fetchFeaturedProperties(): Promise<Property[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .eq('is_featured', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching featured properties:', error);
    return [];
  }
  return (data ?? []).map(mapRowToProperty);
}

export async function fetchPropertyCountByType(type: string): Promise<number> {
  const supabase = await createClient();
  const { count, error } = await supabase
    .from('properties')
    .select('*', { count: 'exact', head: true })
    .eq('type', type);

  if (error) {
    console.error('Error counting properties:', error);
    return 0;
  }
  return count ?? 0;
}
