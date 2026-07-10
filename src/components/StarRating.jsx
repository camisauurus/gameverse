import styles from './StarRating.module.css';

export default function StarRating({ value, onChange, size = 'md' }) {
  return (
    <div className={`${styles.stars} ${styles[size]}`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={`${styles.star} ${star <= value ? styles.filled : ''}`}
          onClick={() => onChange(star === value ? 0 : star)}
          aria-label={`Puntuar ${star} de 5`}
        >
          ★
        </button>
      ))}
    </div>
  );
}
