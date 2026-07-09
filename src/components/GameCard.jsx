import { memo } from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import styles from './GameCard.module.css';

function GameCard({ game }) {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const fav = isFavorite(game.id);

  const platforms = game.parent_platforms
    ?.map((p) => p.platform?.name)
    .filter(Boolean)
    .join(', ');

  return (
    <article className={styles.card}>
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
        onClick={() => (fav ? removeFavorite(game.id) : addFavorite(game))}
        aria-label={fav ? 'Eliminar de favoritos' : 'Agregar a favoritos'}
      >
        {fav ? '❤️' : '🤍'}
      </button>
    </article>
  );
}

export default memo(GameCard);
