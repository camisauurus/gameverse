import FavoritesList from '../components/FavoritesList';
import styles from './FavoritesPage.module.css';

export default function FavoritesPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Mis Favoritos</h1>
      <FavoritesList />
    </div>
  );
}
