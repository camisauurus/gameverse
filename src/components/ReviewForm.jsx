import { useState } from 'react';
import { useToast } from '../context/ToastContext';
import styles from './ReviewForm.module.css';

export default function ReviewForm({ initialText = '', onSave }) {
  const [text, setText] = useState(initialText);
  const { addToast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSave(text.trim());
    addToast('Reseña guardada', 'success');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <textarea
        className={styles.textarea}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Escribe tu reseña de este juego..."
        rows={4}
      />
      <button
        className={styles.btn}
        type="submit"
        disabled={!text.trim()}
      >
        {initialText ? 'Actualizar reseña' : 'Guardar reseña'}
      </button>
    </form>
  );
}
