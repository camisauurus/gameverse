import { BrowserRouter, Routes, Route, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { ToastProvider } from './context/ToastContext';
import { UserActivityProvider } from './context/UserActivityContext';
import { AchievementsProvider } from './context/AchievementsContext';
import ThemeToggle from './components/ThemeToggle';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import FavoritesPage from './pages/FavoritesPage';
import GuessPage from './pages/GuessPage';
import DashboardPage from './pages/DashboardPage';
import styles from './App.module.css';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.25 }}
      >
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/game/:id" element={<DetailPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/guess" element={<GuessPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function AppContent() {
  return (
    <BrowserRouter>
      <div className={styles.app}>
        <header className={styles.header}>
          <nav className={styles.nav}>
            <NavLink to="/" className={styles.logo}>GameVerse</NavLink>
            <div className={styles.links}>
              <NavLink to="/" end className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}>
                Inicio
              </NavLink>
              <NavLink to="/favorites" className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}>
                Favoritos
              </NavLink>
              <NavLink to="/guess" className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}>
                Adivina el Juego
              </NavLink>
              <NavLink to="/dashboard" className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}>
                Dashboard
              </NavLink>
              <ThemeToggle />
            </div>
          </nav>
        </header>

        <main className={styles.main}>
          <AnimatedRoutes />
        </main>

        <ScrollToTop />

        <footer className={styles.footer}>
          <p>GameVerse &copy; {new Date().getFullYear()} — Datos proporcionados por RAWG</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <FavoritesProvider>
        <ToastProvider>
          <UserActivityProvider>
            <AchievementsProvider>
              <AppContent />
            </AchievementsProvider>
          </UserActivityProvider>
        </ToastProvider>
      </FavoritesProvider>
    </ThemeProvider>
  );
}
