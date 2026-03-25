import styles from './Timer.module.css';

interface TimerProps {
  formatted: string;
}

export function Timer({ formatted }: TimerProps) {
  return <span className={styles.timer}>{formatted}</span>;
}
