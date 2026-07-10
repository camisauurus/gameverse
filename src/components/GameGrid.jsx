import GameCard from './GameCard';
import styles from './GameGrid.module.css';

export default function GameGrid({ games }) {
  if (!games || games.length === 0) return null;

  return (
    <div className={styles.grid}>
      {games.map((game, i) => (
        <GameCard key={game.id} game={game} index={i} />
      ))}
    </div>
  );
}
