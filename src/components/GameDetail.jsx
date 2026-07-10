import { useState, useEffect, useRef } from 'react';
import { getGameDetails, getGameScreenshots } from '../api/rawgApi';
import { useFavorites } from '../context/FavoritesContext';
import { useUserActivity } from '../context/UserActivityContext';
import { useAchievements } from '../context/AchievementsContext';
import Spinner from './Spinner';
import ErrorMessage from './ErrorMessage';
import StarRating from './StarRating';
import ReviewForm from './ReviewForm';
import styles from './GameDetail.module.css';

export default function GameDetail({ gameId }) {
  const [game, setGame] = useState(null);
  const [screenshots, setScreenshots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const { rateGame, getRating, toggleCompleted, isCompleted, saveReview, getReview } = useUserActivity();
  const { trackVisit } = useAchievements();
  const tracked = useRef(false);

  useEffect(() => {
    let cancelled = false;

    Promise.all([getGameDetails(gameId), getGameScreenshots(gameId)])
      .then(([gameData, screenshotsData]) => {
        if (!cancelled) {
          setGame(gameData);
          setScreenshots(screenshotsData.results || []);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message || 'Error al cargar el juego');
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [gameId]);

  useEffect(() => {
    if (!tracked.current) {
      tracked.current = true;
      trackVisit();
    }
  }, [trackVisit]);

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!game) return <ErrorMessage message="No se encontró el juego." />;

  const fav = isFavorite(game.id);

  return (
    <div className={styles.detail}>
      <div className={styles.hero}>
        <img
          className={styles.heroImage}
          src={game.background_image || '/placeholder.svg'}
          alt={game.name}
        />
        <div className={styles.heroOverlay} />
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <h1 className={styles.title}>{game.name}</h1>
          <button
            className={`${styles.favBtn} ${fav ? styles.favActive : ''}`}
            onClick={() => (fav ? removeFavorite(game.id) : addFavorite(game))}
          >
            {fav ? '❤️ Eliminar de favoritos' : '🤍 Agregar a favoritos'}
          </button>
        </div>

        <div className={styles.meta}>
          {game.released && (
            <div className={styles.metaItem}>
              <span className={styles.label}>Lanzamiento</span>
              <span>{game.released}</span>
            </div>
          )}
          {game.rating > 0 && (
            <div className={styles.metaItem}>
              <span className={styles.label}>Rating</span>
              <span className={styles.rating}>★ {game.rating.toFixed(2)}</span>
            </div>
          )}
          {game.genres?.length > 0 && (
            <div className={styles.metaItem}>
              <span className={styles.label}>Géneros</span>
              <span>{game.genres.map((g) => g.name).join(', ')}</span>
            </div>
          )}
          {game.parent_platforms?.length > 0 && (
            <div className={styles.metaItem}>
              <span className={styles.label}>Plataformas</span>
              <span>
                {game.parent_platforms.map((p) => p.platform?.name).join(', ')}
              </span>
            </div>
          )}
          {game.developers?.length > 0 && (
            <div className={styles.metaItem}>
              <span className={styles.label}>Desarrolladores</span>
              <span>{game.developers.map((d) => d.name).join(', ')}</span>
            </div>
          )}
          {game.publishers?.length > 0 && (
            <div className={styles.metaItem}>
              <span className={styles.label}>Publishers</span>
              <span>{game.publishers.map((p) => p.name).join(', ')}</span>
            </div>
          )}
          {game.website && (
            <div className={styles.metaItem}>
              <span className={styles.label}>Sitio web</span>
              <a
                className={styles.link}
                href={game.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                {game.website}
              </a>
            </div>
          )}
        </div>

        <div className={styles.userSection}>
          <h2>Tu actividad</h2>
          <div className={styles.userActions}>
            <div className={styles.userItem}>
              <span className={styles.userLabel}>Tu puntuación</span>
              <StarRating value={getRating(game.id)} onChange={(s) => rateGame(game.id, s)} />
              {getRating(game.id) > 0 && (
                <span className={styles.userValue}>{getRating(game.id)}/5</span>
              )}
            </div>
            <div className={styles.userItem}>
              <button
                className={`${styles.completeBtn} ${isCompleted(game.id) ? styles.completed : ''}`}
                onClick={() => toggleCompleted(game.id)}
              >
                {isCompleted(game.id) ? '✅ Completado' : '⬜ Marcar como completado'}
              </button>
            </div>
          </div>
          <div className={styles.reviewSection}>
            <span className={styles.userLabel}>Tu reseña</span>
            <ReviewForm
              initialText={getReview(game.id)?.text || ''}
              onSave={(text) => saveReview(game.id, text)}
            />
            {getReview(game.id) && (
              <p className={styles.reviewDate}>
                {getReview(game.id).edited ? 'Editada' : 'Creada'}{' '}
                el {new Date(getReview(game.id).date).toLocaleDateString('es-CL')}
              </p>
            )}
          </div>
        </div>

        {game.description_raw && (
          <div className={styles.description}>
            <h2>Descripción</h2>
            <p>{game.description_raw}</p>
          </div>
        )}

        {screenshots.length > 0 && (
          <div className={styles.screenshots}>
            <h2>Capturas</h2>
            <div className={styles.screenshotGrid}>
              {screenshots.map((ss) => (
                <img
                  key={ss.id}
                  className={styles.screenshot}
                  src={ss.image}
                  alt={`Captura ${ss.id}`}
                  loading="lazy"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
