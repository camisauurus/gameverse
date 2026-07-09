import { useState, useEffect, useCallback, useRef } from 'react';
import { getGames } from '../api/rawgApi';

export function useGames() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [search, setSearch] = useState('');
  const [genres, setGenres] = useState('');
  const [platforms, setPlatforms] = useState('');
  const [ordering, setOrdering] = useState('-metacritic');

  const isFirstRender = useRef(true);
  const prevFilters = useRef({ search: '', genres: '', platforms: '', ordering: '-metacritic' });

  const fetchGames = useCallback(async (pageNum, filters, append = false) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getGames({ page: pageNum, ...filters });
      if (append) {
        setGames((prev) => [...prev, ...data.results]);
      } else {
        setGames(data.results);
      }
      setHasMore(data.next !== null);
    } catch (err) {
      setError(err.message || 'Error al cargar los juegos');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const filters = { search, genres, platforms, ordering };
    if (isFirstRender.current) {
      isFirstRender.current = false;
      prevFilters.current = filters;
      fetchGames(1, filters, false);
      return;
    }

    const filtersChanged =
      prevFilters.current.search !== search ||
      prevFilters.current.genres !== genres ||
      prevFilters.current.platforms !== platforms ||
      prevFilters.current.ordering !== ordering;

    if (filtersChanged) {
      prevFilters.current = filters;
      setPage(1);
      fetchGames(1, filters, false);
    }
  }, [search, genres, platforms, ordering, fetchGames]);

  const loadMore = useCallback(() => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchGames(nextPage, prevFilters.current, true);
  }, [page, fetchGames]);

  return {
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
  };
}
