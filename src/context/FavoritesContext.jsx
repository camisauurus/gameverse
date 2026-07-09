import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getItem, setItem } from '../services/localStorage';

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => getItem('favorites') || []);

  useEffect(() => {
    setItem('favorites', favorites);
  }, [favorites]);

  const addFavorite = useCallback((game) => {
    setFavorites((prev) => {
      if (prev.some((f) => f.id === game.id)) return prev;
      return [...prev, { ...game, note: '' }];
    });
  }, []);

  const removeFavorite = useCallback((gameId) => {
    setFavorites((prev) => prev.filter((f) => f.id !== gameId));
  }, []);

  const updateNote = useCallback((gameId, note) => {
    setFavorites((prev) =>
      prev.map((f) => (f.id === gameId ? { ...f, note } : f))
    );
  }, []);

  const isFavorite = useCallback(
    (gameId) => favorites.some((f) => f.id === gameId),
    [favorites]
  );

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, updateNote, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites debe usarse dentro de un FavoritesProvider');
  }
  return context;
}
