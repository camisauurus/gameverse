import { useState, useEffect, useRef } from 'react';
import { getGames } from '../api/rawgApi';
import styles from './GuessGame.module.css';

const TOTAL_TIME = 10;
const INITIAL_BLUR = 20;

export default function GuessGame() {
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [answer, setAnswer] = useState('');
  const [result, setResult] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [revealed, setRevealed] = useState(false);
  const timerRef = useRef(null);
  const mountedRef = useRef(true);

  const fetchRandomGame = async () => {
    setLoading(true);
    setResult(null);
    setAnswer('');
    setRevealed(false);
    setTimeLeft(TOTAL_TIME);
    let attempts = 0;
    while (attempts < 5) {
      try {
        const randomPage = Math.floor(Math.random() * 100) + 1;
        const data = await getGames({ page: randomPage, pageSize: 40 });
        if (!mountedRef.current) return;
        const gamesWithImage = data.results.filter((g) => g.background_image);
        if (gamesWithImage.length > 0) {
          const picked = gamesWithImage[Math.floor(Math.random() * gamesWithImage.length)];
          setGame(picked);
          setLoading(false);
          return;
        }
      } catch {
        // reintentar
      }
      attempts++;
    }
    if (mountedRef.current) setLoading(false);
  };

  useEffect(() => {
    mountedRef.current = true;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchRandomGame();
    return () => { mountedRef.current = false; };
  }, []);

  useEffect(() => {
    if (loading || result || !game) return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setResult('timeout');
          setRevealed(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [loading, result, game]);

  const blurPx = revealed ? 0 : Math.max(0, (timeLeft / TOTAL_TIME) * INITIAL_BLUR);

  const hints = game
    ? [
        game.released ? `Lanzamiento: ${game.released.slice(0, 4)}` : null,
        game.genres?.length ? `Género: ${game.genres.map((g) => g.name).join(', ')}` : null,
        game.parent_platforms?.length
          ? `Plataformas: ${game.parent_platforms.map((p) => p.platform?.name).join(', ')}`
          : null,
      ].filter(Boolean)
    : [];

  const visibleHints = hints.length;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!answer.trim() || result) return;

    const normalizedAnswer = answer.trim().toLowerCase();
    const normalizedName = game.name.toLowerCase();

    if (
      normalizedAnswer === normalizedName ||
      normalizedName.includes(normalizedAnswer)
    ) {
      setResult('correct');
      setScore((s) => s + 1);
      setRevealed(true);
      clearInterval(timerRef.current);
    } else {
      setResult('wrong');
      setTimeout(() => setResult(null), 1500);
    }
  };

  const handleReveal = () => {
    setRevealed(true);
    setResult('timeout');
    clearInterval(timerRef.current);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Adivina el juego 🎯</h2>
        <p className={styles.score}>Puntaje: {score}</p>
      </div>

      {loading ? (
        <div className={styles.loading}>Cargando juego...</div>
      ) : game ? (
        <div className={styles.gameArea}>
          <div className={styles.timer}>
            <div
              className={styles.timerBar}
              style={{ width: `${(timeLeft / TOTAL_TIME) * 100}%` }}
            />
          </div>
          <p className={styles.timeLeft}>{timeLeft}s restantes</p>

          {visibleHints > 0 && (
            <div className={styles.hints}>
              {hints.slice(0, visibleHints).map((hint, i) => (
                <p key={i} className={styles.hint}>
                  💡 {hint}
                </p>
              ))}
            </div>
          )}

          <div className={styles.imageWrapper}>
            <img
              className={styles.image}
              src={game.background_image}
              alt="Juego oculto"
              style={{ filter: `blur(${blurPx}px)` }}
            />
            {result === 'correct' && (
              <div className={`${styles.overlay} ${styles.correct}`}>
                🎉 ¡Correcto! Era <strong>{game.name}</strong>
              </div>
            )}
            {result === 'timeout' && (
              <div className={`${styles.overlay} ${styles.timeout}`}>
                ⏰ Era <strong>{game.name}</strong>
              </div>
            )}
          </div>

          <form className={styles.form} onSubmit={handleSubmit}>
            <input
              className={styles.input}
              type="text"
              placeholder="¿Qué juego es?"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              disabled={!!result}
              autoFocus
            />
            <button
              className={styles.submitBtn}
              type="submit"
              disabled={!!result || !answer.trim()}
            >
              Adivinar
            </button>
          </form>

          {result === 'wrong' && (
            <p className={styles.wrongMsg}>❌ Incorrecto, intenta de nuevo</p>
          )}

          {!result && (
            <button className={styles.revealBtn} onClick={handleReveal}>
              Revelar juego
            </button>
          )}

          {result && (
            <button className={styles.nextBtn} onClick={fetchRandomGame}>
              Siguiente juego →
            </button>
          )}
        </div>
      ) : (
        <div className={styles.error}>
          <p>Error al cargar el juego.</p>
          <button className={styles.nextBtn} onClick={fetchRandomGame}>
            Reintentar
          </button>
        </div>
      )}
    </div>
  );
}
