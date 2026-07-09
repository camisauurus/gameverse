import styles from './ErrorMessage.module.css';

export default function ErrorMessage({ message = 'Algo salió mal al cargar los datos.' }) {
  return (
    <div className={styles.error}>
      <span className={styles.icon}>⚠️</span>
      <p className={styles.message}>{message}</p>
      <p className={styles.hint}>Verifica tu conexión e intenta de nuevo.</p>
    </div>
  );
}
