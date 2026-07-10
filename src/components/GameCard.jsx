import { memo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useFavorites } from '../context/FavoritesContext';
import { useToast } from '../context/ToastContext';
import styles from './GameCard.module.css';

function GameCard({ game, index = 0 }) {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const { addToast } = useToast();
  const fav = isFavorite(game.id);

  const platforms = game.parent_platforms
    ?.map((p) => p.platform?.name)
    .filter(Boolean)
    .join(', ');

  const handleFav = () => {
    if (fav) {
      removeFavorite(game.id);
      addToast(`${game.name} eliminado de favoritos`, 'info');
    } else {
      addFavorite(game);
      addToast(`${game.name} agregado a favoritos`, 'success');
    }
  };

  return (
    <motion.article
      className={styles.card}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: (index % 20) * 0.04 }}
      whileHover={{ y: -6 }}
    >
      <Link to={`/game/${game.id}`} className={styles.link}>
        <div className={styles.imageWrapper}>
          <img
            className={styles.image}
            src={game.background_image || '/placeholder.svg'}
            alt={game.name}
            loading="lazy"
          />
        </div>
        <div className={styles.info}>
          <h3 className={styles.title}>{game.name}</h3>
          <p className={styles.meta}>
            {game.released && (
              <span className={styles.date}>{game.released}</span>
            )}
            {game.rating > 0 && (
              <span className={styles.rating}>★ {game.rating.toFixed(1)}</span>
            )}
          </p>
          {platforms && <p className={styles.platforms}>{platforms}</p>}
        </div>
      </Link>
      <button
        className={`${styles.favBtn} ${fav ? styles.favActive : ''}`}
        onClick={handleFav}
        aria-label={fav ? 'Eliminar de favoritos' : 'Agregar a favoritos'}
      >
        {fav ? '❤️' : '🤍'}
      </button>
    </motion.article>
  );
}

export default memo(GameCard);
