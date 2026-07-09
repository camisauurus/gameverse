import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { FavoritesProvider } from './context/FavoritesContext';
import ThemeToggle from './components/ThemeToggle';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import FavoritesPage from './pages/FavoritesPage';
import styles from './App.module.css';

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
              <ThemeToggle />
            </div>
          </nav>
        </header>

        <main className={styles.main}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/game/:id" element={<DetailPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
          </Routes>
        </main>

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
        <AppContent />
      </FavoritesProvider>
    </ThemeProvider>
  );
}
