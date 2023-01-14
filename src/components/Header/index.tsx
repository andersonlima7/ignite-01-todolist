import rocket from '../../assets/rocket.svg';
import styles from './styles.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <img src={rocket} height='36px' />
      <div>
        <span>to</span>
        <span>do</span>
      </div>
    </header>
  );
}
