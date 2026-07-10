import { motion } from 'framer-motion';
import { useGames } from '../hooks/useGames';
import HeroSection from '../components/HeroSection';
import GameGrid from '../components/GameGrid';
import SearchBar from '../components/SearchBar';
import Filters from '../components/Filters';
import Spinner from '../components/Spinner';
import SkeletonCard from '../components/SkeletonCard';
import EmptyState from '../components/EmptyState';
import ErrorMessage from '../components/ErrorMessage';
import styles from './HomePage.module.css';

export default function HomePage() {
  const {
    games,
    loading,
    error,
    hasMore,
    search,
    setSearch,
    genres,
    setGenres,
    platforms,
    setPlatforms,
    ordering,
    setOrdering,
    loadMore,
  } = useGames();

  return (
    <motion.div
      className={styles.home}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <HeroSection />

      <div className={styles.controls}>
        <SearchBar onSearch={setSearch} />
        <Filters
          genres={genres}
          platforms={platforms}
          ordering={ordering}
          onGenreChange={setGenres}
          onPlatformChange={setPlatforms}
          onOrderingChange={setOrdering}
        />
      </div>

      {error && <ErrorMessage message={error} />}

      {!error && games.length === 0 && !loading && (
        <EmptyState
          message={
            search
              ? `No se encontraron resultados para "${search}"`
              : 'No hay juegos disponibles.'
          }
        />
      )}

      {!error && games.length === 0 && loading && (
        <div className={styles.grid}>
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )}

      <GameGrid games={games} />

      {loading && games.length > 0 && <Spinner />}

      {hasMore && !loading && games.length > 0 && (
        <div className={styles.loadMoreWrapper}>
          <button className={styles.loadMore} onClick={loadMore}>
            Cargar más
          </button>
        </div>
      )}
    </motion.div>
  );
}
