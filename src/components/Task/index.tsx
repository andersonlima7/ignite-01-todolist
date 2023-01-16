import { useState } from 'react';
import trash from '../../assets/trash.svg';
import styles from './styles.module.css';

export interface TaskProps {
  name: string;
  onDelete: (name: string) => void;
  increaseDoneCount: (increase: boolean) => void;
}

export default function Task({ name, onDelete, increaseDoneCount }: TaskProps) {
  const [done, setDone] = useState(false);

  const handleCheckmark = () => {
    const state = done;
    setDone(!state);
    if (!state) increaseDoneCount(true);
    else increaseDoneCount(false);
  };

  const handleDelete = () => {
    onDelete(name);
    if (done) increaseDoneCount(false);
  };

  return (
    <div className={done ? styles['task-done'] : styles.task}>
      <span onClick={() => handleCheckmark()} />
      <p>{name}</p>
      <img className={styles.trash} src={trash} onClick={handleDelete} />
    </div>
  );
}
