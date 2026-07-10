import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getItem, setItem } from '../services/localStorage';

const UserActivityContext = createContext();

export function UserActivityProvider({ children }) {
  const [ratings, setRatings] = useState(() => getItem('ratings') || {});
  const [completed, setCompleted] = useState(() => getItem('completed') || []);
  const [reviews, setReviews] = useState(() => getItem('reviews') || {});

  useEffect(() => { setItem('ratings', ratings); }, [ratings]);
  useEffect(() => { setItem('completed', completed); }, [completed]);
  useEffect(() => { setItem('reviews', reviews); }, [reviews]);

  const rateGame = useCallback((gameId, score) => {
    setRatings((prev) => ({ ...prev, [gameId]: score }));
  }, []);

  const getRating = useCallback((gameId) => ratings[gameId] || 0, [ratings]);

  const toggleCompleted = useCallback((gameId) => {
    setCompleted((prev) =>
      prev.includes(gameId) ? prev.filter((id) => id !== gameId) : [...prev, gameId]
    );
  }, []);

  const isCompleted = useCallback((gameId) => completed.includes(gameId), [completed]);

  const saveReview = useCallback((gameId, text) => {
    setReviews((prev) => ({
      ...prev,
      [gameId]: { text, date: new Date().toISOString(), edited: prev[gameId] ? true : false },
    }));
  }, []);

  const getReview = useCallback((gameId) => reviews[gameId] || null, [reviews]);

  const ratingsCount = Object.keys(ratings).length;
  const completedCount = completed.length;
  const reviewsCount = Object.keys(reviews).length;

  return (
    <UserActivityContext.Provider
      value={{ rateGame, getRating, ratingsCount, toggleCompleted, isCompleted, completedCount, saveReview, getReview, reviewsCount }}
    >
      {children}
    </UserActivityContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useUserActivity() {
  const context = useContext(UserActivityContext);
  if (!context) throw new Error('useUserActivity debe usarse dentro de un UserActivityProvider');
  return context;
}
