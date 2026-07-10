import styles from './SkeletonCard.module.css';

export default function SkeletonCard() {
  return (
    <div className={styles.card}>
      <div className={`${styles.skeleton} ${styles.image}`} />
      <div className={styles.body}>
        <div className={`${styles.skeleton} ${styles.title}`} />
        <div className={`${styles.skeleton} ${styles.meta}`} />
        <div className={`${styles.skeleton} ${styles.platforms}`} />
      </div>
    </div>
  );
}
