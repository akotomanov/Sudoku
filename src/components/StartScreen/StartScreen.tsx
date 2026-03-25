import type { Difficulty } from '../../types/game';
import styles from './StartScreen.module.css';

interface StartScreenProps {
  onSelectDifficulty: (difficulty: Difficulty) => void;
}

export function StartScreen({ onSelectDifficulty }: StartScreenProps) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Sudoku</h1>
      <p className={styles.subtitle}>Select difficulty to start</p>
      <div className={styles.buttons}>
        <button className={styles.button} onClick={() => onSelectDifficulty('easy')}>
          Easy
        </button>
        <button className={styles.button} onClick={() => onSelectDifficulty('medium')}>
          Medium
        </button>
        <button className={styles.button} onClick={() => onSelectDifficulty('hard')}>
          Hard
        </button>
      </div>
      <div className={styles.rules}>
        <h2 className={styles.rulesTitle}>How to play</h2>
        <ul className={styles.rulesList}>
          <li>Fill each 3x3 box, row, and column with numbers 1-9</li>
          <li>Tap a cell, then select a number from the keyboard</li>
          <li>Numbers cannot repeat in any row, column, or box</li>
          <li>Each number can appear on the board only 9 times</li>
          <li>Use Notes mode to add candidate numbers to a cell</li>
        </ul>
      </div>
    </div>
  );
}
