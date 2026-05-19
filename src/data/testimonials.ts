// Shared Testimonial interface - safe to import from client components
export interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  text: string;
  location: string;
  propertyType: string;
}
