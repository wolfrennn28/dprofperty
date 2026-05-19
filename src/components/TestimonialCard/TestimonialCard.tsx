import { Testimonial } from '@/data/testimonials';
import styles from './TestimonialCard.module.css';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className={styles.card}>
      <span className={styles.quote}>&ldquo;</span>
      <div className={styles.stars}>
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i}>{i < testimonial.rating ? '⭐' : '☆'}</span>
        ))}
      </div>
      <p className={styles.text}>{testimonial.text}</p>
      <div className={styles.author}>
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          className={styles.avatar}
          loading="lazy"
        />
        <div className={styles.authorInfo}>
          <span className={styles.name}>{testimonial.name}</span>
          <span className={styles.location}>📍 {testimonial.location}</span>
        </div>
      </div>
    </div>
  );
}
