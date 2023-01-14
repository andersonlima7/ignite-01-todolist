import trash from '../../assets/trash.svg'
import styles from './styles.module.css'

interface TaskProps {
  content: string
  done: boolean
}

export default function Task({ content, done }: TaskProps) {
  return (
    <div className={done ? styles['task-done'] : styles.task}>
      <span />
      <p>{content}</p>
      <img className={styles.trash} src={trash} />
    </div>
  )
}
