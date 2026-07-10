import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { getGames } from '../api/rawgApi';
import styles from './HeroSection.module.css';

export default function HeroSection() {
  const [featured, setFeatured] = useState([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);
  const intervalRef = useRef(null);

  useEffect(() => {
    let mounted = true;
    getGames({ page: 1, pageSize: 5, ordering: '-rating' })
      .then((data) => {
        if (mounted && data.results?.length) {
          setFeatured(data.results);
          setLoading(false);
        }
      })
      .catch(() => {
        if (mounted) setLoading(false);
      });
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    if (featured.length < 2) return;
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % featured.length);
    }, 5000);
    return () => clearInterval(intervalRef.current);
  }, [featured.length]);

  const game = featured[current];

  if (loading) {
    return <div className={styles.hero}><div className={styles.skeleton} /></div>;
  }
  if (!game) return null;

  return (
    <section className={styles.hero}>
      <div className={styles.bg}>
        <img
          className={styles.bgImage}
          src={game.background_image}
          alt=""
        />
        <div className={styles.bgOverlay} />
        <div className={styles.bgScanlines} />
      </div>

      {featured.length > 1 && (
        <>
          <button
            className={`${styles.arrow} ${styles.arrowLeft}`}
            onClick={() => setCurrent((prev) => (prev - 1 + featured.length) % featured.length)}
            aria-label="Anterior"
          >
            ◀
          </button>
          <button
            className={`${styles.arrow} ${styles.arrowRight}`}
            onClick={() => setCurrent((prev) => (prev + 1) % featured.length)}
            aria-label="Siguiente"
          >
            ▶
          </button>
        </>
      )}

      <div className={styles.content}>
        <div className={styles.badge}>🔥 Destacado</div>

        <h1 className={styles.title}>{game.name}</h1>

        <div className={styles.stats}>
          {game.rating > 0 && (
            <span className={styles.stat}>★ {game.rating.toFixed(1)}</span>
          )}
          {game.released && (
            <span className={styles.stat}>📅 {game.released}</span>
          )}
          {game.genres?.length > 0 && (
            <span className={styles.stat}>
              🎮 {game.genres.slice(0, 3).map((g) => g.name).join(', ')}
            </span>
          )}
        </div>

        <p className={styles.description}>
          {game.description_raw
            ? game.description_raw.slice(0, 180) + '...'
            : 'Explora este increíble título en GameVerse.'}
        </p>

        <div className={styles.actions}>
          <Link to={`/game/${game.id}`} className={styles.primaryBtn}>
            Ver detalles
          </Link>
          <Link to="/guess" className={styles.secondaryBtn}>
            🎯 Adivina el juego
          </Link>
        </div>

        {featured.length > 1 && (
          <div className={styles.dots}>
            {featured.map((_, i) => (
              <button
                key={i}
                className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
                onClick={() => setCurrent(i)}
                aria-label={`Ver ${featured[i]?.name}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
