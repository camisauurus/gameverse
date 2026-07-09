import { useParams, Link } from 'react-router-dom';
import GameDetail from '../components/GameDetail';
import styles from './DetailPage.module.css';

export default function DetailPage() {
  const { id } = useParams();

  return (
    <div className={styles.page}>
      <Link to="/" className={styles.back}>← Volver</Link>
      <GameDetail key={id} gameId={id} />
    </div>
  );
}
