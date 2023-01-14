import { useState } from 'react';
import trash from '../../assets/trash.svg';
import styles from './styles.module.css';

export interface TaskProps {
  name: string;
  onDelete: (name: string) => void;
}

export default function Task({ name, onDelete }: TaskProps) {
  const [done, setDone] = useState(false);

  const handleCheckmark = () => {
    setDone((state) => {
      return !state;
    });
  };

  const handleDelete = () => {
    onDelete(name);
  };

  return (
    <div className={done ? styles['task-done'] : styles.task}>
      <span onClick={() => handleCheckmark()} />
      <p>{name}</p>
      <img className={styles.trash} src={trash} onClick={handleDelete} />
    </div>
  );
}
