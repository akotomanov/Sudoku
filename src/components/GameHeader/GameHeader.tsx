import type { Difficulty } from '../../types/game';
import { Timer } from '../Timer/Timer';
import styles from './GameHeader.module.css';

interface GameHeaderProps {
  difficulty: Difficulty;
  timerFormatted: string;
  onNewGame: () => void;
}

const difficultyLabels: Record<Difficulty, string> = {
  easy: 'Easy',
  medium: 'Medium',
  hard: 'Hard',
};

export function GameHeader({ difficulty, timerFormatted, onNewGame }: GameHeaderProps) {
  return (
    <div className={styles.header}>
      <span className={styles.difficulty}>{difficultyLabels[difficulty]}</span>
      <Timer formatted={timerFormatted} />
      <button className={styles.newGame} onClick={onNewGame}>
        New game
      </button>
    </div>
  );
}
