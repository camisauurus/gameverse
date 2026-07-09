import { useGames } from '../hooks/useGames';
import GameGrid from '../components/GameGrid';
import SearchBar from '../components/SearchBar';
import Filters from '../components/Filters';
import Spinner from '../components/Spinner';
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
    <div className={styles.home}>
      <h1 className={styles.title}>GameVerse</h1>
      <p className={styles.subtitle}>Explora el universo de los videojuegos</p>

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

      <GameGrid games={games} />

      {loading && <Spinner />}

      {hasMore && !loading && games.length > 0 && (
        <div className={styles.loadMoreWrapper}>
          <button className={styles.loadMore} onClick={loadMore}>
            Cargar más
          </button>
        </div>
      )}
    </div>
  );
}
