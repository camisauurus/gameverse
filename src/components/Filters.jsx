import { useState, useEffect } from 'react';
import { getGenres, getPlatforms } from '../api/rawgApi';
import styles from './Filters.module.css';

export default function Filters({ genres, platforms, ordering, onGenreChange, onPlatformChange, onOrderingChange }) {
  const [genreList, setGenreList] = useState([]);
  const [platformList, setPlatformList] = useState([]);

  useEffect(() => {
    getGenres()
      .then((data) => setGenreList(data.results || []))
      .catch(() => {});
    getPlatforms()
      .then((data) => setPlatformList(data.results || []))
      .catch(() => {});
  }, []);

  return (
    <div className={styles.filters}>
      <select
        className={styles.select}
        value={genres}
        onChange={(e) => onGenreChange(e.target.value)}
      >
        <option value="">Todos los géneros</option>
        {genreList.map((g) => (
          <option key={g.id} value={g.slug}>
            {g.name}
          </option>
        ))}
      </select>

      <select
        className={styles.select}
        value={platforms}
        onChange={(e) => onPlatformChange(e.target.value)}
      >
        <option value="">Todas las plataformas</option>
        {platformList.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </select>

      <select
        className={styles.select}
        value={ordering}
        onChange={(e) => onOrderingChange(e.target.value)}
      >
        <option value="-metacritic">Popularidad</option>
        <option value="-rating">Rating</option>
        <option value="-released">Fecha de lanzamiento</option>
        <option value="name">Nombre (A-Z)</option>
      </select>
    </div>
  );
}
