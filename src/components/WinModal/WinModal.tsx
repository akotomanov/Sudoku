import type { Difficulty } from '../../types/game';
import styles from './WinModal.module.css';

interface WinModalProps {
  time: string;
  difficulty: Difficulty;
  onNewGame: () => void;
}

const difficultyLabels: Record<Difficulty, string> = {
  easy: 'Easy',
  medium: 'Medium',
  hard: 'Hard',
};

export function WinModal({ time, difficulty, onNewGame }: WinModalProps) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.title}>Congratulations!</h2>
        <p className={styles.message}>
          You completed the {difficultyLabels[difficulty].toLowerCase()} puzzle in <strong>{time}</strong>
        </p>
        <button className={styles.button} onClick={onNewGame}>
          New Game
        </button>
      </div>
    </div>
  );
}
