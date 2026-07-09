import { useState } from 'react';
import styles from './SearchBar.module.css';

export default function SearchBar({ onSearch }) {
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(value);
  };

  const handleClear = () => {
    setValue('');
    onSearch('');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        type="text"
        placeholder="Buscar videojuegos..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {value && (
        <button type="button" className={styles.clear} onClick={handleClear}>
          ✕
        </button>
      )}
      <button type="submit" className={styles.button}>
        🔍
      </button>
    </form>
  );
}
