import styles from './ProgressBar.module.css';

export default function ProgressBar({ value, max, label, color = 'var(--accent)' }) {
  const pct = max > 0 ? Math.min((value / max) * 100, 100) : 0;

  return (
    <div className={styles.wrapper}>
      {label && <span className={styles.label}>{label}</span>}
      <div className={styles.bar}>
        <div
          className={styles.fill}
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
      <span className={styles.count}>{value}/{max}</span>
    </div>
  );
}
