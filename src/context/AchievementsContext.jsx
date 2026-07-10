import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { getItem, setItem } from '../services/localStorage';
import { useFavorites } from './FavoritesContext';
import { useUserActivity } from './UserActivityContext';

const ACHIEVEMENTS = [
  { id: 'first_fav', icon: '⭐', title: 'Primer favorito', desc: 'Agrega tu primer juego a favoritos', check: (s) => s.favorites >= 1 },
  { id: 'collector_10', icon: '📦', title: 'Coleccionista', desc: '10 juegos en favoritos', check: (s) => s.favorites >= 10 },
  { id: 'mega_collector', icon: '🏆', title: 'Mega coleccionista', desc: '20 juegos en favoritos', check: (s) => s.favorites >= 20 },
  { id: 'critic', icon: '✍️', title: 'Crítico', desc: 'Escribe tu primera reseña', check: (s) => s.reviews >= 1 },
  { id: 'expert', icon: '🎯', title: 'Experto', desc: 'Puntúa 5 juegos diferentes', check: (s) => s.ratings >= 5 },
  { id: 'completer', icon: '✅', title: 'Completador', desc: 'Marca 3 juegos como completados', check: (s) => s.completed >= 3 },
  { id: 'explorer', icon: '🔍', title: 'Explorador', desc: 'Marca 10 juegos visitados', check: (s) => s.visited >= 10 },
  { id: 'veteran', icon: '💎', title: 'Veterano', desc: 'Marca 25 juegos visitados', check: (s) => s.visited >= 25 },
];

const AchievementsContext = createContext();

export function AchievementsProvider({ children }) {
  const { favorites } = useFavorites();
  const { ratingsCount, completedCount, reviewsCount } = useUserActivity();

  const [visitedCount, setVisitedCount] = useState(() => getItem('visitedCount') || 0);
  const [unlocked, setUnlocked] = useState(() => getItem('achievements') || []);

  useEffect(() => { setItem('visitedCount', visitedCount); }, [visitedCount]);
  useEffect(() => { setItem('achievements', unlocked); }, [unlocked]);

  const trackVisit = useCallback(() => {
    setVisitedCount((prev) => prev + 1);
  }, []);

  const stats = useMemo(() => ({
    favorites: favorites.length,
    ratings: ratingsCount,
    completed: completedCount,
    reviews: reviewsCount,
    visited: visitedCount,
  }), [favorites.length, ratingsCount, completedCount, reviewsCount, visitedCount]);

  useEffect(() => {
    const newlyUnlocked = ACHIEVEMENTS.filter(
      (a) => !unlocked.includes(a.id) && a.check(stats)
    ).map((a) => a.id);

    if (newlyUnlocked.length > 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUnlocked((prev) => [...prev, ...newlyUnlocked]);
    }
  }, [stats, unlocked]);

  const achievements = useMemo(
    () => ACHIEVEMENTS.map((a) => ({ ...a, unlocked: unlocked.includes(a.id) })),
    [unlocked]
  );

  return (
    <AchievementsContext.Provider value={{ achievements, stats, trackVisit, unlocked }}>
      {children}
    </AchievementsContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAchievements() {
  const context = useContext(AchievementsContext);
  if (!context) throw new Error('useAchievements debe usarse dentro de un AchievementsProvider');
  return context;
}

export { ACHIEVEMENTS };
