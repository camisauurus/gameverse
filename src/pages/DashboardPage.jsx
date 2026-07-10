import { useFavorites } from '../context/FavoritesContext';
import { useUserActivity } from '../context/UserActivityContext';
import { useAchievements } from '../context/AchievementsContext';
import ProgressBar from '../components/ProgressBar';
import styles from './DashboardPage.module.css';

export default function DashboardPage() {
  const { favorites } = useFavorites();
  const { ratingsCount, completedCount, reviewsCount } = useUserActivity();
  const { achievements, stats } = useAchievements();

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>📊 Dashboard</h1>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Estadísticas</h2>
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <span className={styles.statIcon}>❤️</span>
            <span className={styles.statValue}>{favorites.length}</span>
            <span className={styles.statLabel}>Favoritos</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statIcon}>⭐</span>
            <span className={styles.statValue}>{ratingsCount}</span>
            <span className={styles.statLabel}>Puntuaciones</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statIcon}>✅</span>
            <span className={styles.statValue}>{completedCount}</span>
            <span className={styles.statLabel}>Completados</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statIcon}>✍️</span>
            <span className={styles.statValue}>{reviewsCount}</span>
            <span className={styles.statLabel}>Reseñas</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statIcon}>🔍</span>
            <span className={styles.statValue}>{stats.visited}</span>
            <span className={styles.statLabel}>Visitados</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statIcon}>🏆</span>
            <span className={styles.statValue}>{achievements.filter((a) => a.unlocked).length}/{achievements.length}</span>
            <span className={styles.statLabel}>Logros</span>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Progreso</h2>
        <div className={styles.progressList}>
          <ProgressBar value={favorites.length} max={20} label="Favoritos" />
          <ProgressBar value={ratingsCount} max={10} label="Puntuaciones" color="#f59e0b" />
          <ProgressBar value={completedCount} max={10} label="Completados" color="#22c55e" />
          <ProgressBar value={reviewsCount} max={10} label="Reseñas" color="#60a5fa" />
          <ProgressBar value={stats.visited} max={25} label="Juegos vistos" color="#ec4899" />
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>🏆 Logros</h2>
        <div className={styles.achievements}>
          {achievements.map((a) => (
            <div
              key={a.id}
              className={`${styles.badge} ${a.unlocked ? styles.unlocked : styles.locked}`}
            >
              <span className={styles.badgeIcon}>{a.icon}</span>
              <div className={styles.badgeInfo}>
                <span className={styles.badgeTitle}>{a.title}</span>
                <span className={styles.badgeDesc}>{a.desc}</span>
              </div>
              {a.unlocked && <span className={styles.badgeCheck}>✅</span>}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
