import trash from '../../assets/trash.svg';
import styles from './styles.module.css';

export type TaskType = {
  name: string;
  done: boolean;
};
export interface TaskProps {
  task: TaskType;
  onDelete: (name: string) => void;
  changeDoneCount: () => void;
}

export default function Task({ task, onDelete, changeDoneCount }: TaskProps) {
  const handleCheckmark = () => {
    task.done = !task.done;
    changeDoneCount();
  };

  const handleDelete = () => {
    onDelete(task.name);
    task.done = false;
    changeDoneCount();
  };

  return (
    <div className={task.done ? styles['task-done'] : styles.task}>
      <span onClick={() => handleCheckmark()} />
      <p>{task.name}</p>
      <img className={styles.trash} src={trash} onClick={handleDelete} />
    </div>
  );
}
