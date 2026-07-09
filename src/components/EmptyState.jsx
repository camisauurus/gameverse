import styles from './EmptyState.module.css';

export default function EmptyState({ message = 'No se encontraron resultados.' }) {
  return (
    <div className={styles.empty}>
      <span className={styles.icon}>🎮</span>
      <p className={styles.message}>{message}</p>
    </div>
  );
}
