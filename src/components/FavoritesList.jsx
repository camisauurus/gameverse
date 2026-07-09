import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import styles from './FavoritesList.module.css';

export default function FavoritesList() {
  const { favorites, removeFavorite, updateNote } = useFavorites();
  const [editingId, setEditingId] = useState(null);
  const [noteText, setNoteText] = useState('');

  const startEdit = (id, currentNote) => {
    setEditingId(id);
    setNoteText(currentNote || '');
  };

  const saveNote = (id) => {
    updateNote(id, noteText);
    setEditingId(null);
  };

  if (favorites.length === 0) {
    return (
      <div className={styles.empty}>
        <span className={styles.emptyIcon}>📂</span>
        <p>No tienes favoritos aún.</p>
        <Link to="/" className={styles.link}>Explorar juegos</Link>
      </div>
    );
  }

  return (
    <div className={styles.list}>
      {favorites.map((game) => (
        <div key={game.id} className={styles.item}>
          <Link to={`/game/${game.id}`} className={styles.itemLink}>
            <img
              className={styles.image}
              src={game.background_image || '/placeholder.svg'}
              alt={game.name}
            />
            <div className={styles.info}>
              <h3 className={styles.title}>{game.name}</h3>
              {game.rating > 0 && (
                <span className={styles.rating}>★ {game.rating.toFixed(1)}</span>
              )}
            </div>
          </Link>

          <div className={styles.noteArea}>
            {editingId === game.id ? (
              <div className={styles.noteEdit}>
                <textarea
                  className={styles.textarea}
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  placeholder="Escribe una nota..."
                  rows={2}
                />
                <button className={styles.saveBtn} onClick={() => saveNote(game.id)}>
                  💾
                </button>
              </div>
            ) : (
              <div className={styles.noteView}>
                <p className={styles.noteText}>{game.note || 'Sin nota'}</p>
                <button
                  className={styles.editBtn}
                  onClick={() => startEdit(game.id, game.note)}
                >
                  ✏️
                </button>
              </div>
            )}
          </div>

          <button
            className={styles.removeBtn}
            onClick={() => removeFavorite(game.id)}
          >
            🗑️
          </button>
        </div>
      ))}
    </div>
  );
}
